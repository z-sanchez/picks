//NOTE: I should probably make this cache into a class. Using an instance of the cache class would be easier to control
//inside React Components.

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
        let yearArray = userCache[userCache.findIndex(findYear)].array; //get year array
        if (yearArray.filter(object => object.week === week).length > 0) { //if week array exist in year
            let weekGames = yearArray[yearArray.findIndex(findWeek)].games; //get week array
            if (weekGames.filter(object => object.gameID === gameID).length > 0) { //if game exist in week array
                let gamePick = weekGames[weekGames.findIndex(findGame)].homePick; //grab pick
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
    return game[game.findIndex(findGame)].homePick; //return pick according to parameters
}

//adds pick to userCache
export function updateUserCache(year, week, gameID, pick) {
    const findYear = (object) => object.year === year;
    const findWeek = (object) => object.week === week;
    const findGame = (object) => object.gameID === gameID;


    if (userCache.filter(object => object.year === year).length > 0) { //if year exist in cache
        let yearArray = userCache[userCache.findIndex(findYear)].array; //get year array
        if (yearArray.filter(object => object.week === week).length > 0) { //if week exist
            let weekGames = yearArray[yearArray.findIndex(findWeek)].games; //get week array
            if (weekGames.filter(object => object.gameID === gameID).length > 0) { //checks game exist in week array
                weekGames[weekGames.findIndex(findGame)].homePick = pick; //writes pick
            } else { //game does not exist in week array
                weekGames.push({gameID: gameID, homePick: pick}); //push game into userCache
            }
        } else { //week does not exist in year array
            yearArray.push({week: week, games: [{gameID: gameID, homePick: pick}]}); //push week into userCache
        }
    } else { //year doesn't exist in cache
        userCache.push({year: year, array: [{week: week, games: [{gameID: gameID, homePick: pick}]}]}); //push year into userCache
    }
}

export function validPicks(year, week, games) {
    const findYear = (object) => object.year === year;
    const findWeek = (object) => object.week === week;

    let gameArray = userCache[userCache.findIndex(findYear)].array;
    gameArray = gameArray[gameArray.findIndex(findWeek)].games;

    return gameArray.length === games.length; //checks if every game has been picked before submitting
}

//loads user data from database into cache
export async function setUserCache(cache) {
    userCache = await cache;
}

//called by function in firebase.js for when picks are submitted to firestore, cache marks week submitted before returning it
export function getUserCache(year, week) {
    const findYear = (object) => object.year === year;
    const findWeek = (object) => object.week === week;
    let weekArray = userCache[userCache.findIndex(findYear)].array;
    weekArray[weekArray.findIndex(findWeek)].submitted = true;
    return userCache;
}


//checks if week is data is complete. For demo, this is when picks have been submitted. For live site, this means date of last game has passed
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
export function endWeek(year, week) {
    const findYear = (object) => object.year === year;
    const findWeek = (object) => object.week === week;
    let weekArray = userCache[userCache.findIndex(findYear)].array;
    weekArray[weekArray.findIndex(findWeek)].score = calculateUserScore(year, week);
    weekArray[weekArray.findIndex(findWeek)].endOfWeek = true;
}


//calculates how many wins and losses user has for the week after submitting picks
export function calculateUserScore(year, week) {
    let wins = 0, losses = 0;
    const findYear = (object) => object.year === year;
    const findWeek = (object) => object.week === week;

    if (!isWeekFinished(year, week)) { //if week is over, calculate
        let gameCache = getGameCache();

        //locate week in game cache
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

//returns score user has according to parameters
export function getScoreFromUserCache(year, week) {
    const findYear = (object) => object.year === year;
    const findWeek = (object) => object.week === week;

    try {
        let weekArray = userCache[userCache.findIndex(findYear)].array;
        let wins = weekArray[weekArray.findIndex(findWeek)].score.wins;
        let losses = weekArray[weekArray.findIndex(findWeek)].score.losses;
        return wins + "-" + losses;
    } catch (err) {
        return "failed";
    }
}



