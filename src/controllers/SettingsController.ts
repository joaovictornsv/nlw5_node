import { CreateSettingService } from '@services/CreateSettingService';
import { Request, Response } from 'express';

class SettingsController {
  async create(request: Request, response: Response): Promise<Response> {
    const createSettingService = new CreateSettingService();

    const settings = await createSettingService.execute(request.body);

    return response.status(201).json(settings);
  }
}

export { SettingsController };
