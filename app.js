var fs = require('fs'); //file system
const options = {
	key: fs.readFileSync('./keys/key.pem'),
	cert: fs.readFileSync('./keys/cert.pem')
};

var express = require('express');
var app = express();
var server = app.listen(8080, function(){
    console.log('https://143.248.109.186:8080');
});

app.get('/',function(req,res){
   res.render('index')
});

app.get('/d3example',function(req,res){
   res.render('d3example')
});

app.get('/draw',function(req,res){
   res.render('draw')
});

// Views
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname));

var io = require('socket.io')(server);

io.on('connection',function (socket) {
  console.log("We have a new client: " + socket.id);
  socket.on('mouse',function(data) {
      console.log("Received: 'mouse' " + data.x + " " + data.y + " ");
      io.emit('mouse', data);
		});

	socket.on('circle', function(data){
		console.log(data)
    io.emit('circle', data)
  });

	socket.on('test', function(data){
		console.log(data)
		io.emit('test', data)
	});
});
