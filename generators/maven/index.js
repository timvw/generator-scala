'use strict';

const Generator = require('yeoman-generator');
const Common = require('../../common');

module.exports = class extends Common {

    constructor(args, opts) {
        super(args, opts);
        this.argument(this.getApplicationNameParameterName(), { type: String, required: false });
        this.argument(this.getScalaVersionParameterName(), { type: String, required: false });
    }

    prompting() {

        var prompts = [];

        if(!this.options[this.getApplicationNameParameterName()]) {
            prompts.push(this.getApplicationNamePrompt());
        }

        if(!this.options[this.getScalaVersionParameterName()]) {
            prompts.push(this.getScalaVersionPrompt());
        }

        return this.prompt(prompts).then((answers) => {

            if(answers[this.getApplicationNameParameterName()]) {
                this.options[this.getApplicationNameParameterName()] = answers[this.getApplicationNameParameterName()];
            }

            if(answers[this.getScalaVersionParameterName()]) {
                this.options[this.getScalaVersionParameterName()] = answers[this.getScalaVersionParameterName()];
            }
        });
    }

    writing() {
        this.fs.copyTpl( this.templatePath('**/*'), this.destinationRoot(), this.options);
    }
};
