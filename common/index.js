'use strict'
const Generator = require('yeoman-generator');
const fs = require('fs');
const path = require('path');

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);
    }

    getGreeting() {
        const greeting =
            "                          \r\n" +
            "                _         \r\n" +
            "  ___  ___ __ _| | __ _   \r\n" +
            " / __|/ __/ _` | |/ _` |  \r\n" +
            " \__ \ (_| (_| | | (_| |  \r\n" +
            " |___/\___\__,_|_|\__,_|  \r\n" +
            "                          \r\n" ;

        return greeting;
    }

    getSubDirectories(baseDir) {
        return fs.readdirSync(baseDir)
            .filter(function (file) {
                return fs.statSync(path.join(baseDir, file)).isDirectory();
            });
    }

    getScalaVersionPrompt() {

        var prompt = {
            type: 'list',
            name: 'scalaVersion',
            message: 'Which version of Scala do you want to use?',
            choices: [
                {name: '2.10.4', value: '2.10.4'},
                {name: '2.10.5', value: '2.10.5'},
                {name: '2.11.7', value: '2.11.7'},
                {name: '2.11.8', value: '2.11.8'},
                {name: '2.12.1', value: '2.12.1'},
                {name: '2.12.1', value: '2.12.2'}],
            default: '2.12.2',
        };

        return prompt;
    }

    getApplicationNamePrompt() {

        var prompt = {
            name: 'applicationName',
            message: 'What\'s the name of your application?',
            default: this.appname
        };

        return prompt;
    }

    copy(dirPath, targetDirPath) {
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