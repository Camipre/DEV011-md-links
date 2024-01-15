const path = require('path');
const axios = require('axios');

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
const validateLinks = (links) => {
    const promises = links.map(link => {
        return new Promise((resolve, reject) => {
            axios.get(link.href)
                .then((response) => {
                    link.status = response.status;
                    link.ok = response.status >= 200 && response.status < 400 ? 'ok' : 'fail';
                    resolve(link);
                })
                .catch((error) => {
                    link.status = null;
                    link.ok = 'fail';
                    resolve(link);
                });
        });
    });

    return Promise.all(promises);
};

const getTotalLinks = (Links) => {
    const totalLinks = Links.length;
    return `Total: ${totalLinks}`;
}

const getUniqueLinks = (Links) => {
    const uniqueLinks = [...new Set(Links.map(elem => elem.href))].length;
    return `Unique: ${uniqueLinks}`;
}
const getBrokenLinks = (links) => {
    const brokenLinks = links.filter(link => link.ok === 'fail').length;
    return `Broken: ${brokenLinks}`;
  };

module.exports = {
    isAbsolutePath,
    ConverAbsolute,
    isValidMarkdownFile,
    extractLinks,
    validateLinks,
    getTotalLinks,
    getUniqueLinks,
    getBrokenLinks
};

