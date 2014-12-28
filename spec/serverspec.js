var request = require('supertest');
var express = require('express');
var chai = require('chai'),
    expect = chai.expect,
    assert = chai.assert,
    should = chai.should();

var app = require('../server/server.js');

// Test user for authentication and API testing.
var user = {
  username: 'test',
  password: 'test'
};

describe('Client Unit Tests', function() {
  it('should serve memoryBox app on home route', function(done) {
    request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)
      .expect(/ng-app="memoryBox"/, done);
  });
});

describe('Authentication Tests', function() {
  before(function(done) {
    // Delete test user from DB.
    done();
  });
  describe('Signup', function() {
    it('should save user to db on /auth/signup', function(done) {
      request(app)
        .post('/auth/signup')
        .send(user)
        .expect(200, done);
    });
    it('should not save duplicate user to db on /auth/signup', function(done) {
      request(app)
        .post('/auth/signup')
        .send(user)
        .expect(409, done);
    });
  });
  describe('Login', function() {
    before(function(done) {
      // Delete invalid user from DB.
      done();
    });
    it('should 403 on invalid login to /auth/login', function(done) {
      request(app)
        .post('/auth/login')
        .send({username: 'bad', password: 'bad'})
        .expect(403, done);
    });
    it('should send JWT on successful login', function() {
      request(app)
        .post('/auth/login')
        .send(user)
        .expect(200)
        .expect(/CHECK FOR JWT HERE/, done);
    });
  });
});

describe('API Unit Tests', function() {
  var token = null;
  var badToken = 'i am a bad token';
  var apiRoute = '/api/' + user.username;
  before(function(done) {
    /*
    Clear test DB section
    Create test users
    Add test links
    Add test friend connections
    Get a JWT token for test user
    */
    done();
  });
  it('should have /api route', function(done) {
    assert(false, 'ADD TESTS HERE');
  });
  it('should not allow access to /api/<user> without token', function(done) {
    request(app)
      .get(apiRoute)
      .expect(403, done);
  });
  it('should not allow access to /api/<user> without valid token', function(done) {
    request(app)
      .get(apiRoute)
      .send(badToken)
      .expect(403, done);
  });
  it('should not allow access to /api/<user> for other users without their token', function(done) {
    request(app)
      .get('/api/' + 'dummy1')
      .send(token)
      .expect(403, done);
  });
  it('should send user saved links on /api/<user>/links', function(done) {
    request(app)
      .get(apiRoute + '/links')
      .send(token)
      .expect(200)
      .expect(/google/, done);
  });
  it('should send user friends on /api/<user>/friends', function(done) {
    request(app)
      .get(apiRoute + '/friends')
      .send(token)
      .expect(200)
      .expect(/dummy1/, done);
  });
});
