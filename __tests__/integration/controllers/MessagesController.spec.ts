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
  it('should get messages by user id', async () => {
    const { body } = await request(http)
      .post('/users')
      .send({ email: 'user2@example.com' });

    const { id } = body;

    await request(http)
      .post('/messages')
      .send({ user_id: id, text: 'Mensagem 1' });
    await request(http)
      .post('/messages')
      .send({ user_id: id, text: 'Mensagem 2' });

    const response = await request(http)
      .get(`/messages/${id}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveLength(2);
  });
});
