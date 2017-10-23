'use strict';
var _ = require('lodash');

var moment = require('moment-range').extendMoment(require('moment-timezone'));

module.exports = function(handlebars) {

    handlebars.registerHelper('dateInWords', function(preposition, date, options) {
        let now = moment().tz(date.moment.tz());
        let text = date.moment.calendar(now, {
            sameDay: '[today]',
            nextDay: '[tomorrow]',
            nextWeek: 'dddd',
            lastDay: '[yesterday]',
            lastWeek: '[this past] dddd',
            sameElse: `[${preposition}] MMMM Do`,
        });

        if (date.moment.isSame(now.clone().subtract(1, 'weeks'), 'day')) {
            text = date.moment.format('[this past] dddd');
        }

        if (options.hash.upperFirst) {
            text = _.upperFirst(text);
        }

        return text;
    });

};
