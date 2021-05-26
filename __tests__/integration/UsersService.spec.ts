import { getCustomRepository } from 'typeorm';
import { mocked } from 'ts-jest/utils';
import { UsersService } from '../../src/services/UsersService';
import UserRepositoryMock from '../../__mocks__/repositories/UserRepository.mock';

const mockUser = {
  id: 'mock-id',
  email: 'mock-email',
  created_at: 'mock-date',
};

jest.mock('typeorm', () => ({ getCustomRepository: jest.fn() }));

describe('UsersService', () => {
  it('should be able create an user that already exists', async () => {
    UserRepositoryMock.findOne = jest.fn().mockResolvedValueOnce(mockUser);
    UserRepositoryMock.create = jest.fn().mockResolvedValueOnce(mockUser);

    mocked(getCustomRepository).mockReturnValueOnce(UserRepositoryMock);
    const usersService = new UsersService(UserRepositoryMock);

    const user = await usersService.create(mockUser.email);

    expect(user).toHaveProperty('id');
    expect(getCustomRepository).toBeCalledWith(UserRepositoryMock);
  });
  it('should be able create an new user', async () => {
    UserRepositoryMock.findOne = jest.fn().mockResolvedValueOnce(null);
    UserRepositoryMock.create = jest.fn().mockResolvedValueOnce(mockUser);

    mocked(getCustomRepository).mockReturnValueOnce(UserRepositoryMock);
    const usersService = new UsersService(UserRepositoryMock);

    const user = await usersService.create(mockUser.email);

    expect(user).toHaveProperty('id');
    expect(getCustomRepository).toBeCalledWith(UserRepositoryMock);
    expect(UserRepositoryMock.create).toBeCalledTimes(1);
    expect(UserRepositoryMock.create).toBeCalledWith({ email: mockUser.email });
  });

  it('should be able get an user', async () => {
    UserRepositoryMock.findOne = jest.fn().mockResolvedValueOnce(mockUser);

    mocked(getCustomRepository).mockReturnValueOnce(UserRepositoryMock);
    const usersService = new UsersService(UserRepositoryMock);

    const user = await usersService.findByEmail(mockUser.email);

    expect(user).toHaveProperty('id');
    expect(getCustomRepository).toBeCalledWith(UserRepositoryMock);
    expect(UserRepositoryMock.findOne).toBeCalledTimes(1);
    expect(UserRepositoryMock.findOne).toBeCalledWith({ email: mockUser.email });
  });
});
