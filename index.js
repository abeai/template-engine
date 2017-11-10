'use strict';

var _ = require('lodash');
var handlebars = require('handlebars');
var pino = require('pino')();

pino.level = process.env.TEMPLATE_ENGINE_LOG_LEVEL || 'warn';

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

    return new Promise(function(resolve, reject) {

        const mergedParameters = _.extend(extendedParameters || {}, templateParameters || {});

        pino.debug({template: template, parameters: mergedParameters}, 'executeTemplate');

        try {
            let compiledTemplate = handlebars.compile(template, HANDLEBARS_OPTIONS)(mergedParameters);

            resolve(compiledTemplate);
        } catch (error) {
            pino.error(error, 'TEMPLATE_ENGINE_HANDLEBARS_COMPILE_ERROR');
            reject(error);
        }

    });

}
