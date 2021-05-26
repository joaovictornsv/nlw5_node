import { Response } from 'express';

const ResponseMock = {
  status: jest.fn().mockImplementation(() => ResponseMock),
  json: jest.fn(),
} as unknown as Response;

export default ResponseMock;
