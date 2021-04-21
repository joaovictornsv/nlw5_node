import { Setting } from '@entities/Setting';
import { SettingsRepository } from '@repositories/SettingsRepository';
import { HttpException } from 'src/middlewares/HttpException';
import { getCustomRepository, Repository } from 'typeorm';

interface ISettingsCreate {
  chat: boolean;
  username: string;
}

class SettingsService {
  private settingsRepository: Repository<Setting>;

  constructor() {
    this.settingsRepository = getCustomRepository(SettingsRepository);
  }

  async create({ chat, username }: ISettingsCreate) {
    const userAlreadyExists = await this.settingsRepository.findOne({ username });

    if (userAlreadyExists) {
      throw new HttpException('User already exists');
    }

    const settings = this.settingsRepository.create({ chat, username });

    await this.settingsRepository.save(settings);

    return settings;
  }
}

export { SettingsService };
