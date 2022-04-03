'use strict';

var path = require('path');
var argv = require('optimist').argv;

//日志输出颜色，其他颜色参考https://blog.csdn.net/guang_s/article/details/90380581
var logColor = {
    green: '\x1B[32m%s\x1B[0m',
    red: '\x1B[31m%s\x1B[0m',
};
module.exports = function () {
    process.env.projectTarget = argv.target || 'http://130.1.15.53:9080/hrbmbank_07';//代理目标路径，默认手机银行79测试环境
    process.env.projectPort = argv.port || 9000;//端口，默认9000
    process.env.projectRouter  = argv.router || '/hrbmbank';//默认根路由
    process.env.projectPath = path.resolve('./'); //可能是相对路径，要resolve，以便在gulpfile.js中使用
    process.argv.splice(2); //移除参数，以免gulp把它当成任务id
    console.log(logColor.green, '本机当前服务地址为http://127.0.0.1:' + process.env.projectPort + process.env.projectRouter);
    // 增加--gulpfile参数
    process.argv.push(
        '--gulpfile',
        // __dirname是全局变量，表示当前文件所在目录
        path.resolve(__dirname, './gulpfile.js')
    );

    utilArguments();//标准化传参
    require('gulp/bin/gulp');
}

function utilArguments () {
    process.env.projectTarget.replace(/\/$/, '');
}