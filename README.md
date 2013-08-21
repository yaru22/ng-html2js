ng-html2js
==========
Standalone script to turn Angular template into js and put it in a module.


Usage
-----
```
$ ng-html2js inputFile outputFile -m moduleName
```

If you specify only inputFile, it will display the result to the console.

If you don't specify moduleName, inputFile will be the name of the module.
```
$ ng-html2js test/test.tmpl
angular.module('test/test.tmpl', []).run(function($templateCache) {
  $templateCache.put('test/test.tmpl',
    '<div>\n' +
    '  hello world\n' +
    '  <div ng-repeat="item in items">\n' +
    '    {{ item }} it\'s value is great\n' +
    '  </div>\n' +
    '</div>\n' +
    '');
});
```

If you specify moduleName, the template will belong to that module.
```
$ ng-html2js test/test.tmpl -m foo
(function(module) {
try {
  module = angular.module('foo');
} catch (e) {
  module = angular.module('foo', []);
}
module.run(function($templateCache) {
  $templateCache.put('test/test.tmpl',
    '<div>\n' +
    '  hello world\n' +
    '  <div ng-repeat="item in items">\n' +
    '    {{ item }} it\'s value is great\n' +
    '  </div>\n' +
    '</div>\n' +
    '');
});
})();
```


License
-------
This seed is released under permissive MIT License.
