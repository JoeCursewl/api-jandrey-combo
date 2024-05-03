import express from 'express'
import cors from 'cors'
import userRouter from './router/userRouter.js'
import adminRouter from './router/adminRouter.js';
import morgan from 'morgan';
import pool from './db.brd.js'

const app = express();

app.use(morgan('dev'))
app.use(express.json())
app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, PATCH, DELETE",
    allowedHeaders: "Content-Type, Authorization",
  })
);

// RECURSO USERS
app.use("/users", userRouter);
app.use("/admins", adminRouter)

app.get('/', (req, res) => {
  res.status(401).json({ message: 'UNAUTHORIZED' })
})

export default app;