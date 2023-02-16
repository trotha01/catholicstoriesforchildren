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

	/**_UNUSED/
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

	/**/
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

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (typeof x.$ === 'undefined')
	//*/
	/**_UNUSED/
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

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


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



var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


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

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
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

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
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


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
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
	if (region.O.C === region.V.C)
	{
		return 'on line ' + region.O.C;
	}
	return 'on lines ' + region.O.C + ' through ' + region.V.C;
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



/**_UNUSED/
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

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

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
		impl.aK,
		impl.a$,
		impl.aY,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
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


function _Platform_export(exports)
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


function _Platform_export_UNUSED(exports)
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

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
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

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
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
		r: func(record.r),
		P: record.P,
		M: record.M
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
		var message = !tag ? value : tag < 3 ? value.a : value.r;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.P;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.M) && event.preventDefault(),
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
		impl.aK,
		impl.a$,
		impl.aY,
		function(sendToApp, initialModel) {
			var view = impl.a0;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
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
		impl.aK,
		impl.a$,
		impl.aY,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.N && impl.N(sendToApp)
			var view = impl.a0;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.az);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.a_) && (_VirtualDom_doc.title = title = doc.a_);
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
	var onUrlChange = impl.aP;
	var onUrlRequest = impl.aQ;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		N: function(sendToApp)
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
							&& curr.ag === next.ag
							&& curr._ === next._
							&& curr.ad.a === next.ad.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		aK: function(flags)
		{
			return A3(impl.aK, flags, _Browser_getUrl(), key);
		},
		a0: impl.a0,
		a$: impl.a$,
		aY: impl.aY
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
		? { aH: 'hidden', aA: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { aH: 'mozHidden', aA: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { aH: 'msHidden', aA: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { aH: 'webkitHidden', aA: 'webkitvisibilitychange' }
		: { aH: 'hidden', aA: 'visibilitychange' };
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
		am: _Browser_getScene(),
		ar: {
			at: _Browser_window.pageXOffset,
			au: _Browser_window.pageYOffset,
			as: _Browser_doc.documentElement.clientWidth,
			Z: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		as: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		Z: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
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
			am: {
				as: node.scrollWidth,
				Z: node.scrollHeight
			},
			ar: {
				at: node.scrollLeft,
				au: node.scrollTop,
				as: node.clientWidth,
				Z: node.clientHeight
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
			am: _Browser_getScene(),
			ar: {
				at: x,
				au: y,
				as: _Browser_doc.documentElement.clientWidth,
				Z: _Browser_doc.documentElement.clientHeight
			},
			aD: {
				at: x + rect.left,
				au: y + rect.top,
				as: rect.width,
				Z: rect.height
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
	return {$: 0, a: a};
};
var $author$project$FeastDayActivities$Main$UrlChanged = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Basics$EQ = 1;
var $elm$core$Basics$GT = 2;
var $elm$core$Basics$LT = 0;
var $elm$core$List$cons = _List_cons;
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
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
	var dict = _v0;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
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
	return {$: 1, a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Basics$False = 1;
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Maybe$Nothing = {$: 1};
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
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 1) {
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
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
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
		return {$: 0, a: a, b: b, c: c, d: d};
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
	return {$: 1, a: a};
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
	return {$: 0, a: a};
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
		if (!builder.a) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.c),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.c);
		} else {
			var treeLen = builder.a * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.d) : builder.d;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.a);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.c) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.c);
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
					{d: nodeList, a: (len / $elm$core$Array$branchFactor) | 0, c: tail});
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
var $elm$core$Basics$True = 0;
var $elm$core$Result$isOk = function (result) {
	if (!result.$) {
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
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = $elm$core$Basics$identity;
var $elm$url$Url$Http = 0;
var $elm$url$Url$Https = 1;
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {Y: fragment, _: host, ab: path, ad: port_, ag: protocol, ah: query};
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
					if (_v1.$ === 1) {
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
		0,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		1,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = $elm$core$Basics$identity;
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(0);
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
		var task = _v0;
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
				return 0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0;
		return A2($elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			A2($elm$core$Task$map, toMessage, task));
	});
var $elm$browser$Browser$application = _Browser_application;
var $author$project$FeastDayActivities$Main$Model = F2(
	function (key, url) {
		return {aL: key, Q: url};
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
var $author$project$FeastDayActivities$FeastDays$M04Apr$april = {
	aB: '#ebdf72',
	X: _List_fromArray(
		[
			{
			H: '02',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Palm Sunday of the Lord\'s Passion'},
					{aw: _List_Nil, aF: 'Saint Francis of Paola'}
				])
		},
			{
			H: '04',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Isidore'}
				])
		},
			{
			H: '05',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Vincent Ferrer'}
				])
		},
			{
			H: '06',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Holy Thursday'}
				])
		},
			{
			H: '07',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Good Friday'},
					{aw: _List_Nil, aF: 'Saint John Baptist de la Salle'}
				])
		},
			{
			H: '08',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Holy Saturday'}
				])
		},
			{
			H: '09',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Easter Sunday'}
				])
		},
			{
			H: '11',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Stanislaus'}
				])
		},
			{
			H: '13',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Martin I'}
				])
		},
			{
			H: '16',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Divine Mercy Sunday'}
				])
		},
			{
			H: '21',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Anselm of Canterbury'}
				])
		},
			{
			H: '23',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint George'},
					{aw: _List_Nil, aF: 'Saint Adalbert'}
				])
		},
			{
			H: '24',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Fidelis of Sigmaringen'}
				])
		},
			{
			H: '25',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Mark the Evangelist'}
				])
		},
			{
			H: '28',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Peter Chanel'},
					{aw: _List_Nil, aF: 'Saint Louis Grignon de Montfort'}
				])
		},
			{
			H: '29',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Catherine of Siena'}
				])
		},
			{
			H: '30',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Pius V.'}
				])
		}
		]),
	aL: 'apr',
	K: 'April'
};
var $author$project$FeastDayActivities$FeastDays$M08Aug$august = {
	aB: '#ebdf72',
	X: _List_fromArray(
		[
			{
			H: '01',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Alphonsus Maria de Liguori'}
				])
		},
			{
			H: '02',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Eusebius of Vercelli'},
					{aw: _List_Nil, aF: 'Saint Peter Julian Eymard'}
				])
		},
			{
			H: '04',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Jean Vianney (the Curé of Ars)'}
				])
		},
			{
			H: '05',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Dedication of the Basilica of Saint Mary Major'}
				])
		},
			{
			H: '06',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Transfiguration of the Lord'}
				])
		},
			{
			H: '07',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Sixtus II, Pope and Martyr'},
					{aw: _List_Nil, aF: 'Saint Cajetan'}
				])
		},
			{
			H: '08',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Dominic'}
				])
		},
			{
			H: '09',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Teresa Benedicta of the Cross (Edith Stein)'}
				])
		},
			{
			H: '10',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Lawrence'}
				])
		},
			{
			H: '11',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Clare'}
				])
		},
			{
			H: '12',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Jane Frances de Chantal'}
				])
		},
			{
			H: '13',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saints Pontian, Pope and Hippoloytus'}
				])
		},
			{
			H: '14',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Maximilian Mary Kolbe'}
				])
		},
			{
			H: '15',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Assumption of the Blessed Virgin Mary'}
				])
		},
			{
			H: '16',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Stephen of Hungary'}
				])
		},
			{
			H: '19',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint John Eudes'}
				])
		},
			{
			H: '20',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Bernard of Clairvaux'}
				])
		},
			{
			H: '21',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Pius X'}
				])
		},
			{
			H: '22',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Queenship of Blessed Virgin Mary'}
				])
		},
			{
			H: '23',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Rose of Lima'}
				])
		},
			{
			H: '24',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Bartholomew the Apostle'}
				])
		},
			{
			H: '25',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Louis'},
					{aw: _List_Nil, aF: 'Saint Joseph of Calasanz'}
				])
		},
			{
			H: '27',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Monica'}
				])
		},
			{
			H: '28',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Augustine of Hippo'}
				])
		},
			{
			H: '29',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'The Passion of Saint John the Baptist'}
				])
		}
		]),
	aL: 'aug',
	K: 'August'
};
var $author$project$FeastDayActivities$FeastDays$M12Dec$december = {
	aB: '#ebdf72',
	X: _List_fromArray(
		[
			{
			H: '03',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Francis Xavier'}
				])
		},
			{
			H: '04',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint John Damascene'}
				])
		},
			{
			H: '06',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Nicholas'}
				])
		},
			{
			H: '07',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Ambrose'}
				])
		},
			{
			H: '08',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Immaculate Conception of the Blessed Virgin Mary'}
				])
		},
			{
			H: '09',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Juan Diego'}
				])
		},
			{
			H: '10',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Our Lady of Loreto'}
				])
		},
			{
			H: '11',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Damasus I'}
				])
		},
			{
			H: '12',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Our Lady of Guadalupe'}
				])
		},
			{
			H: '13',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Lucy of Syracuse'}
				])
		},
			{
			H: '14',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint John of the Cross'}
				])
		},
			{
			H: '21',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Peter Canisius'}
				])
		},
			{
			H: '23',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint John of Kanty'}
				])
		},
			{
			H: '25',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Nativity of the Lord'}
				])
		},
			{
			H: '26',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Stephen'}
				])
		},
			{
			H: '27',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint John the Apostle and Evangelist'}
				])
		},
			{
			H: '28',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Holy Innocents'}
				])
		},
			{
			H: '29',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Thomas Becket'}
				])
		},
			{
			H: '30',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'The Holy Family of Jesus, Mary, and Joseph'}
				])
		},
			{
			H: '31',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Sylvester I'}
				])
		}
		]),
	aL: 'dec',
	K: 'December'
};
var $author$project$FeastDayActivities$FeastDayHelpers$Audio = 1;
var $author$project$FeastDayActivities$FeastDayHelpers$Crafts = 8;
var $author$project$FeastDayActivities$FeastDayHelpers$Images = 2;
var $author$project$FeastDayActivities$FeastDayHelpers$More = 9;
var $author$project$FeastDayActivities$FeastDayHelpers$Video = 0;
var $author$project$FeastDayActivities$FeastDays$M02Feb$february = {
	aB: '#395d73',
	X: _List_fromArray(
		[
			{
			H: '02',
			X: _List_fromArray(
				[
					{
					aw: _List_fromArray(
						[
							{R: 1, aI: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', aM: 'https://www.franciscanmedia.org/saint-of-the-day/presentation-of-the-lord/', aV: 'At the end of the fourth century, a woman named Etheria made a pilgrimage to Jerusalem. Her journal, discovered in 1887, gives an unprecedented...', a_: 'Presentation of the Lord'},
							{R: 9, aI: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', aM: 'https://www.catholicicing.com/ideas-for-celebrating-candlemas-feb-2/', aV: 'There are tons of fun and traditional ways to celebrate Candlemas with Catholic kids so let’s look at some ideas that may work for your family...', a_: 'How To Celebrate Candlemas With Catholic Children'}
						]),
					aF: 'Presentation of the Lord'
				}
				])
		},
			{
			H: '03',
			X: _List_fromArray(
				[
					{
					aw: _List_fromArray(
						[
							{R: 1, aI: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', aM: 'https://www.franciscanmedia.org/saint-of-the-day/saint-blaise/', aV: 'We know more about the devotion to Saint Blaise by Christians around the world than we know about the saint himself...', a_: 'Saint Blaise’s Story'}
						]),
					aF: 'St Blase'
				},
					{aw: _List_Nil, aF: 'St Ansgar'}
				])
		},
			{
			H: '05',
			X: _List_fromArray(
				[
					{
					aw: _List_fromArray(
						[
							{R: 1, aI: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', aM: 'https://www.franciscanmedia.org/saint-of-the-day/saint-agatha/', aV: 'As in the case of Agnes, another virgin-martyr of the early Church, almost nothing is historically certain about this saint except that she was martyred in Sicily during the persecution of Emperor Decius in 251...', a_: 'Saint Agatha’s Story'}
						]),
					aF: 'St Agatha'
				}
				])
		},
			{
			H: '06',
			X: _List_fromArray(
				[
					{
					aw: _List_fromArray(
						[
							{R: 1, aI: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', aM: 'https://www.franciscanmedia.org/saint-of-the-day/saint-paul-miki-and-companions/', aV: 'Nagasaki, Japan, is familiar to Americans as the city on which the second atomic bomb was dropped, immediately killing over 37,000 people. Three and a half centuries before, 26 martyrs of Japan were crucified on a hill, now known as the Holy Mountain, overlooking Nagasaki...', a_: 'Saint Paul Miki and Companions’ Story'}
						]),
					aF: 'Sts Paul Miki and Companions'
				}
				])
		},
			{
			H: '08',
			X: _List_fromArray(
				[
					{
					aw: _List_fromArray(
						[
							{R: 1, aI: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', aM: 'https://www.franciscanmedia.org/saint-of-the-day/saint-jerome-emiliani/', aV: 'A careless and irreligious soldier for the city-state of Venice, Jerome was captured in a skirmish at an outpost town and chained in a dungeon...', a_: 'Saint Jerome Emiliani’s Story'}
						]),
					aF: 'Saint Jerome Emilani'
				},
					{
					aw: _List_fromArray(
						[
							{R: 1, aI: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', aM: 'https://www.franciscanmedia.org/saint-of-the-day/saint-josephine-bakhita/', aV: 'For many years, Josephine Bakhita was a slave but her spirit was always free and eventually that spirit prevailed.', a_: 'Saint Josephine Bakhita’s Story'},
							{R: 9, aI: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', aM: 'https://www.catholicicing.com/st-josephine-bakhita-resources-for-kids/', aV: 'Let’s look at some celebrating the life of St. Bakhita for kids with crafts, printables, and even more resources.', a_: 'St. Josephine Bakhita Resources For Kids (Crafts, Printables, More!)'}
						]),
					aF: 'Saint Josephine Bakhita'
				}
				])
		},
			{
			H: '10',
			X: _List_fromArray(
				[
					{
					aw: _List_fromArray(
						[
							{R: 1, aI: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', aM: 'https://www.franciscanmedia.org/saint-of-the-day/saint-scholastica/', aV: 'Twins often share the same interests and ideas with an equal intensity. Therefore, it is no surprise that Scholastica and her twin brother, Benedict, established religious communities within a few miles from each other...', a_: 'Saint Scholastica’s Story'}
						]),
					aF: 'Saint Scholastica'
				}
				])
		},
			{
			H: '11',
			X: _List_fromArray(
				[
					{
					aw: _List_fromArray(
						[
							{R: 0, aI: '', aM: 'https://www.youtube-nocookie.com/embed/XGe_P7oaSgQ ', aV: '', a_: 'Story of Saint Bernadette | Stories of Saints'},
							{R: 1, aI: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', aM: 'https://www.franciscanmedia.org/saint-of-the-day/our-lady-of-lourdes/', aV: 'On December 8, 1854, Pope Pius IX proclaimed the dogma of the Immaculate Conception in the apostolic constitution Ineffabilis Deus. A little more than three years later, on February 11, 1858, a young lady appeared to Bernadette Soubirous...', a_: 'The Story of Our Lady of Lourdes'},
							{R: 8, aI: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', aM: 'https://www.catholicicing.com/our-lady-of-lourdes-craft/', aV: 'It prints on 3 pages, and comes in both black & white AND in color, so you can choose if you want to color it yourself or not...', a_: 'Our Lady Of Lourdes Diorama (Printable Craft For Catholic Kids!)'}
						]),
					aF: 'Our Lady of Lourdes'
				}
				])
		},
			{
			H: '14',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saints Cyril, Monk, and Methodius'},
					{
					aw: _List_fromArray(
						[
							{R: 9, aI: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', aM: 'https://www.catholicicing.com/celebrating-st-valentines-day-with-catholic-kids/', aV: 'Today I am going to share with you some pintables, resources, crafts, and books to celebrate the true meaning of St. Valentine’s Day with Catholic kids...', a_: 'Celebrating St. Valentine’s Day With Catholic Kids'}
						]),
					aF: 'Saint Valentine'
				}
				])
		},
			{
			H: '17',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Seven Holy Founders of the Servite Order'}
				])
		},
			{
			H: '18',
			X: _List_fromArray(
				[
					{
					aw: _List_fromArray(
						[
							{R: 2, aI: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/GoogleArtsAndCulture__aIhfPvxu.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676432323426', aM: 'https://artsandculture.google.com/entity/fra-angelico/m031b2?categoryId=artist', aV: 'View ultra-high resolution images of Fra Angelico\'s paintings', a_: 'Fra Angelico\'s Paintings'}
						]),
					aF: 'Blessed John of Fiesole (Fra Angelico)'
				}
				])
		},
			{
			H: '21',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Peter Damian'}
				])
		},
			{
			H: '22',
			X: _List_fromArray(
				[
					{
					aw: _List_fromArray(
						[
							{R: 9, aI: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', aM: 'https://www.catholicicing.com/ash-wednesday-for-kids/', aV: '', a_: 'Ash Wednesday For Kids (Traditions, Printables, & Resources)'}
						]),
					aF: 'Ash Wednesday'
				}
				])
		},
			{
			H: '23',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Polycarp'}
				])
		},
			{
			H: '27',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Gregory of Narek'}
				])
		}
		]),
	aL: 'feb',
	K: 'February'
};
var $author$project$FeastDayActivities$FeastDayHelpers$Book = 7;
var $author$project$FeastDayActivities$FeastDayHelpers$Food = 5;
var $author$project$FeastDayActivities$FeastDayHelpers$Game = 6;
var $author$project$FeastDayActivities$FeastDayHelpers$OnlineReading = 4;
var $author$project$FeastDayActivities$FeastDayHelpers$Printout = 3;
var $author$project$FeastDayActivities$FeastDays$M01Jan$january = {
	aB: '#9de3ec',
	X: _List_fromArray(
		[
			{
			H: '01',
			X: _List_fromArray(
				[
					{
					aw: _List_fromArray(
						[
							{R: 0, aI: '', aM: 'https://www.youtube-nocookie.com/embed/HW0DzGEoa1Y', aV: '', a_: 'Hail Mary, Full of Grace'},
							{R: 1, aI: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', aM: 'https://www.franciscanmedia.org/saint-of-the-day/mary-mother-of-god/', aV: 'Mary’s divine motherhood broadens the Christmas spotlight. Mary has an important role to play in the Incarnation of the Second Person of the Blessed Trinity...', a_: 'The Story of Mary, Mother of God'},
							{R: 6, aI: 'https://3.bp.blogspot.com/_OdlDH5TOnZ8/S3nCLk9d_VI/AAAAAAAACCo/ogcGrC6sDPY/s320/MaryGameBoard.png', aM: 'https://catholicblogger1.blogspot.com/2009/04/mary-is-mother-of-our-church.html', aV: 'The objective of the game is to answer questions about Mary and receive a letter tile and spell Mary. Place your marker anywhere on the board...', a_: 'Mary, Mother of Our Church File Folder Game'},
							{R: 8, aI: 'https://ik.imagekit.io/catholicstories/ProfileImages/ThatArtistWoman_-lQHC5LdH.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401274351', aM: 'http://www.thatartistwoman.org/2008/12/pastel-resist-madonna-art-project.html', aV: 'You only need some basic supplies for this one. Try to find heavy kraft paper if you can...', a_: 'Pastel Resist Madonna - Art Project'},
							{R: 8, aI: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', aM: 'https://www.catholicicing.com/how-to-draw-mary-and-baby-jesus/', aV: 'A step by step video for kids', a_: 'How To Draw Mary And Baby Jesus (Easy!)'},
							{R: 4, aI: 'https://lpress-craft.loyolapress.com/images/ocf-articles/Microsites/SaintsStories_100x100.jpeg', aM: 'https://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/solemnity-of-mary/', aV: 'Way back in 431, there was a bitter controversy among theologians over the role of Mary in the Catholic Church. They debated the question: Who is Mary in God’s plan? In the end, the bishops declared that...', a_: 'Solemnity of Mary, the Holy Mother of God'},
							{R: 4, aI: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', aM: 'https://www.saintsfeastfamily.com/copy-of-solemnity-of-mary-the-holy-', aV: 'Mary’s divine motherhood broadens the Christmas spotlight. Mary has an important role to play in the Incarnation of the Second Person of the Blessed Trinity. She consents to God’s invitation conveyed by the angel (Luke 1:26-38)...', a_: 'The Story of Mary, Mother of God'},
							{R: 5, aI: 'https://static.wixstatic.com/media/9c2964_a235ca1bce84403c87d185b7daaa3e2c~mv2.jpg/v1/fill/w_720,h_545,al_c,lg_1,q_85,enc_auto/9c2964_a235ca1bce84403c87d185b7daaa3e2c~mv2.jpg', aM: 'https://www.saintsfeastfamily.com/copy-of-solemnity-of-mary-the-holy-', aV: '', a_: 'Smoked Sausage and Black-Eyed Peas'},
							{R: 5, aI: 'https://static.wixstatic.com/media/9c2964_e5144304a75546688cdc08cd771a4030~mv2.jpg/v1/crop/x_81,y_59,w_603,h_471/fill/w_676,h_565,al_c,lg_1,q_85,enc_auto/9c2964_e5144304a75546688cdc08cd771a4030~mv2.jpg', aM: 'https://www.saintsfeastfamily.com/copy-of-solemnity-of-mary-the-holy-', aV: '', a_: 'Broccoli Cornbread Mini Muffins'},
							{R: 5, aI: 'https://static.wixstatic.com/media/9c2964_b4647017bd7c404d9ae193673bbbd2d6~mv2.jpeg/v1/fill/w_714,h_554,al_c,lg_1,q_85,enc_auto/9c2964_b4647017bd7c404d9ae193673bbbd2d6~mv2.jpeg', aM: 'https://www.saintsfeastfamily.com/copy-of-solemnity-of-mary-the-holy-', aV: '', a_: 'Sweet Buttermilk Cornbread'},
							{R: 5, aI: 'https://static.wixstatic.com/media/9c2964_0a4855c5e3e94eaab4557fc3213b9ecd~mv2.jpg/v1/fill/w_583,h_423,al_c,lg_1,q_80,enc_auto/9c2964_0a4855c5e3e94eaab4557fc3213b9ecd~mv2.jpg', aM: 'https://www.saintsfeastfamily.com/copy-of-solemnity-of-mary-the-holy-', aV: '', a_: 'German New Years Cake'}
						]),
					aF: 'Mary, Mother of God'
				}
				])
		},
			{
			H: '02',
			X: _List_fromArray(
				[
					{
					aw: _List_fromArray(
						[
							{R: 0, aI: '', aM: 'https://youtu.be/lwe8voh3H_4', aV: '', a_: 'Ss. Gregory & Basil'},
							{R: 1, aI: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', aM: 'https://www.franciscanmedia.org/saint-of-the-day/saint-basil-the-great/', aV: 'Basil was on his way to becoming a famous teacher when he decided to begin a religious life of gospel poverty...', a_: 'Saint Basil the Great’s Story'},
							{R: 4, aI: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', aM: 'https://www.saintsfeastfamily.com/copy-of-st-basil-the-great-jan-2', aV: 'St. Basil was a very close friend of St. Gregoryn the Bishop of Nazianzus - Constantinople. Together they wrote an outstanding works...', a_: 'Saint Basil the Great'},
							{R: 4, aI: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', aM: 'https://www.saintsfeastfamily.com/copy-of-st-gregory-of-nazianzus-jan-2', aV: 'After his baptism at 30, Gregory gladly accepted his friend Basil’s invitation to join him in a newly founded monastery. The solitude was broken when Gregory’s father, a bishop, needed help in his diocese and estate...', a_: 'Saint Gregory of Nazianzus'},
							{R: 5, aI: 'https://static.wixstatic.com/media/9c2964_e91e23b66c7d434da5fc63652cbed30d~mv2.png/v1/fill/w_584,h_512,al_c,lg_1,q_85,enc_auto/9c2964_e91e23b66c7d434da5fc63652cbed30d~mv2.png', aM: 'https://www.saintsfeastfamily.com/copy-of-st-basil-the-great-jan-2', aV: '', a_: 'Vasilopita Bread'},
							{R: 5, aI: 'https://static.wixstatic.com/media/9c2964_e91e23b66c7d434da5fc63652cbed30d~mv2.png/v1/fill/w_584,h_512,al_c,lg_1,q_85,enc_auto/9c2964_e91e23b66c7d434da5fc63652cbed30d~mv2.png', aM: 'https://www.saintsfeastfamily.com/copy-of-st-basil-the-great-jan-2', aV: '', a_: 'Vasilopita Cake'},
							{R: 5, aI: 'https://static.wixstatic.com/media/9c2964_38dca455491840dc8f74daf2a335dc5d~mv2.jpg/v1/fill/w_659,h_473,al_c,lg_1,q_80,enc_auto/9_3_edited.jpg', aM: 'https://www.saintsfeastfamily.com/copy-of-st-gregory-of-nazianzus-jan-2', aV: '', a_: 'Hünkar Beğendi'},
							{R: 5, aI: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', aM: 'https://www.catholicicing.com/make-a-jewel-cake-for-st-basil-on-new-years/', aV: 'St. Basil’s feast day is on January 2, but it has become a Catholic tradition to make a “St. Basil’s Cake” on New Year’s to celebrate one of his miracles...', a_: 'Jewel Cake'},
							{R: 5, aI: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', aM: 'https://www.catholicicing.com/st-basils-hidden-jewel-cupcakes-easy-to-make/', aV: 'Slice a small hole in the top of the cupcake using a butter knife, and stick a lifesaver candy “jewel” inside...', a_: 'St Basil\'s Cupcakes'}
						]),
					aF: 'Saint Basil'
				}
				])
		},
			{
			H: '03',
			X: _List_fromArray(
				[
					{
					aw: _List_fromArray(
						[
							{R: 4, aI: 'https://www.simplycatholic.com/wp-content/uploads/2018/12/Jesus1.jpg', aM: 'https://www.simplycatholic.com/why-we-celebrate-the-holy-name-of-jesus/', aV: 'This is a great activity for Catholic kids when learning about Jesus and the bible. This lesson is so fun because you actually learn how to draw Jesus’s name in negative space...', a_: 'Why We Celebrate the Holy Name of Jesus'},
							{R: 4, aI: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', aM: 'https://www.saintsfeastfamily.com/copy-of-the-most-holy-name-of-jesus-1', aV: 'The month of January is traditionally dedicated to the Holy Name of Jesus, with January 3rd being the feast of the Holy Name. After the Blessed Virgin Mary had conceived her Child by the Holy Spirit, the angel Gabriel...', a_: 'Saint Gregory of Nazianzus'},
							{R: 1, aI: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', aM: 'https://www.franciscanmedia.org/saint-of-the-day/most-holy-name-of-jesus/', aV: 'Although Saint Paul might claim credit for promoting devotion to the Holy Name because Paul wrote in Philippians that God the Father gave Christ Jesus “that name that is above every name” (see 2:9), this devotion became popular because of 12th-century Cistercian monks and nuns but especially...', a_: 'The Story of the Most Holy Name of Jesus'},
							{R: 3, aI: 'https://www.catholicicing.com/wp-content/uploads/2020/01/negative-space-lesson-how-to-draw-jesus.jpg', aM: 'https://www.catholicicing.com/how-to-draw-holy-name-of-jesus/', aV: 'This is a great activity for Catholic kids when learning about Jesus and the bible. This lesson is so fun because you actually learn how to draw Jesus’s name in negative space...', a_: 'How To Draw The Most Holy Name Of Jesus'},
							{R: 7, aI: 'https://m.media-amazon.com/images/I/51KgwkrXsQL._SX311_BO1,204,203,200_.jpg', aM: 'https://www.amazon.com/Wonders-Holy-Name-Paul-OSullivan/dp/0895554909', aV: 'This booklet, "The Wonders of the Holy Name," reveals the simplest secret of holiness and happiness ever. For it shows us how we can pray "without ceasing," pray "always," and pray "at all times," as Holy Scripture exhorts us...', a_: 'The Wonders of the Holy Name'},
							{R: 5, aI: 'https://static.wixstatic.com/media/9c2964_509e915a37e847fb8dc2a1a229ebd879~mv2.jpg/v1/crop/x_0,y_0,w_640,h_657/fill/w_562,h_576,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/791bbe7f2e139eb2d01a3f2c92050acc.jpg', aM: 'https://www.saintsfeastfamily.com/copy-of-the-most-holy-name-of-jesus-1', aV: 'The month of January is traditionally dedicated to the Holy Name of Jesus, with January 3rd being the feast of the Holy Name. After the Blessed Virgin Mary had conceived her Child by the Holy Spirit, the angel Gabriel...', a_: 'Prosphora Orthodox Bread'}
						]),
					aF: 'The Most Holy Name of Jesus'
				}
				])
		},
			{
			H: '04',
			X: _List_fromArray(
				[
					{
					aw: _List_fromArray(
						[
							{R: 4, aI: 'https://lpress-craft.loyolapress.com/images/ocf-articles/Microsites/SaintsStories_100x100.jpeg', aM: 'https://www.loyolapress.com/catholic-resources/saints/saints-stories-for-all-ages/saint-elizabeth-ann-seton/', aV: 'Who was the first person born in the United States to be declared a saint? Who opened the first American Catholic parish school and established the first American Catholic orphanage? ...', a_: 'Saint Elizabeth Ann Seton'},
							{R: 4, aI: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', aM: 'https://www.saintsfeastfamily.com/copy-of-st-elizabeth-ann-seton-jan--1', aV: 'Saint Elizabeth Ann Seton was the first native-born citizen of the United States to be canonized by the Roman Catholic Church. Mother Seton is one of the keystones of the American Catholic Church...', a_: 'Saint Elizabeth Ann Seton\'s Story'},
							{R: 0, aI: '', aM: 'https://www.youtube-nocookie.com/embed/fR42gZv9T3A', aV: '', a_: 'Betty Bayley Becomes A Saint'},
							{R: 1, aI: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', aM: 'https://www.franciscanmedia.org/saint-of-the-day/saint-elizabeth-ann-seton/', aV: 'Mother Seton is one of the keystones of the American Catholic Church. She founded the first American religious community for women, the Sisters of Charity. She opened the first American parish school and established the first American Catholic orphanage. All this she did in the span of 46 years while raising her five children...', a_: 'Saint Elizabeth Ann Seton’s Story'},
							{R: 3, aI: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/ElizabethAnnSetonWordSearch_IUJjxiyxd.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675555824047', aM: 'https://setonshrine.org/wp-content/uploads/2016/02/Activity-Seton-Word-Search.pdf', aV: 'A themed word search for older kids.', a_: 'Elizabeth Ann Seton Word Find'},
							{R: 5, aI: 'https://static.wixstatic.com/media/9c2964_ea5027fa315445ffab9e8c41da1f901b~mv2_d_3188_3187_s_4_2.jpeg/v1/fill/w_868,h_868,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/9c2964_ea5027fa315445ffab9e8c41da1f901b~mv2_d_3188_3187_s_4_2.jpeg', aM: 'https://www.saintsfeastfamily.com/copy-of-st-elizabeth-ann-seton-jan--1', aV: '', a_: 'Corn and Crab Bisque'},
							{R: 5, aI: 'https://static.wixstatic.com/media/9c2964_7b87e042e19046e88cf334473f82ec25~mv2.jpg/v1/crop/x_18,y_454,w_366,h_444/fill/w_439,h_532,al_c,lg_1,q_80,enc_auto/9c2964_7b87e042e19046e88cf334473f82ec25~mv2.jpg', aM: 'https://www.saintsfeastfamily.com/copy-of-st-elizabeth-ann-seton-jan--1', aV: '', a_: 'Oly Koeken, Vet Ballen, Vet Bollen, Ole Bollen, Oliekoecken....aka Oil Balls'},
							{R: 9, aI: 'https://www.catholicicing.com/wp-content/uploads/2016/02/header-social.jpg', aM: 'https://www.activityvillage.co.uk/schoolhouse-photo-frame', aV: 'See Catholic Icing for more activity ideas to celebrate this saint!', a_: 'Catholic Icing'}
						]),
					aF: 'Saint Elizabeth Ann Seton'
				}
				])
		},
			{
			H: '05',
			X: _List_fromArray(
				[
					{
					aw: _List_fromArray(
						[
							{R: 0, aI: '', aM: 'https://www.youtube-nocookie.com/embed/7CEbPb-Y0gs', aV: '', a_: 'St. John Neumann'},
							{R: 1, aI: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', aM: 'https://www.franciscanmedia.org/saint-of-the-day/saint-john-neumann/', aV: 'Perhaps because the United States got a later start in the history of the world, it has relatively few canonized saints, but their number is increasing. John Neumann was born in what is now the Czech Republic. After studying in Prague, he came to New York at 25 and was ordained a priest...', a_: 'Saint John Neumann’s Story'},
							{R: 4, aI: 'https://www.catholic.org/saints/ff_images/85.jpg', aM: 'https://www.catholic.org/saints/fun_facts_arch.php?saint=70', aV: 'This American saint was born in Bohemia in 1811. He was looking forward to being ordained in 1835 when...', a_: 'Saints Fun Facts: St. John Neumann'},
							{R: 4, aI: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', aM: 'https://www.saintsfeastfamily.com/copy-of-st-john-neumann-jan-5-1', aV: 'John was appointed bishop of Philadelphia in 1852. As bishop, he was the first to organize a diocesan Catholic school system. A founder of Catholic education in the United States of America...', a_: 'St. John Neumann\'s Story '},
							{R: 5, aI: 'https://static.wixstatic.com/media/9c2964_380d753f39684036b7a1360c29e0532c~mv2.png/v1/crop/x_15,y_14,w_726,h_550/fill/w_726,h_550,al_c,q_90,enc_auto/9c2964_380d753f39684036b7a1360c29e0532c~mv2.png', aM: 'https://www.saintsfeastfamily.com/copy-of-st-john-neumann-jan-5-1', aV: '', a_: 'Svíčková with Dumplings'}
						]),
					aF: 'Saint John Newmann'
				}
				])
		},
			{
			H: '06',
			X: _List_fromArray(
				[
					{
					aw: _List_fromArray(
						[
							{R: 0, aI: '', aM: 'https://www.youtube-nocookie.com/embed/8vzYYJK1_pg', aV: '', a_: 'My Time with Jesus - Epiphany'},
							{R: 1, aI: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', aM: 'https://www.franciscanmedia.org/sunday-soundbites/sunday-soundbite-for-january-8-2023/', aV: 'Today’s feast of the Epiphany of the Lord is a feast that celebrates communication.  The Gospel we read today portrays Jesus, the Word Made Flesh revealed to the nations, as the wise men arrive to pay him homage...', a_: 'Epiphany of the Lord'},
							{R: 4, aI: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', aM: 'https://www.saintsfeastfamily.com/copy-of-the-epiphany-jan-6-1', aV: 'The gift of gold was significant because it showed the Magis paying tribute to Jesus Christ as their King because he is royal...', a_: 'Gifts to our King'},
							{R: 9, aI: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', aM: 'https://www.catholicicing.com/epiphany-house-blessing-with-chalk/', aV: 'The Epiphany house blessing of the door is a really great Catholic tradition for families...', a_: 'Epiphany House Blessing with Chalk'},
							{R: 8, aI: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', aM: 'https://www.catholicicing.com/k-is-for-king-bible-alphabet-crafts-for-kids/', aV: 'I love to make wearable crafts with preschoolers, because they love wearing them...', a_: 'K is for King'},
							{R: 8, aI: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', aM: 'https://www.catholicicing.com/3-kings-epiphany-crafts/', aV: 'Ornament Craft, peg doll wraps, and printable nativity set!', a_: '3 Kings Epiphany Crafts For Kids'},
							{R: 8, aI: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', aM: 'https://www.catholicicing.com/star-of-wonder-star-of-night/', aV: '', a_: 'Star Crafts'},
							{R: 5, aI: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', aM: 'https://www.catholicicing.com/epiphany-crown-food-ideas/', aV: 'I found all kinds of crown cakes, king cakes, king breads, and everything else under the sun for celebrating the epiphany...', a_: 'Epiphany Crown Food Ideas'},
							{R: 5, aI: 'https://static.wixstatic.com/media/9c2964_c59aa4a5eb5d467f91acf84877a51c5b~mv2.jpg/v1/fill/w_772,h_960,al_c,q_85,enc_auto/9c2964_c59aa4a5eb5d467f91acf84877a51c5b~mv2.jpg', aM: 'https://www.saintsfeastfamily.com/copy-of-the-epiphany-jan-6-1', aV: '', a_: 'La Galette des Rois: The French King Cake'}
						]),
					aF: 'The Epiphany of the Lord'
				}
				])
		},
			{
			H: '06',
			X: _List_fromArray(
				[
					{
					aw: _List_fromArray(
						[
							{R: 4, aI: 'https://www.catholic.org/files/images/saints/18.jpg', aM: 'https://www.catholic.org/saints/saint.php?saint_id=18', aV: 'When Alfred Bessette came to the Holy Cross Brothers in 1870, he carried with him a note from...', a_: 'St. Andre Bessette'},
							{R: 4, aI: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', aM: 'https://www.saintsfeastfamily.com/copy-of-st-andre-bessette-jan-6', aV: 'Brother André expressed a saint’s faith by a lifelong devotion to Saint Joseph. Sickness and weakness dogged André from birth. He was the eighth of 12 children born to a French Canadian couple near Montreal...', a_: 'Saint André Bessette’s Story'},
							{R: 0, aI: '', aM: 'https://www.youtube-nocookie.com/embed/NGzM8sr6w7s', aV: '', a_: 'The Story of Saint Brother Andre Bessette of Canada'},
							{R: 1, aI: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', aM: 'https://www.franciscanmedia.org/saint-of-the-day/saint-andre-bessette/', aV: 'Brother André expressed a saint’s faith by a lifelong devotion to Saint Joseph. Sickness and weakness dogged André from birth...', a_: 'Saint André Bessette’s Story'},
							{R: 5, aI: 'https://static.wixstatic.com/media/9c2964_eca3f6a909d34f4fbfa492de547ebaae~mv2.jpg/v1/crop/x_0,y_0,w_614,h_408/fill/w_736,h_490,al_c,lg_1,q_85,enc_auto/9c2964_eca3f6a909d34f4fbfa492de547ebaae~mv2.jpg', aM: 'https://www.saintsfeastfamily.com/copy-of-st-andre-bessette-jan-6', aV: '', a_: 'Maple Tourlouche Upside Down Cake\u200B'}
						]),
					aF: 'Saint André Bessette'
				}
				])
		},
			{
			H: '07',
			X: _List_fromArray(
				[
					{
					aw: _List_fromArray(
						[
							{R: 0, aI: '', aM: 'https://www.youtube-nocookie.com/embed/b1yNa55xmjM', aV: '', a_: 'St. Raymond of Peñafort'},
							{R: 1, aI: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', aM: 'https://www.franciscanmedia.org/saint-of-the-day/saint-raymond-of-penafort/', aV: 'Since Raymond lived into his hundredth year, he had a chance to do many things. As a member of the Spanish nobility, he had the resources and the education to get a good start in life...', a_: 'Saint Raymond of Peñafort’s Story'},
							{R: 4, aI: 'https://static.wixstatic.com/media/9c2964_aa20a20c033d476993f14f7d92a235b7~mv2.jpg/v1/fill/w_388,h_559,al_c,lg_1,q_80,enc_auto/9c2964_aa20a20c033d476993f14f7d92a235b7~mv2.jpg', aM: 'https://www.saintsfeastfamily.com/copy-of-st-raymond-of-penafort-jan--1', aV: 'Born in Spain, St. Raymond was a relative of the King of Aragon. From childhood he had a tender love and devotion to the Blessed Mother. He finished his studies at an early age, and became a famous teacher...', a_: 'St. Raymond of Pennafort\'s Story'},
							{R: 5, aI: 'https://static.wixstatic.com/media/9c2964_ef27b6ef1deb4e6ab35d6b07902bc923~mv2.jpg/v1/crop/x_145,y_27,w_879,h_546/fill/w_879,h_546,al_c,q_85,enc_auto/9c2964_ef27b6ef1deb4e6ab35d6b07902bc923~mv2.jpg', aM: 'https://www.saintsfeastfamily.com/copy-of-st-raymond-of-penafort-jan--1', aV: '', a_: 'Barcelona Vegan Potato Bombas'}
						]),
					aF: 'Saint Raymond of Penyafort'
				}
				])
		},
			{
			H: '08',
			X: _List_fromArray(
				[
					{
					aw: _List_fromArray(
						[
							{R: 4, aI: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', aM: 'https://www.saintsfeastfamily.com/copy-of-the-baptism-of-the-lord-jan-2', aV: 'The Baptism of the Lord has historically been associated with the celebration of Epiphany. Even today, the Eastern Christian feast of Theophany, celebrated on January 6 as a counterpart to the Western feast of Epiphany...', a_: 'The Story of the Feast of the Baptism of the Lord'},
							{R: 1, aI: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', aM: 'https://www.franciscanmedia.org/sharing-the-word/sharing-the-word-for-january-9-2023/', aV: 'Today we have Matthew’s account of the baptism of Jesus. We know of course that Jesus was sinless, and so the idea of “washing from sin” does not apply here.', a_: 'Feast of the Baptism of the Lord'},
							{R: 5, aI: 'https://static.wixstatic.com/media/9c2964_84b36bb57bbd46aba6939360c752267c~mv2.jpeg/v1/crop/x_37,y_0,w_427,h_500/fill/w_512,h_600,al_c,lg_1,q_80,enc_auto/cranberryspicedcider-6-500x500.jpeg', aM: 'https://www.saintsfeastfamily.com/copy-of-the-baptism-of-the-lord-jan-2', aV: '', a_: 'Jumping Jolly Juice'},
							{R: 8, aI: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', aM: 'https://www.catholicicing.com/make-a-holy-water-bottle-craft-with-catholic-kids/', aV: 'It got the kids involved, gave them something to look forward to, kept them occupied, and I got to teach the kids about Holy Water. Score!', a_: 'Holy Water Bottle Craft'},
							{R: 8, aI: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', aM: 'https://www.catholicicing.com/bible-craft-for-the-letter-d-dove-with-olive-branch/', aV: 'It got the kids involved, gave them something to look forward to, kept them occupied, and I got to teach the kids about Holy Water. Score!', a_: 'Dove with Olive Branch'},
							{R: 8, aI: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', aM: 'https://www.catholicicing.com/holy-spirit-craft-make-a-dove-from-a-paper-plate/', aV: 'You can stop at just a dove, or you can attach the gifts of the Holy Spirit to learn a little something extra.', a_: 'Dove with Gifts of the Holy Spirit'},
							{R: 8, aI: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', aM: 'https://www.catholicicing.com/holy-spirit-craft-handprint-dove/', aV: 'For this one, start with a red piece of paper (the symbolic color for the Holy Spirit) and make a white handprint...', a_: 'Simple Handprint Dove'},
							{R: 5, aI: 'https://static.wixstatic.com/media/9c2964_476e11a5553346fd8d5baa2055f87e1a~mv2.png/v1/crop/x_3,y_14,w_489,h_410/fill/w_587,h_492,al_c,lg_1,q_85,enc_auto/9c2964_476e11a5553346fd8d5baa2055f87e1a~mv2.png', aM: 'https://www.saintsfeastfamily.com/copy-of-the-baptism-of-the-lord-jan-2', aV: '', a_: 'Greek Dipples'},
							{R: 9, aI: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', aM: 'https://www.catholicicing.com/ideas-for-teaching-catholic-kids-about-baptism/', aV: 'Baptism is so important, and it’s a great thing to make sure that your kids truly understand...', a_: 'Ideas for Teaching Catholic Kids About Baptism'}
						]),
					aF: 'The Baptism of the Lord'
				}
				])
		},
			{
			H: '13',
			X: _List_fromArray(
				[
					{
					aw: _List_fromArray(
						[
							{R: 4, aI: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', aM: 'https://www.saintsfeastfamily.com/copy-of-st-hilary-jan-13-2', aV: 'This staunch defender of the divinity of Christ was a gentle and courteous man, devoted to writing some of the greatest theology on the Trinity, and was like his Master in being labeled a “disturber of the peace.” In a very troubled period in the Church...', a_: 'Saint Hilary of Poitiers’ Story'},
							{R: 1, aI: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', aM: 'https://www.franciscanmedia.org/saint-of-the-day/saint-hilary-of-poitiers/', aV: 'This staunch defender of the divinity of Christ was a gentle and courteous man, devoted to writing some of the greatest theology on the Trinity, and was like his Master in being labeled a “disturber of the peace.” In a very troubled period in the Church..', a_: 'Saint Hilary of Poitiers’ Story'},
							{R: 5, aI: 'https://static.wixstatic.com/media/9c2964_d6785e4f4b2a417ba2b23408c33603d2~mv2.png/v1/fill/w_602,h_604,al_c,lg_1,q_90,enc_auto/9c2964_d6785e4f4b2a417ba2b23408c33603d2~mv2.png', aM: 'https://www.saintsfeastfamily.com/copy-of-st-hilary-jan-13-2', aV: '', a_: 'French Onion Soup'},
							{R: 5, aI: 'https://static.wixstatic.com/media/9c2964_ddca0ded74bd40ae8be680056db9abd6~mv2.png/v1/crop/x_0,y_72,w_443,h_358/fill/w_602,h_488,al_c,lg_1,q_85,enc_auto/9c2964_ddca0ded74bd40ae8be680056db9abd6~mv2.png', aM: 'https://www.saintsfeastfamily.com/copy-of-st-hilary-jan-13-2', aV: '', a_: 'Quiche Lorraine Quiche'}
						]),
					aF: 'Saint Hilary of Poitiers'
				}
				])
		},
			{
			H: '17',
			X: _List_fromArray(
				[
					{
					aw: _List_fromArray(
						[
							{R: 4, aI: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', aM: 'https://www.saintsfeastfamily.com/copy-of-st-anthony-jan-17-1', aV: 'The life of Anthony will remind many people of Saint Francis of Assisi. At 20, Anthony was so moved by the Gospel message, “Go, sell what you have, and give to [the] poor” (Mark 10:21b), that he actually did just that with his large inheritance...', a_: 'Saint Anthony of Egypt’s Story'},
							{R: 1, aI: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', aM: 'https://www.franciscanmedia.org/saint-of-the-day/saint-anthony-of-egypt/', aV: 'The life of Anthony will remind many people of Saint Francis of Assisi. At 20, Anthony was so moved by the Gospel message, “Go, sell what you have, and give to [the] poor” (Mark 10:21b), that he actually did just that with his large inheritance.', a_: 'Saint Anthony of Egypt’s Story'},
							{R: 5, aI: 'https://static.wixstatic.com/media/9c2964_b3b1e854d0c2461c89fd7e9279cce745~mv2.jpg/v1/fill/w_576,h_672,al_c,lg_1,q_85,enc_auto/9c2964_b3b1e854d0c2461c89fd7e9279cce745~mv2.jpg', aM: 'https://www.saintsfeastfamily.com/copy-of-st-anthony-jan-17-1', aV: '', a_: 'Uccelletti ~The little Birds of St. Anthony'},
							{R: 0, aI: '', aM: 'https://www.youtube.com/watch?v=XwoTugfbSzc', aV: '', a_: 'Uccelletti ~The little Birds of St. Anthony'}
						]),
					aF: 'Saint Anthony of Egypt'
				}
				])
		},
			{
			H: '20',
			X: _List_fromArray(
				[
					{
					aw: _List_fromArray(
						[
							{R: 4, aI: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', aM: 'https://www.saintsfeastfamily.com/copy-of-st-sebastian-jan-20', aV: 'Fabian was a Roman layman who came into the city from his farm one day as clergy and people were preparing to elect a new pope. Eusebius, a Church historian, says a dove flew in and settled on the head of Fabian...', a_: 'Saint Fabian’s Story'},
							{R: 1, aI: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', aM: 'https://www.franciscanmedia.org/saint-of-the-day/saint-fabian/', aV: 'Fabian was a Roman layman who came into the city from his farm one day as clergy and people were preparing to elect a new pope...', a_: 'Saint Fabian’s Story'},
							{R: 5, aI: 'https://static.wixstatic.com/media/9c2964_44ef0bce111d4477ab39f31de9658584~mv2.jpg/v1/fill/w_420,h_318,al_c,lg_1,q_80,enc_auto/9c2964_44ef0bce111d4477ab39f31de9658584~mv2.jpg', aM: 'https://www.saintsfeastfamily.com/copy-of-st-sebastian-jan-20', aV: '', a_: 'Dove Dinner Rolls'}
						]),
					aF: 'Saint Fabian'
				},
					{
					aw: _List_fromArray(
						[
							{R: 4, aI: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', aM: 'https://www.saintsfeastfamily.com/copy-of-st-sebastian-jan-20-1', aV: 'Almost nothing is historically certain about Sebastian except that he was a Roman martyr, was venerated in Milan even in the time of Saint Ambrose and was buried on the Appian Way, probably near the present Basilica of St. Sebastian...', a_: 'Saint Sebastian’s Story'},
							{R: 1, aI: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', aM: 'https://www.franciscanmedia.org/saint-of-the-day/saint-sebastian/', aV: 'Almost nothing is historically certain about Sebastian except that he was a Roman martyr, was venerated in Milan even in the time of Saint Ambrose and was buried on the Appian Way, probably near the present Basilica of St. Sebastian...', a_: 'Saint Sebastian’s Story'},
							{R: 5, aI: 'https://static.wixstatic.com/media/9c2964_3c7029aa08e445e1859f95e47c5e5fba~mv2.jpg/v1/crop/x_246,y_67,w_404,h_325/fill/w_566,h_358,al_c,lg_1,q_80,enc_auto/9c2964_3c7029aa08e445e1859f95e47c5e5fba~mv2.jpg', aM: 'https://www.saintsfeastfamily.com/copy-of-st-sebastian-jan-20-1', aV: '', a_: 'Roscos Orange Donuts'}
						]),
					aF: 'Saint Sebastian'
				}
				])
		},
			{
			H: '21',
			X: _List_fromArray(
				[
					{
					aw: _List_fromArray(
						[
							{R: 4, aI: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', aM: 'https://www.saintsfeastfamily.com/copy-of-st-agnes-jan-21-1', aV: 'Almost nothing is known of this saint except that she was very young—12 or 13—when she was martyred in the last half of the third century. Various modes of death have been suggested...', a_: 'Saint Agnes’ Story'},
							{R: 1, aI: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', aM: 'https://www.franciscanmedia.org/saint-of-the-day/saint-agnes/', aV: 'Almost nothing is known of this saint except that she was very young—12 or 13—when she was martyred in the last half of the third century. Various modes of death have been suggested...', a_: 'Saint Agnes’ Story'},
							{R: 5, aI: 'https://static.wixstatic.com/media/9c2964_acfdf6a128df4af299dce373dfcd31e9~mv2.jpg/v1/fill/w_508,h_855,al_c,lg_1,q_85,enc_auto/Picture1_edited.jpg', aM: 'https://www.saintsfeastfamily.com/copy-of-st-agnes-jan-21-1', aV: 'Port Sauce served over Goat Cheese Polenta', a_: 'Pistachio Crusted Lamb Chops with Cherry'},
							{R: 5, aI: 'https://static.wixstatic.com/media/9c2964_218dcdf0206e4c34a1ee4d15a9c41e9b~mv2.jpg/v1/crop/x_14,y_0,w_1386,h_933/fill/w_790,h_532,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/9c2964_218dcdf0206e4c34a1ee4d15a9c41e9b~mv2.jpg', aM: 'https://www.saintsfeastfamily.com/copy-of-st-agnes-jan-21-1', aV: 'Delicious lemon pull-apart lamb', a_: 'Lamb Pull Apart Bread'},
							{R: 5, aI: 'https://static.wixstatic.com/media/9c2964_8858942166b04a8a97151d9b44009a4a~mv2.jpg/v1/crop/x_354,y_83,w_590,h_493/fill/w_470,h_392,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_8858942166b04a8a97151d9b44009a4a~mv2.jpg', aM: 'https://www.saintsfeastfamily.com/copy-of-st-agnes-jan-21-1', aV: '', a_: 'Agnesenplätzchen (St. Agnes Cookies)'},
							{R: 5, aI: 'https://static.wixstatic.com/media/9c2964_9b37a19c3e0d4980aa6de55fcd42a278~mv2.jpg/v1/crop/x_0,y_73,w_871,h_453/fill/w_792,h_412,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_9b37a19c3e0d4980aa6de55fcd42a278~mv2.jpg', aM: 'https://www.saintsfeastfamily.com/copy-of-st-agnes-jan-21-1', aV: '', a_: 'One Hour Yeast Dinner Rolls'},
							{R: 9, aI: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', aM: 'https://www.catholicicing.com/st-agnes-crafts-feast-jan-21/', aV: 'Today, let’s look at some celebrating the feast day of St. Agnes with kids...', a_: 'Celebrating The Feast Day Of St. Agnes With Kids'}
						]),
					aF: 'Saint Agnes'
				}
				])
		},
			{
			H: '23',
			X: _List_fromArray(
				[
					{
					aw: _List_fromArray(
						[
							{R: 4, aI: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', aM: 'https://www.saintsfeastfamily.com/copy-of-st-vincent-jan-22-1', aV: 'Most of what we know about this saint comes from the poet Prudentius. His Acts have been rather freely colored by the imagination of their compiler. But Saint Augustine, in one of his sermons on Saint Vincent, speaks of having the Acts of his martyrdom before him...', a_: 'Saint Vincent of Zaragossa’s Story'},
							{R: 1, aI: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', aM: 'https://www.franciscanmedia.org/saint-of-the-day/saint-vincent-of-zaragossa/', aV: 'Most of what we know about this saint comes from the poet Prudentius. His Acts have been rather freely colored by the imagination of their compiler. But Saint Augustine, in one of his sermons on Saint Vincent, speaks of having the Acts of his martyrdom before him...', a_: 'Saint Vincent of Zaragossa’s Story'},
							{R: 5, aI: 'https://static.wixstatic.com/media/9c2964_e99a3b33dc1744a09e5612ea63da87b2~mv2.jpg/v1/crop/x_0,y_109,w_564,h_466/fill/w_646,h_534,al_c,lg_1,q_80,enc_auto/9c2964_e99a3b33dc1744a09e5612ea63da87b2~mv2.jpg', aM: 'https://www.saintsfeastfamily.com/copy-of-st-vincent-jan-22-1', aV: '', a_: 'Basic Brioche'}
						]),
					aF: 'Saint Vincent of Zaragossa (US)'
				},
					{
					aw: _List_fromArray(
						[
							{R: 4, aI: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', aM: 'https://www.saintsfeastfamily.com/copy-of-st-vincent-jan-22', aV: 'Though leprosy scared off most people in 19th-century Hawaii, that disease sparked great generosity in the woman who came to be known as Mother Marianne of Molokai. Her courage helped tremendously to improve the lives of its victims in Hawaii, a territory annexed to the United States during her lifetime (1898)...', a_: 'Saint Marianne Cope’s Story'},
							{R: 1, aI: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', aM: 'https://www.franciscanmedia.org/saint-of-the-day/saint-marianne-cope/', aV: 'Though leprosy scared off most people in 19th-century Hawaii, that disease sparked great generosity in the woman who came to be known as Mother Marianne of Molokai. Her courage helped tremendously to improve the lives of its victims in Hawaii, a territory annexed to the United States during her lifetime (1898)...', a_: 'Saint Marianne Cope’s Story'},
							{R: 5, aI: 'https://static.wixstatic.com/media/9c2964_1b501eda18be418d9f7b860a84c68bb0~mv2.png/v1/fill/w_610,h_652,al_c,q_90,enc_auto/9c2964_1b501eda18be418d9f7b860a84c68bb0~mv2.png', aM: 'https://www.saintsfeastfamily.com/copy-of-st-vincent-jan-22', aV: '', a_: 'Char Siu'},
							{R: 5, aI: 'https://static.wixstatic.com/media/9c2964_05315e6abad04487bfaa70c5bc4fa9df~mv2.png/v1/crop/x_8,y_73,w_875,h_1088/fill/w_694,h_864,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/2.png', aM: 'https://www.saintsfeastfamily.com/copy-of-st-vincent-jan-22', aV: '', a_: 'Pineapple Upside-Down Cake'}
						]),
					aF: 'Saint Marianne Cope'
				},
					{
					aw: _List_fromArray(
						[
							{R: 4, aI: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', aM: '', aV: '', a_: ''},
							{R: 9, aI: 'https://ik.imagekit.io/catholicstories/ProfileImages/CatholicIcing_z2ZWGMIVq.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1676401159590', aM: 'https://www.catholicicing.com/pro-life-craft-for-kids/', aV: ' Today, let’s look at some celebrating the feast day of St. Agnes with kids...', a_: 'Pro Life Craft for Kids'}
						]),
					aF: 'Day of Prayer for the Legal Protection of Unborn Children'
				}
				])
		},
			{
			H: '24',
			X: _List_fromArray(
				[
					{
					aw: _List_fromArray(
						[
							{R: 4, aI: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', aM: 'https://www.saintsfeastfamily.com/copy-of-st-marianne-cope-jan-23', aV: 'Francis was destined by his father to be a lawyer so that the young man could eventually take his elder’s place as a senator from the province of Savoy in France...', a_: 'Saint Francis de Sales’ Story'},
							{R: 1, aI: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', aM: 'https://www.franciscanmedia.org/saint-of-the-day/saint-francis-de-sales/', aV: 'Francis was destined by his father to be a lawyer so that the young man could eventually take his elder’s place as a senator from the province of Savoy in France...', a_: 'Saint Francis de Sales’ Story'},
							{R: 5, aI: 'https://static.wixstatic.com/media/9c2964_8c3cefd4508241babcfa2f8a3f961e35~mv2.png/v1/fill/w_882,h_538,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/PastedGraphic-25-1.png', aM: 'https://www.saintsfeastfamily.com/copy-of-st-marianne-cope-jan-23', aV: '', a_: 'Piperade'}
						]),
					aF: 'Saint Francis de Sales'
				}
				])
		},
			{
			H: '25',
			X: _List_fromArray(
				[
					{
					aw: _List_fromArray(
						[
							{R: 1, aI: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', aM: 'https://www.franciscanmedia.org/saint-of-the-day/conversion-of-saint-paul/', aV: 'Saint Paul’s entire life can be explained in terms of one experience—his meeting with Jesus on the road to Damascus...', a_: 'The Story of the Conversion of Saint Paul'}
						]),
					aF: 'The Conversion of Saint Paul'
				}
				])
		},
			{
			H: '26',
			X: _List_fromArray(
				[
					{
					aw: _List_fromArray(
						[
							{R: 4, aI: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', aM: 'https://www.saintsfeastfamily.com/copy-of-st-francis-de-sales-jan-24', aV: 'What we know from the New Testament of Timothy’s life makes it sound like that of a modern harried bishop. He had the honor of being a fellow apostle with Paul, both sharing the privilege of preaching the gospel and suffering for it...', a_: 'Saints Timothy and Titus’ Story'},
							{R: 1, aI: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', aM: 'https://www.franciscanmedia.org/saint-of-the-day/saints-timothy-and-titus/', aV: 'What we know from the New Testament of Timothy’s life makes it sound like that of a modern harried bishop. He had the honor of being a fellow apostle with Paul, both sharing the privilege of preaching the gospel and suffering for it...', a_: 'Saints Timothy and Titus’ Story'},
							{R: 5, aI: 'https://static.wixstatic.com/media/9c2964_8c70a07188c5476189c632fc0b989a36~mv2.png/v1/fill/w_354,h_322,al_c,lg_1,q_85,enc_auto/9c2964_8c70a07188c5476189c632fc0b989a36~mv2.png', aM: 'https://www.saintsfeastfamily.com/copy-of-st-francis-de-sales-jan-24', aV: '', a_: 'Ajvar spread for bread'},
							{R: 5, aI: 'https://static.wixstatic.com/media/9c2964_4dc9c528ff98423a9b5d7670a02f51a8~mv2.jpg/v1/crop/x_38,y_0,w_326,h_225/fill/w_456,h_315,al_c,lg_1,q_80,enc_auto/9c2964_4dc9c528ff98423a9b5d7670a02f51a8~mv2.jpg', aM: 'https://www.saintsfeastfamily.com/copy-of-st-francis-de-sales-jan-24', aV: 'Pogacha is a traditional Macedonian round loaf. It\'s usually made for special occasions.', a_: 'Pogacha'},
							{R: 5, aI: 'https://static.wixstatic.com/media/9c2964_366a676ad30645999d174c7fc2e21bcf~mv2.jpg/v1/crop/x_31,y_0,w_571,h_430/fill/w_658,h_496,al_c,lg_1,q_80,enc_auto/9c2964_366a676ad30645999d174c7fc2e21bcf~mv2.jpg', aM: 'https://www.saintsfeastfamily.com/copy-of-st-francis-de-sales-jan-24', aV: '"Potato Stew". Whenever Kompir Mandza is made, the house smells like heaven. The longer this stew cooks, the better.', a_: 'Kompir Mandza'},
							{R: 5, aI: 'https://static.wixstatic.com/media/9c2964_081788385f104b9b95700584391731fa~mv2.png/v1/fill/w_636,h_476,al_c,lg_1,q_85,enc_auto/9c2964_081788385f104b9b95700584391731fa~mv2.png', aM: 'https://www.saintsfeastfamily.com/copy-of-st-francis-de-sales-jan-24', aV: '"Potato Stew". Whenever Kompir Mandza is made, the house smells like heaven. The longer this stew cooks, the better.', a_: 'Vanilici Cookie'}
						]),
					aF: 'Saint Timothy and Titus'
				}
				])
		},
			{
			H: '27',
			X: _List_fromArray(
				[
					{
					aw: _List_fromArray(
						[
							{R: 4, aI: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', aM: 'https://www.saintsfeastfamily.com/copy-of-sts-timothy-titus-jan-26', aV: 'Angela has the double distinction of founding the first teaching congregation of women in the Church and what is now called a “secular institute” of religious women...', a_: 'Saint Angela Merici’s Story'},
							{R: 1, aI: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', aM: 'https://www.franciscanmedia.org/saint-of-the-day/saint-angela-merici/', aV: 'Angela has the double distinction of founding the first teaching congregation of women in the Church and what is now called a “secular institute” of religious women...', a_: 'Saint Angela Merici’s story'},
							{R: 5, aI: 'https://static.wixstatic.com/media/9c2964_b356cd33ce644ca49cfb2a842e9aa5c4~mv2.png/v1/fill/w_608,h_504,al_c,lg_1,q_85,enc_auto/9c2964_b356cd33ce644ca49cfb2a842e9aa5c4~mv2.png', aM: 'https://www.saintsfeastfamily.com/copy-of-sts-timothy-titus-jan-26', aV: '', a_: 'Pasta Bolognese'},
							{R: 5, aI: 'https://static.wixstatic.com/media/9c2964_6d4b21d08edc4f5da37d5aa2f0d1002c~mv2.jpg/v1/fill/w_562,h_374,al_c,lg_1,q_80,enc_auto/9c2964_6d4b21d08edc4f5da37d5aa2f0d1002c~mv2.jpg', aM: 'https://www.saintsfeastfamily.com/copy-of-sts-timothy-titus-jan-26', aV: '', a_: 'Custard'},
							{R: 5, aI: 'https://static.wixstatic.com/media/9c2964_e1b1c426f4cd42d7bfb9f5ec811537bc~mv2.png/v1/crop/x_12,y_0,w_982,h_592/fill/w_981,h_592,al_c,q_90,enc_auto/9c2964_e1b1c426f4cd42d7bfb9f5ec811537bc~mv2.png', aM: 'https://www.saintsfeastfamily.com/copy-of-sts-timothy-titus-jan-26', aV: '', a_: 'Custard filled Dove Puff Pastries'}
						]),
					aF: 'Saint Angela Merici'
				}
				])
		},
			{
			H: '28',
			X: _List_fromArray(
				[
					{
					aw: _List_fromArray(
						[
							{R: 4, aI: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', aM: 'https://www.saintsfeastfamily.com/copy-of-st-angela-merica-jan-27', aV: 'By universal consent, Thomas Aquinas is the preeminent spokesman of the Catholic tradition of reason and of divine revelation. He is one of the great teachers of the medieval Catholic Church, honored with the titles Doctor of the Church and Angelic Doctor...', a_: 'Saint Thomas Aquinas’ Story'},
							{R: 1, aI: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', aM: 'https://www.franciscanmedia.org/saint-of-the-day/saint-thomas-aquinas/', aV: 'By universal consent, Thomas Aquinas is the preeminent spokesman of the Catholic tradition of reason and of divine revelation. He is one of the great teachers of the medieval Catholic Church, honored with the titles Doctor of the Church and Angelic Doctor...', a_: 'Saint Thomas Aquinas’ Story'},
							{R: 5, aI: 'https://static.wixstatic.com/media/9c2964_b8e3d414b6b747e9952fd84de9958f8e~mv2.png/v1/crop/x_0,y_0,w_569,h_468/fill/w_652,h_536,al_c,lg_1,q_85,enc_auto/9c2964_b8e3d414b6b747e9952fd84de9958f8e~mv2.png', aM: 'https://www.saintsfeastfamily.com/copy-of-st-angela-merica-jan-27', aV: '', a_: 'Tiramisu'}
						]),
					aF: 'Saint Thomas Aquinas'
				}
				])
		},
			{
			H: '31',
			X: _List_fromArray(
				[
					{
					aw: _List_fromArray(
						[
							{R: 0, aI: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/YoutubeLogo_YrXRl6n7P.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676253992177', aM: 'https://www.youtube.com/watch?v=wejhGYOGLgE', aV: 'Thomas and his wife Helen guide their children in the ways of holiness by teaching them about the lives of the saints. Here they explore the life of the great apostle of the youth, St. Don Bosco.', a_: 'My Catholic Family - Don Bosco'},
							{R: 1, aI: 'https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960', aM: 'https://www.franciscanmedia.org/saint-of-the-day/saint-john-bosco/', aV: 'John Bosco’s theory of education could well be used in today’s schools. It was a preventive system, rejecting corporal punishment and placing students in surroundings removed from the likelihood of committing sin. He advocated frequent reception of the sacraments of Penance and Holy Communion...', a_: 'Saint John Bosco’s Story'},
							{R: 4, aI: 'https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg', aM: 'https://www.saintsfeastfamily.com/copy-of-st-john-bosco-jan-31', aV: 'John Bosco’s theory of education could well be used in today’s schools. It was a preventive system, rejecting corporal punishment and placing students in surroundings removed from the likelihood of committing sin. He advocated frequent reception of the sacraments of Penance and Holy Communion...', a_: 'Saint John Bosco’s Story'}
						]),
					aF: 'Saint John Bosco'
				}
				])
		}
		]),
	aL: 'jan',
	K: 'January'
};
var $author$project$FeastDayActivities$FeastDays$M07Jul$july = {
	aB: '#b99eda',
	X: _List_fromArray(
		[
			{
			H: '01',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Junipero Serra'}
				])
		},
			{
			H: '03',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Thomas the Apostle'}
				])
		},
			{
			H: '04',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Elizabeth of Portugal (5th in the US)'}
				])
		},
			{
			H: '05',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Anthony Zaccaria'}
				])
		},
			{
			H: '06',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Maria Goretti'}
				])
		},
			{
			H: '09',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Augustine Zhao Rong and Companion'}
				])
		},
			{
			H: '11',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Benedict'}
				])
		},
			{
			H: '13',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Henry'}
				])
		},
			{
			H: '14',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Camillus de Lellis (18th in the US)'},
					{aw: _List_Nil, aF: 'Saint Kateri Tekakwitha'}
				])
		},
			{
			H: '15',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Bonaventure'}
				])
		},
			{
			H: '16',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Our Lady of Mount Carmel'}
				])
		},
			{
			H: '20',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Apollinaris'}
				])
		},
			{
			H: '21',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Lawrence of Brindisi'}
				])
		},
			{
			H: '22',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Mary Magdalene'}
				])
		},
			{
			H: '23',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Bridget of Sweden'}
				])
		},
			{
			H: '24',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Sharbel Makhlūf'}
				])
		},
			{
			H: '25',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint James'}
				])
		},
			{
			H: '29',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saints Martha, Mary and Lazarus'}
				])
		},
			{
			H: '30',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Peter Chrysologus'}
				])
		},
			{
			H: '31',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Ignatius of Loyola'}
				])
		}
		]),
	aL: 'jul',
	K: 'July'
};
var $author$project$FeastDayActivities$FeastDays$M06Jun$june = {
	aB: '#395d73',
	X: _List_fromArray(
		[
			{
			H: '01',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Justin Martyr'}
				])
		},
			{
			H: '02',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saints Marcellinus and Peter'}
				])
		},
			{
			H: '03',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saints Charles Lwanga and Companions'}
				])
		},
			{
			H: '04',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'The Most Holy Trinity'}
				])
		},
			{
			H: '05',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Boniface'}
				])
		},
			{
			H: '06',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Norbert'}
				])
		},
			{
			H: '09',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Ephrem'}
				])
		},
			{
			H: '11',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'The Most Holy Body and Blood of Christ'},
					{aw: _List_Nil, aF: 'Saint Barnabas the Apostle'}
				])
		},
			{
			H: '13',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Anthony of Padua'}
				])
		},
			{
			H: '16',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Sacred Heart of Jesus'}
				])
		},
			{
			H: '17',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Immaculate Heart of Mary'}
				])
		},
			{
			H: '19',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Romuald'}
				])
		},
			{
			H: '21',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Aloysius Gonzaga'}
				])
		},
			{
			H: '22',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Paulinus of Nola'},
					{aw: _List_Nil, aF: 'Saint John Fisher'},
					{aw: _List_Nil, aF: 'Saint Thomas More'}
				])
		},
			{
			H: '24',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Birth of Saint John the Baptist'}
				])
		},
			{
			H: '26',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Josemaría Escrivá'}
				])
		},
			{
			H: '27',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Cyril of Alexandria'}
				])
		},
			{
			H: '28',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Irenaeus'}
				])
		},
			{
			H: '29',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saints Peter and Paul'}
				])
		},
			{
			H: '30',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'First Martyrs of the Church of Rome'}
				])
		}
		]),
	aL: 'jun',
	K: 'June'
};
var $author$project$FeastDayActivities$FeastDays$M03Mar$march = {
	aB: '#b99eda',
	X: _List_fromArray(
		[
			{
			H: '03',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Katharine Drexel'}
				])
		},
			{
			H: '04',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Casimir'}
				])
		},
			{
			H: '07',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saints Perpetua and Felicity'}
				])
		},
			{
			H: '08',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint John of God'}
				])
		},
			{
			H: '09',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Frances of Rome'}
				])
		},
			{
			H: '17',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Patrick'}
				])
		},
			{
			H: '18',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Cyril of Jerusalem'}
				])
		},
			{
			H: '19',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Joseph Husband of the Blessed Virgin Mary'}
				])
		},
			{
			H: '23',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Turibius of Mogrovejo'}
				])
		},
			{
			H: '25',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Annunciation of the Lord'}
				])
		}
		]),
	aL: 'mar',
	K: 'March'
};
var $author$project$FeastDayActivities$FeastDays$M05May$may = {
	aB: '#9de3ec',
	X: _List_fromArray(
		[
			{
			H: '01',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Joseph the Worker'}
				])
		},
			{
			H: '02',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Athanasius'}
				])
		},
			{
			H: '03',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saints Philip and James'}
				])
		},
			{
			H: '10',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Damien de Veuster of Moloka\'i'},
					{aw: _List_Nil, aF: 'Saint John of Ávila'}
				])
		},
			{
			H: '12',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saints Nereus and Achilleus'},
					{aw: _List_Nil, aF: 'Saint Pancras'}
				])
		},
			{
			H: '13',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Our Lady of Fatima'}
				])
		},
			{
			H: '14',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Mattias the Apostle'}
				])
		},
			{
			H: '15',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Isidore'}
				])
		},
			{
			H: '18',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'The Ascension of the Lord (or 21st)'}
				])
		},
			{
			H: '20',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Bernardine of Siena'}
				])
		},
			{
			H: '21',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'The Ascension of the Lord (or 18th)'}
				])
		},
			{
			H: '22',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Rita of Cascia'}
				])
		},
			{
			H: '25',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Bede the Venerable'},
					{aw: _List_Nil, aF: 'Saint Gregory VII'}
				])
		},
			{
			H: '26',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Philip Neri'}
				])
		},
			{
			H: '27',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Augustine of Canterbury'}
				])
		},
			{
			H: '28',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Pentecost Sunday'}
				])
		},
			{
			H: '29',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Blessed Virgin Mary, Mother of the Church'},
					{aw: _List_Nil, aF: 'Saint Paul VI'}
				])
		},
			{
			H: '31',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Visitation of the Blessed Virgin Mary'}
				])
		}
		]),
	aL: 'may',
	K: 'May'
};
var $author$project$FeastDayActivities$FeastDays$M11Nov$november = {
	aB: '#b99eda',
	X: _List_fromArray(
		[
			{
			H: '01',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'All Saints'}
				])
		},
			{
			H: '02',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'All Souls Day'}
				])
		},
			{
			H: '03',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Martin de Porres'}
				])
		},
			{
			H: '04',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Charles Borromeo'}
				])
		},
			{
			H: '09',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Dedication of the Lateran Basilica'}
				])
		},
			{
			H: '10',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Leo the Great'}
				])
		},
			{
			H: '11',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Martin of Tours'}
				])
		},
			{
			H: '12',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Josaphat'}
				])
		},
			{
			H: '13',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Frances Xavier Cabrini'}
				])
		},
			{
			H: '15',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Albert the Great'}
				])
		},
			{
			H: '16',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Margaret of Scotland'},
					{aw: _List_Nil, aF: 'Saint Gertrude the Great'}
				])
		},
			{
			H: '17',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Elizabeth of Hungary'}
				])
		},
			{
			H: '18',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Dedication of the Basilicas of Saints Peter and Paul'},
					{aw: _List_Nil, aF: 'Saint Rose Philippine Duchesne'}
				])
		},
			{
			H: '20',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Our Lord Jesus Christ, King of the Universe - Solemnity'}
				])
		},
			{
			H: '21',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Presentation of the Blessed Virgin Mary'}
				])
		},
			{
			H: '22',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Cecilia'}
				])
		},
			{
			H: '23',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Clement I'},
					{aw: _List_Nil, aF: 'Blessed Miguel Agustín Pro'},
					{aw: _List_Nil, aF: 'Saint Columban'}
				])
		},
			{
			H: '24',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Andrew Dung-Lac, Priest and his Companions'}
				])
		},
			{
			H: '25',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Catherine of Alexandria'}
				])
		},
			{
			H: '30',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Andrew the Apostle'}
				])
		}
		]),
	aL: 'nov',
	K: 'November'
};
var $author$project$FeastDayActivities$FeastDays$M10Oct$october = {
	aB: '#395d73',
	X: _List_fromArray(
		[
			{
			H: '01',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Therese of the Child Jesus'}
				])
		},
			{
			H: '02',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Guardian Angels'}
				])
		},
			{
			H: '04',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Francis of Assisi'}
				])
		},
			{
			H: '05',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Faustina Kowalska'}
				])
		},
			{
			H: '06',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Bruno'},
					{aw: _List_Nil, aF: 'Blessed Marie Rose Durocher'}
				])
		},
			{
			H: '07',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Our Lady of the Rosary'}
				])
		},
			{
			H: '09',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint John Henry Newman'},
					{aw: _List_Nil, aF: 'Saint Denis'},
					{aw: _List_Nil, aF: 'Saint John Leonardi'}
				])
		},
			{
			H: '11',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint John Paul XXIII'}
				])
		},
			{
			H: '14',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Callistus I'}
				])
		},
			{
			H: '15',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Teresa of Jesus'}
				])
		},
			{
			H: '16',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Hedwig'},
					{aw: _List_Nil, aF: 'Saint Margaret Mary Alacoque'}
				])
		},
			{
			H: '17',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Ignatius of Antioch'}
				])
		},
			{
			H: '18',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Luke the Evangelist'}
				])
		},
			{
			H: '19',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saints Jean de Bébeuf, Isaac Jogues, Priests and Martyrs; and their Companions'}
				])
		},
			{
			H: '20',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Paul of the Cross'}
				])
		},
			{
			H: '22',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint John Paul II'}
				])
		},
			{
			H: '23',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint John of Capistrano'}
				])
		},
			{
			H: '24',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Anthony Mary Claret'}
				])
		},
			{
			H: '28',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Simon and Saint Jude'}
				])
		}
		]),
	aL: 'oct',
	K: 'October'
};
var $author$project$FeastDayActivities$FeastDays$M09Sep$september = {
	aB: '#9de3ec',
	X: _List_fromArray(
		[
			{
			H: '03',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Gregory the Great, Pope and Doctor'}
				])
		},
			{
			H: '05',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Mother Teresa of Calcutta'}
				])
		},
			{
			H: '08',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Birth of the Blessed Virgin Mary'}
				])
		},
			{
			H: '09',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Peter Claver'}
				])
		},
			{
			H: '12',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Holy Name of the Blessed Virgin Mary'}
				])
		},
			{
			H: '13',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint John Chrysostom, Bishop and Doctor'}
				])
		},
			{
			H: '14',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Exaltation of the Holy Cross'}
				])
		},
			{
			H: '15',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Our Lady of Sorrows'}
				])
		},
			{
			H: '16',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Cornelius, Pope'},
					{aw: _List_Nil, aF: 'Saint Cyprian, Bishop'}
				])
		},
			{
			H: '17',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Hildegard of Bingen, Virgin and Doctor of the Church'}
				])
		},
			{
			H: '19',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Januarius, Bishop and Martyr'}
				])
		},
			{
			H: '20',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Andrew Kim Tae-gŏn, Priest'},
					{aw: _List_Nil, aF: 'Saint Paul Chŏng Ha-sang, and Companions, Martyrs'}
				])
		},
			{
			H: '21',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Matthew the Evangelist, Apostle'}
				])
		},
			{
			H: '23',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Pio of Pietrelcina, Priest'}
				])
		},
			{
			H: '26',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Cosmas; Saint Damian, Martyrs'}
				])
		},
			{
			H: '27',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Vincent de Paul, Priest'}
				])
		},
			{
			H: '28',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Wenceslaus, Martyr'},
					{aw: _List_Nil, aF: 'Saint Lawrence Ruiz and Companions, Martyrs'}
				])
		},
			{
			H: '29',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saints Michael, Gabriel and Raphael, Archangels'}
				])
		},
			{
			H: '30',
			X: _List_fromArray(
				[
					{aw: _List_Nil, aF: 'Saint Jerome, Priest and Doctor'}
				])
		}
		]),
	aL: 'sep',
	K: 'September'
};
var $author$project$FeastDayActivities$FeastDays$feastDays = _List_fromArray(
	[$author$project$FeastDayActivities$FeastDays$M01Jan$january, $author$project$FeastDayActivities$FeastDays$M02Feb$february, $author$project$FeastDayActivities$FeastDays$M03Mar$march, $author$project$FeastDayActivities$FeastDays$M04Apr$april, $author$project$FeastDayActivities$FeastDays$M05May$may, $author$project$FeastDayActivities$FeastDays$M06Jun$june, $author$project$FeastDayActivities$FeastDays$M07Jul$july, $author$project$FeastDayActivities$FeastDays$M08Aug$august, $author$project$FeastDayActivities$FeastDays$M09Sep$september, $author$project$FeastDayActivities$FeastDays$M10Oct$october, $author$project$FeastDayActivities$FeastDays$M11Nov$november, $author$project$FeastDayActivities$FeastDays$M12Dec$december]);
var $author$project$FeastDayActivities$FeastDays$months = A2(
	$elm$core$List$map,
	function ($) {
		return $.aL;
	},
	$author$project$FeastDayActivities$FeastDays$feastDays);
var $elm$browser$Browser$Navigation$pushUrl = _Browser_pushUrl;
var $elm$url$Url$addPort = F2(
	function (maybePort, starter) {
		if (maybePort.$ === 1) {
			return starter;
		} else {
			var port_ = maybePort.a;
			return starter + (':' + $elm$core$String$fromInt(port_));
		}
	});
var $elm$url$Url$addPrefixed = F3(
	function (prefix, maybeSegment, starter) {
		if (maybeSegment.$ === 1) {
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
		var _v0 = url.ag;
		if (!_v0) {
			return 'http://';
		} else {
			return 'https://';
		}
	}();
	return A3(
		$elm$url$Url$addPrefixed,
		'#',
		url.Y,
		A3(
			$elm$url$Url$addPrefixed,
			'?',
			url.ah,
			_Utils_ap(
				A2(
					$elm$url$Url$addPort,
					url.ad,
					_Utils_ap(http, url._)),
				url.ab)));
};
var $author$project$FeastDayActivities$Main$update = F2(
	function (msg, model) {
		if (!msg.$) {
			var urlRequest = msg.a;
			if (!urlRequest.$) {
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
						model.aL,
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
					{Q: url}),
				$elm$core$Platform$Cmd$none);
		}
	});
var $elm$html$Html$div = _VirtualDom_node('div');
var $author$project$Helpers$headerMargin = 10;
var $elm$url$Url$Parser$State = F5(
	function (visited, unvisited, params, frag, value) {
		return {u: frag, v: params, t: unvisited, p: value, x: visited};
	});
var $elm$url$Url$Parser$getFirstMatch = function (states) {
	getFirstMatch:
	while (true) {
		if (!states.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			var state = states.a;
			var rest = states.b;
			var _v1 = state.t;
			if (!_v1.b) {
				return $elm$core$Maybe$Just(state.p);
			} else {
				if ((_v1.a === '') && (!_v1.b.b)) {
					return $elm$core$Maybe$Just(state.p);
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
		if (maybeList.$ === 1) {
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
			if (dict.$ === -2) {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
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
var $elm$core$Dict$Black = 1;
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var $elm$core$Dict$Red = 0;
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
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
					0,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1) {
				case 0:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
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
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === -1) && (dict.d.$ === -1)) {
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
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.e.d.$ === -1) && (!dict.e.d.a)) {
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
				0,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rlR, rRight));
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
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.d.d.$ === -1) && (!dict.d.d.a)) {
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
				0,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight)));
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
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === -1) && (!left.a)) {
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
				A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === -1) && (right.a === 1)) {
					if (right.d.$ === -1) {
						if (right.d.a === 1) {
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
	if ((dict.$ === -1) && (dict.d.$ === -1)) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor === 1) {
			if ((lLeft.$ === -1) && (!lLeft.a)) {
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
				if (_v4.$ === -1) {
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
		if (dict.$ === -2) {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === -1) && (left.a === 1)) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === -1) && (!lLeft.a)) {
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
						if (_v7.$ === -1) {
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
		if (dict.$ === -1) {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === -1) {
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
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (!_v0.$) {
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
			if (_v2.$ === 1) {
				return dict;
			} else {
				var key = _v2.a;
				var _v3 = $elm$url$Url$percentDecode(rawValue);
				if (_v3.$ === 1) {
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
	if (maybeQuery.$ === 1) {
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
		var parser = _v0;
		return $elm$url$Url$Parser$getFirstMatch(
			parser(
				A5(
					$elm$url$Url$Parser$State,
					_List_Nil,
					$elm$url$Url$Parser$preparePath(url.ab),
					$elm$url$Url$Parser$prepareQuery(url.ah),
					url.Y,
					$elm$core$Basics$identity)));
	});
var $author$project$FeastDayActivities$FeastDayHelpers$Date = $elm$core$Basics$identity;
var $elm$url$Url$Parser$Parser = $elm$core$Basics$identity;
var $elm$url$Url$Parser$mapState = F2(
	function (func, _v0) {
		var visited = _v0.x;
		var unvisited = _v0.t;
		var params = _v0.v;
		var frag = _v0.u;
		var value = _v0.p;
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
		var parseArg = _v0;
		return function (_v1) {
			var visited = _v1.x;
			var unvisited = _v1.t;
			var params = _v1.v;
			var frag = _v1.u;
			var value = _v1.p;
			return A2(
				$elm$core$List$map,
				$elm$url$Url$Parser$mapState(value),
				parseArg(
					A5($elm$url$Url$Parser$State, visited, unvisited, params, frag, subValue)));
		};
	});
var $elm$url$Url$Parser$query = function (_v0) {
	var queryParser = _v0;
	return function (_v1) {
		var visited = _v1.x;
		var unvisited = _v1.t;
		var params = _v1.v;
		var frag = _v1.u;
		var value = _v1.p;
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
	};
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
		var parseBefore = _v0;
		var parseAfter = _v1;
		return function (state) {
			return A2(
				$elm$core$List$concatMap,
				parseAfter,
				parseBefore(state));
		};
	});
var $elm$url$Url$Parser$questionMark = F2(
	function (parser, queryParser) {
		return A2(
			$elm$url$Url$Parser$slash,
			parser,
			$elm$url$Url$Parser$query(queryParser));
	});
var $elm$url$Url$Parser$s = function (str) {
	return function (_v0) {
		var visited = _v0.x;
		var unvisited = _v0.t;
		var params = _v0.v;
		var frag = _v0.u;
		var value = _v0.p;
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
	};
};
var $elm$url$Url$Parser$Internal$Parser = $elm$core$Basics$identity;
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $elm$url$Url$Parser$Query$custom = F2(
	function (key, func) {
		return function (dict) {
			return func(
				A2(
					$elm$core$Maybe$withDefault,
					_List_Nil,
					A2($elm$core$Dict$get, key, dict)));
		};
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
			return {H: d, K: m};
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
	return {$: 3, a: a};
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
	return {$: 0, a: a};
};
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$virtual_dom$VirtualDom$MayPreventDefault = function (a) {
	return {$: 2, a: a};
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
	return {$: 1, a: a};
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
		case 0:
			var key = attribute.a;
			var value = attribute.b;
			return A2($elm$html$Html$Attributes$attribute, key, value);
		case 1:
			var key = attribute.a;
			var value = attribute.b;
			return A2(
				$elm$html$Html$Attributes$property,
				key,
				$elm$json$Json$Encode$string(value));
		case 2:
			var key = attribute.a;
			var value = attribute.b;
			return A2(
				$elm$html$Html$Attributes$property,
				key,
				$elm$json$Json$Encode$bool(value));
		case 3:
			var key = attribute.a;
			var value = attribute.b;
			return A2($elm$html$Html$Attributes$property, key, value);
		case 4:
			var key = attribute.a;
			var value = attribute.b;
			return A2($elm$html$Html$Attributes$style, key, value);
		default:
			switch (attribute.b.$) {
				case 0:
					var name = attribute.a;
					var d = attribute.b.a;
					return A2($elm$html$Html$Events$on, name, d);
				case 1:
					var name = attribute.a;
					var d = attribute.b.a;
					return A2($elm$html$Html$Events$stopPropagationOn, name, d);
				case 2:
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
	if (!node.$) {
		var tagName = node.a;
		var attributes = node.b;
		var children = node.c;
		switch (children.$) {
			case 0:
				return A3(
					$elm$html$Html$node,
					tagName,
					A2($elm$core$List$map, $zwilias$elm_html_string$Html$Types$attributeToHtml, attributes),
					_List_Nil);
			case 1:
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
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $elm$html$Html$h1 = _VirtualDom_node('h1');
var $author$project$FeastDayActivities$FeastDayHelpers$filterActivities = F2(
	function (isFilterType, activities) {
		return A2(
			$elm$core$List$concatMap,
			function (activity) {
				return isFilterType(activity.R) ? _List_fromArray(
					[activity]) : _List_Nil;
			},
			activities);
	});
var $author$project$FeastDayActivities$FeastDayHelpers$audioActivities = function (activities) {
	return A2(
		$author$project$FeastDayActivities$FeastDayHelpers$filterActivities,
		function (activityType) {
			return activityType === 1;
		},
		activities);
};
var $author$project$FeastDayActivities$FeastDayHelpers$bookActivities = function (activities) {
	return A2(
		$author$project$FeastDayActivities$FeastDayHelpers$filterActivities,
		function (activityType) {
			return activityType === 7;
		},
		activities);
};
var $author$project$FeastDayActivities$FeastDayHelpers$craftActivities = function (activities) {
	return A2(
		$author$project$FeastDayActivities$FeastDayHelpers$filterActivities,
		function (activityType) {
			return activityType === 8;
		},
		activities);
};
var $author$project$FeastDayActivities$FeastDayHelpers$foodActivities = function (activities) {
	return A2(
		$author$project$FeastDayActivities$FeastDayHelpers$filterActivities,
		function (activityType) {
			return activityType === 5;
		},
		activities);
};
var $author$project$FeastDayActivities$FeastDayHelpers$gameActivities = function (activities) {
	return A2(
		$author$project$FeastDayActivities$FeastDayHelpers$filterActivities,
		function (activityType) {
			return activityType === 6;
		},
		activities);
};
var $author$project$FeastDayActivities$FeastDayHelpers$imageActivities = function (activities) {
	return A2(
		$author$project$FeastDayActivities$FeastDayHelpers$filterActivities,
		function (activityType) {
			return activityType === 2;
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
			return activityType === 9;
		},
		activities);
};
var $author$project$FeastDayActivities$FeastDayHelpers$printoutActivities = function (activities) {
	return A2(
		$author$project$FeastDayActivities$FeastDayHelpers$filterActivities,
		function (activityType) {
			return activityType === 3;
		},
		activities);
};
var $author$project$FeastDayActivities$FeastDayHelpers$readingActivities = function (activities) {
	return A2(
		$author$project$FeastDayActivities$FeastDayHelpers$filterActivities,
		function (activityType) {
			return activityType === 4;
		},
		activities);
};
var $author$project$FeastDayActivities$FeastDayHelpers$videoActivities = function (activities) {
	return A2(
		$author$project$FeastDayActivities$FeastDayHelpers$filterActivities,
		function (activityType) {
			return !activityType;
		},
		activities);
};
var $elm$html$Html$h3 = _VirtualDom_node('h3');
var $elm$html$Html$span = _VirtualDom_node('span');
var $elm$html$Html$a = _VirtualDom_node('a');
var $elm$html$Html$h4 = _VirtualDom_node('h4');
var $elm$html$Html$Attributes$href = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
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
				$elm$html$Html$Attributes$href(activity.aM),
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
						$elm$html$Html$Attributes$src(activity.aI),
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
								$elm$html$Html$text(activity.a_)
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-left')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(activity.aV)
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
						$elm$html$Html$Attributes$src(video.aM),
						$elm$html$Html$Attributes$title(video.a_),
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
	return A2($elm$core$String$contains, 'embed', video.aM) ? $author$project$FeastDayActivities$Main$viewEmbeddedVideo(video) : $author$project$FeastDayActivities$Main$viewActivity(video);
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
			return $.aw;
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
				return $.aF;
			},
			feasts));
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('grid m-auto max-w-2xl'),
				$elm$html$Html$Attributes$class('text-center')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h2,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('text-2xl')
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
					$elm$html$Html$Attributes$class('mt-10')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$h1,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('capitalize')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(month + (' ' + date))
						])),
					$author$project$FeastDayActivities$Main$viewFeastDayHeader(feasts),
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
var $author$project$FeastDayActivities$Main$urlPath = '/feastdayactivities';
var $author$project$FeastDayActivities$Main$viewFeast = function (feastActivities) {
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				$elm$html$Html$text(feastActivities.aF)
			]));
};
var $author$project$FeastDayActivities$Main$viewFeastDay = F2(
	function (month, feastDay) {
		var link = $author$project$FeastDayActivities$Main$urlPath + ('?m=' + (month + ('&d=' + feastDay.H)));
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
									$elm$html$Html$text(feastDay.H)
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('justify-self-start')
								]),
							A2($elm$core$List$map, $author$project$FeastDayActivities$Main$viewFeast, feastDay.X))
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
				$elm$html$Html$Attributes$href($author$project$FeastDayActivities$Main$urlPath + ('?m=' + month))
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(month)
			]));
};
var $author$project$FeastDayActivities$Main$viewMonth = function (feastMonth) {
	var _v0 = $author$project$FeastDayActivities$FeastDayHelpers$splitList(feastMonth.X);
	var firstHalf = _v0.a;
	var secondHalf = _v0.b;
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('mt-10 mb-20')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h1,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('text-center')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('2023 Feast Day Activities')
					])),
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
						A2($author$project$FeastDayActivities$Main$viewFeastMonthHeader, feastMonth.aB, feastMonth.K),
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
								A2($author$project$FeastDayActivities$Main$viewFeastDays, feastMonth.aL, firstHalf),
								A2($author$project$FeastDayActivities$Main$viewFeastDays, feastMonth.aL, secondHalf)
							]))
					]))
			]));
};
var $author$project$FeastDayActivities$Main$viewBody = function (route) {
	if (!route.$) {
		var date = route.a;
		var _v1 = _Utils_Tuple2(date.K, date.H);
		if (!_v1.a.$) {
			if (!_v1.b.$) {
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
									return $.X;
								},
								A2(
									$elm$core$List$filter,
									function (feastDay) {
										return _Utils_eq(
											$elm$core$String$toLower(feastDay.H),
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
														$elm$core$String$toLower(feastDay.aL),
														$elm$core$String$toLower(m));
												},
												$author$project$FeastDayActivities$FeastDays$feastDays))).X)))));
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
										$elm$core$String$toLower(feastDay.aL),
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
var $zwilias$elm_html_string$Html$Types$Node = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $zwilias$elm_html_string$Html$Types$Regular = function (a) {
	return {$: 1, a: a};
};
var $zwilias$elm_html_string$Html$String$node = F3(
	function (tag, attributes, children) {
		return A3(
			$zwilias$elm_html_string$Html$Types$Node,
			tag,
			attributes,
			$zwilias$elm_html_string$Html$Types$Regular(children));
	});
var $zwilias$elm_html_string$Html$String$footer = $zwilias$elm_html_string$Html$String$node('footer');
var $zwilias$elm_html_string$Html$String$p = $zwilias$elm_html_string$Html$String$node('p');
var $zwilias$elm_html_string$Html$Types$Style = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $zwilias$elm_html_string$Html$String$Attributes$style = $zwilias$elm_html_string$Html$Types$Style;
var $zwilias$elm_html_string$Html$Types$TextNode = function (a) {
	return {$: 1, a: a};
};
var $zwilias$elm_html_string$Html$String$text = $zwilias$elm_html_string$Html$Types$TextNode;
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
var $zwilias$elm_html_string$Html$Types$StringProperty = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $zwilias$elm_html_string$Html$String$Attributes$stringProperty = $zwilias$elm_html_string$Html$Types$StringProperty;
var $zwilias$elm_html_string$Html$String$Attributes$class = function (className) {
	return A2($zwilias$elm_html_string$Html$String$Attributes$stringProperty, 'className', className);
};
var $zwilias$elm_html_string$Html$String$header = $zwilias$elm_html_string$Html$String$node('header');
var $zwilias$elm_html_string$Html$String$nav = $zwilias$elm_html_string$Html$String$node('nav');
var $zwilias$elm_html_string$Html$String$a = $zwilias$elm_html_string$Html$String$node('a');
var $zwilias$elm_html_string$Html$Types$Attribute = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $zwilias$elm_html_string$Html$String$Attributes$attribute = $zwilias$elm_html_string$Html$Types$Attribute;
var $zwilias$elm_html_string$Html$String$Attributes$href = function (val) {
	return A2($zwilias$elm_html_string$Html$String$Attributes$stringProperty, 'href', val);
};
var $author$project$Header$viewNavButton = F3(
	function (height, link, page) {
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
					A2($zwilias$elm_html_string$Html$String$Attributes$style, 'height', height),
					$zwilias$elm_html_string$Html$String$Attributes$class('w-full'),
					A2($zwilias$elm_html_string$Html$String$Attributes$attribute, 'aria-label', page)
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
				$zwilias$elm_html_string$Html$String$Attributes$class('h-full w-full grid grid-cols-5 content-center justify-items-center')
			]),
		_List_fromArray(
			[
				A3($author$project$Header$viewNavButton, height, '/team', 'About Us'),
				A3($author$project$Header$viewNavButton, height, '/animations', 'Animations'),
				A3($author$project$Header$viewNavButton, height, '/contact', 'Contact'),
				A3($author$project$Header$viewNavButton, height, '/newsroom', 'Newsroom'),
				A3($author$project$Header$viewNavButton, height, '/give', 'Give')
			]));
};
var $zwilias$elm_html_string$Html$String$div = $zwilias$elm_html_string$Html$String$node('div');
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
var $zwilias$elm_html_string$Html$String$Attributes$alt = function (val) {
	return A2($zwilias$elm_html_string$Html$String$Attributes$stringProperty, 'alt', val);
};
var $zwilias$elm_html_string$Html$Types$NoChildren = {$: 0};
var $zwilias$elm_html_string$Html$String$nodeWithoutChildren = F3(
	function (tag, attrs, _v0) {
		return A3($zwilias$elm_html_string$Html$Types$Node, tag, attrs, $zwilias$elm_html_string$Html$Types$NoChildren);
	});
var $zwilias$elm_html_string$Html$String$img = $zwilias$elm_html_string$Html$String$nodeWithoutChildren('img');
var $zwilias$elm_html_string$Html$String$Attributes$src = function (val) {
	return A2($zwilias$elm_html_string$Html$String$Attributes$stringProperty, 'src', val);
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
		var _v0 = isHomePage ? _Utils_Tuple3('111px', $author$project$Header$navigation, 'grid-cols-[150px_1fr_150px] lg:grid-cols-[150px_1fr_600px]') : _Utils_Tuple3('48px', $author$project$Header$navigation, 'grid-cols-[150px_1fr_150px] lg:grid-cols-[150px_1fr_600px]');
		var height = _v0.a;
		var rightHandSide = _v0.b;
		var gridColsClass = _v0.c;
		return A2(
			$zwilias$elm_html_string$Html$String$header,
			_List_fromArray(
				[
					A2($zwilias$elm_html_string$Html$String$Attributes$style, 'background-color', '#3d5d75'),
					A2($zwilias$elm_html_string$Html$String$Attributes$style, 'background-image', 'linear-gradient(130deg, #9DE2EB , #EBD6F1)'),
					A2($zwilias$elm_html_string$Html$String$Attributes$style, 'height', height),
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
	var currentRoute = $author$project$FeastDayActivities$FeastDayHelpers$parseRoute(model.Q);
	return {
		az: _List_fromArray(
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
		a_: 'Feast Day Activities - Catholic Stories for Children'
	};
};
var $author$project$FeastDayActivities$Main$main = $elm$browser$Browser$application(
	{aK: $author$project$FeastDayActivities$Main$init, aP: $author$project$FeastDayActivities$Main$UrlChanged, aQ: $author$project$FeastDayActivities$Main$LinkClicked, aY: $author$project$FeastDayActivities$Main$subscriptions, a$: $author$project$FeastDayActivities$Main$update, a0: $author$project$FeastDayActivities$Main$view});
_Platform_export({'FeastDayActivities':{'Main':{'init':$author$project$FeastDayActivities$Main$main(
	$elm$json$Json$Decode$succeed(0))(0)}}});}(this));