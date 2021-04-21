import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import routes from './routes';
import './database';
import MiddlewareException from './middlewares/MiddlewareException';

const app = express();

app.use(express.json());

app.use(routes);
app.use(MiddlewareException);

export { app };
