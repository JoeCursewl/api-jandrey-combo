import { Router } from 'express';
import { getPackages } from '../controllers/info.controller.js';

const infoRouter = Router()

infoRouter.get('/packages/:page', getPackages)

export default infoRouter


