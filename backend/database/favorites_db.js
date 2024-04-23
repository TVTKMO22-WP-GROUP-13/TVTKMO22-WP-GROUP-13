const pgPool = require('./pg_connection');

const sql = {
   // GET_USER: 'SELECT * FROM list_entry WHERE user_id=$1',
    GET_ALL_FAVORITES: 'SELECT * FROM list_entry',
    GET_FAVORITES: 'SELECT * FROM list_entry WHERE user_id=$1 AND list_type=\'favorite\'',
    ADD_FAVORITE: 'INSERT INTO list_entry (user_id, media_id, list_type, group_id, status, added_by_user_id) VALUES ($1, $2, $3, $4, $5, $6)',
    REMOVE_FAVORITE: 'DELETE FROM list entry_ WHERE user_id=$1 AND media_id=$2 AND list_type=\'favorite\''
}

/* async function getUser(user_id){
    let result = await pgPool.query(sql.GET_USER, [user_id]);
    return result.rows;
}
*/

async function getAllFavorites(){
    let result = await pgPool.query(sql.GET_ALL_FAVORITES);
    return result.rows;
}

async function getFavorites(user_id){
    let result = await pgPool.query(sql.GET_FAVORITES, [user_id]);
    return result.rows;
}

async function addFavorite(user_id, media_id, list_type, group_id, status, added_by_user_id){
    await pgPool.query(sql.ADD_FAVORITE, [user_id, media_id, list_type, group_id, status, added_by_user_id]);
}

async function removeFavorite(user_id, media_id, list_type){
    await pgPool.query(sql.REMOVE_FAVORITE, [user_id, media_id, list_type]);
}

module.exports = { getAllFavorites, getFavorites, addFavorite, removeFavorite };