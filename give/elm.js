!function(P){"use strict";function G(r,n,e){return e.a=r,e.f=n,e}function n(e){return G(2,e,function(n){return function(r){return e(n,r)}})}function r(t){return G(3,t,function(e){return function(n){return function(r){return t(e,n,r)}}})}function B(o){return G(4,o,function(t){return function(e){return function(n){return function(r){return o(t,e,n,r)}}}})}function R(a){return G(5,a,function(o){return function(t){return function(e){return function(n){return function(r){return a(o,t,e,n,r)}}}}})}function l(r,n,e){return 2===r.a?r.f(n,e):r(n)(e)}function s(r,n,e,t){return 3===r.a?r.f(n,e,t):r(n)(e)(t)}function d(r,n,e,t,o){return 4===r.a?r.f(n,e,t,o):r(n)(e)(t)(o)}function z(r,n,e,t,o,a){return 5===r.a?r.f(n,e,t,o,a):r(n)(e)(t)(o)(a)}function t(r,n,e){if("object"!=typeof r)return r===n?0:r<n?-1:1;if(void 0===r.$)return(e=(e=t(r.a,n.a))||t(r.b,n.b))||t(r.c,n.c);for(;r.b&&n.b&&!(e=t(r.a,n.a));r=r.b,n=n.b);return e||(r.b?1:n.b?-1:0)}var q=0;var v={$:0};function M(r,n){return{$:1,a:r,b:n}}var O=n(M);function b(r){for(var n=v,e=r.length;e--;)n={$:1,a:r[e],b:n};return n}var e=r(function(r,n,e){for(var t=Array(r),o=0;o<r;o++)t[o]=e(n+o);return t}),o=n(function(r,n){for(var e=Array(r),t=0;t<r&&n.b;t++)e[t]=n.a,n=n.b;return e.length=t,{a:e,b:n}});function W(r){throw Error("https://github.com/elm/core/blob/1.0.0/hints/"+r+".md")}var H=Math.ceil,a=Math.floor,V=Math.log;var Y=n(h);function h(r,n){switch(r.$){case 2:return r.b(n);case 5:return null===n?Vr(r.c):g("null",n);case 3:return U(n)?J(r.b,n,b):g("a LIST",n);case 4:return U(n)?J(r.b,n,Q):g("an ARRAY",n);case 6:var e=r.d;return"object"==typeof n&&null!==n&&e in n?(a=h(r.b,n[e]),w(a)?a:$(l(Wr,e,a.a))):g("an OBJECT with a field named `"+e+"`",n);case 7:e=r.e;return U(n)?e<n.length?(a=h(r.b,n[e]),w(a)?a:$(l(Hr,e,a.a))):g("a LONGER array. Need index "+e+" but only see "+n.length+" entries",n):g("an ARRAY",n);case 8:if("object"!=typeof n||null===n||U(n))return g("an OBJECT",n);var t,o=v;for(t in n)if(n.hasOwnProperty(t)){var a=h(r.b,n[t]);if(!w(a))return $(l(Wr,t,a.a));o={$:1,a:{a:t,b:a.a},b:o}}return Vr(Qr(o));case 9:for(var i=r.f,u=r.g,c=0;c<u.length;c++){a=h(u[c],n);if(!w(a))return a;i=i(a.a)}return Vr(i);case 10:a=h(r.b,n);return w(a)?h(r.h(a.a),n):a;case 11:for(var f=v,s=r.g;s.b;s=s.b){a=h(s.a,n);if(w(a))return a;f={$:1,a:a.a,b:f}}return $(Yr(Qr(f)));case 1:return $(l(Or,r.a,n));case 0:return Vr(r.a)}}function J(r,n,e){for(var t=n.length,o=Array(t),a=0;a<t;a++){var i=h(r,n[a]);if(!w(i))return $(l(Hr,a,i.a));o[a]=i.a}return Vr(e(o))}function U(r){return Array.isArray(r)||"undefined"!=typeof FileList&&r instanceof FileList}function Q(n){return l(vn,n.length,function(r){return n[r]})}function g(r,n){return $(l(Or,"Expecting "+r,n))}function c(r,n){if(r===n)return!0;if(r.$!==n.$)return!1;switch(r.$){case 0:case 1:return r.a===n.a;case 2:return r.b===n.b;case 5:return r.c===n.c;case 3:case 4:case 8:return c(r.b,n.b);case 6:return r.d===n.d&&c(r.b,n.b);case 7:return r.e===n.e&&c(r.b,n.b);case 9:return r.f===n.f&&X(r.g,n.g);case 10:return r.h===n.h&&c(r.b,n.b);case 11:return X(r.g,n.g)}}function X(r,n){var e=r.length;if(e!==n.length)return!1;for(var t=0;t<e;t++)if(!c(r[t],n[t]))return!1;return!0}function K(r){return r}function Z(r){return{$:0,a:r}}var rr=n(function(r,n){return{$:3,b:r,d:n}});var nr=0;function er(r){r={$:0,e:nr++,f:r,g:null,h:[]};return ur(r),r}function tr(n){return{$:2,b:function(r){r({$:0,a:er(n)})},c:null}}function or(r,n){r.h.push(n),ur(r)}var ar=!1,ir=[];function ur(r){if(ir.push(r),!ar){for(ar=!0;r=ir.shift();)!function(n){for(;n.f;){var r=n.f.$;if(0===r||1===r){for(;n.g&&n.g.$!==r;)n.g=n.g.i;if(!n.g)return;n.f=n.g.b(n.f.a),n.g=n.g.i}else{if(2===r)return n.f.c=n.f.b(function(r){n.f=r,ur(n)});if(5===r){if(0===n.h.length)return;n.f=n.f.b(n.h.shift())}else n.g={$:3===r?0:1,b:n.f.b,i:n.g},n.f=n.f.d}}}(r);ar=!1}}function cr(r,n,e,t,o,a){var r=l(Y,r,n?n.flags:void 0),i=(w(r)||W(2),{}),n=e(r.a),u=n.a,c=a(f,u),e=function(r,n){var e,t;for(t in p){var o=p[t];o.a&&((e=e||{})[t]=o.a(t,n)),r[t]=function(r,n){var t={g:n,h:void 0},o=r.c,a=r.d,i=r.e,u=r.f;function c(e){return l(rr,c,{$:5,b:function(r){var n=r.a;return 0===r.$?s(a,t,n,e):i&&u?d(o,t,n.i,n.j,e):s(o,t,i?n.i:n.j,e)}})}return t.h=er(l(rr,c,r.b))}(o,n)}return e}(i,f);function f(r,n){r=l(t,r,u);c(u=r.a,n),vr(i,r.b,o(u))}return vr(i,n.b,o(u)),e?{ports:e}:{}}var p={};var i=n(function(n,e){return{$:2,b:function(r){n.g(e),r({$:0,a:q})},c:null}});function fr(n){return function(r){return{$:1,k:n,l:r}}}function sr(r){return{$:2,m:r}}var lr=[],dr=!1;function vr(r,n,e){if(lr.push({p:r,q:n,r:e}),!dr){dr=!0;for(var t;t=lr.shift();)!function(r,n,e){var t,o={};for(t in br(!0,n,o,null),br(!1,e,o,null),r)or(r[t],{$:"fx",a:o[t]||{i:v,j:v}})}(t.p,t.q,t.r);dr=!1}}function br(r,n,e,t){switch(n.$){case 1:var o=n.k,a=function(r,n,e,t){function o(r){for(var n=e;n;n=n.t)r=n.s(r);return r}return l(r?p[n].e:p[n].f,o,t)}(r,o,t,n.l);return void(e[o]=function(r,n,e){return e=e||{i:v,j:v},r?e.i={$:1,a:n,b:e.i}:e.j={$:1,a:n,b:e.j},e}(r,a,e[o]));case 2:for(var i=n.m;i.b;i=i.b)br(r,i.a,e,t);return;case 3:br(r,n.o,e,{s:n.n,t:t})}}var hr;var gr="undefined"!=typeof document?document:{};function pr(r){return{$:0,a:r}}var f=n(function(a,i){return n(function(r,n){for(var e=[],t=0;n.b;n=n.b){var o=n.a;t+=o.b||0,e.push(o)}return t+=e.length,{$:1,c:i,d:$r(r),e:e,f:a,b:t}})})(void 0);n(function(a,i){return n(function(r,n){for(var e=[],t=0;n.b;n=n.b){var o=n.a;t+=o.b.b||0,e.push(o)}return t+=e.length,{$:2,c:i,d:$r(r),e:e,f:a,b:t}})})(void 0);var u=n(function(r,n){return{$:"a1",n:r,o:n}}),mr=n(function(r,n){return{$:"a2",n:r,o:n}}),m=n(function(r,n){return{$:"a3",n:r,o:n}});function xr(r){return/^\s*(javascript:|data:text\/html)/i.test(r)?"":r}var yr;function $r(r){for(var n={};r.b;r=r.b){var e,t=r.a,o=t.$,a=t.n,t=t.o;"a2"===o?"className"===a?wr(n,a,t):n[a]=t:(e=n[o]||(n[o]={}),"a3"===o&&"class"===a?wr(e,a,t):e[a]=t)}return n}function wr(r,n,e){var t=r[n];r[n]=t?t+" "+e:e}function x(r,n){var e=r.$;if(5===e)return x(r.k||(r.k=r.m()),n);if(0===e)return gr.createTextNode(r.a);if(4===e){for(var t=r.k,o=r.j;4===t.$;)"object"!=typeof o?o=[o,t.j]:o.push(t.j),t=t.k;var a={j:o,p:n};(i=x(t,a)).elm_event_node_ref=a}else if(3===e)kr(i=r.h(r.g),n,r.d);else{var i=r.f?gr.createElementNS(r.f,r.c):gr.createElement(r.c);hr&&"a"==r.c&&i.addEventListener("click",hr(i)),kr(i,n,r.d);for(var u=r.e,c=0;c<u.length;c++)i.appendChild(x(1===e?u[c]:u[c].b,n))}return i}function kr(r,n,e){for(var t in e){var o=e[t];"a1"===t?function(r,n){var e,t=r.style;for(e in n)t[e]=n[e]}(r,o):"a0"===t?function(r,n,e){var t,o=r.elmFs||(r.elmFs={});for(t in e){var a=e[t],i=o[t];if(a){if(i){if(i.q.$===a.$){i.q=a;continue}r.removeEventListener(t,i)}i=function(c,r){function f(r){var n=f.q,e=h(n.a,r);if(w(e)){for(var t,n=bn(n),e=e.a,o=n?n<3?e.a:e.t:e,a=1==n?e.b:3==n&&e.T,i=(a&&r.stopPropagation(),(2==n?e.b:3==n&&e.Q)&&r.preventDefault(),c);t=i.j;){if("function"==typeof t)o=t(o);else for(var u=t.length;u--;)o=t[u](o);i=i.p}i(o,a)}}return f.q=r,f}(n,a),r.addEventListener(t,i,yr&&{passive:bn(a)<2}),o[t]=i}else r.removeEventListener(t,i),o[t]=void 0}}(r,n,o):"a3"===t?function(r,n){for(var e in n){var t=n[e];void 0!==t?r.setAttribute(e,t):r.removeAttribute(e)}}(r,o):"a4"===t?function(r,n){for(var e in n){var t=n[e],o=t.f,t=t.o;void 0!==t?r.setAttributeNS(o,e,t):r.removeAttributeNS(o,e)}}(r,o):("value"!==t&&"checked"!==t||r[t]!==o)&&(r[t]=o)}}try{window.addEventListener("t",null,Object.defineProperty({},"passive",{get:function(){yr=!0}}))}catch(r){}function _r(r,n){var e=[];return S(r,n,e,0),e}function E(r,n,e,t){n={$:n,r:e,s:t,t:void 0,u:void 0};return r.push(n),n}function S(r,n,e,t){if(r!==n){var o=r.$,a=n.$;if(o!==a){if(1!==o||2!==a)return void E(e,0,t,n);n=function(r){for(var n=r.e,e=n.length,t=Array(e),o=0;o<e;o++)t[o]=n[o].b;return{$:1,c:r.c,d:r.d,e:t,f:r.f,b:r.b}}(n),a=1}switch(a){case 5:for(var i=r.l,u=n.l,c=i.length,f=c===u.length;f&&c--;)f=i[c]===u[c];if(f)return void(n.k=r.k);n.k=n.m();var s=[];return S(r.k,n.k,s,0),void(0<s.length&&E(e,1,t,s));case 4:for(var l=r.j,d=n.j,v=!1,b=r.k;4===b.$;)v=!0,"object"!=typeof l?l=[l,b.j]:l.push(b.j),b=b.k;for(var h=n.k;4===h.$;)v=!0,"object"!=typeof d?d=[d,h.j]:d.push(h.j),h=h.k;return v&&l.length!==d.length?void E(e,0,t,n):((v?function(r,n){for(var e=0;e<r.length;e++)if(r[e]!==n[e])return;return 1}(l,d):l===d)||E(e,2,t,d),void S(b,h,e,t+1));case 0:return void(r.a!==n.a&&E(e,3,t,n.a));case 1:return void Cr(r,n,e,t,Ar);case 2:return void Cr(r,n,e,t,Nr);case 3:if(r.h!==n.h)return void E(e,0,t,n);s=jr(r.d,n.d),s=(s&&E(e,4,t,s),n.i(r.g,n.g));s&&E(e,5,t,s)}}}function Cr(r,n,e,t,o){var a;r.c!==n.c||r.f!==n.f?E(e,0,t,n):((a=jr(r.d,n.d))&&E(e,4,t,a),o(r,n,e,t))}function jr(r,n,e){var t,o,a,i,u;for(o in r)"a1"===o||"a0"===o||"a3"===o||"a4"===o?(a=jr(r[o],n[o]||{},o))&&((t=t||{})[o]=a):o in n?(a=r[o])===(i=n[o])&&"value"!==o&&"checked"!==o||"a0"===e&&function(r,n){return r.$==n.$&&c(r.a,n.a)}(a,i)||((t=t||{})[o]=i):(t=t||{})[o]=e?"a1"===e?"":"a0"===e||"a3"===e?void 0:{f:r[o].f,o:void 0}:"string"==typeof r[o]?"":null;for(u in n)u in r||((t=t||{})[u]=n[u]);return t}function Ar(r,n,e,t){var o=r.e,a=n.e,r=o.length,n=a.length;n<r?E(e,6,t,{v:n,i:r-n}):r<n&&E(e,7,t,{v:r,e:a});for(var i=r<n?r:n,u=0;u<i;u++){var c=o[u];S(c,a[u],e,++t),t+=c.b||0}}function Nr(r,n,e,t){for(var o=[],a={},i=[],u=r.e,c=n.e,f=u.length,s=c.length,l=0,d=0,v=t;l<f&&d<s;){var b=u[l],h=c[d],g=b.a,p=h.a,m=b.b,x=h.b,y=void 0,$=void 0;if(g===p)S(m,x,o,++v),v+=m.b||0,l++,d++;else{var w,k,_,C,j=u[l+1],A=c[d+1];if(j&&(k=j.b,$=p===(w=j.a)),A&&(C=A.b,y=g===(_=A.a)),y&&$)S(m,C,o,++v),F(a,o,g,x,d,i),v+=m.b||0,Sr(a,o,g,k,++v),v+=k.b||0,l+=2,d+=2;else if(y)v++,F(a,o,p,x,d,i),S(m,C,o,v),v+=m.b||0,l+=1,d+=2;else if($)Sr(a,o,g,m,++v),v+=m.b||0,S(k,x,o,++v),v+=k.b||0,l+=2,d+=1;else{if(!j||w!==_)break;Sr(a,o,g,m,++v),F(a,o,p,x,d,i),v+=m.b||0,S(k,C,o,++v),v+=k.b||0,l+=2,d+=2}}}for(;l<f;){m=(b=u[l]).b;Sr(a,o,b.a,m,++v),v+=m.b||0,l++}for(;d<s;){var N=N||[];F(a,o,(h=c[d]).a,h.b,void 0,N),d++}(0<o.length||0<i.length||N)&&E(e,8,t,{w:o,x:i,y:N})}var Er="_elmW6BL";function F(r,n,e,t,o,a){var i,u=r[e];u?1===u.c?(a.push({r:o,A:u}),u.c=2,S(u.z,t,i=[],u.r),u.r=o,u.s.s={w:i,A:u}):F(r,n,e+Er,t,o,a):(a.push({r:o,A:u={c:0,z:t,r:o,s:void 0}}),r[e]=u)}function Sr(r,n,e,t,o){var a,i=r[e];i?0===i.c?(i.c=2,S(t,i.z,a=[],o),E(n,9,o,{w:a,A:i})):Sr(r,n,e+Er,t,o):(a=E(n,9,o,void 0),r[e]={c:1,z:t,r:o,s:a})}function Fr(r,n,e,t){!function r(n,e,t,o,a,i,u){var c=t[o];var f=c.r;for(;f===a;){var s,l=c.$;if(1===l?Fr(n,e.k,c.s,u):8===l?(c.t=n,c.u=u,0<(s=c.s.w).length&&r(n,e,s,0,a,i,u)):9===l?(c.t=n,c.u=u,(l=c.s)&&(l.A.s=n,0<(s=l.w).length)&&r(n,e,s,0,a,i,u)):(c.t=n,c.u=u),!(c=t[++o])||(f=c.r)>i)return o}var d=e.$;if(4===d){for(var v=e.k;4===v.$;)v=v.k;return r(n,v,t,o,a+1,i,n.elm_event_node_ref)}var b=e.e;var h=n.childNodes;for(var g=0;g<b.length;g++){var p=1===d?b[g]:b[g].b,m=++a+(p.b||0);if(a<=f&&f<=m&&(o=r(h[g],p,t,o,a,m,u),!(c=t[o])||(f=c.r)>i))return o;a=m}return o}(r,n,e,0,0,n.b,t)}function Tr(r,n,e,t){return 0===e.length?r:(Fr(r,n,e,t),Lr(r,e))}function Lr(r,n){for(var e=0;e<n.length;e++){var t=n[e],o=t.t,t=function(r,n){switch(n.$){case 0:return function(r,n,e){var t=r.parentNode,n=x(n,e);n.elm_event_node_ref||(n.elm_event_node_ref=r.elm_event_node_ref);t&&n!==r&&t.replaceChild(n,r);return n}(r,n.s,n.u);case 4:return kr(r,n.u,n.s),r;case 3:return r.replaceData(0,r.length,n.s),r;case 1:return Lr(r,n.s);case 2:return r.elm_event_node_ref?r.elm_event_node_ref.j=n.s:r.elm_event_node_ref={j:n.s,p:n.u},r;case 6:for(var e=n.s,t=0;t<e.i;t++)r.removeChild(r.childNodes[e.v]);return r;case 7:for(var o=(e=n.s).e,t=e.v,a=r.childNodes[t];t<o.length;t++)r.insertBefore(x(o[t],n.u),a);return r;case 9:var i;return(e=n.s)?(void 0!==(i=e.A).r&&r.parentNode.removeChild(r),i.s=Lr(r,e.w)):r.parentNode.removeChild(r),r;case 8:return function(r,n){for(var e=n.s,t=function(r,n){if(r){for(var e=gr.createDocumentFragment(),t=0;t<r.length;t++){var o=r[t].A;e.appendChild(2===o.c?o.s:x(o.z,n.u))}return e}}(e.y,n),o=(r=Lr(r,e.w),e.x),a=0;a<o.length;a++){var i=o[a],u=i.A,u=2===u.c?u.s:x(u.z,n.u);r.insertBefore(u,r.childNodes[i.r])}t&&r.appendChild(t);return r}(r,n);case 5:return n.s(r);default:W(10)}}(o,t);o===r&&(r=t)}return r}function Dr(r){if(3===r.nodeType)return{$:0,a:r.textContent};if(1!==r.nodeType)return{$:0,a:""};for(var n=v,e=r.attributes,t=e.length;t--;)var o=e[t],n={$:1,a:l(m,o.name,o.value),b:n};for(var a=r.tagName.toLowerCase(),i=v,u=r.childNodes,t=u.length;t--;)i={$:1,a:Dr(u[t]),b:i};return s(f,a,n,i)}var Ir=B(function(n,r,e,i){return cr(r,i,n.aN,n.a2,n.a$,function(e,r){var t=n.a4,o=i.node,a=Dr(o);return Gr(r,function(r){var r=t(r),n=_r(a,r);o=Tr(o,a,n,e),a=r})})}),Pr="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:function(r){return setTimeout(r,1e3/60)};function Gr(e,t){t(e);var o=0;function a(){o=1===o?0:(Pr(a),t(e),1)}return function(r,n){e=r,n?(t(e),2===o&&(o=1)):(0===o&&Pr(a),o=2)}}function y(r){return l(C,"href",/^javascript:/i.test((r=r).replace(/\s/g,""))?"":r)}function Br(r){return l(C,"src",xr(r))}function Rr(r){return l(m,"height",Jr(r))}function zr(r){return l(k,b([j("w-full pr-2")]),b([l(k,b([j("lg:hidden")]),b([Bn])),l(k,b([j("hidden lg:block w-full")]),b([function(r){return l(Gn,b([j("h-full w-full flex justify-end content-center justify-items-center gap-4 mr-4"),j("text-base")]),b([d(I,r,"/feastdayactivities","_self","Activities"),d(I,r,"/saints","_self","Saints"),d(I,r,"/animations","_self","Animations"),d(I,r,"/resources","_self","Resources"),d(I,r,"/shop","_blank","Shop"),d(I,r,"/give","_self","Give"),d(I,r,"/team","_self","About")]))}(r)]))]))}var qr,Mr=O,$=function(r){return{$:1,a:r}},Or=n(function(r,n){return{$:3,a:r,b:n}}),Wr=n(function(r,n){return{$:0,a:r,b:n}}),Hr=n(function(r,n){return{$:1,a:r,b:n}}),Vr=function(r){return{$:0,a:r}},Yr=function(r){return{$:2,a:r}},Jr=function(r){return r+""},Ur=r(function(r,n,e){for(;;){if(!e.b)return n;var t=e.b,o=r,a=l(r,e.a,n);r=o,n=a,e=t}}),Qr=function(r){return s(Ur,Mr,v,r)},Xr=B(function(r,n,e,t){return{$:0,a:r,b:n,c:e,d:t}}),Kr=[],Zr=H,rn=n(function(r,n){return V(n)/V(r)}),nn=Zr(l(rn,2,32)),en=d(Xr,0,nn,Kr,Kr),tn=e,on=a,an=function(r){return r.length},un=n(function(r,n){return 0<t(r,n)?r:n}),cn=o,fn=n(function(r,n){for(;;){var e=l(cn,32,r),t=e.b,e=l(Mr,{$:0,a:e.a},n);if(!t.b)return Qr(e);r=t,n=e}}),sn=n(function(r,n){for(;;){var e=Zr(n/32);if(1===e)return l(cn,32,r).a;r=l(fn,r,v),n=e}}),ln=n(function(r,n){var e,t;return n.a?(t=on(l(rn,32,(e=32*n.a)-1)),r=r?Qr(n.d):n.d,r=l(sn,r,n.a),d(Xr,an(n.c)+e,l(un,5,t*nn),r,n.c)):d(Xr,an(n.c),nn,Kr,n.c)}),dn=R(function(r,n,e,t,o){for(;;){if(n<0)return l(ln,!1,{d:t,a:e/32|0,c:o});var a={$:1,a:s(tn,32,n,r)};r=r,n=n-32,e=e,t=l(Mr,a,t),o=o}}),vn=n(function(r,n){var e;return 0<r?z(dn,n,r-(e=r%32)-32,r,v,s(tn,e,r-e,n)):en}),w=function(r){return!r.$},O=function(r){return{$:0,a:r}},bn=function(r){switch(r.$){case 0:return 0;case 1:return 1;case 2:return 2;default:return 3}},hn=Z,H=hn(0),gn=B(function(r,n,e,t){var o,a,i,u;return t.b?(o=t.a,(t=t.b).b?(a=t.a,(t=t.b).b?(i=t.a,(t=t.b).b?(u=t.b,l(r,o,l(r,a,l(r,i,l(r,t.a,500<e?s(Ur,r,n,Qr(u)):d(gn,r,n,e+1,u)))))):l(r,o,l(r,a,l(r,i,n)))):l(r,o,l(r,a,n))):l(r,o,n)):n}),pn=r(function(r,n,e){return d(gn,r,n,0,e)}),mn=n(function(e,r){return s(pn,n(function(r,n){return l(Mr,e(r),n)}),v,r)}),xn=rr,yn=n(function(n,r){return l(xn,function(r){return hn(n(r))},r)}),$n=r(function(e,r,t){return l(xn,function(n){return l(xn,function(r){return hn(l(e,n,r))},t)},r)}),wn=i,kn=n(function(r,n){return tr(l(xn,wn(r),n))}),e=r(function(r,n,e){return l(yn,function(r){return 0},(r=l(mn,kn(r),n),s(pn,$n(Mr),hn(v),r)))}),_n=(p.Task={b:H,c:e,d:r(function(r,n,e){return hn(0)}),e:n(function(r,n){return l(yn,r,n)}),f:void 0},fr("Task"),sr(v)),Cn=sr(v),k=f("div"),_=u,jn=K,C=n(function(r,n){return l(mr,r,jn(n))}),j=C("className"),a=f("p"),A=pr,o=l(k,b([j("text-xl mb-10")]),b([l(a,b([l(_,"margin-bottom","1em")]),b([A("Your support helps make these animations and our work possible. Whether you support financially, via prayers, sending words of encouragement, or voluntary services, we are eternally grateful. 🙏")])),l(a,b([j("m-auto"),j("max-w-3xl")]),b([A("Catholic Stories for Children is a 501(c)(3) non-profit recognized by the IRS. Contributions to Catholic Stories for Children are tax-deductible to the extent permitted by law. Tax ID Number: 85-4194883")]))])),N=f("a"),An=f("h3"),i=n(function(r,n){return l(k,b([l(_,"margin-bottom","100px"),l(_,"background-color","white"),l(_,"color","black"),l(_,"border-radius","5px"),j("p-5 max-w-2xl shadow")]),b([l(k,b([j("pb-5 m-1")]),b([l(An,b([j("text-center text-xl")]),b([A(r)]))])),l(k,b([l(_,"text-align","center"),l(_,"left","50%"),l(_,"position","relative"),l(_,"transform","translate(-50%)")]),b([n]))]))}),Nn=f("img"),H=l(i,"Donate",l(k,b([j("w-52 m-auto")]),b([l(N,b([j("dbox-donation-page-button m-auto"),y("https://donorbox.org/catholic-stories-for-children?default_interval=m"),l(_,"background","rgb(254, 189, 17)"),l(_,"color","rgb(0, 0, 0)"),l(_,"text-decoration","none"),l(_,"font-family","Verdana, sans-serif"),l(_,"display","flex"),l(_,"font-size","16px"),l(_,"padding","8px 24px"),l(_,"border-radius","5px"),l(_,"gap","8px"),l(_,"width","fit-content"),l(_,"line-height","24px")]),b([l(Nn,b([Br("https://donorbox.org/images/white_logo.svg"),l(_,"width","20px")]),v),A("Donate")]))]))),e=m("rel"),En=C("target"),u=C("title"),e=l(i,"Donate Your Vehicle",l(N,b([y("http://www.cars2charities.org/donation?donateto=1585"),e("noopener"),En("_blank"),l(_,"text-decoration","none"),u("Donate your Vehicle"),l(_,"padding","10px 20px"),l(_,"box-shadow","#777 1px 1px 5px"),l(_,"border-radius","5px")]),b([A("Cars 2 Charities")]))),Sn=f("h1"),u=f("h2"),Fn=l(i,"Pray for us",l(a,b([l(_,"text-align","center"),l(_,"width","80%"),l(_,"left","50%"),l(_,"position","relative"),l(_,"transform","translate(-50%)")]),b([A("We believe in the power of prayer. Please pray for us in this work. We are praying for you. 🙏")]))),T=n(function(r,n){return l(m,function(r){return/^(on|formAction$)/i.test(r)?"data-"+r:r}(r),xr(n))}),Tn=K,Ln=n(function(r,n){return l(mr,r,Tn(n))})("hidden"),L=n(function(r,n){return l(mr,function(r){return"innerHTML"==r||"formAction"==r?"data-"+r:r}(r),xr(n))}),D=f("span"),L=l(D,v,b([l(D,b([l(_,"display","inline-block")]),b([A("trevor"),l(D,v,b([A("@")]))])),l(D,b([l(T,"ariaHidden","true"),l(L,"innerHTML",jn("🍯"))]),v),l(D,b([l(T,"ariaHidden","true"),l(L,"innerHTML",jn("spam@catholicstoriesforchildren.com"))]),v),l(D,b([Rr(0),l(m,"width",Jr(0)),l(_,"display","none"),Ln(!0)]),b([A("spam@catholicstoriesforchildren.com")])),l(D,v,b([A("catholicstoriesforchildren"),l(D,v,b([A("."),l(D,v,b([A("com")]))]))]))])),Ln=l(i,"Sponsorship",l(k,b([l(_,"text-align","center"),l(_,"left","50%"),l(_,"position","relative"),l(_,"transform","translate(-50%)")]),b([l(a,v,b([A(" Interested in becoming a sponsor? Please send us a message! ")])),L]))),Dn=l(i,"Volunteer",l(k,b([l(_,"text-align","center"),l(_,"width","80%"),l(_,"left","50%"),l(_,"position","relative"),l(_,"transform","translate(-50%)")]),b([l(a,v,b([A(" Interested in volunteering your talents or pro bono work? ")])),l(a,v,b([A(" We could use your help reviewing scripts, storyboards, and animatics. Please let us know! ")])),L]))),i=l(i,"Words of Encouragement",l(k,b([l(_,"text-align","center"),l(_,"width","80%"),l(_,"left","50%"),l(_,"position","relative"),l(_,"transform","translate(-50%)")]),b([l(a,v,b([A("Sending words of encouragement are greatly appreciated. Let us build each other up in the faith. ")])),l(a,b([j("mt-5")]),b([A(' "Encourage one another and build one another up." ')])),l(a,b([j("mb-5")]),b([A("1 Th 5:11")])),L]))),L=l(k,b([j("m-auto"),j("max-w-3xl py-5 px-11")]),b([l(Sn,b([j("mb-10")]),b([A("Give")])),o,l(k,b([l(_,"margin-bottom","6em")]),v),H,l(u,b([j("text-center max-w-3xl")]),b([A("Other ways to give")])),l(k,b([l(_,"margin-bottom","4em")]),v),Fn,e,Ln,Dn,i])),In=C("alt"),o=R(function(r,n,e,t,o){return l(k,b([j("flex align-center")]),b([l(N,b([y(r),l(T,"aria-label",n),En("_blank"),j("mb-5")]),b([l(Nn,b([j("w-5 h-5 inline-block"),Br(e),In(t)]),v),l(D,b([j("ml-3")]),b([A(o)]))]))]))}),H=z(o,"https://www.facebook.com/catholicstoriesforchildren","CSC Facebook Page","https://ik.imagekit.io/catholicstories/f_logo_RGB-Blue_250_3vs-yhXer.png?updatedAt=1684277030198","Facebook","Facebook"),Fn=f("footer"),e=z(o,"https://www.instagram.com/catholicstoriesforchildren/","CSC Instagram Page","https://ik.imagekit.io/catholicstories/Instagram_Glyph_Gradient_kFoMs9jIr.png?updatedAt=1684277127293","Instagram","Instagram"),Ln=f("iframe"),Dn=l(k,b([j("mb-5")]),b([l(a,b([j("pb-2 pl-1 text-left")]),b([A("Receive free animations, activities, resources, and more!")])),l(Ln,b([Br("https://embeds.beehiiv.com/d8e1c428-bdfc-437f-a685-0148bd0cf084?slim=true"),Rr(52),l(T,"frameborder","0"),l(T,"scrolling","no"),l(_,"margin","0"),l(_,"border-radius","0px !important"),l(_,"background-color","transparent")]),v)])),i=l(Fn,b([l(_,"padding",Jr(30)+"px")]),b([l(k,b([j("text-center mb-5")]),b([l(k,v,b([l(k,v,b([l(u,b([j("mb-7")]),b([A("Access Free Animations")]))])),l(k,b([j("text-center grid justify-center mb-10")]),b([Dn]))])),l(k,b([j("md:grid md:grid-cols-3 md:justify-items-center")]),b([l(k,b([j("text-left")]),b([l(k,v,b([l(An,b([j("font-bold text-lg")]),b([A("About Us")]))])),l(k,b([j("mb-3")]),b([A("Catholic Stories for Children is a nonprofit aimed at telling short stories, primarily through animation, to help parents teach Catholic prayers, about Catholic saints, and other Catholic concepts.")]))])),l(k,b([j("md:mx-5")]),b([l(Nn,b([j("rounded max-w-[16rem]"),Br("/assets/FullTitle_900x900_NoBackground.png")]),v)])),l(k,b([j("text-left")]),b([l(k,v,b([l(An,b([j("font-bold text-lg mb-3")]),b([A("Follow Us")]))])),l(k,v,b([e,H]))]))]))])),l(k,b([j("text-xs")]),b([l(a,v,b([A("Copyright © 2024 Catholic Stories for Children. All rights reserved.")])),l(a,v,b([A("Catholic Stories for Children is a 501(c)(3) non-profit recognized by the IRS. Contributions to Catholic Stories for Children are tax-deductible to the extent permitted by law.  Tax ID Number: 85-4194883")])),l(a,v,b([l(N,b([y("/about/privacy-policy"),j("underline")]),b([A("Privacy Policy")])),l(D,v,b([A(" | ")])),l(N,b([y("/about/terms-and-conditions"),j("underline")]),b([A("Terms & Conditions")]))]))]))])),Pn=f("header"),Gn=f("nav"),I=B(function(r,n,e,t){return l(N,b([y(n),j("flex items-center justify-center"),j("hover:scale-105 transition ease-in-out"),j("hover:border-b-4 hover:border-[#9101b3]"),j("rounded"),j("h-[60px] h-["+r+"]"),j("p-2"),l(T,"aria-label",t),En(e)]),b([A(t)]))}),Bn=l(N,b([y("/navigation"),j("space-y-2"),l(T,"aria-label","menu")]),b([l(k,b([j("w-8 h-0.5 m-auto bg-gray-600")]),v),l(k,b([j("w-8 h-0.5 m-auto bg-gray-600")]),v),l(k,b([j("w-8 h-0.5 m-auto bg-gray-600")]),v)])),Rn=n(function(r,n){var r=r?{a:"text-[0px] md:text-xl",b:"invisible md:visible"}:{a:"text-lg md:text-xl",b:""},e=r.a,r=r.b;return l(N,b([l(_,"text-decoration","none"),j("colorDarkGray"),j(r),j("justify-self-start"),y("/")]),b([l(Sn,b([l(_,"font-family","hvdComicSerifPro"),l(_,"margin","0px"),j(e)]),b([A("Catholic Stories for Children")]))]))}),o=l(Nn,b([Br("/assets/logo_solid.svg"),l(_,"height","30px"),In(""),l(_,"vertical-align","middle")]),v),zn=l(N,b([l(_,"text-decoration","none"),j("colorDarkGray"),y("/"),l(T,"aria-label","home")]),b([o])),Ln=n(function(r,n){var e="Catholic Stories for Children"===r?{a:"111px",b:zr,c:"grid-cols-[150px_1fr_150px] lg:grid-cols-[150px_1fr_600px]"}:{a:"60px",b:zr,c:"grid-cols-[150px_1fr_150px] lg:grid-cols-[150px_1fr_600px]"},t=e.a,o=e.b,e=e.c;return l(Pn,b([l(_,"background-color","#3d5d75"),l(_,"background-image","linear-gradient(130deg, #9DE2EB , #EBD6F1)"),j("h-[60px] md:h-["+t+"]"),j("colorDarkGray"),j("grid items-center justify-items-center"),j(e)]),b([zn,l(Rn,!0,r),o(t)]))}),qn=l(k,b([l(_,"height","100vh"),l(_,"overflow-x","hidden"),l(_,"overflow-y","auto"),l(_,"perspective","300px"),l(_,"scroll-behavior","smooth"),l(_,"background-color","#FEF7F4")]),b([l(Ln,"Give",10),L,i])),Fn=(qr={aN:{},a2:function(r){return function(r){return r}},a4:function(r){return qn}},Ir({aN:function(r){return{a:qr.aN,b:_n}},a$:function(r){return Cn},a2:n(function(r,n){return{a:l(qr.a2,r,n),b:_n}}),a4:qr.a4}));u={Give:{Main:{init:Fn(O(0))(0)}}},P.Elm?function r(n,e){for(var t in e)t in n?"init"==t?W(6):r(n[t],e[t]):n[t]=e[t]}(P.Elm,u):P.Elm=u}(this);