const { io } = require('../server');
const { Users } = require('../classes/users');
const { sendMessage } = require('../utils/utils');

const users = new Users();

io.on('connection', (client) => {

    client.on('loginChat', (user, callback) => {

        if (!user.name || !user.room) {
            return callback({
                ok: false,
                error: { message: 'Name and room are needed' }
            });
        }

        client.join(user.room);

        users.addUser(client.id, user.name, user.room);

        client.broadcast.to(user.room).emit('listUsers', users.getUsersByRoom(user.room));
        callback(users.getUsersByRoom(user.room));

    });

    client.on('disconnect', () => {
        let deletedUser = users.deleteUser(client.id);
        client.broadcast.to(deletedUser.room).emit('sendMessage', sendMessage('Admin', `${deletedUser.name} left!`))
        client.broadcast.to(deletedUser.room).emit('listUsers', users.getUsersByRoom(deletedUser.room));
    });

    client.on('sendMessage', (data) => {
        let user = users.getUsers(client.id);
        let message = sendMessage(user.name, data.message);
        client.broadcast.to(user.room).emit('sendMessage', message);
    });

    client.on('directMessage', (data) => {
        let user = users.getUsers(client.id);
        client.broadcast.to(data.to).emit('directMessage', sendMessage(user.name, data.message));
    });


});