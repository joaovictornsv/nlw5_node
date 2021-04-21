import { UserController } from '@controllers/UserController';
import { Router } from 'express';

const routes = Router();

const userController = new UserController();

routes.post('/', userController.create);

export default routes;
