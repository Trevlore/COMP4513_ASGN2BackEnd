const {checkAuthenticated} = require('./auth');
const User = require('../db/userModel');

function getUserProfile(req, resp) {
    User.findOne({id: req.user}).select("-_id -password_bcrypt -apikey").exec((err, user)=>{
        if(err){
            resp.statusCode = 500;
            resp.json({msg: "Server error"})
        }else {
            resp.json(user)
        }

    });
}


const setupUser = (app)=>{
    app.route('/api/user').get(checkAuthenticated, getUserProfile)
};

module.exports = {
    setupUser
};
