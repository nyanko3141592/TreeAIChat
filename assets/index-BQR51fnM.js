(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();var $;(function(e){e.STRING="string",e.NUMBER="number",e.INTEGER="integer",e.BOOLEAN="boolean",e.ARRAY="array",e.OBJECT="object"})($||($={}));/**
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
 */var F;(function(e){e.LANGUAGE_UNSPECIFIED="language_unspecified",e.PYTHON="python"})(F||(F={}));var P;(function(e){e.OUTCOME_UNSPECIFIED="outcome_unspecified",e.OUTCOME_OK="outcome_ok",e.OUTCOME_FAILED="outcome_failed",e.OUTCOME_DEADLINE_EXCEEDED="outcome_deadline_exceeded"})(P||(P={}));/**
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
 */const k=["user","model","function","system"];var A;(function(e){e.HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",e.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",e.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",e.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",e.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT",e.HARM_CATEGORY_CIVIC_INTEGRITY="HARM_CATEGORY_CIVIC_INTEGRITY"})(A||(A={}));var v;(function(e){e.HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",e.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",e.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",e.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",e.BLOCK_NONE="BLOCK_NONE"})(v||(v={}));var Y;(function(e){e.HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",e.NEGLIGIBLE="NEGLIGIBLE",e.LOW="LOW",e.MEDIUM="MEDIUM",e.HIGH="HIGH"})(Y||(Y={}));var j;(function(e){e.BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",e.SAFETY="SAFETY",e.OTHER="OTHER"})(j||(j={}));var S;(function(e){e.FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",e.STOP="STOP",e.MAX_TOKENS="MAX_TOKENS",e.SAFETY="SAFETY",e.RECITATION="RECITATION",e.LANGUAGE="LANGUAGE",e.BLOCKLIST="BLOCKLIST",e.PROHIBITED_CONTENT="PROHIBITED_CONTENT",e.SPII="SPII",e.MALFORMED_FUNCTION_CALL="MALFORMED_FUNCTION_CALL",e.OTHER="OTHER"})(S||(S={}));var q;(function(e){e.TASK_TYPE_UNSPECIFIED="TASK_TYPE_UNSPECIFIED",e.RETRIEVAL_QUERY="RETRIEVAL_QUERY",e.RETRIEVAL_DOCUMENT="RETRIEVAL_DOCUMENT",e.SEMANTIC_SIMILARITY="SEMANTIC_SIMILARITY",e.CLASSIFICATION="CLASSIFICATION",e.CLUSTERING="CLUSTERING"})(q||(q={}));var V;(function(e){e.MODE_UNSPECIFIED="MODE_UNSPECIFIED",e.AUTO="AUTO",e.ANY="ANY",e.NONE="NONE"})(V||(V={}));var J;(function(e){e.MODE_UNSPECIFIED="MODE_UNSPECIFIED",e.MODE_DYNAMIC="MODE_DYNAMIC"})(J||(J={}));/**
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
 */class h extends Error{constructor(t){super(`[GoogleGenerativeAI Error]: ${t}`)}}class m extends h{constructor(t,n){super(t),this.response=n}}class se extends h{constructor(t,n,s,o){super(t),this.status=n,this.statusText=s,this.errorDetails=o}}class I extends h{}class oe extends h{}/**
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
 */const de="https://generativelanguage.googleapis.com",ue="v1beta",fe="0.24.1",he="genai-js";var y;(function(e){e.GENERATE_CONTENT="generateContent",e.STREAM_GENERATE_CONTENT="streamGenerateContent",e.COUNT_TOKENS="countTokens",e.EMBED_CONTENT="embedContent",e.BATCH_EMBED_CONTENTS="batchEmbedContents"})(y||(y={}));class ge{constructor(t,n,s,o,i){this.model=t,this.task=n,this.apiKey=s,this.stream=o,this.requestOptions=i}toString(){var t,n;const s=((t=this.requestOptions)===null||t===void 0?void 0:t.apiVersion)||ue;let i=`${((n=this.requestOptions)===null||n===void 0?void 0:n.baseUrl)||de}/${s}/${this.model}:${this.task}`;return this.stream&&(i+="?alt=sse"),i}}function Ee(e){const t=[];return e!=null&&e.apiClient&&t.push(e.apiClient),t.push(`${he}/${fe}`),t.join(" ")}async function pe(e){var t;const n=new Headers;n.append("Content-Type","application/json"),n.append("x-goog-api-client",Ee(e.requestOptions)),n.append("x-goog-api-key",e.apiKey);let s=(t=e.requestOptions)===null||t===void 0?void 0:t.customHeaders;if(s){if(!(s instanceof Headers))try{s=new Headers(s)}catch(o){throw new I(`unable to convert customHeaders value ${JSON.stringify(s)} to Headers: ${o.message}`)}for(const[o,i]of s.entries()){if(o==="x-goog-api-key")throw new I(`Cannot set reserved header name ${o}`);if(o==="x-goog-api-client")throw new I(`Header name ${o} can only be set using the apiClient field`);n.append(o,i)}}return n}async function Ce(e,t,n,s,o,i){const r=new ge(e,t,n,s,i);return{url:r.toString(),fetchOptions:Object.assign(Object.assign({},me(i)),{method:"POST",headers:await pe(r),body:o})}}async function w(e,t,n,s,o,i={},r=fetch){const{url:a,fetchOptions:l}=await Ce(e,t,n,s,o,i);return _e(a,l,r)}async function _e(e,t,n=fetch){let s;try{s=await n(e,t)}catch(o){Ie(o,e)}return s.ok||await ye(s,e),s}function Ie(e,t){let n=e;throw n.name==="AbortError"?(n=new oe(`Request aborted when fetching ${t.toString()}: ${e.message}`),n.stack=e.stack):e instanceof se||e instanceof I||(n=new h(`Error fetching from ${t.toString()}: ${e.message}`),n.stack=e.stack),n}async function ye(e,t){let n="",s;try{const o=await e.json();n=o.error.message,o.error.details&&(n+=` ${JSON.stringify(o.error.details)}`,s=o.error.details)}catch{}throw new se(`Error fetching from ${t.toString()}: [${e.status} ${e.statusText}] ${n}`,e.status,e.statusText,s)}function me(e){const t={};if((e==null?void 0:e.signal)!==void 0||(e==null?void 0:e.timeout)>=0){const n=new AbortController;(e==null?void 0:e.timeout)>=0&&setTimeout(()=>n.abort(),e.timeout),e!=null&&e.signal&&e.signal.addEventListener("abort",()=>{n.abort()}),t.signal=n.signal}return t}/**
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
 */function U(e){return e.text=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),M(e.candidates[0]))throw new m(`${_(e)}`,e);return Ae(e)}else if(e.promptFeedback)throw new m(`Text not available. ${_(e)}`,e);return""},e.functionCall=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),M(e.candidates[0]))throw new m(`${_(e)}`,e);return console.warn("response.functionCall() is deprecated. Use response.functionCalls() instead."),W(e)[0]}else if(e.promptFeedback)throw new m(`Function call not available. ${_(e)}`,e)},e.functionCalls=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),M(e.candidates[0]))throw new m(`${_(e)}`,e);return W(e)}else if(e.promptFeedback)throw new m(`Function call not available. ${_(e)}`,e)},e}function Ae(e){var t,n,s,o;const i=[];if(!((n=(t=e.candidates)===null||t===void 0?void 0:t[0].content)===null||n===void 0)&&n.parts)for(const r of(o=(s=e.candidates)===null||s===void 0?void 0:s[0].content)===null||o===void 0?void 0:o.parts)r.text&&i.push(r.text),r.executableCode&&i.push("\n```"+r.executableCode.language+`
`+r.executableCode.code+"\n```\n"),r.codeExecutionResult&&i.push("\n```\n"+r.codeExecutionResult.output+"\n```\n");return i.length>0?i.join(""):""}function W(e){var t,n,s,o;const i=[];if(!((n=(t=e.candidates)===null||t===void 0?void 0:t[0].content)===null||n===void 0)&&n.parts)for(const r of(o=(s=e.candidates)===null||s===void 0?void 0:s[0].content)===null||o===void 0?void 0:o.parts)r.functionCall&&i.push(r.functionCall);if(i.length>0)return i}const ve=[S.RECITATION,S.SAFETY,S.LANGUAGE];function M(e){return!!e.finishReason&&ve.includes(e.finishReason)}function _(e){var t,n,s;let o="";if((!e.candidates||e.candidates.length===0)&&e.promptFeedback)o+="Response was blocked",!((t=e.promptFeedback)===null||t===void 0)&&t.blockReason&&(o+=` due to ${e.promptFeedback.blockReason}`),!((n=e.promptFeedback)===null||n===void 0)&&n.blockReasonMessage&&(o+=`: ${e.promptFeedback.blockReasonMessage}`);else if(!((s=e.candidates)===null||s===void 0)&&s[0]){const i=e.candidates[0];M(i)&&(o+=`Candidate was blocked due to ${i.finishReason}`,i.finishMessage&&(o+=`: ${i.finishMessage}`))}return o}function N(e){return this instanceof N?(this.v=e,this):new N(e)}function Oe(e,t,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var s=n.apply(e,t||[]),o,i=[];return o={},r("next"),r("throw"),r("return"),o[Symbol.asyncIterator]=function(){return this},o;function r(d){s[d]&&(o[d]=function(u){return new Promise(function(f,g){i.push([d,u,f,g])>1||a(d,u)})})}function a(d,u){try{l(s[d](u))}catch(f){C(i[0][3],f)}}function l(d){d.value instanceof N?Promise.resolve(d.value.v).then(c,p):C(i[0][2],d)}function c(d){a("next",d)}function p(d){a("throw",d)}function C(d,u){d(u),i.shift(),i.length&&a(i[0][0],i[0][1])}}/**
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
 */const X=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;function Re(e){const t=e.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0})),n=Te(t),[s,o]=n.tee();return{stream:Ne(s),response:Se(o)}}async function Se(e){const t=[],n=e.getReader();for(;;){const{done:s,value:o}=await n.read();if(s)return U(we(t));t.push(o)}}function Ne(e){return Oe(this,arguments,function*(){const n=e.getReader();for(;;){const{value:s,done:o}=yield N(n.read());if(o)break;yield yield N(U(s))}})}function Te(e){const t=e.getReader();return new ReadableStream({start(s){let o="";return i();function i(){return t.read().then(({value:r,done:a})=>{if(a){if(o.trim()){s.error(new h("Failed to parse stream"));return}s.close();return}o+=r;let l=o.match(X),c;for(;l;){try{c=JSON.parse(l[1])}catch{s.error(new h(`Error parsing JSON response: "${l[1]}"`));return}s.enqueue(c),o=o.substring(l[0].length),l=o.match(X)}return i()}).catch(r=>{let a=r;throw a.stack=r.stack,a.name==="AbortError"?a=new oe("Request aborted when reading from the stream"):a=new h("Error reading from the stream"),a})}}})}function we(e){const t=e[e.length-1],n={promptFeedback:t==null?void 0:t.promptFeedback};for(const s of e){if(s.candidates){let o=0;for(const i of s.candidates)if(n.candidates||(n.candidates=[]),n.candidates[o]||(n.candidates[o]={index:o}),n.candidates[o].citationMetadata=i.citationMetadata,n.candidates[o].groundingMetadata=i.groundingMetadata,n.candidates[o].finishReason=i.finishReason,n.candidates[o].finishMessage=i.finishMessage,n.candidates[o].safetyRatings=i.safetyRatings,i.content&&i.content.parts){n.candidates[o].content||(n.candidates[o].content={role:i.content.role||"user",parts:[]});const r={};for(const a of i.content.parts)a.text&&(r.text=a.text),a.functionCall&&(r.functionCall=a.functionCall),a.executableCode&&(r.executableCode=a.executableCode),a.codeExecutionResult&&(r.codeExecutionResult=a.codeExecutionResult),Object.keys(r).length===0&&(r.text=""),n.candidates[o].content.parts.push(r)}o++}s.usageMetadata&&(n.usageMetadata=s.usageMetadata)}return n}/**
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
 */async function ie(e,t,n,s){const o=await w(t,y.STREAM_GENERATE_CONTENT,e,!0,JSON.stringify(n),s);return Re(o)}async function re(e,t,n,s){const i=await(await w(t,y.GENERATE_CONTENT,e,!1,JSON.stringify(n),s)).json();return{response:U(i)}}/**
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
 */function ae(e){if(e!=null){if(typeof e=="string")return{role:"system",parts:[{text:e}]};if(e.text)return{role:"system",parts:[e]};if(e.parts)return e.role?e:{role:"system",parts:e.parts}}}function T(e){let t=[];if(typeof e=="string")t=[{text:e}];else for(const n of e)typeof n=="string"?t.push({text:n}):t.push(n);return be(t)}function be(e){const t={role:"user",parts:[]},n={role:"function",parts:[]};let s=!1,o=!1;for(const i of e)"functionResponse"in i?(n.parts.push(i),o=!0):(t.parts.push(i),s=!0);if(s&&o)throw new h("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");if(!s&&!o)throw new h("No content is provided for sending chat message.");return s?t:n}function Me(e,t){var n;let s={model:t==null?void 0:t.model,generationConfig:t==null?void 0:t.generationConfig,safetySettings:t==null?void 0:t.safetySettings,tools:t==null?void 0:t.tools,toolConfig:t==null?void 0:t.toolConfig,systemInstruction:t==null?void 0:t.systemInstruction,cachedContent:(n=t==null?void 0:t.cachedContent)===null||n===void 0?void 0:n.name,contents:[]};const o=e.generateContentRequest!=null;if(e.contents){if(o)throw new I("CountTokensRequest must have one of contents or generateContentRequest, not both.");s.contents=e.contents}else if(o)s=Object.assign(Object.assign({},s),e.generateContentRequest);else{const i=T(e);s.contents=[i]}return{generateContentRequest:s}}function z(e){let t;return e.contents?t=e:t={contents:[T(e)]},e.systemInstruction&&(t.systemInstruction=ae(e.systemInstruction)),t}function Le(e){return typeof e=="string"||Array.isArray(e)?{content:T(e)}:e}/**
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
 */const Q=["text","inlineData","functionCall","functionResponse","executableCode","codeExecutionResult"],De={user:["text","inlineData"],function:["functionResponse"],model:["text","functionCall","executableCode","codeExecutionResult"],system:["text"]};function Ge(e){let t=!1;for(const n of e){const{role:s,parts:o}=n;if(!t&&s!=="user")throw new h(`First content should be with role 'user', got ${s}`);if(!k.includes(s))throw new h(`Each item should include role field. Got ${s} but valid roles are: ${JSON.stringify(k)}`);if(!Array.isArray(o))throw new h("Content should have 'parts' property with an array of Parts");if(o.length===0)throw new h("Each Content should have at least one part");const i={text:0,inlineData:0,functionCall:0,functionResponse:0,fileData:0,executableCode:0,codeExecutionResult:0};for(const a of o)for(const l of Q)l in a&&(i[l]+=1);const r=De[s];for(const a of Q)if(!r.includes(a)&&i[a]>0)throw new h(`Content with role '${s}' can't contain '${a}' part`);t=!0}}function Z(e){var t;if(e.candidates===void 0||e.candidates.length===0)return!1;const n=(t=e.candidates[0])===null||t===void 0?void 0:t.content;if(n===void 0||n.parts===void 0||n.parts.length===0)return!1;for(const s of n.parts)if(s===void 0||Object.keys(s).length===0||s.text!==void 0&&s.text==="")return!1;return!0}/**
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
 */const ee="SILENT_ERROR";class xe{constructor(t,n,s,o={}){this.model=n,this.params=s,this._requestOptions=o,this._history=[],this._sendPromise=Promise.resolve(),this._apiKey=t,s!=null&&s.history&&(Ge(s.history),this._history=s.history)}async getHistory(){return await this._sendPromise,this._history}async sendMessage(t,n={}){var s,o,i,r,a,l;await this._sendPromise;const c=T(t),p={safetySettings:(s=this.params)===null||s===void 0?void 0:s.safetySettings,generationConfig:(o=this.params)===null||o===void 0?void 0:o.generationConfig,tools:(i=this.params)===null||i===void 0?void 0:i.tools,toolConfig:(r=this.params)===null||r===void 0?void 0:r.toolConfig,systemInstruction:(a=this.params)===null||a===void 0?void 0:a.systemInstruction,cachedContent:(l=this.params)===null||l===void 0?void 0:l.cachedContent,contents:[...this._history,c]},C=Object.assign(Object.assign({},this._requestOptions),n);let d;return this._sendPromise=this._sendPromise.then(()=>re(this._apiKey,this.model,p,C)).then(u=>{var f;if(Z(u.response)){this._history.push(c);const g=Object.assign({parts:[],role:"model"},(f=u.response.candidates)===null||f===void 0?void 0:f[0].content);this._history.push(g)}else{const g=_(u.response);g&&console.warn(`sendMessage() was unsuccessful. ${g}. Inspect response object for details.`)}d=u}).catch(u=>{throw this._sendPromise=Promise.resolve(),u}),await this._sendPromise,d}async sendMessageStream(t,n={}){var s,o,i,r,a,l;await this._sendPromise;const c=T(t),p={safetySettings:(s=this.params)===null||s===void 0?void 0:s.safetySettings,generationConfig:(o=this.params)===null||o===void 0?void 0:o.generationConfig,tools:(i=this.params)===null||i===void 0?void 0:i.tools,toolConfig:(r=this.params)===null||r===void 0?void 0:r.toolConfig,systemInstruction:(a=this.params)===null||a===void 0?void 0:a.systemInstruction,cachedContent:(l=this.params)===null||l===void 0?void 0:l.cachedContent,contents:[...this._history,c]},C=Object.assign(Object.assign({},this._requestOptions),n),d=ie(this._apiKey,this.model,p,C);return this._sendPromise=this._sendPromise.then(()=>d).catch(u=>{throw new Error(ee)}).then(u=>u.response).then(u=>{if(Z(u)){this._history.push(c);const f=Object.assign({},u.candidates[0].content);f.role||(f.role="model"),this._history.push(f)}else{const f=_(u);f&&console.warn(`sendMessageStream() was unsuccessful. ${f}. Inspect response object for details.`)}}).catch(u=>{u.message!==ee&&console.error(u)}),d}}/**
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
 */async function Be(e,t,n,s){return(await w(t,y.COUNT_TOKENS,e,!1,JSON.stringify(n),s)).json()}/**
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
 */async function He(e,t,n,s){return(await w(t,y.EMBED_CONTENT,e,!1,JSON.stringify(n),s)).json()}async function Ue(e,t,n,s){const o=n.requests.map(r=>Object.assign(Object.assign({},r),{model:t}));return(await w(t,y.BATCH_EMBED_CONTENTS,e,!1,JSON.stringify({requests:o}),s)).json()}/**
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
 */class te{constructor(t,n,s={}){this.apiKey=t,this._requestOptions=s,n.model.includes("/")?this.model=n.model:this.model=`models/${n.model}`,this.generationConfig=n.generationConfig||{},this.safetySettings=n.safetySettings||[],this.tools=n.tools,this.toolConfig=n.toolConfig,this.systemInstruction=ae(n.systemInstruction),this.cachedContent=n.cachedContent}async generateContent(t,n={}){var s;const o=z(t),i=Object.assign(Object.assign({},this._requestOptions),n);return re(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(s=this.cachedContent)===null||s===void 0?void 0:s.name},o),i)}async generateContentStream(t,n={}){var s;const o=z(t),i=Object.assign(Object.assign({},this._requestOptions),n);return ie(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(s=this.cachedContent)===null||s===void 0?void 0:s.name},o),i)}startChat(t){var n;return new xe(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(n=this.cachedContent)===null||n===void 0?void 0:n.name},t),this._requestOptions)}async countTokens(t,n={}){const s=Me(t,{model:this.model,generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:this.cachedContent}),o=Object.assign(Object.assign({},this._requestOptions),n);return Be(this.apiKey,this.model,s,o)}async embedContent(t,n={}){const s=Le(t),o=Object.assign(Object.assign({},this._requestOptions),n);return He(this.apiKey,this.model,s,o)}async batchEmbedContents(t,n={}){const s=Object.assign(Object.assign({},this._requestOptions),n);return Ue(this.apiKey,this.model,t,s)}}/**
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
 */class Ke{constructor(t){this.apiKey=t}getGenerativeModel(t,n){if(!t.model)throw new h("Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })");return new te(this.apiKey,t,n)}getGenerativeModelFromCachedContent(t,n,s){if(!t.name)throw new I("Cached content must contain a `name` field.");if(!t.model)throw new I("Cached content must contain a `model` field.");const o=["model","systemInstruction"];for(const r of o)if(n!=null&&n[r]&&t[r]&&(n==null?void 0:n[r])!==t[r]){if(r==="model"){const a=n.model.startsWith("models/")?n.model.replace("models/",""):n.model,l=t.model.startsWith("models/")?t.model.replace("models/",""):t.model;if(a===l)continue}throw new I(`Different value for "${r}" specified in modelParams (${n[r]}) and cachedContent (${t[r]})`)}const i=Object.assign(Object.assign({},n),{model:t.model,tools:t.tools,toolConfig:t.toolConfig,systemInstruction:t.systemInstruction,cachedContent:t});return new te(this.apiKey,i,s)}}const b="gemini_api_key";let O=[],E=null,B=null,H=null;const G=()=>`node-${Date.now()}-${Math.random().toString(36).substring(2,9)}`,D=(e,t=O)=>{for(const n of t){if(n.id===e)return n;if(n.children){const s=D(e,n.children);if(s)return s}}return null},ce=(e,t,n=0)=>{const s=document.createElement("div");s.classList.add("message-node-wrapper");const o=document.createElement("div");o.classList.add("message"),o.classList.add(e.type==="user"?"user-message":"ai-message"),o.dataset.nodeId=e.id,o.id=`msg-${e.id}`,n>0&&o.classList.add("is-child"),e.children&&e.children.length>0&&o.classList.add("has-children");const i=document.createElement("p");if(i.textContent=e.text,o.appendChild(i),e.id===E&&o.classList.add("selected-node"),o.addEventListener("click",r=>{r.stopPropagation(),E=e.id,R(),L(),console.log(`Node selected: ${E}`)}),s.appendChild(o),e.children&&e.children.length>0){const r=document.createElement("div");r.classList.add("children-container"),e.children.forEach(a=>{ce(a,r,n+1)}),s.appendChild(r)}t.appendChild(s)},R=()=>{const e=document.getElementById("chat-container");e.innerHTML="";let t=document.getElementById("connection-lines-svg");t||(t=document.createElementNS("http://www.w3.org/2000/svg","svg"),t.id="connection-lines-svg",e.insertBefore(t,e.firstChild)),t.innerHTML="",O.forEach(n=>{ce(n,e,0)}),setTimeout($e,0)},$e=()=>{const e=document.getElementById("connection-lines-svg");if(!e)return;document.getElementById("chat-container").getBoundingClientRect();const t=document.getElementById("chat-container").scrollWidth,n=document.getElementById("chat-container").scrollHeight;e.setAttribute("viewBox",`0 0 ${t} ${n}`),e.style.width=`${t}px`,e.style.height=`${n}px`;const s=(i,r,a,l)=>{const c=document.createElementNS("http://www.w3.org/2000/svg","line");c.setAttribute("x1",i),c.setAttribute("y1",r),c.setAttribute("x2",a),c.setAttribute("y2",l),c.setAttribute("stroke","#555"),c.setAttribute("stroke-width","2"),e.appendChild(c)},o=(i,r=null)=>{i.forEach(a=>{const l=document.getElementById(`msg-${a.id}`);if(!l)return;const c=l.getBoundingClientRect(),p=l.offsetLeft+c.width/2,C=l.offsetTop;if(l.offsetTop+c.height,r){const d=r.getBoundingClientRect(),u=r.offsetLeft+d.width/2,f=r.offsetTop+d.height;s(u,f,p,C)}a.children&&a.children.length>0&&o(a.children,l)})};o(O)},L=()=>{const e=document.getElementById("message-input");if(!E){e.placeholder="ノードを選択してください...",e.disabled=!0;return}e.disabled=!1;const t=D(E);t?t.type==="ai"?e.placeholder="AIの応答に対して質問を入力...":e.placeholder="次のメッセージを入力 (AIの応答として追加されます)...":e.placeholder="メッセージを入力..."},ne=e=>{if(!e)return console.error("API Key is missing for AI initialization."),alert("APIキーが設定されていません。ヘッダーからAPIキーを設定してください。"),!1;try{return B=new Ke(e),H=B.getGenerativeModel({model:"gemini-2.0-flash"}).startChat({history:[],generationConfig:{},safetySettings:[{category:A.HARM_CATEGORY_HARASSMENT,threshold:v.BLOCK_MEDIUM_AND_ABOVE},{category:A.HARM_CATEGORY_HATE_SPEECH,threshold:v.BLOCK_MEDIUM_AND_ABOVE},{category:A.HARM_CATEGORY_SEXUALLY_EXPLICIT,threshold:v.BLOCK_MEDIUM_AND_ABOVE},{category:A.HARM_CATEGORY_DANGEROUS_CONTENT,threshold:v.BLOCK_MEDIUM_AND_ABOVE}]}),console.log("Generative AI initialized."),!0}catch(t){return console.error("Error initializing Generative AI:",t),alert("AIの初期化に失敗しました。APIキーが正しいか確認してください。"),!1}};document.addEventListener("DOMContentLoaded",()=>{console.log("AI Chat App Loaded");const e=document.getElementById("api-key-input"),t=document.getElementById("save-api-key"),n=document.getElementById("reset-api-key");document.getElementById("api-key-section"),document.getElementById("chat-container");const s=document.getElementById("message-input"),o=document.getElementById("send-button"),i=()=>{const c=localStorage.getItem(b);c?(e.value=c,e.style.display="none",t.style.display="none",n.style.display="inline-block",console.log("API Key loaded from localStorage."),ne(c)):(e.style.display="inline-block",t.style.display="inline-block",n.style.display="none",console.log("API Key not found in localStorage."))},r=()=>{const c=e.value.trim();c?(localStorage.setItem(b,c),console.log("API Key saved to localStorage."),i()):alert("APIキーを入力してください。")},a=()=>{localStorage.removeItem(b),e.value="",console.log("API Key removed from localStorage."),i()};if(t.addEventListener("click",r),n.addEventListener("click",a),i(),O.length===0){const c=G();O=[{id:c,type:"ai",text:"AIに質問してください",children:[]}],E=c}R(),L();const l=async()=>{const c=s.value.trim();if(!c)return;if(!E){alert("メッセージを追加する親ノードを選択してください。");return}const p=D(E);if(!p){alert("選択されたノードが見つかりません。");return}const C=G(),d={id:C,type:"user",text:c,children:[]};if(p.children.push(d),E=C,R(),L(),s.value="",x(s),!B||!H){const g=localStorage.getItem(b);if(!g||!ne(g)){alert("AIが初期化されていません。APIキーを確認してください。");return}}const u=G(),f={id:u,type:"ai",text:"AIが応答を生成中です...",children:[]};d.children.push(f),E=u,R();try{const g=[];let K=d;const Fe=[K];for(;K;){const Ye=D(E,O);break}const le=(await H.sendMessage(c)).response.text();f.text=le}catch(g){console.error("Error sending message to Generative AI:",g),f.text="AIの応答取得に失敗しました。エラー: "+g.message,g.message.includes("API key not valid")&&alert("APIキーが無効です。再度設定してください。")}finally{E=f.id,R(),L()}};o.addEventListener("click",l),s.addEventListener("keypress",c=>{c.key==="Enter"&&!c.shiftKey&&(c.preventDefault(),l())}),x(s),s.addEventListener("input",()=>{x(s)})});function x(e){e.style.height="auto",e.style.height=e.scrollHeight+"px"}
