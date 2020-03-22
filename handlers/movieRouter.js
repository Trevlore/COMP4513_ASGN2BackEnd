// api requests for movie data

// var naming scheme - verbNoun where nouns list least common to most common for ease of reading

/**WEB      CRUD        MONGO
 * get      retrieve    find
 * put      insert      insert
 * post     update      update
 * delete   delete      remove
 *
 */

// only retrieve
const handleAllBriefMovies = (app, MovieBrief) => {
  app.route("/api/brief").get((req, resp) => {
    MovieBrief.find({}, (err, data) => {
      if (err) {
        resp.json({ message: "cannot connect to da'bee" });
      } else {
        resp.json(data);
      }
    });
  });
};
const handleAllFullMovies = (app, Movie) => {
  app.route("/api/movies").get((req, resp) => {
    Movie.find({}, (err, data) => {
      if (err) {
        resp.json({ message: "cannot connect to full movie BataDase " });
      } else {
        resp.json(data);
      }
    });
  });
};
const handleSingleFullMovie = (app, Movie) => {
  app.route("/api/movies/:id").get((req, resp) => {
    Movie.find({ id: req.params.id }, (err, data) => {
      if (err) {
        resp.json({ message: "full movie ID not phrowned" });
      } else {
        resp.json(data);
      }
    });
  });
};

//aggregate queries go here
// Title = :/sub/
// year - release_date works without quotes
const handleFilteredBriefMovies = (app, MovieBrief) => {
  app.route("/api/find/title/:substr").get((req, resp) => {
    MovieBrief.find({ title: `/${req.params.substr}/` }, (err, data) => {
      if (err) {
        resp.json({ message: "no substring match" });
      } else {
        resp.json(data);
      }
    });
  });
  app.route("/api/find/year/:low/:high").get((req, resp) => {
    MovieBrief.find(
      {
        release_date: {
          $gte: `${req.params.low}`,
          $lte: `${req.params.high}`
        }
      },
      (err, data) => {
        if (err) {
          resp.json({ message: "date filter error" });
        } else {
          resp.json(data);
        }
      }
    );
  });
  app.route("/api/find/rating/:low/:high").get((req, resp) => {
      MovieBrief.find({"ratings.average": {$gte:req.params.low, $lte: req.params.high}}, (err,data) => {
          if (err) {
              resp.json({message: "rating filter error"});
          } else {
              resp.json(data);
          }
      })
  });
};

// full CRUD
// test user hard coded until auth is working
const handleFavorites = (app, User) => {
  app.route("/api/favorites/").get((req, resp) => {
    User.find({ id: 99 });
  });
  app.route("/api/favorites/").put((req, resp) => {
    User.insert();
  });
  app.route("/api/favorites/").post((req, resp) => {
    User.update();
  });
  app.route("/api/favorites/").delete((req, resp) => {
    User.remove();
  });
};

//exports
module.exports = {
  handleAllBriefMovies,
  handleAllFullMovies,
  handleSingleFullMovie,
  handleFilteredBriefMovies,
  handleFavorites
};
