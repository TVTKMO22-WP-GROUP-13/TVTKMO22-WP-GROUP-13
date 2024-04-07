const pgPool = require('./pg_connection');

const sql = {
    GET_ALL_USERS: 'SELECT username FROM user_data',
    GET_USER: 'SELECT user_id, username, created_at FROM user_data WHERE username=$1',
}


async function getUsers(){
    let result = await pgPool.query(sql.GET_ALL_USERS);
    return result.rows;
}

async function getUser(username){
    let result = await pgPool.query(sql.GET_USER, [username]);
    return result.rows[0];
}

module.exports = {getUsers, getUser};