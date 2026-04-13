# Task Manager Frontend

A modern, responsive task management application built with React and Tailwind CSS.

## Features

- **User Authentication**: Login and registration with session management
- **Task Management**: Create, read, update, and delete tasks
- **Task Status**: Mark tasks as complete/incomplete
- **Smart Filtering**: Filter tasks by status (all, active, completed)
- **Visual Indicators**: Color-coded badges for task status (completed, overdue, due soon)
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Interactive Modals**: Clean modal interface for adding and editing tasks
- **Statistics Dashboard**: Real-time task statistics and overview

## Tech Stack

- **React 18**: Modern React with hooks
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API communication
- **React Router**: Client-side routing (if needed for expansion)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The application will open in your default browser at `http://localhost:3000`.

### Environment Variables

Create a `.env` file in the root directory:

```
REACT_APP_API_URL=http://localhost:8000
```

## Project Structure

```
src/
  components/
    Auth/
      Login.jsx
      Register.jsx
    Tasks/
      TaskCard.jsx
      TaskList.jsx
      TaskModal.jsx
  pages/
    Dashboard.jsx
  services/
    api.js
  App.jsx
  index.js
  index.css
```

## Features Overview

### Authentication
- User registration with email validation
- Secure login with session management
- Automatic authentication status checking

### Task Management
- **Create Tasks**: Add new tasks with title, description, and due date
- **Edit Tasks**: Update existing task details
- **Delete Tasks**: Remove tasks with confirmation
- **Complete Tasks**: Toggle task completion status
- **Visual Status**: Color-coded badges indicate task status

### User Interface
- **Responsive Design**: Adapts to all screen sizes
- **Modern UI**: Clean, professional interface with Tailwind CSS
- **Interactive Elements**: Hover effects, transitions, and micro-interactions
- **Accessibility**: Semantic HTML and keyboard navigation support

## API Integration

The frontend communicates with the backend API using:

- **Authentication Endpoints**: `/auth/*`
- **Task Endpoints**: `/notes/*`
- **Session Management**: Cookie-based authentication

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` directory.
