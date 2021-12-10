console.log("connected!");

let number=0
let socket = io("http://localhost:8888");
let message=[]
var userName = prompt("Please enter your name:","");

$(document). ready(function (){


    socket.on('greeting', function (oldMsgs) { //4
        console.log("mensajes anteriores vuelven al cliente: ",oldMsgs);
        console.log("mensajes anteriores vuelven al cliente: ",oldMsgs.length);
        
        for (var i=0;i<oldMsgs.length; i++){
            console.log("lista de mensajes: ",oldMsgs[i])
            previousMessage = 
            `<p>${oldMsgs[i]} </p>`;
            console.log("esto es loque queda en los mensajes anteriores ",previousMessage)

            $('.previousMessages').append(previousMessage);
        }
        
    });

})

$('.form').on('submit', function(event){
    event.preventDefault();
    console.log("event: ",event.target.message.value);
    let message =event.target.message.value
    console.log("aqui va userName: ",userName)
    let messageInfo ={
        name: userName,
        message: message
    }
    socket.emit('message', messageInfo);
});

socket.on('toChatroom', function (data) {
    console.log("data que sera renderizada: ",data);

    console.log("data que sera renderizada: ",data.name);
    console.log("data que sera renderizada: ",data.message);


    let userInfo = 
    `<p>${data.name}: ${data.message}</p>`;
    $('.userInfo').append(userInfo);
    socket.emit('previousMessages',userInfo)
});