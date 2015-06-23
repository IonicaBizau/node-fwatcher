// Dependencies
var FileWatcher = require("../lib")
  , Logger = require("bug-killer")
  ;

// Listen for changes
FileWatcher(__dirname + "/test.txt", function (err, ev, path) {
    if (err) { return Logger.log(err, "error"); }
    Logger.log([ev, path].join(" "));
});
