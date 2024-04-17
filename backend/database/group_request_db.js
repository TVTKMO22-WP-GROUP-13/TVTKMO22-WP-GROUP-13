const pgPool = require('./pg_connection');

const sql = {
    ADD_GROUP_REQUEST: 'INSERT INTO group_request (group_id, user_id) VALUES ($1, $2) RETURNING *;',
    GET_GROUP_REQUESTS: 'SELECT request_id, user_id FROM group_request WHERE group_id = $1',
    GET_PENDING_GROUP_REQUESTS: 'SELECT request_id, user_id FROM group_request WHERE group_id = $1 AND request_status = \'Pending\';',
    UPDATE_GROUP_REQUEST: 'UPDATE group_request SET request_status = $1 WHERE request_id = $2 RETURNING *;',
    GET_USER_REQUESTS: 'SELECT group_id FROM group_request WHERE user_id = $1',
    GET_USER_INVOLVED_GROUPS: `
        -- Hae kaikki ryhmät, joissa käyttäjä on omistaja
        SELECT 
            g.group_id, 
            g.group_name, 
            g.description, 
            g.owner_id, 
            g.created_at,
            'owner' AS role
        FROM 
            user_group AS g
        WHERE 
            g.owner_id = $1
        
        UNION
        
        -- Hae kaikki ryhmät, joissa käyttäjä on jäsen
        SELECT 
            g.group_id, 
            g.group_name, 
            g.description, 
            g.owner_id, 
            g.created_at,
            'member' AS role
        FROM 
            user_group AS g
        JOIN 
            user_group_member AS m ON g.group_id = m.group_id
        WHERE 
            m.user_id = $1
        
        UNION
        
        -- Hae kaikki ryhmät, joissa käyttäjä on tehnyt liittymispyynnön (riippumatta pyynnön tilasta)
        SELECT 
            g.group_id, 
            g.group_name, 
            g.description, 
            g.owner_id, 
            g.created_at,
            r.request_status::text AS role
        FROM 
            user_group AS g
        JOIN 
            group_request AS r ON g.group_id = r.group_id
        WHERE 
            r.user_id = $1;
    `
    };
    

async function addGroupRequest(group_id, user_id) {
    console.log("addGroupRequest called with group_id:", group_id, "and user_id:", user_id);
    try {
        const result = await pgPool.query(sql.ADD_GROUP_REQUEST, [group_id, user_id]);
        return result.rows[0];
    } catch (error) {
        throw new Error('Error adding group request: ' + error.message);
    }
}

async function getGroupRequests(group_id) {
    try {
        const result = await pgPool.query(sql.GET_GROUP_REQUESTS, [group_id]);
        return result.rows;
    } catch (error) {
        throw new Error('Error retrieving group requests: ' + error.message);
    }
}

async function getPendingGroupRequests(group_id) {
    try {
        const result = await pgPool.query(sql.GET_PENDING_GROUP_REQUESTS, [group_id]);
        return result.rows;
    } catch (error) {
        throw new Error('Error retrieving pending group requests: ' + error.message);
    }
}

async function updateGroupRequest(request_status, request_id) {
    try {
        const result = await pgPool.query(sql.UPDATE_GROUP_REQUEST, [request_status, request_id]);
        console.log("Update result:", result.rows);
        if (result.rows.length === 0) {
            throw new Error('No entry found to update');
        }
        return result.rows[0];
    } catch (error) {
        throw new Error('Error updating group request: ' + error.message);
    }
}

async function getUserRequests(user_id) {
    try {
        const result = await pgPool.query(sql.GET_USER_REQUESTS, [user_id]);
        return result.rows;
    } catch (error) {
        throw new Error('Error retrieving user requests: ' + error.message);
    }
}

async function getUserInvolvedGroups(user_id) {
    try {
        const result = await pgPool.query(sql.GET_USER_INVOLVED_GROUPS, [user_id]);
        return result.rows;
    } catch (error) {
        throw new Error('Error retrieving user involved groups: ' + error.message);
    }
}

module.exports = { addGroupRequest, getGroupRequests, updateGroupRequest, getUserRequests, getUserInvolvedGroups, getPendingGroupRequests};