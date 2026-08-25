from rest_framework import serializers
from .models import User, CompanyCategory, TestSeries, Question, TestAttempt, QuestionResponse, BookmarkedQuestion, MegaEvent


class UserSerializer(serializers.ModelSerializer):
    rank = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'id', 'email', 'full_name', 'college', 'total_points', 
            'total_tests', 'total_questions_solved', 'total_correct', 
            'total_incorrect', 'accuracy_percentage', 'total_time_taken_seconds',
            'is_staff', 'rank', 'created_at'
        ]
        read_only_fields = ['id', 'total_points', 'total_tests', 'total_questions_solved', 'total_correct', 'total_incorrect', 'accuracy_percentage', 'rank', 'created_at']

    def get_rank(self, obj):
        return User.objects.filter(is_active=True, total_points__gt=obj.total_points).count() + 1


class UserPublicSerializer(serializers.ModelSerializer):
    rank = serializers.IntegerField(read_only=True)

    class Meta:
        model = User
        fields = [
            'id', 'full_name', 'college', 'total_points',
            'total_tests', 'total_questions_solved', 'total_correct',
            'accuracy_percentage', 'total_time_taken_seconds', 'rank'
        ]


class QuestionAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'


class QuestionStudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = [
            'id', 'topic', 'company_tag', 'year_tag',
            'question_text', 'option_a', 'option_b', 'option_c', 'option_d',
            'correct_option', 'step_by_step_solution', 'shortcut_formula', 'order'
        ]


class TestSeriesListSerializer(serializers.ModelSerializer):
    question_count = serializers.IntegerField(source='questions.count', read_only=True)

    class Meta:
        model = TestSeries
        fields = [
            'id', 'title', 'slug', 'company_name', 'year', 'test_type',
            'topic_category', 'description', 'duration_minutes',
            'total_questions', 'difficulty', 'question_count', 'is_active', 'created_at'
        ]


class TestSeriesDetailSerializer(serializers.ModelSerializer):
    questions = QuestionStudentSerializer(many=True, read_only=True)
    question_count = serializers.IntegerField(source='questions.count', read_only=True)

    class Meta:
        model = TestSeries
        fields = [
            'id', 'title', 'slug', 'company_name', 'year', 'test_type',
            'topic_category', 'description', 'duration_minutes',
            'total_questions', 'difficulty', 'question_count', 'questions', 'is_active', 'created_at'
        ]


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


