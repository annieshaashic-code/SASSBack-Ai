# 🧚‍♀️ SASSBack AI — Complete Setup & Deployment Guide

> *"Your fierce fairy godmother, armed with AI and over-the-top drama."*  
> Built at **Women Only Hackathon 2026** 💜

---

## 📁 Project Structure

```
sass/
├── backend/
│   ├── app.py            ← Flask server + all API routes
│   ├── ai_engine.py      ← AI comeback generator (OpenAI + fallback bank)
│   ├── database.py       ← SQLite helpers
│   ├── models.py         ← DB schema SQL
│   ├── requirements.txt  ← Python dependencies
│   ├── .env.example      ← Environment variable template
│   └── fairy_godmother.db  ← Auto-created SQLite database
└── javascript/
    ├── index.html        ← Main app (comeback generator)
    ├── community.html    ← Anonymous story wall
    ├── insights.html     ← Personal stats dashboard
    ├── styles.css        ← Full glassmorphism design
    └── app.js            ← All frontend logic
```

---

## 🚀 Running Locally (Step-by-Step)

### Step 1 — Install Python
Download Python 3.10+ from [python.org](https://python.org/downloads).  
✅ Tick **"Add Python to PATH"** during installation.

### Step 2 — Install dependencies

Open a terminal (PowerShell on Windows) and run:

```powershell
cd C:\Users\Hp\Desktop\sass\backend
pip install -r requirements.txt
```

### Step 3 — Set up your API key (optional but recommended)

```powershell
# Copy the template
copy .env.example .env
```

Then open `.env` in Notepad and add your OpenAI key:
```
OPENAI_API_KEY=sk-your-actual-key-here
FLASK_ENV=development
```

> 💡 **No API key?** The app works perfectly with the built-in curated fallback comebacks — no key needed for the hackathon demo!

### Step 4 — Start the backend server

```powershell
cd C:\Users\Hp\Desktop\sass\backend
python app.py
```

You'll see:
```
🧚‍♀️ Fairy Godmother warming up on port 5000...
✨ Database initialised!
 * Running on http://0.0.0.0:5000
```

### Step 5 — Open the app

Open your browser and go to:  
👉 **[http://localhost:5000](http://localhost:5000)**

That's it! The Flask server serves the frontend automatically. ✨

---

## 🌐 API Endpoints Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/api/health` | Health check |
| `POST` | `/api/user` | Create user session |
| `POST` | `/api/comeback` | Generate a comeback |
| `POST` | `/api/incident/<id>/rate` | Rate with emoji |
| `POST` | `/api/incident/<id>/share` | Share to community |
| `GET`  | `/api/user/<id>/stats` | Get personal stats |
| `GET`  | `/api/user/<id>/incidents` | Get incident history |
| `GET`  | `/api/community` | Get community posts |
| `POST` | `/api/community/<id>/like` | Like a post |

### Example — Generate Comeback

```bash
curl -X POST http://localhost:5000/api/comeback \
  -H "Content-Type: application/json" \
  -d '{"scenario": "My boss took credit for my idea", "humor_level": 7}'
```

---

## ☁️ Deploy to the Internet (Free)

### Option A — Render.com (Recommended, Free)

1. Push your code to GitHub
2. Go to [render.com](https://render.com) → **New → Web Service**
3. Connect your GitHub repo
4. Set these fields:
   - **Root Directory:** `backend`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `python app.py`
5. Add Environment Variable: `OPENAI_API_KEY` = your key
6. Click **Deploy** ✅

Your app will be live at `https://your-app.onrender.com` 🎉

---

### Option B — Railway.app (Also Free)

1. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
2. Select your repo
3. Set **Root Directory** → `backend`
4. Add env var: `OPENAI_API_KEY`
5. Railway auto-detects Python and deploys! ✅

---

### Option C — Run Locally for Demo (Simplest)

Just run `python app.py` and demo on `localhost:5000`.  
**Perfect for a hackathon presentation!** Use a screen share tool like Zoom.

---

## 🔑 Getting a Free OpenAI API Key

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up / Log in
3. Go to **API Keys** → **Create new secret key**
4. Copy-paste into your `.env` file

> Free tier gives $5 credit — more than enough for a hackathon! The app uses `gpt-4o-mini` (cheapest model). If you run out, the fallback comebacks kick in automatically.

---

## ✨ Features Summary

| Feature | Status |
|---------|--------|
| AI comeback generation (OpenAI) | ✅ |
| 35+ fallback comebacks (no API needed) | ✅ |
| 7 scenario categories auto-detected | ✅ |
| Humor level slider (1–10) | ✅ |
| Voice input (browser speech API) | ✅ |
| Emoji reactions | ✅ |
| Copy to clipboard | ✅ |
| Meme card generator | ✅ |
| Anonymous community sharing | ✅ |
| Personal insights dashboard | ✅ |
| SQLite database (auto-init) | ✅ |
| Mobile responsive | ✅ |
| Works without API key | ✅ |

---

## 🧪 Test It Fast (Hackathon Demo Script)

1. Start server: `python app.py`
2. Open `http://localhost:5000`
3. Click **"Get Started"** → enter nickname "QueenDemo"
4. Try sample chip: **"Boss stole my idea"**
5. Set humor slider to **Level 9 – Ultra Savage** 😈
6. Click **"Wave the Wand!"**
7. Watch confetti explode 🎉 and read the comeback
8. Click **Make Meme** → screenshot it
9. Click **Share Story** → visit Community wall
10. Visit **My Insights** to see stats

**Total demo time: ~90 seconds. Judges will love it! 🏆**

---

*Made with 💜 and way too much caffeine by Team SASSBack AI*
