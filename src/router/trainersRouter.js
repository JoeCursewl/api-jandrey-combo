import { Router } from 'express';
const trainersRouter = Router()
import { getTrainer } from '../controllers/trainers.controller.js';

trainersRouter.get('/get/:id', getTrainer)

export default trainersRouter

