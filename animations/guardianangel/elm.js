!function(R){"use strict";function q(n,r,e){return e.a=n,e.f=r,e}function t(e){return q(2,e,function(r){return function(n){return e(r,n)}})}function r(t){return q(3,t,function(e){return function(r){return function(n){return t(e,r,n)}}})}function n(a){return q(4,a,function(t){return function(e){return function(r){return function(n){return a(t,e,r,n)}}}})}function z(i){return q(5,i,function(a){return function(t){return function(e){return function(r){return function(n){return i(a,t,e,r,n)}}}}})}function B(u){return q(7,u,function(o){return function(i){return function(a){return function(t){return function(e){return function(r){return function(n){return u(o,i,a,t,e,r,n)}}}}}}})}function l(n,r,e){return 2===n.a?n.f(r,e):n(r)(e)}function s(n,r,e,t){return 3===n.a?n.f(r,e,t):n(r)(e)(t)}function d(n,r,e,t,a){return 4===n.a?n.f(r,e,t,a):n(r)(e)(t)(a)}function b(n,r,e,t,a,i){return 5===n.a?n.f(r,e,t,a,i):n(r)(e)(t)(a)(i)}function P(n,r,e,t,a,i,o,u){return 7===n.a?n.f(r,e,t,a,i,o,u):n(r)(e)(t)(a)(i)(o)(u)}var h={$:0};function M(n,r){return{$:1,a:n,b:r}}var e=t(M);function v(n){for(var r=h,e=n.length;e--;)r={$:1,a:n[e],b:r};return r}var O=r(function(n,r,e){for(var t=Array(n),a=0;a<n;a++)t[a]=e(r+a);return t}),H=t(function(n,r){for(var e=Array(n),t=0;t<n&&r.b;t++)e[t]=r.a,r=r.b;return e.length=t,{a:e,b:r}});function Y(n){throw Error("https://github.com/elm/core/blob/1.0.0/hints/"+n+".md")}function D(n,r){for(var e,t=[],a=J(n,r,0,t);a&&(e=t.pop());a=J(e.a,e.b,0,t));return a}function J(n,r,e,t){if(n!==r){if("object"!=typeof n||null===n||null===r)return"function"==typeof n&&Y(5),!1;if(100<e)t.push({a:n,b:r});else for(var a in n.$<0&&(n=Rr(n),r=Rr(r)),n)if(!J(n[a],r[a],e+1,t))return!1}return!0}function f(n,r,e){if("object"!=typeof n)return n===r?0:n<r?-1:1;if(void 0===n.$)return(e=(e=f(n.a,r.a))||f(n.b,r.b))||f(n.c,r.c);for(;n.b&&r.b&&!(e=f(n.a,r.a));n=n.b,r=r.b);return e||(n.b?1:r.b?-1:0)}var K=t(function(n,r){n=f(n,r);return n<0?Lr:n?qr:Tr}),W=0;function X(n,r){var e,t={};for(e in n)t[e]=n[e];for(e in r)t[e]=r[e];return t}function U(n,r){if("string"==typeof n)return n+r;if(!n.b)return r;var e={$:1,a:n.a,b:r};n=n.b;for(var t=e;n.b;n=n.b)t=t.b={$:1,a:n.a,b:r};return e}var V=Math.ceil,Z=Math.floor,Q=Math.log;var nn=t(function(n,r){return!!~r.indexOf(n)});var rn={$:2,b:function(n){return"number"!=typeof n||(n<=-2147483647||2147483647<=n||(0|n)!==n)&&(!isFinite(n)||n%1)?p("an INT",n):w(n)}},en={$:2,b:function(n){return"string"==typeof n?w(n):n instanceof String?w(n+""):p("a STRING",n)}};var tn=t(function(n,r){return{$:6,d:n,b:r}});var an=t(function(n,r){return{$:10,b:r,h:n}});var on=t(function(n,r){return{$:9,f:n,g:[r]}}),un=t(g);function g(n,r){switch(n.$){case 2:return n.b(r);case 5:return null===r?w(n.c):p("null",r);case 3:return fn(r)?cn(n.b,r,v):p("a LIST",r);case 4:return fn(r)?cn(n.b,r,sn):p("an ARRAY",r);case 6:var e=n.d;return"object"==typeof r&&null!==r&&e in r?(i=g(n.b,r[e]),k(i)?i:x(l(Br,e,i.a))):p("an OBJECT with a field named `"+e+"`",r);case 7:e=n.e;return fn(r)?e<r.length?(i=g(n.b,r[e]),k(i)?i:x(l(Pr,e,i.a))):p("a LONGER array. Need index "+e+" but only see "+r.length+" entries",r):p("an ARRAY",r);case 8:if("object"!=typeof r||null===r||fn(r))return p("an OBJECT",r);var t,a=h;for(t in r)if(r.hasOwnProperty(t)){var i=g(n.b,r[t]);if(!k(i))return x(l(Br,t,i.a));a={$:1,a:{a:t,b:i.a},b:a}}return w(Kr(a));case 9:for(var o=n.f,u=n.g,c=0;c<u.length;c++){i=g(u[c],r);if(!k(i))return i;o=o(i.a)}return w(o);case 10:i=g(n.b,r);return k(i)?g(n.h(i.a),r):i;case 11:for(var f=h,s=n.g;s.b;s=s.b){i=g(s.a,r);if(k(i))return i;f={$:1,a:i.a,b:f}}return x(Mr(Kr(f)));case 1:return x(l(zr,n.a,r));case 0:return w(n.a)}}function cn(n,r,e){for(var t=r.length,a=Array(t),i=0;i<t;i++){var o=g(n,r[i]);if(!k(o))return x(l(Pr,i,o.a));a[i]=o.a}return w(e(a))}function fn(n){return Array.isArray(n)||"undefined"!=typeof FileList&&n instanceof FileList}function sn(r){return l(fe,r.length,function(n){return r[n]})}function p(n,r){return x(l(zr,"Expecting "+n,r))}function ln(n,r){if(n===r)return!0;if(n.$!==r.$)return!1;switch(n.$){case 0:case 1:return n.a===r.a;case 2:return n.b===r.b;case 5:return n.c===r.c;case 3:case 4:case 8:return ln(n.b,r.b);case 6:return n.d===r.d&&ln(n.b,r.b);case 7:return n.e===r.e&&ln(n.b,r.b);case 9:return n.f===r.f&&dn(n.g,r.g);case 10:return n.h===r.h&&ln(n.b,r.b);case 11:return dn(n.g,r.g)}}function dn(n,r){var e=n.length;if(e!==r.length)return!1;for(var t=0;t<e;t++)if(!ln(n[t],r[t]))return!1;return!0}var bn=t(function(n,r){return JSON.stringify(r,null,n)+""});function hn(n){return n}var vn=r(function(n,r,e){return e[n]=r,e});function gn(n){return{$:0,a:n}}var pn=t(function(n,r){return{$:3,b:n,d:r}});var mn=0;function yn(n){n={$:0,e:mn++,f:n,g:null,h:[]};return _n(n),n}function $n(r){return{$:2,b:function(n){n({$:0,a:yn(r)})},c:null}}function xn(n,r){n.h.push(r),_n(n)}var wn=t(function(r,e){return{$:2,b:function(n){xn(r,e),n({$:0,a:W})},c:null}});var kn=!1,An=[];function _n(n){if(An.push(n),!kn){for(kn=!0;n=An.shift();)!function(r){for(;r.f;){var n=r.f.$;if(0===n||1===n){for(;r.g&&r.g.$!==n;)r.g=r.g.i;if(!r.g)return;r.f=r.g.b(r.f.a),r.g=r.g.i}else{if(2===n)return r.f.c=r.f.b(function(n){r.f=n,_n(r)});if(5===n){if(0===r.h.length)return;r.f=r.f.b(r.h.shift())}else r.g={$:3===n?0:1,b:r.f.b,i:r.g},r.f=r.f.d}}}(n);kn=!1}}function Cn(n,r,e,t,a,i){var n=l(un,n,r?r.flags:void 0),o=(k(n)||Y(2),{}),r=e(n.a),u=r.a,c=i(f,u),e=function(n,r){var e,t;for(t in m){var a=m[t];a.a&&((e=e||{})[t]=a.a(t,r)),n[t]=function(n,r){var t={g:r,h:void 0},a=n.c,i=n.d,o=n.e,u=n.f;function c(e){return l(pn,c,{$:5,b:function(n){var r=n.a;return 0===n.$?s(i,t,r,e):o&&u?d(a,t,r.i,r.j,e):s(a,t,o?r.i:r.j,e)}})}return t.h=yn(l(pn,c,n.b))}(a,r)}return e}(o,f);function f(n,r){n=l(t,n,u);c(u=n.a,r),Ln(o,n.b,a(u))}return Ln(o,r.b,a(u)),e?{ports:e}:{}}var m={};var En=t(function(r,e){return{$:2,b:function(n){r.g(e),n({$:0,a:W})},c:null}}),a=t(function(n,r){return l(wn,n.h,{$:0,a:r})});function jn(r){return function(n){return{$:1,k:r,l:n}}}function Sn(n){return{$:2,m:n}}var Gn=t(function(n,r){return{$:3,n:n,o:r}}),Fn=[],Tn=!1;function Ln(n,r,e){if(Fn.push({p:n,q:r,r:e}),!Tn){Tn=!0;for(var t;t=Fn.shift();)!function(n,r,e){var t,a={};for(t in Nn(!0,r,a,null),Nn(!1,e,a,null),n)xn(n[t],{$:"fx",a:a[t]||{i:h,j:h}})}(t.p,t.q,t.r);Tn=!1}}function Nn(n,r,e,t){switch(r.$){case 1:var a=r.k,i=function(n,r,e,t){function a(n){for(var r=e;r;r=r.t)n=r.s(n);return n}return l(n?m[r].e:m[r].f,a,t)}(n,a,t,r.l);return void(e[a]=function(n,r,e){return e=e||{i:h,j:h},n?e.i={$:1,a:r,b:e.i}:e.j={$:1,a:r,b:e.j},e}(n,i,e[a]));case 2:for(var o=r.m;o.b;o=o.b)Nn(n,o.a,e,t);return;case 3:Nn(n,r.o,e,{s:r.n,t:t})}}function In(n){m[n]&&Y(3)}var Rn=t(function(n,r){return r});function qn(n){var e,o=[],u=m[n].u,c=(e=0,{$:2,b:function(n){var r=setTimeout(function(){n({$:0,a:W})},e);return function(){clearTimeout(r)}},c:null});return m[n].b=c,m[n].c=r(function(n,r,e){for(;r.b;r=r.b)for(var t=o,a=u(r.a),i=0;i<t.length;i++)t[i](a);return c}),{subscribe:function(n){o.push(n)},unsubscribe:function(n){(n=(o=o.slice()).indexOf(n))<0||o.splice(n,1)}}}var zn;var Bn="undefined"!=typeof document?document:{};function Pn(n){return{$:0,a:n}}var Mn=t(function(i,o){return t(function(n,r){for(var e=[],t=0;r.b;r=r.b){var a=r.a;t+=a.b||0,e.push(a)}return t+=e.length,{$:1,c:o,d:Wn(n),e:e,f:i,b:t}})}),c=Mn(void 0);t(function(i,o){return t(function(n,r){for(var e=[],t=0;r.b;r=r.b){var a=r.a;t+=a.b.b||0,e.push(a)}return t+=e.length,{$:2,c:o,d:Wn(n),e:e,f:i,b:t}})})(void 0);var On=t(function(n,r){return{$:4,j:n,k:r,b:1+(r.b||0)}});var Hn=t(function(n,r){return{$:"a0",n:n,o:r}}),Yn=t(function(n,r){return{$:"a1",n:n,o:r}}),Dn=t(function(n,r){return{$:"a2",n:n,o:r}}),y=t(function(n,r){return{$:"a3",n:n,o:r}});function Jn(n){return/^\s*(javascript:|data:text\/html)/i.test(n)?"":n}var Kn;function Wn(n){for(var r={};n.b;n=n.b){var e,t=n.a,a=t.$,i=t.n,t=t.o;"a2"===a?"className"===i?Xn(r,i,t):r[i]=t:(e=r[a]||(r[a]={}),"a3"===a&&"class"===i?Xn(e,i,t):e[i]=t)}return r}function Xn(n,r,e){var t=n[r];n[r]=t?t+" "+e:e}function $(n,r){var e=n.$;if(5===e)return $(n.k||(n.k=n.m()),r);if(0===e)return Bn.createTextNode(n.a);if(4===e){for(var t=n.k,a=n.j;4===t.$;)"object"!=typeof a?a=[a,t.j]:a.push(t.j),t=t.k;var i={j:a,p:r};(o=$(t,i)).elm_event_node_ref=i}else if(3===e)Un(o=n.h(n.g),r,n.d);else{var o=n.f?Bn.createElementNS(n.f,n.c):Bn.createElement(n.c);zn&&"a"==n.c&&o.addEventListener("click",zn(o)),Un(o,r,n.d);for(var u=n.e,c=0;c<u.length;c++)o.appendChild($(1===e?u[c]:u[c].b,r))}return o}function Un(n,r,e){for(var t in e){var a=e[t];"a1"===t?function(n,r){var e,t=n.style;for(e in r)t[e]=r[e]}(n,a):"a0"===t?function(n,r,e){var t,a=n.elmFs||(n.elmFs={});for(t in e){var i=e[t],o=a[t];if(i){if(o){if(o.q.$===i.$){o.q=i;continue}n.removeEventListener(t,o)}o=function(c,n){function f(n){var r=f.q,e=g(r.a,n);if(k(e)){for(var t,r=de(r),e=e.a,a=r?r<3?e.a:e.r:e,i=1==r?e.b:3==r&&e.P,o=(i&&n.stopPropagation(),(2==r?e.b:3==r&&e.M)&&n.preventDefault(),c);t=o.j;){if("function"==typeof t)a=t(a);else for(var u=t.length;u--;)a=t[u](a);o=o.p}o(a,i)}}return f.q=n,f}(r,i),n.addEventListener(t,o,Kn&&{passive:de(i)<2}),a[t]=o}else n.removeEventListener(t,o),a[t]=void 0}}(n,r,a):"a3"===t?function(n,r){for(var e in r){var t=r[e];void 0!==t?n.setAttribute(e,t):n.removeAttribute(e)}}(n,a):"a4"===t?function(n,r){for(var e in r){var t=r[e],a=t.f,t=t.o;void 0!==t?n.setAttributeNS(a,e,t):n.removeAttributeNS(a,e)}}(n,a):("value"!==t&&"checked"!==t||n[t]!==a)&&(n[t]=a)}}try{window.addEventListener("t",null,Object.defineProperty({},"passive",{get:function(){Kn=!0}}))}catch(n){}function Vn(n,r){var e=[];return G(n,r,e,0),e}function S(n,r,e,t){r={$:r,r:e,s:t,t:void 0,u:void 0};return n.push(r),r}function G(n,r,e,t){if(n!==r){var a=n.$,i=r.$;if(a!==i){if(1!==a||2!==i)return void S(e,0,t,r);r=function(n){for(var r=n.e,e=r.length,t=Array(e),a=0;a<e;a++)t[a]=r[a].b;return{$:1,c:n.c,d:n.d,e:t,f:n.f,b:n.b}}(r),i=1}switch(i){case 5:for(var o=n.l,u=r.l,c=o.length,f=c===u.length;f&&c--;)f=o[c]===u[c];if(f)return void(r.k=n.k);r.k=r.m();var s=[];return G(n.k,r.k,s,0),void(0<s.length&&S(e,1,t,s));case 4:for(var l=n.j,d=r.j,b=!1,h=n.k;4===h.$;)b=!0,"object"!=typeof l?l=[l,h.j]:l.push(h.j),h=h.k;for(var v=r.k;4===v.$;)b=!0,"object"!=typeof d?d=[d,v.j]:d.push(v.j),v=v.k;return b&&l.length!==d.length?void S(e,0,t,r):((b?function(n,r){for(var e=0;e<n.length;e++)if(n[e]!==r[e])return;return 1}(l,d):l===d)||S(e,2,t,d),void G(h,v,e,t+1));case 0:return void(n.a!==r.a&&S(e,3,t,r.a));case 1:return void Zn(n,r,e,t,nr);case 2:return void Zn(n,r,e,t,rr);case 3:if(n.h!==r.h)return void S(e,0,t,r);s=Qn(n.d,r.d),s=(s&&S(e,4,t,s),r.i(n.g,r.g));s&&S(e,5,t,s)}}}function Zn(n,r,e,t,a){var i;n.c!==r.c||n.f!==r.f?S(e,0,t,r):((i=Qn(n.d,r.d))&&S(e,4,t,i),a(n,r,e,t))}function Qn(n,r,e){var t,a,i,o,u;for(a in n)"a1"===a||"a0"===a||"a3"===a||"a4"===a?(i=Qn(n[a],r[a]||{},a))&&((t=t||{})[a]=i):a in r?(i=n[a])===(o=r[a])&&"value"!==a&&"checked"!==a||"a0"===e&&function(n,r){return n.$==r.$&&ln(n.a,r.a)}(i,o)||((t=t||{})[a]=o):(t=t||{})[a]=e?"a1"===e?"":"a0"===e||"a3"===e?void 0:{f:n[a].f,o:void 0}:"string"==typeof n[a]?"":null;for(u in r)u in n||((t=t||{})[u]=r[u]);return t}function nr(n,r,e,t){var a=n.e,i=r.e,n=a.length,r=i.length;r<n?S(e,6,t,{v:r,i:n-r}):n<r&&S(e,7,t,{v:n,e:i});for(var o=n<r?n:r,u=0;u<o;u++){var c=a[u];G(c,i[u],e,++t),t+=c.b||0}}function rr(n,r,e,t){for(var a=[],i={},o=[],u=n.e,c=r.e,f=u.length,s=c.length,l=0,d=0,b=t;l<f&&d<s;){var h=u[l],v=c[d],g=h.a,p=v.a,m=h.b,y=v.b,$=void 0,x=void 0;if(g===p)G(m,y,a,++b),b+=m.b||0,l++,d++;else{var w,k,A,_,C=u[l+1],E=c[d+1];if(C&&(k=C.b,x=p===(w=C.a)),E&&(_=E.b,$=g===(A=E.a)),$&&x)G(m,_,a,++b),tr(i,a,g,y,d,o),b+=m.b||0,ar(i,a,g,k,++b),b+=k.b||0,l+=2,d+=2;else if($)b++,tr(i,a,p,y,d,o),G(m,_,a,b),b+=m.b||0,l+=1,d+=2;else if(x)ar(i,a,g,m,++b),b+=m.b||0,G(k,y,a,++b),b+=k.b||0,l+=2,d+=1;else{if(!C||w!==A)break;ar(i,a,g,m,++b),tr(i,a,p,y,d,o),b+=m.b||0,G(k,_,a,++b),b+=k.b||0,l+=2,d+=2}}}for(;l<f;){m=(h=u[l]).b;ar(i,a,h.a,m,++b),b+=m.b||0,l++}for(;d<s;){var j=j||[];tr(i,a,(v=c[d]).a,v.b,void 0,j),d++}(0<a.length||0<o.length||j)&&S(e,8,t,{w:a,x:o,y:j})}var er="_elmW6BL";function tr(n,r,e,t,a,i){var o,u=n[e];u?1===u.c?(i.push({r:a,A:u}),u.c=2,G(u.z,t,o=[],u.r),u.r=a,u.s.s={w:o,A:u}):tr(n,r,e+er,t,a,i):(i.push({r:a,A:u={c:0,z:t,r:a,s:void 0}}),n[e]=u)}function ar(n,r,e,t,a){var i,o=n[e];o?0===o.c?(o.c=2,G(t,o.z,i=[],a),S(r,9,a,{w:i,A:o})):ar(n,r,e+er,t,a):(i=S(r,9,a,void 0),n[e]={c:1,z:t,r:a,s:i})}function ir(n,r,e,t){!function n(r,e,t,a,i,o,u){var c=t[a];var f=c.r;for(;f===i;){var s,l=c.$;if(1===l?ir(r,e.k,c.s,u):8===l?(c.t=r,c.u=u,0<(s=c.s.w).length&&n(r,e,s,0,i,o,u)):9===l?(c.t=r,c.u=u,(l=c.s)&&(l.A.s=r,0<(s=l.w).length)&&n(r,e,s,0,i,o,u)):(c.t=r,c.u=u),!(c=t[++a])||(f=c.r)>o)return a}var d=e.$;if(4===d){for(var b=e.k;4===b.$;)b=b.k;return n(r,b,t,a,i+1,o,r.elm_event_node_ref)}var h=e.e;var v=r.childNodes;for(var g=0;g<h.length;g++){var p=1===d?h[g]:h[g].b,m=++i+(p.b||0);if(i<=f&&f<=m&&(a=n(v[g],p,t,a,i,m,u),!(c=t[a])||(f=c.r)>o))return a;i=m}return a}(n,r,e,0,0,r.b,t)}function or(n,r,e,t){return 0===e.length?n:(ir(n,r,e,t),ur(n,e))}function ur(n,r){for(var e=0;e<r.length;e++){var t=r[e],a=t.t,t=function(n,r){switch(r.$){case 0:return function(n,r,e){var t=n.parentNode,r=$(r,e);r.elm_event_node_ref||(r.elm_event_node_ref=n.elm_event_node_ref);t&&r!==n&&t.replaceChild(r,n);return r}(n,r.s,r.u);case 4:return Un(n,r.u,r.s),n;case 3:return n.replaceData(0,n.length,r.s),n;case 1:return ur(n,r.s);case 2:return n.elm_event_node_ref?n.elm_event_node_ref.j=r.s:n.elm_event_node_ref={j:r.s,p:r.u},n;case 6:for(var e=r.s,t=0;t<e.i;t++)n.removeChild(n.childNodes[e.v]);return n;case 7:for(var a=(e=r.s).e,t=e.v,i=n.childNodes[t];t<a.length;t++)n.insertBefore($(a[t],r.u),i);return n;case 9:var o;return(e=r.s)?(void 0!==(o=e.A).r&&n.parentNode.removeChild(n),o.s=ur(n,e.w)):n.parentNode.removeChild(n),n;case 8:return function(n,r){for(var e=r.s,t=function(n,r){if(n){for(var e=Bn.createDocumentFragment(),t=0;t<n.length;t++){var a=n[t].A;e.appendChild(2===a.c?a.s:$(a.z,r.u))}return e}}(e.y,r),a=(n=ur(n,e.w),e.x),i=0;i<a.length;i++){var o=a[i],u=o.A,u=2===u.c?u.s:$(u.z,r.u);n.insertBefore(u,n.childNodes[o.r])}t&&n.appendChild(t);return n}(n,r);case 5:return r.s(n);default:Y(10)}}(a,t);a===n&&(n=t)}return n}function cr(n){if(3===n.nodeType)return{$:0,a:n.textContent};if(1!==n.nodeType)return{$:0,a:""};for(var r=h,e=n.attributes,t=e.length;t--;)var a=e[t],r={$:1,a:l(y,a.name,a.value),b:r};for(var i=n.tagName.toLowerCase(),o=h,u=n.childNodes,t=u.length;t--;)o={$:1,a:cr(u[t]),b:o};return s(c,i,r,o)}var fr=n(function(r,n,e,o){return Cn(n,o,r.aI,r.a_,r.aX,function(e,n){var t=r.a0,a=o.node,i=cr(a);return lr(n,function(n){var n=t(n),r=Vn(i,n);a=or(a,i,r,e),i=n})})}),sr="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:function(n){return setTimeout(n,1e3/60)};function lr(e,t){t(e);var a=0;function i(){a=1===a?0:(sr(i),t(e),1)}return function(n,r){e=n,r?(t(e),2===a&&(a=1)):(0===a&&sr(i),a=2)}}var dr={addEventListener:function(){},removeEventListener:function(){}},br="undefined"!=typeof window?window:dr;var hr=r(function(t,a,i){return{$:2,b:function(r){function e(n){r(a(i.aC.a(n)))}var n=new XMLHttpRequest;n.addEventListener("error",function(){e(Ne)}),n.addEventListener("timeout",function(){e(qe)}),n.addEventListener("load",function(){e(function(n,r){return l(200<=r.status&&r.status<300?Le:Fe,function(n){return{a$:n.responseURL,aU:n.status,aV:n.statusText,aE:function(n){if(!n)return ze;for(var r=ze,e=n.split("\r\n"),t=e.length;t--;){var a,i,o=e[t],u=o.indexOf(": ");0<u&&(a=o.substring(0,u),i=o.substring(2+u),r=s(Ue,a,function(n){return Or(Be(n)?i+", "+n.a:i)},r))}return r}(n.getAllResponseHeaders())}}(r),n(r.response))}(i.aC.b,n))}),Be(i.ap)&&function(r,e,t){e.upload.addEventListener("progress",function(n){e.c||yn(l(Pe,r,{a:t,b:Re({aT:n.loaded,am:n.total})}))}),e.addEventListener("progress",function(n){e.c||yn(l(Pe,r,{a:t,b:Ie({aR:n.loaded,am:n.lengthComputable?Or(n.total):Hr})}))})}(t,n,i.ap.a);try{n.open(i.aK,i.a$,!0)}catch(n){return e(Te(i.a$))}return function(n,r){for(var e=r.aE;e.b;e=e.b)n.setRequestHeader(e.a.a,e.a.b);n.timeout=r.aY.a||0,n.responseType=r.aC.d,n.withCredentials=r.av}(n,i),i.ax.a&&n.setRequestHeader("Content-Type",i.ax.a),n.send(i.ax.b),function(){n.c=!0,n.abort()}},c:null}});var vr=r(function(n,r,e){return{$:0,d:n,b:r,a:e}}),gr=t(function(r,e){return{$:0,d:e.d,b:e.b,a:function(n){return r(e.a(n))}}});var pr=t(function(n,r){return{$:0,a:n,b:r}});function mr(n){return s(Jr,t(function(n,r){return r+1}),0,n)}function yr(n){return s(me,xe(Nr),u(h),n)}function $r(n){return{$:2,a:n}}function xr(n){var r,e,t,a,i,o,u,c;return-1===n.$&&-1===n.d.$&&-1===n.e.$?-1!==n.e.d.$||n.e.d.a?(t=(c=n.e).b,a=c.c,i=c.d,c=c.e,b(C,1,n.b,n.c,b(C,0,(r=n.d).b,r.c,r.d,r.e),b(C,0,t,a,i,c))):(t=(e=n.e).b,a=e.c,o=(i=e.d).d,u=i.e,c=e.e,b(C,0,i.b,i.c,b(C,1,n.b,n.c,b(C,0,(r=n.d).b,r.c,r.d,r.e),o),b(C,1,t,a,u,c))):n}function wr(n){var r,e,t,a,i,o,u,c,f;return-1===n.$&&-1===n.d.$&&-1===n.e.$?-1!==n.d.d.$||n.d.d.a?(o=(f=n.e).b,u=f.c,c=f.d,f=f.e,b(C,1,r=n.b,e=n.c,b(C,0,(a=n.d).b,a.c,a.d,a=a.e),b(C,0,o,u,c,f))):(r=n.b,e=n.c,a=(t=n.d).e,o=(i=n.e).b,u=i.c,c=i.d,f=i.e,b(C,0,t.b,t.c,b(C,1,(i=t.d).b,i.c,i.d,i.e),b(C,1,r,e,a,b(C,0,o,u,c,f)))):n}function kr(n){var r,e,t,a,i,o;return-1===n.$&&-1===n.d.$?(r=n.a,e=n.b,t=n.c,o=(a=n.d).d,i=n.e,1===a.a?-1!==o.$||o.a?-1===(o=xr(n)).$?(n=o.e,b(He,o.a,o.b,o.c,kr(o.d),n)):_:b(C,r,e,t,kr(a),i):b(C,r,e,t,kr(a),i)):_}function Ar(n){return{$:4,a:n}}function _r(n){var r=ve(n)<=256;return 0<mr(l(ot,l(ft,ct,l(ut,{ay:!1,aL:!1},"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$")),n))&&r}function Cr(n){return function(n){return $t(lt({av:!1,ax:n.ax,aC:n.aC,aE:n.aE,aK:n.aK,aY:n.aY,ap:n.ap,a$:n.a$}))}({ax:n.ax,aC:n.aC,aE:h,aK:"POST",aY:Hr,ap:Hr,a$:n.a$})}function Er(n){return{$:0,a:n}}function jr(n){return{a:n,b:!0}}function Sr(n){r=v([l(y,"width",Dr(10))]);var r=l(ta,U(v([Wt("animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block"),aa("0 0 24 24"),Zt("none")]),r),v([l(Kt,v([Wt("opacity-25"),Xt("12"),Ut("12"),na("10"),ra("currentColor"),ea("4")]),h),l(Qt,v([Wt("opacity-75"),Zt("currentColor"),Vt("M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z")]),h)])),r=(n=n.A?{a:"bg-[#8a4f97]",b:r,c:!0}:{a:"bg-[#9200B3]",b:L("Sign Me Up"),c:!1}).a,e=n.b,n=n.c;return l(Yt,v([l(o,"padding","10px 10px"),l(o,"display","inline-block"),l(o,"border-radius","5px"),l(o,"border-radius","0px 5px 5px 0px"),l(o,"box-shadow","#777 1px 1px 5px"),l(o,"color","white"),F("w-[115px] h-[56px] text-lg"),F(r),l(zt,"click",le(Ft)),Jt(n)]),v([e]))}function Gr(n){return l(i,v([F("w-full pr-2")]),v([l(i,v([F("lg:hidden")]),v([pa])),l(i,v([F("hidden lg:block w-full")]),v([function(n){return l(va,v([F("h-full w-full flex justify-end content-center justify-items-center gap-4 mr-4"),F("text-base")]),v([d(ga,n,"/feastdayactivities","_self","Activities"),d(ga,n,"/saints","_self","Saints"),d(ga,n,"/animations","_self","Animations"),d(ga,n,"/resources","_self","Resources"),d(ga,n,"https://www.etsy.com/shop/CatholicStories","_blank","Shop"),d(ga,n,"/give","_self","Give"),d(ga,n,"/team","_self","About")]))}(n)]))]))}var dr=t(function(n,r){var e="g";n.aL&&(e+="m"),n.ay&&(e+="i");try{return Or(RegExp(r,e))}catch(n){return Hr}}),Fr=r(function(n,r,e){for(var t,a=[],i=0,o=e,e=r.lastIndex,u=-1;i++<n&&(t=r.exec(o))&&u!=r.lastIndex;){for(var c=t.length-1,f=Array(c);0<c;){var s=t[c];f[--c]=s?Or(s):Hr}a.push(d(it,t[0],t.index,i,v(f))),u=r.lastIndex}return r.lastIndex=e,v(a)}),Tr=1,Lr=0,Nr=e,Ir=r(function(n,r,e){for(;;){if(-2===e.$)return r;var t=e.d,a=n,i=s(n,e.b,e.c,s(Ir,n,r,e.e));n=a,r=i,e=t}}),Rr=function(n){return s(Ir,r(function(n,r,e){return l(Nr,{a:n,b:r},e)}),h,n)},qr=2,x=function(n){return{$:1,a:n}},zr=t(function(n,r){return{$:3,a:n,b:r}}),Br=t(function(n,r){return{$:0,a:n,b:r}}),Pr=t(function(n,r){return{$:1,a:n,b:r}}),w=function(n){return{$:0,a:n}},Mr=function(n){return{$:2,a:n}},Or=function(n){return{$:0,a:n}},Hr={$:1},Yr=bn,Dr=function(n){return n+""},Jr=r(function(n,r,e){for(;;){if(!e.b)return r;var t=e.b,a=n,i=l(n,e.a,r);n=a,r=i,e=t}}),Kr=function(n){return s(Jr,Nr,h,n)},Wr=n(function(n,r,e,t){return{$:0,a:n,b:r,c:e,d:t}}),Xr=[],Ur=V,Vr=t(function(n,r){return Q(r)/Q(n)}),Zr=Ur(l(Vr,2,32)),Qr=d(Wr,0,Zr,Xr,Xr),ne=O,re=Z,ee=function(n){return n.length},te=t(function(n,r){return 0<f(n,r)?n:r}),ae=H,ie=t(function(n,r){for(;;){var e=l(ae,32,n),t=e.b,e=l(Nr,{$:0,a:e.a},r);if(!t.b)return Kr(e);n=t,r=e}}),oe=t(function(n,r){for(;;){var e=Ur(r/32);if(1===e)return l(ae,32,n).a;n=l(ie,n,h),r=e}}),ue=t(function(n,r){var e,t;return r.a?(t=re(l(Vr,32,(e=32*r.a)-1)),n=n?Kr(r.d):r.d,n=l(oe,n,r.a),d(Wr,ee(r.c)+e,l(te,5,t*Zr),n,r.c)):d(Wr,ee(r.c),Zr,Xr,r.c)}),ce=z(function(n,r,e,t,a){for(;;){if(r<0)return l(ue,!1,{d:t,a:e/32|0,c:a});var i={$:1,a:s(ne,32,r,n)};n=n,r=r-32,e=e,t=l(Nr,i,t),a=a}}),fe=t(function(n,r){var e;return 0<n?b(ce,r,n-(e=n%32)-32,n,h,s(ne,e,n-e,r)):Qr}),k=function(n){return!n.$},se=on,le=function(n){return{$:0,a:n}},de=function(n){switch(n.$){case 0:return 0;case 1:return 1;case 2:return 2;default:return 3}},be=function(n){return n},he=nn,ve=function(n){return n.length},ge=function(n){for(;;)0},u=gn,e=u(0),pe=n(function(n,r,e,t){var a,i,o,u;return t.b?(a=t.a,(t=t.b).b?(i=t.a,(t=t.b).b?(o=t.a,(t=t.b).b?(u=t.b,l(n,a,l(n,i,l(n,o,l(n,t.a,500<e?s(Jr,n,r,Kr(u)):d(pe,n,r,e+1,u)))))):l(n,a,l(n,i,l(n,o,r)))):l(n,a,l(n,i,r))):l(n,a,r)):r}),me=r(function(n,r,e){return d(pe,n,r,0,e)}),ye=t(function(e,n){return s(me,t(function(n,r){return l(Nr,e(n),r)}),h,n)}),A=pn,$e=t(function(r,n){return l(A,function(n){return u(r(n))},n)}),xe=r(function(e,n,t){return l(A,function(r){return l(A,function(n){return u(l(e,r,n))},t)},n)}),we=En,ke=t(function(n,r){return $n(l(A,we(n),r))}),Ae=(m.Task={b:e,c:r(function(n,r,e){return l($e,function(n){return 0},yr(l(ye,ke(n),r)))}),d:r(function(n,r,e){return u(0)}),e:t(function(n,r){return l($e,n,r)}),f:void 0},jn("Task")),_e=t(function(n,r){return Ae(l($e,n,r))}),bn=fr,Ce={z:"",A:!1,r:""},Ee=Sn,je=Ee(h),Se=Sn(h),Ge=Gn,Fe=t(function(n,r){return{$:3,a:n,b:r}}),Te=function(n){return{$:0,a:n}},Le=t(function(n,r){return{$:4,a:n,b:r}}),Ne={$:2},Ie=function(n){return{$:1,a:n}},Re=function(n){return{$:0,a:n}},qe={$:1},_={$:-2},ze=_,Be=function(n){return!n.$},Pe=a,Me=K,Oe=t(function(n,r){for(;;){if(-2===r.$)return Hr;var e=r.c,t=r.d,a=r.e;switch(l(Me,n,r.b)){case 0:n=n,r=t;continue;case 1:return Or(e);default:n=n,r=a;continue}}}),C=z(function(n,r,e,t,a){return{$:-1,a:n,b:r,c:e,d:t,e:a}}),He=z(function(n,r,e,t,a){var i,o,u,c;return-1!==a.$||a.a?-1!==t.$||t.a||-1!==t.d.$||t.d.a?b(C,n,r,e,t,a):(i=t.d,c=t.e,b(C,0,t.b,t.c,b(C,1,i.b,i.c,i.d,i.e),b(C,1,r,e,c,a))):(i=a.b,o=a.c,u=a.d,a=a.e,-1!==t.$||t.a?b(C,n,i,o,b(C,0,r,e,t,u),a):b(C,0,r,e,b(C,1,t.b,t.c,t.d,c=t.e),b(C,1,i,o,u,a)))}),Ye=r(function(n,r,e){if(-2===e.$)return b(C,0,n,r,_,_);var t=e.a,a=e.b,i=e.c,o=e.d,u=e.e;switch(l(Me,n,a)){case 0:return b(He,t,a,i,s(Ye,n,r,o),u);case 1:return b(C,t,a,r,o,u);default:return b(He,t,a,i,o,s(Ye,n,r,u))}}),De=r(function(n,r,e){n=s(Ye,n,r,e);return-1!==n.$||n.a?n:b(C,1,n.b,n.c,n.d,n.e)}),Je=B(function(n,r,e,t,a,i,o){if(-1!==i.$||i.a){for(;;){if(-1!==o.$||1!==o.a)break;if(-1!==o.d.$)return wr(r);if(1===o.d.a)return wr(r);break}return r}return b(C,e,i.b,i.c,i.d,b(C,0,t,a,i.e,o))}),Ke=t(function(n,r){var e,t,a,i,o,u,c;return-2===r.$?_:(e=r.a,a=r.c,i=r.d,o=r.e,f(n,t=r.b)<0?-1===i.$&&1===i.a?-1!==(u=i.d).$||u.a?-1===(u=xr(r)).$?(c=u.e,b(He,u.a,u.b,u.c,l(Ke,n,u.d),c)):_:b(C,e,t,a,l(Ke,n,i),o):b(C,e,t,a,l(Ke,n,i),o):l(We,n,P(Je,n,r,e,t,a,i,o)))}),We=t(function(n,r){var e,t,a,i,o;return-1===r.$?(e=r.a,t=r.c,a=r.d,i=r.e,D(n,r=r.b)?-1===(o=function(n){for(;;){if(-1!==n.$||-1!==n.d.$)return n;n=n.d}}(i)).$?b(He,e,o.b,o.c,a,kr(i)):_:b(He,e,r,t,a,l(Ke,n,i))):_}),Xe=t(function(n,r){n=l(Ke,n,r);return-1!==n.$||n.a?n:b(C,1,n.b,n.c,n.d,n.e)}),Ue=r(function(n,r,e){r=r(l(Oe,n,e));return r.$?l(Xe,n,e):s(De,n,r.a,e)}),Ve=r(function(n,r,e){return r(n(e))}),Ze=t(function(n,r){return s(vr,"",be,l(Ve,r,n))}),Qe={$:2},nt={$:1},rt=t(function(n,r){return r.$?x(n(r.a)):w(r.a)}),et=t(function(n,r){switch(r.$){case 0:return x({$:0,a:r.a});case 1:return x(nt);case 2:return x(Qe);case 3:return x({$:3,a:r.a.aU});default:return l(rt,Ar,n(r.b))}}),tt=hn,at=(V=tt,In(O="gtagReportConversion"),m[O]={e:Rn,u:V,a:qn},jn(O)),it=n(function(n,r,e,t){return{aH:r,aJ:n,aN:e,aW:t}}),ot=Fr(1/0),ut=dr,ct=/.^/,ft=t(function(n,r){return r.$?n:r.a}),st=function(r){return l(_e,ge,{$:2,b:function(n){try{br.location=r}catch(n){Bn.location.reload(!1)}},c:null})},lt=function(n){return{$:1,a:n}},dt=t(function(n,r){return{ai:n,an:r}}),Z=u(l(dt,ze,h)),bt=function(e){return{$:2,b:function(n){var r=e.f;2===r.$&&r.c&&r.c(),e.f=null,n({$:0,a:W})},c:null}},ht=$n,vt=r(function(e,n,t){for(;;){if(!n.b)return u(t);var a,r=n.a,i=n.b;if(r.$)return a=r.a,l(A,function(n){var r=a.ap;return s(vt,e,i,1===r.$?t:s(De,r.a,n,t))},ht(s(hr,e,we(e),a)));var o=r.a,r=l(Oe,o,t);if(1!==r.$)return l(A,function(n){return s(vt,e,i,l(Xe,o,t))},bt(r.a));e=e,n=i,t=t}}),H=n(function(n,r,e,t){return l(A,function(n){return u(l(dt,n,e))},s(vt,n,r,t.ai))}),gt=r(function(n,r,e){n=n(r);return n.$?e:l(Nr,n.a,e)}),pt=t(function(n,r){return s(me,gt(n),h,r)}),mt=n(function(n,r,e,t){var a=t.b;return D(r,t.a)?Or(l(we,n,a(e))):Hr}),on=r(function(n,r,e){return l(A,function(n){return u(e)},yr(l(pt,s(mt,n,r.a,r.b),e.an)))}),nn=t(function(n,r){var e;return r.$?lt({av:(e=r.a).av,ax:e.ax,aC:l(gr,n,e.aC),aE:e.aE,aK:e.aK,aY:e.aY,ap:e.ap,a$:e.a$}):{$:0,a:r.a}}),yt=t(function(n,r){return{$:0,a:n,b:r}}),$t=(m.Http={b:Z,c:H,d:on,e:nn,f:t(function(n,r){return l(yt,r.a,l(Ve,r.b,n))})},jn("Http")),xt=(jn("Http"),t(function(n,r){switch(n.$){case 0:return{a:X(r,{z:n.a}),b:je};case 1:return _r(r.z)?(e=v([{a:"email",b:tt(r.z)}]),e=s(Jr,t(function(n,r){return s(vn,n.a,n.b,r)}),{},e),{a:X(r,{A:!0,r:"Your request is being processed..."}),b:Cr({ax:l(pr,"application/json",l(Yr,0,e)),aC:l(Ze,$r,et(w)),a$:"https://api.catholicstoriesforchildren.com/add-contact"})}):{a:X(r,{r:"Error: Please enter a valid email"}),b:je};default:return n.a.$?{a:X(r,{A:!1,r:"Error: please try again later"}),b:je}:{a:X(r,{A:!1,r:"Email sent!"}),b:Ee(v([at(""),st("/thankyou")]))}}var e})),En=t(function(n,r){var n=l(xt,n,r.F),e=n.b;return{a:X(r,{F:n.a}),b:l(Ge,be,e)}}),i=c("div"),o=Yn,E=c("a"),j=t(function(n,r){return l(Dn,n,tt(r))}),F=j("className"),T=c("p"),L=Pn,wt=l(i,v([F("mx-auto col-span-2 w-full"),F("text-lg"),F("max-w-3xl")]),v([l(T,v([F("my-3")]),v([L("Use this animation to help your children learn the Guardian Angel prayer though a story and song. It also will help your children understand the concept of a guardian angel.")])),l(T,v([F("my-3")]),v([L("This animation is meant to be an aid for your children to slowly build a habit of prayer. You can use it during prayer time while kids are still learning both the words and the solemn manner to pray.")]))])),kt=j("alt"),N=t(function(n,r){return l(y,function(n){return/^(on|formAction$)/i.test(n)?"data-"+n:n}(n),Jn(r))}),At=c("h1"),I=function(n){return l(j,"href",/^javascript:/i.test((n=n).replace(/\s/g,""))?"":n)},_t=c("img"),e=c("blockquote"),fr=j("cite"),Gn=c("h2"),Ct=l(i,v([F("mx-auto col-span-2 w-full"),F("text-lg"),F("py-5"),F("max-w-3xl")]),v([l(Gn,v([F("mb-10")]),v([L("Popes and The Magisterium")])),l(T,v([F("")]),v([L("We can also find popes and magisterial teachings on the care of angels over us.")])),l(e,v([fr(""),F("my-10"),F("rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800"),F("italic")]),v([l(T,v([F("inline"),F("text-gray-500 dark:text-gray-400")]),v([L("From its beginning until death, human life is surrounded by their watchful care and intercession.")])),l(T,v([F("mt-2")]),v([L("CCC 336")]))])),l(e,v([fr(""),F("my-10"),F("rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800"),F("italic")]),v([l(T,v([F("inline"),F("text-gray-500 dark:text-gray-400")]),v([L("Dear friends, the Lord is ever close and active in humanity’s history and accompanies us with the unique presence of his Angels, whom today the Church venerates as “Guardian Angels”, that is, ministers of the divine care for every human being. From the beginning until the hour of death, human life is surrounded by their constant protection.")])),l(T,v([F("mt-2")]),v([L("Pope Benedict XVI, Angelus, Oct. 2, 2011]")]))]))])),Et=On,a=c("span"),jt=l(i,v([F("mx-auto col-span-2 w-full"),F("text-lg"),F("py-5"),F("max-w-3xl")]),v([l(Gn,v([F("mb-10")]),v([L("Scripture")])),l(T,v([F("")]),v([L("We find a reference to guardian angels in Jesus' parable of the Lost Sheep. He talks about the guardian angels of the little ones and how their angels always look upon the face of God the Father in heaven.")])),l(T,v([F("my-3 font-semibold")]),v([L("See that you do not despise one of these little ones, for I say to you that their angels in heaven always look upon the face of my heavenly Father.  - Matthew 18:10 ")])),l(T,v([F("")]),v([L("We also find a reference to guardian angels in Acts of the Apostles when Peter knocked on the gateway door at the house of Mary, the mother of Mark. Rhonda was excited to hear his voice so she ran to the others to announce his arrival. But they didn't believe her and thought it was Peter's angel.")])),l(T,v([F("my-3 font-semibold")]),v([l(a,v([F("italic")]),v([L(" Angelus eius est! ")])),l(a,h,v([L('- "It\'s his angel!" - Acts 12:15 ')]))])),l(e,v([fr(""),F("my-10"),F("rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800"),F("italic")]),v([l(T,v([F("inline"),F("text-gray-500 dark:text-gray-400")]),v([L(" See on what intimate terms the early Christians were with their guardian angels. And what about you? ")])),l(T,v([F("mt-2")]),v([L("St Josemaría Escrivá, The Way, 570")]))]))])),St=function(n){return l(j,"src",Jn(n))},Gt=l(i,v([F("mx-auto col-span-2 w-full"),F("text-lg"),F("py-5"),F("max-w-3xl")]),v([l(Gn,v([F("mb-10")]),v([L("Tradition")])),l(T,v([F("")]),v([L("We can find some of our early church fathers talking about guardian angels.")])),l(e,v([fr(""),F("my-10"),F("rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800"),F("italic")]),v([l(T,v([F("inline"),F("text-gray-500 dark:text-gray-400")]),v([L("For regiments of angels are distributed over nations and cities; and perhaps some even are assigned to particular individuals.")])),l(T,v([F("mt-2")]),v([L("Clement of Alexandria, Miscellanies 6.17")]))])),l(e,v([fr(""),F("my-10"),F("rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800"),F("italic")]),v([l(T,v([F("inline"),F("text-gray-500 dark:text-gray-400")]),v([L("High dignity of souls, that each from its birth has an Angel set in charge over it!")])),l(T,v([F("mt-2")]),v([L("St. Jerome")]))])),l(e,v([fr(""),F("my-10"),F("rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800"),F("italic")]),v([l(T,v([F("inline"),F("text-gray-500 dark:text-gray-400")]),v([L("Beside each believer stands an angel as protector and shepherd leading him to life.")])),l(T,v([F("mt-2")]),v([L("St. Basil, Adv. Eunomium III, 1: PG 29, 656B")]))]))])),Ft={$:1},Tt=c("input"),Lt=an,Nt=function(n){return{$:1,a:n}},It=tn,Rt=l(It,"keyCode",rn),qt=Hn,zt=t(function(n,r){return l(qt,n,{$:0,a:r})}),Bt=t(function(n,r){return l(qt,n,{$:1,a:r})}),K=en,Pt=l(t(function(n,r){return s(me,It,r,n)}),v(["target","value"]),K),Mt=j("placeholder"),Ot=j("type"),Ht=j("value"),Yt=c("button"),Dt=hn,Jt=t(function(n,r){return l(Dn,n,Dt(r))})("disabled"),Rn=Mn("http://www.w3.org/2000/svg"),Kt=Rn("circle"),Wt=y("class"),Xt=y("cx"),Ut=y("cy"),Vt=y("d"),Zt=y("fill"),Qt=Rn("path"),na=y("r"),ra=y("stroke"),ea=y("stroke-width"),ta=Rn("svg"),aa=y("viewBox"),ia=function(n){return l(i,h,v([l(i,h,v([l(i,v([F("mb-5")]),v([l(T,v([F("pb-2 pl-1 text-left")]),v([L("Get free animations for kids. Stay updated with new ones!")])),l(i,h,v([l(Tt,v([Ot("text"),Mt("First Name"),l(N,"aria-hidden","true"),l(o,"display","none")]),h),l(Tt,v([Ot("email"),Mt("Email"),Ht(n.z),l(Bt,"input",l(se,jr,l(se,Er,Pt))),(r=Ft,l(zt,"keydown",l(Lt,function(n){return 13===n?le(r):Nt("not ENTER")},Rt))),l(N,"required","true"),l(o,"padding","10px 20px"),l(o,"border-radius","5px 0px 0px 5px"),l(o,"box-shadow","#777 1px 1px 5px"),F("w-[172px] md:w-[230px] h-[56px] text-lg")]),h),Sr(n),function(n){return l(i,v([F(l(he,"Error",n.r)?"text-rose-600":"text-emerald-500"),F("text-left pl-1")]),v([L(n.r)]))}(n)]))]))]))]));var r},oa=j("target"),ua=l(i,h,v([l(Gn,v([F("mb-3 mt-5")]),v([L("Guardian Angel Activities")])),l(i,v([F("grid grid-cols-2 gap-4")]),v([l(i,h,v([l(T,v([F("h-14")]),v([L("Access coloring pages, copywork, discussion questions and more!")])),l(E,v([l(N,"aria-label","Guardian Angel Activities"),I("/printables/Guardian-Angel-Activities.pdf"),oa("_blank")]),v([l(_t,v([F("w-full max-w-[400px]"),F("transition ease-in-out hover:scale-110"),St("https://ik.imagekit.io/catholicstories/Guardian_Angel_Activity_Cover_1__vNBJQA8Y8.png?updatedAt=1688494259496")]),h)]))])),l(i,h,v([l(T,v([F("h-14")]),v([L("Answers to Guardian Angel activity questions.")])),l(E,v([l(N,"aria-label","Guardian Angel Activity Answers"),I("/printables/Guardian-Angel-Activity-Answers.pdf"),oa("_blank")]),v([l(_t,v([F("w-full max-w-[400px]"),F("transition ease-in-out hover:scale-110"),St("https://ik.imagekit.io/catholicstories/Guardian_Angel_Activities_Answers_3__-3FACN8K8.png?updatedAt=1688495546612")]),h)]))]))]))])),ca=l(i,v([F("mt-10 text-lg")]),v([l(Gn,v([F("mb-3")]),v([L("The Prayer")])),l(T,h,v([l(a,v([F("block")]),v([L("Angel Of God, my guardian dear,")])),l(a,v([F("block")]),v([L("to whom God's love commits me here,")])),l(a,v([F("block")]),v([L("ever this day be at my side,")])),l(a,v([F("block")]),v([L("to light and guard, to rule and guide.")])),l(a,v([F("block")]),v([L("Amen.")]))]))])),fa=c("iframe"),sa=t(function(n,r){return l(Dn,function(n){return"innerHTML"==n||"formAction"==n?"data-"+n:n}(n),Jn(r))}),la=j("title"),da=l(t(function(n,r){return l(i,v([l(o,"position","relative"),l(o,"padding-bottom","56.25%"),l(y,"height",Dr(0)),l(o,"overflow","hidden"),l(o,"max-width","100%"),l(o,"border-radius","5px")]),v([l(fa,v([l(o,"position","absolute"),l(o,"width","100%"),l(o,"height","100%"),l(o,"top","0"),l(o,"left","0"),St(r),la(n),l(sa,"frameborder",tt("0")),l(sa,"allow",tt("accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture")),l(sa,"allowfullscreen",tt("true"))]),h)]))}),"Guardian Angel | Prayer Time with Angels","https://www.youtube-nocookie.com/embed/03hmpXjV_ck?playlist=03hmpXjV_ck&loop=1"),ba=l(c("footer"),v([l(o,"padding",Dr(30)+"px"),l(o,"background-color","black"),l(o,"color","white"),l(o,"transform-style","preserve-3d")]),v([l(i,v([F("flex items-center gap-2.5")]),v([l(a,h,v([L("Follow us on")])),l(E,v([I("https://www.facebook.com/catholicstoriesforchildren"),l(N,"aria-label","CSC Facebook Page"),oa("_blank")]),v([l(_t,v([F("w-10 h-10"),St("https://ik.imagekit.io/catholicstories/f_logo_RGB-Blue_250_3vs-yhXer.png?updatedAt=1684277030198"),kt("Facebook")]),h)])),l(E,v([I("https://www.instagram.com/catholicstoriesforchildren/"),l(N,"aria-label","CSC Instagram Page"),oa("_blank")]),v([l(_t,v([F("w-10 h-10"),St("https://ik.imagekit.io/catholicstories/Instagram_Glyph_Gradient_kFoMs9jIr.png?updatedAt=1684277127293"),kt("Instagram")]),h)]))])),l(T,h,v([L("Copyright © 2024 Catholic Stories for Children. All rights reserved.")])),l(T,h,v([L("Catholic Stories for Children is a 501(c)(3) non-profit recognized by the IRS. Contributions to Catholic Stories for Children are tax-deductible to the extent permitted by law.  Tax ID Number: 85-4194883")]))])),ha=c("header"),va=c("nav"),ga=n(function(n,r,e,t){return l(E,v([I(r),F("flex items-center justify-center"),F("hover:scale-105 transition ease-in-out"),F("hover:border-b-4 hover:border-[#9101b3]"),F("rounded"),F("h-[60px] h-["+n+"]"),F("p-2"),l(N,"aria-label",t),oa(e)]),v([L(t)]))}),pa=l(E,v([I("/navigation"),F("space-y-2"),l(N,"aria-label","menu")]),v([l(i,v([F("w-8 h-0.5 m-auto bg-gray-600")]),h),l(i,v([F("w-8 h-0.5 m-auto bg-gray-600")]),h),l(i,v([F("w-8 h-0.5 m-auto bg-gray-600")]),h)])),ma=t(function(n,r){var n=n?{a:"text-[0px] md:text-xl",b:"invisible md:visible"}:{a:"text-lg md:text-xl",b:""},e=n.a,n=n.b;return l(E,v([l(o,"text-decoration","none"),F("colorDarkGray"),F(n),F("justify-self-start"),I("/")]),v([l(At,v([l(o,"font-family","hvdComicSerifPro"),l(o,"margin","0px"),F(e)]),v([L("Catholic Stories for Children")]))]))}),V=l(_t,v([St("/assets/logo_solid.svg"),l(o,"height","30px"),kt(""),l(o,"vertical-align","middle")]),h),ya=l(E,v([l(o,"text-decoration","none"),F("colorDarkGray"),I("/"),l(N,"aria-label","home")]),v([V])),$a=t(function(n,r){var e="Catholic Stories for Children"===n?{a:"111px",b:Gr,c:"grid-cols-[150px_1fr_150px] lg:grid-cols-[150px_1fr_600px]"}:{a:"60px",b:Gr,c:"grid-cols-[150px_1fr_150px] lg:grid-cols-[150px_1fr_600px]"},t=e.a,a=e.b,e=e.c;return l(ha,v([l(o,"background-color","#3d5d75"),l(o,"background-image","linear-gradient(130deg, #9DE2EB , #EBD6F1)"),F("h-[60px] md:h-["+t+"]"),F("colorDarkGray"),F("grid items-center justify-items-center"),F(e)]),v([ya,l(ma,!0,n),a(t)]))}),O=bn({aI:function(n){return{a:{F:Ce},b:je}},aX:function(n){return Se},a_:En,a0:function(n){return l(i,v([l(o,"height","100vh"),l(o,"overflow-x","hidden"),l(o,"overflow-y","auto"),l(o,"perspective","300px"),l(o,"scroll-behavior","smooth"),l(o,"background-color","#FEF7F4")]),v([l($a,"Guardian Angel",10),function(n){return l(i,v([F("max-w-3xl"),F("m-auto"),F("p-5"),F("mb-10")]),v([l(At,v([F("my-10 leading-10")]),v([L("Guardian Angel Prayer")])),wt,l(E,v([I("/animations/actofcontrition"),F("hover:scale-105 transition ease-in-out duration-50"),l(N,"aria-label","Act of Contrition Animation Coming Soon"),F("block mb-2")]),v([l(_t,v([St("/assets/images/AnimationImageLinks/ActOfContritionComingSoon.png"),l(o,"border-radius","5px"),l(o,"width","-webkit-fill-available"),kt("Act of Contrition Animation")]),h)])),l(i,v([F("mb-20")]),v([l(Et,be,ia(n.F))])),da,l(i,v([F("py-4")]),v([ua])),ca,jt,Gt,Ct]))}(n),ba]))}});Fr={Animations:{GuardianAngel:{Main:{init:O(le(0))(0)}}}},R.Elm?function n(r,e){for(var t in e)t in r?"init"==t?Y(6):n(r[t],e[t]):r[t]=e[t]}(R.Elm,Fr):R.Elm=Fr}(this);