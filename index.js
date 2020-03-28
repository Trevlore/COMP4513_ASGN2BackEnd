const parser = require('body-parser');
const cors = require('cors');
const express = require('express');
const {addHealthCheck} = require('./scripts/healthcheck');
const connect = require('./db/connect');
const {setupPassport} = require('./scripts/auth');
const {setupUser} = require('./scripts/user');
connect.connect();

const app = express();


corsOptions={
    origin: '*',
    optionsSuccessStatus: 200
};
app.use(parser.json());
app.use(parser.urlencoded({extended:true}));
app.use(cors(corsOptions));

addHealthCheck(app);
setupPassport(app);
setupUser(app);
const port = process.env.PORT || 8080;

app.listen(port, ()=>{
    console.log("Server running at "+port);
});

process.on('exit', (options,exitCode)=>{connect.close()});
