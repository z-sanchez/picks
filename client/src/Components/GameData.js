import React, {useContext} from "react";
import {useState, useEffect} from "react";
import {getGameStats} from "../Api/sportsDataAPI";
import {getTeamName, getTeamRecord, getGameLink, getGameTime, getTeamScore} from "../Api/parsers";
import {doesUserPickExistInCache, getPickFromUserCache, updateUserCache} from "../firebase/userCache";
import {doesGameDataExist, getGameDataFromCache, updateGameCache} from "../Api/apiCache";
import userContext from "../utilities/UserContext";


const GameData = (props) => {

    const context = useContext(userContext);
    const [data, setData] = useState(null);
    const [pickHome, setHomePick] = useState(null);


    function pickTeam(home) { //home parameter: if true user picked home, if false user picked away
        updateUserCache(props.year, props.week, props.id, home);
        if (!home) setHomePick(false);
        else setHomePick(true);
    }


    async function getGameData(abortSignal) {
        if (doesGameDataExist(props.year, props.week, props.id) === false) { //if game data does not exist in cache
            await getGameStats(props.id, abortSignal).then((gameData) => { //refer to API
                updateGameCache(props.year, props.week, props.id, gameData); //update gameCache with data
                return gameData
            }).then((gameData) => {
                if (doesUserPickExistInCache(props.year, props.week, props.id)) setHomePick(getPickFromUserCache(props.year, props.week, props.id)); //checks if user's pick exist in userCache
                setData(gameData);
            }).catch((message) => {
                return message;
            });
        } else { //game data exist in cache
            if (doesUserPickExistInCache(props.year, props.week, props.id)) setHomePick(getPickFromUserCache(props.year, props.week, props.id)); //checks if user's pick exist in userCache
            setData(getGameDataFromCache(props.year, props.week, props.id));
        }
    }


    useEffect(() => {
        let gameController = new AbortController();

        if (data === null) {
            getGameData(gameController.signal);
        }

        function cleanUp() { //when component unmounts, it's fetch calls are ended. Helps for when user rapidly skips to a week
            gameController.abort();
        }

        return cleanUp;
    });


    let display = null;

    if (data !== null) { //if component has retrieved game data
        let awayName = getTeamName(data, false), homeName = getTeamName(data, true),
            awayRecord = getTeamRecord(data, false), homeRecord = getTeamRecord(data, true),
            gameTime = getGameTime(data), gameLink = getGameLink(data), awayClass = 'game__away',
            homeClass = 'game__home', homeScore = getTeamScore(data, true), awayScore = getTeamScore(data, false),
            homeWinner = homeScore > awayScore;

        if (pickHome != null) { //adjustments for UI when team has been picked
            if (pickHome === true) {
                homeClass = homeClass + " pick";
                if (props.end) awayClass = awayClass + " noPick";
            } else {
                awayClass = awayClass + " pick";
                if (props.end) homeClass = homeClass + " noPick";
            }
        }

        if (props.end) { //UI changes to show results
            awayRecord = awayScore;
            homeRecord = homeScore;
            if (homeWinner && pickHome) homeClass = homeClass + " winner";
            else if (!homeWinner && !pickHome) awayClass = awayClass + " winner";
            else if (homeWinner && !pickHome) awayClass = awayClass + " loser";
            else if (!homeWinner && pickHome) homeClass = homeClass + " loser";
        }

        if (context.user !== context.currentUser) { //when viewing other's picks, games do not highlight like they're being picked
            awayClass = awayClass + " noPick";
            homeClass = homeClass + " noPick";
        }

        display = (
            <div className="game my-5 d-flex flex-column">
                <div className={awayClass + " mb-3 d-flex flex-column align-items-center justify-content-center"}
                     onClick={() => pickTeam(false)}>
                    <h1>{awayName} </h1>
                    <p className="align-self-end">{awayRecord}</p>
                </div>
                <div
                    className="game__info d-flex flex-row align-self-center justify-content-between align-items-center">
                    <a href={gameLink} rel="noreferrer" target="_blank"><h1>More</h1></a>
                    <p className="game__infoAT">@</p>
                    <p className="game__infoTimeDate">{gameTime}</p>
                </div>

                <div className={homeClass + " mt-3 d-flex flex-column align-items-center justify-content-center"}
                     onClick={() => pickTeam(true)}>
                    <h1>{homeName}</h1>
                    <p className="align-self-end">{homeRecord}</p>
                </div>
            </div>
        );
    }

    return display;
}


export default GameData;


