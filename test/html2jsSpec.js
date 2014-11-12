/* globals describe, it */
'use strict';

var fs = require('fs');

var html2js = require('../src/html2js.js');



describe('html2js', function() {
  describe('without module', function() {
    it('should produce output that matches the contents of expectedTestTmplJs', function() {
      var content = fs.readFileSync('./test/test.tmpl', 'utf8');
      var output = html2js('test/test.tmpl', content, null, 'ngModule');
      var expected = fs.readFileSync('./test/expectedTestTmplJs', 'utf8');

      output.should.equal(expected);
    });
  });

  describe('with module foo', function() {
    it('should produce output that matches the contents of expectedTestTmplJsModule', function() {
      var content = fs.readFileSync('./test/test.tmpl', 'utf8');
      var output = html2js('test/test.tmpl', content, 'foo', 'ngModule');
      var expected = fs.readFileSync('./test/expectedTestTmplJsModule', 'utf8');

      output.should.equal(expected);
    });
  });
});
