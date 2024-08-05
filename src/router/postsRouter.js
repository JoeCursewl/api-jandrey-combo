import { Router } from 'express';
import { getPosts, updatePost, deletePost, likePost, verifiedLike, insertComment, getAllComments, getLikeCount, updateComment } from '../controllers/post.controller.js';

const postsRouter = Router()

postsRouter.get('/get/:id', getPosts)

postsRouter.patch('/update/:id', updatePost)

postsRouter.delete('/delete/:id', deletePost)

postsRouter.post('/like/:post_id', likePost)

postsRouter.get('/like/v/:post_id', verifiedLike)

postsRouter.post('/comment/:post_id', insertComment)

postsRouter.get('/comment/getall/id/:post_id/:page', getAllComments)

postsRouter.get('/likes/v/count/:post_id', getLikeCount)

postsRouter.patch('/comment/u/:comment_id', updateComment)

export default postsRouter


