import React from "react";


function StatsInterface() {
    return (
        <div className="col-lg-11 order-1 order-lg-2 d-flex flex-column align-items-center" id="contentWrapper">
            <div id="weekHeader" className="align-self-start ms-5 mt-5">
                <h1>Stats</h1>
                <div className="textBar"/>
            </div>

            <div className="statBox align-self-center py-5 d-flex flex-column align-items-center">
                <h1 className="text-center">Ziek's Stats</h1>
                <div className="textBar mb-5"/>
                <p className="my-3">Games guessed: 16</p>
                <p className="my-3">Games right: 5</p>
                <p className="my-3">Games wrong: 11</p>
                <p className="my-3">Correct Prediction Ratio: 31.5%</p>
                <p className="my-3">Group Weeks Won: 1</p>
            </div>
        </div>
    )
}


export default StatsInterface;