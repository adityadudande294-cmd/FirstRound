#!/usr/bin/env python
"""
Standalone Database Fix Script: Shuffle MCQ Options & Correct Answers
Usage: python shuffle_mcq_answers.py
"""
import os
import sys
import django

# Setup Django Environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'firstround_core.settings')
django.setup()

from portal.management.commands.shuffle_mcq_answers import shuffle_all_questions_in_db

if __name__ == '__main__':
    print("🚀 Starting Standalone MCQ Option & Answer Shuffling Migration...")
    counts = shuffle_all_questions_in_db()
    
    # Verification Assertions
    total = sum(counts.values())
    if total > 0:
        for opt in ['A', 'B', 'C', 'D']:
            cnt = counts.get(opt, 0)
            ratio = cnt / total
            assert 0.15 <= ratio <= 0.35, f"Option {opt} count ({cnt}/{total} = {ratio:.2%}) is outside expected balanced range [15%, 35%]"
        print(f"✨ Assertion Passed: Answer keys are evenly distributed across A, B, C, D ({dict(counts)})")
