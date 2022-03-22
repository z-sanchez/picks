import React, {useState, useEffect, useContext} from "react";
import {signOutApp, submitUserPicks} from "../firebase/firebase";
import GameData from "./GameData";
import {findWeeksGames} from "../Api/sportsDataAPI";
import {updateCache, doesExist, getData} from "../Api/apiCache";
import uniqid from 'uniqid';
import userContext from "../utilities/UserContext";
import {advanceWeekPrompt} from "../utilities/domManipulators";


function PicksInterface() {

    const context = useContext(userContext);
    const [user, setUser] = useState(context.user);
    const [games, setGames] = useState([]);
    const [week, setWeek] = useState(1);
    const [year, setYear] = useState(2021);
    const [endOfWeek, setEndOfWeek] = useState(false);


    useEffect(() => {
        async function fetchGames() {
            if (doesExist(year, week) === false) {
                await findWeeksGames(week, year)
                    .then((gamesFound) => {
                        updateCache(year, week, gamesFound);
                        setGames(gamesFound);
                    })
                    .catch((message) => {
                        console.log("fetch aborted in PicksInterface");
                    });
            } else if (games.length === 0) { //check if games haven't been picked from cache already
                setGames(getData(year, week));
            } else if (getData(year, week)[0] !== games[0]) { //if state holds cache value from different week
                setGames(getData(year, week));
            }
        }

        if (user !== context.user) {
            setUser(context.user);
        }

        if (games.length === 0) fetchGames();
    }, [user, games.length, games, week, year, context.user]);


    function updateWeek(forward) {
        if (forward && week + 1 > 18) return null;
        else if (!forward && week - 1 < 1) return null;
        else if (forward) {
            setGames([]);
            setWeek(week + 1);
        } else {
            setGames([]);
            setWeek(week - 1);
        }
    }

    function handleSubmit() {
        submitUserPicks(context.user);
        advanceWeekPrompt();
        setEndOfWeek(true);
    }

    function renderGames() {

        let submitButton = (<button key={uniqid()} className="buttons mx-2 my-5 mx-lg-5" id="submitButton"
                              onClick={handleSubmit}>Submit Picks</button>);
        if (endOfWeek) submitButton = null;
        if (games.length !== 0) {
            return [games.map((game) => {
                return <GameData id={game} week={week} year={year} end={endOfWeek} key={uniqid()}/>
            }), submitButton];
        } else return null;
    }

    let score = (<h1 className="text-center">Your Score: getUserScore</h1>);
    if (!endOfWeek) score = null;


    return (
        <div className="col-lg-11 order-1 order-lg-2 d-flex flex-column align-items-center" id="contentWrapper">
            <div id="pageHeader"
                 className="align-self-start w-100 px-2 my-5 d-flex flex-column flex-lg-row justify-content-between">
                <div className="d-flex flex-column">
                    <h1 onClick={signOutApp}>{year + " WEEK " + week}</h1>
                    <div className="textBar"/>
                </div>
                <div className="d-flex mt-5 mt-lg-0 justify-content-center align-items-center align-self-lg-end">
                    <button className="buttons m-0 mx-2" onClick={() => updateWeek(false)}>Previous Week
                    </button>
                    <button className="buttons m-0 mx-2" onClick={() => updateWeek(true)}>Next Week</button>
                </div>
            </div>
            {score}
            {renderGames()}
        </div>
    );
}

export default PicksInterface;





