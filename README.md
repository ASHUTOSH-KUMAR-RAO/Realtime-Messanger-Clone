# Real-Time Messenger - Live Chat Application

A modern, real-time messaging application with authentication, file sharing, and live chat capabilities. Built with Next.js 15, Prisma, Pusher, and NextAuth.

## 🚀 Tech Stack

- **Frontend:** Next.js 15 with React 19
- **Database:** Prisma ORM (PostgreSQL/MySQL compatible)
- **Authentication:** NextAuth.js with Prisma adapter
- **Real-time:** Pusher for live messaging
- **Styling:** Tailwind CSS 4 with Headless UI
- **File Upload:** Cloudinary integration
- **State Management:** Zustand
- **Forms:** React Hook Form
- **Security:** bcrypt for password hashing
- **Notifications:** React Hot Toast

## ✨ Features

- **Real-time Messaging** - Instant message delivery with Pusher
- **User Authentication** - Secure login/signup with NextAuth
- **File Sharing** - Image and document upload via Cloudinary
- **Group Chats** - Create and manage group conversations
- **Online Status** - See who's online in real-time
- **Message History** - Persistent chat history with database
- **Responsive Design** - Works perfectly on mobile and desktop
- **Modern UI** - Beautiful interface with smooth animations
- **Profile Management** - User profiles with avatar support
- **Message Reactions** - React to messages with emojis

## 🛠️ Installation

### Prerequisites
- Node.js 18+
- Database (PostgreSQL, MySQL, or SQLite)
- Pusher account for real-time features
- Cloudinary account for file uploads
- NextAuth compatible OAuth providers (optional)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/ASHUTOSH-KUMAR-RAO/real-time-messanger.git
   cd real-time-messanger
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/messenger"
   
   # NextAuth
   NEXTAUTH_SECRET=your-nextauth-secret
   NEXTAUTH_URL=http://localhost:3000
   
   # Pusher Configuration
   PUSHER_APP_ID=your-pusher-app-id
   PUSHER_KEY=your-pusher-key
   PUSHER_SECRET=your-pusher-secret
   PUSHER_CLUSTER=your-pusher-cluster
   
   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   
   # OAuth Providers (optional)
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma db push
   
   # (Optional) Seed database
   npx prisma db seed
   ```

## 🚀 Running the Application

### Development Mode
```bash
# Start development server
npm run dev

# Application will be available at http://localhost:3000
```

### Production Mode
```bash
# Build the application
npm run build

# Start production server
npm run start
```

### Type Checking
```bash
# Run TypeScript type checking
npm run typecheck
```

## 💬 Pusher Real-time Setup

### Create Pusher App
1. Sign up at [Pusher.com](https://pusher.com)
2. Create a new app
3. Get your app credentials
4. Add to environment variables

### Pusher Features Used
- **Private Channels** - Secure user-to-user messaging
- **Presence Channels** - Online status tracking
- **Event Broadcasting** - Message delivery
- **Connection Management** - User connection handling

## ☁️ Cloudinary Setup

### File Upload Configuration
1. Create account at [Cloudinary](https://cloudinary.com)
2. Get cloud name and API credentials
3. Configure upload presets
4. Add credentials to environment variables

### Supported File Types
- **Images** - JPG, PNG, GIF, WebP
- **Documents** - PDF, DOC, DOCX
- **Media** - Audio and video files (configurable)

## 🗄️ Database Schema

### Core Models
- **User** - User accounts and profiles
- **Conversation** - Chat conversations (1-on-1 and groups)
- **Message** - Individual messages
- **ConversationMember** - User participation in conversations

### Prisma Commands
```bash
# Generate Prisma client after schema changes
npx prisma generate

# Push schema changes to database
npx prisma db push

# Open Prisma Studio (database GUI)
npx prisma studio

# Reset database (development only)
npx prisma migrate reset
```

## 📁 Project Structure

```
real-time-messanger/
├── app/
│   ├── api/             # API routes (NextAuth, webhooks)
│   ├── components/      # Reusable React components
│   ├── conversations/   # Chat interface pages
│   ├── users/          # User management pages
│   ├── auth/           # Authentication pages
│   └── layout.tsx      # Root layout component
├── lib/
│   ├── prisma.ts       # Prisma client configuration
│   ├── pusher.ts       # Pusher client/server setup
│   ├── auth.ts         # NextAuth configuration
│   └── utils.ts        # Utility functions
├── prisma/
│   ├── schema.prisma   # Database schema
│   └── migrations/     # Database migrations
├── public/             # Static assets
├── types/              # TypeScript type definitions
└── middleware.ts       # Next.js middleware
```

## 🛠️ Available Scripts

| Script | Description |
|--------|-------------|
| `dev` | Start Next.js development server |
| `build` | Build production application |
| `start` | Start production server |
| `lint` | Run ESLint for code quality |
| `postinstall` | Automatically generate Prisma client |

## 🔐 Authentication

### NextAuth Configuration
- **Multiple Providers** - Google, GitHub, credentials
- **Database Sessions** - Persistent user sessions
- **Protected Routes** - Authenticated-only pages
- **Profile Management** - User profile updates

### Security Features
- **Password Hashing** - bcrypt for secure passwords
- **CSRF Protection** - NextAuth built-in security
- **Session Management** - Secure session handling
- **Input Validation** - Form validation with React Hook Form

## 🎨 UI Features

### Modern Interface
- **Tailwind CSS 4** - Modern utility-first styling
- **Headless UI** - Accessible component primitives
- **Framer Motion** - Smooth animations and transitions
- **React Icons** - Comprehensive icon library
- **Responsive Design** - Mobile-first approach

### Interactive Elements
- **React Select** - Enhanced dropdown menus
- **React Spinners** - Loading indicators
- **Hot Toast** - Non-intrusive notifications
- **Smooth Animations** - Page transitions and micro-interactions

## 🚀 Deployment

### Recommended Platforms
- **Vercel** (Next.js optimized)
- **Railway**
- **Render**
- **DigitalOcean App Platform**

### Database Hosting
- **Neon** (PostgreSQL)
- **PlanetScale** (MySQL)
- **Supabase** (PostgreSQL)
- **Railway** (PostgreSQL/MySQL)

### Environment Setup for Production
```bash
# Set all environment variables
# Configure Pusher for production
# Set up Cloudinary for file uploads
# Configure database connection
```

## 🔧 Development Tools

- **TypeScript** - Full type safety
- **ESLint** - Code quality and formatting
- **Prisma Studio** - Visual database management
- **React DevTools** - Component debugging
- **Next.js DevTools** - Performance monitoring

## 📱 Features Overview

### Core Messaging
- Send and receive messages instantly
- Create group conversations
- File and image sharing
- Message timestamps and status
- User online/offline indicators

### Advanced Features
- Message search functionality
- Conversation management
- User blocking/unblocking
- Message encryption (optional)
- Push notifications (configurable)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/new-chat-feature`)
3. Commit your changes (`git commit -m 'Add new chat feature'`)
4. Push to the branch (`git push origin feature/new-chat-feature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary.

## 👤 Author

**Ashutosh Kumar Rao**
- GitHub: [@ASHUTOSH-KUMAR-RAO](https://github.com/ASHUTOSH-KUMAR-RAO)

## 🙏 Acknowledgments

- **Pusher** - For real-time messaging infrastructure
- **Prisma** - For excellent database toolkit
- **NextAuth** - For authentication solutions
- **Cloudinary** - For media management

---

*Connect instantly, chat securely, share seamlessly* 💬✨
