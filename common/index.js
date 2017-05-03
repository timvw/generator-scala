'use strict'
const Generator = require('yeoman-generator');
const fs = require('fs');
const path = require('path');

module.exports = class extends Generator {

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

    askForScalaVersion() {
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
                    {name: '2.11.8', value: '2.11.8'},
                    {name: '2.12.1', value: '2.12.1'},
                    {name: '2.12.1', value: '2.12.2'}],
                default: '2.12.2',
            }];

            this.prompt(prompts, function (props) {
                this.scalaVersion = props.scalaVersion;
                done();
            });
        }

        return done;
    }

    askForName() {
        var done = this.async();

        if (this.args.length >= 2) {
            this.applicationName = this.args[1];
            done();
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
            });
        }

        return done;
    }
};