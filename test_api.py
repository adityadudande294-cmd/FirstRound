import urllib.request
import json
import io

BASE_URL = "http://127.0.0.1:8000"

def post_json(url, data):
    req = urllib.request.Request(
        url,
        data=json.dumps(data).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode('utf-8'))

def get_json(url):
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode('utf-8'))

def run_integrity_tests():
    print("🚀 Running FirstRound Test Integrity & Anti-Cheating Monitoring Test Suite...")

    # 1. Register candidate
    auth_resp = post_json(f"{BASE_URL}/api/auth/login-or-register/", {
        "email": "rohan.mehta@campus.edu",
        "password": "pass1234password",
        "full_name": "Rohan Mehta",
        "college": "IIT Bombay"
    })
    user_id = auth_resp["user"]["id"]
    print(f"  ✅ Candidate Registered: Rohan Mehta (ID #{user_id})")

    # 2. Fetch sample test
    tests_resp = get_json(f"{BASE_URL}/api/tests/?type=COMPANY")
    sample_test = tests_resp["tests"][0]
    test_detail = get_json(f"{BASE_URL}/api/tests/{sample_test['id']}/")
    q1 = test_detail["questions"][0]

    # 3. Simulate Integrity Violation: 2 Tab switches leading to auto-submission
    integrity_sub_resp = post_json(f"{BASE_URL}/api/tests/{sample_test['id']}/submit/", {
        "user_id": user_id,
        "mode": "EXAM",
        "time_taken_seconds": 150,
        "tab_switches_count": 2,
        "integrity_flag": True,
        "submission_reason": "Submitted with integrity flags (Multiple tab switches detected)",
        "responses": [
            {"question_id": q1["id"], "selected_option": q1["correct_option"], "time_spent_seconds": 30}
        ]
    })

    assert integrity_sub_resp["integrity_flag"] is True
    assert integrity_sub_resp["tab_switches_count"] == 2
    assert "integrity flags" in integrity_sub_resp["submission_reason"]
    print("  ✅ Integrity Flag Submission Verified: Test tagged with integrity violations (2 tab switches)!")

    # 4. Check user profile / attempts endpoint to ensure flags are persisted
    profile = get_json(f"{BASE_URL}/api/auth/profile/{user_id}/")
    latest_attempt = profile["recent_attempts"][0]
    assert latest_attempt["integrity_flag"] is True
    assert latest_attempt["tab_switches_count"] == 2
    assert latest_attempt["submission_reason"] == "Submitted with integrity flags (Multiple tab switches detected)"
    print("  ✅ Profile Attempt History Verified: Integrity flag and tab switch count persisted accurately in database!")

    # 5. Simulate Normal Clean Submission (0 Tab Switches)
    clean_sub_resp = post_json(f"{BASE_URL}/api/tests/{sample_test['id']}/submit/", {
        "user_id": user_id,
        "mode": "EXAM",
        "time_taken_seconds": 300,
        "tab_switches_count": 0,
        "integrity_flag": False,
        "submission_reason": "Normal Submission",
        "responses": [
            {"question_id": q1["id"], "selected_option": q1["correct_option"], "time_spent_seconds": 45}
        ]
    })

    assert clean_sub_resp["integrity_flag"] is False
    assert clean_sub_resp["tab_switches_count"] == 0
    print("  ✅ Normal Clean Attempt Verified: No false positive integrity flags!")

    print("\n🎉 ALL TEST INTEGRITY & TAB-SWITCH MONITORING TESTS PASSED 100%!")

if __name__ == '__main__':
    run_integrity_tests()
