const { auth } = require('../middleware/auth');
const {addGroupRequest, getGroupRequests, updateGroupRequest} = require('../database/group_request_db');

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

module.exports = router;