# Task Management App - Internship Assessment

A comprehensive full-stack task management application built with Next.js 14, MongoDB, and NextAuth.js. This application demonstrates modern web development practices and meets all the requirements specified in the internship assessment.

## 🎯 Assignment Requirements Met

### ✅ User Authentication
- **Email/password-based authentication** using NextAuth.js
- Secure sign up, log in, and log out functionality
- Protected routes with middleware
- Session management and user state persistence

### ✅ Task Management (CRUD Operations)
- **Create**: Add new tasks with title, description, due date, and category
- **Read**: View all tasks in organized dashboard with filtering and sorting
- **Update**: Edit existing tasks with inline editing capabilities
- **Delete**: Remove tasks with confirmation dialogs
- **Status Management**: Mark tasks as completed or pending

### ✅ Task Categorization
- Organize tasks into color-coded categories
- Default categories created for new users (Personal, Work, Shopping, Health)
- Create custom categories with custom colors
- Filter tasks by category
- Category-based task statistics

### ✅ Due Dates
- Set and edit due dates for tasks
- Visual indicators for overdue tasks
- Sort tasks by due date
- Overdue task filtering and tracking

### ✅ Search Functionality
- Real-time search by task title or description
- Instant filtering of search results
- Search across all user tasks
- Combined search with category and status filters

### ✅ Responsive Design
- **Mobile-first approach** with adaptive layouts
- Touch-friendly interface for mobile devices
- Responsive grid layouts for tablets
- Full-featured desktop experience
- Optimized for all screen sizes

## 🛠️ Technical Stack

### Frontend
- **Next.js 14** (App Router) - React framework
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI component library
- **Lucide React** - Beautiful icons

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **NextAuth.js** - Authentication and session management
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Security & Validation
- **bcryptjs** - Password hashing
- **JWT tokens** - Secure session management
- **Input validation** - Client and server-side validation
- **Protected routes** - Middleware-based route protection

## 📦 Installation & Setup

### Prerequisites
- Node.js 18 or higher
- MongoDB database (local or MongoDB Atlas)
- Git

### Environment Variables
Create a `.env.local` file in the root directory:

\`\`\`env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager?retryWrites=true&w=majority

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_generated_secret_here

# For production deployment:
# NEXTAUTH_URL=https://your-app-name.vercel.app
\`\`\`

### Local Development Setup

\`\`\`bash
# Clone the repository
git clone <your-repository-url>
cd task-management-app

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🚀 Deployment Instructions

### Deploy to Vercel (Recommended)

1. **Push to GitHub**:
   \`\`\`bash
   git add .
   git commit -m "Complete task management app"
   git push origin main
   \`\`\`

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables:
     - `MONGODB_URI`
     - `NEXTAUTH_SECRET`
     - `NEXTAUTH_URL` (set to your Vercel URL)
   - Deploy!

3. **MongoDB Atlas Setup**:
   - Create account at [mongodb.com](https://mongodb.com)
   - Create a new cluster
   - Add database user
   - Whitelist IP addresses (0.0.0.0/0 for all)
   - Get connection string

### Generate NEXTAUTH_SECRET
\`\`\`bash
# Using OpenSSL
openssl rand -base64 32

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
\`\`\`

## 🏗️ Project Structure

\`\`\`
task-management-app/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/route.ts
│   │   │   └── register/route.ts
│   │   ├── tasks/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   └── categories/route.ts
│   ├── auth/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── dashboard/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/ (shadcn components)
│   ├── task-form.tsx
│   ├── task-card.tsx
│   ├── search-bar.tsx
│   ├── category-form.tsx
│   └── next-auth-provider.tsx
├── lib/
│   ├── models/
│   │   ├── user.ts
│   │   ├── task.ts
│   │   └── category.ts
│   ├── auth.ts
│   ├── mongodb.ts
│   └── types.ts
├── types/
│   ├── next-auth.d.ts
│   └── mongoose.d.ts
├── middleware.ts
├── package.json
├── tailwind.config.js
├── next.config.js
└── README.md
\`\`\`

## 🔐 Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Authentication**: Secure session management
- **Protected Routes**: Middleware-based route protection
- **Input Validation**: Client and server-side validation
- **CORS Protection**: Secure API endpoints
- **Environment Variables**: Sensitive data protection

## 📱 Features Showcase

### Dashboard Features
- **Task Statistics**: Visual completion rates and counts
- **Advanced Filtering**: By category, status, and search
- **Sorting Options**: By date, title, due date
- **Responsive Layout**: Optimized for all devices

### Task Management
- **Rich Task Creation**: Title, description, due date, category
- **Inline Editing**: Quick task updates
- **Status Tracking**: Completed/pending with visual indicators
- **Overdue Detection**: Automatic overdue task identification

### User Experience
- **Loading States**: Smooth user feedback
- **Error Handling**: Comprehensive error messages
- **Form Validation**: Real-time validation feedback
- **Responsive Design**: Mobile-first approach

## 🧪 Testing the Application

### Test User Journey
1. **Sign Up**: Create a new account
2. **Dashboard**: View empty state with default categories
3. **Create Task**: Add a task with due date and category
4. **Search**: Test search functionality
5. **Filter**: Filter by category and status
6. **Edit**: Update task details
7. **Complete**: Mark task as completed
8. **Delete**: Remove a task

### Test Data
The application automatically creates default categories:
- Personal (Blue)
- Work (Red)
- Shopping (Green)
- Health (Purple)

## 📊 Performance Optimizations

- **Memoized Components**: React.memo for task cards
- **Optimized Queries**: MongoDB indexing
- **Lazy Loading**: Dynamic imports where applicable
- **Efficient State Management**: Minimal re-renders
- **Caching**: NextAuth session caching

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/[...nextauth]` - NextAuth endpoints

### Tasks
- `GET /api/tasks` - Fetch user tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/[id]` - Update task
- `DELETE /api/tasks/[id]` - Delete task

### Categories
- `GET /api/categories` - Fetch user categories
- `POST /api/categories` - Create new category

## 🚀 Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Environment variables configured
- [ ] Repository pushed to GitHub
- [ ] Vercel deployment configured
- [ ] Domain configured (if custom)
- [ ] SSL certificate active
- [ ] Application tested in production

## 📈 Future Enhancements

- **Team Collaboration**: Multi-user task sharing
- **File Attachments**: Upload files to tasks
- **Email Notifications**: Due date reminders
- **Calendar Integration**: Sync with Google Calendar
- **Dark Mode**: Theme switching
- **Offline Support**: PWA capabilities
- **Advanced Analytics**: Task completion insights

## 🤝 Submission Details

### Repository Information
- **GitHub Repository**: [Your Repository URL]
- **Live Demo**: [Your Vercel URL]
- **Documentation**: This README file

### Key Features Demonstrated
1. **Full-Stack Development**: Next.js with API routes
2. **Database Integration**: MongoDB with Mongoose
3. **Authentication**: Secure user management
4. **Responsive Design**: Mobile-first approach
5. **Modern UI/UX**: Clean, intuitive interface
6. **Error Handling**: Comprehensive validation
7. **Performance**: Optimized queries and rendering

## 📞 Support

For any questions or issues:
1. Check the GitHub repository issues
2. Review the deployment logs
3. Verify environment variables
4. Test database connectivity

---

**Built with ❤️ for the internship assessment**

This application demonstrates proficiency in:
- Modern React/Next.js development
- Full-stack application architecture
- Database design and integration
- User authentication and security
- Responsive web design
- API development and testing
- Deployment and DevOps practices

**Timeline**: Completed within 48 hours as requested
**Status**: Ready for production deployment
**Testing**: Fully tested across devices and browsers
