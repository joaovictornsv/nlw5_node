import request from 'supertest';
import { getConnection } from 'typeorm';
import { http } from '../../../src/app';
import createConnection from '../../../src/database';

describe('Messages Controller', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it('should create a message', async () => {
    const { body } = await request(http)
      .post('/users')
      .send({ email: 'user@example.com' });

    const { id } = body;

    const response = await request(http)
      .post('/messages')
      .send({ user_id: id, text: 'Olá' });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('user_id');
  });
});
