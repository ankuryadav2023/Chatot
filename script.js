const socket = io('https://chatot-nodejs-server.onrender.com/');

let usernameinfo = '';
let chatroominfo = '';
let sendmessagebtn = '';
socket.emit('new-connect', 'hello');
socket.on('need-chatroom', (chatroom) => {
    let chatroominp = document.getElementById('chatroominp');
    chatroominp.value = chatroom;
});

function sendmessagefunc() {
    let message = document.getElementById('sendmessageinp').value;
    document.getElementById('sendmessageinp').value = '';
    let chats = document.getElementById('chats');
    chats.innerHTML += `<p class="right">You: ${message}</p>`;
    socket.emit('send-message', [usernameinfo, chatroominfo, message]);
}

function joinchatroomfunc() {
    chatroominfo = document.getElementById('chatroominp').value;
    usernameinfo = document.getElementById('usernameinp').value;
    let nujfcontainer = document.getElementById('nujfcontainer');
    nujfcontainer.style.display = 'none';
    let container = document.getElementById('container');
    container.innerHTML += '<div class="cfcontainer"><div id="chats" class="chats"></div><div class="sendmessage"><input id="sendmessageinp" type="text" name="message" placeholder="Message"/><button id="sendmessagebtn" type="button" onclick="sendmessagefunc()">Send</button></div></div>';
    sendmessagebtn = document.getElementById('sendmessagebtn');
    socket.emit('new-user-joined', [usernameinfo, chatroominfo]);
}

let joinchatroombtn = document.getElementById('joinchatroombtn');
joinchatroombtn.onclick = function () { joinchatroomfunc() };

socket.on('new-user', username => {
    let chats = document.getElementById('chats');
    chats.innerHTML += `<p class="center">${username} joined the chat</p>`;
});

socket.on('recieve-message', data => {
    let chats = document.getElementById('chats');
    chats.innerHTML += `<p class="left">${data[0]}: ${data[1]}</p>`;
});

socket.on('user-left', username => {
    let chats = document.getElementById('chats');
    chats.innerHTML += `<p class="center">${username} left the chat</p>`;
});