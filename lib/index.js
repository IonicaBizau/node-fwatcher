// Dependencies
var Fs = require("fs")
  , IsThere = require("is-there")
  ;

/**
 * FileWatcher
 * Creates a new file watcher.
 *
 * @name FileWatcher
 * @function
 * @param {String} path The path to the file.
 * @param {Function} callback This function will be called when the file is
 * changed or renamed. The first parameter is the error, the second one is
 * the evenit name and the third one is the file path.
 * @return {Watcher} The watcher instance.
 */
function FileWatcher(path, callback) {
    var watcher = null
      , newWatcher = false
      , check = function (cb) {
            var inter = setInterval(function() {
                    IsThere(path, function (exists) {
                        if (!--tries || exists) {
                            clearInterval(inter);
                        }

                        if (exists) {
                            cb();
                        }
                    });
                }, 500)
              , tries = 5
              ;
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
