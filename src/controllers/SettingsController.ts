import { SettingsService } from '@services/SettingsService';
import { Request, Response } from 'express';

class SettingsController {
  private settingsService: SettingsService;

  constructor() {
    this.settingsService = new SettingsService();
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { chat, username } = request.body;

    try {
      const settings = await this.settingsService.create({ chat, username });

      return response.status(201).json(settings);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export { SettingsController };
