const parser = require('body-parser');
const cors = require('cors');
const express = require('express');
const {addHealthCheck} = require('./scripts/healthcheck');
const connect = require('./db/connect');

connect.connect();

const app = express();
const http = require('http').createServer(app);


corsOptions={
    origin: '*',
    optionsSuccessStatus: 200
};
app.use(parser.json());
app.use(parser.urlencoded({extended:true}));
app.use(cors(corsOptions));

addHealthCheck(app);

const port = process.env.PORT || 8080;

http.listen(port, ()=>{
    console.log("Server running at "+port);
});

process.on('exit', (options,exitCode)=>{connect.close()});
