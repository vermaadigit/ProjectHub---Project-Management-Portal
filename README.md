<!-- PROJECT HEADER -->
<h1 align="center">
  🚀 Project Management Dashboard
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.x-61dafb?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/SQLite-3.x-003B57?style=for-the-badge&logo=sqlite&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-ff69b4?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</p>

<div align="center">
  <p><em>A modern, full-stack project management solution with beautiful UI and powerful collaboration tools</em></p>
</div>

---

## 📖 Table of Contents

- [✨ About the Project](#-about-the-project)
- [🎯 Features](#-features)
- [🖥️ Tech Stack](#️-tech-stack)
- [📸 Screenshots](#-screenshots)
- [🏗️ Project Structure](#️-project-structure)
- [🔧 Installation](#-installation)
- [⚙️ Environment Variables](#️-environment-variables)
- [▶️ Local Development](#️-local-development)
- [📚 API Documentation](#-api-documentation)
- [🎨 UI Components](#-ui-components)
- [🚀 Deployment](#-deployment)
- [🧪 Testing](#-testing)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)
- [💬 Acknowledgements](#-acknowledgements)

---

## ✨ About the Project

**Project Management Dashboard** is a comprehensive full-stack web application that empowers teams to plan, track, and deliver projects with style and efficiency. Built with modern technologies including **React 18**, **Node.js/Express**, and a robust database architecture, it combines an aesthetically pleasing glassmorphism UI with powerful backend APIs.

The application features secure JWT-based authentication, real-time collaboration tools, comprehensive task management, team coordination capabilities, and an analytics-rich dashboard that provides insights into project progress and team performance.

### 🌟 Why This Project?

- **Modern Architecture**: Built with the latest web technologies and best practices
- **Beautiful Design**: Glassmorphism UI with smooth animations and responsive layouts
- **Full-Stack Solution**: Complete frontend and backend implementation
- **Scalable**: Designed to handle growing teams and complex projects
- **Developer-Friendly**: Clean code structure with comprehensive documentation

---

## 🎯 Features

### 🔐 **Authentication & Security**
- **JWT-based Authentication** with secure token management
- **User Registration & Login** with form validation
- **Profile Management** with editable user information
- **Password Security** with bcrypt hashing
- **Protected Routes** and middleware authorization

### 📋 **Project Management**
- **Create & Manage Projects** with detailed descriptions
- **Project Status Tracking** (Planning, Active, Completed, On Hold)
- **Team Member Management** with role-based permissions
- **Project Dashboard** with overview and statistics
- **Project Archive** and deletion capabilities

### ✅ **Task Management**
- **Comprehensive Task System** with priorities and due dates
- **Task Assignment** to team members
- **Status Tracking** (To Do, In Progress, Completed)
- **Task Comments** for real-time collaboration
- **Task Filtering** and search capabilities
- **Drag & Drop** interface for task organization

### 👥 **Team Collaboration**
- **Team Member Invitations** with email notifications
- **Real-time Comments** on tasks and projects
- **Activity Timeline** showing recent actions
- **User Roles** and permission management
- **Team Statistics** and performance insights

### 📊 **Analytics & Reporting**
- **Project Statistics** with visual charts
- **Progress Tracking** with completion percentages
- **Team Performance** metrics
- **Activity Reports** and timeline views
- **Export Capabilities** for data analysis

### 🎨 **User Experience**
- **Responsive Design** that works on all devices
- **Glassmorphism UI** with modern design principles
- **Smooth Animations** and micro-interactions
- **Dark/Light Theme** support
- **Loading States** and error handling
- **Keyboard Shortcuts** for power users

---

## 🖥️ Tech Stack

### **Frontend Technologies**
| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Framework | 18.x |
| **React Router** | Client-side routing | 6.x |
| **Zustand** | State management | Latest |
| **Axios** | HTTP client | Latest |
| **Lucide React** | Icon library | Latest |
| **React Hot Toast** | Notifications | Latest |

### **Backend Technologies**
| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | Runtime environment | 20.x |
| **Express** | Web framework | 4.x |
| **JWT** | Authentication tokens | Latest |
| **bcrypt** | Password hashing | Latest |
| **CORS** | Cross-origin requests | Latest |
| **Morgan** | HTTP request logger | Latest |

### **Database & ORM**
| Technology | Purpose | Version |
|------------|---------|---------|
| **SQLite** | Development database | 3.x |
| **Sequelize** | ORM (Object-Relational Mapping) | 6.x |
| **MySQL/PostgreSQL** | Production database options | Latest |

### **Development & Deployment**
| Technology | Purpose | Version |
|------------|---------|---------|
| **Vercel** | Deployment platform | Latest |
| **GitHub Actions** | CI/CD pipeline | Latest |
| **ESLint** | Code linting | Latest |
| **Prettier** | Code formatting | Latest |
| **Nodemon** | Development server | Latest |

---

## 📸 Screenshots

<div align="center">

### 🏠 Dashboard Overview
![Dashboard](https://via.placeholder.com/800x400/667eea/ffffff?text=Dashboard+Overview)
*Main dashboard with project statistics, quick actions, and recent activity*

### 📋 Project Management
![Projects](https://via.placeholder.com/800x400/10b981/ffffff?text=Project+Management)
*Project listing with status indicators, team members, and progress tracking*

### ✅ Task Management
![Tasks](https://via.placeholder.com/800x400/f59e0b/ffffff?text=Task+Management)
*Detailed task view with comments, assignments, and status updates*

### 👤 User Profile
![Profile](https://via.placeholder.com/800x400/8b5cf6/ffffff?text=User+Profile)
*User profile management with beautiful form styling and real-time validation*

### 🔐 Authentication
![Auth](https://via.placeholder.com/800x400/ef4444/ffffff?text=Authentication)
*Login and registration forms with modern UI design*

</div>

---

## 🏗️ Project Structure

```
project-management-dashboard/
├── 📁 frontend/ # React frontend application
│ ├── 📁 public/ # Public assets
│ │ ├── index.html # HTML template
│ │ ├── manifest.json # PWA manifest
│ │ └── favicon.ico # App icon
│ ├── 📁 src/ # Source code
│ │ ├── 📁 components/ # Reusable components
│ │ │ ├── 📁 common/ # Common UI components
│ │ │ │ ├── Button.jsx # Custom button component
│ │ │ │ ├── Input.jsx # Custom input component
│ │ │ │ ├── Loader.jsx # Loading spinner
│ │ │ │ ├── Modal.jsx # Modal component
│ │ │ │ └── Navigation.jsx # Navigation bar
│ │ │ ├── 📁 auth/ # Authentication components
│ │ │ │ ├── LoginForm.jsx # Login form
│ │ │ │ ├── SignupForm.jsx # Registration form
│ │ │ │ └── ProtectedRoute.jsx # Route protection
│ │ │ ├── 📁 projects/ # Project-related components
│ │ │ │ ├── ProjectCard.jsx # Project card display
│ │ │ │ ├── ProjectForm.jsx # Project creation/edit form
│ │ │ │ ├── ProjectList.jsx # Projects listing
│ │ │ │ └── ProjectDetail.jsx # Project detail view
│ │ │ └── 📁 tasks/ # Task-related components
│ │ │ ├── TaskCard.jsx # Task card display
│ │ │ ├── TaskForm.jsx # Task creation/edit form
│ │ │ ├── TaskList.jsx # Tasks listing
│ │ │ ├── TaskDetail.jsx # Task detail view
│ │ │ └── CommentSection.jsx # Task comments
│ │ ├── 📁 pages/ # Page components
│ │ │ ├── Dashboard.jsx # Main dashboard
│ │ │ ├── Login.jsx # Login page
│ │ │ ├── Signup.jsx # Registration page
│ │ │ ├── Projects.jsx # Projects page
│ │ │ ├── ProjectDetail.jsx # Individual project page
│ │ │ ├── TaskDetail.jsx # Individual task page
│ │ │ ├── Profile.jsx # User profile page
│ │ │ └── NotFound.jsx # 404 error page
│ │ ├── 📁 services/ # API services
│ │ │ ├── apiClient.js # Axios configuration
│ │ │ ├── authService.js # Authentication API calls
│ │ │ ├── projectService.js # Project API calls
│ │ │ ├── taskService.js # Task API calls
│ │ │ └── userService.js # User API calls
│ │ ├── 📁 store/ # State management
│ │ │ ├── authStore.js # Authentication state
│ │ │ ├── projectStore.js # Project state
│ │ │ └── taskStore.js # Task state
│ │ ├── 📁 utils/ # Utility functions
│ │ │ ├── helpers.js # Helper functions
│ │ │ ├── constants.js # App constants
│ │ │ ├── formatters.js # Data formatters
│ │ │ └── validators.js # Form validators
│ │ ├── 📁 styles/ # CSS files
│ │ │ ├── globals.css # Global styles
│ │ │ ├── components.css # Component styles
│ │ │ └── animations.css # Animation definitions
│ │ ├── App.jsx # Main app component
│ │ ├── index.js # React entry point
│ │ └── index.css # Root styles
│ ├── package.json # Frontend dependencies
│ ├── .env # Environment variables
│ └── README.md # Frontend documentation
├── 📁 backend/ # Node.js backend application
│ ├── 📁 controllers/ # Route controllers
│ │ ├── authController.js # Authentication logic
│ │ ├── projectController.js # Project CRUD operations
│ │ ├── taskController.js # Task CRUD operations
│ │ ├── userController.js # User management
│ │ └── commentController.js # Comment operations
│ ├── 📁 middleware/ # Express middleware
│ │ ├── auth.js # JWT authentication
│ │ ├── validation.js # Input validation
│ │ ├── errorHandler.js # Error handling
│ │ ├── pagination.js # Pagination logic
│ │ └── cors.js # CORS configuration
│ ├── 📁 models/ # Database models
│ │ ├── User.js # User model
│ │ ├── Project.js # Project model
│ │ ├── Task.js # Task model
│ │ ├── Comment.js # Comment model
│ │ └── index.js # Model associations
│ ├── 📁 routes/ # API routes
│ │ ├── auth.js # Authentication routes
│ │ ├── projects.js # Project routes
│ │ ├── tasks.js # Task routes
│ │ ├── users.js # User routes
│ │ └── index.js # Route aggregator
│ ├── 📁 services/ # Business logic
│ │ ├── authService.js # Authentication services
│ │ ├── projectService.js # Project business logic
│ │ ├── taskService.js # Task business logic
│ │ ├── userService.js # User services
│ │ └── emailService.js # Email notifications
│ ├── 📁 config/ # Configuration files
│ │ ├── database.js # Database connection
│ │ ├── jwt.js # JWT configuration
│ │ └── constants.js # App constants
│ ├── 📁 utils/ # Utility functions
│ │ ├── helpers.js # Helper functions
│ │ ├── validators.js # Input validators
│ │ └── formatters.js # Data formatters
│ ├── index.js # Server entry point
│ ├── package.json # Backend dependencies
│ ├── .env # Environment variables
│ ├── vercel.json # Vercel deployment config
│ └── README.md # Backend documentation
├── 📁 docs/ # Documentation
│ ├── 📁 api/ # API documentation
│ ├── 📁 screenshots/ # Application screenshots
│ ├── 📁 guides/ # Setup and usage guides
│ └── DEPLOYMENT.md # Deployment instructions
├── 📁 scripts/ # Build and utility scripts
│ ├── setup.sh # Initial setup script
│ ├── deploy.sh # Deployment script
│ └── database-seed.js # Database seeding
├── .gitignore # Git ignore rules
├── LICENSE # MIT license

```


---

## 🔧 Installation

### **Prerequisites**

Required software
Node.js (v18.0.0 or higher)
npm (v8.0.0 or higher) or yarn (v1.22.0 or higher)
Git (v2.30.0 or higher)

Optional but recommended
VS Code with extensions:

ES7+ React/Redux/React-Native snippets

Prettier - Code formatter

ESLint

Auto Rename Tag


### **Step 1: Clone Repository**

Clone the repository
git clone https://github.com/shagufa-anjum1/Test-Check.git
cd Test-Check

Alternative: Download ZIP
Download from GitHub → Extract → Navigate to folder



### **Step 2: Backend Setup**

Navigate to backend directory
cd backend

Install dependencies
npm install

Alternative with yarn
yarn install

Verify installation
npm list --depth=0


### **Step 3: Frontend Setup**

Navigate to frontend directory (from project root)
cd frontend

Install dependencies
npm install

Alternative with yarn
yarn install

Verify installation
npm list --depth=0


### **Step 4: Database Setup**

Initialize database (from backend directory)
cd backend

Run database migrations (if using migrations)
npm run db:migrate

Seed database with sample data (optional)
npm run db:seed

For SQLite, the database file will be created automatically


---

## ⚙️ Environment Variables

### **Backend Environment (`backend/.env`)**

Server Configuration
PORT=5000
NODE_ENV=development

Database Configuration
DATABASE_URL=sqlite:./database.sqlite

For PostgreSQL: postgresql://username:password@localhost:5432/database_name
For MySQL: mysql://username:password@localhost:3306/database_name
JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
JWT_EXPIRES_IN=7d

CORS Configuration
CORS_ORIGIN=http://localhost:3000
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

Email Configuration (optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

File Upload (optional)
UPLOAD_DIR=uploads
MAX_FILE_SIZE=5242880

API Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100

Logging
LOG_LEVEL=info
LOG_FILE=logs/app.log


### **Frontend Environment (`frontend/.env`)**

API Configuration
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_API_TIMEOUT=10000

App Configuration
REACT_APP_NAME=Project Management Dashboard
REACT_APP_VERSION=1.0.0
REACT_APP_ENVIRONMENT=development

Feature Flags
REACT_APP_ENABLE_ANALYTICS=false
REACT_APP_ENABLE_NOTIFICATIONS=true
REACT_APP_ENABLE_DARK_MODE=true

External Services (optional)
REACT_APP_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
REACT_APP_SENTRY_DSN=your_sentry_dsn_here

File Upload
REACT_APP_MAX_FILE_SIZE=5242880
REACT_APP_ALLOWED_FILE_TYPES=jpg,jpeg,png,gif,pdf,doc,docx

Cache Configuration
REACT_APP_CACHE_DURATION=300000


### **Production Environment Variables**

For deployment, update these values:
Backend (.env.production)
NODE_ENV=production
DATABASE_URL=your_production_database_url
JWT_SECRET=your_production_jwt_secret
CORS_ORIGIN=https://your-frontend-domain.vercel.app

Frontend (.env.production)
REACT_APP_API_URL=https://your-backend-domain.vercel.app/api
REACT_APP_ENVIRONMENT=production



---

## ▶️ Local Development

### **Quick Start (Recommended)**

Option 1: Run both services simultaneously
npm run dev:all

This will start:
- Backend server on http://localhost:5000
- Frontend development server on http://localhost:3000


### **Manual Start (Step by Step)**

Terminal 1 - Start Backend Server
cd backend
npm run dev

Output: 🚀 Server running on http://localhost:5000
Terminal 2 - Start Frontend Development Server
cd frontend
npm start

Output: 📱 Local development server: http://localhost:3000


### **Development Scripts**

#### **Backend Scripts**

Development with hot reload
npm run dev

Production start
npm start

Run tests
npm test

Run tests with coverage
npm run test:coverage

Lint code
npm run lint

Format code
npm run format

Database operations
npm run db:migrate
npm run db:seed
npm run db:reset


#### **Frontend Scripts**

Start development server
npm start

Build for production
npm run build

Run tests
npm test

Run tests with coverage
npm run test:coverage

Lint code
npm run lint

Format code
npm run format

Analyze bundle size
npm run analyze


### **Development Workflow**
1. **Start backend server** in one terminal
2. **Start frontend server** in another terminal
3. **Open browser** to `http://localhost:3000`
4. **Make changes** to code (auto-reload enabled)
5. **Test features** as you develop
6. **Commit changes** with descriptive messages

### **Hot Reload Features**
- **Backend**: Automatic server restart on file changes (via nodemon)
- **Frontend**: Automatic browser refresh on file changes (via React dev server)
- **Database**: Automatic model sync in development mode

---

## 📚 Testing

### **Base URL**

Development: http://localhost:5000/api
Production: https://your-backend-domain.vercel.app/api


### **Authentication Endpoints**

#### **Register User**


POST /api/auth/register
Content-Type: application/json

{
"username": "johndoe",
"email": "john@example.com",
"password": "securePassword123",
"firstName": "John",
"lastName": "Doe"
}

Response: 201 Created
{
"success": true,
"message": "User registered successfully",
"data": {
"id": 1,
"username": "johndoe",
"email": "john@example.com",
"firstName": "John",
"lastName": "Doe",
"createdAt": "2025-08-02T10:30:00.000Z"
},
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}


#### **Login User**

POST /api/auth/login
Content-Type: application/json

{
"email": "john@example.com",
"password": "securePassword123"
}

Response: 200 OK
{
"success": true,
"message": "Login successful",
"data": {
"id": 1,
"username": "johndoe",
"email": "john@example.com",
"firstName": "John",
"lastName": "Doe"
},
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}


#### **Get User Profile**


GET /api/auth/profile
Authorization: Bearer <token>

Response: 200 OK
{
"success": true,
"data": {
"id": 1,
"username": "johndoe",
"email": "john@example.com",
"firstName": "John",
"lastName": "Doe",
"createdAt": "2025-08-02T10:30:00.000Z",
"updatedAt": "2025-08-02T10:30:00.000Z"
}
}


### **Project Endpoints**

#### **Get All Projects**


GET /api/projects?page=1&limit=10&search=webapp&status=active
Authorization: Bearer <token>

Response: 200 OK
{
"success": true,
"data": [
{
"id": 1,
"name": "E-commerce Website",
"description": "Full-stack e-commerce platform",
"status": "active",
"ownerId": 1,
"createdAt": "2025-08-01T09:00:00.000Z",
"owner": {
"id": 1,
"username": "johndoe",
"firstName": "John",
"lastName": "Doe"
},
"tasks": [
{
"id": 1,
"title": "Setup database",
"status": "completed"
}
],
"teamMembers": [
{
"userId": 2,
"username": "janedoe",
"role": "developer"
}
]
}
],
"pagination": {
"page": 1,
"limit": 10,
"totalItems": 25,
"totalPages": 3,
"hasNextPage": true,
"hasPreviousPage": false
}
}


#### **Create Project**


POST /api/projects
Authorization: Bearer <token>
Content-Type: application/json

{
"name": "Mobile App Project",
"description": "React Native mobile application",
"status": "planning"
}

Response: 201 Created
{
"success": true,
"message": "Project created successfully",
"data": {
"id": 2,
"name": "Mobile App Project",
"description": "React Native mobile application",
"status": "planning",
"ownerId": 1,
"createdAt": "2025-08-02T11:00:00.000Z",
"updatedAt": "2025-08-02T11:00:00.000Z"
}
}


#### **Get Project Details**


GET /api/projects/1
Authorization: Bearer <token>

Response: 200 OK
{
"success": true,
"data": {
"id": 1,
"name": "E-commerce Website",
"description": "Full-stack e-commerce platform",
"status": "active",
"ownerId": 1,
"createdAt": "2025-08-01T09:00:00.000Z",
"owner": {
"id": 1,
"username": "johndoe",
"firstName": "John",
"lastName": "Doe"
},
"tasks": [
{
"id": 1,
"title": "Setup database",
"description": "Configure PostgreSQL database",
"status": "completed",
"priority": "high",
"assignedTo": 1,
"createdBy": 1,
"dueDate": "2025-08-05T23:59:59.000Z"
}
],
"teamMembers": [
{
"userId": 2,
"username": "janedoe",
"role": "developer",
"joinedAt": "2025-08-01T10:00:00.000Z"
}
]
}
}


### **Task Endpoints**

#### **Get Project Tasks**


GET /api/projects/1/tasks?status=active&priority=high&assignedTo=2
Authorization: Bearer <token>

Response: 200 OK
{
"success": true,
"data": [
{
"id": 1,
"title": "Implement user authentication",
"description": "Add JWT-based authentication system",
"status": "in-progress",
"priority": "high",
"projectId": 1,
"assignedTo": 2,
"createdBy": 1,
"dueDate": "2025-08-10T23:59:59.000Z",
"createdAt": "2025-08-02T09:00:00.000Z",
"assignee": {
"id": 2,
"username": "janedoe",
"firstName": "Jane",
"lastName": "Doe"
},
"creator": {
"id": 1,
"username": "johndoe",
"firstName": "John",
"lastName": "Doe"
},
"comments": [
{
"id": 1,
"content": "Started working on JWT implementation",
"userId": 2,
"createdAt": "2025-08-02T10:30:00.000Z",
"user": {
"username": "janedoe",
"firstName": "Jane"
}
}
]
}
]
}


#### **Create Task**


POST /api/projects/1/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
"title": "Design user interface",
"description": "Create wireframes and UI mockups",
"priority": "medium",
"assignedTo": 2,
"dueDate": "2025-08-15T23:59:59.000Z"
}

Response: 201 Created
{
"success": true,
"message": "Task created successfully",
"data": {
"id": 2,
"title": "Design user interface",
"description": "Create wireframes and UI mockups",
"status": "todo",
"priority": "medium",
"projectId": 1,
"assignedTo": 2,
"createdBy": 1,
"dueDate": "2025-08-15T23:59:59.000Z",
"createdAt": "2025-08-02T11:30:00.000Z",
"updatedAt": "2025-08-02T11:30:00.000Z"
}
}


### **Error Responses**

#### **Validation Error**

Response: 400 Bad Request
{
"success": false,
"message": "Validation failed",
"errors": [
{
"field": "email",
"message": "Email is required"
},
{
"field": "password",
"message": "Password must be at least 6 characters"
}
]
}


#### **Authentication Error**

Response: 401 Unauthorized
{
"success": false,
"message": "Invalid token or token expired"
}


#### **Permission Error**

Response: 403 Forbidden
{
"success": false,
"message": "Access denied: You don't have permission to perform this action"
}




#### **Not Found Error**

Response: 404 Not Found
{
"success": false,
"message": "Project not found"
}



### **Status Codes Reference**
- `200` - OK (Successful GET, PUT requests)
- `201` - Created (Successful POST requests)
- `400` - Bad Request (Validation errors)
- `401` - Unauthorized (Authentication required)
- `403` - Forbidden (Permission denied)
- `404` - Not Found (Resource not found)
- `500` - Internal Server Error (Server errors)

---

## 🎨 UI Components

### **Design System**

Our application follows a consistent design system with these key principles:

#### **Color Palette**

/* Primary Colors */
--primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--success-gradient: linear-gradient(135deg, #10b981 0%, #059669 100%);
--warning-gradient: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
--danger-gradient: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);

/* Neutral Colors */
--white: #ffffff;
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-900: #111827;

/* Background */
--bg-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--bg-glass: rgba(255, 255, 255, 0.95);


#### **Typography**

/* Font Weights */
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;

/* Font Sizes */
--text-xs: 0.75rem;
--text-sm: 0.875rem;
--text-base: 1rem;
--text-lg: 1.125rem;
--text-xl: 1.25rem;
--text-2xl: 1.5rem;
--text-3xl: 1.875rem;


### **Component Library**

#### **Button Component**


// Usage examples
<Button variant="primary" size="lg">
Create Project
</Button>

<Button variant="secondary" size="md" loading={true}> Save Changes </Button> <Button variant="danger" size="sm" disabled> Delete </Button> ```
Variants:

primary - Main action button with gradient background

secondary - Secondary action with outline style

success - Success action (green gradient)

warning - Warning action (orange gradient)

danger - Destructive action (red gradient)

Input Component

// Usage examples
<Input
  label="Project Name"
  name="name"
  type="text"
  placeholder="Enter project name"
  required
  icon={FolderIcon}
/>

<Input
  label="Email Address"
  name="email"
  type="email"
  error="Email is required"
  floating
/>

