import { UsersService } from '@services/UsersService';
import { Request, Response } from 'express';

class UserController {
  private usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    try {
      const user = await this.usersService.create(email);

      return response.status(201).json(user);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export { UserController };
