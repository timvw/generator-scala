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
    },

    init: function() {
        this.log(greeting);
        this.log('Welcome to the ' + chalk.red('Scala') + ' generator!');
        this.templateData = {};
    },

    _getSubDirectories: function(baseDir) {
        return fs.readdirSync(baseDir)
            .filter(function (file) { return fs.statSync(path.join(baseDir, file)).isDirectory(); });
    },

    askForTemplate: function() {
        console.log("asking for template...");

        if(this.args.length >= 1) {
            this.templateData.template = this.args[0];
            return;
        }

        var done = this.async();

        var baseDir = this.sourceRoot();
        var choices = this._getSubDirectories(baseDir)
            .map(function (x) {
                return {name: x, value: x}
            });

        var prompts = [{
            type: 'list',
            name: 'xtype',
            message: 'What type of application do you want to create?',
            choices: choices
        }];

        this.prompt(prompts, function (props) {
            this.xtype = props.xtype;
            this.templateData.template = this.xtype;
            done();
        }.bind(this));

    },

    askForName: function() {
        this.log("asking for name...");

        /*
      if(this.args.length >= 2) {
        this.applicationName = this.args[1];
        this.templateData.applicationName = this.applicationName;
        return;
      }
      */

      /*
      var done = this.async();
      var prompts = [{
          name: 'applicationName',
          message: 'What\'s the name of your application?',
          //default: this.templateData.template
      }];

      this.prompt(prompts, function(props) {
          this.applicationName = props.applicationName;
          this.templateData.applicationName = this.applicationName;
          done();
      }.bind(this));
      */
    },

    askForScalaVersion: function() {
      if(this.args.length >= 3) {
        this.scalaVersion = this.args[2];
        this.templateData.scalaVersion = this.scalaVersion;
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
            this.templateData.scalaVersion = this.scalaVersion;
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
                this.template(fp,fn, this.templateData);
            }
        }
    },

    writing: function() {
        //var log = this.log;
        this.log('we want to copy the data for ');
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

/*

 //this.log("the stuff will go to " + this.destinationRoot());
 //  this.destinationPath('index.js');

 //    this.sourceRoot();
 // returns './templates'

 //this.templatePath('index.js');
 // returns './templates/index.js'


 */

module.exports = ScalaGenerator;