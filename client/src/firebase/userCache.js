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

import {getGameCache, getGameDataFromCache} from "../Api/apiCache";
import {getTeamScore} from "../Api/parsers";

let userCache = [];

//checks if user has entered a pick
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

//grabs users pick
export function getPickFromUserCache(year, week, gameID) {
    const findYear = (object) => object.year === year;
    const findWeek = (object) => object.week === week;
    const findGame = (object) => object.gameID === gameID;

    let game = userCache[userCache.findIndex(findYear)].array;
    game = game[game.findIndex(findWeek)].games;
    return game[game.findIndex(findGame)].homePick;
}

//adds pick to userCache
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

export function validPicks(year, week, games) {
    const findYear = (object) => object.year === year;
    const findWeek = (object) => object.week === week;

    let gameArray = userCache[userCache.findIndex(findYear)].array;
    gameArray = gameArray[gameArray.findIndex(findWeek)].games;

    return gameArray.length === games.length;
}

//loads user data from database into cache
export async function setUserCache(cache) {
    userCache = await cache;
}

//returns userCache to database and marks it being submitted to database. Only happens when picks are made has happened
//submitted is useless for demo purposes because end of the week occurs and pick submissions are done together
//real use, these operations would happen separately one when picks are submitted and another when actually time passes
export function getUserCache(year, week) {
    const findYear = (object) => object.year === year;
    const findWeek = (object) => object.week === week;
    let weekArray = userCache[userCache.findIndex(findYear)].array;
    weekArray[weekArray.findIndex(findWeek)].submitted = true;
    return userCache;
}


//checks if week is data is complete meaning both picks and end of week conditions have been met. This sets state to display results
//might try to implement try and catch for other methods searching for object properties
export function isWeekFinished(year, week) {
    const findYear = (object) => object.year === year;
    const findWeek = (object) => object.week === week;
    try {
        let weekArray = userCache[userCache.findIndex(findYear)].array;
        return weekArray[weekArray.findIndex(findWeek)].endOfWeek;
    } catch (error) {
        return false;
    }
}


//finishes week and marks week ready for displaying results
//add endOfWeek and score property to object
export function endWeek(year, week) {
    const findYear = (object) => object.year === year;
    const findWeek = (object) => object.week === week;
    let weekArray = userCache[userCache.findIndex(findYear)].array;
    //all picks submitted before calculating check
    weekArray[weekArray.findIndex(findWeek)].score = calculateUserScore(year, week);
    weekArray[weekArray.findIndex(findWeek)].endOfWeek = true;
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

    if (!isWeekFinished(year, week)) {
        let gameCache = getGameCache();
        let weekArray = gameCache[gameCache.findIndex(findYear)].array;
        weekArray = weekArray[weekArray.findIndex(findWeek)];
        let weekGames = weekArray.games;


        for (let i = 0; i < weekGames.length; i++) {
            //find winner using parser functions
            //compare homePick to winner increment appropriate variable
            let data = getGameDataFromCache(year, week, weekGames[i].gameID),
                homeWinner = getTeamScore(data, true) > getTeamScore(data, false);

            if (homeWinner === getPickFromUserCache(year, week, weekGames[i].gameID)) {
                ++wins;
            } else {
                ++losses;
            }
        }

        //record result into userRecord
        return {
            wins: wins,
            losses: losses,
        }
    }
}

export function getScoreFromUserCache(year, week) {
    const findYear = (object) => object.year === year;
    const findWeek = (object) => object.week === week;

    try {
        let weekArray = userCache[userCache.findIndex(findYear)].array;
        let wins = weekArray[weekArray.findIndex(findWeek)].score.wins;
        let losses = weekArray[weekArray.findIndex(findWeek)].score.losses;
        return wins + "-" + losses;
    } catch (err) {
        return "";
    }
}



