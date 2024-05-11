import { Router } from 'express';

const infoRouter = Router()

infoRouter.get('/packages/:page', getPackages)

export default infoRouter


