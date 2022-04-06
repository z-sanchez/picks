
# HERMES
NFL Pick'em App

![Login Screen](/client/src/Assets/Images/picksPreview.png)
![App Screen](/client/src/Assets/Images/picksPreview2.png)

### live site (https://xenodochial-saha-fcec11.netlify.app/)

# Table of Contents
1. [About](#whatitdoes)
2. [Tools, API's, and more](#tools)
3. [Setup](#setup)
4. [How it works](#howit)
5. [What's to come?](#whattocome)

## About <a name="whatitdoes"></a>
This project is a kind of self assigned capstone project as well as tool to help with one of my family's long held tradition of competiting each NFL season in a Pick'em league (usually done on paper). 

I threw everything I could at this project including React, API, caches, sass, async/await, database, user authentication, React Router, React context, React hooks, and animations. I feel the project came out well but will still need some work.

The result, an app that allows you to play a game predicting the winner of each week's games and compare them to others in the group you create or join, as well as viewing your stats over the season.

## Tools, API's, and more <a name="tools"></a>

### [NFL API endpoints from ESPN](https://gist.github.com/nntrn/ee26cb2a0716de0947a0a4e9a157bc1c#v2sportsfootballleaguesnflseasonsyeartypesseasontypeweeksweeknum)
I used this API to fetch season, week, and game data with Axios. Due to being a quite nested API and a substantial amount of fetch calls required to display a lot of games, I had to implement a cache to reduce performance issues.

### Caches
I designed three caches to work in the app. One is the main cache which holds the gameIDs fetched from the api. The second is the gameCache which stores the game data collected. Finally, the userCache collects the user's picks. All three are referred to when filled instead of trying to go through the api or firebase.

These are just basic data structures consisting of arrays and objects built in a fast and dirty fashion to get them up and running. They could benifit from being declared as classes instead of how the current code looks. 

These caches empty when app is exited.

### Firebase
During this project I spent a lot of time with the firebase documentation and have a better grasp on it. In this app, I use it for user authentication, storing user picks, user stats, and groups created.


### React Router
React Router was my new piece of technology for this project. I can't wait to use it more as it opens the ability to do a bit more with my React Projects.

Others: React, Sass, Bootstrap

## Setup <a name="setup"></a>
If you want to run the project yourself, clone the repository, go into client folder and run 
<code>npm install</code> and then <code>npm start</code>

You'll be greeted to a demo version of the app. 

## How it works <a name="howit"></a>

The data flow goes as follows: 
App looks for user login status, once user logs in the app fills the userCache with user's data from firebase.

The app then directs to picks screen with router and displays the current weeks games.

The picksInterface component fetches data from API and stores it into cache and passes data as a prop to gameData component to display.

For now, the current week is always 1 because there is no current NFL season.

Depending if the week's games have all ended, the results of each game will display or the user's picks will instead. Again, for now, every week is considered not over until user submits picks because the season is over.

Once picks are submitted, firebase stores user's picks, the userCache calculates user's correct and wrong picks and stores the states in firebase. The picksInterface component will update all the info displayed.

Other pages include stats page which simply grabs stats from firebase and does a few calculations before displaying stats.

A groups page is also avaliable to view which gives the option to join a group. Once joined you can then see everyone in the group's scores and an option to see their profile.

If user chooses to see another group members profile, a context belonging to a parent component updates to the group members name, every interface component then reads this update and displays the selected group member's picks or stats (never their groups) and an option to return to the actual user's views.


## What's to come <a name="whattocome"></a>
- code refactoring
- Visual redesigns
- BUG: Refreshing page tries to reload page but netlify won't let the page reload to the correct address due to router complications
- BUG: While viewing a group member's picks, returning to current user's picks does not display the current user's results if the currently viewed week has been ended
- FEATURE: Show group winner of the week
- FEATURE: Include a group win statistic
