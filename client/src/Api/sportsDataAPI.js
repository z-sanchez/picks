const axios = require('axios').default;


//given a week returns all gameIDs within that week
export async function findWeeksGames(week, year) {
    // eslint-disable-next-line no-useless-concat
    const gameLinks = await axios.get("https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/" + year + "/types/2/weeks/" + week + "/events/")
        .then(result => result.data.items);

    let games = [];

    for (let i = 0; i < gameLinks.length; i++) {
        games[i] = await getGameIDs(gameLinks[i]);
    }

    return games;
}

//returns gameID given game API link
function getGameIDs(gameLink) {
    let link = 'https:' + gameLink.$ref.slice(5, gameLink.$ref.length);
    return axios.get((link)).then((result) => result.data.id);
}

//returns stats from API given gameID
export function getGameStats(game, abortSignal) {
    return axios.get("https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard/" + game, {signal: abortSignal}).then((response) => response.data);
}
