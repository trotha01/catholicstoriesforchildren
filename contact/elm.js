!function(q){"use strict";function G(r,n,e){return e.a=r,e.f=n,e}function n(e){return G(2,e,function(n){return function(r){return e(n,r)}})}function r(t){return G(3,t,function(e){return function(n){return function(r){return t(e,n,r)}}})}function I(a){return G(4,a,function(t){return function(e){return function(n){return function(r){return a(t,e,n,r)}}}})}function M(i){return G(5,i,function(a){return function(t){return function(e){return function(n){return function(r){return i(a,t,e,n,r)}}}}})}function l(r,n,e){return 2===r.a?r.f(n,e):r(n)(e)}function s(r,n,e,t){return 3===r.a?r.f(n,e,t):r(n)(e)(t)}function v(r,n,e,t,a){return 4===r.a?r.f(n,e,t,a):r(n)(e)(t)(a)}function R(r,n,e,t,a,i){return 5===r.a?r.f(n,e,t,a,i):r(n)(e)(t)(a)(i)}function t(r,n,e){if("object"!=typeof r)return r===n?0:r<n?-1:1;if(void 0===r.$)return(e=(e=t(r.a,n.a))||t(r.b,n.b))||t(r.c,n.c);for(;r.b&&n.b&&!(e=t(r.a,n.a));r=r.b,n=n.b);return e||(r.b?1:n.b?-1:0)}var z=0;var d={$:0};function P(r,n){return{$:1,a:r,b:n}}var e=n(P);function h(r){for(var n=d,e=r.length;e--;)n={$:1,a:r[e],b:n};return n}var a=r(function(r,n,e){for(var t=Array(r),a=0;a<r;a++)t[a]=e(n+a);return t}),H=n(function(r,n){for(var e=Array(r),t=0;t<r&&n.b;t++)e[t]=n.a,n=n.b;return e.length=t,{a:e,b:n}});function O(r){throw Error("https://github.com/elm/core/blob/1.0.0/hints/"+r+".md")}var X=Math.ceil,i=Math.floor,Z=Math.log;var U=n(b);function b(r,n){switch(r.$){case 2:return r.b(n);case 5:return null===n?_(r.c):g("null",n);case 3:return Y(n)?J(r.b,n,h):g("a LIST",n);case 4:return Y(n)?J(r.b,n,K):g("an ARRAY",n);case 6:var e=r.d;return"object"==typeof n&&null!==n&&e in n?(i=b(r.b,n[e]),w(i)?i:y(l(Hr,e,i.a))):g("an OBJECT with a field named `"+e+"`",n);case 7:e=r.e;return Y(n)?e<n.length?(i=b(r.b,n[e]),w(i)?i:y(l(Or,e,i.a))):g("a LONGER array. Need index "+e+" but only see "+n.length+" entries",n):g("an ARRAY",n);case 8:if("object"!=typeof n||null===n||Y(n))return g("an OBJECT",n);var t,a=d;for(t in n)if(n.hasOwnProperty(t)){var i=b(r.b,n[t]);if(!w(i))return y(l(Hr,t,i.a));a={$:1,a:{a:t,b:i.a},b:a}}return _(k(a));case 9:for(var o=r.f,u=r.g,f=0;f<u.length;f++){i=b(u[f],n);if(!w(i))return i;o=o(i.a)}return _(o);case 10:i=b(r.b,n);return w(i)?b(r.h(i.a),n):i;case 11:for(var c=d,s=r.g;s.b;s=s.b){i=b(s.a,n);if(w(i))return i;c={$:1,a:i.a,b:c}}return y(Xr(k(c)));case 1:return y(l(Pr,r.a,n));case 0:return _(r.a)}}function J(r,n,e){for(var t=n.length,a=Array(t),i=0;i<t;i++){var o=b(r,n[i]);if(!w(o))return y(l(Or,i,o.a));a[i]=o.a}return _(e(a))}function Y(r){return Array.isArray(r)||"undefined"!=typeof FileList&&r instanceof FileList}function K(n){return l(cn,n.length,function(r){return n[r]})}function g(r,n){return y(l(Pr,"Expecting "+r,n))}function f(r,n){if(r===n)return!0;if(r.$!==n.$)return!1;switch(r.$){case 0:case 1:return r.a===n.a;case 2:return r.b===n.b;case 5:return r.c===n.c;case 3:case 4:case 8:return f(r.b,n.b);case 6:return r.d===n.d&&f(r.b,n.b);case 7:return r.e===n.e&&f(r.b,n.b);case 9:return r.f===n.f&&W(r.g,n.g);case 10:return r.h===n.h&&f(r.b,n.b);case 11:return W(r.g,n.g)}}function W(r,n){var e=r.length;if(e!==n.length)return!1;for(var t=0;t<e;t++)if(!f(r[t],n[t]))return!1;return!0}function Q(r){return r}function V(r){return{$:0,a:r}}var rr=n(function(r,n){return{$:3,b:r,d:n}});var nr=0;function er(r){r={$:0,e:nr++,f:r,g:null,h:[]};return ur(r),r}function tr(n){return{$:2,b:function(r){r({$:0,a:er(n)})},c:null}}function ar(r,n){r.h.push(n),ur(r)}var ir=!1,or=[];function ur(r){if(or.push(r),!ir){for(ir=!0;r=or.shift();)!function(n){for(;n.f;){var r=n.f.$;if(0===r||1===r){for(;n.g&&n.g.$!==r;)n.g=n.g.i;if(!n.g)return;n.f=n.g.b(n.f.a),n.g=n.g.i}else{if(2===r)return n.f.c=n.f.b(function(r){n.f=r,ur(n)});if(5===r){if(0===n.h.length)return;n.f=n.f.b(n.h.shift())}else n.g={$:3===r?0:1,b:n.f.b,i:n.g},n.f=n.f.d}}}(r);ir=!1}}function fr(r,n,e,t,a,i){var r=l(U,r,n?n.flags:void 0),o=(w(r)||O(2),{}),n=e(r.a),u=n.a,f=i(c,u),e=function(r,n){var e,t;for(t in p){var a=p[t];a.a&&((e=e||{})[t]=a.a(t,n)),r[t]=function(r,n){var t={g:n,h:void 0},a=r.c,i=r.d,o=r.e,u=r.f;function f(e){return l(rr,f,{$:5,b:function(r){var n=r.a;return 0===r.$?s(i,t,n,e):o&&u?v(a,t,n.i,n.j,e):s(a,t,o?n.i:n.j,e)}})}return t.h=er(l(rr,f,r.b))}(a,n)}return e}(o,c);function c(r,n){r=l(t,r,u);f(u=r.a,n),hr(o,r.b,a(u))}return hr(o,n.b,a(u)),e?{ports:e}:{}}var p={};var cr=n(function(n,e){return{$:2,b:function(r){n.g(e),r({$:0,a:z})},c:null}});function sr(n){return function(r){return{$:1,k:n,l:r}}}function lr(r){return{$:2,m:r}}var vr=[],dr=!1;function hr(r,n,e){if(vr.push({p:r,q:n,r:e}),!dr){dr=!0;for(var t;t=vr.shift();)!function(r,n,e){var t,a={};for(t in br(!0,n,a,null),br(!1,e,a,null),r)ar(r[t],{$:"fx",a:a[t]||{i:d,j:d}})}(t.p,t.q,t.r);dr=!1}}function br(r,n,e,t){switch(n.$){case 1:var a=n.k,i=function(r,n,e,t){function a(r){for(var n=e;n;n=n.t)r=n.s(r);return r}return l(r?p[n].e:p[n].f,a,t)}(r,a,t,n.l);return void(e[a]=function(r,n,e){return e=e||{i:d,j:d},r?e.i={$:1,a:n,b:e.i}:e.j={$:1,a:n,b:e.j},e}(r,i,e[a]));case 2:for(var o=n.m;o.b;o=o.b)br(r,o.a,e,t);return;case 3:br(r,n.o,e,{s:n.n,t:t})}}var gr;var pr="undefined"!=typeof document?document:{};function mr(r){return{$:0,a:r}}var c=n(function(i,o){return n(function(r,n){for(var e=[],t=0;n.b;n=n.b){var a=n.a;t+=a.b||0,e.push(a)}return t+=e.length,{$:1,c:o,d:wr(r),e:e,f:i,b:t}})})(void 0);n(function(i,o){return n(function(r,n){for(var e=[],t=0;n.b;n=n.b){var a=n.a;t+=a.b.b||0,e.push(a)}return t+=e.length,{$:2,c:o,d:wr(r),e:e,f:i,b:t}})})(void 0);var o=n(function(r,n){return{$:"a1",n:r,o:n}}),$r=n(function(r,n){return{$:"a2",n:r,o:n}}),yr=n(function(r,n){return{$:"a3",n:r,o:n}});function _r(r){return/^\s*(javascript:|data:text\/html)/i.test(r)?"":r}var kr;function wr(r){for(var n={};r.b;r=r.b){var e,t=r.a,a=t.$,i=t.n,t=t.o;"a2"===a?"className"===i?xr(n,i,t):n[i]=t:(e=n[a]||(n[a]={}),"a3"===a&&"class"===i?xr(e,i,t):e[i]=t)}return n}function xr(r,n,e){var t=r[n];r[n]=t?t+" "+e:e}function m(r,n){var e=r.$;if(5===e)return m(r.k||(r.k=r.m()),n);if(0===e)return pr.createTextNode(r.a);if(4===e){for(var t=r.k,a=r.j;4===t.$;)"object"!=typeof a?a=[a,t.j]:a.push(t.j),t=t.k;var i={j:a,p:n};(o=m(t,i)).elm_event_node_ref=i}else if(3===e)jr(o=r.h(r.g),n,r.d);else{var o=r.f?pr.createElementNS(r.f,r.c):pr.createElement(r.c);gr&&"a"==r.c&&o.addEventListener("click",gr(o)),jr(o,n,r.d);for(var u=r.e,f=0;f<u.length;f++)o.appendChild(m(1===e?u[f]:u[f].b,n))}return o}function jr(r,n,e){for(var t in e){var a=e[t];"a1"===t?function(r,n){var e,t=r.style;for(e in n)t[e]=n[e]}(r,a):"a0"===t?function(r,n,e){var t,a=r.elmFs||(r.elmFs={});for(t in e){var i=e[t],o=a[t];if(i){if(o){if(o.q.$===i.$){o.q=i;continue}r.removeEventListener(t,o)}o=function(f,r){function c(r){var n=c.q,e=b(n.a,r);if(w(e)){for(var t,n=sn(n),e=e.a,a=n?n<3?e.a:e.r:e,i=1==n?e.b:3==n&&e.N,o=(i&&r.stopPropagation(),(2==n?e.b:3==n&&e.K)&&r.preventDefault(),f);t=o.j;){if("function"==typeof t)a=t(a);else for(var u=t.length;u--;)a=t[u](a);o=o.p}o(a,i)}}return c.q=r,c}(n,i),r.addEventListener(t,o,kr&&{passive:sn(i)<2}),a[t]=o}else r.removeEventListener(t,o),a[t]=void 0}}(r,n,a):"a3"===t?function(r,n){for(var e in n){var t=n[e];void 0!==t?r.setAttribute(e,t):r.removeAttribute(e)}}(r,a):"a4"===t?function(r,n){for(var e in n){var t=n[e],a=t.f,t=t.o;void 0!==t?r.setAttributeNS(a,e,t):r.removeAttributeNS(a,e)}}(r,a):("value"!==t&&"checked"!==t||r[t]!==a)&&(r[t]=a)}}try{window.addEventListener("t",null,Object.defineProperty({},"passive",{get:function(){kr=!0}}))}catch(r){}function Ar(r,n){var e=[];return N(r,n,e,0),e}function F(r,n,e,t){n={$:n,r:e,s:t,t:void 0,u:void 0};return r.push(n),n}function N(r,n,e,t){if(r!==n){var a=r.$,i=n.$;if(a!==i){if(1!==a||2!==i)return void F(e,0,t,n);n=function(r){for(var n=r.e,e=n.length,t=Array(e),a=0;a<e;a++)t[a]=n[a].b;return{$:1,c:r.c,d:r.d,e:t,f:r.f,b:r.b}}(n),i=1}switch(i){case 5:for(var o=r.l,u=n.l,f=o.length,c=f===u.length;c&&f--;)c=o[f]===u[f];if(c)return void(n.k=r.k);n.k=n.m();var s=[];return N(r.k,n.k,s,0),void(0<s.length&&F(e,1,t,s));case 4:for(var l=r.j,v=n.j,d=!1,h=r.k;4===h.$;)d=!0,"object"!=typeof l?l=[l,h.j]:l.push(h.j),h=h.k;for(var b=n.k;4===b.$;)d=!0,"object"!=typeof v?v=[v,b.j]:v.push(b.j),b=b.k;return d&&l.length!==v.length?void F(e,0,t,n):((d?function(r,n){for(var e=0;e<r.length;e++)if(r[e]!==n[e])return;return 1}(l,v):l===v)||F(e,2,t,v),void N(h,b,e,t+1));case 0:return void(r.a!==n.a&&F(e,3,t,n.a));case 1:return void Cr(r,n,e,t,Fr);case 2:return void Cr(r,n,e,t,Nr);case 3:if(r.h!==n.h)return void F(e,0,t,n);s=Er(r.d,n.d),s=(s&&F(e,4,t,s),n.i(r.g,n.g));s&&F(e,5,t,s)}}}function Cr(r,n,e,t,a){var i;r.c!==n.c||r.f!==n.f?F(e,0,t,n):((i=Er(r.d,n.d))&&F(e,4,t,i),a(r,n,e,t))}function Er(r,n,e){var t,a,i,o,u;for(a in r)"a1"===a||"a0"===a||"a3"===a||"a4"===a?(i=Er(r[a],n[a]||{},a))&&((t=t||{})[a]=i):a in n?(i=r[a])===(o=n[a])&&"value"!==a&&"checked"!==a||"a0"===e&&function(r,n){return r.$==n.$&&f(r.a,n.a)}(i,o)||((t=t||{})[a]=o):(t=t||{})[a]=e?"a1"===e?"":"a0"===e||"a3"===e?void 0:{f:r[a].f,o:void 0}:"string"==typeof r[a]?"":null;for(u in n)u in r||((t=t||{})[u]=n[u]);return t}function Fr(r,n,e,t){var a=r.e,i=n.e,r=a.length,n=i.length;n<r?F(e,6,t,{v:n,i:r-n}):r<n&&F(e,7,t,{v:r,e:i});for(var o=r<n?r:n,u=0;u<o;u++){var f=a[u];N(f,i[u],e,++t),t+=f.b||0}}function Nr(r,n,e,t){for(var a=[],i={},o=[],u=r.e,f=n.e,c=u.length,s=f.length,l=0,v=0,d=t;l<c&&v<s;){var h=u[l],b=f[v],g=h.a,p=b.a,m=h.b,$=b.b,y=void 0,_=void 0;if(g===p)N(m,$,a,++d),d+=m.b||0,l++,v++;else{var k,w,x,j,A=u[l+1],C=f[v+1];if(A&&(w=A.b,_=p===(k=A.a)),C&&(j=C.b,y=g===(x=C.a)),y&&_)N(m,j,a,++d),S(i,a,g,$,v,o),d+=m.b||0,L(i,a,g,w,++d),d+=w.b||0,l+=2,v+=2;else if(y)d++,S(i,a,p,$,v,o),N(m,j,a,d),d+=m.b||0,l+=1,v+=2;else if(_)L(i,a,g,m,++d),d+=m.b||0,N(w,$,a,++d),d+=w.b||0,l+=2,v+=1;else{if(!A||k!==x)break;L(i,a,g,m,++d),S(i,a,p,$,v,o),d+=m.b||0,N(w,j,a,++d),d+=w.b||0,l+=2,v+=2}}}for(;l<c;){m=(h=u[l]).b;L(i,a,h.a,m,++d),d+=m.b||0,l++}for(;v<s;){var E=E||[];S(i,a,(b=f[v]).a,b.b,void 0,E),v++}(0<a.length||0<o.length||E)&&F(e,8,t,{w:a,x:o,y:E})}var Sr="_elmW6BL";function S(r,n,e,t,a,i){var o,u=r[e];u?1===u.c?(i.push({r:a,A:u}),u.c=2,N(u.z,t,o=[],u.r),u.r=a,u.s.s={w:o,A:u}):S(r,n,e+Sr,t,a,i):(i.push({r:a,A:u={c:0,z:t,r:a,s:void 0}}),r[e]=u)}function L(r,n,e,t,a){var i,o=r[e];o?0===o.c?(o.c=2,N(t,o.z,i=[],a),F(n,9,a,{w:i,A:o})):L(r,n,e+Sr,t,a):(i=F(n,9,a,void 0),r[e]={c:1,z:t,r:a,s:i})}function Lr(r,n,e,t){!function r(n,e,t,a,i,o,u){var f=t[a];var c=f.r;for(;c===i;){var s,l=f.$;if(1===l?Lr(n,e.k,f.s,u):8===l?(f.t=n,f.u=u,0<(s=f.s.w).length&&r(n,e,s,0,i,o,u)):9===l?(f.t=n,f.u=u,(l=f.s)&&(l.A.s=n,0<(s=l.w).length)&&r(n,e,s,0,i,o,u)):(f.t=n,f.u=u),!(f=t[++a])||(c=f.r)>o)return a}var v=e.$;if(4===v){for(var d=e.k;4===d.$;)d=d.k;return r(n,d,t,a,i+1,o,n.elm_event_node_ref)}var h=e.e;var b=n.childNodes;for(var g=0;g<h.length;g++){var p=1===v?h[g]:h[g].b,m=++i+(p.b||0);if(i<=c&&c<=m&&(a=r(b[g],p,t,a,i,m,u),!(f=t[a])||(c=f.r)>o))return a;i=m}return a}(r,n,e,0,0,n.b,t)}function Tr(r,n,e,t){return 0===e.length?r:(Lr(r,n,e,t),Br(r,e))}function Br(r,n){for(var e=0;e<n.length;e++){var t=n[e],a=t.t,t=function(r,n){switch(n.$){case 0:return function(r,n,e){var t=r.parentNode,n=m(n,e);n.elm_event_node_ref||(n.elm_event_node_ref=r.elm_event_node_ref);t&&n!==r&&t.replaceChild(n,r);return n}(r,n.s,n.u);case 4:return jr(r,n.u,n.s),r;case 3:return r.replaceData(0,r.length,n.s),r;case 1:return Br(r,n.s);case 2:return r.elm_event_node_ref?r.elm_event_node_ref.j=n.s:r.elm_event_node_ref={j:n.s,p:n.u},r;case 6:for(var e=n.s,t=0;t<e.i;t++)r.removeChild(r.childNodes[e.v]);return r;case 7:for(var a=(e=n.s).e,t=e.v,i=r.childNodes[t];t<a.length;t++)r.insertBefore(m(a[t],n.u),i);return r;case 9:var o;return(e=n.s)?(void 0!==(o=e.A).r&&r.parentNode.removeChild(r),o.s=Br(r,e.w)):r.parentNode.removeChild(r),r;case 8:return function(r,n){for(var e=n.s,t=function(r,n){if(r){for(var e=pr.createDocumentFragment(),t=0;t<r.length;t++){var a=r[t].A;e.appendChild(2===a.c?a.s:m(a.z,n.u))}return e}}(e.y,n),a=(r=Br(r,e.w),e.x),i=0;i<a.length;i++){var o=a[i],u=o.A,u=2===u.c?u.s:m(u.z,n.u);r.insertBefore(u,r.childNodes[o.r])}t&&r.appendChild(t);return r}(r,n);case 5:return n.s(r);default:O(10)}}(a,t);a===r&&(r=t)}return r}function Dr(r){if(3===r.nodeType)return{$:0,a:r.textContent};if(1!==r.nodeType)return{$:0,a:""};for(var n=d,e=r.attributes,t=e.length;t--;)var a=e[t],n={$:1,a:l(yr,a.name,a.value),b:n};for(var i=r.tagName.toLowerCase(),o=d,u=r.childNodes,t=u.length;t--;)o={$:1,a:Dr(u[t]),b:o};return s(c,i,n,o)}var qr=I(function(n,r,e,o){return fr(r,o,n.aF,n.aX,n.aU,function(e,r){var t=n.aZ,a=o.node,i=Dr(a);return Ir(r,function(r){var r=t(r),n=Ar(i,r);a=Tr(a,i,n,e),i=r})})}),Gr="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:function(r){return setTimeout(r,1e3/60)};function Ir(e,t){t(e);var a=0;function i(){a=1===a?0:(Gr(i),t(e),1)}return function(r,n){e=r,n?(t(e),2===a&&(a=1)):(0===a&&Gr(i),a=2)}}function u(r){return l(wn,"href",/^javascript:/i.test((r=r).replace(/\s/g,""))?"":r)}function Mr(r){return l(wn,"src",_r(r))}function Rr(r){return l(x,h([j("w-full pr-2")]),h([l(x,h([j("lg:hidden")]),h([Fn])),l(x,h([j("hidden lg:block w-full")]),h([function(r){return l(En,h([j("h-full w-full flex justify-end content-center justify-items-center gap-4 mr-4"),j("text-base")]),h([v(D,r,"/feastdayactivities","_self","Activities"),v(D,r,"/saints","_self","Saints"),v(D,r,"/animations","_self","Animations"),v(D,r,"/resources","_self","Resources"),v(D,r,"https://www.etsy.com/shop/CatholicStories","_blank","Shop"),v(D,r,"/give","_self","Give"),v(D,r,"/team","_self","About")]))}(r)]))]))}var zr,$=e,y=function(r){return{$:1,a:r}},Pr=n(function(r,n){return{$:3,a:r,b:n}}),Hr=n(function(r,n){return{$:0,a:r,b:n}}),Or=n(function(r,n){return{$:1,a:r,b:n}}),_=function(r){return{$:0,a:r}},Xr=function(r){return{$:2,a:r}},e=function(r){return r+""},Zr=r(function(r,n,e){for(;;){if(!e.b)return n;var t=e.b,a=r,i=l(r,e.a,n);r=a,n=i,e=t}}),k=function(r){return s(Zr,$,d,r)},Ur=I(function(r,n,e,t){return{$:0,a:r,b:n,c:e,d:t}}),Jr=[],Yr=X,Kr=n(function(r,n){return Z(n)/Z(r)}),Wr=Yr(l(Kr,2,32)),Qr=v(Ur,0,Wr,Jr,Jr),Vr=a,rn=i,nn=function(r){return r.length},en=n(function(r,n){return 0<t(r,n)?r:n}),tn=H,an=n(function(r,n){for(;;){var e=l(tn,32,r),t=e.b,e=l($,{$:0,a:e.a},n);if(!t.b)return k(e);r=t,n=e}}),on=n(function(r,n){for(;;){var e=Yr(n/32);if(1===e)return l(tn,32,r).a;r=l(an,r,d),n=e}}),un=n(function(r,n){var e,t;return n.a?(t=rn(l(Kr,32,(e=32*n.a)-1)),r=r?k(n.d):n.d,r=l(on,r,n.a),v(Ur,nn(n.c)+e,l(en,5,t*Wr),r,n.c)):v(Ur,nn(n.c),Wr,Jr,n.c)}),fn=M(function(r,n,e,t,a){for(;;){if(n<0)return l(un,!1,{d:t,a:e/32|0,c:a});var i={$:1,a:s(Vr,32,n,r)};r=r,n=n-32,e=e,t=l($,i,t),a=a}}),cn=n(function(r,n){var e;return 0<r?R(fn,n,r-(e=r%32)-32,r,d,s(Vr,e,r-e,n)):Qr}),w=function(r){return!r.$},X=function(r){return{$:0,a:r}},sn=function(r){switch(r.$){case 0:return 0;case 1:return 1;case 2:return 2;default:return 3}},ln=V,a=ln(0),vn=I(function(r,n,e,t){var a,i,o,u;return t.b?(a=t.a,(t=t.b).b?(i=t.a,(t=t.b).b?(o=t.a,(t=t.b).b?(u=t.b,l(r,a,l(r,i,l(r,o,l(r,t.a,500<e?s(Zr,r,n,k(u)):v(vn,r,n,e+1,u)))))):l(r,a,l(r,i,l(r,o,n)))):l(r,a,l(r,i,n))):l(r,a,n)):n}),dn=r(function(r,n,e){return v(vn,r,n,0,e)}),hn=n(function(e,r){return s(dn,n(function(r,n){return l($,e(r),n)}),d,r)}),bn=rr,gn=n(function(n,r){return l(bn,function(r){return ln(n(r))},r)}),pn=r(function(e,r,t){return l(bn,function(n){return l(bn,function(r){return ln(l(e,n,r))},t)},r)}),mn=cr,$n=n(function(r,n){return tr(l(bn,mn(r),n))}),i=r(function(r,n,e){return l(gn,function(r){return 0},(r=l(hn,$n(r),n),s(dn,pn($),ln(d),r)))}),yn=(p.Task={b:a,c:i,d:r(function(r,n,e){return ln(0)}),e:n(function(r,n){return l(gn,r,n)}),f:void 0},sr("Task"),lr(d)),_n=lr(d),x=c("div"),kn=Q,wn=n(function(r,n){return l($r,r,kn(n))}),j=wn("className"),xn=c("h1"),A=mr,C=n(function(r,n){return l(yr,function(r){return/^(on|formAction$)/i.test(r)?"data-"+r:r}(r),_r(n))}),H=c("br"),jn=Q,cr=n(function(r,n){return l($r,r,jn(n))})("hidden"),a=c("p"),i=n(function(r,n){return l($r,function(r){return"innerHTML"==r||"formAction"==r?"data-"+r:r}(r),_r(n))}),E=c("span"),T=o,o=l(x,h([j("text-center")]),h([l(x,d,h([l(a,d,h([A("Please reach out."),l(H,d,d),A("I love to hear from you!")])),l(a,h([l(T,"overflow-wrap","anywhere"),j("mt-3 lg:mt-5")]),h([l(E,h([l(T,"display","inline-block")]),h([A("trevor"),l(E,d,h([A("@")]))])),l(E,h([l(C,"ariaHidden","true"),l(i,"innerHTML",kn("🍯"))]),d),l(E,h([l(C,"ariaHidden","true"),l(i,"innerHTML",kn("spam@catholicstoriesforchildren.com"))]),d),l(E,h([l(yr,"height",e(0)),l(yr,"width",e(0)),l(T,"display","none"),cr(!0)]),h([A("spam@catholicstoriesforchildren.com")])),l(E,d,h([A("catholicstoriesforchildren"),l(E,d,h([A("."),l(E,d,h([A("com")]))]))]))]))]))])),H=l(x,h([j("h-screen"),j("bg-[#FEF7F4]"),j("p-10")]),h([l(xn,h([j("text-center"),j("my-10")]),h([A("Contact Us")])),o])),B=c("a"),i=wn("alt"),cr=c("footer"),o=c("img"),An=wn("target"),cr=l(cr,h([l(T,"padding",e(30)+"px"),l(T,"background-color","black"),l(T,"color","white"),l(T,"transform-style","preserve-3d")]),h([l(x,h([j("flex items-center gap-2.5")]),h([l(E,d,h([A("Follow us on")])),l(B,h([u("https://www.facebook.com/catholicstoriesforchildren"),l(C,"aria-label","CSC Facebook Page"),An("_blank")]),h([l(o,h([j("w-10 h-10"),Mr("https://ik.imagekit.io/catholicstories/f_logo_RGB-Blue_250_3vs-yhXer.png?updatedAt=1684277030198"),i("Facebook")]),d)])),l(B,h([u("https://www.instagram.com/catholicstoriesforchildren/"),l(C,"aria-label","CSC Instagram Page"),An("_blank")]),h([l(o,h([j("w-10 h-10"),Mr("https://ik.imagekit.io/catholicstories/Instagram_Glyph_Gradient_kFoMs9jIr.png?updatedAt=1684277127293"),i("Instagram")]),d)]))])),l(a,d,h([A("Copyright © 2023 Catholic Stories for Children. All rights reserved.")])),l(a,d,h([A("Catholic Stories for Children is a 501(c)(3) non-profit recognized by the IRS. Contributions to Catholic Stories for Children are tax-deductible to the extent permitted by law.  Tax ID Number: 85-4194883")]))])),Cn=c("header"),En=c("nav"),D=I(function(r,n,e,t){return l(B,h([u(n),j("flex items-center justify-center"),j("hover:scale-105 transition ease-in-out"),j("hover:border-b-4 hover:border-[#9101b3]"),j("rounded"),j("h-[60px] h-["+r+"]"),j("p-2"),l(C,"aria-label",t),An(e)]),h([A(t)]))}),Fn=l(B,h([u("/navigation"),j("space-y-2"),l(C,"aria-label","menu")]),h([l(x,h([j("w-8 h-0.5 m-auto bg-gray-600")]),d),l(x,h([j("w-8 h-0.5 m-auto bg-gray-600")]),d),l(x,h([j("w-8 h-0.5 m-auto bg-gray-600")]),d)])),e=l(o,h([Mr("/assets/logo_solid.svg"),l(T,"height","30px"),i(""),l(T,"vertical-align","middle")]),d),Nn=l(B,h([l(T,"text-decoration","none"),j("colorDarkGray"),u("/"),l(C,"aria-label","home")]),h([e])),E=n(function(r,n){var r="Catholic Stories for Children"===r?{a:"111px",b:Rr,c:"grid-cols-[150px_1fr_150px] lg:grid-cols-[150px_1fr_600px]"}:{a:"60px",b:Rr,c:"grid-cols-[150px_1fr_150px] lg:grid-cols-[150px_1fr_600px]"},e=r.a,t=r.b,r=r.c;return l(Cn,h([l(T,"background-color","#3d5d75"),l(T,"background-image","linear-gradient(130deg, #9DE2EB , #EBD6F1)"),j("h-[60px] md:h-["+e+"]"),j("colorDarkGray"),j("grid items-center justify-items-center"),j(r)]),h([Nn,l(B,h([l(T,"text-decoration","none"),j("colorDarkGray"),j("invisible md:visible"),j("justify-self-start"),u("/")]),h([l(xn,h([l(T,"font-family","hvdComicSerifPro"),l(T,"margin","0px"),j("text-[0px] md:text-xl")]),h([A("Catholic Stories for Children")]))])),t(e)]))}),Sn=l(x,d,h([l(E,"Contact",10),H,cr])),a=(zr={aF:{},aX:function(r){return function(r){return r}},aZ:function(r){return Sn}},qr({aF:function(r){return{a:zr.aF,b:yn}},aU:function(r){return _n},aX:n(function(r,n){return{a:l(zr.aX,r,n),b:yn}}),aZ:zr.aZ}));o={Contact:{Main:{init:a(X(0))(0)}}},q.Elm?function r(n,e){for(var t in e)t in n?"init"==t?O(6):r(n[t],e[t]):n[t]=e[t]}(q.Elm,o):q.Elm=o}(this);