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

    getApplicationNameParameterName() { return 'applicationName'; }
    getScalaVersionParameterName() { return 'scalaVersion'; }

    getScalaVersionPrompt() {

        const prompt = {
            type: 'list',
            name: this.getScalaVersionParameterName(),
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

        const prompt = {
            name: this.getApplicationNameParameterName(),
            message: 'What\'s the name of your application?',
            default: this.appname
        };

        return prompt;
    }
};