// automated-screenshot-diff compare --previous-release v1 --current-release v2 --source screenshots/
(function () {
  "use strict";
  var colors      = require('colors'),
      Canvas      = require('canvas'),
      imagediff   = require('imagediff'),
      walk        = require('walk'),
      fs          = require('fs'),
      Handlebars  = require('handlebars'),
      _           = require('underscore');


  function Screenshots() {
  };

  Screenshots.test = false;

  Screenshots.prototype.compare = function (options, callback) {

    var
      currentRelease = options.currentRelease || "",
      previousRelease = options.previousRelease || "",
      source = options.source || "",
      ignoreNotChanged = options.ignoreNotChanged || "false",
      outputFormat = options.outputFormat || "html",
      files = [];

    if (currentRelease === "")
      return error("invalid parameter [currentRelease]");
    if (previousRelease === "")
      return error("invalid parameter [previousRelease]");
    if (source === "")
      return error("invalid parameter [source]");

    source = fixSourcePath(source);

    var walker = walk.walk(source, {
      followLinks: true
    });

    walker.on("errors", function (root, nodeStatsArray, next) {
      next();
    });

    walker.on('file', function (root, stat, next) {

      if (isValidFile(stat.name) &&
          isReleaseFile(stat.name, previousRelease, currentRelease) &&
          isNotDiffFile(stat.name, previousRelease, currentRelease)) {

        console.log('');

        var
          fileInfo = getFileInfo(stat.name),
          screenName = fileInfo.name,
          screenNameFile_a = stat.name,
          screenNameFile_b = screenName + currentRelease + fileInfo.extension,
          a = getImage(root + screenNameFile_a),
          b = getImage(root + screenNameFile_b),
          diffFileName = screenName + previousRelease + "-" + currentRelease + "-diff" + fileInfo.extension,
          diffDestination = source + diffFileName;

        console.log("Analyzing: ".blue + screenNameFile_a.green + " Comparing with: ".yellow + screenNameFile_b.green)

        var
          result = imagediff.diff(a, b),
          isEqual = imagediff.equal(a, b, 0),
          messageResult = isEqual ? "no changes detected".green : "changes detected".red;

        console.log("Result: " + messageResult);

        var jsonFile = {
          file_a: screenNameFile_a,
          file_b: screenNameFile_b,
          equal: isEqual,
          diffFile: null,
        };

        if (isEqual === true && ignoreNotChanged === "false")
          next();

        jsonFile.diffFile = diffFileName;
        imagediff.imageDataToPNG(result, diffDestination);
        
        console.log("Comparison saved to: ".blue + diffDestination);

        files.push(jsonFile);
      }

      next();
    });

    walker.on("end", function () {

      if (files.length === 0)
        return error("nothing to do here");

      outputFormat = outputFormat.map(function(item) { return item.toLowerCase() });

      if (_.contains(outputFormat,"json")) {
        saveJSONFile(source + currentRelease + "-" + previousRelease + "-diff.json", files);
      }
      if (_.contains(outputFormat,"html")) {
        var 
          htmlData = {
            files: _.filter(files, function (file) {
              return ignoreNotChanged === "false" || ignoreNotChanged === "true" && file.equal === false
          }),
          currentRelease: currentRelease,
          previousRelease: previousRelease
        };

        saveHTMLFile(source + currentRelease + "-" + previousRelease + "-diff.html", htmlData);
      }
    });
  };

  // private methods

  function sendMessage(msg) {
    if (Screenshots.test === true) {
      return msg
    } else {
      console.log(msg);
    }
  };

  function error(message) {
    return sendMessage(Screenshots.test === true ? message : message.red);
  };

  function readFile(file, callback) {
    fs.readFile(file, {
      encoding: "utf-8",
      flag: 'r'
    }, function (err, data) {
      if (err) console.log(err);
      callback(data);
    });
  };

  function writeFile(outputFile, data, callback) {
    fs.writeFile(outputFile, data, {
      encoding: "utf-8",
      flag: 'w'
    }, function (err) {
      callback(err ? err : "File saved to: " + outputFile);
    });
  };

  function saveJSONFile(outputFile, data) {
    writeFile(outputFile, JSON.stringify(data, null, 4), function (data) {
      console.log(data);
    });
  };

  function saveHTMLFile(outputFile, data) {
    readFile(__dirname + "/template.handlebars", function (source) {
      var template = Handlebars.compile(source);
      writeFile(outputFile, template(data), function (data) {
        console.log(data);
      });
    });
  };

  function getImage(source_image) {

    var
      image = new Canvas.Image();
      image.src = source_image;

    return imagediff.toImageData(image);
  };

  function isValidFile(file) {
    return file.match(/(.+)\.\w{3,4}/);
  };

  function isReleaseFile(file, pRelease, cRelease) {
    return file.match(new RegExp("(" + pRelease + ")"));
  };

  function isNotDiffFile(file, pRelease, cRelease) {
    return !file.match(new RegExp("(-diff)"));
  };

  function getFileInfo(file) {
    var matches = file.match(/(.+-)(.+)(\.\w{3,4})/);
    return {
      name: matches[1],
      version: matches[2],
      extension: matches[3]
    };
  };

  function fixSourcePath(source) {
    return source.replace(/\/$/, '') + "/";
  };

  module.exports = Screenshots;

}());