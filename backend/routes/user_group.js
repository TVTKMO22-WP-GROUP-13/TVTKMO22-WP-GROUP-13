const { auth } = require('../middleware/auth');
const { getGroups, getGroup, createGroup, deleteGroup, getUserCreatedGroups } = require('../database/user_group_db');
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

// endpoint to get a group by id
router.get('/getGroup/:group_id', async (req, res) => {
    const { group_id } = req.params;  // Extracting group_id from the route parameter

    try {
        const group = await getGroup(group_id);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        res.json({ message: 'Group retrieved successfully', group });
    } catch (error) {
        console.error('Error fetching group:', error);
        res.status(500).json({ message: 'Failed to retrieve group' });
    }
});

// endpoint to create a new group
router.post('/createGroup', auth, async (req, res) => {
    const group_name = req.body.group_name;
    const description = req.body.description;
    const user_id = res.locals.user_id;

    try {      
        if (!user_id) {
            return res.status(404).json({ message: 'User not found' });
        }
        const owner_id = user_id;

        await createGroup(group_name, description, owner_id);
        res.status(201).json({ message: `Group "${group_name}" created successfully` });
    } catch (error) {
        console.error('Group creation error:', error);
        res.status(400).json({ error: 'Group creation failed' });
    }
});

// endpoint to get all groups created by a user
router.get('/getUserCreatedGroups', auth, async (req, res) => {
    //const username = res.locals.username;
    const user_id = res.locals.user_id;
    const username = res.locals.username;

    try {
        if (!user_id) {
            return res.status(404).json({ message: 'User not found' });
        }
        const owner_id = user_id;
        const groups = await getUserCreatedGroups(owner_id);
        //check if groups array is empty
        if (groups.length === 0) {
            return res.status(404).json({ message: 'No groups found' });
        }
        console.log(groups);
        res.json({ message: `Groups created by "${username}  " retrieved successfully`, groups });
    } catch (error) {
        console.error('Error fetching groups:', error);
        res.status(500).json({ message: 'Failed to retrieve groups' });
    }
});

// endpoint to delete a group
router.delete('/deleteGroup', auth, async (req, res) => {
    const group_id = req.body.group_id;
    const username = res.locals.username;

    try {
        const user = await getUser(username);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const owner_id = user.user_id;

        const group = await getGroup(group_id);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        if (group.owner_id !== owner_id) {
            return res.status(403).json({ message: 'You are not the owner of this group' });
        }

        await deleteGroup(group_id, owner_id);
        res.status(201).json({ message: 'Group deleted successfully' });
    } catch (error) {
        console.error('Group deletion error:', error);
        res.status(400).json({ error: 'Group deletion failed' });
    }
});

module.exports = router;