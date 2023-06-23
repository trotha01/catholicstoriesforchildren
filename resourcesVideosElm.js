!function(P){"use strict";function T(r,n,t){return t.a=r,t.f=n,t}function a(t){return T(2,t,function(n){return function(r){return t(n,r)}})}function r(e){return T(3,e,function(t){return function(n){return function(r){return e(t,n,r)}}})}function B(a){return T(4,a,function(e){return function(t){return function(n){return function(r){return a(e,t,n,r)}}}})}function D(i){return T(5,i,function(a){return function(e){return function(t){return function(n){return function(r){return i(a,e,t,n,r)}}}}})}function b(r,n,t){return 2===r.a?r.f(n,t):r(n)(t)}function s(r,n,t,e){return 3===r.a?r.f(n,t,e):r(n)(t)(e)}function l(r,n,t,e,a){return 4===r.a?r.f(n,t,e,a):r(n)(t)(e)(a)}function H(r,n,t,e,a,i){return 5===r.a?r.f(n,t,e,a,i):r(n)(t)(e)(a)(i)}function e(r,n,t){if("object"!=typeof r)return r===n?0:r<n?-1:1;if(void 0===r.$)return(t=(t=e(r.a,n.a))||e(r.b,n.b))||e(r.c,n.c);for(;r.b&&n.b&&!(t=e(r.a,n.a));r=r.b,n=n.b);return t||(r.b?1:n.b?-1:0)}var M=0;function d(r,n){var t,e={};for(t in r)e[t]=r[t];for(t in n)e[t]=n[t];return e}function i(r,n){if("string"==typeof r)return r+n;if(!r.b)return n;var t={$:1,a:r.a,b:n};r=r.b;for(var e=t;r.b;r=r.b)e=e.b={$:1,a:r.a,b:n};return t}var h={$:0};function R(r,n){return{$:1,a:r,b:n}}var z=a(R);function v(r){for(var n=h,t=r.length;t--;)n={$:1,a:r[t],b:n};return n}function G(r){for(var n=[];r.b;r=r.b)n.push(r.a);return n}var O=r(function(r,n,t){for(var e=Array(r),a=0;a<r;a++)e[a]=t(n+a);return e}),n=a(function(r,n){for(var t=Array(r),e=0;e<r&&n.b;e++)t[e]=n.a,n=n.b;return t.length=e,{a:t,b:n}});function q(r){throw Error("https://github.com/elm/core/blob/1.0.0/hints/"+r+".md")}var t=Math.ceil,o=Math.floor,W=Math.log;var V=a(function(r,n){return r+n});var X=r(function(r,n,t){for(var e=t.length,a=0;a<e;){var i=t[a],o=t.charCodeAt(a);a++,o<55296||56319<o||(i+=t[a],a++),n=b(r,i,n)}return n}),Y=a(function(r,n){return n.split(r)}),Z=a(function(r,n){return n.join(r)});var U=a(g);function g(r,n){switch(r.$){case 2:return r.b(n);case 5:return null===n?dn(r.c):p("null",n);case 3:return rr(n)?Q(r.b,n,v):p("a LIST",n);case 4:return rr(n)?Q(r.b,n,nr):p("an ARRAY",n);case 6:var t=r.d;return"object"==typeof n&&null!==n&&t in n?(i=g(r.b,n[t]),_(i)?i:k(b(ln,t,i.a))):p("an OBJECT with a field named `"+t+"`",n);case 7:t=r.e;return rr(n)?t<n.length?(i=g(r.b,n[t]),_(i)?i:k(b(bn,t,i.a))):p("a LONGER array. Need index "+t+" but only see "+n.length+" entries",n):p("an ARRAY",n);case 8:if("object"!=typeof n||null===n||rr(n))return p("an OBJECT",n);var e,a=h;for(e in n)if(n.hasOwnProperty(e)){var i=g(r.b,n[e]);if(!_(i))return k(b(ln,e,i.a));a={$:1,a:{a:e,b:i.a},b:a}}return dn($n(a));case 9:for(var o=r.f,u=r.g,c=0;c<u.length;c++){i=g(u[c],n);if(!_(i))return i;o=o(i.a)}return dn(o);case 10:i=g(r.b,n);return _(i)?g(r.h(i.a),n):i;case 11:for(var f=h,s=r.g;s.b;s=s.b){i=g(s.a,n);if(_(i))return i;f={$:1,a:i.a,b:f}}return k(hn($n(f)));case 1:return k(b(sn,r.a,n));case 0:return dn(r.a)}}function Q(r,n,t){for(var e=n.length,a=Array(e),i=0;i<e;i++){var o=g(r,n[i]);if(!_(o))return k(b(bn,i,o.a));a[i]=o.a}return dn(t(a))}function rr(r){return Array.isArray(r)||"undefined"!=typeof FileList&&r instanceof FileList}function nr(n){return b(Pn,n.length,function(r){return n[r]})}function p(r,n){return k(b(sn,"Expecting "+r,n))}function c(r,n){if(r===n)return!0;if(r.$!==n.$)return!1;switch(r.$){case 0:case 1:return r.a===n.a;case 2:return r.b===n.b;case 5:return r.c===n.c;case 3:case 4:case 8:return c(r.b,n.b);case 6:return r.d===n.d&&c(r.b,n.b);case 7:return r.e===n.e&&c(r.b,n.b);case 9:return r.f===n.f&&tr(r.g,n.g);case 10:return r.h===n.h&&c(r.b,n.b);case 11:return tr(r.g,n.g)}}function tr(r,n){var t=r.length;if(t!==n.length)return!1;for(var e=0;e<t;e++)if(!c(r[e],n[e]))return!1;return!0}var er=a(function(r,n){return JSON.stringify(n,null,r)+""});function ar(r){return r}function ir(r){return{$:0,a:r}}var or=a(function(r,n){return{$:3,b:r,d:n}});var ur=0;function cr(r){r={$:0,e:ur++,f:r,g:null,h:[]};return dr(r),r}function fr(n){return{$:2,b:function(r){r({$:0,a:cr(n)})},c:null}}function sr(r,n){r.h.push(n),dr(r)}var lr=!1,br=[];function dr(r){if(br.push(r),!lr){for(lr=!0;r=br.shift();)!function(n){for(;n.f;){var r=n.f.$;if(0===r||1===r){for(;n.g&&n.g.$!==r;)n.g=n.g.i;if(!n.g)return;n.f=n.g.b(n.f.a),n.g=n.g.i}else{if(2===r)return n.f.c=n.f.b(function(r){n.f=r,dr(n)});if(5===r){if(0===n.h.length)return;n.f=n.f.b(n.h.shift())}else n.g={$:3===r?0:1,b:n.f.b,i:n.g},n.f=n.f.d}}}(r);lr=!1}}function hr(r,n,t,e,a,i){var r=b(U,r,n?n.flags:void 0),o=(_(r)||q(2),{}),n=t(r.a),u=n.a,c=i(f,u),t=function(r,n){var t,e;for(e in m){var a=m[e];a.a&&((t=t||{})[e]=a.a(e,n)),r[e]=function(r,n){var e={g:n,h:void 0},a=r.c,i=r.d,o=r.e,u=r.f;function c(t){return b(or,c,{$:5,b:function(r){var n=r.a;return 0===r.$?s(i,e,n,t):o&&u?l(a,e,n.i,n.j,t):s(a,e,o?n.i:n.j,t)}})}return e.h=cr(b(or,c,r.b))}(a,n)}return t}(o,f);function f(r,n){r=b(e,r,u);c(u=r.a,n),wr(o,r.b,a(u))}return wr(o,n.b,a(u)),t?{ports:t}:{}}var m={};var u=a(function(n,t){return{$:2,b:function(r){n.g(t),r({$:0,a:M})},c:null}});function vr(n){return function(r){return{$:1,k:n,l:r}}}function gr(r){return{$:2,m:r}}var pr=[],mr=!1;function wr(r,n,t){if(pr.push({p:r,q:n,r:t}),!mr){mr=!0;for(var e;e=pr.shift();)!function(r,n,t){var e,a={};for(e in $r(!0,n,a,null),$r(!1,t,a,null),r)sr(r[e],{$:"fx",a:a[e]||{i:h,j:h}})}(e.p,e.q,e.r);mr=!1}}function $r(r,n,t,e){switch(n.$){case 1:var a=n.k,i=function(r,n,t,e){function a(r){for(var n=t;n;n=n.t)r=n.s(r);return r}return b(r?m[n].e:m[n].f,a,e)}(r,a,e,n.l);return void(t[a]=function(r,n,t){return t=t||{i:h,j:h},r?t.i={$:1,a:n,b:t.i}:t.j={$:1,a:n,b:t.j},t}(r,i,t[a]));case 2:for(var o=n.m;o.b;o=o.b)$r(r,o.a,t,e);return;case 3:$r(r,n.o,t,{s:n.n,t:e})}}var yr;var kr="undefined"!=typeof document?document:{};function _r(r){return{$:0,a:r}}var Cr=a(function(i,o){return a(function(r,n){for(var t=[],e=0;n.b;n=n.b){var a=n.a;e+=a.b||0,t.push(a)}return e+=t.length,{$:1,c:o,d:Jr(r),e:t,f:i,b:e}})})(void 0),xr=a(function(i,o){return a(function(r,n){for(var t=[],e=0;n.b;n=n.b){var a=n.a;e+=a.b.b||0,t.push(a)}return e+=t.length,{$:2,c:o,d:Jr(r),e:t,f:i,b:e}})})(void 0);var f=a(function(r,n){return{$:"a0",n:r,o:n}}),Ar=a(function(r,n){return{$:"a1",n:r,o:n}}),jr=a(function(r,n){return{$:"a2",n:r,o:n}}),Nr=a(function(r,n){return{$:"a3",n:r,o:n}});function Sr(r){return"script"==r?"p":r}function Er(r){return/^\s*(javascript:|data:text\/html)/i.test(r)?"":r}var Fr;function Jr(r){for(var n={};r.b;r=r.b){var t,e=r.a,a=e.$,i=e.n,e=e.o;"a2"===a?"className"===i?Lr(n,i,e):n[i]=e:(t=n[a]||(n[a]={}),"a3"===a&&"class"===i?Lr(t,i,e):t[i]=e)}return n}function Lr(r,n,t){var e=r[n];r[n]=e?e+" "+t:t}function w(r,n){var t=r.$;if(5===t)return w(r.k||(r.k=r.m()),n);if(0===t)return kr.createTextNode(r.a);if(4===t){for(var e=r.k,a=r.j;4===e.$;)"object"!=typeof a?a=[a,e.j]:a.push(e.j),e=e.k;var i={j:a,p:n};(o=w(e,i)).elm_event_node_ref=i}else if(3===t)Ir(o=r.h(r.g),n,r.d);else{var o=r.f?kr.createElementNS(r.f,r.c):kr.createElement(r.c);yr&&"a"==r.c&&o.addEventListener("click",yr(o)),Ir(o,n,r.d);for(var u=r.e,c=0;c<u.length;c++)o.appendChild(w(1===t?u[c]:u[c].b,n))}return o}function Ir(r,n,t){for(var e in t){var a=t[e];"a1"===e?function(r,n){var t,e=r.style;for(t in n)e[t]=n[t]}(r,a):"a0"===e?function(r,n,t){var e,a=r.elmFs||(r.elmFs={});for(e in t){var i=t[e],o=a[e];if(i){if(o){if(o.q.$===i.$){o.q=i;continue}r.removeEventListener(e,o)}o=function(c,r){function f(r){var n=f.q,t=g(n.a,r);if(_(t)){for(var e,n=Tn(n),t=t.a,a=n?n<3?t.a:t.r:t,i=1==n?t.b:3==n&&t.Q,o=(i&&r.stopPropagation(),(2==n?t.b:3==n&&t.N)&&r.preventDefault(),c);e=o.j;){if("function"==typeof e)a=e(a);else for(var u=e.length;u--;)a=e[u](a);o=o.p}o(a,i)}}return f.q=r,f}(n,i),r.addEventListener(e,o,Fr&&{passive:Tn(i)<2}),a[e]=o}else r.removeEventListener(e,o),a[e]=void 0}}(r,n,a):"a3"===e?function(r,n){for(var t in n){var e=n[t];void 0!==e?r.setAttribute(t,e):r.removeAttribute(t)}}(r,a):"a4"===e?function(r,n){for(var t in n){var e=n[t],a=e.f,e=e.o;void 0!==e?r.setAttributeNS(a,t,e):r.removeAttributeNS(a,t)}}(r,a):("value"!==e&&"checked"!==e||r[e]!==a)&&(r[e]=a)}}try{window.addEventListener("t",null,Object.defineProperty({},"passive",{get:function(){Fr=!0}}))}catch(r){}function Kr(r,n){var t=[];return E(r,n,t,0),t}function S(r,n,t,e){n={$:n,r:t,s:e,t:void 0,u:void 0};return r.push(n),n}function E(r,n,t,e){if(r!==n){var a=r.$,i=n.$;if(a!==i){if(1!==a||2!==i)return void S(t,0,e,n);n=function(r){for(var n=r.e,t=n.length,e=Array(t),a=0;a<t;a++)e[a]=n[a].b;return{$:1,c:r.c,d:r.d,e:e,f:r.f,b:r.b}}(n),i=1}switch(i){case 5:for(var o=r.l,u=n.l,c=o.length,f=c===u.length;f&&c--;)f=o[c]===u[c];if(f)return void(n.k=r.k);n.k=n.m();var s=[];return E(r.k,n.k,s,0),void(0<s.length&&S(t,1,e,s));case 4:for(var l=r.j,b=n.j,d=!1,h=r.k;4===h.$;)d=!0,"object"!=typeof l?l=[l,h.j]:l.push(h.j),h=h.k;for(var v=n.k;4===v.$;)d=!0,"object"!=typeof b?b=[b,v.j]:b.push(v.j),v=v.k;return d&&l.length!==b.length?void S(t,0,e,n):((d?function(r,n){for(var t=0;t<r.length;t++)if(r[t]!==n[t])return;return 1}(l,b):l===b)||S(t,2,e,b),void E(h,v,t,e+1));case 0:return void(r.a!==n.a&&S(t,3,e,n.a));case 1:return void Pr(r,n,t,e,Br);case 2:return void Pr(r,n,t,e,Dr);case 3:if(r.h!==n.h)return void S(t,0,e,n);s=Tr(r.d,n.d),s=(s&&S(t,4,e,s),n.i(r.g,n.g));s&&S(t,5,e,s)}}}function Pr(r,n,t,e,a){var i;r.c!==n.c||r.f!==n.f?S(t,0,e,n):((i=Tr(r.d,n.d))&&S(t,4,e,i),a(r,n,t,e))}function Tr(r,n,t){var e,a,i,o,u;for(a in r)"a1"===a||"a0"===a||"a3"===a||"a4"===a?(i=Tr(r[a],n[a]||{},a))&&((e=e||{})[a]=i):a in n?(i=r[a])===(o=n[a])&&"value"!==a&&"checked"!==a||"a0"===t&&function(r,n){return r.$==n.$&&c(r.a,n.a)}(i,o)||((e=e||{})[a]=o):(e=e||{})[a]=t?"a1"===t?"":"a0"===t||"a3"===t?void 0:{f:r[a].f,o:void 0}:"string"==typeof r[a]?"":null;for(u in n)u in r||((e=e||{})[u]=n[u]);return e}function Br(r,n,t,e){var a=r.e,i=n.e,r=a.length,n=i.length;n<r?S(t,6,e,{v:n,i:r-n}):r<n&&S(t,7,e,{v:r,e:i});for(var o=r<n?r:n,u=0;u<o;u++){var c=a[u];E(c,i[u],t,++e),e+=c.b||0}}function Dr(r,n,t,e){for(var a=[],i={},o=[],u=r.e,c=n.e,f=u.length,s=c.length,l=0,b=0,d=e;l<f&&b<s;){var h=u[l],v=c[b],g=h.a,p=v.a,m=h.b,w=v.b,$=void 0,y=void 0;if(g===p)E(m,w,a,++d),d+=m.b||0,l++,b++;else{var k,_,C,x,A=u[l+1],j=c[b+1];if(A&&(_=A.b,y=p===(k=A.a)),j&&(x=j.b,$=g===(C=j.a)),$&&y)E(m,x,a,++d),F(i,a,g,w,b,o),d+=m.b||0,J(i,a,g,_,++d),d+=_.b||0,l+=2,b+=2;else if($)d++,F(i,a,p,w,b,o),E(m,x,a,d),d+=m.b||0,l+=1,b+=2;else if(y)J(i,a,g,m,++d),d+=m.b||0,E(_,w,a,++d),d+=_.b||0,l+=2,b+=1;else{if(!A||k!==C)break;J(i,a,g,m,++d),F(i,a,p,w,b,o),d+=m.b||0,E(_,x,a,++d),d+=_.b||0,l+=2,b+=2}}}for(;l<f;){m=(h=u[l]).b;J(i,a,h.a,m,++d),d+=m.b||0,l++}for(;b<s;){var N=N||[];F(i,a,(v=c[b]).a,v.b,void 0,N),b++}(0<a.length||0<o.length||N)&&S(t,8,e,{w:a,x:o,y:N})}var Hr="_elmW6BL";function F(r,n,t,e,a,i){var o,u=r[t];u?1===u.c?(i.push({r:a,A:u}),u.c=2,E(u.z,e,o=[],u.r),u.r=a,u.s.s={w:o,A:u}):F(r,n,t+Hr,e,a,i):(i.push({r:a,A:u={c:0,z:e,r:a,s:void 0}}),r[t]=u)}function J(r,n,t,e,a){var i,o=r[t];o?0===o.c?(o.c=2,E(e,o.z,i=[],a),S(n,9,a,{w:i,A:o})):J(r,n,t+Hr,e,a):(i=S(n,9,a,void 0),r[t]={c:1,z:e,r:a,s:i})}function Mr(r,n,t,e){!function r(n,t,e,a,i,o,u){var c=e[a];var f=c.r;for(;f===i;){var s,l=c.$;if(1===l?Mr(n,t.k,c.s,u):8===l?(c.t=n,c.u=u,0<(s=c.s.w).length&&r(n,t,s,0,i,o,u)):9===l?(c.t=n,c.u=u,(l=c.s)&&(l.A.s=n,0<(s=l.w).length)&&r(n,t,s,0,i,o,u)):(c.t=n,c.u=u),!(c=e[++a])||(f=c.r)>o)return a}var b=t.$;if(4===b){for(var d=t.k;4===d.$;)d=d.k;return r(n,d,e,a,i+1,o,n.elm_event_node_ref)}var h=t.e;var v=n.childNodes;for(var g=0;g<h.length;g++){var p=1===b?h[g]:h[g].b,m=++i+(p.b||0);if(i<=f&&f<=m&&(a=r(v[g],p,e,a,i,m,u),!(c=e[a])||(f=c.r)>o))return a;i=m}return a}(r,n,t,0,0,n.b,e)}function Rr(r,n,t,e){return 0===t.length?r:(Mr(r,n,t,e),zr(r,t))}function zr(r,n){for(var t=0;t<n.length;t++){var e=n[t],a=e.t,e=function(r,n){switch(n.$){case 0:return function(r,n,t){var e=r.parentNode,n=w(n,t);n.elm_event_node_ref||(n.elm_event_node_ref=r.elm_event_node_ref);e&&n!==r&&e.replaceChild(n,r);return n}(r,n.s,n.u);case 4:return Ir(r,n.u,n.s),r;case 3:return r.replaceData(0,r.length,n.s),r;case 1:return zr(r,n.s);case 2:return r.elm_event_node_ref?r.elm_event_node_ref.j=n.s:r.elm_event_node_ref={j:n.s,p:n.u},r;case 6:for(var t=n.s,e=0;e<t.i;e++)r.removeChild(r.childNodes[t.v]);return r;case 7:for(var a=(t=n.s).e,e=t.v,i=r.childNodes[e];e<a.length;e++)r.insertBefore(w(a[e],n.u),i);return r;case 9:var o;return(t=n.s)?(void 0!==(o=t.A).r&&r.parentNode.removeChild(r),o.s=zr(r,t.w)):r.parentNode.removeChild(r),r;case 8:return function(r,n){for(var t=n.s,e=function(r,n){if(r){for(var t=kr.createDocumentFragment(),e=0;e<r.length;e++){var a=r[e].A;t.appendChild(2===a.c?a.s:w(a.z,n.u))}return t}}(t.y,n),a=(r=zr(r,t.w),t.x),i=0;i<a.length;i++){var o=a[i],u=o.A,u=2===u.c?u.s:w(u.z,n.u);r.insertBefore(u,r.childNodes[o.r])}e&&r.appendChild(e);return r}(r,n);case 5:return n.s(r);default:q(10)}}(a,e);a===r&&(r=e)}return r}function Gr(r){if(3===r.nodeType)return{$:0,a:r.textContent};if(1!==r.nodeType)return{$:0,a:""};for(var n=h,t=r.attributes,e=t.length;e--;)var a=t[e],n={$:1,a:b(Nr,a.name,a.value),b:n};for(var i=r.tagName.toLowerCase(),o=h,u=r.childNodes,e=u.length;e--;)o={$:1,a:Gr(u[e]),b:o};return s(Cr,i,n,o)}var Or=B(function(n,r,t,o){return hr(r,o,n.aJ,n.a_,n.aX,function(t,r){var e=n.a0,a=o.node,i=Gr(a);return Wr(r,function(r){var r=e(r),n=Kr(i,r);a=Rr(a,i,n,t),i=r})})}),qr="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:function(r){return setTimeout(r,1e3/60)};function Wr(t,e){e(t);var a=0;function i(){a=1===a?0:(qr(i),e(t),1)}return function(r,n){t=r,n?(e(t),2===a&&(a=1)):(0===a&&qr(i),a=2)}}function Vr(r){return(r=wn(r))<=90&&65<=r}function Xr(r){return r}function Yr(r){switch(r.$){case 0:return b(Vn,r.a,r.b);case 1:return b(rt,r.a,tt(r.b));case 2:return b(rt,r.a,Xn(r.b));case 3:return b(rt,r.a,r.b);case 4:return b(et,r.a,r.b);default:switch(r.b.$){case 0:return b(Un,r.a,r.b.a);case 1:return b(nt,r.a,r.b.a);case 2:return b(Qn,r.a,r.b.a);default:return b(Zn,r.a,r.b.a)}}}function Zr(r){return Cr(Sr(r))}function Ur(r){return xr(Sr(r))}function Qr(r){if(r.$)return it(r.a);var n=r.a,t=r.b,e=r.c;switch(e.$){case 0:return s(Zr,n,b(C,Yr,t),h);case 1:var a=e.a;return s(Zr,n,b(C,Yr,t),b(C,Qr,a));default:a=e.a;return s(Ur,n,b(C,Yr,t),b(C,at(Qr),a))}}function rn(r){return r.b}function nn(r){return b(dt,r,"")}function tn(r){switch(r){case"className":return"class";case"defaultValue":return"value";case"htmlFor":return"for";default:return r}}function en(r){return _t(r)}function $(r){return b(xt,"href",r)}function an(r){return b(xt,"target",r)}function on(r){return b(xt,"src",r)}function un(r){return b(xt,"alt",r)}function cn(r){return b(A,v([N("w-full")]),v([b(A,v([N("lg:hidden")]),v([Jt])),b(A,v([N("hidden lg:block w-full")]),v([function(r){return b(Ft,v([N("h-full w-full grid grid-cols-6 content-center justify-items-center")]),v([l(K,r,"/animations","_self","Animations"),l(K,r,"https://www.etsy.com/shop/CatholicStories","_blank","Shop"),l(K,r,"/resources","_self","Resources"),l(K,r,"/contact","_self","Contact"),l(K,r,"/give","_self","Give"),l(K,r,"/team","_self","About Us")]))}(r)]))]))}var fn,y=z,k=function(r){return{$:1,a:r}},sn=a(function(r,n){return{$:3,a:r,b:n}}),ln=a(function(r,n){return{$:0,a:r,b:n}}),bn=a(function(r,n){return{$:1,a:r,b:n}}),dn=function(r){return{$:0,a:r}},hn=function(r){return{$:2,a:r}},vn=er,z=function(r){return r+""},gn=a(function(r,n){return b(Z,r,G(n))}),pn=a(function(r,n){return v(b(Y,r,n))}),mn=r(function(r,n,t){for(;;){if(!t.b)return n;var e=t.b,a=r,i=b(r,t.a,n);r=a,n=i,t=e}}),wn=function(r){var n=r.charCodeAt(0);return n<55296||56319<n?n:1024*(n-55296)+r.charCodeAt(1)-56320+65536},$n=function(r){return s(mn,y,h,r)},yn=B(function(r,n,t,e){return{$:0,a:r,b:n,c:t,d:e}}),kn=[],_n=t,Cn=a(function(r,n){return W(n)/W(r)}),xn=_n(b(Cn,2,32)),An=l(yn,0,xn,kn,kn),jn=O,Nn=o,Sn=function(r){return r.length},En=a(function(r,n){return 0<e(r,n)?r:n}),Fn=n,Jn=a(function(r,n){for(;;){var t=b(Fn,32,r),e=t.b,t=b(y,{$:0,a:t.a},n);if(!e.b)return $n(t);r=e,n=t}}),Ln=a(function(r,n){for(;;){var t=_n(n/32);if(1===t)return b(Fn,32,r).a;r=b(Jn,r,h),n=t}}),In=a(function(r,n){var t,e;return n.a?(e=Nn(b(Cn,32,(t=32*n.a)-1)),r=r?$n(n.d):n.d,r=b(Ln,r,n.a),l(yn,Sn(n.c)+t,b(En,5,e*xn),r,n.c)):l(yn,Sn(n.c),xn,kn,n.c)}),Kn=D(function(r,n,t,e,a){for(;;){if(n<0)return b(In,!1,{d:e,a:t/32|0,c:a});var i={$:1,a:s(jn,32,n,r)};r=r,n=n-32,t=t,e=b(y,i,e),a=a}}),Pn=a(function(r,n){var t;return 0<r?H(Kn,n,r-(t=r%32)-32,r,h,s(jn,t,r-t,n)):An}),_=function(r){return!r.$},er=function(r){return{$:0,a:r}},Tn=function(r){switch(r.$){case 0:return 0;case 1:return 1;case 2:return 2;default:return 3}},Bn=ir,t=Bn(0),Dn=B(function(r,n,t,e){var a,i,o,u;return e.b?(a=e.a,(e=e.b).b?(i=e.a,(e=e.b).b?(o=e.a,(e=e.b).b?(u=e.b,b(r,a,b(r,i,b(r,o,b(r,e.a,500<t?s(mn,r,n,$n(u)):l(Dn,r,n,t+1,u)))))):b(r,a,b(r,i,b(r,o,n)))):b(r,a,b(r,i,n))):b(r,a,n)):n}),Hn=r(function(r,n,t){return l(Dn,r,n,0,t)}),C=a(function(t,r){return s(Hn,a(function(r,n){return b(y,t(r),n)}),h,r)}),Mn=or,Rn=a(function(n,r){return b(Mn,function(r){return Bn(n(r))},r)}),zn=r(function(t,r,e){return b(Mn,function(n){return b(Mn,function(r){return Bn(b(t,n,r))},e)},r)}),Gn=u,On=a(function(r,n){return fr(b(Mn,Gn(r),n))}),O=r(function(r,n,t){return b(Rn,function(r){return 0},(r=b(C,On(r),n),s(Hn,zn(y),Bn(h),r)))}),qn=(m.Task={b:t,c:O,d:r(function(r,n,t){return Bn(0)}),e:a(function(r,n){return b(Rn,r,n)}),f:void 0},vr("Task"),gr(h)),Wn=gr(h),x=function(r){return{$:1,a:r}},Vn=a(function(r,n){return b(Nr,function(r){return/^(on|formAction$)/i.test(r)?"data-"+r:r}(r),Er(n))}),Xn=ar,Yn=f,Zn=a(function(r,n){return b(Yn,r,{$:3,a:n})}),Un=a(function(r,n){return b(Yn,r,{$:0,a:n})}),Qn=a(function(r,n){return b(Yn,r,{$:2,a:n})}),rt=a(function(r,n){return b(jr,function(r){return"innerHTML"==r||"formAction"==r?"data-"+r:r}(r),Er(n))}),nt=a(function(r,n){return b(Yn,r,{$:1,a:n})}),tt=ar,et=Ar,at=a(function(r,n){return{a:n.a,b:r(n.b)}}),it=_r,ot=Qr,ut=a(function(r,n){return r}),ct=r(function(r,n,t){return 0<r?s(ct,r>>1,i(n,n),1&r?i(t,n):t):t}),ft=a(function(r,n){return s(ct,r,n,"")}),st=r(function(r,n,t){return i(b(ft,r*n," "),t)}),lt=a(function(t,r){var n,e;return r.b?r.b.b?(e=r.a,n=r.b,s(mn,a(function(r,n){return i(r,i(t,n))}),e,n)):r.a:""}),o=r(function(r,n,t){return n(r(t))}),n=r(function(r,n,t){return b(gn,n,b(pn,r,t))}),bt=b(o,b(n,"&","&amp;"),b(o,b(n,"<","&lt;"),b(n,">","&gt;"))),u=X,dt=V,ht=b(u,a(function(r,n){return'"'===r?n+'\\"':i(n,nn(r))}),""),vt=function(r){return r.toLowerCase()},gt=b(u,a(function(r,n){return Vr(r)?n+("-"+nn(vt(r))):i(n,nn(r))}),""),pt=a(function(r,n){return gt(r)+('="'+ht(n))+'"'}),mt=a(function(r,n){var t=n.a,e=n.b,a=n.c;switch(r.$){case 0:return{a:t,b:e,c:b(y,b(pt,u=r.a,o=r.b),a)};case 1:return"className"===r.a?{a:b(y,o=r.b,t),b:e,c:a}:(o=r.b,{a:t,b:e,c:b(y,b(pt,tn(i=r.a),o),a)});case 2:var i=r.a;return r.b?{a:t,b:e,c:b(y,gt(tn(i)),a)}:n;case 3:var i=r.a,o=r.b;return{a:t,b:e,c:b(y,b(pt,tn(i),b(vn,0,o)),a)};case 4:var u=r.a,o=r.b;return{a:t,b:b(y,ht(u)+(": "+ht(o)),e),c:a};default:return n}}),wt=a(function(r,n){return r.b?b(y,b(pt,"class",b(lt," ",r)),n):n}),$t=a(function(r,n){return r.b?b(y,b(pt,"style",b(lt,"; ",r)),n):n}),yt=a(function(r,n){return"<"+b(gn," ",b(y,r,function(r){r=s(mn,mt,{a:h,b:h,c:h},r);return b($t,r.b,b(wt,r.a,r.c))}(n)))+">"}),kt=r(function(r,n,t){for(;;)if(n.b)if(n.a.$){c=r,f=u=n.b,s=d(t,{g:b(y,b(r,t.e,bt(n.a.a)),t.g)});r=c,n=f,t=s}else{var e=n.a,a=e.a,i=e.b,o=e.c,u=n.b;switch(o.$){case 0:var c=r,f=u,s=d(t,{g:b(y,b(r,t.e,b(yt,a,i)),t.g)});r=c,n=f,t=s;continue;case 1:c=r,f=o.a,s=d(t,{e:t.e+1,g:b(y,b(r,t.e,b(yt,a,i)),t.g),n:b(y,{a:a,b:u},t.n)});r=c,n=f,t=s;continue;default:c=r,f=b(C,rn,o.a),s=d(t,{e:t.e+1,g:b(y,b(r,t.e,b(yt,a,i)),t.g),n:b(y,{a:a,b:u},t.n)});r=c,n=f,t=s;continue}}else{e=t.n;if(!e.b)return t;var l=e.a,a=l.a,u=e.b,c=r,f=l.b,s=d(t,{e:t.e-1,g:b(y,b(r,t.e-1,"</"+a+">"),t.g),n:u});r=c,n=f,t=s}}),_t=a(function(r,n){var t=r?"\n":"",e={e:0,g:h,n:h},r=r?st(r):ut(Xr);return b(lt,t,s(kt,r,v([n]),e).g)}),Ct=r(function(r,n,t){return{$:0,a:r,b:n,c:t}}),t=r(function(r,n,t){return s(Ct,r,n,{$:1,a:t})}),A=t("div"),j=a(function(r,n){return{$:4,a:r,b:n}}),xt=a(function(r,n){return{$:1,a:r,b:n}}),N=function(r){return b(xt,"className",r)},At=t("h1"),O=b(A,h,v([x("Find video content here. Videos are a wonderful engaging way to bring a visual representation of the faith into your home.")])),f=t("p"),L=t("a"),I=a(function(r,n){return{$:0,a:r,b:n}}),Ar=b(L,v([$("https://signup.catholicstoriesforchildren.com"),b(I,"rel","noopener"),an("_blank"),b(j,"text-decoration","none"),b(j,"padding","10px 20px"),b(j,"display","inline-block"),b(j,"border-radius","5px"),b(j,"box-shadow","#777 1px 1px 5px"),b(j,"color","white"),b(j,"background-color","#9200B3")]),v([x("Sign Up")])),o=b(A,h,v([b(f,v([N("pb-5")]),v([x("Want tips, resources, and Catholic animations? We are giving away our prayer printable to those who sign up today!")])),Ar])),jt=t("h2"),Nt={$:0},St=r(function(r,n,t){return s(Ct,r,n,Nt)})("img"),n=b(A,h,b(C,function(r){return b(L,v([N("grid grid-cols-[100px_1fr] hover:bg-csc-lightpurple rounded py-7"),an("_blank"),b(I,"aria-label",r.H),$(r.K)]),v([b(A,h,v([b(St,v([on(r.J),N("w-20 h-20 object-cover")]),h)])),b(A,h,v([b(jt,v([N("leading-10")]),v([x(r.H)]))]))]))},v([{J:"https://ik.imagekit.io/catholicstories/CSCLogo_JiNT9WUPX.png?updatedAt=1679070448402",K:"https://www.youtube.com/@CatholicStoriesforChildren",H:"Catholic Stories For Children"},{J:"https://ik.imagekit.io/catholicstories/ProfileImages/christineinaction_Le5_7yr2K.jpeg?updatedAt=1682821244341",K:"https://www.youtube.com/@ChristineInAction",H:"Christine In Action"},{J:"https://ik.imagekit.io/catholicstories/ProfileImages/15_Wrw3_kbKK.png?updatedAt=1679070333309",K:"https://www.youtube.com/playlist?list=PL9CQlldupc5_L0shwBi1w-n5liWhD0ArO",H:"Tomkin"},{J:"https://ik.imagekit.io/catholicstories/ProfileImages/17_z9ZERCAuK.png?updatedAt=1679070333348",K:"https://www.youtube.com/@CatholicKidsMedia",H:"Catholic Kids Media"},{J:"https://ik.imagekit.io/catholicstories/ProfileImages/16_V1sLznRg0.png?updatedAt=1679070333303",K:"https://www.youtube.com/@BrotherFrancis",H:"Brother Francis"},{J:"https://ik.imagekit.io/catholicstories/ProfileImages/40_vS6tZTdD3.png?updatedAt=1682876930344",K:"https://www.youtube.com/@catholicsongsforkids",H:"Catholic Songs for Kids"},{J:"https://ik.imagekit.io/catholicstories/ProfileImages/41_XrkKmwtXL.png?updatedAt=1682876930378",K:"https://www.youtube.com/@CatholicIcing",H:"Catholic Icing"},{J:"https://ik.imagekit.io/catholicstories/ProfileImages/opusjoyouslogo__bVhpC3Fj.jpeg?updatedAt=1687549207653",K:"https://www.youtube.com/@OpusJoyous",H:"Opus Joyous"},{J:"https://ik.imagekit.io/catholicstories/ProfileImages/42_GMJuNZEVs.png?updatedAt=1683226627331",K:"https://www.youtube.com/@prostradadesignsllc",H:"Prostrada Designs"}]))),X=b(A,v([N("grid grid-cols-[100px_1fr] rounded py-7")]),v([b(A,h,v([b(St,v([on("https://ik.imagekit.io/catholicstories/Construction_Cone_vLoPMhMZBm.png?updatedAt=1679070884463"),N("w-20 h-20 object-cover")]),h)])),b(A,h,v([b(f,h,v([x("This page is a work-in-progress. We are working hard on adding resources this page for you.")]))]))])),V=b(A,v([N("max-w-3xl"),N("m-auto"),N("p-5"),N("mb-10")]),v([b(At,v([N("my-10 leading-10")]),v([x("Youtube Channels")])),O,b(A,v([N("my-10")]),v([o])),n,X])),u=t("footer"),Ar=t("span"),O=b(u,v([b(j,"padding",z(30)+"px"),b(j,"background-color","black"),b(j,"color","white"),b(j,"transform-style","preserve-3d")]),v([b(A,v([N("flex items-center gap-2.5")]),v([b(Ar,h,v([x("Follow us on")])),b(L,v([$("https://www.facebook.com/catholicstoriesforchildren"),b(I,"aria-label","CSC Facebook Page"),an("_blank")]),v([b(St,v([N("w-10 h-10"),on("https://ik.imagekit.io/catholicstories/f_logo_RGB-Blue_250_3vs-yhXer.png?updatedAt=1684277030198"),un("Facebook")]),h)])),b(L,v([$("https://www.instagram.com/catholicstoriesforchildren/"),b(I,"aria-label","CSC Instagram Page"),an("_blank")]),v([b(St,v([N("w-10 h-10"),on("https://ik.imagekit.io/catholicstories/Instagram_Glyph_Gradient_kFoMs9jIr.png?updatedAt=1684277127293"),un("Instagram")]),h)]))])),b(f,h,v([x("Copyright © 2023 Catholic Stories for Children. All rights reserved.")])),b(f,h,v([x("Catholic Stories for Children is a 501(c)(3) non-profit recognized by the IRS. Contributions to Catholic Stories for Children are tax-deductible to the extent permitted by law.  Tax ID Number: 85-4194883")]))])),Et=t("header"),Ft=t("nav"),K=B(function(r,n,t,e){return b(L,v([$(n),N("flex items-center justify-center"),N("hover:bg-csc-lightpurple"),N("hover:border-b-2 hover:border-gray-700"),N("rounded-t"),N("text-lg"),N("h-[60px] h-["+r+"]"),N("w-full"),b(I,"aria-label",e),an(t)]),v([x(e)]))}),Jt=b(L,v([$("/navigation"),N("space-y-2"),b(I,"aria-label","menu")]),v([b(A,v([N("w-8 h-0.5 m-auto bg-gray-600")]),h),b(A,v([N("w-8 h-0.5 m-auto bg-gray-600")]),h),b(A,v([N("w-8 h-0.5 m-auto bg-gray-600")]),h)])),o=b(St,v([on("/assets/logo_solid.svg"),b(j,"height","30px"),un(""),b(j,"vertical-align","middle")]),h),Lt=b(L,v([b(j,"text-decoration","none"),N("colorDarkGray"),$("/"),b(I,"aria-label","home")]),v([o])),n=a(function(r,n){var r="Catholic Stories for Children"===r?{a:"111px",b:cn,c:"grid-cols-[150px_1fr_150px] lg:grid-cols-[150px_1fr_600px]"}:{a:"60px",b:cn,c:"grid-cols-[150px_1fr_150px] lg:grid-cols-[150px_1fr_600px]"},t=r.a,e=r.b,r=r.c;return b(Et,v([b(j,"background-color","#3d5d75"),b(j,"background-image","linear-gradient(130deg, #9DE2EB , #EBD6F1)"),N("h-[60px] md:h-["+t+"]"),N("colorDarkGray"),N("grid items-center justify-items-center"),N(r)]),v([Lt,b(L,v([b(j,"text-decoration","none"),N("colorDarkGray"),N("invisible md:visible"),N("justify-self-start"),$("/")]),v([b(At,v([b(j,"font-family","hvdComicSerifPro"),b(j,"margin","0px"),N("text-[0px] md:text-2xl")]),v([x("Catholic Stories for Children")]))])),e(t)]))}),It=b(A,v([b(j,"height","100vh"),b(j,"overflow-x","hidden"),b(j,"overflow-y","auto"),b(j,"perspective","300px"),b(j,"scroll-behavior","smooth"),b(j,"background-color","#FEF7F4")]),v([b(n,"Youtube Channels",10),V,O])),X=(fn={aJ:{},a_:function(r){return function(r){return r}},a0:function(r){return ot(x(b(en,0,It)))}},Or({aJ:function(r){return{a:fn.aJ,b:qn}},aX:function(r){return Wn},a_:a(function(r,n){return{a:b(fn.a_,r,n),b:qn}}),a0:fn.a0}));u={Resources:{Videos:{Main:{init:X(er(0))(0)}}}},P.Elm?function r(n,t){for(var e in t)e in n?"init"==e?q(6):r(n[e],t[e]):n[e]=t[e]}(P.Elm,u):P.Elm=u}(this);