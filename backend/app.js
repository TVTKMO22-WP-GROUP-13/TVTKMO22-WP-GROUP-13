require('dotenv').config();
const user_data = require('./routes/user_data');
const authentication = require('./routes/authentication');
const user_group = require('./routes/user_group');
const tmdb = require('./routes/tmdb');
const group_member = require('./routes/group_member');
const group_request = require('./routes/group_request');
const showtime = require('./routes/showtime');
const favorites = require('./routes/favorites');
const cors = require('cors');

const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer({dest: 'uploads/'})


//middlewares to process data before it arrives to endpoints
app.use( express.urlencoded({extended: false}) );
app.use(upload.none());
app.use(express.json());
app.use(cors());

//Adding routes
app.use('/user_data', user_data);
app.use('/authentication',  authentication);
app.use('/tmdb', tmdb);
app.use('/user_group', user_group);
app.use('/group_member', group_member);
app.use('/group_request', group_request);
app.use('/showtime', showtime);
app.use('/favorites', favorites);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log('Server running:' + PORT);
});

app.get('/', (req, res) => {
    res.json( {info: 'heloust'} );
});

module.exports = app;