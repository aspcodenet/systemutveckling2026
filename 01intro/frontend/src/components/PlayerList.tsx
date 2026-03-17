import { useEffect, useState } from "react";

export function PlayerList() {
    const [players, setPlayers] = useState([]);

    // Fetch players from the API when the component mounts
    useEffect(() => {
        fetch("http://localhost:3000/api/players")
            .then((response) => response.json())
            .then((data) => setPlayers(data));
    }, []);

    return (
        <ul>
            {players.map((player:any) => (
                <li key={player.id}>{player.namn}</li>
            ))}

        </ul>

    )
}

