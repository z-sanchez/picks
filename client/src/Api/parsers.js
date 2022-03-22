export function getTeamName(data, home) {
    let index = 0;
    if (!home) index = 1;
    let team = data.competitions[0].competitors[index].team;
    let location = team.location;
    let name = team.name;

    if (location === undefined) return name;
    else if (name === undefined) return location;

    return location + " " + name;
}


export function getTeamRecord(data, home) {
    let index = 0;
    if (!home) index = 1;
    let team = data.competitions[0].competitors[index];
    return team.records[0].summary;
}

export function getGameLink(data) {
    let link = data.links[0].href;

    if (link === undefined) return "noLinkFound";
    return link;
}

export function getTeamScore(data, home) {
    let index = 0;
    if (!home) index = 1;
    let score = data.competitions[0].competitors[index].score;

    return score;
}

export function getGameTime(data) {
    const date = new Date(data.date);



    let hours = date.getHours();
    let minutes = date.getMinutes();
    let meridian = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;



    return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + hours + ":" + minutes + meridian;
}