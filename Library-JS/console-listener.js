(function (w) {
	"use strict";

	var A, F, O, consoleMethods, fixConsoleMethod, consoleOn,
		allHandlers, methodObj;

	A = [];
	F = function () { return; };
	O = {};

	// All possible standard methods to provide an interface for
	consoleMethods = [
		"assert", "clear", "count", "debug",
		"dir", "dirxml", "error", "exception",
		"group", "groupCollapsed", "groupEnd",
		"info", "log", "profile", "profileEnd",
		"table", "time", "timeEnd", "timeStamp",
		"trace", "warn"
	];

	// Holds handlers to be executed for every method
	allHandlers = [];

	// Holds handlers per method
	methodObj = {};

	// Overrides the existing console methods, to call any stored handlers first
	fixConsoleMethod = (function () {
		var func, empty;

		empty = function () {
			return F;
		};

		if (w.console) {
			// If `console` is even available
			func = function (methodName) {
				var old;
				if (methodName in console && (old = console[methodName])) {
					// Checks to see if `methodName` is defined on `console` and has valid function to execute
					// (and stores the old handler)
					// This is important so that undefined methods aren't filled in
					console[methodName] = function () {
						// Overwrites current console method with this function
						var args, argsForAll, i, j;
						// Copy all arguments passed to handler
						args = A.slice.call(arguments, 0);
						for (i = 0, j = methodObj[methodName].handlers.length; i < j; i++) {
							// Loop over all stored handlers for this specific method and call them
							F.apply.call(methodObj[methodName].handlers[i], console, args);
						}
						for (i = 0, j = allHandlers.length; i < j; i++) {
							// Loop over all stored handlers for ALL events and call them
							argsForAll = [methodName];
							A.push.apply(argsForAll, args);
							F.apply.call(allHandlers[i], console, argsForAll);
						}
						// Calls old
						F.apply.call(old, console, args);
					};
				}
				return console[methodName] || empty;
			};
		} else {
			func = empty;
		}

		return func;
	}());

	// Loop through all standard console methods and add a wrapper function that calls stored handlers
	(function () {
		var i, j, cur;
		for (i = 0, j = consoleMethods.length; i < j; i++) {
			// Loop through all valid console methods
			cur = consoleMethods[i];
			methodObj[cur] = {
				handlers: []
			};
			fixConsoleMethod(cur);
		}
	}());

	// Main handler exposed
	consoleOn = function (methodName, callback) {
		var key, cur;
		if (O.toString.call(methodName) === "[object Object]") {
			// Object literal provided as first argument
			for (key in methodName) {
				// Loop through all keys in object literal
				cur = methodName[key];
				if (key === "all") {
					// If targeting all events
					allHandlers.push(cur);
				} else if (key in methodObj) {
					// If targeting specific valid event
					methodObj[key].handlers.push(cur);
				}
			}
		} else if (typeof methodName === "function") {
			// Function provided as first argument
			allHandlers.push(methodName);
		} else if (methodName in methodObj) {
			// Valid String event provided
			methodObj[methodName].handlers.push(callback);
		}
	};

	// Actually expose an interface
	w.ConsoleListener = {
		on: consoleOn
	};
}(this));


class ConsoleRecorder {
    constructor() {
        this.createDisplayElement();
        this.overwriteConsoleMethod();
    }

    createDisplayElement() {
        this.displayElement = document.createElement('div');
        this.displayElement.id = 'console-recorder-display';
        this.displayElement.style = "console-recorder-display";
        document.body.appendChild(this.displayElement);
    }

    overwriteConsoleMethod() {
        const originalConsoleLog = console.log;
        const originalConsoleError = console.error;
        const originalConsoleWarn = console.warn;
        const originalConsoleInfo = console.info;
        const originalConsoleDebug = console.debug;

        console.log = (message) => {
            originalConsoleLog(message);
            this.displayInUI('log', message);
        };

        console.error = (message) => {
            originalConsoleError(message);
            this.displayInUI('error', message);
        };

        console.warn = (message) => {
            originalConsoleWarn(message);
            this.displayInUI('warn', message);
        };

        console.info = (message) => {
            originalConsoleInfo(message);
            this.displayInUI('info', message);
        };

        console.debug = (message) => {
            originalConsoleDebug(message);
            this.displayInUI('debug', message);
        };
    }

    displayInUI(type, message) {
        let newElement = document.createElement('div');
        newElement.className = `console-recorder-card ${type}`;
        newElement.textContent = `[${type}] ${message}`;
        this.displayElement.appendChild(newElement);
    }
}

