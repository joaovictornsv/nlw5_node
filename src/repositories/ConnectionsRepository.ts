import { Connection } from '@entities/Connection';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Connection)
class ConnectionsRepository extends Repository<Connection> {}

export { ConnectionsRepository };
