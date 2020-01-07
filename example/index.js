// Dependencies
const FileWatcher = require("../lib")
    , Logger = require("bug-killer")


// Listen for changes for 5 seconds
const watcher = new FileWatcher(`${__dirname}/test.txt`, (err, ev, path) => {
    if (err) { return Logger.log(err, "error") }
    Logger.log([ev, path].join(" "))
})
setTimeout(watcher.off.bind(watcher), 5000)


// Listen only for one change
new FileWatcher(`${__dirname}/once.txt`, true, (err, ev, path) => {
    if (err) { return Logger.log(err, "error") }
    Logger.log([ev, path].join(" "))
})
