import { store } from '../../store';
import { Planet } from '../types/Planet';

function isHabitable(planet: Planet): boolean {
	return (
		planet.koi_disposition === 'CONFIRMED' /** Status */ &&
		planet.koi_insol > 0.36 /** Starlight */ &&
		planet.koi_prad < 1.6 /** Radius Ratio */
	);
}

export function getHabitablePlanets(req: any, res: any) {
	res.status(200).json(store.planets.filter(isHabitable));
}
