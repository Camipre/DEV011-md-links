const { ConverAbsolute, isValidMarkdownFile, extractLinks, validateLinks } = require('./src/funtion.js');
const fs = require('fs');

module.exports = {
  mdLinks,
};

function mdLinks(path, validate = false) {
  return new Promise((resolve, reject) => {
    const absolutePath = ConverAbsolute(path);

    fs.access(absolutePath, fs.constants.F_OK, (err) => {
      if (err) {
        reject(`Error, el archivo o directorio no existe - ${absolutePath}`);
      } else {
        if (!isValidMarkdownFile(absolutePath)) {
          reject(`Error, la extensión del archivo no es compatible - ${absolutePath}`);
        } else {
          fs.readFile(absolutePath, 'utf8', (err, data) => {
            if (err) {
              reject(`Error al leer el archivo: ${err.message}`);
            } else {
              const links = extractLinks(data, absolutePath);

              if (validate) {
                validateLinks(links)
                  .then((validatedLinks) => resolve(validatedLinks))
                  .catch(reject);
              } else {
                resolve(links);
              }
            }
          });
        }
      }
    });
  });
}
