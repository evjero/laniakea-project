import type { Launch } from '@api/types/Launch';
import axios from 'axios';
import CONSOLE_ID from '../consoleID';
import LaunchModel from './launches.mongo';
import PlanetModel from './planets.mongo';

const DEFAULT_FLIGHT_NUMBER = 1000;

/** Get all launches from MongoDB */
export async function getAllLaunches(skip: number = 1, limit: number = 0) {
	return await LaunchModel.find(
		{},
		{
			_id: 0,
			__v: 0,
		}
	)
		.sort({ flightNumber: 1 })
		.skip(skip)
		.limit(limit);
}

export async function loadLaunchesFromSpaceX(): Promise<void> {
	if (await exists(1)) {
		console.debug(
			`[${CONSOLE_ID}] Database already populated with SpaceX launches`
		);
		return;
	}
	/** @see https://github.com/r-spacex/SpaceX-API/blob/master/docs/launches/v4/query.md */
	axios
		.post('https://api.spacexdata.com/v4/launches/query', {
			query: {},
			options: {
				pagination: false,
				populate: [
					{
						path: 'rocket',
						select: {
							name: 1,
						},
					},
					{
						path: 'payloads',
						select: {
							customers: 1,
						},
					},
				],
			},
		})
		.then((response) => {
			response.data.docs.forEach((doc: any) => {
				const existingLaunch: Launch = {
					flightNumber: doc.flight_number,
					mission: doc.name,
					rocket: doc.rocket.name,
					launchDate: doc.date_local,
					upcoming: doc.upcoming,
					success: doc.success,
					destination: 'Kepler-442 b', //not in API
				};
				postExistingLaunch(existingLaunch);
				//TODO post multiple in same transaction
			});

			console.debug(
				`[${CONSOLE_ID}] Database populated with ${response.data.docs.length} SpaceX launches`
			);
		})
		.catch((e) => {
			console.error(`[${CONSOLE_ID}] SpaceX API query failed:\n`, e);
			return;
		});
}

export async function exists(flightNumber: number) {
	const launch = await LaunchModel.findOne({ flightNumber });
	return launch !== undefined && launch !== null;
}

async function getLatestFlightNumber() {
	const latestLaunch = await LaunchModel.findOne({}).sort('-flightNumber');
	return latestLaunch?.flightNumber ?? DEFAULT_FLIGHT_NUMBER;
}

/** Saves an existing launch to the MongoDB */
export async function postExistingLaunch(launch: Launch) {
	const response = await LaunchModel.updateOne(
		{ flightNumber: launch.flightNumber },
		launch,
		{
			upsert: true,
		}
	);
	return response.modifiedCount >= 0;
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
