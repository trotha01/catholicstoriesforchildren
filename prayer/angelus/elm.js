!function(B){"use strict";function R(r,n,e){return e.a=r,e.f=n,e}function n(e){return R(2,e,function(n){return function(r){return e(n,r)}})}function r(t){return R(3,t,function(e){return function(n){return function(r){return t(e,n,r)}}})}function G(a){return R(4,a,function(t){return function(e){return function(n){return function(r){return a(t,e,n,r)}}}})}function I(o){return R(5,o,function(a){return function(t){return function(e){return function(n){return function(r){return o(a,t,e,n,r)}}}}})}function l(r,n,e){return 2===r.a?r.f(n,e):r(n)(e)}function s(r,n,e,t){return 3===r.a?r.f(n,e,t):r(n)(e)(t)}function h(r,n,e,t,a){return 4===r.a?r.f(n,e,t,a):r(n)(e)(t)(a)}function q(r,n,e,t,a,o){return 5===r.a?r.f(n,e,t,a,o):r(n)(e)(t)(a)(o)}function t(r,n,e){if("object"!=typeof r)return r===n?0:r<n?-1:1;if(void 0===r.$)return(e=(e=t(r.a,n.a))||t(r.b,n.b))||t(r.c,n.c);for(;r.b&&n.b&&!(e=t(r.a,n.a));r=r.b,n=n.b);return e||(r.b?1:n.b?-1:0)}var D=0;var d={$:0};function z(r,n){return{$:1,a:r,b:n}}var O=n(z);function v(r){for(var n=d,e=r.length;e--;)n={$:1,a:r[e],b:n};return n}var e=r(function(r,n,e){for(var t=Array(r),a=0;a<r;a++)t[a]=e(n+a);return t}),a=n(function(r,n){for(var e=Array(r),t=0;t<r&&n.b;t++)e[t]=n.a,n=n.b;return e.length=t,{a:e,b:n}});function H(r){throw Error("https://github.com/elm/core/blob/1.0.0/hints/"+r+".md")}var o=Math.ceil,i=Math.floor,X=Math.log;var J=n(b);function b(r,n){switch(r.$){case 2:return r.b(n);case 5:return null===n?_(r.c):g("null",n);case 3:return W(n)?V(r.b,n,v):g("a LIST",n);case 4:return W(n)?V(r.b,n,Z):g("an ARRAY",n);case 6:var e=r.d;return"object"==typeof n&&null!==n&&e in n?(o=b(r.b,n[e]),A(o)?o:$(l(zr,e,o.a))):g("an OBJECT with a field named `"+e+"`",n);case 7:e=r.e;return W(n)?e<n.length?(o=b(r.b,n[e]),A(o)?o:$(l(Or,e,o.a))):g("a LONGER array. Need index "+e+" but only see "+n.length+" entries",n):g("an ARRAY",n);case 8:if("object"!=typeof n||null===n||W(n))return g("an OBJECT",n);var t,a=d;for(t in n)if(n.hasOwnProperty(t)){var o=b(r.b,n[t]);if(!A(o))return $(l(zr,t,o.a));a={$:1,a:{a:t,b:o.a},b:a}}return _(k(a));case 9:for(var i=r.f,u=r.g,f=0;f<u.length;f++){o=b(u[f],n);if(!A(o))return o;i=i(o.a)}return _(i);case 10:o=b(r.b,n);return A(o)?b(r.h(o.a),n):o;case 11:for(var c=d,s=r.g;s.b;s=s.b){o=b(s.a,n);if(A(o))return o;c={$:1,a:o.a,b:c}}return $(Hr(k(c)));case 1:return $(l(Dr,r.a,n));case 0:return _(r.a)}}function V(r,n,e){for(var t=n.length,a=Array(t),o=0;o<t;o++){var i=b(r,n[o]);if(!A(i))return $(l(Or,o,i.a));a[o]=i.a}return _(e(a))}function W(r){return Array.isArray(r)||"undefined"!=typeof FileList&&r instanceof FileList}function Z(n){return l(cn,n.length,function(r){return n[r]})}function g(r,n){return $(l(Dr,"Expecting "+r,n))}function f(r,n){if(r===n)return!0;if(r.$!==n.$)return!1;switch(r.$){case 0:case 1:return r.a===n.a;case 2:return r.b===n.b;case 5:return r.c===n.c;case 3:case 4:case 8:return f(r.b,n.b);case 6:return r.d===n.d&&f(r.b,n.b);case 7:return r.e===n.e&&f(r.b,n.b);case 9:return r.f===n.f&&U(r.g,n.g);case 10:return r.h===n.h&&f(r.b,n.b);case 11:return U(r.g,n.g)}}function U(r,n){var e=r.length;if(e!==n.length)return!1;for(var t=0;t<e;t++)if(!f(r[t],n[t]))return!1;return!0}function Y(r){return r}function K(r){return{$:0,a:r}}var Q=n(function(r,n){return{$:3,b:r,d:n}});var rr=0;function nr(r){r={$:0,e:rr++,f:r,g:null,h:[]};return ir(r),r}function er(n){return{$:2,b:function(r){r({$:0,a:nr(n)})},c:null}}function tr(r,n){r.h.push(n),ir(r)}var ar=!1,or=[];function ir(r){if(or.push(r),!ar){for(ar=!0;r=or.shift();)!function(n){for(;n.f;){var r=n.f.$;if(0===r||1===r){for(;n.g&&n.g.$!==r;)n.g=n.g.i;if(!n.g)return;n.f=n.g.b(n.f.a),n.g=n.g.i}else{if(2===r)return n.f.c=n.f.b(function(r){n.f=r,ir(n)});if(5===r){if(0===n.h.length)return;n.f=n.f.b(n.h.shift())}else n.g={$:3===r?0:1,b:n.f.b,i:n.g},n.f=n.f.d}}}(r);ar=!1}}function ur(r,n,e,t,a,o){var r=l(J,r,n?n.flags:void 0),i=(A(r)||H(2),{}),n=e(r.a),u=n.a,f=o(c,u),e=function(r,n){var e,t;for(t in m){var a=m[t];a.a&&((e=e||{})[t]=a.a(t,n)),r[t]=function(r,n){var t={g:n,h:void 0},a=r.c,o=r.d,i=r.e,u=r.f;function f(e){return l(Q,f,{$:5,b:function(r){var n=r.a;return 0===r.$?s(o,t,n,e):i&&u?h(a,t,n.i,n.j,e):s(a,t,i?n.i:n.j,e)}})}return t.h=nr(l(Q,f,r.b))}(a,n)}return e}(i,c);function c(r,n){r=l(t,r,u);f(u=r.a,n),hr(i,r.b,a(u))}return hr(i,n.b,a(u)),e?{ports:e}:{}}var m={};var u=n(function(n,e){return{$:2,b:function(r){n.g(e),r({$:0,a:D})},c:null}});function fr(n){return function(r){return{$:1,k:n,l:r}}}function cr(r){return{$:2,m:r}}var sr=[],lr=!1;function hr(r,n,e){if(sr.push({p:r,q:n,r:e}),!lr){lr=!0;for(var t;t=sr.shift();)!function(r,n,e){var t,a={};for(t in dr(!0,n,a,null),dr(!1,e,a,null),r)tr(r[t],{$:"fx",a:a[t]||{i:d,j:d}})}(t.p,t.q,t.r);lr=!1}}function dr(r,n,e,t){switch(n.$){case 1:var a=n.k,o=function(r,n,e,t){function a(r){for(var n=e;n;n=n.t)r=n.s(r);return r}return l(r?m[n].e:m[n].f,a,t)}(r,a,t,n.l);return void(e[a]=function(r,n,e){return e=e||{i:d,j:d},r?e.i={$:1,a:n,b:e.i}:e.j={$:1,a:n,b:e.j},e}(r,o,e[a]));case 2:for(var i=n.m;i.b;i=i.b)dr(r,i.a,e,t);return;case 3:dr(r,n.o,e,{s:n.n,t:t})}}var vr;var br="undefined"!=typeof document?document:{};function gr(r){return{$:0,a:r}}var c=n(function(o,i){return n(function(r,n){for(var e=[],t=0;n.b;n=n.b){var a=n.a;t+=a.b||0,e.push(a)}return t+=e.length,{$:1,c:i,d:_r(r),e:e,f:o,b:t}})})(void 0);n(function(o,i){return n(function(r,n){for(var e=[],t=0;n.b;n=n.b){var a=n.a;t+=a.b.b||0,e.push(a)}return t+=e.length,{$:2,c:i,d:_r(r),e:e,f:o,b:t}})})(void 0);var mr=n(function(r,n){return{$:"a1",n:r,o:n}}),pr=n(function(r,n){return{$:"a2",n:r,o:n}}),yr=n(function(r,n){return{$:"a3",n:r,o:n}});function wr(r){return/^\s*(javascript:|data:text\/html)/i.test(r)?"":r}var $r;function _r(r){for(var n={};r.b;r=r.b){var e,t=r.a,a=t.$,o=t.n,t=t.o;"a2"===a?"className"===o?kr(n,o,t):n[o]=t:(e=n[a]||(n[a]={}),"a3"===a&&"class"===o?kr(e,o,t):e[o]=t)}return n}function kr(r,n,e){var t=r[n];r[n]=t?t+" "+e:e}function p(r,n){var e=r.$;if(5===e)return p(r.k||(r.k=r.m()),n);if(0===e)return br.createTextNode(r.a);if(4===e){for(var t=r.k,a=r.j;4===t.$;)"object"!=typeof a?a=[a,t.j]:a.push(t.j),t=t.k;var o={j:a,p:n};(i=p(t,o)).elm_event_node_ref=o}else if(3===e)Ar(i=r.h(r.g),n,r.d);else{var i=r.f?br.createElementNS(r.f,r.c):br.createElement(r.c);vr&&"a"==r.c&&i.addEventListener("click",vr(i)),Ar(i,n,r.d);for(var u=r.e,f=0;f<u.length;f++)i.appendChild(p(1===e?u[f]:u[f].b,n))}return i}function Ar(r,n,e){for(var t in e){var a=e[t];"a1"===t?function(r,n){var e,t=r.style;for(e in n)t[e]=n[e]}(r,a):"a0"===t?function(r,n,e){var t,a=r.elmFs||(r.elmFs={});for(t in e){var o=e[t],i=a[t];if(o){if(i){if(i.q.$===o.$){i.q=o;continue}r.removeEventListener(t,i)}i=function(f,r){function c(r){var n=c.q,e=b(n.a,r);if(A(e)){for(var t,n=sn(n),e=e.a,a=n?n<3?e.a:e.r:e,o=1==n?e.b:3==n&&e.N,i=(o&&r.stopPropagation(),(2==n?e.b:3==n&&e.K)&&r.preventDefault(),f);t=i.j;){if("function"==typeof t)a=t(a);else for(var u=t.length;u--;)a=t[u](a);i=i.p}i(a,o)}}return c.q=r,c}(n,o),r.addEventListener(t,i,$r&&{passive:sn(o)<2}),a[t]=i}else r.removeEventListener(t,i),a[t]=void 0}}(r,n,a):"a3"===t?function(r,n){for(var e in n){var t=n[e];void 0!==t?r.setAttribute(e,t):r.removeAttribute(e)}}(r,a):"a4"===t?function(r,n){for(var e in n){var t=n[e],a=t.f,t=t.o;void 0!==t?r.setAttributeNS(a,e,t):r.removeAttributeNS(a,e)}}(r,a):("value"!==t&&"checked"!==t||r[t]!==a)&&(r[t]=a)}}try{window.addEventListener("t",null,Object.defineProperty({},"passive",{get:function(){$r=!0}}))}catch(r){}function xr(r,n){var e=[];return F(r,n,e,0),e}function E(r,n,e,t){n={$:n,r:e,s:t,t:void 0,u:void 0};return r.push(n),n}function F(r,n,e,t){if(r!==n){var a=r.$,o=n.$;if(a!==o){if(1!==a||2!==o)return void E(e,0,t,n);n=function(r){for(var n=r.e,e=n.length,t=Array(e),a=0;a<e;a++)t[a]=n[a].b;return{$:1,c:r.c,d:r.d,e:t,f:r.f,b:r.b}}(n),o=1}switch(o){case 5:for(var i=r.l,u=n.l,f=i.length,c=f===u.length;c&&f--;)c=i[f]===u[f];if(c)return void(n.k=r.k);n.k=n.m();var s=[];return F(r.k,n.k,s,0),void(0<s.length&&E(e,1,t,s));case 4:for(var l=r.j,h=n.j,d=!1,v=r.k;4===v.$;)d=!0,"object"!=typeof l?l=[l,v.j]:l.push(v.j),v=v.k;for(var b=n.k;4===b.$;)d=!0,"object"!=typeof h?h=[h,b.j]:h.push(b.j),b=b.k;return d&&l.length!==h.length?void E(e,0,t,n):((d?function(r,n){for(var e=0;e<r.length;e++)if(r[e]!==n[e])return;return 1}(l,h):l===h)||E(e,2,t,h),void F(v,b,e,t+1));case 0:return void(r.a!==n.a&&E(e,3,t,n.a));case 1:return void Cr(r,n,e,t,Sr);case 2:return void Cr(r,n,e,t,Er);case 3:if(r.h!==n.h)return void E(e,0,t,n);s=jr(r.d,n.d),s=(s&&E(e,4,t,s),n.i(r.g,n.g));s&&E(e,5,t,s)}}}function Cr(r,n,e,t,a){var o;r.c!==n.c||r.f!==n.f?E(e,0,t,n):((o=jr(r.d,n.d))&&E(e,4,t,o),a(r,n,e,t))}function jr(r,n,e){var t,a,o,i,u;for(a in r)"a1"===a||"a0"===a||"a3"===a||"a4"===a?(o=jr(r[a],n[a]||{},a))&&((t=t||{})[a]=o):a in n?(o=r[a])===(i=n[a])&&"value"!==a&&"checked"!==a||"a0"===e&&function(r,n){return r.$==n.$&&f(r.a,n.a)}(o,i)||((t=t||{})[a]=i):(t=t||{})[a]=e?"a1"===e?"":"a0"===e||"a3"===e?void 0:{f:r[a].f,o:void 0}:"string"==typeof r[a]?"":null;for(u in n)u in r||((t=t||{})[u]=n[u]);return t}function Sr(r,n,e,t){var a=r.e,o=n.e,r=a.length,n=o.length;n<r?E(e,6,t,{v:n,i:r-n}):r<n&&E(e,7,t,{v:r,e:o});for(var i=r<n?r:n,u=0;u<i;u++){var f=a[u];F(f,o[u],e,++t),t+=f.b||0}}function Er(r,n,e,t){for(var a=[],o={},i=[],u=r.e,f=n.e,c=u.length,s=f.length,l=0,h=0,d=t;l<c&&h<s;){var v=u[l],b=f[h],g=v.a,m=b.a,p=v.b,y=b.b,w=void 0,$=void 0;if(g===m)F(p,y,a,++d),d+=p.b||0,l++,h++;else{var _,k,A,x,C=u[l+1],j=f[h+1];if(C&&(k=C.b,$=m===(_=C.a)),j&&(x=j.b,w=g===(A=j.a)),w&&$)F(p,x,a,++d),L(o,a,g,y,h,i),d+=p.b||0,N(o,a,g,k,++d),d+=k.b||0,l+=2,h+=2;else if(w)d++,L(o,a,m,y,h,i),F(p,x,a,d),d+=p.b||0,l+=1,h+=2;else if($)N(o,a,g,p,++d),d+=p.b||0,F(k,y,a,++d),d+=k.b||0,l+=2,h+=1;else{if(!C||_!==A)break;N(o,a,g,p,++d),L(o,a,m,y,h,i),d+=p.b||0,F(k,x,a,++d),d+=k.b||0,l+=2,h+=2}}}for(;l<c;){p=(v=u[l]).b;N(o,a,v.a,p,++d),d+=p.b||0,l++}for(;h<s;){var S=S||[];L(o,a,(b=f[h]).a,b.b,void 0,S),h++}(0<a.length||0<i.length||S)&&E(e,8,t,{w:a,x:i,y:S})}var Fr="_elmW6BL";function L(r,n,e,t,a,o){var i,u=r[e];u?1===u.c?(o.push({r:a,A:u}),u.c=2,F(u.z,t,i=[],u.r),u.r=a,u.s.s={w:i,A:u}):L(r,n,e+Fr,t,a,o):(o.push({r:a,A:u={c:0,z:t,r:a,s:void 0}}),r[e]=u)}function N(r,n,e,t,a){var o,i=r[e];i?0===i.c?(i.c=2,F(t,i.z,o=[],a),E(n,9,a,{w:o,A:i})):N(r,n,e+Fr,t,a):(o=E(n,9,a,void 0),r[e]={c:1,z:t,r:a,s:o})}function Lr(r,n,e,t){!function r(n,e,t,a,o,i,u){var f=t[a];var c=f.r;for(;c===o;){var s,l=f.$;if(1===l?Lr(n,e.k,f.s,u):8===l?(f.t=n,f.u=u,0<(s=f.s.w).length&&r(n,e,s,0,o,i,u)):9===l?(f.t=n,f.u=u,(l=f.s)&&(l.A.s=n,0<(s=l.w).length)&&r(n,e,s,0,o,i,u)):(f.t=n,f.u=u),!(f=t[++a])||(c=f.r)>i)return a}var h=e.$;if(4===h){for(var d=e.k;4===d.$;)d=d.k;return r(n,d,t,a,o+1,i,n.elm_event_node_ref)}var v=e.e;var b=n.childNodes;for(var g=0;g<v.length;g++){var m=1===h?v[g]:v[g].b,p=++o+(m.b||0);if(o<=c&&c<=p&&(a=r(b[g],m,t,a,o,p,u),!(f=t[a])||(c=f.r)>i))return a;o=p}return a}(r,n,e,0,0,n.b,t)}function Nr(r,n,e,t){return 0===e.length?r:(Lr(r,n,e,t),Tr(r,e))}function Tr(r,n){for(var e=0;e<n.length;e++){var t=n[e],a=t.t,t=function(r,n){switch(n.$){case 0:return function(r,n,e){var t=r.parentNode,n=p(n,e);n.elm_event_node_ref||(n.elm_event_node_ref=r.elm_event_node_ref);t&&n!==r&&t.replaceChild(n,r);return n}(r,n.s,n.u);case 4:return Ar(r,n.u,n.s),r;case 3:return r.replaceData(0,r.length,n.s),r;case 1:return Tr(r,n.s);case 2:return r.elm_event_node_ref?r.elm_event_node_ref.j=n.s:r.elm_event_node_ref={j:n.s,p:n.u},r;case 6:for(var e=n.s,t=0;t<e.i;t++)r.removeChild(r.childNodes[e.v]);return r;case 7:for(var a=(e=n.s).e,t=e.v,o=r.childNodes[t];t<a.length;t++)r.insertBefore(p(a[t],n.u),o);return r;case 9:var i;return(e=n.s)?(void 0!==(i=e.A).r&&r.parentNode.removeChild(r),i.s=Tr(r,e.w)):r.parentNode.removeChild(r),r;case 8:return function(r,n){for(var e=n.s,t=function(r,n){if(r){for(var e=br.createDocumentFragment(),t=0;t<r.length;t++){var a=r[t].A;e.appendChild(2===a.c?a.s:p(a.z,n.u))}return e}}(e.y,n),a=(r=Tr(r,e.w),e.x),o=0;o<a.length;o++){var i=a[o],u=i.A,u=2===u.c?u.s:p(u.z,n.u);r.insertBefore(u,r.childNodes[i.r])}t&&r.appendChild(t);return r}(r,n);case 5:return n.s(r);default:H(10)}}(a,t);a===r&&(r=t)}return r}function Mr(r){if(3===r.nodeType)return{$:0,a:r.textContent};if(1!==r.nodeType)return{$:0,a:""};for(var n=d,e=r.attributes,t=e.length;t--;)var a=e[t],n={$:1,a:l(yr,a.name,a.value),b:n};for(var o=r.tagName.toLowerCase(),i=d,u=r.childNodes,t=u.length;t--;)i={$:1,a:Mr(u[t]),b:i};return s(c,o,n,i)}var Pr=G(function(n,r,e,i){return ur(r,i,n.aF,n.aX,n.aU,function(e,r){var t=n.aZ,a=i.node,o=Mr(a);return Rr(r,function(r){var r=t(r),n=xr(o,r);a=Nr(a,o,n,e),o=r})})}),Br="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:function(r){return setTimeout(r,1e3/60)};function Rr(e,t){t(e);var a=0;function o(){a=1===a?0:(Br(o),t(e),1)}return function(r,n){e=r,n?(t(e),2===a&&(a=1)):(0===a&&Br(o),a=2)}}function y(r){return l(C,"href",/^javascript:/i.test((r=r).replace(/\s/g,""))?"":r)}function Gr(r){return l(C,"src",wr(r))}function Ir(r){return l(x,v([j("w-full pr-2")]),v([l(x,v([j("lg:hidden")]),v([Ln])),l(x,v([j("hidden lg:block w-full")]),v([function(r){return l(Fn,v([j("h-full w-full flex justify-end content-center justify-items-center gap-4 mr-4"),j("text-base")]),v([h(P,r,"/feastdayactivities","_self","Activities"),h(P,r,"/saints","_self","Saints"),h(P,r,"/animations","_self","Animations"),h(P,r,"/resources","_self","Resources"),h(P,r,"https://www.etsy.com/shop/CatholicStories","_blank","Shop"),h(P,r,"/give","_self","Give"),h(P,r,"/team","_self","About")]))}(r)]))]))}var qr,w=O,$=function(r){return{$:1,a:r}},Dr=n(function(r,n){return{$:3,a:r,b:n}}),zr=n(function(r,n){return{$:0,a:r,b:n}}),Or=n(function(r,n){return{$:1,a:r,b:n}}),_=function(r){return{$:0,a:r}},Hr=function(r){return{$:2,a:r}},Xr=function(r){return r+""},Jr=r(function(r,n,e){for(;;){if(!e.b)return n;var t=e.b,a=r,o=l(r,e.a,n);r=a,n=o,e=t}}),k=function(r){return s(Jr,w,d,r)},Vr=G(function(r,n,e,t){return{$:0,a:r,b:n,c:e,d:t}}),Wr=[],Zr=o,Ur=n(function(r,n){return X(n)/X(r)}),Yr=Zr(l(Ur,2,32)),Kr=h(Vr,0,Yr,Wr,Wr),Qr=e,rn=i,nn=function(r){return r.length},en=n(function(r,n){return 0<t(r,n)?r:n}),tn=a,an=n(function(r,n){for(;;){var e=l(tn,32,r),t=e.b,e=l(w,{$:0,a:e.a},n);if(!t.b)return k(e);r=t,n=e}}),on=n(function(r,n){for(;;){var e=Zr(n/32);if(1===e)return l(tn,32,r).a;r=l(an,r,d),n=e}}),un=n(function(r,n){var e,t;return n.a?(t=rn(l(Ur,32,(e=32*n.a)-1)),r=r?k(n.d):n.d,r=l(on,r,n.a),h(Vr,nn(n.c)+e,l(en,5,t*Yr),r,n.c)):h(Vr,nn(n.c),Yr,Wr,n.c)}),fn=I(function(r,n,e,t,a){for(;;){if(n<0)return l(un,!1,{d:t,a:e/32|0,c:a});var o={$:1,a:s(Qr,32,n,r)};r=r,n=n-32,e=e,t=l(w,o,t),a=a}}),cn=n(function(r,n){var e;return 0<r?q(fn,n,r-(e=r%32)-32,r,d,s(Qr,e,r-e,n)):Kr}),A=function(r){return!r.$},O=function(r){return{$:0,a:r}},sn=function(r){switch(r.$){case 0:return 0;case 1:return 1;case 2:return 2;default:return 3}},ln=K,o=ln(0),hn=G(function(r,n,e,t){var a,o,i,u;return t.b?(a=t.a,(t=t.b).b?(o=t.a,(t=t.b).b?(i=t.a,(t=t.b).b?(u=t.b,l(r,a,l(r,o,l(r,i,l(r,t.a,500<e?s(Jr,r,n,k(u)):h(hn,r,n,e+1,u)))))):l(r,a,l(r,o,l(r,i,n)))):l(r,a,l(r,o,n))):l(r,a,n)):n}),dn=r(function(r,n,e){return h(hn,r,n,0,e)}),vn=n(function(e,r){return s(dn,n(function(r,n){return l(w,e(r),n)}),d,r)}),bn=Q,gn=n(function(n,r){return l(bn,function(r){return ln(n(r))},r)}),mn=r(function(e,r,t){return l(bn,function(n){return l(bn,function(r){return ln(l(e,n,r))},t)},r)}),pn=u,yn=n(function(r,n){return er(l(bn,pn(r),n))}),e=r(function(r,n,e){return l(gn,function(r){return 0},(r=l(vn,yn(r),n),s(dn,mn(w),ln(d),r)))}),wn=(m.Task={b:o,c:e,d:r(function(r,n,e){return ln(0)}),e:n(function(r,n){return l(gn,r,n)}),f:void 0},fr("Task"),cr(d)),$n=cr(d),x=c("div"),_n=Y,C=n(function(r,n){return l(pr,r,_n(n))}),j=C("className"),kn=c("h1"),S=gr,T=c("a"),i=c("h2"),An=C("target"),a=l(x,d,v([l(i,v([j("mb-4")]),v([S("What is the Angelus")])),S("The Angelus is a special prayer recited by Catholics three times a day, at 6am, noon, and 6pm, and is accompanied by the ringing of the Angelus bell. The name comes from the Latin word for Angel and the prayer itself reminds us of how Jesus Christ assumed our human nature through the Mystery of the Incarnation. The Pope recites the Angelus prayer in St Peter’s Square every Sunday at midday. It concludes with the recitation of the Gloria three times. Source: "),l(T,v([y(""),An("_blank"),j("underline")]),v([S("https://www.vaticannews.va/en/pope-francis/angelus.html")]))])),u=c("p"),o=l(x,d,v([l(i,v([j("mb-4")]),v([S("The Angelus Prayer")])),l(u,d,v([l(x,d,v([S("V. The Angel of the Lord declared unto Mary,")])),l(x,d,v([S("R. And she conceived of the Holy Spirit.")])),l(x,v([j("py-4")]),v([S("")])),l(x,d,v([S("Hail, Mary, full of grace,")])),l(x,d,v([S("the Lord is with thee.")])),l(x,d,v([S("Blessed art thou amongst women")])),l(x,d,v([S("and blessed is the fruit of thy womb, Jesus.")])),l(x,d,v([S("Holy Mary, Mother of God,")])),l(x,d,v([S("pray for us sinners,")])),l(x,d,v([S("now and at the hour of our death.")])),l(x,d,v([S("Amen.")])),l(x,v([j("py-4")]),v([S("")])),l(x,d,v([S("V. Behold the handmaid of the Lord,")])),l(x,d,v([S("R. Be it done unto me according to your Word.")])),l(x,v([j("py-4")]),v([S("")])),l(x,d,v([S("Hail, Mary...")])),l(x,v([j("py-4")]),v([S("")])),l(x,d,v([S("V. And the Word was made flesh,")])),l(x,d,v([S("R. and dwelt among us.")])),l(x,v([j("py-4")]),v([S("")])),l(x,d,v([S("Hail, Mary...")])),l(x,v([j("py-4")]),v([S("")])),l(x,d,v([S("V. Pray for us, O holy Mother of God,")])),l(x,d,v([S("R. That we may be made worthy of the promises of Christ.")])),l(x,v([j("py-4")]),v([S("")])),l(x,d,v([S("Let us pray:")])),l(x,d,v([S(" Pour forth, we beseech you, O Lord, your grace into our hearts:")])),l(x,d,v([S(" that we, to whom the Incarnation of Christ your Son was made known by the message of an Angel,")])),l(x,d,v([S(" may by his Passion and Cross be brought to the glory of his Resurrection.")])),l(x,d,v([S(" Through the same Christ our Lord.")])),l(x,d,v([S(" Amen")]))]))])),xn=c("iframe"),Cn=n(function(r,n){return l(pr,function(r){return"innerHTML"==r||"formAction"==r?"data-"+r:r}(r),wr(n))}),M=mr,jn=C("title"),e=l(n(function(r,n){return l(x,v([l(M,"position","relative"),l(M,"padding-bottom","56.25%"),l(yr,"height",Xr(0)),l(M,"overflow","hidden"),l(M,"max-width","100%"),l(M,"border-radius","5px")]),v([l(xn,v([l(M,"position","absolute"),l(M,"width","100%"),l(M,"height","100%"),l(M,"top","0"),l(M,"left","0"),Gr(n),jn(r),l(Cn,"frameborder",_n("0")),l(Cn,"allow",_n("accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture")),l(Cn,"allowfullscreen",_n("true"))]),d)]))}),"","https://www.youtube-nocookie.com/embed/-r6ChB56gr4"),i=l(x,v([j("max-w-3xl")]),v([l(x,v([j("mb-16")]),v([a])),l(x,v([j("mb-16")]),v([e])),l(x,d,v([o]))])),mr=l(x,v([j("bg-[#FEF7F4]"),j("p-10")]),v([l(kn,v([j("text-center"),j("my-10 leading-8")]),v([S("The Angelus")])),i])),a=C("alt"),Sn=n(function(r,n){return l(yr,function(r){return/^(on|formAction$)/i.test(r)?"data-"+r:r}(r),wr(n))}),e=c("footer"),o=c("img"),i=c("span"),e=l(e,v([l(M,"padding",Xr(30)+"px"),l(M,"background-color","black"),l(M,"color","white")]),v([l(x,v([j("flex items-center gap-2.5")]),v([l(i,d,v([S("Follow us on")])),l(T,v([y("https://www.facebook.com/catholicstoriesforchildren"),l(Sn,"aria-label","CSC Facebook Page"),An("_blank")]),v([l(o,v([j("w-10 h-10"),Gr("https://ik.imagekit.io/catholicstories/f_logo_RGB-Blue_250_3vs-yhXer.png?updatedAt=1684277030198"),a("Facebook")]),d)])),l(T,v([y("https://www.instagram.com/catholicstoriesforchildren/"),l(Sn,"aria-label","CSC Instagram Page"),An("_blank")]),v([l(o,v([j("w-10 h-10"),Gr("https://ik.imagekit.io/catholicstories/Instagram_Glyph_Gradient_kFoMs9jIr.png?updatedAt=1684277127293"),a("Instagram")]),d)]))])),l(u,d,v([S("Copyright © 2024 Catholic Stories for Children. All rights reserved.")])),l(u,d,v([S("Catholic Stories for Children is a 501(c)(3) non-profit recognized by the IRS. Contributions to Catholic Stories for Children are tax-deductible to the extent permitted by law.  Tax ID Number: 85-4194883")]))])),En=c("header"),Fn=c("nav"),P=G(function(r,n,e,t){return l(T,v([y(n),j("flex items-center justify-center"),j("hover:scale-105 transition ease-in-out"),j("hover:border-b-4 hover:border-[#9101b3]"),j("rounded"),j("h-[60px] h-["+r+"]"),j("p-2"),l(Sn,"aria-label",t),An(e)]),v([S(t)]))}),Ln=l(T,v([y("/navigation"),j("space-y-2"),l(Sn,"aria-label","menu")]),v([l(x,v([j("w-8 h-0.5 m-auto bg-gray-600")]),d),l(x,v([j("w-8 h-0.5 m-auto bg-gray-600")]),d),l(x,v([j("w-8 h-0.5 m-auto bg-gray-600")]),d)])),Nn=n(function(r,n){var r=r?{a:"text-[0px] md:text-xl",b:"invisible md:visible"}:{a:"text-lg md:text-xl",b:""},e=r.a,r=r.b;return l(T,v([l(M,"text-decoration","none"),j("colorDarkGray"),j(r),j("justify-self-start"),y("/")]),v([l(kn,v([l(M,"font-family","hvdComicSerifPro"),l(M,"margin","0px"),j(e)]),v([S("Catholic Stories for Children")]))]))}),i=l(o,v([Gr("/assets/logo_solid.svg"),l(M,"height","30px"),a(""),l(M,"vertical-align","middle")]),d),Tn=l(T,v([l(M,"text-decoration","none"),j("colorDarkGray"),y("/"),l(Sn,"aria-label","home")]),v([i])),u=n(function(r,n){var e="Catholic Stories for Children"===r?{a:"111px",b:Ir,c:"grid-cols-[150px_1fr_150px] lg:grid-cols-[150px_1fr_600px]"}:{a:"60px",b:Ir,c:"grid-cols-[150px_1fr_150px] lg:grid-cols-[150px_1fr_600px]"},t=e.a,a=e.b,e=e.c;return l(En,v([l(M,"background-color","#3d5d75"),l(M,"background-image","linear-gradient(130deg, #9DE2EB , #EBD6F1)"),j("h-[60px] md:h-["+t+"]"),j("colorDarkGray"),j("grid items-center justify-items-center"),j(e)]),v([Tn,l(Nn,!0,r),a(t)]))}),Mn=l(x,d,v([l(u,"Prayers",10),mr,e])),o=(qr={aF:{},aX:function(r){return function(r){return r}},aZ:function(r){return Mn}},Pr({aF:function(r){return{a:qr.aF,b:wn}},aU:function(r){return $n},aX:n(function(r,n){return{a:l(qr.aX,r,n),b:wn}}),aZ:qr.aZ}));a={Prayer:{Angelus:{Main:{init:o(O(0))(0)}}}},B.Elm?function r(n,e){for(var t in e)t in n?"init"==t?H(6):r(n[t],e[t]):n[t]=e[t]}(B.Elm,a):B.Elm=a}(this);