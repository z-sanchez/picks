//example data structure for
// cache = [
//  {
//      year: 2021,
//      array: [{week: 4, data: data}],
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

