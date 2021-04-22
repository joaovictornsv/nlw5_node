import { SettingsService } from '@services/SettingsService';
import { Request, Response } from 'express';

class SettingsController {
  async create(request: Request, response: Response): Promise<Response> {
    const settingsService = new SettingsService();
    const { chat, username } = request.body;

    const settings = await settingsService.create({ chat, username });

    return response.status(201).json(settings);
  }

  async findByUsername(request: Request, response: Response): Promise<Response> {
    const { username } = request.params;

    const settingsService = new SettingsService();
    const settings = await settingsService.findByUsername(username);

    return response.status(200).json(settings);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { username } = request.params;
    const { chat } = request.body;

    const settingsService = new SettingsService();

    await settingsService.update(username, chat);

    return response.status(200).json({ message: 'Settings updated!' });
  }
}

export { SettingsController };
