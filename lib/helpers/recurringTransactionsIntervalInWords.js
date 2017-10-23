/* eslint-disable no-magic-numbers */
'use strict';

var pluralize = require('pluralize');
var shared = require('./_shared.js');

module.exports = function(handlebars) {

    // eslint-disable-next-line
    handlebars.registerHelper('recurringTransactionsIntervalInWords', function(days) {
        if (80 <= days && days <= 100) {
            return 'every 3 months';
        }
        if (71 <= days && days <= 79) {
            return 'every 2 and a half months';
        }
        if (50 <= days && days <= 70) {
            return 'every 2 months';
        }
        if (40 <= days && days <= 49) {
            return 'every month and a half';
        }
        if (21 <= days && days <= 39) {
            return 'monthly';
        }
        if (11 <= days && days <= 20) {
            return 'twice a month';
        }
        if (5 <= days && days <= 10) {
            return 'weekly';
        }
        if (days === 1) {
            return 'daily';
        }

        let prefix = 'every ';
        let parts = [];
        let months = days / 30;

        if (months > 0) {
            parts.push(pluralize('month', months, true));
        }

        let daysLeftAfterMonths = days % 30;
        let weeks = daysLeftAfterMonths / 7;

        if (weeks > 0) {
            parts.push(pluralize('week', weeks, true));
        }

        let daysLeftAfterWeeks = daysLeftAfterMonths % 7;

        if (daysLeftAfterWeeks > 0) {
            parts.push(pluralize('day', daysLeftAfterWeeks, true));
        }

        return `${prefix}${shared.arrayToSentence(parts)}'`;
    });

};
