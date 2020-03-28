const parser = require("body-parser");
const cors = require("cors");
const express = require("express");
const { addHealthCheck } = require("./scripts/healthcheck");
const connect = require("./db/connect");
/**Load models**/
const MovieBrief = require('./db/movieBriefModel.js');
const Movie = require('./db/movieModel.js');
const User = require('./db/userModel.js');
/**add passport**/
const {setupPassport} = require('./scripts/auth');
connect.connect();

const app = express();
const http = require("http").createServer(app);

corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
};
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

addHealthCheck(app);
setupPassport(app);

const movieRouter = require('./handlers/movieRouter.js');
movieRouter.handleAllBriefMovies(app, MovieBrief);
movieRouter.handleFilteredBriefMovies(app,MovieBrief);
movieRouter.handleAllFullMovies(app, Movie);
movieRouter.handleSingleFullMovie(app,Movie);

movieRouter.handleFavorites(app, User);
const port = process.env.PORT || 8080;

http.listen(port, () => {
  console.log("Server running at " + port);
});

process.on("exit", (options, exitCode) => {
  connect.close();
});
