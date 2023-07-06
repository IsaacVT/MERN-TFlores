const assert = require('assert');
const app = require('../../server/src/index');
const request = require('supertest');

describe('PRODUCT TEST', function () {
    let server;

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

    describe('GET /api/mern/getProducts', function () {
        it('should return 200 OK', function (done) {
            request(server)
                .get('/api/mern/getProducts')
                .expect(200, done);
        });
    });
});