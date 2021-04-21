import { SettingsController } from '@controllers/SettingsController';
import { Router } from 'express';
import settingsValidator from 'src/validators/settingsValidator';

const routes = Router();

const settingsController = new SettingsController();

routes.post('/', settingsValidator, settingsController.create);

export default routes;
