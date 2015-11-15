process.env.NODE_ENV = 'test';

var mocha = require('mocha');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../src/server/app.js');

var should = chai.should();
chai.use(chaiHttp);

describe('index routes', function() {
  it('should contain a `/` route', function(done) {
    chai.request(server)
    .get('/')
    .end(function(err, res) {
      res.should.have.status(200);
      res.text.should.have.string('<p>Welcome');
      done();
    });
  });
  it('should handle 404 errors', function(done) {
    chai.request(server)
    .get('/doesnotexist')
    .end(function(err, res) {
      res.should.have.status(404);
      res.text.should.have.string('<h1>Not Found</h1>');
      done();
    });
  });
});
