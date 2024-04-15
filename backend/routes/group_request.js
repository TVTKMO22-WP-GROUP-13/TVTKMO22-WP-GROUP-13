const { auth } = require('../middleware/auth');
const {addGroupRequest, getGroupRequests, updateGroupRequest, getUserRequests, getUserInvolvedGroups} = require('../database/group_request_db');

const router = require('express').Router();

//endpoint to add group join request
router.post('/add_request', auth, async (req, res) => {
    const user_id = res.locals.user_id;
    console.log("user_id: ", user_id);

    const group_id = req.body.group_id;
    console.log("group_id: ", group_id);

    try {
        const result = await addGroupRequest(group_id, user_id);
        if (!result) {
            return res.status(404).json({ message: 'Group join request failed' });
        }
        res.status(201).json({ message: 'Group join request added successfully', result });
    } catch (error) {
        console.error('Error adding group join request:', error);
        res.status(500).json({ message: 'Failed to add group join request' });
    }
});

//endpoint to get group requests in a certain group
router.get('/group_requests', async (req, res) => {
    try {
        const groupRequests = await getGroupRequests(req.query.group_id);
        if (groupRequests.length === 0) {
            return res.status(404).json({ message: 'No group requests found' });
        }
        res.json({ message: 'Group requests retrieved successfully', groupRequests });
    } catch (error) {
        console.error('Error fetching group requests:', error);
        res.status(500).json({ message: 'Failed to retrieve group requests' });
    }
});

//endpoint to update group request status
router.patch('/update_status', async (req, res) => {
    const { request_id, request_status } = req.body; 

    try {
        if (!['Pending', 'Accepted', 'Rejected'].includes(request_status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        const result = await updateGroupRequest(request_status, request_id);
        if (!result) {
            return res.status(404).json({ message: 'Group join request not found' });
        }
        res.json({ message: 'Group join request updated successfully', result });
    } catch (error) {
        console.error('Error updating group join request:', error);
        res.status(500).json({ message: 'Failed to update group join request' });
    }
});

//endpoint to get user requests by user_id
router.get('/user_requests', auth, async (req, res) => {
    const user_id = res.locals.user_id;
    console.log("user_id: ", user_id);

    try {
        const userRequests = await getUserRequests(user_id);
        if (userRequests.length === 0) {
            return res.status(404).json({ message: 'No user requests found' });
        }
        res.json({ message: 'User requests retrieved successfully', userRequests });
    } catch (error) {
        console.error('Error fetching user requests:', error);
        res.status(500).json({ message: 'Failed to retrieve user requests' });
    }
});

//endpoint to get user involved groups by user_id
router.get('/user_involved_groups', auth, async (req, res) => {
    const user_id = res.locals.user_id;
    console.log("user_id: ", user_id);

    try {
        const involvedGroups = await getUserInvolvedGroups(user_id);
        if (involvedGroups.length === 0) {
            return res.status(404).json({ message: 'No groups found where user is involved' });
        }
        res.json({ message: 'User involved groups retrieved successfully', involvedGroups });
    } catch (error) {
        console.error('Error fetching user involved groups:', error);
        res.status(500).json({ message: 'Failed to retrieve user involved groups' });
    }
});

module.exports = router;