import { MessagesController } from '@controllers/MessagesController';
import { Router } from 'express';
import messageValidator from 'src/validators/messageValidator';

const routes = Router();

const messagesController = new MessagesController();

routes.post('/', messageValidator, messagesController.create);
routes.get('/:id', messagesController.showByUser);

export default routes;
