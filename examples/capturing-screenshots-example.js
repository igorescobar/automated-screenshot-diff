// casperjs capturing-screenshots-example.js --release=v2 --screenshots-folder=screenshots/

var casper = require('casper').create({
  verbose: true, logLevel: "debug"
});

var release = casper.cli.get("release"),
    screenshotsFolder = casper.cli.get("screenshots-folder");

require("utils").dump(casper.cli.options);
// test steps
casper.start('http://localhost:9001/').viewport(1024, 768).waitForText("Crie sua conta", function() {
  this.captureSelector(screenshotsFolder + 'login_box-'+ release + '.png', '.abril-id-topo-container');
});

casper.thenClick("button[data-abrilid-type=criar]").waitForSelector(".abril-id-modal-container", function(){
  this.captureSelector(screenshotsFolder + 'login_widget-'+ release + '.png', ".abril-id-modal-container");
});


casper.run();