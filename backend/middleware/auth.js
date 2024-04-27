require('dotenv').config();
const jwt = require('jsonwebtoken');

function auth(req, res, next){
    // Authorization:Bearer token
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        console.log('No token provided'); // log
        return res.status(403).json({error: 'Access forbidden. No token provided.'});
    }

    try{
        // verify the token and extract the user details (username, user_id)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token decoded successfully:', decoded); // log
        res.locals.username = decoded.username;
        res.locals.user_id = decoded.user_id;
        next();
    } catch(err){
        console.log('Token verification failed:', err); // log
        res.status(403).json({error: 'Access forbidden. Invalid token.'});
    }
}

module.exports = {auth};