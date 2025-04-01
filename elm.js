(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2($elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = $elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = $elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}



// SEND REQUEST

var _Http_toTask = F3(function(router, toTask, request)
{
	return _Scheduler_binding(function(callback)
	{
		function done(response) {
			callback(toTask(request.expect.a(response)));
		}

		var xhr = new XMLHttpRequest();
		xhr.addEventListener('error', function() { done($elm$http$Http$NetworkError_); });
		xhr.addEventListener('timeout', function() { done($elm$http$Http$Timeout_); });
		xhr.addEventListener('load', function() { done(_Http_toResponse(request.expect.b, xhr)); });
		$elm$core$Maybe$isJust(request.tracker) && _Http_track(router, xhr, request.tracker.a);

		try {
			xhr.open(request.method, request.url, true);
		} catch (e) {
			return done($elm$http$Http$BadUrl_(request.url));
		}

		_Http_configureRequest(xhr, request);

		request.body.a && xhr.setRequestHeader('Content-Type', request.body.a);
		xhr.send(request.body.b);

		return function() { xhr.c = true; xhr.abort(); };
	});
});


// CONFIGURE

function _Http_configureRequest(xhr, request)
{
	for (var headers = request.headers; headers.b; headers = headers.b) // WHILE_CONS
	{
		xhr.setRequestHeader(headers.a.a, headers.a.b);
	}
	xhr.timeout = request.timeout.a || 0;
	xhr.responseType = request.expect.d;
	xhr.withCredentials = request.allowCookiesFromOtherDomains;
}


// RESPONSES

function _Http_toResponse(toBody, xhr)
{
	return A2(
		200 <= xhr.status && xhr.status < 300 ? $elm$http$Http$GoodStatus_ : $elm$http$Http$BadStatus_,
		_Http_toMetadata(xhr),
		toBody(xhr.response)
	);
}


// METADATA

function _Http_toMetadata(xhr)
{
	return {
		url: xhr.responseURL,
		statusCode: xhr.status,
		statusText: xhr.statusText,
		headers: _Http_parseHeaders(xhr.getAllResponseHeaders())
	};
}


// HEADERS

function _Http_parseHeaders(rawHeaders)
{
	if (!rawHeaders)
	{
		return $elm$core$Dict$empty;
	}

	var headers = $elm$core$Dict$empty;
	var headerPairs = rawHeaders.split('\r\n');
	for (var i = headerPairs.length; i--; )
	{
		var headerPair = headerPairs[i];
		var index = headerPair.indexOf(': ');
		if (index > 0)
		{
			var key = headerPair.substring(0, index);
			var value = headerPair.substring(index + 2);

			headers = A3($elm$core$Dict$update, key, function(oldValue) {
				return $elm$core$Maybe$Just($elm$core$Maybe$isJust(oldValue)
					? value + ', ' + oldValue.a
					: value
				);
			}, headers);
		}
	}
	return headers;
}


// EXPECT

var _Http_expect = F3(function(type, toBody, toValue)
{
	return {
		$: 0,
		d: type,
		b: toBody,
		a: toValue
	};
});

var _Http_mapExpect = F2(function(func, expect)
{
	return {
		$: 0,
		d: expect.d,
		b: expect.b,
		a: function(x) { return func(expect.a(x)); }
	};
});

function _Http_toDataView(arrayBuffer)
{
	return new DataView(arrayBuffer);
}


// BODY and PARTS

var _Http_emptyBody = { $: 0 };
var _Http_pair = F2(function(a, b) { return { $: 0, a: a, b: b }; });

function _Http_toFormData(parts)
{
	for (var formData = new FormData(); parts.b; parts = parts.b) // WHILE_CONS
	{
		var part = parts.a;
		formData.append(part.a, part.b);
	}
	return formData;
}

var _Http_bytesToBlob = F2(function(mime, bytes)
{
	return new Blob([bytes], { type: mime });
});


// PROGRESS

function _Http_track(router, xhr, tracker)
{
	// TODO check out lengthComputable on loadstart event

	xhr.upload.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Sending({
			sent: event.loaded,
			size: event.total
		}))));
	});
	xhr.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Receiving({
			received: event.loaded,
			size: event.lengthComputable ? $elm$core$Maybe$Just(event.total) : $elm$core$Maybe$Nothing
		}))));
	});
}

// CREATE

var _Regex_never = /.^/;

var _Regex_fromStringWith = F2(function(options, string)
{
	var flags = 'g';
	if (options.multiline) { flags += 'm'; }
	if (options.caseInsensitive) { flags += 'i'; }

	try
	{
		return $elm$core$Maybe$Just(new RegExp(string, flags));
	}
	catch(error)
	{
		return $elm$core$Maybe$Nothing;
	}
});


// USE

var _Regex_contains = F2(function(re, string)
{
	return string.match(re) !== null;
});


var _Regex_findAtMost = F3(function(n, re, str)
{
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex == re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		out.push(A4($elm$regex$Regex$Match, result[0], result.index, number, _List_fromArray(subs)));
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _List_fromArray(out);
});


var _Regex_replaceAtMost = F4(function(n, re, replacer, string)
{
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		return replacer(A4($elm$regex$Regex$Match, match, arguments[arguments.length - 2], count, _List_fromArray(submatches)));
	}
	return string.replace(re, jsReplacer);
});

var _Regex_splitAtMost = F3(function(n, re, str)
{
	var string = str;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		var result = re.exec(string);
		if (!result) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _List_fromArray(out);
});

var _Regex_infinity = Infinity;


function _Url_percentEncode(string)
{
	return encodeURIComponent(string);
}

function _Url_percentDecode(string)
{
	try
	{
		return $elm$core$Maybe$Just(decodeURIComponent(string));
	}
	catch (e)
	{
		return $elm$core$Maybe$Nothing;
	}
}var $author$project$Main$LinkClicked = function (a) {
	return {$: 'LinkClicked', a: a};
};
var $author$project$Main$UrlChanged = function (a) {
	return {$: 'UrlChanged', a: a};
};
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$List$cons = _List_cons;
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$application = _Browser_application;
var $author$project$Main$English = {$: 'English'};
var $author$project$Main$Home = {$: 'Home'};
var $author$project$Main$NewTime = function (a) {
	return {$: 'NewTime', a: a};
};
var $author$project$Main$NewZone = function (a) {
	return {$: 'NewZone', a: a};
};
var $author$project$Main$Productions = {$: 'Productions'};
var $author$project$Main$ProductionsMsg = function (a) {
	return {$: 'ProductionsMsg', a: a};
};
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$time$Time$Name = function (a) {
	return {$: 'Name', a: a};
};
var $elm$time$Time$Offset = function (a) {
	return {$: 'Offset', a: a};
};
var $elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 'Zone', a: a, b: b};
	});
var $elm$time$Time$customZone = $elm$time$Time$Zone;
var $elm$time$Time$here = _Time_here(_Utils_Tuple0);
var $author$project$Animations$View$English = {$: 'English'};
var $author$project$Animations$View$Episodes = {$: 'Episodes'};
var $author$project$Animations$View$NewTime = function (a) {
	return {$: 'NewTime', a: a};
};
var $author$project$Animations$View$NewZone = function (a) {
	return {$: 'NewZone', a: a};
};
var $author$project$Animations$Helpers$Carousel$init = function (items) {
	return {currentIndex: 0, items: items};
};
var $author$project$Signup$init = {email: '', isLoading: false, message: ''};
var $elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var $elm$time$Time$millisToPosix = $elm$time$Time$Posix;
var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
var $elm$html$Html$span = _VirtualDom_node('span');
var $author$project$Animations$DaisyAndSheep$DASEpisodes$episodes = _List_fromArray(
	[
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '/printables/daisyandsheep/Liturgical Kiss Answer Key.pdf', answerThumbnailLink: '/assets/images/daisyandsheep/liturgicalkissworksheetanswers.png', pdfLink: '/printables/daisyandsheep/Liturgical Kiss.pdf', thumbnailLink: '/assets/images/daisyandsheep/liturgicalkissworksheet.png'},
		isDisabled: false,
		link: '/animations/daisyandsheep?e=liturgicalkiss',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: '/assets/images/AnimationImageLinks/LiturgicalKiss.png',
		title: 'Liturgical Kiss',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/i6zBgnZQq9U', spanish: 'https://www.youtube.com/embed/vgUZq1hhmXM', urdu: ''},
		videoTitles: {asl: '', english: 'Liturgical Kiss | Daisy and Sheep', spanish: 'Beso Litúrgico | Daisy and Sheep', urdu: ''}
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '/printables/daisyandsheep/Astronomy Program Answer Key.pdf', answerThumbnailLink: '/assets/images/daisyandsheep/astronomyprogramworksheetanswers.png', pdfLink: '/printables/daisyandsheep/Astronomy Program.pdf', thumbnailLink: '/assets/images/daisyandsheep/astronomyprogramworksheet.png'},
		isDisabled: false,
		link: '/animations/daisyandsheep?e=astronomyprogram',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: '/assets/images/AnimationImageLinks/AstronomyProgram.png',
		title: 'Astronomy Program',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/QIcgtKMKe40', spanish: 'https://www.youtube.com/embed/nP5e0y7DNNI', urdu: ''},
		videoTitles: {asl: '', english: 'Astronomy Program | Daisy and Sheep', spanish: 'La Specola Vaticana | Daisy and Sheep', urdu: ''}
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '/printables/daisyandsheep/Penitential Act Answer Key.pdf', answerThumbnailLink: '/assets/images/daisyandsheep/penitentialactanswers.png', pdfLink: '/printables/daisyandsheep/Penitential Act.pdf', thumbnailLink: '/assets/images/daisyandsheep/penitentialact.png'},
		isDisabled: false,
		link: '/animations/daisyandsheep?e=penitentialact',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: '/assets/images/AnimationImageLinks/PenitentialAct.png',
		title: 'Penitential Act',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/ay8Kzqeyrrc', spanish: 'https://www.youtube.com/embed/cfZsgMZjCAw', urdu: ''},
		videoTitles: {asl: '', english: 'Penitential Act | Daisy and Sheep', spanish: 'Penitential Act | Daisy and Sheep', urdu: ''}
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '', answerThumbnailLink: '', pdfLink: '/printables/daisyandsheep/Guardian Angel.pdf', thumbnailLink: '/assets/images/daisyandsheep/guardianangel.png'},
		isDisabled: false,
		link: '/animations/daisyandsheep?e=guardianangel',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: '/assets/images/AnimationImageLinks/GuardianAngel.png',
		title: 'Guardian Angel',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/C-FmlvV9JWI', spanish: 'https://www.youtube.com/embed/HhoLRdTxTYc', urdu: ''},
		videoTitles: {asl: '', english: 'Guardian Angel | Daisy and Sheep', spanish: 'Ángel de la Guarda | Daisy and Sheep', urdu: ''}
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '', answerThumbnailLink: '', pdfLink: '/printables/daisyandsheep/Gospel As Living Word.pdf', thumbnailLink: '/assets/images/daisyandsheep/gospelaslivingword.png'},
		isDisabled: false,
		link: '/animations/daisyandsheep?e=gospelaslivingword',
		releaseDate: $elm$time$Time$millisToPosix(1728136800000),
		thumbnail: '/assets/images/AnimationImageLinks/GospelAsLivingWord.png',
		title: 'Gospel as Living Word',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/G-Yz76BrIvo', spanish: 'https://www.youtube.com/embed/nEv2wpyFpwk', urdu: ''},
		videoTitles: {asl: '', english: 'Gospel As Living Word | Daisy and Sheep', spanish: 'Gospel As Living Word | Daisy and Sheep', urdu: ''}
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '/printables/daisyandsheep/Mary Apparitions Answers.pdf', answerThumbnailLink: '/assets/images/daisyandsheep/maryapparitionsanswers.png', pdfLink: '/printables/daisyandsheep/Mary Apparitions.pdf', thumbnailLink: '/assets/images/daisyandsheep/maryapparitions.png'},
		isDisabled: false,
		link: '/animations/daisyandsheep?e=thevirginmary,mother',
		releaseDate: $elm$time$Time$millisToPosix(1728136800000),
		thumbnail: '/assets/images/AnimationImageLinks/MaryApparitions.png',
		title: 'The Virgin Mary, Mother',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/w_v9goHWsNs', spanish: 'https://www.youtube.com/embed/LLDGWewq1lM', urdu: ''},
		videoTitles: {asl: '', english: 'Mary, my mother | Daisy and Sheep', spanish: 'Mary, my mother | Daisy and Sheep', urdu: ''}
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '', answerThumbnailLink: '', pdfLink: '/printables/daisyandsheep/Prayer of the Faithful.pdf', thumbnailLink: '/assets/images/daisyandsheep/prayerofthefaithful.png'},
		isDisabled: false,
		link: '/animations/daisyandsheep?e=prayerofthefaithful',
		releaseDate: $elm$time$Time$millisToPosix(1728741600000),
		thumbnail: '/assets/images/AnimationImageLinks/PrayerOfTheFaithful.png',
		title: 'Prayer of the Faithful',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/Khn3A6UFCXg', spanish: 'https://www.youtube.com/embed/vURcMiGvR9s', urdu: ''},
		videoTitles: {asl: '', english: 'Prayer of the Faithful | Daisy and Sheep', spanish: 'Prayer of the Faithful | Daisy and Sheep', urdu: ''}
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '/printables/daisyandsheep/Communion of Saints Answers.pdf', answerThumbnailLink: '/assets/images/daisyandsheep/communionofsaintsanswers.png', pdfLink: '/printables/daisyandsheep/Communion of Saints.pdf', thumbnailLink: '/assets/images/daisyandsheep/communionofsaints.png'},
		isDisabled: false,
		link: '/animations/daisyandsheep?e=communionofsaints',
		releaseDate: $elm$time$Time$millisToPosix(1729000800000),
		thumbnail: '/assets/images/AnimationImageLinks/CommunionOfSaints.png',
		title: 'Communion of Saints',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/cbb2iRzz9pc', spanish: 'https://www.youtube.com/embed/3o5bCo0gQyM', urdu: ''},
		videoTitles: {asl: '', english: 'Communion of Saints | Daisy and Sheep', spanish: 'Communion of Saints | Daisy and Sheep', urdu: ''}
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '/printables/daisyandsheep/Eucharistic Wine Answers.pdf', answerThumbnailLink: '/assets/images/daisyandsheep/eucharisticwineanswers.png', pdfLink: '/printables/daisyandsheep/Eucharistic Wine.pdf', thumbnailLink: '/assets/images/daisyandsheep/eucharisticwine.png'},
		isDisabled: false,
		link: '/animations/daisyandsheep?e=eucharisticwine',
		releaseDate: $elm$time$Time$millisToPosix(1729000800000),
		thumbnail: '/assets/images/AnimationImageLinks/EucharisticWine.png',
		title: 'Eucharistic Wine',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/u-hMEMTnfVY', spanish: 'https://www.youtube.com/embed/8RTTl5yKQEg', urdu: ''},
		videoTitles: {asl: '', english: 'Eucharistic Wine | Daisy and Sheep', spanish: 'Eucharistic Wine | Daisy and Sheep', urdu: ''}
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '/printables/daisyandsheep/Pope Names Answers.pdf', answerThumbnailLink: '/assets/images/daisyandsheep/popenamesanswers.png', pdfLink: '/printables/daisyandsheep/Pope Names.pdf', thumbnailLink: '/assets/images/daisyandsheep/popenames.png'},
		isDisabled: false,
		link: '/animations/daisyandsheep?e=popenames',
		releaseDate: $elm$time$Time$millisToPosix(1729605600000),
		thumbnail: '/assets/images/AnimationImageLinks/PopeNames.png',
		title: 'Pope Names',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/rijyDOxbcbo', spanish: 'https://www.youtube.com/embed/XmzSx4vMne0', urdu: ''},
		videoTitles: {asl: '', english: 'Pope Names | Daisy and Sheep', spanish: 'Pope Names | Daisy and Sheep', urdu: ''}
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '/printables/daisyandsheep/Preparing The Altar Answers.pdf', answerThumbnailLink: '/assets/images/daisyandsheep/preparingthealtaranswers.png', pdfLink: '/printables/daisyandsheep/Preparing the Altar.pdf', thumbnailLink: '/assets/images/daisyandsheep/preparingthealtar.png'},
		isDisabled: false,
		link: '/animations/daisyandsheep?e=preparingthealtar',
		releaseDate: $elm$time$Time$millisToPosix(1729951200000),
		thumbnail: '/assets/images/AnimationImageLinks/PreparingTheAltar.png',
		title: 'Preparing the Altar',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/8ql_OwO4JjI', spanish: 'https://www.youtube.com/embed/-pwWI-xypn4', urdu: ''},
		videoTitles: {asl: '', english: 'Preparing the Altar | Daisy and Sheep', spanish: 'Preparing the Altar | Daisy and Sheep', urdu: ''}
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '', answerThumbnailLink: '', pdfLink: '/printables/daisyandsheep/Being a Saint.pdf', thumbnailLink: '/assets/images/daisyandsheep/beingasaint.png'},
		isDisabled: false,
		link: '/animations/daisyandsheep?e=beingasaint',
		releaseDate: $elm$time$Time$millisToPosix(1729951200000),
		thumbnail: '/assets/images/AnimationImageLinks/BeingASaint.png',
		title: 'Being a Saint',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/-XrR2uYSyWg', spanish: 'https://www.youtube.com/embed/ECA41xh2qTY', urdu: ''},
		videoTitles: {asl: '', english: 'Being a Saint | Daisy and Sheep', spanish: 'Being a Saint | Daisy and Sheep', urdu: ''}
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '', answerThumbnailLink: '', pdfLink: '', thumbnailLink: ''},
		isDisabled: false,
		link: '/animations/daisyandsheep?e=holyholyholy',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: '/assets/images/AnimationImageLinks/HolyHolyHoly.png',
		title: 'Holy Holy Holy',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/Zpde2k4gvPc', spanish: 'https://www.youtube.com/embed/rihM8lIOKKg', urdu: ''},
		videoTitles: {asl: '', english: 'Holy Holy Holy | Daisy and Sheep', spanish: 'Holy Holy Holy | Daisy and Sheep', urdu: ''}
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '/printables/daisyandsheep/Doctors of the Church Answers.pdf', answerThumbnailLink: '/assets/images/daisyandsheep/doctorofthechurchanswers.png', pdfLink: '/printables/daisyandsheep/Doctors of the Church.pdf', thumbnailLink: '/assets/images/daisyandsheep/doctorofthechurch.png'},
		isDisabled: false,
		link: '/animations/daisyandsheep?e=doctorsofthechurch',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: '/assets/images/AnimationImageLinks/DoctorOfTheChurch.png',
		title: 'Doctors of the Church',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/rupDa-FbT2E', spanish: 'https://www.youtube.com/embed/0xOCqUbtlqA', urdu: ''},
		videoTitles: {asl: '', english: 'Doctors of the Church | Daisy and Sheep', spanish: 'Doctors of the Church | Daisy and Sheep', urdu: ''}
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '/printables/daisyandsheep/TheDewfallAnswers.pdf', answerThumbnailLink: '/assets/images/daisyandsheep/thedewfallanswers.png', pdfLink: '/printables/daisyandsheep/TheDewfall.pdf', thumbnailLink: '/assets/images/daisyandsheep/thedewfall.png'},
		isDisabled: false,
		link: '/animations/daisyandsheep?e=dewfall',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: '/assets/images/AnimationImageLinks/Dewfall.png',
		title: 'Dewfall',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/KjNv5g0B7Bk', spanish: 'https://www.youtube.com/embed/YRG4D4P0UA8', urdu: ''},
		videoTitles: {asl: '', english: 'The Dewfall | Daisy and Sheep', spanish: 'The Dewfall | Daisy and Sheep', urdu: ''}
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '/printables/daisyandsheep/SacramentsAnswers.pdf', answerThumbnailLink: '/assets/images/daisyandsheep/sacramentsanswers.png', pdfLink: '/printables/daisyandsheep/Sacraments.pdf', thumbnailLink: '/assets/images/daisyandsheep/sacraments.png'},
		isDisabled: false,
		link: '/animations/daisyandsheep?e=thesacraments',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: '/assets/images/AnimationImageLinks/Sacraments.png',
		title: 'The Sacraments',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/BF1kL8R075M', spanish: 'https://www.youtube.com/embed/mID8IVUWlf4', urdu: ''},
		videoTitles: {asl: '', english: 'The Sacraments | Daisy and Sheep', spanish: 'The Sacraments | Daisy and Sheep', urdu: ''}
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '/printables/daisyandsheep/LambOfGodAnswers.pdf', answerThumbnailLink: '/assets/images/daisyandsheep/lambofgodanswers.png', pdfLink: '/printables/daisyandsheep/LambOfGod.pdf', thumbnailLink: '/assets/images/daisyandsheep/lambofgod.png'},
		isDisabled: false,
		link: '/animations/daisyandsheep?e=thelambofgod',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: '/assets/images/AnimationImageLinks/LambOfGod.png',
		title: 'The Lamb of God',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/EpCX6CmlR0I', spanish: 'https://www.youtube.com/embed/19Ty4oGCkI0', urdu: ''},
		videoTitles: {asl: '', english: 'Lamb of God | Daisy and Sheep', spanish: 'Lamb of God | Daisy and Sheep', urdu: ''}
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '/printables/daisyandsheep/The7GiftsAnswers.pdf', answerThumbnailLink: '/assets/images/daisyandsheep/the7giftsanswers.png', pdfLink: '/printables/daisyandsheep/The7Gifts.pdf', thumbnailLink: '/assets/images/daisyandsheep/the7gifts.png'},
		isDisabled: false,
		link: '/animations/daisyandsheep?e=the7gifts',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: '/assets/images/AnimationImageLinks/The7Gifts.png',
		title: 'The 7 Gifts',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/9oCveljpiMA', spanish: 'https://www.youtube.com/embed/TrZNL11Jpvs', urdu: ''},
		videoTitles: {asl: '', english: 'The 7 Gifts | Daisy and Sheep', spanish: 'The 7 Gifts | Daisy and Sheep', urdu: ''}
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '', answerThumbnailLink: '', pdfLink: '/printables/daisyandsheep/Transubstantiation.pdf', thumbnailLink: '/assets/images/daisyandsheep/transubstantiation.png'},
		isDisabled: false,
		link: '/animations/daisyandsheep?e=transubstantiation',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: '/assets/images/AnimationImageLinks/Transubstantiation.png',
		title: 'Transubstantiation',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/16ms4F1PIaE', spanish: 'https://www.youtube.com/embed/DAWC8VYmgm0', urdu: ''},
		videoTitles: {asl: '', english: 'Transubstantiation | Daisy and Sheep', spanish: 'Transubstantiation | Daisy and Sheep', urdu: ''}
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '', answerThumbnailLink: '', pdfLink: '/printables/daisyandsheep/ashwednesday.pdf', thumbnailLink: '/assets/images/daisyandsheep/ashwednesday.png'},
		isDisabled: false,
		link: '/animations/daisyandsheep?e=ashwednesday',
		releaseDate: $elm$time$Time$millisToPosix(1732633200000),
		thumbnail: '/assets/images/AnimationImageLinks/AshWednesday.png',
		title: 'Ash Wednesday',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/5AEzncj0UIk', spanish: 'https://www.youtube.com/embed/NEiFT8ewEw0', urdu: ''},
		videoTitles: {asl: '', english: 'Ash Wednesday | Daisy and Sheep', spanish: 'Ash Wednesday | Daisy and Sheep', urdu: ''}
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '/printables/daisyandsheep/liturgicalcolorsanswers.pdf', answerThumbnailLink: '/assets/images/daisyandsheep/liturgicalcolorsanswers.png', pdfLink: '/printables/daisyandsheep/liturgicalcolors.pdf', thumbnailLink: '/assets/images/daisyandsheep/liturgicalcolors.png'},
		isDisabled: false,
		link: '/animations/daisyandsheep?e=liturgicalcolors',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: '/assets/images/AnimationImageLinks/LiturgicalColors.png',
		title: 'Liturgical Colors',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/VHgrRVss19g', spanish: 'https://www.youtube.com/embed/BwbvZLdnPmU', urdu: ''},
		videoTitles: {asl: '', english: 'Liturgical Colors | Daisy and Sheep', spanish: 'Liturgical Colors | Daisy and Sheep', urdu: ''}
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '/printables/daisyandsheep/easteranswers.pdf', answerThumbnailLink: '/assets/images/daisyandsheep/easteranswers.png', pdfLink: '/printables/daisyandsheep/easter.pdf', thumbnailLink: '/assets/images/daisyandsheep/easter.png'},
		isDisabled: false,
		link: '/animations/daisyandsheep?e=easter',
		releaseDate: $elm$time$Time$millisToPosix(1733238000000),
		thumbnail: '/assets/images/AnimationImageLinks/Easter.png',
		title: 'Easter',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/J1QydSx3N5M', spanish: 'https://www.youtube.com/embed/0Epu9Gu4UvQ', urdu: ''},
		videoTitles: {asl: '', english: 'Easter | Daisy and Sheep', spanish: 'Easter | Daisy and Sheep', urdu: ''}
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '', answerThumbnailLink: '', pdfLink: '', thumbnailLink: ''},
		isDisabled: false,
		link: '/animations/daisyandsheep?e=vaticanbank',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: '/assets/images/AnimationImageLinks/VaticanBank.png',
		title: 'Vatican Bank',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/hiVG7LS3sTQ', spanish: 'https://www.youtube.com/embed/apbCO8i9azI', urdu: ''},
		videoTitles: {asl: '', english: 'Vatican Bank | Daisy and Sheep', spanish: 'Vatican Bank | Daisy and Sheep', urdu: ''}
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '', answerThumbnailLink: '', pdfLink: '', thumbnailLink: ''},
		isDisabled: false,
		link: '/animations/daisyandsheep?e=churchmeaning',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: '/assets/images/AnimationImageLinks/ChurchMeaning.png',
		title: 'Church Meaning',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/mvbDFeU0Z2U', spanish: 'https://www.youtube.com/embed/EN_pyJnAmzs', urdu: ''},
		videoTitles: {asl: '', english: 'Church Meaning | Daisy and Sheep', spanish: 'Church Meaning | Daisy and Sheep', urdu: ''}
	}
	]);
var $author$project$Animations$DaisyAndSheep$DASEpisodes$seasons = _List_fromArray(
	[
		{
		description: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		episodes: $author$project$Animations$DaisyAndSheep$DASEpisodes$episodes,
		number: 1
	}
	]);
var $elm$json$Json$Encode$string = _Json_wrap;
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$html$Html$p = _VirtualDom_node('p');
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $author$project$Animations$HailMary$HMEpisodes$aboutTheAnimation = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('mx-auto col-span-2 w-full'),
			$elm$html$Html$Attributes$class('text-lg'),
			$elm$html$Html$Attributes$class('max-w-3xl')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-3')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Mother Mary is one of the most important people in our Catholic faith. She is admired for her unwavering faith, humility, and devotion to her son, Jesus Christ.')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-3')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('Her life and teachings have been a source of inspiration for Christians, and ')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('font-bold')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Mother Mary’s story has been passed down from generation to generation.')
						]))
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-3')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('One way to teach children about Mother Mary is through animated stories. These stories convey her life and importance in a way that is engaging and memorable. By using animation, children can see the events of her life come to life before their eyes, making it easier for them to understand and remember.')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-3')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('Here is just one example of how we do this at Catholic Stories for Children.')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('font-bold')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(' This animation helps kids learn the Hail Mary prayer through a story and repetition.')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(' The animation is designed to be an aid for children to build a habit of prayer. You can use it during prayer time while kids still learn the words and the solemn manner to pray.')
						]))
				]))
		]));
var $elm$html$Html$blockquote = _VirtualDom_node('blockquote');
var $elm$html$Html$Attributes$cite = $elm$html$Html$Attributes$stringProperty('cite');
var $elm$html$Html$h2 = _VirtualDom_node('h2');
var $author$project$Animations$HailMary$HMEpisodes$aboutThePrayer = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('mx-auto my-4 col-span-2 w-full'),
			$elm$html$Html$Attributes$class('text-lg'),
			$elm$html$Html$Attributes$class('py-5'),
			$elm$html$Html$Attributes$class('max-w-3xl')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h2,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('font-bold leading-9')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Additional information about the prayer to Mother Mary')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-10')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('The Hail Mary is a beautiful prayer to Mary, the Mother of Jesus. This prayer is filled with Scripture.')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-10')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('In this prayer, we begin with the greeting of St. Michael the Archangel, '),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('font-semibold')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('\'Hail Mary, full of grace, the Lord is with you\' (Luke 1:28). ')
						])),
					$elm$html$Html$text('What does it mean to be full of grace? Mary considered in her mind what sort of greeting this might be (Luke 1:29). ' + ('To be completely filled with grace indicates that Mary is ' + 'without sin.'))
				])),
			A2(
			$elm$html$Html$blockquote,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$cite('https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19641121_lumen-gentium_en.html'),
					$elm$html$Html$Attributes$class('my-10'),
					$elm$html$Html$Attributes$class('rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800'),
					$elm$html$Html$Attributes$class('italic')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('inline'),
							$elm$html$Html$Attributes$class('text-gray-500 dark:text-gray-400')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Because of this gift of sublime grace she far surpasses all creatures, ' + ('both in heaven and on earth. At the same time, however, because ' + ('she belongs to the offspring of Adam she is one with all those who ' + 'are to be saved. ')))
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mt-2')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Lumen Gentium, 53')
						]))
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-10')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Then we praise Mary in the same way as her cousin Elizabeth, '),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('font-semibold')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('\'Blessed are you among women, and blessed is the fruit of your womb\' (Luke 1:42).')
						]))
				])),
			A2(
			$elm$html$Html$blockquote,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-10'),
					$elm$html$Html$Attributes$class('rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800'),
					$elm$html$Html$Attributes$class('italic'),
					$elm$html$Html$Attributes$cite('https://www.vatican.va/content/john-paul-ii/en/encyclicals/documents/hf_jp-ii_enc_25031987_redemptoris-mater.html')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('inline'),
							$elm$html$Html$Attributes$class('text-gray-500 dark:text-gray-400')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('If after the announcement of the heavenly messenger the Virgin of Nazareth is also called ' + (' "blessed among women" (cf. Lk. 1:42), it is because of that blessing with which "God the Father" has ' + ('filled us "in the heavenly places, in Christ." It is a spiritual blessing which is meant for all people and ' + ('which bears in itself fullness and universality ("every blessing"). It flows from that love which, in the ' + ('Holy Spirit, unites the consubstantial Son to the Father. At the same time, it is a blessing poured out through ' + ('Jesus Christ upon human history until the end: upon all people. This blessing, however, refers to Mary in a ' + 'special and exceptional degree: for she was greeted by Elizabeth as "blessed among women." '))))))
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('my-10')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Pope John Paul II, Redemptoris Mater, 8')
						]))
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-10')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Lastly, we ask Mary to pray for us. '),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('font-semibold')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('\'Holy Mary, Mother of God, pray for us sinners now and at the hour of death. Amen.\'')
						]))
				]))
		]));
var $author$project$Animations$HailMary$HMEpisodes$moreAboutTheAnimation = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('mx-auto col-span-2 w-full'),
			$elm$html$Html$Attributes$class('text-lg'),
			$elm$html$Html$Attributes$class('max-w-3xl')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mb-3 font-bold')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Creating an animation on the Hail Mary prayer')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-3')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('When creating the animated story about Mother Mary, we stay true to her character. Her devotion to God and love for her son are at the forefront, and the animation reflects this. By doing so, children can learn about her life and teachings in a way that is both entertaining and informative.')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-3')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Would you agree?')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-3')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Our animations are great for homeschooling, hybrid schooling, and traditional religious education.')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-3')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Here at Catholic Stories for Children, our animated stories cover prayer, including the Hail Mary prayer (above), the St Michael prayer, and the prayer to your Guardian Angel. These animations also explore the virtues, such as humility, faith, and compassion. Each story is carefully crafted to ensure that it is both engaging and educational.')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-3')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Prayer is tremendously important in our Catholic faith, and building a habit of prayer has much to offer children. By creating animated stories that teach Catholic prayers and reflect Catholic virtues and teachings, we can help children learn about the faith in a way that is both entertaining and informative. These stories can inspire children to live a life of faith, love, and compassion, just like Mother Mary did.')
				]))
		]));
var $author$project$Shop$ShopHelpers$liturgicalCalendar2025 = {beehiivLink: 'https://blog.catholicstoriesforchildren.com/embed', description: 'A 2025 Liturgical Calendar, feast days, and coloring page!', etsyLink: '', image: '/assets/images/shop/5.png', link: '', name: '2025 Liturgical Calendar'};
var $elm$html$Html$a = _VirtualDom_node('a');
var $elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $elm$html$Html$Attributes$attribute = $elm$virtual_dom$VirtualDom$attribute;
var $elm$html$Html$Attributes$height = function (n) {
	return A2(
		_VirtualDom_attribute,
		'height',
		$elm$core$String$fromInt(n));
};
var $elm$html$Html$Attributes$href = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var $elm$html$Html$iframe = _VirtualDom_node('iframe');
var $elm$html$Html$img = _VirtualDom_node('img');
var $elm$core$Basics$neq = _Utils_notEqual;
var $elm$html$Html$Attributes$src = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'src',
		_VirtualDom_noJavaScriptOrHtmlUri(url));
};
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $elm$html$Html$Attributes$target = $elm$html$Html$Attributes$stringProperty('target');
var $author$project$Shop$ShopHelpers$viewShopItem2 = function (resourceGroup) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('rounded text-left sm:flex')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('flex justify-center')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$img,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$src(resourceGroup.image),
								$elm$html$Html$Attributes$class('max-w-72 max-h-72 object-contain')
							]),
						_List_Nil)
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('p-5')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('mb-3')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$h2,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('mb-3 leading-8')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(resourceGroup.name)
									])),
								A2(
								$elm$html$Html$p,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text(resourceGroup.description)
									]))
							])),
						A2(
						$elm$html$Html$iframe,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$src(resourceGroup.beehiivLink),
								$elm$html$Html$Attributes$height(52),
								A2($elm$html$Html$Attributes$attribute, 'frameborder', '0'),
								A2($elm$html$Html$Attributes$attribute, 'scrolling', 'no'),
								A2($elm$html$Html$Attributes$attribute, 'width', '480'),
								A2($elm$html$Html$Attributes$attribute, 'height', '150'),
								A2($elm$html$Html$Attributes$style, 'margin', '0'),
								A2($elm$html$Html$Attributes$style, 'border-radius', '5px'),
								A2($elm$html$Html$Attributes$style, 'background-color', 'transparent')
							]),
						_List_Nil),
						(resourceGroup.etsyLink !== '') ? A2(
						$elm$html$Html$div,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$a,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$href(resourceGroup.etsyLink),
										$elm$html$Html$Attributes$target('_blank'),
										$elm$html$Html$Attributes$class('text-blue-600 underline')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Click here to go to Etsy')
									])),
								A2(
								$elm$html$Html$span,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('. Enter email above for coupon code.')
									]))
							])) : A2($elm$html$Html$span, _List_Nil, _List_Nil)
					]))
			]));
};
var $author$project$Signup$view4 = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('flex justify-center py-3 bg-[#cb6a72] text-black')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('max-w-3xl')
				]),
			_List_fromArray(
				[
					$author$project$Shop$ShopHelpers$viewShopItem2($author$project$Shop$ShopHelpers$liturgicalCalendar2025)
				]))
		]));
var $elm$html$Html$Attributes$alt = $elm$html$Html$Attributes$stringProperty('alt');
var $author$project$Animations$HailMary$HMEpisodes$viewAnotherPage = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('mx-auto my-4 col-span-2 w-full'),
			$elm$html$Html$Attributes$class('text-lg'),
			$elm$html$Html$Attributes$class('py-5'),
			$elm$html$Html$Attributes$class('max-w-3xl')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h2,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('font-bold leading-9')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Prayer Time with Angels Animations')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-10')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Make sure to also check our our Prayer time with Angels Animations! Learn the prayer to your Guardian Angel and the St. Michael Prayer with Theo and Felicity!')
				])),
			A2(
			$elm$html$Html$a,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$href('/animations/prayertimewithangels'),
					$elm$html$Html$Attributes$class('hover:scale-105 transition ease-in-out duration-50'),
					A2($elm$html$Html$Attributes$attribute, 'aria-label', 'See the Prayer Time with Angels animation')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$img,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$src('/assets/images/AnimationImageLinks/PrayerTimeWithAngels.png'),
							A2($elm$html$Html$Attributes$style, 'border-radius', '5px'),
							A2($elm$html$Html$Attributes$style, 'width', '-webkit-fill-available'),
							$elm$html$Html$Attributes$alt('Prayer Time with Angels animations')
						]),
					_List_Nil)
				]))
		]));
var $author$project$Animations$HailMary$HMEpisodes$viewPrayer = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('mt-10 text-lg')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mb-3 font-bold')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('The Prayer')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('italic mb-4')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Hail Mary, full of grace, the Lord is with you;')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('blessed are you among women,')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('and blessed is the fruit of your womb, Jesus.')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Holy Mary, Mother of God,')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('pray for us sinners')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('now and at the hour of our death.')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Amen.')
						]))
				]))
		]));
var $author$project$Team$Team$imagePath = '/assets/Team/';
var $author$project$Team$Team$trevor = {description: 'Trevor is a former software engineer. He received his ' + ('MA in Theology at the Franciscan University of Steubenville. ' + 'He founded Catholic Stories for Children to spread the light and love of God through animated stories that kids will love.'), image: $author$project$Team$Team$imagePath + 'TrevorRothaus.jpeg', initials: '', name: 'Trevor Rothaus', position: 'Founder and CEO', socials: _List_Nil};
var $author$project$Helpers$darkPurple = '#B99EDA';
var $author$project$Team$Team$viewImage = F2(
	function (image, initials) {
		return (image === '') ? A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'position', 'relative'),
					A2($elm$html$Html$Attributes$style, 'width', '52px'),
					A2($elm$html$Html$Attributes$style, 'height', '52px'),
					A2($elm$html$Html$Attributes$style, 'border-radius', '30px'),
					A2($elm$html$Html$Attributes$style, 'border', '1px solid #777'),
					A2($elm$html$Html$Attributes$style, 'background-color', $author$project$Helpers$darkPurple)
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'top', '50%'),
							A2($elm$html$Html$Attributes$style, 'left', '50%'),
							A2($elm$html$Html$Attributes$style, 'transform', 'translate(-50%, -50%)')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(initials)
						]))
				])) : A2(
			$elm$html$Html$img,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'width', '52px'),
					A2($elm$html$Html$Attributes$style, 'height', '52px'),
					A2($elm$html$Html$Attributes$style, 'border-radius', '30px'),
					A2($elm$html$Html$Attributes$style, 'border', '1px solid #777'),
					A2($elm$html$Html$Attributes$style, 'object-fit', 'cover'),
					$elm$html$Html$Attributes$src(image),
					$elm$html$Html$Attributes$alt(''),
					A2($elm$html$Html$Attributes$attribute, 'ariaHidden', 'true')
				]),
			_List_Nil);
	});
var $author$project$Team$Team$viewPersonImage = function (person) {
	return A2($author$project$Team$Team$viewImage, person.image, person.initials);
};
var $author$project$Animations$HailMary$HMEpisodes$viewResources = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('mx-auto col-span-2 w-full'),
			$elm$html$Html$Attributes$class('text-lg'),
			$elm$html$Html$Attributes$class('max-w-3xl')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-3 font-bold')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Additional information about the prayer to Mother Mary')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-3')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Below, I have listed important prayers and resources about Mother Mary which you will find useful in sharing with children.')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-3')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Thank you, and may God bless you,')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-3')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('my-3')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Trevor Rothaus ')
						])),
					$author$project$Team$Team$viewPersonImage($author$project$Team$Team$trevor)
				]))
		]));
var $author$project$Animations$HailMary$HMEpisodes$episodes = _List_fromArray(
	[
		{
		about: A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[$author$project$Animations$HailMary$HMEpisodes$aboutTheAnimation, $author$project$Animations$HailMary$HMEpisodes$viewPrayer, $author$project$Animations$HailMary$HMEpisodes$moreAboutTheAnimation, $author$project$Signup$view4, $author$project$Animations$HailMary$HMEpisodes$viewResources, $author$project$Animations$HailMary$HMEpisodes$aboutThePrayer, $author$project$Animations$HailMary$HMEpisodes$viewAnotherPage])),
		activities: {answerPdfLink: '/printables/Hail-Mary-Activity-Answers.pdf', answerThumbnailLink: 'https://ik.imagekit.io/catholicstories/10_1__s3i8dhFiH.png?updatedAt=1689288132684', pdfLink: '/printables/Hail-Mary-Activities.pdf', thumbnailLink: 'https://ik.imagekit.io/catholicstories/9_1__-d-EPYcuW.png?updatedAt=1689288132704'},
		isDisabled: false,
		link: '',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: '/assets/images/AnimationImageLinks/HailMary.png',
		title: 'Hail Mary',
		videoLinks: {asl: 'https://www.youtube.com/embed/QNVNbLiqznI?playlist=QNVNbLiqznI&loop=1', english: 'https://www.youtube.com/embed/HW0DzGEoa1Y?playlist=HW0DzGEoa1Y&loop=1', spanish: '', urdu: 'https://www.youtube.com/embed/NN7gd5xqDw8?si=tUB20FMCCdN2Mafx'},
		videoTitles: {asl: '', english: 'Hail Mary Animation', spanish: '', urdu: ''}
	}
	]);
var $author$project$Animations$HailMary$HMEpisodes$seasons = _List_fromArray(
	[
		{
		description: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		episodes: $author$project$Animations$HailMary$HMEpisodes$episodes,
		number: 1
	}
	]);
var $author$project$Animations$ActOfContrition$Description$aboutTheAnimation = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('mx-auto col-span-2 w-full'),
			$elm$html$Html$Attributes$class('text-lg'),
			$elm$html$Html$Attributes$class('max-w-3xl')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-3')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Use this animation to help your children learn the Act of Contrition prayer though a story and song.' + ' It also will help your children learn more about the Sacrament of Confession and how Jesus washes our sins away.')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-3')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('This animation is meant to be an aid for your children to slowly build a habit of prayer. ' + 'You can use it during prayer time while kids are still learning both the words and the solemn manner to pray.')
				]))
		]));
var $elm$html$Html$h3 = _VirtualDom_node('h3');
var $author$project$Animations$ActOfContrition$Description$aboutThePrayer = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('mx-auto col-span-2 w-full'),
			$elm$html$Html$Attributes$class('text-lg'),
			$elm$html$Html$Attributes$class('py-5'),
			$elm$html$Html$Attributes$class('max-w-3xl')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h2,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mb-3 mt-5')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('See More on Penance and Reconciliation')
				])),
			A2(
			$elm$html$Html$h3,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-3 mt-6 font-bold')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Scripture')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-3')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('The Seven Penitential Psalms: 6, 32, 38, 51, 102, 130, and 143.')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-3')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('The contritite heart of Zacchaeus: Luke 19:1-10.')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-3')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('The contrite heart of the Penitant woman: Luke 7:36-50.')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-3')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Jesus giving the authority to forgive sins: John 20:22-23.')
				])),
			A2(
			$elm$html$Html$h3,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-3')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Church Teachings')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-3 mt-6 font-bold')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('CCC 1422-1498')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-3')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('The Nicene Creed and the Apostles’ Creed. Both profess our belief in the forgiveness of sins.')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-3')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('The five precepts of the Church. Confessing sins is one.')
				]))
		]));
var $author$project$Animations$ActOfContrition$Description$viewAnotherPage = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('mx-auto my-4 col-span-2 w-full'),
			$elm$html$Html$Attributes$class('text-lg'),
			$elm$html$Html$Attributes$class('py-5'),
			$elm$html$Html$Attributes$class('max-w-3xl')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h2,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('font-bold leading-9')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Daisy and Sheep Animations')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-10')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Make sure to also check our our Daisy and Sheep Animations! Learn the Mass and Catholic fun facts with Daisy and Sheep!')
				])),
			A2(
			$elm$html$Html$a,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$href('/animations/daisyandsheep'),
					$elm$html$Html$Attributes$class('hover:scale-105 transition ease-in-out duration-50'),
					A2($elm$html$Html$Attributes$attribute, 'aria-label', 'See the Daisy and Sheep animations')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$img,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$src('/assets/images/AnimationImageLinks/DaisyAndSheep.png'),
							A2($elm$html$Html$Attributes$style, 'border-radius', '5px'),
							A2($elm$html$Html$Attributes$style, 'width', '-webkit-fill-available'),
							$elm$html$Html$Attributes$alt('Daisy and Sheep Animations')
						]),
					_List_Nil)
				]))
		]));
var $author$project$Animations$ActOfContrition$Description$viewPrayer = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('mt-10 text-lg')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h2,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mb-3')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('The Prayer')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mb-5')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('My God,')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('I am sorry for my sins with all my heart.')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('In choosing to do wrong')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('and failing to do good,')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('I have sinned against you')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('whom I should love above all things.')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('I firmly intend, with your help,')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('to do penance,')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('to sin no more,')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('and to avoid whatever leads me to sin.')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Our Savior Jesus Christ suffered and died for us.')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('In his name, my God, have mercy.')
						]))
				]))
		]));
var $author$project$Animations$ActOfContrition$Description$viewAbout = A2(
	$elm$html$Html$div,
	_List_Nil,
	_List_fromArray(
		[$author$project$Animations$ActOfContrition$Description$aboutTheAnimation, $author$project$Animations$ActOfContrition$Description$viewPrayer, $author$project$Animations$ActOfContrition$Description$aboutThePrayer, $author$project$Animations$ActOfContrition$Description$viewAnotherPage]));
var $author$project$Animations$StMichael$Description$aboutTheAnimation = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('mx-auto col-span-2 w-full'),
			$elm$html$Html$Attributes$class('text-lg'),
			$elm$html$Html$Attributes$class('max-w-3xl')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-3')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Use this animation to help your children learn the St Michael the Archangel prayer though a story and song.' + ' It also will help your children learn more about St Michael and trusting in God in times of fear.')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-3')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('This animation is meant to be an aid for your children to slowly build a habit of prayer. ' + 'You can use it during prayer time while kids are still learning both the words and the solemn manner to pray.')
				]))
		]));
var $author$project$Animations$StMichael$Description$aboutThePrayer = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('mx-auto col-span-2 w-full'),
			$elm$html$Html$Attributes$class('text-lg'),
			$elm$html$Html$Attributes$class('py-5'),
			$elm$html$Html$Attributes$class('max-w-3xl')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h2,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mb-3 mt-5')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('About the St Michael Prayer')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-3')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('The St Michael Prayer was originally composed by Pope Leo XIII. He sent it to all the churches for the people to say after each Mass.' + ' In this prayer, we seek St Michael\'s protection from the devil and evil spirits.')
				]))
		]));
var $author$project$Animations$StMichael$Description$viewAnotherPage = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('mx-auto my-4 col-span-2 w-full'),
			$elm$html$Html$Attributes$class('text-lg'),
			$elm$html$Html$Attributes$class('py-5'),
			$elm$html$Html$Attributes$class('max-w-3xl')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h2,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('font-bold leading-9')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Daisy and Sheep Animations')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-10')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Make sure to also check our our Act of Contrition Animation! Learn the Act of Contrition Prayer with Theo and Felicity!')
				])),
			A2(
			$elm$html$Html$a,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$href('/animations/prayertimewithangels/1/actofcontritionprayer'),
					$elm$html$Html$Attributes$class('hover:scale-105 transition ease-in-out duration-50'),
					A2($elm$html$Html$Attributes$attribute, 'aria-label', 'See the Act of Contrition animation')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$img,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$src('/assets/images/AnimationImageLinks/PTWA/AOC.png'),
							A2($elm$html$Html$Attributes$style, 'border-radius', '5px'),
							A2($elm$html$Html$Attributes$style, 'width', '-webkit-fill-available'),
							$elm$html$Html$Attributes$alt('Act of Contrition Animation')
						]),
					_List_Nil)
				]))
		]));
var $author$project$Animations$StMichael$Description$viewPrayer = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('mt-10 text-lg')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h2,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mb-3')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('The Prayer')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mb-5')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('St. Michael the Archangel,')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('defend us in battle.')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Be our defense against the wickedness and snares of the Devil.')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('May God rebuke him, we humbly pray,')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('and do thou,')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('O Prince of the heavenly hosts,')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('by the power of God,')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('thrust into hell Satan,')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('and all the evil spirits,')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('who prowl about the world')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('seeking the ruin of souls. Amen.')
						]))
				])),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('O glorious prince St. Michael, ')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('chief and commander of the heavenly hosts, ')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('guardian of souls, vanquisher of rebel spirits, ')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('servant in the house of the Divine King')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('and our admirable conductor, ')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('you who shine with excellence')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('and superhuman virtue deliver us from all evil,')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('who turn to you with confidence')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('and enable us by your gracious protection')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('to serve God more and more faithfully every day.')
						]))
				]))
		]));
var $author$project$Animations$StMichael$Description$viewPrayerHistory = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('mx-auto col-span-2 w-full'),
			$elm$html$Html$Attributes$class('text-lg'),
			$elm$html$Html$Attributes$class('py-5'),
			$elm$html$Html$Attributes$class('max-w-3xl')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h2,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mb-3 mt-5')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('The History of the Prayer')
				])),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('The information here is based on the book ')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('italic')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Pope Leo XIII and the Prayer to St Michael: An Historical and Theological Examination')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(' by Kevin Symonds.')
						]))
				])),
			A2(
			$elm$html$Html$h3,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mt-5')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('1859')
				])),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Pope Pius IX ordered a series of prayers to be recited after private Masses in all churches in the Papal States. Priests were to say with the people the Ave Maria three times, then the Salve Regina, then a prayer composed of four different orations.')
				])),
			A2(
			$elm$html$Html$h3,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mt-5')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('1884')
				])),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('Pope Leo XIII modified the prayers from Pope Pius IX in the Decree ')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('italic')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Iam inde')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(' through the Sacred Congregation of Rites. He replaced the four concluding orations with one.')
						]))
				])),
			A2(
			$elm$html$Html$blockquote,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$cite(''),
					$elm$html$Html$Attributes$class('my-10'),
					$elm$html$Html$Attributes$class('rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800'),
					$elm$html$Html$Attributes$class('italic')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('inline'),
							$elm$html$Html$Attributes$class('text-gray-500 dark:text-gray-400')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('italic')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('O God, our refuge and our strength, attend to and guarantee the prayers of your holy Church, so that we may efficaciously follow [You] by the intercession of the glorious and Immaculate Virgin Mary Mother of God, St. Joseph and your blessed Apostles Peter and Paul and all the Saints, whom in the present necessity we humbly implore. Through Christ our Lord. Amen')
								]))
						]))
				])),
			A2(
			$elm$html$Html$h3,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('font-bold mt-5')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('1886')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('font-bold')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Pope Leo XIII revised the oration again and also added the prayer to St Michael the Archangel.')
				])),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('md:columns-2')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$blockquote,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$cite(''),
							$elm$html$Html$Attributes$class('my-10'),
							$elm$html$Html$Attributes$class('rounded px-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800'),
							$elm$html$Html$Attributes$class('italic')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('inline'),
									$elm$html$Html$Attributes$class('text-gray-500 dark:text-gray-400')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$p,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('italic')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Sancte Michael Archangele, defende nos in proelio, contra nequitiam et insidias diaboli esto praesidium. Imperet illi Deus, supplices deprecamur: tuque, Princeps militiae coelestis, Satanam aliosque spiritus malignos, qui ad perditionem animarum pervagantur in mundo, divina virtue, in infernum detrude. Amen. (Ephemerides Liturgicae 69:57)')
										]))
								]))
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('italic'),
							$elm$html$Html$Attributes$class('px-4 my-4')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Saint Michael the Archangel, defend us in battle, be our protection against the wickedness and snares of the devil. May God rebuke him, we humbly pray: and do thou, O Prince of the heavenly hosts, by the power of God, thrust into hell Satan and all the evil spirits who prowl about the world seeking the ruin of souls. Amen.')
						]))
				])),
			A2(
			$elm$html$Html$h3,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mt-5')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('1930')
				])),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Pope Pius IX in his allocution of June 30, 1930, wanted it to be recited with an intention for Russia.')
				])),
			A2(
			$elm$html$Html$blockquote,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$cite(''),
					$elm$html$Html$Attributes$class('my-10'),
					$elm$html$Html$Attributes$class('rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800'),
					$elm$html$Html$Attributes$class('italic')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('inline'),
							$elm$html$Html$Attributes$class('text-gray-500 dark:text-gray-400')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('italic')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Therefore we must press upon Christ  the Redeemer of the human race, that he allow tranquility and the freedom to profess the faith to be restored to the afflicted children of Russia. And so that everyone can press [upon him], with, to be sure, little trouble and inconvenience, we desire that those same prayers which our predecessor of happy memory Leo XIII ordered priests to recite with the people after Holy [Mass] is finished should be said for this same intention, namely for Russia.')
								]))
						]))
				])),
			A2(
			$elm$html$Html$h3,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mt-5')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('1964')
				])),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('Inter Oecumenici, promulgated by the Consilium and the Sacred Congregation of Rites, suppressed the prayer to Saint Michael.')
						]))
				])),
			A2(
			$elm$html$Html$h3,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mt-5')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('2018')
				])),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('In his prayer intention for the month of October in 2018, Pope Francis called for the praying of the rosary every day in October, ending with the ancient prayer to our lady, the Sub Tuum Praesidium, and the prayer to St. Michael the Archangel, to repel the attacks of the Devil who wants to divide the Church.')
				]))
		]));
var $author$project$Animations$StMichael$Description$viewStoryHistory = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('mx-auto col-span-2 w-full'),
			$elm$html$Html$Attributes$class('text-lg'),
			$elm$html$Html$Attributes$class('py-5'),
			$elm$html$Html$Attributes$class('max-w-3xl')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h2,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mb-3 mt-5')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('The History of the Story of Pope Leo XIII\'s Vision')
				])),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('The information here is based on the book ')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('italic')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Pope Leo XIII and the Prayer to St Michael: An Historical and Theological Examination')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(' by Kevin Symonds.')
						]))
				])),
			A2(
			$elm$html$Html$h3,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mt-5')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('1931')
				])),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('Fr. Carl Vogl wrote the vision of Pope Leo XIII in his book ')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('italic')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Wiche Satan. ')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('He also published it in the publication ')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('italic')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Altottinger-Liebfrauenbote')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('. Vogl said that Pope Leo XIII composed a powerful prayer of exorcism for priests against the fallen angels and evil spirits.')
						])),
					A2(
					$elm$html$Html$blockquote,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$cite(''),
							$elm$html$Html$Attributes$class('my-10'),
							$elm$html$Html$Attributes$class('rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800'),
							$elm$html$Html$Attributes$class('italic')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('inline'),
									$elm$html$Html$Attributes$class('text-gray-500 dark:text-gray-400')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('italic block ')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('After celebrating Mass one day he was in conference with the Cardinals. Suddenly he sank to the floor. Several doctors were summoned at once but found no sign of a pulse- the very life seemed to have ebbed away from the fragile and aging body. Suddenly he recovered and said: “What a horrible vision I have been shown!” He saw the ages to come, the seductive powers and ravings of the devils against the Church in every land. But St. Michael appeared in the moment of greatest distress and cast Satan and his cohorts back into the abyss of hell. Such was the occasion that caused Pope Leo XIII to prescribe this prayer for the universal Church.')
										]))
								]))
						]))
				])),
			A2(
			$elm$html$Html$h3,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mt-5')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('1933')
				])),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('Hugo Schnell wrote an article in ')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('italic')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Konnersreuther Sonntagsblatt 39')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(' Year 7 titled ')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('italic')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Eine Teufelsanstreibung und Kpnnersreuth: Engel und Teufel ')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('(An Exorcism and Konnersreuth: Angels and Demons).')
						])),
					A2(
					$elm$html$Html$blockquote,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$cite(''),
							$elm$html$Html$Attributes$class('my-10'),
							$elm$html$Html$Attributes$class('rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800'),
							$elm$html$Html$Attributes$class('italic')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('inline'),
									$elm$html$Html$Attributes$class('text-gray-500 dark:text-gray-400')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('italic')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('After Leo XIII had celebrated a morning Mass, he went to a meeting with the Cardinals. Suddenly he collapsed into unconsciousness. The doctors who came to his aid found no cause for the collapse, although his pulse almost ceased. Suddenly he awoke and was fresh as ever. He reported that he had seen a terrible vision. He was granted to see the devil’s seductiveness and ravaging for the coming ages in all lands. In this distress, St Michael the Archangel appeared and cast Satan with all his demons back into the infernal abyss. Leo XIII thereupon ordered, shortly after 1880, the Common Prayer to St. Michael.')
										]))
								]))
						]))
				])),
			A2(
			$elm$html$Html$h3,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mt-5')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('1934')
				])),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('Monsignor Wilhelm Bers in 1934 published the stories of the vision in the theological journal ')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('italic')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Theologische-Praktische, Quartalschrift')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('. He quotes from Vogl\'s ')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('italic')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Wiche Satan')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(' and Schnell\'s publication.')
						]))
				])),
			A2(
			$elm$html$Html$h3,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mt-5')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('1946')
				])),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('Cardinal Giovanni Battista Nasalli Rocca di Corneliano, the Archbishop of Bologna 1922-1952, recounted the story in his Pastoral Letter for Lent, issued in Bologna in 1946.')
						])),
					A2(
					$elm$html$Html$blockquote,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$cite(''),
							$elm$html$Html$Attributes$class('my-10'),
							$elm$html$Html$Attributes$class('rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800'),
							$elm$html$Html$Attributes$class('italic')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('inline'),
									$elm$html$Html$Attributes$class('text-gray-500 dark:text-gray-400')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('italic block')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('It wasn\'t for naught that the most wise Pontiff, Pope Leo XIII, whose superior intelligence and certainly not narrow-minded or small spirit, himself wrote that beautiful and powerful prayer, and then ordered its recitation by all priests after the celebration of the Holy Mass...')
										])),
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('italic block')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('And that part of the prayer - \'who prowl about the world\' - has an historical explanation, which has been shared numerous times by the Holy Father\'s most faithful Secretary, who was very close to him throughout his pontificate, Msgr. Rinaldo Angelini. ')
										])),
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('italic block')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Pope Leo XIII truly had a vision of demonic spirits, who were gathering on the Eternal City (Rome). From that experience - which he shared with the Prelate and certainly with others in confidentiality - comes the prayer which he wanted the whole Church to recite.')
										])),
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('italic block')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('This was the prayer which he recited (we heard this many times in the Vatican Basilica) with a strong, powerful voice, which resonated in an unforgettable way in the universal silence beneath the vaults of the most important temple of Christianity.')
										]))
								]))
						]))
				])),
			A2(
			$elm$html$Html$h3,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mt-5')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('1947')
				])),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('Father Domenico Pechenino submitted an article titled ')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('italic')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('La Tragedia dei Tempi Nostri e l\'Opera di Satana')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(' (The Tragedy of Our Times and the Work of Satan) for the Italian newspaper ')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('italic')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('La Settimana del Clero.')
						])),
					A2(
					$elm$html$Html$blockquote,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$cite(''),
							$elm$html$Html$Attributes$class('my-10'),
							$elm$html$Html$Attributes$class('rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800'),
							$elm$html$Html$Attributes$class('italic')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('inline'),
									$elm$html$Html$Attributes$class('text-gray-500 dark:text-gray-400')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('italic block pl-5 pr-20 pt-1')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Permit me here to mention more than a little known fact which throws a vivid beam of light on the order of ideas that I mentioned. I have drawn the fact to a trusted source (and I am willing to reveal it, if required): and let each one weigh the consequence!')
										])),
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('italic block pl-5 pr-20 pt-1')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('I don\'t remember the precise year. It was a little after 1890. One morning, the great Pontiff, Leo XIII - who had already gained the admiration of the entire civil world and the wrath of the international freemasons - had celebrated Holy Mass, and was assisting at another Mass (for his thanksgiving) as usual.')
										])),
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('italic block pl-5 pr-20 pt-1')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('At a certain point, he seemed to straighten vigorously his head, fixing his gaze intensely on something that was above the head of the celebrant. He looked at it intently, without batting an eyelid, but with a sense of dread and wonder, becoming pale and fearful. Something strange, something significant was happening to him... ')
										])),
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('italic block pl-5 pr-20 pt-1')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Finally, as if keeping it to himself, giving a light but energetic touch of his hand, he got up. He started heading towards his private study. His closest friends and assistants [i familiari] hastily and anxiously followed him.')
										])),
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('italic block pl-5 pr-20 pt-1')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('\'Holy Father!\' they solemnly cried out. \'Do you not feel well? Do you need anything?\' He responded: \'No, nothing!\' And he closed himself in his study. After a half hour, he called to the Secretary of the Sacred Congregation of Rites, and gave him a piece of paper, ordering him to make copies and to send it to all the Ordinaries of the world.')
										])),
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('italic block pl-5 pr-20 pt-1')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('What did it contain? The prayer which we recite at the end of the Mass (cum popolo), imploring Mary and the fiery invocation to the Prince of heavenly powers, St Michael \'Sancte Michael Archangele, defendo nos in proelio\'...')
										])),
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('italic block pl-5 pr-20 pt-1')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('imporing God to drive him to hell, \'et in infernum detrude!\'')
										])),
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('italic block pl-5 pr-20 pt-1')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Then what happened? This is what happened.')
										])),
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('italic block pl-5 pr-20 pt-1')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('God had shown Satan to the Vicar of His divine Son on earth, just like He did with Job. Satan was bragging that he had already devastated the Church on a large scale. In fact, these were tumultuous times for Italy, for many nations in Europe, and a bit around the world. The freemasons ruled, and governments hadn\'t become docile instruments. With the audacity of a boaster, Satan put a challenge to God.')
										])),
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('italic block pl-5 pr-20 pt-1')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('- \'And if you give me a little more freedom, you could see what I would do for your church!\' - \'What would you do?\' - \'I would destroy it\' - \'Oh, that would be something to see. How long would it take?\' - \'Fifty or sixty years.\' \'Have more freedom, and the time that you need. Then we\'ll see what happens.')
										]))
								]))
						]))
				]))
		]));
var $author$project$Animations$StMichael$Description$viewAbout = A2(
	$elm$html$Html$div,
	_List_Nil,
	_List_fromArray(
		[$author$project$Animations$StMichael$Description$aboutTheAnimation, $author$project$Animations$StMichael$Description$viewPrayer, $author$project$Animations$StMichael$Description$aboutThePrayer, $author$project$Animations$StMichael$Description$viewPrayerHistory, $author$project$Animations$StMichael$Description$viewStoryHistory, $author$project$Animations$StMichael$Description$viewAnotherPage]));
var $author$project$Animations$GuardianAngel$Description$aboutTheAnimation = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('mx-auto col-span-2 w-full'),
			$elm$html$Html$Attributes$class('text-lg'),
			$elm$html$Html$Attributes$class('max-w-3xl')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-3')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Use this animation to help your children learn the Guardian Angel prayer though a story and song.' + ' It also will help your children understand the concept of a guardian angel.')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-3')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('This animation is meant to be an aid for your children to slowly build a habit of prayer. ' + 'You can use it during prayer time while kids are still learning both the words and the solemn manner to pray.')
				]))
		]));
var $author$project$Animations$GuardianAngel$Description$magisterialTeachings = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('mx-auto col-span-2 w-full'),
			$elm$html$Html$Attributes$class('text-lg'),
			$elm$html$Html$Attributes$class('py-5'),
			$elm$html$Html$Attributes$class('max-w-3xl')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h2,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mb-10')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Popes and The Magisterium')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('We can also find popes and magisterial teachings on the care of angels over us.')
				])),
			A2(
			$elm$html$Html$blockquote,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$cite(''),
					$elm$html$Html$Attributes$class('my-10'),
					$elm$html$Html$Attributes$class('rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800'),
					$elm$html$Html$Attributes$class('italic')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('inline'),
							$elm$html$Html$Attributes$class('text-gray-500 dark:text-gray-400')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('From its beginning until death, human life is surrounded by their watchful care and intercession.')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mt-2')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('CCC 336')
						]))
				])),
			A2(
			$elm$html$Html$blockquote,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$cite(''),
					$elm$html$Html$Attributes$class('my-10'),
					$elm$html$Html$Attributes$class('rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800'),
					$elm$html$Html$Attributes$class('italic')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('inline'),
							$elm$html$Html$Attributes$class('text-gray-500 dark:text-gray-400')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Dear friends, the Lord is ever close and active in humanity’s history and accompanies us with the unique presence of his Angels, whom today the Church venerates as “Guardian Angels”, that is, ministers of the divine care for every human being. From the beginning until the hour of death, human life is surrounded by their constant protection.')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mt-2')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Pope Benedict XVI, Angelus, Oct. 2, 2011]')
						]))
				]))
		]));
var $author$project$Animations$GuardianAngel$Description$scripture = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('mx-auto col-span-2 w-full'),
			$elm$html$Html$Attributes$class('text-lg'),
			$elm$html$Html$Attributes$class('py-5'),
			$elm$html$Html$Attributes$class('max-w-3xl')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h2,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mb-10')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Scripture')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('We find a reference to guardian angels in Jesus\' parable of the Lost Sheep. He talks about the guardian angels of the little ones and how their angels always look upon the face of God the Father in heaven.')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-3 font-semibold')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('See that you do not despise one of these little ones, for I say to you that their angels in heaven always look upon the face of my heavenly Father.  - Matthew 18:10 ')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('We also find a reference to guardian angels in Acts of the Apostles when Peter knocked on the gateway door at the house of Mary, the mother of Mark. Rhonda was excited to hear his voice so she ran to the others to announce his arrival.' + ' But they didn\'t believe her and thought it was Peter\'s angel.')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-3 font-semibold')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('italic')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(' Angelus eius est! ')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('- "It\'s his angel!" - Acts 12:15 ')
						]))
				])),
			A2(
			$elm$html$Html$blockquote,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$cite(''),
					$elm$html$Html$Attributes$class('my-10'),
					$elm$html$Html$Attributes$class('rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800'),
					$elm$html$Html$Attributes$class('italic')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('inline'),
							$elm$html$Html$Attributes$class('text-gray-500 dark:text-gray-400')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(' See on what intimate terms the early Christians were with their guardian angels. And what about you? ')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mt-2')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('St Josemaría Escrivá, The Way, 570')
						]))
				]))
		]));
var $author$project$Animations$GuardianAngel$Description$tradition = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('mx-auto col-span-2 w-full'),
			$elm$html$Html$Attributes$class('text-lg'),
			$elm$html$Html$Attributes$class('py-5'),
			$elm$html$Html$Attributes$class('max-w-3xl')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h2,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mb-10')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Tradition')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('We can find some of our early church fathers talking about guardian angels.')
				])),
			A2(
			$elm$html$Html$blockquote,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$cite(''),
					$elm$html$Html$Attributes$class('my-10'),
					$elm$html$Html$Attributes$class('rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800'),
					$elm$html$Html$Attributes$class('italic')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('inline'),
							$elm$html$Html$Attributes$class('text-gray-500 dark:text-gray-400')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('For regiments of angels are distributed over nations and cities; and perhaps some even are assigned to particular individuals.')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mt-2')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Clement of Alexandria, Miscellanies 6.17')
						]))
				])),
			A2(
			$elm$html$Html$blockquote,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$cite(''),
					$elm$html$Html$Attributes$class('my-10'),
					$elm$html$Html$Attributes$class('rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800'),
					$elm$html$Html$Attributes$class('italic')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('inline'),
							$elm$html$Html$Attributes$class('text-gray-500 dark:text-gray-400')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('High dignity of souls, that each from its birth has an Angel set in charge over it!')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mt-2')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('St. Jerome')
						]))
				])),
			A2(
			$elm$html$Html$blockquote,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$cite(''),
					$elm$html$Html$Attributes$class('my-10'),
					$elm$html$Html$Attributes$class('rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800'),
					$elm$html$Html$Attributes$class('italic')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('inline'),
							$elm$html$Html$Attributes$class('text-gray-500 dark:text-gray-400')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Beside each believer stands an angel as protector and shepherd leading him to life.')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mt-2')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('St. Basil, Adv. Eunomium III, 1: PG 29, 656B')
						]))
				]))
		]));
var $author$project$Animations$GuardianAngel$Description$viewAnotherPage = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('mx-auto my-4 col-span-2 w-full'),
			$elm$html$Html$Attributes$class('text-lg'),
			$elm$html$Html$Attributes$class('py-5'),
			$elm$html$Html$Attributes$class('max-w-3xl')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h2,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('font-bold leading-9')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Saint Michael Animation')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-10')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Make sure to also check our our Saint Michael Animation! Learn the St. Michael Prayer with Theo and Felicity!')
				])),
			A2(
			$elm$html$Html$a,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$href('/animations/prayertimewithangels/1/saintmichaelprayer'),
					$elm$html$Html$Attributes$class('hover:scale-105 transition ease-in-out duration-50'),
					A2($elm$html$Html$Attributes$attribute, 'aria-label', 'See the Saint Michael animation')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$img,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$src('/assets/images/AnimationImageLinks/SaintMichael.png'),
							A2($elm$html$Html$Attributes$style, 'border-radius', '5px'),
							A2($elm$html$Html$Attributes$style, 'width', '-webkit-fill-available'),
							$elm$html$Html$Attributes$alt('Saint Michael Animations')
						]),
					_List_Nil)
				]))
		]));
var $author$project$Animations$GuardianAngel$Description$viewPrayer = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('mt-10 text-lg')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h2,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mb-3')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('The Prayer')
				])),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Angel Of God, my guardian dear,')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('to whom God\'s love commits me here,')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('ever this day be at my side,')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('to light and guard, to rule and guide.')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('block')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Amen.')
						]))
				]))
		]));
var $author$project$Animations$GuardianAngel$Description$viewGuardianAngelDescription = A2(
	$elm$html$Html$div,
	_List_Nil,
	_List_fromArray(
		[
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('max-w-3xl m-auto py-5 px-11 mb-10')
				]),
			_List_fromArray(
				[$author$project$Animations$GuardianAngel$Description$aboutTheAnimation, $author$project$Animations$GuardianAngel$Description$viewPrayer, $author$project$Animations$GuardianAngel$Description$scripture, $author$project$Animations$GuardianAngel$Description$tradition, $author$project$Animations$GuardianAngel$Description$magisterialTeachings, $author$project$Animations$GuardianAngel$Description$viewAnotherPage]))
		]));
var $author$project$Animations$PrayerTimeWithAngels$PTWAEpisodes$episodes = _List_fromArray(
	[
		{
		about: $author$project$Animations$GuardianAngel$Description$viewGuardianAngelDescription,
		activities: {answerPdfLink: 'printables/Guardian-Angel-Activity-Answers.pdf', answerThumbnailLink: 'https://ik.imagekit.io/catholicstories/Guardian_Angel_Activities_Answers_3__-3FACN8K8.png?updatedAt=1688495546612', pdfLink: 'printables/Guardian-Angel-Activities.pdf', thumbnailLink: 'https://ik.imagekit.io/catholicstories/Guardian_Angel_Activity_Cover_1__vNBJQA8Y8.png?updatedAt=1688494259496'},
		isDisabled: false,
		link: '/animations/guardianangel',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: '/assets/images/AnimationImageLinks/PTWA/GuardianAngelPrayer.png',
		title: 'Guardian Angel Prayer',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/03hmpXjV_ck?si=VVADLnsDcTPL0Tm2&loop=1', spanish: '', urdu: 'https://www.youtube.com/embed/uG7xjTRSSaI'},
		videoTitles: {asl: '', english: 'Guardian Angel', spanish: '', urdu: ''}
	},
		{
		about: $author$project$Animations$StMichael$Description$viewAbout,
		activities: {answerPdfLink: '/printables/Saint-Michael-Activity-Answers.pdf', answerThumbnailLink: 'https://ik.imagekit.io/catholicstories/Saint_Michael_Activity_Answers_3__I3WnUgIL6.png?updatedAt=1688495548276', pdfLink: '/printables/Saint-Michael-Activities.pdf', thumbnailLink: 'https://ik.imagekit.io/catholicstories/Saint_Michael_Activity_Cover_J2Qt-zF3t.png?updatedAt=1688494130199'},
		isDisabled: false,
		link: '/animations/prayertimewithangels/1/saintmichaelprayer',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: '/assets/images/AnimationImageLinks/PTWA/StMichaelPrayer.png',
		title: 'Saint Michael Prayer',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/y2-SqI_PLv4?playlist=y2-SqI_PLv4&loop=1', spanish: '', urdu: 'https://www.youtube.com/embed/5ROHimFlar8?si=nlttq8zg2KthJSE1'},
		videoTitles: {asl: '', english: 'St Michael', spanish: '', urdu: 'St Michael'}
	},
		{
		about: $author$project$Animations$ActOfContrition$Description$viewAbout,
		activities: {answerPdfLink: '', answerThumbnailLink: '', pdfLink: '', thumbnailLink: ''},
		isDisabled: false,
		link: '/animations/actofcontrition',
		releaseDate: $elm$time$Time$millisToPosix(1740150000000),
		thumbnail: '/assets/images/AnimationImageLinks/PTWA/AOC.png',
		title: 'Act of Contrition Prayer',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/1i3Dx77eMDc', spanish: '', urdu: ''},
		videoTitles: {asl: '', english: 'Act of Contrition', spanish: '', urdu: ''}
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '', answerThumbnailLink: '', pdfLink: '', thumbnailLink: ''},
		isDisabled: true,
		link: '/animations/prayerbeforemeals',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: '/assets/images/AnimationImageLinks/PTWA/PrayerBeforeMeals.png',
		title: 'Prayer Before Meals',
		videoLinks: {asl: '', english: '', spanish: '', urdu: ''},
		videoTitles: {asl: '', english: 'St Michael', spanish: '', urdu: ''}
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '', answerThumbnailLink: '', pdfLink: '', thumbnailLink: ''},
		isDisabled: true,
		link: '/animations/stanthony',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: '/assets/images/AnimationImageLinks/PTWA/SaintAnthony.png',
		title: 'St Anthony',
		videoLinks: {asl: '', english: '', spanish: '', urdu: ''},
		videoTitles: {asl: '', english: 'St Michael', spanish: '', urdu: ''}
	}
	]);
var $author$project$Animations$PrayerTimeWithAngels$PTWAEpisodes$seasons = _List_fromArray(
	[
		{
		description: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		episodes: $author$project$Animations$PrayerTimeWithAngels$PTWAEpisodes$episodes,
		number: 1
	}
	]);
var $elm$html$Html$br = _VirtualDom_node('br');
var $author$project$Give$Main$donateWithZeffy = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('w-52 m-auto')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$a,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('dbox-donation-page-button m-auto'),
					$elm$html$Html$Attributes$href('https://www.zeffy.com/en-US/donation-form/126e804d-c7a8-4029-b41b-7d0a594a220e'),
					$elm$html$Html$Attributes$target('_blank'),
					A2($elm$html$Html$Attributes$style, 'background', 'rgb(254, 189, 17)'),
					A2($elm$html$Html$Attributes$style, 'color', 'rgb(0, 0, 0)'),
					A2($elm$html$Html$Attributes$style, 'text-decoration', 'none'),
					A2($elm$html$Html$Attributes$style, 'font-family', 'Verdana, sans-serif'),
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'font-size', '18px'),
					A2($elm$html$Html$Attributes$style, 'padding', '14px 34px'),
					A2($elm$html$Html$Attributes$style, 'border-radius', '5px'),
					A2($elm$html$Html$Attributes$style, 'gap', '8px'),
					A2($elm$html$Html$Attributes$style, 'width', 'fit-content'),
					A2($elm$html$Html$Attributes$style, 'line-height', '24px')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('DONATE')
				]))
		]));
var $author$project$Animations$SongsOfTheSaints$SotSEpisodes$carloVideoDescription = A2(
	$elm$html$Html$div,
	_List_Nil,
	_List_fromArray(
		[
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Join Carlo Acutis, to be canonized April 27, in a moment of his life.')
				])),
			A2($elm$html$Html$br, _List_Nil, _List_Nil),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('In this video, we see Carlo turn to prayer when he hits a snag in his website. He turns to one of his favorite saints, Saint Francis. Follow along in song as Carlo prays the famous Prayer of Peace.')
				])),
			A2($elm$html$Html$br, _List_Nil, _List_Nil),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('In the book, '),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('italic')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('My Son Carlo')
						])),
					$elm$html$Html$text(', his mother writes, ')
				])),
			A2(
			$elm$html$Html$blockquote,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$cite(''),
					$elm$html$Html$Attributes$class('my-10'),
					$elm$html$Html$Attributes$class('rounded p-4 my-4 border-l-4 border-gray-300 bg-[#dfe6f7] dark:border-gray-500 dark:bg-gray-800'),
					$elm$html$Html$Attributes$class('italic')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('inline'),
							$elm$html$Html$Attributes$class('text-gray-500 dark:text-gray-400')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('italic')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Websites were his passion. He had created various ones, and one in particular, about Eucharistic miracles, had gained worldwide acclaim. … Creating websites was his way of satisfying his great desire to proclaim the Good News to everyone. He was animated by an irrepressible desire to constantly bring the beauty of the contents of the Christian faith to light.')
								]))
						]))
				])),
			A2($elm$html$Html$br, _List_Nil, _List_Nil),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('She continues,')
				])),
			A2(
			$elm$html$Html$blockquote,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$cite(''),
					$elm$html$Html$Attributes$class('my-10'),
					$elm$html$Html$Attributes$class('rounded p-4 my-4 border-l-4 border-gray-300 bg-[#dfe6f7] dark:border-gray-500 dark:bg-gray-800'),
					$elm$html$Html$Attributes$class('italic')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('inline'),
							$elm$html$Html$Attributes$class('text-gray-500 dark:text-gray-400')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('italic')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Carlo was always an optimist. And even when everything seemed to be falling apart, he never stopped hoping and never gave in to resignation.')
								]))
						]))
				])),
			A2($elm$html$Html$br, _List_Nil, _List_Nil),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Carlo\'s mom relates his spirit to the words of Saint Pope John Paul II, ')
				])),
			A2(
			$elm$html$Html$blockquote,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$cite(''),
					$elm$html$Html$Attributes$class('my-10'),
					$elm$html$Html$Attributes$class('rounded p-4 my-4 border-l-4 border-gray-300 bg-[#dfe6f7] dark:border-gray-500 dark:bg-gray-800'),
					$elm$html$Html$Attributes$class('italic')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('inline'),
							$elm$html$Html$Attributes$class('text-gray-500 dark:text-gray-400')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('italic')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Do not abandon yourselves to despair. We are the Easter people and hallelujah is our song.')
								]))
						]))
				])),
			A2($elm$html$Html$br, _List_Nil, _List_Nil),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('May this animation inspire you to learn more about this incredible soon-to-be-saint. Or maybe even visit his tomb where his body rests in Assisi, Italy. Use this video as inspiration for your next meditative prayer. Carlo’s canonization may not be until April, but you can ask for his intercession any time!')
				])),
			A2($elm$html$Html$br, _List_Nil, _List_Nil),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Also, make sure to check out our sponsor, '),
					A2(
					$elm$html$Html$a,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$href('https://notredamefcu.com/'),
							$elm$html$Html$Attributes$class('underline decoration-sky-500')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Notre Dame Federal Credit Union')
						])),
					$elm$html$Html$text('! We switched from a major bank to this Catholic credit union and love it! We love working with folks who also focus on service to others. They have helped us get our little business up and running smoothly. They also have the '),
					A2(
					$elm$html$Html$a,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$href('https://notredamefcu.com/elevate-fundraising/'),
							$elm$html$Html$Attributes$class('underline decoration-sky-500')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('ELEVATE suite')
						])),
					$elm$html$Html$text(' of fundraising tools to help nonprofits.')
				])),
			A2(
			$elm$html$Html$a,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$href('https://notredamefcu.com/')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$img,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$src('/assets/images/NDFCULogo.png'),
							$elm$html$Html$Attributes$alt('Notre Dame FCU Logo'),
							$elm$html$Html$Attributes$class('bg-white rounded px-8 py-6 mt-4 w-96 mx-auto')
						]),
					_List_Nil)
				])),
			A2($elm$html$Html$br, _List_Nil, _List_Nil),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('In our animation, we take the creative license of having Carlo turn to the prayer of Saint Francis of Assisi. We don’t know of anything written that mentions what Carlo did when he hit a problem with his websites. We know Carlo loved building websites. And we know Carlo faced his struggles with courage, with joy, and through Christ.')
				])),
			A2($elm$html$Html$br, _List_Nil, _List_Nil),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('I want to thank everyone who helped contribute to this video, whether through the creation itself, through donations, or through prayers. We are so grateful for you!')
				])),
			A2($elm$html$Html$br, _List_Nil, _List_Nil),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('I pray this animation and song honors the incredible person of Carlo Acutis.')
				])),
			A2($elm$html$Html$br, _List_Nil, _List_Nil),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('If you would like to see more songs and animation like this, we would like to ask for you to consider helping us by donating, sharing our videos, or praying for us. Thank you!')
				])),
			A2($elm$html$Html$br, _List_Nil, _List_Nil),
			$author$project$Give$Main$donateWithZeffy
		]));
var $author$project$Animations$SongsOfTheSaints$SotSEpisodes$carloEpisode = {
	about: $author$project$Animations$SongsOfTheSaints$SotSEpisodes$carloVideoDescription,
	activities: {answerPdfLink: '', answerThumbnailLink: '', pdfLink: '', thumbnailLink: ''},
	isDisabled: false,
	link: '',
	releaseDate: $elm$time$Time$millisToPosix(1741359600000),
	thumbnail: '/assets/images/AnimationImageLinks/SotsCarlo.png',
	title: 'Carlo Acutis',
	videoLinks: {asl: '', english: 'https://www.youtube.com/embed/Q3X7LFbNzrw', spanish: '', urdu: ''},
	videoTitles: {asl: '', english: 'Carlo Acutis | Songs of the Saints', spanish: '', urdu: ''}
};
var $author$project$Animations$SongsOfTheSaints$SotSEpisodes$thereseVideoDescription = A2(
	$elm$html$Html$div,
	_List_Nil,
	_List_fromArray(
		[
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Join Saint Thérèse of Lisieux, also known as the Little Flower or St. Therese of the Child Jesus, in a moment of her life!')
				])),
			A2($elm$html$Html$br, _List_Nil, _List_Nil),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('In a moment of doubt, she turns to prayer. Follow along as she prays two of the prayers of one of her favorite saints, Saint Theresa of Ávila.')
				])),
			A2($elm$html$Html$br, _List_Nil, _List_Nil),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('This Saint Thérèse of Lisieux animation is meant for kids and adults. This animation may inspire you to begin the Saint Thérèse of Lisieux novena. Or to pray the prayer of The Little Flower. Use this video as inspiration for your next meditative prayer. The feast of Saint Thérèse of Lisieux is October 1st.')
				])),
			A2($elm$html$Html$br, _List_Nil, _List_Nil),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('The series, Songs of the Saints, will let you encounter different saints. Each video opens with the Song of the Saints book. As you enter this book, you enter into an intimate moment in the life of a saint.')
				])),
			A2($elm$html$Html$br, _List_Nil, _List_Nil),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('May this video on these saints inspire you to read their books, The Story of a Soul from St. Thérèse of Lisieux, or one of the many works from Saint Theresa of Ávila, such as The Interior Castle. These Carmelites are sure to capture your heart and bring you to Jesus.')
				])),
			A2($elm$html$Html$br, _List_Nil, _List_Nil),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Also, make sure to check out our sponsor, '),
					A2(
					$elm$html$Html$a,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$href('https://www.allsaintsplay.com/')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('All Saints Play')
						])),
					$elm$html$Html$text('! Joyful resources for Catholic families.')
				])),
			A2($elm$html$Html$br, _List_Nil, _List_Nil),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('In her book, Saint Thérèse of Lisieux writes (translated by Michael Day, Cong., Orat.) after she entered Carmel, ')
				])),
			A2(
			$elm$html$Html$blockquote,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$cite(''),
					$elm$html$Html$Attributes$class('my-10'),
					$elm$html$Html$Attributes$class('rounded p-4 my-4 border-l-4 border-gray-300 bg-[#fde7f4] dark:border-gray-500 dark:bg-gray-800'),
					$elm$html$Html$Attributes$class('italic')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('inline'),
							$elm$html$Html$Attributes$class('text-gray-500 dark:text-gray-400')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('italic')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('My dream was at last realized, and peace flooded my soul, a deep, sweet, inexpressible peace, an inward peace which has been my lot these eight and a half years. It has never left me, not even when trials were at their height. Everything here delighted me, our little cell most of all; it was as though I had been transported to my far-away desert. But my happiness, I must say again, was a calm happiness.')
								]))
						]))
				])),
			A2($elm$html$Html$br, _List_Nil, _List_Nil),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('But, a few hours before her Profession, ')
				])),
			A2(
			$elm$html$Html$blockquote,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$cite(''),
					$elm$html$Html$Attributes$class('my-10'),
					$elm$html$Html$Attributes$class('rounded p-4 my-4 border-l-4 border-gray-300 bg-[#fde7f4] dark:border-gray-500 dark:bg-gray-800'),
					$elm$html$Html$Attributes$class('italic')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('inline'),
							$elm$html$Html$Attributes$class('text-gray-500 dark:text-gray-400')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('italic')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('So deep became my darkness that one fact alone was clear to me - I did not have a religious vocation and must return to the world. My anguish was indescribable. What did one do in such a crisis')
								]))
						]))
				])),
			A2($elm$html$Html$br, _List_Nil, _List_Nil),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('In our video, we take the creative license of having The Little Flower turn to the prayers of Saint Teresa of Ávila. In her book, she turns to the Novice Mistress.')
				])),
			A2($elm$html$Html$br, _List_Nil, _List_Nil),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('She continues, ')
				])),
			A2(
			$elm$html$Html$blockquote,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$cite(''),
					$elm$html$Html$Attributes$class('my-10'),
					$elm$html$Html$Attributes$class('rounded p-4 my-4 border-l-4 border-gray-300 bg-[#fde7f4] dark:border-gray-500 dark:bg-gray-800'),
					$elm$html$Html$Attributes$class('italic')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('inline'),
							$elm$html$Html$Attributes$class('text-gray-500 dark:text-gray-400')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('italic')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('My act of humility acted like a charm in putting the devil to flight. He had hoped to catch me in his toils by getting me to keep my trouble to myself. But it was I who caught him.')
								]))
						]))
				])),
			A2($elm$html$Html$br, _List_Nil, _List_Nil),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('This Little Flower inspired the creation of this song and video, and we pray that the Little Flower inspires you to deepen your life in Christ.')
				])),
			A2($elm$html$Html$br, _List_Nil, _List_Nil),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Here are the full prayers of Saint Teresa of Ávila.')
				])),
			A2($elm$html$Html$br, _List_Nil, _List_Nil),
			A2(
			$elm$html$Html$blockquote,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$cite(''),
					$elm$html$Html$Attributes$class('my-10'),
					$elm$html$Html$Attributes$class('rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800'),
					$elm$html$Html$Attributes$class('italic')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('inline'),
							$elm$html$Html$Attributes$class('text-gray-500 dark:text-gray-400')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('italic')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Let nothing disturb you, Let nothing frighten you, All things are passing away: God never changes. Patience obtains all things. Whoever has God lacks nothing; God alone suffices.')
								]))
						]))
				])),
			A2($elm$html$Html$br, _List_Nil, _List_Nil),
			A2(
			$elm$html$Html$blockquote,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$cite(''),
					$elm$html$Html$Attributes$class('my-10'),
					$elm$html$Html$Attributes$class('rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800'),
					$elm$html$Html$Attributes$class('italic')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('inline'),
							$elm$html$Html$Attributes$class('text-gray-500 dark:text-gray-400')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('italic')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Guided by You Lord, grant that I may always allow myself to be guided by You, always follow Your plans, and perfectly accomplish Your Holy Will. Grant that in all things, great and small, today and all the days of my life, I may do whatever You require of me. Help me respond to the slightest prompting of Your Grace, so that I may be Your trustworthy instrument for Your honour. May Your Will be done in time and in eternity by me, in me, and through me. Amen.')
								]))
						]))
				]))
		]));
var $author$project$Animations$SongsOfTheSaints$SotSEpisodes$stThereseEpisode = {
	about: $author$project$Animations$SongsOfTheSaints$SotSEpisodes$thereseVideoDescription,
	activities: {answerPdfLink: '', answerThumbnailLink: '', pdfLink: '', thumbnailLink: ''},
	isDisabled: false,
	link: '',
	releaseDate: $elm$time$Time$millisToPosix(0),
	thumbnail: '/assets/images/AnimationImageLinks/SotsTherese.png',
	title: 'Saint Thérèse of Lisieux',
	videoLinks: {asl: '', english: 'https://www.youtube.com/embed/_v_285ob5Rc', spanish: '', urdu: ''},
	videoTitles: {asl: '', english: 'Saint Therese | Songs of the Saints', spanish: '', urdu: ''}
};
var $author$project$Animations$SongsOfTheSaints$SotSEpisodes$episodes = _List_fromArray(
	[$author$project$Animations$SongsOfTheSaints$SotSEpisodes$stThereseEpisode, $author$project$Animations$SongsOfTheSaints$SotSEpisodes$carloEpisode]);
var $author$project$Animations$SongsOfTheSaints$SotSEpisodes$seasons = _List_fromArray(
	[
		{
		description: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		episodes: $author$project$Animations$SongsOfTheSaints$SotSEpisodes$episodes,
		number: 1
	}
	]);
var $elm$html$Html$h1 = _VirtualDom_node('h1');
var $author$project$Animations$PrayerTimeWithAngels$PTWAEpisodes$viewBody = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('hcenter')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('hcenter py-5 px-11 max-w-3xl')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$h1,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('leading-10 my-10')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Prayer Time with Angels')
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('my-10')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('my-5')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Join Theo and Felicity as their guardian angels teach and help them understand different Catholic prayers.')
								])),
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('my-5')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('From the prayer before meals to the prayer to their guardian angel to the Hail Mary, ' + 'prayer helps kids grow in their relationship with God and grow in the virtues.')
								])),
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('my-5')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Do you want your children to grow in gratitude? Start with the prayer before meals.' + (' Do you want your children to grow in humility? Start with the Act of Contrition.' + (' Do you want your children to grow in love and charity? Start incorporating intentions for other people into your prayers.' + ' A habit of prayer will help your kid grow into the virtuous person that you will delight to see.')))
								]))
						]))
				]))
		]));
var $elm$html$Html$Attributes$id = $elm$html$Html$Attributes$stringProperty('id');
var $author$project$Animations$DaisyAndSheep$DASEpisodes$viewDescription = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('hcenter py-5 px-11 max-w-3xl')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h1,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('leading-10 my-10'),
					$elm$html$Html$Attributes$id('top')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Daisy and Sheep')
				])),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-10')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('my-5')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Follow along with Daisy and Sheep and learn about the Catholic Mass and fun facts about the Catholic Church!')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('my-5')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Walk step by step through the Mass with these animations. Your kids will start to ' + 'learn each part and become more engaged as they understand what is happening every Sunday!')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('my-5')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Many of the episodes have activities, reflection questions, guided imaginative prayer and more!')
						]))
				]))
		]));
var $author$project$Animations$Productions$productions = _List_fromArray(
	[
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		carouselThumbnail: '/assets/images/CarouselThumbnails/HailMary.png',
		link: '/animations/hailmary',
		seasons: $author$project$Animations$HailMary$HMEpisodes$seasons,
		thumbnail: '/assets/images/AnimationImageLinks/HailMary.png',
		title: 'Hail Mary'
	},
		{about: $author$project$Animations$PrayerTimeWithAngels$PTWAEpisodes$viewBody, carouselThumbnail: '/assets/images/CarouselThumbnails/PrayerTimeWithAngels.png', link: '/animations/prayertimewithangels', seasons: $author$project$Animations$PrayerTimeWithAngels$PTWAEpisodes$seasons, thumbnail: '/assets/images/AnimationImageLinks/PrayerTimeWithAngels.png', title: 'Prayer Time with Angels'},
		{about: $author$project$Animations$DaisyAndSheep$DASEpisodes$viewDescription, carouselThumbnail: '/assets/images/CarouselThumbnails/DaisyAndSheep.png', link: '/animations/daisyandsheep', seasons: $author$project$Animations$DaisyAndSheep$DASEpisodes$seasons, thumbnail: '/assets/images/AnimationImageLinks/DaisyAndSheep.png', title: 'Daisy and Sheep'},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		carouselThumbnail: '/assets/images/CarouselThumbnails/SongsOfTheSaints.png',
		link: '/animations/songsofthesaints',
		seasons: $author$project$Animations$SongsOfTheSaints$SotSEpisodes$seasons,
		thumbnail: '/assets/images/AnimationImageLinks/SongsOfTheSaints.png',
		title: 'Songs of the Saints'
	}
	]);
var $author$project$Animations$Productions$slideshowProductions = A2(
	$elm$core$List$map,
	function (p) {
		return _Utils_Tuple2(p.carouselThumbnail, p.link);
	},
	$author$project$Animations$Productions$productions);
var $elm$time$Time$utc = A2($elm$time$Time$Zone, 0, _List_Nil);
var $author$project$Animations$View$init = F3(
	function (flags, url, key) {
		return _Utils_Tuple2(
			{
				key: key,
				signup: $author$project$Signup$init,
				slideshow: $author$project$Animations$Helpers$Carousel$init($author$project$Animations$Productions$slideshowProductions),
				time: $elm$time$Time$millisToPosix(0),
				timezone: $elm$time$Time$utc,
				url: url,
				videoDetailTab: $author$project$Animations$View$Episodes,
				videoTab: $author$project$Animations$View$English
			},
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						A2($elm$core$Task$perform, $author$project$Animations$View$NewTime, $elm$time$Time$now),
						A2($elm$core$Task$perform, $author$project$Animations$View$NewZone, $elm$time$Time$here)
					])));
	});
var $elm$core$Platform$Cmd$map = _Platform_map;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Main$redirectUrl = function (url) {
	var _v0 = url.query;
	if (_v0.$ === 'Just') {
		var q = _v0.a;
		if (A2($elm$core$String$contains, 'redirect', q)) {
			var newPath = A2($elm$core$String$dropLeft, 9, q);
			return _Utils_Tuple3(
				true,
				newPath,
				_Utils_update(
					url,
					{path: newPath, query: $elm$core$Maybe$Nothing}));
		} else {
			return _Utils_Tuple3(false, '', url);
		}
	} else {
		return _Utils_Tuple3(false, '', url);
	}
};
var $elm$url$Url$addPort = F2(
	function (maybePort, starter) {
		if (maybePort.$ === 'Nothing') {
			return starter;
		} else {
			var port_ = maybePort.a;
			return starter + (':' + $elm$core$String$fromInt(port_));
		}
	});
var $elm$url$Url$addPrefixed = F3(
	function (prefix, maybeSegment, starter) {
		if (maybeSegment.$ === 'Nothing') {
			return starter;
		} else {
			var segment = maybeSegment.a;
			return _Utils_ap(
				starter,
				_Utils_ap(prefix, segment));
		}
	});
var $elm$url$Url$toString = function (url) {
	var http = function () {
		var _v0 = url.protocol;
		if (_v0.$ === 'Http') {
			return 'http://';
		} else {
			return 'https://';
		}
	}();
	return A3(
		$elm$url$Url$addPrefixed,
		'#',
		url.fragment,
		A3(
			$elm$url$Url$addPrefixed,
			'?',
			url.query,
			_Utils_ap(
				A2(
					$elm$url$Url$addPort,
					url.port_,
					_Utils_ap(http, url.host)),
				url.path)));
};
var $author$project$Main$SignupMsg = function (a) {
	return {$: 'SignupMsg', a: a};
};
var $elm$browser$Browser$Navigation$load = _Browser_load;
var $elm$core$Debug$log = _Debug_log;
var $elm$browser$Browser$Navigation$pushUrl = _Browser_pushUrl;
var $author$project$Main$NoOp = {$: 'NoOp'};
var $elm$browser$Browser$Dom$setViewport = _Browser_setViewport;
var $author$project$Main$scrollToTopCmd = A2(
	$elm$core$Task$perform,
	function (_v0) {
		return $author$project$Main$NoOp;
	},
	A2($elm$browser$Browser$Dom$setViewport, 0, 0));
var $author$project$Animations$View$SignupMsg = function (a) {
	return {$: 'SignupMsg', a: a};
};
var $elm$core$Basics$modBy = _Basics_modBy;
var $author$project$Animations$Helpers$Carousel$next = function (carousel) {
	var newIndex = A2(
		$elm$core$Basics$modBy,
		$elm$core$List$length(carousel.items),
		carousel.currentIndex + 1);
	return _Utils_update(
		carousel,
		{currentIndex: newIndex});
};
var $author$project$Animations$Helpers$Carousel$prev = function (carousel) {
	var newIndex = A2(
		$elm$core$Basics$modBy,
		$elm$core$List$length(carousel.items),
		(carousel.currentIndex - 1) + $elm$core$List$length(carousel.items));
	return _Utils_update(
		carousel,
		{currentIndex: newIndex});
};
var $author$project$Animations$View$NoOp = {$: 'NoOp'};
var $author$project$Animations$View$scrollToTopCmd = A2(
	$elm$core$Task$perform,
	function (_v0) {
		return $author$project$Animations$View$NoOp;
	},
	A2($elm$browser$Browser$Dom$setViewport, 0, 0));
var $author$project$Signup$FormSubmitted = function (a) {
	return {$: 'FormSubmitted', a: a};
};
var $elm$http$Http$BadStatus_ = F2(
	function (a, b) {
		return {$: 'BadStatus_', a: a, b: b};
	});
var $elm$http$Http$BadUrl_ = function (a) {
	return {$: 'BadUrl_', a: a};
};
var $elm$http$Http$GoodStatus_ = F2(
	function (a, b) {
		return {$: 'GoodStatus_', a: a, b: b};
	});
var $elm$http$Http$NetworkError_ = {$: 'NetworkError_'};
var $elm$http$Http$Receiving = function (a) {
	return {$: 'Receiving', a: a};
};
var $elm$http$Http$Sending = function (a) {
	return {$: 'Sending', a: a};
};
var $elm$http$Http$Timeout_ = {$: 'Timeout_'};
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$Maybe$isJust = function (maybe) {
	if (maybe.$ === 'Just') {
		return true;
	} else {
		return false;
	}
};
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.e.d.$ === 'RBNode_elm_builtin') && (dict.e.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.d.d.$ === 'RBNode_elm_builtin') && (dict.d.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Black')) {
					if (right.d.$ === 'RBNode_elm_builtin') {
						if (right.d.a.$ === 'Black') {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor.$ === 'Black') {
			if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === 'RBNode_elm_builtin') {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Black')) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === 'RBNode_elm_builtin') {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBNode_elm_builtin') {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === 'RBNode_elm_builtin') {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (_v0.$ === 'Just') {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$http$Http$expectStringResponse = F2(
	function (toMsg, toResult) {
		return A3(
			_Http_expect,
			'',
			$elm$core$Basics$identity,
			A2($elm$core$Basics$composeR, toResult, toMsg));
	});
var $elm$http$Http$BadBody = function (a) {
	return {$: 'BadBody', a: a};
};
var $elm$http$Http$BadStatus = function (a) {
	return {$: 'BadStatus', a: a};
};
var $elm$http$Http$BadUrl = function (a) {
	return {$: 'BadUrl', a: a};
};
var $elm$http$Http$NetworkError = {$: 'NetworkError'};
var $elm$http$Http$Timeout = {$: 'Timeout'};
var $elm$core$Result$mapError = F2(
	function (f, result) {
		if (result.$ === 'Ok') {
			var v = result.a;
			return $elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return $elm$core$Result$Err(
				f(e));
		}
	});
var $elm$http$Http$resolve = F2(
	function (toResult, response) {
		switch (response.$) {
			case 'BadUrl_':
				var url = response.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadUrl(url));
			case 'Timeout_':
				return $elm$core$Result$Err($elm$http$Http$Timeout);
			case 'NetworkError_':
				return $elm$core$Result$Err($elm$http$Http$NetworkError);
			case 'BadStatus_':
				var metadata = response.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadStatus(metadata.statusCode));
			default:
				var body = response.b;
				return A2(
					$elm$core$Result$mapError,
					$elm$http$Http$BadBody,
					toResult(body));
		}
	});
var $elm$http$Http$expectString = function (toMsg) {
	return A2(
		$elm$http$Http$expectStringResponse,
		toMsg,
		$elm$http$Http$resolve($elm$core$Result$Ok));
};
var $author$project$Signup$gtagReportConversion = _Platform_outgoingPort('gtagReportConversion', $elm$json$Json$Encode$string);
var $elm$regex$Regex$Match = F4(
	function (match, index, number, submatches) {
		return {index: index, match: match, number: number, submatches: submatches};
	});
var $elm$regex$Regex$find = _Regex_findAtMost(_Regex_infinity);
var $elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
var $elm$regex$Regex$fromString = function (string) {
	return A2(
		$elm$regex$Regex$fromStringWith,
		{caseInsensitive: false, multiline: false},
		string);
};
var $elm$regex$Regex$never = _Regex_never;
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$Signup$isValidEmail = function (email) {
	var validLength = $elm$core$String$length(email) <= 256;
	var regex = A2(
		$elm$core$Maybe$withDefault,
		$elm$regex$Regex$never,
		$elm$regex$Regex$fromString('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$'));
	var matches = A2($elm$regex$Regex$find, regex, email);
	return ($elm$core$List$length(matches) > 0) && validLength;
};
var $elm$http$Http$jsonBody = function (value) {
	return A2(
		_Http_pair,
		'application/json',
		A2($elm$json$Json$Encode$encode, 0, value));
};
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var $elm$http$Http$Request = function (a) {
	return {$: 'Request', a: a};
};
var $elm$http$Http$State = F2(
	function (reqs, subs) {
		return {reqs: reqs, subs: subs};
	});
var $elm$http$Http$init = $elm$core$Task$succeed(
	A2($elm$http$Http$State, $elm$core$Dict$empty, _List_Nil));
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$http$Http$updateReqs = F3(
	function (router, cmds, reqs) {
		updateReqs:
		while (true) {
			if (!cmds.b) {
				return $elm$core$Task$succeed(reqs);
			} else {
				var cmd = cmds.a;
				var otherCmds = cmds.b;
				if (cmd.$ === 'Cancel') {
					var tracker = cmd.a;
					var _v2 = A2($elm$core$Dict$get, tracker, reqs);
					if (_v2.$ === 'Nothing') {
						var $temp$router = router,
							$temp$cmds = otherCmds,
							$temp$reqs = reqs;
						router = $temp$router;
						cmds = $temp$cmds;
						reqs = $temp$reqs;
						continue updateReqs;
					} else {
						var pid = _v2.a;
						return A2(
							$elm$core$Task$andThen,
							function (_v3) {
								return A3(
									$elm$http$Http$updateReqs,
									router,
									otherCmds,
									A2($elm$core$Dict$remove, tracker, reqs));
							},
							$elm$core$Process$kill(pid));
					}
				} else {
					var req = cmd.a;
					return A2(
						$elm$core$Task$andThen,
						function (pid) {
							var _v4 = req.tracker;
							if (_v4.$ === 'Nothing') {
								return A3($elm$http$Http$updateReqs, router, otherCmds, reqs);
							} else {
								var tracker = _v4.a;
								return A3(
									$elm$http$Http$updateReqs,
									router,
									otherCmds,
									A3($elm$core$Dict$insert, tracker, pid, reqs));
							}
						},
						$elm$core$Process$spawn(
							A3(
								_Http_toTask,
								router,
								$elm$core$Platform$sendToApp(router),
								req)));
				}
			}
		}
	});
var $elm$http$Http$onEffects = F4(
	function (router, cmds, subs, state) {
		return A2(
			$elm$core$Task$andThen,
			function (reqs) {
				return $elm$core$Task$succeed(
					A2($elm$http$Http$State, reqs, subs));
			},
			A3($elm$http$Http$updateReqs, router, cmds, state.reqs));
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (_v0.$ === 'Just') {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$http$Http$maybeSend = F4(
	function (router, desiredTracker, progress, _v0) {
		var actualTracker = _v0.a;
		var toMsg = _v0.b;
		return _Utils_eq(desiredTracker, actualTracker) ? $elm$core$Maybe$Just(
			A2(
				$elm$core$Platform$sendToApp,
				router,
				toMsg(progress))) : $elm$core$Maybe$Nothing;
	});
var $elm$http$Http$onSelfMsg = F3(
	function (router, _v0, state) {
		var tracker = _v0.a;
		var progress = _v0.b;
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$filterMap,
					A3($elm$http$Http$maybeSend, router, tracker, progress),
					state.subs)));
	});
var $elm$http$Http$Cancel = function (a) {
	return {$: 'Cancel', a: a};
};
var $elm$http$Http$cmdMap = F2(
	function (func, cmd) {
		if (cmd.$ === 'Cancel') {
			var tracker = cmd.a;
			return $elm$http$Http$Cancel(tracker);
		} else {
			var r = cmd.a;
			return $elm$http$Http$Request(
				{
					allowCookiesFromOtherDomains: r.allowCookiesFromOtherDomains,
					body: r.body,
					expect: A2(_Http_mapExpect, func, r.expect),
					headers: r.headers,
					method: r.method,
					timeout: r.timeout,
					tracker: r.tracker,
					url: r.url
				});
		}
	});
var $elm$http$Http$MySub = F2(
	function (a, b) {
		return {$: 'MySub', a: a, b: b};
	});
var $elm$http$Http$subMap = F2(
	function (func, _v0) {
		var tracker = _v0.a;
		var toMsg = _v0.b;
		return A2(
			$elm$http$Http$MySub,
			tracker,
			A2($elm$core$Basics$composeR, toMsg, func));
	});
_Platform_effectManagers['Http'] = _Platform_createManager($elm$http$Http$init, $elm$http$Http$onEffects, $elm$http$Http$onSelfMsg, $elm$http$Http$cmdMap, $elm$http$Http$subMap);
var $elm$http$Http$command = _Platform_leaf('Http');
var $elm$http$Http$subscription = _Platform_leaf('Http');
var $elm$http$Http$request = function (r) {
	return $elm$http$Http$command(
		$elm$http$Http$Request(
			{allowCookiesFromOtherDomains: false, body: r.body, expect: r.expect, headers: r.headers, method: r.method, timeout: r.timeout, tracker: r.tracker, url: r.url}));
};
var $elm$http$Http$post = function (r) {
	return $elm$http$Http$request(
		{body: r.body, expect: r.expect, headers: _List_Nil, method: 'POST', timeout: $elm$core$Maybe$Nothing, tracker: $elm$core$Maybe$Nothing, url: r.url});
};
var $author$project$Signup$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'Email':
				var email = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{email: email}),
					$elm$core$Platform$Cmd$none);
			case 'Submit':
				if ($author$project$Signup$isValidEmail(model.email)) {
					var body = $elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'email',
								$elm$json$Json$Encode$string(model.email))
							]));
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{isLoading: true, message: 'Your request is being processed...'}),
						$elm$http$Http$post(
							{
								body: $elm$http$Http$jsonBody(body),
								expect: $elm$http$Http$expectString($author$project$Signup$FormSubmitted),
								url: 'https://api.catholicstoriesforchildren.com/add-contact'
							}));
				} else {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{message: 'Error: Please enter a valid email'}),
						$elm$core$Platform$Cmd$none);
				}
			default:
				if (msg.a.$ === 'Ok') {
					var response = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{isLoading: false, message: 'Email sent!'}),
						$elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[
									$author$project$Signup$gtagReportConversion(''),
									$elm$browser$Browser$Navigation$load('/thankyou')
								])));
				} else {
					var error = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{isLoading: false, message: 'Error: please try again later'}),
						$elm$core$Platform$Cmd$none);
				}
		}
	});
var $author$project$Animations$View$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'LinkClicked':
				var urlRequest = msg.a;
				if (urlRequest.$ === 'Internal') {
					var url = urlRequest.a;
					var urlString = $elm$url$Url$toString(url);
					var isProductionsPage = A2($elm$core$String$contains, 'animations', urlString);
					return isProductionsPage ? _Utils_Tuple2(
						_Utils_update(
							model,
							{url: url}),
						$elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[
									A2(
									$elm$browser$Browser$Navigation$pushUrl,
									model.key,
									$elm$url$Url$toString(url)),
									$author$project$Animations$View$scrollToTopCmd
								]))) : _Utils_Tuple2(
						_Utils_update(
							model,
							{url: url}),
						$elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[
									$elm$browser$Browser$Navigation$load(
									$elm$url$Url$toString(url)),
									$author$project$Animations$View$scrollToTopCmd
								])));
				} else {
					var href = urlRequest.a;
					return _Utils_Tuple2(
						model,
						$elm$browser$Browser$Navigation$load(href));
				}
			case 'UrlChanged':
				var url = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{url: url}),
					A2(
						$elm$core$String$contains,
						'e=',
						$elm$url$Url$toString(url)) ? $author$project$Animations$View$scrollToTopCmd : $author$project$Animations$View$scrollToTopCmd);
			case 'SignupMsg':
				var signupMsg = msg.a;
				var _v2 = A2($author$project$Signup$update, signupMsg, model.signup);
				var signup = _v2.a;
				var cmd = _v2.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{signup: signup}),
					A2($elm$core$Platform$Cmd$map, $author$project$Animations$View$SignupMsg, cmd));
			case 'NextSlide':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							slideshow: $author$project$Animations$Helpers$Carousel$next(model.slideshow)
						}),
					$elm$core$Platform$Cmd$none);
			case 'PrevSlide':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							slideshow: $author$project$Animations$Helpers$Carousel$prev(model.slideshow)
						}),
					$elm$core$Platform$Cmd$none);
			case 'NewTime':
				var t = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{time: t}),
					$elm$core$Platform$Cmd$none);
			case 'NewZone':
				var z = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{timezone: z}),
					$elm$core$Platform$Cmd$none);
			case 'VideoTabClick':
				var language = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{videoTab: language}),
					$elm$core$Platform$Cmd$none);
			case 'VideoDetailsTabClick':
				var tab = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{videoDetailTab: tab}),
					$elm$core$Platform$Cmd$none);
			default:
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Main$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'LinkClicked':
				var urlRequest = msg.a;
				if (urlRequest.$ === 'Internal') {
					var url = urlRequest.a;
					var urlString = $elm$url$Url$toString(url);
					var isProductionsPage = A2(
						$elm$core$Debug$log,
						'isProductionsPage',
						A2($elm$core$String$contains, 'animations', urlString));
					return isProductionsPage ? _Utils_Tuple2(
						_Utils_update(
							model,
							{page: $author$project$Main$Productions, url: url}),
						$elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[
									A2(
									$elm$browser$Browser$Navigation$pushUrl,
									model.key,
									$elm$url$Url$toString(url)),
									$author$project$Main$scrollToTopCmd
								]))) : _Utils_Tuple2(
						model,
						$elm$browser$Browser$Navigation$load(
							$elm$url$Url$toString(url)));
				} else {
					var href = urlRequest.a;
					return _Utils_Tuple2(
						model,
						$elm$browser$Browser$Navigation$load(href));
				}
			case 'UrlChanged':
				var url = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{url: url}),
					$author$project$Main$scrollToTopCmd);
			case 'SignupMsg':
				var signupMsg = msg.a;
				var _v2 = A2($author$project$Signup$update, signupMsg, model.signup);
				var signup = _v2.a;
				var cmd = _v2.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{signup: signup}),
					A2($elm$core$Platform$Cmd$map, $author$project$Main$SignupMsg, cmd));
			case 'NewTime':
				var t = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{time: t}),
					$elm$core$Platform$Cmd$none);
			case 'NewZone':
				var z = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{timezone: z}),
					$elm$core$Platform$Cmd$none);
			case 'LanguageChange':
				var language = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{language: language}),
					$elm$core$Platform$Cmd$none);
			case 'ProductionsMsg':
				var productionsMsg = msg.a;
				var _v3 = A2($author$project$Animations$View$update, productionsMsg, model.productionsModel);
				var updatedProductionsModel = _v3.a;
				var cmd = _v3.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{productionsModel: updatedProductionsModel}),
					A2($elm$core$Platform$Cmd$map, $author$project$Main$ProductionsMsg, cmd));
			default:
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Main$init = F3(
	function (flags, url, key) {
		var urlString = $elm$url$Url$toString(url);
		var isProductionsPage = A2($elm$core$String$contains, 'animations', urlString);
		var _v0 = $author$project$Main$redirectUrl(url);
		var isRedirectedUrl = _v0.a;
		var newPath = _v0.b;
		var redirectedUrl = _v0.c;
		var _v1 = A3($author$project$Animations$View$init, flags, url, key);
		var productionsModel = _v1.a;
		var productionsCmd = _v1.b;
		var initModel = {
			key: key,
			language: $author$project$Main$English,
			page: isProductionsPage ? $author$project$Main$Productions : $author$project$Main$Home,
			productionsModel: productionsModel,
			signup: $author$project$Signup$init,
			time: $elm$time$Time$millisToPosix(0),
			timezone: $elm$time$Time$utc,
			url: redirectedUrl
		};
		var _v2 = isRedirectedUrl ? A2(
			$author$project$Main$update,
			$author$project$Main$LinkClicked(
				$elm$browser$Browser$Internal(redirectedUrl)),
			initModel) : _Utils_Tuple2(initModel, $elm$core$Platform$Cmd$none);
		var redirectedModel = _v2.a;
		var redirectedMsg = _v2.b;
		return _Utils_Tuple2(
			redirectedModel,
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						A2($elm$core$Task$perform, $author$project$Main$NewTime, $elm$time$Time$now),
						A2($elm$core$Task$perform, $author$project$Main$NewZone, $elm$time$Time$here),
						A2($elm$core$Platform$Cmd$map, $author$project$Main$ProductionsMsg, productionsCmd),
						redirectedMsg
					])));
	});
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $author$project$Main$subscriptions = function (_v0) {
	return $elm$core$Platform$Sub$none;
};
var $elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var $elm$html$Html$map = $elm$virtual_dom$VirtualDom$map;
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (maybeValue.$ === 'Just') {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$url$Url$percentEncode = _Url_percentEncode;
var $elm$core$String$filter = _String_filter;
var $author$project$Animations$Helpers$removeSpaces = function (str) {
	return A2(
		$elm$core$String$filter,
		function (c) {
			return !_Utils_eq(
				c,
				_Utils_chr(' '));
		},
		str);
};
var $elm$core$String$toLower = _String_toLower;
var $author$project$Animations$Helpers$stringToURL = function (s) {
	return $elm$url$Url$percentEncode(
		$author$project$Animations$Helpers$removeSpaces(
			$elm$core$String$toLower(s)));
};
var $author$project$Animations$Productions$getProductionFromURLPath = function (production) {
	return $elm$core$List$head(
		A2(
			$elm$core$List$filter,
			function (p) {
				return _Utils_eq(
					production,
					$author$project$Animations$Helpers$stringToURL(p.title));
			},
			$author$project$Animations$Productions$productions));
};
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $author$project$Animations$Productions$getSeasonFromURLPath = F2(
	function (production, season) {
		var mp = $author$project$Animations$Productions$getProductionFromURLPath(production);
		return _Utils_Tuple2(
			mp,
			A2(
				$elm$core$Maybe$andThen,
				$elm$core$List$head,
				A2(
					$elm$core$Maybe$map,
					$elm$core$List$filter(
						function (s) {
							return _Utils_eq(s.number, season);
						}),
					A2(
						$elm$core$Maybe$map,
						function (p) {
							return p.seasons;
						},
						mp))));
	});
var $author$project$Animations$Productions$getEpisodeFromURLPath = F3(
	function (production, season, episode) {
		var _v0 = A2($author$project$Animations$Productions$getSeasonFromURLPath, production, season);
		var mp = _v0.a;
		var ms = _v0.b;
		return _Utils_Tuple3(
			mp,
			ms,
			A2(
				$elm$core$Maybe$andThen,
				$elm$core$List$head,
				A2(
					$elm$core$Maybe$map,
					$elm$core$List$filter(
						function (e) {
							return _Utils_eq(
								episode,
								$author$project$Animations$Helpers$stringToURL(e.title));
						}),
					A2(
						$elm$core$Maybe$map,
						function (p) {
							return p.episodes;
						},
						ms))));
	});
var $author$project$Animations$View$getTitleFromEpisodeRoute = function (r) {
	var _v0 = _Utils_Tuple3(r.production, r.season, r.episode);
	_v0$3:
	while (true) {
		if (_v0.a.$ === 'Just') {
			if (_v0.b.$ === 'Just') {
				if (_v0.c.$ === 'Just') {
					var productionURL = _v0.a.a;
					var seasonURL = _v0.b.a;
					var episodeUrl = _v0.c.a;
					var _v1 = A3($author$project$Animations$Productions$getEpisodeFromURLPath, productionURL, seasonURL, episodeUrl);
					if (((_v1.a.$ === 'Just') && (_v1.b.$ === 'Just')) && (_v1.c.$ === 'Just')) {
						var pageEpisode = _v1.c.a;
						return pageEpisode.title;
					} else {
						return '';
					}
				} else {
					var productionURL = _v0.a.a;
					var seasonURL = _v0.b.a;
					var _v2 = _v0.c;
					var _v3 = A2($author$project$Animations$Productions$getSeasonFromURLPath, productionURL, seasonURL);
					if (_v3.a.$ === 'Just') {
						var production = _v3.a.a;
						return production.title;
					} else {
						return '';
					}
				}
			} else {
				if (_v0.c.$ === 'Nothing') {
					var productionURL = _v0.a.a;
					var _v4 = _v0.b;
					var _v5 = _v0.c;
					var _v6 = $author$project$Animations$Productions$getProductionFromURLPath(productionURL);
					if (_v6.$ === 'Just') {
						var production = _v6.a;
						return production.title;
					} else {
						return '';
					}
				} else {
					break _v0$3;
				}
			}
		} else {
			break _v0$3;
		}
	}
	return '';
};
var $author$project$Animations$View$getTitleFromRoute = function (urlRoute) {
	if (urlRoute.$ === 'Just') {
		var r = urlRoute.a.a;
		return $author$project$Animations$View$getTitleFromEpisodeRoute(r);
	} else {
		return '';
	}
};
var $author$project$Helpers$headerMargin = 10;
var $elm$url$Url$Parser$State = F5(
	function (visited, unvisited, params, frag, value) {
		return {frag: frag, params: params, unvisited: unvisited, value: value, visited: visited};
	});
var $elm$url$Url$Parser$getFirstMatch = function (states) {
	getFirstMatch:
	while (true) {
		if (!states.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			var state = states.a;
			var rest = states.b;
			var _v1 = state.unvisited;
			if (!_v1.b) {
				return $elm$core$Maybe$Just(state.value);
			} else {
				if ((_v1.a === '') && (!_v1.b.b)) {
					return $elm$core$Maybe$Just(state.value);
				} else {
					var $temp$states = rest;
					states = $temp$states;
					continue getFirstMatch;
				}
			}
		}
	}
};
var $elm$url$Url$Parser$removeFinalEmpty = function (segments) {
	if (!segments.b) {
		return _List_Nil;
	} else {
		if ((segments.a === '') && (!segments.b.b)) {
			return _List_Nil;
		} else {
			var segment = segments.a;
			var rest = segments.b;
			return A2(
				$elm$core$List$cons,
				segment,
				$elm$url$Url$Parser$removeFinalEmpty(rest));
		}
	}
};
var $elm$url$Url$Parser$preparePath = function (path) {
	var _v0 = A2($elm$core$String$split, '/', path);
	if (_v0.b && (_v0.a === '')) {
		var segments = _v0.b;
		return $elm$url$Url$Parser$removeFinalEmpty(segments);
	} else {
		var segments = _v0;
		return $elm$url$Url$Parser$removeFinalEmpty(segments);
	}
};
var $elm$url$Url$Parser$addToParametersHelp = F2(
	function (value, maybeList) {
		if (maybeList.$ === 'Nothing') {
			return $elm$core$Maybe$Just(
				_List_fromArray(
					[value]));
		} else {
			var list = maybeList.a;
			return $elm$core$Maybe$Just(
				A2($elm$core$List$cons, value, list));
		}
	});
var $elm$url$Url$percentDecode = _Url_percentDecode;
var $elm$url$Url$Parser$addParam = F2(
	function (segment, dict) {
		var _v0 = A2($elm$core$String$split, '=', segment);
		if ((_v0.b && _v0.b.b) && (!_v0.b.b.b)) {
			var rawKey = _v0.a;
			var _v1 = _v0.b;
			var rawValue = _v1.a;
			var _v2 = $elm$url$Url$percentDecode(rawKey);
			if (_v2.$ === 'Nothing') {
				return dict;
			} else {
				var key = _v2.a;
				var _v3 = $elm$url$Url$percentDecode(rawValue);
				if (_v3.$ === 'Nothing') {
					return dict;
				} else {
					var value = _v3.a;
					return A3(
						$elm$core$Dict$update,
						key,
						$elm$url$Url$Parser$addToParametersHelp(value),
						dict);
				}
			}
		} else {
			return dict;
		}
	});
var $elm$url$Url$Parser$prepareQuery = function (maybeQuery) {
	if (maybeQuery.$ === 'Nothing') {
		return $elm$core$Dict$empty;
	} else {
		var qry = maybeQuery.a;
		return A3(
			$elm$core$List$foldr,
			$elm$url$Url$Parser$addParam,
			$elm$core$Dict$empty,
			A2($elm$core$String$split, '&', qry));
	}
};
var $elm$url$Url$Parser$parse = F2(
	function (_v0, url) {
		var parser = _v0.a;
		return $elm$url$Url$Parser$getFirstMatch(
			parser(
				A5(
					$elm$url$Url$Parser$State,
					_List_Nil,
					$elm$url$Url$Parser$preparePath(url.path),
					$elm$url$Url$Parser$prepareQuery(url.query),
					url.fragment,
					$elm$core$Basics$identity)));
	});
var $author$project$Animations$View$EpisodeRoute = function (a) {
	return {$: 'EpisodeRoute', a: a};
};
var $elm$url$Url$Parser$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var $elm$url$Url$Parser$mapState = F2(
	function (func, _v0) {
		var visited = _v0.visited;
		var unvisited = _v0.unvisited;
		var params = _v0.params;
		var frag = _v0.frag;
		var value = _v0.value;
		return A5(
			$elm$url$Url$Parser$State,
			visited,
			unvisited,
			params,
			frag,
			func(value));
	});
var $elm$url$Url$Parser$map = F2(
	function (subValue, _v0) {
		var parseArg = _v0.a;
		return $elm$url$Url$Parser$Parser(
			function (_v1) {
				var visited = _v1.visited;
				var unvisited = _v1.unvisited;
				var params = _v1.params;
				var frag = _v1.frag;
				var value = _v1.value;
				return A2(
					$elm$core$List$map,
					$elm$url$Url$Parser$mapState(value),
					parseArg(
						A5($elm$url$Url$Parser$State, visited, unvisited, params, frag, subValue)));
			});
	});
var $elm$url$Url$Parser$custom = F2(
	function (tipe, stringToSomething) {
		return $elm$url$Url$Parser$Parser(
			function (_v0) {
				var visited = _v0.visited;
				var unvisited = _v0.unvisited;
				var params = _v0.params;
				var frag = _v0.frag;
				var value = _v0.value;
				if (!unvisited.b) {
					return _List_Nil;
				} else {
					var next = unvisited.a;
					var rest = unvisited.b;
					var _v2 = stringToSomething(next);
					if (_v2.$ === 'Just') {
						var nextValue = _v2.a;
						return _List_fromArray(
							[
								A5(
								$elm$url$Url$Parser$State,
								A2($elm$core$List$cons, next, visited),
								rest,
								params,
								frag,
								value(nextValue))
							]);
					} else {
						return _List_Nil;
					}
				}
			});
	});
var $elm$url$Url$Parser$int = A2($elm$url$Url$Parser$custom, 'NUMBER', $elm$core$String$toInt);
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $elm$url$Url$Parser$oneOf = function (parsers) {
	return $elm$url$Url$Parser$Parser(
		function (state) {
			return A2(
				$elm$core$List$concatMap,
				function (_v0) {
					var parser = _v0.a;
					return parser(state);
				},
				parsers);
		});
};
var $elm$url$Url$Parser$s = function (str) {
	return $elm$url$Url$Parser$Parser(
		function (_v0) {
			var visited = _v0.visited;
			var unvisited = _v0.unvisited;
			var params = _v0.params;
			var frag = _v0.frag;
			var value = _v0.value;
			if (!unvisited.b) {
				return _List_Nil;
			} else {
				var next = unvisited.a;
				var rest = unvisited.b;
				return _Utils_eq(next, str) ? _List_fromArray(
					[
						A5(
						$elm$url$Url$Parser$State,
						A2($elm$core$List$cons, next, visited),
						rest,
						params,
						frag,
						value)
					]) : _List_Nil;
			}
		});
};
var $elm$url$Url$Parser$slash = F2(
	function (_v0, _v1) {
		var parseBefore = _v0.a;
		var parseAfter = _v1.a;
		return $elm$url$Url$Parser$Parser(
			function (state) {
				return A2(
					$elm$core$List$concatMap,
					parseAfter,
					parseBefore(state));
			});
	});
var $elm$url$Url$Parser$string = A2($elm$url$Url$Parser$custom, 'STRING', $elm$core$Maybe$Just);
var $author$project$Animations$View$routeParser = $elm$url$Url$Parser$oneOf(
	_List_fromArray(
		[
			A2(
			$elm$url$Url$Parser$map,
			F3(
				function (p, s, e) {
					return {
						episode: $elm$core$Maybe$Just(e),
						production: $elm$core$Maybe$Just(p),
						season: $elm$core$Maybe$Just(s)
					};
				}),
			A2(
				$elm$url$Url$Parser$slash,
				$elm$url$Url$Parser$s('animations'),
				A2(
					$elm$url$Url$Parser$slash,
					$elm$url$Url$Parser$string,
					A2($elm$url$Url$Parser$slash, $elm$url$Url$Parser$int, $elm$url$Url$Parser$string)))),
			A2(
			$elm$url$Url$Parser$map,
			F2(
				function (p, s) {
					return {
						episode: $elm$core$Maybe$Nothing,
						production: $elm$core$Maybe$Just(p),
						season: $elm$core$Maybe$Just(s)
					};
				}),
			A2(
				$elm$url$Url$Parser$slash,
				$elm$url$Url$Parser$s('animations'),
				A2($elm$url$Url$Parser$slash, $elm$url$Url$Parser$string, $elm$url$Url$Parser$int))),
			A2(
			$elm$url$Url$Parser$map,
			function (p) {
				return {
					episode: $elm$core$Maybe$Nothing,
					production: $elm$core$Maybe$Just(p),
					season: $elm$core$Maybe$Nothing
				};
			},
			A2(
				$elm$url$Url$Parser$slash,
				$elm$url$Url$Parser$s('animations'),
				$elm$url$Url$Parser$string)),
			A2(
			$elm$url$Url$Parser$map,
			{episode: $elm$core$Maybe$Nothing, production: $elm$core$Maybe$Nothing, season: $elm$core$Maybe$Nothing},
			$elm$url$Url$Parser$s('animations'))
		]));
var $author$project$Animations$View$route = A2(
	$elm$url$Url$Parser$map,
	function (e) {
		return $author$project$Animations$View$EpisodeRoute(e);
	},
	$author$project$Animations$View$routeParser);
var $author$project$Animations$View$parseRoute = $elm$url$Url$Parser$parse($author$project$Animations$View$route);
var $author$project$Animations$View$Activities = {$: 'Activities'};
var $author$project$Animations$View$Details = {$: 'Details'};
var $author$project$Animations$Helpers$episodeToThumbnailData = F3(
	function (production, season, episode) {
		return {
			isDisabled: episode.isDisabled,
			link: '/animations/' + ($author$project$Animations$Helpers$stringToURL(production.title) + ('/' + ($elm$core$String$fromInt(season) + ('/' + $author$project$Animations$Helpers$stringToURL(episode.title))))),
			thumbnail: episode.thumbnail,
			title: episode.title
		};
	});
var $elm$core$Basics$not = _Basics_not;
var $author$project$Animations$View$viewAbout = function (episode) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('mt-10 max-w-3xl')
			]),
		_List_fromArray(
			[episode.about]));
};
var $author$project$Animations$View$viewActivities = function (episode) {
	return $elm$core$String$isEmpty(episode.activities.pdfLink) ? A2($elm$html$Html$span, _List_Nil, _List_Nil) : A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h2,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('mb-3 mt-5')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(episode.title + ' Activities')
					])),
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('h-14')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Many of our animations come with activities, reflection questions, guided imaginitive prayer and more!')
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('flex')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$a,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$attribute, 'aria-label', episode.title + ' Activities'),
										$elm$html$Html$Attributes$href(episode.activities.pdfLink),
										$elm$html$Html$Attributes$target('_blank')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$img,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('w-full max-w-[400px]'),
												$elm$html$Html$Attributes$class('transition ease-in-out hover:scale-110'),
												$elm$html$Html$Attributes$src(episode.activities.thumbnailLink)
											]),
										_List_Nil)
									]))
							])),
						(episode.activities.answerPdfLink === '') ? A2($elm$html$Html$span, _List_Nil, _List_Nil) : A2(
						$elm$html$Html$div,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$a,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$attribute, 'aria-label', episode.title + ' Activity Answers'),
										$elm$html$Html$Attributes$href(episode.activities.answerPdfLink),
										$elm$html$Html$Attributes$target('_blank')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$img,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('w-full max-w-[400px]'),
												$elm$html$Html$Attributes$class('transition ease-in-out hover:scale-110'),
												$elm$html$Html$Attributes$src(episode.activities.answerThumbnailLink)
											]),
										_List_Nil)
									]))
							]))
					]))
			]));
};
var $author$project$Animations$Helpers$thumbnailIsActive = F2(
	function (thumbnail, activeEpisode) {
		if (activeEpisode.$ === 'Just') {
			var episode = activeEpisode.a;
			return _Utils_eq(thumbnail.title, episode.title);
		} else {
			return false;
		}
	});
var $author$project$Animations$Helpers$viewAnimationThumbnail = F2(
	function (activeEpisode, thumbnail) {
		var _v0 = thumbnail.isDisabled ? _Utils_Tuple3(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('grayscale hover:cursor-not-allowed')
				]),
			_List_Nil) : (A2($author$project$Animations$Helpers$thumbnailIsActive, thumbnail, activeEpisode) ? _Utils_Tuple3(
			$elm$html$Html$a,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('border-4 border-white-500 p-2')
				])) : _Utils_Tuple3($elm$html$Html$a, _List_Nil, _List_Nil));
		var element = _v0.a;
		var thumbnailStyle = _v0.b;
		var imgStyle = _v0.c;
		return A2(
			element,
			_Utils_ap(
				_List_fromArray(
					[
						$elm$html$Html$Attributes$href(thumbnail.link),
						A2($elm$html$Html$Attributes$attribute, 'aria-label', thumbnail.title + 'Animation'),
						$elm$html$Html$Attributes$class('hover:scale-105 transition ease-out duration-50 drop-shadow-[0_10px_8px_rgb(0,0,0)]')
					]),
				thumbnailStyle),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$img,
					_Utils_ap(
						_List_fromArray(
							[
								$elm$html$Html$Attributes$src(thumbnail.thumbnail),
								A2($elm$html$Html$Attributes$style, 'border-radius', '5px'),
								A2($elm$html$Html$Attributes$style, 'width', '-webkit-fill-available'),
								$elm$html$Html$Attributes$alt(thumbnail.title + ' thumbnail')
							]),
						imgStyle),
					_List_Nil)
				]));
	});
var $author$project$Animations$Helpers$viewAnimationThumbnails = F3(
	function (cols, thumbnails, activeEpisode) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('w-full'),
					$elm$html$Html$Attributes$class('my-20')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('grid grid-cols ' + (cols + ' gap-10'))
						]),
					_Utils_ap(
						A2(
							$elm$core$List$map,
							$author$project$Animations$Helpers$viewAnimationThumbnail(activeEpisode),
							thumbnails),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'clear', 'both'),
										A2($elm$html$Html$Attributes$style, 'width', '1px')
									]),
								_List_Nil)
							])))
				]));
	});
var $author$project$Animations$Helpers$viewAnimationThumbnailsSmall = F2(
	function (activeEpisode, thumbnails) {
		return A3($author$project$Animations$Helpers$viewAnimationThumbnails, 'md:grid-cols-3', thumbnails, activeEpisode);
	});
var $author$project$Animations$Helpers$productionToThumbnailData = function (series) {
	return {
		isDisabled: false,
		link: '/animations/' + $author$project$Animations$Helpers$stringToURL(series.title),
		thumbnail: series.thumbnail,
		title: series.title
	};
};
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $author$project$Animations$View$viewSuggestedProductions = function (currentProduction) {
	var suggestedProductions = A2(
		$elm$core$List$take,
		5,
		A2(
			$elm$core$List$filter,
			function (p) {
				return !_Utils_eq(p.link, currentProduction.link);
			},
			$author$project$Animations$Productions$productions));
	return A2(
		$author$project$Animations$Helpers$viewAnimationThumbnailsSmall,
		$elm$core$Maybe$Nothing,
		A2($elm$core$List$map, $author$project$Animations$Helpers$productionToThumbnailData, suggestedProductions));
};
var $author$project$Animations$View$Suggested = {$: 'Suggested'};
var $author$project$Animations$View$VideoDetailsTabClick = function (a) {
	return {$: 'VideoDetailsTabClick', a: a};
};
var $elm$html$Html$button = _VirtualDom_node('button');
var $elm$html$Html$li = _VirtualDom_node('li');
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$ul = _VirtualDom_node('ul');
var $author$project$Animations$View$viewVideoDetailTabs = F3(
	function (episodeCount, model, episode) {
		var selectedClass = 'active text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500';
		var nonSelectedClass = 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300';
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-xl font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$ul,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('flex flex-wrap -mb-px')
						]),
					_List_fromArray(
						[
							(episodeCount === 1) ? A2($elm$html$Html$span, _List_Nil, _List_Nil) : A2(
							$elm$html$Html$li,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('mr-2')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$button,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class(
											'inline-block p-4 border-b-2 rounded-t-lg ' + (_Utils_eq(model.videoDetailTab, $author$project$Animations$View$Episodes) ? selectedClass : nonSelectedClass)),
											$elm$html$Html$Events$onClick(
											$author$project$Animations$View$VideoDetailsTabClick($author$project$Animations$View$Episodes))
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Episodes')
										]))
								])),
							$elm$core$String$isEmpty(episode.activities.thumbnailLink) ? A2($elm$html$Html$span, _List_Nil, _List_Nil) : A2(
							$elm$html$Html$li,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('mr-2')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$button,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class(
											'inline-block p-4 border-b-2 rounded-t-lg ' + (_Utils_eq(model.videoDetailTab, $author$project$Animations$View$Activities) ? selectedClass : nonSelectedClass)),
											$elm$html$Html$Events$onClick(
											$author$project$Animations$View$VideoDetailsTabClick($author$project$Animations$View$Activities))
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Activities')
										]))
								])),
							A2(
							$elm$html$Html$li,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('mr-2')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$button,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class(
											'inline-block p-4 border-b-2 rounded-t-lg ' + (_Utils_eq(model.videoDetailTab, $author$project$Animations$View$Details) ? selectedClass : nonSelectedClass)),
											$elm$html$Html$Events$onClick(
											$author$project$Animations$View$VideoDetailsTabClick($author$project$Animations$View$Details))
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Details')
										]))
								])),
							A2(
							$elm$html$Html$li,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('mr-2')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$button,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class(
											'inline-block p-4 border-b-2 rounded-t-lg ' + (_Utils_eq(model.videoDetailTab, $author$project$Animations$View$Suggested) ? selectedClass : nonSelectedClass)),
											$elm$html$Html$Events$onClick(
											$author$project$Animations$View$VideoDetailsTabClick($author$project$Animations$View$Suggested))
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Suggested')
										]))
								]))
						]))
				]));
	});
var $elm$virtual_dom$VirtualDom$property = F2(
	function (key, value) {
		return A2(
			_VirtualDom_property,
			_VirtualDom_noInnerHtmlOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $elm$html$Html$Attributes$property = $elm$virtual_dom$VirtualDom$property;
var $elm$html$Html$Attributes$title = $elm$html$Html$Attributes$stringProperty('title');
var $author$project$Animations$Helpers$viewVideo = F2(
	function (videoTitle, link) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'position', 'relative'),
					A2($elm$html$Html$Attributes$style, 'padding-bottom', '56.25%'),
					$elm$html$Html$Attributes$height(0),
					A2($elm$html$Html$Attributes$style, 'overflow', 'hidden'),
					A2($elm$html$Html$Attributes$style, 'max-width', '100%'),
					A2($elm$html$Html$Attributes$style, 'border-radius', '5px')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$iframe,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'width', '100%'),
							A2($elm$html$Html$Attributes$style, 'height', '100%'),
							A2($elm$html$Html$Attributes$style, 'top', '0'),
							A2($elm$html$Html$Attributes$style, 'left', '0'),
							$elm$html$Html$Attributes$src(link),
							$elm$html$Html$Attributes$title(videoTitle),
							A2(
							$elm$html$Html$Attributes$property,
							'frameborder',
							$elm$json$Json$Encode$string('0')),
							A2(
							$elm$html$Html$Attributes$property,
							'allow',
							$elm$json$Json$Encode$string('accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture')),
							A2(
							$elm$html$Html$Attributes$property,
							'allowfullscreen',
							$elm$json$Json$Encode$string('true'))
						]),
					_List_Nil)
				]));
	});
var $author$project$Animations$View$Asl = {$: 'Asl'};
var $author$project$Animations$View$Spanish = {$: 'Spanish'};
var $author$project$Animations$View$Urdu = {$: 'Urdu'};
var $author$project$Animations$View$VideoTabClick = function (a) {
	return {$: 'VideoTabClick', a: a};
};
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$json$Json$Decode$string = _Json_decodeString;
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $elm$html$Html$option = _VirtualDom_node('option');
var $elm$html$Html$select = _VirtualDom_node('select');
var $elm$json$Json$Encode$bool = _Json_wrap;
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$selected = $elm$html$Html$Attributes$boolProperty('selected');
var $author$project$Animations$View$toLanguageName = function (option) {
	switch (option.$) {
		case 'English':
			return 'English';
		case 'Spanish':
			return 'Spanish';
		case 'Urdu':
			return 'Urdu';
		default:
			return 'ASL';
	}
};
var $author$project$Animations$View$toString = function (option) {
	switch (option.$) {
		case 'English':
			return 'english';
		case 'Spanish':
			return 'spanish';
		case 'Urdu':
			return 'urdu';
		default:
			return 'asl';
	}
};
var $author$project$Animations$View$toVideoOption = function (str) {
	switch (str) {
		case 'english':
			return $author$project$Animations$View$English;
		case 'spanish':
			return $author$project$Animations$View$Spanish;
		case 'urdu':
			return $author$project$Animations$View$Urdu;
		case 'asl':
			return $author$project$Animations$View$Asl;
		default:
			return $author$project$Animations$View$English;
	}
};
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $author$project$Animations$View$viewVideoPlayerTabs = F2(
	function (model, page) {
		var availableLanguages = A2(
			$elm$core$List$filter,
			function (_v1) {
				var link = _v1.b;
				return !$elm$core$String$isEmpty(link);
			},
			_List_fromArray(
				[
					_Utils_Tuple2($author$project$Animations$View$English, page.videoLinks.english),
					_Utils_Tuple2($author$project$Animations$View$Spanish, page.videoLinks.spanish),
					_Utils_Tuple2($author$project$Animations$View$Urdu, page.videoLinks.urdu),
					_Utils_Tuple2($author$project$Animations$View$Asl, page.videoLinks.asl)
				]));
		return ($elm$core$List$length(availableLanguages) <= 1) ? A2($elm$html$Html$span, _List_Nil, _List_Nil) : A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-lg text-end text-gray-500 dark:text-gray-400')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$select,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('bg-transparent rounded-lg'),
							$elm$html$Html$Events$onInput(
							A2(
								$elm$core$Basics$composeR,
								$elm$core$String$toLower,
								A2($elm$core$Basics$composeR, $author$project$Animations$View$toVideoOption, $author$project$Animations$View$VideoTabClick)))
						]),
					A2(
						$elm$core$List$map,
						function (_v0) {
							var language = _v0.a;
							return A2(
								$elm$html$Html$option,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$value(
										$author$project$Animations$View$toString(language)),
										$elm$html$Html$Attributes$selected(
										_Utils_eq(model.videoTab, language))
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(
										$author$project$Animations$View$toLanguageName(language))
									]));
						},
						availableLanguages))
				]));
	});
var $author$project$Animations$View$viewVideoPlayers = F2(
	function (model, page) {
		return A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					function () {
					var _v0 = model.videoTab;
					switch (_v0.$) {
						case 'English':
							return A2($author$project$Animations$Helpers$viewVideo, page.videoTitles.english, page.videoLinks.english);
						case 'Spanish':
							return $elm$core$String$isEmpty(page.videoLinks.spanish) ? A2($author$project$Animations$Helpers$viewVideo, page.videoTitles.english, page.videoLinks.english) : A2($author$project$Animations$Helpers$viewVideo, page.videoTitles.spanish, page.videoLinks.spanish);
						case 'Asl':
							return $elm$core$String$isEmpty(page.videoLinks.asl) ? A2($author$project$Animations$Helpers$viewVideo, page.videoTitles.english, page.videoLinks.english) : A2($author$project$Animations$Helpers$viewVideo, page.videoTitles.asl, page.videoLinks.asl);
						default:
							return $elm$core$String$isEmpty(page.videoLinks.urdu) ? A2($author$project$Animations$Helpers$viewVideo, page.videoTitles.english, page.videoLinks.english) : A2($author$project$Animations$Helpers$viewVideo, page.videoTitles.urdu, page.videoLinks.urdu);
					}
				}(),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('flex justify-end items-center gap-4 mt-2')
						]),
					_List_fromArray(
						[
							A2($author$project$Animations$View$viewVideoPlayerTabs, model, page),
							A2(
							$elm$html$Html$a,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition'),
									$elm$html$Html$Attributes$href('https://www.zeffy.com/en-US/donation-form/126e804d-c7a8-4029-b41b-7d0a594a220e'),
									$elm$html$Html$Attributes$target('_blank')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Donate')
								]))
						]))
				]));
	});
var $author$project$Animations$View$viewEpisode = F4(
	function (model, production, season, episode) {
		var episodeCount = $elm$core$List$length(
			$elm$core$List$concat(
				A2(
					$elm$core$List$map,
					function ($) {
						return $.episodes;
					},
					production.seasons)));
		var newModel = function () {
			var _v9 = _Utils_Tuple3(
				episodeCount,
				model.videoDetailTab,
				$elm$core$String$isEmpty(episode.activities.pdfLink));
			if ((_v9.a === 1) && (_v9.b.$ === 'Episodes')) {
				if (!_v9.c) {
					var _v10 = _v9.b;
					return _Utils_update(
						model,
						{videoDetailTab: $author$project$Animations$View$Activities});
				} else {
					var _v11 = _v9.b;
					return _Utils_update(
						model,
						{videoDetailTab: $author$project$Animations$View$Details});
				}
			} else {
				return model;
			}
		}();
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('m-auto'),
					$elm$html$Html$Attributes$class('py-5 px-11'),
					$elm$html$Html$Attributes$class('mb-10'),
					$elm$html$Html$Attributes$class('max-w-7xl')
				]),
			_List_fromArray(
				[
					A2($author$project$Animations$View$viewVideoPlayers, newModel, episode),
					A3($author$project$Animations$View$viewVideoDetailTabs, episodeCount, newModel, episode),
					function () {
					var _v3 = newModel.videoDetailTab;
					switch (_v3.$) {
						case 'Episodes':
							return (episodeCount > 1) ? A4(
								$author$project$Animations$View$viewEpisodes,
								newModel,
								production,
								season,
								$elm$core$Maybe$Just(episode)) : ((!$elm$core$String$isEmpty(episode.activities.pdfLink)) ? A2(
								$elm$html$Html$map,
								function (_v4) {
									return $author$project$Animations$View$NoOp;
								},
								$author$project$Animations$View$viewActivities(episode)) : A2(
								$elm$html$Html$map,
								function (_v5) {
									return $author$project$Animations$View$NoOp;
								},
								$author$project$Animations$View$viewAbout(episode)));
						case 'Activities':
							return A2(
								$elm$html$Html$map,
								function (_v6) {
									return $author$project$Animations$View$NoOp;
								},
								$author$project$Animations$View$viewActivities(episode));
						case 'Details':
							return A2(
								$elm$html$Html$map,
								function (_v7) {
									return $author$project$Animations$View$NoOp;
								},
								$author$project$Animations$View$viewAbout(episode));
						default:
							return A2(
								$elm$html$Html$map,
								function (_v8) {
									return $author$project$Animations$View$NoOp;
								},
								$author$project$Animations$View$viewSuggestedProductions(production));
					}
				}()
				]));
	});
var $author$project$Animations$View$viewEpisodes = F4(
	function (model, production, season, activeEpisode) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('hcenter')
				]),
			_List_fromArray(
				[
					function () {
					var episodes = $elm$core$List$concat(
						A2(
							$elm$core$List$map,
							function ($) {
								return $.episodes;
							},
							production.seasons));
					var firstEpisode = $elm$core$List$head(episodes);
					var episodeThumbnails = A2(
						$elm$core$List$map,
						A2($author$project$Animations$Helpers$episodeToThumbnailData, production, season),
						episodes);
					if ($elm$core$List$length(episodes) === 1) {
						if (firstEpisode.$ === 'Just') {
							var e = firstEpisode.a;
							return A4($author$project$Animations$View$viewEpisode, model, production, season, e);
						} else {
							return A2(
								$elm$html$Html$map,
								function (_v1) {
									return $author$project$Animations$View$NoOp;
								},
								A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('m-auto max-w-7xl')
										]),
									_List_fromArray(
										[
											A2($author$project$Animations$Helpers$viewAnimationThumbnailsSmall, activeEpisode, episodeThumbnails)
										])));
						}
					} else {
						return A2(
							$elm$html$Html$map,
							function (_v2) {
								return $author$project$Animations$View$NoOp;
							},
							A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('m-auto max-w-7xl')
									]),
								_List_fromArray(
									[
										A2($author$project$Animations$Helpers$viewAnimationThumbnailsSmall, activeEpisode, episodeThumbnails)
									])));
					}
				}()
				]));
	});
var $author$project$Animations$Helpers$viewAnimationThumbnailsLarge = function (thumbnails) {
	return A3($author$project$Animations$Helpers$viewAnimationThumbnails, 'lg:grid-cols-2', thumbnails, $elm$core$Maybe$Nothing);
};
var $author$project$Animations$View$viewProductions = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('hcenter')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('hcenter py-5 px-11 max-w-7xl')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$h2,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('mb-10 text-7xl')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Start teaching your children with Catholic animations')
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('my-10')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$p,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('leading-10')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Catholic Stories for Children is a nonprofit aimed at telling short stories, primarily through animation, to help parents teach Catholic prayers, about Catholic saints, and other Catholic concepts.')
									])),
								A2(
								$elm$html$Html$p,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('my-5')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Use these animations to help your kids build a habit of prayer.')
									])),
								A2(
								$elm$html$Html$p,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('my-5')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('From the prayer before meals to the prayer to their guardian angel to the Hail Mary, ' + 'prayer helps kids grow in their relationship with God and grow in the virtues.')
									])),
								A2(
								$elm$html$Html$p,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('my-5')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Do you want your children to grow in gratitude? Start with the prayer before meals.' + (' Do you want your children to grow in humility? Start with the Act of Contrition.' + (' Do you want your children to grow in love and charity? Start incorporating intentions for other people into your prayers.' + ' A habit of prayer will help your kid grow into the virtuous person that you will delight to see.')))
									]))
							]))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('mt-2 mb-20 text-black')
					]),
				_List_fromArray(
					[
						A2($elm$html$Html$map, $author$project$Animations$View$SignupMsg, $author$project$Signup$view4)
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('m-auto max-w-7xl')
					]),
				_List_fromArray(
					[
						$author$project$Animations$Helpers$viewAnimationThumbnailsLarge(
						A2($elm$core$List$map, $author$project$Animations$Helpers$productionToThumbnailData, $author$project$Animations$Productions$productions))
					]))
			]));
};
var $author$project$Animations$View$viewProductionEpisodes = F2(
	function (model, productionURL) {
		var _v0 = $author$project$Animations$Productions$getProductionFromURLPath(productionURL);
		if (_v0.$ === 'Just') {
			var production = _v0.a;
			var pageEpisode = A2(
				$elm$core$Maybe$andThen,
				$elm$core$List$head,
				A2(
					$elm$core$Maybe$map,
					function ($) {
						return $.episodes;
					},
					$elm$core$List$head(production.seasons)));
			if (pageEpisode.$ === 'Just') {
				var e = pageEpisode.a;
				return A4($author$project$Animations$View$viewEpisode, model, production, 1, e);
			} else {
				return A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$img,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$src(production.carouselThumbnail)
								]),
							_List_Nil),
							A4($author$project$Animations$View$viewEpisodes, model, production, 1, $elm$core$Maybe$Nothing)
						]));
			}
		} else {
			return $author$project$Animations$View$viewProductions(model);
		}
	});
var $author$project$Animations$View$viewSeasonEpisodes = F3(
	function (model, productionURL, seasonURL) {
		var _v0 = A2($author$project$Animations$Productions$getSeasonFromURLPath, productionURL, seasonURL);
		if ((_v0.a.$ === 'Just') && (_v0.b.$ === 'Just')) {
			var production = _v0.a.a;
			var season = _v0.b.a;
			var pageEpisode = $elm$core$List$head(season.episodes);
			if (pageEpisode.$ === 'Just') {
				var e = pageEpisode.a;
				return A4($author$project$Animations$View$viewEpisode, model, production, season.number, e);
			} else {
				return A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$img,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$src(production.carouselThumbnail)
								]),
							_List_Nil),
							A4($author$project$Animations$View$viewEpisodes, model, production, season.number, $elm$core$Maybe$Nothing)
						]));
			}
		} else {
			return $author$project$Animations$View$viewProductions(model);
		}
	});
var $author$project$Animations$View$viewSpecificEpisode = F4(
	function (model, productionURL, seasonURL, episodeUrl) {
		var _v0 = A3($author$project$Animations$Productions$getEpisodeFromURLPath, productionURL, seasonURL, episodeUrl);
		if (((_v0.a.$ === 'Just') && (_v0.b.$ === 'Just')) && (_v0.c.$ === 'Just')) {
			var production = _v0.a.a;
			var season = _v0.b.a;
			var pageEpisode = _v0.c.a;
			return A4($author$project$Animations$View$viewEpisode, model, production, season.number, pageEpisode);
		} else {
			return $author$project$Animations$View$viewProductions(model);
		}
	});
var $author$project$Animations$View$viewEpisodeRoute = F2(
	function (model, r) {
		var _v0 = _Utils_Tuple3(r.production, r.season, r.episode);
		_v0$3:
		while (true) {
			if (_v0.a.$ === 'Just') {
				if (_v0.b.$ === 'Just') {
					if (_v0.c.$ === 'Just') {
						var productionURL = _v0.a.a;
						var seasonURL = _v0.b.a;
						var episodeUrl = _v0.c.a;
						return A4($author$project$Animations$View$viewSpecificEpisode, model, productionURL, seasonURL, episodeUrl);
					} else {
						var productionURL = _v0.a.a;
						var seasonURL = _v0.b.a;
						var _v1 = _v0.c;
						return A3($author$project$Animations$View$viewSeasonEpisodes, model, productionURL, seasonURL);
					}
				} else {
					if (_v0.c.$ === 'Nothing') {
						var productionURL = _v0.a.a;
						var _v2 = _v0.b;
						var _v3 = _v0.c;
						return A2($author$project$Animations$View$viewProductionEpisodes, model, productionURL);
					} else {
						break _v0$3;
					}
				}
			} else {
				break _v0$3;
			}
		}
		return $author$project$Animations$View$viewProductions(model);
	});
var $author$project$Animations$View$viewBody = F2(
	function (model, urlRoute) {
		if (urlRoute.$ === 'Just') {
			var r = urlRoute.a.a;
			return A2($author$project$Animations$View$viewEpisodeRoute, model, r);
		} else {
			return $author$project$Animations$View$viewProductions(model);
		}
	});
var $author$project$Footer$socialLink = F5(
	function (link, label, imgSrc, imgAlt, txt) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('flex align-center')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$a,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$href(link),
							A2($elm$html$Html$Attributes$attribute, 'aria-label', label),
							$elm$html$Html$Attributes$target('_blank'),
							$elm$html$Html$Attributes$class('mb-5')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$img,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('w-5 h-5 inline-block'),
									$elm$html$Html$Attributes$src(imgSrc),
									$elm$html$Html$Attributes$alt(imgAlt)
								]),
							_List_Nil),
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('ml-3')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(txt)
								]))
						]))
				]));
	});
var $author$project$Footer$facebook = A5($author$project$Footer$socialLink, 'https://www.facebook.com/catholicstoriesforchildren', 'CSC Facebook Page', 'https://ik.imagekit.io/catholicstories/f_logo_RGB-Blue_250_3vs-yhXer.png?updatedAt=1684277030198', 'Facebook', 'Facebook');
var $elm$html$Html$footer = _VirtualDom_node('footer');
var $author$project$Footer$instagram = A5($author$project$Footer$socialLink, 'https://www.instagram.com/catholicstoriesforchildren/', 'CSC Instagram Page', 'https://ik.imagekit.io/catholicstories/Instagram_Glyph_Gradient_kFoMs9jIr.png?updatedAt=1684277127293', 'Instagram', 'Instagram');
var $author$project$Footer$toPx = function (x) {
	return $elm$core$String$fromInt(x) + 'px';
};
var $author$project$Signup$view2 = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('mb-5 bg-white text-black')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('pb-2 pt-4 pl-1 m-auto text-center max-w-7xl')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Receive free animations, activities, resources, and more!')
				])),
			A2(
			$elm$html$Html$iframe,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$src('https://blog.catholicstoriesforchildren.com/embed'),
					$elm$html$Html$Attributes$height(150),
					$elm$html$Html$Attributes$class('w-screen'),
					A2($elm$html$Html$Attributes$attribute, 'frameborder', '0'),
					A2($elm$html$Html$Attributes$attribute, 'scrolling', 'no'),
					A2($elm$html$Html$Attributes$style, 'margin', '0'),
					A2($elm$html$Html$Attributes$style, 'border-radius', '5px !important'),
					A2($elm$html$Html$Attributes$style, 'background-color', 'transparent')
				]),
			_List_Nil)
		]));
var $author$project$Footer$viewFooter = A2(
	$elm$html$Html$footer,
	_List_fromArray(
		[
			A2(
			$elm$html$Html$Attributes$style,
			'padding',
			$author$project$Footer$toPx(30))
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-center mb-5')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$h2,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('mb-7')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Access Free Animations')
										]))
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-center grid justify-center mb-10')
								]),
							_List_fromArray(
								[$author$project$Signup$view2]))
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('md:grid md:grid-cols-3 md:justify-items-center')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-left')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$elm$html$Html$h3,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('font-bold text-lg')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('About Us')
												]))
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('mb-3')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Catholic Stories for Children is a nonprofit aimed at telling short stories, primarily through animation, to help parents teach Catholic prayers, about Catholic saints, and other Catholic concepts.')
										]))
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('md:mx-5')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$a,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$href('/')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$img,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('rounded max-w-[16rem]'),
													$elm$html$Html$Attributes$src('/assets/FullTitle_900x900_NoBackground.png')
												]),
											_List_Nil)
										]))
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-left')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$elm$html$Html$h3,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('font-bold text-lg mb-3')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('Follow Us')
												]))
										])),
									A2(
									$elm$html$Html$div,
									_List_Nil,
									_List_fromArray(
										[$author$project$Footer$instagram, $author$project$Footer$facebook]))
								]))
						]))
				])),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-xs')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('Copyright © 2024 Catholic Stories for Children. All rights reserved.')
						])),
					A2(
					$elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('Catholic Stories for Children is a 501(c)(3) non-profit recognized by the IRS. Contributions to Catholic Stories for Children are tax-deductible to the extent permitted by law.  Tax ID Number: 85-4194883')
						])),
					A2(
					$elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$a,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$href('/about/privacy-policy'),
									$elm$html$Html$Attributes$class('underline')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Privacy Policy')
								])),
							A2(
							$elm$html$Html$span,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text(' | ')
								])),
							A2(
							$elm$html$Html$a,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$href('/about/terms-and-conditions'),
									$elm$html$Html$Attributes$class('underline')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Terms & Conditions')
								]))
						]))
				]))
		]));
var $elm$html$Html$header = _VirtualDom_node('header');
var $elm$html$Html$nav = _VirtualDom_node('nav');
var $author$project$Header$viewNavButton = F4(
	function (height, link, linkTarget, page) {
		return A2(
			$elm$html$Html$a,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$href(link),
					$elm$html$Html$Attributes$class('flex items-center justify-center'),
					$elm$html$Html$Attributes$class('hover:scale-105 transition ease-in-out'),
					$elm$html$Html$Attributes$class('hover:border-b-4 hover:border-[#9101b3]'),
					$elm$html$Html$Attributes$class('rounded'),
					$elm$html$Html$Attributes$class('h-[60px] h-[' + (height + ']')),
					$elm$html$Html$Attributes$class('p-2'),
					A2($elm$html$Html$Attributes$attribute, 'aria-label', page),
					$elm$html$Html$Attributes$target(linkTarget)
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(page)
				]));
	});
var $author$project$Header$desktopNavigation = function (height) {
	return A2(
		$elm$html$Html$nav,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('h-full w-full flex justify-end content-center justify-items-center gap-4 mr-4'),
				$elm$html$Html$Attributes$class('text-lg')
			]),
		_List_fromArray(
			[
				A4($author$project$Header$viewNavButton, height, '/feastdayactivities', '_self', 'Calendar'),
				A4($author$project$Header$viewNavButton, height, '/saints', '_self', 'Saints'),
				A4($author$project$Header$viewNavButton, height, '/animations', '_self', 'Animations'),
				A4($author$project$Header$viewNavButton, height, '/resources', '_self', 'Resources'),
				A4($author$project$Header$viewNavButton, height, '/shop', '_self', 'Shop'),
				A4($author$project$Header$viewNavButton, height, 'https://blog.catholicstoriesforchildren.com/', '_blank', 'Blog'),
				A4($author$project$Header$viewNavButton, height, '/give', '_self', 'Donate'),
				A4($author$project$Header$viewNavButton, height, '/team', '_self', 'About')
			]));
};
var $author$project$Header$hamburgerMenu = A2(
	$elm$html$Html$a,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$href('/navigation'),
			$elm$html$Html$Attributes$class('space-y-2'),
			A2($elm$html$Html$Attributes$attribute, 'aria-label', 'menu')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('w-8 h-0.5 m-auto bg-white')
				]),
			_List_Nil),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('w-8 h-0.5 m-auto bg-white')
				]),
			_List_Nil),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('w-8 h-0.5 m-auto bg-white')
				]),
			_List_Nil)
		]));
var $author$project$Header$navigation = function (height) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('w-full pr-2')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('lg:hidden')
					]),
				_List_fromArray(
					[$author$project$Header$hamburgerMenu])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('hidden lg:block w-full')
					]),
				_List_fromArray(
					[
						$author$project$Header$desktopNavigation(height)
					]))
			]));
};
var $author$project$Header$viewBanner = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('bg-[#9101b3] text-white text-center text-lg py-2')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$a,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$href('https://www.zeffy.com/en-US/donation-form/126e804d-c7a8-4029-b41b-7d0a594a220e')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Keep Catholic Stories going - ')
								])),
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('underline')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Donate now.')
								]))
						])),
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('Bring loving and faithful animations to families today.')
						]))
				]))
		]));
var $author$project$Header$viewHeaderTitle = F2(
	function (includesLinks, title) {
		var _v0 = includesLinks ? _Utils_Tuple2('text-[0px] md:text-xl', 'invisible md:visible') : _Utils_Tuple2('text-lg md:text-xl', '');
		var textClass = _v0.a;
		var visibleClass = _v0.b;
		return A2(
			$elm$html$Html$a,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'text-decoration', 'none'),
					$elm$html$Html$Attributes$class('colorDarkGray'),
					$elm$html$Html$Attributes$class(visibleClass),
					$elm$html$Html$Attributes$class('justify-self-start'),
					$elm$html$Html$Attributes$href('/')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$h1,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'font-family', 'hvdComicSerifPro'),
							A2($elm$html$Html$Attributes$style, 'margin', '0px'),
							$elm$html$Html$Attributes$class('text-white'),
							$elm$html$Html$Attributes$class(textClass)
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Catholic Stories for Children')
						]))
				]));
	});
var $author$project$Logo$logo = A2(
	$elm$html$Html$img,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$src('/assets/logo_solid.svg'),
			A2($elm$html$Html$Attributes$style, 'height', '30px'),
			$elm$html$Html$Attributes$alt(''),
			A2($elm$html$Html$Attributes$style, 'vertical-align', 'middle')
		]),
	_List_Nil);
var $author$project$Header$viewLogo = A2(
	$elm$html$Html$a,
	_List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'text-decoration', 'none'),
			$elm$html$Html$Attributes$class('colorDarkGray'),
			$elm$html$Html$Attributes$href('/'),
			A2($elm$html$Html$Attributes$attribute, 'aria-label', 'home')
		]),
	_List_fromArray(
		[$author$project$Logo$logo]));
var $author$project$Header$viewSubpageHeader = F2(
	function (currentPage, leftMargin) {
		var isHomePage = currentPage === 'Catholic Stories for Children';
		var _v0 = isHomePage ? _Utils_Tuple2('111px', 'grid-cols-[150px_1fr_150px] lg:grid-cols-[60px_1fr_600px] xl:grid-cols-[150px_1fr_600px]') : _Utils_Tuple2('60px', 'grid-cols-[150px_1fr_150px] lg:grid-cols-[60px_1fr_600px] xl:grid-cols-[150px_1fr_600px]');
		var height = _v0.a;
		var gridColsClass = _v0.b;
		return A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$header,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'background-color', '#43868D'),
							$elm$html$Html$Attributes$class('text-white'),
							$elm$html$Html$Attributes$class('h-[60px] md:h-[' + (height + ']')),
							$elm$html$Html$Attributes$class('grid items-center justify-items-center'),
							$elm$html$Html$Attributes$class(gridColsClass)
						]),
					_List_fromArray(
						[
							$author$project$Header$viewLogo,
							A2($author$project$Header$viewHeaderTitle, true, currentPage),
							$author$project$Header$navigation(height)
						])),
					$author$project$Header$viewBanner
				]));
	});
var $author$project$Animations$View$view = F2(
	function (url, model) {
		var urlRoute = $author$project$Animations$View$parseRoute(url);
		var title = $author$project$Animations$View$getTitleFromRoute(urlRoute);
		return {
			body: _List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('bg-[#282c2e] text-white')
						]),
					_List_fromArray(
						[
							A2($author$project$Header$viewSubpageHeader, 'Animations', $author$project$Helpers$headerMargin),
							A2($author$project$Animations$View$viewBody, model, urlRoute),
							$author$project$Footer$viewFooter
						]))
				]),
			title: title + ' - Catholic Stories for Children'
		};
	});
var $author$project$NotFound$Main$view = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('max-w-5xl'),
			$elm$html$Html$Attributes$class('m-auto'),
			$elm$html$Html$Attributes$class('py-5 px-11'),
			$elm$html$Html$Attributes$class('mb-10'),
			$elm$html$Html$Attributes$class('h-5/6')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h1,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mb-10 leading-9')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Lost and Not Found')
				])),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Tony Tony, come around I am lost. Dear St. Anthony, please help me find the webpage I am looking for. Thank you St. Anthony. Amen.')
				])),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mt-10')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$a,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$href('/'),
							A2($elm$html$Html$Attributes$style, 'text-decoration', 'none'),
							A2($elm$html$Html$Attributes$style, 'padding', '10px 20px'),
							A2($elm$html$Html$Attributes$style, 'display', 'inline-block'),
							A2($elm$html$Html$Attributes$style, 'border-radius', '5px'),
							A2($elm$html$Html$Attributes$style, 'box-shadow', '#777 1px 1px 5px'),
							A2($elm$html$Html$Attributes$style, 'color', 'white'),
							A2($elm$html$Html$Attributes$style, 'background-color', '#9200B3')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Return Home')
						]))
				]))
		]));
var $elm$html$Html$section = _VirtualDom_node('section');
var $author$project$Main$viewSection = F3(
	function (sectionId, background, body) {
		return A2(
			$elm$html$Html$section,
			A2(
				$elm$core$List$cons,
				$elm$html$Html$Attributes$id(sectionId),
				background),
			body);
	});
var $author$project$Main$viewAnimations = function (model) {
	return A3(
		$author$project$Main$viewSection,
		'animations',
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('py-20 bg-[#282c2e] text-white')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$map,
				$author$project$Main$ProductionsMsg,
				$author$project$Animations$View$viewProductions(model.productionsModel))
			]));
};
var $author$project$Main$viewGive = A3(
	$author$project$Main$viewSection,
	'give',
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('bg-[#9101b3] text-white')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('w-full max-w-7xl m-auto p-20')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$h2,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('my-10 text-7xl')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Give')
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('flex flex-col')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$p,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Want more Catholic animations? Find out ways you can help us!')
								])),
							A2(
							$elm$html$Html$a,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$href('/give'),
									$elm$html$Html$Attributes$target('_blank'),
									$elm$html$Html$Attributes$class('flex flex-col items-center justify-center rounded p-7 text-center bg-white text-black'),
									$elm$html$Html$Attributes$class('w-96 my-10')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Learn More')
								]))
						]))
				]))
		]));
var $author$project$Main$more = {description: 'Find more resources here.', image: 'https://ik.imagekit.io/catholicstories/Resources_Icons/5_siQ_tckr-C.png?updatedAt=1682454350018', link: 'resources', name: 'More Resources'};
var $author$project$Main$prayers = {description: 'Find prayers resources and information here.', image: 'https://ik.imagekit.io/catholicstories/Resources_Icons/6_qYAX4yqV6.png?updatedAt=1682454350004', link: 'resources/prayer', name: 'Prayers'};
var $author$project$Main$saints = {description: 'Find a list of saints here.', image: 'https://ik.imagekit.io/catholicstories/Resources_Icons/7_nqDiNpO9Q.png?updatedAt=1682454350040', link: 'saints', name: 'Saints'};
var $author$project$Main$viewResourceGroup = function (resourceGroup) {
	return A2(
		$elm$html$Html$a,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('grid grid-cols-[100px_1fr] hover:bg-csc-lightpurple rounded p-7'),
				$elm$html$Html$Attributes$href('/' + resourceGroup.link),
				A2($elm$html$Html$Attributes$attribute, 'aria-label', resourceGroup.name)
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$img,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$src(resourceGroup.image),
								$elm$html$Html$Attributes$class('w-20 h-20 object-cover')
							]),
						_List_Nil)
					])),
				A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$h2,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(resourceGroup.name)
							])),
						A2(
						$elm$html$Html$p,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(resourceGroup.description)
							]))
					]))
			]));
};
var $author$project$Main$viewResourceGroups = A2(
	$elm$html$Html$div,
	_List_Nil,
	A2(
		$elm$core$List$map,
		$author$project$Main$viewResourceGroup,
		_List_fromArray(
			[$author$project$Main$saints, $author$project$Main$prayers, $author$project$Main$more])));
var $author$project$Main$viewResources = A3(
	$author$project$Main$viewSection,
	'resources',
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('bg-[#FEF7F4]')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('w-full max-w-7xl m-auto my-20 px-20')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$h2,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mb-10 text-7xl')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Resources')
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('flex flex-col')
						]),
					_List_fromArray(
						[$author$project$Main$viewResourceGroups]))
				]))
		]));
var $author$project$Shop$ShopHelpers$confirmandiHoodie = {beehiivLink: '', description: 'Get your Confirmandi Hoodie here!', etsyLink: '', image: '/assets/images/shop/confirmandihoodie.png', link: 'https://catholicstoriesforchildren.printful.me/product/confirmandi-youth-heavy-blend-hoodie-durable-comfortable-confirmation-apparel', name: 'Confirmandi Youth Heavy Blend Hoodie'};
var $author$project$Shop$ShopHelpers$cscWaterBottle = {beehiivLink: '', description: 'Get your CSC Water Bottle here!', etsyLink: '', image: '/assets/images/shop/cscwaterbottle.png', link: 'https://catholicstoriesforchildren.printful.me/product/catholic-stories-for-children-stainless-steel-water-bottle-32-oz-with-straw-lid', name: 'Catholic Stories for Children Stainless Steel Water Bottle – 32 oz with Straw Lid'};
var $author$project$Shop$ShopHelpers$guardianAngelSpiralNotebook = {beehiivLink: '', description: 'Get your Guardian Angel Spiral Notebook here!', etsyLink: '', image: '/assets/images/shop/guardianangelsspiralnotebook.png', link: 'https://catholicstoriesforchildren.printful.me/product/guardian-angels-spiral-notebook-featuring-the-angel-of-god-prayer-and-the-guardian-angels', name: 'Guardian Angel Spiral Notebook'};
var $author$project$Shop$ShopHelpers$pinkLittleFlowerTote = {beehiivLink: '', description: 'Get your Pink Little Flower Tote Bag here!', etsyLink: '', image: '/assets/images/shop/PinkLittleFlowerTote.png', link: 'https://catholicstoriesforchildren.printful.me/product/pink-little-flower-tote-bag', name: 'Pink Little Flower Tote Bag'};
var $author$project$Shop$ShopHelpers$prayedtodayshirt = {beehiivLink: '', description: 'Get your I Prayed Today Shirt here!', etsyLink: '', image: '/assets/images/shop/prayedtodayshirt.png', link: 'https://catholicstoriesforchildren.printful.me/product/prayed-today-womens-short-sleeve-t-shirt-featuring-daisy-and-sheep', name: 'Prayed Today? Women’s Short Sleeve T-Shirt'};
var $author$project$Shop$ShopHelpers$redlittleflowertote = {beehiivLink: '', description: 'Get your Red Little Flower Tote Bag here!', etsyLink: '', image: '/assets/images/shop/RedLittleFlowerTote.png', link: 'https://catholicstoriesforchildren.printful.me/product/little-flower-tote-bag', name: 'Red Little Flower Tote Bag'};
var $author$project$Shop$ShopHelpers$stmichaelholographicsticker = {beehiivLink: '', description: 'Get your St. Michael Holographic Sticker here!', etsyLink: '', image: '/assets/images/shop/stmichaelholographicsticker.png', link: 'https://catholicstoriesforchildren.printful.me/product/holographic-stickers-6750c6047592c', name: 'St. Michael Holographic Sticker'};
var $author$project$Shop$ShopHelpers$stmichaelyouthshirt = {beehiivLink: '', description: 'Get your St. Michael Youth T-Shirt here!', etsyLink: '', image: '/assets/images/shop/stmichaelyouthshirt.png', link: 'https://catholicstoriesforchildren.printful.me/product/st-michael-youth-short-sleeve-t-shirt-defend-us-in-battle', name: 'St. Michael Youth T-Shirt'};
var $author$project$Shop$ShopHelpers$viewShopItem3 = function (item) {
	return A2(
		$elm$html$Html$a,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('flex flex-col'),
				$elm$html$Html$Attributes$href(item.link),
				$elm$html$Html$Attributes$target('_blank')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$img,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('mb-4 rounded'),
						$elm$html$Html$Attributes$class('rounded bg-[#373c3f]'),
						$elm$html$Html$Attributes$src(item.image),
						$elm$html$Html$Attributes$alt(item.name)
					]),
				_List_Nil),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('text-base')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(item.name)
					]))
			]));
};
var $author$project$Shop$ShopHelpers$viewShopItems = function (shopItems) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('flex flex-col items-center')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('grid grid-cols-4 gap-4 pb-4 mb-10')
					]),
				A2($elm$core$List$map, $author$project$Shop$ShopHelpers$viewShopItem3, shopItems)),
				A2(
				$elm$html$Html$a,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$href('https://catholicstoriesforchildren.printful.me/'),
						$elm$html$Html$Attributes$target('_blank'),
						$elm$html$Html$Attributes$class('flex flex-col items-center justify-center rounded p-7 text-center bg-[#E95A03] text-white'),
						$elm$html$Html$Attributes$class('w-96')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('View More')
					]))
			]));
};
var $author$project$Shop$ShopHelpers$viewPrintfulShopItems = $author$project$Shop$ShopHelpers$viewShopItems(
	_List_fromArray(
		[$author$project$Shop$ShopHelpers$confirmandiHoodie, $author$project$Shop$ShopHelpers$cscWaterBottle, $author$project$Shop$ShopHelpers$redlittleflowertote, $author$project$Shop$ShopHelpers$pinkLittleFlowerTote, $author$project$Shop$ShopHelpers$guardianAngelSpiralNotebook, $author$project$Shop$ShopHelpers$prayedtodayshirt, $author$project$Shop$ShopHelpers$stmichaelholographicsticker, $author$project$Shop$ShopHelpers$stmichaelyouthshirt]));
var $author$project$Main$viewShop = A3(
	$author$project$Main$viewSection,
	'shop',
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('py-20 bg-[#282c2e] text-white')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('w-full max-w-7xl m-auto mb-20 px-20')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$h2,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mb-10 text-7xl')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Shop')
						])),
					$author$project$Shop$ShopHelpers$viewPrintfulShopItems
				]))
		]));
var $author$project$Animations$View$NextSlide = {$: 'NextSlide'};
var $author$project$Animations$View$PrevSlide = {$: 'PrevSlide'};
var $author$project$Animations$Helpers$Carousel$viewSlide = F3(
	function (currentIndex, index, _v0) {
		var thumbnail = _v0.a;
		var link = _v0.b;
		return A2(
			$elm$html$Html$a,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('w-[80vw] aspect-[3/1] flex-shrink-0 transition-transform duration-500 ease-in-out'),
					A2($elm$html$Html$Attributes$style, 'background', 'url(\'' + (thumbnail + '\') center center / cover no-repeat')),
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
					A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
					A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
					$elm$html$Html$Attributes$href(link)
				]),
			_List_Nil);
	});
var $author$project$Animations$Helpers$Carousel$viewSlides = F3(
	function (carousel, nextSlide, prevSlide) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('relative w-screen h-[calc(80vw/3)] overflow-hidden flex items-center justify-start')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('flex transition-transform duration-500 ease-in-out'),
							A2(
							$elm$html$Html$Attributes$style,
							'transform',
							'translateX(' + ($elm$core$String$fromInt(10 - (carousel.currentIndex * 80)) + 'vw)'))
						]),
					A2(
						$elm$core$List$indexedMap,
						$author$project$Animations$Helpers$Carousel$viewSlide(carousel.currentIndex),
						carousel.items)),
					A2(
					$elm$html$Html$button,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('absolute left-0 z-20 p-4 bg-black/30 text-white text-3xl h-full w-[10vw] hover:bg-black/50 transition'),
							$elm$html$Html$Events$onClick(prevSlide)
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('‹')
						])),
					A2(
					$elm$html$Html$button,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('absolute right-0 z-20 p-4 bg-black/30 text-white text-3xl h-full w-[10vw] hover:bg-black/50 transition'),
							$elm$html$Html$Events$onClick(nextSlide)
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('›')
						]))
				]));
	});
var $author$project$Main$viewSlideshow = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('bg-[#282c2e]')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$map,
				$author$project$Main$ProductionsMsg,
				A3($author$project$Animations$Helpers$Carousel$viewSlides, model.productionsModel.slideshow, $author$project$Animations$View$NextSlide, $author$project$Animations$View$PrevSlide))
			]));
};
var $author$project$Helpers$Facebook = {$: 'Facebook'};
var $author$project$Helpers$Instagram = {$: 'Instagram'};
var $author$project$Helpers$Pinterest = {$: 'Pinterest'};
var $author$project$Helpers$Website = {$: 'Website'};
var $author$project$Team$Team$kelly = {
	description: 'Kelly is a part-time social media specialist and homeschools her four children on the east coast of Canada.',
	image: $author$project$Team$Team$imagePath + 'KellyBriggs.jpeg',
	initials: 'KB',
	name: 'Kelly Briggs',
	position: 'Social Media Specialist',
	socials: _List_fromArray(
		[
			_Utils_Tuple2($author$project$Helpers$Instagram, 'https://www.instagram.com/simplehomemom/'),
			_Utils_Tuple2($author$project$Helpers$Facebook, 'https://www.facebook.com/simplehomemom'),
			_Utils_Tuple2($author$project$Helpers$Pinterest, 'https://www.pinterest.com/simplehomemom/'),
			_Utils_Tuple2($author$project$Helpers$Website, 'https://www.simplehomemom.com/')
		])
};
var $author$project$Team$Team$lindsey = {description: 'Lindsey is a Jill-of-all-trades with a background in entertainment production (theater, theme-park, opera, film), events, music, and education. A Catholic convert from an evangelical background, she is passionate about passing along the riches of the faith - especially to those who may not recognize the treasure trove of the Church! Having worked for Disney in the parks and at Imagineering for over a decade, Lindsey has developed a taste for artistic excellence and hopes to bring a high level of quality to the Catholic creative sphere. Like Tolkien, she is a big believer in the power of myth and fairy tales for developing minds, she aims to tell stories that prepare children for a life of adventure, meaning, virtue, and purpose. She currently serves CSC as a creative consultant and content creator.', image: $author$project$Team$Team$imagePath + 'LindseyBruno.jpg', initials: '', name: 'Lindsey Bruno', position: 'Creative Director', socials: _List_Nil};
var $elm$html$Html$Attributes$rel = _VirtualDom_attribute('rel');
var $author$project$Team$Team$viewDescription = function (description) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'overflow-wrap', 'anywhere'),
				A2($elm$html$Html$Attributes$style, 'margin-top', '10px'),
				A2($elm$html$Html$Attributes$style, 'display', '-webkit-box'),
				A2($elm$html$Html$Attributes$style, '-webkit-box-orient', 'vertical'),
				A2($elm$html$Html$Attributes$style, 'overflow', 'hidden'),
				A2($elm$html$Html$Attributes$style, 'text-overflow', 'ellipsis'),
				A2($elm$html$Html$Attributes$style, '-webkit-line-clamp', '5')
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(description)
			]));
};
var $author$project$Team$Team$viewName = function (name) {
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				$elm$html$Html$text(name)
			]));
};
var $author$project$Team$Team$viewPosition = function (position) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'color', '#333'),
				A2($elm$html$Html$Attributes$style, 'font-size', '.8em')
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(position)
			]));
};
var $author$project$Helpers$Behance = {$: 'Behance'};
var $author$project$Helpers$IMDB = {$: 'IMDB'};
var $author$project$Helpers$LinkedIn = {$: 'LinkedIn'};
var $author$project$Helpers$SoundCloud = {$: 'SoundCloud'};
var $author$project$Helpers$Spotify = {$: 'Spotify'};
var $author$project$Helpers$Twitter = {$: 'Twitter'};
var $author$project$Helpers$Vimeo = {$: 'Vimeo'};
var $author$project$Helpers$YouTube = {$: 'YouTube'};
var $matthewsj$elm_ordering$Ordering$explicit = F3(
	function (elements, x, y) {
		var scanForY = function (items) {
			scanForY:
			while (true) {
				if (items.b) {
					var z = items.a;
					var zs = items.b;
					if (_Utils_eq(z, y)) {
						return $elm$core$Basics$LT;
					} else {
						var $temp$items = zs;
						items = $temp$items;
						continue scanForY;
					}
				} else {
					return $elm$core$Basics$GT;
				}
			}
		};
		var scanForX = function (items) {
			scanForX:
			while (true) {
				if (items.b) {
					var z = items.a;
					var zs = items.b;
					if (_Utils_eq(z, x)) {
						return $elm$core$Basics$GT;
					} else {
						var $temp$items = zs;
						items = $temp$items;
						continue scanForX;
					}
				} else {
					return $elm$core$Basics$LT;
				}
			}
		};
		var scanForEither = function (items) {
			scanForEither:
			while (true) {
				if (items.b) {
					var z = items.a;
					var zs = items.b;
					if (_Utils_eq(z, x)) {
						return scanForY(zs);
					} else {
						if (_Utils_eq(z, y)) {
							return scanForX(zs);
						} else {
							var $temp$items = zs;
							items = $temp$items;
							continue scanForEither;
						}
					}
				} else {
					return $elm$core$Basics$EQ;
				}
			}
		};
		return _Utils_eq(x, y) ? $elm$core$Basics$EQ : scanForEither(elements);
	});
var $author$project$Team$Team$socialOrdering = $matthewsj$elm_ordering$Ordering$explicit(
	_List_fromArray(
		[$author$project$Helpers$Website, $author$project$Helpers$Instagram, $author$project$Helpers$Twitter, $author$project$Helpers$Vimeo, $author$project$Helpers$IMDB, $author$project$Helpers$Facebook, $author$project$Helpers$LinkedIn, $author$project$Helpers$YouTube, $author$project$Helpers$Pinterest, $author$project$Helpers$Spotify, $author$project$Helpers$SoundCloud, $author$project$Helpers$Behance]));
var $author$project$Team$Team$socialSort = F2(
	function (_v0, _v1) {
		var social1 = _v0.a;
		var link1 = _v0.b;
		var social2 = _v1.a;
		var link2 = _v1.b;
		return A2($author$project$Team$Team$socialOrdering, social1, social2);
	});
var $elm$core$List$sortWith = _List_sortWith;
var $author$project$Helpers$favicon = F2(
	function (alternativeText, link) {
		return A2(
			$elm$html$Html$img,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'aria-hidden', 'true'),
					$elm$html$Html$Attributes$src(link),
					A2($elm$html$Html$Attributes$style, 'width', '16px'),
					A2($elm$html$Html$Attributes$style, 'height', '16px'),
					$elm$html$Html$Attributes$alt(alternativeText)
				]),
			_List_Nil);
	});
var $author$project$Helpers$behanceLogo = A2($author$project$Helpers$favicon, 'behance', 'https://www.behance.net/favicon.ico');
var $author$project$Helpers$facebookLogo = A2($author$project$Helpers$favicon, 'facebook', 'https://www.facebook.com/favicon.ico');
var $author$project$Helpers$imdbLogo = A2($author$project$Helpers$favicon, 'imdb', 'https://www.imdb.com/favicon.ico');
var $author$project$Helpers$instagramLogo = A2($author$project$Helpers$favicon, 'instagram', 'https://www.instagram.com/favicon.ico');
var $author$project$Helpers$linkedInLogo = A2($author$project$Helpers$favicon, 'linkedin', 'https://www.linkedin.com/favicon.ico');
var $author$project$Helpers$pinterestLogo = A2($author$project$Helpers$favicon, 'pinterest', 'https://www.pinterest.com/favicon.ico');
var $author$project$Helpers$soundcloudLogo = A2($author$project$Helpers$favicon, 'soundcloud', 'https://soundcloud.com/favicon.ico');
var $author$project$Helpers$spotifyLogo = A2($author$project$Helpers$favicon, 'spotify', 'https://www.spotify.com/favicon.ico');
var $author$project$Helpers$twitterLogo = A2($author$project$Helpers$favicon, 'twitter', 'https://www.twitter.com/favicon.ico');
var $author$project$Helpers$viewSocialLink = F3(
	function (image, link, label) {
		return A2(
			$elm$html$Html$a,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$href(link),
					A2($elm$html$Html$Attributes$style, 'text-decoration', 'none'),
					$elm$html$Html$Attributes$target('_blank'),
					A2($elm$html$Html$Attributes$style, 'margin-right', '10px'),
					A2($elm$html$Html$Attributes$attribute, 'aria-label', label),
					$elm$html$Html$Attributes$class('inline-block')
				]),
			_List_fromArray(
				[image]));
	});
var $author$project$Helpers$vimeoLogo = A2($author$project$Helpers$favicon, 'vimeo', 'https://vimeo.com/favicon.ico');
var $author$project$Helpers$youtubeLogo = A2($author$project$Helpers$favicon, 'youtube', 'https://www.youtube.com/favicon.ico');
var $author$project$Helpers$viewSocial = function (_v0) {
	var social = _v0.a;
	var link = _v0.b;
	switch (social.$) {
		case 'Website':
			return A3(
				$author$project$Helpers$viewSocialLink,
				$elm$html$Html$text('🌐'),
				link,
				'website');
		case 'Instagram':
			return A3($author$project$Helpers$viewSocialLink, $author$project$Helpers$instagramLogo, link, 'instagram');
		case 'Twitter':
			return A3($author$project$Helpers$viewSocialLink, $author$project$Helpers$twitterLogo, link, 'twitter');
		case 'Facebook':
			return A3($author$project$Helpers$viewSocialLink, $author$project$Helpers$facebookLogo, link, 'facebook');
		case 'LinkedIn':
			return A3($author$project$Helpers$viewSocialLink, $author$project$Helpers$linkedInLogo, link, 'linkedin');
		case 'Vimeo':
			return A3($author$project$Helpers$viewSocialLink, $author$project$Helpers$vimeoLogo, link, 'vimeo');
		case 'IMDB':
			return A3($author$project$Helpers$viewSocialLink, $author$project$Helpers$imdbLogo, link, 'imdb');
		case 'YouTube':
			return A3($author$project$Helpers$viewSocialLink, $author$project$Helpers$youtubeLogo, link, 'youtube');
		case 'Pinterest':
			return A3($author$project$Helpers$viewSocialLink, $author$project$Helpers$pinterestLogo, link, 'pinterest');
		case 'Spotify':
			return A3($author$project$Helpers$viewSocialLink, $author$project$Helpers$spotifyLogo, link, 'spotify');
		case 'SoundCloud':
			return A3($author$project$Helpers$viewSocialLink, $author$project$Helpers$soundcloudLogo, link, 'soundcloud');
		default:
			return A3($author$project$Helpers$viewSocialLink, $author$project$Helpers$behanceLogo, link, 'behance');
	}
};
var $author$project$Team$Team$viewSocials = function (person) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'margin-top', '10px'),
				$elm$html$Html$Attributes$class('flex items-center')
			]),
		A2(
			$elm$core$List$map,
			$author$project$Helpers$viewSocial,
			A2($elm$core$List$sortWith, $author$project$Team$Team$socialSort, person.socials)));
};
var $author$project$Team$Team$viewPerson = function (person) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'display', 'grid'),
				A2($elm$html$Html$Attributes$style, 'grid-template-columns', '72px 1fr'),
				$elm$html$Html$Attributes$class('h-full'),
				A2($elm$html$Html$Attributes$style, 'min-height', '115px'),
				A2($elm$html$Html$Attributes$style, 'background', 'white'),
				A2($elm$html$Html$Attributes$style, 'border-radius', '4px'),
				A2($elm$html$Html$Attributes$style, 'padding', '20px')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'margin', '0px 10px 40px 0'),
						$elm$html$Html$Attributes$class('float-left relative')
					]),
				_List_fromArray(
					[
						$author$project$Team$Team$viewPersonImage(person)
					])),
				A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						$author$project$Team$Team$viewName(person.name),
						$author$project$Team$Team$viewPosition(person.position),
						$author$project$Team$Team$viewDescription(person.description),
						$author$project$Team$Team$viewSocials(person)
					]))
			]));
};
var $author$project$Main$viewTeam = A3(
	$author$project$Main$viewSection,
	'team',
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('py-20 bg-[#FEF7F4]')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('w-full max-w-7xl m-auto mb-20 px-20')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$h2,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mb-10 text-7xl')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('The Team')
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('grid xl:grid-cols-3 gap-5'),
							$elm$html$Html$Attributes$class('my-10')
						]),
					_List_fromArray(
						[
							$author$project$Team$Team$viewPerson($author$project$Team$Team$trevor),
							$author$project$Team$Team$viewPerson($author$project$Team$Team$lindsey),
							$author$project$Team$Team$viewPerson($author$project$Team$Team$kelly)
						])),
					A2(
					$elm$html$Html$a,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$href('/team'),
							$elm$html$Html$Attributes$rel('noopener'),
							A2($elm$html$Html$Attributes$style, 'text-decoration', 'none'),
							A2($elm$html$Html$Attributes$style, 'padding', '10px 20px'),
							A2($elm$html$Html$Attributes$style, 'display', 'inline-block'),
							A2($elm$html$Html$Attributes$style, 'color', 'black'),
							A2($elm$html$Html$Attributes$style, 'border', '2px solid #777'),
							A2($elm$html$Html$Attributes$style, 'border-radius', '5px'),
							A2($elm$html$Html$Attributes$style, 'box-shadow', '#777 1px 1px 5px')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Meet the Team')
						]))
				]))
		]));
var $author$project$Team$Testimonials$ainsleyRawlingsTestimonial = {description: 'My kids love the guardian angel song and video! The song is beautiful and easy for my littles to remember and sing along with. ❤️ Thank you!', image: 'https://ik.imagekit.io/catholicstories/ProfileImages/ainsleyrawlings_hyB-0rd23.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676325098991', initials: 'AR', name: 'Ainsley Rawlings', position: 'Mother and Teacher', socials: _List_Nil};
var $author$project$Team$Testimonials$camSmithTestimonial = {description: 'I love how there is a story, animation, and even music to learning the prayers. We know that children often, if not always, learn first through their experience and senses. The incorporation of such animation then will definitely help our children learn these prayers more easily! I will be showing these prayers to my infant child when he is older. 🙂', image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CamNguyen_ze-IRFU1d.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676325311225', initials: 'CS', name: 'Cam Smith', position: 'Mother and Social Worker', socials: _List_Nil};
var $author$project$Team$Main$cfnLive = {image: '/assets/images/ProfilePictures/CFN.png', link: 'https://vimeo.com/963295296/89fc748d09?share=copy', name: 'CFN Live'};
var $author$project$Team$Main$christianChannel = {image: '/assets/images/ProfilePictures/ChristianChannel.png', link: 'https://youtu.be/p4yi5EFbPAI?si=L0jtHxwFyyS4jMjC', name: 'Christian Channel'};
var $author$project$Team$Main$inHisImage = {image: '/assets/images/ProfilePictures/InHisDesign.png', link: 'https://youtu.be/eqOmqdlNIDw?si=E9xTDcqQV_nFFQs-', name: 'In His Image Podcast'};
var $author$project$Team$Testimonials$kellyBriggsTestimonial = {description: 'My three year old requests the Hail Mary animation often  it makes me so happy. I love it. Almost every time during our morning prayer time she asks.', image: $author$project$Team$Team$imagePath + 'KellyBriggs.jpeg', initials: 'KB', name: 'Kelly Briggs', position: 'Social Media Specialist', socials: _List_Nil};
var $author$project$Team$Main$makeJoyNormal = {image: '/assets/images/ProfilePictures/MakeJoyNormal.png', link: 'https://podcasts.apple.com/ca/podcast/catholic-stories-for-children-an-interview-with/id1512837291?i=1000631285156', name: 'Make Joy Normal Podcast'};
var $author$project$Team$Testimonials$meganReisterTestimonial = {description: 'How fabulous!!! So looking forward to sharing this far and wide!!!', image: 'https://spp.franciscan.edu/wp-content/uploads/sites/4/2019/02/Reister.jpg', initials: 'MR', name: 'Dr. Megan Reister', position: 'Associate Professor of Special Education and Early Childhood', socials: _List_Nil};
var $author$project$Team$Main$ocCatholic = {image: '/assets/images/ProfilePictures/OCCatholic.png', link: 'https://www.occatholic.com/catholic-stories-for-children-helping-the-next-generation-understand-the-faith/', name: 'Orange County Catholic'};
var $author$project$Team$Main$spiritFilledMedia = {image: '/assets/images/ProfilePictures/SpiritFilledMedia.png', link: 'https://www.buzzsprout.com/1467955/10425762-finding-your-way-catholic-stories-for-children-guest-trevor-rothaus ', name: 'Spirit Filled Media Podcast'};
var $author$project$Resources$Helpers$viewResourceImages = function (resource) {
	return A2(
		$elm$html$Html$a,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('rounded'),
				$elm$html$Html$Attributes$target('_blank'),
				A2($elm$html$Html$Attributes$attribute, 'aria-label', resource.name),
				$elm$html$Html$Attributes$href(resource.link)
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$img,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$src(resource.image),
								$elm$html$Html$Attributes$class('w-40 h-40 object-cover')
							]),
						_List_Nil)
					]))
			]));
};
var $author$project$Main$viewTestimonials = A3(
	$author$project$Main$viewSection,
	'testimonials',
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('py-20 bg-[#FEF7F4]')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('w-full max-w-7xl m-auto mb-20 px-20')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$h2,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mb-10 text-7xl')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Testimonials')
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('grid gap-5')
						]),
					_List_fromArray(
						[
							$author$project$Team$Team$viewPerson($author$project$Team$Testimonials$ainsleyRawlingsTestimonial),
							$author$project$Team$Team$viewPerson($author$project$Team$Testimonials$camSmithTestimonial),
							$author$project$Team$Team$viewPerson($author$project$Team$Testimonials$meganReisterTestimonial),
							$author$project$Team$Team$viewPerson($author$project$Team$Testimonials$kellyBriggsTestimonial)
						])),
					A2(
					$elm$html$Html$h3,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mt-20 mb-10 text-5xl')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('In the Media')
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('grid gap-5 grid-cols-3 lg:grid-cols-6')
						]),
					A2(
						$elm$core$List$map,
						$author$project$Resources$Helpers$viewResourceImages,
						_List_fromArray(
							[$author$project$Team$Main$spiritFilledMedia, $author$project$Team$Main$makeJoyNormal, $author$project$Team$Main$christianChannel, $author$project$Team$Main$ocCatholic, $author$project$Team$Main$inHisImage, $author$project$Team$Main$cfnLive])))
				]))
		]));
var $author$project$Main$viewBody = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('text-lg leading-loose'),
				$elm$html$Html$Attributes$class('lg:text-2xl')
			]),
		_List_fromArray(
			[
				$author$project$Main$viewSlideshow(model),
				$author$project$Main$viewAnimations(model),
				$author$project$Main$viewTestimonials,
				$author$project$Main$viewShop,
				$author$project$Main$viewTeam,
				$author$project$Main$viewGive,
				$author$project$Main$viewResources
			]));
};
var $author$project$Header$viewHeader = F2(
	function (currentPage, leftMargin) {
		return A2($author$project$Header$viewSubpageHeader, currentPage, leftMargin);
	});
var $author$project$Main$viewHome = function (model) {
	return {
		body: _List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'background-color', '#FEF7F4')
					]),
				_List_fromArray(
					[
						A2($author$project$Header$viewHeader, 'Catholic Stories for Children', $author$project$Helpers$headerMargin),
						$author$project$Main$viewBody(model),
						$author$project$Footer$viewFooter
					]))
			]),
		title: 'Catholic Stories for Children'
	};
};
var $author$project$Main$view = function (model) {
	var _v0 = function () {
		var _v1 = model.page;
		switch (_v1.$) {
			case 'Home':
				return $author$project$Main$viewHome(model);
			case 'Productions':
				var b = A2($author$project$Animations$View$view, model.url, model.productionsModel);
				return {
					body: A2(
						$elm$core$List$map,
						$elm$html$Html$map($author$project$Main$ProductionsMsg),
						b.body),
					title: b.title
				};
			default:
				var b = $author$project$NotFound$Main$view;
				return {
					body: _List_fromArray(
						[
							A2(
							$elm$html$Html$map,
							function (_v2) {
								return $author$project$Main$NoOp;
							},
							b)
						]),
					title: 'Tony Help, Page Not Found'
				};
		}
	}();
	var title = _v0.title;
	var body = _v0.body;
	return {body: body, title: title};
};
var $author$project$Main$main = $elm$browser$Browser$application(
	{init: $author$project$Main$init, onUrlChange: $author$project$Main$UrlChanged, onUrlRequest: $author$project$Main$LinkClicked, subscriptions: $author$project$Main$subscriptions, update: $author$project$Main$update, view: $author$project$Main$view});
_Platform_export({'Main':{'init':$author$project$Main$main(
	$elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}});}(this));