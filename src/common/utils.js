const fs = require("fs");

function writeFile(text, savePtah) {
  fs.writeFile(savePtah, text, err => {
    if (err) {
      console.error(err)
      return;
    }
  })
}

module.exports = {
  writeFile
}