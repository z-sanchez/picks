import React, {useContext} from "react";
import {useState, useEffect} from "react";
import {getGameStats} from "../Api/sportsDataAPI";
import {getTeamName, getTeamRecord, getGameLink, getGameTime} from "../Api/parsers";
import {doesUserPickExistInCache, getPickFromUserCache, updateUserCache} from "../firebase/userCache";
import {doesGameDataExist, getGameDataFromCache, updateGameCache} from "../Api/apiCache";
import UserContext from "../utilities/UserContext";


const GameData = (props) => {

    const [data, setData] = useState(null);
    const [pickHome, setHomePick] = useState(null);
    const context = useContext(UserContext);


    function pickTeam(home) {
        updateUserCache(props.year, props.week, props.id, home);
        if (!home) setHomePick(false);
        else setHomePick(true);
    }


    async function getGameData(abortSignal) {
        if (data !== null) return;

        if (doesGameDataExist(props.year, props.week, props.id) === false) {
            console.log('games retrieved from fetch');
            await getGameStats(props.id, abortSignal).then((gameData) => {
                if (doesUserPickExistInCache(props.year, props.week, props.id)) setHomePick(getPickFromUserCache(props.year, props.week, props.id));
                setData(gameData);
            }).catch((message) => {
                console.log("fetch aborted in GameData");
            });
        } else {
            console.log('games retrieved from cache for week: ' + props.week);
            if (doesUserPickExistInCache(props.year, props.week, props.id)) setHomePick(getPickFromUserCache(props.year, props.week, props.id));
            setData(getGameDataFromCache(props.year, props.week, props.id));
        }
    }


    useEffect(() => {
        let gameController = new AbortController();
        getGameData(gameController.signal);
        return function abort() {
            if (data !== null) updateGameCache(props.year, props.week, props.id, data);
            gameController.abort();
        }
    });


    let display = null;

    if (data !== null) {
        let awayName = getTeamName(data, false), homeName = getTeamName(data, true),
            awayRecord = getTeamRecord(data, false), homeRecord = getTeamRecord(data, true),
            gameTime = getGameTime(data), gameLink = getGameLink(data), awayClass = 'game__away',
            homeClass = 'game__home';

        if (pickHome != null) {
            if (pickHome === true) homeClass = homeClass + " pick";
            else awayClass = awayClass + " pick";
        }

        display = (
            <div className="game my-5 d-flex flex-column">
                <div className={awayClass + " my-3 d-flex flex-column align-items-center justify-content-center"}
                     onClick={() => pickTeam(false)}>
                    <h1>{awayName} </h1>
                    <p className="align-self-end">{awayRecord}</p>
                </div>
                <div
                    className="game__info d-flex flex-row align-self-center justify-content-between align-items-center">
                    <a href={gameLink} rel="noreferrer" target="_blank"><h1>More</h1></a>
                    <p className="game__infoAT" onClick={() => {
                        context.updateUser('zieksanchez3@gmail.com')
                    }}>@</p>
                    <p className="game__infoTimeDate">{gameTime}</p>
                </div>

                <div className={homeClass + " my-3 d-flex flex-column align-items-center justify-content-center"}
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


