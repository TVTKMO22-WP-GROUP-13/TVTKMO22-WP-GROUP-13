const pgPool = require('../database/pg_connection');
const { auth } = require('../middleware/auth');
const {addGroupRequest, getGroupRequests, updateGroupRequest, getUserRequests, getUserInvolvedGroups, getPendingGroupRequests} = require('../database/group_request_db');
const {addUserToGroup} = require('../database/group_member_db');

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
router.get('/getRequests/:group_id', auth, async (req, res) => {
    try {
        const groupRequests = await getGroupRequests(req.params.group_id);
        if (groupRequests.length === 0) {
            return res.status(404).json({ message: 'No group requests found' });
        }
        res.json({ message: 'Group requests retrieved successfully', groupRequests });
    } catch (error) {
        console.error('Error fetching group requests:', error);
        res.status(500).json({ message: 'Failed to retrieve group requests' });
    }
});

//enpoint to get pending group requests in a certain group
router.get('/getRequests/Pending/:group_id', auth, async (req, res) => {
    try {
        const groupRequests = await getPendingGroupRequests(req.params.group_id);
        if (groupRequests.length === 0) {
            return res.status(404).json({ message: 'No pending group requests found' });
        }
        res.json({ message: 'Pending group requests retrieved successfully', groupRequests });
    } catch (error) {
        console.error('Error fetching pending group requests:', error);
        res.status(500).json({ message: 'Failed to retrieve pending group requests' });
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

//endpoint to accept join request (uses both addUserToGroup and updateGroupRequest)
router.post('/acceptJoinRequest', async (req, res) => {
    const { group_id, user_id, request_id } = req.body;
    console.log("group_id: ", group_id, "user_id: ", user_id, "request_id: ", request_id);
    
    try {
        //start transaction (if one query fails, all queries will be rolled back)
        await pgPool.query('BEGIN');

        //add user to group
        const addUserResult = await addUserToGroup(group_id, user_id);
        if (!addUserResult.rowCount) {
            throw new Error('Failed to add user to group');
        }

        //update request status to 'Accepted'
        const updateRequestResult = await updateGroupRequest('Accepted', request_id);
        if (!updateRequestResult) {
            throw new Error('Failed to update join request status');
        }

        //commit transaction (if all queries are successful)
        await pgPool.query('COMMIT');

        res.json({ message: 'Join request processed successfully', addUserResult, updateRequestResult });
    } catch (error) {
        //rollback transaction (if any query fails)
        await pgPool.query('ROLLBACK');
        console.error('Error processing join request:', error);
        res.status(500).json({ message: 'Failed to process join request', error: error.message });
    }
});

module.exports = router;