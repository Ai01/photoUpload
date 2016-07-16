var reqHandler = require('./reqHandler.js');

function route(pathname, req, res) {
    //根据请求方式不同的分发
    if (req.method == 'GET') {
        var handler = {};
        // 用js对象实现路由的分发
        handler['/'] = reqHandler.start;
        handler['/photo.js'] = reqHandler.start;
        handler['/photo.css'] = reqHandler.start;
        if (handler[pathname]) {
            handler[pathname](pathname, req, res);
        } else {
            res.writeHead('404', { 'content-type': 'text/plain' });
            res.write('404 NOT FOUND');
            res.end();
        }
    } else {
    	reqHandler.upload(pathname,req,res);
    }
};

exports.route = route;
