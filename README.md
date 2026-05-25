# 🗒️ AI Notes Summarizer

An AI-powered SaaS application that summarizes long notes instantly.

## 🔗 Live Links
- **Frontend:** https://ai-notes-summarizer-frontend-jb7koe3hu.vercel.app
- **Backend:** https://ai-notes-backend-ynth.onrender.com

## ✨ Features
- 🤖 AI-powered notes summarization
- 🔐 User authentication (JWT)
- 📚 Summary history
- 📱 Responsive dashboard
- ☁️ Fully deployed

## 🛠️ Tech Stack
- Frontend: React.js
- Backend: Python FastAPI
- Database: MongoDB Atlas
- AI: Extractive Summarization
- Deployed: Vercel + Render

## 📸 Screenshots
- Login Page
- Dashboard
- AI Summarizer
- History Page

## ⚙️ Installation
1. Clone the repo
2. cd backend → pip install -r requirements.txt → create .env → uvicorn main:app --reload
3. cd frontend → npm install → npm start

## 🔌 API Routes
| Method | Route | Description |
|---|---|---|
| POST | /register | Register user |
| POST | /login | Login user |
| GET | /profile | Get profile |
| POST | /summarize | Summarize notes |
| GET | /history | Get history |

## 🧪 Test Report
See TEST_REPORT.md for 15 test cases.

## 🚀 Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas
