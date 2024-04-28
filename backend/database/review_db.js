const pgPool = require('./pg_connection');

const sql = {
    GET_ALL_REVIEWS : 'SELECT * FROM review',
    GET_REVIEWS_BY_USER: 'SELECT * FROM review WHERE user_id=$1',
    GET_REVIEW_BY_ID: 'SELECT * FROM review WHERE review_id=$1',
    GET_REVIEW_BY_MEDIA_ID: 'SELECT * FROM review WHERE media_type=$1',
    ADD_REVIEW: 'INSERT INTO review (media_type, user_id, rating, review_text) VALUES ($1, $2, $3, $4)',
    DELETE_REVIEW: 'DELETE FROM review WHERE review_id = $1'
}

async function getAllReviews() {
    let result = await pgPool.query(sql.GET_ALL_REVIEWS);
    return result.rows;
}

async function getReviewsByUser(user_id) {
    let result = await pgPool.query(sql.GET_REVIEWS_BY_USER, [user_id]);
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

async function addReview(media_type, user_id, rating, review_text){
    await pgPool.query(sql.ADD_REVIEW, [media_type, user_id, rating, review_text])
}

async function deleteReview(review_id){
    await pgPool.query(sql.DELETE_REVIEW, [review_id])
}

module.exports = {getAllReviews, getReviewsByUser, getReviewById, getReviewByMediaId, addReview, deleteReview}