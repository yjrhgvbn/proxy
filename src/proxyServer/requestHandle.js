const https = require('https');
const util = require("util");
const axios = require('axios').default;
const { writeFile } = require('../common/utils');
const { resolve } = require('path');
const rewriteManage = require('../common/rewriteManage')
module.exports = async function requestHandle(req, res) {
  rewriteManage.requestHandle(req, res);
  // const [requstOptions, requstOptionsRaw] = await getRequest(req);
  // const responseRes = await sendRequest(requstOptionsRaw);
  // res.send('responseRes.data');
  // res.status(responseRes.status).set(responseRes.headers).send(responseRes.data);
  // res.writeHead(responseOptions.statusCode, responseOptions.headers);
  // if (responseBody) {
  //   res.write(responseBody);
  // }
  // res.end();
  // 
}
