from django.contrib import admin
from .models import User, CompanyCategory, TestSeries, Question, TestAttempt, QuestionResponse

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'college', 'total_points', 'total_tests', 'accuracy_percentage', 'is_staff', 'is_active')
    search_fields = ('full_name', 'email', 'college')
    list_filter = ('is_staff', 'is_active')

@admin.register(CompanyCategory)
class CompanyCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'icon')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(TestSeries)
class TestSeriesAdmin(admin.ModelAdmin):
    list_display = ('title', 'company_name', 'year', 'test_type', 'topic_category', 'total_questions', 'duration_minutes', 'is_active')
    list_filter = ('company_name', 'year', 'test_type', 'is_active')
    search_fields = ('title', 'company_name', 'description')
    prepopulated_fields = {'slug': ('title',)}

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('id', 'test', 'topic', 'company_tag', 'correct_option', 'order')
    list_filter = ('test__company_name', 'topic', 'correct_option')
    search_fields = ('question_text', 'step_by_step_solution', 'topic')

@admin.register(TestAttempt)
class TestAttemptAdmin(admin.ModelAdmin):
    list_display = ('user', 'test', 'mode', 'score', 'total_questions', 'accuracy', 'points_earned', 'completed_at')
    list_filter = ('mode', 'completed_at')
    search_fields = ('user__full_name', 'user__email', 'test__title')

@admin.register(QuestionResponse)
class QuestionResponseAdmin(admin.ModelAdmin):
    list_display = ('attempt', 'question', 'selected_option', 'is_correct', 'time_spent_seconds')
    list_filter = ('is_correct',)
