from django.urls import path, re_path
from . import views

urlpatterns = [
    # ── SPA Root ──────────────────────────────────────────────────────────────
    path('', views.index_view, name='index'),

    # ── Auth (with AND without trailing slash — POST bodies lost on redirect) ──
    path('api/auth/login-or-register/', views.AuthLoginOrRegisterView.as_view(), name='api-auth'),
    path('api/auth/login-or-register', views.AuthLoginOrRegisterView.as_view(), name='api-auth-noslash'),
    path('api/auth/profile/<str:user_id>/', views.UserProfileView.as_view(), name='api-profile'),
    path('api/auth/profile/<str:user_id>', views.UserProfileView.as_view(), name='api-profile-noslash'),

    # ── Tests Catalog & Execution ──────────────────────────────────────────────
    path('api/tests/', views.TestSeriesListView.as_view(), name='api-test-list'),
    path('api/tests', views.TestSeriesListView.as_view(), name='api-test-list-noslash'),
    path('api/tests/history/', views.TestHistoryView.as_view(), name='api-test-history'),
    path('api/tests/history', views.TestHistoryView.as_view(), name='api-test-history-noslash'),
    path('api/tests/history/visit/', views.TestHistoryVisitView.as_view(), name='api-test-history-visit'),
    path('api/tests/history/visit', views.TestHistoryVisitView.as_view(), name='api-test-history-visit-noslash'),
    path('api/tests/history/start/', views.TestHistoryStartView.as_view(), name='api-test-history-start'),
    path('api/tests/history/start', views.TestHistoryStartView.as_view(), name='api-test-history-start-noslash'),
    path('api/tests/<int:test_id>/', views.TestSeriesDetailView.as_view(), name='api-test-detail'),
    path('api/tests/<int:test_id>', views.TestSeriesDetailView.as_view(), name='api-test-detail-noslash'),
    path('api/tests/<int:test_id>/submit/', views.SubmitTestView.as_view(), name='api-test-submit'),
    path('api/tests/<int:test_id>/submit', views.SubmitTestView.as_view(), name='api-test-submit-noslash'),

    # ── Catalogue (React calls /api/catalogue) ────────────────────────────────
    path('api/catalogue/', views.CatalogueView.as_view(), name='api-catalogue'),
    path('api/catalogue', views.CatalogueView.as_view(), name='api-catalogue-noslash'),

    # ── Companies (React calls /api/companies) ────────────────────────────────
    path('api/companies/', views.CompaniesListView.as_view(), name='api-companies'),
    path('api/companies', views.CompaniesListView.as_view(), name='api-companies-noslash'),

    # ── Leaderboard ────────────────────────────────────────────────────────────
    path('api/leaderboard/', views.LeaderboardView.as_view(), name='api-leaderboard'),
    path('api/leaderboard', views.LeaderboardView.as_view(), name='api-leaderboard-noslash'),

    # ── Attempts (React calls /api/attempts) ──────────────────────────────────
    path('api/attempts/', views.UserAttemptsView.as_view(), name='api-attempts'),
    path('api/attempts', views.UserAttemptsView.as_view(), name='api-attempts-noslash'),

    # ── Notifications ──────────────────────────────────────────────────────────
    path('api/notifications/', views.NotificationsView.as_view(), name='api-notifications'),
    path('api/notifications', views.NotificationsView.as_view(), name='api-notifications-noslash'),
    path('api/notifications/mark-all-read/', views.NotificationsView.as_view(), name='api-notifications-mark-all'),
    path('api/notifications/mark-all-read', views.NotificationsView.as_view(), name='api-notifications-mark-all-noslash'),
    path('api/notifications/<str:notification_id>/read/', views.NotificationReadView.as_view(), name='api-notification-read'),
    path('api/notifications/<str:notification_id>/read', views.NotificationReadView.as_view(), name='api-notification-read-noslash'),

    # ── AI Doubt Solver ────────────────────────────────────────────────────────
    path('api/ai/ask-doubt/', views.AIDoubtView.as_view(), name='api-ai-doubt'),
    path('api/ai/ask-doubt', views.AIDoubtView.as_view(), name='api-ai-doubt-noslash'),

    # ── Admin Management ───────────────────────────────────────────────────────
    path('api/admin/stats/', views.AdminStatsView.as_view(), name='api-admin-stats'),
    path('api/admin/members/', views.AdminMembersView.as_view(), name='api-admin-members'),
    path('api/admin/tests/', views.AdminTestManageView.as_view(), name='api-admin-tests'),
    path('api/admin/questions/', views.AdminQuestionManageView.as_view(), name='api-admin-questions'),
    path('api/admin/tests/generate-from-file/', views.AdminTestGenerateFromFileView.as_view(), name='api-admin-tests-generate-file'),
    path('api/admin/sample-docx/', views.AdminDownloadSampleDocxView.as_view(), name='api-admin-sample-docx'),
    path('api/admin/announcements/', views.AdminAnnouncementsView.as_view(), name='api-admin-announcements'),
    path('api/admin/announcements', views.AdminAnnouncementsView.as_view(), name='api-admin-announcements-noslash'),
    path('api/admin/qa-report/', views.QAReportView.as_view(), name='api-admin-qa-report'),
    path('api/admin/qa-report', views.QAReportView.as_view(), name='api-admin-qa-report-noslash'),

    # ── Bookmarks & Revision Vault ─────────────────────────────────────────────
    path('api/bookmarks/toggle/', views.BookmarkToggleView.as_view(), name='api-bookmark-toggle'),
    path('api/bookmarks/toggle', views.BookmarkToggleView.as_view(), name='api-bookmark-toggle-noslash'),
    path('api/bookmarks/', views.BookmarkedQuestionsListView.as_view(), name='api-bookmarks-list'),
    path('api/bookmarks', views.BookmarkedQuestionsListView.as_view(), name='api-bookmarks-list-noslash'),
    path('api/revision-vault/weak-questions/', views.WeakQuestionsListView.as_view(), name='api-weak-questions'),
    path('api/revision-vault/weak-questions', views.WeakQuestionsListView.as_view(), name='api-weak-questions-noslash'),

    # ── Mega Events ────────────────────────────────────────────────────────────
    path('api/mega-events/', views.MegaEventListView.as_view(), name='api-mega-events'),
    path('api/mega-events', views.MegaEventListView.as_view(), name='api-mega-events-noslash'),
    path('api/mega-events/<int:event_id>/leaderboard/', views.MegaEventLeaderboardView.as_view(), name='api-mega-event-leaderboard'),

    # ── SPA catch-all: React Router deep links (MUST be last) ─────────────────
    re_path(r'^(?!api/).*$', views.index_view, name='spa-catchall'),
]
