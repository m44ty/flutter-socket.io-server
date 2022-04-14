const { io } = require('../index.js');
const Band = require('../models/band.js');
const Bands = require('../models/bands.js');

const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Matalica'));
bands.addBand(new Band('Heroes del Silencio'));


// Mensaje de sockets
io.on('connection', client => {
    console.log('cliente conectado');

    //Emitir bandas activas al conectarse el cliente
    client.emit('active-bands', bands.getBands());


    client.on('disconnect', () => {
        console.log('cliente desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log('Mensaje!!!', payload);

        io.emit('mensaje', { admin: 'Nuevo mensaje' })
    });

    client.on('emitir-vote-band', (payload) => {
        console.log(payload);
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (payload) => {
        console.log('Creando Banda!');
        bands.addBand(new Band(payload.name));
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload) => {
        console.log('Eliminando Banda!');
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('emitir-mensaje', (payload) => {
        client.broadcast.emit('nuevo-mensaje', payload);

    });

});