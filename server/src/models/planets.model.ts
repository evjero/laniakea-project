import type { Planet } from '@api/types/Planet';
import { parse } from 'csv-parse';
import fs from 'fs';
import path from 'path';
import CONSOLE_ID from '../consoleID';
import PlanetModel from './planets.mongo';

/** Get all planets from MongoDB */
export async function getPlanets() {
	return await PlanetModel.find(
		{},
		{
			_id: 0,
			__v: 0,
		}
	);
}

export async function exists(kepid: number) {
	const launch = await PlanetModel.findOne({ kepid });
	return launch !== undefined && launch !== null;
}

export async function loadPlanetsFromDisk(): Promise<void> {
	if (await exists(11768142)) {
		console.debug(
			`[${CONSOLE_ID}] Database already populated with planets`
		);
		return;
	}

	/** Filters planets down to what has been deemed habitable */
	const isHabitablePlanet = (planet: Planet): boolean => {
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
	};

	return new Promise((resolve, reject) => {
		console.log(__dirname);
		const csvStream = fs.createReadStream(
			path.join(__dirname, '../../public/data/koi_ctable.csv')
		);
		const pipe = csvStream.pipe(
			parse({
				comment: '#',
				columns: true, //Returns object with key/value pairs
			})
		);
		pipe.on('data', async (planet: Planet) => {
			//Insert and update to Mongo
			if (isHabitablePlanet(planet)) {
				try {
					/** Upsert a planet to MongoDB */
					await PlanetModel.updateOne(
						{ kepoi_name: planet.kepoi_name },
						planet,
						{
							upsert: true,
						}
					);
				} catch (err) {
					console.error(`Could not save planet ${err}`);
				}
			}
		});
		pipe.on('error', (e) => {
			console.error(`[${CONSOLE_ID}]File stream pipe error:\n`, e);
			reject(e);
		});
		pipe.on('end', async () => {
			const planets = await getPlanets();
			console.debug(
				`[${CONSOLE_ID}] Database populated with ${planets.length} planets`
			);
			resolve();
		});
	});
}
