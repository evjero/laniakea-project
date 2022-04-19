import express from 'express';
import { getPlanets } from './controller';

const planetsRouter = express.Router();

planetsRouter.get('/planets', getPlanets);

export { planetsRouter };
