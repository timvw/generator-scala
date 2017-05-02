'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var fs = require('fs');
var path = require('path');

/*
var yosay = require('yosay');



var mkdirp = require('mkdirp');
var uuid = require('uuid');
var request = require('request');
*/

var greeting =
  "                          \r\n" +
  "                _         \r\n" +
  "  ___  ___ __ _| | __ _   \r\n" +
  " / __|/ __/ _` | |/ _` |  \r\n" +
  " \__ \ (_| (_| | | (_| |  \r\n" +
  " |___/\___\__,_|_|\__,_|  \r\n" +
  "                          \r\n" ;

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);
        this.option('templateName', { type: String });
        this.option('appName', { type: String });
        this.option('scalaVersion', { type: String });
    }

    initializing() {
        this._printBanner();
        this._askForSubgenerator();
    }

    _printBanner() {
        console.log(greeting);
        console.log('Welcome to the ' + chalk.red('Scala') + ' generator!');
    }

    _getSubDirectories(baseDir) {
        return fs.readdirSync(baseDir)
            .filter(function (file) {
                return fs.statSync(path.join(baseDir, file)).isDirectory();
            });
    }

    _askForSubgenerator() {
        var done = this.async();

        if (this.args.length >= 1) {
            this.templateName = this.args[0];
            done();
        } else {

            var baseDir = this.sourceRoot();
            var availableSubgenerators = this._getSubDirectories(baseDir  + "/../../")
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
                this.composeWith(require.resolve('../' + answers.templateName));
                done();
            });
        }

        return done;
    }

    _askForName() {
        if (this.args.length >= 2) {
            this.applicationName = this.args[1];
        } else {
            var done = this.async();
            var prompts = [{
                name: 'applicationName',
                message: 'What\'s the name of your application?',
                default: this.templateName
            }];

            this.prompt(prompts, function (props) {
                this.applicationName = props.applicationName;
                done();
            }.bind(this));
        }
    }

    _askForScalaVersion() {
        var done = this.async();

        if (this.args.length >= 3) {
            this.scalaVersion = this.args[2];
            done();
        } else {

            var prompts = [{
                type: 'list',
                name: 'scalaVersion',
                message: 'Which version of Scala do you want to use?',
                choices: [
                    {name: '2.10.4', value: '2.10.4'},
                    {name: '2.10.5', value: '2.10.5'},
                    {name: '2.11.7', value: '2.11.7'},
                    {name: '2.11.8', value: '2.11.8'}],
                default: '2.11.8'
            }];

            this.prompt(prompts, function (props) {
                this.scalaVersion = props.scalaVersion;
                done();
            });
        }

        return done;
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
