'use strict';

var _ = require('lodash');
var handlebars = require('handlebars');
var pino = require('logger').pino;

require('./lib/helpers')(handlebars);

const HANDLEBARS_OPTIONS = {
    noEscape: true,
    preventIndent: true,
    knownHelpersOnly: true,
    knownHelpers: {
        capitalize: true,
        dateInWords: true,
        dateRangeInWords: true,
        ifCond: true,
        moment: true,
        money: true,
        percent: true,
        pluralize: true,
        recurringTransactionsIntervalInWords: true,
        recurringTransactionsNextDateInWords: true,
        toSentence: true,
        transactionGroups: true,
    },
};

module.exports = {
    registerHelpers: registerHelpers,
    executeTemplate: executeTemplate,
};

function registerHelpers(helperName, helperFunction) {
    handlebars.registerHelper(helperName, helperFunction);
    HANDLEBARS_OPTIONS.knownHelpers[helperName] = true;
}

function executeTemplate(template, templateParameters, extendedParameters) {

    const mergedParameters = _.extend(extendedParameters || {}, templateParameters || {});

    pino.debug({template: template, parameters: mergedParameters}, 'executeTemplate');

    try {
        return handlebars.compile(template, HANDLEBARS_OPTIONS)(mergedParameters);
    } catch (error) {
        pino.error(error, 'handlebarsCompileError');
        return error.toString();
    }

}
