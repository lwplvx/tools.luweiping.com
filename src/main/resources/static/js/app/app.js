'use strict'

var app = angular.module('app', []);

// app.all('*', function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By", ' 3.2.1');
//    // res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });

function HttpGet($http, url, success) {
    /* 
     <META HTTP-EQUIV="Pragma" CONTENT="no-cache">
     <META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
     <META HTTP-EQUIV="Expires" CONTENT="0">
     */
    $http({
        method: 'GET',
        url: url,
        headers: [
            {"Access-Control-Allow-Origin": "*"},
            {"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"},
            {"Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS"},
        ]
    }).then(function onSuccess(response) {
        // Handle success
        var data = response.data;
        var status = response.status;
        var statusText = response.statusText;
        var headers = response.headers;
        var config = response.config;
        //响应成功
        if (data.resultcode === "200") {
            success(data);
        } else {
            console.log(data);
        }

    }).catch(function onError(response) {
        // Handle error
        var data = response.data;
        var status = response.status;
        var statusText = response.statusText;
        var headers = response.headers;
        var config = response.config;
        //处理响应失败
        console.log(data);
        if (error) {
            error(data);
        }
    });

}


function proxyGet($http, url, success) {
    /*
     <META HTTP-EQUIV="Pragma" CONTENT="no-cache">
     <META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
     <META HTTP-EQUIV="Expires" CONTENT="0">
     */
    $http({
        method: 'GET',
        url: "/proxy/get/" + url,
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    }).then(function onSuccess(response) {
        // Handle success
        var data = response.data;
        var status = response.status;
        var statusText = response.statusText;
        var headers = response.headers;
        var config = response.config;
        //响应成功
        if (data.resultcode === "200") {
            success(data);
        } else {
            console.log(data);
        }

    }).catch(function onError(response) {
        // Handle error
        var data = response.data;
        var status = response.status;
        var statusText = response.statusText;
        var headers = response.headers;
        var config = response.config;
        //处理响应失败
        console.log(data);
        if (error) {
            error(data);
        }
    });

}

function HttpPost($http, url, param, success, error) {

    $http({
        method: 'POST',
        url: url,
        data: $.param(param),  // pass in data as strings
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': '*',
        }
    }).then(function onSuccess(response) {
        // Handle success
        var data = response.data;
        var status = response.status;
        var statusText = response.statusText;
        var headers = response.headers;
        var config = response.config;

        //响应成功
        if (data.resultcode === "200") {
            success(data);
        } else {
            console.log(data);
        }
    }).catch(function onError(response) {
        // Handle error
        var data = response.data;
        var status = response.status;
        var statusText = response.statusText;
        var headers = response.headers;
        var config = response.config;
        //处理响应失败
        console.log(data);
        if (error) {
            error(data);
        }
    });
}
app.controller('mainController', function ($scope, $rootScope, $http, $location) {

    $scope.srcValue = "";
    $scope.resValue = "";


    $scope.enCode = function () {
        var b = new Base64();
        $scope.resValue = b.encode($scope.srcValue);
    };

    $scope.deCode = function () {
        var b = new Base64();
        $scope.srcValue = b.decode($scope.resValue);
    };
    $scope.clear = function () {
        $scope.srcValue = "";
        $scope.resValue = "";
    };
    $scope.copy = function () {
        var Url2 = document.getElementById("res-textarea");
        Url2.select(); // 选择对象
        document.execCommand("Copy"); // 执行浏览器复制命令

        if (window.Notification && Notification.permission !== "denied") {
            Notification.requestPermission(function (status) {
                var n = new Notification('复制成功', {body: '骚年，你要的内容已经复制到剪切板！'});
            });
        } else {
            alert("骚年，你要的内容已经复制到剪切板！");
        }
    }

    //阻止事件冒炮
    $scope.stopBubble = function (e) {
        //如果提供了事件对象，则这是一个非IE浏览器 
        if (e && e.stopPropagation)
        //因此它支持W3C的stopPropagation()方法
            e.stopPropagation();
        else
        //否则，我们需要使用IE的方式来取消事件冒泡
            window.event.cancelBubble = true;
    };


    $scope.$on("$viewContentLoaded", function () {
        console.log("ng-view content loaded!");

    });

    $scope.$on("$routeChangeStart", function (event, next, current) {


    });

});


app.controller('ipController', function ($scope, $rootScope, $http, $location) {

    $scope.ipData = {};
    var temp = {
        "reason": "successed",
        "data": {
            "addressInf": {
                "area": "",
                "province": "广东省",
                "operator": "电信",
                "city": "深圳市",
                "country": ""
            },
            "ipNo": "119.136.152.82"
        }, "resultcode": "200"
    };

    $scope.getIP = function () {
        //  http://api.shikexin.com/ws/api/getIpNo?appKey=66f61bf70ee615f2c14afb23948da01c
        var url = "http://api.shikexin.com/ws/api/getIpNo?appKey=66f61bf70ee615f2c14afb23948da01c";
        jQuery.getJSON(url + "&callbak=?", function(data)
        {

            $scope.ipData = data.data;
        });

        return;

        $.ajax({
           url: url ,
           type: 'GET',
           dataType: 'jsonp',  // 处理Ajax跨域问题
            jsonp: "jsonpCallback",//传递给请求处理程序或页面的，
           //用以获得jsonp回调函数名的参数名(一般默认为: callback)
           jsonpCallback: "jsonpCallback",//自定义的jsonp回调函数名称，
           //默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
           success: function (data) {
               $scope.ipData = data.data;
           }
        });
        function jsonpCallback(data) {
            $scope.ipData = data.data;
        }

        return;

        //var iframe = $('iframe#iframe');
        //iframe.domain = 'shikexin.com';
        //iframe.attr('src', url);
        //$('iframe#authIframe').load(function () {
        //    var iframe = $('iframe#authIframe');

        //    $scope.ipData = JSON.parse(iframe.innerHTML);
        //}); 

        //iframe.onload = function () {
        //    alert("loaded");
        //};

        //setTimeout(function () {

        //    var body = $(iframe.contentWindow.document.body).html()
        //    $scope.ipData = JSON.parse(body.innerHTML);
        //}, 1000);
        // HttpGet($http, url, function (data) {
        //     $scope.ipData = data.data;
        // });

        //var url = "http://api.shikexin.com/ws/api/getIpNo?callback=JSON_CALLBACK&appKey=66f61bf70ee615f2c14afb23948da01c";


        $.ajax({
            type:"get",
            url:url,/*url写异域的请求地址*/
            dataType:"jsonp",/*加上datatype*/
            jsonpCallback:"jsonpCallback",/*设置一个回调函数，名字随便取，和下面的函数里的名字相同就行*/
            success:function(data){
                $scope.ipData = data.data;
            }
        });
        function jsonpCallback(data) //回调函数
        {
            alert(data.message); //
        }

        // $http({
        //     method: 'JSONP',
        //     url: url,
        // },function (data) {
        //     $scope.ipData = data.data;
        //     console.log(data);
        // });
        //或者
        // $http.jsonp('http://www.b.com/test.php?callback=JSON_CALLBACK')
        //     .success(function (msg) {
        //         console.log(msg);
        //     });


    }

    $scope.getIP();
    $scope.$on("$viewContentLoaded", function () {
        console.log("ng-view content loaded!");

    });

    $scope.$on("$routeChangeStart", function (event, next, current) {

    });

});