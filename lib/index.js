// Dependencies
const fs = require("fs")
    , isThere = require("is-there")
    , abs = require("abs")
    , ul = require("ul")

class Watcher {
    /**
     * Watcher
     * Creates a new instance of the internal `Watcher`.
     *
     * @name Watcher
     * @function
     * @param {String} path The path to the file.
     * @param {Function} handler A function called when the file changes.
     */
    constructor (path, handler) {
        this._ = fs.watch(path, handler)
        this.a_path = abs(path)
        this.handler = handler
    }

    /**
     * off
     * Removes the listener.
     *
     * @name off
     * @function
     */
    off () {
        this._.removeListener("change", this.handler)
    }
}

class FileWatcher {

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
    constructor (path, options, callback) {

        if (typeof options === "function") { callback = options }
        if (typeof options === "boolean") { options = { once: options } }
        options = ul.merge(options, { once: false })

        let watcher = null
        let newWatcher = false

        const check = function (cb) {
            const tries = 5
            const inter = setInterval(() => {
                isThere(path, function (exists) {
                    if (!--tries || exists) {
                        clearInterval(inter)
                    }

                    if (exists) {
                        cb()
                    }
                })
            }, 500)
        }

        const handler = function (ev) {

            if (options.once) {
                watcher.off()
            }

            if (newWatcher) { return }

            // Check the rename
            if (ev === "rename" && !options.once) {
                newWatcher = true
                check(function () {
                    watcher.off()
                    watcher._ = new FileWatcher(path, options, callback)._
                })
            }

            callback.call(watcher, null, ev, watcher.a_path)
        }


        try {
            watcher = new Watcher(path, handler)
        } catch (e) {
            callback(e)
        }

        return watcher
    }
}

module.exports = FileWatcher
