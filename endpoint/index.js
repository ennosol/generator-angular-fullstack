'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var util = require('util');
var ngUtil = require('../util');
var ScriptBase = require('../script-base.js');

var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);
};

util.inherits(Generator, ScriptBase);

Generator.prototype.askFor = function askFor() {
  var done = this.async();
  var name = this.name;
  var pluralName = this.pluralName;

  var base = this.config.get('routesBase') || '/api/';
  if (base.charAt(base.length - 1) !== '/') {
    base = base + '/';
  }

  var prompts = [
    {
      name: 'pluralName',
      message: 'What will the plural name of your endpoint be?',
      default: name + 's'
    },
    {
      name: 'route',
      message: 'What will the url of your endpoint be?',
      default: base + name + 's'
    }
  ];

  this.prompt(prompts, function (props) {
    if (props.route.charAt(0) !== '/') {
      props.route = '/' + props.route;
    }

    this.route = props.route;
    this.pluralName = props.pluralName;
    done();
  }.bind(this));
};

Generator.prototype.registerEndpoint = function registerEndpoint() {
  if (this.config.get('insertRoutes')) {
    var routeConfig = {
      file: this.config.get('registerRoutesFile'),
      needle: this.config.get('routesNeedle'),
      splicable: [
        "app.use(\'" + this.route + "\', require(\'./api/" + this.name + "\'));"
      ]
    };
    ngUtil.rewriteFile(routeConfig);

    var rolesConfig = {
      file: this.config.get('configRolesFile'),
      needle: this.config.get('configRolesNeedle'),
      splicable: [
        "'" + this.pluralName + "-index', '" + this.pluralName + "-show', '" + this.pluralName + "-update', '" +
          this.pluralName + "-create', '" + this.pluralName + "-destroy',"
      ],
      all: true
    };
    ngUtil.rewriteFile(rolesConfig);
  }
};

Generator.prototype.createFiles = function createFiles() {
  var dest = this.config.get('endpointDirectory') || 'server/api/' + this.name;
  this.sourceRoot(path.join(__dirname, './templates'));
  ngUtil.processDirectory(this, '.', dest);

  var destSharedModels = 'shared/models';
  this.sourceRoot(path.join(__dirname, './templatesJson/'));
  ngUtil.processDirectory(this, '.', destSharedModels);
};
