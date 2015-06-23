// Dependencies
var FileWatcher = require("../lib")
  , Logger = require("bug-killer")
  ;

// Listen for changes for 5 seconds
var watcher = FileWatcher(__dirname + "/test.txt", function (err, ev, path) {
    if (err) { return Logger.log(err, "error"); }
    Logger.log([ev, path].join(" "));
});
setTimeout(watcher.off.bind(watcher), 5000);


// Listen only for one change
FileWatcher(__dirname + "/once.txt", true, function (err, ev, path) {
    if (err) { return Logger.log(err, "error"); }
    Logger.log([ev, path].join(" "));
});
