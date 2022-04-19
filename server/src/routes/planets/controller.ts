import { getPlanets as MongoGetPlanets } from '../../db/models/planets.model';

export async function getPlanets(_req: any, res: any) {
	res.status(200).json(await MongoGetPlanets());
}
