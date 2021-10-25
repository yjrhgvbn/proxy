简单的实现了代理重写https

使用方法（win）：
1、将src\proxyServer\cert在mmc控制台中导入到“受信任的根证书颁发机构”

2、在设置-代理里将脚本地址设置为http://127.0.0.1:14545/winAuto.pac，或者使用其他方法将代理地址设置为localhost:14546

3、在src\main\extends.js重写请求或者响应


pac文档：https://docs.microsoft.com/zh-cn/troubleshoot/browsers/optimize-pac-performance

axios文档：https://github.com/axios/axios

express文档：https://expressjs.com/

插件代理：https://proxy-switchyomega.com/

数据格式化：https://wejson.cn/

请求测试：https://getman.cn/

node http 压缩：http://nodejs.cn/api/zlib/compressing_http_requests_and_responses.html

跨域测试：https://webbrowsertools.com/test-cors/
