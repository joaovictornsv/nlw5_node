import { Message } from '@entities/Message';
import { MessagesRepository } from '@repositories/MessagesRepository';
import { getCustomRepository, Repository } from 'typeorm';

interface ICreateMessage {
  admin_id?: string;
  user_id: string;
  text: string
}

class MessagesService {
  private messagesRepository: Repository<Message>;

  constructor() {
    this.messagesRepository = getCustomRepository(MessagesRepository);
  }

  async create({ admin_id, user_id, text }: ICreateMessage) {
    const message = this.messagesRepository.create({ admin_id, user_id, text });

    await this.messagesRepository.save(message);

    return message;
  }

  async listByUser(id: string) {
    const list = await this.messagesRepository.find({
      where: { id },
      relations: ['user'],
    });

    return list;
  }
}

export { MessagesService };
