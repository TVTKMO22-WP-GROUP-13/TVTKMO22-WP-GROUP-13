const pgPool = require('./pg_connection');

const sql = {
    GET_ALL_REVIEWS : 'SELECT * FROM review',
    GET_REVIEW_BY_ID: 'SELECT * FROM review WHERE review_id=$1',
    GET_REVIEW_BY_MEDIA_ID: 'SELECT * FROM review WHERE media_id=$1',
    ADD_REVIEW: 'INSERT INTO review (media_id, user_id, rating, review_text) VALUES ($1, $2, $3, $4)',
    DELETE_REVIEW: 'DELETE FROM review WHERE review_id = $1'
}

async function getAllReviews() {
    let result = await pgPool.query(sql.GET_ALL_REVIEWS);
    return result.rows;
}

async function getReviewById(review_id) {
    let result = await pgPool.query(sql.GET_REVIEW_BY_ID, [review_id]);
    return result.rows[0];
}

async function getReviewByMediaId(media_id) {
    let result = await pgPool.query(sql.GET_REVIEW_BY_MEDIA_ID, [media_id]);
    return result.rows;
}

async function addReview(media_id, user_id, rating, review_text){
    await pgPool.query(sql.ADD_REVIEW, [media_id, user_id, rating, review_text])
}

async function deleteReview(review_id){
    await pgPool.query(sql.DELETE_REVIEW, [review_id])
}

module.exports = {getAllReviews, getReviewById, getReviewByMediaId, addReview, deleteReview}