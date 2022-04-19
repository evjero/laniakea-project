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

async function getLatestFlightNumber() {
	const latestLaunch = await LaunchModel.findOne({}).sort('-flightNumber');
	return latestLaunch?.flightNumber ?? DEFAULT_FLIGHT_NUMBER;
}

/** Saves a launch to the MongoDB */
export async function postLaunch(launch: Launch) {
	const planet = await PlanetModel.findOne({
		kepoi_name: launch.destination,
	});
	if (!planet) {
		throw new Error(
			'No matching planet was found by ' + launch.destination
		);
	}
	await LaunchModel.updateOne({ flightNumber: launch.flightNumber }, launch, {
		upsert: true,
	});
}

/** Removes a launch from the MongoDB */
export async function deleteLaunch(flightNumber: number) {
	await LaunchModel.deleteOne({ flightNumber });
}
