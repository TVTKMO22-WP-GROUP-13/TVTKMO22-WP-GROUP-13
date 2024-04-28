const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const sinon = require('sinon');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { faker } = require('@faker-js/faker');

const authDb = require('../database/auth_db');
const auth = require('../middleware/auth');

chai.use(chaiHttp);
const expect = chai.expect;

// Create a invalid JWT token for testing with non-existing user data
function generateInvalidTestToken() {
    const payload = {
        username: 'nonexistent',
        user_id: '666'
    };
    return jwt.sign(payload, process.env.JWT_SECRET);
}
const invalidToken = generateInvalidTestToken();

describe('DELETE /delete', () => {
    let validToken, createdUser, createdUsername, password;

    //generate username and pw with faker, use these credentials to create a valid token
    before(async () => {
        createdUsername = faker.internet.userName();
        password = faker.internet.password(8);
        const hashedPassword = await bcrypt.hash(password, 10);
        createdUser = await authDb.register(createdUsername, hashedPassword);
        validToken = jwt.sign({ username: createdUsername, user_id: createdUser.user_id }, process.env.JWT_SECRET);
    });

    beforeEach(() => {
        sinon.stub(auth, 'auth').callsFake((req, res, next) => {
            res.locals.username = req.body.username; 
            res.locals.user_id = createdUserId;
            next();
        });
    });

    afterEach(() => {
        sinon.restore();
    });

    //here we try to delete a user with correct credentials that we just generated before
    it('should return 403 if trying to delete another user\'s account', (done) => {
        chai.request(server)
            .delete('/authentication/delete')
            .set('Authorization', `Bearer ${validToken}`)
            .send({ username: 'anotherUser', pw: 'password' })
            .end((err, res) => {
                expect(res).to.have.status(403);
                expect(res.body).to.have.property('error', 'Unaut. You can only delete your own account');
                done();
            });
    });

    //here we try to delete user with wrong password
    it('should return 401 if password is incorrect', (done) => {
        chai.request(server)
            .delete('/authentication/delete')
            .set('Authorization', `Bearer ${validToken}`)
            .send({ username: createdUser.username, pw: 'wrongpassword' })
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('error', 'incorrect password');
                done();
            });
    });

    //here we try to delete a user that does not exist
    it('should return 404 if user not found', (done) => {
        chai.request(server)
            .delete('/authentication/delete')
            .set('Authorization', `Bearer ${invalidToken}`)
            .send({ username: 'nonexistent', pw: 'password' })
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('error', 'user not found');
                done();
            });
    });

    //THIS TEST ONLY WORKS WHEN THE FIRST TEST SUCCEEDS
    //here we try to delete a user with correct credentials that we just generated before
    it('should delete a user if authenticated and password is correct', (done) => {
        chai.request(server)
            .delete('/authentication/delete')
            .set('Authorization', `Bearer ${validToken}`)
            .send({ username: createdUsername, pw: password })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message', 'user deleted');
                done();
            });
    });
});