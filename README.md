# FirstRound — Corporate Campus Placement Aptitude & Competition Portal

**FirstRound** is a production-ready web application designed for students to practice real-company placement aptitude tests (TCS, Wipro, Infosys, Accenture, Cognizant) with 100% free and unlocked access, instant step-by-step formula breakdowns, and live campus competition.

---

## 🎨 Corporate Placement Theme & Color System

- **Primary (Header / Navbar / Footer / Dark Headings):** `#003057` (TCS Style Deep Navy Blue)
- **Secondary (Interactive Buttons / Active Links / Tabs):** `#3781C2` (Infosys Style Bright Blue)
- **Accent (Primary CTA / "Start Test" Buttons / Badges):** `#FFC412` (Wipro Style Turmeric Yellow)
- **Main App Background:** `#F4F7F6` (Clean Off-White)
- **Surface / Cards / Modals:** `#FFFFFF` (Pure White Card with subtle border and shadow)
- **Success / Correct Answer (Green Tick):** `#10B981` (Emerald Green)
- **Danger / Wrong Answer / Timer Alert:** `#EF4444` (Crimson Red)
- **Text Primary:** `#00223E` / `#1E293B` (Deep Charcoal/Navy)
- **Text Muted:** `#64748B` (Slate Gray)

---

## 🚀 Key Modules & Architecture

### 1. Mandatory Authentication Gateway
- Direct visits to the portal without active session are routed to the **Authentication Gate**.
- Clean Sign In (Email & Password) and Registration (Full Name, College, Email, Password).
- Pre-configured Admin access: `aadi@gmail.com` / `1234`.
- Persistent session storage in `localStorage`.

### 2. 100% Free & Unlocked Company Test Series
- **TCS:** 2024 (Digital & Ninja), 2025 (NQT), 2026 (Prime)
- **Wipro:** 2024 (Turbo), 2025 (Elite NLTH), 2026 (Velocity)
- **Infosys:** 2025 Specialist Programmer (SP) & Systems Engineer
- **Accenture:** 2025 Cognitive Assessment & Critical Logic
- **Cognizant:** 2025 GenC Next Aptitude Qualifier
- **Topic Modules:** Quantitative Aptitude, Logical Reasoning, Verbal Ability, Core Technical MCQs.
- 25+ questions per test with authentic company tags and zero duplicates.

### 3. Dual-Mode Test Execution Engine
- **Mode A: Practice Mode:** Question-wise timer with instant Green (`#10B981`) and Red (`#EF4444`) feedback, step-by-step mathematical reasoning, and placement speed shortcuts.
- **Mode B: Full Exam Simulation:** 25-minute test countdown, danger timer alert under 2 minutes, question palette navigation, and auto-submission.

### 4. Post-Test Diagnostic & Weakness Engine
- Score and accuracy percentage with points earned: `Points = (Correct × 10) - (Incorrect × 2)`.
- Average pacing per question.
- **Strong Topics ($\ge 80\%$):** Highlighted with green badges.
- **Weak Topics ($< 60\%$):** Highlighted with red badges and actionable study recommendations.
- Filterable accordion reviewing all questions with step-by-step proofs and speed formulas.

### 5. 100% Dynamic Live Leaderboard
- Real-time database queries: only users who have taken tests are ranked.
- Empty state encouragement when no tests have been taken yet.
- Interactive candidate profile modal on row click.

### 6. Admin Command Center (`aadi@gmail.com`)
- System analytics (Total Students, Tests, Questions, Attempts, Avg Accuracy).
- Create / Edit new company test series.
- Add questions with instant formula and solution breakdown.
- Student Member Directory with searchable records.

---

## 🛠️ Local Setup Instructions

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run Migrations & Seed Database:**
   ```bash
   python manage.py migrate
   python populate_db.py
   ```

3. **Start Development Server:**
   ```bash
   python manage.py runserver 127.0.0.1:8000
   ```
   Open `http://127.0.0.1:8000/` in your browser.
