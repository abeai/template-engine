'use strict';
var _ = require('lodash');

var moment = require('moment-range').extendMoment(require('moment-timezone'));

const MAX_DAYS_IN_MONTH = 31;

module.exports = function(handlebars) {

    // eslint-disable-next-line
    handlebars.registerHelper('dateRangeInWords', function(dateRange, options) {
        let [start, end] = dateRange.split('/');

        dateRange = {
            moment: moment.range(
                moment.tz(start, options.data.root.user.timezone),
                moment.tz(end, options.data.root.user.timezone)
            ),
        };

        if (dateRange.moment.diff('days') === 0) {
            let date = {
                moment: dateRange.moment.start,
            };

            return handlebars.helpers.dateInWords(options.hash.datePreposition, date, options);
        }

        let text;

        if (_dateRangeCoversExclusivelyOneEntireMonth(dateRange)) {
            text = _addPreposition(dateRange.moment.start.format('MMMM'), options.hash.monthPreposition);
        } else if (_dateRangeCoversExclusivelyOneEntireWeek(dateRange) && _dateInLastWeek(dateRange.moment.start)) {
            text = _addPreposition('last week', options.hash.lastDaysOrWeekPreposition);
        } else {
            let days = dateRange.moment.diff('days') + 1;

            if (_dateRangeEndsToday(dateRange) && days < MAX_DAYS_IN_MONTH) {
                text = _addPreposition(`last ${days} days`, options.hash.lastDaysOrWeekPreposition);
            } else {
                text = `between ${dateRange.moment.start.format('MMMM Do')} `
                    + `to ${dateRange.moment.end.format('MMMM Do')}`;
            }
        }

        if (options.hash.upperFirst) {
            text = _.upperFirst(text);
        }

        return text;
    });

};

function _dateRangeCoversExclusivelyOneEntireMonth(dateRange) {
    if (!dateRange.moment.start.isSame(dateRange.moment.end, 'month')) {
        return false;
    }

    return dateRange.moment.start.date() === 1
        && dateRange.moment.end.date() === dateRange.moment.end.clone().endOf('month').date();
}

function _dateRangeCoversExclusivelyOneEntireWeek(dateRange) {
    if (!dateRange.moment.start.isSame(dateRange.moment.end, 'week')) {
        return false;
    }

    return dateRange.moment.start.date() === dateRange.moment.end.clone().startOf('week').date()
        && dateRange.moment.end.date() === dateRange.moment.end.clone().endOf('week').date();
}

function _dateInLastWeek(date) {
    return moment().tz(date.tz()).subtract(1, 'week').isSame(date, 'week');
}

function _addPreposition(text, preposition) {
    if (preposition) {
        return `${preposition} ${text}`;
    }

    return text;
}

function _dateRangeEndsToday(dateRange) {
    return moment().tz(dateRange.moment.end.tz()).isSame(dateRange.moment.end, 'day');
}
