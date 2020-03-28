const { checkAuthenticated } = require("../scripts/auth");

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
  app.route("/api/brief").get(checkAuthenticated, (req, resp) => {
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
  app.route("/api/movies").get(checkAuthenticated, (req, resp) => {
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
  app.route("/api/movies/:id").get(checkAuthenticated, (req, resp) => {
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
  app.route("/api/find/title/:substr").get(checkAuthenticated, (req, resp) => {
    MovieBrief.find(
      { title: new RegExp(`.*${req.params.substr}.*`, "i") },
      (err, data) => {
        if (err) {
          resp.json({ message: "no substring match" });
        } else {
          resp.json(data);
        }
      }
    );
  });
  app
    .route("/api/find/year/:low/:high")
    .get(checkAuthenticated, (req, resp) => {
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
  app
    .route("/api/find/rating/:low/:high")
    .get(checkAuthenticated, (req, resp) => {
      MovieBrief.find(
        { "ratings.average": { $gte: req.params.low, $lte: req.params.high } },
        (err, data) => {
          if (err) {
            resp.json({ message: "rating filter error" });
          } else {
            resp.json(data);
          }
        }
      );
    });
};

const handleFavorites = (app, User) => {
  app.route("/api/favorites").get(checkAuthenticated, (req, resp) => {
    User.find({ id: req.user }, (err, data) => {
      if (err) {
        resp.json({ message: "retrieve favorites failed" });
      } else {
        resp.json({ favorites: data[0].favorites });
      }
    });
  });

  // check if exists,
  // do nothing or add
  app.route("/api/favorites/").post(checkAuthenticated, (req, resp) => {
    User.find({ id: req.user }, (err, data) => {
      if (err) {
        resp.json({ message: "update favorites failed, user not found" });
      } else {
        const fave = data[0].favorites;
        if (fave.includes(req.body.favId)) {
          resp.status(406);
          resp.json({message: "cannot add, already in list"})
        } else {
          User.update(
            { id: req.user },
            { $push: { favorites: req.body.favId } },
            (err, data) => {
              if (err) {
                resp.json({ message: "update favorites failed to add" });
              } else {
                resp.status(200);
                resp.json({message: "added"})
              }
            }
          );
        }
      }
    });
  });

  app.route("/api/favorites/").delete(checkAuthenticated, (req, resp) => {
    User.update(
      { id: req.user },
      { $pull: { favorites: req.body.favId } },
      (err, data) => {
        if (err) {
          resp.json({ message: "remove favorite failed" });
        } else {
          resp.status(200);
          resp.json({message :"remove Sucess"})
        }
      }
    );
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
