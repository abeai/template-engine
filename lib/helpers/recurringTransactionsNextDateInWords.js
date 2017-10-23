/* eslint-disable no-magic-numbers */
'use strict';

var moment = require('moment-range').extendMoment(require('moment-timezone'));

module.exports = function(handlebars) {

    handlebars.registerHelper('recurringTransactionsNextDateInWords', function(user, recurringTransaction) {
        const lastPaymentDate = moment(recurringTransaction.dates[recurringTransaction.dates.length - 1]);
        const nextDate = moment(recurringTransaction.nextDate);
        const currentUserTime = moment().startOf('day');
        const nextDateDiff = moment(nextDate).startOf('day').diff(currentUserTime, 'days');

        if (nextDateDiff >= -7 && nextDateDiff < 0) {
            return `Expected ${moment(nextDate).fromNow()}`;
        }
        if (nextDateDiff < 0) {
            return `Last seen ${moment(lastPaymentDate).fromNow()}`;
        }
        if (nextDateDiff < 1) {
            return 'Coming up today';
        }

        return `Coming up ${nextDate.from(currentUserTime)}`;
    });

};
