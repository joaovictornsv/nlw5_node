import { UserRepository } from '@repositories/UserRepository';
import { ConnectionsService } from '@services/ConnectionsService';
import { MessagesService } from '@services/MessagesService';
import { UsersService } from '@services/UsersService';
import { io } from '../app';

interface IParams {
  text: string;
  email: string;
}

io.on('connect', (socket) => {
  const connectionsService = new ConnectionsService();
  const usersService = new UsersService(UserRepository);
  const messagesService = new MessagesService();

  socket.on('client_first_access', async (params) => {
    const socket_id = socket.id;
    let user_id = null;

    const { text, email } = params as IParams;

    const userExists = await usersService.findByEmail(email);

    if (!userExists) {
      const user = await usersService.create(email);

      await connectionsService.create({
        socket_id,
        user_id: user.id,
      });

      user_id = user.id;
    } else {
      user_id = userExists.id;
      const connection = await connectionsService.findByUserId(userExists.id);

      if (!connection) {
        await connectionsService.create({
          socket_id,
          user_id: userExists.id,
        });
      } else {
        connection.socket_id = socket.id;
        await connectionsService.create(connection);
      }
    }

    await messagesService.create({ text, user_id });

    const allMessages = await messagesService.listByUser(user_id);

    socket.emit('client_list_all_messages', allMessages);

    const AllUsersWithoutAdmin = await connectionsService.findAllWithoutAdmin();

    io.emit('admin_list_all_users', AllUsersWithoutAdmin);
  });

  socket.on('client_send_to_admin', async (params) => {
    const { text, socket_admin_id } = params;

    const socket_id = socket.id;

    const { user, user_id } = await connectionsService.findBySocketId(socket_id);

    const message = await messagesService.create({
      text,
      user_id,
    });

    io.to(socket_admin_id).emit('admin_receive_message', {
      message,
      socket_id,
      user,
    });
  });
});
