import { Router } from 'express';
import { getPosts } from '../controllers/post.controler';

const postsRouter = Router()

postsRouter.get('/get/:id', getPosts)

export default postsRouter


