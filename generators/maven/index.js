'use strict';

const Common = require('../../common');

module.exports = class extends Common {

    constructor(args, opts) {
        super(args, opts);
        this.argument(this.getApplicationNameParameterName(), { type: String, required: false });
        this.argument(this.getScalaVersionParamterName(), { type: String, required: false });
    }

    prompting() {

        var prompts = [];

        if(!this.options[this.getApplicationNameParameterName()]) {
            prompts.push(this.getApplicationNamePrompt());
        }

        if(!this.options[this.getScalaVersionParamterName()]) {
            prompts.push(this.getScalaVersionPrompt());
        }

        return this.prompt(prompts).then((answers) => {

            if(answers[this.getApplicationNameParameterName()]) {
                this.options[this.getApplicationNameParameterName()] = answers[this.getApplicationNameParameterName()];
            }

            if(answers[this.getScalaVersionParamterName()]) {
                this.options[this.getScalaVersionParamterName()] = answers[this.getScalaVersionParamterName()];
            }
        });
    }

    writing() {
        this.fs.copyTpl( this.templatePath('**/*'), this.destinationRoot(), this.options);
    }

};
