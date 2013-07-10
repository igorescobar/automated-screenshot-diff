// automated-screenshot-diff compare --previous-release v1 --current-release v2 --source screenshots/

var colors    = require('colors'),
    Canvas    = require('canvas'),
    imagediff = require('imagediff'),
    walk      = require('walk'),
    fs        = require('fs'),
    Handlebars = require('handlebars'),
    _         = require('underscore');


function Screenshots() {};

Screenshots.prototype.compare = function (options){
  currentRelease = options.currentRelease,
  previousRelease = options.previousRelease,
  source = options.source;
  ignoreNotChanged = options.ignoreNotChanged || "false";
  outputFormat = options.outputFormat || "";
  
  var 
    walker  = walk.walk('./' + source, { followLinks: true }),
    files = [];

  walker.on('file', function(root, stat, next) {

    if (isValidFile(stat.name) && 
      isReleaseFile(stat.name, previousRelease, currentRelease) && 
      isNotDiffFile(stat.name, previousRelease, currentRelease)) {

      console.log('');

      var 
        fileInfo = getFileInfo(stat.name);
        screenName = fileInfo.name,
        screenNameFile_a = stat.name,
        screenNameFile_b = screenName + currentRelease + fileInfo.extension
        a = getImage(root + screenNameFile_a),
        b = getImage(root + screenNameFile_b),
        diffFileName = screenName + previousRelease +  "-" + currentRelease + "-diff" + fileInfo.extension;
        diffDestination = source + diffFileName;

      console.log ("Analyzing: ".blue + screenNameFile_a.green + " Comparing with: ".yellow + screenNameFile_b.green )

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
    outputFormat = outputFormat.toLowerCase();
    if (outputFormat === "json") {
      saveJSONFile(source + currentRelease + "-" + previousRelease + "-diff.json", files);
    } else if (outputFormat === "html") {
      var htmlData = {
        files: _.filter(files, function(file) {
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
function readFile (file, callback) {
  return fs.readFile(file, "utf-8", function(err, data){
    if (err) {
      console.log(err);
    }
    callback(data); 
  })
};

function writeFile (outputFile, data) {
  fs.writeFile(outputFile, data, function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("File saved to: " + outputFile);
      }
  });
};

function saveJSONFile(outputFile, data) {
  writeFile(outputFile, JSON.stringify(data, null, 4));
};

function saveHTMLFile(outputFile, data) {
  readFile("lib/template.handlebars", function(source){
    var template = Handlebars.compile(source);
    writeFile(outputFile, template(data));
  });
};

function getImage(source_image) {

   var 
      image = new Canvas.Image();
      image.src = source_image;

  return imagediff.toImageData(image);
};

function isValidFile(file) {
  return file.match(/(.+)\.png/);
};

function isReleaseFile(file, pRelease, cRelease) {
  return file.match(new RegExp("(" + pRelease + ")"));
};

function isNotDiffFile(file, pRelease, cRelease){
  return !file.match(new RegExp("(-diff)"));
};

function getFileInfo(file) {
  var matches = file.match(/(.+-)(v.+)(\.\w{3})/);
  return {name: matches[1], version: matches[2], extension: matches[3]};
};

module.exports = Screenshots;