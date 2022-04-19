import {
	getAllLaunches as MongoGetLaunches,
	postLaunch as MongoPostLaunch,
	deleteLaunch as MongoDeleteLaunch,
} from '../../db/models/launches.model';

export async function getLaunches(_req: any, res: any) {
	res.status(200).json(await MongoGetLaunches());
}

export async function postLaunch(req: any, res: any) {
	res.status(201).json(await MongoPostLaunch(await req.json()));
}

export async function deleteLaunch(req: any, res: any) {
	res.status(200).json(await MongoDeleteLaunch(await req.json()));
}
