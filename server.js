const express = require('express');
const cors = require("cors");
const fs = require('fs');
const path = require('path');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const server = http.createServer(app);
const { Socket } = require('dgram');
const CryptoJS = require('crypto-js');


const PORT = 7080;
app.use(express.json());

app.use(cors({
    credentials: true,
    origin: function (origin, callback) {
        return callback(null, true)
    }
}));


app.listen(PORT, () => {
    console.log("Server Running [" + PORT + "]");
});



app.post("/hash", (req, res) => {
	console.log(req.body.values[0]) //aqui recibimos el texto introducido en la caja de texto.
	let txt_hash = CryptoJS.SHA256(req.body.values[0]).toString();
    res.send(JSON.stringify(txt_hash)); //enviamos al js del cliente el texto hasheado
});
