const rewriteManage = require('../common/rewriteManage');
module.exports = class Rewrite {
  // TODO支持匹配正则
  constructor(url) {
    this.requestRewrite;
    this.responseRewrite;
    const { hostname, href } = new URL(url);
    rewriteManage.add(hostname, href, this);
  }

  setRequest(requestRewrite) {
    this.requestRewrite = requestRewrite;
    return this;
  }

  setRespont(responseRewrite) {
    this.responseRewrite = responseRewrite;
    return this;
  }
}