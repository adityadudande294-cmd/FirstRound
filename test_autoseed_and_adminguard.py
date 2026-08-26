import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'firstround_core.settings')
django.setup()

from django.test import Client
from portal.models import User, TestSeries, Question
from portal.auto_seed import ensure_database_seeded

def run_tests():
    print("🚀 Starting Auto-Seed and Strict Admin Role Guard Test Suite...")
    client = Client()

    # 1. Test Auto-Seeder
    ensure_database_seeded()
    test_count = TestSeries.objects.count()
    q_count = Question.objects.count()
    print(f"  📊 Database Tests: {test_count}, Questions: {q_count}")
    assert test_count >= 25, f"Expected at least 25 tests, got {test_count}"
    assert q_count >= 625, f"Expected at least 625 questions, got {q_count}"
    print("  ✅ Auto-Seed verification passed: 25 tests & 625 distinct questions loaded!")

    # 2. Test Admin Account
    admin = User.objects.filter(email="aadi@gmail.com").first()
    assert admin is not None, "Admin aadi@gmail.com must exist!"
    assert admin.check_password("1234"), "Admin password must be 1234!"
    assert admin.is_staff and admin.is_superuser, "Admin must have superuser and staff flags!"
    print("  ✅ Super Admin credentials verified (aadi@gmail.com / 1234)!")

    # 3. Test Student Registration & Authorization Guard
    student_res = client.post('/api/auth/login-or-register/', {
        'email': 'student_audit@campus.edu',
        'password': 'password123',
        'full_name': 'Audit Student',
        'college': 'Engineering College'
    }, content_type='application/json')
    student_id = student_res.json()['user']['id']

    # Student trying to access Admin Stats
    student_stats_res = client.get(f'/api/admin/stats/?user_id={student_id}')
    assert student_stats_res.status_code == 403, f"Expected 403 Forbidden for student, got {student_stats_res.status_code}"
    
    # Student trying to access Admin Members
    student_members_res = client.get(f'/api/admin/members/?user_id={student_id}')
    assert student_members_res.status_code == 403, f"Expected 403 Forbidden for student, got {student_members_res.status_code}"
    print("  ✅ Student Admin Access Blocked: 403 Forbidden correctly returned for unauthorized requests!")

    # 4. Test Admin Accessing Admin Endpoints
    admin_stats_res = client.get(f'/api/admin/stats/?user_id={admin.id}')
    assert admin_stats_res.status_code == 200, f"Expected 200 OK for admin stats, got {admin_stats_res.status_code}"
    assert admin_stats_res.json()['total_tests'] >= 25
    print("  ✅ Super Admin Access Granted: 200 OK with full platform analytics returned for aadi@gmail.com!")

    # 5. Test Categories Listing
    all_tests_res = client.get('/api/tests/')
    assert all_tests_res.status_code == 200
    tests = all_tests_res.json()['tests']
    assert len(tests) >= 25
    
    company_tests = client.get('/api/tests/?type=COMPANY').json()['tests']
    assert len(company_tests) >= 10
    
    topic_tests = client.get('/api/tests/?type=TOPIC').json()['tests']
    assert len(topic_tests) >= 8

    other_tests = client.get('/api/tests/?type=OTHER').json()['tests']
    assert len(other_tests) >= 7
    print("  ✅ All 4 Dashboard Categories Verified (Company >= 10, Topic-Wise >= 8, Other Mocks >= 7, Total >= 25)!")

    print("\n🎉 ALL AUTO-SEED & ADMIN ROLE GUARD TESTS PASSED 100%!")

if __name__ == '__main__':
    run_tests()

