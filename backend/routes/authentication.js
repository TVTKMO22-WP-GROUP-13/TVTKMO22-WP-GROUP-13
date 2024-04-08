require('dotenv').config();
const router = require('express').Router();
const bcrypt = require('bcrypt');
const { register, getPassword, deleteUser } = require('../database/auth_db');
const jwt = require('jsonwebtoken');
const { auth } = require('../middleware/auth');

//endpoint to register a new user
router.post('/register', async (req, res) => {
    const username = req.body.username;
    const pw = req.body.pw;

    const hashPw = await bcrypt.hash(pw, 10);

    try {
        await register(username, hashPw);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(400).json({ error: 'Registration failed' });
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
            //create a token
            const token = jwt.sign({username: uname }, process.env.JWT_SECRET);
            res.status(200).json({jwtToken: token });
        }else{
            res.status(401).json({error: 'Wrong password'});            
        }
    }else{
        res.status(404).json({error: 'User not found'});
    }
});


//end point for deleting account
router.delete('/delete', auth, async(req, res)=>{
    const username = req.body.username;
    const pw = req.body.pw;

    try {
        
            if (res.locals.username !== username){
                return res.status(403).json({error: 'Unaut. You can only delete your own account'})
            }
            
            const db_pw = await getPassword(username);
            
            if(db_pw){
                const isAuth = await bcrypt.compare(pw,db_pw);
                if(isAuth){
                    await deleteUser(username);
                    res.status(200).json({message: 'user deleted'})
                } else{
                    res.status(401).json({error: 'incorrect password'})
                }
            } else{
                res.status(404).json({ error: 'user not found'})
            
        }
    } catch (error){
        console.error('deletion error', error)
        res.status(500).json({error: 'internal server error'})
    }
})


module.exports = router;