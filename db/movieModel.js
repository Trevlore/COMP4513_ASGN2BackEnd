const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    "id": Number,
    "tmdb_id": Number,
    "imdb_id": String,
    "release_date": Date,
    "title": String,
    "runtime": Number,
    "revenue": Number,
    "tagline": String,
    "poster": String,
    "ratings": {
        "popularity": Number,
        "average": Number,
        "count": Number
    },
    "details": {
        "overview": String,
        "genres": [
            {
                "id": Number,
                "name": String
            }
        ]
    },
    "production": {
        "crew": [
            {
                "credit_id": String,
                "department": String,
                "gender": Number,
                "id": Number,
                "job": String,
                "name": String
            }
        ],
        "companies": [{
            "name": String,
            "id": Number
        }],
        "countries": [{
            "iso_3166_1": String,
            "name": String
        }]
    }
});

module.exports = mongoose.model('Movie', schema);
