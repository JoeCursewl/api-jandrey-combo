import { Router } from 'express';
import { getPosts, registerPosts, registerPackages, registerTrainers } from '../controllers/admin.controller.js';
const adminRouter = Router()

adminRouter.post('/post', registerPosts)
adminRouter.post('/packages', registerPackages)
adminRouter.post('/trainers', registerTrainers)

adminRouter.get('/getposts', getPosts)

export default adminRouter


