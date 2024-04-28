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

// Create a valid JWT token for testing with real user data
function generateTestToken() {
    const payload = {
        username: 'testUser3',
        user_id: '117'
    };
    return jwt.sign(payload, process.env.JWT_SECRET);
}
const validToken = generateTestToken();

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
    let getPasswordStub, bcryptCompareStub, deleteUserStub, authStub;

    beforeEach(() => {
        getPasswordStub = sinon.stub(authDb, 'getPassword').resolves('hashed_password');
        bcryptCompareStub = sinon.stub(bcrypt, 'compare').resolves(true);
        deleteUserStub = sinon.stub(authDb, 'deleteUser').resolves();
        authStub = sinon.stub(auth, 'auth').callsFake((req, res, next) => {
            res.locals.username = req.body.username;  // Authenticate as the requested user
            res.locals.user_id = '117';                // Fake user ID
            next();
        });
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should return 403 if trying to delete another user\'s account', (done) => {
        // Override authentication stub to simulate logged in as a different user
        authStub.restore();
        sinon.stub(auth, 'auth').callsFake((req, res, next) => {
            res.locals.username = 'motivation';  // Authenticate as another user
            res.locals.user_id = '52';
            next();
        });

        chai.request(server)
            .delete('/authentication/delete')
            .set('Authorization', `Bearer ${validToken}`)
            .send({ username: 'testuser', pw: 'password' })
            .end((err, res) => {
                expect(res).to.have.status(403);
                expect(res.body).to.have.property('error', 'Unaut. You can only delete your own account');
                done();
            });
    });

    it('should return 401 if password is incorrect', (done) => {
        bcryptCompareStub.resolves(false); // Override for this test case

        chai.request(server)
            .delete('/authentication/delete')
            .set('Authorization', `Bearer ${validToken}`)
            .send({ username: 'testUser3', pw: 'wrongpassword' })
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('error', 'incorrect password');
                done();
            });
    });

    it('should return 404 if user not found', (done) => {
        getPasswordStub.resolves(null); // Override for this test case

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

    it('should delete a user if authenticated and password is correct', (done) => {
        chai.request(server)
            .delete('/authentication/delete')
            .set('Authorization', `Bearer ${validToken}`)
            .send({ username: 'testUser3', pw: '1234' })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message', 'user deleted');
                done();
            });
    });

});
