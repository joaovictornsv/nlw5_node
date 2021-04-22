import { Connection } from '@entities/Connection';
import { ConnectionsRepository } from '@repositories/ConnectionsRepository';
import { getCustomRepository, Repository } from 'typeorm';

interface ICreateConnection {
  socket_id: string;
  user_id: string;
  admin_id?: string;
  id?: string
}

class ConnectionsService {
  private connectionsRepository: Repository<Connection>;

  constructor() {
    this.connectionsRepository = getCustomRepository(ConnectionsRepository);
  }

  async create({
    socket_id, user_id, admin_id, id,
  }:ICreateConnection) {
    const connection = this.connectionsRepository.create({
      socket_id, user_id, admin_id, id,
    });

    await this.connectionsRepository.save(connection);

    return connection;
  }

  async findByUserId(user_id:string) {
    const connection = this.connectionsRepository.findOne({ user_id });

    return connection;
  }
}

export { ConnectionsService };
