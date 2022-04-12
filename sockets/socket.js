const { io } = require('../index.js');

// Mensaje de sockets
io.on('connection', client => {
    console.log('cliente conectado');

    client.on('disconnect', () => {
        console.log('cliente desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log('Mensaje!!!', payload.nombre);

        io.emit('mensaje', { admin: 'Nuevo mensaje' })
    });

});