const path = require('path');
const fs = require('fs');
const { proxyPort } = require('../common/config.js');
const { writeFile } = require('../common/utils');

// https的url不一定提供，只能保证host是提供的
// win代理规则，生成一个pac脚本文件
function getTemp(proxyRulers, port = proxyPort) {
  const proxyRulersStr = `[${proxyRulers.join(', ')}]`
  return `var proxyRulers = ${proxyRulersStr};
var proxyPort = "PROXY https=https://localhost:14546;";

function FindProxyForURL(url, host) {
  var index = 0;
  while (index < proxyRulers.length) {
    try {
      if (proxyRulers[index].test(url)) {
        return proxyPort;
      }
    } catch (e) {
      if (shExpMatch(url, proxyRulers[index])) {
        return proxyPort;
      }
    }
  }
  return 'DIRECT';
}`
}

// proxyRulers 代理地址正则的数组
module.exports = function pacBuild(proxyRulers) {
  writeFile(getTemp(proxyRulers), path.resolve(__dirname, './winAuto.pac'));
}