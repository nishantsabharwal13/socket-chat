let express = require('express');
let app = express();

let socket = require('socket.io');

let server = app.listen(4000, () => {
  console.log('listening to 4000')
});


//static files

app.use(express.static('public'));


//socket setup 

let io = socket(server);

io.on('connection',function(socket) {
  console.log('made socket connection',socket.id);

  //Handling chat event
  socket.on('chat', data => {
    io.sockets.emit('chat',data);
  });

  //Typing message
  socket.on('typing', data => {
    socket.broadcast.emit('typing', data);

  })
});