import os
import django
import json

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'firstround_core.settings')
django.setup()

from django.test import Client
from portal.models import User, TestSeries, Question, TestAttempt, QuestionResponse, BookmarkedQuestion, MegaEvent
from portal.auto_seed import ensure_database_seeded

def run_diagnostic():
    print("=" * 80)
    print("FIRSTROUND PLATFORM 360-DEGREE FULL-STACK DIAGNOSTIC TEST SUITE")
    print("=" * 80)
    client = Client()
    ensure_database_seeded()

    report = {"passed": [], "failed": [], "findings": []}

    # STEP 1: AUTHENTICATION & RBAC
    print("\n--- [STEP 1: AUTH & RBAC AUDIT] ---")
    
    # 1.1 Super Admin Login
    admin = User.objects.filter(email="aadi@gmail.com").first()
    if not admin:
        # Create or check
        admin = User.objects.create_superuser(email="aadi@gmail.com", password="1234", full_name="Aditya Dudande")
        admin.role = "SUPER_ADMIN"
        admin.save()
    else:
        admin.set_password("1234")
        admin.role = "SUPER_ADMIN"
        admin.is_superuser = True
        admin.is_staff = True
        admin.save()

    res = client.post('/api/auth/login/', json.dumps({"email": "aadi@gmail.com", "password": "1234"}), content_type="application/json")
    print(f"Super Admin Login Response ({res.status_code}):", res.json())
    if res.status_code == 200 and res.json().get('role') == 'SUPER_ADMIN' and res.json().get('redirect') == 'admin':
        report["passed"].append("1.1 Super Admin Login & Redirect")
    else:
        report["failed"].append(f"1.1 Super Admin Login: {res.status_code} {res.json()}")

    # 1.2 Staff Admin Login
    staff = User.objects.filter(email="kawarejanvi27@gmail.com").first()
    if not staff:
        staff = User.objects.create_user(email="kawarejanvi27@gmail.com", password="kawarejanvi27@gmail.com", full_name="Janvi Kaware", role="STAFF_ADMIN")
        staff.is_staff = True
        staff.save()
    else:
        staff.set_password("kawarejanvi27@gmail.com")
        staff.role = "STAFF_ADMIN"
        staff.is_staff = True
        staff.save()

    res_staff = client.post('/api/auth/login/', json.dumps({"email": "kawarejanvi27@gmail.com", "password": "kawarejanvi27@gmail.com"}), content_type="application/json")
    print(f"Staff Admin Login Response ({res_staff.status_code}):", res_staff.json())
    if res_staff.status_code == 200 and res_staff.json().get('role') == 'STAFF_ADMIN' and res_staff.json().get('redirect') == 'admin':
        report["passed"].append("1.2 Staff Admin Login & Redirect")
    else:
        report["failed"].append(f"1.2 Staff Admin Login: {res_staff.status_code} {res_staff.json()}")

    # 1.3 Student Registration & Login
    test_email = "student_diag_test@campus.edu"
    User.objects.filter(email=test_email).delete()
    reg_res = client.post('/api/auth/register/', json.dumps({
        "email": test_email,
        "password": "StudentPass@123",
        "full_name": "Diagnostic Candidate",
        "college": "COEP Pune"
    }), content_type="application/json")
    print(f"Student Register Response ({reg_res.status_code}):", reg_res.json())
    
    student_user = User.objects.filter(email=test_email).first()
    if reg_res.status_code == 201 and student_user and student_user.check_password("StudentPass@123") and reg_res.json().get('redirect') == 'home':
        report["passed"].append("1.3 Student Register & Password Hashing")
    else:
        report["failed"].append(f"1.3 Student Register: {reg_res.status_code} {reg_res.json()}")

    # 1.4 Self-Service Change Password
    cp_res = client.post('/api/auth/change-password/', json.dumps({
        "userId": str(student_user.id),
        "currentPassword": "StudentPass@123",
        "newPassword": "NewStudentPass@456",
        "fullName": "Diagnostic Candidate Updated"
    }), content_type="application/json")
    print(f"Change Password Response ({cp_res.status_code}):", cp_res.json())
    student_user.refresh_from_db()
    if cp_res.status_code == 200 and student_user.check_password("NewStudentPass@456"):
        report["passed"].append("1.4 Self-Service Change Password")
    else:
        report["failed"].append(f"1.4 Change Password: {cp_res.status_code} {cp_res.json()}")

    # STEP 2: TEST ENGINE & ASSESSMENT RUNNER
    print("\n--- [STEP 2: TEST ENGINE & ASSESSMENT RUNNER AUDIT] ---")
    
    # 2.1 Fetch Test List
    tests_res = client.get('/api/tests/')
    print(f"GET /api/tests/ status: {tests_res.status_code}, count: {len(tests_res.json().get('tests', []))}")
    if tests_res.status_code == 200 and len(tests_res.json().get('tests', [])) > 0:
        report["passed"].append("2.1 Test Catalog List")
        sample_test = tests_res.json()['tests'][0]
    else:
        report["failed"].append("2.1 Test Catalog List Failed")
        sample_test = None

    # 2.2 Fetch Test Detail & Verify Schema
    if sample_test:
        test_id = sample_test['id']
        detail_res = client.get(f'/api/tests/{test_id}/')
        data = detail_res.json()
        print(f"GET /api/tests/{test_id}/ status: {detail_res.status_code}")
        test_obj = data.get('test', data)
        questions = test_obj.get('questions', [])
        print(f"Test '{test_obj.get('title')}' has {len(questions)} questions.")
        
        # Check Question fields
        if len(questions) > 0:
            q0 = questions[0]
            expected_keys = ['id', 'question_text', 'option_a', 'option_b', 'option_c', 'option_d']
            missing = [k for k in expected_keys if k not in q0]
            if not missing:
                report["passed"].append("2.2 Test Detail & Question Schema Contract")
            else:
                report["failed"].append(f"2.2 Question schema missing keys: {missing}")
        else:
            report["failed"].append("2.2 Test has no questions")

        # 2.3 Submit Assessment (EXAM mode)
        q_objs = Question.objects.filter(test_id=test_id).order_by('order')[:5]
        responses_payload = []
        for i, q in enumerate(q_objs):
            # answer first 3 correctly, 2 incorrectly
            selected = q.correct_option if i < 3 else ('A' if q.correct_option != 'A' else 'B')
            responses_payload.append({
                "question_id": q.id,
                "selected_option": selected,
                "time_spent_seconds": 20
            })

        sub_exam = client.post(f'/api/tests/{test_id}/submit/', json.dumps({
            "user_id": str(student_user.id),
            "mode": "EXAM",
            "time_taken_seconds": 100,
            "responses": responses_payload
        }), content_type="application/json")
        print(f"Submit EXAM Response ({sub_exam.status_code}):", sub_exam.json())
        
        student_user.refresh_from_db()
        print(f"Student Stats after EXAM -> total_points: {student_user.total_points}, total_tests: {student_user.total_tests}, accuracy: {student_user.accuracy_percentage}%")
        if sub_exam.status_code == 200 and student_user.total_tests >= 1:
            report["passed"].append("2.3 EXAM Submission & Stats Calculation")
        else:
            report["failed"].append(f"2.3 EXAM Submission failed: {sub_exam.status_code}")

        # 2.4 Submit Assessment (PRACTICE mode) - verify isolation
        points_before = student_user.total_points
        tests_before = student_user.total_tests
        sub_prac = client.post(f'/api/tests/{test_id}/submit/', json.dumps({
            "user_id": str(student_user.id),
            "mode": "PRACTICE",
            "time_taken_seconds": 80,
            "responses": responses_payload
        }), content_type="application/json")
        student_user.refresh_from_db()
        print(f"Student Stats after PRACTICE -> total_points: {student_user.total_points} (was {points_before}), total_tests: {student_user.total_tests} (was {tests_before})")
        if sub_prac.status_code == 200 and student_user.total_points == points_before and student_user.total_tests == tests_before:
            report["passed"].append("2.4 PRACTICE Mode Strict Isolation (No stat pollution)")
        else:
            report["failed"].append("2.4 PRACTICE Mode leaked into global stats")

    # STEP 3: ADMIN & MODERATION WORKFLOW
    print("\n--- [STEP 3: ADMIN & MODERATION WORKFLOW AUDIT] ---")

    # 3.1 Staff Admin creates Comprehensive Test -> Should be PENDING
    staff_create_res = client.post('/api/admin/tests/create-comprehensive/', json.dumps({
        "userId": str(staff.id),
        "title": "Staff Admin QA Mock Test 2026",
        "category": "COMPANY",
        "company_name": "Accenture",
        "year": "2026",
        "topic_category": "Quantitative Aptitude",
        "description": "Test generated by Staff Admin",
        "duration_minutes": 30,
        "questions": [
            {
                "question_text": "What is 15 * 15?",
                "option_a": "225",
                "option_b": "215",
                "option_c": "235",
                "option_d": "245",
                "correct_option": "A",
                "step_by_step_solution": "15^2 = 225",
                "shortcut_formula": "15*15=225",
                "topic": "Arithmetic"
            }
        ]
    }), content_type="application/json")
    print(f"Staff Create Test Response ({staff_create_res.status_code}):", staff_create_res.json())
    staff_data = staff_create_res.json()
    if staff_create_res.status_code == 201 and staff_data.get('approval_status') == 'PENDING':
        report["passed"].append("3.1 Staff Admin Creation -> PENDING status")
    else:
        report["failed"].append(f"3.1 Staff Admin Creation status: {staff_create_res.status_code} {staff_data}")

    staff_created_test_id = staff_data.get('test', {}).get('id')

    # 3.2 Super Admin creates Comprehensive Test -> Should be APPROVED
    super_create_res = client.post('/api/admin/tests/create-comprehensive/', json.dumps({
        "userId": str(admin.id),
        "title": "Super Admin Instant Verified Test 2026",
        "category": "COMPANY",
        "company_name": "Google",
        "year": "2026",
        "topic_category": "Core Technical",
        "description": "Test generated by Super Admin",
        "duration_minutes": 45,
        "questions": [
            {
                "question_text": "What is the time complexity of binary search?",
                "option_a": "O(log n)",
                "option_b": "O(n)",
                "option_c": "O(n log n)",
                "option_d": "O(1)",
                "correct_option": "A",
                "step_by_step_solution": "Binary search divides the search space in half each step.",
                "shortcut_formula": "log2(N)",
                "topic": "Algorithms"
            }
        ]
    }), content_type="application/json")
    print(f"Super Admin Create Test Response ({super_create_res.status_code}):", super_create_res.json())
    super_data = super_create_res.json()
    if super_create_res.status_code == 201 and super_data.get('approval_status') == 'APPROVED':
        report["passed"].append("3.2 Super Admin Creation -> APPROVED status")
    else:
        report["failed"].append(f"3.2 Super Admin Creation status: {super_create_res.status_code} {super_data}")

    # 3.3 Check Pending Tests Queue
    # Super Admin can view pending tests
    super_pending_res = client.get(f'/api/admin/pending-tests/?userId={admin.id}')
    print(f"Super Admin Pending Tests Response ({super_pending_res.status_code}): count={super_pending_res.json().get('count')}")
    # Staff Admin check
    staff_pending_res = client.get(f'/api/admin/pending-tests/?userId={staff.id}')
    print(f"Staff Admin Pending Tests Response ({staff_pending_res.status_code}): count={staff_pending_res.json().get('count')}")
    # Student check (should be forbidden 403)
    student_pending_res = client.get(f'/api/admin/pending-tests/?userId={student_user.id}')
    print(f"Student Pending Tests Response ({student_pending_res.status_code})")
    
    if super_pending_res.status_code == 200 and student_pending_res.status_code == 403:
        report["passed"].append("3.3 Pending Tests Queue RBAC Enforcement")
    else:
        report["failed"].append("3.3 Pending Tests Queue RBAC Failure")

    # 3.4 Moderate Test (Super Admin approves Staff Admin test)
    if staff_created_test_id:
        mod_res = client.post(f'/api/admin/tests/{staff_created_test_id}/moderate/', json.dumps({
            "userId": str(admin.id),
            "action": "APPROVE"
        }), content_type="application/json")
        print(f"Moderate Test Response ({mod_res.status_code}):", mod_res.json())
        
        # Verify it is now visible in student test catalog
        pub_test_res = client.get(f'/api/tests/{staff_created_test_id}/')
        if mod_res.status_code == 200 and pub_test_res.status_code == 200:
            report["passed"].append("3.4 Super Admin Moderation APPROVE -> Visible to Students")
        else:
            report["failed"].append("3.4 Moderation Approve test did not make test public")

    print("\n" + "=" * 80)
    print("DIAGNOSTIC SUMMARY:")
    print(f"PASSED ({len(report['passed'])}):")
    for p in report['passed']:
        print(f"  [PASS] {p}")
    print(f"FAILED ({len(report['failed'])}):")
    for f in report['failed']:
        print(f"  [FAIL] {f}")
    print("=" * 80)

if __name__ == '__main__':
    run_diagnostic()
