/**
 * DISCLAIMER: Core logic was copied from https://github.com/karma-runner/karma-ng-html2js-preprocessor.
 * Since karma-ng-html2js-preprocessor was designed specifically for karma,
 * I modified it to create a standalone script.
 */

/* globals module */
'use strict';

var util = require('util');



//
// Constants
//

var TEMPLATE = 'angular.module(\'%s\', []).run(["$templateCache", function($templateCache) {\n' +
    '  $templateCache.put(\'%s\',\n    \'%s\');\n' +
    '}]);\n';

var SINGLE_MODULE_TPL = '(function(module) {\n' +
    'try {\n' +
    '  module = angular.module(\'%s\');\n' +
    '} catch (e) {\n' +
    '  module = angular.module(\'%s\', []);\n' +
    '}\n' +
    'module.run(["$templateCache", function($templateCache) {\n' +
    '  $templateCache.put(\'%s\',\n    \'%s\');\n' +
    '}]);\n' +
    '})();\n';


//
// Helper
//

var escapeContent = function(content) {
  return content.replace(/\\/g, '\\\\').replace(/'/g, '\\\'').replace(/\r?\n/g, '\\n\' +\n    \'');
};


//
// Main script
//

module.exports = function (fileName, content, moduleName) {
  var escapedContent = escapeContent(content);

  var output = null;
  if (moduleName) {
    output = util.format(SINGLE_MODULE_TPL, moduleName, moduleName, fileName, escapedContent);
  } else {
    output = util.format(TEMPLATE, fileName, fileName, escapedContent);
  }

  return output;
};
