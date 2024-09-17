import { Router } from 'express';
const trainersRouter = Router()
import { deleteTrainer, getTrainer, getTrainersSaved, saveTrainer, stateTrainerSaved, updateTrainer } from '../controllers/trainers.controller.js';

trainersRouter.get('/get/:id', getTrainer)

trainersRouter.put('/update/:id', updateTrainer)

trainersRouter.delete('/delete/:id', deleteTrainer)

trainersRouter.post('/save', saveTrainer)

trainersRouter.get('/save/verify/:id', stateTrainerSaved)

trainersRouter.get('/get/saved', getTrainersSaved)

export default trainersRouter

