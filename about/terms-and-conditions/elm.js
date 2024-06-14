!function(I){"use strict";function q(e,r,t){return t.a=e,t.f=r,t}function r(t){return q(2,t,function(r){return function(e){return t(r,e)}})}function e(n){return q(3,n,function(t){return function(r){return function(e){return n(t,r,e)}}})}function D(i){return q(4,i,function(n){return function(t){return function(r){return function(e){return i(n,t,r,e)}}}})}function G(o){return q(5,o,function(i){return function(n){return function(t){return function(r){return function(e){return o(i,n,t,r,e)}}}}})}function l(e,r,t){return 2===e.a?e.f(r,t):e(r)(t)}function f(e,r,t,n){return 3===e.a?e.f(r,t,n):e(r)(t)(n)}function h(e,r,t,n,i){return 4===e.a?e.f(r,t,n,i):e(r)(t)(n)(i)}function R(e,r,t,n,i,o){return 5===e.a?e.f(r,t,n,i,o):e(r)(t)(n)(i)(o)}function n(e,r,t){if("object"!=typeof e)return e===r?0:e<r?-1:1;if(void 0===e.$)return(t=(t=n(e.a,r.a))||n(e.b,r.b))||n(e.c,r.c);for(;e.b&&r.b&&!(t=n(e.a,r.a));e=e.b,r=r.b);return t||(e.b?1:r.b?-1:0)}var U=0;var d={$:0};function z(e,r){return{$:1,a:e,b:r}}var M=r(z);function v(e){for(var r=d,t=e.length;t--;)r={$:1,a:e[t],b:r};return r}var t=e(function(e,r,t){for(var n=Array(e),i=0;i<e;i++)n[i]=t(r+i);return n}),i=r(function(e,r){for(var t=Array(e),n=0;n<e&&r.b;n++)t[n]=r.a,r=r.b;return t.length=n,{a:t,b:r}});function O(e){throw Error("https://github.com/elm/core/blob/1.0.0/hints/"+e+".md")}var X=Math.ceil,o=Math.floor,Y=Math.log;var Z=r(b);function b(e,r){switch(e.$){case 2:return e.b(r);case 5:return null===r?C(e.c):m("null",r);case 3:return H(r)?J(e.b,r,v):m("a LIST",r);case 4:return H(r)?J(e.b,r,K):m("an ARRAY",r);case 6:var t=e.d;return"object"==typeof r&&null!==r&&t in r?(o=b(e.b,r[t]),k(o)?o:w(l(Me,t,o.a))):m("an OBJECT with a field named `"+t+"`",r);case 7:t=e.e;return H(r)?t<r.length?(o=b(e.b,r[t]),k(o)?o:w(l(Oe,t,o.a))):m("a LONGER array. Need index "+t+" but only see "+r.length+" entries",r):m("an ARRAY",r);case 8:if("object"!=typeof r||null===r||H(r))return m("an OBJECT",r);var n,i=d;for(n in r)if(r.hasOwnProperty(n)){var o=b(e.b,r[n]);if(!k(o))return w(l(Me,n,o.a));i={$:1,a:{a:n,b:o.a},b:i}}return C($(i));case 9:for(var a=e.f,u=e.g,s=0;s<u.length;s++){o=b(u[s],r);if(!k(o))return o;a=a(o.a)}return C(a);case 10:o=b(e.b,r);return k(o)?b(e.h(o.a),r):o;case 11:for(var c=d,f=e.g;f.b;f=f.b){o=b(f.a,r);if(k(o))return o;c={$:1,a:o.a,b:c}}return w(Xe($(c)));case 1:return w(l(ze,e.a,r));case 0:return C(e.a)}}function J(e,r,t){for(var n=r.length,i=Array(n),o=0;o<n;o++){var a=b(e,r[o]);if(!k(a))return w(l(Oe,o,a.a));i[o]=a.a}return C(t(i))}function H(e){return Array.isArray(e)||"undefined"!=typeof FileList&&e instanceof FileList}function K(r){return l(sr,r.length,function(e){return r[e]})}function m(e,r){return w(l(ze,"Expecting "+e,r))}function s(e,r){if(e===r)return!0;if(e.$!==r.$)return!1;switch(e.$){case 0:case 1:return e.a===r.a;case 2:return e.b===r.b;case 5:return e.c===r.c;case 3:case 4:case 8:return s(e.b,r.b);case 6:return e.d===r.d&&s(e.b,r.b);case 7:return e.e===r.e&&s(e.b,r.b);case 9:return e.f===r.f&&W(e.g,r.g);case 10:return e.h===r.h&&s(e.b,r.b);case 11:return W(e.g,r.g)}}function W(e,r){var t=e.length;if(t!==r.length)return!1;for(var n=0;n<t;n++)if(!s(e[n],r[n]))return!1;return!0}function Q(e){return e}function V(e){return{$:0,a:e}}var ee=r(function(e,r){return{$:3,b:e,d:r}});var re=0;function te(e){e={$:0,e:re++,f:e,g:null,h:[]};return ue(e),e}function ne(r){return{$:2,b:function(e){e({$:0,a:te(r)})},c:null}}function ie(e,r){e.h.push(r),ue(e)}var oe=!1,ae=[];function ue(e){if(ae.push(e),!oe){for(oe=!0;e=ae.shift();)!function(r){for(;r.f;){var e=r.f.$;if(0===e||1===e){for(;r.g&&r.g.$!==e;)r.g=r.g.i;if(!r.g)return;r.f=r.g.b(r.f.a),r.g=r.g.i}else{if(2===e)return r.f.c=r.f.b(function(e){r.f=e,ue(r)});if(5===e){if(0===r.h.length)return;r.f=r.f.b(r.h.shift())}else r.g={$:3===e?0:1,b:r.f.b,i:r.g},r.f=r.f.d}}}(e);oe=!1}}function se(e,r,t,n,i,o){var e=l(Z,e,r?r.flags:void 0),a=(k(e)||O(2),{}),r=t(e.a),u=r.a,s=o(c,u),t=function(e,r){var t,n;for(n in g){var i=g[n];i.a&&((t=t||{})[n]=i.a(n,r)),e[n]=function(e,r){var n={g:r,h:void 0},i=e.c,o=e.d,a=e.e,u=e.f;function s(t){return l(ee,s,{$:5,b:function(e){var r=e.a;return 0===e.$?f(o,n,r,t):a&&u?h(i,n,r.i,r.j,t):f(i,n,a?r.i:r.j,t)}})}return n.h=te(l(ee,s,e.b))}(i,r)}return t}(a,c);function c(e,r){e=l(n,e,u);s(u=e.a,r),de(a,e.b,i(u))}return de(a,r.b,i(u)),t?{ports:t}:{}}var g={};var a=r(function(r,t){return{$:2,b:function(e){r.g(t),e({$:0,a:U})},c:null}});function ce(r){return function(e){return{$:1,k:r,l:e}}}function fe(e){return{$:2,m:e}}var le=[],he=!1;function de(e,r,t){if(le.push({p:e,q:r,r:t}),!he){he=!0;for(var n;n=le.shift();)!function(e,r,t){var n,i={};for(n in ve(!0,r,i,null),ve(!1,t,i,null),e)ie(e[n],{$:"fx",a:i[n]||{i:d,j:d}})}(n.p,n.q,n.r);he=!1}}function ve(e,r,t,n){switch(r.$){case 1:var i=r.k,o=function(e,r,t,n){function i(e){for(var r=t;r;r=r.t)e=r.s(e);return e}return l(e?g[r].e:g[r].f,i,n)}(e,i,n,r.l);return void(t[i]=function(e,r,t){return t=t||{i:d,j:d},e?t.i={$:1,a:r,b:t.i}:t.j={$:1,a:r,b:t.j},t}(e,o,t[i]));case 2:for(var a=r.m;a.b;a=a.b)ve(e,a.a,t,n);return;case 3:ve(e,r.o,t,{s:r.n,t:n})}}var be;var me="undefined"!=typeof document?document:{};function ge(e){return{$:0,a:e}}var c=r(function(o,a){return r(function(e,r){for(var t=[],n=0;r.b;r=r.b){var i=r.a;n+=i.b||0,t.push(i)}return n+=t.length,{$:1,c:a,d:ke(e),e:t,f:o,b:n}})})(void 0);r(function(o,a){return r(function(e,r){for(var t=[],n=0;r.b;r=r.b){var i=r.a;n+=i.b.b||0,t.push(i)}return n+=t.length,{$:2,c:a,d:ke(e),e:t,f:o,b:n}})})(void 0);var pe=r(function(e,r){return{$:"a1",n:e,o:r}}),ye=r(function(e,r){return{$:"a2",n:e,o:r}}),we=r(function(e,r){return{$:"a3",n:e,o:r}});function Ce(e){return/^\s*(javascript:|data:text\/html)/i.test(e)?"":e}var $e;function ke(e){for(var r={};e.b;e=e.b){var t,n=e.a,i=n.$,o=n.n,n=n.o;"a2"===i?"className"===o?_e(r,o,n):r[o]=n:(t=r[i]||(r[i]={}),"a3"===i&&"class"===o?_e(t,o,n):t[o]=n)}return r}function _e(e,r,t){var n=e[r];e[r]=n?n+" "+t:t}function p(e,r){var t=e.$;if(5===t)return p(e.k||(e.k=e.m()),r);if(0===t)return me.createTextNode(e.a);if(4===t){for(var n=e.k,i=e.j;4===n.$;)"object"!=typeof i?i=[i,n.j]:i.push(n.j),n=n.k;var o={j:i,p:r};(a=p(n,o)).elm_event_node_ref=o}else if(3===t)xe(a=e.h(e.g),r,e.d);else{var a=e.f?me.createElementNS(e.f,e.c):me.createElement(e.c);be&&"a"==e.c&&a.addEventListener("click",be(a)),xe(a,r,e.d);for(var u=e.e,s=0;s<u.length;s++)a.appendChild(p(1===t?u[s]:u[s].b,r))}return a}function xe(e,r,t){for(var n in t){var i=t[n];"a1"===n?function(e,r){var t,n=e.style;for(t in r)n[t]=r[t]}(e,i):"a0"===n?function(e,r,t){var n,i=e.elmFs||(e.elmFs={});for(n in t){var o=t[n],a=i[n];if(o){if(a){if(a.q.$===o.$){a.q=o;continue}e.removeEventListener(n,a)}a=function(s,e){function c(e){var r=c.q,t=b(r.a,e);if(k(t)){for(var n,r=cr(r),t=t.a,i=r?r<3?t.a:t.r:t,o=1==r?t.b:3==r&&t.N,a=(o&&e.stopPropagation(),(2==r?t.b:3==r&&t.K)&&e.preventDefault(),s);n=a.j;){if("function"==typeof n)i=n(i);else for(var u=n.length;u--;)i=n[u](i);a=a.p}a(i,o)}}return c.q=e,c}(r,o),e.addEventListener(n,a,$e&&{passive:cr(o)<2}),i[n]=a}else e.removeEventListener(n,a),i[n]=void 0}}(e,r,i):"a3"===n?function(e,r){for(var t in r){var n=r[t];void 0!==n?e.setAttribute(t,n):e.removeAttribute(t)}}(e,i):"a4"===n?function(e,r){for(var t in r){var n=r[t],i=n.f,n=n.o;void 0!==n?e.setAttributeNS(i,t,n):e.removeAttributeNS(i,t)}}(e,i):("value"!==n&&"checked"!==n||e[n]!==i)&&(e[n]=i)}}try{window.addEventListener("t",null,Object.defineProperty({},"passive",{get:function(){$e=!0}}))}catch(e){}function Se(e,r){var t=[];return E(e,r,t,0),t}function T(e,r,t,n){r={$:r,r:t,s:n,t:void 0,u:void 0};return e.push(r),r}function E(e,r,t,n){if(e!==r){var i=e.$,o=r.$;if(i!==o){if(1!==i||2!==o)return void T(t,0,n,r);r=function(e){for(var r=e.e,t=r.length,n=Array(t),i=0;i<t;i++)n[i]=r[i].b;return{$:1,c:e.c,d:e.d,e:n,f:e.f,b:e.b}}(r),o=1}switch(o){case 5:for(var a=e.l,u=r.l,s=a.length,c=s===u.length;c&&s--;)c=a[s]===u[s];if(c)return void(r.k=e.k);r.k=r.m();var f=[];return E(e.k,r.k,f,0),void(0<f.length&&T(t,1,n,f));case 4:for(var l=e.j,h=r.j,d=!1,v=e.k;4===v.$;)d=!0,"object"!=typeof l?l=[l,v.j]:l.push(v.j),v=v.k;for(var b=r.k;4===b.$;)d=!0,"object"!=typeof h?h=[h,b.j]:h.push(b.j),b=b.k;return d&&l.length!==h.length?void T(t,0,n,r):((d?function(e,r){for(var t=0;t<e.length;t++)if(e[t]!==r[t])return;return 1}(l,h):l===h)||T(t,2,n,h),void E(v,b,t,n+1));case 0:return void(e.a!==r.a&&T(t,3,n,r.a));case 1:return void je(e,r,t,n,Te);case 2:return void je(e,r,t,n,Ee);case 3:if(e.h!==r.h)return void T(t,0,n,r);f=Ae(e.d,r.d),f=(f&&T(t,4,n,f),r.i(e.g,r.g));f&&T(t,5,n,f)}}}function je(e,r,t,n,i){var o;e.c!==r.c||e.f!==r.f?T(t,0,n,r):((o=Ae(e.d,r.d))&&T(t,4,n,o),i(e,r,t,n))}function Ae(e,r,t){var n,i,o,a,u;for(i in e)"a1"===i||"a0"===i||"a3"===i||"a4"===i?(o=Ae(e[i],r[i]||{},i))&&((n=n||{})[i]=o):i in r?(o=e[i])===(a=r[i])&&"value"!==i&&"checked"!==i||"a0"===t&&function(e,r){return e.$==r.$&&s(e.a,r.a)}(o,a)||((n=n||{})[i]=a):(n=n||{})[i]=t?"a1"===t?"":"a0"===t||"a3"===t?void 0:{f:e[i].f,o:void 0}:"string"==typeof e[i]?"":null;for(u in r)u in e||((n=n||{})[u]=r[u]);return n}function Te(e,r,t,n){var i=e.e,o=r.e,e=i.length,r=o.length;r<e?T(t,6,n,{v:r,i:e-r}):e<r&&T(t,7,n,{v:e,e:o});for(var a=e<r?e:r,u=0;u<a;u++){var s=i[u];E(s,o[u],t,++n),n+=s.b||0}}function Ee(e,r,t,n){for(var i=[],o={},a=[],u=e.e,s=r.e,c=u.length,f=s.length,l=0,h=0,d=n;l<c&&h<f;){var v=u[l],b=s[h],m=v.a,g=b.a,p=v.b,y=b.b,w=void 0,C=void 0;if(m===g)E(p,y,i,++d),d+=p.b||0,l++,h++;else{var $,k,_,x,S=u[l+1],j=s[h+1];if(S&&(k=S.b,C=g===($=S.a)),j&&(x=j.b,w=m===(_=j.a)),w&&C)E(p,x,i,++d),N(o,i,m,y,h,a),d+=p.b||0,F(o,i,m,k,++d),d+=k.b||0,l+=2,h+=2;else if(w)d++,N(o,i,g,y,h,a),E(p,x,i,d),d+=p.b||0,l+=1,h+=2;else if(C)F(o,i,m,p,++d),d+=p.b||0,E(k,y,i,++d),d+=k.b||0,l+=2,h+=1;else{if(!S||$!==_)break;F(o,i,m,p,++d),N(o,i,g,y,h,a),d+=p.b||0,E(k,x,i,++d),d+=k.b||0,l+=2,h+=2}}}for(;l<c;){p=(v=u[l]).b;F(o,i,v.a,p,++d),d+=p.b||0,l++}for(;h<f;){var A=A||[];N(o,i,(b=s[h]).a,b.b,void 0,A),h++}(0<i.length||0<a.length||A)&&T(t,8,n,{w:i,x:a,y:A})}var Ne="_elmW6BL";function N(e,r,t,n,i,o){var a,u=e[t];u?1===u.c?(o.push({r:i,A:u}),u.c=2,E(u.z,n,a=[],u.r),u.r=i,u.s.s={w:a,A:u}):N(e,r,t+Ne,n,i,o):(o.push({r:i,A:u={c:0,z:n,r:i,s:void 0}}),e[t]=u)}function F(e,r,t,n,i){var o,a=e[t];a?0===a.c?(a.c=2,E(n,a.z,o=[],i),T(r,9,i,{w:o,A:a})):F(e,r,t+Ne,n,i):(o=T(r,9,i,void 0),e[t]={c:1,z:n,r:i,s:o})}function Fe(e,r,t,n){!function e(r,t,n,i,o,a,u){var s=n[i];var c=s.r;for(;c===o;){var f,l=s.$;if(1===l?Fe(r,t.k,s.s,u):8===l?(s.t=r,s.u=u,0<(f=s.s.w).length&&e(r,t,f,0,o,a,u)):9===l?(s.t=r,s.u=u,(l=s.s)&&(l.A.s=r,0<(f=l.w).length)&&e(r,t,f,0,o,a,u)):(s.t=r,s.u=u),!(s=n[++i])||(c=s.r)>a)return i}var h=t.$;if(4===h){for(var d=t.k;4===d.$;)d=d.k;return e(r,d,n,i,o+1,a,r.elm_event_node_ref)}var v=t.e;var b=r.childNodes;for(var m=0;m<v.length;m++){var g=1===h?v[m]:v[m].b,p=++o+(g.b||0);if(o<=c&&c<=p&&(i=e(b[m],g,n,i,o,p,u),!(s=n[i])||(c=s.r)>a))return i;o=p}return i}(e,r,t,0,0,r.b,n)}function Le(e,r,t,n){return 0===t.length?e:(Fe(e,r,t,n),Pe(e,t))}function Pe(e,r){for(var t=0;t<r.length;t++){var n=r[t],i=n.t,n=function(e,r){switch(r.$){case 0:return function(e,r,t){var n=e.parentNode,r=p(r,t);r.elm_event_node_ref||(r.elm_event_node_ref=e.elm_event_node_ref);n&&r!==e&&n.replaceChild(r,e);return r}(e,r.s,r.u);case 4:return xe(e,r.u,r.s),e;case 3:return e.replaceData(0,e.length,r.s),e;case 1:return Pe(e,r.s);case 2:return e.elm_event_node_ref?e.elm_event_node_ref.j=r.s:e.elm_event_node_ref={j:r.s,p:r.u},e;case 6:for(var t=r.s,n=0;n<t.i;n++)e.removeChild(e.childNodes[t.v]);return e;case 7:for(var i=(t=r.s).e,n=t.v,o=e.childNodes[n];n<i.length;n++)e.insertBefore(p(i[n],r.u),o);return e;case 9:var a;return(t=r.s)?(void 0!==(a=t.A).r&&e.parentNode.removeChild(e),a.s=Pe(e,t.w)):e.parentNode.removeChild(e),e;case 8:return function(e,r){for(var t=r.s,n=function(e,r){if(e){for(var t=me.createDocumentFragment(),n=0;n<e.length;n++){var i=e[n].A;t.appendChild(2===i.c?i.s:p(i.z,r.u))}return t}}(t.y,r),i=(e=Pe(e,t.w),t.x),o=0;o<i.length;o++){var a=i[o],u=a.A,u=2===u.c?u.s:p(u.z,r.u);e.insertBefore(u,e.childNodes[a.r])}n&&e.appendChild(n);return e}(e,r);case 5:return r.s(e);default:O(10)}}(i,n);i===e&&(e=n)}return e}function Be(e){if(3===e.nodeType)return{$:0,a:e.textContent};if(1!==e.nodeType)return{$:0,a:""};for(var r=d,t=e.attributes,n=t.length;n--;)var i=t[n],r={$:1,a:l(we,i.name,i.value),b:r};for(var o=e.tagName.toLowerCase(),a=d,u=e.childNodes,n=u.length;n--;)a={$:1,a:Be(u[n]),b:a};return f(c,o,r,a)}var Ie=D(function(r,e,t,a){return se(e,a,r.aF,r.aX,r.aU,function(t,e){var n=r.aZ,i=a.node,o=Be(i);return De(e,function(e){var e=n(e),r=Se(o,e);i=Le(i,o,r,t),o=e})})}),qe="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:function(e){return setTimeout(e,1e3/60)};function De(t,n){n(t);var i=0;function o(){i=1===i?0:(qe(o),n(t),1)}return function(e,r){t=e,r?(n(t),2===i&&(i=1)):(0===i&&qe(o),i=2)}}function u(e){return l(j,"href",/^javascript:/i.test((e=e).replace(/\s/g,""))?"":e)}function Ge(e){return l(j,"src",Ce(e))}function Re(e){return l(x,v([A("w-full pr-2")]),v([l(x,v([A("lg:hidden")]),v([Ar])),l(x,v([A("hidden lg:block w-full")]),v([function(e){return l(jr,v([A("h-full w-full flex justify-end content-center justify-items-center gap-4 mr-4"),A("text-base")]),v([h(B,e,"/feastdayactivities","_self","Activities"),h(B,e,"/saints","_self","Saints"),h(B,e,"/animations","_self","Animations"),h(B,e,"/resources","_self","Resources"),h(B,e,"https://www.etsy.com/shop/CatholicStories","_blank","Shop"),h(B,e,"/give","_self","Give"),h(B,e,"/team","_self","About")]))}(e)]))]))}var Ue,y=M,w=function(e){return{$:1,a:e}},ze=r(function(e,r){return{$:3,a:e,b:r}}),Me=r(function(e,r){return{$:0,a:e,b:r}}),Oe=r(function(e,r){return{$:1,a:e,b:r}}),C=function(e){return{$:0,a:e}},Xe=function(e){return{$:2,a:e}},M=function(e){return e+""},Ye=e(function(e,r,t){for(;;){if(!t.b)return r;var n=t.b,i=e,o=l(e,t.a,r);e=i,r=o,t=n}}),$=function(e){return f(Ye,y,d,e)},Ze=D(function(e,r,t,n){return{$:0,a:e,b:r,c:t,d:n}}),Je=[],He=X,Ke=r(function(e,r){return Y(r)/Y(e)}),We=He(l(Ke,2,32)),Qe=h(Ze,0,We,Je,Je),Ve=t,er=o,rr=function(e){return e.length},tr=r(function(e,r){return 0<n(e,r)?e:r}),nr=i,ir=r(function(e,r){for(;;){var t=l(nr,32,e),n=t.b,t=l(y,{$:0,a:t.a},r);if(!n.b)return $(t);e=n,r=t}}),or=r(function(e,r){for(;;){var t=He(r/32);if(1===t)return l(nr,32,e).a;e=l(ir,e,d),r=t}}),ar=r(function(e,r){var t,n;return r.a?(n=er(l(Ke,32,(t=32*r.a)-1)),e=e?$(r.d):r.d,e=l(or,e,r.a),h(Ze,rr(r.c)+t,l(tr,5,n*We),e,r.c)):h(Ze,rr(r.c),We,Je,r.c)}),ur=G(function(e,r,t,n,i){for(;;){if(r<0)return l(ar,!1,{d:n,a:t/32|0,c:i});var o={$:1,a:f(Ve,32,r,e)};e=e,r=r-32,t=t,n=l(y,o,n),i=i}}),sr=r(function(e,r){var t;return 0<e?R(ur,r,e-(t=e%32)-32,e,d,f(Ve,t,e-t,r)):Qe}),k=function(e){return!e.$},X=function(e){return{$:0,a:e}},cr=function(e){switch(e.$){case 0:return 0;case 1:return 1;case 2:return 2;default:return 3}},_=V,t=_(0),fr=D(function(e,r,t,n){var i,o,a,u;return n.b?(i=n.a,(n=n.b).b?(o=n.a,(n=n.b).b?(a=n.a,(n=n.b).b?(u=n.b,l(e,i,l(e,o,l(e,a,l(e,n.a,500<t?f(Ye,e,r,$(u)):h(fr,e,r,t+1,u)))))):l(e,i,l(e,o,l(e,a,r)))):l(e,i,l(e,o,r))):l(e,i,r)):r}),lr=e(function(e,r,t){return h(fr,e,r,0,t)}),hr=r(function(t,e){return f(lr,r(function(e,r){return l(y,t(e),r)}),d,e)}),dr=ee,vr=r(function(r,e){return l(dr,function(e){return _(r(e))},e)}),br=e(function(t,e,n){return l(dr,function(r){return l(dr,function(e){return _(l(t,r,e))},n)},e)}),mr=a,gr=r(function(e,r){return ne(l(dr,mr(e),r))}),o=e(function(e,r,t){return l(vr,function(e){return 0},(e=l(hr,gr(e),r),f(lr,br(y),_(d),e)))}),pr=(g.Task={b:t,c:o,d:e(function(e,r,t){return _(0)}),e:r(function(e,r){return l(vr,e,r)}),f:void 0},ce("Task"),fe(d)),yr=fe(d),x=c("div"),S=c("a"),wr=Q,j=r(function(e,r){return l(ye,e,wr(r))}),A=j("className"),Cr=c("h1"),i=c("h2"),a=c("li"),t=c("p"),o=c("span"),$r=j("target"),L=ge,kr=c("ul"),kr=l(x,d,v([l(Cr,v([A("m-10")]),v([L("Terms and Conditions of Use")])),l(x,v([A("")]),v([l(t,v([A("m-10")]),v([L(" These terms and conditions govern your use of the Catholic Stories for Children website, accessible from https://catholicstoriesforchildren.com/.  ")])),l(i,v([A("m-10")]),v([L("1. Acceptance of Terms")])),l(t,v([A("m-10")]),v([L("By accessing this website, you agree to be bound by these terms and conditions, all applicable laws, and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.")])),l(i,v([A("m-10")]),v([L("2. Use License")])),l(t,v([A("mt-10 mx-10")]),v([L("Permission is granted to temporarily download one copy of the materials (information or software) on Catholic Stories for Children's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license, you may not:")])),l(kr,v([A("list-disc")]),v([l(a,v([A("mx-20")]),v([L("modify or copy the materials;")])),l(a,v([A("mx-20")]),v([L("use the materials for any commercial purpose or for any public display (commercial or non-commercial);")])),l(a,v([A("mx-20")]),v([L("attempt to decompile or reverse engineer any software contained on Catholic Stories for Children's website;")])),l(a,v([A("mx-20")]),v([L("remove any copyright or other proprietary notations from the materials; or")])),l(a,v([A("mx-20")]),v([L('transfer the materials to another person or "mirror" the materials on any other server.')]))])),l(t,v([A("m-10")]),v([L("This license shall automatically terminate if you violate any of these restrictions and may be terminated by Catholic Stories for Children at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.")])),l(i,v([A("m-10")]),v([L("3. Disclaimer")])),l(t,v([A("m-10")]),v([L("The materials on Catholic Stories for Children's website are provided on an 'as is' basis. Catholic Stories for Children makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.")])),l(t,v([A("m-10")]),v([L("Further, Catholic Stories for Children does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.")])),l(i,v([A("m-10")]),v([L("4. Limitation of Liability")])),l(t,v([A("m-10")]),v([L("In no event shall Catholic Stories for Children or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Catholic Stories for Children's website, even if Catholic Stories for Children or a Catholic Stories for Children authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.")])),l(i,v([A("m-10")]),v([L("5. Revisions and Errata")])),l(t,v([A("m-10")]),v([L("The materials appearing on Catholic Stories for Children's website could include technical, typographical, or photographic errors. Catholic Stories for Children does not warrant that any of the materials on its website are accurate, complete, or current. Catholic Stories for Children may make changes to the materials contained on its website at any time without notice. However, Catholic Stories for Children does not make any commitment to update the materials.")])),l(i,v([A("m-10")]),v([L("6. Links to Third-Party Sites")])),l(t,v([A("m-10")]),v([L("Catholic Stories for Children has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Catholic Stories for Children of the site. Use of any such linked website is at the user's own risk.")])),l(i,v([A("m-10")]),v([L("7. Site Terms of Use Modifications")])),l(t,v([A("m-10")]),v([L("Catholic Stories for Children may revise these terms of use for its website at any time without notice. By using this website you are agreeing to be bound by the then-current version of these Terms and Conditions of Use.")])),l(i,v([A("m-10")]),v([L("8. Governing Law and Jurisdiction")])),l(t,v([A("m-10")]),v([L("These terms and conditions are governed by and construed in accordance with the laws of the state of California and the applicable laws of the United States of America. You agree that any legal action or proceeding between Catholic Stories for Children and you for any purpose concerning these terms and conditions or the obligations hereunder shall be brought exclusively in a court of competent jurisdiction sitting in the State of California, and you expressly waive any objection that you may have now or hereafter to the laying of the venue or to the jurisdiction of any such court over you.")])),l(i,v([A("m-10")]),v([L("9. Privacy Policy")])),l(t,v([A("m-10")]),v([l(o,d,v([L("Your use of Catholic Stories for Children's website is also governed by our Privacy Policy. Please review our ")])),l(S,v([u("/about/privacy-policy"),A("text-blue-600 underline"),$r("_blank")]),v([L("Privacy Policy")])),l(o,d,v([L(" for information on how we collect, use, and protect your personal information.")]))])),l(i,v([A("m-10")]),v([L("10. Contact Information")])),l(t,v([A("m-10")]),v([L("If you have any questions about these terms and conditions, please visit our "),l(S,v([u("/team/#contact"),A("text-blue-600 underline"),$r("_blank")]),v([L("contact page")]))]))]))])),a=j("alt"),_r=r(function(e,r){return l(we,function(e){return/^(on|formAction$)/i.test(e)?"data-"+e:e}(e),Ce(r))}),i=c("footer"),xr=c("img"),P=pe,pe=l(i,v([l(P,"padding",M(30)+"px"),l(P,"background-color","black"),l(P,"color","white")]),v([l(x,v([A("flex items-center gap-2.5")]),v([l(o,d,v([L("Follow us on")])),l(S,v([u("https://www.facebook.com/catholicstoriesforchildren"),l(_r,"aria-label","CSC Facebook Page"),$r("_blank")]),v([l(xr,v([A("w-10 h-10"),Ge("https://ik.imagekit.io/catholicstories/f_logo_RGB-Blue_250_3vs-yhXer.png?updatedAt=1684277030198"),a("Facebook")]),d)])),l(S,v([u("https://www.instagram.com/catholicstoriesforchildren/"),l(_r,"aria-label","CSC Instagram Page"),$r("_blank")]),v([l(xr,v([A("w-10 h-10"),Ge("https://ik.imagekit.io/catholicstories/Instagram_Glyph_Gradient_kFoMs9jIr.png?updatedAt=1684277127293"),a("Instagram")]),d)]))])),l(t,d,v([L("Copyright © 2024 Catholic Stories for Children. All rights reserved.")])),l(t,d,v([L("Catholic Stories for Children is a 501(c)(3) non-profit recognized by the IRS. Contributions to Catholic Stories for Children are tax-deductible to the extent permitted by law.  Tax ID Number: 85-4194883")]))])),Sr=c("header"),jr=c("nav"),B=D(function(e,r,t,n){return l(S,v([u(r),A("flex items-center justify-center"),A("hover:scale-105 transition ease-in-out"),A("hover:border-b-4 hover:border-[#9101b3]"),A("rounded"),A("h-[60px] h-["+e+"]"),A("p-2"),l(_r,"aria-label",n),$r(t)]),v([L(n)]))}),Ar=l(S,v([u("/navigation"),A("space-y-2"),l(_r,"aria-label","menu")]),v([l(x,v([A("w-8 h-0.5 m-auto bg-gray-600")]),d),l(x,v([A("w-8 h-0.5 m-auto bg-gray-600")]),d),l(x,v([A("w-8 h-0.5 m-auto bg-gray-600")]),d)])),Tr=r(function(e,r){var e=e?{a:"text-[0px] md:text-xl",b:"invisible md:visible"}:{a:"text-lg md:text-xl",b:""},t=e.a,e=e.b;return l(S,v([l(P,"text-decoration","none"),A("colorDarkGray"),A(e),A("justify-self-start"),u("/")]),v([l(Cr,v([l(P,"font-family","hvdComicSerifPro"),l(P,"margin","0px"),A(t)]),v([L("Catholic Stories for Children")]))]))}),i=l(xr,v([Ge("/assets/logo_solid.svg"),l(P,"height","30px"),a(""),l(P,"vertical-align","middle")]),d),Er=l(S,v([l(P,"text-decoration","none"),A("colorDarkGray"),u("/"),l(_r,"aria-label","home")]),v([i])),M=r(function(e,r){var t="Catholic Stories for Children"===e?{a:"111px",b:Re,c:"grid-cols-[150px_1fr_150px] lg:grid-cols-[150px_1fr_600px]"}:{a:"60px",b:Re,c:"grid-cols-[150px_1fr_150px] lg:grid-cols-[150px_1fr_600px]"},n=t.a,i=t.b,t=t.c;return l(Sr,v([l(P,"background-color","#3d5d75"),l(P,"background-image","linear-gradient(130deg, #9DE2EB , #EBD6F1)"),A("h-[60px] md:h-["+n+"]"),A("colorDarkGray"),A("grid items-center justify-items-center"),A(t)]),v([Er,l(Tr,!0,e),i(n)]))}),Nr=l(x,d,v([l(M,"Contact",10),kr,pe])),o=(Ue={aF:{},aX:function(e){return function(e){return e}},aZ:function(e){return Nr}},Ie({aF:function(e){return{a:Ue.aF,b:pr}},aU:function(e){return yr},aX:r(function(e,r){return{a:l(Ue.aX,e,r),b:pr}}),aZ:Ue.aZ}));t={About:{TermsAndConditions:{Main:{init:o(X(0))(0)}}}},I.Elm?function e(r,t){for(var n in t)n in r?"init"==n?O(6):e(r[n],t[n]):r[n]=t[n]}(I.Elm,t):I.Elm=t}(this);