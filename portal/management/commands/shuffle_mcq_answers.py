import random
from collections import Counter
from django.core.management.base import BaseCommand
from django.db import transaction
from portal.models import Question


def shuffle_single_question_options(option_a, option_b, option_c, option_d, correct_option='A', rng=None):
    """
    Shuffles the four MCQ options and determines the new correct_option letter.
    Uses tuple tracking so duplicates or special characters are safely handled.
    """
    items = [
        ('A', option_a),
        ('B', option_b),
        ('C', option_c),
        ('D', option_d),
    ]
    correct_key = (correct_option or 'A').strip().upper()
    correct_item = next((item for item in items if item[0] == correct_key), items[0])

    shuffler = rng.shuffle if rng is not None else random.shuffle
    shuffler(items)

    keys = ['A', 'B', 'C', 'D']
    new_correct_option = 'A'
    new_options = {}

    for idx, (original_key, text) in enumerate(items):
        target_key = keys[idx]
        new_options[f"option_{target_key.lower()}"] = text
        if original_key == correct_item[0]:
            new_correct_option = target_key

    return (
        new_options['option_a'],
        new_options['option_b'],
        new_options['option_c'],
        new_options['option_d'],
        new_correct_option
    )


def shuffle_all_questions_in_db(seed=None, stdout=None):
    """
    Fetches all Question records from the database, shuffles options dynamically,
    reassigns option_a..d and correct_option, and saves back to the database.
    Prints distribution summary.
    """
    log = (lambda msg: stdout.write(msg + "\n")) if stdout else print

    rng = random.Random(seed) if seed is not None else random.Random()
    questions = list(Question.objects.all().order_by('id'))
    total_count = len(questions)

    if total_count == 0:
        log("⚠️ No questions found in database to shuffle.")
        return Counter()

    before_counts = Counter(q.correct_option for q in questions)
    log(f"📋 Initial Distribution ({total_count} total questions): {dict(before_counts)}")

    with transaction.atomic():
        for q in questions:
            oa, ob, oc, od, new_correct = shuffle_single_question_options(
                q.option_a,
                q.option_b,
                q.option_c,
                q.option_d,
                q.correct_option,
                rng=rng
            )
            q.option_a = oa
            q.option_b = ob
            q.option_c = oc
            q.option_d = od
            q.correct_option = new_correct
            q.save(update_fields=['option_a', 'option_b', 'option_c', 'option_d', 'correct_option'])

    # Verify updated distribution from fresh query
    updated_questions = Question.objects.all()
    after_counts = Counter(updated_questions.values_list('correct_option', flat=True))

    log("\n🎲 MCQ Options and Correct Answers Shuffled Successfully!")
    log(f"📊 Final Distribution Summary ({total_count} Questions):")
    for opt in ['A', 'B', 'C', 'D']:
        cnt = after_counts.get(opt, 0)
        pct = (cnt / total_count * 100) if total_count > 0 else 0
        log(f"   Option {opt}: {cnt} questions ({pct:.1f}%)")

    log(f"✅ Distribution formatted: Distribution: A: ~{after_counts.get('A', 0)}, B: ~{after_counts.get('B', 0)}, C: ~{after_counts.get('C', 0)}, D: ~{after_counts.get('D', 0)}")
    return after_counts


class Command(BaseCommand):
    help = "Randomly shuffle MCQ options and dynamically reassign correct answers across all questions"

    def add_arguments(self, parser):
        parser.add_argument(
            '--seed',
            type=int,
            default=None,
            help="Optional random seed for deterministic option shuffling"
        )

    def handle(self, *args, **options):
        seed = options.get('seed')
        shuffle_all_questions_in_db(seed=seed, stdout=self.stdout)
