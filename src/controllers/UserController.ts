import { UsersService } from '@services/UsersService';
import { Request, Response } from 'express';
import { IUserRepository } from '../interfaces/repositories/IUserRepository';

class UserController {
  private userRepository: IUserRepository;

  constructor(repository: IUserRepository) {
    this.userRepository = repository;
  }

  create = async (request: Request, response: Response) => {
    const usersService = new UsersService(this.userRepository);
    const { email } = request.body;

    const user = await usersService.create(email);

    return response.status(201).json(user);
  }
}

export { UserController };
