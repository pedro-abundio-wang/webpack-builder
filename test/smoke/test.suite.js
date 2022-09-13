const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
const Mocha = require('mocha')

const mocha = new Mocha()

// change process dir before invoke webpack
process.chdir(path.resolve(__dirname, 'template'));

// load webpack config js after change process dir
const prodConfig = require('../../lib/webpack.prod');

rimraf(path.resolve(process.cwd(), './dist'), () => {
  webpack(prodConfig, (err, stats) => {
    if (err) {
      console.error(err); // eslint-disable-line
      process.exit(1);
    }
    console.log(stats.toString({ // eslint-disable-line
      colors: true,
    }));
    console.log('webpack build success, begin run test.'); // eslint-disable-line
    mocha.addFile(path.resolve(__dirname, './test.generated.files.js'));
    mocha.run();
  });
});