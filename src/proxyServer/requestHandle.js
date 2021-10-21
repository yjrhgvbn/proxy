const https = require('https');
const util = require("util");
const axios = require('axios').default;
const { writeFile } = require('../common/utils');
const { resolve } = require('path');

module.exports = async function requestHandle(req, res) {
  // req.connection.encrypted ? 'https' : "http"
  const [requstOptions, requstBody] = await getRequest(req);

  const [responseOptions, responseBody] = await sendRequest(requstOptions, requstBody);
  res.writeHead(responseOptions.statusCode, responseOptions.headers);
  if (responseBody) {
    res.write(responseBody);
  }
  res.end();
}

async function getRequest(req) {
  writeFile(util.inspect(req.url, { depth: null }), './h.txt');
  const { connection, host, ...originHeaders } = req.headers;
  const requstOptions = {
    method: req.method,
    hostname: host,
    port: '443',
    path: req.url,
    headers: { ...originHeaders }
  };
  const requestPromise = new Promise(resolve => {
    if (req.method === 'POST') {
      let buffers = [];
      req.on('data', (chunk) => {
        buffers.push(chunk);
      })
      req.on('end', () => {
        let requestBody = Buffer.concat(buffers);
        resolve(requestBody);
      })
      req.on('error', (e) => {
        console.log("🚀 ~ file: requestHandle.js ~ line 42 ~ req.on ~ e", e)
      })
    } else {
      resolve(null)
    }
  });
  const requestBody = await requestPromise.catch((e) => console.error(e));
  return [requstOptions, requestBody];
}

async function sendRequest(options, body) {
  const url = 'https://' + options.hostname + options.path;
  console.log("🚀 ~ file: requestHandle.js ~ line 49 ~ sendRequest ~ url", url)
  const reqoptions = {
    url: url,
    headers: options.headers,
    data: body || undefined,
  };
  const res = await axios(reqoptions);
  const { status, headers, data } = res;
  // console.log("🚀 ~ file: requestHandle.js ~ line 55 ~ sendRequest ~ reqoptions", reqoptions)
  // const requestPromise = new Promise(resolve => {
  //   request(reqoptions,(error, response, body)=>{
  //     resolve([ response, body])
  //   })
  // })
  // const responseRes = await requestPromise.catch((e) => console.error(e));
  return [{ statusCode: status, headers }, data];
}
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