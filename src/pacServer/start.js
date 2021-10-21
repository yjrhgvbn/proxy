const path = require('path');
const http = require("http");
const fs = require("fs");
const { pacPort } = require('../common/config.js');
const pacBuild = require('./pacBuild');
const {writeFile} = require('../common/utils')
function send404(response) {
  response.writeHead(404, { "Content-Type": "text/plain" });
  response.write("Error 404: Resource not found.");
  response.end();
}

// pac脚本挂载到http，http://127.0.0.1:6667/winAuto.pac
function startSever() {
  const server = http.createServer(function (req, res) {
    writeFile(JSON.stringify(req.headers), './h.txt')
    if (req.method == "GET" && req.url == "/winAuto.pac") {
      res.writeHead(200, { "content-type": "application/x-javascript-config" });
      fs.createReadStream(path.resolve(__dirname, './win.pac')).pipe(res);
      // fs.createReadStream(path.resolve(__dirname, './winAuto.pac')).pipe(res);
    } else {
      send404(res);
    }
  }).listen(pacPort, ()=>{
    console.log(`pac   is ok：http://127.0.0.1:${pacPort}/win.pac`);
  });
}

module.exports = function pacStart(proxyRulers) {
  pacBuild(proxyRulers);
  startSever();
}