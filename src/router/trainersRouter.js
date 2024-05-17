import { Router } from 'express';
const trainersRouter = Router()
import { deleteTrainer, getTrainer, updateTrainer } from '../controllers/trainers.controller.js';

trainersRouter.get('/get/:id', getTrainer)

trainersRouter.patch('/update/:id', updateTrainer)

trainersRouter.delete('/delete/:id', deleteTrainer)

export default trainersRouter

