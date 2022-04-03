var gulp = require("gulp");
var browsersync = require("browser-sync");
var { createProxyMiddleware  } = require('http-proxy-middleware');

var filter = function (pathname, req) {
    var commonRule = pathname.match(process.env.projectRouter + '.*\.do$');
    var customRule = pathname.match(process.env.projectRouter + '/SrandNumData') || pathname.match(process.env.projectRouter + '/VerifyImage') || (req.headers['isajax'] && !(pathname.match(process.env.projectRouter + '.*\.json') || pathname.match(process.env.projectRouter + '.*\.js') || pathname.match(process.env.projectRouter + '.*\.htm')));
    return commonRule || customRule;
}
var middleware = createProxyMiddleware (filter, {
    target: process.env.projectTarget,
    changeOrigin: true,
    logLevel: 'debug',
    pathRewrite: { ['^' + process.env.projectRouter] : ''}
});
 
gulp.task("default", function () {
    browsersync.init({
        server: {
            middleware: middleware,
            routes: { [process.env.projectRouter]: process.env.projectPath}
        },
        port: process.env.projectPort,
        open: false,
        ui: false,
        notify: false,
        snippetOptions: {
            rule: {
                match: /prevent-browser-sync-insert-script-to-body-tag/,//匹配一个不存在的值，避免browser-sync插入脚本
            }
        },
    });
});
