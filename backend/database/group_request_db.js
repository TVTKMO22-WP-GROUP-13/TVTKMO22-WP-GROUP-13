const pgPool = require('./pg_connection');

const sql = {
    ADD_GROUP_REQUEST: 'INSERT INTO group_request (group_id, user_id) VALUES ($1, $2) RETURNING *;',
    GET_GROUP_REQUESTS: 'SELECT user_id FROM group_request WHERE group_id = $1',
    UPDATE_GROUP_REQUEST: 'UPDATE group_request SET request_status = $1 WHERE request_id = $2 RETURNING *;',
};

async function addGroupRequest(group_id, user_id){
    console.log("addGroupRequest called with group_id:", group_id, "and user_id:", user_id);
    try {
        const result = await pgPool.query(sql.ADD_GROUP_REQUEST, [group_id, user_id]);
        return result.rows[0];
    } catch (error) {
        throw new Error('Error adding group request: ' + error.message);
    }
}

async function getGroupRequests(group_id){
    try {
        const result = await pgPool.query(sql.GET_GROUP_REQUESTS, [group_id]);
        return result.rows;
    } catch (error) {
        throw new Error('Error retrieving group requests: ' + error.message);
    }
}

async function updateGroupRequest(request_status, request_id){
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

module.exports = {addGroupRequest, getGroupRequests, updateGroupRequest};