import express from 'express';
import { getAllPlanets } from './getAllPlanets';

const planetsRouter = express.Router();

planetsRouter.get('/planets', getAllPlanets);

export { planetsRouter };
