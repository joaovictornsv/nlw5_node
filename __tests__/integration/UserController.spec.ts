import { getCustomRepository } from 'typeorm';
import { mocked } from 'ts-jest/utils';
import { UserController } from '../../src/controllers/UserController';
import { RepositoryMock as UserRepositoryMock } from '../../__mocks__/repositories/Repository.mock';
import { RequestMock, ResponseMock } from '../../__mocks__/express/RequestResponse.mock';

const mockUser = {
  id: 'mock-id',
  email: 'mock-email',
  created_at: 'mock-date',
};

jest.mock('typeorm', () => ({ getCustomRepository: jest.fn() }));

// Constants Mocks

UserRepositoryMock.create = jest.fn().mockResolvedValueOnce(mockUser);

RequestMock.body = {
  email: 'mock@email.com',
};

//---

describe('UsersService', () => {
  let userController: UserController;

  beforeEach(() => {
    mocked(getCustomRepository).mockReturnValueOnce(UserRepositoryMock);
    userController = new UserController(UserRepositoryMock);
  });

  afterEach(() => jest.clearAllMocks());

  it('should call response.status() with status code 201', async () => {
    const sendStatusCodeSpy = jest.spyOn(ResponseMock, 'status');

    UserRepositoryMock.findOne = jest.fn().mockResolvedValueOnce(null);

    await userController.create(RequestMock, ResponseMock);

    expect(sendStatusCodeSpy).toBeCalledTimes(1);
    expect(sendStatusCodeSpy).toBeCalledWith(201);
  });
  it('should call response.json() with mockUser', async () => {
    const sendJSONSpy = jest.spyOn(ResponseMock, 'json');

    UserRepositoryMock.findOne = jest.fn().mockResolvedValueOnce(mockUser);

    await userController.create(RequestMock, ResponseMock);

    expect(sendJSONSpy).toBeCalledTimes(1);
    expect(sendJSONSpy).toBeCalledWith(mockUser);
  });
});
