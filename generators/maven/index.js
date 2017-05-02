'use strict';

var ScalaGenerator = require('../app');
var _ = require('lodash');

module.exports = class extends ScalaGenerator {

    constructor(args, opts) {
        super(args, opts);
        console.log("running constructor in scalamavengenerator...");
    }

    initializing() {
        console.log("running maven init...")
    }

    prompting() {
        console.log("running the maven prompt");
        this._askForScalaVersion();
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
