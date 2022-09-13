const path = require('path');
const Mocha = require('mocha')

const mocha = new Mocha()

mocha.addFile(path.resolve(__dirname, './test.webpack.base.js'));
mocha.run();
