const path = require('path');
const marked = require('marked');

const isAbsolutePath = (route) => path.isAbsolute(route);

const ConverAbsolute = (route) => {
    return isAbsolutePath(route) ? route : path.resolve(route);
};

const isValidMarkdownFile = (filePath) => {
    const validExtensions = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];
    const ext = path.extname(filePath);
    return validExtensions.includes(ext);
};

const extractLinks = (fileContent, filePath) => {
    const links = [];
    const regularPhrase = /\[([^\]]+)\]\(([^\)]+)\)/g;
    let match;

    while ((match = regularPhrase.exec(fileContent)) !== null) {
        let linkhttp = match[2];

        if (linkhttp.indexOf('http') === -1) {
        } else {
            links.push({ text: match[1], href: match[2], file: filePath });
        }
    }
    return links;
};

module.exports = {
    isAbsolutePath,
    ConverAbsolute,
    isValidMarkdownFile,
    extractLinks
};

// const extractLinks = (fileContent, filePath) => {
//     const links = [];
//     console.log(links);
//     const renderer = new marked.Renderer();

//     // renderer.link = function (href, _, text) {
//     //     links.push({ href, text, file: filePath });
//     // };

//     marked(fileContent, { renderer });

//     return links;
// };
