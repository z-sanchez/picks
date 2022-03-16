//example data structure for
// userCache = [
//  {
//      year: 2021,
//      array: [
//          {
//              week: 4,
//              picks: [
//              {
//                  gameID: 1,
//                  pick: home,
//               }
//             ],
//          },
//      ],
//  }
// ];

let userCache = [];


export function doesUserPickExist(year, week, gameID) {
    const findYear = (object) => object.year === year;
    const findWeek = (object) => object.week === week;

    if (userCache.filter(object => object.year === year).length > 0) { //if year exist in cache
        let yearArray = userCache[userCache.findIndex(findYear)].array; //get array
        if (yearArray.filter(object => object.week === week).length > 0) {
            let weekPicks = userCache[userCache.findIndex(findWeek)].picks;
            return weekPicks.filter(object => object.gameID === gameID).length > 0;
        }
        else {
            return false
        }
    }
    else {
        return false;
    }
}

export function getPickFromUserCache(year, week, gameID) {
    const findYear = (object) => object.year === year;
    const findWeek = (object) => object.week === week;
    const findGame = (object) => object.gameID === gameID;

    let pick = userCache[userCache.findIndex(findYear)].array;
    pick = pick[pick.findIndex(findWeek)].picks;
    return pick[pick.findIndex(findGame)].pick;
}


export function updateUserCache(year, week, gameID, pick) {
    const findYear = (object) => object.year === year;
    const findWeek = (object) => object.week === week;

    if (userCache.filter(object => object.year === year).length > 0) { //if year exist in cache
        let yearArray = userCache[userCache.findIndex(findYear)].array; //get year array
        if (yearArray.filter(object => object.week === week).length > 0) { //if week exist
            let weekPicks = userCache[userCache.findIndex(findWeek)].picks;
            weekPicks.push({gameID: gameID, pick: pick});
        }
        else {
            yearArray.push({week: week, picks: [{gameID: gameID, pick: pick}]});
        }
    } else { //year doesn't exist in cache
        userCache.push({year: year, array: [{week: week, picks: [{gameID: gameID, pick: pick}]}]});
    }

}



