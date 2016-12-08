//var assert = require('assert');
var helpers = require('yeoman-test');
var path = require('path');
var assert = require('yeoman-assert');
//var fs = require('fs-extra');


describe('backbone:app', function () {
    it('generates a project with require.js', function () {
        // assert the file exist
        // assert the file uses AMD definition
    });

    it('generates a project with webpack');

    it('is awesome', function(done) {

        console.log("hi ther....")
        console.log("running from " + path.join(__dirname, '../app'))

        helpers
            .run(path.join(__dirname, '../app'))
            /*
            .inTmpDir(function (dir) {
                var done = this.async(); // `this` is the RunContext object.
                //fs.copy(path.join(__dirname, '../templates/common'), dir, done);
                console.log("doing things...")
                done.
            })
            */
            //.withPrompts({ coffee: false })
            //  scala emptysbt testapp 2.12.0
            .withArguments(['emptysbt', 'testapp', '2.12.0'])
            //.withOptions({ foo: 'bar' })
            .then(function (dir) {
                // assert something about the stuff in `dir`
                console.log("asserthing stuff happened");
                assert.file(['Gruntfile.js', 'app/router.js', 'app/views/main.js']);
                done();
            });

    });

    /*
    beforeEach(function () {
        // The object returned act like a promise, so return it to wait until the process is done
        return helpers.run(path.join(__dirname, '../app'))
            .withArguments(['emptysbt', 'testapp', '2.12.0'])
            //.withOptions({ foo: 'bar' })    // Mock options passed in
            //.withArguments(['name-x'])      // Mock the arguments
            //.withPrompts({ coffee: false }); // Mock the prompt answers
    })
    */
});