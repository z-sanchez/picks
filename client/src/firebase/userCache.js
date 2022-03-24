//example data structure for
// userCache = [
//  {
//      year: 2021,
//      array: [
//          {
//              week: 4,
//              submitted: false,
//              games: [
//              {
//                  gameID: 1,
//                  pick: home,
//               }
//             ],
//          },
//      ],
//  }
// ];

import {getGameDataFromCache} from "../Api/apiCache";

let userCache = [];


export function doesUserPickExistInCache(year, week, gameID) {
    const findYear = (object) => object.year === year;
    const findWeek = (object) => object.week === week;
    const findGame = (object) => object.gameID === gameID;

    if (userCache.filter(object => object.year === year).length > 0) { //if year exist in cache
        let yearArray = userCache[userCache.findIndex(findYear)].array; //get array
        if (yearArray.filter(object => object.week === week).length > 0) {
            let weekGames = yearArray[yearArray.findIndex(findWeek)].games;
            if (weekGames.filter(object => object.gameID === gameID).length > 0) {
                let gamePick = weekGames[weekGames.findIndex(findGame)].homePick;
                return gamePick !== null;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}


export function getPickFromUserCache(year, week, gameID) {
    const findYear = (object) => object.year === year;
    const findWeek = (object) => object.week === week;
    const findGame = (object) => object.gameID === gameID;

    let game = userCache[userCache.findIndex(findYear)].array;
    game = game[game.findIndex(findWeek)].games;
    return game[game.findIndex(findGame)].homePick;
}


export function updateUserCache(year, week, gameID, pick) {
    const findYear = (object) => object.year === year;
    const findWeek = (object) => object.week === week;
    const findGame = (object) => object.gameID === gameID;


    if (userCache.filter(object => object.year === year).length > 0) { //if year exist in cache
        let yearArray = userCache[userCache.findIndex(findYear)].array; //get year array
        if (yearArray.filter(object => object.week === week).length > 0) { //if week exist
            let weekGames = yearArray[yearArray.findIndex(findWeek)].games;
            if (weekGames.filter(object => object.gameID === gameID).length > 0) { //checks if game has had previous pick
                weekGames[weekGames.findIndex(findGame)].homePick = pick; //overwrites pick
            } else {
                weekGames.push({gameID: gameID, homePick: pick});
            }
        } else {
            yearArray.push({week: week, games: [{gameID: gameID, homePick: pick}]});
        }
    } else { //year doesn't exist in cache
        userCache.push({year: year, array: [{week: week, games: [{gameID: gameID, homePick: pick}]}]});
    }
}

export async function setUserCache(cache) {
    userCache = await cache;
    console.log("user's cache:");
    console.log(userCache);
}

export function getUserCache(year, week) {
    const findYear = (object) => object.year === year;
    const findWeek = (object) => object.week === week;
    let weekArray = userCache[userCache.findIndex(findYear)].array;
    weekArray[weekArray.findIndex(findWeek)].submitted = true;
    return userCache;
}

//might try to implement try and catch for other methods searching for object properties
export function isWeekSubmitted(year, week) {
    const findYear = (object) => object.year === year;
    const findWeek = (object) => object.week === week;
    try {
        let weekArray = userCache[userCache.findIndex(findYear)].array;
        return weekArray[weekArray.findIndex(findWeek)].submitted;
    }
    catch (error) {
        console.log("error: " + error);
        return false;
    }
}


//finish week
//add weekOver property to object
export function endWeek(year, week) {
    const findYear = (object) => object.year === year;
    const findWeek = (object) => object.week === week;
    let weekArray = userCache[userCache.findIndex(findYear)].array;
    weekArray[weekArray.findIndex(findWeek)].endOfWeek = true;
    calculateUserScore();
    return userCache;
}



function isWeekFinished(year, week) {
    const findYear = (object) => object.year === year;
    const findWeek = (object) => object.week === week;
    try {
        let weekArray = userCache[userCache.findIndex(findYear)].array;
        return weekArray[weekArray.findIndex(findWeek)].endOfWeek;
    }
    catch (error) {
        console.log("error: " + error);
        return false;
    }
}

//calc score
//if week finished, check for first game if winner is null bail. No need to calculate while week is still going.
//check if score is recorded, if so return it
//else run through data and add wins for every correct guess and losses for every other
//add result to object and return
export function calculateUserScore(year, week) {
    let wins = 0, losses = 0;
    const findYear = (object) => object.year === year;
    const findWeek = (object) => object.week === week;

    if (isWeekFinished()) {
        return isWeekFinished();
    }
    else {
        //alert for no pick

        //get game data from gameCache!!!!!
        console.log(userCache);
        let weekGames = userCache[userCache.findIndex(findYear)].array;
        weekGames = weekGames[weekGames.findIndex(findWeek)].games;


        for (let i = 0; i < weekGames.length; i++) {
            //find winner using parser functions
            //compare homePick to winner increment appropriate variable
            let data = getGameDataFromCache(year, week, weekGames[i].gameID);
            console.log(data);
        }
        //record result into userRecord
    }
}

