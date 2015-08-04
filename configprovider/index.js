'use strict';
var yeoman = require('yeoman-generator');

var Generator = yeoman.generators.Base.extend({
  compose: function() {
    this.composeWith('ng-component:configprovider', {arguments: this.arguments}, { local: require.resolve('generator-ng-component/configprovider') });
  }
});

module.exports = Generator;
