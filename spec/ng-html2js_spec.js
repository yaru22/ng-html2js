require('shelljs/global');

describe('ng-html2js', function() {
  it('converts an html file to a javascript object', function() {
    var returnValue = exec("./bin/ng-html2js spec/test.tmpl", {silent: true});
    var fileContents = cat("spec/expectedTestTmplJs");
    expect(returnValue.output).toEqual(fileContents);
  });

  it('can save the output to a file', function() {
    exec("./bin/ng-html2js spec/test.tmpl spec/testOutputFile", {silent: true});
    var testFileContents = cat("spec/expectedTestTmplOutputFileJs");
    var outputFileContents = cat("spec/testOutputFile");
    expect(testFileContents).toEqual(outputFileContents);
  });

  describe('providing the flag -m <module_name>', function() {
    it('converts the html file into a js object with a chosen module name', function() {
      var returnValue = exec("./bin/ng-html2js spec/test.tmpl -m foo", {silent: true});
      var fileContents = cat("spec/expectedTestTmplJsWithModule");
      expect(returnValue.output).toEqual(fileContents);
    });
  });

  describe('providing the flag --module-var <variable_name>', function() {
    it('converts the html file into a js object with a chosen module name', function() {
      var returnValue = exec("./bin/ng-html2js spec/test.tmpl --module-var ngModule", {silent: true});
      var fileContents = cat("spec/expectedTestTmplJsWithModuleVar");
      expect(returnValue.output).toEqual(fileContents);
    });
  });

  describe('providing the flag --module-var <variable_name>', function() {
    it('converts the html file into a js object with a chosen module name', function() {
      var returnValue = exec("./bin/ng-html2js spec/test.tmpl -m foo --module-var ngModule", {silent: true});
      var fileContents = cat("spec/expectedTestTmplJsWithModuleAndModuleVar");
      expect(returnValue.output).toEqual(fileContents);
    });
  });
});
