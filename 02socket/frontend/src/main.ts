import './style.css'



let gameRows = document.getElementById("gameRows") as HTMLTableSectionElement;


function getAuctions(){
    fetch('http://localhost:3000/api/game')
    .then(response => response.json())
    .then(data => {
        data.forEach((game:any) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>
                <a href="/game.html?id=${game.id}">
                ${game.id}</a>
                </td>
                <td>${game.team1}</td>
                <td>${game.team2}</td>
                <td>${game.score1} - ${game.score2}</td>
            `;
            gameRows.appendChild(row);
        });
    });
}



getAuctions();