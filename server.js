var express = require("express");

var app = express();
var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.urlencoded({ extended: true }));
// static content
app.use(express.static(__dirname + "/public"));
const server = app.listen(8888);
 console.log("listening on port 8888");
const io = require('socket.io')(server);

let oldMsgs=[];

app.set("views", __dirname + "/public");
app.set("view engine", "ejs");

app.get("/", function(request, response){
    console.log("Home");
    response.render("index.ejs");
});


io.on('connection', function (socket) { //2
    console.log("You've reache the server");
    socket.on('previousMessages', function (data) { 
        console.log("data de mensajes anteriores: ",data)
        oldMsgs.push(data)
    socket.emit('greeting', oldMsgs); //3
    });    

});

io.on('connection', function (socket) {
    // console.log(socket);
    socket.on("message", function (data) {

    io.sockets.emit('toChatroom', data);
    console.log("se envia data: ",data) //3

    });
});