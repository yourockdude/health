import * as express from 'express';
import * as http from 'http';
import * as socketIo from 'socket.io';

class Server {
    static PORT = 8080;
    app;
    port;
    server;
    io;

    static bootstrap(): Server {
        return new Server();
    }

    constructor() {
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }

    createApp() {
        this.app = express();
    }

    createServer() {
        this.server = http.createServer(this.app);
    }

    config() {
        this.port = Server.PORT;
    }

    sockets() {
        this.io = socketIo(this.server);
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`running server on ${this.port}`);
        });

        this.io.on('connect', (socket: any) => {
            console.log('connected client on %s', this.port);

            socket.on('enter-room', (data) => {
                console.log(`user ${data.user} joined on room ${data.room}`);
                socket.join(data.room);
            });

            socket.on('send-message', (data) => {
                console.log(`user ${data.fromId} send message "${data.message}" in romm ${data.room}`);
                this.io.in(data.room).emit('receive-message', data);
            });

            socket.on('disconnect', () => {
                console.log('client disconnected');
            });
        });
    }
}

const server = Server.bootstrap();
export default server.app;
