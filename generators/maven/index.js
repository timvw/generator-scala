'use strict';

const Common = require('../../common');

module.exports = class extends Common {

    constructor(args, opts) {
        super(args, opts);
        this.argument('applicationName', { type: String, required: false });
        this.argument('scalaVersion', { type: String, required: false });
    }

    prompting() {
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
        });
    }

    writing() {
        console.log("writing...");
    }

};
