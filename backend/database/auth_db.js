const pgPool = require('./pg_connection');

const sql = {
    REGISTER: 'INSERT INTO user_data (username, password_hash) VALUES ($1, $2)',
    GET_PASSWORD: 'SELECT password_hash FROM user_data WHERE username=$1'
};

async function register(username, password_hash){
    await pgPool.query(sql.REGISTER, [username, password_hash]);
}

async function getPassword(username){
    const result = await pgPool.query(sql.GET_PASSWORD, [username]);
    return result.rowCount > 0 ? result.rows[0].pw : null;

}

module.exports = {register, getPassword};