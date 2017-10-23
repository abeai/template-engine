'use strict';
var _ = require('lodash');

module.exports = function(handlebars) {

    handlebars.registerHelper('capitalize', function(string) {
        return _.capitalize(string);
    });

};
