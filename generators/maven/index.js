'use strict';

const Common = require('../../common');

module.exports = class extends Common {

    constructor(args, opts) {
        super(args, opts);
        this.argument('applicationName', { type: String, required: false });
        this.argument('scalaVersion', { type: String, required: false });
        console.log("the provided appname: " + opts['appName']);
        console.log("the provided appname: " + opts['scalaVersion']);
    }

    initializing() {
        console.log("running maven init...")
    }

    prompting() {
        //var done = this.async();

        console.log("running the maven prompt");
        console.log("current the appname is: " + this.options.appName);
        //var task1 = this.askForScalaVersion();
        //task1.then((result) => { this.askForName()});

        var prompts = [];

        if(!this.options['applicationName']) {
            prompts.push(this.getApplicationNamePrompt());
        }

        if(!this.options['scalaVersion']) {
            prompts.push(this.getScalaVersionPrompt());
        }

        return this.prompt(prompts).then((answers) => {
            if(answers.applicationName) {
                this.options['applicationName'] = answers.applicationName;
            }
            if(answers.scalaVersion) {
                this.options['scalaVersion'] = answers.scalaVersion;
            }
            console.log("processed result");
            console.log("final scala version: " + this.options['scalaVersion']);
            console.log("final application name: " + this.option['applicationName']);
        });
    }

    writing() {
        console.log("writing...");
    }

    _prompting() {
      var done = this.async();

      var prompts = [];

      if(!this.options.appname) {
        prompts.push({
                type    : 'input',
                name    : 'name',
                message : 'Your project name',
                default : this.appname // Default to current folder name
        });
      }

      if(!this.options.scalaversion) {
        prompts.push({
            store: true,
            type: 'list',
            name: 'scalaVersion',
            message: 'Which version of Scala do you want to use?',
            choices: [
                {name: '2.10.4', value: '2.10.4'},
                {name: '2.10.5', value: '2.10.5'},
                {name: '2.11.7', value: '2.11.7'},
                {name: '2.11.8', value: '2.11.8'},
                {name: '2.12.1', value: '2.12.1'}],
                default: '2.12.1'
        });
      }

      if(prompts.length > 0) {
        this.prompt(prompts).then((answers) => {
          if(answers.appname) { this.options.appname = answers.appname; }
          if(answers.scalaversion) { this.options.scalaversion = answers.scalaversion; }
          done();
        });
      } else {
        done();
      }
    }

    _configuring() {
      this.log("by now the appname is " + this.options.appname);
      this.log("by now the scalaversion is " + this.options.scalaversion);
    }

};
