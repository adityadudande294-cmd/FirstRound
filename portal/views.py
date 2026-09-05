import json
from django.shortcuts import render
from django.db.models import F, Q, Count, Avg, Sum
from django.utils import timezone
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User, CompanyCategory, TestSeries, Question, TestAttempt, QuestionResponse, BookmarkedQuestion, MegaEvent
from .serializers import (
    UserSerializer, UserPublicSerializer, TestSeriesListSerializer,
    TestSeriesDetailSerializer, QuestionAdminSerializer, QuestionStudentSerializer,
    TestAttemptSerializer, BookmarkedQuestionSerializer, MegaEventSerializer
)
from .auto_seed import ensure_database_seeded


def check_is_admin(request):
    """
    Strict Admin Role Guard:
    Admin access is granted ONLY if the requesting user's email is aadi@gmail.com,
    or if user.is_superuser == True, or user.is_staff == True.
    """
    user_id = request.data.get('user_id') if hasattr(request, 'data') else None
    if not user_id and hasattr(request, 'query_params'):
        user_id = request.query_params.get('user_id')
    
    user = None
    if user_id:
        user = User.objects.filter(id=user_id).first()
    elif hasattr(request, 'user') and request.user and request.user.is_authenticated:
        user = request.user

    if user and (user.is_superuser or user.is_staff or user.email.lower() == 'aadi@gmail.com'):
        return user
    return None


def index_view(request):
    """Serve the compiled React SPA. Auto-seeds database on first load.
    Falls back to legacy template if the React build does not yet exist.
    """
    ensure_database_seeded()
    from pathlib import Path
    import os
    react_index = Path(__file__).resolve().parent.parent / 'frontend' / 'dist' / 'index.html'
    if react_index.exists():
        return render(request, 'index.html')
    # Fallback: legacy Django template (used during local dev without a build)
    return render(request, 'portal/index.html')



class AuthLoginOrRegisterView(APIView):
    """
    Handles both the React SPA (passwordless: {email, name, college}) and
    legacy password-based login ({email, password, full_name, college}).
    React identifies users by email only — no password required.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get('email', '').strip().lower()
        # React SPA sends 'name'; legacy sends 'full_name'
        full_name = (
            request.data.get('name') or
            request.data.get('full_name') or ''
        ).strip()
        college = request.data.get('college', '').strip()
        password = request.data.get('password', '').strip()

        if not email:
            return Response(
                {'error': 'Email is required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = User.objects.filter(email=email).first()

        if user:
            # Existing user — if a password was provided, verify it
            if password and not user.check_password(password):
                return Response(
                    {'error': 'Invalid credentials. Please check your password.'},
                    status=status.HTTP_401_UNAUTHORIZED
                )
            # Update profile fields if provided
            if full_name:
                user.full_name = full_name
            if college:
                user.college = college
            user.save()
            serializer = UserSerializer(user)
            return Response({
                'message': 'Welcome back! Signed in successfully.',
                'is_new': False,
                'user': serializer.data,
                'token': f"token_{user.id}_{int(timezone.now().timestamp())}"
            })
        else:
            # New user — create account
            name = full_name if full_name else email.split('@')[0].capitalize()
            # Use a dummy password if none provided (React SPA flow)
            effective_password = password if password else f"auto_{email}_{name}"
            user = User.objects.create_user(
                email=email,
                password=effective_password,
                full_name=name,
                college=college or "Campus Placement Candidate"
            )
            serializer = UserSerializer(user)
            return Response({
                'message': 'Account created and signed in successfully!',
                'is_new': True,
                'user': serializer.data,
                'token': f"token_{user.id}_{int(timezone.now().timestamp())}"
            }, status=status.HTTP_201_CREATED)


# ─── React SPA Compatibility Stub Views ───────────────────────────────────────
# The React frontend (api.ts) calls several endpoints that map to either
# existing Django data or return sensible empty defaults.

class CompaniesListView(APIView):
    """React calls GET /api/companies — returns distinct company names."""
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        companies = (
            TestSeries.objects
            .filter(is_active=True, test_type='COMPANY')
            .values_list('company_name', flat=True)
            .distinct()
            .order_by('company_name')
        )
        company_list = [
            {'id': name.lower().replace(' ', '-'), 'name': name}
            for name in companies
        ]
        return Response({'companies': company_list})


class CatalogueView(APIView):
    """React calls GET /api/catalogue — returns all active tests."""
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        ensure_database_seeded()
        tests = TestSeries.objects.filter(is_active=True).order_by('company_name', 'title')
        serializer = TestSeriesListSerializer(tests, many=True)
        return Response({'tests': serializer.data})


class UserAttemptsView(APIView):
    """React calls GET /api/attempts?userId=... — returns user attempt history."""
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        user_id = request.query_params.get('userId')
        if not user_id:
            return Response({'attempts': []})
        attempts = TestAttempt.objects.filter(user_id=user_id).order_by('-completed_at')[:20]
        return Response({'attempts': TestAttemptSerializer(attempts, many=True).data})


class NotificationsView(APIView):
    """React calls GET /api/notifications — returns empty list (not implemented)."""
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        return Response({'notifications': [], 'unreadCount': 0, 'readIds': []})

    def post(self, request):
        return Response({'success': True, 'unreadCount': 0})


class NotificationReadView(APIView):
    """React calls POST /api/notifications/{id}/read"""
    permission_classes = [permissions.AllowAny]

    def post(self, request, notification_id=None):
        return Response({'success': True, 'unreadCount': 0})


class AdminAnnouncementsView(APIView):
    """React calls POST /api/admin/announcements"""
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        return Response({'success': True, 'notification': {}})


class TestHistoryView(APIView):
    """React calls GET /api/tests/history?userId=..."""
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        user_id = request.query_params.get('userId')
        if not user_id:
            return Response({'success': True, 'history': []})
        attempts = TestAttempt.objects.filter(user_id=user_id).order_by('-completed_at')[:50]
        history = []
        for a in attempts:
            history.append({
                'testId': str(a.test_id),
                'testTitle': a.test.title if a.test else '',
                'mode': a.mode,
                'score': a.score,
                'totalQuestions': a.total_questions,
                'accuracy': a.accuracy,
                'completedAt': a.completed_at.isoformat() if a.completed_at else None,
            })
        return Response({'success': True, 'history': history})


class TestHistoryVisitView(APIView):
    """React calls POST /api/tests/history/visit — no-op stub."""
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        return Response({'success': True})


class TestHistoryStartView(APIView):
    """React calls POST /api/tests/history/start — no-op stub."""
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        return Response({'success': True})


class AIDoubtView(APIView):
    """React calls POST /api/ai/ask-doubt — returns a placeholder explanation."""
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        question = request.data.get('question', {})
        q_text = question.get('question_text', '') if isinstance(question, dict) else ''
        solution = question.get('step_by_step_solution', '') if isinstance(question, dict) else ''
        explanation = solution or f"Review the core concept behind this question carefully. {q_text[:100]}"
        return Response({
            'explanation': {
                'text': explanation,
                'steps': [],
                'formula': question.get('shortcut_formula', '') if isinstance(question, dict) else '',
            }
        })


class QAReportView(APIView):
    """React calls GET /api/admin/qa-report — returns stub."""
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        return Response({'success': True, 'report': {}})


class UserProfileView(APIView):
    def get(self, request, user_id=None):
        if not user_id:
            return Response({'error': 'User ID is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = User.objects.filter(id=user_id).first()
        if not user:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        if user.total_tests > 0:
            better_count = User.objects.filter(is_active=True, total_tests__gt=0).filter(
                Q(total_points__gt=user.total_points) |
                Q(total_points=user.total_points, total_time_taken_seconds__lt=user.total_time_taken_seconds)
            ).count()
            rank = better_count + 1
        else:
            rank = '--'

        user_data = UserSerializer(user).data
        user_data['rank'] = rank

        attempts = user.attempts.all().order_by('-completed_at')[:10]
        attempts_data = TestAttemptSerializer(attempts, many=True).data

        return Response({
            'user': user_data,
            'recent_attempts': attempts_data
        })


class TestSeriesListView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        ensure_database_seeded()
        test_type = request.query_params.get('type')
        company = request.query_params.get('company')
        topic = request.query_params.get('topic')
        search = request.query_params.get('search')

        queryset = TestSeries.objects.filter(is_active=True)

        if test_type:
            queryset = queryset.filter(test_type=test_type.upper())
        if company and company.lower() != 'all':
            queryset = queryset.filter(company_name__icontains=company)
        if topic and topic.lower() != 'all':
            queryset = queryset.filter(topic_category__icontains=topic)
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(company_name__icontains=search) |
                Q(description__icontains=search)
            )

        serializer = TestSeriesListSerializer(queryset, many=True)
        
        companies = TestSeries.objects.filter(test_type='COMPANY', is_active=True).values_list('company_name', flat=True).distinct()
        topics = TestSeries.objects.filter(test_type='TOPIC', is_active=True).values_list('topic_category', flat=True).distinct()

        return Response({
            'tests': serializer.data,
            'available_companies': list(companies),
            'available_topics': list(topics)
        })


class TestSeriesDetailView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, test_id):
        test = TestSeries.objects.filter(id=test_id, is_active=True).first()
        if not test:
            return Response({'error': 'Test not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = TestSeriesDetailSerializer(test)
        return Response(serializer.data)


class SubmitTestView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, test_id):
        test = TestSeries.objects.filter(id=test_id).first()
        if not test:
            return Response({'error': 'Test not found'}, status=status.HTTP_404_NOT_FOUND)

        user_id = request.data.get('user_id')
        user = User.objects.filter(id=user_id).first() if user_id else None

        mode = request.data.get('mode', 'EXAM')
        timer_per_question = int(request.data.get('timer_per_question', 0))
        time_taken_seconds = int(request.data.get('time_taken_seconds', 0))
        responses_data = request.data.get('responses', [])

        questions = {q.id: q for q in test.questions.all()}
        total_questions = len(questions)

        correct_count = 0
        incorrect_count = 0
        unanswered_count = 0
        
        topic_stats = {}
        processed_responses = []

        response_map = {r.get('question_id'): r for r in responses_data}

        for q_id, question in questions.items():
            topic = question.topic or "General Aptitude"
            if topic not in topic_stats:
                topic_stats[topic] = {'correct': 0, 'incorrect': 0, 'unanswered': 0, 'total': 0}
            topic_stats[topic]['total'] += 1

            resp = response_map.get(q_id)
            selected = resp.get('selected_option', '').strip().upper() if resp else ''
            spent = int(resp.get('time_spent_seconds', 0)) if resp else 0

            is_correct = False
            if selected == question.correct_option:
                is_correct = True
                correct_count += 1
                topic_stats[topic]['correct'] += 1
            elif selected != '':
                incorrect_count += 1
                topic_stats[topic]['incorrect'] += 1
            else:
                unanswered_count += 1
                topic_stats[topic]['unanswered'] += 1

            processed_responses.append({
                'question_id': q_id,
                'question_text': question.question_text,
                'topic': question.topic,
                'company_tag': question.company_tag,
                'option_a': question.option_a,
                'option_b': question.option_b,
                'option_c': question.option_c,
                'option_d': question.option_d,
                'selected_option': selected,
                'correct_option': question.correct_option,
                'is_correct': is_correct,
                'time_spent_seconds': spent,
                'step_by_step_solution': question.step_by_step_solution,
                'shortcut_formula': question.shortcut_formula
            })

        total_attempted = correct_count + incorrect_count
        accuracy = round((correct_count / total_attempted * 100), 1) if total_attempted > 0 else 0.0
        # Points = (Correct * 10) - (Incorrect * 2)
        points_earned = max(0, (correct_count * 10) - (incorrect_count * 2))
        avg_speed = round(time_taken_seconds / total_questions, 1) if total_questions > 0 else 0.0

        strengths = []
        weaknesses = []
        topic_breakdown_clean = {}

        recommendation_guides = {
            "Time & Work": "Review unitary method shortcuts and LCM approach for inverse work rates.",
            "Profit & Loss": "Practice percentage multiplier formulas and mark-up/discount chain calculations.",
            "Speed, Time & Distance": "Focus on relative speed vectors and average speed harmonic means.",
            "Percentages & Averages": "Use standard base shifting (100-base rule) to calculate rapid approximations.",
            "Probability & Permutations": "Master complementary probability (1 - P(none)) and combination selections.",
            "Number System & Divisibility": "Review unit digit cycles and modulo remainder theorems.",
            "Blood Relations": "Map family trees visually with generation levels (+1, 0, -1) and gender nodes.",
            "Syllogisms": "Utilize Venn diagram overlaps and tick-cross rules to avoid false negative deductions.",
            "Coding-Decoding": "Memorize forward and reverse alphabet numerical positions (EJOTY 5-10-15-20-25).",
            "Seating Arrangements": "Anchor fixed elements first before placing conditional constraints.",
            "Reading Comprehension": "Read question stems before passage scanning to locate keyword answers fast.",
            "Sentence Correction & Grammar": "Check subject-verb agreement and modifier placement rules first.",
            "OOPs & Data Structures": "Review time complexity boundaries and encapsulation/polymorphism definitions.",
            "SQL & DBMS": "Review ACID properties, normalization forms, and left/right outer joins.",
        }

        for topic, stat in topic_stats.items():
            tot = stat['total']
            cor = stat['correct']
            topic_acc = round((cor / tot) * 100, 1) if tot > 0 else 0.0
            stat['accuracy'] = topic_acc
            topic_breakdown_clean[topic] = stat

            if topic_acc >= 80.0:
                strengths.append({
                    'topic': topic,
                    'accuracy': topic_acc,
                    'correct': cor,
                    'total': tot,
                    'badge': 'Proficient Mastery (≥80%)'
                })
            elif topic_acc < 60.0:
                rec = recommendation_guides.get(topic, "Revise key formulas and practice at least 15 timed MCQs on this topic.")
                weaknesses.append({
                    'topic': topic,
                    'accuracy': topic_acc,
                    'correct': cor,
                    'total': tot,
                    'badge': 'Needs Urgent Attention (<60%)',
                    'recommendation': rec
                })

        tab_switches_count = int(request.data.get('tab_switches_count', 0))
        integrity_flag = bool(request.data.get('integrity_flag', False))
        submission_reason = request.data.get('submission_reason', 'Normal Submission')
        mega_event_id = request.data.get('mega_event_id')
        mega_event_obj = None
        is_mega_attempt = False
        if mega_event_id:
            mega_event_obj = MegaEvent.objects.filter(id=mega_event_id, is_active=True).first()
            if mega_event_obj:
                is_mega_attempt = True

        attempt_obj = None
        if user:
            attempt_obj = TestAttempt.objects.create(
                user=user,
                test=test,
                mode=mode,
                timer_per_question=timer_per_question,
                score=correct_count,
                total_questions=total_questions,
                correct_count=correct_count,
                incorrect_count=incorrect_count,
                unanswered_count=unanswered_count,
                accuracy=accuracy,
                points_earned=points_earned,
                time_taken_seconds=time_taken_seconds,
                average_speed_seconds=avg_speed,
                topic_breakdown=topic_breakdown_clean,
                strengths=strengths,
                weaknesses=weaknesses,
                tab_switches_count=tab_switches_count,
                integrity_flag=integrity_flag,
                submission_reason=submission_reason,
                is_mega_event_attempt=is_mega_attempt,
                mega_event=mega_event_obj
            )

            for r in processed_responses:
                q_model = questions.get(r['question_id'])
                if q_model:
                    QuestionResponse.objects.create(
                        attempt=attempt_obj,
                        question=q_model,
                        selected_option=r['selected_option'],
                        is_correct=r['is_correct'],
                        time_spent_seconds=r['time_spent_seconds']
                    )

            # Recalculate 100% dynamic user stats
            user.recalculate_stats()

        return Response({
            'attempt_id': str(attempt_obj.id) if attempt_obj else None,
            'test_title': test.title,
            'company_name': test.company_name,
            'year': test.year,
            'mode': mode,
            'score': correct_count,
            'total_questions': total_questions,
            'correct_count': correct_count,
            'incorrect_count': incorrect_count,
            'unanswered_count': unanswered_count,
            'accuracy': accuracy,
            'points_earned': points_earned,
            'time_taken_seconds': time_taken_seconds,
            'average_speed_seconds': avg_speed,
            'topic_breakdown': topic_breakdown_clean,
            'strengths': strengths,
            'weaknesses': weaknesses,
            'tab_switches_count': tab_switches_count,
            'integrity_flag': integrity_flag,
            'submission_reason': submission_reason,
            'detailed_solutions': processed_responses
        }, status=status.HTTP_200_OK)


class LeaderboardView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        current_user_id = request.query_params.get('user_id')

        # Real-time dynamic query: only include users who have taken tests (total_tests > 0)
        users_qs = User.objects.filter(is_active=True, total_tests__gt=0).order_by('-total_points', 'total_time_taken_seconds', 'full_name')

        leaderboard_data = []
        user_rank_data = None

        for index, usr in enumerate(users_qs, start=1):
            item = {
                'rank': index,
                'id': str(usr.id),
                'full_name': usr.full_name,
                'college': usr.college or "Campus Candidate",
                'total_points': usr.total_points,
                'total_tests': usr.total_tests,
                'total_questions_solved': usr.total_questions_solved,
                'total_correct': usr.total_correct,
                'accuracy_percentage': usr.accuracy_percentage,
                'total_time_taken_seconds': usr.total_time_taken_seconds
            }
            leaderboard_data.append(item)

            if current_user_id and str(usr.id) == current_user_id:
                user_rank_data = item

        if current_user_id and not user_rank_data:
            usr = User.objects.filter(id=current_user_id).first()
            if usr:
                user_rank_data = {
                    'rank': '--',
                    'id': str(usr.id),
                    'full_name': usr.full_name,
                    'college': usr.college,
                    'total_points': usr.total_points,
                    'total_tests': usr.total_tests,
                    'total_questions_solved': usr.total_questions_solved,
                    'total_correct': usr.total_correct,
                    'accuracy_percentage': usr.accuracy_percentage,
                    'total_time_taken_seconds': usr.total_time_taken_seconds
                }

        return Response({
            'leaderboard': leaderboard_data,
            'current_user_rank': user_rank_data,
            'total_competitors': len(leaderboard_data)
        })


class AdminStatsView(APIView):
    def get(self, request):
        admin_user = check_is_admin(request)
        if not admin_user:
            return Response({'error': 'Unauthorized. Admin credentials required.'}, status=status.HTTP_403_FORBIDDEN)

        total_students = User.objects.filter(is_staff=False).count()
        total_tests = TestSeries.objects.count()
        total_questions = Question.objects.count()
        total_attempts = TestAttempt.objects.count()
        avg_platform_acc = TestAttempt.objects.aggregate(avg_acc=Avg('accuracy'))['avg_acc'] or 0.0

        company_distribution = TestSeries.objects.values('company_name').annotate(count=Count('id')).order_by('-count')

        return Response({
            'total_students': total_students,
            'total_tests': total_tests,
            'total_questions': total_questions,
            'total_attempts': total_attempts,
            'avg_platform_accuracy': round(avg_platform_acc, 1),
            'company_distribution': company_distribution
        })


class AdminMembersView(APIView):
    def get(self, request):
        admin_user = check_is_admin(request)
        if not admin_user:
            return Response({'error': 'Unauthorized. Admin credentials required.'}, status=status.HTTP_403_FORBIDDEN)

        students = User.objects.all().order_by('-total_points', '-created_at')
        data = []
        for s in students:
            data.append({
                'id': str(s.id),
                'full_name': s.full_name,
                'email': s.email,
                'college': s.college,
                'total_points': s.total_points,
                'total_tests': s.total_tests,
                'total_correct': s.total_correct,
                'accuracy_percentage': s.accuracy_percentage,
                'is_staff': s.is_staff,
                'joined_date': s.created_at.strftime("%b %d, %Y")
            })

        return Response({'members': data})


class AdminTestManageView(APIView):
    def post(self, request):
        admin_user = check_is_admin(request)
        if not admin_user:
            return Response({'error': 'Unauthorized. Admin credentials required.'}, status=status.HTTP_403_FORBIDDEN)

        title = request.data.get('title')
        company_name = request.data.get('company_name', 'General')
        year = request.data.get('year', '2025')
        test_type = request.data.get('test_type', 'COMPANY')
        topic_category = request.data.get('topic_category', 'Full Mock')
        description = request.data.get('description', '')
        duration_minutes = int(request.data.get('duration_minutes', 25))

        import re
        slug = re.sub(r'[^a-zA-Z0-9]+', '-', f"{company_name}-{year}-{title}".lower()).strip('-')
        
        original_slug = slug
        counter = 1
        while TestSeries.objects.filter(slug=slug).exists():
            slug = f"{original_slug}-{counter}"
            counter += 1

        test = TestSeries.objects.create(
            title=title,
            slug=slug,
            company_name=company_name,
            year=year,
            test_type=test_type,
            topic_category=topic_category,
            description=description,
            duration_minutes=duration_minutes
        )

        return Response({
            'message': 'Test series created successfully',
            'test': TestSeriesListSerializer(test).data
        }, status=status.HTTP_201_CREATED)

    def delete(self, request, test_id=None):
        admin_user = check_is_admin(request)
        if not admin_user:
            return Response({'error': 'Unauthorized. Admin credentials required.'}, status=status.HTTP_403_FORBIDDEN)

        test = TestSeries.objects.filter(id=test_id).first()
        if not test:
            return Response({'error': 'Test not found'}, status=status.HTTP_404_NOT_FOUND)
        
        test.delete()
        return Response({'message': 'Test deleted successfully'})


class AdminQuestionManageView(APIView):
    def post(self, request):
        admin_user = check_is_admin(request)
        if not admin_user:
            return Response({'error': 'Unauthorized. Admin credentials required.'}, status=status.HTTP_403_FORBIDDEN)

        test_id = request.data.get('test_id')
        test = TestSeries.objects.filter(id=test_id).first()
        if not test:
            return Response({'error': 'Target test series not found'}, status=status.HTTP_404_NOT_FOUND)

        q = Question.objects.create(
            test=test,
            topic=request.data.get('topic', 'General Aptitude'),
            company_tag=request.data.get('company_tag', test.company_name),
            year_tag=request.data.get('year_tag', test.year),
            question_text=request.data.get('question_text'),
            option_a=request.data.get('option_a'),
            option_b=request.data.get('option_b'),
            option_c=request.data.get('option_c'),
            option_d=request.data.get('option_d'),
            correct_option=request.data.get('correct_option', 'A').upper(),
            step_by_step_solution=request.data.get('step_by_step_solution', ''),
            shortcut_formula=request.data.get('shortcut_formula', ''),
            order=test.questions.count() + 1
        )

        test.total_questions = test.questions.count()
        test.save()

        return Response({
            'message': 'Question added successfully',
            'question': QuestionAdminSerializer(q).data
        }, status=status.HTTP_201_CREATED)


class AdminBulkCSVUploadView(APIView):
    def post(self, request):
        import csv
        import io

        admin_user = check_is_admin(request)
        if not admin_user:
            return Response({'error': 'Unauthorized. Admin credentials required.'}, status=status.HTTP_403_FORBIDDEN)

        csv_file = request.FILES.get('csv_file')
        csv_text = request.data.get('csv_text')
        default_test_id = request.data.get('default_test_id')

        if not csv_file and not csv_text:
            return Response({'error': 'Please provide a CSV file or paste raw CSV text.'}, status=status.HTTP_400_BAD_REQUEST)

        if csv_file:
            try:
                decoded_file = csv_file.read().decode('utf-8')
                io_string = io.StringIO(decoded_file)
            except Exception as e:
                return Response({'error': f'Failed to decode file: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            io_string = io.StringIO(csv_text)

        reader = csv.DictReader(io_string)
        if not reader.fieldnames:
            return Response({'error': 'CSV format invalid or headers missing.'}, status=status.HTTP_400_BAD_REQUEST)

        # Normalize header keys
        imported_count = 0
        skipped_count = 0
        logs = []

        for row_idx, row in enumerate(reader, start=2):
            normalized_row = {k.strip().lower().replace(' ', '_'): v.strip() for k, v in row.items() if k}
            
            target_test_id = normalized_row.get('test_id') or default_test_id
            if not target_test_id:
                skipped_count += 1
                logs.append(f"Row {row_idx}: Skipped (Missing test_id)")
                continue

            test = TestSeries.objects.filter(id=target_test_id).first()
            if not test:
                skipped_count += 1
                logs.append(f"Row {row_idx}: Skipped (Test ID {target_test_id} not found)")
                continue

            q_text = normalized_row.get('question_text') or normalized_row.get('question')
            opt_a = normalized_row.get('option_a') or normalized_row.get('a')
            opt_b = normalized_row.get('option_b') or normalized_row.get('b')
            opt_c = normalized_row.get('option_c') or normalized_row.get('c')
            opt_d = normalized_row.get('option_d') or normalized_row.get('d')
            correct_opt = (normalized_row.get('correct_option') or normalized_row.get('answer') or 'A').upper().strip()
            topic = normalized_row.get('topic') or normalized_row.get('category') or test.topic_category or 'General Aptitude'
            solution = normalized_row.get('step_by_step_solution') or normalized_row.get('explanation') or normalized_row.get('solution') or ''
            formula = normalized_row.get('shortcut_formula') or normalized_row.get('formula') or ''

            if not q_text or not opt_a or not opt_b or not opt_c or not opt_d:
                skipped_count += 1
                logs.append(f"Row {row_idx}: Skipped (Incomplete question or options)")
                continue

            if correct_opt not in ['A', 'B', 'C', 'D']:
                correct_opt = 'A'

            Question.objects.create(
                test=test,
                topic=topic,
                company_tag=test.company_name,
                year_tag=test.year,
                question_text=q_text,
                option_a=opt_a,
                option_b=opt_b,
                option_c=opt_c,
                option_d=opt_d,
                correct_option=correct_opt,
                step_by_step_solution=solution,
                shortcut_formula=formula,
                order=test.questions.count() + 1
            )
            test.total_questions = test.questions.count()
            test.save()

            imported_count += 1

        return Response({
            'message': f'Import completed! {imported_count} questions imported, {skipped_count} skipped.',
            'imported_count': imported_count,
            'skipped_count': skipped_count,
            'logs': logs[:50]
        }, status=status.HTTP_200_OK)


def parse_questions_from_docx_or_text(text_content, default_topic="General Aptitude"):
    import re

    raw_blocks = re.split(r'\n(?=(?:Q(?:uestion)?\s*\d+[\.:\)]|\b\d+[\.:\)]\s+[A-Z]))', '\n' + text_content, flags=re.IGNORECASE)
    parsed_questions = []

    for block in raw_blocks:
        block = block.strip()
        if not block or len(block) < 15:
            continue

        q_match = re.search(r'^(?:Q(?:uestion)?\s*\d+[\.:\)]|\d+[\.:\)]\s*)?\s*(.*?)(?=\n\s*(?:\(?[A-Da-d]\)?[.:\s]|\bOption\s+[A-Da-d]))', block, flags=re.DOTALL | re.IGNORECASE)
        question_text = q_match.group(1).strip() if q_match else ""
        if not question_text:
            lines = block.split('\n')
            question_text = re.sub(r'^(?:Q(?:uestion)?\s*\d+[\.:\)]|\d+[\.:\)]\s*)?', '', lines[0]).strip()

        opt_a_m = re.search(r'(?:^|\n)\s*(?:\(?[Aa]\)?[.:\s]|\bOption\s+[Aa][:.]?\s*)(.*?)(?=\n\s*(?:\(?[Bb]\)?[.:\s]|\bOption\s+[Bb])|$)', block, flags=re.DOTALL)
        opt_b_m = re.search(r'(?:^|\n)\s*(?:\(?[Bb]\)?[.:\s]|\bOption\s+[Bb][:.]?\s*)(.*?)(?=\n\s*(?:\(?[Cc]\)?[.:\s]|\bOption\s+[Cc])|$)', block, flags=re.DOTALL)
        opt_c_m = re.search(r'(?:^|\n)\s*(?:\(?[Cc]\)?[.:\s]|\bOption\s+[Cc][:.]?\s*)(.*?)(?=\n\s*(?:\(?[Dd]\)?[.:\s]|\bOption\s+[Dd])|$)', block, flags=re.DOTALL)
        opt_d_m = re.search(r'(?:^|\n)\s*(?:\(?[Dd]\)?[.:\s]|\bOption\s+[Dd][:.]?\s*)(.*?)(?=\n\s*(?:Answer|Ans|Correct|Explanation|Solution|Topic|Category|Shortcut|Formula)|\n\s*\n|$)', block, flags=re.DOTALL | re.IGNORECASE)

        opt_a = opt_a_m.group(1).strip() if opt_a_m else ""
        opt_b = opt_b_m.group(1).strip() if opt_b_m else ""
        opt_c = opt_c_m.group(1).strip() if opt_c_m else ""
        opt_d = opt_d_m.group(1).strip() if opt_d_m else ""

        ans_m = re.search(r'(?:^|\n)\s*(?:Answer|Ans|Correct(?:\s+Option)?)\s*[:=\-]?\s*\(?([A-Da-d])\)?', block, flags=re.IGNORECASE)
        correct_option = ans_m.group(1).upper() if ans_m else "A"

        exp_m = re.search(r'(?:^|\n)\s*(?:Explanation|Solution|Step-by-step)\s*[:=\-]?\s*(.*?)(?=\n\s*(?:Shortcut|Formula|Topic|Category)|\n\s*\n|$)', block, flags=re.DOTALL | re.IGNORECASE)
        explanation = exp_m.group(1).strip() if exp_m else ""

        form_m = re.search(r'(?:^|\n)\s*(?:Shortcut(?:\s+Formula)?|Formula|Key\s+Rule)\s*[:=\-]?\s*(.*?)(?=\n\s*(?:Topic|Category)|\n\s*\n|$)', block, flags=re.DOTALL | re.IGNORECASE)
        formula = form_m.group(1).strip() if form_m else ""

        top_m = re.search(r'(?:^|\n)\s*(?:Topic|Category)\s*[:=\-]?\s*([^\n]+)', block, flags=re.IGNORECASE)
        topic = top_m.group(1).strip() if top_m else default_topic

        if question_text and (opt_a or opt_b):
            parsed_questions.append({
                'question_text': question_text,
                'option_a': opt_a or 'Option A',
                'option_b': opt_b or 'Option B',
                'option_c': opt_c or 'Option C',
                'option_d': opt_d or 'Option D',
                'correct_option': correct_option if correct_option in ['A', 'B', 'C', 'D'] else 'A',
                'step_by_step_solution': explanation or 'Step-by-step mathematical breakdown for this question.',
                'shortcut_formula': formula,
                'topic': topic
            })

    return parsed_questions


class AdminTestGenerateFromFileView(APIView):
    def post(self, request):
        import csv
        import io
        import docx

        admin_user = check_is_admin(request)
        if not admin_user:
            return Response({'error': 'Unauthorized. Admin credentials required.'}, status=status.HTTP_403_FORBIDDEN)

        title = request.data.get('title', '').strip()
        if not title:
            return Response({'error': 'Test title is required.'}, status=status.HTTP_400_BAD_REQUEST)

        test_type = request.data.get('test_type', 'COMPANY').upper()
        if test_type not in ['COMPANY', 'TOPIC', 'OTHER']:
            test_type = 'COMPANY'

        company_name = request.data.get('company_name', '').strip() or 'Campus Placement'
        year = request.data.get('year', '2026').strip()
        topic_category = request.data.get('topic_category', '').strip() or ('Full Mock' if test_type != 'TOPIC' else company_name)
        description = request.data.get('description', '').strip() or f"Authentic placement mock test series for {company_name} ({year})."
        
        try:
            duration_minutes = int(request.data.get('duration_minutes', 25))
        except (TypeError, ValueError):
            duration_minutes = 25

        uploaded_file = request.FILES.get('file')
        raw_text = request.data.get('raw_text', '').strip()

        if not uploaded_file and not raw_text:
            return Response({'error': 'Please upload a .csv or .docx file, or paste question text.'}, status=status.HTTP_400_BAD_REQUEST)

        parsed_questions = []
        file_ext = ''

        if uploaded_file:
            file_name = uploaded_file.name.lower()
            if file_name.endswith('.docx'):
                file_ext = 'docx'
                try:
                    doc = docx.Document(uploaded_file)
                    full_text = []
                    for p in doc.paragraphs:
                        if p.text:
                            full_text.append(p.text)
                    for table in doc.tables:
                        for row in table.rows:
                            r_text = [cell.text.strip() for cell in row.cells if cell.text.strip()]
                            if r_text:
                                full_text.append(" | ".join(r_text))
                    joined_text = "\n".join(full_text)
                    parsed_questions = parse_questions_from_docx_or_text(joined_text, default_topic=topic_category)
                except Exception as e:
                    return Response({'error': f'Failed to parse Word (.docx) file: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                file_ext = 'csv'
                try:
                    decoded = uploaded_file.read().decode('utf-8')
                    reader = csv.DictReader(io.StringIO(decoded))
                    if reader.fieldnames:
                        for row in reader:
                            norm = {k.strip().lower().replace(' ', '_'): v.strip() for k, v in row.items() if k}
                            q_text = norm.get('question_text') or norm.get('question')
                            opt_a = norm.get('option_a') or norm.get('a')
                            opt_b = norm.get('option_b') or norm.get('b')
                            opt_c = norm.get('option_c') or norm.get('c')
                            opt_d = norm.get('option_d') or norm.get('d')
                            correct_opt = (norm.get('correct_option') or norm.get('answer') or 'A').upper().strip()
                            topic = norm.get('topic') or norm.get('category') or topic_category
                            solution = norm.get('step_by_step_solution') or norm.get('explanation') or norm.get('solution') or ''
                            formula = norm.get('shortcut_formula') or norm.get('formula') or ''

                            if q_text and opt_a and opt_b:
                                parsed_questions.append({
                                    'question_text': q_text,
                                    'option_a': opt_a,
                                    'option_b': opt_b,
                                    'option_c': opt_c or 'Option C',
                                    'option_d': opt_d or 'Option D',
                                    'correct_option': correct_opt if correct_opt in ['A', 'B', 'C', 'D'] else 'A',
                                    'step_by_step_solution': solution or 'Step-by-step mathematical breakdown.',
                                    'shortcut_formula': formula,
                                    'topic': topic
                                })
                    else:
                        parsed_questions = parse_questions_from_docx_or_text(decoded, default_topic=topic_category)
                except Exception as e:
                    return Response({'error': f'Failed to parse CSV file: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            if 'option_a' in raw_text.lower() or 'question_text' in raw_text.lower():
                try:
                    reader = csv.DictReader(io.StringIO(raw_text))
                    for row in reader:
                        norm = {k.strip().lower().replace(' ', '_'): v.strip() for k, v in row.items() if k}
                        q_text = norm.get('question_text') or norm.get('question')
                        opt_a = norm.get('option_a') or norm.get('a')
                        opt_b = norm.get('option_b') or norm.get('b')
                        opt_c = norm.get('option_c') or norm.get('c')
                        opt_d = norm.get('option_d') or norm.get('d')
                        correct_opt = (norm.get('correct_option') or norm.get('answer') or 'A').upper().strip()
                        topic = norm.get('topic') or norm.get('category') or topic_category
                        solution = norm.get('step_by_step_solution') or norm.get('explanation') or norm.get('solution') or ''
                        formula = norm.get('shortcut_formula') or norm.get('formula') or ''

                        if q_text and opt_a and opt_b:
                            parsed_questions.append({
                                'question_text': q_text,
                                'option_a': opt_a,
                                'option_b': opt_b,
                                'option_c': opt_c or 'Option C',
                                'option_d': opt_d or 'Option D',
                                'correct_option': correct_opt if correct_opt in ['A', 'B', 'C', 'D'] else 'A',
                                'step_by_step_solution': solution or 'Step-by-step solution breakdown.',
                                'shortcut_formula': formula,
                                'topic': topic
                            })
                except Exception:
                    parsed_questions = parse_questions_from_docx_or_text(raw_text, default_topic=topic_category)
            else:
                parsed_questions = parse_questions_from_docx_or_text(raw_text, default_topic=topic_category)

        if not parsed_questions:
            return Response({
                'error': 'Could not extract any valid questions from the uploaded file or text. Please verify the question format against the sample templates.'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Generate unique slug
        from django.utils.text import slugify
        base_slug = slugify(title) or "placement-test"
        slug = base_slug
        counter = 1
        while TestSeries.objects.filter(slug=slug).exists():
            slug = f"{base_slug}-{counter}"
            counter += 1

        # Match or create category
        cat_slug = slugify(company_name) or "general"
        category_obj, _ = CompanyCategory.objects.get_or_create(
            slug=cat_slug,
            defaults={"name": company_name, "icon": "file-text", "description": f"Placement tests for {company_name}."}
        )

        test = TestSeries.objects.create(
            title=title,
            slug=slug,
            category=category_obj,
            company_name=company_name,
            year=year,
            test_type=test_type,
            topic_category=topic_category,
            description=description,
            duration_minutes=max(10, len(parsed_questions) if duration_minutes == 25 and len(parsed_questions) > 25 else duration_minutes),
            total_questions=len(parsed_questions),
            is_active=True
        )

        for idx, q_data in enumerate(parsed_questions, start=1):
            Question.objects.create(
                test=test,
                topic=q_data['topic'],
                company_tag=f"{company_name} {year}",
                year_tag=year,
                question_text=q_data['question_text'],
                option_a=q_data['option_a'],
                option_b=q_data['option_b'],
                option_c=q_data['option_c'],
                option_d=q_data['option_d'],
                correct_option=q_data['correct_option'],
                step_by_step_solution=q_data['step_by_step_solution'],
                shortcut_formula=q_data.get('shortcut_formula', ''),
                order=idx
            )

        test.total_questions = test.questions.count()
        test.save()

        return Response({
            'message': f"Test series '{test.title}' generated successfully with {test.total_questions} questions!",
            'test': TestSeriesListSerializer(test).data,
            'imported_count': test.total_questions,
            'logs': [f"Q{i+1}: {q['question_text'][:80]}... [Correct: Option {q['correct_option']}]" for i, q in enumerate(parsed_questions[:10])]
        }, status=status.HTTP_201_CREATED)


class AdminDownloadSampleDocxView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        import docx
        import io
        from django.http import HttpResponse

        doc = docx.Document()
        doc.add_heading('FirstRound — Placement Test Question Template (.docx)', level=1)
        doc.add_paragraph('This template demonstrates the standard question block formatting accepted by the FirstRound Test Generator. You can edit, copy, and add your placement questions below.')

        sample_questions = [
            {
                "num": 1,
                "q": "What is the next number in the placement cubic series: 0, 4, 18, 48, 100, ?",
                "a": "180", "b": "160", "c": "196", "d": "210",
                "ans": "A",
                "exp": "The series follows the formula T(n) = n^3 - n^2:\n1^3-1^2=0, 2^3-2^2=4, 3^3-3^2=18, 4^3-4^2=48, 5^3-5^2=100, 6^3-6^2 = 216 - 36 = 180.",
                "formula": "T(n) = n^3 - n^2",
                "topic": "Number Series"
            },
            {
                "num": 2,
                "q": "A candidate rows a boat 18 km downstream in 2 hours and rows back the same distance upstream in 6 hours. What is the speed of the current?",
                "a": "3 km/h", "b": "6 km/h", "c": "4.5 km/h", "d": "2 km/h",
                "ans": "A",
                "exp": "Downstream speed u + v = 18/2 = 9 km/h.\nUpstream speed u - v = 18/6 = 3 km/h.\nCurrent speed v = (9 - 3) / 2 = 6 / 2 = 3 km/h.",
                "formula": "v = (Downstream - Upstream) / 2",
                "topic": "Speed, Time & Distance"
            },
            {
                "num": 3,
                "q": "What will be the exact output of this C code snippet?\n#include <stdio.h>\nint main() {\n    int a = 12, b = 25;\n    printf(\"%d\", a ^ b);\n    return 0;\n}",
                "a": "21", "b": "37", "c": "13", "d": "29",
                "ans": "A",
                "exp": "Bitwise XOR (a ^ b):\na = 12 (0000 1100 in binary)\nb = 25 (0001 1001 in binary)\na ^ b = 0001 0101 in binary = 16 + 4 + 1 = 21.",
                "formula": "12 XOR 25 = 21",
                "topic": "Core Technical"
            }
        ]

        for q in sample_questions:
            doc.add_heading(f"Q{q['num']}. {q['q']}", level=2)
            doc.add_paragraph(f"A) {q['a']}")
            doc.add_paragraph(f"B) {q['b']}")
            doc.add_paragraph(f"C) {q['c']}")
            doc.add_paragraph(f"D) {q['d']}")
            doc.add_paragraph(f"Answer: {q['ans']}")
            doc.add_paragraph(f"Explanation: {q['exp']}")
            doc.add_paragraph(f"Shortcut: {q['formula']}")
            doc.add_paragraph(f"Topic: {q['topic']}")
            doc.add_paragraph()

        bio = io.BytesIO()
        doc.save(bio)
        bio.seek(0)

        response = HttpResponse(
            bio.getvalue(),
            content_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        )
        response['Content-Disposition'] = 'attachment; filename="firstround_sample_placement_test.docx"'
        return response


class BookmarkToggleView(APIView):
    def post(self, request):
        user_id = request.data.get('user_id')
        question_id = request.data.get('question_id')

        if not user_id or not question_id:
            return Response({'error': 'user_id and question_id are required.'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.filter(id=user_id).first()
        question = Question.objects.filter(id=question_id).first()

        if not user or not question:
            return Response({'error': 'User or Question not found.'}, status=status.HTTP_404_NOT_FOUND)

        bookmark = BookmarkedQuestion.objects.filter(user=user, question=question).first()
        if bookmark:
            bookmark.delete()
            return Response({
                'bookmarked': False,
                'message': 'Question removed from Revision Vault.',
                'question_id': question.id
            }, status=status.HTTP_200_OK)
        else:
            BookmarkedQuestion.objects.create(user=user, question=question)
            return Response({
                'bookmarked': True,
                'message': 'Question saved to Revision Vault!',
                'question_id': question.id
            }, status=status.HTTP_201_CREATED)


class BookmarkedQuestionsListView(APIView):
    def get(self, request):
        user_id = request.query_params.get('user_id')
        if not user_id:
            return Response({'bookmarks': []})

        bookmarks = BookmarkedQuestion.objects.filter(user_id=user_id).select_related('question', 'question__test')
        serializer = BookmarkedQuestionSerializer(bookmarks, many=True)
        return Response({'bookmarks': serializer.data})


class WeakQuestionsListView(APIView):
    def get(self, request):
        user_id = request.query_params.get('user_id')
        if not user_id:
            return Response({'weak_questions': []})

        # Find questions the user answered incorrectly in past attempts
        wrong_responses = (
            QuestionResponse.objects
            .filter(attempt__user_id=user_id, is_correct=False)
            .select_related('question', 'question__test')
            .order_by('-attempt__completed_at')
        )

        seen_q_ids = set()
        weak_list = []

        for wr in wrong_responses:
            q = wr.question
            if q.id not in seen_q_ids:
                seen_q_ids.add(q.id)
                weak_list.append({
                    'id': q.id,
                    'topic': q.topic,
                    'company_tag': q.company_tag,
                    'year_tag': q.year_tag,
                    'question_text': q.question_text,
                    'option_a': q.option_a,
                    'option_b': q.option_b,
                    'option_c': q.option_c,
                    'option_d': q.option_d,
                    'correct_option': q.correct_option,
                    'step_by_step_solution': q.step_by_step_solution,
                    'shortcut_formula': q.shortcut_formula,
                    'test_id': q.test_id,
                    'test_title': q.test.title if q.test else 'Placement Test',
                    'last_wrong_choice': wr.selected_option
                })

        return Response({'weak_questions': weak_list})


class MegaEventListView(APIView):
    def get(self, request):
        events = MegaEvent.objects.filter(is_active=True).select_related('test_series')
        serializer = MegaEventSerializer(events, many=True)
        return Response({'mega_events': serializer.data})

    def post(self, request):
        admin_user = check_is_admin(request)
        if not admin_user:
            return Response({'error': 'Unauthorized. Admin credentials required.'}, status=status.HTTP_403_FORBIDDEN)

        title = request.data.get('title', '').strip()
        test_id = request.data.get('test_series_id')
        banner_tag = request.data.get('banner_tag', 'ALL-INDIA MEGA RECRUITMENT DRIVE').strip()
        company_tag = request.data.get('company_tag', 'TCS NQT 2026').strip()
        description = request.data.get('description', '').strip()
        start_datetime = request.data.get('start_datetime')
        end_datetime = request.data.get('end_datetime')
        duration_minutes = int(request.data.get('duration_minutes', 30))

        if not title or not test_id or not start_datetime or not end_datetime:
            return Response({'error': 'Title, Test Series, Start and End datetimes are required.'}, status=status.HTTP_400_BAD_REQUEST)

        test = TestSeries.objects.filter(id=test_id).first()
        if not test:
            return Response({'error': 'Target test series not found.'}, status=status.HTTP_404_NOT_FOUND)

        event = MegaEvent.objects.create(
            title=title,
            test_series=test,
            banner_tag=banner_tag,
            company_tag=company_tag,
            description=description or f"All-India Live Mega Drive Mock Assessment for {company_tag}.",
            start_datetime=start_datetime,
            end_datetime=end_datetime,
            duration_minutes=duration_minutes,
            is_active=True
        )

        return Response({
            'message': f"Mega Event '{event.title}' scheduled successfully!",
            'event': MegaEventSerializer(event).data
        }, status=status.HTTP_201_CREATED)


class MegaEventLeaderboardView(APIView):
    def get(self, request, event_id):
        event = MegaEvent.objects.filter(id=event_id, is_active=True).first()
        if not event:
            return Response({'error': 'Mega Event not found.'}, status=status.HTTP_404_NOT_FOUND)

        status_str = event.get_event_status()
        
        # If event is still active / upcoming and admin hasn't revealed leaderboard yet
        if status_str != "ENDED" and not event.is_leaderboard_revealed:
            return Response({
                'status': 'LOCKED',
                'event_title': event.title,
                'message': 'All-India leaderboard is locked while the live contest arena is in session. Ranks will unlock immediately upon contest expiration.',
                'unlock_datetime': event.end_datetime,
                'participants_count': event.attempts.count()
            })

        # Calculate ranked leaderboard for this event
        attempts = (
            TestAttempt.objects
            .filter(mega_event=event)
            .select_related('user')
            .order_by('-score', '-accuracy', 'time_taken_seconds')
        )

        ranked_list = []
        for rank, att in enumerate(attempts, start=1):
            ranked_list.append({
                'rank': rank,
                'user_name': att.user.full_name,
                'college': att.user.college,
                'score': att.score,
                'total_questions': att.total_questions,
                'accuracy': att.accuracy,
                'points_earned': att.points_earned,
                'time_taken_seconds': att.time_taken_seconds,
                'completed_at': att.completed_at
            })

        return Response({
            'status': 'REVEALED',
            'event_title': event.title,
            'participants_count': len(ranked_list),
            'leaderboard': ranked_list
        })



