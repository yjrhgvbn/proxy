const pacStart = require('../pacServer/start');
const proxyStart = require('../proxyServer/start');

function start() {
  pacStart([/https:\/\/www.baidu.com/]);
  proxyStart()
};
start();