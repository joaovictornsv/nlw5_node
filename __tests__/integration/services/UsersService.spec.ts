import { getCustomRepository } from 'typeorm';
import { mocked } from 'ts-jest/utils';
import { UsersService } from '../../../src/services/UsersService';
import { RepositoryMock as UserRepositoryMock } from '../../../__mocks__/repositories/Repository.mock';

const mockUser = {
  id: 'mock-id',
  email: 'mock-email',
  created_at: 'mock-date',
};

jest.mock('typeorm', () => ({ getCustomRepository: jest.fn() }));

// Constants Mocks

UserRepositoryMock.create = jest.fn().mockResolvedValueOnce(mockUser);

//---

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(() => {
    mocked(getCustomRepository).mockReturnValueOnce(UserRepositoryMock);
    usersService = new UsersService(UserRepositoryMock);
  });

  afterEach(() => jest.clearAllMocks());

  it('should call getCustomRepository with UserRepositoryMock', () => {
    expect(getCustomRepository).toBeCalledTimes(1);
    expect(getCustomRepository).toBeCalledWith(UserRepositoryMock);
  });

  it('should be able create an user that already exists', async () => {
    UserRepositoryMock.findOne = jest.fn().mockResolvedValueOnce(mockUser);

    const user = await usersService.create(mockUser.email);

    expect(user).toHaveProperty('id');

    expect(UserRepositoryMock.findOne).toBeCalledTimes(1);
    expect(UserRepositoryMock.findOne).toBeCalledWith({ email: mockUser.email });
  });

  it('should be able create an new user', async () => {
    UserRepositoryMock.findOne = jest.fn().mockResolvedValueOnce(null);

    const user = await usersService.create(mockUser.email);

    expect(user).toHaveProperty('id');

    expect(UserRepositoryMock.create).toBeCalledTimes(1);
    expect(UserRepositoryMock.create).toBeCalledWith({ email: mockUser.email });
  });

  it('should be able get an user by email', async () => {
    UserRepositoryMock.findOne = jest.fn().mockResolvedValueOnce(mockUser);

    const user = await usersService.findByEmail(mockUser.email);

    expect(user).toHaveProperty('id');

    expect(UserRepositoryMock.findOne).toBeCalledTimes(1);
    expect(UserRepositoryMock.findOne).toBeCalledWith({ email: mockUser.email });
  });
});
