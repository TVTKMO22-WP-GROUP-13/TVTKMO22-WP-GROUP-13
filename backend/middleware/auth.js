require('dotenv').config();
const jwt = require('jsonwebtoken');

function auth(req, res, next){
    // Authorization:Bearer token
    const token = req.headers.authorization?.split(' ')[1];

    try{
        //verify the token and extract the user details (username, user_id)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.locals.username = decoded.username;
        res.locals.user_id = decoded.user_id;
        next();
    }catch(err){
        res.status(403).json({error: 'Access forbidden.'})
    }
}

module.exports = {auth};

