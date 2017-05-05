'use strict';

const Common = require('../../common');

module.exports = class extends Common {

    constructor(args, opts) {
        super(args, opts);
        this.argument(this.getApplicationNameParameterName(), { type: String, required: false });
        this.argument(this.getScalaVersionParameterName(), { type: String, required: false });
    }

    prompting() {
        this._prompting();
    }

    writing() {
        this.fs.copyTpl( this.templatePath('../../../common/templates/**/*'), this.destinationRoot(), this.options);
        this.fs.copyTpl( this.templatePath('**/*'), this.destinationRoot(), this.options);
    }
};
