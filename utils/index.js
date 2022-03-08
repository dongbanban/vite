/*
 * @file: Describe the file
 * @author: dongyang
 */

const path = require('path');

/**
 * 处理配置中的相对路径
 * @param p
 * @returns {string}
 */
function resolveRootPath(p) {
    return path.join(__dirname, '..', p);
}

module.exports = {
    resolveRootPath
}