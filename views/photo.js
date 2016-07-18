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
    var container=document.getElementById('container');
    fileEnter.addEventListener('change', function() {
        //console.log(fileEnter.files[0].size);
        //文件上传实现
        var files = fileEnter.files;
        console.log(files[0]);
        console.log(files[0].webkitRelativePath)
        var formData = new FormData();
        for (var i = 0; i < files.length; i++) {
            formData.append(files[i].name, files[i]);
        }
        var xhr = createXHR();
        xhr.onreadyStatechange = function() {
            if (xhr.readyState == 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    alert(xhr.responseText);
                } else {
                    alert("success:" + xhr.status);
                }
            }
        };
        xhr.upload.onprogress = function(event) {
            //console.log('1');
            if (event.lengthComputable) {
                var completedPercent = event.loaded / event.total;
                //console.log(completedPercent);
                container.innerHTML="<div style='margin:10px;'>"+"<img style='height:50px;width:50px;' src="+window.URL.createObjectURL(files[0])+"><br>"+
                "<span>"+files[0].name+"</span><br><progress value='"+completedPercent+"' max='1'></progress></div>";
            }
        };
        xhr.timeout = 3000;
        xhr.ontimeout = function() {
            alert('传送超时');
        };
        xhr.open('post', 'http://localhost:8008', true);
        xhr.setRequestHeader("Content-type", "multipart/form-data;boundary=bai");
        xhr.send(formData);
    });




















};
