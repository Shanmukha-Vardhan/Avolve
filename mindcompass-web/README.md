# 🧭 MindCompass Web

A modern web application for mental wellness tracking, journaling, and goal setting. Built with Next.js 14+, TypeScript, and Tailwind CSS.

## 🚀 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS Variables
- **State Management**: Zustand
- **Data Fetching**: TanStack Query + Axios
- **Backend**: FastAPI (separate repo)
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 📁 Project Structure

```
mindcompass-web/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth routes (login, signup, etc.)
│   ├── (dashboard)/       # Protected dashboard routes
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── ui/                # Reusable UI components
│   ├── layout/            # Layout components
│   ├── forms/             # Form components
│   └── shared/            # Shared components
├── lib/
│   ├── firebase/          # Firebase configuration
│   ├── api/               # API client & services
│   ├── hooks/             # Custom React hooks
│   ├── stores/            # Zustand stores
│   ├── utils/             # Utility functions
│   └── validators/        # Form validators
├── types/                 # TypeScript types
├── styles/                # Additional styles
│   └── design-tokens.css  # Design system tokens
└── public/                # Static assets
```

## 🏁 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase project (for authentication)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Shanmukha-Vardhan/Avolve.git
cd mindcompass-web
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Fill in your Firebase configuration in `.env.local`

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Design System

The app uses a comprehensive design system with CSS variables for:

- **Colors**: Primary (blue), Secondary (teal), Accent (amber), and semantic colors
- **Typography**: Inter (sans) and Merriweather (serif) fonts
- **Spacing**: Consistent spacing scale (4px base unit)
- **Shadows**: Elevation system for depth
- **Border Radius**: Rounded corners scale
- **Animations**: Smooth transitions and micro-interactions

### Theme Support

- Light and dark mode support
- System preference detection
- Smooth theme transitions

## 📜 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run format   # Format code with Prettier
```

## 🔧 Configuration

### Firebase

1. Create a Firebase project at [firebase.google.com](https://firebase.google.com)
2. Enable Authentication (Email/Password + Google)
3. Create a Firestore database
4. Copy your config to `.env.local`

### FastAPI Backend

The app expects a FastAPI backend running at `http://localhost:8000`. Update `NEXT_PUBLIC_API_URL` in `.env.local` if different.

## 📱 Features (Planned)

- [x] Project foundation
- [ ] User authentication (Email, Google)
- [ ] Mood tracking
- [ ] Journaling with prompts
- [ ] Goal setting & tracking
- [ ] Progress insights & charts
- [ ] Notifications & reminders
- [ ] Data export

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

---

Built with ❤️ for mental wellness
