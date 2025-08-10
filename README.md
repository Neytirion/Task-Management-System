# Fullstack To-Do App with Admin Panel

**Fullstack pet project** to demonstrate authentication, role-based access control, and CRUD operations for tasks.  

## ✨ Features
- 🔐 User registration, login, and logout with **HTTP-only cookies** for JWT storage  
- 👥 Role-based access control (**user** / **admin**)  
- 📝 CRUD operations for tasks (create, read, update, delete)  
- 🛠 Admin panel to manage users and their tasks  
- 🛡 Protected API routes and frontend pages  
- 📱 Responsive UI with **TailwindCSS**  

## 🛠 Technologies Used
**Frontend:** React, React Router, Axios, TailwindCSS  
**Backend:** Node.js, Express.js, MongoDB, Mongoose  
**Auth:** JWT, HTTP-only cookies, role-based middleware  
**Other:** dotenv, cookie-parser, bcryptjs, cors  

##Run
**Fullstack pet project** 
cd backend
npm install

Create .env file:
PORT=5000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret-key>

Run backend:
npm run dev

Frontend setup:
cd frontend
npm install

Run frontend:
npm run dev

Open in browser
http://localhost:5173
