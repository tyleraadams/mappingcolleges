/*!
 * jQuery JavaScript Library v2.1.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:01Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// We once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android<4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android<4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Support: Firefox, Chrome, Safari
// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optimization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
		"position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";
		div.innerHTML = "";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Support: node.js jsdom
	// Don't assume that getComputedStyle is a property of the global object
	if ( window.getComputedStyle ) {
		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*.
					// Use string for doubling so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur(),
				// break the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// Ensure the complete handler is called before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// Toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// Handle most common string cases
					ret.replace(rreturn, "") :
					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = window.location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// Support: BlackBerry 5, iOS 3 (original iPhone)
		// If we don't have gBCR, just use 0,0 rather than error
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Support: Safari<7+, Chrome<37+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

/**
 * jVectorMap version 2.0.4
 *
 * Copyright 2011-2014, Kirill Lebedev
 *
 */

(function( $ ){
  var apiParams = {
        set: {
          colors: 1,
          values: 1,
          backgroundColor: 1,
          scaleColors: 1,
          normalizeFunction: 1,
          focus: 1
        },
        get: {
          selectedRegions: 1,
          selectedMarkers: 1,
          mapObject: 1,
          regionName: 1
        }
      };

  $.fn.vectorMap = function(options) {
    var map,
        methodName,
        map = this.children('.jvectormap-container').data('mapObject');

    if (options === 'addMap') {
      jvm.Map.maps[arguments[1]] = arguments[2];
    } else if ((options === 'set' || options === 'get') && apiParams[options][arguments[1]]) {
      methodName = arguments[1].charAt(0).toUpperCase()+arguments[1].substr(1);
      return map[options+methodName].apply(map, Array.prototype.slice.call(arguments, 2));
    } else {
      options = options || {};
      options.container = this;
      map = new jvm.Map(options);
    }

    return this;
  };
})( jQuery );
/*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 3.1.9
 *
 * Requires: jQuery 1.2.2+
 */

(function (factory) {
    if ( typeof define === 'function' && define.amd ) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var toFix  = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
        toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ?
                    ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
        slice  = Array.prototype.slice,
        nullLowestDeltaTimeout, lowestDelta;

    if ( $.event.fixHooks ) {
        for ( var i = toFix.length; i; ) {
            $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
        }
    }

    var special = $.event.special.mousewheel = {
        version: '3.1.9',

        setup: function() {
            if ( this.addEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.addEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = handler;
            }
            // Store the line height and page height for this particular element
            $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
            $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
        },

        teardown: function() {
            if ( this.removeEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.removeEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = null;
            }
        },

        getLineHeight: function(elem) {
            return parseInt($(elem)['offsetParent' in $.fn ? 'offsetParent' : 'parent']().css('fontSize'), 10);
        },

        getPageHeight: function(elem) {
            return $(elem).height();
        },

        settings: {
            adjustOldDeltas: true
        }
    };

    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
        },

        unmousewheel: function(fn) {
            return this.unbind('mousewheel', fn);
        }
    });


    function handler(event) {
        var orgEvent   = event || window.event,
            args       = slice.call(arguments, 1),
            delta      = 0,
            deltaX     = 0,
            deltaY     = 0,
            absDelta   = 0;
        event = $.event.fix(orgEvent);
        event.type = 'mousewheel';

        // Old school scrollwheel delta
        if ( 'detail'      in orgEvent ) { deltaY = orgEvent.detail * -1;      }
        if ( 'wheelDelta'  in orgEvent ) { deltaY = orgEvent.wheelDelta;       }
        if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY;      }
        if ( 'wheelDeltaX' in orgEvent ) { deltaX = orgEvent.wheelDeltaX * -1; }

        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
        if ( 'axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
            deltaX = deltaY * -1;
            deltaY = 0;
        }

        // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
        delta = deltaY === 0 ? deltaX : deltaY;

        // New school wheel delta (wheel event)
        if ( 'deltaY' in orgEvent ) {
            deltaY = orgEvent.deltaY * -1;
            delta  = deltaY;
        }
        if ( 'deltaX' in orgEvent ) {
            deltaX = orgEvent.deltaX;
            if ( deltaY === 0 ) { delta  = deltaX * -1; }
        }

        // No change actually happened, no reason to go any further
        if ( deltaY === 0 && deltaX === 0 ) { return; }

        // Need to convert lines and pages to pixels if we aren't already in pixels
        // There are three delta modes:
        //   * deltaMode 0 is by pixels, nothing to do
        //   * deltaMode 1 is by lines
        //   * deltaMode 2 is by pages
        if ( orgEvent.deltaMode === 1 ) {
            var lineHeight = $.data(this, 'mousewheel-line-height');
            delta  *= lineHeight;
            deltaY *= lineHeight;
            deltaX *= lineHeight;
        } else if ( orgEvent.deltaMode === 2 ) {
            var pageHeight = $.data(this, 'mousewheel-page-height');
            delta  *= pageHeight;
            deltaY *= pageHeight;
            deltaX *= pageHeight;
        }

        // Store lowest absolute delta to normalize the delta values
        absDelta = Math.max( Math.abs(deltaY), Math.abs(deltaX) );

        if ( !lowestDelta || absDelta < lowestDelta ) {
            lowestDelta = absDelta;

            // Adjust older deltas if necessary
            if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
                lowestDelta /= 40;
            }
        }

        // Adjust older deltas if necessary
        if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
            // Divide all the things by 40!
            delta  /= 40;
            deltaX /= 40;
            deltaY /= 40;
        }

        // Get a whole, normalized value for the deltas
        delta  = Math[ delta  >= 1 ? 'floor' : 'ceil' ](delta  / lowestDelta);
        deltaX = Math[ deltaX >= 1 ? 'floor' : 'ceil' ](deltaX / lowestDelta);
        deltaY = Math[ deltaY >= 1 ? 'floor' : 'ceil' ](deltaY / lowestDelta);

        // Add information to the event object
        event.deltaX = deltaX;
        event.deltaY = deltaY;
        event.deltaFactor = lowestDelta;
        // Go ahead and set deltaMode to 0 since we converted to pixels
        // Although this is a little odd since we overwrite the deltaX/Y
        // properties with normalized deltas.
        event.deltaMode = 0;

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        // Clearout lowestDelta after sometime to better
        // handle multiple device types that give different
        // a different lowestDelta
        // Ex: trackpad = 3 and mouse wheel = 120
        if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

    function nullLowestDelta() {
        lowestDelta = null;
    }

    function shouldAdjustOldDeltas(orgEvent, absDelta) {
        // If this is an older event and the delta is divisable by 120,
        // then we are assuming that the browser is treating this as an
        // older mouse wheel event and that we should divide the deltas
        // by 40 to try and get a more usable deltaFactor.
        // Side note, this actually impacts the reported scroll distance
        // in older browsers and can cause scrolling to be slower than native.
        // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
        return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
    }

}));/**
 * @namespace jvm Holds core methods and classes used by jVectorMap.
 */
var jvm = {

  /**
   * Inherits child's prototype from the parent's one.
   * @param {Function} child
   * @param {Function} parent
   */
  inherits: function(child, parent) {
    function temp() {}
    temp.prototype = parent.prototype;
    child.prototype = new temp();
    child.prototype.constructor = child;
    child.parentClass = parent;
  },

  /**
   * Mixes in methods from the source constructor to the target one.
   * @param {Function} target
   * @param {Function} source
   */
  mixin: function(target, source){
    var prop;

    for (prop in source.prototype) {
      if (source.prototype.hasOwnProperty(prop)) {
        target.prototype[prop] = source.prototype[prop];
      }
    }
  },

  min: function(values){
    var min = Number.MAX_VALUE,
        i;

    if (values instanceof Array) {
      for (i = 0; i < values.length; i++) {
        if (values[i] < min) {
          min = values[i];
        }
      }
    } else {
      for (i in values) {
        if (values[i] < min) {
          min = values[i];
        }
      }
    }
    return min;
  },

  max: function(values){
    var max = Number.MIN_VALUE,
        i;

    if (values instanceof Array) {
      for (i = 0; i < values.length; i++) {
        if (values[i] > max) {
          max = values[i];
        }
      }
    } else {
      for (i in values) {
        if (values[i] > max) {
          max = values[i];
        }
      }
    }
    return max;
  },

  keys: function(object){
    var keys = [],
        key;

    for (key in object) {
      keys.push(key);
    }
    return keys;
  },

  values: function(object){
    var values = [],
        key,
        i;

    for (i = 0; i < arguments.length; i++) {
      object = arguments[i];
      for (key in object) {
        values.push(object[key]);
      }
    }
    return values;
  },

  whenImageLoaded: function(url){
    var deferred = new jvm.$.Deferred(),
        img = jvm.$('<img/>');

    img.error(function(){
      deferred.reject();
    }).load(function(){
      deferred.resolve(img);
    });
    img.attr('src', url);

    return deferred;
  },

  isImageUrl: function(s){
    return /\.\w{3,4}$/.test(s);
  }
};

jvm.$ = jQuery;

/**
 * indexOf polyfill for IE < 9
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
 */
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (searchElement, fromIndex) {

    var k;

    // 1. Let O be the result of calling ToObject passing
    //    the this value as the argument.
    if (this == null) {
      throw new TypeError('"this" is null or not defined');
    }

    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get
    //    internal method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If len is 0, return -1.
    if (len === 0) {
      return -1;
    }

    // 5. If argument fromIndex was passed let n be
    //    ToInteger(fromIndex); else let n be 0.
    var n = +fromIndex || 0;

    if (Math.abs(n) === Infinity) {
      n = 0;
    }

    // 6. If n >= len, return -1.
    if (n >= len) {
      return -1;
    }

    // 7. If n >= 0, then Let k be n.
    // 8. Else, n<0, Let k be len - abs(n).
    //    If k is less than 0, then let k be 0.
    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

    // 9. Repeat, while k < len
    while (k < len) {
      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the
      //    HasProperty internal method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      //    i.  Let elementK be the result of calling the Get
      //        internal method of O with the argument ToString(k).
      //   ii.  Let same be the result of applying the
      //        Strict Equality Comparison Algorithm to
      //        searchElement and elementK.
      //  iii.  If same is true, return k.
      if (k in O && O[k] === searchElement) {
        return k;
      }
      k++;
    }
    return -1;
  };
}/**
 * Basic wrapper for DOM element.
 * @constructor
 * @param {String} name Tag name of the element
 * @param {Object} config Set of parameters to initialize element with
 */
jvm.AbstractElement = function(name, config){
  /**
   * Underlying DOM element
   * @type {DOMElement}
   * @private
   */
  this.node = this.createElement(name);

  /**
   * Name of underlying element
   * @type {String}
   * @private
   */
  this.name = name;

  /**
   * Internal store of attributes
   * @type {Object}
   * @private
   */
  this.properties = {};

  if (config) {
    this.set(config);
  }
};

/**
 * Set attribute of the underlying DOM element.
 * @param {String} name Name of attribute
 * @param {Number|String} config Set of parameters to initialize element with
 */
jvm.AbstractElement.prototype.set = function(property, value){
  var key;

  if (typeof property === 'object') {
    for (key in property) {
      this.properties[key] = property[key];
      this.applyAttr(key, property[key]);
    }
  } else {
    this.properties[property] = value;
    this.applyAttr(property, value);
  }
};

/**
 * Returns value of attribute.
 * @param {String} name Name of attribute
 */
jvm.AbstractElement.prototype.get = function(property){
  return this.properties[property];
};

/**
 * Applies attribute value to the underlying DOM element.
 * @param {String} name Name of attribute
 * @param {Number|String} config Value of attribute to apply
 * @private
 */
jvm.AbstractElement.prototype.applyAttr = function(property, value){
  this.node.setAttribute(property, value);
};

jvm.AbstractElement.prototype.remove = function(){
  jvm.$(this.node).remove();
};/**
 * Implements abstract vector canvas.
 * @constructor
 * @param {HTMLElement} container Container to put element to.
 * @param {Number} width Width of canvas.
 * @param {Number} height Height of canvas.
 */
jvm.AbstractCanvasElement = function(container, width, height){
  this.container = container;
  this.setSize(width, height);
  this.rootElement = new jvm[this.classPrefix+'GroupElement']();
  this.node.appendChild( this.rootElement.node );
  this.container.appendChild(this.node);
}

/**
 * Add element to the certain group inside of the canvas.
 * @param {HTMLElement} element Element to add to canvas.
 * @param {HTMLElement} group Group to add element into or into root group if not provided.
 */
jvm.AbstractCanvasElement.prototype.add = function(element, group){
  group = group || this.rootElement;
  group.add(element);
  element.canvas = this;
}

/**
 * Create path and add it to the canvas.
 * @param {Object} config Parameters of path to create.
 * @param {Object} style Styles of the path to create.
 * @param {HTMLElement} group Group to add path into.
 */
jvm.AbstractCanvasElement.prototype.addPath = function(config, style, group){
  var el = new jvm[this.classPrefix+'PathElement'](config, style);

  this.add(el, group);
  return el;
};

/**
 * Create circle and add it to the canvas.
 * @param {Object} config Parameters of path to create.
 * @param {Object} style Styles of the path to create.
 * @param {HTMLElement} group Group to add circle into.
 */
jvm.AbstractCanvasElement.prototype.addCircle = function(config, style, group){
  var el = new jvm[this.classPrefix+'CircleElement'](config, style);

  this.add(el, group);
  return el;
};

/**
 * Create circle and add it to the canvas.
 * @param {Object} config Parameters of path to create.
 * @param {Object} style Styles of the path to create.
 * @param {HTMLElement} group Group to add circle into.
 */
jvm.AbstractCanvasElement.prototype.addImage = function(config, style, group){
  var el = new jvm[this.classPrefix+'ImageElement'](config, style);

  this.add(el, group);
  return el;
};

/**
 * Create text and add it to the canvas.
 * @param {Object} config Parameters of path to create.
 * @param {Object} style Styles of the path to create.
 * @param {HTMLElement} group Group to add circle into.
 */
jvm.AbstractCanvasElement.prototype.addText = function(config, style, group){
  var el = new jvm[this.classPrefix+'TextElement'](config, style);

  this.add(el, group);
  return el;
};

/**
 * Add group to the another group inside of the canvas.
 * @param {HTMLElement} group Group to add circle into or root group if not provided.
 */
jvm.AbstractCanvasElement.prototype.addGroup = function(parentGroup){
  var el = new jvm[this.classPrefix+'GroupElement']();

  if (parentGroup) {
    parentGroup.node.appendChild(el.node);
  } else {
    this.node.appendChild(el.node);
  }
  el.canvas = this;
  return el;
};/**
 * Abstract shape element. Shape element represents some visual vector or raster object.
 * @constructor
 * @param {String} name Tag name of the element.
 * @param {Object} config Set of parameters to initialize element with.
 * @param {Object} style Object with styles to set on element initialization.
 */
jvm.AbstractShapeElement = function(name, config, style){
  this.style = style || {};
  this.style.current = this.style.current || {};
  this.isHovered = false;
  this.isSelected = false;
  this.updateStyle();
};

/**
 * Set element's style.
 * @param {Object|String} property Could be string to set only one property or object to set several style properties at once.
 * @param {String} value Value to set in case only one property should be set.
 */
jvm.AbstractShapeElement.prototype.setStyle = function(property, value){
  var styles = {};

  if (typeof property === 'object') {
    styles = property;
  } else {
    styles[property] = value;
  }
  jvm.$.extend(this.style.current, styles);
  this.updateStyle();
};


jvm.AbstractShapeElement.prototype.updateStyle = function(){
  var attrs = {};

  jvm.AbstractShapeElement.mergeStyles(attrs, this.style.initial);
  jvm.AbstractShapeElement.mergeStyles(attrs, this.style.current);
  if (this.isHovered) {
    jvm.AbstractShapeElement.mergeStyles(attrs, this.style.hover);
  }
  if (this.isSelected) {
    jvm.AbstractShapeElement.mergeStyles(attrs, this.style.selected);
    if (this.isHovered) {
      jvm.AbstractShapeElement.mergeStyles(attrs, this.style.selectedHover);
    }
  }
  this.set(attrs);
};

jvm.AbstractShapeElement.mergeStyles = function(styles, newStyles){
  var key;

  newStyles = newStyles || {};
  for (key in newStyles) {
    if (newStyles[key] === null) {
      delete styles[key];
    } else {
      styles[key] = newStyles[key];
    }
  }
}/**
 * Wrapper for SVG element.
 * @constructor
 * @extends jvm.AbstractElement
 * @param {String} name Tag name of the element
 * @param {Object} config Set of parameters to initialize element with
 */

jvm.SVGElement = function(name, config){
  jvm.SVGElement.parentClass.apply(this, arguments);
}

jvm.inherits(jvm.SVGElement, jvm.AbstractElement);

jvm.SVGElement.svgns = "http://www.w3.org/2000/svg";

/**
 * Creates DOM element.
 * @param {String} tagName Name of element
 * @private
 * @returns DOMElement
 */
jvm.SVGElement.prototype.createElement = function( tagName ){
  return document.createElementNS( jvm.SVGElement.svgns, tagName );
};

/**
 * Adds CSS class for underlying DOM element.
 * @param {String} className Name of CSS class name
 */
jvm.SVGElement.prototype.addClass = function( className ){
  this.node.setAttribute('class', className);
};

/**
 * Returns constructor for element by name prefixed with 'VML'.
 * @param {String} ctr Name of basic constructor to return
 * proper implementation for.
 * @returns Function
 * @private
 */
jvm.SVGElement.prototype.getElementCtr = function( ctr ){
  return jvm['SVG'+ctr];
};

jvm.SVGElement.prototype.getBBox = function(){
  return this.node.getBBox();
};jvm.SVGGroupElement = function(){
  jvm.SVGGroupElement.parentClass.call(this, 'g');
}

jvm.inherits(jvm.SVGGroupElement, jvm.SVGElement);

jvm.SVGGroupElement.prototype.add = function(element){
  this.node.appendChild( element.node );
};jvm.SVGCanvasElement = function(container, width, height){
  this.classPrefix = 'SVG';
  jvm.SVGCanvasElement.parentClass.call(this, 'svg');

  this.defsElement = new jvm.SVGElement('defs');
  this.node.appendChild( this.defsElement.node );

  jvm.AbstractCanvasElement.apply(this, arguments);
}

jvm.inherits(jvm.SVGCanvasElement, jvm.SVGElement);
jvm.mixin(jvm.SVGCanvasElement, jvm.AbstractCanvasElement);

jvm.SVGCanvasElement.prototype.setSize = function(width, height){
  this.width = width;
  this.height = height;
  this.node.setAttribute('width', width);
  this.node.setAttribute('height', height);
};

jvm.SVGCanvasElement.prototype.applyTransformParams = function(scale, transX, transY) {
  this.scale = scale;
  this.transX = transX;
  this.transY = transY;
  this.rootElement.node.setAttribute('transform', 'scale('+scale+') translate('+transX+', '+transY+')');
};jvm.SVGShapeElement = function(name, config, style){
  jvm.SVGShapeElement.parentClass.call(this, name, config);
  jvm.AbstractShapeElement.apply(this, arguments);
};

jvm.inherits(jvm.SVGShapeElement, jvm.SVGElement);
jvm.mixin(jvm.SVGShapeElement, jvm.AbstractShapeElement);

jvm.SVGShapeElement.prototype.applyAttr = function(attr, value){
  var patternEl,
      imageEl,
      that = this;

  if (attr === 'fill' && jvm.isImageUrl(value)) {
    if (!jvm.SVGShapeElement.images[value]) {
      jvm.whenImageLoaded(value).then(function(img){
        imageEl = new jvm.SVGElement('image');
        imageEl.node.setAttributeNS('http://www.w3.org/1999/xlink', 'href', value);
        imageEl.applyAttr('x', '0');
        imageEl.applyAttr('y', '0');
        imageEl.applyAttr('width', img[0].width);
        imageEl.applyAttr('height', img[0].height);

        patternEl = new jvm.SVGElement('pattern');
        patternEl.applyAttr('id', 'image'+jvm.SVGShapeElement.imageCounter);
        patternEl.applyAttr('x', 0);
        patternEl.applyAttr('y', 0);
        patternEl.applyAttr('width', img[0].width / 2);
        patternEl.applyAttr('height', img[0].height / 2);
        patternEl.applyAttr('viewBox', '0 0 '+img[0].width+' '+img[0].height);
        patternEl.applyAttr('patternUnits', 'userSpaceOnUse');
        patternEl.node.appendChild( imageEl.node );

        that.canvas.defsElement.node.appendChild( patternEl.node );

        jvm.SVGShapeElement.images[value] = jvm.SVGShapeElement.imageCounter++;

        that.applyAttr('fill', 'url(#image'+jvm.SVGShapeElement.images[value]+')');
      });
    } else {
      this.applyAttr('fill', 'url(#image'+jvm.SVGShapeElement.images[value]+')');
    }
  } else {
    jvm.SVGShapeElement.parentClass.prototype.applyAttr.apply(this, arguments);
  }
};

jvm.SVGShapeElement.imageCounter = 1;
jvm.SVGShapeElement.images = {};jvm.SVGPathElement = function(config, style){
  jvm.SVGPathElement.parentClass.call(this, 'path', config, style);
  this.node.setAttribute('fill-rule', 'evenodd');
}

jvm.inherits(jvm.SVGPathElement, jvm.SVGShapeElement);jvm.SVGCircleElement = function(config, style){
  jvm.SVGCircleElement.parentClass.call(this, 'circle', config, style);
};

jvm.inherits(jvm.SVGCircleElement, jvm.SVGShapeElement);jvm.SVGImageElement = function(config, style){
  jvm.SVGImageElement.parentClass.call(this, 'image', config, style);
};

jvm.inherits(jvm.SVGImageElement, jvm.SVGShapeElement);

jvm.SVGImageElement.prototype.applyAttr = function(attr, value){
  var that = this;

  if (attr == 'image') {
    jvm.whenImageLoaded(value).then(function(img){
      that.node.setAttributeNS('http://www.w3.org/1999/xlink', 'href', value);
      that.width = img[0].width;
      that.height = img[0].height;
      that.applyAttr('width', that.width);
      that.applyAttr('height', that.height);

      that.applyAttr('x', that.cx - that.width / 2);
      that.applyAttr('y', that.cy - that.height / 2);

      jvm.$(that.node).trigger('imageloaded', [img]);
    });
  } else if(attr == 'cx') {
    this.cx = value;
    if (this.width) {
      this.applyAttr('x', value - this.width / 2);
    }
  } else if(attr == 'cy') {
    this.cy = value;
    if (this.height) {
      this.applyAttr('y', value - this.height / 2);
    }
  } else {
    jvm.SVGImageElement.parentClass.prototype.applyAttr.apply(this, arguments);
  }
};jvm.SVGTextElement = function(config, style){
  jvm.SVGTextElement.parentClass.call(this, 'text', config, style);
}

jvm.inherits(jvm.SVGTextElement, jvm.SVGShapeElement);

jvm.SVGTextElement.prototype.applyAttr = function(attr, value){
  if (attr === 'text') {
    this.node.textContent = value;
  } else {
    jvm.SVGTextElement.parentClass.prototype.applyAttr.apply(this, arguments);
  }
};/**
 * Wrapper for VML element.
 * @constructor
 * @extends jvm.AbstractElement
 * @param {String} name Tag name of the element
 * @param {Object} config Set of parameters to initialize element with
 */

jvm.VMLElement = function(name, config){
  if (!jvm.VMLElement.VMLInitialized) {
    jvm.VMLElement.initializeVML();
  }

  jvm.VMLElement.parentClass.apply(this, arguments);
};

jvm.inherits(jvm.VMLElement, jvm.AbstractElement);

/**
 * Shows if VML was already initialized for the current document or not.
 * @static
 * @private
 * @type {Boolean}
 */
jvm.VMLElement.VMLInitialized = false;

/**
 * Initializes VML handling before creating the first element
 * (adds CSS class and creates namespace). Adds one of two forms
 * of createElement method depending of support by browser.
 * @static
 * @private
 */

 // The following method of VML handling is borrowed from the
 // Raphael library by Dmitry Baranovsky.

jvm.VMLElement.initializeVML = function(){
  try {
    if (!document.namespaces.rvml) {
      document.namespaces.add("rvml","urn:schemas-microsoft-com:vml");
    }
    /**
     * Creates DOM element.
     * @param {String} tagName Name of element
     * @private
     * @returns DOMElement
     */
    jvm.VMLElement.prototype.createElement = function (tagName) {
      return document.createElement('<rvml:' + tagName + ' class="rvml">');
    };
  } catch (e) {
    /**
     * @private
     */
    jvm.VMLElement.prototype.createElement = function (tagName) {
      return document.createElement('<' + tagName + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
    };
  }
  document.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
  jvm.VMLElement.VMLInitialized = true;
};

/**
 * Returns constructor for element by name prefixed with 'VML'.
 * @param {String} ctr Name of basic constructor to return
 * proper implementation for.
 * @returns Function
 * @private
 */
jvm.VMLElement.prototype.getElementCtr = function( ctr ){
  return jvm['VML'+ctr];
};

/**
 * Adds CSS class for underlying DOM element.
 * @param {String} className Name of CSS class name
 */
jvm.VMLElement.prototype.addClass = function( className ){
  jvm.$(this.node).addClass(className);
};

/**
 * Applies attribute value to the underlying DOM element.
 * @param {String} name Name of attribute
 * @param {Number|String} config Value of attribute to apply
 * @private
 */
jvm.VMLElement.prototype.applyAttr = function( attr, value ){
  this.node[attr] = value;
};

/**
 * Returns boundary box for the element.
 * @returns {Object} Boundary box with numeric fields: x, y, width, height
 * @override
 */
jvm.VMLElement.prototype.getBBox = function(){
  var node = jvm.$(this.node);

  return {
    x: node.position().left / this.canvas.scale,
    y: node.position().top / this.canvas.scale,
    width: node.width() / this.canvas.scale,
    height: node.height() / this.canvas.scale
  };
};jvm.VMLGroupElement = function(){
  jvm.VMLGroupElement.parentClass.call(this, 'group');

  this.node.style.left = '0px';
  this.node.style.top = '0px';
  this.node.coordorigin = "0 0";
};

jvm.inherits(jvm.VMLGroupElement, jvm.VMLElement);

jvm.VMLGroupElement.prototype.add = function(element){
  this.node.appendChild( element.node );
};jvm.VMLCanvasElement = function(container, width, height){
  this.classPrefix = 'VML';
  jvm.VMLCanvasElement.parentClass.call(this, 'group');
  jvm.AbstractCanvasElement.apply(this, arguments);
  this.node.style.position = 'absolute';
};

jvm.inherits(jvm.VMLCanvasElement, jvm.VMLElement);
jvm.mixin(jvm.VMLCanvasElement, jvm.AbstractCanvasElement);

jvm.VMLCanvasElement.prototype.setSize = function(width, height){
  var paths,
      groups,
      i,
      l;

  this.width = width;
  this.height = height;
  this.node.style.width = width + "px";
  this.node.style.height = height + "px";
  this.node.coordsize = width+' '+height;
  this.node.coordorigin = "0 0";
  if (this.rootElement) {
    paths = this.rootElement.node.getElementsByTagName('shape');
    for(i = 0, l = paths.length; i < l; i++) {
      paths[i].coordsize = width+' '+height;
      paths[i].style.width = width+'px';
      paths[i].style.height = height+'px';
    }
    groups = this.node.getElementsByTagName('group');
    for(i = 0, l = groups.length; i < l; i++) {
      groups[i].coordsize = width+' '+height;
      groups[i].style.width = width+'px';
      groups[i].style.height = height+'px';
    }
  }
};

jvm.VMLCanvasElement.prototype.applyTransformParams = function(scale, transX, transY) {
  this.scale = scale;
  this.transX = transX;
  this.transY = transY;
  this.rootElement.node.coordorigin = (this.width-transX-this.width/100)+','+(this.height-transY-this.height/100);
  this.rootElement.node.coordsize = this.width/scale+','+this.height/scale;
};jvm.VMLShapeElement = function(name, config){
  jvm.VMLShapeElement.parentClass.call(this, name, config);

  this.fillElement = new jvm.VMLElement('fill');
  this.strokeElement = new jvm.VMLElement('stroke');
  this.node.appendChild(this.fillElement.node);
  this.node.appendChild(this.strokeElement.node);
  this.node.stroked = false;

  jvm.AbstractShapeElement.apply(this, arguments);
};

jvm.inherits(jvm.VMLShapeElement, jvm.VMLElement);
jvm.mixin(jvm.VMLShapeElement, jvm.AbstractShapeElement);

jvm.VMLShapeElement.prototype.applyAttr = function(attr, value){
  switch (attr) {
    case 'fill':
      this.node.fillcolor = value;
      break;
    case 'fill-opacity':
      this.fillElement.node.opacity = Math.round(value*100)+'%';
      break;
    case 'stroke':
      if (value === 'none') {
        this.node.stroked = false;
      } else {
        this.node.stroked = true;
      }
      this.node.strokecolor = value;
      break;
    case 'stroke-opacity':
      this.strokeElement.node.opacity = Math.round(value*100)+'%';
      break;
    case 'stroke-width':
      if (parseInt(value, 10) === 0) {
        this.node.stroked = false;
      } else {
        this.node.stroked = true;
      }
      this.node.strokeweight = value;
      break;
    case 'd':
      this.node.path = jvm.VMLPathElement.pathSvgToVml(value);
      break;
    default:
      jvm.VMLShapeElement.parentClass.prototype.applyAttr.apply(this, arguments);
  }
};jvm.VMLPathElement = function(config, style){
  var scale = new jvm.VMLElement('skew');

  jvm.VMLPathElement.parentClass.call(this, 'shape', config, style);

  this.node.coordorigin = "0 0";

  scale.node.on = true;
  scale.node.matrix = '0.01,0,0,0.01,0,0';
  scale.node.offset = '0,0';

  this.node.appendChild(scale.node);
};

jvm.inherits(jvm.VMLPathElement, jvm.VMLShapeElement);

jvm.VMLPathElement.prototype.applyAttr = function(attr, value){
  if (attr === 'd') {
    this.node.path = jvm.VMLPathElement.pathSvgToVml(value);
  } else {
    jvm.VMLShapeElement.prototype.applyAttr.call(this, attr, value);
  }
};

jvm.VMLPathElement.pathSvgToVml = function(path) {
  var cx = 0, cy = 0, ctrlx, ctrly;

  path = path.replace(/(-?\d+)e(-?\d+)/g, '0');
  return path.replace(/([MmLlHhVvCcSs])\s*((?:-?\d*(?:\.\d+)?\s*,?\s*)+)/g, function(segment, letter, coords, index){
    coords = coords.replace(/(\d)-/g, '$1,-')
            .replace(/^\s+/g, '')
            .replace(/\s+$/g, '')
            .replace(/\s+/g, ',').split(',');
    if (!coords[0]) coords.shift();
    for (var i=0, l=coords.length; i<l; i++) {
      coords[i] = Math.round(100*coords[i]);
    }
    switch (letter) {
      case 'm':
        cx += coords[0];
        cy += coords[1];
        return 't'+coords.join(',');
      case 'M':
        cx = coords[0];
        cy = coords[1];
        return 'm'+coords.join(',');
      case 'l':
        cx += coords[0];
        cy += coords[1];
        return 'r'+coords.join(',');
      case 'L':
        cx = coords[0];
        cy = coords[1];
        return 'l'+coords.join(',');
      case 'h':
        cx += coords[0];
        return 'r'+coords[0]+',0';
      case 'H':
        cx = coords[0];
        return 'l'+cx+','+cy;
      case 'v':
        cy += coords[0];
        return 'r0,'+coords[0];
      case 'V':
        cy = coords[0];
        return 'l'+cx+','+cy;
      case 'c':
        ctrlx = cx + coords[coords.length-4];
        ctrly = cy + coords[coords.length-3];
        cx += coords[coords.length-2];
        cy += coords[coords.length-1];
        return 'v'+coords.join(',');
      case 'C':
        ctrlx = coords[coords.length-4];
        ctrly = coords[coords.length-3];
        cx = coords[coords.length-2];
        cy = coords[coords.length-1];
        return 'c'+coords.join(',');
      case 's':
        coords.unshift(cy-ctrly);
        coords.unshift(cx-ctrlx);
        ctrlx = cx + coords[coords.length-4];
        ctrly = cy + coords[coords.length-3];
        cx += coords[coords.length-2];
        cy += coords[coords.length-1];
        return 'v'+coords.join(',');
      case 'S':
        coords.unshift(cy+cy-ctrly);
        coords.unshift(cx+cx-ctrlx);
        ctrlx = coords[coords.length-4];
        ctrly = coords[coords.length-3];
        cx = coords[coords.length-2];
        cy = coords[coords.length-1];
        return 'c'+coords.join(',');
    }
    return '';
  }).replace(/z/g, 'e');
};jvm.VMLCircleElement = function(config, style){
  jvm.VMLCircleElement.parentClass.call(this, 'oval', config, style);
};

jvm.inherits(jvm.VMLCircleElement, jvm.VMLShapeElement);

jvm.VMLCircleElement.prototype.applyAttr = function(attr, value){
  switch (attr) {
    case 'r':
      this.node.style.width = value*2+'px';
      this.node.style.height = value*2+'px';
      this.applyAttr('cx', this.get('cx') || 0);
      this.applyAttr('cy', this.get('cy') || 0);
      break;
    case 'cx':
      if (!value) return;
      this.node.style.left = value - (this.get('r') || 0) + 'px';
      break;
    case 'cy':
      if (!value) return;
      this.node.style.top = value - (this.get('r') || 0) + 'px';
      break;
    default:
      jvm.VMLCircleElement.parentClass.prototype.applyAttr.call(this, attr, value);
  }
};/**
 * Class for vector images manipulations.
 * @constructor
 * @param {DOMElement} container to place canvas to
 * @param {Number} width
 * @param {Number} height
 */
jvm.VectorCanvas = function(container, width, height) {
  this.mode = window.SVGAngle ? 'svg' : 'vml';

  if (this.mode == 'svg') {
    this.impl = new jvm.SVGCanvasElement(container, width, height);
  } else {
    this.impl = new jvm.VMLCanvasElement(container, width, height);
  }
  this.impl.mode = this.mode;
  return this.impl;
};jvm.SimpleScale = function(scale){
  this.scale = scale;
};

jvm.SimpleScale.prototype.getValue = function(value){
  return value;
};jvm.OrdinalScale = function(scale){
  this.scale = scale;
};

jvm.OrdinalScale.prototype.getValue = function(value){
  return this.scale[value];
};

jvm.OrdinalScale.prototype.getTicks = function(){
  var ticks = [],
      key;

  for (key in this.scale) {
    ticks.push({
      label: key,
      value: this.scale[key]
    });
  }

  return ticks;
};jvm.NumericScale = function(scale, normalizeFunction, minValue, maxValue) {
  this.scale = [];

  normalizeFunction = normalizeFunction || 'linear';

  if (scale) this.setScale(scale);
  if (normalizeFunction) this.setNormalizeFunction(normalizeFunction);
  if (typeof minValue !== 'undefined' ) this.setMin(minValue);
  if (typeof maxValue !== 'undefined' ) this.setMax(maxValue);
};

jvm.NumericScale.prototype = {
  setMin: function(min) {
    this.clearMinValue = min;
    if (typeof this.normalize === 'function') {
      this.minValue = this.normalize(min);
    } else {
      this.minValue = min;
    }
  },

  setMax: function(max) {
    this.clearMaxValue = max;
    if (typeof this.normalize === 'function') {
      this.maxValue = this.normalize(max);
    } else {
      this.maxValue = max;
    }
  },

  setScale: function(scale) {
    var i;

    this.scale = [];
    for (i = 0; i < scale.length; i++) {
      this.scale[i] = [scale[i]];
    }
  },

  setNormalizeFunction: function(f) {
    if (f === 'polynomial') {
      this.normalize = function(value) {
        return Math.pow(value, 0.2);
      }
    } else if (f === 'linear') {
      delete this.normalize;
    } else {
      this.normalize = f;
    }
    this.setMin(this.clearMinValue);
    this.setMax(this.clearMaxValue);
  },

  getValue: function(value) {
    var lengthes = [],
        fullLength = 0,
        l,
        i = 0,
        c;

    if (typeof this.normalize === 'function') {
      value = this.normalize(value);
    }
    for (i = 0; i < this.scale.length-1; i++) {
      l = this.vectorLength(this.vectorSubtract(this.scale[i+1], this.scale[i]));
      lengthes.push(l);
      fullLength += l;
    }

    c = (this.maxValue - this.minValue) / fullLength;
    for (i=0; i<lengthes.length; i++) {
      lengthes[i] *= c;
    }

    i = 0;
    value -= this.minValue;
    while (value - lengthes[i] >= 0) {
      value -= lengthes[i];
      i++;
    }

    if (i == this.scale.length - 1) {
      value = this.vectorToNum(this.scale[i])
    } else {
      value = (
        this.vectorToNum(
          this.vectorAdd(this.scale[i],
            this.vectorMult(
              this.vectorSubtract(this.scale[i+1], this.scale[i]),
              (value) / (lengthes[i])
            )
          )
        )
      );
    }

    return value;
  },

  vectorToNum: function(vector) {
    var num = 0,
        i;

    for (i = 0; i < vector.length; i++) {
      num += Math.round(vector[i])*Math.pow(256, vector.length-i-1);
    }
    return num;
  },

  vectorSubtract: function(vector1, vector2) {
    var vector = [],
        i;

    for (i = 0; i < vector1.length; i++) {
      vector[i] = vector1[i] - vector2[i];
    }
    return vector;
  },

  vectorAdd: function(vector1, vector2) {
    var vector = [],
        i;

    for (i = 0; i < vector1.length; i++) {
      vector[i] = vector1[i] + vector2[i];
    }
    return vector;
  },

  vectorMult: function(vector, num) {
    var result = [],
        i;

    for (i = 0; i < vector.length; i++) {
      result[i] = vector[i] * num;
    }
    return result;
  },

  vectorLength: function(vector) {
    var result = 0,
        i;
    for (i = 0; i < vector.length; i++) {
      result += vector[i] * vector[i];
    }
    return Math.sqrt(result);
  },

  /* Derived from d3 implementation https://github.com/mbostock/d3/blob/master/src/scale/linear.js#L94 */
  getTicks: function(){
    var m = 5,
        extent = [this.clearMinValue, this.clearMaxValue],
        span = extent[1] - extent[0],
        step = Math.pow(10, Math.floor(Math.log(span / m) / Math.LN10)),
        err = m / span * step,
        ticks = [],
        tick,
        v;

    if (err <= .15) step *= 10;
    else if (err <= .35) step *= 5;
    else if (err <= .75) step *= 2;

    extent[0] = Math.floor(extent[0] / step) * step;
    extent[1] = Math.ceil(extent[1] / step) * step;

    tick = extent[0];
    while (tick <= extent[1]) {
      if (tick == extent[0]) {
        v = this.clearMinValue;
      } else if (tick == extent[1]) {
        v = this.clearMaxValue;
      } else {
        v = tick;
      }
      ticks.push({
        label: tick,
        value: this.getValue(v)
      });
      tick += step;
    }

    return ticks;
  }
};
jvm.ColorScale = function(colors, normalizeFunction, minValue, maxValue) {
  jvm.ColorScale.parentClass.apply(this, arguments);
}

jvm.inherits(jvm.ColorScale, jvm.NumericScale);

jvm.ColorScale.prototype.setScale = function(scale) {
  var i;

  for (i = 0; i < scale.length; i++) {
    this.scale[i] = jvm.ColorScale.rgbToArray(scale[i]);
  }
};

jvm.ColorScale.prototype.getValue = function(value) {
  return jvm.ColorScale.numToRgb(jvm.ColorScale.parentClass.prototype.getValue.call(this, value));
};

jvm.ColorScale.arrayToRgb = function(ar) {
  var rgb = '#',
      d,
      i;

  for (i = 0; i < ar.length; i++) {
    d = ar[i].toString(16);
    rgb += d.length == 1 ? '0'+d : d;
  }
  return rgb;
};

jvm.ColorScale.numToRgb = function(num) {
  num = num.toString(16);

  while (num.length < 6) {
    num = '0' + num;
  }

  return '#'+num;
};

jvm.ColorScale.rgbToArray = function(rgb) {
  rgb = rgb.substr(1);
  return [parseInt(rgb.substr(0, 2), 16), parseInt(rgb.substr(2, 2), 16), parseInt(rgb.substr(4, 2), 16)];
};/**
 * Represents map legend.
 * @constructor
 * @param {Object} params Configuration parameters.
 * @param {String} params.cssClass Additional CSS class to apply to legend element.
 * @param {Boolean} params.vertical If <code>true</code> legend will be rendered as vertical.
 * @param {String} params.title Legend title.
 * @param {Function} params.labelRender Method to convert series values to legend labels.
 */
jvm.Legend = function(params) {
  this.params = params || {};
  this.map = this.params.map;
  this.series = this.params.series;
  this.body = jvm.$('<div/>');
  this.body.addClass('jvectormap-legend');
  if (this.params.cssClass) {
    this.body.addClass(this.params.cssClass);
  }

  if (params.vertical) {
    this.map.legendCntVertical.append( this.body );
  } else {
    this.map.legendCntHorizontal.append( this.body );
  }

  this.render();
}

jvm.Legend.prototype.render = function(){
  var ticks = this.series.scale.getTicks(),
      i,
      inner = jvm.$('<div/>').addClass('jvectormap-legend-inner'),
      tick,
      sample,
      label;

  this.body.html('');
  if (this.params.title) {
    this.body.append(
      jvm.$('<div/>').addClass('jvectormap-legend-title').html(this.params.title)
    );
  }
  this.body.append(inner);

  for (i = 0; i < ticks.length; i++) {
    tick = jvm.$('<div/>').addClass('jvectormap-legend-tick');
    sample = jvm.$('<div/>').addClass('jvectormap-legend-tick-sample');

    switch (this.series.params.attribute) {
      case 'fill':
        if (jvm.isImageUrl(ticks[i].value)) {
          sample.css('background', 'url('+ticks[i].value+')');
        } else {
          sample.css('background', ticks[i].value);
        }
        break;
      case 'stroke':
        sample.css('background', ticks[i].value);
        break;
      case 'image':
        sample.css('background', 'url('+ticks[i].value+') no-repeat center center');
        break;
      case 'r':
        jvm.$('<div/>').css({
          'border-radius': ticks[i].value,
          border: this.map.params.markerStyle.initial['stroke-width']+'px '+
                  this.map.params.markerStyle.initial['stroke']+' solid',
          width: ticks[i].value * 2 + 'px',
          height: ticks[i].value * 2 + 'px',
          background: this.map.params.markerStyle.initial['fill']
        }).appendTo(sample);
        break;
    }
    tick.append( sample );
    label = ticks[i].label;
    if (this.params.labelRender) {
      label = this.params.labelRender(label);
    }
    tick.append( jvm.$('<div>'+label+' </div>').addClass('jvectormap-legend-tick-text') );
    inner.append(tick);
  }
  inner.append( jvm.$('<div/>').css('clear', 'both') );
}/**
 * Creates data series.
 * @constructor
 * @param {Object} params Parameters to initialize series with.
 * @param {Array} params.values The data set to visualize.
 * @param {String} params.attribute Numberic or color attribute to use for data visualization. This could be: <code>fill</code>, <code>stroke</code>, <code>fill-opacity</code>, <code>stroke-opacity</code> for markers and regions and <code>r</code> (radius) for markers only.
 * @param {Array} params.scale Values used to map a dimension of data to a visual representation. The first value sets visualization for minimum value from the data set and the last value sets visualization for the maximum value. There also could be intermidiate values. Default value is <code>['#C8EEFF', '#0071A4']</code>
 * @param {Function|String} params.normalizeFunction The function used to map input values to the provided scale. This parameter could be provided as function or one of the strings: <code>'linear'</code> or <code>'polynomial'</code>, while <code>'linear'</code> is used by default. The function provided takes value from the data set as an input and returns corresponding value from the scale.
 * @param {Number} params.min Minimum value of the data set. Could be calculated automatically if not provided.
 * @param {Number} params.min Maximum value of the data set. Could be calculated automatically if not provided.
 */
jvm.DataSeries = function(params, elements, map) {
  var scaleConstructor;

  params = params || {};
  params.attribute = params.attribute || 'fill';

  this.elements = elements;
  this.params = params;
  this.map = map;

  if (params.attributes) {
    this.setAttributes(params.attributes);
  }

  if (jvm.$.isArray(params.scale)) {
    scaleConstructor = (params.attribute === 'fill' || params.attribute === 'stroke') ? jvm.ColorScale : jvm.NumericScale;
    this.scale = new scaleConstructor(params.scale, params.normalizeFunction, params.min, params.max);
  } else if (params.scale) {
    this.scale = new jvm.OrdinalScale(params.scale);
  } else {
    this.scale = new jvm.SimpleScale(params.scale);
  }

  this.values = params.values || {};
  this.setValues(this.values);

  if (this.params.legend) {
    this.legend = new jvm.Legend($.extend({
      map: this.map,
      series: this
    }, this.params.legend))
  }
};

jvm.DataSeries.prototype = {
  setAttributes: function(key, attr){
    var attrs = key,
        code;

    if (typeof key == 'string') {
      if (this.elements[key]) {
        this.elements[key].setStyle(this.params.attribute, attr);
      }
    } else {
      for (code in attrs) {
        if (this.elements[code]) {
          this.elements[code].element.setStyle(this.params.attribute, attrs[code]);
        }
      }
    }
  },

  /**
   * Set values for the data set.
   * @param {Object} values Object which maps codes of regions or markers to values.
   */
  setValues: function(values) {
    var max = -Number.MAX_VALUE,
        min = Number.MAX_VALUE,
        val,
        cc,
        attrs = {};

    if (!(this.scale instanceof jvm.OrdinalScale) && !(this.scale instanceof jvm.SimpleScale)) {
      // we have a color scale as an array
      if (typeof this.params.min === 'undefined' || typeof this.params.max === 'undefined') {
        // min and/or max are not defined, so calculate them
        for (cc in values) {
          val = parseFloat(values[cc]);
          if (val > max) max = val;
          if (val < min) min = val;
        }
      }

      if (typeof this.params.min === 'undefined') {
        this.scale.setMin(min);
        this.params.min = min;
      } else {
        this.scale.setMin(this.params.min);
      }

      if (typeof this.params.max === 'undefined') {
        this.scale.setMax(max);
        this.params.max = max;
      } else {
        this.scale.setMax(this.params.max);
      }

      for (cc in values) {
        if (cc != 'indexOf') {
          val = parseFloat(values[cc]);
          if (!isNaN(val)) {
            attrs[cc] = this.scale.getValue(val);
          } else {
            attrs[cc] = this.elements[cc].element.style.initial[this.params.attribute];
          }
        }
      }
    } else {
      for (cc in values) {
        if (values[cc]) {
          attrs[cc] = this.scale.getValue(values[cc]);
        } else {
          attrs[cc] = this.elements[cc].element.style.initial[this.params.attribute];
        }
      }
    }

    this.setAttributes(attrs);
    jvm.$.extend(this.values, values);
  },

  clear: function(){
    var key,
        attrs = {};

    for (key in this.values) {
      if (this.elements[key]) {
        attrs[key] = this.elements[key].element.shape.style.initial[this.params.attribute];
      }
    }
    this.setAttributes(attrs);
    this.values = {};
  },

  /**
   * Set scale of the data series.
   * @param {Array} scale Values representing scale.
   */
  setScale: function(scale) {
    this.scale.setScale(scale);
    if (this.values) {
      this.setValues(this.values);
    }
  },

  /**
   * Set normalize function of the data series.
   * @param {Function|String} normilizeFunction.
   */
  setNormalizeFunction: function(f) {
    this.scale.setNormalizeFunction(f);
    if (this.values) {
      this.setValues(this.values);
    }
  }
};
/**
 * Contains methods for transforming point on sphere to
 * Cartesian coordinates using various projections.
 * @class
 */
jvm.Proj = {
  degRad: 180 / Math.PI,
  radDeg: Math.PI / 180,
  radius: 6381372,

  sgn: function(n){
    if (n > 0) {
      return 1;
    } else if (n < 0) {
      return -1;
    } else {
      return n;
    }
  },

  /**
   * Converts point on sphere to the Cartesian coordinates using Miller projection
   * @param {Number} lat Latitude in degrees
   * @param {Number} lng Longitude in degrees
   * @param {Number} c Central meridian in degrees
   */
  mill: function(lat, lng, c){
    return {
      x: this.radius * (lng - c) * this.radDeg,
      y: - this.radius * Math.log(Math.tan((45 + 0.4 * lat) * this.radDeg)) / 0.8
    };
  },

  /**
   * Inverse function of mill()
   * Converts Cartesian coordinates to point on sphere using Miller projection
   * @param {Number} x X of point in Cartesian system as integer
   * @param {Number} y Y of point in Cartesian system as integer
   * @param {Number} c Central meridian in degrees
   */
  mill_inv: function(x, y, c){
    return {
      lat: (2.5 * Math.atan(Math.exp(0.8 * y / this.radius)) - 5 * Math.PI / 8) * this.degRad,
      lng: (c * this.radDeg + x / this.radius) * this.degRad
    };
  },

  /**
   * Converts point on sphere to the Cartesian coordinates using Mercator projection
   * @param {Number} lat Latitude in degrees
   * @param {Number} lng Longitude in degrees
   * @param {Number} c Central meridian in degrees
   */
  merc: function(lat, lng, c){
    return {
      x: this.radius * (lng - c) * this.radDeg,
      y: - this.radius * Math.log(Math.tan(Math.PI / 4 + lat * Math.PI / 360))
    };
  },

  /**
   * Inverse function of merc()
   * Converts Cartesian coordinates to point on sphere using Mercator projection
   * @param {Number} x X of point in Cartesian system as integer
   * @param {Number} y Y of point in Cartesian system as integer
   * @param {Number} c Central meridian in degrees
   */
  merc_inv: function(x, y, c){
    return {
      lat: (2 * Math.atan(Math.exp(y / this.radius)) - Math.PI / 2) * this.degRad,
      lng: (c * this.radDeg + x / this.radius) * this.degRad
    };
  },

  /**
   * Converts point on sphere to the Cartesian coordinates using Albers Equal-Area Conic
   * projection
   * @see <a href="http://mathworld.wolfram.com/AlbersEqual-AreaConicProjection.html">Albers Equal-Area Conic projection</a>
   * @param {Number} lat Latitude in degrees
   * @param {Number} lng Longitude in degrees
   * @param {Number} c Central meridian in degrees
   */
  aea: function(lat, lng, c){
    var fi0 = 0,
        lambda0 = c * this.radDeg,
        fi1 = 29.5 * this.radDeg,
        fi2 = 45.5 * this.radDeg,
        fi = lat * this.radDeg,
        lambda = lng * this.radDeg,
        n = (Math.sin(fi1)+Math.sin(fi2)) / 2,
        C = Math.cos(fi1)*Math.cos(fi1)+2*n*Math.sin(fi1),
        theta = n*(lambda-lambda0),
        ro = Math.sqrt(C-2*n*Math.sin(fi))/n,
        ro0 = Math.sqrt(C-2*n*Math.sin(fi0))/n;

    return {
      x: ro * Math.sin(theta) * this.radius,
      y: - (ro0 - ro * Math.cos(theta)) * this.radius
    };
  },

  /**
   * Converts Cartesian coordinates to the point on sphere using Albers Equal-Area Conic
   * projection
   * @see <a href="http://mathworld.wolfram.com/AlbersEqual-AreaConicProjection.html">Albers Equal-Area Conic projection</a>
   * @param {Number} x X of point in Cartesian system as integer
   * @param {Number} y Y of point in Cartesian system as integer
   * @param {Number} c Central meridian in degrees
   */
  aea_inv: function(xCoord, yCoord, c){
    var x = xCoord / this.radius,
        y = yCoord / this.radius,
        fi0 = 0,
        lambda0 = c * this.radDeg,
        fi1 = 29.5 * this.radDeg,
        fi2 = 45.5 * this.radDeg,
        n = (Math.sin(fi1)+Math.sin(fi2)) / 2,
        C = Math.cos(fi1)*Math.cos(fi1)+2*n*Math.sin(fi1),
        ro0 = Math.sqrt(C-2*n*Math.sin(fi0))/n,
        ro = Math.sqrt(x*x+(ro0-y)*(ro0-y)),
        theta = Math.atan( x / (ro0 - y) );

    return {
      lat: (Math.asin((C - ro * ro * n * n) / (2 * n))) * this.degRad,
      lng: (lambda0 + theta / n) * this.degRad
    };
  },

  /**
   * Converts point on sphere to the Cartesian coordinates using Lambert conformal
   * conic projection
   * @see <a href="http://mathworld.wolfram.com/LambertConformalConicProjection.html">Lambert Conformal Conic Projection</a>
   * @param {Number} lat Latitude in degrees
   * @param {Number} lng Longitude in degrees
   * @param {Number} c Central meridian in degrees
   */
  lcc: function(lat, lng, c){
    var fi0 = 0,
        lambda0 = c * this.radDeg,
        lambda = lng * this.radDeg,
        fi1 = 33 * this.radDeg,
        fi2 = 45 * this.radDeg,
        fi = lat * this.radDeg,
        n = Math.log( Math.cos(fi1) * (1 / Math.cos(fi2)) ) / Math.log( Math.tan( Math.PI / 4 + fi2 / 2) * (1 / Math.tan( Math.PI / 4 + fi1 / 2) ) ),
        F = ( Math.cos(fi1) * Math.pow( Math.tan( Math.PI / 4 + fi1 / 2 ), n ) ) / n,
        ro = F * Math.pow( 1 / Math.tan( Math.PI / 4 + fi / 2 ), n ),
        ro0 = F * Math.pow( 1 / Math.tan( Math.PI / 4 + fi0 / 2 ), n );

    return {
      x: ro * Math.sin( n * (lambda - lambda0) ) * this.radius,
      y: - (ro0 - ro * Math.cos( n * (lambda - lambda0) ) ) * this.radius
    };
  },

  /**
   * Converts Cartesian coordinates to the point on sphere using Lambert conformal conic
   * projection
   * @see <a href="http://mathworld.wolfram.com/LambertConformalConicProjection.html">Lambert Conformal Conic Projection</a>
   * @param {Number} x X of point in Cartesian system as integer
   * @param {Number} y Y of point in Cartesian system as integer
   * @param {Number} c Central meridian in degrees
   */
  lcc_inv: function(xCoord, yCoord, c){
    var x = xCoord / this.radius,
        y = yCoord / this.radius,
        fi0 = 0,
        lambda0 = c * this.radDeg,
        fi1 = 33 * this.radDeg,
        fi2 = 45 * this.radDeg,
        n = Math.log( Math.cos(fi1) * (1 / Math.cos(fi2)) ) / Math.log( Math.tan( Math.PI / 4 + fi2 / 2) * (1 / Math.tan( Math.PI / 4 + fi1 / 2) ) ),
        F = ( Math.cos(fi1) * Math.pow( Math.tan( Math.PI / 4 + fi1 / 2 ), n ) ) / n,
        ro0 = F * Math.pow( 1 / Math.tan( Math.PI / 4 + fi0 / 2 ), n ),
        ro = this.sgn(n) * Math.sqrt(x*x+(ro0-y)*(ro0-y)),
        theta = Math.atan( x / (ro0 - y) );

    return {
      lat: (2 * Math.atan(Math.pow(F/ro, 1/n)) - Math.PI / 2) * this.degRad,
      lng: (lambda0 + theta / n) * this.degRad
    };
  }
};jvm.MapObject = function(config){};

jvm.MapObject.prototype.getLabelText = function(key){
  var text;

  if (this.config.label) {
    if (typeof this.config.label.render === 'function') {
      text = this.config.label.render(key);
    } else {
      text = key;
    }
  } else {
    text = null;
  }
  return text;
}

jvm.MapObject.prototype.getLabelOffsets = function(key){
  var offsets;

  if (this.config.label) {
    if (typeof this.config.label.offsets === 'function') {
      offsets = this.config.label.offsets(key);
    } else if (typeof this.config.label.offsets === 'object') {
      offsets = this.config.label.offsets[key];
    }
  }
  return offsets || [0, 0];
}

/**
 * Set hovered state to the element. Hovered state means mouse cursor is over element. Styles will be updates respectively.
 * @param {Boolean} isHovered <code>true</code> to make element hovered, <code>false</code> otherwise.
 */
jvm.MapObject.prototype.setHovered = function(isHovered){
  if (this.isHovered !== isHovered) {
    this.isHovered = isHovered;
    this.shape.isHovered = isHovered;
    this.shape.updateStyle();
    if (this.label) {
      this.label.isHovered = isHovered;
      this.label.updateStyle();
    }
  }
};

/**
 * Set selected state to the element. Styles will be updates respectively.
 * @param {Boolean} isSelected <code>true</code> to make element selected, <code>false</code> otherwise.
 */
jvm.MapObject.prototype.setSelected = function(isSelected){
  if (this.isSelected !== isSelected) {
    this.isSelected = isSelected;
    this.shape.isSelected = isSelected;
    this.shape.updateStyle();
    if (this.label) {
      this.label.isSelected = isSelected;
      this.label.updateStyle();
    }
    jvm.$(this.shape).trigger('selected', [isSelected]);
  }
};

jvm.MapObject.prototype.setStyle = function(){
	this.shape.setStyle.apply(this.shape, arguments);
};

jvm.MapObject.prototype.remove = function(){
  this.shape.remove();
  if (this.label) {
    this.label.remove();
  }
};jvm.Region = function(config){
  var bbox,
      text,
      offsets,
      labelDx,
      labelDy;

  this.config = config;
  this.map = this.config.map;

  this.shape = config.canvas.addPath({
    d: config.path,
    'data-code': config.code
  }, config.style, config.canvas.rootElement);
  this.shape.addClass('jvectormap-region jvectormap-element');

  bbox = this.shape.getBBox();

  text = this.getLabelText(config.code);
  if (this.config.label && text) {
    offsets = this.getLabelOffsets(config.code);
    this.labelX = bbox.x + bbox.width / 2 + offsets[0];
    this.labelY = bbox.y + bbox.height / 2 + offsets[1];
    this.label = config.canvas.addText({
      text: text,
      'text-anchor': 'middle',
      'alignment-baseline': 'central',
      x: this.labelX,
      y: this.labelY,
      'data-code': config.code
    }, config.labelStyle, config.labelsGroup);
    this.label.addClass('jvectormap-region jvectormap-element');
  }
};

jvm.inherits(jvm.Region, jvm.MapObject);

jvm.Region.prototype.updateLabelPosition = function(){
  if (this.label) {
    this.label.set({
      x: this.labelX * this.map.scale + this.map.transX * this.map.scale,
      y: this.labelY * this.map.scale + this.map.transY * this.map.scale
    });
  }
};jvm.Marker = function(config){
  var text,
      offsets;

  this.config = config;
  this.map = this.config.map;

  this.isImage = !!this.config.style.initial.image;
  this.createShape();

  text = this.getLabelText(config.index);
  if (this.config.label && text) {
    this.offsets = this.getLabelOffsets(config.index);
    this.labelX = config.cx / this.map.scale - this.map.transX;
    this.labelY = config.cy / this.map.scale - this.map.transY;
    this.label = config.canvas.addText({
      text: text,
      'data-index': config.index,
      dy: "0.6ex",
      x: this.labelX,
      y: this.labelY
    }, config.labelStyle, config.labelsGroup);

    this.label.addClass('jvectormap-marker jvectormap-element');
  }
};

jvm.inherits(jvm.Marker, jvm.MapObject);

jvm.Marker.prototype.createShape = function(){
  var that = this;

  if (this.shape) {
    this.shape.remove();
  }
  this.shape = this.config.canvas[this.isImage ? 'addImage' : 'addCircle']({
    "data-index": this.config.index,
    cx: this.config.cx,
    cy: this.config.cy
  }, this.config.style, this.config.group);

  this.shape.addClass('jvectormap-marker jvectormap-element');

  if (this.isImage) {
    jvm.$(this.shape.node).on('imageloaded', function(){
      that.updateLabelPosition();
    });
  }
};

jvm.Marker.prototype.updateLabelPosition = function(){
  if (this.label) {
    this.label.set({
      x: this.labelX * this.map.scale + this.offsets[0] +
         this.map.transX * this.map.scale + 5 + (this.isImage ? (this.shape.width || 0) / 2 : this.shape.properties.r),
      y: this.labelY * this.map.scale + this.map.transY * this.map.scale + this.offsets[1]
    });
  }
};

jvm.Marker.prototype.setStyle = function(property, value){
  var isImage;

  jvm.Marker.parentClass.prototype.setStyle.apply(this, arguments);

  if (property === 'r') {
    this.updateLabelPosition();
  }

  isImage = !!this.shape.get('image');
  if (isImage != this.isImage) {
    this.isImage = isImage;
    this.config.style = jvm.$.extend(true, {}, this.shape.style);
    this.createShape();
  }
};/**
 * Creates map, draws paths, binds events.
 * @constructor
 * @param {Object} params Parameters to initialize map with.
 * @param {String} params.map Name of the map in the format <code>territory_proj_lang</code> where <code>territory</code> is a unique code or name of the territory which the map represents (ISO 3166 standard is used where possible), <code>proj</code> is a name of projection used to generate representation of the map on the plane (projections are named according to the conventions of proj4 utility) and <code>lang</code> is a code of the language, used for the names of regions.
 * @param {String} params.backgroundColor Background color of the map in CSS format.
 * @param {Boolean} params.zoomOnScroll When set to true map could be zoomed using mouse scroll. Default value is <code>true</code>.
 * @param {Boolean} params.zoomOnScrollSpeed Mouse scroll speed. Number from 1 to 10. Default value is <code>3</code>.
 * @param {Boolean} params.panOnDrag When set to true, the map pans when being dragged. Default value is <code>true</code>.
 * @param {Number} params.zoomMax Indicates the maximum zoom ratio which could be reached zooming the map. Default value is <code>8</code>.
 * @param {Number} params.zoomMin Indicates the minimum zoom ratio which could be reached zooming the map. Default value is <code>1</code>.
 * @param {Number} params.zoomStep Indicates the multiplier used to zoom map with +/- buttons. Default value is <code>1.6</code>.
 * @param {Boolean} params.zoomAnimate Indicates whether or not to animate changing of map zoom with zoom buttons.
 * @param {Boolean} params.regionsSelectable When set to true regions of the map could be selected. Default value is <code>false</code>.
 * @param {Boolean} params.regionsSelectableOne Allow only one region to be selected at the moment. Default value is <code>false</code>.
 * @param {Boolean} params.markersSelectable When set to true markers on the map could be selected. Default value is <code>false</code>.
 * @param {Boolean} params.markersSelectableOne Allow only one marker to be selected at the moment. Default value is <code>false</code>.
 * @param {Object} params.regionStyle Set the styles for the map's regions. Each region or marker has four states: <code>initial</code> (default state), <code>hover</code> (when the mouse cursor is over the region or marker), <code>selected</code> (when region or marker is selected), <code>selectedHover</code> (when the mouse cursor is over the region or marker and it's selected simultaneously). Styles could be set for each of this states. Default value for that parameter is:
<pre>{
  initial: {
    fill: 'white',
    "fill-opacity": 1,
    stroke: 'none',
    "stroke-width": 0,
    "stroke-opacity": 1
  },
  hover: {
    "fill-opacity": 0.8,
    cursor: 'pointer'
  },
  selected: {
    fill: 'yellow'
  },
  selectedHover: {
  }
}</pre>
* @param {Object} params.regionLabelStyle Set the styles for the regions' labels. Each region or marker has four states: <code>initial</code> (default state), <code>hover</code> (when the mouse cursor is over the region or marker), <code>selected</code> (when region or marker is selected), <code>selectedHover</code> (when the mouse cursor is over the region or marker and it's selected simultaneously). Styles could be set for each of this states. Default value for that parameter is:
<pre>{
  initial: {
    'font-family': 'Verdana',
    'font-size': '12',
    'font-weight': 'bold',
    cursor: 'default',
    fill: 'black'
  },
  hover: {
    cursor: 'pointer'
  }
}</pre>
 * @param {Object} params.markerStyle Set the styles for the map's markers. Any parameter suitable for <code>regionStyle</code> could be used as well as numeric parameter <code>r</code> to set the marker's radius. Default value for that parameter is:
<pre>{
  initial: {
    fill: 'grey',
    stroke: '#505050',
    "fill-opacity": 1,
    "stroke-width": 1,
    "stroke-opacity": 1,
    r: 5
  },
  hover: {
    stroke: 'black',
    "stroke-width": 2,
    cursor: 'pointer'
  },
  selected: {
    fill: 'blue'
  },
  selectedHover: {
  }
}</pre>
 * @param {Object} params.markerLabelStyle Set the styles for the markers' labels. Default value for that parameter is:
<pre>{
  initial: {
    'font-family': 'Verdana',
    'font-size': '12',
    'font-weight': 'bold',
    cursor: 'default',
    fill: 'black'
  },
  hover: {
    cursor: 'pointer'
  }
}</pre>
 * @param {Object|Array} params.markers Set of markers to add to the map during initialization. In case of array is provided, codes of markers will be set as string representations of array indexes. Each marker is represented by <code>latLng</code> (array of two numeric values), <code>name</code> (string which will be show on marker's tip) and any marker styles.
 * @param {Object} params.series Object with two keys: <code>markers</code> and <code>regions</code>. Each of which is an array of series configs to be applied to the respective map elements. See <a href="jvm.DataSeries.html">DataSeries</a> description for a list of parameters available.
 * @param {Object|String} params.focusOn This parameter sets the initial position and scale of the map viewport. See <code>setFocus</code> docuemntation for possible parameters.
 * @param {Object} params.labels Defines parameters for rendering static labels. Object could contain two keys: <code>regions</code> and <code>markers</code>. Each key value defines configuration object with the following possible options:
<ul>
  <li><code>render {Function}</code> - defines method for converting region code or marker index to actual label value.</li>
  <li><code>offsets {Object|Function}</code> - provides method or object which could be used to define label offset by region code or marker index.</li>
</ul>
<b>Plase note: static labels feature is not supported in Internet Explorer 8 and below.</b>
 * @param {Array|Object|String} params.selectedRegions Set initially selected regions.
 * @param {Array|Object|String} params.selectedMarkers Set initially selected markers.
 * @param {Function} params.onRegionTipShow <code>(Event e, Object tip, String code)</code> Will be called right before the region tip is going to be shown.
 * @param {Function} params.onRegionOver <code>(Event e, String code)</code> Will be called on region mouse over event.
 * @param {Function} params.onRegionOut <code>(Event e, String code)</code> Will be called on region mouse out event.
 * @param {Function} params.onRegionClick <code>(Event e, String code)</code> Will be called on region click event.
 * @param {Function} params.onRegionSelected <code>(Event e, String code, Boolean isSelected, Array selectedRegions)</code> Will be called when region is (de)selected. <code>isSelected</code> parameter of the callback indicates whether region is selected or not. <code>selectedRegions</code> contains codes of all currently selected regions.
 * @param {Function} params.onMarkerTipShow <code>(Event e, Object tip, String code)</code> Will be called right before the marker tip is going to be shown.
 * @param {Function} params.onMarkerOver <code>(Event e, String code)</code> Will be called on marker mouse over event.
 * @param {Function} params.onMarkerOut <code>(Event e, String code)</code> Will be called on marker mouse out event.
 * @param {Function} params.onMarkerClick <code>(Event e, String code)</code> Will be called on marker click event.
 * @param {Function} params.onMarkerSelected <code>(Event e, String code, Boolean isSelected, Array selectedMarkers)</code> Will be called when marker is (de)selected. <code>isSelected</code> parameter of the callback indicates whether marker is selected or not. <code>selectedMarkers</code> contains codes of all currently selected markers.
 * @param {Function} params.onViewportChange <code>(Event e, Number scale)</code> Triggered when the map's viewport is changed (map was panned or zoomed).
 */
jvm.Map = function(params) {
  var map = this,
      e;

  this.params = jvm.$.extend(true, {}, jvm.Map.defaultParams, params);

  if (!jvm.Map.maps[this.params.map]) {
    throw new Error('Attempt to use map which was not loaded: '+this.params.map);
  }

  this.mapData = jvm.Map.maps[this.params.map];
  this.markers = {};
  this.regions = {};
  this.regionsColors = {};
  this.regionsData = {};

  this.container = jvm.$('<div>').addClass('jvectormap-container');
  if (this.params.container) {
    this.params.container.append( this.container );
  }
  this.container.data('mapObject', this);

  this.defaultWidth = this.mapData.width;
  this.defaultHeight = this.mapData.height;

  this.setBackgroundColor(this.params.backgroundColor);

  this.onResize = function(){
    map.updateSize();
  }
  jvm.$(window).resize(this.onResize);

  for (e in jvm.Map.apiEvents) {
    if (this.params[e]) {
      this.container.bind(jvm.Map.apiEvents[e]+'.jvectormap', this.params[e]);
    }
  }

  this.canvas = new jvm.VectorCanvas(this.container[0], this.width, this.height);

  if (this.params.bindTouchEvents) {
    if (('ontouchstart' in window) || (window.DocumentTouch && document instanceof DocumentTouch)) {
      this.bindContainerTouchEvents();
    } else if (window.MSGesture) {
      this.bindContainerPointerEvents();
    }
  }
  this.bindContainerEvents();
  this.bindElementEvents();
  this.createTip();
  if (this.params.zoomButtons) {
    this.bindZoomButtons();
  }

  this.createRegions();
  this.createMarkers(this.params.markers || {});

  this.updateSize();

  if (this.params.focusOn) {
    if (typeof this.params.focusOn === 'string') {
      this.params.focusOn = {region: this.params.focusOn};
    } else if (jvm.$.isArray(this.params.focusOn)) {
      this.params.focusOn = {regions: this.params.focusOn};
    }
    this.setFocus(this.params.focusOn);
  }

  if (this.params.selectedRegions) {
    this.setSelectedRegions(this.params.selectedRegions);
  }
  if (this.params.selectedMarkers) {
    this.setSelectedMarkers(this.params.selectedMarkers);
  }

  this.legendCntHorizontal = jvm.$('<div/>').addClass('jvectormap-legend-cnt jvectormap-legend-cnt-h');
  this.legendCntVertical = jvm.$('<div/>').addClass('jvectormap-legend-cnt jvectormap-legend-cnt-v');
  this.container.append(this.legendCntHorizontal);
  this.container.append(this.legendCntVertical);

  if (this.params.series) {
    this.createSeries();
  }
};

jvm.Map.prototype = {
  transX: 0,
  transY: 0,
  scale: 1,
  baseTransX: 0,
  baseTransY: 0,
  baseScale: 1,

  width: 0,
  height: 0,

  /**
   * Set background color of the map.
   * @param {String} backgroundColor Background color in CSS format.
   */
  setBackgroundColor: function(backgroundColor) {
    this.container.css('background-color', backgroundColor);
  },

  resize: function() {
    var curBaseScale = this.baseScale;
    if (this.width / this.height > this.defaultWidth / this.defaultHeight) {
      this.baseScale = this.height / this.defaultHeight;
      this.baseTransX = Math.abs(this.width - this.defaultWidth * this.baseScale) / (2 * this.baseScale);
    } else {
      this.baseScale = this.width / this.defaultWidth;
      this.baseTransY = Math.abs(this.height - this.defaultHeight * this.baseScale) / (2 * this.baseScale);
    }
    this.scale *= this.baseScale / curBaseScale;
    this.transX *= this.baseScale / curBaseScale;
    this.transY *= this.baseScale / curBaseScale;
  },

  /**
   * Synchronize the size of the map with the size of the container. Suitable in situations where the size of the container is changed programmatically or container is shown after it became visible.
   */
  updateSize: function(){
    this.width = this.container.width();
    this.height = this.container.height();
    this.resize();
    this.canvas.setSize(this.width, this.height);
    this.applyTransform();
  },

  /**
   * Reset all the series and show the map with the initial zoom.
   */
  reset: function() {
    var key,
        i;

    for (key in this.series) {
      for (i = 0; i < this.series[key].length; i++) {
        this.series[key][i].clear();
      }
    }
    this.scale = this.baseScale;
    this.transX = this.baseTransX;
    this.transY = this.baseTransY;
    this.applyTransform();
  },

  applyTransform: function() {
    var maxTransX,
        maxTransY,
        minTransX,
        minTransY;

    if (this.defaultWidth * this.scale <= this.width) {
      maxTransX = (this.width - this.defaultWidth * this.scale) / (2 * this.scale);
      minTransX = (this.width - this.defaultWidth * this.scale) / (2 * this.scale);
    } else {
      maxTransX = 0;
      minTransX = (this.width - this.defaultWidth * this.scale) / this.scale;
    }

    if (this.defaultHeight * this.scale <= this.height) {
      maxTransY = (this.height - this.defaultHeight * this.scale) / (2 * this.scale);
      minTransY = (this.height - this.defaultHeight * this.scale) / (2 * this.scale);
    } else {
      maxTransY = 0;
      minTransY = (this.height - this.defaultHeight * this.scale) / this.scale;
    }

    if (this.transY > maxTransY) {
      this.transY = maxTransY;
    } else if (this.transY < minTransY) {
      this.transY = minTransY;
    }
    if (this.transX > maxTransX) {
      this.transX = maxTransX;
    } else if (this.transX < minTransX) {
      this.transX = minTransX;
    }

    this.canvas.applyTransformParams(this.scale, this.transX, this.transY);

    if (this.markers) {
      this.repositionMarkers();
    }

    this.repositionLabels();

    this.container.trigger('viewportChange', [this.scale/this.baseScale, this.transX, this.transY]);
  },

  bindContainerEvents: function(){
    var mouseDown = false,
        oldPageX,
        oldPageY,
        map = this;

    if (this.params.panOnDrag) {
      this.container.mousemove(function(e){
        if (mouseDown) {
          map.transX -= (oldPageX - e.pageX) / map.scale;
          map.transY -= (oldPageY - e.pageY) / map.scale;

          map.applyTransform();

          oldPageX = e.pageX;
          oldPageY = e.pageY;
        }
        return false;
      }).mousedown(function(e){
        mouseDown = true;
        oldPageX = e.pageX;
        oldPageY = e.pageY;
        return false;
      });

      this.onContainerMouseUp = function(){
        mouseDown = false;
      };
      jvm.$('body').mouseup(this.onContainerMouseUp);
    }

    if (this.params.zoomOnScroll) {
      this.container.mousewheel(function(event, delta, deltaX, deltaY) {
        var offset = jvm.$(map.container).offset(),
            centerX = event.pageX - offset.left,
            centerY = event.pageY - offset.top,
            zoomStep = Math.pow(1 + map.params.zoomOnScrollSpeed / 1000, event.deltaFactor * event.deltaY);

        map.tip.hide();

        map.setScale(map.scale * zoomStep, centerX, centerY);
        event.preventDefault();
      });
    }
  },

  bindContainerTouchEvents: function(){
    var touchStartScale,
        touchStartDistance,
        map = this,
        touchX,
        touchY,
        centerTouchX,
        centerTouchY,
        lastTouchesLength,
        handleTouchEvent = function(e){
          var touches = e.originalEvent.touches,
              offset,
              scale,
              transXOld,
              transYOld;

          if (e.type == 'touchstart') {
            lastTouchesLength = 0;
          }

          if (touches.length == 1) {
            if (lastTouchesLength == 1) {
              transXOld = map.transX;
              transYOld = map.transY;
              map.transX -= (touchX - touches[0].pageX) / map.scale;
              map.transY -= (touchY - touches[0].pageY) / map.scale;
              map.applyTransform();
              map.tip.hide();
              if (transXOld != map.transX || transYOld != map.transY) {
                e.preventDefault();
              }
            }
            touchX = touches[0].pageX;
            touchY = touches[0].pageY;
          } else if (touches.length == 2) {
            if (lastTouchesLength == 2) {
              scale = Math.sqrt(
                Math.pow(touches[0].pageX - touches[1].pageX, 2) +
                Math.pow(touches[0].pageY - touches[1].pageY, 2)
              ) / touchStartDistance;
              map.setScale(
                touchStartScale * scale,
                centerTouchX,
                centerTouchY
              )
              map.tip.hide();
              e.preventDefault();
            } else {
              offset = jvm.$(map.container).offset();
              if (touches[0].pageX > touches[1].pageX) {
                centerTouchX = touches[1].pageX + (touches[0].pageX - touches[1].pageX) / 2;
              } else {
                centerTouchX = touches[0].pageX + (touches[1].pageX - touches[0].pageX) / 2;
              }
              if (touches[0].pageY > touches[1].pageY) {
                centerTouchY = touches[1].pageY + (touches[0].pageY - touches[1].pageY) / 2;
              } else {
                centerTouchY = touches[0].pageY + (touches[1].pageY - touches[0].pageY) / 2;
              }
              centerTouchX -= offset.left;
              centerTouchY -= offset.top;
              touchStartScale = map.scale;
              touchStartDistance = Math.sqrt(
                Math.pow(touches[0].pageX - touches[1].pageX, 2) +
                Math.pow(touches[0].pageY - touches[1].pageY, 2)
              );
            }
          }

          lastTouchesLength = touches.length;
        };

    jvm.$(this.container).bind('touchstart', handleTouchEvent);
    jvm.$(this.container).bind('touchmove', handleTouchEvent);
  },

  bindContainerPointerEvents: function(){
    var map = this,
        gesture = new MSGesture(),
        element = this.container[0],
        handlePointerDownEvent = function(e){
          gesture.addPointer(e.pointerId);
        },
        handleGestureEvent = function(e){
          var offset,
              scale,
              transXOld,
              transYOld;

          if (e.translationX != 0 || e.translationY != 0) {
            transXOld = map.transX;
            transYOld = map.transY;
            map.transX += e.translationX / map.scale;
            map.transY += e.translationY / map.scale;
            map.applyTransform();
            map.tip.hide();
            if (transXOld != map.transX || transYOld != map.transY) {
              e.preventDefault();
            }
          }
          if (e.scale != 1) {
            map.setScale(
              map.scale * e.scale,
              e.offsetX,
              e.offsetY
            )
            map.tip.hide();
            e.preventDefault();
          }
        };

    gesture.target = element;
    element.addEventListener("MSGestureChange", handleGestureEvent, false);
    element.addEventListener("pointerdown", handlePointerDownEvent, false);
  },

  bindElementEvents: function(){
    var map = this,
        pageX,
        pageY,
        mouseMoved;

    this.container.mousemove(function(e){
      if (Math.abs(pageX - e.pageX) + Math.abs(pageY - e.pageY) > 2) {
        mouseMoved = true;
      }
    });

    /* Can not use common class selectors here because of the bug in jQuery
       SVG handling, use with caution. */
    this.container.delegate("[class~='jvectormap-element']", 'mouseover mouseout', function(e){
      var baseVal = jvm.$(this).attr('class').baseVal || jvm.$(this).attr('class'),
          type = baseVal.indexOf('jvectormap-region') === -1 ? 'marker' : 'region',
          code = type == 'region' ? jvm.$(this).attr('data-code') : jvm.$(this).attr('data-index'),
          element = type == 'region' ? map.regions[code].element : map.markers[code].element,
          tipText = type == 'region' ? map.mapData.paths[code].name : (map.markers[code].config.name || ''),
          tipShowEvent = jvm.$.Event(type+'TipShow.jvectormap'),
          overEvent = jvm.$.Event(type+'Over.jvectormap');

      if (e.type == 'mouseover') {
        map.container.trigger(overEvent, [code]);
        if (!overEvent.isDefaultPrevented()) {
          element.setHovered(true);
        }

        map.tip.text(tipText);
        map.container.trigger(tipShowEvent, [map.tip, code]);
        if (!tipShowEvent.isDefaultPrevented()) {
          map.tip.show();
          map.tipWidth = map.tip.width();
          map.tipHeight = map.tip.height();
        }
      } else {
        element.setHovered(false);
        map.tip.hide();
        map.container.trigger(type+'Out.jvectormap', [code]);
      }
    });

    /* Can not use common class selectors here because of the bug in jQuery
       SVG handling, use with caution. */
    this.container.delegate("[class~='jvectormap-element']", 'mousedown', function(e){
      pageX = e.pageX;
      pageY = e.pageY;
      mouseMoved = false;
    });

    /* Can not use common class selectors here because of the bug in jQuery
       SVG handling, use with caution. */
    this.container.delegate("[class~='jvectormap-element']", 'mouseup', function(){
      var baseVal = jvm.$(this).attr('class').baseVal ? jvm.$(this).attr('class').baseVal : jvm.$(this).attr('class'),
          type = baseVal.indexOf('jvectormap-region') === -1 ? 'marker' : 'region',
          code = type == 'region' ? jvm.$(this).attr('data-code') : jvm.$(this).attr('data-index'),
          clickEvent = jvm.$.Event(type+'Click.jvectormap'),
          element = type == 'region' ? map.regions[code].element : map.markers[code].element;

      if (!mouseMoved) {
        map.container.trigger(clickEvent, [code]);
        if ((type === 'region' && map.params.regionsSelectable) || (type === 'marker' && map.params.markersSelectable)) {
          if (!clickEvent.isDefaultPrevented()) {
            if (map.params[type+'sSelectableOne']) {
              map.clearSelected(type+'s');
            }
            element.setSelected(!element.isSelected);
          }
        }
      }
    });
  },

  bindZoomButtons: function() {
    var map = this;

    jvm.$('<div/>').addClass('jvectormap-zoomin').text('+').appendTo(this.container);
    jvm.$('<div/>').addClass('jvectormap-zoomout').html('&#x2212;').appendTo(this.container);

    this.container.find('.jvectormap-zoomin').click(function(){
      map.setScale(map.scale * map.params.zoomStep, map.width / 2, map.height / 2, false, map.params.zoomAnimate);
    });
    this.container.find('.jvectormap-zoomout').click(function(){
      map.setScale(map.scale / map.params.zoomStep, map.width / 2, map.height / 2, false, map.params.zoomAnimate);
    });
  },

  createTip: function(){
    var map = this;

    this.tip = jvm.$('<div/>').addClass('jvectormap-tip').appendTo(jvm.$('body'));

    this.container.mousemove(function(e){
      var left = e.pageX-15-map.tipWidth,
          top = e.pageY-15-map.tipHeight;

      if (left < 5) {
        left = e.pageX + 15;
      }
      if (top < 5) {
        top = e.pageY + 15;
      }

      map.tip.css({
        left: left,
        top: top
      });
    });
  },

  setScale: function(scale, anchorX, anchorY, isCentered, animate) {
    var viewportChangeEvent = jvm.$.Event('zoom.jvectormap'),
        interval,
        that = this,
        i = 0,
        count = Math.abs(Math.round((scale - this.scale) * 60 / Math.max(scale, this.scale))),
        scaleStart,
        scaleDiff,
        transXStart,
        transXDiff,
        transYStart,
        transYDiff,
        transX,
        transY,
        deferred = new jvm.$.Deferred();

    if (scale > this.params.zoomMax * this.baseScale) {
      scale = this.params.zoomMax * this.baseScale;
    } else if (scale < this.params.zoomMin * this.baseScale) {
      scale = this.params.zoomMin * this.baseScale;
    }

    if (typeof anchorX != 'undefined' && typeof anchorY != 'undefined') {
      zoomStep = scale / this.scale;
      if (isCentered) {
        transX = anchorX + this.defaultWidth * (this.width / (this.defaultWidth * scale)) / 2;
        transY = anchorY + this.defaultHeight * (this.height / (this.defaultHeight * scale)) / 2;
      } else {
        transX = this.transX - (zoomStep - 1) / scale * anchorX;
        transY = this.transY - (zoomStep - 1) / scale * anchorY;
      }
    }

    if (animate && count > 0)  {
      scaleStart = this.scale;
      scaleDiff = (scale - scaleStart) / count;
      transXStart = this.transX * this.scale;
      transYStart = this.transY * this.scale;
      transXDiff = (transX * scale - transXStart) / count;
      transYDiff = (transY * scale - transYStart) / count;
      interval = setInterval(function(){
        i += 1;
        that.scale = scaleStart + scaleDiff * i;
        that.transX = (transXStart + transXDiff * i) / that.scale;
        that.transY = (transYStart + transYDiff * i) / that.scale;
        that.applyTransform();
        if (i == count) {
          clearInterval(interval);
          that.container.trigger(viewportChangeEvent, [scale/that.baseScale]);
          deferred.resolve();
        }
      }, 10);
    } else {
      this.transX = transX;
      this.transY = transY;
      this.scale = scale;
      this.applyTransform();
      this.container.trigger(viewportChangeEvent, [scale/this.baseScale]);
      deferred.resolve();
    }

    return deferred;
  },

  /**
   * Set the map's viewport to the specific point and set zoom of the map to the specific level. Point and zoom level could be defined in two ways: using the code of some region to focus on or a central point and zoom level as numbers.
   * @param This method takes a configuration object as the single argument. The options passed to it are the following:
   * @param {Array} params.regions Array of region codes to zoom to.
   * @param {String} params.region Region code to zoom to.
   * @param {Number} params.scale Map scale to set.
   * @param {Number} params.lat Latitude to set viewport to.
   * @param {Number} params.lng Longitude to set viewport to.
   * @param {Number} params.x Number from 0 to 1 specifying the horizontal coordinate of the central point of the viewport.
   * @param {Number} params.y Number from 0 to 1 specifying the vertical coordinate of the central point of the viewport.
   * @param {Boolean} params.animate Indicates whether or not to animate the scale change and transition.
   */
  setFocus: function(config){
    var bbox,
        itemBbox,
        newBbox,
        codes,
        i,
        point;

    config = config || {};

    if (config.region) {
      codes = [config.region];
    } else if (config.regions) {
      codes = config.regions;
    }

    if (codes) {
      for (i = 0; i < codes.length; i++) {
        if (this.regions[codes[i]]) {
          itemBbox = this.regions[codes[i]].element.shape.getBBox();
          if (itemBbox) {
            if (typeof bbox == 'undefined') {
              bbox = itemBbox;
            } else {
              newBbox = {
                x: Math.min(bbox.x, itemBbox.x),
                y: Math.min(bbox.y, itemBbox.y),
                width: Math.max(bbox.x + bbox.width, itemBbox.x + itemBbox.width) - Math.min(bbox.x, itemBbox.x),
                height: Math.max(bbox.y + bbox.height, itemBbox.y + itemBbox.height) - Math.min(bbox.y, itemBbox.y)
              }
              bbox = newBbox;
            }
          }
        }
      }
      return this.setScale(
        Math.min(this.width / bbox.width, this.height / bbox.height),
        - (bbox.x + bbox.width / 2),
        - (bbox.y + bbox.height / 2),
        true,
        config.animate
      );
    } else {
      if (config.lat && config.lng) {
        point = this.latLngToPoint(config.lat, config.lng);
        config.x = this.transX - point.x / this.scale;
        config.y = this.transY - point.y / this.scale;
      } else if (config.x && config.y) {
        config.x *= -this.defaultWidth;
        config.y *= -this.defaultHeight;
      }
      return this.setScale(config.scale * this.baseScale, config.x, config.y, true, config.animate);
    }
  },

  getSelected: function(type){
    var key,
        selected = [];

    for (key in this[type]) {
      if (this[type][key].element.isSelected) {
        selected.push(key);
      }
    }
    return selected;
  },

  /**
   * Return the codes of currently selected regions.
   * @returns {Array}
   */
  getSelectedRegions: function(){
    return this.getSelected('regions');
  },

  /**
   * Return the codes of currently selected markers.
   * @returns {Array}
   */
  getSelectedMarkers: function(){
    return this.getSelected('markers');
  },

  setSelected: function(type, keys){
    var i;

    if (typeof keys != 'object') {
      keys = [keys];
    }

    if (jvm.$.isArray(keys)) {
      for (i = 0; i < keys.length; i++) {
        this[type][keys[i]].element.setSelected(true);
      }
    } else {
      for (i in keys) {
        this[type][i].element.setSelected(!!keys[i]);
      }
    }
  },

  /**
   * Set or remove selected state for the regions.
   * @param {String|Array|Object} keys If <code>String</code> or <code>Array</code> the region(s) with the corresponding code(s) will be selected. If <code>Object</code> was provided its keys are  codes of regions, state of which should be changed. Selected state will be set if value is true, removed otherwise.
   */
  setSelectedRegions: function(keys){
    this.setSelected('regions', keys);
  },

  /**
   * Set or remove selected state for the markers.
   * @param {String|Array|Object} keys If <code>String</code> or <code>Array</code> the marker(s) with the corresponding code(s) will be selected. If <code>Object</code> was provided its keys are  codes of markers, state of which should be changed. Selected state will be set if value is true, removed otherwise.
   */
  setSelectedMarkers: function(keys){
    this.setSelected('markers', keys);
  },

  clearSelected: function(type){
    var select = {},
        selected = this.getSelected(type),
        i;

    for (i = 0; i < selected.length; i++) {
      select[selected[i]] = false;
    };

    this.setSelected(type, select);
  },

  /**
   * Remove the selected state from all the currently selected regions.
   */
  clearSelectedRegions: function(){
    this.clearSelected('regions');
  },

  /**
   * Remove the selected state from all the currently selected markers.
   */
  clearSelectedMarkers: function(){
    this.clearSelected('markers');
  },

  /**
   * Return the instance of Map. Useful when instantiated as a jQuery plug-in.
   * @returns {Map}
   */
  getMapObject: function(){
    return this;
  },

  /**
   * Return the name of the region by region code.
   * @returns {String}
   */
  getRegionName: function(code){
    return this.mapData.paths[code].name;
  },

  createRegions: function(){
    var key,
        region,
        map = this;

    this.regionLabelsGroup = this.regionLabelsGroup || this.canvas.addGroup();

    for (key in this.mapData.paths) {
      region = new jvm.Region({
        map: this,
        path: this.mapData.paths[key].path,
        code: key,
        style: jvm.$.extend(true, {}, this.params.regionStyle),
        labelStyle: jvm.$.extend(true, {}, this.params.regionLabelStyle),
        canvas: this.canvas,
        labelsGroup: this.regionLabelsGroup,
        label: this.canvas.mode != 'vml' ? (this.params.labels && this.params.labels.regions) : null
      });

      jvm.$(region.shape).bind('selected', function(e, isSelected){
        map.container.trigger('regionSelected.jvectormap', [jvm.$(this.node).attr('data-code'), isSelected, map.getSelectedRegions()]);
      });
      this.regions[key] = {
        element: region,
        config: this.mapData.paths[key]
      };
    }
  },

  createMarkers: function(markers) {
    var i,
        marker,
        point,
        markerConfig,
        markersArray,
        map = this;

    this.markersGroup = this.markersGroup || this.canvas.addGroup();
    this.markerLabelsGroup = this.markerLabelsGroup || this.canvas.addGroup();

    if (jvm.$.isArray(markers)) {
      markersArray = markers.slice();
      markers = {};
      for (i = 0; i < markersArray.length; i++) {
        markers[i] = markersArray[i];
      }
    }

    for (i in markers) {
      markerConfig = markers[i] instanceof Array ? {latLng: markers[i]} : markers[i];
      point = this.getMarkerPosition( markerConfig );

      if (point !== false) {
        marker = new jvm.Marker({
          map: this,
          style: jvm.$.extend(true, {}, this.params.markerStyle, {initial: markerConfig.style || {}}),
          labelStyle: jvm.$.extend(true, {}, this.params.markerLabelStyle),
          index: i,
          cx: point.x,
          cy: point.y,
          group: this.markersGroup,
          canvas: this.canvas,
          labelsGroup: this.markerLabelsGroup,
          label: this.canvas.mode != 'vml' ? (this.params.labels && this.params.labels.markers) : null
        });

        jvm.$(marker.shape).bind('selected', function(e, isSelected){
          map.container.trigger('markerSelected.jvectormap', [jvm.$(this.node).attr('data-index'), isSelected, map.getSelectedMarkers()]);
        });
        if (this.markers[i]) {
          this.removeMarkers([i]);
        }
        this.markers[i] = {element: marker, config: markerConfig};
      }
    }
  },

  repositionMarkers: function() {
    var i,
        point;

    for (i in this.markers) {
      point = this.getMarkerPosition( this.markers[i].config );
      if (point !== false) {
        this.markers[i].element.setStyle({cx: point.x, cy: point.y});
      }
    }
  },

  repositionLabels: function() {
    var key;

    for (key in this.regions) {
      this.regions[key].element.updateLabelPosition();
    }

    for (key in this.markers) {
      this.markers[key].element.updateLabelPosition();
    }
  },

  getMarkerPosition: function(markerConfig) {
    if (jvm.Map.maps[this.params.map].projection) {
      return this.latLngToPoint.apply(this, markerConfig.latLng || [0, 0]);
    } else {
      return {
        x: markerConfig.coords[0]*this.scale + this.transX*this.scale,
        y: markerConfig.coords[1]*this.scale + this.transY*this.scale
      };
    }
  },

  /**
   * Add one marker to the map.
   * @param {String} key Marker unique code.
   * @param {Object} marker Marker configuration parameters.
   * @param {Array} seriesData Values to add to the data series.
   */
  addMarker: function(key, marker, seriesData){
    var markers = {},
        data = [],
        values,
        i,
        seriesData = seriesData || [];

    markers[key] = marker;

    for (i = 0; i < seriesData.length; i++) {
      values = {};
      if (typeof seriesData[i] !== 'undefined') {
        values[key] = seriesData[i];
      }
      data.push(values);
    }
    this.addMarkers(markers, data);
  },

  /**
   * Add set of marker to the map.
   * @param {Object|Array} markers Markers to add to the map. In case of array is provided, codes of markers will be set as string representations of array indexes.
   * @param {Array} seriesData Values to add to the data series.
   */
  addMarkers: function(markers, seriesData){
    var i;

    seriesData = seriesData || [];

    this.createMarkers(markers);
    for (i = 0; i < seriesData.length; i++) {
      this.series.markers[i].setValues(seriesData[i] || {});
    };
  },

  /**
   * Remove some markers from the map.
   * @param {Array} markers Array of marker codes to be removed.
   */
  removeMarkers: function(markers){
    var i;

    for (i = 0; i < markers.length; i++) {
      this.markers[ markers[i] ].element.remove();
      delete this.markers[ markers[i] ];
    };
  },

  /**
   * Remove all markers from the map.
   */
  removeAllMarkers: function(){
    var i,
        markers = [];

    for (i in this.markers) {
      markers.push(i);
    }
    this.removeMarkers(markers)
  },

  /**
   * Converts coordinates expressed as latitude and longitude to the coordinates in pixels on the map.
   * @param {Number} lat Latitide of point in degrees.
   * @param {Number} lng Longitude of point in degrees.
   */
  latLngToPoint: function(lat, lng) {
    var point,
        proj = jvm.Map.maps[this.params.map].projection,
        centralMeridian = proj.centralMeridian,
        inset,
        bbox;

    if (lng < (-180 + centralMeridian)) {
      lng += 360;
    }

    point = jvm.Proj[proj.type](lat, lng, centralMeridian);

    inset = this.getInsetForPoint(point.x, point.y);
    if (inset) {
      bbox = inset.bbox;

      point.x = (point.x - bbox[0].x) / (bbox[1].x - bbox[0].x) * inset.width * this.scale;
      point.y = (point.y - bbox[0].y) / (bbox[1].y - bbox[0].y) * inset.height * this.scale;

      return {
        x: point.x + this.transX*this.scale + inset.left*this.scale,
        y: point.y + this.transY*this.scale + inset.top*this.scale
      };
     } else {
       return false;
     }
  },

  /**
   * Converts cartesian coordinates into coordinates expressed as latitude and longitude.
   * @param {Number} x X-axis of point on map in pixels.
   * @param {Number} y Y-axis of point on map in pixels.
   */
  pointToLatLng: function(x, y) {
    var proj = jvm.Map.maps[this.params.map].projection,
        centralMeridian = proj.centralMeridian,
        insets = jvm.Map.maps[this.params.map].insets,
        i,
        inset,
        bbox,
        nx,
        ny;

    for (i = 0; i < insets.length; i++) {
      inset = insets[i];
      bbox = inset.bbox;

      nx = x - (this.transX*this.scale + inset.left*this.scale);
      ny = y - (this.transY*this.scale + inset.top*this.scale);

      nx = (nx / (inset.width * this.scale)) * (bbox[1].x - bbox[0].x) + bbox[0].x;
      ny = (ny / (inset.height * this.scale)) * (bbox[1].y - bbox[0].y) + bbox[0].y;

      if (nx > bbox[0].x && nx < bbox[1].x && ny > bbox[0].y && ny < bbox[1].y) {
        return jvm.Proj[proj.type + '_inv'](nx, -ny, centralMeridian);
      }
    }

    return false;
  },

  getInsetForPoint: function(x, y){
    var insets = jvm.Map.maps[this.params.map].insets,
        i,
        bbox;

    for (i = 0; i < insets.length; i++) {
      bbox = insets[i].bbox;
      if (x > bbox[0].x && x < bbox[1].x && y > bbox[0].y && y < bbox[1].y) {
        return insets[i];
      }
    }
  },

  createSeries: function(){
    var i,
        key;

    this.series = {
      markers: [],
      regions: []
    };

    for (key in this.params.series) {
      for (i = 0; i < this.params.series[key].length; i++) {
        this.series[key][i] = new jvm.DataSeries(
          this.params.series[key][i],
          this[key],
          this
        );
      }
    }
  },

  /**
   * Gracefully remove the map and and all its accessories, unbind event handlers.
   */
  remove: function(){
    this.tip.remove();
    this.container.remove();
    jvm.$(window).unbind('resize', this.onResize);
    jvm.$('body').unbind('mouseup', this.onContainerMouseUp);
  }
};

jvm.Map.maps = {};
jvm.Map.defaultParams = {
  map: 'world_mill_en',
  backgroundColor: '#505050',
  zoomButtons: true,
  zoomOnScroll: true,
  zoomOnScrollSpeed: 3,
  panOnDrag: true,
  zoomMax: 8,
  zoomMin: 1,
  zoomStep: 1.6,
  zoomAnimate: true,
  regionsSelectable: false,
  markersSelectable: false,
  bindTouchEvents: true,
  regionStyle: {
    initial: {
      fill: 'white',
      "fill-opacity": 1,
      stroke: 'none',
      "stroke-width": 0,
      "stroke-opacity": 1
    },
    hover: {
      "fill-opacity": 0.8,
      cursor: 'pointer'
    },
    selected: {
      fill: 'yellow'
    },
    selectedHover: {
    }
  },
  regionLabelStyle: {
    initial: {
      'font-family': 'Verdana',
      'font-size': '12',
      'font-weight': 'bold',
      cursor: 'default',
      fill: 'black'
    },
    hover: {
      cursor: 'pointer'
    }
  },
  markerStyle: {
    initial: {
      fill: 'grey',
      stroke: '#505050',
      "fill-opacity": 1,
      "stroke-width": 1,
      "stroke-opacity": 1,
      r: 5
    },
    hover: {
      stroke: 'black',
      "stroke-width": 2,
      cursor: 'pointer'
    },
    selected: {
      fill: 'blue'
    },
    selectedHover: {
    }
  },
  markerLabelStyle: {
    initial: {
      'font-family': 'Verdana',
      'font-size': '12',
      'font-weight': 'bold',
      cursor: 'default',
      fill: 'black'
    },
    hover: {
      cursor: 'pointer'
    }
  }
};
jvm.Map.apiEvents = {
  onRegionTipShow: 'regionTipShow',
  onRegionOver: 'regionOver',
  onRegionOut: 'regionOut',
  onRegionClick: 'regionClick',
  onRegionSelected: 'regionSelected',
  onMarkerTipShow: 'markerTipShow',
  onMarkerOver: 'markerOver',
  onMarkerOut: 'markerOut',
  onMarkerClick: 'markerClick',
  onMarkerSelected: 'markerSelected',
  onViewportChange: 'viewportChange'
};/**
 * Creates map with drill-down functionality.
 * @constructor
 * @param {Object} params Parameters to initialize map with.
 * @param {Number} params.maxLevel Maximum number of levels user can go through
 * @param {Object} params.main Config of the main map. See <a href="./jvm-map/">jvm.Map</a> for more information.
 * @param {Function} params.mapNameByCode Function go generate map name by region code. Default value is:
<pre>
function(code, multiMap) {
  return code.toLowerCase()+'_'+
         multiMap.defaultProjection+'_en';
}
</pre>
 * @param {Function} params.mapUrlByCode Function to generate map url by region code. Default value is:
<pre>
function(code, multiMap){
  return 'jquery-jvectormap-data-'+
         code.toLowerCase()+'-'+
         multiMap.defaultProjection+'-en.js';
}
</pre>
 */
jvm.MultiMap = function(params) {
  var that = this;

  this.maps = {};
  this.params = jvm.$.extend(true, {}, jvm.MultiMap.defaultParams, params);
  this.params.maxLevel = this.params.maxLevel || Number.MAX_VALUE;
  this.params.main = this.params.main || {};
  this.params.main.multiMapLevel = 0;
  this.history = [ this.addMap(this.params.main.map, this.params.main) ];
  this.defaultProjection = this.history[0].mapData.projection.type;
  this.mapsLoaded = {};

  this.params.container.css({position: 'relative'});
  this.backButton = jvm.$('<div/>').addClass('jvectormap-goback').text('Back').appendTo(this.params.container);
  this.backButton.hide();
  this.backButton.click(function(){
    that.goBack();
  });

  this.spinner = jvm.$('<div/>').addClass('jvectormap-spinner').appendTo(this.params.container);
  this.spinner.hide();
};

jvm.MultiMap.prototype = {
  addMap: function(name, config){
    var cnt = jvm.$('<div/>').css({
      width: '100%',
      height: '100%'
    });

    this.params.container.append(cnt);

    this.maps[name] = new jvm.Map(jvm.$.extend(config, {container: cnt}));
    if (this.params.maxLevel > config.multiMapLevel) {
      this.maps[name].container.on('regionClick.jvectormap', {scope: this}, function(e, code){
        var multimap = e.data.scope,
            mapName = multimap.params.mapNameByCode(code, multimap);

        if (!multimap.drillDownPromise || multimap.drillDownPromise.state() !== 'pending') {
          multimap.drillDown(mapName, code);
        }
      });
    }


    return this.maps[name];
  },

  downloadMap: function(code){
    var that = this,
        deferred = jvm.$.Deferred();

    if (!this.mapsLoaded[code]) {
      jvm.$.get(this.params.mapUrlByCode(code, this)).then(function(){
        that.mapsLoaded[code] = true;
        deferred.resolve();
      }, function(){
        deferred.reject();
      });
    } else {
      deferred.resolve();
    }
    return deferred;
  },

  drillDown: function(name, code){
    var currentMap = this.history[this.history.length - 1],
        that = this,
        focusPromise = currentMap.setFocus({region: code, animate: true}),
        downloadPromise = this.downloadMap(code);

    focusPromise.then(function(){
      if (downloadPromise.state() === 'pending') {
        that.spinner.show();
      }
    });
    downloadPromise.always(function(){
      that.spinner.hide();
    });
    this.drillDownPromise = jvm.$.when(downloadPromise, focusPromise);
    this.drillDownPromise.then(function(){
      currentMap.params.container.hide();
      if (!that.maps[name]) {
        that.addMap(name, {map: name, multiMapLevel: currentMap.params.multiMapLevel + 1});
      } else {
        that.maps[name].params.container.show();
      }
      that.history.push( that.maps[name] );
      that.backButton.show();
    });
  },

  goBack: function(){
    var currentMap = this.history.pop(),
        prevMap = this.history[this.history.length - 1],
        that = this;

    currentMap.setFocus({scale: 1, x: 0.5, y: 0.5, animate: true}).then(function(){
      currentMap.params.container.hide();
      prevMap.params.container.show();
      prevMap.updateSize();
      if (that.history.length === 1) {
        that.backButton.hide();
      }
      prevMap.setFocus({scale: 1, x: 0.5, y: 0.5, animate: true});
    });
  }
};

jvm.MultiMap.defaultParams = {
  mapNameByCode: function(code, multiMap){
    return code.toLowerCase()+'_'+multiMap.defaultProjection+'_en';
  },
  mapUrlByCode: function(code, multiMap){
    return 'jquery-jvectormap-data-'+code.toLowerCase()+'-'+multiMap.defaultProjection+'-en.js';
  }
}

jQuery.fn.vectorMap('addMap', 'us_merc',{"insets": [{"width": 200, "top": 370, "height": 150.45417533741582, "bbox": [{"y": -11550668.73872687, "x": -19771895.08914502}, {"y": -6730133.1880498035, "x": -13363916.660010302}], "left": 10}, {"width": 100, "top": 400, "height": 71.51920738711357, "bbox": [{"y": -2541110.9649878046, "x": -16682694.225454755}, {"y": -2144973.2238830477, "x": -16128804.220829042}], "left": 220}, {"width": 900, "top": 0, "height": 482.5272441562262, "bbox": [{"y": -6341005.503342988, "x": -12778676.130802888}, {"y": -2892130.0668135933, "x": -6345903.8252634145}], "left": 0}], "paths": {"US-VA": {"path": "M759.82,259.25l0.64,-1.46l-0.16,-0.7l0.65,-0.63l-0.39,-0.7l0.69,-0.65l-0.06,-1.13l0.43,-0.2l0.02,-0.68l0.59,-0.11l0.37,-0.52l0.66,-1.92l0.95,-0.12l0.15,-0.79l0.41,-0.02l0.15,-1.43l-0.5,-0.51l0.79,-0.28l0.31,-0.8l2.49,-0.27l-0.3,2.16l-5.79,8.13l-0.14,0.98l-0.46,0.19l-0.54,0.87l-0.74,3.62l-0.49,-1.69l0.4,-0.71l-0.13,-0.64ZM641.21,273.09l7.37,-2.2l1.03,-1.91l0.75,-0.03l2.31,-0.98l0.34,-1.57l2.1,-1.29l0.44,-1.71l5.11,-2.74l5.13,-4.35l0.12,0.57l0.68,0.51l0.06,1.26l1.55,1.7l1.29,0.33l1.66,1.34l1.28,0.16l0.79,-0.22l0.89,-0.93l1.15,-0.29l0.7,-1.1l2.14,1.76l1.46,-0.7l2.17,-0.47l0.67,0.18l1.14,-0.65l0.46,-0.69l-0.25,-0.93l0.25,-0.28l1.57,0.84l3.37,-1.69l0.24,-0.03l0.34,0.72l0.62,0.06l2.55,-1.6l0.33,-0.75l-0.35,-0.52l1.07,-0.78l0.22,-0.54l-0.17,-0.52l-0.8,-0.54l1.2,-2.51l3.23,-3.71l0.91,-1.78l0.35,-1.66l1.93,-1.94l-0.01,-0.87l0.92,-1.01l0.68,-1.43l0.61,-2.76l1.03,0.38l0.73,1.75l3.33,1.12l0.61,-0.14l1.45,-2.02l0.65,-2.04l0.84,-0.78l0.29,-1.44l1.12,-1.85l1.55,1.06l0.53,-0.08l1.84,-2.63l1.12,-0.09l0.72,-0.96l0.88,-0.44l0.77,-1.5l1.75,-1.87l0.22,-2.36l0.85,-1.45l0.13,-1.81l7.31,5.96l0.64,-0.15l1.42,-3.38l2.33,0.48l0.44,0.64l0.9,0.42l-0.84,1.39l0.36,0.95l1.28,1.1l2.27,0.5l0.67,1.26l1.31,0.44l1.63,1.96l-0.3,1.15l0.12,1.2l-1.68,0.48l-0.28,0.52l-0.93,0.37l-1.52,4.29l-0.33,0.04l-0.16,0.46l0.77,1.05l-0.43,0.74l1.85,0.44l2.45,-0.75l0.6,-0.52l0.1,0.63l-0.6,0.48l1.48,1.33l0.13,1.05l1.35,0.81l1.75,0.24l0.68,0.56l0.86,-0.38l0.74,0.22l0.09,0.55l1.07,0.71l0.17,1.07l1.0,0.2l-0.05,0.27l0.95,0.62l2.35,1.17l0.13,0.85l-0.62,-0.5l-0.64,0.27l0.39,1.72l-0.43,0.4l0.35,0.85l-0.57,0.64l0.03,0.51l-1.01,-0.57l-0.35,-0.74l-0.69,0.01l-0.15,0.26l-1.63,-2.44l-0.49,-0.08l-0.23,-0.57l-0.53,0.17l-1.0,-1.45l-0.97,-0.59l-0.23,-0.63l-0.72,-0.54l-0.34,-1.28l-0.55,-0.73l-1.16,-0.4l-0.82,-0.94l-1.06,-0.21l-0.49,0.38l0.28,0.78l0.96,0.23l0.42,0.72l1.17,0.35l0.41,0.47l0.0,1.4l2.09,1.97l1.22,2.03l1.58,0.95l0.93,2.16l0.84,0.44l1.27,-0.09l0.89,0.64l-0.58,0.46l0.18,0.53l1.67,0.75l0.1,0.66l0.36,0.2l-0.14,1.62l-0.26,-0.74l-0.82,-0.25l-0.77,-1.1l-0.63,0.14l-0.51,1.25l0.42,0.77l-0.25,0.48l0.95,0.65l-1.31,0.3l-4.35,-5.39l-0.57,-0.04l-0.37,0.7l0.1,0.54l1.68,1.82l1.37,2.29l2.17,1.61l1.21,-0.28l0.19,0.96l1.01,0.46l-0.49,0.45l0.15,0.62l0.83,0.05l-0.26,0.97l-1.51,0.62l-0.35,-0.84l-2.47,-1.76l-0.02,-1.38l-0.4,-0.66l-0.77,-0.29l-1.16,0.29l-1.38,-0.71l-0.07,-1.05l-0.68,-0.22l-0.67,1.39l-0.97,-1.43l-1.01,0.33l-0.48,-0.45l-0.98,0.18l-1.96,-0.54l-0.54,0.78l0.22,0.5l3.64,1.0l0.63,-0.46l0.33,0.86l1.1,0.67l1.78,0.15l0.56,0.8l0.71,0.28l0.55,-0.28l0.13,2.15l1.13,0.42l0.14,0.42l1.29,0.96l0.23,0.64l-0.72,0.77l0.44,0.54l1.79,-0.75l0.74,0.16l0.72,0.8l0.67,-0.12l-0.32,-0.94l0.17,-0.72l-0.33,-0.31l3.43,0.94l0.96,-0.42l0.98,3.39l-0.49,0.53l-0.13,2.73l-0.87,-0.75l-0.25,0.74l-62.65,0.21l-17.72,-0.58l-10.57,-0.93l-0.84,0.4l-25.35,-0.13Z", "name": "Virginia"}, "US-PA": {"path": "M694.93,162.36l0.63,-0.05l4.8,-2.62l0.0,5.05l0.4,0.4l68.59,0.05l1.18,0.88l0.33,1.45l0.57,0.28l0.79,-0.12l0.98,0.83l-0.06,0.83l0.64,0.55l-0.29,0.5l0.16,2.69l1.25,2.36l1.78,1.21l2.08,0.37l0.46,0.88l-1.04,0.54l-1.04,1.17l-0.73,2.0l-2.13,2.69l-1.66,1.11l-0.16,0.75l1.22,1.97l-0.68,1.4l-0.88,0.19l-0.36,0.53l-0.24,1.38l0.25,2.84l0.43,0.37l1.13,0.12l0.29,1.96l0.49,0.87l0.44,0.34l0.67,-0.06l0.33,0.94l3.25,3.68l-2.77,1.42l-1.05,0.98l-2.04,1.12l-0.45,1.46l-1.5,0.68l-0.8,-0.07l-1.46,0.65l-0.44,0.5l-1.53,-0.5l-2.05,0.27l-1.37,0.95l-0.7,1.14l-73.25,-0.0l-0.01,-45.94l2.05,-0.76l3.52,-2.23Z", "name": "Pennsylvania"}, "US-TN": {"path": "M537.7,303.9l0.66,-0.56l0.37,-1.12l0.84,0.13l0.68,-0.65l-0.41,-4.31l1.41,-1.53l0.18,-1.14l1.05,-0.27l0.38,-0.4l-0.41,-1.21l0.61,-1.01l-0.66,-1.21l2.37,-1.09l1.08,-0.88l-0.02,-0.81l-0.58,-0.62l0.99,0.3l0.49,-0.28l-0.11,-1.2l-0.65,-0.85l0.11,-0.58l0.57,-1.18l1.0,-0.88l-0.95,-1.89l1.35,-0.11l0.44,-0.4l-0.07,-0.63l-0.93,-0.74l1.29,-0.49l0.19,-0.61l-0.38,-1.34l0.98,0.4l0.89,-0.85l21.29,0.01l0.4,-0.36l0.07,-1.19l-0.46,-2.12l2.57,0.25l0.7,0.6l20.65,-0.39l9.95,0.68l11.64,0.07l21.66,0.76l1.08,-0.35l26.63,0.14l0.75,-0.4l3.14,0.13l-0.56,1.11l0.23,0.82l-0.69,1.64l0.13,0.7l-0.93,-0.18l-1.82,1.27l-1.72,3.15l-0.68,0.56l-0.79,-0.83l-1.29,-0.25l-2.62,1.06l-1.69,2.12l-0.96,0.59l-0.14,-1.25l-0.58,-0.6l-0.51,0.05l-2.2,1.11l-0.57,1.14l-0.76,-0.33l-0.89,0.28l-0.28,0.67l0.16,0.67l-1.04,1.68l-1.12,-0.14l-1.72,0.71l-2.01,1.67l-0.72,0.13l-2.36,1.76l-3.63,0.06l-2.56,1.12l-0.54,0.82l-1.46,0.97l-0.59,2.45l-0.38,0.44l-1.47,0.2l-0.76,-0.26l-1.11,0.84l-0.59,4.47l-37.06,-0.05l-22.56,-0.38l-0.32,0.23l-31.68,-0.04Z", "name": "Tennessee"}, "US-WV": {"path": "M656.39,242.85l1.01,-1.59l0.05,-1.48l-0.36,-1.34l3.8,-0.73l0.46,-0.59l0.58,-2.42l1.06,0.01l0.49,-0.49l-0.43,-3.52l0.55,-0.49l0.8,-2.41l0.9,-1.36l0.45,-0.26l1.01,0.69l0.24,0.67l-0.31,1.01l0.58,0.54l0.81,-0.26l0.68,-1.14l0.95,0.17l0.29,-0.4l-0.21,-1.98l-0.56,-0.6l0.85,-0.56l0.07,-1.59l1.02,-1.64l1.6,-0.18l0.44,-1.4l1.16,-1.08l0.39,0.0l0.45,0.81l0.6,0.3l2.38,-1.02l1.67,-1.2l1.06,-1.49l2.93,-2.23l0.61,-1.83l-0.46,-1.04l1.07,-1.97l-0.07,-0.7l0.63,-0.43l0.4,-3.15l1.18,-3.45l0.64,-0.62l0.29,-1.02l-0.42,-1.56l0.35,-1.82l-1.09,-2.02l0.49,-0.38l1.12,-0.15l0.01,18.2l0.4,0.4l15.83,-0.01l-0.16,9.93l0.41,0.47l2.38,-1.82l1.0,-0.31l0.51,-0.84l1.89,-1.45l0.44,-0.88l0.53,-0.25l0.99,0.64l0.75,-0.14l1.74,-2.06l0.64,-0.29l0.09,-0.7l0.31,0.57l1.5,0.8l3.03,0.14l0.92,-0.63l0.41,-1.28l1.94,-0.25l1.28,-1.29l0.62,0.05l2.55,2.0l1.78,-0.26l-0.63,0.8l0.3,0.94l1.06,0.66l-0.12,0.87l0.91,0.6l0.03,1.53l-1.28,3.05l-7.17,-5.83l-0.66,0.08l-0.54,0.98l0.01,1.5l-0.81,1.34l-0.1,2.09l-1.73,1.85l-0.75,1.47l-0.76,0.32l-0.6,0.89l-0.78,-0.2l-0.43,0.23l-1.78,2.63l-1.48,-1.04l-0.66,0.1l-1.42,2.27l-0.22,1.31l-0.88,0.87l-0.64,2.02l-1.22,1.74l-2.8,-0.93l-0.97,-1.83l-1.5,-0.55l-0.56,0.29l-0.74,3.05l-1.58,2.38l0.02,0.86l-1.88,1.84l-0.44,1.84l-0.84,1.65l-3.19,3.65l-1.27,2.63l-0.01,0.74l0.9,0.66l-1.21,0.99l0.21,0.98l-2.19,1.37l-0.39,-0.66l-0.78,-0.02l-3.22,1.63l-0.81,-0.66l-1.24,-0.01l-0.58,0.74l0.19,1.08l-0.93,0.6l-0.65,-0.16l-2.19,0.47l-1.23,0.62l-1.69,-1.54l-0.67,-0.14l-1.02,1.24l-1.05,0.24l-1.33,1.06l-0.96,-0.11l-1.56,-1.29l-1.15,-0.23l-0.41,-0.74l-0.96,-0.74l-0.01,-1.14l-0.68,-0.67l0.41,-0.55l-0.15,-0.76l-0.72,-0.49l-1.94,-0.29l-0.91,-1.24l-1.7,-1.02l-0.47,-1.42l-1.18,-1.3l-0.37,-1.43l-0.78,-0.68l0.05,-0.99l-1.08,-1.06l-1.44,-2.38Z", "name": "West Virginia"}, "US-NV": {"path": "M156.98,303.22l-53.73,-51.28l-29.07,-25.88l-0.01,-60.92l92.04,-0.01l0.01,115.78l-1.22,3.1l-0.34,0.19l-1.17,-0.01l-1.15,-1.8l-0.73,-0.47l-1.22,0.37l-1.87,-0.62l-1.39,0.42l-1.45,1.09l-0.33,2.27l1.13,2.11l-0.39,0.9l-0.03,1.17l0.75,2.63l-0.31,2.3l1.17,3.07l0.3,2.64l-0.11,0.91l-0.87,0.43l0.35,1.1l-0.34,0.51Z", "name": "Nevada"}, "US-TX": {"path": "M282.11,360.77l55.54,-0.03l0.4,-0.4l0.37,-84.44l46.56,-0.0l0.05,36.46l0.44,0.4l1.54,0.11l3.27,3.29l1.47,0.18l0.75,-0.49l2.18,0.56l0.43,-0.31l0.23,-1.11l0.46,0.61l0.79,0.19l0.97,1.44l-0.01,1.4l0.47,0.75l2.5,0.39l1.07,-0.16l1.19,0.77l2.4,0.62l2.13,-0.36l1.63,1.56l1.23,-0.08l1.1,-1.2l2.1,0.26l1.4,-0.35l0.04,1.88l0.81,0.64l1.34,0.36l-0.13,1.46l0.71,0.78l0.92,0.26l0.82,-0.17l2.87,-2.29l0.36,0.26l0.32,1.31l1.72,0.21l0.17,0.87l0.67,0.47l1.29,-0.15l0.77,-0.75l0.88,0.2l0.49,-0.79l-0.15,2.0l0.56,1.0l0.7,0.4l1.06,-0.45l0.69,-1.98l0.77,-0.54l0.36,-1.3l0.44,-0.08l0.93,1.47l1.13,0.11l0.71,0.45l1.12,-0.14l0.63,-1.11l0.31,0.11l-0.09,0.67l0.39,0.54l1.02,0.42l0.42,0.64l1.31,0.01l1.22,1.51l0.51,0.04l0.59,-0.54l0.1,-0.57l1.26,-0.04l0.85,-1.18l1.63,-0.28l1.45,-0.88l1.27,0.74l1.35,-0.13l0.31,-0.69l1.94,-0.53l0.49,-0.42l0.67,1.02l3.05,0.45l1.7,-0.93l0.35,-0.84l0.88,0.3l1.86,1.42l0.99,0.2l1.44,1.84l1.82,0.45l0.87,0.84l0.66,-0.05l2.96,0.92l0.28,0.68l1.16,0.9l1.3,-0.04l0.35,-0.56l0.63,0.33l0.8,-0.28l1.43,0.25l0.48,0.31l0.08,28.7l1.2,1.5l1.04,0.75l0.93,1.61l0.38,1.38l-0.22,2.19l1.4,1.44l-0.08,0.69l1.26,1.83l-0.2,0.96l0.79,0.93l0.41,1.39l0.87,0.3l-0.25,1.32l0.54,1.03l-0.68,0.34l-0.12,0.43l0.55,1.07l-0.5,0.68l0.08,1.17l-0.77,2.17l-0.66,0.65l-0.38,1.22l-0.73,0.94l0.42,1.68l-0.81,1.83l0.09,0.91l0.61,1.0l-0.2,0.83l0.31,1.32l-0.28,1.13l-1.03,1.34l-1.02,0.33l-1.09,2.17l-0.13,1.75l1.04,1.33l-2.75,-0.08l-6.11,2.68l-0.01,-0.24l-1.41,-0.5l-2.68,0.71l0.87,-2.45l-0.22,-1.28l-0.42,-0.6l-1.78,-0.04l-1.34,2.14l-0.28,-0.53l-1.92,-1.12l-0.6,0.95l0.21,0.47l0.75,0.33l-0.21,0.64l0.37,0.67l-0.5,0.96l0.13,0.41l1.02,0.65l-0.25,0.46l0.36,0.83l0.92,0.52l-0.26,0.8l-1.23,0.64l-1.56,1.79l-0.83,-0.4l-0.5,0.1l0.17,2.91l-3.18,2.77l-4.21,2.45l-2.69,0.24l-2.1,0.78l-0.22,0.81l-0.87,-0.16l-1.36,0.59l-0.25,-0.28l-0.75,0.07l0.29,-0.55l-0.47,-0.6l-1.2,0.14l-0.96,0.8l-0.4,-0.43l-0.09,-1.02l-1.15,-0.73l-0.5,0.42l0.45,2.02l-1.44,-0.34l-0.44,-1.1l-1.19,-0.35l-0.59,0.37l0.02,0.44l0.72,1.43l-0.0,1.02l1.61,0.78l-0.53,0.24l-0.18,0.83l0.63,0.26l0.88,-0.41l0.67,0.4l-3.43,1.79l-0.41,-0.12l-0.27,-1.16l-1.26,-1.38l-0.48,-0.05l-0.93,1.69l0.9,1.31l-0.27,0.82l0.23,0.69l-1.35,1.37l0.21,-1.75l-0.41,-0.36l-0.48,0.15l-0.61,0.88l0.18,0.63l-0.23,0.55l0.01,-0.73l-0.47,-0.51l-1.58,0.98l-0.65,-0.27l-0.63,0.45l0.01,0.63l-0.64,0.74l0.14,0.66l0.73,0.26l0.12,0.51l0.55,0.4l0.5,-0.38l0.3,-0.83l0.55,-0.23l0.01,0.34l-2.29,3.34l-0.94,-0.77l-1.15,0.28l-0.25,-0.28l-2.83,0.12l-0.2,0.58l0.33,0.52l0.47,0.34l1.14,0.05l0.44,1.25l1.6,0.92l-2.31,5.96l-0.97,-1.29l-1.88,1.44l-1.27,-1.84l-0.94,-0.77l-0.62,0.39l0.06,0.42l1.1,1.63l-0.14,0.56l-0.61,-0.08l-0.34,0.62l0.44,0.49l1.6,0.1l0.53,0.52l1.68,0.22l0.83,-0.42l-0.05,1.7l-0.79,0.54l0.25,1.24l-0.84,0.08l-0.4,0.38l0.25,1.69l-0.27,1.3l0.4,0.59l0.62,0.18l0.62,2.29l0.49,2.23l-0.73,0.65l0.46,0.45l-0.06,1.02l1.09,1.01l0.32,1.42l0.47,0.29l0.34,2.56l0.99,0.55l-0.31,0.79l0.18,0.84l-0.42,0.56l-1.02,0.21l-0.15,0.92l-0.57,0.08l-0.25,-0.48l-1.17,-0.4l-2.26,-2.09l-1.7,-0.19l-0.69,-0.43l-3.31,0.0l-0.65,0.3l-0.65,-0.48l-1.3,0.16l-1.62,-0.72l-1.22,-1.5l-0.91,-0.41l-2.32,-0.75l-1.16,0.29l-2.21,-2.16l-1.58,-0.04l-1.17,-0.52l-1.85,-0.2l0.26,-0.7l-0.23,-0.79l-0.83,-0.58l0.47,-2.33l-0.24,-0.53l0.64,-0.24l0.13,-0.51l-0.88,-0.5l-0.9,0.33l0.02,-0.87l-0.46,-0.64l0.65,-1.17l-0.22,-0.71l-0.63,0.09l-0.71,0.74l-0.46,-0.7l-0.64,-0.2l-0.21,-1.1l-1.16,-0.6l0.3,-2.88l-1.13,-1.61l0.52,-2.53l-0.56,-0.9l-0.13,-1.44l-1.51,-1.21l-0.69,0.13l-0.87,-0.4l-0.59,-1.05l-1.74,-1.36l-0.31,-1.73l-0.78,-0.75l-0.08,-0.63l-0.88,-0.47l-1.05,-2.34l-2.14,-1.21l-0.34,-0.75l-0.87,-0.45l-0.05,-0.94l-0.66,-0.95l-0.42,-1.53l0.24,-0.13l-0.04,-0.72l-0.81,-0.38l-0.2,-1.03l-0.65,-0.48l-0.78,-1.39l-0.51,-1.94l-1.51,-1.92l-0.74,-3.45l-1.49,-1.09l0.04,-0.56l-0.64,-1.01l-3.38,-2.37l-0.19,-0.93l1.36,-0.04l0.66,-0.74l-0.78,-0.44l-0.05,-1.1l0.62,-0.94l-0.19,-0.44l-1.06,0.61l-0.43,1.15l-0.66,0.13l-0.34,0.87l-0.36,-0.03l-1.44,-1.39l-0.36,-1.13l-1.14,0.04l-0.87,-0.47l-0.73,-1.68l-1.28,-0.72l-0.65,0.15l-0.42,-0.63l-0.58,0.12l-0.18,0.48l-0.82,0.13l-2.32,-0.33l-0.38,-0.31l-4.67,0.17l-2.96,-1.54l-0.61,-0.04l-0.85,0.71l-0.48,1.31l-1.62,-0.09l-2.89,0.96l-2.38,5.21l-0.12,1.43l-0.6,0.61l-0.27,1.49l0.24,0.45l-1.5,0.82l-0.58,1.1l-1.35,1.27l-0.19,0.85l-2.22,-0.22l-0.98,-0.68l-0.41,0.23l-1.37,-0.89l-1.11,-1.29l-2.39,-0.61l-0.92,-0.72l-0.46,-0.89l-2.26,-0.33l-1.87,-0.75l-3.21,-3.29l-1.3,-0.22l-2.63,-2.13l-0.78,-2.33l-0.74,-0.79l-0.91,-1.89l-0.31,-1.88l0.31,-2.53l-2.69,-4.05l-0.14,-1.62l-1.15,-2.01l-0.84,-0.35l-0.43,-1.0l-1.22,-0.61l-1.89,-1.7l-0.87,-0.07l-1.7,-0.9l-2.81,-2.63l-0.58,-1.26l-2.73,-1.96l-3.03,-3.49l-3.87,-1.95l-2.26,-4.31l-0.71,-0.67l-1.52,-0.23l-1.49,-1.2l-0.85,-2.46ZM429.22,467.61l0.2,-0.15l0.17,-0.24l0.02,0.35l-0.39,0.03Z", "name": "Texas"}, "US-NH": {"path": "M814.8,148.96l-1.19,-1.78l-0.14,-0.92l0.47,-1.88l0.67,-0.4l0.18,-0.48l0.5,-5.22l0.55,-1.07l0.17,-5.43l0.92,-1.21l0.36,-2.16l1.48,-1.47l0.53,-2.2l1.26,-1.97l-0.24,-0.71l0.96,-2.17l0.19,-3.79l0.7,-0.98l1.99,-0.23l1.08,-1.12l1.85,-1.12l1.24,-1.5l0.09,-1.15l0.68,-0.44l-1.21,-4.03l1.81,-2.86l0.13,-0.78l-0.39,-1.48l0.44,-0.48l-0.02,-0.74l1.42,-2.94l-0.11,-0.9l1.34,-1.17l2.25,1.06l0.89,-0.65l1.93,36.97l-0.29,3.65l1.78,2.82l0.69,0.51l-0.06,1.8l1.17,1.56l-0.1,0.32l0.65,0.46l-1.56,3.21l-1.53,-0.24l-1.58,0.72l-0.75,0.72l-1.0,0.06l-0.96,1.4l-1.44,1.0l-17.77,-0.58Z", "name": "New Hampshire"}, "US-NY": {"path": "M790.96,193.96l-0.57,-0.81l1.58,-2.68l1.01,-0.0l0.46,-0.33l0.6,0.36l0.7,-0.14l0.1,-0.52l1.56,-0.57l0.18,-1.33l0.76,-0.22l0.18,0.58l1.0,0.13l0.55,-0.18l0.14,-0.47l1.38,0.21l0.43,-0.6l1.49,0.44l0.98,-0.25l0.74,-0.96l0.48,0.37l0.53,-0.33l4.27,-0.01l2.45,-0.38l2.93,-1.91l0.09,0.14l-3.22,2.4l-0.14,0.41l0.43,0.52l1.51,0.12l0.09,0.59l-1.48,0.71l-2.02,-0.06l-0.49,0.41l-1.18,0.07l0.1,0.44l-0.29,0.2l-0.58,-0.32l-0.86,0.43l-0.99,-0.12l-0.49,0.39l-1.4,0.03l-0.42,0.53l-1.26,-0.17l-2.06,1.02l-2.86,0.48l-1.15,0.52l-0.98,-0.18l-0.55,0.75l-0.3,-0.71l-1.27,-0.59l-1.0,0.45l-0.2,0.87l-0.94,0.26ZM814.91,187.64l1.36,-1.65l1.19,-0.11l0.81,-0.65l0.65,0.5l0.35,-0.68l0.45,0.71l-4.47,2.24l-0.34,-0.36ZM817.33,182.6l0.11,-0.02l0.04,0.01l-0.1,0.09l-0.05,-0.07ZM701.17,159.34l4.35,-2.83l1.67,-1.79l3.33,-1.87l1.93,-2.88l2.45,-1.57l0.2,-1.78l-1.02,-2.63l0.65,-0.97l0.0,-0.79l-0.69,-0.68l-2.0,-0.44l0.25,-0.92l-0.07,-2.23l5.4,-1.72l4.7,-0.73l2.33,0.34l1.93,-0.29l5.45,1.04l2.7,1.89l3.41,-0.87l5.49,0.27l0.46,0.56l0.7,-0.03l0.35,-0.9l3.52,-0.99l1.15,-1.77l2.21,-1.22l1.05,-1.01l1.06,0.3l1.2,-0.22l1.42,-1.29l-0.27,-0.78l0.63,-1.04l-0.11,-0.56l-0.62,-0.14l0.13,-1.15l-0.51,-1.73l-0.82,-0.83l0.63,0.38l0.58,-0.13l1.07,-1.19l0.22,-0.88l0.94,-0.42l0.23,-0.94l-0.84,-0.41l-0.76,0.52l-0.28,0.05l0.85,-1.1l-0.63,-0.81l-1.23,-0.26l-1.02,0.52l-0.78,-0.9l2.59,-1.9l2.08,-0.98l2.27,-2.12l0.82,-0.36l1.25,-1.26l0.21,-0.53l-0.24,-1.03l1.24,-1.63l6.63,-6.13l5.81,-3.13l2.9,0.25l20.63,-0.14l0.15,0.96l-0.64,1.91l0.64,1.45l-0.64,3.77l1.31,3.57l-0.62,1.95l0.15,2.53l-0.86,0.85l-0.94,3.25l0.43,1.04l0.5,2.97l-0.12,1.08l0.36,0.96l-0.96,3.73l0.29,0.95l0.5,0.22l0.68,-0.43l0.3,-0.8l0.32,0.02l0.68,1.33l-0.3,14.57l-0.33,1.51l0.28,1.18l-3.69,13.83l0.39,0.74l-0.99,15.69l0.79,1.53l-3.4,2.13l-0.12,0.53l1.17,1.9l-2.57,2.53l-0.09,0.99l-1.0,0.14l0.86,-3.86l0.06,-2.16l-0.26,-1.66l-1.05,-1.36l0.13,-1.06l-0.65,-0.28l-0.73,1.11l0.37,1.53l0.68,0.86l0.14,2.71l-11.57,-7.09l-0.82,-1.66l-2.27,-0.37l-1.41,-0.93l-1.13,-2.17l-0.11,-2.3l0.29,-0.65l-0.18,-0.68l-0.45,-0.33l0.18,-0.38l-0.23,-0.5l-1.36,-1.02l-1.08,0.03l-0.35,-1.48l-1.41,-1.11l-68.54,-0.05l-0.0,-4.99Z", "name": "New York"}, "US-HI": {"path": "M301.21,443.33l0.6,1.03l2.42,1.51l1.35,0.01l2.07,0.75l4.98,3.01l1.48,1.67l0.03,2.73l0.42,0.38l1.29,-0.33l0.32,0.22l0.14,1.26l0.63,1.15l2.66,2.09l-1.05,1.59l-0.93,0.38l-1.2,1.17l-2.2,1.12l-2.03,0.6l-1.89,-0.05l-1.56,1.2l-2.85,1.49l-0.96,0.97l-0.16,1.13l-1.88,2.42l-2.81,-1.91l-1.13,-0.33l-0.51,-0.85l-0.24,-1.15l0.65,-4.74l-1.93,-5.4l-1.11,-1.35l-0.41,-1.16l0.34,-0.86l1.3,-1.41l0.99,-0.46l1.04,-1.73l0.83,-0.67l0.22,-1.16l-1.45,-2.7l-0.04,-1.29l0.3,-0.6l2.32,0.29ZM283.53,426.56l0.55,-0.06l0.85,0.46l1.57,2.23l2.14,-0.43l0.96,-0.58l1.62,0.26l2.22,2.07l2.4,0.85l0.24,1.33l-1.11,1.16l-1.51,0.56l-1.57,0.01l-1.85,0.9l-1.92,-0.11l-0.52,-0.66l-0.52,-3.41l-0.7,-0.42l-0.97,0.41l-1.53,-0.66l-1.1,-1.33l-0.03,-1.52l0.79,-1.04ZM251.18,414.51l2.23,-0.04l1.47,-1.16l0.97,-1.37l0.58,-0.13l1.4,2.51l1.01,1.0l-0.26,0.55l0.15,0.99l1.38,1.26l0.7,-0.1l0.63,0.65l0.29,1.03l0.72,0.5l-0.33,0.31l-0.53,-0.23l-1.69,0.58l-2.0,-1.63l-0.52,0.48l-0.35,-0.18l0.57,-0.44l-0.03,-0.67l-1.59,-0.48l-0.67,0.21l-0.14,0.47l0.75,0.99l-1.8,0.36l-1.56,-2.98l-0.79,-0.8l-0.1,-1.18l-0.47,-0.5ZM220.44,403.92l1.24,-1.88l2.96,-1.51l1.0,0.46l0.55,-0.47l2.34,0.16l1.01,1.47l-0.82,1.87l0.04,1.62l-1.86,1.85l-3.39,-0.66l-0.9,-1.0l-1.77,-0.57l-0.44,-0.68l0.04,-0.65Z", "name": "Hawaii"}, "US-VT": {"path": "M799.97,130.84l-0.02,-0.88l0.94,-3.1l-0.37,-1.13l0.13,-0.97l-0.52,-3.08l-0.41,-0.81l0.88,-2.99l0.89,-0.93l-0.12,-2.68l0.62,-2.03l-1.31,-3.65l0.64,-3.68l-0.64,-1.5l0.63,-1.77l-0.13,-1.09l27.46,-0.19l0.31,2.04l-1.42,2.05l-0.49,1.47l1.32,3.28l-0.66,0.41l-0.08,1.15l-1.11,1.32l-1.73,1.03l-1.0,1.07l-1.85,0.17l-0.86,0.7l-0.38,0.9l-0.19,3.81l-0.98,2.22l0.22,0.62l-1.17,1.81l-0.48,2.1l-1.48,1.48l-0.42,2.29l-0.94,1.3l-0.18,5.49l-0.55,1.08l-0.5,5.22l-0.78,0.63l-0.54,2.17l0.21,1.34l1.1,1.41l-11.8,-0.33l0.52,-16.82l-1.2,-1.97l-1.02,0.03l-0.52,0.99Z", "name": "Vermont"}, "US-NM": {"path": "M244.84,372.29l0.01,-106.11l93.41,0.0l0.01,8.92l-0.65,0.42l-0.36,84.42l-55.65,0.03l-0.4,0.42l0.49,1.9l0.57,1.37l0.77,0.47l-25.63,-0.07l-0.4,0.4l0.0,7.83l-12.17,0.0Z", "name": "New Mexico"}, "US-NC": {"path": "M631.17,299.62l0.79,0.27l1.83,-0.4l0.61,-0.77l0.5,-2.28l1.34,-0.82l0.55,-0.82l2.16,-0.92l1.92,-0.13l0.62,0.27l1.25,-0.25l2.45,-1.8l0.71,-0.09l1.97,-1.68l1.43,-0.62l1.4,0.07l1.44,-2.12l-0.06,-1.07l1.43,0.32l0.73,-1.35l0.91,-0.5l1.04,-0.47l0.17,1.35l0.92,0.48l1.38,-0.8l1.6,-2.05l2.41,-0.95l0.65,0.18l0.61,0.82l1.0,-0.01l0.93,-0.79l1.98,-3.34l1.11,-0.75l1.26,0.32l0.47,-0.21l-0.38,-1.22l0.69,-1.65l-0.21,-0.87l0.52,-0.96l6.65,0.51l17.74,0.58l62.8,-0.21l0.09,1.08l2.34,3.53l0.46,1.34l-0.65,-0.99l-0.03,-0.59l-0.71,-0.55l-0.48,-0.08l-0.39,0.57l0.45,0.6l0.18,1.37l-2.83,-2.11l-0.29,-0.51l-0.54,-0.0l-0.44,0.54l-0.02,0.61l1.1,0.69l1.1,1.47l-1.0,0.3l-1.89,-1.56l-0.47,0.4l0.03,0.41l1.02,1.21l-3.09,-1.82l-0.48,0.02l0.23,1.16l1.22,1.05l-0.85,0.26l-0.62,0.86l-1.4,0.31l-0.58,-0.83l-0.87,0.19l-0.63,-2.22l0.75,-2.21l-0.28,-0.52l-0.73,-0.38l-0.51,0.53l0.38,0.7l-0.83,1.64l0.05,1.59l0.89,2.19l-0.52,1.01l0.4,0.4l2.68,0.13l2.13,-0.81l0.34,0.8l0.76,-0.11l1.33,0.38l0.33,-0.66l-0.33,-0.34l1.16,-0.33l1.77,0.02l-0.31,0.96l0.48,0.4l-0.7,0.61l0.5,1.16l-0.7,-0.1l-0.35,0.6l1.09,0.7l-0.04,0.74l-0.97,-0.2l-0.35,0.59l0.46,0.66l1.51,0.46l0.47,-0.26l0.58,-1.61l0.08,-2.94l0.42,-0.29l0.38,0.46l0.83,0.26l0.36,-0.33l-0.07,-0.55l0.45,-0.33l1.0,1.85l-0.32,1.18l0.32,0.83l-0.81,0.43l0.37,1.41l-0.44,0.33l-0.68,-0.08l-0.59,-0.91l-0.39,0.24l-0.17,1.08l-1.28,1.14l0.03,0.5l-0.63,0.87l-0.77,0.34l-0.14,0.78l-0.95,0.6l-0.89,-0.04l-0.45,-0.44l-0.58,0.31l-0.59,-0.86l-0.73,-0.1l-0.16,-0.74l-0.48,-0.33l-0.57,0.22l-0.13,0.79l-0.46,0.07l-0.76,-1.2l0.76,0.04l0.44,-0.33l0.23,-0.52l-0.45,-0.55l-1.79,-0.17l-1.22,0.62l0.56,1.9l-0.42,-0.38l-1.61,0.34l-4.85,-2.11l0.12,1.07l0.75,0.61l0.15,0.58l1.36,0.17l1.3,0.88l4.88,1.66l0.28,0.41l-0.13,0.36l-0.82,-0.17l-0.45,0.56l-1.65,0.87l0.17,0.64l1.47,0.39l-2.81,2.29l-1.39,-0.3l-1.88,-1.5l-0.83,-1.11l-1.02,-0.16l-0.04,0.47l2.19,3.4l3.28,1.48l1.89,-1.44l1.25,1.01l0.53,-0.46l-0.32,-0.8l0.65,0.29l0.39,0.82l1.57,-0.35l0.06,0.71l-1.06,0.19l-0.16,0.74l-1.19,1.23l-0.14,0.63l-0.49,-0.16l0.07,-0.67l-0.84,-0.75l-0.52,0.36l-0.04,0.63l-0.38,-0.62l-0.72,-0.01l-0.97,0.65l-0.09,0.58l-1.73,-0.15l-2.67,0.95l-0.35,-0.93l-0.61,-0.46l-0.47,0.39l0.13,1.05l-0.46,-0.1l-1.43,1.93l-0.9,0.5l-0.36,-0.29l0.5,-0.45l0.14,-0.7l-0.68,-0.96l0.01,-0.49l-1.41,-0.7l-0.26,0.42l0.13,1.07l0.71,1.02l-0.8,0.11l-0.24,0.64l1.02,0.97l-0.07,0.24l-2.11,0.95l-2.17,1.84l-2.56,3.19l-0.75,1.87l-0.49,-1.42l-0.48,-0.29l-0.4,0.4l0.2,3.51l-0.93,1.71l-3.3,-0.6l-1.34,0.26l-0.64,-0.76l-0.69,0.79l-1.82,0.58l-0.47,-0.14l-16.82,-17.16l-17.48,-0.59l-0.09,-2.43l-2.31,-2.98l-0.46,-0.01l-1.21,0.85l0.21,-1.0l-0.65,-0.64l-20.24,-0.93l-0.53,-0.33l-0.97,0.8l-3.74,1.02l-0.95,0.9l-0.88,-0.09l-4.54,1.52l-18.63,0.25l0.35,-3.85l0.69,-0.67ZM761.91,282.38l0.03,0.15l0.04,0.12l-0.11,-0.18l0.04,-0.1ZM754.5,305.09l0.11,-0.17l0.04,0.03l-0.09,0.13l-0.05,0.01ZM752.27,304.48l0.01,-0.13l0.07,0.1l-0.08,0.03Z", "name": "North Carolina"}, "US-ND": {"path": "M428.21,9.38l1.98,7.65l-0.86,2.73l0.53,2.57l-0.32,1.26l0.44,2.17l-0.1,3.52l1.37,4.28l0.46,0.6l-0.12,1.04l0.36,1.63l0.63,0.8l1.43,4.04l-0.2,4.14l0.41,0.75l0.23,8.81l0.47,1.61l0.54,0.29l-0.59,2.75l0.31,1.71l-0.21,1.82l0.68,1.16l0.13,2.25l0.46,1.19l1.76,2.72l0.08,2.28l0.48,1.13l0.12,1.44l-0.3,1.39l0.23,1.81l-115.81,-0.01l-0.04,-69.55l105.46,-0.0Z", "name": "North Dakota"}, "US-NE": {"path": "M408.85,143.99l3.79,2.69l3.8,1.91l1.31,-0.19l0.51,-0.45l0.37,-1.03l0.46,-0.18l2.43,0.38l1.3,-0.42l1.54,0.28l3.38,-0.53l2.26,1.98l1.37,0.18l1.49,0.79l1.41,0.12l0.82,1.09l1.43,0.21l-0.08,0.94l1.57,2.06l3.2,0.69l-0.12,2.43l1.02,1.9l-0.08,2.19l1.08,1.07l0.26,1.65l1.61,1.46l-0.01,1.78l1.36,2.05l-0.57,2.18l0.3,2.94l0.49,0.55l0.89,-0.15l-0.08,1.17l1.13,0.53l-0.48,2.18l0.19,0.46l1.03,0.41l-0.59,0.68l-0.12,0.95l0.11,0.58l0.75,0.5l0.09,1.35l-0.29,0.85l0.2,1.21l0.49,0.59l0.2,1.8l-0.26,1.23l0.19,0.68l-0.57,0.83l-0.01,0.76l0.39,0.84l1.14,0.64l0.14,2.34l1.01,0.51l-0.0,0.73l0.99,2.57l-0.25,0.9l1.1,0.26l0.71,0.95l1.01,0.26l-0.18,0.89l1.14,1.59l-0.25,1.02l0.36,0.83l-102.86,0.0l-0.01,-20.08l-0.4,-0.4l-30.79,-0.01l0.01,-41.15l86.18,0.0Z", "name": "Nebraska"}, "US-LA": {"path": "M478.65,360.31l0.03,-18.22l43.98,-0.05l0.26,0.71l1.17,0.62l-0.87,1.04l-0.38,1.8l0.38,0.68l0.94,0.29l-1.01,0.25l-0.49,0.68l0.28,1.19l0.82,0.78l-0.11,1.79l1.57,1.25l0.3,0.92l1.15,0.44l-0.83,0.92l-0.88,1.85l-0.6,-0.02l-0.54,0.43l-0.08,0.63l0.47,0.67l-0.26,0.88l-1.21,0.69l-1.05,1.48l-1.19,0.45l-0.66,0.66l-0.85,1.96l-0.46,2.87l-1.42,1.33l0.0,1.05l0.44,0.84l-0.46,1.9l-1.46,0.14l-0.45,0.44l0.17,0.86l0.47,0.54l-0.3,1.14l0.69,1.27l-1.04,0.86l-0.12,0.44l0.38,0.26l29.57,0.0l-1.38,3.49l-0.37,1.85l0.76,2.31l1.02,0.71l0.87,1.26l0.66,2.83l0.7,1.51l-1.45,0.13l-0.64,-1.07l-1.06,0.11l-0.92,-0.59l-1.24,0.01l-0.39,-0.82l-0.97,-0.85l-2.35,-0.65l-1.12,0.43l-2.53,2.83l-0.43,0.75l-0.04,1.02l1.04,1.34l3.43,1.04l2.86,-0.54l1.8,-1.64l1.09,0.83l1.52,-0.48l-0.66,0.72l-1.39,0.05l-0.48,1.22l0.54,1.11l1.21,0.16l0.75,1.02l0.61,0.24l1.3,-0.44l0.49,-0.89l0.1,-1.09l0.8,-0.38l0.5,-0.71l-0.23,1.05l0.38,0.72l-0.15,0.37l1.12,1.24l-0.15,0.79l-1.3,-0.71l-1.04,1.46l-0.67,0.03l-0.46,0.41l-0.07,0.85l-1.08,-0.52l-0.44,0.14l-0.01,0.47l0.71,0.8l-0.77,-0.17l-0.86,0.48l1.39,2.24l2.09,1.0l-0.15,0.96l0.27,0.4l1.72,-0.06l1.27,0.98l1.1,-0.13l0.58,0.71l0.77,-0.33l0.74,0.65l-0.3,0.71l1.11,0.86l-0.32,0.46l0.29,0.53l-0.26,0.45l-0.82,0.92l-0.69,-1.11l-0.64,-0.05l0.13,-0.67l-0.37,-0.43l-0.7,-0.39l-0.54,0.42l0.05,0.96l-0.36,0.26l-0.12,-0.82l-1.0,-1.28l0.03,-0.72l-2.09,-0.04l-0.78,-0.75l-1.73,-0.26l0.24,-1.2l-0.45,-0.61l-0.78,-0.12l0.19,-0.69l-0.32,-0.37l-2.06,0.14l-1.98,-1.24l-1.01,-0.16l-0.47,-0.53l-0.63,0.12l-0.28,0.42l-0.15,1.09l1.35,0.94l1.26,0.38l-0.18,1.86l-0.67,0.73l-0.08,0.54l0.56,0.88l-0.84,0.99l-1.05,0.6l-0.51,-0.91l0.29,-1.17l-0.21,-0.82l-0.43,-0.22l-0.34,0.25l-0.89,-0.96l-0.48,0.23l-0.51,-0.83l-0.54,-0.23l-0.66,1.02l-0.7,0.14l-0.67,-0.49l-0.78,0.4l-0.15,0.54l0.31,0.4l-0.53,0.32l-0.23,1.14l-0.71,0.7l-0.63,-0.06l-0.08,-0.45l-1.31,-0.5l-0.72,0.7l-1.43,-0.88l-0.24,-0.46l-0.88,-0.06l-0.29,0.44l-0.72,-0.45l0.38,-1.49l-1.71,-1.61l-0.65,-1.08l-0.01,-0.7l0.73,-1.18l-0.26,-0.72l-0.75,-0.25l-0.77,1.3l-0.06,0.84l-1.3,-0.43l-0.32,-0.77l-1.61,0.44l-0.46,-1.83l-1.04,0.07l0.13,-1.26l-0.36,-0.63l-2.37,-0.15l-0.97,0.47l-0.13,-0.43l0.72,-0.21l0.01,-0.68l-0.49,-0.57l-0.86,-0.17l-0.74,0.26l-0.77,-0.17l-0.41,0.64l-1.66,0.72l-0.87,-0.16l-0.81,0.49l0.35,1.17l0.67,0.37l0.58,1.18l-2.43,0.95l-6.14,-1.24l-5.33,-2.3l-2.81,-0.75l-5.67,0.18l-4.12,0.96l-0.64,-1.07l1.0,-0.31l0.72,-0.8l0.34,-1.87l-0.41,-0.77l0.98,-1.18l0.29,-1.32l-0.31,-1.55l0.14,-1.2l-0.52,-0.64l-0.11,-0.83l0.81,-1.77l-0.42,-1.64l0.68,-0.66l0.31,-1.18l0.7,-0.74l0.82,-2.31l-0.07,-1.19l0.53,-0.76l-0.52,-1.11l0.67,-0.27l0.19,-0.69l-0.63,-0.9l0.13,-1.77l-0.89,-0.32l-0.38,-1.28l-0.71,-0.74l0.3,-1.05l-1.33,-1.8l0.19,-0.8l-0.95,-0.56l-0.61,-0.79l0.27,-2.02l-0.48,-1.67l-1.01,-1.72l-2.09,-1.96ZM552.55,413.03l0.03,0.16l-0.11,0.02l0.08,-0.18ZM522.87,410.11l-0.65,-0.11l-1.17,-0.71l0.82,-0.75l0.86,0.56l0.13,1.01Z", "name": "Louisiana"}, "US-SD": {"path": "M322.61,100.54l0.28,-0.55l-0.1,-20.26l115.67,0.01l-0.25,1.75l-0.8,1.72l-3.04,2.41l-0.47,1.28l1.54,2.21l1.0,2.12l0.54,0.38l1.75,0.31l1.0,0.89l0.54,1.06l0.0,38.63l-1.81,0.02l-0.44,0.54l0.19,1.41l0.82,1.14l-0.04,1.4l-0.65,0.34l0.11,1.45l0.46,0.44l1.06,0.08l0.27,1.63l-0.19,0.87l-0.64,0.78l-0.05,1.68l-0.75,2.33l-0.5,0.41l-0.73,1.8l0.45,1.09l1.24,1.07l-0.17,0.59l0.6,0.66l0.3,1.1l-1.58,-0.32l-0.3,-0.91l-0.8,-0.73l0.21,-0.57l-0.26,-0.6l-1.53,-0.27l-0.97,-1.17l-1.53,-0.16l-1.45,-0.77l-1.31,-0.15l-2.27,-1.99l-3.72,0.47l-1.61,-0.28l-1.17,0.42l-2.55,-0.38l-0.98,0.45l-0.77,1.38l-0.7,0.03l-3.54,-1.82l-3.99,-2.78l-86.36,-0.0l-0.05,-42.65Z", "name": "South Dakota"}, "US-DC": {"path": "M743.96,229.1l-0.27,-0.62l-1.22,-0.89l0.7,-0.72l1.5,1.5l-0.72,0.73Z", "name": "District of Columbia"}, "US-DE": {"path": "M763.1,211.99l0.8,-1.27l1.08,-0.77l1.08,-0.24l1.58,0.3l-0.79,1.6l-1.35,1.2l-0.27,0.68l-0.03,0.59l0.73,0.99l-0.44,2.08l2.79,3.85l0.07,3.77l1.36,1.93l0.13,1.22l2.3,2.73l1.22,0.26l0.13,1.1l-0.54,0.09l-0.47,0.57l0.07,0.89l-0.81,0.3l-0.37,1.07l0.57,0.37l0.92,-0.44l0.85,0.37l0.15,1.39l-0.31,0.14l-8.98,-0.11l-1.45,-24.64Z", "name": "Delaware"}, "US-FL": {"path": "M579.05,379.06l39.63,-0.01l0.98,1.71l0.35,2.32l1.15,1.06l40.51,2.77l0.64,1.23l-0.14,0.87l0.29,0.96l0.83,0.59l1.4,0.02l0.85,-0.52l0.6,-3.74l-0.57,-1.37l0.09,-1.45l1.09,-1.2l4.33,1.66l3.31,0.53l-0.12,0.79l-0.55,-0.13l-0.37,0.34l-0.04,1.31l1.43,1.82l0.22,2.82l2.44,10.12l5.03,12.13l3.13,5.23l-1.53,-0.93l-0.56,0.43l1.3,6.12l5.99,13.84l0.57,2.69l1.92,4.68l-1.1,-0.45l-0.31,0.61l0.52,0.65l1.13,0.3l0.94,0.95l1.06,2.67l-0.61,0.6l0.82,0.64l0.38,1.57l-0.24,0.81l0.3,0.85l0.03,2.16l-0.33,0.54l-0.76,7.18l-0.42,0.8l0.24,0.63l-0.12,2.44l-0.86,1.04l-0.31,1.74l-0.73,0.41l-0.99,2.0l-0.59,2.5l0.39,1.72l-1.57,2.02l-2.23,-0.06l-0.46,0.73l-0.72,0.14l-0.94,0.8l-1.07,-0.09l-0.18,-0.33l-0.99,-0.26l-0.85,0.67l-2.54,0.37l-0.64,-0.59l-0.36,-0.89l0.28,-1.28l0.5,0.74l1.74,1.34l1.2,-0.36l0.19,-1.13l-1.07,-1.16l-2.39,-1.06l-0.38,-1.41l-0.54,-0.65l0.29,-0.77l-0.77,-0.35l-0.65,-2.08l-0.82,-0.41l-0.19,-0.46l0.26,-0.74l-0.45,-0.62l-2.14,-1.43l-2.74,-0.78l-0.3,-0.74l-0.63,-0.01l-0.91,-2.42l-0.43,-0.27l-0.66,-5.18l-0.87,-1.05l-0.31,0.7l-0.72,-0.32l1.0,-0.88l0.37,-1.08l0.79,-0.9l0.57,-0.19l0.36,-0.65l-0.53,-0.49l-1.27,0.53l-0.9,0.9l-0.65,1.63l-0.98,0.09l0.05,-1.05l-0.41,-1.16l0.39,-3.22l-0.54,-0.6l1.5,-0.89l0.24,-0.62l-0.49,-0.52l-2.62,1.03l-1.68,-1.35l-0.52,0.62l1.12,1.21l0.67,1.7l-1.74,-0.52l-0.41,-1.36l-0.81,-0.67l-1.13,-2.27l-0.48,-1.97l-0.86,-0.86l0.2,-0.67l-0.5,-1.58l-1.22,-1.04l0.13,-0.39l0.84,-0.26l-0.15,-0.46l0.39,-0.5l-0.25,-0.33l0.49,-0.91l2.6,-3.18l-0.46,-2.12l-0.54,-0.53l-0.83,0.21l-0.33,0.47l-0.08,1.21l-0.22,-2.03l-1.53,-1.22l-1.26,-0.49l-0.12,1.62l-0.42,0.41l0.16,0.63l1.59,0.74l-0.45,2.56l-0.14,-0.43l-2.08,-1.84l-0.34,0.1l-0.12,-0.46l0.76,-1.58l0.36,-1.67l0.16,-1.12l-0.27,-1.21l1.06,-1.82l-0.1,-0.5l0.96,-2.32l0.5,-4.37l-0.03,-3.5l-1.49,-1.4l-0.27,-1.63l-0.61,-0.76l-0.23,-1.27l-0.58,-0.36l-1.98,-0.27l-1.25,0.22l-0.67,-1.55l-1.14,-0.6l-0.94,-1.93l-2.78,-2.05l-0.04,-2.3l-2.32,-1.36l-0.68,-1.61l-1.49,-1.89l-1.61,-1.18l-1.18,-0.32l-2.55,-1.83l-2.47,0.36l-0.81,-0.43l-2.47,1.08l-0.58,0.97l-0.94,-0.07l-0.2,0.28l0.61,1.06l-1.15,0.05l-2.29,1.27l-1.34,1.14l-1.4,0.6l-0.04,-0.79l-0.6,-0.12l-1.96,1.54l-1.8,-0.09l-2.43,0.53l0.05,-1.64l-0.89,-1.71l-2.15,-1.9l0.68,0.11l0.79,-0.43l0.13,-0.69l-1.13,-0.48l-0.24,0.19l-0.16,-1.1l-0.43,-0.4l-1.18,0.33l-1.69,-0.84l0.58,-0.71l0.71,-0.01l1.03,-1.13l-0.65,-0.92l-0.47,0.05l-0.51,0.73l-1.03,0.26l-0.44,-0.76l-0.71,-0.01l-1.37,0.71l-0.13,0.83l-2.88,-1.49l-2.86,-0.85l0.51,-0.3l1.19,0.53l0.66,-0.15l0.15,-0.52l-0.63,-0.96l0.14,-0.55l-0.58,-0.37l-0.38,0.18l-0.14,-0.36l-1.66,-0.12l-1.75,0.48l-0.16,-0.85l-1.3,-0.1l-0.22,0.97l-1.67,0.91l-4.09,0.2l0.19,-0.31l-0.29,-0.52l-1.55,-0.87l0.54,-0.27l0.12,-0.74l-1.16,-0.83l-0.47,0.05l-0.44,1.87l-1.03,-1.43l-0.46,-0.17l-0.54,0.32l0.0,1.0l0.4,0.87l-0.29,0.6l-1.21,0.61l-0.2,0.84l-0.46,0.11l-0.26,0.47l-0.99,0.22l0.05,-0.77l1.01,-0.67l0.19,-0.53l-0.29,-0.68l-0.95,-0.33l-0.24,-0.7l0.53,-2.52l-1.76,-1.36l-1.65,-2.17l0.38,-2.01ZM589.15,389.05l-0.31,0.04l0.15,-0.13l0.15,0.09ZM606.41,392.88l0.6,-0.11l0.13,0.65l-0.73,-0.54ZM685.76,419.28l1.16,1.73l-0.59,0.41l-1.05,-0.33l0.48,-1.81ZM688.24,423.81l0.14,0.23l-0.26,0.33l0.12,-0.56ZM610.64,395.66l-0.29,-0.24l0.09,0.03l0.2,0.21ZM598.81,389.71l-0.08,-0.02l0.02,-0.03l0.06,0.05Z", "name": "Florida"}, "US-CT": {"path": "M795.43,183.52l3.42,-2.17l0.09,-0.54l-0.87,-1.46l0.97,-15.34l9.72,0.4l0.45,0.58l0.67,-0.07l0.38,-0.47l14.18,0.23l0.08,10.1l-0.12,1.88l-0.51,1.49l-1.59,-0.16l-1.06,0.48l-1.03,-0.55l-0.43,0.77l-1.05,-0.25l-1.51,0.8l-0.5,-0.28l-0.25,-1.07l-0.8,-0.33l-0.39,0.59l0.51,0.77l-0.07,0.48l-0.79,-0.25l-1.17,0.51l-1.53,-0.38l-1.31,0.54l-1.35,-0.27l-1.37,0.52l-0.31,-1.07l-0.61,-0.06l-1.58,1.95l-1.14,0.28l-0.5,0.84l-0.62,-0.42l-1.05,0.26l-0.3,0.74l-1.84,0.44l-2.37,1.54l-1.52,0.37l-0.93,-1.41Z", "name": "Connecticut"}, "US-WA": {"path": "M0.49,28.52l0.59,-1.05l-0.16,-0.75l0.61,-1.77l-0.95,-1.36l1.26,0.55l0.45,-0.12l4.33,2.54l1.11,0.09l2.87,1.93l4.21,0.56l1.26,-0.25l1.0,0.53l0.77,0.14l0.57,-0.32l1.9,0.71l1.65,0.1l1.38,-0.05l1.1,-0.97l0.63,0.19l0.66,0.63l0.26,1.31l0.74,0.62l0.34,0.03l0.39,-0.46l-0.12,-0.83l0.51,-0.09l1.0,1.31l-0.26,0.71l0.45,0.4l0.55,-0.18l0.53,-1.05l-0.82,-1.68l1.06,-0.53l-0.42,0.4l-0.04,0.74l2.44,4.32l-0.48,0.22l-1.32,2.3l-0.1,-1.49l-0.32,-0.34l-1.24,0.64l-0.19,0.92l0.34,0.97l-0.99,2.13l-1.68,1.93l-0.72,1.72l-0.81,0.96l-0.69,1.98l0.11,0.72l0.77,0.45l0.99,-0.12l2.69,-1.19l1.09,-0.9l-0.2,-0.67l-0.7,-0.07l-2.79,1.56l-0.45,-0.24l2.43,-4.37l2.9,-1.68l0.53,-1.79l1.41,-2.06l0.68,0.48l0.48,-0.31l-0.24,-2.0l0.55,2.44l0.49,0.87l-1.08,0.05l-0.46,0.97l-0.62,-0.67l-0.57,-0.06l-0.22,0.73l0.48,0.66l0.48,1.9l-0.57,-1.25l-0.7,-0.05l-0.3,0.82l0.21,0.94l0.56,0.41l-0.51,0.78l0.11,0.44l0.44,0.06l1.59,-1.02l0.16,0.8l0.36,0.29l-0.66,2.13l0.18,1.1l-0.67,0.92l0.37,1.03l-1.07,-0.51l0.79,-1.76l-0.45,-0.91l-1.72,1.59l-0.26,0.8l-0.57,-2.21l-0.5,0.14l-0.65,1.89l-1.15,0.87l-0.69,2.2l-1.46,0.69l-0.35,0.55l0.09,1.23l0.45,0.07l1.03,-0.69l-0.52,0.74l0.71,0.33l0.59,-0.25l0.23,0.69l0.65,0.34l0.44,-0.39l-0.07,-1.91l0.26,0.4l0.8,-0.37l1.49,1.26l1.17,-0.95l1.3,-1.92l0.61,-1.87l0.85,0.66l0.76,-0.04l0.39,-0.34l-0.28,-0.86l1.45,-0.94l0.12,-1.04l-0.65,-1.22l-0.06,-1.28l-0.56,-1.51l0.23,0.33l0.71,-0.18l0.08,-1.01l-0.38,-0.72l-0.9,-0.5l0.64,-1.4l-0.36,-1.83l0.96,-1.61l0.29,-1.58l1.54,-0.92l0.5,-1.36l-0.61,-0.56l-0.54,0.11l-1.22,-1.16l-0.35,-2.24l-0.49,-0.83l0.32,-0.99l-0.15,-0.86l-1.61,-1.51l-0.75,-0.27l-0.36,-0.66l0.08,-0.56l-0.47,-0.34l0.84,0.43l0.65,-0.29l0.19,-0.53l-0.28,-1.65l0.78,-0.44l0.06,-1.12l-1.22,-2.28l0.33,-0.71l-0.24,-0.85l-1.2,-0.68l-0.91,0.59l-1.83,-2.58l0.48,-2.24l88.03,0.0l-0.09,60.07l1.6,2.86l0.5,2.01l-0.78,1.49l1.08,1.78l-32.52,0.04l-1.51,1.14l-7.47,0.48l-1.48,1.27l-4.22,0.76l-3.08,1.13l-1.48,1.1l-0.94,-0.07l-1.13,0.56l-1.55,0.1l-2.63,-0.41l-0.8,0.66l-3.32,1.27l-2.25,-0.24l-1.57,0.66l-1.06,-1.63l-5.48,-0.75l-2.33,0.42l-1.69,-0.15l-2.44,1.71l-4.32,1.63l-1.27,-0.44l-1.21,-0.02l-1.87,-0.75l-1.95,-0.06l-0.93,-0.93l-0.08,-2.29l-0.4,-0.84l0.09,-1.24l-0.52,-2.29l-0.69,-0.83l-0.68,-1.85l-0.82,-0.8l-2.85,-1.49l-1.63,0.17l-1.24,0.61l-2.76,-2.76l-2.12,0.3l-0.64,-0.16l-0.23,-0.5l-0.66,-0.33l-1.14,0.6l-0.84,0.04l-0.87,0.78l-1.49,-1.51l-1.0,0.02l0.09,-1.23l1.11,0.42l0.5,-0.27l0.38,-0.81l0.68,0.55l0.69,-0.18l-0.02,-0.8l-1.36,-1.23l0.63,-1.06l-0.44,-1.34l0.39,-0.51l-0.37,-1.02l0.76,-0.5l0.18,0.5l0.57,0.28l0.86,-0.55l-0.25,-0.64l-1.92,-1.47l-0.51,-0.02l-0.32,0.4l-0.34,-0.23l-0.67,0.21l-0.08,0.39l-1.02,-0.64l-0.17,-1.75l0.83,0.37l0.48,-0.2l0.14,-0.64l-0.43,-0.66l3.31,-1.4l0.07,-0.72l-2.96,-0.63l-0.24,-0.8l-0.81,-0.4l-1.4,0.04l-0.87,-4.94l-0.45,-0.98l-0.38,-0.19l0.06,-0.81l-0.65,-0.35l-0.49,-4.19l-1.12,-4.52l-0.84,-0.9l-0.3,-0.99l-0.8,-0.44l-0.35,-0.71l-0.79,-0.37l-0.29,-0.49l-0.81,-4.49l-0.58,-1.31ZM30.52,49.18l0.36,0.76l-0.31,0.67l-0.25,-1.0l0.21,-0.42ZM35.42,26.66l-0.48,1.14l-0.0,0.74l-0.23,-1.69l0.71,-0.19ZM33.22,21.81l-0.76,0.62l0.21,-0.83l-0.24,-0.64l0.26,-0.16l0.53,1.01Z", "name": "Washington"}, "US-KS": {"path": "M459.72,207.63l0.38,0.6l1.64,0.99l2.1,-0.89l-0.04,0.68l0.96,0.77l0.13,1.32l-0.83,-0.22l-0.6,0.27l-0.2,0.87l-1.13,1.21l-0.11,1.02l-0.76,0.45l0.01,0.6l1.35,2.0l1.78,1.47l0.13,1.03l0.34,0.8l0.66,0.55l0.26,1.04l1.71,0.93l1.39,0.32l0.01,41.94l-114.85,0.0l-0.18,-58.95l104.37,0.0l1.48,1.2Z", "name": "Kansas"}, "US-WI": {"path": "M583.35,99.5l0.53,-0.35l0.58,-2.32l0.98,-0.11l0.74,-0.61l0.41,-1.38l0.5,-0.58l0.65,0.06l0.02,0.41l-0.78,-0.05l-0.25,0.48l-0.0,1.3l-0.41,0.12l-0.19,0.55l0.49,0.65l-0.87,0.87l-0.95,1.81l-0.1,1.24l-1.36,2.13l-0.43,0.09l-0.73,-1.08l-0.09,-0.74l0.52,-1.52l0.76,-0.97ZM498.02,98.68l0.43,-0.24l0.35,-0.88l-0.34,-1.53l0.19,-1.93l0.79,-1.11l0.71,-2.23l-1.41,-3.07l-0.81,-0.42l-1.3,-0.11l-0.04,-2.38l1.88,-2.17l0.01,-0.79l0.91,-1.52l2.08,-0.95l0.55,-0.73l1.01,-0.18l0.53,-0.74l1.19,-0.04l1.19,-1.51l0.01,-12.59l1.1,-0.27l0.32,-1.12l0.56,-0.33l0.29,-0.63l0.75,0.8l1.67,0.81l2.74,-0.35l3.52,-1.33l2.8,-0.6l2.5,-2.01l0.3,0.34l1.43,0.02l1.44,-1.42l0.87,-0.53l1.09,0.01l0.48,-0.5l0.28,0.52l0.52,0.07l0.23,0.56l-0.67,1.73l-0.77,0.89l-0.16,1.01l0.23,0.71l-1.3,1.79l0.0,0.95l1.21,0.14l1.95,-0.85l0.75,-0.78l2.1,1.49l2.35,0.73l0.4,0.6l0.9,-0.05l1.57,0.9l1.91,3.89l15.52,4.32l4.5,2.55l1.72,0.03l1.6,0.63l1.43,-0.44l3.13,1.12l2.2,0.37l0.82,0.52l0.46,0.98l-0.57,1.06l0.31,0.82l3.36,1.07l1.28,1.33l-0.25,0.7l0.46,1.2l-0.46,0.77l0.27,1.31l-0.95,1.16l-0.26,1.76l0.83,0.75l1.42,-0.08l1.13,-0.59l0.17,0.29l-1.11,2.35l-0.13,1.32l1.13,1.63l0.8,0.46l-0.5,1.98l-2.57,0.88l-0.61,0.71l-0.12,1.26l-2.05,3.27l-0.84,3.42l1.0,0.96l0.91,0.07l0.54,-0.3l0.66,-1.29l2.0,-1.22l0.99,-2.43l1.28,-1.55l0.56,0.26l0.67,-0.63l0.93,-0.28l0.97,1.26l0.56,0.27l-0.57,2.12l-1.56,2.67l-1.29,5.43l0.08,1.12l0.67,1.02l0.0,0.52l-2.09,2.04l-1.35,3.69l-0.19,2.53l0.55,1.26l-0.1,1.21l-1.46,3.0l-0.15,2.06l-0.98,1.95l-0.58,2.35l0.32,2.03l-0.2,1.27l0.41,0.58l-0.41,1.61l0.79,0.87l0.22,2.4l0.97,1.62l-0.14,1.62l-0.5,1.34l0.09,2.86l-43.19,-0.41l-0.12,-0.77l-1.31,-2.25l-4.71,-1.26l-0.9,-1.38l-0.2,-1.65l-0.77,-1.24l-0.39,-4.8l1.26,-2.43l0.01,-0.97l-0.63,-0.84l-1.36,-0.59l-0.54,-1.77l0.09,-5.91l-0.57,-1.43l-0.29,-2.56l-1.09,-0.7l-0.95,-1.63l-0.91,-0.19l-1.09,-0.84l-1.7,-0.06l-2.49,-1.99l-1.99,-3.65l-2.45,-2.3l-2.89,-0.77l-0.63,-1.29l-1.04,-1.08l-3.08,-0.69l-3.32,-3.0l0.55,-1.2l0.01,-1.62l0.31,-0.79l-0.65,-3.19Z", "name": "Wisconsin"}, "US-OR": {"path": "M3.24,147.1l1.67,-4.07l0.91,-4.98l-0.17,-1.06l0.32,-0.34l0.2,0.74l0.73,-0.09l0.12,-1.14l0.62,-0.99l0.45,0.82l1.39,-0.08l-1.14,-2.38l-0.84,0.29l1.04,-4.09l0.88,-1.0l0.87,0.18l0.45,-0.46l-0.97,-1.13l-0.65,-0.14l0.54,-4.6l0.3,-0.47l-0.2,-0.93l0.31,-5.69l0.44,-2.15l0.47,0.22l0.57,-0.45l-0.36,-0.91l-0.62,-0.17l0.25,-2.89l0.83,-0.04l0.11,-0.5l-0.28,-0.47l-0.57,-0.14l-0.2,-2.9l0.85,-3.02l0.05,-3.15l0.67,-2.01l0.17,-3.28l-0.34,-0.99l0.91,-1.39l-0.11,-0.59l-0.62,-0.53l0.01,-0.56l0.67,0.5l0.45,-0.06l0.22,-0.71l-0.18,-1.41l-0.92,-0.52l0.19,-1.32l1.07,-1.1l-0.06,-0.46l-0.98,-0.28l-0.54,-1.04l0.29,-2.37l-0.43,-1.41l0.76,-0.82l0.18,-0.94l-0.9,-3.79l0.73,0.75l1.0,0.18l0.19,0.92l0.67,0.38l0.21,-0.91l0.36,-0.24l-0.52,-0.92l1.35,0.55l1.52,-0.39l1.28,-1.05l2.02,2.0l2.17,0.28l1.22,-1.01l0.92,-0.16l2.09,1.09l1.03,0.85l0.67,1.84l0.62,0.67l0.47,2.05l-0.09,1.33l0.41,0.87l-0.01,1.83l0.6,1.37l0.98,0.65l2.06,0.09l1.67,0.7l1.44,0.08l1.19,0.44l4.8,-1.7l2.63,-1.73l1.25,0.24l2.24,-0.42l4.54,0.45l0.82,0.39l0.45,1.1l0.69,0.45l1.78,-0.69l2.25,0.24l3.64,-1.39l0.6,-0.57l2.38,0.45l1.69,-0.12l1.13,-0.56l1.05,0.04l1.59,-1.15l2.97,-1.09l4.19,-0.75l1.41,-1.25l7.39,-0.46l0.92,-0.39l0.68,-0.75l32.59,-0.04l0.56,1.79l1.26,1.67l1.27,0.42l2.31,1.53l1.0,2.36l0.02,1.04l-2.89,5.19l-0.15,1.48l-0.92,2.86l-1.77,2.79l-0.17,2.76l-1.15,2.08l-1.94,1.87l-1.29,3.63l-1.24,1.52l-0.24,2.09l0.22,1.85l0.44,0.85l0.66,0.5l0.54,-0.06l0.32,-0.41l0.75,0.63l0.86,-0.21l0.22,0.84l0.95,0.78l-0.27,1.05l-0.63,0.17l-0.26,0.45l0.53,1.71l-0.55,2.66l-0.94,1.59l0.22,38.43l-111.52,0.0l-2.08,-2.03l-0.32,-2.25l-0.49,-0.75l-0.34,-1.58l-0.03,-2.22l0.62,-2.66l-0.09,-1.2l-0.33,-1.18l-0.6,-0.5l-0.41,-1.02l-0.47,-0.19l-0.56,-1.68Z", "name": "Oregon"}, "US-KY": {"path": "M550.76,275.12l0.49,-1.75l1.51,1.17l0.89,-0.39l1.36,-3.03l0.13,-1.14l-0.29,-1.04l0.43,-0.71l0.1,-1.79l-0.92,-1.78l1.45,-2.22l1.01,-0.63l1.24,0.05l5.4,2.8l0.8,0.19l0.8,-0.21l0.91,-1.54l-0.05,-0.79l-1.18,-2.49l0.33,-1.4l0.39,-0.4l1.01,-0.04l1.21,-0.6l2.8,-0.51l0.65,-0.39l0.28,-1.04l-1.14,-1.98l0.0,-0.58l1.42,-1.58l0.27,-0.99l1.04,0.51l1.2,-1.06l-0.37,-1.85l1.59,1.02l1.62,-0.52l-0.11,0.99l0.9,0.56l1.02,-0.73l0.21,-1.13l1.0,0.01l1.22,-0.5l3.77,1.87l0.47,0.9l0.8,0.27l0.62,-0.47l0.97,-2.14l1.31,-0.31l1.4,-1.01l0.61,1.23l0.66,0.48l1.01,0.04l0.04,0.66l0.85,0.29l0.71,-0.49l0.15,-0.86l1.0,-0.43l0.16,-2.1l0.8,-0.24l0.43,-1.06l1.17,-0.35l0.42,-0.57l0.1,1.31l0.48,0.62l1.24,0.76l1.13,0.16l0.89,0.86l0.53,-0.03l0.31,-0.45l1.05,-0.26l0.58,-0.56l0.51,-3.09l1.06,-1.81l0.88,0.31l1.58,-0.86l1.15,-2.97l1.0,-0.19l1.82,-1.77l0.12,-0.77l-0.67,-2.69l2.58,-0.13l1.3,0.94l3.92,-1.97l2.11,-0.09l0.01,-1.02l0.54,-1.26l-0.26,-0.4l-1.06,-0.19l0.7,-1.16l-0.76,-1.52l1.75,-1.37l1.48,1.31l0.87,0.03l1.89,-0.63l0.58,0.9l1.52,0.74l1.49,3.97l2.27,0.99l1.8,-0.22l1.42,0.49l1.69,1.98l0.82,0.53l1.2,0.04l0.78,-1.09l0.96,-0.31l1.13,0.65l1.21,0.24l1.03,1.18l1.27,-0.41l1.3,0.1l2.07,-1.98l1.69,-0.63l0.44,2.21l0.5,0.86l2.09,1.12l1.05,1.08l0.49,1.03l0.28,3.07l-1.01,1.97l1.58,2.7l1.06,1.02l-0.14,0.94l0.88,0.75l0.33,1.36l1.23,1.39l0.51,1.49l1.87,1.19l0.79,1.16l1.76,0.59l-5.26,4.46l-5.19,2.8l-0.53,0.71l0.0,1.1l-2.15,1.35l-0.22,1.42l-2.96,0.93l-1.12,1.94l-1.57,0.25l-2.67,1.17l-1.54,0.17l-3.36,1.58l-21.61,-0.76l-11.62,-0.07l-9.98,-0.69l-20.58,0.38l-0.52,-0.56l-3.25,-0.33l-0.47,0.53l0.52,3.18l-20.62,-0.01Z", "name": "Kentucky"}, "US-ME": {"path": "M836.41,93.86l1.2,-0.85l0.86,2.07l0.79,0.3l1.03,-1.92l0.22,-2.26l1.54,0.87l0.83,-0.18l0.37,-0.44l-0.09,-0.77l-0.99,-0.82l-0.24,-0.74l0.62,-1.32l1.46,-1.7l2.72,-1.54l0.32,-0.95l-0.21,-1.07l1.51,-1.28l0.85,-1.35l0.08,-0.95l-0.88,-0.67l0.38,-1.41l-0.26,-0.56l0.85,-0.77l0.16,-0.62l-0.58,-1.55l0.67,-1.66l0.57,-0.5l0.16,-1.01l1.81,-1.5l1.03,-6.41l11.69,-17.0l2.33,0.53l0.08,3.58l0.4,0.61l2.09,1.35l0.66,0.01l1.95,-1.04l1.73,-0.17l2.02,-1.37l1.28,0.31l0.79,-0.24l0.73,-1.35l0.53,-0.15l1.34,0.52l3.14,2.69l0.79,1.35l1.97,1.87l0.37,25.13l0.4,0.85l-0.57,0.84l0.29,1.36l-0.62,1.44l-0.34,-0.07l-0.45,0.54l1.27,1.67l1.65,0.81l0.65,0.67l1.87,0.46l1.42,-0.18l0.04,0.95l-1.05,1.16l0.98,2.36l-0.65,2.66l2.02,2.52l0.96,0.24l0.69,-0.54l0.11,-0.5l0.32,0.2l0.07,0.56l0.58,0.29l0.96,1.54l-0.0,0.8l0.88,1.33l-0.13,0.46l-0.45,-0.31l-0.5,0.25l-0.09,0.8l-0.68,-0.41l-0.46,0.26l-0.07,0.65l0.59,0.78l0.21,1.05l0.39,0.32l0.45,-0.78l0.43,-0.04l0.64,0.59l0.52,-0.69l0.19,0.5l-0.58,0.7l-0.56,-0.0l-1.66,2.18l-0.59,0.46l-0.58,-0.25l-0.44,0.31l0.01,-0.9l-0.45,-0.47l-0.87,0.35l-0.55,-0.13l-0.19,0.45l0.26,1.0l-0.7,-0.74l-0.52,0.48l0.07,0.58l-1.28,-0.62l-0.82,0.72l-0.08,0.45l0.39,0.23l-0.12,1.05l-0.22,0.11l-0.16,-0.66l-0.49,-0.24l-0.52,0.29l-0.56,0.96l0.06,-1.61l-1.2,-0.33l-1.42,1.32l-0.17,0.4l0.35,0.78l-0.99,0.32l-0.5,-0.66l-1.04,0.73l-0.12,0.64l0.73,0.91l-0.4,0.08l-0.37,0.74l-0.36,-0.35l-0.2,-1.98l-0.82,-0.77l-0.44,0.08l-0.29,-0.54l-0.75,0.41l-1.12,-0.59l-0.53,0.72l0.6,0.63l-0.11,0.34l-0.47,-0.22l-0.66,0.2l-0.31,0.63l-0.13,-1.12l-1.1,-0.4l-0.36,0.55l0.21,0.99l-1.67,0.44l0.43,1.32l-0.26,1.02l0.29,0.78l-0.78,-0.7l-0.98,-0.1l-0.99,-0.78l0.13,-0.91l0.79,-0.03l0.1,-0.55l-0.24,-0.6l-0.59,-0.33l-0.39,0.21l0.54,-2.31l-0.28,-0.33l-1.13,-0.1l-0.59,1.86l-2.37,1.22l-0.14,0.48l0.71,1.78l-0.91,0.7l-1.41,3.57l0.28,1.56l-1.56,1.27l-0.69,-0.43l-0.72,0.73l-0.56,-0.25l-0.02,-1.2l-0.62,-0.43l-0.81,0.8l-0.11,0.68l-0.6,0.42l-0.64,2.29l-0.58,-1.23l0.53,-1.15l-0.04,-0.63l-0.86,0.02l-0.71,1.85l-0.33,-0.36l0.62,-1.4l-0.32,-0.53l-0.8,0.25l-1.66,2.6l-0.12,-2.07l0.54,-1.09l-0.29,-0.39l-0.5,0.05l-1.79,2.11l0.17,0.61l0.84,0.12l0.24,1.81l0.01,0.41l-0.07,-0.62l-0.42,-0.38l-0.72,0.08l-0.26,0.58l-1.27,-0.52l-3.01,2.31l-1.07,1.59l0.09,0.65l-0.83,0.41l0.35,0.56l0.91,0.07l0.06,0.96l-2.14,0.56l-0.44,0.92l0.21,1.47l-0.27,0.6l-1.13,0.97l-1.06,0.28l-0.89,1.04l-0.06,1.58l-1.21,2.47l-0.64,-0.54l-0.56,0.43l-0.73,-0.99l0.02,-1.89l-0.77,-0.62l-1.62,-2.54l0.31,-3.44l-1.96,-37.67ZM854.44,125.8l-0.0,0.25l-0.14,0.19l0.12,-0.25l0.03,-0.19ZM855.7,126.43l0.22,0.79l-0.18,0.42l-0.22,-0.32l0.19,-0.88ZM858.87,124.21l0.14,0.89l-0.19,0.09l-0.33,-0.31l0.38,-0.67ZM871.97,114.57l-0.19,0.14l0.05,-0.22l0.14,0.09ZM864.94,123.02l0.0,0.01l-0.02,0.01l0.02,-0.03Z", "name": "Maine"}, "US-OH": {"path": "M642.81,170.73l1.51,0.61l0.97,-0.13l1.39,1.24l1.99,0.63l1.19,1.34l1.32,0.48l-2.01,0.71l-0.2,0.44l0.37,0.31l2.28,0.58l1.5,-0.79l1.7,0.07l3.02,1.47l0.88,0.09l1.63,-0.95l1.74,-0.24l3.23,-1.25l2.46,0.44l1.14,-0.37l1.18,0.16l1.15,-0.55l5.01,-4.29l4.93,-2.38l7.36,-2.74l0.0,26.9l-0.56,0.38l-1.28,0.15l-0.57,0.8l1.1,2.37l-0.38,1.91l0.43,1.22l-1.18,2.16l-0.91,2.83l-0.44,2.83l-0.59,0.29l0.1,1.06l-1.1,1.91l0.46,1.27l-0.58,1.61l-2.69,1.93l-1.1,1.52l-1.52,1.1l-1.91,0.89l-0.62,-0.97l-1.13,-0.09l-1.52,1.33l-0.32,1.16l-1.77,0.47l-1.11,1.87l-0.03,1.46l-1.0,0.61l0.66,1.15l-0.01,1.11l-0.71,0.06l-0.37,0.9l-0.35,0.44l0.26,-0.78l-0.61,-1.3l-1.32,-0.76l-1.19,0.53l-1.02,1.56l-0.77,2.33l-0.63,0.67l0.49,3.38l-1.42,0.3l-0.96,2.91l-2.48,0.57l-0.88,-0.11l-0.5,-1.06l-1.18,-1.23l-2.0,-1.03l-0.83,-2.93l-0.64,-0.46l-2.28,0.82l-1.2,0.97l-0.52,0.86l-1.31,-0.09l-0.87,0.4l-0.84,-1.06l-2.77,-1.02l-1.38,0.44l-0.68,1.03l-0.63,-0.07l-2.41,-2.48l-1.71,-0.55l-1.7,0.24l-1.85,-0.78l-0.28,-1.51l-0.71,-0.96l-0.44,-1.42l-1.68,-0.9l-0.89,-1.07l-2.27,0.69l-0.41,-0.04l-1.45,-1.36l-1.23,0.61l0.27,-52.09l20.23,-0.72ZM652.48,174.69l0.53,-0.57l0.43,0.46l-0.38,0.21l-0.58,-0.1Z", "name": "Ohio"}, "US-OK": {"path": "M385.84,311.91l-0.05,-36.41l-0.39,-0.4l-46.32,-0.01l-0.01,-8.92l129.82,0.0l-0.0,9.37l2.79,21.41l-0.69,32.43l-1.19,-0.56l-1.81,-0.29l-0.89,-0.79l-1.58,-0.33l-1.43,-1.82l-1.06,-0.25l-1.87,-1.43l-1.31,-0.41l-0.74,0.37l-0.26,0.76l-0.67,0.14l-0.45,0.51l-2.1,-0.22l-1.46,-1.32l-2.08,1.01l-1.03,0.15l-0.73,0.67l-1.8,-0.73l-1.5,0.94l-1.81,0.37l-0.75,1.12l-1.27,0.0l-0.52,1.02l-1.0,-1.32l-1.46,-0.16l-0.36,-0.55l-0.95,-0.37l0.03,-0.79l-0.39,-0.48l-1.11,-0.18l-0.69,1.16l-0.52,0.06l-0.72,-0.45l-0.82,0.04l-0.56,-1.29l-0.98,-0.34l-0.95,0.33l-0.54,1.57l-0.56,-0.09l-0.5,0.42l0.19,0.61l-0.44,1.4l-0.32,0.12l-0.66,-1.19l0.38,-1.41l-0.65,-0.79l-0.76,0.13l-0.42,0.6l-0.74,-0.14l-0.82,0.8l-0.89,0.08l-0.41,-1.16l-1.7,-0.2l-0.22,-1.25l-1.08,-0.51l-0.74,0.27l-1.88,1.79l-1.02,0.4l-0.78,-0.3l0.17,-1.51l-0.22,-0.53l-1.99,-0.62l-0.03,-1.82l-0.38,-0.52l-1.87,0.28l-2.19,-0.25l-0.58,0.23l-0.72,1.01l-0.78,0.03l-1.51,-1.53l-0.86,-0.12l-1.29,0.45l-2.3,-0.56l-1.61,-0.88l-0.92,0.2l-2.11,-0.28l-0.12,-1.8l-1.1,-1.62l-1.02,-0.38l-0.6,-0.71l-0.79,0.08l-0.36,1.38l-1.91,-0.59l-0.95,0.51l-0.82,-0.08l-3.28,-3.24l-1.65,-0.32Z", "name": "Oklahoma"}, "US-ID": {"path": "M117.78,111.7l1.18,-1.45l1.44,-3.91l1.5,-1.21l1.11,-1.75l0.69,-2.31l-0.16,-1.21l1.77,-2.79l0.95,-2.94l0.13,-1.43l1.64,-2.61l1.4,-3.14l-0.15,-1.02l-1.31,-2.83l-2.48,-1.57l-0.94,-0.21l-1.15,-1.47l-0.96,-2.98l-0.82,-1.1l0.74,-1.37l-0.55,-2.35l-1.54,-2.55l0.08,-60.09l14.62,0.0l-0.01,22.85l1.84,2.8l1.26,1.16l0.55,1.58l1.52,1.66l0.02,0.9l0.6,1.14l-0.87,1.17l1.21,1.71l-0.9,0.26l-0.16,0.76l2.27,1.41l1.4,1.95l2.52,0.89l0.82,1.56l1.35,1.2l1.99,2.65l0.2,0.69l1.98,1.61l0.23,1.82l1.38,1.27l0.81,0.32l0.15,1.41l0.77,0.07l0.84,-0.74l0.45,0.44l-0.27,0.5l0.13,0.66l1.28,0.81l1.67,-0.1l1.81,-0.64l-0.24,2.79l-0.93,0.71l0.44,1.12l-1.28,4.1l0.33,1.75l-0.82,0.2l-0.29,0.6l0.81,1.25l-0.48,1.02l0.15,1.18l1.13,0.79l-0.25,0.88l0.44,0.99l-1.52,0.68l-1.0,1.61l0.27,1.1l0.58,0.71l-0.02,0.77l-0.71,0.91l0.04,1.55l1.59,0.4l1.67,1.59l0.82,0.15l1.03,-0.51l0.44,-0.89l1.8,-0.7l1.02,-1.47l0.78,-0.42l0.03,-0.8l0.93,0.71l0.33,0.68l1.16,0.49l-0.24,1.31l0.87,0.84l-0.14,1.43l0.77,1.27l0.02,1.64l1.93,2.42l0.56,1.68l0.88,0.25l0.96,1.98l-0.04,1.0l-0.67,0.74l0.78,1.81l1.4,0.97l0.41,0.74l0.82,-0.03l0.81,-0.49l1.17,0.78l1.44,2.62l-0.39,0.87l1.13,1.69l-0.19,0.63l0.25,0.95l2.6,2.07l0.94,-0.27l-0.16,-1.12l0.94,-1.02l0.89,-0.34l4.71,1.01l0.64,-0.4l0.49,-1.42l1.13,-0.54l2.36,0.63l3.27,-0.52l1.06,0.75l2.2,-0.86l3.3,0.38l0.39,-0.55l-0.76,-0.68l0.13,-1.08l0.68,-0.56l-0.19,-0.95l1.17,-0.66l0.53,0.31l1.32,1.97l0.25,1.09l1.59,1.77l0.78,0.36l0.02,52.75l-92.17,0.01l-0.2,-38.44l0.88,-1.34l0.58,-2.78l-0.52,-1.65l0.7,-0.27l0.47,-1.71l-1.1,-1.08l-0.39,-1.14l-1.23,0.14l-0.57,-0.63l-1.02,0.39l-0.41,-0.37l-0.27,-1.95l0.21,-1.8Z", "name": "Idaho"}, "US-WY": {"path": "M213.63,100.66l108.19,-0.0l0.05,84.48l-108.22,0.0l-0.01,-84.48Z", "name": "Wyoming"}, "US-UT": {"path": "M212.84,165.13l0.0,20.4l0.4,0.4l30.82,0.0l-0.0,79.44l-77.01,-0.06l-0.04,-100.19l45.83,0.01Z", "name": "Utah"}, "US-IN": {"path": "M572.07,249.51l-0.39,-0.88l0.52,-0.5l0.06,-2.77l0.93,-0.58l0.0,-0.59l-0.32,-0.24l0.94,-0.81l-0.89,-1.44l0.53,-0.93l1.6,-0.16l0.52,-1.57l1.06,-1.07l0.06,-0.74l1.5,-0.78l-0.13,-1.49l0.63,-0.7l0.27,-1.13l0.86,-0.36l0.6,-1.68l-0.68,-2.42l0.28,-1.73l-0.75,-0.93l-0.38,-1.42l-0.87,-0.82l0.04,-0.5l1.02,-1.16l-0.31,-2.09l1.34,-1.06l0.18,-47.43l1.23,0.98l1.99,0.4l1.5,-0.17l2.68,-0.96l2.88,-1.61l31.24,0.02l-0.27,53.86l-0.77,0.96l0.15,0.9l0.61,0.79l-0.76,0.9l0.01,0.48l0.58,0.49l0.72,0.07l-0.4,1.37l-1.65,0.01l-3.67,1.91l-1.17,-0.92l-3.29,0.34l-0.21,0.72l0.65,2.92l-1.52,1.47l-1.15,0.29l-0.54,0.75l-0.63,2.26l-1.09,0.62l-0.94,-0.35l-0.51,0.37l-1.19,2.07l-0.43,2.89l-1.63,0.8l-0.73,-0.7l-1.12,-0.16l-1.07,-0.65l-0.39,-1.75l-1.72,-1.0l-0.46,0.22l-0.11,0.5l0.6,0.69l-0.5,0.16l-0.78,-0.42l-0.39,0.24l0.27,1.32l-1.05,0.46l-0.19,2.13l-1.04,0.45l-0.11,0.62l-0.25,-0.53l-1.46,-0.04l-1.04,-1.66l-0.48,-0.14l-1.69,1.12l-1.51,0.43l-1.3,2.42l-0.59,-1.04l-3.35,-1.69l-0.97,-0.29l-1.68,0.61l-0.43,-0.96l-0.54,-0.25l-0.58,0.46l0.36,1.73l-0.38,0.67l-0.21,0.05l0.12,-1.02l-0.35,-0.43l-1.96,0.47l-1.69,-1.04l-0.55,0.21l-0.29,0.65l0.45,1.46l-0.49,0.56l-0.95,-0.46ZM593.9,248.27l-0.06,0.28l-0.09,0.06l0.15,-0.34Z", "name": "Indiana"}, "US-IL": {"path": "M518.98,198.65l0.84,-0.25l0.43,-0.62l-0.02,-2.17l-0.61,-0.93l0.17,-0.34l0.72,-0.57l2.36,-0.7l0.74,-0.55l0.75,-1.51l0.35,-1.94l1.78,-2.15l0.35,-0.86l-0.3,-3.03l-1.95,-1.95l0.05,-1.65l0.84,-2.16l0.45,-0.31l4.46,-0.38l0.81,-0.31l0.89,-0.97l2.52,-0.7l1.52,-1.33l0.7,-3.06l1.5,-1.23l0.36,-0.68l0.75,-4.1l-0.52,-2.12l-3.62,-2.74l-0.51,-2.28l-3.28,-2.68l43.54,0.42l-0.34,2.51l0.23,2.53l1.01,2.53l1.13,1.05l0.4,2.54l0.86,2.71l1.12,1.91l-0.18,48.21l-1.26,0.88l-0.18,0.64l0.41,1.64l-0.89,0.87l-0.17,1.03l0.97,1.15l0.34,1.33l0.72,0.84l-0.31,1.61l0.69,2.19l-0.42,1.26l-0.87,0.41l-0.38,1.3l-0.65,0.76l0.14,1.1l-1.44,0.82l-0.28,0.38l0.18,0.64l-0.98,0.93l-0.42,1.01l-1.58,0.43l-0.77,1.43l0.05,0.77l0.76,0.83l-1.26,0.83l0.18,0.74l-0.55,0.66l0.04,2.59l-1.05,0.06l0.03,0.45l0.65,0.72l-0.37,0.11l-0.11,0.62l0.71,0.35l-0.01,0.34l-1.4,1.58l-0.36,1.04l1.16,2.76l-3.08,0.7l-1.16,0.59l-1.16,0.08l-0.82,0.83l-0.39,1.81l1.22,2.65l-0.58,1.41l-0.83,-0.08l-5.39,-2.8l-0.98,-0.19l-0.84,0.12l-1.29,0.8l-1.66,2.52l-0.03,0.52l-0.88,-1.13l-1.02,0.25l-0.12,0.53l0.3,0.62l-0.82,-0.71l0.05,-0.6l-1.21,-2.1l-0.26,-1.04l-0.62,-0.39l1.27,-2.4l-0.19,-0.94l-1.09,-1.92l-0.12,-2.88l-1.94,-1.1l-1.19,-2.05l-1.68,-0.91l-1.43,-1.35l-1.41,-0.28l-1.55,-1.02l-1.93,-1.79l-1.9,-2.38l-0.15,-1.75l2.8,-5.92l-0.0,-2.1l1.09,-1.77l-0.27,-0.83l-2.32,-1.57l-2.33,-0.84l-1.02,0.15l-1.16,1.37l-0.81,0.06l-1.01,-1.8l-0.26,-1.41l0.22,-0.79l-0.41,-0.87l-0.12,-1.52l-0.65,-1.32l-0.79,-0.91l-3.58,-2.65l-0.79,-1.58l-3.91,-3.6l-0.52,-1.8l-0.87,-1.19l0.1,-1.46l-0.77,-1.44l-0.4,-3.31l0.34,-2.69l0.66,-1.11Z", "name": "Illinois"}, "US-AK": {"path": "M78.13,425.42l0.67,-0.56l1.01,-0.19l0.42,-1.24l0.54,0.26l0.55,-0.2l0.78,-0.66l0.5,-0.99l1.34,-0.89l0.51,0.45l1.18,0.17l1.11,-0.44l0.13,-0.66l-1.13,-0.68l0.18,-0.21l1.47,-0.89l0.62,0.29l0.59,-0.3l1.48,-1.26l1.59,-0.23l0.54,0.36l-0.45,1.17l0.1,0.87l-1.1,0.67l0.36,0.55l0.69,0.0l0.68,0.86l2.32,0.19l1.14,-0.27l0.17,0.72l2.03,-0.47l1.02,0.81l0.51,-0.15l0.93,-2.42l0.85,0.47l-0.28,0.4l0.24,0.43l0.49,0.05l0.43,-0.37l0.27,-1.19l-0.56,-1.02l-1.11,-0.5l0.47,-0.34l1.44,1.22l2.36,-0.46l0.13,-1.3l-0.36,-1.4l-1.39,0.41l-0.8,-0.61l-1.03,0.15l-0.46,0.25l-0.35,0.77l-1.4,-1.32l0.28,-1.32l0.99,-0.56l-0.06,-0.6l-0.7,-0.49l-0.77,-0.29l-1.07,0.22l-0.34,-0.32l-0.03,-0.71l-0.4,-0.2l-0.46,0.16l-0.38,1.15l-3.57,-0.7l-0.25,-1.99l-1.2,-2.53l-3.83,-3.56l-2.41,-1.31l-0.53,-0.86l-1.18,-0.83l0.34,-0.19l0.45,-1.89l0.04,-2.64l1.59,0.26l2.13,-0.19l2.59,-0.51l1.4,-0.77l1.21,-1.15l1.69,-2.44l0.32,-2.48l0.48,-1.11l-0.17,-0.52l1.54,-1.89l0.9,-1.85l1.14,-0.08l0.85,-0.48l0.12,-0.41l0.93,-0.05l0.84,-0.47l0.59,0.1l0.15,-0.51l2.38,-2.44l-0.43,0.98l0.56,0.22l-0.43,0.93l0.26,0.51l0.5,-0.08l0.51,1.2l0.45,0.23l0.32,-0.69l-0.33,-2.17l1.27,-0.29l0.69,-0.64l-0.5,-0.53l-1.39,0.11l-0.5,-1.02l0.99,-1.2l1.29,1.31l0.36,-0.27l-0.05,-0.52l0.76,-0.42l0.76,0.13l3.05,-0.83l2.32,-2.28l1.67,-2.78l0.59,0.76l1.0,0.1l-0.06,0.54l0.46,0.4l0.6,-0.31l0.77,0.15l0.1,0.57l-0.57,0.71l-1.03,0.29l-0.44,0.58l0.16,0.7l0.48,0.31l-0.05,1.02l0.54,0.37l0.37,-0.21l0.1,-0.54l1.12,-0.34l0.55,-1.51l0.55,0.13l0.64,-0.3l0.33,-0.87l0.59,0.69l-0.7,1.13l0.81,1.03l1.09,0.01l0.39,0.59l0.67,-0.2l0.76,-1.04l1.11,0.1l1.0,-0.47l1.82,1.17l0.57,-0.67l0.53,0.23l-0.78,1.28l0.12,0.82l-0.52,0.55l0.14,0.49l0.58,0.21l2.04,-0.23l-0.5,0.69l0.31,0.54l1.76,0.11l0.76,0.61l0.44,-0.01l0.21,-0.73l1.33,-0.27l0.09,-0.31l0.58,0.22l-0.07,0.35l0.46,0.4l1.25,-0.39l0.58,-0.53l1.12,-0.09l2.82,0.98l0.74,1.03l0.66,0.03l0.48,-0.42l0.98,0.53l0.09,0.57l0.57,0.34l2.13,0.49l1.27,-0.25l3.05,0.41l2.16,1.62l1.95,0.18l1.15,-0.69l0.59,0.0l0.29,0.54l1.22,-1.1l1.08,-0.02l0.14,0.37l0.65,0.08l0.12,-0.35l0.98,0.22l1.37,1.16l0.54,0.9l0.66,0.15l0.36,0.52l1.16,0.3l0.94,1.17l0.42,0.16l0.74,-0.29l0.02,77.4l0.34,0.48l1.55,0.54l0.61,-0.4l1.33,0.64l1.33,-1.01l1.49,-0.09l-0.34,1.5l0.93,1.06l-0.47,-0.05l-0.95,-1.16l-0.45,-0.07l-1.22,1.65l-1.3,0.7l-1.06,-0.01l-2.12,-0.91l0.09,-1.38l-0.76,-0.72l-0.47,0.16l-0.07,0.86l-0.45,0.23l-3.82,-1.05l-3.87,0.79l-0.72,-1.29l-1.55,-0.17l-0.77,-0.65l0.34,-0.82l-0.09,-0.74l0.69,-0.66l-0.14,-0.62l-0.94,0.16l-1.82,2.26l-1.15,-0.71l0.53,-1.26l-0.52,-0.27l-0.34,0.21l-1.34,-1.67l-1.22,0.31l-0.14,-0.75l1.26,-0.34l0.13,-0.58l-0.28,-0.34l-1.44,-0.09l-1.03,1.0l-0.58,-0.18l-1.01,0.26l-0.18,-1.15l-0.53,-0.09l-0.15,-0.79l-0.48,-0.1l-0.97,1.32l-0.48,-0.15l-0.99,0.46l-0.29,0.8l0.51,0.61l-1.21,0.48l-0.18,1.16l0.35,0.4l0.6,-0.07l-0.79,0.84l0.05,0.71l0.52,0.07l0.53,-0.5l0.5,0.33l-0.81,1.54l0.19,0.85l-0.55,0.52l-0.66,0.01l-0.61,-0.72l-0.76,0.24l-0.22,-0.59l-0.64,-0.04l-0.26,1.26l-0.46,-0.22l-0.47,0.2l-0.4,1.02l-0.67,0.12l0.03,0.55l-0.58,-0.13l-0.56,0.9l-0.25,-0.18l-0.66,0.39l-0.2,0.39l0.21,0.34l-1.0,1.0l-0.94,-0.18l-1.36,0.85l-0.56,-0.34l0.35,-0.59l0.37,-0.25l0.8,0.27l0.4,-0.3l-0.07,-0.47l1.31,-1.63l0.01,-0.56l-0.38,-0.24l-1.79,1.07l-0.8,-0.49l0.5,-1.62l0.99,-1.27l0.48,-1.34l0.08,-1.22l-0.38,-0.99l0.98,-0.37l2.01,-1.67l0.44,0.6l0.78,0.21l0.92,-0.42l2.79,0.87l0.29,-0.54l-0.65,-0.85l-1.64,-0.39l-1.09,-0.79l1.02,-1.46l1.52,-0.71l-0.12,-0.66l-1.8,0.11l-0.93,0.88l-0.21,0.79l-0.92,-0.23l-0.44,0.21l0.01,-0.36l-0.6,-0.43l-0.71,0.87l-1.09,0.58l-0.45,0.85l-1.1,0.28l-0.87,0.71l-0.36,0.71l0.12,0.58l-0.83,0.46l-0.99,1.26l-0.37,1.44l-0.75,0.26l-0.99,-0.5l-0.64,0.35l-0.08,0.35l1.83,1.46l-0.41,0.73l-1.5,0.21l-0.48,0.67l-0.38,-0.12l-0.27,0.79l-0.26,-0.13l-0.56,0.59l0.17,0.43l-0.69,0.1l0.22,0.69l-0.94,0.46l-0.74,1.96l0.47,1.05l1.68,-0.22l0.88,0.54l0.22,0.3l-0.29,0.76l-0.6,0.6l-1.07,0.31l-0.15,0.56l-0.51,0.26l0.02,0.64l-0.72,0.44l-0.18,0.67l-0.37,-0.0l-0.45,0.81l-1.43,0.39l-0.37,0.86l-0.7,0.37l-0.14,0.41l-0.59,-0.24l-0.3,0.22l-0.52,1.25l-0.81,0.03l-0.33,0.58l-1.51,1.07l-0.18,0.6l0.59,0.6l-0.24,0.38l-0.95,0.14l-1.44,1.44l-0.82,-0.25l-0.73,1.16l-1.03,0.23l-0.93,1.04l-0.81,0.26l-0.86,1.11l0.15,0.66l-0.35,0.9l-1.85,0.76l-1.86,0.17l-0.93,0.5l-0.23,0.48l0.22,-0.69l-1.04,-0.86l0.56,-1.44l0.59,-0.65l1.44,-1.15l1.78,-0.7l0.23,-0.48l0.6,-0.23l0.88,0.25l0.55,-0.44l-0.08,-1.63l2.37,-2.67l0.36,-0.24l0.64,0.48l0.95,-0.35l-0.07,-0.98l-0.57,0.02l-0.36,-0.53l0.33,-2.59l0.58,-0.37l0.6,0.24l0.4,-0.59l-0.37,-0.42l-0.99,-0.2l-0.07,-0.4l0.3,-0.81l1.86,-1.76l-0.36,-0.32l0.2,-0.92l0.43,-0.41l0.11,-1.48l-0.76,0.27l-0.82,1.54l-3.53,1.75l-0.82,-1.1l0.17,-0.93l0.55,0.13l0.45,0.87l0.71,-0.51l-0.25,-0.67l-0.35,-0.5l-1.08,-0.38l-0.33,-0.57l-0.69,0.22l-0.0,1.15l-0.74,-0.12l-0.08,1.07l-0.47,0.67l0.48,2.09l-2.19,-3.37l-0.76,-0.16l-0.49,0.66l-0.9,-0.43l-0.61,-1.18l-3.12,1.92l-0.54,-0.13l-0.41,1.07l-0.51,0.26l-0.27,-0.23l0.58,-0.59l-0.46,-1.3l0.78,-0.85l-0.42,-0.58l-1.05,0.12l-0.08,-0.26l0.17,-0.95l0.76,-0.69l0.06,-0.52l-1.69,-3.54l0.09,-1.71l-0.79,-0.06l0.68,-1.82l0.99,-0.71l0.02,-0.67l-1.31,-0.26l-1.03,2.24l-1.12,1.32l0.17,0.47l0.62,0.29l-0.06,0.93l-2.57,1.08l-1.8,0.2l-0.66,-0.2l0.24,-0.68l-0.34,-0.52l-0.87,-0.51l-0.75,-1.02l-0.13,-0.71l-1.21,-0.08l0.21,-1.16l-0.28,-0.33l-0.53,0.04l0.67,-0.56l0.43,-0.99l1.42,0.55l-0.46,0.83l0.01,0.74l0.57,0.04l1.39,-1.51l0.15,1.18l0.86,0.15l1.14,-1.08l0.04,-0.66l-0.58,-0.53l0.09,-0.52l-0.71,-0.87l-0.56,0.12l-0.7,0.82l-1.58,-0.0l-0.29,-0.41l-1.06,-0.25l0.51,-0.33l0.16,-0.6l-1.15,-0.21l0.09,-0.63l-0.39,-0.44l1.54,-1.52l0.21,-0.72l-0.41,-0.39l-1.96,1.64l-0.85,1.81l-0.31,-0.99l-0.67,-0.36l0.44,-0.36l0.01,-0.63l-0.79,-0.63l0.7,-0.25l0.0,-0.6l-0.79,-0.32l1.44,-0.37l-0.49,-1.37l0.17,-0.67l1.91,-2.84l0.82,0.49l-0.11,0.42l0.4,0.25l0.88,-0.64l-0.62,-1.16l0.91,-1.12l-0.26,-0.65l-0.94,0.61l0.26,-0.49l-0.26,-0.68l0.35,-0.82l1.4,0.02l-0.06,-0.8l-0.59,-0.36l0.37,-0.41l0.99,-0.17l0.8,0.35l0.19,0.44l-0.63,0.82l0.24,0.44l1.22,-0.81l0.23,0.37l1.22,-0.08l1.98,-1.81l0.87,-1.41l0.39,0.33l2.69,-0.29l1.41,-0.96l0.98,-1.43l0.12,-0.86l-0.72,-3.39l-1.07,-1.59l0.8,-0.18l0.72,-0.92l0.16,-1.21l-0.94,-1.3l0.15,-0.59l-0.41,-0.17l-0.82,0.18l-0.75,1.27l-1.1,-0.43l-3.22,2.93l-1.53,-1.59l-1.12,0.8l-3.19,-0.18l-0.75,0.49l-0.98,-0.09l-0.5,0.64l-3.82,-1.05l-0.76,-0.83l0.32,-0.75l-0.17,-0.91l-0.89,-0.6l-0.16,-0.53l0.52,-0.18l0.44,-0.98l1.29,0.13l0.1,-0.65l-1.84,-0.89l-3.08,-0.54l-1.96,-1.33ZM96.17,434.68l-0.0,0.06l0.02,0.16l-0.07,-0.16l0.05,-0.05ZM86.52,459.7l0.12,0.34l-0.0,0.09l-0.12,-0.14l0.0,-0.29ZM99.62,477.15l0.04,-0.04l0.01,-0.0l-0.05,0.04ZM102.4,477.3l-0.03,0.07l-0.02,0.04l0.02,-0.08l0.03,-0.02ZM113.95,484.67l-0.0,0.0l0.0,-0.0l0.0,0.0ZM129.15,469.85l0.14,-0.04l0.23,0.03l-0.28,0.28l-0.1,-0.27ZM147.01,464.95l0.0,-0.06l0.09,-0.05l-0.01,0.03l-0.08,0.08ZM148.47,460.15l-0.14,0.95l-0.5,0.36l0.2,-0.81l0.44,-0.51ZM178.95,468.95l0.43,0.22l0.41,1.03l3.41,3.49l0.43,2.29l0.63,0.11l1.05,-0.91l-0.52,1.05l0.49,0.39l0.53,-0.44l0.67,0.17l0.61,1.03l-0.07,0.56l1.1,0.11l-0.05,0.45l0.53,0.6l-1.09,-0.69l-0.91,0.79l-0.28,-0.37l-0.93,-0.15l-1.12,-0.93l0.06,-0.79l-0.77,0.02l-0.63,-0.61l-0.36,-0.99l-1.52,-1.26l-0.1,-0.58l-0.96,-0.02l-3.38,-2.05l0.66,-0.89l-0.04,0.68l0.82,0.17l0.23,-0.45l-0.12,-1.33l1.12,0.18l0.14,-0.46l-0.46,-0.42ZM177.09,469.6l-0.15,-0.57l0.12,-0.1l0.15,0.29l-0.11,0.38ZM188.33,476.09l-0.12,-0.21l0.15,0.06l-0.03,0.15ZM188.08,475.82l-0.31,-0.03l0.03,-0.54l-0.92,-0.68l-0.49,0.0l-0.07,0.29l-0.23,-0.24l1.39,-0.53l0.4,-1.69l0.64,-0.5l0.05,-0.75l2.27,-1.0l1.28,1.23l-0.24,0.68l0.51,1.33l0.92,0.39l0.84,0.86l0.48,1.33l1.71,1.27l0.35,0.62l-0.82,0.23l-0.71,1.6l-0.55,-0.58l-0.84,-0.28l-0.59,-1.36l-0.04,-1.23l-0.65,-0.26l-0.78,-2.84l0.02,-1.43l-0.73,0.01l-0.17,0.8l-0.54,0.23l1.57,7.03l-0.61,-1.45l-0.36,-0.21l-0.48,0.42l-0.6,0.16l0.25,-0.41l-0.15,-0.89l-0.56,-0.99l0.71,-0.2l0.25,-0.55l-0.2,-0.28l-0.86,-0.02l-0.23,-0.72l-0.43,-0.22l-0.32,0.12l-0.19,1.3ZM197.12,478.43l0.57,0.62l0.04,0.67l1.33,2.36l-1.55,-0.28l-0.01,-1.3l-0.59,-0.14l-0.65,0.69l0.16,-1.82l0.68,-0.8ZM199.4,482.58l2.36,4.33l-0.29,0.57l0.24,0.57l0.72,0.22l-0.17,0.72l0.76,0.73l0.23,1.18l1.17,0.27l1.57,1.13l1.07,0.33l0.97,0.76l0.26,0.62l1.15,0.27l0.08,0.68l-0.54,1.01l0.52,2.85l-1.39,2.33l-0.52,-0.67l1.16,-1.76l-0.42,-0.52l-1.01,0.05l-0.26,-2.88l-0.78,-0.69l0.5,-0.65l-0.01,-0.51l-0.5,-0.09l-1.02,0.81l-0.5,-0.07l-1.18,0.65l-0.01,-1.1l1.18,-0.03l0.45,-0.5l-0.21,-0.44l-1.35,-0.04l-0.18,-0.69l-0.67,-0.31l-1.03,-1.74l0.28,-0.94l-1.1,0.09l-0.37,-0.49l0.06,-1.23l-0.5,-0.17l-0.38,0.27l-0.85,-0.77l0.79,-0.42l0.15,-0.47l-0.45,-0.39l-0.63,0.26l-0.07,-0.6l-0.46,-0.19l0.43,-0.15l0.79,0.6l0.48,-0.34l-0.56,-0.91l-1.31,-1.0l-0.02,-0.37l1.13,0.33l0.27,-0.47ZM207.42,500.52l-0.4,0.18l-0.11,-0.19l0.31,0.04l0.2,-0.03ZM207.35,499.25l-0.17,0.22l-0.53,0.13l0.27,-0.35l0.42,-0.0ZM203.2,495.74l0.2,0.21l-0.2,0.3l-0.45,-0.03l-0.06,0.25l-0.05,-0.22l0.55,-0.5ZM202.24,492.6l0.44,0.1l0.13,0.37l-0.46,-0.21l-0.1,-0.25ZM198.34,486.95l-0.12,-0.18l0.25,0.01l-0.09,0.07l-0.04,0.1ZM194.65,481.71l0.05,1.26l0.33,0.06l0.42,1.11l0.46,0.26l0.0,0.25l-0.47,0.09l-0.2,0.96l-0.18,-0.44l-0.38,-0.03l0.38,-0.22l-0.0,-0.67l-0.88,-0.15l-0.48,-2.8l0.17,-0.4l0.73,0.09l0.06,0.63ZM195.19,486.11l-0.03,0.57l-0.8,0.77l0.28,-1.09l0.56,-0.25ZM192.52,476.08l-0.0,0.0l-0.02,-0.03l0.02,0.03ZM98.16,415.58l-0.85,-0.24l-0.38,-0.87l0.55,-0.12l0.68,1.23ZM104.59,496.27l-0.65,0.05l-0.08,0.44l-0.27,-0.22l0.17,-0.55l0.83,0.28ZM103.26,496.69l-1.21,0.65l-1.2,-1.0l-0.9,0.15l-1.09,2.28l-0.4,0.03l-0.81,0.82l-0.54,-0.86l0.3,-0.41l-0.1,-0.52l0.89,-1.17l1.42,-1.15l2.09,-0.34l0.83,1.25l0.71,0.26ZM101.68,497.82l-0.45,0.2l-0.32,-0.14l0.05,-0.2l0.71,0.13ZM96.09,500.12l-0.25,0.49l-0.31,-0.65l0.46,-0.31l0.09,0.47ZM93.53,501.89l-0.5,0.66l-2.09,0.08l-0.89,1.1l-0.89,0.1l-0.22,-0.47l0.71,-0.53l0.66,-1.34l0.93,0.1l1.0,-0.8l0.8,-0.05l0.49,1.16ZM103.72,495.94l-0.17,-0.23l0.07,-0.01l0.1,0.23ZM86.35,459.38l0.01,-0.02l0.03,0.03l-0.04,-0.0ZM101.26,434.81l-0.14,0.0l-0.17,-0.06l0.31,0.06ZM204.15,497.84l0.14,-0.12l0.09,0.44l-0.09,-0.16l-0.13,-0.16ZM204.7,497.07l-0.16,-0.42l0.35,-0.15l0.27,-1.2l0.34,-0.15l0.78,1.6l-0.14,1.04l-0.22,0.02l-0.27,-1.24l-0.52,-0.27l-0.43,0.77ZM197.91,492.8l0.12,0.01l0.19,0.21l-0.42,-0.13l0.1,-0.09ZM198.68,493.09l0.03,-0.16l0.23,0.28l0.02,0.13l-0.27,-0.26ZM199.1,494.49l1.08,0.31l0.81,1.12l-0.63,2.11l0.24,0.4l1.56,0.3l-0.41,0.52l0.29,0.55l0.34,-0.03l-0.38,0.59l-1.1,-1.67l-0.42,0.15l-0.15,-0.66l-0.74,-0.71l0.48,-0.37l-0.03,-0.69l-1.39,0.19l0.76,-0.9l-0.32,-1.2ZM202.1,500.84l0.39,0.32l0.02,0.3l-0.45,-0.55l0.05,-0.06ZM202.63,501.65l0.08,0.06l-0.06,0.04l0.0,-0.04l-0.02,-0.07ZM200.95,493.58l0.06,-0.19l0.07,-0.05l0.06,0.27l-0.19,-0.03ZM201.52,493.72l0.26,-0.08l0.38,0.17l-0.23,0.25l-0.41,-0.33ZM202.07,494.3l0.03,-0.01l-0.02,0.15l0.01,-0.05l-0.01,-0.1ZM200.36,490.41l0.19,0.25l-0.28,0.07l0.06,-0.34l0.03,0.03ZM199.82,492.23l0.51,-0.13l0.01,0.4l-0.16,0.08l-0.36,-0.36ZM195.65,489.99l-0.43,-0.27l0.58,-0.27l0.16,0.31l-0.31,0.23ZM197.54,489.86l0.03,-0.82l-1.0,-1.0l1.57,0.55l0.17,0.32l-0.36,0.17l0.06,0.71l0.78,1.32l-0.78,-0.19l-0.36,0.25l-0.12,-1.32ZM197.65,491.21l0.02,0.11l-0.03,0.01l-0.0,-0.0l0.0,-0.12ZM199.3,489.85l-0.07,-0.11l-0.02,-0.11l0.02,0.06l0.06,0.15ZM199.18,489.48l-0.49,-0.5l0.31,-0.38l0.35,0.47l-0.17,0.42ZM188.37,482.81l-0.12,-0.14l-0.06,-0.12l0.25,0.25l-0.07,0.0ZM188.68,483.02l0.28,0.1l0.37,-0.6l-0.66,-0.8l0.43,-0.19l-0.17,-0.59l0.65,-0.12l0.17,-0.41l0.44,0.21l0.04,0.37l-0.58,0.12l-0.56,0.68l0.59,0.74l1.29,0.76l0.11,0.43l-1.25,-0.84l-0.45,0.53l0.04,0.48l-0.74,-0.85ZM190.88,482.01l0.49,-0.6l1.13,0.39l-0.95,0.05l0.12,0.67l-0.79,-0.52ZM191.4,483.89l0.63,0.1l0.53,-0.29l0.18,1.14l-1.33,-0.94ZM189.68,484.21l0.27,0.22l0.06,0.4l-0.49,-0.42l0.16,-0.19ZM190.11,484.94l0.19,0.14l-0.03,0.09l-0.05,0.02l-0.11,-0.24ZM191.28,485.71l0.3,-0.15l0.68,0.34l0.9,1.95l0.35,2.11l-0.04,2.37l-0.59,-1.19l0.55,-0.73l-0.61,-1.03l-0.94,-0.46l0.55,-0.94l-0.29,-0.42l-0.42,-0.01l0.34,-0.42l-0.88,-0.9l0.1,-0.5ZM148.76,468.75l0.04,-0.1l0.01,0.1l-0.05,-0.0ZM130.02,480.92l0.72,-0.31l-0.18,-0.38l0.54,-0.02l-0.17,0.68l-0.53,0.34l-0.38,-0.31ZM131.23,480.07l-0.13,-0.9l0.31,-0.09l0.61,0.83l-0.13,0.45l-0.45,-0.42l-0.21,0.12ZM124.32,486.05l0.34,-0.93l1.15,-0.81l0.21,0.05l-0.26,0.29l0.68,0.46l0.58,1.27l0.86,0.38l-0.12,0.39l-0.42,-0.34l-0.58,0.31l-0.66,-0.29l-1.05,0.07l-0.72,-0.86ZM125.48,488.15l0.1,-0.09l0.0,-0.01l-0.01,0.19l-0.1,-0.1ZM128.71,486.5l-0.59,0.14l-0.55,-1.53l1.16,-1.13l0.6,0.03l0.41,-0.91l0.76,0.78l0.39,-0.72l0.72,-0.37l-0.37,1.1l0.52,0.68l0.39,0.04l-0.13,0.22l-2.06,-0.34l-0.47,0.74l0.22,0.46l-0.41,-0.13l-0.22,0.79l-0.37,0.17ZM127.67,483.4l-0.5,-0.11l0.14,-0.38l0.34,0.11l0.01,0.38ZM130.36,485.59l0.16,-0.04l0.38,0.3l-0.08,-0.0l-0.45,-0.26ZM80.61,467.31l-0.12,-0.29l1.58,0.07l0.38,-0.67l1.55,-0.54l0.55,0.43l0.92,-0.01l0.25,2.04l-1.25,0.51l-1.63,-0.04l-2.23,-1.5ZM84.99,505.84l-0.1,0.03l-0.03,-0.05l0.08,-0.05l0.05,0.06ZM81.55,508.93l0.0,-0.01l0.02,0.02l-0.02,-0.01ZM82.58,508.26l0.03,0.04l-0.04,-0.01l0.01,-0.03ZM82.61,507.85l-0.1,0.17l-1.21,-0.58l0.8,-0.37l0.52,0.77ZM82.62,508.66l-0.11,-0.03l0.05,-0.12l0.05,0.11l0.01,0.05ZM75.58,511.97l0.14,-0.52l0.62,-0.07l-0.41,0.48l-0.35,0.11ZM76.95,510.57l-0.07,-0.5l0.38,-0.36l0.72,0.05l0.02,0.25l-1.04,0.56ZM65.19,441.35l0.43,0.65l0.84,-0.09l1.02,0.36l2.21,-0.92l0.61,0.51l0.08,1.05l1.62,0.44l0.32,0.58l0.86,0.01l0.47,0.45l-0.76,0.3l-0.74,0.87l-2.59,-2.34l-1.5,-0.82l-0.98,0.1l-1.33,0.9l-0.8,-0.63l0.23,-1.43ZM73.85,444.42l0.59,-0.29l0.51,0.12l-0.14,0.43l-0.96,-0.26ZM55.92,517.58l-0.04,0.06l-0.01,-0.07l0.05,0.01ZM56.35,516.26l0.13,0.02l0.09,0.1l-0.06,0.08l-0.17,-0.2ZM47.86,519.47l-0.06,0.01l0.01,-0.13l0.13,0.02l-0.08,0.1ZM11.46,512.95l0.21,0.02l0.32,-0.07l-0.37,0.39l-0.16,-0.34Z", "name": "Alaska"}, "US-NJ": {"path": "M766.74,213.83l0.58,-0.47l0.87,-2.1l0.73,-0.92l1.35,-0.74l2.72,-0.71l0.7,-0.63l-0.12,-0.86l0.53,-0.21l0.77,-1.16l1.53,-1.21l2.84,-1.37l0.34,-0.56l-0.23,-0.88l-3.19,-3.51l-0.43,-1.12l-0.9,-0.02l-0.34,-0.4l-0.53,-2.5l-1.48,-0.42l-0.18,-2.32l0.11,-0.99l1.18,-0.66l0.86,-1.73l-0.08,-0.77l-1.07,-1.74l1.58,-1.0l2.2,-2.78l0.66,-1.91l0.96,-1.05l1.02,-0.41l11.89,7.29l-1.91,5.29l-0.42,0.37l-0.1,-0.41l-0.7,-0.08l-0.53,0.99l-0.94,0.68l-0.25,1.3l-0.57,0.42l-0.27,1.05l-0.08,0.55l0.62,0.92l0.92,0.39l1.23,-0.08l2.01,0.79l-0.94,6.33l-0.6,0.21l-0.03,0.66l-0.78,0.68l0.27,0.63l-0.33,0.45l-0.02,1.87l-0.93,1.66l-0.06,0.57l0.4,0.7l-1.34,1.69l-1.12,0.78l-0.12,0.46l-0.97,-0.17l-0.23,1.12l0.37,0.87l-0.86,0.28l-0.46,1.0l0.74,0.91l-0.3,0.15l-0.48,-0.7l-0.53,0.08l-0.77,1.21l-1.29,0.24l-0.29,0.35l0.29,0.65l0.65,0.23l-0.87,0.91l-0.6,1.24l-0.77,0.42l0.04,0.5l0.33,0.13l-1.16,1.15l-0.16,0.83l-1.86,1.1l1.15,-3.2l0.11,-0.79l-0.33,-0.88l-0.75,-0.48l-1.06,0.03l-0.67,-0.49l-1.54,0.43l-0.11,-0.69l-1.23,-1.23l-0.9,-0.19l-0.41,-0.77l-0.65,-0.12l-2.42,-2.52l0.36,-1.53l-0.68,-1.06Z", "name": "New Jersey"}, "US-CO": {"path": "M353.06,206.03l0.18,59.35l-108.39,0.0l0.0,-79.44l108.19,0.01l0.01,20.08Z", "name": "Colorado"}, "US-MD": {"path": "M705.46,221.36l0.15,-9.28l18.93,0.0l-0.82,0.95l-0.87,-0.12l-1.58,0.41l-0.04,0.66l-0.46,0.37l0.06,0.72l-3.03,-0.19l-0.9,-0.55l0.22,-0.55l-0.49,-0.57l-0.65,-0.18l-0.82,1.52l-2.05,2.21l-1.15,-0.63l-1.08,0.35l-0.63,1.04l-1.84,1.4l-0.54,0.85l-0.89,0.23l-1.51,1.36ZM726.88,212.08l35.41,0.01l0.1,2.46l-0.51,-0.46l-0.38,0.14l-1.23,1.49l0.53,-1.57l-0.74,-0.42l-0.88,0.99l-1.02,-0.13l-0.5,0.27l-0.52,1.25l0.23,0.6l0.53,0.25l-1.68,1.3l0.21,-1.43l-0.51,-0.55l-0.74,0.51l-0.27,1.21l-0.69,-0.36l-1.19,0.31l-0.16,0.69l0.84,0.41l-0.44,0.38l-1.3,0.17l-0.49,0.54l0.76,1.32l-1.41,-0.93l-1.34,0.11l-0.01,0.71l0.71,0.27l0.87,1.35l1.19,0.83l-0.42,0.4l-1.35,0.14l-0.4,1.05l1.42,1.35l0.14,0.37l-0.83,-0.46l-0.52,0.18l0.04,0.67l0.69,0.6l-0.4,0.34l-0.01,0.76l0.62,0.57l-0.83,0.95l0.43,1.13l0.21,3.94l1.93,2.87l-0.08,0.27l-0.42,0.37l-0.31,-1.21l-2.34,-1.59l-0.53,-3.51l-0.53,-0.78l-0.44,0.58l0.16,3.7l0.39,0.97l2.19,1.58l1.02,1.54l0.8,-0.01l0.08,1.14l0.96,1.58l-0.17,0.82l-0.71,-0.69l-0.02,-1.15l-0.47,-0.55l-0.45,-0.07l-0.14,1.06l-0.65,-0.01l-0.39,-0.77l-0.96,-0.59l-1.37,-0.33l-0.92,0.17l-0.41,-0.27l-0.41,-2.12l-0.98,-0.92l-0.48,0.03l-0.11,0.47l0.61,1.93l-0.51,-0.23l-0.16,-0.51l-0.7,-0.54l-0.86,-2.61l-0.43,-0.25l-0.64,1.12l-0.14,-0.67l-0.53,-0.12l-0.46,0.31l0.12,0.74l-0.29,0.53l-0.68,0.37l-0.42,-0.32l-0.15,-1.73l0.46,-0.91l0.72,-0.19l0.29,-0.4l-0.21,-0.54l0.85,-0.28l0.54,-1.36l1.01,-0.07l0.32,-1.36l-0.14,-1.01l1.61,-1.64l-0.0,-0.56l-2.07,-2.07l-0.57,0.0l-0.86,0.88l-1.52,-0.7l-0.29,-0.85l-0.9,-0.7l-2.18,-0.46l-0.91,-1.04l0.84,-1.06l-0.16,-0.97l-1.01,-0.53l-0.67,-0.78l-2.7,-0.77l0.17,-1.14l-0.81,-0.76l0.34,-1.02l-0.43,-0.4l-0.43,0.05l-0.44,-0.85l0.33,-0.62l-0.29,-0.65l-0.61,-0.26l-1.78,0.22l-1.67,-1.54ZM762.4,214.6l1.38,22.44l0.37,0.36l0.99,0.06l7.06,0.08l-0.25,0.17l0.13,0.7l0.43,0.12l0.18,0.75l0.44,0.08l-0.75,1.46l-0.5,-0.24l-0.86,0.59l-0.78,2.27l-0.57,0.05l-0.48,0.53l-0.41,1.43l-3.49,0.36l-0.56,0.5l-2.04,-0.12l-0.54,0.33l-0.09,-0.83l0.51,-0.16l1.2,-1.42l-0.26,-0.59l-0.33,-0.02l-0.2,-0.85l-2.13,0.01l1.57,-0.83l0.01,-0.72l-1.14,-0.43l0.85,-1.84l0.08,-0.97l-0.89,-0.08l-0.82,1.35l-0.15,-0.59l-0.58,-0.22l-0.4,0.23l-0.88,1.19l0.26,0.94l-2.11,-2.53l-0.89,-0.03l-0.49,-0.93l0.4,-0.18l0.3,-1.02l0.8,-0.35l0.28,-1.2l2.17,0.79l0.83,-0.68l0.43,-1.27l-0.08,-0.47l-0.48,-0.24l-0.88,1.27l-0.77,-0.42l-0.1,-0.99l-0.43,-0.4l-0.5,0.06l-0.06,-0.61l-0.59,-0.07l1.07,-0.45l0.44,-0.9l-0.37,-0.63l-0.85,0.56l-0.03,-0.51l1.15,-0.56l-0.08,-0.69l-0.44,-0.18l-0.32,-0.78l-0.42,0.09l-0.33,-0.39l0.92,-0.71l0.04,-0.96l1.19,-1.53l0.13,-0.81l-0.45,-0.1l-0.76,0.44l-0.46,-0.27l-0.53,0.29l-0.36,0.78l-0.56,-1.2l1.47,-2.87l0.65,-0.33l0.22,-0.62l3.67,0.2l0.55,-0.25l-0.05,-0.71l-0.39,-0.16l-2.23,-0.04l1.11,-1.12l1.28,0.28l0.47,-0.39l-0.71,-0.81l0.8,-1.54ZM772.78,237.54l0.07,-0.0l-0.01,0.02l-0.06,-0.02ZM762.7,243.79l-0.1,0.12l-0.05,0.02l0.04,-0.13l0.11,-0.02ZM760.04,239.89l-0.05,0.15l-0.08,-0.09l0.13,-0.06ZM755.92,234.26l-0.13,0.08l-0.02,0.02l0.03,-0.1l0.11,0.0ZM755.69,234.56l-0.02,0.07l-0.08,0.04l0.1,-0.11ZM756.22,231.96l-0.0,0.02l-0.01,-0.01l0.02,-0.01ZM755.24,226.95l-0.26,0.35l-0.75,0.14l0.36,-0.86l0.65,0.38ZM755.81,230.74l-0.5,0.12l-0.42,-0.44l0.14,-0.43l0.67,0.26l0.11,0.5ZM751.65,225.27l0.2,0.05l0.67,0.34l-0.37,0.23l-0.5,-0.62Z", "name": "Maryland"}, "US-MA": {"path": "M802.31,149.4l30.3,0.94l1.95,-1.22l0.75,-1.26l0.98,-0.05l0.87,-0.78l1.4,-0.63l1.28,0.3l-0.72,0.83l0.86,0.59l-0.25,1.48l0.92,0.86l-0.15,0.28l0.28,0.37l1.15,0.55l-0.3,0.45l-2.65,0.97l-0.36,0.98l0.37,0.27l-1.43,0.96l-0.11,1.05l-1.21,0.59l0.13,1.47l1.16,0.82l0.3,0.72l1.43,-0.13l0.48,-0.44l1.07,0.42l0.59,0.65l0.01,0.68l1.24,1.77l-0.42,1.09l-0.67,0.34l-0.07,0.61l0.93,0.96l1.65,0.29l0.13,2.37l0.62,0.89l1.1,0.75l1.38,0.32l0.29,0.47l1.03,0.1l3.37,-1.26l1.08,-0.77l0.46,0.19l-0.04,1.78l-3.47,0.39l-1.11,0.47l-2.81,0.09l-0.93,1.34l-2.13,0.65l0.01,-2.56l0.49,-1.2l-0.42,-0.45l-0.57,0.2l-0.82,-0.36l-0.44,0.39l-0.04,0.89l-0.47,0.63l-0.38,-0.06l-0.89,0.81l-0.49,-0.35l-0.62,0.31l-0.34,1.73l-1.04,0.5l-0.36,-0.87l-0.45,-0.13l-0.48,0.42l-0.06,-2.0l-0.82,-0.62l1.11,-2.11l-0.08,-0.44l-0.85,0.14l-0.68,1.24l-0.68,-0.01l-1.1,-0.97l-0.11,-2.12l-0.67,-0.45l-0.1,-2.16l-0.39,-0.37l-6.23,0.1l-0.23,-0.22l-14.89,-0.24l-0.41,0.36l-0.34,-0.36l-0.84,-0.08l-9.48,-0.37l-0.18,-0.22l3.63,-13.57ZM842.71,151.57l-0.06,-0.04l0.09,-0.8l0.4,0.33l-0.43,0.51ZM853.25,167.68l0.01,-0.3l0.09,0.29l-0.1,0.02ZM852.76,165.76l-0.64,-0.15l-0.12,-1.16l0.34,0.5l0.42,0.8ZM849.75,163.34l-0.06,0.05l-0.03,-0.04l0.09,-0.01Z", "name": "Massachusetts"}, "US-AL": {"path": "M566.52,389.19l-1.28,-26.77l6.18,-56.04l-1.31,-1.86l39.27,0.46l6.27,38.26l0.52,2.17l0.77,1.48l0.26,1.64l1.54,2.36l0.53,1.6l-0.38,1.74l1.35,1.19l-1.94,1.66l-0.49,1.88l0.02,1.25l-0.94,1.78l-0.36,1.51l0.53,2.59l0.8,1.41l0.23,1.36l-1.04,4.73l0.13,1.75l0.97,1.16l0.66,1.74l-40.07,0.01l-0.47,0.5l-0.39,2.5l1.9,2.57l1.52,0.99l-0.58,2.15l0.56,1.73l-0.89,1.21l-1.06,0.67l-0.87,-0.73l-0.4,0.44l0.37,1.21l-2.11,0.5l-0.05,-1.01l-0.81,-0.86l0.01,-0.96l-0.49,-0.26l-0.52,0.43l-0.37,-0.36l-0.35,-1.04l0.51,-1.46l-0.57,-1.78l-1.01,-0.71l-0.17,-0.74l-0.49,-0.23l-0.44,0.56l-0.88,2.73l-0.53,4.06l-0.99,-0.8l-2.0,-0.51l-0.66,0.14Z", "name": "Alabama"}, "US-MO": {"path": "M451.72,194.17l25.16,0.52l16.16,-0.14l21.03,-0.75l0.66,1.22l2.15,1.73l0.2,0.7l1.03,0.9l-0.8,2.24l-0.13,1.92l0.42,3.42l0.77,1.39l-0.11,1.45l0.92,1.36l0.3,1.46l4.27,4.17l0.84,1.63l4.26,3.43l1.03,3.36l-0.22,0.6l0.28,1.7l0.75,1.57l0.65,0.74l0.96,0.24l0.82,-0.44l0.89,-1.18l0.53,-0.11l2.15,0.77l2.14,1.58l-1.07,1.66l0.02,2.07l-2.8,5.93l-0.08,0.94l0.47,1.8l3.87,4.05l1.71,1.12l1.31,0.22l1.37,1.31l1.65,0.89l1.15,2.01l1.75,0.92l0.09,2.65l1.26,2.72l-1.17,1.58l0.03,1.3l0.63,0.35l1.67,3.98l1.66,1.01l0.56,-0.26l0.09,-0.5l0.59,1.0l0.96,0.05l-0.07,1.57l-0.45,0.93l0.31,1.44l-1.34,3.24l-0.41,0.01l-1.1,-1.12l-0.64,0.04l-1.47,3.35l0.18,-0.8l-0.41,-1.03l-0.87,-0.27l-0.74,0.52l-0.08,0.95l0.4,0.6l0.28,1.82l-1.3,0.51l-0.21,0.39l0.65,1.26l-1.41,0.15l-0.2,0.6l1.15,1.82l-0.84,0.54l-0.76,1.77l-9.39,0.26l1.1,-1.8l0.83,-0.45l0.25,-0.75l1.34,-0.68l0.33,-0.81l0.9,-0.77l0.01,-2.04l-0.87,-0.77l-0.1,-0.67l-0.9,-1.16l-69.04,0.0l0.08,-52.02l-0.94,-0.65l-1.12,-0.09l-1.35,-0.73l-0.14,-0.86l-0.95,-1.23l-0.28,-1.45l-0.49,-0.11l-0.26,-0.53l-1.01,-0.66l-1.2,-1.73l0.7,-0.41l0.14,-1.13l1.1,-1.11l0.12,-0.7l0.92,0.19l0.57,-0.37l-0.07,-2.11l-0.91,-0.72l-0.26,-1.05l-1.11,-0.07l-1.26,0.82l-1.39,-0.86l-2.4,-2.28l-0.97,-0.31l0.2,-1.46l-1.15,-1.64l0.12,-0.95l-1.28,-0.56l-0.52,-0.81l-0.74,-0.28l-0.94,-3.86l-1.15,-0.79l-0.03,-0.45ZM552.52,264.57l-0.01,-0.02l0.01,0.0l0.0,0.02Z", "name": "Missouri"}, "US-MN": {"path": "M432.76,36.57l-0.38,-1.47l0.1,-1.26l-0.49,-0.59l-1.32,-4.1l0.1,-3.47l-0.44,-2.15l0.32,-1.21l-0.53,-2.53l0.87,-2.76l-1.98,-7.65l31.72,-0.03l0.52,-0.82l-0.02,-7.93l2.32,0.12l1.96,0.98l0.37,3.24l1.55,5.94l0.01,2.53l0.49,0.95l1.5,1.24l1.35,0.61l3.46,-0.19l0.38,0.98l0.53,0.42l5.58,0.4l0.4,0.29l0.46,1.76l0.71,0.7l4.58,-0.53l0.84,-0.63l0.12,-0.76l0.79,-0.34l1.89,-0.34l4.23,0.29l1.45,0.88l3.55,1.0l0.13,0.18l-1.25,0.63l-0.07,0.86l0.49,0.51l3.1,0.18l0.38,2.31l1.48,2.6l0.72,0.1l1.15,-0.74l0.11,-1.87l2.88,-0.27l1.33,2.47l2.04,1.03l1.61,0.34l0.53,0.69l-0.12,0.87l0.57,0.43l1.41,0.19l-0.1,0.41l0.4,0.51l1.52,-0.07l1.15,0.35l2.41,-0.69l3.17,-2.46l2.79,-1.4l1.07,2.85l0.94,0.63l2.42,-0.47l0.87,0.48l6.43,-0.74l0.57,0.26l1.21,1.91l1.23,0.77l0.63,0.06l1.78,-0.7l1.49,0.22l-1.18,1.06l-5.26,2.74l-6.94,2.3l-4.1,2.24l-2.5,2.41l-1.05,0.51l-7.72,8.48l-1.04,0.55l-1.25,1.53l-1.42,0.95l-0.79,0.93l-4.63,3.33l-1.04,1.78l-0.6,0.41l-0.23,0.99l-0.81,-0.07l-0.5,0.47l-0.02,12.69l-0.91,1.17l-1.07,-0.01l-0.6,0.79l-0.86,0.09l-0.69,0.8l-2.2,1.05l-1.1,1.83l0.01,0.73l-1.91,2.3l-0.17,2.1l0.31,0.95l2.15,0.56l1.25,2.64l-0.67,1.9l-0.82,1.21l-0.21,2.14l0.36,1.36l-0.81,1.18l0.67,3.22l-0.82,4.04l3.72,3.33l2.99,0.63l1.7,2.39l2.82,0.73l2.28,2.11l2.07,3.75l2.46,2.0l2.06,0.27l1.0,0.79l0.86,0.17l0.69,1.41l1.17,0.94l0.09,2.01l0.55,1.33l-0.05,4.73l-80.35,0.02l-0.0,-38.78l-0.66,-1.31l-0.81,-0.82l-2.58,-0.89l-0.89,-1.97l-1.42,-1.87l0.24,-0.69l2.96,-2.29l1.02,-2.04l0.53,-2.57l-0.3,-1.64l0.3,-1.9l-0.13,-1.56l-0.48,-1.08l-0.1,-2.42l-1.77,-2.75l-0.45,-1.19l-0.14,-2.25l-0.64,-1.04l0.22,-1.73l-0.31,-1.61l0.64,-2.8l-0.16,-0.53l-0.54,-0.33l-0.36,-1.11l-0.22,-8.79l-0.41,-0.84l0.2,-4.16l-1.52,-4.26l-0.54,-0.72Z", "name": "Minnesota"}, "US-CA": {"path": "M6.84,193.37l0.52,-1.19l0.95,-0.02l0.6,-2.22l0.87,-0.11l0.78,-0.99l-0.46,-0.71l-0.72,-0.15l0.75,-2.78l-0.81,-2.29l0.57,-1.0l0.54,-2.33l0.45,-3.04l-0.15,-2.0l-0.49,-0.87l-0.89,-3.57l-1.45,-0.84l0.54,-1.35l0.2,-2.79l64.73,0.0l0.14,61.4l29.2,25.98l54.39,51.9l0.2,2.35l0.76,0.7l0.41,1.43l0.83,0.44l1.02,2.04l0.06,0.79l0.72,1.08l0.05,1.24l3.1,2.21l0.73,0.93l-1.45,1.49l-2.51,1.48l-0.77,1.84l-1.32,1.17l-0.19,0.78l0.43,0.79l-0.34,0.51l0.03,0.73l0.37,1.96l-0.41,0.67l-0.23,2.12l-1.38,2.31l-1.33,0.31l-0.31,0.55l0.38,0.68l-0.31,1.21l0.6,0.87l0.14,0.98l-0.29,2.37l0.64,0.79l2.06,0.37l0.75,0.82l0.16,1.99l-0.88,0.78l-0.17,1.18l-1.95,-0.23l-1.02,0.67l-36.78,3.3l-0.07,-0.51l0.48,-0.67l-0.32,-1.17l-1.23,-1.23l-0.83,0.14l-0.41,-1.7l0.42,-1.03l-1.08,-4.2l-2.97,-4.35l-4.99,-4.31l-2.39,-1.39l-2.23,-2.06l-1.91,-0.55l-1.04,0.36l-0.14,0.74l-1.36,-0.51l0.33,-1.64l-0.84,-2.14l-1.2,-1.48l-0.73,-0.38l-1.92,-0.0l-2.14,0.54l-4.96,-1.76l-1.25,-0.9l-0.93,-2.12l-4.42,-2.77l-1.76,-0.1l-0.83,0.4l-1.11,-0.41l-1.29,0.15l-1.98,-0.91l-2.18,-0.29l-4.96,0.47l-0.66,-1.33l-1.88,-0.71l0.61,-2.39l-0.53,-1.12l0.28,-2.03l-0.78,-0.95l0.55,-2.19l-0.18,-2.11l-1.11,-0.89l-1.22,-0.0l-1.38,-0.89l-0.2,-0.56l0.96,-1.5l-0.87,-1.85l-0.41,-0.4l-1.6,-0.33l-2.44,-3.24l-1.77,-0.64l-0.79,-2.15l-1.91,-1.9l-0.74,-2.3l-1.04,-0.46l-1.65,-2.65l-2.34,-1.54l-0.97,-1.2l-0.77,-3.35l0.18,-1.36l-0.55,-0.43l0.28,-0.45l0.62,0.48l0.51,-0.21l0.59,-0.68l0.45,-1.54l0.73,-0.2l-0.04,-0.51l-0.53,-0.32l0.17,-0.8l-0.24,-0.82l-1.67,-2.74l-0.63,-0.27l-0.78,0.39l-1.83,0.05l-1.63,-1.25l-1.21,-1.67l-0.56,-0.24l-1.03,-1.27l-0.2,-0.93l0.27,-2.13l-0.81,-2.52l-1.05,-0.91l0.39,-2.59l-0.31,-2.04l1.09,-0.44l0.48,1.22l-0.47,0.4l0.51,2.41l1.76,0.65l0.93,1.08l1.02,0.41l0.57,0.8l0.89,0.17l0.69,-0.54l-0.42,-1.03l-0.72,-0.32l-0.62,-1.22l-0.31,-1.76l-0.75,-0.99l-0.39,0.01l0.35,-0.75l-1.68,-0.73l0.46,-0.7l-0.55,-1.61l-0.92,-0.14l-0.34,-0.44l0.75,-0.74l0.87,-0.22l0.69,-0.81l1.31,0.64l2.32,-0.63l4.92,0.93l0.45,-0.31l0.11,-0.9l0.56,0.98l0.74,-0.22l0.22,-0.48l1.49,1.1l0.65,-0.32l-0.06,-0.36l-2.14,-2.0l-1.6,-0.05l0.1,-0.51l-0.37,-0.47l-1.94,1.63l-0.7,-0.15l-0.63,0.31l-0.27,-0.44l-0.98,0.03l0.11,-0.62l-0.49,-0.56l-1.01,0.07l-1.32,1.73l-1.7,-0.49l-0.51,-0.68l-1.49,-0.89l-2.24,1.03l0.29,0.79l-0.36,1.2l0.58,0.53l-0.55,1.08l0.42,1.86l-2.08,-1.49l-1.1,-0.04l-1.57,-1.88l-1.51,-0.74l-0.08,-0.62l-0.6,-0.02l0.35,-1.03l1.23,1.51l0.49,0.14l0.23,-0.45l-2.41,-4.02l-0.9,-0.97l-0.52,-0.08l-0.03,-0.74l-0.99,-1.89l-3.15,-2.31l-1.57,-2.4l-4.47,-4.64l0.58,-1.81l-0.08,-0.79l-2.01,-5.84l0.12,-1.77l0.73,-2.1l-0.34,-2.8l-0.6,-1.0l-0.39,-2.16l-0.88,-0.77l-1.99,-3.0l-0.64,-0.35l-0.63,-1.57l-1.16,-0.55l-2.61,-2.48l0.18,-1.23l-0.88,-2.35l1.34,-3.63ZM46.8,244.97l-0.28,0.18l-0.12,-0.01l0.12,-0.07l0.28,-0.1ZM48.03,245.0l0.02,-0.17l0.06,0.0l-0.06,0.12l-0.03,0.05Z", "name": "California"}, "US-IA": {"path": "M438.95,133.31l82.4,-0.04l0.71,2.54l1.86,1.15l0.02,0.58l-1.04,1.66l-0.25,1.0l0.41,4.99l0.79,1.3l0.22,1.72l1.27,1.79l4.72,1.27l1.03,2.05l-0.39,0.95l0.22,0.67l3.26,2.6l0.59,2.38l3.46,2.57l0.42,1.64l-0.71,3.94l-1.76,1.7l-0.67,1.78l0.0,1.22l-1.32,1.15l-2.49,0.67l-1.5,1.2l-4.42,0.36l-0.93,0.61l-0.73,1.56l-0.38,2.39l0.28,1.05l1.78,1.55l0.27,2.5l-2.06,2.86l-0.41,2.07l-0.61,1.26l-2.83,1.04l-1.05,0.87l-0.28,0.93l0.6,0.86l0.0,1.97l-0.54,0.16l-1.18,-0.86l-0.22,-0.73l-1.38,-1.36l-0.8,-0.4l-0.21,-0.77l-0.85,-0.72l-21.24,0.77l-14.35,0.13l-26.83,-0.51l-0.16,-0.98l-1.2,-0.74l-0.28,-0.62l0.59,-1.03l0.11,-2.2l-0.25,-2.07l-0.53,-0.69l0.2,-3.44l-0.98,-0.68l0.77,-2.02l-1.22,-0.58l0.41,-2.37l-0.28,-0.4l-0.94,-0.24l0.17,-1.11l-0.67,-0.46l-0.71,0.19l-0.29,-2.66l0.56,-2.39l-1.4,-2.16l0.0,-1.82l-1.66,-1.54l-0.28,-1.68l-1.01,-0.94l0.11,-2.07l-1.0,-1.83l0.27,-1.61l-0.22,-1.06l-1.31,-0.7l-0.77,-2.11l0.06,-0.61l-1.71,-1.89l0.61,-1.44l0.54,-0.44l0.81,-2.57l0.07,-1.63l0.55,-0.64l0.25,-1.15l-0.42,-2.2l-1.28,-0.33l-0.02,-0.69l0.45,-0.53l0.06,-1.67l-0.89,-1.43l-0.01,-0.84Z", "name": "Iowa"}, "US-MI": {"path": "M591.63,169.36l2.06,-1.83l2.57,-5.33l1.79,-2.69l1.66,-4.61l0.85,-5.07l-0.13,-6.35l-1.51,-4.43l1.06,-1.12l-0.5,-0.5l-1.12,0.38l-2.83,-7.69l0.27,-1.31l1.25,-1.86l0.13,-0.95l-0.29,-3.16l-1.03,-1.79l0.04,-0.61l2.09,-2.43l1.82,-3.96l0.07,-2.67l0.47,-2.56l-0.54,-1.69l1.26,-0.98l0.81,0.1l0.63,-0.39l0.24,-3.5l1.09,0.05l0.88,-1.33l1.11,0.65l0.7,-0.23l1.15,-2.46l1.0,-1.07l0.88,-1.64l0.52,-0.05l-0.71,0.79l0.35,1.74l-0.98,1.68l0.64,0.53l-0.87,2.52l0.66,1.55l0.74,0.06l0.43,0.63l0.67,-0.14l1.23,-2.11l1.2,-3.38l0.24,-2.08l-0.23,-3.53l0.74,-0.93l2.4,-1.3l2.83,-0.11l1.08,-0.47l0.38,-0.59l-0.16,-0.58l-1.75,-0.39l-0.83,-1.02l-0.21,-2.08l2.35,-2.7l-0.0,-0.76l1.78,0.05l0.9,-0.83l3.86,2.7l0.81,0.26l2.06,-0.08l1.32,0.63l0.86,0.97l0.88,1.97l2.78,0.28l1.53,1.31l1.9,0.42l0.69,0.78l1.11,0.44l1.45,0.19l1.58,1.35l-0.2,1.11l0.8,1.49l0.6,0.31l0.21,0.97l-0.23,0.54l-0.63,-0.38l-1.03,0.4l-0.55,1.77l0.58,1.42l1.41,1.25l0.45,1.48l0.25,2.34l-0.42,1.69l-0.27,5.83l-0.88,0.5l-0.55,0.78l-0.74,-0.06l-0.92,0.66l-0.93,4.33l-1.18,0.28l-0.31,0.77l-1.89,0.1l-0.81,0.47l-1.0,2.44l0.17,0.48l-0.34,0.79l-0.13,2.21l1.13,1.5l2.68,1.29l0.9,0.08l1.26,-1.01l0.83,-1.29l0.57,0.29l0.42,-0.17l1.6,-3.3l0.77,-0.93l0.02,-0.51l1.19,-1.24l1.43,-0.14l1.16,-0.48l1.01,-0.92l0.93,-0.27l2.44,1.34l1.23,1.71l0.79,2.3l1.39,7.73l0.33,3.74l0.79,3.73l0.93,1.89l-1.03,3.66l0.17,1.18l-0.6,2.74l-0.94,1.42l-0.33,-1.23l0.17,-0.79l-0.39,-0.4l-1.4,-0.36l-1.66,1.03l-0.21,0.79l0.39,0.72l-0.87,0.39l-0.42,0.7l-0.24,2.82l-0.59,0.62l-1.71,0.6l-1.33,1.57l-1.04,3.43l-0.02,1.51l-0.46,0.81l-0.42,0.1l-0.15,0.85l-0.64,0.18l-1.12,1.36l-0.89,2.09l-0.64,0.76l-20.09,0.71l0.0,-0.87l-0.4,-0.4l-30.56,-0.03ZM610.56,103.23l0.02,-0.07l0.14,-0.11l-0.02,0.04l-0.14,0.15ZM610.96,102.36l-0.05,-0.18l0.1,-0.14l-0.05,0.32ZM535.25,64.97l5.27,-1.95l4.06,-3.36l6.11,-0.76l1.52,-0.71l2.75,-2.54l1.01,0.16l1.65,-0.57l1.31,-2.22l3.29,-2.64l0.03,1.84l1.84,0.85l-0.13,1.51l0.66,0.23l0.46,0.7l-0.57,3.26l0.34,1.05l-0.41,0.45l0.14,0.49l0.75,0.07l1.39,-2.16l1.27,-0.81l-0.59,1.18l0.52,0.52l0.94,-0.59l0.7,-1.2l1.09,-0.32l3.22,0.15l1.53,0.42l1.09,1.13l1.52,0.66l0.35,1.16l2.02,2.98l1.12,0.72l0.33,1.67l0.69,0.44l1.9,0.33l0.8,-0.31l1.09,0.09l0.62,-0.6l0.97,-0.32l0.87,1.29l1.03,0.81l1.06,-0.11l0.82,-0.75l1.76,1.36l0.7,-0.25l2.07,-2.42l3.15,-1.53l1.99,-1.44l0.92,0.26l3.53,-0.74l5.33,0.55l5.02,-2.08l2.72,0.04l-0.56,3.36l0.18,0.78l-0.55,1.07l0.69,1.07l1.29,-0.17l2.12,1.08l1.23,-0.25l1.2,-0.72l0.6,0.62l0.08,0.74l0.82,0.37l1.37,-0.58l1.07,-1.47l0.76,-0.18l1.03,0.41l1.58,-0.94l0.77,0.21l-0.65,2.02l0.55,1.51l-1.14,-0.23l-0.44,0.43l0.16,1.37l0.39,0.64l-1.06,0.91l0.04,0.47l0.71,0.94l1.45,-0.2l0.52,0.58l0.63,0.16l-0.03,1.24l0.84,1.05l1.46,0.79l-1.31,0.5l-4.99,-0.99l-0.58,0.21l-1.34,-0.4l-0.97,0.27l-0.54,-0.88l-1.64,-0.35l-0.67,0.37l-0.27,1.22l-0.62,0.68l0.06,2.14l-0.92,-0.38l-0.75,-1.08l-0.76,-0.26l-1.71,-1.99l-2.34,-0.99l-1.63,-0.21l-0.97,-0.67l-0.58,0.21l-0.66,-0.36l-0.65,0.29l-1.12,-0.11l-0.68,0.36l-1.59,2.38l-3.63,0.21l-0.69,0.7l-2.04,-0.65l-2.99,0.52l-0.81,0.74l-0.93,2.47l-2.5,1.15l0.46,-1.99l-0.4,-0.88l-0.99,-0.07l-1.22,0.96l-0.92,-0.54l-0.71,0.07l-0.42,0.35l-0.01,0.84l-1.03,1.93l-1.31,0.44l0.09,-1.42l-0.32,-1.14l0.58,-1.66l-0.12,-0.39l-0.64,-0.26l-0.53,0.51l-0.9,2.07l-0.58,2.57l-1.25,0.76l-1.69,2.88l-0.98,2.59l-3.28,5.01l-0.79,0.64l0.0,0.93l-1.24,-1.47l0.4,-1.73l0.85,-1.61l-0.31,-0.86l-0.58,-0.39l-1.47,0.68l-1.19,-0.06l0.2,-1.29l1.0,-1.35l-0.24,-1.41l0.45,-1.06l-0.46,-1.07l0.26,-0.82l-1.72,-1.81l-1.11,-0.2l-0.54,-0.52l-0.9,0.09l-0.6,-0.28l0.48,-1.35l-0.76,-1.59l-1.08,-0.66l-2.26,-0.38l-0.67,-0.45l-0.68,0.05l-1.81,-0.72l-1.65,0.41l-1.41,-0.61l-1.67,-0.03l-4.42,-2.53l-15.43,-4.3l-1.68,-3.71l-1.83,-1.19l-0.81,0.19l-0.07,-0.34ZM595.0,83.29l-0.09,0.54l-0.51,0.26l-0.9,1.3l0.01,0.6l-0.6,-0.71l1.23,-2.05l0.87,0.05ZM564.93,52.31l-0.53,-0.42l-1.21,-0.08l0.06,-1.4l3.18,-3.59l1.66,-1.02l0.65,0.09l0.62,-0.54l2.28,-0.66l3.53,0.01l0.87,0.53l0.21,0.35l-0.64,0.34l-1.35,-0.31l-2.44,0.5l-0.2,0.28l0.22,0.62l0.76,0.25l-1.39,0.9l-1.7,1.8l-0.75,0.2l-0.55,1.47l-1.37,1.27l-0.95,2.07l-0.6,-1.03l0.9,-0.92l0.39,-2.02l-0.58,-0.45l-0.33,0.2l-0.67,0.87l-0.07,0.7ZM565.02,52.45l0.13,0.0l-0.11,0.02l-0.02,-0.03ZM553.93,35.38l0.91,-0.96l-0.39,-0.41l0.67,-0.52l5.21,-2.61l2.29,-1.59l0.76,-0.1l-0.62,0.68l0.02,0.84l-0.52,0.48l-4.78,2.2l-1.01,0.93l0.21,0.42l-2.11,1.02l-0.64,-0.4Z", "name": "Michigan"}, "US-GA": {"path": "M610.2,304.99l37.84,-0.29l-2.88,2.85l-0.62,1.42l-0.08,1.1l0.6,0.8l2.32,1.22l2.01,2.1l2.82,0.59l0.42,1.49l1.04,1.59l0.49,2.26l1.99,2.33l0.57,1.63l4.65,3.57l1.53,3.02l1.82,0.85l1.86,1.79l0.03,2.0l0.9,1.07l0.43,-0.06l-0.02,0.94l0.55,0.74l0.63,0.22l0.29,1.08l3.73,2.14l0.29,0.72l-0.12,1.0l1.01,1.71l0.51,1.81l-0.0,2.36l0.47,0.64l2.15,1.24l0.58,0.77l0.5,2.27l0.54,0.59l-0.38,2.19l0.4,1.39l1.01,0.98l1.32,0.04l1.06,0.86l1.12,0.28l-0.51,0.44l-0.43,-0.35l-0.48,0.17l-0.51,0.79l0.33,0.85l-0.3,0.25l-1.06,-0.34l-0.59,-0.59l-0.65,0.27l0.03,0.64l-0.42,0.34l0.23,0.67l1.07,0.41l-0.65,0.92l-1.17,-0.02l-1.04,-0.58l-0.38,0.14l-0.12,0.73l1.09,0.69l-2.06,2.76l0.02,1.46l-0.56,0.75l0.41,1.25l-1.73,-0.51l-0.47,0.17l-0.06,0.64l0.4,0.36l2.24,0.65l0.73,0.65l-1.54,1.74l-0.12,-1.18l-0.42,-0.21l-0.59,0.2l-0.16,1.41l-0.47,0.07l-0.44,0.77l-0.02,0.46l0.89,1.11l-1.05,0.66l0.23,0.5l0.5,0.19l-0.94,1.68l0.63,1.53l-0.08,0.54l-0.64,0.14l-2.11,-0.55l-3.17,-1.42l-1.18,0.1l-0.27,0.54l-0.59,0.15l-0.49,0.98l-0.1,1.76l0.56,1.24l-0.55,3.41l-1.54,0.03l-0.28,-0.79l0.1,-1.08l-0.87,-1.73l-40.95,-2.82l-0.48,-0.51l-0.35,-2.3l-0.96,-1.74l0.19,-0.53l-0.41,-1.35l-1.26,-1.71l-0.12,-1.46l1.04,-4.88l-1.56,-5.24l0.31,-1.32l0.96,-1.85l0.43,-3.0l1.52,-0.88l0.59,-1.22l-1.48,-1.35l0.36,-1.76l-0.57,-1.68l-1.5,-2.29l-0.51,-2.48l-0.54,-0.65l-0.47,-2.04l-6.25,-38.08Z", "name": "Georgia"}, "US-AZ": {"path": "M155.07,350.96l0.12,-1.51l0.9,-1.21l0.3,-0.99l0.33,-0.24l1.46,0.3l0.83,-0.15l0.41,-0.48l0.09,-1.02l0.98,-1.02l-0.15,-2.33l-0.55,-0.99l-0.84,-0.47l-1.8,-0.28l-0.31,-0.44l0.36,-2.1l-0.19,-1.17l-0.59,-0.9l0.36,-0.77l-0.22,-0.67l1.22,-0.43l1.6,-2.68l0.23,-2.12l0.45,-0.76l-0.39,-2.67l0.38,-0.63l-0.44,-1.13l1.31,-1.17l0.63,-1.68l2.56,-1.51l1.55,-1.6l0.16,-0.53l-0.26,-0.9l-3.71,-2.66l0.02,-1.08l-0.75,-1.13l-0.06,-0.79l-1.12,-2.23l-0.81,-0.38l-0.38,-1.37l-0.69,-0.57l-0.3,-3.01l0.38,-0.84l-0.32,-0.63l0.78,-0.51l0.16,-1.28l-0.31,-2.77l-1.15,-3.01l0.31,-2.3l-0.75,-2.51l0.39,-2.32l-1.11,-2.26l0.41,-1.71l2.12,-0.87l1.67,0.63l1.22,-0.36l1.13,1.79l0.8,0.53l1.39,-0.07l0.86,-0.59l0.6,-2.09l0.68,-1.17l0.04,-15.02l77.01,0.06l-0.01,106.11l-30.97,-0.11l-58.0,-21.23Z", "name": "Arizona"}, "US-MT": {"path": "M140.82,42.58l0.72,-1.15l-0.63,-1.3l-0.07,-1.02l-1.62,-1.81l-0.51,-1.53l-1.3,-1.22l-1.67,-2.38l0.01,-22.78l186.2,-0.0l0.14,90.48l-108.87,0.0l-0.4,0.4l-0.01,10.49l-1.74,-1.82l-0.14,-0.9l-1.46,-2.19l-1.33,-0.59l-1.69,1.13l0.15,1.04l-0.67,0.51l-0.15,1.59l-2.46,-0.11l-1.83,0.8l-1.02,-0.73l-3.32,0.51l-2.49,-0.65l-1.59,0.79l-0.64,1.58l-4.84,-0.97l-1.24,0.54l-0.99,1.04l-0.21,0.7l-1.83,-1.16l0.02,-1.44l-1.13,-1.57l0.34,-0.41l-0.02,-0.62l-1.59,-2.89l-1.62,-1.04l-1.39,0.55l-0.3,-0.61l-1.2,-0.74l-0.6,-1.3l0.59,-0.7l0.0,-1.43l-1.11,-2.26l-0.82,-0.24l-0.53,-1.54l-1.88,-2.33l0.01,-1.55l-0.75,-1.19l0.14,-1.46l-0.86,-0.76l0.34,-1.06l-0.32,-0.71l-1.26,-0.59l-0.22,-0.57l-0.99,-0.79l-0.86,-0.28l-0.45,0.44l0.04,0.77l-0.67,0.37l-0.95,1.4l-1.71,0.63l-1.06,1.26l-1.22,-0.69l-0.8,-0.91l-1.14,-0.28l-0.11,-0.88l0.65,-0.75l0.08,-1.1l-0.86,-1.52l0.75,-1.25l1.07,-0.25l0.71,-0.93l-0.44,-1.11l0.22,-1.14l-1.09,-0.67l-0.17,-0.82l0.47,-1.4l-0.78,-1.01l0.75,-0.18l0.32,-0.48l-0.32,-1.8l0.74,-1.69l0.54,-2.41l-0.32,-1.06l0.82,-0.78l0.19,-3.19l-0.81,-0.55l-1.91,0.67l-1.39,0.1l-0.75,-0.47l0.24,-0.92l-0.78,-0.89l-0.7,-0.12l-0.72,0.52l-0.2,-1.02l-2.05,-1.4l-0.25,-1.91l-1.33,-1.32l-0.7,-0.3l-0.2,-0.69l-2.06,-2.73l-1.32,-1.17l-0.86,-1.6l-2.64,-1.0l-1.32,-1.88l-1.8,-1.03l0.81,-0.23l0.25,-0.7l-1.28,-1.66Z", "name": "Montana"}, "US-MS": {"path": "M515.97,373.97l1.36,-0.07l0.48,-0.45l0.54,-2.26l-0.51,-1.55l1.44,-1.38l0.47,-2.94l0.79,-1.81l1.66,-0.87l1.12,-1.55l1.27,-0.77l0.4,-1.49l-0.47,-0.78l0.99,-0.18l1.02,-2.07l0.88,-1.04l-0.07,-0.77l-1.26,-0.51l-0.23,-0.83l-1.44,-1.0l0.11,-1.78l-1.04,-1.43l-0.01,-0.25l0.97,-0.15l0.48,-0.56l-0.16,-0.85l-1.13,-0.47l0.33,-1.44l0.96,-1.22l-0.58,-1.03l-0.87,-0.32l0.1,-2.35l0.78,-0.35l0.29,-0.72l-0.33,-2.19l-1.01,-0.64l0.69,-1.04l0.12,-1.89l-1.55,-1.38l1.07,-0.51l0.09,-1.04l-1.05,-0.84l1.46,-1.56l0.81,-0.18l0.39,-0.58l-0.31,-1.38l0.46,-1.16l-0.57,-0.77l2.39,-0.67l0.59,-0.62l0.02,-0.95l-1.14,-0.9l1.27,-0.78l0.68,-1.43l0.84,-0.09l0.39,-0.82l-0.07,-0.63l1.25,-0.26l1.27,-1.12l0.29,-2.85l-0.27,-1.35l0.43,-1.41l1.27,-0.12l0.45,-0.76l-0.28,-0.88l2.53,-1.24l0.61,-0.89l-0.08,-1.07l32.01,0.04l0.6,1.14l0.67,0.48l-6.18,55.99l1.23,27.63l-0.6,0.47l-1.17,-0.38l-0.7,-0.87l-1.2,0.74l-0.99,0.02l-1.67,-1.24l-1.55,-0.33l-0.69,0.21l-0.39,0.4l0.19,0.33l-0.42,0.21l-3.36,0.97l0.01,-0.39l-0.73,-0.51l-0.89,-0.06l-0.61,0.82l0.57,0.54l-1.39,0.81l-0.41,1.04l-1.6,-0.03l-0.74,-1.56l-0.7,-2.88l-1.03,-1.49l-0.89,-0.53l-0.17,-1.17l-0.48,-0.81l1.66,-4.7l0.06,-1.04l-0.39,-0.33l-28.85,-0.0l0.51,-0.7l-0.74,-1.53l0.25,-1.37l-0.58,-0.68Z", "name": "Mississippi"}, "US-SC": {"path": "M648.9,304.68l4.59,-1.53l0.9,0.11l1.19,-0.99l3.68,-1.0l0.51,-0.66l0.52,0.27l20.14,0.9l-0.19,1.0l0.28,0.59l0.65,0.14l1.25,-0.87l1.95,2.59l-0.05,2.14l0.42,0.58l17.51,0.57l16.4,16.79l-0.12,0.41l-2.45,1.34l-2.75,2.59l-3.11,4.31l-0.56,2.12l-0.75,-0.29l1.2,-2.04l-0.57,-0.36l-0.82,0.6l-0.73,1.05l-0.38,1.28l0.24,0.69l1.12,0.69l0.18,0.77l-1.74,0.14l-0.38,0.62l0.68,0.49l-1.1,0.7l-0.26,0.82l-1.17,0.25l-0.74,-0.73l-1.05,0.52l-0.79,1.28l0.14,0.91l-1.18,0.78l-0.76,1.07l-1.16,0.61l-0.56,-0.46l0.28,-0.37l-0.32,-0.79l-1.27,0.0l-0.07,1.0l-0.38,-0.03l-0.12,0.7l1.49,1.2l-0.96,0.8l-1.12,0.01l-0.32,0.43l0.14,0.38l-2.03,0.66l-1.0,-0.91l-0.53,-0.02l-0.24,0.64l0.8,0.79l-1.41,0.94l-0.49,-0.7l-0.59,0.41l-0.04,0.54l-1.23,-0.57l-1.0,-0.93l-0.52,0.4l0.03,0.39l-1.58,-0.08l-0.48,0.63l0.37,0.46l-0.44,0.51l0.13,2.09l-0.58,-0.52l-0.35,-0.91l-0.03,-1.52l-0.84,-0.9l-0.62,-0.14l-0.38,0.51l1.03,3.23l-0.16,0.7l0.73,1.04l-0.48,0.27l-0.16,0.83l-1.59,2.63l-1.04,-0.84l-1.3,-0.05l-0.64,-0.68l-0.28,-0.91l0.37,-2.34l-0.63,-0.9l-0.46,-2.17l-0.81,-1.06l-2.36,-1.52l0.03,-2.27l-0.58,-1.99l-0.93,-1.54l0.12,-0.88l-0.45,-1.15l-3.77,-2.19l-0.29,-1.15l-0.93,-0.46l0.12,-0.61l-0.33,-0.84l-0.74,-0.15l-0.49,-0.58l0.22,-1.01l-0.35,-1.17l-2.0,-1.93l-1.74,-0.78l-1.49,-2.98l-3.04,-2.24l-0.87,-1.05l-0.67,-0.22l-0.61,-1.69l-1.88,-2.18l-0.46,-2.17l-1.06,-1.64l-0.6,-1.75l-0.87,-0.49l-2.05,-0.17l-2.04,-2.28l-0.9,-0.14l-1.69,-1.37l0.64,-1.78l2.76,-2.43l0.29,-0.86ZM685.32,355.87l0.77,0.42l-1.12,1.2l0.35,-0.76l-0.0,-0.86ZM686.89,351.48l0.84,0.16l-0.21,0.38l0.36,0.33l1.58,0.19l-1.32,1.27l0.45,0.56l0.83,-0.22l-1.95,0.86l0.19,-1.61l-0.52,-0.4l0.16,-0.96l-0.42,-0.58Z", "name": "South Carolina"}, "US-RI": {"path": "M824.65,178.5l0.53,-1.55l0.14,-2.15l-0.07,-9.91l5.67,-0.1l0.11,2.07l0.67,0.47l-0.04,0.7l-0.04,0.36l-0.78,0.05l-0.06,0.27l0.05,1.47l0.39,0.63l-0.57,-0.06l-0.64,0.54l0.52,1.13l-0.48,1.06l0.27,1.97l-0.45,1.5l-0.44,0.55l-0.86,-0.1l-3.92,1.12ZM832.08,169.74l0.15,0.12l-0.01,0.04l-0.11,-0.1l-0.03,-0.06ZM833.11,170.72l0.06,0.51l-0.13,0.26l-0.12,-0.03l0.19,-0.74Z", "name": "Rhode Island"}, "US-AR": {"path": "M471.78,329.54l0.7,-32.59l-2.74,-21.04l68.74,0.0l0.55,1.44l0.83,0.7l-0.07,1.51l-0.73,0.41l-0.27,0.78l-1.35,0.69l-0.35,0.88l-0.79,0.4l-1.3,2.15l-0.05,0.66l0.49,0.3l9.77,-0.27l0.65,0.86l-1.05,0.14l-0.57,0.81l0.19,0.52l0.65,0.38l-3.4,1.98l-0.07,0.79l0.61,0.94l-0.61,0.95l0.43,0.84l-1.28,0.5l-0.24,1.25l-1.47,1.68l-0.05,1.44l0.51,2.72l-1.4,0.3l-0.58,1.42l-1.41,0.68l-0.1,0.5l0.6,0.84l-0.01,0.52l-1.04,0.91l-1.88,0.81l-0.25,0.56l0.12,1.04l-1.06,-0.08l-0.45,0.56l-0.45,1.6l0.27,1.39l-0.24,2.59l-1.16,0.8l-1.38,0.0l-0.14,1.64l-0.84,0.18l-0.66,1.45l-1.37,0.89l-0.11,0.84l1.14,0.8l-0.07,0.51l-3.11,1.02l-0.04,0.63l0.78,0.76l-0.47,0.94l0.34,1.19l-0.96,0.4l-1.85,2.05l0.4,0.69l0.81,0.48l-0.03,0.42l-1.09,0.29l-0.19,0.44l0.38,0.77l1.31,0.97l-0.08,1.44l-0.72,1.55l1.08,0.78l0.24,1.82l-1.0,0.74l-0.12,1.75l-44.02,0.05l-0.09,-9.73l-1.0,-0.84l-0.81,0.08l-0.67,-0.33l-0.85,0.26l-1.03,-0.34l-0.87,0.55l-0.97,-0.44l-0.62,-0.99Z", "name": "Arkansas"}}, "height": 520.4541753374158, "projection": {"type": "merc", "centralMeridian": -10.0}, "width": 900.0});
$(function(){
  var chropolethDataLibrary = {};

  var colorScales = {
    'Percent Part-Time': ['#FFB581', '#FF8747', '#C06000'],
    'Percent Non-Traditional Age (25 and Older)': ['#FF8181', '#FF4747', '#C01D00'],
    'Percent Minority': ['#98FF81', '#4DFF47', '#10C000'],
    'First-Year Retention Rate': ['#81D6FF', '#4766FF', '#000DC0 '],
    'Three-Year Graduation Rate': ['#D881FF', '#B347FF', '#8400C0'],
    'Percent of Undergrads Receiving Pell, 2011-12': ['#FFE781', '#FFF747', '#BEC000']
  };

  function parseLatLon (input) {
    var parts = input.split(/,/);
    var lat = parseFloat(parts[0]);
    var lng = parseFloat(parts[1]);
    return [lat,lng];
  }

  function slugify (string) {
    return string.toLowerCase().replace(/\s/g, '-');
  }

  function scrollTo ($destinationSelector) {
    $('html, body').animate({
      scrollTop: $destinationSelector.offset().top
    }, 1000);
  }

  function scrollToNextSection (e) {
    var $parent = $(e.target).closest('section, header');
    scrollTo($parent.next());
  }

  function addButtonListeners ($container) {
    $('#close').click(function (event) {
      $(this).off();
      $container.html('');
    });
  }

  function trimFloat (number) {
    return Math.floor(number * 100) / 100;
  }

  function createChoroplethData (dataArr, field) {
    if (!chropolethDataLibrary.hasOwnProperty(field)) {
      var arrData = [];
      dataArr.map(function (item, index) {
        return  { state: item.State, data: item[field], headcount: item['Size: Annual Unduplicated Headcount'] };
      }).reduce(function (prev, curr, index, array) {
         if (curr.state  === prev.state) {
            // if  it's the last item in the array
            if (index === array.length - 1) {
              prev.data = (curr.data/100 * parseInt(curr.headcount.replace(',', '')) + prev.data) / (prev.totalheadcount + parseInt(curr.headcount.replace(',', ''))) * 100; arrData.push(prev);
            }
            return { data: parseFloat(prev.data)  + (parseInt(curr.headcount.replace(',', '')) * parseFloat(curr.data)/100.0), state: curr.state, totalheadcount: prev.totalheadcount + parseInt(curr['headcount'].replace(',', ''))  };
          } else {
            prev.data = prev.data / prev.totalheadcount * 100;
            arrData.push(prev);
            curr.totalheadcount = parseInt(curr.headcount.replace(',', ''));
            curr.data = parseFloat(curr.data)/100 * curr.totalheadcount;
            return curr;
          }
      }, {data:0, state: 'AK', totalheadcount: 0});
      var statesObj = {};

      arrData.forEach(function (item, index) {
        statesObj['US-'+item.state] = parseFloat(item.data);
      });

      chropolethDataLibrary[field] = statesObj;
    }

    return chropolethDataLibrary[field];
  }
  // event listeners
  $('.icon-angle-double-down').click(scrollToNextSection);

  // ajax call to get our big chunk of json data
  $.ajax( {
    url: "/data.json",
    dataType: 'json'
  }).done(function (data) {
    var dataArr = data;

    $('.map h3').text('Percent Part-Time');

    var statesValues = createChoroplethData(dataArr, 'Percent Part-Time');

    window.starred = dataArr.filter(function (item, index) {
      item.origIndex = index;
      return item.starred;
    }).map(function (item,index) {
      var latLng =  parseLatLon(item['latitude,longitude']);
      var obj = {
        latLng: latLng,
        name: item['Institution Name'],
        'Percent Non-Traditional Age (25 and Older)': item['Percent Non-Traditional Age (25 and Older)'],
        'First-Year Retention Rate': item['First-Year Retention Rate'],
        'Size: Annual Unduplicated Headcount': item['Size: Annual Unduplicated Headcount'],
        'Percent Minority': item['Percent Minority'],
        'Percent of Undergrads Receiving Pell, 2011-12': item['Percent of Undergrads Receiving Pell, 2011-12'],
        'Percent Part-Time': item['Percent Part-Time'],
        'Three-Year Graduation Rate': item['Three-Year Graduation Rate'],
        starred: item.starred,
        link: slugify(item['Institution Name']),
        style: {
          fill: 'yellow'
        }
      };
      return obj;
    });

    var theMap = new jvm.Map({
      container: $('#world-map-gdp'),
      map: 'us_merc',
      markers: window.starred,
      zoomOnScroll: false,
      backgroundColor: '#FFFFFF',
      series: {
        regions: [{
          attribute: 'fill',
          scale: colorScales['Percent Part-Time'],
          values: statesValues,
          // min: jvm.min(statesValues),
          // max: jvm.max(statesValues)
        }],
      },

      onRegionTipShow: function (event, label, code){
        label.html(
          '<b>'+label.html()+'</b></br>'+
          '<b>'+ $('.map h3').text() + ':</b> ' + trimFloat(statesValues[code])
        );
      },

      onRegionClick: function (e, code) {
        theMap.setFocus({ region: code, animate: true });
        theMap.params.placeCollegesOnStateMap(code);
      },

      onMarkerClick: function (e, code) {
        var templateMarkup = $('template[name="coleman"]').html();
        var $timelineContainer = $('section.timeline');
        $timelineContainer.html('<h2>Timeline</h2> <h3>'+ window.starred[code]['name']+'</h3>');

        $timelineContainer.append(templateMarkup);
        addButtonListeners($timelineContainer);
        setTimeout(function () {
          scrollTo($timelineContainer);
        },1500);
      },

      onMarkerTipShow: function (event, label, index) {
        var sourceArr;
        var name;

        // index is a 0 - 4 for the starred colleges, and otherwise the name of the college
        if (/\d+/.test(index)) {
          sourceArr  = window.starred;
          name = sourceArr[index]['name'];
          var found = sourceArr.find(function (item) {
            // console.log(item.name, name);
            return item.name === name;
          });
        } else {
          sourceArr = window.currentStateData;
          name = index;
          var found = sourceArr.find(function (item) {
            return item.name === name;
          });
        }

        label.html('<b>'+ name +'</b><br/><b> Percent Non-Traditional Age (25 and Older):'+ found['Percent Non-Traditional Age (25 and Older)']+'</b><br/><b> First-Year Retention Rate:'+ found['First-Year Retention Rate']+'</b><br/><b>Size: Annual Unduplicated Headcount: '+ found['Size: Annual Unduplicated Headcount']+'</b><br/><b> Percent Minority: ' + found['Percent Minority'] + '</b><br/> <b> Percent of Undergrads Receiving Pell, 2011-12: ' + found['Percent of Undergrads Receiving Pell, 2011-12'] + '</b><br/><b> Percent Part-Time: ' +  found['Percent Part-Time'] + '</b><br/><b> Three-Year Graduation Rate: ' + found['Three-Year Graduation Rate'] + '</b>');
      },

      placeCollegesOnStateMap: function (code) {
        code = code.replace('US-', '');
        var locationData = dataArr.filter(function(item){
          // !item.starred -- don't cover up the starred item with a regular dot
          return item.State === code && !item.starred;
        }).map(function (item,index) {
          var latLng =  parseLatLon(item['latitude,longitude']);
          return { latLng: latLng, name: item['Institution Name'],  'Percent Non-Traditional Age (25 and Older)': item['Percent Non-Traditional Age (25 and Older)'], 'First-Year Retention Rate': item['First-Year Retention Rate'], 'Size: Annual Unduplicated Headcount': item['Size: Annual Unduplicated Headcount'], 'Percent Minority': item['Percent Minority'], 'Percent of Undergrads Receiving Pell, 2011-12': item['Percent of Undergrads Receiving Pell, 2011-12'],'Percent Part-Time': item['Percent Part-Time'], 'Three-Year Graduation Rate': item['Three-Year Graduation Rate'] };
        });

        if (theMap.markers) {
          var markersToRemove = [];
          for (var markerName in theMap.markers) {
            if (!/\d/.test(markerName)) {
              markersToRemove.push(markerName);
            }
          }
          theMap.removeMarkers(markersToRemove);
        }

        window.currentStateData = locationData;

        window.currentStateData.forEach(function (item) {
          theMap.addMarker(item.name, item);
        });
      }
    });


    $('#slider form').click(function(e) {

      if (e.target && e.target.value) {
        statesValues = createChoroplethData(dataArr, e.target.value);
        // commented out code here appears to not be doing anything, but just in case
        // theMap.series.regions[0].clear();
        // can't tell if this is actually changing the min and max values, but it was what was suggested in https://github.com/bjornd/jvectormap/issues/221
        // theMap.params.min = jvm.min(statesValues);
        // theMap.params.max = jvm.max(statesValues);

        theMap.series.regions[0].setValues(statesValues);

        theMap.series.regions[0].setScale(colorScales[e.target.value]);

        // again, not sure if this is doing anything, but just ot be safe
        // theMap.series.regions[0].scale.maxValue = jvm.max(statesValues);
        // theMap.series.regions[0].scale.clearMaxValue = jvm.max(statesValues);
        // theMap.series.regions[0].scale.minValue = jvm.min(statesValues);
        // theMap.series.regions[0].scale.clearMinValue = jvm.min(statesValues);

        $('.map h3').text(e.target.value);
      }
    });
  }).fail(function (error) {
    console.error("error: ", error);
  });
});

