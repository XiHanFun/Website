const Oe="data-scope",Le="data-part",ln="data-xh-focus-guard",tt="data-xh-inert-exempt",Pe="xh-portal-root",fn="xh.focusScope.mountAutoFocus",dn="xh.focusScope.unmountAutoFocus";function pn(e,t){return{name:e,parts:t,build:()=>{const o={};for(const r of t)o[r]={attrs:{[Oe]:e,[Le]:r},selector:`[${Oe}="${e}"][${Le}="${r}"]`};return o}}}function mn(e){return e?"":void 0}function oe(){return typeof document>"u"||typeof window>"u"}function $e(e){return typeof Document<"u"&&e instanceof Document}function hn(e){return typeof ShadowRoot<"u"&&e instanceof ShadowRoot}function nt(e){return typeof HTMLElement<"u"&&e instanceof HTMLElement}function fe(e,t){return!e||!t?!1:e===t||e.contains(t)}function De(){try{return!1}catch{return!1}}const de="__XIHAN_UI_DIAGNOSTICS__",Fe={silent:0,error:1,warn:2},ot=1e3;function rt(e){return`${e.code}|${e.scope??""}|${e.instanceId??""}|${e.part??""}|${e.message}`}function it(e){const t=["xh"];return e.scope&&t.push(e.scope),`[${t.join(":")}]`}function st(e){const t=`${it(e)} ${e.message} (${e.code})`,n=[];e.node&&n.push(e.node),e.detail&&n.push(e.detail),e.level==="error"?console.error(t,...n):console.warn(t,...n)}function at(){const e=new Set,t=new Set,n={level:De()?"warn":"silent",dedupe:!0,consoleOutput:De()};let o=n.level,r=n.dedupe,s=n.consoleOutput;return{report:i=>{if(!(Fe[i.level]>Fe[o])){if(r){const c=rt(i);if(t.has(c))return;t.size>=ot&&t.clear(),t.add(c)}s&&st(i);for(const c of Array.from(e))try{c(i)}catch{}}},subscribe:i=>(e.add(i),()=>{e.delete(i)}),setLevel:i=>{o=i},getLevel:()=>o,setDedupe:i=>{r=i,i||t.clear()},setConsoleOutput:i=>{s=i},reset:()=>{e.clear(),t.clear(),o=n.level,r=n.dedupe,s=n.consoleOutput}}}function ct(){const e=globalThis;return e[de]??(e[de]=at())}function $(e){ct().report(e)}const D={warn:"core.warn",layerDisposeNotTop:"core.layer.dispose-not-top",machineError:"machine.error",ignoredSlot:"core.ignored-slot"};function ge(e){const t=new WeakMap;return{get(n){let o=t.get(n);return o||(o=e(n),t.set(n,o)),o}}}function ut(e){const t=[],n=new Set;let o=0;const r=()=>{const i=[...t];for(const c of n)c(i)};return{register:i=>{const c={id:`layer-${++o}`,...i};t.push(c),r();let m=!1;return{layer:c,dispose:()=>{if(m)return;m=!0;const u=t.indexOf(c);u!==-1&&(u!==t.length-1&&$({code:D.layerDisposeNotTop,level:"error",message:`dispose 的层不是栈顶（可能与 top layer 顺序不一致）: ${c.id}`,detail:{layerId:c.id,index:u,depth:t.length}}),t.splice(u,1),r())}}},list:()=>t,top:()=>t[t.length-1],indexOf:i=>t.indexOf(i),layerOf:i=>{for(let c=t.length-1;c>=0;c--){const m=t[c];if(fe(m.node(),i))return{layer:m,via:"node"};if(m.surfaces().some(v=>fe(v,i)))return{layer:m,via:"surface"};if(m.branches().some(v=>fe(v,i)))return{layer:m,via:"branch"}}},elementsAbove:i=>{const c=t.indexOf(i);if(c===-1)return[];const m=[];for(let v=c+1;v<t.length;v++){const u=t[v],y=u.node();y&&m.push(y),m.push(...u.branches(),...u.surfaces())}return m},subscribe:i=>(n.add(i),()=>void n.delete(i))}}const lt=ge(ut);function qe(e){return lt.get(e)}function ft(e){const t=new WeakMap;return{acquire:n=>{const o=t.get(n);if(o){o.count+=1;return}t.set(n,{original:n.inert===!0,count:1}),n.inert=!0},release:n=>{const o=t.get(n);o&&(o.count-=1,!(o.count>0)&&(n.inert=o.original,t.delete(n)))},countOf:n=>{var o;return((o=t.get(n))==null?void 0:o.count)??0}}}const dt=ge(ft);function pt(e){return dt.get(e)}const mt=[`[${tt}]`];function vn(e,t,n={}){var x;const o=t.getDoc(),r=o.body,s=pt(o),a=[...mt,...n.exemptSelectors??[]].join(","),d=new Set;let i=new Set;const c=h=>{d.has(h)||(d.add(h),s.acquire(h))},m=h=>{d.delete(h)&&s.release(h)},v=()=>Array.from(r.querySelectorAll(a)),u=h=>{const _=new Set;for(const L of h){let A=L;for(;A&&!_.has(A)&&(_.add(A),A!==r);)A=A.parentElement}return _},y=()=>{const h=e(),_=v(),L=u([...h,..._]),A=new Set([...h,..._]),E=new Set,N=new Set,z=b=>{N.add(b);for(const w of Array.from(b.children))L.has(w)?A.has(w)||z(w):nt(w)&&!w.matches(a)&&E.add(w)};A.has(r)||z(r);for(const b of Array.from(d))E.has(b)||m(b);for(const b of E)c(b);i=N};y();const g=h=>Array.from(h).some(_=>_ instanceof Element&&(_.matches(a)||_.querySelector(a)!=null)),I=new(((x=r.ownerDocument)==null?void 0:x.defaultView)??window).MutationObserver(h=>{h.some(_=>i.has(_.target)||g(_.addedNodes)||g(_.removedNodes))&&y()});I.observe(r,{childList:!0,subtree:!0});const R=qe(o).subscribe(()=>y());let O=!1;return()=>{if(!O){O=!0,I.disconnect(),R();for(const h of Array.from(d))m(h)}}}function yn(e){return e.isComposing===!0||e.keyCode===229}function gn(...e){return(...t)=>{for(const n of e)n==null||n(...t)}}function ht(e,t,n){return`${e}:${t}:${n}`}let vt=0;function yt(e="xh"){return{scopeId:()=>`${e}-${++vt}`,partId:ht}}function gt(e){var n;if(oe())return;const t=(n=((e==null?void 0:e.getWin())??window).navigator)==null?void 0:n.language;return typeof t=="string"&&t!==""?t:void 0}function _t(e,t){return e??gt(t)??"en-US"}function bt(e){const t=new Map;return new Proxy({},{get(n,o){let r=t.get(o);return r||(r=s=>e(s),t.set(o,r)),r}})}bt(e=>e);function wt(e){var n;let t=e.activeElement;for(;(n=t==null?void 0:t.shadowRoot)!=null&&n.activeElement;)t=t.shadowRoot.activeElement;return t}function xt(e,t){const n=t.scopeId(),o=()=>{var d;const a=(d=e==null?void 0:e.getRootNode)==null?void 0:d.call(e);return a&&($e(a)||a instanceof ShadowRoot)?a:document},r=()=>{const a=o();return $e(a)?a:a.ownerDocument},s=()=>r().defaultView??window;return{id:n,getRootNode:o,getDoc:r,getWin:s,getById:a=>o().getElementById(a),partId:(a,d)=>t.partId(a,n,d),ids:(a,...d)=>{const i={};for(const c of d)i[c]=t.partId(a,n,c);return i},getActiveElement:()=>wt(o()),getComputedStyle:(a,d)=>s().getComputedStyle(a,d),isShadow:()=>o()instanceof ShadowRoot}}const St=ge(()=>({current:null}));function At(e){const t=e.getElementById(Pe);if(t)return t;const n=e.createElement("div");return n.id=Pe,e.body.appendChild(n),n}function Et(e){const t=St.get(e);let n=t.current;return(!n||!n.isConnected)&&(n=At(e),t.current=n),n}const Ct={normal:200,slow:320},pe={linear:"linear",standard:"cubic-bezier(0.2, 0, 0, 1)",emphasized:"cubic-bezier(0.3, 0, 0, 1)",decelerate:"cubic-bezier(0, 0, 0, 1)",accelerate:"cubic-bezier(0.3, 0, 1, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",easeOut:"cubic-bezier(0, 0, 0.2, 1)",easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)"};function Mt(e,t=globalThis.window){if(typeof(t==null?void 0:t.matchMedia)!="function")return()=>{};const n=t.matchMedia("(prefers-reduced-motion: reduce)"),o=()=>e(n.matches);return n.addEventListener("change",o),()=>n.removeEventListener("change",o)}let he=null;const ve=new Set;function Rt(e=globalThis.window){return typeof(e==null?void 0:e.matchMedia)!="function"?"no-preference":e.matchMedia("(prefers-reduced-motion: reduce)").matches?"reduce":"no-preference"}function _n(e){if(he!==e){he=e;for(const t of[...ve])t()}}function j(e){return he??Rt(e)}function Tt(e,t=globalThis.window){let n=j(t);const o=()=>{const s=j(t);s!==n&&(n=s,e(s))};ve.add(o);const r=Mt(o,t);return()=>{ve.delete(o),r()}}const It="finished",Ot=new Set(["offset","easing","composite"]);function Lt(e){return e===void 0?pe.standard:e in pe?pe[e]:e}function Pt(e,t){for(const[n,o]of Object.entries(t)){if(Ot.has(n)||o===null||o===void 0)continue;const r=String(o);n.startsWith("--")?e.style.setProperty(n,r):e.style.setProperty($t(n),r)}}function $t(e){return e.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`)}function Dt(e){return{finished:Promise.resolve(e),cancel:()=>{},finish:()=>{}}}function bn(e,t,n={}){var s;const o=n.fill??"none";if(j(((s=e.ownerDocument)==null?void 0:s.defaultView)??void 0)==="reduce"||typeof e.animate!="function"){const a=t[t.length-1];return a!==void 0&&(o==="forwards"||o==="both")&&Pt(e,a),Dt(It)}const r=e.animate(t,{duration:n.duration??Ct.normal,easing:Lt(n.easing),delay:n.delay??0,iterations:n.iterations??1,direction:n.direction??"normal",composite:n.composite??"replace",fill:o});return{finished:r.finished.then(()=>"finished").catch(()=>"cancelled"),cancel:()=>r.cancel(),finish:()=>r.finish()}}function wn(e){const t=e.performance;return typeof(t==null?void 0:t.now)=="function"?t.now():Date.now()}function xn(e,t){let n=!1,o=0;const r=()=>{n||(t(),!n&&(o=e.requestAnimationFrame(r)))};return o=e.requestAnimationFrame(r),()=>{n=!0,e.cancelAnimationFrame(o)}}const Ne={linear:e=>e,"ease-in":e=>e*e*e,"ease-out":e=>1-(1-e)**3,"ease-in-out":e=>e<.5?4*e*e*e:1-(-2*e+2)**3/2};function Ft(e){return Ne[e]??Ne.linear}function Ge(e,t){return!Number.isFinite(t)||t<=0||!Number.isFinite(e)?1:e<=0?0:e>=t?1:e/t}function Sn(e,t){return Ge(e,t)>=1}function An(e,t){const n=Number.isFinite(e.to)?e.to:0,o=Number.isFinite(e.from)?e.from:n,r=Ge(t,e.duration);return r>=1?n:o+(n-o)*Ft(e.easing)(r)}function En(e={}){const t=e.idGenerator??yt(),n=oe()?void 0:document,o=e.scope??xt(n==null?void 0:n.body,t);return{scope:o,idGenerator:t,layerRegistry:e.layerRegistry??(n?qe(n):Nt()),dir:e.dir??"ltr",locale:_t(e.locale,o),portalContainer:e.portalContainer??(n?()=>Et(n):()=>null),scrollRoot:e.scrollRoot??(()=>null),reducedMotion:e.reducedMotion??(()=>!oe()&&j(window)==="reduce")}}function Nt(){throw new Error("[xh] createRuntimeConfig 在 SSR 环境需显式传入 layerRegistry")}function Cn(e,t){e||$({code:D.warn,level:"warn",message:t})}function zt(e,t){if(t===void 0)return e.default;switch(e.kind){case"number":{const n=typeof t=="number"?t:Number(t);return Number.isFinite(n)?Math.min(e.max,Math.max(e.min,n)):e.default}case"boolean":return typeof t=="boolean"?t:!!t;case"enum":return typeof t=="string"&&e.values.includes(t)?t:e.default;case"color":return typeof t=="string"&&He(t)?t:e.default}}function B(e,t){const n={};for(const o of Object.keys(e))n[o]=zt(e[o],t==null?void 0:t[o]);return n}function He(e){return/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(e)}function kt(e){if(!He(e))return[0,0,0];let t=e.slice(1);t.length===3&&(t=t[0]+t[0]+t[1]+t[1]+t[2]+t[2]);const n=Number.parseInt(t,16);return[(n>>16&255)/255,(n>>8&255)/255,(n&255)/255]}function T(e,t){const n=e[t];return typeof n=="number"?n:0}function Bt(e,t){const n=e[t];return typeof n=="string"?n:""}function H(e,t){return kt(Bt(e,t))}function F(e,t,n,o,r){return{kind:"number",label:e,min:t,max:n,step:o,default:r}}function W(e,t){return{kind:"color",label:e,default:t}}const Ut=F("速度",0,3,.05,1),Vt=F("强度",0,2,.05,1),qt=F("不透明度",0,1,.01,1),Gt=F("噪点",0,1,.01,.2),Ht=F("随机种子",0,999,1,0),Wt=["fluid","glass","mesh","grain","plasma","aurora","beam","ripple","orb","wave","starfield","nebula","flow-field","particles"],jt=new Map;function Xt(e){return`${e.replace(/-(.)/g,(t,n)=>n.toUpperCase())}Effect`}function ye(e){if(typeof e!="string")return e;const t=jt.get(e);if(t===void 0){if(Wt.includes(e)){const n=Xt(e);throw new Error(`[backgrounds] 未注册的效果：${e}。它是内置效果，按名字取用前须注册：registerBuiltinEffects() 注册全部内置效果，registerEffects([${n}]) 只注册这一个；也可以把 ${n} 直接传给 effect，那条路不经过注册表。`)}throw new Error(`[backgrounds] 未注册的效果：${e}。先调用 registerEffect() 或直接传效果对象。`)}return t}const Mn={name:"nebula",scale:.6,params:{background:W("底色","#050416"),colorA:W("云色一","#4c2a86"),colorB:W("云色二","#0f5fa8"),colorC:W("高光","#ff9ad4"),star:W("星点色","#ffffff"),speed:Ut,intensity:Vt,opacity:qt,density:F("星点密度",0,1,.01,.35),contrast:F("对比",.2,3,.05,1.2),grain:Gt,seed:Ht},shared:`
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
`},uniforms:e=>{const t=e.params;return{u_bg:H(t,"background"),u_colorA:H(t,"colorA"),u_colorB:H(t,"colorB"),u_colorC:H(t,"colorC"),u_star:H(t,"star"),u_speed:T(t,"speed"),u_intensity:T(t,"intensity"),u_opacity:T(t,"opacity"),u_contrast:T(t,"contrast"),u_grain:T(t,"grain"),u_seed:T(t,"seed")}},fallback:e=>`radial-gradient(at 35% 35%, ${e.colorA}, transparent 55%), radial-gradient(at 70% 65%, ${e.colorB}, transparent 55%), ${e.background}`},ee=new Set;let U=0,te=0;function We(e){U=requestAnimationFrame(We);const t=te===0?.016:Math.min((e-te)/1e3,.05);te=e;for(const n of ee)n.tick(t)}function Yt(){U!==0||typeof requestAnimationFrame!="function"||(te=0,U=requestAnimationFrame(We))}function Kt(){U!==0&&(cancelAnimationFrame(U),U=0)}function Qt(e){return ee.add(e),Yt(),()=>{ee.delete(e),ee.size===0&&Kt()}}function je(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let n=Math.imul(t^t>>>15,t|1);return n^=n+Math.imul(n^n>>>7,n|61),((n^n>>>14)>>>0)/4294967296}}function me(e,t,n,o){const r=new Float32Array(n*o);if(t<=0)return r;for(let s=0;s<n;s++){const a=t>=n?Math.min(t-1,Math.floor(s*t/n)):s%t;for(let d=0;d<o;d++)r[s*o+d]=e[a*o+d]??0}return r}function ze(e,t,n){const o=new Float32Array(Math.max(e.length,t.length));for(let r=0;r<o.length;r++){const s=e[r]??0;o[r]=s+((t[r]??0)-s)*n}return o}function Zt(e,t,n=1){const o=je(n),r=new Float32Array(e*3);for(let s=0;s<e;s++){const a=o()*2-1,d=o()*Math.PI*2,i=t*(.75+o()*.45),c=Math.sqrt(Math.max(0,1-a*a));r[s*3]=Math.cos(d)*c*i,r[s*3+1]=Math.sin(d)*c*i,r[s*3+2]=a*i}return r}const Jt=`#version 300 es
precision highp float;
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`,_e=`precision highp float;
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
`,en=`#version 300 es
precision highp float;
in vec4 v_color;
out vec4 fragColor;
void main() {
  float r = length(gl_PointCoord - 0.5) * 2.0;
  float a = exp(-r * r * 3.6) * (1.0 - smoothstep(0.75, 1.0, r));
  a *= v_color.a;
  if (a < 0.002) discard;
  fragColor = vec4(v_color.rgb * a, a);
}`;function tn(e,t){return`#version 300 es
${_e}
${e}
out vec4 fragColor;
${t}`}function nn(e,t){return`#version 300 es
${_e}
${e}
out vec4 v_color;
${t}
void main() {
  vec2 pos; float size; vec4 col;
  particle(gl_VertexID, pos, size, col);
  gl_Position = vec4(pos * 2.0 - 1.0, 0.0, 1.0);
  gl_PointSize = max(size * u_px, 1.0);
  v_color = col;
}`}function on(e,t){return`#version 300 es
${_e}
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
}`}function ke(e,t,n,o){const r=e.createShader(t);return r===null?null:(e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:($({code:D.warn,level:"error",message:`[backgrounds] 着色器编译失败（${o}）：${e.getShaderInfoLog(r)??""}`}),e.deleteShader(r),null))}function Be(e,t,n,o){const r=ke(e,e.VERTEX_SHADER,t,`${o}/vertex`),s=ke(e,e.FRAGMENT_SHADER,n,`${o}/fragment`);if(r===null||s===null)return r!==null&&e.deleteShader(r),s!==null&&e.deleteShader(s),null;const a=e.createProgram();if(a===null)return e.deleteShader(r),e.deleteShader(s),null;if(e.attachShader(a,r),e.attachShader(a,s),e.linkProgram(a),e.deleteShader(r),e.deleteShader(s),!e.getProgramParameter(a,e.LINK_STATUS))return $({code:D.warn,level:"error",message:`[backgrounds] 着色器链接失败（${o}）：${e.getProgramInfoLog(a)??""}`}),e.deleteProgram(a),null;const d=new Map,i=new Map;return{handle:a,uniform(c,m){d.has(c)||d.set(c,e.getUniformLocation(a,c));const v=d.get(c);if(v!=null){if(typeof m=="number"){e.uniform1f(v,m);return}switch(m.length){case 2:e.uniform2f(v,m[0],m[1]);break;case 3:e.uniform3f(v,m[0],m[1],m[2]);break;case 4:e.uniform4f(v,m[0],m[1],m[2],m[3]);break}}},attrib(c){return i.has(c)||i.set(c,e.getAttribLocation(a,c)),i.get(c)??-1},dispose(){e.deleteProgram(a)}}}const ne={high:{dpr:2,particles:1},balanced:{dpr:1.5,particles:.7},eco:{dpr:1,particles:.4}};function rn(){const e=typeof navigator>"u"?4:navigator.hardwareConcurrency??4,t=typeof window>"u"?1:window.devicePixelRatio??1;return e<=4?ne.eco:e>=8&&t<=2?ne.high:ne.balanced}function Ue(e){return e==="auto"?rn():ne[e]}const Ve=["a_from","a_to","a_colorFrom","a_colorTo","a_meta"],sn=[3,3,3,3,2],an="position:absolute;inset:0;display:block;width:100%;height:100%;pointer-events:none;z-index:-1";function cn(e,t){var a;t.style.cssText=an;let n=!1;function o(){if(n)return!0;const d=e.style.position;if(d===""||d==="static"){if(!e.isConnected)return!1;const i=getComputedStyle(e).position;(i===""||i==="static")&&(e.style.position="relative")}return e.style.isolation="isolate",e.appendChild(t),n=!0,!0}if(o())return()=>{};const r=(a=e.ownerDocument)==null?void 0:a.defaultView;if(typeof(r==null?void 0:r.ResizeObserver)!="function")return e.style.position="relative",e.style.isolation="isolate",e.appendChild(t),n=!0,()=>{};const s=new r.ResizeObserver(()=>{o()&&s.disconnect()});return s.observe(e),()=>s.disconnect()}function Rn(e,t){var Te;if(oe())throw new Error("[backgrounds] createBackgroundSurface 需要 DOM，请在客户端调用");let n=ye(t.effect),o={...t.params},r=B(n.params,o),s=t.quality??"auto",a=Ue(s);const d=!(e instanceof HTMLCanvasElement),i=d?document.createElement("canvas"):e,c=e,m=d?cn(c,i):()=>{},v=i.getContext("webgl2",{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1,powerPreference:"high-performance"});if(v===null)return $({code:D.warn,level:"warn",message:"[backgrounds] 当前环境不支持 WebGL2，已降级为静态背景"}),un(i,d,n,o,m);const u=v;let y=null,g=null,I=0,R=null,O=[],x=0,h=new Float32Array(0),_=new Float32Array(0),L=new Float32Array(0),A=new Float32Array(0),E=1,N=0,z=null,b=0,w=0,X=1,re=0,Y=t.autoplay!==!1,be=!0,S=!0,ie=!1,se=!1;const V=[.5,.5];let k=0,P=0;const we=t.respectReducedMotion!==!1;let xe=we&&j()==="reduce";function K(){y==null||y.dispose(),g==null||g.dispose(),y=null,g=null,I=0;const l=n.shared??"";n.fragment!==void 0&&(y=Be(u,Jt,tn(l,n.fragment),`${n.name}/bg`));const f=n.particles;if(f!==void 0){const p=f.mode==="cloud"?on(l,f.body):nn(l,f.body);if(g=Be(u,p,en,`${n.name}/points`),f.mode==="procedural"){const M=typeof f.count=="function"?f.count(r):f.count;I=Math.max(0,Math.round(M*a.particles))}else z!==null&&(x=0,Se(z,{duration:0}))}S=!0}function Se(l,f){var Ie;z=l;const p=l.count;if(p===0){x=0,S=!0;return}const M=x===0?Zt(p,1.7,Math.round(T(r,"seed"))+7):me(ze(h,_,Ae(E)),x,p,3),J=x===0?me(l.colors,p,p,3):me(ze(L,A,Ae(E)),x,p,3);h=M,_=new Float32Array(p*3),_.set(l.positions.subarray(0,p*3)),L=J,A=new Float32Array(p*3),A.set(l.colors.subarray(0,p*3));const Je=je(Math.round(T(r,"seed"))+13),ae=new Float32Array(p*2);for(let C=0;C<p;C++)ae[C*2]=((Ie=l.sizes)==null?void 0:Ie[C])??1,ae[C*2+1]=Je();const ce=(f==null?void 0:f.duration)??(x===0?1.4:1.1);E=ce<=0?1:0,N=ce<=0?0:1/ce,x=p,q(),R=u.createVertexArray(),u.bindVertexArray(R);const et=[h,_,L,A,ae];O=[];for(let C=0;C<Ve.length;C++){const ue=u.createBuffer();if(ue===null)continue;O.push(ue),u.bindBuffer(u.ARRAY_BUFFER,ue),u.bufferData(u.ARRAY_BUFFER,et[C],u.STATIC_DRAW);const le=(g==null?void 0:g.attrib(Ve[C]))??-1;le>=0&&(u.enableVertexAttribArray(le),u.vertexAttribPointer(le,sn[C],u.FLOAT,!1,0,0))}u.bindVertexArray(null),S=!0}function q(){for(const l of O)u.deleteBuffer(l);O=[],R!==null&&u.deleteVertexArray(R),R=null}function Ae(l){const f=Math.min(1,Math.max(0,l));return f*f*(3-2*f)}function Xe(){const l=i.clientWidth,f=i.clientHeight;if(l<=0||f<=0)return!1;X=Math.min(typeof window>"u"?1:window.devicePixelRatio??1,a.dpr)*(n.scale??1);const p=Math.max(1,Math.round(l*X)),M=Math.max(1,Math.round(f*X));return(p!==b||M!==w)&&(b=p,w=M,i.width=b,i.height=w,u.viewport(0,0,b,w),S=!0),!0}function Ee(l,f){l.uniform("u_resolution",[b,w]),l.uniform("u_time",re),l.uniform("u_pointer",V),l.uniform("u_pointerAmt",k),l.uniform("u_px",X);for(const p of Object.keys(f))l.uniform(p,f[p])}function Ye(){var J;const l={params:r,width:b,height:w,time:re},f=((J=n.uniforms)==null?void 0:J.call(n,l))??{};u.clearColor(0,0,0,0),u.clear(u.COLOR_BUFFER_BIT),y!==null&&(u.disable(u.BLEND),u.useProgram(y.handle),Ee(y,f),u.drawArrays(u.TRIANGLES,0,3));const p=n.particles;if(g===null||p===void 0)return;const M=p.mode==="cloud"?x:I;M<=0||(u.enable(u.BLEND),u.blendFunc(u.ONE,p.blend==="normal"?u.ONE_MINUS_SRC_ALPHA:u.ONE),u.useProgram(g.handle),Ee(g,f),p.mode==="cloud"?(g.uniform("u_morph",E),u.bindVertexArray(R),u.drawArrays(u.POINTS,0,M),u.bindVertexArray(null)):u.drawArrays(u.POINTS,0,M),u.disable(u.BLEND))}function Ce(l){l.preventDefault(),se=!0,$({code:D.warn,level:"warn",message:`[backgrounds] WebGL 上下文丢失（${n.name}）。同一页面上的画面过多时最早创建的会被丢弃，用不到的请及时 destroy()`})}function Me(){se=!1,y=null,g=null,q(),x=0,K(),b=0,w=0,S=!0}function Ke(l){if(ie||se||!Y||!be)return;if(k!==P){const p=l>0?Math.min(l*5,1):1;k+=(P-k)*p,Math.abs(P-k)<.002&&(k=P),S=!0}const f=xe?0:l;f===0&&!S&&E>=1||Xe()&&(re+=f,E<1&&N>0&&(E=Math.min(1,E+f*N)),Ye(),S=!1)}function Q(l){const f=i.getBoundingClientRect();f.width<=0||f.height<=0||(V[0]=(l.clientX-f.left)/f.width,V[1]=1-(l.clientY-f.top)/f.height,P=1,S=!0)}function Re(){P=0}K(),i.addEventListener("webglcontextlost",Ce),i.addEventListener("webglcontextrestored",Me),t.pointer!==!1&&(c.addEventListener("pointermove",Q),c.addEventListener("pointerdown",Q),c.addEventListener("pointerleave",Re));let G=null;const Z=(Te=i.ownerDocument)==null?void 0:Te.defaultView;t.pauseOffscreen!==!1&&typeof(Z==null?void 0:Z.IntersectionObserver)=="function"&&(G=new Z.IntersectionObserver(l=>{var f;be=((f=l[0])==null?void 0:f.isIntersecting)??!0,S=!0},{rootMargin:"160px"}),G.observe(i));const Qe=we?Tt(l=>{xe=l==="reduce",S=!0}):()=>{},Ze=Qt({tick:Ke});return{canvas:i,backend:"webgl2",get effect(){return n},get playing(){return Y},setEffect(l){const f=ye(l);f!==n&&(n=f,r=B(n.params,o),q(),x=0,K(),b=0,w=0)},setParams(l){o={...o,...l},r=B(n.params,o);const f=n.particles;if(f!==void 0&&f.mode==="procedural"){const p=typeof f.count=="function"?f.count(r):f.count;I=Math.max(0,Math.round(p*a.particles))}S=!0},getParams(){return{...r}},setQuality(l){s=l,a=Ue(s),q(),x=0,K(),b=0,w=0},setPointer(l,f,p=!0){V[0]=l,V[1]=f,P=p?1:0,S=!0},setCloud(l,f){var p;if(((p=n.particles)==null?void 0:p.mode)!=="cloud"){$({code:D.warn,level:"warn",message:`[backgrounds] 效果 ${n.name} 不使用点云，setCloud 被忽略`});return}Se(l,f)},play(){Y=!0,S=!0},pause(){Y=!1},resize(){b=0,w=0,S=!0},destroy(){var l;ie||(ie=!0,Ze(),Qe(),G==null||G.disconnect(),i.removeEventListener("webglcontextlost",Ce),i.removeEventListener("webglcontextrestored",Me),t.pointer!==!1&&(c.removeEventListener("pointermove",Q),c.removeEventListener("pointerdown",Q),c.removeEventListener("pointerleave",Re)),q(),y==null||y.dispose(),g==null||g.dispose(),(l=u.getExtension("WEBGL_lose_context"))==null||l.loseContext(),m(),d&&i.remove())}}}function un(e,t,n,o,r){let s=n,a=o,d=B(s.params,a);function i(){var c;e.style.background=((c=s.fallback)==null?void 0:c.call(s,d))??"transparent"}return i(),{canvas:e,backend:"css",get effect(){return s},playing:!1,setEffect(c){s=ye(c),d=B(s.params,a),i()},setParams(c){a={...a,...c},d=B(s.params,a),i()},getParams:()=>({...d}),setQuality:()=>{},setPointer:()=>{},setCloud:()=>{},play:()=>{},pause:()=>{},resize:()=>{},destroy(){r(),t?e.remove():e.style.background=""}}}export{Rn as A,Mn as B,Cn as C,Le as D,dn as E,yn as F,bn as G,Ct as H,Oe as a,tt as b,bt as c,ge as d,ln as e,fn as f,fe as g,hn as h,$e as i,nt as j,$ as k,D as l,De as m,xt as n,yt as o,gn as p,pn as q,j as r,mn as s,vn as t,_n as u,En as v,wn as w,xn as x,An as y,Sn as z};
