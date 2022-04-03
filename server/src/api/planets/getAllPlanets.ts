import { store } from '../../store';

export function getAllPlanets(req: any, res: any) {
	res.status(200).json(store.planets);
}
