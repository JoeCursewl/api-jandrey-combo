import { Router } from 'express';
const trainersRouter = Router()
import { getTrainer } from '../controllers/trainers.controller';

trainersRouter.get('/get/:id', getTrainer)

trainersRouter.patch('/update/:id', updatePackage)

trainersRouter.delete('/delete/:id', deletePackage)

export default trainersRouter

