![File Watcher](http://i.imgur.com/dOCnOFb.png)

# File Watcher
Watch files for changes. This works fine when working in [VIM](http://www.vim.org/),
since VIM renames the files when saving them.

## Installation

```sh
$ npm install fwatcher
```

## Example

```js
// Dependencies
var FileWatcher = require("fwatcher");

// Listen for changes
FileWatcher(__dirname + "/test.txt", function (err, ev, path) {
    /* do something */
});
```

## Documentation
### `FileWatcher(path, callback)`
Creates a new file watcher.

#### Params
- **String** `path`: The path to the file.
- **Function** `callback`: This function will be called when the file is changed or renamed. The first parameter is the error, the second one is
the evenit name and the third one is the file path.

#### Return
- **Watcher** The watcher instance.

## How to contribute
1. File an issue in the repository, using the bug tracker, describing the
   contribution you'd like to make. This will help us to get you started on the
   right foot.
2. Fork the project in your account and create a new branch:
   `your-great-feature`.
3. Commit your changes in that branch.
4. Open a pull request, and reference the initial issue in the pull request
   message.

## License
See the [LICENSE](./LICENSE) file.
