const Rewrite = require('../common/Rewrite');

module.exports = function rewriteExtends() {
  let origin = 'http://localhost:8000';
  new Rewrite('https://sit-ecp-console.api.adidas.com.cn').setRequest((req)=>{
    origin = req.headers.origin || origin;
  }).setRespont((res) => {
    if(res.headers['access-control-allow-origin']){
      return {
        ...res,
        headers:{
          ...res.headers,
          ['access-control-allow-origin']:origin,
        }
      }
    }
    return null;
    // access-control-allow-origin
  })
}
