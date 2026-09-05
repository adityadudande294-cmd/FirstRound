import os
import django
import json

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'firstround_core.settings')
django.setup()

from django.test import Client
from portal.models import User, TestSeries, Question, TestAttempt, QuestionResponse, BookmarkedQuestion, MegaEvent
from portal.auto_seed import ensure_database_seeded

def run_remediation_suite():
    print("=" * 80)
    print("FIRSTROUND DEFECT REMEDIATION (DEF-001 to DEF-008) VERIFICATION SUITE")
    print("=" * 80)
    client = Client()
    ensure_database_seeded()

    admin = User.objects.filter(email="aadi@gmail.com").first()
    student = User.objects.filter(role="STUDENT").first()
    if not student:
        student = User.objects.create_user(email="test_student@campus.edu", password="pass", full_name="Test Student")

    # 1. Test DEF-007: PATCH /api/users/<id>
    print("\n--- Testing DEF-007: PATCH /api/users/<str:user_id>/ ---")
    patch_res = client.patch(f'/api/users/{student.id}/', json.dumps({
        'name': 'Remediated Candidate Name',
        'college': 'Top Tier Engineering Institute'
    }), content_type="application/json")
    print("PATCH /api/users/<id>/ status:", patch_res.status_code, patch_res.json())
    assert patch_res.status_code == 200, f"Expected 200, got {patch_res.status_code}"
    student.refresh_from_db()
    assert student.full_name == 'Remediated Candidate Name'
    assert student.college == 'Top Tier Engineering Institute'
    print("✅ DEF-007 Verified: User profile PATCH route functioning cleanly!")

    # 2. Test DEF-005: Dual Parameter Support for Bookmarks and Revision Vault
    print("\n--- Testing DEF-005: Dual Param Support (Bookmark Toggle & Views) ---")
    BookmarkedQuestion.objects.filter(user=student).delete()
    q = Question.objects.first()
    
    # Toggle with camelCase { userId, questionId }
    toggle_res = client.post('/api/bookmarks/toggle/', json.dumps({
        'userId': str(student.id),
        'questionId': str(q.id)
    }), content_type="application/json")
    print("Toggle bookmark (camelCase):", toggle_res.status_code, toggle_res.json())
    assert toggle_res.status_code in [200, 201]
    assert toggle_res.json().get('bookmarked') is True

    # List bookmarks with ?userId=...
    bm_res = client.get(f'/api/bookmarks/?userId={student.id}')
    print("Get bookmarks (?userId=...):", bm_res.status_code, len(bm_res.json().get('bookmarks', [])))
    assert bm_res.status_code == 200
    assert len(bm_res.json().get('bookmarks', [])) >= 1

    # Weak questions with ?userId=...
    weak_res = client.get(f'/api/revision-vault/weak-questions/?userId={student.id}')
    print("Get weak questions (?userId=...):", weak_res.status_code, weak_res.json().keys())
    assert weak_res.status_code == 200
    assert 'weakQuestions' in weak_res.json() and 'weak_questions' in weak_res.json()
    print("✅ DEF-005 Verified: Dual parameter compatibility for Bookmarks & Revision Vault passed!")

    # 3. Test DEF-006: Admin Stats with ?userId=...
    print("\n--- Testing DEF-006: Admin Stats with ?userId=... and stats key ---")
    admin_stats = client.get(f'/api/admin/stats/?userId={admin.id}')
    print("Admin stats (?userId=...):", admin_stats.status_code, admin_stats.json().keys())
    assert admin_stats.status_code == 200
    assert 'stats' in admin_stats.json()
    assert admin_stats.json()['stats']['total_tests'] == TestSeries.objects.count()
    print("✅ DEF-006 Verified: Admin Stats endpoint accepts userId and returns uniform stats payload!")

    # 4. Test DEF-008: Mega Events Response Uniformity
    print("\n--- Testing DEF-008: Mega Events Response Uniformity ---")
    mega_res = client.get('/api/mega-events/')
    print("Mega events response keys:", mega_res.json().keys())
    assert mega_res.status_code == 200
    assert 'megaEvents' in mega_res.json() and 'mega_events' in mega_res.json() and 'events' in mega_res.json()
    print("✅ DEF-008 Verified: Mega Events endpoint returns all expected property variations!")

    # 5. Test DEF-001: Check AuthModal source code for removal of plaintext passwords
    print("\n--- Testing DEF-001: Verification of AuthModal security cleanup ---")
    with open('frontend/src/components/AuthModal.tsx', 'r', encoding='utf-8') as f:
        auth_modal_content = f.read()
    assert 'aadi@gmail.com / 1234' not in auth_modal_content, "Plaintext password must not be in AuthModal UI!"
    assert 'kawarejanvi27@gmail.com / kawarejanvi27@gmail.com' not in auth_modal_content, "Plaintext password must not be in AuthModal UI!"
    print("✅ DEF-001 Verified: AuthModal plaintext password exposure successfully eliminated!")

    # 6. Test DEF-002, DEF-003, DEF-004: Static inspection of React components
    print("\n--- Testing DEF-002, DEF-003, DEF-004: Verification of Frontend Component Guards ---")
    with open('frontend/src/components/DashboardHome.tsx', 'r', encoding='utf-8') as f:
        dh_content = f.read()
    assert 'userAttempts.map((a) => a.submittedAt.split(' not in dh_content, "Unsafe split on submittedAt must be eliminated!"

    with open('frontend/src/components/LeaderboardView.tsx', 'r', encoding='utf-8') as f:
        lb_content = f.read()
    assert 'getPoints' in lb_content and 'getName' in lb_content, "Leaderboard must use normalized accessors!"

    with open('frontend/src/components/ActiveTestEngine.tsx', 'r', encoding='utf-8') as f:
        ate_content = f.read()
    assert 'No Questions Available' in ate_content, "ActiveTestEngine must have empty questions guard!"
    print("✅ DEF-002, DEF-003, DEF-004 Verified: Safe fallbacks, normalized accessors, and empty guards in place!")

    print("\n" + "=" * 80)
    print("🎉 ALL DEFECT REMEDIATIONS (DEF-001 THROUGH DEF-008) PASSED 100%!")
    print("=" * 80)

if __name__ == '__main__':
    run_remediation_suite()
