!function(J){"use strict";function L(r,n,e){return e.a=r,e.f=n,e}function a(e){return L(2,e,function(n){return function(r){return e(n,r)}})}function r(t){return L(3,t,function(e){return function(n){return function(r){return t(e,n,r)}}})}function P(a){return L(4,a,function(t){return function(e){return function(n){return function(r){return a(t,e,n,r)}}}})}function D(o){return L(5,o,function(a){return function(t){return function(e){return function(n){return function(r){return o(a,t,e,n,r)}}}}})}function d(r,n,e){return 2===r.a?r.f(n,e):r(n)(e)}function s(r,n,e,t){return 3===r.a?r.f(n,e,t):r(n)(e)(t)}function l(r,n,e,t,a){return 4===r.a?r.f(n,e,t,a):r(n)(e)(t)(a)}function H(r,n,e,t,a,o){return 5===r.a?r.f(n,e,t,a,o):r(n)(e)(t)(a)(o)}function t(r,n,e){if("object"!=typeof r)return r===n?0:r<n?-1:1;if(void 0===r.$)return(e=(e=t(r.a,n.a))||t(r.b,n.b))||t(r.c,n.c);for(;r.b&&n.b&&!(e=t(r.a,n.a));r=r.b,n=n.b);return e||(r.b?1:n.b?-1:0)}var q=0;function b(r,n){var e,t={};for(e in r)t[e]=r[e];for(e in n)t[e]=n[e];return t}function o(r,n){if("string"==typeof r)return r+n;if(!r.b)return n;var e={$:1,a:r.a,b:n};r=r.b;for(var t=e;r.b;r=r.b)t=t.b={$:1,a:r.a,b:n};return e}var v={$:0};function G(r,n){return{$:1,a:r,b:n}}var K=a(G);function h(r){for(var n=v,e=r.length;e--;)n={$:1,a:r[e],b:n};return n}function M(r){for(var n=[];r.b;r=r.b)n.push(r.a);return n}var z=r(function(r,n,e){for(var t=Array(r),a=0;a<r;a++)t[a]=e(n+a);return t}),n=a(function(r,n){for(var e=Array(r),t=0;t<r&&n.b;t++)e[t]=n.a,n=n.b;return e.length=t,{a:e,b:n}});function O(r){throw Error("https://github.com/elm/core/blob/1.0.0/hints/"+r+".md")}var e=Math.ceil,i=Math.floor,Y=Math.log;var W=a(function(r,n){return r+n});var U=r(function(r,n,e){for(var t=e.length,a=0;a<t;){var o=e[a],i=e.charCodeAt(a);a++,i<55296||56319<i||(o+=e[a],a++),n=d(r,o,n)}return n}),X=a(function(r,n){return n.split(r)}),Q=a(function(r,n){return n.join(r)});var V=a(g);function g(r,n){switch(r.$){case 2:return r.b(n);case 5:return null===n?vn(r.c):p("null",n);case 3:return rr(n)?Z(r.b,n,h):p("a LIST",n);case 4:return rr(n)?Z(r.b,n,nr):p("an ARRAY",n);case 6:var e=r.d;return"object"==typeof n&&null!==n&&e in n?(o=g(r.b,n[e]),k(o)?o:_(d(dn,e,o.a))):p("an OBJECT with a field named `"+e+"`",n);case 7:e=r.e;return rr(n)?e<n.length?(o=g(r.b,n[e]),k(o)?o:_(d(bn,e,o.a))):p("a LONGER array. Need index "+e+" but only see "+n.length+" entries",n):p("an ARRAY",n);case 8:if("object"!=typeof n||null===n||rr(n))return p("an OBJECT",n);var t,a=v;for(t in n)if(n.hasOwnProperty(t)){var o=g(r.b,n[t]);if(!k(o))return _(d(dn,t,o.a));a={$:1,a:{a:t,b:o.a},b:a}}return vn(_n(a));case 9:for(var i=r.f,u=r.g,c=0;c<u.length;c++){o=g(u[c],n);if(!k(o))return o;i=i(o.a)}return vn(i);case 10:o=g(r.b,n);return k(o)?g(r.h(o.a),n):o;case 11:for(var f=v,s=r.g;s.b;s=s.b){o=g(s.a,n);if(k(o))return o;f={$:1,a:o.a,b:f}}return _(hn(_n(f)));case 1:return _(d(ln,r.a,n));case 0:return vn(r.a)}}function Z(r,n,e){for(var t=n.length,a=Array(t),o=0;o<t;o++){var i=g(r,n[o]);if(!k(i))return _(d(bn,o,i.a));a[o]=i.a}return vn(e(a))}function rr(r){return Array.isArray(r)||"undefined"!=typeof FileList&&r instanceof FileList}function nr(n){return d(Ln,n.length,function(r){return n[r]})}function p(r,n){return _(d(ln,"Expecting "+r,n))}function c(r,n){if(r===n)return!0;if(r.$!==n.$)return!1;switch(r.$){case 0:case 1:return r.a===n.a;case 2:return r.b===n.b;case 5:return r.c===n.c;case 3:case 4:case 8:return c(r.b,n.b);case 6:return r.d===n.d&&c(r.b,n.b);case 7:return r.e===n.e&&c(r.b,n.b);case 9:return r.f===n.f&&er(r.g,n.g);case 10:return r.h===n.h&&c(r.b,n.b);case 11:return er(r.g,n.g)}}function er(r,n){var e=r.length;if(e!==n.length)return!1;for(var t=0;t<e;t++)if(!c(r[t],n[t]))return!1;return!0}var tr=a(function(r,n){return JSON.stringify(n,null,r)+""});function ar(r){return r}function or(r){return{$:0,a:r}}var ir=a(function(r,n){return{$:3,b:r,d:n}});var ur=0;function cr(r){r={$:0,e:ur++,f:r,g:null,h:[]};return br(r),r}function fr(n){return{$:2,b:function(r){r({$:0,a:cr(n)})},c:null}}function sr(r,n){r.h.push(n),br(r)}var lr=!1,dr=[];function br(r){if(dr.push(r),!lr){for(lr=!0;r=dr.shift();)!function(n){for(;n.f;){var r=n.f.$;if(0===r||1===r){for(;n.g&&n.g.$!==r;)n.g=n.g.i;if(!n.g)return;n.f=n.g.b(n.f.a),n.g=n.g.i}else{if(2===r)return n.f.c=n.f.b(function(r){n.f=r,br(n)});if(5===r){if(0===n.h.length)return;n.f=n.f.b(n.h.shift())}else n.g={$:3===r?0:1,b:n.f.b,i:n.g},n.f=n.f.d}}}(r);lr=!1}}function vr(r,n,e,t,a,o){var r=d(V,r,n?n.flags:void 0),i=(k(r)||O(2),{}),n=e(r.a),u=n.a,c=o(f,u),e=function(r,n){var e,t;for(t in m){var a=m[t];a.a&&((e=e||{})[t]=a.a(t,n)),r[t]=function(r,n){var t={g:n,h:void 0},a=r.c,o=r.d,i=r.e,u=r.f;function c(e){return d(ir,c,{$:5,b:function(r){var n=r.a;return 0===r.$?s(o,t,n,e):i&&u?l(a,t,n.i,n.j,e):s(a,t,i?n.i:n.j,e)}})}return t.h=cr(d(ir,c,r.b))}(a,n)}return e}(i,f);function f(r,n){r=d(t,r,u);c(u=r.a,n),yr(i,r.b,a(u))}return yr(i,n.b,a(u)),e?{ports:e}:{}}var m={};var hr=a(function(n,e){return{$:2,b:function(r){n.g(e),r({$:0,a:q})},c:null}});function gr(n){return function(r){return{$:1,k:n,l:r}}}function pr(r){return{$:2,m:r}}var mr=[],$r=!1;function yr(r,n,e){if(mr.push({p:r,q:n,r:e}),!$r){$r=!0;for(var t;t=mr.shift();)!function(r,n,e){var t,a={};for(t in _r(!0,n,a,null),_r(!1,e,a,null),r)sr(r[t],{$:"fx",a:a[t]||{i:v,j:v}})}(t.p,t.q,t.r);$r=!1}}function _r(r,n,e,t){switch(n.$){case 1:var a=n.k,o=function(r,n,e,t){function a(r){for(var n=e;n;n=n.t)r=n.s(r);return r}return d(r?m[n].e:m[n].f,a,t)}(r,a,t,n.l);return void(e[a]=function(r,n,e){return e=e||{i:v,j:v},r?e.i={$:1,a:n,b:e.i}:e.j={$:1,a:n,b:e.j},e}(r,o,e[a]));case 2:for(var i=n.m;i.b;i=i.b)_r(r,i.a,e,t);return;case 3:_r(r,n.o,e,{s:n.n,t:t})}}var kr;var wr="undefined"!=typeof document?document:{};function xr(r){return{$:0,a:r}}var Ar=a(function(o,i){return a(function(r,n){for(var e=[],t=0;n.b;n=n.b){var a=n.a;t+=a.b||0,e.push(a)}return t+=e.length,{$:1,c:i,d:Ir(r),e:e,f:o,b:t}})})(void 0),Cr=a(function(o,i){return a(function(r,n){for(var e=[],t=0;n.b;n=n.b){var a=n.a;t+=a.b.b||0,e.push(a)}return t+=e.length,{$:2,c:i,d:Ir(r),e:e,f:o,b:t}})})(void 0);var jr=a(function(r,n){return{$:"a0",n:r,o:n}}),Fr=a(function(r,n){return{$:"a1",n:r,o:n}}),Nr=a(function(r,n){return{$:"a2",n:r,o:n}}),Er=a(function(r,n){return{$:"a3",n:r,o:n}});function Rr(r){return"script"==r?"p":r}function Br(r){return/^\s*(javascript:|data:text\/html)/i.test(r)?"":r}var Sr;function Ir(r){for(var n={};r.b;r=r.b){var e,t=r.a,a=t.$,o=t.n,t=t.o;"a2"===a?"className"===o?Tr(n,o,t):n[o]=t:(e=n[a]||(n[a]={}),"a3"===a&&"class"===o?Tr(e,o,t):e[o]=t)}return n}function Tr(r,n,e){var t=r[n];r[n]=t?t+" "+e:e}function f(r,n){var e=r.$;if(5===e)return f(r.k||(r.k=r.m()),n);if(0===e)return wr.createTextNode(r.a);if(4===e){for(var t=r.k,a=r.j;4===t.$;)"object"!=typeof a?a=[a,t.j]:a.push(t.j),t=t.k;var o={j:a,p:n};(i=f(t,o)).elm_event_node_ref=o}else if(3===e)Jr(i=r.h(r.g),n,r.d);else{var i=r.f?wr.createElementNS(r.f,r.c):wr.createElement(r.c);kr&&"a"==r.c&&i.addEventListener("click",kr(i)),Jr(i,n,r.d);for(var u=r.e,c=0;c<u.length;c++)i.appendChild(f(1===e?u[c]:u[c].b,n))}return i}function Jr(r,n,e){for(var t in e){var a=e[t];"a1"===t?function(r,n){var e,t=r.style;for(e in n)t[e]=n[e]}(r,a):"a0"===t?function(r,n,e){var t,a=r.elmFs||(r.elmFs={});for(t in e){var o=e[t],i=a[t];if(o){if(i){if(i.q.$===o.$){i.q=o;continue}r.removeEventListener(t,i)}i=function(c,r){function f(r){var n=f.q,e=g(n.a,r);if(k(e)){for(var t,n=Pn(n),e=e.a,a=n?n<3?e.a:e.r:e,o=1==n?e.b:3==n&&e.Q,i=(o&&r.stopPropagation(),(2==n?e.b:3==n&&e.N)&&r.preventDefault(),c);t=i.j;){if("function"==typeof t)a=t(a);else for(var u=t.length;u--;)a=t[u](a);i=i.p}i(a,o)}}return f.q=r,f}(n,o),r.addEventListener(t,i,Sr&&{passive:Pn(o)<2}),a[t]=i}else r.removeEventListener(t,i),a[t]=void 0}}(r,n,a):"a3"===t?function(r,n){for(var e in n){var t=n[e];void 0!==t?r.setAttribute(e,t):r.removeAttribute(e)}}(r,a):"a4"===t?function(r,n){for(var e in n){var t=n[e],a=t.f,t=t.o;void 0!==t?r.setAttributeNS(a,e,t):r.removeAttributeNS(a,e)}}(r,a):("value"!==t&&"checked"!==t||r[t]!==a)&&(r[t]=a)}}try{window.addEventListener("t",null,Object.defineProperty({},"passive",{get:function(){Sr=!0}}))}catch(r){}function Lr(r,n){var e=[];return E(r,n,e,0),e}function N(r,n,e,t){n={$:n,r:e,s:t,t:void 0,u:void 0};return r.push(n),n}function E(r,n,e,t){if(r!==n){var a=r.$,o=n.$;if(a!==o){if(1!==a||2!==o)return void N(e,0,t,n);n=function(r){for(var n=r.e,e=n.length,t=Array(e),a=0;a<e;a++)t[a]=n[a].b;return{$:1,c:r.c,d:r.d,e:t,f:r.f,b:r.b}}(n),o=1}switch(o){case 5:for(var i=r.l,u=n.l,c=i.length,f=c===u.length;f&&c--;)f=i[c]===u[c];if(f)return void(n.k=r.k);n.k=n.m();var s=[];return E(r.k,n.k,s,0),void(0<s.length&&N(e,1,t,s));case 4:for(var l=r.j,d=n.j,b=!1,v=r.k;4===v.$;)b=!0,"object"!=typeof l?l=[l,v.j]:l.push(v.j),v=v.k;for(var h=n.k;4===h.$;)b=!0,"object"!=typeof d?d=[d,h.j]:d.push(h.j),h=h.k;return b&&l.length!==d.length?void N(e,0,t,n):((b?function(r,n){for(var e=0;e<r.length;e++)if(r[e]!==n[e])return;return 1}(l,d):l===d)||N(e,2,t,d),void E(v,h,e,t+1));case 0:return void(r.a!==n.a&&N(e,3,t,n.a));case 1:return void Pr(r,n,e,t,Hr);case 2:return void Pr(r,n,e,t,qr);case 3:if(r.h!==n.h)return void N(e,0,t,n);s=Dr(r.d,n.d),s=(s&&N(e,4,t,s),n.i(r.g,n.g));s&&N(e,5,t,s)}}}function Pr(r,n,e,t,a){var o;r.c!==n.c||r.f!==n.f?N(e,0,t,n):((o=Dr(r.d,n.d))&&N(e,4,t,o),a(r,n,e,t))}function Dr(r,n,e){var t,a,o,i,u;for(a in r)"a1"===a||"a0"===a||"a3"===a||"a4"===a?(o=Dr(r[a],n[a]||{},a))&&((t=t||{})[a]=o):a in n?(o=r[a])===(i=n[a])&&"value"!==a&&"checked"!==a||"a0"===e&&function(r,n){return r.$==n.$&&c(r.a,n.a)}(o,i)||((t=t||{})[a]=i):(t=t||{})[a]=e?"a1"===e?"":"a0"===e||"a3"===e?void 0:{f:r[a].f,o:void 0}:"string"==typeof r[a]?"":null;for(u in n)u in r||((t=t||{})[u]=n[u]);return t}function Hr(r,n,e,t){var a=r.e,o=n.e,r=a.length,n=o.length;n<r?N(e,6,t,{v:n,i:r-n}):r<n&&N(e,7,t,{v:r,e:o});for(var i=r<n?r:n,u=0;u<i;u++){var c=a[u];E(c,o[u],e,++t),t+=c.b||0}}function qr(r,n,e,t){for(var a=[],o={},i=[],u=r.e,c=n.e,f=u.length,s=c.length,l=0,d=0,b=t;l<f&&d<s;){var v=u[l],h=c[d],g=v.a,p=h.a,m=v.b,$=h.b,y=void 0,_=void 0;if(g===p)E(m,$,a,++b),b+=m.b||0,l++,d++;else{var k,w,x,A,C=u[l+1],j=c[d+1];if(C&&(w=C.b,_=p===(k=C.a)),j&&(A=j.b,y=g===(x=j.a)),y&&_)E(m,A,a,++b),R(o,a,g,$,d,i),b+=m.b||0,B(o,a,g,w,++b),b+=w.b||0,l+=2,d+=2;else if(y)b++,R(o,a,p,$,d,i),E(m,A,a,b),b+=m.b||0,l+=1,d+=2;else if(_)B(o,a,g,m,++b),b+=m.b||0,E(w,$,a,++b),b+=w.b||0,l+=2,d+=1;else{if(!C||k!==x)break;B(o,a,g,m,++b),R(o,a,p,$,d,i),b+=m.b||0,E(w,A,a,++b),b+=w.b||0,l+=2,d+=2}}}for(;l<f;){m=(v=u[l]).b;B(o,a,v.a,m,++b),b+=m.b||0,l++}for(;d<s;){var F=F||[];R(o,a,(h=c[d]).a,h.b,void 0,F),d++}(0<a.length||0<i.length||F)&&N(e,8,t,{w:a,x:i,y:F})}var Gr="_elmW6BL";function R(r,n,e,t,a,o){var i,u=r[e];u?1===u.c?(o.push({r:a,A:u}),u.c=2,E(u.z,t,i=[],u.r),u.r=a,u.s.s={w:i,A:u}):R(r,n,e+Gr,t,a,o):(o.push({r:a,A:u={c:0,z:t,r:a,s:void 0}}),r[e]=u)}function B(r,n,e,t,a){var o,i=r[e];i?0===i.c?(i.c=2,E(t,i.z,o=[],a),N(n,9,a,{w:o,A:i})):B(r,n,e+Gr,t,a):(o=N(n,9,a,void 0),r[e]={c:1,z:t,r:a,s:o})}function Kr(r,n,e,t){!function r(n,e,t,a,o,i,u){var c=t[a];var f=c.r;for(;f===o;){var s,l=c.$;if(1===l?Kr(n,e.k,c.s,u):8===l?(c.t=n,c.u=u,0<(s=c.s.w).length&&r(n,e,s,0,o,i,u)):9===l?(c.t=n,c.u=u,(l=c.s)&&(l.A.s=n,0<(s=l.w).length)&&r(n,e,s,0,o,i,u)):(c.t=n,c.u=u),!(c=t[++a])||(f=c.r)>i)return a}var d=e.$;if(4===d){for(var b=e.k;4===b.$;)b=b.k;return r(n,b,t,a,o+1,i,n.elm_event_node_ref)}var v=e.e;var h=n.childNodes;for(var g=0;g<v.length;g++){var p=1===d?v[g]:v[g].b,m=++o+(p.b||0);if(o<=f&&f<=m&&(a=r(h[g],p,t,a,o,m,u),!(c=t[a])||(f=c.r)>i))return a;o=m}return a}(r,n,e,0,0,n.b,t)}function Mr(r,n,e,t){return 0===e.length?r:(Kr(r,n,e,t),zr(r,e))}function zr(r,n){for(var e=0;e<n.length;e++){var t=n[e],a=t.t,t=function(r,n){switch(n.$){case 0:return function(r,n,e){var t=r.parentNode,n=f(n,e);n.elm_event_node_ref||(n.elm_event_node_ref=r.elm_event_node_ref);t&&n!==r&&t.replaceChild(n,r);return n}(r,n.s,n.u);case 4:return Jr(r,n.u,n.s),r;case 3:return r.replaceData(0,r.length,n.s),r;case 1:return zr(r,n.s);case 2:return r.elm_event_node_ref?r.elm_event_node_ref.j=n.s:r.elm_event_node_ref={j:n.s,p:n.u},r;case 6:for(var e=n.s,t=0;t<e.i;t++)r.removeChild(r.childNodes[e.v]);return r;case 7:for(var a=(e=n.s).e,t=e.v,o=r.childNodes[t];t<a.length;t++)r.insertBefore(f(a[t],n.u),o);return r;case 9:var i;return(e=n.s)?(void 0!==(i=e.A).r&&r.parentNode.removeChild(r),i.s=zr(r,e.w)):r.parentNode.removeChild(r),r;case 8:return function(r,n){for(var e=n.s,t=function(r,n){if(r){for(var e=wr.createDocumentFragment(),t=0;t<r.length;t++){var a=r[t].A;e.appendChild(2===a.c?a.s:f(a.z,n.u))}return e}}(e.y,n),a=(r=zr(r,e.w),e.x),o=0;o<a.length;o++){var i=a[o],u=i.A,u=2===u.c?u.s:f(u.z,n.u);r.insertBefore(u,r.childNodes[i.r])}t&&r.appendChild(t);return r}(r,n);case 5:return n.s(r);default:O(10)}}(a,t);a===r&&(r=t)}return r}function Or(r){if(3===r.nodeType)return{$:0,a:r.textContent};if(1!==r.nodeType)return{$:0,a:""};for(var n=v,e=r.attributes,t=e.length;t--;)var a=e[t],n={$:1,a:d(Er,a.name,a.value),b:n};for(var o=r.tagName.toLowerCase(),i=v,u=r.childNodes,t=u.length;t--;)i={$:1,a:Or(u[t]),b:i};return s(Ar,o,n,i)}var Yr=P(function(n,r,e,i){return vr(r,i,n.aJ,n.a_,n.aX,function(e,r){var t=n.a0,a=i.node,o=Or(a);return Ur(r,function(r){var r=t(r),n=Lr(o,r);a=Mr(a,o,n,e),o=r})})}),Wr="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:function(r){return setTimeout(r,1e3/60)};function Ur(e,t){t(e);var a=0;function o(){a=1===a?0:(Wr(o),t(e),1)}return function(r,n){e=r,n?(t(e),2===a&&(a=1)):(0===a&&Wr(o),a=2)}}function Xr(r){return(r=yn(r))<=90&&65<=r}function Qr(r){return r}function Vr(r){switch(r.$){case 0:return d(Un,r.a,r.b);case 1:return d(ne,r.a,te(r.b));case 2:return d(ne,r.a,Xn(r.b));case 3:return d(ne,r.a,r.b);case 4:return d(ae,r.a,r.b);default:switch(r.b.$){case 0:return d(Zn,r.a,r.b.a);case 1:return d(ee,r.a,r.b.a);case 2:return d(re,r.a,r.b.a);default:return d(Vn,r.a,r.b.a)}}}function Zr(r){return Ar(Rr(r))}function rn(r){return Cr(Rr(r))}function nn(r){if(r.$)return ie(r.a);var n=r.a,e=r.b,t=r.c;switch(t.$){case 0:return s(Zr,n,d(w,Vr,e),v);case 1:var a=t.a;return s(Zr,n,d(w,Vr,e),d(w,nn,a));default:a=t.a;return s(rn,n,d(w,Vr,e),d(w,oe(nn),a))}}function en(r){return r.b}function tn(r){return d(ve,r,"")}function an(r){switch(r){case"className":return"class";case"defaultValue":return"value";case"htmlFor":return"for";default:return r}}function on(r){return xe(r)}function u(r){return d(Ce,"href",r)}function $(r){return d(Ce,"src",r)}function un(r){return d(Ce,"target",r)}function cn(r){return d(Ce,"alt",r)}function fn(r){return d(A,h([j("w-full")]),h([d(A,h([j("lg:hidden")]),h([Se])),d(A,h([j("hidden lg:block w-full")]),h([function(r){return d(Be,h([j("h-full w-full grid grid-cols-6 content-center justify-items-center")]),h([l(T,r,"/animations","_self","Animations"),l(T,r,"https://www.etsy.com/shop/CatholicStories","_blank","Shop"),l(T,r,"/resources","_self","Resources"),l(T,r,"/contact","_self","Contact"),l(T,r,"/give","_self","Give"),l(T,r,"/team","_self","About Us")]))}(r)]))]))}var sn,y=K,_=function(r){return{$:1,a:r}},ln=a(function(r,n){return{$:3,a:r,b:n}}),dn=a(function(r,n){return{$:0,a:r,b:n}}),bn=a(function(r,n){return{$:1,a:r,b:n}}),vn=function(r){return{$:0,a:r}},hn=function(r){return{$:2,a:r}},gn=tr,K=function(r){return r+""},pn=a(function(r,n){return d(Q,r,M(n))}),mn=a(function(r,n){return h(d(X,r,n))}),$n=r(function(r,n,e){for(;;){if(!e.b)return n;var t=e.b,a=r,o=d(r,e.a,n);r=a,n=o,e=t}}),yn=function(r){var n=r.charCodeAt(0);return n<55296||56319<n?n:1024*(n-55296)+r.charCodeAt(1)-56320+65536},_n=function(r){return s($n,y,v,r)},kn=P(function(r,n,e,t){return{$:0,a:r,b:n,c:e,d:t}}),wn=[],xn=e,An=a(function(r,n){return Y(n)/Y(r)}),Cn=xn(d(An,2,32)),jn=l(kn,0,Cn,wn,wn),Fn=z,Nn=i,En=function(r){return r.length},Rn=a(function(r,n){return 0<t(r,n)?r:n}),Bn=n,Sn=a(function(r,n){for(;;){var e=d(Bn,32,r),t=e.b,e=d(y,{$:0,a:e.a},n);if(!t.b)return _n(e);r=t,n=e}}),In=a(function(r,n){for(;;){var e=xn(n/32);if(1===e)return d(Bn,32,r).a;r=d(Sn,r,v),n=e}}),Tn=a(function(r,n){var e,t;return n.a?(t=Nn(d(An,32,(e=32*n.a)-1)),r=r?_n(n.d):n.d,r=d(In,r,n.a),l(kn,En(n.c)+e,d(Rn,5,t*Cn),r,n.c)):l(kn,En(n.c),Cn,wn,n.c)}),Jn=D(function(r,n,e,t,a){for(;;){if(n<0)return d(Tn,!1,{d:t,a:e/32|0,c:a});var o={$:1,a:s(Fn,32,n,r)};r=r,n=n-32,e=e,t=d(y,o,t),a=a}}),Ln=a(function(r,n){var e;return 0<r?H(Jn,n,r-(e=r%32)-32,r,v,s(Fn,e,r-e,n)):jn}),k=function(r){return!r.$},tr=function(r){return{$:0,a:r}},Pn=function(r){switch(r.$){case 0:return 0;case 1:return 1;case 2:return 2;default:return 3}},Dn=or,e=Dn(0),Hn=P(function(r,n,e,t){var a,o,i,u;return t.b?(a=t.a,(t=t.b).b?(o=t.a,(t=t.b).b?(i=t.a,(t=t.b).b?(u=t.b,d(r,a,d(r,o,d(r,i,d(r,t.a,500<e?s($n,r,n,_n(u)):l(Hn,r,n,e+1,u)))))):d(r,a,d(r,o,d(r,i,n)))):d(r,a,d(r,o,n))):d(r,a,n)):n}),qn=r(function(r,n,e){return l(Hn,r,n,0,e)}),w=a(function(e,r){return s(qn,a(function(r,n){return d(y,e(r),n)}),v,r)}),Gn=ir,Kn=a(function(n,r){return d(Gn,function(r){return Dn(n(r))},r)}),Mn=r(function(e,r,t){return d(Gn,function(n){return d(Gn,function(r){return Dn(d(e,n,r))},t)},r)}),zn=hr,On=a(function(r,n){return fr(d(Gn,zn(r),n))}),z=r(function(r,n,e){return d(Kn,function(r){return 0},(r=d(w,On(r),n),s(qn,Mn(y),Dn(v),r)))}),Yn=(m.Task={b:e,c:z,d:r(function(r,n,e){return Dn(0)}),e:a(function(r,n){return d(Kn,r,n)}),f:void 0},gr("Task"),pr(v)),Wn=pr(v),x=function(r){return{$:1,a:r}},Un=a(function(r,n){return d(Er,function(r){return/^(on|formAction$)/i.test(r)?"data-"+r:r}(r),Br(n))}),Xn=ar,Qn=jr,Vn=a(function(r,n){return d(Qn,r,{$:3,a:n})}),Zn=a(function(r,n){return d(Qn,r,{$:0,a:n})}),re=a(function(r,n){return d(Qn,r,{$:2,a:n})}),ne=a(function(r,n){return d(Nr,function(r){return"innerHTML"==r||"formAction"==r?"data-"+r:r}(r),Br(n))}),ee=a(function(r,n){return d(Qn,r,{$:1,a:n})}),te=ar,ae=Fr,oe=a(function(r,n){return{a:n.a,b:r(n.b)}}),ie=xr,ue=nn,ce=a(function(r,n){return r}),fe=r(function(r,n,e){return 0<r?s(fe,r>>1,o(n,n),1&r?o(e,n):e):e}),se=a(function(r,n){return s(fe,r,n,"")}),le=r(function(r,n,e){return o(d(se,r*n," "),e)}),de=a(function(e,r){var n,t;return r.b?r.b.b?(t=r.a,n=r.b,s($n,a(function(r,n){return o(r,o(e,n))}),t,n)):r.a:""}),i=r(function(r,n,e){return n(r(e))}),n=r(function(r,n,e){return d(pn,n,d(mn,r,e))}),be=d(i,d(n,"&","&amp;"),d(i,d(n,"<","&lt;"),d(n,">","&gt;"))),hr=U,ve=W,he=d(hr,a(function(r,n){return'"'===r?n+'\\"':o(n,tn(r))}),""),ge=function(r){return r.toLowerCase()},pe=d(hr,a(function(r,n){return Xr(r)?n+("-"+tn(ge(r))):o(n,tn(r))}),""),me=a(function(r,n){return pe(r)+('="'+he(n))+'"'}),$e=a(function(r,n){var e=n.a,t=n.b,a=n.c;switch(r.$){case 0:return{a:e,b:t,c:d(y,d(me,u=r.a,i=r.b),a)};case 1:return"className"===r.a?{a:d(y,i=r.b,e),b:t,c:a}:(i=r.b,{a:e,b:t,c:d(y,d(me,an(o=r.a),i),a)});case 2:var o=r.a;return r.b?{a:e,b:t,c:d(y,pe(an(o)),a)}:n;case 3:var o=r.a,i=r.b;return{a:e,b:t,c:d(y,d(me,an(o),d(gn,0,i)),a)};case 4:var u=r.a,i=r.b;return{a:e,b:d(y,he(u)+(": "+he(i)),t),c:a};default:return n}}),ye=a(function(r,n){return r.b?d(y,d(me,"class",d(de," ",r)),n):n}),_e=a(function(r,n){return r.b?d(y,d(me,"style",d(de,"; ",r)),n):n}),ke=a(function(r,n){return"<"+d(pn," ",d(y,r,function(r){r=s($n,$e,{a:v,b:v,c:v},r);return d(_e,r.b,d(ye,r.a,r.c))}(n)))+">"}),we=r(function(r,n,e){for(;;)if(n.b)if(n.a.$){c=r,f=u=n.b,s=b(e,{g:d(y,d(r,e.e,be(n.a.a)),e.g)});r=c,n=f,e=s}else{var t=n.a,a=t.a,o=t.b,i=t.c,u=n.b;switch(i.$){case 0:var c=r,f=u,s=b(e,{g:d(y,d(r,e.e,d(ke,a,o)),e.g)});r=c,n=f,e=s;continue;case 1:c=r,f=i.a,s=b(e,{e:e.e+1,g:d(y,d(r,e.e,d(ke,a,o)),e.g),n:d(y,{a:a,b:u},e.n)});r=c,n=f,e=s;continue;default:c=r,f=d(w,en,i.a),s=b(e,{e:e.e+1,g:d(y,d(r,e.e,d(ke,a,o)),e.g),n:d(y,{a:a,b:u},e.n)});r=c,n=f,e=s;continue}}else{t=e.n;if(!t.b)return e;var l=t.a,a=l.a,u=t.b,c=r,f=l.b,s=b(e,{e:e.e-1,g:d(y,d(r,e.e-1,"</"+a+">"),e.g),n:u});r=c,n=f,e=s}}),xe=a(function(r,n){var e=r?"\n":"",t={e:0,g:v,n:v},r=r?le(r):ce(Qr);return d(de,e,s(we,r,h([n]),t).g)}),Ae=r(function(r,n,e){return{$:0,a:r,b:n,c:e}}),e=r(function(r,n,e){return s(Ae,r,n,{$:1,a:e})}),A=e("div"),C=a(function(r,n){return{$:4,a:r,b:n}}),Ce=a(function(r,n){return{$:1,a:r,b:n}}),j=function(r){return d(Ce,"className",r)},je=e("h1"),F=e("p"),z=d(A,v,h([d(F,v,h([x("Find links to podcasts, videos, books and more. There are a lot of resources out there for Catholic parents and we are here to help you find them.")]))])),S=e("a"),I=a(function(r,n){return{$:0,a:r,b:n}}),Fe=e("h2"),Ne={$:0},Ee=r(function(r,n,e){return s(Ae,r,n,Ne)})("img"),jr=d(A,v,d(w,function(r){return d(S,h([j("grid grid-cols-[100px_1fr] hover:bg-csc-lightpurple rounded p-7"),u(r.K),d(I,"aria-label",r.H)]),h([d(A,v,h([d(Ee,h([$(r.J),j("w-20 h-20 object-cover")]),v)])),d(A,v,h([d(Fe,v,h([x(r.H)])),d(F,v,h([x(r.aB)]))]))]))},h([{aB:"Find books here. It's hard to go wrong with a good Catholic book.",J:"https://ik.imagekit.io/catholicstories/Resources_Icons/2_4YvKGvP_Y.png?updatedAt=1679066449106",K:"/resources/books",H:"Books"},{aB:"Find audio podcasts here. Your kids can listen to them while on the road, traveling, while doing coloring activities, or they can be simply enjoyed by themselves.",J:"https://ik.imagekit.io/catholicstories/Resources_Icons/1_EAfo23y5R.png?updatedAt=1679066451335",K:"/resources/podcasts",H:"Podcasts"},{aB:"Find video content here. Videos are a wonderful engaging way to bring a visual representation of the faith into your home.",J:"https://ik.imagekit.io/catholicstories/Resources_Icons/3_mTKsUZQuM.png?updatedAt=1679066450272",K:"/resources/videos",H:"Youtube Channels"},{aB:"Want monthly content at your front door? Check out these wonderful Catholic subscriptions.",J:"https://ik.imagekit.io/catholicstories/Resources_Icons/4_U5qO_iICx.png?updatedAt=1679066449068",K:"/resources/subscriptions",H:"Subscriptions"},{aB:"Find more resources here to help build your prayer life",J:"https://ik.imagekit.io/catholicstories/Resources_Icons/prayerresources_gN76-j6pz.png?updatedAt=1683227269863",K:"/resources/prayer",H:"Prayer Resources"},{aB:"Find activities for feast days throughout the year",J:"https://ik.imagekit.io/catholicstories/Resources_Icons/feastdaycalendar_1__YTmPRisXH.png?updatedAt=1686096632436",K:"/feastdayactivities",H:"Feast Day Activities"}]))),Fr=d(S,h([u("https://signup.catholicstoriesforchildren.com"),d(I,"rel","noopener"),un("_blank"),d(C,"text-decoration","none"),d(C,"padding","10px 20px"),d(C,"display","inline-block"),d(C,"border-radius","5px"),d(C,"box-shadow","#777 1px 1px 5px"),d(C,"color","white"),d(C,"background-color","#9200B3")]),h([x("Sign Up")])),i=d(A,v,h([d(F,h([j("pb-5")]),h([x("Want tips, resources, and Catholic animations? We are giving away our prayer printable to those who sign up today!")])),Fr])),n=d(A,h([j("grid grid-cols-[100px_1fr] rounded py-7")]),h([d(A,v,h([d(Ee,h([$("https://ik.imagekit.io/catholicstories/Construction_Cone_vLoPMhMZBm.png?updatedAt=1679070884463"),j("w-20 h-20 object-cover")]),v)])),d(A,v,h([d(F,v,h([x("This page is a work-in-progress. We are working hard on adding resources this page for you.")]))]))])),U=d(A,h([j("max-w-3xl"),j("m-auto"),j("p-5"),j("mb-10")]),h([d(je,h([j("my-10 leading-10")]),h([x("Resources")])),z,d(A,h([j("mb-10")]),h([i])),jr,n])),W=e("footer"),hr=e("span"),Fr=d(W,h([d(C,"padding",K(30)+"px"),d(C,"background-color","black"),d(C,"color","white"),d(C,"transform-style","preserve-3d")]),h([d(A,h([j("flex items-center gap-2.5")]),h([d(hr,v,h([x("Follow us on")])),d(S,h([u("https://www.facebook.com/catholicstoriesforchildren"),d(I,"aria-label","CSC Facebook Page"),un("_blank")]),h([d(Ee,h([j("w-10 h-10"),$("https://ik.imagekit.io/catholicstories/f_logo_RGB-Blue_250_3vs-yhXer.png?updatedAt=1684277030198"),cn("Facebook")]),v)])),d(S,h([u("https://www.instagram.com/catholicstoriesforchildren/"),d(I,"aria-label","CSC Instagram Page"),un("_blank")]),h([d(Ee,h([j("w-10 h-10"),$("https://ik.imagekit.io/catholicstories/Instagram_Glyph_Gradient_kFoMs9jIr.png?updatedAt=1684277127293"),cn("Instagram")]),v)]))])),d(F,v,h([x("Copyright © 2023 Catholic Stories for Children. All rights reserved.")])),d(F,v,h([x("Catholic Stories for Children is a 501(c)(3) non-profit recognized by the IRS. Contributions to Catholic Stories for Children are tax-deductible to the extent permitted by law.  Tax ID Number: 85-4194883")]))])),Re=e("header"),Be=e("nav"),T=P(function(r,n,e,t){return d(S,h([u(n),j("flex items-center justify-center"),j("hover:bg-csc-lightpurple"),j("hover:border-b-2 hover:border-gray-700"),j("rounded-t"),j("text-lg"),j("h-[60px] h-["+r+"]"),j("w-full"),d(I,"aria-label",t),un(e)]),h([x(t)]))}),Se=d(S,h([u("/navigation"),j("space-y-2"),d(I,"aria-label","menu")]),h([d(A,h([j("w-8 h-0.5 m-auto bg-gray-600")]),v),d(A,h([j("w-8 h-0.5 m-auto bg-gray-600")]),v),d(A,h([j("w-8 h-0.5 m-auto bg-gray-600")]),v)])),z=d(Ee,h([$("/assets/logo_solid.svg"),d(C,"height","30px"),cn(""),d(C,"vertical-align","middle")]),v),Ie=d(S,h([d(C,"text-decoration","none"),j("colorDarkGray"),u("/"),d(I,"aria-label","home")]),h([z])),i=a(function(r,n){var r="Catholic Stories for Children"===r?{a:"111px",b:fn,c:"grid-cols-[150px_1fr_150px] lg:grid-cols-[150px_1fr_600px]"}:{a:"60px",b:fn,c:"grid-cols-[150px_1fr_150px] lg:grid-cols-[150px_1fr_600px]"},e=r.a,t=r.b,r=r.c;return d(Re,h([d(C,"background-color","#3d5d75"),d(C,"background-image","linear-gradient(130deg, #9DE2EB , #EBD6F1)"),j("h-[60px] md:h-["+e+"]"),j("colorDarkGray"),j("grid items-center justify-items-center"),j(r)]),h([Ie,d(S,h([d(C,"text-decoration","none"),j("colorDarkGray"),j("invisible md:visible"),j("justify-self-start"),u("/")]),h([d(je,h([d(C,"font-family","hvdComicSerifPro"),d(C,"margin","0px"),j("text-[0px] md:text-2xl")]),h([x("Catholic Stories for Children")]))])),t(e)]))}),Te=d(A,h([d(C,"height","100vh"),d(C,"overflow-x","hidden"),d(C,"overflow-y","auto"),d(C,"perspective","300px"),d(C,"scroll-behavior","smooth"),d(C,"background-color","#FEF7F4")]),h([d(i,"Resources",10),U,Fr])),jr=(sn={aJ:{},a_:function(r){return function(r){return r}},a0:function(r){return ue(x(d(on,0,Te)))}},Yr({aJ:function(r){return{a:sn.aJ,b:Yn}},aX:function(r){return Wn},a_:a(function(r,n){return{a:d(sn.a_,r,n),b:Yn}}),a0:sn.a0}));n={Resources:{Main:{init:jr(tr(0))(0)}}},J.Elm?function r(n,e){for(var t in e)t in n?"init"==t?O(6):r(n[t],e[t]):n[t]=e[t]}(J.Elm,n):J.Elm=n}(this);