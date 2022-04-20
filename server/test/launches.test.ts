import request from 'supertest';
import backend from '../src/backend';
import { mongoConnect, mongoDisconnect } from '../src/services/mongo';
import { loadPlanetsFromDisk } from '../src/models/planets.model';
import { loadLaunchesFromSpaceX } from '../src/models/launches.model';
import dotenv from 'dotenv';

dotenv.config();

describe('Launches API', () => {
	beforeAll(async () => {
		//Similar to server.ts
		await mongoConnect();
		await loadPlanetsFromDisk();
		await loadLaunchesFromSpaceX();
	});

	afterAll(async () => {
		await mongoDisconnect();
	});

	describe('Test GET /launches', () => {
		test('It should respond with 200 success', async () => {
			await request(backend)
				.get('/api/v1/launches')
				.expect('Content-Type', /json/)
				.expect(200);
		});
	});

	describe('Test POST /launches', () => {
		const completeLaunchData = {
			mission: 'USS Enterprise',
			rocket: 'NCC 1701-D',
			target: 'Kepler-62 f',
			launchDate: 'January 4, 2028',
		};

		const launchDataWithoutDate = {
			mission: 'USS Enterprise',
			rocket: 'NCC 1701-D',
			target: 'Kepler-62 f',
		};

		test('It should respond with 201 created', async () => {
			const response = await request(backend)
				.post('/api/v1/launches')
				.send(completeLaunchData)
				.expect('Content-Type', /json/)
				.expect(201);

			const requestDate = new Date(
				completeLaunchData.launchDate
			).valueOf();
			const responseDate = new Date(response.body.launchDate).valueOf();
			expect(responseDate).toBe(requestDate);

			expect(response.body).toMatchObject(launchDataWithoutDate);
		});

		test('It should catch missing required properties', async () => {
			const response = await request(backend)
				.post('/api/v1/launches')
				.send(launchDataWithoutDate)
				.expect('Content-Type', /json/)
				.expect(400);

			expect(response.body).toStrictEqual({
				error: 'Missing required launch property',
			});
		});
	});
});
