ng-html2js [![Analytics](https://ga-beacon.appspot.com/UA-2694988-7/ng-html2js/readme?pixel)](https://github.com/yaru22/ng-html2js)
==========
[![Build Status](https://secure.travis-ci.org/yaru22/ng-html2js.png)](http://travis-ci.org/yaru22/ng-html2js)
[![Dependency Status](https://gemnasium.com/yaru22/ng-html2js.png)](https://gemnasium.com/yaru22/ng-html2js)

Standalone script to turn Angular template into js and put it in a module.


Usage
-----
```
$ ng-html2js inputFile [outputFile] [-m moduleName] [--module-var ngModule]
```

If you specify only inputFile, it will display the result to the console.

If you don't specify moduleName, inputFile will be the name of the module.
```
$ ng-html2js test/test.tmpl
var module = angular.module('test/test.tmpl', []);
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('test/test.tmpl',
    '<div>\n' +
    '  hello world\n' +
    '  <div ng-repeat="item in items">\n' +
    '    {{ item }} it\'s value is great\n' +
    '  </div>\n' +
    '</div>\n' +
    '');
}]);
```

If you specify moduleName, the template will belong to that module.
```
$ ng-html2js test/test.tmpl -m foo --module-var ngModule
var ngModule;
try {
  ngModule = angular.module('foo');
} catch (e) {
  ngModule = angular.module('foo', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('test/test.tmpl',
    '<div>\n' +
    '  hello world\n' +
    '  <div ng-repeat="item in items">\n' +
    '    {{ item }} it\'s value is great\n' +
    '  </div>\n' +
    '</div>\n' +
    '');
}]);
```


License
-------
This seed is released under permissive MIT License.
