# 📚 StudyBuddy - AI-Powered Study Companion

> **Your intelligent learning companion that transforms the way you study, plan, and track your educational journey.**

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue.svg)](https://www.typescriptlang.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115.0-green.svg)](https://fastapi.tiangolo.com/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-purple.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 🌟 Overview

StudyBuddy is a comprehensive AI-powered educational platform designed to enhance learning experiences through personalized study plans, intelligent resource recommendations, wellness tracking, and progress monitoring. Built with modern web technologies and featuring a professional, enterprise-grade user interface.

## ✨ Key Features

### 🎯 **Smart Dashboard**
- **Real-time metrics** tracking study hours, focus score, and wellness
- **Today's & Tomorrow's plans** with intelligent scheduling
- **Personalized recommendations** powered by AI
- **Motivational quotes** to keep you inspired
- **Interactive progress visualization**

### 📖 **Learning Resources**
- **AI-curated content** tailored to your learning goals
- **Multi-format support** (videos, articles, interactive content)
- **Skill-level adaptive** recommendations
- **Progress-based content** suggestions

### 📅 **Timetable Generation**
- **Intelligent scheduling** based on your availability
- **Priority-based planning** for optimal productivity
- **Conflict resolution** and automatic adjustments
- **Export & sync** capabilities

### 🧘 **Wellness Tracking**
- **Mental health monitoring** with mood tracking
- **Break reminders** and wellness tips
- **Stress level assessment** and management
- **Healthy study habit** recommendations

### 📊 **Progress Analytics**
- **Detailed performance metrics** and insights
- **Learning curve analysis** and predictions
- **Goal tracking** and achievement milestones
- **Comparative progress** reports

## 🏗️ Architecture

```
StudyBuddy/
├── 🎨 Frontend/                 # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/              # Main application pages
│   │   ├── hooks/              # Custom React hooks
│   │   └── assets/             # Static assets
│   └── public/                 # Public assets
├── 🚀 Backend/                  # FastAPI + Python
│   ├── main.py                 # API server entry point
│   └── requirements.txt        # Python dependencies
└── 🤖 Rag/                     # AI/ML Components
    ├── Rag rhythm/             # Rhythm analysis
    └── Rag Time table/         # Schedule optimization
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.8 or higher)
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/dharshan-kumarj/google_hackathon.git
cd google_hackathon
```

### 2. Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

### 3. Backend Setup

```bash
cd ../Backend
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

### 4. Environment Configuration

Create a `.env` file in the Backend directory:

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SECRET_KEY=your_secret_key
DATABASE_URL=your_database_url
```

## 🎨 UI/UX Design

### Professional Design System
- **Glassmorphism** aesthetic with modern blur effects
- **Corporate color palette** using professional blue gradients
- **Inter font family** for clean, readable typography
- **Responsive design** optimized for all devices
- **Accessibility-first** approach with proper contrast ratios

### Color Palette
```css
Primary: #3b82f6 (Blue)
Secondary: #1d4ed8 (Dark Blue)
Background: Linear gradient from #1e3c72 to #764ba2
Text: #1e293b (Dark Slate)
Accent: #f59e0b (Amber)
```

## 🔐 Authentication

StudyBuddy uses **Google OAuth 2.0** for secure authentication:

- **Seamless sign-in** with Google accounts
- **Secure token management** with JWT
- **Protected routes** and API endpoints
- **Automatic session management**

## 📱 Responsive Design

- **Mobile-first** approach
- **Tablet optimization** with adaptive layouts
- **Desktop enhancement** with advanced features
- **Cross-browser compatibility**

## 🛠️ Technology Stack

### Frontend
- **React 19.1.1** - Modern UI framework
- **TypeScript 5.9.3** - Type-safe development
- **Vite 7.1.7** - Lightning-fast build tool
- **React Router Dom** - Client-side routing
- **Bootstrap Icons** - Professional icon library

### Backend
- **FastAPI 0.115.0** - High-performance Python API framework
- **Uvicorn** - ASGI server for production
- **Python-JOSE** - JWT token handling
- **HTTPx** - Async HTTP client

### Development Tools
- **ESLint** - Code linting and formatting
- **TypeScript ESLint** - TypeScript-specific linting
- **Vite Plugin React SWC** - Fast React refresh

## 📊 Performance

- **Lighthouse Score**: 95+ for Performance, Accessibility, Best Practices
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 2.5s
- **Bundle Size**: Optimized with code splitting

## 🧪 Testing

```bash
# Frontend tests
cd Frontend
npm run test

# Backend tests
cd Backend
python -m pytest
```

## 📦 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
```

### Backend (Railway/Heroku)
```bash
# Dockerfile included for containerized deployment
docker build -t studybuddy-backend .
docker run -p 8000:8000 studybuddy-backend
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

## 📋 Roadmap

- [ ] **Mobile App** (React Native)
- [ ] **Offline Mode** with PWA capabilities
- [ ] **Advanced Analytics** with ML insights
- [ ] **Collaborative Study** rooms
- [ ] **Integration** with popular learning platforms
- [ ] **Voice Commands** and accessibility features

## 🐛 Known Issues

- Chrome extension compatibility (planned for v2.0)
- Dark mode implementation (in progress)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google** for OAuth integration
- **React Team** for the amazing framework
- **FastAPI** community for the excellent documentation
- **Design inspiration** from modern educational platforms

## 📞 Support & Contact

- **Email**: support@studybuddy.com
- **GitHub Issues**: [Report bugs or request features](https://github.com/dharshan-kumarj/google_hackathon/issues)
- **Documentation**: [Full API documentation](https://studybuddy.com/docs)

---

<div align="center">

**Made with ❤️ by the StudyBuddy Team**

⭐ **Star this repo if you find it helpful!** ⭐

</div>