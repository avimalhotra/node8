
    const express=require("express");
    const app=express();
    const http = require('http');
    const server = http.createServer(app);
    app.use(express.static("src/public"));
    app.use(express.static("node_modules/socket.io/client-dist/"));
    const { Server } = require("socket.io");
    const io = new Server(server);

    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

        socket.on('chat message', (msg) => {
            io.emit('chat message', msg);
        });

    });

    
    app.get("/",(req,res)=>{
        //res.status(200).send(`<h1>Chat Application</h1>`);
        res.status(200).sendFile(__dirname + '/public/chat.html')
    });
    
    server.listen(3000,()=>{
        console.log(`App running at http://127.0.0.1:3000`);
    });
    