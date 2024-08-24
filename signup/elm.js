!function(R){"use strict";function r(r,n,t){return t.a=r,t.f=n,t}function n(t){return r(2,t,function(n){return function(r){return t(n,r)}})}function t(e){return r(3,e,function(t){return function(n){return function(r){return e(t,n,r)}}})}function q(i){return r(4,i,function(e){return function(t){return function(n){return function(r){return i(e,t,n,r)}}}})}function I(a){return r(5,a,function(i){return function(e){return function(t){return function(n){return function(r){return a(i,e,t,n,r)}}}}})}function l(r,n,t){return 2===r.a?r.f(n,t):r(n)(t)}function s(r,n,t,e){return 3===r.a?r.f(n,t,e):r(n)(t)(e)}function d(r,n,t,e,i){return 4===r.a?r.f(n,t,e,i):r(n)(t)(e)(i)}function P(r,n,t,e,i,a){return 5===r.a?r.f(n,t,e,i,a):r(n)(t)(e)(i)(a)}var v={$:0};function z(r,n){return{$:1,a:r,b:n}}var G=n(z);function b(r){for(var n=v,t=r.length;t--;)n={$:1,a:r[t],b:n};return n}var e=t(function(r,n,t){for(var e=Array(r),i=0;i<r;i++)e[i]=t(n+i);return e}),M=n(function(r,n){for(var t=Array(r),e=0;e<r&&n.b;e++)t[e]=n.a,n=n.b;return t.length=e,{a:t,b:n}});function O(r){throw Error("https://github.com/elm/core/blob/1.0.0/hints/"+r+".md")}function i(r,n,t){if("object"!=typeof r)return r===n?0:r<n?-1:1;if(void 0===r.$)return(t=(t=i(r.a,n.a))||i(r.b,n.b))||i(r.c,n.c);for(;r.b&&n.b&&!(t=i(r.a,n.a));r=r.b,n=n.b);return t||(r.b?1:n.b?-1:0)}var U=0;var J=Math.ceil,W=Math.floor,Y=Math.log;var Q=n(h);function h(r,n){switch(r.$){case 2:return r.b(n);case 5:return null===n?y(r.c):g("null",n);case 3:return X(n)?V(r.b,n,b):g("a LIST",n);case 4:return X(n)?V(r.b,n,H):g("an ARRAY",n);case 6:var t=r.d;return"object"==typeof n&&null!==n&&t in n?(a=h(r.b,n[t]),k(a)?a:$(l(Or,t,a.a))):g("an OBJECT with a field named `"+t+"`",n);case 7:t=r.e;return X(n)?t<n.length?(a=h(r.b,n[t]),k(a)?a:$(l(Ur,t,a.a))):g("a LONGER array. Need index "+t+" but only see "+n.length+" entries",n):g("an ARRAY",n);case 8:if("object"!=typeof n||null===n||X(n))return g("an OBJECT",n);var e,i=v;for(e in n)if(n.hasOwnProperty(e)){var a=h(r.b,n[e]);if(!k(a))return $(l(Or,e,a.a));i={$:1,a:{a:e,b:a.a},b:i}}return y(x(i));case 9:for(var o=r.f,u=r.g,f=0;f<u.length;f++){a=h(u[f],n);if(!k(a))return a;o=o(a.a)}return y(o);case 10:a=h(r.b,n);return k(a)?h(r.h(a.a),n):a;case 11:for(var c=v,s=r.g;s.b;s=s.b){a=h(s.a,n);if(k(a))return a;c={$:1,a:a.a,b:c}}return $(Jr(x(c)));case 1:return $(l(Mr,r.a,n));case 0:return y(r.a)}}function V(r,n,t){for(var e=n.length,i=Array(e),a=0;a<e;a++){var o=h(r,n[a]);if(!k(o))return $(l(Ur,a,o.a));i[a]=o.a}return y(t(i))}function X(r){return Array.isArray(r)||"undefined"!=typeof FileList&&r instanceof FileList}function H(n){return l(cn,n.length,function(r){return n[r]})}function g(r,n){return $(l(Mr,"Expecting "+r,n))}function f(r,n){if(r===n)return!0;if(r.$!==n.$)return!1;switch(r.$){case 0:case 1:return r.a===n.a;case 2:return r.b===n.b;case 5:return r.c===n.c;case 3:case 4:case 8:return f(r.b,n.b);case 6:return r.d===n.d&&f(r.b,n.b);case 7:return r.e===n.e&&f(r.b,n.b);case 9:return r.f===n.f&&K(r.g,n.g);case 10:return r.h===n.h&&f(r.b,n.b);case 11:return K(r.g,n.g)}}function K(r,n){var t=r.length;if(t!==n.length)return!1;for(var e=0;e<t;e++)if(!f(r[e],n[e]))return!1;return!0}function Z(r){return r}function rr(r){return{$:0,a:r}}var nr=n(function(r,n){return{$:3,b:r,d:n}});var tr=0;function er(r){r={$:0,e:tr++,f:r,g:null,h:[]};return fr(r),r}function ir(n){return{$:2,b:function(r){r({$:0,a:er(n)})},c:null}}function ar(r,n){r.h.push(n),fr(r)}var or=!1,ur=[];function fr(r){if(ur.push(r),!or){for(or=!0;r=ur.shift();)!function(n){for(;n.f;){var r=n.f.$;if(0===r||1===r){for(;n.g&&n.g.$!==r;)n.g=n.g.i;if(!n.g)return;n.f=n.g.b(n.f.a),n.g=n.g.i}else{if(2===r)return n.f.c=n.f.b(function(r){n.f=r,fr(n)});if(5===r){if(0===n.h.length)return;n.f=n.f.b(n.h.shift())}else n.g={$:3===r?0:1,b:n.f.b,i:n.g},n.f=n.f.d}}}(r);or=!1}}function cr(r,n,t,e,i,a){var r=l(Q,r,n?n.flags:void 0),o=(k(r)||O(2),{}),n=t(r.a),u=n.a,f=a(c,u),t=function(r,n){var t,e;for(e in m){var i=m[e];i.a&&((t=t||{})[e]=i.a(e,n)),r[e]=function(r,n){var e={g:n,h:void 0},i=r.c,a=r.d,o=r.e,u=r.f;function f(t){return l(nr,f,{$:5,b:function(r){var n=r.a;return 0===r.$?s(a,e,n,t):o&&u?d(i,e,n.i,n.j,t):s(i,e,o?n.i:n.j,t)}})}return e.h=er(l(nr,f,r.b))}(i,n)}return t}(o,c);function c(r,n){r=l(e,r,u);f(u=r.a,n),hr(o,r.b,i(u))}return hr(o,n.b,i(u)),t?{ports:t}:{}}var m={};var sr=n(function(n,t){return{$:2,b:function(r){n.g(t),r({$:0,a:U})},c:null}});function lr(n){return function(r){return{$:1,k:n,l:r}}}function dr(r){return{$:2,m:r}}var vr=[],br=!1;function hr(r,n,t){if(vr.push({p:r,q:n,r:t}),!br){br=!0;for(var e;e=vr.shift();)!function(r,n,t){var e,i={};for(e in gr(!0,n,i,null),gr(!1,t,i,null),r)ar(r[e],{$:"fx",a:i[e]||{i:v,j:v}})}(e.p,e.q,e.r);br=!1}}function gr(r,n,t,e){switch(n.$){case 1:var i=n.k,a=function(r,n,t,e){function i(r){for(var n=t;n;n=n.t)r=n.s(r);return r}return l(r?m[n].e:m[n].f,i,e)}(r,i,e,n.l);return void(t[i]=function(r,n,t){return t=t||{i:v,j:v},r?t.i={$:1,a:n,b:t.i}:t.j={$:1,a:n,b:t.j},t}(r,a,t[i]));case 2:for(var o=n.m;o.b;o=o.b)gr(r,o.a,t,e);return;case 3:gr(r,n.o,t,{s:n.n,t:e})}}var mr;var pr="undefined"!=typeof document?document:{};function $r(r){return{$:0,a:r}}var c=n(function(a,o){return n(function(r,n){for(var t=[],e=0;n.b;n=n.b){var i=n.a;e+=i.b||0,t.push(i)}return e+=t.length,{$:1,c:o,d:_r(r),e:t,f:a,b:e}})})(void 0);n(function(a,o){return n(function(r,n){for(var t=[],e=0;n.b;n=n.b){var i=n.a;e+=i.b.b||0,t.push(i)}return e+=t.length,{$:2,c:o,d:_r(r),e:t,f:a,b:e}})})(void 0);var yr=n(function(r,n){return{$:"a1",n:r,o:n}}),xr=n(function(r,n){return{$:"a2",n:r,o:n}}),kr=n(function(r,n){return{$:"a3",n:r,o:n}});function wr(r){return/^\s*(javascript:|data:text\/html)/i.test(r)?"":r}var Cr;function _r(r){for(var n={};r.b;r=r.b){var t,e=r.a,i=e.$,a=e.n,e=e.o;"a2"===i?"className"===a?jr(n,a,e):n[a]=e:(t=n[i]||(n[i]={}),"a3"===i&&"class"===a?jr(t,a,e):t[a]=e)}return n}function jr(r,n,t){var e=r[n];r[n]=e?e+" "+t:t}function p(r,n){var t=r.$;if(5===t)return p(r.k||(r.k=r.m()),n);if(0===t)return pr.createTextNode(r.a);if(4===t){for(var e=r.k,i=r.j;4===e.$;)"object"!=typeof i?i=[i,e.j]:i.push(e.j),e=e.k;var a={j:i,p:n};(o=p(e,a)).elm_event_node_ref=a}else if(3===t)Ar(o=r.h(r.g),n,r.d);else{var o=r.f?pr.createElementNS(r.f,r.c):pr.createElement(r.c);mr&&"a"==r.c&&o.addEventListener("click",mr(o)),Ar(o,n,r.d);for(var u=r.e,f=0;f<u.length;f++)o.appendChild(p(1===t?u[f]:u[f].b,n))}return o}function Ar(r,n,t){for(var e in t){var i=t[e];"a1"===e?function(r,n){var t,e=r.style;for(t in n)e[t]=n[t]}(r,i):"a0"===e?function(r,n,t){var e,i=r.elmFs||(r.elmFs={});for(e in t){var a=t[e],o=i[e];if(a){if(o){if(o.q.$===a.$){o.q=a;continue}r.removeEventListener(e,o)}o=function(f,r){function c(r){var n=c.q,t=h(n.a,r);if(k(t)){for(var e,n=sn(n),t=t.a,i=n?n<3?t.a:t.t:t,a=1==n?t.b:3==n&&t.T,o=(a&&r.stopPropagation(),(2==n?t.b:3==n&&t.Q)&&r.preventDefault(),f);e=o.j;){if("function"==typeof e)i=e(i);else for(var u=e.length;u--;)i=e[u](i);o=o.p}o(i,a)}}return c.q=r,c}(n,a),r.addEventListener(e,o,Cr&&{passive:sn(a)<2}),i[e]=o}else r.removeEventListener(e,o),i[e]=void 0}}(r,n,i):"a3"===e?function(r,n){for(var t in n){var e=n[t];void 0!==e?r.setAttribute(t,e):r.removeAttribute(t)}}(r,i):"a4"===e?function(r,n){for(var t in n){var e=n[t],i=e.f,e=e.o;void 0!==e?r.setAttributeNS(i,t,e):r.removeAttributeNS(i,t)}}(r,i):("value"!==e&&"checked"!==e||r[e]!==i)&&(r[e]=i)}}try{window.addEventListener("t",null,Object.defineProperty({},"passive",{get:function(){Cr=!0}}))}catch(r){}function Er(r,n){var t=[];return N(r,n,t,0),t}function F(r,n,t,e){n={$:n,r:t,s:e,t:void 0,u:void 0};return r.push(n),n}function N(r,n,t,e){if(r!==n){var i=r.$,a=n.$;if(i!==a){if(1!==i||2!==a)return void F(t,0,e,n);n=function(r){for(var n=r.e,t=n.length,e=Array(t),i=0;i<t;i++)e[i]=n[i].b;return{$:1,c:r.c,d:r.d,e:e,f:r.f,b:r.b}}(n),a=1}switch(a){case 5:for(var o=r.l,u=n.l,f=o.length,c=f===u.length;c&&f--;)c=o[f]===u[f];if(c)return void(n.k=r.k);n.k=n.m();var s=[];return N(r.k,n.k,s,0),void(0<s.length&&F(t,1,e,s));case 4:for(var l=r.j,d=n.j,v=!1,b=r.k;4===b.$;)v=!0,"object"!=typeof l?l=[l,b.j]:l.push(b.j),b=b.k;for(var h=n.k;4===h.$;)v=!0,"object"!=typeof d?d=[d,h.j]:d.push(h.j),h=h.k;return v&&l.length!==d.length?void F(t,0,e,n):((v?function(r,n){for(var t=0;t<r.length;t++)if(r[t]!==n[t])return;return 1}(l,d):l===d)||F(t,2,e,d),void N(b,h,t,e+1));case 0:return void(r.a!==n.a&&F(t,3,e,n.a));case 1:return void Fr(r,n,t,e,Sr);case 2:return void Fr(r,n,t,e,Br);case 3:if(r.h!==n.h)return void F(t,0,e,n);s=Nr(r.d,n.d),s=(s&&F(t,4,e,s),n.i(r.g,n.g));s&&F(t,5,e,s)}}}function Fr(r,n,t,e,i){var a;r.c!==n.c||r.f!==n.f?F(t,0,e,n):((a=Nr(r.d,n.d))&&F(t,4,e,a),i(r,n,t,e))}function Nr(r,n,t){var e,i,a,o,u;for(i in r)"a1"===i||"a0"===i||"a3"===i||"a4"===i?(a=Nr(r[i],n[i]||{},i))&&((e=e||{})[i]=a):i in n?(a=r[i])===(o=n[i])&&"value"!==i&&"checked"!==i||"a0"===t&&function(r,n){return r.$==n.$&&f(r.a,n.a)}(a,o)||((e=e||{})[i]=o):(e=e||{})[i]=t?"a1"===t?"":"a0"===t||"a3"===t?void 0:{f:r[i].f,o:void 0}:"string"==typeof r[i]?"":null;for(u in n)u in r||((e=e||{})[u]=n[u]);return e}function Sr(r,n,t,e){var i=r.e,a=n.e,r=i.length,n=a.length;n<r?F(t,6,e,{v:n,i:r-n}):r<n&&F(t,7,e,{v:r,e:a});for(var o=r<n?r:n,u=0;u<o;u++){var f=i[u];N(f,a[u],t,++e),e+=f.b||0}}function Br(r,n,t,e){for(var i=[],a={},o=[],u=r.e,f=n.e,c=u.length,s=f.length,l=0,d=0,v=e;l<c&&d<s;){var b=u[l],h=f[d],g=b.a,m=h.a,p=b.b,$=h.b,y=void 0,x=void 0;if(g===m)N(p,$,i,++v),v+=p.b||0,l++,d++;else{var k,w,C,_,j=u[l+1],A=f[d+1];if(j&&(w=j.b,x=m===(k=j.a)),A&&(_=A.b,y=g===(C=A.a)),y&&x)N(p,_,i,++v),S(a,i,g,$,d,o),v+=p.b||0,B(a,i,g,w,++v),v+=w.b||0,l+=2,d+=2;else if(y)v++,S(a,i,m,$,d,o),N(p,_,i,v),v+=p.b||0,l+=1,d+=2;else if(x)B(a,i,g,p,++v),v+=p.b||0,N(w,$,i,++v),v+=w.b||0,l+=2,d+=1;else{if(!j||k!==C)break;B(a,i,g,p,++v),S(a,i,m,$,d,o),v+=p.b||0,N(w,_,i,++v),v+=w.b||0,l+=2,d+=2}}}for(;l<c;){p=(b=u[l]).b;B(a,i,b.a,p,++v),v+=p.b||0,l++}for(;d<s;){var E=E||[];S(a,i,(h=f[d]).a,h.b,void 0,E),d++}(0<i.length||0<o.length||E)&&F(t,8,e,{w:i,x:o,y:E})}var Tr="_elmW6BL";function S(r,n,t,e,i,a){var o,u=r[t];u?1===u.c?(a.push({r:i,A:u}),u.c=2,N(u.z,e,o=[],u.r),u.r=i,u.s.s={w:o,A:u}):S(r,n,t+Tr,e,i,a):(a.push({r:i,A:u={c:0,z:e,r:i,s:void 0}}),r[t]=u)}function B(r,n,t,e,i){var a,o=r[t];o?0===o.c?(o.c=2,N(e,o.z,a=[],i),F(n,9,i,{w:a,A:o})):B(r,n,t+Tr,e,i):(a=F(n,9,i,void 0),r[t]={c:1,z:e,r:i,s:a})}function Lr(r,n,t,e){!function r(n,t,e,i,a,o,u){var f=e[i];var c=f.r;for(;c===a;){var s,l=f.$;if(1===l?Lr(n,t.k,f.s,u):8===l?(f.t=n,f.u=u,0<(s=f.s.w).length&&r(n,t,s,0,a,o,u)):9===l?(f.t=n,f.u=u,(l=f.s)&&(l.A.s=n,0<(s=l.w).length)&&r(n,t,s,0,a,o,u)):(f.t=n,f.u=u),!(f=e[++i])||(c=f.r)>o)return i}var d=t.$;if(4===d){for(var v=t.k;4===v.$;)v=v.k;return r(n,v,e,i,a+1,o,n.elm_event_node_ref)}var b=t.e;var h=n.childNodes;for(var g=0;g<b.length;g++){var m=1===d?b[g]:b[g].b,p=++a+(m.b||0);if(a<=c&&c<=p&&(i=r(h[g],m,e,i,a,p,u),!(f=e[i])||(c=f.r)>o))return i;a=p}return i}(r,n,t,0,0,n.b,e)}function Dr(r,n,t,e){return 0===t.length?r:(Lr(r,n,t,e),Rr(r,t))}function Rr(r,n){for(var t=0;t<n.length;t++){var e=n[t],i=e.t,e=function(r,n){switch(n.$){case 0:return function(r,n,t){var e=r.parentNode,n=p(n,t);n.elm_event_node_ref||(n.elm_event_node_ref=r.elm_event_node_ref);e&&n!==r&&e.replaceChild(n,r);return n}(r,n.s,n.u);case 4:return Ar(r,n.u,n.s),r;case 3:return r.replaceData(0,r.length,n.s),r;case 1:return Rr(r,n.s);case 2:return r.elm_event_node_ref?r.elm_event_node_ref.j=n.s:r.elm_event_node_ref={j:n.s,p:n.u},r;case 6:for(var t=n.s,e=0;e<t.i;e++)r.removeChild(r.childNodes[t.v]);return r;case 7:for(var i=(t=n.s).e,e=t.v,a=r.childNodes[e];e<i.length;e++)r.insertBefore(p(i[e],n.u),a);return r;case 9:var o;return(t=n.s)?(void 0!==(o=t.A).r&&r.parentNode.removeChild(r),o.s=Rr(r,t.w)):r.parentNode.removeChild(r),r;case 8:return function(r,n){for(var t=n.s,e=function(r,n){if(r){for(var t=pr.createDocumentFragment(),e=0;e<r.length;e++){var i=r[e].A;t.appendChild(2===i.c?i.s:p(i.z,n.u))}return t}}(t.y,n),i=(r=Rr(r,t.w),t.x),a=0;a<i.length;a++){var o=i[a],u=o.A,u=2===u.c?u.s:p(u.z,n.u);r.insertBefore(u,r.childNodes[o.r])}e&&r.appendChild(e);return r}(r,n);case 5:return n.s(r);default:O(10)}}(i,e);i===r&&(r=e)}return r}function qr(r){if(3===r.nodeType)return{$:0,a:r.textContent};if(1!==r.nodeType)return{$:0,a:""};for(var n=v,t=r.attributes,e=t.length;e--;)var i=t[e],n={$:1,a:l(kr,i.name,i.value),b:n};for(var a=r.tagName.toLowerCase(),o=v,u=r.childNodes,e=u.length;e--;)o={$:1,a:qr(u[e]),b:o};return s(c,a,n,o)}var Ir=q(function(n,r,t,o){return cr(r,o,n.aN,n.a2,n.a$,function(t,r){var e=n.a4,i=o.node,a=qr(i);return zr(r,function(r){var r=e(r),n=Er(a,r);i=Dr(i,a,n,t),a=r})})}),Pr="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:function(r){return setTimeout(r,1e3/60)};function zr(t,e){e(t);var i=0;function a(){i=1===i?0:(Pr(a),e(t),1)}return function(r,n){t=r,n?(e(t),2===i&&(i=1)):(0===i&&Pr(a),i=2)}}function a(r){return l(_,"href",/^javascript:/i.test((r=r).replace(/\s/g,""))?"":r)}function Gr(r){return l(_,"src",wr(r))}var o=G,$=function(r){return{$:1,a:r}},Mr=n(function(r,n){return{$:3,a:r,b:n}}),Or=n(function(r,n){return{$:0,a:r,b:n}}),Ur=n(function(r,n){return{$:1,a:r,b:n}}),y=function(r){return{$:0,a:r}},Jr=function(r){return{$:2,a:r}},G=function(r){return r+""},Wr=t(function(r,n,t){for(;;){if(!t.b)return n;var e=t.b,i=r,a=l(r,t.a,n);r=i,n=a,t=e}}),x=function(r){return s(Wr,o,v,r)},Yr=q(function(r,n,t,e){return{$:0,a:r,b:n,c:t,d:e}}),Qr=[],Vr=J,Xr=n(function(r,n){return Y(n)/Y(r)}),Hr=Vr(l(Xr,2,32)),Kr=d(Yr,0,Hr,Qr,Qr),Zr=e,rn=W,nn=function(r){return r.length},tn=n(function(r,n){return 0<i(r,n)?r:n}),en=M,an=n(function(r,n){for(;;){var t=l(en,32,r),e=t.b,t=l(o,{$:0,a:t.a},n);if(!e.b)return x(t);r=e,n=t}}),on=n(function(r,n){for(;;){var t=Vr(n/32);if(1===t)return l(en,32,r).a;r=l(an,r,v),n=t}}),un=n(function(r,n){var t,e;return n.a?(e=rn(l(Xr,32,(t=32*n.a)-1)),r=r?x(n.d):n.d,r=l(on,r,n.a),d(Yr,nn(n.c)+t,l(tn,5,e*Hr),r,n.c)):d(Yr,nn(n.c),Hr,Qr,n.c)}),fn=I(function(r,n,t,e,i){for(;;){if(n<0)return l(un,!1,{d:e,a:t/32|0,c:i});var a={$:1,a:s(Zr,32,n,r)};r=r,n=n-32,t=t,e=l(o,a,e),i=i}}),cn=n(function(r,n){var t;return 0<r?P(fn,n,r-(t=r%32)-32,r,v,s(Zr,t,r-t,n)):Kr}),k=function(r){return!r.$},J=function(r){return{$:0,a:r}},sn=function(r){switch(r.$){case 0:return 0;case 1:return 1;case 2:return 2;default:return 3}},u=rr,e=u(0),ln=q(function(r,n,t,e){var i,a,o,u;return e.b?(i=e.a,(e=e.b).b?(a=e.a,(e=e.b).b?(o=e.a,(e=e.b).b?(u=e.b,l(r,i,l(r,a,l(r,o,l(r,e.a,500<t?s(Wr,r,n,x(u)):d(ln,r,n,t+1,u)))))):l(r,i,l(r,a,l(r,o,n)))):l(r,i,l(r,a,n))):l(r,i,n)):n}),dn=t(function(r,n,t){return d(ln,r,n,0,t)}),vn=n(function(t,r){return s(dn,n(function(r,n){return l(o,t(r),n)}),v,r)}),bn=nr,hn=n(function(n,r){return l(bn,function(r){return u(n(r))},r)}),gn=t(function(t,r,e){return l(bn,function(n){return l(bn,function(r){return u(l(t,n,r))},e)},r)}),mn=sr,pn=n(function(r,n){return ir(l(bn,mn(r),n))}),W=t(function(r,n,t){return l(hn,function(r){return 0},(r=l(vn,pn(r),n),s(dn,gn(o),u(v),r)))}),M=(m.Task={b:e,c:W,d:t(function(r,n,t){return u(0)}),e:n(function(r,n){return l(hn,r,n)}),f:void 0},lr("Task"),Ir),$n=dr(v),yn=dr(v),sr=n(function(r,n){return{a:n,b:$n}}),w=c("div"),C=yr,xn=Z,_=n(function(r,n){return l(xr,r,xn(n))}),j=_("className"),kn=c("h2"),wn=c("li"),A=c("p"),E=c("span"),T=$r,Cn=c("ul"),L=c("a"),_n=_("alt"),jn=n(function(r,n){return l(kr,function(r){return/^(on|formAction$)/i.test(r)?"data-"+r:r}(r),wr(n))}),An=c("img"),En=_("target"),e=I(function(r,n,t,e,i){return l(w,b([j("flex align-center")]),b([l(L,b([a(r),l(jn,"aria-label",n),En("_blank"),j("mb-5")]),b([l(An,b([j("w-5 h-5 inline-block"),Gr(t),_n(e)]),v),l(E,b([j("ml-3")]),b([T(i)]))]))]))}),W=P(e,"https://www.facebook.com/catholicstoriesforchildren","CSC Facebook Page","https://ik.imagekit.io/catholicstories/f_logo_RGB-Blue_250_3vs-yhXer.png?updatedAt=1684277030198","Facebook","Facebook"),Ir=c("footer"),yr=c("h3"),e=P(e,"https://www.instagram.com/catholicstoriesforchildren/","CSC Instagram Page","https://ik.imagekit.io/catholicstories/Instagram_Glyph_Gradient_kFoMs9jIr.png?updatedAt=1684277127293","Instagram","Instagram"),D=c("iframe"),D=l(w,b([j("mb-5")]),b([l(A,b([j("pb-2 pl-1 text-left")]),b([T("Receive free animations, activities, resources, and more!")])),l(D,b([Gr("https://embeds.beehiiv.com/d8e1c428-bdfc-437f-a685-0148bd0cf084?slim=true"),l(kr,"height",G(52)),l(jn,"frameborder","0"),l(jn,"scrolling","no"),l(C,"margin","0"),l(C,"border-radius","0px !important"),l(C,"background-color","transparent")]),v)])),Fn=l(Ir,b([l(C,"padding",G(30)+"px")]),b([l(w,b([j("text-center mb-5")]),b([l(w,v,b([l(w,v,b([l(kn,b([j("mb-7")]),b([T("Access Free Animations")]))])),l(w,b([j("text-center grid justify-center mb-10")]),b([D]))])),l(w,b([j("md:grid md:grid-cols-3 md:justify-items-center")]),b([l(w,b([j("text-left")]),b([l(w,v,b([l(yr,b([j("font-bold text-lg")]),b([T("About Us")]))])),l(w,b([j("mb-3")]),b([T("Catholic Stories for Children is a nonprofit aimed at telling short stories, primarily through animation, to help parents teach Catholic prayers, about Catholic saints, and other Catholic concepts.")]))])),l(w,b([j("md:mx-5")]),b([l(An,b([j("rounded max-w-[16rem]"),Gr("/assets/FullTitle_900x900_NoBackground.png")]),v)])),l(w,b([j("text-left")]),b([l(w,v,b([l(yr,b([j("font-bold text-lg mb-3")]),b([T("Follow Us")]))])),l(w,v,b([e,W]))]))]))])),l(w,b([j("text-xs")]),b([l(A,v,b([T("Copyright © 2024 Catholic Stories for Children. All rights reserved.")])),l(A,v,b([T("Catholic Stories for Children is a 501(c)(3) non-profit recognized by the IRS. Contributions to Catholic Stories for Children are tax-deductible to the extent permitted by law.  Tax ID Number: 85-4194883")])),l(A,v,b([l(L,b([a("/about/privacy-policy"),j("underline")]),b([T("Privacy Policy")])),l(E,v,b([T(" | ")])),l(L,b([a("/about/terms-and-conditions"),j("underline")]),b([T("Terms & Conditions")]))]))]))])),Nn=c("header"),Sn=c("h1"),Bn=n(function(r,n){var r=r?{a:"text-[0px] md:text-xl",b:"invisible md:visible"}:{a:"text-lg md:text-xl",b:""},t=r.a,r=r.b;return l(L,b([l(C,"text-decoration","none"),j("colorDarkGray"),j(r),j("justify-self-start"),a("/")]),b([l(Sn,b([l(C,"font-family","hvdComicSerifPro"),l(C,"margin","0px"),j(t)]),b([T("Catholic Stories for Children")]))]))}),Ir=l(An,b([Gr("/assets/logo_solid.svg"),l(C,"height","30px"),_n(""),l(C,"vertical-align","middle")]),v),Tn=l(L,b([l(C,"text-decoration","none"),j("colorDarkGray"),a("/"),l(jn,"aria-label","home")]),b([Ir])),Ln=n(function(r,n){var t={a:"60px",b:"grid-cols-[150px_1fr]"},e=t.a,t=t.b;return l(Nn,b([l(C,"background-color","#3d5d75"),l(C,"background-image","linear-gradient(130deg, #9DE2EB , #EBD6F1)"),j("h-[60px] md:h-["+e+"]"),j("colorDarkGray"),j("grid items-center justify-items-center"),j(t)]),b([Tn,l(Bn,!1,r)]))}),G=M({aN:function(r){return{a:{},b:$n}},a$:function(r){return yn},a2:sr,a4:function(r){return l(w,b([l(C,"height","100vh"),l(C,"overflow-x","hidden"),l(C,"overflow-y","auto"),l(C,"perspective","300px"),l(C,"scroll-behavior","smooth"),l(C,"background-color","#FEF7F4"),l(C,"position","relative"),l(C,"min-height","700px")]),b([l(Ln,"Sign Up",10),l(w,b([j("max-w-lg"),j("m-auto"),j("p-5"),j("mb-10")]),b([l(w,b([j("text-lg")]),b([l(kn,b([j("mb-10")]),b([T("Unlock a World of Faith and Fun!")])),l(A,b([j("mb-5")]),b([T("At Catholic Stories for Children, we're dedicated to making Catholic teachings engaging and accessible for families. By signing up for our newsletter, you'll receive: ")])),l(Cn,b([j("list-disc pl-5 mb-10")]),b([l(wn,b([j("mb-3")]),b([l(E,b([j("font-bold")]),b([T("Free Animations: ")])),l(E,v,b([T(" Bring Catholic prayers, saints, and stories to life with our vibrant animations.")]))])),l(wn,b([j("mb-3")]),b([l(E,b([j("font-bold")]),b([T("Exciting Activities: ")])),l(E,v,b([T("Engage your children with fun, faith-filled activities that reinforce what they learn.")]))])),l(wn,b([j("mb-3")]),b([l(E,b([j("font-bold")]),b([T("Valuable Resources: ")])),l(E,v,b([T("Access a treasure trove of tools and tips to support your family's spiritual journey.")]))])),l(wn,b([j("mb-3")]),b([l(E,b([j("font-bold")]),b([T("Exclusive Updates: ")])),l(E,v,b([T("Be the first to know about our latest projects, events, and special offers.")]))]))])),l(A,v,b([T("Join our community of like-minded families and enrich your children's faith experience. Sign up today and start exploring the wonderful world of Catholic stories and teachings!")]))]))])),Fn]))}});D={Signup:{Main:{init:G(J(0))(0)}}},R.Elm?function r(n,t){for(var e in t)e in n?"init"==e?O(6):r(n[e],t[e]):n[e]=t[e]}(R.Elm,D):R.Elm=D}(this);