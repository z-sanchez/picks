import React from "react";
import {useState} from "react";
import {getGameStats} from "../Api/sportsDataAPI";


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
        display =
            (<div>
                <h2>{data.competitions[0].competitors[1].score}</h2>
                <h1>{data.competitions[0].competitors[1].records[0].summary + " " + data.name + " " + data.competitions[0].competitors[0].records[0].summary}</h1>
                <h2>{data.competitions[0].competitors[0].score}</h2>
            </div>)
    }
    return display;
}


export default GameData;