'use strict';

const HUNDRED = 100;

module.exports = function(handlebars) {

    handlebars.registerHelper('percent', function(percent, options) {
        if (percent > 1) {
            percent = percent / HUNDRED;
        }

        return new Intl.NumberFormat(
            options.data.root.user.locale,
            {
                style: 'percent',
            }
        ).format(percent);
    });

};
