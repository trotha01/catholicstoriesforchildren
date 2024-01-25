!function(D){"use strict";function B(e,r,t){return t.a=e,t.f=r,t}function r(t){return B(2,t,function(r){return function(e){return t(r,e)}})}function t(n){return B(3,n,function(t){return function(r){return function(e){return n(t,r,e)}}})}function L(a){return B(4,a,function(n){return function(t){return function(r){return function(e){return a(n,t,r,e)}}}})}function G(i){return B(5,i,function(a){return function(n){return function(t){return function(r){return function(e){return i(a,n,t,r,e)}}}}})}function l(e,r,t){return 2===e.a?e.f(r,t):e(r)(t)}function f(e,r,t,n){return 3===e.a?e.f(r,t,n):e(r)(t)(n)}function h(e,r,t,n,a){return 4===e.a?e.f(r,t,n,a):e(r)(t)(n)(a)}function H(e,r,t,n,a,i){return 5===e.a?e.f(r,t,n,a,i):e(r)(t)(n)(a)(i)}function o(e,r){for(var t,n=[],a=I(e,r,0,n);a&&(t=n.pop());a=I(t.a,t.b,0,n));return a}function I(e,r,t,n){if(e!==r){if("object"!=typeof e||null===e||null===r)return"function"==typeof e&&U(5),!1;if(100<t)n.push({a:e,b:r});else for(var a in e.$<0&&(e=er(e),r=er(r)),e)if(!I(e[a],r[a],t+1,n))return!1}return!0}function n(e,r,t){if("object"!=typeof e)return e===r?0:e<r?-1:1;if(void 0===e.$)return(t=(t=n(e.a,r.a))||n(e.b,r.b))||n(e.c,r.c);for(;e.b&&r.b&&!(t=n(e.a,r.a));e=e.b,r=r.b);return t||(e.b?1:r.b?-1:0)}var R=0;function q(e,r){if("string"==typeof e)return e+r;if(!e.b)return r;var t={$:1,a:e.a,b:r};e=e.b;for(var n=t;e.b;e=e.b)n=n.b={$:1,a:e.a,b:r};return t}var d={$:0};function z(e,r){return{$:1,a:e,b:r}}var O=r(z);function b(e){for(var r=d,t=e.length;t--;)r={$:1,a:e[t],b:r};return r}function W(e){for(var r=[];e.b;e=e.b)r.push(e.a);return r}var J=r(function(t,e){return b(W(e).sort(function(e,r){e=l(t,e,r);return e===Xe?0:e===Ye?-1:1}))});var e=t(function(e,r,t){for(var n=Array(e),a=0;a<e;a++)n[a]=t(r+a);return n}),V=r(function(e,r){for(var t=Array(e),n=0;n<e&&r.b;n++)t[n]=r.a,r=r.b;return t.length=n,{a:t,b:r}});function U(e){throw Error("https://github.com/elm/core/blob/1.0.0/hints/"+e+".md")}var Q=Math.ceil,X=Math.floor,Y=Math.log;var Z=r(m);function m(e,r){switch(e.$){case 2:return e.b(r);case 5:return null===r?ar(e.c):p("null",r);case 3:return re(r)?ee(e.b,r,b):p("a LIST",r);case 4:return re(r)?ee(e.b,r,te):p("an ARRAY",r);case 6:var t=e.d;return"object"==typeof r&&null!==r&&t in r?(i=m(e.b,r[t]),k(i)?i:y(l(tr,t,i.a))):p("an OBJECT with a field named `"+t+"`",r);case 7:t=e.e;return re(r)?t<r.length?(i=m(e.b,r[t]),k(i)?i:y(l(nr,t,i.a))):p("a LONGER array. Need index "+t+" but only see "+r.length+" entries",r):p("an ARRAY",r);case 8:if("object"!=typeof r||null===r||re(r))return p("an OBJECT",r);var n,a=d;for(n in r)if(r.hasOwnProperty(n)){var i=m(e.b,r[n]);if(!k(i))return y(l(tr,n,i.a));a={$:1,a:{a:n,b:i.a},b:a}}return ar(sr(a));case 9:for(var o=e.f,s=e.g,c=0;c<s.length;c++){i=m(s[c],r);if(!k(i))return i;o=o(i.a)}return ar(o);case 10:i=m(e.b,r);return k(i)?m(e.h(i.a),r):i;case 11:for(var u=d,f=e.g;f.b;f=f.b){i=m(f.a,r);if(k(i))return i;u={$:1,a:i.a,b:u}}return y(ir(sr(u)));case 1:return y(l(rr,e.a,r));case 0:return ar(e.a)}}function ee(e,r,t){for(var n=r.length,a=Array(n),i=0;i<n;i++){var o=m(e,r[i]);if(!k(o))return y(l(nr,i,o.a));a[i]=o.a}return ar(t(a))}function re(e){return Array.isArray(e)||"undefined"!=typeof FileList&&e instanceof FileList}function te(r){return l(Cr,r.length,function(e){return r[e]})}function p(e,r){return y(l(rr,"Expecting "+e,r))}function c(e,r){if(e===r)return!0;if(e.$!==r.$)return!1;switch(e.$){case 0:case 1:return e.a===r.a;case 2:return e.b===r.b;case 5:return e.c===r.c;case 3:case 4:case 8:return c(e.b,r.b);case 6:return e.d===r.d&&c(e.b,r.b);case 7:return e.e===r.e&&c(e.b,r.b);case 9:return e.f===r.f&&ne(e.g,r.g);case 10:return e.h===r.h&&c(e.b,r.b);case 11:return ne(e.g,r.g)}}function ne(e,r){var t=e.length;if(t!==r.length)return!1;for(var n=0;n<t;n++)if(!c(e[n],r[n]))return!1;return!0}function ae(e){return e}function ie(e){return{$:0,a:e}}var oe=r(function(e,r){return{$:3,b:e,d:r}});var se=0;function ce(e){e={$:0,e:se++,f:e,g:null,h:[]};return de(e),e}function ue(r){return{$:2,b:function(e){e({$:0,a:ce(r)})},c:null}}function fe(e,r){e.h.push(r),de(e)}var le=!1,he=[];function de(e){if(he.push(e),!le){for(le=!0;e=he.shift();)!function(r){for(;r.f;){var e=r.f.$;if(0===e||1===e){for(;r.g&&r.g.$!==e;)r.g=r.g.i;if(!r.g)return;r.f=r.g.b(r.f.a),r.g=r.g.i}else{if(2===e)return r.f.c=r.f.b(function(e){r.f=e,de(r)});if(5===e){if(0===r.h.length)return;r.f=r.f.b(r.h.shift())}else r.g={$:3===e?0:1,b:r.f.b,i:r.g},r.f=r.f.d}}}(e);le=!1}}function be(e,r,t,n,a,i){var e=l(Z,e,r?r.flags:void 0),o=(k(e)||U(2),{}),r=t(e.a),s=r.a,c=i(u,s),t=function(e,r){var t,n;for(n in me){var a=me[n];a.a&&((t=t||{})[n]=a.a(n,r)),e[n]=function(e,r){var n={g:r,h:void 0},a=e.c,i=e.d,o=e.e,s=e.f;function c(t){return l(oe,c,{$:5,b:function(e){var r=e.a;return 0===e.$?f(i,n,r,t):o&&s?h(a,n,r.i,r.j,t):f(a,n,o?r.i:r.j,t)}})}return n.h=ce(l(oe,c,e.b))}(a,r)}return t}(o,u);function u(e,r){e=l(n,e,s);c(s=e.a,r),ye(o,e.b,a(s))}return ye(o,r.b,a(s)),t?{ports:t}:{}}var me={};var a=r(function(r,t){return{$:2,b:function(e){r.g(t),e({$:0,a:R})},c:null}});function pe(r){return function(e){return{$:1,k:r,l:e}}}function ge(e){return{$:2,m:e}}var ve=[],we=!1;function ye(e,r,t){if(ve.push({p:e,q:r,r:t}),!we){we=!0;for(var n;n=ve.shift();)!function(e,r,t){var n,a={};for(n in ke(!0,r,a,null),ke(!1,t,a,null),e)fe(e[n],{$:"fx",a:a[n]||{i:d,j:d}})}(n.p,n.q,n.r);we=!1}}function ke(e,r,t,n){switch(r.$){case 1:var a=r.k,i=function(e,r,t,n){function a(e){for(var r=t;r;r=r.t)e=r.s(e);return e}return l(e?me[r].e:me[r].f,a,n)}(e,a,n,r.l);return void(t[a]=function(e,r,t){return t=t||{i:d,j:d},e?t.i={$:1,a:r,b:t.i}:t.j={$:1,a:r,b:t.j},t}(e,i,t[a]));case 2:for(var o=r.m;o.b;o=o.b)ke(e,o.a,t,n);return;case 3:ke(e,r.o,t,{s:r.n,t:n})}}var xe;var Ce="undefined"!=typeof document?document:{};function Me(e){return{$:0,a:e}}var u=r(function(i,o){return r(function(e,r){for(var t=[],n=0;r.b;r=r.b){var a=r.a;n+=a.b||0,t.push(a)}return n+=t.length,{$:1,c:o,d:Se(e),e:t,f:i,b:n}})})(void 0);r(function(i,o){return r(function(e,r){for(var t=[],n=0;r.b;r=r.b){var a=r.a;n+=a.b.b||0,t.push(a)}return n+=t.length,{$:2,c:o,d:Se(e),e:t,f:i,b:n}})})(void 0);var i=r(function(e,r){return{$:"a1",n:e,o:r}}),$e=r(function(e,r){return{$:"a2",n:e,o:r}}),Ae=r(function(e,r){return{$:"a3",n:e,o:r}});function _e(e){return/^\s*(javascript:|data:text\/html)/i.test(e)?"":e}var je;function Se(e){for(var r={};e.b;e=e.b){var t,n=e.a,a=n.$,i=n.n,n=n.o;"a2"===a?"className"===i?Ee(r,i,n):r[i]=n:(t=r[a]||(r[a]={}),"a3"===a&&"class"===i?Ee(t,i,n):t[i]=n)}return r}function Ee(e,r,t){var n=e[r];e[r]=n?n+" "+t:t}function g(e,r){var t=e.$;if(5===t)return g(e.k||(e.k=e.m()),r);if(0===t)return Ce.createTextNode(e.a);if(4===t){for(var n=e.k,a=e.j;4===n.$;)"object"!=typeof a?a=[a,n.j]:a.push(n.j),n=n.k;var i={j:a,p:r};(o=g(n,i)).elm_event_node_ref=i}else if(3===t)Te(o=e.h(e.g),r,e.d);else{var o=e.f?Ce.createElementNS(e.f,e.c):Ce.createElement(e.c);xe&&"a"==e.c&&o.addEventListener("click",xe(o)),Te(o,r,e.d);for(var s=e.e,c=0;c<s.length;c++)o.appendChild(g(1===t?s[c]:s[c].b,r))}return o}function Te(e,r,t){for(var n in t){var a=t[n];"a1"===n?function(e,r){var t,n=e.style;for(t in r)n[t]=r[t]}(e,a):"a0"===n?function(e,r,t){var n,a=e.elmFs||(e.elmFs={});for(n in t){var i=t[n],o=a[n];if(i){if(o){if(o.q.$===i.$){o.q=i;continue}e.removeEventListener(n,o)}o=function(c,e){function u(e){var r=u.q,t=m(r.a,e);if(k(t)){for(var n,r=Mr(r),t=t.a,a=r?r<3?t.a:t.u:t,i=1==r?t.b:3==r&&t.T,o=(i&&e.stopPropagation(),(2==r?t.b:3==r&&t.Q)&&e.preventDefault(),c);n=o.j;){if("function"==typeof n)a=n(a);else for(var s=n.length;s--;)a=n[s](a);o=o.p}o(a,i)}}return u.q=e,u}(r,i),e.addEventListener(n,o,je&&{passive:Mr(i)<2}),a[n]=o}else e.removeEventListener(n,o),a[n]=void 0}}(e,r,a):"a3"===n?function(e,r){for(var t in r){var n=r[t];void 0!==n?e.setAttribute(t,n):e.removeAttribute(t)}}(e,a):"a4"===n?function(e,r){for(var t in r){var n=r[t],a=n.f,n=n.o;void 0!==n?e.setAttributeNS(a,t,n):e.removeAttributeNS(a,t)}}(e,a):("value"!==n&&"checked"!==n||e[n]!==a)&&(e[n]=a)}}try{window.addEventListener("t",null,Object.defineProperty({},"passive",{get:function(){je=!0}}))}catch(e){}function Fe(e,r){var t=[];return E(e,r,t,0),t}function S(e,r,t,n){r={$:r,r:t,s:n,t:void 0,u:void 0};return e.push(r),r}function E(e,r,t,n){if(e!==r){var a=e.$,i=r.$;if(a!==i){if(1!==a||2!==i)return void S(t,0,n,r);r=function(e){for(var r=e.e,t=r.length,n=Array(t),a=0;a<t;a++)n[a]=r[a].b;return{$:1,c:e.c,d:e.d,e:n,f:e.f,b:e.b}}(r),i=1}switch(i){case 5:for(var o=e.l,s=r.l,c=o.length,u=c===s.length;u&&c--;)u=o[c]===s[c];if(u)return void(r.k=e.k);r.k=r.m();var f=[];return E(e.k,r.k,f,0),void(0<f.length&&S(t,1,n,f));case 4:for(var l=e.j,h=r.j,d=!1,b=e.k;4===b.$;)d=!0,"object"!=typeof l?l=[l,b.j]:l.push(b.j),b=b.k;for(var m=r.k;4===m.$;)d=!0,"object"!=typeof h?h=[h,m.j]:h.push(m.j),m=m.k;return d&&l.length!==h.length?void S(t,0,n,r):((d?function(e,r){for(var t=0;t<e.length;t++)if(e[t]!==r[t])return;return 1}(l,h):l===h)||S(t,2,n,h),void E(b,m,t,n+1));case 0:return void(e.a!==r.a&&S(t,3,n,r.a));case 1:return void Ke(e,r,t,n,Ne);case 2:return void Ke(e,r,t,n,De);case 3:if(e.h!==r.h)return void S(t,0,n,r);f=Pe(e.d,r.d),f=(f&&S(t,4,n,f),r.i(e.g,r.g));f&&S(t,5,n,f)}}}function Ke(e,r,t,n,a){var i;e.c!==r.c||e.f!==r.f?S(t,0,n,r):((i=Pe(e.d,r.d))&&S(t,4,n,i),a(e,r,t,n))}function Pe(e,r,t){var n,a,i,o,s;for(a in e)"a1"===a||"a0"===a||"a3"===a||"a4"===a?(i=Pe(e[a],r[a]||{},a))&&((n=n||{})[a]=i):a in r?(i=e[a])===(o=r[a])&&"value"!==a&&"checked"!==a||"a0"===t&&function(e,r){return e.$==r.$&&c(e.a,r.a)}(i,o)||((n=n||{})[a]=o):(n=n||{})[a]=t?"a1"===t?"":"a0"===t||"a3"===t?void 0:{f:e[a].f,o:void 0}:"string"==typeof e[a]?"":null;for(s in r)s in e||((n=n||{})[s]=r[s]);return n}function Ne(e,r,t,n){var a=e.e,i=r.e,e=a.length,r=i.length;r<e?S(t,6,n,{v:r,i:e-r}):e<r&&S(t,7,n,{v:e,e:i});for(var o=e<r?e:r,s=0;s<o;s++){var c=a[s];E(c,i[s],t,++n),n+=c.b||0}}function De(e,r,t,n){for(var a=[],i={},o=[],s=e.e,c=r.e,u=s.length,f=c.length,l=0,h=0,d=n;l<u&&h<f;){var b=s[l],m=c[h],p=b.a,g=m.a,v=b.b,w=m.b,y=void 0,k=void 0;if(p===g)E(v,w,a,++d),d+=v.b||0,l++,h++;else{var x,C,M,$,A=s[l+1],_=c[h+1];if(A&&(C=A.b,k=g===(x=A.a)),_&&($=_.b,y=p===(M=_.a)),y&&k)E(v,$,a,++d),Le(i,a,p,w,h,o),d+=v.b||0,Ge(i,a,p,C,++d),d+=C.b||0,l+=2,h+=2;else if(y)d++,Le(i,a,g,w,h,o),E(v,$,a,d),d+=v.b||0,l+=1,h+=2;else if(k)Ge(i,a,p,v,++d),d+=v.b||0,E(C,w,a,++d),d+=C.b||0,l+=2,h+=1;else{if(!A||x!==M)break;Ge(i,a,p,v,++d),Le(i,a,g,w,h,o),d+=v.b||0,E(C,$,a,++d),d+=C.b||0,l+=2,h+=2}}}for(;l<u;){v=(b=s[l]).b;Ge(i,a,b.a,v,++d),d+=v.b||0,l++}for(;h<f;){var j=j||[];Le(i,a,(m=c[h]).a,m.b,void 0,j),h++}(0<a.length||0<o.length||j)&&S(t,8,n,{w:a,x:o,y:j})}var Be="_elmW6BL";function Le(e,r,t,n,a,i){var o,s=e[t];s?1===s.c?(i.push({r:a,A:s}),s.c=2,E(s.z,n,o=[],s.r),s.r=a,s.s.s={w:o,A:s}):Le(e,r,t+Be,n,a,i):(i.push({r:a,A:s={c:0,z:n,r:a,s:void 0}}),e[t]=s)}function Ge(e,r,t,n,a){var i,o=e[t];o?0===o.c?(o.c=2,E(n,o.z,i=[],a),S(r,9,a,{w:i,A:o})):Ge(e,r,t+Be,n,a):(i=S(r,9,a,void 0),e[t]={c:1,z:n,r:a,s:i})}function He(e,r,t,n){!function e(r,t,n,a,i,o,s){var c=n[a];var u=c.r;for(;u===i;){var f,l=c.$;if(1===l?He(r,t.k,c.s,s):8===l?(c.t=r,c.u=s,0<(f=c.s.w).length&&e(r,t,f,0,i,o,s)):9===l?(c.t=r,c.u=s,(l=c.s)&&(l.A.s=r,0<(f=l.w).length)&&e(r,t,f,0,i,o,s)):(c.t=r,c.u=s),!(c=n[++a])||(u=c.r)>o)return a}var h=t.$;if(4===h){for(var d=t.k;4===d.$;)d=d.k;return e(r,d,n,a,i+1,o,r.elm_event_node_ref)}var b=t.e;var m=r.childNodes;for(var p=0;p<b.length;p++){var g=1===h?b[p]:b[p].b,v=++i+(g.b||0);if(i<=u&&u<=v&&(a=e(m[p],g,n,a,i,v,s),!(c=n[a])||(u=c.r)>o))return a;i=v}return a}(e,r,t,0,0,r.b,n)}function Ie(e,r,t,n){return 0===t.length?e:(He(e,r,t,n),Re(e,t))}function Re(e,r){for(var t=0;t<r.length;t++){var n=r[t],a=n.t,n=function(e,r){switch(r.$){case 0:return function(e,r,t){var n=e.parentNode,r=g(r,t);r.elm_event_node_ref||(r.elm_event_node_ref=e.elm_event_node_ref);n&&r!==e&&n.replaceChild(r,e);return r}(e,r.s,r.u);case 4:return Te(e,r.u,r.s),e;case 3:return e.replaceData(0,e.length,r.s),e;case 1:return Re(e,r.s);case 2:return e.elm_event_node_ref?e.elm_event_node_ref.j=r.s:e.elm_event_node_ref={j:r.s,p:r.u},e;case 6:for(var t=r.s,n=0;n<t.i;n++)e.removeChild(e.childNodes[t.v]);return e;case 7:for(var a=(t=r.s).e,n=t.v,i=e.childNodes[n];n<a.length;n++)e.insertBefore(g(a[n],r.u),i);return e;case 9:var o;return(t=r.s)?(void 0!==(o=t.A).r&&e.parentNode.removeChild(e),o.s=Re(e,t.w)):e.parentNode.removeChild(e),e;case 8:return function(e,r){for(var t=r.s,n=function(e,r){if(e){for(var t=Ce.createDocumentFragment(),n=0;n<e.length;n++){var a=e[n].A;t.appendChild(2===a.c?a.s:g(a.z,r.u))}return t}}(t.y,r),a=(e=Re(e,t.w),t.x),i=0;i<a.length;i++){var o=a[i],s=o.A,s=2===s.c?s.s:g(s.z,r.u);e.insertBefore(s,e.childNodes[o.r])}n&&e.appendChild(n);return e}(e,r);case 5:return r.s(e);default:U(10)}}(a,n);a===e&&(e=n)}return e}function qe(e){if(3===e.nodeType)return{$:0,a:e.textContent};if(1!==e.nodeType)return{$:0,a:""};for(var r=d,t=e.attributes,n=t.length;n--;)var a=t[n],r={$:1,a:l(Ae,a.name,a.value),b:r};for(var i=e.tagName.toLowerCase(),o=d,s=e.childNodes,n=s.length;n--;)o={$:1,a:qe(s[n]),b:o};return f(u,i,r,o)}var ze=L(function(r,e,t,o){return be(e,o,r.aM,r.a1,r.a_,function(t,e){var n=r.a3,a=o.node,i=qe(a);return We(e,function(e){var e=n(e),r=Fe(i,e);a=Ie(a,i,r,t),i=e})})}),Oe="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:function(e){return setTimeout(e,1e3/60)};function We(t,n){n(t);var a=0;function i(){a=1===a?0:(Oe(i),n(t),1)}return function(e,r){t=e,r?(n(t),2===a&&(a=1)):(0===a&&Oe(i),a=2)}}function s(e){return l(Br,"href",/^javascript:/i.test((e=e).replace(/\s/g,""))?"":e)}function v(e){return l(Br,"src",_e(e))}function Je(e){return l(A,b([M("grid grid-cols-[100px_1fr] hover:bg-csc-lightpurple rounded p-7"),T("_blank"),l(_,"aria-label",e.K),s(e.N)]),b([l(x,d,b([l(F,b([v(e.M),M("w-20 h-20 object-cover")]),d)])),l(x,d,b([l(j,b([M("leading-10")]),b([$(e.K)]))]))]))}function Ve(e){return l(x,b([l(C,"display","grid"),l(C,"grid-template-columns","72px 1fr"),M("h-full"),l(C,"min-height","115px"),l(C,"background","white"),l(C,"border-radius","4px"),l(C,"padding","20px")]),b([l(x,b([l(C,"margin","0px 10px 40px 0"),M("float-left relative")]),b([function(e){return l(tt,e.M,e.a)}(e)])),l(x,d,b([l(x,d,b([$(e.K)])),(r=e.b,l(x,b([l(C,"color","#333"),l(C,"font-size",".8em")]),b([$(r)]))),(r=e.aE,l(x,b([l(C,"overflow-wrap","anywhere"),l(C,"margin-top","10px")]),b([$(r)]))),function(e){return l(x,b([l(C,"margin-top","10px"),M("flex items-center")]),l(jr,gt,l(it,at,e.c)))}(e)]))]));var r}function Ue(e){return l(x,b([M("w-full pr-2")]),b([l(x,b([M("lg:hidden")]),b([yt])),l(x,b([M("hidden lg:block w-full")]),b([function(e){return l(wt,b([M("h-full w-full flex justify-end content-center justify-items-center gap-4 mr-4"),M("text-base")]),b([h(N,e,"/feastdayactivities","_self","Activities"),h(N,e,"/saints","_self","Saints"),h(N,e,"/animations","_self","Animations"),h(N,e,"/resources","_self","Resources"),h(N,e,"https://www.etsy.com/shop/CatholicStories","_blank","Shop"),h(N,e,"/give","_self","Give"),h(N,e,"/team","_self","About")]))}(e)]))]))}var Qe,Xe=1,Ye=0,w=O,Ze=t(function(e,r,t){for(;;){if(-2===t.$)return r;var n=t.d,a=e,i=f(e,t.b,t.c,f(Ze,e,r,t.e));e=a,r=i,t=n}}),er=function(e){return f(Ze,t(function(e,r,t){return l(w,{a:e,b:r},t)}),d,e)},y=function(e){return{$:1,a:e}},rr=r(function(e,r){return{$:3,a:e,b:r}}),tr=r(function(e,r){return{$:0,a:e,b:r}}),nr=r(function(e,r){return{$:1,a:e,b:r}}),ar=function(e){return{$:0,a:e}},ir=function(e){return{$:2,a:e}},O=function(e){return e+""},or=t(function(e,r,t){for(;;){if(!t.b)return r;var n=t.b,a=e,i=l(e,t.a,r);e=a,r=i,t=n}}),sr=function(e){return f(or,w,d,e)},cr=L(function(e,r,t,n){return{$:0,a:e,b:r,c:t,d:n}}),ur=[],fr=Q,lr=r(function(e,r){return Y(r)/Y(e)}),hr=fr(l(lr,2,32)),dr=h(cr,0,hr,ur,ur),br=e,mr=X,pr=function(e){return e.length},gr=r(function(e,r){return 0<n(e,r)?e:r}),vr=V,wr=r(function(e,r){for(;;){var t=l(vr,32,e),n=t.b,t=l(w,{$:0,a:t.a},r);if(!n.b)return sr(t);e=n,r=t}}),yr=r(function(e,r){for(;;){var t=fr(r/32);if(1===t)return l(vr,32,e).a;e=l(wr,e,d),r=t}}),kr=r(function(e,r){var t,n;return r.d?(n=mr(l(lr,32,(t=32*r.d)-1)),e=e?sr(r.g):r.g,e=l(yr,e,r.d),h(cr,pr(r.f)+t,l(gr,5,n*hr),e,r.f)):h(cr,pr(r.f),hr,ur,r.f)}),xr=G(function(e,r,t,n,a){for(;;){if(r<0)return l(kr,!1,{g:n,d:t/32|0,f:a});var i={$:1,a:f(br,32,r,e)};e=e,r=r-32,t=t,n=l(w,i,n),a=a}}),Cr=r(function(e,r){var t;return 0<e?H(xr,r,e-(t=e%32)-32,e,d,f(br,t,e-t,r)):dr}),k=function(e){return!e.$},Q=function(e){return{$:0,a:e}},Mr=function(e){switch(e.$){case 0:return 0;case 1:return 1;case 2:return 2;default:return 3}},$r=ie,e=$r(0),Ar=L(function(e,r,t,n){var a,i,o,s;return n.b?(a=n.a,(n=n.b).b?(i=n.a,(n=n.b).b?(o=n.a,(n=n.b).b?(s=n.b,l(e,a,l(e,i,l(e,o,l(e,n.a,500<t?f(or,e,r,sr(s)):h(Ar,e,r,t+1,s)))))):l(e,a,l(e,i,l(e,o,r)))):l(e,a,l(e,i,r))):l(e,a,r)):r}),_r=t(function(e,r,t){return h(Ar,e,r,0,t)}),jr=r(function(t,e){return f(_r,r(function(e,r){return l(w,t(e),r)}),d,e)}),Sr=oe,Er=r(function(r,e){return l(Sr,function(e){return $r(r(e))},e)}),Tr=t(function(t,e,n){return l(Sr,function(r){return l(Sr,function(e){return $r(l(t,r,e))},n)},e)}),Fr=a,Kr=r(function(e,r){return ue(l(Sr,Fr(e),r))}),X=t(function(e,r,t){return l(Er,function(e){return 0},(e=l(jr,Kr(e),r),f(_r,Tr(w),$r(d),e)))}),Pr=(me.Task={b:e,c:X,d:t(function(e,r,t){return $r(0)}),e:r(function(e,r){return l(Er,e,r)}),f:void 0},pe("Task"),ge(d)),Nr=ge(d),x=u("div"),C=i,Dr=ae,Br=r(function(e,r){return l($e,e,Dr(r))}),M=Br("className"),Lr=u("h1"),$=Me,A=u("a"),_=r(function(e,r){return l(Ae,function(e){return/^(on|formAction$)/i.test(e)?"data-"+e:e}(e),_e(r))}),Gr=ae,V=r(function(e,r){return l($e,e,Gr(r))})("hidden"),a=r(function(e,r){return l($e,function(e){return"innerHTML"==e||"formAction"==e?"data-"+e:e}(e),_e(r))}),e=u("span"),X=l(e,d,b([l(e,b([l(C,"display","inline-block")]),b([$("trevor"),l(e,d,b([$("@")]))])),l(e,b([l(_,"ariaHidden","true"),l(a,"innerHTML",Dr("🍯"))]),d),l(e,b([l(_,"ariaHidden","true"),l(a,"innerHTML",Dr("spam@catholicstoriesforchildren.com"))]),d),l(e,b([l(Ae,"height",O(0)),l(Ae,"width",O(0)),l(C,"display","none"),V(!0)]),b([$("spam@catholicstoriesforchildren.com")])),l(e,d,b([$("catholicstoriesforchildren"),l(e,d,b([$("."),l(e,d,b([$("com")]))]))]))])),j=u("h2"),i=u("p"),T=Br("target"),a=Ae("rel"),V=l(A,b([s("https://signup.catholicstoriesforchildren.com"),a("noopener"),T("_blank"),l(C,"text-decoration","none"),l(C,"padding","10px 20px"),l(C,"display","inline-block"),l(C,"border-radius","5px"),l(C,"box-shadow","#777 1px 1px 5px"),l(C,"color","white"),l(C,"background-color","#9200B3")]),b([$("Sign Up")])),a=l(x,d,b([l(i,b([M("pb-5")]),b([$("Want tips, resources, and Catholic animations? We are giving away our prayer printable to those who sign up today!")])),V])),V=l(x,d,b([l(i,b([M("mb-4")]),b([$("Catholic Stories for Children is a nonprofit aimed at telling short stories, primarily through animation, to help kids learn Catholic prayers, learn about Catholic saints, and to learn other Catholic concepts.")])),l(i,d,b([$("Many kids today are growing up without knowing the core concepts of our faith. Many are learning the prayers without understanding the words they are saying. We hope to help bridge this gap with enjoyable stories, animations and songs. We hope to help kids grow with a strong love of neighbor and God.")])),l(x,b([M("mt-5")]),b([a])),l(j,b([M("my-7")]),b([$("Vision")])),l(i,d,b([$("Catholic Stories for Children is made with the vision that all Catholics have a strong love of God and neighbor.")])),l(j,b([M("my-7")]),b([$("Mission")])),l(i,d,b([$("Our hope is to help others along this journey with joyful stories.")])),l(j,b([M("my-7")]),b([$("Contact")])),l(i,d,b([$("Please reach out. I love to hear from you!")])),l(i,d,b([X])),l(i,d,b([l(A,b([s("https://calendar.app.google/PBwGTHVqb44PuRTH9"),M("text-blue-600"),T("_blank")]),b([$("Schedule a meeting with me!")]))]))])),F=u("img"),a=l(x,d,b([l(j,b([M("my-10")]),b([$("In The Media")])),l(x,d,l(jr,Je,b([{M:"/assets/images/ProfilePictures/SpiritFilledMedia.png",N:"https://www.buzzsprout.com/1467955/10425762-finding-your-way-catholic-stories-for-children-guest-trevor-rothaus ",K:"Spirit Filled Media Podcast"},{M:"/assets/images/ProfilePictures/MakeJoyNormal.png",N:"https://podcasts.apple.com/ca/podcast/catholic-stories-for-children-an-interview-with/id1512837291?i=1000631285156",K:"Make Joy Normal Podcast"},{M:"/assets/images/ProfilePictures/ChristianChannel.png",N:"https://youtu.be/p4yi5EFbPAI?si=L0jtHxwFyyS4jMjC",K:"Christian Channel"},{M:"/assets/images/ProfilePictures/InHisDesign.png",N:"https://youtu.be/eqOmqdlNIDw?si=E9xTDcqQV_nFFQs-",K:"In His Image Podcast"},{M:"/assets/images/ProfilePictures/ChurchMilitant.png",N:"https://www.churchmilitant.com/news/article/new-animation-teaches-st-michael-prayer",K:"Church Militant"}])))])),X=b([{aE:"Fr. Fredrick is a former chaplain of Santa Margarita Catholic High School and CHOC, former Parochial Vicar of St. Irenaeus Catholic Church, Church of St. Pius X, and Our Lady of Mt. Carmel Church.",M:"/assets/Team/FrDodik.jpeg",a:"",K:"Father Fredrick Miras, A.M.",b:"Alagad ni Maria",c:d},{aE:"Fr. Aaron is the associate chaplain in Saint Irenaeus Parish in Cypress, CA.",M:"/assets/Team/FrAaron.jpeg",a:"",K:"Father Aaron Galvizo, A.M.",b:"Alagad ni Maria",c:d},{aE:"Chris Pagel is the assistant dean of Graduate Business Programs and Career Services at Chapman University's George L. Argyros School of Business and Economics.",M:"/assets/Team/ChrisPagel.jpeg",a:"",K:"Christopher Pagel",b:"Assistant Dean",c:d},{aE:"Truly silent.",M:"/assets/Team/Cheri.jpeg",a:"",K:"Cheri Loreto",b:"Silent Advisor",c:d}]),Hr={aE:"",M:"/assets/Team/DanaMiller.jpeg",a:"DM",K:"Dana Miller",b:"Voice Actor",c:d},Ir={aE:"",M:"",a:"DG",K:"Dominic Grodi",b:"Singer and Voice Actor",c:d},Rr={aE:"Ekaterina is a skilled artist presenting a unique approach to developing visually appealing designs.",M:"/assets/Team/Ekaterina.png",a:"ES",K:"Ekaterina Soyuznova",b:"Visual Development Artist",c:b([{a:0,b:"https://www.ekaterinasoyuznova.com/"},{a:1,b:"https://www.instagram.com/soyuznova_ekaterina/"},{a:5,b:"https://www.facebook.com/kate.soyuznova/"},{a:2,b:"https://twitter.com/Kati45413104"},{a:7,b:"https://www.youtube.com/channel/UCgc9v2t9OtqQEw_D4jKgbew"}])},qr={aE:"Emma is a graphic designer with an eye for detail and a desire to captivate the wonder of the world through art. ",M:"/assets/Team/EmmaGreene.jpeg",a:"EG",K:"Emma Greene",b:"Designer and Illustrator",c:b([{a:1,b:"https://www.instagram.com/emmarosecreative"}])},zr={aE:"",M:"",a:"EN",K:"Ethan Nagy",b:"Singer and Voice Actor",c:d},Or={aE:"Fernando is passionate for film, videogames and music. He is passionate about telling stories through sound. ",M:"",a:"FA",K:"Fernando J Alanis",b:"Sound Design and Re-Recording Mixer",c:b([{a:0,b:"https://www.alanissound.com/"},{a:4,b:"https://www.imdb.com/name/nm8854188/"},{a:5,b:"https://www.facebook.com/alanissound"},{a:6,b:"http://www.linkedin.com/in/alanissound"}])},Wr={aE:"Artist, 3D Motion Designer, Husband and Father.",M:"",a:"FS",K:"Francesco Schito",b:"3D Artist",c:b([{a:1,b:"https://www.instagram.com/francescoschito/?hl=en"},{a:7,b:"https://www.youtube.com/playlist?list=UUcaSHFPBBghZlWSePTZzwLw"},{a:4,b:"https://www.imdb.com/name/nm7877744/"},{a:11,b:"https://www.behance.net/francescoschito"}])},Jr={aE:"",M:"",a:"IR",K:"Italia Rose",b:"Singer and Voice Actor",c:d},Vr={aE:"",M:"/assets/Team/JadenLuo.jpeg",a:"JL",K:"Jaden Luo",b:"Voice Actor",c:d},Ur={aE:"Kelly is a part-time social media specialist and homeschools her four children on the east coast of Canada.",M:"/assets/Team/KellyBriggs.jpeg",a:"KB",K:"Kelly Briggs",b:"Social Media Specialist",c:b([{a:1,b:"https://www.instagram.com/simplehomemom/"},{a:5,b:"https://www.facebook.com/simplehomemom"},{a:8,b:"https://www.pinterest.com/simplehomemom/"},{a:0,b:"https://www.simplehomemom.com/"}])},Qr={aE:"Mako Animation is a creative studio that offers visual communication strategies for all kinds of projects. They are passionate about bringing original stories to life\nwith a unique and creative narrative.",M:"/assets/Team/makoTeam.png",a:"MT",K:"Mako Animation",b:"Animation Team",c:b([{a:0,b:"https://makoanimation.mx/"},{a:5,b:"https://www.facebook.com/makoanimation/"},{a:2,b:"https://twitter.com/MakoAnimation"},{a:7,b:"https://www.youtube.com/channel/UCOszpOlqJxLtjpbTH7VN7Kg"}])},Xr={aE:"Nick and Alina have been collaborators in songwriting and performing since 2006. They have fused their creative fires to illuminate the trials and triumphs of the human experience. The duo impacts their audiences through powerful testimony, moving vocals, and songs that burn through with Truth, Love, Inspiration, and Beauty. They are the founders of Awaken Catholic, producing songs, podcasts, and more reaching more than 2.2 million streams per month.",M:"/assets/Team/NickAndAlina.jpeg",a:"ND",K:"Nick and Alina De La Torre",b:"Composer",c:b([{a:0,b:"http://nickandalina.com/"},{a:7,b:"https://www.youtube.com/nickalinadelatorre"},{a:1,b:"https://www.instagram.com/nickandalina/"},{a:5,b:"https://www.facebook.com/nickandalina/"},{a:2,b:"https://twitter.com/nickandalina_"},{a:9,b:"https://open.spotify.com/artist/3BHBEFqQWqROuXbQCSnb06?si=9Mh_b1M4T6S7nmsswkdHPQ&nd=1"}])},Yr={aE:"Rachael is passionate about telling stories through books, film, and dance. She is a graduate of John Paul the Great Catholic University and brings experience from Spirit Juice Studios and Family Theatre Productions.",M:"/assets/Team/RachaelWorkman.jpeg",a:"RW",K:"Rachael Workman-McLaughlin",b:"Screenwriter",c:b([{a:6,b:"https://www.linkedin.com/in/rachael-workman/"}])},K={aE:"Sean Beeson is a composer for games, films, cartoons, trailers, and more. He is a highly sought-after composer for Catholic media. He has composed for the movies Mother Teresa: No Greater Love, St. Joseph: Our Spiritual Father, In Solidarity with Ukraine, and more. He is Roman Catholic, husband of 15 years, and father to seven children.",M:"/assets/Team/SeanBeeson.jpeg",a:"SB",K:"Sean Beeson",b:"Composer",c:b([{a:0,b:"https://www.seanbeeson.com/"},{a:10,b:"https://soundcloud.com/sean-beeson"},{a:5,b:"https://www.facebook.com/gamecomposer"},{a:2,b:"https://twitter.com/seanbeeson"},{a:7,b:"https://www.youtube.com/user/Buckeye198181"}])},Zr={aE:"Will is a freelance animator based in Arlington, Virginia. ",M:"/assets/Team/Will.jpeg",a:"WM",K:"Will Maciejewski",b:"Producer and Animator",c:b([{a:0,b:"https://www.willmacmotion.com/"},{a:1,b:"https://www.instagram.com/willmacmotion/"}])},Ur=b([Ur,Xr,K,Qr,Rr,Yr,Wr,Zr,qr,zr,Jr,Ir,Or,Hr,Vr]),Xr=b([{aE:"Trevor is a former software engineer. He is currently studying for a Masters in Theology at the Franciscan University of Stuebenville. He founded Catholic Stories for Children to spread the light and love of God through animated stories that kids will love.",M:"/assets/Team/TrevorRothaus.jpeg",a:"",K:"Trevor Rothaus",b:"CEO",c:d},{aE:"Carlos is a CAD designer who also has a passion for dogs, comedy and food.",M:"/assets/Team/CarlosG.jpg",a:"",K:"Carlos Gutierrez",b:"CFO",c:d}]),et=u("h3"),rt=Br("alt"),tt=r(function(e,r){return""===e?l(x,b([l(C,"position","relative"),l(C,"width","52px"),l(C,"height","52px"),l(C,"border-radius","30px"),l(C,"border","1px solid #777"),l(C,"background-color","#B99EDA")]),b([l(x,b([l(C,"position","absolute"),l(C,"top","50%"),l(C,"left","50%"),l(C,"transform","translate(-50%, -50%)")]),b([$(r)]))])):l(F,b([l(C,"width","52px"),l(C,"height","52px"),l(C,"border-radius","30px"),l(C,"border","1px solid #777"),l(C,"object-fit","cover"),v(e),rt(""),l(_,"ariaHidden","true")]),d)}),nt=t(function(e,t,n){if(o(t,n))return 1;for(var r=e;;){if(!r.b)return 1;var a=r.a,i=r.b;if(o(a,t))return function(e){for(;;){if(!e.b)return 2;var r=e.b;if(o(e.a,n))return 0;e=r}}(i);if(o(a,n))return function(e){for(;;){if(!e.b)return 0;var r=e.b;if(o(e.a,t))return 2;e=r}}(i);r=i}})(b([0,1,2,3,4,5,6,7,8,9,10,11])),at=r(function(e,r){return l(nt,e.a,r.a)}),it=J,K=r(function(e,r){return l(F,b([l(C,"aria-hidden","true"),v(r),l(C,"width","16px"),l(C,"height","16px"),rt(e)]),d)}),ot=l(K,"behance","https://www.behance.net/favicon.ico"),st=l(K,"facebook","https://www.facebook.com/favicon.ico"),ct=l(K,"imdb","https://www.imdb.com/favicon.ico"),ut=l(K,"instagram","https://www.instagram.com/favicon.ico"),ft=l(K,"linkedin","https://www.linkedin.com/favicon.ico"),lt=l(K,"pinterest","https://www.pinterest.com/favicon.ico"),ht=l(K,"soundcloud","https://soundcloud.com/favicon.ico"),dt=l(K,"spotify","https://www.spotify.com/favicon.ico"),bt=l(K,"twitter","https://www.twitter.com/favicon.ico"),P=t(function(e,r,t){return l(A,b([s(r),l(C,"text-decoration","none"),T("_blank"),l(C,"margin-right","10px"),l(_,"aria-label",t),M("inline-block")]),b([e]))}),mt=l(K,"vimeo","https://vimeo.com/favicon.ico"),pt=l(K,"youtube","https://www.youtube.com/favicon.ico"),gt=function(e){var r=e.b;switch(e.a){case 0:return f(P,$("🌐"),r,"website");case 1:return f(P,ut,r,"instagram");case 2:return f(P,bt,r,"twitter");case 5:return f(P,st,r,"facebook");case 6:return f(P,ft,r,"linkedin");case 3:return f(P,mt,r,"vimeo");case 4:return f(P,ct,r,"imdb");case 7:return f(P,pt,r,"youtube");case 8:return f(P,lt,r,"pinterest");case 9:return f(P,dt,r,"spotify");case 10:return f(P,ht,r,"soundcloud");default:return f(P,ot,r,"behance")}},Qr=t(function(e,r,t){return l(x,d,q(b([l(et,b([M("text-2xl my-5")]),b([$(e)])),l(x,b([M("hcenter")]),b([$(r)]))]),l(jr,function(e){return l(x,b([M("my-10")]),b([Ve(e)]))},t)))}),Rr=l(x,d,b([l(j,b([M("my-10")]),b([$("The Team")])),l(x,b([l(C,"margin-bottom","100px")]),b([f(Qr,"Staff","",Xr)])),l(x,b([l(C,"margin-bottom","100px")]),b([f(Qr,"Board of Advisors","",X)])),l(x,b([l(C,"margin-bottom","100px")]),b([f(Qr,"Talent","A number of talented artists, contractors, teams and people help bring these animations to life.",Ur)]))])),Yr=l(x,b([M("hcenter"),l(C,"width","80%"),l(C,"max-width","800px")]),b([l(Lr,b([M("my-10")]),b([$("About Us")])),V,a,Rr])),Wr=l(u("footer"),b([l(C,"padding",O(30)+"px"),l(C,"background-color","black"),l(C,"color","white"),l(C,"transform-style","preserve-3d")]),b([l(x,b([M("flex items-center gap-2.5")]),b([l(e,d,b([$("Follow us on")])),l(A,b([s("https://www.facebook.com/catholicstoriesforchildren"),l(_,"aria-label","CSC Facebook Page"),T("_blank")]),b([l(F,b([M("w-10 h-10"),v("https://ik.imagekit.io/catholicstories/f_logo_RGB-Blue_250_3vs-yhXer.png?updatedAt=1684277030198"),rt("Facebook")]),d)])),l(A,b([s("https://www.instagram.com/catholicstoriesforchildren/"),l(_,"aria-label","CSC Instagram Page"),T("_blank")]),b([l(F,b([M("w-10 h-10"),v("https://ik.imagekit.io/catholicstories/Instagram_Glyph_Gradient_kFoMs9jIr.png?updatedAt=1684277127293"),rt("Instagram")]),d)]))])),l(i,d,b([$("Copyright © 2024 Catholic Stories for Children. All rights reserved.")])),l(i,d,b([$("Catholic Stories for Children is a 501(c)(3) non-profit recognized by the IRS. Contributions to Catholic Stories for Children are tax-deductible to the extent permitted by law.  Tax ID Number: 85-4194883")]))])),vt=u("header"),wt=u("nav"),N=L(function(e,r,t,n){return l(A,b([s(r),M("flex items-center justify-center"),M("hover:scale-105 transition ease-in-out"),M("hover:border-b-4 hover:border-[#9101b3]"),M("rounded"),M("h-[60px] h-["+e+"]"),M("p-2"),l(_,"aria-label",n),T(t)]),b([$(n)]))}),yt=l(A,b([s("/navigation"),M("space-y-2"),l(_,"aria-label","menu")]),b([l(x,b([M("w-8 h-0.5 m-auto bg-gray-600")]),d),l(x,b([M("w-8 h-0.5 m-auto bg-gray-600")]),d),l(x,b([M("w-8 h-0.5 m-auto bg-gray-600")]),d)])),kt=r(function(e,r){var e=e?{a:"text-[0px] md:text-xl",b:"invisible md:visible"}:{a:"text-lg md:text-xl",b:""},t=e.a,e=e.b;return l(A,b([l(C,"text-decoration","none"),M("colorDarkGray"),M(e),M("justify-self-start"),s("/")]),b([l(Lr,b([l(C,"font-family","hvdComicSerifPro"),l(C,"margin","0px"),M(t)]),b([$("Catholic Stories for Children")]))]))}),Zr=l(F,b([v("/assets/logo_solid.svg"),l(C,"height","30px"),rt(""),l(C,"vertical-align","middle")]),d),xt=l(A,b([l(C,"text-decoration","none"),M("colorDarkGray"),s("/"),l(_,"aria-label","home")]),b([Zr])),qr=r(function(e,r){var t="Catholic Stories for Children"===e?{a:"111px",b:Ue,c:"grid-cols-[150px_1fr_150px] lg:grid-cols-[150px_1fr_600px]"}:{a:"60px",b:Ue,c:"grid-cols-[150px_1fr_150px] lg:grid-cols-[150px_1fr_600px]"},n=t.a,a=t.b,t=t.c;return l(vt,b([l(C,"background-color","#3d5d75"),l(C,"background-image","linear-gradient(130deg, #9DE2EB , #EBD6F1)"),M("h-[60px] md:h-["+n+"]"),M("colorDarkGray"),M("grid items-center justify-items-center"),M(t)]),b([xt,l(kt,!0,e),a(n)]))}),Ct=l(x,b([l(C,"height","100vh"),l(C,"overflow-x","hidden"),l(C,"background-color","#FEF7F4")]),b([l(qr,"Team",10),Yr,Wr])),zr=(Qe={aM:{},a1:function(e){return function(e){return e}},a3:function(e){return Ct}},ze({aM:function(e){return{a:Qe.aM,b:Pr}},a_:function(e){return Nr},a1:r(function(e,r){return{a:l(Qe.a1,e,r),b:Pr}}),a3:Qe.a3}));Jr={Team:{Main:{init:zr(Q(0))(0)}}},D.Elm?function e(r,t){for(var n in t)n in r?"init"==n?U(6):e(r[n],t[n]):r[n]=t[n]}(D.Elm,Jr):D.Elm=Jr}(this);