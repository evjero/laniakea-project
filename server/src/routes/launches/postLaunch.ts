import { Database } from '../../db';

export function postLaunch(req: any, res: any) {
	console.debug(req);
	// Database.getInstance().launches = [...Database.getInstance().launches, ]
	res.status(201).json();
}
