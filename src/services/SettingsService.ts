import { Setting } from '@entities/Setting';
import { SettingsRepository } from '@repositories/SettingsRepository';
import { getCustomRepository, Repository } from 'typeorm';
import { HttpException } from '../middlewares/HttpException';

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

  async findByUsername(username: string) {
    const settings = this.settingsRepository.findOne({ username });

    return settings;
  }

  async update(username: string, chat: boolean) {
    const settings = await this.settingsRepository.findOne({ username });

    settings.chat = chat;

    await this.settingsRepository.save(settings);
  }
}

export { SettingsService };
