import { Setting } from '@entities/Setting';
import { SettingsRepository } from '@repositories/SettingsRepository';

interface ISettingsCreate {
  chat: boolean;
  username: string;
}

class SettingsService {
  async create({ chat, username }: ISettingsCreate): Promise<Setting> {
    if (!chat || !username) {
      throw new Error('Invalid Request');
    }

    const settingsRepository = new SettingsRepository();

    const userAlreadyExists = await settingsRepository.findOne({ username });

    if (!userAlreadyExists) {
      throw new Error('User already exists');
    }

    const settings = settingsRepository.create({ chat, username });

    await settingsRepository.save(settings);

    return settings;
  }
}

export { SettingsService };
