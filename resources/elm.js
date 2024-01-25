!function(T){"use strict";function M(n,r,t){return t.a=n,t.f=r,t}function e(t){return M(2,t,function(r){return function(n){return t(r,n)}})}function r(e){return M(3,e,function(t){return function(r){return function(n){return e(t,r,n)}}})}function n(a){return M(4,a,function(e){return function(t){return function(r){return function(n){return a(e,t,r,n)}}}})}function z(o){return M(5,o,function(a){return function(e){return function(t){return function(r){return function(n){return o(a,e,t,r,n)}}}}})}function D(u){return M(7,u,function(i){return function(o){return function(a){return function(e){return function(t){return function(r){return function(n){return u(i,o,a,e,t,r,n)}}}}}}})}function d(n,r,t){return 2===n.a?n.f(r,t):n(r)(t)}function s(n,r,t,e){return 3===n.a?n.f(r,t,e):n(r)(t)(e)}function l(n,r,t,e,a){return 4===n.a?n.f(r,t,e,a):n(r)(t)(e)(a)}function b(n,r,t,e,a,o){return 5===n.a?n.f(r,t,e,a,o):n(r)(t)(e)(a)(o)}function O(n,r,t,e,a,o,i,u){return 7===n.a?n.f(r,t,e,a,o,i,u):n(r)(t)(e)(a)(o)(i)(u)}var v={$:0};function q(n,r){return{$:1,a:n,b:r}}var P=e(q);function h(n){for(var r=v,t=n.length;t--;)r={$:1,a:n[t],b:r};return r}var B=r(function(n,r,t){for(var e=Array(n),a=0;a<n;a++)e[a]=t(r+a);return e}),K=e(function(n,r){for(var t=Array(n),e=0;e<n&&r.b;e++)t[e]=r.a,r=r.b;return t.length=e,{a:t,b:r}});function H(n){throw Error("https://github.com/elm/core/blob/1.0.0/hints/"+n+".md")}function Y(n,r){for(var t,e=[],a=Z(n,r,0,e);a&&(t=e.pop());a=Z(t.a,t.b,0,e));return a}function Z(n,r,t,e){if(n!==r){if("object"!=typeof n||null===n||null===r)return"function"==typeof n&&H(5),!1;if(100<t)e.push({a:n,b:r});else for(var a in n.$<0&&(n=Mr(n),r=Mr(r)),n)if(!Z(n[a],r[a],t+1,e))return!1}return!0}function f(n,r,t){if("object"!=typeof n)return n===r?0:n<r?-1:1;if(void 0===n.$)return(t=(t=f(n.a,r.a))||f(n.b,r.b))||f(n.c,r.c);for(;n.b&&r.b&&!(t=f(n.a,r.a));n=n.b,r=r.b);return t||(n.b?1:r.b?-1:0)}var U=e(function(n,r){n=f(n,r);return n<0?Gr:n?zr:Nr}),X=0;function W(n,r){var t,e={};for(t in n)e[t]=n[t];for(t in r)e[t]=r[t];return e}function J(n,r){if("string"==typeof n)return n+r;if(!n.b)return r;var t={$:1,a:n.a,b:r};n=n.b;for(var e=t;n.b;n=n.b)e=e.b={$:1,a:n.a,b:r};return t}var Q=Math.ceil,V=Math.floor,nn=Math.log;var rn=e(function(n,r){return!!~r.indexOf(n)});var tn={$:2,b:function(n){return"number"!=typeof n||(n<=-2147483647||2147483647<=n||(0|n)!==n)&&(!isFinite(n)||n%1)?g("an INT",n):k(n)}},en={$:2,b:function(n){return"string"==typeof n?k(n):n instanceof String?k(n+""):g("a STRING",n)}};var an=e(function(n,r){return{$:6,d:n,b:r}});var on=e(function(n,r){return{$:10,b:r,h:n}});var un=e(function(n,r){return{$:9,f:n,g:[r]}}),cn=e(p);function p(n,r){switch(n.$){case 2:return n.b(r);case 5:return null===r?k(n.c):g("null",r);case 3:return sn(r)?fn(n.b,r,h):g("a LIST",r);case 4:return sn(r)?fn(n.b,r,dn):g("an ARRAY",r);case 6:var t=n.d;return"object"==typeof r&&null!==r&&t in r?(o=p(n.b,r[t]),_(o)?o:x(d(Or,t,o.a))):g("an OBJECT with a field named `"+t+"`",r);case 7:t=n.e;return sn(r)?t<r.length?(o=p(n.b,r[t]),_(o)?o:x(d(qr,t,o.a))):g("a LONGER array. Need index "+t+" but only see "+r.length+" entries",r):g("an ARRAY",r);case 8:if("object"!=typeof r||null===r||sn(r))return g("an OBJECT",r);var e,a=v;for(e in r)if(r.hasOwnProperty(e)){var o=p(n.b,r[e]);if(!_(o))return x(d(Or,e,o.a));a={$:1,a:{a:e,b:o.a},b:a}}return k(Zr(a));case 9:for(var i=n.f,u=n.g,c=0;c<u.length;c++){o=p(u[c],r);if(!_(o))return o;i=i(o.a)}return k(i);case 10:o=p(n.b,r);return _(o)?p(n.h(o.a),r):o;case 11:for(var f=v,s=n.g;s.b;s=s.b){o=p(s.a,r);if(_(o))return o;f={$:1,a:o.a,b:f}}return x(Pr(Zr(f)));case 1:return x(d(Dr,n.a,r));case 0:return k(n.a)}}function fn(n,r,t){for(var e=r.length,a=Array(e),o=0;o<e;o++){var i=p(n,r[o]);if(!_(i))return x(d(qr,o,i.a));a[o]=i.a}return k(t(a))}function sn(n){return Array.isArray(n)||"undefined"!=typeof FileList&&n instanceof FileList}function dn(r){return d(ft,r.length,function(n){return r[n]})}function g(n,r){return x(d(Dr,"Expecting "+n,r))}function ln(n,r){if(n===r)return!0;if(n.$!==r.$)return!1;switch(n.$){case 0:case 1:return n.a===r.a;case 2:return n.b===r.b;case 5:return n.c===r.c;case 3:case 4:case 8:return ln(n.b,r.b);case 6:return n.d===r.d&&ln(n.b,r.b);case 7:return n.e===r.e&&ln(n.b,r.b);case 9:return n.f===r.f&&bn(n.g,r.g);case 10:return n.h===r.h&&ln(n.b,r.b);case 11:return bn(n.g,r.g)}}function bn(n,r){var t=n.length;if(t!==r.length)return!1;for(var e=0;e<t;e++)if(!ln(n[e],r[e]))return!1;return!0}var vn=e(function(n,r){return JSON.stringify(r,null,n)+""});function hn(n){return n}var pn=r(function(n,r,t){return t[n]=r,t});function gn(n){return{$:0,a:n}}var $n=e(function(n,r){return{$:3,b:n,d:r}});var mn=0;function yn(n){n={$:0,e:mn++,f:n,g:null,h:[]};return Cn(n),n}function xn(r){return{$:2,b:function(n){n({$:0,a:yn(r)})},c:null}}function kn(n,r){n.h.push(r),Cn(n)}var wn=e(function(r,t){return{$:2,b:function(n){kn(r,t),n({$:0,a:X})},c:null}});var _n=!1,An=[];function Cn(n){if(An.push(n),!_n){for(_n=!0;n=An.shift();)!function(r){for(;r.f;){var n=r.f.$;if(0===n||1===n){for(;r.g&&r.g.$!==n;)r.g=r.g.i;if(!r.g)return;r.f=r.g.b(r.f.a),r.g=r.g.i}else{if(2===n)return r.f.c=r.f.b(function(n){r.f=n,Cn(r)});if(5===n){if(0===r.h.length)return;r.f=r.f.b(r.h.shift())}else r.g={$:3===n?0:1,b:r.f.b,i:r.g},r.f=r.f.d}}}(n);_n=!1}}function jn(n,r,t,e,a,o){var n=d(cn,n,r?r.flags:void 0),i=(_(n)||H(2),{}),r=t(n.a),u=r.a,c=o(f,u),t=function(n,r){var t,e;for(e in $){var a=$[e];a.a&&((t=t||{})[e]=a.a(e,r)),n[e]=function(n,r){var e={g:r,h:void 0},a=n.c,o=n.d,i=n.e,u=n.f;function c(t){return d($n,c,{$:5,b:function(n){var r=n.a;return 0===n.$?s(o,e,r,t):i&&u?l(a,e,r.i,r.j,t):s(a,e,i?r.i:r.j,t)}})}return e.h=yn(d($n,c,n.b))}(a,r)}return t}(i,f);function f(n,r){n=d(e,n,u);c(u=n.a,r),Gn(i,n.b,a(u))}return Gn(i,r.b,a(u)),t?{ports:t}:{}}var $={};var En=e(function(r,t){return{$:2,b:function(n){r.g(t),n({$:0,a:X})},c:null}}),In=e(function(n,r){return d(wn,n.h,{$:0,a:r})});function Ln(r){return function(n){return{$:1,k:r,l:n}}}function Fn(n){return{$:2,m:n}}var Rn=e(function(n,r){return{$:3,n:n,o:r}}),Sn=[],Nn=!1;function Gn(n,r,t){if(Sn.push({p:n,q:r,r:t}),!Nn){Nn=!0;for(var e;e=Sn.shift();)!function(n,r,t){var e,a={};for(e in Tn(!0,r,a,null),Tn(!1,t,a,null),n)kn(n[e],{$:"fx",a:a[e]||{i:v,j:v}})}(e.p,e.q,e.r);Nn=!1}}function Tn(n,r,t,e){switch(r.$){case 1:var a=r.k,o=function(n,r,t,e){function a(n){for(var r=t;r;r=r.t)n=r.s(n);return n}return d(n?$[r].e:$[r].f,a,e)}(n,a,e,r.l);return void(t[a]=function(n,r,t){return t=t||{i:v,j:v},n?t.i={$:1,a:r,b:t.i}:t.j={$:1,a:r,b:t.j},t}(n,o,t[a]));case 2:for(var i=r.m;i.b;i=i.b)Tn(n,i.a,t,e);return;case 3:Tn(n,r.o,t,{s:r.n,t:e})}}function Mn(n){$[n]&&H(3)}var zn=e(function(n,r){return r});function Dn(n){var t,i=[],u=$[n].u,c=(t=0,{$:2,b:function(n){var r=setTimeout(function(){n({$:0,a:X})},t);return function(){clearTimeout(r)}},c:null});return $[n].b=c,$[n].c=r(function(n,r,t){for(;r.b;r=r.b)for(var e=i,a=u(r.a),o=0;o<e.length;o++)e[o](a);return c}),{subscribe:function(n){i.push(n)},unsubscribe:function(n){(n=(i=i.slice()).indexOf(n))<0||i.splice(n,1)}}}var On;var qn="undefined"!=typeof document?document:{};function Pn(n){return{$:0,a:n}}var Bn=e(function(o,i){return e(function(n,r){for(var t=[],e=0;r.b;r=r.b){var a=r.a;e+=a.b||0,t.push(a)}return e+=t.length,{$:1,c:i,d:Wn(n),e:t,f:o,b:e}})}),c=Bn(void 0);e(function(o,i){return e(function(n,r){for(var t=[],e=0;r.b;r=r.b){var a=r.a;e+=a.b.b||0,t.push(a)}return e+=t.length,{$:2,c:i,d:Wn(n),e:t,f:o,b:e}})})(void 0);var Kn=e(function(n,r){return{$:4,j:n,k:r,b:1+(r.b||0)}});var Hn=e(function(n,r){return{$:"a0",n:n,o:r}}),Yn=e(function(n,r){return{$:"a1",n:n,o:r}}),Zn=e(function(n,r){return{$:"a2",n:n,o:r}}),m=e(function(n,r){return{$:"a3",n:n,o:r}});function Un(n){return/^\s*(javascript:|data:text\/html)/i.test(n)?"":n}var Xn;function Wn(n){for(var r={};n.b;n=n.b){var t,e=n.a,a=e.$,o=e.n,e=e.o;"a2"===a?"className"===o?Jn(r,o,e):r[o]=e:(t=r[a]||(r[a]={}),"a3"===a&&"class"===o?Jn(t,o,e):t[o]=e)}return r}function Jn(n,r,t){var e=n[r];n[r]=e?e+" "+t:t}function y(n,r){var t=n.$;if(5===t)return y(n.k||(n.k=n.m()),r);if(0===t)return qn.createTextNode(n.a);if(4===t){for(var e=n.k,a=n.j;4===e.$;)"object"!=typeof a?a=[a,e.j]:a.push(e.j),e=e.k;var o={j:a,p:r};(i=y(e,o)).elm_event_node_ref=o}else if(3===t)Qn(i=n.h(n.g),r,n.d);else{var i=n.f?qn.createElementNS(n.f,n.c):qn.createElement(n.c);On&&"a"==n.c&&i.addEventListener("click",On(i)),Qn(i,r,n.d);for(var u=n.e,c=0;c<u.length;c++)i.appendChild(y(1===t?u[c]:u[c].b,r))}return i}function Qn(n,r,t){for(var e in t){var a=t[e];"a1"===e?function(n,r){var t,e=n.style;for(t in r)e[t]=r[t]}(n,a):"a0"===e?function(n,r,t){var e,a=n.elmFs||(n.elmFs={});for(e in t){var o=t[e],i=a[e];if(o){if(i){if(i.q.$===o.$){i.q=o;continue}n.removeEventListener(e,i)}i=function(c,n){function f(n){var r=f.q,t=p(r.a,n);if(_(t)){for(var e,r=lt(r),t=t.a,a=r?r<3?t.a:t.r:t,o=1==r?t.b:3==r&&t.S,i=(o&&n.stopPropagation(),(2==r?t.b:3==r&&t.P)&&n.preventDefault(),c);e=i.j;){if("function"==typeof e)a=e(a);else for(var u=e.length;u--;)a=e[u](a);i=i.p}i(a,o)}}return f.q=n,f}(r,o),n.addEventListener(e,i,Xn&&{passive:lt(o)<2}),a[e]=i}else n.removeEventListener(e,i),a[e]=void 0}}(n,r,a):"a3"===e?function(n,r){for(var t in r){var e=r[t];void 0!==e?n.setAttribute(t,e):n.removeAttribute(t)}}(n,a):"a4"===e?function(n,r){for(var t in r){var e=r[t],a=e.f,e=e.o;void 0!==e?n.setAttributeNS(a,t,e):n.removeAttributeNS(a,t)}}(n,a):("value"!==e&&"checked"!==e||n[e]!==a)&&(n[e]=a)}}try{window.addEventListener("t",null,Object.defineProperty({},"passive",{get:function(){Xn=!0}}))}catch(n){}function Vn(n,r){var t=[];return L(n,r,t,0),t}function I(n,r,t,e){r={$:r,r:t,s:e,t:void 0,u:void 0};return n.push(r),r}function L(n,r,t,e){if(n!==r){var a=n.$,o=r.$;if(a!==o){if(1!==a||2!==o)return void I(t,0,e,r);r=function(n){for(var r=n.e,t=r.length,e=Array(t),a=0;a<t;a++)e[a]=r[a].b;return{$:1,c:n.c,d:n.d,e:e,f:n.f,b:n.b}}(r),o=1}switch(o){case 5:for(var i=n.l,u=r.l,c=i.length,f=c===u.length;f&&c--;)f=i[c]===u[c];if(f)return void(r.k=n.k);r.k=r.m();var s=[];return L(n.k,r.k,s,0),void(0<s.length&&I(t,1,e,s));case 4:for(var d=n.j,l=r.j,b=!1,v=n.k;4===v.$;)b=!0,"object"!=typeof d?d=[d,v.j]:d.push(v.j),v=v.k;for(var h=r.k;4===h.$;)b=!0,"object"!=typeof l?l=[l,h.j]:l.push(h.j),h=h.k;return b&&d.length!==l.length?void I(t,0,e,r):((b?function(n,r){for(var t=0;t<n.length;t++)if(n[t]!==r[t])return;return 1}(d,l):d===l)||I(t,2,e,l),void L(v,h,t,e+1));case 0:return void(n.a!==r.a&&I(t,3,e,r.a));case 1:return void nr(n,r,t,e,tr);case 2:return void nr(n,r,t,e,er);case 3:if(n.h!==r.h)return void I(t,0,e,r);s=rr(n.d,r.d),s=(s&&I(t,4,e,s),r.i(n.g,r.g));s&&I(t,5,e,s)}}}function nr(n,r,t,e,a){var o;n.c!==r.c||n.f!==r.f?I(t,0,e,r):((o=rr(n.d,r.d))&&I(t,4,e,o),a(n,r,t,e))}function rr(n,r,t){var e,a,o,i,u;for(a in n)"a1"===a||"a0"===a||"a3"===a||"a4"===a?(o=rr(n[a],r[a]||{},a))&&((e=e||{})[a]=o):a in r?(o=n[a])===(i=r[a])&&"value"!==a&&"checked"!==a||"a0"===t&&function(n,r){return n.$==r.$&&ln(n.a,r.a)}(o,i)||((e=e||{})[a]=i):(e=e||{})[a]=t?"a1"===t?"":"a0"===t||"a3"===t?void 0:{f:n[a].f,o:void 0}:"string"==typeof n[a]?"":null;for(u in r)u in n||((e=e||{})[u]=r[u]);return e}function tr(n,r,t,e){var a=n.e,o=r.e,n=a.length,r=o.length;r<n?I(t,6,e,{v:r,i:n-r}):n<r&&I(t,7,e,{v:n,e:o});for(var i=n<r?n:r,u=0;u<i;u++){var c=a[u];L(c,o[u],t,++e),e+=c.b||0}}function er(n,r,t,e){for(var a=[],o={},i=[],u=n.e,c=r.e,f=u.length,s=c.length,d=0,l=0,b=e;d<f&&l<s;){var v=u[d],h=c[l],p=v.a,g=h.a,$=v.b,m=h.b,y=void 0,x=void 0;if(p===g)L($,m,a,++b),b+=$.b||0,d++,l++;else{var k,w,_,A,C=u[d+1],j=c[l+1];if(C&&(w=C.b,x=g===(k=C.a)),j&&(A=j.b,y=p===(_=j.a)),y&&x)L($,A,a,++b),or(o,a,p,m,l,i),b+=$.b||0,ir(o,a,p,w,++b),b+=w.b||0,d+=2,l+=2;else if(y)b++,or(o,a,g,m,l,i),L($,A,a,b),b+=$.b||0,d+=1,l+=2;else if(x)ir(o,a,p,$,++b),b+=$.b||0,L(w,m,a,++b),b+=w.b||0,d+=2,l+=1;else{if(!C||k!==_)break;ir(o,a,p,$,++b),or(o,a,g,m,l,i),b+=$.b||0,L(w,A,a,++b),b+=w.b||0,d+=2,l+=2}}}for(;d<f;){$=(v=u[d]).b;ir(o,a,v.a,$,++b),b+=$.b||0,d++}for(;l<s;){var E=E||[];or(o,a,(h=c[l]).a,h.b,void 0,E),l++}(0<a.length||0<i.length||E)&&I(t,8,e,{w:a,x:i,y:E})}var ar="_elmW6BL";function or(n,r,t,e,a,o){var i,u=n[t];u?1===u.c?(o.push({r:a,A:u}),u.c=2,L(u.z,e,i=[],u.r),u.r=a,u.s.s={w:i,A:u}):or(n,r,t+ar,e,a,o):(o.push({r:a,A:u={c:0,z:e,r:a,s:void 0}}),n[t]=u)}function ir(n,r,t,e,a){var o,i=n[t];i?0===i.c?(i.c=2,L(e,i.z,o=[],a),I(r,9,a,{w:o,A:i})):ir(n,r,t+ar,e,a):(o=I(r,9,a,void 0),n[t]={c:1,z:e,r:a,s:o})}function ur(n,r,t,e){!function n(r,t,e,a,o,i,u){var c=e[a];var f=c.r;for(;f===o;){var s,d=c.$;if(1===d?ur(r,t.k,c.s,u):8===d?(c.t=r,c.u=u,0<(s=c.s.w).length&&n(r,t,s,0,o,i,u)):9===d?(c.t=r,c.u=u,(d=c.s)&&(d.A.s=r,0<(s=d.w).length)&&n(r,t,s,0,o,i,u)):(c.t=r,c.u=u),!(c=e[++a])||(f=c.r)>i)return a}var l=t.$;if(4===l){for(var b=t.k;4===b.$;)b=b.k;return n(r,b,e,a,o+1,i,r.elm_event_node_ref)}var v=t.e;var h=r.childNodes;for(var p=0;p<v.length;p++){var g=1===l?v[p]:v[p].b,$=++o+(g.b||0);if(o<=f&&f<=$&&(a=n(h[p],g,e,a,o,$,u),!(c=e[a])||(f=c.r)>i))return a;o=$}return a}(n,r,t,0,0,r.b,e)}function cr(n,r,t,e){return 0===t.length?n:(ur(n,r,t,e),fr(n,t))}function fr(n,r){for(var t=0;t<r.length;t++){var e=r[t],a=e.t,e=function(n,r){switch(r.$){case 0:return function(n,r,t){var e=n.parentNode,r=y(r,t);r.elm_event_node_ref||(r.elm_event_node_ref=n.elm_event_node_ref);e&&r!==n&&e.replaceChild(r,n);return r}(n,r.s,r.u);case 4:return Qn(n,r.u,r.s),n;case 3:return n.replaceData(0,n.length,r.s),n;case 1:return fr(n,r.s);case 2:return n.elm_event_node_ref?n.elm_event_node_ref.j=r.s:n.elm_event_node_ref={j:r.s,p:r.u},n;case 6:for(var t=r.s,e=0;e<t.i;e++)n.removeChild(n.childNodes[t.v]);return n;case 7:for(var a=(t=r.s).e,e=t.v,o=n.childNodes[e];e<a.length;e++)n.insertBefore(y(a[e],r.u),o);return n;case 9:var i;return(t=r.s)?(void 0!==(i=t.A).r&&n.parentNode.removeChild(n),i.s=fr(n,t.w)):n.parentNode.removeChild(n),n;case 8:return function(n,r){for(var t=r.s,e=function(n,r){if(n){for(var t=qn.createDocumentFragment(),e=0;e<n.length;e++){var a=n[e].A;t.appendChild(2===a.c?a.s:y(a.z,r.u))}return t}}(t.y,r),a=(n=fr(n,t.w),t.x),o=0;o<a.length;o++){var i=a[o],u=i.A,u=2===u.c?u.s:y(u.z,r.u);n.insertBefore(u,n.childNodes[i.r])}e&&n.appendChild(e);return n}(n,r);case 5:return r.s(n);default:H(10)}}(a,e);a===n&&(n=e)}return n}function sr(n){if(3===n.nodeType)return{$:0,a:n.textContent};if(1!==n.nodeType)return{$:0,a:""};for(var r=v,t=n.attributes,e=t.length;e--;)var a=t[e],r={$:1,a:d(m,a.name,a.value),b:r};for(var o=n.tagName.toLowerCase(),i=v,u=n.childNodes,e=u.length;e--;)i={$:1,a:sr(u[e]),b:i};return s(c,o,r,i)}var dr=n(function(r,n,t,i){return jn(n,i,r.aM,r.a1,r.a_,function(t,n){var e=r.a3,a=i.node,o=sr(a);return br(n,function(n){var n=e(n),r=Vn(o,n);a=cr(a,o,r,t),o=n})})}),lr="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:function(n){return setTimeout(n,1e3/60)};function br(t,e){e(t);var a=0;function o(){a=1===a?0:(lr(o),e(t),1)}return function(n,r){t=n,r?(e(t),2===a&&(a=1)):(0===a&&lr(o),a=2)}}var vr={addEventListener:function(){},removeEventListener:function(){}},hr="undefined"!=typeof window?window:vr;var pr=r(function(e,a,o){return{$:2,b:function(r){function t(n){r(a(o.aG.a(n)))}var n=new XMLHttpRequest;n.addEventListener("error",function(){t(Nt)}),n.addEventListener("timeout",function(){t(Mt)}),n.addEventListener("load",function(){t(function(n,r){return d(200<=r.status&&r.status<300?St:Ft,function(n){return{a2:n.responseURL,aX:n.status,aY:n.statusText,aI:function(n){if(!n)return zt;for(var r=zt,t=n.split("\r\n"),e=t.length;e--;){var a,o,i=t[e],u=i.indexOf(": ");0<u&&(a=i.substring(0,u),o=i.substring(2+u),r=s(Wt,a,function(n){return Br(Dt(n)?o+", "+n.a:o)},r))}return r}(n.getAllResponseHeaders())}}(r),n(r.response))}(o.aG.b,n))}),Dt(o.as)&&function(r,t,e){t.upload.addEventListener("progress",function(n){t.c||yn(d(Ot,r,{a:e,b:Tt({aW:n.loaded,ap:n.total})}))}),t.addEventListener("progress",function(n){t.c||yn(d(Ot,r,{a:e,b:Gt({aU:n.loaded,ap:n.lengthComputable?Br(n.total):w})}))})}(e,n,o.as.a);try{n.open(o.aO,o.a2,!0)}catch(n){return t(Rt(o.a2))}return function(n,r){for(var t=r.aI;t.b;t=t.b)n.setRequestHeader(t.a.a,t.a.b);n.timeout=r.a$.a||0,n.responseType=r.aG.d,n.withCredentials=r.ay}(n,o),o.aA.a&&n.setRequestHeader("Content-Type",o.aA.a),n.send(o.aA.b),function(){n.c=!0,n.abort()}},c:null}});var gr=r(function(n,r,t){return{$:0,d:n,b:r,a:t}}),$r=e(function(r,t){return{$:0,d:t.d,b:t.b,a:function(n){return r(t.a(n))}}});var mr=e(function(n,r){return{$:0,a:n,b:r}});function yr(n){return s(Yr,e(function(n,r){return r+1}),0,n)}function xr(n){return s($t,xt(i),u(v),n)}function kr(n){return{$:2,a:n}}function wr(n){var r,t,e,a,o,i,u,c;return-1===n.$&&-1===n.d.$&&-1===n.e.$?-1!==n.e.d.$||n.e.d.a?(e=(c=n.e).b,a=c.c,o=c.d,c=c.e,b(j,1,n.b,n.c,b(j,0,(r=n.d).b,r.c,r.d,r.e),b(j,0,e,a,o,c))):(e=(t=n.e).b,a=t.c,i=(o=t.d).d,u=o.e,c=t.e,b(j,0,o.b,o.c,b(j,1,n.b,n.c,b(j,0,(r=n.d).b,r.c,r.d,r.e),i),b(j,1,e,a,u,c))):n}function _r(n){var r,t,e,a,o,i,u,c,f;return-1===n.$&&-1===n.d.$&&-1===n.e.$?-1!==n.d.d.$||n.d.d.a?(i=(f=n.e).b,u=f.c,c=f.d,f=f.e,b(j,1,r=n.b,t=n.c,b(j,0,(a=n.d).b,a.c,a.d,a=a.e),b(j,0,i,u,c,f))):(r=n.b,t=n.c,a=(e=n.d).e,i=(o=n.e).b,u=o.c,c=o.d,f=o.e,b(j,0,e.b,e.c,b(j,1,(o=e.d).b,o.c,o.d,o.e),b(j,1,r,t,a,b(j,0,i,u,c,f)))):n}function Ar(n){var r,t,e,a,o,i;return-1===n.$&&-1===n.d.$?(r=n.a,t=n.b,e=n.c,i=(a=n.d).d,o=n.e,1===a.a?-1!==i.$||i.a?-1===(i=wr(n)).$?(n=i.e,b(Bt,i.a,i.b,i.c,Ar(i.d),n)):C:b(j,r,t,e,Ar(a),o):b(j,r,t,e,Ar(a),o)):C}function Cr(n){return{$:4,a:n}}function jr(n){var r=ht(n)<=256;return 0<yr(d(ie,d(fe,ce,d(ue,{aB:!1,aP:!1},"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$")),n))&&r}function Er(n){return function(n){return ye(de({ay:!1,aA:n.aA,aG:n.aG,aI:n.aI,aO:n.aO,a$:n.a$,as:n.as,a2:n.a2}))}({aA:n.aA,aG:n.aG,aI:v,aO:"POST",a$:w,as:w,a2:n.a2})}function Ir(n){return{$:0,a:n}}function Lr(n){return{a:n,b:!0}}function Fr(n){r=h([d(m,"width",Hr(10))]);var r=d(na,J(h([He("animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block"),ra("0 0 24 24"),Xe("none")]),r),h([d(Ke,h([He("opacity-25"),Ye("12"),Ze("12"),Je("10"),Qe("currentColor"),Ve("4")]),v),d(We,h([He("opacity-75"),Xe("currentColor"),Ue("M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z")]),v)])),r=(n=n.A?{a:"bg-[#8a4f97]",b:r,c:!0}:{a:"bg-[#9200B3]",b:N("Sign Me Up"),c:!1}).a,t=n.b,n=n.c;return d(qe,h([d(o,"padding","10px 10px"),d(o,"display","inline-block"),d(o,"border-radius","5px"),d(o,"border-radius","0px 5px 5px 0px"),d(o,"box-shadow","#777 1px 1px 5px"),d(o,"color","white"),R("w-[115px] h-[56px] text-lg"),R(r),d(Ne,"click",dt(je)),Be(n)]),h([t]))}function Rr(n){return d(t,h([R("w-full pr-2")]),h([d(t,h([R("lg:hidden")]),h([da])),d(t,h([R("hidden lg:block w-full")]),h([function(n){return d(sa,h([R("h-full w-full flex justify-end content-center justify-items-center gap-4 mr-4"),R("text-base")]),h([l(G,n,"/feastdayactivities","_self","Activities"),l(G,n,"/saints","_self","Saints"),l(G,n,"/animations","_self","Animations"),l(G,n,"/resources","_self","Resources"),l(G,n,"https://www.etsy.com/shop/CatholicStories","_blank","Shop"),l(G,n,"/give","_self","Give"),l(G,n,"/team","_self","About")]))}(n)]))]))}var vr=e(function(n,r){var t="g";n.aP&&(t+="m"),n.aB&&(t+="i");try{return Br(RegExp(r,t))}catch(n){return w}}),Sr=r(function(n,r,t){for(var e,a=[],o=0,i=t,t=r.lastIndex,u=-1;o++<n&&(e=r.exec(i))&&u!=r.lastIndex;){for(var c=e.length-1,f=Array(c);0<c;){var s=e[c];f[--c]=s?Br(s):w}a.push(l(oe,e[0],e.index,o,h(f))),u=r.lastIndex}return r.lastIndex=t,h(a)}),Nr=1,Gr=0,i=P,Tr=r(function(n,r,t){for(;;){if(-2===t.$)return r;var e=t.d,a=n,o=s(n,t.b,t.c,s(Tr,n,r,t.e));n=a,r=o,t=e}}),Mr=function(n){return s(Tr,r(function(n,r,t){return d(i,{a:n,b:r},t)}),v,n)},zr=2,x=function(n){return{$:1,a:n}},Dr=e(function(n,r){return{$:3,a:n,b:r}}),Or=e(function(n,r){return{$:0,a:n,b:r}}),qr=e(function(n,r){return{$:1,a:n,b:r}}),k=function(n){return{$:0,a:n}},Pr=function(n){return{$:2,a:n}},Br=function(n){return{$:0,a:n}},w={$:1},Kr=vn,Hr=function(n){return n+""},Yr=r(function(n,r,t){for(;;){if(!t.b)return r;var e=t.b,a=n,o=d(n,t.a,r);n=a,r=o,t=e}}),Zr=function(n){return s(Yr,i,v,n)},Ur=n(function(n,r,t,e){return{$:0,a:n,b:r,c:t,d:e}}),Xr=[],Wr=Q,Jr=e(function(n,r){return nn(r)/nn(n)}),Qr=Wr(d(Jr,2,32)),Vr=l(Ur,0,Qr,Xr,Xr),nt=B,rt=V,tt=function(n){return n.length},et=e(function(n,r){return 0<f(n,r)?n:r}),at=K,ot=e(function(n,r){for(;;){var t=d(at,32,n),e=t.b,t=d(i,{$:0,a:t.a},r);if(!e.b)return Zr(t);n=e,r=t}}),it=e(function(n,r){for(;;){var t=Wr(r/32);if(1===t)return d(at,32,n).a;n=d(ot,n,v),r=t}}),ut=e(function(n,r){var t,e;return r.a?(e=rt(d(Jr,32,(t=32*r.a)-1)),n=n?Zr(r.d):r.d,n=d(it,n,r.a),l(Ur,tt(r.c)+t,d(et,5,e*Qr),n,r.c)):l(Ur,tt(r.c),Qr,Xr,r.c)}),ct=z(function(n,r,t,e,a){for(;;){if(r<0)return d(ut,!1,{d:e,a:t/32|0,c:a});var o={$:1,a:s(nt,32,r,n)};n=n,r=r-32,t=t,e=d(i,o,e),a=a}}),ft=e(function(n,r){var t;return 0<n?b(ct,r,n-(t=n%32)-32,n,v,s(nt,t,n-t,r)):Vr}),_=function(n){return!n.$},st=un,dt=function(n){return{$:0,a:n}},lt=function(n){switch(n.$){case 0:return 0;case 1:return 1;case 2:return 2;default:return 3}},bt=function(n){return n},vt=rn,ht=function(n){return n.length},pt=function(n){for(;;)0},u=gn,P=u(0),gt=n(function(n,r,t,e){var a,o,i,u;return e.b?(a=e.a,(e=e.b).b?(o=e.a,(e=e.b).b?(i=e.a,(e=e.b).b?(u=e.b,d(n,a,d(n,o,d(n,i,d(n,e.a,500<t?s(Yr,n,r,Zr(u)):l(gt,n,r,t+1,u)))))):d(n,a,d(n,o,d(n,i,r)))):d(n,a,d(n,o,r))):d(n,a,r)):r}),$t=r(function(n,r,t){return l(gt,n,r,0,t)}),mt=e(function(t,n){return s($t,e(function(n,r){return d(i,t(n),r)}),v,n)}),A=$n,yt=e(function(r,n){return d(A,function(n){return u(r(n))},n)}),xt=r(function(t,n,e){return d(A,function(r){return d(A,function(n){return u(d(t,r,n))},e)},n)}),kt=En,wt=e(function(n,r){return xn(d(A,kt(n),r))}),_t=($.Task={b:P,c:r(function(n,r,t){return d(yt,function(n){return 0},xr(d(mt,wt(n),r)))}),d:r(function(n,r,t){return u(0)}),e:e(function(n,r){return d(yt,n,r)}),f:void 0},Ln("Task")),At=e(function(n,r){return _t(d(yt,n,r))}),vn=dr,Ct={z:"",A:!1,r:""},jt=Fn,Et=jt(v),It=Fn(v),Lt=Rn,Ft=e(function(n,r){return{$:3,a:n,b:r}}),Rt=function(n){return{$:0,a:n}},St=e(function(n,r){return{$:4,a:n,b:r}}),Nt={$:2},Gt=function(n){return{$:1,a:n}},Tt=function(n){return{$:0,a:n}},Mt={$:1},C={$:-2},zt=C,Dt=function(n){return!n.$},Ot=In,qt=U,Pt=e(function(n,r){for(;;){if(-2===r.$)return w;var t=r.c,e=r.d,a=r.e;switch(d(qt,n,r.b)){case 0:n=n,r=e;continue;case 1:return Br(t);default:n=n,r=a;continue}}}),j=z(function(n,r,t,e,a){return{$:-1,a:n,b:r,c:t,d:e,e:a}}),Bt=z(function(n,r,t,e,a){var o,i,u,c;return-1!==a.$||a.a?-1!==e.$||e.a||-1!==e.d.$||e.d.a?b(j,n,r,t,e,a):(o=e.d,c=e.e,b(j,0,e.b,e.c,b(j,1,o.b,o.c,o.d,o.e),b(j,1,r,t,c,a))):(o=a.b,i=a.c,u=a.d,a=a.e,-1!==e.$||e.a?b(j,n,o,i,b(j,0,r,t,e,u),a):b(j,0,r,t,b(j,1,e.b,e.c,e.d,c=e.e),b(j,1,o,i,u,a)))}),Kt=r(function(n,r,t){if(-2===t.$)return b(j,0,n,r,C,C);var e=t.a,a=t.b,o=t.c,i=t.d,u=t.e;switch(d(qt,n,a)){case 0:return b(Bt,e,a,o,s(Kt,n,r,i),u);case 1:return b(j,e,a,r,i,u);default:return b(Bt,e,a,o,i,s(Kt,n,r,u))}}),Ht=r(function(n,r,t){n=s(Kt,n,r,t);return-1!==n.$||n.a?n:b(j,1,n.b,n.c,n.d,n.e)}),Yt=D(function(n,r,t,e,a,o,i){if(-1!==o.$||o.a){for(;;){if(-1!==i.$||1!==i.a)break;if(-1!==i.d.$)return _r(r);if(1===i.d.a)return _r(r);break}return r}return b(j,t,o.b,o.c,o.d,b(j,0,e,a,o.e,i))}),Zt=e(function(n,r){var t,e,a,o,i,u,c;return-2===r.$?C:(t=r.a,a=r.c,o=r.d,i=r.e,f(n,e=r.b)<0?-1===o.$&&1===o.a?-1!==(u=o.d).$||u.a?-1===(u=wr(r)).$?(c=u.e,b(Bt,u.a,u.b,u.c,d(Zt,n,u.d),c)):C:b(j,t,e,a,d(Zt,n,o),i):b(j,t,e,a,d(Zt,n,o),i):d(Ut,n,O(Yt,n,r,t,e,a,o,i)))}),Ut=e(function(n,r){var t,e,a,o,i;return-1===r.$?(t=r.a,e=r.c,a=r.d,o=r.e,Y(n,r=r.b)?-1===(i=function(n){for(;;){if(-1!==n.$||-1!==n.d.$)return n;n=n.d}}(o)).$?b(Bt,t,i.b,i.c,a,Ar(o)):C:b(Bt,t,r,e,a,d(Zt,n,o))):C}),Xt=e(function(n,r){n=d(Zt,n,r);return-1!==n.$||n.a?n:b(j,1,n.b,n.c,n.d,n.e)}),Wt=r(function(n,r,t){r=r(d(Pt,n,t));return r.$?d(Xt,n,t):s(Ht,n,r.a,t)}),Jt=r(function(n,r,t){return r(n(t))}),Qt=e(function(n,r){return s(gr,"",bt,d(Jt,r,n))}),Vt={$:2},ne={$:1},re=e(function(n,r){return r.$?x(n(r.a)):k(r.a)}),te=e(function(n,r){switch(r.$){case 0:return x({$:0,a:r.a});case 1:return x(ne);case 2:return x(Vt);case 3:return x({$:3,a:r.a.aX});default:return d(re,Cr,n(r.b))}}),ee=hn,ae=(Q=ee,Mn(B="gtagReportConversion"),$[B]={e:zn,u:Q,a:Dn},Ln(B)),oe=n(function(n,r,t,e){return{aL:r,aN:n,aQ:t,aZ:e}}),ie=Sr(1/0),ue=vr,ce=/.^/,fe=e(function(n,r){return r.$?n:r.a}),se=function(r){return d(At,pt,{$:2,b:function(n){try{hr.location=r}catch(n){qn.location.reload(!1)}},c:null})},de=function(n){return{$:1,a:n}},le=e(function(n,r){return{al:n,aq:r}}),V=u(d(le,zt,v)),be=function(t){return{$:2,b:function(n){var r=t.f;2===r.$&&r.c&&r.c(),t.f=null,n({$:0,a:X})},c:null}},ve=xn,he=r(function(t,n,e){for(;;){if(!n.b)return u(e);var a,r=n.a,o=n.b;if(r.$)return a=r.a,d(A,function(n){var r=a.as;return s(he,t,o,1===r.$?e:s(Ht,r.a,n,e))},ve(s(pr,t,kt(t),a)));var i=r.a,r=d(Pt,i,e);if(1!==r.$)return d(A,function(n){return s(he,t,o,d(Xt,i,e))},be(r.a));t=t,n=o,e=e}}),K=n(function(n,r,t,e){return d(A,function(n){return u(d(le,n,t))},s(he,n,r,e.al))}),pe=r(function(n,r,t){n=n(r);return n.$?t:d(i,n.a,t)}),ge=e(function(n,r){return s($t,pe(n),v,r)}),$e=n(function(n,r,t,e){var a=e.b;return Y(r,e.a)?Br(d(kt,n,a(t))):w}),un=r(function(n,r,t){return d(A,function(n){return u(t)},xr(d(ge,s($e,n,r.a,r.b),t.aq)))}),rn=e(function(n,r){var t;return r.$?de({ay:(t=r.a).ay,aA:t.aA,aG:d($r,n,t.aG),aI:t.aI,aO:t.aO,a$:t.a$,as:t.as,a2:t.a2}):{$:0,a:r.a}}),me=e(function(n,r){return{$:0,a:n,b:r}}),ye=($.Http={b:V,c:K,d:un,e:rn,f:e(function(n,r){return d(me,r.a,d(Jt,r.b,n))})},Ln("Http")),xe=(Ln("Http"),e(function(n,r){switch(n.$){case 0:return{a:W(r,{z:n.a}),b:Et};case 1:return jr(r.z)?(t=h([{a:"email",b:ee(r.z)}]),t=s(Yr,e(function(n,r){return s(pn,n.a,n.b,r)}),{},t),{a:W(r,{A:!0,r:"Your request is being processed..."}),b:Er({aA:d(mr,"application/json",d(Kr,0,t)),aG:d(Qt,kr,te(k)),a2:"https://api.catholicstoriesforchildren.com/add-contact"})}):{a:W(r,{r:"Error: Please enter a valid email"}),b:Et};default:return n.a.$?{a:W(r,{A:!1,r:"Error: please try again later"}),b:Et}:{a:W(r,{A:!1,r:"Email sent!"}),b:jt(h([ae(""),se("/thankyou")]))}}var t})),En=e(function(n,r){var n=d(xe,n,r.F),t=n.b;return{a:W(r,{F:n.a}),b:d(Lt,bt,t)}}),t=c("div"),o=Yn,a=c("a"),E=e(function(n,r){return d(Zn,n,ee(r))}),ke=E("alt"),F=e(function(n,r){return d(m,function(n){return/^(on|formAction$)/i.test(n)?"data-"+n:n}(n),Un(r))}),R=E("className"),we=c("h1"),S=function(n){return d(E,"href",/^javascript:/i.test((n=n).replace(/\s/g,""))?"":n)},_e=c("img"),Ae=Kn,Ce=function(n){return d(E,"src",Un(n))},N=Pn,je={$:1},Ee=c("input"),Ie=on,Le=function(n){return{$:1,a:n}},Fe=an,Re=d(Fe,"keyCode",tn),Se=Hn,Ne=e(function(n,r){return d(Se,n,{$:0,a:r})}),Ge=e(function(n,r){return d(Se,n,{$:1,a:r})}),P=en,Te=d(e(function(n,r){return s($t,Fe,r,n)}),h(["target","value"]),P),Me=c("p"),ze=E("placeholder"),De=E("type"),Oe=E("value"),qe=c("button"),Pe=hn,Be=e(function(n,r){return d(Zn,n,Pe(r))})("disabled"),dr=Bn("http://www.w3.org/2000/svg"),Ke=dr("circle"),He=m("class"),Ye=m("cx"),Ze=m("cy"),Ue=m("d"),Xe=m("fill"),We=dr("path"),Je=m("r"),Qe=m("stroke"),Ve=m("stroke-width"),na=dr("svg"),ra=m("viewBox"),ta=function(n){return d(t,v,h([d(t,v,h([d(t,h([R("mb-5")]),h([d(Me,h([R("pb-2 pl-1 text-left")]),h([N("Get free animations for kids. Stay updated with new ones!")])),d(t,v,h([d(Ee,h([De("text"),ze("First Name"),d(F,"aria-hidden","true"),d(o,"display","none")]),v),d(Ee,h([De("email"),ze("Email"),Oe(n.z),d(Ge,"input",d(st,Lr,d(st,Ir,Te))),(r=je,d(Ne,"keydown",d(Ie,function(n){return 13===n?dt(r):Le("not ENTER")},Re))),d(F,"required","true"),d(o,"padding","10px 20px"),d(o,"border-radius","5px 0px 0px 5px"),d(o,"box-shadow","#777 1px 1px 5px"),R("w-[172px] md:w-[230px] h-[56px] text-lg")]),v),Fr(n),function(n){return d(t,h([R(d(vt,"Error",n.r)?"text-rose-600":"text-emerald-500"),R("text-left pl-1")]),h([N(n.r)]))}(n)]))]))]))]));var r},ea=d(t,v,h([d(Me,v,h([N("Find links to podcasts, videos, books and more. There are a lot of resources out there for Catholic parents and we are here to help you find them.")]))])),aa=c("h2"),oa=d(t,v,d(mt,function(n){return d(a,h([R("grid grid-cols-[100px_1fr] hover:bg-csc-lightpurple rounded p-7"),S(n.M),d(F,"aria-label",n.K)]),h([d(t,v,h([d(_e,h([Ce(n.L),R("w-20 h-20 object-cover")]),v)])),d(t,v,h([d(aa,v,h([N(n.K)])),d(Me,v,h([N(n.aD)]))]))]))},h([{aD:"Find books here. It's hard to go wrong with a good Catholic book.",L:"https://ik.imagekit.io/catholicstories/Resources_Icons/2_4YvKGvP_Y.png?updatedAt=1679066449106",M:"/resources/books",K:"Books"},{aD:"Find audio podcasts here. Your kids can listen to them while on the road, traveling, while doing coloring activities, or they can be simply enjoyed by themselves.",L:"https://ik.imagekit.io/catholicstories/Resources_Icons/1_EAfo23y5R.png?updatedAt=1679066451335",M:"/resources/podcasts",K:"Podcasts"},{aD:"Find video content here. Videos are a wonderful engaging way to bring a visual representation of the faith into your home.",L:"https://ik.imagekit.io/catholicstories/Resources_Icons/3_mTKsUZQuM.png?updatedAt=1679066450272",M:"/resources/videos",K:"Youtube Channels"},{aD:"Want monthly content at your front door? Check out these wonderful Catholic subscriptions.",L:"https://ik.imagekit.io/catholicstories/Resources_Icons/4_U5qO_iICx.png?updatedAt=1679066449068",M:"/resources/subscriptions",K:"Subscriptions"},{aD:"Find more resources here to help build your prayer life",L:"https://ik.imagekit.io/catholicstories/Resources_Icons/prayerresources_gN76-j6pz.png?updatedAt=1683227269863",M:"/resources/prayer",K:"Prayer Resources"},{aD:"Find activities for feast days throughout the year",L:"https://ik.imagekit.io/catholicstories/Resources_Icons/feastdaycalendar_1__YTmPRisXH.png?updatedAt=1686096632436",M:"/feastdayactivities",K:"Feast Day Activities"},{aD:"Find game resources for a fun way to learn about the Catholic faith",L:"https://ik.imagekit.io/catholicstories/Resources_Icons/Game%20Icon_rb2djF7Hf.png?updatedAt=1693438195519",M:"/resources/games",K:"Games"}]))),ia=d(t,h([R("grid grid-cols-[100px_1fr] rounded py-7")]),h([d(t,v,h([d(_e,h([Ce("https://ik.imagekit.io/catholicstories/Construction_Cone_vLoPMhMZBm.png?updatedAt=1679070884463"),R("w-20 h-20 object-cover")]),v)])),d(t,v,h([d(Me,v,h([N("This page is a work-in-progress. We are working hard on adding resources for you.")]))]))])),Rn=c("footer"),In=c("span"),ua=E("target"),ca=d(Rn,h([d(o,"padding",Hr(30)+"px"),d(o,"background-color","black"),d(o,"color","white"),d(o,"transform-style","preserve-3d")]),h([d(t,h([R("flex items-center gap-2.5")]),h([d(In,v,h([N("Follow us on")])),d(a,h([S("https://www.facebook.com/catholicstoriesforchildren"),d(F,"aria-label","CSC Facebook Page"),ua("_blank")]),h([d(_e,h([R("w-10 h-10"),Ce("https://ik.imagekit.io/catholicstories/f_logo_RGB-Blue_250_3vs-yhXer.png?updatedAt=1684277030198"),ke("Facebook")]),v)])),d(a,h([S("https://www.instagram.com/catholicstoriesforchildren/"),d(F,"aria-label","CSC Instagram Page"),ua("_blank")]),h([d(_e,h([R("w-10 h-10"),Ce("https://ik.imagekit.io/catholicstories/Instagram_Glyph_Gradient_kFoMs9jIr.png?updatedAt=1684277127293"),ke("Instagram")]),v)]))])),d(Me,v,h([N("Copyright © 2024 Catholic Stories for Children. All rights reserved.")])),d(Me,v,h([N("Catholic Stories for Children is a 501(c)(3) non-profit recognized by the IRS. Contributions to Catholic Stories for Children are tax-deductible to the extent permitted by law.  Tax ID Number: 85-4194883")]))])),fa=c("header"),sa=c("nav"),G=n(function(n,r,t,e){return d(a,h([S(r),R("flex items-center justify-center"),R("hover:scale-105 transition ease-in-out"),R("hover:border-b-4 hover:border-[#9101b3]"),R("rounded"),R("h-[60px] h-["+n+"]"),R("p-2"),d(F,"aria-label",e),ua(t)]),h([N(e)]))}),da=d(a,h([S("/navigation"),R("space-y-2"),d(F,"aria-label","menu")]),h([d(t,h([R("w-8 h-0.5 m-auto bg-gray-600")]),v),d(t,h([R("w-8 h-0.5 m-auto bg-gray-600")]),v),d(t,h([R("w-8 h-0.5 m-auto bg-gray-600")]),v)])),la=e(function(n,r){var n=n?{a:"text-[0px] md:text-xl",b:"invisible md:visible"}:{a:"text-lg md:text-xl",b:""},t=n.a,n=n.b;return d(a,h([d(o,"text-decoration","none"),R("colorDarkGray"),R(n),R("justify-self-start"),S("/")]),h([d(we,h([d(o,"font-family","hvdComicSerifPro"),d(o,"margin","0px"),R(t)]),h([N("Catholic Stories for Children")]))]))}),U=d(_e,h([Ce("/assets/logo_solid.svg"),d(o,"height","30px"),ke(""),d(o,"vertical-align","middle")]),v),ba=d(a,h([d(o,"text-decoration","none"),R("colorDarkGray"),S("/"),d(F,"aria-label","home")]),h([U])),va=e(function(n,r){var t="Catholic Stories for Children"===n?{a:"111px",b:Rr,c:"grid-cols-[150px_1fr_150px] lg:grid-cols-[150px_1fr_600px]"}:{a:"60px",b:Rr,c:"grid-cols-[150px_1fr_150px] lg:grid-cols-[150px_1fr_600px]"},e=t.a,a=t.b,t=t.c;return d(fa,h([d(o,"background-color","#3d5d75"),d(o,"background-image","linear-gradient(130deg, #9DE2EB , #EBD6F1)"),R("h-[60px] md:h-["+e+"]"),R("colorDarkGray"),R("grid items-center justify-items-center"),R(t)]),h([ba,d(la,!0,n),a(e)]))}),zn=vn({aM:function(n){return{a:{F:Ct},b:Et}},a_:function(n){return It},a1:En,a3:function(n){return d(t,h([d(o,"height","100vh"),d(o,"overflow-x","hidden"),d(o,"overflow-y","auto"),d(o,"perspective","300px"),d(o,"scroll-behavior","smooth"),d(o,"background-color","#FEF7F4")]),h([d(va,"Resources",10),function(n){return d(t,h([R("max-w-3xl"),R("m-auto"),R("p-5"),R("mb-10")]),h([d(we,h([R("my-10 leading-10")]),h([N("Resources")])),ea,d(a,h([S("/animations/actofcontrition"),R("hover:scale-105 transition ease-in-out duration-50"),d(F,"aria-label","Act of Contrition Animation Coming Soon"),R("block mt-20 mb-2")]),h([d(_e,h([Ce("/assets/images/AnimationImageLinks/ActOfContritionComingSoon.png"),d(o,"border-radius","5px"),d(o,"width","-webkit-fill-available"),ke("Act of Contrition Animation")]),v)])),d(t,h([R("mb-20")]),h([d(Ae,bt,ta(n.F))])),oa,ia]))}(n),ca]))}});Q={Resources:{Main:{init:zn(dt(0))(0)}}},T.Elm?function n(r,t){for(var e in t)e in r?"init"==e?H(6):n(r[e],t[e]):r[e]=t[e]}(T.Elm,Q):T.Elm=Q}(this);