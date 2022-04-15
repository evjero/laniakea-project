import { parse } from 'csv-parse';
import launches from './launches.mongo';
import planets from './planets.mongo';
import type { Launch } from '@api/types/Launch';
import CONSOLE_ID from 'consoleID';
import { FilterQuery } from 'mongoose';

async function populateLaunches() {}
async function loadLaunchData() {
	const firstLaunch = await findLaunch({
		flightNumber: 1,
		rocket: 'Falcon 1',
		mission: 'FalconSat',
	});
	if (firstLaunch) {
		console.log('Launch data already loaded!');
	} else {
		await populateLaunches();
	}
}
async function findLaunch(filter?: FilterQuery<Launch>) {
	return await launches.findOne(filter);
}
async function existsLaunchWithId(launchId: number) {
	return await findLaunch({
		flightNumber: launchId,
	});
}
