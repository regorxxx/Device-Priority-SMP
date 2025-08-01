﻿'use strict';
//01/07/25

include(fb.ComponentPath + 'docs\\Codepages.js');
/* global convertCharsetToCodepage:readable */

// Console log file
// Edit here to change logging file. Replace with '' or null to disable logging
Object.defineProperty(console, 'File', { enumerable: false, configurable: false, writable: true, value: fb.ProfilePath + 'console.log' });
// File size, in bytes. Setting to zero or null disables logging too
Object.defineProperty(console, 'MaxSize', { enumerable: false, configurable: false, writable: true, value: 5000000 });
// Interval to flush to console, in ms. Setting to zero or null writes to console file on every call (not recommended)
Object.defineProperty(console, 'Throttling', { enumerable: false, configurable: false, writable: true, value: 100 });
// Interval use
Object.defineProperty(console, 'Timer', { enumerable: false, configurable: false, writable: true });
Object.defineProperty(console, 'Cache', { enumerable: false, configurable: false, writable: true, value: [] });
// Global switch
Object.defineProperty(console, 'Enabled', { enumerable: false, configurable: false, writable: true, value: true });
Object.defineProperty(console, 'EnabledFile', { enumerable: false, configurable: false, writable: true, value: true });

/* global fso:readable */
const fsoCL = typeof fso !== 'undefined' ? fso : new ActiveXObject('Scripting.FileSystemObject'); // Reuse fso if possible

// Override logging
function consoleLog() {
	const bCache = console.Cache.length !== 0;
	const today = new Date().toLocaleDateString();
	let log = '';
	let lastMod = null;
	// Load previous log
	console.checkSize();
	if (utils.IsFile(console.File)) {
		try { log += utils.ReadTextFile(console.File, convertCharsetToCodepage('UTF-8')); } catch (e) {/* continue regardless of error */ } // eslint-disable-line no-unused-vars
		lastMod = new Date(fsoCL.GetFile(console.File).DateLastModified).toLocaleDateString();
	}
	// Add dd/mm/yyyy
	if (lastMod !== today) {
		log += (log && log.length ? '\r\n' : '') + '--------->' + today + '<---------';
	}
	// Add HH:MM:SS
	const stamp = bCache ? '' : '[' + new Date().toLocaleTimeString() + ']';
	log += (log && log.length ? '\r\n' : '') + (bCache ? '' : stamp);
	// Unpack args
	const args = bCache ? console.Cache : [[...arguments]];
	if (bCache) { console.Cache = []; }
	args.forEach((call, j) => {
		if (bCache && j !== 0) { log += '\r\n'; }
		call.forEach((arg, i) => {
			const val = console.formatArg(arg);
			log += (bCache && i === 0 ? '' : ' ') + val;
		});
	});
	// Write
	try { utils.WriteTextFile(console.File, log, false); } catch (e) {/* continue regardless of error */ } // eslint-disable-line no-unused-vars
}

console.formatArg = (arg) => {
	const type = typeof arg;
	let val = null;
	switch (type) {
		case 'undefined': {
			val = void (0);
			break;
		}
		case 'function':
		case 'number':
		case 'boolean':
		case 'string': {
			val = arg.toString();
			break;
		}
		case 'object':
		default: {
			if (arg !== null) {
				let instance = null;
				switch (true) {	// Get object types
					case Array.isArray(arg): { instance = { name: 'Array', type: 'array' }; break; }
					case arg instanceof Set: { instance = { name: 'Set', type: 'array' }; break; }
					case arg instanceof Map: { instance = { name: 'Map', type: 'array' }; break; }
					case arg instanceof WeakMap: { instance = { name: 'WeakMap', type: 'array' }; break; }
					case arg instanceof WeakSet: { instance = { name: 'WeakSet', type: 'array' }; break; }
					case arg instanceof Error: { instance = { name: 'Error', type: 'error' }; break; }
					case Object.prototype.toString.call(arg) === '[object Promise]': { instance = { name: 'Promise', type: 'promise' }; break; }
					case arg.constructor.name === 'ReverseIterableMap': { instance = { name: 'Reverse Iterable Map', type: 'array' }; break; }
				}
				if (instance) {  // Convert to array objects if possible and stringify
					switch (instance.type) {
						case 'array': { val = [...arg]; break; }
						case 'error': { val = arg.toString(); break; }
					}
				}
				try {
					val = (instance ? instance.name + ' ' : 'Object ') + JSON.stringify(val || arg, (k, v) => {
						if (typeof v !== 'undefined' && v !== null) {
							if (v.RawPath && v.Path) {
								return 'FbMetadbHandle ' + JSON.stringify({ FileSize: v.FileSize, Length: v.Length, Path: v.Path, RawPath: v.RawPath, SubSong: v.SubSong }, null, ' ').replace(/{\n /, '{').replace(/["\n]/g, '').replace(/\\\\/g, '\\');
							}
							else if (v instanceof FbMetadbHandleList) {
								return 'FbMetadbHandleList ' + JSON.stringify({ Count: v.Count }, null, ' ').replace(/{\n /, '{').replace(/["\n]/g, '');
							}
							else if (v instanceof Set) {
								return 'Set ' + JSON.stringify([...v]).replace(/["\n]/g, '');
							}
							else if (v instanceof Map) {
								return 'Map ' + JSON.stringify([...v]).replace(/["\n]/g, '');
							}
							else if (v instanceof WeakMap) {
								return 'WeakMap ' + JSON.stringify([...v]).replace(/["\n]/g, '');
							}
							else if (v instanceof WeakSet) {
								return 'WeakMap ' + JSON.stringify([...v]).replace(/["\n]/g, '');
							}
							else if (v instanceof Error) {
								return 'Error ' + arg.toString().replace(/["\n]/g, '');
							} else if (typeof v === 'function') {
								return 'Function ' + v.name || 'anonymous';
							} else if (v === Infinity) {
								return 'INFINITY';
							} else if (v === -Infinity) {
								return '-INFINITY';
							}
						}
						return v;
					}).replace(/"(-)?INFINITY"/g, '$1\u221E');
				} catch (e) {
					if (e.message === 'can\'t access dead object') {
						console.logUI('Console.log: ' + e.message + ': ', type);
					} else {
						// eslint-disable-next-line no-sparse-arrays
						try { val = arg.constructor.name || (arg.constructor.toString().match(/function (\w*)/) || [,])[1]; }
						// eslint-disable-next-line no-unused-vars
						catch (e) { /* empty */ } //NOSONAR
						if (!val) { val = '--unknown type--'; }
						console.logUI('Console.log: argument type not recognized: ', type, val);
					}
				}
			}
			break;
		}
	}
	return val;
};

// Check file size doesn't exceed threshold or reset it
console.checkSize = () => {
	if (utils.IsFile(console.File) && utils.GetFileSize(console.File) > console.MaxSize) {
		try { utils.WriteTextFile(console.File, '', false); } catch (e) {/* continue regardless of error */ } // eslint-disable-line no-unused-vars
		console.log('helpers_xxx: console log file size exceeds ' + (console.MaxSize / 1e7) + ' MB, creating new file: ' + console.File);
		return true;
	}
	return false;
};

// Force writing cache to file (usually used at on_script_unload)
console.flush = () => {
	if (console.Cache.length) { consoleLog(); }
};

// Send to popup and console
console.popup = (arg, popupName, bPopup = true, bSplit = true) => {
	if (bPopup) { fb.ShowPopupMessage(arg, popupName); }
	if (typeof arg === 'string' && bSplit) {
		arg.split(/\r\n|\n\r|\n|\r/).forEach((line) => {
			if (line && line.length) { console.log(line); }
		});
	} else {
		console.log(arg); // as is
	}
};

if (console.File && console.File.length && console.MaxSize && console.log) {
	const oldLog = console.log;
	console.logUI = function () {
		const args = Array.from(arguments, (arg) => console.formatArg(arg));
		oldLog(...args);
	};
	console.log = function () {
		if (!console.Enabled) { return; }
		console.logUI(...arguments);
		if (!console.EnabledFile) { return; }
		if (console.Throttling) {
			clearTimeout(console.Timer);
			// Add HH:MM:SS
			const stamp = '[' + new Date().toLocaleTimeString() + ']';
			console.Cache.push([stamp, ...arguments]);
			console.Timer = setTimeout(consoleLog, console.Throttling);
		} else {
			consoleLog(...arguments);
		}
	};
	console.checkSize();
}

console.enable = () => { console.Enabled = true; };
console.disable = () => { console.flush(); console.Enabled = false; };
console.enableFile = () => { console.EnabledFile = true; };
console.disableFile = () => { console.EnabledFile = false; };

// Rewrap FbProfiler to expose Name variable
if (FbProfiler.prototype) {
	const oldProto = FbProfiler.prototype;
	const oldFunc = FbProfiler;
	FbProfiler = function (name) { // NOSONAR
		const obj = oldFunc(name);
		obj.Name = name;
		return obj;
	};
	FbProfiler.prototype = oldProto;
}

// Rewrap FbProfiler to also log to file
if (FbProfiler.prototype.Print) {
	FbProfiler.prototype.PrintUI = FbProfiler.prototype.Print;
	FbProfiler.prototype.Print = function (additionalMsgopt = '', printComponentInfoopt = true) {
		// Recreate the message format
		let message = '';
		if (printComponentInfoopt) { message += 'Spider Monkey Panel v' + utils.Version + ': '; }
		message += 'profiler (' + this.Name + '): ';
		if (additionalMsgopt && additionalMsgopt.length) { message += additionalMsgopt + ' '; }
		message += this.Time + 'ms';
		console.log(message); // Instead of using the original method, just use the basic log routine with debounce
		// this.PrintUI(additionalMsgopt, printComponentInfoopt);
		// consoleLog(message);
	};
	console.checkSize();
}