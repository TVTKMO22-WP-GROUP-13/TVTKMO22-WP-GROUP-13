const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const sinon = require('sinon');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authDb = require('../database/auth_db');
const userDataDb = require('../database/user_data_db');

chai.use(chaiHttp);
const expect = chai.expect;


describe('POST /login', () => {
    let getPasswordStub, bcryptCompareStub, getUserStub, jwtSignStub;

    beforeEach(() => {
        getPasswordStub = sinon.stub(authDb, 'getPassword').resolves('hashed_password');
        bcryptCompareStub = sinon.stub(bcrypt, 'compare').resolves(true);
        getUserStub = sinon.stub(userDataDb, 'getUser').resolves({ user_id: '12345' });
        jwtSignStub = sinon.stub(jwt, 'sign').returns('fake_jwt_token');
    });

    afterEach(() => {
        sinon.restore();
    });

    //here we try to log in user with correct credentials so you can test it for ex. with your own account
    it('should log in user and return JWT if credentials are correct', (done) => {
        chai.request(server)
            .post('/authentication/login')
            .send({ username: 'motivation', pw: '268122' })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('jwtToken', 'fake_jwt_token');
                done();
            });
    });

    it('should return 401 if password is wrong', (done) => {
        bcryptCompareStub.resolves(false);

        chai.request(server)
            .post('/authentication/login')
            .send({ username: 'motivation', pw: 'wrongpassword' })
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('error', 'Wrong password');
                done();
            });
    });

    it('should return 404 if user not found', (done) => {
        getPasswordStub.resolves(null);

        chai.request(server)
            .post('/authentication/login')
            .send({ username: 'nonexistent', pw: 'password' })
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('error', 'User not found');
                done();
            });
    });
});