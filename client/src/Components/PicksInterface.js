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
    const [user, setUser] = useState(context.user); //PicksInterface will display the data of the user here
    const [year, setYear] = useState(2021);
    const [gameObject, setGameObject] = useState({games: [], endOfWeek: false, week: 1}); //games holds gameIDs, endOfWeek tells component to display results of picks


    useEffect(() => {

        async function fetchGames() {
            if (doesExist(year, gameObject.week) === false) { //check if games are in cache
                await findWeeksGames(gameObject.week, year) //if not, refer to api
                    .then((gamesFound) => {
                        updateCache(year, gameObject.week, gamesFound); //load ids into cache
                        setGameObject({ //change state appropriately
                            games: gamesFound,
                            endOfWeek: isWeekFinished(year, gameObject.week),
                            week: gameObject.week
                        });
                    })
                    .catch((message) => {
                        return message;
                    });
            } else { //grab data from cache
                setGameObject({
                    games: getData(year, gameObject.week),
                    endOfWeek: isWeekFinished(year, gameObject.week),
                    week: gameObject.week,
                });
            }
        }

        fetchGames();

    }, [year, gameObject.week, gameObject.games]);


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
        endWeek(year, gameObject.week); //this should be moved after demo. This method is responsible for ending entire week as soon as called. Component will show results
        submitUserPicks(context.user, year, gameObject.week); //sends picks to firestore
        setGameObject({games: gameObject.games, endOfWeek: true, week: gameObject.week});
        advanceWeekPrompt(); //prompt explaining immediate results
    }

    function submitButton() {
        let submitButton = (
            <button key={uniqid()} className="buttons mx-2 mt-5 mx-lg-5" id="submitButton"
                    onClick={handleSubmit}>Submit
                Picks</button>);
        if (gameObject.endOfWeek || context.user !== context.currentUser) submitButton = null; //buttons doesn't show if week hasn't ended, and if user is viewing another users picks
        return submitButton;
    }

    function renderGames() {
        let lastElement = gameObject.games.length - 1;

        return gameObject.games.map((game, index) => { //renders gameDate component for every gameID in state
            return <GameData id={game} week={gameObject.week} year={year} end={gameObject.endOfWeek}
                         last={index === lastElement} makeButton={submitButton} key={uniqid()}/>
        });

    }


    let score = null;
    if (gameObject.endOfWeek) score = (
        <h1 className="text-center mt-5 mb-3">{"Your Score: " + getScoreFromUserCache(year, gameObject.week)}</h1>);

    let backToMainUser = null;
    if (context.user !== context.currentUser) backToMainUser = (<p className="headerNav__item" onClick={() => {
        context.updateUser(context.currentUser) //changes view back to user's view instead of others data
    }}>Back to Main User</p>);


    return (
        <div className="col-lg-11 order-1 order-lg-2 d-flex flex-column align-items-center" id="contentWrapper">
            <div id="pageHeader"
                 className="align-self-start w-100 px-2 my-5 d-flex flex-column flex-lg-column justify-content-between">
                <div className="d-flex flex-row headerNav">
                    <p className="headerNav__item" onClick={signOutApp}>Sign Out</p>
                    {backToMainUser}
                </div>
                <h1>{context.user + "'s WEEK " + gameObject.week + " PICKS"}</h1>
                <div className="textBar"/>
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




