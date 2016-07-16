window.onload = function() {

    // 创建xhr对象
    function createXHR() {
        if (typeof XMLHttpRequest != "undefined") {
            return new XMLHttpRequest();
        } else if (typeof ActiveXObject != "undefined") {
            if (typeof arguments.callee.activeXString != "string") {
                var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],
                    i, len;
                for (i = 0, len = versions.length; i < len; i++) {
                    try {
                        new ActiveXObject(versions[i]);
                        arguments.callee.activeXString = versions[i];
                        break;
                    } catch (ex) {

                    }
                }
            }
            return new ActiveXObject(arguments.callee.activeXString);
        } else {
            throw new Error("NO XHR object available");
        }
    };


    //文件上传
    var fileEnter = document.getElementById('fileEnter');
    fileEnter.addEventListener('change', function() {
        var files = fileEnter.files;
        var formData = new FormData();
        formData.append('file', files[0]);
        var xhr =createXHR();
        xhr.onreadyStatechange = function() {
            if (xhr.readyState == 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    alert(xhr.responseText);
                } else {
                    alert("success:" + xhr.status);
                }
            }
        };
        xhr.open('post', 'http://localhost:8008', true);
        xhr.setRequestHeader("Content-type", "multipart/form-data;boundary=bai");
        xhr.send(formData);

    });










};
