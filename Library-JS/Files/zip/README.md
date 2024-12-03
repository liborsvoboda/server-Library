ZIP
===
[![Build Status](https://travis-ci.org/kriskowal/zip.svg?branch=master)](https://travis-ci.org/kriskowal/zip)
[![Build status](https://ci.appveyor.com/api/projects/status/l4s4n56skbaj6map/branch/master?svg=true)](https://ci.appveyor.com/project/kriskowal/zip/branch/master)
[![NPM version](https://badge.fury.io/js/zip.svg)](http://badge.fury.io/js/zip)
[![Dependency Status](https://img.shields.io/david/kriskowal/zip.svg)](https://david-dm.org/kriskowal/zip)
[![npm](https://img.shields.io/npm/dm/zip.svg?maxAge=2592000)]()
```js
var ZIP = require('zip');
var data = new Buffer(...);
var reader = ZIP.Reader(data);

reader.toObject(charset_opt);
reader.forEach(function (entry) {});
reader.iterator();

    var ZIP = require("zip");
    var data = new Buffer(...);
    var reader = new ZIP.Reader(data);
    reader.toObject(charset_opt);
    reader.forEach(function (entry) {});
    reader.iterator();
    

```



````    

var ZIP = require("./zip");
var FS = require("fs");
var assert = require("assert");

console.log("-------------------");
console.log("READ from Buffer");

var data = FS.readFileSync("zip.zip")
var reader = ZIP.Reader(data);
var readFromBuffer = reader.toObject('utf-8');
console.log(readFromBuffer);

reader.forEach(function (entry) {
    console.log(entry.getName(), entry.lastModified(), entry.getMode());
});

console.log("-------------------");
console.log("READ from file descriptor");

FS.open("zip.zip", "r", "0666", function(err, fd) {
    var reader = ZIP.Reader(fd);
    var readFromFileDescriptor = reader.toObject('utf-8');
    console.log(readFromFileDescriptor);
    assert.deepEqual(readFromBuffer, readFromFileDescriptor, 'READ from Buffer MUST be equal to READ from file descriptor');
});

````   



