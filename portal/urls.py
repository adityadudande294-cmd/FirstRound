from django.urls import path
from . import views

urlpatterns = [
    # SPA Root
    path('', views.index_view, name='index'),

    # Auth
    path('api/auth/login-or-register/', views.AuthLoginOrRegisterView.as_view(), name='api-auth'),
    path('api/auth/profile/<str:user_id>/', views.UserProfileView.as_view(), name='api-profile'),

    # Tests Catalog & Execution
    path('api/tests/', views.TestSeriesListView.as_view(), name='api-test-list'),
    path('api/tests/<int:test_id>/', views.TestSeriesDetailView.as_view(), name='api-test-detail'),
    path('api/tests/<int:test_id>/submit/', views.SubmitTestView.as_view(), name='api-test-submit'),

    # Live Leaderboard
    path('api/leaderboard/', views.LeaderboardView.as_view(), name='api-leaderboard'),

    # Admin Management
    path('api/admin/stats/', views.AdminStatsView.as_view(), name='api-admin-stats'),
    path('api/admin/members/', views.AdminMembersView.as_view(), name='api-admin-members'),
    path('api/admin/tests/', views.AdminTestManageView.as_view(), name='api-admin-tests'),
    path('api/admin/questions/', views.AdminQuestionManageView.as_view(), name='api-admin-questions'),
    path('api/admin/tests/generate-from-file/', views.AdminTestGenerateFromFileView.as_view(), name='api-admin-tests-generate-file'),
    path('api/admin/sample-docx/', views.AdminDownloadSampleDocxView.as_view(), name='api-admin-sample-docx'),

    # Growth & Retention: Bookmarks & Revision Vault
    path('api/bookmarks/toggle/', views.BookmarkToggleView.as_view(), name='api-bookmark-toggle'),
    path('api/bookmarks/', views.BookmarkedQuestionsListView.as_view(), name='api-bookmarks-list'),
    path('api/revision-vault/weak-questions/', views.WeakQuestionsListView.as_view(), name='api-weak-questions'),

    # Mega Contests Arena
    path('api/mega-events/', views.MegaEventListView.as_view(), name='api-mega-events'),
    path('api/mega-events/<int:event_id>/leaderboard/', views.MegaEventLeaderboardView.as_view(), name='api-mega-event-leaderboard'),
]



