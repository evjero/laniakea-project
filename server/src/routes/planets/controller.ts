import { Request, Response } from 'express';
import { getPlanets as MongoGetPlanets } from '../../models/planets.model';

export async function getPlanets(_req: Request, res: Response) {
	const planets = await MongoGetPlanets();
	return res.status(200).json(planets);
}
