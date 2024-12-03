# JavaScript Sandbox Console

 Create the sandbox:
window.sandbox = new Sandbox.View({
	// these two are required:
	model : new Sandbox.Model(), // see below for more
	el : $('#sandbox'), // or etc.
	
	// these are optional (defaults are given here):
	resultPrefix : "  => ",
	helpText : "type javascript commands into the console, hit enter to evaluate. \n[up/down] to scroll through history, ':clear' to reset it. \n[alt + return/up/down] for returns and multi-line editing.",
	tabCharacter : "\t",
	placeholder : "// type some javascript and hit enter (:help for info)"
});
Sandboxed iFrame Mode
By default, the sandbox evaluates commands in the global (top-level/window) scope. To prevent users from playing with the active document (or to create a totally clean execution context to play in) you can switch on the iframe mode on the Sandbox.Model. This creates an invisible <iframe> element and evaluates all commands inside its context.

This means that visitors won't have access to globals from the page you're running (including any libraries or scripts you've included). Use sandbox.model.load() to inject js files into the <iframe> window, making them available in the sandbox.

This is the recommended way to integrate the sandbox.

// Create the sandbox, with `iframe` mode on:
window.sandbox = new Sandbox.View({
	model : new Sandbox.Model({ iframe : true }),
	el : $('#sandbox')
});

// Pre-load your libraries for the iframe:
sandbox.model.load('http://code.jquery.com/jquery-1.6.4.js');
sandbox.model.load('my/cool/library.js');

// You can also evaluate code inside the iframe after it loads:
sandbox.model.iframeEval("var globalJoss = 'im global, bro'"); // globalJoss is now available in the iframe


![js sandbox console screenshot](https://raw.githubusercontent.com/openexchangerates/javascript-sandbox-console/master/demo-resources/img/js-sandbox-console.png)

a javascript playground to enhance demos and homepages for javascript libraries, plugins and scripts, giving visitors an easy and chilled-out way to test-drive functionality.

see the **[project homepage](http://openexchangerates.github.io/javascript-sandbox-console/)** for a live demo, features, installation guide and more info.

maintained by [Open Exchange Rates](https://openexchangerates.org) (see it in action on the **[money.js](http://openexchangerates.github.com/money.js)** homepage).


## Changelog

**0.2**
* Now maintained by Open Exchange Rates
* Improved documentation

**0.1.5**
* Added `setValue` method, to programmatically set the value inside the sandbox

**0.1.4**
* Added an `iframe` setting on the Sandbox Model that creates a hidden `iframe` and evaluates all commands inside its 'sandboxed' scope -  effectively blocking access to global variables.
* Added a script loader method `sandbox.model.load` to inject a script into the page (or the `iframe`).
* Added `:load` special command, available from the sandbox command line, to bootstrap any script into the global context (most useful in `iframe` mode. E.g.: `:load http://code.jquery.com/jquery-1.6.4.js`

**0.1.3**
* Added very basic stringification for objects. If `JSON.stringify(obj)` works, it prints the result, otherwise it's `obj.toString()`

**0.1.2**
* Mirrored gh-pages and master branches

**0.1.1**
* Added view.toEscaped() method to escape HTML strings for safe output templating

**0.1**
* First release
