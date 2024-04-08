const pgPool = require('./pg_connection');

const sql = {
    REGISTER: 'INSERT INTO user_data (username, password_hash) VALUES ($1, $2)',
    GET_PASSWORD: 'SELECT password_hash FROM user_data WHERE username=$1',
    DELETE_USER: 'DELETE FROM user_data WHERE username = $1',
    CREATE_GROUP: 'INSERT INTO user_group (group_name, description, owner_id) VALUES ($1, $2, $3)',
};

async function register(username, password_hash){
    await pgPool.query(sql.REGISTER, [username, password_hash]);
}

async function getPassword(username){
    const result = await pgPool.query(sql.GET_PASSWORD, [username]);
    return result.rowCount > 0 ? result.rows[0].password_hash : null;

}
async function deleteUser(username){
    await pgPool.query(sql.DELETE_USER,[username]);
}

async function createGroup(group_name, description, owner_id){
    await pgPool.query(sql.CREATE_GROUP, [group_name, description, owner_id]);
}

module.exports = {register, getPassword, createGroup, deleteUser};