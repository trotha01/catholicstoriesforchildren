!function(D){"use strict";function B(e,r,n){return n.a=e,n.f=r,n}function r(n){return B(2,n,function(r){return function(e){return n(r,e)}})}function n(t){return B(3,t,function(n){return function(r){return function(e){return t(n,r,e)}}})}function N(a){return B(4,a,function(t){return function(n){return function(r){return function(e){return a(t,n,r,e)}}}})}function G(o){return B(5,o,function(a){return function(t){return function(n){return function(r){return function(e){return o(a,t,n,r,e)}}}}})}function l(e,r,n){return 2===e.a?e.f(r,n):e(r)(n)}function f(e,r,n,t){return 3===e.a?e.f(r,n,t):e(r)(n)(t)}function h(e,r,n,t,a){return 4===e.a?e.f(r,n,t,a):e(r)(n)(t)(a)}function L(e,r,n,t,a,o){return 5===e.a?e.f(r,n,t,a,o):e(r)(n)(t)(a)(o)}function i(e,r){for(var n,t=[],a=H(e,r,0,t);a&&(n=t.pop());a=H(n.a,n.b,0,t));return a}function H(e,r,n,t){if(e!==r){if("object"!=typeof e||null===e||null===r)return"function"==typeof e&&W(5),!1;if(100<n)t.push({a:e,b:r});else for(var a in e.$<0&&(e=Je(e),r=Je(r)),e)if(!H(e[a],r[a],n+1,t))return!1}return!0}function t(e,r,n){if("object"!=typeof e)return e===r?0:e<r?-1:1;if(void 0===e.$)return(n=(n=t(e.a,r.a))||t(e.b,r.b))||t(e.c,r.c);for(;e.b&&r.b&&!(n=t(e.a,r.a));e=e.b,r=r.b);return n||(e.b?1:r.b?-1:0)}var P=0;function z(e,r){if("string"==typeof e)return e+r;if(!e.b)return r;var n={$:1,a:e.a,b:r};e=e.b;for(var t=n;e.b;e=e.b)t=t.b={$:1,a:e.a,b:r};return n}var d={$:0};function q(e,r){return{$:1,a:e,b:r}}var e=r(q);function b(e){for(var r=d,n=e.length;n--;)r={$:1,a:e[n],b:r};return r}function O(e){for(var r=[];e.b;e=e.b)r.push(e.a);return r}var a=r(function(n,e){return b(O(e).sort(function(e,r){e=l(n,e,r);return e===We?0:e===Ue?-1:1}))});var o=n(function(e,r,n){for(var t=Array(e),a=0;a<e;a++)t[a]=n(r+a);return t}),u=r(function(e,r){for(var n=Array(e),t=0;t<e&&r.b;t++)n[t]=r.a,r=r.b;return n.length=t,{a:n,b:r}});function W(e){throw Error("https://github.com/elm/core/blob/1.0.0/hints/"+e+".md")}var U=Math.ceil,s=Math.floor,K=Math.log;var J=r(p);function p(e,r){switch(e.$){case 2:return e.b(r);case 5:return null===r?Ye(e.c):m("null",r);case 3:return Z(r)?Q(e.b,r,b):m("a LIST",r);case 4:return Z(r)?Q(e.b,r,X):m("an ARRAY",r);case 6:var n=e.d;return"object"==typeof r&&null!==r&&n in r?(o=p(e.b,r[n]),A(o)?o:$(l(Ze,n,o.a))):m("an OBJECT with a field named `"+n+"`",r);case 7:n=e.e;return Z(r)?n<r.length?(o=p(e.b,r[n]),A(o)?o:$(l(Xe,n,o.a))):m("a LONGER array. Need index "+n+" but only see "+r.length+" entries",r):m("an ARRAY",r);case 8:if("object"!=typeof r||null===r||Z(r))return m("an OBJECT",r);var t,a=d;for(t in r)if(r.hasOwnProperty(t)){var o=p(e.b,r[t]);if(!A(o))return $(l(Ze,t,o.a));a={$:1,a:{a:t,b:o.a},b:a}}return Ye(nr(a));case 9:for(var i=e.f,u=e.g,s=0;s<u.length;s++){o=p(u[s],r);if(!A(o))return o;i=i(o.a)}return Ye(i);case 10:o=p(e.b,r);return A(o)?p(e.h(o.a),r):o;case 11:for(var c=d,f=e.g;f.b;f=f.b){o=p(f.a,r);if(A(o))return o;c={$:1,a:o.a,b:c}}return $(er(nr(c)));case 1:return $(l(Qe,e.a,r));case 0:return Ye(e.a)}}function Q(e,r,n){for(var t=r.length,a=Array(t),o=0;o<t;o++){var i=p(e,r[o]);if(!A(i))return $(l(Xe,o,i.a));a[o]=i.a}return Ye(n(a))}function Z(e){return Array.isArray(e)||"undefined"!=typeof FileList&&e instanceof FileList}function X(r){return l(gr,r.length,function(e){return r[e]})}function m(e,r){return $(l(Qe,"Expecting "+e,r))}function c(e,r){if(e===r)return!0;if(e.$!==r.$)return!1;switch(e.$){case 0:case 1:return e.a===r.a;case 2:return e.b===r.b;case 5:return e.c===r.c;case 3:case 4:case 8:return c(e.b,r.b);case 6:return e.d===r.d&&c(e.b,r.b);case 7:return e.e===r.e&&c(e.b,r.b);case 9:return e.f===r.f&&Y(e.g,r.g);case 10:return e.h===r.h&&c(e.b,r.b);case 11:return Y(e.g,r.g)}}function Y(e,r){var n=e.length;if(n!==r.length)return!1;for(var t=0;t<n;t++)if(!c(e[t],r[t]))return!1;return!0}function ee(e){return e}function re(e){return{$:0,a:e}}var ne=r(function(e,r){return{$:3,b:e,d:r}});var te=0;function ae(e){e={$:0,e:te++,f:e,g:null,h:[]};return ce(e),e}function oe(r){return{$:2,b:function(e){e({$:0,a:ae(r)})},c:null}}function ie(e,r){e.h.push(r),ce(e)}var ue=!1,se=[];function ce(e){if(se.push(e),!ue){for(ue=!0;e=se.shift();)!function(r){for(;r.f;){var e=r.f.$;if(0===e||1===e){for(;r.g&&r.g.$!==e;)r.g=r.g.i;if(!r.g)return;r.f=r.g.b(r.f.a),r.g=r.g.i}else{if(2===e)return r.f.c=r.f.b(function(e){r.f=e,ce(r)});if(5===e){if(0===r.h.length)return;r.f=r.f.b(r.h.shift())}else r.g={$:3===e?0:1,b:r.f.b,i:r.g},r.f=r.f.d}}}(e);ue=!1}}function fe(e,r,n,t,a,o){var e=l(J,e,r?r.flags:void 0),i=(A(e)||W(2),{}),r=n(e.a),u=r.a,s=o(c,u),n=function(e,r){var n,t;for(t in v){var a=v[t];a.a&&((n=n||{})[t]=a.a(t,r)),e[t]=function(e,r){var t={g:r,h:void 0},a=e.c,o=e.d,i=e.e,u=e.f;function s(n){return l(ne,s,{$:5,b:function(e){var r=e.a;return 0===e.$?f(o,t,r,n):i&&u?h(a,t,r.i,r.j,n):f(a,t,i?r.i:r.j,n)}})}return t.h=ae(l(ne,s,e.b))}(a,r)}return n}(i,c);function c(e,r){e=l(t,e,u);s(u=e.a,r),pe(i,e.b,a(u))}return pe(i,r.b,a(u)),n?{ports:n}:{}}var v={};var g=r(function(r,n){return{$:2,b:function(e){r.g(n),e({$:0,a:P})},c:null}});function le(r){return function(e){return{$:1,k:r,l:e}}}function he(e){return{$:2,m:e}}var de=[],be=!1;function pe(e,r,n){if(de.push({p:e,q:r,r:n}),!be){be=!0;for(var t;t=de.shift();)!function(e,r,n){var t,a={};for(t in me(!0,r,a,null),me(!1,n,a,null),e)ie(e[t],{$:"fx",a:a[t]||{i:d,j:d}})}(t.p,t.q,t.r);be=!1}}function me(e,r,n,t){switch(r.$){case 1:var a=r.k,o=function(e,r,n,t){function a(e){for(var r=n;r;r=r.t)e=r.s(e);return e}return l(e?v[r].e:v[r].f,a,t)}(e,a,t,r.l);return void(n[a]=function(e,r,n){return n=n||{i:d,j:d},e?n.i={$:1,a:r,b:n.i}:n.j={$:1,a:r,b:n.j},n}(e,o,n[a]));case 2:for(var i=r.m;i.b;i=i.b)me(e,i.a,n,t);return;case 3:me(e,r.o,n,{s:r.n,t:t})}}var ve;var ge="undefined"!=typeof document?document:{};function we(e){return{$:0,a:e}}var w=r(function(o,i){return r(function(e,r){for(var n=[],t=0;r.b;r=r.b){var a=r.a;t+=a.b||0,n.push(a)}return t+=n.length,{$:1,c:i,d:$e(e),e:n,f:o,b:t}})})(void 0);r(function(o,i){return r(function(e,r){for(var n=[],t=0;r.b;r=r.b){var a=r.a;t+=a.b.b||0,n.push(a)}return t+=n.length,{$:2,c:i,d:$e(e),e:n,f:o,b:t}})})(void 0);var y=r(function(e,r){return{$:"a1",n:e,o:r}}),ye=r(function(e,r){return{$:"a2",n:e,o:r}}),ke=r(function(e,r){return{$:"a3",n:e,o:r}});function xe(e){return/^\s*(javascript:|data:text\/html)/i.test(e)?"":e}var Ce;function $e(e){for(var r={};e.b;e=e.b){var n,t=e.a,a=t.$,o=t.n,t=t.o;"a2"===a?"className"===o?Ae(r,o,t):r[o]=t:(n=r[a]||(r[a]={}),"a3"===a&&"class"===o?Ae(n,o,t):n[o]=t)}return r}function Ae(e,r,n){var t=e[r];e[r]=t?t+" "+n:n}function k(e,r){var n=e.$;if(5===n)return k(e.k||(e.k=e.m()),r);if(0===n)return ge.createTextNode(e.a);if(4===n){for(var t=e.k,a=e.j;4===t.$;)"object"!=typeof a?a=[a,t.j]:a.push(t.j),t=t.k;var o={j:a,p:r};(i=k(t,o)).elm_event_node_ref=o}else if(3===n)je(i=e.h(e.g),r,e.d);else{var i=e.f?ge.createElementNS(e.f,e.c):ge.createElement(e.c);ve&&"a"==e.c&&i.addEventListener("click",ve(i)),je(i,r,e.d);for(var u=e.e,s=0;s<u.length;s++)i.appendChild(k(1===n?u[s]:u[s].b,r))}return i}function je(e,r,n){for(var t in n){var a=n[t];"a1"===t?function(e,r){var n,t=e.style;for(n in r)t[n]=r[n]}(e,a):"a0"===t?function(e,r,n){var t,a=e.elmFs||(e.elmFs={});for(t in n){var o=n[t],i=a[t];if(o){if(i){if(i.q.$===o.$){i.q=o;continue}e.removeEventListener(t,i)}i=function(s,e){function c(e){var r=c.q,n=p(r.a,e);if(A(n)){for(var t,r=wr(r),n=n.a,a=r?r<3?n.a:n.r:n,o=1==r?n.b:3==r&&n.N,i=(o&&e.stopPropagation(),(2==r?n.b:3==r&&n.K)&&e.preventDefault(),s);t=i.j;){if("function"==typeof t)a=t(a);else for(var u=t.length;u--;)a=t[u](a);i=i.p}i(a,o)}}return c.q=e,c}(r,o),e.addEventListener(t,i,Ce&&{passive:wr(o)<2}),a[t]=i}else e.removeEventListener(t,i),a[t]=void 0}}(e,r,a):"a3"===t?function(e,r){for(var n in r){var t=r[n];void 0!==t?e.setAttribute(n,t):e.removeAttribute(n)}}(e,a):"a4"===t?function(e,r){for(var n in r){var t=r[n],a=t.f,t=t.o;void 0!==t?e.setAttributeNS(a,n,t):e.removeAttributeNS(a,n)}}(e,a):("value"!==t&&"checked"!==t||e[t]!==a)&&(e[t]=a)}}try{window.addEventListener("t",null,Object.defineProperty({},"passive",{get:function(){Ce=!0}}))}catch(e){}function Ee(e,r){var n=[];return S(e,r,n,0),n}function M(e,r,n,t){r={$:r,r:n,s:t,t:void 0,u:void 0};return e.push(r),r}function S(e,r,n,t){if(e!==r){var a=e.$,o=r.$;if(a!==o){if(1!==a||2!==o)return void M(n,0,t,r);r=function(e){for(var r=e.e,n=r.length,t=Array(n),a=0;a<n;a++)t[a]=r[a].b;return{$:1,c:e.c,d:e.d,e:t,f:e.f,b:e.b}}(r),o=1}switch(o){case 5:for(var i=e.l,u=r.l,s=i.length,c=s===u.length;c&&s--;)c=i[s]===u[s];if(c)return void(r.k=e.k);r.k=r.m();var f=[];return S(e.k,r.k,f,0),void(0<f.length&&M(n,1,t,f));case 4:for(var l=e.j,h=r.j,d=!1,b=e.k;4===b.$;)d=!0,"object"!=typeof l?l=[l,b.j]:l.push(b.j),b=b.k;for(var p=r.k;4===p.$;)d=!0,"object"!=typeof h?h=[h,p.j]:h.push(p.j),p=p.k;return d&&l.length!==h.length?void M(n,0,t,r):((d?function(e,r){for(var n=0;n<e.length;n++)if(e[n]!==r[n])return;return 1}(l,h):l===h)||M(n,2,t,h),void S(b,p,n,t+1));case 0:return void(e.a!==r.a&&M(n,3,t,r.a));case 1:return void _e(e,r,n,t,Se);case 2:return void _e(e,r,n,t,Te);case 3:if(e.h!==r.h)return void M(n,0,t,r);f=Me(e.d,r.d),f=(f&&M(n,4,t,f),r.i(e.g,r.g));f&&M(n,5,t,f)}}}function _e(e,r,n,t,a){var o;e.c!==r.c||e.f!==r.f?M(n,0,t,r):((o=Me(e.d,r.d))&&M(n,4,t,o),a(e,r,n,t))}function Me(e,r,n){var t,a,o,i,u;for(a in e)"a1"===a||"a0"===a||"a3"===a||"a4"===a?(o=Me(e[a],r[a]||{},a))&&((t=t||{})[a]=o):a in r?(o=e[a])===(i=r[a])&&"value"!==a&&"checked"!==a||"a0"===n&&function(e,r){return e.$==r.$&&c(e.a,r.a)}(o,i)||((t=t||{})[a]=i):(t=t||{})[a]=n?"a1"===n?"":"a0"===n||"a3"===n?void 0:{f:e[a].f,o:void 0}:"string"==typeof e[a]?"":null;for(u in r)u in e||((t=t||{})[u]=r[u]);return t}function Se(e,r,n,t){var a=e.e,o=r.e,e=a.length,r=o.length;r<e?M(n,6,t,{v:r,i:e-r}):e<r&&M(n,7,t,{v:e,e:o});for(var i=e<r?e:r,u=0;u<i;u++){var s=a[u];S(s,o[u],n,++t),t+=s.b||0}}function Te(e,r,n,t){for(var a=[],o={},i=[],u=e.e,s=r.e,c=u.length,f=s.length,l=0,h=0,d=t;l<c&&h<f;){var b=u[l],p=s[h],m=b.a,v=p.a,g=b.b,w=p.b,y=void 0,k=void 0;if(m===v)S(g,w,a,++d),d+=g.b||0,l++,h++;else{var x,C,$,A,j=u[l+1],E=s[h+1];if(j&&(C=j.b,k=v===(x=j.a)),E&&(A=E.b,y=m===($=E.a)),y&&k)S(g,A,a,++d),Ie(o,a,m,w,h,i),d+=g.b||0,Fe(o,a,m,C,++d),d+=C.b||0,l+=2,h+=2;else if(y)d++,Ie(o,a,v,w,h,i),S(g,A,a,d),d+=g.b||0,l+=1,h+=2;else if(k)Fe(o,a,m,g,++d),d+=g.b||0,S(C,w,a,++d),d+=C.b||0,l+=2,h+=1;else{if(!j||x!==$)break;Fe(o,a,m,g,++d),Ie(o,a,v,w,h,i),d+=g.b||0,S(C,A,a,++d),d+=C.b||0,l+=2,h+=2}}}for(;l<c;){g=(b=u[l]).b;Fe(o,a,b.a,g,++d),d+=g.b||0,l++}for(;h<f;){var _=_||[];Ie(o,a,(p=s[h]).a,p.b,void 0,_),h++}(0<a.length||0<i.length||_)&&M(n,8,t,{w:a,x:i,y:_})}var Re="_elmW6BL";function Ie(e,r,n,t,a,o){var i,u=e[n];u?1===u.c?(o.push({r:a,A:u}),u.c=2,S(u.z,t,i=[],u.r),u.r=a,u.s.s={w:i,A:u}):Ie(e,r,n+Re,t,a,o):(o.push({r:a,A:u={c:0,z:t,r:a,s:void 0}}),e[n]=u)}function Fe(e,r,n,t,a){var o,i=e[n];i?0===i.c?(i.c=2,S(t,i.z,o=[],a),M(r,9,a,{w:o,A:i})):Fe(e,r,n+Re,t,a):(o=M(r,9,a,void 0),e[n]={c:1,z:t,r:a,s:o})}function Ve(e,r,n,t){!function e(r,n,t,a,o,i,u){var s=t[a];var c=s.r;for(;c===o;){var f,l=s.$;if(1===l?Ve(r,n.k,s.s,u):8===l?(s.t=r,s.u=u,0<(f=s.s.w).length&&e(r,n,f,0,o,i,u)):9===l?(s.t=r,s.u=u,(l=s.s)&&(l.A.s=r,0<(f=l.w).length)&&e(r,n,f,0,o,i,u)):(s.t=r,s.u=u),!(s=t[++a])||(c=s.r)>i)return a}var h=n.$;if(4===h){for(var d=n.k;4===d.$;)d=d.k;return e(r,d,t,a,o+1,i,r.elm_event_node_ref)}var b=n.e;var p=r.childNodes;for(var m=0;m<b.length;m++){var v=1===h?b[m]:b[m].b,g=++o+(v.b||0);if(o<=c&&c<=g&&(a=e(p[m],v,t,a,o,g,u),!(s=t[a])||(c=s.r)>i))return a;o=g}return a}(e,r,n,0,0,r.b,t)}function De(e,r,n,t){return 0===n.length?e:(Ve(e,r,n,t),Be(e,n))}function Be(e,r){for(var n=0;n<r.length;n++){var t=r[n],a=t.t,t=function(e,r){switch(r.$){case 0:return function(e,r,n){var t=e.parentNode,r=k(r,n);r.elm_event_node_ref||(r.elm_event_node_ref=e.elm_event_node_ref);t&&r!==e&&t.replaceChild(r,e);return r}(e,r.s,r.u);case 4:return je(e,r.u,r.s),e;case 3:return e.replaceData(0,e.length,r.s),e;case 1:return Be(e,r.s);case 2:return e.elm_event_node_ref?e.elm_event_node_ref.j=r.s:e.elm_event_node_ref={j:r.s,p:r.u},e;case 6:for(var n=r.s,t=0;t<n.i;t++)e.removeChild(e.childNodes[n.v]);return e;case 7:for(var a=(n=r.s).e,t=n.v,o=e.childNodes[t];t<a.length;t++)e.insertBefore(k(a[t],r.u),o);return e;case 9:var i;return(n=r.s)?(void 0!==(i=n.A).r&&e.parentNode.removeChild(e),i.s=Be(e,n.w)):e.parentNode.removeChild(e),e;case 8:return function(e,r){for(var n=r.s,t=function(e,r){if(e){for(var n=ge.createDocumentFragment(),t=0;t<e.length;t++){var a=e[t].A;n.appendChild(2===a.c?a.s:k(a.z,r.u))}return n}}(n.y,r),a=(e=Be(e,n.w),n.x),o=0;o<a.length;o++){var i=a[o],u=i.A,u=2===u.c?u.s:k(u.z,r.u);e.insertBefore(u,e.childNodes[i.r])}t&&e.appendChild(t);return e}(e,r);case 5:return r.s(e);default:W(10)}}(a,t);a===e&&(e=t)}return e}function Ne(e){if(3===e.nodeType)return{$:0,a:e.textContent};if(1!==e.nodeType)return{$:0,a:""};for(var r=d,n=e.attributes,t=n.length;t--;)var a=n[t],r={$:1,a:l(ke,a.name,a.value),b:r};for(var o=e.tagName.toLowerCase(),i=d,u=e.childNodes,t=u.length;t--;)i={$:1,a:Ne(u[t]),b:i};return f(w,o,r,i)}var Ge=N(function(r,e,n,i){return fe(e,i,r.aH,r.a0,r.aZ,function(n,e){var t=r.a2,a=i.node,o=Ne(a);return He(e,function(e){var e=t(e),r=Ee(o,e);a=De(a,o,r,n),o=e})})}),Le="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:function(e){return setTimeout(e,1e3/60)};function He(n,t){t(n);var a=0;function o(){a=1===a?0:(Le(o),t(n),1)}return function(e,r){n=e,r?(t(n),2===a&&(a=1)):(0===a&&Le(o),a=2)}}function x(e){return l(Rr,"href",/^javascript:/i.test((e=e).replace(/\s/g,""))?"":e)}function Pe(e){return l(Rr,"src",xe(e))}function ze(e){return l(j,b([l(E,"display","grid"),l(E,"grid-template-columns","72px 1fr"),_("h-full"),l(E,"min-height","115px"),l(E,"background","white"),l(E,"border-radius","4px"),l(E,"padding","20px")]),b([l(j,b([l(E,"margin","0px 10px 40px 0"),_("float-left relative")]),b([function(e){return l(Gr,e.aE,e.aI)}(e)])),l(j,d,b([l(j,d,b([T(e.aM)])),(r=e.aR,l(j,b([l(E,"color","#333"),l(E,"font-size",".8em")]),b([T(r)]))),(r=e.ay,l(j,b([l(E,"overflow-wrap","anywhere"),l(E,"margin-top","10px")]),b([T(r)]))),function(e){return l(j,b([l(E,"margin-top","10px"),_("flex items-center")]),l(Cr,en,l(Pr,Hr,e.aV)))}(e)]))]));var r}function qe(e){return l(j,b([_("w-full")]),b([l(j,b([_("lg:hidden")]),b([tn])),l(j,b([_("hidden lg:block w-full")]),b([function(e){return l(nn,b([_("h-full w-full grid grid-cols-6 content-center justify-items-center")]),b([h(V,e,"/animations","_self","Animations"),h(V,e,"https://www.etsy.com/shop/CatholicStories","_blank","Shop"),h(V,e,"/resources","_self","Resources"),h(V,e,"/contact","_self","Contact"),h(V,e,"/give","_self","Give"),h(V,e,"/team","_self","About Us")]))}(e)]))]))}var Oe,We=1,Ue=0,C=e,Ke=n(function(e,r,n){for(;;){if(-2===n.$)return r;var t=n.d,a=e,o=f(e,n.b,n.c,f(Ke,e,r,n.e));e=a,r=o,n=t}}),Je=function(e){return f(Ke,n(function(e,r,n){return l(C,{a:e,b:r},n)}),d,e)},$=function(e){return{$:1,a:e}},Qe=r(function(e,r){return{$:3,a:e,b:r}}),Ze=r(function(e,r){return{$:0,a:e,b:r}}),Xe=r(function(e,r){return{$:1,a:e,b:r}}),Ye=function(e){return{$:0,a:e}},er=function(e){return{$:2,a:e}},e=function(e){return e+""},rr=n(function(e,r,n){for(;;){if(!n.b)return r;var t=n.b,a=e,o=l(e,n.a,r);e=a,r=o,n=t}}),nr=function(e){return f(rr,C,d,e)},tr=N(function(e,r,n,t){return{$:0,a:e,b:r,c:n,d:t}}),ar=[],or=U,ir=r(function(e,r){return K(r)/K(e)}),ur=or(l(ir,2,32)),sr=h(tr,0,ur,ar,ar),cr=o,fr=s,lr=function(e){return e.length},hr=r(function(e,r){return 0<t(e,r)?e:r}),dr=u,br=r(function(e,r){for(;;){var n=l(dr,32,e),t=n.b,n=l(C,{$:0,a:n.a},r);if(!t.b)return nr(n);e=t,r=n}}),pr=r(function(e,r){for(;;){var n=or(r/32);if(1===n)return l(dr,32,e).a;e=l(br,e,d),r=n}}),mr=r(function(e,r){var n,t;return r.a?(t=fr(l(ir,32,(n=32*r.a)-1)),e=e?nr(r.d):r.d,e=l(pr,e,r.a),h(tr,lr(r.c)+n,l(hr,5,t*ur),e,r.c)):h(tr,lr(r.c),ur,ar,r.c)}),vr=G(function(e,r,n,t,a){for(;;){if(r<0)return l(mr,!1,{d:t,a:n/32|0,c:a});var o={$:1,a:f(cr,32,r,e)};e=e,r=r-32,n=n,t=l(C,o,t),a=a}}),gr=r(function(e,r){var n;return 0<e?L(vr,r,e-(n=e%32)-32,e,d,f(cr,n,e-n,r)):sr}),A=function(e){return!e.$},U=function(e){return{$:0,a:e}},wr=function(e){switch(e.$){case 0:return 0;case 1:return 1;case 2:return 2;default:return 3}},yr=re,o=yr(0),kr=N(function(e,r,n,t){var a,o,i,u;return t.b?(a=t.a,(t=t.b).b?(o=t.a,(t=t.b).b?(i=t.a,(t=t.b).b?(u=t.b,l(e,a,l(e,o,l(e,i,l(e,t.a,500<n?f(rr,e,r,nr(u)):h(kr,e,r,n+1,u)))))):l(e,a,l(e,o,l(e,i,r)))):l(e,a,l(e,o,r))):l(e,a,r)):r}),xr=n(function(e,r,n){return h(kr,e,r,0,n)}),Cr=r(function(n,e){return f(xr,r(function(e,r){return l(C,n(e),r)}),d,e)}),$r=ne,Ar=r(function(r,e){return l($r,function(e){return yr(r(e))},e)}),jr=n(function(n,e,t){return l($r,function(r){return l($r,function(e){return yr(l(n,r,e))},t)},e)}),Er=g,_r=r(function(e,r){return oe(l($r,Er(e),r))}),s=n(function(e,r,n){return l(Ar,function(e){return 0},(e=l(Cr,_r(e),r),f(xr,jr(C),yr(d),e)))}),Mr=(v.Task={b:o,c:s,d:n(function(e,r,n){return yr(0)}),e:r(function(e,r){return l(Ar,e,r)}),f:void 0},le("Task"),he(d)),Sr=he(d),j=w("div"),E=y,Tr=ee,Rr=r(function(e,r){return l(ye,e,Tr(r))}),_=Rr("className"),Ir=w("h1"),T=we,u=w("h2"),g=w("p"),R=w("a"),o=ke("rel"),Fr=Rr("target"),s=l(R,b([x("https://signup.catholicstoriesforchildren.com"),o("noopener"),Fr("_blank"),l(E,"text-decoration","none"),l(E,"padding","10px 20px"),l(E,"display","inline-block"),l(E,"border-radius","5px"),l(E,"box-shadow","#777 1px 1px 5px"),l(E,"color","white"),l(E,"background-color","#9200B3")]),b([T("Sign Up")])),y=l(j,d,b([l(g,b([_("pb-5")]),b([T("Want tips, resources, and Catholic animations? We are giving away our prayer printable to those who sign up today!")])),s])),o=l(j,d,b([l(g,b([_("mb-4")]),b([T("Catholic Stories for Children is a nonprofit aimed at telling short stories, primarily through animation, to help kids learn Catholic prayers, learn about Catholic saints, and to learn other Catholic concepts.")])),l(g,d,b([T("Many kids today are growing up without knowing the core concepts of our faith. Many are learning the prayers without understanding the words they are saying. We hope to help bridge this gap with enjoyable stories, animations and songs. We hope to help kids grow with a strong love of neighbor and God.")])),l(j,b([_("mt-5")]),b([y])),l(u,b([_("my-7")]),b([T("Vision")])),l(g,d,b([T("Catholic Stories for Children is made with the vision that all Catholics have a strong love of God and neighbor.")])),l(u,b([_("my-7")]),b([T("Mission")])),l(g,d,b([T("Our hope is to help others along this journey with joyful stories.")]))])),s=b([{ay:"Fr. Fredrick is a former chaplain of Santa Margarita Catholic High School and CHOC, former Parochial Vicar of St. Irenaeus Catholic Church, Church of St. Pius X, and Our Lady of Mt. Carmel Church.",aE:"/assets/Team/FrDodik.jpeg",aI:"",aM:"Father Fredrick Miras, A.M.",aR:"Alagad ni Maria",aV:d},{ay:"Fr. Aaron is the associate chaplain in Saint Irenaeus Parish in Cypress, CA.",aE:"/assets/Team/FrAaron.jpeg",aI:"",aM:"Father Aaron Galvizo, A.M.",aR:"Alagad ni Maria",aV:d},{ay:"Chris Pagel is the assistant dean of Graduate Business Programs and Career Services at Chapman University's George L. Argyros School of Business and Economics.",aE:"/assets/Team/ChrisPagel.jpeg",aI:"",aM:"Christopher Pagel",aR:"Assistant Dean",aV:d},{ay:"Truly silent.",aE:"/assets/Team/Cheri.jpeg",aI:"",aM:"Cheri Loreto",aR:"Silent Advisor",aV:d}]),y={ay:"Kelly is a part-time social media specialist and homeschools her four children on the east coast of Canada.",aE:"/assets/Team/KellyBriggs.jpeg",aI:"KB",aM:"Kelly Briggs",aR:"Social Media Specialist",aV:b([{a:1,b:"https://www.instagram.com/simplehomemom/"},{a:5,b:"https://www.facebook.com/simplehomemom"},{a:8,b:"https://www.pinterest.com/simplehomemom/"},{a:0,b:"https://www.simplehomemom.com/"}])},y=b([{ay:"Will is a freelance animator based in Arlington, Virginia. ",aE:"/assets/Team/Will.jpeg",aI:"WM",aM:"Will Maciejewski",aR:"Producer and Animator",aV:b([{a:0,b:"https://www.willmacmotion.com/"},{a:1,b:"https://www.instagram.com/willmacmotion/"}])},{ay:"Emma is a graphic designer with an eye for detail and a desire to captivate the wonder of the world through art. ",aE:"/assets/Team/EmmaGreene.jpeg",aI:"EG",aM:"Emma Greene",aR:"Designer and Illustrator",aV:b([{a:1,b:"https://www.instagram.com/emmarosecreative"}])},{ay:"Fernando is passionate for film, videogames and music. He is passionate about telling stories through sound. ",aE:"",aI:"FA",aM:"Fernando J Alanis",aR:"Sound Design and Re-Recording Mixer",aV:b([{a:0,b:"https://www.alanissound.com/"},{a:4,b:"https://www.imdb.com/name/nm8854188/"},{a:5,b:"https://www.facebook.com/alanissound"},{a:6,b:"http://www.linkedin.com/in/alanissound"}])},{ay:"",aE:"/assets/Team/DanaMiller.jpeg",aI:"DM",aM:"Dana Miller",aR:"Voice Actor",aV:d},{ay:"",aE:"/assets/Team/JadenLuo.jpeg",aI:"JL",aM:"Jaden Luo",aR:"Voice Actor",aV:d},{ay:"Mako Animation is a creative studio that offers visual communication strategies for all kinds of projects. They are passionate about bringing original stories to life\nwith a unique and creative narrative.",aE:"/assets/Team/makoTeam.png",aI:"MT",aM:"Mako Animation",aR:"Animation Team",aV:b([{a:0,b:"https://makoanimation.mx/"},{a:5,b:"https://www.facebook.com/makoanimation/"},{a:2,b:"https://twitter.com/MakoAnimation"},{a:7,b:"https://www.youtube.com/channel/UCOszpOlqJxLtjpbTH7VN7Kg"}])},{ay:"Nick and Alina have been collaborators in songwriting and performing since 2006. They have fused their creative fires to illuminate the trials and triumphs of the human experience. The duo impacts their audiences through powerful testimony, moving vocals and songs that burn through with Truth, Love, Inspiration, and Beauty.",aE:"/assets/Team/NickAndAlina.jpeg",aI:"ND",aM:"Nick and Alina De La Torre",aR:"Composer",aV:b([{a:0,b:"http://nickandalina.com/"},{a:7,b:"https://www.youtube.com/nickalinadelatorre"},{a:1,b:"https://www.instagram.com/nickandalina/"},{a:5,b:"https://www.facebook.com/nickandalina/"},{a:2,b:"https://twitter.com/nickandalina_"},{a:9,b:"https://open.spotify.com/artist/3BHBEFqQWqROuXbQCSnb06?si=9Mh_b1M4T6S7nmsswkdHPQ&nd=1"}])},{ay:"",aE:"",aI:"EN",aM:"Ethan Nagy",aR:"Singer and Voice Actor",aV:d},{ay:"",aE:"",aI:"IR",aM:"Italia Rose",aR:"Singer and Voice Actor",aV:d},{ay:"",aE:"",aI:"DG",aM:"Dominic Grodi",aR:"Singer and Voice Actor",aV:d},{ay:"Sean is a composer for games, films, cartoons, trailers, and more. He is also a highly sought after composer for Catholic media. He is Roman Catholic, husband of 15 years, and father to six children.",aE:"/assets/Team/SeanBeeson.jpeg",aI:"SB",aM:"Sean Beeson",aR:"Composer",aV:b([{a:0,b:"https://www.seanbeeson.com/"},{a:10,b:"https://soundcloud.com/sean-beeson"},{a:5,b:"https://www.facebook.com/gamecomposer"},{a:2,b:"https://twitter.com/seanbeeson"},{a:7,b:"https://www.youtube.com/user/Buckeye198181"}])},{ay:"Ekaterina is a skilled artist presenting a unique approach to developing visually appealing designs.",aE:"/assets/Team/Ekaterina.png",aI:"ES",aM:"Ekaterina Soyuznova",aR:"Visual Development Artist",aV:b([{a:0,b:"https://www.ekaterinasoyuznova.com/"},{a:1,b:"https://www.instagram.com/soyuznova_ekaterina/"},{a:5,b:"https://www.facebook.com/kate.soyuznova/"},{a:2,b:"https://twitter.com/Kati45413104"},{a:7,b:"https://www.youtube.com/channel/UCgc9v2t9OtqQEw_D4jKgbew"}])},{ay:"Artist, 3D Motion Designer, Husband and Father.",aE:"",aI:"FS",aM:"Francesco Schito",aR:"3D Artist",aV:b([{a:1,b:"https://www.instagram.com/francescoschito/?hl=en"},{a:7,b:"https://www.youtube.com/playlist?list=UUcaSHFPBBghZlWSePTZzwLw"},{a:4,b:"https://www.imdb.com/name/nm7877744/"},{a:11,b:"https://www.behance.net/francescoschito"}])},{ay:"Rachael is passionate about telling stories through books, film, and dance.",aE:"/assets/Team/RachaelWorkman.jpeg",aI:"RW",aM:"Rachael Workman",aR:"Screenwriter",aV:b([{a:6,b:"https://www.linkedin.com/in/rachael-workman/"}])},y]),Vr=b([{ay:"Trevor is a former software engineer. He is currently studying for a Masters in Theology at the Franciscan University of Stuebenville. He founded Catholic Stories for Children to spread the light and love of God through animated stories that kids will love.",aE:"/assets/Team/TrevorRothaus.jpeg",aI:"",aM:"Trevor Rothaus",aR:"CEO",aV:d},{ay:"Carlos is a CAD designer who also has a passion for dogs, comedy and food.",aE:"/assets/Team/CarlosG.jpg",aI:"",aM:"Carlos Gutierrez",aR:"CFO",aV:d}]),Dr=w("h3"),Br=Rr("alt"),I=r(function(e,r){return l(ke,function(e){return/^(on|formAction$)/i.test(e)?"data-"+e:e}(e),xe(r))}),Nr=w("img"),Gr=r(function(e,r){return""===e?l(j,b([l(E,"position","relative"),l(E,"width","52px"),l(E,"height","52px"),l(E,"border-radius","30px"),l(E,"border","1px solid #777"),l(E,"background-color","#B99EDA")]),b([l(j,b([l(E,"position","absolute"),l(E,"top","50%"),l(E,"left","50%"),l(E,"transform","translate(-50%, -50%)")]),b([T(r)]))])):l(Nr,b([l(E,"width","52px"),l(E,"height","52px"),l(E,"border-radius","30px"),l(E,"border","1px solid #777"),l(E,"object-fit","cover"),Pe(e),Br(""),l(I,"ariaHidden","true")]),d)}),Lr=n(function(e,n,t){if(i(n,t))return 1;for(var r=e;;){if(!r.b)return 1;var a=r.a,o=r.b;if(i(a,n))return function(e){for(;;){if(!e.b)return 2;var r=e.b;if(i(e.a,t))return 0;e=r}}(o);if(i(a,t))return function(e){for(;;){if(!e.b)return 0;var r=e.b;if(i(e.a,n))return 2;e=r}}(o);r=o}})(b([0,1,2,3,4,5,6,7,8,9,10,11])),Hr=r(function(e,r){return l(Lr,e.a,r.a)}),Pr=a,a=r(function(e,r){return l(Nr,b([l(E,"aria-hidden","true"),Pe(r),l(E,"width","16px"),l(E,"height","16px"),Br(e)]),d)}),zr=l(a,"behance","https://www.behance.net/favicon.ico"),qr=l(a,"facebook","https://www.facebook.com/favicon.ico"),Or=l(a,"imdb","https://www.imdb.com/favicon.ico"),Wr=l(a,"instagram","https://www.instagram.com/favicon.ico"),Ur=l(a,"linkedin","https://www.linkedin.com/favicon.ico"),Kr=l(a,"pinterest","https://www.pinterest.com/favicon.ico"),Jr=l(a,"soundcloud","https://soundcloud.com/favicon.ico"),Qr=l(a,"spotify","https://www.spotify.com/favicon.ico"),Zr=l(a,"twitter","https://www.twitter.com/favicon.ico"),F=n(function(e,r,n){return l(R,b([x(r),l(E,"text-decoration","none"),Fr("_blank"),l(E,"margin-right","10px"),l(I,"aria-label",n),_("inline-block")]),b([e]))}),Xr=l(a,"vimeo","https://vimeo.com/favicon.ico"),Yr=l(a,"youtube","https://www.youtube.com/favicon.ico"),en=function(e){var r=e.b;switch(e.a){case 0:return f(F,T("🌐"),r,"website");case 1:return f(F,Wr,r,"instagram");case 2:return f(F,Zr,r,"twitter");case 5:return f(F,qr,r,"facebook");case 6:return f(F,Ur,r,"linkedin");case 3:return f(F,Xr,r,"vimeo");case 4:return f(F,Or,r,"imdb");case 7:return f(F,Yr,r,"youtube");case 8:return f(F,Kr,r,"pinterest");case 9:return f(F,Qr,r,"spotify");case 10:return f(F,Jr,r,"soundcloud");default:return f(F,zr,r,"behance")}},a=n(function(e,r,n){return l(j,b([l(E,"margin-bottom","100px")]),z(b([l(Dr,b([_("text-2xl")]),b([T(e)])),l(j,b([_("hcenter")]),b([T(r)]))]),l(Cr,function(e){return l(j,b([_("my-10")]),b([ze(e)]))},n)))}),u=l(j,d,b([l(u,b([_("my-10")]),b([T("The Team")])),f(a,"Staff","",Vr),f(a,"Board of Advisors","",s),f(a,"Talent","A number of talented artists, contractors, teams and people help bring these animations to life.",y)])),Vr=l(j,b([_("hcenter"),l(E,"width","80%"),l(E,"max-width","800px")]),b([l(Ir,b([_("my-10")]),b([T("About Us")])),o,u])),s=w("footer"),a=w("span"),y=l(s,b([l(E,"padding",e(30)+"px"),l(E,"background-color","black"),l(E,"color","white"),l(E,"transform-style","preserve-3d")]),b([l(j,b([_("flex items-center gap-2.5")]),b([l(a,d,b([T("Follow us on")])),l(R,b([x("https://www.facebook.com/catholicstoriesforchildren"),l(I,"aria-label","CSC Facebook Page"),Fr("_blank")]),b([l(Nr,b([_("w-10 h-10"),Pe("https://ik.imagekit.io/catholicstories/f_logo_RGB-Blue_250_3vs-yhXer.png?updatedAt=1684277030198"),Br("Facebook")]),d)])),l(R,b([x("https://www.instagram.com/catholicstoriesforchildren/"),l(I,"aria-label","CSC Instagram Page"),Fr("_blank")]),b([l(Nr,b([_("w-10 h-10"),Pe("https://ik.imagekit.io/catholicstories/Instagram_Glyph_Gradient_kFoMs9jIr.png?updatedAt=1684277127293"),Br("Instagram")]),d)]))])),l(g,d,b([T("Copyright © 2023 Catholic Stories for Children. All rights reserved.")])),l(g,d,b([T("Catholic Stories for Children is a 501(c)(3) non-profit recognized by the IRS. Contributions to Catholic Stories for Children are tax-deductible to the extent permitted by law.  Tax ID Number: 85-4194883")]))])),rn=w("header"),nn=w("nav"),V=N(function(e,r,n,t){return l(R,b([x(r),_("flex items-center justify-center"),_("hover:bg-csc-lightpurple"),_("hover:border-b-2 hover:border-gray-700"),_("rounded-t"),_("text-lg"),_("h-[60px] h-["+e+"]"),_("w-full"),l(I,"aria-label",t),Fr(n)]),b([T(t)]))}),tn=l(R,b([x("/navigation"),_("space-y-2"),l(I,"aria-label","menu")]),b([l(j,b([_("w-8 h-0.5 m-auto bg-gray-600")]),d),l(j,b([_("w-8 h-0.5 m-auto bg-gray-600")]),d),l(j,b([_("w-8 h-0.5 m-auto bg-gray-600")]),d)])),o=l(Nr,b([Pe("/assets/logo_solid.svg"),l(E,"height","30px"),Br(""),l(E,"vertical-align","middle")]),d),an=l(R,b([l(E,"text-decoration","none"),_("colorDarkGray"),x("/"),l(I,"aria-label","home")]),b([o])),u=r(function(e,r){var e="Catholic Stories for Children"===e?{a:"111px",b:qe,c:"grid-cols-[150px_1fr_150px] lg:grid-cols-[150px_1fr_600px]"}:{a:"60px",b:qe,c:"grid-cols-[150px_1fr_150px] lg:grid-cols-[150px_1fr_600px]"},n=e.a,t=e.b,e=e.c;return l(rn,b([l(E,"background-color","#3d5d75"),l(E,"background-image","linear-gradient(130deg, #9DE2EB , #EBD6F1)"),_("h-[60px] md:h-["+n+"]"),_("colorDarkGray"),_("grid items-center justify-items-center"),_(e)]),b([an,l(R,b([l(E,"text-decoration","none"),_("colorDarkGray"),_("invisible md:visible"),_("justify-self-start"),x("/")]),b([l(Ir,b([l(E,"font-family","hvdComicSerifPro"),l(E,"margin","0px"),_("text-[0px] md:text-2xl")]),b([T("Catholic Stories for Children")]))])),t(n)]))}),on=l(j,b([l(E,"height","100vh"),l(E,"overflow-x","hidden"),l(E,"background-color","#FEF7F4")]),b([l(u,"Team",10),Vr,y])),s=(Oe={aH:{},a0:function(e){return function(e){return e}},a2:function(e){return on}},Ge({aH:function(e){return{a:Oe.aH,b:Mr}},aZ:function(e){return Sr},a0:r(function(e,r){return{a:l(Oe.a0,e,r),b:Mr}}),a2:Oe.a2}));e={Team:{Main:{init:s(U(0))(0)}}},D.Elm?function e(r,n){for(var t in n)t in r?"init"==t?W(6):e(r[t],n[t]):r[t]=n[t]}(D.Elm,e):D.Elm=e}(this);