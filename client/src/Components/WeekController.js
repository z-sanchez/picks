import React, {useState} from "react";
import GameData from "./GameData";
import {findWeeksGames} from "../Api/sportsDataAPI";

function WeekController() {

    const [games, setGames] = useState([]);
    const [week, setWeek] = useState('1');



    async function fetchGames() {
        if (games.length === 0) {
            const gamesFound = await findWeeksGames(week);
            setGames(gamesFound);
        }
    }

    fetchGames();

    function renderGames() {
        if (games.length !== 0) {
            return games.map((game, index) => {
                return <GameData id={game} key={index}/>
            })
        }
        else return null;
    }


    return (
        <div className="App">
            <header className="App-header">
                {renderGames()}
            </header>
        </div>
    );
}

export default WeekController;
