import { Database } from '../../db';

export function getAllPlanets(_req: any, res: any) {
	res.status(200).json(Database.getInstance().planets);
}
