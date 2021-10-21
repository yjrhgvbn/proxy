var proxyRulers = [/https:\/\/www.baidu.com/];
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
}