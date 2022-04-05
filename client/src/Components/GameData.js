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


    function pickTeam(home) {
        updateUserCache(props.year, props.week, props.id, home);
        if (!home) setHomePick(false);
        else setHomePick(true);
    }


    async function getGameData(abortSignal) {
        if (doesGameDataExist(props.year, props.week, props.id) === false) {
            await getGameStats(props.id, abortSignal).then((gameData) => {
                updateGameCache(props.year, props.week, props.id, gameData);
                return gameData
            }).then((gameData) => {
                if (doesUserPickExistInCache(props.year, props.week, props.id)) setHomePick(getPickFromUserCache(props.year, props.week, props.id));
                setData(gameData);
            }).catch((message) => {
                return message;
            });
        } else {
            if (doesUserPickExistInCache(props.year, props.week, props.id)) setHomePick(getPickFromUserCache(props.year, props.week, props.id));
            setData(getGameDataFromCache(props.year, props.week, props.id));
        }
    }


    useEffect(() => {
        let gameController = new AbortController();

        if (data === null) {
            getGameData(gameController.signal);
        }

        function cleanUp() {
            gameController.abort();
        }

        return cleanUp;
    });


    let display = null;

    if (data !== null) {
        let awayName = getTeamName(data, false), homeName = getTeamName(data, true),
            awayRecord = getTeamRecord(data, false), homeRecord = getTeamRecord(data, true),
            gameTime = getGameTime(data), gameLink = getGameLink(data), awayClass = 'game__away',
            homeClass = 'game__home', homeScore = getTeamScore(data, true), awayScore = getTeamScore(data, false),
            homeWinner = homeScore > awayScore;

        if (pickHome != null) {
            if (pickHome === true) {
                homeClass = homeClass + " pick";
                if (props.end) awayClass = awayClass + " noPick";
            } else {
                awayClass = awayClass + " pick";
                if (props.end) homeClass = homeClass + " noPick";
            }
        }

        if (props.end) {
            awayRecord = awayScore;
            homeRecord = homeScore;
            if (homeWinner && pickHome) homeClass = homeClass + " winner";
            else if (!homeWinner && !pickHome) awayClass = awayClass + " winner";
            else if (homeWinner && !pickHome) awayClass = awayClass + " loser";
            else if (!homeWinner && pickHome) homeClass = homeClass + " loser";
        }

        if (context.user !== context.currentUser) {
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


