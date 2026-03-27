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
