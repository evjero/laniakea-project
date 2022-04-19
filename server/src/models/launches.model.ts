import LaunchModel from './launches.mongo';
import PlanetModel from './planets.mongo';
import type { Launch } from '@api/types/Launch';
import { FilterQuery } from 'mongoose';

const DEFAULT_FLIGHT_NUMBER = 1000;

/** Get all launches from MongoDB */
export async function getAllLaunches() {
	return await LaunchModel.find(
		{},
		{
			_id: 0,
			__v: 0,
		}
	);
}

export async function exists(flightNumber: number) {
	const launch = await LaunchModel.findOne({ flightNumber });
	return launch !== undefined;
}

async function getLatestFlightNumber() {
	const latestLaunch = await LaunchModel.findOne({}).sort('-flightNumber');
	return latestLaunch?.flightNumber ?? DEFAULT_FLIGHT_NUMBER;
}

/** Saves a launch to the MongoDB */
export async function postLaunch(
	partialLaunch: Omit<Launch, 'flightNumber' | 'success' | 'upcoming'>
) {
	const _flightNumber = (await getLatestFlightNumber()) + 1;
	const launch: Launch = {
		...partialLaunch,
		flightNumber: _flightNumber,
		success: true,
		upcoming: true,
	};
	const planet = await PlanetModel.findOne({
		kepler_name: launch.destination,
	});
	if (!planet) {
		console.error('No matching planet was found by ' + launch.destination);
		return false;
	}
	const response = await LaunchModel.updateOne(
		{ flightNumber: launch.flightNumber },
		launch,
		{
			upsert: true,
		}
	);
	return response.modifiedCount >= 0;
}

/** Does not remove the launch from the MongoDB, but updates it to unsuccessful */
export async function abortLaunch(flightNumber: number) {
	const response = await LaunchModel.updateOne(
		{ flightNumber },
		{ upcoming: false, success: false }
	);
	return response.modifiedCount === 1;
}
