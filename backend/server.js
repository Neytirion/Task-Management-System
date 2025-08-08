import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {db} from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/admin',adminRoutes)


app.get('/', (req, res) => {
  res.send('API is working');
});

db()
  .then(() => {
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch(err => {
    console.error('DB connection failed:', err);
    process.exit(1);
  });
