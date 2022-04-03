import { parse } from 'csv-parse';
import fs from 'fs';
import CONSOLE_ID from '../consoleID';
import { Planet } from '@api/types/Planet';
import path from 'path';

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
			loadedPlanets.push(data);
		});
		pipe.on('error', (e) => {
			console.error(`[${CONSOLE_ID}] File stream pipe error:\n`, e);
			reject(e);
		});
		pipe.on('end', () => {
			resolve(loadedPlanets);
		});
	});
}
