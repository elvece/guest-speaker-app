process.env.NODE_ENV = 'test';

var mocha = require('mocha');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../src/server/app.js');
var models = require('../../src/server/models/index');
var passportStub = require('passport-stub');

passportStub.install(server);
var should = chai.should();
chai.use(chaiHttp);


describe('index routes', function() {

  beforeEach(function(done){
    models.User.sync({
      force: true
    }).then(function() {
      models.User.create({
        email: 'michael@herman.com',
        admin: false
      }).then(function(user) {
        passportStub.login(user);
        done();
      });
    });
  });

  afterEach(function(done){
    models.User.sync({
      force: true
    }).then(function() {
      done();
    });
  });

  it('should contain a `/` route', function(done) {
    chai.request(server)
    .get('/')
    .end(function(err, res) {
      res.should.have.status(200);
      res.text.should.have.string('<p>Welcome');
      res.text.should.have.string('<li><a href="/auth/logout">Logout</a></li>');
      done();
    });
  });

  it('should behave differently when a user is logged in', function(done) {
    chai.request(server)
      .get('/')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.html;
        res.text.should.have.string('<li><a href="/auth/logout">Logout</a></li>');
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
