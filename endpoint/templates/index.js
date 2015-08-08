'use strict';

var express = require('express');
var controller = require('./<%= name %>.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('<%= pluralName %>-index'), controller.index);
router.get('/:id', auth.hasRole('<%= pluralName %>-show'), controller.show);
router.post('/', auth.hasRole('<%= pluralName %>-create'), controller.create);
router.put('/:id', auth.hasRole('<%= pluralName %>-update'), controller.update);
router.delete('/:id', auth.hasRole('<%= pluralName %>-destroy'), controller.destroy);

module.exports = router;
