const fs = require('fs');

function copyFile(filename, pPath) {
  const pFile = `${pPath}${filename}`;
  fs.copyFile(`./${filename}`, pFile, function (err) {
    if (err) console.log(`哎呀，报错了呢！\r\n${err}`);
    else console.log('文件已同步移动到指定项目目录！');
  });
}

module.exports = copyFile;