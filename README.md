# DigitalGallery

A modern digital gallery web application for sharing, managing, and moderating media content. Built with a Node.js/Express backend and a React/TypeScript frontend.

## Features
- User authentication and registration
- Media upload and gallery management
- Event and comment system
- Admin dashboard for analytics, moderation, and user management
- Responsive and modern UI

## 🚀 Deployment Ready

This project is configured and ready for deployment on **Vercel**! 

### Vercel Deployment Steps:

1. **Connect your GitHub repository** to Vercel
2. **Set environment variables** in Vercel dashboard:
   ```
   VITE_API_URL=https://your-backend-url.com
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```
3. **Deploy** - Vercel will automatically build and deploy your frontend

### Backend Deployment

The backend (`/server` directory) should be deployed separately on platforms like:
- **Railway**
- **Render**
- **Heroku**
- **DigitalOcean App Platform**

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Kaneki27/DigitalGallery.git
   cd DigitalGallery
   ```
2. Install dependencies for both the root and server:
   ```bash
   npm install
   cd server && npm install
   ```
3. Set up environment variables (see `env.example`)

### Running the App

#### Backend (Express server)
```bash
cd server
npm start
```

#### Frontend (Vite + React)
```bash
npm run dev
```

The backend will typically run on `http://localhost:3000` and the frontend on `http://localhost:5173` by default.

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: Firebase Auth
- **File Storage**: Firebase Storage
- **Deployment**: Vercel (Frontend), Railway/Render (Backend)

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)
