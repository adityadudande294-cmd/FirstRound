import os
import sys
import json
from pathlib import Path
import django

# Setup Django Environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'firstround_core.settings')
django.setup()

from portal.models import User, CompanyCategory, TestSeries, Question, TestAttempt, QuestionResponse, UserTestProgress, CodingSubmission

BASE_DIR = Path(__file__).resolve().parent

def seed_rich_database():
    print("🚀 Starting FirstRound 17 Verified Live Assessments Seed...")

    # 1. Clean Database
    CodingSubmission.objects.all().delete()
    UserTestProgress.objects.all().delete()
    QuestionResponse.objects.all().delete()
    TestAttempt.objects.all().delete()
    Question.objects.all().delete()
    TestSeries.objects.all().delete()
    print("🧹 Cleared existing test series and questions.")

    # 2. Configure Super Admin & Staff Admins
    admin_user, _ = User.objects.get_or_create(
        email="aadi@gmail.com",
        defaults={
            'full_name': 'Aditya Dudande (Super Admin)',
            'college': 'Platform Chief Administrator',
            'role': 'SUPER_ADMIN',
            'is_staff': True,
            'is_superuser': True,
            'total_points': 0,
            'total_tests': 0,
            'total_questions_solved': 0,
            'total_correct': 0,
            'total_incorrect': 0,
            'accuracy_percentage': 0.0,
            'total_time_taken_seconds': 0,
        }
    )
    admin_user.set_password("1234")
    admin_user.role = 'SUPER_ADMIN'
    admin_user.is_staff = True
    admin_user.is_superuser = True
    admin_user.save()
    print("✅ Super Admin account configured: aadi@gmail.com (1234)")

    # Configure 5 Staff Admins
    staff_admins_data = [
        {"email": "kawarejanvi27@gmail.com", "name": "Janvi Kaware", "pass": "kawarejanvi27@gmail.com"},
        {"email": "aishwariingole@gmail.com", "name": "Aishwari Ingole", "pass": "aishwariingole@gmail.com"},
        {"email": "gunjalshubham89@gmail.com", "name": "Shubham Gunjal", "pass": "gunjalshubham89@gmail.com"},
        {"email": "maheshkoli4206@gmail.com", "name": "Mahesh Koli", "pass": "maheshkoli4206@gmail.com"},
        {"email": "pawan.khot1272004@gmail.com", "name": "Pawan Khot", "pass": "pawan.khot1272004@gmail.com"},
    ]

    for sa in staff_admins_data:
        staff_user, _ = User.objects.get_or_create(
            email=sa["email"],
            defaults={
                'full_name': sa["name"],
                'college': 'FirstRound Content Staff Team',
                'role': 'STAFF_ADMIN',
                'is_staff': True,
                'is_superuser': False,
            }
        )
        staff_user.set_password(sa["pass"])
        staff_user.full_name = sa["name"]
        staff_user.role = 'STAFF_ADMIN'
        staff_user.is_staff = True
        staff_user.is_superuser = False
        staff_user.save()
        print(f"  ✓ Staff Admin configured: {staff_user.email} ({staff_user.full_name})")

    # 3. Setup Categories
    categories = [
        {"name": "General Foundation", "slug": "foundation", "icon": "book-open", "desc": "Numerical, Logical, Verbal and Analytical ability."},
        {"name": "Tata Consultancy Services (TCS)", "slug": "tcs", "icon": "cpu", "desc": "Authentic TCS NQT, Digital, Ninja and Prime PYQs."},
        {"name": "Wipro", "slug": "wipro", "icon": "layers", "desc": "Wipro Elite NLTH, Turbo, and WILP placement exams."},
        {"name": "Infosys", "slug": "infosys", "icon": "terminal", "desc": "Infosys DPhi SP and Systems Engineer papers."},
        {"name": "Accenture", "slug": "accenture", "icon": "zap", "desc": "Accenture Cognitive Assessment and Critical Reasoning tests."},
        {"name": "Cognizant", "slug": "cognizant", "icon": "shield-check", "desc": "Cognizant GenC Next Aptitude qualifiers."},
        {"name": "Core CS & Engineering", "slug": "core-cs", "icon": "cpu", "desc": "Operating Systems, DBMS, Networks, and OOPs."},
        {"name": "Data Structures & Algorithms", "slug": "dsa", "icon": "code", "desc": "Trees, Graphs, DP, Two Pointers and Sorting."},
        {"name": "Coding & Technical Mocks", "slug": "coding", "icon": "terminal", "desc": "Full-stack coding simulations and sandbox challenges."},
    ]

    cat_map = {}
    for c in categories:
        obj, _ = CompanyCategory.objects.get_or_create(
            slug=c["slug"],
            defaults={"name": c["name"], "icon": c["icon"], "description": c["desc"]}
        )
        cat_map[c["slug"]] = obj

    # 4. Load JSON data
    seed_file = BASE_DIR / 'portal' / 'seed_17_data.json'
    if not seed_file.exists():
        print(f"❌ Seed file {seed_file} not found!")
        return

    with open(seed_file, 'r', encoding='utf-8') as f:
        assessments_data = json.load(f)

    total_q_count = 0

    for item in assessments_data:
        company_slug = item.get('companyName', 'general').lower().replace(' ', '-')
        cat_obj = cat_map.get(company_slug) or cat_map.get(item.get('category', 'foundation')) or cat_map.get('foundation')

        test = TestSeries.objects.create(
            title=item['title'],
            slug=item['slug'],
            category=cat_obj,
            company_name=item.get('companyName', 'General'),
            year=item.get('year', '2026'),
            test_type=item.get('testType', 'COMPANY'),
            topic_category=item.get('topicCategory', 'Full Mock'),
            description=item.get('description', ''),
            duration_minutes=item.get('durationMinutes', 30),
            total_questions=len(item.get('questions', [])),
            created_by=admin_user,
            approval_status='APPROVED',
            is_active=True
        )

        q_list = item.get('questions', [])
        for idx, q in enumerate(q_list, start=1):
            options_dict = {opt['id'].upper(): opt['text'] for opt in q.get('options', [])}
            opt_a = options_dict.get('A', 'Option A')
            opt_b = options_dict.get('B', 'Option B')
            opt_c = options_dict.get('C', 'Option C')
            opt_d = options_dict.get('D', 'Option D')

            correct_ans = (q.get('correctAnswer') or q.get('correctOption') or 'A').upper()
            if correct_ans not in ['A', 'B', 'C', 'D']:
                correct_ans = 'A'

            Question.objects.create(
                test=test,
                topic=q.get('topic') or item.get('topicCategory') or 'General Aptitude',
                company_tag=item.get('companyName', 'General'),
                year_tag=item.get('year', '2026'),
                question_text=q.get('questionText') or q.get('problemStatement') or f"Question #{idx}",
                option_a=opt_a,
                option_b=opt_b,
                option_c=opt_c,
                option_d=opt_d,
                correct_option=correct_ans,
                step_by_step_solution=q.get('explanation') or 'Detailed derivation and step-by-step solution.',
                shortcut_formula=q.get('shortcutFormula') or q.get('formula') or '',
                order=idx
            )
            total_q_count += 1

        print(f"  ✓ Seeded '{test.title}' [{test.test_type}] with {test.questions.count()} questions.")

    print(f"\n🎉 Successfully seeded {len(assessments_data)} Live Assessments with {total_q_count} total verified questions!")

if __name__ == '__main__':
    seed_rich_database()
