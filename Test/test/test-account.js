const assert = require('assert');
const app = require('../../server/src/index');
const request = require('supertest');

describe('ACCOUNT TEST', function () {
    let server;
    let account = '';

    before(function (done) {
        server = app.listen(5000, function () {
            console.log('Server opened');
            done();
        });
    });

    after(function (done) {
        server.close(function () {
            console.log('Server closed');
            done();
        });
    });

    describe('GET /api/mern/getAccount', function () {
        it('should return 200 OK', function (done) {
            request(server)
                .get('/api/mern/getAccount')
                .expect(200, done);
        });
    });

    describe('POST /api/mern/saveAccount', function () {
        it('should handle POST requests', function (done) {

            const newAccount = { email: 'test@test.com', password: 'dapIbero.1' };

            request(server)
                .post('/api/mern/saveAccount')
                .send(newAccount)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    assert.deepStrictEqual(
                        { 'email': res.body.email },
                        { 'email': newAccount.email }
                    );
                    account = res.body._id
                    done();
                });
        });
    });

    describe('DELETE /api/mern/deleteAccount/:id', function () {
        it('should delete an account by id', function (done) {
            request(server)
                .delete(`/api/mern/deleteAccount/${account}`)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    assert.equal(res.body.status, 'Account delete');
                    done();
                });
        });
    });
});