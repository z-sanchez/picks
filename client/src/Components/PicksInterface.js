import React, {useState, useEffect, useContext} from "react";
import {signOutApp, submitUserPicks} from "../firebase/firebase";
import GameData from "./GameData";
import {findWeeksGames} from "../Api/sportsDataAPI";
import {updateCache, doesExist, getData} from "../Api/apiCache";
import uniqid from 'uniqid';
import userContext from "../utilities/UserContext";
import {advanceWeekPrompt} from "../utilities/domManipulators";
import {getScoreFromUserCache, isWeekFinished, validPicks} from "../firebase/userCache";
import {endWeek} from "../firebase/userCache";

function PicksInterface() {

    const context = useContext(userContext);
    const [user, setUser] = useState(context.user);
    const [year, setYear] = useState(2021);
    const [gameObject, setGameObject] = useState({games: [], endOfWeek: false, week: 1});


    useEffect(() => {
        if (user !== context.user) {
            setUser(context.user);
        }

        async function fetchGames() {
            if (doesExist(year, gameObject.week) === false) {
                await findWeeksGames(gameObject.week, year)
                    .then((gamesFound) => {
                        updateCache(year, gameObject.week, gamesFound);
                        setGameObject({
                            games: gamesFound,
                            endOfWeek: isWeekFinished(year, gameObject.week),
                            week: gameObject.week
                        });
                    })
                    .catch((message) => {
                        console.log("fetch aborted in PicksInterface: " + message);
                    });
            } else if (getData(year, gameObject.week)[0] !== gameObject.games[0]) { //if state holds cache value from different week
                setGameObject({
                    games: getData(year, gameObject.week),
                    endOfWeek: isWeekFinished(year, gameObject.week),
                    week: gameObject.week,
                });
            }
        }

        fetchGames();

    }, [user, context.user, year, gameObject.week, gameObject.games]);


    function updateWeek(forward) {
        if (forward && gameObject.week + 1 > 18) return null;
        else if (!forward && gameObject.week - 1 < 1) return null;
        else if (forward) {
            setGameObject({games: [], endOfWeek: false, week: gameObject.week + 1});
        } else {
            setGameObject({games: [], endOfWeek: false, week: gameObject.week - 1});
        }
    }

    function handleSubmit() {
        //alert for no pick, match games added to cache to amount of games in week data, if descrepency abort function with alert
        if (!validPicks(year, gameObject.week, gameObject.games)) {
            alert("Missing picks");
            return
        }
        endWeek(year, gameObject.week); //this should be moved after demo. This method is responsible for ending entire week in real time
        submitUserPicks(context.user, year, gameObject.week);
        setGameObject({games: gameObject.games, endOfWeek: true, week: gameObject.week});
        advanceWeekPrompt();
    }

    function renderGames() {
        let submitButton = (
            <button key={uniqid()} className="buttons mx-2 mb-5 mx-lg-5" id="submitButton" onClick={handleSubmit}>Submit
                Picks</button>);
        if (gameObject.endOfWeek || context.user !== context.currentUser) submitButton = null;

        if (gameObject.games.length !== 0) {
            return [gameObject.games.map((game) => {
                return <GameData id={game} week={gameObject.week} year={year} end={gameObject.endOfWeek}
                                 key={uniqid()}/>
            }), submitButton];
        } else return null;
    }


    let score = null;
    if (gameObject.endOfWeek) score = (
        <h1 className="text-center my-3">{"Your Score: " + getScoreFromUserCache(year, gameObject.week)}</h1>);

    let backToMainUser = null;
    if (context.user !== context.currentUser) backToMainUser = (<p className="headerNav__item" onClick={() => {context.updateUser(context.currentUser)}}>Back to Main User</p>);


    return (
        <div className="col-lg-11 order-1 order-lg-2 d-flex flex-column align-items-center" id="contentWrapper">
            <div id="pageHeader"
                 className="align-self-start w-100 px-2 my-5 d-flex flex-column flex-lg-row justify-content-between">
                <div className="d-flex flex-row headerNav">
                    <p className="headerNav__item" onClick={signOutApp}>Sign Out</p>
                    {backToMainUser}
                </div>
                <div className="d-flex flex-column">
                    <h1>{context.user + "'s WEEK " + gameObject.week + " PICKS"}</h1>
                    <div className="textBar"/>
                </div>
            </div>
            <div className="d-flex justify-content-center align-items-center">
                <button className="buttons m-0 mx-2" onClick={() => updateWeek(false)}>Previous Week
                </button>
                <button className="buttons m-0 mx-2" onClick={() => updateWeek(true)}>Next Week</button>
            </div>
            {score}
            {renderGames()}
        </div>
    );
}

export default PicksInterface;




