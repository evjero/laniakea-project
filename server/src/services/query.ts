import { Request, Response } from 'express';

//Pagination
export function getPagination(query: Partial<Request['query']>) {
	const page = Math.abs(Number.parseInt((query.page as string) ?? 1));
	const limit = Math.abs(Number.parseInt((query.limit as string) ?? 0));
	const skip = (page - 1) * limit;

	return { skip, limit };
}
