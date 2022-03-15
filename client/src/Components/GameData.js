import React from "react";
import {useState} from "react";
import {getGameStats} from "../Api/sportsDataAPI";
import {getTeamName, getTeamRecord, getGameLink, getGameTime} from "../Api/parsers";


const GameData = (props) => {

    const [data, setData] = useState(null);


    async function getGameData() {
        if (data !== null) return;
        const gameData = await getGameStats(props.id);
        setData(gameData);
    }

    getGameData();

    let display = null;

    if (data !== null) {
        let awayName = getTeamName(data, false), homeName = getTeamName(data, true),
            awayRecord = getTeamRecord(data, false), homeRecord = getTeamRecord(data, true),
            gameTime = getGameTime(data), gameLink = getGameLink(data);

        display = (
            <div className="game my-5 d-flex flex-column">
                <div className="game__away my-3 d-flex flex-column align-items-center justify-content-center">
                    <h1>{awayName} </h1>
                    <p className="align-self-end">{awayRecord}</p>
                </div>
                <div
                    className="game__info d-flex flex-row align-self-center justify-content-between align-items-center">
                    <a href={gameLink} rel="noreferrer" target="_blank"><h1>More</h1></a>
                    <p className="game__infoAT">@</p>
                    <p className="game__infoTimeDate">{gameTime}</p>
                </div>

                <div className="game__home my-3 d-flex flex-column align-items-center justify-content-center">
                    <h1>{homeName}</h1>
                    <p className="align-self-end">{homeRecord}</p>
                </div>
            </div>
        );
    }

    return display;
}


export default GameData;


