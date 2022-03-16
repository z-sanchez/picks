import React, {useState, useEffect} from "react";
import GameData from "./GameData";
import {findWeeksGames} from "../Api/sportsDataAPI";
import {updateCache, doesExist, getData} from "../Api/apiCache";
import uniqid from 'uniqid';




function PicksInterface() {

    const [games, setGames] = useState([]);
    const [week, setWeek] = useState(1);
    const [year, setYear] = useState(2021);


    async function fetchGames() {
        if (doesExist(year, week) === false) {
            await findWeeksGames(week, year)
                .then((gamesFound) => {
                    updateCache(year, week, gamesFound);
                    setGames(gamesFound);
                })
                .catch((message) => {
                    console.log("fetch aborted")
                });
        } else if (games.length === 0) {
            setGames(getData(year, week));
        } else if (getData(year, week)[0] !== games[0]) {
            setGames(getData(year, week));
        }
    }


    useEffect(() => {
        fetchGames();
    })


    function updateWeek(forward) {
        if (forward && week + 1 > 18) return null;
        else if (!forward && week - 1 < 1) return null;
        else if (forward) setWeek(week + 1);
        else setWeek(week - 1);
        fetchGames();
    }


    function renderGames() {
        if (games.length !== 0) {
            return games.map((game) => {
                return <GameData id={game} key={uniqid()}/>
            });
        } else return null;
    }


    return (
        <div className="col-lg-11 order-1 order-lg-2 d-flex flex-column align-items-center" id="contentWrapper">
            <div id="pageHeader"
                 className="align-self-start w-100 px-2 my-5 d-flex flex-column flex-lg-row justify-content-between">
                <div className="d-flex flex-column">
                    <h1>{year + " WEEK " + week}</h1>
                    <div className="textBar"/>
                </div>
                <div className="d-flex mt-5 mt-lg-0 justify-content-center align-items-center align-self-lg-end">
                    <button className="buttons m-0 mx-2" onClick={() => updateWeek(false)}>Previous Week
                    </button>
                    <button className="buttons m-0 mx-2" onClick={() => updateWeek(true)}>Next Week</button>
                </div>
            </div>

            {[renderGames(),  <button key={uniqid()} className="buttons mx-2 my-5 mx-lg-5" id="submitButton">Submit Picks</button>]}
        </div>
    );
}

export default PicksInterface;





