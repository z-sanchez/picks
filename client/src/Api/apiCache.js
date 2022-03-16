//example data structure for
// cache = [
//  {
//      year: 2021,
//      array: [{week: 4, data: [data]}],
//  }
// ];
let cache = [];


export function doesExist(year, week) {
    const findYear = (object) => object.year === year;

    if (cache.filter(object => object.year === year).length > 0) { //if year exist in cache
        let yearArray = cache[cache.findIndex(findYear)].array; //get year array
        return yearArray.filter(object => object.week === week).length > 0;
    } else { //year doesn't exist in cache
        return false
    }
}

export function getData(year, week) {
    const findYear = (object) => object.year === year;
    const findWeek = (object) => object.week === week;
    let data = cache[cache.findIndex(findYear)].array;
    return data[data.findIndex(findWeek)].data;
}


export function updateCache(year, week, data) {
    const findYear = (object) => object.year === year;

    if (cache.filter(object => object.year === year).length > 0) { //if year exist in cache
        let yearArray = cache[cache.findIndex(findYear)].array; //get year array
        yearArray.push({week: week, data: data});
    } else { //year doesn't exist in cache
        cache.push({year: year, array: [{week: week, data: data}]});
    }
}







//example data structure for
// gameCache = [
//  {
//      year: 2021,
//      array: [
//          {
//              week: 4,
//              games: [
//              {
//                  gameID: 1,
//                  data: data,
//               }
//             ],
//          },
//      ],
//  }
// ];


let gameCache = [];


export function doesGameDataExist(year, week, gameID) {
    const findYear = (object) => object.year === year;
    const findWeek = (object) => object.week === week;


    console.log(gameCache)
    console.log(gameID);

    if (gameCache.filter(object => object.year === year).length > 0) { //if year exist in cache
        let yearArray = gameCache[gameCache.findIndex(findYear)].array; //get array
        if (yearArray.filter(object => object.week === week).length > 0) {
            let weekGames = gameCache[gameCache.findIndex(findWeek)].games;
            return weekGames.filter(object => object.gameID) === gameID;
        }
        else {
            return false
        }
    }
    else {
        return false;
    }
}



export function getGameDataFromCache(year, week, gameID) {
    const findYear = (object) => object.year === year;
    const findWeek = (object) => object.week === week;
    const findGame = (object) => object.gameID === gameID;

    let game = gameCache[gameCache.findIndex(findYear)].array;
    game = game[game.findIndex(findWeek)].games;
    return game[game.findIndex(findGame)].data;
}




export function updateGameCache(year, week, gameID, data) {
    const findYear = (object) => object.year === year;
    const findWeek = (object) => object.week === week;

    if (gameCache.filter(object => object.year === year).length > 0) { //if year exist in cache
        let yearArray = gameCache[gameCache.findIndex(findYear)].array; //get year array
        if (yearArray.filter(object => object.week === week).length > 0) { //if week exist
            let weekPicks = gameCache[gameCache.findIndex(findWeek)].games;
            weekPicks.push({gameID: gameID, data: data});
        }
        else {
            yearArray.push({week: week, games: [{gameID: gameID, data: data}]});
        }
    } else { //year doesn't exist in cache
        gameCache.push({year: year, array: [{week: week, games: [{gameID: gameID, data: data}]}]});
    }
}


