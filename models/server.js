// Express server
const express  = require('express');
const http     = require('http');
const socketio = require('socket.io');
const path     = require('path');
const cors     = require('cors');

const Sockets  = require('./sockets');

class Server {
    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.server = http.createServer( this.app );
        this.io = socketio( this.server, { /* settings */ } );
    }

    middlewares() {
        // Deploy public directory
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );
        // CORS
        this.app.use( cors() );
    }

    configureSockets() {
        new Sockets( this.io );
    }

    execute() {
        // Start Middlewares
        this.middlewares();
        // Start sockets
        this.configureSockets();
        // Start Server
        this.server.listen( this.port, () => {
            console.log('Server running in port:', this.port );
        });
    }
}

module.exports = Server;