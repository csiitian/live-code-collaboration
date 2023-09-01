const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const bodyParser = require("body-parser");
const cors = require('cors');
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./config/database'); // Connect to the database

const roomRoutes = require('./app/routes/roomRoutes');
const codeRoutes = require('./app/routes/codeRoutes');
const initializeSocket = require('./app/socket/socketHandler'); // Import socket.io handling module

app.use('/', roomRoutes);
app.use('/', codeRoutes);

initializeSocket(server); // Pass the server instance to the socket.io handler

server.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
