import { UserController } from '@controllers/UserController';
import { Router } from 'express';
import userValidator from 'src/validators/userValidator';

const routes = Router();

const userController = new UserController();

routes.post('/', userValidator, userController.create);

export default routes;
