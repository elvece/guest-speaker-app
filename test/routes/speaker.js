process.env.NODE_ENV = 'test';

var mocha = require('mocha');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../src/server/app.js');
var models = require('../../src/server/models/index');

var should = chai.should();
chai.use(chaiHttp);

describe('speaker routes', function() {

  beforeEach(function(done){
    models.Speaker.sync({
      force: true
    }).then(function() {
      models.Speaker.create({
        first_name: 'Michael',
        last_name: 'McBain',
        email: 'michael@mcbain.com',
        topic: 'Node for Life',
        speaking_date: new Date(),
        company: 'Galvanize'
      }).then(function() {
        done();
      });
    });
  });

  afterEach(function(done){
    models.Speaker.sync({
      force: true
    }).then(function() {
      done();
    });
  });

  it('should list ALL speakers', function(done) {
    chai.request(server)
      .get('/api/v1/speakers')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.length(1);
        res.body.should.be.a('array');
        res.body[0].should.have.property('id');
        res.body[0].should.have.property('first_name');
        res.body[0].should.have.property('last_name');
        res.body[0].first_name.should.equal('Michael');
        res.body[0].last_name.should.equal('McBain');
        done();
      });
  });

  it('should list a SINGLE speaker', function(done) {
    chai.request(server)
      .get('/api/v1/speaker/1')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('first_name');
        res.body.should.have.property('last_name');
        res.body.first_name.should.equal('Michael');
        res.body.last_name.should.equal('McBain');
        done();
      });
  });

  it('should add a SINGLE speaker', function(done) {
    chai.request(server)
      .post('/api/v1/speakers')
      .send({
        first_name: 'Michael',
        last_name: 'Herman',
        email: 'michael@herman.com',
        topic: 'Python',
        speaking_date: new Date(),
        company: 'Real Python'
      })
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('first_name');
        res.body.should.have.property('company');
        res.body.should.have.property('id');
        res.body.first_name.should.equal('Michael');
        res.body.company.should.equal('Real Python');
        done();
      });
  });

  it('should update a SINGLE speaker', function(done) {
    chai.request(server)
      .put('/api/v1/speaker/1')
      .send({'last_name': 'Johnson'})
      .end(function(error, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('first_name');
        res.body.should.have.property('company');
        res.body.should.have.property('id');
        res.body.first_name.should.equal('Michael');
        res.body.last_name.should.equal('Johnson');
        done();
    });
  });

  it('should delete a SINGLE spaker', function(done) {
    chai.request(server)
      .delete('/api/v1/speaker/1')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        chai.request(server)
          .get('/api/v1/speaker/1')
          .end(function(error, response){
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.eql({});
            done();
          });
      });
  });

});
