const axios = require('axios').default;
let weekController = new AbortController();


//given a week returns all gameIDs within that week
export async function findWeeksGames(week, year) {
    // eslint-disable-next-line no-useless-concat
    weekController.abort();
    weekController = new AbortController();
    const gameLinks = await axios.get(("http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/" + year + "/types/2/weeks/" + week + "/events"), {signal: weekController.signal})
        .then(result => result.data.items);

    let games = [];

    for (let i = 0; i < gameLinks.length; i++) {
        games[i] = await getGameIDs(gameLinks[i]);
    }

    return games;
}

//returns gameID given game API link
function getGameIDs(gameLink) {
    return axios.get((gameLink.$ref)).then((result) => result.data.id);
}

//returns stats from API given gameID
export function getGameStats(game, abortSignal) {
    return axios.get("http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard/" + game, {signal: abortSignal}).then((response) => response.data);
}


