var fs = require('fs');
var path = require('path');
var mime = require('./mime.js').types;
var querystring = require('querystring');


function start(pathname, req, res) {
    res.writeHead(200, { 'Content-type': 'text/plain' });
    if (pathname == '/') {
        fs.readFile(path.join('./views/', 'photo.html'), 'binary', function(err, data) {
            if (err) { res.end('404') } else {
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.write(data, 'binary');
                res.end();
            }
        });
    } else {
        fs.readFile(path.join('./views', pathname), 'binary', function(err, data) {
            if (err) {
                res.writeHead('404', { 'content-type': 'text/plain' });
                res.write('404 NOT FOUND');
                res.end();
            } else {
                var ext = path.extname(pathname);
                ext = ext ? ext.slice(1) : 'unknown';
                var contentType = mime[ext] || "text/plain";
                res.writeHead(200, {
                    'Content-Type': contentType
                });
                res.write(data, "binary");
                res.end();
            }
        });
    }
};



//图片上传函数
function upload(pathname, req, res) {
    function parseFile(req, res) {
        req.setEncoding('binary');
        var body = ''; // 文件数据
        var fileName = ''; // 文件名
        // 边界字符串
        var boundary = req.headers['content-type'].split(';')[1].replace('boundary=', '');
        req.on('data', function(chunk) {
            body += chunk;
        });

        req.on('end', function() {
            var file = querystring.parse(body, '\r\n', ':')
            console.log(file['Content-Type']);
            // 只处理图片文件
            if (file['Content-Type'].indexOf("image") !== -1) {
                //获取文件名
                var fileInfo = file['Content-Disposition'].split('; ');
                for (value in fileInfo) {
                    if (fileInfo[value].indexOf("filename=") != -1) {
                        fileName = fileInfo[value].substring(10, fileInfo[value].length - 1);

                        if (fileName.indexOf('\\') != -1) {
                            fileName = fileName.substring(fileName.lastIndexOf('\\') + 1);
                        }
                        console.log("文件名: " + fileName);
                    }
                }

                // 获取图片类型(如：image/gif 或 image/png))
                var entireData = body.toString();
                var contentTypeRegex = /Content-Type: image\/.*/;

                contentType = file['Content-Type'].substring(1);

                //获取文件二进制数据开始位置，即contentType的结尾
                var upperBoundary = entireData.indexOf(contentType) + contentType.length;
                var shorterData = entireData.substring(upperBoundary);
                // 替换开始位置的空格
                var binaryDataAlmost = shorterData.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
                // 保存文件
                fs.writeFile(path.join('./file/', fileName), binaryDataAlmost, 'binary', function(err) {
                    res.end('good');
                });
            } else {
                res.end('只能上传图片文件');
            }
        });
    }

    parseFile(req, res);
};


exports.start = start;
exports.upload = upload;
