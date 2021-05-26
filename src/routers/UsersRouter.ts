import { UserController } from '@controllers/UserController';
import { Router } from 'express';
import userValidator from 'src/validators/userValidator';
import { UserRepository } from '@repositories/UserRepository';

const routes = Router();

const userController = new UserController(UserRepository);

routes.post('/', userValidator, userController.create);

export default routes;
