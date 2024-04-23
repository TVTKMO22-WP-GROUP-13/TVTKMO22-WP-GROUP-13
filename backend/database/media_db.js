const pgPool = require('./pg_connection');

const sql = {
    GET_ALL_MEDIA : 'SELECT * FROM media',
    GET_MEDIA_BY_ID: 'SELECT * FROM media WHERE media_id=$1',
    ADD_MEDIA: 'INSERT INTO media (tmdb_id, media_type) VALUES ($1, $2)',
    DELETE_MEDIA: 'DELETE FROM media WHERE media_id = $1'
}

async function getAllMedia() {
    let result = await pgPool.query(sql.GET_ALL_MEDIA);
    return result.rows;
}

async function getMediaById(media_id) {
    let result = await pgPool.query(sql.GET_MEDIA_BY_ID, [media_id]);
    return result.rows[0];
}

async function addMedia(tmdb_id, media_type){
    await pgPool.query(sql.ADD_MEDIA, [tmdb_id, media_type])
}

async function deleteMedia(media_id){
    await pgPool.query(sql.DELETE_MEDIA, [media_id])
}

module.exports = {getAllMedia, getMediaById, addMedia, deleteMedia}

