import { Launch } from '@api/types/Launch';
import {
	getAllLaunches as MongoGetLaunches,
	postLaunch as MongoPostLaunch,
	abortLaunch as MongoabortLaunch,
	exists as MongoLaunchExists,
} from '../../models/launches.model';
import { Request, Response } from 'express';

export async function getLaunches(_req: Request, res: Response) {
	const launches = await MongoGetLaunches();
	return res.status(200).json(launches);
}

export async function postLaunch(req: Request, res: Response) {
	const launch = req.body as Launch;
	if (
		!launch.mission ||
		!launch.rocket ||
		!launch.launchDate ||
		!launch.destination
	) {
		return res.status(400).json({
			error: 'Missing required launch property',
		});
	}
	const success = await MongoPostLaunch(launch);
	if (!success) {
		return res.status(400).json({
			error: `Launch was unable to be created`,
		});
	}
	return res.status(201).json(launch);
}

export async function abortLaunch(req: Request<{ id: string }>, res: Response) {
	//params.id corresponds to /:id in the route
	const flightNumber = Number.parseInt(req.params.id);

	const launchExists = await MongoLaunchExists(flightNumber);
	if (!launchExists) {
		return res.status(404).json({
			error: `Launch with flight number ${flightNumber} does not exist!`,
		});
	}

	const success = await MongoabortLaunch(flightNumber);
	if (!success) {
		return res.status(400).json({
			error: `Launch was not aborted!`,
		});
	}
	return res.status(200).json(success);
}
