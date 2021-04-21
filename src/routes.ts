import { Router } from 'express';
import SettingsRouter from '@routers/SettingsRouter';
import UsersRouter from '@routers/UsersRouter';

const routes = Router();

routes.use('/settings', SettingsRouter);
routes.use('/users', UsersRouter);

export default routes;
