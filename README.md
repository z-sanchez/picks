
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
5. [What I learned](#learned)
6. [What's to come?](#whattocome)

## About <a name="whatitdoes"></a>
This project is a kind of self assigned capstone project as well as tool to help with one of my family's long held tradition of competiting each NFL season in a Pick'em league (usually done on paper). 

I threw everything I could at this project including React, API, caches, sass, async/await, database, user authentication, and animations. I feel the project came out well but will still need some work.

## Tools, API's, and more <a name="tools"></a>

### [NFL API endpoints from ESPN](https://gist.github.com/nntrn/ee26cb2a0716de0947a0a4e9a157bc1c#v2sportsfootballleaguesnflseasonsyeartypesseasontypeweeksweeknum)
I used this 


### Firebase
During this project I spent a lot of time with the firebase documentation. I now how a feel for subscribing to api's, being organized about api calls,
asynchronous tasks, and authentication. 

The main functions of firebase in this project are to authenticate a user, create collections with users id, add their id to a manifest, retrieve and store chat messages.

The firestore for hermes is mainly composed of three different collection types: 
- users (the manifest of all users on the app)
- user (contains all of the users contacts)
- chat (user and contacts chat messages)

### SASS
I also used SASS again and went through documentation. I was feeling good about it until I then realized I nested every style declaration.
All my styling was out of sorts.

I'll never make that mistake again.

Others: React

## Setup <a name="setup"></a>
If you want to run the project yourself, clone the repository, go into client folder and run 
<code>npm install</code> and then <code>npm start</code>

You'll be greeted to a demo version of the app.

On mobile, click the no contact to choose who to chat with. 

Click logo to sign out.

## How it works <a name="howit"></a>
Currently, the code for logging in with a gmail account is taken out. This project is primarily for practice and I don't want your data. Instead, you'll be logged
into a demo user with dummy credentials. Hit the logo to sign out!

*The ChatApp* component is the main parent of all data and also displays messages. When mounted it grabs messages, sets a current contact, and grabs messages from the chat
between user and that contact. The default is no contact selected.

*The ContactList* component has the job of displaying contacts, adding contacts, and passing on contact info to *Contact* component. On mobile devices,
this has the be rendered differently due to a second list component being render in visible spot on the page. This happens because in mobile, the main list is cut off.

*Contact*
Function component that renders contacts. 


## What I learned <a name="learned"></a>
- Don't nest styles in sass unless you mean to 
- Try not to set height properties on elements. It makes responsiveness a pain.
- Keep organized and write clean code now instead of later
- Read documentation and write documentation
- Firebase
- I can host sites on netlify
- React context
- More familiar with React useState, useEffect


## What's to come <a name="whattocome"></a>
- code refactoring
- better css styling
- deleting contacts
