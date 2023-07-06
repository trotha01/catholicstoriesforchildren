!function(L){"use strict";function D(r,e,n){return n.a=r,n.f=e,n}function e(n){return D(2,n,function(e){return function(r){return n(e,r)}})}function r(t){return D(3,t,function(n){return function(e){return function(r){return t(n,e,r)}}})}function B(o){return D(4,o,function(t){return function(n){return function(e){return function(r){return o(t,n,e,r)}}}})}function G(i){return D(5,i,function(o){return function(t){return function(n){return function(e){return function(r){return i(o,t,n,e,r)}}}}})}function l(r,e,n){return 2===r.a?r.f(e,n):r(e)(n)}function s(r,e,n,t){return 3===r.a?r.f(e,n,t):r(e)(n)(t)}function h(r,e,n,t,o){return 4===r.a?r.f(e,n,t,o):r(e)(n)(t)(o)}function z(r,e,n,t,o,i){return 5===r.a?r.f(e,n,t,o,i):r(e)(n)(t)(o)(i)}function t(r,e,n){if("object"!=typeof r)return r===e?0:r<e?-1:1;if(void 0===r.$)return(n=(n=t(r.a,e.a))||t(r.b,e.b))||t(r.c,e.c);for(;r.b&&e.b&&!(n=t(r.a,e.a));r=r.b,e=e.b);return n||(r.b?1:e.b?-1:0)}var R=0;var d={$:0};function q(r,e){return{$:1,a:r,b:e}}var n=e(q);function v(r){for(var e=d,n=r.length;n--;)e={$:1,a:r[n],b:e};return e}var o=r(function(r,e,n){for(var t=Array(r),o=0;o<r;o++)t[o]=n(e+o);return t}),i=e(function(r,e){for(var n=Array(r),t=0;t<r&&e.b;t++)n[t]=e.a,e=e.b;return n.length=t,{a:n,b:e}});function P(r){throw Error("https://github.com/elm/core/blob/1.0.0/hints/"+r+".md")}var W=Math.ceil,a=Math.floor,O=Math.log;var X=e(b);function b(r,e){switch(r.$){case 2:return r.b(e);case 5:return null===e?Ur(r.c):m("null",e);case 3:return U(e)?J(r.b,e,v):m("a LIST",e);case 4:return U(e)?J(r.b,e,Y):m("an ARRAY",e);case 6:var n=r.d;return"object"==typeof e&&null!==e&&n in e?(i=b(r.b,e[n]),$(i)?i:k(l(Xr,n,i.a))):m("an OBJECT with a field named `"+n+"`",e);case 7:n=r.e;return U(e)?n<e.length?(i=b(r.b,e[n]),$(i)?i:k(l(Jr,n,i.a))):m("a LONGER array. Need index "+n+" but only see "+e.length+" entries",e):m("an ARRAY",e);case 8:if("object"!=typeof e||null===e||U(e))return m("an OBJECT",e);var t,o=d;for(t in e)if(e.hasOwnProperty(t)){var i=b(r.b,e[t]);if(!$(i))return k(l(Xr,t,i.a));o={$:1,a:{a:t,b:i.a},b:o}}return Ur(Kr(o));case 9:for(var a=r.f,c=r.g,u=0;u<c.length;u++){i=b(c[u],e);if(!$(i))return i;a=a(i.a)}return Ur(a);case 10:i=b(r.b,e);return $(i)?b(r.h(i.a),e):i;case 11:for(var f=d,s=r.g;s.b;s=s.b){i=b(s.a,e);if($(i))return i;f={$:1,a:i.a,b:f}}return k(Yr(Kr(f)));case 1:return k(l(Or,r.a,e));case 0:return Ur(r.a)}}function J(r,e,n){for(var t=e.length,o=Array(t),i=0;i<t;i++){var a=b(r,e[i]);if(!$(a))return k(l(Jr,i,a.a));o[i]=a.a}return Ur(n(o))}function U(r){return Array.isArray(r)||"undefined"!=typeof FileList&&r instanceof FileList}function Y(e){return l(de,e.length,function(r){return e[r]})}function m(r,e){return k(l(Or,"Expecting "+r,e))}function u(r,e){if(r===e)return!0;if(r.$!==e.$)return!1;switch(r.$){case 0:case 1:return r.a===e.a;case 2:return r.b===e.b;case 5:return r.c===e.c;case 3:case 4:case 8:return u(r.b,e.b);case 6:return r.d===e.d&&u(r.b,e.b);case 7:return r.e===e.e&&u(r.b,e.b);case 9:return r.f===e.f&&Z(r.g,e.g);case 10:return r.h===e.h&&u(r.b,e.b);case 11:return Z(r.g,e.g)}}function Z(r,e){var n=r.length;if(n!==e.length)return!1;for(var t=0;t<n;t++)if(!u(r[t],e[t]))return!1;return!0}function K(r){return r}function V(r){return{$:0,a:r}}var Q=e(function(r,e){return{$:3,b:r,d:e}});var rr=0;function er(r){r={$:0,e:rr++,f:r,g:null,h:[]};return ar(r),r}function nr(e){return{$:2,b:function(r){r({$:0,a:er(e)})},c:null}}function tr(r,e){r.h.push(e),ar(r)}var or=!1,ir=[];function ar(r){if(ir.push(r),!or){for(or=!0;r=ir.shift();)!function(e){for(;e.f;){var r=e.f.$;if(0===r||1===r){for(;e.g&&e.g.$!==r;)e.g=e.g.i;if(!e.g)return;e.f=e.g.b(e.f.a),e.g=e.g.i}else{if(2===r)return e.f.c=e.f.b(function(r){e.f=r,ar(e)});if(5===r){if(0===e.h.length)return;e.f=e.f.b(e.h.shift())}else e.g={$:3===r?0:1,b:e.f.b,i:e.g},e.f=e.f.d}}}(r);or=!1}}function cr(r,e,n,t,o,i){var r=l(X,r,e?e.flags:void 0),a=($(r)||P(2),{}),e=n(r.a),c=e.a,u=i(f,c),n=function(r,e){var n,t;for(t in p){var o=p[t];o.a&&((n=n||{})[t]=o.a(t,e)),r[t]=function(r,e){var t={g:e,h:void 0},o=r.c,i=r.d,a=r.e,c=r.f;function u(n){return l(Q,u,{$:5,b:function(r){var e=r.a;return 0===r.$?s(i,t,e,n):a&&c?h(o,t,e.i,e.j,n):s(o,t,a?e.i:e.j,n)}})}return t.h=er(l(Q,u,r.b))}(o,e)}return n}(a,f);function f(r,e){r=l(t,r,c);u(c=r.a,e),hr(a,r.b,o(c))}return hr(a,e.b,o(c)),n?{ports:n}:{}}var p={};var c=e(function(e,n){return{$:2,b:function(r){e.g(n),r({$:0,a:R})},c:null}});function ur(e){return function(r){return{$:1,k:e,l:r}}}function fr(r){return{$:2,m:r}}var sr=[],lr=!1;function hr(r,e,n){if(sr.push({p:r,q:e,r:n}),!lr){lr=!0;for(var t;t=sr.shift();)!function(r,e,n){var t,o={};for(t in dr(!0,e,o,null),dr(!1,n,o,null),r)tr(r[t],{$:"fx",a:o[t]||{i:d,j:d}})}(t.p,t.q,t.r);lr=!1}}function dr(r,e,n,t){switch(e.$){case 1:var o=e.k,i=function(r,e,n,t){function o(r){for(var e=n;e;e=e.t)r=e.s(r);return r}return l(r?p[e].e:p[e].f,o,t)}(r,o,t,e.l);return void(n[o]=function(r,e,n){return n=n||{i:d,j:d},r?n.i={$:1,a:e,b:n.i}:n.j={$:1,a:e,b:n.j},n}(r,i,n[o]));case 2:for(var a=e.m;a.b;a=a.b)dr(r,a.a,n,t);return;case 3:dr(r,e.o,n,{s:e.n,t:t})}}var vr;var br="undefined"!=typeof document?document:{};function mr(r){return{$:0,a:r}}var f=e(function(i,a){return e(function(r,e){for(var n=[],t=0;e.b;e=e.b){var o=e.a;t+=o.b||0,n.push(o)}return t+=n.length,{$:1,c:a,d:kr(r),e:n,f:i,b:t}})})(void 0);e(function(i,a){return e(function(r,e){for(var n=[],t=0;e.b;e=e.b){var o=e.a;t+=o.b.b||0,n.push(o)}return t+=n.length,{$:2,c:a,d:kr(r),e:n,f:i,b:t}})})(void 0);var pr=e(function(r,e){return{$:"a1",n:r,o:e}}),gr=e(function(r,e){return{$:"a2",n:r,o:e}}),g=e(function(r,e){return{$:"a3",n:r,o:e}});function wr(r){return/^\s*(javascript:|data:text\/html)/i.test(r)?"":r}var yr;function kr(r){for(var e={};r.b;r=r.b){var n,t=r.a,o=t.$,i=t.n,t=t.o;"a2"===o?"className"===i?$r(e,i,t):e[i]=t:(n=e[o]||(e[o]={}),"a3"===o&&"class"===i?$r(n,i,t):n[i]=t)}return e}function $r(r,e,n){var t=r[e];r[e]=t?t+" "+n:n}function w(r,e){var n=r.$;if(5===n)return w(r.k||(r.k=r.m()),e);if(0===n)return br.createTextNode(r.a);if(4===n){for(var t=r.k,o=r.j;4===t.$;)"object"!=typeof o?o=[o,t.j]:o.push(t.j),t=t.k;var i={j:o,p:e};(a=w(t,i)).elm_event_node_ref=i}else if(3===n)_r(a=r.h(r.g),e,r.d);else{var a=r.f?br.createElementNS(r.f,r.c):br.createElement(r.c);vr&&"a"==r.c&&a.addEventListener("click",vr(a)),_r(a,e,r.d);for(var c=r.e,u=0;u<c.length;u++)a.appendChild(w(1===n?c[u]:c[u].b,e))}return a}function _r(r,e,n){for(var t in n){var o=n[t];"a1"===t?function(r,e){var n,t=r.style;for(n in e)t[n]=e[n]}(r,o):"a0"===t?function(r,e,n){var t,o=r.elmFs||(r.elmFs={});for(t in n){var i=n[t],a=o[t];if(i){if(a){if(a.q.$===i.$){a.q=i;continue}r.removeEventListener(t,a)}a=function(u,r){function f(r){var e=f.q,n=b(e.a,r);if($(n)){for(var t,e=ve(e),n=n.a,o=e?e<3?n.a:n.r:n,i=1==e?n.b:3==e&&n.N,a=(i&&r.stopPropagation(),(2==e?n.b:3==e&&n.K)&&r.preventDefault(),u);t=a.j;){if("function"==typeof t)o=t(o);else for(var c=t.length;c--;)o=t[c](o);a=a.p}a(o,i)}}return f.q=r,f}(e,i),r.addEventListener(t,a,yr&&{passive:ve(i)<2}),o[t]=a}else r.removeEventListener(t,a),o[t]=void 0}}(r,e,o):"a3"===t?function(r,e){for(var n in e){var t=e[n];void 0!==t?r.setAttribute(n,t):r.removeAttribute(n)}}(r,o):"a4"===t?function(r,e){for(var n in e){var t=e[n],o=t.f,t=t.o;void 0!==t?r.setAttributeNS(o,n,t):r.removeAttributeNS(o,n)}}(r,o):("value"!==t&&"checked"!==t||r[t]!==o)&&(r[t]=o)}}try{window.addEventListener("t",null,Object.defineProperty({},"passive",{get:function(){yr=!0}}))}catch(r){}function Cr(r,e){var n=[];return M(r,e,n,0),n}function H(r,e,n,t){e={$:e,r:n,s:t,t:void 0,u:void 0};return r.push(e),e}function M(r,e,n,t){if(r!==e){var o=r.$,i=e.$;if(o!==i){if(1!==o||2!==i)return void H(n,0,t,e);e=function(r){for(var e=r.e,n=e.length,t=Array(n),o=0;o<n;o++)t[o]=e[o].b;return{$:1,c:r.c,d:r.d,e:t,f:r.f,b:r.b}}(e),i=1}switch(i){case 5:for(var a=r.l,c=e.l,u=a.length,f=u===c.length;f&&u--;)f=a[u]===c[u];if(f)return void(e.k=r.k);e.k=e.m();var s=[];return M(r.k,e.k,s,0),void(0<s.length&&H(n,1,t,s));case 4:for(var l=r.j,h=e.j,d=!1,v=r.k;4===v.$;)d=!0,"object"!=typeof l?l=[l,v.j]:l.push(v.j),v=v.k;for(var b=e.k;4===b.$;)d=!0,"object"!=typeof h?h=[h,b.j]:h.push(b.j),b=b.k;return d&&l.length!==h.length?void H(n,0,t,e):((d?function(r,e){for(var n=0;n<r.length;n++)if(r[n]!==e[n])return;return 1}(l,h):l===h)||H(n,2,t,h),void M(v,b,n,t+1));case 0:return void(r.a!==e.a&&H(n,3,t,e.a));case 1:return void xr(r,e,n,t,Fr);case 2:return void xr(r,e,n,t,jr);case 3:if(r.h!==e.h)return void H(n,0,t,e);s=Ar(r.d,e.d),s=(s&&H(n,4,t,s),e.i(r.g,e.g));s&&H(n,5,t,s)}}}function xr(r,e,n,t,o){var i;r.c!==e.c||r.f!==e.f?H(n,0,t,e):((i=Ar(r.d,e.d))&&H(n,4,t,i),o(r,e,n,t))}function Ar(r,e,n){var t,o,i,a,c;for(o in r)"a1"===o||"a0"===o||"a3"===o||"a4"===o?(i=Ar(r[o],e[o]||{},o))&&((t=t||{})[o]=i):o in e?(i=r[o])===(a=e[o])&&"value"!==o&&"checked"!==o||"a0"===n&&function(r,e){return r.$==e.$&&u(r.a,e.a)}(i,a)||((t=t||{})[o]=a):(t=t||{})[o]=n?"a1"===n?"":"a0"===n||"a3"===n?void 0:{f:r[o].f,o:void 0}:"string"==typeof r[o]?"":null;for(c in e)c in r||((t=t||{})[c]=e[c]);return t}function Fr(r,e,n,t){var o=r.e,i=e.e,r=o.length,e=i.length;e<r?H(n,6,t,{v:e,i:r-e}):r<e&&H(n,7,t,{v:r,e:i});for(var a=r<e?r:e,c=0;c<a;c++){var u=o[c];M(u,i[c],n,++t),t+=u.b||0}}function jr(r,e,n,t){for(var o=[],i={},a=[],c=r.e,u=e.e,f=c.length,s=u.length,l=0,h=0,d=t;l<f&&h<s;){var v=c[l],b=u[h],m=v.a,p=b.a,g=v.b,w=b.b,y=void 0,k=void 0;if(m===p)M(g,w,o,++d),d+=g.b||0,l++,h++;else{var $,_,C,x,A=c[l+1],F=u[h+1];if(A&&(_=A.b,k=p===($=A.a)),F&&(x=F.b,y=m===(C=F.a)),y&&k)M(g,x,o,++d),Mr(i,o,m,w,h,a),d+=g.b||0,Sr(i,o,m,_,++d),d+=_.b||0,l+=2,h+=2;else if(y)d++,Mr(i,o,p,w,h,a),M(g,x,o,d),d+=g.b||0,l+=1,h+=2;else if(k)Sr(i,o,m,g,++d),d+=g.b||0,M(_,w,o,++d),d+=_.b||0,l+=2,h+=1;else{if(!A||$!==C)break;Sr(i,o,m,g,++d),Mr(i,o,p,w,h,a),d+=g.b||0,M(_,x,o,++d),d+=_.b||0,l+=2,h+=2}}}for(;l<f;){g=(v=c[l]).b;Sr(i,o,v.a,g,++d),d+=g.b||0,l++}for(;h<s;){var j=j||[];Mr(i,o,(b=u[h]).a,b.b,void 0,j),h++}(0<o.length||0<a.length||j)&&H(n,8,t,{w:o,x:a,y:j})}var Hr="_elmW6BL";function Mr(r,e,n,t,o,i){var a,c=r[n];c?1===c.c?(i.push({r:o,A:c}),c.c=2,M(c.z,t,a=[],c.r),c.r=o,c.s.s={w:a,A:c}):Mr(r,e,n+Hr,t,o,i):(i.push({r:o,A:c={c:0,z:t,r:o,s:void 0}}),r[n]=c)}function Sr(r,e,n,t,o){var i,a=r[n];a?0===a.c?(a.c=2,M(t,a.z,i=[],o),H(e,9,o,{w:i,A:a})):Sr(r,e,n+Hr,t,o):(i=H(e,9,o,void 0),r[n]={c:1,z:t,r:o,s:i})}function Tr(r,e,n,t){!function r(e,n,t,o,i,a,c){var u=t[o];var f=u.r;for(;f===i;){var s,l=u.$;if(1===l?Tr(e,n.k,u.s,c):8===l?(u.t=e,u.u=c,0<(s=u.s.w).length&&r(e,n,s,0,i,a,c)):9===l?(u.t=e,u.u=c,(l=u.s)&&(l.A.s=e,0<(s=l.w).length)&&r(e,n,s,0,i,a,c)):(u.t=e,u.u=c),!(u=t[++o])||(f=u.r)>a)return o}var h=n.$;if(4===h){for(var d=n.k;4===d.$;)d=d.k;return r(e,d,t,o,i+1,a,e.elm_event_node_ref)}var v=n.e;var b=e.childNodes;for(var m=0;m<v.length;m++){var p=1===h?v[m]:v[m].b,g=++i+(p.b||0);if(i<=f&&f<=g&&(o=r(b[m],p,t,o,i,g,c),!(u=t[o])||(f=u.r)>a))return o;i=g}return o}(r,e,n,0,0,e.b,t)}function Er(r,e,n,t){return 0===n.length?r:(Tr(r,e,n,t),Nr(r,n))}function Nr(r,e){for(var n=0;n<e.length;n++){var t=e[n],o=t.t,t=function(r,e){switch(e.$){case 0:return function(r,e,n){var t=r.parentNode,e=w(e,n);e.elm_event_node_ref||(e.elm_event_node_ref=r.elm_event_node_ref);t&&e!==r&&t.replaceChild(e,r);return e}(r,e.s,e.u);case 4:return _r(r,e.u,e.s),r;case 3:return r.replaceData(0,r.length,e.s),r;case 1:return Nr(r,e.s);case 2:return r.elm_event_node_ref?r.elm_event_node_ref.j=e.s:r.elm_event_node_ref={j:e.s,p:e.u},r;case 6:for(var n=e.s,t=0;t<n.i;t++)r.removeChild(r.childNodes[n.v]);return r;case 7:for(var o=(n=e.s).e,t=n.v,i=r.childNodes[t];t<o.length;t++)r.insertBefore(w(o[t],e.u),i);return r;case 9:var a;return(n=e.s)?(void 0!==(a=n.A).r&&r.parentNode.removeChild(r),a.s=Nr(r,n.w)):r.parentNode.removeChild(r),r;case 8:return function(r,e){for(var n=e.s,t=function(r,e){if(r){for(var n=br.createDocumentFragment(),t=0;t<r.length;t++){var o=r[t].A;n.appendChild(2===o.c?o.s:w(o.z,e.u))}return n}}(n.y,e),o=(r=Nr(r,n.w),n.x),i=0;i<o.length;i++){var a=o[i],c=a.A,c=2===c.c?c.s:w(c.z,e.u);r.insertBefore(c,r.childNodes[a.r])}t&&r.appendChild(t);return r}(r,e);case 5:return e.s(r);default:P(10)}}(o,t);o===r&&(r=t)}return r}function Ir(r){if(3===r.nodeType)return{$:0,a:r.textContent};if(1!==r.nodeType)return{$:0,a:""};for(var e=d,n=r.attributes,t=n.length;t--;)var o=n[t],e={$:1,a:l(g,o.name,o.value),b:e};for(var i=r.tagName.toLowerCase(),a=d,c=r.childNodes,t=c.length;t--;)a={$:1,a:Ir(c[t]),b:a};return s(f,i,e,a)}var Lr=B(function(e,r,n,a){return cr(r,a,e.aF,e.aX,e.aU,function(n,r){var t=e.aZ,o=a.node,i=Ir(o);return Br(r,function(r){var r=t(r),e=Cr(i,r);o=Er(o,i,e,n),i=r})})}),Dr="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:function(r){return setTimeout(r,1e3/60)};function Br(n,t){t(n);var o=0;function i(){o=1===o?0:(Dr(i),t(n),1)}return function(r,e){n=r,e?(t(n),2===o&&(o=1)):(0===o&&Dr(i),o=2)}}function y(r){return l(Fe,"href",/^javascript:/i.test((r=r).replace(/\s/g,""))?"":r)}function Gr(r){return l(Fe,"src",wr(r))}function zr(r){var e=r.b;switch(r.a){case 0:return s(N,A("🌐"),e,"website");case 1:return s(N,Ie,e,"instagram");case 2:return s(N,ze,e,"twitter");case 5:return s(N,Ee,e,"facebook");case 6:return s(N,Le,e,"linkedin");case 3:return s(N,Re,e,"vimeo");case 4:return s(N,Ne,e,"imdb");case 7:return s(N,qe,e,"youtube");case 8:return s(N,De,e,"pinterest");case 9:return s(N,Ge,e,"spotify");case 10:return s(N,Be,e,"soundcloud");default:return s(N,Te,e,"behance")}}function Rr(r){return l(_,v([l(C,"line-height","1.6em")]),v([r]))}function qr(r){return l(_,v([x("w-full")]),v([l(_,v([x("lg:hidden")]),v([Oe])),l(_,v([x("hidden lg:block w-full")]),v([function(r){return l(We,v([x("h-full w-full grid grid-cols-6 content-center justify-items-center")]),v([h(I,r,"/animations","_self","Animations"),h(I,r,"https://www.etsy.com/shop/CatholicStories","_blank","Shop"),h(I,r,"/resources","_self","Resources"),h(I,r,"/contact","_self","Contact"),h(I,r,"/give","_self","Give"),h(I,r,"/team","_self","About Us")]))}(r)]))]))}var Pr,Wr=n,k=function(r){return{$:1,a:r}},Or=e(function(r,e){return{$:3,a:r,b:e}}),Xr=e(function(r,e){return{$:0,a:r,b:e}}),Jr=e(function(r,e){return{$:1,a:r,b:e}}),Ur=function(r){return{$:0,a:r}},Yr=function(r){return{$:2,a:r}},n=function(r){return r+""},Zr=r(function(r,e,n){for(;;){if(!n.b)return e;var t=n.b,o=r,i=l(r,n.a,e);r=o,e=i,n=t}}),Kr=function(r){return s(Zr,Wr,d,r)},Vr=B(function(r,e,n,t){return{$:0,a:r,b:e,c:n,d:t}}),Qr=[],re=W,ee=e(function(r,e){return O(e)/O(r)}),ne=re(l(ee,2,32)),te=h(Vr,0,ne,Qr,Qr),oe=o,ie=a,ae=function(r){return r.length},ce=e(function(r,e){return 0<t(r,e)?r:e}),ue=i,fe=e(function(r,e){for(;;){var n=l(ue,32,r),t=n.b,n=l(Wr,{$:0,a:n.a},e);if(!t.b)return Kr(n);r=t,e=n}}),se=e(function(r,e){for(;;){var n=re(e/32);if(1===n)return l(ue,32,r).a;r=l(fe,r,d),e=n}}),le=e(function(r,e){var n,t;return e.a?(t=ie(l(ee,32,(n=32*e.a)-1)),r=r?Kr(e.d):e.d,r=l(se,r,e.a),h(Vr,ae(e.c)+n,l(ce,5,t*ne),r,e.c)):h(Vr,ae(e.c),ne,Qr,e.c)}),he=G(function(r,e,n,t,o){for(;;){if(e<0)return l(le,!1,{d:t,a:n/32|0,c:o});var i={$:1,a:s(oe,32,e,r)};r=r,e=e-32,n=n,t=l(Wr,i,t),o=o}}),de=e(function(r,e){var n;return 0<r?z(he,e,r-(n=r%32)-32,r,d,s(oe,n,r-n,e)):te}),$=function(r){return!r.$},W=function(r){return{$:0,a:r}},ve=function(r){switch(r.$){case 0:return 0;case 1:return 1;case 2:return 2;default:return 3}},be=V,o=be(0),me=B(function(r,e,n,t){var o,i,a,c;return t.b?(o=t.a,(t=t.b).b?(i=t.a,(t=t.b).b?(a=t.a,(t=t.b).b?(c=t.b,l(r,o,l(r,i,l(r,a,l(r,t.a,500<n?s(Zr,r,e,Kr(c)):h(me,r,e,n+1,c)))))):l(r,o,l(r,i,l(r,a,e)))):l(r,o,l(r,i,e))):l(r,o,e)):e}),pe=r(function(r,e,n){return h(me,r,e,0,n)}),ge=e(function(n,r){return s(pe,e(function(r,e){return l(Wr,n(r),e)}),d,r)}),we=Q,ye=e(function(e,r){return l(we,function(r){return be(e(r))},r)}),ke=r(function(n,r,t){return l(we,function(e){return l(we,function(r){return be(l(n,e,r))},t)},r)}),$e=c,_e=e(function(r,e){return nr(l(we,$e(r),e))}),a=r(function(r,e,n){return l(ye,function(r){return 0},(r=l(ge,_e(r),e),s(pe,ke(Wr),be(d),r)))}),Ce=(p.Task={b:o,c:a,d:r(function(r,e,n){return be(0)}),e:e(function(r,e){return l(ye,r,e)}),f:void 0},ur("Task"),fr(d)),xe=fr(d),_=f("div"),C=pr,Ae=K,Fe=e(function(r,e){return l(gr,r,Ae(e))}),x=Fe("className"),je=f("h1"),A=mr,F=f("a"),He=Fe("alt"),j=e(function(r,e){return l(g,function(r){return/^(on|formAction$)/i.test(r)?"data-"+r:r}(r),wr(e))}),i=f("br"),Me=K,c=e(function(r,e){return l(gr,r,Me(e))})("hidden"),o=e(function(r,e){return l(gr,function(r){return"innerHTML"==r||"formAction"==r?"data-"+r:r}(r),wr(e))}),a=f("span"),pr=l(a,d,v([l(a,v([l(C,"display","inline-block")]),v([A("trevor"),l(a,d,v([A("@")]))])),l(a,v([l(j,"ariaHidden","true"),l(o,"innerHTML",Ae("🍯"))]),d),l(a,v([l(j,"ariaHidden","true"),l(o,"innerHTML",Ae("spam@catholicstoriesforchildren.com"))]),d),l(a,v([l(g,"height",n(0)),l(g,"width",n(0)),l(C,"display","none"),c(!0)]),v([A("spam@catholicstoriesforchildren.com")])),l(a,d,v([A("catholicstoriesforchildren"),l(a,d,v([A("."),l(a,d,v([A("com")]))]))]))])),o=f("h2"),Se=f("img"),c=f("p"),S=g("rel"),T=Fe("target"),E=e(function(r,e){return l(Se,v([l(C,"aria-hidden","true"),Gr(e),l(C,"width","16px"),l(C,"height","16px"),He(r)]),d)}),Te=l(E,"behance","https://www.behance.net/favicon.ico"),Ee=l(E,"facebook","https://www.facebook.com/favicon.ico"),Ne=l(E,"imdb","https://www.imdb.com/favicon.ico"),Ie=l(E,"instagram","https://www.instagram.com/favicon.ico"),Le=l(E,"linkedin","https://www.linkedin.com/favicon.ico"),De=l(E,"pinterest","https://www.pinterest.com/favicon.ico"),Be=l(E,"soundcloud","https://soundcloud.com/favicon.ico"),Ge=l(E,"spotify","https://www.spotify.com/favicon.ico"),ze=l(E,"twitter","https://www.twitter.com/favicon.ico"),N=r(function(r,e,n){return l(F,v([y(e),l(C,"text-decoration","none"),T("_blank"),l(C,"margin-right","10px"),l(j,"aria-label",n),x("inline-block")]),v([r]))}),Re=l(E,"vimeo","https://vimeo.com/favicon.ico"),qe=l(E,"youtube","https://www.youtube.com/favicon.ico"),E=l(_,d,v([l(o,v([x("text-left"),x("leading-10"),x("mb-7")]),v([A("Hail Mary Prayer Animation Wins Multiple Awards in International Hollywood Film Festival")])),l(c,d,v([l(a,d,v([A("Catholic Stories for Children's animation, ")])),l(F,v([y("https://youtu.be/HW0DzGEoa1Y"),l(C,"color","#445C73"),S("noopener"),T("_blank")]),v([A("Hail Mary, Full of Grace,")])),l(a,d,v([A(" wins multiple awards in the iHollywood Film Festival.")]))])),l(Se,v([Gr("https://ik.imagekit.io/catholicstories/Mother_and_child_from_Hail_Mary_Animation_2_0AW0fCnOc.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663026862327"),l(j,"ariaHidden","true"),He("Mother and child from the Hail Mary Animation"),l(C,"width","50%"),l(C,"position","relative"),l(C,"left","50%"),l(C,"transform","translate(-50%)"),l(C,"margin","auto")]),d),l(c,d,v([A("Oct 3, 2022")])),l(i,d,d),l(c,d,v([l(a,v([l(C,"font-weight","bold")]),v([A("Los Angeles, California. ")])),l(a,d,v([A('Today, Catholic Stories for Children, a new non-profit that creates Catholic animations for children, announced that they won multiple awards in the International Hollywood Film Festival (IHFF). "I am really grateful to be able to spread the love of our Blessed Virgin Mother Mary. I appreciate the iHollywood Team for considering this animation and selecting it for these awards," said Trevor Rothaus, founder of Catholic Stories for Children.  The Hail Mary animation was selected for the 5 Star Positive Consciousness Award, the 5 Star Expression Award,  the 5 Star Connection Award, and the 5 Star Love &  Beauty Award. It was also the I AM Award Winner and the Semi-Finalist Mini Movie Animation. The Hail Mary Animation was screened at the TCL Chinese 6 Theatres in Hollywood on September 6.')]))])),l(i,d,d),l(c,d,v([l(F,v([y("https://youtu.be/HW0DzGEoa1Y"),l(C,"color","#445C73"),S("noopener"),T("_blank")]),v([A("The Hail Mary animated short film")])),l(a,d,v([A(" is a way for children to not only learn, but also understand the words in the Hail Mary prayer. It helps children come to know their Holy Mother in Heaven. This prayer is a constant reminder for children that they have a mother who is always listening and will always love them. It is a reminder that they can go to her for help. “Not only is it fun to watch and participate, but it's also a true learning experience to bring our faith to every child,” says John Michael, a member of the Board of Directors of the International Hollywood Film Festival.")]))])),l(i,d,d),l(c,d,v([A("IHFF merges film, creatives, and web 3.0 technologies as to empower the independent filmmaker. IHFF is a proud member of the Hollywood Chamber of Commerce and is a member of their Entertainment, Arts and Media plus Tourism committees.")])),l(i,d,d),l(c,d,v([l(a,d,v([A("Catholic Stories for Children is a non-profit organization that exists to help Catholic parents pass on the faith with prayer tips and fun animations for children. Catholic Stories for Children aims to help children grow a habit of prayer. As children build a habit of thanking God in the morning, before every meal, and throughout their day, they grow in gratitude. As children pray for each other, they grow in empathy and love. As children pray together, they grow in community. And when children pray at home with their families, their hearts open up and the family grows strong with God as their center. Many parents struggle with getting their young children to pray, so Catholic Stories for Children creates animations as an aid for families. These animations can be found on their website, ")])),l(F,v([y("https://catholicstoriesforchildren.com"),l(C,"color","#445C73"),S("noopener"),T("_blank")]),v([A("www.catholicstoriesforchildren.com")])),l(a,d,v([A(".")]))])),l(i,d,d),l(c,v([l(C,"font-size","0.7em"),l(C,"line-height","1.4em")]),v([l(a,d,v([A("Media Contacts:")])),l(i,d,d),l(a,d,v([A("Catholic Stories for Children")])),l(i,d,d),l(a,d,v([A("Trevor Rothaus | Founder")])),l(i,d,d),l(a,d,v([pr])),l(i,d,d),l(F,v([y("https://catholicstoriesforchildren.com"),l(C,"color","#445C73"),S("noopener"),T("_blank")]),v([A("www.catholicstoriesforchildren.com")])),l(i,d,d),zr({a:5,b:"https://www.facebook.com/catholicstoriesforchildren"}),zr({a:1,b:"https://www.instagram.com/catholicstoriesforchildren"}),l(i,d,d),l(i,d,d),l(a,d,v([A("iHollywood Film Fest")])),l(i,d,d),l(a,d,v([A("Joyce Chow | iHollywood Founder & Festival Director")])),l(i,d,d),l(a,d,v([A("ihollywoodfilmfest@gmail.com")])),l(i,d,d),l(F,v([y("https://ihollywoodfilmfest.com"),l(C,"color","#445C73"),S("noopener"),T("_blank")]),v([A("www.ihollywoodfilmfest.com")])),l(i,d,d),zr({a:2,b:"https://twitter.com/ihollywoodfilm"})]))])),o=l(F,v([y("https://signup.catholicstoriesforchildren.com"),S("noopener"),T("_blank"),l(C,"text-decoration","none"),l(C,"padding","10px 20px"),l(C,"display","inline-block"),l(C,"border-radius","5px"),l(C,"box-shadow","#777 1px 1px 5px"),l(C,"color","white"),l(C,"background-color","#9200B3")]),v([A("Sign Up")])),pr=l(_,d,v([l(c,v([x("pb-5")]),v([A("Want tips, resources, and Catholic animations? We are giving away our prayer printable to those who sign up today!")])),o])),S=l(_,v([x("w-3/4"),x("max-w-3xl"),x("m-auto")]),v([l(je,v([x("text-left"),l(C,"color","#395D73"),x("my-10")]),v([A("Latest News")])),l(_,v([x("mb-10")]),v([pr])),(i=v([E]),l(_,v([l(C,"background-color","white"),l(C,"border-radius","5px"),l(C,"padding","20px 40px"),l(C,"margin","auto"),l(C,"margin-bottom","2em")]),l(ge,Rr,i)))])),o=l(f("footer"),v([l(C,"padding",n(30)+"px"),l(C,"background-color","black"),l(C,"color","white"),l(C,"transform-style","preserve-3d")]),v([l(_,v([x("flex items-center gap-2.5")]),v([l(a,d,v([A("Follow us on")])),l(F,v([y("https://www.facebook.com/catholicstoriesforchildren"),l(j,"aria-label","CSC Facebook Page"),T("_blank")]),v([l(Se,v([x("w-10 h-10"),Gr("https://ik.imagekit.io/catholicstories/f_logo_RGB-Blue_250_3vs-yhXer.png?updatedAt=1684277030198"),He("Facebook")]),d)])),l(F,v([y("https://www.instagram.com/catholicstoriesforchildren/"),l(j,"aria-label","CSC Instagram Page"),T("_blank")]),v([l(Se,v([x("w-10 h-10"),Gr("https://ik.imagekit.io/catholicstories/Instagram_Glyph_Gradient_kFoMs9jIr.png?updatedAt=1684277127293"),He("Instagram")]),d)]))])),l(c,d,v([A("Copyright © 2023 Catholic Stories for Children. All rights reserved.")])),l(c,d,v([A("Catholic Stories for Children is a 501(c)(3) non-profit recognized by the IRS. Contributions to Catholic Stories for Children are tax-deductible to the extent permitted by law.  Tax ID Number: 85-4194883")]))])),Pe=f("header"),We=f("nav"),I=B(function(r,e,n,t){return l(F,v([y(e),x("flex items-center justify-center"),x("hover:bg-csc-lightpurple"),x("hover:border-b-2 hover:border-gray-700"),x("rounded-t"),x("text-lg"),x("h-[60px] h-["+r+"]"),x("w-full"),l(j,"aria-label",t),T(n)]),v([A(t)]))}),Oe=l(F,v([y("/navigation"),x("space-y-2"),l(j,"aria-label","menu")]),v([l(_,v([x("w-8 h-0.5 m-auto bg-gray-600")]),d),l(_,v([x("w-8 h-0.5 m-auto bg-gray-600")]),d),l(_,v([x("w-8 h-0.5 m-auto bg-gray-600")]),d)])),pr=l(Se,v([Gr("/assets/logo_solid.svg"),l(C,"height","30px"),He(""),l(C,"vertical-align","middle")]),d),Xe=l(F,v([l(C,"text-decoration","none"),x("colorDarkGray"),y("/"),l(j,"aria-label","home")]),v([pr])),E=e(function(r,e){var r="Catholic Stories for Children"===r?{a:"111px",b:qr,c:"grid-cols-[150px_1fr_150px] lg:grid-cols-[150px_1fr_600px]"}:{a:"60px",b:qr,c:"grid-cols-[150px_1fr_150px] lg:grid-cols-[150px_1fr_600px]"},n=r.a,t=r.b,r=r.c;return l(Pe,v([l(C,"background-color","#3d5d75"),l(C,"background-image","linear-gradient(130deg, #9DE2EB , #EBD6F1)"),x("h-[60px] md:h-["+n+"]"),x("colorDarkGray"),x("grid items-center justify-items-center"),x(r)]),v([Xe,l(F,v([l(C,"text-decoration","none"),x("colorDarkGray"),x("invisible md:visible"),x("justify-self-start"),y("/")]),v([l(je,v([l(C,"font-family","hvdComicSerifPro"),l(C,"margin","0px"),x("text-[0px] md:text-2xl")]),v([A("Catholic Stories for Children")]))])),t(n)]))}),Je=l(_,v([l(C,"background-color","#FEF7F4")]),v([l(E,"Newsroom",10),S,o])),i=(Pr={aF:{},aX:function(r){return function(r){return r}},aZ:function(r){return Je}},Lr({aF:function(r){return{a:Pr.aF,b:Ce}},aU:function(r){return xe},aX:e(function(r,e){return{a:l(Pr.aX,r,e),b:Ce}}),aZ:Pr.aZ}));n={Newsroom:{Main:{init:i(W(0))(0)}}},L.Elm?function r(e,n){for(var t in n)t in e?"init"==t?P(6):r(e[t],n[t]):e[t]=n[t]}(L.Elm,n):L.Elm=n}(this);