import React from "react";
import {useState, useEffect} from "react";
import {getGameStats} from "../Api/sportsDataAPI";
import {getTeamName, getTeamRecord, getGameLink, getGameTime} from "../Api/parsers";


const GameData = (props) => {

    const [data, setData] = useState(null);
    const [pickHome, setHomePick] = useState(null);


    function pickTeam(home) {
        if (!home) setHomePick(false);
        else setHomePick(true);
    }


    async function getGameData(abortSignal) {
        if (data !== null) return;
        await getGameStats(props.id, abortSignal).then((gameData) => {
            setData(gameData);
        }).catch((message) => {
            console.log("fetch aborted")
        });
    }


    useEffect(() => {
        let gameController = new AbortController();
        getGameData(gameController.signal);
        return function abort() {
            gameController.abort();
        }
    });


    let display = null;

    if (data !== null) {
        let awayName = getTeamName(data, false), homeName = getTeamName(data, true),
            awayRecord = getTeamRecord(data, false), homeRecord = getTeamRecord(data, true),
            gameTime = getGameTime(data), gameLink = getGameLink(data), awayClass = 'game__away', homeClass = 'game__home';

        if (pickHome != null){
            if (pickHome === true) homeClass = homeClass + " pick";
            else awayClass = awayClass + " pick";
        }

        display = (
            <div className="game my-5 d-flex flex-column">
                <div className={awayClass + " my-3 d-flex flex-column align-items-center justify-content-center"} onClick={() => pickTeam(false)}>
                    <h1>{awayName} </h1>
                    <p className="align-self-end">{awayRecord}</p>
                </div>
                <div
                    className="game__info d-flex flex-row align-self-center justify-content-between align-items-center">
                    <a href={gameLink} rel="noreferrer" target="_blank"><h1>More</h1></a>
                    <p className="game__infoAT">@</p>
                    <p className="game__infoTimeDate">{gameTime}</p>
                </div>

                <div className={homeClass + " my-3 d-flex flex-column align-items-center justify-content-center"} onClick={() => pickTeam(true)}>
                    <h1>{homeName}</h1>
                    <p className="align-self-end">{homeRecord}</p>
                </div>
            </div>
        );
    }

    return display;
}


export default GameData;


