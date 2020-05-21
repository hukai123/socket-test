var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  //res.sendFile(__dirname + '/index.html');
  res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
    
//   console.log(socket);
//   console.log(http);
//   url: '/socket.io/?roomName=111&EIO=3&transport=polling&t=N8BzRS7',
//   query: { roomName: '111', EIO: '3', transport: 'polling', t: 'N8BzRS7' }

socket.broadcast.emit('success','连接成功！');

  console.log('a user connected');

  socket.on("disconnect",function(){
    console.log("a user disconnected");
  });


  socket.on('chat', (msg) => {
    console.log('chat: ' + msg);
    // io.emit('chat', msg);  //给所有客户端广播消息
    //socket.emit()           //给该socket的客户端发送消息
    // socket.to(data.id).emit('receiveMsg', data)  //1对1私聊
    socket.broadcast.emit('msg','这是broadcast消息');   //发给除去发送者之外的其他接收者


    // socket.join(data.info.roomId);
    // io.to(data.info.roomId).emit('chatGrSystemNotice', {
    //     roomId: data.info.roomId,
    //     msg: data.userName+'加入了群聊!',
    //     system: true
    // });


  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });




});


http.listen(3000, () => {
  console.log('listening on *:3000');
});