const fs = require('fs');
const path = require('path');

function listControllerFiles(directoryPath) {
  let controllerFiles = [];
  const files = fs.readdirSync(directoryPath);
  files.forEach((file) => {
    const fullPath = path.join(directoryPath, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      controllerFiles = controllerFiles.concat(listControllerFiles(fullPath));
    } else if (file.includes('controller')) {
      controllerFiles.push(file);
    }
  });

  return controllerFiles;
}
const directoryPath = path.join(__dirname, '../routes');
const controllerFiles = listControllerFiles(directoryPath);

// Kontrolcü isimlerini burada tutacağız
const controllerFunctions = [];

controllerFiles.forEach((control) => {
  const filePath = `./${control.match(/^[a-z]+/)}/${control.replace(
    '.js',
    '',
  )}`;
  const controllerFunction = require(filePath);
  if (typeof controllerFunction === 'object') {
    const controller = control
      .replace('.js', '') // .js uzantısını kaldır
      .replace(/-([a-z])/g, (_, char) => char.toUpperCase());

    controllerFunctions.push(controllerFunction[controller]);
  }
  if (typeof controllerFunction === 'function') {
    controllerFunctions.push(controllerFunction);
  }
});
module.exports = controllerFunctions;
