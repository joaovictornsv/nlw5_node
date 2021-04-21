import { SettingsService } from '@services/SettingsService';
import { Request, Response } from 'express';

class SettingsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { chat, username } = request.body;

    const createSettingService = new SettingsService();

    try {
      const settings = await createSettingService.create({ chat, username });

      return response.status(201).json(settings);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export { SettingsController };
