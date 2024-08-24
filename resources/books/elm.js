!function(M){"use strict";function N(t,n,r){return r.a=t,r.f=n,r}function e(r){return N(2,r,function(n){return function(t){return r(n,t)}})}function n(e){return N(3,e,function(r){return function(n){return function(t){return e(r,n,t)}}})}function t(o){return N(4,o,function(e){return function(r){return function(n){return function(t){return o(e,r,n,t)}}}})}function R(a){return N(5,a,function(o){return function(e){return function(r){return function(n){return function(t){return a(o,e,r,n,t)}}}}})}function K(u){return N(7,u,function(i){return function(a){return function(o){return function(e){return function(r){return function(n){return function(t){return u(i,a,o,e,r,n,t)}}}}}}})}function l(t,n,r){return 2===t.a?t.f(n,r):t(n)(r)}function s(t,n,r,e){return 3===t.a?t.f(n,r,e):t(n)(r)(e)}function d(t,n,r,e,o){return 4===t.a?t.f(n,r,e,o):t(n)(r)(e)(o)}function b(t,n,r,e,o,a){return 5===t.a?t.f(n,r,e,o,a):t(n)(r)(e)(o)(a)}function z(t,n,r,e,o,a,i,u){return 7===t.a?t.f(n,r,e,o,a,i,u):t(n)(r)(e)(o)(a)(i)(u)}var h={$:0};function D(t,n){return{$:1,a:t,b:n}}var q=e(D);function v(t){for(var n=h,r=t.length;r--;)n={$:1,a:t[r],b:n};return n}var H=n(function(t,n,r){for(var e=Array(t),o=0;o<t;o++)e[o]=r(n+o);return e}),G=e(function(t,n){for(var r=Array(t),e=0;e<t&&n.b;e++)r[e]=n.a,n=n.b;return r.length=e,{a:r,b:n}});function O(t){throw Error("https://github.com/elm/core/blob/1.0.0/hints/"+t+".md")}function J(t,n){for(var r,e=[],o=Y(t,n,0,e);o&&(r=e.pop());o=Y(r.a,r.b,0,e));return o}function Y(t,n,r,e){if(t!==n){if("object"!=typeof t||null===t||null===n)return"function"==typeof t&&O(5),!1;if(100<r)e.push({a:t,b:n});else for(var o in t.$<0&&(t=Cn(t),n=Cn(n)),t)if(!Y(t[o],n[o],r+1,e))return!1}return!0}function f(t,n,r){if("object"!=typeof t)return t===n?0:t<n?-1:1;if(void 0===t.$)return(r=(r=f(t.a,n.a))||f(t.b,n.b))||f(t.c,n.c);for(;t.b&&n.b&&!(r=f(t.a,n.a));t=t.b,n=n.b);return r||(t.b?1:n.b?-1:0)}var X=e(function(t,n){t=f(t,n);return t<0?xn:t?En:_n}),Z=0;function o(t,n){var r,e={};for(r in t)e[r]=t[r];for(r in n)e[r]=n[r];return e}var U=Math.ceil,W=Math.floor,V=Math.log;var Q=e(p);function p(t,n){switch(t.$){case 2:return t.b(n);case 5:return null===n?w(t.c):g("null",n);case 3:return nt(n)?tt(t.b,n,v):g("a LIST",n);case 4:return nt(n)?tt(t.b,n,rt):g("an ARRAY",n);case 6:var r=t.d;return"object"==typeof n&&null!==n&&r in n?(a=p(t.b,n[r]),_(a)?a:k(l(Pn,r,a.a))):g("an OBJECT with a field named `"+r+"`",n);case 7:r=t.e;return nt(n)?r<n.length?(a=p(t.b,n[r]),_(a)?a:k(l(In,r,a.a))):g("a LONGER array. Need index "+r+" but only see "+n.length+" entries",n):g("an ARRAY",n);case 8:if("object"!=typeof n||null===n||nt(n))return g("an OBJECT",n);var e,o=h;for(e in n)if(n.hasOwnProperty(e)){var a=p(t.b,n[e]);if(!_(a))return k(l(Pn,e,a.a));o={$:1,a:{a:e,b:a.a},b:o}}return w(Mn(o));case 9:for(var i=t.f,u=t.g,c=0;c<u.length;c++){a=p(u[c],n);if(!_(a))return a;i=i(a.a)}return w(i);case 10:a=p(t.b,n);return _(a)?p(t.h(a.a),n):a;case 11:for(var f=h,s=t.g;s.b;s=s.b){a=p(s.a,n);if(_(a))return a;f={$:1,a:a.a,b:f}}return k(Sn(Mn(f)));case 1:return k(l(jn,t.a,n));case 0:return w(t.a)}}function tt(t,n,r){for(var e=n.length,o=Array(e),a=0;a<e;a++){var i=p(t,n[a]);if(!_(i))return k(l(In,a,i.a));o[a]=i.a}return w(r(o))}function nt(t){return Array.isArray(t)||"undefined"!=typeof FileList&&t instanceof FileList}function rt(n){return l(Vn,n.length,function(t){return n[t]})}function g(t,n){return k(l(jn,"Expecting "+t,n))}function et(t,n){if(t===n)return!0;if(t.$!==n.$)return!1;switch(t.$){case 0:case 1:return t.a===n.a;case 2:return t.b===n.b;case 5:return t.c===n.c;case 3:case 4:case 8:return et(t.b,n.b);case 6:return t.d===n.d&&et(t.b,n.b);case 7:return t.e===n.e&&et(t.b,n.b);case 9:return t.f===n.f&&ot(t.g,n.g);case 10:return t.h===n.h&&et(t.b,n.b);case 11:return ot(t.g,n.g)}}function ot(t,n){var r=t.length;if(r!==n.length)return!1;for(var e=0;e<r;e++)if(!et(t[e],n[e]))return!1;return!0}var at=e(function(t,n){return JSON.stringify(n,null,t)+""});function it(t){return t}var ut=n(function(t,n,r){return r[t]=n,r});function ct(t){return{$:0,a:t}}var ft=e(function(t,n){return{$:3,b:t,d:n}});var st=0;function lt(t){t={$:0,e:st++,f:t,g:null,h:[]};return gt(t),t}function dt(n){return{$:2,b:function(t){t({$:0,a:lt(n)})},c:null}}function bt(t,n){t.h.push(n),gt(t)}var ht=e(function(n,r){return{$:2,b:function(t){bt(n,r),t({$:0,a:Z})},c:null}});var vt=!1,pt=[];function gt(t){if(pt.push(t),!vt){for(vt=!0;t=pt.shift();)!function(n){for(;n.f;){var t=n.f.$;if(0===t||1===t){for(;n.g&&n.g.$!==t;)n.g=n.g.i;if(!n.g)return;n.f=n.g.b(n.f.a),n.g=n.g.i}else{if(2===t)return n.f.c=n.f.b(function(t){n.f=t,gt(n)});if(5===t){if(0===n.h.length)return;n.f=n.f.b(n.h.shift())}else n.g={$:3===t?0:1,b:n.f.b,i:n.g},n.f=n.f.d}}}(t);vt=!1}}function mt(t,n,r,e,o,a){var t=l(Q,t,n?n.flags:void 0),i=(_(t)||O(2),{}),n=r(t.a),u=n.a,c=a(f,u),r=function(t,n){var r,e;for(e in m){var o=m[e];o.a&&((r=r||{})[e]=o.a(e,n)),t[e]=function(t,n){var e={g:n,h:void 0},o=t.c,a=t.d,i=t.e,u=t.f;function c(r){return l(ft,c,{$:5,b:function(t){var n=t.a;return 0===t.$?s(a,e,n,r):i&&u?d(o,e,n.i,n.j,r):s(o,e,i?n.i:n.j,r)}})}return e.h=lt(l(ft,c,t.b))}(o,n)}return r}(i,f);function f(t,n){t=l(e,t,u);c(u=t.a,n),Ct(i,t.b,o(u))}return Ct(i,n.b,o(u)),r?{ports:r}:{}}var m={};var $t=e(function(n,r){return{$:2,b:function(t){n.g(r),t({$:0,a:Z})},c:null}}),kt=e(function(t,n){return l(ht,t.h,{$:0,a:n})});function wt(n){return function(t){return{$:1,k:n,l:t}}}function yt(t){return{$:2,m:t}}var _t=e(function(t,n){return{$:3,n:t,o:n}}),xt=[],At=!1;function Ct(t,n,r){if(xt.push({p:t,q:n,r:r}),!At){At=!0;for(var e;e=xt.shift();)!function(t,n,r){var e,o={};for(e in Et(!0,n,o,null),Et(!1,r,o,null),t)bt(t[e],{$:"fx",a:o[e]||{i:h,j:h}})}(e.p,e.q,e.r);At=!1}}function Et(t,n,r,e){switch(n.$){case 1:var o=n.k,a=function(t,n,r,e){function o(t){for(var n=r;n;n=n.t)t=n.s(t);return t}return l(t?m[n].e:m[n].f,o,e)}(t,o,e,n.l);return void(r[o]=function(t,n,r){return r=r||{i:h,j:h},t?r.i={$:1,a:n,b:r.i}:r.j={$:1,a:n,b:r.j},r}(t,a,r[o]));case 2:for(var i=n.m;i.b;i=i.b)Et(t,i.a,r,e);return;case 3:Et(t,n.o,r,{s:n.n,t:e})}}function jt(t){m[t]&&O(3)}var Pt=e(function(t,n){return n});function It(t){var r,i=[],u=m[t].u,c=(r=0,{$:2,b:function(t){var n=setTimeout(function(){t({$:0,a:Z})},r);return function(){clearTimeout(n)}},c:null});return m[t].b=c,m[t].c=n(function(t,n,r){for(;n.b;n=n.b)for(var e=i,o=u(n.a),a=0;a<e.length;a++)e[a](o);return c}),{subscribe:function(t){i.push(t)},unsubscribe:function(t){(t=(i=i.slice()).indexOf(t))<0||i.splice(t,1)}}}var St;var Tt="undefined"!=typeof document?document:{};function Bt(t){return{$:0,a:t}}var c=e(function(a,i){return e(function(t,n){for(var r=[],e=0;n.b;n=n.b){var o=n.a;e+=o.b||0,r.push(o)}return e+=r.length,{$:1,c:i,d:zt(t),e:r,f:a,b:e}})})(void 0);e(function(a,i){return e(function(t,n){for(var r=[],e=0;n.b;n=n.b){var o=n.a;e+=o.b.b||0,r.push(o)}return e+=r.length,{$:2,c:i,d:zt(t),e:r,f:a,b:e}})})(void 0);var Lt=e(function(t,n){return{$:4,j:t,k:n,b:1+(n.b||0)}});var Ft=e(function(t,n){return{$:"a1",n:t,o:n}}),Mt=e(function(t,n){return{$:"a2",n:t,o:n}}),Nt=e(function(t,n){return{$:"a3",n:t,o:n}});function Rt(t){return/^\s*(javascript:|data:text\/html)/i.test(t)?"":t}var Kt;function zt(t){for(var n={};t.b;t=t.b){var r,e=t.a,o=e.$,a=e.n,e=e.o;"a2"===o?"className"===a?Dt(n,a,e):n[a]=e:(r=n[o]||(n[o]={}),"a3"===o&&"class"===a?Dt(r,a,e):r[a]=e)}return n}function Dt(t,n,r){var e=t[n];t[n]=e?e+" "+r:r}function $(t,n){var r=t.$;if(5===r)return $(t.k||(t.k=t.m()),n);if(0===r)return Tt.createTextNode(t.a);if(4===r){for(var e=t.k,o=t.j;4===e.$;)"object"!=typeof o?o=[o,e.j]:o.push(e.j),e=e.k;var a={j:o,p:n};(i=$(e,a)).elm_event_node_ref=a}else if(3===r)qt(i=t.h(t.g),n,t.d);else{var i=t.f?Tt.createElementNS(t.f,t.c):Tt.createElement(t.c);St&&"a"==t.c&&i.addEventListener("click",St(i)),qt(i,n,t.d);for(var u=t.e,c=0;c<u.length;c++)i.appendChild($(1===r?u[c]:u[c].b,n))}return i}function qt(t,n,r){for(var e in r){var o=r[e];"a1"===e?function(t,n){var r,e=t.style;for(r in n)e[r]=n[r]}(t,o):"a0"===e?function(t,n,r){var e,o=t.elmFs||(t.elmFs={});for(e in r){var a=r[e],i=o[e];if(a){if(i){if(i.q.$===a.$){i.q=a;continue}t.removeEventListener(e,i)}i=function(c,t){function f(t){var n=f.q,r=p(n.a,t);if(_(r)){for(var e,n=Qn(n),r=r.a,o=n?n<3?r.a:r.w:r,a=1==n?r.b:3==n&&r.V,i=(a&&t.stopPropagation(),(2==n?r.b:3==n&&r.S)&&t.preventDefault(),c);e=i.j;){if("function"==typeof e)o=e(o);else for(var u=e.length;u--;)o=e[u](o);i=i.p}i(o,a)}}return f.q=t,f}(n,a),t.addEventListener(e,i,Kt&&{passive:Qn(a)<2}),o[e]=i}else t.removeEventListener(e,i),o[e]=void 0}}(t,n,o):"a3"===e?function(t,n){for(var r in n){var e=n[r];void 0!==e?t.setAttribute(r,e):t.removeAttribute(r)}}(t,o):"a4"===e?function(t,n){for(var r in n){var e=n[r],o=e.f,e=e.o;void 0!==e?t.setAttributeNS(o,r,e):t.removeAttributeNS(o,r)}}(t,o):("value"!==e&&"checked"!==e||t[e]!==o)&&(t[e]=o)}}try{window.addEventListener("t",null,Object.defineProperty({},"passive",{get:function(){Kt=!0}}))}catch(t){}function Ht(t,n){var r=[];return I(t,n,r,0),r}function P(t,n,r,e){n={$:n,r:r,s:e,t:void 0,u:void 0};return t.push(n),n}function I(t,n,r,e){if(t!==n){var o=t.$,a=n.$;if(o!==a){if(1!==o||2!==a)return void P(r,0,e,n);n=function(t){for(var n=t.e,r=n.length,e=Array(r),o=0;o<r;o++)e[o]=n[o].b;return{$:1,c:t.c,d:t.d,e:e,f:t.f,b:t.b}}(n),a=1}switch(a){case 5:for(var i=t.l,u=n.l,c=i.length,f=c===u.length;f&&c--;)f=i[c]===u[c];if(f)return void(n.k=t.k);n.k=n.m();var s=[];return I(t.k,n.k,s,0),void(0<s.length&&P(r,1,e,s));case 4:for(var l=t.j,d=n.j,b=!1,h=t.k;4===h.$;)b=!0,"object"!=typeof l?l=[l,h.j]:l.push(h.j),h=h.k;for(var v=n.k;4===v.$;)b=!0,"object"!=typeof d?d=[d,v.j]:d.push(v.j),v=v.k;return b&&l.length!==d.length?void P(r,0,e,n):((b?function(t,n){for(var r=0;r<t.length;r++)if(t[r]!==n[r])return;return 1}(l,d):l===d)||P(r,2,e,d),void I(h,v,r,e+1));case 0:return void(t.a!==n.a&&P(r,3,e,n.a));case 1:return void Gt(t,n,r,e,Jt);case 2:return void Gt(t,n,r,e,Yt);case 3:if(t.h!==n.h)return void P(r,0,e,n);s=Ot(t.d,n.d),s=(s&&P(r,4,e,s),n.i(t.g,n.g));s&&P(r,5,e,s)}}}function Gt(t,n,r,e,o){var a;t.c!==n.c||t.f!==n.f?P(r,0,e,n):((a=Ot(t.d,n.d))&&P(r,4,e,a),o(t,n,r,e))}function Ot(t,n,r){var e,o,a,i,u;for(o in t)"a1"===o||"a0"===o||"a3"===o||"a4"===o?(a=Ot(t[o],n[o]||{},o))&&((e=e||{})[o]=a):o in n?(a=t[o])===(i=n[o])&&"value"!==o&&"checked"!==o||"a0"===r&&function(t,n){return t.$==n.$&&et(t.a,n.a)}(a,i)||((e=e||{})[o]=i):(e=e||{})[o]=r?"a1"===r?"":"a0"===r||"a3"===r?void 0:{f:t[o].f,o:void 0}:"string"==typeof t[o]?"":null;for(u in n)u in t||((e=e||{})[u]=n[u]);return e}function Jt(t,n,r,e){var o=t.e,a=n.e,t=o.length,n=a.length;n<t?P(r,6,e,{v:n,i:t-n}):t<n&&P(r,7,e,{v:t,e:a});for(var i=t<n?t:n,u=0;u<i;u++){var c=o[u];I(c,a[u],r,++e),e+=c.b||0}}function Yt(t,n,r,e){for(var o=[],a={},i=[],u=t.e,c=n.e,f=u.length,s=c.length,l=0,d=0,b=e;l<f&&d<s;){var h=u[l],v=c[d],p=h.a,g=v.a,m=h.b,$=v.b,k=void 0,w=void 0;if(p===g)I(m,$,o,++b),b+=m.b||0,l++,d++;else{var y,_,x,A,C=u[l+1],E=c[d+1];if(C&&(_=C.b,w=g===(y=C.a)),E&&(A=E.b,k=p===(x=E.a)),k&&w)I(m,A,o,++b),Zt(a,o,p,$,d,i),b+=m.b||0,Ut(a,o,p,_,++b),b+=_.b||0,l+=2,d+=2;else if(k)b++,Zt(a,o,g,$,d,i),I(m,A,o,b),b+=m.b||0,l+=1,d+=2;else if(w)Ut(a,o,p,m,++b),b+=m.b||0,I(_,$,o,++b),b+=_.b||0,l+=2,d+=1;else{if(!C||y!==x)break;Ut(a,o,p,m,++b),Zt(a,o,g,$,d,i),b+=m.b||0,I(_,A,o,++b),b+=_.b||0,l+=2,d+=2}}}for(;l<f;){m=(h=u[l]).b;Ut(a,o,h.a,m,++b),b+=m.b||0,l++}for(;d<s;){var j=j||[];Zt(a,o,(v=c[d]).a,v.b,void 0,j),d++}(0<o.length||0<i.length||j)&&P(r,8,e,{w:o,x:i,y:j})}var Xt="_elmW6BL";function Zt(t,n,r,e,o,a){var i,u=t[r];u?1===u.c?(a.push({r:o,A:u}),u.c=2,I(u.z,e,i=[],u.r),u.r=o,u.s.s={w:i,A:u}):Zt(t,n,r+Xt,e,o,a):(a.push({r:o,A:u={c:0,z:e,r:o,s:void 0}}),t[r]=u)}function Ut(t,n,r,e,o){var a,i=t[r];i?0===i.c?(i.c=2,I(e,i.z,a=[],o),P(n,9,o,{w:a,A:i})):Ut(t,n,r+Xt,e,o):(a=P(n,9,o,void 0),t[r]={c:1,z:e,r:o,s:a})}function Wt(t,n,r,e){!function t(n,r,e,o,a,i,u){var c=e[o];var f=c.r;for(;f===a;){var s,l=c.$;if(1===l?Wt(n,r.k,c.s,u):8===l?(c.t=n,c.u=u,0<(s=c.s.w).length&&t(n,r,s,0,a,i,u)):9===l?(c.t=n,c.u=u,(l=c.s)&&(l.A.s=n,0<(s=l.w).length)&&t(n,r,s,0,a,i,u)):(c.t=n,c.u=u),!(c=e[++o])||(f=c.r)>i)return o}var d=r.$;if(4===d){for(var b=r.k;4===b.$;)b=b.k;return t(n,b,e,o,a+1,i,n.elm_event_node_ref)}var h=r.e;var v=n.childNodes;for(var p=0;p<h.length;p++){var g=1===d?h[p]:h[p].b,m=++a+(g.b||0);if(a<=f&&f<=m&&(o=t(v[p],g,e,o,a,m,u),!(c=e[o])||(f=c.r)>i))return o;a=m}return o}(t,n,r,0,0,n.b,e)}function Vt(t,n,r,e){return 0===r.length?t:(Wt(t,n,r,e),Qt(t,r))}function Qt(t,n){for(var r=0;r<n.length;r++){var e=n[r],o=e.t,e=function(t,n){switch(n.$){case 0:return function(t,n,r){var e=t.parentNode,n=$(n,r);n.elm_event_node_ref||(n.elm_event_node_ref=t.elm_event_node_ref);e&&n!==t&&e.replaceChild(n,t);return n}(t,n.s,n.u);case 4:return qt(t,n.u,n.s),t;case 3:return t.replaceData(0,t.length,n.s),t;case 1:return Qt(t,n.s);case 2:return t.elm_event_node_ref?t.elm_event_node_ref.j=n.s:t.elm_event_node_ref={j:n.s,p:n.u},t;case 6:for(var r=n.s,e=0;e<r.i;e++)t.removeChild(t.childNodes[r.v]);return t;case 7:for(var o=(r=n.s).e,e=r.v,a=t.childNodes[e];e<o.length;e++)t.insertBefore($(o[e],n.u),a);return t;case 9:var i;return(r=n.s)?(void 0!==(i=r.A).r&&t.parentNode.removeChild(t),i.s=Qt(t,r.w)):t.parentNode.removeChild(t),t;case 8:return function(t,n){for(var r=n.s,e=function(t,n){if(t){for(var r=Tt.createDocumentFragment(),e=0;e<t.length;e++){var o=t[e].A;r.appendChild(2===o.c?o.s:$(o.z,n.u))}return r}}(r.y,n),o=(t=Qt(t,r.w),r.x),a=0;a<o.length;a++){var i=o[a],u=i.A,u=2===u.c?u.s:$(u.z,n.u);t.insertBefore(u,t.childNodes[i.r])}e&&t.appendChild(e);return t}(t,n);case 5:return n.s(t);default:O(10)}}(o,e);o===t&&(t=e)}return t}function tn(t){if(3===t.nodeType)return{$:0,a:t.textContent};if(1!==t.nodeType)return{$:0,a:""};for(var n=h,r=t.attributes,e=r.length;e--;)var o=r[e],n={$:1,a:l(Nt,o.name,o.value),b:n};for(var a=t.tagName.toLowerCase(),i=h,u=t.childNodes,e=u.length;e--;)i={$:1,a:tn(u[e]),b:i};return s(c,a,n,i)}var nn=t(function(n,t,r,i){return mt(t,i,n.aQ,n.a4,n.a2,function(r,t){var e=n.a6,o=i.node,a=tn(o);return en(t,function(t){var t=e(t),n=Ht(a,t);o=Vt(o,a,n,r),a=t})})}),rn="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:function(t){return setTimeout(t,1e3/60)};function en(r,e){e(r);var o=0;function a(){o=1===o?0:(rn(a),e(r),1)}return function(t,n){r=t,n?(e(r),2===o&&(o=1)):(0===o&&rn(a),o=2)}}var on={addEventListener:function(){},removeEventListener:function(){}},an="undefined"!=typeof window?window:on;var un=n(function(e,o,a){return{$:2,b:function(n){function r(t){n(o(a.aK.a(t)))}var t=new XMLHttpRequest;t.addEventListener("error",function(){r(kr)}),t.addEventListener("timeout",function(){r(_r)}),t.addEventListener("load",function(){r(function(t,n){return l(200<=n.status&&n.status<300?$r:gr,function(t){return{a5:t.responseURL,a$:t.status,a0:t.statusText,aM:function(t){if(!t)return xr;for(var n=xr,r=t.split("\r\n"),e=r.length;e--;){var o,a,i=r[e],u=i.indexOf(": ");0<u&&(o=i.substring(0,u),a=i.substring(2+u),n=s(Mr,o,function(t){return Tn(Ar(t)?a+", "+t.a:a)},n))}return n}(t.getAllResponseHeaders())}}(n),t(n.response))}(a.aK.b,t))}),Ar(a.aw)&&function(n,r,e){r.upload.addEventListener("progress",function(t){r.c||lt(l(Cr,n,{a:e,b:yr({a_:t.loaded,at:t.total})}))}),r.addEventListener("progress",function(t){r.c||lt(l(Cr,n,{a:e,b:wr({aY:t.loaded,at:t.lengthComputable?Tn(t.total):y})}))})}(e,t,a.aw.a);try{t.open(a.aS,a.a5,!0)}catch(t){return r(mr(a.a5))}return function(t,n){for(var r=n.aM;r.b;r=r.b)t.setRequestHeader(r.a.a,r.a.b);t.timeout=n.a3.a||0,t.responseType=n.aK.d,t.withCredentials=n.aC}(t,a),a.aE.a&&t.setRequestHeader("Content-Type",a.aE.a),t.send(a.aE.b),function(){t.c=!0,t.abort()}},c:null}});var cn=n(function(t,n,r){return{$:0,d:t,b:n,a:r}}),fn=e(function(n,r){return{$:0,d:r.d,b:r.b,a:function(t){return n(r.a(t))}}});var sn=e(function(t,n){return{$:0,a:t,b:n}});function ln(t){return s(Fn,e(function(t,n){return n+1}),0,t)}function dn(t){return s(or,ur(u),x(h),t)}function bn(t){return{$:2,a:t}}function hn(t){var n,r,e,o,a,i,u,c;return-1===t.$&&-1===t.d.$&&-1===t.e.$?-1!==t.e.d.$||t.e.d.a?(e=(c=t.e).b,o=c.c,a=c.d,c=c.e,b(E,1,t.b,t.c,b(E,0,(n=t.d).b,n.c,n.d,n.e),b(E,0,e,o,a,c))):(e=(r=t.e).b,o=r.c,i=(a=r.d).d,u=a.e,c=r.e,b(E,0,a.b,a.c,b(E,1,t.b,t.c,b(E,0,(n=t.d).b,n.c,n.d,n.e),i),b(E,1,e,o,u,c))):t}function vn(t){var n,r,e,o,a,i,u,c,f;return-1===t.$&&-1===t.d.$&&-1===t.e.$?-1!==t.d.d.$||t.d.d.a?(i=(f=t.e).b,u=f.c,c=f.d,f=f.e,b(E,1,n=t.b,r=t.c,b(E,0,(o=t.d).b,o.c,o.d,o=o.e),b(E,0,i,u,c,f))):(n=t.b,r=t.c,o=(e=t.d).e,i=(a=t.e).b,u=a.c,c=a.d,f=a.e,b(E,0,e.b,e.c,b(E,1,(a=e.d).b,a.c,a.d,a.e),b(E,1,n,r,o,b(E,0,i,u,c,f)))):t}function pn(t){var n,r,e,o,a,i;return-1===t.$&&-1===t.d.$?(n=t.a,r=t.b,e=t.c,i=(o=t.d).d,a=t.e,1===o.a?-1!==i.$||i.a?-1===(i=hn(t)).$?(t=i.e,b(Pr,i.a,i.b,i.c,pn(i.d),t)):C:b(E,n,r,e,pn(o),a):b(E,n,r,e,pn(o),a)):C}function gn(t){return{$:4,a:t}}function mn(t){var n=nr(t)<=256;return 0<ln(l(Jr,l(Zr,Xr,l(Yr,{aF:!1,aT:!1},"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$")),t))&&n}function $n(t){return function(t){return ie(Wr({aC:!1,aE:t.aE,aK:t.aK,aM:t.aM,aS:t.aS,a3:t.a3,aw:t.aw,a5:t.a5}))}({aE:t.aE,aK:t.aK,aM:h,aS:"POST",a3:y,aw:y,a5:t.a5})}function kn(t){return l(Nt,"height",Ln(t))}function a(t){return l(ce,"href",/^javascript:/i.test((t=t).replace(/\s/g,""))?"":t)}function i(t){return l(ce,"src",Rt(t))}function wn(t){return l(j,v([T("w-full pr-2")]),v([l(j,v([T("lg:hidden")]),v([Ce])),l(j,v([T("hidden lg:block w-full")]),v([function(t){return l(Ae,v([T("h-full w-full flex justify-end content-center justify-items-center gap-4 mr-4"),T("text-base")]),v([d(r,t,"/feastdayactivities","_self","Activities"),d(r,t,"/saints","_self","Saints"),d(r,t,"/animations","_self","Animations"),d(r,t,"/resources","_self","Resources"),d(r,t,"/shop","_blank","Shop"),d(r,t,"/give","_self","Give"),d(r,t,"/team","_self","About")]))}(t)]))]))}var on=e(function(t,n){var r="g";t.aT&&(r+="m"),t.aF&&(r+="i");try{return Tn(RegExp(n,r))}catch(t){return y}}),yn=n(function(t,n,r){for(var e,o=[],a=0,i=r,r=n.lastIndex,u=-1;a++<t&&(e=n.exec(i))&&u!=n.lastIndex;){for(var c=e.length-1,f=Array(c);0<c;){var s=e[c];f[--c]=s?Tn(s):y}o.push(d(Or,e[0],e.index,a,v(f))),u=n.lastIndex}return n.lastIndex=r,v(o)}),_n=1,xn=0,u=q,An=n(function(t,n,r){for(;;){if(-2===r.$)return n;var e=r.d,o=t,a=s(t,r.b,r.c,s(An,t,n,r.e));t=o,n=a,r=e}}),Cn=function(t){return s(An,n(function(t,n,r){return l(u,{a:t,b:n},r)}),h,t)},En=2,k=function(t){return{$:1,a:t}},jn=e(function(t,n){return{$:3,a:t,b:n}}),Pn=e(function(t,n){return{$:0,a:t,b:n}}),In=e(function(t,n){return{$:1,a:t,b:n}}),w=function(t){return{$:0,a:t}},Sn=function(t){return{$:2,a:t}},Tn=function(t){return{$:0,a:t}},y={$:1},Bn=at,Ln=function(t){return t+""},Fn=n(function(t,n,r){for(;;){if(!r.b)return n;var e=r.b,o=t,a=l(t,r.a,n);t=o,n=a,r=e}}),Mn=function(t){return s(Fn,u,h,t)},Nn=t(function(t,n,r,e){return{$:0,a:t,b:n,c:r,d:e}}),Rn=[],Kn=U,zn=e(function(t,n){return V(n)/V(t)}),Dn=Kn(l(zn,2,32)),qn=d(Nn,0,Dn,Rn,Rn),Hn=H,Gn=W,On=function(t){return t.length},Jn=e(function(t,n){return 0<f(t,n)?t:n}),Yn=G,Xn=e(function(t,n){for(;;){var r=l(Yn,32,t),e=r.b,r=l(u,{$:0,a:r.a},n);if(!e.b)return Mn(r);t=e,n=r}}),Zn=e(function(t,n){for(;;){var r=Kn(n/32);if(1===r)return l(Yn,32,t).a;t=l(Xn,t,h),n=r}}),Un=e(function(t,n){var r,e;return n.d?(e=Gn(l(zn,32,(r=32*n.d)-1)),t=t?Mn(n.g):n.g,t=l(Zn,t,n.d),d(Nn,On(n.f)+r,l(Jn,5,e*Dn),t,n.f)):d(Nn,On(n.f),Dn,Rn,n.f)}),Wn=R(function(t,n,r,e,o){for(;;){if(n<0)return l(Un,!1,{g:e,d:r/32|0,f:o});var a={$:1,a:s(Hn,32,n,t)};t=t,n=n-32,r=r,e=l(u,a,e),o=o}}),Vn=e(function(t,n){var r;return 0<t?b(Wn,n,t-(r=t%32)-32,t,h,s(Hn,r,t-r,n)):qn}),_=function(t){return!t.$},q=function(t){return{$:0,a:t}},Qn=function(t){switch(t.$){case 0:return 0;case 1:return 1;case 2:return 2;default:return 3}},tr=function(t){return t},nr=function(t){return t.length},rr=function(t){for(;;)0},x=ct,at=x(0),er=t(function(t,n,r,e){var o,a,i,u;return e.b?(o=e.a,(e=e.b).b?(a=e.a,(e=e.b).b?(i=e.a,(e=e.b).b?(u=e.b,l(t,o,l(t,a,l(t,i,l(t,e.a,500<r?s(Fn,t,n,Mn(u)):d(er,t,n,r+1,u)))))):l(t,o,l(t,a,l(t,i,n)))):l(t,o,l(t,a,n))):l(t,o,n)):n}),or=n(function(t,n,r){return d(er,t,n,0,r)}),ar=e(function(r,t){return s(or,e(function(t,n){return l(u,r(t),n)}),h,t)}),A=ft,ir=e(function(n,t){return l(A,function(t){return x(n(t))},t)}),ur=n(function(r,t,e){return l(A,function(n){return l(A,function(t){return x(l(r,n,t))},e)},t)}),cr=$t,fr=e(function(t,n){return dt(l(A,cr(t),n))}),sr=(m.Task={b:at,c:n(function(t,n,r){return l(ir,function(t){return 0},dn(l(ar,fr(t),n)))}),d:n(function(t,n,r){return x(0)}),e:e(function(t,n){return l(ir,t,n)}),f:void 0},wt("Task")),lr=e(function(t,n){return sr(l(ir,t,n))}),U=nn,dr={I:"",E:!1,w:""},br=yt,hr=br(h),vr=yt(h),pr=_t,gr=e(function(t,n){return{$:3,a:t,b:n}}),mr=function(t){return{$:0,a:t}},$r=e(function(t,n){return{$:4,a:t,b:n}}),kr={$:2},wr=function(t){return{$:1,a:t}},yr=function(t){return{$:0,a:t}},_r={$:1},C={$:-2},xr=C,Ar=function(t){return!t.$},Cr=kt,Er=X,jr=e(function(t,n){for(;;){if(-2===n.$)return y;var r=n.c,e=n.d,o=n.e;switch(l(Er,t,n.b)){case 0:t=t,n=e;continue;case 1:return Tn(r);default:t=t,n=o;continue}}}),E=R(function(t,n,r,e,o){return{$:-1,a:t,b:n,c:r,d:e,e:o}}),Pr=R(function(t,n,r,e,o){var a,i,u,c;return-1!==o.$||o.a?-1!==e.$||e.a||-1!==e.d.$||e.d.a?b(E,t,n,r,e,o):(a=e.d,c=e.e,b(E,0,e.b,e.c,b(E,1,a.b,a.c,a.d,a.e),b(E,1,n,r,c,o))):(a=o.b,i=o.c,u=o.d,o=o.e,-1!==e.$||e.a?b(E,t,a,i,b(E,0,n,r,e,u),o):b(E,0,n,r,b(E,1,e.b,e.c,e.d,c=e.e),b(E,1,a,i,u,o)))}),Ir=n(function(t,n,r){if(-2===r.$)return b(E,0,t,n,C,C);var e=r.a,o=r.b,a=r.c,i=r.d,u=r.e;switch(l(Er,t,o)){case 0:return b(Pr,e,o,a,s(Ir,t,n,i),u);case 1:return b(E,e,o,n,i,u);default:return b(Pr,e,o,a,i,s(Ir,t,n,u))}}),Sr=n(function(t,n,r){t=s(Ir,t,n,r);return-1!==t.$||t.a?t:b(E,1,t.b,t.c,t.d,t.e)}),Tr=K(function(t,n,r,e,o,a,i){if(-1!==a.$||a.a){for(;;){if(-1!==i.$||1!==i.a)break;if(-1!==i.d.$)return vn(n);if(1===i.d.a)return vn(n);break}return n}return b(E,r,a.b,a.c,a.d,b(E,0,e,o,a.e,i))}),Br=e(function(t,n){var r,e,o,a,i,u,c;return-2===n.$?C:(r=n.a,o=n.c,a=n.d,i=n.e,f(t,e=n.b)<0?-1===a.$&&1===a.a?-1!==(u=a.d).$||u.a?-1===(u=hn(n)).$?(c=u.e,b(Pr,u.a,u.b,u.c,l(Br,t,u.d),c)):C:b(E,r,e,o,l(Br,t,a),i):b(E,r,e,o,l(Br,t,a),i):l(Lr,t,z(Tr,t,n,r,e,o,a,i)))}),Lr=e(function(t,n){var r,e,o,a,i;return-1===n.$?(r=n.a,e=n.c,o=n.d,a=n.e,J(t,n=n.b)?-1===(i=function(t){for(;;){if(-1!==t.$||-1!==t.d.$)return t;t=t.d}}(a)).$?b(Pr,r,i.b,i.c,o,pn(a)):C:b(Pr,r,n,e,o,l(Br,t,a))):C}),Fr=e(function(t,n){t=l(Br,t,n);return-1!==t.$||t.a?t:b(E,1,t.b,t.c,t.d,t.e)}),Mr=n(function(t,n,r){n=n(l(jr,t,r));return n.$?l(Fr,t,r):s(Sr,t,n.a,r)}),Nr=n(function(t,n,r){return n(t(r))}),Rr=e(function(t,n){return s(cn,"",tr,l(Nr,n,t))}),Kr={$:2},zr={$:1},Dr=e(function(t,n){return n.$?k(t(n.a)):w(n.a)}),qr=e(function(t,n){switch(n.$){case 0:return k({$:0,a:n.a});case 1:return k(zr);case 2:return k(Kr);case 3:return k({$:3,a:n.a.a$});default:return l(Dr,gn,t(n.b))}}),Hr=it,Gr=(H=Hr,jt(W="gtagReportConversion"),m[W]={e:Pt,u:H,a:It},wt(W)),Or=t(function(t,n,r,e){return{aP:n,aR:t,aU:r,a1:e}}),Jr=yn(1/0),Yr=on,Xr=/.^/,Zr=e(function(t,n){return n.$?t:n.a}),Ur=function(n){return l(lr,rr,{$:2,b:function(t){try{an.location=n}catch(t){Tt.location.reload(!1)}},c:null})},Wr=function(t){return{$:1,a:t}},Vr=e(function(t,n){return{ap:t,au:n}}),G=x(l(Vr,xr,h)),Qr=function(r){return{$:2,b:function(t){var n=r.f;2===n.$&&n.c&&n.c(),r.f=null,t({$:0,a:Z})},c:null}},te=dt,ne=n(function(r,t,e){for(;;){if(!t.b)return x(e);var o,n=t.a,a=t.b;if(n.$)return o=n.a,l(A,function(t){var n=o.aw;return s(ne,r,a,1===n.$?e:s(Sr,n.a,t,e))},te(s(un,r,cr(r),o)));var i=n.a,n=l(jr,i,e);if(1!==n.$)return l(A,function(t){return s(ne,r,a,l(Fr,i,e))},Qr(n.a));r=r,t=a,e=e}}),$t=t(function(t,n,r,e){return l(A,function(t){return x(l(Vr,t,r))},s(ne,t,n,e.ap))}),re=n(function(t,n,r){t=t(n);return t.$?r:l(u,t.a,r)}),ee=e(function(t,n){return s(or,re(t),h,n)}),oe=t(function(t,n,r,e){var o=e.b;return J(n,e.a)?Tn(l(cr,t,o(r))):y}),at=n(function(t,n,r){return l(A,function(t){return x(r)},dn(l(ee,s(oe,t,n.a,n.b),r.au)))}),nn=e(function(t,n){var r;return n.$?Wr({aC:(r=n.a).aC,aE:r.aE,aK:l(fn,t,r.aK),aM:r.aM,aS:r.aS,a3:r.a3,aw:r.aw,a5:r.a5}):{$:0,a:n.a}}),ae=e(function(t,n){return{$:0,a:t,b:n}}),ie=(m.Http={b:G,c:$t,d:at,e:nn,f:e(function(t,n){return l(ae,n.a,l(Nr,n.b,t))})},wt("Http")),ue=(wt("Http"),e(function(t,n){switch(t.$){case 0:return{a:o(n,{I:t.a}),b:hr};case 1:return mn(n.I)?(r=v([{a:"email",b:Hr(n.I)}]),r=s(Fn,e(function(t,n){return s(ut,t.a,t.b,n)}),{},r),{a:o(n,{E:!0,w:"Your request is being processed..."}),b:$n({aE:l(sn,"application/json",l(Bn,0,r)),aK:l(Rr,bn,qr(w)),a5:"https://api.catholicstoriesforchildren.com/add-contact"})}):{a:o(n,{w:"Error: Please enter a valid email"}),b:hr};default:return t.a.$?{a:o(n,{E:!1,w:"Error: please try again later"}),b:hr}:{a:o(n,{E:!1,w:"Email sent!"}),b:br(v([Gr(""),Ur("/thankyou")]))}}var r})),_t=e(function(t,n){var t=l(ue,t,n.K),r=t.b;return{a:o(n,{K:t.a}),b:l(pr,tr,r)}}),j=c("div"),S=Ft,ce=e(function(t,n){return l(Mt,t,Hr(n))}),T=ce("className"),fe=c("h1"),se=Lt,B=Bt,le={p:"https://embeds.beehiiv.com/dd054c75-c35e-4456-9bd5-8663c5ad9e52?slim=true",aH:"Get the free guide to help little Catholics through the Sacrament of Reconciliation.",n:"",a:"/assets/images/shop/2.png",c:"Little Reconciliation Booklet"},L=c("a"),F=e(function(t,n){return l(Nt,function(t){return/^(on|formAction$)/i.test(t)?"data-"+t:t}(t),Rt(n))}),de=c("h2"),be=c("iframe"),he=c("img"),ve=c("p"),pe=c("span"),ge=ce("target"),me=function(t){return l(j,v([T("p-3 rounded-md border-4 border-solid border-[#460156] bg-[#ffc7c7]")]),v([(n=le,l(j,v([T("rounded p-7 text-left")]),v([l(j,h,v([l(he,v([i(n.a),T("w-72 h-72 object-fit")]),h)])),l(j,v([T("mb-3")]),v([l(de,v([T("mb-3 leading-8")]),v([B(n.c)])),l(ve,h,v([B(n.aH)]))])),l(be,v([i(n.p),kn(52),l(F,"frameborder","0"),l(F,"scrolling","no"),l(F,"width","100%"),l(S,"margin","0"),l(S,"border-radius","0px !important"),l(S,"background-color","transparent")]),h),""!==n.n?l(j,h,v([l(L,v([a(n.n),ge("_blank"),T("text-blue-600 underline")]),v([B("Click here to go to Etsy")])),l(pe,h,v([B(". Enter email above for coupon code.")]))])):l(pe,h,h)])))]));var n},$e=l(j,h,v([B("Find books here. It's hard to go wrong with a good Catholic book.")])),ke=l(j,h,l(ar,function(t){return l(L,v([T("grid grid-cols-[100px_1fr] hover:bg-csc-lightpurple rounded p-7"),ge("_blank"),l(F,"aria-label",t.c),a(t.b)]),v([l(j,h,v([l(he,v([i(t.a),T("w-20 h-20 object-cover")]),h)])),l(j,h,v([l(de,v([T("leading-10")]),v([B(t.c)]))]))]))},v([{a:"https://ik.imagekit.io/catholicstories/ProfileImages/34_GtSZ5NI8_8.png?updatedAt=1682716506395",b:"https://www.littlesaintstories.com/s/shop",c:"Little Saint Stories"},{a:"https://ik.imagekit.io/catholicstories/ProfileImages/28_INemNiAcr.png?updatedAt=1682716507584",b:"https://theotokoskids.com/collections/books",c:"Theotokos Kids Books"},{a:"https://ik.imagekit.io/catholicstories/ProfileImages/3rd_Party_Logos_DxY5MCRoK.png?updatedAt=1682716853025",b:"https://osvkids.com/books/",c:"OSV Kids Books"},{a:"https://ik.imagekit.io/catholicstories/ProfileImages/29_9r_mR-lb6.png?updatedAt=1682716506911",b:"https://thelittleroseshop.com/collections/baby-kids",c:"The Little Rose Shop Fabric Books"},{a:"https://ik.imagekit.io/catholicstories/ProfileImages/16_V1sLznRg0.png?updatedAt=1679070333303",b:"https://brotherfrancisstore.com/collections/books",c:"Brother Francis Books"},{a:"https://ik.imagekit.io/catholicstories/ProfileImages/24_ok9wTkcFo.png?updatedAt=1682716507750",b:"https://www.thyolivetree.com/collections/childrens",c:"Thy Olive Tree"},{a:"https://ik.imagekit.io/catholicstories/ProfileImages/36_eINHZkemx9.png?updatedAt=1682716506020",b:"https://bookstore.wordonfire.org/products/light-of-the-saints",c:"Light of the Saints"},{a:"https://ik.imagekit.io/catholicstories/ProfileImages/33_v8d9TN1XkY.png?updatedAt=1682716506330",b:"https://firstfaithtreasury.com/",c:"First Faith Treasury"},{a:"https://ik.imagekit.io/catholicstories/ProfileImages/32_22z_5JUPjM.png?updatedAt=1682716506412",b:"https://tanbooks.com/catholic-kids-books/",c:"Tan Books for Kids"},{a:"https://ik.imagekit.io/catholicstories/ProfileImages/CTS_Logo_vwbekKAI-.png?updatedAt=1687667974185",b:"https://www.ctsbooks.org/product-category/children-young-adults/",c:"Catholic Truth Society"},{a:"https://ik.imagekit.io/catholicstories/ProfileImages/30_SPGrEpxn4o.png?updatedAt=1682716506374",b:"https://www.ewtnreligiouscatalogue.com/Catholic-Childrens-Books",c:"EWTN Childrens Books"},{a:"https://ik.imagekit.io/catholicstories/ProfileImages/27_LJ8rjMXH6.png?updatedAt=1682716507484",b:"https://www.diaryofagodman.com/books",c:"Diary of a God-Man. A fully illustrated children's missal"},{a:"https://ik.imagekit.io/catholicstories/ProfileImages/26_2TkstMXTY.png?updatedAt=1682716507634",b:"https://shop.catholicsprouts.com/collections/all",c:"Catholic Sprouts Books and Materials"},{a:"https://ik.imagekit.io/catholicstories/ProfileImages/25_OSP8-2xFJ.png?updatedAt=1682716507604",b:"https://holyheroes.com/collections/catholic-childrens-books",c:"Holy Heroes Books"},{a:"/assets/images/ProfilePictures/JennaEpkey.png",b:"https://www.amazon.com/stores/Jenna-Epkey/author/B0CWPDDMRM",c:"Jenna Epkey Catholic Kids Books"},{a:"https://ik.imagekit.io/catholicstories/ProfileImages/23_UvXPxYgqml.png?updatedAt=1682716507758",b:"https://www.loyolapress.com/",c:"Loyola Press Books"},{a:"https://ik.imagekit.io/catholicstories/ProfileImages/35_evg05JJAFh.png?updatedAt=1682716506043",b:"https://stpaulcenter.com/product-category/children/",c:"St Paul Center Children's Books"},{a:"https://ik.imagekit.io/catholicstories/ProfileImages/38_oB0pzZnMW8.png?updatedAt=1682716506417",b:"https://catholicbookpublishing.com/browse/childrens-books-on-saints",c:"Catholic Book Publishing's Children's Books on Saints"},{a:"https://ik.imagekit.io/catholicstories/ProfileImages/37_gMX8cczFD.png?updatedAt=1682716506298",b:"https://paulinestore.com/kids-teens.html",c:"Pauline Books and Media"},{a:"/assets/images/ProfilePictures/CatholicTeenBooks.png",b:"https://www.catholicteenbooks.com/",c:"Catholic Teen Books"}]))),we=l(j,v([T("grid grid-cols-[100px_1fr] rounded py-7")]),v([l(j,h,v([l(he,v([i("https://ik.imagekit.io/catholicstories/Construction_Cone_vLoPMhMZBm.png?updatedAt=1679070884463"),T("w-20 h-20 object-cover")]),h)])),l(j,h,v([l(ve,h,v([B("This page is a work-in-progress. We are working hard on adding resources for you.")]))]))])),ye=ce("alt"),kt=R(function(t,n,r,e,o){return l(j,v([T("flex align-center")]),v([l(L,v([a(t),l(F,"aria-label",n),ge("_blank"),T("mb-5")]),v([l(he,v([T("w-5 h-5 inline-block"),i(r),ye(e)]),h),l(pe,v([T("ml-3")]),v([B(o)]))]))]))}),X=b(kt,"https://www.facebook.com/catholicstoriesforchildren","CSC Facebook Page","https://ik.imagekit.io/catholicstories/f_logo_RGB-Blue_250_3vs-yhXer.png?updatedAt=1684277030198","Facebook","Facebook"),Pt=c("footer"),H=c("h3"),W=b(kt,"https://www.instagram.com/catholicstoriesforchildren/","CSC Instagram Page","https://ik.imagekit.io/catholicstories/Instagram_Glyph_Gradient_kFoMs9jIr.png?updatedAt=1684277127293","Instagram","Instagram"),yn=l(j,v([T("mb-5")]),v([l(ve,v([T("pb-2 pl-1 text-left")]),v([B("Receive free animations, activities, resources, and more!")])),l(be,v([i("https://embeds.beehiiv.com/d8e1c428-bdfc-437f-a685-0148bd0cf084?slim=true"),kn(52),l(F,"frameborder","0"),l(F,"scrolling","no"),l(S,"margin","0"),l(S,"border-radius","0px !important"),l(S,"background-color","transparent")]),h)])),_e=l(Pt,v([l(S,"padding",Ln(30)+"px")]),v([l(j,v([T("text-center mb-5")]),v([l(j,h,v([l(j,h,v([l(de,v([T("mb-7")]),v([B("Access Free Animations")]))])),l(j,v([T("text-center grid justify-center mb-10")]),v([yn]))])),l(j,v([T("md:grid md:grid-cols-3 md:justify-items-center")]),v([l(j,v([T("text-left")]),v([l(j,h,v([l(H,v([T("font-bold text-lg")]),v([B("About Us")]))])),l(j,v([T("mb-3")]),v([B("Catholic Stories for Children is a nonprofit aimed at telling short stories, primarily through animation, to help parents teach Catholic prayers, about Catholic saints, and other Catholic concepts.")]))])),l(j,v([T("md:mx-5")]),v([l(he,v([T("rounded max-w-[16rem]"),i("/assets/FullTitle_900x900_NoBackground.png")]),h)])),l(j,v([T("text-left")]),v([l(j,h,v([l(H,v([T("font-bold text-lg mb-3")]),v([B("Follow Us")]))])),l(j,h,v([W,X]))]))]))])),l(j,v([T("text-xs")]),v([l(ve,h,v([B("Copyright © 2024 Catholic Stories for Children. All rights reserved.")])),l(ve,h,v([B("Catholic Stories for Children is a 501(c)(3) non-profit recognized by the IRS. Contributions to Catholic Stories for Children are tax-deductible to the extent permitted by law.  Tax ID Number: 85-4194883")])),l(ve,h,v([l(L,v([a("/about/privacy-policy"),T("underline")]),v([B("Privacy Policy")])),l(pe,h,v([B(" | ")])),l(L,v([a("/about/terms-and-conditions"),T("underline")]),v([B("Terms & Conditions")]))]))]))])),xe=c("header"),Ae=c("nav"),r=t(function(t,n,r,e){return l(L,v([a(n),T("flex items-center justify-center"),T("hover:scale-105 transition ease-in-out"),T("hover:border-b-4 hover:border-[#9101b3]"),T("rounded"),T("h-[60px] h-["+t+"]"),T("p-2"),l(F,"aria-label",e),ge(r)]),v([B(e)]))}),Ce=l(L,v([a("/navigation"),T("space-y-2"),l(F,"aria-label","menu")]),v([l(j,v([T("w-8 h-0.5 m-auto bg-gray-600")]),h),l(j,v([T("w-8 h-0.5 m-auto bg-gray-600")]),h),l(j,v([T("w-8 h-0.5 m-auto bg-gray-600")]),h)])),Ee=e(function(t,n){var t=t?{a:"text-[0px] md:text-xl",b:"invisible md:visible"}:{a:"text-lg md:text-xl",b:""},r=t.a,t=t.b;return l(L,v([l(S,"text-decoration","none"),T("colorDarkGray"),T(t),T("justify-self-start"),a("/")]),v([l(fe,v([l(S,"font-family","hvdComicSerifPro"),l(S,"margin","0px"),T(r)]),v([B("Catholic Stories for Children")]))]))}),on=l(he,v([i("/assets/logo_solid.svg"),l(S,"height","30px"),ye(""),l(S,"vertical-align","middle")]),h),je=l(L,v([l(S,"text-decoration","none"),T("colorDarkGray"),a("/"),l(F,"aria-label","home")]),v([on])),Pe=e(function(t,n){var r="Catholic Stories for Children"===t?{a:"111px",b:wn,c:"grid-cols-[150px_1fr_150px] lg:grid-cols-[150px_1fr_600px]"}:{a:"60px",b:wn,c:"grid-cols-[150px_1fr_150px] lg:grid-cols-[150px_1fr_600px]"},e=r.a,o=r.b,r=r.c;return l(xe,v([l(S,"background-color","#3d5d75"),l(S,"background-image","linear-gradient(130deg, #9DE2EB , #EBD6F1)"),T("h-[60px] md:h-["+e+"]"),T("colorDarkGray"),T("grid items-center justify-items-center"),T(r)]),v([je,l(Ee,!0,t),o(e)]))}),G=U({aQ:function(t){return{a:{K:dr},b:hr}},a2:function(t){return vr},a4:_t,a6:function(t){return l(j,v([l(S,"height","100vh"),l(S,"overflow-x","hidden"),l(S,"overflow-y","auto"),l(S,"perspective","300px"),l(S,"scroll-behavior","smooth"),l(S,"background-color","#FEF7F4")]),v([l(Pe,"Books",10),function(t){return l(j,v([T("max-w-3xl"),T("m-auto"),T("p-5"),T("mb-10")]),v([l(fe,v([T("my-10 leading-10")]),v([B("Books")])),l(j,v([T("mb-20")]),v([l(se,tr,me(t.K))])),$e,ke,we]))}(t),_e]))}});$t={Resources:{Books:{Main:{init:G(q(0))(0)}}}},M.Elm?function t(n,r){for(var e in r)e in n?"init"==e?O(6):t(n[e],r[e]):n[e]=r[e]}(M.Elm,$t):M.Elm=$t}(this);