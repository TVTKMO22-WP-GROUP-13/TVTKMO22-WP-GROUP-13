const pgPool = require('./pg_connection');

const sql = {
    GET_ALL_LIST_ENTRY: 'SELECT * FROM list_entry',
    GET_LIST_ENTRY_BY_USER: 'SELECT * FROM list_entry WHERE user_id=$1 AND list_type=$2',
    GET_LIST_ENTRY_BY_GROUP: 'SELECT * FROM list_entry WHERE group_id=$1 AND list_type=$2',
    ADD_LIST_ENTRY: 'INSERT INTO list_entry (user_id, media_id, list_type, group_id, added_by_user_id) VALUES ($1, $2, $3, $4, $5)',
    REMOVE_LIST_ENTRY: 'DELETE FROM list_entry WHERE user_id=$1 AND entry_id=$2 AND list_type=$3',
}

async function getAllListEntries(){
    let result = await pgPool.query(sql.GET_ALL_LIST_ENTRY);
    return result.rows;
}
async function getListEntriesByUser(user_id, list_type){
    let  result = await pgPool.query(sql.GET_LIST_ENTRY_BY_USER, [user_id, list_type]);
    return result.rows;
} 
async function getListEntriesByGroup(group_id, list_type){
    let  result = await pgPool.query(sql.GET_LIST_ENTRY_BY_GROUP, [group_id, list_type]);
    return result.rows;
}
async function addListEntry(user_id, media_id, list_type, group_id, added_by_user_id){
    await pgPool.query(sql.ADD_LIST_ENTRY, [user_id, media_id, list_type, group_id, added_by_user_id]);
}
async function removeListEntry(user_id, entry_id, list_type){
    await pgPool.query(sql.REMOVE_LIST_ENTRY, [user_id, entry_id, list_type]);
}

module.exports = {getAllListEntries, getListEntriesByGroup, getListEntriesByUser, addListEntry, removeListEntry};