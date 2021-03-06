const https = require('https');
const express = require('express')
const forge = require('node-forge');
const net = require('net');
const tls = require('tls');
const bodyParser = require('body-parser')
const createServerCertificate = require('./cert');
const requestHandle = require('./requestHandle');
const { proxyPort } = require('../common/config.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
  // 保留二进制数据和编码
  verify: (req, res, buffers, encoding) => {
    req.bodyRow = buffers;
    req.bodyEncoding = encoding;
  }
}));

function connect(clientRequest, clientSocket, head) {
  // 连接目标服务器
  const targetSocket = net.connect(this.fakeServerPort, '127.0.0.1', () => {
    // 通知客户端已经建立连接
    clientSocket.write(
      'HTTP/1.1 200 Connection Established\r\n'
      // + 'Proxy-agent: MITM-proxy\r\n'
      + '\r\n',
    );

    // 建立通信隧道，转发数据
    targetSocket.write(head);
    clientSocket.pipe(targetSocket).pipe(clientSocket);
  });
}

/** 创建支持多域名的 https 服务 **/
function createFakeHttpsServer(fakeServerPort = 0) {
  return new Promise((resolve, reject) => {
    const serverOptions = {
      SNICallback: (hostname, callback) => {
        const { key, cert } = createServerCertificate(hostname);
        callback(
          null,
          tls.createSecureContext({
            key: forge.pki.privateKeyToPem(key),
            cert: forge.pki.certificateToPem(cert),
          }),
        );
      },
    };
    const fakeServer = new https.Server(serverOptions, app)
    // const fakeServer = new https.Server(serverOptions)
    fakeServer
      .on('error', reject)
      .listen(fakeServerPort, () => {
        resolve(fakeServer);
      });
  });
}

function createProxyServer() {
  return new Promise((resolve, reject) => {
    const serverCrt = createServerCertificate('localhost');
    const proxyServer = https.createServer({
      key: forge.pki.privateKeyToPem(serverCrt.key),
      cert: forge.pki.certificateToPem(serverCrt.cert),
    })

      .on('error', reject)
      .listen(proxyPort, () => {
        resolve(proxyServer);
      });
  });
}


module.exports = function proxyStart() {
  return Promise.all([
    createProxyServer(),
    createFakeHttpsServer(),
  ]).then(([proxyServer, fakeServer]) => {
    // fakeServer.on('request', requestHandle);
    app.all('*', requestHandle);
    proxyServer.on('connect', connect.bind({
      fakeServerPort: fakeServer.address().port,
    }));
  }).then(() => {
    console.log(`proxy is ok: https://localhost:${proxyPort}`);
  });
}
