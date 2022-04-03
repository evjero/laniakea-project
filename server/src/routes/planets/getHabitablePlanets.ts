import { Planet } from '@api/types/Planet';
import { Database } from '../../db';

function isHabitable(planet: Planet): boolean {
	return (
		planet.koi_disposition === 'CONFIRMED' /** Status */ &&
		planet.koi_insol !== undefined &&
		planet.koi_insol > 0.36 /** Starlight */ &&
		planet.koi_prad !== undefined &&
		planet.koi_prad < 1.6 /** Radius Ratio */
	);
}

export function getHabitablePlanets(_req: any, res: any) {
	res.status(200).json(Database.getInstance().planets.filter(isHabitable));
}
