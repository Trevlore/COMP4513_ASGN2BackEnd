require('dotenv').config();
const mongoose = require('mongoose');
//mongoose.set('debug', true);

const connect = () => {
    const opt = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        auth: {
            user: process.env.MONGO_USER,
            password: process.env.MONGO_PASSWORD
        }
    };
    mongoose.connect(process.env.MONGO_URL, opt);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback() {
        console.log("connected to mongo");
    });
};
const close = ()=>{
    mongoose.connection.close()
};
module.exports = {
    connect,
    close
};
