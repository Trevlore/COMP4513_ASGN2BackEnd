const parser = require('body-parser');
const cors = require('cors');
const express = require('express');

const app = express();
const http = require('http').createServer(app);


corsOptions={
    origin: '*',
    optionsSuccessStatus: 200
};
app.use(parser.json());
app.use(parser.urlencoded({extended:true}));
app.use(cors(corsOptions));

app.get('/', (req, resp)=>resp.json({message: "hello world"}));

const port = process.env.PORT || 8080;

http.listen(port, ()=>{
    console.log("Server running at "+port);
});