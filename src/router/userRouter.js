import { Router } from 'express';
import { registerUsers, loginUsers, verifyToken } from '../controllers/user.controller.js';

const userRouter = Router()

userRouter.post('/create', registerUsers)

userRouter.post('/access', loginUsers)

userRouter.get('/verify', verifyToken)

export default userRouter


