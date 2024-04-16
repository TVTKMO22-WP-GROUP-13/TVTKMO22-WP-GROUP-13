const pgPool = require('./pg_connection');

const sql = {
    ADD_USER_TO_GROUP: 'INSERT INTO user_group_member (group_id, user_id) VALUES ($1, $2)',
    REMOVE_USER_FROM_GROUP: 'DELETE FROM user_group_member WHERE group_id = $1 AND user_id = $2',
    GET_GROUP_MEMBERS: 'SELECT user_id FROM user_group_member WHERE group_id = $1',
    GET_GROUPS_JOINED: 'SELECT * FROM user_group WHERE group_id IN (SELECT group_id FROM user_group_member WHERE user_id = $1)',
};

async function addUserToGroup(group_id, user_id){
    let result = await pgPool.query(sql.ADD_USER_TO_GROUP, [group_id, user_id]);
    return result;
}

async function removeUserFromGroup(group_id, user_id){
    let result = await pgPool.query(sql.REMOVE_USER_FROM_GROUP, [group_id, user_id]);
    return result;
}

async function getGroupMembers(group_id){
    let result = await pgPool.query(sql.GET_GROUP_MEMBERS, [group_id]);
    return result.rows;
}

async function getGroupsJoined(user_id){
    let result = await pgPool.query(sql.GET_GROUPS_JOINED, [user_id]);
    return result.rows;
}

module.exports = {addUserToGroup,removeUserFromGroup, getGroupMembers, getGroupsJoined};