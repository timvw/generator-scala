'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var uuid = require('uuid');
var spawn = require('child_process').spawn;
var spawnSync = require('child_process').spawnSync;
var request = require('request');

var greeting =
  "                          \r\n" +
  "                _         \r\n" +
  "  ___  ___ __ _| | __ _   \r\n" +
  " / __|/ __/ _` | |/ _` |  \r\n" +
  " \__ \ (_| (_| | | (_| |  \r\n" +
  " |___/\___\__,_|_|\__,_|  \r\n" +
  "                          \r\n" ;

var ScalaGenerator = yeoman.Base.extend({

    constructor: function() {
        yeoman.Base.apply(this, arguments);

        // Next, add your custom code
        //this.option('coffee'); // This method adds support for a `--coffee` flag
    },

    init: function() {
        console.log("initializing......");
        this.log(greeting);
        this.log('Welcome to the ' + chalk.red('Scala') + ' generator!');
        this.templatedata = {};
    },

    askForTemplate: function() {

        this.log("the stuff will go to " + this.destinationRoot());
        //  this.destinationPath('index.js');

        //    this.sourceRoot();
        // returns './templates'

        //this.templatePath('index.js');
        // returns './templates/index.js'

        this.log("the templates are loaded from " + this.sourceRoot());

        fs.readdir(this.sourceRoot(), function (err, files) {
            if (err) {
                throw err;
            }

            files.map(function (file) {
                return path.join(p, file);
            }).filter(function (file) {
                return fs.statSync(file).isDirectory();
            }).forEach(function (file) {
                console.log("%s (%s)", file, path.extname(file));
            });
        });


        if(this.args.length >= 1) {
        this.type = this.args[0];
        return;
      }
      else {
        var done = this.async();

        this.log("now we need to figure out which templates there are...");


          var p = path.join(this._getTemplateDirectory(), 'templates.json');
        var choices = JSON.parse(fs.readFileSync(p, "utf8"));
        var prompts = [{
            type: 'list',
            name: 'type',
            message: 'What type of application do you want to create?',
            choices: choices.Templates
        }];

        this.prompt(prompts, function(props) {
            this.type = props.type;
            done();
        }.bind(this));
      }
    },

    askForName: function() {
      if(this.args.length >= 2) {
        this.applicationName = this.args[1];
        this.templatedata.applicationName = this.applicationName;
        return;
      }

      var done = this.async();
      var prompts = [{
          name: 'applicationName',
          message: 'What\'s the name of your application?',
          default: this.type
      }];

      this.prompt(prompts, function(props) {
          this.applicationName = props.applicationName;
          this.templatedata.applicationName = this.applicationName;
          done();
      }.bind(this));
    },

    askForScalaVersion: function() {
      if(this.args.length >= 3) {
        this.scalaVersion = this.args[2];
        this.templatedata.scalaVersion = this.scalaVersion;
        return;
      }

      var done = this.async();
      var prompts = [{
            type: 'list',
            name: 'scalaversion',
            message: 'Which version of Scala do you want to use?',
            choices: [
              { name: '2.10.4', value: '2.10.4' },
              { name: '2.10.5', value: '2.10.5' },
              { name: '2.11.7', value: '2.11.7' },
              { name: '2.11.8', value: '2.11.8' }],
            default: '2.11.8'
        }];

        this.prompt(prompts, function(props) {
            this.scalaVersion = props.scalaVersion;
            this.templatedata.scalaVersion = this.scalaVersion;
            done();
        }.bind(this));
    },

    _copy: function(dirPath, targetDirPath){
        var files = fs.readdirSync(dirPath);
        for(var i in files)
        {
            var f = files[i];
            var fp = path.join(dirPath, f);
            this.log(f);
            if(fs.statSync(fp).isDirectory()) {
                 var newTargetPath = path.join(targetDirPath, f);
                 this._copy(fp, newTargetPath);
            }
            else {
                var fn = path.join(targetDirPath.replace('ApplicationName', this.applicationName), f.replace('ApplicationName', this.applicationName));
                this.template(fp,fn, this.templatedata);
            }
        }
    },

    writing: function() {
        var log = this.log;
        this.log('we want to copy the data for ' + this.type);
        // get the thingie and other thingie...
        //var p = path.join(this._getTemplateDirectory(), this.type);
        //this._copy(p, this.applicationName);
    },

    end: function() {
        this.log('\r\n');
        this.log('Your project is now created');
        this.log('\r\n');
    }
});

module.exports = ScalaGenerator;