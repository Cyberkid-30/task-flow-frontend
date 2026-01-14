# Task-Flow Frontend

A modern, feature-rich task management application built with React and Vite. Task-Flow provides an intuitive interface for managing your daily tasks with a beautiful, theme-aware design that adapts to your system preferences.

![Task-Flow](https://img.shields.io/badge/React-18.3-61dafb?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-6.0-646cff?style=flat&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8?style=flat&logo=tailwind-css)

## ✨ Features

### 🎨 Modern UI/UX
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Dark Mode Support** - Automatic theme detection based on system preferences
- **Custom Theme System** - Carefully crafted color palette with semantic colors
- **Smooth Animations** - Polished transitions and micro-interactions
- **Glassmorphic Effects** - Modern backdrop blur and gradient designs

### 📋 Task Management
- **Create Tasks** - Add new tasks with title, description, status, and due dates
- **Edit Tasks** - Update task details with an intuitive form interface
- **View Tasks** - Detailed task view with metadata and status indicators
- **Task List** - Clean, organized list with search and filter capabilities
- **Status Tracking** - Track tasks as Todo, In Progress, Cancelled, or Done

### 🔐 Authentication
- **User Registration** - Secure account creation with validation
- **User Login** - Fast and secure authentication
- **Protected Routes** - Automatic redirection for authenticated users
- **Account Management** - View and manage user profile information

### 🎯 Additional Features
- **Loading States** - Beautiful skeleton screens and loading modals
- **Toast Notifications** - Non-intrusive feedback for user actions
- **Form Validation** - Client-side validation using Zod schemas
- **State Management** - Efficient state handling with Zustand
- **Persistent Storage** - Theme and auth preferences saved locally

## 🚀 Tech Stack

- **React 18.3** - UI library with hooks and modern features
- **Vite 6.0** - Lightning-fast build tool and dev server
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **React Router 7.1** - Client-side routing
- **Zustand** - Lightweight state management
- **React Hook Form** - Performant form handling
- **Zod** - TypeScript-first schema validation
- **Lucide React** - Beautiful icon library
- **Axios** - HTTP client for API requests

## 📁 Project Structure

```
src/
├── components/
│   ├── common/          # Shared components
│   │   └── ProtectedRoute.jsx
│   └── ui/              # UI components
│       ├── Button.jsx
│       ├── Input.jsx
│       ├── LoadingModal.jsx
│       ├── Navbar.jsx
│       ├── Spinner.jsx
│       ├── TaskSkeleton.jsx
│       ├── Textbox.jsx
│       └── ThemeSwitch.jsx
├── hooks/
│   └── useAuth.js       # Custom authentication hook
├── layouts/
│   ├── AppLayout.jsx    # Main application layout
│   └── AuthLayout.jsx   # Authentication pages layout
├── pages/
│   ├── auth/
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── tasks/
│   │   ├── TaskCreate.jsx
│   │   ├── TaskDetail.jsx
│   │   ├── TaskEdit.jsx
│   │   ├── TaskForm.jsx
│   │   └── TaskList.jsx
│   ├── Account.jsx
│   └── NotFound.jsx
├── router/
│   └── index.jsx        # Application routes
├── services/
│   ├── api.js           # Axios instance configuration
│   ├── authService.js   # Authentication API calls
│   └── taskService.js   # Task API calls
├── stores/
│   ├── authStore.js     # Authentication state
│   ├── taskStore.js     # Task management state
│   └── uiStore.js       # UI state (theme, modals, toasts)
├── utils/
│   ├── constants.js     # Application constants
│   ├── storage.js       # Local storage utilities
│   └── utils.js         # Helper functions
├── App.jsx
├── main.jsx
└── index.css            # Global styles and theme variables
```

## 🎨 Theme System

Task-Flow features a comprehensive theme system with:

- **Light Mode** - Clean, bright interface for daytime use
- **Dark Mode** - Easy-on-the-eyes design for low-light environments
- **Semantic Colors** - Success, warning, error, and info states
- **Accent Colors** - Blue, purple, pink, and teal for visual interest
- **Automatic Detection** - Respects system theme preferences by default
- **Persistent Preference** - Remembers your theme choice

## 🛠️ Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn/pnpm
- Backend API server running (task-flow backend)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd task-flow-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Configure environment variables:
```bash
# Create a .env file in the root directory
# Add your API base URL
VITE_API_BASE_URL=http://localhost:8000
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open your browser and navigate to `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

The optimized production build will be generated in the `dist` directory.

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## 🌐 API Integration

Task-Flow connects to a FastAPI backend for data management. Ensure the backend server is running and configured correctly.

### API Endpoints Used:
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user
- `GET /api/tasks` - Fetch all tasks
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get task details
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## 🎯 Key Features Explained

### Protected Routes
The application uses protected routes to ensure only authenticated users can access the task management features. Unauthenticated users are automatically redirected to the login page.

### State Management
Zustand provides lightweight and efficient state management for:
- **authStore** - User authentication state and tokens
- **taskStore** - Task data and CRUD operations
- **uiStore** - UI state including theme, modals, and toasts

### Form Handling
React Hook Form combined with Zod provides:
- Type-safe form validation
- Real-time error feedback
- Optimized re-renders
- Easy integration with UI components

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ using React and Vite

---

**Note:** This is the frontend application. Make sure to set up and run the [task-flow backend](../task-flow) for full functionality.
