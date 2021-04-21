import { User } from '@entities/User';
import { UserRepository } from '@repositories/UserRepository';
import { getCustomRepository, Repository } from 'typeorm';

class UsersService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = getCustomRepository(UserRepository);
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
}

export { UsersService };
