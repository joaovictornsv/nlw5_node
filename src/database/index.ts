import { Connection, createConnection } from 'typeorm';
import connections from './ormconfig.json';

export default async (): Promise<Connection> => {
  const env = process.env.NODE_ENV || 'development';
  return createConnection(connections[env]);
};
