import { UserController } from '@controllers/UserController';
import { Router } from 'express';
import { UserRepository } from '@repositories/UserRepository';
import userValidator from '../validators/userValidator';

const routes = Router();

const userController = new UserController(UserRepository);

routes.post('/', userValidator, userController.create);

export default routes;
