import React, {useContext, useState} from "react";
import {getStats} from "../utilities/userDataCalculator";
import userContext from "../utilities/UserContext";


function StatsInterface() {

    const context = useContext(userContext);
    const [statsObject, setStatsObject] = useState({games: "", wins: "", losses: "", ratio: "", groupWeekWon: ""});

    async function stats() {
        if (statsObject.games !== "") return;
        setStatsObject(await getStats(context.user));
    }

    stats();

    if(statsObject !== null) {
    return (
        <div className="col-lg-11 order-1 order-lg-2 d-flex flex-column align-items-center" id="contentWrapper">
            <div id="pageHeader" className="align-self-start px-2 mt-5">
                <h1>Stats</h1>
                <div className="textBar"/>
            </div>

            <div className="statBox align-self-center py-5 d-flex flex-column align-items-center">
                <h1 className="text-center">{context.user + "'s Stats"}</h1>
                <div className="textBar mb-5"/>
                <p className="my-3">{"Games guessed: " + statsObject.games}</p>
                <p className="my-3">{"Games right: " + statsObject.wins}</p>
                <p className="my-3">{"Games wrong: " + statsObject.losses}</p>
                <p className="my-3">{"Correct Prediction Ratio: " + statsObject.ratio  + "%"}</p>
                <p className="my-3">{"Group Weeks Won: " + statsObject.groupWeekWon}</p>
            </div>
        </div>
    )}
    else return null
}


export default StatsInterface;