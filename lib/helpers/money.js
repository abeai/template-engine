'use strict';

const _ = require('lodash');

module.exports = function(handlebars) {
    handlebars.registerHelper('money', function(money, options) {

        let amount = _.get(money, 'amount');

        if (!_.isNumber(amount)) {
            return 'undefined';
        }

        if (amount !== 0.0 && options.hash.normalize === true && money.type === 'DEBIT') {
            amount *= -1.0;
        }

        return new Intl.NumberFormat(
            options.data.root.user.locale,
            {
                style: 'currency',
                currency: money.currency,
            }
        ).format(amount);
    });
};
