import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';
import planets from './planets.mongo';
import type { Planet } from '@api/types/Planet';
import CONSOLE_ID from 'consoleID';

/** Get all planets from MongoDB */
export async function getAllPlanets() {
	return await planets.find(
		{},
		{
			_id: 0,
			__v: 0,
		}
	);
}

/** Filters planets down to what has been deemed habitable */
function isHabitablePlanet(planet: Planet): boolean {
	if (planet.koi_insol !== undefined && planet.koi_prad !== undefined) {
		return (
			planet.koi_disposition === 'CONFIRMED' &&
			planet.koi_insol > 0.36 &&
			planet.koi_insol < 1.11 &&
			planet.koi_prad < 1.6
		);
	} else {
		return false;
	}
}

export function loadPlanetsFromDisk(): Promise<Planet[]> {
	return new Promise<Planet[]>((resolve, reject) => {
		const loadedPlanets: Planet[] = [];
		const csvStream = fs.createReadStream(
			path.join(__dirname, '../../public/data/koi_ctable.csv')
		);
		const pipe = csvStream.pipe(
			parse({
				comment: '#',
				columns: true, //Returns object with key/value pairs
			})
		);
		pipe.on('data', (data: any) => {
			//Insert and update to Mongo
			if (isHabitablePlanet(data)) {
				savePlanet(data);
			}
		});
		pipe.on('error', (e) => {
			console.error(`[${CONSOLE_ID}]File stream pipe error:\n`, e);
			reject(e);
		});
		pipe.on('end', () => {
			resolve(loadedPlanets);
		});
	});
}

/** Upsert a planet to MongoDB */
async function savePlanet(planet: Planet) {
	try {
		await planets.updateOne(
			{
				kepler_name: planet.kepler_name,
			},
			{
				kepler_name: planet.kepler_name,
			},
			{
				upsert: true,
			}
		);
	} catch (err) {
		console.error(`Could not save planet ${err}`);
	}
}
