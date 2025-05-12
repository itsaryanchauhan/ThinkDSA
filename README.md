
# 🧠 ThinkDSA – Think Before You Code

> A modern, AI-powered platform that helps DSA learners focus on **understanding**, not just solving. Track, think, and reflect on problems from any platform — all in one place.

---

## 🚀 What is ThinkDSA?

**ThinkDSA** is a developer-first, minimalist web platform that empowers DSA learners to:
- Organize problems by topic across different coding platforms (LeetCode, GFG, etc.)
- Practice *pseudocode-first thinking* to break out of the copy-paste cycle
- Get iterative, non-direct feedback using AI (Gemini API)
- Track their journey with personalized topics and self-curated problem sets

Rather than reinvent the wheel, ThinkDSA helps learners make sense of all the *existing* DSA platforms — with an added layer of *reflection* and *personal progress*.

---

## 🧩 Why Build This?

There are hundreds of coding platforms, but:
- Most learners feel overwhelmed by scattered resources.
- People often forget what they’ve already done.
- Copying answers becomes a crutch, not a learning tool.
- Feedback on "how to think better" is missing.

**ThinkDSA solves these by encouraging real thinking, personal tracking, and incremental learning.**

---

## 🔧 How It Works

### 🏠 Landing Page
- A clean, responsive introduction to ThinkDSA.
- Highlights features, how it works, and CTA to sign up.

### 👤 Authentication
- Firebase Auth (or Auth0) enables users to sign up/login securely.

### 🗂 Home Page
- Users can create custom **Topics** (e.g., Linked List, DP).
- Each topic contains user-added questions via URLs (LeetCode, GFG, etc.).

### 🔍 Explore Page
- Optional discovery of shared topic sets or trending question collections (future feature).

### 📘 Topic View
- List of added questions with status tracking.
- Add a question by pasting a link — metadata is scraped and stored.
- Clicking a question opens the detailed **question view**.

### ✍️ Question View (Core Page)
- **Left Panel**:
  - Displays original question summary.
  - Includes AI-generated variations (small tweaks to deepen thinking).
- **Right Panel (Split)**:
  - Top: Pseudocode editor
  - Bottom: AI Feedback Box
    - “Run Feedback” triggers Gemini API
    - Gemini provides **iterative suggestions** (not full answers)
- Once accepted, the user unlocks a button to return to the original platform to solve.

---

## 🎨 Design Philosophy

- 🌓 **Dark & Light Themes** – Theme toggle based on user/system preference
- 📏 **No full-page scrolls** – All content scrolls within fixed panels, not the page (except landing)
- 🧼 **Minimalist Aesthetic** – Inspired by developer tools like Linear, Supabase, Vercel
- 🖥️ **Split-Pane Layouts** – Encourages simultaneous focus on problem + thought process

---

## 🏗️ Tech Stack

| Layer        | Tech                             |
|--------------|----------------------------------|
| Frontend     | React + Tailwind CSS             |
| Backend      | Node.js + Express (or Firebase)  |
| Database     | MongoDB (or Firestore)           |
| Auth         | Firebase Auth or Auth0           |
| AI Feedback  | Gemini API (for pseudocode review) |
| Deployment   | Vercel / Netlify / Render        |

---

## 📁 Folder Structure (Suggested)

```
/thinkdsa
├── /public
├── /src
│   ├── /components     # Reusable UI components
│   ├── /pages          # Landing, Home, Topic, QuestionView
│   ├── /hooks          # Custom hooks (e.g., theme, auth)
│   ├── /styles         # Tailwind/global styles
│   ├── /api            # API routes or integrations
│   └── App.jsx         # Main layout and routing
├── .env                # API keys, etc.
├── tailwind.config.js
└── README.md
```

---

## 🧪 Local Setup

```bash
git clone https://github.com/your-username/thinkdsa.git
cd thinkdsa
npm install
```

Add your `.env` file with:
```env
VITE_FIREBASE_API_KEY=...
VITE_GEMINI_API_KEY=...
```

Then run:

```bash
npm run dev
```

---

## ✅ Preferred Conventions

- Use **functional components** with hooks.
- Keep logic clean and separate UI from business logic.
- Avoid large monolithic components.
- Use **TailwindCSS** for styling unless complex component styling is needed.
- Prefer **internal scroll containers** for sections (topic list, question panel).
- Feedback must always **nudge** user thinking — never reveal full answers.
- Every page should **preserve context** and avoid full reloads.

---

## 🌱 Roadmap (Future Ideas)

- [ ] Social sharing of topics and curated lists
- [ ] Leaderboard for consistency streaks
- [ ] AI-assisted problem difficulty adjustment
- [ ] Browser extension to clip problems on the fly
- [ ] Markdown export of user's notes/pseudocode

---

## 📜 License

MIT License

---

## 🤝 Contributing

If you'd like to contribute:
1. Fork the repo
2. Create a branch: `feature/your-feature`
3. Submit a pull request

Open to ideas, feedback, and collaboration!

---

## 🙏 Acknowledgments

Inspired by learners who think deeper, mentors who teach process, and platforms like LeetCode, GFG, and Codeforces.

Built for the coders who want to **think before they code**. ❤️