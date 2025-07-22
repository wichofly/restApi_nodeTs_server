import request from 'supertest';
import server from '../../server';

describe('POST /api/products', () => {
  it('should display validation errors', async () => {
    const res = await request(server).post('/api/products').send({}); // Missing items
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toHaveLength(4);

    expect(res.status).not.toBe(404);
    expect(res.body.errors).not.toHaveLength(2);
  });

  it('should create a new product', async () => {
    const res = await request(server)
      .post('/api/products')
      .send({ name: 'Testing - Pupusa', price: 2.99 });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('data');

    expect(res.status).not.toBe(404);
    expect(res.body).not.toHaveProperty('errors');
  });
});
