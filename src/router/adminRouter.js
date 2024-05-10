import { Router } from 'express';
import { getPosts, registerPosts, registerPackages } from '../controllers/admin.controller.js';
const adminRouter = Router()

adminRouter.post('/post', registerPosts)
adminRouter.post('/packages', registerPackages)
adminRouter.get('/getposts', getPosts)

export default adminRouter


