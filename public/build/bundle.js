var app=function(){"use strict";function t(){}const e=t=>t;function n(t){return t()}function o(){return Object.create(null)}function r(t){t.forEach(n)}function c(t){return"function"==typeof t}function l(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function s(e,n,o){e.$$.on_destroy.push(function(e,...n){if(null==e)return t;const o=e.subscribe(...n);return o.unsubscribe?()=>o.unsubscribe():o}(n,o))}function i(t){return null==t?"":t}const u="undefined"!=typeof window;let a=u?()=>window.performance.now():()=>Date.now(),d=u?t=>requestAnimationFrame(t):t;const f=new Set;function p(t){f.forEach((e=>{e.c(t)||(f.delete(e),e.f())})),0!==f.size&&d(p)}function h(t,e){t.appendChild(e)}function m(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function g(t){const e=y("style");return function(t,e){h(t.head||t,e)}(m(t),e),e}function $(t,e,n){t.insertBefore(e,n||null)}function b(t){t.parentNode.removeChild(t)}function v(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function y(t){return document.createElement(t)}function x(t){return document.createTextNode(t)}function _(){return x(" ")}function w(){return x("")}function k(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function E(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function C(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}const D=new Set;let M,T=0;function F(t,e,n,o,r,c,l,s=0){const i=16.666/o;let u="{\n";for(let t=0;t<=1;t+=i){const o=e+(n-e)*c(t);u+=100*t+`%{${l(o,1-o)}}\n`}const a=u+`100% {${l(n,1-n)}}\n}`,d=`__svelte_${function(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}(a)}_${s}`,f=m(t);D.add(f);const p=f.__svelte_stylesheet||(f.__svelte_stylesheet=g(t).sheet),h=f.__svelte_rules||(f.__svelte_rules={});h[d]||(h[d]=!0,p.insertRule(`@keyframes ${d} ${a}`,p.cssRules.length));const $=t.style.animation||"";return t.style.animation=`${$?`${$}, `:""}${d} ${o}ms linear ${r}ms 1 both`,T+=1,d}function A(t,e){const n=(t.style.animation||"").split(", "),o=n.filter(e?t=>t.indexOf(e)<0:t=>-1===t.indexOf("__svelte")),r=n.length-o.length;r&&(t.style.animation=o.join(", "),T-=r,T||d((()=>{T||(D.forEach((t=>{const e=t.__svelte_stylesheet;let n=e.cssRules.length;for(;n--;)e.deleteRule(n);t.__svelte_rules={}})),D.clear())})))}function N(t){M=t}function j(){if(!M)throw new Error("Function called outside component initialization");return M}const B=[],L=[],S=[],z=[],O=Promise.resolve();let R=!1;function H(t){S.push(t)}let P=!1;const q=new Set;function G(){if(!P){P=!0;do{for(let t=0;t<B.length;t+=1){const e=B[t];N(e),U(e.$$)}for(N(null),B.length=0;L.length;)L.pop()();for(let t=0;t<S.length;t+=1){const e=S[t];q.has(e)||(q.add(e),e())}S.length=0}while(B.length);for(;z.length;)z.pop()();R=!1,P=!1,q.clear()}}function U(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(H)}}let W;function I(t,e,n){t.dispatchEvent(function(t,e,n=!1){const o=document.createEvent("CustomEvent");return o.initCustomEvent(t,n,!1,e),o}(`${e?"intro":"outro"}${n}`))}const K=new Set;let V;function J(){V={r:0,c:[],p:V}}function Q(){V.r||r(V.c),V=V.p}function X(t,e){t&&t.i&&(K.delete(t),t.i(e))}function Y(t,e,n,o){if(t&&t.o){if(K.has(t))return;K.add(t),V.c.push((()=>{K.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}}const Z={duration:0};function tt(n,o,l,s){let i=o(n,l),u=s?0:1,h=null,m=null,g=null;function $(){g&&A(n,g)}function b(t,e){const n=t.b-u;return e*=Math.abs(n),{a:u,b:t.b,d:n,duration:e,start:t.start,end:t.start+e,group:t.group}}function v(o){const{delay:c=0,duration:l=300,easing:s=e,tick:v=t,css:y}=i||Z,x={start:a()+c,b:o};o||(x.group=V,V.r+=1),h||m?m=x:(y&&($(),g=F(n,u,o,l,c,s,y)),o&&v(0,1),h=b(x,l),H((()=>I(n,o,"start"))),function(t){let e;0===f.size&&d(p),new Promise((n=>{f.add(e={c:t,f:n})}))}((t=>{if(m&&t>m.start&&(h=b(m,l),m=null,I(n,h.b,"start"),y&&($(),g=F(n,u,h.b,h.duration,0,s,i.css))),h)if(t>=h.end)v(u=h.b,1-u),I(n,h.b,"end"),m||(h.b?$():--h.group.r||r(h.group.c)),h=null;else if(t>=h.start){const e=t-h.start;u=h.a+h.d*s(e/h.duration),v(u,1-u)}return!(!h&&!m)})))}return{run(t){c(i)?(W||(W=Promise.resolve(),W.then((()=>{W=null}))),W).then((()=>{i=i(),v(t)})):v(t)},end(){$(),h=m=null}}}function et(t,e){const n=e.token={};function o(t,o,r,c){if(e.token!==n)return;e.resolved=c;let l=e.ctx;void 0!==r&&(l=l.slice(),l[r]=c);const s=t&&(e.current=t)(l);let i=!1;e.block&&(e.blocks?e.blocks.forEach(((t,n)=>{n!==o&&t&&(J(),Y(t,1,1,(()=>{e.blocks[n]===t&&(e.blocks[n]=null)})),Q())})):e.block.d(1),s.c(),X(s,1),s.m(e.mount(),e.anchor),i=!0),e.block=s,e.blocks&&(e.blocks[o]=s),i&&G()}if((r=t)&&"object"==typeof r&&"function"==typeof r.then){const n=j();if(t.then((t=>{N(n),o(e.then,1,e.value,t),N(null)}),(t=>{if(N(n),o(e.catch,2,e.error,t),N(null),!e.hasCatch)throw t})),e.current!==e.pending)return o(e.pending,0),!0}else{if(e.current!==e.then)return o(e.then,1,e.value,t),!0;e.resolved=t}var r}function nt(t){t&&t.c()}function ot(t,e,o,l){const{fragment:s,on_mount:i,on_destroy:u,after_update:a}=t.$$;s&&s.m(e,o),l||H((()=>{const e=i.map(n).filter(c);u?u.push(...e):r(e),t.$$.on_mount=[]})),a.forEach(H)}function rt(t,e){const n=t.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function ct(t,e){-1===t.$$.dirty[0]&&(B.push(t),R||(R=!0,O.then(G)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function lt(e,n,c,l,s,i,u,a=[-1]){const d=M;N(e);const f=e.$$={fragment:null,ctx:null,props:i,update:t,not_equal:s,bound:o(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(d?d.$$.context:[])),callbacks:o(),dirty:a,skip_bound:!1,root:n.target||d.$$.root};u&&u(f.root);let p=!1;if(f.ctx=c?c(e,n.props||{},((t,n,...o)=>{const r=o.length?o[0]:n;return f.ctx&&s(f.ctx[t],f.ctx[t]=r)&&(!f.skip_bound&&f.bound[t]&&f.bound[t](r),p&&ct(e,t)),n})):[],f.update(),p=!0,r(f.before_update),f.fragment=!!l&&l(f.ctx),n.target){if(n.hydrate){const t=function(t){return Array.from(t.childNodes)}(n.target);f.fragment&&f.fragment.l(t),t.forEach(b)}else f.fragment&&f.fragment.c();n.intro&&X(e.$$.fragment),ot(e,n.target,n.anchor,n.customElement),G()}N(d)}class st{$destroy(){rt(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function it(t){const e=t-1;return e*e*e+1}function ut(t,{delay:e=0,duration:n=400,easing:o=it}={}){const r=getComputedStyle(t),c=+r.opacity,l=parseFloat(r.height),s=parseFloat(r.paddingTop),i=parseFloat(r.paddingBottom),u=parseFloat(r.marginTop),a=parseFloat(r.marginBottom),d=parseFloat(r.borderTopWidth),f=parseFloat(r.borderBottomWidth);return{delay:e,duration:n,easing:o,css:t=>`overflow: hidden;opacity: ${Math.min(20*t,1)*c};height: ${t*l}px;padding-top: ${t*s}px;padding-bottom: ${t*i}px;margin-top: ${t*u}px;margin-bottom: ${t*a}px;border-top-width: ${t*d}px;border-bottom-width: ${t*f}px;`}}function at(t){let e;return{c(){e=y("i"),E(e,"class","disorder svelte-1t0ymw3"),E(e,"title","This gender is a mental disorder")},m(t,n){$(t,e,n)},d(t){t&&b(e)}}}function dt(t){let e,n,o,r,c,l,s=t[0].description+"",i=t[0].mentalDisorder&&ft();return{c(){e=y("div"),n=y("p"),o=x(s),r=_(),i&&i.c(),E(e,"class","details")},m(t,c){$(t,e,c),h(e,n),h(n,o),h(e,r),i&&i.m(e,null),l=!0},p(t,n){(!l||1&n)&&s!==(s=t[0].description+"")&&C(o,s),t[0].mentalDisorder?i||(i=ft(),i.c(),i.m(e,null)):i&&(i.d(1),i=null)},i(t){l||(H((()=>{c||(c=tt(e,ut,{},!0)),c.run(1)})),l=!0)},o(t){c||(c=tt(e,ut,{},!1)),c.run(0),l=!1},d(t){t&&b(e),i&&i.d(),t&&c&&c.end()}}}function ft(t){let e;return{c(){e=y("p"),e.innerHTML='<i class="disorder svelte-1t0ymw3" title="This gender is a mental disorder"></i> This gender is a mental disorder',E(e,"class","disorder-note svelte-1t0ymw3")},m(t,n){$(t,e,n)},d(t){t&&b(e)}}}function pt(t){let e,n,o,r,c,l,s,u,a,d=t[0].name+"",f=t[0].mentalDisorder&&at(),p=t[1]&&dt(t);return{c(){e=y("article"),n=y("h2"),o=x(d),r=_(),f&&f.c(),c=_(),p&&p.c(),E(n,"class","svelte-1t0ymw3"),E(e,"class",l=i("gender-card "+(t[1]?"opened":""))+" svelte-1t0ymw3")},m(l,i){$(l,e,i),h(e,n),h(n,o),h(n,r),f&&f.m(n,null),h(e,c),p&&p.m(e,null),s=!0,u||(a=k(n,"click",t[2]),u=!0)},p(t,[r]){(!s||1&r)&&d!==(d=t[0].name+"")&&C(o,d),t[0].mentalDisorder?f||(f=at(),f.c(),f.m(n,null)):f&&(f.d(1),f=null),t[1]?p?(p.p(t,r),2&r&&X(p,1)):(p=dt(t),p.c(),X(p,1),p.m(e,null)):p&&(J(),Y(p,1,1,(()=>{p=null})),Q()),(!s||2&r&&l!==(l=i("gender-card "+(t[1]?"opened":""))+" svelte-1t0ymw3"))&&E(e,"class",l)},i(t){s||(X(p),s=!0)},o(t){Y(p),s=!1},d(t){t&&b(e),f&&f.d(),p&&p.d(),u=!1,a()}}}function ht(t,e,n){let{gender:o}=e,r=!1;return t.$$set=t=>{"gender"in t&&n(0,o=t.gender)},[o,r,()=>n(1,r=!r)]}class mt extends st{constructor(t){super(),lt(this,t,ht,pt,l,{gender:0})}}const gt=[];const $t=function(e,n=t){let o;const r=new Set;function c(t){if(l(e,t)&&(e=t,o)){const t=!gt.length;for(const t of r)t[1](),gt.push(t,e);if(t){for(let t=0;t<gt.length;t+=2)gt[t][0](gt[t+1]);gt.length=0}}}return{set:c,update:function(t){c(t(e))},subscribe:function(l,s=t){const i=[l,s];return r.add(i),1===r.size&&(o=n(c)||t),l(e),()=>{r.delete(i),0===r.size&&(o(),o=null)}}}}({hideDisorder:!1});function bt(e){let n,o,c,l,s,i,u,a,d,f,p,m;return{c(){n=y("div"),o=y("div"),c=y("div"),l=y("label"),s=y("input"),i=x("\n                Hide Mental disorders"),u=_(),a=y("button"),a.textContent="OK",d=_(),f=y("div"),E(s,"id","hideMental"),E(s,"type","checkbox"),E(s,"class","svelte-tet5rx"),E(l,"for","hideMental"),E(c,"class","filter svelte-tet5rx"),E(o,"class","dialog-body svelte-tet5rx"),E(f,"class","overlay on:click="+e[1]+" svelte-tet5rx"),E(n,"class","dialog-container svelte-tet5rx")},m(t,r){$(t,n,r),h(n,o),h(o,c),h(c,l),h(l,s),s.checked=e[0].hideDisorder,h(l,i),h(o,u),h(o,a),h(n,d),h(n,f),p||(m=[k(s,"change",e[3]),k(a,"click",e[1])],p=!0)},p(t,[e]){1&e&&(s.checked=t[0].hideDisorder)},i:t,o:t,d(t){t&&b(n),p=!1,r(m)}}}function vt(t,e,n){let o;s(t,$t,(t=>n(0,o=t)));let{opened:r}=e;return t.$$set=t=>{"opened"in t&&n(2,r=t.opened)},[o,function(){n(2,r=!r)},r,function(){o.hideDisorder=this.checked,$t.set(o)}]}class yt extends st{constructor(t){super(),lt(this,t,vt,bt,l,{opened:2})}}function xt(t){let e,n,o;function r(e){t[2](e)}let c={};return void 0!==t[0]&&(c.opened=t[0]),e=new yt({props:c}),L.push((()=>function(t,e,n){const o=t.$$.props[e];void 0!==o&&(t.$$.bound[o]=n,n(t.$$.ctx[o]))}(e,"opened",r))),{c(){nt(e.$$.fragment)},m(t,n){ot(e,t,n),o=!0},p(t,o){const r={};var c;!n&&1&o&&(n=!0,r.opened=t[0],c=()=>n=!1,z.push(c)),e.$set(r)},i(t){o||(X(e.$$.fragment,t),o=!0)},o(t){Y(e.$$.fragment,t),o=!1},d(t){rt(e,t)}}}function _t(t){let e,n,o,r,c,l,s=t[0]&&xt(t);return{c(){e=y("i"),e.innerHTML='<img src="./filter.svg" alt="filter icon"/>',n=_(),s&&s.c(),o=w(),E(e,"class","filter-icon svelte-1fyf87t")},m(i,u){$(i,e,u),$(i,n,u),s&&s.m(i,u),$(i,o,u),r=!0,c||(l=k(e,"click",t[1]),c=!0)},p(t,[e]){t[0]?s?(s.p(t,e),1&e&&X(s,1)):(s=xt(t),s.c(),X(s,1),s.m(o.parentNode,o)):s&&(J(),Y(s,1,1,(()=>{s=null})),Q())},i(t){r||(X(s),r=!0)},o(t){Y(s),r=!1},d(t){t&&b(e),t&&b(n),s&&s.d(t),t&&b(o),c=!1,l()}}}function wt(t,e,n){let o=!1;return[o,function(){n(0,o=!o),console.log(o)},function(t){o=t,n(0,o)}]}class kt extends st{constructor(t){super(),lt(this,t,wt,_t,l,{})}}function Et(e){let n;return{c(){n=y("footer"),n.innerHTML='<p>Using <a href="https://maximeblanc.fr/api/genders">Maxime Blanc API</a></p> \n    <p>Made with <a href="https://svelte.dev">Svelte</a> and a lot of pain</p>',E(n,"class","svelte-1r5pncy")},m(t,e){$(t,n,e)},p:t,i:t,o:t,d(t){t&&b(n)}}}class Ct extends st{constructor(t){super(),lt(this,t,null,Et,l,{})}}function Dt(t,e,n){const o=t.slice();return o[7]=e[n][0],o[8]=e[n][1],o}function Mt(t,e,n){const o=t.slice();return o[11]=e[n],o}function Tt(e){let n;return{c(){n=y("p"),n.textContent="Very sadly, an error occured while retrieving the dis..genders :(",E(n,"class","notitication-message")},m(t,e){$(t,n,e)},p:t,i:t,o:t,d(t){t&&b(n)}}}function Ft(t){let e,n,o,r;const c=[Nt,At],l=[];function s(t,e){return t[1]&&t[1].size>0?0:1}return e=s(t),n=l[e]=c[e](t),{c(){n.c(),o=w()},m(t,n){l[e].m(t,n),$(t,o,n),r=!0},p(t,r){let i=e;e=s(t),e===i?l[e].p(t,r):(J(),Y(l[i],1,1,(()=>{l[i]=null})),Q(),n=l[e],n?n.p(t,r):(n=l[e]=c[e](t),n.c()),X(n,1),n.m(o.parentNode,o))},i(t){r||(X(n),r=!0)},o(t){Y(n),r=!1},d(t){l[e].d(t),t&&b(o)}}}function At(e){let n;return{c(){n=y("p"),n.textContent="The list is empty",E(n,"class","notitication-message")},m(t,e){$(t,n,e)},p:t,i:t,o:t,d(t){t&&b(n)}}}function Nt(t){let e,n,o=[...t[1]],r=[];for(let e=0;e<o.length;e+=1)r[e]=Bt(Dt(t,o,e));const c=t=>Y(r[t],1,1,(()=>{r[t]=null}));return{c(){e=y("dl");for(let t=0;t<r.length;t+=1)r[t].c();E(e,"class","svelte-1nx5rig")},m(t,o){$(t,e,o);for(let t=0;t<r.length;t+=1)r[t].m(e,null);n=!0},p(t,n){if(2&n){let l;for(o=[...t[1]],l=0;l<o.length;l+=1){const c=Dt(t,o,l);r[l]?(r[l].p(c,n),X(r[l],1)):(r[l]=Bt(c),r[l].c(),X(r[l],1),r[l].m(e,null))}for(J(),l=o.length;l<r.length;l+=1)c(l);Q()}},i(t){if(!n){for(let t=0;t<o.length;t+=1)X(r[t]);n=!0}},o(t){r=r.filter(Boolean);for(let t=0;t<r.length;t+=1)Y(r[t]);n=!1},d(t){t&&b(e),v(r,t)}}}function jt(t){let e,n,o,r;return n=new mt({props:{gender:t[11]}}),{c(){e=y("dd"),nt(n.$$.fragment),o=_(),E(e,"class","svelte-1nx5rig")},m(t,c){$(t,e,c),ot(n,e,null),h(e,o),r=!0},p(t,e){const o={};2&e&&(o.gender=t[11]),n.$set(o)},i(t){r||(X(n.$$.fragment,t),r=!0)},o(t){Y(n.$$.fragment,t),r=!1},d(t){t&&b(e),rt(n)}}}function Bt(t){let e,n,o,r,c=t[7]+"",l=t[8],s=[];for(let e=0;e<l.length;e+=1)s[e]=jt(Mt(t,l,e));const i=t=>Y(s[t],1,1,(()=>{s[t]=null}));return{c(){e=y("dt"),n=x(c);for(let t=0;t<s.length;t+=1)s[t].c();o=w(),E(e,"class","svelte-1nx5rig")},m(t,c){$(t,e,c),h(e,n);for(let e=0;e<s.length;e+=1)s[e].m(t,c);$(t,o,c),r=!0},p(t,e){if((!r||2&e)&&c!==(c=t[7]+"")&&C(n,c),2&e){let n;for(l=t[8],n=0;n<l.length;n+=1){const r=Mt(t,l,n);s[n]?(s[n].p(r,e),X(s[n],1)):(s[n]=jt(r),s[n].c(),X(s[n],1),s[n].m(o.parentNode,o))}for(J(),n=l.length;n<s.length;n+=1)i(n);Q()}},i(t){if(!r){for(let t=0;t<l.length;t+=1)X(s[t]);r=!0}},o(t){s=s.filter(Boolean);for(let t=0;t<s.length;t+=1)Y(s[t]);r=!1},d(t){t&&b(e),v(s,t),t&&b(o)}}}function Lt(e){let n;return{c(){n=y("p"),n.textContent="Loading gender...",E(n,"class","notitication-message")},m(t,e){$(t,n,e)},p:t,i:t,o:t,d(t){t&&b(n)}}}function St(t){let e,n,o,r,c,l,s,i,u,a;r=new kt({});let d={ctx:t,current:null,token:null,hasCatch:!0,pending:Lt,then:Ft,catch:Tt,value:6,error:14,blocks:[,,,]};return et(s=t[0],d),u=new Ct({}),{c(){e=y("nav"),n=y("h1"),n.textContent="Gender List",o=_(),nt(r.$$.fragment),c=_(),l=y("main"),d.block.c(),i=_(),nt(u.$$.fragment),E(n,"class","svelte-1nx5rig"),E(e,"class","svelte-1nx5rig"),E(l,"class","svelte-1nx5rig")},m(t,s){$(t,e,s),h(e,n),h(e,o),ot(r,e,null),$(t,c,s),$(t,l,s),d.block.m(l,d.anchor=null),d.mount=()=>l,d.anchor=null,$(t,i,s),ot(u,t,s),a=!0},p(e,[n]){t=e,d.ctx=t,1&n&&s!==(s=t[0])&&et(s,d)||function(t,e,n){const o=e.slice(),{resolved:r}=t;t.current===t.then&&(o[t.value]=r),t.current===t.catch&&(o[t.error]=r),t.block.p(o,n)}(d,t,n)},i(t){a||(X(r.$$.fragment,t),X(d.block),X(u.$$.fragment,t),a=!0)},o(t){Y(r.$$.fragment,t);for(let t=0;t<3;t+=1){Y(d.blocks[t])}Y(u.$$.fragment,t),a=!1},d(t){t&&b(e),rt(r),t&&b(c),t&&b(l),d.block.d(),d.token=null,d=null,t&&b(i),rt(u,t)}}}function zt(t,e){if(!t)return t;let n=new Map;return t.forEach(((t,o)=>{let r=t.filter((t=>!(e.hideDisorder&&t.mentalDisorder)));r.length&&n.set(o,r)})),n}function Ot(t,e,n){let o=null,r=null,c=null;async function l(){return console.log("Fetching genders..."),fetch("https://maximeblanc.fr/api/genders",{method:"GET",headers:{Accept:"application/json"}}).then((t=>{if(!t.ok)throw new Error(t.error);return t.json()})).then((t=>(n(2,o=function(t){const e=new Map;return t.forEach((t=>{const n=t.name[0].toUpperCase(),o=e.get(n);o?o.push(t):e.set(n,[t])})),e}(t)),o))).catch((t=>{console.error(t)}))}const s=$t.subscribe((t=>{n(1,c=zt(o,t))}));var i;return i=async()=>{n(0,r=l())},j().$$.on_mount.push(i),function(t){j().$$.on_destroy.push(t)}(s),t.$$.update=()=>{4&t.$$.dirty&&n(1,c=zt(o,$t))},[r,c,o]}return new class extends st{constructor(t){super(),lt(this,t,Ot,St,l,{})}}({target:document.body,props:{}})}();
//# sourceMappingURL=bundle.js.map
