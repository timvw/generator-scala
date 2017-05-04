'use strict';
const Common = require('../../common');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

/*
var yosay = require('yosay');



var mkdirp = require('mkdirp');
var uuid = require('uuid');
var request = require('request');
*/


module.exports = class extends Common {

    constructor(args, opts) {
        super(args, opts);
        console.log("setting arguments...");
        //yo scala emptysbt foo 2.11.8
        this.argument('templateName', { desc: 'the name of the template to use', type: String, required: false });
        this.argument('applicationName', { type: String, required: false });
        this.argument('scalaVersion', { type: String, required: false });
    }

    initializing() {

        console.log(this.getGreeting());
        console.log('Welcome to the ' + chalk.red('Scala') + ' generator!');

        var done = this.async();

        if (this.args.length >= 1) {
            this.templateName = this.args[0];
            this._addSubgenerator(this.templateName, this.options);
            done();
        } else {

            var baseDir = this.sourceRoot();
            var availableSubgenerators = this.getSubDirectories(baseDir  + "/../../")
                .filter(function (x) {
                    return x != "app"
                })
                .map(function (x) {
                    return {name: x, value: x}
                });

            var prompts = [{
                type: 'list',
                name: 'templateName',
                message: 'What type of application do you want to create?',
                choices: availableSubgenerators,
                store: true
            }];

            this.prompt(prompts).then((answers) => {
                this._addSubgenerator(answers.templateName, this.options);
                done();
            });
        }

        return done;
    }

    _addSubgenerator(name, opts) {
        this.composeWith(require.resolve('../' + name, opts));
    }
};
