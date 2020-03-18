const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {

        "id": Number,
        "details": {
            "firstname": String,
            "lastname": String,
            "city": String,
            "country": String
        },
        "picture": {
            "large": String,
            "thumbnail": String
        },
        "membership": {
            "date_joined": Date,
            "last-update": Date,
            "likes": Number
        },
        "email": String,
        "password_bcrypt": String,
        "apikey": String,
        "favorites": [Number]
    });


module.exports = mongoose.model('User', schema, 'users');
