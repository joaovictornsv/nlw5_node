import { UsersService } from '@services/UsersService';
import { Request, Response } from 'express';
import { UserRepository } from '@repositories/UserRepository';

class UserController {
  private userRepository: typeof UserRepository;

  constructor(repository: typeof UserRepository) {
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
