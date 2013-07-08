// screenshot-diff compare --previous-release v1 --current-release v2 --source screenshots/

var colors    = require('colors'),
    Canvas    = require('canvas'),
    imagediff = require('imagediff'),
    walk      = require('walk');


function Screenshots() {};

Screenshots.prototype.compare = function (options){
  currentRelease = options.currentRelease,
  previousRelease = options.previousRelease,
  source = options.source;
  ignoreNotChanged = options.ignoreNotChanged || "false";
  
  var 
    walker  = walk.walk('./' + source, { followLinks: true }),
    imagefile;

  walker.on('file', function(root, stat, next) {

    if (isValidFile(stat.name) && 
      isReleaseFile(stat.name, previousRelease, currentRelease) && 
      isNotDiffFile(stat.name, previousRelease, currentRelease)) {

      console.log('');

      var 
        fileInfo = getFileInfo(stat.name);
        screenName = fileInfo.name,
        screenNameFile_a = stat.name,
        screenNameFile_b = screenName + currentRelease + fileInfo.extension;

      var
        a = getImage(root + screenNameFile_a),
        b = getImage(root + screenNameFile_b),
        diffDestination = source + screenName + previousRelease +  "-" + currentRelease + "-diff" + fileInfo.extension;

      console.log ("Analyzing: ".blue + screenNameFile_a.green + " Comparing with: ".yellow + screenNameFile_b.green )

      var 
        result = imagediff.diff(a, b, 0),
        isEqual = imagediff.equal(a, b, 0),
        messageResult = isEqual ? "no changes detected".green : "changes detected".red;
      
        console.log("Result: " + messageResult);


      if (isEqual == true && ignoreNotChanged === "false")
        next();

      
        imagediff.imageDataToPNG(result, diffDestination);
        console.log("Comparison saved to: ".blue + diffDestination);
    }
      
      next();
  });
};

// private methods

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