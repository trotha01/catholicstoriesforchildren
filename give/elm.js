!function(G){"use strict";function I(r,n,e){return e.a=r,e.f=n,e}function n(e){return I(2,e,function(n){return function(r){return e(n,r)}})}function r(t){return I(3,t,function(e){return function(n){return function(r){return t(e,n,r)}}})}function M(a){return I(4,a,function(t){return function(e){return function(n){return function(r){return a(t,e,n,r)}}}})}function R(o){return I(5,o,function(a){return function(t){return function(e){return function(n){return function(r){return o(a,t,e,n,r)}}}}})}function l(r,n,e){return 2===r.a?r.f(n,e):r(n)(e)}function s(r,n,e,t){return 3===r.a?r.f(n,e,t):r(n)(e)(t)}function d(r,n,e,t,a){return 4===r.a?r.f(n,e,t,a):r(n)(e)(t)(a)}function z(r,n,e,t,a,o){return 5===r.a?r.f(n,e,t,a,o):r(n)(e)(t)(a)(o)}function t(r,n,e){if("object"!=typeof r)return r===n?0:r<n?-1:1;if(void 0===r.$)return(e=(e=t(r.a,n.a))||t(r.b,n.b))||t(r.c,n.c);for(;r.b&&n.b&&!(e=t(r.a,n.a));r=r.b,n=n.b);return e||(r.b?1:n.b?-1:0)}var B=0;var v={$:0};function H(r,n){return{$:1,a:r,b:n}}var O=n(H);function h(r){for(var n=v,e=r.length;e--;)n={$:1,a:r[e],b:n};return n}var e=r(function(r,n,e){for(var t=Array(r),a=0;a<r;a++)t[a]=e(n+a);return t}),a=n(function(r,n){for(var e=Array(r),t=0;t<r&&n.b;t++)e[t]=n.a,n=n.b;return e.length=t,{a:e,b:n}});function W(r){throw Error("https://github.com/elm/core/blob/1.0.0/hints/"+r+".md")}var o=Math.ceil,i=Math.floor,q=Math.log;var Z=n(b);function b(r,n){switch(r.$){case 2:return r.b(n);case 5:return null===n?Vr(r.c):p("null",n);case 3:return V(n)?Y(r.b,n,h):p("a LIST",n);case 4:return V(n)?Y(r.b,n,U):p("an ARRAY",n);case 6:var e=r.d;return"object"==typeof n&&null!==n&&e in n?(o=b(r.b,n[e]),k(o)?o:$(l(Zr,e,o.a))):p("an OBJECT with a field named `"+e+"`",n);case 7:e=r.e;return V(n)?e<n.length?(o=b(r.b,n[e]),k(o)?o:$(l(Yr,e,o.a))):p("a LONGER array. Need index "+e+" but only see "+n.length+" entries",n):p("an ARRAY",n);case 8:if("object"!=typeof n||null===n||V(n))return p("an OBJECT",n);var t,a=v;for(t in n)if(n.hasOwnProperty(t)){var o=b(r.b,n[t]);if(!k(o))return $(l(Zr,t,o.a));a={$:1,a:{a:t,b:o.a},b:a}}return Vr(Xr(a));case 9:for(var i=r.f,u=r.g,c=0;c<u.length;c++){o=b(u[c],n);if(!k(o))return o;i=i(o.a)}return Vr(i);case 10:o=b(r.b,n);return k(o)?b(r.h(o.a),n):o;case 11:for(var f=v,s=r.g;s.b;s=s.b){o=b(s.a,n);if(k(o))return o;f={$:1,a:o.a,b:f}}return $(Ur(Xr(f)));case 1:return $(l(qr,r.a,n));case 0:return Vr(r.a)}}function Y(r,n,e){for(var t=n.length,a=Array(t),o=0;o<t;o++){var i=b(r,n[o]);if(!k(i))return $(l(Yr,o,i.a));a[o]=i.a}return Vr(e(a))}function V(r){return Array.isArray(r)||"undefined"!=typeof FileList&&r instanceof FileList}function U(n){return l(bn,n.length,function(r){return n[r]})}function p(r,n){return $(l(qr,"Expecting "+r,n))}function c(r,n){if(r===n)return!0;if(r.$!==n.$)return!1;switch(r.$){case 0:case 1:return r.a===n.a;case 2:return r.b===n.b;case 5:return r.c===n.c;case 3:case 4:case 8:return c(r.b,n.b);case 6:return r.d===n.d&&c(r.b,n.b);case 7:return r.e===n.e&&c(r.b,n.b);case 9:return r.f===n.f&&J(r.g,n.g);case 10:return r.h===n.h&&c(r.b,n.b);case 11:return J(r.g,n.g)}}function J(r,n){var e=r.length;if(e!==n.length)return!1;for(var t=0;t<e;t++)if(!c(r[t],n[t]))return!1;return!0}function K(r){return r}function X(r){return{$:0,a:r}}var Q=n(function(r,n){return{$:3,b:r,d:n}});var rr=0;function nr(r){r={$:0,e:rr++,f:r,g:null,h:[]};return ir(r),r}function er(n){return{$:2,b:function(r){r({$:0,a:nr(n)})},c:null}}function tr(r,n){r.h.push(n),ir(r)}var ar=!1,or=[];function ir(r){if(or.push(r),!ar){for(ar=!0;r=or.shift();)!function(n){for(;n.f;){var r=n.f.$;if(0===r||1===r){for(;n.g&&n.g.$!==r;)n.g=n.g.i;if(!n.g)return;n.f=n.g.b(n.f.a),n.g=n.g.i}else{if(2===r)return n.f.c=n.f.b(function(r){n.f=r,ir(n)});if(5===r){if(0===n.h.length)return;n.f=n.f.b(n.h.shift())}else n.g={$:3===r?0:1,b:n.f.b,i:n.g},n.f=n.f.d}}}(r);ar=!1}}function ur(r,n,e,t,a,o){var r=l(Z,r,n?n.flags:void 0),i=(k(r)||W(2),{}),n=e(r.a),u=n.a,c=o(f,u),e=function(r,n){var e,t;for(t in g){var a=g[t];a.a&&((e=e||{})[t]=a.a(t,n)),r[t]=function(r,n){var t={g:n,h:void 0},a=r.c,o=r.d,i=r.e,u=r.f;function c(e){return l(Q,c,{$:5,b:function(r){var n=r.a;return 0===r.$?s(o,t,n,e):i&&u?d(a,t,n.i,n.j,e):s(a,t,i?n.i:n.j,e)}})}return t.h=nr(l(Q,c,r.b))}(a,n)}return e}(i,f);function f(r,n){r=l(t,r,u);c(u=r.a,n),vr(i,r.b,a(u))}return vr(i,n.b,a(u)),e?{ports:e}:{}}var g={};var cr=n(function(n,e){return{$:2,b:function(r){n.g(e),r({$:0,a:B})},c:null}});function fr(n){return function(r){return{$:1,k:n,l:r}}}function sr(r){return{$:2,m:r}}var lr=[],dr=!1;function vr(r,n,e){if(lr.push({p:r,q:n,r:e}),!dr){dr=!0;for(var t;t=lr.shift();)!function(r,n,e){var t,a={};for(t in hr(!0,n,a,null),hr(!1,e,a,null),r)tr(r[t],{$:"fx",a:a[t]||{i:v,j:v}})}(t.p,t.q,t.r);dr=!1}}function hr(r,n,e,t){switch(n.$){case 1:var a=n.k,o=function(r,n,e,t){function a(r){for(var n=e;n;n=n.t)r=n.s(r);return r}return l(r?g[n].e:g[n].f,a,t)}(r,a,t,n.l);return void(e[a]=function(r,n,e){return e=e||{i:v,j:v},r?e.i={$:1,a:n,b:e.i}:e.j={$:1,a:n,b:e.j},e}(r,o,e[a]));case 2:for(var i=n.m;i.b;i=i.b)hr(r,i.a,e,t);return;case 3:hr(r,n.o,e,{s:n.n,t:t})}}var br;var pr="undefined"!=typeof document?document:{};function gr(r){return{$:0,a:r}}var f=n(function(o,i){return n(function(r,n){for(var e=[],t=0;n.b;n=n.b){var a=n.a;t+=a.b||0,e.push(a)}return t+=e.length,{$:1,c:i,d:$r(r),e:e,f:o,b:t}})})(void 0);n(function(o,i){return n(function(r,n){for(var e=[],t=0;n.b;n=n.b){var a=n.a;t+=a.b.b||0,e.push(a)}return t+=e.length,{$:2,c:i,d:$r(r),e:e,f:o,b:t}})})(void 0);var u=n(function(r,n){return{$:"a1",n:r,o:n}}),mr=n(function(r,n){return{$:"a2",n:r,o:n}}),m=n(function(r,n){return{$:"a3",n:r,o:n}});function yr(r){return/^javascript:/i.test(r.replace(/\s/g,""))?"":r}function xr(r){return/^\s*(javascript:|data:text\/html)/i.test(r)?"":r}var wr;function $r(r){for(var n={};r.b;r=r.b){var e,t=r.a,a=t.$,o=t.n,t=t.o;"a2"===a?"className"===o?kr(n,o,t):n[o]=t:(e=n[a]||(n[a]={}),"a3"===a&&"class"===o?kr(e,o,t):e[o]=t)}return n}function kr(r,n,e){var t=r[n];r[n]=t?t+" "+e:e}function y(r,n){var e=r.$;if(5===e)return y(r.k||(r.k=r.m()),n);if(0===e)return pr.createTextNode(r.a);if(4===e){for(var t=r.k,a=r.j;4===t.$;)"object"!=typeof a?a=[a,t.j]:a.push(t.j),t=t.k;var o={j:a,p:n};(i=y(t,o)).elm_event_node_ref=o}else if(3===e)_r(i=r.h(r.g),n,r.d);else{var i=r.f?pr.createElementNS(r.f,r.c):pr.createElement(r.c);br&&"a"==r.c&&i.addEventListener("click",br(i)),_r(i,n,r.d);for(var u=r.e,c=0;c<u.length;c++)i.appendChild(y(1===e?u[c]:u[c].b,n))}return i}function _r(r,n,e){for(var t in e){var a=e[t];"a1"===t?function(r,n){var e,t=r.style;for(e in n)t[e]=n[e]}(r,a):"a0"===t?function(r,n,e){var t,a=r.elmFs||(r.elmFs={});for(t in e){var o=e[t],i=a[t];if(o){if(i){if(i.q.$===o.$){i.q=o;continue}r.removeEventListener(t,i)}i=function(c,r){function f(r){var n=f.q,e=b(n.a,r);if(k(e)){for(var t,n=pn(n),e=e.a,a=n?n<3?e.a:e.r:e,o=1==n?e.b:3==n&&e.O,i=(o&&r.stopPropagation(),(2==n?e.b:3==n&&e.L)&&r.preventDefault(),c);t=i.j;){if("function"==typeof t)a=t(a);else for(var u=t.length;u--;)a=t[u](a);i=i.p}i(a,o)}}return f.q=r,f}(n,o),r.addEventListener(t,i,wr&&{passive:pn(o)<2}),a[t]=i}else r.removeEventListener(t,i),a[t]=void 0}}(r,n,a):"a3"===t?function(r,n){for(var e in n){var t=n[e];void 0!==t?r.setAttribute(e,t):r.removeAttribute(e)}}(r,a):"a4"===t?function(r,n){for(var e in n){var t=n[e],a=t.f,t=t.o;void 0!==t?r.setAttributeNS(a,e,t):r.removeAttributeNS(a,e)}}(r,a):("value"!==t&&"checked"!==t||r[t]!==a)&&(r[t]=a)}}try{window.addEventListener("t",null,Object.defineProperty({},"passive",{get:function(){wr=!0}}))}catch(r){}function Cr(r,n){var e=[];return E(r,n,e,0),e}function S(r,n,e,t){n={$:n,r:e,s:t,t:void 0,u:void 0};return r.push(n),n}function E(r,n,e,t){if(r!==n){var a=r.$,o=n.$;if(a!==o){if(1!==a||2!==o)return void S(e,0,t,n);n=function(r){for(var n=r.e,e=n.length,t=Array(e),a=0;a<e;a++)t[a]=n[a].b;return{$:1,c:r.c,d:r.d,e:t,f:r.f,b:r.b}}(n),o=1}switch(o){case 5:for(var i=r.l,u=n.l,c=i.length,f=c===u.length;f&&c--;)f=i[c]===u[c];if(f)return void(n.k=r.k);n.k=n.m();var s=[];return E(r.k,n.k,s,0),void(0<s.length&&S(e,1,t,s));case 4:for(var l=r.j,d=n.j,v=!1,h=r.k;4===h.$;)v=!0,"object"!=typeof l?l=[l,h.j]:l.push(h.j),h=h.k;for(var b=n.k;4===b.$;)v=!0,"object"!=typeof d?d=[d,b.j]:d.push(b.j),b=b.k;return v&&l.length!==d.length?void S(e,0,t,n):((v?function(r,n){for(var e=0;e<r.length;e++)if(r[e]!==n[e])return;return 1}(l,d):l===d)||S(e,2,t,d),void E(h,b,e,t+1));case 0:return void(r.a!==n.a&&S(e,3,t,n.a));case 1:return void Ar(r,n,e,t,Nr);case 2:return void Ar(r,n,e,t,Sr);case 3:if(r.h!==n.h)return void S(e,0,t,n);s=jr(r.d,n.d),s=(s&&S(e,4,t,s),n.i(r.g,n.g));s&&S(e,5,t,s)}}}function Ar(r,n,e,t,a){var o;r.c!==n.c||r.f!==n.f?S(e,0,t,n):((o=jr(r.d,n.d))&&S(e,4,t,o),a(r,n,e,t))}function jr(r,n,e){var t,a,o,i,u;for(a in r)"a1"===a||"a0"===a||"a3"===a||"a4"===a?(o=jr(r[a],n[a]||{},a))&&((t=t||{})[a]=o):a in n?(o=r[a])===(i=n[a])&&"value"!==a&&"checked"!==a||"a0"===e&&function(r,n){return r.$==n.$&&c(r.a,n.a)}(o,i)||((t=t||{})[a]=i):(t=t||{})[a]=e?"a1"===e?"":"a0"===e||"a3"===e?void 0:{f:r[a].f,o:void 0}:"string"==typeof r[a]?"":null;for(u in n)u in r||((t=t||{})[u]=n[u]);return t}function Nr(r,n,e,t){var a=r.e,o=n.e,r=a.length,n=o.length;n<r?S(e,6,t,{v:n,i:r-n}):r<n&&S(e,7,t,{v:r,e:o});for(var i=r<n?r:n,u=0;u<i;u++){var c=a[u];E(c,o[u],e,++t),t+=c.b||0}}function Sr(r,n,e,t){for(var a=[],o={},i=[],u=r.e,c=n.e,f=u.length,s=c.length,l=0,d=0,v=t;l<f&&d<s;){var h=u[l],b=c[d],p=h.a,g=b.a,m=h.b,y=b.b,x=void 0,w=void 0;if(p===g)E(m,y,a,++v),v+=m.b||0,l++,d++;else{var $,k,_,C,A=u[l+1],j=c[d+1];if(A&&(k=A.b,w=g===($=A.a)),j&&(C=j.b,x=p===(_=j.a)),x&&w)E(m,C,a,++v),Lr(o,a,p,y,d,i),v+=m.b||0,Tr(o,a,p,k,++v),v+=k.b||0,l+=2,d+=2;else if(x)v++,Lr(o,a,g,y,d,i),E(m,C,a,v),v+=m.b||0,l+=1,d+=2;else if(w)Tr(o,a,p,m,++v),v+=m.b||0,E(k,y,a,++v),v+=k.b||0,l+=2,d+=1;else{if(!A||$!==_)break;Tr(o,a,p,m,++v),Lr(o,a,g,y,d,i),v+=m.b||0,E(k,C,a,++v),v+=k.b||0,l+=2,d+=2}}}for(;l<f;){m=(h=u[l]).b;Tr(o,a,h.a,m,++v),v+=m.b||0,l++}for(;d<s;){var N=N||[];Lr(o,a,(b=c[d]).a,b.b,void 0,N),d++}(0<a.length||0<i.length||N)&&S(e,8,t,{w:a,x:i,y:N})}var Er="_elmW6BL";function Lr(r,n,e,t,a,o){var i,u=r[e];u?1===u.c?(o.push({r:a,A:u}),u.c=2,E(u.z,t,i=[],u.r),u.r=a,u.s.s={w:i,A:u}):Lr(r,n,e+Er,t,a,o):(o.push({r:a,A:u={c:0,z:t,r:a,s:void 0}}),r[e]=u)}function Tr(r,n,e,t,a){var o,i=r[e];i?0===i.c?(i.c=2,E(t,i.z,o=[],a),S(n,9,a,{w:o,A:i})):Tr(r,n,e+Er,t,a):(o=S(n,9,a,void 0),r[e]={c:1,z:t,r:a,s:o})}function Pr(r,n,e,t){!function r(n,e,t,a,o,i,u){var c=t[a];var f=c.r;for(;f===o;){var s,l=c.$;if(1===l?Pr(n,e.k,c.s,u):8===l?(c.t=n,c.u=u,0<(s=c.s.w).length&&r(n,e,s,0,o,i,u)):9===l?(c.t=n,c.u=u,(l=c.s)&&(l.A.s=n,0<(s=l.w).length)&&r(n,e,s,0,o,i,u)):(c.t=n,c.u=u),!(c=t[++a])||(f=c.r)>i)return a}var d=e.$;if(4===d){for(var v=e.k;4===v.$;)v=v.k;return r(n,v,t,a,o+1,i,n.elm_event_node_ref)}var h=e.e;var b=n.childNodes;for(var p=0;p<h.length;p++){var g=1===d?h[p]:h[p].b,m=++o+(g.b||0);if(o<=f&&f<=m&&(a=r(b[p],g,t,a,o,m,u),!(c=t[a])||(f=c.r)>i))return a;o=m}return a}(r,n,e,0,0,n.b,t)}function Dr(r,n,e,t){return 0===e.length?r:(Pr(r,n,e,t),Fr(r,e))}function Fr(r,n){for(var e=0;e<n.length;e++){var t=n[e],a=t.t,t=function(r,n){switch(n.$){case 0:return function(r,n,e){var t=r.parentNode,n=y(n,e);n.elm_event_node_ref||(n.elm_event_node_ref=r.elm_event_node_ref);t&&n!==r&&t.replaceChild(n,r);return n}(r,n.s,n.u);case 4:return _r(r,n.u,n.s),r;case 3:return r.replaceData(0,r.length,n.s),r;case 1:return Fr(r,n.s);case 2:return r.elm_event_node_ref?r.elm_event_node_ref.j=n.s:r.elm_event_node_ref={j:n.s,p:n.u},r;case 6:for(var e=n.s,t=0;t<e.i;t++)r.removeChild(r.childNodes[e.v]);return r;case 7:for(var a=(e=n.s).e,t=e.v,o=r.childNodes[t];t<a.length;t++)r.insertBefore(y(a[t],n.u),o);return r;case 9:var i;return(e=n.s)?(void 0!==(i=e.A).r&&r.parentNode.removeChild(r),i.s=Fr(r,e.w)):r.parentNode.removeChild(r),r;case 8:return function(r,n){for(var e=n.s,t=function(r,n){if(r){for(var e=pr.createDocumentFragment(),t=0;t<r.length;t++){var a=r[t].A;e.appendChild(2===a.c?a.s:y(a.z,n.u))}return e}}(e.y,n),a=(r=Fr(r,e.w),e.x),o=0;o<a.length;o++){var i=a[o],u=i.A,u=2===u.c?u.s:y(u.z,n.u);r.insertBefore(u,r.childNodes[i.r])}t&&r.appendChild(t);return r}(r,n);case 5:return n.s(r);default:W(10)}}(a,t);a===r&&(r=t)}return r}function Gr(r){if(3===r.nodeType)return{$:0,a:r.textContent};if(1!==r.nodeType)return{$:0,a:""};for(var n=v,e=r.attributes,t=e.length;t--;)var a=e[t],n={$:1,a:l(m,a.name,a.value),b:n};for(var o=r.tagName.toLowerCase(),i=v,u=r.childNodes,t=u.length;t--;)i={$:1,a:Gr(u[t]),b:i};return s(f,o,n,i)}var Ir=M(function(n,r,e,i){return ur(r,i,n.aH,n.aZ,n.aW,function(e,r){var t=n.a$,a=i.node,o=Gr(a);return Rr(r,function(r){var r=t(r),n=Cr(o,r);a=Dr(a,o,n,e),o=r})})}),Mr="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:function(r){return setTimeout(r,1e3/60)};function Rr(e,t){t(e);var a=0;function o(){a=1===a?0:(Mr(o),t(e),1)}return function(r,n){e=r,n?(t(e),2===a&&(a=1)):(0===a&&Mr(o),a=2)}}function zr(r){return l(m,"height",Jr(r))}function x(r){return l(j,"src",xr(r))}function Br(r){return l(m,"width",Jr(r))}function w(r){return l(j,"href",yr(r))}function Hr(r){return l(_,h([L("w-full pr-2")]),h([l(_,h([L("lg:hidden")]),h([zn])),l(_,h([L("hidden lg:block w-full")]),h([function(r){return l(Rn,h([L("h-full w-full flex justify-end content-center justify-items-center gap-4 mr-4"),L("text-base")]),h([d(F,r,"/feastdayactivities","_self","Activities"),d(F,r,"/saints","_self","Saints"),d(F,r,"/animations","_self","Animations"),d(F,r,"/resources","_self","Resources"),d(F,r,"https://www.etsy.com/shop/CatholicStories","_blank","Shop"),d(F,r,"/give","_self","Give"),d(F,r,"/team","_self","About")]))}(r)]))]))}var Or,Wr=O,$=function(r){return{$:1,a:r}},qr=n(function(r,n){return{$:3,a:r,b:n}}),Zr=n(function(r,n){return{$:0,a:r,b:n}}),Yr=n(function(r,n){return{$:1,a:r,b:n}}),Vr=function(r){return{$:0,a:r}},Ur=function(r){return{$:2,a:r}},Jr=function(r){return r+""},Kr=r(function(r,n,e){for(;;){if(!e.b)return n;var t=e.b,a=r,o=l(r,e.a,n);r=a,n=o,e=t}}),Xr=function(r){return s(Kr,Wr,v,r)},Qr=M(function(r,n,e,t){return{$:0,a:r,b:n,c:e,d:t}}),rn=[],nn=o,en=n(function(r,n){return q(n)/q(r)}),tn=nn(l(en,2,32)),an=d(Qr,0,tn,rn,rn),on=e,un=i,cn=function(r){return r.length},fn=n(function(r,n){return 0<t(r,n)?r:n}),sn=a,ln=n(function(r,n){for(;;){var e=l(sn,32,r),t=e.b,e=l(Wr,{$:0,a:e.a},n);if(!t.b)return Xr(e);r=t,n=e}}),dn=n(function(r,n){for(;;){var e=nn(n/32);if(1===e)return l(sn,32,r).a;r=l(ln,r,v),n=e}}),vn=n(function(r,n){var e,t;return n.a?(t=un(l(en,32,(e=32*n.a)-1)),r=r?Xr(n.d):n.d,r=l(dn,r,n.a),d(Qr,cn(n.c)+e,l(fn,5,t*tn),r,n.c)):d(Qr,cn(n.c),tn,rn,n.c)}),hn=R(function(r,n,e,t,a){for(;;){if(n<0)return l(vn,!1,{d:t,a:e/32|0,c:a});var o={$:1,a:s(on,32,n,r)};r=r,n=n-32,e=e,t=l(Wr,o,t),a=a}}),bn=n(function(r,n){var e;return 0<r?z(hn,n,r-(e=r%32)-32,r,v,s(on,e,r-e,n)):an}),k=function(r){return!r.$},O=function(r){return{$:0,a:r}},pn=function(r){switch(r.$){case 0:return 0;case 1:return 1;case 2:return 2;default:return 3}},gn=X,o=gn(0),mn=M(function(r,n,e,t){var a,o,i,u;return t.b?(a=t.a,(t=t.b).b?(o=t.a,(t=t.b).b?(i=t.a,(t=t.b).b?(u=t.b,l(r,a,l(r,o,l(r,i,l(r,t.a,500<e?s(Kr,r,n,Xr(u)):d(mn,r,n,e+1,u)))))):l(r,a,l(r,o,l(r,i,n)))):l(r,a,l(r,o,n))):l(r,a,n)):n}),yn=r(function(r,n,e){return d(mn,r,n,0,e)}),xn=n(function(e,r){return s(yn,n(function(r,n){return l(Wr,e(r),n)}),v,r)}),wn=Q,$n=n(function(n,r){return l(wn,function(r){return gn(n(r))},r)}),kn=r(function(e,r,t){return l(wn,function(n){return l(wn,function(r){return gn(l(e,n,r))},t)},r)}),_n=cr,Cn=n(function(r,n){return er(l(wn,_n(r),n))}),e=r(function(r,n,e){return l($n,function(r){return 0},(r=l(xn,Cn(r),n),s(yn,kn(Wr),gn(v),r)))}),An=(g.Task={b:o,c:e,d:r(function(r,n,e){return gn(0)}),e:n(function(r,n){return l($n,r,n)}),f:void 0},fr("Task"),sr(v)),jn=sr(v),_=f("div"),C=u,A=f("a"),Nn=K,j=n(function(r,n){return l(mr,r,Nn(n))}),i=j("alt"),N=n(function(r,n){return l(m,function(r){return/^(on|formAction$)/i.test(r)?"data-"+r:r}(r),xr(n))}),L=j("className"),a=f("p"),T=gr,cr=l(_,h([L("text-xl mb-10")]),h([l(a,h([l(C,"margin-bottom","1em")]),h([T("Your support helps make these animations and our work possible. Whether you support financially, via prayers, sending words of encouragement, or voluntary services, we are eternally grateful. 🙏")])),l(a,h([L("m-auto"),L("max-w-3xl")]),h([T("Catholic Stories for Children is a 501(c)(3) non-profit recognized by the IRS. Contributions to Catholic Stories for Children are tax-deductible to the extent permitted by law. Tax ID Number: 85-4194883")]))])),Sn=f("h3"),o=n(function(r,n){return l(_,h([l(C,"margin-bottom","100px"),l(C,"background-color","white"),l(C,"color","black"),l(C,"max-width","600px"),l(C,"border-radius","5px"),L("p-5")]),h([l(_,h([L("pb-5 m-1")]),h([l(Sn,h([L("text-center text-xl")]),h([T(r)]))])),l(_,h([l(C,"text-align","center"),l(C,"left","50%"),l(C,"position","relative"),l(C,"transform","translate(-50%)")]),h([n]))]))}),e=f("form"),u=f("img"),En=f("input"),P=j("method"),Ln=j("name"),Tn=j("target"),D=j("title"),Pn=j("type"),Dn=j("value"),e=l(o,"Donate via Paypal",l(_,h([l(C,"margin","auto"),l(C,"width","200px"),l(C,"text-align","center")]),h([l(e,h([l(j,"action","https://www.paypal.com/donate"),P("post"),Tn("_top")]),h([l(En,h([Pn("hidden"),Ln("hosted_button_id"),Dn("ZA5YPU8KU6SL8")]),v),l(En,h([Pn("image"),x("https://pics.paypal.com/00/s/ODVkNTk0NzktMmNmYy00NGVmLWI3NDMtZGRmMjZmNGNhZTk5/file.PNG"),l(C,"border","0"),Ln("submit"),D("PayPal - The safer, easier way to pay online!"),i("Donate with PayPal button"),l(C,"width","200px")]),v),l(u,h([i(""),l(C,"border","0"),x("https://www.paypal.com/en_US/i/scr/pixel.gif"),Br(1),zr(1)]),v)]))]))),P=m("rel"),Dn=l(o,"Donate Your Vehicle",l(A,h([w("http://www.cars2charities.org/donation?donateto=1585"),P("noopener"),Tn("_blank"),l(C,"text-decoration","none"),D("Donate your Vehicle"),l(C,"padding","10px 20px"),l(C,"box-shadow","#777 1px 1px 5px"),l(C,"border-radius","5px")]),h([T("Cars 2 Charities")]))),Fn=f("h1"),En=f("h2"),Pn=l(o,"Pray for us",l(a,h([l(C,"text-align","center"),l(C,"width","80%"),l(C,"left","50%"),l(C,"position","relative"),l(C,"transform","translate(-50%)")]),h([T("We believe in the power of prayer. Please pray for us in this work. We are praying for you. 🙏")]))),Gn=K,Ln=n(function(r,n){return l(mr,r,Gn(n))})("hidden"),P=n(function(r,n){return l(mr,function(r){return"innerHTML"==r||"formAction"==r?"data-"+r:r}(r),xr(n))}),D=f("span"),P=l(D,v,h([l(D,h([l(C,"display","inline-block")]),h([T("trevor"),l(D,v,h([T("@")]))])),l(D,h([l(N,"ariaHidden","true"),l(P,"innerHTML",Nn("🍯"))]),v),l(D,h([l(N,"ariaHidden","true"),l(P,"innerHTML",Nn("spam@catholicstoriesforchildren.com"))]),v),l(D,h([zr(0),Br(0),l(C,"display","none"),Ln(!0)]),h([T("spam@catholicstoriesforchildren.com")])),l(D,v,h([T("catholicstoriesforchildren"),l(D,v,h([T("."),l(D,v,h([T("com")]))]))]))])),Ln=l(o,"Sponsorship",l(_,h([l(C,"text-align","center"),l(C,"left","50%"),l(C,"position","relative"),l(C,"transform","translate(-50%)")]),h([l(a,v,h([T(" Interested in becoming a sponsor? Please send us a message! ")])),P]))),In=l(o,"Volunteer",l(_,h([l(C,"text-align","center"),l(C,"width","80%"),l(C,"left","50%"),l(C,"position","relative"),l(C,"transform","translate(-50%)")]),h([l(a,v,h([T(" Interested in volunteering your talents or pro bono work? ")])),l(a,v,h([T(" We could use your help reviewing scripts, storyboards, and animatics. Please let us know! ")])),P]))),o=l(o,"Words of Encouragement",l(_,h([l(C,"text-align","center"),l(C,"width","80%"),l(C,"left","50%"),l(C,"position","relative"),l(C,"transform","translate(-50%)")]),h([l(a,v,h([T("Sending words of encouragement are greatly appreciated. Let us build each other up in the faith. ")])),l(a,h([L("mt-5")]),h([T(' "Encourage one another and build one another up." ')])),l(a,h([L("mb-5")]),h([T("1 Th 5:11")])),P]))),P=l(_,h([L("m-auto"),L("max-w-3xl py-5 px-11")]),h([l(Fn,h([L("mb-10")]),h([T("Give")])),cr,l(A,h([w("/animations/actofcontrition"),L("hover:scale-105 transition ease-in-out duration-50"),l(N,"aria-label","Act of Contrition Animation Coming Soon"),L("block mt-20 mb-2")]),h([l(u,h([x("/assets/images/AnimationImageLinks/ActOfContritionComingSoon.png"),l(C,"border-radius","5px"),l(C,"width","-webkit-fill-available"),i("Act of Contrition Animation")]),v)])),l(_,h([l(C,"margin-bottom","6em")]),v),l(En,h([L("text-center")]),h([T("Other ways to give")])),l(_,h([l(C,"margin-bottom","4em")]),v),Pn,e,Dn,Ln,In,o])),cr=l(f("footer"),h([l(C,"padding",Jr(30)+"px"),l(C,"background-color","black"),l(C,"color","white"),l(C,"transform-style","preserve-3d")]),h([l(_,h([L("flex items-center gap-2.5")]),h([l(D,v,h([T("Follow us on")])),l(A,h([w("https://www.facebook.com/catholicstoriesforchildren"),l(N,"aria-label","CSC Facebook Page"),Tn("_blank")]),h([l(u,h([L("w-10 h-10"),x("https://ik.imagekit.io/catholicstories/f_logo_RGB-Blue_250_3vs-yhXer.png?updatedAt=1684277030198"),i("Facebook")]),v)])),l(A,h([w("https://www.instagram.com/catholicstoriesforchildren/"),l(N,"aria-label","CSC Instagram Page"),Tn("_blank")]),h([l(u,h([L("w-10 h-10"),x("https://ik.imagekit.io/catholicstories/Instagram_Glyph_Gradient_kFoMs9jIr.png?updatedAt=1684277127293"),i("Instagram")]),v)]))])),l(a,v,h([T("Copyright © 2024 Catholic Stories for Children. All rights reserved.")])),l(a,v,h([T("Catholic Stories for Children is a 501(c)(3) non-profit recognized by the IRS. Contributions to Catholic Stories for Children are tax-deductible to the extent permitted by law.  Tax ID Number: 85-4194883")]))])),Mn=f("header"),Rn=f("nav"),F=M(function(r,n,e,t){return l(A,h([w(n),L("flex items-center justify-center"),L("hover:scale-105 transition ease-in-out"),L("hover:border-b-4 hover:border-[#9101b3]"),L("rounded"),L("h-[60px] h-["+r+"]"),L("p-2"),l(N,"aria-label",t),Tn(e)]),h([T(t)]))}),zn=l(A,h([w("/navigation"),L("space-y-2"),l(N,"aria-label","menu")]),h([l(_,h([L("w-8 h-0.5 m-auto bg-gray-600")]),v),l(_,h([L("w-8 h-0.5 m-auto bg-gray-600")]),v),l(_,h([L("w-8 h-0.5 m-auto bg-gray-600")]),v)])),Bn=n(function(r,n){var r=r?{a:"text-[0px] md:text-xl",b:"invisible md:visible"}:{a:"text-lg md:text-xl",b:""},e=r.a,r=r.b;return l(A,h([l(C,"text-decoration","none"),L("colorDarkGray"),L(r),L("justify-self-start"),w("/")]),h([l(Fn,h([l(C,"font-family","hvdComicSerifPro"),l(C,"margin","0px"),L(e)]),h([T("Catholic Stories for Children")]))]))}),En=l(u,h([x("/assets/logo_solid.svg"),l(C,"height","30px"),i(""),l(C,"vertical-align","middle")]),v),Hn=l(A,h([l(C,"text-decoration","none"),L("colorDarkGray"),w("/"),l(N,"aria-label","home")]),h([En])),Pn=n(function(r,n){var e="Catholic Stories for Children"===r?{a:"111px",b:Hr,c:"grid-cols-[150px_1fr_150px] lg:grid-cols-[150px_1fr_600px]"}:{a:"60px",b:Hr,c:"grid-cols-[150px_1fr_150px] lg:grid-cols-[150px_1fr_600px]"},t=e.a,a=e.b,e=e.c;return l(Mn,h([l(C,"background-color","#3d5d75"),l(C,"background-image","linear-gradient(130deg, #9DE2EB , #EBD6F1)"),L("h-[60px] md:h-["+t+"]"),L("colorDarkGray"),L("grid items-center justify-items-center"),L(e)]),h([Hn,l(Bn,!0,r),a(t)]))}),On=l(_,h([l(C,"height","100vh"),l(C,"overflow-x","hidden"),l(C,"overflow-y","auto"),l(C,"perspective","300px"),l(C,"scroll-behavior","smooth"),l(C,"background-color","#FEF7F4")]),h([l(Pn,"Give",10),P,cr])),e=(Or={aH:{},aZ:function(r){return function(r){return r}},a$:function(r){return On}},Ir({aH:function(r){return{a:Or.aH,b:An}},aW:function(r){return jn},aZ:n(function(r,n){return{a:l(Or.aZ,r,n),b:An}}),a$:Or.a$}));Dn={Give:{Main:{init:e(O(0))(0)}}},G.Elm?function r(n,e){for(var t in e)t in n?"init"==t?W(6):r(n[t],e[t]):n[t]=e[t]}(G.Elm,Dn):G.Elm=Dn}(this);