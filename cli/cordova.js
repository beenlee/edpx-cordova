/**
 * @file    `edp cordova` cli
 * @author: lidianbin(lidianbin@baidu.com)
 * @date:   2016-06-24 15:23:47
 */

/*
Global Commands

    create ............................. Create a project
    help ............................... Get help for a command

Project Commands

    info ............................... Generate project information
    requirements ....................... Checks and print out all the requirements
                                            for platforms specified

    platform ........................... Manage project platforms
    plugin ............................. Manage project plugins

    prepare ............................ Copy files into platform(s) for building
    compile ............................ Build platform(s)
    clean .............................. Cleanup project from build artifacts

    run ................................ Run project
                                            (including prepare && compile)
    serve .............................. Run project with a local webserver
                                            (including prepare)

aliases:
    build -> cordova prepare && cordova compile
    emulate -> cordova run --emulator

*/

var cordovaCli = require('cordova').cli;

exports.cli = {

    description: 'edp cordova 开发工具',

    main: function(args, opts) {
        var cordovaArgs = process.argv;
        cordovaArgs.splice(2, 1);
        try {
            // cordovaCli(cordovaArgs);
        }
        catch (e) {
            console.log(e);
        }

    }
}
