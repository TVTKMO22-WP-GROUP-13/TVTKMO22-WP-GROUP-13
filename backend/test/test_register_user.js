const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const sinon = require('sinon');
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');

chai.use(chaiHttp);
const expect = chai.expect;

describe('POST /register', () => {
    let hashStub;

    before(() => {
        hashStub = sinon.stub(bcrypt, 'hash').resolves('hashed_password');
    });

    after(() => {
        sinon.restore();
    });

    const username = faker.internet.userName();
    const password = faker.internet.password(8);

    it('should register a user successfully', (done) => {
        chai.request(server)
            .post('/authentication/register')
            .send({ username: username, pw: password })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('message', 'User registered successfully');
                done();
            });
    });

    it('should reject registration with a username that is too short', (done) => {
        chai.request(server)
            .post('/authentication/register')
            .send({ username: 'abc', pw: password })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error', 'Username must be at least 4 characters long');
                done();
            });
    });

    it('should reject registration with a password that is too short', (done) => {
        chai.request(server)
            .post('/authentication/register')
            .send({ username: username, pw: 'abc' })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error', 'Password must be at least 4 characters long');
                done();
            });
    });

    it('should reject registration if username is already taken', (done) => {
        chai.request(server)
            .post('/authentication/register')
            .send({ username: username, pw: password })
            .end((err, res) => {
                expect(res).to.have.status(409);
                expect(res.body).to.have.property('error', 'Username is already taken');
                done();
            });
    });
});