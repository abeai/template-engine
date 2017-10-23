'use strict';

const MAX_LENGTH = 2;

module.exports = {
    arrayToSentence: arrayToSentence,
};

function arrayToSentence(array) {
    if (array.length < MAX_LENGTH) {
        return array[0];
    }

    return array.slice(0, array.length - 1).join(', ') + ' and ' + array.slice(-1);
}
