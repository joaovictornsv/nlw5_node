import { UsersService } from '@services/UsersService';
import { Request, Response } from 'express';

class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const usersService = new UsersService();
    const { email } = request.body;

    const user = await usersService.create(email);

    return response.status(201).json(user);
  }
}

export { UserController };
