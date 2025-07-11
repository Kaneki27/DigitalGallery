# Rejoice - Digital Office Event Gallery Platform

A modern, secure, and joyful platform for sharing and managing office event memories. Built with React, TypeScript, and Tailwind CSS.

## 🎯 Features

### Core Functionality
- **Role-Based Authentication**: Separate interfaces for employees and administrators
- **Event Management**: Create, organize, and categorize office events
- **Media Upload**: Drag-and-drop support for photos and videos
- **Interactive Gallery**: Filter, search, and sort event memories
- **User Interactions**: Like, comment, and share memories
- **Content Moderation**: Admin approval workflow for uploaded content

### User Roles

#### Employee Portal
- Upload and share event media
- Browse and discover event galleries
- Like and comment on photos/videos
- Personal profile with upload statistics
- Join and participate in events

#### Admin Portal
- User management and role assignment
- Content moderation and approval
- Analytics and platform insights
- Event creation and management
- System configuration and settings

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Database**: MongoDB with a comprehensive schema
- **Authentication**: Role-based access control
- **Storage**: Secure file storage integration

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd rejoice
```

2. Install dependencies
```bash
npm install
```

3. Set up the database
```bash
# Import the database schema
mysql -u your_username -p < src/database/schema.sql
```

4. Configure environment variables
```bash
cp .env.example .env
# Edit .env with your database credentials
```

5. Start the development server
```bash
npm run dev
```

## 📱 Demo Accounts

### Admin Account
- Email: `admin@company.com`
- Password: `password123`
- Access: Full admin portal with moderation tools

### Employee Account
- Email: `employee@company.com`
- Password: `password123`
- Access: Employee portal with upload and interaction features

## 🎨 Design Philosophy

**Theme**: "Revisit + Joyful moments together"

The platform features a vibrant, modern design with:
- Gradient backgrounds and animated elements
- Colorful illustrations and micro-interactions
- Intuitive navigation and responsive layouts
- Accessibility-first approach
- Mobile-optimized experience

## 📊 Database Schema

### Core Tables
- **users**: Authentication and user profiles
- **events**: Event organization and metadata
- **media**: Photo/video storage with approval workflow
- **comments**: User interactions and feedback
- **likes**: Social engagement tracking
- **activity_log**: Audit trail and analytics

### Key Features
- Foreign key relationships for data integrity
- Triggers for automatic counter updates
- Indexed columns for optimal query performance
- Role-based access control
- Content approval workflow

## 🔒 Security Features

- **Authentication**: Secure login with password hashing
- **Authorization**: Role-based access control
- **Content Moderation**: Admin approval for all uploads
- **Data Protection**: Secure file storage and database encryption
- **Activity Logging**: Comprehensive audit trail

## 🌟 Key Highlights

1. **Dual Interface Design**: Separate, optimized experiences for employees and administrators
2. **Modern UI/UX**: Joyful, production-ready design with smooth animations
3. **Comprehensive Features**: Complete event gallery management system
4. **Security First**: Enterprise-grade security and content moderation
5. **Scalable Architecture**: Well-structured codebase with modular components

## 📈 Future Enhancements

- Real-time notifications
- Advanced search and filtering
- Mobile app development
- Integration with office tools (Slack, Teams)
- AI-powered content tagging
- Bulk upload capabilities
- Advanced analytics dashboard

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Support

For support, email support@rejoice.com or join our Slack channel.

---

**Rejoice** - Where office memories come alive! 🎉
