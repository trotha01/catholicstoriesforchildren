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
}var $author$project$FeastDayActivities$Main$LinkClicked = function (a) {
	return {$: 'LinkClicked', a: a};
};
var $author$project$FeastDayActivities$Main$UrlChanged = function (a) {
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
var $author$project$FeastDayActivities$Main$Model = F2(
	function (key, url) {
		return {key: key, url: url};
	});
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$FeastDayActivities$Main$init = F3(
	function (flags, url, key) {
		return _Utils_Tuple2(
			A2($author$project$FeastDayActivities$Main$Model, key, url),
			$elm$core$Platform$Cmd$none);
	});
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $author$project$FeastDayActivities$Main$subscriptions = function (_v0) {
	return $elm$core$Platform$Sub$none;
};
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
var $elm$browser$Browser$Navigation$load = _Browser_load;
var $author$project$FeastDayActivities$FeastDayHelpers$Audio = {$: 'Audio'};
var $author$project$FeastDayActivities$FeastDayHelpers$Crafts = {$: 'Crafts'};
var $author$project$FeastDayActivities$FeastDayHelpers$Food = {$: 'Food'};
var $author$project$FeastDayActivities$FeastDayHelpers$More = {$: 'More'};
var $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading = {$: 'OnlineReading'};
var $author$project$FeastDayActivities$FeastDayHelpers$Video = {$: 'Video'};
var $author$project$FeastDayActivities$FeastDays$M04Apr$april = {
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
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Video, image: '', link: 'https://www.youtube-nocookie.com/embed/ZrJ-7ZVzvKE', snippet: '', title: 'Hosanna'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Video, image: '', link: 'https://www.youtube-nocookie.com/embed/O___M05czhg', snippet: '', title: 'What is Holy Week? Palm Sunday, Holy Thursday, Good Friday, and Easter!'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Video, image: '', link: 'https://www.youtube-nocookie.com/embed/1ssgKEadTL8', snippet: '', title: 'Palm Sunday and the Passion- For Kids'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/palm-sunday-crafts-and-ideas-for-kids/', snippet: 'Celebrating Palm Sunday with your family is a great way to live the liturgical year at home with your kids! It begins the last week of Lent, and there are a lot of fun and meaningful ways to celebrate Palm Sunday with your kids...', title: 'Celebrate Palm Sunday (Crafts and Ideas for Kids)'}
						]),
					feast: 'Palm Sunday of the Lord\'s Passion'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Video, image: '', link: 'https://www.youtube-nocookie.com/embed/8SL_wCW_Srs', snippet: '', title: 'St. Francis of Paola'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-francis-of-paola/', snippet: 'Francis of Paola was a man who deeply loved contemplative solitude and wished only to be the “least in the household of God.” Yet, when the Church called him to active service in the world, he became a miracle-worker and influenced the course of nations...', title: 'Saint Francis of Paola’s Story'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://mycatholic.life/wp-content/uploads/2021/08/My-Catholic-Life-MCL-Header.jpg', link: 'https://mycatholic.life/saints/saints-of-the-liturgical-year/april-2-saint-francis-of-paola-hermit/', snippet: 'James Martotille and his bride wedded and lived in the town of Paola, in the southernmost region of Italy. During the first years of their marriage, they were unable to conceive a child. Being devout Catholics, they turned to prayer and beseeched the intercession of Saint Francis of Assisi...', title: 'Saint Francis of Paola, Hermit'}
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
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-isidore-of-seville/', snippet: 'The 76 years of Isidore’s life were a time of conflict and growth for the Church in Spain. The Visigoths had invaded the land a century and a half earlier, and shortly before Isidore’s birth they set up their own capital. They were Arians...', title: 'Saint Isidore of Seville’s Story'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://mycatholic.life/wp-content/uploads/2021/08/My-Catholic-Life-MCL-Header.jpg', link: 'https://mycatholic.life/saints/saints-of-the-liturgical-year/april-4-saint-isidore-bishop-and-doctor-of-the-church/', snippet: 'Isidore, a man of great distinction, bishop of the church of Seville, successor and brother of bishop Leander, flourished from the time of Emperor Maurice and King Reccared. In him antiquity reasserted itself...', title: 'Saint Isidore, Bishop and Doctor of the Church'}
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
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-vincent-ferrer/', snippet: 'The polarization in the Church today is a mild breeze compared with the tornado that ripped the Church apart during the lifetime of this saint. If any saint is a patron of reconciliation, Vincent Ferrer is...', title: 'Saint Vincent Ferrer’s Story'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://mycatholic.life/wp-content/uploads/2021/08/My-Catholic-Life-MCL-Header.jpg', link: 'https://mycatholic.life/saints/saints-of-the-liturgical-year/april-5-saint-vincent-ferrer-priest/', snippet: 'It can be said that today’s saint lived two sequential lives. The first forty-nine years of his life were, in many ways, a preparation for the final twenty years of his life...', title: 'Saint Vincent Ferrer, Priest'}
						]),
					feast: 'Saint Vincent Ferrer'
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
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://mycatholic.life/wp-content/uploads/2021/08/My-Catholic-Life-MCL-Header.jpg', link: 'https://mycatholic.life/saints/saints-of-the-liturgical-year/holy-thursday/', snippet: 'Holy Thursday is also called Maundy Thursday. “Maundy” comes from the Latin word mandatum, which is translated “mandate.” It is on this night that...', title: 'Holy Thursday'}
						]),
					feast: 'Holy Thursday'
				}
				])
		},
			{
			date: '07',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Good Friday'},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-john-baptist-de-la-salle/', snippet: 'Complete dedication to what he saw as God’s will for him dominated the life of John Baptist de La Salle. In 1950, Pope Pius XII named him patron of schoolteachers for his efforts in upgrading school instruction...', title: 'Saint John Baptist de La Salle'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://mycatholic.life/wp-content/uploads/2021/08/My-Catholic-Life-MCL-Header.jpg', link: 'https://mycatholic.life/saints/saints-of-the-liturgical-year/april-7-saint-john-baptist-de-la-salle-priest/', snippet: 'Saint John Baptist de La Salle died on Good Friday, perhaps as a divine sign of the sacrificial life he had lived for the salvation of souls...', title: 'Saint John Baptist de la Salle, Priest'}
						]),
					feast: 'Saint John Baptist de la Salle'
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
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://mycatholic.life/wp-content/uploads/2021/08/My-Catholic-Life-MCL-Header.jpg', link: 'https://mycatholic.life/catholic-prayers/triduum-and-easter-prayers/prayer-meditation-for-holy-saturday/', snippet: 'My Lord, today all is silent. You have given Your precious life for the salvation of the world.  You died a horrific death, poured out all Mercy from Your wounded Heart, and now You rest in peace in the tomb as the soldiers keep vigil...', title: 'Prayer Meditation for Holy Saturday'}
						]),
					feast: 'Holy Saturday'
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
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Video, image: '', link: 'https://www.youtube-nocookie.com/embed/7z7XN9vmOOM', snippet: '', title: 'Easter Octave'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://mycatholic.life/wp-content/uploads/2021/08/My-Catholic-Life-MCL-Header.jpg', link: 'https://mycatholic.life/saints/saints-of-the-liturgical-year/easter-sunday/', snippet: 'Alleluia!  He is Risen! Saying those words is like drinking a tall glass of cold water after being out in the desert all day.  Lent is over. It is time to celebrate the great joy of Easter!', title: 'Easter Sunday'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Crafts, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/count-down-the-easter-season-printable-countdown-bunting/', snippet: 'The Easter season lasts 50 days for Catholics, which is 10 more days than Lent! It’s like St. Pope John Paul II said, “We are an Easter people and Alleluia is our song!”', title: 'Count Down The Easter Season'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/easy-easter-cookie-recipe-birds-nests-with-eggs/', snippet: 'When I am planning fun Easter treats with the kids, I always love to include things that have symbols that point back to the true meaning of Easter...', title: 'Easy Easter Cookie Recipe- Bird’s Nests With Eggs!'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/how-to-make-easter-story-cookies-with-a-printable-recipe/', snippet: 'Making Easter Story Cookies (Aka, resurrection cookies) is a fun way to celebrate the true meaning of Easter with your kids!', title: 'How To Make Easter Story Cookies'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/50-days-of-easter/', snippet: 'All the Easter crafts, snacks, games, books, etc. couldn’t possibly all happen on actual Easter Sunday- it’s too much! But that’s ok because the Church, in her infinite wisdom, granted an entire season of Easter that lasts for 50 days, all the way through Pentecost!', title: 'Celebrating The Entire Easter Season With Catholic Kids- All 50 Days!'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/Cultivating_Catholics_Logo_GpMJodURB.png?updatedAt=1680400021552', link: 'https://cultivatingcatholics.com/how-to-engage-your-3-7-year-olds-in-the-triduum/', snippet: 'As we move into Holy Week, it is important to help the youngest Catholics understand and engage with several days of long liturgies.', title: 'How to engage your 3-7 year olds in the Triduum'}
						]),
					feast: 'Easter Sunday'
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
					{activities: _List_Nil, feast: 'Saint Martin I'}
				])
		},
			{
			date: '16',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Divine Mercy Sunday'}
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
					{activities: _List_Nil, feast: 'Saint Pius V.'}
				])
		}
		]),
	key: 'apr',
	month: 'April'
};
var $author$project$FeastDayActivities$FeastDays$M08Aug$august = {
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
					{activities: _List_Nil, feast: 'Saint Peter Julian Eymard'}
				])
		},
			{
			date: '04',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Jean Vianney (the Curé of Ars)'}
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
					{activities: _List_Nil, feast: 'Saint Sixtus II, Pope and Martyr'},
					{activities: _List_Nil, feast: 'Saint Cajetan'}
				])
		},
			{
			date: '08',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Dominic'}
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
					{activities: _List_Nil, feast: 'Saint Lawrence'}
				])
		},
			{
			date: '11',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Clare'}
				])
		},
			{
			date: '12',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Jane Frances de Chantal'}
				])
		},
			{
			date: '13',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saints Pontian, Pope and Hippoloytus'}
				])
		},
			{
			date: '14',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Maximilian Mary Kolbe'}
				])
		},
			{
			date: '15',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Assumption of the Blessed Virgin Mary'}
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
					{activities: _List_Nil, feast: 'Saint Pius X'}
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
					{activities: _List_Nil, feast: 'Saint Louis'},
					{activities: _List_Nil, feast: 'Saint Joseph of Calasanz'}
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
					{activities: _List_Nil, feast: 'The Passion of Saint John the Baptist'}
				])
		}
		]),
	key: 'aug',
	month: 'August'
};
var $author$project$FeastDayActivities$FeastDays$M12Dec$december = {
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
					{activities: _List_Nil, feast: 'Saint Nicholas'}
				])
		},
			{
			date: '07',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Ambrose'}
				])
		},
			{
			date: '08',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Immaculate Conception of the Blessed Virgin Mary'}
				])
		},
			{
			date: '09',
			feasts: _List_fromArray(
				[
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
					{activities: _List_Nil, feast: 'Saint Damasus I'}
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
					{activities: _List_Nil, feast: 'Saint Stephen'}
				])
		},
			{
			date: '27',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint John the Apostle and Evangelist'}
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
					{activities: _List_Nil, feast: 'Saint Thomas Becket'}
				])
		},
			{
			date: '30',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'The Holy Family of Jesus, Mary, and Joseph'}
				])
		},
			{
			date: '31',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Sylvester I'}
				])
		}
		]),
	key: 'dec',
	month: 'December'
};
var $author$project$FeastDayActivities$FeastDayHelpers$Images = {$: 'Images'};
var $author$project$FeastDayActivities$FeastDays$M02Feb$february = {
	color: '#395d73',
	feasts: _List_fromArray(
		[
			{
			date: '1',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-ansgar/', snippet: 'Saint Ansgar was a Benedictine missionary who spent his life trying to convert northern Europe. It seems for every step he took forward, he ended up taking two backward.', title: 'Story of Saint Ansgar'}
						]),
					feast: 'Saint Ansgar'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-brigid', snippet: 'By Julianne Stanz Transcript Saint Brigid is the patron saint of fire, healing, midwives, and childbirth. She’s a bit of a busy bee. We celebrate her feast day on February 1st, which is known as Imbolc, one of the great fire festivals of the Irish. As the shamrock became associated with Saint Patri...', title: 'Saint Brigid'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-brigid-feb-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! The Feast of Brigid, also known as Imbolc, celebrates the arrival of longer, warmer days and the early signs of spring. On Imbolc Eve Brigid visits virtuous households and blesses the inhabitants. St. Brigid represents Purity, Protection and Parturition', title: 'Brigid'}
						]),
					feast: 'Saint Brigid'
				}
				])
		},
			{
			date: '2',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/ideas-for-celebrating-candlemas-feb-2/', snippet: 'There are tons of fun and traditional ways to celebrate Candlemas with Catholic kids so let’s look at some ideas that may work for your family...', title: 'How To Celebrate Candlemas With Catholic Children'}
						]),
					feast: 'The Presentation of the Lord'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/presentation-of-the-lord/', snippet: 'Being an observant Jewish couple, it stands to reason that Mary and Joseph went to the Temple for Mary’s purification—as prescribed by Mosaic Law—40 days after Jesus’ birth. The blessing of candles and the procession of light were added to this feast, giving it the popular name “Candlemas.”', title: 'Story of Presentation of the Lord'}
						]),
					feast: 'Presentation of the Lord'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-candlemas-feb-2-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! The Story of Candlemas Candlemas, also known as the Feast of the Presentation of Our Lord Jesus, is a Christian Holy Day commemorating the presentation of Jesus at the Temple. It falls on February 2, which is traditionally the 40th day of the Christmas–Epiphany season. While it is customary for Chr...', title: 'Candlemas'}
						]),
					feast: 'Saint Candlemas'
				}
				])
		},
			{
			date: '3',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://lpress-craft.loyolapress.com/images/ocf-articles/Microsites/SaintsStories_100x100.jpeg', link: 'https://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-blase/', snippet: 'According to tradition, Blaise had been a doctor before he was ordained a priest. He became the bishop of Sebaste (now in central Turkey)...', title: 'Saint Blaise'}
						]),
					feast: 'Saint Blase'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-blaise/', snippet: 'Popularly known as the saint who protects from ailments of the throat, Saint Blaise was a bishop and martyr of the fourth century. We know little else about him, except that he suffered persecution even after the Edict of Toleration was to have freed the Roman world for worship.', title: 'Story of Saint Blaise'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-blase', snippet: 'If you are already familiar with St. Blaise, it is probably because of the blessing of throats—a Catholic custom on his feast. According to tradition, Blaise had been a doctor before he was ordained a priest. He became the bishop of Sebaste (now in central Turkey). During a period of persecution, h...', title: 'Saint Blaise'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-blaise-feb-3-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Blaise’s Story \u00A0 We know more about the devotion to Saint\u00A0Blaise by Christians around the world than we know about the saint himself. His feast is observed as a holy day in some Eastern Churches. In 1222, the Council of Oxford prohibited servile labor in England on Blaise’s feast day. The Germ...', title: 'Blaise'}
						]),
					feast: 'Saint Blaise'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-ansgar-feb-3', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! The “apostle of the north” (Scandinavia) had enough frustrations to become a saint—and he did. He became a Benedictine at Corbie, France, where he had been educated. Three years later, when the king of Denmark became a convert, Ansgar went to that country for three years of missionary work, without noticeable success...', title: 'Saint Ansgar'}
						]),
					feast: 'Saint Ansgar'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-blaise-feb-3', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Werburgh\'s Story \u200B The Legend of St Werburgh A Benedictine and Patroness St Werburgh was a Benedictine and patroness of Chester, Abbess of Weedon, Trentham, Hanbury, Minster in Sheppey, and Ely. She was born in Staffordshire early in the seventh century and died at Trentham in 3rd February in...', title: 'Saint Werburgh'}
						]),
					feast: 'Saint Werburgh'
				}
				])
		},
			{
			date: '4',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-joseph-of-leonissa/', snippet: 'Saint Joseph of Leonissa was known for his austerity of life and single-minded commitment to preaching. Arrested and warned to change his ways, Joseph returned to his former behavior and was re-arrested and condemned to die. He escaped, however, and continued a life of preaching.', title: 'Story of Saint Joseph of Leonissa'}
						]),
					feast: 'Saint Joseph of Leonissa'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-rabanus-maurus', snippet: 'Come, Creator, Spirit, come from your bright heavenly throne, come take possession of our souls, and make them all your own.You who are called the Paraclete, best gift of God above, the living spring, the vital fire sweet christ’ning and true love. . . .O guide our minds with your best light, with l...', title: 'Saint Rabanus Maurus'}
						]),
					feast: 'Saint Rabanus Maurus'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-2-of-st-blaise-feb-3', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Joseph of Leonissa’s Story \u200B Joseph of Leonissa, OFM Cap.;\u00A0 was the third of eight children born at Leonessa (Italy) on January 8, 1556. At baptism he was given the name Eufranio. Impressed by the example of Matthew Silvestri, who had left the medical profession to embrace the Capuchin life an...', title: 'Joseph of Leonessa'}
						]),
					feast: 'Saint Joseph of Leonessa'
				}
				])
		},
			{
			date: '5',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://lpress-craft.loyolapress.com/images/ocf-articles/Microsites/SaintsStories_100x100.jpeg', link: 'https://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-agatha/', snippet: 'Saint Agatha is the patroness of nurses, foundry workers, miners, jewelers, and Alpine guides. She is invoked against fire, earthquakes, famine, thunderstorms, and volcanic eruptions. In Italy, her feast day is celebrated with fireworks. According to some stories...', title: 'Saint Agatha'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-agatha/', snippet: 'One of the four virgin martyrs celebrated in the Catholic calendar of saints, Saint Agatha was arrested during the persecution of Decius in 251. Tortured for her beauty and tempted to violate her chastity, Agatha was eventually martyred.', title: 'Story of Saint Agatha'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-agatha', snippet: 'Saint Agatha is the patroness of nurses, foundry workers, miners, jewelers, and Alpine guides. She is invoked against fire, earthquakes, famine, thunderstorms, and volcanic eruptions. In Italy, her feast day is celebrated with fireworks. According to some stories, Agatha was born in Sicily of noble...', title: 'Saint Agatha'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-agatha-feb-5-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! The Story of St. Agatha, also known as Agatha of Sicily, is one of the most highly venerated virgin martyrs of the Catholic Church. It is believed that she was born around 231 in either Catania or Palermo, Sicily to a rich and noble family. From her very early years, the notably beautiful Agatha de...', title: 'Agatha'}
						]),
					feast: 'Saint Agatha'
				}
				])
		},
			{
			date: '6',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://lpress-craft.loyolapress.com/images/ocf-articles/Microsites/SaintsStories_100x100.jpeg', link: 'https://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-paul-miki-and-companions/', snippet: 'When the first missionaries, like St. Francis Xavier, came to Japan in 1549 they were welcomed. Many Japanese became Christians. When the leader Hideyoshi took command, he feared that Christians would take over the government...', title: 'Saint Paul Miki and Companions'}
						]),
					feast: 'Saints Paul Miki and Companions'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-paul-miki-and-companions/', snippet: 'A Jesuit Brother and native of Japan, Saint Paul Miki was crucified, along with 25 other Catholics, for preaching his belief in Jesus.', title: 'Story of Saint Paul Miki and Companions'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-paul-miki-and-companions', snippet: 'When the first missionaries, like St. Francis Xavier, came to Japan in 1549 they were welcomed. Many Japanese became Christians. When the leader Hideyoshi took command, he feared that Christians would take over the government. In 1587 he banished them and destroyed many of their churches. Some missi...', title: 'Saint Paul Miki and Companions'}
						]),
					feast: 'Saint Paul Miki and Companions'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-dorothy-of-caesarea-feb--1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! The Story of Saint\u00A0Dorothy of Caesarea \u00A0 The Holy Martyr Dorothy and the Martyrs Christina, Callista and Theophilus lived in Caesarea of Cappadocia and suffered under Emperor Diocletian in either the year 288 or 300. \u200B St. Dorothy was a pious Christian maiden, distinguished by her great beauty, humi...', title: 'Dorothy of Caesarea'}
						]),
					feast: 'Saint Dorothy of Caesarea'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-paul-miki-companions-f-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint\u00A0Paul Miki and Companions’ Story \u200B Nagasaki, Japan, is familiar to Americans as the city on which the second atomic bomb was dropped, immediately killing over 37,000 people. Three and a half centuries before, 26 martyrs of Japan were crucified on a hill, now known as the Holy Mountain, overlook...', title: 'Paul Miki & Companions'}
						]),
					feast: 'Saint Paul Miki & Companions'
				}
				])
		},
			{
			date: '7',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-colette/', snippet: 'Saint Colette is known as a reformer of the Order of Saint Clare. Known as the Colettine Poor Clares, these nuns follow a more primitive rule of Saint Clare and are known for their austerity.', title: 'Story of Saint Colette'}
						]),
					feast: 'Saint Colette'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-dorothy-of-caesarea-feb-', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Theodore Stratelates\' Story \u200B The holy Martyr Theodore was from Euchaita of Galatia and dwelt in Heraclea of Pontus. He was a renowned commander in the military, and the report came to the Emperor Licinius that he was a Christian and abominated the idols. Licinius therefore sent certain men to...', title: 'Theodore Stratelates'}
						]),
					feast: 'Saint Theodore Stratelates'
				}
				])
		},
			{
			date: '8',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://lpress-craft.loyolapress.com/images/ocf-articles/Microsites/SaintsStories_100x100.jpeg', link: 'https://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-jerome-emiliani/', snippet: 'Jerome Emiliani was born in Venice. As a soldier, he was captured during battle and imprisoned. In a dungeon he thought about his life...', title: 'Saint Jerome Emiliani'}
						]),
					feast: 'Saint Jerome Emilani'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/st-josephine-bakhita-resources-for-kids/', snippet: 'Let’s look at some celebrating the life of St. Bakhita for kids with crafts, printables, and even more resources.', title: 'St. Josephine Bakhita Resources For Kids (Crafts, Printables, More!)'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://lpress-craft.loyolapress.com/images/ocf-articles/Microsites/SaintsStories_100x100.jpeg', link: 'https://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-josephine-bakhita/', snippet: 'Saint Josephine, affectionately known as Bakhita (“fortunate one”), was born in the southern Sudan region of Darfur. She was kidnapped as a child and sold into slavery...', title: 'Saint Josephine, Bakhita'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-josephine-bakhita/', snippet: 'Kidnapped at the age of nine and being too terrified to remember her name, Josephine acquired the name “Bakhit” which means “fortunate one.”', title: 'Story of Saint Josephine Bakhita'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-josephine-bakhita-feb-8-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint\u00A0Josephine Bakhita\'s Story \u200B Josephine Bakhita (1869-1947) \u00A0 Mother Josephine Bakhita was born in Sudan in 1869 and died in Schio (Vicenza)\u00A0\u00A0in 1947. This African flower, who knew the anguish of kidnapping and slavery, bloomed marvelously in Italy, in response to God\'s grace, with the Daughters...', title: 'Josephine Bakhita'}
						]),
					feast: 'Saint Josephine Bakhita'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-jerome-emiliani', snippet: 'Jerome Emiliani was born in Venice. As a soldier, he was captured during battle and imprisoned. In a dungeon he thought about his life, which had been far from virtuous. He decided to change and dedicated himself to the Virgin Mary. After a miraculous escape from prison, Jerome returned to Venice. H...', title: 'Saint Jerome Emiliani'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-jerome-emiliani-feb-8-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Jerome Emiliani’s Story \u200B Born wealthy, the son of Angelo and Eleanor Mauroceni Emiliani. His father died when Jerome was a teenager, and he ran away from home at age 15. After a dissolute youth, he became a soldier in Venice, Italy in 1506. Commanded the League of Cambrai forces at the fortre...', title: 'Jerome Emiliani'}
						]),
					feast: 'Saint Jerome Emiliani'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-josephine-bakhita', snippet: '“It is an act of justice for the rich to help the poor.” Saint Josephine, affectionately known as Bakhita (“fortunate one”), was born in the southern Sudan region of Darfur. She was kidnapped as a child and sold into slavery, eventually working in Italy as a nanny for a wealthy family. It was during...', title: 'Saint Josephine, Bakhita, c. 1868-1947'}
						]),
					feast: 'Saint Josephine, Bakhita, c. 1868-1947'
				}
				])
		},
			{
			date: '9',
			feasts: _List_fromArray(
				[
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-jerome-emiliani/', snippet: 'An orphan at the age of 15, Saint Jerome Emiliani ran away from home and ran into some trouble. He ended up in prison where he had time to think. After a conversion, Saint Jerome studied for the priesthood and, after his ordination, he worked for abandoned children.', title: 'Story of Saint Jerome Emiliani'}
						]),
					feast: 'Saint Jerome Emiliani'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-miguel-febres-cordero', snippet: 'How would you like to have a teacher who was described like this: He was kind to everyone and treated all of his students, rich or poor, the same. He liked to be with the students, and they liked to be with him. All of the children in the school loved him. That is exactly what a saint said about tod...', title: 'Saint Miguel Febres Cordero'}
						]),
					feast: 'Saint Miguel Febres Cordero'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-apollonia-feb-9-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Apollonia’s Story \u200B The persecution of Christians began in Alexandria during the reign of the Emperor Philip. The first victim of the pagan mob was an old man named Metrius, who was tortured and then stoned to death. The second person who refused to worship their false idols was a Christian wo...', title: 'Apollonia'}
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
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://lpress-craft.loyolapress.com/images/ocf-articles/Microsites/SaintsStories_100x100.jpeg', link: 'https://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-scholastica/', snippet: 'Saint Scholastica was the twin sister of Saint Benedict. Benedict studied in Rome but then decided to devote all of his life to the search for God. He organized several community dwellings and finally established a very important monastery at Monte Cassino. Then Scholastica...', title: 'Saint Scholastica'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-scholastica/', snippet: 'Family ties and religious obligations may affect one another, but they are not necessarily opposed. Saint Scholastica’s relationship with her brother Saint Benedict, is a good example.', title: 'Story of Saint Scholastica'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-scholastica', snippet: 'Saint Scholastica was the twin sister of Saint Benedict. Benedict studied in Rome but then decided to devote all of his life to the search for God. He organized several community dwellings and finally established a very important monastery at Monte Cassino. Then Scholastica helped her brother found...', title: 'Saint Scholastica'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-scholastica-feb-10-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint\u00A0Scholastica\'s Story \u200B St. Scholastica, sister of St. Benedict, consecrated her\u00A0life\u00A0to\u00A0God\u00A0from her earliest youth. After her brother went to Monte Cassino, where he established his famous monastery, she took up her abode in the neighborhood at Plombariola, where she founded and governed a mon...', title: 'Scholastica'}
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
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Crafts, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/our-lady-of-lourdes-craft/', snippet: 'It prints on 3 pages, and comes in both black & white AND in color, so you can choose if you want to color it yourself or not...', title: 'Our Lady Of Lourdes Diorama (Printable Craft For Catholic Kids!)'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://lpress-craft.loyolapress.com/images/ocf-articles/Microsites/SaintsStories_100x100.jpeg', link: 'https://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/our-lady-of-lourdes/', snippet: 'Each year over 2 million people make their way through the mountainous country of southeastern France to Lourdes. They come seeking cures, hoping to find answers, believing, and praying. At Lourdes...', title: 'Our Lady of Lourdes'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://2.bp.blogspot.com/_pUXaddJMQyw/TU9zVNqMGvI/AAAAAAAAEt4/SFvGzWmY7ZY/s400/rice+krispie+grotto+2.jpg', link: 'https://www.catholicicing.com/rice-krispie-treat-grotto-for-our-lady/', snippet: 'It prints on 3 pages, and comes in both black & white AND in color, so you can choose if you want to color it yourself or not...', title: 'Rice Krispie Treat Grotto Tor Our Lady Of Lourdes'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/our-lady-of-lourdes/', snippet: 'Devotion to Our Lady of Lourdes runs deep in the hearts of the faithful as a sign of God’s care and healing. The mediation of Mary, his mother, is a real consolation to those who suffer any ill.', title: 'Story of Our Lady of Lourdes'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/our-lady-of-lourdes', snippet: 'Each year over 2 million people make their way through the mountainous country of southeastern France to Lourdes. They come seeking cures, hoping to find answers, believing, and praying. At Lourdes, people recall the Lady dressed in white, with a blue sash, yellow roses at her feet, and a Rosary on...', title: 'Our Lady of Lourdes'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-our-lady-of-lourdes-feb-11', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! The Story of Saint\u00A0Eulalia of Barcelona \u200B The daughter of a noble family, Eulalia lived near the city of Barcelona. During the persecutions under Diocletian, governor\u00A0Dacian\u00A0arrived in the city intent on enforcing the decrees. Some time later, Eulalia entered the city and confronted the governor for...', title: 'Our Lady of Lourdes'}
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
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-apollonia/', snippet: 'Saint Apollonia is the patron saint of dentists because her teeth were knocked out by an angry mob. Hardly the way we would wish a dentist to extract our teeth, but Saint Apollonia certainly evidenced great courage in her defiance of those who were attacking Christians.', title: 'Story of Saint Apollonia'}
						]),
					feast: 'Saint Apollonia'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-benedict-of-aniane', snippet: 'Next to St. Benedict himself, St. Benedict of Aniane influenced the shape of Benedictine monasticism in the West more than anyone else. Allied with Holy Roman emperors Charlemagne and Louis the Pious, he promulgated a strict and idealistic monastic reform that lasted nearly two centuries. And Benedi...', title: 'Saint Benedict of Aniane'}
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
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-giles-mary-of-saint-joseph/', snippet: 'Simple, humble persons can sometimes be powerful in their effect on and work with the people of God. Saint Giles Mary of Saint Joseph was such a man. Giles Mary was loved on the streets of Naples for his goodness born of prayer.', title: 'Story of Saint Giles Mary of Saint Joseph'}
						]),
					feast: 'Saint Giles Mary of Saint Joseph'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-catherine-dei-ricci', snippet: 'We are curious about mystics who experience ecstasies and visions. But we tend to regard them as psychologically unbalanced persons. However, when we get to know a genuine mystic like St. Catherine dei Ricci we must abandon our stereotypical view. Catherine was a very competent woman who trained nun...', title: 'Saint Catherine dei Ricci'}
						]),
					feast: 'Saint Catherine dei Ricci'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-ermenilda-of-ely-feb-13', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! The Story of St. Catherine de Ricci \u200B St. Catherine was born in\u00A0Florence\u00A0in 1522. Her baptismal name was Alexandrina, but she took the name of Catherine upon entering religion. From her earliest infancy she manifested a great love of prayer, and in her sixth year, her father placed her in the\u00A0conven...', title: 'Catherine de Ricci'}
						]),
					feast: 'Saint Catherine de Ricci'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-our-lady-of-lourdes-feb-11-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! The Story of Georgia \u200B A virgin hermitess near Clermont, Auvergne, France. \u200B Saint Gregory of Tours in his Historia Francorum tells us that when Saint Georgia was buried angels, in the form of doves, followed her coffin to her grave. \u200B https://the-american-catholic.com/2020/02/15/saint-of-the-day-q...', title: 'Ermenilda of Ely'}
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
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://lpress-craft.loyolapress.com/images/ocf-articles/Microsites/SaintsStories_100x100.jpeg', link: 'https://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saints-cyril-and-methodius/', snippet: 'Cyril and Methodius were brothers, born in Thessalonika, Greece. Cyril (825–869), a philosopher, studied in Constantinople and was ordained a priest. Methodius (826–884), for five years the governor of a Slavic region of the empire, became a monk...', title: 'Saints Cyril and Methodius'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/celebrating-st-valentines-day-with-catholic-kids/', snippet: 'Today I am going to share with you some pintables, resources, crafts, and books to celebrate the true meaning of St. Valentine’s Day with Catholic kids...', title: 'Celebrating St. Valentine’s Day With Catholic Kids'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-valentine', snippet: 'Everyone has heard about Saint Valentine. He’s the patron saint of lovers, and on his day people send anonymous cards or presents to the one they love. But who was Saint Valentine? Well, there was a priest named Valentine who lived in Rome in the third century. He was put in prison because he helpe...', title: 'Saint Valentine'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-valentine-feb-14-2', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! The Story of Saint\u00A0Valentine \u00A0 On February 14around the year 278A.D., Valentine, a holy priest in Rome in the days of Emperor Claudius II, was executed. Under the rule of Claudius the Cruel, Rome was involved in many unpopular and bloody campaigns. The emperor had to maintain a strong army, but was...', title: 'Valentine'}
						]),
					feast: 'Saint Valentine'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saints-cyril-and-methodius/', snippet: 'Often missionaries face the difficulties of language and culture. Saints Cyril and Methodius were no exceptions. But they faced the difficulties by writing the foreign language in a new alphabet and translating the liturgy for the local people.', title: 'Story of Saints Cyril and Methodius'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saints-cyril-and-methodius', snippet: 'Cyril and Methodius were brothers, born in Thessalonika, Greece. Cyril (825–869), a philosopher, studied in Constantinople and was ordained a priest. Methodius (826–884), for five years the governor of a Slavic region of the empire, became a monk. In 861, the two brothers went as missionaries to Rus...', title: 'Saints Cyril and Methodius'}
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
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-claude-de-la-colombiere/', snippet: 'Saint Claude de la Colombière met Saint Margaret Mary Alacoque and eventually became her confessor. Together they advanced devotion to the Sacred Heart at a time when God’s mercy needed emphasis. God raises the right people at the right time to keep his Church on the right path.', title: 'Story of Saint Claude de la Colombière'}
						]),
					feast: 'Saint Claude de la Colombière'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-claude-la-colombiere', snippet: 'All our life is sown with tiny thorns that produce in our hearts a thousand involuntary movements of hatred, envy, fear, impatience, a thousand little fleeting disappointments, a thousand slight worries, a thousand disturbances that momentarily alter our peace of soul. For example, a word escapes th...', title: 'Saint Claude la Colombiére'}
						]),
					feast: 'Saint Claude la Colombiére'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-lenten-companion-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! The Story of Saint Claude de la Colombière \u00A0 This is a special day for the Jesuits, who claim today’s saint as one of their own. It’s also a special day for people who have a special devotion to the Sacred Heart of Jesus—a devotion Claude de la Colombière promoted, along with his friend and spiritua...', title: 'Claude de la Colombière'}
						]),
					feast: 'SaintClaude de la Colombière'
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
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-gilbert-of-sempringham/', snippet: 'Saint Gilbert of Sempringham could have been a wealthy priest, but chose to live far more simply. He founded a religious congregation the Gilbertines, who followed his example of living poorly and caring for those who want. Saint Gilbert live past 100 years of age.', title: 'Story of Saint Gilbert of Sempringham'}
						]),
					feast: 'Saint Gilbert of Sempringham'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-juliana-of-cumae-feb-16', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! The Story of Saint\u00A0Juliana of Cumae \u00A0 Saint Juliana of Cumae\u00A0(also known as Juliana of Nicomedia, died 305), virgin and martyr of the Church. Saint Juliana became widely venerated in Medieval times, with epic poems written about her battle and eventual victory over the Devil. Her Acts, recorded by t...', title: 'Juliana of Cumae'}
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
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://lpress-craft.loyolapress.com/images/ocf-articles/Microsites/SaintsStories_100x100.jpeg', link: 'https://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/seven-founders-of-the-order-of-servites/', snippet: 'Imagine that seven famous businessmen in New York left their homes and careers today to live together in solitude and prayer. The world would be surprised and led to reflect on its values...', title: 'The Seven Holy Founders of the of Servite Order'}
						]),
					feast: 'Seven Holy Founders of the Servite Order'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/seven-founders-of-the-servite-order/', snippet: 'Rather than just talk about the problems of the day, the Seven Founders of the Servite Order did something about it─they consciously left all and formed a new religious congregation to address the issues. They put their money where their mouths were.', title: 'Story of Seven Founders of the Servite Order'}
						]),
					feast: 'Seven Founders of the Servite Order'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/seven-founders-of-the-order-of-servites', snippet: 'Imagine that seven famous businessmen in New York left their homes and careers today to live together in solitude and prayer. The world would be surprised and led to reflect on its values. Seven wealthy, well-known cloth merchants lived in Florence, Italy in the mid-thirteenth century: Bonfilius, Mo...', title: 'The Seven Holy Founders of the of Servite Order'}
						]),
					feast: 'The Seven Holy Founders of the of Servite Order'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-the-seven-holy-founders-of--1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! The Story of the Seven Founders of the Servite Order \u200B Can you imagine seven prominent men of Boston or Denver banding together, leaving their homes and professions, and going into solitude for a life directly given to God? That is what happened in the cultured and prosperous city of Florence in the...', title: 'The Seven Holy Founders of the Servite Order'}
						]),
					feast: 'The Seven Holy Founders of the Servite Order'
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
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Images, image: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/GoogleArtsAndCulture__aIhfPvxu.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676432323426', link: 'https://artsandculture.google.com/entity/fra-angelico/m031b2?categoryId=artist', snippet: 'View ultra-high resolution images of Fra Angelico\'s paintings', title: 'Fra Angelico\'s Paintings'}
						]),
					feast: 'Blessed John of Fiesole (Fra Angelico)'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/blessed-john-of-fiesole/', snippet: 'Blessed John of Fiesole, a Dominican Friar, is also known as Fra Angelico. Famous for his devotional artwork John used his talents to praise God through paint. All talents can be used to praise God.', title: 'Story of Blessed John of Fiesole'}
						]),
					feast: 'Blessed John of Fiesole'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-amy-feb-20', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Fra Angelico\'s Story\u00A0 \u200B Fra Angelico was an Italian painter of the early Renaissance who combined the\u00A0life\u00A0of a devout\u00A0friar\u00A0with that of an accomplished painter. He was called Angelico (Italian for \'angelic\') and Beato (Italian for \'blessed\') because the paintings he did were of calm, religio...', title: 'Fra Angelico'}
						]),
					feast: 'Saint Fra Angelico'
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
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-conrad-of-piacenza/', snippet: 'Saint Conrad offers a different slant of holiness. Married, he and his wife opted to live separate lives─she as a Poor Clare and he as a Franciscan hermit. All this after he set a fire which was spread by the wind and destroyed the nearby fields, forests, and town.', title: 'Story of Saint Conrad of Piacenza'}
						]),
					feast: 'Saint Conrad of Piacenza'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-the-seven-holy-founders-of-', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Odran Story \u200B The death of St Odran According to the Tripartite Life of Saint Patrick (Vita tripartita Sancti Patricii) St Odran’s death, in simpler terms, was a case of mistaken identity but \u00A0gave up his life to save St Patrick. When St Patrick arrived in Ireland\u00A0he went about destroying pag...', title: 'Saint Odran'}
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
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saints-jacinta-and-francisco-marto/', snippet: 'Two young children who died early in life, Jacinta and Francisco Marto, gained the attention of the Church and the world when Mary appeared to them at Fatima. Without being martyred, they became witnesses and messengers of God’s goodness.', title: 'Story of Saints Jacinta and Francisco Marto'}
						]),
					feast: 'Saints Jacinta and Francisco Marto'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/blesseds-francisco-and-jacinta-marto', snippet: 'On a beautiful Sunday afternoon, May 13, 1917, three children were laughing and chatting as they kept watch over their families’ sheep. This afternoon they were building a playhouse out of brush and rocks. Suddenly a bright light flashed. They thought it was lightning. Then it flashed again. They sa...', title: 'Saints Francisco and Jacinta Marto'}
						]),
					feast: 'Saints Francisco and Jacinta Marto'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-amy-feb-20-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! When she was young, Saint Amata of Assisi rejected God and rebelled against morality. Eventually her aunt, Saint Clare of Assisi, converted her and brought the girl into her religious order...', title: 'Amy (Amata of Assisi)'}
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
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://lpress-craft.loyolapress.com/images/ocf-articles/Microsites/SaintsStories_100x100.jpeg', link: 'https://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-peter-damian/', snippet: 'Born in Ravenna, Italy, in 1007, Peter Damian knew hardship as a child. He became a successful teacher, but only for a short time...', title: 'Saint Peter Damian'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-peter-damian/', snippet: 'If it hadn’t been for an elder brother taking him under his wing, Saint Peter Damian may have taken a very different path in life. But with his brother’s guidance, he matured into a holy man, monk, and bishop. A man of prayer and devotion, Peter Damian was also a spiritual writer.', title: 'Story of Saint Peter Damian'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-peter-damian', snippet: 'Born in Ravenna, Italy, in 1007, Peter Damian knew hardship as a child. He became a successful teacher, but only for a short time. He was ordained to the priesthood, and in 1035, he entered a Benedictine monastery. The monks lived in small hermitages, with two monks in each. Peter was known for his...', title: 'Saint Peter Damian'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-peter-damian-feb-21-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Peter Damian’s Story \u200B Maybe because he was orphaned and had been treated shabbily by one of his brothers, Peter Damian was very good to the poor. It was the ordinary thing for him to have a poor person or two with him at table and he liked to minister personally to their needs. Peter escaped...', title: 'Peter Damian'}
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
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://2.bp.blogspot.com/_pUXaddJMQyw/TU9zVNqMGvI/AAAAAAAAEt4/SFvGzWmY7ZY/s400/rice+krispie+grotto+2.jpg', link: 'https://www.catholicicing.com/pretzels-for-lent/', snippet: 'Did you know that the pretzel is a traditional food for lent? In fact, the pretzel was actually invented in order to be a simple Lenten snack!', title: 'Lenten Pretzel Recipe (And A Printable Pretzel Prayer Poem)'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/Cultivating_Catholics_Logo_GpMJodURB.png?updatedAt=1680400021552', link: 'https://cultivatingcatholics.com/product/free-meatless-lent-recipes-instant-download/', snippet: 'Tired of pizza and fish for dinner during Fridays in Lent? Here are 10 meat-free (and seafood-free!) meal ideas.', title: 'Meatless Lent Recipes'}
						]),
					feast: 'Ash Wednesday'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/chair-of-saint-peter/', snippet: 'Every cathedral has a “cathedra,” a bishop’s chair that is used only by the bishop when he presides in the cathedral. It’s a symbol of his authority as chief teacher and liturgist of the diocese. So, today we celebrate the authority of the chief bishop, Saint Peter and his successors, the popes.', title: 'Story of Chair of Saint Peter'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-lenten-companion-feb-20', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! The Story of the Chair of Saint Peter \u200B This feast commemorates Christ’s choosing Peter to sit in his place as the servant-authority of the whole Church. \u200B After the “lost weekend” of pain, doubt, and self-torment, Peter hears the Good News. Angels at the tomb say to Magdalene, “The Lord has risen!...', title: 'Chair of Saint Peter'}
						]),
					feast: 'Chair of Saint Peter'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/chair-of-peter', snippet: 'When the pope cautions world leaders, pleads for peace, or condemns social injustice, people listen and respond. What makes the world listen to this man? The answer lies in Scripture and in Tradition. Peter is named first among the apostles of Jesus; he was often their spokesman and leader; he was t...', title: 'The Chair of Saint Peter the Apostle'}
						]),
					feast: 'The Chair of Saint Peter the Apostle'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-chair-of-saint-peter-feb-22', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Margaret of Cortona\'s Story \u00A0 Margaret of Cortona, penitent, was born in Loviana in\u00A0Tuscany\u00A0in 1247. Her father was a small farmer. Margaret\'s mother died when she was seven years old. Her stepmother had little care for her high-spirited daughter. Rejected at home, Margaret eloped with a youth...', title: 'Margaret of Cortona'}
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
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://lpress-craft.loyolapress.com/images/ocf-articles/Microsites/SaintsStories_100x100.jpeg', link: 'https://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-polycarp/', snippet: 'The story of Polycarp’s martyrdom is the earliest recorded account of a Christian martyr. Polycarp was a disciple of St. John the apostle. While still quite young, he became the bishop of Smyrna and was one of the most respected leaders...', title: 'Saint Polycarp'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-polycarp/', snippet: 'Without knowing a whole lot about Saint Polycarp, he has entered into the life of the Church because he was a martyr–a witness to the faith with his life. That level of testimony to the faith is notable.', title: 'Story of Saint Polycarp'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-polycarp', snippet: 'The story of Polycarp’s martyrdom is the earliest recorded account of a Christian martyr. Polycarp was a disciple of St. John the apostle. While still quite young, he became the bishop of Smyrna and was one of the most respected leaders in the first half of the second century. St. Ignatius of Antioc...', title: 'Saint Polycarp'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-peter-damian-feb-21', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Anne Line\'s Story \u200B St Anne is believed to have been born as \'Alice Higham\' or \'Heigham\', the eldest daughter of the Puritan William Higham of Jenkyn Maldon. William Higham was the son of\u00A0Roger Heigham,\u00A0MP, a Protestant reformer under\u00A0Henry VIII.\u00A0A recently scholarly and extensively annotated...', title: 'Polycarp'}
						]),
					feast: 'Saint Polycarp'
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
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/blessed-luke-belludi/', snippet: 'Was Blessed Luke Belludi just at the right place at the right time, or was there something more at work in his happening to meet Saint Anthony and become his protégé? We would all agree that this is how the Lord works─through convenient happenstances.', title: 'Story of Blessed Luke Belludi'}
						]),
					feast: 'Blessed Luke Belludi'
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
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/blessed-sebastian-of-aparicio/', snippet: 'Some holy people have a rather full life spread over a couple of vocations. Blessed Sebastian of Aparicio is such a person having been married twice before becoming a Franciscan.', title: 'Story of Blessed Sebastian of Aparicio'}
						]),
					feast: 'Blessed Sebastian of Aparicio'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-ethelbert', snippet: 'Pope Gregory decided he must send someone to spread the Christian message to England. The man he chose was Augustine, who set off from Rome with 40 companions in the year 596. The Romans no longer ruled Europe. Much of the North was overrun with brigands, robbers, and barbarians. On his journey thr...', title: 'Saint Ethelbert'}
						]),
					feast: 'Saint Ethelbert'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-lenten-companion-feb-24', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! The Story of\u00A0Saint\u00A0Walburga \u200B Walburga\u00A0belonged to an extraordinary English family, five of whom are saints. She herself also became a missionary in Germany and even to the present day has a curious place in German folklore.\u00A0Patrick Duffy\u00A0tells\u00A0her story. She was born in Wessex, England, about 710,...', title: 'Walburga'}
						]),
					feast: 'Saint Walburga'
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
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-maria-bertilla-boscardin/', snippet: 'Courage, perseverance, and hope seem to characterize Saint Maria Bertilla Boscardin. In spite of all odds, she kept going and, in the process, helped many people find healing and peace.', title: 'Story of Saint Maria Bertilla Boscardin'}
						]),
					feast: 'Saint Maria Bertilla Boscardin'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-alexander', snippet: 'Trouble dogged St. Alexander from the moment he became bishop of Alexandria in 312. Immediately, he had to deal with opposition from Meletius of Lycopolis, whose rigorism toward lapsed Catholics had led him into schism. He also had problems with Kolluth, a priest who had usurped the power to ordain...', title: 'Saint Alexander'}
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
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://mycatholic.life/wp-content/uploads/2021/08/My-Catholic-Life-MCL-Header.jpg', link: 'https://mycatholic.life/saints/saints-of-the-liturgical-year/saint-gregory-of-narek/', snippet: 'The Apostles Saint Jude Thaddeus and Saint Bartholomew are believed to have traveled to Armenia to share the Gospel. In 301 A.D., the Armenian king was converted who, in turn, made Christianity the kingdom’s official religion, making Armenia the first nation to do so...', title: 'Saint Gregory of Narek'}
						]),
					feast: 'Saint Gregory of Narek'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-gabriel-of-our-lady-of-sorrows/', snippet: 'Disappointments, setbacks, loss, and suffering seem to define the life of Saint Gabriel of Our Lady of Sorrows. But undeterred by whatever happened, Saint Gabriel kept his focus and lived life well─so well that he was an example to both young and old.', title: 'Story of Saint Gabriel of Our Lady of Sorrows'}
						]),
					feast: 'Saint Gabriel of Our Lady of Sorrows'
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
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/blessed-daniel-brottier/', snippet: 'Some people would call Blessed Daniel Brottier “lucky.” But in the eyes of faith, God’s providence and desire for Blessed Daniel to do great things in his kingdom is what protected him in some very dangerous situations. Blessed Daniel cooperated with that providence and became an example to all.', title: 'Story of Blessed Daniel Brottier'}
						]),
					feast: 'Blessed Daniel Brottier'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-gabriel-francis-possenti', snippet: 'Hagiographers make sanctity seem impossible for us when they tell fanciful stories about a saint’s early life. How little saint so-and-so was always rapt in prayer, worked miracles, undertook severe mortifications, never had a sexual thought, and so on. Thank God for St. Gabriel Francis Possenti and...', title: 'Saint Gabriel Francis Possenti'}
						]),
					feast: 'Saint Gabriel Francis Possenti'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-angela-of-foligno', snippet: 'Angela of Foligno is a model for people who want to simplify their lifestyle. As a young adult she reveled in luxury and sensuality. She married a rich man of Foligno, Italy, and used his wealth to indulge herself in possessions. And her impetuous temperament nudged her into sinful behavior. However...', title: 'Saint Angela of Foligno'}
						]),
					feast: 'Saint Angela of Foligno'
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
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-oswald/', snippet: 'Saint Oswald knew people in high places─his uncle was the archbishop of Canterbury. But even though he received “favors” from his uncle, he served humbly and gained holiness through God’s grace.', title: 'Story of Saint Oswald'}
						]),
					feast: 'Saint Oswald'
				},
					{
					activities: _List_fromArray(
						[
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-john-cassian', snippet: 'Around 380, John Cassian migrated from Romania to Bethlehem, where he embraced the monastic life. After 385 he wandered the Egyptian desert, the heart of eastern monasticism. He visited abbots at monasteries and hermits in their caves, absorbing their teachings about the Christian life. The year 40...', title: 'Saint John Cassian'}
						]),
					feast: 'Saint John Cassian'
				}
				])
		}
		]),
	key: 'feb',
	month: 'February'
};
var $author$project$FeastDayActivities$FeastDayHelpers$Book = {$: 'Book'};
var $author$project$FeastDayActivities$FeastDayHelpers$Game = {$: 'Game'};
var $author$project$FeastDayActivities$FeastDayHelpers$Printout = {$: 'Printout'};
var $author$project$FeastDayActivities$FeastDays$M01Jan$janFeasts = _List_fromArray(
	[
		{
		date: '1',
		feasts: _List_fromArray(
			[
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Video, image: '', link: 'https://www.youtube-nocookie.com/embed/HW0DzGEoa1Y', snippet: '', title: 'Hail Mary, Full of Grace'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Video, image: '', link: 'https://www.youtube-nocookie.com/embed/HoAUG7htvkA', snippet: '', title: 'Born of Woman'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Game, image: 'https://3.bp.blogspot.com/_OdlDH5TOnZ8/S3nCLk9d_VI/AAAAAAAACCo/ogcGrC6sDPY/s320/MaryGameBoard.png', link: 'https://catholicblogger1.blogspot.com/2009/04/mary-is-mother-of-our-church.html', snippet: 'The objective of the game is to answer questions about Mary and receive a letter tile and spell Mary. Place your marker anywhere on the board...', title: 'Mary, Mother of Our Church File Folder Game'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Crafts, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/ThatArtistWoman_-lQHC5LdH.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401274351', link: 'http://www.thatartistwoman.org/2008/12/pastel-resist-madonna-art-project.html', snippet: 'You only need some basic supplies for this one. Try to find heavy kraft paper if you can...', title: 'Pastel Resist Madonna - Art Project'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Crafts, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/how-to-draw-mary-and-baby-jesus/', snippet: 'A step by step video for kids', title: 'How To Draw Mary And Baby Jesus (Easy!)'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://lpress-craft.loyolapress.com/images/ocf-articles/Microsites/SaintsStories_100x100.jpeg', link: 'https://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/solemnity-of-mary/', snippet: 'Way back in 431, there was a bitter controversy among theologians over the role of Mary in the Catholic Church. They debated the question: Who is Mary in God’s plan? In the end, the bishops declared that...', title: 'Solemnity of Mary, the Holy Mother of God'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-solemnity-of-mary-the-holy-', snippet: 'Mary’s divine motherhood broadens the Christmas spotlight. Mary has an important role to play in the Incarnation of the Second Person of the Blessed Trinity. She consents to God’s invitation conveyed by the angel (Luke 1:26-38)...', title: 'The Story of Mary, Mother of God'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_a235ca1bce84403c87d185b7daaa3e2c~mv2.jpg/v1/fill/w_720,h_545,al_c,lg_1,q_85,enc_auto/9c2964_a235ca1bce84403c87d185b7daaa3e2c~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-solemnity-of-mary-the-holy-', snippet: '', title: 'Smoked Sausage and Black-Eyed Peas'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_e5144304a75546688cdc08cd771a4030~mv2.jpg/v1/crop/x_81,y_59,w_603,h_471/fill/w_676,h_565,al_c,lg_1,q_85,enc_auto/9c2964_e5144304a75546688cdc08cd771a4030~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-solemnity-of-mary-the-holy-', snippet: '', title: 'Broccoli Cornbread Mini Muffins'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_b4647017bd7c404d9ae193673bbbd2d6~mv2.jpeg/v1/fill/w_714,h_554,al_c,lg_1,q_85,enc_auto/9c2964_b4647017bd7c404d9ae193673bbbd2d6~mv2.jpeg', link: 'https://www.saintsfeastfamily.com/copy-of-solemnity-of-mary-the-holy-', snippet: '', title: 'Sweet Buttermilk Cornbread'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_0a4855c5e3e94eaab4557fc3213b9ecd~mv2.jpg/v1/fill/w_583,h_423,al_c,lg_1,q_80,enc_auto/9c2964_0a4855c5e3e94eaab4557fc3213b9ecd~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-solemnity-of-mary-the-holy-', snippet: '', title: 'German New Years Cake'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/mary-mother-of-god/', snippet: 'Mary’s divine motherhood broadens the Christmas spotlight. Hers role as mother of God places her in a unique position in God’s redemptive plan.', title: 'Story of Mary, Mother of God'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/solemnity-of-mary', snippet: 'Way back in 431, there was a bitter controversy among theologians over the role of Mary in the Catholic Church. They debated the question: Who is Mary in God’s plan? In the end, the bishops declared that Mary is really the mother of Jesus and Jesus is really God. So it must be said that Mary is the...', title: 'Solemnity of Mary, the Holy Mother of God'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-solemnity-of-mary-the-holy-', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! The Story of Mary, Mother of God \u200B Mary’s divine motherhood broadens the Christmas spotlight. Mary has an important role to play in the Incarnation of the Second Person of the Blessed Trinity. She consents to God’s invitation conveyed by the angel (Luke 1:26-38). Elizabeth proclaims: “Most blessed a...', title: 'Solemnity of Mary the Holy Mother of God'}
					]),
				feast: 'Mary, Mother of God'
			}
			])
	},
		{
		date: '2',
		feasts: _List_fromArray(
			[
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Video, image: '', link: 'https://www.youtube-nocookie.com/embed/lwe8voh3H_4', snippet: '', title: 'Ss. Gregory & Basil'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-basil-the-great-jan-2', snippet: 'St. Basil was a very close friend of St. Gregoryn the Bishop of Nazianzus - Constantinople. Together they wrote an outstanding works...', title: 'Saint Basil the Great'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-gregory-of-nazianzus-jan-2', snippet: 'After his baptism at 30, Gregory gladly accepted his friend Basil’s invitation to join him in a newly founded monastery. The solitude was broken when Gregory’s father, a bishop, needed help in his diocese and estate...', title: 'Saint Gregory of Nazianzus'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_e91e23b66c7d434da5fc63652cbed30d~mv2.png/v1/fill/w_584,h_512,al_c,lg_1,q_85,enc_auto/9c2964_e91e23b66c7d434da5fc63652cbed30d~mv2.png', link: 'https://www.saintsfeastfamily.com/copy-of-st-basil-the-great-jan-2', snippet: '', title: 'Vasilopita Bread'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_e91e23b66c7d434da5fc63652cbed30d~mv2.png/v1/fill/w_584,h_512,al_c,lg_1,q_85,enc_auto/9c2964_e91e23b66c7d434da5fc63652cbed30d~mv2.png', link: 'https://www.saintsfeastfamily.com/copy-of-st-basil-the-great-jan-2', snippet: '', title: 'Vasilopita Cake'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_38dca455491840dc8f74daf2a335dc5d~mv2.jpg/v1/fill/w_659,h_473,al_c,lg_1,q_80,enc_auto/9_3_edited.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-gregory-of-nazianzus-jan-2', snippet: '', title: 'Hünkar Beğendi'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/make-a-jewel-cake-for-st-basil-on-new-years/', snippet: 'St. Basil’s feast day is on January 2, but it has become a Catholic tradition to make a “St. Basil’s Cake” on New Year’s to celebrate one of his miracles...', title: 'Jewel Cake'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/st-basils-hidden-jewel-cupcakes-easy-to-make/', snippet: 'Slice a small hole in the top of the cupcake using a butter knife, and stick a lifesaver candy “jewel” inside...', title: 'St Basil\'s Cupcakes'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-basil-the-great/', snippet: 'Saint Basil is the Father of Eastern monasticism—as Saint Benedict is for western monasticism. Besides being a good pastor, Saint Basil also lead the fight against Arianism, a heresy that denied the divinity of Christ.', title: 'Story of Saint Basil the Great'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-basil-the-great-and-saint-gregory-nazianzen', snippet: 'Basil was educated in Caesarea, Constantinople, and Athens in the fourth century. He enjoyed stimulating university life. There he met Gregory Nazianzen, a quiet, scholarly man. The two became close friends. Basil traveled through the East and studied monastic life. As a result, he formed his own mo...', title: 'Saints Basil the Great and Gregory Nazianzen'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-basil-the-great-jan-2', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! St. Basil\'s Story St. Basil was a very close friend of St. Gregoryn the Bishop of Nazianzus - Constantinople. Together they wrote an outstanding works. The Divine Liturgy of St. Basil the Great is the one most commonly used year around in the Coptic Church. The Basilian Liturgy drew heavily from th...', title: 'Basil the Great'}
					]),
				feast: 'Saints Basil the Great and Gregory Nazianzus'
			}
			])
	},
		{
		date: '3',
		feasts: _List_fromArray(
			[
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Video, image: '', link: 'https://www.youtube-nocookie.com/embed/muyR_oFp8oE', snippet: '', title: 'The Name Above All Names'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://www.simplycatholic.com/wp-content/uploads/2018/12/Jesus1.jpg', link: 'https://www.simplycatholic.com/why-we-celebrate-the-holy-name-of-jesus/', snippet: 'This is a great activity for Catholic kids when learning about Jesus and the bible. This lesson is so fun because you actually learn how to draw Jesus’s name in negative space...', title: 'Why We Celebrate the Holy Name of Jesus'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-the-most-holy-name-of-jesus-1', snippet: 'The month of January is traditionally dedicated to the Holy Name of Jesus, with January 3rd being the feast of the Holy Name. After the Blessed Virgin Mary had conceived her Child by the Holy Spirit, the angel Gabriel...', title: 'Saint Gregory of Nazianzus'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Printout, image: 'https://www.catholicicing.com/wp-content/uploads/2020/01/negative-space-lesson-how-to-draw-jesus.jpg', link: 'https://www.catholicicing.com/how-to-draw-holy-name-of-jesus/', snippet: 'This is a great activity for Catholic kids when learning about Jesus and the bible. This lesson is so fun because you actually learn how to draw Jesus’s name in negative space...', title: 'How To Draw The Most Holy Name Of Jesus'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Book, image: 'https://m.media-amazon.com/images/I/51KgwkrXsQL._SX311_BO1,204,203,200_.jpg', link: 'https://www.amazon.com/Wonders-Holy-Name-Paul-OSullivan/dp/0895554909', snippet: 'This booklet, The Wonders of the Holy Name', title: 'The Wonders of the Holy Name'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_509e915a37e847fb8dc2a1a229ebd879~mv2.jpg/v1/crop/x_0,y_0,w_640,h_657/fill/w_562,h_576,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/791bbe7f2e139eb2d01a3f2c92050acc.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-the-most-holy-name-of-jesus-1', snippet: 'The month of January is traditionally dedicated to the Holy Name of Jesus, with January 3rd being the feast of the Holy Name. After the Blessed Virgin Mary had conceived her Child by the Holy Spirit, the angel Gabriel...', title: 'Prosphora Orthodox Bread'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-the-most-holy-name-of-jesus-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! The month of January is traditionally dedicated to the Holy Name of Jesus, with January 3rd being the feast of the Holy Name. After the Blessed Virgin Mary had conceived her Child by the Holy Spirit, the angel Gabriel appeared to St. Joseph and instructed him that the Child’s name should be called J...', title: 'The Most Holy Name of Jesus'}
					]),
				feast: 'The Most Holy Name of Jesus'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/most-holy-name-of-jesus/', snippet: 'Saint Paul tells us in his Letter to the Philippians that Jesus’ name is above every other name. It is the name in which we are all saved. Devotion to the Most Holy Name of Jesus is deeply rooted in Christian history.', title: 'Story of Most Holy Name of Jesus'}
					]),
				feast: 'Most Holy Name of Jesus'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-genevieve', snippet: 'On his way to combat heresy in Britain, St. Germanus of Auxerre made an overnight stop at Nanterre, France. In the crowd that gathered to hear him speak, Germanus spotted Genevieve (or Genovefa), a beautiful 7-year-old girl, and he foresaw her future holiness. When he asked little St. Genevieve if s...', title: 'Saint Genevieve'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-the-most-holy-name-of-jesus', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! St. Genevieve\'s Story \u200B St. Geneviève, French\u00A0Sainte Geneviève,\u00A0German\u00A0Sankt Genovefa, (born\u00A0c.\u00A0422,\u00A0Nanterre, France?—died\u00A0c.\u00A0500, Paris; feast day January 3),\u00A0 patron saint\u00A0of Paris, who allegedly saved that city from the\u00A0Huns. When she was seven, Geneviève was induced by Bishop\u00A0St. Germain of Aux...', title: 'Genevieve'}
					]),
				feast: 'Saint Genevieve'
			}
			])
	},
		{
		date: '4',
		feasts: _List_fromArray(
			[
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Video, image: '', link: 'https://www.youtube-nocookie.com/embed/896zFSI81X4', snippet: '', title: 'The First American Saint'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Video, image: '', link: 'https://www.youtube-nocookie.com/embed/fR42gZv9T3A', snippet: '', title: 'Betty Bayley Becomes A Saint'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://lpress-craft.loyolapress.com/images/ocf-articles/Microsites/SaintsStories_100x100.jpeg', link: 'https://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-elizabeth-ann-seton/', snippet: 'Who was the first person born in the United States to be declared a saint? Who opened the first American Catholic parish school and established the first American Catholic orphanage? ...', title: 'Saint Elizabeth Ann Seton'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-elizabeth-ann-seton-jan--1', snippet: 'Saint Elizabeth Ann Seton was the first native-born citizen of the United States to be canonized by the Roman Catholic Church. Mother Seton is one of the keystones of the American Catholic Church...', title: 'Saint Elizabeth Ann Seton\'s Story'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Printout, image: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/ElizabethAnnSetonWordSearch_IUJjxiyxd.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675555824047', link: 'https://setonshrine.org/wp-content/uploads/2016/02/Activity-Seton-Word-Search.pdf', snippet: 'A themed word search for older kids.', title: 'Elizabeth Ann Seton Word Find'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_ea5027fa315445ffab9e8c41da1f901b~mv2_d_3188_3187_s_4_2.jpeg/v1/fill/w_868,h_868,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/9c2964_ea5027fa315445ffab9e8c41da1f901b~mv2_d_3188_3187_s_4_2.jpeg', link: 'https://www.saintsfeastfamily.com/copy-of-st-elizabeth-ann-seton-jan--1', snippet: '', title: 'Corn and Crab Bisque'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_7b87e042e19046e88cf334473f82ec25~mv2.jpg/v1/crop/x_18,y_454,w_366,h_444/fill/w_439,h_532,al_c,lg_1,q_80,enc_auto/9c2964_7b87e042e19046e88cf334473f82ec25~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-elizabeth-ann-seton-jan--1', snippet: '', title: 'Oly Koeken, Vet Ballen, Vet Bollen, Ole Bollen, Oliekoecken....aka Oil Balls'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'https://www.catholicicing.com/wp-content/uploads/2016/02/header-social.jpg', link: 'https://www.activityvillage.co.uk/schoolhouse-photo-frame', snippet: 'See Catholic Icing for more activity ideas to celebrate this saint!', title: 'Catholic Icing'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-elizabeth-ann-seton/', snippet: 'Convert, wife, mother, widow, teacher, religious─Saint Elizabeth Ann Seton did it all. Yet, in many ways, she was an ordinary woman of her time who lived life in an extraordinary way.', title: 'Story of Saint Elizabeth Ann Seton'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-elizabeth-ann-seton', snippet: 'Who was the first person born in the United States to be declared a saint? Who opened the first American Catholic parish school and established the first American Catholic orphanage? Who founded the first native American religious community of women? The answers to all these questions are the same:...', title: 'Saint Elizabeth Ann Seton'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-elizabeth-ann-seton-jan--1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Elizabeth Ann Seton\'s Story \u200B Saint Elizabeth Ann Seton was the first native-born citizen of the United States to be canonized by the Roman Catholic Church. Mother Seton is one of the keystones of the American Catholic Church. She founded the first American religious community for women, the S...', title: 'Elizabeth Ann Seton'}
					]),
				feast: 'Saint Elizabeth Ann Seton'
			}
			])
	},
		{
		date: '5',
		feasts: _List_fromArray(
			[
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Video, image: '', link: 'https://www.youtube-nocookie.com/embed/7CEbPb-Y0gs', snippet: '', title: 'St. John Neumann'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://www.catholic.org/saints/ff_images/85.jpg', link: 'https://www.catholic.org/saints/fun_facts_arch.php?saint=70', snippet: 'This American saint was born in Bohemia in 1811. He was looking forward to being ordained in 1835 when...', title: 'Saints Fun Facts: St. John Neumann'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-john-neumann-jan-5-1', snippet: 'John was appointed bishop of Philadelphia in 1852. As bishop, he was the first to organize a diocesan Catholic school system. A founder of Catholic education in the United States of America...', title: 'St. John Neumann\'s Story '},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_380d753f39684036b7a1360c29e0532c~mv2.png/v1/crop/x_15,y_14,w_726,h_550/fill/w_726,h_550,al_c,q_90,enc_auto/9c2964_380d753f39684036b7a1360c29e0532c~mv2.png', link: 'https://www.saintsfeastfamily.com/copy-of-st-john-neumann-jan-5-1', snippet: '', title: 'Svíčková with Dumplings'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-john-neumann/', snippet: 'Saint John Neumann was the first member of his community, the Redemptorists, to profess vows in the United States. He did missionary work in Maryland, Virginia, and Ohio, and became the bishop of Philadelphia. Noted for his humility and organizational skills, he helped form the Church in the New World.', title: 'Story of Saint John Neumann'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-john-neumann', snippet: 'As a boy, John Neumann lived in Bohemia, which is now part of Czech Republic. He studied hard, for he wanted to be a missionary priest in America. By the time he was twenty-four, he had learned six languages and had completed his studies for the priesthood. He was not ordained, however, because his...', title: 'Saint John Neumann'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-john-neumann-jan-5-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! St.\u00A0John Neumann\'s Story\u00A0 John was appointed bishop of Philadelphia in 1852. As bishop, he was the first to organize a diocesan Catholic school system. A founder of Catholic education in the United States of America, he increased the number of Catholic schools in his diocese from two to 100. \u00A0 Sain...', title: 'John Neumann'}
					]),
				feast: 'Saint John Neumann'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-simeon-the-stylite', snippet: 'Many Christians give up something meaningful to them during Lent. Lent is a reminder of the 40 days when Jesus lived in the desert while he prepared himself for his work of teaching and healing. For him, it was a way to get away from everyday life and having to concentrate on praying without interru...', title: 'Saint Simeon the Stylite'}
					]),
				feast: 'Saint Simeon the Stylite'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-the-epiphany-jan-6-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Gifts to our King \u00A0 The gift of gold was significant because it showed the Magis paying tribute to Jesus Christ as their King because he is royal. \u00A0 The gift of frankincense was a gift of experience. Known in the Bible to be a symbol of the divinity of God (Song of Solomon 1:3, Malachi 1:11), when F...', title: 'The Eve of the Epiphany'}
					]),
				feast: 'The Eve of the Epiphany'
			}
			])
	},
		{
		date: '6',
		feasts: _List_fromArray(
			[
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Video, image: '', link: 'https://www.youtube-nocookie.com/embed/nMeuF62R6hw', snippet: '', title: 'Feast of the Epiphany'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Video, image: '', link: 'https://www.youtube-nocookie.com/embed/8vzYYJK1_pg', snippet: '', title: 'My Time with Jesus - Epiphany'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', link: 'https://www.franciscanmedia.org/sunday-soundbites/sunday-soundbite-for-january-8-2023/', snippet: 'Today’s feast of the Epiphany of the Lord is a feast that celebrates communication. The Gospel we read today portrays Jesus, the Word Made Flesh revealed to the nations, as the wise men arrive to pay him homage...', title: 'Epiphany of the Lord'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-the-epiphany-jan-6-1', snippet: 'The gift of gold was significant because it showed the Magis paying tribute to Jesus Christ as their King because he is royal...', title: 'Gifts to our King'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/epiphany-house-blessing-with-chalk/', snippet: 'The Epiphany house blessing of the door is a really great Catholic tradition for families...', title: 'Epiphany House Blessing with Chalk'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Crafts, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/k-is-for-king-bible-alphabet-crafts-for-kids/', snippet: 'I love to make wearable crafts with preschoolers, because they love wearing them...', title: 'K is for King'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Crafts, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/3-kings-epiphany-crafts/', snippet: 'Ornament Craft, peg doll wraps, and printable nativity set!', title: '3 Kings Epiphany Crafts For Kids'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Crafts, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/star-of-wonder-star-of-night/', snippet: '', title: 'Star Crafts'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/epiphany-crown-food-ideas/', snippet: 'I found all kinds of crown cakes, king cakes, king breads, and everything else under the sun for celebrating the epiphany...', title: 'Epiphany Crown Food Ideas'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_c59aa4a5eb5d467f91acf84877a51c5b~mv2.jpg/v1/fill/w_772,h_960,al_c,q_85,enc_auto/9c2964_c59aa4a5eb5d467f91acf84877a51c5b~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-the-epiphany-jan-6-1', snippet: '', title: 'La Galette des Rois: The French King Cake'}
					]),
				feast: 'The Epiphany of the Lord'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://www.catholic.org/files/images/saints/18.jpg', link: 'https://www.catholic.org/saints/saint.php?saint_id=18', snippet: 'When Alfred Bessette came to the Holy Cross Brothers in 1870, he carried with him a note from...', title: 'St. Andre Bessette'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-andre-bessette-jan-6', snippet: 'Brother André expressed a saint’s faith by a lifelong devotion to Saint Joseph. Sickness and weakness dogged André from birth. He was the eighth of 12 children born to a French Canadian couple near Montreal...', title: 'Saint André Bessette’s Story'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Video, image: '', link: 'https://www.youtube-nocookie.com/embed/brwYgiR8vHo', snippet: '', title: 'Blessed Andre Bessette'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Video, image: '', link: 'https://www.youtube-nocookie.com/embed/NGzM8sr6w7s', snippet: '', title: 'The Story of Saint Brother Andre Bessette of Canada'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_eca3f6a909d34f4fbfa492de547ebaae~mv2.jpg/v1/crop/x_0,y_0,w_614,h_408/fill/w_736,h_490,al_c,lg_1,q_85,enc_auto/9c2964_eca3f6a909d34f4fbfa492de547ebaae~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-andre-bessette-jan-6', snippet: '', title: 'Maple Tourlouche Upside Down Cake\u200B'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-andre-bessette/', snippet: 'Saint André Bessette was orphaned at 12, and eventually worked in the United States during the Civil War. At 25, he became a Brother of the Holy Cross.', title: 'Story of Saint André Bessette'}
					]),
				feast: 'Saint André Bessette'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-gertrude-of-delft', snippet: 'While working as a servant-girl at Delft in the Netherlands, Gertrude was engaged to be married. But her fiancé broke up with her and married another woman. Broken-hearted at first, Gertrude gradually overcame her anguish and chose a new direction for her life. She joined the Béguines at Delft, spen...', title: 'Saint Gertrude of Delft'}
					]),
				feast: 'Saint Gertrude of Delft'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-andre-bessette-jan-6-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Balthazar\'s Story \u00A0 Balthasar, also known as Balthazar, Balthassar or Bithisarea was born presumably by calculations, around 25-20 BC and was one of the members of the legendary three wise men, mostly referred to as Magi, who went to visit and gift baby Jesus. He was referred to as the King of...', title: 'Andre Bessette'}
					]),
				feast: 'Saint Andre Bessette'
			}
			])
	},
		{
		date: '7',
		feasts: _List_fromArray(
			[
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Video, image: '', link: 'https://www.youtube-nocookie.com/embed/b1yNa55xmjM', snippet: '', title: 'St. Raymond of Peñafort'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_aa20a20c033d476993f14f7d92a235b7~mv2.jpg/v1/fill/w_388,h_559,al_c,lg_1,q_80,enc_auto/9c2964_aa20a20c033d476993f14f7d92a235b7~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-raymond-of-penafort-jan--1', snippet: 'Born in Spain, St. Raymond was a relative of the King of Aragon. From childhood he had a tender love and devotion to the Blessed Mother. He finished his studies at an early age, and became a famous teacher...', title: 'St. Raymond of Pennafort\'s Story'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_ef27b6ef1deb4e6ab35d6b07902bc923~mv2.jpg/v1/crop/x_145,y_27,w_879,h_546/fill/w_879,h_546,al_c,q_85,enc_auto/9c2964_ef27b6ef1deb4e6ab35d6b07902bc923~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-raymond-of-penafort-jan--1', snippet: '', title: 'Barcelona Vegan Potato Bombas'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-raymond-of-penafort/', snippet: 'Saint Raymond of Peñafort was a lawyer who used his talents to both compile legislation for easy access and to write legal treatises on penance for the use of confessors.', title: 'Story of Saint Raymond of Peñafort'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-raymond-of-penyafort', snippet: 'As a lawyer, priest, and preacher, St. Raymond of Penyafort made a significant mark on the history of Spain and the church. His preaching helped re-Christianize Spain after the Moors were overthrown. And his compilation of papal and conciliar decrees was the main source of canon law for seven centur...', title: 'Saint Raymond of Penyafort'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-raymond-of-penafort-jan--1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! St. Raymond of Pennafort\'s Story \u200B Born in Spain, St. Raymond was a relative of the King of Aragon. From childhood he had a tender love and devotion to the Blessed Mother. He finished his studies at an early age, and became a famous teacher. He then gave up all his honors and entered the Order of th...', title: 'Raymond of Penafort'}
					]),
				feast: 'Saint Raymond of Peñafort'
			}
			])
	},
		{
		date: '8',
		feasts: _List_fromArray(
			[
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Video, image: '', link: 'https://www.youtube-nocookie.com/embed/75F5qJw5YEY', snippet: '', title: 'Washed Away'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-the-baptism-of-the-lord-jan-2', snippet: 'The Baptism of the Lord has historically been associated with the celebration of Epiphany. Even today, the Eastern Christian feast of Theophany, celebrated on January 6 as a counterpart to the Western feast of Epiphany...', title: 'The Story of the Feast of the Baptism of the Lord'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', link: 'https://www.franciscanmedia.org/sharing-the-word/sharing-the-word-for-january-9-2023/', snippet: 'Today we have Matthew’s account of the baptism of Jesus. We know of course that Jesus was sinless, and so the idea of “washing from sin” does not apply here.', title: 'Feast of the Baptism of the Lord'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_84b36bb57bbd46aba6939360c752267c~mv2.jpeg/v1/crop/x_37,y_0,w_427,h_500/fill/w_512,h_600,al_c,lg_1,q_80,enc_auto/cranberryspicedcider-6-500x500.jpeg', link: 'https://www.saintsfeastfamily.com/copy-of-the-baptism-of-the-lord-jan-2', snippet: '', title: 'Jumping Jolly Juice'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Crafts, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/make-a-holy-water-bottle-craft-with-catholic-kids/', snippet: 'It got the kids involved, gave them something to look forward to, kept them occupied, and I got to teach the kids about Holy Water. Score!', title: 'Holy Water Bottle Craft'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Crafts, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/bible-craft-for-the-letter-d-dove-with-olive-branch/', snippet: 'It got the kids involved, gave them something to look forward to, kept them occupied, and I got to teach the kids about Holy Water. Score!', title: 'Dove with Olive Branch'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Crafts, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/holy-spirit-craft-make-a-dove-from-a-paper-plate/', snippet: 'You can stop at just a dove, or you can attach the gifts of the Holy Spirit to learn a little something extra.', title: 'Dove with Gifts of the Holy Spirit'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Crafts, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/holy-spirit-craft-handprint-dove/', snippet: 'For this one, start with a red piece of paper (the symbolic color for the Holy Spirit) and make a white handprint...', title: 'Simple Handprint Dove'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_476e11a5553346fd8d5baa2055f87e1a~mv2.png/v1/crop/x_3,y_14,w_489,h_410/fill/w_587,h_492,al_c,lg_1,q_85,enc_auto/9c2964_476e11a5553346fd8d5baa2055f87e1a~mv2.png', link: 'https://www.saintsfeastfamily.com/copy-of-the-baptism-of-the-lord-jan-2', snippet: '', title: 'Greek Dipples'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/ideas-for-teaching-catholic-kids-about-baptism/', snippet: 'Baptism is so important, and it’s a great thing to make sure that your kids truly understand...', title: 'Ideas for Teaching Catholic Kids About Baptism'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-the-baptism-of-the-lord-jan-2', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! The Baptism of the Lord has historically been associated with the celebration of Epiphany. Even today, the Eastern Christian feast of Theophany, celebrated on January 6 as a counterpart to the Western feast of Epiphany, focuses primarily on the Baptism of the Lord as the revelation of God to man.', title: 'Baptism of the Lord'}
					]),
				feast: 'The Baptism of the Lord'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-angela-of-foligno/', snippet: 'Saint Angela of Foligno was a wife and mother who had little interest in the spiritual life until about age 40. After her husband and children died, Angela entered the Secular Franciscans, spending the rest of her life in prayer and service.', title: 'Story of Saint Angela of Foligno'}
					]),
				feast: 'Saint Angela of Foligno'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-thorfinn-of-hamar-jan-8-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Cistercian monk at the abbey of Tautra. Canon of the Cathedral of Nidaros (modern Trondheim, Norway) by 1277 when he was a witness of the Agreement of Tönsberg. Bishop. Exiled by King Eric for supporting the Archbishop of Nidaros in a dispute over state interference in Church matters. Took refuge at the abbey of TerDoest...', title: 'Thorfinn Of Hamar'}
					]),
				feast: 'Saint Thorfinn Of Hamar'
			}
			])
	},
		{
		date: '9',
		feasts: _List_fromArray(
			[
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-adrian-of-canterbury/', snippet: 'An African by birth, Saint Adrian was assigned by the pope as Archbishop of Canterbury. Feeling unworthy, he declined the position, but the pope sent him to Canterbury anyway where he became an abbot and teacher.', title: 'Story of Saint Adrian of Canterbury'}
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
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-gregory-of-nyssa/', snippet: 'Saint Gregory of Nyssa, the brother of Saint Basil and the son of Saints Basil and Emmilia, was a married man when he began studying for the priesthood. He became Bishop of Nyssa and fought Arianism and was a prominent figure at the Council of Constantinople.', title: 'Story of Saint Gregory of Nyssa'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-the-baptism-of-the-lord-jan', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Gregory of Nyssa\'s Story \u200B Gregory of\u00A0Nyssa\u00A0St. Gregory of\u00A0Nyssa\u00A0(c. 330-c. 395) was a younger sibling in a\u00A0family\u00A0that gave the church many years of service and at least five saints. Before entering the monastery of his brother, Basil the Great, Gregory was a rhetorician. He may have been m...', title: 'Gregory of Nyssa'}
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
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/blessed-william-carter/', snippet: 'Born in London, Blessed William Carter was a printer who got in trouble for printing Catholic material during the reign of Queen Elizabeth I. Eventually brought to trial, he was convicted and hanged, drawn, and quartered on January 11, 1584.', title: 'Story of Blessed William Carter'}
					]),
				feast: 'Blessed William Carter'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-gregory-of-nyssa-jan-10', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Theodosius the Cenobiarch\'s Story \u200B Theodosius was born in Mogariassus, Asia Minor in 423. From a pious family, he began his studies at an early age, and became a lector while still a youth. As a young man, he set out on pilgrimage to the Holy Land. People say he was inspired by Abraham\'s jour...', title: 'Theodosius the Cenobiarch'}
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
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-marguerite-bourgeoys/', snippet: 'Born in France but adopting Canada as her home, Saint Marguerite Bourgeoys definitely won the hearts of the Canadians. She moved to Canada at the request of the governor of the French settlement. She later founded a school for girls in Montreal and founded the Sisters of Notre Dame.', title: 'Story of Saint Marguerite Bourgeoys'}
					]),
				feast: 'Saint Marguerite Bourgeoys'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/aelred-of-rievaulx-1110-1167', snippet: 'How good, how delightful it is to live as brothers together!—Psalm 133:1 NJB Although St. Aelred lived a millennium ago, his life and writings have a distinctively contemporary feel. An extremely competent administrator of Rievaulx, a vast Yorkshire abbey in Northern England, yet even more a spirit...', title: 'Aelred of Rievaulx, 1110-1167'}
					]),
				feast: 'Aelred of Rievaulx, 1110-1167'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-hilary-jan-13-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! The Story of Saint Tatiana of Rome On January 25th, Saint Tatiana\'s Day is the Day of Russian Students and is a day of celebration in special higher and secondary educational institutions. The name of the day derives from the name of the Christian martyr Tatiana of Rome, whose memory is represented...', title: 'Tatiana'}
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
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Video, image: '', link: 'https://www.youtube-nocookie.com/embed/x5_l-pQ_Snk', snippet: '', title: 'St. Hilary of Poitiers'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-hilary-jan-13-2', snippet: 'This staunch defender of the divinity of Christ was a gentle and courteous man, devoted to writing some of the greatest theology on the Trinity, and was like his Master in being labeled a “disturber of the peace.” In a very troubled period in the Church...', title: 'Saint Hilary of Poitiers’ Story'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_d6785e4f4b2a417ba2b23408c33603d2~mv2.png/v1/fill/w_602,h_604,al_c,lg_1,q_90,enc_auto/9c2964_d6785e4f4b2a417ba2b23408c33603d2~mv2.png', link: 'https://www.saintsfeastfamily.com/copy-of-st-hilary-jan-13-2', snippet: '', title: 'French Onion Soup'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_ddca0ded74bd40ae8be680056db9abd6~mv2.png/v1/crop/x_0,y_72,w_443,h_358/fill/w_602,h_488,al_c,lg_1,q_85,enc_auto/9c2964_ddca0ded74bd40ae8be680056db9abd6~mv2.png', link: 'https://www.saintsfeastfamily.com/copy-of-st-hilary-jan-13-2', snippet: '', title: 'Quiche Lorraine Quiche'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-hilary-of-poitiers/', snippet: 'Saint Hilary of Poitiers was converted to Christianity through his reading of the Sacred Scriptures. A married man, he was chosen as Bishop of Poitiers in France where he arduously fought Arianism. As a result, he was sent into exile, but returned home to Poitiers before he died.', title: 'Story of Saint Hilary of Poitiers'}
					]),
				feast: 'Saint Hilary of Poitiers'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-hilary', snippet: 'Hilary was born to pagan parents of Poitiers, France, in 315. After training in the classics and philosophy, Hilary married. He and his wife had one daughter, Afra. All who knew Hilary said he was a friendly, charitable, gentle man. Hilary’s studies led him to read Scripture. He became convinced tha...', title: 'Saint Hilary'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-theodosius-the-cenobiarc', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Felix of Nola\u00A0Story \u200B It was in the 3rd century, in the midst of Emperor Decius’ terrible persecution of Catholics, that a breathless priest, all alone, was hurriedly fleeing for his life. It was St. Felix, an Italian by birth, who had already once been caught and imprisoned by the pagan Roman...', title: 'Hilary'}
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
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-gregory-nazianzen/', snippet: 'Saint Gregory Nazianzen paid a huge price for his faith. In conflict with the Emperor Valens, who defended the Arians, Saint Gregory worked hard to defend the Catholic faith.', title: 'Story of Saint Gregory Nazianzen'}
					]),
				feast: 'Saints Basil the Great and Gregory Nazianzus'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-felix-of-nola', snippet: 'A 100 years after St. Felix’s death, St. Paulinus of Nola told his story, adding without discernment appealing legends that had accumulated over the years. But we can trust the unadorned factual outline of Felix’s life. After Felix divested himself of all his possessions, St. Maximus, the bishop of...', title: 'Saint Felix of Nola'}
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
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-devasahayam-pillai/', snippet: 'Born into an affluent Hindu family in 1712, Devasahayam Pillai converted to Christianity and was martyred for his chosen faith in 1752. At his 2012 beatification Pillai became the first Indian layman not connected to any religious institute to be beatified. Ten years later he was canonized by Pope Francis.', title: 'Story of Saint Devasahayam Pillai'}
					]),
				feast: 'Saint Devasahayam Pillai'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-paul-the-hermit', snippet: 'St. Jerome wrote, or at least translated from the Greek, a little biography of St. Paul the Hermit. Some speculate that he did so in order to establish St. Paul’s reputation as the “first hermit” and to let the world know that the great St. Anthony had a predecessor. Others regard the story as so fu...', title: 'Saint Paul the Hermit'}
					]),
				feast: 'Saint Paul the Hermit'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-hilary-jan-13', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Little is known about the married life of Saint Joseph and the Virgin Mary. Only a few episodes are recorded in the Gospels, and each of those focuses on their son, Jesus. \u00A0 Yet, they are held up by the Church as the prime example of a holy marriage, and remain heavenly patrons for all married coupl...', title: 'Ita'}
					]),
				feast: 'Saint Ita'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-2-of-new-page', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! St. Nina (fl. III/IV Century) was born in Cappadocia. Tradition says she was a relative of St. George who travelled to Iberia (Georgia) to convert the people to Christianity. Scholars believe she was a slave to whom the name Nino (the Georgian form of Nina) was given; she has also been identified as Christiana. The quiet piety of her life and her preaching converted many people, and when she cured Queen Nana of a seemingly incurable disease, Nina converted the queen. When King Mirian also became a Christian, he sent to Constantinople for bishops and priests. Nina continued to preach throughout Georgia until her death at Bodke. A church dedicated to the memory of St. George was built on the site of her grave.', title: 'Nina'}
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
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-berard-and-companions/', snippet: 'Saint Francis considered Saints Berard and his companions as true Friars Minor because they were willing to lay their lives on the line for the faith. Such heroic virtue inspired Saint Anthony to join the Franciscans.', title: 'Story of Saint Berard and Companions'}
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
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Video, image: '', link: 'https://www.youtube-nocookie.com/embed/LbetpKRyO7A', snippet: '', title: 'St Anthony of the Desert'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-anthony-jan-17-1', snippet: 'The life of Anthony will remind many people of Saint Francis of Assisi. At 20, Anthony was so moved by the Gospel message, “Go, sell what you have, and give to [the] poor” (Mark 10:21b), that he actually did just that with his large inheritance...', title: 'Saint Anthony of Egypt’s Story'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_b3b1e854d0c2461c89fd7e9279cce745~mv2.jpg/v1/fill/w_576,h_672,al_c,lg_1,q_85,enc_auto/9c2964_b3b1e854d0c2461c89fd7e9279cce745~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-anthony-jan-17-1', snippet: '', title: 'Uccelletti ~The little Birds of St. Anthony'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Video, image: '', link: 'https://www.youtube.com/watch?v=XwoTugfbSzc', snippet: '', title: 'Uccelletti ~The little Birds of St. Anthony'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-anthony-of-egypt/', snippet: 'Saint Anthony was a solitary ascetic who practiced great mortification yet drew many people to himself. He responded by founding an early form of monastic life. He lived until age 105.', title: 'Story of Saint Anthony of Egypt'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-anthony', snippet: 'Anthony was born in Egypt in 250. At age 20, when his parents died, Anthony made sure his younger sister’s education could be completed in a community of holy women. He then sold all his possessions and left for a life of solitude in the desert. There an elderly hermit taught him about prayer and pe...', title: 'Saint Anthony'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-anthony-jan-17-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Anthony of Egypt’s Story \u200B The life of Anthony will remind many people of\u00A0Saint Francis of Assisi. At 20, Anthony was so moved by the Gospel message, “Go, sell what you have, and give to [the] poor” (Mark 10:21b), that he actually did just that with his large inheritance. He is different from...', title: 'Anthony'}
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
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-charles-of-sezze/', snippet: 'Like many people, Saint Charles of Sezze thought he knew what God wanted, only to find out that he was mistaken. Instead of going to India as a missionary, Saint Charles settled in Rome where he cooked and cared for the friary and friary chapel. While being simple, Saint Charles was no simpleton as is obvious from his life story.', title: 'Story of Saint Charles of Sezze'}
					]),
				feast: 'Saint Charles of Sezze'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-margaret-of-hungary', snippet: 'Margaret was born to Béla IV, king of Hungary, at a moment when the country was threatened by enemies. So the king promised God that if things reversed in his favor he would dedicate his little princess to the religious life. The prayer was answered, and Béla put Margaret in the care of the Dominica...', title: 'Saint Margaret of Hungary'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-margaret-of-hungary-jan--1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! The Story of\u00A0Saint\u00A0Margaret of Hungary \u200B St. Margaret of\u00A0Hungary\u00A0Daughterof King Bela IV, she became a Dominican\u00A0novice\u00A0at twelve in a royal\u00A0convent\u00A0built on an island in the Danube. Although she was a princess among\u00A0nuns\u00A0who were of noble descent, she objected to any special treatment and went out...', title: 'Margaret of Hungary'}
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
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-fabian/', snippet: 'Be careful of birds landing on your head. That happened to Saint Fabian, and it was taken as a sign that he should be elected pope. So he was. And he served for 14 years until he was martyred in 250.', title: 'Story of Saint Fabian'}
					]),
				feast: 'Saint Fabian'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-ita-jan-15', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! St. Wulfstan\'s Story \u200B Wulfstan (1008-1095) +\u00A0Bishop\u00A0and reformer, also called Wulstan and Wolstan. Born at Long-Itch ington, Warwickshire, England, he studied at the abbeys of Evesham and Peterborough, received ordination, and joined the Benedictines at Worcester. Wulfstan served as treasurer of th...', title: 'Wulfstan'}
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
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-sebastian-jan-20', snippet: 'Fabian was a Roman layman who came into the city from his farm one day as clergy and people were preparing to elect a new pope. Eusebius, a Church historian, says a dove flew in and settled on the head of Fabian...', title: 'Saint Fabian’s Story'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_44ef0bce111d4477ab39f31de9658584~mv2.jpg/v1/fill/w_420,h_318,al_c,lg_1,q_80,enc_auto/9c2964_44ef0bce111d4477ab39f31de9658584~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-sebastian-jan-20', snippet: '', title: 'Dove Dinner Rolls'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saints-fabian-and-sebastian', snippet: 'Fabian was a pope, and Sebastian was believed to be a soldier. Both were faithful to Christ until death. The traditional story told about Saint Sebastian is that he was an army officer who was condemned to death for his belief in Jesus. His fellow soldiers shot him with arrows. Surviving this, he wa...', title: 'Saints Fabian and Sebastian'}
					]),
				feast: 'Saint Fabian'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-sebastian-jan-20-1', snippet: 'Almost nothing is historically certain about Sebastian except that he was a Roman martyr, was venerated in Milan even in the time of Saint Ambrose and was buried on the Appian Way, probably near the present Basilica of St. Sebastian...', title: 'Saint Sebastian’s Story'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_3c7029aa08e445e1859f95e47c5e5fba~mv2.jpg/v1/crop/x_246,y_67,w_404,h_325/fill/w_566,h_358,al_c,lg_1,q_80,enc_auto/9c2964_3c7029aa08e445e1859f95e47c5e5fba~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-sebastian-jan-20-1', snippet: '', title: 'Roscos Orange Donuts'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-sebastian/', snippet: 'In art, Saint Sebastian is often depicted as standing near or strapped to a pole riddled with arrows. Indeed, he was executed by archers, but didn’t actually die. Later he was beaten to death with clubs. Little else is known about this third century martyr.', title: 'Story of Saint Sebastian'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-sebastian', snippet: 'Sebastian was the son a nobleman who was a Christian. He joined the Roman army in the year 283 and kept his Christian beliefs secret so he could be a spy in the army. Some Christians who knew the truth about Sebastian brought a woman named Zoe to him. She had lost the power of speech. Sebastian pray...', title: 'Saint Sebastian'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-sebastian-jan-20-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Sebastian’s Story \u200B Almost nothing is historically certain about Sebastian except that he was a Roman martyr, was venerated in Milan even in the time of Saint\u00A0Ambrose and was buried on the Appian Way, probably near the present Basilica of St. Sebastian. Devotion to him spread rapidly, and he i...', title: 'Sebastian'}
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
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-agnes-jan-21-1', snippet: 'Almost nothing is known of this saint except that she was very young—12 or 13—when she was martyred in the last half of the third century. Various modes of death have been suggested...', title: 'Saint Agnes’ Story'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_acfdf6a128df4af299dce373dfcd31e9~mv2.jpg/v1/fill/w_508,h_855,al_c,lg_1,q_85,enc_auto/Picture1_edited.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-agnes-jan-21-1', snippet: 'Port Sauce served over Goat Cheese Polenta', title: 'Pistachio Crusted Lamb Chops with Cherry'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_218dcdf0206e4c34a1ee4d15a9c41e9b~mv2.jpg/v1/crop/x_14,y_0,w_1386,h_933/fill/w_790,h_532,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/9c2964_218dcdf0206e4c34a1ee4d15a9c41e9b~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-agnes-jan-21-1', snippet: 'Delicious lemon pull-apart lamb', title: 'Lamb Pull Apart Bread'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_8858942166b04a8a97151d9b44009a4a~mv2.jpg/v1/crop/x_354,y_83,w_590,h_493/fill/w_470,h_392,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_8858942166b04a8a97151d9b44009a4a~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-agnes-jan-21-1', snippet: '', title: 'Agnesenplätzchen (St. Agnes Cookies)'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_9b37a19c3e0d4980aa6de55fcd42a278~mv2.jpg/v1/crop/x_0,y_73,w_871,h_453/fill/w_792,h_412,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_9b37a19c3e0d4980aa6de55fcd42a278~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-agnes-jan-21-1', snippet: '', title: 'One Hour Yeast Dinner Rolls'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/st-agnes-crafts-feast-jan-21/', snippet: 'Today, let’s look at some celebrating the feast day of St. Agnes with kids...', title: 'Celebrating The Feast Day Of St. Agnes With Kids'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-agnes/', snippet: 'Like other young martyrs, the death of Saint Agnes reminds us that length of years is not a requirement for a holy life. Little is known about Saint Agnes other than that she was a martyr.', title: 'Story of Saint Agnes'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-agnes', snippet: '“A new kind of martyrdom!” exclaimed St. Ambrose, bishop of Milan. The assembly cheered and applauded. He was celebrating St. Agnes because she was a virgin, a martyr—and a child. She was executed at Rome in 304 during the Emperor Diocletian’s vicious persecution. Here are Ambrose’s observations on...', title: 'Saint Agnes'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-agnes-jan-21-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Agnes’ Story \u200B Almost nothing is known of this saint except that she was very young—12 or 13—when she was martyred in the last half of the third century. Various modes of death have been suggested—beheading, burning, strangling. Legend has it that Agnes was a beautiful girl whom many young men...', title: 'Agnes'}
					]),
				feast: 'Saint Agnes'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-our-lady-of-altagracia-jan--1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! The Story of Our Lady of Altagracia A portrait of the\u00A0Virgin Mary\u00A0in a Nativity scene. It is 13 inches (33 centimeters) wide by 18 inches (45 centimeters) high, and is painted on cloth. It is a primitive work of the\u00A0Spanish\u00A0school, painted c.1500. The\u00A0Spanish\u00A0brothers Alfonso and Antonio Trejo, two...', title: 'Our Lady of Altagracia'}
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
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-vincent-jan-22-1', snippet: 'Most of what we know about this saint comes from the poet Prudentius. His Acts have been rather freely colored by the imagination of their compiler. But Saint Augustine, in one of his sermons on Saint Vincent, speaks of having the Acts of his martyrdom before him...', title: 'Saint Vincent of Zaragossa’s Story'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_e99a3b33dc1744a09e5612ea63da87b2~mv2.jpg/v1/crop/x_0,y_109,w_564,h_466/fill/w_646,h_534,al_c,lg_1,q_80,enc_auto/9c2964_e99a3b33dc1744a09e5612ea63da87b2~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-vincent-jan-22-1', snippet: '', title: 'Basic Brioche'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-vincent-of-zaragossa/', snippet: 'Very little is known about Saint Vincent of Zaragossa other than some details about his martyrdom. We know that he was a deacon and that a large devoted following survived his death. Most of what we know comes from the “Acts” of Prudentius.', title: 'Story of Saint Vincent of Zaragossa'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-vincent-jan-22-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Most of what we know about this saint comes from the poet Prudentius. His Acts have been rather freely colored by the imagination of their compiler. But Saint Augustine, in one of his sermons on Saint Vincent, speaks of having the Acts of his martyrdom before him. We are at least sure of his name, his being a deacon, the place of his death and burial...', title: 'Saint Vincent of Saragossa'}
					]),
				feast: 'Saint Vincent of Saragossa'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-our-lady-of-altagracia-jan-', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Domenico di Sora’s Story \u200B St Dominic of Sora (951-1032) was born in Foligno.\u00A0 He became\u00A0 Benedictine monk and founded a number of hermitages in Central Italy.\u00A0 The reforming Pope John XVIII (1003-9) placed these foundations under papal protection.\u00A0 The last of them was at Sora (in Lazio), whe...', title: 'Saint Domenico'}
					]),
				feast: 'Saint Domenico'
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
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-vincent-jan-22', snippet: 'Though leprosy scared off most people in 19th-century Hawaii, that disease sparked great generosity in the woman who came to be known as Mother Marianne of Molokai. Her courage helped tremendously to improve the lives of its victims in Hawaii, a territory annexed to the United States during her lifetime (1898)...', title: 'Saint Marianne Cope’s Story'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_1b501eda18be418d9f7b860a84c68bb0~mv2.png/v1/fill/w_610,h_652,al_c,q_90,enc_auto/9c2964_1b501eda18be418d9f7b860a84c68bb0~mv2.png', link: 'https://www.saintsfeastfamily.com/copy-of-st-vincent-jan-22', snippet: '', title: 'Char Siu'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_05315e6abad04487bfaa70c5bc4fa9df~mv2.png/v1/crop/x_8,y_73,w_875,h_1088/fill/w_694,h_864,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/2.png', link: 'https://www.saintsfeastfamily.com/copy-of-st-vincent-jan-22', snippet: '', title: 'Pineapple Upside-Down Cake'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-marianne-cope/', snippet: 'Born in Germany, Saint Marianne Cope’s family soon moved to Utica, NY. In 1862 she entered the Sisters of the Third Order of Saint Francis where she served as superior for a number of years.', title: 'Story of Saint Marianne Cope'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-vincent-jan-22', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Marianne Cope’s Story \u200B Though leprosy scared off most people in 19th-century Hawaii, that disease sparked great generosity in the woman who came to be known as Mother Marianne of Molokai. Her courage helped tremendously to improve the lives of its victims in Hawaii, a territory annexed to the...', title: 'Marianne Cope'}
					]),
				feast: 'Saint Marianne Cope'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', link: '', snippet: '', title: ''},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/pro-life-craft-for-kids/', snippet: ' Today, let’s look at some celebrating the feast day of St. Agnes with kids...', title: 'Pro Life Craft for Kids'}
					]),
				feast: 'Day of Prayer for the Legal Protection of Unborn Children'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-vincent', snippet: 'Vincent was trained and ordained a deacon by Valerius, bishop of Saragossa, Spain, in the third century. The Roman emperors had made being a Christian punishable by death, so when Emperor Dacian discovered Bishop Valerius holding Christian services, he had him imprisoned. Vincent was soon caught vis...', title: 'Saint Vincent'}
					]),
				feast: 'Saint Vincent'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-ildefonsus-of-toledo', snippet: 'Spanish Catholics esteem St. Ildefonsus as one of their greatest saints, second only to Isidore of Seville. As archbishop of Toledo, he led the Spanish church from 658 to 667. Like Isidore, Ildefonsus contributed to the creation of the collaborative union of church and state that came to typify medi...', title: 'Saint Ildefonsus of Toledo'}
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
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-marianne-cope-jan-23', snippet: 'Francis was destined by his father to be a lawyer so that the young man could eventually take his elder’s place as a senator from the province of Savoy in France...', title: 'Saint Francis de Sales’ Story'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_8c3cefd4508241babcfa2f8a3f961e35~mv2.png/v1/fill/w_882,h_538,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/PastedGraphic-25-1.png', link: 'https://www.saintsfeastfamily.com/copy-of-st-marianne-cope-jan-23', snippet: '', title: 'Piperade'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-francis-de-sales/', snippet: 'Saint Francis de Sales was born into a senatorial family where he was destined to work in government positions of authority. Instead, he felt a call to the priesthood and was ordained for the Diocese of Geneva.', title: 'Story of Saint Francis de Sales'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-francis-de-sales', snippet: 'Francis, the eldest of 13 children, was born into a family of nobility in France in 1567. His father sent him to study at the University of Paris. After six years, Francis was intellectually competent in many areas. Francis was also a skilled swordsman who enjoyed fencing, an expert horseman, and a...', title: 'Saint Francis de Sales'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-marianne-cope-jan-23', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Francis de Sales’ Story \u200B Francis was destined by his father to be a lawyer so that the young man could eventually take his elder’s place as a senator from the province of Savoy in France. For this reason Francis was sent to Padua to study law. After receiving his doctorate, he returned home a...', title: 'Francis de Sales'}
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
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/conversion-of-saint-paul/', snippet: 'Saint Paul’s conversion on the road to Damascus was to be the turning point in his spiritual life. There he met Jesus and nothing was the same after that. Thereafter, all his zeal and energy were focused on the spread of the gospel message.', title: 'Story of Conversion of Saint Paul'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/the-conversion-of-saint-paul-the-apostle', snippet: 'St. Paul the Apostle was the greatest of the early Christian missionaries. He first appears in the Acts of the Apostles under the name of Saul. Saul was raised in the Jewish faith as a Pharisee trained in the strict observance of God’s Law. He believed the Law should be obeyed by himself and all Jew...', title: 'The Conversion of Saint Paul the Apostle'}
					]),
				feast: 'The Conversion of Saint Paul'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-henry-suso', snippet: 'Anyone who endures dryness at prayer or feels abandoned by God will find instruction, and perhaps some relief, in the experience of Henry Suso. A mystic who called himself the “servant of Eternal Wisdom,” he endured long stretches of spiritual darkness interrupted only by occasional bursts of bright...', title: 'Saint Henry Suso'}
					]),
				feast: 'Saint Henry Suso'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-francis-de-sales-jan-24-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Dwynwen\'s Story \u200B Saint Dwynwen, a Welsh saint, was known for saying: \'Nothing wins hearts like cheerfulness.\' A member of the family of Brychan of Brecknock, she is venerated throughout Wales and Cornwall, England. \u00A0 Saint Dwynwen lived during the 5th century and legend has it that she was on...', title: 'Dwynwen'}
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
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-francis-de-sales-jan-24', snippet: 'What we know from the New Testament of Timothy’s life makes it sound like that of a modern harried bishop. He had the honor of being a fellow apostle with Paul, both sharing the privilege of preaching the gospel and suffering for it...', title: 'Saints Timothy and Titus’ Story'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_8c70a07188c5476189c632fc0b989a36~mv2.png/v1/fill/w_354,h_322,al_c,lg_1,q_85,enc_auto/9c2964_8c70a07188c5476189c632fc0b989a36~mv2.png', link: 'https://www.saintsfeastfamily.com/copy-of-st-francis-de-sales-jan-24', snippet: '', title: 'Ajvar spread for bread'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_4dc9c528ff98423a9b5d7670a02f51a8~mv2.jpg/v1/crop/x_38,y_0,w_326,h_225/fill/w_456,h_315,al_c,lg_1,q_80,enc_auto/9c2964_4dc9c528ff98423a9b5d7670a02f51a8~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-francis-de-sales-jan-24', snippet: 'Pogacha is a traditional Macedonian round loaf. It\'s usually made for special occasions.', title: 'Pogacha'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_366a676ad30645999d174c7fc2e21bcf~mv2.jpg/v1/crop/x_31,y_0,w_571,h_430/fill/w_658,h_496,al_c,lg_1,q_80,enc_auto/9c2964_366a676ad30645999d174c7fc2e21bcf~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-francis-de-sales-jan-24', snippet: 'Potato Stew\". Whenever Kompir Mandza is made', title: 'Kompir Mandza'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_081788385f104b9b95700584391731fa~mv2.png/v1/fill/w_636,h_476,al_c,lg_1,q_85,enc_auto/9c2964_081788385f104b9b95700584391731fa~mv2.png', link: 'https://www.saintsfeastfamily.com/copy-of-st-francis-de-sales-jan-24', snippet: 'Potato Stew\". Whenever Kompir Mandza is made', title: 'Vanilici Cookie'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saints-timothy-and-titus/', snippet: 'Saints Timothy and Titus were trusted friends and co-workers with Saint Paul through many of his trials. He eventually set both up as heads of local Churches and encouraged them as would a father. Saint Paul seems to have truly relished their support and friendship.', title: 'Story of Saints Timothy and Titus'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-titus', snippet: 'St. Paul spoke with great affection and respect for St. Titus. He addressed him as “true child of mine in the faith that we share,” suggesting that he had personally recruited Titus for Christ (see Titus 1:14). So Titus became one of Paul’s most trusted colleagues, serving as his secretary, travelin...', title: 'Saint Titus'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-francis-de-sales-jan-24', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saints Timothy and Titus’ Story \u200B What we know from the New Testament of Timothy’s life makes it sound like that of a modern harried bishop. He had the honor of being a fellow apostle with Paul, both sharing the privilege of preaching the gospel and suffering for it. Timothy had a Greek father and a...', title: 'Timothy & Titus'}
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
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-sts-timothy-titus-jan-26', snippet: 'Angela has the double distinction of founding the first teaching congregation of women in the Church and what is now called a “secular institute” of religious women...', title: 'Saint Angela Merici’s Story'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_b356cd33ce644ca49cfb2a842e9aa5c4~mv2.png/v1/fill/w_608,h_504,al_c,lg_1,q_85,enc_auto/9c2964_b356cd33ce644ca49cfb2a842e9aa5c4~mv2.png', link: 'https://www.saintsfeastfamily.com/copy-of-sts-timothy-titus-jan-26', snippet: '', title: 'Pasta Bolognese'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_6d4b21d08edc4f5da37d5aa2f0d1002c~mv2.jpg/v1/fill/w_562,h_374,al_c,lg_1,q_80,enc_auto/9c2964_6d4b21d08edc4f5da37d5aa2f0d1002c~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-sts-timothy-titus-jan-26', snippet: '', title: 'Custard'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_e1b1c426f4cd42d7bfb9f5ec811537bc~mv2.png/v1/crop/x_12,y_0,w_982,h_592/fill/w_981,h_592,al_c,q_90,enc_auto/9c2964_e1b1c426f4cd42d7bfb9f5ec811537bc~mv2.png', link: 'https://www.saintsfeastfamily.com/copy-of-sts-timothy-titus-jan-26', snippet: '', title: 'Custard filled Dove Puff Pastries'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-angela-merici/', snippet: 'Saint Angela Merici was a courageous woman who saw a need and answered it even though society may not have been ready for her solution. Women teaching outside the convent, and what we call today a secular institute, were new forms of living and ministering which proved very beneficial to the Church.', title: 'Story of Saint Angela Merici'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-angela-merici', snippet: 'Women like St. Teresa of Ávila and St. Catherine of Genoa contributed significantly to the Catholic Reformation. But in the 16th-century church perhaps no woman responded more creatively to the need for reform than St. Angela Merici. She built communities that trained single women in Christian livin...', title: 'Saint Angela Merici'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-sts-timothy-titus-jan-26', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Angela Merici’s Story \u200B Angela has the double distinction of founding the first teaching congregation of women in the Church and what is now called a “secular institute” of religious women. As a young woman, she became a member of the Third Order of Saint\u00A0Francis, and lived a life of great aus...', title: 'Angela Merici'}
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
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-angela-merica-jan-27', snippet: 'By universal consent, Thomas Aquinas is the preeminent spokesman of the Catholic tradition of reason and of divine revelation. He is one of the great teachers of the medieval Catholic Church, honored with the titles Doctor of the Church and Angelic Doctor...', title: 'Saint Thomas Aquinas’ Story'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://static.wixstatic.com/media/9c2964_b8e3d414b6b747e9952fd84de9958f8e~mv2.png/v1/crop/x_0,y_0,w_569,h_468/fill/w_652,h_536,al_c,lg_1,q_85,enc_auto/9c2964_b8e3d414b6b747e9952fd84de9958f8e~mv2.png', link: 'https://www.saintsfeastfamily.com/copy-of-st-angela-merica-jan-27', snippet: '', title: 'Tiramisu'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-thomas-aquinas/', snippet: 'Saint Thomas Aquinas is well known for his writings, especially the “Summa Theologica.” But he was far more than a philosopher/theologian. He was a devout man who wrote beautiful prayers and hymns. Perhaps the best known is the “Pange Lingua.”', title: 'Story of Saint Thomas Aquinas'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-thomas-aquinas', snippet: 'Thomas Aquinas came from a wealthy Italian ruling family in the 13th century. At age five, he was sent to a Benedictine monastery at Monte Cassino in hopes that someday he would be abbot. But King Frederick III sent his troops to occupy the monastery as a fortress. Thomas then transferred to the Un...', title: 'Saint Thomas Aquinas'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-angela-merica-jan-27', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Thomas Aquinas’ Story \u200B By universal consent, Thomas Aquinas is the preeminent spokesman of the Catholic tradition of reason and of divine revelation. He is one of the great teachers of the medieval Catholic Church, honored with the titles Doctor of the Church and Angelic Doctor. At five he wa...', title: 'Thomas Aquinas'}
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
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/servant-of-god-brother-juniper/', snippet: 'Brother Juniper was a simple man who joined Saint Francis in the earliest days of the Order. While Saint Francis praised him and wished he had a “whole forest of such Junipers,” nevertheless, he could be exasperating for his generosity. Even saints can be frustrating.', title: 'Story of Servant of God Brother Juniper'}
					]),
				feast: 'Servant of God Brother Juniper'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-blath-jan-29-1', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint Blath, also called Flora, was the cook in St. Brigid\'s convent, in Kildare, Ireland. She was renowned for her holiness and for her steadfast loyalty to St. Brigid in good times and in bad. Blath is the Irish word for \'flower\', and so the Martyrology of Gorman makes a pun by recording her as \'blooming Blath\'. Her name is thus Latinized as Flora.', title: 'Blath'}
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
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/blessed-mary-angela-truszkowska/', snippet: 'Blessed Mary Angela Truszkowska founded the Felician Sisters as a result of a conversion experience she had while convalescing from an illness. At the age of 44 she was forced to resign due to ill health. She lived however, into her ’70s.', title: 'Story of Blessed Mary Angela Truszkowska'}
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
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Video, image: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/YoutubeLogo_YrXRl6n7P.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676253992177', link: 'https://www.youtube.com/watch?v=wejhGYOGLgE', snippet: 'Thomas and his wife Helen guide their children in the ways of holiness by teaching them about the lives of the saints. Here they explore the life of the great apostle of the youth, St. Don Bosco.', title: 'My Catholic Family - Don Bosco'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', link: 'https://www.saintsfeastfamily.com/copy-of-st-john-bosco-jan-31', snippet: 'John Bosco’s theory of education could well be used in today’s schools. It was a preventive system, rejecting corporal punishment and placing students in surroundings removed from the likelihood of committing sin. He advocated frequent reception of the sacraments of Penance and Holy Communion...', title: 'Saint John Bosco’s Story'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'FranciscanMedia', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-john-bosco/', snippet: 'Inspired by Saint Francis de Sales, Saint John Bosco founded the Salesians to continue his work among boys. Then, joining forces with Mary Mazzarello, he helped found the Salesian Sisters. All this during a time when established religious communities in Italy were closing their doors.', title: 'Story of Saint John Bosco'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'LoyolaPress', link: 'http://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-john-bosco', snippet: 'When John Bosco lived in Europe, many boys were orphaned and poor. Without families and religious training, these boys often got into fights, used bad language, and stole, hurting others. John Bosco might have been like that, too, if it hadn’t been for his devout mother. John was the youngest son o...', title: 'Saint John Bosco'},
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-st-john-bosco-jan-31', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! John Bosco’s theory of education could well be used in today’s schools. It was a preventive system, rejecting corporal punishment and placing students in surroundings removed from the likelihood of committing sin. He advocated frequent reception of the sacraments of Penance and Holy Communion. He combined catechetical training and fatherly guidance, seeking to unite the spiritual life with one’s work, study and play...', title: 'John Bosco'}
					]),
				feast: 'Saint John Bosco'
			},
				{
				activities: _List_fromArray(
					[
						{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'SaintsFeastFamily', link: 'https://www.saintsfeastfamily.com/copy-of-proclamation-of-the-kingdom', snippet: 'SaintsFeastFamily has recipes, images, prayers, crafts, and more! Saint\u00A0Martina of Rome’s Story \u200B Saint Martina of Rome, Virgin and Martyr from the Liturgical Year, 1904 A third Roman virgin, wearing on her brow a Martyr’s crown, comes today to share the honors given to Agnes and Emerentiana, and offer her palm to the Lamb. Her name is Martina, which the pagans w...', title: 'Saint Martina of Rome'}
					]),
				feast: 'Saint Martina of Rome'
			}
			])
	}
	]);
var $author$project$FeastDayActivities$FeastDays$M01Jan$january = {color: '#9de3ec', feasts: $author$project$FeastDayActivities$FeastDays$M01Jan$janFeasts, key: 'jan', month: 'January'};
var $author$project$FeastDayActivities$FeastDays$M07Jul$july = {
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
					{activities: _List_Nil, feast: 'Saint Anthony Zaccaria'}
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
					{activities: _List_Nil, feast: 'Saint Augustine Zhao Rong and Companion'}
				])
		},
			{
			date: '11',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Benedict'}
				])
		},
			{
			date: '13',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Henry'}
				])
		},
			{
			date: '14',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Camillus de Lellis (18th in the US)'},
					{activities: _List_Nil, feast: 'Saint Kateri Tekakwitha'}
				])
		},
			{
			date: '15',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Bonaventure'}
				])
		},
			{
			date: '16',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Our Lady of Mount Carmel'}
				])
		},
			{
			date: '20',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Apollinaris'}
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
					{activities: _List_Nil, feast: 'Saint Mary Magdalene'}
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
					{activities: _List_Nil, feast: 'Saint Sharbel Makhlūf'}
				])
		},
			{
			date: '25',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint James'}
				])
		},
			{
			date: '29',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saints Martha, Mary and Lazarus'}
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
var $author$project$FeastDayActivities$FeastDays$M06Jun$june = {
	color: '#395d73',
	feasts: _List_fromArray(
		[
			{
			date: '01',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Justin Martyr'}
				])
		},
			{
			date: '02',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saints Marcellinus and Peter'}
				])
		},
			{
			date: '03',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saints Charles Lwanga and Companions'}
				])
		},
			{
			date: '04',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'The Most Holy Trinity'}
				])
		},
			{
			date: '05',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Boniface'}
				])
		},
			{
			date: '06',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Norbert'}
				])
		},
			{
			date: '09',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Ephrem'}
				])
		},
			{
			date: '11',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'The Most Holy Body and Blood of Christ'},
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
			date: '16',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Sacred Heart of Jesus'}
				])
		},
			{
			date: '17',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Immaculate Heart of Mary'}
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
					{activities: _List_Nil, feast: 'Saint Cyril of Alexandria'}
				])
		},
			{
			date: '28',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Irenaeus'}
				])
		},
			{
			date: '29',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saints Peter and Paul'}
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
var $author$project$FeastDayActivities$FeastDays$M03Mar$march = {
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
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-katharine-drexel/', snippet: 'If your father is an international banker and you ride in a private railroad car, you are not likely to be drawn into a life of voluntary poverty. But if your mother opens your home to the poor three days each week and your father spends half an hour each evening in prayer, it is not impossible that you will devote your life to the poor and give away millions of dollars. Katharine Drexel did that...', title: 'Saint Katharine Drexel’s Story'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://mycatholic.life/wp-content/uploads/2021/08/My-Catholic-Life-MCL-Header.jpg', link: 'https://mycatholic.life/saints/saints-of-the-liturgical-year/march-3-saint-katharine-drexel-virgin-usa-optional-memorial/', snippet: 'Like the little girl who wept when she found that her doll was stuffed with sawdust and her drum was hollow, I too have made a horrifying discovery and my discovery like hers is true. I have ripped both the doll and the drum open and the fact lies plainly and in all its glaring reality before me...', title: 'Saint Katharine Drexel'}
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
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-casimir/', snippet: 'Casimir, born of kings and in line to be a king himself, was filled with exceptional values and learning by a great teacher, John Dlugosz. Even his critics could not say that his conscientious objection indicated softness. As a teenager, Casimir lived a highly disciplined, even severe life, sleeping on the ground, spending a great part of the night in prayer and dedicating himself to lifelong celibacy...', title: 'Saint Casimir’s Story'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://mycatholic.life/wp-content/uploads/2021/08/My-Catholic-Life-MCL-Header.jpg', link: 'https://mycatholic.life/saints/saints-of-the-liturgical-year/march-4-saint-casimir/', snippet: 'Daily, daily sing to Mary; Sing, my soul, her praises due. All her glorious actions cherish, With the heart’s devotion true. Lost in wond’ring contemplation, Be her majesty confessed...', title: 'Saint Casimir'}
						]),
					feast: 'Saint Casimir'
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
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', link: 'https://www.franciscanmedia.org/saint-of-the-day/saints-perpetua-and-felicity/', snippet: '“When my father in his affection for me was trying to turn me from my purpose by arguments and thus weaken my faith, I said to him, ‘Do you see this vessel—water pot or whatever it may be? Can it be called by any other name than what it is?’ ‘No,’ he replied. ‘So also I cannot call myself by any other name than what I am—a Christian.’”', title: 'Saints Perpetua and Felicity’s Story'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://mycatholic.life/wp-content/uploads/2021/08/My-Catholic-Life-MCL-Header.jpg', link: 'https://mycatholic.life/saints/saints-of-the-liturgical-year/march-7-saints-perpetua-and-felicity-martyrs/', snippet: 'Now dawned the day of their victory, and they went forth from the prison into the amphitheater as it were into heaven, cheerful and bright of countenance; if they trembled at all, it was for joy, not for fear...', title: 'Saints Perpetua and Felicity'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Video, image: '', link: 'https://www.youtube-nocookie.com/embed/Cmbhtgu8xlk', snippet: '', title: 'Story of Saints Perpetua and Felicity | Stories of Saints | EP83'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Printout, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/TheCatholicKidLogo_BOq9GnY34.png?ik-sdk-version=javascript-1.4.3&updatedAt=1678397749498', link: 'https://www.thecatholickid.com/saint-perpetua-and-felicity-coloring-page-cnt-mls/', snippet: '', title: 'Saint Perpetua and Felicity Coloring Page'}
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
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-john-of-god/', snippet: 'Having given up active Christian belief while a soldier, John was 40 before the depth of his sinfulness began to dawn on him. He decided to give the rest of his life to God’s service, and headed at once for Africa where he hoped to free captive Christians and, possibly, be martyred...', title: 'Saint John of God’s Story'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://mycatholic.life/wp-content/uploads/2021/08/My-Catholic-Life-MCL-Header.jpg', link: 'https://mycatholic.life/saints/saints-of-the-liturgical-year/march-8-saint-john-of-god-religious/', snippet: 'Lord be blessed for in your great kindness to me who am such a great sinner having done so many wicked things, yet you see fit to set me free from such a tremendous temptation and deception which I fell into through my own sinfulness...', title: 'Saint John of God'}
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
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-frances-of-rome/', snippet: 'Frances’ life combines aspects of secular and religious life. A devoted and loving wife, she longed for a lifestyle of prayer and service, so she organized a group of women to minister to the needs of Rome’s poor...', title: 'Saint Frances of Rome’s Story'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://mycatholic.life/wp-content/uploads/2021/08/My-Catholic-Life-MCL-Header.jpg', link: 'https://mycatholic.life/saints/saints-of-the-liturgical-year/march-9-saint-frances-of-rome-religious/', snippet: 'A married woman must, when called upon, leave her devotions to God at the altar to find him in her household affairs...', title: 'Saint Frances of Rome'}
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
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-patrick/', snippet: 'Legends about Patrick abound; but truth is best served by our seeing two solid qualities in him: He was humble and he was courageous. The determination to accept suffering and success with equal indifference guided the life of God’s instrument for winning most of Ireland for Christ.', title: 'Saint Patrick’s Story'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://mycatholic.life/wp-content/uploads/2021/08/My-Catholic-Life-MCL-Header.jpg', link: 'https://mycatholic.life/saints/saints-of-the-liturgical-year/march-17-saint-patrick-bishop/', snippet: 'I, Patrick, a sinner, a most simple countryman, the least of all the faithful and most contemptible to many…was taken captive. I was at that time about sixteen years of age. I did not, indeed, know the true God; and I was taken into captivity in Ireland with many thousands of people...', title: 'Saint Patrick'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Printout, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/printable-trinity-shamrock-craft-perfect-craft-for-st-patricks-day/', snippet: 'We crafted shamrocks and added this printable to turn them into Trinity shamrocks. You just print 2 sided, fold, and open! Check it out.', title: 'Printable Trinity Shamrock Craft'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Printout, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/catholic-st-patricks-day-printables/', snippet: 'Here are some great Catholic St. Patrick’s day printables to help your kids know the true meaning of this Catholic feast day!', title: 'Catholic St. Patrick’s Day Printables'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/st-patricks-day-tea-party/', snippet: 'I love tea parties because they can be as simple or as complicated as you want, and you can do them with a very small group- even just your own kids...', title: 'St. Patrick’s Day Tea Party- Menu And Food Ideas'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Food, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/catholic-st-patricks-day-food/', snippet: 'I love these St. Patrick’s Day food ideas I’ve been seeing around! Just remember when you’re making St. Patrick’s Day treats this year, the shamrock is the tool that St. Patrick used to explain the trinity- 3 in one!', title: 'Catholic St. Patrick’s Day Fun Food Ideas For Kids'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/st-patricks-snake-banishment/', snippet: 'Here are some fun snake foods, crafts, and games for celebrating St. Patrick’s story on his feast day!', title: 'St. Patrick’s Snake Banishment- Crafts, Food, Games, More!'}
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
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-cyril-of-jerusalem/', snippet: 'The crises that the Church faces today may seem minor when compared with the threat posed by the Arian heresy, which denied the divinity of Christ and almost overcame Christianity in the fourth century. Cyril was to be caught up in the controversy, accused of Arianism by Saint Jerome, and ultimately vindicated both by the men of his own time and by being declared a Doctor of the Church in 1822...', title: 'Saint Cyril of Jerusalem’s Story'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://mycatholic.life/wp-content/uploads/2021/08/My-Catholic-Life-MCL-Header.jpg', link: 'https://mycatholic.life/saints/saints-of-the-liturgical-year/march-18-saint-cyril-of-jerusalem-bishop-and-doctor/', snippet: 'God is loving to man, and loving in no small measure. For say not, I have committed fornication and adultery: I have done dreadful things, and not once only, but often: will He forgive? Will He grant pardon? Hear what the Psalmist says...', title: 'Saint Cyril of Jerusalem'}
						]),
					feast: 'Saint Cyril of Jerusalem'
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
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-joseph-husband-of-mary/', snippet: 'The Bible pays Joseph the highest compliment: he was a “just” man. The quality meant a lot more than faithfulness in paying debts...', title: 'Saint Joseph’s Story'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://mycatholic.life/wp-content/uploads/2021/08/My-Catholic-Life-MCL-Header.jpg', link: 'https://mycatholic.life/catholic-prayers/novena-to-saint-joseph/', snippet: 'Saint Joseph, you were privileged to share in the mystery of the Incarnation as the foster-father of Jesus...', title: 'Novena to Saint Joseph'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Printout, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/st-josephs-altar/', snippet: 'It’s a 3D printable St. Joseph’s altar, and it’s super easy to put together!', title: 'Printable 3D St. Joseph’s Altar'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Printout, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/st-joseph-altar-for-beginners/', snippet: 'Today I wanted to share with you our St. Joseph’s altar. I also want to answer all the questions you may have about how to set up a St. Joseph’s altar, what’s involved, and why we do it.', title: 'St. Joseph Altar For Beginners'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$More, image: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', link: 'https://www.catholicicing.com/st-joseph-feast-day-celebration-ideas/', snippet: 'Find some St. Joseph feast day celebration ideas for your home!', title: 'St. Joseph Feast Day Celebration Ideas for your Home'}
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
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', link: 'https://www.franciscanmedia.org/saint-of-the-day/saint-turibius-of-mogrovejo/', snippet: 'Together with Rose of Lima, Turibius is the first known saint of the New World, serving the Lord in Peru, South America, for 26 years...', title: 'Saint Turibius of Mogrovejo’s Story'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://mycatholic.life/wp-content/uploads/2021/08/My-Catholic-Life-MCL-Header.jpg', link: 'https://mycatholic.life/saints/saints-of-the-liturgical-year/march-23-saint-turibius-of-mogrovejo-bishop/', snippet: 'Nothing gave the saint so much pleasure as the greatest labors and dangers, to procure the least spiritual advantage to one soul. Burning with the most vehement desire of laying down his life for his flock, and of suffering all things for him who died for us, he feared no danger.', title: 'Saint Turibius of Mogrovejo'}
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
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$Audio, image: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', link: 'https://www.franciscanmedia.org/saint-of-the-day/annunciation-of-the-lord/', snippet: 'The feast of the Annunciation, now recognized as a solemnity, was first celebrated in the fourth or fifth century. Its central focus is the Incarnation: God has become one of us. From all eternity God had decided that the Second Person of the Blessed Trinity should become human...', title: 'The Story of the Annunciation of the Lord'},
							{activityType: $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading, image: 'https://mycatholic.life/wp-content/uploads/2021/08/My-Catholic-Life-MCL-Header.jpg', link: 'https://mycatholic.life/saints/saints-of-the-liturgical-year/march-25-annunciation-of-the-lord/', snippet: 'In the fifth century, bishops engaged in a fierce theological debate over the unity of the divine and human natures of Christ, referred to as the “hypostatic union.” Nestorius, the Archbishop of Constantinople, argued that there were two underlying hypostases, or substances, in Christ, one human and one divine...', title: 'Annunciation of the Lord'}
						]),
					feast: 'Annunciation of the Lord'
				}
				])
		}
		]),
	key: 'mar',
	month: 'March'
};
var $author$project$FeastDayActivities$FeastDays$M05May$may = {
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
					{activities: _List_Nil, feast: 'Saint Athanasius'}
				])
		},
			{
			date: '03',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saints Philip and James'}
				])
		},
			{
			date: '10',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Damien de Veuster of Moloka\'i'},
					{activities: _List_Nil, feast: 'Saint John of Ávila'}
				])
		},
			{
			date: '12',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saints Nereus and Achilleus'},
					{activities: _List_Nil, feast: 'Saint Pancras'}
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
					{activities: _List_Nil, feast: 'Saint Mattias the Apostle'}
				])
		},
			{
			date: '15',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Isidore'}
				])
		},
			{
			date: '18',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'The Ascension of the Lord (or 21st)'}
				])
		},
			{
			date: '20',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Bernardine of Siena'}
				])
		},
			{
			date: '21',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'The Ascension of the Lord (or 18th)'}
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
					{activities: _List_Nil, feast: 'Saint Gregory VII'}
				])
		},
			{
			date: '26',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Philip Neri'}
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
			date: '28',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Pentecost Sunday'}
				])
		},
			{
			date: '29',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Blessed Virgin Mary, Mother of the Church'},
					{activities: _List_Nil, feast: 'Saint Paul VI'}
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
var $author$project$FeastDayActivities$FeastDays$M11Nov$november = {
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
					{activities: _List_Nil, feast: 'Saint Leo the Great'}
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
					{activities: _List_Nil, feast: 'Saint Josaphat'}
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
			date: '20',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Our Lord Jesus Christ, King of the Universe - Solemnity'}
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
					{activities: _List_Nil, feast: 'Saint Clement I'},
					{activities: _List_Nil, feast: 'Blessed Miguel Agustín Pro'},
					{activities: _List_Nil, feast: 'Saint Columban'}
				])
		},
			{
			date: '24',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Andrew Dung-Lac, Priest and his Companions'}
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
var $author$project$FeastDayActivities$FeastDays$M10Oct$october = {
	color: '#395d73',
	feasts: _List_fromArray(
		[
			{
			date: '01',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Therese of the Child Jesus'}
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
					{activities: _List_Nil, feast: 'Saint Denis'},
					{activities: _List_Nil, feast: 'Saint John Leonardi'}
				])
		},
			{
			date: '11',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint John Paul XXIII'}
				])
		},
			{
			date: '14',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Callistus I'}
				])
		},
			{
			date: '15',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Teresa of Jesus'}
				])
		},
			{
			date: '16',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Hedwig'},
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
					{activities: _List_Nil, feast: 'Saints Jean de Bébeuf, Isaac Jogues, Priests and Martyrs; and their Companions'}
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
					{activities: _List_Nil, feast: 'Saint Simon and Saint Jude'}
				])
		}
		]),
	key: 'oct',
	month: 'October'
};
var $author$project$FeastDayActivities$FeastDays$M09Sep$september = {
	color: '#9de3ec',
	feasts: _List_fromArray(
		[
			{
			date: '03',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Gregory the Great, Pope and Doctor'}
				])
		},
			{
			date: '05',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Mother Teresa of Calcutta'}
				])
		},
			{
			date: '08',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Birth of the Blessed Virgin Mary'}
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
					{activities: _List_Nil, feast: 'Saint John Chrysostom, Bishop and Doctor'}
				])
		},
			{
			date: '14',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Exaltation of the Holy Cross'}
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
					{activities: _List_Nil, feast: 'Saint Cornelius, Pope'},
					{activities: _List_Nil, feast: 'Saint Cyprian, Bishop'}
				])
		},
			{
			date: '17',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Hildegard of Bingen, Virgin and Doctor of the Church'}
				])
		},
			{
			date: '19',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Januarius, Bishop and Martyr'}
				])
		},
			{
			date: '20',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Andrew Kim Tae-gŏn, Priest'},
					{activities: _List_Nil, feast: 'Saint Paul Chŏng Ha-sang, and Companions, Martyrs'}
				])
		},
			{
			date: '21',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Matthew the Evangelist, Apostle'}
				])
		},
			{
			date: '23',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Pio of Pietrelcina, Priest'}
				])
		},
			{
			date: '26',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Cosmas; Saint Damian, Martyrs'}
				])
		},
			{
			date: '27',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Vincent de Paul, Priest'}
				])
		},
			{
			date: '28',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Wenceslaus, Martyr'},
					{activities: _List_Nil, feast: 'Saint Lawrence Ruiz and Companions, Martyrs'}
				])
		},
			{
			date: '29',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saints Michael, Gabriel and Raphael, Archangels'}
				])
		},
			{
			date: '30',
			feasts: _List_fromArray(
				[
					{activities: _List_Nil, feast: 'Saint Jerome, Priest and Doctor'}
				])
		}
		]),
	key: 'sep',
	month: 'September'
};
var $author$project$FeastDayActivities$FeastDays$feastDays = _List_fromArray(
	[$author$project$FeastDayActivities$FeastDays$M01Jan$january, $author$project$FeastDayActivities$FeastDays$M02Feb$february, $author$project$FeastDayActivities$FeastDays$M03Mar$march, $author$project$FeastDayActivities$FeastDays$M04Apr$april, $author$project$FeastDayActivities$FeastDays$M05May$may, $author$project$FeastDayActivities$FeastDays$M06Jun$june, $author$project$FeastDayActivities$FeastDays$M07Jul$july, $author$project$FeastDayActivities$FeastDays$M08Aug$august, $author$project$FeastDayActivities$FeastDays$M09Sep$september, $author$project$FeastDayActivities$FeastDays$M10Oct$october, $author$project$FeastDayActivities$FeastDays$M11Nov$november, $author$project$FeastDayActivities$FeastDays$M12Dec$december]);
var $author$project$FeastDayActivities$FeastDays$months = A2(
	$elm$core$List$map,
	function ($) {
		return $.key;
	},
	$author$project$FeastDayActivities$FeastDays$feastDays);
var $elm$browser$Browser$Navigation$pushUrl = _Browser_pushUrl;
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
var $author$project$FeastDayActivities$Main$update = F2(
	function (msg, model) {
		if (msg.$ === 'LinkClicked') {
			var urlRequest = msg.a;
			if (urlRequest.$ === 'Internal') {
				var url = urlRequest.a;
				var urlString = $elm$url$Url$toString(url);
				var isMonth = A2(
					$elm$core$List$any,
					function (month) {
						return A2($elm$core$String$contains, month, urlString);
					},
					$author$project$FeastDayActivities$FeastDays$months);
				return isMonth ? _Utils_Tuple2(
					model,
					A2(
						$elm$browser$Browser$Navigation$pushUrl,
						model.key,
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
		} else {
			var url = msg.a;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{url: url}),
				$elm$core$Platform$Cmd$none);
		}
	});
var $elm$html$Html$div = _VirtualDom_node('div');
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
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
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
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
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
var $author$project$FeastDayActivities$FeastDayHelpers$Date = function (a) {
	return {$: 'Date', a: a};
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
var $elm$url$Url$Parser$questionMark = F2(
	function (parser, queryParser) {
		return A2(
			$elm$url$Url$Parser$slash,
			parser,
			$elm$url$Url$Parser$query(queryParser));
	});
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
var $elm$url$Url$Parser$Internal$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
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
var $author$project$FeastDayActivities$FeastDayHelpers$urlDateParser = A2(
	$elm$url$Url$Parser$questionMark,
	A2(
		$elm$url$Url$Parser$questionMark,
		$elm$url$Url$Parser$s('feastdayactivities'),
		$elm$url$Url$Parser$Query$string('m')),
	$elm$url$Url$Parser$Query$string('d'));
var $author$project$FeastDayActivities$FeastDayHelpers$route = A2(
	$elm$url$Url$Parser$map,
	function (m) {
		return function (d) {
			return $author$project$FeastDayActivities$FeastDayHelpers$Date(
				{date: d, month: m});
		};
	},
	$author$project$FeastDayActivities$FeastDayHelpers$urlDateParser);
var $author$project$FeastDayActivities$FeastDayHelpers$parseRoute = $elm$url$Url$Parser$parse($author$project$FeastDayActivities$FeastDayHelpers$route);
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $elm$html$Html$Attributes$attribute = $elm$virtual_dom$VirtualDom$attribute;
var $elm$json$Json$Encode$bool = _Json_wrap;
var $elm$virtual_dom$VirtualDom$Custom = function (a) {
	return {$: 'Custom', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$custom = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Custom(decoder));
	});
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$virtual_dom$VirtualDom$MayPreventDefault = function (a) {
	return {$: 'MayPreventDefault', a: a};
};
var $elm$html$Html$Events$preventDefaultOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayPreventDefault(decoder));
	});
var $elm$virtual_dom$VirtualDom$property = F2(
	function (key, value) {
		return A2(
			_VirtualDom_property,
			_VirtualDom_noInnerHtmlOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $elm$html$Html$Attributes$property = $elm$virtual_dom$VirtualDom$property;
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
var $elm$json$Json$Encode$string = _Json_wrap;
var $zwilias$elm_html_string$Html$Types$attributeToHtml = function (attribute) {
	switch (attribute.$) {
		case 'Attribute':
			var key = attribute.a;
			var value = attribute.b;
			return A2($elm$html$Html$Attributes$attribute, key, value);
		case 'StringProperty':
			var key = attribute.a;
			var value = attribute.b;
			return A2(
				$elm$html$Html$Attributes$property,
				key,
				$elm$json$Json$Encode$string(value));
		case 'BoolProperty':
			var key = attribute.a;
			var value = attribute.b;
			return A2(
				$elm$html$Html$Attributes$property,
				key,
				$elm$json$Json$Encode$bool(value));
		case 'ValueProperty':
			var key = attribute.a;
			var value = attribute.b;
			return A2($elm$html$Html$Attributes$property, key, value);
		case 'Style':
			var key = attribute.a;
			var value = attribute.b;
			return A2($elm$html$Html$Attributes$style, key, value);
		default:
			switch (attribute.b.$) {
				case 'Normal':
					var name = attribute.a;
					var d = attribute.b.a;
					return A2($elm$html$Html$Events$on, name, d);
				case 'MayStopPropagation':
					var name = attribute.a;
					var d = attribute.b.a;
					return A2($elm$html$Html$Events$stopPropagationOn, name, d);
				case 'MayPreventDefault':
					var name = attribute.a;
					var d = attribute.b.a;
					return A2($elm$html$Html$Events$preventDefaultOn, name, d);
				default:
					var name = attribute.a;
					var d = attribute.b.a;
					return A2($elm$html$Html$Events$custom, name, d);
			}
	}
};
var $elm$core$Tuple$mapSecond = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var $elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var $elm$html$Html$node = $elm$virtual_dom$VirtualDom$node;
var $elm$virtual_dom$VirtualDom$keyedNode = function (tag) {
	return _VirtualDom_keyedNode(
		_VirtualDom_noScript(tag));
};
var $elm$html$Html$Keyed$node = $elm$virtual_dom$VirtualDom$keyedNode;
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $zwilias$elm_html_string$Html$Types$toHtml = function (node) {
	if (node.$ === 'Node') {
		var tagName = node.a;
		var attributes = node.b;
		var children = node.c;
		switch (children.$) {
			case 'NoChildren':
				return A3(
					$elm$html$Html$node,
					tagName,
					A2($elm$core$List$map, $zwilias$elm_html_string$Html$Types$attributeToHtml, attributes),
					_List_Nil);
			case 'Regular':
				var nodes = children.a;
				return A3(
					$elm$html$Html$node,
					tagName,
					A2($elm$core$List$map, $zwilias$elm_html_string$Html$Types$attributeToHtml, attributes),
					A2($elm$core$List$map, $zwilias$elm_html_string$Html$Types$toHtml, nodes));
			default:
				var keyedNodes = children.a;
				return A3(
					$elm$html$Html$Keyed$node,
					tagName,
					A2($elm$core$List$map, $zwilias$elm_html_string$Html$Types$attributeToHtml, attributes),
					A2(
						$elm$core$List$map,
						$elm$core$Tuple$mapSecond($zwilias$elm_html_string$Html$Types$toHtml),
						keyedNodes));
		}
	} else {
		var content = node.a;
		return $elm$html$Html$text(content);
	}
};
var $zwilias$elm_html_string$Html$String$toHtml = $zwilias$elm_html_string$Html$Types$toHtml;
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
var $elm$core$String$toLower = _String_toLower;
var $elm$html$Html$a = _VirtualDom_node('a');
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $elm$html$Html$h1 = _VirtualDom_node('h1');
var $elm$html$Html$Attributes$href = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var $author$project$FeastDayActivities$Main$urlPath = '/feastdayactivities';
var $author$project$FeastDayActivities$FeastDayHelpers$filterActivities = F2(
	function (isFilterType, activities) {
		return A2(
			$elm$core$List$concatMap,
			function (activity) {
				return isFilterType(activity.activityType) ? _List_fromArray(
					[activity]) : _List_Nil;
			},
			activities);
	});
var $author$project$FeastDayActivities$FeastDayHelpers$audioActivities = function (activities) {
	return A2(
		$author$project$FeastDayActivities$FeastDayHelpers$filterActivities,
		function (activityType) {
			return _Utils_eq(activityType, $author$project$FeastDayActivities$FeastDayHelpers$Audio);
		},
		activities);
};
var $author$project$FeastDayActivities$FeastDayHelpers$bookActivities = function (activities) {
	return A2(
		$author$project$FeastDayActivities$FeastDayHelpers$filterActivities,
		function (activityType) {
			return _Utils_eq(activityType, $author$project$FeastDayActivities$FeastDayHelpers$Book);
		},
		activities);
};
var $author$project$FeastDayActivities$FeastDayHelpers$craftActivities = function (activities) {
	return A2(
		$author$project$FeastDayActivities$FeastDayHelpers$filterActivities,
		function (activityType) {
			return _Utils_eq(activityType, $author$project$FeastDayActivities$FeastDayHelpers$Crafts);
		},
		activities);
};
var $author$project$FeastDayActivities$FeastDayHelpers$foodActivities = function (activities) {
	return A2(
		$author$project$FeastDayActivities$FeastDayHelpers$filterActivities,
		function (activityType) {
			return _Utils_eq(activityType, $author$project$FeastDayActivities$FeastDayHelpers$Food);
		},
		activities);
};
var $author$project$FeastDayActivities$FeastDayHelpers$gameActivities = function (activities) {
	return A2(
		$author$project$FeastDayActivities$FeastDayHelpers$filterActivities,
		function (activityType) {
			return _Utils_eq(activityType, $author$project$FeastDayActivities$FeastDayHelpers$Game);
		},
		activities);
};
var $author$project$FeastDayActivities$FeastDayHelpers$imageActivities = function (activities) {
	return A2(
		$author$project$FeastDayActivities$FeastDayHelpers$filterActivities,
		function (activityType) {
			return _Utils_eq(activityType, $author$project$FeastDayActivities$FeastDayHelpers$Images);
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
var $author$project$FeastDayActivities$FeastDayHelpers$moreActivities = function (activities) {
	return A2(
		$author$project$FeastDayActivities$FeastDayHelpers$filterActivities,
		function (activityType) {
			return _Utils_eq(activityType, $author$project$FeastDayActivities$FeastDayHelpers$More);
		},
		activities);
};
var $author$project$FeastDayActivities$FeastDayHelpers$printoutActivities = function (activities) {
	return A2(
		$author$project$FeastDayActivities$FeastDayHelpers$filterActivities,
		function (activityType) {
			return _Utils_eq(activityType, $author$project$FeastDayActivities$FeastDayHelpers$Printout);
		},
		activities);
};
var $author$project$FeastDayActivities$FeastDayHelpers$readingActivities = function (activities) {
	return A2(
		$author$project$FeastDayActivities$FeastDayHelpers$filterActivities,
		function (activityType) {
			return _Utils_eq(activityType, $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading);
		},
		activities);
};
var $author$project$FeastDayActivities$FeastDayHelpers$videoActivities = function (activities) {
	return A2(
		$author$project$FeastDayActivities$FeastDayHelpers$filterActivities,
		function (activityType) {
			return _Utils_eq(activityType, $author$project$FeastDayActivities$FeastDayHelpers$Video);
		},
		activities);
};
var $elm$html$Html$h3 = _VirtualDom_node('h3');
var $elm$html$Html$span = _VirtualDom_node('span');
var $elm$html$Html$h4 = _VirtualDom_node('h4');
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
var $author$project$FeastDayActivities$FeastDayHelpers$images = $elm$core$Dict$fromList(
	_List_fromArray(
		[
			_Utils_Tuple2('FranciscanMedia', 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960'),
			_Utils_Tuple2('LoyolaPress', 'https://lpress-craft.loyolapress.com/images/ocf-articles/Microsites/SaintsStories_100x100.jpeg'),
			_Utils_Tuple2('SaintsFeastFamily', 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg')
		]));
var $author$project$FeastDayActivities$FeastDayHelpers$imageSrc = function (activity) {
	return A2(
		$elm$core$Maybe$withDefault,
		activity.image,
		A2($elm$core$Dict$get, activity.image, $author$project$FeastDayActivities$FeastDayHelpers$images));
};
var $elm$html$Html$img = _VirtualDom_node('img');
var $elm$html$Html$Attributes$src = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'src',
		_VirtualDom_noJavaScriptOrHtmlUri(url));
};
var $elm$html$Html$Attributes$target = $elm$html$Html$Attributes$stringProperty('target');
var $author$project$FeastDayActivities$Main$viewActivity = function (activity) {
	return A2(
		$elm$html$Html$a,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('grid grid-cols-[100px_1fr]'),
				$elm$html$Html$Attributes$href(activity.link),
				A2($elm$html$Html$Attributes$attribute, 'aria-label', activity.title),
				$elm$html$Html$Attributes$target('_blank'),
				$elm$html$Html$Attributes$class('hover:bg-csc-lightpurple'),
				$elm$html$Html$Attributes$class('rounded m-5')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$img,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$src(
						$author$project$FeastDayActivities$FeastDayHelpers$imageSrc(activity)),
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
var $author$project$FeastDayActivities$Main$viewActivities = F2(
	function (activityType, activities) {
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
							$elm$html$Html$Attributes$class('text-3xl'),
							$elm$html$Html$Attributes$class('mb-7')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(activityType)
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('max-w-3xl m-auto')
						]),
					A2($elm$core$List$map, $author$project$FeastDayActivities$Main$viewActivity, activities))
				]));
	});
var $elm$html$Html$p = _VirtualDom_node('p');
var $author$project$FeastDayActivities$Main$viewNoActivities = A2(
	$elm$html$Html$div,
	_List_Nil,
	_List_fromArray(
		[
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('We are still adding feast day activities!')
				])),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Please hang tight.')
				]))
		]));
var $elm$html$Html$Attributes$height = function (n) {
	return A2(
		_VirtualDom_attribute,
		'height',
		$elm$core$String$fromInt(n));
};
var $elm$html$Html$iframe = _VirtualDom_node('iframe');
var $elm$html$Html$Attributes$title = $elm$html$Html$Attributes$stringProperty('title');
var $author$project$FeastDayActivities$Main$viewEmbeddedVideo = function (video) {
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
				$elm$html$Html$Attributes$class('m-5')
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
var $author$project$FeastDayActivities$Main$viewVideo = function (video) {
	return A2($elm$core$String$contains, 'embed', video.link) ? $author$project$FeastDayActivities$Main$viewEmbeddedVideo(video) : $author$project$FeastDayActivities$Main$viewActivity(video);
};
var $author$project$FeastDayActivities$Main$viewVideos = function (videos) {
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
						$elm$html$Html$Attributes$class('text-3xl'),
						$elm$html$Html$Attributes$class('mb-7')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Videos')
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('max-w-3xl m-auto')
					]),
				A2(
					$elm$core$List$map,
					function (video) {
						return $author$project$FeastDayActivities$Main$viewVideo(video);
					},
					videos))
			]));
};
var $author$project$FeastDayActivities$Main$viewFeastActivities = function (feastActivities) {
	var activities = A2(
		$elm$core$List$concatMap,
		function ($) {
			return $.activities;
		},
		feastActivities);
	return $elm$core$List$isEmpty(activities) ? $author$project$FeastDayActivities$Main$viewNoActivities : A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				$author$project$FeastDayActivities$Main$viewVideos(
				$author$project$FeastDayActivities$FeastDayHelpers$videoActivities(activities)),
				A2(
				$author$project$FeastDayActivities$Main$viewActivities,
				'Audio',
				$author$project$FeastDayActivities$FeastDayHelpers$audioActivities(activities)),
				A2(
				$author$project$FeastDayActivities$Main$viewActivities,
				'Crafts',
				$author$project$FeastDayActivities$FeastDayHelpers$craftActivities(activities)),
				A2(
				$author$project$FeastDayActivities$Main$viewActivities,
				'Printouts',
				$author$project$FeastDayActivities$FeastDayHelpers$printoutActivities(activities)),
				A2(
				$author$project$FeastDayActivities$Main$viewActivities,
				'Games',
				$author$project$FeastDayActivities$FeastDayHelpers$gameActivities(activities)),
				A2(
				$author$project$FeastDayActivities$Main$viewActivities,
				'Images',
				$author$project$FeastDayActivities$FeastDayHelpers$imageActivities(activities)),
				A2(
				$author$project$FeastDayActivities$Main$viewActivities,
				'Reading',
				$author$project$FeastDayActivities$FeastDayHelpers$readingActivities(activities)),
				A2(
				$author$project$FeastDayActivities$Main$viewActivities,
				'Recipes',
				$author$project$FeastDayActivities$FeastDayHelpers$foodActivities(activities)),
				A2(
				$author$project$FeastDayActivities$Main$viewActivities,
				'Books',
				$author$project$FeastDayActivities$FeastDayHelpers$bookActivities(activities)),
				A2(
				$author$project$FeastDayActivities$Main$viewActivities,
				'More',
				$author$project$FeastDayActivities$FeastDayHelpers$moreActivities(activities))
			]));
};
var $elm$html$Html$h2 = _VirtualDom_node('h2');
var $author$project$FeastDayActivities$Main$viewFeastDayHeader = function (feasts) {
	var concatFeasts = A2(
		$elm$core$String$join,
		' and ',
		A2(
			$elm$core$List$map,
			function ($) {
				return $.feast;
			},
			feasts));
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('grid m-auto max-w-2xl mx-5 md:mx-0')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h2,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('text-2xl text-left')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Feast of ' + concatFeasts)
					]))
			]));
};
var $author$project$FeastDayActivities$Main$viewDate = F3(
	function (month, date, feasts) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-center'),
					$elm$html$Html$Attributes$class('mt-10 max-w-3xl mx-auto')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('grid md:grid-cols-[200px,_1fr]')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$a,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-7xl text-left m-5 md:m-0'),
									$elm$html$Html$Attributes$href($author$project$FeastDayActivities$Main$urlPath + ('?m=' + month)),
									A2($elm$html$Html$Attributes$attribute, 'aria-label', 'Back to ' + month)
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_Nil,
									_List_fromArray(
										[
											$elm$html$Html$text('🗓️')
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('text-sm capitalize')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Back to ' + month)
										]))
								])),
							A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$h1,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('capitalize text-left mx-5 md:mx-0')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Catholic Activities for Children for ' + (month + (' ' + (date + ', 2023'))))
										])),
									$author$project$FeastDayActivities$Main$viewFeastDayHeader(feasts)
								]))
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mt-10 mb-40'),
							$elm$html$Html$Attributes$class('min-h-screen')
						]),
					_List_fromArray(
						[
							$author$project$FeastDayActivities$Main$viewFeastActivities(feasts)
						]))
				]));
	});
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
var $author$project$FeastDayActivities$FeastDayHelpers$splitList = function (list) {
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
var $author$project$FeastDayActivities$Main$dateWidth = '50px';
var $elm$html$Html$hr = _VirtualDom_node('hr');
var $author$project$FeastDayActivities$Main$dateHR = A2(
	$elm$html$Html$hr,
	_List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'width', $author$project$FeastDayActivities$Main$dateWidth),
			A2($elm$html$Html$Attributes$style, 'margin-left', '0px'),
			A2($elm$html$Html$Attributes$style, 'border-top', '4px solid #415c71')
		]),
	_List_Nil);
var $author$project$FeastDayActivities$Main$viewFeast = function (feastActivities) {
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				$elm$html$Html$text(feastActivities.feast)
			]));
};
var $author$project$FeastDayActivities$Main$viewFeastDay = F2(
	function (month, feastDay) {
		var link = $author$project$FeastDayActivities$Main$urlPath + ('?m=' + (month + ('&d=' + feastDay.date)));
		return A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					$author$project$FeastDayActivities$Main$dateHR,
					A2(
					$elm$html$Html$a,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'color', 'black'),
							$elm$html$Html$Attributes$href(link),
							A2($elm$html$Html$Attributes$attribute, 'aria-label', month + (' ' + feastDay.date)),
							$elm$html$Html$Attributes$class('grid grid-cols-calendar gap-3 items-center justify-items-center'),
							$elm$html$Html$Attributes$class('hover:bg-csc-lightpurple'),
							$elm$html$Html$Attributes$class('rounded')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('my-3'),
									$elm$html$Html$Attributes$class('text-3xl')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(feastDay.date)
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('justify-self-start')
								]),
							A2($elm$core$List$map, $author$project$FeastDayActivities$Main$viewFeast, feastDay.feasts))
						]))
				]));
	});
var $author$project$FeastDayActivities$Main$viewFeastDays = F2(
	function (month, list) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('col-span-1')
				]),
			_Utils_ap(
				A2(
					$elm$core$List$map,
					$author$project$FeastDayActivities$Main$viewFeastDay(month),
					list),
				_List_fromArray(
					[$author$project$FeastDayActivities$Main$dateHR])));
	});
var $author$project$FeastDayActivities$Main$viewFeastMonthHeader = F2(
	function (color, month) {
		return A2(
			$elm$html$Html$h2,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-center'),
					$elm$html$Html$Attributes$class('col-span-2'),
					$elm$html$Html$Attributes$class('grid'),
					$elm$html$Html$Attributes$class('content-center'),
					$elm$html$Html$Attributes$class('uppercase'),
					$elm$html$Html$Attributes$class('text-5xl'),
					A2($elm$html$Html$Attributes$style, 'font-family', 'hvdComicSerifPro'),
					A2($elm$html$Html$Attributes$style, 'background-color', color),
					A2($elm$html$Html$Attributes$style, 'border-top', '3px solid black'),
					A2($elm$html$Html$Attributes$style, 'border-bottom', '3px solid black'),
					A2($elm$html$Html$Attributes$style, 'height', '2.5em')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(month)
				]));
	});
var $author$project$FeastDayActivities$Main$viewMonthPillBox = function (month) {
	return A2(
		$elm$html$Html$a,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('col-span-1'),
				$elm$html$Html$Attributes$class('hover:bg-csc-lightblue'),
				$elm$html$Html$Attributes$class('rounded'),
				$elm$html$Html$Attributes$class('p-2'),
				$elm$html$Html$Attributes$class('cursor-pointer'),
				$elm$html$Html$Attributes$class('capitalize'),
				A2($elm$html$Html$Attributes$attribute, 'aria-label', month),
				$elm$html$Html$Attributes$href($author$project$FeastDayActivities$Main$urlPath + ('?m=' + month))
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(month)
			]));
};
var $zwilias$elm_html_string$Html$Types$StringProperty = F2(
	function (a, b) {
		return {$: 'StringProperty', a: a, b: b};
	});
var $zwilias$elm_html_string$Html$String$Attributes$stringProperty = $zwilias$elm_html_string$Html$Types$StringProperty;
var $zwilias$elm_html_string$Html$String$Attributes$class = function (className) {
	return A2($zwilias$elm_html_string$Html$String$Attributes$stringProperty, 'className', className);
};
var $zwilias$elm_html_string$Html$Types$Node = F3(
	function (a, b, c) {
		return {$: 'Node', a: a, b: b, c: c};
	});
var $zwilias$elm_html_string$Html$Types$Regular = function (a) {
	return {$: 'Regular', a: a};
};
var $zwilias$elm_html_string$Html$String$node = F3(
	function (tag, attributes, children) {
		return A3(
			$zwilias$elm_html_string$Html$Types$Node,
			tag,
			attributes,
			$zwilias$elm_html_string$Html$Types$Regular(children));
	});
var $zwilias$elm_html_string$Html$String$div = $zwilias$elm_html_string$Html$String$node('div');
var $zwilias$elm_html_string$Html$String$p = $zwilias$elm_html_string$Html$String$node('p');
var $zwilias$elm_html_string$Html$Types$TextNode = function (a) {
	return {$: 'TextNode', a: a};
};
var $zwilias$elm_html_string$Html$String$text = $zwilias$elm_html_string$Html$Types$TextNode;
var $zwilias$elm_html_string$Html$String$a = $zwilias$elm_html_string$Html$String$node('a');
var $zwilias$elm_html_string$Html$String$Attributes$href = function (val) {
	return A2($zwilias$elm_html_string$Html$String$Attributes$stringProperty, 'href', val);
};
var $zwilias$elm_html_string$Html$Types$Attribute = F2(
	function (a, b) {
		return {$: 'Attribute', a: a, b: b};
	});
var $zwilias$elm_html_string$Html$String$Attributes$attribute = $zwilias$elm_html_string$Html$Types$Attribute;
var $zwilias$elm_html_string$Html$String$Attributes$rel = function (val) {
	return A2($zwilias$elm_html_string$Html$String$Attributes$attribute, 'rel', val);
};
var $zwilias$elm_html_string$Html$Types$Style = F2(
	function (a, b) {
		return {$: 'Style', a: a, b: b};
	});
var $zwilias$elm_html_string$Html$String$Attributes$style = $zwilias$elm_html_string$Html$Types$Style;
var $zwilias$elm_html_string$Html$String$Attributes$target = function (val) {
	return A2($zwilias$elm_html_string$Html$String$Attributes$stringProperty, 'target', val);
};
var $author$project$Newsroom$Main$viewSignUpButton = A2(
	$zwilias$elm_html_string$Html$String$a,
	_List_fromArray(
		[
			$zwilias$elm_html_string$Html$String$Attributes$href('https://signup.catholicstoriesforchildren.com'),
			$zwilias$elm_html_string$Html$String$Attributes$rel('noopener'),
			$zwilias$elm_html_string$Html$String$Attributes$target('_blank'),
			A2($zwilias$elm_html_string$Html$String$Attributes$style, 'text-decoration', 'none'),
			A2($zwilias$elm_html_string$Html$String$Attributes$style, 'padding', '10px 20px'),
			A2($zwilias$elm_html_string$Html$String$Attributes$style, 'display', 'inline-block'),
			A2($zwilias$elm_html_string$Html$String$Attributes$style, 'border-radius', '5px'),
			A2($zwilias$elm_html_string$Html$String$Attributes$style, 'box-shadow', '#777 1px 1px 5px'),
			A2($zwilias$elm_html_string$Html$String$Attributes$style, 'color', 'white'),
			A2($zwilias$elm_html_string$Html$String$Attributes$style, 'background-color', '#9200B3')
		]),
	_List_fromArray(
		[
			$zwilias$elm_html_string$Html$String$text('Sign Up')
		]));
var $author$project$Newsroom$Main$viewSignUp = A2(
	$zwilias$elm_html_string$Html$String$div,
	_List_Nil,
	_List_fromArray(
		[
			A2(
			$zwilias$elm_html_string$Html$String$p,
			_List_fromArray(
				[
					$zwilias$elm_html_string$Html$String$Attributes$class('pb-5')
				]),
			_List_fromArray(
				[
					$zwilias$elm_html_string$Html$String$text('Want tips, resources, and Catholic animations? We are giving away our prayer printable to those who sign up today!')
				])),
			$author$project$Newsroom$Main$viewSignUpButton
		]));
var $author$project$FeastDayActivities$Main$viewMonth = function (feastMonth) {
	var _v0 = $author$project$FeastDayActivities$FeastDayHelpers$splitList(feastMonth.feasts);
	var firstHalf = _v0.a;
	var secondHalf = _v0.b;
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('mt-10 max-w-3xl mx-auto')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h1,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('font-bold')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('2023 Feast Day Activities')
					])),
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('text-2xl mt-5 mb-10')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Click on each day to see suggested feast day activitity ideas that you can use with your children to celebrate.')
					])),
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('text-2xl mt-5 mb-10')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('You can find videos, crafts, printables, games, reading, recipes and more! There are many ways you can find here to help your kids with liturgical living.')
					])),
				$zwilias$elm_html_string$Html$String$toHtml($author$project$Newsroom$Main$viewSignUp),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('grid grid-cols-12'),
						$elm$html$Html$Attributes$class('text-base md:text-3xl lg:text-3xl'),
						$elm$html$Html$Attributes$class('mt-6'),
						$elm$html$Html$Attributes$class('text-center'),
						A2($elm$html$Html$Attributes$style, 'max-width', '800px'),
						$elm$html$Html$Attributes$class('hcenter')
					]),
				A2($elm$core$List$map, $author$project$FeastDayActivities$Main$viewMonthPillBox, $author$project$FeastDayActivities$FeastDays$months)),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'width', '100vw'),
						A2($elm$html$Html$Attributes$style, 'max-width', '800px'),
						$elm$html$Html$Attributes$class('hcenter'),
						A2($elm$html$Html$Attributes$style, 'position', 'relative'),
						A2($elm$html$Html$Attributes$style, 'font-size', '20px'),
						A2($elm$html$Html$Attributes$style, 'margin-top', '50px'),
						$elm$html$Html$Attributes$class('grid grid-cols-2')
					]),
				_List_fromArray(
					[
						A2($author$project$FeastDayActivities$Main$viewFeastMonthHeader, feastMonth.color, feastMonth.month),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('grid grid-cols-1 md:grid-cols-2'),
								$elm$html$Html$Attributes$class('col-span-2'),
								A2($elm$html$Html$Attributes$style, 'background-color', 'white'),
								A2($elm$html$Html$Attributes$style, 'padding', '50px')
							]),
						_List_fromArray(
							[
								A2($author$project$FeastDayActivities$Main$viewFeastDays, feastMonth.key, firstHalf),
								A2($author$project$FeastDayActivities$Main$viewFeastDays, feastMonth.key, secondHalf)
							]))
					]))
			]));
};
var $author$project$FeastDayActivities$Main$viewBody = function (route) {
	if (route.$ === 'Just') {
		var date = route.a.a;
		var _v1 = _Utils_Tuple2(date.month, date.date);
		if (_v1.a.$ === 'Just') {
			if (_v1.b.$ === 'Just') {
				var m = _v1.a.a;
				var d = _v1.b.a;
				return A3(
					$author$project$FeastDayActivities$Main$viewDate,
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
										$author$project$FeastDayActivities$FeastDays$M01Jan$january,
										$elm$core$List$head(
											A2(
												$elm$core$List$filter,
												function (feastDay) {
													return _Utils_eq(
														$elm$core$String$toLower(feastDay.key),
														$elm$core$String$toLower(m));
												},
												$author$project$FeastDayActivities$FeastDays$feastDays))).feasts)))));
			} else {
				var m = _v1.a.a;
				var _v2 = _v1.b;
				return $author$project$FeastDayActivities$Main$viewMonth(
					A2(
						$elm$core$Maybe$withDefault,
						$author$project$FeastDayActivities$FeastDays$M01Jan$january,
						$elm$core$List$head(
							A2(
								$elm$core$List$filter,
								function (feastDay) {
									return _Utils_eq(
										$elm$core$String$toLower(feastDay.key),
										$elm$core$String$toLower(m));
								},
								$author$project$FeastDayActivities$FeastDays$feastDays))));
			}
		} else {
			return $author$project$FeastDayActivities$Main$viewMonth($author$project$FeastDayActivities$FeastDays$M01Jan$january);
		}
	} else {
		return $author$project$FeastDayActivities$Main$viewMonth($author$project$FeastDayActivities$FeastDays$M01Jan$january);
	}
};
var $zwilias$elm_html_string$Html$String$Attributes$alt = function (val) {
	return A2($zwilias$elm_html_string$Html$String$Attributes$stringProperty, 'alt', val);
};
var $zwilias$elm_html_string$Html$String$footer = $zwilias$elm_html_string$Html$String$node('footer');
var $zwilias$elm_html_string$Html$Types$NoChildren = {$: 'NoChildren'};
var $zwilias$elm_html_string$Html$String$nodeWithoutChildren = F3(
	function (tag, attrs, _v0) {
		return A3($zwilias$elm_html_string$Html$Types$Node, tag, attrs, $zwilias$elm_html_string$Html$Types$NoChildren);
	});
var $zwilias$elm_html_string$Html$String$img = $zwilias$elm_html_string$Html$String$nodeWithoutChildren('img');
var $zwilias$elm_html_string$Html$String$span = $zwilias$elm_html_string$Html$String$node('span');
var $zwilias$elm_html_string$Html$String$Attributes$src = function (val) {
	return A2($zwilias$elm_html_string$Html$String$Attributes$stringProperty, 'src', val);
};
var $author$project$Footer$toPx = function (x) {
	return $elm$core$String$fromInt(x) + 'px';
};
var $author$project$Footer$viewFooter = A2(
	$zwilias$elm_html_string$Html$String$footer,
	_List_fromArray(
		[
			A2(
			$zwilias$elm_html_string$Html$String$Attributes$style,
			'padding',
			$author$project$Footer$toPx(30)),
			A2($zwilias$elm_html_string$Html$String$Attributes$style, 'background-color', 'black'),
			A2($zwilias$elm_html_string$Html$String$Attributes$style, 'color', 'white'),
			A2($zwilias$elm_html_string$Html$String$Attributes$style, 'transform-style', 'preserve-3d')
		]),
	_List_fromArray(
		[
			A2(
			$zwilias$elm_html_string$Html$String$div,
			_List_fromArray(
				[
					$zwilias$elm_html_string$Html$String$Attributes$class('flex items-center gap-2.5')
				]),
			_List_fromArray(
				[
					A2(
					$zwilias$elm_html_string$Html$String$span,
					_List_Nil,
					_List_fromArray(
						[
							$zwilias$elm_html_string$Html$String$text('Follow us on')
						])),
					A2(
					$zwilias$elm_html_string$Html$String$a,
					_List_fromArray(
						[
							$zwilias$elm_html_string$Html$String$Attributes$href('https://www.facebook.com/catholicstoriesforchildren'),
							A2($zwilias$elm_html_string$Html$String$Attributes$attribute, 'aria-label', 'CSC Facebook Page'),
							$zwilias$elm_html_string$Html$String$Attributes$target('_blank')
						]),
					_List_fromArray(
						[
							A2(
							$zwilias$elm_html_string$Html$String$img,
							_List_fromArray(
								[
									$zwilias$elm_html_string$Html$String$Attributes$class('w-10 h-10'),
									$zwilias$elm_html_string$Html$String$Attributes$src('https://ik.imagekit.io/catholicstories/f_logo_RGB-Blue_250_3vs-yhXer.png?updatedAt=1684277030198'),
									$zwilias$elm_html_string$Html$String$Attributes$alt('Facebook')
								]),
							_List_Nil)
						])),
					A2(
					$zwilias$elm_html_string$Html$String$a,
					_List_fromArray(
						[
							$zwilias$elm_html_string$Html$String$Attributes$href('https://www.instagram.com/catholicstoriesforchildren/'),
							A2($zwilias$elm_html_string$Html$String$Attributes$attribute, 'aria-label', 'CSC Instagram Page'),
							$zwilias$elm_html_string$Html$String$Attributes$target('_blank')
						]),
					_List_fromArray(
						[
							A2(
							$zwilias$elm_html_string$Html$String$img,
							_List_fromArray(
								[
									$zwilias$elm_html_string$Html$String$Attributes$class('w-10 h-10'),
									$zwilias$elm_html_string$Html$String$Attributes$src('https://ik.imagekit.io/catholicstories/Instagram_Glyph_Gradient_kFoMs9jIr.png?updatedAt=1684277127293'),
									$zwilias$elm_html_string$Html$String$Attributes$alt('Instagram')
								]),
							_List_Nil)
						]))
				])),
			A2(
			$zwilias$elm_html_string$Html$String$p,
			_List_Nil,
			_List_fromArray(
				[
					$zwilias$elm_html_string$Html$String$text('Copyright © 2023 Catholic Stories for Children. All rights reserved.')
				])),
			A2(
			$zwilias$elm_html_string$Html$String$p,
			_List_Nil,
			_List_fromArray(
				[
					$zwilias$elm_html_string$Html$String$text('Catholic Stories for Children is a 501(c)(3) non-profit recognized by the IRS. Contributions to Catholic Stories for Children are tax-deductible to the extent permitted by law.  Tax ID Number: 85-4194883')
				]))
		]));
var $zwilias$elm_html_string$Html$String$header = $zwilias$elm_html_string$Html$String$node('header');
var $zwilias$elm_html_string$Html$String$nav = $zwilias$elm_html_string$Html$String$node('nav');
var $author$project$Header$viewNavButton = F4(
	function (height, link, linkTarget, page) {
		return A2(
			$zwilias$elm_html_string$Html$String$a,
			_List_fromArray(
				[
					$zwilias$elm_html_string$Html$String$Attributes$href(link),
					$zwilias$elm_html_string$Html$String$Attributes$class('flex items-center justify-center'),
					$zwilias$elm_html_string$Html$String$Attributes$class('hover:bg-csc-lightpurple'),
					$zwilias$elm_html_string$Html$String$Attributes$class('hover:border-b-2 hover:border-gray-700'),
					$zwilias$elm_html_string$Html$String$Attributes$class('rounded-t'),
					$zwilias$elm_html_string$Html$String$Attributes$class('text-lg'),
					$zwilias$elm_html_string$Html$String$Attributes$class('h-[60px] h-[' + (height + ']')),
					$zwilias$elm_html_string$Html$String$Attributes$class('w-full'),
					A2($zwilias$elm_html_string$Html$String$Attributes$attribute, 'aria-label', page),
					$zwilias$elm_html_string$Html$String$Attributes$target(linkTarget)
				]),
			_List_fromArray(
				[
					$zwilias$elm_html_string$Html$String$text(page)
				]));
	});
var $author$project$Header$desktopNavigation = function (height) {
	return A2(
		$zwilias$elm_html_string$Html$String$nav,
		_List_fromArray(
			[
				$zwilias$elm_html_string$Html$String$Attributes$class('h-full w-full grid grid-cols-6 content-center justify-items-center')
			]),
		_List_fromArray(
			[
				A4($author$project$Header$viewNavButton, height, '/animations', '_self', 'Animations'),
				A4($author$project$Header$viewNavButton, height, 'https://www.etsy.com/shop/CatholicStories', '_blank', 'Shop'),
				A4($author$project$Header$viewNavButton, height, '/resources', '_self', 'Resources'),
				A4($author$project$Header$viewNavButton, height, '/contact', '_self', 'Contact'),
				A4($author$project$Header$viewNavButton, height, '/give', '_self', 'Give'),
				A4($author$project$Header$viewNavButton, height, '/team', '_self', 'About Us')
			]));
};
var $author$project$Header$hamburgerMenu = A2(
	$zwilias$elm_html_string$Html$String$a,
	_List_fromArray(
		[
			$zwilias$elm_html_string$Html$String$Attributes$href('/navigation'),
			$zwilias$elm_html_string$Html$String$Attributes$class('space-y-2'),
			A2($zwilias$elm_html_string$Html$String$Attributes$attribute, 'aria-label', 'menu')
		]),
	_List_fromArray(
		[
			A2(
			$zwilias$elm_html_string$Html$String$div,
			_List_fromArray(
				[
					$zwilias$elm_html_string$Html$String$Attributes$class('w-8 h-0.5 m-auto bg-gray-600')
				]),
			_List_Nil),
			A2(
			$zwilias$elm_html_string$Html$String$div,
			_List_fromArray(
				[
					$zwilias$elm_html_string$Html$String$Attributes$class('w-8 h-0.5 m-auto bg-gray-600')
				]),
			_List_Nil),
			A2(
			$zwilias$elm_html_string$Html$String$div,
			_List_fromArray(
				[
					$zwilias$elm_html_string$Html$String$Attributes$class('w-8 h-0.5 m-auto bg-gray-600')
				]),
			_List_Nil)
		]));
var $author$project$Header$navigation = function (height) {
	return A2(
		$zwilias$elm_html_string$Html$String$div,
		_List_fromArray(
			[
				$zwilias$elm_html_string$Html$String$Attributes$class('w-full')
			]),
		_List_fromArray(
			[
				A2(
				$zwilias$elm_html_string$Html$String$div,
				_List_fromArray(
					[
						$zwilias$elm_html_string$Html$String$Attributes$class('lg:hidden')
					]),
				_List_fromArray(
					[$author$project$Header$hamburgerMenu])),
				A2(
				$zwilias$elm_html_string$Html$String$div,
				_List_fromArray(
					[
						$zwilias$elm_html_string$Html$String$Attributes$class('hidden lg:block w-full')
					]),
				_List_fromArray(
					[
						$author$project$Header$desktopNavigation(height)
					]))
			]));
};
var $zwilias$elm_html_string$Html$String$h1 = $zwilias$elm_html_string$Html$String$node('h1');
var $author$project$Header$viewHeaderTitle = function (title) {
	return A2(
		$zwilias$elm_html_string$Html$String$a,
		_List_fromArray(
			[
				A2($zwilias$elm_html_string$Html$String$Attributes$style, 'text-decoration', 'none'),
				$zwilias$elm_html_string$Html$String$Attributes$class('colorDarkGray'),
				$zwilias$elm_html_string$Html$String$Attributes$class('invisible md:visible'),
				$zwilias$elm_html_string$Html$String$Attributes$class('justify-self-start'),
				$zwilias$elm_html_string$Html$String$Attributes$href('/')
			]),
		_List_fromArray(
			[
				A2(
				$zwilias$elm_html_string$Html$String$h1,
				_List_fromArray(
					[
						A2($zwilias$elm_html_string$Html$String$Attributes$style, 'font-family', 'hvdComicSerifPro'),
						A2($zwilias$elm_html_string$Html$String$Attributes$style, 'margin', '0px'),
						$zwilias$elm_html_string$Html$String$Attributes$class('text-[0px] md:text-2xl')
					]),
				_List_fromArray(
					[
						$zwilias$elm_html_string$Html$String$text('Catholic Stories for Children')
					]))
			]));
};
var $author$project$Logo$logo = A2(
	$zwilias$elm_html_string$Html$String$img,
	_List_fromArray(
		[
			$zwilias$elm_html_string$Html$String$Attributes$src('/assets/logo_solid.svg'),
			A2($zwilias$elm_html_string$Html$String$Attributes$style, 'height', '30px'),
			$zwilias$elm_html_string$Html$String$Attributes$alt(''),
			A2($zwilias$elm_html_string$Html$String$Attributes$style, 'vertical-align', 'middle')
		]),
	_List_Nil);
var $author$project$Header$viewLogo = A2(
	$zwilias$elm_html_string$Html$String$a,
	_List_fromArray(
		[
			A2($zwilias$elm_html_string$Html$String$Attributes$style, 'text-decoration', 'none'),
			$zwilias$elm_html_string$Html$String$Attributes$class('colorDarkGray'),
			$zwilias$elm_html_string$Html$String$Attributes$href('/'),
			A2($zwilias$elm_html_string$Html$String$Attributes$attribute, 'aria-label', 'home')
		]),
	_List_fromArray(
		[$author$project$Logo$logo]));
var $author$project$Header$viewSubpageHeader = F2(
	function (currentPage, leftMargin) {
		var isHomePage = currentPage === 'Catholic Stories for Children';
		var _v0 = isHomePage ? _Utils_Tuple3('111px', $author$project$Header$navigation, 'grid-cols-[150px_1fr_150px] lg:grid-cols-[150px_1fr_600px]') : _Utils_Tuple3('60px', $author$project$Header$navigation, 'grid-cols-[150px_1fr_150px] lg:grid-cols-[150px_1fr_600px]');
		var height = _v0.a;
		var rightHandSide = _v0.b;
		var gridColsClass = _v0.c;
		return A2(
			$zwilias$elm_html_string$Html$String$header,
			_List_fromArray(
				[
					A2($zwilias$elm_html_string$Html$String$Attributes$style, 'background-color', '#3d5d75'),
					A2($zwilias$elm_html_string$Html$String$Attributes$style, 'background-image', 'linear-gradient(130deg, #9DE2EB , #EBD6F1)'),
					$zwilias$elm_html_string$Html$String$Attributes$class('h-[60px] md:h-[' + (height + ']')),
					$zwilias$elm_html_string$Html$String$Attributes$class('colorDarkGray'),
					$zwilias$elm_html_string$Html$String$Attributes$class('grid items-center justify-items-center'),
					$zwilias$elm_html_string$Html$String$Attributes$class(gridColsClass)
				]),
			_List_fromArray(
				[
					$author$project$Header$viewLogo,
					$author$project$Header$viewHeaderTitle(currentPage),
					rightHandSide(height)
				]));
	});
var $author$project$FeastDayActivities$Main$view = function (model) {
	var currentRoute = $author$project$FeastDayActivities$FeastDayHelpers$parseRoute(model.url);
	return {
		body: _List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'height', '100vh'),
						A2($elm$html$Html$Attributes$style, 'overflow-x', 'hidden'),
						A2($elm$html$Html$Attributes$style, 'overflow-y', 'auto'),
						A2($elm$html$Html$Attributes$style, 'background-color', '#FEF7F4')
					]),
				_List_fromArray(
					[
						$zwilias$elm_html_string$Html$String$toHtml(
						A2($author$project$Header$viewSubpageHeader, 'Feast Day Activities', $author$project$Helpers$headerMargin)),
						$author$project$FeastDayActivities$Main$viewBody(currentRoute),
						$zwilias$elm_html_string$Html$String$toHtml($author$project$Footer$viewFooter)
					]))
			]),
		title: 'Feast Day Activities - Catholic Stories for Children'
	};
};
var $author$project$FeastDayActivities$Main$main = $elm$browser$Browser$application(
	{init: $author$project$FeastDayActivities$Main$init, onUrlChange: $author$project$FeastDayActivities$Main$UrlChanged, onUrlRequest: $author$project$FeastDayActivities$Main$LinkClicked, subscriptions: $author$project$FeastDayActivities$Main$subscriptions, update: $author$project$FeastDayActivities$Main$update, view: $author$project$FeastDayActivities$Main$view});
_Platform_export({'FeastDayActivities':{'Main':{'init':$author$project$FeastDayActivities$Main$main(
	$elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}}});}(this));