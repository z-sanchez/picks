import React, {useState} from "react";
import Sidebar from "../layouts/Sidebar";
import GameData from "./GameData";
import {findWeeksGames} from "../Api/sportsDataAPI";
import {updateCache, doesExist, getData} from "../Api/apiCache";

function PicksInterface() {

    const [games, setGames] = useState([]);
    const [week, setWeek] = useState(18);
    const [year, setYear] = useState(2021);


    async function fetchGames() {
        if (doesExist(year, week) === false) {
            console.log("Fetched from API");
            const gamesFound = await findWeeksGames(week, year);
            updateCache(year, week, gamesFound);
            setGames(gamesFound);
        } else if (games.length === 0) {
            setGames(getData(year, week));
        }
    }

    fetchGames();


    function renderGames() {
        if (games.length !== 0) {
            return ([games.map((game, index) => {
                return <GameData id={game} key={index}/>
            }), <button key="sub" className="buttons mx-2 my-5 mx-lg-5">Submit Picks</button>])
        } else return null;
    }

    // function updateWeek(foward) {
    //     let week
    //     if (foward)
    //
    // }


    return (
        <div className="col-lg-11 order-1 order-lg-2 d-flex flex-column align-items-center" id="contentWrapper">
            <div id="pageHeader" className="align-self-start w-100 px-2 mt-5 d-flex flex-column flex-lg-row justify-content-between">
                <div className="d-flex flex-column">
                    <h1>{year + " WEEK " + week}</h1>
                    <div className="textBar"/>
                </div>
                <div className="d-flex mt-5 justify-content-center align-items-center align-self-lg-end">
                    <button key="sub" className="buttons m-0 mx-2">Previous Week</button>
                    <button key="sub" className="buttons m-0 mx-2">Next Week</button>
                </div>
            </div>

            {renderGames()}

        </div>
    );
}

export default PicksInterface;





