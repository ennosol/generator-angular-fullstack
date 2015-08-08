'use strict';

// Dependencies
var mongoose = require('mongoose');
var mongooseDelete = require('mongoose-delete');
var mongooseTimestamp = require('mongoose-timestamp');

// Model dependencies

// Schema
var schema = new mongoose.Schema(require('./../../../shared/models/<%= pluralName%>.json'));

// Schema plugins
schema.plugin(mongooseDelete, {
    deletedAt: true
});
schema.plugin(mongooseTimestamp);

// Return model
module.exports = mongoose.model('<%= name %>', schema);
