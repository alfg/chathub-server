//var express = require('express');
//var app = require('app');
//var http = require('http').Server(app);
//var io = require('socket.io')(http);

var socketio = require('socket.io')



module.exports.listen = function(app){
    io = socketio.listen(app);

    io.on('connection', function(socket){
        console.log('a user connected');

        socket.on('disconnect', function(){
          console.log('user disconnected');
        });

//        socket.on('chat message', function(msg){
//          io.emit('chat message', msg);
//          console.log('message: ' + msg);
//        });

        socket.on('room', function(room) {
            socket.join(room);

            var msg = "Someone has entered the room.";
            io.sockets.in(room).emit('user connected', msg);

            console.log('a user connected to room ' + room);
        });

        socket.on('message', function(room, msg, profile){
//            io.emit('message', msg);
            io.sockets.in(room).emit('message', msg, profile);
            console.log('message: ' + msg);
            console.log(profile);
        });

    });
    return io
}
