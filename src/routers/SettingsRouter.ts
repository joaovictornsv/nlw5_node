import { SettingsController } from '@controllers/SettingsController';
import { Router } from 'express';

const routes = Router();

const settingsController = new SettingsController();

routes.post('/', settingsController.create);

export default routes;
