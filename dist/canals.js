module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	// Much of this code is cribbed directly from Backbone.Router's source:
	// http://backbonejs.org/

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var optionalParam = /\((.*?)\)/g;
	var namedParam = /(\(\?)?:\w+/g;
	var splatParam = /\*\w+/g;
	var escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;

	var routeToRegex = function routeToRegex(route) {
	    route = route.replace(escapeRegExp, '\\$&').replace(optionalParam, '(?:$1)?').replace(namedParam, function (match, optional) {
	        return optional ? match : '([^/?]+)';
	    }).replace(splatParam, '([^?]*?)');
	    return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
	};

	// Original from:
	// http://stackoverflow.com/questions/901115/get-querystring-values-in-javascript/2880929#2880929
	var parseQueryString = function parseQueryString(query) {
	    var urlParams = {},
	        e,
	        a = /\+/g,
	        // Regex for replacing addition symbol with a space
	    r = /([^&=]+)=?([^&]*)/g,
	        d = function d(s) {
	        return decodeURIComponent(s.replace(a, " "));
	    };

	    while (e = r.exec(query)) {
	        urlParams[d(e[1])] = d(e[2]);
	    }

	    return urlParams;
	};

	var extractParameters = function extractParameters(routeRegex, fragment) {
	    var params = routeRegex.exec(fragment).slice(1);
	    var ret = {
	        args: [],
	        query: {}
	    };

	    params.map(function (param, i) {
	        if (i === params.length - 1) {
	            // Last match group in the regex is the part after the ?
	            if (param) {
	                ret.query = parseQueryString(param);
	            }
	        } else {
	            ret.args.push(param ? decodeURIComponent(param) : null);
	        }
	    });

	    return ret;
	};

	var Canals = {
	    compile: function compile(routeMap) {
	        var routeList = Object.keys(routeMap).map(function (key) {
	            return [routeToRegex(key), routeMap[key]];
	        });

	        return function (urlFragment) {
	            for (var i = 0, ii = routeList.length; i < ii; i++) {
	                var route = routeList[i];
	                if (route[0].test(urlFragment)) {
	                    return _extends({}, extractParameters(route[0], urlFragment), {
	                        value: route[1]
	                    });
	                }
	            };
	            return null;
	        };
	    }
	};

	exports['default'] = Canals;
	module.exports = exports['default'];

/***/ }
/******/ ]);