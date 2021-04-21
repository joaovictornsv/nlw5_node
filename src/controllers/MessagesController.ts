import { MessagesService } from '@services/MessagesService';
import { Request, Response } from 'express';

class MessagesController {
  private messagesService: MessagesService;

  constructor() {
    this.messagesService = new MessagesService();
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { admin_id, user_id, text } = request.body;

    const message = await this.messagesService.create({ admin_id, user_id, text });

    return response.status(201).json(message);
  }

  async showByUser(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const messages = await this.messagesService.listByUser(id);

    return response.status(200).json(messages);
  }
}

export { MessagesController };
