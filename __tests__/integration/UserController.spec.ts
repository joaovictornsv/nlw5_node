import { getCustomRepository } from 'typeorm';
import { mocked } from 'ts-jest/utils';
import { UserController } from '../../src/controllers/UserController';
import UserRepositoryMock from '../../__mocks__/repositories/UserRepository.mock';
import RequestMock from '../../__mocks__/express/Request.mock';
import ResponseMock from '../../__mocks__/express/Response.mock';

const mockUser = {
  id: 'mock-id',
  email: 'mock-email',
  created_at: 'mock-date',
};

jest.mock('typeorm', () => ({ getCustomRepository: jest.fn() }));
const getCustomRepositoryMocked = mocked(getCustomRepository);

describe('UsersService', () => {
  afterAll(() => jest.clearAllMocks());
  it('should be able create an new user', async () => {
    RequestMock.body = {
      email: 'mock@email.com',
    };

    ResponseMock.json = jest.fn().mockImplementationOnce(() => mockUser);

    const sendStatusCodeSpy = jest.spyOn(ResponseMock, 'status');

    getCustomRepositoryMocked.mockReturnValueOnce(UserRepositoryMock);
    UserRepositoryMock.findOne = jest.fn().mockResolvedValueOnce(null);
    UserRepositoryMock.create = jest.fn().mockResolvedValueOnce(mockUser);
    const userController = new UserController(UserRepositoryMock);

    const user = await userController.create(RequestMock, ResponseMock);

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('created_at');

    expect(getCustomRepository).toBeCalledTimes(1);
    expect(getCustomRepository).toBeCalledWith(UserRepositoryMock);

    expect(sendStatusCodeSpy).toBeCalledTimes(1);
    expect(sendStatusCodeSpy).toBeCalledWith(201);
  });
  it('should be able create an user that already exists', async () => {
    RequestMock.body = {
      email: 'mock@email.com',
    };

    ResponseMock.json = jest.fn().mockImplementationOnce((u) => u);

    const sendJSONSpy = jest.spyOn(ResponseMock, 'json');

    getCustomRepositoryMocked.mockReturnValueOnce(UserRepositoryMock);
    UserRepositoryMock.findOne = jest.fn().mockResolvedValueOnce(mockUser);
    UserRepositoryMock.create = jest.fn().mockResolvedValueOnce(mockUser);
    const userController = new UserController(UserRepositoryMock);

    const user = await userController.create(RequestMock, ResponseMock);

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('created_at');

    expect(getCustomRepository).toBeCalledTimes(1);
    expect(getCustomRepository).toBeCalledWith(UserRepositoryMock);

    expect(sendJSONSpy).toBeCalledTimes(1);
    expect(sendJSONSpy).toBeCalledWith(mockUser);
  });
});
