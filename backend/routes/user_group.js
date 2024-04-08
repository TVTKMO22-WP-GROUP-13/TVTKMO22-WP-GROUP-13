const { auth } = require('../middleware/auth');
const { createGroup } = require('../database/auth_db');
const { getGroups } = require('../database/user_group_db');
const { getUser } = require('../database/user_data_db');

const router = require('express').Router();

// endpoint to get all groups
router.get('/all', async (req, res) => {
    try {
        const groups = await getGroups();
        //check if groups array is empty
        if (groups.length === 0) {
            return res.status(404).json({ message: 'No groups found' });
        }
        console.log(groups);
        res.json({ message: 'Groups retrieved successfully', groups });
    } catch (error) {
        console.error('Error fetching groups:', error);
        res.status(500).json({ message: 'Failed to retrieve groups' });
    }
});

// endpoint to create a new group
router.post('/createGroup', auth, async (req, res) => {
    const group_name = req.body.group_name;
    const description = req.body.description;
    const username = res.locals.username; // use the username from the auth middleware

    try {
        const user = await getUser(username);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const owner_id = user.user_id;

        await createGroup(group_name, description, owner_id);
        res.status(201).json({ message: 'Group created successfully' });
    } catch (error) {
        console.error('Group creation error:', error);
        res.status(400).json({ error: 'Group creation failed' });
    }
});

module.exports = router;