import request from 'supertest';
import server from '../server';

describe('Server API Tests', () => {
  it('should respond with a welcome message at /api', async () => {
    const res = await request(server).get('/api');
    expect(res.status).toBe(200);
    // expect(res.headers['content-type']).toMatch(/json/); // Check if the response is JSON
    expect(res.body.msg).toBe('Welcome to the API');

    expect(res.status).not.toBe(404);
    expect(res.body.msg).not.toBe('Not Found');
  });
});

/**
 * test() and it() are the same.
 */
