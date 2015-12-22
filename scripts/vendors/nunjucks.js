"use strict";

let nj = require("nunjucks"),
    _ = require("lodash"),
    moment = require("moment");

module.exports = function(path) {
    let env = new nj.Environment(
        new nj.FileSystemLoader(path),
        {
            watch: false,
            autoescape: false
        }
    );

    let FilterExtension = require("nunjucks-filter")(nj);

    env.addExtension('FilterExtension', new FilterExtension(env));

    env.addFilter("kebabCase", function (str) {
        return _.kebabCase(str);
    });
    env.addFilter("jsonEscape", function(str) {
        return JSON.stringify(str);
    });
    env.addGlobal("moment", moment);

    return env;
};
