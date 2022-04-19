import { getPlanets as MongoGetPlanets } from '../../models/planets.model';
import { Request, Response } from 'express';

export async function getPlanets(_req: Request, res: Response) {
	const planets = await MongoGetPlanets();
	return res.status(200).json(planets);
}
