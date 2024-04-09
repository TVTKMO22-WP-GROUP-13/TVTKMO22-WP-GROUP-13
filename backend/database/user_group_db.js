const pgPool = require('./pg_connection');

const sql = {
    GET_ALL_GROUPS: 'SELECT * FROM user_group',
    GET_GROUP: 'SELECT * FROM user_group WHERE group_id = $1',
    CREATE_GROUP: 'INSERT INTO user_group (group_name, description, owner_id) VALUES ($1, $2, $3)',
    GET_USER_CREATED_GROUPS: 'SELECT * FROM user_group WHERE owner_id = $1',
    DELETE_GROUP: 'DELETE FROM user_group WHERE group_id = $1 AND owner_id = $2'
}


async function getGroups(){
    let result = await pgPool.query(sql.GET_ALL_GROUPS);
    return result.rows;
}

async function getGroup(group_id) {
    let result = await pgPool.query(sql.GET_GROUP, [group_id]);
    return result.rows[0];
}

async function createGroup(group_name, description, owner_id){
    await pgPool.query(sql.CREATE_GROUP, [group_name, description, owner_id]);
}

async function getUserCreatedGroups(owner_id){
    let result = await pgPool.query(sql.GET_USER_CREATED_GROUPS, [owner_id]);
    return result.rows;
}

async function deleteGroup(group_id, owner_id){
    await pgPool.query(sql.DELETE_GROUP, [group_id, owner_id]);
}

module.exports = {getGroups, getGroup, getUserCreatedGroups, deleteGroup, createGroup};