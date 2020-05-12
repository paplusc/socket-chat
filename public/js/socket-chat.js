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
        console.log(data);
    });
});

socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('sendMessage', {
//     usuario: 'Pablo',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });


socket.on('sendMessage', function(user) {

    console.log('Server:', user);

});

socket.on('listUsers', function(people) {
    console.log(people);
});

socket.on('directMessage', function(data) {
    console.log(message);
});