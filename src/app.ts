import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import { createServer } from 'http';
import { Socket, Server } from 'socket.io';
import path from 'path';

import routes from './routes';
import createConnection from './database';
import MiddlewareException from './middlewares/MiddlewareException';

createConnection();
const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));
app.set('views', path.join(__dirname, '..', 'public'));
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');

app.get('/pages/client', (req, res) => res.render('html/client.html'));
app.get('/pages/admin', (req, res) => res.render('html/admin.html'));

const http = createServer(app);
const io = new Server(http);

io.on('connection', (socket: Socket) => {
  console.log('Connection established', socket.id);
});

app.use(express.json());

app.use(routes);
app.use(MiddlewareException);

export { http, io };
