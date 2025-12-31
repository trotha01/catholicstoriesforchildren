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
}


var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});


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
var $author$project$Main$LinkClicked = function (a) {
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
var $author$project$Main$Feasts = {$: 'Feasts'};
var $author$project$Main$FeastsMsg = function (a) {
	return {$: 'FeastsMsg', a: a};
};
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
var $author$project$Main$Saints = {$: 'Saints'};
var $author$project$Main$SaintsMsg = function (a) {
	return {$: 'SaintsMsg', a: a};
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
var $author$project$Page$Animations$View$English = {$: 'English'};
var $author$project$Page$Animations$View$NewTime = function (a) {
	return {$: 'NewTime', a: a};
};
var $author$project$Page$Animations$View$NewZone = function (a) {
	return {$: 'NewZone', a: a};
};
var $author$project$Page$Animations$View$Activities = {$: 'Activities'};
var $author$project$Page$Animations$View$Details = {$: 'Details'};
var $author$project$Page$Animations$View$Episodes = {$: 'Episodes'};
var $author$project$Page$Animations$View$Suggested = {$: 'Suggested'};
var $author$project$Page$Animations$View$getTabFromUrl = function (url) {
	var _v0 = url.query;
	if (_v0.$ === 'Just') {
		var query = _v0.a;
		return A2($elm$core$String$contains, 'tab=activities', query) ? $author$project$Page$Animations$View$Activities : (A2($elm$core$String$contains, 'tab=details', query) ? $author$project$Page$Animations$View$Details : (A2($elm$core$String$contains, 'tab=suggested', query) ? $author$project$Page$Animations$View$Suggested : $author$project$Page$Animations$View$Episodes));
	} else {
		return $author$project$Page$Animations$View$Episodes;
	}
};
var $author$project$Page$Animations$Helpers$Carousel$init = function (items) {
	return {currentIndex: 0, items: items};
};
var $elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var $elm$time$Time$millisToPosix = $elm$time$Time$Posix;
var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
var $elm$html$Html$span = _VirtualDom_node('span');
var $author$project$Page$Animations$DaisyAndSheep$DASEpisodes$episodes = _List_fromArray(
	[
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '/printables/daisyandsheep/Liturgical Kiss Answer Key.pdf', answerThumbnailLink: '/assets/images/daisyandsheep/liturgicalkissworksheetanswers.png', pdfLink: '/printables/daisyandsheep/Liturgical Kiss.pdf', thumbnailLink: '/assets/images/daisyandsheep/liturgicalkissworksheet.png'},
		duration: '1 min',
		isDisabled: false,
		isFundraising: false,
		link: '/animations/daisyandsheep/1/liturgicalkiss',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: '/assets/images/AnimationImageLinks/LiturgicalKiss.webp',
		title: 'Liturgical Kiss',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/i6zBgnZQq9U', spanish: 'https://www.youtube.com/embed/vgUZq1hhmXM', urdu: ''},
		videoTitles: {asl: '', english: 'Liturgical Kiss | Daisy and Sheep', spanish: 'Beso Litúrgico | Daisy and Sheep', urdu: ''},
		year: '2024'
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '/printables/daisyandsheep/Astronomy Program Answer Key.pdf', answerThumbnailLink: '/assets/images/daisyandsheep/astronomyprogramworksheetanswers.png', pdfLink: '/printables/daisyandsheep/Astronomy Program.pdf', thumbnailLink: '/assets/images/daisyandsheep/astronomyprogramworksheet.png'},
		duration: '1 min',
		isDisabled: false,
		isFundraising: false,
		link: '/animations/daisyandsheep/1/astronomyprogram',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: '/assets/images/AnimationImageLinks/AstronomyProgram.webp',
		title: 'Astronomy Program',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/QIcgtKMKe40', spanish: 'https://www.youtube.com/embed/nP5e0y7DNNI', urdu: ''},
		videoTitles: {asl: '', english: 'Astronomy Program | Daisy and Sheep', spanish: 'La Specola Vaticana | Daisy and Sheep', urdu: ''},
		year: '2024'
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '/printables/daisyandsheep/Penitential Act Answer Key.pdf', answerThumbnailLink: '/assets/images/daisyandsheep/penitentialactanswers.png', pdfLink: '/printables/daisyandsheep/Penitential Act.pdf', thumbnailLink: '/assets/images/daisyandsheep/penitentialact.png'},
		duration: '1 min',
		isDisabled: false,
		isFundraising: false,
		link: '/animations/daisyandsheep/1/penitentialact',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: '/assets/images/AnimationImageLinks/PenitentialAct.webp',
		title: 'Penitential Act',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/ay8Kzqeyrrc', spanish: 'https://www.youtube.com/embed/cfZsgMZjCAw', urdu: ''},
		videoTitles: {asl: '', english: 'Penitential Act | Daisy and Sheep', spanish: 'Penitential Act | Daisy and Sheep', urdu: ''},
		year: '2024'
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '', answerThumbnailLink: '', pdfLink: '/printables/daisyandsheep/Guardian Angel.pdf', thumbnailLink: '/assets/images/daisyandsheep/guardianangel.png'},
		duration: '1 min',
		isDisabled: false,
		isFundraising: false,
		link: '/animations/daisyandsheep/1/guardianangel',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: '/assets/images/AnimationImageLinks/GuardianAngel.webp',
		title: 'Guardian Angel',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/C-FmlvV9JWI', spanish: 'https://www.youtube.com/embed/HhoLRdTxTYc', urdu: ''},
		videoTitles: {asl: '', english: 'Guardian Angel | Daisy and Sheep', spanish: 'Ángel de la Guarda | Daisy and Sheep', urdu: ''},
		year: '2024'
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '', answerThumbnailLink: '', pdfLink: '/printables/daisyandsheep/Gospel As Living Word.pdf', thumbnailLink: '/assets/images/daisyandsheep/gospelaslivingword.png'},
		duration: '1 min',
		isDisabled: false,
		isFundraising: false,
		link: '/animations/daisyandsheep/1/gospelaslivingword',
		releaseDate: $elm$time$Time$millisToPosix(1728136800000),
		thumbnail: '/assets/images/AnimationImageLinks/GospelAsLivingWord.webp',
		title: 'Gospel as Living Word',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/G-Yz76BrIvo', spanish: 'https://www.youtube.com/embed/nEv2wpyFpwk', urdu: ''},
		videoTitles: {asl: '', english: 'Gospel As Living Word | Daisy and Sheep', spanish: 'Gospel As Living Word | Daisy and Sheep', urdu: ''},
		year: '2024'
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '/printables/daisyandsheep/Mary Apparitions Answers.pdf', answerThumbnailLink: '/assets/images/daisyandsheep/maryapparitionsanswers.png', pdfLink: '/printables/daisyandsheep/Mary Apparitions.pdf', thumbnailLink: '/assets/images/daisyandsheep/maryapparitions.png'},
		duration: '1 min',
		isDisabled: false,
		isFundraising: false,
		link: '/animations/daisyandsheep/1/marymymother',
		releaseDate: $elm$time$Time$millisToPosix(1728136800000),
		thumbnail: '/assets/images/AnimationImageLinks/MaryApparitions.webp',
		title: 'Mary My Mother',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/w_v9goHWsNs', spanish: 'https://www.youtube.com/embed/LLDGWewq1lM', urdu: ''},
		videoTitles: {asl: '', english: 'Mary, my mother | Daisy and Sheep', spanish: 'Mary, my mother | Daisy and Sheep', urdu: ''},
		year: '2024'
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '', answerThumbnailLink: '', pdfLink: '/printables/daisyandsheep/Prayer of the Faithful.pdf', thumbnailLink: '/assets/images/daisyandsheep/prayerofthefaithful.png'},
		duration: '1 min',
		isDisabled: false,
		isFundraising: false,
		link: '/animations/daisyandsheep/1/prayerofthefaithful',
		releaseDate: $elm$time$Time$millisToPosix(1728741600000),
		thumbnail: '/assets/images/AnimationImageLinks/PrayerOfTheFaithful.webp',
		title: 'Prayer of the Faithful',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/Khn3A6UFCXg', spanish: 'https://www.youtube.com/embed/vURcMiGvR9s', urdu: ''},
		videoTitles: {asl: '', english: 'Prayer of the Faithful | Daisy and Sheep', spanish: 'Prayer of the Faithful | Daisy and Sheep', urdu: ''},
		year: '2024'
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '/printables/daisyandsheep/Communion of Saints Answers.pdf', answerThumbnailLink: '/assets/images/daisyandsheep/communionofsaintsanswers.png', pdfLink: '/printables/daisyandsheep/Communion of Saints.pdf', thumbnailLink: '/assets/images/daisyandsheep/communionofsaints.png'},
		duration: '1 min',
		isDisabled: false,
		isFundraising: false,
		link: '/animations/daisyandsheep/1/communionofsaints',
		releaseDate: $elm$time$Time$millisToPosix(1729000800000),
		thumbnail: '/assets/images/AnimationImageLinks/CommunionOfSaints.webp',
		title: 'Communion of Saints',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/cbb2iRzz9pc', spanish: 'https://www.youtube.com/embed/3o5bCo0gQyM', urdu: ''},
		videoTitles: {asl: '', english: 'Communion of Saints | Daisy and Sheep', spanish: 'Communion of Saints | Daisy and Sheep', urdu: ''},
		year: '2024'
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '/printables/daisyandsheep/Eucharistic Wine Answers.pdf', answerThumbnailLink: '/assets/images/daisyandsheep/eucharisticwineanswers.png', pdfLink: '/printables/daisyandsheep/Eucharistic Wine.pdf', thumbnailLink: '/assets/images/daisyandsheep/eucharisticwine.png'},
		duration: '1 min',
		isDisabled: false,
		isFundraising: false,
		link: '/animations/daisyandsheep/1/eucharisticwine',
		releaseDate: $elm$time$Time$millisToPosix(1729000800000),
		thumbnail: '/assets/images/AnimationImageLinks/EucharisticWine.webp',
		title: 'Eucharistic Wine',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/u-hMEMTnfVY', spanish: 'https://www.youtube.com/embed/8RTTl5yKQEg', urdu: ''},
		videoTitles: {asl: '', english: 'Eucharistic Wine | Daisy and Sheep', spanish: 'Eucharistic Wine | Daisy and Sheep', urdu: ''},
		year: '2024'
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '/printables/daisyandsheep/Pope Names Answers.pdf', answerThumbnailLink: '/assets/images/daisyandsheep/popenamesanswers.png', pdfLink: '/printables/daisyandsheep/Pope Names.pdf', thumbnailLink: '/assets/images/daisyandsheep/popenames.png'},
		duration: '1 min',
		isDisabled: false,
		isFundraising: false,
		link: '/animations/daisyandsheep/1/popenames',
		releaseDate: $elm$time$Time$millisToPosix(1729605600000),
		thumbnail: '/assets/images/AnimationImageLinks/PopeNames.webp',
		title: 'Pope Names',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/rijyDOxbcbo', spanish: 'https://www.youtube.com/embed/XmzSx4vMne0', urdu: ''},
		videoTitles: {asl: '', english: 'Pope Names | Daisy and Sheep', spanish: 'Pope Names | Daisy and Sheep', urdu: ''},
		year: '2024'
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '/printables/daisyandsheep/Preparing The Altar Answers.pdf', answerThumbnailLink: '/assets/images/daisyandsheep/preparingthealtaranswers.png', pdfLink: '/printables/daisyandsheep/Preparing the Altar.pdf', thumbnailLink: '/assets/images/daisyandsheep/preparingthealtar.png'},
		duration: '1 min',
		isDisabled: false,
		isFundraising: false,
		link: '/animations/daisyandsheep/1/preparingthealtar',
		releaseDate: $elm$time$Time$millisToPosix(1729951200000),
		thumbnail: '/assets/images/AnimationImageLinks/PreparingTheAltar.webp',
		title: 'Preparing the Altar',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/8ql_OwO4JjI', spanish: 'https://www.youtube.com/embed/-pwWI-xypn4', urdu: ''},
		videoTitles: {asl: '', english: 'Preparing the Altar | Daisy and Sheep', spanish: 'Preparing the Altar | Daisy and Sheep', urdu: ''},
		year: '2024'
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '', answerThumbnailLink: '', pdfLink: '/printables/daisyandsheep/Being a Saint.pdf', thumbnailLink: '/assets/images/daisyandsheep/beingasaint.png'},
		duration: '1 min',
		isDisabled: false,
		isFundraising: false,
		link: '/animations/daisyandsheep/1/beingasaint',
		releaseDate: $elm$time$Time$millisToPosix(1729951200000),
		thumbnail: '/assets/images/AnimationImageLinks/BeingASaint.webp',
		title: 'Being a Saint',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/-XrR2uYSyWg', spanish: 'https://www.youtube.com/embed/ECA41xh2qTY', urdu: ''},
		videoTitles: {asl: '', english: 'Being a Saint | Daisy and Sheep', spanish: 'Being a Saint | Daisy and Sheep', urdu: ''},
		year: '2024'
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '', answerThumbnailLink: '', pdfLink: '', thumbnailLink: ''},
		duration: '1 min',
		isDisabled: false,
		isFundraising: false,
		link: '/animations/daisyandsheep/1/holyholyholy',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: '/assets/images/AnimationImageLinks/HolyHolyHoly.webp',
		title: 'Holy Holy Holy',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/Zpde2k4gvPc', spanish: 'https://www.youtube.com/embed/rihM8lIOKKg', urdu: ''},
		videoTitles: {asl: '', english: 'Holy Holy Holy | Daisy and Sheep', spanish: 'Holy Holy Holy | Daisy and Sheep', urdu: ''},
		year: '2024'
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '/printables/daisyandsheep/Doctors of the Church Answers.pdf', answerThumbnailLink: '/assets/images/daisyandsheep/doctorofthechurchanswers.png', pdfLink: '/printables/daisyandsheep/Doctors of the Church.pdf', thumbnailLink: '/assets/images/daisyandsheep/doctorofthechurch.png'},
		duration: '1 min',
		isDisabled: false,
		isFundraising: false,
		link: '/animations/daisyandsheep/1/doctorsofthechurch',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: '/assets/images/AnimationImageLinks/DoctorOfTheChurch.webp',
		title: 'Doctors of the Church',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/rupDa-FbT2E', spanish: 'https://www.youtube.com/embed/0xOCqUbtlqA', urdu: ''},
		videoTitles: {asl: '', english: 'Doctors of the Church | Daisy and Sheep', spanish: 'Doctors of the Church | Daisy and Sheep', urdu: ''},
		year: '2024'
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '/printables/daisyandsheep/TheDewfallAnswers.pdf', answerThumbnailLink: '/assets/images/daisyandsheep/thedewfallanswers.png', pdfLink: '/printables/daisyandsheep/TheDewfall.pdf', thumbnailLink: '/assets/images/daisyandsheep/thedewfall.png'},
		duration: '1 min',
		isDisabled: false,
		isFundraising: false,
		link: '/animations/daisyandsheep/1/dewfall',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: '/assets/images/AnimationImageLinks/Dewfall.webp',
		title: 'Dewfall',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/KjNv5g0B7Bk', spanish: 'https://www.youtube.com/embed/YRG4D4P0UA8', urdu: ''},
		videoTitles: {asl: '', english: 'The Dewfall | Daisy and Sheep', spanish: 'The Dewfall | Daisy and Sheep', urdu: ''},
		year: '2024'
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '/printables/daisyandsheep/SacramentsAnswers.pdf', answerThumbnailLink: '/assets/images/daisyandsheep/sacramentsanswers.png', pdfLink: '/printables/daisyandsheep/Sacraments.pdf', thumbnailLink: '/assets/images/daisyandsheep/sacraments.png'},
		duration: '1 min',
		isDisabled: false,
		isFundraising: false,
		link: '/animations/daisyandsheep/1/thesacraments',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: '/assets/images/AnimationImageLinks/Sacraments.webp',
		title: 'The Sacraments',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/BF1kL8R075M', spanish: 'https://www.youtube.com/embed/mID8IVUWlf4', urdu: ''},
		videoTitles: {asl: '', english: 'The Sacraments | Daisy and Sheep', spanish: 'The Sacraments | Daisy and Sheep', urdu: ''},
		year: '2024'
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '/printables/daisyandsheep/LambOfGodAnswers.pdf', answerThumbnailLink: '/assets/images/daisyandsheep/lambofgodanswers.png', pdfLink: '/printables/daisyandsheep/LambOfGod.pdf', thumbnailLink: '/assets/images/daisyandsheep/lambofgod.png'},
		duration: '1 min',
		isDisabled: false,
		isFundraising: false,
		link: '/animations/daisyandsheep/1/thelambofgod',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: '/assets/images/AnimationImageLinks/LambOfGod.webp',
		title: 'The Lamb of God',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/EpCX6CmlR0I', spanish: 'https://www.youtube.com/embed/19Ty4oGCkI0', urdu: ''},
		videoTitles: {asl: '', english: 'Lamb of God | Daisy and Sheep', spanish: 'Lamb of God | Daisy and Sheep', urdu: ''},
		year: '2024'
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '/printables/daisyandsheep/The7GiftsAnswers.pdf', answerThumbnailLink: '/assets/images/daisyandsheep/the7giftsanswers.png', pdfLink: '/printables/daisyandsheep/The7Gifts.pdf', thumbnailLink: '/assets/images/daisyandsheep/the7gifts.png'},
		duration: '1 min',
		isDisabled: false,
		isFundraising: false,
		link: '/animations/daisyandsheep/1/the7gifts',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: '/assets/images/AnimationImageLinks/The7Gifts.webp',
		title: 'The 7 Gifts',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/9oCveljpiMA', spanish: 'https://www.youtube.com/embed/TrZNL11Jpvs', urdu: ''},
		videoTitles: {asl: '', english: 'The 7 Gifts | Daisy and Sheep', spanish: 'The 7 Gifts | Daisy and Sheep', urdu: ''},
		year: '2024'
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '', answerThumbnailLink: '', pdfLink: '/printables/daisyandsheep/Transubstantiation.pdf', thumbnailLink: '/assets/images/daisyandsheep/transubstantiation.png'},
		duration: '1 min',
		isDisabled: false,
		isFundraising: false,
		link: '/animations/daisyandsheep/1/transubstantiation',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: '/assets/images/AnimationImageLinks/Transubstantiation.webp',
		title: 'Transubstantiation',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/16ms4F1PIaE', spanish: 'https://www.youtube.com/embed/DAWC8VYmgm0', urdu: ''},
		videoTitles: {asl: '', english: 'Transubstantiation | Daisy and Sheep', spanish: 'Transubstantiation | Daisy and Sheep', urdu: ''},
		year: '2024'
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '', answerThumbnailLink: '', pdfLink: '/printables/daisyandsheep/ashwednesday.pdf', thumbnailLink: '/assets/images/daisyandsheep/ashwednesday.png'},
		duration: '1 min',
		isDisabled: false,
		isFundraising: false,
		link: '/animations/daisyandsheep/1/ashwednesday',
		releaseDate: $elm$time$Time$millisToPosix(1732633200000),
		thumbnail: '/assets/images/AnimationImageLinks/AshWednesday.webp',
		title: 'Ash Wednesday',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/5AEzncj0UIk', spanish: 'https://www.youtube.com/embed/NEiFT8ewEw0', urdu: ''},
		videoTitles: {asl: '', english: 'Ash Wednesday | Daisy and Sheep', spanish: 'Ash Wednesday | Daisy and Sheep', urdu: ''},
		year: '2024'
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '/printables/daisyandsheep/liturgicalcolorsanswers.pdf', answerThumbnailLink: '/assets/images/daisyandsheep/liturgicalcolorsanswers.png', pdfLink: '/printables/daisyandsheep/liturgicalcolors.pdf', thumbnailLink: '/assets/images/daisyandsheep/liturgicalcolors.png'},
		duration: '1 min',
		isDisabled: false,
		isFundraising: false,
		link: '/animations/daisyandsheep/1/liturgicalcolors',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: '/assets/images/AnimationImageLinks/LiturgicalColors.webp',
		title: 'Liturgical Colors',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/VHgrRVss19g', spanish: 'https://www.youtube.com/embed/BwbvZLdnPmU', urdu: ''},
		videoTitles: {asl: '', english: 'Liturgical Colors | Daisy and Sheep', spanish: 'Liturgical Colors | Daisy and Sheep', urdu: ''},
		year: '2024'
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '/printables/daisyandsheep/easteranswers.pdf', answerThumbnailLink: '/assets/images/daisyandsheep/easteranswers.png', pdfLink: '/printables/daisyandsheep/easter.pdf', thumbnailLink: '/assets/images/daisyandsheep/easter.png'},
		duration: '1 min',
		isDisabled: false,
		isFundraising: false,
		link: '/animations/daisyandsheep/1/easter',
		releaseDate: $elm$time$Time$millisToPosix(1733238000000),
		thumbnail: '/assets/images/AnimationImageLinks/Easter.webp',
		title: 'Easter',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/J1QydSx3N5M', spanish: 'https://www.youtube.com/embed/0Epu9Gu4UvQ', urdu: ''},
		videoTitles: {asl: '', english: 'Easter | Daisy and Sheep', spanish: 'Easter | Daisy and Sheep', urdu: ''},
		year: '2024'
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '', answerThumbnailLink: '', pdfLink: '', thumbnailLink: ''},
		duration: '1 min',
		isDisabled: false,
		isFundraising: false,
		link: '/animations/daisyandsheep/1/vaticanbank',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: '/assets/images/AnimationImageLinks/VaticanBank.webp',
		title: 'Vatican Bank',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/hiVG7LS3sTQ', spanish: 'https://www.youtube.com/embed/apbCO8i9azI', urdu: ''},
		videoTitles: {asl: '', english: 'Vatican Bank | Daisy and Sheep', spanish: 'Vatican Bank | Daisy and Sheep', urdu: ''},
		year: '2024'
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		activities: {answerPdfLink: '', answerThumbnailLink: '', pdfLink: '', thumbnailLink: ''},
		duration: '1 min',
		isDisabled: false,
		isFundraising: false,
		link: '/animations/daisyandsheep/1/churchmeaning',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: '/assets/images/AnimationImageLinks/ChurchMeaning.webp',
		title: 'Church Meaning',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/mvbDFeU0Z2U', spanish: 'https://www.youtube.com/embed/EN_pyJnAmzs', urdu: ''},
		videoTitles: {asl: '', english: 'Church Meaning | Daisy and Sheep', spanish: 'Church Meaning | Daisy and Sheep', urdu: ''},
		year: '2024'
	}
	]);
var $author$project$Page$Animations$DaisyAndSheep$DASEpisodes$seasons = _List_fromArray(
	[
		{
		description: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		episodes: $author$project$Page$Animations$DaisyAndSheep$DASEpisodes$episodes,
		number: 1
	}
	]);
var $elm$html$Html$a = _VirtualDom_node('a');
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
var $elm$html$Html$h1 = _VirtualDom_node('h1');
var $elm$html$Html$h2 = _VirtualDom_node('h2');
var $elm$html$Html$h3 = _VirtualDom_node('h3');
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$heading = F2(
	function (lvl, title) {
		switch (lvl) {
			case 1:
				return A2(
					$elm$html$Html$h1,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mb-6')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(title)
						]));
			case 2:
				return A2(
					$elm$html$Html$h2,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mb-4 mt-12 leading-relaxed')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(title)
						]));
			case 3:
				return A2(
					$elm$html$Html$h3,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mb-4 mt-8 font-bold')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(title)
						]));
			default:
				return A2(
					$elm$html$Html$h3,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mb-4 mt-8')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(title)
						]));
		}
	});
var $elm$html$Html$Attributes$href = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var $elm$html$Html$li = _VirtualDom_node('li');
var $elm$html$Html$ol = _VirtualDom_node('ol');
var $elm$html$Html$p = _VirtualDom_node('p');
var $author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$para = function (s) {
	return A2(
		$elm$html$Html$p,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('mb-6')
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(s)
			]));
};
var $author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$sep = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('my-8 border-t border-gray-200')
		]),
	_List_Nil);
var $elm$html$Html$strong = _VirtualDom_node('strong');
var $elm$html$Html$ul = _VirtualDom_node('ul');
var $author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$aboutTheAnimation = A2(
	$elm$html$Html$div,
	_List_Nil,
	_List_fromArray(
		[
			A2($author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$heading, 2, 'Introduction: A Melody of Faith and Gratitude'),
			$author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$para('The animated short film Giggles and Grace: Thank You Lord invites viewers into a world filled with light, laughter, and song. It’s not just a musical—it’s a prayer in motion. This special episode teaches the beauty of morning thanks and gratitude to God, even when the comb gets stuck, shoes go missing, or a broken down car slows you down. Through catchy melodies and tender storytelling, the film reminds us that grace often hides in life’s small, imperfect moments.'),
			$author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$para('At its heart, Thank You Lord captures the simple joy of saying “thank you, God” for everything—the sunshine and the storms alike.'),
			$author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$sep,
			A2($author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$heading, 3, 'The Heart of Thank You Lord: A Musical Message of Hope'),
			$author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$para('Every Giggles and Grace episode carries a moral woven with music, but Thank You Lord strikes a special chord. The story unfolds as the family prepares for Sunday Mass—a day meant for reflection and renewal. Yet, chaos brews: slipping on skateboards, breakfast food fights, and missing shoes. Amid the small frustrations, we sing a tune of gratitude. An innocent song transforms the morning from hurried to holy.'),
			$author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$para('The episode reveals a profound truth: worship begins long before stepping into church—it starts with morning gratitude.'),
			$author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$sep,
			A2($author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$heading, 2, 'Plot Overview: Giving Thanks in Every Season'),
			A2($author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$heading, 3, 'Morning Thanks: Waking Up with Gratitude'),
			$author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$para('The film opens with the family waking up to a bright, slightly messy morning. Instead of grumbling, they begin their day with a thank you prayer—a cheerful chant of thanks for the sun rising in the morning, the birds singing at the window, and the new day. It’s a moment that shows how a simple habit of morning thanks can shift the mood of an entire day.'),
			A2($author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$heading, 3, 'Getting Ready for Mass: A Family’s Sunday Morning Journey'),
			$author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$para('While dressing up and searching for shoes, this family reminds each other to stay calm and thankful. The parents lead the kids in grateful prayer to God, showing that faith isn’t just about rituals—it’s about grace under pressure and laughter in chaos.'),
			A2($author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$heading, 3, 'When Things Go Wrong: Finding Joy in Imperfection'),
			$author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$para('The climax arrives when everything seems to fall apart—they make it out of the house, yet the car breaks down. Instead of giving up, the family sings the “Thank You Lord” song, choosing joy over frustration. The lesson is luminous: gratitude is most powerful when life is least perfect.'),
			$author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$sep,
			A2($author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$heading, 2, 'The Music of Gratitude: Songs that Lift the Soul'),
			A2($author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$heading, 3, 'The “Thank You Lord” Song: A Gratitude Anthem'),
			$author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$para('At the film’s emotional peak, the family joins voices in a lively gratitude song that celebrates faith and family. Its refrain—“Thank You, Lord!”—echoes the psalms of thanksgiving and invites viewers to sing along. The melody lingers long after the credits roll, inspiring real-life moments of worship.'),
			A2($author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$heading, 3, 'Gratitude Songwriting: Turning Prayers into Music'),
			$author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$para('Behind the scenes, the songwriters drew inspiration from real morning routines, turning small frustrations into lyrical blessings. Their goal: to make children and adults alike hum their thank you Lord prayer on their way to school, work, or Church.'),
			$author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$sep,
			A2($author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$heading, 2, 'Gratitude in Scripture: Lessons that Inspire the Story'),
			A2($author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$heading, 3, 'Biblical Foundations of Thanksgiving'),
			$author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$para('The story of Thank You Lord echoes scriptural truths found in 1 Thessalonians 5:18—“Give thanks in all circumstances.” This verse anchors the episode’s theme: gratitude isn’t optional or situational—it’s transformational.'),
			A2($author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$heading, 3, 'Gratitude Prayer to God: From the Psalms to Modern Life'),
			$author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$para('Psalms like 100 and 118 remind us to “Enter His gates with thanksgiving.” The film translates these timeless verses into animation and melody, bridging ancient scripture and modern storytelling. Each frame, each lyric, becomes a living thank you prayer.'),
			$author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$sep,
			A2($author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$heading, 2, 'Animation with Purpose: Bringing Faith to Life for Children'),
			A2($author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$heading, 3, 'The Visual Style of Giggles and Grace'),
			$author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$para('The animation bursts with color and movement, designed to reflect the warmth of divine joy. Every sunbeam and giggle is a brushstroke of God’s light, inviting children into the world of faith through laughter.'),
			A2($author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$heading, 3, 'How the Characters Teach Morning Gratitude'),
			$author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$para('The family\'s boundless optimism and nurturing wisdom make for a perfect model. Their actions embody morning gratitude, showing that even small acts—like helping a sibling—can be prayers of thanks.'),
			$author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$sep,
			A2($author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$heading, 2, 'Behind the Scenes: The Creative Journey of Thank You Lord'),
			A2($author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$heading, 3, 'Inspiration and Concept Development'),
			$author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$para('The creators wanted a story that felt both relatable and sacred. The everyday chaos of getting ready for Mass became the perfect canvas for a faith-filled comedy.'),
			A2($author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$heading, 3, 'Blending Faith, Humor, and Heart'),
			$author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$para('Unlike traditional religious shows, Giggles and Grace uses humor as a vessel for theology. The laughter isn’t separate from faith—it’s part of it.'),
			$author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$sep,
			A2($author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$heading, 2, 'The Power of a Thank You Lord Prayer in Daily Life'),
			A2($author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$heading, 3, 'A Simple Morning Thanks Ritual'),
			$author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$para('The film encourages viewers to begin each day with a few simple words: “Thank you, Lord.” Whether over breakfast or during a commute, this daily gratitude turns ordinary routines into sacred rhythms.'),
			A2($author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$heading, 3, 'Gratitude in Family Life and Worship'),
			$author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$para('By sharing morning thanks together, families strengthen both their faith and their bond. Gratitude becomes a shared song, a tradition that extends beyond Sunday.'),
			$author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$sep,
			A2($author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$heading, 2, 'Impact: How Giggles and Grace Inspires Viewers of All Ages'),
			A2($author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$heading, 3, 'Building Faith Through Fun'),
			$author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$para('Children learn theology best through story and song. Thank You Lord turns faith lessons into joyful, memorable experiences that stick.'),
			A2($author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$heading, 3, 'Encouraging Thankfulness Beyond the Screen'),
			$author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$para('Parents report that their kids start singing the thank you God tune at breakfast or bedtime. The story lives on—not just as entertainment, but as devotion.'),
			$author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$sep,
			A2($author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$heading, 2, 'FAQs about Giggles and Grace: Thank You Lord'),
			A2(
			$elm$html$Html$ol,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('list-decimal list-inside space-y-6')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$li,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$strong,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('What is the main message of the episode?')
								])),
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('mt-2')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('It teaches children (and adults) to thank God in every situation, even when life feels messy or hard.')
								]))
						])),
					A2(
					$elm$html$Html$li,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$strong,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Is the \"Thank You Lord\" song available for download or streaming?')
								])),
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('mt-2')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Not at the moment, it is currently only available on YouTube.')
								]))
						])),
					A2(
					$elm$html$Html$li,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$strong,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('How does the show incorporate Scripture?')
								])),
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('mt-2')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Each episode draws from biblical themes like gratitude, kindness, and forgiveness—woven naturally into songs and stories.')
								]))
						])),
					A2(
					$elm$html$Html$li,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$strong,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Who is the target audience?')
								])),
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('mt-2')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Families with children ages 2+, though its message resonates with all ages.')
								]))
						])),
					A2(
					$elm$html$Html$li,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$strong,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('What inspired the creators to focus on gratitude?')
								])),
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('mt-2')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('They wanted to remind viewers that gratitude is the heartbeat of faith, especially during life\'s small challenges.')
								]))
						])),
					A2(
					$elm$html$Html$li,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$strong,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('How can parents use this episode for family devotion?')
								])),
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('mt-2')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('By watching together and discussing what they\'re thankful for each morning or after Mass.')
								]))
						]))
				])),
			$author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$sep,
			A2($author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$heading, 2, 'Conclusion: Singing Thank You Lord in Every Moment'),
			$author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$para('Giggles and Grace: Thank You Lord transforms everyday chaos into holy celebration. Its message is timeless: gratitude isn’t just something you feel—it’s something you live and sing. In every burned breakfast, missed bus, or rainy morning, there’s still room to say, “Thank you, Lord.”'),
			$author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$para('Faith, after all, begins with a song of thanks.'),
			$author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$sep,
			A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$strong,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('Blog posts:')
						])),
					A2(
					$elm$html$Html$ul,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('space-y-2')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$li,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$a,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$href('https://blog.claritasstudios.com/p/its-here-giggles-and-grace-is-now'),
											$elm$html$Html$Attributes$class('underline')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('🎉 It’s Here! Giggles & Grace is Now Out! 🎉')
										]))
								])),
							A2(
							$elm$html$Html$li,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$a,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$href('https://blog.claritasstudios.com/p/what-happens-when-mass-meets-music'),
											$elm$html$Html$Attributes$class('underline')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('What Happens When Mass Meets Music and Giggles?')
										]))
								])),
							A2(
							$elm$html$Html$li,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$a,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$href('https://blog.claritasstudios.com/p/giggles-and-grace-catholic-musical'),
											$elm$html$Html$Attributes$class('underline')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Giggles & Grace Catholic Musical Short for Kids Inspired by Family Life')
										]))
								])),
							A2(
							$elm$html$Html$li,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$a,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$href('https://blog.claritasstudios.com/p/behind-the-scenes-how-our-sing-along'),
											$elm$html$Html$Attributes$class('underline')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Behind the Scenes: How Our Sing-Along Animation Came to Life')
										]))
								]))
						]))
				]))
		]));
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
var $elm$html$Html$iframe = _VirtualDom_node('iframe');
var $elm$html$Html$Attributes$src = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'src',
		_VirtualDom_noJavaScriptOrHtmlUri(url));
};
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $author$project$Page$Signup$view2 = A2(
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
					$elm$html$Html$Attributes$src('https://blog.claritasstudios.com/embed'),
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
var $author$project$Page$Signup$view4 = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('flex justify-center py-3 text-black')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-center grid justify-center mb-10')
				]),
			_List_fromArray(
				[$author$project$Page$Signup$view2]))
		]));
var $author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$episodes = _List_fromArray(
	[
		{
		about: A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[$author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$aboutTheAnimation, $author$project$Page$Signup$view4])),
		activities: {answerPdfLink: '', answerThumbnailLink: '', pdfLink: '', thumbnailLink: ''},
		duration: '3 min',
		isDisabled: false,
		isFundraising: false,
		link: '/animations/gigglesandgraceshow',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: '/assets/images/AnimationImageLinks/GigglesAndGrace.webp',
		title: 'Giggles and Grace: Thank You Lord – A Joyful Musical About Morning Thanks and Gratitude to God',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/videoseries?si=XYQhWXRqpZt3xVRu&amp;list=PL0_XgmxOXie_fE6aRjAfgxF7ngGP66fcZ&loop=1&autoplay=1', spanish: '', urdu: ''},
		videoTitles: {asl: '', english: 'Thank You Lord', spanish: '', urdu: ''},
		year: '2025'
	}
	]);
var $author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$seasons = _List_fromArray(
	[
		{
		description: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		episodes: $author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$episodes,
		number: 1
	}
	]);
var $author$project$Page$Animations$HailMary$HMEpisodes$aboutTheAnimation = A2(
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
							$elm$html$Html$text('Here is just one example of how we do this at Claritas Studios.')
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
var $author$project$Page$Animations$HailMary$HMEpisodes$aboutThePrayer = A2(
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
var $author$project$Page$Animations$HailMary$HMEpisodes$moreAboutTheAnimation = A2(
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
					$elm$html$Html$text('Here at Claritas Studios, our animated stories cover prayer, including the Hail Mary prayer (above), the St Michael prayer, and the prayer to your Guardian Angel. These animations also explore the virtues, such as humility, faith, and compassion. Each story is carefully crafted to ensure that it is both engaging and educational.')
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
var $elm$html$Html$Attributes$alt = $elm$html$Html$Attributes$stringProperty('alt');
var $elm$html$Html$img = _VirtualDom_node('img');
var $author$project$Page$Animations$HailMary$HMEpisodes$viewAnotherPage = A2(
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
var $author$project$Page$Animations$HailMary$HMEpisodes$viewPrayer = A2(
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
var $author$project$Page$Team$Team$imagePath = '/assets/Team/';
var $author$project$Page$Team$Team$trevor = {description: 'Trevor is a former software engineer. He received his ' + ('MA in Theology at the Franciscan University of Steubenville. ' + 'He founded Claritas Studios to spread the light and love of God through animated stories that kids will love.'), image: $author$project$Page$Team$Team$imagePath + 'TrevorRothaus.jpeg', initials: '', name: 'Trevor Rothaus', position: 'Founder and CEO', socials: _List_Nil};
var $author$project$Theme$Colors$darkPurple = '#B99EDA';
var $author$project$Page$Team$Team$viewImage = F2(
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
					A2($elm$html$Html$Attributes$style, 'background-color', $author$project$Theme$Colors$darkPurple)
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
					A2($elm$html$Html$Attributes$attribute, 'aria-hidden', 'true')
				]),
			_List_Nil);
	});
var $author$project$Page$Team$Team$viewPersonImage = function (person) {
	return A2($author$project$Page$Team$Team$viewImage, person.image, person.initials);
};
var $author$project$Page$Animations$HailMary$HMEpisodes$viewResources = A2(
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
					$author$project$Page$Team$Team$viewPersonImage($author$project$Page$Team$Team$trevor)
				]))
		]));
var $author$project$Page$Animations$HailMary$HMEpisodes$episodes = _List_fromArray(
	[
		{
		about: A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[$author$project$Page$Animations$HailMary$HMEpisodes$aboutTheAnimation, $author$project$Page$Animations$HailMary$HMEpisodes$viewPrayer, $author$project$Page$Animations$HailMary$HMEpisodes$moreAboutTheAnimation, $author$project$Page$Signup$view4, $author$project$Page$Animations$HailMary$HMEpisodes$viewResources, $author$project$Page$Animations$HailMary$HMEpisodes$aboutThePrayer, $author$project$Page$Animations$HailMary$HMEpisodes$viewAnotherPage])),
		activities: {answerPdfLink: '/printables/Hail-Mary-Activity-Answers.pdf', answerThumbnailLink: '/assets/images/imagekit/10_1__s3i8dhFiH.png', pdfLink: '/printables/Hail-Mary-Activities.pdf', thumbnailLink: '/assets/images/imagekit/9_1__-d-EPYcuW.png'},
		duration: '3 min',
		isDisabled: false,
		isFundraising: false,
		link: '/animations/hailmary',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: '/assets/images/AnimationImageLinks/HailMary.webp',
		title: 'Hail Mary',
		videoLinks: {asl: 'https://www.youtube.com/embed/QNVNbLiqznI?playlist=QNVNbLiqznI&loop=1', english: 'https://www.youtube.com/embed/HW0DzGEoa1Y?playlist=HW0DzGEoa1Y&loop=1', spanish: '', urdu: 'https://www.youtube.com/embed/NN7gd5xqDw8?si=tUB20FMCCdN2Mafx'},
		videoTitles: {asl: '', english: 'Hail Mary Animation', spanish: '', urdu: ''},
		year: '2020'
	}
	]);
var $author$project$Page$Animations$HailMary$HMEpisodes$seasons = _List_fromArray(
	[
		{
		description: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		episodes: $author$project$Page$Animations$HailMary$HMEpisodes$episodes,
		number: 1
	}
	]);
var $author$project$Page$Animations$ActOfContrition$Description$aboutTheAnimation = A2(
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
var $author$project$Page$Animations$ActOfContrition$Description$aboutThePrayer = A2(
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
var $author$project$Page$Animations$ActOfContrition$Description$viewAnotherPage = A2(
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
var $author$project$Page$Animations$ActOfContrition$Description$viewPrayer = A2(
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
var $author$project$Page$Animations$ActOfContrition$Description$viewAbout = A2(
	$elm$html$Html$div,
	_List_Nil,
	_List_fromArray(
		[$author$project$Page$Animations$ActOfContrition$Description$aboutTheAnimation, $author$project$Page$Animations$ActOfContrition$Description$viewPrayer, $author$project$Page$Animations$ActOfContrition$Description$aboutThePrayer, $author$project$Page$Animations$ActOfContrition$Description$viewAnotherPage]));
var $author$project$Page$Animations$StMichael$Description$aboutTheAnimation = A2(
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
var $author$project$Page$Animations$StMichael$Description$aboutThePrayer = A2(
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
var $author$project$Page$Animations$StMichael$Description$viewAnotherPage = A2(
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
							$elm$html$Html$Attributes$src('/assets/images/AnimationImageLinks/PTWA/AOC.webp'),
							A2($elm$html$Html$Attributes$style, 'border-radius', '5px'),
							A2($elm$html$Html$Attributes$style, 'width', '-webkit-fill-available'),
							$elm$html$Html$Attributes$alt('Act of Contrition Animation')
						]),
					_List_Nil)
				]))
		]));
var $author$project$Page$Animations$StMichael$Description$viewPrayer = A2(
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
var $author$project$Page$Animations$StMichael$Description$viewPrayerHistory = A2(
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
var $author$project$Page$Animations$StMichael$Description$viewStoryHistory = A2(
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
var $author$project$Page$Animations$StMichael$Description$viewAbout = A2(
	$elm$html$Html$div,
	_List_Nil,
	_List_fromArray(
		[$author$project$Page$Animations$StMichael$Description$aboutTheAnimation, $author$project$Page$Animations$StMichael$Description$viewPrayer, $author$project$Page$Animations$StMichael$Description$aboutThePrayer, $author$project$Page$Animations$StMichael$Description$viewPrayerHistory, $author$project$Page$Animations$StMichael$Description$viewStoryHistory, $author$project$Page$Animations$StMichael$Description$viewAnotherPage]));
var $author$project$Page$Animations$GuardianAngel$Description$aboutTheAnimation = A2(
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
var $author$project$Page$Animations$GuardianAngel$Description$magisterialTeachings = A2(
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
var $author$project$Page$Animations$GuardianAngel$Description$scripture = A2(
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
var $author$project$Page$Animations$GuardianAngel$Description$tradition = A2(
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
var $author$project$Page$Animations$GuardianAngel$Description$viewAnotherPage = A2(
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
var $author$project$Page$Animations$GuardianAngel$Description$viewPrayer = A2(
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
var $author$project$Page$Animations$GuardianAngel$Description$viewGuardianAngelDescription = A2(
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
				[$author$project$Page$Animations$GuardianAngel$Description$aboutTheAnimation, $author$project$Page$Animations$GuardianAngel$Description$viewPrayer, $author$project$Page$Animations$GuardianAngel$Description$scripture, $author$project$Page$Animations$GuardianAngel$Description$tradition, $author$project$Page$Animations$GuardianAngel$Description$magisterialTeachings, $author$project$Page$Animations$GuardianAngel$Description$viewAnotherPage]))
		]));
var $author$project$Page$Animations$PrayerTimeWithAngels$PTWAEpisodes$episodes = _List_fromArray(
	[
		{
		about: $author$project$Page$Animations$GuardianAngel$Description$viewGuardianAngelDescription,
		activities: {answerPdfLink: 'printables/Guardian-Angel-Activity-Answers.pdf', answerThumbnailLink: '/assets/images/imagekit/Guardian_Angel_Activities_Answers_3__-3FACN8K8.png', pdfLink: 'printables/Guardian-Angel-Activities.pdf', thumbnailLink: '/assets/images/imagekit/Guardian_Angel_Activity_Cover_1__vNBJQA8Y8.png'},
		duration: '5 min',
		isDisabled: false,
		isFundraising: false,
		link: '/animations/prayertimewithangels/1/guardianangelprayer',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: '/assets/images/AnimationImageLinks/PTWA/GuardianAngelPrayer.webp',
		title: 'Guardian Angel Prayer',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/videoseries?list=PL0_XgmxOXie8KX7A9KSkb3Akx8H3JT6hg&loop=1&autoplay=1', spanish: '', urdu: 'https://www.youtube.com/embed/uG7xjTRSSaI'},
		videoTitles: {asl: '', english: 'Guardian Angel', spanish: '', urdu: ''},
		year: '2023'
	},
		{
		about: $author$project$Page$Animations$StMichael$Description$viewAbout,
		activities: {answerPdfLink: '/printables/Saint-Michael-Activity-Answers.pdf', answerThumbnailLink: '/assets/images/imagekit/Saint_Michael_Activity_Answers_3__I3WnUgIL6.png', pdfLink: '/printables/Saint-Michael-Activities.pdf', thumbnailLink: '/assets/images/imagekit/Saint_Michael_Activity_Cover_J2Qt-zF3t.png'},
		duration: '4 min',
		isDisabled: false,
		isFundraising: false,
		link: '/animations/prayertimewithangels/1/saintmichaelprayer',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: '/assets/images/AnimationImageLinks/PTWA/StMichaelPrayer.webp',
		title: 'Saint Michael Prayer',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/y2-SqI_PLv4?si=fAbS7jHGyG8saK1v&loop=1&autoplay=1', spanish: '', urdu: 'https://www.youtube.com/embed/5ROHimFlar8?si=nlttq8zg2KthJSE1'},
		videoTitles: {asl: '', english: 'St Michael', spanish: '', urdu: 'St Michael'},
		year: '2023'
	},
		{
		about: $author$project$Page$Animations$ActOfContrition$Description$viewAbout,
		activities: {answerPdfLink: '', answerThumbnailLink: '', pdfLink: '', thumbnailLink: ''},
		duration: '6 min',
		isDisabled: false,
		isFundraising: false,
		link: '/animations/prayertimewithangels/1/actofcontritionprayer',
		releaseDate: $elm$time$Time$millisToPosix(1740150000000),
		thumbnail: '/assets/images/AnimationImageLinks/PTWA/AOC.webp',
		title: 'Act of Contrition Prayer',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/1i3Dx77eMDc?si=SV_xtbUf2iP-8Lxd&loop=1&autoplay=1', spanish: '', urdu: ''},
		videoTitles: {asl: '', english: 'Act of Contrition', spanish: '', urdu: ''},
		year: '2025'
	}
	]);
var $author$project$Page$Animations$PrayerTimeWithAngels$PTWAEpisodes$seasons = _List_fromArray(
	[
		{
		description: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		episodes: $author$project$Page$Animations$PrayerTimeWithAngels$PTWAEpisodes$episodes,
		number: 1
	}
	]);
var $author$project$Page$Animations$PrayingWithTheSaints$PWSEpisodes$episodes = _List_fromArray(
	[
		{
		about: A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[$author$project$Page$Signup$view4])),
		activities: {answerPdfLink: '', answerThumbnailLink: '', pdfLink: '', thumbnailLink: ''},
		duration: '21 min',
		isDisabled: false,
		isFundraising: false,
		link: '/animations/prayingwiththesaints/1/praytheluminousmysterieswithstthereseoflisieux',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: 'https://img.youtube.com/vi/V9tfs8CU1nw/maxresdefault.jpg',
		title: 'Pray the Luminous Mysteries with St Thérèse of Lisieux',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/V9tfs8CU1nw', spanish: '', urdu: ''},
		videoTitles: {asl: '', english: 'Pray the Luminous Mysteries with St Thérèse of Lisieux', spanish: '', urdu: ''},
		year: '2025'
	},
		{
		about: A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[$author$project$Page$Signup$view4])),
		activities: {answerPdfLink: '', answerThumbnailLink: '', pdfLink: '', thumbnailLink: ''},
		duration: '21 min',
		isDisabled: false,
		isFundraising: false,
		link: '/animations/prayingwiththesaints/1/praythesorrowfulmysterieswithstthereseoflisieux',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: 'https://img.youtube.com/vi/RXFcoxLtEgI/maxresdefault.jpg',
		title: 'Pray the Sorrowful Mysteries with St Thérèse of Lisieux',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/RXFcoxLtEgI', spanish: '', urdu: ''},
		videoTitles: {asl: '', english: 'Pray the Sorrowful Mysteries with St Thérèse of Lisieux', spanish: '', urdu: ''},
		year: '2025'
	},
		{
		about: A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[$author$project$Page$Signup$view4])),
		activities: {answerPdfLink: '', answerThumbnailLink: '', pdfLink: '', thumbnailLink: ''},
		duration: '21 min',
		isDisabled: false,
		isFundraising: false,
		link: '/animations/prayingwiththesaints/1/praythejoyfulmysterieswithstthereseoflisieux',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: 'https://img.youtube.com/vi/FpFsFC6tMwo/maxresdefault.jpg',
		title: 'Pray the Joyful Mysteries with St Thérèse of Lisieux',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/FpFsFC6tMwo', spanish: '', urdu: ''},
		videoTitles: {asl: '', english: 'Pray the Joyful Mysteries with St Thérèse of Lisieux', spanish: '', urdu: ''},
		year: '2025'
	},
		{
		about: A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[$author$project$Page$Signup$view4])),
		activities: {answerPdfLink: '', answerThumbnailLink: '', pdfLink: '', thumbnailLink: ''},
		duration: '3 min',
		isDisabled: false,
		isFundraising: false,
		link: '/animations/prayingwiththesaints/1/praytheangeluswithsainttherese',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: 'https://img.youtube.com/vi/KikBDbT9Z3Q/maxresdefault.jpg',
		title: 'Pray the Angelus with Saint Thérèse',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/KikBDbT9Z3Q', spanish: '', urdu: ''},
		videoTitles: {asl: '', english: 'Pray the Angelus with Saint Thérèse', spanish: '', urdu: ''},
		year: '2025'
	},
		{
		about: A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[$author$project$Page$Signup$view4])),
		activities: {answerPdfLink: '', answerThumbnailLink: '', pdfLink: '', thumbnailLink: ''},
		duration: '1 min',
		isDisabled: false,
		isFundraising: false,
		link: '/animations/prayingwiththesaints/1/praythememorarewithsainttherese',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: 'https://img.youtube.com/vi/9aOachJpF9g/maxresdefault.jpg',
		title: 'Pray the Memorare with Saint Thérèse',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/9aOachJpF9g', spanish: '', urdu: ''},
		videoTitles: {asl: '', english: 'Pray the Memorare with Saint Thérèse', spanish: '', urdu: ''},
		year: '2025'
	},
		{
		about: A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[$author$project$Page$Signup$view4])),
		activities: {answerPdfLink: '', answerThumbnailLink: '', pdfLink: '', thumbnailLink: ''},
		duration: '21 min',
		isDisabled: false,
		isFundraising: false,
		link: '/animations/prayingwiththesaints/1/praythegloriousmysterieswithstthereseoflisieux',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: 'https://img.youtube.com/vi/s1anknpeFzw/maxresdefault.jpg',
		title: 'Pray the Glorious Mysteries with St Thérèse of Lisieux',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/s1anknpeFzw', spanish: '', urdu: ''},
		videoTitles: {asl: '', english: 'Pray the Glorious Mysteries with St Thérèse of Lisieux', spanish: '', urdu: ''},
		year: '2025'
	},
		{
		about: A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[$author$project$Page$Signup$view4])),
		activities: {answerPdfLink: '', answerThumbnailLink: '', pdfLink: '', thumbnailLink: ''},
		duration: '1 min',
		isDisabled: false,
		isFundraising: false,
		link: '/animations/prayingwiththesaints/1/praythememorarewithcarloacutis',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: 'https://img.youtube.com/vi/UINgLALfSCs/maxresdefault.jpg',
		title: 'Pray the Memorare with Carlo Acutis',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/UINgLALfSCs', spanish: '', urdu: ''},
		videoTitles: {asl: '', english: 'Pray the Memorare with Carlo Acutis', spanish: '', urdu: ''},
		year: '2025'
	},
		{
		about: A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[$author$project$Page$Signup$view4])),
		activities: {answerPdfLink: '', answerThumbnailLink: '', pdfLink: '', thumbnailLink: ''},
		duration: '2 min',
		isDisabled: false,
		isFundraising: false,
		link: '/animations/prayingwiththesaints/1/praytheangeluswithcarloacutis',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: 'https://img.youtube.com/vi/7uRR-tYDrd8/maxresdefault.jpg',
		title: 'Pray the Angelus with Carlo Acutis',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/7uRR-tYDrd8', spanish: '', urdu: ''},
		videoTitles: {asl: '', english: 'Pray the Angelus with Carlo Acutis', spanish: '', urdu: ''},
		year: '2025'
	},
		{
		about: A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[$author$project$Page$Signup$view4])),
		activities: {answerPdfLink: '', answerThumbnailLink: '', pdfLink: '', thumbnailLink: ''},
		duration: '21 min',
		isDisabled: false,
		isFundraising: false,
		link: '/animations/prayingwiththesaints/1/praythesorrowfulmysterieswithcarlo',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: 'https://img.youtube.com/vi/cFeBmfU14c4/maxresdefault.jpg',
		title: 'Pray the Sorrowful Mysteries with Carlo',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/cFeBmfU14c4', spanish: '', urdu: ''},
		videoTitles: {asl: '', english: 'Pray the Sorrowful Mysteries with Carlo', spanish: '', urdu: ''},
		year: '2025'
	},
		{
		about: A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[$author$project$Page$Signup$view4])),
		activities: {answerPdfLink: '', answerThumbnailLink: '', pdfLink: '', thumbnailLink: ''},
		duration: '21 min',
		isDisabled: false,
		isFundraising: false,
		link: '/animations/prayingwiththesaints/1/praytheluminousmysterieswithcarlo',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: 'https://img.youtube.com/vi/Dt2K1uSWyJo/maxresdefault.jpg',
		title: 'Pray the Luminous Mysteries with Carlo',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/Dt2K1uSWyJo', spanish: '', urdu: ''},
		videoTitles: {asl: '', english: 'Pray the Luminous Mysteries with Carlo', spanish: '', urdu: ''},
		year: '2025'
	},
		{
		about: A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[$author$project$Page$Signup$view4])),
		activities: {answerPdfLink: '', answerThumbnailLink: '', pdfLink: '', thumbnailLink: ''},
		duration: '21 min',
		isDisabled: false,
		isFundraising: false,
		link: '/animations/prayingwiththesaints/1/praythegloriousmysterieswithcarloacutis',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: 'https://img.youtube.com/vi/kf5p74ROguc/maxresdefault.jpg',
		title: 'Pray the Glorious Mysteries with Carlo Acutis',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/kf5p74ROguc', spanish: '', urdu: ''},
		videoTitles: {asl: '', english: 'Pray the Glorious Mysteries with Carlo Acutis', spanish: '', urdu: ''},
		year: '2025'
	},
		{
		about: A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[$author$project$Page$Signup$view4])),
		activities: {answerPdfLink: '', answerThumbnailLink: '', pdfLink: '', thumbnailLink: ''},
		duration: '21 min',
		isDisabled: false,
		isFundraising: false,
		link: '/animations/prayingwiththesaints/1/praythejoyfulmysterieswithcarlo',
		releaseDate: $elm$time$Time$millisToPosix(0),
		thumbnail: 'https://img.youtube.com/vi/uvLfv0jkq-I/maxresdefault.jpg',
		title: 'Pray the Joyful Mysteries with Carlo',
		videoLinks: {asl: '', english: 'https://www.youtube.com/embed/uvLfv0jkq-I', spanish: '', urdu: ''},
		videoTitles: {asl: '', english: 'Pray the Joyful Mysteries with Carlo', spanish: '', urdu: ''},
		year: '2025'
	}
	]);
var $author$project$Page$Animations$PrayingWithTheSaints$PWSEpisodes$seasons = _List_fromArray(
	[
		{
		description: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		episodes: $author$project$Page$Animations$PrayingWithTheSaints$PWSEpisodes$episodes,
		number: 1
	}
	]);
var $elm$html$Html$br = _VirtualDom_node('br');
var $elm$html$Html$Attributes$target = $elm$html$Html$Attributes$stringProperty('target');
var $author$project$Page$Give$View$donateWithZeffy = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'position', 'relative'),
			A2($elm$html$Html$Attributes$style, 'overflow', 'hidden'),
			A2($elm$html$Html$Attributes$style, 'width', '100%')
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
var $author$project$Page$Animations$SongsOfTheSaints$SotSEpisodes$carloVideoDescription = A2(
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
			$author$project$Page$Give$View$donateWithZeffy
		]));
var $author$project$Page$Animations$SongsOfTheSaints$SotSEpisodes$carloEpisode = {
	about: $author$project$Page$Animations$SongsOfTheSaints$SotSEpisodes$carloVideoDescription,
	activities: {answerPdfLink: '', answerThumbnailLink: '', pdfLink: '', thumbnailLink: ''},
	duration: '4 min',
	isDisabled: false,
	isFundraising: false,
	link: '/animations/songsofthesaints/1/carloacutis',
	releaseDate: $elm$time$Time$millisToPosix(1741359600000),
	thumbnail: '/assets/images/AnimationImageLinks/SotsCarlo.webp',
	title: 'Carlo Acutis',
	videoLinks: {asl: '', english: 'https://www.youtube.com/embed/Q3X7LFbNzrw', spanish: '', urdu: ''},
	videoTitles: {asl: '', english: 'Carlo Acutis | Songs of the Saints', spanish: '', urdu: ''},
	year: '2025'
};
var $author$project$Page$Animations$SongsOfTheSaints$SotSEpisodes$imgClass = 'w-3/4 my-10 mx-auto';
var $author$project$Page$Animations$SongsOfTheSaints$SotSEpisodes$josephVideoDescription = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('max-w-3xl m-auto mt-20 px-5 2xl:px-0')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h1,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('m-10')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Saint Joseph')
				])),
			A2(
			$elm$html$Html$img,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mb-10'),
					$elm$html$Html$Attributes$src('/assets/images/AnimationImageLinks/SotsJoseph.png')
				]),
			_List_Nil),
			A2(
			$elm$html$Html$h2,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('What We\'re Making and Why It Matters')
				])),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Every day, children search for heroes they can emulate. Lacking from modern media, children need heroes who lead with love, humility, and faith. In our new animated musical short, we bring Saint Joseph to life. In this heartfelt episode, we follow Saint Joseph—husband, father, and courageous protector—as he stands under the vast Egyptian night sky, burdened by the heavy responsibility of keeping the Holy Family safe from harm.')
				])),
			A2($elm$html$Html$br, _List_Nil, _List_Nil),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('As Joseph pauses to find peace in a moment of exhaustion, he lovingly shares Mary\'s Magnificat, the sacred prayer that Mary proclaimed during her visitation with Elizabeth. Through his heartfelt singing, Joseph transforms worry into faith, fear into hope, and doubt into strength.')
				])),
			A2($elm$html$Html$br, _List_Nil, _List_Nil),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('This animation seeks not only to entertain but also to spiritually nourish children, teaching them powerful lessons about prayer, trust in God, and courage during life\'s challenges. The goal of these animations is to bring to life meaningful Catholic storytelling that uplifts families, deepens faith, and offers beautiful role models of the saints.')
				])),
			A2($elm$html$Html$br, _List_Nil, _List_Nil),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mb-10')
				]),
			_List_Nil),
			A2(
			$elm$html$Html$h2,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Mary\'s Magnificat')
				])),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('As evening fell over the vast desert, Joseph felt the weight of exhaustion bearing down upon him. The journey to Egypt had been arduous, the terrain unforgiving. Seeking solace, he quietly stepped away from their modest tent, mirroring the moments when Jesus Himself would later withdraw to solitary places to pray, as recorded in the Gospels (Luke 5:16, Mark 1:35). Joseph, like his divine foster son would one day model, turned his weary heart to God in quiet prayer beneath the star-filled sky.')
				])),
			A2(
			$elm$html$Html$br,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mb-2')
				]),
			_List_Nil),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('In this moment of solitude, Joseph\'s thoughts drifted to the words of Mary’s Magnificat (Luke 1:46-55), the powerful hymn she had proclaimed upon hearing the news of her divine motherhood. Each line echoed profoundly in his soul, reminding him of Mary\'s humility, trust, and joy in God\'s promises. He reflected deeply on Mary\'s chosen role, feeling the profound weight and honor of their collective calling. Joseph knew, with deepening clarity, that they too had been chosen by God for this sacred mission.')
				])),
			A2($elm$html$Html$br, _List_Nil, _List_Nil),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Through this contemplative prayer, inspired by Mary\'s song of praise, Joseph felt a renewed strength and consolation flooding his spirit. His doubts and fatigue eased, replaced by a serene certainty and purpose. Comforted by God\'s reassuring presence, Joseph rose from his knees, heartened and ready to continue their journey—secure in the knowledge that the same God who had chosen Mary had also chosen him to protect and care for the precious lives entrusted to his guardianship.')
				])),
			A2($elm$html$Html$br, _List_Nil, _List_Nil),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mb-10')
				]),
			_List_Nil),
			A2(
			$elm$html$Html$h2,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Calling all Star Wars Fans')
				])),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('If you are a fan of Star Wars, and may notice some similarities in our designs. \nBut not only Star Wars, also Lord of the Rings as well! Inspired by the epic sweep of Star Wars and the heart of Lord of the Rings, we fuse blockbuster energy with timeless Catholic devotion. Combining our love for film, pop culture, and also the historical representations of Saint Joseph with the reality of the exhaustion that comes from being a new dad\n (and taking a long journey through the desert), we get our inspired Saint Joseph design. This took many iterations, lots of research, and lots of prayer.')
				])),
			A2($elm$html$Html$br, _List_Nil, _List_Nil),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('The result is a bearded man with medium‑brown, shoulder‑length hair and warm tan skin. Saint Joseph has subtle dark circles under his eyes and a sturdy build.\nKey character and costume details include: long hair like King Aragorn, green tunic which is traditional for Saint Joseph, worn over a light‑beige inner robe giving Jedi vibes flowing down to his sandaled feet, and a hammer holster at his waist like a saber or sword sheath which suggests his trade as a carpenter.\n Overall, the Biblical and pop‑culture reference blend create a friendly, approachable depiction of Saint Joseph for our animation.')
				])),
			A2($elm$html$Html$br, _List_Nil, _List_Nil),
			A2(
			$elm$html$Html$img,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class($author$project$Page$Animations$SongsOfTheSaints$SotSEpisodes$imgClass),
					$elm$html$Html$Attributes$src('/assets/images/JosephDesign.png'),
					$elm$html$Html$Attributes$alt('Joseph Design Descriptions')
				]),
			_List_Nil),
			A2(
			$elm$html$Html$h2,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Saint Joseph')
				])),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('As a righteous and just man, Joseph welcomed divine mystery into his life. His humility laid the foundation for extraordinary obedience. As protector and provider, he journeyed into the unknown to safeguard Mary and Jesus. His quiet strength teaches us that true courage often speaks in whispers, not shouts.')
				])),
			A2($elm$html$Html$br, _List_Nil, _List_Nil),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('The flaming heart crowned with lilies is a traditional symbol for Saint Joseph and symbolizes his chaste heart and pure devotion. The carpenter’s hammer entwined with olive leaves honors both his trade and his trust in God’s plan. Our animation invites viewers to discover that heroism shines brightest in everyday acts of love, sacrifice, and faith.')
				])),
			A2(
			$elm$html$Html$img,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class($author$project$Page$Animations$SongsOfTheSaints$SotSEpisodes$imgClass),
					$elm$html$Html$Attributes$src('/assets/images/JosephDescription.png'),
					$elm$html$Html$Attributes$alt('Joseph Character Description')
				]),
			_List_Nil),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mb-20 lg:mb-40')
				]),
			_List_Nil)
		]));
var $author$project$Page$Animations$SongsOfTheSaints$SotSEpisodes$josephEpisode = {
	about: $author$project$Page$Animations$SongsOfTheSaints$SotSEpisodes$josephVideoDescription,
	activities: {answerPdfLink: '', answerThumbnailLink: '', pdfLink: '', thumbnailLink: ''},
	duration: '5 min',
	isDisabled: false,
	isFundraising: false,
	link: '/animations/songsofthesaints/1/saintjoseph',
	releaseDate: $elm$time$Time$millisToPosix(0),
	thumbnail: '/assets/images/AnimationImageLinks/SotsJoseph.webp',
	title: 'Saint Joseph',
	videoLinks: {asl: '', english: 'https://www.youtube.com/embed/nb7r4V_4uFc', spanish: '', urdu: ''},
	videoTitles: {asl: '', english: 'Saint Joseph | Songs of the Saints', spanish: '', urdu: ''},
	year: '2025'
};
var $author$project$Page$Animations$SongsOfTheSaints$SotSEpisodes$thereseVideoDescription = A2(
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
var $author$project$Page$Animations$SongsOfTheSaints$SotSEpisodes$stThereseEpisode = {
	about: $author$project$Page$Animations$SongsOfTheSaints$SotSEpisodes$thereseVideoDescription,
	activities: {answerPdfLink: '', answerThumbnailLink: '', pdfLink: '', thumbnailLink: ''},
	duration: '3 min',
	isDisabled: false,
	isFundraising: false,
	link: '/animations/songsofthesaints/1/saintth%C3%A9r%C3%A8seoflisieux',
	releaseDate: $elm$time$Time$millisToPosix(0),
	thumbnail: '/assets/images/AnimationImageLinks/SotsTherese.webp',
	title: 'Saint Thérèse of Lisieux',
	videoLinks: {asl: '', english: 'https://www.youtube.com/embed/_v_285ob5Rc', spanish: '', urdu: ''},
	videoTitles: {asl: '', english: 'Saint Therese | Songs of the Saints', spanish: '', urdu: ''},
	year: '2025'
};
var $author$project$Page$Animations$SongsOfTheSaints$SotSEpisodes$episodes = _List_fromArray(
	[$author$project$Page$Animations$SongsOfTheSaints$SotSEpisodes$stThereseEpisode, $author$project$Page$Animations$SongsOfTheSaints$SotSEpisodes$carloEpisode, $author$project$Page$Animations$SongsOfTheSaints$SotSEpisodes$josephEpisode]);
var $author$project$Page$Animations$SongsOfTheSaints$SotSEpisodes$seasons = _List_fromArray(
	[
		{
		description: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		episodes: $author$project$Page$Animations$SongsOfTheSaints$SotSEpisodes$episodes,
		number: 1
	}
	]);
var $author$project$Page$Animations$PrayerTimeWithAngels$PTWAEpisodes$viewBody = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('relative left-1/2 -translate-x-1/2')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('relative left-1/2 -translate-x-1/2 py-5 px-11 max-w-3xl')
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
var $author$project$Page$Animations$DaisyAndSheep$DASEpisodes$viewDescription = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('relative left-1/2 -translate-x-1/2 py-5 px-11 max-w-3xl')
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
var $author$project$Page$Animations$Productions$productions = _List_fromArray(
	[
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		age: 'Ages 2+',
		carouselThumbnail: '/assets/images/CarouselThumbnails/resized/HailMary.webp',
		duration: '5 minutes',
		link: '/animations/hailmary',
		seasons: $author$project$Page$Animations$HailMary$HMEpisodes$seasons,
		shortDescription: 'Learn one of the most beautiful prayers in the Catholic tradition. A prayer of love and devotion to our Blessed Mother Mary.',
		thumbnail: '/assets/images/AnimationImageLinks/HailMary.webp',
		title: 'Hail Mary',
		year: '2020'
	},
		{about: $author$project$Page$Animations$PrayerTimeWithAngels$PTWAEpisodes$viewBody, age: 'Ages 6+', carouselThumbnail: '/assets/images/CarouselThumbnails/resized/PrayerTimeWithAngels.webp', duration: '5 minutes', link: '/animations/prayertimewithangels', seasons: $author$project$Page$Animations$PrayerTimeWithAngels$PTWAEpisodes$seasons, shortDescription: 'Join Theo and Felicity as they learn common Catholic prayers from their guardian angels.', thumbnail: '/assets/images/AnimationImageLinks/PrayerTimeWithAngels.webp', title: 'Prayer Time with Angels', year: '2023'},
		{about: $author$project$Page$Animations$DaisyAndSheep$DASEpisodes$viewDescription, age: 'Ages 10+', carouselThumbnail: '/assets/images/CarouselThumbnails/resized/DaisyAndSheep.webp', duration: '5 minutes', link: '/animations/daisyandsheep', seasons: $author$project$Page$Animations$DaisyAndSheep$DASEpisodes$seasons, shortDescription: 'Join Daisy and Sheep as they learn about the Mass one part at a time and discover fun facts about the Catholic Church.', thumbnail: '/assets/images/AnimationImageLinks/DaisyAndSheep.webp', title: 'Daisy and Sheep', year: '2024'},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		age: 'Ages 10+',
		carouselThumbnail: '/assets/images/CarouselThumbnails/resized/SongsOfTheSaints.webp',
		duration: '5 minutes',
		link: '/animations/songsofthesaints',
		seasons: $author$project$Page$Animations$SongsOfTheSaints$SotSEpisodes$seasons,
		shortDescription: 'Sing along with your favorite saints in this musical journey.',
		thumbnail: '/assets/images/AnimationImageLinks/SongsOfTheSaints.webp',
		title: 'Songs of the Saints',
		year: '2025'
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		age: 'Ages 2+',
		carouselThumbnail: '/assets/images/CarouselThumbnails/GigglesAndGrace.webp',
		duration: '3 min',
		link: '/animations/gigglesandgraceshow',
		seasons: $author$project$Page$Animations$GigglesAndGrace$GAGEpisodes$seasons,
		shortDescription: 'Discover Giggles and Grace: Thank You Lord, a musical animated short film that celebrates the joy of thanking God even when things go wrong.',
		thumbnail: '/assets/images/AnimationImageLinks/GigglesAndGrace.webp',
		title: 'Giggles and Grace Show',
		year: '2025'
	},
		{
		about: A2($elm$html$Html$span, _List_Nil, _List_Nil),
		age: 'Ages 6+',
		carouselThumbnail: '/assets/images/CarouselThumbnails/PrayingWithTheSaints.webp',
		duration: 'Various',
		link: '/animations/prayingwiththesaints',
		seasons: $author$project$Page$Animations$PrayingWithTheSaints$PWSEpisodes$seasons,
		shortDescription: 'Pray common prayers with the saints in this collection of 12 videos featuring St. Thérèse of Lisieux and Carlo Acutis.',
		thumbnail: '/assets/images/AnimationImageLinks/PrayingWithTheSaints.webp',
		title: 'Praying with the Saints',
		year: '2025'
	}
	]);
var $elm$time$Time$utc = A2($elm$time$Time$Zone, 0, _List_Nil);
var $author$project$Page$Animations$View$init = F2(
	function (flags, url) {
		return _Utils_Tuple2(
			{
				slideshow: $author$project$Page$Animations$Helpers$Carousel$init($author$project$Page$Animations$Productions$productions),
				time: $elm$time$Time$millisToPosix(0),
				timezone: $elm$time$Time$utc,
				url: url,
				videoDetailTab: $author$project$Page$Animations$View$getTabFromUrl(url),
				videoTab: $author$project$Page$Animations$View$English
			},
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						A2($elm$core$Task$perform, $author$project$Page$Animations$View$NewTime, $elm$time$Time$now),
						A2($elm$core$Task$perform, $author$project$Page$Animations$View$NewZone, $elm$time$Time$here)
					])));
	});
var $author$project$Page$FeastDayActivities$Main$NewTime = function (a) {
	return {$: 'NewTime', a: a};
};
var $author$project$Page$FeastDayActivities$Main$NewZone = function (a) {
	return {$: 'NewZone', a: a};
};
var $author$project$Page$FeastDayActivities$Main$SaintListMsg = function (a) {
	return {$: 'SaintListMsg', a: a};
};
var $author$project$Page$Saints$SaintList$FetchData = function (a) {
	return {$: 'FetchData', a: a};
};
var $elm$json$Json$Decode$decodeString = _Json_runOnString;
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
var $elm$http$Http$expectJson = F2(
	function (toMsg, decoder) {
		return A2(
			$elm$http$Http$expectStringResponse,
			toMsg,
			$elm$http$Http$resolve(
				function (string) {
					return A2(
						$elm$core$Result$mapError,
						$elm$json$Json$Decode$errorToString,
						A2($elm$json$Json$Decode$decodeString, decoder, string));
				}));
	});
var $elm$http$Http$emptyBody = _Http_emptyBody;
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
var $elm$http$Http$get = function (r) {
	return $elm$http$Http$request(
		{body: $elm$http$Http$emptyBody, expect: r.expect, headers: _List_Nil, method: 'GET', timeout: $elm$core$Maybe$Nothing, tracker: $elm$core$Maybe$Nothing, url: r.url});
};
var $author$project$Page$Saints$SaintList$Response = function (values) {
	return {values: values};
};
var $elm$json$Json$Decode$array = _Json_decodeArray;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$Page$Saints$SaintList$responseDecoder = A2(
	$elm$json$Json$Decode$map,
	$author$project$Page$Saints$SaintList$Response,
	A2(
		$elm$json$Json$Decode$field,
		'values',
		$elm$json$Json$Decode$array(
			$elm$json$Json$Decode$array($elm$json$Json$Decode$string))));
var $author$project$Page$Saints$SaintList$fetchSaints = $elm$http$Http$get(
	{
		expect: A2($elm$http$Http$expectJson, $author$project$Page$Saints$SaintList$FetchData, $author$project$Page$Saints$SaintList$responseDecoder),
		url: 'https://us-central1-catholic-stories-for-children.cloudfunctions.net/get-feast-day-activities'
	});
var $author$project$Page$Saints$SaintList$init = {error: $elm$core$Maybe$Nothing, isLoading: true, saints: _List_Nil};
var $author$project$Page$Signup$init = {email: '', isLoading: false, message: ''};
var $elm$core$Platform$Cmd$map = _Platform_map;
var $author$project$Page$FeastDayActivities$Main$init = F2(
	function (flags, url) {
		return _Utils_Tuple2(
			{
				saintList: $author$project$Page$Saints$SaintList$init,
				signup: $author$project$Page$Signup$init,
				time: $elm$time$Time$millisToPosix(0),
				timezone: $elm$time$Time$utc,
				url: url
			},
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						A2($elm$core$Task$perform, $author$project$Page$FeastDayActivities$Main$NewTime, $elm$time$Time$now),
						A2($elm$core$Task$perform, $author$project$Page$FeastDayActivities$Main$NewZone, $elm$time$Time$here),
						A2($elm$core$Platform$Cmd$map, $author$project$Page$FeastDayActivities$Main$SaintListMsg, $author$project$Page$Saints$SaintList$fetchSaints)
					])));
	});
var $author$project$Page$Home$Sections$init = {animDir: 0, animating: false, nextIndex: $elm$core$Maybe$Nothing, paused: false, substackLoaded: false, testiIndex: 0};
var $author$project$Page$Saints$Main$Partial = {$: 'Partial'};
var $author$project$Page$Saints$Main$SaintListMsg = function (a) {
	return {$: 'SaintListMsg', a: a};
};
var $author$project$Page$Saints$Main$init = F2(
	function (flags, url) {
		return _Utils_Tuple2(
			{patronageView: $author$project$Page$Saints$Main$Partial, query: '', saintList: $author$project$Page$Saints$SaintList$init, signup: $author$project$Page$Signup$init, url: url},
			A2($elm$core$Platform$Cmd$map, $author$project$Page$Saints$Main$SaintListMsg, $author$project$Page$Saints$SaintList$fetchSaints));
	});
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Main$AboutUs = {$: 'AboutUs'};
var $author$project$Main$Angelus = {$: 'Angelus'};
var $author$project$Main$Contact = {$: 'Contact'};
var $author$project$Main$Download = {$: 'Download'};
var $author$project$Main$Give = {$: 'Give'};
var $author$project$Main$Home = {$: 'Home'};
var $author$project$Main$Prayers = {$: 'Prayers'};
var $author$project$Main$Press = {$: 'Press'};
var $author$project$Main$PrivacyPolicy = {$: 'PrivacyPolicy'};
var $author$project$Main$Resources = {$: 'Resources'};
var $author$project$Main$Shop = {$: 'Shop'};
var $author$project$Main$TermsAndConditions = {$: 'TermsAndConditions'};
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$String$endsWith = _String_endsWith;
var $author$project$Main$isDownloadable = function (path) {
	var fileExtensions = _List_fromArray(
		['.pdf', '.jpg', '.jpeg', '.png', '.webp', '.svg', '.mp4', '.doc', '.docx']);
	return A2(
		$elm$core$List$any,
		function (ext) {
			return A2($elm$core$String$endsWith, ext, path);
		},
		fileExtensions);
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
var $author$project$Main$parseUrl = function (url) {
	var urlString = $elm$url$Url$toString(url);
	var path = url.path;
	return $author$project$Main$isDownloadable(path) ? $author$project$Main$Download : (A2($elm$core$String$contains, 'animations', urlString) ? $author$project$Main$Productions : (A2($elm$core$String$contains, 'give', urlString) ? $author$project$Main$Give : (A2($elm$core$String$contains, 'contact', urlString) ? $author$project$Main$Contact : (A2($elm$core$String$contains, 'team', urlString) ? $author$project$Main$AboutUs : (A2($elm$core$String$contains, 'resources', urlString) ? $author$project$Main$Resources : (A2($elm$core$String$contains, 'prayers', urlString) ? $author$project$Main$Prayers : (A2($elm$core$String$contains, 'angelus', urlString) ? $author$project$Main$Angelus : (A2($elm$core$String$contains, 'shop', urlString) ? $author$project$Main$Shop : (A2($elm$core$String$contains, 'saints', urlString) ? $author$project$Main$Saints : (A2($elm$core$String$contains, 'press', urlString) ? $author$project$Main$Press : (A2($elm$core$String$contains, 'about/privacy-policy', urlString) ? $author$project$Main$PrivacyPolicy : (A2($elm$core$String$contains, 'about/terms-and-conditions', urlString) ? $author$project$Main$TermsAndConditions : (A2($elm$core$String$contains, 'feastdayactivities', urlString) ? $author$project$Main$Feasts : $author$project$Main$Home)))))))))))));
};
var $elm$browser$Browser$Navigation$pushUrl = _Browser_pushUrl;
var $author$project$Main$init = F3(
	function (flags, url, key) {
		var initialPage = $author$project$Main$parseUrl(url);
		var _v0 = A2($author$project$Page$Saints$Main$init, flags, url);
		var saintsPageModel = _v0.a;
		var saintsPageCmd = _v0.b;
		var _v1 = A2($author$project$Page$FeastDayActivities$Main$init, flags, url);
		var feastsPageModel = _v1.a;
		var feastsPageCmd = _v1.b;
		var _v2 = A2($author$project$Page$Animations$View$init, flags, url);
		var animationsPageModel = _v2.a;
		var animationsPageCmd = _v2.b;
		return A2($elm$core$String$startsWith, '/animations/actofcontrition', url.path) ? _Utils_Tuple2(
			{
				animationsPageModel: animationsPageModel,
				feastsPageModel: feastsPageModel,
				key: key,
				language: $author$project$Main$English,
				menuOpen: false,
				page: $author$project$Main$Productions,
				saintsPageModel: saintsPageModel,
				sections: $author$project$Page$Home$Sections$init,
				signup: $author$project$Page$Signup$init,
				time: $elm$time$Time$millisToPosix(0),
				timezone: $elm$time$Time$utc,
				url: url
			},
			A2($elm$browser$Browser$Navigation$pushUrl, key, '/animations/prayertimewithangels/1/actofcontritionprayer')) : _Utils_Tuple2(
			{
				animationsPageModel: animationsPageModel,
				feastsPageModel: feastsPageModel,
				key: key,
				language: $author$project$Main$English,
				menuOpen: false,
				page: initialPage,
				saintsPageModel: saintsPageModel,
				sections: $author$project$Page$Home$Sections$init,
				signup: $author$project$Page$Signup$init,
				time: $elm$time$Time$millisToPosix(0),
				timezone: $elm$time$Time$utc,
				url: url
			},
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						A2($elm$core$Task$perform, $author$project$Main$NewTime, $elm$time$Time$now),
						A2($elm$core$Task$perform, $author$project$Main$NewZone, $elm$time$Time$here),
						_Utils_eq(initialPage, $author$project$Main$Productions) ? A2($elm$core$Platform$Cmd$map, $author$project$Main$ProductionsMsg, animationsPageCmd) : $elm$core$Platform$Cmd$none,
						_Utils_eq(initialPage, $author$project$Main$Saints) ? A2($elm$core$Platform$Cmd$map, $author$project$Main$SaintsMsg, saintsPageCmd) : $elm$core$Platform$Cmd$none,
						_Utils_eq(initialPage, $author$project$Main$Feasts) ? A2($elm$core$Platform$Cmd$map, $author$project$Main$FeastsMsg, feastsPageCmd) : $elm$core$Platform$Cmd$none
					])));
	});
var $author$project$Main$ConsentChanged = function (a) {
	return {$: 'ConsentChanged', a: a};
};
var $author$project$Main$GALoaded = {$: 'GALoaded'};
var $author$project$Main$LoadGA = {$: 'LoadGA'};
var $author$project$Page$Home$Sections$NextAuto = {$: 'NextAuto'};
var $author$project$Main$SectionsMsg = function (a) {
	return {$: 'SectionsMsg', a: a};
};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$time$Time$Every = F2(
	function (a, b) {
		return {$: 'Every', a: a, b: b};
	});
var $elm$time$Time$State = F2(
	function (taggers, processes) {
		return {processes: processes, taggers: taggers};
	});
var $elm$time$Time$init = $elm$core$Task$succeed(
	A2($elm$time$Time$State, $elm$core$Dict$empty, $elm$core$Dict$empty));
var $elm$time$Time$addMySub = F2(
	function (_v0, state) {
		var interval = _v0.a;
		var tagger = _v0.b;
		var _v1 = A2($elm$core$Dict$get, interval, state);
		if (_v1.$ === 'Nothing') {
			return A3(
				$elm$core$Dict$insert,
				interval,
				_List_fromArray(
					[tagger]),
				state);
		} else {
			var taggers = _v1.a;
			return A3(
				$elm$core$Dict$insert,
				interval,
				A2($elm$core$List$cons, tagger, taggers),
				state);
		}
	});
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$time$Time$setInterval = _Time_setInterval;
var $elm$time$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		if (!intervals.b) {
			return $elm$core$Task$succeed(processes);
		} else {
			var interval = intervals.a;
			var rest = intervals.b;
			var spawnTimer = $elm$core$Process$spawn(
				A2(
					$elm$time$Time$setInterval,
					interval,
					A2($elm$core$Platform$sendToSelf, router, interval)));
			var spawnRest = function (id) {
				return A3(
					$elm$time$Time$spawnHelp,
					router,
					rest,
					A3($elm$core$Dict$insert, interval, id, processes));
			};
			return A2($elm$core$Task$andThen, spawnRest, spawnTimer);
		}
	});
var $elm$time$Time$onEffects = F3(
	function (router, subs, _v0) {
		var processes = _v0.processes;
		var rightStep = F3(
			function (_v6, id, _v7) {
				var spawns = _v7.a;
				var existing = _v7.b;
				var kills = _v7.c;
				return _Utils_Tuple3(
					spawns,
					existing,
					A2(
						$elm$core$Task$andThen,
						function (_v5) {
							return kills;
						},
						$elm$core$Process$kill(id)));
			});
		var newTaggers = A3($elm$core$List$foldl, $elm$time$Time$addMySub, $elm$core$Dict$empty, subs);
		var leftStep = F3(
			function (interval, taggers, _v4) {
				var spawns = _v4.a;
				var existing = _v4.b;
				var kills = _v4.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, interval, spawns),
					existing,
					kills);
			});
		var bothStep = F4(
			function (interval, taggers, id, _v3) {
				var spawns = _v3.a;
				var existing = _v3.b;
				var kills = _v3.c;
				return _Utils_Tuple3(
					spawns,
					A3($elm$core$Dict$insert, interval, id, existing),
					kills);
			});
		var _v1 = A6(
			$elm$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			processes,
			_Utils_Tuple3(
				_List_Nil,
				$elm$core$Dict$empty,
				$elm$core$Task$succeed(_Utils_Tuple0)));
		var spawnList = _v1.a;
		var existingDict = _v1.b;
		var killTask = _v1.c;
		return A2(
			$elm$core$Task$andThen,
			function (newProcesses) {
				return $elm$core$Task$succeed(
					A2($elm$time$Time$State, newTaggers, newProcesses));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v2) {
					return A3($elm$time$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
	});
var $elm$time$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _v0 = A2($elm$core$Dict$get, interval, state.taggers);
		if (_v0.$ === 'Nothing') {
			return $elm$core$Task$succeed(state);
		} else {
			var taggers = _v0.a;
			var tellTaggers = function (time) {
				return $elm$core$Task$sequence(
					A2(
						$elm$core$List$map,
						function (tagger) {
							return A2(
								$elm$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						taggers));
			};
			return A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$succeed(state);
				},
				A2($elm$core$Task$andThen, tellTaggers, $elm$time$Time$now));
		}
	});
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$time$Time$subMap = F2(
	function (f, _v0) {
		var interval = _v0.a;
		var tagger = _v0.b;
		return A2(
			$elm$time$Time$Every,
			interval,
			A2($elm$core$Basics$composeL, f, tagger));
	});
_Platform_effectManagers['Time'] = _Platform_createManager($elm$time$Time$init, $elm$time$Time$onEffects, $elm$time$Time$onSelfMsg, 0, $elm$time$Time$subMap);
var $elm$time$Time$subscription = _Platform_leaf('Time');
var $elm$time$Time$every = F2(
	function (interval, tagger) {
		return $elm$time$Time$subscription(
			A2($elm$time$Time$Every, interval, tagger));
	});
var $elm$json$Json$Decode$null = _Json_decodeNull;
var $author$project$Ports$GoogleAnalytics$gaLoaded = _Platform_incomingPort(
	'gaLoaded',
	$elm$json$Json$Decode$null(_Utils_Tuple0));
var $author$project$Ports$GoogleAnalytics$loadGA = _Platform_incomingPort(
	'loadGA',
	$elm$json$Json$Decode$null(_Utils_Tuple0));
var $elm$core$Platform$Sub$map = _Platform_map;
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $author$project$Ports$GoogleAnalytics$onConsentChange = _Platform_incomingPort(
	'onConsentChange',
	A2(
		$elm$json$Json$Decode$andThen,
		function (analytics) {
			return $elm$json$Json$Decode$succeed(
				{analytics: analytics});
		},
		A2($elm$json$Json$Decode$field, 'analytics', $elm$json$Json$Decode$bool)));
var $author$project$Page$Home$Sections$LoadSubstackIframe = {$: 'LoadSubstackIframe'};
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $elm$browser$Browser$AnimationManager$Time = function (a) {
	return {$: 'Time', a: a};
};
var $elm$browser$Browser$AnimationManager$State = F3(
	function (subs, request, oldTime) {
		return {oldTime: oldTime, request: request, subs: subs};
	});
var $elm$browser$Browser$AnimationManager$init = $elm$core$Task$succeed(
	A3($elm$browser$Browser$AnimationManager$State, _List_Nil, $elm$core$Maybe$Nothing, 0));
var $elm$browser$Browser$AnimationManager$now = _Browser_now(_Utils_Tuple0);
var $elm$browser$Browser$AnimationManager$rAF = _Browser_rAF(_Utils_Tuple0);
var $elm$browser$Browser$AnimationManager$onEffects = F3(
	function (router, subs, _v0) {
		var request = _v0.request;
		var oldTime = _v0.oldTime;
		var _v1 = _Utils_Tuple2(request, subs);
		if (_v1.a.$ === 'Nothing') {
			if (!_v1.b.b) {
				var _v2 = _v1.a;
				return $elm$browser$Browser$AnimationManager$init;
			} else {
				var _v4 = _v1.a;
				return A2(
					$elm$core$Task$andThen,
					function (pid) {
						return A2(
							$elm$core$Task$andThen,
							function (time) {
								return $elm$core$Task$succeed(
									A3(
										$elm$browser$Browser$AnimationManager$State,
										subs,
										$elm$core$Maybe$Just(pid),
										time));
							},
							$elm$browser$Browser$AnimationManager$now);
					},
					$elm$core$Process$spawn(
						A2(
							$elm$core$Task$andThen,
							$elm$core$Platform$sendToSelf(router),
							$elm$browser$Browser$AnimationManager$rAF)));
			}
		} else {
			if (!_v1.b.b) {
				var pid = _v1.a.a;
				return A2(
					$elm$core$Task$andThen,
					function (_v3) {
						return $elm$browser$Browser$AnimationManager$init;
					},
					$elm$core$Process$kill(pid));
			} else {
				return $elm$core$Task$succeed(
					A3($elm$browser$Browser$AnimationManager$State, subs, request, oldTime));
			}
		}
	});
var $elm$browser$Browser$AnimationManager$onSelfMsg = F3(
	function (router, newTime, _v0) {
		var subs = _v0.subs;
		var oldTime = _v0.oldTime;
		var send = function (sub) {
			if (sub.$ === 'Time') {
				var tagger = sub.a;
				return A2(
					$elm$core$Platform$sendToApp,
					router,
					tagger(
						$elm$time$Time$millisToPosix(newTime)));
			} else {
				var tagger = sub.a;
				return A2(
					$elm$core$Platform$sendToApp,
					router,
					tagger(newTime - oldTime));
			}
		};
		return A2(
			$elm$core$Task$andThen,
			function (pid) {
				return A2(
					$elm$core$Task$andThen,
					function (_v1) {
						return $elm$core$Task$succeed(
							A3(
								$elm$browser$Browser$AnimationManager$State,
								subs,
								$elm$core$Maybe$Just(pid),
								newTime));
					},
					$elm$core$Task$sequence(
						A2($elm$core$List$map, send, subs)));
			},
			$elm$core$Process$spawn(
				A2(
					$elm$core$Task$andThen,
					$elm$core$Platform$sendToSelf(router),
					$elm$browser$Browser$AnimationManager$rAF)));
	});
var $elm$browser$Browser$AnimationManager$Delta = function (a) {
	return {$: 'Delta', a: a};
};
var $elm$browser$Browser$AnimationManager$subMap = F2(
	function (func, sub) {
		if (sub.$ === 'Time') {
			var tagger = sub.a;
			return $elm$browser$Browser$AnimationManager$Time(
				A2($elm$core$Basics$composeL, func, tagger));
		} else {
			var tagger = sub.a;
			return $elm$browser$Browser$AnimationManager$Delta(
				A2($elm$core$Basics$composeL, func, tagger));
		}
	});
_Platform_effectManagers['Browser.AnimationManager'] = _Platform_createManager($elm$browser$Browser$AnimationManager$init, $elm$browser$Browser$AnimationManager$onEffects, $elm$browser$Browser$AnimationManager$onSelfMsg, 0, $elm$browser$Browser$AnimationManager$subMap);
var $elm$browser$Browser$AnimationManager$subscription = _Platform_leaf('Browser.AnimationManager');
var $elm$browser$Browser$AnimationManager$onAnimationFrame = function (tagger) {
	return $elm$browser$Browser$AnimationManager$subscription(
		$elm$browser$Browser$AnimationManager$Time(tagger));
};
var $elm$browser$Browser$Events$onAnimationFrame = $elm$browser$Browser$AnimationManager$onAnimationFrame;
var $author$project$Page$Home$Sections$subscriptions = function (model) {
	return model.substackLoaded ? $elm$core$Platform$Sub$none : $elm$browser$Browser$Events$onAnimationFrame(
		function (_v0) {
			return $author$project$Page$Home$Sections$LoadSubstackIframe;
		});
};
var $author$project$Main$subscriptions = function (model) {
	var _v0 = model.page;
	if (_v0.$ === 'Home') {
		return $elm$core$Platform$Sub$batch(
			_List_fromArray(
				[
					A2(
					$elm$time$Time$every,
					6000,
					function (_v1) {
						return $author$project$Main$SectionsMsg($author$project$Page$Home$Sections$NextAuto);
					}),
					A2(
					$elm$core$Platform$Sub$map,
					$author$project$Main$SectionsMsg,
					$author$project$Page$Home$Sections$subscriptions(model.sections)),
					$author$project$Ports$GoogleAnalytics$onConsentChange($author$project$Main$ConsentChanged),
					$author$project$Ports$GoogleAnalytics$loadGA(
					function (_v2) {
						return $author$project$Main$LoadGA;
					}),
					$author$project$Ports$GoogleAnalytics$gaLoaded(
					function (_v3) {
						return $author$project$Main$GALoaded;
					})
				]));
	} else {
		return $elm$core$Platform$Sub$batch(
			_List_fromArray(
				[
					$author$project$Ports$GoogleAnalytics$onConsentChange($author$project$Main$ConsentChanged),
					$author$project$Ports$GoogleAnalytics$loadGA(
					function (_v4) {
						return $author$project$Main$LoadGA;
					}),
					$author$project$Ports$GoogleAnalytics$gaLoaded(
					function (_v5) {
						return $author$project$Main$GALoaded;
					})
				]));
	}
};
var $author$project$Page$Animations$View$UrlChanged = function (a) {
	return {$: 'UrlChanged', a: a};
};
var $elm$json$Json$Encode$null = _Json_encodeNull;
var $author$project$Ports$GoogleAnalytics$addGAScript = _Platform_outgoingPort(
	'addGAScript',
	function ($) {
		return $elm$json$Json$Encode$null;
	});
var $author$project$Ports$GoogleAnalytics$enableAnalytics = _Platform_outgoingPort(
	'enableAnalytics',
	function ($) {
		return $elm$json$Json$Encode$null;
	});
var $author$project$Ports$GoogleAnalytics$initGA = _Platform_outgoingPort(
	'initGA',
	function ($) {
		return $elm$json$Json$Encode$null;
	});
var $elm$browser$Browser$Navigation$load = _Browser_load;
var $elm$core$Debug$log = _Debug_log;
var $elm$core$Basics$neq = _Utils_notEqual;
var $elm$core$Basics$not = _Basics_not;
var $author$project$Main$NoOp = {$: 'NoOp'};
var $elm$browser$Browser$Dom$setViewport = _Browser_setViewport;
var $elm$core$Process$sleep = _Process_sleep;
var $author$project$Main$scrollToTopCmd = A2(
	$elm$core$Task$perform,
	function (_v1) {
		return $author$project$Main$NoOp;
	},
	A2(
		$elm$core$Task$andThen,
		function (_v0) {
			return A2($elm$browser$Browser$Dom$setViewport, 0, 0);
		},
		$elm$core$Process$sleep(0)));
var $elm$json$Json$Encode$bool = _Json_wrap;
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
var $author$project$Ports$GoogleAnalytics$setConsent = _Platform_outgoingPort(
	'setConsent',
	function ($) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'ads',
					$elm$json$Json$Encode$bool($.ads)),
					_Utils_Tuple2(
					'analytics',
					$elm$json$Json$Encode$bool($.analytics))
				]));
	});
var $author$project$Page$Animations$View$NoOp = {$: 'NoOp'};
var $elm$core$Basics$modBy = _Basics_modBy;
var $author$project$Page$Animations$Helpers$Carousel$next = function (carousel) {
	var newIndex = A2(
		$elm$core$Basics$modBy,
		$elm$core$List$length(carousel.items),
		carousel.currentIndex + 1);
	return _Utils_update(
		carousel,
		{currentIndex: newIndex});
};
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
var $author$project$Page$Animations$View$EpisodeRoute = function (a) {
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
var $author$project$Page$Animations$View$routeParser = $elm$url$Url$Parser$oneOf(
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
var $author$project$Page$Animations$View$route = A2(
	$elm$url$Url$Parser$map,
	function (e) {
		return $author$project$Page$Animations$View$EpisodeRoute(e);
	},
	$author$project$Page$Animations$View$routeParser);
var $author$project$Page$Animations$View$parseRoute = $elm$url$Url$Parser$parse($author$project$Page$Animations$View$route);
var $author$project$Page$Animations$Helpers$Carousel$prev = function (carousel) {
	var newIndex = A2(
		$elm$core$Basics$modBy,
		$elm$core$List$length(carousel.items),
		(carousel.currentIndex - 1) + $elm$core$List$length(carousel.items));
	return _Utils_update(
		carousel,
		{currentIndex: newIndex});
};
var $author$project$Page$Animations$View$tabToString = function (tab) {
	switch (tab.$) {
		case 'Episodes':
			return 'episodes';
		case 'Activities':
			return 'activities';
		case 'Details':
			return 'details';
		default:
			return 'suggested';
	}
};
var $elm$core$String$toLower = _String_toLower;
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$Page$Animations$View$update = F3(
	function (key, msg, model) {
		switch (msg.$) {
			case 'UrlChanged':
				var url = msg.a;
				var tabFromUrl = $author$project$Page$Animations$View$getTabFromUrl(url);
				var scrollToTopCmd = A2(
					$elm$core$Task$perform,
					function (_v1) {
						return $author$project$Page$Animations$View$NoOp;
					},
					A2($elm$browser$Browser$Dom$setViewport, 0, 0));
				var oldRoute = $author$project$Page$Animations$View$parseRoute(model.url);
				var newRoute = $author$project$Page$Animations$View$parseRoute(url);
				var routeChanged = !_Utils_eq(oldRoute, newRoute);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{url: url, videoDetailTab: tabFromUrl}),
					routeChanged ? scrollToTopCmd : $elm$core$Platform$Cmd$none);
			case 'NewTime':
				var time = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{time: time}),
					$elm$core$Platform$Cmd$none);
			case 'NewZone':
				var zone = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{timezone: zone}),
					$elm$core$Platform$Cmd$none);
			case 'VideoTabClick':
				var videoTab = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{videoTab: videoTab}),
					$elm$core$Platform$Cmd$none);
			case 'VideoDetailsTabClick':
				var tab = msg.a;
				var currentQuery = A2($elm$core$Maybe$withDefault, '', model.url.query);
				var newQuery = $elm$core$String$isEmpty(currentQuery) ? ('?tab=' + $elm$core$String$toLower(
					$author$project$Page$Animations$View$tabToString(tab))) : (A2($elm$core$String$contains, 'tab=', currentQuery) ? A2(
					$elm$core$String$join,
					'&',
					A2(
						$elm$core$List$map,
						function (param) {
							return A2($elm$core$String$startsWith, 'tab=', param) ? ('?tab=' + $elm$core$String$toLower(
								$author$project$Page$Animations$View$tabToString(tab))) : param;
						},
						A2($elm$core$String$split, '&', currentQuery))) : (currentQuery + ('&tab=' + $elm$core$String$toLower(
					$author$project$Page$Animations$View$tabToString(tab)))));
				var currentPath = model.url.path;
				var newUrl = _Utils_ap(currentPath, newQuery);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{videoDetailTab: tab}),
					A2($elm$browser$Browser$Navigation$pushUrl, key, newUrl));
			case 'NextSlide':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							slideshow: $author$project$Page$Animations$Helpers$Carousel$next(model.slideshow)
						}),
					$elm$core$Platform$Cmd$none);
			case 'PrevSlide':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							slideshow: $author$project$Page$Animations$Helpers$Carousel$prev(model.slideshow)
						}),
					$elm$core$Platform$Cmd$none);
			default:
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
		}
	});
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $elm$core$Array$bitMask = 4294967295 >>> (32 - $elm$core$Array$shiftStep);
var $elm$core$Basics$ge = _Utils_ge;
var $elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var $elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = $elm$core$Array$bitMask & (index >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (_v0.$ === 'SubTree') {
				var subTree = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _v0.a;
				return A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, values);
			}
		}
	});
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var $elm$core$Array$get = F2(
	function (index, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? $elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? $elm$core$Maybe$Just(
			A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, tail)) : $elm$core$Maybe$Just(
			A3($elm$core$Array$getHelp, startShift, index, tree)));
	});
var $author$project$Page$Saints$SaintList$convertToSaint = function (saintData) {
	return {
		alternativeNames: A2(
			$elm$core$Maybe$withDefault,
			'',
			A2($elm$core$Array$get, 2, saintData)),
		catholicCuisine: A2(
			$elm$core$Maybe$withDefault,
			'',
			A2($elm$core$Array$get, 6, saintData)),
		catholicOrgLink: A2(
			$elm$core$Maybe$withDefault,
			'',
			A2($elm$core$Array$get, 7, saintData)),
		catholicOrgVideoLink: A2(
			$elm$core$Maybe$withDefault,
			'',
			A2($elm$core$Array$get, 8, saintData)),
		catholicReadingsOrgLink: A2(
			$elm$core$Maybe$withDefault,
			'',
			A2($elm$core$Array$get, 15, saintData)),
		catholicSaintsInfoYoutubePlaylist: A2(
			$elm$core$Maybe$withDefault,
			'',
			A2($elm$core$Array$get, 13, saintData)),
		catholicSaintsLink: A2(
			$elm$core$Maybe$withDefault,
			'',
			A2($elm$core$Array$get, 5, saintData)),
		catholicSprouts: A2(
			$elm$core$Maybe$withDefault,
			'',
			A2($elm$core$Array$get, 21, saintData)),
		christianiconographyInfo: A2(
			$elm$core$Maybe$withDefault,
			'',
			A2($elm$core$Array$get, 11, saintData)),
		coloringPageLink: A2(
			$elm$core$Maybe$withDefault,
			'',
			A2($elm$core$Array$get, 20, saintData)),
		ewtnLink: A2(
			$elm$core$Maybe$withDefault,
			'',
			A2($elm$core$Array$get, 16, saintData)),
		feastDay: A2(
			$elm$core$Maybe$withDefault,
			'',
			A2($elm$core$Array$get, 3, saintData)),
		franciscanMediaLink: A2(
			$elm$core$Maybe$withDefault,
			'',
			A2($elm$core$Array$get, 10, saintData)),
		loyolaPressSaintStoriesForAllAges: A2(
			$elm$core$Maybe$withDefault,
			'',
			A2($elm$core$Array$get, 9, saintData)),
		moreYoutubeLinks: A2(
			$elm$core$Maybe$withDefault,
			'',
			A2($elm$core$Array$get, 18, saintData)),
		name: A2(
			$elm$core$Maybe$withDefault,
			'',
			A2($elm$core$Array$get, 1, saintData)),
		patronOf: A2(
			$elm$core$Maybe$withDefault,
			'',
			A2($elm$core$Array$get, 4, saintData)),
		representations: A2(
			$elm$core$Maybe$withDefault,
			'',
			A2($elm$core$Array$get, 14, saintData)),
		saintsAliveLink: A2(
			$elm$core$Maybe$withDefault,
			'',
			A2($elm$core$Array$get, 19, saintData)),
		score: A2(
			$elm$core$Maybe$withDefault,
			'',
			A2($elm$core$Array$get, 0, saintData)),
		teachingCatholicKidsLink: A2(
			$elm$core$Maybe$withDefault,
			'',
			A2($elm$core$Array$get, 17, saintData)),
		uCatholicLink: A2(
			$elm$core$Maybe$withDefault,
			'',
			A2($elm$core$Array$get, 12, saintData)),
		videoLinks: A2(
			$elm$core$Maybe$withDefault,
			'',
			A2($elm$core$Array$get, 22, saintData))
	};
};
var $elm$core$Elm$JsArray$foldl = _JsArray_foldl;
var $elm$core$Array$foldl = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldl, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldl, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldl,
			func,
			A3($elm$core$Elm$JsArray$foldl, helper, baseCase, tree),
			tail);
	});
var $author$project$Page$Saints$SaintList$convertToSaintList = function (responseData) {
	return A3(
		$elm$core$Array$foldl,
		function (data) {
			return function (list) {
				return _Utils_ap(
					list,
					_List_fromArray(
						[
							$author$project$Page$Saints$SaintList$convertToSaint(data)
						]));
			};
		},
		_List_Nil,
		responseData.values);
};
var $author$project$Page$Saints$SaintList$update = F2(
	function (msg, model) {
		if (msg.a.$ === 'Err') {
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						error: $elm$core$Maybe$Just('Error, please try again later'),
						isLoading: false
					}),
				$elm$core$Platform$Cmd$none);
		} else {
			var response = msg.a.a;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						isLoading: false,
						saints: $author$project$Page$Saints$SaintList$convertToSaintList(response)
					}),
				$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Page$FeastDayActivities$Main$update = F2(
	function (msg, model) {
		switch (msg.$) {
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
			default:
				var saintListMsg = msg.a;
				var _v1 = A2($author$project$Page$Saints$SaintList$update, saintListMsg, model.saintList);
				var newSaintList = _v1.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{saintList: newSaintList}),
					$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Page$Home$Sections$AnimationEnd = {$: 'AnimationEnd'};
var $author$project$Page$Home$Sections$ResumeAutoplay = {$: 'ResumeAutoplay'};
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $author$project$Page$Home$Sections$testimonials = _List_fromArray(
	[
		{author: 'Cam', avatar: 'C', quote: 'I love how there is a story, animation, and even music to learning prayers. We know that children often, if not always, learn first through their experiences and senses. The incorporation of such animation then will definitely help our children learn these prayers more easily.', subtitle: 'Mother of 2 & Social Worker'},
		{author: 'Catherine', avatar: 'C', quote: 'My children have been focusing on a consecration to their Guardian Angels this summer, and your Guardian Angel series has been a hit this week!', subtitle: 'Homeschool Mom'},
		{author: 'Anonymous Parent', avatar: 'A', quote: 'My children love these videos! They enjoy watching, rewatching, and seeing their favorite characters. Even though my kids know the prayers, the way the stories are put together give them new chances for when they can pray and how the faith is part of their little lives. Can’t wait for more!', subtitle: 'Parent'},
		{author: 'Anonymous Mother & Educator', avatar: 'A', quote: 'My five year old daughter came running as soon I started playing these videos. She loved every minute of it (she has a huge devotion to Mary) and she even turned the laptop so that it would completely face her as she watched.', subtitle: 'Educator'}
	]);
var $author$project$Page$Home$Sections$update = F2(
	function (msg, model) {
		var resumeAfterPause = A2(
			$elm$core$Task$perform,
			function (_v6) {
				return $author$project$Page$Home$Sections$ResumeAutoplay;
			},
			$elm$core$Process$sleep(60000));
		var maxIdx = $elm$core$List$length($author$project$Page$Home$Sections$testimonials) - 1;
		var wrap = function (n) {
			return (n < 0) ? maxIdx : ((_Utils_cmp(n, maxIdx) > 0) ? 0 : n);
		};
		var startAnim = F2(
			function (toIdx, dir) {
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							animDir: dir,
							animating: true,
							nextIndex: $elm$core$Maybe$Just(
								wrap(toIdx))
						}),
					A2(
						$elm$core$Task$perform,
						function (_v5) {
							return $author$project$Page$Home$Sections$AnimationEnd;
						},
						$elm$core$Process$sleep(450)));
			});
		switch (msg.$) {
			case 'NextAuto':
				return (model.animating || model.paused) ? _Utils_Tuple2(model, $elm$core$Platform$Cmd$none) : A2(startAnim, model.testiIndex + 1, 1);
			case 'NextArrow':
				if (model.animating) {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				} else {
					var _v1 = A2(startAnim, model.testiIndex + 1, 1);
					var m1 = _v1.a;
					var c1 = _v1.b;
					return _Utils_Tuple2(
						_Utils_update(
							m1,
							{paused: true}),
						$elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[c1, resumeAfterPause])));
				}
			case 'PrevArrow':
				if (model.animating) {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				} else {
					var _v2 = A2(startAnim, model.testiIndex - 1, -1);
					var m1 = _v2.a;
					var c1 = _v2.b;
					return _Utils_Tuple2(
						_Utils_update(
							m1,
							{paused: true}),
						$elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[c1, resumeAfterPause])));
				}
			case 'GoTesti':
				var i = msg.a;
				if (model.animating) {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				} else {
					var dir = _Utils_eq(i, model.testiIndex) ? 0 : ((_Utils_cmp(i, model.testiIndex) > 0) ? 1 : (-1));
					if (!dir) {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					} else {
						var _v3 = A2(startAnim, i, dir);
						var m1 = _v3.a;
						var c1 = _v3.b;
						return _Utils_Tuple2(
							_Utils_update(
								m1,
								{paused: true}),
							$elm$core$Platform$Cmd$batch(
								_List_fromArray(
									[c1, resumeAfterPause])));
					}
				}
			case 'AnimationEnd':
				var _v4 = model.nextIndex;
				if (_v4.$ === 'Just') {
					var toIdx = _v4.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{animDir: 0, animating: false, nextIndex: $elm$core$Maybe$Nothing, testiIndex: toIdx}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{animDir: 0, animating: false}),
						$elm$core$Platform$Cmd$none);
				}
			case 'ResumeAutoplay':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{paused: false}),
					$elm$core$Platform$Cmd$none);
			default:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{substackLoaded: true}),
					$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Page$Saints$Main$update = F3(
	function (key, msg, model) {
		switch (msg.$) {
			case 'LinkClicked':
				var urlRequest = msg.a;
				if (urlRequest.$ === 'Internal') {
					var url = urlRequest.a;
					return A2(
						$elm$core$String$contains,
						'saints',
						$elm$url$Url$toString(url)) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{url: url}),
						A2(
							$elm$browser$Browser$Navigation$pushUrl,
							key,
							$elm$url$Url$toString(url))) : _Utils_Tuple2(
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
					$elm$core$Platform$Cmd$none);
			case 'SetQuery':
				var newQuery = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{query: newQuery}),
					$elm$core$Platform$Cmd$none);
			case 'SaintListMsg':
				var saintListMsg = msg.a;
				var _v2 = A2($author$project$Page$Saints$SaintList$update, saintListMsg, model.saintList);
				var newSaintList = _v2.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{saintList: newSaintList}),
					$elm$core$Platform$Cmd$none);
			default:
				var viewType = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{patronageView: viewType}),
					$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Main$updatePage = F2(
	function (model, url) {
		var urlString = $elm$url$Url$toString(url);
		var isFileLink = function () {
			var fileExtensions = _List_fromArray(
				['.pdf', '.jpg', '.jpeg', '.png', '.webp', '.svg', '.mp4', '.doc', '.docx']);
			return A2(
				$elm$core$List$any,
				function (ext) {
					return A2($elm$core$String$endsWith, ext, urlString);
				},
				fileExtensions);
		}();
		return isFileLink ? _Utils_Tuple2(
			_Utils_update(
				model,
				{menuOpen: false}),
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						A2($elm$browser$Browser$Navigation$pushUrl, model.key, urlString)
					]))) : (A2($elm$core$String$contains, 'animations', urlString) ? _Utils_Tuple2(
			_Utils_update(
				model,
				{menuOpen: false, page: $author$project$Main$Productions, url: url}),
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						A2($elm$browser$Browser$Navigation$pushUrl, model.key, urlString)
					]))) : (A2($elm$core$String$contains, 'give', urlString) ? _Utils_Tuple2(
			_Utils_update(
				model,
				{menuOpen: false, page: $author$project$Main$Give, url: url}),
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						A2($elm$browser$Browser$Navigation$pushUrl, model.key, urlString),
						$author$project$Main$scrollToTopCmd
					]))) : (A2($elm$core$String$contains, 'contact', urlString) ? _Utils_Tuple2(
			_Utils_update(
				model,
				{menuOpen: false, page: $author$project$Main$Contact, url: url}),
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						A2($elm$browser$Browser$Navigation$pushUrl, model.key, urlString),
						$author$project$Main$scrollToTopCmd
					]))) : (A2($elm$core$String$contains, 'team', urlString) ? _Utils_Tuple2(
			_Utils_update(
				model,
				{menuOpen: false, page: $author$project$Main$AboutUs, url: url}),
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						A2($elm$browser$Browser$Navigation$pushUrl, model.key, urlString),
						$author$project$Main$scrollToTopCmd
					]))) : (A2($elm$core$String$contains, 'resources', urlString) ? _Utils_Tuple2(
			_Utils_update(
				model,
				{menuOpen: false, page: $author$project$Main$Resources, url: url}),
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						A2($elm$browser$Browser$Navigation$pushUrl, model.key, urlString),
						$author$project$Main$scrollToTopCmd
					]))) : (A2($elm$core$String$contains, 'prayers', urlString) ? _Utils_Tuple2(
			_Utils_update(
				model,
				{menuOpen: false, page: $author$project$Main$Prayers, url: url}),
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						A2($elm$browser$Browser$Navigation$pushUrl, model.key, urlString),
						$author$project$Main$scrollToTopCmd
					]))) : (A2($elm$core$String$contains, 'angelus', urlString) ? _Utils_Tuple2(
			_Utils_update(
				model,
				{menuOpen: false, page: $author$project$Main$Angelus, url: url}),
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						A2($elm$browser$Browser$Navigation$pushUrl, model.key, urlString),
						$author$project$Main$scrollToTopCmd
					]))) : (A2($elm$core$String$contains, 'shop', urlString) ? _Utils_Tuple2(
			_Utils_update(
				model,
				{menuOpen: false, page: $author$project$Main$Shop, url: url}),
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						A2($elm$browser$Browser$Navigation$pushUrl, model.key, urlString),
						$author$project$Main$scrollToTopCmd
					]))) : (A2($elm$core$String$contains, 'saints', urlString) ? _Utils_Tuple2(
			_Utils_update(
				model,
				{menuOpen: false, page: $author$project$Main$Saints, url: url}),
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						A2($elm$browser$Browser$Navigation$pushUrl, model.key, urlString),
						$author$project$Main$scrollToTopCmd
					]))) : (A2($elm$core$String$contains, 'press', urlString) ? _Utils_Tuple2(
			_Utils_update(
				model,
				{menuOpen: false, page: $author$project$Main$Press, url: url}),
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						A2($elm$browser$Browser$Navigation$pushUrl, model.key, urlString),
						$author$project$Main$scrollToTopCmd
					]))) : (A2($elm$core$String$contains, 'about/privacy-policy', urlString) ? _Utils_Tuple2(
			_Utils_update(
				model,
				{menuOpen: false, page: $author$project$Main$PrivacyPolicy, url: url}),
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						A2($elm$browser$Browser$Navigation$pushUrl, model.key, urlString),
						$author$project$Main$scrollToTopCmd
					]))) : (A2($elm$core$String$contains, 'about/terms-and-conditions', urlString) ? _Utils_Tuple2(
			_Utils_update(
				model,
				{menuOpen: false, page: $author$project$Main$TermsAndConditions, url: url}),
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						A2($elm$browser$Browser$Navigation$pushUrl, model.key, urlString),
						$author$project$Main$scrollToTopCmd
					]))) : (A2($elm$core$String$contains, 'feastdayactivities', urlString) ? _Utils_Tuple2(
			_Utils_update(
				model,
				{menuOpen: false, page: $author$project$Main$Feasts, url: url}),
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						A2($elm$browser$Browser$Navigation$pushUrl, model.key, urlString),
						$author$project$Main$scrollToTopCmd
					]))) : ((url.path === '/') ? _Utils_Tuple2(
			_Utils_update(
				model,
				{menuOpen: false, page: $author$project$Main$Home, url: url}),
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						A2($elm$browser$Browser$Navigation$pushUrl, model.key, urlString),
						$author$project$Main$scrollToTopCmd
					]))) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none)))))))))))))));
	});
var $author$project$Main$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'SectionsMsg':
				var sectionsMsg = msg.a;
				var _v1 = A2($author$project$Page$Home$Sections$update, sectionsMsg, model.sections);
				var updated = _v1.a;
				var sectionsCmd = _v1.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{sections: updated}),
					A2($elm$core$Platform$Cmd$map, $author$project$Main$SectionsMsg, sectionsCmd));
			case 'LinkClicked':
				var urlRequest = msg.a;
				if (urlRequest.$ === 'Internal') {
					var url = urlRequest.a;
					return A2($author$project$Main$updatePage, model, url);
				} else {
					var href = urlRequest.a;
					return _Utils_Tuple2(
						model,
						$elm$browser$Browser$Navigation$load(href));
				}
			case 'UrlChanged':
				var url = msg.a;
				var urlString = $elm$url$Url$toString(url);
				var pathChanged = !_Utils_eq(model.url.path, url.path);
				if (A2($elm$core$String$startsWith, '/animations/actofcontrition', url.path)) {
					return _Utils_Tuple2(
						model,
						A2($elm$browser$Browser$Navigation$pushUrl, model.key, '/animations/prayertimewithangels/1/actofcontritionprayer'));
				} else {
					var newPage = $author$project$Main$parseUrl(url);
					switch (newPage.$) {
						case 'Download':
							return _Utils_Tuple2(
								model,
								$elm$browser$Browser$Navigation$load(urlString));
						case 'Productions':
							var _v4 = A3(
								$author$project$Page$Animations$View$update,
								model.key,
								$author$project$Page$Animations$View$UrlChanged(url),
								model.animationsPageModel);
							var updatedAnimationsModel = _v4.a;
							var animCmd = _v4.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{animationsPageModel: updatedAnimationsModel, menuOpen: false, page: newPage, url: url}),
								pathChanged ? $elm$core$Platform$Cmd$batch(
									_List_fromArray(
										[
											A2($elm$core$Platform$Cmd$map, $author$project$Main$ProductionsMsg, animCmd),
											$author$project$Main$scrollToTopCmd
										])) : A2($elm$core$Platform$Cmd$map, $author$project$Main$ProductionsMsg, animCmd));
						default:
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{menuOpen: false, page: newPage, url: url}),
								pathChanged ? $author$project$Main$scrollToTopCmd : $elm$core$Platform$Cmd$none);
					}
				}
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
			case 'SaintsMsg':
				var saintsMsg = msg.a;
				var _v5 = A3($author$project$Page$Saints$Main$update, model.key, saintsMsg, model.saintsPageModel);
				var updatedSaintsModel = _v5.a;
				var cmd = _v5.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{saintsPageModel: updatedSaintsModel}),
					A2($elm$core$Platform$Cmd$map, $author$project$Main$SaintsMsg, cmd));
			case 'FeastsMsg':
				var feastsMsg = msg.a;
				var _v6 = A2($author$project$Page$FeastDayActivities$Main$update, feastsMsg, model.feastsPageModel);
				var updatedFeastsModel = _v6.a;
				var cmd = _v6.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{feastsPageModel: updatedFeastsModel}),
					A2($elm$core$Platform$Cmd$map, $author$project$Main$FeastsMsg, cmd));
			case 'ProductionsMsg':
				var productionsMsg = msg.a;
				var _v7 = A3($author$project$Page$Animations$View$update, model.key, productionsMsg, model.animationsPageModel);
				var updatedProductionsModel = _v7.a;
				var cmd = _v7.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{animationsPageModel: updatedProductionsModel}),
					A2($elm$core$Platform$Cmd$map, $author$project$Main$ProductionsMsg, cmd));
			case 'ToggleMenu':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{menuOpen: !model.menuOpen}),
					$elm$core$Platform$Cmd$none);
			case 'ConsentChanged':
				var data = msg.a;
				return A2($elm$core$Debug$log, 'data.analytics', data.analytics) ? _Utils_Tuple2(
					model,
					$author$project$Ports$GoogleAnalytics$enableAnalytics(_Utils_Tuple0)) : _Utils_Tuple2(
					model,
					$author$project$Ports$GoogleAnalytics$setConsent(
						{ads: false, analytics: false}));
			case 'LoadGA':
				return _Utils_Tuple2(
					model,
					$author$project$Ports$GoogleAnalytics$addGAScript(_Utils_Tuple0));
			case 'GALoaded':
				return _Utils_Tuple2(
					model,
					$author$project$Ports$GoogleAnalytics$initGA(_Utils_Tuple0));
			default:
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Main$ToggleMenu = {$: 'ToggleMenu'};
var $author$project$Theme$Layout$headerMargin = 10;
var $elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var $elm$html$Html$map = $elm$virtual_dom$VirtualDom$map;
var $author$project$Page$About$PrivacyPolicy$Main$viewBody = A2(
	$elm$html$Html$div,
	_List_Nil,
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h1,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('m-10')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Privacy Policy')
				])),
			A2(
			$elm$html$Html$h2,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('m-10')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Privacy Policy and Digital Millennium Copyright Act Notice')
				])),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('m-10')
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
							$elm$html$Html$text('This privacy policy explains the privacy practices of Claritas Studios ("CS") and how CS treats your information.')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('my-5')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('CS collects your personal information, including email addresses.  There is also information about your computer hardware and software that is automatically collected by CS, which can include your IP address, browser type, domain names, access times and referring Web site addresses.  CS will use your personal information to fulfill a contract, in particular, in facilitating and processing transactions, and where it is necessary to fulfill CS\'s legitimate interests, which include operating CS web site, providing the services and goods described on CS\'s web sites, verifying your identity, determining how to improve CS\'s web sites, monitoring activity on CS\'s web sites, responding to your comments or questions, informing you of areas of interest or services available from CS, and fulfilling contracts made with you.  We collect your information when you give CS consent, for purposes which are required by law and for the purposes of responding to requests by government, a court of law or law enforcement authorities conducting an investigation.  CS retains your personal information for as long as is necessary to provide the services to you and to comply with legal obligations.  If you no longer want CS to use your personal information you can request that CS erase your personal information by contacting us at privacy@catholicstoriesforchildren.org however CS will retain information as is necessary for CS legitimate business interests.  If you have questions about CS\'s privacy practices, please contact us at privacy@catholicstoriesforchildren.com.')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('my-5')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('CS encourages you to review the privacy statements of web sites you choose to link to from CS so that you can understand how those Web sites collect, use and share your information. CS is not responsible for the privacy statements or other content on Web sites outside of the CS and CS family of Web sites, or the web sites to which CS has linked, such as YouTube, and the sites hosting videos. ')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('my-5')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Please notify CS if you believe any of your intellectual property rights have been infringed.  Pursuant to section 512 of the Copyright Act ("DMCA").  CS designates the following individual as its agent for receipt of notifications of claimed infringement:   CS, Trevor Rothaus, trevor@claritasstudios.com, 532 N Magnolia Ave., Anaheim, CA, 92801.  To be effective, the notification should include:  (a) a physical or electronic signature of the person authorized to act on behalf of the owner of the right being infringed, (b) identification of the copyrighted work claimed to have been infringed, or if multiple copyrighted works at a single online site are covered by a single notification, a representative list of such works at the site; (c) identification of the material that is claimed to be infringing or to be the subject of infringing activity, and information sufficient to permit us to locate the material; (d) information sufficient to allow us to contact the complaining party; (e) a statement that the complaining party has a good faith belief that use of the material in the manner  complained of is not authorized by the copyright or intellectual property owner, agent, or the law; and (f) a statement that the information in the notification is accurate and, under penalty of perjury, that the complaining party is authorized to act on behalf of the owner of the right being infringed.  If you fail to comply with all of these requirements, your DMCA notification may not be valid.')
						]))
				]))
		]));
var $elm$html$Html$footer = _VirtualDom_node('footer');
var $elm$html$Html$h4 = _VirtualDom_node('h4');
var $author$project$Component$Footer$viewFooter = A2(
	$elm$html$Html$footer,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('bg-black text-white pt-16 pb-10 px-6 md:px-12 border-t border-white/10')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10')
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
									$elm$html$Html$Attributes$class('text-xl font-semibold mb-2')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Claritas Studios')
								])),
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-sm opacity-80')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('A 501(c)(3) nonprofit bringing Catholic stories to life through animation.')
								]))
						])),
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$h4,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-lg font-semibold mb-2')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Browse')
								])),
							A2(
							$elm$html$Html$ul,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('space-y-2')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$li,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$elm$html$Html$a,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$href('/saints'),
													$elm$html$Html$Attributes$class('hover:underline')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('Saints')
												]))
										])),
									A2(
									$elm$html$Html$li,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$elm$html$Html$a,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$href('/prayers'),
													$elm$html$Html$Attributes$class('hover:underline')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('Prayers')
												]))
										])),
									A2(
									$elm$html$Html$li,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$elm$html$Html$a,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$href('/animations'),
													$elm$html$Html$Attributes$class('hover:underline')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('Animations')
												]))
										])),
									A2(
									$elm$html$Html$li,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$elm$html$Html$a,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$href('/feastdayactivities'),
													$elm$html$Html$Attributes$class('hover:underline')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('Feast Day Calendar')
												]))
										])),
									A2(
									$elm$html$Html$li,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$elm$html$Html$a,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$href('https://shop.claritasstudios.com'),
													$elm$html$Html$Attributes$class('hover:underline')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('Shop')
												]))
										]))
								]))
						])),
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$h4,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-lg font-semibold mb-2')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('About')
								])),
							A2(
							$elm$html$Html$ul,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('space-y-2')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$li,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$elm$html$Html$a,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$href('/team'),
													$elm$html$Html$Attributes$class('hover:underline')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('Our Mission')
												]))
										])),
									A2(
									$elm$html$Html$li,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$elm$html$Html$a,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$href('/give'),
													$elm$html$Html$Attributes$class('hover:underline')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('Support Us')
												]))
										])),
									A2(
									$elm$html$Html$li,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$elm$html$Html$a,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$href('/contact'),
													$elm$html$Html$Attributes$class('hover:underline')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('Contact')
												]))
										]))
								]))
						])),
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$h4,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-lg font-semibold mb-2')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Connect')
								])),
							A2(
							$elm$html$Html$ul,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('space-y-2')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$li,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$elm$html$Html$a,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$href('https://www.youtube.com/@claritasstudios'),
													$elm$html$Html$Attributes$target('_blank'),
													$elm$html$Html$Attributes$class('hover:underline')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('YouTube')
												]))
										])),
									A2(
									$elm$html$Html$li,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$elm$html$Html$a,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$href('https://www.facebook.com/claritasstudios'),
													$elm$html$Html$Attributes$target('_blank'),
													$elm$html$Html$Attributes$class('hover:underline')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('Facebook')
												]))
										])),
									A2(
									$elm$html$Html$li,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$elm$html$Html$a,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$href('https://www.instagram.com/claritasstudios'),
													$elm$html$Html$Attributes$target('_blank'),
													$elm$html$Html$Attributes$class('hover:underline')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('Instagram')
												]))
										])),
									A2(
									$elm$html$Html$li,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$elm$html$Html$a,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$href('https://www.pinterest.com/claritasstudios'),
													$elm$html$Html$Attributes$target('_blank'),
													$elm$html$Html$Attributes$class('hover:underline')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('Pinterest')
												]))
										])),
									A2(
									$elm$html$Html$li,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$elm$html$Html$a,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$href('https://blog.claritasstudios.com/'),
													$elm$html$Html$Attributes$target('_blank'),
													$elm$html$Html$Attributes$class('hover:underline')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('Blog')
												]))
										]))
								]))
						]))
				])),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('max-w-7xl mx-auto mt-10 pt-6 border-t border-white/10 text-sm flex flex-col md:flex-row items-center md:justify-between gap-3')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('© 2025 Claritas Studios. All rights reserved.')
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('flex items-center gap-3')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$a,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$href('/about/privacy-policy'),
									$elm$html$Html$Attributes$class('hover:underline')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Privacy Policy')
								])),
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('opacity-60 select-none'),
									A2($elm$html$Html$Attributes$attribute, 'aria-hidden', 'true')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('•')
								])),
							A2(
							$elm$html$Html$a,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$href('/about/terms-and-conditions'),
									$elm$html$Html$Attributes$class('hover:underline')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Terms & Conditions')
								]))
						]))
				]))
		]));
var $author$project$Page$About$PrivacyPolicy$Main$view = A2(
	$elm$html$Html$div,
	_List_Nil,
	_List_fromArray(
		[$author$project$Page$About$PrivacyPolicy$Main$viewBody, $author$project$Component$Footer$viewFooter]));
var $author$project$Page$About$TermsAndConditions$Main$viewBody = A2(
	$elm$html$Html$div,
	_List_Nil,
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h1,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('m-10')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Terms and Conditions of Use')
				])),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('m-10')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(' These terms and conditions govern your use of the Claritas Studios website, accessible from https://claritasstudios.com/.  ')
						])),
					A2(
					$elm$html$Html$h2,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('m-10')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('1. Acceptance of Terms')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('m-10')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('By accessing this website, you agree to be bound by these terms and conditions, all applicable laws, and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.')
						])),
					A2(
					$elm$html$Html$h2,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('m-10')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('2. Use License')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mt-10 mx-10')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Permission is granted to temporarily download one copy of the materials (information or software) on Claritas Studios\'s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license, you may not:')
						])),
					A2(
					$elm$html$Html$ul,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('list-disc')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$li,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('mx-20')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('modify or copy the materials;')
								])),
							A2(
							$elm$html$Html$li,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('mx-20')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('use the materials for any commercial purpose or for any public display (commercial or non-commercial);')
								])),
							A2(
							$elm$html$Html$li,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('mx-20')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('attempt to decompile or reverse engineer any software contained on Claritas Studios\'s website;')
								])),
							A2(
							$elm$html$Html$li,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('mx-20')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('remove any copyright or other proprietary notations from the materials; or')
								])),
							A2(
							$elm$html$Html$li,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('mx-20')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('transfer the materials to another person or "mirror" the materials on any other server.')
								]))
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('m-10')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('This license shall automatically terminate if you violate any of these restrictions and may be terminated by Claritas Studios at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.')
						])),
					A2(
					$elm$html$Html$h2,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('m-10')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('3. Disclaimer')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('m-10')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('The materials on Claritas Studios\'s website are provided on an \'as is\' basis. Claritas Studios makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('m-10')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Further, Claritas Studios does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.')
						])),
					A2(
					$elm$html$Html$h2,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('m-10')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('4. Limitation of Liability')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('m-10')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('In no event shall Claritas Studios or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Claritas Studios\'s website, even if Claritas Studios or a Claritas Studios authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.')
						])),
					A2(
					$elm$html$Html$h2,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('m-10')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('5. Revisions and Errata')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('m-10')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('The materials appearing on Claritas Studios\'s website could include technical, typographical, or photographic errors. Claritas Studios does not warrant that any of the materials on its website are accurate, complete, or current. Claritas Studios may make changes to the materials contained on its website at any time without notice. However, Claritas Studios does not make any commitment to update the materials.')
						])),
					A2(
					$elm$html$Html$h2,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('m-10')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('6. Links to Third-Party Sites')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('m-10')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Claritas Studios has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Claritas Studios of the site. Use of any such linked website is at the user\'s own risk.')
						])),
					A2(
					$elm$html$Html$h2,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('m-10')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('7. Site Terms of Use Modifications')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('m-10')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Claritas Studios may revise these terms of use for its website at any time without notice. By using this website you are agreeing to be bound by the then-current version of these Terms and Conditions of Use.')
						])),
					A2(
					$elm$html$Html$h2,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('m-10')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('8. Governing Law and Jurisdiction')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('m-10')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('These terms and conditions are governed by and construed in accordance with the laws of the state of California and the applicable laws of the United States of America. You agree that any legal action or proceeding between Claritas Studios and you for any purpose concerning these terms and conditions or the obligations hereunder shall be brought exclusively in a court of competent jurisdiction sitting in the State of California, and you expressly waive any objection that you may have now or hereafter to the laying of the venue or to the jurisdiction of any such court over you.')
						])),
					A2(
					$elm$html$Html$h2,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('m-10')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('9. Privacy Policy')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('m-10')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Your use of Claritas Studios\'s website is also governed by our Privacy Policy. Please review our ')
								])),
							A2(
							$elm$html$Html$a,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$href('/about/privacy-policy'),
									$elm$html$Html$Attributes$class('text-blue-600 underline'),
									$elm$html$Html$Attributes$target('_blank')
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
									$elm$html$Html$text(' for information on how we collect, use, and protect your personal information.')
								]))
						])),
					A2(
					$elm$html$Html$h2,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('m-10')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('10. Contact Information')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('m-10')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('If you have any questions about these terms and conditions, please visit our '),
							A2(
							$elm$html$Html$a,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$href('/team/#contact'),
									$elm$html$Html$Attributes$class('text-blue-600 underline'),
									$elm$html$Html$Attributes$target('_blank')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('contact page')
								]))
						]))
				]))
		]));
var $author$project$Page$About$TermsAndConditions$Main$view = A2(
	$elm$html$Html$div,
	_List_Nil,
	_List_fromArray(
		[$author$project$Page$About$TermsAndConditions$Main$viewBody, $author$project$Component$Footer$viewFooter]));
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
var $author$project$Page$Animations$Productions$getEpisodeIdFromLink = function (link) {
	return A2(
		$elm$core$Maybe$withDefault,
		'',
		$elm$core$List$head(
			$elm$core$List$reverse(
				A2($elm$core$String$split, '/', link))));
};
var $elm$url$Url$percentEncode = _Url_percentEncode;
var $elm$core$String$filter = _String_filter;
var $author$project$Page$Animations$Helpers$removeSpaces = function (str) {
	return A2(
		$elm$core$String$filter,
		function (c) {
			return !_Utils_eq(
				c,
				_Utils_chr(' '));
		},
		str);
};
var $author$project$Page$Animations$Helpers$stringToURL = function (s) {
	return $elm$url$Url$percentEncode(
		$author$project$Page$Animations$Helpers$removeSpaces(
			$elm$core$String$toLower(s)));
};
var $author$project$Page$Animations$Productions$getProductionFromURLPath = function (production) {
	return $elm$core$List$head(
		A2(
			$elm$core$List$filter,
			function (p) {
				return _Utils_eq(
					production,
					$author$project$Page$Animations$Helpers$stringToURL(p.title));
			},
			$author$project$Page$Animations$Productions$productions));
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
var $author$project$Page$Animations$Productions$getSeasonFromURLPath = F2(
	function (production, season) {
		var mp = $author$project$Page$Animations$Productions$getProductionFromURLPath(production);
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
var $author$project$Page$Animations$Productions$getEpisodeFromURLPath = F3(
	function (production, season, episode) {
		var _v0 = A2($author$project$Page$Animations$Productions$getSeasonFromURLPath, production, season);
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
								$author$project$Page$Animations$Productions$getEpisodeIdFromLink(e.link));
						}),
					A2(
						$elm$core$Maybe$map,
						function (p) {
							return p.episodes;
						},
						ms))));
	});
var $author$project$Page$Animations$View$getTitleFromEpisodeRoute = function (r) {
	var _v0 = _Utils_Tuple3(r.production, r.season, r.episode);
	_v0$3:
	while (true) {
		if (_v0.a.$ === 'Just') {
			if (_v0.b.$ === 'Just') {
				if (_v0.c.$ === 'Just') {
					var productionURL = _v0.a.a;
					var seasonURL = _v0.b.a;
					var episodeUrl = _v0.c.a;
					var _v1 = A3($author$project$Page$Animations$Productions$getEpisodeFromURLPath, productionURL, seasonURL, episodeUrl);
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
					var _v3 = A2($author$project$Page$Animations$Productions$getSeasonFromURLPath, productionURL, seasonURL);
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
					var _v6 = $author$project$Page$Animations$Productions$getProductionFromURLPath(productionURL);
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
var $author$project$Page$Animations$View$getTitleFromRoute = function (urlRoute) {
	if (urlRoute.$ === 'Just') {
		var r = urlRoute.a.a;
		return $author$project$Page$Animations$View$getTitleFromEpisodeRoute(r);
	} else {
		return '';
	}
};
var $author$project$Page$Animations$View$viewAbout = function (episode) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('mt-10 px-5 md:px-0 max-w-3xl text-white mx-auto text-lg')
			]),
		_List_fromArray(
			[episode.about]));
};
var $author$project$Page$Animations$View$viewActivities = function (episode) {
	return $elm$core$String$isEmpty(episode.activities.pdfLink) ? A2($elm$html$Html$span, _List_Nil, _List_Nil) : A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('px-5 md:px-0')
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
						$elm$html$Html$text(episode.title + ' Activities')
					])),
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('mb-5')
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
												$elm$html$Html$Attributes$src(episode.activities.thumbnailLink),
												A2($elm$html$Html$Attributes$attribute, 'loading', 'lazy'),
												A2($elm$html$Html$Attributes$attribute, 'decoding', 'async')
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
												$elm$html$Html$Attributes$src(episode.activities.answerThumbnailLink),
												A2($elm$html$Html$Attributes$attribute, 'loading', 'lazy'),
												A2($elm$html$Html$Attributes$attribute, 'decoding', 'async')
											]),
										_List_Nil)
									]))
							]))
					]))
			]));
};
var $author$project$Page$Animations$View$viewEpisodes = function (production) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('flex overflow-x-auto space-x-4 scrollbar-hide'),
				$elm$html$Html$Attributes$class('flex-none cursor-pointer'),
				A2($elm$html$Html$Attributes$style, 'scroll-behavior', 'smooth')
			]),
		A2(
			$elm$core$List$map,
			function (episode) {
				return A2(
					$elm$html$Html$a,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$href(episode.link),
							$elm$html$Html$Attributes$class('flex-none w-64 md:w-80 group pt-5 pl-5')
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
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('relative mb-2 rounded-lg transform scale-100 translate-z-0'),
											$elm$html$Html$Attributes$class('transition-all duration-300 group-hover:scale-[1.02]'),
											$elm$html$Html$Attributes$class('group-hover:before:border-[4px] rounded-lg'),
											$elm$html$Html$Attributes$class('before:absolute before:inset-[-7px] before:rounded-lg group-hover:before:border group-hover:before:border-white')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('aspect-video rounded-lg overflow-hidden')
												]),
											_List_fromArray(
												[
													A2(
													$elm$html$Html$img,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$src(episode.thumbnail),
															$elm$html$Html$Attributes$alt(episode.title),
															A2($elm$html$Html$Attributes$attribute, 'loading', 'lazy'),
															A2($elm$html$Html$Attributes$attribute, 'decoding', 'async'),
															$elm$html$Html$Attributes$class('w-full h-full object-cover')
														]),
													_List_Nil)
												]))
										]))
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('px-1 transition-colors duration-300 group-hover:text-white')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$h3,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('text-gray-300 font-semibold mb-1 transition-colors duration-300 group-hover:text-white')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(episode.title)
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('flex items-center text-gray-400 text-sm group-hover:text-white')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$span,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('text-sm font-medium px-2 py-1 border border-gray-400 rounded group-hover:border-white')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text(production.age)
												])),
											A2(
											$elm$html$Html$span,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('mx-2 text-xs opacity-50')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('•')
												])),
											$elm$html$Html$text(episode.year),
											A2(
											$elm$html$Html$span,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('mx-2 text-xs opacity-50')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('•')
												])),
											$elm$html$Html$text(episode.duration)
										]))
								]))
						]));
			},
			$elm$core$List$concat(
				A2(
					$elm$core$List$map,
					function ($) {
						return $.episodes;
					},
					production.seasons))));
};
var $author$project$Page$Animations$Helpers$productionToThumbnailData = function (series) {
	return {
		isDisabled: false,
		link: '/animations/' + ($author$project$Page$Animations$Helpers$stringToURL(series.title) + '?tab=episodes'),
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
var $author$project$Page$Animations$Helpers$thumbnailIsActive = F2(
	function (thumbnail, activeEpisode) {
		if (activeEpisode.$ === 'Just') {
			var episode = activeEpisode.a;
			return _Utils_eq(thumbnail.title, episode.title);
		} else {
			return false;
		}
	});
var $author$project$Page$Animations$Helpers$viewAnimationThumbnail = F2(
	function (activeEpisode, thumbnail) {
		var _v0 = thumbnail.isDisabled ? _Utils_Tuple3(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('grayscale hover:cursor-not-allowed')
				]),
			_List_Nil) : (A2($author$project$Page$Animations$Helpers$thumbnailIsActive, thumbnail, activeEpisode) ? _Utils_Tuple3(
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
								$elm$html$Html$Attributes$alt(thumbnail.title + ' thumbnail'),
								$elm$html$Html$Attributes$class('w-full h-auto')
							]),
						imgStyle),
					_List_Nil)
				]));
	});
var $author$project$Page$Animations$Helpers$viewAnimationThumbnails = F3(
	function (cols, thumbnails, activeEpisode) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('w-full'),
					$elm$html$Html$Attributes$class('my-5 md:my-20')
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
							$author$project$Page$Animations$Helpers$viewAnimationThumbnail(activeEpisode),
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
var $author$project$Page$Animations$Helpers$viewAnimationThumbnailsSmall = F2(
	function (activeEpisode, thumbnails) {
		return A3($author$project$Page$Animations$Helpers$viewAnimationThumbnails, 'md:grid-cols-3', thumbnails, activeEpisode);
	});
var $author$project$Page$Animations$View$viewSuggestedProductions = function (currentProduction) {
	var suggestedProductions = A2(
		$elm$core$List$take,
		5,
		A2(
			$elm$core$List$filter,
			function (p) {
				return !_Utils_eq(p.link, currentProduction.link);
			},
			$author$project$Page$Animations$Productions$productions));
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('px-5 md:px-0')
			]),
		_List_fromArray(
			[
				A2(
				$author$project$Page$Animations$Helpers$viewAnimationThumbnailsSmall,
				$elm$core$Maybe$Nothing,
				A2($elm$core$List$map, $author$project$Page$Animations$Helpers$productionToThumbnailData, suggestedProductions))
			]));
};
var $author$project$Page$Animations$View$VideoDetailsTabClick = function (a) {
	return {$: 'VideoDetailsTabClick', a: a};
};
var $elm$html$Html$button = _VirtualDom_node('button');
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
var $author$project$Page$Animations$View$viewVideoDetailTabs = F3(
	function (episodeCount, model, episode) {
		var selectedClass = 'active text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500';
		var nonSelectedClass = 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300';
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-lg md:text-xl font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700')
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
											'inline-block p-4 border-b-2 rounded-t-lg ' + (_Utils_eq(model.videoDetailTab, $author$project$Page$Animations$View$Episodes) ? selectedClass : nonSelectedClass)),
											$elm$html$Html$Events$onClick(
											$author$project$Page$Animations$View$VideoDetailsTabClick($author$project$Page$Animations$View$Episodes))
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Episodes')
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
											'inline-block p-4 border-b-2 rounded-t-lg ' + (_Utils_eq(model.videoDetailTab, $author$project$Page$Animations$View$Details) ? selectedClass : nonSelectedClass)),
											$elm$html$Html$Events$onClick(
											$author$project$Page$Animations$View$VideoDetailsTabClick($author$project$Page$Animations$View$Details))
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Details')
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
											'inline-block p-4 border-b-2 rounded-t-lg ' + (_Utils_eq(model.videoDetailTab, $author$project$Page$Animations$View$Activities) ? selectedClass : nonSelectedClass)),
											$elm$html$Html$Events$onClick(
											$author$project$Page$Animations$View$VideoDetailsTabClick($author$project$Page$Animations$View$Activities))
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
											'inline-block p-4 border-b-2 rounded-t-lg ' + (_Utils_eq(model.videoDetailTab, $author$project$Page$Animations$View$Suggested) ? selectedClass : nonSelectedClass)),
											$elm$html$Html$Events$onClick(
											$author$project$Page$Animations$View$VideoDetailsTabClick($author$project$Page$Animations$View$Suggested))
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
var $author$project$Page$Animations$Helpers$viewVideo = F2(
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
var $author$project$Page$Animations$View$Asl = {$: 'Asl'};
var $author$project$Page$Animations$View$Spanish = {$: 'Spanish'};
var $author$project$Page$Animations$View$Urdu = {$: 'Urdu'};
var $author$project$Page$Animations$View$VideoTabClick = function (a) {
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
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
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
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$selected = $elm$html$Html$Attributes$boolProperty('selected');
var $author$project$Page$Animations$View$toLanguageName = function (option) {
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
var $author$project$Page$Animations$View$toString = function (option) {
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
var $author$project$Page$Animations$View$toVideoOption = function (str) {
	switch (str) {
		case 'english':
			return $author$project$Page$Animations$View$English;
		case 'spanish':
			return $author$project$Page$Animations$View$Spanish;
		case 'urdu':
			return $author$project$Page$Animations$View$Urdu;
		case 'asl':
			return $author$project$Page$Animations$View$Asl;
		default:
			return $author$project$Page$Animations$View$English;
	}
};
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $author$project$Page$Animations$View$viewVideoPlayerTabs = F2(
	function (model, page) {
		var availableLanguages = A2(
			$elm$core$List$filter,
			function (_v1) {
				var link = _v1.b;
				return !$elm$core$String$isEmpty(link);
			},
			_List_fromArray(
				[
					_Utils_Tuple2($author$project$Page$Animations$View$English, page.videoLinks.english),
					_Utils_Tuple2($author$project$Page$Animations$View$Spanish, page.videoLinks.spanish),
					_Utils_Tuple2($author$project$Page$Animations$View$Urdu, page.videoLinks.urdu),
					_Utils_Tuple2($author$project$Page$Animations$View$Asl, page.videoLinks.asl)
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
								A2($elm$core$Basics$composeR, $author$project$Page$Animations$View$toVideoOption, $author$project$Page$Animations$View$VideoTabClick)))
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
										$author$project$Page$Animations$View$toString(language)),
										$elm$html$Html$Attributes$selected(
										_Utils_eq(model.videoTab, language))
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(
										$author$project$Page$Animations$View$toLanguageName(language))
									]));
						},
						availableLanguages))
				]));
	});
var $author$project$Page$Animations$View$viewVideoPlayers = F2(
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
							return A2($author$project$Page$Animations$Helpers$viewVideo, page.videoTitles.english, page.videoLinks.english);
						case 'Spanish':
							return $elm$core$String$isEmpty(page.videoLinks.spanish) ? A2($author$project$Page$Animations$Helpers$viewVideo, page.videoTitles.english, page.videoLinks.english) : A2($author$project$Page$Animations$Helpers$viewVideo, page.videoTitles.spanish, page.videoLinks.spanish);
						case 'Asl':
							return $elm$core$String$isEmpty(page.videoLinks.asl) ? A2($author$project$Page$Animations$Helpers$viewVideo, page.videoTitles.english, page.videoLinks.english) : A2($author$project$Page$Animations$Helpers$viewVideo, page.videoTitles.asl, page.videoLinks.asl);
						default:
							return $elm$core$String$isEmpty(page.videoLinks.urdu) ? A2($author$project$Page$Animations$Helpers$viewVideo, page.videoTitles.english, page.videoLinks.english) : A2($author$project$Page$Animations$Helpers$viewVideo, page.videoTitles.urdu, page.videoLinks.urdu);
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
							A2($author$project$Page$Animations$View$viewVideoPlayerTabs, model, page),
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
var $author$project$Page$Animations$View$viewEpisode = F4(
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
			var _v7 = _Utils_Tuple3(
				episodeCount,
				model.videoDetailTab,
				$elm$core$String$isEmpty(episode.activities.pdfLink));
			if ((_v7.a === 1) && (_v7.b.$ === 'Episodes')) {
				if (!_v7.c) {
					var _v8 = _v7.b;
					return _Utils_update(
						model,
						{videoDetailTab: $author$project$Page$Animations$View$Activities});
				} else {
					var _v9 = _v7.b;
					return _Utils_update(
						model,
						{videoDetailTab: $author$project$Page$Animations$View$Details});
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
					$elm$html$Html$Attributes$class('py-5 px-0 md:px-11'),
					$elm$html$Html$Attributes$class('mb-10'),
					$elm$html$Html$Attributes$class('max-w-7xl')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$h1,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('text-2xl md:text-4xl font-bold mb-5 text-white')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(episode.title)
						])),
					A2($author$project$Page$Animations$View$viewVideoPlayers, newModel, episode),
					A3($author$project$Page$Animations$View$viewVideoDetailTabs, episodeCount, newModel, episode),
					function () {
					var _v0 = newModel.videoDetailTab;
					switch (_v0.$) {
						case 'Episodes':
							return (episodeCount > 1) ? A2(
								$elm$html$Html$map,
								function (_v1) {
									return $author$project$Page$Animations$View$NoOp;
								},
								$author$project$Page$Animations$View$viewEpisodes(production)) : ((!$elm$core$String$isEmpty(episode.activities.pdfLink)) ? A2(
								$elm$html$Html$map,
								function (_v2) {
									return $author$project$Page$Animations$View$NoOp;
								},
								$author$project$Page$Animations$View$viewActivities(episode)) : A2(
								$elm$html$Html$map,
								function (_v3) {
									return $author$project$Page$Animations$View$NoOp;
								},
								$author$project$Page$Animations$View$viewAbout(episode)));
						case 'Activities':
							return A2(
								$elm$html$Html$map,
								function (_v4) {
									return $author$project$Page$Animations$View$NoOp;
								},
								$author$project$Page$Animations$View$viewActivities(episode));
						case 'Details':
							return A2(
								$elm$html$Html$map,
								function (_v5) {
									return $author$project$Page$Animations$View$NoOp;
								},
								$author$project$Page$Animations$View$viewAbout(episode));
						default:
							return A2(
								$elm$html$Html$map,
								function (_v6) {
									return $author$project$Page$Animations$View$NoOp;
								},
								$author$project$Page$Animations$View$viewSuggestedProductions(production));
					}
				}()
				]));
	});
var $author$project$Page$Animations$Helpers$viewAnimationThumbnailsLarge = function (thumbnails) {
	return A3($author$project$Page$Animations$Helpers$viewAnimationThumbnails, 'lg:grid-cols-2', thumbnails, $elm$core$Maybe$Nothing);
};
var $author$project$Page$Animations$View$viewProductions = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('relative left-1/2 -translate-x-1/2 px-11 max-w-7xl')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('m-auto max-w-7xl')
					]),
				_List_fromArray(
					[
						$author$project$Page$Animations$Helpers$viewAnimationThumbnailsLarge(
						A2($elm$core$List$map, $author$project$Page$Animations$Helpers$productionToThumbnailData, $author$project$Page$Animations$Productions$productions))
					]))
			]));
};
var $author$project$Page$Animations$View$viewProductionEpisodes = F2(
	function (model, productionURL) {
		var _v0 = $author$project$Page$Animations$Productions$getProductionFromURLPath(productionURL);
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
				return A4($author$project$Page$Animations$View$viewEpisode, model, production, 1, e);
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
							$author$project$Page$Animations$View$viewEpisodes(production)
						]));
			}
		} else {
			return $author$project$Page$Animations$View$viewProductions(model);
		}
	});
var $author$project$Page$Animations$View$viewSeasonEpisodes = F3(
	function (model, productionURL, seasonURL) {
		var _v0 = A2($author$project$Page$Animations$Productions$getSeasonFromURLPath, productionURL, seasonURL);
		if ((_v0.a.$ === 'Just') && (_v0.b.$ === 'Just')) {
			var production = _v0.a.a;
			var season = _v0.b.a;
			var pageEpisode = $elm$core$List$head(season.episodes);
			if (pageEpisode.$ === 'Just') {
				var e = pageEpisode.a;
				return A4($author$project$Page$Animations$View$viewEpisode, model, production, season.number, e);
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
							$author$project$Page$Animations$View$viewEpisodes(production)
						]));
			}
		} else {
			return $author$project$Page$Animations$View$viewProductions(model);
		}
	});
var $author$project$Page$Animations$View$viewSpecificEpisode = F4(
	function (model, productionURL, seasonURL, episodeUrl) {
		var _v0 = A3($author$project$Page$Animations$Productions$getEpisodeFromURLPath, productionURL, seasonURL, episodeUrl);
		if (((_v0.a.$ === 'Just') && (_v0.b.$ === 'Just')) && (_v0.c.$ === 'Just')) {
			var production = _v0.a.a;
			var season = _v0.b.a;
			var pageEpisode = _v0.c.a;
			return pageEpisode.isFundraising ? pageEpisode.about : A4($author$project$Page$Animations$View$viewEpisode, model, production, season.number, pageEpisode);
		} else {
			return $author$project$Page$Animations$View$viewProductions(model);
		}
	});
var $author$project$Page$Animations$View$viewEpisodeRoute = F2(
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
						return A4($author$project$Page$Animations$View$viewSpecificEpisode, model, productionURL, seasonURL, episodeUrl);
					} else {
						var productionURL = _v0.a.a;
						var seasonURL = _v0.b.a;
						var _v1 = _v0.c;
						return A3($author$project$Page$Animations$View$viewSeasonEpisodes, model, productionURL, seasonURL);
					}
				} else {
					if (_v0.c.$ === 'Nothing') {
						var productionURL = _v0.a.a;
						var _v2 = _v0.b;
						var _v3 = _v0.c;
						return A2($author$project$Page$Animations$View$viewProductionEpisodes, model, productionURL);
					} else {
						break _v0$3;
					}
				}
			} else {
				break _v0$3;
			}
		}
		return $author$project$Page$Animations$View$viewProductions(model);
	});
var $author$project$Page$Animations$View$viewBody = F2(
	function (model, urlRoute) {
		if (urlRoute.$ === 'Just') {
			var r = urlRoute.a.a;
			return A2($author$project$Page$Animations$View$viewEpisodeRoute, model, r);
		} else {
			return $author$project$Page$Animations$View$viewProductions(model);
		}
	});
var $author$project$Page$Animations$View$view = F2(
	function (url, model) {
		var urlRoute = $author$project$Page$Animations$View$parseRoute(url);
		var title = $author$project$Page$Animations$View$getTitleFromRoute(urlRoute);
		return {
			body: _List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('bg-black text-white')
						]),
					_List_fromArray(
						[
							A2($author$project$Page$Animations$View$viewBody, model, urlRoute),
							$author$project$Component$Footer$viewFooter
						]))
				]),
			title: title + ' - Claritas Studios'
		};
	});
var $elm$html$Html$Attributes$hidden = $elm$html$Html$Attributes$boolProperty('hidden');
var $elm$html$Html$Attributes$width = function (n) {
	return A2(
		_VirtualDom_attribute,
		'width',
		$elm$core$String$fromInt(n));
};
var $author$project$Page$Contact$View$viewContactInfo = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('text-center')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('Please reach out.'),
							A2($elm$html$Html$br, _List_Nil, _List_Nil),
							$elm$html$Html$text('I love to hear from you!')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'overflow-wrap', 'anywhere'),
							$elm$html$Html$Attributes$class('mt-3 lg:mt-5')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'display', 'inline-block')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('trevor'),
									A2(
									$elm$html$Html$span,
									_List_Nil,
									_List_fromArray(
										[
											$elm$html$Html$text('@')
										]))
								])),
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$attribute, 'aria-hidden', 'true'),
									A2(
									$elm$html$Html$Attributes$property,
									'innerHTML',
									$elm$json$Json$Encode$string('🍯'))
								]),
							_List_Nil),
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$attribute, 'aria-hidden', 'true'),
									A2(
									$elm$html$Html$Attributes$property,
									'innerHTML',
									$elm$json$Json$Encode$string('spam@catholicstoriesforchildren.com'))
								]),
							_List_Nil),
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$height(0),
									$elm$html$Html$Attributes$width(0),
									A2($elm$html$Html$Attributes$style, 'display', 'none'),
									$elm$html$Html$Attributes$hidden(true)
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('spam@catholicstoriesforchildren.com')
								])),
							A2(
							$elm$html$Html$span,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('claritasstudios'),
									A2(
									$elm$html$Html$span,
									_List_Nil,
									_List_fromArray(
										[
											$elm$html$Html$text('.'),
											A2(
											$elm$html$Html$span,
											_List_Nil,
											_List_fromArray(
												[
													$elm$html$Html$text('com')
												]))
										]))
								]))
						]))
				]))
		]));
var $author$project$Page$Contact$View$viewBody = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('h-screen'),
			$elm$html$Html$Attributes$class('bg-black text-white'),
			$elm$html$Html$Attributes$class('p-10')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h1,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-center'),
					$elm$html$Html$Attributes$class('my-10')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Contact Me')
				])),
			$author$project$Page$Contact$View$viewContactInfo
		]));
var $author$project$Page$Contact$View$view = A2(
	$elm$html$Html$div,
	_List_Nil,
	_List_fromArray(
		[$author$project$Page$Contact$View$viewBody, $author$project$Component$Footer$viewFooter]));
var $author$project$Page$FeastDayActivities$FeastDayHelpers$Date = function (a) {
	return {$: 'Date', a: a};
};
var $elm$url$Url$Parser$query = function (_v0) {
	var queryParser = _v0.a;
	return $elm$url$Url$Parser$Parser(
		function (_v1) {
			var visited = _v1.visited;
			var unvisited = _v1.unvisited;
			var params = _v1.params;
			var frag = _v1.frag;
			var value = _v1.value;
			return _List_fromArray(
				[
					A5(
					$elm$url$Url$Parser$State,
					visited,
					unvisited,
					params,
					frag,
					value(
						queryParser(params)))
				]);
		});
};
var $elm$url$Url$Parser$questionMark = F2(
	function (parser, queryParser) {
		return A2(
			$elm$url$Url$Parser$slash,
			parser,
			$elm$url$Url$Parser$query(queryParser));
	});
var $elm$url$Url$Parser$Internal$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var $elm$url$Url$Parser$Query$custom = F2(
	function (key, func) {
		return $elm$url$Url$Parser$Internal$Parser(
			function (dict) {
				return func(
					A2(
						$elm$core$Maybe$withDefault,
						_List_Nil,
						A2($elm$core$Dict$get, key, dict)));
			});
	});
var $elm$url$Url$Parser$Query$string = function (key) {
	return A2(
		$elm$url$Url$Parser$Query$custom,
		key,
		function (stringList) {
			if (stringList.b && (!stringList.b.b)) {
				var str = stringList.a;
				return $elm$core$Maybe$Just(str);
			} else {
				return $elm$core$Maybe$Nothing;
			}
		});
};
var $author$project$Page$FeastDayActivities$FeastDayHelpers$urlDateParser = A2(
	$elm$url$Url$Parser$questionMark,
	A2(
		$elm$url$Url$Parser$questionMark,
		$elm$url$Url$Parser$s('feastdayactivities'),
		$elm$url$Url$Parser$Query$string('m')),
	$elm$url$Url$Parser$Query$string('d'));
var $author$project$Page$FeastDayActivities$FeastDayHelpers$route = A2(
	$elm$url$Url$Parser$map,
	function (m) {
		return function (d) {
			return $author$project$Page$FeastDayActivities$FeastDayHelpers$Date(
				{date: d, month: m});
		};
	},
	$author$project$Page$FeastDayActivities$FeastDayHelpers$urlDateParser);
var $author$project$Page$FeastDayActivities$FeastDayHelpers$parseRoute = $elm$url$Url$Parser$parse($author$project$Page$FeastDayActivities$FeastDayHelpers$route);
var $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio = {$: 'Audio'};
var $author$project$Page$FeastDayActivities$FeastDayHelpers$Crafts = {$: 'Crafts'};
var $author$project$Page$FeastDayActivities$FeastDayHelpers$Food = {$: 'Food'};
var $author$project$Page$FeastDayActivities$FeastDayHelpers$More = {$: 'More'};
var $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading = {$: 'OnlineReading'};
var $author$project$Page$FeastDayActivities$FeastDayHelpers$Video = {$: 'Video'};
var $author$project$Page$FeastDayActivities$FeastDays$M04Apr$april = {
	color: '#ebdf72',
	feasts: _List_fromArray(
		[
			{
			date: '02',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Video, image: '', link: 'https://www.youtube-nocookie.com/embed/8SL_wCW_Srs', snippet: '', title: 'St. Francis of Paola'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://mycatholic.life/wp-content/uploads/2021/08/My-Catholic-Life-MCL-Header.jpg', link: 'https://mycatholic.life/saints/saints-of-the-liturgical-year/april-2-saint-francis-of-paola-hermit/', snippet: 'James Martotille and his bride wedded and lived in the town of Paola, in the southernmost region of Italy. During the first years of their marriage, they were unable to conceive a child. Being devout Catholics, they turned to prayer and beseeched the intercession of Saint Francis of Assisi...', title: 'Saint Francis of Paola, Hermit'}
						]),
					feast: 'Saint Francis of Paola'
				}
				])
		},
			{
			date: '04',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-isidore-of-seville/', snippet: 'The 76 years of Isidore’s life were a time of conflict and growth for the Church in Spain. The Visigoths had invaded the land a century and a half earlier, and shortly before Isidore’s birth they set up their own capital. They were Arians...', title: 'Saint Isidore of Seville’s Story'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://mycatholic.life/wp-content/uploads/2021/08/My-Catholic-Life-MCL-Header.jpg', link: 'https://mycatholic.life/saints/saints-of-the-liturgical-year/april-4-saint-isidore-bishop-and-doctor-of-the-church/', snippet: 'Isidore, a man of great distinction, bishop of the church of Seville, successor and brother of bishop Leander, flourished from the time of Emperor Maurice and King Reccared. In him antiquity reasserted itself...', title: 'Saint Isidore, Bishop and Doctor of the Church'}
						]),
					feast: 'Saint Isidore'
				}
				])
		},
			{
			date: '05',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://mycatholic.life/wp-content/uploads/2021/08/My-Catholic-Life-MCL-Header.jpg', link: 'https://mycatholic.life/saints/saints-of-the-liturgical-year/april-5-saint-vincent-ferrer-priest/', snippet: 'It can be said that today’s saint lived two sequential lives. The first forty-nine years of his life were, in many ways, a preparation for the final twenty years of his life...', title: 'Saint Vincent Ferrer, Priest'}
						]),
					feast: 'Saint Vincent Ferrer'
				}
				])
		},
			{
			date: '07',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://mycatholic.life/wp-content/uploads/2021/08/My-Catholic-Life-MCL-Header.jpg', link: 'https://mycatholic.life/saints/saints-of-the-liturgical-year/april-7-saint-john-baptist-de-la-salle-priest/', snippet: 'Saint John Baptist de La Salle died on Good Friday, perhaps as a divine sign of the sacrificial life he had lived for the salvation of souls...', title: 'Saint John Baptist de la Salle, Priest'}
						]),
					feast: 'Saint John Baptist de la Salle'
				}
				])
		},
			{
			date: '11',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Stanislaus'}
				])
		},
			{
			date: '13',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Video, image: '', link: 'https://www.youtube-nocookie.com/embed/ZrJ-7ZVzvKE', snippet: '', title: 'Hosanna'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Video, image: '', link: 'https://www.youtube-nocookie.com/embed/O___M05czhg', snippet: '', title: 'What is Holy Week? Palm Sunday, Holy Thursday, Good Friday, and Easter!'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Video, image: '', link: 'https://www.youtube-nocookie.com/embed/1ssgKEadTL8', snippet: '', title: 'Palm Sunday and the Passion- For Kids'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/palm-sunday-crafts-and-ideas-for-kids/', snippet: 'Celebrating Palm Sunday with your family is a great way to live the liturgical year at home with your kids! It begins the last week of Lent, and there are a lot of fun and meaningful ways to celebrate Palm Sunday with your kids...', title: 'Celebrate Palm Sunday (Crafts and Ideas for Kids)'}
						]),
					feast: 'Palm Sunday of the Lord\'s Passion'
				},
					{activities: _List_Nil, feast: 'Saint Martin I'}
				])
		},
			{
			date: '17',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://mycatholic.life/wp-content/uploads/2021/08/My-Catholic-Life-MCL-Header.jpg', link: 'https://mycatholic.life/saints/saints-of-the-liturgical-year/holy-thursday/', snippet: 'Holy Thursday is also called Maundy Thursday. “Maundy” comes from the Latin word mandatum, which is translated “mandate.” It is on this night that...', title: 'Holy Thursday'}
						]),
					feast: 'Holy Thursday'
				}
				])
		},
			{
			date: '18',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Good Friday'}
				])
		},
			{
			date: '19',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://mycatholic.life/wp-content/uploads/2021/08/My-Catholic-Life-MCL-Header.jpg', link: 'https://mycatholic.life/catholic-prayers/triduum-and-easter-prayers/prayer-meditation-for-holy-saturday/', snippet: 'My Lord, today all is silent. You have given Your precious life for the salvation of the world.  You died a horrific death, poured out all Mercy from Your wounded Heart, and now You rest in peace in the tomb as the soldiers keep vigil...', title: 'Prayer Meditation for Holy Saturday'}
						]),
					feast: 'Holy Saturday'
				}
				])
		},
			{
			date: '20',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Video, image: '', link: 'https://www.youtube-nocookie.com/embed/7z7XN9vmOOM', snippet: '', title: 'Easter Octave'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://mycatholic.life/wp-content/uploads/2021/08/My-Catholic-Life-MCL-Header.jpg', link: 'https://mycatholic.life/saints/saints-of-the-liturgical-year/easter-sunday/', snippet: 'Alleluia!  He is Risen! Saying those words is like drinking a tall glass of cold water after being out in the desert all day.  Lent is over. It is time to celebrate the great joy of Easter!', title: 'Easter Sunday'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Crafts, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/count-down-the-easter-season-printable-countdown-bunting/', snippet: 'The Easter season lasts 50 days for Catholics, which is 10 more days than Lent! It’s like St. Pope John Paul II said, “We are an Easter people and Alleluia is our song!”', title: 'Count Down The Easter Season'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/easy-easter-cookie-recipe-birds-nests-with-eggs/', snippet: 'When I am planning fun Easter treats with the kids, I always love to include things that have symbols that point back to the true meaning of Easter...', title: 'Easy Easter Cookie Recipe- Bird’s Nests With Eggs!'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/how-to-make-easter-story-cookies-with-a-printable-recipe/', snippet: 'Making Easter Story Cookies (Aka, resurrection cookies) is a fun way to celebrate the true meaning of Easter with your kids!', title: 'How To Make Easter Story Cookies'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/50-days-of-easter/', snippet: 'All the Easter crafts, snacks, games, books, etc. couldn’t possibly all happen on actual Easter Sunday- it’s too much! But that’s ok because the Church, in her infinite wisdom, granted an entire season of Easter that lasts for 50 days, all the way through Pentecost!', title: 'Celebrating The Entire Easter Season With Catholic Kids- All 50 Days!'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/Cultivating_Catholics_Logo_GpMJodURB.png?updatedAt=1680400021552', link: 'https://cultivatingcatholics.com/how-to-engage-your-3-7-year-olds-in-the-triduum/', snippet: 'As we move into Holy Week, it is important to help the youngest Catholics understand and engage with several days of long liturgies.', title: 'How to engage your 3-7 year olds in the Triduum'}
						]),
					feast: 'Easter Sunday'
				}
				])
		},
			{
			date: '21',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Anselm of Canterbury'}
				])
		},
			{
			date: '23',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint George'},
					{activities: _List_Nil, feast: 'Saint Adalbert'}
				])
		},
			{
			date: '24',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Fidelis of Sigmaringen'}
				])
		},
			{
			date: '25',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Mark the Evangelist'}
				])
		},
			{
			date: '27',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Divine Mercy Sunday'}
				])
		},
			{
			date: '28',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Peter Chanel'},
					{activities: _List_Nil, feast: 'Saint Louis Grignon de Montfort'}
				])
		},
			{
			date: '29',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Catherine of Siena'}
				])
		},
			{
			date: '30',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Pope Saint Pius V'}
				])
		}
		]),
	key: 'apr',
	month: 'April'
};
var $author$project$Page$FeastDayActivities$FeastDays$M08Aug$august = {
	color: '#ebdf72',
	feasts: _List_fromArray(
		[
			{
			date: '01',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Alphonsus Maria de Liguori'}
				])
		},
			{
			date: '02',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Eusebius of Vercelli'},
					{activities: _List_Nil, feast: 'Saint Peter Julian Eymund'}
				])
		},
			{
			date: '04',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint John Mary Vianney (the Curé of Ars)'}
				])
		},
			{
			date: '05',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Dedication of the Basilica of Saint Mary Major'}
				])
		},
			{
			date: '06',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Transfiguration of the Lord'}
				])
		},
			{
			date: '07',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Pope Saint Sixtus II'},
					{activities: _List_Nil, feast: 'Saint Cajetan'}
				])
		},
			{
			date: '08',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Dominic de Guzman'}
				])
		},
			{
			date: '09',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Teresa Benedicta of the Cross (Edith Stein)'}
				])
		},
			{
			date: '10',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Lawrence of Rome'}
				])
		},
			{
			date: '11',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Clare of Assisi'}
				])
		},
			{
			date: '12',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Jeanne de Chantal'}
				])
		},
			{
			date: '13',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Pope Saint Pontian and Saint Hippolytus of Rome'}
				])
		},
			{
			date: '14',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Maximilian Kolbe'}
				])
		},
			{
			date: '15',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Blessed Virgin Mary (Her Assumption)'}
				])
		},
			{
			date: '16',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Stephen of Hungary'}
				])
		},
			{
			date: '19',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint John Eudes'}
				])
		},
			{
			date: '20',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Bernard of Clairvaux'}
				])
		},
			{
			date: '21',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Pope Saint Pius X'}
				])
		},
			{
			date: '22',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Queenship of Blessed Virgin Mary'}
				])
		},
			{
			date: '23',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Rose of Lima'}
				])
		},
			{
			date: '24',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Bartholomew the Apostle'}
				])
		},
			{
			date: '25',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Louis IX'},
					{activities: _List_Nil, feast: 'Saint Joseph Calasanz'}
				])
		},
			{
			date: '27',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Monica'}
				])
		},
			{
			date: '28',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Augustine of Hippo'}
				])
		},
			{
			date: '29',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint John the Baptist (His Passion)'}
				])
		}
		]),
	key: 'aug',
	month: 'August'
};
var $author$project$Page$FeastDayActivities$FeastDays$M12Dec$december = {
	color: '#ebdf72',
	feasts: _List_fromArray(
		[
			{
			date: '03',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Francis Xavier'}
				])
		},
			{
			date: '04',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint John Damascene'}
				])
		},
			{
			date: '06',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Nicholas of Myra'}
				])
		},
			{
			date: '07',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Ambrose of Milan'}
				])
		},
			{
			date: '09',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Immaculate Conception of the Blessed Virgin Mary'},
					{activities: _List_Nil, feast: 'Saint Juan Diego'}
				])
		},
			{
			date: '10',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Our Lady of Loreto'}
				])
		},
			{
			date: '11',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Pope Saint Damasus I'}
				])
		},
			{
			date: '12',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Our Lady of Guadalupe'}
				])
		},
			{
			date: '13',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Lucy of Syracuse'}
				])
		},
			{
			date: '14',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint John of the Cross'}
				])
		},
			{
			date: '21',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Peter Canisius'}
				])
		},
			{
			date: '23',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint John of Kanty'}
				])
		},
			{
			date: '25',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Nativity of the Lord'}
				])
		},
			{
			date: '26',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Stephen the Martyr'}
				])
		},
			{
			date: '27',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint John the Apostle'}
				])
		},
			{
			date: '28',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Holy Innocents'}
				])
		},
			{
			date: '29',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Thomas a Becket'}
				])
		},
			{
			date: '30',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Holy Family'}
				])
		},
			{
			date: '31',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Pope Saint Sylvester I'}
				])
		}
		]),
	key: 'dec',
	month: 'December'
};
var $author$project$Page$FeastDayActivities$FeastDayHelpers$Images = {$: 'Images'};
var $author$project$Page$FeastDayActivities$FeastDays$M02Feb$february = {
	color: '#395d73',
	feasts: _List_fromArray(
		[
			{
			date: '01',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Ansgar'},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-brigid', snippet: 'By Julianne Stanz Transcript Saint Brigid is the patron saint of fire, healing, midwives, and childbirth. She’s a bit of a busy bee. We celebrate her feast day on February 1st, which is known as Imbolc, one of the great fire festivals of the Irish. As the shamrock became associated with Saint Patri...', title: 'Saint Brigid'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-brigid-feb-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! The Feast of Brigid, also known as Imbolc, celebrates the arrival of longer, warmer days and the early signs of spring. On Imbolc Eve Brigid visits virtuous households and blesses the inhabitants. St. Brigid represents Purity, Protection and Parturition', title: 'Brigid'}
						]),
					feast: 'Saint Brigid'
				}
				])
		},
			{
			date: '02',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/ideas-for-celebrating-candlemas-feb-2/', snippet: 'There are tons of fun and traditional ways to celebrate Candlemas with Catholic kids so let’s look at some ideas that may work for your family...', title: 'How To Celebrate Candlemas With Catholic Children'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/presentation-of-the-lord/', snippet: 'Being an observant Jewish couple, it stands to reason that Mary and Joseph went to the Temple for Mary’s purification—as prescribed by Mosaic Law—40 days after Jesus’ birth. The blessing of candles and the procession of light were added to this feast, giving it the popular name “Candlemas.”', title: 'Story of Presentation of the Lord'}
						]),
					feast: 'The Presentation of the Lord'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-candlemas-feb-2-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! The Story of Candlemas Candlemas, also known as the Feast of the Presentation of Our Lord Jesus, is a Christian Holy Day commemorating the presentation of Jesus at the Temple. It falls on February 2, which is traditionally the 40th day of the Christmas–Epiphany season. While it is customary for Chr...', title: 'Candlemas'}
						]),
					feast: 'Candlemas'
				}
				])
		},
			{
			date: '03',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-blase', snippet: 'If you are already familiar with St. Blaise, it is probably because of the blessing of throats—a Catholic custom on his feast. According to tradition, Blaise had been a doctor before he was ordained a priest. He became the bishop of Sebaste (now in central Turkey). During a period of persecution, h...', title: 'Saint Blaise'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-blaise-feb-3-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Blaise’s Story \u00A0 We know more about the devotion to Saint\u00A0Blaise by Christians around the world than we know about the saint himself. His feast is observed as a holy day in some Eastern Churches. In 1222, the Council of Oxford prohibited servile labor in England on Blaise’s feast day. The Germ...', title: 'Blaise'}
						]),
					feast: 'Saint Blaise'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-ansgar-feb-3', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! The “apostle of the north” (Scandinavia) had enough frustrations to become a saint—and he did. He became a Benedictine at Corbie, France, where he had been educated. Three years later, when the king of Denmark became a convert, Ansgar went to that country for three years of missionary work, without noticeable success...', title: 'Saint Ansgar'}
						]),
					feast: 'Saint Ansgar'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-blaise-feb-3', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Werburgh\'s Story \u200B The Legend of St Werburgh A Benedictine and Patroness St Werburgh was a Benedictine and patroness of Chester, Abbess of Weedon, Trentham, Hanbury, Minster in Sheppey, and Ely. She was born in Staffordshire early in the seventh century and died at Trentham in 3rd February in...', title: 'Saint Werburgh'}
						]),
					feast: 'Saint Werburgh'
				}
				])
		},
			{
			date: '04',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-rabanus-maurus', snippet: 'Come, Creator, Spirit, come from your bright heavenly throne, come take possession of our souls, and make them all your own.You who are called the Paraclete, best gift of God above, the living spring, the vital fire sweet christ’ning and true love. . . .O guide our minds with your best light, with l...', title: 'Saint Rabanus Maurus'}
						]),
					feast: 'Saint Rabanus Maurus'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-2-of-st-blaise-feb-3', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Joseph of Leonissa’s Story \u200B Joseph of Leonissa, OFM Cap.;\u00A0 was the third of eight children born at Leonessa (Italy) on January 8, 1556. At baptism he was given the name Eufranio. Impressed by the example of Matthew Silvestri, who had left the medical profession to embrace the Capuchin life an...', title: 'Joseph of Leonessa'}
						]),
					feast: 'Saint Joseph of Leonessa'
				}
				])
		},
			{
			date: '05',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://lpress-craft.loyolapress.com/images/ocf-articles/Microsites/SaintsStories_100x100.jpeg', link: 'https://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-agatha/', snippet: 'Saint Agatha is the patroness of nurses, foundry workers, miners, jewelers, and Alpine guides. She is invoked against fire, earthquakes, famine, thunderstorms, and volcanic eruptions. In Italy, her feast day is celebrated with fireworks. According to some stories...', title: 'Saint Agatha'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-agatha/', snippet: 'One of the four virgin martyrs celebrated in the Catholic calendar of saints, Saint Agatha was arrested during the persecution of Decius in 251. Tortured for her beauty and tempted to violate her chastity, Agatha was eventually martyred.', title: 'Story of Saint Agatha'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-agatha-feb-5-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! The Story of St. Agatha, also known as Agatha of Sicily, is one of the most highly venerated virgin martyrs of the Catholic Church. It is believed that she was born around 231 in either Catania or Palermo, Sicily to a rich and noble family. From her very early years, the notably beautiful Agatha de...', title: 'Agatha'}
						]),
					feast: 'Saint Agatha'
				}
				])
		},
			{
			date: '06',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-paul-miki-and-companions', snippet: 'When the first missionaries, like St. Francis Xavier, came to Japan in 1549 they were welcomed. Many Japanese became Christians. When the leader Hideyoshi took command, he feared that Christians would take over the government. In 1587 he banished them and destroyed many of their churches. Some missi...', title: 'Saint Paul Miki and Companions'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-paul-miki-companions-f-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint\u00A0Paul Miki and Companions’ Story \u200B Nagasaki, Japan, is familiar to Americans as the city on which the second atomic bomb was dropped, immediately killing over 37,000 people. Three and a half centuries before, 26 martyrs of Japan were crucified on a hill, now known as the Holy Mountain, overlook...', title: 'Paul Miki & Companions'}
						]),
					feast: 'Saint Paul Miki and Companions'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-dorothy-of-caesarea-feb--1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! The Story of Saint\u00A0Dorothy of Caesarea \u00A0 The Holy Martyr Dorothy and the Martyrs Christina, Callista and Theophilus lived in Caesarea of Cappadocia and suffered under Emperor Diocletian in either the year 288 or 300. \u200B St. Dorothy was a pious Christian maiden, distinguished by her great beauty, humi...', title: 'Dorothy of Caesarea'}
						]),
					feast: 'Saint Dorothy of Caesarea'
				}
				])
		},
			{
			date: '07',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Colette'},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-dorothy-of-caesarea-feb-', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Theodore Stratelates\' Story \u200B The holy Martyr Theodore was from Euchaita of Galatia and dwelt in Heraclea of Pontus. He was a renowned commander in the military, and the report came to the Emperor Licinius that he was a Christian and abominated the idols. Licinius therefore sent certain men to...', title: 'Theodore Stratelates'}
						]),
					feast: 'Saint Theodore Stratelates'
				}
				])
		},
			{
			date: '08',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/st-josephine-bakhita-resources-for-kids/', snippet: 'Let’s look at some celebrating the life of St. Bakhita for kids with crafts, printables, and even more resources.', title: 'St. Josephine Bakhita Resources For Kids (Crafts, Printables, More!)'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://lpress-craft.loyolapress.com/images/ocf-articles/Microsites/SaintsStories_100x100.jpeg', link: 'https://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-josephine-bakhita/', snippet: 'Saint Josephine, affectionately known as Bakhita (“fortunate one”), was born in the southern Sudan region of Darfur. She was kidnapped as a child and sold into slavery...', title: 'Saint Josephine, Bakhita'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-josephine-bakhita-feb-8-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint\u00A0Josephine Bakhita\'s Story \u200B Josephine Bakhita (1869-1947) \u00A0 Mother Josephine Bakhita was born in Sudan in 1869 and died in Schio (Vicenza)\u00A0\u00A0in 1947. This African flower, who knew the anguish of kidnapping and slavery, bloomed marvelously in Italy, in response to God\'s grace, with the Daughters...', title: 'Josephine Bakhita'}
						]),
					feast: 'Saint Josephine Bakhita'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-jerome-emiliani', snippet: 'Jerome Emiliani was born in Venice. As a soldier, he was captured during battle and imprisoned. In a dungeon he thought about his life, which had been far from virtuous. He decided to change and dedicated himself to the Virgin Mary. After a miraculous escape from prison, Jerome returned to Venice. H...', title: 'Saint Jerome Emiliani'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-jerome-emiliani-feb-8-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Jerome Emiliani’s Story \u200B Born wealthy, the son of Angelo and Eleanor Mauroceni Emiliani. His father died when Jerome was a teenager, and he ran away from home at age 15. After a dissolute youth, he became a soldier in Venice, Italy in 1506. Commanded the League of Cambrai forces at the fortre...', title: 'Jerome Emiliani'}
						]),
					feast: 'Saint Jerome Emiliani'
				}
				])
		},
			{
			date: '09',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-miguel-febres-cordero', snippet: 'How would you like to have a teacher who was described like this: He was kind to everyone and treated all of his students, rich or poor, the same. He liked to be with the students, and they liked to be with him. All of the children in the school loved him. That is exactly what a saint said about tod...', title: 'Saint Miguel Febres Cordero'}
						]),
					feast: 'Saint Miguel Febres Cordero'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-apollonia-feb-9-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Apollonia’s Story \u200B The persecution of Christians began in Alexandria during the reign of the Emperor Philip. The first victim of the pagan mob was an old man named Metrius, who was tortured and then stoned to death. The second person who refused to worship their false idols was a Christian wo...', title: 'Apollonia'}
						]),
					feast: 'Saint Apollonia'
				}
				])
		},
			{
			date: '10',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://lpress-craft.loyolapress.com/images/ocf-articles/Microsites/SaintsStories_100x100.jpeg', link: 'https://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-scholastica/', snippet: 'Saint Scholastica was the twin sister of Saint Benedict. Benedict studied in Rome but then decided to devote all of his life to the search for God. He organized several community dwellings and finally established a very important monastery at Monte Cassino. Then Scholastica...', title: 'Saint Scholastica'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-scholastica', snippet: 'Saint Scholastica was the twin sister of Saint Benedict. Benedict studied in Rome but then decided to devote all of his life to the search for God. He organized several community dwellings and finally established a very important monastery at Monte Cassino. Then Scholastica helped her brother found...', title: 'Saint Scholastica'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-scholastica-feb-10-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint\u00A0Scholastica\'s Story \u200B St. Scholastica, sister of St. Benedict, consecrated her\u00A0life\u00A0to\u00A0God\u00A0from her earliest youth. After her brother went to Monte Cassino, where he established his famous monastery, she took up her abode in the neighborhood at Plombariola, where she founded and governed a mon...', title: 'Scholastica'}
						]),
					feast: 'Saint Scholastica'
				}
				])
		},
			{
			date: '11',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Crafts, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/our-lady-of-lourdes-craft/', snippet: 'It prints on 3 pages, and comes in both black & white AND in color, so you can choose if you want to color it yourself or not...', title: 'Our Lady Of Lourdes Diorama (Printable Craft For Catholic Kids!)'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://lpress-craft.loyolapress.com/images/ocf-articles/Microsites/SaintsStories_100x100.jpeg', link: 'https://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/our-lady-of-lourdes/', snippet: 'Each year over 2 million people make their way through the mountainous country of southeastern France to Lourdes. They come seeking cures, hoping to find answers, believing, and praying. At Lourdes...', title: 'Our Lady of Lourdes'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://2.bp.blogspot.com/_pUXaddJMQyw/TU9zVNqMGvI/AAAAAAAAEt4/SFvGzWmY7ZY/s400/rice+krispie+grotto+2.jpg', link: 'https://www.catholicicing.com/rice-krispie-treat-grotto-for-our-lady/', snippet: 'It prints on 3 pages, and comes in both black & white AND in color, so you can choose if you want to color it yourself or not...', title: 'Rice Krispie Treat Grotto Tor Our Lady Of Lourdes'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/our-lady-of-lourdes/', snippet: 'Devotion to Our Lady of Lourdes runs deep in the hearts of the faithful as a sign of God’s care and healing. The mediation of Mary, his mother, is a real consolation to those who suffer any ill.', title: 'Story of Our Lady of Lourdes'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/our-lady-of-lourdes', snippet: 'Each year over 2 million people make their way through the mountainous country of southeastern France to Lourdes. They come seeking cures, hoping to find answers, believing, and praying. At Lourdes, people recall the Lady dressed in white, with a blue sash, yellow roses at her feet, and a Rosary on...', title: 'Our Lady of Lourdes'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-our-lady-of-lourdes-feb-11', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! The Story of Saint\u00A0Eulalia of Barcelona \u200B The daughter of a noble family, Eulalia lived near the city of Barcelona. During the persecutions under Diocletian, governor\u00A0Dacian\u00A0arrived in the city intent on enforcing the decrees. Some time later, Eulalia entered the city and confronted the governor for...', title: 'Our Lady of Lourdes'}
						]),
					feast: 'Our Lady of Lourdes'
				}
				])
		},
			{
			date: '12',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-apollonia/', snippet: 'Saint Apollonia is the patron saint of dentists because her teeth were knocked out by an angry mob. Hardly the way we would wish a dentist to extract our teeth, but Saint Apollonia certainly evidenced great courage in her defiance of those who were attacking Christians.', title: 'Story of Saint Apollonia'}
						]),
					feast: 'Saint Apollonia'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-benedict-of-aniane', snippet: 'Next to St. Benedict himself, St. Benedict of Aniane influenced the shape of Benedictine monasticism in the West more than anyone else. Allied with Holy Roman emperors Charlemagne and Louis the Pious, he promulgated a strict and idealistic monastic reform that lasted nearly two centuries. And Benedi...', title: 'Saint Benedict of Aniane'}
						]),
					feast: 'Saint Benedict of Aniane'
				}
				])
		},
			{
			date: '13',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-giles-mary-of-saint-joseph/', snippet: 'Simple, humble persons can sometimes be powerful in their effect on and work with the people of God. Saint Giles Mary of Saint Joseph was such a man. Giles Mary was loved on the streets of Naples for his goodness born of prayer.', title: 'Story of Saint Giles Mary of Saint Joseph'}
						]),
					feast: 'Saint Giles Mary of Saint Joseph'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-ermenilda-of-ely-feb-13', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! The Story of St. Catherine de Ricci \u200B St. Catherine was born in\u00A0Florence\u00A0in 1522. Her baptismal name was Alexandrina, but she took the name of Catherine upon entering religion. From her earliest infancy she manifested a great love of prayer, and in her sixth year, her father placed her in the\u00A0conven...', title: 'Catherine de Ricci'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-catherine-dei-ricci', snippet: 'We are curious about mystics who experience ecstasies and visions. But we tend to regard them as psychologically unbalanced persons. However, when we get to know a genuine mystic like St. Catherine dei Ricci we must abandon our stereotypical view. Catherine was a very competent woman who trained nun...', title: 'Saint Catherine dei Ricci'}
						]),
					feast: 'Saint Catherine de Ricci'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-our-lady-of-lourdes-feb-11-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! The Story of Georgia \u200B A virgin hermitess near Clermont, Auvergne, France. \u200B Saint Gregory of Tours in his Historia Francorum tells us that when Saint Georgia was buried angels, in the form of doves, followed her coffin to her grave. \u200B https://the-american-catholic.com/2020/02/15/saint-of-the-day-q...', title: 'Ermenilda of Ely'}
						]),
					feast: 'Ermenilda of Ely'
				}
				])
		},
			{
			date: '14',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://lpress-craft.loyolapress.com/images/ocf-articles/Microsites/SaintsStories_100x100.jpeg', link: 'https://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saints-cyril-and-methodius/', snippet: 'Cyril and Methodius were brothers, born in Thessalonika, Greece. Cyril (825–869), a philosopher, studied in Constantinople and was ordained a priest. Methodius (826–884), for five years the governor of a Slavic region of the empire, became a monk...', title: 'Saints Cyril and Methodius'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/celebrating-st-valentines-day-with-catholic-kids/', snippet: 'Today I am going to share with you some pintables, resources, crafts, and books to celebrate the true meaning of St. Valentine’s Day with Catholic kids...', title: 'Celebrating St. Valentine’s Day With Catholic Kids'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-valentine', snippet: 'Everyone has heard about Saint Valentine. He’s the patron saint of lovers, and on his day people send anonymous cards or presents to the one they love. But who was Saint Valentine? Well, there was a priest named Valentine who lived in Rome in the third century. He was put in prison because he helpe...', title: 'Saint Valentine'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-valentine-feb-14-2', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! The Story of Saint\u00A0Valentine \u00A0 On February 14around the year 278A.D., Valentine, a holy priest in Rome in the days of Emperor Claudius II, was executed. Under the rule of Claudius the Cruel, Rome was involved in many unpopular and bloody campaigns. The emperor had to maintain a strong army, but was...', title: 'Valentine'}
						]),
					feast: 'Saint Valentine'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saints-cyril-and-methodius/', snippet: 'Often missionaries face the difficulties of language and culture. Saints Cyril and Methodius were no exceptions. But they faced the difficulties by writing the foreign language in a new alphabet and translating the liturgy for the local people.', title: 'Story of Saints Cyril and Methodius'}
						]),
					feast: 'Saints Cyril and Methodius'
				}
				])
		},
			{
			date: '15',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-claude-de-la-colombiere/', snippet: 'Saint Claude de la Colombière met Saint Margaret Mary Alacoque and eventually became her confessor. Together they advanced devotion to the Sacred Heart at a time when God’s mercy needed emphasis. God raises the right people at the right time to keep his Church on the right path.', title: 'Story of Saint Claude de la Colombière'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-claude-la-colombiere', snippet: 'All our life is sown with tiny thorns that produce in our hearts a thousand involuntary movements of hatred, envy, fear, impatience, a thousand little fleeting disappointments, a thousand slight worries, a thousand disturbances that momentarily alter our peace of soul. For example, a word escapes th...', title: 'Saint Claude la Colombiére'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-lenten-companion-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! The Story of Saint Claude de la Colombière \u00A0 This is a special day for the Jesuits, who claim today’s saint as one of their own. It’s also a special day for people who have a special devotion to the Sacred Heart of Jesus—a devotion Claude de la Colombière promoted, along with his friend and spiritua...', title: 'Claude de la Colombière'}
						]),
					feast: 'Saint Claude de la Colombière'
				}
				])
		},
			{
			date: '16',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Gilbert of Sempringham'},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-juliana-of-cumae-feb-16', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! The Story of Saint\u00A0Juliana of Cumae \u00A0 Saint Juliana of Cumae\u00A0(also known as Juliana of Nicomedia, died 305), virgin and martyr of the Church. Saint Juliana became widely venerated in Medieval times, with epic poems written about her battle and eventual victory over the Devil. Her Acts, recorded by t...', title: 'Juliana of Cumae'}
						]),
					feast: 'Saint Juliana of Cumae'
				}
				])
		},
			{
			date: '17',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://lpress-craft.loyolapress.com/images/ocf-articles/Microsites/SaintsStories_100x100.jpeg', link: 'https://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/seven-founders-of-the-order-of-servites/', snippet: 'Imagine that seven famous businessmen in New York left their homes and careers today to live together in solitude and prayer. The world would be surprised and led to reflect on its values...', title: 'The Seven Holy Founders of the of Servite Order'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/seven-founders-of-the-servite-order/', snippet: 'Rather than just talk about the problems of the day, the Seven Founders of the Servite Order did something about it─they consciously left all and formed a new religious congregation to address the issues. They put their money where their mouths were.', title: 'Story of Seven Founders of the Servite Order'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-the-seven-holy-founders-of--1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! The Story of the Seven Founders of the Servite Order \u200B Can you imagine seven prominent men of Boston or Denver banding together, leaving their homes and professions, and going into solitude for a life directly given to God? That is what happened in the cultured and prosperous city of Florence in the...', title: 'The Seven Holy Founders of the Servite Order'}
						]),
					feast: 'Seven Holy Founders of the Servite Order'
				}
				])
		},
			{
			date: '18',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Images, image: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/GoogleArtsAndCulture__aIhfPvxu.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676432323426', link: 'https://artsandculture.google.com/entity/fra-angelico/m031b2?categoryId=artist', snippet: 'View ultra-high resolution images of Fra Angelico\'s paintings', title: 'Fra Angelico\'s Paintings'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/blessed-john-of-fiesole/', snippet: 'Blessed John of Fiesole, a Dominican Friar, is also known as Fra Angelico. Famous for his devotional artwork John used his talents to praise God through paint. All talents can be used to praise God.', title: 'Story of Blessed John of Fiesole'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-amy-feb-20', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Fra Angelico\'s Story\u00A0 \u200B Fra Angelico was an Italian painter of the early Renaissance who combined the\u00A0life\u00A0of a devout\u00A0friar\u00A0with that of an accomplished painter. He was called Angelico (Italian for \'angelic\') and Beato (Italian for \'blessed\') because the paintings he did were of calm, religio...', title: 'Fra Angelico'}
						]),
					feast: 'Saint Fra Angelico'
				}
				])
		},
			{
			date: '19',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Conrad of Piacenza'},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-the-seven-holy-founders-of-', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Odran Story \u200B The death of St Odran According to the Tripartite Life of Saint Patrick (Vita tripartita Sancti Patricii) St Odran’s death, in simpler terms, was a case of mistaken identity but \u00A0gave up his life to save St Patrick. When St Patrick arrived in Ireland\u00A0he went about destroying pag...', title: 'Saint Odran'}
						]),
					feast: 'Saint Odran'
				}
				])
		},
			{
			date: '20',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saints-jacinta-and-francisco-marto/', snippet: 'Two young children who died early in life, Jacinta and Francisco Marto, gained the attention of the Church and the world when Mary appeared to them at Fatima. Without being martyred, they became witnesses and messengers of God’s goodness.', title: 'Story of Saints Jacinta and Francisco Marto'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/blesseds-francisco-and-jacinta-marto', snippet: 'On a beautiful Sunday afternoon, May 13, 1917, three children were laughing and chatting as they kept watch over their families’ sheep. This afternoon they were building a playhouse out of brush and rocks. Suddenly a bright light flashed. They thought it was lightning. Then it flashed again. They sa...', title: 'Saints Francisco and Jacinta Marto'}
						]),
					feast: 'Saints Jacinta and Francisco Marto'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-amy-feb-20-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! When she was young, Saint Amata of Assisi rejected God and rebelled against morality. Eventually her aunt, Saint Clare of Assisi, converted her and brought the girl into her religious order...', title: 'Amy (Amata of Assisi)'}
						]),
					feast: 'Saint Amy (Amata of Assisi)'
				}
				])
		},
			{
			date: '21',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://lpress-craft.loyolapress.com/images/ocf-articles/Microsites/SaintsStories_100x100.jpeg', link: 'https://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-peter-damian/', snippet: 'Born in Ravenna, Italy, in 1007, Peter Damian knew hardship as a child. He became a successful teacher, but only for a short time...', title: 'Saint Peter Damian'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-peter-damian-feb-21-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Peter Damian’s Story \u200B Maybe because he was orphaned and had been treated shabbily by one of his brothers, Peter Damian was very good to the poor. It was the ordinary thing for him to have a poor person or two with him at table and he liked to minister personally to their needs. Peter escaped...', title: 'Peter Damian'}
						]),
					feast: 'Saint Peter Damian'
				}
				])
		},
			{
			date: '22',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/chair-of-saint-peter/', snippet: 'Every cathedral has a “cathedra,” a bishop’s chair that is used only by the bishop when he presides in the cathedral. It’s a symbol of his authority as chief teacher and liturgist of the diocese. So, today we celebrate the authority of the chief bishop, Saint Peter and his successors, the popes.', title: 'Story of Chair of Saint Peter'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-lenten-companion-feb-20', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! The Story of the Chair of Saint Peter \u200B This feast commemorates Christ’s choosing Peter to sit in his place as the servant-authority of the whole Church. \u200B After the “lost weekend” of pain, doubt, and self-torment, Peter hears the Good News. Angels at the tomb say to Magdalene, “The Lord has risen!...', title: 'Chair of Saint Peter'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/chair-of-peter', snippet: 'When the pope cautions world leaders, pleads for peace, or condemns social injustice, people listen and respond. What makes the world listen to this man? The answer lies in Scripture and in Tradition. Peter is named first among the apostles of Jesus; he was often their spokesman and leader; he was t...', title: 'The Chair of Saint Peter the Apostle'}
						]),
					feast: 'The Chair of Saint Peter the Apostle'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-chair-of-saint-peter-feb-22', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Margaret of Cortona\'s Story \u00A0 Margaret of Cortona, penitent, was born in Loviana in\u00A0Tuscany\u00A0in 1247. Her father was a small farmer. Margaret\'s mother died when she was seven years old. Her stepmother had little care for her high-spirited daughter. Rejected at home, Margaret eloped with a youth...', title: 'Margaret of Cortona'}
						]),
					feast: 'Saint Margaret of Cortona'
				}
				])
		},
			{
			date: '23',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-polycarp/', snippet: 'Without knowing a whole lot about Saint Polycarp, he has entered into the life of the Church because he was a martyr–a witness to the faith with his life. That level of testimony to the faith is notable.', title: 'Story of Saint Polycarp'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-polycarp', snippet: 'The story of Polycarp’s martyrdom is the earliest recorded account of a Christian martyr. Polycarp was a disciple of St. John the apostle. While still quite young, he became the bishop of Smyrna and was one of the most respected leaders in the first half of the second century. St. Ignatius of Antioc...', title: 'Saint Polycarp'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-peter-damian-feb-21', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Anne Line\'s Story \u200B St Anne is believed to have been born as \'Alice Higham\' or \'Heigham\', the eldest daughter of the Puritan William Higham of Jenkyn Maldon. William Higham was the son of\u00A0Roger Heigham,\u00A0MP, a Protestant reformer under\u00A0Henry VIII.\u00A0A recently scholarly and extensively annotated...', title: 'Polycarp'}
						]),
					feast: 'Saint Polycarp'
				}
				])
		},
			{
			date: '24',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Blessed Luke Belludi'}
				])
		},
			{
			date: '25',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Blessed Sebastian of Aparicio'},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-ethelbert', snippet: 'Pope Gregory decided he must send someone to spread the Christian message to England. The man he chose was Augustine, who set off from Rome with 40 companions in the year 596. The Romans no longer ruled Europe. Much of the North was overrun with brigands, robbers, and barbarians. On his journey thr...', title: 'Saint Ethelbert'}
						]),
					feast: 'Saint Ethelbert'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-lenten-companion-feb-24', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! The Story of\u00A0Saint\u00A0Walburga \u200B Walburga\u00A0belonged to an extraordinary English family, five of whom are saints. She herself also became a missionary in Germany and even to the present day has a curious place in German folklore.\u00A0Patrick Duffy\u00A0tells\u00A0her story. She was born in Wessex, England, about 710,...', title: 'Walburga'}
						]),
					feast: 'Saint Walburga'
				}
				])
		},
			{
			date: '26',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Maria Bertilla Boscardin'},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-alexander', snippet: 'Trouble dogged St. Alexander from the moment he became bishop of Alexandria in 312. Immediately, he had to deal with opposition from Meletius of Lycopolis, whose rigorism toward lapsed Catholics had led him into schism. He also had problems with Kolluth, a priest who had usurped the power to ordain...', title: 'Saint Alexander'}
						]),
					feast: 'Saint Alexander'
				}
				])
		},
			{
			date: '27',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://mycatholic.life/wp-content/uploads/2021/08/My-Catholic-Life-MCL-Header.jpg', link: 'https://mycatholic.life/saints/saints-of-the-liturgical-year/saint-gregory-of-narek/', snippet: 'The Apostles Saint Jude Thaddeus and Saint Bartholomew are believed to have traveled to Armenia to share the Gospel. In 301 A.D., the Armenian king was converted who, in turn, made Christianity the kingdom’s official religion, making Armenia the first nation to do so...', title: 'Saint Gregory of Narek'}
						]),
					feast: 'Saint Gregory of Narek'
				},
					{activities: _List_Nil, feast: 'Saint Gabriel of Our Lady of Sorrows'}
				])
		},
			{
			date: '28',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Blessed Daniel Brottier'},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-gabriel-francis-possenti', snippet: 'Hagiographers make sanctity seem impossible for us when they tell fanciful stories about a saint’s early life. How little saint so-and-so was always rapt in prayer, worked miracles, undertook severe mortifications, never had a sexual thought, and so on. Thank God for St. Gabriel Francis Possenti and...', title: 'Saint Gabriel Francis Possenti'}
						]),
					feast: 'Saint Gabriel Francis Possenti'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-angela-of-foligno', snippet: 'Angela of Foligno is a model for people who want to simplify their lifestyle. As a young adult she reveled in luxury and sensuality. She married a rich man of Foligno, Italy, and used his wealth to indulge herself in possessions. And her impetuous temperament nudged her into sinful behavior. However...', title: 'Saint Angela of Foligno'}
						]),
					feast: 'Saint Angela of Foligno'
				}
				])
		},
			{
			date: '29',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Oswald of Worcester'},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-john-cassian', snippet: 'Around 380, John Cassian migrated from Romania to Bethlehem, where he embraced the monastic life. After 385 he wandered the Egyptian desert, the heart of eastern monasticism. He visited abbots at monasteries and hermits in their caves, absorbing their teachings about the Christian life. The year 40...', title: 'Saint John Cassian'}
						]),
					feast: 'Saint John Cassian'
				}
				])
		}
		]),
	key: 'feb',
	month: 'February'
};
var $author$project$Page$FeastDayActivities$FeastDayHelpers$Book = {$: 'Book'};
var $author$project$Page$FeastDayActivities$FeastDayHelpers$Game = {$: 'Game'};
var $author$project$Page$FeastDayActivities$FeastDayHelpers$Printout = {$: 'Printout'};
var $author$project$Page$FeastDayActivities$FeastDays$M01Jan$janFeasts = _List_fromArray(
	[
		{
		date: '01',
		feasts: _List_fromArray(
			[
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Video, image: '', link: 'https://www.youtube-nocookie.com/embed/HW0DzGEoa1Y', snippet: '', title: 'Hail Mary, Full of Grace'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Video, image: '', link: 'https://www.youtube-nocookie.com/embed/HoAUG7htvkA', snippet: '', title: 'Born of Woman'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Game, image: 'https://3.bp.blogspot.com/_OdlDH5TOnZ8/S3nCLk9d_VI/AAAAAAAACCo/ogcGrC6sDPY/s320/MaryGameBoard.png', link: 'https://catholicblogger1.blogspot.com/2009/04/mary-is-mother-of-our-church.html', snippet: 'The objective of the game is to answer questions about Mary and receive a letter tile and spell Mary. Place your marker anywhere on the board...', title: 'Mary, Mother of Our Church File Folder Game'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Crafts, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/ThatArtistWoman_-lQHC5LdH.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401274351', link: 'http://www.thatartistwoman.org/2008/12/pastel-resist-madonna-art-project.html', snippet: 'You only need some basic supplies for this one. Try to find heavy kraft paper if you can...', title: 'Pastel Resist Madonna - Art Project'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Crafts, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/how-to-draw-mary-and-baby-jesus/', snippet: 'A step by step video for kids', title: 'How To Draw Mary And Baby Jesus (Easy!)'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://lpress-craft.loyolapress.com/images/ocf-articles/Microsites/SaintsStories_100x100.jpeg', link: 'https://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/solemnity-of-mary/', snippet: 'Way back in 431, there was a bitter controversy among theologians over the role of Mary in the Catholic Church. They debated the question: Who is Mary in God’s plan? In the end, the bishops declared that...', title: 'Solemnity of Mary, the Holy Mother of God'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-solemnity-of-mary-the-holy-', snippet: 'Mary’s divine motherhood broadens the Christmas spotlight. Mary has an important role to play in the Incarnation of the Second Person of the Blessed Trinity. She consents to God’s invitation conveyed by the angel (Luke 1:26-38)...', title: 'The Story of Mary, Mother of God'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_a235ca1bce84403c87d185b7daaa3e2c~mv2.jpg/v1/fill/w_720,h_545,al_c,lg_1,q_85,enc_auto/9c2964_a235ca1bce84403c87d185b7daaa3e2c~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-solemnity-of-mary-the-holy-', snippet: '', title: 'Smoked Sausage and Black-Eyed Peas'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_e5144304a75546688cdc08cd771a4030~mv2.jpg/v1/crop/x_81,y_59,w_603,h_471/fill/w_676,h_565,al_c,lg_1,q_85,enc_auto/9c2964_e5144304a75546688cdc08cd771a4030~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-solemnity-of-mary-the-holy-', snippet: '', title: 'Broccoli Cornbread Mini Muffins'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_b4647017bd7c404d9ae193673bbbd2d6~mv2.jpeg/v1/fill/w_714,h_554,al_c,lg_1,q_85,enc_auto/9c2964_b4647017bd7c404d9ae193673bbbd2d6~mv2.jpeg', link: 'https://www.saintsfeastfamily.com/copy-of-solemnity-of-mary-the-holy-', snippet: '', title: 'Sweet Buttermilk Cornbread'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_0a4855c5e3e94eaab4557fc3213b9ecd~mv2.jpg/v1/fill/w_583,h_423,al_c,lg_1,q_80,enc_auto/9c2964_0a4855c5e3e94eaab4557fc3213b9ecd~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-solemnity-of-mary-the-holy-', snippet: '', title: 'German New Years Cake'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/mary-mother-of-god/', snippet: 'Mary’s divine motherhood broadens the Christmas spotlight. Hers role as mother of God places her in a unique position in God’s redemptive plan.', title: 'Story of Mary, Mother of God'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/solemnity-of-mary', snippet: 'Way back in 431, there was a bitter controversy among theologians over the role of Mary in the Catholic Church. They debated the question: Who is Mary in God’s plan? In the end, the bishops declared that Mary is really the mother of Jesus and Jesus is really God. So it must be said that Mary is the...', title: 'Solemnity of Mary, the Holy Mother of God'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-solemnity-of-mary-the-holy-', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! The Story of Mary, Mother of God \u200B Mary’s divine motherhood broadens the Christmas spotlight. Mary has an important role to play in the Incarnation of the Second Person of the Blessed Trinity. She consents to God’s invitation conveyed by the angel (Luke 1:26-38). Elizabeth proclaims: “Most blessed a...', title: 'Solemnity of Mary the Holy Mother of God'}
					]),
				feast: 'Mary, Mother of God'
			}
			])
	},
		{
		date: '02',
		feasts: _List_fromArray(
			[
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Video, image: '', link: 'https://www.youtube-nocookie.com/embed/lwe8voh3H_4', snippet: '', title: 'Ss. Gregory & Basil'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-basil-the-great-jan-2', snippet: 'St. Basil was a very close friend of St. Gregoryn the Bishop of Nazianzus - Constantinople. Together they wrote an outstanding works...', title: 'Saint Basil the Great'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-gregory-of-nazianzus-jan-2', snippet: 'After his baptism at 30, Gregory gladly accepted his friend Basil’s invitation to join him in a newly founded monastery. The solitude was broken when Gregory’s father, a bishop, needed help in his diocese and estate...', title: 'Saint Gregory of Nazianzus'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_e91e23b66c7d434da5fc63652cbed30d~mv2.png/v1/fill/w_584,h_512,al_c,lg_1,q_85,enc_auto/9c2964_e91e23b66c7d434da5fc63652cbed30d~mv2.png', link: 'https://www.saintsfeastfamily.com/copy-of-st-basil-the-great-jan-2', snippet: '', title: 'Vasilopita Bread'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_e91e23b66c7d434da5fc63652cbed30d~mv2.png/v1/fill/w_584,h_512,al_c,lg_1,q_85,enc_auto/9c2964_e91e23b66c7d434da5fc63652cbed30d~mv2.png', link: 'https://www.saintsfeastfamily.com/copy-of-st-basil-the-great-jan-2', snippet: '', title: 'Vasilopita Cake'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_38dca455491840dc8f74daf2a335dc5d~mv2.jpg/v1/fill/w_659,h_473,al_c,lg_1,q_80,enc_auto/9_3_edited.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-gregory-of-nazianzus-jan-2', snippet: '', title: 'Hünkar Beğendi'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/make-a-jewel-cake-for-st-basil-on-new-years/', snippet: 'St. Basil’s feast day is on January 2, but it has become a Catholic tradition to make a “St. Basil’s Cake” on New Year’s to celebrate one of his miracles...', title: 'Jewel Cake'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/st-basils-hidden-jewel-cupcakes-easy-to-make/', snippet: 'Slice a small hole in the top of the cupcake using a butter knife, and stick a lifesaver candy “jewel” inside...', title: 'St Basil\'s Cupcakes'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-basil-the-great/', snippet: 'Saint Basil is the Father of Eastern monasticism—as Saint Benedict is for western monasticism. Besides being a good pastor, Saint Basil also lead the fight against Arianism, a heresy that denied the divinity of Christ.', title: 'Story of Saint Basil the Great'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-basil-the-great-and-saint-gregory-nazianzen', snippet: 'Basil was educated in Caesarea, Constantinople, and Athens in the fourth century. He enjoyed stimulating university life. There he met Gregory Nazianzen, a quiet, scholarly man. The two became close friends. Basil traveled through the East and studied monastic life. As a result, he formed his own mo...', title: 'Saints Basil the Great and Gregory Nazianzen'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-basil-the-great-jan-2', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! St. Basil\'s Story St. Basil was a very close friend of St. Gregoryn the Bishop of Nazianzus - Constantinople. Together they wrote an outstanding works. The Divine Liturgy of St. Basil the Great is the one most commonly used year around in the Coptic Church. The Basilian Liturgy drew heavily from th...', title: 'Basil the Great'}
					]),
				feast: 'Saints Basil the Great and Gregory Nazianzus'
			}
			])
	},
		{
		date: '03',
		feasts: _List_fromArray(
			[
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Video, image: '', link: 'https://www.youtube-nocookie.com/embed/muyR_oFp8oE', snippet: '', title: 'The Name Above All Names'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://www.simplycatholic.com/wp-content/uploads/2018/12/Jesus1.jpg', link: 'https://www.simplycatholic.com/why-we-celebrate-the-holy-name-of-jesus/', snippet: 'This is a great activity for Catholic kids when learning about Jesus and the bible. This lesson is so fun because you actually learn how to draw Jesus’s name in negative space...', title: 'Why We Celebrate the Holy Name of Jesus'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-the-most-holy-name-of-jesus-1', snippet: 'The month of January is traditionally dedicated to the Holy Name of Jesus, with January 3rd being the feast of the Holy Name. After the Blessed Virgin Mary had conceived her Child by the Holy Spirit, the angel Gabriel...', title: 'Saint Gregory of Nazianzus'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Printout, image: 'https://www.catholicicing.com/wp-content/uploads/2020/01/negative-space-lesson-how-to-draw-jesus.jpg', link: 'https://www.catholicicing.com/how-to-draw-holy-name-of-jesus/', snippet: 'This is a great activity for Catholic kids when learning about Jesus and the bible. This lesson is so fun because you actually learn how to draw Jesus’s name in negative space...', title: 'How To Draw The Most Holy Name Of Jesus'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Book, image: 'https://m.media-amazon.com/images/I/51KgwkrXsQL._SX311_BO1,204,203,200_.jpg', link: 'https://www.amazon.com/Wonders-Holy-Name-Paul-OSullivan/dp/0895554909', snippet: 'This booklet, The Wonders of the Holy Name', title: 'The Wonders of the Holy Name'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_509e915a37e847fb8dc2a1a229ebd879~mv2.jpg/v1/crop/x_0,y_0,w_640,h_657/fill/w_562,h_576,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/791bbe7f2e139eb2d01a3f2c92050acc.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-the-most-holy-name-of-jesus-1', snippet: 'The month of January is traditionally dedicated to the Holy Name of Jesus, with January 3rd being the feast of the Holy Name. After the Blessed Virgin Mary had conceived her Child by the Holy Spirit, the angel Gabriel...', title: 'Prosphora Orthodox Bread'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-the-most-holy-name-of-jesus-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! The month of January is traditionally dedicated to the Holy Name of Jesus, with January 3rd being the feast of the Holy Name. After the Blessed Virgin Mary had conceived her Child by the Holy Spirit, the angel Gabriel appeared to St. Joseph and instructed him that the Child’s name should be called J...', title: 'The Most Holy Name of Jesus'}
					]),
				feast: 'The Most Holy Name of Jesus'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/most-holy-name-of-jesus/', snippet: 'Saint Paul tells us in his Letter to the Philippians that Jesus’ name is above every other name. It is the name in which we are all saved. Devotion to the Most Holy Name of Jesus is deeply rooted in Christian history.', title: 'Story of Most Holy Name of Jesus'}
					]),
				feast: 'Most Holy Name of Jesus'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-genevieve', snippet: 'On his way to combat heresy in Britain, St. Germanus of Auxerre made an overnight stop at Nanterre, France. In the crowd that gathered to hear him speak, Germanus spotted Genevieve (or Genovefa), a beautiful 7-year-old girl, and he foresaw her future holiness. When he asked little St. Genevieve if s...', title: 'Saint Genevieve'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-the-most-holy-name-of-jesus', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! St. Genevieve\'s Story \u200B St. Geneviève, French\u00A0Sainte Geneviève,\u00A0German\u00A0Sankt Genovefa, (born\u00A0c.\u00A0422,\u00A0Nanterre, France?—died\u00A0c.\u00A0500, Paris; feast day January 3),\u00A0 patron saint\u00A0of Paris, who allegedly saved that city from the\u00A0Huns. When she was seven, Geneviève was induced by Bishop\u00A0St. Germain of Aux...', title: 'Genevieve'}
					]),
				feast: 'Saint Genevieve'
			}
			])
	},
		{
		date: '04',
		feasts: _List_fromArray(
			[
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Video, image: '', link: 'https://www.youtube-nocookie.com/embed/896zFSI81X4', snippet: '', title: 'The First American Saint'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Video, image: '', link: 'https://www.youtube-nocookie.com/embed/fR42gZv9T3A', snippet: '', title: 'Betty Bayley Becomes A Saint'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://lpress-craft.loyolapress.com/images/ocf-articles/Microsites/SaintsStories_100x100.jpeg', link: 'https://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-elizabeth-ann-seton/', snippet: 'Who was the first person born in the United States to be declared a saint? Who opened the first American Catholic parish school and established the first American Catholic orphanage? ...', title: 'Saint Elizabeth Ann Seton'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-elizabeth-ann-seton-jan--1', snippet: 'Saint Elizabeth Ann Seton was the first native-born citizen of the United States to be canonized by the Roman Catholic Church. Mother Seton is one of the keystones of the American Catholic Church...', title: 'Saint Elizabeth Ann Seton\'s Story'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Printout, image: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/ElizabethAnnSetonWordSearch_IUJjxiyxd.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675555824047', link: 'https://setonshrine.org/wp-content/uploads/2016/02/Activity-Seton-Word-Search.pdf', snippet: 'A themed word search for older kids.', title: 'Elizabeth Ann Seton Word Find'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_ea5027fa315445ffab9e8c41da1f901b~mv2_d_3188_3187_s_4_2.jpeg/v1/fill/w_868,h_868,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/9c2964_ea5027fa315445ffab9e8c41da1f901b~mv2_d_3188_3187_s_4_2.jpeg', link: 'https://www.saintsfeastfamily.com/copy-of-st-elizabeth-ann-seton-jan--1', snippet: '', title: 'Corn and Crab Bisque'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_7b87e042e19046e88cf334473f82ec25~mv2.jpg/v1/crop/x_18,y_454,w_366,h_444/fill/w_439,h_532,al_c,lg_1,q_80,enc_auto/9c2964_7b87e042e19046e88cf334473f82ec25~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-elizabeth-ann-seton-jan--1', snippet: '', title: 'Oly Koeken, Vet Ballen, Vet Bollen, Ole Bollen, Oliekoecken....aka Oil Balls'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'https://www.catholicicing.com/wp-content/uploads/2016/02/header-social.jpg', link: 'https://www.activityvillage.co.uk/schoolhouse-photo-frame', snippet: 'See Catholic Icing for more activity ideas to celebrate this saint!', title: 'Catholic Icing'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-elizabeth-ann-seton/', snippet: 'Convert, wife, mother, widow, teacher, religious─Saint Elizabeth Ann Seton did it all. Yet, in many ways, she was an ordinary woman of her time who lived life in an extraordinary way.', title: 'Story of Saint Elizabeth Ann Seton'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-elizabeth-ann-seton', snippet: 'Who was the first person born in the United States to be declared a saint? Who opened the first American Catholic parish school and established the first American Catholic orphanage? Who founded the first native American religious community of women? The answers to all these questions are the same:...', title: 'Saint Elizabeth Ann Seton'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-elizabeth-ann-seton-jan--1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Elizabeth Ann Seton\'s Story \u200B Saint Elizabeth Ann Seton was the first native-born citizen of the United States to be canonized by the Roman Catholic Church. Mother Seton is one of the keystones of the American Catholic Church. She founded the first American religious community for women, the S...', title: 'Elizabeth Ann Seton'}
					]),
				feast: 'Saint Elizabeth Ann Seton'
			}
			])
	},
		{
		date: '05',
		feasts: _List_fromArray(
			[
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Video, image: '', link: 'https://www.youtube-nocookie.com/embed/nMeuF62R6hw', snippet: '', title: 'Feast of the Epiphany'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Video, image: '', link: 'https://www.youtube-nocookie.com/embed/8vzYYJK1_pg', snippet: '', title: 'My Time with Jesus - Epiphany'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', link: 'https://www.franciscanmedia.org/sunday-soundbites/sunday-soundbite-for-january-8-2023/', snippet: 'Today’s feast of the Epiphany of the Lord is a feast that celebrates communication. The Gospel we read today portrays Jesus, the Word Made Flesh revealed to the nations, as the wise men arrive to pay him homage...', title: 'Epiphany of the Lord'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-the-epiphany-jan-6-1', snippet: 'The gift of gold was significant because it showed the Magis paying tribute to Jesus Christ as their King because he is royal...', title: 'Gifts to our King'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/epiphany-house-blessing-with-chalk/', snippet: 'The Epiphany house blessing of the door is a really great Catholic tradition for families...', title: 'Epiphany House Blessing with Chalk'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Crafts, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/k-is-for-king-bible-alphabet-crafts-for-kids/', snippet: 'I love to make wearable crafts with preschoolers, because they love wearing them...', title: 'K is for King'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Crafts, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/3-kings-epiphany-crafts/', snippet: 'Ornament Craft, peg doll wraps, and printable nativity set!', title: '3 Kings Epiphany Crafts For Kids'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Crafts, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/star-of-wonder-star-of-night/', snippet: '', title: 'Star Crafts'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/epiphany-crown-food-ideas/', snippet: 'I found all kinds of crown cakes, king cakes, king breads, and everything else under the sun for celebrating the epiphany...', title: 'Epiphany Crown Food Ideas'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_c59aa4a5eb5d467f91acf84877a51c5b~mv2.jpg/v1/fill/w_772,h_960,al_c,q_85,enc_auto/9c2964_c59aa4a5eb5d467f91acf84877a51c5b~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-the-epiphany-jan-6-1', snippet: '', title: 'La Galette des Rois: The French King Cake'}
					]),
				feast: 'The Epiphany of the Lord'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Video, image: '', link: 'https://www.youtube-nocookie.com/embed/7CEbPb-Y0gs', snippet: '', title: 'St. John Neumann'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://www.catholic.org/saints/ff_images/85.jpg', link: 'https://www.catholic.org/saints/fun_facts_arch.php?saint=70', snippet: 'This American saint was born in Bohemia in 1811. He was looking forward to being ordained in 1835 when...', title: 'Saints Fun Facts: St. John Neumann'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-john-neumann-jan-5-1', snippet: 'John was appointed bishop of Philadelphia in 1852. As bishop, he was the first to organize a diocesan Catholic school system. A founder of Catholic education in the United States of America...', title: 'St. John Neumann\'s Story '},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_380d753f39684036b7a1360c29e0532c~mv2.png/v1/crop/x_15,y_14,w_726,h_550/fill/w_726,h_550,al_c,q_90,enc_auto/9c2964_380d753f39684036b7a1360c29e0532c~mv2.png', link: 'https://www.saintsfeastfamily.com/copy-of-st-john-neumann-jan-5-1', snippet: '', title: 'Svíčková with Dumplings'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-john-neumann/', snippet: 'Saint John Neumann was the first member of his community, the Redemptorists, to profess vows in the United States. He did missionary work in Maryland, Virginia, and Ohio, and became the bishop of Philadelphia. Noted for his humility and organizational skills, he helped form the Church in the New World.', title: 'Story of Saint John Neumann'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-john-neumann', snippet: 'As a boy, John Neumann lived in Bohemia, which is now part of Czech Republic. He studied hard, for he wanted to be a missionary priest in America. By the time he was twenty-four, he had learned six languages and had completed his studies for the priesthood. He was not ordained, however, because his...', title: 'Saint John Neumann'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-john-neumann-jan-5-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! St.\u00A0John Neumann\'s Story\u00A0 John was appointed bishop of Philadelphia in 1852. As bishop, he was the first to organize a diocesan Catholic school system. A founder of Catholic education in the United States of America, he increased the number of Catholic schools in his diocese from two to 100. \u00A0 Sain...', title: 'John Neumann'}
					]),
				feast: 'Saint John Neumann'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-simeon-the-stylite', snippet: 'Many Christians give up something meaningful to them during Lent. Lent is a reminder of the 40 days when Jesus lived in the desert while he prepared himself for his work of teaching and healing. For him, it was a way to get away from everyday life and having to concentrate on praying without interru...', title: 'Saint Simeon the Stylite'}
					]),
				feast: 'Saint Simeon the Stylite'
			}
			])
	},
		{
		date: '06',
		feasts: _List_fromArray(
			[
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://www.catholic.org/files/images/saints/18.jpg', link: 'https://www.catholic.org/saints/saint.php?saint_id=18', snippet: 'When Alfred Bessette came to the Holy Cross Brothers in 1870, he carried with him a note from...', title: 'St. Andre Bessette'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-andre-bessette-jan-6', snippet: 'Brother André expressed a saint’s faith by a lifelong devotion to Saint Joseph. Sickness and weakness dogged André from birth. He was the eighth of 12 children born to a French Canadian couple near Montreal...', title: 'Saint André Bessette’s Story'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Video, image: '', link: 'https://www.youtube-nocookie.com/embed/brwYgiR8vHo', snippet: '', title: 'Blessed Andre Bessette'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Video, image: '', link: 'https://www.youtube-nocookie.com/embed/NGzM8sr6w7s', snippet: '', title: 'The Story of Saint Brother Andre Bessette of Canada'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_eca3f6a909d34f4fbfa492de547ebaae~mv2.jpg/v1/crop/x_0,y_0,w_614,h_408/fill/w_736,h_490,al_c,lg_1,q_85,enc_auto/9c2964_eca3f6a909d34f4fbfa492de547ebaae~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-andre-bessette-jan-6', snippet: '', title: 'Maple Tourlouche Upside Down Cake\u200B'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-andre-bessette/', snippet: 'Saint André Bessette was orphaned at 12, and eventually worked in the United States during the Civil War. At 25, he became a Brother of the Holy Cross.', title: 'Story of Saint André Bessette'}
					]),
				feast: 'Saint André Bessette'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-gertrude-of-delft', snippet: 'While working as a servant-girl at Delft in the Netherlands, Gertrude was engaged to be married. But her fiancé broke up with her and married another woman. Broken-hearted at first, Gertrude gradually overcame her anguish and chose a new direction for her life. She joined the Béguines at Delft, spen...', title: 'Saint Gertrude of Delft'}
					]),
				feast: 'Saint Gertrude of Delft'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-andre-bessette-jan-6-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Balthazar\'s Story \u00A0 Balthasar, also known as Balthazar, Balthassar or Bithisarea was born presumably by calculations, around 25-20 BC and was one of the members of the legendary three wise men, mostly referred to as Magi, who went to visit and gift baby Jesus. He was referred to as the King of...', title: 'Andre Bessette'}
					]),
				feast: 'Saint Andre Bessette'
			}
			])
	},
		{
		date: '07',
		feasts: _List_fromArray(
			[
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Video, image: '', link: 'https://www.youtube-nocookie.com/embed/b1yNa55xmjM', snippet: '', title: 'St. Raymond of Peñafort'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_aa20a20c033d476993f14f7d92a235b7~mv2.jpg/v1/fill/w_388,h_559,al_c,lg_1,q_80,enc_auto/9c2964_aa20a20c033d476993f14f7d92a235b7~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-raymond-of-penafort-jan--1', snippet: 'Born in Spain, St. Raymond was a relative of the King of Aragon. From childhood he had a tender love and devotion to the Blessed Mother. He finished his studies at an early age, and became a famous teacher...', title: 'St. Raymond of Pennafort\'s Story'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_ef27b6ef1deb4e6ab35d6b07902bc923~mv2.jpg/v1/crop/x_145,y_27,w_879,h_546/fill/w_879,h_546,al_c,q_85,enc_auto/9c2964_ef27b6ef1deb4e6ab35d6b07902bc923~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-raymond-of-penafort-jan--1', snippet: '', title: 'Barcelona Vegan Potato Bombas'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-raymond-of-penafort/', snippet: 'Saint Raymond of Peñafort was a lawyer who used his talents to both compile legislation for easy access and to write legal treatises on penance for the use of confessors.', title: 'Story of Saint Raymond of Peñafort'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-raymond-of-penyafort', snippet: 'As a lawyer, priest, and preacher, St. Raymond of Penyafort made a significant mark on the history of Spain and the church. His preaching helped re-Christianize Spain after the Moors were overthrown. And his compilation of papal and conciliar decrees was the main source of canon law for seven centur...', title: 'Saint Raymond of Penyafort'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-raymond-of-penafort-jan--1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! St. Raymond of Pennafort\'s Story \u200B Born in Spain, St. Raymond was a relative of the King of Aragon. From childhood he had a tender love and devotion to the Blessed Mother. He finished his studies at an early age, and became a famous teacher. He then gave up all his honors and entered the Order of th...', title: 'Raymond of Penafort'}
					]),
				feast: 'Saint Raymond of Peñafort'
			}
			])
	},
		{
		date: '08',
		feasts: _List_fromArray(
			[
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-angela-of-foligno/', snippet: 'Saint Angela of Foligno was a wife and mother who had little interest in the spiritual life until about age 40. After her husband and children died, Angela entered the Secular Franciscans, spending the rest of her life in prayer and service.', title: 'Story of Saint Angela of Foligno'}
					]),
				feast: 'Saint Angela of Foligno'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-thorfinn-of-hamar-jan-8-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Cistercian monk at the abbey of Tautra. Canon of the Cathedral of Nidaros (modern Trondheim, Norway) by 1277 when he was a witness of the Agreement of Tönsberg. Bishop. Exiled by King Eric for supporting the Archbishop of Nidaros in a dispute over state interference in Church matters. Took refuge at the abbey of TerDoest...', title: 'Thorfinn Of Hamar'}
					]),
				feast: 'Saint Thorfinn Of Hamar'
			}
			])
	},
		{
		date: '09',
		feasts: _List_fromArray(
			[
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-adrian-of-canterbury/', snippet: 'An African by birth, Saint Adrian was assigned by the pope as Archbishop of Canterbury. Feeling unworthy, he declined the position, but the pope sent him to Canterbury anyway where he became an abbot and teacher.', title: 'Story of Saint Adrian of Canterbury'}
					]),
				feast: 'Saint Adrian of Canterbury'
			}
			])
	},
		{
		date: '10',
		feasts: _List_fromArray(
			[
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-gregory-of-nyssa/', snippet: 'Saint Gregory of Nyssa, the brother of Saint Basil and the son of Saints Basil and Emmilia, was a married man when he began studying for the priesthood. He became Bishop of Nyssa and fought Arianism and was a prominent figure at the Council of Constantinople.', title: 'Story of Saint Gregory of Nyssa'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-the-baptism-of-the-lord-jan', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Gregory of Nyssa\'s Story \u200B Gregory of\u00A0Nyssa\u00A0St. Gregory of\u00A0Nyssa\u00A0(c. 330-c. 395) was a younger sibling in a\u00A0family\u00A0that gave the church many years of service and at least five saints. Before entering the monastery of his brother, Basil the Great, Gregory was a rhetorician. He may have been m...', title: 'Gregory of Nyssa'}
					]),
				feast: 'Saint Gregory of Nyssa'
			}
			])
	},
		{
		date: '11',
		feasts: _List_fromArray(
			[
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/blessed-william-carter/', snippet: 'Born in London, Blessed William Carter was a printer who got in trouble for printing Catholic material during the reign of Queen Elizabeth I. Eventually brought to trial, he was convicted and hanged, drawn, and quartered on January 11, 1584.', title: 'Story of Blessed William Carter'}
					]),
				feast: 'Blessed William Carter'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-gregory-of-nyssa-jan-10', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Theodosius the Cenobiarch\'s Story \u200B Theodosius was born in Mogariassus, Asia Minor in 423. From a pious family, he began his studies at an early age, and became a lector while still a youth. As a young man, he set out on pilgrimage to the Holy Land. People say he was inspired by Abraham\'s jour...', title: 'Theodosius the Cenobiarch'}
					]),
				feast: 'Saint Theodosius the Cenobiarch'
			}
			])
	},
		{
		date: '12',
		feasts: _List_fromArray(
			[
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-marguerite-bourgeoys/', snippet: 'Born in France but adopting Canada as her home, Saint Marguerite Bourgeoys definitely won the hearts of the Canadians. She moved to Canada at the request of the governor of the French settlement. She later founded a school for girls in Montreal and founded the Sisters of Notre Dame.', title: 'Story of Saint Marguerite Bourgeoys'}
					]),
				feast: 'Saint Marguerite Bourgeoys'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/aelred-of-rievaulx-1110-1167', snippet: 'How good, how delightful it is to live as brothers together!—Psalm 133:1 NJB Although St. Aelred lived a millennium ago, his life and writings have a distinctively contemporary feel. An extremely competent administrator of Rievaulx, a vast Yorkshire abbey in Northern England, yet even more a spirit...', title: 'Aelred of Rievaulx, 1110-1167'}
					]),
				feast: 'Aelred of Rievaulx, 1110-1167'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-hilary-jan-13-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! The Story of Saint Tatiana of Rome On January 25th, Saint Tatiana\'s Day is the Day of Russian Students and is a day of celebration in special higher and secondary educational institutions. The name of the day derives from the name of the Christian martyr Tatiana of Rome, whose memory is represented...', title: 'Tatiana'}
					]),
				feast: 'Saint Tatiana'
			}
			])
	},
		{
		date: '13',
		feasts: _List_fromArray(
			[
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Video, image: '', link: 'https://www.youtube-nocookie.com/embed/x5_l-pQ_Snk', snippet: '', title: 'St. Hilary of Poitiers'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-hilary-jan-13-2', snippet: 'This staunch defender of the divinity of Christ was a gentle and courteous man, devoted to writing some of the greatest theology on the Trinity, and was like his Master in being labeled a “disturber of the peace.” In a very troubled period in the Church...', title: 'Saint Hilary of Poitiers’ Story'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_d6785e4f4b2a417ba2b23408c33603d2~mv2.png/v1/fill/w_602,h_604,al_c,lg_1,q_90,enc_auto/9c2964_d6785e4f4b2a417ba2b23408c33603d2~mv2.png', link: 'https://www.saintsfeastfamily.com/copy-of-st-hilary-jan-13-2', snippet: '', title: 'French Onion Soup'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_ddca0ded74bd40ae8be680056db9abd6~mv2.png/v1/crop/x_0,y_72,w_443,h_358/fill/w_602,h_488,al_c,lg_1,q_85,enc_auto/9c2964_ddca0ded74bd40ae8be680056db9abd6~mv2.png', link: 'https://www.saintsfeastfamily.com/copy-of-st-hilary-jan-13-2', snippet: '', title: 'Quiche Lorraine Quiche'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-hilary-of-poitiers/', snippet: 'Saint Hilary of Poitiers was converted to Christianity through his reading of the Sacred Scriptures. A married man, he was chosen as Bishop of Poitiers in France where he arduously fought Arianism. As a result, he was sent into exile, but returned home to Poitiers before he died.', title: 'Story of Saint Hilary of Poitiers'}
					]),
				feast: 'Saint Hilary of Poitiers'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-hilary', snippet: 'Hilary was born to pagan parents of Poitiers, France, in 315. After training in the classics and philosophy, Hilary married. He and his wife had one daughter, Afra. All who knew Hilary said he was a friendly, charitable, gentle man. Hilary’s studies led him to read Scripture. He became convinced tha...', title: 'Saint Hilary'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-theodosius-the-cenobiarc', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Felix of Nola\u00A0Story \u200B It was in the 3rd century, in the midst of Emperor Decius’ terrible persecution of Catholics, that a breathless priest, all alone, was hurriedly fleeing for his life. It was St. Felix, an Italian by birth, who had already once been caught and imprisoned by the pagan Roman...', title: 'Hilary'}
					]),
				feast: 'Saint Hilary'
			}
			])
	},
		{
		date: '14',
		feasts: _List_fromArray(
			[
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-gregory-nazianzen/', snippet: 'Saint Gregory Nazianzen paid a huge price for his faith. In conflict with the Emperor Valens, who defended the Arians, Saint Gregory worked hard to defend the Catholic faith.', title: 'Story of Saint Gregory Nazianzen'}
					]),
				feast: 'Saints Basil the Great and Gregory Nazianzus'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-felix-of-nola', snippet: 'A 100 years after St. Felix’s death, St. Paulinus of Nola told his story, adding without discernment appealing legends that had accumulated over the years. But we can trust the unadorned factual outline of Felix’s life. After Felix divested himself of all his possessions, St. Maximus, the bishop of...', title: 'Saint Felix of Nola'}
					]),
				feast: 'Saint Felix of Nola'
			}
			])
	},
		{
		date: '15',
		feasts: _List_fromArray(
			[
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Video, image: '', link: 'https://www.youtube-nocookie.com/embed/75F5qJw5YEY', snippet: '', title: 'Washed Away'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-the-baptism-of-the-lord-jan-2', snippet: 'The Baptism of the Lord has historically been associated with the celebration of Epiphany. Even today, the Eastern Christian feast of Theophany, celebrated on January 6 as a counterpart to the Western feast of Epiphany...', title: 'The Story of the Feast of the Baptism of the Lord'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', link: 'https://www.franciscanmedia.org/sharing-the-word/sharing-the-word-for-january-9-2023/', snippet: 'Today we have Matthew’s account of the baptism of Jesus. We know of course that Jesus was sinless, and so the idea of “washing from sin” does not apply here.', title: 'Feast of the Baptism of the Lord'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_84b36bb57bbd46aba6939360c752267c~mv2.jpeg/v1/crop/x_37,y_0,w_427,h_500/fill/w_512,h_600,al_c,lg_1,q_80,enc_auto/cranberryspicedcider-6-500x500.jpeg', link: 'https://www.saintsfeastfamily.com/copy-of-the-baptism-of-the-lord-jan-2', snippet: '', title: 'Jumping Jolly Juice'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Crafts, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/make-a-holy-water-bottle-craft-with-catholic-kids/', snippet: 'It got the kids involved, gave them something to look forward to, kept them occupied, and I got to teach the kids about Holy Water. Score!', title: 'Holy Water Bottle Craft'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Crafts, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/bible-craft-for-the-letter-d-dove-with-olive-branch/', snippet: 'It got the kids involved, gave them something to look forward to, kept them occupied, and I got to teach the kids about Holy Water. Score!', title: 'Dove with Olive Branch'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Crafts, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/holy-spirit-craft-make-a-dove-from-a-paper-plate/', snippet: 'You can stop at just a dove, or you can attach the gifts of the Holy Spirit to learn a little something extra.', title: 'Dove with Gifts of the Holy Spirit'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Crafts, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/holy-spirit-craft-handprint-dove/', snippet: 'For this one, start with a red piece of paper (the symbolic color for the Holy Spirit) and make a white handprint...', title: 'Simple Handprint Dove'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_476e11a5553346fd8d5baa2055f87e1a~mv2.png/v1/crop/x_3,y_14,w_489,h_410/fill/w_587,h_492,al_c,lg_1,q_85,enc_auto/9c2964_476e11a5553346fd8d5baa2055f87e1a~mv2.png', link: 'https://www.saintsfeastfamily.com/copy-of-the-baptism-of-the-lord-jan-2', snippet: '', title: 'Greek Dipples'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/ideas-for-teaching-catholic-kids-about-baptism/', snippet: 'Baptism is so important, and it’s a great thing to make sure that your kids truly understand...', title: 'Ideas for Teaching Catholic Kids About Baptism'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-the-baptism-of-the-lord-jan-2', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! The Baptism of the Lord has historically been associated with the celebration of Epiphany. Even today, the Eastern Christian feast of Theophany, celebrated on January 6 as a counterpart to the Western feast of Epiphany, focuses primarily on the Baptism of the Lord as the revelation of God to man.', title: 'Baptism of the Lord'}
					]),
				feast: 'The Baptism of the Lord'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-devasahayam-pillai/', snippet: 'Born into an affluent Hindu family in 1712, Devasahayam Pillai converted to Christianity and was martyred for his chosen faith in 1752. At his 2012 beatification Pillai became the first Indian layman not connected to any religious institute to be beatified. Ten years later he was canonized by Pope Francis.', title: 'Story of Saint Devasahayam Pillai'}
					]),
				feast: 'Saint Devasahayam Pillai'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-paul-the-hermit', snippet: 'St. Jerome wrote, or at least translated from the Greek, a little biography of St. Paul the Hermit. Some speculate that he did so in order to establish St. Paul’s reputation as the “first hermit” and to let the world know that the great St. Anthony had a predecessor. Others regard the story as so fu...', title: 'Saint Paul the Hermit'}
					]),
				feast: 'Saint Paul the Hermit'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-hilary-jan-13', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Little is known about the married life of Saint Joseph and the Virgin Mary. Only a few episodes are recorded in the Gospels, and each of those focuses on their son, Jesus. \u00A0 Yet, they are held up by the Church as the prime example of a holy marriage, and remain heavenly patrons for all married coupl...', title: 'Ita'}
					]),
				feast: 'Saint Ita'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-2-of-new-page', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! St. Nina (fl. III/IV Century) was born in Cappadocia. Tradition says she was a relative of St. George who travelled to Iberia (Georgia) to convert the people to Christianity. Scholars believe she was a slave to whom the name Nino (the Georgian form of Nina) was given; she has also been identified as Christiana. The quiet piety of her life and her preaching converted many people, and when she cured Queen Nana of a seemingly incurable disease, Nina converted the queen. When King Mirian also became a Christian, he sent to Constantinople for bishops and priests. Nina continued to preach throughout Georgia until her death at Bodke. A church dedicated to the memory of St. George was built on the site of her grave.', title: 'Nina'}
					]),
				feast: 'Saint Nina'
			}
			])
	},
		{
		date: '16',
		feasts: _List_fromArray(
			[
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-berard-and-companions/', snippet: 'Saint Francis considered Saints Berard and his companions as true Friars Minor because they were willing to lay their lives on the line for the faith. Such heroic virtue inspired Saint Anthony to join the Franciscans.', title: 'Story of Saint Berard and Companions'}
					]),
				feast: 'Saint Berard and Companions'
			}
			])
	},
		{
		date: '17',
		feasts: _List_fromArray(
			[
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Video, image: '', link: 'https://www.youtube-nocookie.com/embed/LbetpKRyO7A', snippet: '', title: 'St Anthony of the Desert'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-anthony-jan-17-1', snippet: 'The life of Anthony will remind many people of Saint Francis of Assisi. At 20, Anthony was so moved by the Gospel message, “Go, sell what you have, and give to [the] poor” (Mark 10:21b), that he actually did just that with his large inheritance...', title: 'Saint Anthony of Egypt’s Story'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_b3b1e854d0c2461c89fd7e9279cce745~mv2.jpg/v1/fill/w_576,h_672,al_c,lg_1,q_85,enc_auto/9c2964_b3b1e854d0c2461c89fd7e9279cce745~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-anthony-jan-17-1', snippet: '', title: 'Uccelletti ~The little Birds of St. Anthony'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Video, image: '', link: 'https://www.youtube.com/watch?v=XwoTugfbSzc', snippet: '', title: 'Uccelletti ~The little Birds of St. Anthony'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-anthony-of-egypt/', snippet: 'Saint Anthony was a solitary ascetic who practiced great mortification yet drew many people to himself. He responded by founding an early form of monastic life. He lived until age 105.', title: 'Story of Saint Anthony of Egypt'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-anthony', snippet: 'Anthony was born in Egypt in 250. At age 20, when his parents died, Anthony made sure his younger sister’s education could be completed in a community of holy women. He then sold all his possessions and left for a life of solitude in the desert. There an elderly hermit taught him about prayer and pe...', title: 'Saint Anthony'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-anthony-jan-17-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Anthony of Egypt’s Story \u200B The life of Anthony will remind many people of\u00A0Saint Francis of Assisi. At 20, Anthony was so moved by the Gospel message, “Go, sell what you have, and give to [the] poor” (Mark 10:21b), that he actually did just that with his large inheritance. He is different from...', title: 'Anthony'}
					]),
				feast: 'Saint Anthony of Egypt'
			}
			])
	},
		{
		date: '18',
		feasts: _List_fromArray(
			[
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-charles-of-sezze/', snippet: 'Like many people, Saint Charles of Sezze thought he knew what God wanted, only to find out that he was mistaken. Instead of going to India as a missionary, Saint Charles settled in Rome where he cooked and cared for the friary and friary chapel. While being simple, Saint Charles was no simpleton as is obvious from his life story.', title: 'Story of Saint Charles of Sezze'}
					]),
				feast: 'Saint Charles of Sezze'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-margaret-of-hungary', snippet: 'Margaret was born to Béla IV, king of Hungary, at a moment when the country was threatened by enemies. So the king promised God that if things reversed in his favor he would dedicate his little princess to the religious life. The prayer was answered, and Béla put Margaret in the care of the Dominica...', title: 'Saint Margaret of Hungary'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-margaret-of-hungary-jan--1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! The Story of\u00A0Saint\u00A0Margaret of Hungary \u200B St. Margaret of\u00A0Hungary\u00A0Daughterof King Bela IV, she became a Dominican\u00A0novice\u00A0at twelve in a royal\u00A0convent\u00A0built on an island in the Danube. Although she was a princess among\u00A0nuns\u00A0who were of noble descent, she objected to any special treatment and went out...', title: 'Margaret of Hungary'}
					]),
				feast: 'Saint Margaret of Hungary'
			}
			])
	},
		{
		date: '19',
		feasts: _List_fromArray(
			[
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-fabian/', snippet: 'Be careful of birds landing on your head. That happened to Saint Fabian, and it was taken as a sign that he should be elected pope. So he was. And he served for 14 years until he was martyred in 250.', title: 'Story of Saint Fabian'}
					]),
				feast: 'Saint Fabian'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-ita-jan-15', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! St. Wulfstan\'s Story \u200B Wulfstan (1008-1095) +\u00A0Bishop\u00A0and reformer, also called Wulstan and Wolstan. Born at Long-Itch ington, Warwickshire, England, he studied at the abbeys of Evesham and Peterborough, received ordination, and joined the Benedictines at Worcester. Wulfstan served as treasurer of th...', title: 'Wulfstan'}
					]),
				feast: 'Saint Wulfstan'
			}
			])
	},
		{
		date: '20',
		feasts: _List_fromArray(
			[
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-sebastian-jan-20', snippet: 'Fabian was a Roman layman who came into the city from his farm one day as clergy and people were preparing to elect a new pope. Eusebius, a Church historian, says a dove flew in and settled on the head of Fabian...', title: 'Saint Fabian’s Story'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_44ef0bce111d4477ab39f31de9658584~mv2.jpg/v1/fill/w_420,h_318,al_c,lg_1,q_80,enc_auto/9c2964_44ef0bce111d4477ab39f31de9658584~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-sebastian-jan-20', snippet: '', title: 'Dove Dinner Rolls'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saints-fabian-and-sebastian', snippet: 'Fabian was a pope, and Sebastian was believed to be a soldier. Both were faithful to Christ until death. The traditional story told about Saint Sebastian is that he was an army officer who was condemned to death for his belief in Jesus. His fellow soldiers shot him with arrows. Surviving this, he wa...', title: 'Saints Fabian and Sebastian'}
					]),
				feast: 'Saint Fabian'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-sebastian-jan-20-1', snippet: 'Almost nothing is historically certain about Sebastian except that he was a Roman martyr, was venerated in Milan even in the time of Saint Ambrose and was buried on the Appian Way, probably near the present Basilica of St. Sebastian...', title: 'Saint Sebastian’s Story'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_3c7029aa08e445e1859f95e47c5e5fba~mv2.jpg/v1/crop/x_246,y_67,w_404,h_325/fill/w_566,h_358,al_c,lg_1,q_80,enc_auto/9c2964_3c7029aa08e445e1859f95e47c5e5fba~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-sebastian-jan-20-1', snippet: '', title: 'Roscos Orange Donuts'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-sebastian/', snippet: 'In art, Saint Sebastian is often depicted as standing near or strapped to a pole riddled with arrows. Indeed, he was executed by archers, but didn’t actually die. Later he was beaten to death with clubs. Little else is known about this third century martyr.', title: 'Story of Saint Sebastian'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-sebastian', snippet: 'Sebastian was the son a nobleman who was a Christian. He joined the Roman army in the year 283 and kept his Christian beliefs secret so he could be a spy in the army. Some Christians who knew the truth about Sebastian brought a woman named Zoe to him. She had lost the power of speech. Sebastian pray...', title: 'Saint Sebastian'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-sebastian-jan-20-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Sebastian’s Story \u200B Almost nothing is historically certain about Sebastian except that he was a Roman martyr, was venerated in Milan even in the time of Saint\u00A0Ambrose and was buried on the Appian Way, probably near the present Basilica of St. Sebastian. Devotion to him spread rapidly, and he i...', title: 'Sebastian'}
					]),
				feast: 'Saint Sebastian'
			}
			])
	},
		{
		date: '21',
		feasts: _List_fromArray(
			[
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-agnes-jan-21-1', snippet: 'Almost nothing is known of this saint except that she was very young—12 or 13—when she was martyred in the last half of the third century. Various modes of death have been suggested...', title: 'Saint Agnes’ Story'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_acfdf6a128df4af299dce373dfcd31e9~mv2.jpg/v1/fill/w_508,h_855,al_c,lg_1,q_85,enc_auto/Picture1_edited.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-agnes-jan-21-1', snippet: 'Port Sauce served over Goat Cheese Polenta', title: 'Pistachio Crusted Lamb Chops with Cherry'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_218dcdf0206e4c34a1ee4d15a9c41e9b~mv2.jpg/v1/crop/x_14,y_0,w_1386,h_933/fill/w_790,h_532,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/9c2964_218dcdf0206e4c34a1ee4d15a9c41e9b~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-agnes-jan-21-1', snippet: 'Delicious lemon pull-apart lamb', title: 'Lamb Pull Apart Bread'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_8858942166b04a8a97151d9b44009a4a~mv2.jpg/v1/crop/x_354,y_83,w_590,h_493/fill/w_470,h_392,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_8858942166b04a8a97151d9b44009a4a~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-agnes-jan-21-1', snippet: '', title: 'Agnesenplätzchen (St. Agnes Cookies)'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_9b37a19c3e0d4980aa6de55fcd42a278~mv2.jpg/v1/crop/x_0,y_73,w_871,h_453/fill/w_792,h_412,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_9b37a19c3e0d4980aa6de55fcd42a278~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-agnes-jan-21-1', snippet: '', title: 'One Hour Yeast Dinner Rolls'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/st-agnes-crafts-feast-jan-21/', snippet: 'Today, let’s look at some celebrating the feast day of St. Agnes with kids...', title: 'Celebrating The Feast Day Of St. Agnes With Kids'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-agnes/', snippet: 'Like other young martyrs, the death of Saint Agnes reminds us that length of years is not a requirement for a holy life. Little is known about Saint Agnes other than that she was a martyr.', title: 'Story of Saint Agnes'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-agnes', snippet: '“A new kind of martyrdom!” exclaimed St. Ambrose, bishop of Milan. The assembly cheered and applauded. He was celebrating St. Agnes because she was a virgin, a martyr—and a child. She was executed at Rome in 304 during the Emperor Diocletian’s vicious persecution. Here are Ambrose’s observations on...', title: 'Saint Agnes'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-agnes-jan-21-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Agnes’ Story \u200B Almost nothing is known of this saint except that she was very young—12 or 13—when she was martyred in the last half of the third century. Various modes of death have been suggested—beheading, burning, strangling. Legend has it that Agnes was a beautiful girl whom many young men...', title: 'Agnes'}
					]),
				feast: 'Saint Agnes'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-our-lady-of-altagracia-jan--1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! The Story of Our Lady of Altagracia A portrait of the\u00A0Virgin Mary\u00A0in a Nativity scene. It is 13 inches (33 centimeters) wide by 18 inches (45 centimeters) high, and is painted on cloth. It is a primitive work of the\u00A0Spanish\u00A0school, painted c.1500. The\u00A0Spanish\u00A0brothers Alfonso and Antonio Trejo, two...', title: 'Our Lady of Altagracia'}
					]),
				feast: 'Our Lady of Altagracia'
			}
			])
	},
		{
		date: '22',
		feasts: _List_fromArray(
			[
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-vincent-jan-22-1', snippet: 'Most of what we know about this saint comes from the poet Prudentius. His Acts have been rather freely colored by the imagination of their compiler. But Saint Augustine, in one of his sermons on Saint Vincent, speaks of having the Acts of his martyrdom before him...', title: 'Saint Vincent of Zaragossa’s Story'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_e99a3b33dc1744a09e5612ea63da87b2~mv2.jpg/v1/crop/x_0,y_109,w_564,h_466/fill/w_646,h_534,al_c,lg_1,q_80,enc_auto/9c2964_e99a3b33dc1744a09e5612ea63da87b2~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-vincent-jan-22-1', snippet: '', title: 'Basic Brioche'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-vincent-of-zaragossa/', snippet: 'Very little is known about Saint Vincent of Zaragossa other than some details about his martyrdom. We know that he was a deacon and that a large devoted following survived his death. Most of what we know comes from the “Acts” of Prudentius.', title: 'Story of Saint Vincent of Zaragossa'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-vincent-jan-22-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Most of what we know about this saint comes from the poet Prudentius. His Acts have been rather freely colored by the imagination of their compiler. But Saint Augustine, in one of his sermons on Saint Vincent, speaks of having the Acts of his martyrdom before him. We are at least sure of his name, his being a deacon, the place of his death and burial...', title: 'Saint Vincent of Saragossa'}
					]),
				feast: 'Saint Vincent of Saragossa'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-our-lady-of-altagracia-jan-', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Domenico di Sora’s Story \u200B St Dominic of Sora (951-1032) was born in Foligno.\u00A0 He became\u00A0 Benedictine monk and founded a number of hermitages in Central Italy.\u00A0 The reforming Pope John XVIII (1003-9) placed these foundations under papal protection.\u00A0 The last of them was at Sora (in Lazio), whe...', title: 'Saint Domenico'}
					]),
				feast: 'Saint Domenico'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', link: '', snippet: '', title: ''},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/pro-life-craft-for-kids/', snippet: ' Today, let’s look at some celebrating the feast day of St. Agnes with kids...', title: 'Pro Life Craft for Kids'}
					]),
				feast: 'Day of Prayer for the Legal Protection of Unborn Children'
			}
			])
	},
		{
		date: '23',
		feasts: _List_fromArray(
			[
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-vincent-jan-22', snippet: 'Though leprosy scared off most people in 19th-century Hawaii, that disease sparked great generosity in the woman who came to be known as Mother Marianne of Molokai. Her courage helped tremendously to improve the lives of its victims in Hawaii, a territory annexed to the United States during her lifetime (1898)...', title: 'Saint Marianne Cope’s Story'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_1b501eda18be418d9f7b860a84c68bb0~mv2.png/v1/fill/w_610,h_652,al_c,q_90,enc_auto/9c2964_1b501eda18be418d9f7b860a84c68bb0~mv2.png', link: 'https://www.saintsfeastfamily.com/copy-of-st-vincent-jan-22', snippet: '', title: 'Char Siu'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_05315e6abad04487bfaa70c5bc4fa9df~mv2.png/v1/crop/x_8,y_73,w_875,h_1088/fill/w_694,h_864,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/2.png', link: 'https://www.saintsfeastfamily.com/copy-of-st-vincent-jan-22', snippet: '', title: 'Pineapple Upside-Down Cake'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-marianne-cope/', snippet: 'Born in Germany, Saint Marianne Cope’s family soon moved to Utica, NY. In 1862 she entered the Sisters of the Third Order of Saint Francis where she served as superior for a number of years.', title: 'Story of Saint Marianne Cope'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-vincent-jan-22', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Marianne Cope’s Story \u200B Though leprosy scared off most people in 19th-century Hawaii, that disease sparked great generosity in the woman who came to be known as Mother Marianne of Molokai. Her courage helped tremendously to improve the lives of its victims in Hawaii, a territory annexed to the...', title: 'Marianne Cope'}
					]),
				feast: 'Saint Marianne Cope'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-vincent', snippet: 'Vincent was trained and ordained a deacon by Valerius, bishop of Saragossa, Spain, in the third century. The Roman emperors had made being a Christian punishable by death, so when Emperor Dacian discovered Bishop Valerius holding Christian services, he had him imprisoned. Vincent was soon caught vis...', title: 'Saint Vincent'}
					]),
				feast: 'Saint Vincent'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-ildefonsus-of-toledo', snippet: 'Spanish Catholics esteem St. Ildefonsus as one of their greatest saints, second only to Isidore of Seville. As archbishop of Toledo, he led the Spanish church from 658 to 667. Like Isidore, Ildefonsus contributed to the creation of the collaborative union of church and state that came to typify medi...', title: 'Saint Ildefonsus of Toledo'}
					]),
				feast: 'Saint Ildefonsus of Toledo'
			}
			])
	},
		{
		date: '24',
		feasts: _List_fromArray(
			[
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-marianne-cope-jan-23', snippet: 'Francis was destined by his father to be a lawyer so that the young man could eventually take his elder’s place as a senator from the province of Savoy in France...', title: 'Saint Francis de Sales’ Story'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_8c3cefd4508241babcfa2f8a3f961e35~mv2.png/v1/fill/w_882,h_538,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/PastedGraphic-25-1.png', link: 'https://www.saintsfeastfamily.com/copy-of-st-marianne-cope-jan-23', snippet: '', title: 'Piperade'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-francis-de-sales/', snippet: 'Saint Francis de Sales was born into a senatorial family where he was destined to work in government positions of authority. Instead, he felt a call to the priesthood and was ordained for the Diocese of Geneva.', title: 'Story of Saint Francis de Sales'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-francis-de-sales', snippet: 'Francis, the eldest of 13 children, was born into a family of nobility in France in 1567. His father sent him to study at the University of Paris. After six years, Francis was intellectually competent in many areas. Francis was also a skilled swordsman who enjoyed fencing, an expert horseman, and a...', title: 'Saint Francis de Sales'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-marianne-cope-jan-23', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Francis de Sales’ Story \u200B Francis was destined by his father to be a lawyer so that the young man could eventually take his elder’s place as a senator from the province of Savoy in France. For this reason Francis was sent to Padua to study law. After receiving his doctorate, he returned home a...', title: 'Francis de Sales'}
					]),
				feast: 'Saint Francis de Sales'
			}
			])
	},
		{
		date: '25',
		feasts: _List_fromArray(
			[
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/conversion-of-saint-paul/', snippet: 'Saint Paul’s conversion on the road to Damascus was to be the turning point in his spiritual life. There he met Jesus and nothing was the same after that. Thereafter, all his zeal and energy were focused on the spread of the gospel message.', title: 'Story of Conversion of Saint Paul'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/the-conversion-of-saint-paul-the-apostle', snippet: 'St. Paul the Apostle was the greatest of the early Christian missionaries. He first appears in the Acts of the Apostles under the name of Saul. Saul was raised in the Jewish faith as a Pharisee trained in the strict observance of God’s Law. He believed the Law should be obeyed by himself and all Jew...', title: 'The Conversion of Saint Paul the Apostle'}
					]),
				feast: 'The Conversion of Saint Paul'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-henry-suso', snippet: 'Anyone who endures dryness at prayer or feels abandoned by God will find instruction, and perhaps some relief, in the experience of Henry Suso. A mystic who called himself the “servant of Eternal Wisdom,” he endured long stretches of spiritual darkness interrupted only by occasional bursts of bright...', title: 'Saint Henry Suso'}
					]),
				feast: 'Saint Henry Suso'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-francis-de-sales-jan-24-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Dwynwen\'s Story \u200B Saint Dwynwen, a Welsh saint, was known for saying: \'Nothing wins hearts like cheerfulness.\' A member of the family of Brychan of Brecknock, she is venerated throughout Wales and Cornwall, England. \u00A0 Saint Dwynwen lived during the 5th century and legend has it that she was on...', title: 'Dwynwen'}
					]),
				feast: 'Saint Dwynwen'
			}
			])
	},
		{
		date: '26',
		feasts: _List_fromArray(
			[
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-francis-de-sales-jan-24', snippet: 'What we know from the New Testament of Timothy’s life makes it sound like that of a modern harried bishop. He had the honor of being a fellow apostle with Paul, both sharing the privilege of preaching the gospel and suffering for it...', title: 'Saints Timothy and Titus’ Story'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_8c70a07188c5476189c632fc0b989a36~mv2.png/v1/fill/w_354,h_322,al_c,lg_1,q_85,enc_auto/9c2964_8c70a07188c5476189c632fc0b989a36~mv2.png', link: 'https://www.saintsfeastfamily.com/copy-of-st-francis-de-sales-jan-24', snippet: '', title: 'Ajvar spread for bread'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_4dc9c528ff98423a9b5d7670a02f51a8~mv2.jpg/v1/crop/x_38,y_0,w_326,h_225/fill/w_456,h_315,al_c,lg_1,q_80,enc_auto/9c2964_4dc9c528ff98423a9b5d7670a02f51a8~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-francis-de-sales-jan-24', snippet: 'Pogacha is a traditional Macedonian round loaf. It\'s usually made for special occasions.', title: 'Pogacha'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_366a676ad30645999d174c7fc2e21bcf~mv2.jpg/v1/crop/x_31,y_0,w_571,h_430/fill/w_658,h_496,al_c,lg_1,q_80,enc_auto/9c2964_366a676ad30645999d174c7fc2e21bcf~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-francis-de-sales-jan-24', snippet: 'Potato Stew\". Whenever Kompir Mandza is made', title: 'Kompir Mandza'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_081788385f104b9b95700584391731fa~mv2.png/v1/fill/w_636,h_476,al_c,lg_1,q_85,enc_auto/9c2964_081788385f104b9b95700584391731fa~mv2.png', link: 'https://www.saintsfeastfamily.com/copy-of-st-francis-de-sales-jan-24', snippet: 'Potato Stew\". Whenever Kompir Mandza is made', title: 'Vanilici Cookie'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saints-timothy-and-titus/', snippet: 'Saints Timothy and Titus were trusted friends and co-workers with Saint Paul through many of his trials. He eventually set both up as heads of local Churches and encouraged them as would a father. Saint Paul seems to have truly relished their support and friendship.', title: 'Story of Saints Timothy and Titus'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-titus', snippet: 'St. Paul spoke with great affection and respect for St. Titus. He addressed him as “true child of mine in the faith that we share,” suggesting that he had personally recruited Titus for Christ (see Titus 1:14). So Titus became one of Paul’s most trusted colleagues, serving as his secretary, travelin...', title: 'Saint Titus'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-francis-de-sales-jan-24', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saints Timothy and Titus’ Story \u200B What we know from the New Testament of Timothy’s life makes it sound like that of a modern harried bishop. He had the honor of being a fellow apostle with Paul, both sharing the privilege of preaching the gospel and suffering for it. Timothy had a Greek father and a...', title: 'Timothy & Titus'}
					]),
				feast: 'Saints Timothy and Titus'
			}
			])
	},
		{
		date: '27',
		feasts: _List_fromArray(
			[
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-sts-timothy-titus-jan-26', snippet: 'Angela has the double distinction of founding the first teaching congregation of women in the Church and what is now called a “secular institute” of religious women...', title: 'Saint Angela Merici’s Story'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_b356cd33ce644ca49cfb2a842e9aa5c4~mv2.png/v1/fill/w_608,h_504,al_c,lg_1,q_85,enc_auto/9c2964_b356cd33ce644ca49cfb2a842e9aa5c4~mv2.png', link: 'https://www.saintsfeastfamily.com/copy-of-sts-timothy-titus-jan-26', snippet: '', title: 'Pasta Bolognese'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_6d4b21d08edc4f5da37d5aa2f0d1002c~mv2.jpg/v1/fill/w_562,h_374,al_c,lg_1,q_80,enc_auto/9c2964_6d4b21d08edc4f5da37d5aa2f0d1002c~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-sts-timothy-titus-jan-26', snippet: '', title: 'Custard'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_e1b1c426f4cd42d7bfb9f5ec811537bc~mv2.png/v1/crop/x_12,y_0,w_982,h_592/fill/w_981,h_592,al_c,q_90,enc_auto/9c2964_e1b1c426f4cd42d7bfb9f5ec811537bc~mv2.png', link: 'https://www.saintsfeastfamily.com/copy-of-sts-timothy-titus-jan-26', snippet: '', title: 'Custard filled Dove Puff Pastries'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-angela-merici/', snippet: 'Saint Angela Merici was a courageous woman who saw a need and answered it even though society may not have been ready for her solution. Women teaching outside the convent, and what we call today a secular institute, were new forms of living and ministering which proved very beneficial to the Church.', title: 'Story of Saint Angela Merici'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-angela-merici', snippet: 'Women like St. Teresa of Ávila and St. Catherine of Genoa contributed significantly to the Catholic Reformation. But in the 16th-century church perhaps no woman responded more creatively to the need for reform than St. Angela Merici. She built communities that trained single women in Christian livin...', title: 'Saint Angela Merici'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-sts-timothy-titus-jan-26', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Angela Merici’s Story \u200B Angela has the double distinction of founding the first teaching congregation of women in the Church and what is now called a “secular institute” of religious women. As a young woman, she became a member of the Third Order of Saint\u00A0Francis, and lived a life of great aus...', title: 'Angela Merici'}
					]),
				feast: 'Saint Angela Merici'
			}
			])
	},
		{
		date: '28',
		feasts: _List_fromArray(
			[
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-angela-merica-jan-27', snippet: 'By universal consent, Thomas Aquinas is the preeminent spokesman of the Catholic tradition of reason and of divine revelation. He is one of the great teachers of the medieval Catholic Church, honored with the titles Doctor of the Church and Angelic Doctor...', title: 'Saint Thomas Aquinas’ Story'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_b8e3d414b6b747e9952fd84de9958f8e~mv2.png/v1/crop/x_0,y_0,w_569,h_468/fill/w_652,h_536,al_c,lg_1,q_85,enc_auto/9c2964_b8e3d414b6b747e9952fd84de9958f8e~mv2.png', link: 'https://www.saintsfeastfamily.com/copy-of-st-angela-merica-jan-27', snippet: '', title: 'Tiramisu'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-thomas-aquinas/', snippet: 'Saint Thomas Aquinas is well known for his writings, especially the “Summa Theologica.” But he was far more than a philosopher/theologian. He was a devout man who wrote beautiful prayers and hymns. Perhaps the best known is the “Pange Lingua.”', title: 'Story of Saint Thomas Aquinas'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-thomas-aquinas', snippet: 'Thomas Aquinas came from a wealthy Italian ruling family in the 13th century. At age five, he was sent to a Benedictine monastery at Monte Cassino in hopes that someday he would be abbot. But King Frederick III sent his troops to occupy the monastery as a fortress. Thomas then transferred to the Un...', title: 'Saint Thomas Aquinas'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-angela-merica-jan-27', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Thomas Aquinas’ Story \u200B By universal consent, Thomas Aquinas is the preeminent spokesman of the Catholic tradition of reason and of divine revelation. He is one of the great teachers of the medieval Catholic Church, honored with the titles Doctor of the Church and Angelic Doctor. At five he wa...', title: 'Thomas Aquinas'}
					]),
				feast: 'Saint Thomas Aquinas'
			}
			])
	},
		{
		date: '29',
		feasts: _List_fromArray(
			[
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/servant-of-god-brother-juniper/', snippet: 'Brother Juniper was a simple man who joined Saint Francis in the earliest days of the Order. While Saint Francis praised him and wished he had a “whole forest of such Junipers,” nevertheless, he could be exasperating for his generosity. Even saints can be frustrating.', title: 'Story of Servant of God Brother Juniper'}
					]),
				feast: 'Servant of God Brother Juniper'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-blath-jan-29-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Blath, also called Flora, was the cook in St. Brigid\'s convent, in Kildare, Ireland. She was renowned for her holiness and for her steadfast loyalty to St. Brigid in good times and in bad. Blath is the Irish word for \'flower\', and so the Martyrology of Gorman makes a pun by recording her as \'blooming Blath\'. Her name is thus Latinized as Flora.', title: 'Blath'}
					]),
				feast: 'Saint Blath'
			}
			])
	},
		{
		date: '30',
		feasts: _List_fromArray(
			[
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/blessed-mary-angela-truszkowska/', snippet: 'Blessed Mary Angela Truszkowska founded the Felician Sisters as a result of a conversion experience she had while convalescing from an illness. At the age of 44 she was forced to resign due to ill health. She lived however, into her ’70s.', title: 'Story of Blessed Mary Angela Truszkowska'}
					]),
				feast: 'Blessed Mary Angela Truszkowska'
			}
			])
	},
		{
		date: '31',
		feasts: _List_fromArray(
			[
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Video, image: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/YoutubeLogo_YrXRl6n7P.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676253992177', link: 'https://www.youtube.com/watch?v=wejhGYOGLgE', snippet: 'Thomas and his wife Helen guide their children in the ways of holiness by teaching them about the lives of the saints. Here they explore the life of the great apostle of the youth, St. Don Bosco.', title: 'My Catholic Family - Don Bosco'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-john-bosco-jan-31', snippet: 'John Bosco’s theory of education could well be used in today’s schools. It was a preventive system, rejecting corporal punishment and placing students in surroundings removed from the likelihood of committing sin. He advocated frequent reception of the sacraments of Penance and Holy Communion...', title: 'Saint John Bosco’s Story'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-john-bosco/', snippet: 'Inspired by Saint Francis de Sales, Saint John Bosco founded the Salesians to continue his work among boys. Then, joining forces with Mary Mazzarello, he helped found the Salesian Sisters. All this during a time when established religious communities in Italy were closing their doors.', title: 'Story of Saint John Bosco'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-john-bosco', snippet: 'When John Bosco lived in Europe, many boys were orphaned and poor. Without families and religious training, these boys often got into fights, used bad language, and stole, hurting others. John Bosco might have been like that, too, if it hadn’t been for his devout mother. John was the youngest son o...', title: 'Saint John Bosco'},
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-john-bosco-jan-31', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! John Bosco’s theory of education could well be used in today’s schools. It was a preventive system, rejecting corporal punishment and placing students in surroundings removed from the likelihood of committing sin. He advocated frequent reception of the sacraments of Penance and Holy Communion. He combined catechetical training and fatherly guidance, seeking to unite the spiritual life with one’s work, study and play...', title: 'John Bosco'}
					]),
				feast: 'Saint John Bosco'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-proclamation-of-the-kingdom', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint\u00A0Martina of Rome’s Story \u200B Saint Martina of Rome, Virgin and Martyr from the Liturgical Year, 1904 A third Roman virgin, wearing on her brow a Martyr’s crown, comes today to share the honors given to Agnes and Emerentiana, and offer her palm to the Lamb. Her name is Martina, which the pagans w...', title: 'Saint Martina of Rome'}
					]),
				feast: 'Saint Martina of Rome'
			}
			])
	}
	]);
var $author$project$Page$FeastDayActivities$FeastDays$M01Jan$january = {color: '#9de3ec', feasts: $author$project$Page$FeastDayActivities$FeastDays$M01Jan$janFeasts, key: 'jan', month: 'January'};
var $author$project$Page$FeastDayActivities$FeastDays$M07Jul$july = {
	color: '#b99eda',
	feasts: _List_fromArray(
		[
			{
			date: '01',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Junipero Serra'}
				])
		},
			{
			date: '03',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Thomas the Apostle'}
				])
		},
			{
			date: '04',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Elizabeth of Portugal (5th in the US)'}
				])
		},
			{
			date: '05',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Anthony Mary Zaccaria'}
				])
		},
			{
			date: '06',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Maria Goretti'}
				])
		},
			{
			date: '09',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Augustine Tchao and Companion'}
				])
		},
			{
			date: '11',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Benedict of Nursia'}
				])
		},
			{
			date: '12',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Louis Martin'},
					{activities: _List_Nil, feast: 'Saint Marie-Azélie Guérin Martin'}
				])
		},
			{
			date: '13',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Henry II'}
				])
		},
			{
			date: '14',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Camillus of Lellis (18th in the US)'},
					{activities: _List_Nil, feast: 'Saint Kateri Tekakwitha'}
				])
		},
			{
			date: '15',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Bonaventure of Bagnoregio'}
				])
		},
			{
			date: '16',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Our Lady of Carmel of the Maipú'}
				])
		},
			{
			date: '20',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Apollinaris of Ravenna'}
				])
		},
			{
			date: '21',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Lawrence of Brindisi'}
				])
		},
			{
			date: '22',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Mary Magdalen'}
				])
		},
			{
			date: '23',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Bridget of Sweden'}
				])
		},
			{
			date: '24',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Charbel Makhlouf'}
				])
		},
			{
			date: '25',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint James the Greater'}
				])
		},
			{
			date: '26',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Joachim and Saint Anne'}
				])
		},
			{
			date: '29',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Martha of Bethany and Saint Mary of Bethany and Saint Lazarus of Bethany'}
				])
		},
			{
			date: '30',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Peter Chrysologus'}
				])
		},
			{
			date: '31',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Ignatius of Loyola'}
				])
		}
		]),
	key: 'jul',
	month: 'July'
};
var $author$project$Page$FeastDayActivities$FeastDays$M06Jun$june = {
	color: '#395d73',
	feasts: _List_fromArray(
		[
			{
			date: '01',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'The Ascension of the Lord (or May 29)'},
					{activities: _List_Nil, feast: 'Saint Justin Martyr'}
				])
		},
			{
			date: '02',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Marcellinus and Saint Peter the Exorcist'}
				])
		},
			{
			date: '03',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Charles Lwanga and Companions'}
				])
		},
			{
			date: '05',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Boniface of Crediton'}
				])
		},
			{
			date: '06',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Norbert of Xanten'}
				])
		},
			{
			date: '08',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Pentecost Sunday'}
				])
		},
			{
			date: '09',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Blessed Virgin Mary, Mother of the Church'},
					{activities: _List_Nil, feast: 'Saint Ephrem of Syria'}
				])
		},
			{
			date: '11',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Barnabas the Apostle'}
				])
		},
			{
			date: '13',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Anthony of Padua'}
				])
		},
			{
			date: '15',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'The Most Holy Trinity'}
				])
		},
			{
			date: '19',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Romuald'}
				])
		},
			{
			date: '21',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Aloysius Gonzaga'}
				])
		},
			{
			date: '22',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Corpus Christi'},
					{activities: _List_Nil, feast: 'Saint Paulinus of Nola'},
					{activities: _List_Nil, feast: 'Saint John Fisher'},
					{activities: _List_Nil, feast: 'Saint Thomas More'}
				])
		},
			{
			date: '24',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Birth of Saint John the Baptist'}
				])
		},
			{
			date: '26',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Josemaría Escrivá'}
				])
		},
			{
			date: '27',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Sacred Heart of Jesus'},
					{activities: _List_Nil, feast: 'Saint Cyril of Alexandria'}
				])
		},
			{
			date: '28',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Immaculate Heart of Mary'},
					{activities: _List_Nil, feast: 'Saint Irenaeus of Lyons'}
				])
		},
			{
			date: '29',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Peter the Apostle'},
					{activities: _List_Nil, feast: 'Saint Paul the Apostle'}
				])
		},
			{
			date: '30',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'First Martyrs of the Church of Rome'}
				])
		}
		]),
	key: 'jun',
	month: 'June'
};
var $author$project$Page$FeastDayActivities$FeastDays$M03Mar$march = {
	color: '#b99eda',
	feasts: _List_fromArray(
		[
			{
			date: '03',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://mycatholic.life/wp-content/uploads/2021/08/My-Catholic-Life-MCL-Header.jpg', link: 'https://mycatholic.life/saints/saints-of-the-liturgical-year/march-3-saint-katharine-drexel-virgin-usa-optional-memorial/', snippet: 'Like the little girl who wept when she found that her doll was stuffed with sawdust and her drum was hollow, I too have made a horrifying discovery and my discovery like hers is true. I have ripped both the doll and the drum open and the fact lies plainly and in all its glaring reality before me...', title: 'Saint Katharine Drexel'}
						]),
					feast: 'Saint Katharine Drexel'
				}
				])
		},
			{
			date: '04',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-casimir/', snippet: 'Casimir, born of kings and in line to be a king himself, was filled with exceptional values and learning by a great teacher, John Dlugosz. Even his critics could not say that his conscientious objection indicated softness. As a teenager, Casimir lived a highly disciplined, even severe life, sleeping on the ground, spending a great part of the night in prayer and dedicating himself to lifelong celibacy...', title: 'Saint Casimir’s Story'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://mycatholic.life/wp-content/uploads/2021/08/My-Catholic-Life-MCL-Header.jpg', link: 'https://mycatholic.life/saints/saints-of-the-liturgical-year/march-4-saint-casimir/', snippet: 'Daily, daily sing to Mary; Sing, my soul, her praises due. All her glorious actions cherish, With the heart’s devotion true. Lost in wond’ring contemplation, Be her majesty confessed...', title: 'Saint Casimir'}
						]),
					feast: 'Saint Casimir'
				}
				])
		},
			{
			date: '05',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://2.bp.blogspot.com/_pUXaddJMQyw/TU9zVNqMGvI/AAAAAAAAEt4/SFvGzWmY7ZY/s400/rice+krispie+grotto+2.jpg', link: 'https://www.catholicicing.com/pretzels-for-lent/', snippet: 'Did you know that the pretzel is a traditional food for lent? In fact, the pretzel was actually invented in order to be a simple Lenten snack!', title: 'Lenten Pretzel Recipe (And A Printable Pretzel Prayer Poem)'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/Cultivating_Catholics_Logo_GpMJodURB.png?updatedAt=1680400021552', link: 'https://cultivatingcatholics.com/product/free-meatless-lent-recipes-instant-download/', snippet: 'Tired of pizza and fish for dinner during Fridays in Lent? Here are 10 meat-free (and seafood-free!) meal ideas.', title: 'Meatless Lent Recipes'}
						]),
					feast: 'Ash Wednesday'
				}
				])
		},
			{
			date: '07',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', link: 'https://www.franciscanmedia.org/saint-of-the-day/saints-perpetua-and-felicity/', snippet: '“When my father in his affection for me was trying to turn me from my purpose by arguments and thus weaken my faith, I said to him, ‘Do you see this vessel—water pot or whatever it may be? Can it be called by any other name than what it is?’ ‘No,’ he replied. ‘So also I cannot call myself by any other name than what I am—a Christian.’”', title: 'Saints Perpetua and Felicity’s Story'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://mycatholic.life/wp-content/uploads/2021/08/My-Catholic-Life-MCL-Header.jpg', link: 'https://mycatholic.life/saints/saints-of-the-liturgical-year/march-7-saints-perpetua-and-felicity-martyrs/', snippet: 'Now dawned the day of their victory, and they went forth from the prison into the amphitheater as it were into heaven, cheerful and bright of countenance; if they trembled at all, it was for joy, not for fear...', title: 'Saints Perpetua and Felicity'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Video, image: '', link: 'https://www.youtube-nocookie.com/embed/Cmbhtgu8xlk', snippet: '', title: 'Story of Saints Perpetua and Felicity | Stories of Saints | EP83'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Printout, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/TheCatholicKidLogo_BOq9GnY34.png?ik-sdk-version=javascript-1.4.3&updatedAt=1678397749498', link: 'https://www.thecatholickid.com/saint-perpetua-and-felicity-coloring-page-cnt-mls/', snippet: '', title: 'Saint Perpetua and Felicity Coloring Page'}
						]),
					feast: 'Saints Perpetua and Felicity'
				}
				])
		},
			{
			date: '08',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://mycatholic.life/wp-content/uploads/2021/08/My-Catholic-Life-MCL-Header.jpg', link: 'https://mycatholic.life/saints/saints-of-the-liturgical-year/march-8-saint-john-of-god-religious/', snippet: 'Lord be blessed for in your great kindness to me who am such a great sinner having done so many wicked things, yet you see fit to set me free from such a tremendous temptation and deception which I fell into through my own sinfulness...', title: 'Saint John of God'}
						]),
					feast: 'Saint John of God'
				}
				])
		},
			{
			date: '09',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://mycatholic.life/wp-content/uploads/2021/08/My-Catholic-Life-MCL-Header.jpg', link: 'https://mycatholic.life/saints/saints-of-the-liturgical-year/march-9-saint-frances-of-rome-religious/', snippet: 'A married woman must, when called upon, leave her devotions to God at the altar to find him in her household affairs...', title: 'Saint Frances of Rome'}
						]),
					feast: 'Saint Frances of Rome'
				}
				])
		},
			{
			date: '17',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://mycatholic.life/wp-content/uploads/2021/08/My-Catholic-Life-MCL-Header.jpg', link: 'https://mycatholic.life/saints/saints-of-the-liturgical-year/march-17-saint-patrick-bishop/', snippet: 'I, Patrick, a sinner, a most simple countryman, the least of all the faithful and most contemptible to many…was taken captive. I was at that time about sixteen years of age. I did not, indeed, know the true God; and I was taken into captivity in Ireland with many thousands of people...', title: 'Saint Patrick'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Printout, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/printable-trinity-shamrock-craft-perfect-craft-for-st-patricks-day/', snippet: 'We crafted shamrocks and added this printable to turn them into Trinity shamrocks. You just print 2 sided, fold, and open! Check it out.', title: 'Printable Trinity Shamrock Craft'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Printout, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/catholic-st-patricks-day-printables/', snippet: 'Here are some great Catholic St. Patrick’s day printables to help your kids know the true meaning of this Catholic feast day!', title: 'Catholic St. Patrick’s Day Printables'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/st-patricks-day-tea-party/', snippet: 'I love tea parties because they can be as simple or as complicated as you want, and you can do them with a very small group- even just your own kids...', title: 'St. Patrick’s Day Tea Party- Menu And Food Ideas'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Food, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/catholic-st-patricks-day-food/', snippet: 'I love these St. Patrick’s Day food ideas I’ve been seeing around! Just remember when you’re making St. Patrick’s Day treats this year, the shamrock is the tool that St. Patrick used to explain the trinity- 3 in one!', title: 'Catholic St. Patrick’s Day Fun Food Ideas For Kids'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/st-patricks-snake-banishment/', snippet: 'Here are some fun snake foods, crafts, and games for celebrating St. Patrick’s story on his feast day!', title: 'St. Patrick’s Snake Banishment- Crafts, Food, Games, More!'}
						]),
					feast: 'Saint Patrick'
				}
				])
		},
			{
			date: '18',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://mycatholic.life/wp-content/uploads/2021/08/My-Catholic-Life-MCL-Header.jpg', link: 'https://mycatholic.life/saints/saints-of-the-liturgical-year/march-18-saint-cyril-of-jerusalem-bishop-and-doctor/', snippet: 'God is loving to man, and loving in no small measure. For say not, I have committed fornication and adultery: I have done dreadful things, and not once only, but often: will He forgive? Will He grant pardon? Hear what the Psalmist says...', title: 'Saint Cyril of Jerusalem'}
						]),
					feast: 'Saint Cyril of Jerusalem'
				}
				])
		},
			{
			date: '19',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-joseph-husband-of-mary/', snippet: 'The Bible pays Joseph the highest compliment: he was a “just” man. The quality meant a lot more than faithfulness in paying debts...', title: 'Saint Joseph’s Story'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://mycatholic.life/wp-content/uploads/2021/08/My-Catholic-Life-MCL-Header.jpg', link: 'https://mycatholic.life/catholic-prayers/novena-to-saint-joseph/', snippet: 'Saint Joseph, you were privileged to share in the mystery of the Incarnation as the foster-father of Jesus...', title: 'Novena to Saint Joseph'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Printout, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/st-josephs-altar/', snippet: 'It’s a 3D printable St. Joseph’s altar, and it’s super easy to put together!', title: 'Printable 3D St. Joseph’s Altar'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Printout, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/st-joseph-altar-for-beginners/', snippet: 'Today I wanted to share with you our St. Joseph’s altar. I also want to answer all the questions you may have about how to set up a St. Joseph’s altar, what’s involved, and why we do it.', title: 'St. Joseph Altar For Beginners'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/st-joseph-feast-day-celebration-ideas/', snippet: 'Find some St. Joseph feast day celebration ideas for your home!', title: 'St. Joseph Feast Day Celebration Ideas for your Home'}
						]),
					feast: 'Saint Joseph Husband of the Blessed Virgin Mary'
				}
				])
		},
			{
			date: '23',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-turibius-of-mogrovejo/', snippet: 'Together with Rose of Lima, Turibius is the first known saint of the New World, serving the Lord in Peru, South America, for 26 years...', title: 'Saint Turibius of Mogrovejo’s Story'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://mycatholic.life/wp-content/uploads/2021/08/My-Catholic-Life-MCL-Header.jpg', link: 'https://mycatholic.life/saints/saints-of-the-liturgical-year/march-23-saint-turibius-of-mogrovejo-bishop/', snippet: 'Nothing gave the saint so much pleasure as the greatest labors and dangers, to procure the least spiritual advantage to one soul. Burning with the most vehement desire of laying down his life for his flock, and of suffering all things for him who died for us, he feared no danger.', title: 'Saint Turibius of Mogrovejo'}
						]),
					feast: 'Saint Turibius of Mogrovejo'
				}
				])
		},
			{
			date: '25',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', link: 'https://www.franciscanmedia.org/saint-of-the-day/annunciation-of-the-lord/', snippet: 'The feast of the Annunciation, now recognized as a solemnity, was first celebrated in the fourth or fifth century. Its central focus is the Incarnation: God has become one of us. From all eternity God had decided that the Second Person of the Blessed Trinity should become human...', title: 'The Story of the Annunciation of the Lord'},
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://mycatholic.life/wp-content/uploads/2021/08/My-Catholic-Life-MCL-Header.jpg', link: 'https://mycatholic.life/saints/saints-of-the-liturgical-year/march-25-annunciation-of-the-lord/', snippet: 'In the fifth century, bishops engaged in a fierce theological debate over the unity of the divine and human natures of Christ, referred to as the “hypostatic union.” Nestorius, the Archbishop of Constantinople, argued that there were two underlying hypostases, or substances, in Christ, one human and one divine...', title: 'Annunciation of the Lord'}
						]),
					feast: 'Annunciation of the Lord'
				}
				])
		}
		]),
	key: 'mar',
	month: 'March'
};
var $author$project$Page$FeastDayActivities$FeastDays$M05May$may = {
	color: '#9de3ec',
	feasts: _List_fromArray(
		[
			{
			date: '01',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Joseph the Worker'}
				])
		},
			{
			date: '02',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Athanasius of Alexandria'}
				])
		},
			{
			date: '03',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Philip the Apostle and Saint James the Lesser'}
				])
		},
			{
			date: '10',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Damien of Molokai'},
					{activities: _List_Nil, feast: 'Saint John of Ávila'}
				])
		},
			{
			date: '12',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Nereus of Terracina'},
					{activities: _List_Nil, feast: 'Saint Achilleus of Terracina'},
					{activities: _List_Nil, feast: 'Saint Pancras of Rome'}
				])
		},
			{
			date: '13',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Our Lady of Fatima'}
				])
		},
			{
			date: '14',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Matthew the Apostle'}
				])
		},
			{
			date: '15',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Isidore the Farmer'},
					{activities: _List_Nil, feast: 'Saint Dymphna'}
				])
		},
			{
			date: '20',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Bernadine of Siena'},
					{activities: _List_Nil, feast: 'Saint Paul VI'}
				])
		},
			{
			date: '22',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Rita of Cascia'}
				])
		},
			{
			date: '25',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Bede the Venerable'},
					{activities: _List_Nil, feast: 'Pope Saint Gregory VII'}
				])
		},
			{
			date: '26',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio, image: '', link: 'https://castbox.fm/app/castbox/player/id4699401/id595842884?v=8.22.11&autoplay=0', snippet: '', title: ''}
						]),
					feast: 'Saint Philip Neri'
				}
				])
		},
			{
			date: '27',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Augustine of Canterbury'}
				])
		},
			{
			date: '29',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'The Ascension of the Lord (or June 1)'}
				])
		},
			{
			date: '31',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Visitation of the Blessed Virgin Mary'}
				])
		}
		]),
	key: 'may',
	month: 'May'
};
var $author$project$Page$FeastDayActivities$FeastDays$M11Nov$november = {
	color: '#b99eda',
	feasts: _List_fromArray(
		[
			{
			date: '01',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'All Saints'}
				])
		},
			{
			date: '02',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'All Souls Day'}
				])
		},
			{
			date: '03',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Martin de Porres'}
				])
		},
			{
			date: '04',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Charles Borromeo'}
				])
		},
			{
			date: '09',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Dedication of the Lateran Basilica'}
				])
		},
			{
			date: '10',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Pope Saint Leo the Great'}
				])
		},
			{
			date: '11',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Martin of Tours'}
				])
		},
			{
			date: '12',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Josaphat Kuncevyc'}
				])
		},
			{
			date: '13',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Frances Xavier Cabrini'}
				])
		},
			{
			date: '15',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Albert the Great'}
				])
		},
			{
			date: '16',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Margaret of Scotland'},
					{activities: _List_Nil, feast: 'Saint Gertrude the Great'}
				])
		},
			{
			date: '17',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Elizabeth of Hungary'}
				])
		},
			{
			date: '18',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Dedication of the Basilicas of Saints Peter and Paul'},
					{activities: _List_Nil, feast: 'Saint Rose Philippine Duchesne'}
				])
		},
			{
			date: '21',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Presentation of the Blessed Virgin Mary'}
				])
		},
			{
			date: '22',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Cecilia'}
				])
		},
			{
			date: '23',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Our Lord Jesus Christ, King of the Universe - Solemnity'},
					{activities: _List_Nil, feast: 'Pope Saint Clement I'},
					{activities: _List_Nil, feast: 'Blessed Miguel Agustin Pro'},
					{activities: _List_Nil, feast: 'Saint Columbanus'}
				])
		},
			{
			date: '24',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Anrê Tran An Dung'},
					{activities: _List_Nil, feast: 'Martyrs of Vietnam'}
				])
		},
			{
			date: '25',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Catherine of Alexandria'}
				])
		},
			{
			date: '30',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Andrew the Apostle'}
				])
		}
		]),
	key: 'nov',
	month: 'November'
};
var $author$project$Page$FeastDayActivities$FeastDays$M10Oct$october = {
	color: '#395d73',
	feasts: _List_fromArray(
		[
			{
			date: '01',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Thérèse of Lisieux'}
				])
		},
			{
			date: '02',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Guardian Angels'}
				])
		},
			{
			date: '04',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Francis of Assisi'}
				])
		},
			{
			date: '05',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Faustina Kowalska'}
				])
		},
			{
			date: '06',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Bruno'},
					{activities: _List_Nil, feast: 'Blessed Marie Rose Durocher'}
				])
		},
			{
			date: '07',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Our Lady of the Rosary'}
				])
		},
			{
			date: '09',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint John Henry Newman'},
					{activities: _List_Nil, feast: 'Saint Denis of Paris'},
					{activities: _List_Nil, feast: 'Saint John Leonardi'}
				])
		},
			{
			date: '11',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Pope Saint John XXIII'}
				])
		},
			{
			date: '14',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Pope Saint Callistus I'}
				])
		},
			{
			date: '15',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Teresa of Ávila'}
				])
		},
			{
			date: '16',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Hedwig of Andechs'},
					{activities: _List_Nil, feast: 'Saint Margaret Mary Alacoque'}
				])
		},
			{
			date: '17',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Ignatius of Antioch'}
				])
		},
			{
			date: '18',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Luke the Evangelist'}
				])
		},
			{
			date: '19',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Isaac Jogues'},
					{activities: _List_Nil, feast: 'Saint John de Brébeuf'},
					{activities: _List_Nil, feast: 'Martyrs of North America'}
				])
		},
			{
			date: '20',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Paul of the Cross'}
				])
		},
			{
			date: '22',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint John Paul II'}
				])
		},
			{
			date: '23',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint John of Capistrano'}
				])
		},
			{
			date: '24',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Anthony Mary Claret'}
				])
		},
			{
			date: '28',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Simon the Apostle'},
					{activities: _List_Nil, feast: 'Saint Jude Thaddeus'}
				])
		}
		]),
	key: 'oct',
	month: 'October'
};
var $author$project$Page$FeastDayActivities$FeastDays$M09Sep$september = {
	color: '#9de3ec',
	feasts: _List_fromArray(
		[
			{
			date: '03',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Pope Saint Gregory the Great'}
				])
		},
			{
			date: '05',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Teresa of Calcutta'}
				])
		},
			{
			date: '08',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'CatholicIcing', link: 'https://www.catholicicing.com/nativity-of-mary/', snippet: 'There are so many really fun and meaningful ways to celebrate the Nativity Of Mary with your kids, and today we are going to look at some food ideas, crafts, printables, and more!', title: 'How To Celebrate The Nativity Of Mary'}
						]),
					feast: 'Birth of the Blessed Virgin Mary'
				}
				])
		},
			{
			date: '09',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Peter Claver'}
				])
		},
			{
			date: '12',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Holy Name of the Blessed Virgin Mary'}
				])
		},
			{
			date: '13',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint John Chrysostom'}
				])
		},
			{
			date: '14',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$Page$FeastDayActivities$FeastDayHelpers$More, image: 'CatholicIcing', link: 'https://www.catholicicing.com/celebrating-the-exaltation-of-the-holy-cross-with-kids/', snippet: 'When living the liturgical year at home, celebrating the exaltation of the holy cross with kids is a fun feast day to keep in mind! It comes around every year on September 14.', title: 'Celebrating The Exaltation Of The Holy Cross With Kids'}
						]),
					feast: 'Exaltation of the Holy Cross'
				}
				])
		},
			{
			date: '15',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Our Lady of Sorrows'}
				])
		},
			{
			date: '16',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Pope Saint Cornelius'},
					{activities: _List_Nil, feast: 'Saint Cyprian of Carthage'}
				])
		},
			{
			date: '17',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Hildegard von Bingen'}
				])
		},
			{
			date: '19',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Januarius of Naples'}
				])
		},
			{
			date: '20',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Andrew Kim Taegon'},
					{activities: _List_Nil, feast: 'Saint Paul Chong Hasang'},
					{activities: _List_Nil, feast: 'Martyrs of Korea'}
				])
		},
			{
			date: '21',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Matthew the Apostle'}
				])
		},
			{
			date: '23',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Padre Pio'}
				])
		},
			{
			date: '26',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Cosmas'},
					{activities: _List_Nil, feast: 'Saint Damian'}
				])
		},
			{
			date: '27',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Vincent de Paul'}
				])
		},
			{
			date: '28',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Wenceslaus of Bohemia'},
					{activities: _List_Nil, feast: 'Saint Lorenzo Ruiz of Manila'}
				])
		},
			{
			date: '29',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Michael the Archangel'},
					{activities: _List_Nil, feast: 'Raphael the Archangel'},
					{activities: _List_Nil, feast: 'Gabriel the Archangel'}
				])
		},
			{
			date: '30',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Jerome'}
				])
		}
		]),
	key: 'sep',
	month: 'September'
};
var $author$project$Page$FeastDayActivities$FeastDays$feastDays = _List_fromArray(
	[$author$project$Page$FeastDayActivities$FeastDays$M01Jan$january, $author$project$Page$FeastDayActivities$FeastDays$M02Feb$february, $author$project$Page$FeastDayActivities$FeastDays$M03Mar$march, $author$project$Page$FeastDayActivities$FeastDays$M04Apr$april, $author$project$Page$FeastDayActivities$FeastDays$M05May$may, $author$project$Page$FeastDayActivities$FeastDays$M06Jun$june, $author$project$Page$FeastDayActivities$FeastDays$M07Jul$july, $author$project$Page$FeastDayActivities$FeastDays$M08Aug$august, $author$project$Page$FeastDayActivities$FeastDays$M09Sep$september, $author$project$Page$FeastDayActivities$FeastDays$M10Oct$october, $author$project$Page$FeastDayActivities$FeastDays$M11Nov$november, $author$project$Page$FeastDayActivities$FeastDays$M12Dec$december]);
var $author$project$Page$FeastDayActivities$Main$feastMonthFromMonth = function (month) {
	switch (month.$) {
		case 'Jan':
			return $author$project$Page$FeastDayActivities$FeastDays$M01Jan$january;
		case 'Feb':
			return $author$project$Page$FeastDayActivities$FeastDays$M02Feb$february;
		case 'Mar':
			return $author$project$Page$FeastDayActivities$FeastDays$M03Mar$march;
		case 'Apr':
			return $author$project$Page$FeastDayActivities$FeastDays$M04Apr$april;
		case 'May':
			return $author$project$Page$FeastDayActivities$FeastDays$M05May$may;
		case 'Jun':
			return $author$project$Page$FeastDayActivities$FeastDays$M06Jun$june;
		case 'Jul':
			return $author$project$Page$FeastDayActivities$FeastDays$M07Jul$july;
		case 'Aug':
			return $author$project$Page$FeastDayActivities$FeastDays$M08Aug$august;
		case 'Sep':
			return $author$project$Page$FeastDayActivities$FeastDays$M09Sep$september;
		case 'Oct':
			return $author$project$Page$FeastDayActivities$FeastDays$M10Oct$october;
		case 'Nov':
			return $author$project$Page$FeastDayActivities$FeastDays$M11Nov$november;
		default:
			return $author$project$Page$FeastDayActivities$FeastDays$M12Dec$december;
	}
};
var $elm$time$Time$Apr = {$: 'Apr'};
var $elm$time$Time$Aug = {$: 'Aug'};
var $elm$time$Time$Dec = {$: 'Dec'};
var $elm$time$Time$Feb = {$: 'Feb'};
var $elm$time$Time$Jan = {$: 'Jan'};
var $elm$time$Time$Jul = {$: 'Jul'};
var $elm$time$Time$Jun = {$: 'Jun'};
var $elm$time$Time$Mar = {$: 'Mar'};
var $elm$time$Time$May = {$: 'May'};
var $elm$time$Time$Nov = {$: 'Nov'};
var $elm$time$Time$Oct = {$: 'Oct'};
var $elm$time$Time$Sep = {$: 'Sep'};
var $elm$time$Time$flooredDiv = F2(
	function (numerator, denominator) {
		return $elm$core$Basics$floor(numerator / denominator);
	});
var $elm$time$Time$posixToMillis = function (_v0) {
	var millis = _v0.a;
	return millis;
};
var $elm$time$Time$toAdjustedMinutesHelp = F3(
	function (defaultOffset, posixMinutes, eras) {
		toAdjustedMinutesHelp:
		while (true) {
			if (!eras.b) {
				return posixMinutes + defaultOffset;
			} else {
				var era = eras.a;
				var olderEras = eras.b;
				if (_Utils_cmp(era.start, posixMinutes) < 0) {
					return posixMinutes + era.offset;
				} else {
					var $temp$defaultOffset = defaultOffset,
						$temp$posixMinutes = posixMinutes,
						$temp$eras = olderEras;
					defaultOffset = $temp$defaultOffset;
					posixMinutes = $temp$posixMinutes;
					eras = $temp$eras;
					continue toAdjustedMinutesHelp;
				}
			}
		}
	});
var $elm$time$Time$toAdjustedMinutes = F2(
	function (_v0, time) {
		var defaultOffset = _v0.a;
		var eras = _v0.b;
		return A3(
			$elm$time$Time$toAdjustedMinutesHelp,
			defaultOffset,
			A2(
				$elm$time$Time$flooredDiv,
				$elm$time$Time$posixToMillis(time),
				60000),
			eras);
	});
var $elm$time$Time$toCivil = function (minutes) {
	var rawDay = A2($elm$time$Time$flooredDiv, minutes, 60 * 24) + 719468;
	var era = (((rawDay >= 0) ? rawDay : (rawDay - 146096)) / 146097) | 0;
	var dayOfEra = rawDay - (era * 146097);
	var yearOfEra = ((((dayOfEra - ((dayOfEra / 1460) | 0)) + ((dayOfEra / 36524) | 0)) - ((dayOfEra / 146096) | 0)) / 365) | 0;
	var dayOfYear = dayOfEra - (((365 * yearOfEra) + ((yearOfEra / 4) | 0)) - ((yearOfEra / 100) | 0));
	var mp = (((5 * dayOfYear) + 2) / 153) | 0;
	var month = mp + ((mp < 10) ? 3 : (-9));
	var year = yearOfEra + (era * 400);
	return {
		day: (dayOfYear - ((((153 * mp) + 2) / 5) | 0)) + 1,
		month: month,
		year: year + ((month <= 2) ? 1 : 0)
	};
};
var $elm$time$Time$toMonth = F2(
	function (zone, time) {
		var _v0 = $elm$time$Time$toCivil(
			A2($elm$time$Time$toAdjustedMinutes, zone, time)).month;
		switch (_v0) {
			case 1:
				return $elm$time$Time$Jan;
			case 2:
				return $elm$time$Time$Feb;
			case 3:
				return $elm$time$Time$Mar;
			case 4:
				return $elm$time$Time$Apr;
			case 5:
				return $elm$time$Time$May;
			case 6:
				return $elm$time$Time$Jun;
			case 7:
				return $elm$time$Time$Jul;
			case 8:
				return $elm$time$Time$Aug;
			case 9:
				return $elm$time$Time$Sep;
			case 10:
				return $elm$time$Time$Oct;
			case 11:
				return $elm$time$Time$Nov;
			default:
				return $elm$time$Time$Dec;
		}
	});
var $author$project$Page$FeastDayActivities$Main$monthFromTime = function (t) {
	return $author$project$Page$FeastDayActivities$Main$feastMonthFromMonth(
		A2($elm$time$Time$toMonth, $elm$time$Time$utc, t));
};
var $elm$core$String$cons = _String_cons;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $elm$core$String$toUpper = _String_toUpper;
var $author$project$Page$FeastDayActivities$Main$capitalizeFirst = function (s) {
	var _v0 = $elm$core$String$uncons(s);
	if (_v0.$ === 'Nothing') {
		return '';
	} else {
		var _v1 = _v0.a;
		var firstChar = _v1.a;
		var rest = _v1.b;
		return _Utils_ap(
			$elm$core$String$toUpper(
				$elm$core$String$fromChar(firstChar)),
			rest);
	}
};
var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var $elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			$elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var $elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3($elm$core$String$repeatHelp, n, chunk, '');
	});
var $elm$core$String$padLeft = F3(
	function (n, _char, string) {
		return _Utils_ap(
			A2(
				$elm$core$String$repeat,
				n - $elm$core$String$length(string),
				$elm$core$String$fromChar(_char)),
			string);
	});
var $author$project$Page$FeastDayActivities$Main$urlPath = '/feastdayactivities';
var $author$project$Page$FeastDayActivities$Main$createFeastDayLink = F2(
	function (month, date) {
		var paddedDate = A3(
			$elm$core$String$padLeft,
			2,
			_Utils_chr('0'),
			date);
		return $author$project$Page$FeastDayActivities$Main$urlPath + ('?m=' + (month + ('&d=' + paddedDate)));
	});
var $author$project$Page$FeastDayActivities$FeastDayHelpers$isLeapYear = function (year) {
	return ((!A2($elm$core$Basics$modBy, 4, year)) && (!(!A2($elm$core$Basics$modBy, 100, year)))) || (!A2($elm$core$Basics$modBy, 400, year));
};
var $author$project$Page$FeastDayActivities$FeastDayHelpers$nextDate = F3(
	function (year, month, day) {
		var intYear = A2(
			$elm$core$Maybe$withDefault,
			0,
			$elm$core$String$toInt(year));
		var date = A2(
			$elm$core$Maybe$withDefault,
			0,
			$elm$core$String$toInt(day));
		switch (month) {
			case 'jan':
				return ((date + 1) <= 31) ? _Utils_Tuple2(
					'jan',
					$elm$core$String$fromInt(date + 1)) : _Utils_Tuple2('feb', '1');
			case 'feb':
				return $author$project$Page$FeastDayActivities$FeastDayHelpers$isLeapYear(intYear) ? (((date + 1) <= 29) ? _Utils_Tuple2(
					'feb',
					$elm$core$String$fromInt(date + 1)) : _Utils_Tuple2('mar', '1')) : (((date + 1) <= 28) ? _Utils_Tuple2(
					'feb',
					$elm$core$String$fromInt(date + 1)) : _Utils_Tuple2('mar', '1'));
			case 'mar':
				return ((date + 1) <= 31) ? _Utils_Tuple2(
					'mar',
					$elm$core$String$fromInt(date + 1)) : _Utils_Tuple2('apr', '1');
			case 'apr':
				return ((date + 1) <= 30) ? _Utils_Tuple2(
					'apr',
					$elm$core$String$fromInt(date + 1)) : _Utils_Tuple2('may', '1');
			case 'may':
				return ((date + 1) <= 31) ? _Utils_Tuple2(
					'may',
					$elm$core$String$fromInt(date + 1)) : _Utils_Tuple2('jun', '1');
			case 'jun':
				return ((date + 1) <= 30) ? _Utils_Tuple2(
					'jun',
					$elm$core$String$fromInt(date + 1)) : _Utils_Tuple2('jul', '1');
			case 'jul':
				return ((date + 1) <= 31) ? _Utils_Tuple2(
					'jul',
					$elm$core$String$fromInt(date + 1)) : _Utils_Tuple2('aug', '1');
			case 'aug':
				return ((date + 1) <= 31) ? _Utils_Tuple2(
					'aug',
					$elm$core$String$fromInt(date + 1)) : _Utils_Tuple2('sep', '1');
			case 'sep':
				return ((date + 1) <= 30) ? _Utils_Tuple2(
					'sep',
					$elm$core$String$fromInt(date + 1)) : _Utils_Tuple2('oct', '1');
			case 'oct':
				return ((date + 1) <= 31) ? _Utils_Tuple2(
					'oct',
					$elm$core$String$fromInt(date + 1)) : _Utils_Tuple2('nov', '1');
			case 'nov':
				return ((date + 1) <= 30) ? _Utils_Tuple2(
					'nov',
					$elm$core$String$fromInt(date + 1)) : _Utils_Tuple2('dec', '1');
			case 'dec':
				return ((date + 1) <= 31) ? _Utils_Tuple2(
					'dec',
					$elm$core$String$fromInt(date + 1)) : _Utils_Tuple2('jan', '1');
			default:
				return _Utils_Tuple2('jan', '1');
		}
	});
var $author$project$Page$FeastDayActivities$FeastDayHelpers$previousDate = F3(
	function (year, month, day) {
		var intYear = A2(
			$elm$core$Maybe$withDefault,
			0,
			$elm$core$String$toInt(year));
		var date = A2(
			$elm$core$Maybe$withDefault,
			0,
			$elm$core$String$toInt(day));
		switch (month) {
			case 'jan':
				return ((date - 1) > 0) ? _Utils_Tuple2(
					'jan',
					$elm$core$String$fromInt(date - 1)) : _Utils_Tuple2('dec', '31');
			case 'feb':
				return ((date - 1) > 0) ? _Utils_Tuple2(
					'feb',
					$elm$core$String$fromInt(date - 1)) : _Utils_Tuple2('jan', '31');
			case 'mar':
				return ((date - 1) > 0) ? _Utils_Tuple2(
					'mar',
					$elm$core$String$fromInt(date - 1)) : ($author$project$Page$FeastDayActivities$FeastDayHelpers$isLeapYear(intYear) ? _Utils_Tuple2('feb', '29') : _Utils_Tuple2('feb', '28'));
			case 'apr':
				return ((date - 1) > 0) ? _Utils_Tuple2(
					'apr',
					$elm$core$String$fromInt(date - 1)) : _Utils_Tuple2('mar', '31');
			case 'may':
				return ((date - 1) > 0) ? _Utils_Tuple2(
					'may',
					$elm$core$String$fromInt(date - 1)) : _Utils_Tuple2('apr', '30');
			case 'jun':
				return ((date - 1) > 0) ? _Utils_Tuple2(
					'jun',
					$elm$core$String$fromInt(date - 1)) : _Utils_Tuple2('may', '31');
			case 'jul':
				return ((date - 1) > 0) ? _Utils_Tuple2(
					'jul',
					$elm$core$String$fromInt(date - 1)) : _Utils_Tuple2('jun', '30');
			case 'aug':
				return ((date - 1) > 0) ? _Utils_Tuple2(
					'aug',
					$elm$core$String$fromInt(date - 1)) : _Utils_Tuple2('jul', '30');
			case 'sep':
				return ((date - 1) > 0) ? _Utils_Tuple2(
					'sep',
					$elm$core$String$fromInt(date - 1)) : _Utils_Tuple2('aug', '31');
			case 'oct':
				return ((date - 1) > 0) ? _Utils_Tuple2(
					'oct',
					$elm$core$String$fromInt(date - 1)) : _Utils_Tuple2('sep', '30');
			case 'nov':
				return ((date - 1) > 0) ? _Utils_Tuple2(
					'nov',
					$elm$core$String$fromInt(date - 1)) : _Utils_Tuple2('oct', '31');
			case 'dec':
				return ((date - 1) > 0) ? _Utils_Tuple2(
					'dec',
					$elm$core$String$fromInt(date - 1)) : _Utils_Tuple2('nov', '30');
			default:
				return _Utils_Tuple2('jan', '1');
		}
	});
var $author$project$Page$FeastDayActivities$FeastDayHelpers$activityDescriptionFromLink = F2(
	function (saintName, link) {
		return A2($elm$core$String$contains, 'catholicsaints.info', link) ? ('Find information about ' + (saintName + ' at Catholic Saints Info.')) : (A2($elm$core$String$contains, 'catholiccuisine', link) ? ('Find recipes relating to ' + (saintName + ' that you can cook and enjoy!')) : (A2($elm$core$String$contains, 'teachingcatholickids', link) ? 'Saint stories, discussion questions, and activities.' : (A2($elm$core$String$contains, 'catholic.org', link) ? ('Read the story of ' + (saintName + ' at Catholic Online.')) : (A2($elm$core$String$contains, 'youtube.com/watch', link) ? ('Watch a video about ' + (saintName + ' on YouTube.')) : (A2($elm$core$String$contains, 'swpals', link) ? ('Watch a video about ' + (saintName + ' on SWPals.')) : (A2($elm$core$String$contains, 'youtube.com/playlist', link) ? ('Watch a video playlist about ' + (saintName + ' on YouTube.')) : (A2($elm$core$String$contains, 'franciscanmedia', link) ? ('Listen to the story of ' + (saintName + ' at Franciscan Media.')) : (A2($elm$core$String$contains, 'saintsalivepodcast', link) ? ('Listen to the story of ' + (saintName + ' with the Saints Alive Podcast.')) : (A2($elm$core$String$contains, 'christianiconography', link) ? ('Learn about the iconography of ' + (saintName + '.')) : (A2($elm$core$String$contains, 'ucatholic', link) ? ('Learn about  ' + (saintName + ' with uCatholic.')) : (A2($elm$core$String$contains, 'thecatholickid', link) ? 'Color with The Catholic Kid' : (A2($elm$core$String$contains, 'catholicfamilycrate', link) ? 'Color with Catholic Family Crate' : (A2($elm$core$String$contains, 'embed.podcasts.apple', link) ? ('Learn about ' + (saintName + ' with this podcast.')) : '')))))))))))));
	});
var $author$project$Page$FeastDayActivities$FeastDayHelpers$activityImageFromLink = function (link) {
	return A2($elm$core$String$contains, 'catholicsaints.info', link) ? 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicSaintsInfoLogo_FvS_sLzOa.png?updatedAt=1685564323370' : (A2($elm$core$String$contains, 'catholiccuisine', link) ? 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicCuisineLogo_LFRz0f3wN.png?updatedAt=1685564638950' : (A2($elm$core$String$contains, 'teachingcatholickids', link) ? 'https://ik.imagekit.io/catholicstories/ProfileImages/TeachingCatholicKids_j2Zik9ZLc.png?updatedAt=1688597870744' : (A2($elm$core$String$contains, 'catholic.org', link) ? 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicOnlineLogo_wG6lD6N7k.png?updatedAt=1685564889945' : (A2($elm$core$String$contains, 'youtube', link) ? 'https://ik.imagekit.io/catholicstories/ProfileImages/YoutubeLogo_pTffms4iT.png?updatedAt=1685565144465' : (A2($elm$core$String$contains, 'swpals', link) ? 'https://ik.imagekit.io/catholicstories/ProfileImages/SWPals_9zKzvu6ZW.jpg?updatedAt=1690806342634' : (A2($elm$core$String$contains, 'franciscanmedia', link) ? 'https://ik.imagekit.io/catholicstories/ProfileImages/FranciscanMediaLogo_9jff8EeGN.png?updatedAt=1685565018915' : (A2($elm$core$String$contains, 'saintsalivepodcast', link) ? 'https://ik.imagekit.io/catholicstories/ProfileImages/14_Aps0ku8wH.png?updatedAt=1679069710842' : (A2($elm$core$String$contains, 'christianiconography', link) ? 'https://ik.imagekit.io/catholicstories/ProfileImages/ChristianIconographyLogo_HythFJN2P.png?updatedAt=1685564536409' : (A2($elm$core$String$contains, 'ucatholic', link) ? 'https://ik.imagekit.io/catholicstories/ProfileImages/uCatholicLogo_ozBcyhYz5.png?updatedAt=1685566890685' : (A2($elm$core$String$contains, 'podcast/cs-', link) ? 'https://ik.imagekit.io/catholicstories/ProfileImages/11_HUKazDTNih.png?updatedAt=1679069711765' : (A2($elm$core$String$contains, 'thecatholickid', link) ? 'https://ik.imagekit.io/catholicstories/ProfileImages/TeachingCatholicKids_j2Zik9ZLc.png?updatedAt=1688597870744' : (A2($elm$core$String$contains, 'catholicfamilycrate', link) ? 'https://ik.imagekit.io/catholicstories/ProfileImages/7_i5fOMR9CEB.png?updatedAt=1685581542221' : ''))))))))))));
};
var $author$project$Page$FeastDayActivities$FeastDayHelpers$activityTitleFromLink = F2(
	function (saintName, link) {
		return A2($elm$core$String$contains, 'catholicsaints.info', link) ? (saintName + ' Catholic Saints Info') : (A2($elm$core$String$contains, 'catholiccuisine', link) ? 'Catholic Cuisine' : (A2($elm$core$String$contains, 'catholic.org', link) ? 'Catholic Online' : (A2($elm$core$String$contains, 'teachingcatholickids', link) ? 'Teaching Catholic Kids' : (A2($elm$core$String$contains, 'youtube.com/watch', link) ? 'Video' : (A2($elm$core$String$contains, 'swpals', link) ? 'Video' : (A2($elm$core$String$contains, 'youtube.com/playlist', link) ? 'Video Playlist' : (A2($elm$core$String$contains, 'franciscanmedia', link) ? ('Story of ' + saintName) : (A2($elm$core$String$contains, 'christianiconography', link) ? (saintName + ' Iconography') : (A2($elm$core$String$contains, 'ucatholic', link) ? 'uCatholic' : (A2($elm$core$String$contains, 'embed.podcasts.apple', link) ? 'Podcast' : ''))))))))));
	});
var $author$project$Page$FeastDayActivities$FeastDayHelpers$activityTypeFromLink = function (link) {
	return A2($elm$core$String$contains, 'catholicsaints.info', link) ? $author$project$Page$FeastDayActivities$FeastDayHelpers$More : (A2($elm$core$String$contains, 'catholiccuisine', link) ? $author$project$Page$FeastDayActivities$FeastDayHelpers$Food : (A2($elm$core$String$contains, 'catholic.org', link) ? $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading : (A2($elm$core$String$contains, 'teachingcatholickids', link) ? $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading : (A2($elm$core$String$contains, 'youtube', link) ? $author$project$Page$FeastDayActivities$FeastDayHelpers$Video : (A2($elm$core$String$contains, 'swpals', link) ? $author$project$Page$FeastDayActivities$FeastDayHelpers$Video : (A2($elm$core$String$contains, 'franciscanmedia', link) ? $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio : ((A2($elm$core$String$contains, 'saintsalivepodcast', link) || A2($elm$core$String$contains, 'podcasts', link)) ? $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio : (A2($elm$core$String$contains, 'christianiconography', link) ? $author$project$Page$FeastDayActivities$FeastDayHelpers$Images : (A2($elm$core$String$contains, 'ucatholic', link) ? $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading : (A2($elm$core$String$contains, 'thecatholickid', link) ? $author$project$Page$FeastDayActivities$FeastDayHelpers$Printout : (A2($elm$core$String$contains, 'catholicfamilycrate', link) ? $author$project$Page$FeastDayActivities$FeastDayHelpers$Printout : $author$project$Page$FeastDayActivities$FeastDayHelpers$More)))))))))));
};
var $author$project$Page$FeastDayActivities$FeastDayHelpers$activityFromLink = F2(
	function (saintName, link) {
		var activityType = $author$project$Page$FeastDayActivities$FeastDayHelpers$activityTypeFromLink(link);
		var activityTitle = A2($author$project$Page$FeastDayActivities$FeastDayHelpers$activityTitleFromLink, saintName, link);
		var activityImage = $author$project$Page$FeastDayActivities$FeastDayHelpers$activityImageFromLink(link);
		var activityDescription = A2($author$project$Page$FeastDayActivities$FeastDayHelpers$activityDescriptionFromLink, saintName, link);
		return $elm$core$String$isEmpty(link) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
			{activityType: activityType, image: activityImage, link: link, snippet: activityDescription, title: activityTitle});
	});
var $author$project$Page$Saints$SaintHelpers$activitiesFromSaint = function (saint) {
	return A2(
		$elm$core$List$filterMap,
		function (_v0) {
			var saintName = _v0.a;
			var link = _v0.b;
			return A2(
				$elm$core$Maybe$map,
				function (l) {
					return _Utils_Tuple2(saintName, l);
				},
				link);
		},
		$elm$core$List$concat(
			_List_fromArray(
				[
					(saint.catholicSaintsInfoYoutubePlaylist === '') ? _List_fromArray(
					[
						_Utils_Tuple2(
						saint.name,
						A2($author$project$Page$FeastDayActivities$FeastDayHelpers$activityFromLink, saint.name, saint.catholicOrgVideoLink))
					]) : _List_Nil,
					_List_fromArray(
					[
						_Utils_Tuple2(
						saint.name,
						A2($author$project$Page$FeastDayActivities$FeastDayHelpers$activityFromLink, saint.name, saint.catholicSaintsInfoYoutubePlaylist))
					]),
					_List_fromArray(
					[
						_Utils_Tuple2(
						saint.name,
						A2($author$project$Page$FeastDayActivities$FeastDayHelpers$activityFromLink, saint.name, saint.catholicCuisine))
					]),
					_List_fromArray(
					[
						_Utils_Tuple2(
						saint.name,
						A2($author$project$Page$FeastDayActivities$FeastDayHelpers$activityFromLink, saint.name, saint.christianiconographyInfo))
					]),
					_List_fromArray(
					[
						_Utils_Tuple2(
						saint.name,
						A2($author$project$Page$FeastDayActivities$FeastDayHelpers$activityFromLink, saint.name, saint.catholicSprouts))
					]),
					_List_fromArray(
					[
						_Utils_Tuple2(
						saint.name,
						A2($author$project$Page$FeastDayActivities$FeastDayHelpers$activityFromLink, saint.name, saint.franciscanMediaLink))
					]),
					_List_fromArray(
					[
						_Utils_Tuple2(
						saint.name,
						A2($author$project$Page$FeastDayActivities$FeastDayHelpers$activityFromLink, saint.name, saint.teachingCatholicKidsLink))
					]),
					_List_fromArray(
					[
						_Utils_Tuple2(
						saint.name,
						A2($author$project$Page$FeastDayActivities$FeastDayHelpers$activityFromLink, saint.name, saint.catholicOrgLink))
					]),
					_List_fromArray(
					[
						_Utils_Tuple2(
						saint.name,
						A2($author$project$Page$FeastDayActivities$FeastDayHelpers$activityFromLink, saint.name, saint.catholicSaintsLink))
					]),
					_List_fromArray(
					[
						_Utils_Tuple2(
						saint.name,
						A2($author$project$Page$FeastDayActivities$FeastDayHelpers$activityFromLink, saint.name, saint.uCatholicLink))
					]),
					A2(
					$elm$core$List$map,
					function (link) {
						return _Utils_Tuple2(
							saint.name,
							A2($author$project$Page$FeastDayActivities$FeastDayHelpers$activityFromLink, saint.name, link));
					},
					A2($elm$core$String$split, ';', saint.coloringPageLink)),
					A2(
					$elm$core$List$map,
					function (link) {
						return _Utils_Tuple2(
							saint.name,
							A2($author$project$Page$FeastDayActivities$FeastDayHelpers$activityFromLink, saint.name, link));
					},
					A2($elm$core$String$split, ';', saint.saintsAliveLink)),
					A2(
					$elm$core$List$map,
					function (link) {
						return _Utils_Tuple2(
							saint.name,
							A2($author$project$Page$FeastDayActivities$FeastDayHelpers$activityFromLink, saint.name, link));
					},
					A2($elm$core$String$split, ';', saint.videoLinks))
				])));
};
var $elm$regex$Regex$Match = F4(
	function (match, index, number, submatches) {
		return {index: index, match: match, number: number, submatches: submatches};
	});
var $elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
var $elm$regex$Regex$fromString = function (string) {
	return A2(
		$elm$regex$Regex$fromStringWith,
		{caseInsensitive: false, multiline: false},
		string);
};
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $elm$regex$Regex$replace = _Regex_replaceAtMost(_Regex_infinity);
var $elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			$elm$core$String$join,
			after,
			A2($elm$core$String$split, before, string));
	});
var $author$project$Page$FeastDayActivities$FeastDayHelpers$filterActivities = F2(
	function (isFilterType, activities) {
		return A2(
			$elm$core$List$concatMap,
			function (activity) {
				return isFilterType(activity.activityType) ? _List_fromArray(
					[activity]) : _List_Nil;
			},
			activities);
	});
var $author$project$Page$FeastDayActivities$FeastDayHelpers$audioActivities = function (activities) {
	return A2(
		$author$project$Page$FeastDayActivities$FeastDayHelpers$filterActivities,
		function (activityType) {
			return _Utils_eq(activityType, $author$project$Page$FeastDayActivities$FeastDayHelpers$Audio);
		},
		activities);
};
var $author$project$Page$FeastDayActivities$FeastDayHelpers$bookActivities = function (activities) {
	return A2(
		$author$project$Page$FeastDayActivities$FeastDayHelpers$filterActivities,
		function (activityType) {
			return _Utils_eq(activityType, $author$project$Page$FeastDayActivities$FeastDayHelpers$Book);
		},
		activities);
};
var $author$project$Page$FeastDayActivities$FeastDayHelpers$craftActivities = function (activities) {
	return A2(
		$author$project$Page$FeastDayActivities$FeastDayHelpers$filterActivities,
		function (activityType) {
			return _Utils_eq(activityType, $author$project$Page$FeastDayActivities$FeastDayHelpers$Crafts);
		},
		activities);
};
var $author$project$Page$FeastDayActivities$FeastDayHelpers$foodActivities = function (activities) {
	return A2(
		$author$project$Page$FeastDayActivities$FeastDayHelpers$filterActivities,
		function (activityType) {
			return _Utils_eq(activityType, $author$project$Page$FeastDayActivities$FeastDayHelpers$Food);
		},
		activities);
};
var $author$project$Page$FeastDayActivities$FeastDayHelpers$gameActivities = function (activities) {
	return A2(
		$author$project$Page$FeastDayActivities$FeastDayHelpers$filterActivities,
		function (activityType) {
			return _Utils_eq(activityType, $author$project$Page$FeastDayActivities$FeastDayHelpers$Game);
		},
		activities);
};
var $author$project$Page$FeastDayActivities$FeastDayHelpers$imageActivities = function (activities) {
	return A2(
		$author$project$Page$FeastDayActivities$FeastDayHelpers$filterActivities,
		function (activityType) {
			return _Utils_eq(activityType, $author$project$Page$FeastDayActivities$FeastDayHelpers$Images);
		},
		activities);
};
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $author$project$Page$FeastDayActivities$FeastDayHelpers$moreActivities = function (activities) {
	return A2(
		$author$project$Page$FeastDayActivities$FeastDayHelpers$filterActivities,
		function (activityType) {
			return _Utils_eq(activityType, $author$project$Page$FeastDayActivities$FeastDayHelpers$More);
		},
		activities);
};
var $author$project$Page$FeastDayActivities$FeastDayHelpers$printoutActivities = function (activities) {
	return A2(
		$author$project$Page$FeastDayActivities$FeastDayHelpers$filterActivities,
		function (activityType) {
			return _Utils_eq(activityType, $author$project$Page$FeastDayActivities$FeastDayHelpers$Printout);
		},
		activities);
};
var $elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var $elm$svg$Svg$circle = $elm$svg$Svg$trustedNode('circle');
var $elm$svg$Svg$Attributes$class = _VirtualDom_attribute('class');
var $elm$svg$Svg$Attributes$cx = _VirtualDom_attribute('cx');
var $elm$svg$Svg$Attributes$cy = _VirtualDom_attribute('cy');
var $elm$svg$Svg$Attributes$d = _VirtualDom_attribute('d');
var $elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var $elm$svg$Svg$path = $elm$svg$Svg$trustedNode('path');
var $elm$svg$Svg$Attributes$r = _VirtualDom_attribute('r');
var $elm$svg$Svg$Attributes$stroke = _VirtualDom_attribute('stroke');
var $elm$svg$Svg$Attributes$strokeWidth = _VirtualDom_attribute('stroke-width');
var $elm$svg$Svg$svg = $elm$svg$Svg$trustedNode('svg');
var $elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var $author$project$Component$Spinner$purpleSpinner = function (attributes) {
	return A2(
		$elm$svg$Svg$svg,
		_Utils_ap(
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$class('animate-spin -ml-1 mr-3 h-full w-full inline-block'),
					$elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
					$elm$svg$Svg$Attributes$fill('none')
				]),
			attributes),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$circle,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$class('opacity-25'),
						$elm$svg$Svg$Attributes$cx('12'),
						$elm$svg$Svg$Attributes$cy('12'),
						$elm$svg$Svg$Attributes$r('10'),
						$elm$svg$Svg$Attributes$stroke('currentColor'),
						$elm$svg$Svg$Attributes$strokeWidth('4')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$class('opacity-75'),
						$elm$svg$Svg$Attributes$fill('currentColor'),
						$elm$svg$Svg$Attributes$d('M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z')
					]),
				_List_Nil)
			]));
};
var $author$project$Page$FeastDayActivities$FeastDayHelpers$readingActivities = function (activities) {
	return A2(
		$author$project$Page$FeastDayActivities$FeastDayHelpers$filterActivities,
		function (activityType) {
			return _Utils_eq(activityType, $author$project$Page$FeastDayActivities$FeastDayHelpers$OnlineReading);
		},
		activities);
};
var $author$project$Page$FeastDayActivities$FeastDayHelpers$videoActivities = function (activities) {
	return A2(
		$author$project$Page$FeastDayActivities$FeastDayHelpers$filterActivities,
		function (activityType) {
			return _Utils_eq(activityType, $author$project$Page$FeastDayActivities$FeastDayHelpers$Video);
		},
		activities);
};
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $author$project$Page$FeastDayActivities$FeastDayHelpers$images = $elm$core$Dict$fromList(
	_List_fromArray(
		[
			_Utils_Tuple2('FranciscanMedia', 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960'),
			_Utils_Tuple2('LoyolaPress', 'https://lpress-craft.loyolapress.com/images/ocf-articles/Microsites/SaintsStories_100x100.jpeg'),
			_Utils_Tuple2('SaintsFeastFamily', 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg'),
			_Utils_Tuple2('CatholicIcing', 'https://ik.imagekit.io/catholicstories/ProfileImages/41_XrkKmwtXL.png?updatedAt=1682876930378')
		]));
var $author$project$Page$FeastDayActivities$FeastDayHelpers$imageSrc = function (activity) {
	return A2(
		$elm$core$Maybe$withDefault,
		activity.image,
		A2($elm$core$Dict$get, activity.image, $author$project$Page$FeastDayActivities$FeastDayHelpers$images));
};
var $author$project$Page$FeastDayActivities$FeastDayHelpers$viewActivity = function (activity) {
	return A2(
		$elm$html$Html$a,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('grid grid-cols-[100px_1fr]'),
				$elm$html$Html$Attributes$href(activity.link),
				A2($elm$html$Html$Attributes$attribute, 'aria-label', activity.title),
				$elm$html$Html$Attributes$target('_blank'),
				$elm$html$Html$Attributes$class('hover:bg-csc-lightpurple'),
				$elm$html$Html$Attributes$class('rounded my-5')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$img,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$src(
						$author$project$Page$FeastDayActivities$FeastDayHelpers$imageSrc(activity)),
						$elm$html$Html$Attributes$class('w-20 h-20'),
						$elm$html$Html$Attributes$class('rounded'),
						$elm$html$Html$Attributes$class('object-cover')
					]),
				_List_Nil),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('grid grid-rows')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$h4,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-xl text-left')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(activity.title)
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-left')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(activity.snippet)
							]))
					]))
			]));
};
var $author$project$Page$FeastDayActivities$FeastDayHelpers$viewActivities = F2(
	function (title, activities) {
		return $elm$core$List$isEmpty(activities) ? A2($elm$html$Html$span, _List_Nil, _List_Nil) : A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mt-20')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$h3,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('font-semibold my-5')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(title)
						])),
					A2(
					$elm$html$Html$div,
					_List_Nil,
					A2($elm$core$List$map, $author$project$Page$FeastDayActivities$FeastDayHelpers$viewActivity, activities))
				]));
	});
var $author$project$Page$FeastDayActivities$FeastDayHelpers$viewEmbeddedAudio = function (activity) {
	var link = activity.link;
	return $elm$core$String$isEmpty(link) ? A2($elm$html$Html$span, _List_Nil, _List_Nil) : A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('my-5')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$iframe,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$src(link),
						A2($elm$html$Html$Attributes$attribute, 'allow', 'autoplay *; encrypted-media *; fullscreen *; clipboard-write'),
						A2($elm$html$Html$Attributes$attribute, 'frameborder', '0'),
						$elm$html$Html$Attributes$height(180),
						A2($elm$html$Html$Attributes$style, 'width', '100%;max-width:660px;overflow:hidden;border-radius:10px;'),
						A2($elm$html$Html$Attributes$attribute, 'sandbox', 'allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation')
					]),
				_List_Nil)
			]));
};
var $author$project$Page$FeastDayActivities$FeastDayHelpers$viewAudio = function (audio) {
	return A2($elm$core$String$contains, 'embed', audio.link) ? $author$project$Page$FeastDayActivities$FeastDayHelpers$viewEmbeddedAudio(audio) : $author$project$Page$FeastDayActivities$FeastDayHelpers$viewActivity(audio);
};
var $author$project$Page$FeastDayActivities$FeastDayHelpers$viewAudioList = function (audioList) {
	return $elm$core$List$isEmpty(audioList) ? A2($elm$html$Html$span, _List_Nil, _List_Nil) : A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('mt-20')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h3,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('font-semibold my-5')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Podcasts to Hear')
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('max-w-3xl m-auto')
					]),
				A2($elm$core$List$map, $author$project$Page$FeastDayActivities$FeastDayHelpers$viewAudio, audioList))
			]));
};
var $author$project$Page$FeastDayActivities$FeastDayHelpers$viewNoActivities = A2(
	$elm$html$Html$div,
	_List_Nil,
	_List_fromArray(
		[
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('No activities found for today\'s feast day. We are still working on adding activities.')
				])),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Thank you for your patience.')
				]))
		]));
var $author$project$Page$FeastDayActivities$FeastDayHelpers$viewPrintout = function (activity) {
	return A2(
		$elm$html$Html$a,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$href(activity.link)
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$img,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$src(activity.link),
						$elm$html$Html$Attributes$class('max-w-xl w-full my-5')
					]),
				_List_Nil)
			]));
};
var $author$project$Page$FeastDayActivities$FeastDayHelpers$viewPrintouts = F2(
	function (title, activities) {
		return $elm$core$List$isEmpty(activities) ? A2($elm$html$Html$span, _List_Nil, _List_Nil) : A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mt-20')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$h3,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('font-semibold my-5')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(title)
						])),
					A2(
					$elm$html$Html$div,
					_List_Nil,
					A2(
						$elm$core$List$map,
						function (activity) {
							return $author$project$Page$FeastDayActivities$FeastDayHelpers$viewPrintout(activity);
						},
						activities))
				]));
	});
var $author$project$Page$FeastDayActivities$FeastDayHelpers$viewEmbeddedVideo = function (video) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'position', 'relative'),
				A2($elm$html$Html$Attributes$style, 'padding-bottom', '56.25%'),
				$elm$html$Html$Attributes$height(0),
				A2($elm$html$Html$Attributes$style, 'overflow', 'hidden'),
				A2($elm$html$Html$Attributes$style, 'max-width', '100%'),
				A2($elm$html$Html$Attributes$style, 'border-radius', '5px'),
				$elm$html$Html$Attributes$class('my-5')
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
						$elm$html$Html$Attributes$src(video.link),
						$elm$html$Html$Attributes$title(video.title),
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
};
var $author$project$Page$FeastDayActivities$FeastDayHelpers$viewVideo = function (video) {
	return A2($elm$core$String$contains, 'embed', video.link) ? $author$project$Page$FeastDayActivities$FeastDayHelpers$viewEmbeddedVideo(video) : $author$project$Page$FeastDayActivities$FeastDayHelpers$viewActivity(video);
};
var $author$project$Page$FeastDayActivities$FeastDayHelpers$viewVideos = function (videos) {
	return $elm$core$List$isEmpty(videos) ? A2($elm$html$Html$span, _List_Nil, _List_Nil) : A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('mt-20')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h3,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('font-semibold my-5')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Videos to Watch')
					])),
				A2(
				$elm$html$Html$div,
				_List_Nil,
				A2(
					$elm$core$List$map,
					function (video) {
						return A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('mb-10')
								]),
							_List_fromArray(
								[
									$author$project$Page$FeastDayActivities$FeastDayHelpers$viewVideo(video)
								]));
					},
					videos))
			]));
};
var $author$project$Page$FeastDayActivities$FeastDayHelpers$viewAllActivities = F2(
	function (isLoading, activities) {
		return isLoading ? A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-center mt-4')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mb-4')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('We are getting the activity list, hang tight.')
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('m-auto w-10 text-[#9200B3]')
						]),
					_List_fromArray(
						[
							$author$project$Component$Spinner$purpleSpinner(_List_Nil)
						]))
				])) : ($elm$core$List$isEmpty(activities) ? A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mt-4')
				]),
			_List_fromArray(
				[$author$project$Page$FeastDayActivities$FeastDayHelpers$viewNoActivities])) : A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-left max-w-3xl m-auto')
				]),
			_List_fromArray(
				[
					$author$project$Page$FeastDayActivities$FeastDayHelpers$viewVideos(
					$author$project$Page$FeastDayActivities$FeastDayHelpers$videoActivities(activities)),
					$author$project$Page$FeastDayActivities$FeastDayHelpers$viewAudioList(
					$author$project$Page$FeastDayActivities$FeastDayHelpers$audioActivities(activities)),
					A2(
					$author$project$Page$FeastDayActivities$FeastDayHelpers$viewActivities,
					'Crafts to Do',
					$author$project$Page$FeastDayActivities$FeastDayHelpers$craftActivities(activities)),
					A2(
					$author$project$Page$FeastDayActivities$FeastDayHelpers$viewPrintouts,
					'Printouts to Enjoy',
					$author$project$Page$FeastDayActivities$FeastDayHelpers$printoutActivities(activities)),
					A2(
					$author$project$Page$FeastDayActivities$FeastDayHelpers$viewActivities,
					'Games to Play',
					$author$project$Page$FeastDayActivities$FeastDayHelpers$gameActivities(activities)),
					A2(
					$author$project$Page$FeastDayActivities$FeastDayHelpers$viewActivities,
					'Images to See',
					$author$project$Page$FeastDayActivities$FeastDayHelpers$imageActivities(activities)),
					A2(
					$author$project$Page$FeastDayActivities$FeastDayHelpers$viewActivities,
					'Material to Read',
					$author$project$Page$FeastDayActivities$FeastDayHelpers$readingActivities(activities)),
					A2(
					$author$project$Page$FeastDayActivities$FeastDayHelpers$viewActivities,
					'Food to Eat',
					$author$project$Page$FeastDayActivities$FeastDayHelpers$foodActivities(activities)),
					A2(
					$author$project$Page$FeastDayActivities$FeastDayHelpers$viewActivities,
					'Books to Read',
					$author$project$Page$FeastDayActivities$FeastDayHelpers$bookActivities(activities)),
					A2(
					$author$project$Page$FeastDayActivities$FeastDayHelpers$viewActivities,
					'More',
					$author$project$Page$FeastDayActivities$FeastDayHelpers$moreActivities(activities))
				])));
	});
var $author$project$Page$FeastDayActivities$Main$viewFeastActivities = F2(
	function (model, feastActivitiesList) {
		var removeParens = function () {
			var _v4 = $elm$regex$Regex$fromString(' \\(.*\\)');
			if (_v4.$ === 'Nothing') {
				return $elm$core$Basics$identity;
			} else {
				var regex = _v4.a;
				return A2(
					$elm$regex$Regex$replace,
					regex,
					function (_v5) {
						return '';
					});
			}
		}();
		var feastNames = A2(
			$elm$core$List$map,
			function ($) {
				return $.feast;
			},
			feastActivitiesList);
		var feastActivities = A2(
			$elm$core$List$concatMap,
			function ($) {
				return $.activities;
			},
			feastActivitiesList);
		var cleanedFeastNames = A2(
			$elm$core$List$concatMap,
			function (name) {
				return A2(
					$elm$core$List$map,
					removeParens,
					A2(
						$elm$core$List$map,
						$elm$core$String$toLower,
						A2($elm$core$String$split, ' and ', name)));
			},
			feastNames);
		var addUniqueActivity = F2(
			function (_v3, uniqueRecords) {
				var saintName = _v3.a;
				var record = _v3.b;
				return A2(
					$elm$core$List$any,
					function (_v1) {
						var r = _v1.b;
						return _Utils_eq(r.link, record.link);
					},
					uniqueRecords) ? A2(
					$elm$core$List$map,
					function (_v2) {
						var s = _v2.a;
						var r = _v2.b;
						return _Utils_eq(r.link, record.link) ? _Utils_Tuple2(
							s,
							{
								activityType: r.activityType,
								image: r.image,
								link: r.link,
								snippet: A3($elm$core$String$replace, s, s + (' and ' + saintName), r.snippet),
								title: A3($elm$core$String$replace, s, s + (' and ' + saintName), r.title)
							}) : _Utils_Tuple2(s, r);
					},
					uniqueRecords) : A2(
					$elm$core$List$cons,
					_Utils_Tuple2(saintName, record),
					uniqueRecords);
			});
		var removeDuplicates = function (records) {
			return A3($elm$core$List$foldl, addUniqueActivity, _List_Nil, records);
		};
		var saintActivities = A2(
			$elm$core$List$map,
			function (_v0) {
				var activity = _v0.b;
				return activity;
			},
			removeDuplicates(
				A2(
					$elm$core$List$concatMap,
					$author$project$Page$Saints$SaintHelpers$activitiesFromSaint,
					A2(
						$elm$core$List$filter,
						function (saint) {
							return A2(
								$elm$core$List$member,
								$elm$core$String$toLower(saint.name),
								cleanedFeastNames);
						},
						model.saintList.saints))));
		var activities = A2($elm$core$List$append, feastActivities, saintActivities);
		return A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2($author$project$Page$FeastDayActivities$FeastDayHelpers$viewAllActivities, model.saintList.isLoading, activities)
				]));
	});
var $elm$html$Html$Attributes$rel = _VirtualDom_attribute('rel');
var $author$project$Page$FeastDayActivities$Main$viewStayConnected = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('bg-gradient-to-r from-purple-600 to-indigo-600 py-16 px-6 text-center text-white')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h2,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-3xl md:text-4xl font-bold mb-2')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Stay Connected')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mb-6 text-lg max-w-3xl mx-auto')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Get notified about new stories, activities, and special content for your family.')
				])),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('max-w-3xl mx-auto')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$iframe,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$src('https://blog.claritasstudios.com/embed'),
							$elm$html$Html$Attributes$title('Substack Signup'),
							A2($elm$html$Html$Attributes$attribute, 'loading', 'lazy'),
							A2($elm$html$Html$Attributes$attribute, 'referrerpolicy', 'no-referrer-when-downgrade'),
							A2($elm$html$Html$Attributes$attribute, 'sandbox', 'allow-forms allow-scripts allow-popups allow-top-navigation-by-user-activation allow-same-origin'),
							$elm$html$Html$Attributes$class('rounded bg-transparent'),
							A2($elm$html$Html$Attributes$style, 'width', '100%'),
							A2($elm$html$Html$Attributes$style, 'height', '220px')
						]),
					_List_Nil),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mt-3')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$a,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$href('https://blog.claritasstudios.com/embed'),
									$elm$html$Html$Attributes$target('_blank'),
									$elm$html$Html$Attributes$rel('noopener noreferrer'),
									$elm$html$Html$Attributes$class('underline'),
									A2($elm$html$Html$Attributes$attribute, 'aria-label', 'Subscribe on Substack')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Subscribe on Substack')
								]))
						]))
				]))
		]));
var $author$project$Page$FeastDayActivities$Main$viewWeekdayActivities = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('text-left py-5')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h3,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('font-semibold')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Common Daily Prayers')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mt-4')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('It is good to be able to center yourself on God throughout the years, months, and days. We have suggestions here to help order the hours of the day toward God. They are based on the Liturgy of the Hours. The suggestions here can be modified for you and your family. Especially with young kids that need to sleep in or go to bed early.')
				])),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mt-4 grid grid-cols-[50px,_1fr]')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('6am')
						])),
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$a,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$href('/prayer/angelus'),
									$elm$html$Html$Attributes$class('underline'),
									$elm$html$Html$Attributes$target('_blank')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Angelus')
								])),
							A2(
							$elm$html$Html$span,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('. ')
								])),
							A2(
							$elm$html$Html$a,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$href('https://www.usccb.org/prayers/morning-offering'),
									$elm$html$Html$Attributes$class('underline'),
									$elm$html$Html$Attributes$target('_blank')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Morning Offering')
								])),
							A2(
							$elm$html$Html$span,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('. ')
								])),
							A2(
							$elm$html$Html$a,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$href('/animations/prayertimewithangels/1/guardianangelprayer'),
									$elm$html$Html$Attributes$class('underline'),
									$elm$html$Html$Attributes$target('_blank')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Guardian Angel Prayer')
								])),
							A2(
							$elm$html$Html$span,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('. ')
								])),
							A2(
							$elm$html$Html$a,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$href('https://visitationproject.org/pages/the-three-hail-marys'),
									$elm$html$Html$Attributes$class('underline'),
									$elm$html$Html$Attributes$target('_blank')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Three Hail Marys devotion')
								])),
							A2(
							$elm$html$Html$span,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('. ')
								]))
						])),
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('12pm')
						])),
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$a,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$href('/prayer/angelus'),
									$elm$html$Html$Attributes$class('underline'),
									$elm$html$Html$Attributes$target('_blank')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Angelus')
								])),
							A2(
							$elm$html$Html$span,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('. ')
								]))
						])),
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('3pm')
						])),
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$a,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$href('https://www.thedivinemercy.org/message/devotions/pray-the-chaplet'),
									$elm$html$Html$Attributes$class('underline'),
									$elm$html$Html$Attributes$target('_blank')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Divine Mercy Chaplet')
								])),
							A2(
							$elm$html$Html$span,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('. ')
								]))
						])),
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('6pm')
						])),
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$a,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$href('/prayer/angelus'),
									$elm$html$Html$Attributes$class('underline'),
									$elm$html$Html$Attributes$target('_blank')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Angelus')
								])),
							A2(
							$elm$html$Html$span,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('. ')
								]))
						])),
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('9pm')
						])),
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$a,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$href('https://www.thecatholickid.com/how-to-pray-the-rosary-for-kids/'),
									$elm$html$Html$Attributes$class('underline'),
									$elm$html$Html$Attributes$target('_blank')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Rosary')
								])),
							A2(
							$elm$html$Html$span,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('. ')
								])),
							A2(
							$elm$html$Html$a,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$href('https://www.ignatianspirituality.com/ignatian-prayer/the-examen/'),
									$elm$html$Html$Attributes$class('underline'),
									$elm$html$Html$Attributes$target('_blank')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Evening Examen')
								])),
							A2(
							$elm$html$Html$span,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('. ')
								])),
							A2(
							$elm$html$Html$a,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$href('https://visitationproject.org/pages/the-three-hail-marys'),
									$elm$html$Html$Attributes$class('underline'),
									$elm$html$Html$Attributes$target('_blank')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Three Hail Marys devotion')
								])),
							A2(
							$elm$html$Html$span,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('. ')
								]))
						]))
				]))
		]));
var $author$project$Page$FeastDayActivities$Main$viewDate = F4(
	function (model, month, date, feasts) {
		var concatFeasts = A2(
			$elm$core$String$join,
			' and ',
			A2(
				$elm$core$List$map,
				function ($) {
					return $.feast;
				},
				feasts));
		var capMonth = $author$project$Page$FeastDayActivities$Main$capitalizeFirst(month);
		var _v0 = A3($author$project$Page$FeastDayActivities$FeastDayHelpers$previousDate, '2025', month, date);
		var prevMonth = _v0.a;
		var prevDay = _v0.b;
		var prevDateLink = A2($author$project$Page$FeastDayActivities$Main$createFeastDayLink, prevMonth, prevDay);
		var _v1 = A3($author$project$Page$FeastDayActivities$FeastDayHelpers$nextDate, '2025', month, date);
		var nextMonth = _v1.a;
		var nextDay = _v1.b;
		var nextDateLink = A2($author$project$Page$FeastDayActivities$Main$createFeastDayLink, nextMonth, nextDay);
		return A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('max-w-5xl mx-auto px-4 mt-6')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('grid grid-cols-3 gap-6 items-center')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$a,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$href(prevDateLink),
											A2($elm$html$Html$Attributes$attribute, 'aria-label', 'Previous'),
											$elm$html$Html$Attributes$class('rounded-lg bg-gray-800/60 hover:bg-gray-800 p-4 md:p-6 shadow-md flex flex-col items-center justify-center gap-1 md:gap-4 text-center')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$img,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('hidden md:block h-10'),
													$elm$html$Html$Attributes$src('https://ik.imagekit.io/catholicstories/Resources_Icons/leftarrow_emvaRz9A6.png?updatedAt=1693003148637')
												]),
											_List_Nil),
											A2(
											$elm$html$Html$div,
											_List_Nil,
											_List_fromArray(
												[
													A2(
													$elm$html$Html$div,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('text-sm md:text-base font-semibold text-white leading-tight')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text('Previous Day')
														])),
													A2(
													$elm$html$Html$div,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('text-xs md:text-sm text-gray-400 mt-0')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text(
															$author$project$Page$FeastDayActivities$Main$capitalizeFirst(prevMonth) + (' ' + prevDay))
														]))
												]))
										])),
									A2(
									$elm$html$Html$a,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$href($author$project$Page$FeastDayActivities$Main$urlPath + ('?m=' + month)),
											A2($elm$html$Html$Attributes$attribute, 'aria-label', 'Back to ' + capMonth),
											$elm$html$Html$Attributes$class('rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 p-4 md:p-6 shadow-lg inline-flex flex-col items-center justify-center text-center')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$img,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('hidden md:inline-block h-8 mb-2'),
													$elm$html$Html$Attributes$src('https://ik.imagekit.io/catholicstories/Resources_Icons/calendar1_-zIHisgP2.png?updatedAt=1685581675420')
												]),
											_List_Nil),
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('text-white font-semibold text-sm md:text-lg leading-tight')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('Back to ' + capMonth)
												]))
										])),
									A2(
									$elm$html$Html$a,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$href(nextDateLink),
											A2($elm$html$Html$Attributes$attribute, 'aria-label', 'Next'),
											$elm$html$Html$Attributes$class('rounded-lg bg-gray-800/60 hover:bg-gray-800 p-4 md:p-6 shadow-md flex flex-col items-center justify-center gap-1 md:gap-4 text-center')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$img,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('hidden md:block h-10'),
													$elm$html$Html$Attributes$src('https://ik.imagekit.io/catholicstories/Resources_Icons/rightarrow_rccpkUlIk.png?updatedAt=1693003148251')
												]),
											_List_Nil),
											A2(
											$elm$html$Html$div,
											_List_Nil,
											_List_fromArray(
												[
													A2(
													$elm$html$Html$div,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('text-sm md:text-base font-semibold text-white leading-tight')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text('Next Day')
														])),
													A2(
													$elm$html$Html$div,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('text-xs md:text-sm text-gray-400 mt-0')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text(
															$author$project$Page$FeastDayActivities$Main$capitalizeFirst(nextMonth) + (' ' + nextDay))
														]))
												]))
										]))
								]))
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$id('calendar-content'),
							$elm$html$Html$Attributes$class('mt-8 max-w-5xl mx-auto rounded-2xl bg-gray-900 text-white p-10 shadow-lg')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$h1,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-5xl md:text-6xl font-extrabold mb-4')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Feast Day Activities')
								])),
							A2(
							$elm$html$Html$h3,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-2xl text-gray-300 mb-4')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									'Feast of ' + ((concatFeasts === '') ? '' : concatFeasts))
								])),
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('inline-block bg-purple-900/70 text-white rounded-full px-4 py-2 text-sm mb-6')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(capMonth + (' ' + (date + ', 2025')))
								]))
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mt-10 mb-40')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('max-w-5xl mx-auto rounded-2xl text-white shadow-lg mb-10 overflow-hidden')
								]),
							_List_fromArray(
								[$author$project$Page$FeastDayActivities$Main$viewStayConnected])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('max-w-5xl mx-auto rounded-2xl bg-gray-900 text-white p-10 shadow-lg')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$h2,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('text-3xl font-extrabold mb-4')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Suggested Activities')
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('max-w-3xl mx-auto')
										]),
									_List_fromArray(
										[
											A2($author$project$Page$FeastDayActivities$Main$viewFeastActivities, model, feasts),
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('mt-10')
												]),
											_List_fromArray(
												[$author$project$Page$FeastDayActivities$Main$viewWeekdayActivities]))
										]))
								]))
						]))
				]));
	});
var $author$project$Page$FeastDayActivities$FeastDays$months = A2(
	$elm$core$List$map,
	function ($) {
		return $.key;
	},
	$author$project$Page$FeastDayActivities$FeastDays$feastDays);
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $author$project$Page$FeastDayActivities$FeastDayHelpers$splitList = function (list) {
	return _Utils_Tuple2(
		A2(
			$elm$core$List$take,
			($elm$core$List$length(list) / 2) | 0,
			list),
		A2(
			$elm$core$List$drop,
			($elm$core$List$length(list) / 2) | 0,
			list));
};
var $author$project$Page$FeastDayActivities$Main$viewFeast = function (feastActivities) {
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				$elm$html$Html$text(feastActivities.feast)
			]));
};
var $author$project$Page$FeastDayActivities$Main$viewFeastDay = F2(
	function (month, feastDay) {
		var link = A2($author$project$Page$FeastDayActivities$Main$createFeastDayLink, month, feastDay.date);
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('rounded-lg bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 hover:border-purple-300 cursor-pointer bg-white')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$a,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'color', 'black'),
							$elm$html$Html$Attributes$class('flex flex-col space-y-1.5 p-6 pb-2 pt-3 px-3'),
							$elm$html$Html$Attributes$href(link),
							A2($elm$html$Html$Attributes$attribute, 'aria-label', month + (' ' + feastDay.date))
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('flex items-start gap-2')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('inline-flex items-center rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-sm font-bold px-2 py-0.5 bg-purple-50 text-purple-700 border-purple-200 shrink-0')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(feastDay.date)
										]))
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('font-semibold tracking-tight text-sm leading-tight text-gray-800 hover:text-purple-700 transition-colors')
								]),
							A2($elm$core$List$map, $author$project$Page$FeastDayActivities$Main$viewFeast, feastDay.feasts))
						]))
				]));
	});
var $author$project$Page$FeastDayActivities$Main$viewFeastDays = F2(
	function (month, list) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('grid gap-3 grid-cols-1')
				]),
			A2(
				$elm$core$List$map,
				$author$project$Page$FeastDayActivities$Main$viewFeastDay(month),
				list));
	});
var $author$project$Page$FeastDayActivities$Main$viewFeastMonthHeader = F2(
	function (color, month) {
		return A2(
			$elm$html$Html$h2,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('grid col-span-2 content-center text-center'),
					$elm$html$Html$Attributes$class('uppercase text-5xl'),
					$elm$html$Html$Attributes$class('rounded'),
					A2($elm$html$Html$Attributes$style, 'font-family', 'hvdComicSerifPro'),
					A2($elm$html$Html$Attributes$style, 'height', '2.5em')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(month)
				]));
	});
var $author$project$Page$FeastDayActivities$Main$viewMonthPillBox = F2(
	function (currentMonth, month) {
		return A2(
			$elm$html$Html$a,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class(
					A2(
						$elm$core$String$contains,
						month,
						$elm$core$String$toLower(currentMonth)) ? 'bg-primary hover:bg-primary/90  bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md' : 'hover:bg-purple-50 text-gray-700'),
					$elm$html$Html$Attributes$class('h-10 px-4 py-2 rounded-xl font-semibold transition-all inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'),
					$elm$html$Html$Attributes$class('transition hover:scale-105'),
					$elm$html$Html$Attributes$class('capitalize'),
					A2($elm$html$Html$Attributes$attribute, 'aria-label', month),
					$elm$html$Html$Attributes$href($author$project$Page$FeastDayActivities$Main$urlPath + ('?m=' + month))
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(month)
				]));
	});
var $author$project$Page$FeastDayActivities$Main$viewMonth = F2(
	function (model, feastMonth) {
		var _v0 = $author$project$Page$FeastDayActivities$FeastDayHelpers$splitList(feastMonth.feasts);
		var firstHalf = _v0.a;
		var secondHalf = _v0.b;
		return A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mt-10 max-w-3xl mx-auto')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('px-11')
								]),
							_List_fromArray(
								[
									(feastMonth.month === 'December') ? A2(
									$elm$html$Html$h1,
									_List_Nil,
									_List_fromArray(
										[
											$elm$html$Html$text('2025 Feast Day Activities')
										])) : A2(
									$elm$html$Html$h1,
									_List_Nil,
									_List_fromArray(
										[
											$elm$html$Html$text('2025 Feast Day Activities')
										])),
									A2(
									$elm$html$Html$p,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('mt-5 mb-10')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Click on each day to see suggested feast day activitity ideas that you can use with your children to celebrate.')
										])),
									A2(
									$elm$html$Html$p,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('mt-5 mb-10')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('You can find videos, crafts, printables, games, reading, recipes and more! There are many ways you can find here to help your kids with liturgical living.')
										]))
								]))
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('max-w-5xl mx-auto')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('flex items-center justify-center gap-3 mb-8')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('flex gap-2 bg-white rounded-2xl p-2 shadow-lg border mb-6 items-center'),
											$elm$html$Html$Attributes$class('overflow-x-scroll')
										]),
									A2(
										$elm$core$List$map,
										$author$project$Page$FeastDayActivities$Main$viewMonthPillBox(feastMonth.month),
										$author$project$Page$FeastDayActivities$FeastDays$months))
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('relative left-1/2 -translate-x-1/2'),
									A2($elm$html$Html$Attributes$style, 'font-size', '20px'),
									$elm$html$Html$Attributes$class('mt-3 mb-12')
								]),
							_List_fromArray(
								[
									A2($author$project$Page$FeastDayActivities$Main$viewFeastMonthHeader, feastMonth.color, feastMonth.month),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('grid gap-3 grid-cols-2 mx-auto px-8')
										]),
									_List_fromArray(
										[
											A2($author$project$Page$FeastDayActivities$Main$viewFeastDays, feastMonth.key, firstHalf),
											A2($author$project$Page$FeastDayActivities$Main$viewFeastDays, feastMonth.key, secondHalf)
										]))
								]))
						]))
				]));
	});
var $author$project$Page$FeastDayActivities$Main$viewBody = F2(
	function (model, route) {
		var defaultMonth = $author$project$Page$FeastDayActivities$Main$monthFromTime(model.time);
		if (route.$ === 'Just') {
			var date = route.a.a;
			var _v1 = _Utils_Tuple2(date.month, date.date);
			if (_v1.a.$ === 'Just') {
				if (_v1.b.$ === 'Just') {
					var m = _v1.a.a;
					var d = _v1.b.a;
					return A4(
						$author$project$Page$FeastDayActivities$Main$viewDate,
						model,
						m,
						d,
						A2(
							$elm$core$Maybe$withDefault,
							_List_Nil,
							$elm$core$List$head(
								A2(
									$elm$core$List$map,
									function ($) {
										return $.feasts;
									},
									A2(
										$elm$core$List$filter,
										function (feastDay) {
											return _Utils_eq(
												$elm$core$String$toLower(feastDay.date),
												$elm$core$String$toLower(d));
										},
										A2(
											$elm$core$Maybe$withDefault,
											defaultMonth,
											$elm$core$List$head(
												A2(
													$elm$core$List$filter,
													function (feastDay) {
														return _Utils_eq(
															$elm$core$String$toLower(feastDay.key),
															$elm$core$String$toLower(m));
													},
													$author$project$Page$FeastDayActivities$FeastDays$feastDays))).feasts)))));
				} else {
					var m = _v1.a.a;
					var _v2 = _v1.b;
					return A2(
						$author$project$Page$FeastDayActivities$Main$viewMonth,
						model,
						A2(
							$elm$core$Maybe$withDefault,
							defaultMonth,
							$elm$core$List$head(
								A2(
									$elm$core$List$filter,
									function (feastDay) {
										return _Utils_eq(
											$elm$core$String$toLower(feastDay.key),
											$elm$core$String$toLower(m));
									},
									$author$project$Page$FeastDayActivities$FeastDays$feastDays))));
				}
			} else {
				return A2($author$project$Page$FeastDayActivities$Main$viewMonth, model, defaultMonth);
			}
		} else {
			return A2($author$project$Page$FeastDayActivities$Main$viewMonth, model, defaultMonth);
		}
	});
var $author$project$Page$FeastDayActivities$Main$view = function (model) {
	var currentRoute = $author$project$Page$FeastDayActivities$FeastDayHelpers$parseRoute(model.url);
	return {
		body: _List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('bg-black text-white'),
						$elm$html$Html$Attributes$id('body')
					]),
				_List_fromArray(
					[
						A2($author$project$Page$FeastDayActivities$Main$viewBody, model, currentRoute),
						$author$project$Component$Footer$viewFooter
					]))
			]),
		title: 'Feast Day Activities - Claritas Studios'
	};
};
var $author$project$Page$Give$View$donateAbout = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('text-xl mb-10')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'margin-bottom', '1em')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Here at Claritas Studios, we are passionate Catholic educators dedicated to helping children grow in their love for God and neighbor. Through creative, faith-based animations, we make Catholic teachings come alive in a fun and meaningful way for kids. Every child deserves the chance to learn and deepen their faith.')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'margin-bottom', '1em')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('With your support, we can keep these animations FREE for families everywhere. Every donation helps us nurture the faith of the next generation. Let\'s continue making a difference, together!')
				])),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Claritas Studios is a 501(c)(3) non-profit recognized by the IRS. Contributions to Claritas Studios are tax-deductible to the extent permitted by law. Tax ID Number: 85-4194883')
				]))
		]));
var $author$project$Page$Give$View$donateSection = F3(
	function (title, imageSrc, body) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'margin-bottom', '100px'),
					A2($elm$html$Html$Attributes$style, 'background-color', 'white'),
					A2($elm$html$Html$Attributes$style, 'color', 'black'),
					A2($elm$html$Html$Attributes$style, 'border-radius', '5px'),
					$elm$html$Html$Attributes$class('p-5 max-w-2xl shadow')
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
							(imageSrc === '') ? A2($elm$html$Html$span, _List_Nil, _List_Nil) : A2(
							$elm$html$Html$img,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('rounded max-w-[16rem] text-center'),
									$elm$html$Html$Attributes$src(imageSrc)
								]),
							_List_Nil)
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('pb-5 m-1')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$h3,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-center text-xl')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(title)
								]))
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
							A2($elm$html$Html$Attributes$style, 'left', '50%'),
							A2($elm$html$Html$Attributes$style, 'position', 'relative'),
							A2($elm$html$Html$Attributes$style, 'transform', 'translate(-50%)')
						]),
					_List_fromArray(
						[body]))
				]));
	});
var $author$project$Page$Give$View$donateWithVehicle = A3(
	$author$project$Page$Give$View$donateSection,
	'Donate Your Vehicle',
	'/assets/images/vehicles.png',
	A2(
		$elm$html$Html$a,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$href('http://www.cars2charities.org/donation?donateto=1585'),
				$elm$html$Html$Attributes$rel('noopener'),
				$elm$html$Html$Attributes$target('_blank'),
				A2($elm$html$Html$Attributes$style, 'text-decoration', 'none'),
				$elm$html$Html$Attributes$title('Donate your Vehicle'),
				A2($elm$html$Html$Attributes$style, 'padding', '10px 20px'),
				A2($elm$html$Html$Attributes$style, 'box-shadow', '#777 1px 1px 5px'),
				A2($elm$html$Html$Attributes$style, 'border-radius', '5px')
			]),
		_List_fromArray(
			[
				$elm$html$Html$text('Cars 2 Charities')
			])));
var $author$project$Page$Give$View$prayForUs = A3(
	$author$project$Page$Give$View$donateSection,
	'Pray for us',
	'',
	A2(
		$elm$html$Html$p,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
				A2($elm$html$Html$Attributes$style, 'width', '80%'),
				A2($elm$html$Html$Attributes$style, 'left', '50%'),
				A2($elm$html$Html$Attributes$style, 'position', 'relative'),
				A2($elm$html$Html$Attributes$style, 'transform', 'translate(-50%)')
			]),
		_List_fromArray(
			[
				$elm$html$Html$text('We believe in the power of prayer. Please pray for us in this work. We are praying for you. 🙏')
			])));
var $author$project$Component$Social$email = A2(
	$elm$html$Html$span,
	_List_Nil,
	_List_fromArray(
		[
			A2(
			$elm$html$Html$span,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'display', 'inline-block')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('trevor'),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('@')
						]))
				])),
			A2(
			$elm$html$Html$span,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$attribute, 'aria-hidden', 'true'),
					A2(
					$elm$html$Html$Attributes$property,
					'innerHTML',
					$elm$json$Json$Encode$string('🍯'))
				]),
			_List_Nil),
			A2(
			$elm$html$Html$span,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$attribute, 'aria-hidden', 'true'),
					A2(
					$elm$html$Html$Attributes$property,
					'innerHTML',
					$elm$json$Json$Encode$string('spam@catholicstoriesforchildren.com'))
				]),
			_List_Nil),
			A2(
			$elm$html$Html$span,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$height(0),
					$elm$html$Html$Attributes$width(0),
					A2($elm$html$Html$Attributes$style, 'display', 'none'),
					$elm$html$Html$Attributes$hidden(true)
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('spam@catholicstoriesforchildren.com')
				])),
			A2(
			$elm$html$Html$span,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('claritasstudios'),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('.'),
							A2(
							$elm$html$Html$span,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('com')
								]))
						]))
				]))
		]));
var $author$project$Page$Give$View$sponsor = A3(
	$author$project$Page$Give$View$donateSection,
	'Sponsorship',
	'',
	A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
				A2($elm$html$Html$Attributes$style, 'left', '50%'),
				A2($elm$html$Html$Attributes$style, 'position', 'relative'),
				A2($elm$html$Html$Attributes$style, 'transform', 'translate(-50%)')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$p,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(' Interested in becoming a sponsor? Please send us a message! ')
					])),
				$author$project$Component$Social$email
			])));
var $author$project$Page$Give$View$supportNextAnimation = A2(
	$elm$html$Html$div,
	_List_Nil,
	_List_fromArray(
		[
			A2(
			$elm$html$Html$img,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$src('/assets/images/AnimationImageLinks/SotsJoseph.png'),
					$elm$html$Html$Attributes$alt('Saint Joseph Image')
				]),
			_List_Nil),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'position', 'relative'),
					A2($elm$html$Html$Attributes$style, 'overflow', 'hidden'),
					A2($elm$html$Html$Attributes$style, 'width', '100%'),
					A2($elm$html$Html$Attributes$style, 'padding-top', '120px')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$a,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('dbox-donation-page-button m-auto'),
							$elm$html$Html$Attributes$href('https://www.kickstarter.com/projects/catholicstories/saint-joseph-animation'),
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
							$elm$html$Html$text('Support Our Next Animation')
						]))
				]))
		]));
var $author$project$Page$Give$View$volunteer = A3(
	$author$project$Page$Give$View$donateSection,
	'Volunteer',
	'',
	A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
				A2($elm$html$Html$Attributes$style, 'width', '80%'),
				A2($elm$html$Html$Attributes$style, 'left', '50%'),
				A2($elm$html$Html$Attributes$style, 'position', 'relative'),
				A2($elm$html$Html$Attributes$style, 'transform', 'translate(-50%)')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$p,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(' Interested in volunteering your talents or pro bono work? ')
					])),
				A2(
				$elm$html$Html$p,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(' We could use your help reviewing scripts, storyboards, and animatics. Please let us know! ')
					])),
				$author$project$Component$Social$email
			])));
var $author$project$Page$Give$View$wordsOfEncouragement = A3(
	$author$project$Page$Give$View$donateSection,
	'Words of Encouragement',
	'',
	A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
				A2($elm$html$Html$Attributes$style, 'width', '80%'),
				A2($elm$html$Html$Attributes$style, 'left', '50%'),
				A2($elm$html$Html$Attributes$style, 'position', 'relative'),
				A2($elm$html$Html$Attributes$style, 'transform', 'translate(-50%)')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$p,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('Sending words of encouragement are greatly appreciated. Let us build each other up in the faith. ')
					])),
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('mt-5')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(' "Encourage one another and build one another up." ')
					])),
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('mb-5')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('1 Th 5:11')
					])),
				$author$project$Component$Social$email
			])));
var $author$project$Page$Give$View$viewBody = A2(
	$elm$html$Html$div,
	_List_Nil,
	_List_fromArray(
		[
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('h-80 bg-[url(/assets/images/home/support-mission-bg.webp)] bg-cover bg-bottom')
				]),
			_List_Nil),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('max-w-7xl mb-20 px-20 m-auto')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$h1,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('my-10')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Donate')
						])),
					$author$project$Page$Give$View$donateAbout,
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mb-10')
						]),
					_List_fromArray(
						[$author$project$Page$Give$View$donateWithZeffy])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mb-10')
						]),
					_List_fromArray(
						[$author$project$Page$Give$View$supportNextAnimation])),
					A2(
					$elm$html$Html$h2,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('text-center mt-20 mb-10')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Other ways to give')
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('text-center grid justify-center')
						]),
					_List_fromArray(
						[$author$project$Page$Give$View$prayForUs, $author$project$Page$Give$View$donateWithVehicle, $author$project$Page$Give$View$sponsor, $author$project$Page$Give$View$volunteer, $author$project$Page$Give$View$wordsOfEncouragement]))
				]))
		]));
var $author$project$Page$Give$View$view = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('bg-black text-white')
		]),
	_List_fromArray(
		[$author$project$Page$Give$View$viewBody, $author$project$Component$Footer$viewFooter]));
var $author$project$Page$Team$Testimonials$ainsleyRawlingsTestimonial = {description: 'My kids love the guardian angel song and video! The song is beautiful and easy for my littles to remember and sing along with. ❤️ Thank you!', image: '/assets/images/imagekit/ainsleyrawlings_hyB-0rd23.jpeg', initials: 'AR', name: 'Ainsley Rawlings', position: 'Mother and Teacher', socials: _List_Nil};
var $author$project$Page$Team$Testimonials$camSmithTestimonial = {description: 'I love how there is a story, animation, and even music to learning the prayers. We know that children often, if not always, learn first through their experience and senses. The incorporation of such animation then will definitely help our children learn these prayers more easily! I will be showing these prayers to my infant child when he is older. 🙂', image: '/assets/images/imagekit/CamNguyen_ze-IRFU1d.jpeg', initials: 'CS', name: 'Cam Smith', position: 'Mother and Social Worker', socials: _List_Nil};
var $author$project$Page$Team$View$cfnLive = {image: '/assets/images/ProfilePictures/CFN.png', link: 'https://vimeo.com/963295296/89fc748d09?share=copy', name: 'CFN Live'};
var $author$project$Page$Team$View$christianChannel = {image: '/assets/images/ProfilePictures/ChristianChannel.png', link: 'https://youtu.be/p4yi5EFbPAI?si=L0jtHxwFyyS4jMjC', name: 'Christian Channel'};
var $author$project$Page$Team$View$inHisImage = {image: '/assets/images/ProfilePictures/InHisDesign.png', link: 'https://youtu.be/eqOmqdlNIDw?si=E9xTDcqQV_nFFQs-', name: 'In His Image Podcast'};
var $author$project$Page$Team$Testimonials$kellyBriggsTestimonial = {description: 'My three year old requests the Hail Mary animation often  it makes me so happy. I love it. Almost every time during our morning prayer time she asks.', image: $author$project$Page$Team$Team$imagePath + 'KellyBriggs.jpeg', initials: 'KB', name: 'Kelly Briggs', position: 'Social Media Specialist', socials: _List_Nil};
var $author$project$Page$Team$View$makeJoyNormal = {image: '/assets/images/ProfilePictures/MakeJoyNormal.png', link: 'https://podcasts.apple.com/ca/podcast/catholic-stories-for-children-an-interview-with/id1512837291?i=1000631285156', name: 'Make Joy Normal Podcast'};
var $author$project$Page$Team$Testimonials$meganReisterTestimonial = {description: 'How fabulous!!! So looking forward to sharing this far and wide!!!', image: 'https://spp.franciscan.edu/wp-content/uploads/sites/4/2019/02/Reister.jpg', initials: 'MR', name: 'Dr. Megan Reister', position: 'Associate Professor of Special Education and Early Childhood', socials: _List_Nil};
var $author$project$Page$Team$View$ocCatholic = {image: '/assets/images/ProfilePictures/OCCatholic.png', link: 'https://www.occatholic.com/catholic-stories-for-children-helping-the-next-generation-understand-the-faith/', name: 'Orange County Catholic'};
var $author$project$Page$Team$View$spiritFilledMedia = {image: '/assets/images/ProfilePictures/SpiritFilledMedia.png', link: 'https://www.buzzsprout.com/1467955/10425762-finding-your-way-catholic-stories-for-children-guest-trevor-rothaus ', name: 'Spirit Filled Media Podcast'};
var $author$project$Page$Team$Team$viewDescription = function (description) {
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
				$elm$html$Html$Attributes$class('xl:line-clamp-5')
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(description)
			]));
};
var $author$project$Page$Team$Team$viewName = function (name) {
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				$elm$html$Html$text(name)
			]));
};
var $author$project$Page$Team$Team$viewPosition = function (position) {
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
var $author$project$Component$Social$Behance = {$: 'Behance'};
var $author$project$Component$Social$Facebook = {$: 'Facebook'};
var $author$project$Component$Social$IMDB = {$: 'IMDB'};
var $author$project$Component$Social$Instagram = {$: 'Instagram'};
var $author$project$Component$Social$LinkedIn = {$: 'LinkedIn'};
var $author$project$Component$Social$Pinterest = {$: 'Pinterest'};
var $author$project$Component$Social$SoundCloud = {$: 'SoundCloud'};
var $author$project$Component$Social$Spotify = {$: 'Spotify'};
var $author$project$Component$Social$Twitter = {$: 'Twitter'};
var $author$project$Component$Social$Vimeo = {$: 'Vimeo'};
var $author$project$Component$Social$Website = {$: 'Website'};
var $author$project$Component$Social$YouTube = {$: 'YouTube'};
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
var $author$project$Page$Team$Team$socialOrdering = $matthewsj$elm_ordering$Ordering$explicit(
	_List_fromArray(
		[$author$project$Component$Social$Website, $author$project$Component$Social$Instagram, $author$project$Component$Social$Twitter, $author$project$Component$Social$Vimeo, $author$project$Component$Social$IMDB, $author$project$Component$Social$Facebook, $author$project$Component$Social$LinkedIn, $author$project$Component$Social$YouTube, $author$project$Component$Social$Pinterest, $author$project$Component$Social$Spotify, $author$project$Component$Social$SoundCloud, $author$project$Component$Social$Behance]));
var $author$project$Page$Team$Team$socialSort = F2(
	function (_v0, _v1) {
		var social1 = _v0.a;
		var link1 = _v0.b;
		var social2 = _v1.a;
		var link2 = _v1.b;
		return A2($author$project$Page$Team$Team$socialOrdering, social1, social2);
	});
var $elm$core$List$sortWith = _List_sortWith;
var $author$project$Component$Social$favicon = F2(
	function (alternativeText, link) {
		return A2(
			$elm$html$Html$img,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$attribute, 'aria-hidden', 'true'),
					$elm$html$Html$Attributes$src(link),
					A2($elm$html$Html$Attributes$style, 'width', '16px'),
					A2($elm$html$Html$Attributes$style, 'height', '16px'),
					$elm$html$Html$Attributes$alt(alternativeText)
				]),
			_List_Nil);
	});
var $author$project$Component$Social$behanceLogo = A2($author$project$Component$Social$favicon, 'behance', 'https://www.behance.net/favicon.ico');
var $author$project$Component$Social$facebookLogo = A2($author$project$Component$Social$favicon, 'facebook', 'https://www.facebook.com/favicon.ico');
var $author$project$Component$Social$imdbLogo = A2($author$project$Component$Social$favicon, 'imdb', 'https://www.imdb.com/favicon.ico');
var $author$project$Component$Social$instagramLogo = A2($author$project$Component$Social$favicon, 'instagram', 'https://www.instagram.com/favicon.ico');
var $author$project$Component$Social$linkedInLogo = A2($author$project$Component$Social$favicon, 'linkedin', 'https://www.linkedin.com/favicon.ico');
var $author$project$Component$Social$pinterestLogo = A2($author$project$Component$Social$favicon, 'pinterest', 'https://www.pinterest.com/favicon.ico');
var $author$project$Component$Social$soundcloudLogo = A2($author$project$Component$Social$favicon, 'soundcloud', 'https://soundcloud.com/favicon.ico');
var $author$project$Component$Social$spotifyLogo = A2($author$project$Component$Social$favicon, 'spotify', 'https://www.spotify.com/favicon.ico');
var $author$project$Component$Social$twitterLogo = A2($author$project$Component$Social$favicon, 'twitter', 'https://www.twitter.com/favicon.ico');
var $author$project$Component$Social$viewSocialLink = F3(
	function (image, link, label) {
		return A2(
			$elm$html$Html$a,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$href(link),
					A2($elm$html$Html$Attributes$style, 'text-decoration', 'none'),
					$elm$html$Html$Attributes$target('_blank'),
					A2($elm$html$Html$Attributes$attribute, 'aria-label', label),
					$elm$html$Html$Attributes$class('inline-block')
				]),
			_List_fromArray(
				[image]));
	});
var $author$project$Component$Social$vimeoLogo = A2($author$project$Component$Social$favicon, 'vimeo', 'https://vimeo.com/favicon.ico');
var $author$project$Component$Social$youtubeLogo = A2($author$project$Component$Social$favicon, 'youtube', 'https://www.youtube.com/favicon.ico');
var $author$project$Component$Social$viewSocial = function (_v0) {
	var social = _v0.a;
	var link = _v0.b;
	switch (social.$) {
		case 'Website':
			return A3(
				$author$project$Component$Social$viewSocialLink,
				$elm$html$Html$text('🌐'),
				link,
				'website');
		case 'Instagram':
			return A3($author$project$Component$Social$viewSocialLink, $author$project$Component$Social$instagramLogo, link, 'instagram');
		case 'Twitter':
			return A3($author$project$Component$Social$viewSocialLink, $author$project$Component$Social$twitterLogo, link, 'twitter');
		case 'Facebook':
			return A3($author$project$Component$Social$viewSocialLink, $author$project$Component$Social$facebookLogo, link, 'facebook');
		case 'LinkedIn':
			return A3($author$project$Component$Social$viewSocialLink, $author$project$Component$Social$linkedInLogo, link, 'linkedin');
		case 'Vimeo':
			return A3($author$project$Component$Social$viewSocialLink, $author$project$Component$Social$vimeoLogo, link, 'vimeo');
		case 'IMDB':
			return A3($author$project$Component$Social$viewSocialLink, $author$project$Component$Social$imdbLogo, link, 'imdb');
		case 'YouTube':
			return A3($author$project$Component$Social$viewSocialLink, $author$project$Component$Social$youtubeLogo, link, 'youtube');
		case 'Pinterest':
			return A3($author$project$Component$Social$viewSocialLink, $author$project$Component$Social$pinterestLogo, link, 'pinterest');
		case 'Spotify':
			return A3($author$project$Component$Social$viewSocialLink, $author$project$Component$Social$spotifyLogo, link, 'spotify');
		case 'SoundCloud':
			return A3($author$project$Component$Social$viewSocialLink, $author$project$Component$Social$soundcloudLogo, link, 'soundcloud');
		default:
			return A3($author$project$Component$Social$viewSocialLink, $author$project$Component$Social$behanceLogo, link, 'behance');
	}
};
var $author$project$Page$Team$Team$viewSocials = function (person) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'margin-top', '10px'),
				$elm$html$Html$Attributes$class('flex items-center')
			]),
		A2(
			$elm$core$List$map,
			$author$project$Component$Social$viewSocial,
			A2($elm$core$List$sortWith, $author$project$Page$Team$Team$socialSort, person.socials)));
};
var $author$project$Page$Team$Team$viewPerson = function (person) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'display', 'grid'),
				A2($elm$html$Html$Attributes$style, 'grid-template-columns', '72px 1fr'),
				$elm$html$Html$Attributes$class('h-full'),
				A2($elm$html$Html$Attributes$style, 'min-height', '115px'),
				$elm$html$Html$Attributes$class('bg-white text-black'),
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
						$author$project$Page$Team$Team$viewPersonImage(person)
					])),
				A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						$author$project$Page$Team$Team$viewName(person.name),
						$author$project$Page$Team$Team$viewPosition(person.position),
						$author$project$Page$Team$Team$viewDescription(person.description),
						$author$project$Page$Team$Team$viewSocials(person)
					]))
			]));
};
var $author$project$Page$Resources$Helpers$viewResourceImages = function (resource) {
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
								$elm$html$Html$Attributes$class('w-24 h-24 sm:w-40 sm:h-40 object-cover')
							]),
						_List_Nil)
					]))
			]));
};
var $author$project$Page$Newsroom$ViewPress$viewTestimonials = A2(
	$elm$html$Html$div,
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
					$elm$html$Html$Attributes$class('w-full max-w-7xl mx-auto mb-20 px-4 sm:px-10 lg:px-20')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$h2,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mb-10 text-3xl sm:text-5xl lg:text-7xl')
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
							$author$project$Page$Team$Team$viewPerson($author$project$Page$Team$Testimonials$ainsleyRawlingsTestimonial),
							$author$project$Page$Team$Team$viewPerson($author$project$Page$Team$Testimonials$camSmithTestimonial),
							$author$project$Page$Team$Team$viewPerson($author$project$Page$Team$Testimonials$meganReisterTestimonial),
							$author$project$Page$Team$Team$viewPerson($author$project$Page$Team$Testimonials$kellyBriggsTestimonial)
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
						$author$project$Page$Resources$Helpers$viewResourceImages,
						_List_fromArray(
							[$author$project$Page$Team$View$spiritFilledMedia, $author$project$Page$Team$View$makeJoyNormal, $author$project$Page$Team$View$christianChannel, $author$project$Page$Team$View$ocCatholic, $author$project$Page$Team$View$inHisImage, $author$project$Page$Team$View$cfnLive])))
				]))
		]));
var $author$project$Page$Newsroom$ViewPress$viewBody = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('bg-[#FEF7F4]'),
			$elm$html$Html$Attributes$class('p-10')
		]),
	_List_fromArray(
		[$author$project$Page$Newsroom$ViewPress$viewTestimonials]));
var $elm$html$Html$nav = _VirtualDom_node('nav');
var $author$project$Component$Header$supportUsBtn = A2(
	$elm$html$Html$a,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$href('/give'),
			$elm$html$Html$Attributes$class('ml-2 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold bg-[#6b4ee6] hover:bg-[#7a5fff] transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6b4ee6]'),
			$elm$html$Html$Attributes$class('whitespace-nowrap')
		]),
	_List_fromArray(
		[
			$elm$html$Html$text('Support Us')
		]));
var $author$project$Component$Header$viewNavButton = F4(
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
var $author$project$Component$Header$desktopNavigation = function (height) {
	return A2(
		$elm$html$Html$nav,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('h-full w-full flex justify-end content-center justify-items-center gap-8 mr-4'),
				$elm$html$Html$Attributes$class('text-lg text-white')
			]),
		_List_fromArray(
			[
				A4($author$project$Component$Header$viewNavButton, height, '/animations', '_self', 'Animations'),
				A4($author$project$Component$Header$viewNavButton, height, '/feastdayactivities', '_self', 'Calendar'),
				A4($author$project$Component$Header$viewNavButton, height, '/saints', '_self', 'Saints'),
				A4($author$project$Component$Header$viewNavButton, height, '/resources', '_self', 'Resources'),
				A4($author$project$Component$Header$viewNavButton, height, 'https://shop.claritasstudios.com/', '_blank', 'Shop'),
				A4($author$project$Component$Header$viewNavButton, height, 'https://blog.claritasstudios.com/', '_blank', 'Blog'),
				A4($author$project$Component$Header$viewNavButton, height, '/team', '_self', 'About'),
				$author$project$Component$Header$supportUsBtn
			]));
};
var $author$project$Component$Header$hamburgerMenu = A2(
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
var $author$project$Component$Header$navigation = function (height) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('w-full pr-2 justify-self-end')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('xl:hidden flex justify-end')
					]),
				_List_fromArray(
					[$author$project$Component$Header$hamburgerMenu])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('hidden xl:block w-full')
					]),
				_List_fromArray(
					[
						$author$project$Component$Header$desktopNavigation(height)
					]))
			]));
};
var $author$project$Component$Header$viewHeaderTitle = F2(
	function (includesLinks, title) {
		var isAnimationPage = A2($elm$core$String$contains, ' - Claritas Studios', title);
		var headerTag = isAnimationPage ? $elm$html$Html$h2 : $elm$html$Html$h1;
		var _v0 = includesLinks ? _Utils_Tuple2('text-[0px] md:text-xl', 'invisible md:visible') : _Utils_Tuple2('text-lg md:text-xl', '');
		var textClass = _v0.a;
		var visibleClass = _v0.b;
		return A2(
			$elm$html$Html$a,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'text-decoration', 'none'),
					$elm$html$Html$Attributes$class(visibleClass),
					$elm$html$Html$Attributes$class('justify-self-start'),
					$elm$html$Html$Attributes$href('/')
				]),
			_List_fromArray(
				[
					A2(
					headerTag,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'font-family', 'hvdComicSerifPro'),
							A2($elm$html$Html$Attributes$style, 'margin', '0px'),
							$elm$html$Html$Attributes$class('text-white'),
							$elm$html$Html$Attributes$class(textClass)
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Claritas Studios')
						]))
				]));
	});
var $author$project$Component$Logo$logo = A2(
	$elm$html$Html$img,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$src('/assets/new_logo.webp'),
			A2($elm$html$Html$Attributes$attribute, 'srcset', '/assets/new_logo.webp 1x, /assets/new_logo@2x.webp 2x'),
			$elm$html$Html$Attributes$alt('Claritas Studios'),
			$elm$html$Html$Attributes$height(40),
			$elm$html$Html$Attributes$width(40),
			A2($elm$html$Html$Attributes$attribute, 'decoding', 'async'),
			A2($elm$html$Html$Attributes$style, 'vertical-align', 'middle')
		]),
	_List_Nil);
var $author$project$Component$Header$viewLogo = A2(
	$elm$html$Html$a,
	_List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'text-decoration', 'none'),
			$elm$html$Html$Attributes$class('justify-self-start'),
			$elm$html$Html$Attributes$href('/'),
			A2($elm$html$Html$Attributes$attribute, 'aria-label', 'home')
		]),
	_List_fromArray(
		[$author$project$Component$Logo$logo]));
var $author$project$Component$Header$viewSubpageHeader = F2(
	function (currentPage, leftMargin) {
		var isHomePage = currentPage === 'Claritas Studios';
		var _v0 = isHomePage ? _Utils_Tuple2('111px', 'grid-cols-[150px_1fr_150px] xl:grid-cols-[150px_1fr_600px]') : _Utils_Tuple2('60px', 'grid-cols-[150px_1fr_150px] xl:grid-cols-[150px_1fr_600px]');
		var height = _v0.a;
		var gridColsClass = _v0.b;
		return A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$nav,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black via-black/80 to-transparent')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('flex items-center justify-between px-4 md:px-12 py-4')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('grid items-center justify-items-center w-full ' + gridColsClass),
											$elm$html$Html$Attributes$class('h-[60px] md:h-[' + (height + ']'))
										]),
									_List_fromArray(
										[
											$author$project$Component$Header$viewLogo,
											A2($author$project$Component$Header$viewHeaderTitle, true, currentPage),
											$author$project$Component$Header$navigation(height)
										]))
								]))
						])),
					isHomePage ? A2($elm$html$Html$span, _List_Nil, _List_Nil) : A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('h-[60px] md:h-[' + (height + ']'))
						]),
					_List_Nil)
				]));
	});
var $author$project$Page$Newsroom$ViewPress$view = A2(
	$elm$html$Html$div,
	_List_Nil,
	_List_fromArray(
		[
			A2($author$project$Component$Header$viewSubpageHeader, 'Prayers', $author$project$Theme$Layout$headerMargin),
			$author$project$Page$Newsroom$ViewPress$viewBody,
			$author$project$Component$Footer$viewFooter
		]));
var $author$project$Page$Prayer$Angelus$View$viewAboutTheAngelus = A2(
	$elm$html$Html$div,
	_List_Nil,
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h2,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mb-4')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('What is the Angelus')
				])),
			$elm$html$Html$text('The Angelus is a special prayer recited by Catholics three times a day, at 6am, noon, and 6pm, and is accompanied by the ringing of the Angelus bell. The name comes from the Latin word for Angel and the prayer itself reminds us of how Jesus Christ assumed our human nature through the Mystery of the Incarnation. The Pope recites the Angelus prayer in St Peter’s Square every Sunday at midday. It concludes with the recitation of the Gloria three times. Source: '),
			A2(
			$elm$html$Html$a,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$href(''),
					$elm$html$Html$Attributes$target('_blank'),
					$elm$html$Html$Attributes$class('underline')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('https://www.vaticannews.va/en/pope-francis/angelus.html')
				]))
		]));
var $author$project$Page$Prayer$Angelus$View$viewAngelusPrayer = A2(
	$elm$html$Html$div,
	_List_Nil,
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h2,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mb-4')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('The Angelus Prayer')
				])),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('V. The Angel of the Lord declared unto Mary,')
						])),
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('R. And she conceived of the Holy Spirit.')
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('py-4')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('')
						])),
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('Hail, Mary, full of grace,')
						])),
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('the Lord is with thee.')
						])),
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('Blessed art thou amongst women')
						])),
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('and blessed is the fruit of thy womb, Jesus.')
						])),
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('Holy Mary, Mother of God,')
						])),
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('pray for us sinners,')
						])),
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('now and at the hour of our death.')
						])),
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('Amen.')
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('py-4')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('')
						])),
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('V. Behold the handmaid of the Lord,')
						])),
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('R. Be it done unto me according to your Word.')
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('py-4')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('')
						])),
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('Hail, Mary...')
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('py-4')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('')
						])),
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('V. And the Word was made flesh,')
						])),
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('R. and dwelt among us.')
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('py-4')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('')
						])),
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('Hail, Mary...')
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('py-4')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('')
						])),
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('V. Pray for us, O holy Mother of God,')
						])),
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('R. That we may be made worthy of the promises of Christ.')
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('py-4')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('')
						])),
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('Let us pray:')
						])),
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(' Pour forth, we beseech you, O Lord, your grace into our hearts:')
						])),
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(' that we, to whom the Incarnation of Christ your Son was made known by the message of an Angel,')
						])),
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(' may by his Passion and Cross be brought to the glory of his Resurrection.')
						])),
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(' Through the same Christ our Lord.')
						])),
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(' Amen')
						]))
				]))
		]));
var $author$project$Page$Prayer$Angelus$View$viewAngelusPrayerVideo = A2($author$project$Page$Animations$Helpers$viewVideo, '', 'https://www.youtube-nocookie.com/embed/-r6ChB56gr4');
var $author$project$Page$Prayer$Angelus$View$viewAngelusPage = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('max-w-3xl')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mb-16')
				]),
			_List_fromArray(
				[$author$project$Page$Prayer$Angelus$View$viewAboutTheAngelus])),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mb-16')
				]),
			_List_fromArray(
				[$author$project$Page$Prayer$Angelus$View$viewAngelusPrayerVideo])),
			A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[$author$project$Page$Prayer$Angelus$View$viewAngelusPrayer]))
		]));
var $author$project$Page$Prayer$Angelus$View$viewBody = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('bg-[#FEF7F4]'),
			$elm$html$Html$Attributes$class('p-10')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h1,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-center'),
					$elm$html$Html$Attributes$class('my-10 leading-8')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('The Angelus')
				])),
			$author$project$Page$Prayer$Angelus$View$viewAngelusPage
		]));
var $author$project$Page$Prayer$Angelus$View$view = A2(
	$elm$html$Html$div,
	_List_Nil,
	_List_fromArray(
		[$author$project$Page$Prayer$Angelus$View$viewBody, $author$project$Component$Footer$viewFooter]));
var $elm$html$Html$details = _VirtualDom_node('details');
var $elm$html$Html$summary = _VirtualDom_node('summary');
var $author$project$Page$Prayers$View$viewSaints = A2(
	$elm$html$Html$div,
	_List_Nil,
	_List_fromArray(
		[
			A2(
			$elm$html$Html$details,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$summary,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('list-none cursor-pointer hover:bg-csc-lightpurple px-4 py-8 rounded underline text-sky-500 leading-8')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$h2,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('The Our Father')
								]))
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('p-4')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Our Father, Who art in heaven, hallowed be Thy name;')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Thy kingdom come; Thy will be done on earth as it is in')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('heaven. Give us this day our daily bread; and forgive us our')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('trespasses as we forgive those who trespass against us; and')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('lead us not into temptation, but deliver us from evil. Amen.')
								]))
						]))
				])),
			A2(
			$elm$html$Html$details,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$summary,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('list-none cursor-pointer hover:bg-csc-lightpurple px-4 py-8 rounded underline text-sky-500 leading-8')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$h2,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('The Hail Mary')
								]))
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('p-4')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Hail, Mary, full of grace,')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('the Lord is with thee.')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Blessed art thou amongst women')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('and blessed is the fruit of thy womb, Jesus.')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Holy Mary, Mother of God,')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('pray for us sinners,')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('now and at the hour of our death.')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Amen.')
								]))
						]))
				])),
			A2(
			$elm$html$Html$details,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$summary,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('list-none cursor-pointer hover:bg-csc-lightpurple px-4 py-8 rounded underline text-sky-500 leading-8')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$h2,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('The Glory Be')
								]))
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('p-4')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('beginning, is now, and ever shall be, world without end. Amen.')
								]))
						]))
				])),
			A2(
			$elm$html$Html$details,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$summary,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('list-none cursor-pointer hover:bg-csc-lightpurple px-4 py-8 rounded underline text-sky-500 leading-8')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$h2,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Saint Michael the Archangel')
								]))
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('p-4')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('St. Michael the Archangel, defend us in battle.')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Be our defense against the wickedness and snares of the Devil.')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('May God rebuke him, we humbly pray, and do thou,')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('O Prince of the heavenly hosts, by the power of God,')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('cast into hell Satan, and all the evil spirits,')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('who prowl about the world seeking the ruin of souls. Amen.')
								]))
						]))
				])),
			A2(
			$elm$html$Html$details,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$summary,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('list-none cursor-pointer hover:bg-csc-lightpurple px-4 py-8 rounded underline text-sky-500 leading-8')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$h2,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Guardian Angel Prayer')
								]))
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('p-4')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Angel of God,')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('my guardian dear,')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('To whom God’s love')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('commits me here,')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Ever this day,')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('be at my side,')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('To light and guard,')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Rule and guide.')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Amen.')
								]))
						]))
				])),
			A2(
			$elm$html$Html$details,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$summary,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('list-none cursor-pointer hover:bg-csc-lightpurple px-4 py-8 rounded underline text-sky-500 leading-8')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$h2,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('The Angelus')
								]))
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('p-4')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('V. The Angel of the Lord declared unto Mary,')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('R. And she conceived of the Holy Spirit.')
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('py-4')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Hail, Mary, full of grace,')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('the Lord is with thee.')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Blessed art thou amongst women')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('and blessed is the fruit of thy womb, Jesus.')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Holy Mary, Mother of God,')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('pray for us sinners,')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('now and at the hour of our death.')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Amen.')
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('py-4')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('V. Behold the handmaid of the Lord,')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('R. Be it done unto me according to your Word.')
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('py-4')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Hail, Mary...')
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('py-4')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('V. And the Word was made flesh,')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('R. and dwelt among us.')
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('py-4')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Hail, Mary...')
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('py-4')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('V. Pray for us, O holy Mother of God,')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('R. That we may be made worthy of the promises of Christ.')
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('py-4')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Let us pray:')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text(' Pour forth, we beseech you, O Lord, your grace into our hearts:')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text(' that we, to whom the Incarnation of Christ your Son was made known by the message of an Angel,')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text(' may by his Passion and Cross be brought to the glory of his Resurrection.')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text(' Through the same Christ our Lord.')
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text(' Amen')
								]))
						]))
				]))
		]));
var $author$project$Page$Prayers$View$viewBody = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('bg-[#FEF7F4]'),
			$elm$html$Html$Attributes$class('p-10')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h1,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-center'),
					$elm$html$Html$Attributes$class('my-10 leading-8')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Common Catholic Prayers')
				])),
			$author$project$Page$Prayers$View$viewSaints
		]));
var $author$project$Page$Prayers$View$view = A2(
	$elm$html$Html$div,
	_List_Nil,
	_List_fromArray(
		[$author$project$Page$Prayers$View$viewBody, $author$project$Component$Footer$viewFooter]));
var $author$project$Page$Resources$Books$brotherFrancisBooks = {image: '/assets/images/imagekit/16_V1sLznRg0.png', link: 'https://brotherfrancisstore.com/collections/books', name: 'Brother Francis Books'};
var $author$project$Page$Resources$Books$cBPSaints = {image: '/assets/images/imagekit/38_oB0pzZnMW8.png', link: 'https://catholicbookpublishing.com/browse/childrens-books-on-saints', name: 'Catholic Book Publishing\'s Children\'s Books on Saints'};
var $author$project$Page$Resources$Books$catholicSprouts = {image: '/assets/images/imagekit/26_2TkstMXTY.png', link: 'https://shop.catholicsprouts.com/collections/all', name: 'Catholic Sprouts Books and Materials'};
var $author$project$Page$Resources$Books$ctbBooks = {image: '/assets/images/ProfilePictures/CatholicTeenBooks.png', link: 'https://www.catholicteenbooks.com/', name: 'Catholic Teen Books'};
var $author$project$Page$Resources$Books$ctsBooks = {image: '/assets/images/imagekit/CTS_Logo_vwbekKAI-.png', link: 'https://www.ctsbooks.org/product-category/children-young-adults/', name: 'Catholic Truth Society'};
var $author$project$Page$Resources$Books$diaryOfAGodMan = {image: '/assets/images/imagekit/27_LJ8rjMXH6.png', link: 'https://www.diaryofagodman.com/books', name: 'Diary of a God-Man. A fully illustrated children\'s missal'};
var $author$project$Page$Resources$Books$ewtnKidsBooks = {image: '/assets/images/imagekit/30_SPGrEpxn4o.png', link: 'https://www.ewtnreligiouscatalogue.com/Catholic-Childrens-Books', name: 'EWTN Childrens Books'};
var $author$project$Page$Resources$Books$firstFaithTreasury = {image: '/assets/images/imagekit/33_v8d9TN1XkY.png', link: 'https://firstfaithtreasury.com/', name: 'First Faith Treasury'};
var $author$project$Page$Resources$Books$holyHeroesBooks = {image: '/assets/images/imagekit/25_OSP8-2xFJ.png', link: 'https://holyheroes.com/collections/catholic-childrens-books', name: 'Holy Heroes Books'};
var $author$project$Page$Resources$Books$jennaEpkey = {image: '/assets/images/ProfilePictures/JennaEpkey.png', link: 'https://www.amazon.com/stores/Jenna-Epkey/author/B0CWPDDMRM', name: 'Jenna Epkey Catholic Kids Books'};
var $author$project$Page$Resources$Books$lightOfTheSaints = {image: '/assets/images/imagekit/36_eINHZkemx9.png', link: 'https://bookstore.wordonfire.org/products/light-of-the-saints', name: 'Light of the Saints'};
var $author$project$Page$Resources$Books$littleSaintStories = {image: '/assets/images/imagekit/34_GtSZ5NI8_8.png', link: 'https://www.littlesaintstories.com/s/shop', name: 'Little Saint Stories'};
var $author$project$Page$Resources$Books$loyolaPressBooks = {image: '/assets/images/imagekit/23_UvXPxYgqml.png', link: 'https://www.loyolapress.com/', name: 'Loyola Press Books'};
var $author$project$Page$Resources$Books$osvKidsBooks = {image: '/assets/images/imagekit/3rd_Party_Logos_DxY5MCRoK.png', link: 'https://osvkids.com/books/', name: 'OSV Kids Books'};
var $author$project$Page$Resources$Books$paulineBooksAndMediaForKids = {image: '/assets/images/imagekit/37_gMX8cczFD.png', link: 'https://paulinestore.com/kids-teens.html', name: 'Pauline Books and Media'};
var $author$project$Page$Resources$Books$stPaulCenter = {image: '/assets/images/imagekit/35_evg05JJAFh.png', link: 'https://stpaulcenter.com/product-category/children/', name: 'St Paul Center Children\'s Books'};
var $author$project$Page$Resources$Books$tanBooks = {image: '/assets/images/imagekit/32_22z_5JUPjM.png', link: 'https://tanbooks.com/catholic-kids-books/', name: 'Tan Books for Kids'};
var $author$project$Page$Resources$Books$theLittleRoseShop = {image: '/assets/images/imagekit/29_9r_mR-lb6.png', link: 'https://thelittleroseshop.com/collections/baby-kids', name: 'The Little Rose Shop Fabric Books'};
var $author$project$Page$Resources$Books$theotokosKids = {image: '/assets/images/imagekit/28_INemNiAcr.png', link: 'https://theotokoskids.com/collections/books', name: 'Theotokos Kids Books'};
var $author$project$Page$Resources$Books$thyOliveTree = {image: '/assets/images/imagekit/24_ok9wTkcFo.png', link: 'https://www.thyolivetree.com/collections/childrens', name: 'Thy Olive Tree'};
var $author$project$Page$Resources$Books$books = _List_fromArray(
	[$author$project$Page$Resources$Books$littleSaintStories, $author$project$Page$Resources$Books$theotokosKids, $author$project$Page$Resources$Books$osvKidsBooks, $author$project$Page$Resources$Books$theLittleRoseShop, $author$project$Page$Resources$Books$brotherFrancisBooks, $author$project$Page$Resources$Books$thyOliveTree, $author$project$Page$Resources$Books$lightOfTheSaints, $author$project$Page$Resources$Books$firstFaithTreasury, $author$project$Page$Resources$Books$tanBooks, $author$project$Page$Resources$Books$ctsBooks, $author$project$Page$Resources$Books$ewtnKidsBooks, $author$project$Page$Resources$Books$diaryOfAGodMan, $author$project$Page$Resources$Books$catholicSprouts, $author$project$Page$Resources$Books$holyHeroesBooks, $author$project$Page$Resources$Books$jennaEpkey, $author$project$Page$Resources$Books$loyolaPressBooks, $author$project$Page$Resources$Books$stPaulCenter, $author$project$Page$Resources$Books$cBPSaints, $author$project$Page$Resources$Books$paulineBooksAndMediaForKids, $author$project$Page$Resources$Books$ctbBooks]);
var $author$project$Page$Resources$View$books = {description: 'Find books here. It\'s hard to go wrong with a good Catholic book.', image: '/assets/images/imagekit/Resources_Icons/2_4YvKGvP_Y.png', link: '/resources/books', name: 'Books', resources: $author$project$Page$Resources$Books$books};
var $author$project$Page$Resources$Games$brotherFrancisGames = {image: '/assets/images/imagekit/16_V1sLznRg0.png', link: 'https://brotherfrancisstore.com/collections/games', name: 'Brother Francis Games'};
var $author$project$Page$Resources$Games$catholicArcade = {image: '/assets/images/imagekit/64_P-dJU3ooLI.png', link: 'https://opusjoyous.com/', name: 'Catholic Arcade'};
var $author$project$Page$Resources$Games$councilAtDaybreak = {image: '/assets/images/imagekit/CouncilAtDaybreak_zY9pkcPisJ.png', link: 'https://catholiccardgame.com/collections/base-games/products/council-at-daybreak', name: 'Council At Daybreak'};
var $author$project$Page$Resources$Games$holyHeroes = {image: '/assets/images/imagekit/25_OSP8-2xFJ.png', link: 'https://holyheroes.com/collections/games', name: 'Holy Heroes Games'};
var $author$project$Page$Resources$Games$superSaintCards = {image: '/assets/images/imagekit/63_d1sooSovJJ.png', link: 'https://armadei.com/product/super-saints/', name: 'Super Saint Cards'};
var $author$project$Page$Resources$Games$theCatholicCardGame = {image: '/assets/images/imagekit/61_gGyNBdFEh.png', link: 'https://catholiccardgame.com/', name: 'The Catholic Card Game'};
var $author$project$Page$Resources$Games$wanderlight = {image: '/assets/images/imagekit/60_2jdg0x5pz.png', link: 'https://www.wanderlightgame.com/', name: 'Wanderlight'};
var $author$project$Page$Resources$Games$games = _List_fromArray(
	[$author$project$Page$Resources$Games$wanderlight, $author$project$Page$Resources$Games$theCatholicCardGame, $author$project$Page$Resources$Games$councilAtDaybreak, $author$project$Page$Resources$Games$holyHeroes, $author$project$Page$Resources$Games$brotherFrancisGames, $author$project$Page$Resources$Games$superSaintCards, $author$project$Page$Resources$Games$catholicArcade]);
var $author$project$Page$Resources$View$games = {description: 'Find game resources for a fun way to learn about the Catholic faith', image: '/assets/images/imagekit/Resources_Icons/Game%20Icon_rb2djF7Hf.png', link: '/resources/games', name: 'Games', resources: $author$project$Page$Resources$Games$games};
var $author$project$Page$Resources$Podcasts$bibleInAYearWithTeddy = {image: '/assets/images/imagekit/kidsbibleinayearwithteddy_dLisfpvYA.png', link: 'https://podcasts.apple.com/us/podcast/kids-bible-in-a-year-with-teddy/id1676869671', name: 'Kids Bible in a Year with Teddy'};
var $author$project$Page$Resources$Podcasts$catholicKidsPodcast = {image: '/assets/images/imagekit/3rd_Party_Logos_Mz1VR_PBx.png', link: 'https://podcasts.apple.com/us/podcast/catholic-kids-podcast/id1557527100', name: 'Catholic Kids Podcast'};
var $author$project$Page$Resources$Podcasts$catholicKidsTriviaPodcast = {image: '/assets/images/imagekit/CatholicKidsTriviaPodcast_rFHEiGK88.png', link: 'https://podcasts.apple.com/us/podcast/catholic-kids-trivia-podcast/id1662532400', name: 'Catholic Kids Trivia Podcast'};
var $author$project$Page$Resources$Podcasts$catholicSprouts = {image: '/assets/images/imagekit/11_HUKazDTNih.png', link: 'https://podcasts.apple.com/ca/podcast/catholic-sprouts-daily-podcast-for-catholic-kids/id1406174660', name: 'Catholic Sprouts'};
var $author$project$Page$Resources$Podcasts$onTheNightTrain = {image: '/assets/images/imagekit/On_The_Night_Train_Uy2SqRG8B.png', link: 'https://podcasts.apple.com/us/podcast/on-the-night-train/id1638922447', name: 'On The Night Train'};
var $author$project$Page$Resources$Podcasts$saintStoriesForKids = {image: '/assets/images/imagekit/10_W0OwjM8Yu.png', link: 'https://podcasts.apple.com/ca/podcast/saint-stories-for-kids/id1448514363', name: 'Saint Stories for Kids'};
var $author$project$Page$Resources$Podcasts$saintsAlive = {image: '/assets/images/imagekit/14_Aps0ku8wH.png', link: 'https://podcasts.apple.com/us/podcast/saints-alive-podcast/id1598392451', name: 'Saints Alive'};
var $author$project$Page$Resources$Podcasts$thatsTheWord = {image: '/assets/images/imagekit/12_NwOXTTpkTi.png', link: 'https://podcasts.apple.com/us/podcast/thats-the-word-with-fr-james-yamauchi/id1540449749', name: 'That\'s the word'};
var $author$project$Page$Resources$Podcasts$theSaints = {image: '/assets/images/TheSaints.png', link: 'https://themerrybeggars.com/shows/the-saints', name: 'The Saints'};
var $author$project$Page$Resources$Podcasts$podcasts = _List_fromArray(
	[$author$project$Page$Resources$Podcasts$saintStoriesForKids, $author$project$Page$Resources$Podcasts$catholicSprouts, $author$project$Page$Resources$Podcasts$saintsAlive, $author$project$Page$Resources$Podcasts$theSaints, $author$project$Page$Resources$Podcasts$bibleInAYearWithTeddy, $author$project$Page$Resources$Podcasts$thatsTheWord, $author$project$Page$Resources$Podcasts$onTheNightTrain, $author$project$Page$Resources$Podcasts$catholicKidsPodcast, $author$project$Page$Resources$Podcasts$catholicKidsTriviaPodcast]);
var $author$project$Page$Resources$View$podcasts = {description: 'Find audio podcasts here. Your kids can listen to them while on the road, traveling, while doing coloring activities, or they can be simply enjoyed by themselves.', image: '/assets/images/imagekit/Resources_Icons/1_EAfo23y5R.png', link: '/resources/podcasts', name: 'Podcasts', resources: $author$project$Page$Resources$Podcasts$podcasts};
var $author$project$Page$Resources$Subscriptions$catholicFamilyCrate = {image: '/assets/images/imagekit/7_i5fOMR9CEB.png', link: 'https://catholicfamilycrate.com', name: 'Catholic Family Crate'};
var $author$project$Page$Resources$Subscriptions$diaryOfAGodman = {image: '/assets/images/imagekit/27_LJ8rjMXH6.png', link: 'https://www.diaryofagodman.com/subscriptions', name: 'Diary of a God-Man'};
var $author$project$Page$Resources$Subscriptions$faithAndFamilyCollective = {image: '/assets/images/imagekit/6_tZqBkQ3sW.png', link: 'https://faithandfamilycollective.com', name: 'Faith + Family Collective'};
var $author$project$Page$Resources$Subscriptions$formed = {image: '/assets/images/imagekit/9_6wjdaJHdc.png', link: 'https://formed.org', name: 'Formed'};
var $author$project$Page$Resources$Subscriptions$magnifiKid = {image: '/assets/images/imagekit/8_qucgsetg84.png', link: 'https://us.magnificat.net/home/magnifikid', name: 'MagnifiKid'};
var $author$project$Page$Resources$Subscriptions$massBox = {image: '/assets/images/imagekit/5_GX7izsR5Jp.png', link: 'https://themassbox.com', name: 'Mass Box'};
var $author$project$Page$Resources$Subscriptions$osvKids = {image: '/assets/images/imagekit/3_1__qbNDjJEy1.png', link: 'https://osvkids.com/magazine/', name: 'OSV Kids Magazine'};
var $author$project$Page$Resources$Subscriptions$saintOfTheMonth = {image: '/assets/images/imagekit/4_1__LjeiFaCGM1.png', link: 'https://www.saintofthemonth.com', name: 'Saint of the Month Box'};
var $author$project$Page$Resources$Subscriptions$subscriptions = _List_fromArray(
	[$author$project$Page$Resources$Subscriptions$osvKids, $author$project$Page$Resources$Subscriptions$saintOfTheMonth, $author$project$Page$Resources$Subscriptions$massBox, $author$project$Page$Resources$Subscriptions$faithAndFamilyCollective, $author$project$Page$Resources$Subscriptions$catholicFamilyCrate, $author$project$Page$Resources$Subscriptions$magnifiKid, $author$project$Page$Resources$Subscriptions$formed, $author$project$Page$Resources$Subscriptions$diaryOfAGodman]);
var $author$project$Page$Resources$View$subscriptions = {description: 'Want monthly content at your front door? Check out these wonderful Catholic subscriptions.', image: '/assets/images/imagekit/Resources_Icons/4_U5qO_iICx.png', link: '/resources/subscriptions', name: 'Subscriptions', resources: $author$project$Page$Resources$Subscriptions$subscriptions};
var $author$project$Page$Resources$Videos$amyheysart = {image: '/assets/images/imagekit/AmyH_ld3G4EoVX.png', link: 'https://www.youtube.com/@amyheyseart', name: 'Amy Heyse Art'};
var $author$project$Page$Resources$Videos$brotherFrancis = {image: '/assets/images/imagekit/16_V1sLznRg0.png', link: 'https://www.youtube.com/@BrotherFrancis', name: 'Brother Francis'};
var $author$project$Page$Resources$Videos$catholicIcing = {image: '/assets/images/imagekit/41_XrkKmwtXL.png', link: 'https://www.youtube.com/@CatholicIcing', name: 'Catholic Icing'};
var $author$project$Page$Resources$Videos$catholicKidsMedia = {image: '/assets/images/imagekit/17_z9ZERCAuK.png', link: 'https://www.youtube.com/@CatholicKidsMedia', name: 'Catholic Kids Media'};
var $author$project$Page$Resources$Videos$catholicSongsForKids = {image: '/assets/images/imagekit/40_vS6tZTdD3.png', link: 'https://www.youtube.com/@catholicsongsforkids', name: 'Catholic Songs for Kids'};
var $author$project$Page$Resources$Videos$christineInAction = {image: '/assets/images/imagekit/christineinaction_Le5_7yr2K.jpeg', link: 'https://www.youtube.com/@ChristineInAction', name: 'Christine In Action'};
var $author$project$Page$Resources$Videos$claritasStudios = {image: '/assets/images/imagekit/CSCLogo_JiNT9WUPX.png', link: 'https://www.youtube.com/@ClaritasStudios', name: 'Claritas Studios'};
var $author$project$Page$Resources$Videos$heidiWitte = {image: '/assets/images/HeidiWitte.png', link: 'https://www.youtube.com/@kidsliturgy', name: 'Heidi Witte'};
var $author$project$Page$Resources$Videos$juiceBox = {image: '/assets/images/imagekit/juicebox_flQW7t8YD.png', link: 'https://www.youtube.com/@SpiritJuiceKids', name: 'Spirit Juice Kids'};
var $author$project$Page$Resources$Videos$opusJoyous = {image: '/assets/images/imagekit/opusjoyouslogo__bVhpC3Fj.jpeg', link: 'https://www.youtube.com/@OpusJoyous', name: 'Opus Joyous'};
var $author$project$Page$Resources$Videos$prostradaDesigns = {image: '/assets/images/imagekit/42_GMJuNZEVs.png', link: 'https://www.youtube.com/@prostradadesignsllc', name: 'Prostrada Designs'};
var $author$project$Page$Resources$Videos$sacredHeartofJesusConvent = {image: '/assets/images/SacredHeartofJesusConvent.png', link: 'https://www.youtube.com/@SacredHeartofJesusConvent/about', name: 'Sacred Heart of Jesus Convent'};
var $author$project$Page$Resources$Videos$tomkin = {image: '/assets/images/imagekit/15_Wrw3_kbKK.png', link: 'https://www.youtube.com/playlist?list=PL9CQlldupc5_L0shwBi1w-n5liWhD0ArO', name: 'Tomkin'};
var $author$project$Page$Resources$Videos$videos = _List_fromArray(
	[$author$project$Page$Resources$Videos$claritasStudios, $author$project$Page$Resources$Videos$christineInAction, $author$project$Page$Resources$Videos$tomkin, $author$project$Page$Resources$Videos$juiceBox, $author$project$Page$Resources$Videos$catholicKidsMedia, $author$project$Page$Resources$Videos$brotherFrancis, $author$project$Page$Resources$Videos$amyheysart, $author$project$Page$Resources$Videos$heidiWitte, $author$project$Page$Resources$Videos$sacredHeartofJesusConvent, $author$project$Page$Resources$Videos$catholicSongsForKids, $author$project$Page$Resources$Videos$opusJoyous, $author$project$Page$Resources$Videos$catholicIcing, $author$project$Page$Resources$Videos$prostradaDesigns]);
var $author$project$Page$Resources$View$videos = {description: 'Find video content here. Videos are a wonderful engaging way to bring a visual representation of the faith into your home.', image: '/assets/images/imagekit/Resources_Icons/3_mTKsUZQuM.png', link: '/resources/videos', name: 'Youtube Channels', resources: $author$project$Page$Resources$Videos$videos};
var $author$project$Page$Resources$Prayer$Main$viewAboutPrayerResources = A2(
	$elm$html$Html$div,
	_List_Nil,
	_List_fromArray(
		[
			$elm$html$Html$text('Find resources to help build your prayer life here.')
		]));
var $author$project$Page$Resources$Prayer$Main$theAmenApp = {image: 'https://ik.imagekit.io/catholicstories/ProfileImages/44_A3rkyg807.png?updatedAt=1683227692705', link: 'https://amenapp.org/', name: 'The Amen Prayer App'};
var $author$project$Page$Resources$Prayer$Main$theHallowApp = {image: 'https://ik.imagekit.io/catholicstories/ProfileImages/45_n7tIe7YkV.png?updatedAt=1683227692949', link: 'https://hallow.com/', name: 'The Hallow Prayer App'};
var $author$project$Page$Resources$Prayer$Main$twoByTwo = {image: 'https://ik.imagekit.io/catholicstories/ProfileImages/twobytwo_jqaTekz8M.png?updatedAt=1683228056777', link: 'https://twobytwoprayer.com/', name: 'Two by two Prayer Website'};
var $author$project$Page$Resources$Helpers$viewResource = function (resource) {
	return A2(
		$elm$html$Html$a,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('grid grid-cols-[100px_1fr] hover:bg-csc-lightpurple rounded p-7'),
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
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('leading-10')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(resource.name)
							]))
					]))
			]));
};
var $author$project$Page$Resources$Prayer$Main$viewPrayerResources = A2(
	$elm$html$Html$div,
	_List_Nil,
	A2(
		$elm$core$List$map,
		$author$project$Page$Resources$Helpers$viewResource,
		_List_fromArray(
			[$author$project$Page$Resources$Prayer$Main$theHallowApp, $author$project$Page$Resources$Prayer$Main$theAmenApp, $author$project$Page$Resources$Prayer$Main$twoByTwo])));
var $author$project$Page$Resources$Prayer$Main$viewPrayerSteps = A2(
	$elm$html$Html$div,
	_List_Nil,
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h2,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mt-16 mb-4')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Prayer Progression')
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
							$elm$html$Html$text('Having trouble getting your kids to pray the Rosary? Or other long prayers? You might be starting too big for them. Learning to build a daily habit of prayer takes time and patience.')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(' Here is a prayer progression you can use to slowly introduce your kids to each prayer. ')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(' There is no hard and fast rule. You can teach multiple prayers at a time or in a different order than listed. Remove distractions during prayer time and when appropriate, kneel while praying.')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(' Remember every kid is different and may take longer to learn the prayers. Be patient.')
						]))
				])),
			A2(
			$elm$html$Html$h3,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-lg font-bold mt-16 mb-4')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('The Sign of the Cross')
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
							$elm$html$Html$text('The sign of the cross is a prayer in and of itself. It is a sign of our salvation. It expresses our belief in the Trinity.')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(' It offers protection against demons and our own inclination to sin.')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(' The sign of the cross is usually accompanied by the words, \'In the name of the Father, and of the Son, and of the Holy Spirit.\'')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(' You can remind your kids to do the sign of the cross before they eat, before they sleep')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(' when they enter a Church, whenever you drive by a Church, and at other times throughout the day.')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(' You can also bless your children by making the sign of the cross on their forehead with your thumb.')
						]))
				])),
			A2(
			$elm$html$Html$h3,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-lg font-bold mt-16 mb-4')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('The Prayer Before Meals')
				])),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Say this prayer every time you eat. This will quickly help your kid build a habit of turning to God in prayer. It will help them grow in the virtue of gratitude.')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mt-4 italic')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Bless us, O Lord, and these Thy gifts, which we are about to receive from Thy bounty, through Christ, Our Lord. Amen.')
				])),
			A2(
			$elm$html$Html$h3,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-lg font-bold mt-16 mb-4')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('The Hail Mary')
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
							$elm$html$Html$text('The Hail Mary prayer is short and sweet for kids. You can use ')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$a,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$href('/animations/hailmary'),
									$elm$html$Html$Attributes$class('underline')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('our animation')
								]))
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(' to help your kids understand this prayer. You can also find Hail Mary Prayer activities on ')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$a,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$href('/animations/hailmary'),
									$elm$html$Html$Attributes$class('underline')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('our animation page')
								]))
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('.')
						]))
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mt-4 italic')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Hail Mary, full of grace, the Lord is with you; blessed are you among women, and blessed is the fruit of your womb, Jesus.  Holy Mary, Mother of God, pray for us sinners now and at the hour of our death. Amen.')
				])),
			A2(
			$elm$html$Html$h3,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-lg font-bold mt-16 mb-4')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('The Guardian Angel Prayer')
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
							$elm$html$Html$text('This prayer can be said each night and each morning.')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(' Let your kids learn about their guardian angel and ask for their intercession. You can use ')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$a,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$href('/animations/prayertimewithangels/1/guardianangelprayer'),
									$elm$html$Html$Attributes$class('underline')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('our animation')
								]))
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(' to help your kids understand this prayer. You can also find Guardian Angel Prayer activities on ')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$a,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$href('/animations/prayertimewithangels/1/guardianangelprayer'),
									$elm$html$Html$Attributes$class('underline')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('our animation page')
								]))
						]))
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mt-4 italic')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Angel Of God, my guardian dear, to whom God\'s love commits me here, ever this day be at my side, to light and guard, to rule and guide. Amen.')
				])),
			A2(
			$elm$html$Html$h3,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-lg font-bold mt-16 mb-4')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('The Glory Be')
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
							$elm$html$Html$text('This prayer is called a doxology because')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(' it is an expression of praise and glory.')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(' It is usually used at the end of a longer prayer to sum up our feelings and intentions.')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(' We pray this at the end of each decade of the Rosary. It can also be prayed at the end of the Angelus.')
						]))
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mt-4 italic')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.')
				])),
			A2(
			$elm$html$Html$h3,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-lg font-bold mt-16 mb-4')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('The Our Father')
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
							$elm$html$Html$text('The prayer our Savior gave us. It is a powerful prayer that he instructed us to pray. ')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(' Having your kids learn this prayer will help them follow along with it at Mass.')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(' To introduce it to them, you can read from Scripture: Matthew 6:5-15 and Luke 11:1-13.')
						]))
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mt-4 italic')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Our Father, who art in heaven, hallowed be thy name; thy kingdom come, thy will be done on earth as it is in heaven. Give us this day our daily bread, and forgive us our trespasses, as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.')
				])),
			A2(
			$elm$html$Html$h3,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-lg font-bold mt-16 mb-4')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('The Fatima Prayer')
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
							$elm$html$Html$text('This prayer was given by Our Lady during the Third Apparition of Our Lady of Fatima to the three shepherd children on July 13, 1917. It is to be prayed after the \'Glory Be\' in each decade of the Rosary.')
						]))
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mt-4 italic')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('O my Jesus, forgive us our sins, save us from the fire of hell, lead all souls to heaven, especially those who are in most need of Thy mercy.')
				])),
			A2(
			$elm$html$Html$h3,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-lg font-bold mt-16 mb-4')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Prayer to Saint Michael the Archangel')
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
							$elm$html$Html$text('The St Michael Prayer was originally composed by Pope Leo XIII. He sent it to all the churches for the people to say after each Mass. In this prayer, we seek St Michael\'s protection from the devil and evil spirits.')
						]))
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
							$elm$html$Html$text('You can use ')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$a,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$href('/animations/prayertimewithangels/1/saintmichaelprayer'),
									$elm$html$Html$Attributes$class('underline')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('our animation')
								]))
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(' to help your kids understand this prayer. You can also find Saint Michael Prayer activities on ')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$a,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$href('/animations/prayertimewithangels/1/saintmichaelprayer'),
									$elm$html$Html$Attributes$class('underline')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('our animation page')
								]))
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('.')
						]))
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mt-4 italic')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('St. Michael the Archangel, defend us in battle.  Be our defense against the wickedness and snares of the Devil.  May God rebuke him, we humbly pray, and do thou, O Prince of the heavenly hosts, by the power of God, cast into hell Satan, and all the evil spirits, who prowl about the world seeking the ruin of souls. Amen.')
				])),
			A2(
			$elm$html$Html$h3,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-lg font-bold mt-16 mb-4')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Prayers of Intercession')
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
							$elm$html$Html$text('While there are no specific words to this, prayers of intercession are a wonderful way for kids to grow in charity.')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(' It allows them to think about others and prayer for them.')
						]))
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
							$elm$html$Html$text(' You can ask your kids who they would like to pray for right before the prayer before meals or before Mass.')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(' They can pray for family members, friends, classmates, teachers, or anyone in their lives.')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(' They can pray for priests, doctors, nurses, or groups of people in general.')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(' They can pray for countries or those affected by certain afflictions.')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(' You can start and lead them by example, \'Let us pray for your uncle who is in the hospital\' or \'Let us pray for those affected by the hurricane and in need of a home.\'')
						]))
				])),
			A2(
			$elm$html$Html$h3,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-lg font-bold mt-16 mb-4')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('The Angelus')
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
							$elm$html$Html$text('The Angelus is a special prayer recited by Catholics three times a day, at 6am, noon, and 6pm')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(', and is accompanied by the ringing of the Angelus bell.')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(' The name comes from the Latin word for Angel and the prayer itself reminds us of how Jesus Christ')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(' assumed our human nature through the Mystery of the Incarnation.')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(' The Pope recites the Angelus prayer in St Peter’s Square every Sunday at midday. It concludes with the recitation of the Gloria three times.')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(' source: https://www.vaticannews.va/en/pope-francis/angelus.html')
						]))
				])),
			A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mt-4 italic')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('V/. The Angel of the Lord declared unto Mary,')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mt-4 italic')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('R/. And she conceived of the Holy Spirit.')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mt-4 italic')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Hail Mary, full of grace, the Lord is with you;\nblessed are you among women, and blessed is the fruit of your womb, Jesus. Holy Mary, Mother of God, pray for us sinners now and at the hour of our death. Amen.')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mt-4 italic')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('V/. Behold the handmaid of the Lord,')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mt-4 italic')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('R/. Be it done unto me according to your Word.')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mt-4 italic')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Hail Mary, full of grace, the Lord is with you; blessed are you among women, and blessed is the fruit of your womb, Jesus. Holy Mary, Mother of God, pray for us sinners now and at the hour of our death. Amen.')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mt-4 italic')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('V/. And the Word was made flesh,')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mt-4 italic')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('R/. And dwelt among us.')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mt-4 italic')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Hail Mary, full of grace, the Lord is with you;\nblessed are you among women, and blessed is the fruit of your womb, Jesus. Holy Mary, Mother of God, pray for us sinners now and at the hour of our death. Amen.')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mt-4 italic')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('V/. Pray for us, O holy Mother of God,')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mt-4 italic')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('R/. That we may be made worthy of the promises of Christ.')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mt-4 italic')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Let us pray. Pour forth, we beseech you, O Lord, your grace into our hearts: that we, to whom the Incarnation of Christ your Son was made known by the message of an Angel, may by his Passion and Cross be brought to the glory of his Resurrection. Through the same Christ our Lord. Amen.')
						]))
				])),
			A2(
			$elm$html$Html$h3,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-lg font-bold mt-16 mb-4')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('The Regina Coeli')
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
							$elm$html$Html$text(' From Easter to Pentecost the Regina Coeli is prayed instead of the Angelus. This prayer commemorates the Resurrection of Jesus Christ and, like the Angelus, concludes with the recitation of the Gloria three times.')
						]))
				])),
			A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mt-4 italic')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('V. Queen of Heaven, rejoice, alleluia.')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mt-4 italic')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('R. For He whom you did merit to bear, alleluia.')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mt-4 italic')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('V. Has risen, as he said, alleluia.')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mt-4 italic')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('R. Pray for us to God, alleluia.')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mt-4 italic')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('V. Rejoice and be glad, O Virgin Mary, alleluia.')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mt-4 italic')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('R. For the Lord has truly risen, alleluia.')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mt-4 italic')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Let us pray. O God, who gave joy to the world through the resurrection of Thy Son, our Lord Jesus Christ, grant we beseech Thee, that through the intercession of the Virgin Mary, His Mother, we may obtain the joys of everlasting life. Through the same Christ our Lord. Amen.')
						]))
				])),
			A2(
			$elm$html$Html$h3,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-lg font-bold mt-16 mb-4')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Three Hail Mary Devotion')
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
							$elm$html$Html$text('Once your kids have single daily prayers down. You can start incorporating longer strings of prayers together. A wonderful one to begin with is the Three Hail Mary Devotion to say in the morning and at night. ')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$a,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$href('https://visitationproject.org/pages/the-three-hail-marys'),
									$elm$html$Html$Attributes$class('underline')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Our Blessed Mother revealed this devotion to St. Mechtilde, a Benedictine mystic. St. Gertrude wrote down the revelation at the dictation of St. Mechtilde.')
								]))
						]))
				])),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('italic')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mt-4')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(' While Mechtilde was beseeching the glorious Virgin to assist her in her hour of death, Our Lady appeared to her and said: \'I will certainly. But I also want you to say three special Hail Marys to me every day.')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mt-4')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(' \'The first will be in honor of God the Father, Whose omnipotence raised my soul so high above every other creature that, after God, I have the greatest power in Heaven and on earth. In the hour of your death, I will use that power of God the Father to keep any hostile power far from you. ')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mt-4')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(' \'The second Hail Mary will be said in honor of the Son of God, Who communicated His inscrutable wisdom to me. In the hour of your death, I will fill your soul with the light of that wisdom, so that all the darkness of ignorance and error will be dispelled.')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mt-4')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(' \'The third Hail Mary will be in honor of God the Holy Ghost, Who filled my soul with the sweetness of His love and tenderness and mercy. In your last hour, I will then change the bitterness of death into divine sweetness and delight.')
						])),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mt-4')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(' \'To any soul who faithfully prays the Three Hail Marys, I will appear at the hour of death in a splendor so extraordinary that it will fill the soul with heavenly consolation.')
						]))
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mt-4')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(' For this devotion, say \'O my Mother, preserve me this day (or night) from mortal sin,\' then pray three Hail Marys in a row in honor of the Father, the Son, and the Holy Spirit. ')
				])),
			A2(
			$elm$html$Html$h3,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-lg font-bold mt-16 mb-4')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Three Day Novenas')
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
							$elm$html$Html$text('Once your kids have daily prayers down. You can start incorporating Novenas.')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(' Doing a full nine-day novena might be hard, so you can start with a three-day novena.')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(' Here are a couple three-day Novena\'s you can try:')
						])),
					A2(
					$elm$html$Html$ul,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$li,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$a,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$href('https://novenaprayer.com/2020/03/02/miraculous-prayer-to-the-holy-spirit/'),
											$elm$html$Html$Attributes$class('underline'),
											$elm$html$Html$Attributes$target('_blank')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Three Day Miraculous Novena Prayer to the Holy Spirit')
										]))
								])),
							A2(
							$elm$html$Html$li,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$a,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$href('https://novenaprayer.com/2022/04/26/three-day-miracle-prayer-to-our-lady/'),
											$elm$html$Html$Attributes$class('underline'),
											$elm$html$Html$Attributes$target('_blank')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Three Day Miracle Prayer To Our Lady')
										]))
								]))
						]))
				])),
			A2(
			$elm$html$Html$h3,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-lg font-bold mt-16 mb-4')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('A Decade of the Rosary')
				])),
			A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
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
									$elm$html$Html$text('Choose one of the Mysteries of the Rosary to reflect on. Reading a short passage from the Gospel and having an image of that mystery will help with this.')
								])),
							A2(
							$elm$html$Html$span,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text(' Start with a short Gospel reading, then pray the Our Father, the Hail Mary ten times, the Glory Be, and end with the Fatima Prayer.')
								])),
							A2(
							$elm$html$Html$span,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text(' You can interweave the Gospel verses between the Hail Marys. If your kids aren\'t able to do ten Hail Marys, then start smaller and work your way up.')
								])),
							A2(
							$elm$html$Html$span,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text(' Here is a list of the Mysteries and associated fruits and bible passages.')
								]))
						])),
					A2(
					$elm$html$Html$h4,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('font-semibold')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Joyful Mysteries')
						])),
					A2(
					$elm$html$Html$ul,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('list-decimal list-inside')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$li,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('The Annunciation (Humility). Luke 1:26-38; John 1:14.')
								])),
							A2(
							$elm$html$Html$li,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('The Visitation (Charity). Luke 1:29-56.')
								])),
							A2(
							$elm$html$Html$li,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('The Nativity (Poverty). Luke 2:1-29; Matthew 1:18-25.')
								])),
							A2(
							$elm$html$Html$li,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('The Presentation. Luke 2:22-39')
								])),
							A2(
							$elm$html$Html$li,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('The Finding at the Temple. Luke 2:41-52')
								]))
						])),
					A2(
					$elm$html$Html$h4,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('font-bold')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Luminous Mysteries')
						])),
					A2(
					$elm$html$Html$ul,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('list-decimal list-inside')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$li,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('The Baptism in the Jordan (Fidelity to our baptismal promises). Matthew 3:11-17; Mark 1:9-11; Luke 3:15-22; John 1:26-34.')
								])),
							A2(
							$elm$html$Html$li,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('The Wedding at Cana  (Faith in Mary‘s intercession and maternal care). John 2:1-12.')
								])),
							A2(
							$elm$html$Html$li,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('The Proclamation of the Kingdom of God (Conversion of heart). Mark 1:14-15; Matthew 5:1-16; Matthew 6:33; Matthew 7:21.')
								])),
							A2(
							$elm$html$Html$li,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('The Transfiguration (Desire to become a new person in Christ). Matthew 17:1-8; Mark 9:2-10; Luke 9:28-36.')
								])),
							A2(
							$elm$html$Html$li,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('The Institution of the Eucharist (Love of the Eucharist; active participation at Mass); Matthew 26:26-28; Mark 22-25; Luke 22:14-20; John 6:33-59.')
								]))
						])),
					A2(
					$elm$html$Html$h4,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('font-bold')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Sorrowful Mysteries')
						])),
					A2(
					$elm$html$Html$ul,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('list-decimal list-inside')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$li,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('The Agony in the Garden (True sorrow for sin; repentance). Matthew 26:36-46; Mark 14:32-42; Luke 22:39-46.')
								])),
							A2(
							$elm$html$Html$li,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('The Scourging at the Pillar (Modesty and purity; mortification or self-denial). Matthew 27:26; Mark 15:15; Luke 23:16-22; John 19:1.')
								])),
							A2(
							$elm$html$Html$li,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('The Crowning of Thorns (Moral courage; love of our enemies). Matthew 27:29-30; Mark 15:16-20; John 19: 2-3.')
								])),
							A2(
							$elm$html$Html$li,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('The Carrying of the Cross  (Patience, especially when suffering; fortitude) Luke 23: 26-32; Matthew 27:31-32; Mark 15:21; Luke 23:26-32.')
								])),
							A2(
							$elm$html$Html$li,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('The Crucifixion (Perseverance; mercy). Luke 23: 33-46; Matthew 27: 33-54; Mark 15: 22-39; Luke 23: 33-47; John 1917-37')
								]))
						])),
					A2(
					$elm$html$Html$h4,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('font-bold')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Glorious Mysteries')
						])),
					A2(
					$elm$html$Html$ul,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('list-decimal list-inside')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$li,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('The Resurrection (Faith). Matthew 28:1-10; Mark 16:1-18; Luke 24:1-49; John 20:1-29.')
								])),
							A2(
							$elm$html$Html$li,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('The Ascension (Hope). Mark 16:19-20; Luke 24:50-51; Acts 1:6-11.')
								])),
							A2(
							$elm$html$Html$li,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('The Descent of the Holy Spirit (Love of God; gifts of the Holy Spirit) Acts 2:1-41,')
								])),
							A2(
							$elm$html$Html$li,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('The Assumption (Grace of a happy death; eternal happiness). Revelation 12:1.')
								])),
							A2(
							$elm$html$Html$li,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('The Crowning of Mary as Queen of Heaven and Earth (True devotion to Mary). Revelation 12:1.')
								]))
						]))
				])),
			A2(
			$elm$html$Html$h3,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-lg font-bold mt-16 mb-4')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('A Few Decades of the Rosary')
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
							$elm$html$Html$text('When your kids are comfortable with a single decade, you can start doing multiple decades of the Rosary. Start with a few Hail Marys for each and work your way up to ten Hail Marys for each.')
						]))
				])),
			A2(
			$elm$html$Html$h3,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-lg font-bold mt-16 mb-4')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('The Divine Mercy Chaplet')
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
							$elm$html$Html$text('This Chaplet is from the vision of St. Faustina. It is appropriate to pray at three o\'clock each afternoon but can be prayed at other times. The Chaplet of Mercy can be recited using ordinary Rosary beads. ')
						]))
				])),
			A2(
			$elm$html$Html$a,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$href('https://www.thedivinemercy.org/message/devotions/chaplet'),
					$elm$html$Html$Attributes$target('_blank'),
					$elm$html$Html$Attributes$class('underline')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('Click here for instructions on how to pray the Divine Mercy Chaplet.')
						]))
				])),
			A2(
			$elm$html$Html$h3,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-lg font-bold mt-16 mb-4')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('The Servite Rosary')
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
							A2(
							$elm$html$Html$a,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$href('https://www.ourladymountcarmel.com/blog/pray-servite-rosary'),
									$elm$html$Html$Attributes$class('underline'),
									$elm$html$Html$Attributes$target('_blank')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('The Servite Rosary')
								])),
							$elm$html$Html$text(' consists of seven groups of prayer in memory of Marys seven sorrows. Seven Hail Marys are said for each group instead of ten as done in the Rosary.')
						]))
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mt-4 italic')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('It is customary to begin with an Act of Contrition, to call to mind the role our sins had in Mary’s sufferings. At the beginning of each group, the sorrow is announced, followed by an Our Father and seven Hail Marys. At the end of the rosary, we say 3 Hail Marys in honor of Our Lady’s tears.')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mt-4 italic')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$ul,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('list-decimal list-inside')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$li,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('The Prophecy Of Simeon (Luke 2:34–35).')
								])),
							A2(
							$elm$html$Html$li,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('The Flight Into Egypt (Matthew 2:13).')
								])),
							A2(
							$elm$html$Html$li,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('The Loss Of Jesus In The Temple (Luke 2:43–45).')
								])),
							A2(
							$elm$html$Html$li,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Mary Meets Jesus On the Way To Calvary.')
								])),
							A2(
							$elm$html$Html$li,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Jesus Dies On The Cross (John 19:25).')
								])),
							A2(
							$elm$html$Html$li,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Mary Receives The Dead Body of Jesus (Matthew 27:57–59).')
								])),
							A2(
							$elm$html$Html$li,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Jesus Is Laid In The Tomb (John 19:40–42).')
								]))
						]))
				])),
			A2(
			$elm$html$Html$h3,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-lg font-bold mt-16 mb-4')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('The Full Rosary')
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
							$elm$html$Html$text('\"The Rosary is a prayer loved by countless Saints and encouraged by the Magisterium. Simple yet profound, it still remains, at the dawn of this third millennium, a prayer of great significance, destined to bring forth a harvest of holiness.\" - ')
						])),
					A2(
					$elm$html$Html$a,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$href('https://www.vatican.va/content/john-paul-ii/en/apost_letters/2002/documents/hf_jp-ii_apl_20021016_rosarium-virginis-mariae.html'),
							$elm$html$Html$Attributes$target('_blank'),
							$elm$html$Html$Attributes$class('underline')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Apostolic Letter Rosarium Virginis Mariae of the Supreme Pontiff John Paul II to the bishops, clergy and faithful on the Most Holy Rosary')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('.')
						]))
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mt-4')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('The mysteries can be distributed throughout the week.')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(' Monday and Saturday are dedicated to the joyful mysteries, Tuesday and Friday are dedicated to the sorrowful mysteries, Wednesday and Sunday are dedicated to the glorious mysteries, and Thursday is dedicated to the luminous mysteries.')
						]))
				]))
		]));
var $author$project$Page$Resources$Prayer$Main$viewBody = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('max-w-3xl'),
			$elm$html$Html$Attributes$class('m-auto'),
			$elm$html$Html$Attributes$class('p-5'),
			$elm$html$Html$Attributes$class('mb-10')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h1,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-10 leading-10')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Prayer Resources')
				])),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mb-20')
				]),
			_List_fromArray(
				[$author$project$Page$Signup$view4])),
			$author$project$Page$Resources$Prayer$Main$viewAboutPrayerResources,
			$author$project$Page$Resources$Prayer$Main$viewPrayerResources,
			$author$project$Page$Resources$Prayer$Main$viewPrayerSteps
		]));
var $author$project$Page$Resources$Prayer$Main$view = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'height', '100vh'),
			A2($elm$html$Html$Attributes$style, 'overflow-x', 'hidden'),
			A2($elm$html$Html$Attributes$style, 'overflow-y', 'auto'),
			A2($elm$html$Html$Attributes$style, 'perspective', '300px'),
			A2($elm$html$Html$Attributes$style, 'scroll-behavior', 'smooth'),
			A2($elm$html$Html$Attributes$style, 'background-color', '#FEF7F4')
		]),
	_List_fromArray(
		[
			A2($author$project$Component$Header$viewSubpageHeader, 'Prayer Resources', $author$project$Theme$Layout$headerMargin),
			$author$project$Page$Resources$Prayer$Main$viewBody,
			$author$project$Component$Footer$viewFooter
		]));
var $author$project$Page$Resources$View$viewAboutResources = A2(
	$elm$html$Html$div,
	_List_Nil,
	_List_fromArray(
		[
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Find links to podcasts, videos, books and more. There are a lot of resources out there for Catholic parents and we are here to help you find them.')
				]))
		]));
var $author$project$Page$Resources$View$feastDayActivities = {description: 'Find activities for feast days throughout the year', image: '/assets/images/imagekit/Resources_Icons/feastdaycalendar_1__YTmPRisXH.png', link: '/feastdayactivities', name: 'Feast Day Activities', resources: _List_Nil};
var $author$project$Page$Resources$View$prayerResources = {description: 'Find more resources here to help build your prayer life', image: '/assets/images/imagekit/Resources_Icons/prayerresources_gN76-j6pz.png', link: '/resources/prayer', name: 'Prayer Resources', resources: _List_Nil};
var $author$project$Page$Resources$View$viewResourceGroup = function (resourceGroup) {
	return A2(
		$elm$html$Html$a,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('grid grid-cols-[100px_1fr] hover:bg-csc-lightpurple rounded p-7'),
				$elm$html$Html$Attributes$href(resourceGroup.link),
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
var $author$project$Page$Resources$View$viewResourceGroups = A2(
	$elm$html$Html$div,
	_List_Nil,
	A2(
		$elm$core$List$map,
		$author$project$Page$Resources$View$viewResourceGroup,
		_List_fromArray(
			[$author$project$Page$Resources$View$books, $author$project$Page$Resources$View$podcasts, $author$project$Page$Resources$View$videos, $author$project$Page$Resources$View$subscriptions, $author$project$Page$Resources$View$prayerResources, $author$project$Page$Resources$View$feastDayActivities, $author$project$Page$Resources$View$games])));
var $author$project$Page$Resources$View$viewBody = A2(
	$elm$html$Html$div,
	_List_Nil,
	_List_fromArray(
		[
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('max-w-3xl m-auto p-5')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$h1,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('my-10 leading-10')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Resources')
						])),
					$author$project$Page$Resources$View$viewAboutResources
				])),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mt-2 mb-20')
				]),
			_List_fromArray(
				[$author$project$Page$Signup$view4])),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('max-w-3xl m-auto p-5')
				]),
			_List_fromArray(
				[$author$project$Page$Resources$View$viewResourceGroups]))
		]));
var $author$project$Page$Resources$View$viewResources = function (resourceGroup) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('max-w-3xl'),
				$elm$html$Html$Attributes$class('m-auto'),
				$elm$html$Html$Attributes$class('p-5'),
				$elm$html$Html$Attributes$class('mb-10'),
				$elm$html$Html$Attributes$class('text-white')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h1,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('my-10 leading-10')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(resourceGroup.name)
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('mb-20')
					]),
				_List_fromArray(
					[$author$project$Page$Signup$view4])),
				A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(resourceGroup.description)
					])),
				A2(
				$elm$html$Html$div,
				_List_Nil,
				A2($elm$core$List$map, $author$project$Page$Resources$Helpers$viewResource, resourceGroup.resources))
			]));
};
var $author$project$Page$Resources$View$view = function (url) {
	var urlString = $elm$url$Url$toString(url);
	return A2($elm$core$String$contains, 'books', urlString) ? $author$project$Page$Resources$View$viewResources($author$project$Page$Resources$View$books) : (A2($elm$core$String$contains, 'games', urlString) ? $author$project$Page$Resources$View$viewResources($author$project$Page$Resources$View$games) : (A2($elm$core$String$contains, 'podcasts', urlString) ? $author$project$Page$Resources$View$viewResources($author$project$Page$Resources$View$podcasts) : (A2($elm$core$String$contains, 'prayer', urlString) ? $author$project$Page$Resources$Prayer$Main$view : (A2($elm$core$String$contains, 'subscriptions', urlString) ? $author$project$Page$Resources$View$viewResources($author$project$Page$Resources$View$subscriptions) : (A2($elm$core$String$contains, 'videos', urlString) ? $author$project$Page$Resources$View$viewResources($author$project$Page$Resources$View$videos) : A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'height', '100vh'),
				A2($elm$html$Html$Attributes$style, 'overflow-x', 'hidden'),
				A2($elm$html$Html$Attributes$style, 'overflow-y', 'auto'),
				A2($elm$html$Html$Attributes$style, 'perspective', '300px'),
				A2($elm$html$Html$Attributes$style, 'scroll-behavior', 'smooth'),
				$elm$html$Html$Attributes$class('text-white')
			]),
		_List_fromArray(
			[$author$project$Page$Resources$View$viewBody, $author$project$Component$Footer$viewFooter])))))));
};
var $author$project$Page$Saints$SaintHelpers$SaintRoute = function (a) {
	return {$: 'SaintRoute', a: a};
};
var $author$project$Page$Saints$SaintHelpers$urlSaintParser = A2(
	$elm$url$Url$Parser$questionMark,
	$elm$url$Url$Parser$s('saints'),
	$elm$url$Url$Parser$Query$string('s'));
var $author$project$Page$Saints$SaintHelpers$route = A2($elm$url$Url$Parser$map, $author$project$Page$Saints$SaintHelpers$SaintRoute, $author$project$Page$Saints$SaintHelpers$urlSaintParser);
var $author$project$Page$Saints$SaintHelpers$parseRoute = $elm$url$Url$Parser$parse($author$project$Page$Saints$SaintHelpers$route);
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $author$project$Page$Saints$Main$viewBackButton = A2(
	$elm$html$Html$a,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$href('/saints'),
			A2($elm$html$Html$Attributes$attribute, 'aria-label', 'Back to list of saints'),
			$elm$html$Html$Attributes$class('text-lg hover:underline hover:text-sky-500')
		]),
	_List_fromArray(
		[
			$elm$html$Html$text('Back')
		]));
var $author$project$Page$Saints$Main$viewFeastDay = function (saint) {
	return $elm$core$String$isEmpty(saint.feastDay) ? A2($elm$html$Html$span, _List_Nil, _List_Nil) : A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$span,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('font-bold')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Feast day: ')
					])),
				A2(
				$elm$html$Html$span,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(saint.feastDay)
					]))
			]));
};
var $author$project$Page$Saints$Main$ChangePatronageView = function (a) {
	return {$: 'ChangePatronageView', a: a};
};
var $author$project$Page$Saints$Main$Full = {$: 'Full'};
var $elm$core$Char$toUpper = _Char_toUpper;
var $author$project$Page$Saints$Main$viewPatronage = F2(
	function (model, saint) {
		var showFullOrPartial = function () {
			var _v2 = model.patronageView;
			if (_v2.$ === 'Full') {
				return $elm$core$Basics$identity;
			} else {
				return function (s) {
					return A2(
						$elm$core$String$join,
						' ',
						A2(
							$elm$core$List$take,
							80,
							A2($elm$core$String$split, ' ', s)));
				};
			}
		}();
		var cleanedPatronage = A3(
			$elm$core$String$slice,
			1,
			-1,
			A3($elm$core$String$replace, '\';\'', ', ', saint.patronOf));
		var capitalize = function (s) {
			var _v0 = $elm$core$String$uncons(s);
			if (_v0.$ === 'Just') {
				var _v1 = _v0.a;
				var c = _v1.a;
				var tail = _v1.b;
				return A2(
					$elm$core$String$cons,
					$elm$core$Char$toUpper(c),
					tail);
			} else {
				return s;
			}
		};
		var patronageList = capitalize(
			showFullOrPartial(cleanedPatronage));
		var isShowingEverything = _Utils_eq(
			$elm$core$String$length(cleanedPatronage),
			$elm$core$String$length(patronageList));
		var displayToggle = (_Utils_eq(model.patronageView, $author$project$Page$Saints$Main$Partial) && isShowingEverything) ? ' hidden' : '';
		return $elm$core$String$isEmpty(patronageList) ? A2($elm$html$Html$span, _List_Nil, _List_Nil) : A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('font-bold')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Patronage: ')
						])),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(patronageList + ' ')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('text-blue-500 cursor-pointer underline' + displayToggle),
							$elm$html$Html$Events$onClick(
							$author$project$Page$Saints$Main$ChangePatronageView(
								_Utils_eq(model.patronageView, $author$project$Page$Saints$Main$Full) ? $author$project$Page$Saints$Main$Partial : $author$project$Page$Saints$Main$Full))
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(
							_Utils_eq(model.patronageView, $author$project$Page$Saints$Main$Full) ? 'View Less' : 'View More')
						]))
				]));
	});
var $author$project$Page$Saints$Main$viewSaintPage = F2(
	function (model, saintName) {
		var maybeSaint = $elm$core$List$head(
			A2(
				$elm$core$List$filter,
				function (s) {
					return _Utils_eq(s.name, saintName);
				},
				model.saintList.saints));
		return A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('max-w-3xl mx-auto')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('mt-10')
								]),
							_List_fromArray(
								[$author$project$Page$Saints$Main$viewBackButton])),
							A2(
							$elm$html$Html$h1,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-center'),
									$elm$html$Html$Attributes$class('my-10')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(saintName)
								])),
							function () {
							if (maybeSaint.$ === 'Nothing') {
								var spinnerOrError = model.saintList.isLoading ? A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('text-center')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$span,
											_List_Nil,
											_List_fromArray(
												[
													$elm$html$Html$text('We are getting information for this saint, this may take some time.')
												])),
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('m-auto w-10 text-[#9200B3] mt-4')
												]),
											_List_fromArray(
												[
													$author$project$Component$Spinner$purpleSpinner(_List_Nil)
												]))
										])) : A2(
									$elm$html$Html$div,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$elm$html$Html$div,
											_List_Nil,
											_List_fromArray(
												[
													$elm$html$Html$text('Sorry, we had an error getting the information for this saint')
												]))
										]));
								return A2(
									$elm$html$Html$div,
									_List_Nil,
									_List_fromArray(
										[spinnerOrError]));
							} else {
								var saint = maybeSaint.a;
								var activities = A2(
									$elm$core$List$map,
									$elm$core$Tuple$second,
									$author$project$Page$Saints$SaintHelpers$activitiesFromSaint(saint));
								return A2(
									$elm$html$Html$div,
									_List_Nil,
									_List_fromArray(
										[
											$author$project$Page$Saints$Main$viewFeastDay(saint),
											A2($author$project$Page$Saints$Main$viewPatronage, model, saint),
											A2($author$project$Page$FeastDayActivities$FeastDayHelpers$viewAllActivities, model.saintList.isLoading, activities)
										]));
							}
						}()
						]))
				]));
	});
var $author$project$Page$Saints$Main$SetQuery = function (a) {
	return {$: 'SetQuery', a: a};
};
var $elm$regex$Regex$contains = _Regex_contains;
var $elm$regex$Regex$find = _Regex_findAtMost(_Regex_infinity);
var $author$project$Page$Saints$SaintHelpers$monthList = _List_fromArray(
	['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
var $elm$regex$Regex$never = _Regex_never;
var $author$project$Page$Saints$SaintHelpers$removeLeadingZero = function (input) {
	return (A2($elm$core$String$left, 1, input) === '0') ? A2($elm$core$String$dropLeft, 1, input) : input;
};
var $elm$core$String$trim = _String_trim;
var $author$project$Page$Saints$SaintHelpers$convertDate = function (input) {
	var monthPattern = A2(
		$elm$core$Maybe$withDefault,
		$elm$regex$Regex$never,
		$elm$regex$Regex$fromString('([a-zA-Z]+)'));
	var month = A2(
		$elm$core$Maybe$withDefault,
		'',
		$elm$core$List$head(
			function (monthQuery) {
				return A2(
					$elm$core$List$filter,
					function (m) {
						return A2(
							$elm$core$String$contains,
							monthQuery,
							$elm$core$String$toLower(m));
					},
					$author$project$Page$Saints$SaintHelpers$monthList);
			}(
				$elm$core$String$toLower(
					A2(
						$elm$core$Maybe$withDefault,
						'',
						A2(
							$elm$core$Maybe$map,
							function ($) {
								return $.match;
							},
							$elm$core$List$head(
								A2($elm$regex$Regex$find, monthPattern, input))))))));
	var datePattern = A2(
		$elm$core$Maybe$withDefault,
		$elm$regex$Regex$never,
		$elm$regex$Regex$fromString('([0-9]+)'));
	var date = $author$project$Page$Saints$SaintHelpers$removeLeadingZero(
		A2(
			$elm$core$Maybe$withDefault,
			'',
			A2(
				$elm$core$Maybe$map,
				function ($) {
					return $.match;
				},
				$elm$core$List$head(
					A2($elm$regex$Regex$find, datePattern, input)))));
	var converted = ((date === '') && (month === '')) ? $elm$core$String$trim(input) : $elm$core$String$trim(date + (' ' + month));
	return converted;
};
var $elm$html$Html$input = _VirtualDom_node('input');
var $elm$html$Html$Attributes$placeholder = $elm$html$Html$Attributes$stringProperty('placeholder');
var $author$project$Page$Saints$Main$saintSort = F3(
	function (model, a, b) {
		var bMatchesPatronage = A2(
			$elm$core$String$contains,
			$elm$core$String$toLower(model.query),
			$elm$core$String$toLower(b.patronOf));
		var bMatchesName = A2(
			$elm$core$String$contains,
			$elm$core$String$toLower(model.query),
			$elm$core$String$toLower(b.name));
		var bMatchesAltName = A2(
			$elm$core$String$contains,
			$elm$core$String$toLower(model.query),
			$elm$core$String$toLower(b.alternativeNames));
		var aMatchesPatronage = A2(
			$elm$core$String$contains,
			$elm$core$String$toLower(model.query),
			$elm$core$String$toLower(a.patronOf));
		var aMatchesName = A2(
			$elm$core$String$contains,
			$elm$core$String$toLower(model.query),
			$elm$core$String$toLower(a.name));
		var aMatchesAltName = A2(
			$elm$core$String$contains,
			$elm$core$String$toLower(model.query),
			$elm$core$String$toLower(a.alternativeNames));
		if (aMatchesName && (!bMatchesName)) {
			return $elm$core$Basics$LT;
		} else {
			if (bMatchesName && (!aMatchesName)) {
				return $elm$core$Basics$GT;
			} else {
				if (aMatchesAltName && (!bMatchesAltName)) {
					return $elm$core$Basics$LT;
				} else {
					if (bMatchesAltName && (!aMatchesAltName)) {
						return $elm$core$Basics$GT;
					} else {
						if (aMatchesPatronage && (!bMatchesPatronage)) {
							return $elm$core$Basics$LT;
						} else {
							if (bMatchesPatronage && (!aMatchesPatronage)) {
								return $elm$core$Basics$GT;
							} else {
								var bScore = A2(
									$elm$core$Maybe$withDefault,
									0,
									$elm$core$String$toInt(b.score));
								var aScore = A2(
									$elm$core$Maybe$withDefault,
									0,
									$elm$core$String$toInt(a.score));
								var _v0 = A2($elm$core$Basics$compare, aScore, bScore);
								switch (_v0.$) {
									case 'LT':
										return $elm$core$Basics$GT;
									case 'EQ':
										return $elm$core$Basics$EQ;
									default:
										return $elm$core$Basics$LT;
								}
							}
						}
					}
				}
			}
		}
	});
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $elm$url$Url$Builder$toQueryPair = function (_v0) {
	var key = _v0.a;
	var value = _v0.b;
	return key + ('=' + value);
};
var $elm$url$Url$Builder$toQuery = function (parameters) {
	if (!parameters.b) {
		return '';
	} else {
		return '?' + A2(
			$elm$core$String$join,
			'&',
			A2($elm$core$List$map, $elm$url$Url$Builder$toQueryPair, parameters));
	}
};
var $elm$url$Url$Builder$absolute = F2(
	function (pathSegments, parameters) {
		return '/' + (A2($elm$core$String$join, '/', pathSegments) + $elm$url$Url$Builder$toQuery(parameters));
	});
var $author$project$Page$Saints$Main$dropBefore = F2(
	function (delimiter, string) {
		if (!A2($elm$core$String$contains, delimiter, string)) {
			return string;
		} else {
			var _v0 = A2($elm$core$String$split, delimiter, string);
			if (_v0.b) {
				var after = _v0.b;
				return A2($elm$core$String$join, ';', after);
			} else {
				return string;
			}
		}
	});
var $elm$core$String$right = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(
			$elm$core$String$slice,
			-n,
			$elm$core$String$length(string),
			string);
	});
var $author$project$Page$Saints$Main$takeUntil = F2(
	function (delimiter, string) {
		var _v0 = A2($elm$core$String$split, delimiter, string);
		if (_v0.b) {
			var before = _v0.a;
			return before;
		} else {
			return string;
		}
	});
var $author$project$Page$Saints$Main$highlightString = F3(
	function (clip, substring, string) {
		var parts = A2(
			$elm$core$String$split,
			$elm$core$String$toLower(substring),
			$elm$core$String$toLower(string));
		if ((substring === '') || ($elm$core$List$length(parts) === 1)) {
			return A2(
				$elm$html$Html$span,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(string)
					]));
		} else {
			if (parts.b) {
				var before = parts.a;
				var highlightedText = A3(
					$elm$core$String$slice,
					$elm$core$String$length(before),
					$elm$core$String$length(before) + $elm$core$String$length(substring),
					string);
				var beforeText = A2(
					$author$project$Page$Saints$Main$dropBefore,
					';',
					function (s) {
						return clip ? A2($elm$core$String$right, 10, s) : s;
					}(
						A2(
							$elm$core$String$left,
							$elm$core$String$length(before),
							string)));
				var beforeElipsis = _Utils_eq(
					$elm$core$String$length(before),
					$elm$core$String$length(beforeText)) ? '' : '...';
				var afterText = A2(
					$author$project$Page$Saints$Main$takeUntil,
					';',
					function (s) {
						return clip ? A2($elm$core$String$left, 20, s) : s;
					}(
						A2(
							$elm$core$String$dropLeft,
							$elm$core$String$length(before) + $elm$core$String$length(substring),
							string)));
				var afterElipsis = _Utils_eq(
					$elm$core$String$length(afterText),
					$elm$core$String$length(
						A2(
							$elm$core$String$dropLeft,
							$elm$core$String$length(before) + $elm$core$String$length(substring),
							string))) ? '' : '...';
				return A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text(beforeElipsis)
								])),
							A2(
							$elm$html$Html$span,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text(beforeText)
								])),
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('bg-yellow-200')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(highlightedText)
								])),
							A2(
							$elm$html$Html$span,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text(afterText)
								])),
							A2(
							$elm$html$Html$span,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text(afterElipsis)
								]))
						]));
			} else {
				return A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(string)
						]));
			}
		}
	});
var $elm$url$Url$Builder$QueryParameter = F2(
	function (a, b) {
		return {$: 'QueryParameter', a: a, b: b};
	});
var $elm$url$Url$Builder$string = F2(
	function (key, value) {
		return A2(
			$elm$url$Url$Builder$QueryParameter,
			$elm$url$Url$percentEncode(key),
			$elm$url$Url$percentEncode(value));
	});
var $author$project$Page$Saints$Main$viewSaint = F2(
	function (model, saint) {
		var patronage = A3(
			$elm$core$String$slice,
			1,
			-1,
			A3($elm$core$String$replace, '\';\'', ', ', saint.patronOf));
		var nameHighlight = A3($author$project$Page$Saints$Main$highlightString, false, model.query, saint.name);
		var altNames = A3(
			$elm$core$String$slice,
			1,
			-1,
			A3($elm$core$String$replace, '\';\'', ', ', saint.alternativeNames));
		var extra = (model.query === '') ? A2($elm$html$Html$span, _List_Nil, _List_Nil) : (A2(
			$elm$core$String$contains,
			$elm$core$String$toLower(model.query),
			$elm$core$String$toLower(saint.name)) ? A2($elm$html$Html$span, _List_Nil, _List_Nil) : (A2(
			$elm$core$String$contains,
			$elm$core$String$toLower(model.query),
			$elm$core$String$toLower(altNames)) ? A2(
			$elm$html$Html$span,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Also called: '),
					A3($author$project$Page$Saints$Main$highlightString, true, model.query, altNames)
				])) : (A2(
			$elm$core$String$contains,
			$elm$core$String$toLower(
				$author$project$Page$Saints$SaintHelpers$convertDate(model.query)),
			$elm$core$String$toLower(saint.feastDay)) ? A2(
			$elm$html$Html$span,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Feast Day: '),
					A3(
					$author$project$Page$Saints$Main$highlightString,
					true,
					$author$project$Page$Saints$SaintHelpers$convertDate(model.query),
					saint.feastDay)
				])) : (A2(
			$elm$core$String$contains,
			$elm$core$String$toLower(model.query),
			$elm$core$String$toLower(patronage)) ? A2(
			$elm$html$Html$span,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Patronage: '),
					A3($author$project$Page$Saints$Main$highlightString, true, model.query, patronage)
				])) : A2($elm$html$Html$span, _List_Nil, _List_Nil)))));
		return A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$a,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$href(
							A2(
								$elm$url$Url$Builder$absolute,
								_List_fromArray(
									['saints']),
								_List_fromArray(
									[
										A2($elm$url$Url$Builder$string, 's', saint.name)
									]))),
							A2($elm$html$Html$Attributes$attribute, 'aria-label', saint.name),
							$elm$html$Html$Attributes$class('transition hover:underline hover:text-sky-500')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('pr-3')
								]),
							_List_fromArray(
								[nameHighlight])),
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('opacity-50')
								]),
							_List_fromArray(
								[extra]))
						]))
				]));
	});
var $author$project$Page$Saints$Main$viewSaints = function (model) {
	var query = $elm$core$String$toLower(model.query);
	var isLoadingClass = model.saintList.isLoading ? '' : 'hidden';
	var filteredSaints = $elm$core$String$isEmpty(query) ? model.saintList.saints : A2(
		$elm$core$List$sortWith,
		$author$project$Page$Saints$Main$saintSort(model),
		A2(
			$elm$core$List$filter,
			function (s) {
				return A2(
					$elm$core$String$contains,
					$elm$core$String$toLower(query),
					$elm$core$String$toLower(s.name)) || (A2(
					$elm$core$String$contains,
					$elm$core$String$toLower(query),
					$elm$core$String$toLower(s.alternativeNames)) || (A2(
					$elm$regex$Regex$contains,
					A2(
						$elm$core$Maybe$withDefault,
						$elm$regex$Regex$never,
						$elm$regex$Regex$fromString(
							'^' + $elm$core$String$toLower(
								$author$project$Page$Saints$SaintHelpers$convertDate(query)))),
					$elm$core$String$toLower(s.feastDay)) || A2(
					$elm$core$String$contains,
					$elm$core$String$toLower(query),
					$elm$core$String$toLower(s.patronOf))));
			},
			model.saintList.saints));
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('max-w-3xl mx-auto pt-10')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$h1,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text('List of Saints and Blesseds')
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('mb-10 mt-5')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$p,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('Find the saints you are looking for here.')
									])),
								A2(
								$elm$html$Html$p,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('mt-2')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('This is an extensive but not exhaustive list of the saints and blesseds recognized by the Catholic Church.')
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
										_List_Nil,
										_List_fromArray(
											[
												$elm$html$Html$text('Information about these saints can be found at ')
											])),
										A2(
										$elm$html$Html$a,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$href('https://www.catholic.org/saints/stindex.php'),
												$elm$html$Html$Attributes$rel('noopener'),
												$elm$html$Html$Attributes$target('_blank'),
												$elm$html$Html$Attributes$class('underline'),
												A2($elm$html$Html$Attributes$attribute, 'aria-label', 'Catholic Online')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Catholic Online')
											])),
										A2(
										$elm$html$Html$span,
										_List_Nil,
										_List_fromArray(
											[
												$elm$html$Html$text(', ')
											])),
										A2(
										$elm$html$Html$a,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$href('https://mycatholic.life/saints/'),
												$elm$html$Html$Attributes$rel('noopener'),
												$elm$html$Html$Attributes$target('_blank'),
												$elm$html$Html$Attributes$class('underline'),
												A2($elm$html$Html$Attributes$attribute, 'aria-label', 'My Catholic Lif')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('My Catholic Life')
											])),
										A2(
										$elm$html$Html$span,
										_List_Nil,
										_List_fromArray(
											[
												$elm$html$Html$text(', or ')
											])),
										A2(
										$elm$html$Html$a,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$href('https://catholicsaints.info/'),
												$elm$html$Html$Attributes$rel('noopener'),
												$elm$html$Html$Attributes$target('_blank'),
												$elm$html$Html$Attributes$class('underline'),
												A2($elm$html$Html$Attributes$attribute, 'aria-label', 'Catholic Saints Info')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Catholic Saints Info')
											]))
									]))
							]))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('max-w-3xl mx-auto pb-10')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$p,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('opacity-70')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Try searching by name, date (July 25), or patronage (nurse).')
									]))
							])),
						A2(
						$elm$html$Html$input,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$type_('text'),
								$elm$html$Html$Attributes$placeholder('Search for a Saint'),
								$elm$html$Html$Attributes$value(model.query),
								$elm$html$Html$Events$onInput($author$project$Page$Saints$Main$SetQuery),
								A2($elm$html$Html$Attributes$style, 'box-shadow', '#777 1px 1px 5px'),
								$elm$html$Html$Attributes$class('rounded p-4 mb-4 text-lg w-full text-xl text-black')
							]),
						_List_Nil),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-center ' + isLoadingClass)
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('mb-4')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('We are getting the list of saints, this may take some time.')
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('m-auto w-10 text-[#9200B3]')
									]),
								_List_fromArray(
									[
										$author$project$Component$Spinner$purpleSpinner(_List_Nil)
									]))
							])),
						((!model.saintList.isLoading) && (!$elm$core$List$length(filteredSaints))) ? A2(
						$elm$html$Html$p,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text('Sorry, we couldn\'t find any results for your search. ')
							])) : A2(
						$elm$html$Html$div,
						_List_Nil,
						A2(
							$elm$core$List$map,
							$author$project$Page$Saints$Main$viewSaint(model),
							filteredSaints))
					]))
			]));
};
var $author$project$Page$Saints$Main$viewBody = F2(
	function (model, saintName) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('bg-black text-white')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							function () {
							if (saintName.$ === 'Just') {
								var s = saintName.a;
								return A2($author$project$Page$Saints$Main$viewSaintPage, model, s);
							} else {
								return $author$project$Page$Saints$Main$viewSaints(model);
							}
						}()
						]))
				]));
	});
var $author$project$Page$Saints$Main$view = function (model) {
	var currentRoute = $author$project$Page$Saints$SaintHelpers$parseRoute(model.url);
	return {
		body: _List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						function () {
						if (currentRoute.$ === 'Just') {
							var s = currentRoute.a.a;
							return A2($author$project$Page$Saints$Main$viewBody, model, s);
						} else {
							return A2($author$project$Page$Saints$Main$viewBody, model, $elm$core$Maybe$Nothing);
						}
					}(),
						$author$project$Component$Footer$viewFooter
					]))
			]),
		title: 'Saints - Claritas Studios'
	};
};
var $author$project$Page$Shop$View$viewAboutShopItems = A2(
	$elm$html$Html$div,
	_List_Nil,
	_List_fromArray(
		[
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Get Catholic resources to help your little Catholics learn to love God and neighbor.')
				]))
		]));
var $author$project$Page$Shop$View$viewEtsyLink = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('flex flex-col gap-4 items-center md:items-start')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h2,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$a,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$href('https://catholicstories.etsy.com'),
							$elm$html$Html$Attributes$target('_blank')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Etsy Shop')
						]))
				])),
			A2(
			$elm$html$Html$a,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$href('https://catholicstories.etsy.com'),
					$elm$html$Html$Attributes$target('_blank'),
					$elm$html$Html$Attributes$class('w-72')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$img,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$src('/assets/images/shop/etsy.png'),
							$elm$html$Html$Attributes$alt('Etsy Shop Link'),
							A2($elm$html$Html$Attributes$style, 'border-radius', '5px')
						]),
					_List_Nil),
					A2(
					$elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('Visit our Etsy shop for Catholic printables.')
						]))
				]))
		]));
var $author$project$Page$Shop$View$viewPrintfulLink = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('flex flex-col gap-4 items-center md:items-start')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h2,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$a,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$href('https://catholicstoriesforchildren.printful.me/'),
							$elm$html$Html$Attributes$target('_blank')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Printful Shop')
						]))
				])),
			A2(
			$elm$html$Html$a,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$href('https://catholicstoriesforchildren.printful.me/'),
					$elm$html$Html$Attributes$target('_blank'),
					$elm$html$Html$Attributes$class('w-72')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$img,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$src('/assets/images/shop/printful.png'),
							$elm$html$Html$Attributes$alt('Printful Shop Link'),
							A2($elm$html$Html$Attributes$style, 'border-radius', '5px')
						]),
					_List_Nil),
					A2(
					$elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('Visit our Printful shop for Catholic Stories for Children Merch! We have stickers, cups, mugs, shirts, sweatshirts, and more!')
						]))
				]))
		]));
var $author$project$Page$Shop$View$viewBody = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('max-w-3xl'),
			$elm$html$Html$Attributes$class('m-auto'),
			$elm$html$Html$Attributes$class('p-5'),
			$elm$html$Html$Attributes$class('mb-10')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h1,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-10 leading-10')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Shop')
				])),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mb-20')
				]),
			_List_fromArray(
				[$author$project$Page$Shop$View$viewAboutShopItems])),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('grid grid-cols-1 md:grid-cols-2 gap-10'),
					$elm$html$Html$Attributes$class('m-auto')
				]),
			_List_fromArray(
				[$author$project$Page$Shop$View$viewEtsyLink, $author$project$Page$Shop$View$viewPrintfulLink]))
		]));
var $author$project$Page$Shop$View$view = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'height', '100vh'),
			A2($elm$html$Html$Attributes$style, 'overflow-x', 'hidden'),
			A2($elm$html$Html$Attributes$style, 'overflow-y', 'auto'),
			A2($elm$html$Html$Attributes$style, 'perspective', '300px'),
			A2($elm$html$Html$Attributes$style, 'scroll-behavior', 'smooth'),
			A2($elm$html$Html$Attributes$style, 'background-color', '#FEF7F4')
		]),
	_List_fromArray(
		[$author$project$Page$Shop$View$viewBody, $author$project$Component$Footer$viewFooter]));
var $author$project$Page$Team$View$viewAbout = A2(
	$elm$html$Html$div,
	_List_Nil,
	_List_fromArray(
		[
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mb-4')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Claritas Studios is a 501(c)(3) nonprofit built with a passion for spreading God\'s love to hearts around the world through engaging and beautiful stories, animations, and music.')
				])),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('We envision our work nurturing people of all ages around the world in their spiritual development by providing captivating and faith-filled stories that instill Catholic values and a deep connection to the Catholic faith.')
				])),
			A2(
			$elm$html$Html$h2,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-7')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Vision')
				])),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Claritas Studios envisions our work nurturing people of all ages around the world in their spiritual development by providing captivating and faith-filled stories that instill Catholic values and a deep connection to the Catholic faith.')
				])),
			A2(
			$elm$html$Html$h2,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-7')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Mission')
				])),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('The mission of Claritas Studios is to engage future saints with the Catholic faith through stories that inspire, educate, and foster an understanding of the beauty and joy of God\'s love.')
				])),
			A2(
			$elm$html$Html$h2,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-7'),
					$elm$html$Html$Attributes$id('contact')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Contact')
				])),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Please reach out. I love to hear from you!!!')
				])),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[$author$project$Component$Social$email])),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$a,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$href('https://calendar.app.google/PBwGTHVqb44PuRTH9'),
							$elm$html$Html$Attributes$class('text-blue-600'),
							$elm$html$Html$Attributes$target('_blank')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Schedule a meeting with me!')
						]))
				]))
		]));
var $author$project$Page$Team$View$viewInTheMedia = A2(
	$elm$html$Html$div,
	_List_Nil,
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h2,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-10')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('In The Media')
				])),
			A2(
			$elm$html$Html$div,
			_List_Nil,
			A2(
				$elm$core$List$map,
				$author$project$Page$Resources$Helpers$viewResource,
				_List_fromArray(
					[$author$project$Page$Team$View$spiritFilledMedia, $author$project$Page$Team$View$makeJoyNormal, $author$project$Page$Team$View$christianChannel, $author$project$Page$Team$View$ocCatholic, $author$project$Page$Team$View$inHisImage, $author$project$Page$Team$View$cfnLive])))
		]));
var $author$project$Page$Team$Team$aaron = {description: 'Fr. Aaron is the associate chaplain in Saint Irenaeus Parish in Cypress, CA.', image: $author$project$Page$Team$Team$imagePath + 'FrAaron.jpeg', initials: '', name: 'Father Aaron Galvizo, A.M.', position: 'Alagad ni Maria', socials: _List_Nil};
var $author$project$Page$Team$Team$chris = {description: 'Chris Pagel is the assistant dean of Graduate Business Programs and Career Services at ' + 'Chapman University\'s George L. Argyros School of Business and Economics.', image: $author$project$Page$Team$Team$imagePath + 'ChrisPagel.jpeg', initials: '', name: 'Christopher Pagel', position: 'Assistant Dean', socials: _List_Nil};
var $author$project$Page$Team$Team$fredrick = {description: 'Fr. Fredrick is a former chaplain of Santa Margarita Catholic High School and CHOC, ' + ('former Parochial Vicar of St. Irenaeus Catholic Church, Church of St. Pius X, ' + 'and Our Lady of Mt. Carmel Church.'), image: $author$project$Page$Team$Team$imagePath + 'FrDodik.jpeg', initials: '', name: 'Father Fredrick Miras, A.M.', position: 'Alagad ni Maria', socials: _List_Nil};
var $author$project$Page$Team$Team$boardOfAdvisors = _List_fromArray(
	[$author$project$Page$Team$Team$fredrick, $author$project$Page$Team$Team$aaron, $author$project$Page$Team$Team$chris]);
var $author$project$Page$Team$Team$danaMiller = {description: '', image: $author$project$Page$Team$Team$imagePath + 'DanaMiller.jpeg', initials: 'DM', name: 'Dana Miller', position: 'Voice Actor', socials: _List_Nil};
var $author$project$Page$Team$Team$dominicGrodi = {description: '', image: '', initials: 'DG', name: 'Dominic Grodi', position: 'Singer and Voice Actor', socials: _List_Nil};
var $author$project$Page$Team$Team$ekaterina = {
	description: 'Ekaterina is a skilled artist presenting a unique approach to developing visually appealing designs.',
	image: $author$project$Page$Team$Team$imagePath + 'Ekaterina.png',
	initials: 'ES',
	name: 'Ekaterina Soyuznova',
	position: 'Visual Development Artist',
	socials: _List_fromArray(
		[
			_Utils_Tuple2($author$project$Component$Social$Website, 'https://www.ekaterinasoyuznova.com/'),
			_Utils_Tuple2($author$project$Component$Social$Instagram, 'https://www.instagram.com/soyuznova_ekaterina/'),
			_Utils_Tuple2($author$project$Component$Social$Facebook, 'https://www.facebook.com/kate.soyuznova/'),
			_Utils_Tuple2($author$project$Component$Social$Twitter, 'https://twitter.com/Kati45413104'),
			_Utils_Tuple2($author$project$Component$Social$YouTube, 'https://www.youtube.com/channel/UCgc9v2t9OtqQEw_D4jKgbew')
		])
};
var $author$project$Page$Team$Team$emmaGreene = {
	description: 'Emma is a graphic designer with an eye for detail and a desire ' + 'to captivate the wonder of the world through art. ',
	image: $author$project$Page$Team$Team$imagePath + 'EmmaGreene.jpeg',
	initials: 'EG',
	name: 'Emma Greene',
	position: 'Designer and Illustrator',
	socials: _List_fromArray(
		[
			_Utils_Tuple2($author$project$Component$Social$Instagram, 'https://www.instagram.com/emmarosecreative')
		])
};
var $author$project$Page$Team$Team$ethanNagy = {description: '', image: '', initials: 'EN', name: 'Ethan Nagy', position: 'Singer and Voice Actor', socials: _List_Nil};
var $author$project$Page$Team$Team$fernandoAlanis = {
	description: 'Fernando is passionate for film, videogames and music. He is passionate about telling stories through sound. ',
	image: '',
	initials: 'FA',
	name: 'Fernando J Alanis',
	position: 'Sound Design and Re-Recording Mixer',
	socials: _List_fromArray(
		[
			_Utils_Tuple2($author$project$Component$Social$Website, 'https://www.alanissound.com/'),
			_Utils_Tuple2($author$project$Component$Social$IMDB, 'https://www.imdb.com/name/nm8854188/'),
			_Utils_Tuple2($author$project$Component$Social$Facebook, 'https://www.facebook.com/alanissound'),
			_Utils_Tuple2($author$project$Component$Social$LinkedIn, 'http://www.linkedin.com/in/alanissound')
		])
};
var $author$project$Page$Team$Team$francescoSchito = {
	description: 'Artist, 3D Motion Designer, Husband and Father.',
	image: '',
	initials: 'FS',
	name: 'Francesco Schito',
	position: '3D Artist',
	socials: _List_fromArray(
		[
			_Utils_Tuple2($author$project$Component$Social$Instagram, 'https://www.instagram.com/francescoschito/?hl=en'),
			_Utils_Tuple2($author$project$Component$Social$YouTube, 'https://www.youtube.com/playlist?list=UUcaSHFPBBghZlWSePTZzwLw'),
			_Utils_Tuple2($author$project$Component$Social$IMDB, 'https://www.imdb.com/name/nm7877744/'),
			_Utils_Tuple2($author$project$Component$Social$Behance, 'https://www.behance.net/francescoschito')
		])
};
var $author$project$Page$Team$Team$italiaRose = {description: '', image: '', initials: 'IR', name: 'Italia Rose', position: 'Singer and Voice Actor', socials: _List_Nil};
var $author$project$Page$Team$Team$jadenLuo = {description: '', image: $author$project$Page$Team$Team$imagePath + 'JadenLuo.jpeg', initials: 'JL', name: 'Jaden Luo', position: 'Voice Actor', socials: _List_Nil};
var $author$project$Page$Team$Team$kelly = {
	description: 'Kelly is a part-time social media specialist and homeschools her four children on the east coast of Canada.',
	image: $author$project$Page$Team$Team$imagePath + 'KellyBriggs.jpeg',
	initials: 'KB',
	name: 'Kelly Briggs',
	position: 'Social Media Specialist',
	socials: _List_fromArray(
		[
			_Utils_Tuple2($author$project$Component$Social$Instagram, 'https://www.instagram.com/simplehomemom/'),
			_Utils_Tuple2($author$project$Component$Social$Facebook, 'https://www.facebook.com/simplehomemom'),
			_Utils_Tuple2($author$project$Component$Social$Pinterest, 'https://www.pinterest.com/simplehomemom/'),
			_Utils_Tuple2($author$project$Component$Social$Website, 'https://www.simplehomemom.com/')
		])
};
var $author$project$Page$Team$Team$makoAnimation = {
	description: 'Mako Animation is a creative studio that offers visual communication strategies ' + ('for all kinds of projects. They are passionate about ' + ('bringing original stories to life\nwith a unique and ' + 'creative narrative.')),
	image: $author$project$Page$Team$Team$imagePath + 'makoTeam.png',
	initials: 'MT',
	name: 'Mako Animation',
	position: 'Animation Team',
	socials: _List_fromArray(
		[
			_Utils_Tuple2($author$project$Component$Social$Website, 'https://makoanimation.mx/'),
			_Utils_Tuple2($author$project$Component$Social$Facebook, 'https://www.facebook.com/makoanimation/'),
			_Utils_Tuple2($author$project$Component$Social$Twitter, 'https://twitter.com/MakoAnimation'),
			_Utils_Tuple2($author$project$Component$Social$YouTube, 'https://www.youtube.com/channel/UCOszpOlqJxLtjpbTH7VN7Kg')
		])
};
var $author$project$Page$Team$Team$nickAndAlina = {
	description: 'Nick and Alina have been collaborators in songwriting and performing since 2006. They have fused their creative fires to illuminate the trials and triumphs of the human experience. The duo impacts their audiences through powerful testimony, moving vocals, and songs that burn through with Truth, Love, Inspiration, and Beauty. They are the founders of Awaken Catholic, producing songs, podcasts, and more reaching more than 2.2 million streams per month.',
	image: $author$project$Page$Team$Team$imagePath + 'NickAndAlina.jpeg',
	initials: 'ND',
	name: 'Nick and Alina De La Torre',
	position: 'Composer',
	socials: _List_fromArray(
		[
			_Utils_Tuple2($author$project$Component$Social$Website, 'http://nickandalina.com/'),
			_Utils_Tuple2($author$project$Component$Social$YouTube, 'https://www.youtube.com/nickalinadelatorre'),
			_Utils_Tuple2($author$project$Component$Social$Instagram, 'https://www.instagram.com/nickandalina/'),
			_Utils_Tuple2($author$project$Component$Social$Facebook, 'https://www.facebook.com/nickandalina/'),
			_Utils_Tuple2($author$project$Component$Social$Twitter, 'https://twitter.com/nickandalina_'),
			_Utils_Tuple2($author$project$Component$Social$Spotify, 'https://open.spotify.com/artist/3BHBEFqQWqROuXbQCSnb06?si=9Mh_b1M4T6S7nmsswkdHPQ&nd=1')
		])
};
var $author$project$Page$Team$Team$rachaelWorkmanMcLaughlin = {
	description: 'Rachael is passionate about telling stories through books, film, and dance. She is a graduate of John Paul the Great Catholic University and brings experience from Spirit Juice Studios and Family Theatre Productions.',
	image: $author$project$Page$Team$Team$imagePath + 'RachaelWorkman.jpeg',
	initials: 'RW',
	name: 'Rachael Workman-McLaughlin',
	position: 'Screenwriter',
	socials: _List_fromArray(
		[
			_Utils_Tuple2($author$project$Component$Social$LinkedIn, 'https://www.linkedin.com/in/rachael-workman/')
		])
};
var $author$project$Page$Team$Team$seanBeeson = {
	description: 'Sean Beeson is a composer for games, films, cartoons, trailers, and more. He is a highly sought-after composer for Catholic media. He has composed for the movies Mother Teresa: No Greater Love, St. Joseph: Our Spiritual Father, In Solidarity with Ukraine, and more. He is Roman Catholic, husband of 15 years, and father to seven children.',
	image: $author$project$Page$Team$Team$imagePath + 'SeanBeeson.jpeg',
	initials: 'SB',
	name: 'Sean Beeson',
	position: 'Composer',
	socials: _List_fromArray(
		[
			_Utils_Tuple2($author$project$Component$Social$Website, 'https://www.seanbeeson.com/'),
			_Utils_Tuple2($author$project$Component$Social$SoundCloud, 'https://soundcloud.com/sean-beeson'),
			_Utils_Tuple2($author$project$Component$Social$Facebook, 'https://www.facebook.com/gamecomposer'),
			_Utils_Tuple2($author$project$Component$Social$Twitter, 'https://twitter.com/seanbeeson'),
			_Utils_Tuple2($author$project$Component$Social$YouTube, 'https://www.youtube.com/user/Buckeye198181')
		])
};
var $author$project$Page$Team$Team$willMaciejewski = {
	description: 'Will is a freelance animator based in Arlington, Virginia. ',
	image: $author$project$Page$Team$Team$imagePath + 'Will.jpeg',
	initials: 'WM',
	name: 'Will Maciejewski',
	position: 'Producer and Animator',
	socials: _List_fromArray(
		[
			_Utils_Tuple2($author$project$Component$Social$Website, 'https://www.willmacmotion.com/'),
			_Utils_Tuple2($author$project$Component$Social$Instagram, 'https://www.instagram.com/willmacmotion/')
		])
};
var $author$project$Page$Team$Team$contractors = _List_fromArray(
	[$author$project$Page$Team$Team$kelly, $author$project$Page$Team$Team$nickAndAlina, $author$project$Page$Team$Team$seanBeeson, $author$project$Page$Team$Team$makoAnimation, $author$project$Page$Team$Team$ekaterina, $author$project$Page$Team$Team$rachaelWorkmanMcLaughlin, $author$project$Page$Team$Team$francescoSchito, $author$project$Page$Team$Team$willMaciejewski, $author$project$Page$Team$Team$emmaGreene, $author$project$Page$Team$Team$ethanNagy, $author$project$Page$Team$Team$italiaRose, $author$project$Page$Team$Team$dominicGrodi, $author$project$Page$Team$Team$fernandoAlanis, $author$project$Page$Team$Team$danaMiller, $author$project$Page$Team$Team$jadenLuo]);
var $author$project$Page$Team$Team$carlos = {description: '', image: $author$project$Page$Team$Team$imagePath + 'CarlosG.jpg', initials: '', name: 'Carlos Gutierrez', position: 'Business Consultant', socials: _List_Nil};
var $author$project$Page$Team$Team$staff = _List_fromArray(
	[$author$project$Page$Team$Team$trevor, $author$project$Page$Team$Team$carlos]);
var $author$project$Page$Team$Team$viewPeople = F3(
	function (title, description, people) {
		return A2(
			$elm$html$Html$div,
			_List_Nil,
			_Utils_ap(
				_List_fromArray(
					[
						A2(
						$elm$html$Html$h3,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-2xl my-5')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(title)
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('relative left-1/2 -translate-x-1/2')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(description)
							]))
					]),
				A2(
					$elm$core$List$map,
					function (person) {
						return A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('my-10')
								]),
							_List_fromArray(
								[
									$author$project$Page$Team$Team$viewPerson(person)
								]));
					},
					people)));
	});
var $author$project$Page$Team$View$viewTeam = A2(
	$elm$html$Html$div,
	_List_Nil,
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h2,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-10')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('The Team')
				])),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'margin-bottom', '100px')
				]),
			_List_fromArray(
				[
					A3($author$project$Page$Team$Team$viewPeople, 'Staff', '', $author$project$Page$Team$Team$staff)
				])),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'margin-bottom', '100px')
				]),
			_List_fromArray(
				[
					A3($author$project$Page$Team$Team$viewPeople, 'Board of Advisors', '', $author$project$Page$Team$Team$boardOfAdvisors)
				])),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'margin-bottom', '100px')
				]),
			_List_fromArray(
				[
					A3($author$project$Page$Team$Team$viewPeople, 'Talent', 'A number of talented artists, contractors, teams and people help bring these animations to life.', $author$project$Page$Team$Team$contractors)
				]))
		]));
var $author$project$Page$Team$View$viewBody = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('relative left-1/2 -translate-x-1/2'),
			A2($elm$html$Html$Attributes$style, 'width', '80%'),
			A2($elm$html$Html$Attributes$style, 'max-width', '800px')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h1,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('my-10')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('About Us')
				])),
			$author$project$Page$Team$View$viewAbout,
			$author$project$Page$Team$View$viewInTheMedia,
			$author$project$Page$Team$View$viewTeam
		]));
var $author$project$Page$Team$View$view = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'height', '100vh'),
			A2($elm$html$Html$Attributes$style, 'overflow-x', 'hidden'),
			$elm$html$Html$Attributes$class('bg-black text-white')
		]),
	_List_fromArray(
		[$author$project$Page$Team$View$viewBody, $author$project$Component$Footer$viewFooter]));
var $author$project$Component$Header$hamburgerMenuWithMsg = F2(
	function (menuOpen, openMsg) {
		var baseBtnAttrs = _List_fromArray(
			[
				$elm$html$Html$Events$onClick(openMsg),
				A2($elm$html$Html$Attributes$attribute, 'type', 'button'),
				A2(
				$elm$html$Html$Attributes$attribute,
				'aria-expanded',
				menuOpen ? 'true' : 'false'),
				A2(
				$elm$html$Html$Attributes$attribute,
				'aria-label',
				menuOpen ? 'Close menu' : 'Open menu'),
				$elm$html$Html$Attributes$class('relative w-10 h-10 grid place-content-center rounded focus:outline-none focus:ring-2 focus:ring-white/60')
			]);
		return menuOpen ? A2(
			$elm$html$Html$button,
			baseBtnAttrs,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('relative w-8 h-8')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('absolute left-0 top-1/2 -translate-y-1/2 w-8 h-0.5 bg-white rotate-45 transition')
								]),
							_List_Nil),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('absolute left-0 top-1/2 -translate-y-1/2 w-8 h-0.5 bg-white -rotate-45 transition')
								]),
							_List_Nil)
						]))
				])) : A2(
			$elm$html$Html$button,
			baseBtnAttrs,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('flex flex-col items-center justify-center gap-1.5 w-8 h-8')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('w-8 h-0.5 bg-white transition')
								]),
							_List_Nil),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('w-8 h-0.5 bg-white transition')
								]),
							_List_Nil),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('w-8 h-0.5 bg-white transition')
								]),
							_List_Nil)
						]))
				]));
	});
var $author$project$Component$Header$navigationWithMsg = F3(
	function (height, menuOpen, openMsg) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('w-full pr-2 justify-self-end')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('xl:hidden flex justify-end')
						]),
					_List_fromArray(
						[
							A2($author$project$Component$Header$hamburgerMenuWithMsg, menuOpen, openMsg)
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('hidden xl:block w-full')
						]),
					_List_fromArray(
						[
							$author$project$Component$Header$desktopNavigation(height)
						]))
				]));
	});
var $elm$core$Basics$clamp = F3(
	function (low, high, number) {
		return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
	});
var $elm$core$String$fromFloat = _String_fromNumber;
var $author$project$Component$Navigation$View$viewNavButton = F4(
	function (index, linkTarget, link, page) {
		var animationTime = $elm$core$String$fromFloat(
			A3($elm$core$Basics$clamp, 1, 3, index * 0.5));
		return A2(
			$elm$html$Html$a,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$href(link),
					$elm$html$Html$Attributes$class('hover:bg-csc-lightpurple'),
					$elm$html$Html$Attributes$class('py-5'),
					$elm$html$Html$Attributes$class('rounded-t'),
					A2($elm$html$Html$Attributes$style, 'animation', 'fadeIn ' + (animationTime + 's')),
					$elm$html$Html$Attributes$target(linkTarget)
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('m-auto')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(page)
						]))
				]));
	});
var $author$project$Component$Navigation$View$view = function (showHeader) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('bg-black')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('min-h-screen'),
						$elm$html$Html$Attributes$class('flex flex-col'),
						$elm$html$Html$Attributes$class('bg-black text-white'),
						$elm$html$Html$Attributes$class('pt-5 px-20'),
						$elm$html$Html$Attributes$class('text-semibold'),
						$elm$html$Html$Attributes$class('text-xl sm:text-2xl md:text-3xl')
					]),
				_List_fromArray(
					[
						A4($author$project$Component$Navigation$View$viewNavButton, 1, '_self', '/animations', 'Animations'),
						A4($author$project$Component$Navigation$View$viewNavButton, 2, '_self', '/feastdayactivities', 'Calendar'),
						A4($author$project$Component$Navigation$View$viewNavButton, 3, '_self', '/saints', 'Saints'),
						A4($author$project$Component$Navigation$View$viewNavButton, 4, '_self', '/resources', 'Resources'),
						A4($author$project$Component$Navigation$View$viewNavButton, 5, '_blank', 'https://shop.claritasstudios.com/', 'Shop'),
						A4($author$project$Component$Navigation$View$viewNavButton, 6, '_blank', 'https://blog.claritasstudios.com/', 'Blog'),
						A4($author$project$Component$Navigation$View$viewNavButton, 7, '_self', '/give', 'Donate'),
						A4($author$project$Component$Navigation$View$viewNavButton, 8, '_self', '/team', 'About Us'),
						A2(
						$elm$html$Html$a,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$href('/give'),
								$elm$html$Html$Attributes$class('block mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-semibold text-center transition-colors')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Support Us')
							]))
					]))
			]));
};
var $author$project$Component$Header$viewMenuOverlay = F2(
	function (height, menuOpen) {
		return (!menuOpen) ? $elm$html$Html$text('') : A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('fixed left-0 right-0 bottom-0 z-40 text-white overflow-y-auto bg-black bg-opacity-90 pointer-events-auto'),
					$elm$html$Html$Attributes$class('transition-opacity duration-150 ease-out opacity-100 translate-y-0'),
					$elm$html$Html$Attributes$class('top-[60px] md:top-[' + (height + ']')),
					A2($elm$html$Html$Attributes$attribute, 'role', 'dialog'),
					A2($elm$html$Html$Attributes$attribute, 'aria-modal', 'true')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('p-6 transition-transform duration-150 ease-out')
						]),
					_List_fromArray(
						[
							$author$project$Component$Navigation$View$view(false)
						]))
				]));
	});
var $author$project$Component$Header$viewSubpageHeaderWithMenuMsg = F4(
	function (currentPage, leftMargin, menuOpen, openMsg) {
		var isHomePage = currentPage === 'Claritas Studios';
		var _v0 = isHomePage ? _Utils_Tuple2('111px', 'grid-cols-[150px_1fr_150px] xl:grid-cols-[150px_1fr_600px]') : _Utils_Tuple2('60px', 'grid-cols-[150px_1fr_150px] xl:grid-cols-[150px_1fr_600px]');
		var height = _v0.a;
		var gridColsClass = _v0.b;
		return A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$nav,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							'fixed top-0 left-0 right-0 z-50 ' + (menuOpen ? 'bg-black' : 'bg-gradient-to-b from-black via-black/80 to-transparent'))
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('flex items-center justify-between px-4 md:px-12 py-4')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('grid items-center justify-items-center w-full ' + gridColsClass),
											$elm$html$Html$Attributes$class('h-[60px] md:h-[' + (height + ']'))
										]),
									_List_fromArray(
										[
											$author$project$Component$Header$viewLogo,
											A2($author$project$Component$Header$viewHeaderTitle, true, currentPage),
											A3($author$project$Component$Header$navigationWithMsg, height, menuOpen, openMsg)
										]))
								]))
						])),
					isHomePage ? A2($elm$html$Html$span, _List_Nil, _List_Nil) : A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('h-[60px] md:h-[' + (height + ']'))
						]),
					_List_Nil),
					A2($author$project$Component$Header$viewMenuOverlay, height, menuOpen)
				]));
	});
var $author$project$Component$Header$viewHeaderWithMenu = F4(
	function (currentPage, leftMargin, menuOpen, toggleMsg) {
		return A4($author$project$Component$Header$viewSubpageHeaderWithMenuMsg, currentPage, leftMargin, menuOpen, toggleMsg);
	});
var $author$project$Page$Animations$View$NextSlide = {$: 'NextSlide'};
var $author$project$Page$Animations$View$PrevSlide = {$: 'PrevSlide'};
var $author$project$Page$Home$Sections$viewCategories = function () {
	var viewCategoryRow = function (production) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mb-16 ml-4'),
					$elm$html$Html$Attributes$class('relative')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$h2,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('text-white text-2xl font-bold mb-4 pl-5')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(production.title)
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mb-16 relative pb-4')
						]),
					_List_fromArray(
						[
							$author$project$Page$Animations$View$viewEpisodes(production)
						]))
				]));
	};
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('bg-black py-16')
			]),
		A2($elm$core$List$map, viewCategoryRow, $author$project$Page$Animations$Productions$productions));
}();
var $author$project$Page$Home$Sections$viewMission = function () {
	var missionCard = F3(
		function (title, description, iconChar) {
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('rounded-2xl bg-gray-800/40 border border-gray-700/60 shadow-sm p-6 md:p-8')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('flex flex-col items-start text-left')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('w-12 h-12 rounded-xl bg-purple-500/15 text-purple-400 grid place-content-center text-2xl')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(iconChar)
									])),
								A2(
								$elm$html$Html$h3,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('mt-4 font-semibold text-lg md:text-xl text-white')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(title)
									])),
								A2(
								$elm$html$Html$p,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('text-sm md:text-base text-gray-300 mt-2')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(description)
									]))
							]))
					]));
		});
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('bg-gray-900 py-16 px-6 text-white text-center flex flex-col items-center')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h2,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('text-3xl md:text-4xl font-bold mb-2')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Our Mission')
					])),
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('max-w-2xl text-lg mx-auto text-center opacity-90')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Claritas Studios is a 501(c)(3) nonprofit with the mission to engage future saints with the Catholic faith through stories that inspire, educate, and foster an understanding of the beauty and joy of God\'s love.')
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('max-w-5xl w-full mx-auto mt-8 space-y-6')
					]),
				_List_fromArray(
					[
						A3(missionCard, 'Faith Formation', 'Building strong spiritual foundations through engaging content that brings the Catholic faith to life for young hearts.', '❤'),
						A3(missionCard, 'Educational Excellence', 'Combining entertainment with learning to create memorable experiences that teach and inspire.', '📘'),
						A3(missionCard, 'Family-Centered', 'Content that brings families together, creating shared moments of faith and joy.', '👨\u200D👩\u200D👧'),
						A3(missionCard, 'Artistic Innovation', 'High-quality animation and storytelling that captures imagination and hearts.', '✨')
					]))
			]));
}();
var $elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var $elm$svg$Svg$Attributes$strokeLinecap = _VirtualDom_attribute('stroke-linecap');
var $elm$svg$Svg$Attributes$strokeLinejoin = _VirtualDom_attribute('stroke-linejoin');
var $elm$svg$Svg$Attributes$points = _VirtualDom_attribute('points');
var $elm$svg$Svg$polygon = $elm$svg$Svg$trustedNode('polygon');
var $elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var $author$project$Page$Animations$Helpers$Carousel$viewSlide = F3(
	function (_v0, _v1, production) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('w-full h-screen flex-shrink-0 transition-transform duration-500 ease-in-out relative'),
					A2($elm$html$Html$Attributes$style, 'background-image', 'linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(\'' + (production.carouselThumbnail + '\')')),
					A2($elm$html$Html$Attributes$style, 'background-size', 'cover'),
					A2($elm$html$Html$Attributes$style, 'background-position', 'center'),
					A2($elm$html$Html$Attributes$style, 'background-repeat', 'no-repeat')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('relative h-full flex items-center px-4 md:px-12')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('max-w-2xl space-y-6 pl-8')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$h1,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('text-5xl md:text-7xl font-bold text-white leading-tight')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(production.title)
										])),
									A2(
									$elm$html$Html$p,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('text-xl md:text-2xl text-gray-200 max-w-md')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(production.shortDescription)
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('flex items-center space-x-4')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$a,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$href(production.link),
													$elm$html$Html$Attributes$class('bg-white hover:bg-gray-200 text-black px-8 py-4 rounded font-bold text-lg flex items-center space-x-2 transition')
												]),
											_List_fromArray(
												[
													A2(
													$elm$svg$Svg$svg,
													_List_fromArray(
														[
															$elm$svg$Svg$Attributes$width('24'),
															$elm$svg$Svg$Attributes$height('24'),
															$elm$svg$Svg$Attributes$viewBox('0 0 24 24')
														]),
													_List_fromArray(
														[
															A2(
															$elm$svg$Svg$polygon,
															_List_fromArray(
																[
																	$elm$svg$Svg$Attributes$points('6 3 20 12 6 21 6 3')
																]),
															_List_Nil)
														])),
													A2(
													$elm$html$Html$span,
													_List_Nil,
													_List_fromArray(
														[
															$elm$html$Html$text('Play')
														]))
												])),
											A2(
											$elm$html$Html$a,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$href(production.link + '?tab=details'),
													$elm$html$Html$Attributes$class('bg-gray-600/80 hover:bg-gray-600 text-white px-8 py-4 rounded font-bold text-lg flex items-center space-x-2 transition'),
													A2($elm$html$Html$Attributes$attribute, 'aria-label', 'Learn more about ' + production.title)
												]),
											_List_fromArray(
												[
													A2(
													$elm$svg$Svg$svg,
													_List_fromArray(
														[
															$elm$svg$Svg$Attributes$width('24'),
															$elm$svg$Svg$Attributes$height('24'),
															$elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
															$elm$svg$Svg$Attributes$fill('none'),
															$elm$svg$Svg$Attributes$stroke('currentColor'),
															$elm$svg$Svg$Attributes$strokeWidth('2'),
															$elm$svg$Svg$Attributes$strokeLinecap('round'),
															$elm$svg$Svg$Attributes$strokeLinejoin('round')
														]),
													_List_fromArray(
														[
															A2(
															$elm$svg$Svg$circle,
															_List_fromArray(
																[
																	$elm$svg$Svg$Attributes$cx('12'),
																	$elm$svg$Svg$Attributes$cy('12'),
																	$elm$svg$Svg$Attributes$r('10')
																]),
															_List_Nil),
															A2(
															$elm$svg$Svg$path,
															_List_fromArray(
																[
																	$elm$svg$Svg$Attributes$d('M12 16v-4')
																]),
															_List_Nil),
															A2(
															$elm$svg$Svg$path,
															_List_fromArray(
																[
																	$elm$svg$Svg$Attributes$d('M12 8h.01')
																]),
															_List_Nil)
														])),
													A2(
													$elm$html$Html$span,
													_List_Nil,
													_List_fromArray(
														[
															$elm$html$Html$text('More Info')
														]))
												]))
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('flex items-center space-x-4 mt-8 text-white/80')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$span,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('text-sm font-medium px-2 py-1 border border-gray-400 rounded')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text(production.age)
												])),
											A2(
											$elm$html$Html$span,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('text-sm font-medium')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text(production.year)
												]))
										]))
								]))
						]))
				]));
	});
var $author$project$Page$Animations$Helpers$Carousel$viewSlides = F3(
	function (carousel, nextSlide, prevSlide) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('relative h-screen overflow-hidden')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('flex transition-transform duration-500 ease-in-out w-full h-full'),
							A2(
							$elm$html$Html$Attributes$style,
							'transform',
							'translateX(-' + ($elm$core$String$fromInt(carousel.currentIndex * 100) + '%)'))
						]),
					A2(
						$elm$core$List$indexedMap,
						$author$project$Page$Animations$Helpers$Carousel$viewSlide(carousel.currentIndex),
						carousel.items)),
					A2(
					$elm$html$Html$button,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/30 text-white rounded-full hover:bg-white/50 transition group'),
							$elm$html$Html$Attributes$type_('button'),
							A2($elm$html$Html$Attributes$attribute, 'aria-label', 'Previous slide'),
							A2($elm$html$Html$Attributes$attribute, 'title', 'Previous slide'),
							$elm$html$Html$Events$onClick(prevSlide)
						]),
					_List_fromArray(
						[
							A2(
							$elm$svg$Svg$svg,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$width('40'),
									$elm$svg$Svg$Attributes$height('40'),
									$elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
									$elm$svg$Svg$Attributes$class('group-hover:scale-110 transition'),
									A2($elm$html$Html$Attributes$attribute, 'aria-hidden', 'true'),
									A2($elm$html$Html$Attributes$attribute, 'focusable', 'false')
								]),
							_List_fromArray(
								[
									A2(
									$elm$svg$Svg$path,
									_List_fromArray(
										[
											$elm$svg$Svg$Attributes$d('M15 18l-6-6 6-6'),
											$elm$svg$Svg$Attributes$stroke('currentColor'),
											$elm$svg$Svg$Attributes$strokeWidth('2'),
											$elm$svg$Svg$Attributes$fill('none'),
											$elm$svg$Svg$Attributes$strokeLinecap('round'),
											$elm$svg$Svg$Attributes$strokeLinejoin('round')
										]),
									_List_Nil)
								]))
						])),
					A2(
					$elm$html$Html$button,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/30 text-white rounded-full hover:bg-white/50 transition group'),
							$elm$html$Html$Attributes$type_('button'),
							A2($elm$html$Html$Attributes$attribute, 'aria-label', 'Next slide'),
							A2($elm$html$Html$Attributes$attribute, 'title', 'Next slide'),
							$elm$html$Html$Events$onClick(nextSlide)
						]),
					_List_fromArray(
						[
							A2(
							$elm$svg$Svg$svg,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$width('40'),
									$elm$svg$Svg$Attributes$height('40'),
									$elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
									$elm$svg$Svg$Attributes$class('group-hover:scale-110 transition'),
									A2($elm$html$Html$Attributes$attribute, 'aria-hidden', 'true'),
									A2($elm$html$Html$Attributes$attribute, 'focusable', 'false')
								]),
							_List_fromArray(
								[
									A2(
									$elm$svg$Svg$path,
									_List_fromArray(
										[
											$elm$svg$Svg$Attributes$d('M9 18l6-6-6-6'),
											$elm$svg$Svg$Attributes$stroke('currentColor'),
											$elm$svg$Svg$Attributes$strokeWidth('2'),
											$elm$svg$Svg$Attributes$fill('none'),
											$elm$svg$Svg$Attributes$strokeLinecap('round'),
											$elm$svg$Svg$Attributes$strokeLinejoin('round')
										]),
									_List_Nil)
								]))
						]))
				]));
	});
var $author$project$Page$Home$Sections$substackEmbedUrl = 'https://blog.claritasstudios.com/embed';
var $author$project$Page$Home$Sections$viewStayConnected = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('bg-gradient-to-r from-purple-600 to-indigo-600 py-16 px-6 text-center text-white')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h2,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('text-3xl md:text-4xl font-bold mb-2')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Stay Connected')
					])),
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('mb-6 text-lg max-w-3xl mx-auto')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Get notified about new stories, activities, and special content for your family.')
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('max-w-3xl mx-auto')
					]),
				_List_fromArray(
					[
						model.substackLoaded ? A2(
						$elm$html$Html$iframe,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$src($author$project$Page$Home$Sections$substackEmbedUrl),
								$elm$html$Html$Attributes$title('Substack Signup'),
								A2($elm$html$Html$Attributes$attribute, 'loading', 'lazy'),
								A2($elm$html$Html$Attributes$attribute, 'referrerpolicy', 'no-referrer-when-downgrade'),
								A2($elm$html$Html$Attributes$attribute, 'sandbox', 'allow-forms allow-scripts allow-popups allow-top-navigation-by-user-activation allow-same-origin'),
								$elm$html$Html$Attributes$class('rounded bg-transparent'),
								A2($elm$html$Html$Attributes$style, 'width', '100%'),
								A2($elm$html$Html$Attributes$style, 'height', '220px')
							]),
						_List_Nil) : A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('rounded bg-transparent'),
								A2($elm$html$Html$Attributes$style, 'width', '100%'),
								A2($elm$html$Html$Attributes$style, 'height', '220px'),
								A2($elm$html$Html$Attributes$style, 'background-color', 'rgba(255,255,255,0.1)')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex items-center justify-center h-full')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Loading newsletter signup...')
									]))
							])),
						A2(
						$elm$html$Html$p,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('substack-fallback-link'),
								$elm$html$Html$Attributes$class('mt-3')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$a,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$href($author$project$Page$Home$Sections$substackEmbedUrl),
										$elm$html$Html$Attributes$target('_blank'),
										$elm$html$Html$Attributes$rel('noopener noreferrer'),
										$elm$html$Html$Attributes$class('underline'),
										A2($elm$html$Html$Attributes$attribute, 'aria-label', 'Subscribe on Substack')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Subscribe on Substack')
									]))
							]))
					]))
			]));
};
var $author$project$Page$Home$Sections$viewSupportMission = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('bg-black py-20 px-6 text-center text-white')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$span,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-4xl mb-4 block text-purple-500')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('❤')
				])),
			A2(
			$elm$html$Html$h2,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-3xl md:text-4xl font-bold mb-4')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Support Our Mission')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('max-w-3xl mx-auto text-lg mb-8')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('As a nonprofit, we rely on the generosity of families like yours to continue creating beautiful Catholic content. Your support helps us produce more stories and reach more children.')
				])),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$a,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$href('/give'),
							$elm$html$Html$Attributes$class('bg-purple-700 text-white px-6 py-3 rounded-md font-semibold')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Make a Donation')
						])),
					A2(
					$elm$html$Html$a,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$href('/give'),
							$elm$html$Html$Attributes$class('border border-purple-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400/70')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Become a Monthly Supporter')
						]))
				]))
		]));
var $author$project$Page$Home$Sections$GoTesti = function (a) {
	return {$: 'GoTesti', a: a};
};
var $author$project$Page$Home$Sections$NextArrow = {$: 'NextArrow'};
var $author$project$Page$Home$Sections$PrevArrow = {$: 'PrevArrow'};
var $author$project$Page$Home$Sections$viewWhatPeopleSaying = function (sectionsModel) {
	var translateX = sectionsModel.animating ? ((sectionsModel.animDir === 1) ? 'translateX(-200%)' : 'translateX(0)') : 'translateX(-100%)';
	var total = $elm$core$List$length($author$project$Page$Home$Sections$testimonials);
	var stars = A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('text-yellow-400 text-2xl mt-2 text-center')
			]),
		_List_fromArray(
			[
				$elm$html$Html$text('★★★★★')
			]));
	var last = total - 1;
	var idx = sectionsModel.testiIndex;
	var isWrapBackward = sectionsModel.animating && (_Utils_eq(sectionsModel.animDir, -1) && ((!idx) && _Utils_eq(
		sectionsModel.nextIndex,
		$elm$core$Maybe$Just(last))));
	var isWrapForward = sectionsModel.animating && ((sectionsModel.animDir === 1) && (_Utils_eq(idx, last) && _Utils_eq(
		sectionsModel.nextIndex,
		$elm$core$Maybe$Just(0))));
	var dot = function (i) {
		var pulseThisDot = function () {
			var _v2 = sectionsModel.nextIndex;
			if (_v2.$ === 'Just') {
				var n = _v2.a;
				return (isWrapForward || isWrapBackward) && _Utils_eq(i, n);
			} else {
				return false;
			}
		}();
		var pulse = pulseThisDot ? ' ring-2 ring-purple-300 animate-pulse' : '';
		var isActive = function () {
			var _v1 = sectionsModel.nextIndex;
			if (_v1.$ === 'Just') {
				var n = _v1.a;
				return _Utils_eq(i, n);
			} else {
				return _Utils_eq(i, idx);
			}
		}();
		var base = isActive ? 'bg-purple-500' : 'bg-purple-500/40';
		return A2(
			$elm$html$Html$button,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('w-12 h-12 flex items-center justify-center'),
					A2(
					$elm$html$Html$Attributes$attribute,
					'aria-label',
					'Go to testimonial ' + $elm$core$String$fromInt(i + 1)),
					A2(
					$elm$html$Html$Attributes$attribute,
					'aria-current',
					isActive ? 'true' : 'false'),
					$elm$html$Html$Attributes$type_('button'),
					$elm$html$Html$Events$onClick(
					$author$project$Page$Home$Sections$GoTesti(i))
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('w-3 h-3 rounded-full ' + (base + pulse))
						]),
					_List_Nil)
				]));
	};
	var current = A2(
		$elm$core$Maybe$withDefault,
		A2(
			$elm$core$Maybe$withDefault,
			{author: '', avatar: '?', quote: '', subtitle: ''},
			$elm$core$List$head($author$project$Page$Home$Sections$testimonials)),
		$elm$core$List$head(
			A2($elm$core$List$drop, idx, $author$project$Page$Home$Sections$testimonials)));
	var next = function () {
		var i = (_Utils_cmp(idx + 1, total - 1) > 0) ? 0 : (idx + 1);
		return A2(
			$elm$core$Maybe$withDefault,
			current,
			$elm$core$List$head(
				A2($elm$core$List$drop, i, $author$project$Page$Home$Sections$testimonials)));
	}();
	var nextForAnim = function () {
		var _v0 = sectionsModel.nextIndex;
		if (_v0.$ === 'Just') {
			var n = _v0.a;
			return A2(
				$elm$core$Maybe$withDefault,
				next,
				$elm$core$List$head(
					A2($elm$core$List$drop, n, $author$project$Page$Home$Sections$testimonials)));
		} else {
			return next;
		}
	}();
	var prev = function () {
		var i = ((idx - 1) < 0) ? (total - 1) : (idx - 1);
		return A2(
			$elm$core$Maybe$withDefault,
			current,
			$elm$core$List$head(
				A2($elm$core$List$drop, i, $author$project$Page$Home$Sections$testimonials)));
	}();
	var card = function (t) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('rounded-2xl bg-gray-800/40 border border-gray-700/60 shadow-sm p-8 md:p-10')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('text-gray-100 italic text-xl md:text-2xl leading-relaxed')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(t.quote)
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('flex items-center gap-3 mt-8')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('w-12 h-12 rounded-full bg-purple-600 text-white grid place-content-center font-bold')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(t.avatar)
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$p,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('text-white font-semibold')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(t.author)
										])),
									A2(
									$elm$html$Html$p,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('text-gray-400 text-sm')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(t.subtitle)
										]))
								]))
						]))
				]));
	};
	var trackChildren = _List_fromArray(
		[
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('w-full shrink-0')
				]),
			_List_fromArray(
				[
					card(prev)
				])),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('w-full shrink-0')
				]),
			_List_fromArray(
				[
					card(current)
				])),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('w-full shrink-0')
				]),
			_List_fromArray(
				[
					card(
					(sectionsModel.animating && (sectionsModel.animDir === 1)) ? nextForAnim : next)
				]))
		]);
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('bg-gray-900 py-20 px-6 text-white relative overflow-hidden')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h2,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('text-4xl md:text-5xl font-extrabold text-center')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('What Parents Are Saying')
					])),
				stars,
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('relative max-w-5xl mx-auto mt-10')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('absolute z-10 grid place-content-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-white text-purple-600 shadow top-1/2 -translate-y-1/2 left-0'),
								A2($elm$html$Html$Attributes$attribute, 'aria-label', 'Previous testimonial'),
								$elm$html$Html$Attributes$type_('button'),
								$elm$html$Html$Events$onClick($author$project$Page$Home$Sections$PrevArrow)
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('text-2xl')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('‹')
									]))
							])),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('absolute z-10 grid place-content-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-white text-purple-600 shadow top-1/2 -translate-y-1/2 right-0'),
								A2($elm$html$Html$Attributes$attribute, 'aria-label', 'Next testimonial'),
								$elm$html$Html$Attributes$type_('button'),
								$elm$html$Html$Events$onClick($author$project$Page$Home$Sections$NextArrow)
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('text-2xl')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('›')
									]))
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('mx-24')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('relative overflow-hidden h-80 md:h-96')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('flex w-full h-full'),
												A2(
												$elm$html$Html$Attributes$style,
												'transition',
												sectionsModel.animating ? ((isWrapForward || isWrapBackward) ? 'transform 350ms ease' : 'transform 450ms ease') : 'none'),
												A2(
												$elm$html$Html$Attributes$style,
												'will-change',
												sectionsModel.animating ? 'transform' : 'auto'),
												A2($elm$html$Html$Attributes$style, 'transform', translateX)
											]),
										trackChildren)
									]))
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('flex items-center justify-center gap-1 mt-6')
							]),
						A2(
							$elm$core$List$map,
							dot,
							A2($elm$core$List$range, 0, total - 1)))
					]))
			]));
};
var $author$project$Main$viewBody = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('min-h-screen')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$map,
				$author$project$Main$ProductionsMsg,
				A3($author$project$Page$Animations$Helpers$Carousel$viewSlides, model.animationsPageModel.slideshow, $author$project$Page$Animations$View$NextSlide, $author$project$Page$Animations$View$PrevSlide)),
				$author$project$Page$Home$Sections$viewCategories,
				$author$project$Page$Home$Sections$viewMission,
				A2(
				$elm$html$Html$map,
				$author$project$Main$SectionsMsg,
				$author$project$Page$Home$Sections$viewWhatPeopleSaying(model.sections)),
				A2(
				$elm$html$Html$map,
				$author$project$Main$SectionsMsg,
				$author$project$Page$Home$Sections$viewStayConnected(model.sections)),
				$author$project$Page$Home$Sections$viewSupportMission
			]));
};
var $author$project$Main$viewHome = function (model) {
	return {
		body: _List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('bg-black text-white')
					]),
				_List_fromArray(
					[
						A4($author$project$Component$Header$viewHeaderWithMenu, 'Claritas Studios', $author$project$Theme$Layout$headerMargin, model.menuOpen, $author$project$Main$ToggleMenu),
						$author$project$Main$viewBody(model),
						$author$project$Component$Footer$viewFooter
					]))
			]),
		title: 'Claritas Studios'
	};
};
var $author$project$Main$view = function (model) {
	var _v0 = function () {
		var _v1 = model.page;
		switch (_v1.$) {
			case 'Home':
				return $author$project$Main$viewHome(model);
			case 'Give':
				return {
					body: _List_fromArray(
						[$author$project$Page$Give$View$view]),
					title: 'Donate'
				};
			case 'Contact':
				return {
					body: _List_fromArray(
						[$author$project$Page$Contact$View$view]),
					title: 'Contact Us'
				};
			case 'AboutUs':
				return {
					body: _List_fromArray(
						[$author$project$Page$Team$View$view]),
					title: 'About Us'
				};
			case 'Shop':
				return {
					body: _List_fromArray(
						[$author$project$Page$Shop$View$view]),
					title: 'Shop'
				};
			case 'Resources':
				return {
					body: _List_fromArray(
						[
							$author$project$Page$Resources$View$view(model.url)
						]),
					title: 'Resources'
				};
			case 'Prayers':
				return {
					body: _List_fromArray(
						[$author$project$Page$Prayers$View$view]),
					title: 'Prayers'
				};
			case 'Angelus':
				return {
					body: _List_fromArray(
						[$author$project$Page$Prayer$Angelus$View$view]),
					title: 'Angelus'
				};
			case 'Saints':
				var saintPageModel = model.saintsPageModel;
				var document = $author$project$Page$Saints$Main$view(
					_Utils_update(
						saintPageModel,
						{url: model.url}));
				return {
					body: A2(
						$elm$core$List$map,
						$elm$html$Html$map($author$project$Main$SaintsMsg),
						document.body),
					title: document.title
				};
			case 'Feasts':
				var feastModel = model.feastsPageModel;
				var document = $author$project$Page$FeastDayActivities$Main$view(
					_Utils_update(
						feastModel,
						{url: model.url}));
				return {
					body: A2(
						$elm$core$List$map,
						$elm$html$Html$map($author$project$Main$FeastsMsg),
						document.body),
					title: document.title
				};
			case 'Productions':
				var document = A2($author$project$Page$Animations$View$view, model.url, model.animationsPageModel);
				return {
					body: A2(
						$elm$core$List$map,
						$elm$html$Html$map($author$project$Main$ProductionsMsg),
						document.body),
					title: document.title
				};
			case 'PrivacyPolicy':
				return {
					body: _List_fromArray(
						[
							A2(
							$elm$html$Html$map,
							function (_v2) {
								return $author$project$Main$NoOp;
							},
							$author$project$Page$About$PrivacyPolicy$Main$view)
						]),
					title: 'Privacy Policy'
				};
			case 'TermsAndConditions':
				return {
					body: _List_fromArray(
						[
							A2(
							$elm$html$Html$map,
							function (_v3) {
								return $author$project$Main$NoOp;
							},
							$author$project$Page$About$TermsAndConditions$Main$view)
						]),
					title: 'Terms & Conditions'
				};
			case 'Press':
				return {
					body: _List_fromArray(
						[$author$project$Page$Newsroom$ViewPress$view]),
					title: 'Angelus'
				};
			default:
				return {
					body: _List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('p-10 text-center')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('This is a downloadable file. If it does not open automatically, please check your browser\'s download bar or try the direct link again.')
								]))
						]),
					title: 'Download'
				};
		}
	}();
	var title = _v0.title;
	var body = _v0.body;
	return {
		body: _List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('bg-black text-white')
					]),
				(title === 'Donate') ? body : A2(
					$elm$core$List$cons,
					A4($author$project$Component$Header$viewHeaderWithMenu, title, $author$project$Theme$Layout$headerMargin, model.menuOpen, $author$project$Main$ToggleMenu),
					body))
			]),
		title: title
	};
};
var $author$project$Main$main = $elm$browser$Browser$application(
	{init: $author$project$Main$init, onUrlChange: $author$project$Main$UrlChanged, onUrlRequest: $author$project$Main$LinkClicked, subscriptions: $author$project$Main$subscriptions, update: $author$project$Main$update, view: $author$project$Main$view});
_Platform_export({'Main':{'init':$author$project$Main$main(
	$elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}});}(this));