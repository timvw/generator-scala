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

        this.templatedata = {
            scalaversion : "2.10.4",
            sparkversion : "1.4.1",
        };

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

    askForApplicationName: function() {
        var done = this.async();
        var prompts = [{
            name: 'applicationname',
            message: 'What is the name of your application?',
            default: this.applicationname,
            when: !this._applicationnameIsProvided()
        }];
        this.prompt(prompts, function(props) {
            if(!this._applicationnameIsProvided()) this._setApplicationName(props.applicationname);
            done();
        }.bind(this));
    },

    writing: function() {
        this.fs.copyTpl(this.templatePath('gitignore'), this.destinationPath(this.applicationname + '/.gitignore'), this.templatedata);
        this.fs.copyTpl(this.templatePath('build.sbt'), this.destinationPath(this.applicationname + '/build.sbt'), this.templatedata);

        mkdirp(this.destinationPath(this.applicationname + "/src/main/java"));
        mkdirp(this.destinationPath(this.applicationname + "/src/main/scala"));
        mkdirp(this.destinationPath(this.applicationname + "/src/main/resources"));

        mkdirp(this.destinationPath(this.applicationname + "/src/test/java"));
        mkdirp(this.destinationPath(this.applicationname + "/src/test/scala"));
        mkdirp(this.destinationPath(this.applicationname + "/src/test/resources"));

        mkdirp(this.destinationPath(this.applicationname + "/lib"));
        mkdirp(this.destinationPath(this.applicationname + "/project"));
        mkdirp(this.destinationPath(this.applicationname + "/target"));
    },

    end: function() {
        this.log('\r\n');
        this.log('Your application is now created in ' + this.destinationPath(this.applicationname + "/"));
        this.log('\r\n');
    }
});

module.exports = ScalaGenerator;
