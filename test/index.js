var FileWatcher = require("../lib");

FileWatcher(__dirname + "/test.txt", function (err, ev) {
    console.log(err || ev);
});
