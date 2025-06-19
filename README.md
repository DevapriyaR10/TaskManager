# TaskManager


A responsive, full-stack task management application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js).  
Users can register, log in, manage tasks, track progress, and enjoy a modern UI with light/dark themes and a 3D animated landing page using **Spline**.

---

## Features

-  User Authentication (JWT)
-  Task Creation, Editing, and Deletion
-  Toggle Task Completion
-  Task Statistics (Total, Completed, Remaining)
-  Light/Dark Theme Toggle
-  Fully Responsive Design
-  Animated 3D Background via Spline

---

## Technologies Used

### 🔹 Frontend
- React.js
- React Router DOM
- Axios
- Context API (Auth & Theme)
- Spline 3D iframe
- Custom CSS

### 🔹 Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Token (JWT)
- bcryptjs
- dotenv
- CORS

---

## Dependencies

### Frontend (`frontend/package.json`)
- `react`
- `react-dom`
- `react-router-dom`
- `axios`

### Backend (`backend/package.json`)
- `express`
- `mongoose`
- `bcryptjs`
- `jsonwebtoken`
- `cors`
- `dotenv`
- `nodemon` (dev)

---

## Setup Instructions

### Clone the Repository

bash
git clone https://github.com/your-username/task-manager-app.git
cd task-manager-app

mkdir backend 
cd backend
npm init -y
npm install express mongoose dotenv bcryptjs jsonwebtoken cors
npm install --save-dev nodemon

mkdir frontend
cd frotend
npm install axios react-router-dom

create your env file 

![Landing page](https://github.com/user-attachments/assets/ec9b3de2-2a9d-462c-a75b-2a19ed46e8f6)
![Login Page](https://github.com/user-attachments/assets/2a3fd99e-9a92-4208-8913-6487e86ab932)
![Register Page](https://github.com/user-attachments/assets/a8766660-07bf-4644-a7bd-d700439cf1ef)
![Dashboad (Dark Theme)](https://github.com/user-attachments/assets/9eac140c-7829-4830-a358-04594238723c)
![Dashboard (Light Theme)](https://github.com/user-attachments/assets/73e3ac2c-90b7-41a1-af86-04fbfceb3b09)


