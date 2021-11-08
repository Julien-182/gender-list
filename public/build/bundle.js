var app=function(){"use strict";function t(){}const e=t=>t;function n(t){return t()}function o(){return Object.create(null)}function r(t){t.forEach(n)}function l(t){return"function"==typeof t}function c(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function i(t){return null==t?"":t}const s="undefined"!=typeof window;let u=s?()=>window.performance.now():()=>Date.now(),a=s?t=>requestAnimationFrame(t):t;const d=new Set;function f(t){d.forEach((e=>{e.c(t)||(d.delete(e),e.f())})),0!==d.size&&a(f)}function p(t,e){t.appendChild(e)}function h(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function m(t){const e=v("style");return function(t,e){p(t.head||t,e)}(h(t),e),e}function g(t,e,n){t.insertBefore(e,n||null)}function $(t){t.parentNode.removeChild(t)}function b(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function v(t){return document.createElement(t)}function x(t){return document.createTextNode(t)}function y(){return x(" ")}function k(){return x("")}function _(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function w(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function E(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}const C=new Set;let j,D=0;function M(t,e,n,o,r,l,c,i=0){const s=16.666/o;let u="{\n";for(let t=0;t<=1;t+=s){const o=e+(n-e)*l(t);u+=100*t+`%{${c(o,1-o)}}\n`}const a=u+`100% {${c(n,1-n)}}\n}`,d=`__svelte_${function(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}(a)}_${i}`,f=h(t);C.add(f);const p=f.__svelte_stylesheet||(f.__svelte_stylesheet=m(t).sheet),g=f.__svelte_rules||(f.__svelte_rules={});g[d]||(g[d]=!0,p.insertRule(`@keyframes ${d} ${a}`,p.cssRules.length));const $=t.style.animation||"";return t.style.animation=`${$?`${$}, `:""}${d} ${o}ms linear ${r}ms 1 both`,D+=1,d}function T(t,e){const n=(t.style.animation||"").split(", "),o=n.filter(e?t=>t.indexOf(e)<0:t=>-1===t.indexOf("__svelte")),r=n.length-o.length;r&&(t.style.animation=o.join(", "),D-=r,D||a((()=>{D||(C.forEach((t=>{const e=t.__svelte_stylesheet;let n=e.cssRules.length;for(;n--;)e.deleteRule(n);t.__svelte_rules={}})),C.clear())})))}function F(t){j=t}function A(){if(!j)throw new Error("Function called outside component initialization");return j}const N=[],B=[],L=[],O=[],R=Promise.resolve();let S=!1;function z(t){L.push(t)}function H(t){O.push(t)}let P=!1;const q=new Set;function G(){if(!P){P=!0;do{for(let t=0;t<N.length;t+=1){const e=N[t];F(e),U(e.$$)}for(F(null),N.length=0;B.length;)B.pop()();for(let t=0;t<L.length;t+=1){const e=L[t];q.has(e)||(q.add(e),e())}L.length=0}while(N.length);for(;O.length;)O.pop()();S=!1,P=!1,q.clear()}}function U(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(z)}}let W;function I(t,e,n){t.dispatchEvent(function(t,e,n=!1){const o=document.createEvent("CustomEvent");return o.initCustomEvent(t,n,!1,e),o}(`${e?"intro":"outro"}${n}`))}const K=new Set;let V;function J(){V={r:0,c:[],p:V}}function Q(){V.r||r(V.c),V=V.p}function X(t,e){t&&t.i&&(K.delete(t),t.i(e))}function Y(t,e,n,o){if(t&&t.o){if(K.has(t))return;K.add(t),V.c.push((()=>{K.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}}const Z={duration:0};function tt(n,o,c,i){let s=o(n,c),p=i?0:1,h=null,m=null,g=null;function $(){g&&T(n,g)}function b(t,e){const n=t.b-p;return e*=Math.abs(n),{a:p,b:t.b,d:n,duration:e,start:t.start,end:t.start+e,group:t.group}}function v(o){const{delay:l=0,duration:c=300,easing:i=e,tick:v=t,css:x}=s||Z,y={start:u()+l,b:o};o||(y.group=V,V.r+=1),h||m?m=y:(x&&($(),g=M(n,p,o,c,l,i,x)),o&&v(0,1),h=b(y,c),z((()=>I(n,o,"start"))),function(t){let e;0===d.size&&a(f),new Promise((n=>{d.add(e={c:t,f:n})}))}((t=>{if(m&&t>m.start&&(h=b(m,c),m=null,I(n,h.b,"start"),x&&($(),g=M(n,p,h.b,h.duration,0,i,s.css))),h)if(t>=h.end)v(p=h.b,1-p),I(n,h.b,"end"),m||(h.b?$():--h.group.r||r(h.group.c)),h=null;else if(t>=h.start){const e=t-h.start;p=h.a+h.d*i(e/h.duration),v(p,1-p)}return!(!h&&!m)})))}return{run(t){l(s)?(W||(W=Promise.resolve(),W.then((()=>{W=null}))),W).then((()=>{s=s(),v(t)})):v(t)},end(){$(),h=m=null}}}function et(t,e){const n=e.token={};function o(t,o,r,l){if(e.token!==n)return;e.resolved=l;let c=e.ctx;void 0!==r&&(c=c.slice(),c[r]=l);const i=t&&(e.current=t)(c);let s=!1;e.block&&(e.blocks?e.blocks.forEach(((t,n)=>{n!==o&&t&&(J(),Y(t,1,1,(()=>{e.blocks[n]===t&&(e.blocks[n]=null)})),Q())})):e.block.d(1),i.c(),X(i,1),i.m(e.mount(),e.anchor),s=!0),e.block=i,e.blocks&&(e.blocks[o]=i),s&&G()}if((r=t)&&"object"==typeof r&&"function"==typeof r.then){const n=A();if(t.then((t=>{F(n),o(e.then,1,e.value,t),F(null)}),(t=>{if(F(n),o(e.catch,2,e.error,t),F(null),!e.hasCatch)throw t})),e.current!==e.pending)return o(e.pending,0),!0}else{if(e.current!==e.then)return o(e.then,1,e.value,t),!0;e.resolved=t}var r}function nt(t,e,n){const o=t.$$.props[e];void 0!==o&&(t.$$.bound[o]=n,n(t.$$.ctx[o]))}function ot(t){t&&t.c()}function rt(t,e,o,c){const{fragment:i,on_mount:s,on_destroy:u,after_update:a}=t.$$;i&&i.m(e,o),c||z((()=>{const e=s.map(n).filter(l);u?u.push(...e):r(e),t.$$.on_mount=[]})),a.forEach(z)}function lt(t,e){const n=t.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function ct(t,e){-1===t.$$.dirty[0]&&(N.push(t),S||(S=!0,R.then(G)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function it(e,n,l,c,i,s,u,a=[-1]){const d=j;F(e);const f=e.$$={fragment:null,ctx:null,props:s,update:t,not_equal:i,bound:o(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(d?d.$$.context:[])),callbacks:o(),dirty:a,skip_bound:!1,root:n.target||d.$$.root};u&&u(f.root);let p=!1;if(f.ctx=l?l(e,n.props||{},((t,n,...o)=>{const r=o.length?o[0]:n;return f.ctx&&i(f.ctx[t],f.ctx[t]=r)&&(!f.skip_bound&&f.bound[t]&&f.bound[t](r),p&&ct(e,t)),n})):[],f.update(),p=!0,r(f.before_update),f.fragment=!!c&&c(f.ctx),n.target){if(n.hydrate){const t=function(t){return Array.from(t.childNodes)}(n.target);f.fragment&&f.fragment.l(t),t.forEach($)}else f.fragment&&f.fragment.c();n.intro&&X(e.$$.fragment),rt(e,n.target,n.anchor,n.customElement),G()}F(d)}class st{$destroy(){lt(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function ut(t){const e=t-1;return e*e*e+1}function at(t,{delay:e=0,duration:n=400,easing:o=ut}={}){const r=getComputedStyle(t),l=+r.opacity,c=parseFloat(r.height),i=parseFloat(r.paddingTop),s=parseFloat(r.paddingBottom),u=parseFloat(r.marginTop),a=parseFloat(r.marginBottom),d=parseFloat(r.borderTopWidth),f=parseFloat(r.borderBottomWidth);return{delay:e,duration:n,easing:o,css:t=>`overflow: hidden;opacity: ${Math.min(20*t,1)*l};height: ${t*c}px;padding-top: ${t*i}px;padding-bottom: ${t*s}px;margin-top: ${t*u}px;margin-bottom: ${t*a}px;border-top-width: ${t*d}px;border-bottom-width: ${t*f}px;`}}function dt(t){let e;return{c(){e=v("i"),w(e,"class","disorder svelte-1gbxne2"),w(e,"title","This gender is a mental disorder")},m(t,n){g(t,e,n)},d(t){t&&$(e)}}}function ft(t){let e,n,o,r,l,c,i=t[0].description+"",s=t[0].mentalDisorder&&pt();return{c(){e=v("div"),n=v("p"),o=x(i),r=y(),s&&s.c(),w(e,"class","details")},m(t,l){g(t,e,l),p(e,n),p(n,o),p(e,r),s&&s.m(e,null),c=!0},p(t,n){(!c||1&n)&&i!==(i=t[0].description+"")&&E(o,i),t[0].mentalDisorder?s||(s=pt(),s.c(),s.m(e,null)):s&&(s.d(1),s=null)},i(t){c||(z((()=>{l||(l=tt(e,at,{},!0)),l.run(1)})),c=!0)},o(t){l||(l=tt(e,at,{},!1)),l.run(0),c=!1},d(t){t&&$(e),s&&s.d(),t&&l&&l.end()}}}function pt(t){let e;return{c(){e=v("p"),e.innerHTML='<i class="disorder svelte-1gbxne2" title="This gender is a mental disorder"></i> This gender is a mental disorder',w(e,"class","disorder-note svelte-1gbxne2")},m(t,n){g(t,e,n)},d(t){t&&$(e)}}}function ht(t){let e,n,o,r,l,c,s,u,a,d=t[0].name+"",f=t[0].mentalDisorder&&dt(),h=t[1]&&ft(t);return{c(){e=v("article"),n=v("h2"),o=x(d),r=y(),f&&f.c(),l=y(),h&&h.c(),w(n,"class","svelte-1gbxne2"),w(e,"class",c=i("gender-card "+(t[1]?"opened":""))+" svelte-1gbxne2")},m(c,i){g(c,e,i),p(e,n),p(n,o),p(n,r),f&&f.m(n,null),p(e,l),h&&h.m(e,null),s=!0,u||(a=_(n,"click",t[2]),u=!0)},p(t,[r]){(!s||1&r)&&d!==(d=t[0].name+"")&&E(o,d),t[0].mentalDisorder?f||(f=dt(),f.c(),f.m(n,null)):f&&(f.d(1),f=null),t[1]?h?(h.p(t,r),2&r&&X(h,1)):(h=ft(t),h.c(),X(h,1),h.m(e,null)):h&&(J(),Y(h,1,1,(()=>{h=null})),Q()),(!s||2&r&&c!==(c=i("gender-card "+(t[1]?"opened":""))+" svelte-1gbxne2"))&&w(e,"class",c)},i(t){s||(X(h),s=!0)},o(t){Y(h),s=!1},d(t){t&&$(e),f&&f.d(),h&&h.d(),u=!1,a()}}}function mt(t,e,n){let{gender:o}=e,r=!1;return t.$$set=t=>{"gender"in t&&n(0,o=t.gender)},[o,r,()=>n(1,r=!r)]}class gt extends st{constructor(t){super(),it(this,t,mt,ht,c,{gender:0})}}function $t(e){let n,o,l,c,i,s,u,a,d,f,h,m;return{c(){n=v("div"),o=v("div"),l=v("div"),c=v("label"),i=v("input"),s=x("\n                Hide Mental disorders"),u=y(),a=v("button"),a.textContent="OK",d=y(),f=v("div"),w(i,"id","hideMental"),w(i,"type","checkbox"),w(i,"class","svelte-tet5rx"),w(c,"for","hideMental"),w(l,"class","filter svelte-tet5rx"),w(o,"class","dialog-body svelte-tet5rx"),w(f,"class","overlay on:click="+e[1]+" svelte-tet5rx"),w(n,"class","dialog-container svelte-tet5rx")},m(t,r){g(t,n,r),p(n,o),p(o,l),p(l,c),p(c,i),i.checked=e[0].hideDisorder,p(c,s),p(o,u),p(o,a),p(n,d),p(n,f),h||(m=[_(i,"change",e[3]),_(a,"click",e[1])],h=!0)},p(t,[e]){1&e&&(i.checked=t[0].hideDisorder)},i:t,o:t,d(t){t&&$(n),h=!1,r(m)}}}function bt(t,e,n){let{filter:o}=e,{opened:r}=e;return t.$$set=t=>{"filter"in t&&n(0,o=t.filter),"opened"in t&&n(2,r=t.opened)},[o,function(){n(2,r=!r)},r,function(){o.hideDisorder=this.checked,n(0,o)}]}class vt extends st{constructor(t){super(),it(this,t,bt,$t,c,{filter:0,opened:2})}}function xt(t){let e,n,o,r;function l(e){t[3](e)}function c(e){t[4](e)}let i={};return void 0!==t[0]&&(i.filter=t[0]),void 0!==t[1]&&(i.opened=t[1]),e=new vt({props:i}),B.push((()=>nt(e,"filter",l))),B.push((()=>nt(e,"opened",c))),{c(){ot(e.$$.fragment)},m(t,n){rt(e,t,n),r=!0},p(t,r){const l={};!n&&1&r&&(n=!0,l.filter=t[0],H((()=>n=!1))),!o&&2&r&&(o=!0,l.opened=t[1],H((()=>o=!1))),e.$set(l)},i(t){r||(X(e.$$.fragment,t),r=!0)},o(t){Y(e.$$.fragment,t),r=!1},d(t){lt(e,t)}}}function yt(t){let e,n,o,r,l,c,i=t[1]&&xt(t);return{c(){e=v("i"),e.innerHTML='<img src="./filter.svg" alt="filter icon"/>',n=y(),i&&i.c(),o=k(),w(e,"class","filter-icon svelte-1fyf87t")},m(s,u){g(s,e,u),g(s,n,u),i&&i.m(s,u),g(s,o,u),r=!0,l||(c=_(e,"click",t[2]),l=!0)},p(t,[e]){t[1]?i?(i.p(t,e),2&e&&X(i,1)):(i=xt(t),i.c(),X(i,1),i.m(o.parentNode,o)):i&&(J(),Y(i,1,1,(()=>{i=null})),Q())},i(t){r||(X(i),r=!0)},o(t){Y(i),r=!1},d(t){t&&$(e),t&&$(n),i&&i.d(t),t&&$(o),l=!1,c()}}}function kt(t,e,n){let{filter:o}=e,r=!1;return t.$$set=t=>{"filter"in t&&n(0,o=t.filter)},[o,r,function(){n(1,r=!r),console.log(r)},function(t){o=t,n(0,o)},function(t){r=t,n(1,r)}]}class _t extends st{constructor(t){super(),it(this,t,kt,yt,c,{filter:0})}}function wt(e){let n;return{c(){n=v("footer"),n.innerHTML='<p>Using <a href="https://maximeblanc.fr/api/genders">Maxime Blanc API</a></p> \n    <p>Made with <a href="https://svelte.dev">Svelte</a> and a lot of pain</p>',w(n,"class","svelte-1r5pncy")},m(t,e){g(t,n,e)},p:t,i:t,o:t,d(t){t&&$(n)}}}class Et extends st{constructor(t){super(),it(this,t,null,wt,c,{})}}function Ct(t,e,n){const o=t.slice();return o[8]=e[n][0],o[9]=e[n][1],o}function jt(t,e,n){const o=t.slice();return o[12]=e[n],o}function Dt(e){let n;return{c(){n=v("p"),n.textContent="Very sadly, an error occured while retrieving the dis..genders :(",w(n,"class","notitication-message")},m(t,e){g(t,n,e)},p:t,i:t,o:t,d(t){t&&$(n)}}}function Mt(t){let e,n,o,r;const l=[Ft,Tt],c=[];function i(t,e){return t[1]&&t[1].size>0?0:1}return e=i(t),n=c[e]=l[e](t),{c(){n.c(),o=k()},m(t,n){c[e].m(t,n),g(t,o,n),r=!0},p(t,r){let s=e;e=i(t),e===s?c[e].p(t,r):(J(),Y(c[s],1,1,(()=>{c[s]=null})),Q(),n=c[e],n?n.p(t,r):(n=c[e]=l[e](t),n.c()),X(n,1),n.m(o.parentNode,o))},i(t){r||(X(n),r=!0)},o(t){Y(n),r=!1},d(t){c[e].d(t),t&&$(o)}}}function Tt(e){let n;return{c(){n=v("p"),n.textContent="The list is empty",w(n,"class","notitication-message")},m(t,e){g(t,n,e)},p:t,i:t,o:t,d(t){t&&$(n)}}}function Ft(t){let e,n,o=[...t[1]],r=[];for(let e=0;e<o.length;e+=1)r[e]=Nt(Ct(t,o,e));const l=t=>Y(r[t],1,1,(()=>{r[t]=null}));return{c(){e=v("dl");for(let t=0;t<r.length;t+=1)r[t].c();w(e,"class","svelte-84j1kc")},m(t,o){g(t,e,o);for(let t=0;t<r.length;t+=1)r[t].m(e,null);n=!0},p(t,n){if(2&n){let c;for(o=[...t[1]],c=0;c<o.length;c+=1){const l=Ct(t,o,c);r[c]?(r[c].p(l,n),X(r[c],1)):(r[c]=Nt(l),r[c].c(),X(r[c],1),r[c].m(e,null))}for(J(),c=o.length;c<r.length;c+=1)l(c);Q()}},i(t){if(!n){for(let t=0;t<o.length;t+=1)X(r[t]);n=!0}},o(t){r=r.filter(Boolean);for(let t=0;t<r.length;t+=1)Y(r[t]);n=!1},d(t){t&&$(e),b(r,t)}}}function At(t){let e,n,o,r;return n=new gt({props:{gender:t[12]}}),{c(){e=v("dd"),ot(n.$$.fragment),o=y(),w(e,"class","svelte-84j1kc")},m(t,l){g(t,e,l),rt(n,e,null),p(e,o),r=!0},p(t,e){const o={};2&e&&(o.gender=t[12]),n.$set(o)},i(t){r||(X(n.$$.fragment,t),r=!0)},o(t){Y(n.$$.fragment,t),r=!1},d(t){t&&$(e),lt(n)}}}function Nt(t){let e,n,o,r,l=t[8]+"",c=t[9],i=[];for(let e=0;e<c.length;e+=1)i[e]=At(jt(t,c,e));const s=t=>Y(i[t],1,1,(()=>{i[t]=null}));return{c(){e=v("dt"),n=x(l);for(let t=0;t<i.length;t+=1)i[t].c();o=k(),w(e,"class","svelte-84j1kc")},m(t,l){g(t,e,l),p(e,n);for(let e=0;e<i.length;e+=1)i[e].m(t,l);g(t,o,l),r=!0},p(t,e){if((!r||2&e)&&l!==(l=t[8]+"")&&E(n,l),2&e){let n;for(c=t[9],n=0;n<c.length;n+=1){const r=jt(t,c,n);i[n]?(i[n].p(r,e),X(i[n],1)):(i[n]=At(r),i[n].c(),X(i[n],1),i[n].m(o.parentNode,o))}for(J(),n=c.length;n<i.length;n+=1)s(n);Q()}},i(t){if(!r){for(let t=0;t<c.length;t+=1)X(i[t]);r=!0}},o(t){i=i.filter(Boolean);for(let t=0;t<i.length;t+=1)Y(i[t]);r=!1},d(t){t&&$(e),b(i,t),t&&$(o)}}}function Bt(e){let n;return{c(){n=v("p"),n.textContent="Loading gender...",w(n,"class","notitication-message")},m(t,e){g(t,n,e)},p:t,i:t,o:t,d(t){t&&$(n)}}}function Lt(t){let e,n,o,r,l,c,i,s,u,a;function d(e){t[4](e)}let f={};void 0!==t[0]&&(f.filter=t[0]),r=new _t({props:f}),B.push((()=>nt(r,"filter",d)));let h={ctx:t,current:null,token:null,hasCatch:!0,pending:Bt,then:Mt,catch:Dt,value:7,error:15,blocks:[,,,]};return et(t[2],h),u=new Et({}),{c(){e=v("nav"),n=v("h1"),n.textContent="Gender List",o=y(),ot(r.$$.fragment),c=y(),i=v("main"),h.block.c(),s=y(),ot(u.$$.fragment),w(n,"class","svelte-84j1kc"),w(e,"class","svelte-84j1kc"),w(i,"class","svelte-84j1kc")},m(t,l){g(t,e,l),p(e,n),p(e,o),rt(r,e,null),g(t,c,l),g(t,i,l),h.block.m(i,h.anchor=null),h.mount=()=>i,h.anchor=null,g(t,s,l),rt(u,t,l),a=!0},p(e,[n]){t=e;const o={};!l&&1&n&&(l=!0,o.filter=t[0],H((()=>l=!1))),r.$set(o),function(t,e,n){const o=e.slice(),{resolved:r}=t;t.current===t.then&&(o[t.value]=r),t.current===t.catch&&(o[t.error]=r),t.block.p(o,n)}(h,t,n)},i(t){a||(X(r.$$.fragment,t),X(h.block),X(u.$$.fragment,t),a=!0)},o(t){Y(r.$$.fragment,t);for(let t=0;t<3;t+=1){Y(h.blocks[t])}Y(u.$$.fragment,t),a=!1},d(t){t&&$(e),lt(r),t&&$(c),t&&$(i),h.block.d(),h.token=null,h=null,t&&$(s),lt(u,t)}}}function Ot(t,e,n){let o,{filter:r}=e;let l=null;let c=async function(){return console.log("Fetching genders..."),fetch("https://maximeblanc.fr/api/genders",{method:"GET",headers:{Accept:"application/json"}}).then((t=>{if(!t.ok)throw new Error(t.error);return t.json()})).then((t=>(console.log(t),n(3,l=function(t){const e=new Map;return t.forEach((t=>{const n=t.name[0].toUpperCase(),o=e.get(n);o?o.push(t):e.set(n,[t])})),e}(t)),l))).catch((t=>{console.error(t)}))}();return t.$$set=t=>{"filter"in t&&n(0,r=t.filter)},t.$$.update=()=>{9&t.$$.dirty&&n(1,o=function(t,e){if(!t)return t;let n=new Map;return t.forEach(((t,o)=>{let r=t.filter((t=>!(e.hideDisorder&&t.mentalDisorder)));r.length&&n.set(o,r)})),n}(l,r))},[r,o,c,l,function(t){r=t,n(0,r)}]}return new class extends st{constructor(t){super(),it(this,t,Ot,Lt,c,{filter:0})}}({target:document.body,props:{filter:{hideDisorder:!1}}})}();
//# sourceMappingURL=bundle.js.map