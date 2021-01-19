const supertest = require('supertest');
const { app, server } = require('../server');
const api = supertest(app);

describe('names routes tests', () => {
	beforeAll(async () => {});

	afterAll(async () => {
		server.close();
	});

	describe('GET /names', () => {
		test('should return names', async () => {
			const { statusCode, body } = await api.get('/names').expect('Content-Type', /json/);
			expect(statusCode).toEqual(200);
			expect(body).toBeDefined();
		});
		test('should return names when queried with sort', async () => {
			const { statusCode, body } = await api.get('/names?sort').expect('Content-Type', /json/);
			expect(statusCode).toEqual(200);
			expect(body).toBeDefined();
		});
		test('should return names when queried with sort=amount', async () => {
			const { statusCode, body } = await api.get('/names?sort=amount').expect('Content-Type', /json/);
			expect(statusCode).toEqual(200);
			expect(body).toBeDefined();
		});
		test('should return names when queried with sort=alphabetical', async () => {
			const { statusCode, body } = await api.get('/names?sort=alphabetical').expect('Content-Type', /json/);
			expect(statusCode).toEqual(200);
			expect(body).toBeDefined();
		});
		test('should return names when queried with aggregate=amount', async () => {
			const { statusCode, body } = await api.get('/names?aggregate=amount').expect('Content-Type', /json/);
			expect(statusCode).toEqual(200);
			expect(body).toBeDefined();
			expect(body).toEqual(211);
		});
	});

	describe('GET /names/:name', () => {
		test('should return name document', async () => {
			const { statusCode, body } = await api.get('/names/Ville').expect('Content-Type', /json/);
			expect(statusCode).toEqual(200);
			expect(body).toBeDefined();
		});
		test('should return name documents key when queried with key=amount', async () => {
			const { statusCode, body } = await api.get('/names/Ville?key=amount').expect('Content-Type', /json/);
			expect(statusCode).toEqual(200);
			expect(body).toBeDefined();
			expect(body).toEqual(24);
		});
		test('should return 404 when requestin non-existing name object', async () => {
			const { statusCode, body } = await api.get('/names/IdontExistHAHA').expect('Content-Type', /json/);
			expect(statusCode).toEqual(404);
			expect(body).toBeDefined();
		});
	});
});
