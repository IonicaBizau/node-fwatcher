import fileWatcher from "../lib/index.js";

// Listen for changes for 5 seconds
const watcher = new fileWatcher(`example/test.txt`, (err, ev, path) => {
    if (err) { return console.error(err, "error"); }
    console.log([ev, path].join(" "));
});
setTimeout(() => watcher.off(), 5000);

// Listen only for one change
new fileWatcher(`example/once.txt`, true, (err, ev, path) => {
    if (err) { return console.error(err, "error"); }
    console.log([ev, path].join(" "));
});
