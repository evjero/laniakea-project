import { Database } from '../../db';

export function getLaunches(_req: any, res: any) {
	res.status(200).json(Database.getInstance().launches);
}
