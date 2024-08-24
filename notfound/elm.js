!function(R){"use strict";function n(n,r,e){return e.a=n,e.f=r,e}function r(e){return n(2,e,function(r){return function(n){return e(r,n)}})}function e(t){return n(3,t,function(e){return function(r){return function(n){return t(e,r,n)}}})}function S(u){return n(4,u,function(t){return function(e){return function(r){return function(n){return u(t,e,r,n)}}}})}function O(a){return n(5,a,function(u){return function(t){return function(e){return function(r){return function(n){return a(u,t,e,r,n)}}}}})}function s(n,r,e){return 2===n.a?n.f(r,e):n(r)(e)}function v(n,r,e,t){return 3===n.a?n.f(r,e,t):n(r)(e)(t)}function l(n,r,e,t,u){return 4===n.a?n.f(r,e,t,u):n(r)(e)(t)(u)}function D(n,r,e,t,u,a){return 5===n.a?n.f(r,e,t,u,a):n(r)(e)(t)(u)(a)}function t(n,r,e){if("object"!=typeof n)return n===r?0:n<r?-1:1;if(void 0===n.$)return(e=(e=t(n.a,r.a))||t(n.b,r.b))||t(n.c,r.c);for(;n.b&&r.b&&!(e=t(n.a,r.a));n=n.b,r=r.b);return e||(n.b?1:r.b?-1:0)}var M=0;var b={$:0};function I(n,r){return{$:1,a:n,b:r}}var P=r(I);function d(n){for(var r=b,e=n.length;e--;)r={$:1,a:n[e],b:r};return r}var u=e(function(n,r,e){for(var t=Array(n),u=0;u<n;u++)t[u]=e(r+u);return t}),a=r(function(n,r){for(var e=Array(n),t=0;t<n&&r.b;t++)e[t]=r.a,r=r.b;return e.length=t,{a:e,b:r}});function J(n){throw Error("https://github.com/elm/core/blob/1.0.0/hints/"+n+".md")}var o=Math.ceil,i=Math.floor,Y=Math.log;var G=r(h);function h(n,r){switch(n.$){case 2:return n.b(r);case 5:return null===r?x(n.c):$("null",r);case 3:return g(r)?H(n.b,r,d):$("a LIST",r);case 4:return g(r)?H(n.b,r,Q):$("an ARRAY",r);case 6:var e=n.d;return"object"==typeof r&&null!==r&&e in r?(a=h(n.b,r[e]),q(a)?a:N(s(zn,e,a.a))):$("an OBJECT with a field named `"+e+"`",r);case 7:e=n.e;return g(r)?e<r.length?(a=h(n.b,r[e]),q(a)?a:N(s(Bn,e,a.a))):$("a LONGER array. Need index "+e+" but only see "+r.length+" entries",r):$("an ARRAY",r);case 8:if("object"!=typeof r||null===r||g(r))return $("an OBJECT",r);var t,u=b;for(t in r)if(r.hasOwnProperty(t)){var a=h(n.b,r[t]);if(!q(a))return N(s(zn,t,a.a));u={$:1,a:{a:t,b:a.a},b:u}}return x(E(u));case 9:for(var o=n.f,i=n.g,f=0;f<i.length;f++){a=h(i[f],r);if(!q(a))return a;o=o(a.a)}return x(o);case 10:a=h(n.b,r);return q(a)?h(n.h(a.a),r):a;case 11:for(var c=b,v=n.g;v.b;v=v.b){a=h(v.a,r);if(q(a))return a;c={$:1,a:a.a,b:c}}return N(Rn(E(c)));case 1:return N(s(qn,n.a,r));case 0:return x(n.a)}}function H(n,r,e){for(var t=r.length,u=Array(t),a=0;a<t;a++){var o=h(n,r[a]);if(!q(o))return N(s(Bn,a,o.a));u[a]=o.a}return x(e(u))}function g(n){return Array.isArray(n)||"undefined"!=typeof FileList&&n instanceof FileList}function Q(r){return s(Zn,r.length,function(n){return r[n]})}function $(n,r){return N(s(qn,"Expecting "+n,r))}function f(n,r){if(n===r)return!0;if(n.$!==r.$)return!1;switch(n.$){case 0:case 1:return n.a===r.a;case 2:return n.b===r.b;case 5:return n.c===r.c;case 3:case 4:case 8:return f(n.b,r.b);case 6:return n.d===r.d&&f(n.b,r.b);case 7:return n.e===r.e&&f(n.b,r.b);case 9:return n.f===r.f&&W(n.g,r.g);case 10:return n.h===r.h&&f(n.b,r.b);case 11:return W(n.g,r.g)}}function W(n,r){var e=n.length;if(e!==r.length)return!1;for(var t=0;t<e;t++)if(!f(n[t],r[t]))return!1;return!0}function K(n){return n}function U(n){return{$:0,a:n}}var V=r(function(n,r){return{$:3,b:n,d:r}});var X=0;function Z(n){n={$:0,e:X++,f:n,g:null,h:[]};return un(n),n}function nn(r){return{$:2,b:function(n){n({$:0,a:Z(r)})},c:null}}function rn(n,r){n.h.push(r),un(n)}var en=!1,tn=[];function un(n){if(tn.push(n),!en){for(en=!0;n=tn.shift();)!function(r){for(;r.f;){var n=r.f.$;if(0===n||1===n){for(;r.g&&r.g.$!==n;)r.g=r.g.i;if(!r.g)return;r.f=r.g.b(r.f.a),r.g=r.g.i}else{if(2===n)return r.f.c=r.f.b(function(n){r.f=n,un(r)});if(5===n){if(0===r.h.length)return;r.f=r.f.b(r.h.shift())}else r.g={$:3===n?0:1,b:r.f.b,i:r.g},r.f=r.f.d}}}(n);en=!1}}function an(n,r,e,t,u,a){var n=s(G,n,r?r.flags:void 0),o=(q(n)||J(2),{}),r=e(n.a),i=r.a,f=a(c,i),e=function(n,r){var e,t;for(t in p){var u=p[t];u.a&&((e=e||{})[t]=u.a(t,r)),n[t]=function(n,r){var t={g:r,h:void 0},u=n.c,a=n.d,o=n.e,i=n.f;function f(e){return s(V,f,{$:5,b:function(n){var r=n.a;return 0===n.$?v(a,t,r,e):o&&i?l(u,t,r.i,r.j,e):v(u,t,o?r.i:r.j,e)}})}return t.h=Z(s(V,f,n.b))}(u,r)}return e}(o,c);function c(n,r){n=s(t,n,i);f(i=n.a,r),ln(o,n.b,u(i))}return ln(o,r.b,u(i)),e?{ports:e}:{}}var p={};var on=r(function(r,e){return{$:2,b:function(n){r.g(e),n({$:0,a:M})},c:null}});function fn(r){return function(n){return{$:1,k:r,l:n}}}function cn(n){return{$:2,m:n}}var vn=[],sn=!1;function ln(n,r,e){if(vn.push({p:n,q:r,r:e}),!sn){sn=!0;for(var t;t=vn.shift();)!function(n,r,e){var t,u={};for(t in c(!0,r,u,null),c(!1,e,u,null),n)rn(n[t],{$:"fx",a:u[t]||{i:b,j:b}})}(t.p,t.q,t.r);sn=!1}}function c(n,r,e,t){switch(r.$){case 1:var u=r.k,a=function(n,r,e,t){function u(n){for(var r=e;r;r=r.t)n=r.s(n);return n}return s(n?p[r].e:p[r].f,u,t)}(n,u,t,r.l);return void(e[u]=function(n,r,e){return e=e||{i:b,j:b},n?e.i={$:1,a:r,b:e.i}:e.j={$:1,a:r,b:e.j},e}(n,a,e[u]));case 2:for(var o=r.m;o.b;o=o.b)c(n,o.a,e,t);return;case 3:c(n,r.o,e,{s:r.n,t:t})}}var bn;var m="undefined"!=typeof document?document:{};function dn(n){return{$:0,a:n}}var y=r(function(a,o){return r(function(n,r){for(var e=[],t=0;r.b;r=r.b){var u=r.a;t+=u.b||0,e.push(u)}return t+=e.length,{$:1,c:o,d:pn(n),e:e,f:a,b:t}})})(void 0);r(function(a,o){return r(function(n,r){for(var e=[],t=0;r.b;r=r.b){var u=r.a;t+=u.b.b||0,e.push(u)}return t+=e.length,{$:2,c:o,d:pn(n),e:e,f:a,b:t}})})(void 0);var k=r(function(n,r){return{$:"a1",n:n,o:r}}),hn=r(function(n,r){return{$:"a2",n:n,o:r}}),gn=r(function(n,r){return{$:"a3",n:n,o:r}});var $n;function pn(n){for(var r={};n.b;n=n.b){var e,t=n.a,u=t.$,a=t.n,t=t.o;"a2"===u?"className"===a?mn(r,a,t):r[a]=t:(e=r[u]||(r[u]={}),"a3"===u&&"class"===a?mn(e,a,t):e[a]=t)}return r}function mn(n,r,e){var t=n[r];n[r]=t?t+" "+e:e}function j(n,r){var e=n.$;if(5===e)return j(n.k||(n.k=n.m()),r);if(0===e)return m.createTextNode(n.a);if(4===e){for(var t=n.k,u=n.j;4===t.$;)"object"!=typeof u?u=[u,t.j]:u.push(t.j),t=t.k;var a={j:u,p:r};(o=j(t,a)).elm_event_node_ref=a}else if(3===e)yn(o=n.h(n.g),r,n.d);else{var o=n.f?m.createElementNS(n.f,n.c):m.createElement(n.c);bn&&"a"==n.c&&o.addEventListener("click",bn(o)),yn(o,r,n.d);for(var i=n.e,f=0;f<i.length;f++)o.appendChild(j(1===e?i[f]:i[f].b,r))}return o}function yn(n,r,e){for(var t in e){var u=e[t];"a1"===t?function(n,r){var e,t=n.style;for(e in r)t[e]=r[e]}(n,u):"a0"===t?function(n,r,e){var t,u=n.elmFs||(n.elmFs={});for(t in e){var a=e[t],o=u[t];if(a){if(o){if(o.q.$===a.$){o.q=a;continue}n.removeEventListener(t,o)}o=function(f,n){function c(n){var r=c.q,e=h(r.a,n);if(q(e)){for(var t,r=nr(r),e=e.a,u=r?r<3?e.a:e.t:e,a=1==r?e.b:3==r&&e.T,o=(a&&n.stopPropagation(),(2==r?e.b:3==r&&e.Q)&&n.preventDefault(),f);t=o.j;){if("function"==typeof t)u=t(u);else for(var i=t.length;i--;)u=t[i](u);o=o.p}o(u,a)}}return c.q=n,c}(r,a),n.addEventListener(t,o,$n&&{passive:nr(a)<2}),u[t]=o}else n.removeEventListener(t,o),u[t]=void 0}}(n,r,u):"a3"===t?function(n,r){for(var e in r){var t=r[e];void 0!==t?n.setAttribute(e,t):n.removeAttribute(e)}}(n,u):"a4"===t?function(n,r){for(var e in r){var t=r[e],u=t.f,t=t.o;void 0!==t?n.setAttributeNS(u,e,t):n.removeAttributeNS(u,e)}}(n,u):("value"!==t&&"checked"!==t||n[t]!==u)&&(n[t]=u)}}try{window.addEventListener("t",null,Object.defineProperty({},"passive",{get:function(){$n=!0}}))}catch(n){}function kn(n,r){var e=[];return L(n,r,e,0),e}function T(n,r,e,t){r={$:r,r:e,s:t,t:void 0,u:void 0};return n.push(r),r}function L(n,r,e,t){if(n!==r){var u=n.$,a=r.$;if(u!==a){if(1!==u||2!==a)return void T(e,0,t,r);r=function(n){for(var r=n.e,e=r.length,t=Array(e),u=0;u<e;u++)t[u]=r[u].b;return{$:1,c:n.c,d:n.d,e:t,f:n.f,b:n.b}}(r),a=1}switch(a){case 5:for(var o=n.l,i=r.l,f=o.length,c=f===i.length;c&&f--;)c=o[f]===i[f];if(c)return void(r.k=n.k);r.k=r.m();var v=[];return L(n.k,r.k,v,0),void(0<v.length&&T(e,1,t,v));case 4:for(var s=n.j,l=r.j,b=!1,d=n.k;4===d.$;)b=!0,"object"!=typeof s?s=[s,d.j]:s.push(d.j),d=d.k;for(var h=r.k;4===h.$;)b=!0,"object"!=typeof l?l=[l,h.j]:l.push(h.j),h=h.k;return b&&s.length!==l.length?void T(e,0,t,r):((b?function(n,r){for(var e=0;e<n.length;e++)if(n[e]!==r[e])return;return 1}(s,l):s===l)||T(e,2,t,l),void L(d,h,e,t+1));case 0:return void(n.a!==r.a&&T(e,3,t,r.a));case 1:return void jn(n,r,e,t,_n);case 2:return void jn(n,r,e,t,wn);case 3:if(n.h!==r.h)return void T(e,0,t,r);v=An(n.d,r.d),v=(v&&T(e,4,t,v),r.i(n.g,r.g));v&&T(e,5,t,v)}}}function jn(n,r,e,t,u){var a;n.c!==r.c||n.f!==r.f?T(e,0,t,r):((a=An(n.d,r.d))&&T(e,4,t,a),u(n,r,e,t))}function An(n,r,e){var t,u,a,o,i;for(u in n)"a1"===u||"a0"===u||"a3"===u||"a4"===u?(a=An(n[u],r[u]||{},u))&&((t=t||{})[u]=a):u in r?(a=n[u])===(o=r[u])&&"value"!==u&&"checked"!==u||"a0"===e&&function(n,r){return n.$==r.$&&f(n.a,r.a)}(a,o)||((t=t||{})[u]=o):(t=t||{})[u]=e?"a1"===e?"":"a0"===e||"a3"===e?void 0:{f:n[u].f,o:void 0}:"string"==typeof n[u]?"":null;for(i in r)i in n||((t=t||{})[i]=r[i]);return t}function _n(n,r,e,t){var u=n.e,a=r.e,n=u.length,r=a.length;r<n?T(e,6,t,{v:r,i:n-r}):n<r&&T(e,7,t,{v:n,e:a});for(var o=n<r?n:r,i=0;i<o;i++){var f=u[i];L(f,a[i],e,++t),t+=f.b||0}}function wn(n,r,e,t){for(var u=[],a={},o=[],i=n.e,f=r.e,c=i.length,v=f.length,s=0,l=0,b=t;s<c&&l<v;){var d=i[s],h=f[l],g=d.a,$=h.a,p=d.b,m=h.b,y=void 0,k=void 0;if(g===$)L(p,m,u,++b),b+=p.b||0,s++,l++;else{var j,A,_,w,N=i[s+1],x=f[l+1];if(N&&(A=N.b,k=$===(j=N.a)),x&&(w=x.b,y=g===(_=x.a)),y&&k)L(p,w,u,++b),C(a,u,g,m,l,o),b+=p.b||0,F(a,u,g,A,++b),b+=A.b||0,s+=2,l+=2;else if(y)b++,C(a,u,$,m,l,o),L(p,w,u,b),b+=p.b||0,s+=1,l+=2;else if(k)F(a,u,g,p,++b),b+=p.b||0,L(A,m,u,++b),b+=A.b||0,s+=2,l+=1;else{if(!N||j!==_)break;F(a,u,g,p,++b),C(a,u,$,m,l,o),b+=p.b||0,L(A,w,u,++b),b+=A.b||0,s+=2,l+=2}}}for(;s<c;){p=(d=i[s]).b;F(a,u,d.a,p,++b),b+=p.b||0,s++}for(;l<v;){var E=E||[];C(a,u,(h=f[l]).a,h.b,void 0,E),l++}(0<u.length||0<o.length||E)&&T(e,8,t,{w:u,x:o,y:E})}var Nn="_elmW6BL";function C(n,r,e,t,u,a){var o,i=n[e];i?1===i.c?(a.push({r:u,A:i}),i.c=2,L(i.z,t,o=[],i.r),i.r=u,i.s.s={w:o,A:i}):C(n,r,e+Nn,t,u,a):(a.push({r:u,A:i={c:0,z:t,r:u,s:void 0}}),n[e]=i)}function F(n,r,e,t,u){var a,o=n[e];o?0===o.c?(o.c=2,L(t,o.z,a=[],u),T(r,9,u,{w:a,A:o})):F(n,r,e+Nn,t,u):(a=T(r,9,u,void 0),n[e]={c:1,z:t,r:u,s:a})}function xn(n,r,e,t){!function n(r,e,t,u,a,o,i){var f=t[u];var c=f.r;for(;c===a;){var v,s=f.$;if(1===s?xn(r,e.k,f.s,i):8===s?(f.t=r,f.u=i,0<(v=f.s.w).length&&n(r,e,v,0,a,o,i)):9===s?(f.t=r,f.u=i,(s=f.s)&&(s.A.s=r,0<(v=s.w).length)&&n(r,e,v,0,a,o,i)):(f.t=r,f.u=i),!(f=t[++u])||(c=f.r)>o)return u}var l=e.$;if(4===l){for(var b=e.k;4===b.$;)b=b.k;return n(r,b,t,u,a+1,o,r.elm_event_node_ref)}var d=e.e;var h=r.childNodes;for(var g=0;g<d.length;g++){var $=1===l?d[g]:d[g].b,p=++a+($.b||0);if(a<=c&&c<=p&&(u=n(h[g],$,t,u,a,p,i),!(f=t[u])||(c=f.r)>o))return u;a=p}return u}(n,r,e,0,0,r.b,t)}function En(n,r,e,t){return 0===e.length?n:(xn(n,r,e,t),A(n,e))}function A(n,r){for(var e=0;e<r.length;e++){var t=r[e],u=t.t,t=function(n,r){switch(r.$){case 0:return function(n,r,e){var t=n.parentNode,r=j(r,e);r.elm_event_node_ref||(r.elm_event_node_ref=n.elm_event_node_ref);t&&r!==n&&t.replaceChild(r,n);return r}(n,r.s,r.u);case 4:return yn(n,r.u,r.s),n;case 3:return n.replaceData(0,n.length,r.s),n;case 1:return A(n,r.s);case 2:return n.elm_event_node_ref?n.elm_event_node_ref.j=r.s:n.elm_event_node_ref={j:r.s,p:r.u},n;case 6:for(var e=r.s,t=0;t<e.i;t++)n.removeChild(n.childNodes[e.v]);return n;case 7:for(var u=(e=r.s).e,t=e.v,a=n.childNodes[t];t<u.length;t++)n.insertBefore(j(u[t],r.u),a);return n;case 9:var o;return(e=r.s)?(void 0!==(o=e.A).r&&n.parentNode.removeChild(n),o.s=A(n,e.w)):n.parentNode.removeChild(n),n;case 8:return function(n,r){for(var e=r.s,t=function(n,r){if(n){for(var e=m.createDocumentFragment(),t=0;t<n.length;t++){var u=n[t].A;e.appendChild(2===u.c?u.s:j(u.z,r.u))}return e}}(e.y,r),u=(n=A(n,e.w),e.x),a=0;a<u.length;a++){var o=u[a],i=o.A,i=2===i.c?i.s:j(i.z,r.u);n.insertBefore(i,n.childNodes[o.r])}t&&n.appendChild(t);return n}(n,r);case 5:return r.s(n);default:J(10)}}(u,t);u===n&&(n=t)}return n}function Tn(n){if(3===n.nodeType)return{$:0,a:n.textContent};if(1!==n.nodeType)return{$:0,a:""};for(var r=b,e=n.attributes,t=e.length;t--;)var u=e[t],r={$:1,a:s(gn,u.name,u.value),b:r};for(var a=n.tagName.toLowerCase(),o=b,i=n.childNodes,t=i.length;t--;)o={$:1,a:Tn(i[t]),b:o};return v(y,a,r,o)}var Ln=S(function(r,n,e,o){return an(n,o,r.aN,r.a2,r.a$,function(e,n){var t=r.a4,u=o.node,a=Tn(u);return Fn(n,function(n){var n=t(n),r=kn(a,n);u=En(u,a,r,e),a=n})})}),Cn="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:function(n){return setTimeout(n,1e3/60)};function Fn(e,t){t(e);var u=0;function a(){u=1===u?0:(Cn(a),t(e),1)}return function(n,r){e=n,r?(t(e),2===u&&(u=1)):(0===u&&Cn(a),u=2)}}var _,w=P,N=function(n){return{$:1,a:n}},qn=r(function(n,r){return{$:3,a:n,b:r}}),zn=r(function(n,r){return{$:0,a:n,b:r}}),Bn=r(function(n,r){return{$:1,a:n,b:r}}),x=function(n){return{$:0,a:n}},Rn=function(n){return{$:2,a:n}},Sn=e(function(n,r,e){for(;;){if(!e.b)return r;var t=e.b,u=n,a=s(n,e.a,r);n=u,r=a,e=t}}),E=function(n){return v(Sn,w,b,n)},On=S(function(n,r,e,t){return{$:0,a:n,b:r,c:e,d:t}}),Dn=[],Mn=o,In=r(function(n,r){return Y(r)/Y(n)}),Pn=Mn(s(In,2,32)),Jn=l(On,0,Pn,Dn,Dn),Yn=u,Gn=i,Hn=function(n){return n.length},Qn=r(function(n,r){return 0<t(n,r)?n:r}),Wn=a,Kn=r(function(n,r){for(;;){var e=s(Wn,32,n),t=e.b,e=s(w,{$:0,a:e.a},r);if(!t.b)return E(e);n=t,r=e}}),Un=r(function(n,r){for(;;){var e=Mn(r/32);if(1===e)return s(Wn,32,n).a;n=s(Kn,n,b),r=e}}),Vn=r(function(n,r){var e,t;return r.a?(t=Gn(s(In,32,(e=32*r.a)-1)),n=n?E(r.d):r.d,n=s(Un,n,r.a),l(On,Hn(r.c)+e,s(Qn,5,t*Pn),n,r.c)):l(On,Hn(r.c),Pn,Dn,r.c)}),Xn=O(function(n,r,e,t,u){for(;;){if(r<0)return s(Vn,!1,{d:t,a:e/32|0,c:u});var a={$:1,a:v(Yn,32,r,n)};n=n,r=r-32,e=e,t=s(w,a,t),u=u}}),Zn=r(function(n,r){var e;return 0<n?D(Xn,r,n-(e=n%32)-32,n,b,v(Yn,e,n-e,r)):Jn}),q=function(n){return!n.$},P=function(n){return{$:0,a:n}},nr=function(n){switch(n.$){case 0:return 0;case 1:return 1;case 2:return 2;default:return 3}},z=U,o=z(0),rr=S(function(n,r,e,t){var u,a,o,i;return t.b?(u=t.a,(t=t.b).b?(a=t.a,(t=t.b).b?(o=t.a,(t=t.b).b?(i=t.b,s(n,u,s(n,a,s(n,o,s(n,t.a,500<e?v(Sn,n,r,E(i)):l(rr,n,r,e+1,i)))))):s(n,u,s(n,a,s(n,o,r)))):s(n,u,s(n,a,r))):s(n,u,r)):r}),er=e(function(n,r,e){return l(rr,n,r,0,e)}),tr=r(function(e,n){return v(er,r(function(n,r){return s(w,e(n),r)}),b,n)}),B=V,ur=r(function(r,n){return s(B,function(n){return z(r(n))},n)}),ar=e(function(e,n,t){return s(B,function(r){return s(B,function(n){return z(s(e,r,n))},t)},n)}),or=on,ir=r(function(n,r){return nn(s(B,or(n),r))}),u=e(function(n,r,e){return s(ur,function(n){return 0},(n=s(tr,ir(n),r),v(er,ar(w),z(b),n)))}),fr=(p.Task={b:o,c:u,d:e(function(n,r,e){return z(0)}),e:r(function(n,r){return s(ur,n,r)}),f:void 0},fn("Task"),cn(b)),cr=cn(b),i=y("div"),a=y("a"),vr=K,on=r(function(n,r){return s(hn,n,vr(r))}),o=on("className"),u=y("h1"),sr=y("p"),lr=dn,sr=s(i,d([o("max-w-5xl"),o("m-auto"),o("py-5 px-11"),o("mb-10"),o("h-5/6")]),d([s(u,d([o("mb-10 leading-9")]),d([lr("Lost and Not Found")])),s(sr,b,d([lr("Tony Tony, come around I am lost. Dear St. Anthony, please help me find the webpage I am looking for. Thank you St. Anthony. Amen.")])),s(i,d([o("mt-10")]),d([s(a,d([(u="/",s(on,"href",/^javascript:/i.test((u=u).replace(/\s/g,""))?"":u)),s(k,"text-decoration","none"),s(k,"padding","10px 20px"),s(k,"display","inline-block"),s(k,"border-radius","5px"),s(k,"box-shadow","#777 1px 1px 5px"),s(k,"color","white"),s(k,"background-color","#9200B3")]),d([lr("Return Home")]))]))])),br=s(i,b,d([sr])),o=(_={aN:{},a2:function(n){return function(n){return n}},a4:function(n){return br}},Ln({aN:function(n){return{a:_.aN,b:fr}},a$:function(n){return cr},a2:r(function(n,r){return{a:s(_.a2,n,r),b:fr}}),a4:_.a4}));a={NotFound:{Main:{init:o(P(0))(0)}}},R.Elm?function n(r,e){for(var t in e)t in r?"init"==t?J(6):n(r[t],e[t]):r[t]=e[t]}(R.Elm,a):R.Elm=a}(this);