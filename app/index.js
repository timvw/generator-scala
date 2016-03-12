'use strict';
var yeoman = require('yeoman-generator');
var mkdirp = require('mkdirp');

var greeting = 
  "                          \r\n" +
  "                _         \r\n" +
  "  ___  ___ __ _| | __ _   \r\n" +
  " / __|/ __/ _` | |/ _` |  \r\n" +
  " \__ \ (_| (_| | | (_| |  \r\n" +
  " |___/\___\__,_|_|\__,_|  \r\n" +
  "                          \r\n" ;
	
var ScalaGenerator = yeoman.generators.NamedBase.extend({
    
    constructor: function() {
        yeoman.generators.Base.apply(this, arguments);
    },

    init: function() {
        this.log(greeting);
        this.log('Welcome to the scala generator!');

        if(this._applicationnameIsProvided()) this._setApplicationName(this._getApplicationName());
    },

    _applicationnameIsProvided: function() {
        return this.args.length >= 1;
    },

    _getApplicationName: function() {
        return this.args[0];
    },

    _setApplicationName: function(name) {
        this.log("setting applicationname to " + name);
        this.applicationname = name;
        this.templatedata.applicationname = name;
    },

    prompting: function() {
        this.templatedata = {
            sparkversion : "1.4.1",
        };

        var done = this.async();
        var prompts = [{
            name: 'applicationname',
            message: 'What is the name of your application?',
            default: this.applicationname,
            when: !this._applicationnameIsProvided()
        },
        {
            type: 'list',
            name: 'scalaversion',
            message: 'Which version of Scala do you want to use?',
            choices: [{
                name: '2.10.4',
                value: '2.10.4'
            },
            {
                name: '2.11.8',
                value: '2.11.8'
            }],
            default: '2.11.8'
        }];

        this.prompt(prompts, function(props) {
            if(!this._applicationnameIsProvided()) this._setApplicationName(props.applicationname);
            this.templatedata.scalaversion = props.scalaversion
            done();
        }.bind(this));
    },

    writing: function() {
        this.destinationRoot(this.applicationname);
        this.fs.copyTpl(this.templatePath('gitignore'), this.destinationPath('.gitignore'), this.templatedata);
        this.fs.copyTpl(this.templatePath('build.sbt'), this.destinationPath('build.sbt'), this.templatedata);

        mkdirp(this.destinationPath("src/main/java"));
        mkdirp(this.destinationPath("src/main/scala"));
        mkdirp(this.destinationPath("src/main/resources"));

        mkdirp(this.destinationPath("src/test/java"));
        mkdirp(this.destinationPath("src/test/scala"));
        mkdirp(this.destinationPath("src/test/resources"));

        mkdirp(this.destinationPath("lib"));
        mkdirp(this.destinationPath("project"));
        mkdirp(this.destinationPath("target"));
    },

    end: function() {
        this.log('\r\n');
        this.log('Your application is now created in ' + this.destinationPath());
        this.log('\r\n');
    }
});

module.exports = ScalaGenerator;
