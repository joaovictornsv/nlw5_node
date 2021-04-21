import { UsersService } from '@services/UsersService';
import { Request, Response } from 'express';

class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const usersService = new UsersService();

    try {
      const user = await usersService.create(email);

      return response.status(201).json(user);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export { UserController };
