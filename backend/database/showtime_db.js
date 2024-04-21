const pgPool = require('./pg_connection');

const sql = {
    GET_ALL_SHOWTIMES: 'SELECT * FROM showtime',
    GET_SHOWTIME: 'SELECT * FROM showtime WHERE showtime_id=$1',
    GET_SHOWTIME_BY_GROUP_ID: 'SELECT * FROM showtime WHERE group_id=$1',
    ADD_SHOWTIME: 'INSERT INTO showtime (showtime, theater_name, group_id, movie_title, added_by_user_id) VALUES ($1, $2, $3, $4, $5)',
    DELETE_SHOWTIME: 'DELETE FROM showtime WHERE group_id = $1 AND showtime_id = $2'
}


async function getShowtimes(){
    let result = await pgPool.query(sql.GET_ALL_SHOWTIMES);
    return result.rows;
}

async function getShowtime(showtime){
    let result = await pgPool.query(sql.GET_SHOWTIME, [showtime]);
    return result.rows[0];
}
async function getShowtimeByGroupId (group_id){
    let result = await pgPool.query(sql.GET_SHOWTIME_BY_GROUP_ID, [group_id]);
    return result.rows;
}
async function addShowtime(showtime, theater_name, group_id,  movie_title, added_by_user_id){
    await pgPool.query(sql.ADD_SHOWTIME, [showtime, theater_name, group_id, movie_title, added_by_user_id]);
}

async function deleteShowtime(group_id, showtime_id){
    await pgPool.query(sql.DELETE_SHOWTIME, [group_id, showtime_id]);
}


module.exports = {getShowtimes, getShowtime, getShowtimeByGroupId, addShowtime, deleteShowtime};