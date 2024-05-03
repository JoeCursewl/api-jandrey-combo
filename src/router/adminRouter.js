import { Router } from 'express';
import { getPosts, registerPosts } from '../controllers/admin.controller.js';
const adminRouter = Router()

adminRouter.post('/post', registerPosts)

adminRouter.get('/getposts', getPosts)

export default adminRouter


