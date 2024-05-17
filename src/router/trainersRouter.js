import { Router } from 'express';
const trainersRouter = Router()
import { getTrainer, updateTrainer } from '../controllers/trainers.controller.js';

trainersRouter.get('/get/:id', getTrainer)

trainersRouter.patch('/update/:id', updateTrainer)

export default trainersRouter

