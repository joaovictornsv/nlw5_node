import { Router } from 'express';
import SettingsRouter from '@routers/SettingsRouter';

const routes = Router();

routes.use(SettingsRouter);

export default routes;
