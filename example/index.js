// Dependencies
var FileWatcher = require("../lib");

// Listen for changes
FileWatcher(__dirname + "/test.txt", function (err, ev) {
    console.log(err || ev);
});
