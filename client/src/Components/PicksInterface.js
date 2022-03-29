import React, {useState, useEffect, useContext} from "react";
import {signOutApp, submitUserPicks} from "../firebase/firebase";
import GameData from "./GameData";
import {findWeeksGames} from "../Api/sportsDataAPI";
import {updateCache, doesExist, getData} from "../Api/apiCache";
import uniqid from 'uniqid';
import userContext from "../utilities/UserContext";
import {advanceWeekPrompt} from "../utilities/domManipulators";
import {calculateUserScore, getScoreFromUserCache, isWeekFinished, validPicks} from "../firebase/userCache";
import {endWeek} from "../firebase/userCache";

function PicksInterface() {

    const context = useContext(userContext);
    const [user, setUser] = useState(context.user);
    const [week, setWeek] = useState(1);
    const [year, setYear] = useState(2021);
    const [gameObject, setGameObject] = useState({games: [], endOfWeek: false});

    async function fetchGames() {
        if (doesExist(year, week) === false) {
            await findWeeksGames(week, year)
                .then((gamesFound) => {
                    updateCache(year, week, gamesFound);
                    setGameObject({
                        games: gamesFound,
                        endOfWeek: isWeekFinished(year, week),
                    });
                })
                .catch((message) => {
                    console.log("fetch aborted in PicksInterface: " + message);
                });
        } else if (gameObject.games.length === 0) { //check if games haven't been picked from cache already
            setGameObject({
                games: getData(year, week),
                endOfWeek: isWeekFinished(year, week),
            });
        } else if (getData(year, week)[0] !== gameObject.games[0]) { //if state holds cache value from different week
            setGameObject({
                games: getData(year, week),
                endOfWeek: isWeekFinished(year, week),
            });
        }
    }


    useEffect(() => {
        if (user !== context.user) {
            setUser(context.user);
        }

        fetchGames();

    }, [user, context.user, fetchGames]);


    function updateWeek(forward) {
        if (forward && week + 1 > 18) return null;
        else if (!forward && week - 1 < 1) return null;
        else if (forward) {
            setWeek(week + 1);
        } else {
            setWeek(week - 1);
        }
    }

    function handleSubmit() {
        //alert for no pick, match games added to cache to amount of games in week data, if descrepency abort function with alert
        if (!validPicks(year, week, gameObject.games)) {
            alert("Missing picks");
            return
        }
        endWeek(year, week); //this should be moved after demo. This method is responsible for ending entire week in real time
        calculateUserScore(year, week);
        submitUserPicks(context.user, year, week);
        advanceWeekPrompt();
    }

    function renderGames() {

        let submitButton = (<button key={uniqid()} className="buttons mx-2 my-5 mx-lg-5" id="submitButton"
                                    onClick={handleSubmit}>Submit Picks</button>);
        if (gameObject.endOfWeek) submitButton = null;

        if (gameObject.games.length !== 0) {
            return [gameObject.games.map((game) => {
                return <GameData id={game} week={week} year={year} end={gameObject.endOfWeek} key={uniqid()}/>
            }), submitButton];
        } else return null;
    }


    let score = null;
    if (gameObject.endOfWeek) score = (<h1 className="text-center">{"Your Score: " + getScoreFromUserCache(year, week)}</h1>);


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




