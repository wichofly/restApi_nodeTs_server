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

  it('should validate display greater than 0', async () => {
    const res = await request(server)
      .post('/api/products')
      .send({ name: 'Testing - Flaps', price: 0 });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toHaveLength(1);

    expect(res.status).not.toBe(404);
    expect(res.body.errors).not.toHaveLength(2);
  });

  it('should validate display greater than 0 and a number', async () => {
    const res = await request(server)
      .post('/api/products')
      .send({ name: 'Testing - Flaps', price: 'should be a number' });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toHaveLength(2);

    expect(res.status).not.toBe(404);
    expect(res.body.errors).not.toHaveLength(4);
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

describe('GET /api/products', () => {
  it('should check if api/products url exists', async () => {
    const res = await request(server).get('/api/products');
    expect(res.status).not.toBe(404);
  });

  it('should fetch all products', async () => {
    const res = await request(server).get('/api/products');
    expect(res.status).toBe(200);
    // expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body.data).toHaveLength(1); // Assuming one product was created in the previous test

    expect(res.status).not.toBe(404);
    expect(res.body.data).not.toHaveProperty('errors');
  });
});
