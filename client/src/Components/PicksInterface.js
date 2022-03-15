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


            <div className="game my-5 d-flex flex-column">
                <div className="game__away my-3 d-flex flex-column align-items-center justify-content-center">
                    <h1>Dallas Cowboys</h1>
                    <p className="align-self-end">2-1</p>
                </div>
                <div
                    className="game__info d-flex flex-row align-self-center justify-content-between align-items-center">
                    <h1>More</h1>
                    <p className="game__infoAT">@</p>
                    <p className="game__infoTimeDate">2/12/2022 8:00pm</p>
                </div>

                <div className="game__home my-3 d-flex flex-column align-items-center justify-content-center">
                    <h1>Seattle Seahawks</h1>
                    <p className="align-self-end">2-1</p>
                </div>
            </div>
            <div className="textBar my-1"/>
        </div>
    );
}

export default PicksInterface;





