'use strict';

var shared = require('./_shared.js');

const DEFAULT_LIMIT = 3;

module.exports = function(handlebars) {

    handlebars.registerHelper(
        'transactionGroups',
        function(adverb, preposition, transactionCategoriesSummary, options) {
            if (transactionCategoriesSummary.length === 0) {
                return '';
            }

            let limit = options.hash.limit || DEFAULT_LIMIT;
            let groups = transactionCategoriesSummary.slice(0, limit).map((category)=> category.name);
            let text = '';

            if (transactionCategoriesSummary.length > limit) {
                text += ` ${adverb}`;
            }

            text += ` ${preposition} ${shared.arrayToSentence(groups)}`;

            return text;
        });

};
