import { ConnectionsService } from '@services/ConnectionsService';
import { MessagesService } from '@services/MessagesService';
import { io } from '../app';

io.on('connect', async (socket) => {
  const connectionsService = new ConnectionsService();
  const messagesService = new MessagesService();

  const AllConnectionsWithoutAdmin = await connectionsService.findAllWithoutAdmin();

  io.emit('admin_list_all_users', AllConnectionsWithoutAdmin);

  socket.on('admin_list_messages_by_user', async (params, callback) => {
    const { user_id } = params;

    const messages = await messagesService.listByUser(user_id);

    callback(messages);
  });

  socket.on('admin_send_message', async (params) => {
    const { text, user_id } = params;

    await messagesService.create({
      text,
      user_id,
      admin_id: socket.id,
    });

    const { socket_id } = await connectionsService.findByUserId(user_id);

    io.to(socket_id).emit('admin_send_to_client', {
      text,
      socket_id: socket.id,
    });
  });

  socket.on('admin_user_in_support', async (params) => {
    const { user_id } = params;

    await connectionsService.updateAdminId(user_id, socket.id);

    // eslint-disable-next-line no-shadow
    const AllConnectionsWithoutAdmin = await connectionsService.findAllWithoutAdmin();

    io.emit('admin_list_all_users', AllConnectionsWithoutAdmin);
  });
});
