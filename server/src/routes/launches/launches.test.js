const axios = require('axios');
describe('Test GET /launches', () => {
	test('200', async () => {
		const res = await axios.get('http://localhost:8080/api/v1/launches');
		expect(res.length).toBeGreaterThan(0);
	});
});
describe('Test POST /launches', () => {
	test('200', () => {});
	test('Missing required properties', () => {});
	test('Invalid dates', () => {});
});
