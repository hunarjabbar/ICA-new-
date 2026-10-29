import{a7 as Gf,a8 as ea}from"./vendor-core-CaqLTTyR.js";/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kf=()=>{};var uu={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cl=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Qf=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],a=n[t++],c=n[t++],l=((s&7)<<18|(i&63)<<12|(a&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{const i=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},Nl={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],a=s+1<n.length,c=a?n[s+1]:0,l=s+2<n.length,d=l?n[s+2]:0,p=i>>2,m=(i&3)<<4|c>>4;let E=(c&15)<<2|d>>6,b=d&63;l||(b=64,a||(E=64)),r.push(t[p],t[m],t[E],t[b])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Cl(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Qf(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],c=s<n.length?t[n.charAt(s)]:0;++s;const d=s<n.length?t[n.charAt(s)]:64;++s;const m=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||c==null||d==null||m==null)throw new Yf;const E=i<<2|c>>4;if(r.push(E),d!==64){const b=c<<4&240|d>>2;if(r.push(b),m!==64){const N=d<<6&192|m;r.push(N)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Yf extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Jf=function(n){const e=Cl(n);return Nl.encodeByteArray(e,!0)},ei=function(n){return Jf(n).replace(/\./g,"")},kl=function(n){try{return Nl.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xf(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zf=()=>Xf().__FIREBASE_DEFAULTS__,ep=()=>{if(typeof process>"u"||typeof uu>"u")return;const n=uu.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},tp=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&kl(n[1]);return e&&JSON.parse(e)},Ti=()=>{try{return Kf()||Zf()||ep()||tp()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Dl=n=>{var e,t;return(t=(e=Ti())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},np=n=>{const e=Dl(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},xl=()=>{var n;return(n=Ti())==null?void 0:n.config},Ol=n=>{var e;return(e=Ti())==null?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rp{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sp(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[ei(JSON.stringify(t)),ei(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ve(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function ip(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ve())}function op(){var e;const n=(e=Ti())==null?void 0:e.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function ap(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function cp(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function up(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function lp(){const n=Ve();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function hp(){return!op()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function dp(){try{return typeof indexedDB=="object"}catch{return!1}}function fp(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)==null?void 0:i.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pp="FirebaseError";class Pt extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=pp,Object.setPrototypeOf(this,Pt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ns.prototype.create)}}class ns{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?mp(i,r):"Error",c=`${this.serviceName}: ${a} (${s}).`;return new Pt(s,c,r)}}function mp(n,e){try{let t=0,r="";for(;t<n.length;){const s=n.indexOf("{$",t);if(s===-1){r+=n.substring(t);break}const i=n.indexOf("}",s+2);if(i===-1){r+=n.substring(t);break}const a=n.substring(s+2,i),c=e[a];r+=n.substring(t,s)+(c!=null?String(c):`<${a}?>`),t=i+1}return r}catch{return n}}function gp(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Tn(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],a=e[s];if(lu(i)&&lu(a)){if(!Tn(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function lu(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rs(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function _p(n,e){const t=new yp(n,e);return t.subscribe.bind(t)}class yp{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");wp(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=wo),s.error===void 0&&(s.error=wo),s.complete===void 0&&(s.complete=wo);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function wp(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function wo(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ye(n){return n&&n._delegate?n._delegate:n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ss(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Ll(n){return(await fetch(n,{credentials:"include"})).ok}class In{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ep{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new rp;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Ip(e))try{this.getOrInitializeService({instanceIdentifier:dn})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=dn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=dn){return this.instances.has(e)}getOptions(e=dn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&a.resolve(s)}return s}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Tp(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=dn){return this.component?this.component.multipleInstances?e:dn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Tp(n){return n===dn?void 0:n}function Ip(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vp{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Ep(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Q;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(Q||(Q={}));const Ap={debug:Q.DEBUG,verbose:Q.VERBOSE,info:Q.INFO,warn:Q.WARN,error:Q.ERROR,silent:Q.SILENT},Rp=Q.INFO,Pp={[Q.DEBUG]:"log",[Q.VERBOSE]:"log",[Q.INFO]:"info",[Q.WARN]:"warn",[Q.ERROR]:"error"},Sp=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=Pp[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ta{constructor(e){this.name=e,this._logLevel=Rp,this._logHandler=Sp,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Q))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Ap[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Q.DEBUG,...e),this._logHandler(this,Q.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Q.VERBOSE,...e),this._logHandler(this,Q.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Q.INFO,...e),this._logHandler(this,Q.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Q.WARN,...e),this._logHandler(this,Q.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Q.ERROR,...e),this._logHandler(this,Q.ERROR,...e)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vp{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(bp(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function bp(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const No="@firebase/app",hu="0.16.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tt=new ta("@firebase/app"),Cp="@firebase/app-compat",Np="@firebase/analytics-compat",kp="@firebase/analytics",Dp="@firebase/app-check-compat",xp="@firebase/app-check",Op="@firebase/auth",Lp="@firebase/auth-compat",Mp="@firebase/database",Up="@firebase/data-connect",Fp="@firebase/database-compat",Bp="@firebase/functions",qp="@firebase/functions-compat",$p="@firebase/installations",jp="@firebase/installations-compat",zp="@firebase/messaging",Wp="@firebase/messaging-compat",Hp="@firebase/performance",Gp="@firebase/performance-compat",Kp="@firebase/remote-config",Qp="@firebase/remote-config-compat",Yp="@firebase/storage",Jp="@firebase/storage-compat",Xp="@firebase/firestore",Zp="@firebase/ai",em="@firebase/firestore-compat",tm="firebase",nm="12.19.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ko="[DEFAULT]",rm={[No]:"fire-core",[Cp]:"fire-core-compat",[kp]:"fire-analytics",[Np]:"fire-analytics-compat",[xp]:"fire-app-check",[Dp]:"fire-app-check-compat",[Op]:"fire-auth",[Lp]:"fire-auth-compat",[Mp]:"fire-rtdb",[Up]:"fire-data-connect",[Fp]:"fire-rtdb-compat",[Bp]:"fire-fn",[qp]:"fire-fn-compat",[$p]:"fire-iid",[jp]:"fire-iid-compat",[zp]:"fire-fcm",[Wp]:"fire-fcm-compat",[Hp]:"fire-perf",[Gp]:"fire-perf-compat",[Kp]:"fire-rc",[Qp]:"fire-rc-compat",[Yp]:"fire-gcs",[Jp]:"fire-gcs-compat",[Xp]:"fire-fst",[em]:"fire-fst-compat",[Zp]:"fire-vertex","fire-js":"fire-js",[tm]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mr=new Map,sm=new Map,Do=new Map;function du(n,e){try{n.container.addComponent(e)}catch(t){Tt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Bn(n){const e=n.name;if(Do.has(e))return Tt.debug(`There were multiple attempts to register component ${e}.`),!1;Do.set(e,n);for(const t of Mr.values())du(t,n);for(const t of sm.values())du(t,n);return!0}function na(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function st(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const im={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different {$mismatchedParam}. Existing: '{$oldValue}'. New: '{$newValue}'.","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},pt=new ns("app","Firebase",im);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class om{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new In("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw pt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kn=nm;function am(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:ko,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw pt.create("bad-app-name",{appName:String(s)});if(t||(t=xl()),!t)throw pt.create("no-options");const i=Mr.get(s);if(i)if(Tn(t,i.options)){if(Tn(r,i.config))return i;throw pt.create("duplicate-app",{appName:s,mismatchedParam:"config",oldValue:JSON.stringify(i.config),newValue:JSON.stringify(r)})}else throw pt.create("duplicate-app",{appName:s,mismatchedParam:"options",oldValue:JSON.stringify(i.options),newValue:JSON.stringify(t)});const a=new vp(s);for(const l of Do.values())a.addComponent(l);const c=new om(t,r,a);return Mr.set(s,c),c}function Ml(n=ko){const e=Mr.get(n);if(!e&&n===ko&&xl())return am();if(!e)throw pt.create("no-app",{appName:n});return e}function lI(){return Array.from(Mr.values())}function Ft(n,e,t){let r=rm[n]??n;t&&(r+=`-${t}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const a=[`Unable to register library "${r}" with version "${e}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&a.push("and"),i&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Tt.warn(a.join(" "));return}Bn(new In(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cm="firebase-heartbeat-database",um=1,Ur="firebase-heartbeat-store";let Eo=null;function Ul(){return Eo||(Eo=Gf(cm,um,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Ur)}catch(t){console.warn(t)}}}}).catch(n=>{throw pt.create("idb-open",{originalErrorMessage:n.message})})),Eo}async function lm(n){try{const t=(await Ul()).transaction(Ur),r=await t.objectStore(Ur).get(Fl(n));return await t.done,r}catch(e){if(e instanceof Pt)Tt.warn(e.message);else{const t=pt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Tt.warn(t.message)}}}async function fu(n,e){try{const r=(await Ul()).transaction(Ur,"readwrite");await r.objectStore(Ur).put(e,Fl(n)),await r.done}catch(t){if(t instanceof Pt)Tt.warn(t.message);else{const r=pt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Tt.warn(r.message)}}}function Fl(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hm=1024,dm=30;class fm{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new mm(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=pu();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>dm){const a=gm(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Tt.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=pu(),{heartbeatsToSend:r,unsentEntries:s}=pm(this._heartbeatsCache.heartbeats),i=ei(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return Tt.warn(t),""}}}function pu(){return new Date().toISOString().substring(0,10)}function pm(n,e=hm){const t=[];let r=n.slice();for(const s of n){const i=t.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),mu(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),mu(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class mm{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return dp()?fp().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await lm(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return fu(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return fu(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function mu(n){return ei(JSON.stringify({version:2,heartbeats:n})).length}function gm(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _m(n){Bn(new In("platform-logger",e=>new Vp(e),"PRIVATE")),Bn(new In("heartbeat",e=>new fm(e),"PRIVATE")),Ft(No,hu,n),Ft(No,hu,"esm2020"),Ft("fire-js","")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */_m("");var ym="firebase",wm="12.19.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ft(ym,wm,"app");function Bl(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Em=Bl,ql=new ns("auth","Firebase",Bl());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ti=new ta("@firebase/auth");function $s(n,...e){ti.logLevel<=Q.WARN&&ti.warn(`Auth (${Kn}): ${n}`,...e)}function js(n,...e){ti.logLevel<=Q.ERROR&&ti.error(`Auth (${Kn}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function It(n,...e){throw sa(n,...e)}function at(n,...e){return sa(n,...e)}function ra(n,e,t){const r={...Em(),[e]:t};return new ns("auth","Firebase",r).create(e,{appName:n.name})}function mn(n){return ra(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function sa(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return ql.create(n,...e)}function $(n,e,...t){if(!n)throw sa(e,...t)}function mt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw js(e),new Error(e)}function vt(n,e){n||mt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xo(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function Tm(){return gu()==="http:"||gu()==="https:"}function gu(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Im(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Tm()||cp()||"connection"in navigator)?navigator.onLine:!0}function vm(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class is{constructor(e,t){this.shortDelay=e,this.longDelay=t,vt(t>e,"Short delay should be less than long delay!"),this.isMobile=ip()||up()}get(){return Im()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ia(n,e){vt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $l{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;mt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;mt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;mt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Am={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rm=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Pm=new is(3e4,6e4);function oa(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function Qn(n,e,t,r,s={}){return jl(n,s,async()=>{let i={},a={};r&&(e==="GET"?a=r:i={body:JSON.stringify(r)});const c=rs({...a,key:n.config.apiKey}).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const d={method:e,headers:l,...i};return ap()||(d.referrerPolicy="strict-origin-when-cross-origin"),n.emulatorConfig&&ss(n.emulatorConfig.host)&&(d.credentials="include"),$l.fetch()(await zl(n,n.config.apiHost,t,c),d)})}async function jl(n,e,t){n._canInitEmulator=!1;const r={...Am,...e};try{const s=new Vm(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw Os(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const c=i.ok?a.errorMessage:a.error.message,[l,d]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw Os(n,"credential-already-in-use",a);if(l==="EMAIL_EXISTS")throw Os(n,"email-already-in-use",a);if(l==="USER_DISABLED")throw Os(n,"user-disabled",a);const p=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw ra(n,p,d);It(n,p)}}catch(s){if(s instanceof Pt)throw s;It(n,"network-request-failed",{message:String(s)})}}async function Sm(n,e,t,r,s={}){const i=await Qn(n,e,t,r,s);return"mfaPendingCredential"in i&&It(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function zl(n,e,t,r){const s=`${e}${t}?${r}`,i=n,a=i.config.emulator?ia(n.config,s):`${n.config.apiScheme}://${s}`;return Rm.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(a).toString():a}class Vm{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(at(this.auth,"network-request-failed")),Pm.get())})}}function Os(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=at(n,e,r);return s.customData._tokenResponse=t,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bm(n,e){return Qn(n,"POST","/v1/accounts:delete",e)}async function ni(n,e){return Qn(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vr(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Cm(n,e=!1){const t=ye(n),r=await t.getIdToken(e),s=aa(r);$(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,a=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:Vr(To(s.auth_time)),issuedAtTime:Vr(To(s.iat)),expirationTime:Vr(To(s.exp)),signInProvider:a||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function To(n){return Number(n)*1e3}function aa(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return js("JWT malformed, contained fewer than 3 sections"),null;try{const s=kl(t);return s?JSON.parse(s):(js("Failed to decode base64 JWT payload"),null)}catch(s){return js("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function _u(n){const e=aa(n);return $(e,"internal-error"),$(typeof e.exp<"u","internal-error"),$(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Fr(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Pt&&Nm(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function Nm({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class km{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oo{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Vr(this.lastLoginAt),this.creationTime=Vr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ri(n){var m;const e=n.auth,t=await n.getIdToken(),r=await Fr(n,ni(e,{idToken:t}));$(r==null?void 0:r.users.length,e,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const i=(m=s.providerUserInfo)!=null&&m.length?Wl(s.providerUserInfo):[],a=xm(n.providerData,i),c=n.isAnonymous,l=!(n.email&&s.passwordHash)&&!(a!=null&&a.length),d=c?l:!1,p={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new Oo(s.createdAt,s.lastLoginAt),isAnonymous:d};Object.assign(n,p)}async function Dm(n){const e=ye(n);await ri(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function xm(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Wl(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Om(n,e){const t=await jl(n,{},async()=>{const r=rs({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,a=await zl(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const l={method:"POST",headers:c,body:r};return n.emulatorConfig&&ss(n.emulatorConfig.host)&&(l.credentials="include"),$l.fetch()(a,l)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Lm(n,e){return Qn(n,"POST","/v2/accounts:revokeToken",oa(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){$(e.idToken,"internal-error"),$(typeof e.idToken<"u","internal-error"),$(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):_u(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){$(e.length!==0,"internal-error");const t=_u(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:($(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await Om(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,a=new Mn;return r&&($(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&($(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&($(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Mn,this.toJSON())}_performRefresh(){return mt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dt(n,e){$(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Je{constructor({uid:e,auth:t,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new km(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Oo(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await Fr(this,this.stsTokenManager.getToken(this.auth,e));return $(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Cm(this,e)}reload(){return Dm(this)}_assign(e){this!==e&&($(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Je({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){$(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await ri(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(st(this.auth.app))return Promise.reject(mn(this.auth));const e=await this.getIdToken();return await Fr(this,bm(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,a=t.photoURL??void 0,c=t.tenantId??void 0,l=t._redirectEventId??void 0,d=t.createdAt??void 0,p=t.lastLoginAt??void 0,{uid:m,emailVerified:E,isAnonymous:b,providerData:N,stsTokenManager:M}=t;$(m&&M,e,"internal-error");const L=Mn.fromJSON(this.name,M);$(typeof m=="string",e,"internal-error"),Dt(r,e.name),Dt(s,e.name),$(typeof E=="boolean",e,"internal-error"),$(typeof b=="boolean",e,"internal-error"),Dt(i,e.name),Dt(a,e.name),Dt(c,e.name),Dt(l,e.name),Dt(d,e.name),Dt(p,e.name);const H=new Je({uid:m,auth:e,email:s,emailVerified:E,displayName:r,isAnonymous:b,photoURL:a,phoneNumber:i,tenantId:c,stsTokenManager:L,createdAt:d,lastLoginAt:p});return N&&Array.isArray(N)&&(H.providerData=N.map(J=>({...J}))),l&&(H._redirectEventId=l),H}static async _fromIdTokenResponse(e,t,r=!1){const s=new Mn;s.updateFromServerResponse(t);const i=new Je({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await ri(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];$(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Wl(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),c=new Mn;c.updateFromIdToken(r);const l=new Je({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:a}),d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Oo(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(l,d),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yu=new Map;function gt(n){vt(n instanceof Function,"Expected a class definition");let e=yu.get(n);return e?(vt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,yu.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hl{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Hl.type="NONE";const wu=Hl;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zs(n,e,t){return`firebase:${n}:${e}:${t}`}class gn{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=zs(this.userKey,s.apiKey,i),this.fullPersistenceKey=zs("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t);try{this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}catch{}}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await ni(this.auth,{idToken:e}).catch(()=>{});return t?Je._fromGetAccountInfoResponse(this.auth,t,e):null}return Je._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){try{this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}catch{}}static async create(e,t,r="authUser"){if(!t.length)return new gn(gt(wu),e,r);const s=(await Promise.all(t.map(async d=>{try{if(await d._isAvailable())return d}catch{return}}))).filter(d=>d);let i=s[0]||gt(wu);const a=zs(r,e.config.apiKey,e.name);let c=null;for(const d of t)try{const p=await d._get(a);if(p){let m;if(typeof p=="string"){const E=await ni(e,{idToken:p}).catch(()=>{});if(!E)break;m=await Je._fromGetAccountInfoResponse(e,E,p)}else m=Je._fromJSON(e,p);d!==i&&(c=m),i=d;break}}catch{}const l=s.filter(d=>d._shouldAllowMigration);return!i._shouldAllowMigration||!l.length?new gn(i,e,r):(i=l[0],c&&await i._set(a,c.toJSON()),await Promise.all(t.map(async d=>{if(d!==i)try{await d._remove(a)}catch{}})),new gn(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Eu(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Yl(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Gl(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Xl(e))return"Blackberry";if(Zl(e))return"Webos";if(Kl(e))return"Safari";if((e.includes("chrome/")||Ql(e))&&!e.includes("edge/"))return"Chrome";if(Jl(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Gl(n=Ve()){return/firefox\//i.test(n)}function Kl(n=Ve()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Ql(n=Ve()){return/crios\//i.test(n)}function Yl(n=Ve()){return/iemobile/i.test(n)}function Jl(n=Ve()){return/android/i.test(n)}function Xl(n=Ve()){return/blackberry/i.test(n)}function Zl(n=Ve()){return/webos/i.test(n)}function ca(n=Ve()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Mm(n=Ve()){var e;return ca(n)&&!!((e=window.navigator)!=null&&e.standalone)}function Um(){return lp()&&document.documentMode===10}function eh(n=Ve()){return ca(n)||Jl(n)||Zl(n)||Xl(n)||/windows phone/i.test(n)||Yl(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function th(n,e=[]){let t;switch(n){case"Browser":t=Eu(Ve());break;case"Worker":t=`${Eu(Ve())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Kn}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fm{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((a,c)=>{try{const l=e(i);a(l)}catch(l){c(l)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Bm(n,e={}){return Qn(n,"GET","/v2/passwordPolicy",oa(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qm=6;class $m{constructor(e){var r;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??qm,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=e.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jm{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Tu(this),this.idTokenSubscription=new Tu(this),this.beforeStateQueue=new Fm(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=ql,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=gt(t)),this._initializationPromise=this.queue(async()=>{var r,s,i;if(!this._deleted){try{this.persistenceManager=await gn.create(this,e)}catch(a){$s(`Failed to initialize persistence: ${a}`),this.persistenceManager=await gn.create(this,[])}finally{(r=this._resolvePersistenceManagerAvailable)==null||r.call(this)}if(!this._deleted){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}try{await this.initializeCurrentUser(t)}catch(a){$s(`Failed to initialize current user: ${a}`),await this.directlySetCurrentUser(null).catch(()=>{})}this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await ni(this,{idToken:e}),r=await Je._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var i;if(st(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(c,c))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(i=this.redirectUser)==null?void 0:i._redirectEventId,c=r==null?void 0:r._redirectEventId,l=await this.tryRedirectSignIn(e);(!a||a===c)&&(l!=null&&l.user)&&(r=l.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(a){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return $(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await ri(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=vm()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(st(this.app))return Promise.reject(mn(this));const t=e?ye(e):null;return t&&$(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&$(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return st(this.app)?Promise.reject(mn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return st(this.app)?Promise.reject(mn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(gt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Bm(this),t=new $m(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new ns("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await Lm(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&gt(e)||this._popupRedirectResolver;$(t,this,"argument-error"),this.redirectPersistenceManager=await gn.create(this,[gt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if($(c,this,"internal-error"),c.then(()=>{a||i(this.currentUser)}).catch(l=>{if(!a)if(typeof t!="function"&&t.error)t.error(l);else if(r)r(l);else throw l}),typeof t=="function"){const l=e.addObserver(t,r,s);return()=>{a=!0,l()}}else{const l=e.addObserver(t);return()=>{a=!0,l()}}}async directlySetCurrentUser(e){if(this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,this.persistenceManager)try{e?await this.persistenceManager.setCurrentUser(e):await this.persistenceManager.removeCurrentUser()}catch(t){const r=(t==null?void 0:t.message)||String(t),s=ra(this,"internal-error",`An internal AuthError has occurred: ${r}`);throw s.customData={originalError:t},s}}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return $(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=th(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){var t;if(st(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&$s(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function ua(n){return ye(n)}class Tu{constructor(e){this.auth=e,this.observer=null,this.addObserver=_p(t=>this.observer=t)}get next(){return $(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let la={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function zm(n){la=n}function Wm(n){return la.loadJS(n)}function Hm(){return la.gapiScript}function Gm(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Km(n,e){const t=na(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(Tn(i,e??{}))return s;It(s,"already-initialized")}return t.initialize({options:e})}function Qm(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(gt);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Ym(n,e,t){const r=ua(n);$(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=nh(e),{host:a,port:c}=Jm(e),l=c===null?"":`:${c}`,d={url:`${i}//${a}${l}/`},p=Object.freeze({host:a,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){$(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),$(Tn(d,r.config.emulator)&&Tn(p,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=d,r.emulatorConfig=p,r.settings.appVerificationDisabledForTesting=!0,ss(a)?Ll(`${i}//${a}${l}`):Xm()}function nh(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Jm(n){const e=nh(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Iu(r.substr(i.length+1))}}else{const[i,a]=r.split(":");return{host:i,port:Iu(a)}}}function Iu(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Xm(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rh{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return mt("not implemented")}_getIdTokenResponse(e){return mt("not implemented")}_linkToIdToken(e,t){return mt("not implemented")}_getReauthenticationResolver(e){return mt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Un(n,e){return Sm(n,"POST","/v1/accounts:signInWithIdp",oa(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zm="http://localhost";class vn extends rh{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new vn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):It("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=t;if(!r||!s)return null;const a=new vn(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return Un(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Un(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Un(e,t)}buildRequest(){const e={requestUri:Zm,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=rs(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sh{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class os extends sh{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xt extends os{constructor(){super("facebook.com")}static credential(e){return vn._fromParams({providerId:xt.PROVIDER_ID,signInMethod:xt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return xt.credentialFromTaggedObject(e)}static credentialFromError(e){return xt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return xt.credential(e.oauthAccessToken)}catch{return null}}}xt.FACEBOOK_SIGN_IN_METHOD="facebook.com";xt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ot extends os{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return vn._fromParams({providerId:Ot.PROVIDER_ID,signInMethod:Ot.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Ot.credentialFromTaggedObject(e)}static credentialFromError(e){return Ot.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return Ot.credential(t,r)}catch{return null}}}Ot.GOOGLE_SIGN_IN_METHOD="google.com";Ot.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt extends os{constructor(){super("github.com")}static credential(e){return vn._fromParams({providerId:Lt.PROVIDER_ID,signInMethod:Lt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Lt.credentialFromTaggedObject(e)}static credentialFromError(e){return Lt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Lt.credential(e.oauthAccessToken)}catch{return null}}}Lt.GITHUB_SIGN_IN_METHOD="github.com";Lt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mt extends os{constructor(){super("twitter.com")}static credential(e,t){return vn._fromParams({providerId:Mt.PROVIDER_ID,signInMethod:Mt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Mt.credentialFromTaggedObject(e)}static credentialFromError(e){return Mt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Mt.credential(t,r)}catch{return null}}}Mt.TWITTER_SIGN_IN_METHOD="twitter.com";Mt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await Je._fromIdTokenResponse(e,r,s),a=vu(r);return new qn({user:i,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=vu(r);return new qn({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function vu(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class si extends Pt{constructor(e,t,r,s){super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,si.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new si(e,t,r,s)}}function ih(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?si._fromErrorAndOperation(n,i,e,r):i})}async function eg(n,e,t=!1){const r=await Fr(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return qn._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tg(n,e,t=!1){const{auth:r}=n;if(st(r.app))return Promise.reject(mn(r));const s="reauthenticate";try{const i=await Fr(n,ih(r,s,e,n),t);$(i.idToken,r,"internal-error");const a=aa(i.idToken);$(a,r,"internal-error");const{sub:c}=a;return $(n.uid===c,r,"user-mismatch"),qn._forOperation(n,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&It(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ng(n,e,t=!1){if(st(n.app))return Promise.reject(mn(n));const r="signIn",s=await ih(n,r,e),i=await qn._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}function rg(n,e,t,r){return ye(n).onIdTokenChanged(e,t,r)}function sg(n,e,t){return ye(n).beforeAuthStateChanged(e,t)}const ii="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oh{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(ii,"1"),this.storage.removeItem(ii),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ig=1e3,og=10;class ah extends oh{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=eh(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,l)=>{this.notifyListeners(a,l)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},i=this.storage.getItem(r);Um()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,og):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},ig)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}ah.type="LOCAL";const ag=ah;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ch extends oh{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}ch.type="SESSION";const uh=ch;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cg(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ii{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new Ii(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,a=this.handlersMap[s];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(a).map(async d=>d(t.origin,i)),l=await cg(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Ii.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ha(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ug{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((c,l)=>{const d=ha("",20);s.port1.start();const p=setTimeout(()=>{l(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(m){const E=m;if(E.data.eventId===d)switch(E.data.status){case"ack":clearTimeout(p),i=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(E.data.response);break;default:clearTimeout(p),clearTimeout(i),l(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ct(){return window}function lg(n){ct().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lh(){return typeof ct().WorkerGlobalScope<"u"&&typeof ct().importScripts=="function"}async function hg(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function dg(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function fg(){return lh()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hh="firebaseLocalStorageDb",pg=1,oi="firebaseLocalStorage",dh="fbase_key";class as{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function vi(n,e){return n.transaction([oi],e?"readwrite":"readonly").objectStore(oi)}function mg(){const n=indexedDB.deleteDatabase(hh);return new as(n).toPromise()}function fh(){const n=indexedDB.open(hh,pg);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(oi,{keyPath:dh})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(oi)?e(r):(r.close(),await mg(),e(await fh()))})})}async function Au(n,e,t){const r=vi(n,!0).put({[dh]:e,value:t});return new as(r).toPromise()}async function gg(n,e){const t=vi(n,!1).get(e),r=await new as(t).toPromise();return r===void 0?null:r.value}function Ru(n,e){const t=vi(n,!0).delete(e);return new as(t).toPromise()}const _g=800,yg=3;class ph{registerLifecycleListeners(){typeof window<"u"&&typeof window.addEventListener=="function"&&(window.addEventListener("pagehide",this.onPageHide),window.addEventListener("pageshow",this.onPageShow))}unregisterLifecycleListeners(){typeof window<"u"&&typeof window.removeEventListener=="function"&&(window.removeEventListener("pagehide",this.onPageHide),window.removeEventListener("pageshow",this.onPageShow))}constructor(){this.type="LOCAL",this.dbPromise=null,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.isClosing=!1,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this.onPageHide=()=>{this.isClosing=!0,this.stopPolling(),this.dbPromise&&(this.dbPromise.then(e=>e.close()).catch(()=>{}),this.dbPromise=null)},this.onPageShow=()=>{this.isClosing&&(this.isClosing=!1,Object.keys(this.listeners).length>0&&this.startPolling())},this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.dbPromise?this.dbPromise:(this.dbPromise=fh(),this.dbPromise.catch(()=>{this.dbPromise=null}),this.dbPromise)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>yg)throw r;if(this.dbPromise){const s=this.dbPromise;this.dbPromise=null;try{(await s).close()}catch{}}}}async initializeServiceWorkerMessaging(){return lh()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ii._getInstance(fg()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,r;if(this.activeServiceWorker=await hg(),!this.activeServiceWorker)return;this.sender=new ug(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(r=e[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||dg()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{return indexedDB?(await this._withRetries(async e=>{await Au(e,ii,"1"),await Ru(e,ii)}),!0):!1}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Au(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>gg(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Ru(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){if(this.isClosing)return[];try{const e=await this._withRetries(s=>{const i=vi(s,!1).getAll();return new as(i).toPromise()});if(this.isClosing)return[];if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}catch(e){return this.isClosing||$s(`Firebase Auth cross-tab polling failed with error: ${e}`),[]}}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),_g)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.startPolling(),this.registerLifecycleListeners()),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.stopPolling(),this.unregisterLifecycleListeners())}}ph.type="LOCAL";const wg=ph;new is(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Eg(n,e){return e?gt(e):($(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class da extends rh{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Un(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Un(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Un(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Tg(n){return ng(n.auth,new da(n),n.bypassAuthState)}function Ig(n){const{auth:e,user:t}=n;return $(t,e,"internal-error"),tg(t,new da(n),n.bypassAuthState)}async function vg(n){const{auth:e,user:t}=n;return $(t,e,"internal-error"),eg(t,new da(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mh{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:a,type:c}=e;if(a){this.reject(a);return}const l={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Tg;case"linkViaPopup":case"linkViaRedirect":return vg;case"reauthViaPopup":case"reauthViaRedirect":return Ig;default:It(this.auth,"internal-error")}}resolve(e){vt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){vt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ag=new is(2e3,1e4);class Ln extends mh{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Ln.currentPopupAction&&Ln.currentPopupAction.cancel(),Ln.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return $(e,this.auth,"internal-error"),e}async onExecution(){vt(this.filter.length===1,"Popup operations only handle one event");const e=ha();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(at(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(at(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Ln.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if((r=(t=this.authWindow)==null?void 0:t.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(at(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Ag.get())};e()}}Ln.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rg="pendingRedirect",Ws=new Map;class Pg extends mh{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Ws.get(this.auth._key());if(!e){try{const r=await Sg(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Ws.set(this.auth._key(),e)}return this.bypassAuthState||Ws.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Sg(n,e){const t=Cg(e),r=bg(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function Vg(n,e){Ws.set(n._key(),e)}function bg(n){return gt(n._redirectPersistence)}function Cg(n){return zs(Rg,n.config.apiKey,n.name)}async function Ng(n,e,t=!1){if(st(n.app))return Promise.reject(mn(n));const r=ua(n),s=Eg(r,e),a=await new Pg(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kg=600*1e3;class Dg{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!xg(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!gh(e)){const s=((r=e.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";t.onError(at(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=kg&&this.cachedEventUids.clear(),this.cachedEventUids.has(Pu(e))}saveEventToCache(e){this.cachedEventUids.add(Pu(e)),this.lastProcessedEventTime=Date.now()}}function Pu(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function gh({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function xg(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return gh(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Og(n,e={}){return Qn(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lg=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Mg=/^https?/;async function Ug(n){if(n.config.emulator)return;const{authorizedDomains:e}=await Og(n);for(const t of e)try{if(Fg(t))return}catch{}It(n,"unauthorized-domain")}function Fg(n){const e=xo(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!Mg.test(t))return!1;if(Lg.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bg=new is(3e4,6e4);function Su(){const n=ct().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function qg(n){return new Promise((e,t)=>{var s,i,a;function r(){Su(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Su(),t(at(n,"network-request-failed"))},timeout:Bg.get()})}if((i=(s=ct().gapi)==null?void 0:s.iframes)!=null&&i.Iframe)e(gapi.iframes.getContext());else if((a=ct().gapi)!=null&&a.load)r();else{const c=Gm("iframefcb");return ct()[c]=()=>{gapi.load?r():t(at(n,"network-request-failed"))},Wm(`${Hm()}?onload=${c}`).catch(l=>t(l))}}).catch(e=>{throw Hs=null,e})}let Hs=null;function $g(n){return Hs=Hs||qg(n),Hs}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jg=new is(5e3,15e3),zg="__/auth/iframe",Wg="emulator/auth/iframe",Hg={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Gg=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Kg(n){const e=n.config;$(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?ia(e,Wg):`https://${n.config.authDomain}/${zg}`,r={apiKey:e.apiKey,appName:n.name,v:Kn},s=Gg.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${rs(r).slice(1)}`}async function Qg(n){const e=await $g(n),t=ct().gapi;return $(t,n,"internal-error"),e.open({where:document.body,url:Kg(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Hg,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const a=at(n,"network-request-failed"),c=ct().setTimeout(()=>{i(a)},jg.get());function l(){ct().clearTimeout(c),s(r)}r.ping(l).then(l,()=>{i(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yg={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Jg=500,Xg=600,Zg="_blank",e_="http://localhost";class Vu{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function t_(n,e,t,r=Jg,s=Xg){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const l={...Yg,width:r.toString(),height:s.toString(),top:i,left:a},d=Ve().toLowerCase();t&&(c=Ql(d)?Zg:t),Gl(d)&&(e=e||e_,l.scrollbars="yes");const p=Object.entries(l).reduce((E,[b,N])=>`${E}${b}=${N},`,"");if(Mm(d)&&c!=="_self")return n_(e||"",c),new Vu(null);const m=window.open(e||"",c,p);$(m,n,"popup-blocked");try{m.focus()}catch{}return new Vu(m)}function n_(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const r_="__/auth/handler",s_="emulator/auth/handler",i_=encodeURIComponent("fac");async function bu(n,e,t,r,s,i){$(n.config.authDomain,n,"auth-domain-config-required"),$(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Kn,eventId:s};if(e instanceof sh){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",gp(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[p,m]of Object.entries({}))a[p]=m}if(e instanceof os){const p=e.getScopes().filter(m=>m!=="");p.length>0&&(a.scopes=p.join(","))}n.tenantId&&(a.tid=n.tenantId);const c=a;for(const p of Object.keys(c))c[p]===void 0&&delete c[p];const l=await n._getAppCheckToken(),d=l?`#${i_}=${encodeURIComponent(l)}`:"";return`${o_(n)}?${rs(c).slice(1)}${d}`}function o_({config:n}){return n.emulator?ia(n,s_):`https://${n.authDomain}/${r_}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Io="webStorageSupport";class a_{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=uh,this._completeRedirectFn=Ng,this._overrideRedirectResult=Vg}async _openPopup(e,t,r,s){var a;vt((a=this.eventManagers[e._key()])==null?void 0:a.manager,"_initialize() not called before _openPopup()");const i=await bu(e,t,r,xo(),s);return t_(e,i,ha())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await bu(e,t,r,xo(),s);return lg(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(vt(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await Qg(e),r=new Dg(e);return t.register("authEvent",s=>($(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Io,{type:Io},s=>{var a;const i=(a=s==null?void 0:s[0])==null?void 0:a[Io];i!==void 0&&t(!!i),It(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Ug(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return eh()||Kl()||ca()}}const c_=a_;var Cu="@firebase/auth",Nu="1.13.6";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class u_{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){$(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function l_(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function h_(n){Bn(new In("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=r.options;$(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:th(n)},d=new jm(r,s,i,l);return Qm(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Bn(new In("auth-internal",e=>{const t=ua(e.getProvider("auth").getImmediate());return(r=>new u_(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ft(Cu,Nu,l_(n)),Ft(Cu,Nu,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const d_=300,f_=Ol("authIdTokenMaxAge")||d_;let ku=null;const p_=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>f_)return;const s=t==null?void 0:t.token;ku!==s&&(ku=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function hI(n=Ml()){const e=na(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Km(n,{popupRedirectResolver:c_,persistence:[wg,ag,uh]}),r=Ol("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const a=p_(i.toString());sg(t,a,()=>a(t.currentUser)),rg(t,c=>a(c))}}const s=Dl("auth");return s&&Ym(t,`http://${s}`),t}function m_(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}zm({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=at("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",m_().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});h_("Browser");var Du=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Bt,_h;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(I,g){function y(){}y.prototype=g.prototype,I.F=g.prototype,I.prototype=new y,I.prototype.constructor=I,I.D=function(v,T,R){for(var _=Array(arguments.length-2),Oe=2;Oe<arguments.length;Oe++)_[Oe-2]=arguments[Oe];return g.prototype[T].apply(v,_)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(I,g,y){y||(y=0);const v=Array(16);if(typeof g=="string")for(var T=0;T<16;++T)v[T]=g.charCodeAt(y++)|g.charCodeAt(y++)<<8|g.charCodeAt(y++)<<16|g.charCodeAt(y++)<<24;else for(T=0;T<16;++T)v[T]=g[y++]|g[y++]<<8|g[y++]<<16|g[y++]<<24;g=I.g[0],y=I.g[1],T=I.g[2];let R=I.g[3],_;_=g+(R^y&(T^R))+v[0]+3614090360&4294967295,g=y+(_<<7&4294967295|_>>>25),_=R+(T^g&(y^T))+v[1]+3905402710&4294967295,R=g+(_<<12&4294967295|_>>>20),_=T+(y^R&(g^y))+v[2]+606105819&4294967295,T=R+(_<<17&4294967295|_>>>15),_=y+(g^T&(R^g))+v[3]+3250441966&4294967295,y=T+(_<<22&4294967295|_>>>10),_=g+(R^y&(T^R))+v[4]+4118548399&4294967295,g=y+(_<<7&4294967295|_>>>25),_=R+(T^g&(y^T))+v[5]+1200080426&4294967295,R=g+(_<<12&4294967295|_>>>20),_=T+(y^R&(g^y))+v[6]+2821735955&4294967295,T=R+(_<<17&4294967295|_>>>15),_=y+(g^T&(R^g))+v[7]+4249261313&4294967295,y=T+(_<<22&4294967295|_>>>10),_=g+(R^y&(T^R))+v[8]+1770035416&4294967295,g=y+(_<<7&4294967295|_>>>25),_=R+(T^g&(y^T))+v[9]+2336552879&4294967295,R=g+(_<<12&4294967295|_>>>20),_=T+(y^R&(g^y))+v[10]+4294925233&4294967295,T=R+(_<<17&4294967295|_>>>15),_=y+(g^T&(R^g))+v[11]+2304563134&4294967295,y=T+(_<<22&4294967295|_>>>10),_=g+(R^y&(T^R))+v[12]+1804603682&4294967295,g=y+(_<<7&4294967295|_>>>25),_=R+(T^g&(y^T))+v[13]+4254626195&4294967295,R=g+(_<<12&4294967295|_>>>20),_=T+(y^R&(g^y))+v[14]+2792965006&4294967295,T=R+(_<<17&4294967295|_>>>15),_=y+(g^T&(R^g))+v[15]+1236535329&4294967295,y=T+(_<<22&4294967295|_>>>10),_=g+(T^R&(y^T))+v[1]+4129170786&4294967295,g=y+(_<<5&4294967295|_>>>27),_=R+(y^T&(g^y))+v[6]+3225465664&4294967295,R=g+(_<<9&4294967295|_>>>23),_=T+(g^y&(R^g))+v[11]+643717713&4294967295,T=R+(_<<14&4294967295|_>>>18),_=y+(R^g&(T^R))+v[0]+3921069994&4294967295,y=T+(_<<20&4294967295|_>>>12),_=g+(T^R&(y^T))+v[5]+3593408605&4294967295,g=y+(_<<5&4294967295|_>>>27),_=R+(y^T&(g^y))+v[10]+38016083&4294967295,R=g+(_<<9&4294967295|_>>>23),_=T+(g^y&(R^g))+v[15]+3634488961&4294967295,T=R+(_<<14&4294967295|_>>>18),_=y+(R^g&(T^R))+v[4]+3889429448&4294967295,y=T+(_<<20&4294967295|_>>>12),_=g+(T^R&(y^T))+v[9]+568446438&4294967295,g=y+(_<<5&4294967295|_>>>27),_=R+(y^T&(g^y))+v[14]+3275163606&4294967295,R=g+(_<<9&4294967295|_>>>23),_=T+(g^y&(R^g))+v[3]+4107603335&4294967295,T=R+(_<<14&4294967295|_>>>18),_=y+(R^g&(T^R))+v[8]+1163531501&4294967295,y=T+(_<<20&4294967295|_>>>12),_=g+(T^R&(y^T))+v[13]+2850285829&4294967295,g=y+(_<<5&4294967295|_>>>27),_=R+(y^T&(g^y))+v[2]+4243563512&4294967295,R=g+(_<<9&4294967295|_>>>23),_=T+(g^y&(R^g))+v[7]+1735328473&4294967295,T=R+(_<<14&4294967295|_>>>18),_=y+(R^g&(T^R))+v[12]+2368359562&4294967295,y=T+(_<<20&4294967295|_>>>12),_=g+(y^T^R)+v[5]+4294588738&4294967295,g=y+(_<<4&4294967295|_>>>28),_=R+(g^y^T)+v[8]+2272392833&4294967295,R=g+(_<<11&4294967295|_>>>21),_=T+(R^g^y)+v[11]+1839030562&4294967295,T=R+(_<<16&4294967295|_>>>16),_=y+(T^R^g)+v[14]+4259657740&4294967295,y=T+(_<<23&4294967295|_>>>9),_=g+(y^T^R)+v[1]+2763975236&4294967295,g=y+(_<<4&4294967295|_>>>28),_=R+(g^y^T)+v[4]+1272893353&4294967295,R=g+(_<<11&4294967295|_>>>21),_=T+(R^g^y)+v[7]+4139469664&4294967295,T=R+(_<<16&4294967295|_>>>16),_=y+(T^R^g)+v[10]+3200236656&4294967295,y=T+(_<<23&4294967295|_>>>9),_=g+(y^T^R)+v[13]+681279174&4294967295,g=y+(_<<4&4294967295|_>>>28),_=R+(g^y^T)+v[0]+3936430074&4294967295,R=g+(_<<11&4294967295|_>>>21),_=T+(R^g^y)+v[3]+3572445317&4294967295,T=R+(_<<16&4294967295|_>>>16),_=y+(T^R^g)+v[6]+76029189&4294967295,y=T+(_<<23&4294967295|_>>>9),_=g+(y^T^R)+v[9]+3654602809&4294967295,g=y+(_<<4&4294967295|_>>>28),_=R+(g^y^T)+v[12]+3873151461&4294967295,R=g+(_<<11&4294967295|_>>>21),_=T+(R^g^y)+v[15]+530742520&4294967295,T=R+(_<<16&4294967295|_>>>16),_=y+(T^R^g)+v[2]+3299628645&4294967295,y=T+(_<<23&4294967295|_>>>9),_=g+(T^(y|~R))+v[0]+4096336452&4294967295,g=y+(_<<6&4294967295|_>>>26),_=R+(y^(g|~T))+v[7]+1126891415&4294967295,R=g+(_<<10&4294967295|_>>>22),_=T+(g^(R|~y))+v[14]+2878612391&4294967295,T=R+(_<<15&4294967295|_>>>17),_=y+(R^(T|~g))+v[5]+4237533241&4294967295,y=T+(_<<21&4294967295|_>>>11),_=g+(T^(y|~R))+v[12]+1700485571&4294967295,g=y+(_<<6&4294967295|_>>>26),_=R+(y^(g|~T))+v[3]+2399980690&4294967295,R=g+(_<<10&4294967295|_>>>22),_=T+(g^(R|~y))+v[10]+4293915773&4294967295,T=R+(_<<15&4294967295|_>>>17),_=y+(R^(T|~g))+v[1]+2240044497&4294967295,y=T+(_<<21&4294967295|_>>>11),_=g+(T^(y|~R))+v[8]+1873313359&4294967295,g=y+(_<<6&4294967295|_>>>26),_=R+(y^(g|~T))+v[15]+4264355552&4294967295,R=g+(_<<10&4294967295|_>>>22),_=T+(g^(R|~y))+v[6]+2734768916&4294967295,T=R+(_<<15&4294967295|_>>>17),_=y+(R^(T|~g))+v[13]+1309151649&4294967295,y=T+(_<<21&4294967295|_>>>11),_=g+(T^(y|~R))+v[4]+4149444226&4294967295,g=y+(_<<6&4294967295|_>>>26),_=R+(y^(g|~T))+v[11]+3174756917&4294967295,R=g+(_<<10&4294967295|_>>>22),_=T+(g^(R|~y))+v[2]+718787259&4294967295,T=R+(_<<15&4294967295|_>>>17),_=y+(R^(T|~g))+v[9]+3951481745&4294967295,I.g[0]=I.g[0]+g&4294967295,I.g[1]=I.g[1]+(T+(_<<21&4294967295|_>>>11))&4294967295,I.g[2]=I.g[2]+T&4294967295,I.g[3]=I.g[3]+R&4294967295}r.prototype.v=function(I,g){g===void 0&&(g=I.length);const y=g-this.blockSize,v=this.C;let T=this.h,R=0;for(;R<g;){if(T==0)for(;R<=y;)s(this,I,R),R+=this.blockSize;if(typeof I=="string"){for(;R<g;)if(v[T++]=I.charCodeAt(R++),T==this.blockSize){s(this,v),T=0;break}}else for(;R<g;)if(v[T++]=I[R++],T==this.blockSize){s(this,v),T=0;break}}this.h=T,this.o+=g},r.prototype.A=function(){var I=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);I[0]=128;for(var g=1;g<I.length-8;++g)I[g]=0;g=this.o*8;for(var y=I.length-8;y<I.length;++y)I[y]=g&255,g/=256;for(this.v(I),I=Array(16),g=0,y=0;y<4;++y)for(let v=0;v<32;v+=8)I[g++]=this.g[y]>>>v&255;return I};function i(I,g){var y=c;return Object.prototype.hasOwnProperty.call(y,I)?y[I]:y[I]=g(I)}function a(I,g){this.h=g;const y=[];let v=!0;for(let T=I.length-1;T>=0;T--){const R=I[T]|0;v&&R==g||(y[T]=R,v=!1)}this.g=y}var c={};function l(I){return-128<=I&&I<128?i(I,function(g){return new a([g|0],g<0?-1:0)}):new a([I|0],I<0?-1:0)}function d(I){if(isNaN(I)||!isFinite(I))return m;if(I<0)return L(d(-I));const g=[];let y=1;for(let v=0;I>=y;v++)g[v]=I/y|0,y*=4294967296;return new a(g,0)}function p(I,g){if(I.length==0)throw Error("number format error: empty string");if(g=g||10,g<2||36<g)throw Error("radix out of range: "+g);if(I.charAt(0)=="-")return L(p(I.substring(1),g));if(I.indexOf("-")>=0)throw Error('number format error: interior "-" character');const y=d(Math.pow(g,8));let v=m;for(let R=0;R<I.length;R+=8){var T=Math.min(8,I.length-R);const _=parseInt(I.substring(R,R+T),g);T<8?(T=d(Math.pow(g,T)),v=v.j(T).add(d(_))):(v=v.j(y),v=v.add(d(_)))}return v}var m=l(0),E=l(1),b=l(16777216);n=a.prototype,n.m=function(){if(M(this))return-L(this).m();let I=0,g=1;for(let y=0;y<this.g.length;y++){const v=this.i(y);I+=(v>=0?v:4294967296+v)*g,g*=4294967296}return I},n.toString=function(I){if(I=I||10,I<2||36<I)throw Error("radix out of range: "+I);if(N(this))return"0";if(M(this))return"-"+L(this).toString(I);const g=d(Math.pow(I,6));var y=this;let v="";for(;;){const T=Ke(y,g).g;y=H(y,T.j(g));let R=((y.g.length>0?y.g[0]:y.h)>>>0).toString(I);if(y=T,N(y))return R+v;for(;R.length<6;)R="0"+R;v=R+v}},n.i=function(I){return I<0?0:I<this.g.length?this.g[I]:this.h};function N(I){if(I.h!=0)return!1;for(let g=0;g<I.g.length;g++)if(I.g[g]!=0)return!1;return!0}function M(I){return I.h==-1}n.l=function(I){return I=H(this,I),M(I)?-1:N(I)?0:1};function L(I){const g=I.g.length,y=[];for(let v=0;v<g;v++)y[v]=~I.g[v];return new a(y,~I.h).add(E)}n.abs=function(){return M(this)?L(this):this},n.add=function(I){const g=Math.max(this.g.length,I.g.length),y=[];let v=0;for(let T=0;T<=g;T++){let R=v+(this.i(T)&65535)+(I.i(T)&65535),_=(R>>>16)+(this.i(T)>>>16)+(I.i(T)>>>16);v=_>>>16,R&=65535,_&=65535,y[T]=_<<16|R}return new a(y,y[y.length-1]&-2147483648?-1:0)};function H(I,g){return I.add(L(g))}n.j=function(I){if(N(this)||N(I))return m;if(M(this))return M(I)?L(this).j(L(I)):L(L(this).j(I));if(M(I))return L(this.j(L(I)));if(this.l(b)<0&&I.l(b)<0)return d(this.m()*I.m());const g=this.g.length+I.g.length,y=[];for(var v=0;v<2*g;v++)y[v]=0;for(v=0;v<this.g.length;v++)for(let T=0;T<I.g.length;T++){const R=this.i(v)>>>16,_=this.i(v)&65535,Oe=I.i(T)>>>16,on=I.i(T)&65535;y[2*v+2*T]+=_*on,J(y,2*v+2*T),y[2*v+2*T+1]+=R*on,J(y,2*v+2*T+1),y[2*v+2*T+1]+=_*Oe,J(y,2*v+2*T+1),y[2*v+2*T+2]+=R*Oe,J(y,2*v+2*T+2)}for(I=0;I<g;I++)y[I]=y[2*I+1]<<16|y[2*I];for(I=g;I<2*g;I++)y[I]=0;return new a(y,0)};function J(I,g){for(;(I[g]&65535)!=I[g];)I[g+1]+=I[g]>>>16,I[g]&=65535,g++}function ie(I,g){this.g=I,this.h=g}function Ke(I,g){if(N(g))throw Error("division by zero");if(N(I))return new ie(m,m);if(M(I))return g=Ke(L(I),g),new ie(L(g.g),L(g.h));if(M(g))return g=Ke(I,L(g)),new ie(L(g.g),g.h);if(I.g.length>30){if(M(I)||M(g))throw Error("slowDivide_ only works with positive integers.");for(var y=E,v=g;v.l(I)<=0;)y=Ie(y),v=Ie(v);var T=ve(y,1),R=ve(v,1);for(v=ve(v,2),y=ve(y,2);!N(v);){var _=R.add(v);_.l(I)<=0&&(T=T.add(y),R=_),v=ve(v,1),y=ve(y,1)}return g=H(I,T.j(g)),new ie(T,g)}for(T=m;I.l(g)>=0;){for(y=Math.max(1,Math.floor(I.m()/g.m())),v=Math.ceil(Math.log(y)/Math.LN2),v=v<=48?1:Math.pow(2,v-48),R=d(y),_=R.j(g);M(_)||_.l(I)>0;)y-=v,R=d(y),_=R.j(g);N(R)&&(R=E),T=T.add(R),I=H(I,_)}return new ie(T,I)}n.B=function(I){return Ke(this,I).h},n.and=function(I){const g=Math.max(this.g.length,I.g.length),y=[];for(let v=0;v<g;v++)y[v]=this.i(v)&I.i(v);return new a(y,this.h&I.h)},n.or=function(I){const g=Math.max(this.g.length,I.g.length),y=[];for(let v=0;v<g;v++)y[v]=this.i(v)|I.i(v);return new a(y,this.h|I.h)},n.xor=function(I){const g=Math.max(this.g.length,I.g.length),y=[];for(let v=0;v<g;v++)y[v]=this.i(v)^I.i(v);return new a(y,this.h^I.h)};function Ie(I){const g=I.g.length+1,y=[];for(let v=0;v<g;v++)y[v]=I.i(v)<<1|I.i(v-1)>>>31;return new a(y,I.h)}function ve(I,g){const y=g>>5;g%=32;const v=I.g.length-y,T=[];for(let R=0;R<v;R++)T[R]=g>0?I.i(R+y)>>>g|I.i(R+y+1)<<32-g:I.i(R+y);return new a(T,I.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,_h=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=p,Bt=a}).apply(typeof Du<"u"?Du:typeof self<"u"?self:typeof window<"u"?window:{});var Ls=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var yh,Ar,wh,Gs,Lo,Eh,Th,Ih;(function(){var n,e=Object.defineProperty;function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof Ls=="object"&&Ls];for(var u=0;u<o.length;++u){var h=o[u];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var r=t(this);function s(o,u){if(u)e:{var h=r;o=o.split(".");for(var f=0;f<o.length-1;f++){var A=o[f];if(!(A in h))break e;h=h[A]}o=o[o.length-1],f=h[o],u=u(f),u!=f&&u!=null&&e(h,o,{configurable:!0,writable:!0,value:u})}}s("Symbol.dispose",function(o){return o||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(o){return o||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(o){return o||function(u){var h=[],f;for(f in u)Object.prototype.hasOwnProperty.call(u,f)&&h.push([f,u[f]]);return h}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},a=this||self;function c(o){var u=typeof o;return u=="object"&&o!=null||u=="function"}function l(o,u,h){return o.call.apply(o.bind,arguments)}function d(o,u,h){return d=l,d.apply(null,arguments)}function p(o,u){var h=Array.prototype.slice.call(arguments,1);return function(){var f=h.slice();return f.push.apply(f,arguments),o.apply(this,f)}}function m(o,u){function h(){}h.prototype=u.prototype,o.Z=u.prototype,o.prototype=new h,o.prototype.constructor=o,o.Ob=function(f,A,P){for(var x=Array(arguments.length-2),W=2;W<arguments.length;W++)x[W-2]=arguments[W];return u.prototype[A].apply(f,x)}}var E=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?o=>o&&AsyncContext.Snapshot.wrap(o):o=>o;function b(o){const u=o.length;if(u>0){const h=Array(u);for(let f=0;f<u;f++)h[f]=o[f];return h}return[]}function N(o,u){for(let f=1;f<arguments.length;f++){const A=arguments[f];var h=typeof A;if(h=h!="object"?h:A?Array.isArray(A)?"array":h:"null",h=="array"||h=="object"&&typeof A.length=="number"){h=o.length||0;const P=A.length||0;o.length=h+P;for(let x=0;x<P;x++)o[h+x]=A[x]}else o.push(A)}}class M{constructor(u,h){this.i=u,this.j=h,this.h=0,this.g=null}get(){let u;return this.h>0?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function L(o){a.setTimeout(()=>{throw o},0)}function H(){var o=I;let u=null;return o.g&&(u=o.g,o.g=o.g.next,o.g||(o.h=null),u.next=null),u}class J{constructor(){this.h=this.g=null}add(u,h){const f=ie.get();f.set(u,h),this.h?this.h.next=f:this.g=f,this.h=f}}var ie=new M(()=>new Ke,o=>o.reset());class Ke{constructor(){this.next=this.g=this.h=null}set(u,h){this.h=u,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let Ie,ve=!1,I=new J,g=()=>{const o=Promise.resolve(void 0);Ie=()=>{o.then(y)}};function y(){for(var o;o=H();){try{o.h.call(o.g)}catch(h){L(h)}var u=ie;u.j(o),u.h<100&&(u.h++,o.next=u.g,u.g=o)}ve=!1}function v(){this.u=this.u,this.C=this.C}v.prototype.u=!1,v.prototype.dispose=function(){this.u||(this.u=!0,this.N())},v.prototype[Symbol.dispose]=function(){this.dispose()},v.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function T(o,u){this.type=o,this.g=this.target=u,this.defaultPrevented=!1}T.prototype.h=function(){this.defaultPrevented=!0};var R=(function(){if(!a.addEventListener||!Object.defineProperty)return!1;var o=!1,u=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const h=()=>{};a.addEventListener("test",h,u),a.removeEventListener("test",h,u)}catch{}return o})();function _(o){return/^[\s\xa0]*$/.test(o)}function Oe(o,u){T.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o&&this.init(o,u)}m(Oe,T),Oe.prototype.init=function(o,u){const h=this.type=o.type,f=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;this.target=o.target||o.srcElement,this.g=u,u=o.relatedTarget,u||(h=="mouseover"?u=o.fromElement:h=="mouseout"&&(u=o.toElement)),this.relatedTarget=u,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=o.pointerType,this.state=o.state,this.i=o,o.defaultPrevented&&Oe.Z.h.call(this)},Oe.prototype.h=function(){Oe.Z.h.call(this);const o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var on="closure_listenable_"+(Math.random()*1e6|0),mf=0;function gf(o,u,h,f,A){this.listener=o,this.proxy=null,this.src=u,this.type=h,this.capture=!!f,this.ha=A,this.key=++mf,this.da=this.fa=!1}function Es(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function Ts(o,u,h){for(const f in o)u.call(h,o[f],f,o)}function _f(o,u){for(const h in o)u.call(void 0,o[h],h,o)}function cc(o){const u={};for(const h in o)u[h]=o[h];return u}const uc="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function lc(o,u){let h,f;for(let A=1;A<arguments.length;A++){f=arguments[A];for(h in f)o[h]=f[h];for(let P=0;P<uc.length;P++)h=uc[P],Object.prototype.hasOwnProperty.call(f,h)&&(o[h]=f[h])}}function Is(o){this.src=o,this.g={},this.h=0}Is.prototype.add=function(o,u,h,f,A){const P=o.toString();o=this.g[P],o||(o=this.g[P]=[],this.h++);const x=Qi(o,u,f,A);return x>-1?(u=o[x],h||(u.fa=!1)):(u=new gf(u,this.src,P,!!f,A),u.fa=h,o.push(u)),u};function Ki(o,u){const h=u.type;if(h in o.g){var f=o.g[h],A=Array.prototype.indexOf.call(f,u,void 0),P;(P=A>=0)&&Array.prototype.splice.call(f,A,1),P&&(Es(u),o.g[h].length==0&&(delete o.g[h],o.h--))}}function Qi(o,u,h,f){for(let A=0;A<o.length;++A){const P=o[A];if(!P.da&&P.listener==u&&P.capture==!!h&&P.ha==f)return A}return-1}var Yi="closure_lm_"+(Math.random()*1e6|0),Ji={};function hc(o,u,h,f,A){if(Array.isArray(u)){for(let P=0;P<u.length;P++)hc(o,u[P],h,f,A);return null}return h=pc(h),o&&o[on]?o.J(u,h,c(f)?!!f.capture:!1,A):yf(o,u,h,!1,f,A)}function yf(o,u,h,f,A,P){if(!u)throw Error("Invalid event type");const x=c(A)?!!A.capture:!!A;let W=Zi(o);if(W||(o[Yi]=W=new Is(o)),h=W.add(u,h,f,x,P),h.proxy)return h;if(f=wf(),h.proxy=f,f.src=o,f.listener=h,o.addEventListener)R||(A=x),A===void 0&&(A=!1),o.addEventListener(u.toString(),f,A);else if(o.attachEvent)o.attachEvent(fc(u.toString()),f);else if(o.addListener&&o.removeListener)o.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return h}function wf(){function o(h){return u.call(o.src,o.listener,h)}const u=Ef;return o}function dc(o,u,h,f,A){if(Array.isArray(u))for(var P=0;P<u.length;P++)dc(o,u[P],h,f,A);else f=c(f)?!!f.capture:!!f,h=pc(h),o&&o[on]?(o=o.i,P=String(u).toString(),P in o.g&&(u=o.g[P],h=Qi(u,h,f,A),h>-1&&(Es(u[h]),Array.prototype.splice.call(u,h,1),u.length==0&&(delete o.g[P],o.h--)))):o&&(o=Zi(o))&&(u=o.g[u.toString()],o=-1,u&&(o=Qi(u,h,f,A)),(h=o>-1?u[o]:null)&&Xi(h))}function Xi(o){if(typeof o!="number"&&o&&!o.da){var u=o.src;if(u&&u[on])Ki(u.i,o);else{var h=o.type,f=o.proxy;u.removeEventListener?u.removeEventListener(h,f,o.capture):u.detachEvent?u.detachEvent(fc(h),f):u.addListener&&u.removeListener&&u.removeListener(f),(h=Zi(u))?(Ki(h,o),h.h==0&&(h.src=null,u[Yi]=null)):Es(o)}}}function fc(o){return o in Ji?Ji[o]:Ji[o]="on"+o}function Ef(o,u){if(o.da)o=!0;else{u=new Oe(u,this);const h=o.listener,f=o.ha||o.src;o.fa&&Xi(o),o=h.call(f,u)}return o}function Zi(o){return o=o[Yi],o instanceof Is?o:null}var eo="__closure_events_fn_"+(Math.random()*1e9>>>0);function pc(o){return typeof o=="function"?o:(o[eo]||(o[eo]=function(u){return o.handleEvent(u)}),o[eo])}function Ae(){v.call(this),this.i=new Is(this),this.M=this,this.G=null}m(Ae,v),Ae.prototype[on]=!0,Ae.prototype.removeEventListener=function(o,u,h,f){dc(this,o,u,h,f)};function Ce(o,u){var h,f=o.G;if(f)for(h=[];f;f=f.G)h.push(f);if(o=o.M,f=u.type||u,typeof u=="string")u=new T(u,o);else if(u instanceof T)u.target=u.target||o;else{var A=u;u=new T(f,o),lc(u,A)}A=!0;let P,x;if(h)for(x=h.length-1;x>=0;x--)P=u.g=h[x],A=vs(P,f,!0,u)&&A;if(P=u.g=o,A=vs(P,f,!0,u)&&A,A=vs(P,f,!1,u)&&A,h)for(x=0;x<h.length;x++)P=u.g=h[x],A=vs(P,f,!1,u)&&A}Ae.prototype.N=function(){if(Ae.Z.N.call(this),this.i){var o=this.i;for(const u in o.g){const h=o.g[u];for(let f=0;f<h.length;f++)Es(h[f]);delete o.g[u],o.h--}}this.G=null},Ae.prototype.J=function(o,u,h,f){return this.i.add(String(o),u,!1,h,f)},Ae.prototype.K=function(o,u,h,f){return this.i.add(String(o),u,!0,h,f)};function vs(o,u,h,f){if(u=o.i.g[String(u)],!u)return!0;u=u.concat();let A=!0;for(let P=0;P<u.length;++P){const x=u[P];if(x&&!x.da&&x.capture==h){const W=x.listener,fe=x.ha||x.src;x.fa&&Ki(o.i,x),A=W.call(fe,f)!==!1&&A}}return A&&!f.defaultPrevented}function Tf(o,u){if(typeof o!="function")if(o&&typeof o.handleEvent=="function")o=d(o.handleEvent,o);else throw Error("Invalid listener argument");return Number(u)>2147483647?-1:a.setTimeout(o,u||0)}function mc(o){o.g=Tf(()=>{o.g=null,o.i&&(o.i=!1,mc(o))},o.l);const u=o.h;o.h=null,o.m.apply(null,u)}class If extends v{constructor(u,h){super(),this.m=u,this.l=h,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:mc(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function or(o){v.call(this),this.h=o,this.g={}}m(or,v);var gc=[];function _c(o){Ts(o.g,function(u,h){this.g.hasOwnProperty(h)&&Xi(u)},o),o.g={}}or.prototype.N=function(){or.Z.N.call(this),_c(this)},or.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var to=a.JSON.stringify,vf=a.JSON.parse,Af=class{stringify(o){return a.JSON.stringify(o,void 0)}parse(o){return a.JSON.parse(o,void 0)}};function yc(){}function wc(){}var ar={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function no(){T.call(this,"d")}m(no,T);function ro(){T.call(this,"c")}m(ro,T);var an={},Ec=null;function As(){return Ec=Ec||new Ae}an.Ia="serverreachability";function Tc(o){T.call(this,an.Ia,o)}m(Tc,T);function cr(o){const u=As();Ce(u,new Tc(u))}an.STAT_EVENT="statevent";function Ic(o,u){T.call(this,an.STAT_EVENT,o),this.stat=u}m(Ic,T);function Ne(o){const u=As();Ce(u,new Ic(u,o))}an.Ja="timingevent";function vc(o,u){T.call(this,an.Ja,o),this.size=u}m(vc,T);function ur(o,u){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){o()},u)}function lr(){this.g=!0}lr.prototype.ua=function(){this.g=!1};function Rf(o,u,h,f,A,P){o.info(function(){if(o.g)if(P){var x="",W=P.split("&");for(let ee=0;ee<W.length;ee++){var fe=W[ee].split("=");if(fe.length>1){const me=fe[0];fe=fe[1];const nt=me.split("_");x=nt.length>=2&&nt[1]=="type"?x+(me+"="+fe+"&"):x+(me+"=redacted&")}}}else x=null;else x=P;return"XMLHTTP REQ ("+f+") [attempt "+A+"]: "+u+`
`+h+`
`+x})}function Pf(o,u,h,f,A,P,x){o.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+A+"]: "+u+`
`+h+`
`+P+" "+x})}function Vn(o,u,h,f){o.info(function(){return"XMLHTTP TEXT ("+u+"): "+Vf(o,h)+(f?" "+f:"")})}function Sf(o,u){o.info(function(){return"TIMEOUT: "+u})}lr.prototype.info=function(){};function Vf(o,u){if(!o.g)return u;if(!u)return null;try{const P=JSON.parse(u);if(P){for(o=0;o<P.length;o++)if(Array.isArray(P[o])){var h=P[o];if(!(h.length<2)){var f=h[1];if(Array.isArray(f)&&!(f.length<1)){var A=f[0];if(A!="noop"&&A!="stop"&&A!="close")for(let x=1;x<f.length;x++)f[x]=""}}}}return to(P)}catch{return u}}var Rs={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Ac={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Rc;function so(){}m(so,yc),so.prototype.g=function(){return new XMLHttpRequest},Rc=new so;function hr(o){return encodeURIComponent(String(o))}function bf(o){var u=1;o=o.split(":");const h=[];for(;u>0&&o.length;)h.push(o.shift()),u--;return o.length&&h.push(o.join(":")),h}function St(o,u,h,f){this.j=o,this.i=u,this.l=h,this.S=f||1,this.V=new or(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Pc}function Pc(){this.i=null,this.g="",this.h=!1}var Sc={},io={};function oo(o,u,h){o.M=1,o.A=Ss(tt(u)),o.u=h,o.R=!0,Vc(o,null)}function Vc(o,u){o.F=Date.now(),Ps(o),o.B=tt(o.A);var h=o.B,f=o.S;Array.isArray(f)||(f=[String(f)]),qc(h.i,"t",f),o.C=0,h=o.j.L,o.h=new Pc,o.g=iu(o.j,h?u:null,!o.u),o.P>0&&(o.O=new If(d(o.Y,o,o.g),o.P)),u=o.V,h=o.g,f=o.ba;var A="readystatechange";Array.isArray(A)||(A&&(gc[0]=A.toString()),A=gc);for(let P=0;P<A.length;P++){const x=hc(h,A[P],f||u.handleEvent,!1,u.h||u);if(!x)break;u.g[x.key]=x}u=o.J?cc(o.J):{},o.u?(o.v||(o.v="POST"),u["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.B,o.v,o.u,u)):(o.v="GET",o.g.ea(o.B,o.v,null,u)),cr(),Rf(o.i,o.v,o.B,o.l,o.S,o.u)}St.prototype.ba=function(o){o=o.target;const u=this.O;u&&Ct(o)==3?u.j():this.Y(o)},St.prototype.Y=function(o){try{if(o==this.g)e:{const W=Ct(this.g),fe=this.g.ya(),ee=this.g.ca();if(!(W<3)&&(W!=3||this.g&&(this.h.h||this.g.la()||Kc(this.g)))){this.K||W!=4||fe==7||(fe==8||ee<=0?cr(3):cr(2)),ao(this);var u=this.g.ca();this.X=u;var h=Cf(this);if(this.o=u==200,Pf(this.i,this.v,this.B,this.l,this.S,W,u),this.o){if(this.U&&!this.L){t:{if(this.g){var f,A=this.g;if((f=A.g?A.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!_(f)){var P=f;break t}}P=null}if(o=P)Vn(this.i,this.l,o,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,co(this,o);else{this.o=!1,this.m=3,Ne(12),cn(this),dr(this);break e}}if(this.R){o=!0;let me;for(;!this.K&&this.C<h.length;)if(me=Nf(this,h),me==io){W==4&&(this.m=4,Ne(14),o=!1),Vn(this.i,this.l,null,"[Incomplete Response]");break}else if(me==Sc){this.m=4,Ne(15),Vn(this.i,this.l,h,"[Invalid Chunk]"),o=!1;break}else Vn(this.i,this.l,me,null),co(this,me);if(bc(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),W!=4||h.length!=0||this.h.h||(this.m=1,Ne(16),o=!1),this.o=this.o&&o,!o)Vn(this.i,this.l,h,"[Invalid Chunked Response]"),cn(this),dr(this);else if(h.length>0&&!this.W){this.W=!0;var x=this.j;x.g==this&&x.aa&&!x.P&&(x.j.info("Great, no buffering proxy detected. Bytes received: "+h.length),_o(x),x.P=!0,Ne(11))}}else Vn(this.i,this.l,h,null),co(this,h);W==4&&cn(this),this.o&&!this.K&&(W==4?tu(this.j,this):(this.o=!1,Ps(this)))}else Wf(this.g),u==400&&h.indexOf("Unknown SID")>0?(this.m=3,Ne(12)):(this.m=0,Ne(13)),cn(this),dr(this)}}}catch{}finally{}};function Cf(o){if(!bc(o))return o.g.la();const u=Kc(o.g);if(u==="")return"";let h="";const f=u.length,A=Ct(o.g)==4;if(!o.h.i){if(typeof TextDecoder>"u")return cn(o),dr(o),"";o.h.i=new a.TextDecoder}for(let P=0;P<f;P++)o.h.h=!0,h+=o.h.i.decode(u[P],{stream:!(A&&P==f-1)});return u.length=0,o.h.g+=h,o.C=0,o.h.g}function bc(o){return o.g?o.v=="GET"&&o.M!=2&&o.j.Aa:!1}function Nf(o,u){var h=o.C,f=u.indexOf(`
`,h);return f==-1?io:(h=Number(u.substring(h,f)),isNaN(h)?Sc:(f+=1,f+h>u.length?io:(u=u.slice(f,f+h),o.C=f+h,u)))}St.prototype.cancel=function(){this.K=!0,cn(this)};function Ps(o){o.T=Date.now()+o.H,Cc(o,o.H)}function Cc(o,u){if(o.D!=null)throw Error("WatchDog timer not null");o.D=ur(d(o.aa,o),u)}function ao(o){o.D&&(a.clearTimeout(o.D),o.D=null)}St.prototype.aa=function(){this.D=null;const o=Date.now();o-this.T>=0?(Sf(this.i,this.B),this.M!=2&&(cr(),Ne(17)),cn(this),this.m=2,dr(this)):Cc(this,this.T-o)};function dr(o){o.j.I==0||o.K||tu(o.j,o)}function cn(o){ao(o);var u=o.O;u&&typeof u.dispose=="function"&&u.dispose(),o.O=null,_c(o.V),o.g&&(u=o.g,o.g=null,u.abort(),u.dispose())}function co(o,u){try{var h=o.j;if(h.I!=0&&(h.g==o||uo(h.h,o))){if(!o.L&&uo(h.h,o)&&h.I==3){try{var f=h.Ba.g.parse(u)}catch{f=null}if(Array.isArray(f)&&f.length==3){var A=f;if(A[0]==0){e:if(!h.v){if(h.g)if(h.g.F+3e3<o.F)ks(h),Cs(h);else break e;go(h),Ne(18)}}else h.xa=A[1],0<h.xa-h.K&&A[2]<37500&&h.F&&h.A==0&&!h.C&&(h.C=ur(d(h.Va,h),6e3));Dc(h.h)<=1&&h.ta&&(h.ta=void 0)}else ln(h,11)}else if((o.L||h.g==o)&&ks(h),!_(u))for(A=h.Ba.g.parse(u),u=0;u<A.length;u++){let ee=A[u];const me=ee[0];if(!(me<=h.K))if(h.K=me,ee=ee[1],h.I==2)if(ee[0]=="c"){h.M=ee[1],h.ba=ee[2];const nt=ee[3];nt!=null&&(h.ka=nt,h.j.info("VER="+h.ka));const hn=ee[4];hn!=null&&(h.za=hn,h.j.info("SVER="+h.za));const Nt=ee[5];Nt!=null&&typeof Nt=="number"&&Nt>0&&(f=1.5*Nt,h.O=f,h.j.info("backChannelRequestTimeoutMs_="+f)),f=h;const kt=o.g;if(kt){const xs=kt.g?kt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(xs){var P=f.h;P.g||xs.indexOf("spdy")==-1&&xs.indexOf("quic")==-1&&xs.indexOf("h2")==-1||(P.j=P.l,P.g=new Set,P.h&&(lo(P,P.h),P.h=null))}if(f.G){const yo=kt.g?kt.g.getResponseHeader("X-HTTP-Session-Id"):null;yo&&(f.wa=yo,te(f.J,f.G,yo))}}h.I=3,h.l&&h.l.ra(),h.aa&&(h.T=Date.now()-o.F,h.j.info("Handshake RTT: "+h.T+"ms")),f=h;var x=o;if(f.na=su(f,f.L?f.ba:null,f.W),x.L){xc(f.h,x);var W=x,fe=f.O;fe&&(W.H=fe),W.D&&(ao(W),Ps(W)),f.g=x}else Zc(f);h.i.length>0&&Ns(h)}else ee[0]!="stop"&&ee[0]!="close"||ln(h,7);else h.I==3&&(ee[0]=="stop"||ee[0]=="close"?ee[0]=="stop"?ln(h,7):mo(h):ee[0]!="noop"&&h.l&&h.l.qa(ee),h.A=0)}}cr(4)}catch{}}var kf=class{constructor(o,u){this.g=o,this.map=u}};function Nc(o){this.l=o||10,a.PerformanceNavigationTiming?(o=a.performance.getEntriesByType("navigation"),o=o.length>0&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function kc(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function Dc(o){return o.h?1:o.g?o.g.size:0}function uo(o,u){return o.h?o.h==u:o.g?o.g.has(u):!1}function lo(o,u){o.g?o.g.add(u):o.h=u}function xc(o,u){o.h&&o.h==u?o.h=null:o.g&&o.g.has(u)&&o.g.delete(u)}Nc.prototype.cancel=function(){if(this.i=Oc(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function Oc(o){if(o.h!=null)return o.i.concat(o.h.G);if(o.g!=null&&o.g.size!==0){let u=o.i;for(const h of o.g.values())u=u.concat(h.G);return u}return b(o.i)}var Lc=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Df(o,u){if(o){o=o.split("&");for(let h=0;h<o.length;h++){const f=o[h].indexOf("=");let A,P=null;f>=0?(A=o[h].substring(0,f),P=o[h].substring(f+1)):A=o[h],u(A,P?decodeURIComponent(P.replace(/\+/g," ")):"")}}}function Vt(o){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let u;o instanceof Vt?(this.l=o.l,fr(this,o.j),this.o=o.o,this.g=o.g,pr(this,o.u),this.h=o.h,ho(this,$c(o.i)),this.m=o.m):o&&(u=String(o).match(Lc))?(this.l=!1,fr(this,u[1]||"",!0),this.o=mr(u[2]||""),this.g=mr(u[3]||"",!0),pr(this,u[4]),this.h=mr(u[5]||"",!0),ho(this,u[6]||"",!0),this.m=mr(u[7]||"")):(this.l=!1,this.i=new _r(null,this.l))}Vt.prototype.toString=function(){const o=[];var u=this.j;u&&o.push(gr(u,Mc,!0),":");var h=this.g;return(h||u=="file")&&(o.push("//"),(u=this.o)&&o.push(gr(u,Mc,!0),"@"),o.push(hr(h).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.u,h!=null&&o.push(":",String(h))),(h=this.h)&&(this.g&&h.charAt(0)!="/"&&o.push("/"),o.push(gr(h,h.charAt(0)=="/"?Lf:Of,!0))),(h=this.i.toString())&&o.push("?",h),(h=this.m)&&o.push("#",gr(h,Uf)),o.join("")},Vt.prototype.resolve=function(o){const u=tt(this);let h=!!o.j;h?fr(u,o.j):h=!!o.o,h?u.o=o.o:h=!!o.g,h?u.g=o.g:h=o.u!=null;var f=o.h;if(h)pr(u,o.u);else if(h=!!o.h){if(f.charAt(0)!="/")if(this.g&&!this.h)f="/"+f;else{var A=u.h.lastIndexOf("/");A!=-1&&(f=u.h.slice(0,A+1)+f)}if(A=f,A==".."||A==".")f="";else if(A.indexOf("./")!=-1||A.indexOf("/.")!=-1){f=A.lastIndexOf("/",0)==0,A=A.split("/");const P=[];for(let x=0;x<A.length;){const W=A[x++];W=="."?f&&x==A.length&&P.push(""):W==".."?((P.length>1||P.length==1&&P[0]!="")&&P.pop(),f&&x==A.length&&P.push("")):(P.push(W),f=!0)}f=P.join("/")}else f=A}return h?u.h=f:h=o.i.toString()!=="",h?ho(u,$c(o.i)):h=!!o.m,h&&(u.m=o.m),u};function tt(o){return new Vt(o)}function fr(o,u,h){o.j=h?mr(u,!0):u,o.j&&(o.j=o.j.replace(/:$/,""))}function pr(o,u){if(u){if(u=Number(u),isNaN(u)||u<0)throw Error("Bad port number "+u);o.u=u}else o.u=null}function ho(o,u,h){u instanceof _r?(o.i=u,Ff(o.i,o.l)):(h||(u=gr(u,Mf)),o.i=new _r(u,o.l))}function te(o,u,h){o.i.set(u,h)}function Ss(o){return te(o,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),o}function mr(o,u){return o?u?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function gr(o,u,h){return typeof o=="string"?(o=encodeURI(o).replace(u,xf),h&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function xf(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Mc=/[#\/\?@]/g,Of=/[#\?:]/g,Lf=/[#\?]/g,Mf=/[#\?@]/g,Uf=/#/g;function _r(o,u){this.h=this.g=null,this.i=o||null,this.j=!!u}function un(o){o.g||(o.g=new Map,o.h=0,o.i&&Df(o.i,function(u,h){o.add(decodeURIComponent(u.replace(/\+/g," ")),h)}))}n=_r.prototype,n.add=function(o,u){un(this),this.i=null,o=bn(this,o);let h=this.g.get(o);return h||this.g.set(o,h=[]),h.push(u),this.h+=1,this};function Uc(o,u){un(o),u=bn(o,u),o.g.has(u)&&(o.i=null,o.h-=o.g.get(u).length,o.g.delete(u))}function Fc(o,u){return un(o),u=bn(o,u),o.g.has(u)}n.forEach=function(o,u){un(this),this.g.forEach(function(h,f){h.forEach(function(A){o.call(u,A,f,this)},this)},this)};function Bc(o,u){un(o);let h=[];if(typeof u=="string")Fc(o,u)&&(h=h.concat(o.g.get(bn(o,u))));else for(o=Array.from(o.g.values()),u=0;u<o.length;u++)h=h.concat(o[u]);return h}n.set=function(o,u){return un(this),this.i=null,o=bn(this,o),Fc(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[u]),this.h+=1,this},n.get=function(o,u){return o?(o=Bc(this,o),o.length>0?String(o[0]):u):u};function qc(o,u,h){Uc(o,u),h.length>0&&(o.i=null,o.g.set(bn(o,u),b(h)),o.h+=h.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],u=Array.from(this.g.keys());for(let f=0;f<u.length;f++){var h=u[f];const A=hr(h);h=Bc(this,h);for(let P=0;P<h.length;P++){let x=A;h[P]!==""&&(x+="="+hr(h[P])),o.push(x)}}return this.i=o.join("&")};function $c(o){const u=new _r;return u.i=o.i,o.g&&(u.g=new Map(o.g),u.h=o.h),u}function bn(o,u){return u=String(u),o.j&&(u=u.toLowerCase()),u}function Ff(o,u){u&&!o.j&&(un(o),o.i=null,o.g.forEach(function(h,f){const A=f.toLowerCase();f!=A&&(Uc(this,f),qc(this,A,h))},o)),o.j=u}function Bf(o,u){const h=new lr;if(a.Image){const f=new Image;f.onload=p(bt,h,"TestLoadImage: loaded",!0,u,f),f.onerror=p(bt,h,"TestLoadImage: error",!1,u,f),f.onabort=p(bt,h,"TestLoadImage: abort",!1,u,f),f.ontimeout=p(bt,h,"TestLoadImage: timeout",!1,u,f),a.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=o}else u(!1)}function qf(o,u){const h=new lr,f=new AbortController,A=setTimeout(()=>{f.abort(),bt(h,"TestPingServer: timeout",!1,u)},1e4);fetch(o,{signal:f.signal}).then(P=>{clearTimeout(A),P.ok?bt(h,"TestPingServer: ok",!0,u):bt(h,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(A),bt(h,"TestPingServer: error",!1,u)})}function bt(o,u,h,f,A){try{A&&(A.onload=null,A.onerror=null,A.onabort=null,A.ontimeout=null),f(h)}catch{}}function $f(){this.g=new Af}function fo(o){this.i=o.Sb||null,this.h=o.ab||!1}m(fo,yc),fo.prototype.g=function(){return new Vs(this.i,this.h)};function Vs(o,u){Ae.call(this),this.H=o,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}m(Vs,Ae),n=Vs.prototype,n.open=function(o,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=o,this.D=u,this.readyState=1,wr(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const u={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};o&&(u.body=o),(this.H||a).fetch(new Request(this.D,u)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,yr(this)),this.readyState=0},n.Pa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,wr(this)),this.g&&(this.readyState=3,wr(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;jc(this)}else o.text().then(this.Oa.bind(this),this.ga.bind(this))};function jc(o){o.j.read().then(o.Ma.bind(o)).catch(o.ga.bind(o))}n.Ma=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var u=o.value?o.value:new Uint8Array(0);(u=this.B.decode(u,{stream:!o.done}))&&(this.response=this.responseText+=u)}o.done?yr(this):wr(this),this.readyState==3&&jc(this)}},n.Oa=function(o){this.g&&(this.response=this.responseText=o,yr(this))},n.Na=function(o){this.g&&(this.response=o,yr(this))},n.ga=function(){this.g&&yr(this)};function yr(o){o.readyState=4,o.l=null,o.j=null,o.B=null,wr(o)}n.setRequestHeader=function(o,u){this.A.append(o,u)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],u=this.h.entries();for(var h=u.next();!h.done;)h=h.value,o.push(h[0]+": "+h[1]),h=u.next();return o.join(`\r
`)};function wr(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(Vs.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function zc(o){let u="";return Ts(o,function(h,f){u+=f,u+=":",u+=h,u+=`\r
`}),u}function po(o,u,h){e:{for(f in h){var f=!1;break e}f=!0}f||(h=zc(h),typeof o=="string"?h!=null&&hr(h):te(o,u,h))}function oe(o){Ae.call(this),this.headers=new Map,this.L=o||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}m(oe,Ae);var jf=/^https?$/i,zf=["POST","PUT"];n=oe.prototype,n.Fa=function(o){this.H=o},n.ea=function(o,u,h,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);u=u?u.toUpperCase():"GET",this.D=o,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Rc.g(),this.g.onreadystatechange=E(d(this.Ca,this));try{this.B=!0,this.g.open(u,String(o),!0),this.B=!1}catch(P){Wc(this,P);return}if(o=h||"",h=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var A in f)h.set(A,f[A]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(const P of f.keys())h.set(P,f.get(P));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(h.keys()).find(P=>P.toLowerCase()=="content-type"),A=a.FormData&&o instanceof a.FormData,!(Array.prototype.indexOf.call(zf,u,void 0)>=0)||f||A||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[P,x]of h)this.g.setRequestHeader(P,x);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(o),this.v=!1}catch(P){Wc(this,P)}};function Wc(o,u){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=u,o.o=5,Hc(o),bs(o)}function Hc(o){o.A||(o.A=!0,Ce(o,"complete"),Ce(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=o||7,Ce(this,"complete"),Ce(this,"abort"),bs(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),bs(this,!0)),oe.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?Gc(this):this.Xa())},n.Xa=function(){Gc(this)};function Gc(o){if(o.h&&typeof i<"u"){if(o.v&&Ct(o)==4)setTimeout(o.Ca.bind(o),0);else if(Ce(o,"readystatechange"),Ct(o)==4){o.h=!1;try{const P=o.ca();e:switch(P){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var h;if(!(h=u)){var f;if(f=P===0){let x=String(o.D).match(Lc)[1]||null;!x&&a.self&&a.self.location&&(x=a.self.location.protocol.slice(0,-1)),f=!jf.test(x?x.toLowerCase():"")}h=f}if(h)Ce(o,"complete"),Ce(o,"success");else{o.o=6;try{var A=Ct(o)>2?o.g.statusText:""}catch{A=""}o.l=A+" ["+o.ca()+"]",Hc(o)}}finally{bs(o)}}}}function bs(o,u){if(o.g){o.m&&(clearTimeout(o.m),o.m=null);const h=o.g;o.g=null,u||Ce(o,"ready");try{h.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function Ct(o){return o.g?o.g.readyState:0}n.ca=function(){try{return Ct(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(o){if(this.g){var u=this.g.responseText;return o&&u.indexOf(o)==0&&(u=u.substring(o.length)),vf(u)}};function Kc(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.F){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function Wf(o){const u={};o=(o.g&&Ct(o)>=2&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<o.length;f++){if(_(o[f]))continue;var h=bf(o[f]);const A=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const P=u[A]||[];u[A]=P,P.push(h)}_f(u,function(f){return f.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Er(o,u,h){return h&&h.internalChannelParams&&h.internalChannelParams[o]||u}function Qc(o){this.za=0,this.i=[],this.j=new lr,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Er("failFast",!1,o),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Er("baseRetryDelayMs",5e3,o),this.Za=Er("retryDelaySeedMs",1e4,o),this.Ta=Er("forwardChannelMaxRetries",2,o),this.va=Er("forwardChannelRequestTimeoutMs",2e4,o),this.ma=o&&o.xmlHttpFactory||void 0,this.Ua=o&&o.Rb||void 0,this.Aa=o&&o.useFetchStreams||!1,this.O=void 0,this.L=o&&o.supportsCrossDomainXhr||!1,this.M="",this.h=new Nc(o&&o.concurrentRequestLimit),this.Ba=new $f,this.S=o&&o.fastHandshake||!1,this.R=o&&o.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=o&&o.Pb||!1,o&&o.ua&&this.j.ua(),o&&o.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&o&&o.detectBufferingProxy||!1,this.ia=void 0,o&&o.longPollingTimeout&&o.longPollingTimeout>0&&(this.ia=o.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=Qc.prototype,n.ka=8,n.I=1,n.connect=function(o,u,h,f){Ne(0),this.W=o,this.H=u||{},h&&f!==void 0&&(this.H.OSID=h,this.H.OAID=f),this.F=this.X,this.J=su(this,null,this.W),Ns(this)};function mo(o){if(Yc(o),o.I==3){var u=o.V++,h=tt(o.J);if(te(h,"SID",o.M),te(h,"RID",u),te(h,"TYPE","terminate"),Tr(o,h),u=new St(o,o.j,u),u.M=2,u.A=Ss(tt(h)),h=!1,a.navigator&&a.navigator.sendBeacon)try{h=a.navigator.sendBeacon(u.A.toString(),"")}catch{}!h&&a.Image&&(new Image().src=u.A,h=!0),h||(u.g=iu(u.j,null),u.g.ea(u.A)),u.F=Date.now(),Ps(u)}ru(o)}function Cs(o){o.g&&(_o(o),o.g.cancel(),o.g=null)}function Yc(o){Cs(o),o.v&&(a.clearTimeout(o.v),o.v=null),ks(o),o.h.cancel(),o.m&&(typeof o.m=="number"&&a.clearTimeout(o.m),o.m=null)}function Ns(o){if(!kc(o.h)&&!o.m){o.m=!0;var u=o.Ea;Ie||g(),ve||(Ie(),ve=!0),I.add(u,o),o.D=0}}function Hf(o,u){return Dc(o.h)>=o.h.j-(o.m?1:0)?!1:o.m?(o.i=u.G.concat(o.i),!0):o.I==1||o.I==2||o.D>=(o.Sa?0:o.Ta)?!1:(o.m=ur(d(o.Ea,o,u),nu(o,o.D)),o.D++,!0)}n.Ea=function(o){if(this.m)if(this.m=null,this.I==1){if(!o){this.V=Math.floor(Math.random()*1e5),o=this.V++;const A=new St(this,this.j,o);let P=this.o;if(this.U&&(P?(P=cc(P),lc(P,this.U)):P=this.U),this.u!==null||this.R||(A.J=P,P=null),this.S)e:{for(var u=0,h=0;h<this.i.length;h++){t:{var f=this.i[h];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break t}f=void 0}if(f===void 0)break;if(u+=f,u>4096){u=h;break e}if(u===4096||h===this.i.length-1){u=h+1;break e}}u=1e3}else u=1e3;u=Xc(this,A,u),h=tt(this.J),te(h,"RID",o),te(h,"CVER",22),this.G&&te(h,"X-HTTP-Session-Id",this.G),Tr(this,h),P&&(this.R?u="headers="+hr(zc(P))+"&"+u:this.u&&po(h,this.u,P)),lo(this.h,A),this.Ra&&te(h,"TYPE","init"),this.S?(te(h,"$req",u),te(h,"SID","null"),A.U=!0,oo(A,h,null)):oo(A,h,u),this.I=2}}else this.I==3&&(o?Jc(this,o):this.i.length==0||kc(this.h)||Jc(this))};function Jc(o,u){var h;u?h=u.l:h=o.V++;const f=tt(o.J);te(f,"SID",o.M),te(f,"RID",h),te(f,"AID",o.K),Tr(o,f),o.u&&o.o&&po(f,o.u,o.o),h=new St(o,o.j,h,o.D+1),o.u===null&&(h.J=o.o),u&&(o.i=u.G.concat(o.i)),u=Xc(o,h,1e3),h.H=Math.round(o.va*.5)+Math.round(o.va*.5*Math.random()),lo(o.h,h),oo(h,f,u)}function Tr(o,u){o.H&&Ts(o.H,function(h,f){te(u,f,h)}),o.l&&Ts({},function(h,f){te(u,f,h)})}function Xc(o,u,h){h=Math.min(o.i.length,h);const f=o.l?d(o.l.Ka,o.l,o):null;e:{var A=o.i;let W=-1;for(;;){const fe=["count="+h];W==-1?h>0?(W=A[0].g,fe.push("ofs="+W)):W=0:fe.push("ofs="+W);let ee=!0;for(let me=0;me<h;me++){var P=A[me].g;const nt=A[me].map;if(P-=W,P<0)W=Math.max(0,A[me].g-100),ee=!1;else try{P="req"+P+"_"||"";try{var x=nt instanceof Map?nt:Object.entries(nt);for(const[hn,Nt]of x){let kt=Nt;c(Nt)&&(kt=to(Nt)),fe.push(P+hn+"="+encodeURIComponent(kt))}}catch(hn){throw fe.push(P+"type="+encodeURIComponent("_badmap")),hn}}catch{f&&f(nt)}}if(ee){x=fe.join("&");break e}}x=void 0}return o=o.i.splice(0,h),u.G=o,x}function Zc(o){if(!o.g&&!o.v){o.Y=1;var u=o.Da;Ie||g(),ve||(Ie(),ve=!0),I.add(u,o),o.A=0}}function go(o){return o.g||o.v||o.A>=3?!1:(o.Y++,o.v=ur(d(o.Da,o),nu(o,o.A)),o.A++,!0)}n.Da=function(){if(this.v=null,eu(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var o=4*this.T;this.j.info("BP detection timer enabled: "+o),this.B=ur(d(this.Wa,this),o)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Ne(10),Cs(this),eu(this))};function _o(o){o.B!=null&&(a.clearTimeout(o.B),o.B=null)}function eu(o){o.g=new St(o,o.j,"rpc",o.Y),o.u===null&&(o.g.J=o.o),o.g.P=0;var u=tt(o.na);te(u,"RID","rpc"),te(u,"SID",o.M),te(u,"AID",o.K),te(u,"CI",o.F?"0":"1"),!o.F&&o.ia&&te(u,"TO",o.ia),te(u,"TYPE","xmlhttp"),Tr(o,u),o.u&&o.o&&po(u,o.u,o.o),o.O&&(o.g.H=o.O);var h=o.g;o=o.ba,h.M=1,h.A=Ss(tt(u)),h.u=null,h.R=!0,Vc(h,o)}n.Va=function(){this.C!=null&&(this.C=null,Cs(this),go(this),Ne(19))};function ks(o){o.C!=null&&(a.clearTimeout(o.C),o.C=null)}function tu(o,u){var h=null;if(o.g==u){ks(o),_o(o),o.g=null;var f=2}else if(uo(o.h,u))h=u.G,xc(o.h,u),f=1;else return;if(o.I!=0){if(u.o)if(f==1){h=u.u?u.u.length:0,u=Date.now()-u.F;var A=o.D;f=As(),Ce(f,new vc(f,h)),Ns(o)}else Zc(o);else if(A=u.m,A==3||A==0&&u.X>0||!(f==1&&Hf(o,u)||f==2&&go(o)))switch(h&&h.length>0&&(u=o.h,u.i=u.i.concat(h)),A){case 1:ln(o,5);break;case 4:ln(o,10);break;case 3:ln(o,6);break;default:ln(o,2)}}}function nu(o,u){let h=o.Qa+Math.floor(Math.random()*o.Za);return o.isActive()||(h*=2),h*u}function ln(o,u){if(o.j.info("Error code "+u),u==2){var h=d(o.bb,o),f=o.Ua;const A=!f;f=new Vt(f||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||fr(f,"https"),Ss(f),A?Bf(f.toString(),h):qf(f.toString(),h)}else Ne(2);o.I=0,o.l&&o.l.pa(u),ru(o),Yc(o)}n.bb=function(o){o?(this.j.info("Successfully pinged google.com"),Ne(2)):(this.j.info("Failed to ping google.com"),Ne(1))};function ru(o){if(o.I=0,o.ja=[],o.l){const u=Oc(o.h);(u.length!=0||o.i.length!=0)&&(N(o.ja,u),N(o.ja,o.i),o.h.i.length=0,b(o.i),o.i.length=0),o.l.oa()}}function su(o,u,h){var f=h instanceof Vt?tt(h):new Vt(h);if(f.g!="")u&&(f.g=u+"."+f.g),pr(f,f.u);else{var A=a.location;f=A.protocol,u=u?u+"."+A.hostname:A.hostname,A=+A.port;const P=new Vt(null);f&&fr(P,f),u&&(P.g=u),A&&pr(P,A),h&&(P.h=h),f=P}return h=o.G,u=o.wa,h&&u&&te(f,h,u),te(f,"VER",o.ka),Tr(o,f),f}function iu(o,u,h){if(u&&!o.L)throw Error("Can't create secondary domain capable XhrIo object.");return u=o.Aa&&!o.ma?new oe(new fo({ab:h})):new oe(o.ma),u.Fa(o.L),u}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function ou(){}n=ou.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function Ds(){}Ds.prototype.g=function(o,u){return new $e(o,u)};function $e(o,u){Ae.call(this),this.g=new Qc(u),this.l=o,this.h=u&&u.messageUrlParams||null,o=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(o?o["X-WebChannel-Content-Type"]=u.messageContentType:o={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.sa&&(o?o["X-WebChannel-Client-Profile"]=u.sa:o={"X-WebChannel-Client-Profile":u.sa}),this.g.U=o,(o=u&&u.Qb)&&!_(o)&&(this.g.u=o),this.A=u&&u.supportsCrossDomainXhr||!1,this.v=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!_(u)&&(this.g.G=u,o=this.h,o!==null&&u in o&&(o=this.h,u in o&&delete o[u])),this.j=new Cn(this)}m($e,Ae),$e.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},$e.prototype.close=function(){mo(this.g)},$e.prototype.o=function(o){var u=this.g;if(typeof o=="string"){var h={};h.__data__=o,o=h}else this.v&&(h={},h.__data__=to(o),o=h);u.i.push(new kf(u.Ya++,o)),u.I==3&&Ns(u)},$e.prototype.N=function(){this.g.l=null,delete this.j,mo(this.g),delete this.g,$e.Z.N.call(this)};function au(o){no.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var u=o.__sm__;if(u){e:{for(const h in u){o=h;break e}o=void 0}(this.i=o)&&(o=this.i,u=u!==null&&o in u?u[o]:void 0),this.data=u}else this.data=o}m(au,no);function cu(){ro.call(this),this.status=1}m(cu,ro);function Cn(o){this.g=o}m(Cn,ou),Cn.prototype.ra=function(){Ce(this.g,"a")},Cn.prototype.qa=function(o){Ce(this.g,new au(o))},Cn.prototype.pa=function(o){Ce(this.g,new cu)},Cn.prototype.oa=function(){Ce(this.g,"b")},Ds.prototype.createWebChannel=Ds.prototype.g,$e.prototype.send=$e.prototype.o,$e.prototype.open=$e.prototype.m,$e.prototype.close=$e.prototype.close,Ih=function(){return new Ds},Th=function(){return As()},Eh=an,Lo={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Rs.NO_ERROR=0,Rs.TIMEOUT=8,Rs.HTTP_ERROR=6,Gs=Rs,Ac.COMPLETE="complete",wh=Ac,wc.EventType=ar,ar.OPEN="a",ar.CLOSE="b",ar.ERROR="c",ar.MESSAGE="d",Ae.prototype.listen=Ae.prototype.J,Ar=wc,oe.prototype.listenOnce=oe.prototype.K,oe.prototype.getLastError=oe.prototype.Ha,oe.prototype.getLastErrorCode=oe.prototype.ya,oe.prototype.getStatus=oe.prototype.ca,oe.prototype.getResponseJson=oe.prototype.La,oe.prototype.getResponseText=oe.prototype.la,oe.prototype.send=oe.prototype.ea,oe.prototype.setWithCredentials=oe.prototype.Fa,yh=oe}).apply(typeof Ls<"u"?Ls:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Yn="12.19.0";function g_(n){Yn=n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zt=new ta("@firebase/firestore");function Nn(){return zt.logLevel}function dI(n){zt.setLogLevel(n)}function O(n,...e){if(zt.logLevel<=Q.DEBUG){const t=e.map(fa);zt.debug(`Firestore (${Yn}): ${n}`,...t)}}function At(n,...e){if(zt.logLevel<=Q.ERROR){const t=e.map(fa);zt.error(`Firestore (${Yn}): ${n}`,...t)}}function Xe(n,...e){if(zt.logLevel<=Q.WARN){const t=e.map(fa);zt.warn(`Firestore (${Yn}): ${n}`,...t)}}function fa(n){if(typeof n=="string")return n;try{return(function(t){return JSON.stringify(t)})(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function B(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,vh(n,r,t)}function vh(n,e,t){let r=`FIRESTORE (${Yn}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw At(r),new Error(r)}function U(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||vh(e,s,r)}function z(n,e){return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function __(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pa{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=__(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function K(n,e){return n<e?-1:n>e?1:0}function Mo(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const s=n.charAt(r),i=e.charAt(r);if(s!==i)return vo(s)===vo(i)?K(s,i):vo(s)?1:-1}return K(n.length,e.length)}const y_=55296,w_=57343;function vo(n){const e=n.charCodeAt(0);return e>=y_&&e<=w_}function $n(n,e,t){return n.length===e.length&&n.every(((r,s)=>t(r,e[s])))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class re{constructor(e,t){this.comparator=e,this.root=t||we.EMPTY}insert(e,t){return new re(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,we.BLACK,null,null))}remove(e){return new re(this.comparator,this.root.remove(e,this.comparator).copy(null,null,we.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,r)=>(e(t,r),!1)))}toString(){const e=[];return this.inorderTraversal(((t,r)=>(e.push(`${t}:${r}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Ms(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Ms(this.root,e,this.comparator,!1)}getReverseIterator(){return new Ms(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Ms(this.root,e,this.comparator,!0)}}class Ms{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class we{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??we.RED,this.left=s??we.EMPTY,this.right=i??we.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new we(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return we.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return we.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,we.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,we.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw B(43730,{key:this.key,value:this.value});if(this.right.isRed())throw B(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw B(27949);return e+(this.isRed()?0:1)}}we.EMPTY=null,we.RED=!0,we.BLACK=!1;we.EMPTY=new class{constructor(){this.size=0}get key(){throw B(57766)}get value(){throw B(16141)}get color(){throw B(16727)}get left(){throw B(29726)}get right(){throw B(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new we(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class le{constructor(e){this.comparator=e,this.data=new re(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,r)=>(e(t),!1)))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new xu(this.data.getIterator())}getIteratorFrom(e){return new xu(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((r=>{t=t.add(r)})),t}isEqual(e){if(!(e instanceof le)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new le(this.comparator);return t.data=e,t}}class xu{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const V={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class D extends Pt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const it="__name__";class rt{constructor(e,t,r){t===void 0?t=0:t>e.length&&B(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&B(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return rt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof rt?e.forEach((r=>{t.push(r)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=rt.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return K(e.length,t.length)}static compareSegments(e,t){const r=rt.isNumericId(e),s=rt.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?rt.extractNumericId(e).compare(rt.extractNumericId(t)):Mo(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Bt.fromString(e.substring(4,e.length-2))}}class X extends rt{construct(e,t,r){return new X(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toStringWithLeadingSlash(){return`/${this.canonicalString()}`}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new D(V.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter((s=>s.length>0)))}return new X(t)}static emptyPath(){return new X([])}}const E_=/^[_a-zA-Z][_a-zA-Z0-9]*$/;let He=class kn extends rt{construct(e,t,r){return new kn(e,t,r)}static isValidIdentifier(e){return E_.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),kn.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===it}static keyField(){return new kn([it])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new D(V.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new D(V.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[s+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new D(V.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,s+=2}else c==="`"?(a=!a,s++):c!=="."||a?(r+=c,s++):(i(),s++)}if(i(),a)throw new D(V.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new kn(t)}static emptyPath(){return new kn([])}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ze{constructor(e){this.fields=e,e.sort(He.comparator)}static empty(){return new ze([])}unionWith(e){let t=new le(He.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new ze(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return $n(this.fields,e.fields,((t,r)=>t.isEqual(r)))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ai(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function nn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function T_(n,e){const t=[];for(const r in n)Object.prototype.hasOwnProperty.call(n,r)&&t.push(e(n[r],r,n));return t}function Ah(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F{constructor(e){this.path=e}static fromPath(e){return new F(X.fromString(e))}static fromName(e){return new F(X.fromString(e).popFirst(5))}static empty(){return new F(X.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&X.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return X.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new F(new X(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rh(n,e,t){if(!t)throw new D(V.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function I_(n,e,t,r){if(e===!0&&r===!0)throw new D(V.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Ou(n){if(!F.isDocumentKey(n))throw new D(V.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Lu(n){if(F.isDocumentKey(n))throw new D(V.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function cs(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Ai(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(r){return r.constructor?r.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":B(12329,{type:typeof n})}function Ee(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new D(V.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Ai(n);throw new D(V.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ue(n,e){const t={typeString:n};return e&&(t.value=e),t}function us(n,e){if(!cs(n))throw new D(V.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const a=n[r];if(s&&typeof a!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&a!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new D(V.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mu=-62135596800,Uu=1e6;class Z{static now(){return Z.fromMillis(Date.now())}static fromDate(e){return Z.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*Uu);return new Z(t,r)}static fromInstant(e){if(!e||typeof e.t!="bigint")throw new D(V.INVALID_ARGUMENT,"Invalid Temporal.Instant object provided.");return Z._fromEpochNanoseconds(e.t)}static _fromEpochNanoseconds(e){let t,r;if(e>=0n)t=Number(e/1000000000n),r=Number(e%1000000000n);else{const s=e%1000000000n;s===0n?(t=Number(e/1000000000n),r=0):(t=Number(e/1000000000n-1n),r=Number(s+1000000000n))}return new Z(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new D(V.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new D(V.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Mu)throw new D(V.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new D(V.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Uu}toInstant(){if(typeof Temporal>"u"||!Temporal.Instant)throw new D(V.FAILED_PRECONDITION,"The Temporal object is not available in the current environment.");const e=1000000000n*BigInt(this.seconds)+BigInt(this.nanoseconds);return Temporal.Instant.__PRIVATE_fromEpochNanoseconds(e)}_compareTo(e){return this.seconds===e.seconds?K(this.nanoseconds,e.nanoseconds):K(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Z._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(us(e,Z._jsonSchema))return new Z(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Mu;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Z._jsonSchemaVersion="firestore/timestamp/1.0",Z._jsonSchema={type:ue("string",Z._jsonSchemaVersion),seconds:ue("number"),nanoseconds:ue("number")};/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ph extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class he{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Ph("Invalid base64 string: "+i):i}})(e);return new he(t)}static fromUint8Array(e){const t=(function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i})(e);return new he(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return K(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}he.EMPTY_BYTE_STRING=new he("");const v_=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Wt(n){if(U(!!n,39018),typeof n=="string"){let e=0;const t=v_.exec(n);if(U(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:se(n.seconds),nanos:se(n.nanos)}}function se(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Ht(n){return typeof n=="string"?he.fromBase64String(n):he.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sh="server_timestamp",Vh="__type__",bh="__previous_value__",Ch="__local_write_time__";function Ri(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[Vh])==null?void 0:r.stringValue)===Sh}function ls(n){const e=n.mapValue.fields[bh];return Ri(e)?ls(e):e}function jn(n){const e=Wt(n.mapValue.fields[Ch].timestampValue);return new Z(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A_{constructor(e,t,r,s,i,a,c,l,d,p,m,E,b){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=l,this.useFetchStreams=d,this.isUsingEmulator=p,this.apiKey=m,this._customHeaders=E,this.grpcFlowControlWindow=b}}const ci="(default)";class Br{constructor(e,t){this.projectId=e,this.database=t||ci}static empty(){return new Br("","")}get isDefaultDatabase(){return this.database===ci}isEqual(e){return e instanceof Br&&e.projectId===this.projectId&&e.database===this.database}}function R_(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new D(V.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Br(n.options.projectId,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ma=-1;function Pi(n){return n==null}function qr(n){return n===0&&1/n==-1/0}function P_(n){return typeof n=="number"&&Number.isInteger(n)&&!qr(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}function S_(n){return typeof n=="string"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nh="__type__",V_="__max__",Us={mapValue:{}},kh="__vector__",$r="value",zn={nullValue:"NULL_VALUE"},Fe={booleanValue:!0},_e={booleanValue:!1};function de(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Ri(n)?4:b_(n)?9007199254740991:ui(n)?10:11:B(28295,{value:n})}function Ye(n,e,t){if(n===e)return!0;const r=de(n);if(r!==de(e))return!1;switch(r){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return jn(n).isEqual(jn(e));case 3:return(function(i,a){if(typeof i.timestampValue=="string"&&typeof a.timestampValue=="string"&&i.timestampValue.length===a.timestampValue.length)return i.timestampValue===a.timestampValue;const c=Wt(i.timestampValue),l=Wt(a.timestampValue);return c.seconds===l.seconds&&c.nanos===l.nanos})(n,e);case 5:return n.stringValue===e.stringValue;case 6:return(function(i,a){return Ht(i.bytesValue).isEqual(Ht(a.bytesValue))})(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return(function(i,a){return se(i.geoPointValue.latitude)===se(a.geoPointValue.latitude)&&se(i.geoPointValue.longitude)===se(a.geoPointValue.longitude)})(n,e);case 2:return(function(i,a,c){if("integerValue"in i&&"integerValue"in a)return se(i.integerValue)===se(a.integerValue);let l,d;if("doubleValue"in i&&"doubleValue"in a)l=se(i.doubleValue),d=se(a.doubleValue);else{if(!(c!=null&&c.i))return!1;l=se(i.integerValue??i.doubleValue),d=se(a.integerValue??a.doubleValue)}return l===d?!!(c!=null&&c.o)||qr(l)===qr(d):!!(c===void 0||c.u)&&isNaN(l)&&isNaN(d)})(n,e,t);case 9:return $n(n.arrayValue.values||[],e.arrayValue.values||[],((s,i)=>Ye(s,i,t)));case 10:case 11:return(function(i,a,c){const l=i.mapValue.fields||{},d=a.mapValue.fields||{};if(ai(l)!==ai(d))return!1;for(const p in l)if(l.hasOwnProperty(p)&&(d[p]===void 0||!Ye(l[p],d[p],c)))return!1;return!0})(n,e,t);default:return B(52216,{left:n})}}function jr(n,e){return(n.values||[]).find((t=>Ye(t,e)))!==void 0}function Be(n,e){if(n===e)return 0;const t=de(n),r=de(e);if(t!==r)return K(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return K(n.booleanValue,e.booleanValue);case 2:return(function(i,a){const c=se(i.integerValue||i.doubleValue),l=se(a.integerValue||a.doubleValue);return c<l?-1:c>l?1:c===l?0:isNaN(c)?isNaN(l)?0:-1:1})(n,e);case 3:return Fu(n.timestampValue,e.timestampValue);case 4:return Fu(jn(n),jn(e));case 5:return Mo(n.stringValue,e.stringValue);case 6:return(function(i,a){const c=Ht(i),l=Ht(a);return c.compareTo(l)})(n.bytesValue,e.bytesValue);case 7:return(function(i,a){const c=i.split("/"),l=a.split("/");for(let d=0;d<c.length&&d<l.length;d++){const p=K(c[d],l[d]);if(p!==0)return p}return K(c.length,l.length)})(n.referenceValue,e.referenceValue);case 8:return(function(i,a){const c=K(se(i.latitude),se(a.latitude));return c!==0?c:K(se(i.longitude),se(a.longitude))})(n.geoPointValue,e.geoPointValue);case 9:return Bu(n.arrayValue,e.arrayValue);case 10:return(function(i,a){var E,b,N,M;const c=i.fields||{},l=a.fields||{},d=(E=c[$r])==null?void 0:E.arrayValue,p=(b=l[$r])==null?void 0:b.arrayValue,m=K(((N=d==null?void 0:d.values)==null?void 0:N.length)||0,((M=p==null?void 0:p.values)==null?void 0:M.length)||0);return m!==0?m:Bu(d,p)})(n.mapValue,e.mapValue);case 11:return(function(i,a){if(i===Us.mapValue&&a===Us.mapValue)return 0;if(i===Us.mapValue)return 1;if(a===Us.mapValue)return-1;const c=i.fields||{},l=Object.keys(c),d=a.fields||{},p=Object.keys(d);l.sort(),p.sort();for(let m=0;m<l.length&&m<p.length;++m){const E=Mo(l[m],p[m]);if(E!==0)return E;const b=Be(c[l[m]],d[p[m]]);if(b!==0)return b}return K(l.length,p.length)})(n.mapValue,e.mapValue);default:throw B(23264,{l:t})}}function Fu(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return K(n,e);const t=Wt(n),r=Wt(e),s=K(t.seconds,r.seconds);return s!==0?s:K(t.nanos,r.nanos)}function Bu(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=Be(t[s],r[s]);if(i!==void 0&&i!==0)return i}return K(t.length,r.length)}function Wn(n){return Uo(n)}function Uo(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(t){const r=Wt(t);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(t){return Ht(t).toBase64()})(n.bytesValue):"referenceValue"in n?(function(t){return F.fromName(t).toString()})(n.referenceValue):"geoPointValue"in n?(function(t){return`geo(${t.latitude},${t.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=Uo(i);return r+"]"})(n.arrayValue):"mapValue"in n?(function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const a of r)i?i=!1:s+=",",s+=`${a}:${Uo(t.fields[a])}`;return s+"}"})(n.mapValue):B(61005,{value:n})}function Ks(n){switch(de(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=ls(n);return e?16+Ks(e):16;case 5:return 2*n.stringValue.length;case 6:return Ht(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((s,i)=>s+Ks(i)),0)})(n.arrayValue);case 10:case 11:return(function(r){let s=0;return nn(r.fields,((i,a)=>{s+=i.length+Ks(a)})),s})(n.mapValue);default:throw B(13486,{value:n})}}function qu(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function ot(n){return!!n&&"integerValue"in n}function pn(n){return!!n&&"doubleValue"in n}function Gt(n){return ot(n)||pn(n)}function Hn(n){return!!n&&"arrayValue"in n}function We(n){return!!n&&"nullValue"in n}function qe(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function _n(n){return!!n&&"mapValue"in n}function ui(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[Nh])==null?void 0:r.stringValue)===kh}function Fo(n){var e,t;return(t=(((e=n==null?void 0:n.mapValue)==null?void 0:e.fields)||{})[$r])==null?void 0:t.arrayValue}function br(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return nn(n.mapValue.fields,((t,r)=>e.mapValue.fields[t]=br(r))),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=br(n.arrayValue.values[t]);return e}return{...n}}function b_(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===V_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class De{constructor(e){this.value=e}static empty(){return new De({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!_n(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=br(t)}setAll(e){let t=He.emptyPath(),r={},s=[];e.forEach(((a,c)=>{if(!t.isImmediateParentOf(c)){const l=this.getFieldsMap(t);this.applyChanges(l,r,s),r={},s=[],t=c.popLast()}a?r[c.lastSegment()]=br(a):s.push(c.lastSegment())}));const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());_n(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Ye(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];_n(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){nn(t,((s,i)=>e[s]=i));for(const s of r)delete e[s]}clone(){return new De(br(this.value))}}function Dh(n){const e=[];return nn(n.fields,((t,r)=>{const s=new He([t]);if(_n(r)){const i=Dh(r.mapValue).fields;if(i.length===0)e.push(s);else for(const a of i)e.push(s.child(a))}else e.push(s)})),new ze(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Si(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:qr(e)?"-0":e}}function ga(n){return{integerValue:""+n}}function _a(n,e,t){return P_(e)?ga(e):Si(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vi{constructor(){this._=void 0}}function C_(n,e,t){return n instanceof zr?(function(s,i){const a={fields:{[Vh]:{stringValue:Sh},[Ch]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Ri(i)&&(i=ls(i)),i&&(a.fields[bh]=i),{mapValue:a}})(t,e):n instanceof Wr?Oh(n,e):n instanceof Hr?Lh(n,e):n instanceof Gr?(function(s,i){const a=xh(s,i),c=di(a)+di(s.h);return ot(a)&&ot(s.h)?ga(c):Si(s.serializer,c)})(n,e):n instanceof li?(function(s,i){return $u(s,i,Math.min)})(n,e):n instanceof hi?(function(s,i){return $u(s,i,Math.max)})(n,e):void 0}function N_(n,e,t){return n instanceof Wr?Oh(n,e):n instanceof Hr?Lh(n,e):t}function xh(n,e){return n instanceof Gr?Gt(e)?e:{integerValue:0}:null}class zr extends Vi{}class Wr extends Vi{constructor(e){super(),this.elements=e}}function Oh(n,e){const t=Mh(e);for(const r of n.elements)t.some((s=>Ye(s,r)))||t.push(r);return{arrayValue:{values:t}}}class Hr extends Vi{constructor(e){super(),this.elements=e}}function Lh(n,e){let t=Mh(e);for(const r of n.elements)t=t.filter((s=>!Ye(s,r)));return{arrayValue:{values:t}}}class ya extends Vi{constructor(e,t){super(),this.serializer=e,this.h=t}}class Gr extends ya{}class li extends ya{}class hi extends ya{}function $u(n,e,t){if(!Gt(e))return n.h;const r=t(di(e),di(n.h));return ot(e)&&ot(n.h)?ga(r):Si(n.serializer,r)}function di(n){return se(n.integerValue||n.doubleValue)}function Mh(n){return Hn(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k_{constructor(e,t){this.field=e,this.transform=t}}function D_(n,e){return n.field.isEqual(e.field)&&(function(r,s){return r instanceof Wr&&s instanceof Wr||r instanceof Hr&&s instanceof Hr?$n(r.elements,s.elements,Ye):r instanceof Gr&&s instanceof Gr||r instanceof li&&s instanceof li||r instanceof hi&&s instanceof hi?Ye(r.h,s.h):r instanceof zr&&s instanceof zr})(n.transform,e.transform)}class x_{constructor(e,t){this.version=e,this.transformResults=t}}class xe{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new xe}static exists(e){return new xe(void 0,e)}static updateTime(e){return new xe(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Qs(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class bi{}function Uh(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Ci(n.key,xe.none()):new hs(n.key,n.data,xe.none());{const t=n.data,r=De.empty();let s=new le(He.comparator);for(let i of e.fields)if(!s.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new rn(n.key,r,new ze(s.toArray()),xe.none())}}function O_(n,e,t){n instanceof hs?(function(s,i,a){const c=s.value.clone(),l=zu(s.fieldTransforms,i,a.transformResults);c.setAll(l),i.convertToFoundDocument(a.version,c).setHasCommittedMutations()})(n,e,t):n instanceof rn?(function(s,i,a){if(!Qs(s.precondition,i))return void i.convertToUnknownDocument(a.version);const c=zu(s.fieldTransforms,i,a.transformResults),l=i.data;l.setAll(Fh(s)),l.setAll(c),i.convertToFoundDocument(a.version,l).setHasCommittedMutations()})(n,e,t):(function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()})(0,e,t)}function Cr(n,e,t,r){return n instanceof hs?(function(i,a,c,l){if(!Qs(i.precondition,a))return c;const d=i.value.clone(),p=Wu(i.fieldTransforms,l,a);return d.setAll(p),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null})(n,e,t,r):n instanceof rn?(function(i,a,c,l){if(!Qs(i.precondition,a))return c;const d=Wu(i.fieldTransforms,l,a),p=a.data;return p.setAll(Fh(i)),p.setAll(d),a.convertToFoundDocument(a.version,p).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((m=>m.field)))})(n,e,t,r):(function(i,a,c){return Qs(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c})(n,e,t)}function L_(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=xh(r.transform,s||null);i!=null&&(t===null&&(t=De.empty()),t.set(r.field,i))}return t||null}function ju(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&$n(r,s,((i,a)=>D_(i,a)))})(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class hs extends bi{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class rn extends bi{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Fh(n){const e=new Map;return n.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}})),e}function zu(n,e,t){const r=new Map;U(n.length===t.length,32656,{T:t.length,P:n.length});for(let s=0;s<t.length;s++){const i=n[s],a=i.transform,c=e.data.field(i.field);r.set(i.field,N_(a,c,t[s]))}return r}function Wu(n,e,t){const r=new Map;for(const s of n){const i=s.transform,a=t.data.field(s.field);r.set(s.field,C_(i,a,e))}return r}class Ci extends bi{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class M_ extends bi{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fi{constructor(e,t){this.position=e,this.inclusive=t}}function Hu(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],a=n.position[s];if(i.field.isKeyField()?r=F.comparator(F.fromName(a.referenceValue),t.key):r=Be(a,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Gu(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Ye(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bh{}class ce extends Bh{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new F_(e,t,r):t==="array-contains"?new $_(e,r):t==="in"?new j_(e,r):t==="not-in"?new z_(e,r):t==="array-contains-any"?new W_(e,r):new ce(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new B_(e,r):new q_(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Be(t,this.value)):t!==null&&de(this.value)===de(t)&&this.matchesComparison(Be(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return B(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Ze extends Bh{constructor(e,t){super(),this.filters=e,this.op=t,this.I=null}static create(e,t){return new Ze(e,t)}matches(e){return qh(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.I!==null||(this.I=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.I}getFilters(){return Object.assign([],this.filters)}}function qh(n){return n.op==="and"}function $h(n){return U_(n)&&qh(n)}function U_(n){for(const e of n.filters)if(e instanceof Ze)return!1;return!0}function Bo(n){if(n instanceof ce)return n.field.canonicalString()+n.op.toString()+Wn(n.value);if($h(n))return n.filters.map((e=>Bo(e))).join(",");{const e=n.filters.map((t=>Bo(t))).join(",");return`${n.op}(${e})`}}function jh(n,e){return n instanceof ce?(function(r,s){return s instanceof ce&&r.op===s.op&&r.field.isEqual(s.field)&&Ye(r.value,s.value)})(n,e):n instanceof Ze?(function(r,s){return s instanceof Ze&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((i,a,c)=>i&&jh(a,s.filters[c])),!0):!1})(n,e):void B(19439)}function zh(n){return n instanceof ce?(function(t){return`${t.field.canonicalString()} ${t.op} ${Wn(t.value)}`})(n):n instanceof Ze?(function(t){return t.op.toString()+" {"+t.getFilters().map(zh).join(" ,")+"}"})(n):"Filter"}class F_ extends ce{constructor(e,t,r){super(e,t,r),this.key=F.fromName(r.referenceValue)}matches(e){const t=F.comparator(e.key,this.key);return this.matchesComparison(t)}}class B_ extends ce{constructor(e,t){super(e,"in",t),this.keys=Wh("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class q_ extends ce{constructor(e,t){super(e,"not-in",t),this.keys=Wh("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function Wh(n,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map((r=>F.fromName(r.referenceValue)))}class $_ extends ce{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Hn(t)&&jr(t.arrayValue,this.value)}}class j_ extends ce{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&jr(this.value.arrayValue,t)}}class z_ extends ce{constructor(e,t){super(e,"not-in",t)}matches(e){if(jr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!jr(this.value.arrayValue,t)}}class W_ extends ce{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Hn(t)||!t.arrayValue.values)&&t.arrayValue.values.some((r=>jr(this.value.arrayValue,r)))}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kr{constructor(e,t="asc"){this.field=e,this.dir=t}}function H_(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j{static fromTimestamp(e){return new j(e)}static min(){return new j(new Z(0,0))}static max(){return new j(new Z(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Se{constructor(e,t,r,s,i,a,c){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=c}static newInvalidDocument(e){return new Se(e,0,j.min(),j.min(),j.min(),De.empty(),0)}static newFoundDocument(e,t,r,s){return new Se(e,1,t,j.min(),r,s,0)}static newNoDocument(e,t){return new Se(e,2,t,j.min(),j.min(),De.empty(),0)}static newUnknownDocument(e,t){return new Se(e,3,t,j.min(),j.min(),De.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(j.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=De.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=De.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=j.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Se&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Se(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qr=-1;function G_(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=j.fromTimestamp(r===1e9?new Z(t+1,0):new Z(t,r));return new Kt(s,F.empty(),e)}function K_(n){return new Kt(n.readTime,n.key,Qr)}class Kt{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new Kt(j.min(),F.empty(),Qr)}static max(){return new Kt(j.max(),F.empty(),Qr)}}function Q_(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=F.comparator(n.documentKey,e.documentKey),t!==0?t:K(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y_{constructor(e,t=null,r=[],s=[],i=null,a=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=c,this.R=null}}function Ku(n,e=null,t=[],r=[],s=null,i=null,a=null){return new Y_(n,e,t,r,s,i,a)}function Hh(n){const e=z(n);if(e.R===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((r=>Bo(r))).join(","),t+="|ob:",t+=e.orderBy.map((r=>(function(i){return i.field.canonicalString()+i.dir})(r))).join(","),Pi(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((r=>Wn(r))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((r=>Wn(r))).join(",")),e.R=t}return e.R}function Gh(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!H_(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!jh(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Gu(n.startAt,e.startAt)&&Gu(n.endAt,e.endAt)}function fn(n){return!!n.isCorePipeline}function Kh(n){return!!n.path&&F.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jn{constructor(e,t=null,r=[],s=[],i=null,a="F",c=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=c,this.endAt=l,this.A=null,this.V=null,this.m=null,this.startAt,this.endAt}}function J_(n,e,t,r,s,i,a,c){return new Jn(n,e,t,r,s,i,a,c)}function Ni(n){return new Jn(n)}function Qu(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function X_(n){return F.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function Qh(n){return n.collectionGroup!==null}function Nr(n){const e=z(n);if(e.A===null){e.A=[];const t=new Set;for(const i of e.explicitOrderBy)e.A.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new le(He.comparator);return a.filters.forEach((l=>{l.getFlattenedFilters().forEach((d=>{d.isInequality()&&(c=c.add(d.field))}))})),c})(e).forEach((i=>{t.has(i.canonicalString())||i.isKeyField()||e.A.push(new Kr(i,r))})),t.has(He.keyField().canonicalString())||e.A.push(new Kr(He.keyField(),r))}return e.A}function ut(n){const e=z(n);return e.V||(e.V=Z_(e,Nr(n))),e.V}function Z_(n,e){if(n.limitType==="F")return Ku(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new Kr(s.field,i)}));const t=n.endAt?new fi(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new fi(n.startAt.position,n.startAt.inclusive):null;return Ku(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function qo(n,e){const t=n.filters.concat([e]);return new Jn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function ey(n,e){const t=n.explicitOrderBy.concat([e]);return new Jn(n.path,n.collectionGroup,t,n.filters.slice(),n.limit,n.limitType,n.startAt,n.endAt)}function $o(n,e,t){return new Jn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function ty(n,e){return Gh(ut(n),ut(e))&&n.limitType===e.limitType}function kr(n){return`Query(target=${(function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map((s=>zh(s))).join(", ")}]`),Pi(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map((s=>(function(a){return`${a.field.canonicalString()} (${a.dir})`})(s))).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map((s=>Wn(s))).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map((s=>Wn(s))).join(",")),`Target(${r})`})(ut(n))}; limitType=${n.limitType})`}function ki(n,e){return e.isFoundDocument()&&(function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):F.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)})(n,e)&&(function(r,s){for(const i of Nr(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(n,e)&&(function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0})(n,e)&&(function(r,s){return!(r.startAt&&!(function(a,c,l){const d=Hu(a,c,l);return a.inclusive?d<=0:d<0})(r.startAt,Nr(r),s)||r.endAt&&!(function(a,c,l){const d=Hu(a,c,l);return a.inclusive?d>=0:d>0})(r.endAt,Nr(r),s))})(n,e)}function wa(n){return(e,t)=>{let r=!1;for(const s of Nr(n)){const i=ny(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function ny(n,e,t){const r=n.field.isKeyField()?F.comparator(e.key,t.key):(function(i,a,c){const l=a.data.field(i),d=c.data.field(i);return l!==null&&d!==null?Be(l,d):B(42886)})(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return B(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ry{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ae,Y;function sy(n){switch(n){case V.OK:return B(64938);case V.CANCELLED:case V.UNKNOWN:case V.DEADLINE_EXCEEDED:case V.RESOURCE_EXHAUSTED:case V.INTERNAL:case V.UNAVAILABLE:case V.UNAUTHENTICATED:return!1;case V.INVALID_ARGUMENT:case V.NOT_FOUND:case V.ALREADY_EXISTS:case V.PERMISSION_DENIED:case V.FAILED_PRECONDITION:case V.ABORTED:case V.OUT_OF_RANGE:case V.UNIMPLEMENTED:case V.DATA_LOSS:return!0;default:return B(15467,{code:n})}}function Yh(n){if(n===void 0)return At("GRPC error has no .code"),V.UNKNOWN;switch(n){case ae.OK:return V.OK;case ae.CANCELLED:return V.CANCELLED;case ae.UNKNOWN:return V.UNKNOWN;case ae.DEADLINE_EXCEEDED:return V.DEADLINE_EXCEEDED;case ae.RESOURCE_EXHAUSTED:return V.RESOURCE_EXHAUSTED;case ae.INTERNAL:return V.INTERNAL;case ae.UNAVAILABLE:return V.UNAVAILABLE;case ae.UNAUTHENTICATED:return V.UNAUTHENTICATED;case ae.INVALID_ARGUMENT:return V.INVALID_ARGUMENT;case ae.NOT_FOUND:return V.NOT_FOUND;case ae.ALREADY_EXISTS:return V.ALREADY_EXISTS;case ae.PERMISSION_DENIED:return V.PERMISSION_DENIED;case ae.FAILED_PRECONDITION:return V.FAILED_PRECONDITION;case ae.ABORTED:return V.ABORTED;case ae.OUT_OF_RANGE:return V.OUT_OF_RANGE;case ae.UNIMPLEMENTED:return V.UNIMPLEMENTED;case ae.DATA_LOSS:return V.DATA_LOSS;default:return B(39323,{code:n})}}(Y=ae||(ae={}))[Y.OK=0]="OK",Y[Y.CANCELLED=1]="CANCELLED",Y[Y.UNKNOWN=2]="UNKNOWN",Y[Y.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Y[Y.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Y[Y.NOT_FOUND=5]="NOT_FOUND",Y[Y.ALREADY_EXISTS=6]="ALREADY_EXISTS",Y[Y.PERMISSION_DENIED=7]="PERMISSION_DENIED",Y[Y.UNAUTHENTICATED=16]="UNAUTHENTICATED",Y[Y.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Y[Y.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Y[Y.ABORTED=10]="ABORTED",Y[Y.OUT_OF_RANGE=11]="OUT_OF_RANGE",Y[Y.UNIMPLEMENTED=12]="UNIMPLEMENTED",Y[Y.INTERNAL=13]="INTERNAL",Y[Y.UNAVAILABLE=14]="UNAVAILABLE",Y[Y.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){nn(this.inner,((t,r)=>{for(const[s,i]of r)e(s,i)}))}isEmpty(){return Ah(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iy=new re(F.comparator);function Me(){return iy}const Jh=new re(F.comparator);function Dn(...n){let e=Jh;for(const t of n)e=e.insert(t.key,t);return e}function Xh(n){let e=Jh;return n.forEach(((t,r)=>e=e.insert(t,r.overlayedDocument))),e}function Ut(){return Dr()}function Zh(){return Dr()}function Dr(){return new Rn((n=>n.toString()),((n,e)=>n.isEqual(e)))}const oy=new re(F.comparator),ay=new le(F.comparator);function G(...n){let e=ay;for(const t of n)e=e.add(t);return e}const cy=new le(K);function uy(){return cy}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ly(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hy=new Bt([4294967295,4294967295],0);function Yu(n){const e=ly().encode(n),t=new _h;return t.update(e),new Uint8Array(t.digest())}function Ju(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Bt([t,r],0),new Bt([s,i],0)]}class Ea{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Rr(`Invalid padding: ${t}`);if(r<0)throw new Rr(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Rr(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Rr(`Invalid padding when bitmap length is 0: ${t}`);this.p=8*e.length-t,this.S=Bt.fromNumber(this.p)}v(e,t,r){let s=e.add(t.multiply(Bt.fromNumber(r)));return s.compare(hy)===1&&(s=new Bt([s.getBits(0),s.getBits(1)],0)),s.modulo(this.S).toNumber()}D(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.p===0)return!1;const t=Yu(e),[r,s]=Ju(t);for(let i=0;i<this.hashCount;i++){const a=this.v(r,s,i);if(!this.D(a))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new Ea(i,s,t);return r.forEach((c=>a.insert(c))),a}insert(e){if(this.p===0)return;const t=Yu(e),[r,s]=Ju(t);for(let i=0;i<this.hashCount;i++){const a=this.v(r,s,i);this.C(a)}}C(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class Rr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ds{constructor(e,t,r,s,i,a){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.augmentedDocumentUpdates=i,this.resolvedLimboDocuments=a}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,fs.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new ds(j.min(),s,new re(K),Me(),Me(),G())}}class fs{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new fs(r,t,G(),G(),G())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ys{constructor(e,t,r,s){this.F=e,this.removedTargetIds=t,this.key=r,this.O=s}}class ed{constructor(e,t){this.targetId=e,this.M=t}}class td{constructor(e,t,r=he.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class Xu{constructor(e){this.targetId=e,this.N=0,this.L=Zu(),this.B=he.EMPTY_BYTE_STRING,this.U=!1,this.k=!0}get current(){return this.U}get resumeToken(){return this.B}get q(){return this.N!==0}get $(){return this.k}K(e){e.approximateByteSize()>0&&(this.k=!0,this.B=e)}W(){let e=G(),t=G(),r=G();return this.L.forEach(((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:B(38017,{changeType:i})}})),new fs(this.B,this.U,e,t,r)}G(){this.k=!1,this.L=Zu()}j(e,t){this.k=!0,this.L=this.L.insert(e,t)}H(e){this.k=!0,this.L=this.L.remove(e)}J(){this.N+=1}Y(){this.N-=1,U(this.N>=0,3241,{N:this.N,targetId:this.targetId})}Z(){this.k=!0,this.U=!0}}const Ir="WatchChangeAggregator";class dy{constructor(e){this.X=e,this.ee=new Map,this.te=Me(),this.ne=Fs(),this.re=Me(),this.ie=Fs(),this.se=new re(K)}_e(e){for(const t of e.F)e.O&&e.O.isFoundDocument()?this.oe(t,e.O):this.ae(t,e.key,e.O);for(const t of e.removedTargetIds)this.ae(t,e.key,e.O)}ue(e){this.forEachTarget(e,(t=>{const r=this.ee.get(t);if(r)switch(e.state){case 0:this.ce(t)&&r.K(e.resumeToken);break;case 1:r.Y(),r.q||r.G(),r.K(e.resumeToken);break;case 2:r.Y(),r.q||this.removeTarget(t);break;case 3:this.ce(t)&&(r.Z(),r.K(e.resumeToken));break;case 4:this.ce(t)&&(this.le(t),r.K(e.resumeToken));break;default:B(56790,{state:e.state})}else O(Ir,`handleTargetChange received targetChange for untracked target ID (${t}) with state (${e.state})`)}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ee.forEach(((r,s)=>{this.ce(s)&&t(s)}))}Ee(e){var t;return fn(e)?e.getPipelineSourceType()==="documents"&&((t=e.getPipelineDocuments())==null?void 0:t.length)===1:Kh(e)}he(e){const t=e.targetId,r=e.M.count,s=this.Te(t);if(s){const i=s.target;if(this.Ee(i))if(r===0){const a=new F(fn(i)?X.fromString(i.getPipelineDocuments()[0]):i.path);this.ae(t,a,Se.newNoDocument(a,j.min()))}else U(r===1,20013,"Single document existence filter with count: "+r);else{const a=this.Pe(t);if(a!==r){const c=this.Ie(e),l=c?this.Re(c,e,a):1;if(l!==0){this.le(t);const d=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.se=this.se.insert(t,d)}}}}}Ie(e){const t=e.M.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let a,c;try{a=Ht(r).toUint8Array()}catch(l){if(l instanceof Ph)return Xe("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{c=new Ea(a,s,i)}catch(l){return Xe(l instanceof Rr?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return c.p===0?null:c}Re(e,t,r){return t.M.count===r-this.de(e,t.targetId)?0:2}de(e,t){const r=this.X.getRemoteKeysForTarget(t);let s=0;return r.forEach((i=>{const a=this.X.Ve(),c=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.ae(t,i,null),s++)})),s}fe(e){const t=new Map;this.ee.forEach(((i,a)=>{const c=this.Te(a);if(c){if(i.current&&this.Ee(c.target)){const l=fn(c.target)?X.fromString(c.target.getPipelineDocuments()[0]):c.target.path,d=new F(l);this.me(d).has(a)||this.pe(a,d)||this.ae(a,d,Se.newNoDocument(d,e))}i.$&&(t.set(a,i.W()),i.G())}}));let r=G();this.ie.forEach(((i,a)=>{let c=!0;a.forEachWhile((l=>{const d=this.Te(l);return!d||d.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)})),c&&(r=r.add(i))})),this.te.forEach(((i,a)=>a.setReadTime(e))),this.re.forEach(((i,a)=>a.setReadTime(e)));const s=new ds(e,t,this.se,this.te,this.re,r);return this.te=Me(),this.ne=Fs(),this.re=Me(),this.ie=Fs(),this.se=new re(K),s}oe(e,t){const r=this.ee.get(e);if(!r||!this.ce(e))return void O(Ir,`addDocumentToTarget received document for unknown inactive target (${e})`);const s=this.pe(e,t.key)?2:0;r.j(t.key,s),fn(this.Te(e).target)&&this.Te(e).target.getPipelineFlavor()!=="exact"?this.re=this.re.insert(t.key,t):this.te=this.te.insert(t.key,t),this.ne=this.ne.insert(t.key,this.me(t.key).add(e)),this.ie=this.ie.insert(t.key,this.ge(t.key).add(e))}ae(e,t,r){const s=this.ee.get(e);s&&this.ce(e)?(this.pe(e,t)?s.j(t,1):s.H(t),this.ie=this.ie.insert(t,this.ge(t).delete(e)),this.ie=this.ie.insert(t,this.ge(t).add(e)),r&&(fn(this.Te(e).target)&&this.Te(e).target.getPipelineFlavor()!=="exact"?this.re=this.re.insert(t,r):this.te=this.te.insert(t,r))):O(Ir,`removeDocumentFromTarget received document for unknown or inactive target (${e})`)}removeTarget(e){this.ee.delete(e)}Pe(e){const t=this.ee.get(e);if(!t)return 0;const r=t.W();return this.X.getRemoteKeysForTarget(e).size+r.addedDocuments.size-r.removedDocuments.size}J(e){let t=this.ee.get(e);t||(O(Ir,`recordPendingTargetRequest set up tracking for target ID ${e}`),t=new Xu(e),this.ee.set(e,t)),t.J()}ge(e){let t=this.ie.get(e);return t||(t=new le(K),this.ie=this.ie.insert(e,t)),t}me(e){let t=this.ne.get(e);return t||(t=new le(K),this.ne=this.ne.insert(e,t)),t}ce(e){const t=this.Te(e)!==null;return t||O(Ir,"Detected inactive target",e),t}Te(e){const t=this.ee.get(e);return t===void 0||t.q?null:this.X.ye(e)}le(e){this.ee.set(e,new Xu(e)),this.X.getRemoteKeysForTarget(e).forEach((t=>{this.ae(e,t,null)}))}pe(e,t){return this.X.getRemoteKeysForTarget(e).has(t)}}function Fs(){return new re(F.comparator)}function Zu(){return new re(F.comparator)}const fy={asc:"ASCENDING",desc:"DESCENDING"},py={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},my={and:"AND",or:"OR"};class gy{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function jo(n,e){return n.useProto3Json||Pi(e)?e:{value:e}}function xr(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Ta(n){const e=Wt(n);return new Z(e.seconds,e.nanos)}function nd(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function Js(n,e){return xr(n,e.toTimestamp())}function lt(n){return U(!!n,49232),j.fromTimestamp(Ta(n))}function Ia(n,e){return zo(n,e).canonicalString()}function zo(n,e){const t=(function(s){return new X(["projects",s.projectId,"databases",s.database])})(n).child("documents");return e===void 0?t:t.child(e)}function rd(n){const e=X.fromString(n);return U(cd(e),10190,{key:e.toString()}),e}function pi(n,e){return Ia(n.databaseId,e.path)}function Ao(n,e){const t=rd(e);if(t.get(1)!==n.databaseId.projectId)throw new D(V.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new D(V.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new F(id(t))}function sd(n,e){return Ia(n.databaseId,e)}function _y(n){const e=rd(n);return e.length===4?X.emptyPath():id(e)}function Wo(n){return new X(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function id(n){return U(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function el(n,e,t){return{name:pi(n,e),fields:t.value.mapValue.fields}}function yy(n,e){let t;if("targetChange"in e){e.targetChange;const r=(function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:B(39313,{state:d})})(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=(function(d,p){return d.useProto3Json?(U(p===void 0||typeof p=="string",58123),he.fromBase64String(p||"")):(U(p===void 0||p instanceof Buffer||p instanceof Uint8Array,16193),he.fromUint8Array(p||new Uint8Array))})(n,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&(function(d){const p=d.code===void 0?V.UNKNOWN:Yh(d.code);return new D(p,d.message||"")})(a);t=new td(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=Ao(n,r.document.name),i=lt(r.document.updateTime),a=r.document.createTime?lt(r.document.createTime):j.min(),c=new De({mapValue:{fields:r.document.fields}}),l=Se.newFoundDocument(s,i,a,c),d=r.targetIds||[],p=r.removedTargetIds||[];t=new Ys(d,p,l.key,l)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=Ao(n,r.document),i=r.readTime?lt(r.readTime):j.min(),a=Se.newNoDocument(s,i),c=r.removedTargetIds||[];t=new Ys([],c,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=Ao(n,r.document),i=r.removedTargetIds||[];t=new Ys([],i,s,null)}else{if(!("filter"in e))return B(11601,{we:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,a=new ry(s,i),c=r.targetId;t=new ed(c,a)}}return t}function wy(n,e){let t;if(e instanceof hs)t={update:el(n,e.key,e.value)};else if(e instanceof Ci)t={delete:pi(n,e.key)};else if(e instanceof rn)t={update:el(n,e.key,e.data),updateMask:by(e.fieldMask)};else{if(!(e instanceof M_))return B(16599,{be:e.type});t={verify:pi(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((r=>(function(i,a){const c=a.transform;if(c instanceof zr)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Wr)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Hr)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof Gr)return{fieldPath:a.field.canonicalString(),increment:c.h};if(c instanceof li)return{fieldPath:a.field.canonicalString(),minimum:c.h};if(c instanceof hi)return{fieldPath:a.field.canonicalString(),maximum:c.h};throw B(20930,{transform:a.transform})})(0,r)))),e.precondition.isNone||(t.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:Js(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:B(27497)})(n,e.precondition)),t}function Ey(n,e){return n&&n.length>0?(U(e!==void 0,14353),n.map((t=>(function(s,i){let a=s.updateTime?lt(s.updateTime):lt(i);return a.isEqual(j.min())&&(a=lt(i)),new x_(a,s.transformResults||[])})(t,e)))):[]}function Ty(n,e){return{documents:[sd(n,e.path)]}}function Iy(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=sd(n,s);const i=(function(d){if(d.length!==0)return ad(Ze.create(d,"and"))})(e.filters);i&&(t.structuredQuery.where=i);const a=(function(d){if(d.length!==0)return d.map((p=>(function(E){return{field:xn(E.field),direction:Py(E.dir)}})(p)))})(e.orderBy);a&&(t.structuredQuery.orderBy=a);const c=jo(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=(function(d){return{before:d.inclusive,values:d.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(d){return{before:!d.inclusive,values:d.position}})(e.endAt)),{Se:t,parent:s}}function vy(n){let e=_y(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){U(r===1,65062);const p=t.from[0];p.allDescendants?s=p.collectionId:e=e.child(p.collectionId)}let i=[];t.where&&(i=(function(m){const E=od(m);return E instanceof Ze&&$h(E)?E.getFilters():[E]})(t.where));let a=[];t.orderBy&&(a=(function(m){return m.map((E=>(function(N){return new Kr(On(N.field),(function(L){switch(L){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(N.direction))})(E)))})(t.orderBy));let c=null;t.limit&&(c=(function(m){let E;return E=typeof m=="object"?m.value:m,Pi(E)?null:E})(t.limit));let l=null;t.startAt&&(l=(function(m){const E=!!m.before,b=m.values||[];return new fi(b,E)})(t.startAt));let d=null;return t.endAt&&(d=(function(m){const E=!m.before,b=m.values||[];return new fi(b,E)})(t.endAt)),J_(e,s,a,i,c,"F",l,d)}function Ay(n,e){const t=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return B(28987,{purpose:s})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Ry(n,e){return{structuredPipeline:{pipeline:{stages:e.stages.map((t=>t._toProto(n)))}}}}function od(n){return n.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=On(t.unaryFilter.field);return ce.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=On(t.unaryFilter.field);return ce.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=On(t.unaryFilter.field);return ce.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=On(t.unaryFilter.field);return ce.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return B(61313);default:return B(60726)}})(n):n.fieldFilter!==void 0?(function(t){return ce.create(On(t.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return B(58110);default:return B(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(t){return Ze.create(t.compositeFilter.filters.map((r=>od(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return B(1026)}})(t.compositeFilter.op))})(n):B(30097,{filter:n})}function Py(n){return fy[n]}function Sy(n){return py[n]}function Vy(n){return my[n]}function xn(n){return{fieldPath:n.canonicalString()}}function On(n){return He.fromServerFormat(n.fieldPath)}function ad(n){return n instanceof ce?(function(t){if(t.op==="=="){if(qe(t.value))return{unaryFilter:{field:xn(t.field),op:"IS_NAN"}};if(We(t.value))return{unaryFilter:{field:xn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(qe(t.value))return{unaryFilter:{field:xn(t.field),op:"IS_NOT_NAN"}};if(We(t.value))return{unaryFilter:{field:xn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:xn(t.field),op:Sy(t.op),value:t.value}}})(n):n instanceof Ze?(function(t){const r=t.getFilters().map((s=>ad(s)));return r.length===1?r[0]:{compositeFilter:{op:Vy(t.op),filters:r}}})(n):B(54877,{filter:n})}function by(n){const e=[];return n.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function cd(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function ud(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}function Yr(n,e){const t={fields:{}};return e.forEach(((r,s)=>{if(typeof s!="string")throw new Error(`Cannot encode map with non-string key: ${s}`);t.fields[s]=r._toProto(n)})),{mapValue:t}}function ld(n){return{stringValue:n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Di(n){return new gy(n,!0)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qe{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Qe(he.fromBase64String(e))}catch(t){throw new D(V.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Qe(he.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Qe._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(us(e,Qe._jsonSchema))return Qe.fromBase64String(e.bytes)}}Qe._jsonSchemaVersion="firestore/bytes/1.0",Qe._jsonSchema={type:ue("string",Qe._jsonSchemaVersion),bytes:ue("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ps{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new D(V.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new He(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function Cy(){return new ps(it)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xi{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ht{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new D(V.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new D(V.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return K(this._lat,e._lat)||K(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:ht._jsonSchemaVersion}}static fromJSON(e){if(us(e,ht._jsonSchema))return new ht(e.latitude,e.longitude)}}ht._jsonSchemaVersion="firestore/geoPoint/1.0",ht._jsonSchema={type:ue("string",ht._jsonSchemaVersion),latitude:ue("number"),longitude:ue("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pe{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Pe.UNAUTHENTICATED=new Pe(null),Pe.GOOGLE_CREDENTIALS=new Pe("google-credentials-uid"),Pe.FIRST_PARTY=new Pe("first-party-uid"),Pe.MOCK_USER=new Pe("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hd{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Ny{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(Pe.UNAUTHENTICATED)))}shutdown(){}}class ky{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class Dy{constructor(e){this.De=e,this.currentUser=Pe.UNAUTHENTICATED,this.xe=0,this.forceRefresh=!1,this.auth=null}start(e,t){U(this.Ce===void 0,42304);let r=this.xe;const s=l=>this.xe!==r?(r=this.xe,t(l)):Promise.resolve();let i=new wt;this.Ce=()=>{this.xe++,this.currentUser=this.Fe(),i.resolve(),i=new wt,e.enqueueRetryable((()=>s(this.currentUser)))};const a=()=>{const l=i;e.enqueueRetryable((async()=>{await l.promise,await s(this.currentUser)}))},c=l=>{O("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.Ce&&(this.auth.addAuthTokenListener(this.Ce),a())};this.De.onInit((l=>c(l))),setTimeout((()=>{if(!this.auth){const l=this.De.getImmediate({optional:!0});l?c(l):(O("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new wt)}}),0),a()}getToken(){const e=this.xe,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((r=>this.xe!==e?(O("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(U(typeof r.accessToken=="string",31837,{Oe:r}),new hd(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.Ce&&this.auth.removeAuthTokenListener(this.Ce),this.Ce=void 0}Fe(){const e=this.auth&&this.auth.getUid();return U(e===null||typeof e=="string",2055,{Me:e}),new Pe(e)}}class xy{constructor(e,t,r){this.Ne=e,this.Le=t,this.Be=r,this.type="FirstParty",this.user=Pe.FIRST_PARTY,this.Ue=new Map}ke(){return this.Be?this.Be():null}get headers(){this.Ue.set("X-Goog-AuthUser",this.Ne);const e=this.ke();return e&&this.Ue.set("Authorization",e),this.Le&&this.Ue.set("X-Goog-Iam-Authorization-Token",this.Le),this.Ue}}class Oy{constructor(e,t,r){this.Ne=e,this.Le=t,this.Be=r}getToken(){return Promise.resolve(new xy(this.Ne,this.Le,this.Be))}start(e,t){e.enqueueRetryable((()=>t(Pe.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class tl{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Ly{constructor(e,t){this.qe=t,this.forceRefresh=!1,this.appCheck=null,this.$e=null,this.Ke=null,st(e)&&e.settings.appCheckToken&&(this.Ke=e.settings.appCheckToken)}start(e,t){U(this.Ce===void 0,3512);const r=i=>{i.error!=null&&O("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.$e;return this.$e=i.token,O("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.Ce=i=>{e.enqueueRetryable((()=>r(i)))};const s=i=>{O("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.Ce&&this.appCheck.addTokenListener(this.Ce)};this.qe.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.qe.getImmediate({optional:!0});i?s(i):O("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.Ke)return Promise.resolve(new tl(this.Ke));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(U(typeof t.token=="string",44558,{tokenResult:t}),this.$e=t.token,new tl(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.Ce&&this.appCheck.removeTokenListener(this.Ce),this.Ce=void 0}}function dd(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class My{Qe(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nl="ConnectivityMonitor";class rl{constructor(){this.We=()=>this.Ge(),this.ze=()=>this.je(),this.He=[],this.Je()}Qe(e){this.He.push(e)}shutdown(){window.removeEventListener("online",this.We),window.removeEventListener("offline",this.ze)}Je(){window.addEventListener("online",this.We),window.addEventListener("offline",this.ze)}Ge(){O(nl,"Network connectivity changed: AVAILABLE");for(const e of this.He)e(0)}je(){O(nl,"Network connectivity changed: UNAVAILABLE");for(const e of this.He)e(1)}static Ye(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Bs=null;function Ho(){return Bs===null?Bs=(function(){return 268435456+Math.round(2147483648*Math.random())})():Bs++,"0x"+Bs.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ro="RestConnection",Uy={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class Fy{get Ze(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Xe=t+"://"+e.host,this.et=`projects/${r}/databases/${s}`,this.tt=this.databaseId.database===ci?`project_id=${r}`:`project_id=${r}&database_id=${s}`}nt(e,t,r,s,i){const a=Ho(),c=this.rt(e,t.toUriEncodedString());O(Ro,`Sending RPC '${e}' ${a}:`,c,r);const l={"google-cloud-resource-prefix":this.et,"x-goog-request-params":this.tt};this.it(l,s,i);const{host:d}=new URL(c),p=ss(d);return this.st(e,c,l,r,p).then((m=>(O(Ro,`Received RPC '${e}' ${a}: `,m),m)),(m=>{throw Xe(Ro,`RPC '${e}' ${a} failed with error: `,m,"url: ",c,"request:",r),m}))}_t(e,t,r,s,i,a){return this.nt(e,t,r,s,i)}it(e,t,r){if(e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Yn})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((s,i)=>e[i]=s)),r&&r.headers.forEach(((s,i)=>e[i]=s)),this.databaseInfo._customHeaders)for(const s of Object.keys(this.databaseInfo._customHeaders))e[s]=this.databaseInfo._customHeaders[s]}rt(e,t){const r=Uy[e];let s=`${this.Xe}/v1/${t}:${r}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class By{constructor(e){this.ot=e.ot,this.ut=e.ut}ct(e){this.lt=e}Et(e){this.ht=e}Tt(e){this.Pt=e}onMessage(e){this.It=e}close(){this.ut()}send(e){this.ot(e)}Rt(){this.lt()}At(){this.ht()}Vt(e){this.Pt(e)}dt(e){this.It(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Re="WebChannelConnection",vr=(n,e,t)=>{n.listen(e,(r=>{try{t(r)}catch(s){setTimeout((()=>{throw s}),0)}}))};class Fn extends Fy{constructor(e){super(e),this.ft=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static gt(){if(!Fn.yt){const e=Th();vr(e,Eh.STAT_EVENT,(t=>{t.stat===Lo.PROXY?O(Re,"STAT_EVENT: detected buffering proxy"):t.stat===Lo.NOPROXY&&O(Re,"STAT_EVENT: detected no buffering proxy")})),Fn.yt=!0}}st(e,t,r,s,i){const a=Ho();return new Promise(((c,l)=>{const d=new yh;d.setWithCredentials(!0),d.listenOnce(wh.COMPLETE,(()=>{try{switch(d.getLastErrorCode()){case Gs.NO_ERROR:const m=d.getResponseJson();O(Re,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(m)),c(m);break;case Gs.TIMEOUT:O(Re,`RPC '${e}' ${a} timed out`),l(new D(V.DEADLINE_EXCEEDED,"Request time out"));break;case Gs.HTTP_ERROR:const E=d.getStatus();if(O(Re,`RPC '${e}' ${a} failed with status:`,E,"response text:",d.getResponseText()),E>0){let b=d.getResponseJson();Array.isArray(b)&&(b=b[0]);const N=b==null?void 0:b.error;if(N&&N.status&&N.message){const M=(function(H){const J=H.toLowerCase().replace(/_/g,"-");return Object.values(V).indexOf(J)>=0?J:V.UNKNOWN})(N.status);l(new D(M,N.message))}else l(new D(V.UNKNOWN,"Server responded with status "+d.getStatus()))}else l(new D(V.UNAVAILABLE,"Connection failed."));break;default:B(9055,{wt:e,streamId:a,bt:d.getLastErrorCode(),St:d.getLastError()})}}finally{O(Re,`RPC '${e}' ${a} completed.`)}}));const p=JSON.stringify(s);O(Re,`RPC '${e}' ${a} sending request:`,s),d.send(t,"POST",p,r,15)}))}vt(e,t,r){const s=Ho(),i=[this.Xe,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=this.createWebChannelTransport(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},l=this.longPollingOptions.timeoutSeconds;l!==void 0&&(c.longPollingTimeout=Math.round(1e3*l)),this.useFetchStreams&&(c.useFetchStreams=!0),this.it(c.initMessageHeaders,t,r),c.encodeInitMessageHeaders=!0;const d=i.join("");O(Re,`Creating RPC '${e}' stream ${s}: ${d}`,c);const p=a.createWebChannel(d,c);this.Dt(p);let m=!1,E=!1;const b=new By({ot:N=>{E?O(Re,`Not sending because RPC '${e}' stream ${s} is closed:`,N):(m||(O(Re,`Opening RPC '${e}' stream ${s} transport.`),p.open(),m=!0),O(Re,`RPC '${e}' stream ${s} sending:`,N),p.send(N))},ut:()=>p.close()});return vr(p,Ar.EventType.OPEN,(()=>{E||(O(Re,`RPC '${e}' stream ${s} transport opened.`),b.Rt())})),vr(p,Ar.EventType.CLOSE,(()=>{E||(E=!0,O(Re,`RPC '${e}' stream ${s} transport closed`),b.Vt(),this.xt(p))})),vr(p,Ar.EventType.ERROR,(N=>{E||(E=!0,Xe(Re,`RPC '${e}' stream ${s} transport errored. Name:`,N.name,"Message:",N.message),b.Vt(new D(V.UNAVAILABLE,"The operation could not be completed")))})),vr(p,Ar.EventType.MESSAGE,(N=>{var M;if(!E){const L=N.data[0];U(!!L,16349);const H=L,J=(H==null?void 0:H.error)||((M=H[0])==null?void 0:M.error);if(J){O(Re,`RPC '${e}' stream ${s} received error:`,J);const ie=J.status;let Ke=(function(I){const g=ae[I];if(g!==void 0)return Yh(g)})(ie),Ie=J.message;ie==="NOT_FOUND"&&Ie.includes("database")&&Ie.includes("does not exist")&&Ie.includes(this.databaseId.database)&&Xe(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),Ke===void 0&&(Ke=V.INTERNAL,Ie="Unknown error status: "+ie+" with message "+J.message),E=!0,b.Vt(new D(Ke,Ie)),p.close()}else O(Re,`RPC '${e}' stream ${s} received:`,L),b.dt(L)}})),Fn.gt(),setTimeout((()=>{b.At()}),0),b}terminate(){this.ft.forEach((e=>e.close())),this.ft=[]}Dt(e){this.ft.push(e)}xt(e){this.ft=this.ft.filter((t=>t===e))}it(e,t,r){super.it(e,t,r),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return Ih()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qy(n){return new Fn(n)}Fn.yt=!1;class fd{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Ct=e,this.timerId=t,this.Ft=r,this.Ot=s,this.Mt=i,this.Nt=0,this.Lt=null,this.Bt=Date.now(),this.reset()}reset(){this.Nt=0}Ut(){this.Nt=this.Mt}kt(e){this.cancel();const t=Math.floor(this.Nt+this.qt()),r=Math.max(0,Date.now()-this.Bt),s=Math.max(0,t-r);s>0&&O("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Nt} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.Lt=this.Ct.enqueueAfterDelay(this.timerId,s,(()=>(this.Bt=Date.now(),e()))),this.Nt*=this.Ot,this.Nt<this.Ft&&(this.Nt=this.Ft),this.Nt>this.Mt&&(this.Nt=this.Mt)}$t(){this.Lt!==null&&(this.Lt.skipDelay(),this.Lt=null)}cancel(){this.Lt!==null&&(this.Lt.cancel(),this.Lt=null)}qt(){return(Math.random()-.5)*this.Nt}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sl="PersistentStream";class pd{constructor(e,t,r,s,i,a,c,l){this.Ct=e,this.Kt=r,this.Qt=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=l,this.state=0,this.Wt=0,this.Gt=null,this.zt=null,this.stream=null,this.jt=0,this.Ht=new fd(e,t)}Jt(){return this.state===1||this.state===5||this.Yt()}Yt(){return this.state===2||this.state===3}start(){this.jt=0,this.state!==4?this.auth():this.Zt()}async stop(){this.Jt()&&await this.close(0)}Xt(){this.state=0,this.Ht.reset()}en(){this.Yt()&&this.Gt===null&&(this.Gt=this.Ct.enqueueAfterDelay(this.Kt,6e4,(()=>this.tn())))}nn(e){this.rn(),this.stream.send(e)}async tn(){if(this.Yt())return this.close(0)}rn(){this.Gt&&(this.Gt.cancel(),this.Gt=null)}sn(){this.zt&&(this.zt.cancel(),this.zt=null)}async close(e,t){this.rn(),this.sn(),this.Ht.cancel(),this.Wt++,e!==4?this.Ht.reset():t&&t.code===V.RESOURCE_EXHAUSTED?(At(t.toString()),At("Using maximum backoff delay to prevent overloading the backend."),this.Ht.Ut()):t&&t.code===V.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this._n(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Tt(t)}_n(){}auth(){this.state=1;const e=this.an(this.Wt),t=this.Wt;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.Wt===t&&this.un(r,s)}),(r=>{e((()=>{const s=new D(V.UNKNOWN,"Fetching auth token failed: "+r.message);return this.cn(s)}))}))}un(e,t){const r=this.an(this.Wt);this.stream=this.En(e,t),this.stream.ct((()=>{r((()=>this.listener.ct()))})),this.stream.Et((()=>{r((()=>(this.state=2,this.zt=this.Ct.enqueueAfterDelay(this.Qt,1e4,(()=>(this.Yt()&&(this.state=3),Promise.resolve()))),this.listener.Et())))})),this.stream.Tt((s=>{r((()=>this.cn(s)))})),this.stream.onMessage((s=>{r((()=>++this.jt==1?this.hn(s):this.onNext(s)))}))}Zt(){this.state=5,this.Ht.kt((async()=>{this.state=0,this.start()}))}cn(e){return O(sl,`close with error: ${e}`),this.stream=null,this.close(4,e)}an(e){return t=>{this.Ct.enqueueAndForget((()=>this.Wt===e?t():(O(sl,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class $y extends pd{constructor(e,t,r,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}En(e,t){return this.connection.vt("Listen",e,t)}hn(e){return this.onNext(e)}onNext(e){this.Ht.reset();const t=yy(this.serializer,e),r=(function(i){if(!("targetChange"in i))return j.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?j.min():a.readTime?lt(a.readTime):j.min()})(e);return this.listener.Tn(t,r)}Pn(e){const t={};t.database=Wo(this.serializer),t.addTarget=(function(i,a){let c;const l=a.target;if(c=fn(l)?{pipelineQuery:Ry(i,l)}:Kh(l)?{documents:Ty(i,l)}:{query:Iy(i,l).Se},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=nd(i,a.resumeToken);const d=jo(i,a.expectedCount);d!==null&&(c.expectedCount=d)}else if(a.snapshotVersion.compareTo(j.min())>0){c.readTime=xr(i,a.snapshotVersion.toTimestamp());const d=jo(i,a.expectedCount);d!==null&&(c.expectedCount=d)}return c})(this.serializer,e);const r=Ay(this.serializer,e);r&&(t.labels=r),this.nn(t)}In(e){const t={};t.database=Wo(this.serializer),t.removeTarget=e,this.nn(t)}}class jy extends pd{constructor(e,t,r,s,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}get Rn(){return this.jt>0}start(){this.lastStreamToken=void 0,super.start()}_n(){this.Rn&&this.An([])}En(e,t){return this.connection.vt("Write",e,t)}hn(e){return U(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,U(!e.writeResults||e.writeResults.length===0,55816),this.listener.Vn()}onNext(e){U(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.Ht.reset();const t=Ey(e.writeResults,e.commitTime),r=lt(e.commitTime);return this.listener.dn(r,t)}fn(){const e={};e.database=Wo(this.serializer),this.nn(e)}An(e){const t={streamToken:this.lastStreamToken,writes:e.map((r=>wy(this.serializer,r)))};this.nn(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zy{}class Wy extends zy{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.mn=!1}pn(){if(this.mn)throw new D(V.FAILED_PRECONDITION,"The client has already been terminated.")}nt(e,t,r,s){return this.pn(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,a])=>this.connection.nt(e,zo(t,r),s,i,a))).catch((i=>{throw i.name==="FirebaseError"?(i.code===V.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new D(V.UNKNOWN,i.toString())}))}_t(e,t,r,s,i){return this.pn(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([a,c])=>this.connection._t(e,zo(t,r),s,a,c,i))).catch((a=>{throw a.name==="FirebaseError"?(a.code===V.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new D(V.UNKNOWN,a.toString())}))}terminate(){this.mn=!0,this.connection.terminate()}}function Hy(n,e,t,r){return new Wy(n,e,t,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gy="ComponentProvider",il=new Map;function Ky(n,e,t,r,s){return new A_(n,e,t,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,dd(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,r,s._customHeaders,s.grpcFlowControlWindow)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ol={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},md=41943040;class Le{static withCacheSize(e){return new Le(e,Le.DEFAULT_COLLECTION_PERCENTILE,Le.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}Le.DEFAULT_COLLECTION_PERCENTILE=10,Le.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Le.DEFAULT=new Le(md,Le.DEFAULT_COLLECTION_PERCENTILE,Le.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Le.DISABLED=new Le(-1,0,0);/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oi{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.gn(r),this.yn=r=>t.writeSequenceNumber(r))}gn(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.yn&&this.yn(e),e}}Oi.wn=-1;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qy="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Yy{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xn(n){if(n.code!==V.FAILED_PRECONDITION||n.message!==Qy)throw n;O("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&B(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new C(((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof C?t:C.resolve(t)}catch(t){return C.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):C.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):C.reject(t)}static resolve(e){return new C(((t,r)=>{t(e)}))}static reject(e){return new C(((t,r)=>{r(e)}))}static waitFor(e){return new C(((t,r)=>{let s=0,i=0,a=!1;e.forEach((c=>{++s,c.next((()=>{++i,a&&i===s&&t()}),(l=>r(l)))})),a=!0,i===s&&t()}))}static or(e){let t=C.resolve(!1);for(const r of e)t=t.next((s=>s?C.resolve(s):r()));return t}static forEach(e,t){const r=[];return e.forEach(((s,i)=>{r.push(t.call(this,s,i))})),this.waitFor(r)}static mapArray(e,t){return new C(((r,s)=>{const i=e.length,a=new Array(i);let c=0;for(let l=0;l<i;l++){const d=l;t(e[d]).next((p=>{a[d]=p,++c,c===i&&r(a)}),(p=>s(p)))}}))}static doWhile(e,t){return new C(((r,s)=>{const i=()=>{e()===!0?t().next((()=>{i()}),s):r()};i()}))}}function Jy(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Zn(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const al="LruGarbageCollector",Xy=1048576;function cl([n,e],[t,r]){const s=K(n,t);return s===0?K(e,r):s}class Zy{constructor(e){this.Yn=e,this.buffer=new le(cl),this.Zn=0}Xn(){return++this.Zn}er(e){const t=[e,this.Xn()];if(this.buffer.size<this.Yn)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();cl(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class ew{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.tr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.nr(6e4)}stop(){this.tr&&(this.tr.cancel(),this.tr=null)}get started(){return this.tr!==null}nr(e){O(al,`Garbage collection scheduled in ${e}ms`),this.tr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.tr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Zn(t)?O(al,"Ignoring IndexedDB error during garbage collection: ",t):await Xn(t)}await this.nr(3e5)}))}}class tw{constructor(e,t){this.rr=e,this.params=t}calculateTargetCount(e,t){return this.rr.ir(e).next((r=>Math.floor(t/100*r)))}nthSequenceNumber(e,t){if(t===0)return C.resolve(Oi.wn);const r=new Zy(t);return this.rr.forEachTarget(e,(s=>r.er(s.sequenceNumber))).next((()=>this.rr.sr(e,(s=>r.er(s))))).next((()=>r.maxValue))}removeTargets(e,t,r){return this.rr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.rr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(O("LruGarbageCollector","Garbage collection skipped; disabled"),C.resolve(ol)):this.getCacheSize(e).next((r=>r<this.params.cacheSizeCollectionThreshold?(O("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),ol):this._r(e,t)))}getCacheSize(e){return this.rr.getCacheSize(e)}_r(e,t){let r,s,i,a,c,l,d;const p=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((m=>(m>this.params.maximumSequenceNumbersToCollect?(O("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),s=this.params.maximumSequenceNumbersToCollect):s=m,a=Date.now(),this.nthSequenceNumber(e,s)))).next((m=>(r=m,c=Date.now(),this.removeTargets(e,r,t)))).next((m=>(i=m,l=Date.now(),this.removeOrphanedDocuments(e,r)))).next((m=>(d=Date.now(),Nn()<=Q.DEBUG&&O("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-p}ms
	Determined least recently used ${s} in `+(c-a)+`ms
	Removed ${i} targets in `+(l-c)+`ms
	Removed ${m} documents in `+(d-l)+`ms
Total Duration: ${d-p}ms`),C.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:m}))))}}function nw(n,e){return new tw(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gd="firestore.googleapis.com",ul=!0;class ll{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new D(V.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=gd,this.ssl=ul}else this.host=e.host,this.ssl=e.ssl??ul;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e._customHeaders&&(this._customHeaders={...e._customHeaders}),e.cacheSizeBytes===void 0)this.cacheSizeBytes=md;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Xy)throw new D(V.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}if(I_("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=dd(e.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new D(V.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new D(V.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new D(V.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams,e.grpcFlowControlWindow!==void 0){if(typeof e.grpcFlowControlWindow!="number"||e.grpcFlowControlWindow<=0||e.grpcFlowControlWindow>2147483647||!Number.isInteger(e.grpcFlowControlWindow))throw new D(V.INVALID_ARGUMENT,"grpcFlowControlWindow must be a positive integer and cannot exceed 2147483647");this.grpcFlowControlWindow=e.grpcFlowControlWindow}}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams&&this.grpcFlowControlWindow===e.grpcFlowControlWindow&&(function(r,s){if(r===s)return!0;if(!r||!s)return!1;const i=Object.keys(r),a=Object.keys(s);if(i.length!==a.length)return!1;for(const c of i)if(r[c]!==s[c])return!1;return!0})(this._customHeaders,e._customHeaders)}}let Li=class{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new ll({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new D(V.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new D(V.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new ll(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new Ny;switch(r.type){case"firstParty":return new Oy(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new D(V.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const r=il.get(t);r&&(O(Gy,"Removing Datastore"),il.delete(t),r.terminate())})(this),Promise.resolve()}};function rw(n,e,t,r={}){var d;n=Ee(n,Li);const s=ss(e),i=n._getSettings(),a={...i,emulatorOptions:n._getEmulatorOptions()},c=`${e}:${t}`;s&&Ll(`https://${c}`),i.host!==gd&&i.host!==c&&Xe("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const l={...i,host:c,ssl:s,emulatorOptions:r};if(!Tn(l,a)&&(n._setSettings(l),r.mockUserToken)){let p,m;if(typeof r.mockUserToken=="string")p=r.mockUserToken,m=Pe.MOCK_USER;else{p=sp(r.mockUserToken,(d=n._app)==null?void 0:d.options.projectId);const E=r.mockUserToken.sub||r.mockUserToken.user_id;if(!E)throw new D(V.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");m=new Pe(E)}n._authCredentials=new ky(new hd(p,m))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sn{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new sn(this.firestore,e,this._query)}}class ne{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new qt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new ne(this.firestore,e,this._key)}toJSON(){return{type:ne._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(us(t,ne._jsonSchema))return new ne(e,r||null,new F(X.fromString(t.referencePath)))}}ne._jsonSchemaVersion="firestore/documentReference/1.0",ne._jsonSchema={type:ue("string",ne._jsonSchemaVersion),referencePath:ue("string")};class qt extends sn{constructor(e,t,r){super(e,t,Ni(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new ne(this.firestore,null,new F(e))}withConverter(e){return new qt(this.firestore,e,this._path)}}function mI(n,e,...t){if(n=ye(n),Rh("collection","path",e),n instanceof Li){const r=X.fromString(e,...t);return Lu(r),new qt(n,null,r)}{if(!(n instanceof ne||n instanceof qt))throw new D(V.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(X.fromString(e,...t));return Lu(r),new qt(n.firestore,null,r)}}function sw(n,e,...t){if(n=ye(n),arguments.length===1&&(e=pa.newId()),Rh("doc","path",e),n instanceof Li){const r=X.fromString(e,...t);return Ou(r),new ne(n,null,new F(r))}{if(!(n instanceof ne||n instanceof qt))throw new D(V.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(X.fromString(e,...t));return Ou(r),new ne(n.firestore,n instanceof qt?n.converter:null,new F(r))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ue{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0})(this._values,e._values)}toJSON(){return{type:Ue._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(us(e,Ue._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new Ue(e.vectorValues);throw new D(V.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Ue._jsonSchemaVersion="firestore/vectorValue/1.0",Ue._jsonSchema={type:ue("string",Ue._jsonSchemaVersion),vectorValues:ue("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iw=/^__.*__$/;class ow{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new rn(e,this.data,this.fieldMask,t,this.fieldTransforms):new hs(e,this.data,t,this.fieldTransforms)}}class _d{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new rn(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function yd(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw B(40011,{dataSource:n})}}class va{constructor(e,t,r,s,i,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.validatePath(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(e){return new va({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(e){var s;const t=(s=this.path)==null?void 0:s.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePathSegment(e),r}childContextForFieldPath(e){var s;const t=(s=this.path)==null?void 0:s.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePath(),r}childContextForArray(e){return this.contextWith({path:void 0,arrayElement:!0})}createError(e){return mi(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}validatePath(){if(this.path)for(let e=0;e<this.path.length;e++)this.validatePathSegment(this.path.get(e))}validatePathSegment(e){if(e.length===0)throw this.createError("Document fields must not be empty");if(yd(this.dataSource)&&iw.test(e))throw this.createError('Document fields cannot begin and end with "__"')}}class aw{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Di(e)}createContext(e,t,r,s=!1){return new va({dataSource:e,methodName:t,targetDoc:r,path:He.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function ms(n){const e=n._freezeSettings(),t=Di(n._databaseId);return new aw(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Aa(n,e,t,r,s,i={}){const a=n.createContext(i.merge||i.mergeFields?2:0,e,t,s);Pa("Data must be an object, but it was:",a,r);const c=Td(r,a);let l,d;if(i.merge)l=new ze(a.fieldMask),d=a.fieldTransforms;else if(i.mergeFields){const p=[];for(const m of i.mergeFields){const E=Yt(e,m,t);if(!a.contains(E))throw new D(V.INVALID_ARGUMENT,`Field '${E}' is specified in your field mask but missing from your input data.`);Rd(p,E)||p.push(E)}l=new ze(p),d=a.fieldTransforms.filter((m=>l.covers(m.field)))}else l=null,d=a.fieldTransforms;return new ow(new De(c),l,d)}class Mi extends xi{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.createError(`${this._methodName}() can only appear at the top level of your update data`):e.createError(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Mi}}class Ra extends xi{_toFieldTransform(e){return new k_(e.path,new zr)}isEqual(e){return e instanceof Ra}}function wd(n,e,t,r){const s=n.createContext(1,e,t);Pa("Data must be an object, but it was:",s,r);const i=[],a=De.empty();nn(r,((l,d)=>{const p=Ad(e,l,t);d=ye(d);const m=s.childContextForFieldPath(p);if(d instanceof Mi)i.push(p);else{const E=Qt(d,m);E!=null&&(i.push(p),a.set(p,E))}}));const c=new ze(i);return new _d(a,c,s.fieldTransforms)}function Ed(n,e,t,r,s,i){const a=n.createContext(1,e,t),c=[Yt(e,r,t)],l=[s];if(i.length%2!=0)throw new D(V.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let E=0;E<i.length;E+=2)c.push(Yt(e,i[E])),l.push(i[E+1]);const d=[],p=De.empty();for(let E=c.length-1;E>=0;--E)if(!Rd(d,c[E])){const b=c[E];let N=l[E];N=ye(N);const M=a.childContextForFieldPath(b);if(N instanceof Mi)d.push(b);else{const L=Qt(N,M);L!=null&&(d.push(b),p.set(b,L))}}const m=new ze(d);return new _d(p,m,a.fieldTransforms)}function cw(n,e,t,r=!1){return Qt(t,n.createContext(r?4:3,e))}function Qt(n,e,t){if(vd(n=ye(n)))return Pa("Unsupported field value:",e,n),Td(n,e);if(n instanceof xi)return(function(s,i){if(!yd(i.dataSource))throw i.createError(`${s._methodName}() can only be used with update() and set()`);if(!i.path)throw i.createError(`${s._methodName}() is not currently supported inside arrays`);const a=s._toFieldTransform(i);a&&i.fieldTransforms.push(a)})(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.createError("Nested arrays are not supported");return(function(s,i){const a=[];let c=0;for(const l of s){let d=Qt(l,i.childContextForArray(c));d==null&&(d={nullValue:"NULL_VALUE"}),a.push(d),c++}return{arrayValue:{values:a}}})(n,e)}return(function(s,i,a){if((s=ye(s))===null)return{nullValue:"NULL_VALUE"};if(typeof s=="number")return _a(i.serializer,s);if(typeof s=="boolean")return{booleanValue:s};if(typeof s=="string")return{stringValue:s};if(s instanceof Date){const c=Z.fromDate(s);return{timestampValue:xr(i.serializer,c)}}if(s instanceof Z){const c=new Z(s.seconds,1e3*Math.floor(s.nanoseconds/1e3));return{timestampValue:xr(i.serializer,c)}}if(Id(s)){const c=Z.fromInstant(s),l=new Z(c.seconds,1e3*Math.floor(c.nanoseconds/1e3));return{timestampValue:xr(i.serializer,l)}}if(s instanceof ht)return{geoPointValue:{latitude:s.latitude,longitude:s.longitude}};if(s instanceof Qe)return{bytesValue:nd(i.serializer,s._byteString)};if(s instanceof ne){const c=i.databaseId,l=s.firestore._databaseId;if(!l.isEqual(c))throw i.createError(`Document reference is for database ${l.projectId}/${l.database} but should be for database ${c.projectId}/${c.database}`);return{referenceValue:Ia(s.firestore._databaseId||i.databaseId,s._key.path)}}if(s instanceof Ue)return(function(l,d){const p=l instanceof Ue?l.toArray():l;return{mapValue:{fields:{[Nh]:{stringValue:kh},[$r]:{arrayValue:{values:p.map((E=>{if(typeof E!="number")throw d.createError("VectorValues must only contain numeric values.");return Si(d.serializer,E)}))}}}}}})(s,i);if(ud(s))return s._toProto(i.serializer);throw i.createError(`Unsupported field value: ${Ai(s)}`)})(n,e)}function Td(n,e){const t={};return Ah(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):nn(n,((r,s)=>{const i=Qt(s,e.childContextForField(r));i!=null&&(t[r]=i)})),{mapValue:{fields:t}}}function Id(n){if(typeof n!="object"||n===null)return!1;if(typeof Temporal<"u"&&typeof Temporal.Instant=="function"&&n instanceof Temporal.Instant)return!0;const e=n;return e[Symbol.toStringTag]==="Temporal.Instant"&&typeof e.t=="bigint"}function vd(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof Z||n instanceof ht||n instanceof Qe||n instanceof ne||n instanceof xi||n instanceof Ue||Id(n)||ud(n))}function Pa(n,e,t){if(!vd(t)||!cs(t)){const r=Ai(t);throw r==="an object"?e.createError(n+" a custom object"):e.createError(n+" "+r)}}function Yt(n,e,t){if((e=ye(e))instanceof ps)return e._internalPath;if(typeof e=="string")return Ad(n,e);throw mi("Field path arguments must be of type string or ",n,!1,void 0,t)}const uw=new RegExp("[~\\*/\\[\\]]");function Ad(n,e,t){if(e.search(uw)>=0)throw mi(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new ps(...e.split("."))._internalPath}catch{throw mi(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function mi(n,e,t,r,s){const i=r&&!r.isEmpty(),a=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let l="";return(i||a)&&(l+=" (found",i&&(l+=` in field ${r}`),a&&(l+=` in document ${s}`),l+=")"),new D(V.INVALID_ARGUMENT,c+n+l)}function Rd(n,e){return n.some((t=>t.isEqual(e)))}function Pd(n){return typeof n._readUserData=="function"}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class be{constructor(e){this.optionDefinitions=e}_getKnownOptions(e,t){const r=De.empty();for(const s in this.optionDefinitions)if(this.optionDefinitions.hasOwnProperty(s)){const i=this.optionDefinitions[s];if(s in e){const a=e[s];let c;i.nestedOptions&&cs(a)?c={mapValue:{fields:new be(i.nestedOptions).getOptionsProto(t,a)}}:a&&(c=Qt(a,t)??void 0),c&&r.set(He.fromServerFormat(i.serverName),c)}}return r}getOptionsProto(e,t,r){const s=this._getKnownOptions(t,e);if(r){const i=new Map(T_(r,((a,c)=>[He.fromServerFormat(c),a!==void 0?Qt(a,e):null])));s.setAll(i)}return s.value.mapValue.fields??{}}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lw(n){return typeof n=="object"&&n!==null&&!!("nullValue"in n&&(n.nullValue===null||n.nullValue==="NULL_VALUE")||"booleanValue"in n&&(n.booleanValue===null||typeof n.booleanValue=="boolean")||"integerValue"in n&&(n.integerValue===null||typeof n.integerValue=="number"||typeof n.integerValue=="string")||"doubleValue"in n&&(n.doubleValue===null||typeof n.doubleValue=="number")||"timestampValue"in n&&(n.timestampValue===null||(function(t){return typeof t=="object"&&t!==null&&"seconds"in t&&(t.seconds===null||typeof t.seconds=="number"||typeof t.seconds=="string")&&"nanos"in t&&(t.nanos===null||typeof t.nanos=="number")})(n.timestampValue))||"stringValue"in n&&(n.stringValue===null||typeof n.stringValue=="string")||"bytesValue"in n&&(n.bytesValue===null||n.bytesValue instanceof Uint8Array)||"referenceValue"in n&&(n.referenceValue===null||typeof n.referenceValue=="string")||"geoPointValue"in n&&(n.geoPointValue===null||(function(t){return typeof t=="object"&&t!==null&&"latitude"in t&&(t.latitude===null||typeof t.latitude=="number")&&"longitude"in t&&(t.longitude===null||typeof t.longitude=="number")})(n.geoPointValue))||"arrayValue"in n&&(n.arrayValue===null||(function(t){return typeof t=="object"&&t!==null&&!(!("values"in t)||t.values!==null&&!Array.isArray(t.values))})(n.arrayValue))||"mapValue"in n&&(n.mapValue===null||(function(t){return typeof t=="object"&&t!==null&&!(!("fields"in t)||t.fields!==null&&!cs(t.fields))})(n.mapValue))||"fieldReferenceValue"in n&&(n.fieldReferenceValue===null||typeof n.fieldReferenceValue=="string")||"functionValue"in n&&(n.functionValue===null||(function(t){return typeof t=="object"&&t!==null&&!(!("name"in t)||t.name!==null&&typeof t.name!="string"||!("args"in t)||t.args!==null&&!Array.isArray(t.args))})(n.functionValue))||"pipelineValue"in n&&(n.pipelineValue===null||(function(t){return typeof t=="object"&&t!==null&&!(!("stages"in t)||t.stages!==null&&!Array.isArray(t.stages))})(n.pipelineValue)))}function gI(){return new Ra("serverTimestamp")}function hw(n){return new Ue(n)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function k(n){let e;return n instanceof Pn?n:(e=cs(n)?gw(n):n instanceof Array?_w(n):Sd(n,void 0),e)}function Po(n){if(n instanceof Pn)return n;if(n instanceof Ue)return Jr(n);if(Array.isArray(n))return Jr(hw(n));throw new Error("Unsupported value: "+typeof n)}function Sa(n){return S_(n)?Xs(n):k(n)}class Pn{constructor(){this._protoValueType="ProtoValue"}add(e){return new S("add",[this,k(e)],"add")}asBoolean(){if(this instanceof Jt)return this;if(this instanceof tr)return new bd(this);if(this instanceof er)return new mw(this);if(this instanceof S)return new Vd(this);throw new D("invalid-argument",`Conversion of type ${typeof this} to BooleanExpression not supported.`)}subtract(e){return new S("subtract",[this,k(e)],"subtract")}multiply(e){return new S("multiply",[this,k(e)],"multiply")}divide(e){return new S("divide",[this,k(e)],"divide")}mod(e){return new S("mod",[this,k(e)],"mod")}equal(e){return new S("equal",[this,k(e)],"equal").asBoolean()}notEqual(e){return new S("not_equal",[this,k(e)],"notEqual").asBoolean()}lessThan(e){return new S("less_than",[this,k(e)],"lessThan").asBoolean()}lessThanOrEqual(e){return new S("less_than_or_equal",[this,k(e)],"lessThanOrEqual").asBoolean()}greaterThan(e){return new S("greater_than",[this,k(e)],"greaterThan").asBoolean()}greaterThanOrEqual(e){return new S("greater_than_or_equal",[this,k(e)],"greaterThanOrEqual").asBoolean()}arrayConcat(e,...t){const r=[e,...t].map((s=>k(s)));return new S("array_concat",[this,...r],"arrayConcat")}arrayContains(e){return new S("array_contains",[this,k(e)],"arrayContains").asBoolean()}arrayContainsAll(e){const t=Array.isArray(e)?new Pr(e.map(k),"arrayContainsAll"):e;return new S("array_contains_all",[this,t],"arrayContainsAll").asBoolean()}arrayContainsAny(e){const t=Array.isArray(e)?new Pr(e.map(k),"arrayContainsAny"):e;return new S("array_contains_any",[this,t],"arrayContainsAny").asBoolean()}arrayReverse(){return new S("array_reverse",[this])}arrayLength(){return new S("array_length",[this],"arrayLength")}equalAny(e){const t=Array.isArray(e)?new Pr(e.map(k),"equalAny"):e;return new S("equal_any",[this,t],"equalAny").asBoolean()}notEqualAny(e){const t=Array.isArray(e)?new Pr(e.map(k),"notEqualAny"):e;return new S("not_equal_any",[this,t],"notEqualAny").asBoolean()}exists(){return new S("exists",[this],"exists").asBoolean()}charLength(){return new S("char_length",[this],"charLength")}like(e){return new S("like",[this,k(e)],"like").asBoolean()}regexContains(e){return new S("regex_contains",[this,k(e)],"regexContains").asBoolean()}regexFind(e){return new S("regex_find",[this,k(e)],"regexFind")}regexFindAll(e){return new S("regex_find_all",[this,k(e)],"regexFindAll")}regexMatch(e){return new S("regex_match",[this,k(e)],"regexMatch").asBoolean()}stringContains(e){return new S("string_contains",[this,k(e)],"stringContains").asBoolean()}startsWith(e){return new S("starts_with",[this,k(e)],"startsWith").asBoolean()}endsWith(e){return new S("ends_with",[this,k(e)],"endsWith").asBoolean()}toLower(){return new S("to_lower",[this],"toLower")}toUpper(){return new S("to_upper",[this],"toUpper")}trim(e){const t=[this];return e&&t.push(k(e)),new S("trim",t,"trim")}ltrim(e){const t=[this];return e&&t.push(k(e)),new S("ltrim",t,"ltrim")}rtrim(e){const t=[this];return e&&t.push(k(e)),new S("rtrim",t,"rtrim")}type(){return new S("type",[this])}isType(e){return new S("is_type",[this,Jr(e)],"isType").asBoolean()}stringConcat(e,...t){const r=[e,...t].map(k);return new S("string_concat",[this,...r],"stringConcat")}stringIndexOf(e){return new S("string_index_of",[this,k(e)],"stringIndexOf")}stringRepeat(e){return new S("string_repeat",[this,k(e)],"stringRepeat")}stringReplaceAll(e,t){return new S("string_replace_all",[this,k(e),k(t)],"stringReplaceAll")}stringReplaceOne(e,t){return new S("string_replace_one",[this,k(e),k(t)],"stringReplaceOne")}concat(e,...t){const r=[e,...t].map(k);return new S("concat",[this,...r],"concat")}reverse(){return new S("reverse",[this],"reverse")}arrayFilter(e,t){return new S("array_filter",[this,k(e),t],"arrayFilter")}arrayTransform(e,t){return new S("array_transform",[this,k(e),t],"arrayTransform")}arrayTransformWithIndex(e,t,r){return new S("array_transform",[this,k(e),k(t),r],"arrayTransformWithIndex")}arraySlice(e,t){const r=[this,k(e)];return t!==void 0&&r.push(k(t)),new S("array_slice",r,"arraySlice")}arrayFirst(){return new S("array_first",[this],"arrayFirst")}arrayFirstN(e){return new S("array_first_n",[this,k(e)],"arrayFirstN")}arrayLast(){return new S("array_last",[this],"arrayLast")}arrayLastN(e){return new S("array_last_n",[this,k(e)],"arrayLastN")}arrayMaximum(){return new S("maximum",[this],"arrayMaximum")}arrayMaximumN(e){return new S("maximum_n",[this,k(e)],"arrayMaximumN")}arrayMinimum(){return new S("minimum",[this],"arrayMinimum")}arrayMinimumN(e){return new S("minimum_n",[this,k(e)],"arrayMinimumN")}arrayIndexOf(e){return new S("array_index_of",[this,k(e),k("first")],"arrayIndexOf")}arrayLastIndexOf(e){return new S("array_index_of",[this,k(e),k("last")],"arrayLastIndexOf")}arrayIndexOfAll(e){return new S("array_index_of_all",[this,k(e)],"arrayIndexOfAll")}byteLength(){return new S("byte_length",[this],"byteLength")}ceil(){return new S("ceil",[this])}floor(){return new S("floor",[this])}abs(){return new S("abs",[this])}exp(){return new S("exp",[this])}mapGet(e){return new S("map_get",[this,Jr(e)],"mapGet")}mapSet(e,t,...r){const s=[this,k(e),k(t),...r.map(k)];return new S("map_set",s,"mapSet")}mapKeys(){return new S("map_keys",[this],"mapKeys")}mapValues(){return new S("map_values",[this],"mapValues")}mapEntries(){return new S("map_entries",[this],"mapEntries")}getField(e){return new S("get_field",[this,k(e)],"get_field")}count(){return je._create("count",[this],"count")}sum(){return je._create("sum",[this],"sum")}average(){return je._create("average",[this],"average")}minimum(){return je._create("minimum",[this],"minimum")}maximum(){return je._create("maximum",[this],"maximum")}first(){return je._create("first",[this],"first")}last(){return je._create("last",[this],"last")}arrayAgg(){return je._create("array_agg",[this],"arrayAgg")}arrayAggDistinct(){return je._create("array_agg_distinct",[this],"arrayAggDistinct")}countDistinct(){return je._create("count_distinct",[this],"countDistinct")}logicalMaximum(e,...t){const r=[e,...t];return new S("maximum",[this,...r.map(k)],"logicalMaximum")}logicalMinimum(e,...t){const r=[e,...t];return new S("minimum",[this,...r.map(k)],"minimum")}vectorLength(){return new S("vector_length",[this],"vectorLength")}cosineDistance(e){return new S("cosine_distance",[this,Po(e)],"cosineDistance")}dotProduct(e){return new S("dot_product",[this,Po(e)],"dotProduct")}euclideanDistance(e){return new S("euclidean_distance",[this,Po(e)],"euclideanDistance")}unixMicrosToTimestamp(){return new S("unix_micros_to_timestamp",[this],"unixMicrosToTimestamp")}timestampToUnixMicros(){return new S("timestamp_to_unix_micros",[this],"timestampToUnixMicros")}unixMillisToTimestamp(){return new S("unix_millis_to_timestamp",[this],"unixMillisToTimestamp")}timestampToUnixMillis(){return new S("timestamp_to_unix_millis",[this],"timestampToUnixMillis")}unixSecondsToTimestamp(){return new S("unix_seconds_to_timestamp",[this],"unixSecondsToTimestamp")}timestampToUnixSeconds(){return new S("timestamp_to_unix_seconds",[this],"timestampToUnixSeconds")}timestampAdd(e,t){return new S("timestamp_add",[this,k(e),k(t)],"timestampAdd")}timestampSubtract(e,t){return new S("timestamp_subtract",[this,k(e),k(t)],"timestampSubtract")}timestampDiff(e,t){return new S("timestamp_diff",[this,Sa(e),k(t)],"timestampDiff")}timestampExtract(e,t){const r=[this,k(e)];return t&&r.push(k(t)),new S("timestamp_extract",r,"timestampExtract")}documentId(){return new S("document_id",[this],"documentId")}parent(){return new S("parent",[this],"parent")}substring(e,t){const r=k(e);return new S("substring",t===void 0?[this,r]:[this,r,k(t)],"substring")}arrayGet(e){return new S("array_get",[this,k(e)],"arrayGet")}isError(){return new S("is_error",[this],"isError").asBoolean()}ifError(e){const t=new S("if_error",[this,k(e)],"ifError");return e instanceof Jt?t.asBoolean():t}isAbsent(){return new S("is_absent",[this],"isAbsent").asBoolean()}mapRemove(e){return new S("map_remove",[this,k(e)],"mapRemove")}mapMerge(e,...t){const r=k(e),s=t.map(k);return new S("map_merge",[this,r,...s],"mapMerge")}pow(e){return new S("pow",[this,k(e)])}trunc(e){return e===void 0?new S("trunc",[this]):new S("trunc",[this,k(e)],"trunc")}round(e){return e===void 0?new S("round",[this]):new S("round",[this,k(e)],"round")}collectionId(){return new S("collection_id",[this])}length(){return new S("length",[this])}ln(){return new S("ln",[this])}sqrt(){return new S("sqrt",[this])}stringReverse(){return new S("string_reverse",[this])}ifAbsent(e){return new S("if_absent",[this,k(e)],"ifAbsent")}ifNull(e){return new S("if_null",[this,k(e)],"ifNull")}coalesce(e,...t){return new S("coalesce",[this,k(e),...t.map(k)],"coalesce")}join(e){return new S("join",[this,k(e)],"join")}log10(){return new S("log10",[this])}arraySum(){return new S("sum",[this])}split(e){return new S("split",[this,k(e)])}timestampTruncate(e,t){const r=[this,k(e)];return t&&r.push(k(t)),new S("timestamp_trunc",r)}ascending(){return yw(this)}descending(){return ww(this)}as(e){return new fw(this,e,"as")}}class je{constructor(e,t){this.name=e,this.params=t,this.exprType="AggregateFunction",this._protoValueType="ProtoValue"}static _create(e,t,r){const s=new je(e,t);return s._methodName=r,s}as(e){return new dw(this,e,"as")}_toProto(e){return{functionValue:{name:this.name,args:this.params.map((t=>t._toProto(e)))}}}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,this.params.forEach((t=>t._readUserData(e)))}}class dw{constructor(e,t,r){this.aggregate=e,this.alias=t,this._methodName=r}_readUserData(e){this.aggregate._readUserData(e)}}class fw{constructor(e,t,r){this.expr=e,this.alias=t,this._methodName=r,this.exprType="AliasedExpression",this.selectable=!0}_readUserData(e){this.expr._readUserData(e)}}class Pr extends Pn{constructor(e,t){super(),this.cr=e,this._methodName=t,this.expressionType="ListOfExpressions"}_toProto(e){return{arrayValue:{values:this.cr.map((t=>t._toProto(e)))}}}_readUserData(e){this.cr.forEach((t=>t._readUserData(e)))}}class er extends Pn{constructor(e,t){super(),this.fieldPath=e,this._methodName=t,this.expressionType="Field",this.selectable=!0}get _fieldPath(){return this.fieldPath}get fieldName(){return this.fieldPath.canonicalString()}get alias(){return this.fieldName}get expr(){return this}geoDistance(e){return new S("geo_distance",[this,k(e)],"geoDistance")}_toProto(e){return{fieldReferenceValue:this.fieldPath.canonicalString()}}_readUserData(e){}}function Xs(n){return pw(n,"field")}function pw(n,e){return new er(typeof n=="string"?it===n?Cy()._internalPath:Yt("field",n):n._internalPath,e)}class tr extends Pn{constructor(e,t){super(),this.value=e,this._methodName=t,this.expressionType="Constant"}static _fromProto(e){const t=new tr(e,void 0);return t._protoValue=e,t}_toProto(e){return U(this._protoValue!==void 0,237),this._protoValue}_getValue(){return this._protoValue}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,lw(this._protoValue)||(this._protoValue=Qt(this.value,e))}}function Jr(n,e){return Sd(n,"constant")}function Sd(n,e){const t=new tr(n,e);return typeof n=="boolean"?new bd(t):t}class S extends Pn{constructor(e,t,r,s){super(),this.name=e,this.params=t,this.expressionType="Function",this._optionsProto=void 0,r!==void 0&&(this._methodName=r),s!==void 0&&(this._options=s)}get _optionsUtil(){return new be({})}_toProto(e){const t={functionValue:{name:this.name,args:this.params.map((r=>r._toProto(e)))}};return this._optionsProto&&(t.functionValue.options=this._optionsProto),t}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,this.params.forEach((t=>t._readUserData(e))),this._options&&(this._optionsProto=this._optionsUtil.getOptionsProto(e,this._options))}}class Jt extends Pn{get _methodName(){return this._expr._methodName}countIf(){return je._create("count_if",[this],"countIf")}not(){return new S("not",[this],"not").asBoolean()}conditional(e,t){return new S("conditional",[this,e,t],"conditional")}ifError(e){const t=k(e),r=new S("if_error",[this,t],"ifError");return t instanceof Jt?r.asBoolean():r}_toProto(e){return this._expr._toProto(e)}_readUserData(e){this._expr._readUserData(e)}}class Vd extends Jt{constructor(e){super(),this._expr=e,this.expressionType="Function"}}class bd extends Jt{constructor(e){super(),this._expr=e,this.expressionType="Constant"}_getValue(){return this._expr._getValue()}}class mw extends Jt{constructor(e){super(),this._expr=e,this.expressionType="Field"}}function gw(n,e){const t=[];for(const r in n)if(Object.prototype.hasOwnProperty.call(n,r)){const s=n[r];t.push(Jr(r)),t.push(k(s))}return new S("map",t,"map")}function _w(n){return(function(t,r){return new S("array",t.map((s=>k(s))),r)})(n,"array")}function yw(n){return new Cd(Sa(n),"ascending","ascending")}function ww(n){return new Cd(Sa(n),"descending","descending")}class Cd{constructor(e,t,r){this.expr=e,this.direction=t,this._methodName=r,this._protoValueType="ProtoValue"}_toProto(e){return{mapValue:{fields:{direction:ld(this.direction),expression:this.expr._toProto(e)}}}}_readUserData(e){this.expr._readUserData(e)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ge{constructor(e){this.optionsProto=void 0,{rawOptions:this.rawOptions,...this.knownOptions}=e}_readUserData(e){this.optionsProto=this._optionsUtil.getOptionsProto(e,this.knownOptions,this.rawOptions)}_toProto(e){return{name:this._name,options:this.optionsProto}}}class Nd extends Ge{get _name(){return"add_fields"}get _optionsUtil(){return new be({})}constructor(e,t){super(t),this.fields=e}_toProto(e){return{...super._toProto(e),args:[Yr(e,this.fields)]}}_readUserData(e){super._readUserData(e),Xt(this.fields,e)}}class kd extends Ge{get _name(){return"aggregate"}get _optionsUtil(){return new be({})}constructor(e,t,r){super(r),this.groups=e,this.accumulators=t}_toProto(e){return{...super._toProto(e),args:[Yr(e,this.accumulators),Yr(e,this.groups)]}}_readUserData(e){super._readUserData(e),Xt(this.groups,e),Xt(this.accumulators,e)}}class Dd extends Ge{get _name(){return"distinct"}get _optionsUtil(){return new be({})}constructor(e,t){super(t),this.groups=e}_toProto(e){return{...super._toProto(e),args:[Yr(e,this.groups)]}}_readUserData(e){super._readUserData(e),Xt(this.groups,e)}}class Ui extends Ge{get _name(){return"collection"}get _optionsUtil(){return new be({forceIndex:{serverName:"force_index"}})}constructor(e,t){super(t),this.hr=e.startsWith("/")?e:"/"+e}_toProto(e){return{...super._toProto(e),args:[{referenceValue:this.hr}]}}_readUserData(e){super._readUserData(e)}}class Fi extends Ge{get _name(){return"collection_group"}get _optionsUtil(){return new be({forceIndex:{serverName:"force_index"}})}constructor(e,t){super(t),this.collectionId=e}_toProto(e){return{...super._toProto(e),args:[{referenceValue:""},{stringValue:this.collectionId}]}}_readUserData(e){super._readUserData(e)}}class Va extends Ge{get _name(){return"database"}get _optionsUtil(){return new be({})}_toProto(e){return{...super._toProto(e)}}_readUserData(e){super._readUserData(e)}}class ba extends Ge{get _name(){return"documents"}get _optionsUtil(){return new be({})}constructor(e,t){if(super(t),!e||e.length===0)throw new D(V.INVALID_ARGUMENT,"Empty document paths are not allowed in DocumentsSource");const r=e.map((i=>i.startsWith("/")?i:"/"+i)),s=new Set(r);if(s.size!==r.length)throw new D(V.INVALID_ARGUMENT,"Duplicate document paths are not allowed in DocumentsSource");this.Tr=r,this.Pr=s}_toProto(e){return{...super._toProto(e),args:this.Tr.map((t=>({referenceValue:t})))}}_readUserData(e){super._readUserData(e)}}class Bi extends Ge{get _name(){return"where"}get _optionsUtil(){return new be({})}constructor(e,t){super(t),this.condition=e}_toProto(e){return{...super._toProto(e),args:[this.condition._toProto(e)]}}_readUserData(e){super._readUserData(e),Xt(this.condition,e)}}class An extends Ge{get _name(){return"limit"}get _optionsUtil(){return new be({})}constructor(e,t){U(!isNaN(e)&&e!==1/0&&e!==-1/0,34860),super(t),this.limit=e}_toProto(e){return{...super._toProto(e),args:[_a(e,this.limit)]}}}class hl extends Ge{get _name(){return"offset"}get _optionsUtil(){return new be({})}constructor(e,t){super(t),this.offset=e}_toProto(e){return{...super._toProto(e),args:[_a(e,this.offset)]}}}class Ew extends Ge{get _name(){return"select"}get _optionsUtil(){return new be({})}constructor(e,t){super(t),this.selections=e}_toProto(e){return{...super._toProto(e),args:[Yr(e,this.selections)]}}_readUserData(e){super._readUserData(e),Xt(this.selections,e)}}class _t extends Ge{get _name(){return"sort"}get _optionsUtil(){return new be({})}constructor(e,t){super(t),this.orderings=e}_toProto(e){return{...super._toProto(e),args:this.orderings.map((t=>t._toProto(e)))}}_readUserData(e){super._readUserData(e),Xt(this.orderings,e)}}class Ca extends Ge{get _name(){return"replace_with"}get _optionsUtil(){return new be({})}constructor(e,t){super(t),this.map=e}_toProto(e){return{...super._toProto(e),args:[this.map._toProto(e),ld(Ca.Ir)]}}_readUserData(e){super._readUserData(e),Xt(this.map,e)}}Ca.Ir="full_replace";function Xt(n,e){return Pd(n)?n._readUserData(e):Array.isArray(n)?n.forEach((t=>t._readUserData(e))):n instanceof Map?n.forEach((t=>t._readUserData(e))):Object.values(n).forEach((t=>t._readUserData(e))),n}/**
 * @license
 * Copyright 2026 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Or{constructor(e,t,r,s){this._db=e,this.userDataReader=t,this._userDataWriter=r,this.stages=s}Vr(e,t){const r=this.userDataReader.createContext(3,e);return Pd(t)?t._readUserData(r):Array.isArray(t)?t.forEach((s=>s._readUserData(r))):t.forEach((s=>s._readUserData(r))),t}where(e){const t=this.stages.map((r=>r));return this.Vr("where",e),t.push(new Bi(e,{})),new Or(this._db,this.userDataReader,this._userDataWriter,t)}limit(e){const t=this.stages.map((r=>r));return t.push(new An(e,{})),new Or(this._db,this.userDataReader,this._userDataWriter,t)}sort(e,...t){const r=this.stages.map((s=>s));return"orderings"in e?r.push(new _t(this.Vr("sort",e.orderings),{})):r.push(new _t(this.Vr("sort",[e,...t]),{})),new Or(this._db,this.userDataReader,this._userDataWriter,r)}dr(e){return{pipeline:{stages:this.stages.map((t=>t._toProto(e)))}}}}// Copyright 2024 Google LLC* @license
class ke{constructor(e,t,r){this.serializer=e,this.stages=t,this.listenOptions=r,this.isCorePipeline=!0}getPipelineCollection(){return qi(this)}getPipelineCollectionGroup(){return Na(this)}getPipelineCollectionId(){return Tw(this)}getPipelineDocuments(){return Go(this)}getPipelineFlavor(){return(function(t){let r="exact";return t.stages.forEach(((s,i)=>{s._name!==Dd.name&&s._name!==kd.name||(r="keyless"),s._name===Ew.name&&r==="exact"&&(r="augmented"),s._name===Nd.name&&i<t.stages.length-1&&r==="exact"&&(r="augmented")})),r})(this)}getPipelineSourceType(){return $t(this)}}function $t(n){const e=n.stages[0];return e instanceof Ui||e instanceof Fi||e instanceof Va||e instanceof ba?e._name:"unknown"}function qi(n){if($t(n)==="collection")return n.stages[0].hr}function Na(n){if($t(n)==="collection_group")return n.stages[0].collectionId}function Tw(n){switch($t(n)){case"collection":return X.fromString(qi(n)).lastSegment();case"collection_group":return Na(n);default:return}}function Go(n){if($t(n)==="documents")return n.stages[0].Tr}class w{constructor(e,t){this.type=e,this.value=t}static mr(){return new w("ERROR",void 0)}static pr(){return new w("UNSET",void 0)}static gr(){return new w("NULL",zn)}static newValue(e){return We(e)?new w("NULL",zn):(function(r){return!!r&&"booleanValue"in r})(e)?new w("BOOLEAN",e):ot(e)?new w("INT",e):pn(e)?new w("DOUBLE",e):(function(r){return!!r&&"timestampValue"in r&&!!r.timestampValue})(e)?new w("TIMESTAMP",e):(function(r){return!!r&&"stringValue"in r})(e)?new w("STRING",e):(function(r){return!!r&&"bytesValue"in r})(e)?new w("BYTES",e):e.referenceValue?new w("REFERENCE",e):e.geoPointValue?new w("GEO_POINT",e):Hn(e)?new w("ARRAY",e):ui(e)?new w("VECTOR",e):_n(e)?new w("MAP",e):new w("ERROR",void 0)}yr(){return this.type==="ERROR"||this.type==="UNSET"}wr(){return this.type==="NULL"}}function Lr(n){if(!n.yr())return n.value}function xd(n){return n instanceof Jt?n._expr:n}function q(n){if((n=xd(n))instanceof er)return new Iw(n);if(n instanceof tr)return new vw(n);if(n instanceof Pr)return new Aw(n);if(n instanceof S){if(n.name==="add")return new Sw(n);if(n.name==="subtract")return new Vw(n);if(n.name==="multiply")return new bw(n);if(n.name==="divide")return new Cw(n);if(n.name==="mod")return new Nw(n);if(n.name==="and")return new kw(n);if(n.name==="equal")return new zw(n);if(n.name==="not_equal")return new Ww(n);if(n.name==="less_than")return new Hw(n);if(n.name==="less_than_or_equal")return new Gw(n);if(n.name==="greater_than")return new Kw(n);if(n.name==="greater_than_or_equal")return new Qw(n);if(n.name==="array_concat")return new Yw(n);if(n.name==="array_reverse")return new Jw(n);if(n.name==="array_contains")return new Xw(n);if(n.name==="array_contains_all")return new Zw(n);if(n.name==="array_contains_any")return new eE(n);if(n.name==="array_length")return new tE(n);if(n.name==="array_element")return new nE(n);if(n.name==="equal_any")return new Od(n);if(n.name==="not_equal_any")return new xw(n);if(n.name==="is_nan")return new Ow(n);if(n.name==="is_not_nan")return new Lw(n);if(n.name==="is_null")return new Mw(n);if(n.name==="is_not_null")return new Uw(n);if(n.name==="is_error")return new Fw(n);if(n.name==="exists")return new Bw(n);if(n.name==="not")return new $i(n);if(n.name==="or")return new Dw(n);if(n.name==="xor")return new ka(n);if(n.name==="conditional")return new qw(n);if(n.name==="maximum")return new $w(n);if(n.name==="minimum")return new jw(n);if(n.name==="reverse")return new rE(n);if(n.name==="replace_first")return new sE(n);if(n.name==="replace_all")return new iE(n);if(n.name==="char_length")return new oE(n);if(n.name==="byte_length")return new aE(n);if(n.name==="like")return new cE(n);if(n.name==="regex_contains")return new uE(n);if(n.name==="regex_match")return new lE(n);if(n.name==="string_contains")return new hE(n);if(n.name==="starts_with")return new dE(n);if(n.name==="ends_with")return new fE(n);if(n.name==="to_lower")return new pE(n);if(n.name==="to_upper")return new mE(n);if(n.name==="trim")return new gE(n);if(n.name==="string_concat")return new _E(n);if(n.name==="map_get")return new yE(n);if(n.name==="cosine_distance")return new wE(n);if(n.name==="dot_product")return new EE(n);if(n.name==="euclidean_distance")return new TE(n);if(n.name==="vector_length")return new IE(n);if(n.name==="unix_micros_to_timestamp")return new SE(n);if(n.name==="timestamp_to_unix_micros")return new CE(n);if(n.name==="unix_millis_to_timestamp")return new VE(n);if(n.name==="timestamp_to_unix_millis")return new NE(n);if(n.name==="unix_seconds_to_timestamp")return new bE(n);if(n.name==="timestamp_to_unix_seconds")return new kE(n);if(n.name==="timestamp_add")return new DE(n);if(n.name==="timestamp_subtract")return new xE(n)}throw new Error(`Unknown Expr : ${n}`)}class Iw{constructor(e){this.expr=e}evaluate(e,t){if(this.expr.fieldName===it)return w.newValue({referenceValue:pi(e.serializer,t.key)});if(this.expr.fieldName==="__update_time__")return w.newValue({timestampValue:Js(e.serializer,t.version)});if(this.expr.fieldName==="__create_time__")return w.newValue({timestampValue:Js(e.serializer,t.createTime)});const r=t.data.field(this.expr._fieldPath);return r?Ri(r)?w.newValue((function(i,a){if(i.serverTimestampBehavior==="estimate")return{timestampValue:Js(i.serializer,j.fromTimestamp(jn(a)))};if(i.serverTimestampBehavior==="previous"){const c=ls(a);if(c)return c}return{nullValue:"NULL_VALUE"}})(e,r)):w.newValue(r):w.pr()}}class vw{constructor(e){this.expr=e}evaluate(e,t){return w.newValue(this.expr._getValue())}}class Aw{constructor(e){this.expr=e}evaluate(e,t){const r=this.expr.cr.map((s=>q(s).evaluate(e,t)));return r.some((s=>s.yr()))?w.mr():w.newValue({arrayValue:{values:r.map((s=>s.value))}})}}function Te(n){return pn(n)?Number(n.doubleValue):Number(n.integerValue)}function dt(n){return BigInt(n.integerValue)}const Rw=BigInt("0x7fffffffffffffff"),Pw=-BigInt("0x8000000000000000");class gs{constructor(e){this.expr=e}evaluate(e,t){U(this.expr.params.length>=2,24778);const r=q(this.expr.params[0]).evaluate(e,t),s=q(this.expr.params[1]).evaluate(e,t);let i=this.br(r,s);for(const a of this.expr.params.slice(2)){const c=q(a).evaluate(e,t);i=this.br(i,c)}return i}br(e,t){if(e.yr()||t.yr())return w.mr();if(e.wr()||t.wr())return w.gr();const r=e.value,s=t.value;if(!pn(r)&&!ot(r)||!pn(s)&&!ot(s))return w.mr();if(pn(r)||pn(s)){const i=this.Sr(r,s);return i?w.newValue(i):w.mr()}if(ot(r)&&ot(s)){const i=this.vr(r,s);return i===void 0?w.mr():typeof i=="number"?w.newValue({doubleValue:i}):i<Pw||i>Rw?w.mr():w.newValue({integerValue:`${i}`})}return w.mr()}}function Rt(n,e){return de(n)!==de(e)?"TYPE_MISMATCH":qe(n)||qe(e)?"NOT_EQ":We(n)&&We(e)?"EQ":We(n)||We(e)?"NULL":Hn(n)&&Hn(e)?(function(r,s){var a,c,l;if(((a=r.values)==null?void 0:a.length)!==((c=s.values)==null?void 0:c.length))return"NOT_EQ";let i=!1;for(let d=0;d<(((l=r.values)==null?void 0:l.length)??0);d++){const p=r.values[d],m=s.values[d];switch(Rt(p,m)){case"EQ":break;case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":i=!0;break;default:B(44609,{Dr:p,Cr:m})}}return i?"NULL":"EQ"})(n.arrayValue,e.arrayValue):ui(n)&&ui(e)||_n(n)&&_n(e)?(function(r,s){const i=r.fields||{},a=s.fields||{};if(ai(i)!==ai(a))return"NOT_EQ";let c=!1;for(const l in i)if(i.hasOwnProperty(l)){if(a[l]===void 0)return"NOT_EQ";switch(Rt(i[l],a[l])){case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":c=!0}}return c?"NULL":"EQ"})(n.mapValue,e.mapValue):(function(r,s){return Ye(r,s,{u:!1,i:!0,o:!0})})(n,e)?"EQ":"NOT_EQ"}class Sw extends gs{vr(e,t){return dt(e)+dt(t)}Sr(e,t){return{doubleValue:Te(e)+Te(t)}}}class Vw extends gs{constructor(e){super(e),this.expr=e}vr(e,t){return dt(e)-dt(t)}Sr(e,t){return{doubleValue:Te(e)-Te(t)}}}class bw extends gs{constructor(e){super(e),this.expr=e}vr(e,t){return dt(e)*dt(t)}Sr(e,t){return{doubleValue:Te(e)*Te(t)}}}class Cw extends gs{constructor(e){super(e),this.expr=e}vr(e,t){const r=dt(t);if(r!==BigInt(0))return dt(e)/r}Sr(e,t){const r=Te(t);return r===0?{doubleValue:qr(r)?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY}:{doubleValue:Te(e)/r}}}class Nw extends gs{constructor(e){super(e),this.expr=e}vr(e,t){const r=dt(t);if(r!==BigInt(0))return dt(e)%r}Sr(e,t){const r=Te(t);if(r!==0)return{doubleValue:Te(e)%r}}}class kw{constructor(e){this.expr=e}evaluate(e,t){var i;let r=!1,s=!1;for(const a of this.expr.params){const c=q(a).evaluate(e,t);switch(c.type){case"BOOLEAN":if(!((i=c.value)!=null&&i.booleanValue))return w.newValue(_e);break;case"NULL":s=!0;break;default:r=!0}}return r?w.mr():s?w.gr():w.newValue(Fe)}}class $i{constructor(e){this.expr=e}evaluate(e,t){var s;U(this.expr.params.length===1,9634);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"BOOLEAN":return w.newValue({booleanValue:!((s=r.value)!=null&&s.booleanValue)});case"NULL":return w.gr();default:return w.mr()}}}class Dw{constructor(e){this.expr=e}evaluate(e,t){var i;let r=!1,s=!1;for(const a of this.expr.params){const c=q(a).evaluate(e,t);switch(c.type){case"BOOLEAN":if((i=c.value)!=null&&i.booleanValue)return w.newValue(Fe);break;case"NULL":s=!0;break;default:r=!0}}return r?w.mr():s?w.gr():w.newValue(_e)}}class ka{constructor(e){this.expr=e}evaluate(e,t){var i;let r=!1,s=!1;for(const a of this.expr.params){const c=q(a).evaluate(e,t);switch(c.type){case"BOOLEAN":r=ka.xor(r,!!((i=c.value)!=null&&i.booleanValue));break;case"NULL":s=!0;break;default:return w.mr()}}return s?w.gr():w.newValue({booleanValue:r})}static xor(e,t){return(e||t)&&!(e&&t)}}class Od{constructor(e){this.expr=e}evaluate(e,t){var a,c;U(this.expr.params.length===2,55094);let r=!1;const s=q(this.expr.params[0]).evaluate(e,t);switch(s.type){case"NULL":r=!0;break;case"ERROR":case"UNSET":return w.mr()}const i=q(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":r=!0;break;default:return w.mr()}if(r)return w.gr();for(const l of((c=(a=i.value)==null?void 0:a.arrayValue)==null?void 0:c.values)??[])switch(We(s.value)&&We(l)?"EQ":Rt(s.value,l)){case"EQ":return w.newValue(Fe);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:B(44608,{value:s.value,candidate:l})}return r?w.gr():w.newValue(_e)}}class xw{constructor(e){this.expr=e}evaluate(e,t){return new $i(new S("not",[new S("equal_any",this.expr.params)])).evaluate(e,t)}}class Ow{constructor(e){this.expr=e}evaluate(e,t){U(this.expr.params.length===1,23322);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"INT":return w.newValue(_e);case"DOUBLE":return w.newValue({booleanValue:isNaN(Te(r.value))});case"NULL":return w.gr();default:return w.mr()}}}class Lw{constructor(e){this.expr=e}evaluate(e,t){return U(this.expr.params.length===1,50406),new $i(new S("not",[new S("is_nan",this.expr.params)])).evaluate(e,t)}}class Mw{constructor(e){this.expr=e}evaluate(e,t){switch(U(this.expr.params.length===1,23123),q(this.expr.params[0]).evaluate(e,t).type){case"NULL":return w.newValue(Fe);case"UNSET":case"ERROR":return w.mr();default:return w.newValue(_e)}}}class Uw{constructor(e){this.expr=e}evaluate(e,t){return U(this.expr.params.length===1,23167),new $i(new S("not",[new S("is_null",this.expr.params)])).evaluate(e,t)}}class Fw{constructor(e){this.expr=e}evaluate(e,t){return U(this.expr.params.length===1,5228),q(this.expr.params[0]).evaluate(e,t).type==="ERROR"?w.newValue(Fe):w.newValue(_e)}}class Bw{constructor(e){this.expr=e}evaluate(e,t){switch(U(this.expr.params.length===1,6877),q(this.expr.params[0]).evaluate(e,t).type){case"ERROR":return w.mr();case"UNSET":return w.newValue(_e);default:return w.newValue(Fe)}}}class qw{constructor(e){this.expr=e}evaluate(e,t){var s;U(this.expr.params.length===3,11706);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"BOOLEAN":return(s=r.value)!=null&&s.booleanValue?q(this.expr.params[1]).evaluate(e,t):q(this.expr.params[2]).evaluate(e,t);case"NULL":return q(this.expr.params[2]).evaluate(e,t);default:return w.mr()}}}class $w{constructor(e){this.expr=e}evaluate(e,t){const r=this.expr.params.map((i=>q(i).evaluate(e,t)));let s;for(const i of r)switch(i.type){case"ERROR":case"UNSET":case"NULL":continue;default:s=s===void 0||Be(i.value,s.value)>0?i:s}return s===void 0?w.gr():s}}class jw{constructor(e){this.expr=e}evaluate(e,t){const r=this.expr.params.map((i=>q(i).evaluate(e,t)));let s;for(const i of r)switch(i.type){case"ERROR":case"UNSET":case"NULL":continue;default:s=s===void 0||Be(i.value,s.value)<0?i:s}return s===void 0?w.gr():s}}class nr{constructor(e){this.expr=e}evaluate(e,t){U(this.expr.params.length===2,31033,`${this.expr.name}() function should have exactly 2 params`);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"ERROR":case"UNSET":return w.mr()}const s=q(this.expr.params[1]).evaluate(e,t);switch(s.type){case"ERROR":case"UNSET":return w.mr()}return this.Fr(r,s)}}class zw extends nr{constructor(e){super(e),this.expr=e}Fr(e,t){if(e.wr()&&t.wr())return w.newValue(Fe);if(e.wr()||t.wr()||qe(e.value)||qe(t.value)||de(e.value)!==de(t.value))return w.newValue(_e);switch(Rt(e.value,t.value)){case"EQ":return w.newValue(Fe);case"NOT_EQ":return w.newValue(_e);case"NULL":return w.gr();default:B(44615,{left:e,right:t})}}}class Ww extends nr{constructor(e){super(e),this.expr=e}Fr(e,t){switch(Rt(e.value,t.value)){case"EQ":return w.newValue(_e);case"NOT_EQ":case"TYPE_MISMATCH":return w.newValue(Fe);case"NULL":return w.gr();default:B(44614,{left:e,right:t})}}}class Hw extends nr{constructor(e){super(e),this.expr=e}Fr(e,t){return de(e.value)!==de(t.value)||qe(e.value)||qe(t.value)?w.newValue(_e):w.newValue({booleanValue:Be(e.value,t.value)<0})}}class Gw extends nr{constructor(e){super(e),this.expr=e}Fr(e,t){return de(e.value)!==de(t.value)||qe(e.value)||qe(t.value)?w.newValue(_e):Rt(e.value,t.value)==="EQ"?w.newValue(Fe):w.newValue({booleanValue:Be(e.value,t.value)<0})}}class Kw extends nr{constructor(e){super(e),this.expr=e}Fr(e,t){return de(e.value)!==de(t.value)||qe(e.value)||qe(t.value)?w.newValue(_e):w.newValue({booleanValue:Be(e.value,t.value)>0})}}class Qw extends nr{constructor(e){super(e),this.expr=e}Fr(e,t){return de(e.value)!==de(t.value)||qe(e.value)||qe(t.value)?w.newValue(_e):Rt(e.value,t.value)==="EQ"?w.newValue(Fe):w.newValue({booleanValue:Be(e.value,t.value)>0})}}class Yw{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class Jw{constructor(e){this.expr=e}evaluate(e,t){var s;U(this.expr.params.length===1,216);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return w.gr();case"ARRAY":{const i=((s=r.value.arrayValue)==null?void 0:s.values)??[];return w.newValue({arrayValue:{values:[...i].reverse()}})}default:return w.mr()}}}class Xw{constructor(e){this.expr=e}evaluate(e,t){return U(this.expr.params.length===2,52884),new Od(new S("eq_any",[this.expr.params[1],this.expr.params[0]])).evaluate(e,t)}}class Zw{constructor(e){this.expr=e}evaluate(e,t){var l,d,p,m;U(this.expr.params.length===2,1392);let r=!1;const s=q(this.expr.params[0]).evaluate(e,t);switch(s.type){case"ARRAY":break;case"NULL":r=!0;break;default:return w.mr()}const i=q(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":r=!0;break;default:return w.mr()}if(r)return w.gr();const a=((d=(l=i.value)==null?void 0:l.arrayValue)==null?void 0:d.values)??[],c=((m=(p=s.value)==null?void 0:p.arrayValue)==null?void 0:m.values)??[];for(const E of a){let b=!1;r=!1;for(const N of c){switch(We(E)&&We(N)?"EQ":Rt(E,N)){case"EQ":b=!0;break;case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:B(44613,{value:N,search:E})}if(b)break}if(!b)return w.newValue(_e)}return w.newValue(Fe)}}class eE{constructor(e){this.expr=e}evaluate(e,t){var l,d,p,m;U(this.expr.params.length===2,2680);let r=!1;const s=q(this.expr.params[0]).evaluate(e,t);switch(s.type){case"ARRAY":break;case"NULL":r=!0;break;default:return w.mr()}const i=q(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":r=!0;break;default:return w.mr()}if(r)return w.gr();const a=((d=(l=i.value)==null?void 0:l.arrayValue)==null?void 0:d.values)??[],c=((m=(p=s.value)==null?void 0:p.arrayValue)==null?void 0:m.values)??[];for(const E of c)for(const b of a)switch(We(E)&&We(b)?"EQ":Rt(E,b)){case"EQ":return w.newValue(Fe);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:B(60403,{value:E,search:b})}return r?w.gr():w.newValue(_e)}}class tE{constructor(e){this.expr=e}evaluate(e,t){var s,i,a;U(this.expr.params.length===1,38605);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return w.gr();case"ARRAY":return w.newValue({integerValue:`${((a=(i=(s=r.value)==null?void 0:s.arrayValue)==null?void 0:i.values)==null?void 0:a.length)??0}`});default:return w.mr()}}}class nE{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class rE{constructor(e){this.expr=e}evaluate(e,t){var s,i;U(this.expr.params.length===1,1508);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return w.gr();case"BYTES":{const a=(s=r.value)==null?void 0:s.bytesValue;if(typeof a=="string"){const c=he.fromBase64String(a).toUint8Array();return c.reverse(),w.newValue({bytesValue:he.fromUint8Array(c).toBase64()})}return w.newValue({bytesValue:new Uint8Array(a).reverse()})}case"STRING":{const a=(i=r.value)==null?void 0:i.stringValue,c=new Intl.__PRIVATE_Segmenter(void 0,{granularity:"grapheme"}).segment(a),l=Array.from(c,(d=>d.segment)).reverse();return w.newValue({stringValue:l.join("")})}default:return w.mr()}}}class sE{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class iE{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class oE{constructor(e){this.expr=e}evaluate(e,t){U(this.expr.params.length===1,19400);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return w.gr();case"STRING":{const s=(function(a){let c=0;for(let l=0;l<a.length;l++){const d=a.codePointAt(l);if(d===void 0)return;if(d<=65535)if(d>=55296&&d<=57343)if(d<=56319){const p=a.codePointAt(l+1);p!==void 0&&p>=56320&&p<=57343?(c+=1,l++):c+=1}else c+=1;else c+=1;else{if(!(d<=1114111))return;c+=1,l++}}return c})(r.value.stringValue);return s===void 0?w.mr():w.newValue({integerValue:s})}default:return w.mr()}}}class aE{constructor(e){this.expr=e}evaluate(e,t){var s,i;U(this.expr.params.length===1,8486);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"BYTES":{const a=(s=r.value)==null?void 0:s.bytesValue;return typeof a=="string"?w.newValue({integerValue:he.fromBase64String(a).toUint8Array().length}):w.newValue({integerValue:new Uint8Array(a).length})}case"STRING":{const a=(function(l){let d=0;for(let p=0;p<l.length;p++){const m=l.codePointAt(p);if(m===void 0)return;if(m>=55296&&m<=57343){if(!(m<=56319))return;{const E=l.codePointAt(p+1);if(E===void 0||!(E>=56320&&E<=57343))return;d+=4,p++}}else if(m<=127)d+=1;else if(m<=2047)d+=2;else if(m<=65535)d+=3;else{if(!(m<=1114111))return;d+=4,p++}}return d})((i=r.value)==null?void 0:i.stringValue);return a===void 0?w.mr():w.newValue({integerValue:a})}case"NULL":return w.gr();default:return w.mr()}}}class rr{constructor(e){this.expr=e}evaluate(e,t){var a,c;U(this.expr.params.length===2,39773,`${this.expr.name}() function should have exactly two parameters`);let r=!1;const s=q(this.expr.params[0]).evaluate(e,t);switch(s.type){case"STRING":break;case"NULL":r=!0;break;default:return w.mr()}const i=q(this.expr.params[1]).evaluate(e,t);switch(i.type){case"STRING":break;case"NULL":r=!0;break;default:return w.mr()}return r?w.gr():this.Or((a=s.value)==null?void 0:a.stringValue,(c=i.value)==null?void 0:c.stringValue)}}class cE extends rr{Or(e,t){try{const r=(function(a){let c="";for(let l=0;l<a.length;l++){const d=a.charAt(l);switch(d){case"_":c+=".";break;case"%":c+=".*";break;case"\\":case".":case"*":case"?":case"+":case"^":case"$":case"|":case"(":case")":case"[":case"]":case"{":case"}":c+="\\"+d;break;default:c+=d}}return"^"+c+"$"})(t),s=ea.compile(r);return w.newValue({booleanValue:s.matches(e)})}catch(r){return Xe(`Invalid LIKE pattern converted to regex: ${t}, returning error. Error: ${r}`),w.mr()}}}class uE extends rr{Or(e,t){try{const r=ea.compile(t);return w.newValue({booleanValue:r.test(e)})}catch{return Xe(`Invalid regex pattern found in regex_contains: ${t}, returning error`),w.mr()}}}class lE extends rr{Or(e,t){try{return w.newValue({booleanValue:ea.compile(t).matches(e)})}catch{return Xe(`Invalid regex pattern found in regex_match: ${t}, returning error`),w.mr()}}}class hE extends rr{Or(e,t){return w.newValue({booleanValue:e.includes(t)})}}class dE extends rr{Or(e,t){return w.newValue({booleanValue:e.startsWith(t)})}}class fE extends rr{Or(e,t){return w.newValue({booleanValue:e.endsWith(t)})}}class pE{constructor(e){this.expr=e}evaluate(e,t){var s,i;U(this.expr.params.length===1,29079);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"STRING":return w.newValue({stringValue:(i=(s=r.value)==null?void 0:s.stringValue)==null?void 0:i.toLowerCase()});case"NULL":return w.gr();default:return w.mr()}}}class mE{constructor(e){this.expr=e}evaluate(e,t){var s,i;U(this.expr.params.length===1,60487);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"STRING":return w.newValue({stringValue:(i=(s=r.value)==null?void 0:s.stringValue)==null?void 0:i.toUpperCase()});case"NULL":return w.gr();default:return w.mr()}}}class gE{constructor(e){this.expr=e}evaluate(e,t){var s,i;U(this.expr.params.length===1,28544);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"STRING":return w.newValue({stringValue:(i=(s=r.value)==null?void 0:s.stringValue)==null?void 0:i.trim()});case"NULL":return w.gr();default:return w.mr()}}}class _E{constructor(e){this.expr=e}evaluate(e,t){const r=this.expr.params.map((a=>q(a).evaluate(e,t)));let s="",i=!1;for(const a of r)switch(a.type){case"STRING":s+=a.value.stringValue;break;case"NULL":i=!0;break;default:return w.mr()}return i?w.gr():w.newValue({stringValue:s})}}class yE{constructor(e){this.expr=e}evaluate(e,t){var a,c,l,d;U(this.expr.params.length===2,4483);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"UNSET":return w.pr();case"MAP":break;default:return w.mr()}const s=q(this.expr.params[1]).evaluate(e,t);if(s.type!=="STRING")return w.mr();const i=(d=(c=(a=r.value)==null?void 0:a.mapValue)==null?void 0:c.fields)==null?void 0:d[(l=s.value)==null?void 0:l.stringValue];return i===void 0?w.pr():w.newValue(i)}}class Da{constructor(e){this.expr=e}evaluate(e,t){var d,p;U(this.expr.params.length===2,25231,`${this.expr.name}() function should have exactly 2 params`);let r=!1;const s=q(this.expr.params[0]).evaluate(e,t);switch(s.type){case"VECTOR":break;case"NULL":r=!0;break;default:return w.mr()}const i=q(this.expr.params[1]).evaluate(e,t);switch(i.type){case"VECTOR":break;case"NULL":r=!0;break;default:return w.mr()}if(r)return w.gr();const a=Fo(s.value),c=Fo(i.value);if(a===void 0||c===void 0||((d=a.values)==null?void 0:d.length)!==((p=c.values)==null?void 0:p.length))return w.mr();const l=this.Mr(a,c);return l===void 0||isNaN(l)?w.mr():w.newValue({doubleValue:l})}}class wE extends Da{Mr(e,t){const r=(e==null?void 0:e.values)??[],s=(t==null?void 0:t.values)??[];if(r.length===0)return;let i=0,a=0,c=0;for(let d=0;d<r.length;d++){if(!Gt(r[d])||!Gt(s[d]))return;const p=Te(r[d]),m=Te(s[d]);i+=p*m,a+=p*p,c+=m*m}const l=Math.sqrt(a)*Math.sqrt(c);if(l!==0)return 1-Math.max(-1,Math.min(1,i/l))}}class EE extends Da{Mr(e,t){const r=(e==null?void 0:e.values)??[],s=(t==null?void 0:t.values)??[];if(r.length===0)return 0;let i=0;for(let a=0;a<r.length;a++){if(!Gt(r[a])||!Gt(s[a]))return;i+=Te(r[a])*Te(s[a])}return i}}class TE extends Da{Mr(e,t){const r=(e==null?void 0:e.values)??[],s=(t==null?void 0:t.values)??[];if(r.length===0)return 0;let i=0;for(let a=0;a<r.length;a++){if(!Gt(r[a])||!Gt(s[a]))return;const c=Te(r[a]),l=Te(s[a]);i+=Math.pow(c-l,2)}return Math.sqrt(i)}}class IE{constructor(e){this.expr=e}evaluate(e,t){var s;U(this.expr.params.length===1,39044);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"VECTOR":{const i=Fo(r.value);return w.newValue({integerValue:((s=i==null?void 0:i.values)==null?void 0:s.length)??0})}case"NULL":return w.gr();default:return w.mr()}}}const Xr=BigInt(-62135596800),Zr=BigInt(253402300799),gi=BigInt(1e3),jt=BigInt(1e6),vE=Xr*gi,AE=Zr*gi+BigInt(999),RE=Xr*jt,PE=Zr*jt+BigInt(999999);function xa(n){return n>=RE&&n<=PE}function Ld(n){return n>=Xr&&n<=Zr}function es(n,e){const t=BigInt(n);return!(t<Xr||t>Zr)&&!(e<0||e>=1e9)&&(t!==Xr||e===0)&&!(t===Zr&&e>999999999)}function Md(n,e){return e<0?{seconds:n-1,nanos:e+1e9}:{seconds:n,nanos:e}}function Oa(n){return BigInt(n.seconds)*jt+BigInt(Math.trunc(n.nanoseconds/1e3))}class La{constructor(e){this.expr=e}evaluate(e,t){U(this.expr.params.length===1,49262,`${this.expr.name}() function should have exactly one parameter`);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"INT":return this.toTimestamp(BigInt(r.value.integerValue));case"NULL":return w.gr();default:return w.mr()}}}class SE extends La{toTimestamp(e){if(!xa(e))return w.mr();let t=Number(e/jt),r=Number(e%jt*BigInt(1e3));const s=Md(t,r);return t=s.seconds,r=s.nanos,es(t,r)?w.newValue({timestampValue:{seconds:t,nanos:r}}):w.mr()}}class VE extends La{toTimestamp(e){if(!(function(a){return a>=vE&&a<=AE})(e))return w.mr();let t=Number(e/gi),r=Number(e%gi*BigInt(1e6));const s=Md(t,r);return t=s.seconds,r=s.nanos,es(t,r)?w.newValue({timestampValue:{seconds:t,nanos:r}}):w.mr()}}class bE extends La{toTimestamp(e){if(!Ld(e))return w.mr();const t=Number(e);return w.newValue({timestampValue:{seconds:t,nanos:0}})}}class Ma{constructor(e){this.expr=e}evaluate(e,t){U(this.expr.params.length===1,1265,`${this.expr.name}() function should have exactly one parameter`);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"TIMESTAMP":break;case"NULL":return w.gr();default:return w.mr()}const s=Ta(r.value.timestampValue);return es(s.seconds,s.nanoseconds)?this.Nr(s):w.mr()}}class CE extends Ma{Nr(e){const t=Oa(e);return xa(t)?w.newValue({integerValue:`${t.toString()}`}):w.mr()}}class NE extends Ma{Nr(e){const t=Oa(e),r=t/BigInt(1e3),s=t%BigInt(1e3);return r>BigInt(0)||s===BigInt(0)?w.newValue({integerValue:r.toString()}):w.newValue({integerValue:(r-BigInt(1)).toString()})}}class kE extends Ma{Nr(e){const t=BigInt(e.seconds);return Ld(t)?w.newValue({integerValue:t.toString()}):w.mr()}}class Ud{constructor(e){this.expr=e}evaluate(e,t){U(this.expr.params.length===3,2775,`${this.expr.name}() function should have exactly 3 parameters`);let r=!1;const s=q(this.expr.params[0]).evaluate(e,t);switch(s.type){case"TIMESTAMP":break;case"NULL":r=!0;break;default:return w.mr()}const i=q(this.expr.params[1]).evaluate(e,t);let a;switch(i.type){case"STRING":if(a=(function(J){switch(J){case"microsecond":return"microsecond";case"millisecond":return"millisecond";case"second":return"second";case"minute":return"minute";case"hour":return"hour";case"day":return"day";default:return}})(i.value.stringValue),a===void 0)return w.mr();break;case"NULL":r=!0;break;default:return w.mr()}const c=q(this.expr.params[2]).evaluate(e,t);switch(c.type){case"INT":break;case"NULL":r=!0;break;default:return w.mr()}if(r)return w.gr();const l=BigInt(c.value.integerValue);let d;try{switch(a){case"microsecond":d=l;break;case"millisecond":d=l*BigInt(1e3);break;case"second":d=l*BigInt(1e6);break;case"minute":d=l*BigInt(6e7);break;case"hour":d=l*BigInt(36e8);break;case"day":d=l*BigInt(864e8);break;default:return w.mr()}if(a!=="microsecond"&&l!==BigInt(0)&&d/l!==BigInt(this.Lr(a)))return w.mr()}catch(H){return Xe(`Error during timestamp arithmetic: ${H}`),w.mr()}const p=Ta(s.value.timestampValue);if(!es(p.seconds,p.nanoseconds))return w.mr();const m=Oa(p),E=this.Br(m,d);if(!xa(E))return w.mr();const b=Number(E/jt),N=E%jt,M=Number((N<0?N+jt:N)*BigInt(1e3)),L=N<0?b-1:b;return es(L,M)?w.newValue({timestampValue:{seconds:L,nanos:M}}):w.mr()}Lr(e){switch(e){case"millisecond":return 1e3;case"second":return 1e6;case"minute":return 6e7;case"hour":return 36e8;case"day":return 864e8;default:return 1}}}class DE extends Ud{Br(e,t){return e+t}}class xE extends Ud{Br(e,t){return e-t}}function ts(n){if((n=xd(n))instanceof er)return`fld(${n.fieldName})`;if(n instanceof tr)return`cst(${(function(t){return t===null?"null":typeof t=="number"?t.toString():typeof t=="string"?`"${t}"`:t instanceof ne?`ref(${t.path})`:t instanceof Ue?`vec(${JSON.stringify(t)})`:JSON.stringify(t)})(n.value)})`;if(n instanceof S)return`fn(${n.name},[${n.params.map(ts).join(",")}])`;if(n.expressionType==="ListOfExpressions")return`list([${n.cr.map(ts).join(",")}])`;throw new Error(`Unrecognized expr ${JSON.stringify(n,null,2)}`)}function OE(n){if(n instanceof Nd)return`${n._name}(${qs(n.fields)})`;if(n instanceof kd){let e=`${n._name}(${qs(n.accumulators)})`;return n.groups.size>0&&(e+=`grouping(${qs(n.groups)})`),e}if(n instanceof Dd)return`${n._name}(${qs(n.groups)})`;if(n instanceof Ui)return`${n._name}(${n.hr})`;if(n instanceof Fi)return`${n._name}(${n.collectionId})`;if(n instanceof Va)return`${n._name}()`;if(n instanceof ba)return`${n._name}(${n.Tr.sort()})`;if(n instanceof Bi)return`${n._name}(${ts(n.condition)})`;if(n instanceof An)return`${n._name}(${n.limit})`;if(n instanceof _t)return`${n._name}(${(function(t){return t.map((r=>`${ts(r.expr)}${r.direction}`)).join(",")})(n.orderings)})`;throw new Error(`Unrecognized stage ${n._name}`)}function qs(n){return`${Array.from(n.entries()).sort().map((([e,t])=>`${e}=${ts(t)}`)).join(",")}`}function Et(n){return n.stages.map((e=>OE(e))).join("|")}function Fd(n,e){return Et(n)===Et(e)}function pe(n){return n instanceof ke}function dl(n){return pe(n)?Et(n):kr(n)}function Bd(n){return pe(n)?Et(n):(function(t){return`${Hh(ut(t))}|lt:${t.limitType}`})(n)}function ji(n,e){return n instanceof ke&&e instanceof ke?Fd(n,e):!(n instanceof ke&&!(e instanceof ke)||!(n instanceof ke)&&e instanceof ke)&&ty(n,e)}function qd(n){return fn(n)?Et(n):Hh(n)}function $d(n,e){return n instanceof ke&&e instanceof ke?Fd(n,e):!(n instanceof ke&&!(e instanceof ke)||!(n instanceof ke)&&e instanceof ke)&&Gh(n,e)}function LE(n,e){const t=(function(s){let i=!1;const a=[];for(const c of s)if(c instanceof _t)if(i=!0,c.orderings.some((l=>l.expr instanceof er&&l.expr.fieldName===it)))a.push(c);else{const l=c.orderings.map((d=>d));l.push(Xs(it).ascending()),a.push(new _t(l,{}))}else c instanceof An&&(i||(a.push(new _t([Xs(it).ascending()],{})),i=!0)),a.push(c);return i||a.push(new _t([Xs(it).ascending()],{})),a})(n.stages);if(n.userDataReader){const r=n.userDataReader.createContext(3,"toCorePipeline");t.forEach((s=>s._readUserData(r)))}return new ke(n.userDataReader.serializer,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ME{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&O_(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Cr(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Cr(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Zh();return this.mutations.forEach((s=>{const i=e.get(s.key),a=i.overlayedDocument;let c=this.applyToLocalView(a,i.mutatedFields);c=t.has(s.key)?null:c;const l=Uh(a,c);l!==null&&r.set(s.key,l),a.isValidDocument()||a.convertToNoDocument(j.min())})),r}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),G())}isEqual(e){return this.batchId===e.batchId&&$n(this.mutations,e.mutations,((t,r)=>ju(t,r)))&&$n(this.baseMutations,e.baseMutations,((t,r)=>ju(t,r)))}}class Ua{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){U(e.mutations.length===r.length,58842,{Ur:e.mutations.length,kr:r.length});let s=(function(){return oy})();const i=e.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new Ua(e,t,r,s)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jd="";function UE(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=fl(e)),e=FE(n.get(t),e);return fl(e)}function FE(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case jd:t+="";break;default:t+=i}}return t}function fl(n){return n+jd+""}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BE{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yt{constructor(e,t,r,s,i=j.min(),a=j.min(),c=he.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=l}withSequenceNumber(e){return new yt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new yt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new yt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new yt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qE{constructor(e){this.$r=e}}function $E(n){const e=vy({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?$o(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jE{constructor(){this.Zi=new zE}addToCollectionParentIndex(e,t){return this.Zi.add(t),C.resolve()}getCollectionParents(e,t){return C.resolve(this.Zi.getEntries(t))}addFieldIndex(e,t){return C.resolve()}deleteFieldIndex(e,t){return C.resolve()}deleteAllFieldIndexes(e){return C.resolve()}createTargetIndexes(e,t){return C.resolve()}getDocumentsMatchingTarget(e,t){return C.resolve(null)}getIndexType(e,t){return C.resolve(0)}getFieldIndexes(e,t){return C.resolve([])}getNextCollectionGroupToUpdate(e){return C.resolve(null)}getMinOffset(e,t){return C.resolve(Kt.min())}getMinOffsetFromCollectionGroup(e,t){return C.resolve(Kt.min())}updateCollectionGroup(e,t,r){return C.resolve()}updateIndexEntries(e,t){return C.resolve()}}class zE{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new le(X.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new le(X.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zt{constructor(e){this.ys=e}next(){return this.ys+=2,this.ys}static ws(){return new Zt(0)}static bs(){return new Zt(-1)}}// Copyright 2024 Google LLC* @license
function zd(n,e){var r;let t=e;for(const s of n.stages)t=HE({serializer:n.serializer,serverTimestampBehavior:(r=n.listenOptions)==null?void 0:r.serverTimestampBehavior},s,t);return t}function zi(n,e){return zd(n,[e]).length>0}function WE(n,e){return pe(n)?zi(n,e):ki(n,e)}function HE(n,e,t){if(e instanceof Ui)return(function(s,i,a){return a.filter((c=>c.isFoundDocument()&&`/${c.key.getCollectionPath().canonicalString()}`===i.hr))})(0,e,t);if(e instanceof Bi)return(function(s,i,a){return a.filter((c=>{const l=Lr(q(i.condition).evaluate(s,c));return l!==void 0&&Ye(l,Fe)}))})(n,e,t);if(e instanceof Fi)return(function(s,i,a){return a.filter((c=>c.isFoundDocument()&&c.key.getCollectionPath().lastSegment()===i.collectionId))})(0,e,t);if(e instanceof Va)return(function(s,i,a){return a.filter((c=>c.isFoundDocument()))})(0,0,t);if(e instanceof ba)return(function(s,i,a){return a.filter((c=>c.isFoundDocument()&&i.Pr.has(c.key.path.toStringWithLeadingSlash())))})(0,e,t);if(e instanceof An)return(function(s,i,a){return a.slice(0,i.limit)})(0,e,t);if(e instanceof _t)return(function(s,i,a){const c=i.orderings.map((l=>({Ms:q(l.expr),direction:l.direction})));return[...a].sort(((l,d)=>{for(const{Ms:p,direction:m}of c){const E=Lr(p.evaluate(s,l)),b=Lr(p.evaluate(s,d)),N=Be(E??zn,b??zn);if(N!==0)return m==="ascending"?N:-N}return 0}))})(n,e,t);throw new Error(`Unknown stage: ${e._name}`)}function Ko(n){const e=(function(r){for(let s=r.stages.length-1;s>=0;s--){const i=r.stages[s];if(i instanceof _t)return i.orderings}throw new Error("Pipeline must contain at least one Sort stage")})(n);return(t,r)=>{for(const s of e){const i=Lr(q(s.expr).evaluate({serializer:n.serializer},t)),a=Lr(q(s.expr).evaluate({serializer:n.serializer},r)),c=Be(i||zn,a||zn);if(c!==0)return s.direction==="ascending"?c:-c}return 0}}function So(n){for(let e=n.stages.length-1;e>=0;e--){const t=n.stages[e];if(t instanceof An)return{limit:t.limit}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GE{constructor(){this.changes=new Rn((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Se.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?C.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KE{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QE{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next((s=>(r=s,this.remoteDocumentCache.getEntry(e,t)))).next((s=>(r!==null&&Cr(r.mutation,s,ze.empty(),Z.now()),s)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.getLocalViewOfDocuments(e,r,G()).next((()=>r))))}getLocalViewOfDocuments(e,t,r=G()){const s=Ut();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,r).next((i=>{let a=Dn();return i.forEach(((c,l)=>{a=a.insert(c,l.overlayedDocument)})),a}))))}getOverlayedDocuments(e,t){const r=Ut();return this.populateOverlays(e,r,t).next((()=>this.computeViews(e,t,r,G())))}populateOverlays(e,t,r){const s=[];return r.forEach((i=>{t.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(e,s).next((i=>{i.forEach(((a,c)=>{t.set(a,c)}))}))}computeViews(e,t,r,s){let i=Me();const a=Dr(),c=(function(){return Dr()})();return t.forEach(((l,d)=>{const p=r.get(d.key);s.has(d.key)&&(p===void 0||p.mutation instanceof rn)?i=i.insert(d.key,d):p!==void 0?(a.set(d.key,p.mutation.getFieldMask()),Cr(p.mutation,d,p.mutation.getFieldMask(),Z.now())):a.set(d.key,ze.empty())})),this.recalculateAndSaveOverlays(e,i).next((l=>(l.forEach(((d,p)=>a.set(d,p))),t.forEach(((d,p)=>c.set(d,new KE(p,a.get(d)??null)))),c)))}recalculateAndSaveOverlays(e,t){const r=Dr();let s=new re(((a,c)=>a-c)),i=G();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((a=>{for(const c of a)c.keys().forEach((l=>{const d=t.get(l);if(d===null)return;let p=r.get(l)||ze.empty();p=c.applyToLocalView(d,p),r.set(l,p);const m=(s.get(c.batchId)||G()).add(l);s=s.insert(c.batchId,m)}))})).next((()=>{const a=[],c=s.getReverseIterator();for(;c.hasNext();){const l=c.getNext(),d=l.key,p=l.value,m=Zh();p.forEach((E=>{if(!i.has(E)){const b=Uh(t.get(E),r.get(E));b!==null&&m.set(E,b),i=i.add(E)}})),a.push(this.documentOverlayCache.saveOverlays(e,d,m))}return C.waitFor(a)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.recalculateAndSaveOverlays(e,r)))}getDocumentsMatchingQuery(e,t,r,s){return pe(t)?this.getDocumentsMatchingPipeline(e,t,r,s):X_(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Qh(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next((i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):C.resolve(Ut());let c=Qr,l=i;return a.next((d=>C.forEach(d,((p,m)=>(c<m.largestBatchId&&(c=m.largestBatchId),i.get(p)?C.resolve():this.remoteDocumentCache.getEntry(e,p).next((E=>{l=l.insert(p,E)}))))).next((()=>this.populateOverlays(e,d,i))).next((()=>this.computeViews(e,l,d,G()))).next((p=>({batchId:c,changes:Xh(p)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new F(t)).next((r=>{let s=Dn();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let a=Dn();return this.indexManager.getCollectionParents(e,i).next((c=>C.forEach(c,(l=>{const d=(function(m,E){return new Jn(E,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)})(t,l.child(i));return this.getDocumentsMatchingCollectionQuery(e,d,r,s).next((p=>{p.forEach(((m,E)=>{a=a.insert(m,E)}))}))})).next((()=>a))))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next((a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s)))).next((a=>this.retrieveMatchingLocalDocuments(i,a,(c=>ki(t,c)))))}getDocumentsMatchingPipeline(e,t,r,s){if($t(t)==="collection_group"){const i=Na(t);let a=Dn();return this.indexManager.getCollectionParents(e,i).next((c=>C.forEach(c,(l=>{const d=(function(m,E){const b=m.stages.map((N=>N instanceof Fi?new Ui(E.canonicalString(),{}):N));return new ke(m.serializer,b)})(t,l.child(i));return this.getDocumentsMatchingPipeline(e,d,r,s).next((p=>{p.forEach(((m,E)=>{a=a.insert(m,E)}))}))})).next((()=>a))))}{let i;return this.getOverlaysForPipeline(e,t,r.largestBatchId).next((a=>{switch(i=a,$t(t)){case"collection":return this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s);case"documents":let c=G();for(const l of Go(t))c=c.add(F.fromPath(l));return this.remoteDocumentCache.getEntries(e,c);case"database":return this.remoteDocumentCache.getAllEntries(e);default:throw new D("invalid-argument",`Invalid pipeline source to execute offline: ${Et(t)}`)}})).next((a=>this.retrieveMatchingLocalDocuments(i,a,(c=>zi(t,c)))))}}retrieveMatchingLocalDocuments(e,t,r){e.forEach(((i,a)=>{const c=a.getKey();t.get(c)===null&&(t=t.insert(c,Se.newInvalidDocument(c)))}));let s=Dn();return t.forEach(((i,a)=>{const c=e.get(i);c!==void 0&&Cr(c.mutation,a,ze.empty(),Z.now()),r(a)&&(s=s.insert(i,a))})),s}getOverlaysForPipeline(e,t,r){switch($t(t)){case"collection":return this.documentOverlayCache.getOverlaysForCollection(e,X.fromString(qi(t)),r);case"collection_group":throw new D("invalid-argument",`Unexpected collection group pipeline: ${Et(t)}`);case"documents":return this.documentOverlayCache.getOverlays(e,Go(t).map((s=>F.fromPath(s))));case"database":return this.documentOverlayCache.getAllOverlays(e,r);default:throw new D("invalid-argument",`Failed to get overlays for pipeline: ${Et(t)}`)}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YE{constructor(e){this.serializer=e,this.Qs=new Map,this.Ws=new Map}getBundleMetadata(e,t){return C.resolve(this.Qs.get(t))}saveBundleMetadata(e,t){return this.Qs.set(t.id,(function(s){return{id:s.id,version:s.version,createTime:lt(s.createTime)}})(t)),C.resolve()}getNamedQuery(e,t){return C.resolve(this.Ws.get(t))}saveNamedQuery(e,t){return this.Ws.set(t.name,(function(s){return{name:s.name,query:$E(s.bundledQuery),readTime:lt(s.readTime)}})(t)),C.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JE{constructor(){this.overlays=new re(F.comparator),this.Gs=new Map}getOverlay(e,t){return C.resolve(this.overlays.get(t))}getOverlays(e,t){const r=Ut();return C.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&r.set(s,i)})))).next((()=>r))}getAllOverlays(e,t){const r=Ut();return this.overlays.forEach(((s,i)=>{i.largestBatchId>t&&r.set(s,i)})),C.resolve(r)}saveOverlays(e,t,r){return r.forEach(((s,i)=>{this.Zr(e,t,i)})),C.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Gs.get(r);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.Gs.delete(r)),C.resolve()}getOverlaysForCollection(e,t,r){const s=Ut(),i=t.length+1,a=new F(t.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const l=c.getNext().value,d=l.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===i&&l.largestBatchId>r&&s.set(l.getKey(),l)}return C.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new re(((d,p)=>d-p));const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>r){let p=i.get(d.largestBatchId);p===null&&(p=Ut(),i=i.insert(d.largestBatchId,p)),p.set(d.getKey(),d)}}const c=Ut(),l=i.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach(((d,p)=>c.set(d,p))),!(c.size()>=s)););return C.resolve(c)}Zr(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.Gs.get(s.largestBatchId).delete(r.key);this.Gs.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new BE(t,r));let i=this.Gs.get(t);i===void 0&&(i=G(),this.Gs.set(t,i)),this.Gs.set(t,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XE{constructor(){this.sessionToken=he.EMPTY_BYTE_STRING}getSessionToken(e){return C.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,C.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fa{constructor(){this.zs=new le(ge.js),this.Hs=new le(ge.Js)}isEmpty(){return this.zs.isEmpty()}addReference(e,t){const r=new ge(e,t);this.zs=this.zs.add(r),this.Hs=this.Hs.add(r)}Ys(e,t){e.forEach((r=>this.addReference(r,t)))}removeReference(e,t){this.Zs(new ge(e,t))}Xs(e,t){e.forEach((r=>this.removeReference(r,t)))}e_(e){const t=new F(new X([])),r=new ge(t,e),s=new ge(t,e+1),i=[];return this.Hs.forEachInRange([r,s],(a=>{this.Zs(a),i.push(a.key)})),i}t_(){this.zs.forEach((e=>this.Zs(e)))}Zs(e){this.zs=this.zs.delete(e),this.Hs=this.Hs.delete(e)}n_(e){const t=new F(new X([])),r=new ge(t,e),s=new ge(t,e+1);let i=G();return this.Hs.forEachInRange([r,s],(a=>{i=i.add(a.key)})),i}containsKey(e){const t=new ge(e,0),r=this.zs.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class ge{constructor(e,t){this.key=e,this.r_=t}static js(e,t){return F.comparator(e.key,t.key)||K(e.r_,t.r_)}static Js(e,t){return K(e.r_,t.r_)||F.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZE{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Gr=1,this.i_=new le(ge.js)}checkEmpty(e){return C.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.Gr;this.Gr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new ME(i,t,r,s);this.mutationQueue.push(a);for(const c of s)this.i_=this.i_.add(new ge(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return C.resolve(a)}lookupMutationBatch(e,t){return C.resolve(this.s_(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.__(r),i=s<0?0:s;return C.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return C.resolve(this.mutationQueue.length===0?ma:this.Gr-1)}getAllMutationBatches(e){return C.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new ge(t,0),s=new ge(t,Number.POSITIVE_INFINITY),i=[];return this.i_.forEachInRange([r,s],(a=>{const c=this.s_(a.r_);i.push(c)})),C.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new le(K);return t.forEach((s=>{const i=new ge(s,0),a=new ge(s,Number.POSITIVE_INFINITY);this.i_.forEachInRange([i,a],(c=>{r=r.add(c.r_)}))})),C.resolve(this.o_(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;F.isDocumentKey(i)||(i=i.child(""));const a=new ge(new F(i),0);let c=new le(K);return this.i_.forEachWhile((l=>{const d=l.key.path;return!!r.isPrefixOf(d)&&(d.length===s&&(c=c.add(l.r_)),!0)}),a),C.resolve(this.o_(c))}o_(e){const t=[];return e.forEach((r=>{const s=this.s_(r);s!==null&&t.push(s)})),t}removeMutationBatch(e,t){U(this.a_(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.i_;return C.forEach(t.mutations,(s=>{const i=new ge(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.i_=r}))}Hr(e){}containsKey(e,t){const r=new ge(t,0),s=this.i_.firstAfterOrEqual(r);return C.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,C.resolve()}a_(e,t){return this.__(e)}__(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}s_(e){const t=this.__(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eT{constructor(e){this.u_=e,this.docs=(function(){return new re(F.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,a=this.u_(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return C.resolve(r?r.document.mutableCopy():Se.newInvalidDocument(t))}getEntries(e,t){let r=Me();return t.forEach((s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Se.newInvalidDocument(s))})),C.resolve(r)}getAllEntries(e){let t=Me();return this.docs.forEach(((r,s)=>{t=t.insert(r,s.document)})),C.resolve(t)}getDocumentsMatchingQuery(e,t,r,s){let i,a;pe(t)?(i=X.fromString(qi(t)),a=p=>zi(t,p)):(i=t.path,a=p=>ki(t,p));let c=Me();const l=new F(i.child("__id-9223372036854775808__")),d=this.docs.getIteratorFrom(l);for(;d.hasNext();){const{key:p,value:{document:m}}=d.getNext();if(!i.isPrefixOf(p.path))break;p.path.length>i.length+1||Q_(K_(m),r)<=0||(s.has(m.key)||a(m))&&(c=c.insert(m.key,m.mutableCopy()))}return C.resolve(c)}getAllFromCollectionGroup(e,t,r,s){B(9500)}c_(e,t){return C.forEach(this.docs,(r=>t(r)))}newChangeBuffer(e){return new tT(this)}getSize(e){return C.resolve(this.size)}}class tT extends GE{constructor(e){super(),this.$s=e}applyChanges(e){const t=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?t.push(this.$s.addEntry(e,s)):this.$s.removeEntry(r)})),C.waitFor(t)}getFromCache(e,t){return this.$s.getEntry(e,t)}getAllFromCache(e,t){return this.$s.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nT{constructor(e){this.persistence=e,this.l_=new Rn((t=>qd(t)),$d),this.lastRemoteSnapshotVersion=j.min(),this.highestTargetId=0,this.E_=0,this.h_=new Fa,this.targetCount=0,this.T_=Zt.ws()}forEachTarget(e,t){return this.l_.forEach(((r,s)=>t(s))),C.resolve()}getLastRemoteSnapshotVersion(e){return C.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return C.resolve(this.E_)}allocateTargetId(e){return this.highestTargetId=this.T_.next(),C.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.E_&&(this.E_=t),C.resolve()}Ds(e){this.l_.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.T_=new Zt(t),this.highestTargetId=t),e.sequenceNumber>this.E_&&(this.E_=e.sequenceNumber)}addTargetData(e,t){return this.Ds(t),this.targetCount+=1,C.resolve()}updateTargetData(e,t){return this.Ds(t),C.resolve()}removeTargetData(e,t){return this.l_.delete(t.target),this.h_.e_(t.targetId),this.targetCount-=1,C.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.l_.forEach(((a,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.l_.delete(a),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)})),C.waitFor(i).next((()=>s))}getTargetCount(e){return C.resolve(this.targetCount)}getTargetData(e,t){const r=this.l_.get(t)||null;return C.resolve(r)}addMatchingKeys(e,t,r){return this.h_.Ys(t,r),C.resolve()}removeMatchingKeys(e,t,r){this.h_.Xs(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach((a=>{i.push(s.markPotentiallyOrphaned(e,a))})),C.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.h_.e_(t),C.resolve()}getMatchingKeysForTargetId(e,t){const r=this.h_.n_(t);return C.resolve(r)}containsKey(e,t){return C.resolve(this.h_.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wd{constructor(e,t){this.P_={},this.overlays={},this.I_=new Oi(0),this.R_=!1,this.R_=!0,this.A_=new XE,this.referenceDelegate=e(this),this.V_=new nT(this),this.indexManager=new jE,this.remoteDocumentCache=(function(s){return new eT(s)})((r=>this.referenceDelegate.d_(r))),this.serializer=new qE(t),this.f_=new YE(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.R_=!1,Promise.resolve()}get started(){return this.R_}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new JE,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.P_[e.toKey()];return r||(r=new ZE(t,this.referenceDelegate),this.P_[e.toKey()]=r),r}getGlobalsCache(){return this.A_}getTargetCache(){return this.V_}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.f_}runTransaction(e,t,r){O("MemoryPersistence","Starting transaction:",e);const s=new rT(this.I_.next());return this.referenceDelegate.m_(),r(s).next((i=>this.referenceDelegate.p_(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}g_(e,t){return C.or(Object.values(this.P_).map((r=>()=>r.containsKey(e,t))))}}class rT extends Yy{constructor(e){super(),this.currentSequenceNumber=e}}class Ba{constructor(e){this.persistence=e,this.y_=new Fa,this.w_=null}static b_(e){return new Ba(e)}get S_(){if(this.w_)return this.w_;throw B(60996)}addReference(e,t,r){return this.y_.addReference(r,t),this.S_.delete(r.toString()),C.resolve()}removeReference(e,t,r){return this.y_.removeReference(r,t),this.S_.add(r.toString()),C.resolve()}markPotentiallyOrphaned(e,t){return this.S_.add(t.toString()),C.resolve()}removeTarget(e,t){this.y_.e_(t.targetId).forEach((s=>this.S_.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next((s=>{s.forEach((i=>this.S_.add(i.toString())))})).next((()=>r.removeTargetData(e,t)))}m_(){this.w_=new Set}p_(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return C.forEach(this.S_,(r=>{const s=F.fromPath(r);return this.v_(e,s).next((i=>{i||t.removeEntry(s,j.min())}))})).next((()=>(this.w_=null,t.apply(e))))}updateLimboDocument(e,t){return this.v_(e,t).next((r=>{r?this.S_.delete(t.toString()):this.S_.add(t.toString())}))}d_(e){return 0}v_(e,t){return C.or([()=>C.resolve(this.y_.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.g_(e,t)])}}class _i{constructor(e,t){this.persistence=e,this.D_=new Rn((r=>UE(r.path)),((r,s)=>r.isEqual(s))),this.garbageCollector=nw(this,t)}static b_(e,t){return new _i(e,t)}m_(){}p_(e){return C.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}ir(e){const t=this.Cs(e);return this.persistence.getTargetCache().getTargetCount(e).next((r=>t.next((s=>r+s))))}Cs(e){let t=0;return this.sr(e,(r=>{t++})).next((()=>t))}sr(e,t){return C.forEach(this.D_,((r,s)=>this.Os(e,r,s).next((i=>i?C.resolve():t(s)))))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.c_(e,(a=>this.Os(e,a,t).next((c=>{c||(r++,i.removeEntry(a,j.min()))})))).next((()=>i.apply(e))).next((()=>r))}markPotentiallyOrphaned(e,t){return this.D_.set(t,e.currentSequenceNumber),C.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.D_.set(r,e.currentSequenceNumber),C.resolve()}removeReference(e,t,r){return this.D_.set(r,e.currentSequenceNumber),C.resolve()}updateLimboDocument(e,t){return this.D_.set(t,e.currentSequenceNumber),C.resolve()}d_(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Ks(e.data.value)),t}Os(e,t,r){return C.or([()=>this.persistence.g_(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.D_.get(t);return C.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qa{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Vo=r,this.fo=s}static mo(e,t){let r=G(),s=G();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new qa(e,t.fromCache,r,s)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sT(n,e){return F.comparator(n.key,e.key)}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iT{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oT{constructor(){this.po=!1,this.yo=!1,this.wo=100,this.bo=(function(){return hp()?8:Jy(Ve())>0?6:4})()}initialize(e,t){this.So=e,this.indexManager=t,this.po=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.vo(e,t).next((a=>{i.result=a})).next((()=>{if(!i.result)return this.Do(e,t,s,r).next((a=>{i.result=a}))})).next((()=>{if(i.result)return;const a=new iT;return this.xo(e,t,a).next((c=>{if(i.result=c,this.yo)return this.Co(e,t,a,c.size)}))})).next((()=>i.result))}Co(e,t,r,s){return pe(t)?C.resolve():r.documentReadCount<this.wo?(Nn()<=Q.DEBUG&&O("QueryEngine","SDK will not create cache indexes for query:",kr(t),"since it only creates cache indexes for collection contains","more than or equal to",this.wo,"documents"),C.resolve()):(Nn()<=Q.DEBUG&&O("QueryEngine","Query:",kr(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.bo*s?(Nn()<=Q.DEBUG&&O("QueryEngine","The SDK decides to create cache indexes for query:",kr(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,ut(t))):C.resolve())}vo(e,t){if(pe(t))return C.resolve(null);let r=t;if(Qu(r))return C.resolve(null);let s=ut(r);return this.indexManager.getIndexType(e,s).next((i=>i===0?null:(r.limit!==null&&i===1&&(r=$o(r,null,"F"),s=ut(r)),this.indexManager.getDocumentsMatchingTarget(e,s).next((a=>{const c=G(...a);return this.So.getDocuments(e,c).next((l=>this.indexManager.getMinOffset(e,s).next((d=>{const p=this.Fo(r,l);return this.Oo(r,p,c,d.readTime)?this.vo(e,$o(r,null,"F")):this.Mo(e,p,r,d)}))))})))))}Do(e,t,r,s){return(pe(t)?(function(a){for(const c of a.stages){if(c instanceof An||c instanceof hl)return!1;if(c instanceof Bi){if(c.condition instanceof Vd&&c.condition._expr.name==="exists"&&c.condition._expr.params[0]instanceof er&&c.condition._expr.params[0].fieldName===it)continue;return!1}}return!0})(t):Qu(t))||s.isEqual(j.min())?C.resolve(null):this.So.getDocuments(e,r).next((i=>{const a=this.Fo(t,i);return this.Oo(t,a,r,s)?C.resolve(null):(Nn()<=Q.DEBUG&&O("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),dl(t)),this.Mo(e,a,t,G_(s,Qr)).next((c=>c)))}))}Fo(e,t){let r,s;return pe(e)?(r=new le(sT),s=i=>zi(e,i)):(r=new le(wa(e)),s=i=>ki(e,i)),t.forEach(((i,a)=>{s(a)&&(r=r.add(a))})),r}Oo(e,t,r,s){if(pe(e))return(function(c){return c.stages.some((l=>l instanceof An||l instanceof hl))})(e);if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}xo(e,t,r){return Nn()<=Q.DEBUG&&O("QueryEngine","Using full collection scan to execute query:",dl(t)),this.So.getDocumentsMatchingQuery(e,t,Kt.min(),r)}Mo(e,t,r,s){return this.So.getDocumentsMatchingQuery(e,r,s).next((i=>(t.forEach((a=>{i=i.insert(a.key,a)})),i)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $a="LocalStore",aT=3e8;class cT{constructor(e,t,r,s){this.persistence=e,this.No=t,this.serializer=s,this.Lo=new re(K),this.Bo=new Rn((i=>qd(i)),$d),this.Uo=new Map,this.ko=e.getRemoteDocumentCache(),this.V_=e.getTargetCache(),this.f_=e.getBundleCache(),this.qo(r)}qo(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new QE(this.ko,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.ko.setIndexManager(this.indexManager),this.No.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.Lo)))}}function uT(n,e,t,r){return new cT(n,e,t,r)}async function Hd(n,e){const t=z(n);return await t.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next((i=>(s=i,t.qo(e),t.mutationQueue.getAllMutationBatches(r)))).next((i=>{const a=[],c=[];let l=G();for(const d of s){a.push(d.batchId);for(const p of d.mutations)l=l.add(p.key)}for(const d of i){c.push(d.batchId);for(const p of d.mutations)l=l.add(p.key)}return t.localDocuments.getDocuments(r,l).next((d=>({$o:d,removedBatchIds:a,addedBatchIds:c})))}))}))}function lT(n,e){const t=z(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const s=e.batch.keys(),i=t.ko.newChangeBuffer({trackRemovals:!0});return(function(c,l,d,p){const m=d.batch,E=m.keys();let b=C.resolve();return E.forEach((N=>{b=b.next((()=>p.getEntry(l,N))).next((M=>{const L=d.docVersions.get(N);U(L!==null,48541),M.version.compareTo(L)<0&&(m.applyToRemoteDocument(M,d),M.isValidDocument()&&(M.setReadTime(d.commitVersion),p.addEntry(M)))}))})),b.next((()=>c.mutationQueue.removeMutationBatch(l,m)))})(t,r,e,i).next((()=>i.apply(r))).next((()=>t.mutationQueue.performConsistencyCheck(r))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(c){let l=G();for(let d=0;d<c.mutationResults.length;++d)c.mutationResults[d].transformResults.length>0&&(l=l.add(c.batch.mutations[d].key));return l})(e)))).next((()=>t.localDocuments.getDocuments(r,s)))}))}function Gd(n){const e=z(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.V_.getLastRemoteSnapshotVersion(t)))}function hT(n,e){const t=z(n),r=e.snapshotVersion;let s=t.Lo;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const a=t.ko.newChangeBuffer({trackRemovals:!0});s=t.Lo;const c=[];e.targetChanges.forEach(((p,m)=>{const E=s.get(m);if(!E)return;c.push(t.V_.removeMatchingKeys(i,p.removedDocuments,m).next((()=>t.V_.addMatchingKeys(i,p.addedDocuments,m))));let b=E.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(m)!==null?b=b.withResumeToken(he.EMPTY_BYTE_STRING,j.min()).withLastLimboFreeSnapshotVersion(j.min()):p.resumeToken.approximateByteSize()>0&&(b=b.withResumeToken(p.resumeToken,r)),s=s.insert(m,b),(function(M,L,H){return M.resumeToken.approximateByteSize()===0||L.snapshotVersion.toMicroseconds()-M.snapshotVersion.toMicroseconds()>=aT?!0:H.addedDocuments.size+H.modifiedDocuments.size+H.removedDocuments.size>0})(E,b,p)&&c.push(t.V_.updateTargetData(i,b))}));let l=Me(),d=G();if(e.documentUpdates.forEach((p=>{e.resolvedLimboDocuments.has(p)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,p))})),c.push(dT(i,a,e.documentUpdates).next((p=>{l=p.Ko,d=p.Qo}))),!r.isEqual(j.min())){const p=t.V_.getLastRemoteSnapshotVersion(i).next((m=>t.V_.setTargetsMetadata(i,i.currentSequenceNumber,r)));c.push(p)}return C.waitFor(c).next((()=>a.apply(i))).next((()=>t.localDocuments.getLocalViewOfDocuments(i,l,d))).next((()=>l))})).then((i=>(t.Lo=s,i)))}function dT(n,e,t){let r=G(),s=G();return t.forEach((i=>r=r.add(i))),e.getEntries(n,r).next((i=>{let a=Me();return t.forEach(((c,l)=>{const d=i.get(c);l.isFoundDocument()!==d.isFoundDocument()&&(s=s.add(c)),l.isNoDocument()&&l.version.isEqual(j.min())?(e.removeEntry(c,l.readTime),a=a.insert(c,l)):!d.isValidDocument()||l.version.compareTo(d.version)>0||l.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(l),a=a.insert(c,l)):O($a,"Ignoring outdated watch update for ",c,". Current version:",d.version," Watch version:",l.version)})),{Ko:a,Qo:s}}))}function fT(n,e){const t=z(n);return t.persistence.runTransaction("Get next mutation batch","readonly",(r=>(e===void 0&&(e=ma),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e))))}function pT(n,e){const t=z(n);return t.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return t.V_.getTargetData(r,e).next((i=>i?(s=i,C.resolve(s)):t.V_.allocateTargetId(r).next((a=>(s=new yt(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.V_.addTargetData(r,s).next((()=>s)))))))})).then((r=>{const s=t.Lo.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Lo=t.Lo.insert(r.targetId,r),t.Bo.set(e,r.targetId)),r}))}async function Qo(n,e,t){const r=z(n),s=r.Lo.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,(a=>r.persistence.referenceDelegate.removeTarget(a,s)))}catch(a){if(!Zn(a))throw a;O($a,`Failed to update sequence numbers for target ${e}: ${a}`)}r.Lo=r.Lo.remove(e),r.Bo.delete(s.target)}function pl(n,e,t){const r=z(n);let s=j.min(),i=G();return r.persistence.runTransaction("Execute query","readwrite",(a=>(function(l,d,p){const m=z(l),E=m.Bo.get(p);return E!==void 0?C.resolve(m.Lo.get(E)):m.V_.getTargetData(d,p)})(r,a,pe(e)?e:ut(e)).next((c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.V_.getMatchingKeysForTargetId(a,c.targetId).next((l=>{i=l}))})).next((()=>r.No.getDocumentsMatchingQuery(a,e,t?s:j.min(),t?i:G()))).next((c=>(mT(r,c),{documents:c,Wo:i})))))}function mT(n,e){e.forEach(((t,r)=>{const s=r.key.getCollectionGroup(),i=n.Uo.get(s)||j.min();r.readTime.compareTo(i)>0&&n.Uo.set(s,r.readTime)}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gT{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.Yo=0,this.Zo=null,this.Xo=!0}ea(){this.Yo===0&&(this.ta("Unknown"),this.Zo=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.Zo=null,this.na("Backend didn't respond within 10 seconds."),this.ta("Offline"),Promise.resolve()))))}ra(e){this.state==="Online"?this.ta("Unknown"):(this.Yo++,this.Yo>=1&&(this.ia(),this.na(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ta("Offline")))}set(e){this.ia(),this.Yo=0,e==="Online"&&(this.Xo=!1),this.ta(e)}ta(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}na(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.Xo?(At(t),this.Xo=!1):O("OnlineStateTracker",t)}ia(){this.Zo!==null&&(this.Zo.cancel(),this.Zo=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ft="RemoteStore";class _T{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.sa=[],this._a=new Map,this.oa=new Map,this.aa=new Map,this.ua=new Zt(1e3),this.ca=new Zt(1001),this.la=new Set,this.Ea=[],this.ha=i,this.ha.Qe((a=>{r.enqueueAndForget((async()=>{Sn(this)&&(O(ft,"Restarting streams for network reachability change."),await(async function(l){const d=z(l);d.la.add(4),await _s(d),d.Ta.set("Unknown"),d.la.delete(4),await Wi(d)})(this))}))})),this.Ta=new gT(r,s)}}async function Wi(n){if(Sn(n))for(const e of n.Ea)await e(!0)}async function _s(n){for(const e of n.Ea)await e(!1)}function Yo(n,e){return n.oa.get(e)||void 0}function Kd(n,e){const t=z(n),r=Yo(t,e.targetId);if(r!==void 0&&t._a.has(r))return;const s=(function(c,l){const d=Yo(c,l);d!==void 0&&c.aa.delete(d);const p=(function(E,b){return b%2!=0?E.ca.next():E.ua.next()})(c,l);return c.oa.set(l,p),c.aa.set(p,l),p})(t,e.targetId);O(ft,"remoteStoreListen mapping SDK target ID to remote",e.targetId,s);const i=new yt(e.target,s,e.purpose,e.sequenceNumber,e.snapshotVersion,e.lastLimboFreeSnapshotVersion,e.resumeToken);t._a.set(s,i),Ha(t)?Wa(t):sr(t).Yt()&&za(t,i)}function ja(n,e){const t=z(n),r=sr(t),s=Yo(t,e);O(ft,"remoteStoreUnlisten removing mapping of SDK target ID to remote",e,s),t._a.delete(s),t.oa.delete(e),t.aa.delete(s),r.Yt()&&Qd(t,s),t._a.size===0&&(r.Yt()?r.en():Sn(t)&&t.Ta.set("Unknown"))}function za(n,e){if(n.Pa.J(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(j.min())>0){const t=n.aa.get(e.targetId);if(t===void 0)return void O(ft,"SDK target ID not found for remote ID: "+e.targetId);const r=n.remoteSyncer.getRemoteKeysForTarget(t).size;e=e.withExpectedCount(r)}sr(n).Pn(e)}function Qd(n,e){n.Pa.J(e),sr(n).In(e)}function Wa(n){n.Pa=new dy({getRemoteKeysForTarget:e=>{const t=n.aa.get(e);return t!==void 0?n.remoteSyncer.getRemoteKeysForTarget(t):G()},ye:e=>n._a.get(e)||null,Ve:()=>n.datastore.serializer.databaseId}),sr(n).start(),n.Ta.ea()}function Ha(n){return Sn(n)&&!sr(n).Jt()&&n._a.size>0}function Sn(n){return z(n).la.size===0}function Yd(n){n.Pa=void 0}async function yT(n){n.Ta.set("Online")}async function wT(n){n._a.forEach(((e,t)=>{za(n,e)}))}async function ET(n,e){Yd(n),Ha(n)?(n.Ta.ra(e),Wa(n)):n.Ta.set("Unknown")}async function TT(n,e,t){if(n.Ta.set("Online"),e instanceof td&&e.state===2&&e.cause)try{await(async function(s,i){const a=i.cause;for(const c of i.targetIds){if(s._a.has(c)){const l=s.aa.get(c);l!==void 0&&(await s.remoteSyncer.rejectListen(l,a),s.oa.delete(l),s.aa.delete(c)),s._a.delete(c)}s.Pa.removeTarget(c)}})(n,e)}catch(r){O(ft,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await yi(n,r)}else if(e instanceof Ys?n.Pa._e(e):e instanceof ed?n.Pa.he(e):n.Pa.ue(e),!t.isEqual(j.min()))try{const r=await Gd(n.localStore);t.compareTo(r)>=0&&await(function(i,a){const c=i.Pa.fe(a);c.targetChanges.forEach(((d,p)=>{if(d.resumeToken.approximateByteSize()>0){const m=i._a.get(p);m&&i._a.set(p,m.withResumeToken(d.resumeToken,a))}})),c.targetMismatches.forEach(((d,p)=>{const m=i._a.get(d);if(!m)return;i._a.set(d,m.withResumeToken(he.EMPTY_BYTE_STRING,m.snapshotVersion)),Qd(i,d);const E=new yt(m.target,d,p,m.sequenceNumber);za(i,E)}));const l=(function(p,m){const E=new Map;m.targetChanges.forEach(((N,M)=>{const L=p.aa.get(M);L!==void 0&&E.set(L,N)}));let b=new re(K);return m.targetMismatches.forEach(((N,M)=>{const L=p.aa.get(N);L!==void 0&&(b=b.insert(L,M))})),new ds(m.snapshotVersion,E,b,m.documentUpdates,m.augmentedDocumentUpdates,m.resolvedLimboDocuments)})(i,c);return i.remoteSyncer.applyRemoteEvent(l)})(n,t)}catch(r){O(ft,"Failed to raise snapshot:",r),await yi(n,r)}}async function yi(n,e,t){if(!Zn(e))throw e;n.la.add(1),await _s(n),n.Ta.set("Offline"),t||(t=()=>Gd(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{O(ft,"Retrying IndexedDB access"),await t(),n.la.delete(1),await Wi(n)}))}function Jd(n,e){return e().catch((t=>yi(n,t,e)))}async function Hi(n){const e=z(n),t=en(e);let r=e.sa.length>0?e.sa[e.sa.length-1].batchId:ma;for(;IT(e);)try{const s=await fT(e.localStore,r);if(s===null){e.sa.length===0&&t.en();break}r=s.batchId,vT(e,s)}catch(s){await yi(e,s)}Xd(e)&&Zd(e)}function IT(n){return Sn(n)&&n.sa.length<10}function vT(n,e){n.sa.push(e);const t=en(n);t.Yt()&&t.Rn&&t.An(e.mutations)}function Xd(n){return Sn(n)&&!en(n).Jt()&&n.sa.length>0}function Zd(n){en(n).start()}async function AT(n){en(n).fn()}async function RT(n){const e=en(n);for(const t of n.sa)e.An(t.mutations)}async function PT(n,e,t){const r=n.sa.shift(),s=Ua.from(r,e,t);await Jd(n,(()=>n.remoteSyncer.applySuccessfulWrite(s))),await Hi(n)}async function ST(n,e){e&&en(n).Rn&&await(async function(r,s){if((function(a){return sy(a)&&a!==V.ABORTED})(s.code)){const i=r.sa.shift();en(r).Xt(),await Jd(r,(()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s))),await Hi(r)}})(n,e),Xd(n)&&Zd(n)}async function ml(n,e){const t=z(n);t.asyncQueue.verifyOperationInProgress(),O(ft,"RemoteStore received new credentials");const r=Sn(t);t.la.add(3),await _s(t),r&&t.Ta.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.la.delete(3),await Wi(t)}async function VT(n,e){const t=z(n);e?(t.la.delete(2),await Wi(t)):e||(t.la.add(2),await _s(t),t.Ta.set("Unknown"))}function sr(n){return n.Ia||(n.Ia=(function(t,r,s){const i=z(t);return i.pn(),new $y(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{ct:yT.bind(null,n),Et:wT.bind(null,n),Tt:ET.bind(null,n),Tn:TT.bind(null,n)}),n.Ea.push((async e=>{e?(n.Ia.Xt(),Ha(n)?Wa(n):n.Ta.set("Unknown")):(await n.Ia.stop(),Yd(n))}))),n.Ia}function en(n){return n.Ra||(n.Ra=(function(t,r,s){const i=z(t);return i.pn(),new jy(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{ct:()=>Promise.resolve(),Et:AT.bind(null,n),Tt:ST.bind(null,n),Vn:RT.bind(null,n),dn:PT.bind(null,n)}),n.Ea.push((async e=>{e?(n.Ra.Xt(),await Hi(n)):(await n.Ra.stop(),n.sa.length>0&&(O(ft,`Stopping write stream with ${n.sa.length} pending writes`),n.sa=[]))}))),n.Ra}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ga{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Aa(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Aa(this.observer.error,e):At("Uncaught Error in snapshot listener:",e.toString()))}Va(){this.muted=!0}Aa(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ka{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new wt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((a=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const a=Date.now()+r,c=new Ka(e,t,a,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new D(V.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Qa(n,e){if(At("AsyncQueue",`${e}: ${n}`),Zn(n))return new D(V.UNAVAILABLE,`${e}: ${n}`);throw n}class gl{constructor(){this.activeTargetIds=uy()}Ba(e){this.activeTargetIds=this.activeTargetIds.add(e)}Ua(e){this.activeTargetIds=this.activeTargetIds.delete(e)}La(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class bT{constructor(){this.fu=new gl,this.mu={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.fu.Ba(e),this.mu[e]||"not-current"}updateQueryState(e,t,r){this.mu[e]=t}removeLocalQueryTarget(e){this.fu.Ua(e)}isLocalQueryTarget(e){return this.fu.activeTargetIds.has(e)}clearQueryState(e){delete this.mu[e]}getAllActiveQueryTargets(){return this.fu.activeTargetIds}isActiveQueryTarget(e){return this.fu.activeTargetIds.has(e)}start(){return this.fu=new gl,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}function Vo(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yn{static emptySet(e){return new yn(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||F.comparator(t.key,r.key):(t,r)=>F.comparator(t.key,r.key),this.keyedMap=Dn(),this.sortedSet=new re(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,r)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof yn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new yn;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _l{constructor(){this.pu=new re(F.comparator)}track(e){const t=e.doc.key,r=this.pu.get(t);r?e.type!==0&&r.type===3?this.pu=this.pu.insert(t,e):e.type===3&&r.type!==1?this.pu=this.pu.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.pu=this.pu.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.pu=this.pu.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.pu=this.pu.remove(t):e.type===1&&r.type===2?this.pu=this.pu.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.pu=this.pu.insert(t,{type:2,doc:e.doc}):B(63341,{we:e,gu:r}):this.pu=this.pu.insert(t,e)}yu(){const e=[];return this.pu.inorderTraversal(((t,r)=>{e.push(r)})),e}}class Gn{constructor(e,t,r,s,i,a,c,l,d){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=l,this.hasCachedResults=d}static fromInitialDocuments(e,t,r,s,i){const a=[];return t.forEach((c=>{a.push({type:0,doc:c})})),new Gn(e,t,yn.emptySet(t),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&ji(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CT{constructor(){this.wu=void 0,this.bu=[]}Su(){return this.bu.some((e=>e.vu()))}}class NT{constructor(){this.queries=yl(),this.onlineState="Unknown",this.Du=new Set}terminate(){(function(t,r){const s=z(t),i=s.queries;s.queries=yl(),i.forEach(((a,c)=>{for(const l of c.bu)l.onError(r)}))})(this,new D(V.ABORTED,"Firestore shutting down"))}}function yl(){return new Rn((n=>Bd(n)),ji)}async function Ya(n,e){const t=z(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.Su()&&e.vu()&&(r=2):(i=new CT,r=e.vu()?0:1);try{switch(r){case 0:i.wu=await t.onListen(s,!0);break;case 1:i.wu=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const c=Qa(a,`Initialization of query '${pe(e.query)?Et(e.query):kr(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.bu.push(e),e.xu(t.onlineState),i.wu&&e.Cu(i.wu)&&Xa(t)}async function Ja(n,e){const t=z(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const a=i.bu.indexOf(e);a>=0&&(i.bu.splice(a,1),i.bu.length===0?s=e.vu()?0:1:!i.Su()&&e.vu()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function kT(n,e){const t=z(n);let r=!1;for(const s of e){const i=s.query,a=t.queries.get(i);if(a){for(const c of a.bu)c.Cu(s)&&(r=!0);a.wu=s}}r&&Xa(t)}function DT(n,e,t){const r=z(n),s=r.queries.get(e);if(s)for(const i of s.bu)i.onError(t);r.queries.delete(e)}function Xa(n){n.Du.forEach((e=>{e.next()}))}var Jo;(function(n){n.Default="default",n.Cache="cache"})(Jo||(Jo={}));class Za{constructor(e,t,r){this.query=e,this.Fu=t,this.Ou=!1,this.Mu=null,this.onlineState="Unknown",this.options=r||{}}Cu(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new Gn(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Ou?this.Nu(e)&&(this.Fu.next(e),t=!0):this.Lu(e,this.onlineState)&&(this.Bu(e),t=!0),this.Mu=e,t}onError(e){this.Fu.error(e)}xu(e){this.onlineState=e;let t=!1;return this.Mu&&!this.Ou&&this.Lu(this.Mu,e)&&(this.Bu(this.Mu),t=!0),t}Lu(e,t){if(!e.fromCache||!this.vu())return!0;const r=t!=="Offline";return(!this.options.waitForSyncWhenOnline||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Nu(e){if(e.docChanges.length>0)return!0;const t=this.Mu&&this.Mu.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}Bu(e){e=Gn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Ou=!0,this.Fu.next(e)}vu(){return this.options.source!==Jo.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ef{constructor(e){this.key=e}}class tf{constructor(e){this.key=e}}class xT{constructor(e,t){this.query=e,this.zu=t,this.ju=null,this.hasCachedResults=!1,this.current=!1,this.Hu=G(),this.mutatedKeys=G(),this.Ju=pe(e)?Ko(e):wa(e),this.Yu=new yn(this.Ju)}get Zu(){return this.zu}Xu(e,t){const r=t?t.ec:new _l,s=t?t.Yu:this.Yu;let i=t?t.mutatedKeys:this.mutatedKeys,a=s,c=!1;const[l,d]=this.tc(this.query,s);e.inorderTraversal(((m,E)=>{const b=s.get(m),N=WE(this.query,E)?E:null,M=!!b&&this.mutatedKeys.has(b.key),L=!!N&&(N.hasLocalMutations||this.mutatedKeys.has(N.key)&&N.hasCommittedMutations);let H=!1;b&&N?b.data.isEqual(N.data)?M!==L&&(r.track({type:3,doc:N}),H=!0):this.nc(b,N)||(r.track({type:2,doc:N}),H=!0,(l&&this.Ju(N,l)>0||d&&this.Ju(N,d)<0)&&(c=!0)):!b&&N?(r.track({type:0,doc:N}),H=!0):b&&!N&&(r.track({type:1,doc:b}),H=!0,(l||d)&&(c=!0)),H&&(N?(a=a.add(N),i=L?i.add(m):i.delete(m)):(a=a.delete(m),i=i.delete(m)))}));const p=this.rc(this.query);if(p)if(pe(this.query)){const m=[];a.forEach((N=>m.push(N)));const E=zd(this.query,m);let b=new yn(Ko(this.query));for(const N of E)b=b.add(N);a.forEach((N=>{b.has(N.key)||(i=i.delete(N.key),r.track({type:1,doc:N}))})),a=b}else{const m=this.sc(this.query);for(;a.size>p;){const E=m==="F"?a.last():a.first();a=a.delete(E.key),i=i.delete(E.key),r.track({type:1,doc:E})}}return{Yu:a,ec:r,Oo:c,mutatedKeys:i}}rc(e){var t;return pe(e)?(t=So(e))==null?void 0:t.limit:e.limit||void 0}sc(e){if(pe(e)){const t=So(e);return t&&t.limit<0?"L":"F"}return e.limitType}tc(e,t){var r;if(pe(e)){const s=(r=So(e))==null?void 0:r.limit;return[t.size===s?t.last():null,null]}return[e.limitType==="F"&&t.size===this.rc(this.query)?t.last():null,e.limitType==="L"&&t.size===this.rc(this.query)?t.first():null]}nc(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.Yu;this.Yu=e.Yu,this.mutatedKeys=e.mutatedKeys;const a=e.ec.yu();a.sort(((p,m)=>(function(b,N){const M=L=>{switch(L){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return B(20277,{we:L})}};return M(b)-M(N)})(p.type,m.type)||this.Ju(p.doc,m.doc))),this._c(r),s=s??!1;const c=t&&!s?this.oc():[],l=this.Hu.size===0&&this.current&&!s?1:0,d=l!==this.ju;return this.ju=l,a.length!==0||d?{snapshot:new Gn(this.query,e.Yu,i,a,e.mutatedKeys,l===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),ac:c}:{ac:c}}xu(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Yu:this.Yu,ec:new _l,mutatedKeys:this.mutatedKeys,Oo:!1},!1)):{ac:[]}}uc(e){return!this.zu.has(e)&&!!this.Yu.has(e)&&!this.Yu.get(e).hasLocalMutations}_c(e){e&&(e.addedDocuments.forEach((t=>this.zu=this.zu.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.zu=this.zu.delete(t))),this.current=e.current)}oc(){if(!this.current)return[];const e=this.Hu;this.Hu=G(),this.Yu.forEach((r=>{this.uc(r.key)&&(this.Hu=this.Hu.add(r.key))}));const t=[];return e.forEach((r=>{this.Hu.has(r)||t.push(new tf(r))})),this.Hu.forEach((r=>{e.has(r)||t.push(new ef(r))})),t}cc(e){this.zu=e.Wo,this.Hu=G();const t=this.Xu(e.documents);return this.applyChanges(t,!0)}lc(){return Gn.fromInitialDocuments(this.query,this.Yu,this.mutatedKeys,this.ju===0,this.hasCachedResults)}}const ec="SyncEngine";class OT{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class LT{constructor(e){this.key=e,this.Ec=!1}}class MT{constructor(e,t,r,s,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.hc={},this.Tc=new Rn((c=>Bd(c)),ji),this.Pc=new Map,this.Ic=new Set,this.Rc=new re(F.comparator),this.Ac=new Map,this.Vc=new Fa,this.dc={},this.fc=new Map,this.mc=Zt.bs(),this.onlineState="Unknown",this.gc=void 0}get isPrimaryClient(){return this.gc===!0}}async function UT(n,e,t=!0){const r=cf(n);let s;const i=r.Tc.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lc()):s=await nf(r,e,t,!0),s}async function FT(n,e){const t=cf(n);await nf(t,e,!0,!1)}async function nf(n,e,t,r){const s=await pT(n.localStore,pe(e)?e:ut(e)),i=s.targetId,a=n.sharedClientState.addLocalQueryTarget(i,t);let c;return r&&(c=await BT(n,e,i,a==="current",s.resumeToken)),n.isPrimaryClient&&t&&Kd(n.remoteStore,s),c}async function BT(n,e,t,r,s){n.yc=(m,E,b)=>(async function(M,L,H,J){let ie=L.view.Xu(H);ie.Oo&&(ie=await pl(M.localStore,L.query,!1).then((({documents:I})=>L.view.Xu(I,ie))));const Ke=J&&J.targetChanges.get(L.targetId),Ie=J&&J.targetMismatches.get(L.targetId)!=null,ve=L.view.applyChanges(ie,M.isPrimaryClient,Ke,Ie);return El(M,L.targetId,ve.ac),ve.snapshot})(n,m,E,b);const i=await pl(n.localStore,e,!0),a=new xT(e,i.Wo),c=a.Xu(i.documents),l=fs.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),d=a.applyChanges(c,n.isPrimaryClient,l);El(n,t,d.ac);const p=new OT(e,t,a);return n.Tc.set(e,p),n.Pc.has(t)?n.Pc.get(t).push(e):n.Pc.set(t,[e]),d.snapshot}async function qT(n,e,t){const r=z(n),s=r.Tc.get(e),i=r.Pc.get(s.targetId);if(i.length>1)return r.Pc.set(s.targetId,i.filter((a=>!ji(a,e)))),void r.Tc.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Qo(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),t&&ja(r.remoteStore,s.targetId),Xo(r,s.targetId)})).catch(Xn)):(Xo(r,s.targetId),await Qo(r.localStore,s.targetId,!0))}async function $T(n,e){const t=z(n),r=t.Tc.get(e),s=t.Pc.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),ja(t.remoteStore,r.targetId))}async function jT(n,e,t){const r=YT(n);try{const s=await(function(a,c){const l=z(a),d=Z.now(),p=c.reduce(((b,N)=>b.add(N.key)),G());let m,E;return l.persistence.runTransaction("Locally write mutations","readwrite",(b=>{let N=Me(),M=G();return l.ko.getEntries(b,p).next((L=>{N=L,N.forEach(((H,J)=>{J.isValidDocument()||(M=M.add(H))}))})).next((()=>l.localDocuments.getOverlayedDocuments(b,N))).next((L=>{m=L;const H=[];for(const J of c){const ie=L_(J,m.get(J.key).overlayedDocument);ie!=null&&H.push(new rn(J.key,ie,Dh(ie.value.mapValue),xe.exists(!0)))}return l.mutationQueue.addMutationBatch(b,d,H,c)})).next((L=>{E=L;const H=L.applyToLocalDocumentSet(m,M);return l.documentOverlayCache.saveOverlays(b,L.batchId,H)}))})).then((()=>({batchId:E.batchId,changes:Xh(m)})))})(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),(function(a,c,l){let d=a.dc[a.currentUser.toKey()];d||(d=new re(K)),d=d.insert(c,l),a.dc[a.currentUser.toKey()]=d})(r,s.batchId,t),await ys(r,s.changes),await Hi(r.remoteStore)}catch(s){const i=Qa(s,"Failed to persist write");t.reject(i)}}async function rf(n,e){const t=z(n);try{const r=await hT(t.localStore,e);e.targetChanges.forEach(((s,i)=>{const a=t.Ac.get(i);a&&(U(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.Ec=!0:s.modifiedDocuments.size>0?U(a.Ec,14607):s.removedDocuments.size>0&&(U(a.Ec,42227),a.Ec=!1))})),await ys(t,r,e)}catch(r){await Xn(r)}}function wl(n,e,t){const r=z(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Tc.forEach(((i,a)=>{const c=a.view.xu(e);c.snapshot&&s.push(c.snapshot)})),(function(a,c){const l=z(a);l.onlineState=c;let d=!1;l.queries.forEach(((p,m)=>{for(const E of m.bu)E.xu(c)&&(d=!0)})),d&&Xa(l)})(r.eventManager,e),s.length&&r.hc.Tn(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function zT(n,e,t){const r=z(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Ac.get(e),i=s&&s.key;if(i){let a=new re(F.comparator);a=a.insert(i,Se.newNoDocument(i,j.min()));const c=G().add(i),l=new ds(j.min(),new Map,new re(K),a,Me(),c);await rf(r,l),r.Rc=r.Rc.remove(i),r.Ac.delete(e),tc(r)}else await Qo(r.localStore,e,!1).then((()=>Xo(r,e,t))).catch(Xn)}async function WT(n,e){const t=z(n),r=e.batch.batchId;try{const s=await lT(t.localStore,e);of(t,r,null),sf(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await ys(t,s)}catch(s){await Xn(s)}}async function HT(n,e,t){const r=z(n);try{const s=await(function(a,c){const l=z(a);return l.persistence.runTransaction("Reject batch","readwrite-primary",(d=>{let p;return l.mutationQueue.lookupMutationBatch(d,c).next((m=>(U(m!==null,37113),p=m.keys(),l.mutationQueue.removeMutationBatch(d,m)))).next((()=>l.mutationQueue.performConsistencyCheck(d))).next((()=>l.documentOverlayCache.removeOverlaysForBatchId(d,p,c))).next((()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,p))).next((()=>l.localDocuments.getDocuments(d,p)))}))})(r.localStore,e);of(r,e,t),sf(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await ys(r,s)}catch(s){await Xn(s)}}function sf(n,e){(n.fc.get(e)||[]).forEach((t=>{t.resolve()})),n.fc.delete(e)}function of(n,e,t){const r=z(n);let s=r.dc[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.dc[r.currentUser.toKey()]=s}}function Xo(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Pc.get(e))n.Tc.delete(r),t&&n.hc.wc(r,t);n.Pc.delete(e),n.isPrimaryClient&&n.Vc.e_(e).forEach((r=>{n.Vc.containsKey(r)||af(n,r)}))}function af(n,e){n.Ic.delete(e.path.canonicalString());const t=n.Rc.get(e);t!==null&&(ja(n.remoteStore,t),n.Rc=n.Rc.remove(e),n.Ac.delete(t),tc(n))}function El(n,e,t){for(const r of t)r instanceof ef?(n.Vc.addReference(r.key,e),GT(n,r)):r instanceof tf?(O(ec,"Document no longer in limbo: "+r.key),n.Vc.removeReference(r.key,e),n.Vc.containsKey(r.key)||af(n,r.key)):B(19791,{bc:r})}function GT(n,e){const t=e.key,r=t.path.canonicalString();n.Rc.get(t)||n.Ic.has(r)||(O(ec,"New document in limbo: "+t),n.Ic.add(r),tc(n))}function tc(n){for(;n.Ic.size>0&&n.Rc.size<n.maxConcurrentLimboResolutions;){const e=n.Ic.values().next().value;n.Ic.delete(e);const t=new F(X.fromString(e)),r=n.mc.next();n.Ac.set(r,new LT(t)),n.Rc=n.Rc.insert(t,r),Kd(n.remoteStore,new yt(ut(Ni(t.path)),r,"TargetPurposeLimboResolution",Oi.wn))}}async function ys(n,e,t){const r=z(n),s=[],i=[],a=[];r.Tc.isEmpty()||(r.Tc.forEach(((c,l)=>{a.push(r.yc(l,e,t).then((d=>{var p;if((d||t)&&r.isPrimaryClient){const m=d?!d.fromCache:(p=t==null?void 0:t.targetChanges.get(l.targetId))==null?void 0:p.current;r.sharedClientState.updateQueryState(l.targetId,m?"current":"not-current")}if(d){s.push(d);const m=qa.mo(l.targetId,d);i.push(m)}})))})),await Promise.all(a),r.hc.Tn(s),await(async function(l,d){const p=z(l);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",(m=>C.forEach(d,(E=>C.forEach(E.Vo,(b=>p.persistence.referenceDelegate.addReference(m,E.targetId,b))).next((()=>C.forEach(E.fo,(b=>p.persistence.referenceDelegate.removeReference(m,E.targetId,b)))))))))}catch(m){if(!Zn(m))throw m;O($a,"Failed to update sequence numbers: "+m)}for(const m of d){const E=m.targetId;if(!m.fromCache){const b=p.Lo.get(E),N=b.snapshotVersion,M=b.withLastLimboFreeSnapshotVersion(N);p.Lo=p.Lo.insert(E,M)}}})(r.localStore,i))}async function KT(n,e){const t=z(n);if(!t.currentUser.isEqual(e)){O(ec,"User change. New user:",e.toKey());const r=await Hd(t.localStore,e);t.currentUser=e,(function(i,a){i.fc.forEach((c=>{c.forEach((l=>{l.reject(new D(V.CANCELLED,a))}))})),i.fc.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await ys(t,r.$o)}}function QT(n,e){const t=z(n),r=t.Ac.get(e);if(r&&r.Ec)return G().add(r.key);{let s=G();const i=t.Pc.get(e);if(!i)return s;for(const a of i??[]){const c=t.Tc.get(a);s=s.unionWith(c.view.Zu)}return s}}function cf(n){const e=z(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=rf.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=QT.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=zT.bind(null,e),e.hc.Tn=kT.bind(null,e.eventManager),e.hc.wc=DT.bind(null,e.eventManager),e}function YT(n){const e=z(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=WT.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=HT.bind(null,e),e}class wi{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Di(e.databaseInfo.databaseId),this.sharedClientState=this.vc(e),this.persistence=this.Dc(e),await this.persistence.start(),this.localStore=this.xc(e),this.gcScheduler=this.Cc(e,this.localStore),this.indexBackfillerScheduler=this.Fc(e,this.localStore)}Cc(e,t){return null}Fc(e,t){return null}xc(e){return uT(this.persistence,new oT,e.initialUser,this.serializer)}Dc(e){return new Wd(Ba.b_,this.serializer)}vc(e){return new bT}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}wi.provider={build:()=>new wi};class JT extends wi{constructor(e){super(),this.cacheSizeBytes=e}Cc(e,t){U(this.persistence.referenceDelegate instanceof _i,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new ew(r,e.asyncQueue,t)}Dc(e){const t=this.cacheSizeBytes!==void 0?Le.withCacheSize(this.cacheSizeBytes):Le.DEFAULT;return new Wd((r=>_i.b_(r,t)),this.serializer)}}class Zo{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>wl(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=KT.bind(null,this.syncEngine),await VT(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new NT})()}createDatastore(e){const t=Di(e.databaseInfo.databaseId),r=qy(e.databaseInfo);return Hy(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return(function(r,s,i,a,c){return new _T(r,s,i,a,c)})(this.localStore,this.datastore,e.asyncQueue,(t=>wl(this.syncEngine,t,0)),(function(){return rl.Ye()?new rl:new My})())}createSyncEngine(e,t){return(function(s,i,a,c,l,d,p){const m=new MT(s,i,a,c,l,d);return p&&(m.gc=!0),m})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await(async function(s){const i=z(s);O(ft,"RemoteStore shutting down."),i.la.add(5),await _s(i),i.ha.shutdown(),i.Ta.set("Unknown")})(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}Zo.provider={build:()=>new Zo};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tn="FirestoreClient";class XT{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this._databaseInfo=s,this.user=Pe.UNAUTHENTICATED,this.clientId=pa.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,(async a=>{O(tn,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a})),this.appCheckCredentials.start(r,(a=>(O(tn,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new wt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Qa(t,"Failed to shutdown persistence");e.reject(r)}})),e.promise}}async function bo(n,e){n.asyncQueue.verifyOperationInProgress(),O(tn,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener((async s=>{r.isEqual(s)||(await Hd(e.localStore,s),r=s)})),e.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=e}async function Tl(n,e){n.asyncQueue.verifyOperationInProgress();const t=await ZT(n);O(tn,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener((r=>ml(e.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,s)=>ml(e.remoteStore,s))),n._onlineComponents=e}async function ZT(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){O(tn,"Using user provided OfflineComponentProvider");try{await bo(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(s){return s.name==="FirebaseError"?s.code===V.FAILED_PRECONDITION||s.code===V.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(t))throw t;Xe("Error using user provided cache. Falling back to memory cache: "+t),await bo(n,new wi)}}else O(tn,"Using default OfflineComponentProvider"),await bo(n,new JT(void 0));return n._offlineComponents}async function uf(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(O(tn,"Using user provided OnlineComponentProvider"),await Tl(n,n._uninitializedComponentsProvider._online)):(O(tn,"Using default OnlineComponentProvider"),await Tl(n,new Zo))),n._onlineComponents}function eI(n){return uf(n).then((e=>e.syncEngine))}async function Ei(n){const e=await uf(n),t=e.eventManager;return t.onListen=UT.bind(null,e.syncEngine),t.onUnlisten=qT.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=FT.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=$T.bind(null,e.syncEngine),t}function tI(n,e,t,r){const s=new Ga(r),i=new Za(e,s,t);return n.asyncQueue.enqueueAndForget((async()=>Ya(await Ei(n),i))),()=>{s.Va(),n.asyncQueue.enqueueAndForget((async()=>Ja(await Ei(n),i)))}}function lf(n,e,t={}){const r=new wt;return n.asyncQueue.enqueueAndForget((async()=>(function(i,a,c,l,d){const p=new Ga({next:E=>{p.Va(),a.enqueueAndForget((()=>Ja(i,m)));const b=E.docs.has(c);!b&&E.fromCache?d.reject(new D(V.UNAVAILABLE,"Failed to get document because the client is offline.")):b&&E.fromCache&&l&&l.source==="server"?d.reject(new D(V.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(E)},error:E=>d.reject(E)}),m=new Za(Ni(c.path),p,{includeMetadataChanges:!0,waitForSyncWhenOnline:!0});return Ya(i,m)})(await Ei(n),n.asyncQueue,e,t,r))),r.promise}function nI(n,e,t={}){const r=new wt;return n.asyncQueue.enqueueAndForget((async()=>(function(i,a,c,l,d){const p=new Ga({next:E=>{p.Va(),a.enqueueAndForget((()=>Ja(i,m))),E.fromCache&&l.source==="server"?d.reject(new D(V.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(E)},error:E=>d.reject(E)}),m=new Za(c instanceof Or?LE(c):c,p,{includeMetadataChanges:!0,waitForSyncWhenOnline:!0});return Ya(i,m)})(await Ei(n),n.asyncQueue,e,t,r))),r.promise}function rI(n,e){const t=new wt;return n.asyncQueue.enqueueAndForget((async()=>jT(await eI(n),e,t))),t.promise}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let hf=class{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new ne(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new sI(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const t=this._document.data.field(Yt("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}},sI=class extends hf{data(){return super.data()}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iI{convertValue(e,t="none"){switch(de(e)){case 0:return null;case 1:return e.booleanValue;case 2:return se(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Ht(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw B(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return nn(e,((s,i)=>{r[s]=this.convertValue(i,t)})),r}convertVectorValue(e){var r,s,i;const t=(i=(s=(r=e.fields)==null?void 0:r[$r].arrayValue)==null?void 0:s.values)==null?void 0:i.map((a=>se(a.doubleValue)));return new Ue(t)}convertGeoPoint(e){return new ht(se(e.latitude),se(e.longitude))}convertArray(e,t){return(e.values||[]).map((r=>this.convertValue(r,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const r=ls(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(jn(e));default:return null}}convertTimestamp(e){const t=Wt(e);return new Z(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=X.fromString(e);U(cd(r),9688,{name:e});const s=new Br(r.get(1),r.get(3)),i=new F(r.popFirst(5));return s.isEqual(t)||At(`A document reference to ${i} refers to a different database (${s.projectId}/${s.database}), which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nc(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Il="AsyncQueue";class vl{constructor(e=Promise.resolve()){this.$c=[],this.Kc=!1,this.Qc=[],this.Wc=null,this.Gc=!1,this.zc=!1,this.jc=[],this.Ht=new fd(this,"async_queue_retry"),this.Hc=()=>{const r=Vo();r&&O(Il,"Visibility state changed to "+r.visibilityState),this.Ht.$t()},this.Jc=e;const t=Vo();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Hc)}get isShuttingDown(){return this.Kc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Yc(),this.Zc(e)}enterRestrictedMode(e){if(!this.Kc){this.Kc=!0,this.zc=e||!1;const t=Vo();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Hc)}}enqueue(e){if(this.Yc(),this.Kc)return new Promise((()=>{}));const t=new wt;return this.Zc((()=>this.Kc&&this.zc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.$c.push(e),this.Xc())))}async Xc(){if(this.$c.length!==0){try{await this.$c[0](),this.$c.shift(),this.Ht.reset()}catch(e){if(!Zn(e))throw e;O(Il,"Operation failed with retryable error: "+e)}this.$c.length>0&&this.Ht.kt((()=>this.Xc()))}}Zc(e){const t=this.Jc.then((()=>(this.Gc=!0,e().catch((r=>{throw this.Wc=r,this.Gc=!1,At("INTERNAL UNHANDLED ERROR: ",Al(r)),r})).then((r=>(this.Gc=!1,r))))));return this.Jc=t,t}enqueueAfterDelay(e,t,r){this.Yc(),this.jc.indexOf(e)>-1&&(t=0);const s=Ka.createAndSchedule(this,e,t,r,(i=>this.el(i)));return this.Qc.push(s),s}Yc(){this.Wc&&B(47125,{tl:Al(this.Wc)})}verifyOperationInProgress(){}async nl(){let e;do e=this.Jc,await e;while(e!==this.Jc)}rl(e){for(const t of this.Qc)if(t.timerId===e)return!0;return!1}il(e){return this.nl().then((()=>{this.Qc.sort(((t,r)=>t.targetTimeMs-r.targetTimeMs));for(const t of this.Qc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.nl()}))}sl(e){this.jc.push(e)}el(e){const t=this.Qc.indexOf(e);this.Qc.splice(t,1)}}function Al(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class et extends Li{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new vl,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new vl(e),this._firestoreClient=void 0,await e}}}function wI(n,e){const t=typeof n=="object"?n:Ml(),r=typeof n=="string"?n:e||ci,s=na(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=np("firestore");i&&rw(s,...i)}return s}function ir(n){if(n._terminated)throw new D(V.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||oI(n),n._firestoreClient}function oI(n){var r,s,i,a;const e=n._freezeSettings(),t=Ky(n._databaseId,((r=n._app)==null?void 0:r.options.appId)||"",n._persistenceKey,(s=n._app)==null?void 0:s.options.apiKey,e);n._componentsProvider||(i=e.localCache)!=null&&i._offlineComponentProvider&&((a=e.localCache)!=null&&a._onlineComponentProvider)&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new XT(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&(function(l){const d=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(d),_online:d}})(n._componentsProvider))}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rc extends iI{constructor(e){super(),this.firestore=e}convertBytes(e){return new Qe(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new ne(this.firestore,null,t)}}class Sr{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class wn extends hf{constructor(e,t,r,s,i,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Zs(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Yt("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new D(V.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=wn._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}wn._jsonSchemaVersion="firestore/documentSnapshot/1.0",wn._jsonSchema={type:ue("string",wn._jsonSchemaVersion),bundleSource:ue("string","DocumentSnapshot"),bundleName:ue("string"),bundle:ue("string")};class Zs extends wn{data(e={}){return super.data(e)}}class En{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Sr(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((r=>{e.call(t,new Zs(this._firestore,this._userDataWriter,r.key,r,new Sr(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new D(V.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map((c=>{pe(s._snapshot.query)?Ko(s._snapshot.query):wa(s.query._query);const l=new Zs(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Sr(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:l,oldIndex:-1,newIndex:a++}}))}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((c=>i||c.type!==3)).map((c=>{const l=new Zs(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Sr(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let d=-1,p=-1;return c.type!==0&&(d=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),p=a.indexOf(c.doc.key)),{type:aI(c.type),doc:l,oldIndex:d,newIndex:p}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new D(V.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=En._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=pa.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function aI(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return B(61501,{type:n})}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */En._jsonSchemaVersion="firestore/querySnapshot/1.0",En._jsonSchema={type:ue("string",En._jsonSchemaVersion),bundleSource:ue("string","QuerySnapshot"),bundleName:ue("string"),bundle:ue("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function df(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new D(V.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class sc{}class ff extends sc{}function EI(n,e,...t){let r=[];e instanceof sc&&r.push(e),r=r.concat(t),(function(i){const a=i.filter((l=>l instanceof ic)).length,c=i.filter((l=>l instanceof Gi)).length;if(a>1||a>0&&c>0)throw new D(V.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(r);for(const s of r)n=s._apply(n);return n}class Gi extends ff{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new Gi(e,t,r)}_apply(e){const t=this._parse(e);return pf(e._query,t),new sn(e.firestore,e.converter,qo(e._query,t))}_parse(e){const t=ms(e.firestore);return(function(i,a,c,l,d,p,m){let E;if(d.isKeyField()){if(p==="array-contains"||p==="array-contains-any")throw new D(V.INVALID_ARGUMENT,`Invalid Query. You can't perform '${p}' queries on documentId().`);if(p==="in"||p==="not-in"){Pl(m,p);const N=[];for(const M of m)N.push(Rl(l,i,M));E={arrayValue:{values:N}}}else E=Rl(l,i,m)}else p!=="in"&&p!=="not-in"&&p!=="array-contains-any"||Pl(m,p),E=cw(c,a,m,p==="in"||p==="not-in");return ce.create(d,p,E)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function TI(n,e,t){const r=e,s=Yt("where",n);return Gi._create(s,r,t)}class ic extends sc{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new ic(e,t)}_parse(e){const t=this._queryConstraints.map((r=>r._parse(e))).filter((r=>r.getFilters().length>0));return t.length===1?t[0]:Ze.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(s,i){let a=s;const c=i.getFlattenedFilters();for(const l of c)pf(a,l),a=qo(a,l)})(e._query,t),new sn(e.firestore,e.converter,qo(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class oc extends ff{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new oc(e,t)}_apply(e){const t=(function(s,i,a){if(s.startAt!==null)throw new D(V.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new D(V.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Kr(i,a)})(e._query,this._field,this._direction);return new sn(e.firestore,e.converter,ey(e._query,t))}}function II(n,e="asc"){const t=e,r=Yt("orderBy",n);return oc._create(r,t)}function Rl(n,e,t){if(typeof(t=ye(t))=="string"){if(t==="")throw new D(V.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Qh(e)&&t.indexOf("/")!==-1)throw new D(V.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(X.fromString(t));if(!F.isDocumentKey(r))throw new D(V.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return qu(n,new F(r))}if(t instanceof ne)return qu(n,t._key);throw new D(V.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Ai(t)}.`)}function Pl(n,e){if(!Array.isArray(n)||n.length===0)throw new D(V.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function pf(n,e){const t=(function(s,i){for(const a of s)for(const c of a.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null})(n.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new D(V.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new D(V.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sl(n){return(function(t,r){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1})(n,["next","error","complete"])}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cI{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=ms(e)}set(e,t,r){this._verifyNotCommitted();const s=Co(e,this._firestore),i=nc(s.converter,t,r),a=Aa(this._dataReader,"WriteBatch.set",s._key,i,s.converter!==null,r);return this._mutations.push(a.toMutation(s._key,xe.none())),this}update(e,t,r,...s){this._verifyNotCommitted();const i=Co(e,this._firestore);let a;return a=typeof(t=ye(t))=="string"||t instanceof ps?Ed(this._dataReader,"WriteBatch.update",i._key,t,r,s):wd(this._dataReader,"WriteBatch.update",i._key,t),this._mutations.push(a.toMutation(i._key,xe.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=Co(e,this._firestore);return this._mutations=this._mutations.concat(new Ci(t._key,xe.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new D(V.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Co(n,e){if((n=ye(n)).firestore!==e)throw new D(V.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vI(n){n=Ee(n,ne);const e=Ee(n.firestore,et),t=ir(e);return lf(t,n._key).then((r=>ac(e,n,r)))}function AI(n){n=Ee(n,ne);const e=Ee(n.firestore,et),t=ir(e);return lf(t,n._key,{source:"server"}).then((r=>ac(e,n,r)))}function RI(n){n=Ee(n,sn);const e=Ee(n.firestore,et),t=ir(e),r=new rc(e);return df(n._query),nI(t,n._query).then((s=>new En(e,r,n,s)))}function PI(n,e,t){n=Ee(n,ne);const r=Ee(n.firestore,et),s=nc(n.converter,e,t),i=ms(r);return ws(r,[Aa(i,"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,xe.none())])}function SI(n,e,t,...r){n=Ee(n,ne);const s=Ee(n.firestore,et),i=ms(s);let a;return a=typeof(e=ye(e))=="string"||e instanceof ps?Ed(i,"updateDoc",n._key,e,t,r):wd(i,"updateDoc",n._key,e),ws(s,[a.toMutation(n._key,xe.exists(!0))])}function VI(n){return ws(Ee(n.firestore,et),[new Ci(n._key,xe.none())])}function bI(n,e){const t=Ee(n.firestore,et),r=sw(n),s=nc(n.converter,e),i=ms(n.firestore);return ws(t,[Aa(i,"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,xe.exists(!1))]).then((()=>r))}function CI(n,...e){var d,p,m;n=ye(n);let t={includeMetadataChanges:!1,source:"default"},r=0;typeof e[r]!="object"||Sl(e[r])||(t=e[r++]);const s={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(Sl(e[r])){const E=e[r];e[r]=(d=E.next)==null?void 0:d.bind(E),e[r+1]=(p=E.error)==null?void 0:p.bind(E),e[r+2]=(m=E.complete)==null?void 0:m.bind(E)}let i,a,c;if(n instanceof ne)a=Ee(n.firestore,et),c=Ni(n._key.path),i={next:E=>{e[r]&&e[r](ac(a,n,E))},error:e[r+1],complete:e[r+2]};else{const E=Ee(n,sn);a=Ee(E.firestore,et),c=E._query;const b=new rc(a);i={next:N=>{e[r]&&e[r](new En(a,b,E,N))},error:e[r+1],complete:e[r+2]},df(n._query)}const l=ir(a);return tI(l,c,s,i)}function ws(n,e){const t=ir(n);return rI(t,e)}function ac(n,e,t){const r=t.docs.get(e._key),s=new rc(n);return new wn(n,s,e._key,r,new Sr(t.hasPendingWrites,t.fromCache),e.converter)}function NI(n){return n=Ee(n,et),ir(n),new cI(n,(e=>ws(n,e)))}const Vl="@firebase/firestore",bl="4.17.2";(function(e,t=!0){g_(Kn),Bn(new In("firestore",((r,{instanceIdentifier:s,options:i})=>{const a=r.getProvider("app").getImmediate(),c=new et(new Dy(r.getProvider("auth-internal")),new Ly(a,r.getProvider("app-check-internal")),R_(a,s),a);return i={useFetchStreams:t,...i},c._setSettings(i),c}),"PUBLIC").setMultipleInstances(!0)),Ft(Vl,bl,e),Ft(Vl,bl,"esm2020")})();export{Ml as a,wI as b,hI as c,bI as d,mI as e,gI as f,lI as g,AI as h,am as i,sw as j,VI as k,PI as l,vI as m,RI as n,CI as o,II as p,EI as q,TI as r,dI as s,SI as u,NI as w};
