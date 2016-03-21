'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var path = require('path');
var fs = require('fs');
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

var ScalaGenerator = yeoman.generators.NamedBase.extend({

    username: 'timvw',
    repo: 'generator-scala',
    branch: 'templates',

    constructor: function() {
        yeoman.generators.Base.apply(this, arguments);
    },

    _download : function(t, done, reload) {
        t.remote(t.username, t.repo, t.branch, function (err,r) {
            done();
        }, reload)
    },

    _getTemplateDirectory : function() {
        return path.join(this.cacheRoot(), this.username, this.repo, this.branch);
    },

    _saveSHA : function (p, sha, old) {
        if (!fs.existsSync(p)){
            fs.mkdirParentSync(path.dirname(p));
        }

        if(old){
            fs.unlinkSync(p);
        }
        fs.appendFileSync(p, sha);
    },

    _checkSHA : function (t, p, sha, old, done) {
        var oldsha = "";
        if(old) oldsha = fs.readFileSync(p, 'utf8');
        if(old && sha != oldsha) {
            t._saveSHA(p, sha, true);
            t._download(t, done, true)
        }
        else if (old && sha == oldsha) {
            done();
        }
        else {
            t._saveSHA(p, sha, false);
            t._download(t, done, true);
        }
    },

    _getSHA : function(old, p, done) {
        var log = this.log;
        var t = this;
        var checkSHA = this._checkSHA;
        var options = {
            url: "https://api.github.com/repos/timvw/generator-scala/commits?sha=templates",
            headers: {
                'User-Agent': 'request'
            }
        };
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var sha = JSON.parse(body)[0].sha;
                checkSHA(t, p, sha, old, done);
            }
        });
    },

    init: function() {
        this.log(greeting);
        this.log('Welcome to the perfect ' + chalk.red('Scala') + ' generator!');
        this.templatedata = {};
        var done = this.async();
        var p = path.join(this.cacheRoot(), "sha")
        var old = fs.existsSync(p);
        this._getSHA(old, p, done);
    },

    /*
    askFor: function() {
        var done = this.async();
        var prompts = [{
            type: 'list',
            name: 'action',
            message: 'What do You want to do?',
            choices: [{"name": "Create standalone project", "value": this.ACTION_CREATE_STANDALONE_PROJECT},
                      {"name": "Add new project to solution", "value": this.ACTION_ADD_PROJECT_TO_SOLUTION},
                      {"name": "Create empty solution", "value": this.ACTION_CREATE_EMPTY_SOLUTION},
                      {"name": "Add reference to project", "value": this.ACTION_ADD_REFERENCE_TO_PROJECT}
                      ]
        }];
        this.prompt(prompts, function(props) {
            this.action = props.action;
            done();
        }.bind(this));
    },
    */

    askForTemplate: function() {
        var done = this.async();

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
    },

    askForName: function() {
      if(this.args.length >= 1) {
        this.applicationName = this.args[0];
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
          done();
      }.bind(this));
    },

    askForScalaVersion: function() {
      if(this.args.length >= 2) {
        this.scalaVersion = this.args[1];
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
            done();
        }.bind(this));
    },



/*
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
    */

      /*
    writing: function() {
        var log = this.log;
        var p = path.join(this._getTemplateDirectory(), this.type);
        this._copy(p, this.applicationName);
    },
            */

/*
    install: function() {
        var log = this.log
        var done = this.async();
        var appName = this.applicationName;
        var action = this.action;
        var dest = this.destinationRoot();
        var isfake = this.fake;
        var fs = this.fs;

        var generator = this;

        done();
    },
    */


    summary: function() {
      this.log('ready to create an application ' +
        ' type: ' + this.type +
        ' named: ' + this.applicationName +
        ' scalaversion: ' + this.scalaVersion);
    },

    end: function() {
        this.log('\r\n');
        this.log('Your project is now created');
        this.log('\r\n');
    }
});

module.exports = ScalaGenerator;
