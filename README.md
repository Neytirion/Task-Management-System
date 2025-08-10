````markdown
# Fullstack To-Do App with Admin Panel
A pet project built to demonstrate the usage of learned full-stack development concepts, including authentication, role-based access control, and CRUD operations for tasks.

## 🚀 Features
- User registration, login, and logout with HTTP-only cookies for JWT storage
- Role-based access control (user / admin)
- CRUD operations for tasks (create, read, update, delete)
- Admin panel to manage users and their tasks
- Protected API routes and frontend pages
- Responsive UI with TailwindCSS

## 🛠 Technologies Used
Frontend: React, React Router, Axios, TailwindCSS  
Backend: Node.js, Express.js, MongoDB, Mongoose  
Auth: JWT, HTTP-only cookies, role-based middleware  
Other: dotenv, cookie-parser, bcryptjs, cors  
````
### ⚙️ Installation & Run

### 1️⃣ Clone the repository
```bash
git clone <repository-link>
```

### 2️⃣ Backend setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret-key>
```

Run backend:

```bash
npm run dev
```

### 3️⃣ Frontend setup

```bash
cd frontend
npm install
npm run dev
```

### 4️⃣ Open in browser

```
http://localhost:5173
```

