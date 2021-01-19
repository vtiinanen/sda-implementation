const supertest = require('supertest');
const { app, server } = require('./server');
const api = supertest(app);

describe('Server tests', () => {
	beforeAll(async () => {});

	afterAll(async () => {
		server.close();
	});

	describe('Any request to non-existing route', () => {
		test('should return 404 for non-existing route', async () => {
			const { statusCode: codeGet } = await api.get('/testing-non-existing-route');
			const { statusCode: codePut } = await api.put('/testing-non-existing-route');
			const { statusCode: codePost } = await api.post('/testing-non-existing-route');
			const { statusCode: codeDelete } = await api.delete('/testing-non-existing-route');
			const { statusCode: codePatch } = await api.patch('/testing-non-existing-route');
			expect(codeGet).toEqual(404);
			expect(codePut).toEqual(404);
			expect(codePost).toEqual(404);
			expect(codeDelete).toEqual(404);
			expect(codePatch).toEqual(404);
		});
	});
});
