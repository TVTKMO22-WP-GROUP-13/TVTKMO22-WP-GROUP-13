const { auth } = require('../middleware/auth');
const {addUserToGroup,removeUserFromGroup, getGroupMembers, getGroupsJoined} = require('../database/group_member_db');

const router = require('express').Router();

//endpoint to add user to group
router.post('/add', async (req, res) => {
    try {
        const result = await addUserToGroup(req.body.group_id, req.body.user_id);
        res.json({ message: 'User added to group successfully', result });
    } catch (error) {
        console.error('Error adding user to group:', error);
        res.status(500).json({ message: 'Failed to add user to group' });
    }
});

//endpoint to remove user from group
router.delete('/remove', auth, async (req, res) => {
    try {
        const result = await removeUserFromGroup(req.body.group_id, req.body.user_id);
        res.json({ message: 'User removed from group successfully', result });
    } catch (error) {
        console.error('Error removing user from group:', error);
        res.status(500).json({ message: 'Failed to remove user from group' });
    }
});

//endpoint to get all members of a group
router.get('/group_members', auth, async (req, res) => {
    try {
        const groupMembers = await getGroupMembers(req.query.group_id);
        //check if groupMembers array is empty
        if (groupMembers.length === 0) {
            //console.log("Requested group_id:", req.query.group_id);
            return res.status(404).json({ message: 'No group members found' });
        }
        console.log(groupMembers);
        res.json({ message: 'Group members retrieved successfully', groupMembers });
    } catch (error) {
        console.error('Error fetching group members:', error);
        res.status(500).json({ message: 'Failed to retrieve group members' });
    }
});

//endpoint to get all groups joined by a user
router.get('/groups_joined', auth, async (req, res) => {
    try {
        const groupsJoined = await getGroupsJoined(res.locals.user_id);
        //check if groupsJoined array is empty
        if (groupsJoined.length === 0) {
            return res.status(404).json({ message: 'No groups joined' });
        }
        res.json({ message: 'Groups joined retrieved successfully', groupsJoined });
    } catch (error) {
        console.error('Error fetching groups joined:', error);
        res.status(500).json({ message: 'Failed to retrieve groups joined' });
    }
});



module.exports = router;