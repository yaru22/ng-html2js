require('shelljs/global');

describe('ng-html2js', function() {
  it('converts an html file to a javascript object', function() {
    var returnValue = exec("./bin/ng-html2js spec/test.tmpl", {silent: true});
    var fileContents = cat("spec/testOutputs/expectedTestTmplJs");
    expect(returnValue.output).toEqual(fileContents);
  });

  it('can save the output to a file', function() {
    exec("./bin/ng-html2js spec/test.tmpl spec/testOutputFile", {silent: true});
    var testFileContents = cat("spec/testOutputs/expectedTestTmplOutputFileJs");
    var outputFileContents = cat("spec/testOutputFile");
    expect(testFileContents).toEqual(outputFileContents);
  });

  describe('choosing a module name', function() {
    it('can be performed by providing the flag "-m <module-name>"', function() {
      var returnValue = exec("./bin/ng-html2js spec/test.tmpl -m foo", {silent: true});
      var fileContents = cat("spec/testOutputs/expectedTestTmplJsWithModule");
      expect(returnValue.output).toEqual(fileContents);
    });

    it('can be performed by providing the flag "--module <module-name>"', function() {
      var returnValue = exec("./bin/ng-html2js spec/test.tmpl --module foo", {silent: true});
      var fileContents = cat("spec/testOutputs/expectedTestTmplJsWithModule");
      expect(returnValue.output).toEqual(fileContents);
    });
  });

  describe('choosing a module variable', function() {
    it('can be performed by providing the flag "--module-var <module-variable>"', function() {
      var returnValue = exec("./bin/ng-html2js spec/test.tmpl --module-var ngModule", {silent: true});
      var fileContents = cat("spec/testOutputs/expectedTestTmplJsWithModuleVar");
      expect(returnValue.output).toEqual(fileContents);
    });
  });

  describe('choosing a module variable and a module name', function() {
    it('can be performed by providing the -m and --module-var flags', function() {
      var returnValue = exec("./bin/ng-html2js spec/test.tmpl -m foo --module-var ngModule", {silent: true});
      var fileContents = cat("spec/testOutputs/expectedTestTmplJsWithModuleAndModuleVar");
      expect(returnValue.output).toEqual(fileContents);
    });

    it('can be performed by providing the --module and --module-var flags', function() {
      var returnValue = exec("./bin/ng-html2js spec/test.tmpl --module foo --module-var ngModule", {silent: true});
      var fileContents = cat("spec/testOutputs/expectedTestTmplJsWithModuleAndModuleVar");
      expect(returnValue.output).toEqual(fileContents);
    });
  });

  describe('stripping part of the path from the template name using the -b or --basedir flag', function() {
    it('can be performed by providing the flag "-b <subpath>"', function() {
      var returnValue = exec("./bin/ng-html2js `pwd`/spec/test.tmpl -b `pwd`/spec", {silent: true});
      var fileContents = cat("spec/testOutputs/expectedTestTmplJsWithoutBaseDir");
      expect(returnValue.output).toEqual(fileContents);
    });

    it('can be performed by providing the flag "--basedir <subpath>"', function() {
      var returnValue = exec("./bin/ng-html2js `pwd`/spec/test.tmpl --basedir `pwd`/spec", {silent: true});
      var fileContents = cat("spec/testOutputs/expectedTestTmplJsWithoutBaseDir");
      expect(returnValue.output).toEqual(fileContents);
    });

    describe('when a user provides an absolute path to the input file and an absolute subpath to be stripped from the file name', function() {
      describe('when the user excludes the trailing slash from the subpath to be stripped', function() {
        it('strips the provided subpath completely from the file name', function() {
          var returnValue = exec("./bin/ng-html2js `pwd`/spec/test.tmpl -b `pwd`/spec", {silent: true});
          var fileContents = cat("spec/testOutputs/expectedTestTmplJsWithoutBaseDir");
          expect(returnValue.output).toEqual(fileContents);
        });
      });

      describe('when the user includes the trailing slash in the subpath to be stripped', function() {
        it('strips the subpath but leaves the trailing slash in the file name', function() {
          var returnValue = exec("./bin/ng-html2js `pwd`/spec/test.tmpl -b `pwd`/spec/", {silent: true});
          var fileContents = cat("spec/testOutputs/expectedTestTmplJsWithoutBaseDir");
          expect(returnValue.output).toEqual(fileContents);
        });
      });
    });

    describe('when the user provides a relative path to the input file and an absolute subpath to be stripped from the file name', function() {
      it('does not strip anything from the file name', function() {
        var returnValue = exec("./bin/ng-html2js spec/test.tmpl -b `pwd`/spec/", {silent: true});
        var fileContents = cat("spec/testOutputs/expectedTestTmplJs");
        expect(returnValue.output).toEqual(fileContents);
      });
    });

    describe('when the user provides an absolute path to the input file and a relative subpath to be stripped from the file name', function() {
      it('strips the provided relative subpath from the file name but keeps the trailing slash', function() {
        var returnValue = exec("./bin/ng-html2js `pwd`/spec/test.tmpl -b spec/", {silent: true});
        var fileContents = cat("spec/testOutputs/expectedTestTmplJsWithoutBaseDir");
        expect(returnValue.output).toEqual(fileContents);
      });
    });

    describe('when the user provides a relative subpath to the input file and a relative subpath to be stripped from the file name', function() {
      it('does not strip the subpath from the file name', function() {
        var returnValue = exec("./bin/ng-html2js spec/test.tmpl -b spec/", {silent: true});
        var fileContents = cat("spec/testOutputs/expectedTestTmplJs");
        expect(returnValue.output).toEqual(fileContents);
      });
    });
  });

  describe('stripping an arbitrary subpath from the name of the template file', function() {
    it('can be performed by providing the flag "-s <prefix>"', function() {
      var returnValue = exec("./bin/ng-html2js spec/test.tmpl -s spec/", {silent: true});
      var fileContents = cat("spec/testOutputs/expectedTestTmplJsStrippedPrefix");
      expect(returnValue.output).toEqual(fileContents);
    });

    it('can be performed by providing the flag "--strip-prefix <prefix>"', function() {
      var returnValue = exec("./bin/ng-html2js spec/test.tmpl -s spec/", {silent: true});
      var fileContents = cat("spec/testOutputs/expectedTestTmplJsStrippedPrefix");
      expect(returnValue.output).toEqual(fileContents);
    });

    describe('when the arbitrary prefix to strip does not match characters starting from the beginning of the input file name', function() {
      it('does not strip the prefix', function() {
        var returnValue = exec("./bin/ng-html2js spec/test.tmpl -s pec/", {silent: true});
        var fileContents = cat("spec/testOutputs/expectedTestTmplJs");
        expect(returnValue.output).toEqual(fileContents);
      });
    });

    describe('when the prefix does not match at all', function() {
      it('does not strip the prefix', function() {
        var returnValue = exec("./bin/ng-html2js spec/test.tmpl -s bananagrams", {silent: true});
        var fileContents = cat("spec/testOutputs/expectedTestTmplJs");
        expect(returnValue.output).toEqual(fileContents);
      });
    });

    describe('when the prefix to strip is a complete match of the input file name', function() {
      it('does not strip the prefix', function() {
        var returnValue = exec("./bin/ng-html2js spec/test.tmpl -s spec/test.tmpl", {silent: true});
        var fileContents = cat("spec/testOutputs/expectedTestTmplJs");
        expect(returnValue.output).toEqual(fileContents);
      });
    });
  });
});
