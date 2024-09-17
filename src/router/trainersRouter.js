import { Router } from 'express';
const trainersRouter = Router()
import { deleteTrainer, getTrainer, updateTrainer } from '../controllers/trainers.controller.js';

trainersRouter.get('/get/:id', getTrainer)

trainersRouter.put('/update/:id', updateTrainer)

trainersRouter.delete('/delete/:id', deleteTrainer)

export default trainersRouter

