import {getUserPicks} from "../firebase/firebase";


export async function getStats(username) {
    let wins = 0, losses = 0, groupWeekWon = 0, ratio = null, data = null;

    //get user data
    data = await getUserPicks(username);

    //search dataArray for years
    //search years for week
    //verify week is finished
    //examine week score

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].array.length; j++) {
            wins += data[i].array[j].score.wins;
            losses += data[i].array[j].score.losses
        }
    }

    ratio = ((100 / (wins + losses)) * wins).toFixed(2);

    return {games: wins + losses, wins: wins, losses: losses, ratio: ratio, groupWeekWon: groupWeekWon}
    //return stats object
}