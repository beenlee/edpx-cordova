/**
 * @file 
 * @author: lidianbin(lidianbin@baidu.com)
 * @date:   2016-06-27 11:18:42
 */

var edp = require('edp-core');
var cordovaCli = require('cordova').cli;
var fs = require('fs');
var path = require('path');

/**
 * 命令行配置项
 *
 * @inner
 * @type {Object}
 */
var cli = {};

/**
 * 命令描述信息
 *
 * @type {string}
 */
cli.description = '导入包';

/**
 * 命令选项信息
 *
 * @type {Array}
 */
cli.options = [];

/**
 * 模块命令行运行入口
 *
 * @param {Array} args 命令运行参数.
 * @param {Array} opts 命令运行参数.
 * @param {function=} opt_callback 执行完毕之后的回掉函数.
 */
cli.main = function (args, opts, opt_callback) {

    console.log(args);
    console.log(opts);

    var appName = args[0];

    fs.mkdir(appName, function (e) {
        if (e) {
            console.log('sss');
            edp.log.error(e);
            process.exit();
        }

        // 切换到项目目录
        edp.log.info('enter ' + process.cwd());
        process.chdir(appName);

        // init project
        init();

    });

};


function init() {
    // init edp project
    edp.log.info('edp project init ');

    // 处理命令行的参数传给 cordova_cli 处理
    var cordovaArgs = process.argv;
    cordovaArgs.splice(2, 1);
    cordovaArgs[3] = 'app';

    var next = createCordovaApp(cordovaArgs);

    initEdpProject(next);

}

/**
 * init edp Project
 */
function initEdpProject(next) {
    var cmd = edp.util.spawn(
        'edp',
        ['project', 'init']
    );

    cmd.on('error', function (error) {
        edp.log.error(error);
        process.exit();
    });

    cmd.on('close', function (code) {
        edp.log.info('edp project inited');

        // 执行下一步
        next && next();
    });
}

/**
 * 创建 cordova App
 */
function createCordovaApp(cordovaArgs) {

    return function (next) {
        // 创建 cordova 项目目录
        console.log(cordovaArgs);
        cordovaCli(cordovaArgs, function () {
		    console.log('created');
		    next && next();
		});
    };
}

/**
 * 命令行配置项
 *
 * @type {Object}
 */
exports.cli = cli;
