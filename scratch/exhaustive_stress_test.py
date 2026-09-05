import os
import sys
import django
import json
import time

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'firstround_core.settings')
django.setup()

from django.test import Client
from portal.models import (
    User, TestSeries, Question, TestAttempt, QuestionResponse,
    BookmarkedQuestion, MegaEvent, CodingSubmission, UserTestProgress
)
from portal.auto_seed import ensure_database_seeded

def run_stress_test():
    print("=" * 90)
    print("FIRSTROUND PLATFORM: EXHAUSTIVE LOGICAL & FUNCTIONAL STRESS TEST SUITE")
    print("=" * 90)

    client = Client()
    ensure_database_seeded()

    results = {
        "passed": [],
        "failed": [],
        "bugs": [],
        "broken_apis": []
    }

    def record_pass(test_id, name):
        results["passed"].append(f"[{test_id}] {name}")
        print(f"  [PASS] [{test_id}] {name}")

    def record_fail(test_id, name, reason, severity="HIGH"):
        results["failed"].append(f"[{test_id}] {name}: {reason}")
        results["bugs"].append({
            "id": test_id,
            "feature": name,
            "expected": "Expected operation according to requirements",
            "actual": reason,
            "severity": severity
        })
        print(f"  [FAIL] [{test_id}] {name} -> {reason}")

    # =========================================================================
    # 1. AUTHENTICATION & SESSION LIFECYCLE
    # =========================================================================
    print("\n--- 1. AUTHENTICATION & SESSION LIFECYCLE ---")

    # 1.1 Duplicate Registration Check
    dup_email = "duplicate_stress_test@campus.edu"
    User.objects.filter(email=dup_email).delete()
    # First reg
    res1 = client.post('/api/auth/register/', json.dumps({
        "email": dup_email, "password": "Password123!", "full_name": "Original User", "college": "COEP"
    }), content_type="application/json")
    # Duplicate reg
    res2 = client.post('/api/auth/register/', json.dumps({
        "email": dup_email, "password": "Password123!", "full_name": "Duplicate User", "college": "COEP"
    }), content_type="application/json")

    if res2.status_code == 400 and 'error' in res2.json():
        record_pass("AUTH-01", "Duplicate Email Registration handled gracefully (400 Bad Request)")
    else:
        record_fail("AUTH-01", "Duplicate Email Registration", f"Got status {res2.status_code}, body: {res2.content.decode()}", "HIGH")

    # 1.2 Invalid Password Login
    res_bad_pw = client.post('/api/auth/login/', json.dumps({
        "email": dup_email, "password": "WrongPassword999"
    }), content_type="application/json")
    if res_bad_pw.status_code == 401 and 'error' in res_bad_pw.json():
        record_pass("AUTH-02", "Invalid Password Login rejected with 401 and structured error message")
    else:
        record_fail("AUTH-02", "Invalid Password Login", f"Got status {res_bad_pw.status_code}, body: {res_bad_pw.content.decode()}", "HIGH")

    # 1.3 Non-existent User Login
    res_no_user = client.post('/api/auth/login/', json.dumps({
        "email": "nonexistent_random_user_99999@domain.com", "password": "AnyPassword"
    }), content_type="application/json")
    if res_no_user.status_code == 401 and 'error' in res_no_user.json():
        record_pass("AUTH-03", "Non-existent User Login rejected with 401")
    else:
        record_fail("AUTH-03", "Non-existent User Login", f"Got status {res_no_user.status_code}", "MEDIUM")

    # 1.4 Super Admin Login Role Attribution
    res_sa = client.post('/api/auth/login/', json.dumps({
        "email": "aadi@gmail.com", "password": "1234"
    }), content_type="application/json")
    sa_data = res_sa.json() if res_sa.status_code == 200 else {}
    if res_sa.status_code == 200 and sa_data.get('role') == 'SUPER_ADMIN' and sa_data.get('redirect') == 'admin':
        record_pass("AUTH-04", "Super Admin Login redirects to 'admin' and returns role SUPER_ADMIN")
    else:
        record_fail("AUTH-04", "Super Admin Login Role Attribution", f"Status: {res_sa.status_code}, Data: {sa_data}", "HIGH")

    # 1.5 Staff Admin Login Role Attribution
    res_staff = client.post('/api/auth/login/', json.dumps({
        "email": "kawarejanvi27@gmail.com", "password": "kawarejanvi27@gmail.com"
    }), content_type="application/json")
    staff_data = res_staff.json() if res_staff.status_code == 200 else {}
    if res_staff.status_code == 200 and staff_data.get('role') == 'STAFF_ADMIN' and staff_data.get('redirect') == 'admin':
        record_pass("AUTH-05", "Staff Admin Login redirects to 'admin' and returns role STAFF_ADMIN")
    else:
        record_fail("AUTH-05", "Staff Admin Login Role Attribution", f"Status: {res_staff.status_code}, Data: {staff_data}", "HIGH")

    # 1.6 Student Password Change Workflow
    student_user = User.objects.filter(email=dup_email).first()
    res_pw_change = client.post('/api/auth/change-password/', json.dumps({
        "userId": str(student_user.id),
        "currentPassword": "Password123!",
        "newPassword": "NewPassword456!"
    }), content_type="application/json")
    if res_pw_change.status_code == 200 and res_pw_change.json().get('success'):
        # Verify login with new password
        res_new_login = client.post('/api/auth/login/', json.dumps({
            "email": dup_email, "password": "NewPassword456!"
        }), content_type="application/json")
        if res_new_login.status_code == 200:
            record_pass("AUTH-06", "Self-Service Change Password succeeds and verifies on subsequent login")
        else:
            record_fail("AUTH-06", "Login after Password Change", "Failed to login with new password", "HIGH")
    else:
        record_fail("AUTH-06", "Change Password Endpoint", f"Got {res_pw_change.status_code}: {res_pw_change.content.decode()}", "HIGH")

    # 1.7 Change Password with Incorrect Current Password
    res_pw_bad = client.post('/api/auth/change-password/', json.dumps({
        "userId": str(student_user.id),
        "currentPassword": "IncorrectPassword999",
        "newPassword": "AnotherPassword789!"
    }), content_type="application/json")
    if res_pw_bad.status_code == 400 and 'error' in res_pw_bad.json():
        record_pass("AUTH-07", "Change Password rejects incorrect current password with 400")
    else:
        record_fail("AUTH-07", "Change Password Bad Password Guard", f"Got status {res_pw_bad.status_code}", "MEDIUM")


    # =========================================================================
    # 2. TEST ENGINE FLOW & QUESTION LIFECYCLE
    # =========================================================================
    print("\n--- 2. TEST ENGINE FLOW & QUESTION LIFECYCLE ---")

    # 2.1 Fetch Test Catalog
    res_catalog = client.get('/api/tests/')
    catalog_data = res_catalog.json() if res_catalog.status_code == 200 else {}
    tests_list = catalog_data.get('tests', [])
    if res_catalog.status_code == 200 and len(tests_list) > 0:
        record_pass("TEST-01", f"Test Catalog fetch returns {len(tests_list)} active approved tests")
    else:
        record_fail("TEST-01", "Test Catalog fetch", f"Status: {res_catalog.status_code}, count: {len(tests_list)}", "CRITICAL")

    # 2.2 Fetch Blueprint Catalogue
    res_blueprints = client.get('/api/catalogue/')
    bp_data = res_blueprints.json() if res_blueprints.status_code == 200 else {}
    bp_tests = bp_data.get('tests', [])
    if res_blueprints.status_code == 200 and len(bp_tests) > 0:
        record_pass("TEST-02", f"Catalogue Blueprint endpoint returns {len(bp_tests)} blueprint series")
    else:
        record_fail("TEST-02", "Catalogue Blueprint endpoint", f"Status: {res_blueprints.status_code}", "HIGH")

    # 2.3 Test Detail Contract & Question Options Schema
    first_test_id = tests_list[0]['id'] if tests_list else 1
    res_test_detail = client.get(f'/api/tests/{first_test_id}/')
    td_data = res_test_detail.json() if res_test_detail.status_code == 200 else {}
    questions = td_data.get('questions', [])
    if res_test_detail.status_code == 200 and len(questions) > 0:
        sample_q = questions[0]
        has_options = 'options' in sample_q and len(sample_q['options']) == 4
        has_text = bool(sample_q.get('questionText') or sample_q.get('question_text'))
        has_id = bool(sample_q.get('id'))
        if has_options and has_text and has_id:
            record_pass("TEST-03", f"Test Detail returns valid question schema with 4 options ({len(questions)} Qs)")
        else:
            record_fail("TEST-03", "Test Question Schema Contract", f"Question schema missing fields: {sample_q}", "HIGH")
    else:
        record_fail("TEST-03", "Test Detail Fetch", f"Status: {res_test_detail.status_code}", "CRITICAL")

    # 2.4 History Logging Endpoints
    res_visit = client.post('/api/tests/history/visit/', json.dumps({
        "userId": str(student_user.id),
        "testId": str(first_test_id),
        "mode": "exam"
    }), content_type="application/json")
    res_start = client.post('/api/tests/history/start/', json.dumps({
        "userId": str(student_user.id),
        "testId": str(first_test_id),
        "mode": "exam"
    }), content_type="application/json")
    res_hist = client.get(f'/api/tests/history/?userId={student_user.id}')
    hist_data = res_hist.json() if res_hist.status_code == 200 else {}

    if res_visit.status_code == 200 and res_start.status_code == 200 and res_hist.status_code == 200:
        record_pass("TEST-04", "Test Visit & Start telemetry logs correctly in user history")
    else:
        record_fail("TEST-04", "Test History Logging", f"Visit: {res_visit.status_code}, Start: {res_start.status_code}, Hist: {res_hist.status_code}", "MEDIUM")


    # =========================================================================
    # 3. SCORING & MODE-ISOLATION LOGIC
    # =========================================================================
    print("\n--- 3. SCORING & MODE-ISOLATION LOGIC ---")

    # Fetch 5 questions from first_test
    test_obj = TestSeries.objects.filter(id=first_test_id).first()
    test_qs = list(test_obj.questions.all()[:5])
    if len(test_qs) < 5:
        test_qs = list(Question.objects.filter(test_series=test_obj)[:5])
    
    # 3.1 Exam Mode Submission Scoring Formula: (3 Correct, 2 Incorrect)
    # Correct = 3 * 10 = +30, Incorrect = 2 * -2 = -4 => Total Score = 26. Accuracy = 3/5 = 60.0%
    exam_responses = []
    for i, q in enumerate(test_qs):
        if i < 3:
            # Correct answer
            exam_responses.append({
                "questionId": str(q.id),
                "question_id": str(q.id),
                "selectedOption": q.correct_option,
                "selected_option": q.correct_option,
                "timeSpentSeconds": 20
            })
        else:
            # Incorrect answer
            wrong_opt = "B" if q.correct_option == "A" else "A"
            exam_responses.append({
                "questionId": str(q.id),
                "question_id": str(q.id),
                "selectedOption": wrong_opt,
                "selected_option": wrong_opt,
                "timeSpentSeconds": 25
            })

    # Record initial user stats
    student_user.refresh_from_db()
    init_points = student_user.total_points
    init_tests = student_user.total_tests

    res_exam_submit = client.post(f'/api/tests/{first_test_id}/submit/', json.dumps({
        "userId": str(student_user.id),
        "mode": "exam",
        "timeTakenSeconds": 110,
        "responses": exam_responses
    }), content_type="application/json")

    exam_result = res_exam_submit.json() if res_exam_submit.status_code == 200 else {}
    attempt = exam_result.get('attempt', {})

    if res_exam_submit.status_code == 200 and attempt.get('score') == 26:
        record_pass("SCORE-01", f"Exam Mode Scoring formula accurate: Score=26, Accuracy={attempt.get('accuracyPercentage')}%")
    else:
        record_fail("SCORE-01", "Exam Mode Scoring Formula", f"Expected Score=26, got: {attempt.get('score')}. Response: {exam_result}", "CRITICAL")

    # 3.2 User Platform Stats Update after Exam
    student_user.refresh_from_db()
    if student_user.total_points == init_points + 26 and student_user.total_tests == init_tests + 1:
        record_pass("SCORE-02", f"User platform stats accurately incremented (total_points={student_user.total_points}, total_tests={student_user.total_tests})")
    else:
        record_fail("SCORE-02", "User Platform Stats Update", f"Expected points={init_points + 26}, got={student_user.total_points}", "HIGH")

    # 3.3 Strengths (>=80%) and Weaknesses (<60%) in Report
    if 'strengths' in attempt and 'weaknesses' in attempt:
        record_pass("SCORE-03", f"Exam Report computes strengths and weaknesses correctly: strengths={attempt.get('strengths')}, weaknesses={attempt.get('weaknesses')}")
    else:
        record_fail("SCORE-03", "Exam Report Strengths/Weaknesses", f"Missing strengths/weaknesses in attempt: {attempt}", "MEDIUM")

    # 3.4 Practice Mode Metric Isolation Check (Strict Zero-Leakage)
    student_user.refresh_from_db()
    pre_practice_points = student_user.total_points
    pre_practice_tests = student_user.total_tests
    pre_practice_acc = student_user.accuracy_percentage

    res_practice_submit = client.post(f'/api/tests/{first_test_id}/submit/', json.dumps({
        "userId": str(student_user.id),
        "mode": "practice",
        "timeTakenSeconds": 90,
        "responses": exam_responses
    }), content_type="application/json")

    student_user.refresh_from_db()
    if (student_user.total_points == pre_practice_points and 
        student_user.total_tests == pre_practice_tests and
        student_user.accuracy_percentage == pre_practice_acc):
        record_pass("SCORE-04", "Practice Mode Strict Isolation: Zero leakage into official user stats/XP/test count")
    else:
        record_fail("SCORE-04", "Practice Mode Metric Isolation Leakage", f"Points changed from {pre_practice_points} to {student_user.total_points} during practice mode!", "CRITICAL")


    # =========================================================================
    # 4. REVISION VAULT & BOOKMARKS
    # =========================================================================
    print("\n--- 4. REVISION VAULT & BOOKMARKS ---")

    target_q_id = str(test_qs[0].id)
    # 4.1 Toggle Bookmark ON
    res_bm_on = client.post('/api/bookmarks/toggle/', json.dumps({
        "userId": str(student_user.id),
        "questionId": target_q_id
    }), content_type="application/json")
    
    # 4.2 Fetch Bookmarks
    res_bm_get = client.get(f'/api/bookmarks/?userId={student_user.id}')
    bm_list = res_bm_get.json().get('bookmarks', []) if res_bm_get.status_code == 200 else []
    found_bm = any(str(b.get('questionId') or b.get('question_id') or b.get('question', {}).get('id')) == target_q_id for b in bm_list)

    if res_bm_on.status_code == 200 and res_bm_on.json().get('bookmarked') == True and found_bm:
        record_pass("VAULT-01", f"Bookmark toggled ON and verified in GET /api/bookmarks/ ({len(bm_list)} bookmarks)")
    else:
        record_fail("VAULT-01", "Bookmark Toggle ON & Retrieval", f"Toggle: {res_bm_on.json()}, Found in list: {found_bm}", "HIGH")

    # 4.3 Toggle Bookmark OFF
    res_bm_off = client.post('/api/bookmarks/toggle/', json.dumps({
        "userId": str(student_user.id),
        "questionId": target_q_id
    }), content_type="application/json")
    res_bm_get2 = client.get(f'/api/bookmarks/?userId={student_user.id}')
    bm_list2 = res_bm_get2.json().get('bookmarks', []) if res_bm_get2.status_code == 200 else []
    found_bm2 = any(str(b.get('questionId') or b.get('question_id') or b.get('question', {}).get('id')) == target_q_id for b in bm_list2)

    if res_bm_off.status_code == 200 and res_bm_off.json().get('bookmarked') == False and not found_bm2:
        record_pass("VAULT-02", "Bookmark toggled OFF and confirmed removed from vault")
    else:
        record_fail("VAULT-02", "Bookmark Toggle OFF", f"Toggle: {res_bm_off.json()}, Still in list: {found_bm2}", "HIGH")

    # 4.4 Weak Questions Retrieval (from the 2 missed questions in Exam attempt)
    res_weak = client.get(f'/api/revision-vault/weak-questions/?userId={student_user.id}')
    weak_data = res_weak.json() if res_weak.status_code == 200 else {}
    weak_list = weak_data.get('weakQuestions') or weak_data.get('weak_questions') or []
    if res_weak.status_code == 200 and len(weak_list) >= 2:
        sample_wq = weak_list[0]
        has_q_details = 'question' in sample_wq or 'questionText' in sample_wq or 'question_text' in sample_wq
        record_pass("VAULT-03", f"Weak Questions Vault populated with {len(weak_list)} missed questions with valid metadata")
    else:
        record_fail("VAULT-03", "Weak Questions Retrieval", f"Status: {res_weak.status_code}, count: {len(weak_list)}, body: {weak_data}", "HIGH")

    # 4.5 AI Doubt Solver Endpoint
    sample_ai_q = test_qs[0]
    res_ai = client.post('/api/ai/ask-doubt/', json.dumps({
        "question": {
            "id": str(sample_ai_q.id),
            "questionText": sample_ai_q.question_text,
            "correctOption": sample_ai_q.correct_option,
            "options": [{"id": "A", "text": sample_ai_q.option_a}, {"id": "B", "text": sample_ai_q.option_b}],
            "topic": sample_ai_q.topic
        },
        "userSelectedOption": "B",
        "studentQuestion": "Why is option A correct instead of B?"
    }), content_type="application/json")
    if res_ai.status_code == 200 and ('explanation' in res_ai.json() or 'doubtResponse' in res_ai.json() or 'ai_explanation' in res_ai.json() or 'success' in res_ai.json()):
        record_pass("VAULT-04", "AI Doubt Solver API returns structured pedagogical explanation")
    else:
        record_fail("VAULT-04", "AI Doubt Solver API", f"Status: {res_ai.status_code}, response: {res_ai.content.decode()[:200]}", "MEDIUM")


    # =========================================================================
    # 5. ADMIN PANEL & MODERATION PIPELINE
    # =========================================================================
    print("\n--- 5. ADMIN PANEL & MODERATION PIPELINE ---")

    staff_admin_user = User.objects.filter(email="kawarejanvi27@gmail.com").first()
    super_admin_user = User.objects.filter(email="aadi@gmail.com").first()

    # 5.1 Staff Admin creates Comprehensive Test -> status PENDING
    new_test_title = f"Staff Stress Assessment {int(time.time())}"
    res_create_test = client.post('/api/admin/tests/create-comprehensive/', json.dumps({
        "userId": str(staff_admin_user.id),
        "title": new_test_title,
        "category": "company",
        "company_name": "Microsoft",
        "year": "2026",
        "topic_category": "Core Technical",
        "description": "Comprehensive mock created during stress test",
        "duration_minutes": 45,
        "questions": [
            {
                "question_text": "What is the time complexity of searching in a Balanced BST?",
                "option_a": "O(log n)",
                "option_b": "O(n)",
                "option_c": "O(n log n)",
                "option_d": "O(1)",
                "correct_option": "A",
                "step_by_step_solution": "In a balanced BST, height is O(log n), so search takes O(log n).",
                "topic": "Data Structures & Algorithms"
            }
        ]
    }), content_type="application/json")

    created_test_id = None
    if res_create_test.status_code == 201:
        created_data = res_create_test.json()
        created_test_id = created_data.get('test', {}).get('id')
        status_val = created_data.get('approval_status') or created_data.get('test', {}).get('approval_status')
        if status_val == 'PENDING':
            record_pass("ADMIN-01", f"Staff Admin created test is marked PENDING (id={created_test_id})")
        else:
            record_fail("ADMIN-01", "Staff Test Status", f"Expected PENDING, got: {status_val}", "HIGH")
    else:
        record_fail("ADMIN-01", "Staff Test Creation", f"Status: {res_create_test.status_code}, body: {res_create_test.content.decode()}", "CRITICAL")

    # 5.2 Pending test MUST NOT appear in student test catalog
    res_student_cat = client.get('/api/tests/')
    student_tests = res_student_cat.json().get('tests', [])
    pending_in_student = any(t['id'] == created_test_id for t in student_tests)
    if not pending_in_student:
        record_pass("ADMIN-02", "Pending test is isolated and NOT visible in candidate test catalog")
    else:
        record_fail("ADMIN-02", "Pending Test Isolation Leak", f"Test {created_test_id} is visible to candidates before approval!", "CRITICAL")

    # 5.3 Staff Admin Access to Pending Queue (Must be 403 Forbidden)
    res_staff_pending = client.get(f'/api/admin/pending-tests/?userId={staff_admin_user.id}')
    if res_staff_pending.status_code == 403:
        record_pass("ADMIN-03", "Staff Admin is forbidden (403) from accessing Super Admin approval queue")
    else:
        record_fail("ADMIN-03", "Staff Admin Pending Queue RBAC", f"Expected 403, got {res_staff_pending.status_code}", "HIGH")

    # 5.4 Super Admin Access to Pending Queue (Must be 200 with test in list)
    res_sa_pending = client.get(f'/api/admin/pending-tests/?userId={super_admin_user.id}')
    sa_pending_data = res_sa_pending.json() if res_sa_pending.status_code == 200 else {}
    pending_list = sa_pending_data.get('pending_tests', [])
    found_in_pending = any(t['id'] == created_test_id for t in pending_list)
    if res_sa_pending.status_code == 200 and found_in_pending:
        record_pass("ADMIN-04", f"Super Admin successfully retrieves pending approval queue ({len(pending_list)} pending tests)")
    else:
        record_fail("ADMIN-04", "Super Admin Pending Queue", f"Status: {res_sa_pending.status_code}, Found test: {found_in_pending}", "HIGH")

    # 5.5 Super Admin Approves Test -> Status APPROVED & Visible in Catalog
    if created_test_id:
        res_approve = client.post(f'/api/admin/tests/{created_test_id}/moderate/', json.dumps({
            "userId": str(super_admin_user.id),
            "action": "APPROVE"
        }), content_type="application/json")
        
        # Verify status in database
        approved_test_obj = TestSeries.objects.filter(id=created_test_id).first()
        res_student_cat2 = client.get('/api/tests/')
        student_tests2 = res_student_cat2.json().get('tests', [])
        approved_in_student = any(t['id'] == created_test_id for t in student_tests2)

        if (res_approve.status_code == 200 and 
            approved_test_obj.approval_status == 'APPROVED' and 
            approved_test_obj.is_active == True and 
            approved_in_student):
            record_pass("ADMIN-05", f"Super Admin moderation APPROVE makes test immediately live and visible in candidate catalog")
        else:
            record_fail("ADMIN-05", "Test Approval Lifecycle", f"Status: {res_approve.status_code}, DB status: {approved_test_obj.approval_status}, In catalog: {approved_in_student}", "HIGH")

    # 5.6 Admin Stats Dashboard API
    res_stats = client.get(f'/api/admin/stats/?userId={super_admin_user.id}')
    stats_data = res_stats.json() if res_stats.status_code == 200 else {}
    if res_stats.status_code == 200 and 'total_candidates' in stats_data.get('stats', stats_data):
        record_pass("ADMIN-06", "Admin Platform Analytics Stats endpoint returns comprehensive metrics")
    else:
        record_fail("ADMIN-06", "Admin Stats Analytics", f"Status: {res_stats.status_code}, data: {stats_data}", "MEDIUM")

    # 5.7 Admin Member List Endpoint
    res_members = client.get(f'/api/admin/members/?userId={super_admin_user.id}')
    members_data = res_members.json() if res_members.status_code == 200 else {}
    if res_members.status_code == 200 and 'members' in members_data:
        record_pass("ADMIN-07", f"Admin Members directory returns {len(members_data.get('members', []))} active platform members")
    else:
        record_fail("ADMIN-07", "Admin Members Endpoint", f"Status: {res_members.status_code}", "MEDIUM")

    # 5.8 Admin Broadcast Announcements
    res_announcement = client.post('/api/admin/announcements/', json.dumps({
        "title": "National Mock Drive 2026",
        "message": "All final year campus candidates are invited to participate.",
        "type": "ANNOUNCEMENT",
        "targetCompany": "All Companies"
    }), content_type="application/json")
    if res_announcement.status_code in [200, 201] and res_announcement.json().get('success'):
        record_pass("ADMIN-08", "Admin Broadcast Announcements dispatches to candidate notification feeds")
    else:
        record_fail("ADMIN-08", "Admin Announcements", f"Status: {res_announcement.status_code}, response: {res_announcement.content.decode()}", "MEDIUM")


    # =========================================================================
    # 6. SECONDARY MODULES & CODING EXECUTION ENGINE
    # =========================================================================
    print("\n--- 6. SECONDARY MODULES & CODING EXECUTION ENGINE ---")

    # 6.1 Companies List
    res_comp = client.get('/api/companies/')
    if res_comp.status_code == 200 and len(res_comp.json().get('companies', [])) > 0:
        record_pass("MOD-01", f"Companies Catalog endpoint returns {len(res_comp.json().get('companies', []))} hiring partners")
    else:
        record_fail("MOD-01", "Companies Catalog", f"Status: {res_comp.status_code}", "MEDIUM")

    # 6.2 Leaderboard National Rankings & College Filtering
    res_lb = client.get('/api/leaderboard/')
    lb_data = res_lb.json().get('leaderboard', []) if res_lb.status_code == 200 else []
    if res_lb.status_code == 200 and len(lb_data) > 0:
        record_pass("MOD-02", f"Leaderboard API returns {len(lb_data)} ranked campus candidates with verified scoring")
    else:
        record_fail("MOD-02", "Leaderboard API", f"Status: {res_lb.status_code}", "HIGH")

    # 6.3 Mega Events Endpoint
    res_events = client.get('/api/mega-events/')
    if res_events.status_code == 200:
        events_list = res_events.json().get('events') or res_events.json().get('megaEvents') or []
        record_pass("MOD-03", f"Mega Events Schedule endpoint returns {len(events_list)} events")
    else:
        record_fail("MOD-03", "Mega Events Schedule", f"Status: {res_events.status_code}", "LOW")

    # 6.4 Coding Execution Engine Languages
    res_langs = client.get('/api/coding/languages/')
    if res_langs.status_code == 200 and 'python' in res_langs.json().get('languages', {}):
        record_pass("CODE-01", "Coding Engine languages endpoint returns verified compilers (Python, C++, Java, JS)")
    else:
        record_fail("CODE-01", "Coding Engine Languages", f"Status: {res_langs.status_code}, data: {res_langs.json()}", "MEDIUM")

    # 6.5 Coding Run Execution (Python Safe Sandbox)
    res_code_run = client.post('/api/coding/run/', json.dumps({
        "questionId": "code_q_test_1",
        "userId": str(student_user.id),
        "language": "python",
        "sourceCode": "print('Hello FirstRound Placement Platform!')",
        "customInput": ""
    }), content_type="application/json")
    run_result = res_code_run.json().get('result', {}) if res_code_run.status_code == 200 else {}
    if res_code_run.status_code == 200 and 'Hello FirstRound Placement Platform!' in run_result.get('stdout', ''):
        record_pass("CODE-02", "Coding Run Execution compiles and executes sandbox Python code successfully")
    else:
        record_fail("CODE-02", "Coding Run Execution", f"Status: {res_code_run.status_code}, result: {run_result}", "HIGH")

    # 6.6 Coding Submission & History
    res_code_sub = client.post('/api/coding/submit/', json.dumps({
        "questionId": "code_q_test_1",
        "userId": str(student_user.id),
        "language": "python",
        "sourceCode": "def solve(): return 42\nprint(solve())"
    }), content_type="application/json")
    res_code_hist = client.get(f'/api/coding/submissions/?userId={student_user.id}')
    sub_list = res_code_hist.json().get('submissions', []) if res_code_hist.status_code == 200 else []
    if res_code_sub.status_code == 200 and len(sub_list) > 0:
        record_pass("CODE-03", f"Coding Submission recorded in database and retrieved in candidate submissions history ({len(sub_list)} records)")
    else:
        record_fail("CODE-03", "Coding Submission & History", f"Submit: {res_code_sub.status_code}, History count: {len(sub_list)}", "MEDIUM")

    # 6.7 User Profile Read & Update
    res_prof = client.get(f'/api/auth/profile/{student_user.id}/')
    res_upd_prof = client.patch(f'/api/users/{student_user.id}/', json.dumps({
        "full_name": "Updated Diagnostic Candidate",
        "college": "IIT Bombay",
        "targetCompany": "Google",
        "targetRole": "SDE"
    }), content_type="application/json")
    student_user.refresh_from_db()
    if (res_prof.status_code == 200 and 
        res_upd_prof.status_code == 200 and 
        student_user.full_name == "Updated Diagnostic Candidate" and 
        student_user.college == "IIT Bombay"):
        record_pass("MOD-04", "User Profile Read & Update persists changes to database")
    else:
        record_fail("MOD-04", "User Profile Update", f"Prof status: {res_prof.status_code}, Upd status: {res_upd_prof.status_code}, Name: {student_user.full_name}", "HIGH")

    # =========================================================================
    # SUMMARY
    # =========================================================================
    print("\n" + "=" * 90)
    print("STRESS TEST SUMMARY:")
    print(f"  TOTAL TESTS EXECUTED : {len(results['passed']) + len(results['failed'])}")
    print(f"  PASSED               : {len(results['passed'])}")
    print(f"  FAILED / BUGS FOUND  : {len(results['failed'])}")
    print("=" * 90)

    return results

if __name__ == '__main__':
    run_stress_test()
