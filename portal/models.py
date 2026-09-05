import uuid
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils import timezone


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email).lower()
        extra_fields.setdefault('is_active', True)
        user = self.model(email=email, **extra_fields)
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = [
        ('SUPER_ADMIN', 'Super Admin'),
        ('STAFF_ADMIN', 'Staff Admin'),
        ('STUDENT', 'Student'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True, db_index=True)
    full_name = models.CharField(max_length=255)
    college = models.CharField(max_length=255, blank=True, default="")
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='STUDENT')
    
    # Leaderboard & Performance Stats
    total_points = models.IntegerField(default=0)
    total_tests = models.IntegerField(default=0)
    total_questions_solved = models.IntegerField(default=0)
    total_correct = models.IntegerField(default=0)
    total_incorrect = models.IntegerField(default=0)
    accuracy_percentage = models.FloatField(default=0.0)
    total_time_taken_seconds = models.IntegerField(default=0)

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']

    class Meta:
        ordering = ['-total_points', 'total_time_taken_seconds']

    def __str__(self):
        return f"{self.full_name} ({self.email}) [{self.role}]"

    @property
    def is_admin(self):
        return self.role in ['SUPER_ADMIN', 'STAFF_ADMIN'] or self.is_staff or self.is_superuser

    @property
    def is_super_admin(self):
        return self.role == 'SUPER_ADMIN' or self.is_superuser or self.email.lower() == 'aadi@gmail.com'

    def recalculate_stats(self):
        # Strict Exam Mode Isolation: Only EXAM attempts count towards Leaderboard points & rank
        attempts = self.attempts.filter(mode='EXAM')
        self.total_tests = attempts.count()
        self.total_correct = sum(a.correct_count for a in attempts)
        self.total_incorrect = sum(a.incorrect_count for a in attempts)
        self.total_questions_solved = self.total_correct + self.total_incorrect
        self.total_time_taken_seconds = sum(a.time_taken_seconds for a in attempts)
        
        # Points = (Correct * 10) - (Incorrect * 2)
        calc_points = (self.total_correct * 10) - (self.total_incorrect * 2)
        self.total_points = max(0, calc_points)

        if self.total_questions_solved > 0:
            self.accuracy_percentage = round((self.total_correct / self.total_questions_solved) * 100, 1)
        else:
            self.accuracy_percentage = 0.0
        self.save()


class CompanyCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    icon = models.CharField(max_length=50, default="building")
    description = models.TextField(blank=True)

    class Meta:
        verbose_name_plural = "Company Categories"
        ordering = ['name']

    def __str__(self):
        return self.name


class TestSeries(models.Model):
    TEST_TYPE_CHOICES = [
        ('COMPANY', 'Company Specific PYQs'),
        ('TOPIC', 'Topic Wise Practice'),
        ('FOUNDATION', 'Foundation & Sectional'),
        ('CODING', 'Coding & Technical'),
        ('OTHER', 'Pattern-Crafted Mock Tests'),
    ]

    APPROVAL_CHOICES = [
        ('PENDING', 'Pending Approval'),
        ('APPROVED', 'Approved'),
        ('REJECTED', 'Rejected'),
    ]

    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    category = models.ForeignKey(CompanyCategory, on_delete=models.CASCADE, related_name='tests', null=True, blank=True)
    company_name = models.CharField(max_length=100, help_text="e.g. TCS, Wipro, Infosys, Accenture, Cognizant, or General")
    year = models.CharField(max_length=20, default="2025", help_text="e.g. 2024, 2025, 2026, or All")
    test_type = models.CharField(max_length=20, choices=TEST_TYPE_CHOICES, default='COMPANY')
    topic_category = models.CharField(max_length=100, default="Full Mock", help_text="Quantitative Aptitude, Logical Reasoning, Verbal Ability, Core Technical, Full Mock")
    description = models.TextField(blank=True)
    duration_minutes = models.IntegerField(default=25)
    total_questions = models.IntegerField(default=25)
    difficulty = models.CharField(max_length=50, default="Standard Placement Pattern")
    
    # Moderation & Creator Tracking
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='created_tests')
    approval_status = models.CharField(max_length=20, choices=APPROVAL_CHOICES, default='APPROVED')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Test Series"
        ordering = ['company_name', '-year', 'title']

    def __str__(self):
        return f"{self.title} [{self.company_name} {self.year}] ({self.approval_status})"

    def get_actual_question_count(self):
        return self.questions.count()


class Question(models.Model):
    OPTION_CHOICES = [
        ('A', 'Option A'),
        ('B', 'Option B'),
        ('C', 'Option C'),
        ('D', 'Option D'),
    ]

    test = models.ForeignKey(TestSeries, on_delete=models.CASCADE, related_name='questions')
    topic = models.CharField(max_length=100, help_text="e.g. Profit & Loss, Syllogisms, Reading Comprehension, OOPs")
    company_tag = models.CharField(max_length=100, blank=True, help_text="e.g. TCS, Wipro 2025")
    year_tag = models.CharField(max_length=20, blank=True, default="2025")
    
    question_text = models.TextField()
    option_a = models.TextField()
    option_b = models.TextField()
    option_c = models.TextField()
    option_d = models.TextField()
    correct_option = models.CharField(max_length=1, choices=OPTION_CHOICES)
    
    step_by_step_solution = models.TextField(help_text="Detailed step-by-step mathematical or logical solution")
    shortcut_formula = models.TextField(blank=True, help_text="Speed shortcut or formula key")
    
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return f"[{self.topic}] {self.question_text[:60]}..."


class TestAttempt(models.Model):
    MODE_CHOICES = [
        ('PRACTICE', 'Practice Mode (Question-Wise Timer)'),
        ('EXAM', 'Full Exam Simulation (Test-Wise Timer)'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='attempts')
    test = models.ForeignKey(TestSeries, on_delete=models.CASCADE, related_name='attempts')
    mode = models.CharField(max_length=20, choices=MODE_CHOICES, default='EXAM')
    timer_per_question = models.IntegerField(default=0, help_text="Seconds per question in practice mode (0=none)")
    
    score = models.IntegerField(default=0)
    total_questions = models.IntegerField(default=0)
    correct_count = models.IntegerField(default=0)
    incorrect_count = models.IntegerField(default=0)
    unanswered_count = models.IntegerField(default=0)
    accuracy = models.FloatField(default=0.0)
    points_earned = models.IntegerField(default=0)
    
    time_taken_seconds = models.IntegerField(default=0)
    average_speed_seconds = models.FloatField(default=0.0)
    
    topic_breakdown = models.JSONField(default=dict, blank=True)
    strengths = models.JSONField(default=list, blank=True)
    weaknesses = models.JSONField(default=list, blank=True)
    
    # Test Integrity & Anti-Cheating Fields
    tab_switches_count = models.IntegerField(default=0, help_text="Number of tab switches or window blur events detected during test")
    integrity_flag = models.BooleanField(default=False, help_text="True if attempt was auto-submitted or flagged for excessive tab switching")
    submission_reason = models.CharField(max_length=255, default="Normal Submission", help_text="Reason for test completion")

    # Live Mega Contest Integration
    is_mega_event_attempt = models.BooleanField(default=False)
    mega_event = models.ForeignKey('MegaEvent', on_delete=models.SET_NULL, null=True, blank=True, related_name='attempts')

    completed_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['-completed_at']

    def __str__(self):
        return f"{self.user.full_name} - {self.test.title} ({self.score}/{self.total_questions})"


class QuestionResponse(models.Model):
    attempt = models.ForeignKey(TestAttempt, on_delete=models.CASCADE, related_name='responses')
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    selected_option = models.CharField(max_length=1, blank=True, default="")
    is_correct = models.BooleanField(default=False)
    time_spent_seconds = models.IntegerField(default=0)

    def __str__(self):
        return f"Attempt {self.attempt_id} - Q{self.question_id}: {self.selected_option} ({'Correct' if self.is_correct else 'Wrong'})"


class BookmarkedQuestion(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookmarks')
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='bookmarks')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'question')
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.full_name} bookmarked Q#{self.question_id}"


class MegaEvent(models.Model):
    title = models.CharField(max_length=255)
    test_series = models.ForeignKey(TestSeries, on_delete=models.CASCADE, related_name='mega_events')
    banner_tag = models.CharField(max_length=150, default="ALL-INDIA MEGA RECRUITMENT DRIVE")
    company_tag = models.CharField(max_length=100, default="TCS NQT 2026")
    description = models.TextField(blank=True)
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    duration_minutes = models.IntegerField(default=30)
    is_active = models.BooleanField(default=True)
    is_leaderboard_revealed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-start_datetime']

    def __str__(self):
        return f"[MEGA EVENT] {self.title} ({self.start_datetime.strftime('%Y-%m-%d %H:%M')})"

    def get_event_status(self):
        now = timezone.now()
        if now < self.start_datetime:
            return "UPCOMING"
        elif self.start_datetime <= now <= self.end_datetime:
            return "LIVE"
        else:
            return "ENDED"


class UserTestProgress(models.Model):
    STATUS_CHOICES = [
        ('NOT_STARTED', 'Not Started'),
        ('VISITED', 'Visited'),
        ('IN_PROGRESS', 'In Progress'),
        ('COMPLETED', 'Completed'),
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='test_progress')
    test = models.ForeignKey(TestSeries, on_delete=models.CASCADE, related_name='user_progress')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='NOT_STARTED')
    mode = models.CharField(max_length=20, default='exam')
    last_visited_at = models.DateTimeField(auto_now=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ('user', 'test')
        ordering = ['-last_visited_at']

    def __str__(self):
        return f"{self.user.full_name} - {self.test.title} ({self.status})"


class CodingSubmission(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='coding_submissions')
    question_id = models.CharField(max_length=100, db_index=True)
    test_series = models.ForeignKey(TestSeries, on_delete=models.SET_NULL, null=True, blank=True)
    language = models.CharField(max_length=50)  # python, javascript
    source_code = models.TextField()
    status = models.CharField(max_length=50, default='ACCEPTED')  # ACCEPTED, WRONG_ANSWER, TIME_LIMIT_EXCEEDED, RUNTIME_ERROR
    passed_test_cases = models.IntegerField(default=0)
    total_test_cases = models.IntegerField(default=0)
    execution_time_ms = models.FloatField(default=0.0)
    submitted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-submitted_at']

    def __str__(self):
        return f"{self.user.full_name} - Q:{self.question_id} [{self.language}] ({self.status})"

