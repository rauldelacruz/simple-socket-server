// Server Model: express + socket.io server
const Server = require('./models/server');

require('dotenv').config();

const server = new Server();

server.execute();
