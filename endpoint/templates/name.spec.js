'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var test = require('../../test');
var <%= name %> = require('./<%= name %>.model');

describe('<%= name %>s endpoint', function () {

    var id = 0;
    var token = '';

    before(function (done) {
        test.auth(request, function (accessToken) {
            token = '?access_token=' + accessToken;
            done();
        });
    });

    after(function (done) {
        <%= name %>.remove().exec().then(function () {
            done();
        });
    });

    it('should respond with JSON array', function (done) {
        request(app)
            .get('/api/<%= name%>s' + token)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                res.body.should.have.length(0);
                done();
            });
    });

    it('should create a new <%= name %>', function (done) {
        request(app)
            .post('/api/<%= name%>s' + token)
            .send()
            .expect(201)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.have.property('_id');
                id = res.body._id;
                done();
            });
    });

    it('should update a <%= name %>', function (done) {
        request(app)
            .put('/api/<%= name%>s/' + id + token)
            .send({})
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.have.property('_id');
                done();
            });
    });

    it('should get a <%= name %>', function (done) {
        request(app)
            .get('/api/<%= name%>s/' + id + token)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.have.property('_id');
                done();
            });
    });

    it('should delete a <%= name %>', function (done) {
        request(app)
            .delete('/api/<%= name%>s/' + id + token)
            .expect(204)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });
});
