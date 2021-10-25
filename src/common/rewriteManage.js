const https = require('https');
const util = require("util");
const axios = require('axios').default;
const { writeFile } = require('../common/utils');
const { resolve } = require('path');

async function getRequest(req) {
  const { method, protocol, hostname, url, query, body } = req;
  const fullUrl = protocol + '://' + hostname + url;
  let requstOptionsRaw = {
    method,
    hostname,
    url: fullUrl,
    headers: req.headers,
  };
  let requstOptions = {
    ...requstOptionsRaw,
    query,
  };
  if (method === "POST") {
    requstOptionsRaw = {
      ...requstOptions,
      data: req.bodyRow,
    };
    requstOptions = {
      ...requstOptions,
      data: body,
    }
  }
  return [requstOptions, requstOptionsRaw];
}

async function sendRequest(options) {
  const res = await axios(options).catch(e => {
    console.log(e)
  });
  return res;
}

class RewriteManage {
  constructor() {
    this.mapList = [];
  };
  add(host, url, rewrite) {
    this.mapList.push({ host, url, rewrite });
  };

  async requestHandle(req, res) {
    let [requstOptions, requstOptionsRaw] = await getRequest(req);
    const matchUrl = requstOptions.url;
    // 设置请求参数
    // 重写的合集
    let requestRewriteAll = {};
    for (let i = 0; i < this.mapList.length; i++) {
      const { url, rewrite } = this.mapList[i];
      if (!matchUrl.startsWith(url)) {
        continue;
      }
      isRequestRewrite = true;
      if (rewrite.requestRewrite) {
        const requestOptionsParse = { ...requstOptions, ...requestRewriteAll };
        const rewritePart = (await rewrite.requestRewrite(requestOptionsParse, req)) || {};
        requestRewriteAll = { ...requestRewriteAll, ...rewritePart };
      }
    }
    // 发送请求, 没有改动设置为原数据
    let responseRes = await sendRequest({ ...requstOptionsRaw, ...requestRewriteAll });
    // 修改请求
    // let responseRewriteAll = {};
    for (let i = 0; i < this.mapList.length; i++) {
      const { url, rewrite } = this.mapList[i];
      if (!matchUrl.startsWith(url)) {
        continue;
      }
      if (rewrite.responseRewrite) {
        const rewritePart = (await rewrite.responseRewrite(responseRes)) || {};
        // responseRewriteAll = {...responseRewriteAll, ...rewritePart}
        responseRes = { ...responseRes, ...rewritePart }
      }
    };
    res.status(responseRes?.status || 200).set(responseRes?.headers).send(responseRes?.data);
  }
}

const rewriteManage = new RewriteManage();

module.exports = rewriteManage;


// 改为axios
// async function sendRequest(options, body) {
//   const requestPromise = new Promise(resolve => {
//     const request = https.request(options, (proxyResponse) => {
//       const responseOptions = {
//         statusCode: proxyResponse.statusCode,
//         headers: proxyResponse.headers,
//       }
//       let buffers = [];
//       proxyResponse.on('data', (chunk) => {
//         buffers.push(chunk);
//       });
//       proxyResponse.on('end', () => {
//         let responseBody = Buffer.concat(buffers);
//         resolve([responseOptions, responseBody]);
//       });
//       proxyResponse.on('error', () => {
//         resolve([null, null]);
//       })
//     });
//     if (body) {
//       request.write(body);
//     }
//     request.end();
//   })
//   const responseRes = await requestPromise.catch((e) => console.error(e));
//   return responseRes;
// }