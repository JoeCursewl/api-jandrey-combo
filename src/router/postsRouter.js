import { Router } from 'express';
import { getPosts, updatePost, deletePost } from '../controllers/post.controller.js';

const postsRouter = Router()

postsRouter.get('/get/:id', getPosts)

postsRouter.patch('/update/:id', updatePost)

postsRouter.delete('/delete/:id', deletePost)

export default postsRouter


