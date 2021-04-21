import { MessagesService } from '@services/MessagesService';
import { Request, Response } from 'express';

class MessagesController {
  async create(request: Request, response: Response): Promise<Response> {
    const { admin_id, user_id, text } = request.body;

    const messagesService = new MessagesService();

    const message = await messagesService.create({ admin_id, user_id, text });

    return response.status(201).json(message);
  }
}

export { MessagesController };
