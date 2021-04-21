import { Router } from 'express';
import SettingsRouter from '@routers/SettingsRouter';
import UsersRouter from '@routers/UsersRouter';
import MessagesRouter from '@routers/MessagesRouter';

const routes = Router();

routes.use('/settings', SettingsRouter);
routes.use('/users', UsersRouter);
routes.use('/messages', MessagesRouter);

export default routes;
