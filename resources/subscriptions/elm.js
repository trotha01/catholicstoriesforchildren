!function(R){"use strict";function T(n,r,t){return t.a=n,t.f=r,t}function e(t){return T(2,t,function(r){return function(n){return t(r,n)}})}function r(e){return T(3,e,function(t){return function(r){return function(n){return e(t,r,n)}}})}function n(a){return T(4,a,function(e){return function(t){return function(r){return function(n){return a(e,t,r,n)}}}})}function z(i){return T(5,i,function(a){return function(e){return function(t){return function(r){return function(n){return i(a,e,t,r,n)}}}}})}function B(u){return T(7,u,function(o){return function(i){return function(a){return function(e){return function(t){return function(r){return function(n){return u(o,i,a,e,t,r,n)}}}}}}})}function l(n,r,t){return 2===n.a?n.f(r,t):n(r)(t)}function s(n,r,t,e){return 3===n.a?n.f(r,t,e):n(r)(t)(e)}function d(n,r,t,e,a){return 4===n.a?n.f(r,t,e,a):n(r)(t)(e)(a)}function b(n,r,t,e,a,i){return 5===n.a?n.f(r,t,e,a,i):n(r)(t)(e)(a)(i)}function P(n,r,t,e,a,i,o,u){return 7===n.a?n.f(r,t,e,a,i,o,u):n(r)(t)(e)(a)(i)(o)(u)}var v={$:0};function q(n,r){return{$:1,a:n,b:r}}var O=e(q);function p(n){for(var r=v,t=n.length;t--;)r={$:1,a:n[t],b:r};return r}var t=r(function(n,r,t){for(var e=Array(n),a=0;a<n;a++)e[a]=t(r+a);return e}),K=e(function(n,r){for(var t=Array(n),e=0;e<n&&r.b;e++)t[e]=r.a,r=r.b;return t.length=e,{a:t,b:r}});function D(n){throw Error("https://github.com/elm/core/blob/1.0.0/hints/"+n+".md")}function H(n,r){for(var t,e=[],a=J(n,r,0,e);a&&(t=e.pop());a=J(t.a,t.b,0,e));return a}function J(n,r,t,e){if(n!==r){if("object"!=typeof n||null===n||null===r)return"function"==typeof n&&D(5),!1;if(100<t)e.push({a:n,b:r});else for(var a in n.$<0&&(n=Tr(n),r=Tr(r)),n)if(!J(n[a],r[a],t+1,e))return!1}return!0}function f(n,r,t){if("object"!=typeof n)return n===r?0:n<r?-1:1;if(void 0===n.$)return(t=(t=f(n.a,r.a))||f(n.b,r.b))||f(n.c,r.c);for(;n.b&&r.b&&!(t=f(n.a,r.a));n=n.b,r=r.b);return t||(n.b?1:r.b?-1:0)}var X=e(function(n,r){n=f(n,r);return n<0?Nr:n?zr:Sr}),W=0;function Z(n,r){var t,e={};for(t in n)e[t]=n[t];for(t in r)e[t]=r[t];return e}function U(n,r){if("string"==typeof n)return n+r;if(!n.b)return r;var t={$:1,a:n.a,b:r};n=n.b;for(var e=t;n.b;n=n.b)e=e.b={$:1,a:n.a,b:r};return t}var Y=Math.ceil,Q=Math.floor,V=Math.log;var nn=e(function(n,r){return!!~r.indexOf(n)});var rn={$:2,b:function(n){return"number"!=typeof n||(n<=-2147483647||2147483647<=n||(0|n)!==n)&&(!isFinite(n)||n%1)?g("an INT",n):k(n)}},tn={$:2,b:function(n){return"string"==typeof n?k(n):n instanceof String?k(n+""):g("a STRING",n)}};var en=e(function(n,r){return{$:6,d:n,b:r}});var an=e(function(n,r){return{$:10,b:r,h:n}});var on=e(function(n,r){return{$:9,f:n,g:[r]}}),un=e(h);function h(n,r){switch(n.$){case 2:return n.b(r);case 5:return null===r?k(n.c):g("null",r);case 3:return fn(r)?cn(n.b,r,p):g("a LIST",r);case 4:return fn(r)?cn(n.b,r,sn):g("an ARRAY",r);case 6:var t=n.d;return"object"==typeof r&&null!==r&&t in r?(i=h(n.b,r[t]),_(i)?i:y(l(Pr,t,i.a))):g("an OBJECT with a field named `"+t+"`",r);case 7:t=n.e;return fn(r)?t<r.length?(i=h(n.b,r[t]),_(i)?i:y(l(qr,t,i.a))):g("a LONGER array. Need index "+t+" but only see "+r.length+" entries",r):g("an ARRAY",r);case 8:if("object"!=typeof r||null===r||fn(r))return g("an OBJECT",r);var e,a=v;for(e in r)if(r.hasOwnProperty(e)){var i=h(n.b,r[e]);if(!_(i))return y(l(Pr,e,i.a));a={$:1,a:{a:e,b:i.a},b:a}}return k(Xr(a));case 9:for(var o=n.f,u=n.g,c=0;c<u.length;c++){i=h(u[c],r);if(!_(i))return i;o=o(i.a)}return k(o);case 10:i=h(n.b,r);return _(i)?h(n.h(i.a),r):i;case 11:for(var f=v,s=n.g;s.b;s=s.b){i=h(s.a,r);if(_(i))return i;f={$:1,a:i.a,b:f}}return y(Or(Xr(f)));case 1:return y(l(Br,n.a,r));case 0:return k(n.a)}}function cn(n,r,t){for(var e=r.length,a=Array(e),i=0;i<e;i++){var o=h(n,r[i]);if(!_(o))return y(l(qr,i,o.a));a[i]=o.a}return k(t(a))}function fn(n){return Array.isArray(n)||"undefined"!=typeof FileList&&n instanceof FileList}function sn(r){return l(ft,r.length,function(n){return r[n]})}function g(n,r){return y(l(Br,"Expecting "+n,r))}function ln(n,r){if(n===r)return!0;if(n.$!==r.$)return!1;switch(n.$){case 0:case 1:return n.a===r.a;case 2:return n.b===r.b;case 5:return n.c===r.c;case 3:case 4:case 8:return ln(n.b,r.b);case 6:return n.d===r.d&&ln(n.b,r.b);case 7:return n.e===r.e&&ln(n.b,r.b);case 9:return n.f===r.f&&dn(n.g,r.g);case 10:return n.h===r.h&&ln(n.b,r.b);case 11:return dn(n.g,r.g)}}function dn(n,r){var t=n.length;if(t!==r.length)return!1;for(var e=0;e<t;e++)if(!ln(n[e],r[e]))return!1;return!0}var bn=e(function(n,r){return JSON.stringify(r,null,n)+""});function vn(n){return n}var pn=r(function(n,r,t){return t[n]=r,t});function hn(n){return{$:0,a:n}}var gn=e(function(n,r){return{$:3,b:n,d:r}});var $n=0;function mn(n){n={$:0,e:$n++,f:n,g:null,h:[]};return An(n),n}function xn(r){return{$:2,b:function(n){n({$:0,a:mn(r)})},c:null}}function yn(n,r){n.h.push(r),An(n)}var kn=e(function(r,t){return{$:2,b:function(n){yn(r,t),n({$:0,a:W})},c:null}});var wn=!1,_n=[];function An(n){if(_n.push(n),!wn){for(wn=!0;n=_n.shift();)!function(r){for(;r.f;){var n=r.f.$;if(0===n||1===n){for(;r.g&&r.g.$!==n;)r.g=r.g.i;if(!r.g)return;r.f=r.g.b(r.f.a),r.g=r.g.i}else{if(2===n)return r.f.c=r.f.b(function(n){r.f=n,An(r)});if(5===n){if(0===r.h.length)return;r.f=r.f.b(r.h.shift())}else r.g={$:3===n?0:1,b:r.f.b,i:r.g},r.f=r.f.d}}}(n);wn=!1}}function Cn(n,r,t,e,a,i){var n=l(un,n,r?r.flags:void 0),o=(_(n)||D(2),{}),r=t(n.a),u=r.a,c=i(f,u),t=function(n,r){var t,e;for(e in $){var a=$[e];a.a&&((t=t||{})[e]=a.a(e,r)),n[e]=function(n,r){var e={g:r,h:void 0},a=n.c,i=n.d,o=n.e,u=n.f;function c(t){return l(gn,c,{$:5,b:function(n){var r=n.a;return 0===n.$?s(i,e,r,t):o&&u?d(a,e,r.i,r.j,t):s(a,e,o?r.i:r.j,t)}})}return e.h=mn(l(gn,c,n.b))}(a,r)}return t}(o,f);function f(n,r){n=l(e,n,u);c(u=n.a,r),Sn(o,n.b,a(u))}return Sn(o,r.b,a(u)),t?{ports:t}:{}}var $={};var jn=e(function(r,t){return{$:2,b:function(n){r.g(t),n({$:0,a:W})},c:null}}),En=e(function(n,r){return l(kn,n.h,{$:0,a:r})});function Mn(r){return function(n){return{$:1,k:r,l:n}}}function Ln(n){return{$:2,m:n}}var Fn=e(function(n,r){return{$:3,n:n,o:r}}),In=[],Gn=!1;function Sn(n,r,t){if(In.push({p:n,q:r,r:t}),!Gn){Gn=!0;for(var e;e=In.shift();)!function(n,r,t){var e,a={};for(e in Nn(!0,r,a,null),Nn(!1,t,a,null),n)yn(n[e],{$:"fx",a:a[e]||{i:v,j:v}})}(e.p,e.q,e.r);Gn=!1}}function Nn(n,r,t,e){switch(r.$){case 1:var a=r.k,i=function(n,r,t,e){function a(n){for(var r=t;r;r=r.t)n=r.s(n);return n}return l(n?$[r].e:$[r].f,a,e)}(n,a,e,r.l);return void(t[a]=function(n,r,t){return t=t||{i:v,j:v},n?t.i={$:1,a:r,b:t.i}:t.j={$:1,a:r,b:t.j},t}(n,i,t[a]));case 2:for(var o=r.m;o.b;o=o.b)Nn(n,o.a,t,e);return;case 3:Nn(n,r.o,t,{s:r.n,t:e})}}function Rn(n){$[n]&&D(3)}var Tn=e(function(n,r){return r});function zn(n){var t,o=[],u=$[n].u,c=(t=0,{$:2,b:function(n){var r=setTimeout(function(){n({$:0,a:W})},t);return function(){clearTimeout(r)}},c:null});return $[n].b=c,$[n].c=r(function(n,r,t){for(;r.b;r=r.b)for(var e=o,a=u(r.a),i=0;i<e.length;i++)e[i](a);return c}),{subscribe:function(n){o.push(n)},unsubscribe:function(n){(n=(o=o.slice()).indexOf(n))<0||o.splice(n,1)}}}var Bn;var Pn="undefined"!=typeof document?document:{};function qn(n){return{$:0,a:n}}var On=e(function(i,o){return e(function(n,r){for(var t=[],e=0;r.b;r=r.b){var a=r.a;e+=a.b||0,t.push(a)}return e+=t.length,{$:1,c:o,d:Zn(n),e:t,f:i,b:e}})}),c=On(void 0);e(function(i,o){return e(function(n,r){for(var t=[],e=0;r.b;r=r.b){var a=r.a;e+=a.b.b||0,t.push(a)}return e+=t.length,{$:2,c:o,d:Zn(n),e:t,f:i,b:e}})})(void 0);var Kn=e(function(n,r){return{$:4,j:n,k:r,b:1+(r.b||0)}});var Dn=e(function(n,r){return{$:"a0",n:n,o:r}}),Hn=e(function(n,r){return{$:"a1",n:n,o:r}}),Jn=e(function(n,r){return{$:"a2",n:n,o:r}}),m=e(function(n,r){return{$:"a3",n:n,o:r}});function Xn(n){return/^\s*(javascript:|data:text\/html)/i.test(n)?"":n}var Wn;function Zn(n){for(var r={};n.b;n=n.b){var t,e=n.a,a=e.$,i=e.n,e=e.o;"a2"===a?"className"===i?Un(r,i,e):r[i]=e:(t=r[a]||(r[a]={}),"a3"===a&&"class"===i?Un(t,i,e):t[i]=e)}return r}function Un(n,r,t){var e=n[r];n[r]=e?e+" "+t:t}function x(n,r){var t=n.$;if(5===t)return x(n.k||(n.k=n.m()),r);if(0===t)return Pn.createTextNode(n.a);if(4===t){for(var e=n.k,a=n.j;4===e.$;)"object"!=typeof a?a=[a,e.j]:a.push(e.j),e=e.k;var i={j:a,p:r};(o=x(e,i)).elm_event_node_ref=i}else if(3===t)Yn(o=n.h(n.g),r,n.d);else{var o=n.f?Pn.createElementNS(n.f,n.c):Pn.createElement(n.c);Bn&&"a"==n.c&&o.addEventListener("click",Bn(o)),Yn(o,r,n.d);for(var u=n.e,c=0;c<u.length;c++)o.appendChild(x(1===t?u[c]:u[c].b,r))}return o}function Yn(n,r,t){for(var e in t){var a=t[e];"a1"===e?function(n,r){var t,e=n.style;for(t in r)e[t]=r[t]}(n,a):"a0"===e?function(n,r,t){var e,a=n.elmFs||(n.elmFs={});for(e in t){var i=t[e],o=a[e];if(i){if(o){if(o.q.$===i.$){o.q=i;continue}n.removeEventListener(e,o)}o=function(c,n){function f(n){var r=f.q,t=h(r.a,n);if(_(t)){for(var e,r=dt(r),t=t.a,a=r?r<3?t.a:t.r:t,i=1==r?t.b:3==r&&t.S,o=(i&&n.stopPropagation(),(2==r?t.b:3==r&&t.P)&&n.preventDefault(),c);e=o.j;){if("function"==typeof e)a=e(a);else for(var u=e.length;u--;)a=e[u](a);o=o.p}o(a,i)}}return f.q=n,f}(r,i),n.addEventListener(e,o,Wn&&{passive:dt(i)<2}),a[e]=o}else n.removeEventListener(e,o),a[e]=void 0}}(n,r,a):"a3"===e?function(n,r){for(var t in r){var e=r[t];void 0!==e?n.setAttribute(t,e):n.removeAttribute(t)}}(n,a):"a4"===e?function(n,r){for(var t in r){var e=r[t],a=e.f,e=e.o;void 0!==e?n.setAttributeNS(a,t,e):n.removeAttributeNS(a,t)}}(n,a):("value"!==e&&"checked"!==e||n[e]!==a)&&(n[e]=a)}}try{window.addEventListener("t",null,Object.defineProperty({},"passive",{get:function(){Wn=!0}}))}catch(n){}function Qn(n,r){var t=[];return L(n,r,t,0),t}function M(n,r,t,e){r={$:r,r:t,s:e,t:void 0,u:void 0};return n.push(r),r}function L(n,r,t,e){if(n!==r){var a=n.$,i=r.$;if(a!==i){if(1!==a||2!==i)return void M(t,0,e,r);r=function(n){for(var r=n.e,t=r.length,e=Array(t),a=0;a<t;a++)e[a]=r[a].b;return{$:1,c:n.c,d:n.d,e:e,f:n.f,b:n.b}}(r),i=1}switch(i){case 5:for(var o=n.l,u=r.l,c=o.length,f=c===u.length;f&&c--;)f=o[c]===u[c];if(f)return void(r.k=n.k);r.k=r.m();var s=[];return L(n.k,r.k,s,0),void(0<s.length&&M(t,1,e,s));case 4:for(var l=n.j,d=r.j,b=!1,v=n.k;4===v.$;)b=!0,"object"!=typeof l?l=[l,v.j]:l.push(v.j),v=v.k;for(var p=r.k;4===p.$;)b=!0,"object"!=typeof d?d=[d,p.j]:d.push(p.j),p=p.k;return b&&l.length!==d.length?void M(t,0,e,r):((b?function(n,r){for(var t=0;t<n.length;t++)if(n[t]!==r[t])return;return 1}(l,d):l===d)||M(t,2,e,d),void L(v,p,t,e+1));case 0:return void(n.a!==r.a&&M(t,3,e,r.a));case 1:return void Vn(n,r,t,e,rr);case 2:return void Vn(n,r,t,e,tr);case 3:if(n.h!==r.h)return void M(t,0,e,r);s=nr(n.d,r.d),s=(s&&M(t,4,e,s),r.i(n.g,r.g));s&&M(t,5,e,s)}}}function Vn(n,r,t,e,a){var i;n.c!==r.c||n.f!==r.f?M(t,0,e,r):((i=nr(n.d,r.d))&&M(t,4,e,i),a(n,r,t,e))}function nr(n,r,t){var e,a,i,o,u;for(a in n)"a1"===a||"a0"===a||"a3"===a||"a4"===a?(i=nr(n[a],r[a]||{},a))&&((e=e||{})[a]=i):a in r?(i=n[a])===(o=r[a])&&"value"!==a&&"checked"!==a||"a0"===t&&function(n,r){return n.$==r.$&&ln(n.a,r.a)}(i,o)||((e=e||{})[a]=o):(e=e||{})[a]=t?"a1"===t?"":"a0"===t||"a3"===t?void 0:{f:n[a].f,o:void 0}:"string"==typeof n[a]?"":null;for(u in r)u in n||((e=e||{})[u]=r[u]);return e}function rr(n,r,t,e){var a=n.e,i=r.e,n=a.length,r=i.length;r<n?M(t,6,e,{v:r,i:n-r}):n<r&&M(t,7,e,{v:n,e:i});for(var o=n<r?n:r,u=0;u<o;u++){var c=a[u];L(c,i[u],t,++e),e+=c.b||0}}function tr(n,r,t,e){for(var a=[],i={},o=[],u=n.e,c=r.e,f=u.length,s=c.length,l=0,d=0,b=e;l<f&&d<s;){var v=u[l],p=c[d],h=v.a,g=p.a,$=v.b,m=p.b,x=void 0,y=void 0;if(h===g)L($,m,a,++b),b+=$.b||0,l++,d++;else{var k,w,_,A,C=u[l+1],j=c[d+1];if(C&&(w=C.b,y=g===(k=C.a)),j&&(A=j.b,x=h===(_=j.a)),x&&y)L($,A,a,++b),ar(i,a,h,m,d,o),b+=$.b||0,ir(i,a,h,w,++b),b+=w.b||0,l+=2,d+=2;else if(x)b++,ar(i,a,g,m,d,o),L($,A,a,b),b+=$.b||0,l+=1,d+=2;else if(y)ir(i,a,h,$,++b),b+=$.b||0,L(w,m,a,++b),b+=w.b||0,l+=2,d+=1;else{if(!C||k!==_)break;ir(i,a,h,$,++b),ar(i,a,g,m,d,o),b+=$.b||0,L(w,A,a,++b),b+=w.b||0,l+=2,d+=2}}}for(;l<f;){$=(v=u[l]).b;ir(i,a,v.a,$,++b),b+=$.b||0,l++}for(;d<s;){var E=E||[];ar(i,a,(p=c[d]).a,p.b,void 0,E),d++}(0<a.length||0<o.length||E)&&M(t,8,e,{w:a,x:o,y:E})}var er="_elmW6BL";function ar(n,r,t,e,a,i){var o,u=n[t];u?1===u.c?(i.push({r:a,A:u}),u.c=2,L(u.z,e,o=[],u.r),u.r=a,u.s.s={w:o,A:u}):ar(n,r,t+er,e,a,i):(i.push({r:a,A:u={c:0,z:e,r:a,s:void 0}}),n[t]=u)}function ir(n,r,t,e,a){var i,o=n[t];o?0===o.c?(o.c=2,L(e,o.z,i=[],a),M(r,9,a,{w:i,A:o})):ir(n,r,t+er,e,a):(i=M(r,9,a,void 0),n[t]={c:1,z:e,r:a,s:i})}function or(n,r,t,e){!function n(r,t,e,a,i,o,u){var c=e[a];var f=c.r;for(;f===i;){var s,l=c.$;if(1===l?or(r,t.k,c.s,u):8===l?(c.t=r,c.u=u,0<(s=c.s.w).length&&n(r,t,s,0,i,o,u)):9===l?(c.t=r,c.u=u,(l=c.s)&&(l.A.s=r,0<(s=l.w).length)&&n(r,t,s,0,i,o,u)):(c.t=r,c.u=u),!(c=e[++a])||(f=c.r)>o)return a}var d=t.$;if(4===d){for(var b=t.k;4===b.$;)b=b.k;return n(r,b,e,a,i+1,o,r.elm_event_node_ref)}var v=t.e;var p=r.childNodes;for(var h=0;h<v.length;h++){var g=1===d?v[h]:v[h].b,$=++i+(g.b||0);if(i<=f&&f<=$&&(a=n(p[h],g,e,a,i,$,u),!(c=e[a])||(f=c.r)>o))return a;i=$}return a}(n,r,t,0,0,r.b,e)}function ur(n,r,t,e){return 0===t.length?n:(or(n,r,t,e),cr(n,t))}function cr(n,r){for(var t=0;t<r.length;t++){var e=r[t],a=e.t,e=function(n,r){switch(r.$){case 0:return function(n,r,t){var e=n.parentNode,r=x(r,t);r.elm_event_node_ref||(r.elm_event_node_ref=n.elm_event_node_ref);e&&r!==n&&e.replaceChild(r,n);return r}(n,r.s,r.u);case 4:return Yn(n,r.u,r.s),n;case 3:return n.replaceData(0,n.length,r.s),n;case 1:return cr(n,r.s);case 2:return n.elm_event_node_ref?n.elm_event_node_ref.j=r.s:n.elm_event_node_ref={j:r.s,p:r.u},n;case 6:for(var t=r.s,e=0;e<t.i;e++)n.removeChild(n.childNodes[t.v]);return n;case 7:for(var a=(t=r.s).e,e=t.v,i=n.childNodes[e];e<a.length;e++)n.insertBefore(x(a[e],r.u),i);return n;case 9:var o;return(t=r.s)?(void 0!==(o=t.A).r&&n.parentNode.removeChild(n),o.s=cr(n,t.w)):n.parentNode.removeChild(n),n;case 8:return function(n,r){for(var t=r.s,e=function(n,r){if(n){for(var t=Pn.createDocumentFragment(),e=0;e<n.length;e++){var a=n[e].A;t.appendChild(2===a.c?a.s:x(a.z,r.u))}return t}}(t.y,r),a=(n=cr(n,t.w),t.x),i=0;i<a.length;i++){var o=a[i],u=o.A,u=2===u.c?u.s:x(u.z,r.u);n.insertBefore(u,n.childNodes[o.r])}e&&n.appendChild(e);return n}(n,r);case 5:return r.s(n);default:D(10)}}(a,e);a===n&&(n=e)}return n}function fr(n){if(3===n.nodeType)return{$:0,a:n.textContent};if(1!==n.nodeType)return{$:0,a:""};for(var r=v,t=n.attributes,e=t.length;e--;)var a=t[e],r={$:1,a:l(m,a.name,a.value),b:r};for(var i=n.tagName.toLowerCase(),o=v,u=n.childNodes,e=u.length;e--;)o={$:1,a:fr(u[e]),b:o};return s(c,i,r,o)}var sr=n(function(r,n,t,o){return Cn(n,o,r.aM,r.a1,r.a_,function(t,n){var e=r.a3,a=o.node,i=fr(a);return dr(n,function(n){var n=e(n),r=Qn(i,n);a=ur(a,i,r,t),i=n})})}),lr="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:function(n){return setTimeout(n,1e3/60)};function dr(t,e){e(t);var a=0;function i(){a=1===a?0:(lr(i),e(t),1)}return function(n,r){t=n,r?(e(t),2===a&&(a=1)):(0===a&&lr(i),a=2)}}var br={addEventListener:function(){},removeEventListener:function(){}},vr="undefined"!=typeof window?window:br;var pr=r(function(e,a,i){return{$:2,b:function(r){function t(n){r(a(i.aG.a(n)))}var n=new XMLHttpRequest;n.addEventListener("error",function(){t(St)}),n.addEventListener("timeout",function(){t(Tt)}),n.addEventListener("load",function(){t(function(n,r){return l(200<=r.status&&r.status<300?Gt:Ft,function(n){return{a2:n.responseURL,aX:n.status,aY:n.statusText,aI:function(n){if(!n)return zt;for(var r=zt,t=n.split("\r\n"),e=t.length;e--;){var a,i,o=t[e],u=o.indexOf(": ");0<u&&(a=o.substring(0,u),i=o.substring(2+u),r=s(Ut,a,function(n){return Kr(Bt(n)?i+", "+n.a:i)},r))}return r}(n.getAllResponseHeaders())}}(r),n(r.response))}(i.aG.b,n))}),Bt(i.as)&&function(r,t,e){t.upload.addEventListener("progress",function(n){t.c||mn(l(Pt,r,{a:e,b:Rt({aW:n.loaded,ap:n.total})}))}),t.addEventListener("progress",function(n){t.c||mn(l(Pt,r,{a:e,b:Nt({aU:n.loaded,ap:n.lengthComputable?Kr(n.total):w})}))})}(e,n,i.as.a);try{n.open(i.aO,i.a2,!0)}catch(n){return t(It(i.a2))}return function(n,r){for(var t=r.aI;t.b;t=t.b)n.setRequestHeader(t.a.a,t.a.b);n.timeout=r.a$.a||0,n.responseType=r.aG.d,n.withCredentials=r.ay}(n,i),i.aA.a&&n.setRequestHeader("Content-Type",i.aA.a),n.send(i.aA.b),function(){n.c=!0,n.abort()}},c:null}});var hr=r(function(n,r,t){return{$:0,d:n,b:r,a:t}}),gr=e(function(r,t){return{$:0,d:t.d,b:t.b,a:function(n){return r(t.a(n))}}});var $r=e(function(n,r){return{$:0,a:n,b:r}});function mr(n){return s(Jr,e(function(n,r){return r+1}),0,n)}function xr(n){return s($t,yt(o),u(v),n)}function yr(n){return{$:2,a:n}}function kr(n){var r,t,e,a,i,o,u,c;return-1===n.$&&-1===n.d.$&&-1===n.e.$?-1!==n.e.d.$||n.e.d.a?(e=(c=n.e).b,a=c.c,i=c.d,c=c.e,b(j,1,n.b,n.c,b(j,0,(r=n.d).b,r.c,r.d,r.e),b(j,0,e,a,i,c))):(e=(t=n.e).b,a=t.c,o=(i=t.d).d,u=i.e,c=t.e,b(j,0,i.b,i.c,b(j,1,n.b,n.c,b(j,0,(r=n.d).b,r.c,r.d,r.e),o),b(j,1,e,a,u,c))):n}function wr(n){var r,t,e,a,i,o,u,c,f;return-1===n.$&&-1===n.d.$&&-1===n.e.$?-1!==n.d.d.$||n.d.d.a?(o=(f=n.e).b,u=f.c,c=f.d,f=f.e,b(j,1,r=n.b,t=n.c,b(j,0,(a=n.d).b,a.c,a.d,a=a.e),b(j,0,o,u,c,f))):(r=n.b,t=n.c,a=(e=n.d).e,o=(i=n.e).b,u=i.c,c=i.d,f=i.e,b(j,0,e.b,e.c,b(j,1,(i=e.d).b,i.c,i.d,i.e),b(j,1,r,t,a,b(j,0,o,u,c,f)))):n}function _r(n){var r,t,e,a,i,o;return-1===n.$&&-1===n.d.$?(r=n.a,t=n.b,e=n.c,o=(a=n.d).d,i=n.e,1===a.a?-1!==o.$||o.a?-1===(o=kr(n)).$?(n=o.e,b(Kt,o.a,o.b,o.c,_r(o.d),n)):C:b(j,r,t,e,_r(a),i):b(j,r,t,e,_r(a),i)):C}function Ar(n){return{$:4,a:n}}function Cr(n){var r=pt(n)<=256;return 0<mr(l(oe,l(fe,ce,l(ue,{aB:!1,aP:!1},"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$")),n))&&r}function jr(n){return function(n){return xe(le({ay:!1,aA:n.aA,aG:n.aG,aI:n.aI,aO:n.aO,a$:n.a$,as:n.as,a2:n.a2}))}({aA:n.aA,aG:n.aG,aI:v,aO:"POST",a$:w,as:w,a2:n.a2})}function Er(n){return{$:0,a:n}}function Mr(n){return{a:n,b:!0}}function Lr(n){return l(F,"src",Xn(n))}function Fr(n){r=p([l(m,"width",Hr(10))]);var r=l(na,U(p([He("animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block"),ra("0 0 24 24"),Ze("none")]),r),p([l(De,p([He("opacity-25"),Je("12"),Xe("12"),Ye("10"),Qe("currentColor"),Ve("4")]),v),l(Ue,p([He("opacity-75"),Ze("currentColor"),We("M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z")]),v)])),r=(n=n.A?{a:"bg-[#8a4f97]",b:r,c:!0}:{a:"bg-[#bf321b]",b:G("Sign Me Up"),c:!1}).a,t=n.b,n=n.c;return l(qe,p([l(E,"padding","10px 10px"),l(E,"display","inline-block"),l(E,"border-radius","5px"),l(E,"border-radius","0px 5px 5px 0px"),l(E,"box-shadow","#777 1px 1px 5px"),l(E,"color","white"),I("w-[115px] h-[56px] text-lg"),I(r),l(Ie,"click",lt(_e)),Ke(n)]),p([t]))}function a(n){return l(F,"href",/^javascript:/i.test((n=n).replace(/\s/g,""))?"":n)}function Ir(n){return l(i,p([I("w-full pr-2")]),p([l(i,p([I("lg:hidden")]),p([ba])),l(i,p([I("hidden lg:block w-full")]),p([function(n){return l(la,p([I("h-full w-full flex justify-end content-center justify-items-center gap-4 mr-4"),I("text-base")]),p([d(da,n,"/feastdayactivities","_self","Activities"),d(da,n,"/saints","_self","Saints"),d(da,n,"/animations","_self","Animations"),d(da,n,"/resources","_self","Resources"),d(da,n,"https://www.etsy.com/shop/CatholicStories","_blank","Shop"),d(da,n,"/give","_self","Give"),d(da,n,"/team","_self","About")]))}(n)]))]))}var br=e(function(n,r){var t="g";n.aP&&(t+="m"),n.aB&&(t+="i");try{return Kr(RegExp(r,t))}catch(n){return w}}),Gr=r(function(n,r,t){for(var e,a=[],i=0,o=t,t=r.lastIndex,u=-1;i++<n&&(e=r.exec(o))&&u!=r.lastIndex;){for(var c=e.length-1,f=Array(c);0<c;){var s=e[c];f[--c]=s?Kr(s):w}a.push(d(ie,e[0],e.index,i,p(f))),u=r.lastIndex}return r.lastIndex=t,p(a)}),Sr=1,Nr=0,o=O,Rr=r(function(n,r,t){for(;;){if(-2===t.$)return r;var e=t.d,a=n,i=s(n,t.b,t.c,s(Rr,n,r,t.e));n=a,r=i,t=e}}),Tr=function(n){return s(Rr,r(function(n,r,t){return l(o,{a:n,b:r},t)}),v,n)},zr=2,y=function(n){return{$:1,a:n}},Br=e(function(n,r){return{$:3,a:n,b:r}}),Pr=e(function(n,r){return{$:0,a:n,b:r}}),qr=e(function(n,r){return{$:1,a:n,b:r}}),k=function(n){return{$:0,a:n}},Or=function(n){return{$:2,a:n}},Kr=function(n){return{$:0,a:n}},w={$:1},Dr=bn,Hr=function(n){return n+""},Jr=r(function(n,r,t){for(;;){if(!t.b)return r;var e=t.b,a=n,i=l(n,t.a,r);n=a,r=i,t=e}}),Xr=function(n){return s(Jr,o,v,n)},Wr=n(function(n,r,t,e){return{$:0,a:n,b:r,c:t,d:e}}),Zr=[],Ur=Y,Yr=e(function(n,r){return V(r)/V(n)}),Qr=Ur(l(Yr,2,32)),Vr=d(Wr,0,Qr,Zr,Zr),nt=t,rt=Q,tt=function(n){return n.length},et=e(function(n,r){return 0<f(n,r)?n:r}),at=K,it=e(function(n,r){for(;;){var t=l(at,32,n),e=t.b,t=l(o,{$:0,a:t.a},r);if(!e.b)return Xr(t);n=e,r=t}}),ot=e(function(n,r){for(;;){var t=Ur(r/32);if(1===t)return l(at,32,n).a;n=l(it,n,v),r=t}}),ut=e(function(n,r){var t,e;return r.a?(e=rt(l(Yr,32,(t=32*r.a)-1)),n=n?Xr(r.d):r.d,n=l(ot,n,r.a),d(Wr,tt(r.c)+t,l(et,5,e*Qr),n,r.c)):d(Wr,tt(r.c),Qr,Zr,r.c)}),ct=z(function(n,r,t,e,a){for(;;){if(r<0)return l(ut,!1,{d:e,a:t/32|0,c:a});var i={$:1,a:s(nt,32,r,n)};n=n,r=r-32,t=t,e=l(o,i,e),a=a}}),ft=e(function(n,r){var t;return 0<n?b(ct,r,n-(t=n%32)-32,n,v,s(nt,t,n-t,r)):Vr}),_=function(n){return!n.$},st=on,lt=function(n){return{$:0,a:n}},dt=function(n){switch(n.$){case 0:return 0;case 1:return 1;case 2:return 2;default:return 3}},bt=function(n){return n},vt=nn,pt=function(n){return n.length},ht=function(n){for(;;)0},u=hn,O=u(0),gt=n(function(n,r,t,e){var a,i,o,u;return e.b?(a=e.a,(e=e.b).b?(i=e.a,(e=e.b).b?(o=e.a,(e=e.b).b?(u=e.b,l(n,a,l(n,i,l(n,o,l(n,e.a,500<t?s(Jr,n,r,Xr(u)):d(gt,n,r,t+1,u)))))):l(n,a,l(n,i,l(n,o,r)))):l(n,a,l(n,i,r))):l(n,a,r)):r}),$t=r(function(n,r,t){return d(gt,n,r,0,t)}),mt=e(function(t,n){return s($t,e(function(n,r){return l(o,t(n),r)}),v,n)}),A=gn,xt=e(function(r,n){return l(A,function(n){return u(r(n))},n)}),yt=r(function(t,n,e){return l(A,function(r){return l(A,function(n){return u(l(t,r,n))},e)},n)}),kt=jn,wt=e(function(n,r){return xn(l(A,kt(n),r))}),_t=($.Task={b:O,c:r(function(n,r,t){return l(xt,function(n){return 0},xr(l(mt,wt(n),r)))}),d:r(function(n,r,t){return u(0)}),e:e(function(n,r){return l(xt,n,r)}),f:void 0},Mn("Task")),At=e(function(n,r){return _t(l(xt,n,r))}),bn=sr,Ct={z:"",A:!1,r:""},jt=Ln,Et=jt(v),Mt=Ln(v),Lt=Fn,Ft=e(function(n,r){return{$:3,a:n,b:r}}),It=function(n){return{$:0,a:n}},Gt=e(function(n,r){return{$:4,a:n,b:r}}),St={$:2},Nt=function(n){return{$:1,a:n}},Rt=function(n){return{$:0,a:n}},Tt={$:1},C={$:-2},zt=C,Bt=function(n){return!n.$},Pt=En,qt=X,Ot=e(function(n,r){for(;;){if(-2===r.$)return w;var t=r.c,e=r.d,a=r.e;switch(l(qt,n,r.b)){case 0:n=n,r=e;continue;case 1:return Kr(t);default:n=n,r=a;continue}}}),j=z(function(n,r,t,e,a){return{$:-1,a:n,b:r,c:t,d:e,e:a}}),Kt=z(function(n,r,t,e,a){var i,o,u,c;return-1!==a.$||a.a?-1!==e.$||e.a||-1!==e.d.$||e.d.a?b(j,n,r,t,e,a):(i=e.d,c=e.e,b(j,0,e.b,e.c,b(j,1,i.b,i.c,i.d,i.e),b(j,1,r,t,c,a))):(i=a.b,o=a.c,u=a.d,a=a.e,-1!==e.$||e.a?b(j,n,i,o,b(j,0,r,t,e,u),a):b(j,0,r,t,b(j,1,e.b,e.c,e.d,c=e.e),b(j,1,i,o,u,a)))}),Dt=r(function(n,r,t){if(-2===t.$)return b(j,0,n,r,C,C);var e=t.a,a=t.b,i=t.c,o=t.d,u=t.e;switch(l(qt,n,a)){case 0:return b(Kt,e,a,i,s(Dt,n,r,o),u);case 1:return b(j,e,a,r,o,u);default:return b(Kt,e,a,i,o,s(Dt,n,r,u))}}),Ht=r(function(n,r,t){n=s(Dt,n,r,t);return-1!==n.$||n.a?n:b(j,1,n.b,n.c,n.d,n.e)}),Jt=B(function(n,r,t,e,a,i,o){if(-1!==i.$||i.a){for(;;){if(-1!==o.$||1!==o.a)break;if(-1!==o.d.$)return wr(r);if(1===o.d.a)return wr(r);break}return r}return b(j,t,i.b,i.c,i.d,b(j,0,e,a,i.e,o))}),Xt=e(function(n,r){var t,e,a,i,o,u,c;return-2===r.$?C:(t=r.a,a=r.c,i=r.d,o=r.e,f(n,e=r.b)<0?-1===i.$&&1===i.a?-1!==(u=i.d).$||u.a?-1===(u=kr(r)).$?(c=u.e,b(Kt,u.a,u.b,u.c,l(Xt,n,u.d),c)):C:b(j,t,e,a,l(Xt,n,i),o):b(j,t,e,a,l(Xt,n,i),o):l(Wt,n,P(Jt,n,r,t,e,a,i,o)))}),Wt=e(function(n,r){var t,e,a,i,o;return-1===r.$?(t=r.a,e=r.c,a=r.d,i=r.e,H(n,r=r.b)?-1===(o=function(n){for(;;){if(-1!==n.$||-1!==n.d.$)return n;n=n.d}}(i)).$?b(Kt,t,o.b,o.c,a,_r(i)):C:b(Kt,t,r,e,a,l(Xt,n,i))):C}),Zt=e(function(n,r){n=l(Xt,n,r);return-1!==n.$||n.a?n:b(j,1,n.b,n.c,n.d,n.e)}),Ut=r(function(n,r,t){r=r(l(Ot,n,t));return r.$?l(Zt,n,t):s(Ht,n,r.a,t)}),Yt=r(function(n,r,t){return r(n(t))}),Qt=e(function(n,r){return s(hr,"",bt,l(Yt,r,n))}),Vt={$:2},ne={$:1},re=e(function(n,r){return r.$?y(n(r.a)):k(r.a)}),te=e(function(n,r){switch(r.$){case 0:return y({$:0,a:r.a});case 1:return y(ne);case 2:return y(Vt);case 3:return y({$:3,a:r.a.aX});default:return l(re,Ar,n(r.b))}}),ee=vn,ae=(Y=ee,Rn(t="gtagReportConversion"),$[t]={e:Tn,u:Y,a:zn},Mn(t)),ie=n(function(n,r,t,e){return{aL:r,aN:n,aQ:t,aZ:e}}),oe=Gr(1/0),ue=br,ce=/.^/,fe=e(function(n,r){return r.$?n:r.a}),se=function(r){return l(At,ht,{$:2,b:function(n){try{vr.location=r}catch(n){Pn.location.reload(!1)}},c:null})},le=function(n){return{$:1,a:n}},de=e(function(n,r){return{al:n,aq:r}}),Q=u(l(de,zt,v)),be=function(t){return{$:2,b:function(n){var r=t.f;2===r.$&&r.c&&r.c(),t.f=null,n({$:0,a:W})},c:null}},ve=xn,pe=r(function(t,n,e){for(;;){if(!n.b)return u(e);var a,r=n.a,i=n.b;if(r.$)return a=r.a,l(A,function(n){var r=a.as;return s(pe,t,i,1===r.$?e:s(Ht,r.a,n,e))},ve(s(pr,t,kt(t),a)));var o=r.a,r=l(Ot,o,e);if(1!==r.$)return l(A,function(n){return s(pe,t,i,l(Zt,o,e))},be(r.a));t=t,n=i,e=e}}),K=n(function(n,r,t,e){return l(A,function(n){return u(l(de,n,t))},s(pe,n,r,e.al))}),he=r(function(n,r,t){n=n(r);return n.$?t:l(o,n.a,t)}),ge=e(function(n,r){return s($t,he(n),v,r)}),$e=n(function(n,r,t,e){var a=e.b;return H(r,e.a)?Kr(l(kt,n,a(t))):w}),on=r(function(n,r,t){return l(A,function(n){return u(t)},xr(l(ge,s($e,n,r.a,r.b),t.aq)))}),nn=e(function(n,r){var t;return r.$?le({ay:(t=r.a).ay,aA:t.aA,aG:l(gr,n,t.aG),aI:t.aI,aO:t.aO,a$:t.a$,as:t.as,a2:t.a2}):{$:0,a:r.a}}),me=e(function(n,r){return{$:0,a:n,b:r}}),xe=($.Http={b:Q,c:K,d:on,e:nn,f:e(function(n,r){return l(me,r.a,l(Yt,r.b,n))})},Mn("Http")),ye=(Mn("Http"),e(function(n,r){switch(n.$){case 0:return{a:Z(r,{z:n.a}),b:Et};case 1:return Cr(r.z)?(t=p([{a:"email",b:ee(r.z)}]),t=s(Jr,e(function(n,r){return s(pn,n.a,n.b,r)}),{},t),{a:Z(r,{A:!0,r:"Your request is being processed..."}),b:jr({aA:l($r,"application/json",l(Dr,0,t)),aG:l(Qt,yr,te(k)),a2:"https://api.catholicstoriesforchildren.com/add-contact"})}):{a:Z(r,{r:"Error: Please enter a valid email"}),b:Et};default:return n.a.$?{a:Z(r,{A:!1,r:"Error: please try again later"}),b:Et}:{a:Z(r,{A:!1,r:"Email sent!"}),b:jt(p([ae(""),se("/thankyou")]))}}var t})),jn=e(function(n,r){var n=l(ye,n,r.F),t=n.b;return{a:Z(r,{F:n.a}),b:l(Lt,bt,t)}}),i=c("div"),E=Hn,F=e(function(n,r){return l(Jn,n,ee(r))}),I=F("className"),ke=c("h1"),we=Kn,G=qn,_e={$:1},S=e(function(n,r){return l(m,function(n){return/^(on|formAction$)/i.test(n)?"data-"+n:n}(n),Xn(r))}),Ae=c("input"),Ce=c("li"),je=an,Ee=function(n){return{$:1,a:n}},Me=en,Le=l(Me,"keyCode",rn),Fe=Dn,Ie=e(function(n,r){return l(Fe,n,{$:0,a:r})}),Ge=e(function(n,r){return l(Fe,n,{$:1,a:r})}),O=tn,Se=l(e(function(n,r){return s($t,Me,r,n)}),p(["target","value"]),O),N=c("p"),Ne=F("placeholder"),Re=F("type"),Te=c("ul"),ze=F("value"),Be=c("img"),Pe=l(i,p([I("flex justify-center")]),p([l(Be,p([I("rounded w-full max-w-[330px]"),Lr("https://ik.imagekit.io/catholicstories/Free_Mass_Guide_v3_1__E6fGtEQBXY.png?updatedAt=1688592154908")]),v)])),qe=c("button"),Oe=vn,Ke=e(function(n,r){return l(Jn,n,Oe(r))})("disabled"),sr=On("http://www.w3.org/2000/svg"),De=sr("circle"),He=m("class"),Je=m("cx"),Xe=m("cy"),We=m("d"),Ze=m("fill"),Ue=sr("path"),Ye=m("r"),Qe=m("stroke"),Ve=m("stroke-width"),na=sr("svg"),ra=m("viewBox"),ta=function(n){return l(i,p([I("border-4 border-solid border-[#460156] p-3 rounded-md bg-[#ffc7c7]"),I("sm:grid sm:grid-cols-[_1fr_225px] sm:gap-1")]),p([l(i,v,p([l(i,p([I("mb-5")]),p([l(N,p([I("pb-5 pl-1 text-left")]),p([G("Having trouble with kids in Mass? Get our guide!")])),l(i,v,p([l(Ae,p([Re("text"),Ne("First Name"),l(S,"aria-hidden","true"),l(E,"display","none")]),v),l(Ae,p([Re("email"),Ne("Email"),ze(n.z),l(Ge,"input",l(st,Mr,l(st,Er,Se))),(r=_e,l(Ie,"keydown",l(je,function(n){return 13===n?lt(r):Ee("not ENTER")},Le))),l(S,"required","true"),l(E,"padding","10px 20px"),l(E,"border-radius","5px 0px 0px 5px"),l(E,"box-shadow","#777 1px 1px 5px"),I("w-[172px] md:w-[230px] h-[56px] text-lg")]),v),Fr(n),function(n){return l(i,p([I(l(vt,"Error",n.r)?"text-rose-600":"text-emerald-500"),I("text-left pl-1")]),p([G(n.r)]))}(n)]))])),l(i,p([I("text-left text-base col-span-2 marker:content-['🌟️']")]),p([l(N,p([I("mb-2")]),p([G("Enter your email to receive our FREE Ultimate Guide for Bringing Kids to Mass.")])),l(N,v,p([G("Get inspired:")])),l(Te,p([I("ml-4")]),p([l(Ce,p([I("pl-1")]),p([G(" Top tips from parents on bringing kids to Mass.")])),l(Ce,p([I("pl-1")]),p([G(" Best strategies on preparing kids for a heavenly Mass experience.")])),l(Ce,p([I("pl-1")]),p([G(" Faith-based techniques to get kids engaged in Mass.")])),l(Ce,p([I("pl-1")]),p([G(" It's FREE! Empower kids to love Mass this week!")]))])),l(N,p([I("pt-4")]),p([G("We will also send you:")])),l(Te,p([I("ml-4")]),p([l(Ce,p([I("pl-1")]),p([G(" Updates on the animations.")])),l(Ce,p([I("pl-1")]),p([G(" Future freebies!")]))]))]))])),l(i,v,p([Pe]))]));var r},ea=l(i,v,p([G("Want monthly content at your front door? Check out these wonderful Catholic subscriptions.")])),aa=c("a"),ia=c("h2"),oa=F("target"),ua=l(i,v,l(mt,function(n){return l(aa,p([I("grid grid-cols-[100px_1fr] hover:bg-csc-lightpurple rounded p-7"),oa("_blank"),l(S,"aria-label",n.K),a(n.M)]),p([l(i,v,p([l(Be,p([Lr(n.L),I("w-20 h-20 object-cover")]),v)])),l(i,v,p([l(ia,p([I("leading-10")]),p([G(n.K)]))]))]))},p([{L:"https://ik.imagekit.io/catholicstories/ProfileImages/3_1__qbNDjJEy1.png?updatedAt=1685581657645",M:"https://osvkids.com/magazine/",K:"OSV Kids Magazine"},{L:"https://ik.imagekit.io/catholicstories/ProfileImages/4_1__LjeiFaCGM1.png?updatedAt=1685581640310",M:"https://www.saintofthemonth.com",K:"Saint of the Month Box"},{L:"https://ik.imagekit.io/catholicstories/ProfileImages/5_GX7izsR5Jp.png?updatedAt=1685581558288",M:"https://themassbox.com",K:"Mass Box"},{L:"https://ik.imagekit.io/catholicstories/ProfileImages/6_tZqBkQ3sW.png?updatedAt=1685581578667",M:"https://faithandfamilycollective.com",K:"Faith + Family Collective"},{L:"https://ik.imagekit.io/catholicstories/ProfileImages/7_i5fOMR9CEB.png?updatedAt=1685581542221",M:"https://catholicfamilycrate.com",K:"Catholic Family Crate"},{L:"https://ik.imagekit.io/catholicstories/ProfileImages/8_qucgsetg84.png?updatedAt=1685581652225",M:"https://us.magnificat.net/home/magnifikid",K:"MagnifiKid"},{L:"https://ik.imagekit.io/catholicstories/ProfileImages/9_6wjdaJHdc.png?updatedAt=1685581568223",M:"https://formed.org",K:"Formed"},{L:"https://ik.imagekit.io/catholicstories/ProfileImages/27_LJ8rjMXH6.png?updatedAt=1682716507484",M:"https://www.diaryofagodman.com/subscriptions",K:"Diary of a God-Man"}]))),ca=l(i,p([I("grid grid-cols-[100px_1fr] rounded py-7")]),p([l(i,v,p([l(Be,p([Lr("https://ik.imagekit.io/catholicstories/Construction_Cone_vLoPMhMZBm.png?updatedAt=1679070884463"),I("w-20 h-20 object-cover")]),v)])),l(i,v,p([l(N,v,p([G("This page is a work-in-progress. We are working hard on adding resources for you.")]))]))])),Fn=F("alt"),En=c("footer"),X=c("span"),fa=l(En,p([l(E,"padding",Hr(30)+"px"),l(E,"background-color","black"),l(E,"color","white"),l(E,"transform-style","preserve-3d")]),p([l(i,p([I("flex items-center gap-2.5")]),p([l(X,v,p([G("Follow us on")])),l(aa,p([a("https://www.facebook.com/catholicstoriesforchildren"),l(S,"aria-label","CSC Facebook Page"),oa("_blank")]),p([l(Be,p([I("w-10 h-10"),Lr("https://ik.imagekit.io/catholicstories/f_logo_RGB-Blue_250_3vs-yhXer.png?updatedAt=1684277030198"),Fn("Facebook")]),v)])),l(aa,p([a("https://www.instagram.com/catholicstoriesforchildren/"),l(S,"aria-label","CSC Instagram Page"),oa("_blank")]),p([l(Be,p([I("w-10 h-10"),Lr("https://ik.imagekit.io/catholicstories/Instagram_Glyph_Gradient_kFoMs9jIr.png?updatedAt=1684277127293"),Fn("Instagram")]),v)]))])),l(N,v,p([G("Copyright © 2023 Catholic Stories for Children. All rights reserved.")])),l(N,v,p([G("Catholic Stories for Children is a 501(c)(3) non-profit recognized by the IRS. Contributions to Catholic Stories for Children are tax-deductible to the extent permitted by law.  Tax ID Number: 85-4194883")]))])),sa=c("header"),la=c("nav"),da=n(function(n,r,t,e){return l(aa,p([a(r),I("flex items-center justify-center"),I("hover:scale-105 transition ease-in-out"),I("hover:border-b-4 hover:border-[#9101b3]"),I("rounded"),I("h-[60px] h-["+n+"]"),I("p-2"),l(S,"aria-label",e),oa(t)]),p([G(e)]))}),ba=l(aa,p([a("/navigation"),I("space-y-2"),l(S,"aria-label","menu")]),p([l(i,p([I("w-8 h-0.5 m-auto bg-gray-600")]),v),l(i,p([I("w-8 h-0.5 m-auto bg-gray-600")]),v),l(i,p([I("w-8 h-0.5 m-auto bg-gray-600")]),v)])),Tn=l(Be,p([Lr("/assets/logo_solid.svg"),l(E,"height","30px"),Fn(""),l(E,"vertical-align","middle")]),v),va=l(aa,p([l(E,"text-decoration","none"),I("colorDarkGray"),a("/"),l(S,"aria-label","home")]),p([Tn])),pa=e(function(n,r){var n="Catholic Stories for Children"===n?{a:"111px",b:Ir,c:"grid-cols-[150px_1fr_150px] lg:grid-cols-[150px_1fr_600px]"}:{a:"60px",b:Ir,c:"grid-cols-[150px_1fr_150px] lg:grid-cols-[150px_1fr_600px]"},t=n.a,e=n.b,n=n.c;return l(sa,p([l(E,"background-color","#3d5d75"),l(E,"background-image","linear-gradient(130deg, #9DE2EB , #EBD6F1)"),I("h-[60px] md:h-["+t+"]"),I("colorDarkGray"),I("grid items-center justify-items-center"),I(n)]),p([va,l(aa,p([l(E,"text-decoration","none"),I("colorDarkGray"),I("invisible md:visible"),I("justify-self-start"),a("/")]),p([l(ke,p([l(E,"font-family","hvdComicSerifPro"),l(E,"margin","0px"),I("text-[0px] md:text-xl")]),p([G("Catholic Stories for Children")]))])),e(t)]))}),Y=bn({aM:function(n){return{a:{F:Ct},b:Et}},a_:function(n){return Mt},a1:jn,a3:function(n){return l(i,p([l(E,"height","100vh"),l(E,"overflow-x","hidden"),l(E,"overflow-y","auto"),l(E,"perspective","300px"),l(E,"scroll-behavior","smooth"),l(E,"background-color","#FEF7F4")]),p([l(pa,"Subscriptions",10),function(n){return l(i,p([I("max-w-3xl"),I("m-auto"),I("p-5"),I("mb-10")]),p([l(ke,p([I("my-10 leading-10")]),p([G("Subscriptions")])),l(i,p([I("mb-10")]),p([l(we,bt,ta(n.F))])),ea,ua,ca]))}(n),fa]))}});t={Resources:{Subscriptions:{Main:{init:Y(lt(0))(0)}}}},R.Elm?function n(r,t){for(var e in t)e in r?"init"==e?D(6):n(r[e],t[e]):r[e]=t[e]}(R.Elm,t):R.Elm=t}(this);