const axios = require('axios');

const {
    isAbsolutePath,
    ConverAbsolute,
    isValidMarkdownFile,
    validateLinks
} = require('../src/funtion.js');

jest.mock('axios');
beforeEach(() => {
    axios.get.mockReset();
});

describe('isAbsolutePath', () => {
    it('debería retornar true para una ruta absoluta', () => {
        const result = isAbsolutePath('D:/LABORATORIA/DEV011-md-links/docs/03-milestone.md');
        expect(result).toBe(true);
    });

    it('debería retornar false para una ruta relativa', () => {
        const result = isAbsolutePath('docs/03-milestone.md');
        expect(result).toBe(false);
    });
});

describe('ConverAbsolute', () => {
    it('debería convertir una ruta relativa a absoluta', () => {
        const result = ConverAbsolute('docs/03-milestone.md');
        expect(result).toBe('D:\\LABORATORIA\\DEV011-md-links\\docs\\03-milestone.md');
    });
});
describe('isValidMarkdownFile', () => {
    it('debería retornar true para un archivo Markdown válido', () => {
        const result = isValidMarkdownFile('docs/03-milestone.md');
        expect(result).toBe(true);
    });

    it('debería retornar false para un archivo no Markdown', () => {
        const result = isValidMarkdownFile('package.json');
        expect(result).toBe(false);
    });
});


describe('validateLinks', () => {
    it('debería validar correctamente los enlaces', async () => {
        axios.get.mockResolvedValue({ status: 200 });

        const links = [
            { href: 'https://www.google.com/', text: 'google', file: 'D:\\LABORATORIA\\DEV011-md-links\\docs\\03-milestone.md' },
        ];

        const result = await validateLinks(links);

        expect(result).toEqual([
            { href: 'https://www.google.com/', text: 'google', file: 'D:\\LABORATORIA\\DEV011-md-links\\docs\\03-milestone.md', status: 200, ok: 'ok' },

        ]);
    });
});
