import { Router } from 'express';
import { getInformation, getPackages, getPosts, getTrainers } from '../controllers/info.controller.js';

const infoRouter = Router()

infoRouter.get('/packages/:page', getPackages)

infoRouter.get('/trainers/:page', getTrainers)

infoRouter.get('/information/:page', getInformation)

infoRouter.get('/posts/:page', getPosts)

export default infoRouter


