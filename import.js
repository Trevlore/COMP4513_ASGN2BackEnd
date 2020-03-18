const fs = require('fs');
const path = require('path');
const Movie = require('./db/movieModel');
const MovieBrief = require('./db/movieBriefModel');
const User = require('./db/userModel');
const {connect, close}=require('./db/connect');

connect();


async function importData() {
    try {
        const movieArray = JSON.parse(fs.readFileSync(path.join(__dirname,'./data/movies.json'),'utf8'));
        const movieBriefArray = JSON.parse(fs.readFileSync(path.join(__dirname,'./data/movies-brief.json'),'utf8'));
        const usersArray = JSON.parse(fs.readFileSync(path.join(__dirname,'./data/logins.json'),'utf8'));

        await Movie.insertMany(movieArray, {ordered: true});
        await MovieBrief.insertMany(movieBriefArray, {ordered: true});
        await User.insertMany(usersArray, {ordered: true});
    }
    catch (e) {
        console.debug(e)
    }


}

importData().then(value => close());
