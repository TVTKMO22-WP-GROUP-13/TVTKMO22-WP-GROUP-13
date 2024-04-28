require('dotenv').config();
const router = require('express').Router();
const bcrypt = require('bcrypt');
const { register, getPassword, deleteUser } = require('../database/auth_db');
const { getUser } = require('../database/user_data_db');
const jwt = require('jsonwebtoken');
const { auth } = require('../middleware/auth');

router.post('/register', async (req, res) => {
    const username = req.body.username;
    const pw = req.body.pw;

    //check lenght of username
    if (username.length < 4) {
        return res.status(400).json({ error: 'Username must be at least 4 characters long' });
    }

    //check length of password
    if (pw.length < 4) {
        return res.status(400).json({ error: 'Password must be at least 4 characters long' });
    }

    const hashPw = await bcrypt.hash(pw, 10);

    try {
        const newUser = await register(username, hashPw);
        res.status(201).json({ message: 'User registered successfully' });
        console.log('User registered:', newUser.username, newUser.user_id);  // log
    } catch (error) {
        //check if username is already taken (code 23505 is unique_violation in postgres)
        if (error.code === '23505') {
            console.log(`Registration error: Username "${username}" is already taken`);
            return res.status(409).json({ error: 'Username is already taken' });           
        }
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed due to an internal error' });
    }
});
//endpoint to login
router.post('/login', async (req,res)=>{
    const uname = req.body.username;
    const pw = req.body.pw;

    const db_pw = await getPassword(uname);

    if(db_pw){
        const isAuth = await bcrypt.compare(pw, db_pw);
        if(isAuth){
            //fetch user_id from user_data table
            const user = await getUser(uname);
            const userId = user.user_id;
            //create a token
            const token = jwt.sign({username: uname, user_id: userId }, process.env.JWT_SECRET);
            //here we can set the token to expire in 30 minutes
            //const token = jwt.sign({username: uname }, process.env.JWT_SECRET, { expiresIn: '30m' });
            res.status(200).json({jwtToken: token });
            console.log(uname);
            console.log(userId);
        }else{
            res.status(401).json({error: 'Wrong password'});            
        }
    }else{
        res.status(404).json({error: 'User not found'});
    }
});


//end point for deleting account
router.delete('/delete', auth, async(req, res) => {
    console.log('Authenticated user:', res.locals.username);  // log
    const username = req.body.username;
    const pw = req.body.pw;

    try {
        if (res.locals.username !== username) {
            console.log('Authorization error: user mismatch');  // log
            return res.status(403).json({error: 'Unaut. You can only delete your own account'});
        }

        const db_pw = await getPassword(username);
        if (!db_pw) {
            console.log('No password found for user:', username);  // log
            return res.status(404).json({error: 'user not found'});
        }

        const isAuth = await bcrypt.compare(pw, db_pw);
        if (!isAuth) {
            console.log('Password mismatch for user:', username);  // log
            return res.status(401).json({error: 'incorrect password'});
        }

        await deleteUser(username);
        console.log('User deleted:', username);  // log
        res.status(200).json({message: 'user deleted'});
    } catch (error) {
        console.error('Deletion error', error);  // log
        res.status(500).json({error: 'internal server error'});
    }
});


module.exports = router;