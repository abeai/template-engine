'use strict';
var _ = require('lodash');
var shared = require('./_shared.js');

module.exports = function(handlebars) {

    handlebars.registerHelper('toSentence', function(context, options) {
        let newContext = _.map(context, function(item, key) {
            return options.fn(item, {data: options.data, blockParams: [item, key]});
        });

        return shared.arrayToSentence(newContext);
    });

};
