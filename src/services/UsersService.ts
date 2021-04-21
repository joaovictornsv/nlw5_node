import { User } from '@entities/User';
import { UserRepository } from '@repositories/UserRepository';
import { getCustomRepository } from 'typeorm';

class UsersService {
  async create(email: string): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const userAlreadyExists = await userRepository.findOne({ email });

    if (userAlreadyExists) {
      return userAlreadyExists;
    }

    const user = await userRepository.create({ email });

    await userRepository.save(user);

    return user;
  }
}

export { UsersService };
