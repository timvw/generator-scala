'use strict';
const Generator = require('yeoman-generator');
const Common = require('../../common');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

module.exports = class extends Common {

    constructor(args, opts) {
        super(args, opts);
        this.argument(this._getSubgeneratorsParameterName(), { desc: 'the name of the subgenerator to use', type: String, required: false });
    }

    initializing() {

        var prompts = [];

        if(!this.options[this._getSubgeneratorsParameterName()]) {
            prompts.push(this._getSubgeneratorsPrompt());
        }

        return this.prompt(prompts).then((answers) => {
            if(answers[this._getSubgeneratorsParameterName()]) {
                this.options[this._getSubgeneratorsParameterName()] = answers[this._getSubgeneratorsParameterName()];
            }

            var name = this.options[this._getSubgeneratorsParameterName()];
            this.composeWith(require.resolve('../' + name), { arguments: this.args });
        });
    }

    _getSubgeneratorsParameterName() { return 'subGeneratorName'; }

    _getSubgenerators() {

        var baseDir = this.sourceRoot() + '/../../';

        var availableSubgenerators = fs.readdirSync(baseDir)
            .filter(function (file) {
                return fs.statSync(path.join(baseDir, file)).isDirectory();
            })
            .filter(function (x) {
                return x != 'app'
            })
            .map(function (x) {
                return {name: x, value: x}
            });

        return availableSubgenerators;
    }

    _getSubgeneratorsPrompt() {

        var prompt = {
            type: 'list',
            name: this._getSubgeneratorsParameterName(),
            message: 'What type of application do you want to create?',
            choices: this._getSubgenerators(),
            store: true
        };

        return prompt;
    }

    _addSubgenerator(name) {
        this.composeWith(require.resolve('../' + name), { args: this.args });
    }
};
