const globAll = require('glob-all');
const { assert } = require('chai');

describe('Checking generated files', function () {

    it('should generate html files', function () {
      const files = globAll.sync([
        './dist/search.html',
        './dist/management.html',
      ]);
      assert.isTrue(files.length > 0, 'no html files generated');
    });
  
    it('should generate js files', function () {
      const files = globAll.sync([
        './dist/search.*.js',
        './dist/management.*.js',
      ]);
      assert.isTrue(files.length > 0, 'no js files generated');
    });
  
    it('should generate css files', function () {
      const files = globAll.sync([
        './dist/search.*.css',
        './dist/management.*.css',
      ]);
      assert.isTrue(files.length > 0, 'no css files generated');
    });
  
  });