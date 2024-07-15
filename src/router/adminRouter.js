import { Router } from 'express';
import { getPosts, registerPosts, registerPackages, registerTrainers, registerInformation, updateInformation, getInformationById, deleteInformationById } from '../controllers/admin.controller.js';
const adminRouter = Router()

adminRouter.post('/post', registerPosts)

adminRouter.post('/packages', registerPackages)

adminRouter.post('/trainers', registerTrainers)

adminRouter.post('/information', registerInformation)

adminRouter.put('/information/update/:id', updateInformation)

adminRouter.get('/information/getbyid/:id', getInformationById)

adminRouter.delete('/information/delete/:id', deleteInformationById)

adminRouter.get('/getposts/feed/:page', getPosts)

export default adminRouter


