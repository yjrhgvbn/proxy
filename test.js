const https = require('https');

const options = {"method":"POST","hostname":"api.juejin.cn","port":"443","path":"/content_api/v1/article/column?aid=2608&uuid=7003208803181659648","headers":{"content-length":"60","pragma":"no-cache","cache-control":"no-cache","sec-ch-ua":"\"Chromium\";v=\"94\", \"Google Chrome\";v=\"94\", \";Not A Brand\";v=\"99\"","sec-ch-ua-mobile":"?0","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36","sec-ch-ua-platform":"\"Windows\"","content-type":"application/json","accept":"*/*","origin":"https://juejin.cn","sec-fetch-site":"same-site","sec-fetch-mode":"cors","sec-fetch-dest":"empty","referer":"https://juejin.cn/","accept-encoding":"gzip, deflate, br","accept-language":"zh-CN,zh;q=0.9","cookie":"_ga=GA1.2.1973528574.1626953073; uid_tt=7fdd3f655b6dcaf3c0e3472a18a475b6; uid_tt_ss=7fdd3f655b6dcaf3c0e3472a18a475b6; sid_tt=176af0904500dbf18d1a98cc2b7d1c78; sessionid=176af0904500dbf18d1a98cc2b7d1c78; sessionid_ss=176af0904500dbf18d1a98cc2b7d1c78; n_mh=VyQDB8v-5vpT8PrmUcg7dwFNEeWnNfscGS69WoDQIw4; sid_guard=176af0904500dbf18d1a98cc2b7d1c78%7C1629959887%7C5184000%7CMon%2C+25-Oct-2021+06%3A38%3A07+GMT; sid_ucp_v1=1.0.0-KDU3NGQxNmIzMGY4ZTIxOTQ1YTYwZDUzYzdjYmExMjgxZWZlMmIyMWEKFwjd44Cu04ycBxDP7ZyJBhiwFDgCQO8HGgJsZiIgMTc2YWYwOTA0NTAwZGJmMThkMWE5OGNjMmI3ZDFjNzg; ssid_ucp_v1=1.0.0-KDU3NGQxNmIzMGY4ZTIxOTQ1YTYwZDUzYzdjYmExMjgxZWZlMmIyMWEKFwjd44Cu04ycBxDP7ZyJBhiwFDgCQO8HGgJsZiIgMTc2YWYwOTA0NTAwZGJmMThkMWE5OGNjMmI3ZDFjNzg; _gid=GA1.2.1593054039.1634526084; MONITOR_WEB_ID=26057c81-075b-4b71-ac5e-a6a18a59b9df"}}
const req = https.request(options, (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (e) => {
  console.error(e);
});
req.end();