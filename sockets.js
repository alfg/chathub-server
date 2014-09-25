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
          console.log('a user disconnected');
        });

        socket.on('room', function(room, profile) {
            socket.join(room);
            socket.nickname = profile ? profile.login : "Anonymous";
            socket.thumbnail =  profile ? profile.thumbnail : "https://avatars0.githubusercontent.com/u/1746301";
            socket.html_url = profile ? profile.html_url : "#";



            // Build users
            var users = [];
            var clients = io.sockets.adapter.rooms[room];
            for (var id in clients) {
                var obj = {};
                obj["nickname"] = io.sockets.adapter.nsp.connected[id].nickname;
                obj["thumbnail"] = io.sockets.adapter.nsp.connected[id].thumbnail;
                obj["html_url"] = io.sockets.adapter.nsp.connected[id].html_url;
                users.push(obj);
                console.log(io.sockets.adapter.nsp.connected[id].nickname);
            }

            var msg = socket.nickname + " has entered the room.";
            io.sockets.in(room).emit('user connected', msg, users);

            console.log('a user connected to room ' + room);

            socket.on('disconnect', function(){
                // Build users
                var users = [];
                var clients = io.sockets.adapter.rooms[room];
                for (var id in clients) {
                    var obj = {};
                    obj["nickname"] = io.sockets.adapter.nsp.connected[id].nickname;
                    obj["thumbnail"] = io.sockets.adapter.nsp.connected[id].thumbnail;
                    obj["html_url"] = io.sockets.adapter.nsp.connected[id].html_url;
                    users.push(obj);
                    console.log(io.sockets.adapter.nsp.connected[id].nickname);
                }

                var msg = socket.nickname + " has left the room.";
                io.sockets.in(room).emit('user disconnected', msg, users);
                console.log(socket.nickname + ' disconnected');
            });
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
