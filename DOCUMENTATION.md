## Documentation

You can see below the API reference of this module.

### `Watcher(path, handler)`
Creates a new instance of the internal `Watcher`.

#### Params

- **String** `path`: The path to the file.
- **Function** `handler`: A function called when the file changes.

### `off()`
Removes the listener.

### `FileWatcher(path, options, callback)`
Creates a new file watcher.

#### Params

- **String** `path`: The path to the file.
- **Boolean|Options** `options`: A boolean value representing the `once` value or an object containing the following fields:

 - `once` (Boolean): If `true`, the handler is deleted after first event.
- **Function** `callback`: This function will be called when the file is changed or renamed. The first parameter is the error, the second one is
the evenit name and the third one is the file path.

#### Return
- **Watcher** The watcher instance.

