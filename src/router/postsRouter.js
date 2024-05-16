import { Router } from 'express';
import { getPosts, updatePost } from '../controllers/post.controller.js';

const postsRouter = Router()

postsRouter.get('/get/:id', getPosts)

postsRouter.patch('/update/:id', updatePost)

export default postsRouter


