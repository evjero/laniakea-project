import { rest } from 'msw';
export const handlers = [
	rest.get('/planets', (req, res, ctx) => {
		return res(
			ctx.status(200).json([
				{
					kepoi_name: 'Ktest1',
					kepler_name: 'test1',
					koi_disposition: 'CONFIRMED',
				},
				{
					kepoi_name: 'Ktest2',
					kepler_name: 'test2',
					koi_disposition: 'FALSE POSITIVE',
				},
			])
		);
	}),
	rest.get('/planets?habitable=true', (req, res, ctx) => {
		return res(
			ctx.status(200).json([
				{
					kepoi_name: 'Ktest1',
					kepler_name: 'test1',
					koi_disposition: 'CONFIRMED',
				},
			])
		);
	}),
	rest.get('/launches', (req, res, ctx) => {
		return res(
			ctx.status(200).json([
				{
					destination: 'Ktest1',
					flightNumber: 1,
					launchDate: new Date('2032-04-01').toDateString(),
					mission: 'Spectacle',
					rocket: 'Saturn VIII',
					success: false,
					upcoming: true,
				},
			])
		);
	}),
	rest.post('/launches', (req, res, ctx) => {
		return res(ctx.status(201));
	}),
];
