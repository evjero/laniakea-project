import { Launch } from '@api/types/Launch';
import {
	getAllLaunches as MongoGetLaunches,
	postLaunch as MongoPostLaunch,
	deleteLaunch as MongoDeleteLaunch,
} from '../../db/models/launches.model';
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
	if (isNaN(new Date(launch.launchDate).getSeconds())) {
		return res.status(400).json({
			error: 'Invalid launch date',
		});
	}
	await MongoPostLaunch(launch);
	return res.status(201).json(launch);
}

export async function deleteLaunch(req: Request, res: Response) {
	const flightNumber = req.body as number;
	await MongoDeleteLaunch(flightNumber);
	return res.status(200).json();
}
