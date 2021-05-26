import { getCustomRepository } from 'typeorm';
import { IUser } from 'src/interfaces/entities/IUser';
import { IUserRepository } from '../interfaces/repositories/IUserRepository';
import { IRepository } from '../interfaces/repositories/IRepository';

class UsersService {
  private userRepository: IRepository<IUser>;

  constructor(repository: IUserRepository) {
    this.userRepository = getCustomRepository(repository);
  }

  async create(email: string) {
    const userAlreadyExists = await this.userRepository.findOne({ email });

    if (userAlreadyExists) {
      return userAlreadyExists;
    }

    const user = this.userRepository.create({ email });

    await this.userRepository.save(user);

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ email });

    return user;
  }
}

export { UsersService };
