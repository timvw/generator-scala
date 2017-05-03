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

const greeting =
  "                          \r\n" +
  "                _         \r\n" +
  "  ___  ___ __ _| | __ _   \r\n" +
  " / __|/ __/ _` | |/ _` |  \r\n" +
  " \__ \ (_| (_| | | (_| |  \r\n" +
  " |___/\___\__,_|_|\__,_|  \r\n" +
  "                          \r\n" ;

module.exports = class extends Common {

    constructor(args, opts) {
        super(args, opts);
        console.log("setting arguments...");
        //yo scala emptysbt foo 2.11.8
        this.argument('templateName', { desc: 'the name of the template to use', type: String, required: false });
        this.argument('appName', { type: String, required: false });
        this.argument('scalaVersion', { type: String, required: false });
    }

    initializing() {
        this._printBanner();
        this._askForSubgenerator();
    }

    _printBanner() {
        console.log(greeting);
        console.log('Welcome to the ' + chalk.red('Scala') + ' generator!');
    }

    _askForSubgenerator() {
        var done = this.async();

        if (this.args.length >= 1) {
            this.templateName = this.args[0];
            this._addSubgenerator(this.templateName, this.opts);
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
                this._addSubgenerator(answers.templateName, this.opts);
                done();
            });
        }

        return done;
    }

    _addSubgenerator(name, opts) {
        this.composeWith(require.resolve('../' + name, opts));
    }

    _copy(dirPath, targetDirPath) {
        var files = fs.readdirSync(dirPath);
        for (var i in files) {
            var f = files[i];
            var fp = path.join(dirPath, f);
            this.log(f);
            if (fs.statSync(fp).isDirectory()) {
                var newTargetPath = path.join(targetDirPath, f);
                this._copy(fp, newTargetPath);
            }
            else {
                var fn = path.join(targetDirPath.replace('ApplicationName', this.applicationName), f.replace('ApplicationName', this.applicationName));
                this.template(fp, fn, this.templateData);
            }
        }
    }

    _writing() {
        this.templateData = {applicationName: this.applicationName, scalaVersion: this.scalaVersion};
        var p = path.join(this.sourceRoot(), this.templateName);
        this._copy(p, this.applicationName);
    }

    _end() {
        this.log('\r\n');
        this.log('Your project is now created');
        this.log('\r\n');
    }
};
