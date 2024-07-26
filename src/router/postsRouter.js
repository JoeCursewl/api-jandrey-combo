import { Router } from 'express';
import { getPosts, updatePost, deletePost, likePost } from '../controllers/post.controller.js';

const postsRouter = Router()

postsRouter.get('/get/:id', getPosts)

postsRouter.patch('/update/:id', updatePost)

postsRouter.delete('/delete/:id', deletePost)

postsRouter.post('/like/:post_id', likePost)

export default postsRouter


