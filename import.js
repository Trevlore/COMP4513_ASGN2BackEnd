const fs = require('fs');
const path = require('path');
const Movie = require('./db/movieModel');
const {connect, close}=require('./db/connect');

connect();


async function importData() {
    const movieArray = JSON.parse(fs.readFileSync(path.join(__dirname,'./data/movies.json'),'utf8'));

    try {
        await Movie.insertMany(movieArray, {ordered: true});
    }
    catch (e) {
        console.debug(e)
    }


}

importData().then(value => close());
