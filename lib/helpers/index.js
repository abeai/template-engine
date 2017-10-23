/* eslint-disable global-require */
'use strict';

var fs = require('fs');
var path = require('path');
var _ = require('lodash');

module.exports = function(handlebars) {

    var helpers = {};

    var moduleFiles = fs.readdirSync(
        path.dirname(
            fs.realpathSync(__filename)
        )
    );

    function notIndexOrUnderscoreAndJsOrDir(t) {

        if (
            fs.statSync(path.join(path.dirname(__filename), t)).isDirectory()
            && !t.match(/^_.*/)
            && !t.match(/^lib$/)
        ) {
            return true;
        }

        if (
            t === 'index.js'
            || t.match(/^_.*/)
            || !t.match(/.*\.js(on)?$/)
        ) {
            return false;
        }

        return true;
    }

    function requireMapFunction(t) {
        helpers[t.replace(/\.js(on)?$/, '')] = require(path.join(path.dirname(__filename), t))(handlebars);
    }

    _.map(
        _.filter(moduleFiles, notIndexOrUnderscoreAndJsOrDir),
        requireMapFunction
    );

    return helpers;

};
