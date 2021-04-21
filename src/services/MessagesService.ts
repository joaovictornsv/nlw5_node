import { MessagesRepository } from '@repositories/MessagesRepository';
import { getCustomRepository } from 'typeorm';

interface ICreateMessage {
  admin_id?: string;
  user_id: string;
  text: string
}

class MessagesService {
  async create({ admin_id, user_id, text }: ICreateMessage) {
    const messagesRepository = getCustomRepository(MessagesRepository);

    const message = messagesRepository.create({ admin_id, user_id, text });

    await messagesRepository.save(message);

    return message;
  }
}

export { MessagesService };
