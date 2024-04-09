const { getUser, getUsers, getUserByID } = require('../database/user_data_db');
const { auth } = require('../middleware/auth');

const router = require('express').Router();

//endpoint to get all users
router.get('/all', async (req, res) => {
    try {
        const users = await getUsers();
        //check if users array is empty
        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        console.log(users);
        res.json({ message: 'Users retrieved successfully', users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Failed to retrieve users' });
    }
});

//endpoint to get user by user_id
router.get('/user_id', async (req, res) => {   //:user_id
    try {
        const user = await getUserByID(req.query.user_id);
        //check if the user object is empty
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(user);
        res.json({ message: 'User retrieved successfully', user });
    } catch (error) {
        console.error('Error fetching the user:', error);
        res.status(500).json({ message: 'Failed to retrieve the user' });
    }
});


//endpoint to get user by username
router.get('/username', async (req, res) => {
    try {
        const user = await getUser(req.query.username);
        //check if the user object is empty
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(user);
        res.json({ message: 'User retrieved successfully', user });
    } catch (error) {
        console.error('Error fetching the user:', error);
        res.status(500).json({ message: 'Failed to retrieve the user' });
    }
});


module.exports = router;