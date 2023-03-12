const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const { Socket } = require("dgram");
const CryptoJS = require("crypto-js");

const io = new Server(server);

const PORT = 7080;

app.use(express.json());

app.use(
    cors({
        credentials: true,
        origin: function (origin, callback) {
            return callback(null, true);
        },
    })
);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
});

app.post("/hash", (req, res) => {
    let result = CryptoJS.SHA256(req.body.values[0]).toString();
    res.send(JSON.stringify(result)); //enviamos al js del cliente el texto hasheado
});

//Controlar les connexions i desconnexions
io.on('connection', (socket) => {
    console.log(`Cliente conectado`);
    
    socket.on('mensaje', (mensaje) => {
      console.log(`Mensaje recibido: ${mensaje}`);
      
      // Envía el mensaje a todos los clientes conectados
      io.emit('mensaje', mensaje);
    });
  });
  

server.listen(PORT, () => {
    console.log("Sockets Running [" + PORT + "]");
});
