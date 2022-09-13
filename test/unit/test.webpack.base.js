const path = require('path');
const { assert } = require('chai');

process.chdir(path.resolve(__dirname, '../smoke/template'));

// load webpack config js after change process dir
const baseConfig = require('../../lib/webpack.base');

describe('webpack.base.js test case', function () {
  it('entry', function () {
    assert.isTrue(baseConfig.entry.search.indexOf('search/index.js') > -1);
    assert.isTrue(baseConfig.entry.management.indexOf('management/index.js') > -1);
  });
});
