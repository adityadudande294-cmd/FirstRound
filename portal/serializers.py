from rest_framework import serializers
from .models import (
    User, CompanyCategory, TestSeries, Question, TestAttempt,
    QuestionResponse, BookmarkedQuestion, MegaEvent,
    UserTestProgress, CodingSubmission
)


class UserSerializer(serializers.ModelSerializer):
    rank = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'id', 'email', 'full_name', 'college', 'role', 'total_points', 
            'total_tests', 'total_questions_solved', 'total_correct', 
            'total_incorrect', 'accuracy_percentage', 'total_time_taken_seconds',
            'is_staff', 'is_superuser', 'rank', 'created_at'
        ]
        read_only_fields = ['id', 'total_points', 'total_tests', 'total_questions_solved', 'total_correct', 'total_incorrect', 'accuracy_percentage', 'rank', 'created_at']

    def get_rank(self, obj):
        return User.objects.filter(is_active=True, total_points__gt=obj.total_points).count() + 1


class UserPublicSerializer(serializers.ModelSerializer):
    rank = serializers.IntegerField(read_only=True)

    class Meta:
        model = User
        fields = [
            'id', 'full_name', 'college', 'role', 'total_points',
            'total_tests', 'total_questions_solved', 'total_correct',
            'accuracy_percentage', 'total_time_taken_seconds', 'rank'
        ]


class QuestionAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'


class QuestionStudentSerializer(serializers.ModelSerializer):
    questionText = serializers.CharField(source='question_text', read_only=True)
    questionType = serializers.SerializerMethodField()
    options = serializers.SerializerMethodField()
    correctOption = serializers.CharField(source='correct_option', read_only=True)
    explanation = serializers.CharField(source='step_by_step_solution', read_only=True)
    shortcutFormula = serializers.CharField(source='shortcut_formula', read_only=True)
    companyTag = serializers.CharField(source='company_tag', read_only=True)
    yearTag = serializers.CharField(source='year_tag', read_only=True)
    testSeriesId = serializers.CharField(source='test.id', read_only=True)
    difficulty = serializers.SerializerMethodField()

    class Meta:
        model = Question
        fields = [
            'id', 'topic', 'company_tag', 'year_tag',
            'question_text', 'option_a', 'option_b', 'option_c', 'option_d',
            'correct_option', 'step_by_step_solution', 'shortcut_formula', 'order',
            # React camelCase fields
            'questionText', 'questionType', 'options', 'correctOption',
            'explanation', 'shortcutFormula', 'companyTag', 'yearTag',
            'testSeriesId', 'difficulty'
        ]

    def get_questionType(self, obj):
        return 'MCQ_SINGLE'

    def get_difficulty(self, obj):
        return 'Medium'

    def get_options(self, obj):
        return [
            {'id': 'A', 'text': obj.option_a},
            {'id': 'B', 'text': obj.option_b},
            {'id': 'C', 'text': obj.option_c},
            {'id': 'D', 'text': obj.option_d},
        ]


class TestSeriesListSerializer(serializers.ModelSerializer):
    question_count = serializers.IntegerField(source='questions.count', read_only=True)
    durationMinutes = serializers.IntegerField(source='duration_minutes', read_only=True)
    duration = serializers.IntegerField(source='duration_minutes', read_only=True)
    totalQuestions = serializers.IntegerField(source='total_questions', read_only=True)
    questionCount = serializers.IntegerField(source='questions.count', read_only=True)
    company = serializers.CharField(source='company_name', read_only=True)
    companyName = serializers.CharField(source='company_name', read_only=True)
    approvalStatus = serializers.CharField(source='approval_status', read_only=True)
    createdByName = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()
    verificationStatus = serializers.SerializerMethodField()
    supportedRoles = serializers.SerializerMethodField()
    topics = serializers.SerializerMethodField()
    skills = serializers.SerializerMethodField()
    scoringModel = serializers.SerializerMethodField()

    class Meta:
        model = TestSeries
        fields = [
            'id', 'title', 'slug', 'company_name', 'year', 'test_type',
            'topic_category', 'description', 'duration_minutes',
            'total_questions', 'difficulty', 'question_count', 'is_active', 
            'approval_status', 'created_by', 'created_at',
            # React camelCase fields
            'durationMinutes', 'duration', 'totalQuestions', 'questionCount',
            'company', 'companyName', 'approvalStatus', 'createdByName', 'category', 'status', 'verificationStatus',
            'supportedRoles', 'topics', 'skills', 'scoringModel'
        ]

    def get_createdByName(self, obj):
        return obj.created_by.full_name if obj.created_by else 'System / Super Admin'

    def get_category(self, obj):
        t_type = (obj.test_type or '').upper()
        if t_type in ['FOUNDATION', 'TOPIC']:
            return 'foundation'
        elif t_type in ['COMPANY']:
            return 'company'
        elif t_type in ['CODING']:
            return 'coding'
        # Check topic or title keywords
        title_lower = (obj.title or '').lower()
        topic_lower = (obj.topic_category or '').lower()
        if 'coding' in title_lower or 'dsa' in title_lower or 'sql' in title_lower or 'core cs' in title_lower:
            return 'coding'
        if 'wipro' in title_lower or 'tcs' in title_lower or 'infosys' in title_lower or 'accenture' in title_lower or 'cognizant' in title_lower:
            return 'company'
        return 'foundation'

    def get_status(self, obj):
        return 'ready'

    def get_verificationStatus(self, obj):
        return 'VERIFIED'

    def get_supportedRoles(self, obj):
        return ['SE', 'SDE', 'Analyst', 'Associate Software Engineer']

    def get_topics(self, obj):
        return [obj.topic_category] if obj.topic_category else ['General Aptitude']

    def get_skills(self, obj):
        return [obj.topic_category] if obj.topic_category else ['Placement Aptitude']

    def get_scoringModel(self, obj):
        return '+10 / -2'


class TestSeriesDetailSerializer(TestSeriesListSerializer):
    questions = QuestionStudentSerializer(many=True, read_only=True)

    class Meta(TestSeriesListSerializer.Meta):
        fields = TestSeriesListSerializer.Meta.fields + ['questions']


class TestAttemptSerializer(serializers.ModelSerializer):
    test_title = serializers.CharField(source='test.title', read_only=True)
    user_name = serializers.CharField(source='user.full_name', read_only=True)

    class Meta:
        model = TestAttempt
        fields = [
            'id', 'user', 'user_name', 'test', 'test_title', 'mode',
            'timer_per_question', 'score', 'total_questions',
            'correct_count', 'incorrect_count', 'unanswered_count',
            'accuracy', 'points_earned', 'time_taken_seconds',
            'average_speed_seconds', 'topic_breakdown', 'strengths',
            'weaknesses', 'tab_switches_count', 'integrity_flag',
            'submission_reason', 'is_mega_event_attempt', 'mega_event', 'completed_at'
        ]
        read_only_fields = ['id', 'completed_at']


class BookmarkedQuestionSerializer(serializers.ModelSerializer):
    question = QuestionStudentSerializer(read_only=True)
    test_title = serializers.CharField(source='question.test.title', read_only=True)
    test_id = serializers.IntegerField(source='question.test.id', read_only=True)

    class Meta:
        model = BookmarkedQuestion
        fields = ['id', 'user', 'question', 'test_title', 'test_id', 'created_at']


class MegaEventSerializer(serializers.ModelSerializer):
    test_title = serializers.CharField(source='test_series.title', read_only=True)
    total_questions = serializers.IntegerField(source='test_series.total_questions', read_only=True)
    status = serializers.SerializerMethodField()
    participant_count = serializers.SerializerMethodField()

    class Meta:
        model = MegaEvent
        fields = [
            'id', 'title', 'test_series', 'test_title', 'total_questions',
            'banner_tag', 'company_tag', 'description', 'start_datetime',
            'end_datetime', 'duration_minutes', 'is_active',
            'is_leaderboard_revealed', 'status', 'participant_count', 'created_at'
        ]

    def get_status(self, obj):
        return obj.get_event_status()

    def get_participant_count(self, obj):
        return obj.attempts.count()


class CodingSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CodingSubmission
        fields = '__all__'


class UserTestProgressSerializer(serializers.ModelSerializer):
    testId = serializers.CharField(source='test.id', read_only=True)
    testTitle = serializers.CharField(source='test.title', read_only=True)

    class Meta:
        model = UserTestProgress
        fields = ['id', 'testId', 'testTitle', 'status', 'mode', 'last_visited_at', 'completed_at']


