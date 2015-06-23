// Dependencies
var Fs = require("fs")
  , IsThere = require("is-there")
  , Path = require("path")
  , Ul = require("ul")
  ;

function Watcher(path, handler, options) {
    this._ = Fs.watch(path, handler);
    // TODO abs
    this.a_path = Path.resolve(Path);
}

Watcher.prototype.off = function () {
    this._.removeListener("change", handler);
};

/**
 * FileWatcher
 * Creates a new file watcher.
 *
 * @name FileWatcher
 * @function
 * @param {String} path The path to the file.
 * @param {Boolean|Options} options A boolean value representing the `once`
 * value or an object containing the following fields:
 *
 *  - `once` (Boolean): If `true`, the handler is deleted after first event.
 *
 * @param {Function} callback This function will be called when the file is
 * changed or renamed. The first parameter is the error, the second one is
 * the evenit name and the third one is the file path.
 * @return {Watcher} The watcher instance.
 */
function FileWatcher(path, options, callback) {
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
      , handler = function (ev) {

            if (options.once) {
                watcher._.removeListener("change", handler);
            }

            if (newWatcher) { return; }

            // Check the rename
            if (ev === "rename" && !options.once) {
                newWatcher = true;
                check(function () {
                    watcher.removeListener("change", handler);
                    newWatcher = FileWatcher(path, options, callback)
                    watcher._ = newWatcher._;
                    watcher.a_path = newWatcher.a_path;
                });
            }

            callback.call(watcher, null, ev, watcher.a_path);
        }
      ;

    try {
        watcher = new Watcher(path, options);
        watcher.change(handler);
    } catch (e) {
        callback(e);
    }

    return watcher;
}

module.exports = FileWatcher;
