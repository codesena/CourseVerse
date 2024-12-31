# Course Selling App

Welcome to the Course Selling App project! This application is built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with JWT authentication, Zod for backend validation, and Recoil for state management. The app consists of two separate frontends – one for users and another for administrators.

## Features

- **Authentication:**

  - Users and administrators can register and log in securely using JWT authentication.

- **Admin Dashboard:**

  - The admin dashboard allows administrators to manage courses.
  - Admins can add, edit, and delete courses.
  - Courses can be marked as published or unpublished.

- **User Dashboard:**
  - User dashboard provides functionality related to course purchases.
  - Users can simulate the purchase of courses.
  - A "Purchased Courses" section displays the courses that the user has bought.

## Technology Stack

- **Backend:**

  - Express.js for building the RESTful API.
  - MongoDB for the database.
  - JWT for secure authentication.
  - Zod for backend data validation.
  - TypeScript for enhanced development.

- **Frontend:**
  - React.js for building user interfaces.
  - Recoil for state management.
  - Material-UI for styling.

## Getting Started

### Local Setup

#### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB installed locally and running on port 27017.

#### Installation

1. **Clone this repository:**

2. **Navigate to the project directory:**

   ```bash
   cd Course-Selling-App
   ```

3. **Install dependencies for both the backend and frontend:**

   ```bash
   cd backend
   npm install
   ```

   ```bash
   cd ../frontend/Admin\ dashboard/
   npm install
   ```

   ```bash
   cd ../User\ dashboard
   npm install
   ```

4. **Set up environment variables:**

   - Create `.env` files in the `backend` directory and configure the required variables with the help of .env.example.

5. **Start the backend server:**

   ```bash
   cd backend
   npm run dev
   ```

6. **Start the admin frontend:**

   ```bash
   cd ../frontend/Admin\ dashboard/
   npm run dev
   ```

7. **Start the user frontend:**

   ```bash
   cd ../User\ dashboard
   npm run dev
   ```

8. **Access the application in your browser:**
   - Backend: [http://localhost:3000](http://localhost:3000)
   - Admin Frontend: [http://localhost:5173](http://localhost:5173)
   - User Frontend: [http://localhost:5174](http://localhost:5174)

### Docker Setup

#### Prerequisites

- Docker installed and running on your machine.

#### Installation

1. **Clone this repository:**

2. **Navigate to the project directory:**

   ```bash
   cd Course-Selling-App
   ```

3. **Build and start the services defined in the Docker Compose file:**

   ```bash
   docker-compose up
   ```

4. **Access the application in your browser:**

- Backend: [http://localhost:3000](http://localhost:3000)
- Admin Frontend: [http://localhost:5173](http://localhost:5173)
- User Frontend: [http://localhost:5174](http://localhost:5174)
