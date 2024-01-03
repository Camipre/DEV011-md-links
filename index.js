const { ConverAbsolute, isValidMarkdownFile, extractLinks } = require('./src/funtion.js');
const fs = require('fs');

module.exports = {
  mdLinks,
};

function mdLinks(path, validate = {}) {
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
              resolve(links);
            }
          });
        }
      }
    });
  });
}



//const fs = require("fs");

// const MdLinks = (path, options) => {
//   return new Promise((resolve, reject) => {
//     // Identificar si la ruta existe
//     if (fs.existsSync(path)) {
//       //chequear o convertir a una ruta absoluta
//       //Probar si esta ruta absoluta es una archivo o un directorio
//       // Si es u7n directorio filtar los archivos md.
//     } else {
//       // si no existe la ruta se rechaza la promesa
//       reject('La ruta no existe')
//     }
//   });
// };