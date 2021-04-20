import { Setting } from '@entities/Setting';
import { SettingsRepository } from '@repositories/SettingsRepository';

interface SettingRequest {
  chat: boolean;
  username: string;
}

class CreateSettingService {
  async execute({ chat, username }: SettingRequest): Promise<Setting> {
    if (!chat || !username) {
      throw new Error('Invalid Request');
    }

    const settingsRepository = new SettingsRepository();

    const settings = settingsRepository.create({ chat, username });

    await settingsRepository.save(settings);

    return settings;
  }
}

export { CreateSettingService };
