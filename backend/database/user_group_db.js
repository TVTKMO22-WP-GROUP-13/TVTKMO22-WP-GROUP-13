const pgPool = require('./pg_connection');

const sql = {
    GET_ALL_GROUPS: 'SELECT * FROM user_group',
}


async function getGroups(){
    let result = await pgPool.query(sql.GET_ALL_GROUPS);
    return result.rows;
}

module.exports = {getGroups};