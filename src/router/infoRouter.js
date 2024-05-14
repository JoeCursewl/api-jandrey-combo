import { Router } from 'express';
import { getInformation, getPackages, getTrainers } from '../controllers/info.controller.js';

const infoRouter = Router()

infoRouter.get('/packages/:page', getPackages)

infoRouter.get('/trainers/:page', getTrainers)

infoRouter.get('/information/:page', getInformation)

export default infoRouter


