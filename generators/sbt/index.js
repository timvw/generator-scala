'use strict';

const Common = require('../../common');

module.exports = class extends Common {

    constructor(args, opts) {
        super(args, opts);
        this.argument(this.getApplicationNameParameterName(), { type: String, required: false });
        this.argument(this.getScalaVersionParameterName(), { type: String, required: false });
    }

    writing() {
        this.fs.copyTpl( this.templatePath('**/*'), this.destinationRoot(), this.options);
    }
};
