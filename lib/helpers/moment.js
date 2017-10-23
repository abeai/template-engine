'use strict';

var moment = require('moment-range').extendMoment(require('moment-timezone'));

module.exports = function(handlebars) {
    handlebars.registerHelper('moment', function(date, format) {
        return moment(date).format(format);
    });
};
