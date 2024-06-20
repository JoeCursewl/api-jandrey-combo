import { Router } from 'express';
import { getInformationById } from '../controllers/information.controller.js';

const infoRouter = Router()

infoRouter.get('/informationbyid/get/:page', getPackages)

export default infoRouter


