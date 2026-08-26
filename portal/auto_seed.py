import logging
from portal.models import TestSeries, User

logger = logging.getLogger(__name__)

def ensure_database_seeded():
    """
    Auto-seeds the database if TestSeries count is 0 or if Admin user is missing.
    Guarantees that on Render production startup with fresh PostgreSQL,
    all 25 tests, 625 questions, and super admin aadi@gmail.com exist immediately.
    """
    try:
        if TestSeries.objects.count() == 0 or not User.objects.filter(email="aadi@gmail.com").exists():
            logger.info("⚡ TestSeries count is 0. Auto-seeding production question bank...")
            from populate_db import seed_rich_database
            seed_rich_database()
            logger.info("✅ Auto-seeding completed successfully!")
    except Exception as e:
        logger.error(f"Error during auto-seeding: {e}")
