import { Connection } from '@entities/Connection';
import { Repository } from 'typeorm';

class ConnectionsRepository extends Repository<Connection> {}

export { ConnectionsRepository };
