
[![fwatcher](http://i.imgur.com/vy4T9a6.png)](#)

# fwatcher [![PayPal](https://img.shields.io/badge/%24-paypal-f39c12.svg)][paypal-donations] [![Version](https://img.shields.io/npm/v/fwatcher.svg)](https://www.npmjs.com/package/fwatcher) [![Downloads](https://img.shields.io/npm/dt/fwatcher.svg)](https://www.npmjs.com/package/fwatcher) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/johnnyb?utm_source=github&utm_medium=button&utm_term=johnnyb&utm_campaign=github)

> Watch files for changes.

## :cloud: Installation

```sh
$ npm i --save fwatcher
```


## :clipboard: Example



```js
// Dependencies
var FileWatcher = require("fwatcher")
  , Logger = require("bug-killer")
  ;

// Listen for changes for 5 seconds
var watcher = FileWatcher(__dirname + "/test.txt", function (err, ev, path) {
    if (err) { return Logger.log(err, "error"); }
    Logger.log([ev, path].join(" "));
});
setTimeout(watcher.off.bind(watcher), 5000);


// Listen only for one change
FileWatcher(__dirname + "/once.txt", true, function (err, ev, path) {
    if (err) { return Logger.log(err, "error"); }
    Logger.log([ev, path].join(" "));
});
```

## :memo: Documentation


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



## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## :dizzy: Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:


 - [`ape-watching`](https://github.com/ape-repo/ape-watching#readme) (by Taka Okunishi)—ape framework module for watching files.
 - [`element-status`](https://github.com/callahanrts/element#readme) (by CallahanRTS)—An electron based status bar
 - [`web-term`](https://github.com/IonicaBizau/web-term)—A full screen terminal in your browser.

## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2015#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
