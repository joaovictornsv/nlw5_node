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

  async findAllWithoutAdmin() {
    const connections = await this.connectionsRepository.find({
      where: { admin_id: null },
      relations: ['user'],
    });

    return connections;
  }

  async findBySocketId(socket_id:string) {
    const connection = this.connectionsRepository.findOne({
      where: { socket_id },
      relations: ['user'],
    });

    return connection;
  }

  async updateAdminId(user_id:string, admin_id:string) {
    const connection = await this.connectionsRepository.findOne({ user_id });

    connection.admin_id = admin_id;

    await this.connectionsRepository.save(connection);
  }
}

export { ConnectionsService };
