# PostGenius 🚀

**AI-Powered Social Media Content Generator** — Upload a photo, pick your platforms, get scroll-stopping captions in seconds.

![React](https://img.shields.io/badge/React-18-blue?logo=react) ![Vite](https://img.shields.io/badge/Vite-6-purple?logo=vite) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss) ![Capacitor](https://img.shields.io/badge/Capacitor-7-119EFF?logo=capacitor) ![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- **Multi-Platform Captions** — Generate unique, tailored posts for Twitter, LinkedIn, Instagram, Reddit & Facebook in one tap
- **AI-Powered** — Uses Llama 3.3 70B via Groq for viral-quality captions with platform-specific best practices
- **Customizable Tone & Style** — Professional, casual, witty, inspiring, and more
- **Collections** — Browse, search, and manage all generated posts
- **Analytics Dashboard** — Track content creation stats across platforms
- **Personalized Profiles** — Custom minimal avatars and user profiles
- **Onboarding** — Personalized welcome experience on first launch

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript |
| Build | Vite 6 |
| Styling | Tailwind CSS 4 |
| Animations | Framer Motion |
| Icons | Lucide React |
| AI | Groq API (Llama 3.3 70B) |
| Native | Capacitor 7 (Android) |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Android Studio (for APK builds)

### Install & Run

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Sync to Android
npx cap sync android
```

### Build APK
1. Run `npm run build && npx cap sync android`
2. Open the `android/` folder in Android Studio
3. Build → Generate Signed APK

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Dark Slate Gray | `#2F4F4F` | Primary |
| Light Slate Gray | `#778899` | Secondary |
| Beige | `#F5F5DC` | Surfaces |
| Light Blue | `#ADD8E6` | Accents |
| Sky Blue | `#87CEEB` | Highlights |

## 📁 Project Structure

```
PostGenius/
├── src/
│   ├── components/
│   │   ├── TopBar.tsx          # Header with profile
│   │   ├── BottomNav.tsx       # Bottom navigation
│   │   ├── HomeView.tsx        # Upload screen
│   │   ├── PlatformView.tsx    # Platform selection
│   │   ├── ResultsView.tsx     # Generated posts
│   │   ├── AnalyticsView.tsx   # Usage stats
│   │   ├── CollectionsView.tsx # Saved posts
│   │   ├── SplashScreen.tsx    # Animated splash
│   │   └── OnboardingScreen.tsx # Name input
│   ├── App.tsx                 # Main app logic
│   └── index.css               # Design tokens
├── android/                    # Capacitor Android project
└── public/
    └── logo.png                # App logo
```

## 👤 Author

**Aarav-bit** — Built with ❤️

## 📄 License

MIT
