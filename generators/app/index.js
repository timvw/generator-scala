'use strict';
const Generator = require('yeoman-generator');
const Common = require('../../common');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

module.exports = class extends Common {

    constructor(args, opts) {
        super(args, opts);
        this.timarguments = args;
        this.argument('templateName', { desc: 'the name of the template to use', type: String, required: false });
    }

    initializing() {

        this.log(this.getGreeting());
        this.log('Welcome to the ' + chalk.red('Scala') + ' generator!');

        var done = this.async();

        if(this.options['templateName']) {
            //this.templateName = this.args[0];
            //this._addSubgenerator(this.templateName, this.options);
            done();
        } else {

            var baseDir = this.sourceRoot();
            var availableSubgenerators = this.getSubDirectories(baseDir  + '/../../')
                .filter(function (x) {
                    return x != 'app'
                })
                .map(function (x) {
                    return {name: x, value: x}
                });

            var prompts = [{
                type: 'list',
                name: 'templateName',
                message: 'What type of application do you want to create?',
                choices: availableSubgenerators,
                store: true
            }];

            this.prompt(prompts).then((answers) => {
                //this._addSubgenerator(answers.templateName, this.options);
                this.options['templateName'] = answers.templateName;
                done();
            });
        }

        return done;
    }

    _getSubDirectories(baseDir) {
        return fs.readdirSync(baseDir)
            .filter(function (file) {
                return fs.statSync(path.join(baseDir, file)).isDirectory();
            });
    }

    configuring() {
        this._addSubgenerator(this.options['templateName'], this.options);
    }

    _addSubgenerator(name, opts) {
        this.log('composing with subgenerator: ' + name + ' and opts: ' + opts);
        var z = { options: opts, arguments: this.timarguments };
        this.composeWith(require.resolve('../' + name), z);
    }
};
