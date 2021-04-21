import { SettingsService } from '@services/SettingsService';
import { Request, Response } from 'express';

class SettingsController {
  async create(request: Request, response: Response): Promise<Response> {
    const settingsService = new SettingsService();
    const { chat, username } = request.body;

    const settings = await settingsService.create({ chat, username });

    return response.status(201).json(settings);
  }
}

export { SettingsController };
