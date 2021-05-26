import { User } from '@entities/User';
import { EntityRepository, Repository } from 'typeorm';
import { IUser } from '../interfaces/entities/IUser';

@EntityRepository(User)
class UserRepository extends Repository<IUser> {}

export { UserRepository };
