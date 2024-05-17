import { Router } from 'express';
import { updatePackage, getPackage, deletePackage } from '../controllers/packages.controller.js';

const packagesRouter = Router()

packagesRouter.get('/get/:id', getPackage)

packagesRouter.patch('/update/:id', updatePackage)

packagesRouter.delete('/delete/:id', deletePackage)

export default packagesRouter


