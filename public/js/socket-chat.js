var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('name') || !params.has('room')) {
    window.location = 'index.html';
    throw new Error('Name and room are needed');
}

var user = {
    name: params.get('name'),
    room: params.get('room')
};

socket.on('connect', function() {
    console.log('Connected to Server');

    socket.emit('loginChat', user, function(data) {
        usersRender(data);
    });
});

socket.on('disconnect', function() {

    console.log('Server disconnected');

});

socket.on('sendMessage', function(user) {

    messagesRender(user, false);
    scrollBottom();

});

socket.on('listUsers', function(people) {
    usersRender(people);
});

socket.on('directMessage', function(data) {
    console.log(message);
});