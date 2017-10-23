'use strict';
var _ = require('lodash');
var pluralize = require('pluralize');

module.exports = function(handlebars) {

    handlebars.registerHelper('pluralize', function(word, enumerableOrInt, includeCount = true) {
        let count;

        if (Number.isInteger(enumerableOrInt)) {
            count = enumerableOrInt;
        } else {
            count = _.size(enumerableOrInt);
        }

        return pluralize(word, count, includeCount);
    });

};
