const pacStart = require('../pacServer/start');
const proxyStart = require('../proxyServer/start');
const rewriteExtends = require('./extends');

function start() {
  pacStart([/https:\/\/www.baidu.com/]);
  proxyStart()
};

process.on('uncaughtException', (err) => {
  console.log("🚀 ~ file: start.js ~ line 68 ~ process.on ~ err", err)
  // console.error(err);
});

rewriteExtends();
start();