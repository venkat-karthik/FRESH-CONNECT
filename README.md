# FRESH-CONNECT

# 🌱 FreshServe Connect

**A Unified Farm-to-Fork Ecosystem with Smart Cafeteria Virtual Queuing**

FreshServe Connect is a comprehensive Next.js application that bridges the gap between farmers, restaurants, and customers through an integrated platform featuring smart queue management, real-time analytics, and seamless farm-to-table operations.

## ✨ Features

### 🏢 Multi-Role Dashboard System
- **Admin Dashboard**: Complete oversight with analytics, user management, and system controls
- **Farmer Portal**: Inventory management, order tracking, and harvest scheduling
- **Restaurant Interface**: Menu management, order processing, and supplier coordination
- **Customer Experience**: Order placement, queue tracking, and delivery updates

### 🎯 Smart Queue Management
- Real-time virtual queuing system
- Intelligent wait time predictions
- Push notifications for queue updates
- Mobile-optimized queue interface

### 📊 Advanced Analytics
- Interactive charts and data visualization using Recharts
- Real-time order tracking and metrics
- Revenue analytics and reporting
- Performance insights across all modules

### 🔐 Robust Authentication
- Role-based access control (RBAC)
- Protected routes with middleware
- Secure user sessions
- Multi-role user management

### 🎨 Modern UI/UX
- Built with Radix UI components
- Tailwind CSS for responsive design
- Dark/Light theme support
- Mobile-first responsive design
- Smooth animations with Framer Motion

## 🚀 Tech Stack

### Frontend
- **Next.js 15.2.4** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives

### UI Components & Libraries
- **Lucide React** - Beautiful icons
- **Recharts** - Data visualization
- **Framer Motion** - Smooth animations
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Sonner** - Toast notifications

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 📁 Project Structure

```
freshserve-connect/
├── app/                          # Next.js App Router
│   ├── (authenticated)/          # Protected routes group
│   │   ├── customer/             # Customer portal
│   │   ├── dashboard/            # Admin dashboard
│   │   ├── farmer/               # Farmer management
│   │   ├── queue/                # Queue management
│   │   ├── restaurant/           # Restaurant interface
│   │   ├── notifications/        # Notification center
│   │   ├── profile/              # User profiles
│   │   └── settings/             # App settings
│   ├── login/                    # Authentication
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
├── components/                   # Reusable components
│   ├── auth/                     # Authentication components
│   ├── customer/                 # Customer-specific components
│   ├── dashboard/                # Dashboard widgets
│   ├── farmer/                   # Farmer portal components
│   ├── queue/                    # Queue management UI
│   ├── restaurant/               # Restaurant components
│   ├── settings/                 # Settings components
│   └── ui/                       # Base UI components
├── contexts/                     # React contexts
│   ├── auth-context.tsx          # Authentication state
│   └── theme-context.tsx         # Theme management
├── hooks/                        # Custom React hooks
├── lib/                          # Utility functions
└── public/                       # Static assets
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### 1. Clone the Repository
```bash
git clone <repository-url>
cd freshserve-connect
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:
```env
# Add your environment variables here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🏗️ Architecture

### Route Groups
The application uses Next.js route groups to organize authenticated and public routes:
- `(authenticated)` - Protected routes requiring authentication
- Public routes - Login and landing pages

### Authentication Flow
1. Users access public routes without authentication
2. Protected routes redirect to `/login` if unauthenticated
3. Role-based access control determines available features
4. Middleware handles route protection automatically

### State Management
- **Auth Context** - Global authentication state
- **Theme Context** - Dark/light mode preferences
- **React Hook Form** - Form state management
- **Local State** - Component-specific state with hooks

## 🎨 Theming

The application supports both light and dark themes:
- Automatic system theme detection
- Manual theme switching
- Persistent theme preferences
- Tailwind CSS custom color schemes

## 📱 Responsive Design

Built mobile-first with breakpoints:
- `sm`: 640px and up
- `md`: 768px and up  
- `lg`: 1024px and up
- `xl`: 1280px and up

## 🔒 Security Features

- Protected routes with authentication middleware
- Role-based access control (RBAC)
- Input validation with Zod schemas
- XSS protection through React's built-in sanitization
- CSRF protection via Next.js

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub/GitLab/Bitbucket
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy automatically
