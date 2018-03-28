const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');

server.listen(PORT, () => console.log(`Listening on ${ PORT }`))

app
.use(express.static(path.join(__dirname, 'public')))
.use(bodyParser.urlencoded({ extended: true }))
.use(bodyParser.json())
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs')
.get('/', (req, res) => res.render('pages/index'))
.post('/', (req, res) => {
  io.emit('post', req.body)
  res.send(`PiPlantPortal: POST Recieved`)
});

io.on('connection', function(socket){
  console.log('user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
