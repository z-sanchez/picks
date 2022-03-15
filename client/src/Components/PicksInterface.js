import React, {useState} from "react";
import Sidebar from "../layouts/Sidebar";
import GameData from "./GameData";
import {findWeeksGames} from "../Api/sportsDataAPI";

function PicksInterface() {

    const [games, setGames] = useState([]);
    const [week, setWeek] = useState('3');


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
        } else return null;
    }


    return (
        <div className="col-lg-11 order-1 order-lg-2 d-flex flex-column align-items-center" id="contentWrapper">
            <div id="pageHeader" className="align-self-start px-2 mt-5">
                <h1>2021 WEEK ONE</h1>
                <div className="textBar"/>
            </div>

            {renderGames()}

            <button className="buttons mx-2 my-5 mx-lg-5">Submit Picks</button>
        </div>
    );
}

export default PicksInterface;





