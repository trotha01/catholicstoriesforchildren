!function(O){"use strict";function B(n,r,t){return t.a=n,t.f=r,t}function e(t){return B(2,t,function(r){return function(n){return t(r,n)}})}function r(e){return B(3,e,function(t){return function(r){return function(n){return e(t,r,n)}}})}function n(a){return B(4,a,function(e){return function(t){return function(r){return function(n){return a(e,t,r,n)}}}})}function P(o){return B(5,o,function(a){return function(e){return function(t){return function(r){return function(n){return o(a,e,t,r,n)}}}}})}function q(u){return B(7,u,function(i){return function(o){return function(a){return function(e){return function(t){return function(r){return function(n){return u(i,o,a,e,t,r,n)}}}}}}})}function l(n,r,t){return 2===n.a?n.f(r,t):n(r)(t)}function s(n,r,t,e){return 3===n.a?n.f(r,t,e):n(r)(t)(e)}function d(n,r,t,e,a){return 4===n.a?n.f(r,t,e,a):n(r)(t)(e)(a)}function b(n,r,t,e,a,o){return 5===n.a?n.f(r,t,e,a,o):n(r)(t)(e)(a)(o)}function D(n,r,t,e,a,o,i,u){return 7===n.a?n.f(r,t,e,a,o,i,u):n(r)(t)(e)(a)(o)(i)(u)}var v={$:0};function G(n,r){return{$:1,a:n,b:r}}var M=e(G);function h(n){for(var r=v,t=n.length;t--;)r={$:1,a:n[t],b:r};return r}var z=r(function(n,r,t){for(var e=Array(n),a=0;a<n;a++)e[a]=t(r+a);return e}),H=e(function(n,r){for(var t=Array(n),e=0;e<n&&r.b;e++)t[e]=r.a,r=r.b;return t.length=e,{a:t,b:r}});function K(n){throw Error("https://github.com/elm/core/blob/1.0.0/hints/"+n+".md")}function Y(n,r){for(var t,e=[],a=Q(n,r,0,e);a&&(t=e.pop());a=Q(t.a,t.b,0,e));return a}function Q(n,r,t,e){if(n!==r){if("object"!=typeof n||null===n||null===r)return"function"==typeof n&&K(5),!1;if(100<t)e.push({a:n,b:r});else for(var a in n.$<0&&(n=Ar(n),r=Ar(r)),n)if(!Q(n[a],r[a],t+1,e))return!1}return!0}function f(n,r,t){if("object"!=typeof n)return n===r?0:n<r?-1:1;if(void 0===n.$)return(t=(t=f(n.a,r.a))||f(n.b,r.b))||f(n.c,r.c);for(;n.b&&r.b&&!(t=f(n.a,r.a));n=n.b,r=r.b);return t||(n.b?1:r.b?-1:0)}var t=e(function(n,r){n=f(n,r);return n<0?wr:n?jr:_r}),Z=0;function U(n,r){var t,e={};for(t in n)e[t]=n[t];for(t in r)e[t]=r[t];return e}var W=Math.ceil,J=Math.floor,X=Math.log;var V=e(g);function g(n,r){switch(n.$){case 2:return n.b(r);case 5:return null===r?x(n.c):p("null",r);case 3:return rn(r)?nn(n.b,r,h):p("a LIST",r);case 4:return rn(r)?nn(n.b,r,tn):p("an ARRAY",r);case 6:var t=n.d;return"object"==typeof r&&null!==r&&t in r?(o=g(n.b,r[t]),_(o)?o:y(l(Rr,t,o.a))):p("an OBJECT with a field named `"+t+"`",r);case 7:t=n.e;return rn(r)?t<r.length?(o=g(n.b,r[t]),_(o)?o:y(l(Er,t,o.a))):p("a LONGER array. Need index "+t+" but only see "+r.length+" entries",r):p("an ARRAY",r);case 8:if("object"!=typeof r||null===r||rn(r))return p("an OBJECT",r);var e,a=v;for(e in r)if(r.hasOwnProperty(e)){var o=g(n.b,r[e]);if(!_(o))return y(l(Rr,e,o.a));a={$:1,a:{a:e,b:o.a},b:a}}return x(Or(a));case 9:for(var i=n.f,u=n.g,c=0;c<u.length;c++){o=g(u[c],r);if(!_(o))return o;i=i(o.a)}return x(i);case 10:o=g(n.b,r);return _(o)?g(n.h(o.a),r):o;case 11:for(var f=v,s=n.g;s.b;s=s.b){o=g(s.a,r);if(_(o))return o;f={$:1,a:o.a,b:f}}return y(Lr(Or(f)));case 1:return y(l(Fr,n.a,r));case 0:return x(n.a)}}function nn(n,r,t){for(var e=r.length,a=Array(e),o=0;o<e;o++){var i=g(n,r[o]);if(!_(i))return y(l(Er,o,i.a));a[o]=i.a}return x(t(a))}function rn(n){return Array.isArray(n)||"undefined"!=typeof FileList&&n instanceof FileList}function tn(r){return l(Xr,r.length,function(n){return r[n]})}function p(n,r){return y(l(Fr,"Expecting "+n,r))}function en(n,r){if(n===r)return!0;if(n.$!==r.$)return!1;switch(n.$){case 0:case 1:return n.a===r.a;case 2:return n.b===r.b;case 5:return n.c===r.c;case 3:case 4:case 8:return en(n.b,r.b);case 6:return n.d===r.d&&en(n.b,r.b);case 7:return n.e===r.e&&en(n.b,r.b);case 9:return n.f===r.f&&an(n.g,r.g);case 10:return n.h===r.h&&en(n.b,r.b);case 11:return an(n.g,r.g)}}function an(n,r){var t=n.length;if(t!==r.length)return!1;for(var e=0;e<t;e++)if(!en(n[e],r[e]))return!1;return!0}var on=e(function(n,r){return JSON.stringify(r,null,n)+""});function un(n){return n}var cn=r(function(n,r,t){return t[n]=r,t});function fn(n){return{$:0,a:n}}var sn=e(function(n,r){return{$:3,b:n,d:r}});var ln=0;function dn(n){n={$:0,e:ln++,f:n,g:null,h:[]};return mn(n),n}function bn(r){return{$:2,b:function(n){n({$:0,a:dn(r)})},c:null}}function vn(n,r){n.h.push(r),mn(n)}var hn=e(function(r,t){return{$:2,b:function(n){vn(r,t),n({$:0,a:Z})},c:null}});var gn=!1,pn=[];function mn(n){if(pn.push(n),!gn){for(gn=!0;n=pn.shift();)!function(r){for(;r.f;){var n=r.f.$;if(0===n||1===n){for(;r.g&&r.g.$!==n;)r.g=r.g.i;if(!r.g)return;r.f=r.g.b(r.f.a),r.g=r.g.i}else{if(2===n)return r.f.c=r.f.b(function(n){r.f=n,mn(r)});if(5===n){if(0===r.h.length)return;r.f=r.f.b(r.h.shift())}else r.g={$:3===n?0:1,b:r.f.b,i:r.g},r.f=r.f.d}}}(n);gn=!1}}function $n(n,r,t,e,a,o){var n=l(V,n,r?r.flags:void 0),i=(_(n)||K(2),{}),r=t(n.a),u=r.a,c=o(f,u),t=function(n,r){var t,e;for(e in m){var a=m[e];a.a&&((t=t||{})[e]=a.a(e,r)),n[e]=function(n,r){var e={g:r,h:void 0},a=n.c,o=n.d,i=n.e,u=n.f;function c(t){return l(sn,c,{$:5,b:function(n){var r=n.a;return 0===n.$?s(o,e,r,t):i&&u?d(a,e,r.i,r.j,t):s(a,e,i?r.i:r.j,t)}})}return e.h=dn(l(sn,c,n.b))}(a,r)}return t}(i,f);function f(n,r){n=l(e,n,u);c(u=n.a,r),jn(i,n.b,a(u))}return jn(i,r.b,a(u)),t?{ports:t}:{}}var m={};var yn=e(function(r,t){return{$:2,b:function(n){r.g(t),n({$:0,a:Z})},c:null}}),xn=e(function(n,r){return l(hn,n.h,{$:0,a:r})});function kn(r){return function(n){return{$:1,k:r,l:n}}}function _n(n){return{$:2,m:n}}var wn=e(function(n,r){return{$:3,n:n,o:r}}),Cn=[],An=!1;function jn(n,r,t){if(Cn.push({p:n,q:r,r:t}),!An){An=!0;for(var e;e=Cn.shift();)!function(n,r,t){var e,a={};for(e in Fn(!0,r,a,null),Fn(!1,t,a,null),n)vn(n[e],{$:"fx",a:a[e]||{i:v,j:v}})}(e.p,e.q,e.r);An=!1}}function Fn(n,r,t,e){switch(r.$){case 1:var a=r.k,o=function(n,r,t,e){function a(n){for(var r=t;r;r=r.t)n=r.s(n);return n}return l(n?m[r].e:m[r].f,a,e)}(n,a,e,r.l);return void(t[a]=function(n,r,t){return t=t||{i:v,j:v},n?t.i={$:1,a:r,b:t.i}:t.j={$:1,a:r,b:t.j},t}(n,o,t[a]));case 2:for(var i=r.m;i.b;i=i.b)Fn(n,i.a,t,e);return;case 3:Fn(n,r.o,t,{s:r.n,t:e})}}function Rn(n){m[n]&&K(3)}var En=e(function(n,r){return r});function Ln(n){var t,i=[],u=m[n].u,c=(t=0,{$:2,b:function(n){var r=setTimeout(function(){n({$:0,a:Z})},t);return function(){clearTimeout(r)}},c:null});return m[n].b=c,m[n].c=r(function(n,r,t){for(;r.b;r=r.b)for(var e=i,a=u(r.a),o=0;o<e.length;o++)e[o](a);return c}),{subscribe:function(n){i.push(n)},unsubscribe:function(n){(n=(i=i.slice()).indexOf(n))<0||i.splice(n,1)}}}var In;var Nn="undefined"!=typeof document?document:{};function Tn(n){return{$:0,a:n}}var c=e(function(o,i){return e(function(n,r){for(var t=[],e=0;r.b;r=r.b){var a=r.a;e+=a.b||0,t.push(a)}return e+=t.length,{$:1,c:i,d:Gn(n),e:t,f:o,b:e}})})(void 0);e(function(o,i){return e(function(n,r){for(var t=[],e=0;r.b;r=r.b){var a=r.a;e+=a.b.b||0,t.push(a)}return e+=t.length,{$:2,c:i,d:Gn(n),e:t,f:o,b:e}})})(void 0);var Sn=e(function(n,r){return{$:4,j:n,k:r,b:1+(r.b||0)}});var On=e(function(n,r){return{$:"a1",n:n,o:r}}),Bn=e(function(n,r){return{$:"a2",n:n,o:r}}),Pn=e(function(n,r){return{$:"a3",n:n,o:r}});function qn(n){return/^\s*(javascript:|data:text\/html)/i.test(n)?"":n}var Dn;function Gn(n){for(var r={};n.b;n=n.b){var t,e=n.a,a=e.$,o=e.n,e=e.o;"a2"===a?"className"===o?Mn(r,o,e):r[o]=e:(t=r[a]||(r[a]={}),"a3"===a&&"class"===o?Mn(t,o,e):t[o]=e)}return r}function Mn(n,r,t){var e=n[r];n[r]=e?e+" "+t:t}function $(n,r){var t=n.$;if(5===t)return $(n.k||(n.k=n.m()),r);if(0===t)return Nn.createTextNode(n.a);if(4===t){for(var e=n.k,a=n.j;4===e.$;)"object"!=typeof a?a=[a,e.j]:a.push(e.j),e=e.k;var o={j:a,p:r};(i=$(e,o)).elm_event_node_ref=o}else if(3===t)zn(i=n.h(n.g),r,n.d);else{var i=n.f?Nn.createElementNS(n.f,n.c):Nn.createElement(n.c);In&&"a"==n.c&&i.addEventListener("click",In(i)),zn(i,r,n.d);for(var u=n.e,c=0;c<u.length;c++)i.appendChild($(1===t?u[c]:u[c].b,r))}return i}function zn(n,r,t){for(var e in t){var a=t[e];"a1"===e?function(n,r){var t,e=n.style;for(t in r)e[t]=r[t]}(n,a):"a0"===e?function(n,r,t){var e,a=n.elmFs||(n.elmFs={});for(e in t){var o=t[e],i=a[e];if(o){if(i){if(i.q.$===o.$){i.q=o;continue}n.removeEventListener(e,i)}i=function(c,n){function f(n){var r=f.q,t=g(r.a,n);if(_(t)){for(var e,r=Vr(r),t=t.a,a=r?r<3?t.a:t.t:t,o=1==r?t.b:3==r&&t.U,i=(o&&n.stopPropagation(),(2==r?t.b:3==r&&t.R)&&n.preventDefault(),c);e=i.j;){if("function"==typeof e)a=e(a);else for(var u=e.length;u--;)a=e[u](a);i=i.p}i(a,o)}}return f.q=n,f}(r,o),n.addEventListener(e,i,Dn&&{passive:Vr(o)<2}),a[e]=i}else n.removeEventListener(e,i),a[e]=void 0}}(n,r,a):"a3"===e?function(n,r){for(var t in r){var e=r[t];void 0!==e?n.setAttribute(t,e):n.removeAttribute(t)}}(n,a):"a4"===e?function(n,r){for(var t in r){var e=r[t],a=e.f,e=e.o;void 0!==e?n.setAttributeNS(a,t,e):n.removeAttributeNS(a,t)}}(n,a):("value"!==e&&"checked"!==e||n[e]!==a)&&(n[e]=a)}}try{window.addEventListener("t",null,Object.defineProperty({},"passive",{get:function(){Dn=!0}}))}catch(n){}function Hn(n,r){var t=[];return E(n,r,t,0),t}function R(n,r,t,e){r={$:r,r:t,s:e,t:void 0,u:void 0};return n.push(r),r}function E(n,r,t,e){if(n!==r){var a=n.$,o=r.$;if(a!==o){if(1!==a||2!==o)return void R(t,0,e,r);r=function(n){for(var r=n.e,t=r.length,e=Array(t),a=0;a<t;a++)e[a]=r[a].b;return{$:1,c:n.c,d:n.d,e:e,f:n.f,b:n.b}}(r),o=1}switch(o){case 5:for(var i=n.l,u=r.l,c=i.length,f=c===u.length;f&&c--;)f=i[c]===u[c];if(f)return void(r.k=n.k);r.k=r.m();var s=[];return E(n.k,r.k,s,0),void(0<s.length&&R(t,1,e,s));case 4:for(var l=n.j,d=r.j,b=!1,v=n.k;4===v.$;)b=!0,"object"!=typeof l?l=[l,v.j]:l.push(v.j),v=v.k;for(var h=r.k;4===h.$;)b=!0,"object"!=typeof d?d=[d,h.j]:d.push(h.j),h=h.k;return b&&l.length!==d.length?void R(t,0,e,r):((b?function(n,r){for(var t=0;t<n.length;t++)if(n[t]!==r[t])return;return 1}(l,d):l===d)||R(t,2,e,d),void E(v,h,t,e+1));case 0:return void(n.a!==r.a&&R(t,3,e,r.a));case 1:return void Kn(n,r,t,e,Qn);case 2:return void Kn(n,r,t,e,Zn);case 3:if(n.h!==r.h)return void R(t,0,e,r);s=Yn(n.d,r.d),s=(s&&R(t,4,e,s),r.i(n.g,r.g));s&&R(t,5,e,s)}}}function Kn(n,r,t,e,a){var o;n.c!==r.c||n.f!==r.f?R(t,0,e,r):((o=Yn(n.d,r.d))&&R(t,4,e,o),a(n,r,t,e))}function Yn(n,r,t){var e,a,o,i,u;for(a in n)"a1"===a||"a0"===a||"a3"===a||"a4"===a?(o=Yn(n[a],r[a]||{},a))&&((e=e||{})[a]=o):a in r?(o=n[a])===(i=r[a])&&"value"!==a&&"checked"!==a||"a0"===t&&function(n,r){return n.$==r.$&&en(n.a,r.a)}(o,i)||((e=e||{})[a]=i):(e=e||{})[a]=t?"a1"===t?"":"a0"===t||"a3"===t?void 0:{f:n[a].f,o:void 0}:"string"==typeof n[a]?"":null;for(u in r)u in n||((e=e||{})[u]=r[u]);return e}function Qn(n,r,t,e){var a=n.e,o=r.e,n=a.length,r=o.length;r<n?R(t,6,e,{v:r,i:n-r}):n<r&&R(t,7,e,{v:n,e:o});for(var i=n<r?n:r,u=0;u<i;u++){var c=a[u];E(c,o[u],t,++e),e+=c.b||0}}function Zn(n,r,t,e){for(var a=[],o={},i=[],u=n.e,c=r.e,f=u.length,s=c.length,l=0,d=0,b=e;l<f&&d<s;){var v=u[l],h=c[d],g=v.a,p=h.a,m=v.b,$=h.b,y=void 0,x=void 0;if(g===p)E(m,$,a,++b),b+=m.b||0,l++,d++;else{var k,_,w,C,A=u[l+1],j=c[d+1];if(A&&(_=A.b,x=p===(k=A.a)),j&&(C=j.b,y=g===(w=j.a)),y&&x)E(m,C,a,++b),Wn(o,a,g,$,d,i),b+=m.b||0,Jn(o,a,g,_,++b),b+=_.b||0,l+=2,d+=2;else if(y)b++,Wn(o,a,p,$,d,i),E(m,C,a,b),b+=m.b||0,l+=1,d+=2;else if(x)Jn(o,a,g,m,++b),b+=m.b||0,E(_,$,a,++b),b+=_.b||0,l+=2,d+=1;else{if(!A||k!==w)break;Jn(o,a,g,m,++b),Wn(o,a,p,$,d,i),b+=m.b||0,E(_,C,a,++b),b+=_.b||0,l+=2,d+=2}}}for(;l<f;){m=(v=u[l]).b;Jn(o,a,v.a,m,++b),b+=m.b||0,l++}for(;d<s;){var F=F||[];Wn(o,a,(h=c[d]).a,h.b,void 0,F),d++}(0<a.length||0<i.length||F)&&R(t,8,e,{w:a,x:i,y:F})}var Un="_elmW6BL";function Wn(n,r,t,e,a,o){var i,u=n[t];u?1===u.c?(o.push({r:a,A:u}),u.c=2,E(u.z,e,i=[],u.r),u.r=a,u.s.s={w:i,A:u}):Wn(n,r,t+Un,e,a,o):(o.push({r:a,A:u={c:0,z:e,r:a,s:void 0}}),n[t]=u)}function Jn(n,r,t,e,a){var o,i=n[t];i?0===i.c?(i.c=2,E(e,i.z,o=[],a),R(r,9,a,{w:o,A:i})):Jn(n,r,t+Un,e,a):(o=R(r,9,a,void 0),n[t]={c:1,z:e,r:a,s:o})}function Xn(n,r,t,e){!function n(r,t,e,a,o,i,u){var c=e[a];var f=c.r;for(;f===o;){var s,l=c.$;if(1===l?Xn(r,t.k,c.s,u):8===l?(c.t=r,c.u=u,0<(s=c.s.w).length&&n(r,t,s,0,o,i,u)):9===l?(c.t=r,c.u=u,(l=c.s)&&(l.A.s=r,0<(s=l.w).length)&&n(r,t,s,0,o,i,u)):(c.t=r,c.u=u),!(c=e[++a])||(f=c.r)>i)return a}var d=t.$;if(4===d){for(var b=t.k;4===b.$;)b=b.k;return n(r,b,e,a,o+1,i,r.elm_event_node_ref)}var v=t.e;var h=r.childNodes;for(var g=0;g<v.length;g++){var p=1===d?v[g]:v[g].b,m=++o+(p.b||0);if(o<=f&&f<=m&&(a=n(h[g],p,e,a,o,m,u),!(c=e[a])||(f=c.r)>i))return a;o=m}return a}(n,r,t,0,0,r.b,e)}function Vn(n,r,t,e){return 0===t.length?n:(Xn(n,r,t,e),nr(n,t))}function nr(n,r){for(var t=0;t<r.length;t++){var e=r[t],a=e.t,e=function(n,r){switch(r.$){case 0:return function(n,r,t){var e=n.parentNode,r=$(r,t);r.elm_event_node_ref||(r.elm_event_node_ref=n.elm_event_node_ref);e&&r!==n&&e.replaceChild(r,n);return r}(n,r.s,r.u);case 4:return zn(n,r.u,r.s),n;case 3:return n.replaceData(0,n.length,r.s),n;case 1:return nr(n,r.s);case 2:return n.elm_event_node_ref?n.elm_event_node_ref.j=r.s:n.elm_event_node_ref={j:r.s,p:r.u},n;case 6:for(var t=r.s,e=0;e<t.i;e++)n.removeChild(n.childNodes[t.v]);return n;case 7:for(var a=(t=r.s).e,e=t.v,o=n.childNodes[e];e<a.length;e++)n.insertBefore($(a[e],r.u),o);return n;case 9:var i;return(t=r.s)?(void 0!==(i=t.A).r&&n.parentNode.removeChild(n),i.s=nr(n,t.w)):n.parentNode.removeChild(n),n;case 8:return function(n,r){for(var t=r.s,e=function(n,r){if(n){for(var t=Nn.createDocumentFragment(),e=0;e<n.length;e++){var a=n[e].A;t.appendChild(2===a.c?a.s:$(a.z,r.u))}return t}}(t.y,r),a=(n=nr(n,t.w),t.x),o=0;o<a.length;o++){var i=a[o],u=i.A,u=2===u.c?u.s:$(u.z,r.u);n.insertBefore(u,n.childNodes[i.r])}e&&n.appendChild(e);return n}(n,r);case 5:return r.s(n);default:K(10)}}(a,e);a===n&&(n=e)}return n}function rr(n){if(3===n.nodeType)return{$:0,a:n.textContent};if(1!==n.nodeType)return{$:0,a:""};for(var r=v,t=n.attributes,e=t.length;e--;)var a=t[e],r={$:1,a:l(Pn,a.name,a.value),b:r};for(var o=n.tagName.toLowerCase(),i=v,u=n.childNodes,e=u.length;e--;)i={$:1,a:rr(u[e]),b:i};return s(c,o,r,i)}var tr=n(function(r,n,t,i){return $n(n,i,r.aO,r.a3,r.a0,function(t,n){var e=r.a5,a=i.node,o=rr(a);return ar(n,function(n){var n=e(n),r=Hn(o,n);a=Vn(a,o,r,t),o=n})})}),er="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:function(n){return setTimeout(n,1e3/60)};function ar(t,e){e(t);var a=0;function o(){a=1===a?0:(er(o),e(t),1)}return function(n,r){t=n,r?(e(t),2===a&&(a=1)):(0===a&&er(o),a=2)}}var or={addEventListener:function(){},removeEventListener:function(){}},ir="undefined"!=typeof window?window:or;var ur=r(function(e,a,o){return{$:2,b:function(r){function t(n){r(a(o.aI.a(n)))}var n=new XMLHttpRequest;n.addEventListener("error",function(){t(yt)}),n.addEventListener("timeout",function(){t(_t)}),n.addEventListener("load",function(){t(function(n,r){return l(200<=r.status&&r.status<300?$t:pt,function(n){return{a4:n.responseURL,aZ:n.status,a_:n.statusText,aK:function(n){if(!n)return wt;for(var r=wt,t=n.split("\r\n"),e=t.length;e--;){var a,o,i=t[e],u=i.indexOf(": ");0<u&&(a=i.substring(0,u),o=i.substring(2+u),r=s(Ot,a,function(n){return Ir(Ct(n)?o+", "+n.a:o)},r))}return r}(n.getAllResponseHeaders())}}(r),n(r.response))}(o.aI.b,n))}),Ct(o.au)&&function(r,t,e){t.upload.addEventListener("progress",function(n){t.c||dn(l(At,r,{a:e,b:kt({aY:n.loaded,ar:n.total})}))}),t.addEventListener("progress",function(n){t.c||dn(l(At,r,{a:e,b:xt({aW:n.loaded,ar:n.lengthComputable?Ir(n.total):k})}))})}(e,n,o.au.a);try{n.open(o.aQ,o.a4,!0)}catch(n){return t(mt(o.a4))}return function(n,r){for(var t=r.aK;t.b;t=t.b)n.setRequestHeader(t.a.a,t.a.b);n.timeout=r.a1.a||0,n.responseType=r.aI.d,n.withCredentials=r.aA}(n,o),o.aC.a&&n.setRequestHeader("Content-Type",o.aC.a),n.send(o.aC.b),function(){n.c=!0,n.abort()}},c:null}});var cr=r(function(n,r,t){return{$:0,d:n,b:r,a:t}}),fr=e(function(r,t){return{$:0,d:t.d,b:t.b,a:function(n){return r(t.a(n))}}});var sr=e(function(n,r){return{$:0,a:n,b:r}});function lr(n){return s(Sr,e(function(n,r){return r+1}),0,n)}function dr(n){return s(at,ut(u),w(v),n)}function br(n){return{$:2,a:n}}function vr(n){var r,t,e,a,o,i,u,c;return-1===n.$&&-1===n.d.$&&-1===n.e.$?-1!==n.e.d.$||n.e.d.a?(e=(c=n.e).b,a=c.c,o=c.d,c=c.e,b(j,1,n.b,n.c,b(j,0,(r=n.d).b,r.c,r.d,r.e),b(j,0,e,a,o,c))):(e=(t=n.e).b,a=t.c,i=(o=t.d).d,u=o.e,c=t.e,b(j,0,o.b,o.c,b(j,1,n.b,n.c,b(j,0,(r=n.d).b,r.c,r.d,r.e),i),b(j,1,e,a,u,c))):n}function hr(n){var r,t,e,a,o,i,u,c,f;return-1===n.$&&-1===n.d.$&&-1===n.e.$?-1!==n.d.d.$||n.d.d.a?(i=(f=n.e).b,u=f.c,c=f.d,f=f.e,b(j,1,r=n.b,t=n.c,b(j,0,(a=n.d).b,a.c,a.d,a=a.e),b(j,0,i,u,c,f))):(r=n.b,t=n.c,a=(e=n.d).e,i=(o=n.e).b,u=o.c,c=o.d,f=o.e,b(j,0,e.b,e.c,b(j,1,(o=e.d).b,o.c,o.d,o.e),b(j,1,r,t,a,b(j,0,i,u,c,f)))):n}function gr(n){var r,t,e,a,o,i;return-1===n.$&&-1===n.d.$?(r=n.a,t=n.b,e=n.c,i=(a=n.d).d,o=n.e,1===a.a?-1!==i.$||i.a?-1===(i=vr(n)).$?(n=i.e,b(Rt,i.a,i.b,i.c,gr(i.d),n)):A:b(j,r,t,e,gr(a),o):b(j,r,t,e,gr(a),o)):A}function pr(n){return{$:4,a:n}}function mr(n){var r=rt(n)<=256;return 0<lr(l(Yt,l(Ut,Zt,l(Qt,{aD:!1,aR:!1},"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$")),n))&&r}function $r(n){return function(n){return ie(Jt({aA:!1,aC:n.aC,aI:n.aI,aK:n.aK,aQ:n.aQ,a1:n.a1,au:n.au,a4:n.a4}))}({aC:n.aC,aI:n.aI,aK:v,aQ:"POST",a1:k,au:k,a4:n.a4})}function yr(n){return l(Pn,"height",Tr(n))}function o(n){return l(ce,"href",/^javascript:/i.test((n=n).replace(/\s/g,""))?"":n)}function i(n){return l(ce,"src",qn(n))}function xr(n){return l(F,h([I("w-full pr-2")]),h([l(F,h([I("lg:hidden")]),h([we])),l(F,h([I("hidden lg:block w-full")]),h([function(n){return l(ke,h([I("h-full w-full flex justify-end content-center justify-items-center gap-4 mr-4"),I("text-base")]),h([d(_e,n,"/feastdayactivities","_self","Activities"),d(_e,n,"/saints","_self","Saints"),d(_e,n,"/animations","_self","Animations"),d(_e,n,"/resources","_self","Resources"),d(_e,n,"/shop","_blank","Shop"),d(_e,n,"/give","_self","Give"),d(_e,n,"/team","_self","About")]))}(n)]))]))}var or=e(function(n,r){var t="g";n.aR&&(t+="m"),n.aD&&(t+="i");try{return Ir(RegExp(r,t))}catch(n){return k}}),kr=r(function(n,r,t){for(var e,a=[],o=0,i=t,t=r.lastIndex,u=-1;o++<n&&(e=r.exec(i))&&u!=r.lastIndex;){for(var c=e.length-1,f=Array(c);0<c;){var s=e[c];f[--c]=s?Ir(s):k}a.push(d(Kt,e[0],e.index,o,h(f))),u=r.lastIndex}return r.lastIndex=t,h(a)}),_r=1,wr=0,u=M,Cr=r(function(n,r,t){for(;;){if(-2===t.$)return r;var e=t.d,a=n,o=s(n,t.b,t.c,s(Cr,n,r,t.e));n=a,r=o,t=e}}),Ar=function(n){return s(Cr,r(function(n,r,t){return l(u,{a:n,b:r},t)}),v,n)},jr=2,y=function(n){return{$:1,a:n}},Fr=e(function(n,r){return{$:3,a:n,b:r}}),Rr=e(function(n,r){return{$:0,a:n,b:r}}),Er=e(function(n,r){return{$:1,a:n,b:r}}),x=function(n){return{$:0,a:n}},Lr=function(n){return{$:2,a:n}},Ir=function(n){return{$:0,a:n}},k={$:1},Nr=on,Tr=function(n){return n+""},Sr=r(function(n,r,t){for(;;){if(!t.b)return r;var e=t.b,a=n,o=l(n,t.a,r);n=a,r=o,t=e}}),Or=function(n){return s(Sr,u,v,n)},Br=n(function(n,r,t,e){return{$:0,a:n,b:r,c:t,d:e}}),Pr=[],qr=W,Dr=e(function(n,r){return X(r)/X(n)}),Gr=qr(l(Dr,2,32)),Mr=d(Br,0,Gr,Pr,Pr),zr=z,Hr=J,Kr=function(n){return n.length},Yr=e(function(n,r){return 0<f(n,r)?n:r}),Qr=H,Zr=e(function(n,r){for(;;){var t=l(Qr,32,n),e=t.b,t=l(u,{$:0,a:t.a},r);if(!e.b)return Or(t);n=e,r=t}}),Ur=e(function(n,r){for(;;){var t=qr(r/32);if(1===t)return l(Qr,32,n).a;n=l(Zr,n,v),r=t}}),Wr=e(function(n,r){var t,e;return r.a?(e=Hr(l(Dr,32,(t=32*r.a)-1)),n=n?Or(r.d):r.d,n=l(Ur,n,r.a),d(Br,Kr(r.c)+t,l(Yr,5,e*Gr),n,r.c)):d(Br,Kr(r.c),Gr,Pr,r.c)}),Jr=P(function(n,r,t,e,a){for(;;){if(r<0)return l(Wr,!1,{d:e,a:t/32|0,c:a});var o={$:1,a:s(zr,32,r,n)};n=n,r=r-32,t=t,e=l(u,o,e),a=a}}),Xr=e(function(n,r){var t;return 0<n?b(Jr,r,n-(t=n%32)-32,n,v,s(zr,t,n-t,r)):Mr}),_=function(n){return!n.$},M=function(n){return{$:0,a:n}},Vr=function(n){switch(n.$){case 0:return 0;case 1:return 1;case 2:return 2;default:return 3}},nt=function(n){return n},rt=function(n){return n.length},tt=function(n){for(;;)0},w=fn,on=w(0),et=n(function(n,r,t,e){var a,o,i,u;return e.b?(a=e.a,(e=e.b).b?(o=e.a,(e=e.b).b?(i=e.a,(e=e.b).b?(u=e.b,l(n,a,l(n,o,l(n,i,l(n,e.a,500<t?s(Sr,n,r,Or(u)):d(et,n,r,t+1,u)))))):l(n,a,l(n,o,l(n,i,r)))):l(n,a,l(n,o,r))):l(n,a,r)):r}),at=r(function(n,r,t){return d(et,n,r,0,t)}),ot=e(function(t,n){return s(at,e(function(n,r){return l(u,t(n),r)}),v,n)}),C=sn,it=e(function(r,n){return l(C,function(n){return w(r(n))},n)}),ut=r(function(t,n,e){return l(C,function(r){return l(C,function(n){return w(l(t,r,n))},e)},n)}),ct=yn,ft=e(function(n,r){return bn(l(C,ct(n),r))}),st=(m.Task={b:on,c:r(function(n,r,t){return l(it,function(n){return 0},dr(l(ot,ft(n),r)))}),d:r(function(n,r,t){return w(0)}),e:e(function(n,r){return l(it,n,r)}),f:void 0},kn("Task")),lt=e(function(n,r){return st(l(it,n,r))}),W=tr,dt={F:"",B:!1,t:""},bt=_n,vt=bt(v),ht=_n(v),gt=wn,pt=e(function(n,r){return{$:3,a:n,b:r}}),mt=function(n){return{$:0,a:n}},$t=e(function(n,r){return{$:4,a:n,b:r}}),yt={$:2},xt=function(n){return{$:1,a:n}},kt=function(n){return{$:0,a:n}},_t={$:1},A={$:-2},wt=A,Ct=function(n){return!n.$},At=xn,jt=t,Ft=e(function(n,r){for(;;){if(-2===r.$)return k;var t=r.c,e=r.d,a=r.e;switch(l(jt,n,r.b)){case 0:n=n,r=e;continue;case 1:return Ir(t);default:n=n,r=a;continue}}}),j=P(function(n,r,t,e,a){return{$:-1,a:n,b:r,c:t,d:e,e:a}}),Rt=P(function(n,r,t,e,a){var o,i,u,c;return-1!==a.$||a.a?-1!==e.$||e.a||-1!==e.d.$||e.d.a?b(j,n,r,t,e,a):(o=e.d,c=e.e,b(j,0,e.b,e.c,b(j,1,o.b,o.c,o.d,o.e),b(j,1,r,t,c,a))):(o=a.b,i=a.c,u=a.d,a=a.e,-1!==e.$||e.a?b(j,n,o,i,b(j,0,r,t,e,u),a):b(j,0,r,t,b(j,1,e.b,e.c,e.d,c=e.e),b(j,1,o,i,u,a)))}),Et=r(function(n,r,t){if(-2===t.$)return b(j,0,n,r,A,A);var e=t.a,a=t.b,o=t.c,i=t.d,u=t.e;switch(l(jt,n,a)){case 0:return b(Rt,e,a,o,s(Et,n,r,i),u);case 1:return b(j,e,a,r,i,u);default:return b(Rt,e,a,o,i,s(Et,n,r,u))}}),Lt=r(function(n,r,t){n=s(Et,n,r,t);return-1!==n.$||n.a?n:b(j,1,n.b,n.c,n.d,n.e)}),It=q(function(n,r,t,e,a,o,i){if(-1!==o.$||o.a){for(;;){if(-1!==i.$||1!==i.a)break;if(-1!==i.d.$)return hr(r);if(1===i.d.a)return hr(r);break}return r}return b(j,t,o.b,o.c,o.d,b(j,0,e,a,o.e,i))}),Nt=e(function(n,r){var t,e,a,o,i,u,c;return-2===r.$?A:(t=r.a,a=r.c,o=r.d,i=r.e,f(n,e=r.b)<0?-1===o.$&&1===o.a?-1!==(u=o.d).$||u.a?-1===(u=vr(r)).$?(c=u.e,b(Rt,u.a,u.b,u.c,l(Nt,n,u.d),c)):A:b(j,t,e,a,l(Nt,n,o),i):b(j,t,e,a,l(Nt,n,o),i):l(Tt,n,D(It,n,r,t,e,a,o,i)))}),Tt=e(function(n,r){var t,e,a,o,i;return-1===r.$?(t=r.a,e=r.c,a=r.d,o=r.e,Y(n,r=r.b)?-1===(i=function(n){for(;;){if(-1!==n.$||-1!==n.d.$)return n;n=n.d}}(o)).$?b(Rt,t,i.b,i.c,a,gr(o)):A:b(Rt,t,r,e,a,l(Nt,n,o))):A}),St=e(function(n,r){n=l(Nt,n,r);return-1!==n.$||n.a?n:b(j,1,n.b,n.c,n.d,n.e)}),Ot=r(function(n,r,t){r=r(l(Ft,n,t));return r.$?l(St,n,t):s(Lt,n,r.a,t)}),Bt=r(function(n,r,t){return r(n(t))}),Pt=e(function(n,r){return s(cr,"",nt,l(Bt,r,n))}),qt={$:2},Dt={$:1},Gt=e(function(n,r){return r.$?y(n(r.a)):x(r.a)}),Mt=e(function(n,r){switch(r.$){case 0:return y({$:0,a:r.a});case 1:return y(Dt);case 2:return y(qt);case 3:return y({$:3,a:r.a.aZ});default:return l(Gt,pr,n(r.b))}}),zt=un,Ht=(z=zt,Rn(J="gtagReportConversion"),m[J]={e:En,u:z,a:Ln},kn(J)),Kt=n(function(n,r,t,e){return{aN:r,aP:n,aS:t,a$:e}}),Yt=kr(1/0),Qt=or,Zt=/.^/,Ut=e(function(n,r){return r.$?n:r.a}),Wt=function(r){return l(lt,tt,{$:2,b:function(n){try{ir.location=r}catch(n){Nn.location.reload(!1)}},c:null})},Jt=function(n){return{$:1,a:n}},Xt=e(function(n,r){return{an:n,as:r}}),H=w(l(Xt,wt,v)),Vt=function(t){return{$:2,b:function(n){var r=t.f;2===r.$&&r.c&&r.c(),t.f=null,n({$:0,a:Z})},c:null}},ne=bn,re=r(function(t,n,e){for(;;){if(!n.b)return w(e);var a,r=n.a,o=n.b;if(r.$)return a=r.a,l(C,function(n){var r=a.au;return s(re,t,o,1===r.$?e:s(Lt,r.a,n,e))},ne(s(ur,t,ct(t),a)));var i=r.a,r=l(Ft,i,e);if(1!==r.$)return l(C,function(n){return s(re,t,o,l(St,i,e))},Vt(r.a));t=t,n=o,e=e}}),yn=n(function(n,r,t,e){return l(C,function(n){return w(l(Xt,n,t))},s(re,n,r,e.an))}),te=r(function(n,r,t){n=n(r);return n.$?t:l(u,n.a,t)}),ee=e(function(n,r){return s(at,te(n),v,r)}),ae=n(function(n,r,t,e){var a=e.b;return Y(r,e.a)?Ir(l(ct,n,a(t))):k}),on=r(function(n,r,t){return l(C,function(n){return w(t)},dr(l(ee,s(ae,n,r.a,r.b),t.as)))}),tr=e(function(n,r){var t;return r.$?Jt({aA:(t=r.a).aA,aC:t.aC,aI:l(fr,n,t.aI),aK:t.aK,aQ:t.aQ,a1:t.a1,au:t.au,a4:t.a4}):{$:0,a:r.a}}),oe=e(function(n,r){return{$:0,a:n,b:r}}),ie=(m.Http={b:H,c:yn,d:on,e:tr,f:e(function(n,r){return l(oe,r.a,l(Bt,r.b,n))})},kn("Http")),ue=(kn("Http"),e(function(n,r){switch(n.$){case 0:return{a:U(r,{F:n.a}),b:vt};case 1:return mr(r.F)?(t=h([{a:"email",b:zt(r.F)}]),t=s(Sr,e(function(n,r){return s(cn,n.a,n.b,r)}),{},t),{a:U(r,{B:!0,t:"Your request is being processed..."}),b:$r({aC:l(sr,"application/json",l(Nr,0,t)),aI:l(Pt,br,Mt(x)),a4:"https://api.catholicstoriesforchildren.com/add-contact"})}):{a:U(r,{t:"Error: Please enter a valid email"}),b:vt};default:return n.a.$?{a:U(r,{B:!1,t:"Error: please try again later"}),b:vt}:{a:U(r,{B:!1,t:"Email sent!"}),b:bt(h([Ht(""),Wt("/thankyou")]))}}var t})),wn=e(function(n,r){var n=l(ue,n,r.M),t=n.b;return{a:U(r,{M:n.a}),b:l(gt,nt,t)}}),F=c("div"),L=On,ce=e(function(n,r){return l(Bn,n,zt(r))}),I=ce("className"),fe=c("h1"),se=Sn,N=Tn,T=c("a"),S=e(function(n,r){return l(Pn,function(n){return/^(on|formAction$)/i.test(n)?"data-"+n:n}(n),qn(r))}),le=c("h2"),xn=c("iframe"),de=c("img"),a=c("p"),be=c("span"),ve=ce("target"),he=l(F,h([I("flex justify-center py-3 bg-[#ffc7c7]")]),h([l(F,h([I("max-w-3xl")]),h([(t={l:"https://embeds.beehiiv.com/dd054c75-c35e-4456-9bd5-8663c5ad9e52?slim=true",aF:"Get the free guide to help little Catholics through the Sacrament of Reconciliation.",h:"",N:"/assets/images/shop/2.png",L:"Little Reconciliation Booklet"},l(F,h([I("rounded text-left sm:flex")]),h([l(F,h([I("flex justify-center")]),h([l(de,h([i(t.N),I("max-w-72 max-h-72 object-contain")]),v)])),l(F,h([I("p-5")]),h([l(F,h([I("mb-3")]),h([l(le,h([I("mb-3 leading-8")]),h([N(t.L)])),l(a,v,h([N(t.aF)]))])),l(xn,h([i(t.l),yr(52),l(S,"frameborder","0"),l(S,"scrolling","no"),l(S,"width","100%"),l(L,"margin","0"),l(L,"border-radius","0px !important"),l(L,"background-color","transparent")]),v),""!==t.h?l(F,v,h([l(T,h([o(t.h),ve("_blank"),I("text-blue-600 underline")]),h([N("Click here to go to Etsy")])),l(be,v,h([N(". Enter email above for coupon code.")]))])):l(be,v,v)]))])))]))])),ge=l(F,v,h([l(a,v,h([N("Find links to podcasts, videos, books and more. There are a lot of resources out there for Catholic parents and we are here to help you find them.")]))])),pe=l(F,v,l(ot,function(n){return l(T,h([I("grid grid-cols-[100px_1fr] hover:bg-csc-lightpurple rounded p-7"),o(n.O),l(S,"aria-label",n.L)]),h([l(F,v,h([l(de,h([i(n.N),I("w-20 h-20 object-cover")]),v)])),l(F,v,h([l(le,v,h([N(n.L)])),l(a,v,h([N(n.aF)]))]))]))},h([{aF:"Find books here. It's hard to go wrong with a good Catholic book.",N:"https://ik.imagekit.io/catholicstories/Resources_Icons/2_4YvKGvP_Y.png?updatedAt=1679066449106",O:"/resources/books",L:"Books"},{aF:"Find audio podcasts here. Your kids can listen to them while on the road, traveling, while doing coloring activities, or they can be simply enjoyed by themselves.",N:"https://ik.imagekit.io/catholicstories/Resources_Icons/1_EAfo23y5R.png?updatedAt=1679066451335",O:"/resources/podcasts",L:"Podcasts"},{aF:"Find video content here. Videos are a wonderful engaging way to bring a visual representation of the faith into your home.",N:"https://ik.imagekit.io/catholicstories/Resources_Icons/3_mTKsUZQuM.png?updatedAt=1679066450272",O:"/resources/videos",L:"Youtube Channels"},{aF:"Want monthly content at your front door? Check out these wonderful Catholic subscriptions.",N:"https://ik.imagekit.io/catholicstories/Resources_Icons/4_U5qO_iICx.png?updatedAt=1679066449068",O:"/resources/subscriptions",L:"Subscriptions"},{aF:"Find more resources here to help build your prayer life",N:"https://ik.imagekit.io/catholicstories/Resources_Icons/prayerresources_gN76-j6pz.png?updatedAt=1683227269863",O:"/resources/prayer",L:"Prayer Resources"},{aF:"Find activities for feast days throughout the year",N:"https://ik.imagekit.io/catholicstories/Resources_Icons/feastdaycalendar_1__YTmPRisXH.png?updatedAt=1686096632436",O:"/feastdayactivities",L:"Feast Day Activities"},{aF:"Find game resources for a fun way to learn about the Catholic faith",N:"https://ik.imagekit.io/catholicstories/Resources_Icons/Game%20Icon_rb2djF7Hf.png?updatedAt=1693438195519",O:"/resources/games",L:"Games"}]))),me=l(F,h([I("grid grid-cols-[100px_1fr] rounded py-7")]),h([l(F,v,h([l(de,h([i("https://ik.imagekit.io/catholicstories/Construction_Cone_vLoPMhMZBm.png?updatedAt=1679070884463"),I("w-20 h-20 object-cover")]),v)])),l(F,v,h([l(a,v,h([N("This page is a work-in-progress. We are working hard on adding resources for you.")]))]))])),$e=ce("alt"),En=P(function(n,r,t,e,a){return l(F,h([I("flex align-center")]),h([l(T,h([o(n),l(S,"aria-label",r),ve("_blank"),I("mb-5")]),h([l(de,h([I("w-5 h-5 inline-block"),i(t),$e(e)]),v),l(be,h([I("ml-3")]),h([N(a)]))]))]))}),z=b(En,"https://www.facebook.com/catholicstoriesforchildren","CSC Facebook Page","https://ik.imagekit.io/catholicstories/f_logo_RGB-Blue_250_3vs-yhXer.png?updatedAt=1684277030198","Facebook","Facebook"),J=c("footer"),kr=c("h3"),or=b(En,"https://www.instagram.com/catholicstoriesforchildren/","CSC Instagram Page","https://ik.imagekit.io/catholicstories/Instagram_Glyph_Gradient_kFoMs9jIr.png?updatedAt=1684277127293","Instagram","Instagram"),H=l(F,h([I("mb-5")]),h([l(a,h([I("pb-2 pl-1 text-left")]),h([N("Receive free animations, activities, resources, and more!")])),l(xn,h([i("https://embeds.beehiiv.com/d8e1c428-bdfc-437f-a685-0148bd0cf084?slim=true"),yr(52),l(S,"frameborder","0"),l(S,"scrolling","no"),l(L,"margin","0"),l(L,"border-radius","0px !important"),l(L,"background-color","transparent")]),v)])),ye=l(J,h([l(L,"padding",Tr(30)+"px")]),h([l(F,h([I("text-center mb-5")]),h([l(F,v,h([l(F,v,h([l(le,h([I("mb-7")]),h([N("Access Free Animations")]))])),l(F,h([I("text-center grid justify-center mb-10")]),h([H]))])),l(F,h([I("md:grid md:grid-cols-3 md:justify-items-center")]),h([l(F,h([I("text-left")]),h([l(F,v,h([l(kr,h([I("font-bold text-lg")]),h([N("About Us")]))])),l(F,h([I("mb-3")]),h([N("Catholic Stories for Children is a nonprofit aimed at telling short stories, primarily through animation, to help parents teach Catholic prayers, about Catholic saints, and other Catholic concepts.")]))])),l(F,h([I("md:mx-5")]),h([l(de,h([I("rounded max-w-[16rem]"),i("/assets/FullTitle_900x900_NoBackground.png")]),v)])),l(F,h([I("text-left")]),h([l(F,v,h([l(kr,h([I("font-bold text-lg mb-3")]),h([N("Follow Us")]))])),l(F,v,h([or,z]))]))]))])),l(F,h([I("text-xs")]),h([l(a,v,h([N("Copyright © 2024 Catholic Stories for Children. All rights reserved.")])),l(a,v,h([N("Catholic Stories for Children is a 501(c)(3) non-profit recognized by the IRS. Contributions to Catholic Stories for Children are tax-deductible to the extent permitted by law.  Tax ID Number: 85-4194883")])),l(a,v,h([l(T,h([o("/about/privacy-policy"),I("underline")]),h([N("Privacy Policy")])),l(be,v,h([N(" | ")])),l(T,h([o("/about/terms-and-conditions"),I("underline")]),h([N("Terms & Conditions")]))]))]))])),xe=c("header"),ke=c("nav"),_e=n(function(n,r,t,e){return l(T,h([o(r),I("flex items-center justify-center"),I("hover:scale-105 transition ease-in-out"),I("hover:border-b-4 hover:border-[#9101b3]"),I("rounded"),I("h-[60px] h-["+n+"]"),I("p-2"),l(S,"aria-label",e),ve(t)]),h([N(e)]))}),we=l(T,h([o("/navigation"),I("space-y-2"),l(S,"aria-label","menu")]),h([l(F,h([I("w-8 h-0.5 m-auto bg-gray-600")]),v),l(F,h([I("w-8 h-0.5 m-auto bg-gray-600")]),v),l(F,h([I("w-8 h-0.5 m-auto bg-gray-600")]),v)])),Ce=e(function(n,r){var n=n?{a:"text-[0px] md:text-xl",b:"invisible md:visible"}:{a:"text-lg md:text-xl",b:""},t=n.a,n=n.b;return l(T,h([l(L,"text-decoration","none"),I("colorDarkGray"),I(n),I("justify-self-start"),o("/")]),h([l(fe,h([l(L,"font-family","hvdComicSerifPro"),l(L,"margin","0px"),I(t)]),h([N("Catholic Stories for Children")]))]))}),yn=l(de,h([i("/assets/logo_solid.svg"),l(L,"height","30px"),$e(""),l(L,"vertical-align","middle")]),v),Ae=l(T,h([l(L,"text-decoration","none"),I("colorDarkGray"),o("/"),l(S,"aria-label","home")]),h([yn])),je=e(function(n,r){var t="Catholic Stories for Children"===n?{a:"111px",b:xr,c:"grid-cols-[150px_1fr_150px] lg:grid-cols-[150px_1fr_600px]"}:{a:"60px",b:xr,c:"grid-cols-[150px_1fr_150px] lg:grid-cols-[150px_1fr_600px]"},e=t.a,a=t.b,t=t.c;return l(xe,h([l(L,"background-color","#3d5d75"),l(L,"background-image","linear-gradient(130deg, #9DE2EB , #EBD6F1)"),I("h-[60px] md:h-["+e+"]"),I("colorDarkGray"),I("grid items-center justify-items-center"),I(t)]),h([Ae,l(Ce,!0,n),a(e)]))}),on=W({aO:function(n){return{a:{M:dt},b:vt}},a0:function(n){return ht},a3:wn,a5:function(n){return l(F,h([l(L,"height","100vh"),l(L,"overflow-x","hidden"),l(L,"overflow-y","auto"),l(L,"perspective","300px"),l(L,"scroll-behavior","smooth"),l(L,"background-color","#FEF7F4")]),h([l(je,"Resources",10),l(F,v,h([l(F,h([I("max-w-3xl m-auto p-5")]),h([l(fe,h([I("my-10 leading-10")]),h([N("Resources")])),ge])),l(F,h([I("mt-2 mb-20")]),h([l(se,nt,he)])),l(F,h([I("max-w-3xl m-auto p-5")]),h([pe,me]))])),ye]))}});tr={Resources:{Main:{init:on(M(0))(0)}}},O.Elm?function n(r,t){for(var e in t)e in r?"init"==e?K(6):n(r[e],t[e]):r[e]=t[e]}(O.Elm,tr):O.Elm=tr}(this);