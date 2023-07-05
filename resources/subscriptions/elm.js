!function(R){"use strict";function T(n,r,t){return t.a=n,t.f=r,t}function e(t){return T(2,t,function(r){return function(n){return t(r,n)}})}function r(e){return T(3,e,function(t){return function(r){return function(n){return e(t,r,n)}}})}function n(a){return T(4,a,function(e){return function(t){return function(r){return function(n){return a(e,t,r,n)}}}})}function z(i){return T(5,i,function(a){return function(e){return function(t){return function(r){return function(n){return i(a,e,t,r,n)}}}}})}function q(o){return T(7,o,function(u){return function(i){return function(a){return function(e){return function(t){return function(r){return function(n){return o(u,i,a,e,t,r,n)}}}}}}})}function l(n,r,t){return 2===n.a?n.f(r,t):n(r)(t)}function s(n,r,t,e){return 3===n.a?n.f(r,t,e):n(r)(t)(e)}function d(n,r,t,e,a){return 4===n.a?n.f(r,t,e,a):n(r)(t)(e)(a)}function b(n,r,t,e,a,i){return 5===n.a?n.f(r,t,e,a,i):n(r)(t)(e)(a)(i)}function B(n,r,t,e,a,i,u,o){return 7===n.a?n.f(r,t,e,a,i,u,o):n(r)(t)(e)(a)(i)(u)(o)}var v={$:0};function P(n,r){return{$:1,a:n,b:r}}var O=e(P);function h(n){for(var r=v,t=n.length;t--;)r={$:1,a:n[t],b:r};return r}var K=r(function(n,r,t){for(var e=Array(n),a=0;a<n;a++)e[a]=t(r+a);return e}),D=e(function(n,r){for(var t=Array(n),e=0;e<n&&r.b;e++)t[e]=r.a,r=r.b;return t.length=e,{a:t,b:r}});function H(n){throw Error("https://github.com/elm/core/blob/1.0.0/hints/"+n+".md")}function J(n,r){for(var t,e=[],a=W(n,r,0,e);a&&(t=e.pop());a=W(t.a,t.b,0,e));return a}function W(n,r,t,e){if(n!==r){if("object"!=typeof n||null===n||null===r)return"function"==typeof n&&H(5),!1;if(100<t)e.push({a:n,b:r});else for(var a in n.$<0&&(n=Wr(n),r=Wr(r)),n)if(!W(n[a],r[a],t+1,e))return!1}return!0}function f(n,r,t){if("object"!=typeof n)return n===r?0:n<r?-1:1;if(void 0===n.$)return(t=(t=f(n.a,r.a))||f(n.b,r.b))||f(n.c,r.c);for(;n.b&&r.b&&!(t=f(n.a,r.a));n=n.b,r=r.b);return t||(n.b?1:r.b?-1:0)}var X=e(function(n,r){n=f(n,r);return n<0?Hr:n?Xr:Dr}),U=0;function Z(n,r){var t,e={};for(t in n)e[t]=n[t];for(t in r)e[t]=r[t];return e}function Y(n,r){if("string"==typeof n)return n+r;if(!n.b)return r;var t={$:1,a:n.a,b:r};n=n.b;for(var e=t;n.b;n=n.b)e=e.b={$:1,a:n.a,b:r};return t}var Q=Math.ceil,V=Math.floor,nn=Math.log;var rn=e(function(n,r){return!!~r.indexOf(n)});var tn={$:2,b:function(n){return"number"!=typeof n||(n<=-2147483647||2147483647<=n||(0|n)!==n)&&(!isFinite(n)||n%1)?g("an INT",n):w(n)}},en={$:2,b:function(n){return"string"==typeof n?w(n):n instanceof String?w(n+""):g("a STRING",n)}};var an=e(function(n,r){return{$:6,d:n,b:r}});var un=e(function(n,r){return{$:10,b:r,h:n}});var on=e(function(n,r){return{$:9,f:n,g:[r]}}),cn=e(p);function p(n,r){switch(n.$){case 2:return n.b(r);case 5:return null===r?w(n.c):g("null",r);case 3:return sn(r)?fn(n.b,r,h):g("a LIST",r);case 4:return sn(r)?fn(n.b,r,ln):g("an ARRAY",r);case 6:var t=n.d;return"object"==typeof r&&null!==r&&t in r?(i=p(n.b,r[t]),_(i)?i:y(l(Zr,t,i.a))):g("an OBJECT with a field named `"+t+"`",r);case 7:t=n.e;return sn(r)?t<r.length?(i=p(n.b,r[t]),_(i)?i:y(l(Yr,t,i.a))):g("a LONGER array. Need index "+t+" but only see "+r.length+" entries",r):g("an ARRAY",r);case 8:if("object"!=typeof r||null===r||sn(r))return g("an OBJECT",r);var e,a=v;for(e in r)if(r.hasOwnProperty(e)){var i=p(n.b,r[e]);if(!_(i))return y(l(Zr,e,i.a));a={$:1,a:{a:e,b:i.a},b:a}}return w(et(a));case 9:for(var u=n.f,o=n.g,c=0;c<o.length;c++){i=p(o[c],r);if(!_(i))return i;u=u(i.a)}return w(u);case 10:i=p(n.b,r);return _(i)?p(n.h(i.a),r):i;case 11:for(var f=v,s=n.g;s.b;s=s.b){i=p(s.a,r);if(_(i))return i;f={$:1,a:i.a,b:f}}return y(Qr(et(f)));case 1:return y(l(Ur,n.a,r));case 0:return w(n.a)}}function fn(n,r,t){for(var e=r.length,a=Array(e),i=0;i<e;i++){var u=p(n,r[i]);if(!_(u))return y(l(Yr,i,u.a));a[i]=u.a}return w(t(a))}function sn(n){return Array.isArray(n)||"undefined"!=typeof FileList&&n instanceof FileList}function ln(r){return l(mt,r.length,function(n){return r[n]})}function g(n,r){return y(l(Ur,"Expecting "+n,r))}function dn(n,r){if(n===r)return!0;if(n.$!==r.$)return!1;switch(n.$){case 0:case 1:return n.a===r.a;case 2:return n.b===r.b;case 5:return n.c===r.c;case 3:case 4:case 8:return dn(n.b,r.b);case 6:return n.d===r.d&&dn(n.b,r.b);case 7:return n.e===r.e&&dn(n.b,r.b);case 9:return n.f===r.f&&bn(n.g,r.g);case 10:return n.h===r.h&&dn(n.b,r.b);case 11:return bn(n.g,r.g)}}function bn(n,r){var t=n.length;if(t!==r.length)return!1;for(var e=0;e<t;e++)if(!dn(n[e],r[e]))return!1;return!0}var vn=e(function(n,r){return JSON.stringify(r,null,n)+""});function hn(n){return n}var pn=r(function(n,r,t){return t[n]=r,t});function gn(n){return{$:0,a:n}}var $n=e(function(n,r){return{$:3,b:n,d:r}});var mn=0;function xn(n){n={$:0,e:mn++,f:n,g:null,h:[]};return Cn(n),n}function yn(r){return{$:2,b:function(n){n({$:0,a:xn(r)})},c:null}}function wn(n,r){n.h.push(r),Cn(n)}var kn=e(function(r,t){return{$:2,b:function(n){wn(r,t),n({$:0,a:U})},c:null}});var _n=!1,An=[];function Cn(n){if(An.push(n),!_n){for(_n=!0;n=An.shift();)!function(r){for(;r.f;){var n=r.f.$;if(0===n||1===n){for(;r.g&&r.g.$!==n;)r.g=r.g.i;if(!r.g)return;r.f=r.g.b(r.f.a),r.g=r.g.i}else{if(2===n)return r.f.c=r.f.b(function(n){r.f=n,Cn(r)});if(5===n){if(0===r.h.length)return;r.f=r.f.b(r.h.shift())}else r.g={$:3===n?0:1,b:r.f.b,i:r.g},r.f=r.f.d}}}(n);_n=!1}}function En(n,r,t,e,a,i){var n=l(cn,n,r?r.flags:void 0),u=(_(n)||H(2),{}),r=t(n.a),o=r.a,c=i(f,o),t=function(n,r){var t,e;for(e in $){var a=$[e];a.a&&((t=t||{})[e]=a.a(e,r)),n[e]=function(n,r){var e={g:r,h:void 0},a=n.c,i=n.d,u=n.e,o=n.f;function c(t){return l($n,c,{$:5,b:function(n){var r=n.a;return 0===n.$?s(i,e,r,t):u&&o?d(a,e,r.i,r.j,t):s(a,e,u?r.i:r.j,t)}})}return e.h=xn(l($n,c,n.b))}(a,r)}return t}(u,f);function f(n,r){n=l(e,n,o);c(o=n.a,r),Sn(u,n.b,a(o))}return Sn(u,r.b,a(o)),t?{ports:t}:{}}var $={};var jn=e(function(r,t){return{$:2,b:function(n){r.g(t),n({$:0,a:U})},c:null}}),Mn=e(function(n,r){return l(kn,n.h,{$:0,a:r})});function Ln(r){return function(n){return{$:1,k:r,l:n}}}function Fn(n){return{$:2,m:n}}var t=e(function(n,r){return{$:3,n:n,o:r}}),In=[],Nn=!1;function Sn(n,r,t){if(In.push({p:n,q:r,r:t}),!Nn){Nn=!0;for(var e;e=In.shift();)!function(n,r,t){var e,a={};for(e in Gn(!0,r,a,null),Gn(!1,t,a,null),n)wn(n[e],{$:"fx",a:a[e]||{i:v,j:v}})}(e.p,e.q,e.r);Nn=!1}}function Gn(n,r,t,e){switch(r.$){case 1:var a=r.k,i=function(n,r,t,e){function a(n){for(var r=t;r;r=r.t)n=r.s(n);return n}return l(n?$[r].e:$[r].f,a,e)}(n,a,e,r.l);return void(t[a]=function(n,r,t){return t=t||{i:v,j:v},n?t.i={$:1,a:r,b:t.i}:t.j={$:1,a:r,b:t.j},t}(n,i,t[a]));case 2:for(var u=r.m;u.b;u=u.b)Gn(n,u.a,t,e);return;case 3:Gn(n,r.o,t,{s:r.n,t:e})}}function Rn(n){$[n]&&H(3)}var Tn=e(function(n,r){return r});function zn(n){var t,u=[],o=$[n].u,c=(t=0,{$:2,b:function(n){var r=setTimeout(function(){n({$:0,a:U})},t);return function(){clearTimeout(r)}},c:null});return $[n].b=c,$[n].c=r(function(n,r,t){for(;r.b;r=r.b)for(var e=u,a=o(r.a),i=0;i<e.length;i++)e[i](a);return c}),{subscribe:function(n){u.push(n)},unsubscribe:function(n){(n=(u=u.slice()).indexOf(n))<0||u.splice(n,1)}}}var qn;var Bn="undefined"!=typeof document?document:{};function Pn(n){return{$:0,a:n}}var On=e(function(i,u){return e(function(n,r){for(var t=[],e=0;r.b;r=r.b){var a=r.a;e+=a.b||0,t.push(a)}return e+=t.length,{$:1,c:u,d:Yn(n),e:t,f:i,b:e}})}),c=On(void 0),Kn=e(function(i,u){return e(function(n,r){for(var t=[],e=0;r.b;r=r.b){var a=r.a;e+=a.b.b||0,t.push(a)}return e+=t.length,{$:2,c:u,d:Yn(n),e:t,f:i,b:e}})})(void 0);var Dn=e(function(n,r){return{$:4,j:n,k:r,b:1+(r.b||0)}});var Hn=e(function(n,r){return{$:"a0",n:n,o:r}}),Jn=e(function(n,r){return{$:"a1",n:n,o:r}}),Wn=e(function(n,r){return{$:"a2",n:n,o:r}}),m=e(function(n,r){return{$:"a3",n:n,o:r}});function Xn(n){return"script"==n?"p":n}function Un(n){return/^\s*(javascript:|data:text\/html)/i.test(n)?"":n}var Zn;function Yn(n){for(var r={};n.b;n=n.b){var t,e=n.a,a=e.$,i=e.n,e=e.o;"a2"===a?"className"===i?Qn(r,i,e):r[i]=e:(t=r[a]||(r[a]={}),"a3"===a&&"class"===i?Qn(t,i,e):t[i]=e)}return r}function Qn(n,r,t){var e=n[r];n[r]=e?e+" "+t:t}function x(n,r){var t=n.$;if(5===t)return x(n.k||(n.k=n.m()),r);if(0===t)return Bn.createTextNode(n.a);if(4===t){for(var e=n.k,a=n.j;4===e.$;)"object"!=typeof a?a=[a,e.j]:a.push(e.j),e=e.k;var i={j:a,p:r};(u=x(e,i)).elm_event_node_ref=i}else if(3===t)Vn(u=n.h(n.g),r,n.d);else{var u=n.f?Bn.createElementNS(n.f,n.c):Bn.createElement(n.c);qn&&"a"==n.c&&u.addEventListener("click",qn(u)),Vn(u,r,n.d);for(var o=n.e,c=0;c<o.length;c++)u.appendChild(x(1===t?o[c]:o[c].b,r))}return u}function Vn(n,r,t){for(var e in t){var a=t[e];"a1"===e?function(n,r){var t,e=n.style;for(t in r)e[t]=r[t]}(n,a):"a0"===e?function(n,r,t){var e,a=n.elmFs||(n.elmFs={});for(e in t){var i=t[e],u=a[e];if(i){if(u){if(u.q.$===i.$){u.q=i;continue}n.removeEventListener(e,u)}u=function(c,n){function f(n){var r=f.q,t=p(r.a,n);if(_(t)){for(var e,r=wt(r),t=t.a,a=r?r<3?t.a:t.r:t,i=1==r?t.b:3==r&&t.S,u=(i&&n.stopPropagation(),(2==r?t.b:3==r&&t.P)&&n.preventDefault(),c);e=u.j;){if("function"==typeof e)a=e(a);else for(var o=e.length;o--;)a=e[o](a);u=u.p}u(a,i)}}return f.q=n,f}(r,i),n.addEventListener(e,u,Zn&&{passive:wt(i)<2}),a[e]=u}else n.removeEventListener(e,u),a[e]=void 0}}(n,r,a):"a3"===e?function(n,r){for(var t in r){var e=r[t];void 0!==e?n.setAttribute(t,e):n.removeAttribute(t)}}(n,a):"a4"===e?function(n,r){for(var t in r){var e=r[t],a=e.f,e=e.o;void 0!==e?n.setAttributeNS(a,t,e):n.removeAttributeNS(a,t)}}(n,a):("value"!==e&&"checked"!==e||n[e]!==a)&&(n[e]=a)}}try{window.addEventListener("t",null,Object.defineProperty({},"passive",{get:function(){Zn=!0}}))}catch(n){}function nr(n,r){var t=[];return L(n,r,t,0),t}function M(n,r,t,e){r={$:r,r:t,s:e,t:void 0,u:void 0};return n.push(r),r}function L(n,r,t,e){if(n!==r){var a=n.$,i=r.$;if(a!==i){if(1!==a||2!==i)return void M(t,0,e,r);r=function(n){for(var r=n.e,t=r.length,e=Array(t),a=0;a<t;a++)e[a]=r[a].b;return{$:1,c:n.c,d:n.d,e:e,f:n.f,b:n.b}}(r),i=1}switch(i){case 5:for(var u=n.l,o=r.l,c=u.length,f=c===o.length;f&&c--;)f=u[c]===o[c];if(f)return void(r.k=n.k);r.k=r.m();var s=[];return L(n.k,r.k,s,0),void(0<s.length&&M(t,1,e,s));case 4:for(var l=n.j,d=r.j,b=!1,v=n.k;4===v.$;)b=!0,"object"!=typeof l?l=[l,v.j]:l.push(v.j),v=v.k;for(var h=r.k;4===h.$;)b=!0,"object"!=typeof d?d=[d,h.j]:d.push(h.j),h=h.k;return b&&l.length!==d.length?void M(t,0,e,r):((b?function(n,r){for(var t=0;t<n.length;t++)if(n[t]!==r[t])return;return 1}(l,d):l===d)||M(t,2,e,d),void L(v,h,t,e+1));case 0:return void(n.a!==r.a&&M(t,3,e,r.a));case 1:return void rr(n,r,t,e,er);case 2:return void rr(n,r,t,e,ar);case 3:if(n.h!==r.h)return void M(t,0,e,r);s=tr(n.d,r.d),s=(s&&M(t,4,e,s),r.i(n.g,r.g));s&&M(t,5,e,s)}}}function rr(n,r,t,e,a){var i;n.c!==r.c||n.f!==r.f?M(t,0,e,r):((i=tr(n.d,r.d))&&M(t,4,e,i),a(n,r,t,e))}function tr(n,r,t){var e,a,i,u,o;for(a in n)"a1"===a||"a0"===a||"a3"===a||"a4"===a?(i=tr(n[a],r[a]||{},a))&&((e=e||{})[a]=i):a in r?(i=n[a])===(u=r[a])&&"value"!==a&&"checked"!==a||"a0"===t&&function(n,r){return n.$==r.$&&dn(n.a,r.a)}(i,u)||((e=e||{})[a]=u):(e=e||{})[a]=t?"a1"===t?"":"a0"===t||"a3"===t?void 0:{f:n[a].f,o:void 0}:"string"==typeof n[a]?"":null;for(o in r)o in n||((e=e||{})[o]=r[o]);return e}function er(n,r,t,e){var a=n.e,i=r.e,n=a.length,r=i.length;r<n?M(t,6,e,{v:r,i:n-r}):n<r&&M(t,7,e,{v:n,e:i});for(var u=n<r?n:r,o=0;o<u;o++){var c=a[o];L(c,i[o],t,++e),e+=c.b||0}}function ar(n,r,t,e){for(var a=[],i={},u=[],o=n.e,c=r.e,f=o.length,s=c.length,l=0,d=0,b=e;l<f&&d<s;){var v=o[l],h=c[d],p=v.a,g=h.a,$=v.b,m=h.b,x=void 0,y=void 0;if(p===g)L($,m,a,++b),b+=$.b||0,l++,d++;else{var w,k,_,A,C=o[l+1],E=c[d+1];if(C&&(k=C.b,y=g===(w=C.a)),E&&(A=E.b,x=p===(_=E.a)),x&&y)L($,A,a,++b),ur(i,a,p,m,d,u),b+=$.b||0,or(i,a,p,k,++b),b+=k.b||0,l+=2,d+=2;else if(x)b++,ur(i,a,g,m,d,u),L($,A,a,b),b+=$.b||0,l+=1,d+=2;else if(y)or(i,a,p,$,++b),b+=$.b||0,L(k,m,a,++b),b+=k.b||0,l+=2,d+=1;else{if(!C||w!==_)break;or(i,a,p,$,++b),ur(i,a,g,m,d,u),b+=$.b||0,L(k,A,a,++b),b+=k.b||0,l+=2,d+=2}}}for(;l<f;){$=(v=o[l]).b;or(i,a,v.a,$,++b),b+=$.b||0,l++}for(;d<s;){var j=j||[];ur(i,a,(h=c[d]).a,h.b,void 0,j),d++}(0<a.length||0<u.length||j)&&M(t,8,e,{w:a,x:u,y:j})}var ir="_elmW6BL";function ur(n,r,t,e,a,i){var u,o=n[t];o?1===o.c?(i.push({r:a,A:o}),o.c=2,L(o.z,e,u=[],o.r),o.r=a,o.s.s={w:u,A:o}):ur(n,r,t+ir,e,a,i):(i.push({r:a,A:o={c:0,z:e,r:a,s:void 0}}),n[t]=o)}function or(n,r,t,e,a){var i,u=n[t];u?0===u.c?(u.c=2,L(e,u.z,i=[],a),M(r,9,a,{w:i,A:u})):or(n,r,t+ir,e,a):(i=M(r,9,a,void 0),n[t]={c:1,z:e,r:a,s:i})}function cr(n,r,t,e){!function n(r,t,e,a,i,u,o){var c=e[a];var f=c.r;for(;f===i;){var s,l=c.$;if(1===l?cr(r,t.k,c.s,o):8===l?(c.t=r,c.u=o,0<(s=c.s.w).length&&n(r,t,s,0,i,u,o)):9===l?(c.t=r,c.u=o,(l=c.s)&&(l.A.s=r,0<(s=l.w).length)&&n(r,t,s,0,i,u,o)):(c.t=r,c.u=o),!(c=e[++a])||(f=c.r)>u)return a}var d=t.$;if(4===d){for(var b=t.k;4===b.$;)b=b.k;return n(r,b,e,a,i+1,u,r.elm_event_node_ref)}var v=t.e;var h=r.childNodes;for(var p=0;p<v.length;p++){var g=1===d?v[p]:v[p].b,$=++i+(g.b||0);if(i<=f&&f<=$&&(a=n(h[p],g,e,a,i,$,o),!(c=e[a])||(f=c.r)>u))return a;i=$}return a}(n,r,t,0,0,r.b,e)}function fr(n,r,t,e){return 0===t.length?n:(cr(n,r,t,e),sr(n,t))}function sr(n,r){for(var t=0;t<r.length;t++){var e=r[t],a=e.t,e=function(n,r){switch(r.$){case 0:return function(n,r,t){var e=n.parentNode,r=x(r,t);r.elm_event_node_ref||(r.elm_event_node_ref=n.elm_event_node_ref);e&&r!==n&&e.replaceChild(r,n);return r}(n,r.s,r.u);case 4:return Vn(n,r.u,r.s),n;case 3:return n.replaceData(0,n.length,r.s),n;case 1:return sr(n,r.s);case 2:return n.elm_event_node_ref?n.elm_event_node_ref.j=r.s:n.elm_event_node_ref={j:r.s,p:r.u},n;case 6:for(var t=r.s,e=0;e<t.i;e++)n.removeChild(n.childNodes[t.v]);return n;case 7:for(var a=(t=r.s).e,e=t.v,i=n.childNodes[e];e<a.length;e++)n.insertBefore(x(a[e],r.u),i);return n;case 9:var u;return(t=r.s)?(void 0!==(u=t.A).r&&n.parentNode.removeChild(n),u.s=sr(n,t.w)):n.parentNode.removeChild(n),n;case 8:return function(n,r){for(var t=r.s,e=function(n,r){if(n){for(var t=Bn.createDocumentFragment(),e=0;e<n.length;e++){var a=n[e].A;t.appendChild(2===a.c?a.s:x(a.z,r.u))}return t}}(t.y,r),a=(n=sr(n,t.w),t.x),i=0;i<a.length;i++){var u=a[i],o=u.A,o=2===o.c?o.s:x(o.z,r.u);n.insertBefore(o,n.childNodes[u.r])}e&&n.appendChild(e);return n}(n,r);case 5:return r.s(n);default:H(10)}}(a,e);a===n&&(n=e)}return n}function lr(n){if(3===n.nodeType)return{$:0,a:n.textContent};if(1!==n.nodeType)return{$:0,a:""};for(var r=v,t=n.attributes,e=t.length;e--;)var a=t[e],r={$:1,a:l(m,a.name,a.value),b:r};for(var i=n.tagName.toLowerCase(),u=v,o=n.childNodes,e=o.length;e--;)u={$:1,a:lr(o[e]),b:u};return s(c,i,r,u)}var dr=n(function(r,n,t,u){return En(n,u,r.aM,r.a1,r.a_,function(t,n){var e=r.a3,a=u.node,i=lr(a);return vr(n,function(n){var n=e(n),r=nr(i,n);a=fr(a,i,r,t),i=n})})}),br="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:function(n){return setTimeout(n,1e3/60)};function vr(t,e){e(t);var a=0;function i(){a=1===a?0:(br(i),e(t),1)}return function(n,r){t=n,r?(e(t),2===a&&(a=1)):(0===a&&br(i),a=2)}}var hr={addEventListener:function(){},removeEventListener:function(){}},pr="undefined"!=typeof window?window:hr;var gr=r(function(e,a,i){return{$:2,b:function(r){function t(n){r(a(i.aG.a(n)))}var n=new XMLHttpRequest;n.addEventListener("error",function(){t(Kt)}),n.addEventListener("timeout",function(){t(Jt)}),n.addEventListener("load",function(){t(function(n,r){return l(200<=r.status&&r.status<300?Ot:Bt,function(n){return{a2:n.responseURL,aX:n.status,aY:n.statusText,aI:function(n){if(!n)return Wt;for(var r=Wt,t=n.split("\r\n"),e=t.length;e--;){var a,i,u=t[e],o=u.indexOf(": ");0<o&&(a=u.substring(0,o),i=u.substring(2+o),r=s(ie,a,function(n){return Vr(Xt(n)?i+", "+n.a:i)},r))}return r}(n.getAllResponseHeaders())}}(r),n(r.response))}(i.aG.b,n))}),Xt(i.as)&&function(r,t,e){t.upload.addEventListener("progress",function(n){t.c||xn(l(Ut,r,{a:e,b:Ht({aW:n.loaded,ap:n.total})}))}),t.addEventListener("progress",function(n){t.c||xn(l(Ut,r,{a:e,b:Dt({aU:n.loaded,ap:n.lengthComputable?Vr(n.total):k})}))})}(e,n,i.as.a);try{n.open(i.aO,i.a2,!0)}catch(n){return t(Pt(i.a2))}return function(n,r){for(var t=r.aI;t.b;t=t.b)n.setRequestHeader(t.a.a,t.a.b);n.timeout=r.a$.a||0,n.responseType=r.aG.d,n.withCredentials=r.ay}(n,i),i.aA.a&&n.setRequestHeader("Content-Type",i.aA.a),n.send(i.aA.b),function(){n.c=!0,n.abort()}},c:null}});var $r=r(function(n,r,t){return{$:0,d:n,b:r,a:t}}),mr=e(function(r,t){return{$:0,d:t.d,b:t.b,a:function(n){return r(t.a(n))}}});var xr=e(function(n,r){return{$:0,a:n,b:r}});function yr(n){return s(tt,e(function(n,r){return r+1}),0,n)}function wr(n){return s(jt,Lt(u),o(v),n)}function kr(n){return{$:2,a:n}}function _r(n){var r,t,e,a,i,u,o,c;return-1===n.$&&-1===n.d.$&&-1===n.e.$?-1!==n.e.d.$||n.e.d.a?(e=(c=n.e).b,a=c.c,i=c.d,c=c.e,b(E,1,n.b,n.c,b(E,0,(r=n.d).b,r.c,r.d,r.e),b(E,0,e,a,i,c))):(e=(t=n.e).b,a=t.c,u=(i=t.d).d,o=i.e,c=t.e,b(E,0,i.b,i.c,b(E,1,n.b,n.c,b(E,0,(r=n.d).b,r.c,r.d,r.e),u),b(E,1,e,a,o,c))):n}function Ar(n){var r,t,e,a,i,u,o,c,f;return-1===n.$&&-1===n.d.$&&-1===n.e.$?-1!==n.d.d.$||n.d.d.a?(u=(f=n.e).b,o=f.c,c=f.d,f=f.e,b(E,1,r=n.b,t=n.c,b(E,0,(a=n.d).b,a.c,a.d,a=a.e),b(E,0,u,o,c,f))):(r=n.b,t=n.c,a=(e=n.d).e,u=(i=n.e).b,o=i.c,c=i.d,f=i.e,b(E,0,e.b,e.c,b(E,1,(i=e.d).b,i.c,i.d,i.e),b(E,1,r,t,a,b(E,0,u,o,c,f)))):n}function Cr(n){var r,t,e,a,i,u;return-1===n.$&&-1===n.d.$?(r=n.a,t=n.b,e=n.c,u=(a=n.d).d,i=n.e,1===a.a?-1!==u.$||u.a?-1===(u=_r(n)).$?(n=u.e,b(Qt,u.a,u.b,u.c,Cr(u.d),n)):C:b(E,r,t,e,Cr(a),i):b(E,r,t,e,Cr(a),i)):C}function Er(n){return{$:4,a:n}}function jr(n){var r=At(n)<=256;return 0<yr(l(he,l($e,ge,l(pe,{aB:!1,aP:!1},"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$")),n))&&r}function Mr(n){return function(n){return Me(xe({ay:!1,aA:n.aA,aG:n.aG,aI:n.aI,aO:n.aO,a$:n.a$,as:n.as,a2:n.a2}))}({aA:n.aA,aG:n.aG,aI:v,aO:"POST",a$:k,as:k,a2:n.a2})}function Lr(n){switch(n.$){case 0:return l(Fe,n.a,n.b);case 1:return l(Te,n.a,de(n.b));case 2:return l(Te,n.a,Ie(n.b));case 3:return l(Te,n.a,n.b);case 4:return l(j,n.a,n.b);default:switch(n.b.$){case 0:return l(Ge,n.a,n.b.a);case 1:return l(ze,n.a,n.b.a);case 2:return l(Re,n.a,n.b.a);default:return l(Se,n.a,n.b.a)}}}function Fr(n){return c(Xn(n))}function Ir(n){return Kn(Xn(n))}function Nr(n){if(n.$)return F(n.a);var r=n.a,t=n.b,e=n.c;switch(e.$){case 0:return s(Fr,r,l(i,Lr,t),v);case 1:var a=e.a;return s(Fr,r,l(i,Lr,t),l(i,Nr,a));default:a=e.a;return s(Ir,r,l(i,Lr,t),l(i,qe(Nr),a))}}function Sr(n){return{$:0,a:n}}function Gr(n){return{a:n,b:!0}}function Rr(n){return l(Pe,"src",Un(n))}function Tr(n){r=h([l(m,"width",rt(10))]);var r=l(va,Y(h([ia("animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block"),ha("0 0 24 24"),fa("none")]),r),h([l(aa,h([ia("opacity-25"),ua("12"),oa("12"),la("10"),da("currentColor"),ba("4")]),v),l(sa,h([ia("opacity-75"),fa("currentColor"),ca("M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z")]),v)])),r=(n=n.A?{a:"bg-[#8a4f97]",b:r,c:!0}:{a:"bg-[#9200B3]",b:F("Sign Me Up"),c:!1}).a,t=n.b,n=n.c;return l(ta,h([l(j,"padding","10px 10px"),l(j,"display","inline-block"),l(j,"border-radius","5px"),l(j,"border-radius","0px 5px 5px 0px"),l(j,"box-shadow","#777 1px 1px 5px"),l(j,"color","white"),I("w-[115px] h-[56px] text-lg"),I(r),l(Ge,"click",yt(De)),ea(n)]),h([t]))}function zr(n){return l(Aa,"alt",n)}function qr(n){return l(Aa,"href",n)}function Br(n){return l(Aa,"src",n)}function Pr(n){return l(Aa,"target",n)}function Or(n){return l(Ea,h([S("w-full")]),h([l(Ea,h([S("lg:hidden")]),h([Sa])),l(Ea,h([S("hidden lg:block w-full")]),h([function(n){return l(Ia,h([S("h-full w-full grid grid-cols-6 content-center justify-items-center")]),h([d(Na,n,"/animations","_self","Animations"),d(Na,n,"https://www.etsy.com/shop/CatholicStories","_blank","Shop"),d(Na,n,"/resources","_self","Resources"),d(Na,n,"/contact","_self","Contact"),d(Na,n,"/give","_self","Give"),d(Na,n,"/team","_self","About Us")]))}(n)]))]))}var hr=e(function(n,r){var t="g";n.aP&&(t+="m"),n.aB&&(t+="i");try{return Vr(RegExp(r,t))}catch(n){return k}}),Kr=r(function(n,r,t){for(var e,a=[],i=0,u=t,t=r.lastIndex,o=-1;i++<n&&(e=r.exec(u))&&o!=r.lastIndex;){for(var c=e.length-1,f=Array(c);0<c;){var s=e[c];f[--c]=s?Vr(s):k}a.push(d(ve,e[0],e.index,i,h(f))),o=r.lastIndex}return r.lastIndex=t,h(a)}),Dr=1,Hr=0,u=O,Jr=r(function(n,r,t){for(;;){if(-2===t.$)return r;var e=t.d,a=n,i=s(n,t.b,t.c,s(Jr,n,r,t.e));n=a,r=i,t=e}}),Wr=function(n){return s(Jr,r(function(n,r,t){return l(u,{a:n,b:r},t)}),v,n)},Xr=2,y=function(n){return{$:1,a:n}},Ur=e(function(n,r){return{$:3,a:n,b:r}}),Zr=e(function(n,r){return{$:0,a:n,b:r}}),Yr=e(function(n,r){return{$:1,a:n,b:r}}),w=function(n){return{$:0,a:n}},Qr=function(n){return{$:2,a:n}},Vr=function(n){return{$:0,a:n}},k={$:1},nt=vn,rt=function(n){return n+""},tt=r(function(n,r,t){for(;;){if(!t.b)return r;var e=t.b,a=n,i=l(n,t.a,r);n=a,r=i,t=e}}),et=function(n){return s(tt,u,v,n)},at=n(function(n,r,t,e){return{$:0,a:n,b:r,c:t,d:e}}),it=[],ut=Q,ot=e(function(n,r){return nn(r)/nn(n)}),ct=ut(l(ot,2,32)),ft=d(at,0,ct,it,it),st=K,lt=V,dt=function(n){return n.length},bt=e(function(n,r){return 0<f(n,r)?n:r}),vt=D,ht=e(function(n,r){for(;;){var t=l(vt,32,n),e=t.b,t=l(u,{$:0,a:t.a},r);if(!e.b)return et(t);n=e,r=t}}),pt=e(function(n,r){for(;;){var t=ut(r/32);if(1===t)return l(vt,32,n).a;n=l(ht,n,v),r=t}}),gt=e(function(n,r){var t,e;return r.a?(e=lt(l(ot,32,(t=32*r.a)-1)),n=n?et(r.d):r.d,n=l(pt,n,r.a),d(at,dt(r.c)+t,l(bt,5,e*ct),n,r.c)):d(at,dt(r.c),ct,it,r.c)}),$t=z(function(n,r,t,e,a){for(;;){if(r<0)return l(gt,!1,{d:e,a:t/32|0,c:a});var i={$:1,a:s(st,32,r,n)};n=n,r=r-32,t=t,e=l(u,i,e),a=a}}),mt=e(function(n,r){var t;return 0<n?b($t,r,n-(t=n%32)-32,n,v,s(st,t,n-t,r)):ft}),_=function(n){return!n.$},xt=on,yt=function(n){return{$:0,a:n}},wt=function(n){switch(n.$){case 0:return 0;case 1:return 1;case 2:return 2;default:return 3}},kt=function(n){return n},_t=rn,At=function(n){return n.length},Ct=function(n){for(;;)0},o=gn,O=o(0),Et=n(function(n,r,t,e){var a,i,u,o;return e.b?(a=e.a,(e=e.b).b?(i=e.a,(e=e.b).b?(u=e.a,(e=e.b).b?(o=e.b,l(n,a,l(n,i,l(n,u,l(n,e.a,500<t?s(tt,n,r,et(o)):d(Et,n,r,t+1,o)))))):l(n,a,l(n,i,l(n,u,r)))):l(n,a,l(n,i,r))):l(n,a,r)):r}),jt=r(function(n,r,t){return d(Et,n,r,0,t)}),i=e(function(t,n){return s(jt,e(function(n,r){return l(u,t(n),r)}),v,n)}),A=$n,Mt=e(function(r,n){return l(A,function(n){return o(r(n))},n)}),Lt=r(function(t,n,e){return l(A,function(r){return l(A,function(n){return o(l(t,r,n))},e)},n)}),Ft=jn,It=e(function(n,r){return yn(l(A,Ft(n),r))}),Nt=($.Task={b:O,c:r(function(n,r,t){return l(Mt,function(n){return 0},wr(l(i,It(n),r)))}),d:r(function(n,r,t){return o(0)}),e:e(function(n,r){return l(Mt,n,r)}),f:void 0},Ln("Task")),St=e(function(n,r){return Nt(l(Mt,n,r))}),vn=dr,Gt={z:"",A:!1,r:""},Rt=Fn,Tt=Rt(v),zt=Fn(v),qt=t,Bt=e(function(n,r){return{$:3,a:n,b:r}}),Pt=function(n){return{$:0,a:n}},Ot=e(function(n,r){return{$:4,a:n,b:r}}),Kt={$:2},Dt=function(n){return{$:1,a:n}},Ht=function(n){return{$:0,a:n}},Jt={$:1},C={$:-2},Wt=C,Xt=function(n){return!n.$},Ut=Mn,Zt=X,Yt=e(function(n,r){for(;;){if(-2===r.$)return k;var t=r.c,e=r.d,a=r.e;switch(l(Zt,n,r.b)){case 0:n=n,r=e;continue;case 1:return Vr(t);default:n=n,r=a;continue}}}),E=z(function(n,r,t,e,a){return{$:-1,a:n,b:r,c:t,d:e,e:a}}),Qt=z(function(n,r,t,e,a){var i,u,o,c;return-1!==a.$||a.a?-1!==e.$||e.a||-1!==e.d.$||e.d.a?b(E,n,r,t,e,a):(i=e.d,c=e.e,b(E,0,e.b,e.c,b(E,1,i.b,i.c,i.d,i.e),b(E,1,r,t,c,a))):(i=a.b,u=a.c,o=a.d,a=a.e,-1!==e.$||e.a?b(E,n,i,u,b(E,0,r,t,e,o),a):b(E,0,r,t,b(E,1,e.b,e.c,e.d,c=e.e),b(E,1,i,u,o,a)))}),Vt=r(function(n,r,t){if(-2===t.$)return b(E,0,n,r,C,C);var e=t.a,a=t.b,i=t.c,u=t.d,o=t.e;switch(l(Zt,n,a)){case 0:return b(Qt,e,a,i,s(Vt,n,r,u),o);case 1:return b(E,e,a,r,u,o);default:return b(Qt,e,a,i,u,s(Vt,n,r,o))}}),ne=r(function(n,r,t){n=s(Vt,n,r,t);return-1!==n.$||n.a?n:b(E,1,n.b,n.c,n.d,n.e)}),re=q(function(n,r,t,e,a,i,u){if(-1!==i.$||i.a){for(;;){if(-1!==u.$||1!==u.a)break;if(-1!==u.d.$)return Ar(r);if(1===u.d.a)return Ar(r);break}return r}return b(E,t,i.b,i.c,i.d,b(E,0,e,a,i.e,u))}),te=e(function(n,r){var t,e,a,i,u,o,c;return-2===r.$?C:(t=r.a,a=r.c,i=r.d,u=r.e,f(n,e=r.b)<0?-1===i.$&&1===i.a?-1!==(o=i.d).$||o.a?-1===(o=_r(r)).$?(c=o.e,b(Qt,o.a,o.b,o.c,l(te,n,o.d),c)):C:b(E,t,e,a,l(te,n,i),u):b(E,t,e,a,l(te,n,i),u):l(ee,n,B(re,n,r,t,e,a,i,u)))}),ee=e(function(n,r){var t,e,a,i,u;return-1===r.$?(t=r.a,e=r.c,a=r.d,i=r.e,J(n,r=r.b)?-1===(u=function(n){for(;;){if(-1!==n.$||-1!==n.d.$)return n;n=n.d}}(i)).$?b(Qt,t,u.b,u.c,a,Cr(i)):C:b(Qt,t,r,e,a,l(te,n,i))):C}),ae=e(function(n,r){n=l(te,n,r);return-1!==n.$||n.a?n:b(E,1,n.b,n.c,n.d,n.e)}),ie=r(function(n,r,t){r=r(l(Yt,n,t));return r.$?l(ae,n,t):s(ne,n,r.a,t)}),ue=r(function(n,r,t){return r(n(t))}),oe=e(function(n,r){return s($r,"",kt,l(ue,r,n))}),ce={$:2},fe={$:1},se=e(function(n,r){return r.$?y(n(r.a)):w(r.a)}),le=e(function(n,r){switch(r.$){case 0:return y({$:0,a:r.a});case 1:return y(fe);case 2:return y(ce);case 3:return y({$:3,a:r.a.aX});default:return l(se,Er,n(r.b))}}),de=hn,be=(Q=de,Rn(K="gtagReportConversion"),$[K]={e:Tn,u:Q,a:zn},Ln(K)),ve=n(function(n,r,t,e){return{aL:r,aN:n,aQ:t,aZ:e}}),he=Kr(1/0),pe=hr,ge=/.^/,$e=e(function(n,r){return r.$?n:r.a}),me=function(r){return l(St,Ct,{$:2,b:function(n){try{pr.location=r}catch(n){Bn.location.reload(!1)}},c:null})},xe=function(n){return{$:1,a:n}},ye=e(function(n,r){return{al:n,aq:r}}),V=o(l(ye,Wt,v)),we=function(t){return{$:2,b:function(n){var r=t.f;2===r.$&&r.c&&r.c(),t.f=null,n({$:0,a:U})},c:null}},ke=yn,_e=r(function(t,n,e){for(;;){if(!n.b)return o(e);var a,r=n.a,i=n.b;if(r.$)return a=r.a,l(A,function(n){var r=a.as;return s(_e,t,i,1===r.$?e:s(ne,r.a,n,e))},ke(s(gr,t,Ft(t),a)));var u=r.a,r=l(Yt,u,e);if(1!==r.$)return l(A,function(n){return s(_e,t,i,l(ae,u,e))},we(r.a));t=t,n=i,e=e}}),D=n(function(n,r,t,e){return l(A,function(n){return o(l(ye,n,t))},s(_e,n,r,e.al))}),Ae=r(function(n,r,t){n=n(r);return n.$?t:l(u,n.a,t)}),Ce=e(function(n,r){return s(jt,Ae(n),v,r)}),Ee=n(function(n,r,t,e){var a=e.b;return J(r,e.a)?Vr(l(Ft,n,a(t))):k}),on=r(function(n,r,t){return l(A,function(n){return o(t)},wr(l(Ce,s(Ee,n,r.a,r.b),t.aq)))}),rn=e(function(n,r){var t;return r.$?xe({ay:(t=r.a).ay,aA:t.aA,aG:l(mr,n,t.aG),aI:t.aI,aO:t.aO,a$:t.a$,as:t.as,a2:t.a2}):{$:0,a:r.a}}),je=e(function(n,r){return{$:0,a:n,b:r}}),Me=($.Http={b:V,c:D,d:on,e:rn,f:e(function(n,r){return l(je,r.a,l(ue,r.b,n))})},Ln("Http")),Le=(Ln("Http"),e(function(n,r){switch(n.$){case 0:return{a:Z(r,{z:n.a}),b:Tt};case 1:return jr(r.z)?(t=h([{a:"email",b:de(r.z)}]),t=s(tt,e(function(n,r){return s(pn,n.a,n.b,r)}),{},t),{a:Z(r,{A:!0,r:"Your request is being processed..."}),b:Mr({aA:l(xr,"application/json",l(nt,0,t)),aG:l(oe,kr,le(w)),a2:"https://api.catholicstoriesforchildren.com/add-contact"})}):{a:Z(r,{r:"Error: Please enter a valid email"}),b:Tt};default:return n.a.$?{a:Z(r,{A:!1,r:"Error: please try again later"}),b:Tt}:{a:Z(r,{A:!1,r:"Email sent!"}),b:Rt(h([be(""),me("/thankyou")]))}}var t})),jn=e(function(n,r){var n=l(Le,n,r.F),t=n.b;return{a:Z(r,{F:n.a}),b:l(qt,kt,t)}}),a=c("div"),j=Jn,Fe=e(function(n,r){return l(m,function(n){return/^(on|formAction$)/i.test(n)?"data-"+n:n}(n),Un(r))}),Ie=hn,Ne=Hn,Se=e(function(n,r){return l(Ne,n,{$:3,a:r})}),Ge=e(function(n,r){return l(Ne,n,{$:0,a:r})}),Re=e(function(n,r){return l(Ne,n,{$:2,a:r})}),Te=e(function(n,r){return l(Wn,function(n){return"innerHTML"==n||"formAction"==n?"data-"+n:n}(n),Un(r))}),ze=e(function(n,r){return l(Ne,n,{$:1,a:r})}),qe=e(function(n,r){return{a:r.a,b:n(r.b)}}),F=Pn,Be=Nr,Pe=e(function(n,r){return l(Wn,n,de(r))}),I=Pe("className"),Oe=c("h1"),Ke=Dn,De={$:1},He=c("input"),Je=un,We=function(n){return{$:1,a:n}},Xe=an,Ue=l(Xe,"keyCode",tn),O=en,Ze=l(e(function(n,r){return s(jt,Xe,r,n)}),h(["target","value"]),O),N=c("p"),Ye=Pe("placeholder"),Qe=Pe("type"),Ve=Pe("value"),na=c("img"),ra=l(a,h([I("flex justify-center")]),h([l(na,h([I("rounded w-full max-w-[330px]"),Rr("https://ik.imagekit.io/catholicstories/FREE_Mass_Guide_WbtXzqb2I.png?updatedAt=1687994011730")]),v)])),ta=c("button"),ea=e(function(n,r){return l(Wn,n,Ie(r))})("disabled"),dr=On("http://www.w3.org/2000/svg"),aa=dr("circle"),ia=m("class"),ua=m("cx"),oa=m("cy"),ca=m("d"),fa=m("fill"),sa=dr("path"),la=m("r"),da=m("stroke"),ba=m("stroke-width"),va=dr("svg"),ha=m("viewBox"),pa=function(n){return l(a,h([I("border-4 border-solid border-[#460156] p-3 rounded-md bg-[#ffc7c7]"),I("lg:grid lg:grid-cols-2")]),h([l(a,h([I("text-center mb-5")]),h([l(N,h([I("pb-5 pl-1 text-left")]),h([F("Enter your email to receive our FREE Ultimate Guide for Bringing Kids to Mass.")])),l(a,v,h([l(He,h([Qe("text"),Ye("First Name"),l(Fe,"aria-hidden","true"),l(j,"display","none")]),v),l(He,h([Qe("email"),Ye("Email"),Ve(n.z),l(ze,"input",l(xt,Gr,l(xt,Sr,Ze))),(r=De,l(Ge,"keydown",l(Je,function(n){return 13===n?yt(r):We("not ENTER")},Ue))),l(Fe,"required","true"),l(j,"padding","10px 20px"),l(j,"border-radius","5px 0px 0px 5px"),l(j,"box-shadow","#777 1px 1px 5px"),I("w-[188px] md:w-[230px] h-[56px] text-lg")]),v),Tr(n),function(n){return l(a,h([I(l(_t,"Error",n.r)?"text-rose-600":"text-emerald-500"),I("text-left pl-1")]),h([F(n.r)]))}(n)]))])),l(a,v,h([ra])),l(a,h([I("text-left text-base col-span-2")]),h([l(N,v,h([F("Get inspired:")])),l(N,v,h([F("🌟 Top tips from parents on bringing kids to Mass.")])),l(N,v,h([F("🌟 Best strategies on preparing kids for a heavenly Mass experience.")])),l(N,v,h([F("🌟 Faith-based techniques to get kids engaged in Mass.")])),l(N,v,h([F("🌟 It's FREE! Empower kids this week!")])),l(N,h([I("pt-4")]),h([F("We will also send you:")])),l(N,v,h([F("🌟 Updates on the animations.")])),l(N,v,h([F("🌟 Future freebies!")]))]))]));var r},ga=l(a,v,h([F("Want monthly content at your front door? Check out these wonderful Catholic subscriptions.")])),$a=c("a"),ma=c("h2"),xa=Pe("target"),ya=l(a,v,l(i,function(n){return l($a,h([I("grid grid-cols-[100px_1fr] hover:bg-csc-lightpurple rounded p-7"),xa("_blank"),l(Fe,"aria-label",n.K),(r=n.M,l(Pe,"href",/^javascript:/i.test((r=r).replace(/\s/g,""))?"":r))]),h([l(a,v,h([l(na,h([Rr(n.L),I("w-20 h-20 object-cover")]),v)])),l(a,v,h([l(ma,h([I("leading-10")]),h([F(n.K)]))]))]));var r},h([{L:"https://ik.imagekit.io/catholicstories/ProfileImages/3_1__qbNDjJEy1.png?updatedAt=1685581657645",M:"https://osvkids.com/magazine/",K:"OSV Kids Magazine"},{L:"https://ik.imagekit.io/catholicstories/ProfileImages/4_1__LjeiFaCGM1.png?updatedAt=1685581640310",M:"https://www.saintofthemonth.com",K:"Saint of the Month Box"},{L:"https://ik.imagekit.io/catholicstories/ProfileImages/5_GX7izsR5Jp.png?updatedAt=1685581558288",M:"https://themassbox.com",K:"Mass Box"},{L:"https://ik.imagekit.io/catholicstories/ProfileImages/6_tZqBkQ3sW.png?updatedAt=1685581578667",M:"https://faithandfamilycollective.com",K:"Faith + Family Collective"},{L:"https://ik.imagekit.io/catholicstories/ProfileImages/7_i5fOMR9CEB.png?updatedAt=1685581542221",M:"https://catholicfamilycrate.com",K:"Catholic Family Crate"},{L:"https://ik.imagekit.io/catholicstories/ProfileImages/8_qucgsetg84.png?updatedAt=1685581652225",M:"https://us.magnificat.net/home/magnifikid",K:"MagnifiKid"},{L:"https://ik.imagekit.io/catholicstories/ProfileImages/9_6wjdaJHdc.png?updatedAt=1685581568223",M:"https://formed.org",K:"Formed"},{L:"https://ik.imagekit.io/catholicstories/ProfileImages/27_LJ8rjMXH6.png?updatedAt=1682716507484",M:"https://www.diaryofagodman.com/subscriptions",K:"Diary of a God-Man"}]))),wa=l(a,h([I("grid grid-cols-[100px_1fr] rounded py-7")]),h([l(a,v,h([l(na,h([Rr("https://ik.imagekit.io/catholicstories/Construction_Cone_vLoPMhMZBm.png?updatedAt=1679070884463"),I("w-20 h-20 object-cover")]),v)])),l(a,v,h([l(N,v,h([F("This page is a work-in-progress. We are working hard on adding resources this page for you.")]))]))])),ka=r(function(n,r,t){return{$:0,a:n,b:r,c:t}}),t=r(function(n,r,t){return s(ka,n,r,{$:1,a:t})}),_a=t("a"),Aa=e(function(n,r){return{$:1,a:n,b:r}}),Ca=e(function(n,r){return{$:0,a:n,b:r}}),S=function(n){return l(Aa,"className",n)},Ea=t("div"),Mn=t("footer"),ja={$:0},X=r(function(n,r,t){return s(ka,n,r,ja)})("img"),Tn=t("p"),Q=t("span"),G=e(function(n,r){return{$:4,a:n,b:r}}),Ma=function(n){return{$:1,a:n}},La=l(Mn,h([l(G,"padding",rt(30)+"px"),l(G,"background-color","black"),l(G,"color","white"),l(G,"transform-style","preserve-3d")]),h([l(Ea,h([S("flex items-center gap-2.5")]),h([l(Q,v,h([Ma("Follow us on")])),l(_a,h([qr("https://www.facebook.com/catholicstoriesforchildren"),l(Ca,"aria-label","CSC Facebook Page"),Pr("_blank")]),h([l(X,h([S("w-10 h-10"),Br("https://ik.imagekit.io/catholicstories/f_logo_RGB-Blue_250_3vs-yhXer.png?updatedAt=1684277030198"),zr("Facebook")]),v)])),l(_a,h([qr("https://www.instagram.com/catholicstoriesforchildren/"),l(Ca,"aria-label","CSC Instagram Page"),Pr("_blank")]),h([l(X,h([S("w-10 h-10"),Br("https://ik.imagekit.io/catholicstories/Instagram_Glyph_Gradient_kFoMs9jIr.png?updatedAt=1684277127293"),zr("Instagram")]),v)]))])),l(Tn,v,h([Ma("Copyright © 2023 Catholic Stories for Children. All rights reserved.")])),l(Tn,v,h([Ma("Catholic Stories for Children is a 501(c)(3) non-profit recognized by the IRS. Contributions to Catholic Stories for Children are tax-deductible to the extent permitted by law.  Tax ID Number: 85-4194883")]))])),Fa=t("header"),Ia=t("nav"),Na=n(function(n,r,t,e){return l(_a,h([qr(r),S("flex items-center justify-center"),S("hover:bg-csc-lightpurple"),S("hover:border-b-2 hover:border-gray-700"),S("rounded-t"),S("text-lg"),S("h-[60px] h-["+n+"]"),S("w-full"),l(Ca,"aria-label",e),Pr(t)]),h([Ma(e)]))}),Sa=l(_a,h([qr("/navigation"),S("space-y-2"),l(Ca,"aria-label","menu")]),h([l(Ea,h([S("w-8 h-0.5 m-auto bg-gray-600")]),v),l(Ea,h([S("w-8 h-0.5 m-auto bg-gray-600")]),v),l(Ea,h([S("w-8 h-0.5 m-auto bg-gray-600")]),v)])),Ga=t("h1"),K=l(X,h([Br("/assets/logo_solid.svg"),l(G,"height","30px"),zr(""),l(G,"vertical-align","middle")]),v),Ra=l(_a,h([l(G,"text-decoration","none"),S("colorDarkGray"),qr("/"),l(Ca,"aria-label","home")]),h([K])),Ta=e(function(n,r){var n="Catholic Stories for Children"===n?{a:"111px",b:Or,c:"grid-cols-[150px_1fr_150px] lg:grid-cols-[150px_1fr_600px]"}:{a:"60px",b:Or,c:"grid-cols-[150px_1fr_150px] lg:grid-cols-[150px_1fr_600px]"},t=n.a,e=n.b,n=n.c;return l(Fa,h([l(G,"background-color","#3d5d75"),l(G,"background-image","linear-gradient(130deg, #9DE2EB , #EBD6F1)"),S("h-[60px] md:h-["+t+"]"),S("colorDarkGray"),S("grid items-center justify-items-center"),S(n)]),h([Ra,l(_a,h([l(G,"text-decoration","none"),S("colorDarkGray"),S("invisible md:visible"),S("justify-self-start"),qr("/")]),h([l(Ga,h([l(G,"font-family","hvdComicSerifPro"),l(G,"margin","0px"),S("text-[0px] md:text-2xl")]),h([Ma("Catholic Stories for Children")]))])),e(t)]))}),Kr=vn({aM:function(n){return{a:{F:Gt},b:Tt}},a_:function(n){return zt},a1:jn,a3:function(n){return l(a,h([l(j,"height","100vh"),l(j,"overflow-x","hidden"),l(j,"overflow-y","auto"),l(j,"perspective","300px"),l(j,"scroll-behavior","smooth"),l(j,"background-color","#FEF7F4")]),h([Be(l(Ta,"Subscriptions",10)),function(n){return l(a,h([I("max-w-3xl"),I("m-auto"),I("p-5"),I("mb-10")]),h([l(Oe,h([I("my-10 leading-10")]),h([F("Subscriptions")])),l(a,h([I("mb-10")]),h([l(Ke,kt,pa(n.F))])),ga,ya,wa]))}(n),Be(La)]))}});hr={Resources:{Subscriptions:{Main:{init:Kr(yt(0))(0)}}}},R.Elm?function n(r,t){for(var e in t)e in r?"init"==e?H(6):n(r[e],t[e]):r[e]=t[e]}(R.Elm,hr):R.Elm=hr}(this);