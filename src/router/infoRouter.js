import { Router } from 'express';
import { getPackages, getTrainers } from '../controllers/info.controller.js';

const infoRouter = Router()

infoRouter.get('/packages/:page', getPackages)

infoRouter.get('/trainers/:page', getTrainers)

infoRouter.get('/trainers/:page', getTrainers)

export default infoRouter


