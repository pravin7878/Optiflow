# 📝 Task Management App

A full-stack web application to manage your daily tasks efficiently.  
Built with modern technologies on both the frontend and backend.

---

## 🚀 Features

- ✅ User Authentication (Register/Login/Logout) (with private routing)
- ✅ Create, Read, Update, and Delete (CRUD) tasks
- ✅ Mark tasks as **Completed** or **Pending**
- ✅ Add **tags** to tasks (comma-separated, filterable)
- ✅ Add **notes** to tasks (view/add notes in a modal)
- ✅ Mention other users in tasks (e.g., @username)
- ✅ Filter tasks based on status
- ✅ Responsive design for all devices
- ✅ Secure APIs with proper validation
- ✅ Real-time updates 

---

## 🛠️ Tech Stack

**Frontend**:
- React.js
- Redux (for state management)
- Chakra UI (for UI components)
- Axios (for API calls)

**Backend**:
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT Authentication
- bcrypt.js (for password hashing)

**Other Tools**:
- Postman (for API testing)
- Git & GitHub (Version Control)

---

## 📦 Setup and Installation

### 1. Clone the repository

```bash
git clone https://github.com/pravin7878/DailyRounds-assignment-Todo_App.git
```

### 2. Setup the Backend
```
cd Backend
npm install
npm start
```
Backend will run on http://localhost:8080

### 3. Setup the Frontend
``` 
cd Frontend
npm install
npm run dev
```
Frontend will run on http://localhost:5173

### 🔒 Environment Variables
- **For Frontend**
Create a .env file in the Frontend directory and add:
```
VITE_BACKEND_URI=http://localhost:8080
```

- **For Backend**
Create a .env file in the Backend directory and add:
```
PORT=8080
MONGO_URI=<your_mongodb_connection_string>/task_manager
JWT_SECRET_KEY=todo1234
```


## 📚 API Endpoints Overview

| Method | Endpoint                  | Description                        |
|:------:|:--------------------------|:-----------------------------------|
| POST   | `/user/register`          | Register a new user                |
| POST   | `/user/login`             | Login user                         |
| GET    | `/tasks`                  | Get all tasks                      |
| POST   | `/tasks`                  | Create a new task                  |
| PATCH  | `/tasks/:id`              | Update an existing task            |
| DELETE | `/tasks/:id`              | Delete a task                      |
| POST   | `/tasks/:id/notes`        | Add a note to a task               |
| GET    | `/user`                   | Get all users                      |

---

## 🏗️ Implemented Features
- User authentication (JWT, protected routes)
- CRUD for tasks
- Add/edit tags to tasks
- Add/view notes for each task
- Mention/tag other users in tasks (displayed as @username)
- Responsive UI with Chakra UI
- Error handling and loading states

---

## 📝 Usage
- Register a new user or login with existing credentials
- Add tasks with title, description, priority, tags, and mentions
- Edit or delete tasks
- Add notes to any task via the notes icon
- View all users (for mentions)

---

For any issues or questions, please open an issue or contact the maintainer.



