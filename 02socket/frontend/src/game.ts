import { Socket,io } from "socket.io-client";



function getGameInfo(){
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('id');
    fetch(`http://localhost:3000/api/game/${gameId}`)
    .then(response => response.json())
    .then(game => {
        const team1 = document.getElementById("team1") as HTMLSpanElement;
        const team2 = document.getElementById("team2") as HTMLSpanElement;
        const score1 = document.getElementById("score1") as HTMLSpanElement;
        const score2 = document.getElementById("score2") as HTMLSpanElement;

        team1.textContent = game.team1;
        team2.textContent = game.team2;
        score1.textContent = game.score1.toString();
        score2.textContent = game.score2.toString();

    });
}



getGameInfo();



// Den här raden har ni INTE - ni har ju [].map onclick det är ju id för er
const currentRoom = new URLSearchParams(document.location.search).get('id');

const socket:Socket = io('http://localhost:3000',{
  query: {
      roomName: currentRoom,
  },
});

// Emit explicit join after connect to ensure server-side join
socket.on('connect', () => {
    if (currentRoom) socket.emit('join', currentRoom);
});


socket.on('gameUpdate', (game) => {
    const team1 = document.getElementById("team1") as HTMLSpanElement;
    const team2 = document.getElementById("team2") as HTMLSpanElement;
    const score1 = document.getElementById("score1") as HTMLSpanElement;
    const score2 = document.getElementById("score2") as HTMLSpanElement;

    team1.textContent = game.team1;
    team2.textContent = game.team2;
    score1.textContent = game.score1.toString();
    score2.textContent = game.score2.toString();
});



class HockeyMessage {
    constructor( sender: string, text: string) {
            this.sender = sender;
            this.text = text;
    }   
    sender: string;
    text: string;
}

const sendButton = document.getElementById("send") as HTMLButtonElement;
 sendButton.addEventListener("click", () => {
    const messageInput = document.getElementById("text") as HTMLInputElement;
    const messageText = messageInput.value.trim();
    const nameInput = document.getElementById("name") as HTMLInputElement;  
    const senderName = nameInput.value.trim() || "Anonymous";
    if (messageText) {
        //const message = new HockeyMessage(senderName, messageText);
        const message = { sender: senderName, text: messageText };
        console.log('Message sent:', message);
        alert(`Message sent: ${message.text} by ${message.sender}`);
        socket.emit("someoneTypedSomething", message);
        messageInput.value = "";
    }
});

socket.on("bidResponse", (response) => {
    console.log('Bid response received:', response);
    alert(`Bid response: ${response.message}`);
});

socket.on("anUpdateFromServer", (message) => {
    console.log('Update from server:', message);
    //alert(`Update from server: ${message.text} by ${message.sender}`);
    // append to div messages
    const messagesDiv = document.getElementById("messages") as HTMLDivElement;
    const messageElement = document.createElement("p");
    messageElement.textContent = `${message.sender}: ${message.text}`;
    messagesDiv.appendChild(messageElement);
});

//                   

