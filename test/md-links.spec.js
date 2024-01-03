const { mdLinks } = require('../index.js');

// describe('mdLinks', () => {

//   it('should...', () => {
//     console.log('FIX ME!');
//   });

// });

describe('mdLinks', () => {
  it('debería resolver un arreglo con 3 links para un archivo .md con 1 links', () => {
    return mdLinks('docs/03-milestone.md').then((result) => {
      expect(result).toEqual([{
        "file": "D:\\LABORATORIA\\DEV011-md-links\\docs\\03-milestone.md",
        "href": "https://www.google.com/",
        "text": "google",
      }]);
    });
  });

  it('validar que rechace un archivo inexistente', () => {
    return mdLinks('miArchivo.md').catch((error) => {
      expect(error).toEqual('Error, el archivo o directorio no existe - D:\\LABORATORIA\\DEV011-md-links\\miArchivo.md');
    });
  });
  it('veriifcar que rechace una extencion diferente', () => {
    return mdLinks('package.json').catch((error) => {
      expect(error).toEqual('Error, la extensión del archivo no es compatible - D:\\LABORATORIA\\DEV011-md-links\\package.json');
    });
  });
});
