const le="data-scope",ne="data-part",gt="data-xh-focus-guard",yt="data-xh-inert-exempt",Ue="xh.focusScope.mountAutoFocus",Ge="xh.focusScope.unmountAutoFocus";function Wo(e,t){return{name:e,parts:t,build:()=>{const n={};for(const r of t)n[r]={attrs:{[le]:e,[ne]:r},selector:`[${le}="${e}"][${ne}="${r}"]`};return n}}}function jo(e){return e?"":void 0}const bt=[`[${yt}]`,".n-modal-container",".n-message-container",".n-notification-container"];function Ko(e,t,o={}){const n=t.getDoc().body,r=[...bt,...o.exemptSelectors??[]].join(","),i=new Map,a=c=>e().some(d=>c===d||c.contains(d)||d.contains(c)),f=c=>{c instanceof HTMLElement&&(i.has(c)||a(c)||c.matches(r)||(i.set(c,c.inert),c.inert=!0))};for(const c of Array.from(n.children))f(c);const s=new MutationObserver(c=>{for(const d of c)for(const l of Array.from(d.addedNodes))l instanceof Element&&f(l)});return s.observe(n,{childList:!0}),()=>{s.disconnect();for(const[c,d]of i)c.inert=d;i.clear()}}function Yo(e){return e.isComposing===!0||e.keyCode===229}function xe(){return typeof document>"u"||typeof window>"u"}function Ee(e){return typeof Document<"u"&&e instanceof Document}function wt(e){return typeof ShadowRoot<"u"&&e instanceof ShadowRoot}function oe(e,t){return!e||!t?!1:e===t||e.contains(t)}function Xo(...e){return(...t)=>{for(const o of e)o==null||o(...t)}}function He(){try{return!1}catch{return!1}}const ye="__XIHAN_UI_DIAGNOSTICS__",We={silent:0,error:1,warn:2},xt=1e3;function Et(e){return`${e.code}|${e.scope??""}|${e.instanceId??""}|${e.part??""}|${e.message}`}function At(e){const t=["xh"];return e.scope&&t.push(e.scope),`[${t.join(":")}]`}function Ct(e){const t=`${At(e)} ${e.message} (${e.code})`,o=[];e.node&&o.push(e.node),e.detail&&o.push(e.detail),e.level==="error"?console.error(t,...o):console.warn(t,...o)}function St(){const e=new Set,t=new Set,o={level:He()?"warn":"silent",dedupe:!0,consoleOutput:He()};let n=o.level,r=o.dedupe,i=o.consoleOutput;return{report:s=>{if(!(We[s.level]>We[n])){if(r){const c=Et(s);if(t.has(c))return;t.size>=xt&&t.clear(),t.add(c)}i&&Ct(s);for(const c of Array.from(e))try{c(s)}catch{}}},subscribe:s=>(e.add(s),()=>{e.delete(s)}),setLevel:s=>{n=s},getLevel:()=>n,setDedupe:s=>{r=s,s||t.clear()},setConsoleOutput:s=>{i=s},reset:()=>{e.clear(),t.clear(),n=o.level,r=o.dedupe,i=o.consoleOutput}}}function kt(){const e=globalThis;return e[ye]??(e[ye]=St())}function j(e){kt().report(e)}const K={warn:"core.warn",layerDisposeNotTop:"core.layer.dispose-not-top",machineError:"machine.error"};function zt(e,t,o){return`${e}:${t}:${o}`}let Ot=0;function Tt(e="xh"){return{scopeId:()=>`${e}-${++Ot}`,partId:zt}}function $t(e){const t=new Map;return new Proxy({},{get(o,n){let r=t.get(n);return r||(r=i=>e(i),t.set(n,r)),r}})}$t(e=>e);function Ft(e){var o;let t=e.activeElement;for(;(o=t==null?void 0:t.shadowRoot)!=null&&o.activeElement;)t=t.shadowRoot.activeElement;return t}function Mt(e,t){const o=t.scopeId(),n=()=>{var f;const a=(f=e==null?void 0:e.getRootNode)==null?void 0:f.call(e);return a&&(Ee(a)||a instanceof ShadowRoot)?a:document},r=()=>{const a=n();return Ee(a)?a:a.ownerDocument},i=()=>r().defaultView??window;return{id:o,getRootNode:n,getDoc:r,getWin:i,getById:a=>n().getElementById(a),partId:(a,f)=>t.partId(a,o,f),ids:(a,...f)=>{const s={};for(const c of f)s[c]=t.partId(a,o,c);return s},getActiveElement:()=>Ft(n()),getComputedStyle:(a,f)=>i().getComputedStyle(a,f),isShadow:()=>n()instanceof ShadowRoot}}function ke(e){const t=new WeakMap;return{get(o){let n=t.get(o);return n||(n=e(o),t.set(o,n)),n}}}function Lt(e){const t=[],o=new Set;let n=0;const r=()=>{const s=[...t];for(const c of o)c(s)};return{register:s=>{const c={id:`layer-${++n}`,...s};t.push(c),r();let d=!1;return{layer:c,dispose:()=>{if(d)return;d=!0;const b=t.indexOf(c);b!==-1&&(b!==t.length-1&&j({code:K.layerDisposeNotTop,level:"error",message:`dispose 的层不是栈顶（可能与 top layer 顺序不一致）: ${c.id}`,detail:{layerId:c.id,index:b,depth:t.length}}),t.splice(b,1),r())}}},list:()=>t,top:()=>t[t.length-1],indexOf:s=>t.indexOf(s),layerOf:s=>{for(let c=t.length-1;c>=0;c--){const d=t[c];if(oe(d.node(),s))return{layer:d,via:"node"};if(d.surfaces().some(l=>oe(l,s)))return{layer:d,via:"surface"};if(d.branches().some(l=>oe(l,s)))return{layer:d,via:"branch"}}},elementsAbove:s=>{const c=t.indexOf(s);if(c===-1)return[];const d=[];for(let l=c+1;l<t.length;l++){const b=t[l],x=b.node();x&&d.push(x),d.push(...b.branches(),...b.surfaces())}return d},subscribe:s=>(o.add(s),()=>void o.delete(s))}}const Dt=ke(Lt);function Rt(e){return Dt.get(e)}function Qo(e={}){const t=e.idGenerator??Tt(),o=xe()?void 0:document;return{scope:e.scope??Mt(o==null?void 0:o.body,t),idGenerator:t,layerRegistry:e.layerRegistry??(o?Rt(o):It()),dir:e.dir??"ltr",locale:e.locale??"zh-CN",portalContainer:e.portalContainer??(()=>null),reducedMotion:e.reducedMotion??(()=>!xe()&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)}}function It(){throw new Error("[xh] createRuntimeConfig 在 SSR 环境需显式传入 layerRegistry")}function Jo(e,t){e||j({code:K.warn,level:"warn",message:t})}function ze(e){const t=new Map,o=new Map,n=new Map,r=(i,a)=>{if(t.has(i.value))return[];t.set(i.value,i),o.set(i.value,a);const f=i.children??[];let s;if(f.length===0)s=[i.value];else{s=[];for(const c of f)s.push(...r(c,i.value))}return n.set(i.value,s),s};for(const i of e)r(i,null);return{nodes:t,parentOf:o,leavesOf:n}}function Oe(e,t){const o=new Set;for(const n of t)for(const r of e.leavesOf.get(n)??[])o.add(r);return o}function fe(e,t){const o=new Set,n=new Set;for(const[r]of e.nodes){const i=e.leavesOf.get(r);if(i.length===0)continue;let a=0;for(const f of i)t.has(f)&&a++;a===i.length?o.add(r):a>0&&n.add(r)}return{checked:o,indeterminate:n}}function Zo(e,t){const o=ze(e);return fe(o,Oe(o,t))}function en(e,t,o,n){const r=ze(e),i=Oe(r,t),a=r.leavesOf.get(o);if(!a)return fe(r,i);const f=!a.every(l=>i.has(l)),s=[],c=l=>{if(l.disabled)return;const b=l.children??[];if(b.length===0){s.push(l.value);return}for(const x of b)c(x)},d=r.nodes.get(o);d&&c(d);for(const l of s)f?i.add(l):i.delete(l);return fe(r,i)}function tn(e,t,o){const n=ze(e),{checked:r}=fe(n,Oe(n,t)),i=[];for(const[a]of n.nodes){if(!r.has(a))continue;if(o==="all"){i.push(a);continue}const f=n.parentOf.get(a),s=f!=null&&r.has(f);o==="parent"&&!s&&i.push(a),o==="child"&&n.leavesOf.get(a).length===1&&n.leavesOf.get(a)[0]===a&&i.push(a)}return i}const Bt=["a[href]","button:not([disabled])",'input:not([disabled]):not([type="hidden"])',"select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])','[contenteditable="true"]',"audio[controls]","video[controls]"].join(",");function Pt(e){const t=e.ownerDocument.defaultView;let o=e;for(;o;){if(o.hidden)return!1;const n=t==null?void 0:t.getComputedStyle(o);if(n&&(n.display==="none"||n.visibility==="hidden"||n.visibility==="collapse"))return!1;o=o.parentElement}return!0}function be(e){return Array.from(e.querySelectorAll(Bt)).filter(t=>t.tabIndex>=0&&Pt(t))}function je(e){return e.filter(t=>t.tagName!=="A")}function G(e,t={}){!e||e===e.ownerDocument.activeElement||(e.focus({preventScroll:!0}),t.select&&(e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement)&&e.select())}function Ke(e,t={}){for(const o of e)if(G(o,t),o.ownerDocument.activeElement===o)return!0;return!1}function Nt(e,t={}){if(typeof e!="string")return e.ctrlKey||e.metaKey||e.altKey||e.shiftKey?null:Nt(e.key,t);const{axis:o="both",dir:n="ltr",home:r=!0}=t,i=o==="horizontal"||o==="both",a=o==="vertical"||o==="both",f=n==="rtl";return i&&e==="ArrowRight"?f?"prev":"next":i&&e==="ArrowLeft"?f?"next":"prev":a&&e==="ArrowDown"?"next":a&&e==="ArrowUp"?"prev":r&&e==="Home"?"first":r&&e==="End"?"last":null}function qt(e,t,o,n={}){if(e<=0)return-1;const{loop:r=!0,skip:i}=n,a=s=>(i==null?void 0:i(s))??!1,f=(s,c)=>{let d=s;for(let l=0;l<e;l++){if(d<0||d>=e){if(!r)return-1;d=d<0?e-1:0}if(!a(d))return d;d+=c}return-1};return o==="first"?f(0,1):o==="last"?f(e-1,-1):t<0?o==="next"?f(0,1):f(e-1,-1):o==="next"?f(t+1,1):f(t-1,-1)}const on="data-value";function Vt(e){return`[${le}="${e.scope}"][${ne}="${e.part}"]`}function nn(e,t){if(!e)return[];const o=[...e.querySelectorAll(Vt(t))],n=e.getAttribute(ne);if(n==null)return o;const r=`[${le}="${t.scope}"][${ne}="${n}"]`;return o.filter(i=>{var a;return((a=i.parentElement)==null?void 0:a.closest(r))===e})}function Ut(e){return(e==null?void 0:e.getAttribute("data-value"))??null}function rt(e){return e.getAttribute("aria-disabled")==="true"||e.hasAttribute("disabled")}function it(e,t){return t==null?-1:e.findIndex(o=>Ut(o)===t)}function rn(e,t,o={}){const n=it(e,t);if(n<0)return null;const r=e[n];return o.focusDisabled===!0||!rt(r)?r:null}function an(e,t,o,n={}){const{focusDisabled:r=!1,loop:i,skip:a}=n,f=qt(e.length,it(e,t),o,{loop:i,skip:a??(r?void 0:s=>rt(e[s]))});return f<0?null:e[f]}function un(e){var t;e&&(G(e),(t=e.scrollIntoView)==null||t.call(e,{block:"nearest",inline:"nearest"}))}const Gt=350;function Ht(e,t){return e.length!==1?!1:e!==" "||t}function sn(e={}){const{timeout:t=Gt,now:o=()=>Date.now()}=e;let n="",r=0;return{push(i){if(!Ht(i,n.length>0))return null;const a=o();return n=a-r>t?i:n+i,r=a,n},clear(){n="",r=0}}}function Wt(e){const t=e.length>1&&[...e].every(o=>o===e[0]);return{needle:t?e[0]:e,cycling:t}}function cn(e,t,o,n={}){if(!e.length||!o)return null;const{text:r=d=>d.textContent??"",skip:i}=n,{needle:a,cycling:f}=Wt(o),s=a.toLowerCase(),c=f||t<0?t+1:t;for(let d=0;d<e.length;d++){const l=e[(c+d+e.length)%e.length];if(!(i!=null&&i(l))&&r(l).trim().toLowerCase().startsWith(s))return l}return null}function Ae(e,t){const o=e.composedPath(),n=t.node();return n&&o.includes(n)?{inside:!0,onSurface:!1}:t.branches().some(r=>o.includes(r))?{inside:!0,onSurface:!1}:t.surfaces().some(r=>o.includes(r))?{inside:!1,onSurface:!0}:{inside:!1,onSurface:!1}}function Ye(e,t,o){const n=t.list();for(let r=n.length-1;r>=0;r--){const i=n[r],{inside:a,onSurface:f}=Ae(e,i);if(a)return!1;if(i===o)return!0;if(f)return!1}return!1}const jt="xh.dismiss.escapeKeyDown",Kt="xh.dismiss.pointerDownOutside",Yt="xh.dismiss.focusOutside",Xt="xh.dismiss.interactOutside";function ln(e){const{config:t,layer:o,onDismiss:n}=e,r=t.layerRegistry,i=t.scope.getDoc(),a=t.scope.getWin(),f=()=>o.node();let s=!1,c=!1;function d(k){var $;if(s||k.key!=="Escape"||r.top()!==o)return;const w=f(),T=new CustomEvent(jt,{bubbles:!1,cancelable:!0,detail:{originalEvent:k}});w==null||w.dispatchEvent(T),($=e.onEscapeKeyDown)==null||$.call(e,T),!T.defaultPrevented&&n("escape-key")}function l(k,w,T){var N;const $=new CustomEvent(w,{bubbles:!1,cancelable:!0,detail:{}});k.dispatchEvent($),T==null||T($);const P=new CustomEvent(Xt,{bubbles:!1,cancelable:!0,detail:{}});return k.dispatchEvent(P),(N=e.onInteractOutside)==null||N.call(e,P),!$.defaultPrevented&&!P.defaultPrevented}function b(k){if(s)return;const w=f();!w||Ae(k,o).inside||Ye(k,r,o)&&l(w,Kt,e.onPointerDownOutside)&&(c=!0,a.requestAnimationFrame(()=>{c=!1}),n("pointer-down-outside"))}function x(k){if(s||c)return;const w=f();!w||Ae(k,o).inside||Ye(k,r,o)&&l(w,Yt,e.onFocusOutside)&&n("focus-outside")}let F=!1;function C(){s||F||(F=!0,i.addEventListener("keydown",d,{capture:!0}),i.addEventListener("pointerdown",b,{capture:!0}),i.addEventListener("focusin",x,{capture:!0}))}return queueMicrotask(C),a.setTimeout(C,0),{dispose(){s||(s=!0,i.removeEventListener("keydown",d,{capture:!0}),i.removeEventListener("pointerdown",b,{capture:!0}),i.removeEventListener("focusin",x,{capture:!0}))}}}function Xe(e,t,o){const n=new CustomEvent(t,{bubbles:!1,cancelable:!0,detail:o});return e.dispatchEvent(n),!n.defaultPrevented}const Qt=ke(()=>({count:0}));function Qe(e){const t=e.createElement("span");return t.setAttribute(gt,""),t.setAttribute("aria-hidden","true"),t.tabIndex=0,t.style.cssText="outline:none;opacity:0;position:fixed;pointer-events:none",t}function Jt(e){const t=Qt.get(e);t.count===0?(t.start=Qe(e),t.end=Qe(e),e.body.insertAdjacentElement("afterbegin",t.start),e.body.insertAdjacentElement("beforeend",t.end)):(t.start&&e.body.firstElementChild!==t.start&&e.body.insertAdjacentElement("afterbegin",t.start),t.end&&e.body.lastElementChild!==t.end&&e.body.insertAdjacentElement("beforeend",t.end)),t.count+=1;let o=!1;return()=>{var n,r;o||(o=!0,t.count-=1,t.count===0&&((n=t.start)==null||n.remove(),(r=t.end)==null||r.remove(),t.start=void 0,t.end=void 0))}}let Zt=0;const Ce=new Set;function eo(e){for(const t of Ce)if(t>e)return!0;return!1}function fn(e){const{config:t,layer:o,container:n}=e,r=t.scope,i=r.getDoc(),a=r.getWin(),f=t.layerRegistry,s=++Zt;Ce.add(s);let c=!1,d=f.top()!==o,l=r.getActiveElement();const b=r.getActiveElement(),x=Jt(i);function F(y){var E;return y?oe(n(),y)?!0:(((E=e.branches)==null?void 0:E.call(e))??[]).some(A=>oe(A,y)):!1}let C=!1;function k(y){var M,H;if(C||c)return;const E=n();if(!E)return;const A=r.getActiveElement();if(F(A)&&A!==E){C=!0;return}const S=Xe(E,Ue,{});if((M=e.onMountAutoFocus)==null||M.call(e,new CustomEvent(Ue)),!S){C=!0;return}const z=((H=e.initialFocus)==null?void 0:H.call(e))??null;if(!(z&&(G(z,{select:!0}),r.getActiveElement()===z&&(C=!0),C||!y))){if(Ke(je(be(E)),{select:!0})){C=!0;return}y&&(G(E),C=!0)}}function w(y){a.requestAnimationFrame(()=>{C||c||(k(y<=1),!C&&y>1&&w(y-1))})}function T(){if(l!=null&&l.isConnected&&F(l)){G(l);return}const y=n();y&&!Ke(je(be(y)),{select:!0})&&G(y)}function $(y){if(c)return;const E=y.target;if(F(E)){l=E;return}d||!e.trapped()||T()}function P(y){if(c||d||!e.trapped())return;const E=y.relatedTarget;E!==null&&(F(E)||T())}function N(y){if(c||d||!e.loop||y.key!=="Tab")return;const E=n();if(!E)return;const A=be(E);if(A.length===0)return;const S=A[0],z=A[A.length-1],M=r.getActiveElement();!y.shiftKey&&M===z?(y.preventDefault(),G(S)):y.shiftKey&&M===S&&(y.preventDefault(),G(z))}i.addEventListener("focusin",$,{capture:!0}),i.addEventListener("focusout",P,{capture:!0}),i.addEventListener("keydown",N,{capture:!0}),k(!1),C||w(3);const q=f.subscribe(y=>{d=y[y.length-1]!==o});return{dispose(){c||(c=!0,Ce.delete(s),i.removeEventListener("focusin",$,{capture:!0}),i.removeEventListener("focusout",P,{capture:!0}),i.removeEventListener("keydown",N,{capture:!0}),q(),x(),a.requestAnimationFrame(()=>{var y,E,A;if((((y=e.restoreFocus)==null?void 0:y.call(e))??!0)&&!eo(s)&&Xe(n()??i.body,Ge,{})){(E=e.onUnmountAutoFocus)==null||E.call(e,new CustomEvent(Ge));const S=((A=e.restoreTarget)==null?void 0:A.call(e))??null,z=S!=null&&S.isConnected?S:b;if(z!=null&&z.isConnected){G(z,{select:!0});return}const M=r.getActiveElement();M&&F(M)&&M.blur()}}))}}}const to={disposed:!0,dispose:()=>{}};function Je(e){return e?e.nodeType===1?e:e.parentElement:null}function dn(e){var i,a;const t=(a=(i=Je(e.getNode()))==null?void 0:i.getRootNode)==null?void 0:a.call(i);if(!t||!(Ee(t)||wt(t)))return to;const o=t,n=f=>{var c;const s=f.target;s instanceof HTMLFormElement&&((c=Je(e.getNode()))==null?void 0:c.closest("form"))===s&&(f.defaultPrevented||e.onReset())};o.addEventListener("reset",n);let r=!1;return{get disposed(){return r},dispose:()=>{r||(r=!0,o.removeEventListener("reset",n))}}}function oo(e=globalThis.window){return typeof(e==null?void 0:e.matchMedia)!="function"?!1:e.matchMedia("(prefers-reduced-motion: reduce)").matches}function no(e,t=globalThis.window){if(typeof(t==null?void 0:t.matchMedia)!="function")return()=>{};const o=t.matchMedia("(prefers-reduced-motion: reduce)"),n=()=>e(o.matches);return o.addEventListener("change",n),()=>o.removeEventListener("change",n)}const ro=ke(()=>({count:0,savedScrollY:0,saved:{position:"",top:"",width:"",overflow:""},shards:new Set,onViewportChange:null}));function io(e,t){var i;const o=e.defaultView??window,n=e.body;t.savedScrollY=o.scrollY,t.saved={position:n.style.position,top:n.style.top,width:n.style.width,overflow:n.style.overflow},n.style.position="fixed",n.style.top=`-${t.savedScrollY}px`,n.style.width="100%",n.style.overflow="hidden";const r=()=>{n.style.top=`-${t.savedScrollY}px`};t.onViewportChange=r,o.addEventListener("orientationchange",r),(i=o.visualViewport)==null||i.addEventListener("resize",r)}function ao(e,t){var r;const o=e.defaultView??window,n=e.body;n.style.position=t.saved.position,n.style.top=t.saved.top,n.style.width=t.saved.width,n.style.overflow=t.saved.overflow,t.onViewportChange&&(o.removeEventListener("orientationchange",t.onViewportChange),(r=o.visualViewport)==null||r.removeEventListener("resize",t.onViewportChange),t.onViewportChange=null),o.scrollTo(0,t.savedScrollY)}function pn(e){var i;const t=e.config.scope.getDoc(),o=ro.get(t),n=new Set;let r=!1;for(const a of((i=e.shards)==null?void 0:i.call(e))??[])o.shards.add(a),n.add(a);return o.count===0&&io(t,o),o.count+=1,{addShard(a){return o.shards.add(a),n.add(a),()=>{o.shards.delete(a),n.delete(a)}},dispose(){if(!r){r=!0;for(const a of n)o.shards.delete(a);n.clear(),o.count-=1,o.count===0&&ao(t,o)}}}}const uo={top:0,left:0,viewport:0,content:0};function so(e){const t=e.getDoc();return t.scrollingElement??t.documentElement}function co(e,t){return!!t&&e.top===t.top&&e.left===t.left&&e.viewport===t.viewport&&e.content===t.content}function lo(e,t){const o=e??so(t);return{top:o.scrollTop,left:o.scrollLeft,viewport:o.clientHeight,content:o.scrollHeight}}function fo(e,t){return e??t.getWin()}function mn(e,t,o,n){if(e){typeof e.scrollTo=="function"?e.scrollTo({top:o,behavior:n}):e.scrollTop=o;return}const r=t.getWin();typeof r.scrollTo=="function"&&r.scrollTo({top:o,behavior:n})}function _n(e){const t=e.scope.getWin(),o=e.container(),n=fo(o,e.scope);let r=uo,i=!1;function a(){var d;if(i)return;const c=lo(o,e.scope);co(c,r)||(r=c,(d=e.onChange)==null||d.call(e,r))}const f=()=>a(),s=()=>a();return n.addEventListener("scroll",f,{passive:!0}),t.addEventListener("resize",s),a(),{metrics:()=>r,dispose(){i||(i=!0,n.removeEventListener("scroll",f),t.removeEventListener("resize",s))}}}function vn(e){const t={};for(const o of Object.keys(e))t[o]=e[o].default;return t}function po(e,t){if(t===void 0)return e.default;switch(e.kind){case"number":{const o=typeof t=="number"?t:Number(t);return Number.isFinite(o)?Math.min(e.max,Math.max(e.min,o)):e.default}case"boolean":return typeof t=="boolean"?t:!!t;case"enum":return typeof t=="string"&&e.values.includes(t)?t:e.default;case"color":return typeof t=="string"&&at(t)?t:e.default}}function Q(e,t){const o={};for(const n of Object.keys(e))o[n]=po(e[n],t==null?void 0:t[n]);return o}function at(e){return/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(e)}function mo(e){if(!at(e))return[0,0,0];let t=e.slice(1);t.length===3&&(t=t[0]+t[0]+t[1]+t[1]+t[2]+t[2]);const o=Number.parseInt(t,16);return[(o>>16&255)/255,(o>>8&255)/255,(o&255)/255]}function u(e,t){const o=e[t];return typeof o=="number"?o:0}function _o(e,t){const o=e[t];return typeof o=="string"?o:""}function h(e,t){return mo(_o(e,t))}function p(e,t,o,n,r){return{kind:"number",label:e,min:t,max:o,step:n,default:r}}function v(e,t){return{kind:"color",label:e,default:t}}function ut(e,t){return{kind:"boolean",label:e,default:t}}const D=p("速度",0,3,.05,1),R=p("强度",0,2,.05,1),I=p("不透明度",0,1,.01,1),Y=p("指针影响",0,2,.05,1),U=p("噪点",0,1,.01,.2),L=p("随机种子",0,999,1,0),vo={name:"particles",params:{background:v("底色","#05060a"),backgroundOpacity:p("底色不透明度",0,1,.01,0),speed:D,opacity:I,pointSize:p("点大小",.2,8,.05,2.2),zoom:p("缩放",.2,3,.01,.85),yaw:p("水平旋转",-3.15,3.15,.01,0),pitch:p("俯仰",-1.2,1.2,.01,0),autorotate:ut("自动旋转",!0),spin:p("自转速度",-2,2,.01,.25),depthFade:p("景深淡出",0,1,.01,.45),turbulence:p("湍流",0,2,.01,.35),noiseScale:p("湍流尺度",.2,6,.05,1.7),swirl:p("涡旋",0,2,.01,.3),breathe:p("呼吸",0,1,.01,.25),pointer:Y,seed:L},shared:`
uniform vec3 u_bg;
uniform float u_bgOpacity;
uniform float u_speed;
uniform float u_turbulence;
uniform float u_noiseScale;
uniform float u_swirl;
uniform float u_breathe;
uniform float u_pointerGain;
uniform float u_seed;
`,fragment:`
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float vignette = 1.0 - 0.35 * pow(length(uv - 0.5) * 1.4, 2.2);
  vec3 col = u_bg * vignette;
  fragColor = vec4(col * u_bgOpacity, u_bgOpacity);
}
`,particles:{mode:"cloud",body:`
vec3 displace(vec3 p, float seed, float t) {
  float tt = t * u_speed;

  /* 整体呼吸 */
  p *= 1.0 + sin(tt * 1.2 + seed * 6.2831) * u_breathe * 0.06;

  /* 每点各自的低频湍流 */
  vec3 q = p * u_noiseScale + vec3(seed * 7.3);
  vec3 n = vec3(
    vnoise(q + vec3(0.0, 0.0, tt * 0.6)),
    vnoise(q + vec3(5.2, 1.3, tt * 0.6)),
    vnoise(q + vec3(9.7, 4.4, tt * 0.6))
  ) - 0.5;
  p += n * u_turbulence * 0.12;

  /* 绕竖轴的涡旋，越靠近轴心转得越快 */
  float r = length(p.xz);
  float a = u_swirl * 0.6 * exp(-r * 1.2) * sin(tt * 0.7 + seed * 6.2831);
  float ca = cos(a), sa = sin(a);
  p.xz = vec2(p.x * ca - p.z * sa, p.x * sa + p.z * ca);

  /* 指针斥力：把点从指针处推开 */
  vec2 pm = (u_pointer - 0.5) * 2.0;
  vec2 d = p.xy - pm;
  float f = exp(-dot(d, d) * 4.0) * u_pointerAmt * u_pointerGain;
  p.xy += normalize(d + vec2(1e-4)) * f * 0.35;

  return p;
}
`},uniforms:e=>{const t=e.params,o=t.autorotate===!0,n=u(t,"spin");return{u_bg:h(t,"background"),u_bgOpacity:u(t,"backgroundOpacity"),u_speed:u(t,"speed"),u_turbulence:u(t,"turbulence"),u_noiseScale:u(t,"noiseScale"),u_swirl:u(t,"swirl"),u_breathe:u(t,"breathe"),u_pointerGain:u(t,"pointer"),u_seed:u(t,"seed"),u_yaw:u(t,"yaw")+(o?e.time*n:0),u_pitch:u(t,"pitch"),u_zoom:u(t,"zoom"),u_pointSize:u(t,"pointSize"),u_depthFade:u(t,"depthFade"),u_alpha:u(t,"opacity")}},fallback:e=>u(e,"backgroundOpacity")>0?e.background:"transparent"},ho={name:"plasma",params:{fill:v("填充色","#7d0f24"),glow:v("辉光色","#ff5a1f"),background:v("底色","#160d10"),progress:p("进度",0,1,.001,.62),speed:D,intensity:R,opacity:I,turbulence:p("边界抖动",0,2,.05,1),sparks:p("火花密度",0,1,.01,.5),grain:U,seed:L},shared:`
uniform vec3 u_fill;
uniform vec3 u_glow;
uniform vec3 u_bg;
uniform float u_progress;
uniform float u_speed;
uniform float u_intensity;
uniform float u_opacity;
uniform float u_turbulence;
uniform float u_grain;
uniform float u_seed;

/* 两个通道共用：火花必须诞生在它出生那一刻的边界上，否则会像贴上去的 */
float edgeAt(float y, float t) {
  float big   = fbm3(vec3(y * 2.6, t * 0.42, u_seed));
  float fine  = fbm3(vec3(y * 9.0, t * 1.35, u_seed + 4.0));
  float razor = vnoise(vec3(y * 26.0, t * 3.1, u_seed + 9.0));
  return u_progress
       + ((big - 0.5) * 0.055 + (fine - 0.5) * 0.030 + (razor - 0.5) * 0.012) * u_turbulence;
}
`,fragment:`
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float aspect = aspectOf();
  float t = u_time * u_speed;

  float edge = edgeAt(uv.y, t);
  float d = (uv.x - edge) * aspect;

  vec3 wp = vec3(uv.x * 2.2, uv.y * 3.0, t * 0.22 + u_seed);
  float w1 = fbm3(wp * 1.9);
  float w2 = fbm3(wp * 1.9 + vec3(3.7, 8.1, 1.2));
  float turb = fbm(wp + vec3(w1, w2, 0.0) * 1.2);

  float dark = fbm3(vec3(uv * vec2(2.2, 3.4), t * 0.11 + u_seed));
  vec3 col = u_bg + u_glow * dark * 0.07;

  vec3 body = u_fill * (0.35 + 1.20 * turb);
  body += u_glow * pow(turb, 3.0) * 0.40;
  float toEdge = clamp(uv.x / max(edge, 0.0001), 0.0, 1.0);
  body *= mix(0.42, 1.28, pow(toEdge, 1.6));
  col = mix(col, body, smoothstep(0.006, -0.006, d));

  float side = d < 0.0 ? 1.35 : 1.0;
  float halo = exp(-abs(d) * 10.0) * 0.50 * side + exp(-abs(d) * 44.0) * 0.85;
  float core = exp(-abs(d) * 170.0);
  col += u_glow * halo * u_intensity;
  col += mix(u_glow, vec3(1.0), 0.72) * core * 1.25 * u_intensity;

  col *= 1.0 - 0.26 * pow(abs(uv.y - 0.5) * 2.0, 3.0);
  col += grain(uv, t) * u_grain * 0.09;
  fragColor = vec4(col * u_opacity, u_opacity);
}
`,particles:{mode:"procedural",count:e=>Math.round(1400*(typeof e.sparks=="number"?e.sparks:.5)),body:`
void particle(int id, out vec2 pos, out float size, out vec4 color) {
  float fid = float(id);
  vec3 h = hash33(fid * 1.37 + u_seed * 13.0);
  float aspect = aspectOf();
  float t = u_time * u_speed;

  float life = 0.55 + h.z * 1.30;
  float ph = fract(t / life + h.x * 7.31);
  float age = ph * life;
  float born = t - age;

  float y0 = h.y;
  vec2 p = vec2(edgeAt(y0, born), y0);

  /* 八成火花甩向未填充侧，两成回卷成填充体内的余烬 */
  float dir = h.z > 0.80 ? -0.55 : 1.0;
  float speed = 0.06 + h.x * 0.42;
  vec2 c = curl(vec2(y0 * 3.2 + h.x * 6.0, born * 0.8), t * 0.25);
  p.x += dir * (age * speed + age * age * 0.30) / aspect;
  p.y += (c.y * 0.045 + (h.x - 0.5) * 0.11) * age;

  float fade = smoothstep(0.0, 0.08, ph) * (1.0 - smoothstep(0.28, 1.0, ph));
  float heat = pow(1.0 - ph, 2.6);

  pos = p;
  size = (0.7 + h.z * 3.4) * (0.35 + heat * 0.9);
  color = vec4(mix(u_glow, vec3(1.0), heat * 0.85), fade * (0.20 + h.z * 0.80) * u_opacity * u_intensity);
}
`},uniforms:e=>{const t=e.params;return{u_fill:h(t,"fill"),u_glow:h(t,"glow"),u_bg:h(t,"background"),u_progress:u(t,"progress"),u_speed:u(t,"speed"),u_intensity:u(t,"intensity"),u_opacity:u(t,"opacity"),u_turbulence:u(t,"turbulence"),u_grain:u(t,"grain"),u_seed:u(t,"seed")}},fallback:e=>`linear-gradient(90deg, ${e.fill} 0%, ${e.glow} ${Math.round(u(e,"progress")*100)}%, ${e.background} ${Math.round(u(e,"progress")*100)+2}%)`},go={name:"aurora",scale:.7,params:{background:v("底色","#0a0a0c"),tint:v("主色","#ff7a2a"),cool:v("冷色","#4aa8ff"),mote:v("光尘色","#ffc79a"),speed:D,intensity:R,opacity:I,level:p("律动",0,1,.01,.6),band:p("光带宽度",.5,4,.05,2.5),motes:p("光尘密度",0,1,.01,.4),grain:U,seed:L},shared:`
uniform vec3 u_bg;
uniform vec3 u_tint;
uniform vec3 u_cool;
uniform vec3 u_mote;
uniform float u_speed;
uniform float u_intensity;
uniform float u_opacity;
uniform float u_level;
uniform float u_band;
uniform float u_grain;
uniform float u_seed;

float field(vec2 p, float off, float t) {
  vec3 b = vec3(p * 1.5 + vec2(off, off * 0.35), t);
  float w1 = fbm3(b * 1.25);
  float w2 = fbm3(b * 1.25 + vec3(5.1, 2.3, 0.0));
  return fbm3(b + vec3(w1, w2, 0.0) * 1.7);
}

float streakMask(vec2 uv) {
  float band = exp(-pow((uv.y - 0.5) * u_band, 2.0));
  float right = smoothstep(0.16, 0.92, uv.x);
  return band * right;
}
`,fragment:`
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float t = u_time * 0.10 * u_speed + u_seed;
  vec2 p = vec2(uv.x * aspectOf() - u_time * 0.025 * u_speed, uv.y);

  vec3 n = vec3(field(p, 0.0, t), field(p, 0.09, t), field(p, 0.18, t));
  n = smoothstep(0.30, 0.74, n);
  float e = smoothstep(0.34, 0.78, n.g);

  float mask = streakMask(uv) * (0.72 + u_level * 0.55);
  vec3 disp = mix(u_tint, u_cool, smoothstep(0.40, 0.92, uv.x));
  /* 常数项让光带任何时刻都在 */
  vec3 lit = (n * 0.55 + e * 0.35 + 0.28) * disp;
  vec3 col = u_bg + lit * mask * 1.7 * u_intensity;
  col += pow(e, 4.0) * mask * 0.5;
  /* 软肩曝光：高光平滑收敛而不是硬切到纯白 */
  col = vec3(1.0) - exp(-col * 1.3);

  col += grain(uv, t) * u_grain * 0.05;
  fragColor = vec4(col * u_opacity, u_opacity);
}
`,particles:{mode:"procedural",count:e=>Math.round(900*(typeof e.motes=="number"?e.motes:.4)),body:`
void particle(int id, out vec2 pos, out float size, out vec4 color) {
  vec3 h = hash33(float(id) * 1.61 + u_seed * 5.0);
  float t = u_time * u_speed;

  float life = 3.0 + h.z * 4.5;
  float ph = fract(t / life + h.x * 4.21);
  float age = ph * life;

  vec2 p = vec2(0.12 + h.x * 0.52, 0.5 + (h.y - 0.5) * 0.62);
  p.x += age * (0.045 + h.z * 0.085) * (0.7 + u_level * 0.6);
  p.y += sin(t * 0.7 + h.x * 9.0) * 0.028
       + curl(vec2(p.x * 3.0, p.y * 3.0), t * 0.2).y * 0.018;

  float fade = smoothstep(0.0, 0.14, ph) * (1.0 - smoothstep(0.62, 1.0, ph));

  pos = p;
  size = 1.4 + h.z * 5.5;
  color = vec4(mix(u_mote, vec3(1.0), h.z * 0.6),
               fade * streakMask(p) * (0.14 + h.y * 0.5) * (0.5 + u_level * 0.8) * u_opacity);
}
`},uniforms:e=>{const t=e.params;return{u_bg:h(t,"background"),u_tint:h(t,"tint"),u_cool:h(t,"cool"),u_mote:h(t,"mote"),u_speed:u(t,"speed"),u_intensity:u(t,"intensity"),u_opacity:u(t,"opacity"),u_level:u(t,"level"),u_band:u(t,"band"),u_grain:u(t,"grain"),u_seed:u(t,"seed")}},fallback:e=>`linear-gradient(100deg, ${e.background} 20%, ${e.tint} 62%, ${e.cool})`},yo={name:"beam",scale:.5,params:{background:v("底色","#070a16"),colorA:v("光带一","#4f7cff"),colorB:v("光带二","#a45cff"),colorC:v("光带三","#37e0c8"),speed:D,intensity:R,opacity:I,count:p("光带数量",1,6,1,3),tilt:p("倾角",-1.5,1.5,.05,.5),softness:p("柔和度",.05,1,.01,.45),grain:U,seed:L},fragment:`
uniform vec3 u_bg;
uniform vec3 u_colorA;
uniform vec3 u_colorB;
uniform vec3 u_colorC;
uniform float u_speed;
uniform float u_intensity;
uniform float u_opacity;
uniform float u_count;
uniform float u_tilt;
uniform float u_softness;
uniform float u_grain;
uniform float u_seed;

vec3 beamColor(int i) {
  if (i == 0) return u_colorA;
  if (i == 1) return u_colorB;
  if (i == 2) return u_colorC;
  return mix(u_colorA, u_colorC, float(i) * 0.25);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float t = u_time * u_speed;
  vec3 col = u_bg;

  for (int i = 0; i < 6; i++) {
    if (float(i) >= u_count) break;
    float fi = float(i);
    float phase = u_seed + fi * 2.37;
    /* 每条光带自己的横向位置与噪声扰动 */
    float axis = uv.x + uv.y * u_tilt;
    float center = 0.5 + 0.42 * sin(t * (0.13 + fi * 0.041) + phase);
    float wobble = (fbm3(vec3(uv.y * 2.2, t * 0.25 + fi, phase)) - 0.5) * 0.22;
    float d = (axis - center - wobble) / max(u_softness, 0.02);
    float band = exp(-d * d);
    col += beamColor(i) * band * (0.55 + 0.45 * sin(t * 0.7 + phase)) * u_intensity;
  }

  col = vec3(1.0) - exp(-col * 1.15);
  col += grain(uv, t) * u_grain * 0.05;
  fragColor = vec4(col * u_opacity, u_opacity);
}
`,uniforms:e=>{const t=e.params;return{u_bg:h(t,"background"),u_colorA:h(t,"colorA"),u_colorB:h(t,"colorB"),u_colorC:h(t,"colorC"),u_speed:u(t,"speed"),u_intensity:u(t,"intensity"),u_opacity:u(t,"opacity"),u_count:u(t,"count"),u_tilt:u(t,"tilt"),u_softness:u(t,"softness"),u_grain:u(t,"grain"),u_seed:u(t,"seed")}},fallback:e=>`linear-gradient(115deg, ${e.background}, ${e.colorA} 40%, ${e.colorB} 65%, ${e.background})`},Te=`
uniform vec3 u_colorA;
uniform vec3 u_colorB;
uniform vec3 u_colorC;
uniform vec3 u_colorD;
uniform float u_speed;
uniform float u_intensity;
uniform float u_opacity;
uniform float u_pointerGain;
uniform float u_grain;
uniform float u_seed;

/* 指针把流体推开，推力随距离指数衰减 */
vec2 push(vec2 p, float aspect) {
  vec2 pm = vec2(u_pointer.x * aspect, u_pointer.y);
  vec2 dir = p - pm;
  float infl = exp(-dot(dir, dir) * 7.0) * u_pointerAmt * u_pointerGain;
  return p + normalize(dir + vec2(1e-4)) * infl * 0.30;
}

/* 三级域扭曲。xy 是一级扭曲量，z 是最终密度 */
vec3 flowField(vec2 p, float t) {
  vec3 b = vec3(p * 1.35, t);
  vec2 q = vec2(fbm3(b), fbm3(b + vec3(4.3, 1.7, 0.0)));
  vec2 r = vec2(fbm3(b + vec3(q * 2.4, 0.0) + vec3(1.9, 9.2, 0.0)),
                fbm3(b + vec3(q * 2.4, 0.0) + vec3(8.3, 2.8, 0.0)));
  return vec3(q, fbm(b + vec3(r * 3.0, 0.0)));
}
`,bo=`
void particle(int id, out vec2 pos, out float size, out vec4 color) {
  float fid = float(id);
  vec3 h = hash33(fid * 2.11 + u_seed * 9.0);
  float aspect = aspectOf();

  float life = 5.0 + h.z * 7.0;
  float ph = fract(u_time * max(u_speed, 0.02) / life + h.x * 3.77);
  float age = ph * life;

  vec2 p = vec2(h.x * aspect, h.y);
  float t = u_time * 0.09 * u_speed + u_seed;
  p += curl(p * 1.5 + h.xy * 4.0, t) * 0.030 * age;
  p += curl(p * 1.5, t + 0.6) * 0.022 * age;
  p = push(p, aspect);

  float fade = smoothstep(0.0, 0.16, ph) * (1.0 - smoothstep(0.72, 1.0, ph));
  vec3 tint = mix(u_colorA, u_colorD, h.z);

  pos = vec2(p.x / aspect, p.y);
  size = 2.0 + h.z * 9.0;
  color = vec4(mix(tint * 0.75, vec3(1.0), h.x * 0.55), fade * (0.10 + h.y * 0.26) * u_opacity);
}
`;function $e(e){const t=e.params;return{u_colorA:h(t,"colorA"),u_colorB:h(t,"colorB"),u_colorC:h(t,"colorC"),u_colorD:h(t,"colorD"),u_speed:u(t,"speed"),u_intensity:u(t,"intensity"),u_opacity:u(t,"opacity"),u_pointerGain:u(t,"pointer"),u_grain:u(t,"grain"),u_seed:u(t,"seed")}}const st={colorA:v("主色","#ff2f92"),colorB:v("副色","#ff9a3c"),colorC:v("高光","#ffd2e2"),colorD:v("点缀","#ff5aa5")},wo={name:"fluid",scale:.6,params:{...st,speed:D,intensity:R,opacity:I,pointer:Y,grain:U,density:p("微粒密度",0,1,.01,.5),seed:L},shared:Te,fragment:`
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float aspect = aspectOf();
  float t = u_time * 0.09 * u_speed + u_seed;
  vec2 p = push(vec2(uv.x * aspect, uv.y), aspect);

  vec3 fl = flowField(p, t);
  vec2 q = fl.xy;
  float f = fl.z;

  vec3 col = mix(u_colorA, u_colorB, clamp(f * 2.1, 0.0, 1.0));
  col = mix(col, u_colorC, clamp(length(q) * 1.25 - 0.18, 0.0, 1.0));
  col = mix(col, u_colorD, clamp(q.y * 1.7 - 0.25, 0.0, 1.0));
  col *= 0.86 + 0.50 * f * u_intensity;
  col += grain(uv, t) * u_grain * 0.06;

  fragColor = vec4(col * u_opacity, u_opacity);
}
`,particles:{mode:"procedural",count:e=>Math.round(520*(typeof e.density=="number"?e.density:.5)*2),body:bo,blend:"normal"},uniforms:$e,fallback:e=>`linear-gradient(135deg, ${e.colorA}, ${e.colorB} 45%, ${e.colorD})`},xo={name:"glass",scale:.7,params:{colorA:v("主色","#3aa0ff"),colorB:v("副色","#7b5cff"),colorC:v("高光","#8ffff0"),colorD:v("阴影","#0b1b3a"),speed:D,intensity:R,opacity:p("不透明度",0,1,.01,.55),pointer:Y,grain:p("噪点",0,1,.01,.1),sheen:p("镜面高光",0,2,.05,1),seed:L},shared:`${Te}
uniform float u_sheen;
`,fragment:`
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float aspect = aspectOf();
  float t = u_time * 0.08 * u_speed + u_seed;
  vec2 p = push(vec2(uv.x * aspect, uv.y), aspect);

  vec3 fl = flowField(p, t);
  vec2 q = fl.xy;
  float f = fl.z;

  float body = smoothstep(0.18, 0.86, f * 0.62 + length(q) * 0.38);
  vec3 col = mix(u_colorA, u_colorB, body);
  float shade = smoothstep(0.42, 0.85, fbm3(vec3(q * 2.6, t)) * 0.7 + 0.3);
  col = mix(col, u_colorD, shade * 0.62);

  /* 高光与焦散：玻璃的厚度感几乎全靠这两项 */
  float spec = pow(clamp(1.0 - abs(f - 0.52) * 2.0, 0.0, 1.0), 5.0);
  float caustic = pow(clamp(0.52 + 0.48 * sin((q.x - q.y) * 5.2 + f * 7.0 - t * 1.8), 0.0, 1.0), 7.0);
  col = mix(col, u_colorC, (spec * 0.30 + caustic * 0.16) * u_sheen);

  /* 指针处玻璃变厚一点 */
  vec2 dir = vec2(uv.x * aspect, uv.y) - vec2(u_pointer.x * aspect, u_pointer.y);
  float lens = exp(-dot(dir, dir) * 6.0) * u_pointerAmt * u_pointerGain;

  float alpha = clamp((0.30 + body * 0.46 + spec * 0.20 + lens * 0.25) * u_intensity, 0.0, 1.0) * u_opacity;
  col += grain(uv, t) * u_grain * 0.05;
  fragColor = vec4(col * alpha, alpha);
}
`,uniforms:e=>({...$e(e),u_sheen:u(e.params,"sheen")}),fallback:e=>`linear-gradient(120deg, ${e.colorA}55, ${e.colorB}66 60%, ${e.colorC}44)`},Eo={name:"mesh",scale:.4,params:{...st,speed:p("速度",0,3,.05,.5),intensity:R,opacity:I,pointer:p("指针影响",0,2,.05,.5),grain:p("噪点",0,1,.01,.1),softness:p("柔和度",0,1,.01,.7),seed:L},shared:`${Te}
uniform float u_softness;
`,fragment:`
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float aspect = aspectOf();
  float t = u_time * 0.05 * u_speed + u_seed;
  vec2 p = push(vec2(uv.x * aspect, uv.y), aspect);

  /* 四个缓慢游走的色心，按距离加权混合 */
  vec2 c0 = vec2(aspect * 0.28 + 0.16 * sin(t * 0.9 + u_seed), 0.30 + 0.14 * cos(t * 0.7));
  vec2 c1 = vec2(aspect * 0.74 + 0.14 * cos(t * 0.6 - u_seed), 0.26 + 0.16 * sin(t * 0.8));
  vec2 c2 = vec2(aspect * 0.34 + 0.18 * sin(t * 0.5), 0.76 + 0.12 * cos(t * 0.9 + u_seed));
  vec2 c3 = vec2(aspect * 0.80 + 0.12 * cos(t * 0.8), 0.72 + 0.15 * sin(t * 0.6 - u_seed));

  float k = mix(6.0, 1.6, u_softness);
  float w0 = exp(-dot(p - c0, p - c0) * k);
  float w1 = exp(-dot(p - c1, p - c1) * k);
  float w2 = exp(-dot(p - c2, p - c2) * k);
  float w3 = exp(-dot(p - c3, p - c3) * k);
  float sum = max(w0 + w1 + w2 + w3, 1e-4);

  vec3 col = (u_colorA * w0 + u_colorB * w1 + u_colorC * w2 + u_colorD * w3) / sum;
  col *= 0.82 + 0.42 * fbm3(vec3(p * 1.1, t)) * u_intensity;
  col += grain(uv, t) * u_grain * 0.05;

  fragColor = vec4(col * u_opacity, u_opacity);
}
`,uniforms:e=>({...$e(e),u_softness:u(e.params,"softness")}),fallback:e=>`radial-gradient(at 25% 30%, ${e.colorA}, transparent 55%), radial-gradient(at 78% 26%, ${e.colorB}, transparent 55%), radial-gradient(at 32% 76%, ${e.colorC}, transparent 55%), ${e.colorD}`},Ao={name:"grain",params:{color:v("颗粒色","#ffffff"),opacity:p("不透明度",0,1,.01,.12),scale:p("颗粒粗细",.2,4,.05,1),speed:p("速度",0,3,.05,1),monochrome:ut("单色",!0)},fragment:`
uniform vec3 u_color;
uniform float u_opacity;
uniform float u_scale;
uniform float u_speed;
uniform float u_mono;
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float t = floor(u_time * u_speed * 24.0);
  vec2 g = uv * u_resolution / max(u_scale, 0.05);
  float n = hash13(vec3(g, t));
  vec3 col = u_mono > 0.5
    ? u_color * n
    : vec3(hash13(vec3(g, t)), hash13(vec3(g, t + 7.0)), hash13(vec3(g, t + 19.0))) * u_color;
  float a = u_opacity * n;
  fragColor = vec4(col * a, a);
}
`,uniforms:e=>({u_color:h(e.params,"color"),u_opacity:u(e.params,"opacity"),u_scale:u(e.params,"scale"),u_speed:u(e.params,"speed"),u_mono:e.params.monochrome===!0?1:0}),fallback:()=>"transparent"},de=new Map;function Co(e){de.set(e.name,e)}function So(e){for(const t of e)Co(t)}function hn(e){return de.get(e)}function gn(){return[...de.keys()]}function Se(e){if(typeof e!="string")return e;const t=de.get(e);if(t===void 0)throw new Error(`[backgrounds] 未注册的效果：${e}。先调用 registerEffect() 或直接传效果对象。`);return t}const ko={name:"starfield",params:{background:v("底色","#04050c"),star:v("星点色","#ffffff"),accent:v("点缀色","#8ab4ff"),speed:D,intensity:R,opacity:I,density:p("星点密度",0,1,.01,.5),twinkle:p("闪烁",0,1,.01,.6),drift:p("漂移",0,1,.01,.25),parallax:Y,grain:U,seed:L},shared:`
uniform vec3 u_bg;
uniform vec3 u_star;
uniform vec3 u_accent;
uniform float u_speed;
uniform float u_intensity;
uniform float u_opacity;
uniform float u_twinkle;
uniform float u_drift;
uniform float u_parallax;
uniform float u_grain;
uniform float u_seed;
`,fragment:`
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float t = u_time * u_speed;
  /* 底色带一点极缓慢的星云，避免纯色背景显得死 */
  float haze = fbm3(vec3(uv * vec2(aspectOf(), 1.0) * 1.4, t * 0.03 + u_seed));
  vec3 col = u_bg + u_accent * pow(haze, 3.0) * 0.18 * u_intensity;
  col += grain(uv, t) * u_grain * 0.04;
  fragColor = vec4(col * u_opacity, u_opacity);
}
`,particles:{mode:"procedural",count:e=>Math.round(2600*(typeof e.density=="number"?e.density:.5)),body:`
void particle(int id, out vec2 pos, out float size, out vec4 color) {
  float fid = float(id);
  vec3 h = hash33(fid * 1.29 + u_seed * 3.0);
  float t = u_time * u_speed;

  /* 三层深度，越近的层越大越亮、视差也越强 */
  float layer = floor(h.z * 3.0);
  float depth = (layer + 1.0) / 3.0;

  vec2 p = vec2(h.x, h.y);
  p.x = fract(p.x + t * 0.004 * u_drift * depth);
  vec2 offset = (u_pointer - 0.5) * u_pointerAmt * u_parallax * 0.06 * depth;
  p += offset;

  float phase = h.x * 43.0 + h.y * 17.0;
  float tw = mix(1.0, 0.35 + 0.65 * pow(0.5 + 0.5 * sin(t * (1.2 + h.z * 2.4) + phase), 2.0), u_twinkle);

  pos = fract(p);
  size = (0.6 + h.z * 2.2) * depth * 1.4;
  color = vec4(mix(u_star, u_accent, step(0.86, h.x)),
               tw * depth * (0.25 + h.y * 0.6) * u_opacity * u_intensity);
}
`},uniforms:e=>{const t=e.params;return{u_bg:h(t,"background"),u_star:h(t,"star"),u_accent:h(t,"accent"),u_speed:u(t,"speed"),u_intensity:u(t,"intensity"),u_opacity:u(t,"opacity"),u_twinkle:u(t,"twinkle"),u_drift:u(t,"drift"),u_parallax:u(t,"parallax"),u_grain:u(t,"grain"),u_seed:u(t,"seed")}},fallback:e=>`radial-gradient(ellipse at 50% 40%, ${e.accent}22, ${e.background} 70%)`},zo={name:"nebula",scale:.6,params:{background:v("底色","#050416"),colorA:v("云色一","#4c2a86"),colorB:v("云色二","#0f5fa8"),colorC:v("高光","#ff9ad4"),star:v("星点色","#ffffff"),speed:D,intensity:R,opacity:I,density:p("星点密度",0,1,.01,.35),contrast:p("对比",.2,3,.05,1.2),grain:U,seed:L},shared:`
uniform vec3 u_bg;
uniform vec3 u_colorA;
uniform vec3 u_colorB;
uniform vec3 u_colorC;
uniform vec3 u_star;
uniform float u_speed;
uniform float u_intensity;
uniform float u_opacity;
uniform float u_contrast;
uniform float u_grain;
uniform float u_seed;
`,fragment:`
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec2 p = vec2(uv.x * aspectOf(), uv.y);
  float t = u_time * 0.05 * u_speed + u_seed;

  float w1 = fbm3(vec3(p * 1.7, t));
  float w2 = fbm3(vec3(p * 1.7 + vec2(3.4, 7.1), t * 1.3));
  float d = fbm(vec3(p * 2.1 + vec2(w1, w2) * 1.8, t * 0.7));

  float shaped = pow(clamp(d * 1.6 - 0.18, 0.0, 1.0), u_contrast);
  vec3 col = u_bg;
  col = mix(col, u_colorA, shaped);
  col = mix(col, u_colorB, clamp(w2 * 1.4 - 0.35, 0.0, 1.0) * shaped);
  col += u_colorC * pow(shaped, 4.0) * 0.9 * u_intensity;

  col = vec3(1.0) - exp(-col * 1.2);
  col += grain(uv, t) * u_grain * 0.05;
  fragColor = vec4(col * u_opacity, u_opacity);
}
`,particles:{mode:"procedural",count:e=>Math.round(1600*(typeof e.density=="number"?e.density:.35)),body:`
void particle(int id, out vec2 pos, out float size, out vec4 color) {
  vec3 h = hash33(float(id) * 1.71 + u_seed * 11.0);
  float t = u_time * u_speed;
  float tw = 0.4 + 0.6 * pow(0.5 + 0.5 * sin(t * (0.8 + h.z * 2.0) + h.x * 31.0), 2.0);
  pos = vec2(h.x, h.y);
  size = 0.6 + h.z * 2.4;
  color = vec4(mix(u_star, u_colorC, h.z * 0.5), tw * (0.2 + h.y * 0.6) * u_opacity * u_intensity);
}
`},uniforms:e=>{const t=e.params;return{u_bg:h(t,"background"),u_colorA:h(t,"colorA"),u_colorB:h(t,"colorB"),u_colorC:h(t,"colorC"),u_star:h(t,"star"),u_speed:u(t,"speed"),u_intensity:u(t,"intensity"),u_opacity:u(t,"opacity"),u_contrast:u(t,"contrast"),u_grain:u(t,"grain"),u_seed:u(t,"seed")}},fallback:e=>`radial-gradient(at 35% 35%, ${e.colorA}, transparent 55%), radial-gradient(at 70% 65%, ${e.colorB}, transparent 55%), ${e.background}`},Oo={name:"flow-field",params:{background:v("底色","#0a0c14"),colorA:v("粒子色一","#7cf6d0"),colorB:v("粒子色二","#5b8cff"),speed:D,intensity:R,opacity:I,density:p("粒子密度",0,1,.01,.6),scaleField:p("流场尺度",.4,6,.05,2),stride:p("步长",.1,3,.05,1),pointer:Y,grain:U,seed:L},shared:`
uniform vec3 u_bg;
uniform vec3 u_colorA;
uniform vec3 u_colorB;
uniform float u_speed;
uniform float u_intensity;
uniform float u_opacity;
uniform float u_scaleField;
uniform float u_stride;
uniform float u_pointerGain;
uniform float u_grain;
uniform float u_seed;
`,fragment:`
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float t = u_time * u_speed;
  vec3 col = u_bg + u_colorB * fbm3(vec3(uv * 2.0, t * 0.05 + u_seed)) * 0.06 * u_intensity;
  col += grain(uv, t) * u_grain * 0.04;
  fragColor = vec4(col * u_opacity, u_opacity);
}
`,particles:{mode:"procedural",count:e=>Math.round(4e3*(typeof e.density=="number"?e.density:.6)),body:`
void particle(int id, out vec2 pos, out float size, out vec4 color) {
  float fid = float(id);
  vec3 h = hash33(fid * 1.47 + u_seed * 17.0);
  float aspect = aspectOf();
  float t = u_time * u_speed;

  float life = 2.2 + h.z * 3.4;
  float ph = fract(t / life + h.x * 8.13);
  float age = ph * life;

  vec2 p = vec2(h.x * aspect, h.y);
  /* 两步近似积分：一次用出生时刻的场，一次用当前场 */
  float born = t - age;
  p += curl(p * u_scaleField, born * 0.2 + u_seed) * 0.05 * u_stride * age;
  p += curl(p * u_scaleField, t * 0.2 + u_seed) * 0.04 * u_stride * age;

  vec2 pm = vec2(u_pointer.x * aspect, u_pointer.y);
  vec2 dir = p - pm;
  p += normalize(dir + vec2(1e-4)) * exp(-dot(dir, dir) * 8.0) * u_pointerAmt * u_pointerGain * 0.12;

  float fade = smoothstep(0.0, 0.12, ph) * (1.0 - smoothstep(0.55, 1.0, ph));

  pos = vec2(p.x / aspect, p.y);
  size = 0.8 + h.z * 2.4;
  color = vec4(mix(u_colorA, u_colorB, h.z), fade * (0.12 + h.y * 0.42) * u_opacity * u_intensity);
}
`},uniforms:e=>{const t=e.params;return{u_bg:h(t,"background"),u_colorA:h(t,"colorA"),u_colorB:h(t,"colorB"),u_speed:u(t,"speed"),u_intensity:u(t,"intensity"),u_opacity:u(t,"opacity"),u_scaleField:u(t,"scaleField"),u_stride:u(t,"stride"),u_pointerGain:u(t,"pointer"),u_grain:u(t,"grain"),u_seed:u(t,"seed")}},fallback:e=>`linear-gradient(140deg, ${e.background}, ${e.colorB}33, ${e.background})`},To={name:"ripple",params:{background:v("底色","#0d0906"),glow:v("辉光色","#ff8a1e"),speed:D,intensity:R,opacity:I,pulse:p("脉冲",0,1,.01,0),density:p("波纹密度",20,320,1,150),falloff:p("衰减",.5,10,.1,3.6),squash:p("横向压扁",.1,1,.01,.42),originX:p("热点横向",0,1,.01,.62),originY:p("热点纵向",0,1,.01,.5),pointer:Y,sparks:p("粒子密度",0,1,.01,.5),grain:U,seed:L},shared:`
uniform vec3 u_bg;
uniform vec3 u_glow;
uniform float u_speed;
uniform float u_intensity;
uniform float u_opacity;
uniform float u_pulse;
uniform float u_density;
uniform float u_falloff;
uniform float u_squash;
uniform vec2 u_origin;
uniform float u_pointerGain;
uniform float u_grain;
uniform float u_seed;

vec2 hotCenter() {
  return mix(u_origin, u_pointer, clamp(u_pointerAmt * u_pointerGain, 0.0, 1.0) * 0.75);
}

/* 波前半径：横向压扁成椭圆 */
float ringRadius(vec2 uv, float aspect) {
  vec2 p = (uv - hotCenter()) * vec2(aspect, 1.0);
  p.x *= u_squash;
  return length(p);
}
`,fragment:`
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float aspect = aspectOf();
  float t = u_time * u_speed;
  vec2 pw = (uv - hotCenter()) * vec2(aspect, 1.0);

  float warp = (fbm3(vec3(pw * 2.6, t * 0.16 + u_seed)) - 0.5) * 0.10;
  float rr = max(ringRadius(uv, aspect) + warp, 0.0);

  float rings = sin(rr * u_density - t * 3.4 - u_pulse * 1.4);
  float band = smoothstep(0.05, 0.92, rings);
  float fall = exp(-rr * u_falloff);

  float lum = band * fall * (0.40 + u_pulse * 0.55) + fall * fall * 0.85 * (0.45 + u_pulse * 0.95);
  float core = exp(-rr * 26.0) * (0.8 + u_pulse * 2.4);

  vec3 col = u_bg + (u_glow * lum + mix(u_glow, vec3(1.0), 0.78) * core) * u_intensity;
  col *= 1.0 - 0.30 * pow(length((uv - 0.5) * vec2(1.05, 1.5)), 2.4);
  col += grain(uv, t) * u_grain * 0.07;
  fragColor = vec4(col * u_opacity, u_opacity);
}
`,particles:{mode:"procedural",count:e=>Math.round(1800*(typeof e.sparks=="number"?e.sparks:.5)),body:`
void particle(int id, out vec2 pos, out float size, out vec4 color) {
  vec3 h = hash33(float(id) * 1.93 + u_seed * 7.0);
  float aspect = aspectOf();
  float t = u_time * u_speed;

  float life = 1.5 + h.z * 2.6;
  float ph = fract(t / life + h.x * 5.13);
  float age = ph * life;

  float ang = h.y * 6.2831853;
  vec2 dir = vec2(cos(ang), sin(ang));
  float r = 0.015 + age * (0.075 + h.z * 0.13) * (0.8 + u_pulse * 0.5);
  vec2 off = vec2(dir.x / max(u_squash, 0.05), dir.y) * r;
  off += curl(off * 7.0 + h.xy * 4.0, t * 0.3) * 0.010;

  float fade = smoothstep(0.0, 0.10, ph) * (1.0 - smoothstep(0.30, 1.0, ph));
  float dist = exp(-r * (u_falloff * 0.9));

  pos = hotCenter() + vec2(off.x / aspect, off.y);
  size = (0.9 + h.z * 3.2) * (0.4 + dist * 0.9);
  color = vec4(mix(u_glow, vec3(1.0), pow(dist, 3.0) * 0.9),
               fade * dist * (0.22 + h.z * 0.7) * (0.6 + u_pulse * 0.7) * u_opacity * u_intensity);
}
`},uniforms:e=>{const t=e.params;return{u_bg:h(t,"background"),u_glow:h(t,"glow"),u_speed:u(t,"speed"),u_intensity:u(t,"intensity"),u_opacity:u(t,"opacity"),u_pulse:u(t,"pulse"),u_density:u(t,"density"),u_falloff:u(t,"falloff"),u_squash:u(t,"squash"),u_origin:[u(t,"originX"),u(t,"originY")],u_pointerGain:u(t,"pointer"),u_grain:u(t,"grain"),u_seed:u(t,"seed")}},fallback:e=>`radial-gradient(circle at 62% 50%, ${e.glow}, ${e.background} 62%)`},$o={name:"orb",scale:.7,params:{background:v("底色","#05060c"),core:v("核心色","#ffffff"),glow:v("辉光色","#5b8cff"),rim:v("边缘色","#b45cff"),speed:D,intensity:R,opacity:I,radius:p("半径",.05,.9,.01,.32),breath:p("呼吸幅度",0,1,.01,.18),fuzz:p("毛边",0,1,.01,.4),pointer:Y,grain:U,seed:L},fragment:`
uniform vec3 u_bg;
uniform vec3 u_core;
uniform vec3 u_glow;
uniform vec3 u_rim;
uniform float u_speed;
uniform float u_intensity;
uniform float u_opacity;
uniform float u_radius;
uniform float u_breath;
uniform float u_fuzz;
uniform float u_pointerGain;
uniform float u_grain;
uniform float u_seed;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float aspect = aspectOf();
  float t = u_time * u_speed;

  vec2 center = mix(vec2(0.5), u_pointer, clamp(u_pointerAmt * u_pointerGain, 0.0, 1.0) * 0.6);
  vec2 p = (uv - center) * vec2(aspect, 1.0);
  float r = length(p);

  float ang = atan(p.y, p.x);
  float edge = (fbm3(vec3(cos(ang) * 1.6, sin(ang) * 1.6, t * 0.5 + u_seed)) - 0.5) * u_fuzz * 0.22;
  float radius = u_radius * (1.0 + sin(t * 1.1 + u_seed) * u_breath) + edge;

  float body = smoothstep(radius, radius * 0.35, r);
  float halo = exp(-max(r - radius, 0.0) * 5.5);
  float rim = smoothstep(radius * 1.05, radius * 0.82, r) - smoothstep(radius * 0.82, radius * 0.45, r);

  vec3 col = u_bg;
  col += u_glow * halo * 0.55 * u_intensity;
  col += u_rim * max(rim, 0.0) * 0.9 * u_intensity;
  col += u_core * body * (0.55 + 0.35 * fbm3(vec3(p * 3.0, t * 0.6))) * u_intensity;
  col = vec3(1.0) - exp(-col * 1.25);
  col += grain(uv, t) * u_grain * 0.06;

  fragColor = vec4(col * u_opacity, u_opacity);
}
`,uniforms:e=>{const t=e.params;return{u_bg:h(t,"background"),u_core:h(t,"core"),u_glow:h(t,"glow"),u_rim:h(t,"rim"),u_speed:u(t,"speed"),u_intensity:u(t,"intensity"),u_opacity:u(t,"opacity"),u_radius:u(t,"radius"),u_breath:u(t,"breath"),u_fuzz:u(t,"fuzz"),u_pointerGain:u(t,"pointer"),u_grain:u(t,"grain"),u_seed:u(t,"seed")}},fallback:e=>`radial-gradient(circle at 50% 50%, ${e.core}, ${e.glow} 32%, ${e.background} 70%)`},Fo={name:"wave",scale:.6,params:{background:v("底色","#04121c"),colorA:v("近处","#0ea5b7"),colorB:v("远处","#1e3a8a"),speed:D,intensity:R,opacity:I,layers:p("层数",1,6,1,4),amplitude:p("振幅",0,.5,.005,.09),frequency:p("频率",.5,12,.1,3),baseline:p("基线",0,1,.01,.55),grain:U,seed:L},fragment:`
uniform vec3 u_bg;
uniform vec3 u_colorA;
uniform vec3 u_colorB;
uniform float u_speed;
uniform float u_intensity;
uniform float u_opacity;
uniform float u_layers;
uniform float u_amplitude;
uniform float u_frequency;
uniform float u_baseline;
uniform float u_grain;
uniform float u_seed;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float t = u_time * u_speed;
  vec3 col = u_bg;

  for (int i = 0; i < 6; i++) {
    if (float(i) >= u_layers) break;
    float fi = float(i);
    float depth = fi / max(u_layers - 1.0, 1.0);
    float amp = u_amplitude * (1.0 - depth * 0.45);
    float freq = u_frequency * (1.0 + depth * 0.6);
    float phase = t * (0.5 + depth * 0.5) + u_seed + fi * 1.7;

    float h = u_baseline - depth * 0.16
            + sin(uv.x * freq + phase) * amp
            + sin(uv.x * freq * 1.9 - phase * 0.7) * amp * 0.45
            + (fbm3(vec3(uv.x * 2.0, phase * 0.2, fi)) - 0.5) * amp * 0.8;

    float body = smoothstep(h + 0.006, h - 0.006, uv.y);
    float crest = exp(-abs(uv.y - h) * 140.0);
    vec3 layerColor = mix(u_colorA, u_colorB, depth);
    col = mix(col, layerColor * (0.55 + 0.45 * (1.0 - depth)), body * 0.85);
    col += layerColor * crest * 0.7 * u_intensity;
  }

  col += grain(uv, t) * u_grain * 0.05;
  fragColor = vec4(col * u_opacity, u_opacity);
}
`,uniforms:e=>{const t=e.params;return{u_bg:h(t,"background"),u_colorA:h(t,"colorA"),u_colorB:h(t,"colorB"),u_speed:u(t,"speed"),u_intensity:u(t,"intensity"),u_opacity:u(t,"opacity"),u_layers:u(t,"layers"),u_amplitude:u(t,"amplitude"),u_frequency:u(t,"frequency"),u_baseline:u(t,"baseline"),u_grain:u(t,"grain"),u_seed:u(t,"seed")}},fallback:e=>`linear-gradient(180deg, ${e.background} 45%, ${e.colorA} 55%, ${e.colorB})`},Mo=[wo,xo,Eo,Ao,ho,go,yo,To,$o,Fo,ko,zo,Oo,vo];function yn(){So(Mo)}const ue=new Set;let J=0,se=0;function ct(e){J=requestAnimationFrame(ct);const t=se===0?.016:Math.min((e-se)/1e3,.05);se=e;for(const o of ue)o.tick(t)}function Lo(){J!==0||typeof requestAnimationFrame!="function"||(se=0,J=requestAnimationFrame(ct))}function Do(){J!==0&&(cancelAnimationFrame(J),J=0)}function Ro(e){return ue.add(e),Lo(),()=>{ue.delete(e),ue.size===0&&Do()}}function lt(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let o=Math.imul(t^t>>>15,t|1);return o^=o+Math.imul(o^o>>>7,o|61),((o^o>>>14)>>>0)/4294967296}}function we(e,t,o,n){const r=new Float32Array(o*n);if(t<=0)return r;for(let i=0;i<o;i++){const a=t>=o?Math.min(t-1,Math.floor(i*t/o)):i%t;for(let f=0;f<n;f++)r[i*n+f]=e[a*n+f]??0}return r}function Ze(e,t,o){const n=new Float32Array(Math.max(e.length,t.length));for(let r=0;r<n.length;r++){const i=e[r]??0;n[r]=i+((t[r]??0)-i)*o}return n}function Io(e,t,o=1){const n=lt(o),r=new Float32Array(e*3);for(let i=0;i<e;i++){const a=n()*2-1,f=n()*Math.PI*2,s=t*(.75+n()*.45),c=Math.sqrt(Math.max(0,1-a*a));r[i*3]=Math.cos(f)*c*s,r[i*3+1]=Math.sin(f)*c*s,r[i*3+2]=a*s}return r}const Bo=`#version 300 es
precision highp float;
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`,Fe=`precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_pointer;
uniform float u_pointerAmt;
uniform float u_px;

float hash13(vec3 p) {
  p = fract(p * 0.1031);
  p += dot(p, p.zyx + 31.32);
  return fract((p.x + p.y) * p.z);
}

vec3 hash33(float n) {
  vec3 p = fract(vec3(n * 0.1031, n * 0.1030, n * 0.0973));
  p += dot(p, p.yxz + 33.33);
  return fract((p.xxy + p.yxx) * p.zyx);
}

float vnoise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash13(i + vec3(0.0, 0.0, 0.0)), hash13(i + vec3(1.0, 0.0, 0.0)), f.x),
        mix(hash13(i + vec3(0.0, 1.0, 0.0)), hash13(i + vec3(1.0, 1.0, 0.0)), f.x), f.y),
    mix(mix(hash13(i + vec3(0.0, 0.0, 1.0)), hash13(i + vec3(1.0, 0.0, 1.0)), f.x),
        mix(hash13(i + vec3(0.0, 1.0, 1.0)), hash13(i + vec3(1.0, 1.0, 1.0)), f.x), f.y),
    f.z);
}

float fbm3(vec3 p) {
  float s = 0.0, a = 0.5;
  for (int i = 0; i < 3; i++) { s += a * vnoise(p); p *= 2.07; a *= 0.5; }
  return s * 1.14;
}

float fbm(vec3 p) {
  float s = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { s += a * vnoise(p); p *= 2.03; a *= 0.5; }
  return s * 1.07;
}

vec2 curl(vec2 p, float t) {
  float e = 0.08;
  float n1 = fbm3(vec3(p.x, p.y + e, t));
  float n2 = fbm3(vec3(p.x, p.y - e, t));
  float n3 = fbm3(vec3(p.x + e, p.y, t));
  float n4 = fbm3(vec3(p.x - e, p.y, t));
  return vec2(n1 - n2, n4 - n3) / (2.0 * e);
}

float grain(vec2 uv, float t) { return hash13(vec3(uv * 1024.0, t)) - 0.5; }

float aspectOf() { return u_resolution.x / max(u_resolution.y, 1.0); }
`,Po=`#version 300 es
precision highp float;
in vec4 v_color;
out vec4 fragColor;
void main() {
  float r = length(gl_PointCoord - 0.5) * 2.0;
  float a = exp(-r * r * 3.6) * (1.0 - smoothstep(0.75, 1.0, r));
  a *= v_color.a;
  if (a < 0.002) discard;
  fragColor = vec4(v_color.rgb * a, a);
}`;function No(e,t){return`#version 300 es
${Fe}
${e}
out vec4 fragColor;
${t}`}function qo(e,t){return`#version 300 es
${Fe}
${e}
out vec4 v_color;
${t}
void main() {
  vec2 pos; float size; vec4 col;
  particle(gl_VertexID, pos, size, col);
  gl_Position = vec4(pos * 2.0 - 1.0, 0.0, 1.0);
  gl_PointSize = max(size * u_px, 1.0);
  v_color = col;
}`}function Vo(e,t){return`#version 300 es
${Fe}
${e}
in vec3 a_from;
in vec3 a_to;
in vec3 a_colorFrom;
in vec3 a_colorTo;
in vec2 a_meta;
out vec4 v_color;
uniform float u_morph;
uniform float u_yaw;
uniform float u_pitch;
uniform float u_zoom;
uniform float u_pointSize;
uniform float u_depthFade;
uniform float u_alpha;
${t}
void main() {
  float m = smoothstep(0.0, 1.0, u_morph);
  vec3 p = mix(a_from, a_to, m);
  p = displace(p, a_meta.y, u_time);

  float cy = cos(u_yaw), sy = sin(u_yaw);
  vec3 r1 = vec3(p.x * cy - p.z * sy, p.y, p.x * sy + p.z * cy);
  float cp = cos(u_pitch), sp = sin(u_pitch);
  vec3 r2 = vec3(r1.x, r1.y * cp - r1.z * sp, r1.y * sp + r1.z * cp);

  float persp = 4.2 / (4.2 - clamp(r2.z, -3.4, 3.4));
  vec2 uv = vec2(0.5) + vec2(r2.x / aspectOf(), r2.y) * 0.5 * u_zoom * persp;

  gl_Position = vec4(uv * 2.0 - 1.0, 0.0, 1.0);
  gl_PointSize = max(a_meta.x * u_pointSize * u_px * persp, 1.0);

  vec3 col = mix(a_colorFrom, a_colorTo, m);
  float depth = mix(1.0 - u_depthFade, 1.0, clamp(r2.z * 0.5 + 0.5, 0.0, 1.0));
  v_color = vec4(col, u_alpha * depth);
}`}function et(e,t,o,n){const r=e.createShader(t);return r===null?null:(e.shaderSource(r,o),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(j({code:K.warn,level:"error",message:`[backgrounds] 着色器编译失败（${n}）：${e.getShaderInfoLog(r)??""}`}),e.deleteShader(r),null))}function tt(e,t,o,n){const r=et(e,e.VERTEX_SHADER,t,`${n}/vertex`),i=et(e,e.FRAGMENT_SHADER,o,`${n}/fragment`);if(r===null||i===null)return r!==null&&e.deleteShader(r),i!==null&&e.deleteShader(i),null;const a=e.createProgram();if(a===null)return e.deleteShader(r),e.deleteShader(i),null;if(e.attachShader(a,r),e.attachShader(a,i),e.linkProgram(a),e.deleteShader(r),e.deleteShader(i),!e.getProgramParameter(a,e.LINK_STATUS))return j({code:K.warn,level:"error",message:`[backgrounds] 着色器链接失败（${n}）：${e.getProgramInfoLog(a)??""}`}),e.deleteProgram(a),null;const f=new Map,s=new Map;return{handle:a,uniform(c,d){f.has(c)||f.set(c,e.getUniformLocation(a,c));const l=f.get(c);if(l!=null){if(typeof d=="number"){e.uniform1f(l,d);return}switch(d.length){case 2:e.uniform2f(l,d[0],d[1]);break;case 3:e.uniform3f(l,d[0],d[1],d[2]);break;case 4:e.uniform4f(l,d[0],d[1],d[2],d[3]);break}}},attrib(c){return s.has(c)||s.set(c,e.getAttribLocation(a,c)),s.get(c)??-1},dispose(){e.deleteProgram(a)}}}const ce={high:{dpr:2,particles:1},balanced:{dpr:1.5,particles:.7},eco:{dpr:1,particles:.4}};function Uo(){const e=typeof navigator>"u"?4:navigator.hardwareConcurrency??4,t=typeof window>"u"?1:window.devicePixelRatio??1;return e<=4?ce.eco:e>=8&&t<=2?ce.high:ce.balanced}function ot(e){return e==="auto"?Uo():ce[e]}const nt=["a_from","a_to","a_colorFrom","a_colorTo","a_meta"],Go=[3,3,3,3,2];function bn(e,t){if(xe())throw new Error("[backgrounds] createBackgroundSurface 需要 DOM，请在客户端调用");let o=Se(t.effect),n={...t.params},r=Q(o.params,n),i=t.quality??"auto",a=ot(i);const f=!(e instanceof HTMLCanvasElement),s=f?document.createElement("canvas"):e,c=e;if(f){s.style.cssText="position:absolute;inset:0;display:block;width:100%;height:100%;pointer-events:none";const m=c.style.position||getComputedStyle(c).position;(m===""||m==="static")&&(c.style.position="relative"),c.appendChild(s)}const d=s.getContext("webgl2",{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1,powerPreference:"high-performance"});if(d===null)return j({code:K.warn,level:"warn",message:"[backgrounds] 当前环境不支持 WebGL2，已降级为静态背景"}),Ho(s,f,o,n);const l=d;let b=null,x=null,F=0,C=null,k=[],w=0,T=new Float32Array(0),$=new Float32Array(0),P=new Float32Array(0),N=new Float32Array(0),q=1,y=0,E=null,A=0,S=0,z=1,M=0,H=t.autoplay!==!1,Me=!0,O=!0,pe=!1,me=!1;const Z=[.5,.5];let X=0,W=0;const Le=t.respectReducedMotion!==!1;let De=Le&&oo();function re(){b==null||b.dispose(),x==null||x.dispose(),b=null,x=null,F=0;const m=o.shared??"";o.fragment!==void 0&&(b=tt(l,Bo,No(m,o.fragment),`${o.name}/bg`));const _=o.particles;if(_!==void 0){const g=_.mode==="cloud"?Vo(m,_.body):qo(m,_.body);if(x=tt(l,g,Po,`${o.name}/points`),_.mode==="procedural"){const V=typeof _.count=="function"?_.count(r):_.count;F=Math.max(0,Math.round(V*a.particles))}else E!==null&&(w=0,Re(E,{duration:0}))}O=!0}function Re(m,_){var Ve;E=m;const g=m.count;if(g===0){w=0,O=!0;return}const V=w===0?Io(g,1.7,Math.round(u(r,"seed"))+7):we(Ze(T,$,Ie(q)),w,g,3),ae=w===0?we(m.colors,g,g,3):we(Ze(P,N,Ie(q)),w,g,3);T=V,$=new Float32Array(g*3),$.set(m.positions.subarray(0,g*3)),P=ae,N=new Float32Array(g*3),N.set(m.colors.subarray(0,g*3));const vt=lt(Math.round(u(r,"seed"))+13),_e=new Float32Array(g*2);for(let B=0;B<g;B++)_e[B*2]=((Ve=m.sizes)==null?void 0:Ve[B])??1,_e[B*2+1]=vt();const ve=(_==null?void 0:_.duration)??(w===0?1.4:1.1);q=ve<=0?1:0,y=ve<=0?0:1/ve,w=g,ee(),C=l.createVertexArray(),l.bindVertexArray(C);const ht=[T,$,P,N,_e];k=[];for(let B=0;B<nt.length;B++){const he=l.createBuffer();if(he===null)continue;k.push(he),l.bindBuffer(l.ARRAY_BUFFER,he),l.bufferData(l.ARRAY_BUFFER,ht[B],l.STATIC_DRAW);const ge=(x==null?void 0:x.attrib(nt[B]))??-1;ge>=0&&(l.enableVertexAttribArray(ge),l.vertexAttribPointer(ge,Go[B],l.FLOAT,!1,0,0))}l.bindVertexArray(null),O=!0}function ee(){for(const m of k)l.deleteBuffer(m);k=[],C!==null&&l.deleteVertexArray(C),C=null}function Ie(m){const _=Math.min(1,Math.max(0,m));return _*_*(3-2*_)}function ft(){const m=s.clientWidth,_=s.clientHeight;if(m<=0||_<=0)return!1;z=Math.min(typeof window>"u"?1:window.devicePixelRatio??1,a.dpr)*(o.scale??1);const g=Math.max(1,Math.round(m*z)),V=Math.max(1,Math.round(_*z));return(g!==A||V!==S)&&(A=g,S=V,s.width=A,s.height=S,l.viewport(0,0,A,S),O=!0),!0}function Be(m,_){m.uniform("u_resolution",[A,S]),m.uniform("u_time",M),m.uniform("u_pointer",Z),m.uniform("u_pointerAmt",X),m.uniform("u_px",z);for(const g of Object.keys(_))m.uniform(g,_[g])}function dt(){var ae;const m={params:r,width:A,height:S,time:M},_=((ae=o.uniforms)==null?void 0:ae.call(o,m))??{};l.clearColor(0,0,0,0),l.clear(l.COLOR_BUFFER_BIT),b!==null&&(l.disable(l.BLEND),l.useProgram(b.handle),Be(b,_),l.drawArrays(l.TRIANGLES,0,3));const g=o.particles;if(x===null||g===void 0)return;const V=g.mode==="cloud"?w:F;V<=0||(l.enable(l.BLEND),l.blendFunc(l.ONE,g.blend==="normal"?l.ONE_MINUS_SRC_ALPHA:l.ONE),l.useProgram(x.handle),Be(x,_),g.mode==="cloud"?(x.uniform("u_morph",q),l.bindVertexArray(C),l.drawArrays(l.POINTS,0,V),l.bindVertexArray(null)):l.drawArrays(l.POINTS,0,V),l.disable(l.BLEND))}function Pe(m){m.preventDefault(),me=!0,j({code:K.warn,level:"warn",message:`[backgrounds] WebGL 上下文丢失（${o.name}）。同一页面上的画面过多时最早创建的会被丢弃，用不到的请及时 destroy()`})}function Ne(){me=!1,b=null,x=null,ee(),w=0,re(),A=0,S=0,O=!0}function pt(m){if(pe||me||!H||!Me)return;if(X!==W){const g=m>0?Math.min(m*5,1):1;X+=(W-X)*g,Math.abs(W-X)<.002&&(X=W),O=!0}const _=De?0:m;_===0&&!O&&q>=1||ft()&&(M+=_,q<1&&y>0&&(q=Math.min(1,q+_*y)),dt(),O=!1)}function ie(m){const _=s.getBoundingClientRect();_.width<=0||_.height<=0||(Z[0]=(m.clientX-_.left)/_.width,Z[1]=1-(m.clientY-_.top)/_.height,W=1,O=!0)}function qe(){W=0}re(),s.addEventListener("webglcontextlost",Pe),s.addEventListener("webglcontextrestored",Ne),t.pointer!==!1&&(c.addEventListener("pointermove",ie),c.addEventListener("pointerdown",ie),c.addEventListener("pointerleave",qe));let te=null;t.pauseOffscreen!==!1&&typeof IntersectionObserver=="function"&&(te=new IntersectionObserver(m=>{var _;Me=((_=m[0])==null?void 0:_.isIntersecting)??!0,O=!0},{rootMargin:"160px"}),te.observe(s));const mt=Le?no(m=>{De=m,O=!0}):()=>{},_t=Ro({tick:pt});return{canvas:s,backend:"webgl2",get effect(){return o},get playing(){return H},setEffect(m){const _=Se(m);_!==o&&(o=_,r=Q(o.params,n),ee(),w=0,re(),A=0,S=0)},setParams(m){n={...n,...m},r=Q(o.params,n);const _=o.particles;if(_!==void 0&&_.mode==="procedural"){const g=typeof _.count=="function"?_.count(r):_.count;F=Math.max(0,Math.round(g*a.particles))}O=!0},getParams(){return{...r}},setQuality(m){i=m,a=ot(i),ee(),w=0,re(),A=0,S=0},setPointer(m,_,g=!0){Z[0]=m,Z[1]=_,W=g?1:0,O=!0},setCloud(m,_){var g;if(((g=o.particles)==null?void 0:g.mode)!=="cloud"){j({code:K.warn,level:"warn",message:`[backgrounds] 效果 ${o.name} 不使用点云，setCloud 被忽略`});return}Re(m,_)},play(){H=!0,O=!0},pause(){H=!1},resize(){A=0,S=0,O=!0},destroy(){var m;pe||(pe=!0,_t(),mt(),te==null||te.disconnect(),s.removeEventListener("webglcontextlost",Pe),s.removeEventListener("webglcontextrestored",Ne),t.pointer!==!1&&(c.removeEventListener("pointermove",ie),c.removeEventListener("pointerdown",ie),c.removeEventListener("pointerleave",qe)),ee(),b==null||b.dispose(),x==null||x.dispose(),(m=l.getExtension("WEBGL_lose_context"))==null||m.loseContext(),f&&s.remove())}}}function Ho(e,t,o,n){let r=o,i=n,a=Q(r.params,i);function f(){var s;e.style.background=((s=r.fallback)==null?void 0:s.call(r,a))??"transparent"}return f(),{canvas:e,backend:"css",get effect(){return r},playing:!1,setEffect(s){r=Se(s),a=Q(r.params,i),f()},setParams(s){i={...i,...s},a=Q(r.params,i),f()},getParams:()=>({...a}),setQuality:()=>{},setPointer:()=>{},setCloud:()=>{},play:()=>{},pause:()=>{},resize:()=>{},destroy(){t?e.remove():e.style.background=""}}}export{G as A,rn as B,sn as C,K as D,cn as E,it as F,en as G,tn as H,on as I,Zo as J,Jo as K,yn as L,gn as M,vn as N,hn as O,bn as P,Mt as a,Tt as b,$t as c,Xo as d,dn as e,Wo as f,jo as g,_n as h,He as i,ln as j,fn as k,pn as l,Ko as m,oe as n,un as o,Ut as p,nn as q,j as r,mn as s,rt as t,an as u,Nt as v,Qo as w,zo as x,Yo as y,qt as z};
