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

describe('GET /api/products/:id', () => {
  it('should fetch a product by ID', async () => {
    const productId = 2000;
    const res = await request(server).get(`/api/products/${productId}`);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error', 'Product not found');
  });

  it('should check a valid ID in the URL', async () => {
    const res = await request(server).get('/api/products/not-valid-url');
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toHaveLength(1);
    expect(res.body.errors[0].msg).toBe('ID must be a number');
  });

  it('get a response for a single product', async () => {
    const res = await request(server).get('/api/products/1'); // Assuming product with ID 1 exists
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
  });
});

describe('PUT /api/products/:id', () => {
  it('should check a valid ID in the URL', async () => {
    const res = await request(server).put('/api/products/not-valid-url').send({
      name: 'FIFA 2026 PS4 - Game Test',
      price: 120,
      availability: true,
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toHaveLength(1);
    expect(res.body.errors[0].msg).toBe('ID must be a number');
  });

  it('should display validation error message when updating a product', async () => {
    const res = await request(server).put('/api/products/1').send({}); // Missing items
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toBeTruthy();
    expect(res.body.errors).toHaveLength(5);

    expect(res.status).not.toBe(200);
    expect(res.body).not.toHaveProperty('data');
  });

  it('should display validation price greater than 0', async () => {
    const res = await request(server).put('/api/products/1').send({
      name: 'FIFA 2026 PS4 - Game Test',
      price: 0,
      availability: true,
    }); 
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toBeTruthy();
    expect(res.body.errors).toHaveLength(1);
    expect(res.body.errors[0].msg).toBe('Price must be greater than zero');

    expect(res.status).not.toBe(200);
    expect(res.body).not.toHaveProperty('data');
  });

  it('should return a 404 response for a non-existent product', async () => {
    const productId = 2000;
    const res = await request(server).put(`/api/products/${productId}`).send({
      name: 'FIFA 2026 PS4 - Game Test',
      price: 120,
      availability: true,
    }); // Missing items
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Product not found');

    expect(res.status).not.toBe(200);
    expect(res.body).not.toHaveProperty('data');
  });

  it('should update an existing product with valid data', async () => {
    const res = await request(server).put('/api/products/1').send({
      name: 'FIFA 2026 PS4 - Game Test',
      price: 120,
      availability: true,
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');

    expect(res.status).not.toBe(400);
    expect(res.body).not.toHaveProperty('errors');
  });
});
