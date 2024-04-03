require('dotenv').config();
const user_data = require('./routes/user_data');
const authentication = require('./routes/authentication');
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

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log('Server running:' + PORT);
});

app.get('/', (req, res) => {
    res.json( {info: 'hei'} );
});

module.exports = app;