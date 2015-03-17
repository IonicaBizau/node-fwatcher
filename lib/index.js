var Fs = require("fs")
  , IsThere = require("is-there")
  ;

function FileWatcher(path, callback) {
    var watcher = null
      , newWatcher = false
      , check = function (cb) {
            var inter = setInterval(function() {
                IsThere(path, function (exists) {
                    cb();
                    clearInterval(inter);
                });
            }, 500);
        }
      , handler = function (ev, p) {
            if (newWatcher) { return; }
            if (ev === "rename") {
                newWatcher = true;
                check(function () {
                    watcher.removeListener("change", handler);
                    FileWatcher(path, callback);
                });
            }
            callback(null, ev, p);
        }
      ;

    try {
        watcher = Fs.watch(path, handler);
    } catch (e) {
        callback(e);
    }

    return watcher;
}

module.exports = FileWatcher;
