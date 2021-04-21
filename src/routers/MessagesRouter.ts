import { MessagesController } from '@controllers/MessagesController';
import { Router } from 'express';

const routes = Router();

const messagesController = new MessagesController();

routes.post('/', messagesController.create);

export default routes;
