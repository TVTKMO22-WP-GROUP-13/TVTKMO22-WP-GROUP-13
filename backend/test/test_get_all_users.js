let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');

chai.use(chaiHttp);

describe('GET users', () => {
    it('it should GET all the users', (done) => {
        chai.request(server)
            .get('/user_data/all')
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.be.a('object');
                done();
            });
    });
});