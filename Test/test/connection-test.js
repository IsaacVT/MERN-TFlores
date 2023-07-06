const assert = require('assert');
const app = require('../../server/src/index');
const request = require('supertest');

describe('CONNECTION SERVER', function () {
    let server;

    before(function (done) {
        server = app.listen(5000, function () {
            console.log('Server listening on port 5000');
            done();
        });
    });

    after(function (done) {
        server.close(function () {
            console.log('Server closed');
            done();
        });
    });

    describe('GET /', function () {
        it('should return 200 OK', function (done) {
            request(server)
                .get('/')
                .expect(200, done);
        });
    });
});