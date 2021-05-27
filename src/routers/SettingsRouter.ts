import { SettingsController } from '@controllers/SettingsController';
import { Router } from 'express';
import settingsValidator from '../validators/settingsValidator';

const routes = Router();

const settingsController = new SettingsController();

routes.post('/', settingsValidator, settingsController.create);
routes.get('/:username', settingsController.findByUsername);
routes.put('/:username', settingsController.update);

export default routes;
