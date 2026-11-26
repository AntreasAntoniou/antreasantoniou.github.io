/**
 * [js-sha256]{@link https://github.com/emn178/js-sha256}
 *
 * @version 0.11.1
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2025
 * @license MIT
 */
!function(){"use strict";function t(t,i){i?(d[0]=d[16]=d[1]=d[2]=d[3]=d[4]=d[5]=d[6]=d[7]=d[8]=d[9]=d[10]=d[11]=d[12]=d[13]=d[14]=d[15]=0,this.blocks=d):this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],t?(this.h0=3238371032,this.h1=914150663,this.h2=812702999,this.h3=4144912697,this.h4=4290775857,this.h5=1750603025,this.h6=1694076839,this.h7=3204075428):(this.h0=1779033703,this.h1=3144134277,this.h2=1013904242,this.h3=2773480762,this.h4=1359893119,this.h5=2600822924,this.h6=528734635,this.h7=1541459225),this.block=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1,this.first=!0,this.is224=t}function i(i,r,s){var e,n=typeof i;if("string"===n){var o,a=[],u=i.length,c=0;for(e=0;e<u;++e)(o=i.charCodeAt(e))<128?a[c++]=o:o<2048?(a[c++]=192|o>>>6,a[c++]=128|63&o):o<55296||o>=57344?(a[c++]=224|o>>>12,a[c++]=128|o>>>6&63,a[c++]=128|63&o):(o=65536+((1023&o)<<10|1023&i.charCodeAt(++e)),a[c++]=240|o>>>18,a[c++]=128|o>>>12&63,a[c++]=128|o>>>6&63,a[c++]=128|63&o);i=a}else{if("object"!==n)throw new Error(h);if(null===i)throw new Error(h);if(f&&i.constructor===ArrayBuffer)i=new Uint8Array(i);else if(!(Array.isArray(i)||f&&ArrayBuffer.isView(i)))throw new Error(h)}i.length>64&&(i=new t(r,!0).update(i).array());var y=[],p=[];for(e=0;e<64;++e){var l=i[e]||0;y[e]=92^l,p[e]=54^l}t.call(this,r,s),this.update(p),this.oKeyPad=y,this.inner=!0,this.sharedMemory=s}var h="input is invalid type",r="object"==typeof window,s=r?window:{};s.JS_SHA256_NO_WINDOW&&(r=!1);var e=!r&&"object"==typeof self,n=!s.JS_SHA256_NO_NODE_JS&&"object"==typeof process&&process.versions&&process.versions.node&&"renderer"!=process.type;n?s=global:e&&(s=self);var o=!s.JS_SHA256_NO_COMMON_JS&&"object"==typeof module&&module.exports,a="function"==typeof define&&define.amd,f=!s.JS_SHA256_NO_ARRAY_BUFFER&&"undefined"!=typeof ArrayBuffer,u="0123456789abcdef".split(""),c=[-2147483648,8388608,32768,128],y=[24,16,8,0],p=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],l=["hex","array","digest","arrayBuffer"],d=[];!s.JS_SHA256_NO_NODE_JS&&Array.isArray||(Array.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)}),!f||!s.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW&&ArrayBuffer.isView||(ArrayBuffer.isView=function(t){return"object"==typeof t&&t.buffer&&t.buffer.constructor===ArrayBuffer});var A=function(i,h){return function(r){return new t(h,!0).update(r)[i]()}},w=function(i){var h=A("hex",i);n&&(h=b(h,i)),h.create=function(){return new t(i)},h.update=function(t){return h.create().update(t)};for(var r=0;r<l.length;++r){var s=l[r];h[s]=A(s,i)}return h},b=function(t,i){var r,e=require("crypto"),n=require("buffer").Buffer,o=i?"sha224":"sha256";r=n.from&&!s.JS_SHA256_NO_BUFFER_FROM?n.from:function(t){return new n(t)};return function(i){if("string"==typeof i)return e.createHash(o).update(i,"utf8").digest("hex");if(null===i||void 0===i)throw new Error(h);return i.constructor===ArrayBuffer&&(i=new Uint8Array(i)),Array.isArray(i)||ArrayBuffer.isView(i)||i.constructor===n?e.createHash(o).update(r(i)).digest("hex"):t(i)}},_=function(t,h){return function(r,s){return new i(r,h,!0).update(s)[t]()}},v=function(t){var h=_("hex",t);h.create=function(h){return new i(h,t)},h.update=function(t,i){return h.create(t).update(i)};for(var r=0;r<l.length;++r){var s=l[r];h[s]=_(s,t)}return h};t.prototype.update=function(t){if(!this.finalized){var i,r=typeof t;if("string"!==r){if("object"!==r)throw new Error(h);if(null===t)throw new Error(h);if(f&&t.constructor===ArrayBuffer)t=new Uint8Array(t);else if(!(Array.isArray(t)||f&&ArrayBuffer.isView(t)))throw new Error(h);i=!0}for(var s,e,n=0,o=t.length,a=this.blocks;n<o;){if(this.hashed&&(this.hashed=!1,a[0]=this.block,this.block=a[16]=a[1]=a[2]=a[3]=a[4]=a[5]=a[6]=a[7]=a[8]=a[9]=a[10]=a[11]=a[12]=a[13]=a[14]=a[15]=0),i)for(e=this.start;n<o&&e<64;++n)a[e>>>2]|=t[n]<<y[3&e++];else for(e=this.start;n<o&&e<64;++n)(s=t.charCodeAt(n))<128?a[e>>>2]|=s<<y[3&e++]:s<2048?(a[e>>>2]|=(192|s>>>6)<<y[3&e++],a[e>>>2]|=(128|63&s)<<y[3&e++]):s<55296||s>=57344?(a[e>>>2]|=(224|s>>>12)<<y[3&e++],a[e>>>2]|=(128|s>>>6&63)<<y[3&e++],a[e>>>2]|=(128|63&s)<<y[3&e++]):(s=65536+((1023&s)<<10|1023&t.charCodeAt(++n)),a[e>>>2]|=(240|s>>>18)<<y[3&e++],a[e>>>2]|=(128|s>>>12&63)<<y[3&e++],a[e>>>2]|=(128|s>>>6&63)<<y[3&e++],a[e>>>2]|=(128|63&s)<<y[3&e++]);this.lastByteIndex=e,this.bytes+=e-this.start,e>=64?(this.block=a[16],this.start=e-64,this.hash(),this.hashed=!0):this.start=e}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this}},t.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var t=this.blocks,i=this.lastByteIndex;t[16]=this.block,t[i>>>2]|=c[3&i],this.block=t[16],i>=56&&(this.hashed||this.hash(),t[0]=this.block,t[16]=t[1]=t[2]=t[3]=t[4]=t[5]=t[6]=t[7]=t[8]=t[9]=t[10]=t[11]=t[12]=t[13]=t[14]=t[15]=0),t[14]=this.hBytes<<3|this.bytes>>>29,t[15]=this.bytes<<3,this.hash()}},t.prototype.hash=function(){var t,i,h,r,s,e,n,o,a,f=this.h0,u=this.h1,c=this.h2,y=this.h3,l=this.h4,d=this.h5,A=this.h6,w=this.h7,b=this.blocks;for(t=16;t<64;++t)i=((s=b[t-15])>>>7|s<<25)^(s>>>18|s<<14)^s>>>3,h=((s=b[t-2])>>>17|s<<15)^(s>>>19|s<<13)^s>>>10,b[t]=b[t-16]+i+b[t-7]+h<<0;for(a=u&c,t=0;t<64;t+=4)this.first?(this.is224?(e=300032,w=(s=b[0]-1413257819)-150054599<<0,y=s+24177077<<0):(e=704751109,w=(s=b[0]-210244248)-1521486534<<0,y=s+143694565<<0),this.first=!1):(i=(f>>>2|f<<30)^(f>>>13|f<<19)^(f>>>22|f<<10),r=(e=f&u)^f&c^a,w=y+(s=w+(h=(l>>>6|l<<26)^(l>>>11|l<<21)^(l>>>25|l<<7))+(l&d^~l&A)+p[t]+b[t])<<0,y=s+(i+r)<<0),i=(y>>>2|y<<30)^(y>>>13|y<<19)^(y>>>22|y<<10),r=(n=y&f)^y&u^e,A=c+(s=A+(h=(w>>>6|w<<26)^(w>>>11|w<<21)^(w>>>25|w<<7))+(w&l^~w&d)+p[t+1]+b[t+1])<<0,i=((c=s+(i+r)<<0)>>>2|c<<30)^(c>>>13|c<<19)^(c>>>22|c<<10),r=(o=c&y)^c&f^n,d=u+(s=d+(h=(A>>>6|A<<26)^(A>>>11|A<<21)^(A>>>25|A<<7))+(A&w^~A&l)+p[t+2]+b[t+2])<<0,i=((u=s+(i+r)<<0)>>>2|u<<30)^(u>>>13|u<<19)^(u>>>22|u<<10),r=(a=u&c)^u&y^o,l=f+(s=l+(h=(d>>>6|d<<26)^(d>>>11|d<<21)^(d>>>25|d<<7))+(d&A^~d&w)+p[t+3]+b[t+3])<<0,f=s+(i+r)<<0,this.chromeBugWorkAround=!0;this.h0=this.h0+f<<0,this.h1=this.h1+u<<0,this.h2=this.h2+c<<0,this.h3=this.h3+y<<0,this.h4=this.h4+l<<0,this.h5=this.h5+d<<0,this.h6=this.h6+A<<0,this.h7=this.h7+w<<0},t.prototype.hex=function(){this.finalize();var t=this.h0,i=this.h1,h=this.h2,r=this.h3,s=this.h4,e=this.h5,n=this.h6,o=this.h7,a=u[t>>>28&15]+u[t>>>24&15]+u[t>>>20&15]+u[t>>>16&15]+u[t>>>12&15]+u[t>>>8&15]+u[t>>>4&15]+u[15&t]+u[i>>>28&15]+u[i>>>24&15]+u[i>>>20&15]+u[i>>>16&15]+u[i>>>12&15]+u[i>>>8&15]+u[i>>>4&15]+u[15&i]+u[h>>>28&15]+u[h>>>24&15]+u[h>>>20&15]+u[h>>>16&15]+u[h>>>12&15]+u[h>>>8&15]+u[h>>>4&15]+u[15&h]+u[r>>>28&15]+u[r>>>24&15]+u[r>>>20&15]+u[r>>>16&15]+u[r>>>12&15]+u[r>>>8&15]+u[r>>>4&15]+u[15&r]+u[s>>>28&15]+u[s>>>24&15]+u[s>>>20&15]+u[s>>>16&15]+u[s>>>12&15]+u[s>>>8&15]+u[s>>>4&15]+u[15&s]+u[e>>>28&15]+u[e>>>24&15]+u[e>>>20&15]+u[e>>>16&15]+u[e>>>12&15]+u[e>>>8&15]+u[e>>>4&15]+u[15&e]+u[n>>>28&15]+u[n>>>24&15]+u[n>>>20&15]+u[n>>>16&15]+u[n>>>12&15]+u[n>>>8&15]+u[n>>>4&15]+u[15&n];return this.is224||(a+=u[o>>>28&15]+u[o>>>24&15]+u[o>>>20&15]+u[o>>>16&15]+u[o>>>12&15]+u[o>>>8&15]+u[o>>>4&15]+u[15&o]),a},t.prototype.toString=t.prototype.hex,t.prototype.digest=function(){this.finalize();var t=this.h0,i=this.h1,h=this.h2,r=this.h3,s=this.h4,e=this.h5,n=this.h6,o=this.h7,a=[t>>>24&255,t>>>16&255,t>>>8&255,255&t,i>>>24&255,i>>>16&255,i>>>8&255,255&i,h>>>24&255,h>>>16&255,h>>>8&255,255&h,r>>>24&255,r>>>16&255,r>>>8&255,255&r,s>>>24&255,s>>>16&255,s>>>8&255,255&s,e>>>24&255,e>>>16&255,e>>>8&255,255&e,n>>>24&255,n>>>16&255,n>>>8&255,255&n];return this.is224||a.push(o>>>24&255,o>>>16&255,o>>>8&255,255&o),a},t.prototype.array=t.prototype.digest,t.prototype.arrayBuffer=function(){this.finalize();var t=new ArrayBuffer(this.is224?28:32),i=new DataView(t);return i.setUint32(0,this.h0),i.setUint32(4,this.h1),i.setUint32(8,this.h2),i.setUint32(12,this.h3),i.setUint32(16,this.h4),i.setUint32(20,this.h5),i.setUint32(24,this.h6),this.is224||i.setUint32(28,this.h7),t},(i.prototype=new t).finalize=function(){if(t.prototype.finalize.call(this),this.inner){this.inner=!1;var i=this.array();t.call(this,this.is224,this.sharedMemory),this.update(this.oKeyPad),this.update(i),t.prototype.finalize.call(this)}};var B=w();B.sha256=B,B.sha224=w(!0),B.sha256.hmac=v(),B.sha224.hmac=v(!0),o?module.exports=B:(s.sha256=B.sha256,s.sha224=B.sha224,a&&define(function(){return B}))}();
;
var TaliReader=(()=>{var Ke=Object.defineProperty;var nr=Object.getOwnPropertyDescriptor;var ir=Object.getOwnPropertyNames;var rr=Object.prototype.hasOwnProperty;var or=(e,t,n)=>t in e?Ke(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var sr=(e,t)=>{for(var n in t)Ke(e,n,{get:t[n],enumerable:!0})},fr=(e,t,n,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of ir(t))!rr.call(e,r)&&r!==n&&Ke(e,r,{get:()=>t[r],enumerable:!(i=nr(t,r))||i.enumerable});return e};var ar=e=>fr(Ke({},"__esModule",{value:!0}),e);var D=(e,t,n)=>or(e,typeof t!="symbol"?t+"":t,n);var Sf={};sr(Sf,{cues:()=>wf,read:()=>If,trackEntries:()=>Zi});var pt=["BOOLEAN","INT32","INT64","INT96","FLOAT","DOUBLE","BYTE_ARRAY","FIXED_LEN_BYTE_ARRAY"],W=["PLAIN","GROUP_VAR_INT","PLAIN_DICTIONARY","RLE","BIT_PACKED","DELTA_BINARY_PACKED","DELTA_LENGTH_BYTE_ARRAY","DELTA_BYTE_ARRAY","RLE_DICTIONARY","BYTE_STREAM_SPLIT","ALP"],un=["REQUIRED","OPTIONAL","REPEATED"],dn=["UTF8","MAP","MAP_KEY_VALUE","LIST","ENUM","DECIMAL","DATE","TIME_MILLIS","TIME_MICROS","TIMESTAMP_MILLIS","TIMESTAMP_MICROS","UINT_8","UINT_16","UINT_32","UINT_64","INT_8","INT_16","INT_32","INT_64","JSON","BSON","INTERVAL"],pn=["UNCOMPRESSED","SNAPPY","GZIP","LZO","BROTLI","LZ4","ZSTD","LZ4_RAW"],Ge=["DATA_PAGE","INDEX_PAGE","DICTIONARY_PAGE","DATA_PAGE_V2"],gn=["UNORDERED","ASCENDING","DESCENDING"],hn=["SPHERICAL","VINCENTY","THOMAS","ANDOYER","KARNEY"];function Ve(e){let t=je(e);if(t.type===1)return{type:"Point",coordinates:gt(e,t)};if(t.type===2)return{type:"LineString",coordinates:ht(e,t)};if(t.type===3)return{type:"Polygon",coordinates:mn(e,t)};if(t.type===4){let n=[];for(let i=0;i<t.count;i++)n.push(gt(e,je(e)));return{type:"MultiPoint",coordinates:n}}else if(t.type===5){let n=[];for(let i=0;i<t.count;i++)n.push(ht(e,je(e)));return{type:"MultiLineString",coordinates:n}}else if(t.type===6){let n=[];for(let i=0;i<t.count;i++)n.push(mn(e,je(e)));return{type:"MultiPolygon",coordinates:n}}else if(t.type===7){let n=[];for(let i=0;i<t.count;i++)n.push(Ve(e));return{type:"GeometryCollection",geometries:n}}else throw new Error(`Unsupported geometry type: ${t.type}`)}function je(e){let{view:t}=e,n=t.getUint8(e.offset++)===1,i=t.getUint32(e.offset,n);e.offset+=4;let r=i%1e3,o=Math.floor(i/1e3),s=0;r>1&&r<=7&&(s=t.getUint32(e.offset,n),e.offset+=4);let f=2;return o&&f++,o===3&&f++,{littleEndian:n,type:r,dim:f,count:s}}function gt(e,t){let n=[];for(let i=0;i<t.dim;i++){let r=e.view.getFloat64(e.offset,t.littleEndian);e.offset+=8,n.push(r)}return n}function ht(e,t){let n=[];for(let i=0;i<t.count;i++)n.push(gt(e,t));return n}function mn(e,t){let{view:n}=e,i=[];for(let r=0;r<t.count;r++){let o=n.getUint32(e.offset,t.littleEndian);e.offset+=4,i.push(ht(e,{...t,count:o}))}return i}var lr=new TextDecoder("utf-8",{ignoreBOM:!0}),cr=new TextDecoder,H={timestampFromMilliseconds(e){return new Date(Number(e))},timestampFromMicroseconds(e){return new Date(Number(e/1000n))},timestampFromNanoseconds(e){return new Date(Number(e/1000000n))},dateFromDays(e){return new Date(e*864e5)},stringFromBytes(e){return e&&lr.decode(e)},jsonFromBytes(e){return e&&JSON.parse(cr.decode(e))},geometryFromBytes(e){return e&&Ve({view:new DataView(e.buffer,e.byteOffset,e.byteLength),offset:0})},geographyFromBytes(e){return e&&Ve({view:new DataView(e.buffer,e.byteOffset,e.byteLength),offset:0})},uuidFromBytes(e){if(!e)return;let t=Array.from(e,n=>n.toString(16).padStart(2,"0")).join("");return t.slice(0,8)+"-"+t.slice(8,12)+"-"+t.slice(12,16)+"-"+t.slice(16,20)+"-"+t.slice(20,32)}};function mt(e,t,n,i){if(t&&n.endsWith("_DICTIONARY")){let r=e;e instanceof Uint8Array&&!(t instanceof Uint8Array)&&(r=new t.constructor(e.length));for(let o=0;o<e.length;o++)r[o]=t[e[o]];return r}else return _t(e,i)}function _t(e,t){let{element:n,parsers:i,utf8:r=!0,schemaPath:o}=t,{type:s,converted_type:f,logical_type:a}=n,u=n.repetition_type!=="REQUIRED";if(s==="BYTE_ARRAY"&&n.name==="inline"&&o?.at(-2)?.element.logical_type?.type==="FILE"||o?.some(c=>c.element.logical_type?.type==="VARIANT")&&s==="BYTE_ARRAY"&&f!=="UTF8"&&a?.type!=="STRING")return e;if(f==="DECIMAL"){let c=n.scale||0,d=10**c,g=new Array(e.length);for(let p=0;p<g.length;p++)e[p]instanceof Uint8Array?g[p]=c>308?Ce(e[p])*10**-c:Ce(e[p])/d:g[p]=Number(e[p])/d;return g}if(!f&&s==="INT96")return Array.from(e).map(c=>i.timestampFromNanoseconds(ur(c)));if(f==="DATE")return Array.from(e).map(c=>i.dateFromDays(c));if(f==="TIMESTAMP_MILLIS")return Array.from(e).map(c=>i.timestampFromMilliseconds(c));if(f==="TIMESTAMP_MICROS")return Array.from(e).map(c=>i.timestampFromMicroseconds(c));if(f==="JSON")return e.map(c=>i.jsonFromBytes(c));if(f==="BSON")throw new Error("parquet bson not supported");if(f==="INTERVAL")throw new Error("parquet interval not supported");if(a?.type==="GEOMETRY")return e.map(c=>i.geometryFromBytes(c));if(a?.type==="GEOGRAPHY")return e.map(c=>i.geographyFromBytes(c));if(a?.type==="UUID")return e.map(c=>i.uuidFromBytes(c));if(f==="UTF8"||a?.type==="STRING"||r&&s==="BYTE_ARRAY")return e.map(c=>i.stringFromBytes(c));if(f==="UINT_64"||a?.type==="INTEGER"&&a.bitWidth===64&&!a.isSigned){if(e instanceof BigInt64Array)return new BigUint64Array(e.buffer,e.byteOffset,e.length);let c=u?new Array(e.length):new BigUint64Array(e.length);for(let d=0;d<c.length;d++)c[d]=e[d];return c}if(f==="UINT_32"||a?.type==="INTEGER"&&a.bitWidth===32&&!a.isSigned){if(e instanceof Int32Array)return new Uint32Array(e.buffer,e.byteOffset,e.length);let c=u?new Array(e.length):new Uint32Array(e.length);for(let d=0;d<c.length;d++)c[d]=e[d]<0?4294967296+e[d]:e[d];return c}if(a?.type==="FLOAT16")return Array.from(e).map(yt);if(a?.type==="TIMESTAMP"){let{unit:c}=a,d=i.timestampFromMilliseconds;c==="MICROS"&&(d=i.timestampFromMicroseconds),c==="NANOS"&&(d=i.timestampFromNanoseconds);let g=new Array(e.length);for(let p=0;p<g.length;p++)g[p]=d(e[p]);return g}return e}function Ce(e){if(!e.length)return 0;let t=0n;for(let i of e)t=t*256n+BigInt(i);let n=e.length*8;return t>=2n**BigInt(n-1)&&(t-=2n**BigInt(n)),Number(t)}function ur(e){let t=(e>>64n)-2440588n,n=e&0xffffffffffffffffn;return t*86400000000000n+n}function yt(e){if(!e)return;let t=e[1]<<8|e[0],n=t>>15?-1:1,i=t>>10&31,r=t&1023;return i===0?n*2**-14*(r/1024):i===31?r?NaN:n*(1/0):n*2**(i-15)*(1+r/1024)}function _n(e,t,n){let i=e[t],r=[],o=1;if(i.num_children)for(;r.length<i.num_children;){let s=e[t+o],f=_n(e,t+o,[...n,s.name]);o+=f.count,r.push(f)}return{count:o,element:i,children:r,path:n}}function yn(e,t){return At(_n(e,0,[]),t)}function At(e,t){let n=[e];for(let i of t){let r=e.children.find(o=>o.element.name===i);if(!r)throw new Error(`parquet schema element not found: ${t}`);n.push(r),e=r}return n}function We(e){let t=[];function n(i){if(i.children.length)for(let r of i.children)n(r);else t.push(i.path.join("."))}return n(e),t}function Et(e){let t=0;for(let{element:n}of e)n.repetition_type==="REPEATED"&&t++;return t}function Pe(e){let t=0;for(let{element:n}of e.slice(1))n.repetition_type!=="REQUIRED"&&t++;return t}function An(e){if(!e||e.element.converted_type!=="LIST"||e.children.length>1)return!1;let t=e.children[0];return!(t.children.length>1||t.element.repetition_type!=="REPEATED")}function En(e){if(!e||e.element.converted_type!=="MAP"||e.children.length>1)return!1;let t=e.children[0];return!(t.children.length!==2||t.element.repetition_type!=="REPEATED"||t.children.find(r=>r.element.name==="key")?.element.repetition_type==="REPEATED"||t.children.find(r=>r.element.name==="value")?.element.repetition_type==="REPEATED")}function wt(e){if(e.length!==2)return!1;let[,t]=e;return!(t.element.repetition_type==="REPEATED"||t.children.length)}function j(e){let t={},n=0;for(;;){if(e.offset>=e.view.byteLength)throw new Error("thrift struct ended without STOP");let i=e.view.getUint8(e.offset++),r=i&15;if(r===0)break;let o=i>>4;n=o?n+o:He(e),t[`field_${n}`]=It(e,r)}return t}function It(e,t){switch(t){case 1:return!0;case 2:return!1;case 3:return e.view.getInt8(e.offset++);case 4:case 5:return He(e);case 6:return ze(e);case 7:{let n=e.view.getFloat64(e.offset,!0);return e.offset+=8,n}case 8:{let n=k(e);if(e.offset+n>e.view.byteLength)throw new Error(`thrift binary length ${n} exceeds remaining ${e.view.byteLength-e.offset} bytes`);let i=new Uint8Array(e.view.buffer,e.view.byteOffset+e.offset,n);return e.offset+=n,i}case 9:{let n=e.view.getUint8(e.offset++),i=n&15,r=n>>4;r===15&&(r=k(e));let o=i===1||i===2,s=new Array(r);for(let f=0;f<r;f++)s[f]=o?It(e,3)===1:It(e,i);return s}case 12:return j(e);default:throw new Error(`thrift unhandled type: ${t}`)}}function k(e){let t=0,n=0;for(;;){let i=e.view.getUint8(e.offset++);if(t|=(i&127)<<n,!(i&128))return t;n+=7}}function dr(e){let t=0n,n=0n;for(;;){let i=e.view.getUint8(e.offset++);if(t|=BigInt(i&127)<<n,!(i&128))return t;n+=7n}}function He(e){let t=k(e);return t>>>1^-(t&1)}function ze(e){let t=dr(e);return t>>1n^-(t&1n)}function wn(e,t){let n=new Map,i=t?.find(({key:o})=>o==="geo")?.value,r=(i&&JSON.parse(i)?.columns)??{};for(let[o,s]of Object.entries(r)){if(s.encoding!=="WKB")continue;let f=s.edges==="spherical"?"GEOGRAPHY":"GEOMETRY",a=s.crs?.id??s.crs?.ids?.[0],u=a?`${a.authority}:${a.code.toString()}`:void 0;n.set(o,{type:f,crs:u})}for(let o=1;o<e.length;o++){let{logical_type:s,name:f,num_children:a,type:u}=e[o];if(a){o+=a;continue}u==="BYTE_ARRAY"&&!s&&(e[o].logical_type=n.get(f))}}var pr=1<<19,gr=new TextDecoder("utf-8",{ignoreBOM:!0});function V(e){return e&&gr.decode(e)}async function re(e,{parsers:t,initialFetchSize:n=pr,geoparquet:i=!0}={}){if(!e||!(e.byteLength>=0))throw new Error("parquet expected AsyncBuffer");let r=Math.max(0,e.byteLength-n),o=await e.slice(r,e.byteLength),s=new DataView(o);if(s.getUint32(o.byteLength-4,!0)!==827474256)throw new Error("parquet file invalid (footer != PAR1)");let f=s.getUint32(o.byteLength-8,!0);if(f>e.byteLength-8)throw new Error(`parquet metadata length ${f} exceeds available buffer ${e.byteLength-8}`);if(f+8>n){let a=e.byteLength-f-8,u=await e.slice(a,r),l=new ArrayBuffer(f+8),c=new Uint8Array(l);return c.set(new Uint8Array(u)),c.set(new Uint8Array(o),r-a),St(l,{parsers:t,geoparquet:i})}else return St(o,{parsers:t,geoparquet:i})}function St(e,{parsers:t,geoparquet:n=!0}={}){let i;if(e instanceof ArrayBuffer)i=new DataView(e);else if(e instanceof Uint8Array)i=new DataView(e.buffer,e.byteOffset,e.byteLength);else throw new Error("parquet expected ArrayBuffer or Uint8Array");let r={...H,...t};if(i.byteLength<8)throw new Error("parquet file is too short");if(i.getUint32(i.byteLength-4,!0)!==827474256)throw new Error("parquet file invalid (footer != PAR1)");let o=i.byteLength-8,s=i.getUint32(o,!0);if(s>i.byteLength-8)throw new Error(`parquet metadata length ${s} exceeds available buffer ${i.byteLength-8}`);let f=o-s,u=j({view:i,offset:f}),l=u.field_1,c=u.field_2.map(m=>({type:pt[m.field_1],type_length:m.field_2,repetition_type:un[m.field_3],name:V(m.field_4),num_children:m.field_5,converted_type:dn[m.field_6],scale:m.field_7,precision:m.field_8,field_id:m.field_9,logical_type:hr(m.field_10)})),d=c.filter(m=>m.type),g=u.field_3,p=u.field_4.map(m=>({columns:m.field_1.map((_,E)=>({file_path:V(_.field_1),file_offset:_.field_2,meta_data:_.field_3&&{type:pt[_.field_3.field_1],encodings:_.field_3.field_2?.map(w=>W[w]),path_in_schema:_.field_3.field_3.map(V),codec:pn[_.field_3.field_4],num_values:_.field_3.field_5,total_uncompressed_size:_.field_3.field_6,total_compressed_size:_.field_3.field_7,key_value_metadata:_.field_3.field_8?.map(w=>({key:V(w.field_1),value:V(w.field_2)})),data_page_offset:_.field_3.field_9,index_page_offset:_.field_3.field_10,dictionary_page_offset:_.field_3.field_11,statistics:mr(_.field_3.field_12,d[E],r),encoding_stats:_.field_3.field_13?.map(w=>({page_type:Ge[w.field_1],encoding:W[w.field_2],count:w.field_3})),bloom_filter_offset:_.field_3.field_14,bloom_filter_length:_.field_3.field_15,size_statistics:_.field_3.field_16&&{unencoded_byte_array_data_bytes:_.field_3.field_16.field_1,repetition_level_histogram:_.field_3.field_16.field_2,definition_level_histogram:_.field_3.field_16.field_3},geospatial_statistics:_.field_3.field_17&&{bbox:_.field_3.field_17.field_1&&{xmin:_.field_3.field_17.field_1.field_1,xmax:_.field_3.field_17.field_1.field_2,ymin:_.field_3.field_17.field_1.field_3,ymax:_.field_3.field_17.field_1.field_4,zmin:_.field_3.field_17.field_1.field_5,zmax:_.field_3.field_17.field_1.field_6,mmin:_.field_3.field_17.field_1.field_7,mmax:_.field_3.field_17.field_1.field_8},geospatial_types:_.field_3.field_17.field_2}},offset_index_offset:_.field_4,offset_index_length:_.field_5,column_index_offset:_.field_6,column_index_length:_.field_7,crypto_metadata:_.field_8,encrypted_column_metadata:_.field_9})),total_byte_size:m.field_2,num_rows:m.field_3,sorting_columns:m.field_4?.map(_=>({column_idx:_.field_1,descending:_.field_2,nulls_first:_.field_3})),file_offset:m.field_5,total_compressed_size:m.field_6,ordinal:m.field_7})),h=u.field_5?.map(m=>({key:V(m.field_1),value:V(m.field_2)})),y=V(u.field_6);return n&&wn(c,h),{version:l,schema:c,num_rows:g,row_groups:p,key_value_metadata:h,created_by:y,metadata_length:s}}function U({schema:e}){return yn(e,[])[0]}function hr(e){return e?.field_1?{type:"STRING"}:e?.field_2?{type:"MAP"}:e?.field_3?{type:"LIST"}:e?.field_4?{type:"ENUM"}:e?.field_5?{type:"DECIMAL",scale:e.field_5.field_1,precision:e.field_5.field_2}:e?.field_6?{type:"DATE"}:e?.field_7?{type:"TIME",isAdjustedToUTC:e.field_7.field_1,unit:In(e.field_7.field_2)}:e?.field_8?{type:"TIMESTAMP",isAdjustedToUTC:e.field_8.field_1,unit:In(e.field_8.field_2)}:e?.field_10?{type:"INTEGER",bitWidth:e.field_10.field_1,isSigned:e.field_10.field_2}:e?.field_11?{type:"NULL"}:e?.field_12?{type:"JSON"}:e?.field_13?{type:"BSON"}:e?.field_14?{type:"UUID"}:e?.field_15?{type:"FLOAT16"}:e?.field_16?{type:"VARIANT",specification_version:e.field_16.field_1}:e?.field_17?{type:"GEOMETRY",crs:V(e.field_17.field_1)}:e?.field_18?{type:"GEOGRAPHY",crs:V(e.field_18.field_1),algorithm:hn[e.field_18.field_2]}:e?.field_19?{type:"FILE"}:e}function In(e){if(e.field_1)return"MILLIS";if(e.field_2)return"MICROS";if(e.field_3)return"NANOS";throw new Error("parquet time unit required")}function mr(e,t,n){return e&&{max:ie(e.field_1,t,n),min:ie(e.field_2,t,n),null_count:e.field_3,distinct_count:e.field_4,max_value:ie(e.field_5,t,n),min_value:ie(e.field_6,t,n),is_max_value_exact:e.field_7,is_min_value_exact:e.field_8}}function ie(e,t,n){let{type:i,converted_type:r,logical_type:o}=t;if(e===void 0)return e;if(i==="BOOLEAN")return e[0]===1;if(i==="BYTE_ARRAY")return n.stringFromBytes(e);let s=new DataView(e.buffer,e.byteOffset,e.byteLength);if(i==="FLOAT"&&s.byteLength===4)return s.getFloat32(0,!0);if(i==="DOUBLE"&&s.byteLength===8)return s.getFloat64(0,!0);if(i==="INT32"&&r==="DECIMAL"&&s.byteLength===4)return s.getInt32(0,!0)/10**(t.scale||0);if(i==="INT64"&&r==="DECIMAL"&&s.byteLength===8)return Number(s.getBigInt64(0,!0))/10**(t.scale||0);if(i==="INT32"&&r==="DATE")return n.dateFromDays(s.getInt32(0,!0));if(i==="INT64"&&r==="TIMESTAMP_MILLIS")return n.timestampFromMilliseconds(s.getBigInt64(0,!0));if(i==="INT64"&&r==="TIMESTAMP_MICROS")return n.timestampFromMicroseconds(s.getBigInt64(0,!0));if(i==="INT64"&&o?.type==="TIMESTAMP"&&o?.unit==="NANOS")return n.timestampFromNanoseconds(s.getBigInt64(0,!0));if(i==="INT64"&&o?.type==="TIMESTAMP"&&o?.unit==="MICROS")return n.timestampFromMicroseconds(s.getBigInt64(0,!0));if(i==="INT64"&&o?.type==="TIMESTAMP")return n.timestampFromMilliseconds(s.getBigInt64(0,!0));let f=r?.startsWith("UINT_")||o?.type==="INTEGER"&&!o.isSigned;if(i==="INT32"&&f&&s.byteLength===4)return s.getUint32(0,!0);if(i==="INT64"&&f&&s.byteLength===8)return s.getBigUint64(0,!0);if(i==="INT32"&&s.byteLength===4)return s.getInt32(0,!0);if(i==="INT64"&&s.byteLength===8)return s.getBigInt64(0,!0);if(r==="DECIMAL"){let a=t.scale||0;return a>308?Ce(e)*10**-a:Ce(e)/10**a}return o?.type==="FLOAT16"?yt(e):o?.type==="UUID"?n.uuidFromBytes(e):e}function Sn(e,t,n=void 0){let i={...H,...n},r=j(e);return{null_pages:r.field_1,min_values:r.field_2.map(o=>ie(o,t,i)),max_values:r.field_3.map(o=>ie(o,t,i)),boundary_order:gn[r.field_4],null_counts:r.field_5,repetition_level_histograms:r.field_6,definition_level_histograms:r.field_7}}function Re(e){let t=j(e);return{page_locations:t.field_1.map(n=>({offset:n.field_1,compressed_page_size:n.field_2,first_row_index:n.field_3})),unencoded_byte_array_data_bytes:t.field_2}}var O=0xffffffffffffffffn,oe=0x9e3779b185ebca87n,Fe=0xc2b2ae3d27d4eb4fn,Tn=0x165667b19e3779f9n,vn=0x85ebca77c2b2ae63n,Ln=0x27d4eb2f165667c5n;function Z(e,t){return(e<<t|e>>64n-t)&O}function de(e,t){return e=e+t*Fe&O,e=Z(e,31n),e*oe&O}function Qe(e,t){return e^=de(0n,t),e*oe+vn&O}function z(e,t=0n){let n=new DataView(e.buffer,e.byteOffset,e.byteLength),i=e.byteLength,r=0,o;if(i>=32){let s=t+oe+Fe&O,f=t+Fe&O,a=t,u=t-oe&O;for(;r+32<=i;)s=de(s,n.getBigUint64(r,!0)),r+=8,f=de(f,n.getBigUint64(r,!0)),r+=8,a=de(a,n.getBigUint64(r,!0)),r+=8,u=de(u,n.getBigUint64(r,!0)),r+=8;o=Z(s,1n)+Z(f,7n)+Z(a,12n)+Z(u,18n)&O,o=Qe(o,s),o=Qe(o,f),o=Qe(o,a),o=Qe(o,u)}else o=t+Ln&O;for(o=o+BigInt(i)&O;r+8<=i;)o^=de(0n,n.getBigUint64(r,!0)),o=Z(o,27n)*oe+vn&O,r+=8;for(r+4<=i&&(o^=BigInt(n.getUint32(r,!0))*oe&O,o=Z(o,23n)*Fe+Tn&O,r+=4);r<i;)o^=BigInt(n.getUint8(r))*Ln&O,o=Z(o,11n)*oe&O,r+=1;return o^=o>>33n,o=o*Fe&O,o^=o>>29n,o=o*Tn&O,o^=o>>32n,o}var _r=new TextEncoder,yr=new Uint32Array([1203114875,1150766481,2284105051,2729912477,1884591559,770785867,2667333959,1550580529]);function Ar(e,t){return Number((e>>32n)*BigInt(t)>>32n)}function Er(e){let t=new Uint32Array(8),n=Number(e&0xffffffffn)|0;for(let i=0;i<8;i++)t[i]=1<<(Math.imul(n,yr[i])>>>27);return t}function Lt(e,t){let n=Ar(t,e.length>>3)<<3,i=Er(t);for(let r=0;r<8;r++)if((e[n+r]&i[r])===0)return!1;return!0}function Nn(e){let t=j(e),n=t.field_1;if(typeof n!="number"||n<=0||n%32!==0||!t.field_2?.field_1||!t.field_3?.field_1||!t.field_4?.field_1)return;let{view:i,offset:r}=e;if(r+n>i.byteLength)throw new Error(`parquet bloom filter truncated: need ${n} bytes, have ${i.byteLength-r}`);let o=new Uint32Array(n>>2);for(let s=0;s<o.length;s++)o[s]=i.getUint32(r+s*4,!0);return e.offset=r+n,{numBytes:n,blocks:o}}function vt(e,t){if(e==null)return;let{type:n,converted_type:i,logical_type:r}=t;if(n==="BOOLEAN")return typeof e!="boolean"?void 0:z(new Uint8Array([e?1:0]));if(n==="FLOAT"){if(typeof e!="number")return;let o=new ArrayBuffer(4);return new DataView(o).setFloat32(0,e,!0),z(new Uint8Array(o))}if(n==="DOUBLE"){if(typeof e!="number")return;let o=new ArrayBuffer(8);return new DataView(o).setFloat64(0,e,!0),z(new Uint8Array(o))}if(n==="INT32"){if(i==="DATE"||i==="DECIMAL"||i==="TIME_MILLIS"||r?.type==="DATE"||r?.type==="TIME"||r?.type==="DECIMAL"||typeof e!="number"||!Number.isInteger(e))return;let o=new ArrayBuffer(4);return new DataView(o).setInt32(0,e|0,!0),z(new Uint8Array(o))}if(n==="INT64"){if(i==="TIMESTAMP_MILLIS"||i==="TIMESTAMP_MICROS"||i==="TIME_MICROS"||i==="DECIMAL"||r?.type==="TIMESTAMP"||r?.type==="TIME"||r?.type==="DECIMAL")return;let o;if(typeof e=="bigint")o=e;else if(typeof e=="number"&&Number.isSafeInteger(e))o=BigInt(e);else return;let s=new ArrayBuffer(8);return new DataView(s).setBigUint64(0,BigInt.asUintN(64,o),!0),z(new Uint8Array(s))}if(n==="BYTE_ARRAY")return i==="JSON"||i==="BSON"||i==="DECIMAL"||r?.type==="JSON"||r?.type==="BSON"||r?.type==="VARIANT"||r?.type==="GEOMETRY"||r?.type==="GEOGRAPHY"?void 0:typeof e=="string"?z(_r.encode(e)):e instanceof Uint8Array?z(e):void 0;if(n==="FIXED_LEN_BYTE_ARRAY")return i==="DECIMAL"||i==="INTERVAL"||r?.type==="DECIMAL"||r?.type==="UUID"||r?.type==="FLOAT16"||r?.type==="GEOMETRY"||r?.type==="GEOGRAPHY"?void 0:e instanceof Uint8Array?z(e):void 0}function xn(e){let t=new Set;return Tt(e,t),t}function Tt(e,t){if(e){if("$and"in e&&Array.isArray(e.$and)){for(let n of e.$and)Tt(n,t);return}if("$or"in e&&Array.isArray(e.$or)){for(let n of e.$or)Tt(n,t);return}if(!("$nor"in e))for(let[n,i]of Object.entries(e))n.startsWith("$")||(typeof i=="object"&&i!==null&&!Array.isArray(i)?("$eq"in i||"$in"in i)&&t.add(n):t.add(n))}}function Nt(e,t){for(let i=0;i<t.length;i+=1e4)e.push(...t.slice(i,i+1e4))}function $(e,t,n=!0){if(n?e===t:e==t)return!0;if(!e||!t||typeof e!="object"||typeof t!="object")return!1;if(e instanceof Uint8Array&&t instanceof Uint8Array){if(e.length!==t.length)return!1;for(let r=0;r<e.length;r++)if(e[r]!==t[r])return!1;return!0}if(e instanceof Date||t instanceof Date)return e instanceof Date&&t instanceof Date&&e.getTime()===t.getTime();if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return!1;for(let r=0;r<e.length;r++)if(!$(e[r],t[r],n))return!1;return!0}let i=Object.keys(e);if(i.length!==Object.keys(t).length)return!1;for(let r of i)if(!$(e[r],t[r],n))return!1;return!0}function xt(e){if(!e)return[];if(e.length===1)return e[0];let t=[];for(let n of e)Nt(t,n);return t}var bn=new TextEncoder;function ge(e){if(!e)return[];let t=[];return"$and"in e&&Array.isArray(e.$and)?t.push(...e.$and.flatMap(ge)):"$or"in e&&Array.isArray(e.$or)?t.push(...e.$or.flatMap(ge)):"$nor"in e&&Array.isArray(e.$nor)?t.push(...e.$nor.flatMap(ge)):t.push(...Object.keys(e)),[...new Set(t)]}function Ze(e){return[...new Set(ge(e).map(t=>t.split(".")[0]))]}function J(e,t,n=!0){return"$and"in t&&Array.isArray(t.$and)?t.$and.every(i=>J(e,i,n)):"$or"in t&&Array.isArray(t.$or)?t.$or.some(i=>J(e,i,n)):"$nor"in t&&Array.isArray(t.$nor)?!t.$nor.some(i=>J(e,i,n)):Object.entries(t).every(([i,r])=>{let o=Sr(e,i);return typeof r!="object"||r===null||Array.isArray(r)?$(o,r,n):Object.entries(r||{}).every(([s,f])=>s==="$gt"?o!=null&&o>f:s==="$gte"?o!=null&&o>=f:s==="$lt"?o!=null&&o<f:s==="$lte"?o!=null&&o<=f:s==="$eq"?$(o,f,n):s==="$ne"?!$(o,f,n):s==="$in"?Array.isArray(f)&&On(o,f,n):s==="$nin"?Array.isArray(f)&&!On(o,f,n):s==="$not"?!J({value:o},{value:f},n):!0)})}function On(e,t,n){return t.some(i=>$(e,i,n)||Array.isArray(e)&&e.some(r=>$(r,i,n)))}function he({rowGroup:e,physicalColumns:t,filter:n,strict:i=!0,bloomFilters:r,schemaElements:o}){if(!n)return!1;if("$and"in n&&Array.isArray(n.$and))return n.$and.some(s=>he({rowGroup:e,physicalColumns:t,filter:s,strict:i,bloomFilters:r,schemaElements:o}));if("$or"in n&&Array.isArray(n.$or))return n.$or.every(s=>he({rowGroup:e,physicalColumns:t,filter:s,strict:i,bloomFilters:r,schemaElements:o}));if("$nor"in n&&Array.isArray(n.$nor))return!1;for(let[s,f]of Object.entries(n)){let a=t.indexOf(s);if(a===-1)continue;let u=e.columns[a].meta_data?.statistics,{min:l,max:c,min_value:d,max_value:g,null_count:p}=u||{},h=d!==void 0?d:l,y=g!==void 0?g:c,m=h!==void 0&&y!==void 0,_=r?.[s],E=o?.[s],w=J({value:null},{value:f},i)&&(p===void 0||p>0);if(m&&!w&&Rn(f,h,y,i,E))return!0;for(let[I,N]of Object.entries(f||{}))if(_&&E){if(I==="$eq"){let L=vt(N,E);if(L!==void 0&&!Lt(_.blocks,L))return!0}if(I==="$in"&&Array.isArray(N)&&N.length>0){let L=!0;for(let q of N){let B=vt(q,E);if(B===void 0||Lt(_.blocks,B)){L=!1;break}}if(L)return!0}}}return!1}function Rn(e,t,n,i,r){if(t===void 0||n===void 0)return!1;let o=r?.type==="FLOAT"||r?.type==="DOUBLE"||r?.logical_type?.type==="FLOAT16";for(let[s,f]of Object.entries(e||{})){let a=pe(t,f,i,r),u=pe(n,f,i,r),c=!(t instanceof Uint8Array||n instanceof Uint8Array)&&(r?.type!=="BYTE_ARRAY"||typeof f=="string"&&[...f].every(d=>d.charCodeAt(0)<=127));if(s==="$gt"&&c&&u!==void 0&&u<=0||s==="$gte"&&c&&u!==void 0&&u<0||s==="$lt"&&c&&a!==void 0&&a>=0||s==="$lte"&&c&&a!==void 0&&a>0)return!0;if(s==="$eq"){let d=pe(f,t,i,r),g=pe(f,n,i,r);if(d!==void 0&&d<0||g!==void 0&&g>0)return!0}if(s==="$ne"&&!o&&$(t,n,i)&&$(t,f,i)||s==="$in"&&Array.isArray(f)&&f.every(d=>{let g=pe(d,t,i,r),p=pe(d,n,i,r);return g!==void 0&&g<0||p!==void 0&&p>0})||s==="$nin"&&!o&&Array.isArray(f)&&$(t,n,i)&&f.some(d=>$(t,d,i)))return!0}return!1}function pe(e,t,n,i){if(i?.type==="BYTE_ARRAY")return typeof e!="string"||typeof t!="string"?void 0:Cn(bn.encode(e),bn.encode(t));if(e instanceof Uint8Array||t instanceof Uint8Array)return!(e instanceof Uint8Array)||!(t instanceof Uint8Array)?void 0:Cn(e,t);if(e<t)return-1;if(e>t)return 1;if($(e,t,n))return 0}function Cn(e,t){let n=Math.min(e.length,t.length);for(let i=0;i<n;i++){if(e[i]<t[i])return-1;if(e[i]>t[i])return 1}return e.length<t.length?-1:e.length>t.length?1:0}function wr(e,t){return J({value:null},{value:e},t)}function Xe(e,t,n,i=!0){if(!e)return;if("$and"in e&&Array.isArray(e.$and)){let o;for(let s of e.$and)o=Pn(o,Xe(s,t,n,i));return o}if("$or"in e&&Array.isArray(e.$or)){let o=[];for(let s of e.$or){let f=Xe(s,t,n,i);if(!f)return;o=Ir(o,f)}return o}if("$nor"in e&&Array.isArray(e.$nor))return;let r;for(let[o,s]of Object.entries(e)){let f=t[o];if(!f)continue;let a=wr(s,i),u=[];for(let l=0;l<f.pageStarts.length;l++){let c=f.pageStarts[l],d=l+1<f.pageStarts.length?f.pageStarts[l+1]:n,g=f.nullCounts?.[l],p=a&&(g===void 0||g>0);if(!(!f.nullPages[l]&&!p&&Rn(s,f.minValues[l],f.maxValues[l],i,f.element))){let y=u[u.length-1];y&&y[1]===c?y[1]=d:u.push([c,d])}}r=Pn(r,u)}return r}function Pn(e,t){if(!e)return t;if(!t)return e;let n=[],i=0,r=0;for(;i<e.length&&r<t.length;){let o=Math.max(e[i][0],t[r][0]),s=Math.min(e[i][1],t[r][1]);o<s&&n.push([o,s]),e[i][1]<t[r][1]?i++:r++}return n}function Ir(e,t){let n=[],i=0,r=0;for(;i<e.length||r<t.length;){let o=r>=t.length||i<e.length&&e[i][0]<=t[r][0]?e[i++]:t[r++],s=n[n.length-1];s&&o[0]<=s[1]?s[1]=Math.max(s[1],o[1]):n.push([o[0],o[1]])}return n}function Sr(e,t){let n=e;for(let i of t.split("."))n=n?.[i];return n}var me=1<<21,Tr=8192;function Bn(e){let{metadata:t,rowStart:n=0,columns:i,useOffsetIndex:r=!1}=e;if(!t)throw new Error("parquetPlan requires metadata");let o=[],s=[],f=[],a=kn(e);for(let u of a.groups){let l=$n({...u,columns:i,useOffsetIndex:r});o.push(...l.groups),s.push(...l.fetches),f.push(...l.indexes)}return s.push(..._e(f,0,me)),{metadata:t,rowStart:n,rowEnd:a.rowEnd,columns:i,fetches:s,groups:o}}function kn({metadata:e,rowStart:t=0,rowEnd:n=1/0,columns:i,filter:r,filterStrict:o=!0,bloomFiltersByGroup:s,schemaElements:f,pageRangesByGroup:a,pageLocationsByGroup:u}){if(!e)throw new Error("parquetPlan requires metadata");let l=U(e),c=We(l),d=r?{...Un(l),...f}:f,g=[],p=0;for(let h=0;h<e.row_groups.length;h++){let y=e.row_groups[h],m=Number(y.num_rows),_=p+m;if(m>0&&_>t&&p<n&&!he({rowGroup:y,physicalColumns:c,filter:r,strict:o,bloomFilters:s?.[h],schemaElements:d})){let E=Math.max(t-p,0),w=Math.min(n-p,m),I=a?.[h],N=u?.[h],L=I?I.map(([q,B])=>[Math.max(q,E),Math.min(B,w)]).filter(([q,B])=>q<B):[[E,w]];L.length>1&&(L=y.columns.every(B=>{let te=B.meta_data?.path_in_schema[0],le=B.meta_data?.path_in_schema.join(".");return i&&te&&!i.includes(te)?!0:!!(B.offset_index_offset&&B.offset_index_length)||!!(le&&N?.[le])})?Lr(L,y,i,N):[[L[0][0],L[L.length-1][1]]]),L.length&&g.push({rowGroup:y,groupIndex:h,groupStart:p,groupRows:m,ranges:L,pageRanges:I,pageLocations:N})}p=_}return{groups:g,rowEnd:isFinite(n)?n:p}}function $n({rowGroup:e,groupStart:t,groupRows:n,ranges:i,columns:r,useOffsetIndex:o=!1,pageRanges:s,pageLocations:f}){let a=[],u=[],l=[],c=i.length>1||i[0][0]>0||i[0][1]<n;for(let h of e.columns){let y=h.meta_data;if(h.file_path)throw new Error("parquet file_path not supported");if(!y)throw new Error("parquet column metadata is undefined");if(r&&!r.includes(y.path_in_schema[0]))continue;let m=y.dictionary_page_offset||y.data_page_offset,_=Number(m),E=Number(m+y.total_compressed_size),w=f?.[y.path_in_schema.join(".")];if(w&&c)a.push({columnMetadata:y,pageLocations:w,range:{startByte:_,endByte:E}});else if((o||s)&&h.offset_index_offset&&h.offset_index_length&&c){let I=Number(h.offset_index_offset);a.push({columnMetadata:y,offsetIndex:{startByte:I,endByte:I+h.offset_index_length},range:{startByte:Number(m),endByte:E}})}else a.push({columnMetadata:y,range:{startByte:_,endByte:E}})}let d=[],g;for(let h of a)"pageLocations"in h||("offsetIndex"in h?l.push(h.offsetIndex):r?d.push(h.range):g&&h.range.endByte-g.startByte<=me?g.endByte=h.range.endByte:(g&&u.push(g),g={...h.range}));return g&&u.push(g),u.push(..._e(d,Tr,me)),{groups:i.map(([h,y])=>({chunks:a,rowGroup:e,groupStart:t,groupRows:n,selectStart:h,selectEnd:y})),fetches:u,indexes:l}}function Lr(e,t,n,i){let r=t.columns.filter(s=>!n||n.includes(s.meta_data?.path_in_schema[0]||"")).map(s=>i?.[s.meta_data?.path_in_schema.join(".")||""]),o=[];for(let s of e){let f=o[o.length-1],a=f&&r.some(u=>{if(!u)return!0;let l=Fn(f,u,Number(t.num_rows)),c=Fn(s,u,Number(t.num_rows));return l[0]<=c[1]&&c[0]<=l[1]});f&&a?f[1]=s[1]:o.push([...s])}return o}function Fn([e,t],n,i){let r=1/0,o=-1/0;for(let s=0;s<n.length;s++){let f=Number(n[s].first_row_index);(s+1<n.length?Number(n[s+1].first_row_index):i)>e&&f<t&&(r=Math.min(r,s),o=s)}return[r,o]}async function Mn({file:e,metadata:t,filter:n,filterStrict:i=!0,rowStart:r=0,rowEnd:o=1/0}){let s=t.row_groups.map(()=>({})),f=xn(n);if(f.size===0)return s;let a=We(U(t)),u=[],l=0;if(t.row_groups.forEach((c,d)=>{let g=Number(c.num_rows),p=l+g,h=g>0&&p>r&&l<o;if(l=p,!!h&&!he({rowGroup:c,physicalColumns:a,filter:n,strict:i}))for(let y of f){let m=a.indexOf(y);if(m===-1)continue;let _=c.columns[m]?.meta_data;if(!_?.bloom_filter_offset||!_.bloom_filter_length)continue;let E=Number(_.bloom_filter_offset),w=E+_.bloom_filter_length;u.push({rgIdx:d,colName:y,startByte:E,endByte:w})}}),u.length){let c=ye(e,{fetches:_e(u,0,me)});await Promise.all(u.map(async({rgIdx:d,colName:g,startByte:p,endByte:h})=>{let y=await c.slice(p,h),m=Nn({view:new DataView(y),offset:0});m&&(s[d][g]=m)}))}return s}async function Dn({file:e,metadata:t,filter:n,filterStrict:i=!0,rowStart:r=0,rowEnd:o=1/0,columns:s,bloomFiltersByGroup:f,schemaElements:a,parsers:u}){let l=t.row_groups.map(()=>{}),c=t.row_groups.map(()=>({}));if(n&&"$nor"in n&&Array.isArray(n.$nor))return{pageRangesByGroup:l,pageLocationsByGroup:c};let d=ge(n);if(!d.length)return{pageRangesByGroup:l,pageLocationsByGroup:c};let g=U(t),p=We(g),h={...Un(g),...a},y=[],m=[],_=[],E=0;if(t.row_groups.forEach((w,I)=>{let N=Number(w.num_rows),L=E+N,q=N>0&&L>r&&E<o;if(E=L,!q||he({rowGroup:w,physicalColumns:p,filter:n,strict:i,bloomFilters:f?.[I],schemaElements:h}))return;let B={},te=0,le=new Set,an=!1;for(let Y of d){let ce=p.indexOf(Y);if(ce===-1)continue;let K=w.columns[ce];if(!K?.meta_data||!K.column_index_offset||!K.column_index_length||!K.offset_index_offset||!K.offset_index_length)continue;let ne=h[Y];if(!ne)continue;an=!0,le.add(Y);let ue=Number(K.column_index_offset),Oe=Number(K.offset_index_offset),Ue=ue+K.column_index_length,qe=Oe+K.offset_index_length;y.push({startByte:ue,endByte:Ue},{startByte:Oe,endByte:qe}),te++,m.push(async ln=>{let[Ji,er]=await Promise.all([ln.slice(ue,Ue),ln.slice(Oe,qe)]),Ye=Sn({view:new DataView(Ji),offset:0},ne,u),cn=Re({view:new DataView(er),offset:0});c[I][Y]=cn.page_locations,B[Y]={minValues:Ye.min_values,maxValues:Ye.max_values,nullPages:Ye.null_pages,nullCounts:Ye.null_counts,pageStarts:cn.page_locations.map(tr=>Number(tr.first_row_index)),element:ne}})}if(an)for(let Y of w.columns){let ce=Y.meta_data;if(!ce)continue;let K=ce.path_in_schema[0],De=ce.path_in_schema.join(".");if(s&&!s.includes(K)||le.has(De)||!Y.offset_index_offset||!Y.offset_index_length)continue;le.add(De);let ne=Number(Y.offset_index_offset),ue=ne+Y.offset_index_length;y.push({startByte:ne,endByte:ue}),te++,m.push(async Oe=>{let Ue=await Oe.slice(ne,ue),qe=Re({view:new DataView(Ue),offset:0});c[I][De]=qe.page_locations})}te&&_.push({rgIdx:I,groupRows:N,columnPages:B})}),m.length){let w=ye(e,{fetches:_e(y)});await Promise.all(m.map(I=>I(w)));for(let{rgIdx:I,groupRows:N,columnPages:L}of _)l[I]=Xe(n,L,N,i)}return{pageRangesByGroup:l,pageLocationsByGroup:c}}function _e(e,t=0,n=1/0){let i=e.map(o=>({...o})).sort((o,s)=>o.startByte-s.startByte||o.endByte-s.endByte),r=[];for(let o of i){let s=r[r.length-1];s&&o.startByte<=s.endByte+t&&Math.max(s.endByte,o.endByte)-s.startByte<=n?s.endByte=Math.max(s.endByte,o.endByte):r.push(o)}return r}function Un(e){let t={};function n(i){if(i.children.length)for(let r of i.children)n(r);else t[i.path.join(".")]=i.element}return n(e),t}function ye(e,{fetches:t}){let n=t.map(({startByte:i,endByte:r})=>{try{return e.slice(i,r)}catch(o){return Promise.reject(o)}});return{byteLength:e.byteLength,slice(i,r=e.byteLength){let o=t.findIndex(({startByte:s,endByte:f})=>s<=i&&r<=f);if(o<0)return e.slice(i,r);if(t[o].startByte!==i||t[o].endByte!==r){let s=i-t[o].startByte,f=r-t[o].startByte;return n[o]instanceof Promise?n[o].then(a=>a.slice(s,f)):n[o].slice(s,f)}else return n[o]}}}var Ot=new TextDecoder("utf-8",{ignoreBOM:!0}),qn=new WeakMap;function Ct(e,t=H){if(Array.isArray(e))return e.map(n=>Ct(n,t));if(typeof e!="object")return e;if("metadata"in e){let n=vr(e.metadata),i=e.typed_value&&Je(e.typed_value,n,t),r=e.value&&Be(et(e.value),n,t);return i&&r?{...r,...i}:i??r}return e}function Je(e,t,n){if(e instanceof Date)return e;if(e&&typeof e=="object"&&!Array.isArray(e)&&!(e instanceof Uint8Array)){if("typed_value"in e&&e.typed_value!==null&&e.typed_value!==void 0)return Je(e.typed_value,t,n);if("value"in e&&e.value instanceof Uint8Array)return Be(et(e.value),t,n);if("typed_value"in e||"value"in e)return null;let i={};for(let[r,o]of Object.entries(e))t.dictionary.includes(r)&&(i[r]=Je(o,t,n));return i}return e instanceof Uint8Array?Be(et(e),t,n):Array.isArray(e)?e.map(i=>Je(i,t,n)):e}function et(e){return{view:new DataView(e.buffer,e.byteOffset,e.byteLength),offset:0}}function vr(e){let t=qn.get(e.buffer);t||(t=new Map,qn.set(e.buffer,t));let n=`${e.byteOffset}:${e.byteLength}`,i=t.get(n);if(i)return i;let r=et(e),o=r.view.getUint8(r.offset++),s=o&15;if(s!==1)throw new Error(`parquet unsupported variant metadata version: ${s}`);let f=(o>>4&1)===1,a=(o>>6&3)+1,u=se(r,a),l=new Array(u+1);for(let p=0;p<l.length;p++)l[p]=se(r,a);let c=r.offset,d=new Array(u);for(let p=0;p<u;p++){let h=l[p],y=l[p+1],m=new Uint8Array(e.buffer,e.byteOffset+c+h,y-h);d[p]=Ot.decode(m)}let g={dictionary:d,sorted:f};return t.set(n,g),g}function se(e,t){let n=0;for(let i=0;i<t;i++)n|=e.view.getUint8(e.offset+i)<<i*8;return e.offset+=t,n}function Be(e,t,n){let i=e.view.getUint8(e.offset++),r=i&3,o=i>>2;if(r===0)return Nr(e,o,n);if(r===2)return xr(e,o,t,n);if(r===3)return br(e,o,t,n);let s=new Uint8Array(e.view.buffer,e.view.byteOffset+e.offset,o);return e.offset+=o,Ot.decode(s)}function Nr(e,t,n){switch(t){case 0:return null;case 1:return!0;case 2:return!1;case 3:{let i=e.view.getInt8(e.offset);return e.offset+=1,i}case 4:{let i=e.view.getInt16(e.offset,!0);return e.offset+=2,i}case 5:{let i=e.view.getInt32(e.offset,!0);return e.offset+=4,i}case 6:{let i=e.view.getBigInt64(e.offset,!0);return e.offset+=8,i}case 7:{let i=e.view.getFloat64(e.offset,!0);return e.offset+=8,i}case 8:return bt(e,4);case 9:return bt(e,8);case 10:return bt(e,16);case 11:{let i=e.view.getInt32(e.offset,!0);return e.offset+=4,n.dateFromDays(i)}case 12:case 13:{let i=e.view.getBigInt64(e.offset,!0);return e.offset+=8,n.timestampFromMicroseconds(i)}case 14:{let i=e.view.getFloat32(e.offset,!0);return e.offset+=4,i}case 15:return Yn(e);case 16:{let i=Yn(e);return Ot.decode(i)}case 17:{let i=e.view.getBigInt64(e.offset,!0);return e.offset+=8,i}case 18:case 19:{let i=e.view.getBigInt64(e.offset,!0);return e.offset+=8,n.timestampFromNanoseconds(i)}case 20:{let i=new Uint8Array(e.view.buffer,e.view.byteOffset+e.offset,16);e.offset+=16;let r=Array.from(i,o=>o.toString(16).padStart(2,"0")).join("");return`${r.slice(0,8)}-${r.slice(8,12)}-${r.slice(12,16)}-${r.slice(16,20)}-${r.slice(20)}`}default:throw new Error(`parquet unsupported variant primitive type: ${t}`)}}function xr(e,t,n,i){let r=(t&3)+1,o=(t>>2&3)+1,f=t>>4&1?se(e,4):e.view.getUint8(e.offset++),a=new Array(f);for(let c=0;c<f;c++)a[c]=se(e,o);let u=new Array(f+1);for(let c=0;c<u.length;c++)u[c]=se(e,r);let l={};for(let c=0;c<f;c++){let d=n.dictionary[a[c]],g={view:e.view,offset:e.offset+u[c]};l[d]=Be(g,n,i)}return e.offset+=u[u.length-1],l}function br(e,t,n,i){let r=t&3,o=t>>2&1,s=r+1,f=se(e,o?4:1),a=new Array(f+1);for(let c=0;c<a.length;c++)a[c]=se(e,s);let u=e.offset,l=new Array(f);for(let c=0;c<f;c++){let d={view:e.view,offset:u+a[c]};l[c]=Be(d,n,i)}return e.offset=u+a[a.length-1],l}function bt(e,t){let n=e.view.getUint8(e.offset);e.offset+=1;let i;if(t===4)i=BigInt(e.view.getInt32(e.offset,!0)),e.offset+=4;else if(t===8)i=e.view.getBigInt64(e.offset,!0),e.offset+=8;else{let r=e.view.getBigUint64(e.offset,!0);i=e.view.getBigInt64(e.offset+8,!0)<<64n|r,e.offset+=16}return Number(i)/10**n}function Yn(e){let t=e.view.getUint32(e.offset,!0);e.offset+=4;let n=new Uint8Array(e.view.buffer,e.view.byteOffset+e.offset,t);return e.offset+=t,n}function Pt(e,t,n,i,r){let o=Pe(r);if(!t?.length&&!n.length){if(!o||!i.length)return i;t=new Array(i.length).fill(o)}let s=t?.length||n.length,f=r.map(({element:p})=>p.repetition_type),a=0,u=[e],l=e,c=0,d=0,g=0;if(n[0])for(;c<f.length-2&&g<n[0];)c++,f[c]!=="REQUIRED"&&(l=l.at(-1),u.push(l),d++),f[c]==="REPEATED"&&g++;for(let p=0;p<s;p++){let h=t?.length?t[p]:o,y=n[p];for(;c&&(y<g||f[c]!=="REPEATED");)f[c]!=="REQUIRED"&&(u.pop(),d--),f[c]==="REPEATED"&&g--,c--;for(l=u.at(-1);(c<f.length-2||f[c+1]==="REPEATED")&&(d<h||f[c+1]==="REQUIRED");){if(c++,f[c]!=="REQUIRED"){let m=[];l.push(m),l=m,u.push(m),d++}f[c]==="REPEATED"&&g++}h===o?l.push(i[a++]):c===f.length-2?l.push(f[c+1]==="REPEATED"?[]:null):l.push([])}if(!e.length)for(let p=0;p<o;p++){let h=[];l.push(h),l=h}return e}function Ae(e,t,n,i=0){let r=t.path.join("."),o=t.element.repetition_type==="OPTIONAL",s=o?i+1:i;if(An(t)){let f=t.children[0],a=s;f.children.length===1&&(f=f.children[0],a++),Ae(e,f,n,a);let u=f.path.join("."),l=e.get(u);if(!l)throw new Error("parquet list column missing values");o&&tt(l,i),e.set(r,l),e.delete(u);return}if(En(t)){let f=t.children[0].element.name;Ae(e,t.children[0].children[0],n,s+1),Ae(e,t.children[0].children[1],n,s+1);let a=e.get(`${r}.${f}.key`),u=e.get(`${r}.${f}.value`);if(!a)throw new Error("parquet map column missing keys");if(!u)throw new Error("parquet map column missing values");if(a.length!==u.length)throw new Error("parquet map column key/value length mismatch");let l=Kn(a,u,s);o&&tt(l,i),e.delete(`${r}.${f}.key`),e.delete(`${r}.${f}.value`),e.set(r,l);return}if(t.children.length){let f=t.element.repetition_type==="REQUIRED"?i:i+1,a={};for(let l of t.children){Ae(e,l,n,f);let c=e.get(l.path.join("."));if(!c)throw new Error("parquet struct missing child data");a[l.element.name]=c}for(let l of t.children)e.delete(l.path.join("."));let u=Gn(a,f);t.element.logical_type?.type==="VARIANT"&&(u=Ct(u,n)),o&&tt(u,i),e.set(r,u)}}function tt(e,t){for(let n=0;n<e.length;n++)t?tt(e[n],t-1):e[n]=e[n].length?e[n][0]:null}function Kn(e,t,n){let i=[];for(let r=0;r<e.length;r++)if(n)i.push(Kn(e[r],t[r],n-1));else if(e[r]){let o={};for(let s=0;s<e[r].length;s++){let f=t[r][s];o[e[r][s]]=f===void 0?null:f}i.push(o)}else i.push(void 0);return i}function Gn(e,t){let n=Object.keys(e),i=e[n[0]]?.length,r=[];for(let o=0;o<i;o++){let s={};for(let f of n){if(e[f].length!==i)throw new Error("parquet struct parsing error");s[f]=e[f][o]}t?r.push(Gn(s,t-1)):r.push(s)}return r}var jn=[1,10,100,1e3,1e4,1e5,1e6,1e7,1e8,1e9,1e10,1e11,1e12,1e13,1e14,1e15,1e16,1e17,1e18],Vn=[1,.1,.01,.001,1e-4,1e-5,1e-6,1e-7,1e-8,1e-9,1e-10,1e-11,1e-12,1e-13,1e-14,1e-15,1e-16,1e-17,1e-18],Or=jn.slice(0,11).map(Math.fround),Cr=Vn.slice(0,11).map(Math.fround);function Rt(e,t,n){if(n==="FLOAT")return Pr(e,t);if(n==="DOUBLE")return Rr(e,t);throw new Error(`ALP encoding unsupported type: ${n}`)}function Wn(e){let{view:t}=e,n=t.getUint8(e.offset++);if(n!==0)throw new Error(`ALP unsupported compression mode: ${n}`);let i=t.getUint8(e.offset++);if(i!==0)throw new Error(`ALP unsupported integer encoding: ${i}`);let r=t.getUint8(e.offset++);if(r<3||r>15)throw new Error(`ALP invalid log_vector_size: ${r}`);let o=1<<r,s=t.getInt32(e.offset,!0);e.offset+=4;let f=Math.ceil(s/o),a=e.offset;return e.offset+=f*4,{vectorSize:o,numElements:s,numVectors:f,offsetArrayStart:a}}function Pr(e,t){let{view:n}=e,{vectorSize:i,numElements:r,numVectors:o,offsetArrayStart:s}=Wn(e);if(r!==t)throw new Error(`ALP num_elements ${r} does not match expected ${t}`);let f=new Float32Array(t),a=new Uint8Array(f.buffer);for(let u=0;u<o;u++){e.offset=s+n.getUint32(s+u*4,!0);let l=u*i,c=Math.min(i,r-l),d=n.getUint8(e.offset++),g=n.getUint8(e.offset++),p=n.getUint16(e.offset,!0);e.offset+=2;let h=n.getInt32(e.offset,!0);e.offset+=4;let y=n.getUint8(e.offset++),m=zn(e,c,y),_=Or[g],E=Cr[d];for(let w=0;w<c;w++){let I=m[w]+h|0;f[l+w]=Math.fround(Math.fround(I)*_)*E}Hn(e,p,4,a,l)}return f}function Rr(e,t){let{view:n}=e,{vectorSize:i,numElements:r,numVectors:o,offsetArrayStart:s}=Wn(e);if(r!==t)throw new Error(`ALP num_elements ${r} does not match expected ${t}`);let f=new Float64Array(t),a=new Uint8Array(f.buffer);for(let u=0;u<o;u++){e.offset=s+n.getUint32(s+u*4,!0);let l=u*i,c=Math.min(i,r-l),d=n.getUint8(e.offset++),g=n.getUint8(e.offset++),p=n.getUint16(e.offset,!0);e.offset+=2;let h=n.getBigInt64(e.offset,!0);e.offset+=8;let y=n.getUint8(e.offset++),m=jn[g],_=Vn[d],E=Number(h);if(y<=32&&Number.isSafeInteger(E)){let w=zn(e,c,y);for(let I=0;I<c;I++)f[l+I]=(w[I]+E)*m*_}else{let w=Fr(e,c,y);for(let I=0;I<c;I++){let N=BigInt.asIntN(64,w[I]+h);f[l+I]=Number(N)*m*_}}Hn(e,p,8,a,l)}return f}function Hn(e,t,n,i,r){if(!t)return;let{view:o}=e,s=e.offset,f=s+t*2,a=new Uint8Array(o.buffer,o.byteOffset+f,t*n);for(let u=0;u<t;u++){let l=o.getUint16(s+u*2,!0),c=(r+l)*n;i.set(a.subarray(u*n,(u+1)*n),c)}e.offset=f+t*n}function zn(e,t,n){let i=new Uint32Array(t);if(!n)return i;let{view:r}=e,o=e.offset,s=2**n,f=0;for(let a=0;a<t;a++){let u=o+(f>>>3),l=f&7,c=r.getUint8(u++)>>>l,d=8-l;for(;d<n;)c+=r.getUint8(u++)*2**d,d+=8;i[a]=c%s,f+=n}return e.offset=o+Math.ceil(t*n/8),i}function Fr(e,t,n){let i=new BigUint64Array(t);if(!n)return i;let{view:r}=e,o=e.offset,s=(1n<<BigInt(n))-1n,f=0n,a=0,u=o;for(let l=0;l<t;l++){for(;a<n;)f|=BigInt(r.getUint8(u++))<<BigInt(a),a+=8;i[l]=f&s,f>>=BigInt(n),a-=n}return e.offset=o+Math.ceil(t*n/8),i}function Ee(e,t,n){if(n instanceof Int32Array){Br(e,t,n);return}let i=k(e),r=k(e);k(e);let o=ze(e),s=0;n[s++]=o;let f=i/r;for(;s<t;){let a=ze(e),u=new Uint8Array(r);for(let l=0;l<r;l++)u[l]=e.view.getUint8(e.offset++);for(let l=0;l<r&&s<t;l++){let c=u[l];if(c){let d=0,g=f,p=(1n<<BigInt(c))-1n;for(;g&&s<t;){let h=BigInt(e.view.getUint32(e.offset,!0)>>>d)&p;for(d+=c;d>=32;)d-=32,e.offset+=4,d&&(h|=BigInt(e.view.getUint32(e.offset,!0))<<BigInt(c-d)&p);let y=a+h;o+=y,n[s++]=o,g--}g&&(e.offset+=Math.ceil((g*c+d)/8))}else for(let d=0;d<f&&s<t;d++)o+=a,n[s++]=o}}}function Br(e,t,n){let i=k(e),r=k(e);k(e);let o=He(e),s=0;n[s++]=o;let f=i/r,{view:a}=e;for(;s<t;){let u=kr(e),l=e.offset,c=l+r;for(let d=0;d<r&&s<t;d++){let g=a.getUint8(l+d),p=c+f*g/8,h=0;for(let y=0;y<f&&s<t;y++){let m=0,_=0;for(;_<g;){let E=Math.min(8-h,g-_);_<32&&(m|=(a.getUint8(c)>>>h&(1<<E)-1)<<_),_+=E,h+=E,h===8&&(h=0,c++)}o=o+u+m|0,n[s++]=o}c=p}e.offset=c}}function kr(e){let t=e.offset,n=k(e),i=e.offset-t===5?e.view.getUint8(t+4)>>>4&1:0;return(n>>>1|i<<31)^-(n&1)}function Ft(e,t,n){let i=new Int32Array(t);Ee(e,t,i);for(let r=0;r<t;r++)n[r]=new Uint8Array(e.view.buffer,e.view.byteOffset+e.offset,i[r]),e.offset+=i[r]}function Bt(e,t,n){let i=new Int32Array(t);Ee(e,t,i);let r=new Int32Array(t);Ee(e,t,r);for(let o=0;o<t;o++){let s=new Uint8Array(e.view.buffer,e.view.byteOffset+e.offset,r[o]);i[o]?(n[o]=new Uint8Array(i[o]+r[o]),n[o].set(n[o-1].subarray(0,i[o])),n[o].set(s,i[o])):n[o]=s,e.offset+=r[o]}}function Q(e,t,n,i){i===void 0&&(i=e.view.getUint32(e.offset,!0),e.offset+=4);let r=e.offset,o=0;for(;o<n.length;){let s=k(e);if(s&1)o=Mr(e,s,t,n,o);else{let f=s>>>1;$r(e,f,t,n,o),o+=f}}e.offset=r+i}function $r(e,t,n,i,r){let o=n+7>>3,s=0;for(let f=0;f<o;f++)s|=e.view.getUint8(e.offset++)<<(f<<3);for(let f=0;f<t;f++)i[r+f]=s}function Mr(e,t,n,i,r){let o=t>>1<<3,s=(1<<n)-1,f=0;if(e.offset<e.view.byteLength)f=e.view.getUint8(e.offset++);else if(s)throw new Error(`parquet bitpack offset ${e.offset} out of range`);let a=8,u=0;for(;o;)u>8?(u-=8,a-=8,f>>>=8):a-u<n?(f|=e.view.getUint8(e.offset)<<a,e.offset++,a+=8):(r<i.length&&(i[r++]=f>>u&s),o--,u+=n);return r}function kt(e,t,n,i){let r=Dr(n,i),o=new Uint8Array(t*r);for(let s=0;s<r;s++)for(let f=0;f<t;f++)o[f*r+s]=e.view.getUint8(e.offset++);if(n==="FLOAT")return new Float32Array(o.buffer);if(n==="DOUBLE")return new Float64Array(o.buffer);if(n==="INT32")return new Int32Array(o.buffer);if(n==="INT64")return new BigInt64Array(o.buffer);if(n==="FIXED_LEN_BYTE_ARRAY"){let s=new Array(t);for(let f=0;f<t;f++)s[f]=o.subarray(f*r,(f+1)*r);return s}throw new Error(`parquet byte_stream_split unsupported type: ${n}`)}function Dr(e,t){switch(e){case"INT32":case"FLOAT":return 4;case"INT64":case"DOUBLE":return 8;case"FIXED_LEN_BYTE_ARRAY":if(!t)throw new Error("parquet byteWidth missing type_length");return t;default:throw new Error(`parquet unsupported type: ${e}`)}}function ke(e,t,n,i){if(n===0)return[];if(t==="BOOLEAN")return Ur(e,n);if(t==="INT32")return qr(e,n);if(t==="INT64")return Yr(e,n);if(t==="INT96")return Kr(e,n);if(t==="FLOAT")return Gr(e,n);if(t==="DOUBLE")return jr(e,n);if(t==="BYTE_ARRAY")return Vr(e,n);if(t==="FIXED_LEN_BYTE_ARRAY"){if(!i)throw new Error("parquet missing fixed length");return Wr(e,n,i)}else throw new Error(`parquet unhandled type: ${t}`)}function Ur(e,t){let n=new Array(t);for(let i=0;i<t;i++){let r=e.offset+(i/8|0),o=i%8,s=e.view.getUint8(r);n[i]=(s&1<<o)!==0}return e.offset+=Math.ceil(t/8),n}function qr(e,t){let n=(e.view.byteOffset+e.offset)%4?new Int32Array(nt(e.view.buffer,e.view.byteOffset+e.offset,t*4)):new Int32Array(e.view.buffer,e.view.byteOffset+e.offset,t);return e.offset+=t*4,n}function Yr(e,t){let n=(e.view.byteOffset+e.offset)%8?new BigInt64Array(nt(e.view.buffer,e.view.byteOffset+e.offset,t*8)):new BigInt64Array(e.view.buffer,e.view.byteOffset+e.offset,t);return e.offset+=t*8,n}function Kr(e,t){let n=new Array(t);for(let i=0;i<t;i++){let r=e.view.getBigInt64(e.offset+i*12,!0),o=e.view.getInt32(e.offset+i*12+8,!0);n[i]=BigInt(o)<<64n|r}return e.offset+=t*12,n}function Gr(e,t){let n=(e.view.byteOffset+e.offset)%4?new Float32Array(nt(e.view.buffer,e.view.byteOffset+e.offset,t*4)):new Float32Array(e.view.buffer,e.view.byteOffset+e.offset,t);return e.offset+=t*4,n}function jr(e,t){let n=(e.view.byteOffset+e.offset)%8?new Float64Array(nt(e.view.buffer,e.view.byteOffset+e.offset,t*8)):new Float64Array(e.view.buffer,e.view.byteOffset+e.offset,t);return e.offset+=t*8,n}function Vr(e,t){let n=new Array(t);for(let i=0;i<t;i++){let r=e.view.getUint32(e.offset,!0);e.offset+=4,n[i]=new Uint8Array(e.view.buffer,e.view.byteOffset+e.offset,r),e.offset+=r}return n}function Wr(e,t,n){let i=new Array(t);for(let r=0;r<t;r++)i[r]=new Uint8Array(e.view.buffer,e.view.byteOffset+e.offset,n),e.offset+=n;return i}function nt(e,t,n){let i=new ArrayBuffer(n);return new Uint8Array(i).set(new Uint8Array(e,t,n)),i}var Hr=[0,255,65535,16777215,4294967295];function Qn(e,t,n,i,r){for(let o=0;o<r;o++)n[i+o]=e[t+o]}function Xn(e,t){let n=e.byteLength,i=t.byteLength,r=0,o=0;for(;r<n;){let s=e[r];if(r++,s<128)break}if(i&&r>=n)throw new Error("invalid snappy length header");for(;r<n;){let s=e[r],f=0;if(r++,r>=n)throw new Error("missing eof marker");if((s&3)===0){let a=(s>>>2)+1;if(a>60){if(r+3>=n)throw new Error("snappy error literal pos + 3 >= inputLength");let u=a-60;a=e[r]+(e[r+1]<<8)+(e[r+2]<<16)+(e[r+3]<<24),a=(a&Hr[u])+1,r+=u}if(r+a>n)throw new Error("snappy error literal exceeds input length");Qn(e,r,t,o,a),r+=a,o+=a}else{let a=0;switch(s&3){case 1:f=(s>>>2&7)+4,a=e[r]+(s>>>5<<8),r++;break;case 2:if(n<=r+1)throw new Error("snappy error end of input");f=(s>>>2)+1,a=e[r]+(e[r+1]<<8),r+=2;break;case 3:if(n<=r+3)throw new Error("snappy error end of input");f=(s>>>2)+1,a=e[r]+(e[r+1]<<8)+(e[r+2]<<16)+(e[r+3]<<24),r+=4;break;default:break}if(a===0||isNaN(a))throw new Error(`invalid offset ${a} pos ${r} inputLength ${n}`);if(a>o)throw new Error("cannot copy from before start of buffer");Qn(t,o-a,t,o,f),o+=f}}if(o!==i)throw new Error("premature end of input")}function Zn(e,t,{type:n,element:i,schemaPath:r}){let o=new DataView(e.buffer,e.byteOffset,e.byteLength),s={view:o,offset:0},f,a=zr(s,t,r),{definitionLevels:u,numNulls:l}=Qr(s,t,r),c=t.num_values-l;if(t.encoding==="PLAIN")f=ke(s,n,c,i.type_length);else if(t.encoding==="PLAIN_DICTIONARY"||t.encoding==="RLE_DICTIONARY"||t.encoding==="RLE"){let d=n==="BOOLEAN"?1:o.getUint8(s.offset++);d?(f=new Array(c),n==="BOOLEAN"?(Q(s,d,f),f=f.map(g=>!!g)):Q(s,d,f,o.byteLength-s.offset)):f=new Uint8Array(c)}else if(t.encoding==="BYTE_STREAM_SPLIT")f=kt(s,c,n,i.type_length);else if(t.encoding==="ALP")f=Rt(s,c,n);else if(t.encoding==="DELTA_BINARY_PACKED")f=n==="INT32"?new Int32Array(c):new BigInt64Array(c),Ee(s,c,f);else if(t.encoding==="DELTA_LENGTH_BYTE_ARRAY")f=new Array(c),Ft(s,c,f);else if(t.encoding==="DELTA_BYTE_ARRAY")f=new Array(c),Bt(s,c,f);else throw new Error(`parquet unsupported encoding: ${t.encoding}`);return{definitionLevels:u,repetitionLevels:a,dataPage:f}}function zr(e,t,n){if(n.length>1){let i=Et(n);if(i){let r=new Array(t.num_values);return Q(e,rt(i),r),r}}return[]}function Qr(e,t,n){let i=Pe(n);if(!i)return{definitionLevels:[],numNulls:0};let r=new Array(t.num_values);Q(e,rt(i),r);let o=t.num_values;for(let s of r)s===i&&o--;return o===0&&(r.length=0),{definitionLevels:r,numNulls:o}}function it(e,t,n,i){let r,o=i?.[n];if(n==="UNCOMPRESSED")r=e;else if(o)r=o(e,t);else if(n==="SNAPPY")r=new Uint8Array(t),Xn(e,r);else throw new Error(`parquet unsupported compression codec: ${n}`);if(r?.length!==t)throw new Error(`parquet decompressed page length ${r?.length} does not match header ${t}`);return r}function Jn(e,t,n){let r={view:new DataView(e.buffer,e.byteOffset,e.byteLength),offset:0},{type:o,element:s,schemaPath:f,codec:a,compressors:u}=n,l=t.data_page_header_v2;if(!l)throw new Error("parquet data page header v2 is undefined");let c=Xr(r,l,f);r.offset=l.repetition_levels_byte_length;let d=Zr(r,l,f),g=t.uncompressed_page_size-l.definition_levels_byte_length-l.repetition_levels_byte_length,p=e.subarray(r.offset);l.is_compressed!==!1&&g&&(p=it(p,g,a,u));let h=new DataView(p.buffer,p.byteOffset,p.byteLength),y={view:h,offset:0},m,_=l.num_values-l.num_nulls;if(l.encoding==="PLAIN")m=ke(y,o,_,s.type_length);else if(l.encoding==="RLE")m=new Array(_),Q(y,1,m),m=m.map(E=>!!E);else if(l.encoding==="PLAIN_DICTIONARY"||l.encoding==="RLE_DICTIONARY"){let E=h.getUint8(y.offset++);m=new Array(_),Q(y,E,m,g-1)}else if(l.encoding==="DELTA_BINARY_PACKED")m=o==="INT32"?new Int32Array(_):new BigInt64Array(_),Ee(y,_,m);else if(l.encoding==="DELTA_LENGTH_BYTE_ARRAY")m=new Array(_),Ft(y,_,m);else if(l.encoding==="DELTA_BYTE_ARRAY")m=new Array(_),Bt(y,_,m);else if(l.encoding==="BYTE_STREAM_SPLIT")m=kt(y,_,o,s.type_length);else if(l.encoding==="ALP")m=Rt(y,_,o);else throw new Error(`parquet unsupported encoding: ${l.encoding}`);return{definitionLevels:d,repetitionLevels:c,dataPage:m}}function Xr(e,t,n){let i=Et(n);if(!i)return[];let r=new Array(t.num_values);return Q(e,rt(i),r,t.repetition_levels_byte_length),r}function Zr(e,t,n){let i=Pe(n);if(i){let r=new Array(t.num_values);return Q(e,rt(i),r,t.definition_levels_byte_length),r}}function rt(e){return 32-Math.clz32(e)}function $t(e,{groupStart:t,selectStart:n,selectEnd:i},r,o){let{pathInSchema:s,schemaPath:f}=r,a=wt(f),u=[],l,c,d=0,g=0,p=o&&(()=>{c&&o({pathInSchema:s,columnData:c,rowStart:t+d-c.length,rowEnd:t+d})});for(;(a?d<i:e.offset<e.view.byteLength-1)&&!(e.offset>=e.view.byteLength-1);){let h=Jr(e);if(h.type==="DICTIONARY_PAGE"){let{data:y}=ei(e,h,r,l,void 0,0);y&&(l=_t(y,r))}else{let y=c?.length||0,m=ei(e,h,r,l,c,n-d);m.skipped?(u.length||(g+=m.skipped),d+=m.skipped):m.data&&c===m.data?d+=m.data.length-y:m.data&&m.data.length&&(p?.(),u.push(m.data),d+=m.data.length,c=m.data)}}return p?.(),{data:u,skipped:g}}function ei(e,t,n,i,r,o){let{type:s,element:f,schemaPath:a,codec:u,compressors:l}=n,c=new Uint8Array(e.view.buffer,e.view.byteOffset+e.offset,t.compressed_page_size);if(e.offset+=t.compressed_page_size,t.type==="DATA_PAGE"){let d=t.data_page_header;if(!d)throw new Error("parquet data page header is undefined");if(o>d.num_values&&wt(a))return{skipped:d.num_values};let g=it(c,Number(t.uncompressed_page_size),u,l),{definitionLevels:p,repetitionLevels:h,dataPage:y}=Zn(g,d,n),m=mt(y,i,d.encoding,n),_=Array.isArray(r)?r:[];return{skipped:0,data:Pt(_,p,h,m,a)}}else if(t.type==="DATA_PAGE_V2"){let d=t.data_page_header_v2;if(!d)throw new Error("parquet data page header v2 is undefined");if(o>d.num_rows)return{skipped:d.num_rows};let{definitionLevels:g,repetitionLevels:p,dataPage:h}=Jn(c,t,n),y=mt(h,i,d.encoding,n),m=Array.isArray(r)?r:[];return{skipped:0,data:Pt(m,g,p,y,a)}}else if(t.type==="DICTIONARY_PAGE"){let d=t.dictionary_page_header;if(!d)throw new Error("parquet dictionary page header is undefined");let g=it(c,Number(t.uncompressed_page_size),u,l),p={view:new DataView(g.buffer,g.byteOffset,g.byteLength),offset:0};return{skipped:0,data:ke(p,s,d.num_values,f.type_length)}}else throw new Error(`parquet unsupported page type: ${t.type}`)}function Jr(e){let t=j(e),n=Ge[t.field_1],i=t.field_2,r=t.field_3,o=t.field_4,s=t.field_5&&{num_values:t.field_5.field_1,encoding:W[t.field_5.field_2],definition_level_encoding:W[t.field_5.field_3],repetition_level_encoding:W[t.field_5.field_4],statistics:ti(t.field_5.field_5)},f=t.field_6,a=t.field_7&&{num_values:t.field_7.field_1,encoding:W[t.field_7.field_2],is_sorted:t.field_7.field_3},u=t.field_8&&{num_values:t.field_8.field_1,num_nulls:t.field_8.field_2,num_rows:t.field_8.field_3,encoding:W[t.field_8.field_4],definition_levels_byte_length:t.field_8.field_5,repetition_levels_byte_length:t.field_8.field_6,is_compressed:t.field_8.field_7===void 0?!0:t.field_8.field_7,statistics:ti(t.field_8.field_8)};return{type:n,uncompressed_page_size:i,compressed_page_size:r,crc:o,data_page_header:s,index_page_header:f,dictionary_page_header:a,data_page_header_v2:u}}function ti(e){return e&&{max:e.field_1,min:e.field_2,null_count:e.field_3,distinct_count:e.field_4,max_value:e.field_5,min_value:e.field_6,is_max_value_exact:e.field_7,is_min_value_exact:e.field_8}}function ii(e,{metadata:t},n){let i=[],r=U(t),o=n.chunks.filter(a=>"pageLocations"in a||"offsetIndex"in a),s=Promise.all(o.map(async a=>{if("pageLocations"in a)return ni(n,a,a.pageLocations);if(!("offsetIndex"in a))throw new Error("parquet expected offset index");let u=await e.file.slice(a.offsetIndex.startByte,a.offsetIndex.endByte),l=Re({view:new DataView(u),offset:0}).page_locations;return ni(n,a,l)})).then(a=>{let u=a.flatMap(c=>c.fetches);return{file:ye(e.file,{fetches:_e(u,0,me)}),selections:a}}),f=0;for(let a of n.chunks){let{path_in_schema:u}=a.columnMetadata,l=At(r,u),c={pathInSchema:u,element:l[l.length-1].element,schemaPath:l,...e,...a.columnMetadata,parsers:{...H,...e.parsers}},{startByte:d,endByte:g}=a.range;if("pageLocations"in a||"offsetIndex"in a){let p=f++;i.push({pathInSchema:u,data:s.then(({file:h,selections:y})=>eo({...e,file:h},n,y[p],c))})}else i.push({pathInSchema:u,data:Promise.resolve(e.file.slice(d,g)).then(p=>{let h={view:new DataView(p),offset:0};return $t(h,n,c,e.onPage)})})}return{groupStart:n.groupStart,groupRows:n.groupRows,selectStart:n.selectStart,selectEnd:n.selectEnd,asyncColumns:i}}function ni(e,t,n){let{data_page_offset:i,dictionary_page_offset:r}=t.columnMetadata,{selectStart:o,selectEnd:s}=e,{startByte:f,endByte:a}=t.range,u=-1,l=r||i<n[0].offset;for(let d=0;d<n.length;d++){let g=n[d],p=Number(g.first_row_index),h=d+1<n.length?Number(n[d+1].first_row_index):e.groupRows;u<0&&h>o&&(f=Number(g.offset),u=p),p<s&&(a=Number(g.offset)+g.compressed_page_size)}if(u<0&&(u=0),!l)return{skipped:u,fetches:[{startByte:f,endByte:a}]};if(!u)return{skipped:u,fetches:[{startByte:t.range.startByte,endByte:a}]};let c={startByte:t.range.startByte,endByte:Number(n[0].offset)};return{skipped:u,fetches:[c,{startByte:f,endByte:a}]}}async function eo(e,t,{skipped:n,fetches:i},r){let o;if(i.length>1){let[l,c]=i,d=l.endByte-l.startByte,[g,p]=await Promise.all([e.file.slice(l.startByte,l.endByte),e.file.slice(c.startByte,c.endByte)]),h=new Uint8Array(d+p.byteLength);h.set(new Uint8Array(g,0,d)),h.set(new Uint8Array(p),d),o=new DataView(h.buffer)}else o=new DataView(await e.file.slice(i[0].startByte,i[0].endByte));let s={view:o,offset:0},f=n?{...t,groupStart:t.groupStart+n,selectStart:t.selectStart-n,selectEnd:t.selectEnd-n}:t,{data:a,skipped:u}=$t(s,f,r,e.onPage);return{data:a,skipped:n+u}}async function Mt({asyncColumns:e},t,n,i,r){let o=await Promise.all(e.map(c=>c.data.then(({skipped:d,data:g})=>({skipped:d,data:xt(g)})))),s=n-t;if(r==="object"){let c=Array(s);for(let d=0;d<s;d++){let g={};for(let p=0;p<e.length;p++){let{data:h,skipped:y}=o[p];g[e[p].pathInSchema[0]]=h[t+d-y]}c[d]=g}return c}let f=e.map(c=>c.pathInSchema[0]).filter(c=>!i||i.includes(c)),a=i??f,u=a.map(c=>e.findIndex(d=>d.pathInSchema[0]===c)),l=Array(s);for(let c=0;c<s;c++){let d=Array(e.length);for(let g=0;g<a.length;g++){let p=u[g];if(p<0)throw new Error(`parquet column not found: ${a[g]}`);let{data:h,skipped:y}=o[p];d[g]=h[t+c-y]}l[c]=d}return l}function Dt(e,t,n){let{asyncColumns:i}=e,r={...H,...n},o=[];for(let s of t.children)if(s.children.length){let f=i.filter(a=>a.pathInSchema[0]===s.element.name);if(!f.length)continue;o.push({pathInSchema:s.path,data:(async()=>{let a=await Promise.all(f.map(p=>p.data)),u=new Map,l=a.map(({data:p})=>xt(p)),c=Math.max(e.selectStart??0,...a.map(p=>p.skipped)),d=Math.min(e.selectEnd??1/0,...a.map((p,h)=>p.skipped+l[h].length));for(let p=0;p<f.length;p++){let h=c-a[p].skipped,y=Math.max(0,d-c);u.set(f[p].pathInSchema.join("."),l[p].slice(h,h+y))}Ae(u,s,r);let g=u.get(s.element.name);if(!g)throw new Error("parquet column data not assembled");return{data:[g],skipped:c}})()})}else{let f=i.find(a=>a.pathInSchema[0]===s.element.name);f&&o.push(f)}return{...e,asyncColumns:o}}async function ri(e){let t=await to(e);return{options:t,plan:Bn(t)}}async function to(e){let t=e.metadata??await re(e.file,e),n=U(t).children.map(s=>s.element.name),r=Ze(e.filter).filter(s=>!n.includes(s));if(r.length)throw new Error(`parquet filter columns not found: ${r.join(", ")}`);if(e.columns){let s=e.columns.filter(f=>!n.includes(f));if(s.length)throw new Error(`parquet column not found: ${s[0]}`)}let o={...e,metadata:t};return o=await no(o),o=await io(o),o}function oi(e,t){let n={...e,file:ye(e.file,t)};return t.groups.map(i=>ii(n,t,i))}async function no(e){if(!e.useBloomFilters||!e.filter||!e.metadata)return e;let t=U(e.metadata),n={};for(let r of t.children)n[r.element.name]=r.element;let i=await Mn({file:e.file,metadata:e.metadata,filter:e.filter,filterStrict:e.filterStrict,rowStart:e.rowStart,rowEnd:e.rowEnd});return{...e,bloomFiltersByGroup:i,schemaElements:n}}async function io(e){if(!e.usePageIndex||!e.filter||!e.metadata)return e;let{pageRangesByGroup:t,pageLocationsByGroup:n}=await Dn({file:e.file,metadata:e.metadata,filter:e.filter,filterStrict:e.filterStrict,rowStart:e.rowStart,rowEnd:e.rowEnd,columns:e.columns,bloomFiltersByGroup:e.bloomFiltersByGroup,schemaElements:e.schemaElements,parsers:e.parsers});return{...e,pageRangesByGroup:t,pageLocationsByGroup:n}}var si=Symbol("rowIndex");async function fi(e){e.metadata??=await re(e.file,e);let{rowStart:t=0,rowEnd:n,columns:i,onChunk:r,onComplete:o,rowFormat:s,filter:f,filterStrict:a=!0}=e;if(f&&s!=="object")throw new Error('parquet filter requires rowFormat: "object"');if(e.includeRowIndex&&s!=="object")throw new Error('parquet includeRowIndex requires rowFormat: "object"');let u=Ze(f),l=i;if(i&&u.length){let _=new Set(i),E=u.filter(w=>!_.has(w));E.length&&(l=[...i,...E])}let c=l===i?e:{...e,columns:l},d=await ri(c),g=d.options,p=l!==i,h=oi(g,d.plan);if(!o&&!r){await Ut(h);return}if(!g.metadata)throw new Error("parquet requires metadata");let y=U(g.metadata),m=h.map(_=>Dt(_,y,e.parsers));if(r)for(let _ of m)for(let E of _.asyncColumns)E.data.then(({data:w,skipped:I})=>{let N=_.groupStart+I;for(let L of w)r({columnName:E.pathInSchema[0],columnData:L,rowStart:N,rowEnd:N+L.length}),N+=L.length},()=>{});if(o){await Ut(m);let _=[];for(let E of m){let w=E.selectStart??Math.max(t-E.groupStart,0),I=E.selectEnd??Math.min((n??1/0)-E.groupStart,E.groupRows),N=s==="object"?await Mt(E,w,I,l,"object"):await Mt(E,w,I,i,"array");if(e.includeRowIndex)for(let L=0;L<N.length;L++)Object.defineProperty(N[L],si,{value:E.groupStart+w+L});if(f){for(let L of N)if(J(L,f,a)){if(p&&i)for(let q of u)i.includes(q)||delete L[q];_.push(L)}}else Nt(_,N)}o(_)}else await Ut(m)}async function Ut(e){let t=e.flatMap(r=>r.asyncColumns.map(o=>o.data)),i=(await Promise.allSettled(t)).find(r=>r.status==="rejected");if(i)throw i.reason}function qt(e){return new Promise((t,n)=>{fi({...e,rowFormat:"object",onComplete:t}).catch(n)})}var T=Symbol("NOT_RESOLVED");function R(e,t){return{tagName:e,nodeKind:"scalar",implicit:t.implicit??!1,matchByTagPrefix:t.matchByTagPrefix??!1,implicitFirstChars:t.implicitFirstChars??null,resolve:t.resolve,identify:t.identify,represent:t.represent??(n=>String(n)),representTagName:t.representTagName??(()=>e)}}function en(e,t){let n=t.finalize===void 0;return{tagName:e,nodeKind:"sequence",implicit:!1,matchByTagPrefix:t.matchByTagPrefix??!1,create:t.create,addItem:t.addItem,finalize:t.finalize??(i=>i),carrierIsResult:n,identify:t.identify,represent:t.represent??(i=>i),representTagName:t.representTagName??(()=>e)}}function at(e,t){let n=t.finalize===void 0;return{tagName:e,nodeKind:"mapping",implicit:!1,matchByTagPrefix:t.matchByTagPrefix??!1,create:t.create,addPair:t.addPair,has:t.has,keys:t.keys,get:t.get,finalize:t.finalize??(i=>i),carrierIsResult:n,identify:t.identify,represent:t.represent??(i=>i),representTagName:t.representTagName??(()=>e)}}var ro=R("tag:yaml.org,2002:str",{resolve:e=>e,identify:e=>typeof e=="string"}),oo=["","~","null","Null","NULL"],so=R("tag:yaml.org,2002:null",{implicit:!0,implicitFirstChars:["","~","n","N"],resolve:e=>oo.indexOf(e)!==-1?null:T,identify:e=>e===null,represent:()=>"null"}),fo=R("tag:yaml.org,2002:null",{implicit:!0,implicitFirstChars:["n"],resolve:(e,t)=>e==="null"||t&&e===""?null:T,identify:e=>e===null,represent:()=>"null"}),ao=["","~","null","Null","NULL"],lo=R("tag:yaml.org,2002:null",{implicit:!0,implicitFirstChars:["","~","n","N"],resolve:e=>ao.indexOf(e)!==-1?null:T,identify:e=>e===null,represent:()=>"null"}),co=["true","True","TRUE"],uo=["false","False","FALSE"],po=R("tag:yaml.org,2002:bool",{implicit:!0,implicitFirstChars:["t","T","f","F"],resolve:e=>co.indexOf(e)!==-1?!0:uo.indexOf(e)!==-1?!1:T,identify:e=>Object.prototype.toString.call(e)==="[object Boolean]",represent:e=>e?"true":"false"}),go=["true"],ho=["false"],mo=R("tag:yaml.org,2002:bool",{implicit:!0,implicitFirstChars:["t","f"],resolve:e=>go.indexOf(e)!==-1?!0:ho.indexOf(e)!==-1?!1:T,identify:e=>Object.prototype.toString.call(e)==="[object Boolean]",represent:e=>e?"true":"false"}),_o=["true","True","TRUE","y","Y","yes","Yes","YES","on","On","ON"],yo=["false","False","FALSE","n","N","no","No","NO","off","Off","OFF"],Ao=R("tag:yaml.org,2002:bool",{implicit:!0,implicitFirstChars:["y","Y","n","N","t","T","f","F","o","O"],resolve:e=>_o.indexOf(e)!==-1?!0:yo.indexOf(e)!==-1?!1:T,identify:e=>Object.prototype.toString.call(e)==="[object Boolean]",represent:e=>e?"true":"false"}),Eo=new RegExp("^(?:0o[0-7]+|0x[0-9a-fA-F]+|[-+]?[0-9]+)$"),wo=new RegExp("^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$");function Io(e){let t=e,n=1;return(t[0]==="-"||t[0]==="+")&&(t[0]==="-"&&(n=-1),t=t.slice(1)),t.startsWith("0b")?n*parseInt(t.slice(2),2):t.startsWith("0o")?n*parseInt(t.slice(2),8):t.startsWith("0x")?n*parseInt(t.slice(2),16):n*parseInt(t,10)}function So(e,t){if(t){if(!wo.test(e))return T}else if(!Eo.test(e))return T;let n=Io(e);return Number.isFinite(n)?n:T}var Ii=R("tag:yaml.org,2002:int",{implicit:!0,implicitFirstChars:["-","+",..."0123456789"],resolve:So,identify:e=>Number.isInteger(e)&&!Object.is(e,-0)&&e.toString(10).indexOf("e")<0,represent:e=>e.toString(10)}),To=new RegExp("^-?(?:0|[1-9][0-9]*)$"),Lo=new RegExp("^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$");function vo(e){let t=e,n=1;return(t[0]==="-"||t[0]==="+")&&(t[0]==="-"&&(n=-1),t=t.slice(1)),t.startsWith("0b")?n*parseInt(t.slice(2),2):t.startsWith("0o")?n*parseInt(t.slice(2),8):t.startsWith("0x")?n*parseInt(t.slice(2),16):n*parseInt(t,10)}function No(e,t){if(t){if(!Lo.test(e))return T}else if(!To.test(e))return T;let n=vo(e);return Number.isFinite(n)?n:T}var xo=R("tag:yaml.org,2002:int",{implicit:!0,implicitFirstChars:["-",..."0123456789"],resolve:No,identify:e=>Number.isInteger(e)&&!Object.is(e,-0)&&e.toString(10).indexOf("e")<0,represent:e=>e.toString(10)}),bo=new RegExp("^(?:[-+]?0b[0-1_]+|[-+]?0[0-7_]+|[-+]?0x[0-9a-fA-F_]+|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+|[-+]?(?:0|[1-9][0-9_]*))$");function Oo(e){let t=e.replace(/_/g,""),n=1;if((t[0]==="-"||t[0]==="+")&&(t[0]==="-"&&(n=-1),t=t.slice(1)),t.startsWith("0b"))return n*parseInt(t.slice(2),2);if(t.startsWith("0x"))return n*parseInt(t.slice(2),16);if(t.includes(":")){let i=0;for(let r of t.split(":"))i=i*60+Number(r);return n*i}return t!=="0"&&t[0]==="0"?n*parseInt(t,8):n*parseInt(t,10)}function Co(e){if(!bo.test(e))return T;let t=Oo(e);return Number.isFinite(t)?t:T}var Ht=R("tag:yaml.org,2002:int",{implicit:!0,implicitFirstChars:["-","+",..."0123456789"],resolve:Co,identify:e=>Number.isInteger(e)&&!Object.is(e,-0)&&e.toString(10).indexOf("e")<0,represent:e=>e.toString(10)}),Po=new RegExp("^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"),Ro=new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function Fo(e){if(!Po.test(e))return T;let t=e.toLowerCase(),n=t[0]==="-"?-1:1;if("+-".includes(t[0])&&(t=t.slice(1)),t===".inf")return n===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY;if(t===".nan")return NaN;let i=n*parseFloat(t);return Number.isFinite(i)||Ro.test(e)?i:T}function Bo(e){if(isNaN(e))return".nan";if(e===Number.POSITIVE_INFINITY)return".inf";if(e===Number.NEGATIVE_INFINITY)return"-.inf";if(Object.is(e,-0))return"-0.0";let t=e.toString(10);return/^[-+]?[0-9]+e/.test(t)?t.replace("e",".e"):t}var Si=R("tag:yaml.org,2002:float",{implicit:!0,implicitFirstChars:["-","+",".",..."0123456789"],resolve:Fo,identify:e=>typeof e=="number"&&(!Number.isInteger(e)||Object.is(e,-0)||e.toString(10).indexOf("e")>=0),represent:Bo}),ko=new RegExp("^-?(?:0|[1-9][0-9]*)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$"),$o=new RegExp("^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function Mo(e,t){if(t){if(!$o.test(e))return T;let i=e.toLowerCase(),r=i[0]==="-"?-1:1;if("+-".includes(i[0])&&(i=i.slice(1)),i===".inf")return r===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY;if(i===".nan")return NaN;let o=r*parseFloat(i);return Number.isFinite(o)?o:T}if(!ko.test(e))return T;let n=Number(e);return Number.isFinite(n)?n:T}function Do(e){if(isNaN(e))return".nan";if(e===Number.POSITIVE_INFINITY)return".inf";if(e===Number.NEGATIVE_INFINITY)return"-.inf";if(Object.is(e,-0))return"-0.0";let t=e.toString(10);return/^[-+]?[0-9]+e/.test(t)?t.replace("e",".e"):t}var Uo=R("tag:yaml.org,2002:float",{implicit:!0,implicitFirstChars:["-",..."0123456789"],resolve:Mo,identify:e=>typeof e=="number"&&(!Number.isInteger(e)||Object.is(e,-0)||e.toString(10).indexOf("e")>=0),represent:Do}),qo=new RegExp("^(?:[-+]?(?:(?:[0-9][0-9_]*)?\\.[0-9_]*)(?:[eE][-+][0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"),Yo=new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function Ko(e){if(!qo.test(e))return T;let t=e.toLowerCase().replace(/_/g,""),n=t[0]==="-"?-1:1;if("+-".includes(t[0])&&(t=t.slice(1)),t===".inf")return n===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY;if(t===".nan")return NaN;let i=0;if(t.includes(":")){for(let r of t.split(":"))i=i*60+Number(r);i*=n}else i=n*parseFloat(t);return Number.isFinite(i)||Yo.test(e)?i:T}function Go(e){if(isNaN(e))return".nan";if(e===Number.POSITIVE_INFINITY)return".inf";if(e===Number.NEGATIVE_INFINITY)return"-.inf";if(Object.is(e,-0))return"-0.0";let t=e.toString(10);return/^[-+]?[0-9]+e/.test(t)?t.replace("e",".e"):t}var zt=R("tag:yaml.org,2002:float",{implicit:!0,implicitFirstChars:["-","+",".",..."0123456789"],resolve:Ko,identify:e=>typeof e=="number"&&(!Number.isInteger(e)||Object.is(e,-0)||e.toString(10).indexOf("e")>=0),represent:Go}),jo=R("tag:yaml.org,2002:merge",{implicit:!0,implicitFirstChars:["<"],resolve:(e,t)=>e==="<<"||t&&e===""?"<<":T,identify:()=>!1}),Vo=/^[A-Za-z0-9+/]*={0,2}$/;function Wo(e){let t=e.replace(/\s/g,"");if(t.length%4!==0||!Vo.test(t))return T;let n=atob(t),i=new Uint8Array(n.length);for(let r=0;r<n.length;r++)i[r]=n.charCodeAt(r);return i}function Ho(e){let t="";for(let n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return btoa(t)}var zo=R("tag:yaml.org,2002:binary",{resolve:Wo,identify:e=>Object.prototype.toString.call(e)==="[object Uint8Array]",represent:Ho}),Qo=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),Xo=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function ai(e,t,n,i=0,r=0,o=0,s=0){let f=new Date(Date.UTC(e,t,n,i,r,o,s));return f.setUTCFullYear(e,t,n),f}function Zo(e){let t=Qo.exec(e);if(t===null&&(t=Xo.exec(e)),t===null)return T;let n=+t[1],i=+t[2]-1,r=+t[3];if(!t[4]){let l=ai(n,i,r);return l.getUTCFullYear()!==n||l.getUTCMonth()!==i||l.getUTCDate()!==r?T:l}let o=+t[4],s=+t[5],f=+t[6],a=0;if(o>23||s>59||f>59)return T;if(t[7]){let l=t[7].slice(0,3);for(;l.length<3;)l+="0";a=+l}let u=ai(n,i,r,o,s,f,a);if(u.getUTCFullYear()!==n||u.getUTCMonth()!==i||u.getUTCDate()!==r)return T;if(t[9]){let l=+t[10],c=+(t[11]||0);if(l>23||c>59)return T;let d=(l*60+c)*6e4;u.setTime(u.getTime()-(t[9]==="-"?-d:d))}return u}var Jo=R("tag:yaml.org,2002:timestamp",{implicit:!0,implicitFirstChars:[..."0123456789"],resolve:Zo,identify:e=>e instanceof Date,represent:e=>e.toISOString()}),es=en("tag:yaml.org,2002:seq",{create:()=>[],addItem:(e,t)=>{e.push(t)},identify:Array.isArray});function lt(e){if(e===null||typeof e!="object"||Array.isArray(e))return!1;let t=Object.getPrototypeOf(e);return t===null||t===Object.prototype}function li(e,t){let n={};for(let i of t)e[i]!==void 0&&(n[i]=e[i]);return n}var ts=en("tag:yaml.org,2002:omap",{create:()=>({list:[],seen:new Set}),addItem:(e,t)=>{let n;if(t instanceof Map){if(t.size!==1)return"cannot resolve an ordered map item";n=t.keys().next().value}else if(lt(t)){let i=Object.keys(t);if(i.length!==1)return"cannot resolve an ordered map item";n=i[0]}else return"cannot resolve an ordered map item";return e.seen.has(n)?"duplicate key in ordered map":(e.seen.add(n),e.list.push(t),"")},finalize:e=>e.list,identify:()=>!1}),ns=en("tag:yaml.org,2002:pairs",{create:()=>[],addItem:(e,t)=>{if(t instanceof Map)return t.size!==1?"cannot resolve a pairs item":(e.push(t.entries().next().value),"");if(Object.prototype.toString.call(t)!=="[object Object]")return"cannot resolve a pairs item";let n=t,i=Object.keys(n);return i.length!==1?"cannot resolve a pairs item":(e.push([i[0],n[i[0]]]),"")},identify:()=>!1}),is=at("tag:yaml.org,2002:map",{create:()=>({}),identify:lt,represent:e=>{let t=new Map;for(let n of Object.keys(e))t.set(n,e[n]);return t},addPair:(e,t,n)=>{if(t!==null&&typeof t=="object")return"object-based map does not support complex keys";let i=String(t);return i==="__proto__"?Object.defineProperty(e,i,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[i]=n,""},has:(e,t)=>t!==null&&typeof t=="object"?!1:Object.prototype.hasOwnProperty.call(e,String(t)),keys:e=>Object.keys(e),get:(e,t)=>{let n=String(t);return Object.prototype.hasOwnProperty.call(e,n)?e[n]:null}}),rs=at("tag:yaml.org,2002:set",{create:()=>new Set,identify:e=>e instanceof Set,represent:e=>{let t=new Map;for(let n of e)t.set(n,null);return t},addPair:(e,t,n)=>n!==null?"cannot resolve a set item":(e.add(t),""),has:(e,t)=>e.has(t),keys:e=>e.keys(),get:()=>null});function os(){return{scalar:Object.create(null),sequence:Object.create(null),mapping:Object.create(null)}}function ss(){return{scalar:[],sequence:[],mapping:[]}}function fs(e){let t=[];for(let n of e){let i=t.length;for(let r=0;r<t.length;r++){let o=t[r];if(o.nodeKind===n.nodeKind&&o.tagName===n.tagName&&o.matchByTagPrefix===n.matchByTagPrefix){i=r;break}}t[i]=n}return t}var ct=class Ti{constructor(t){D(this,"tags");D(this,"implicitScalarTags");D(this,"implicitScalarByFirstChar");D(this,"implicitScalarAnyFirstChar");D(this,"defaultScalarTag");D(this,"defaultSequenceTag");D(this,"defaultMappingTag");D(this,"exact");D(this,"prefix");let n=fs(t),i=[],r=os(),o=ss();for(let l of n){if(l.nodeKind==="scalar"&&l.implicit){if(l.matchByTagPrefix)throw new Error("Implicit scalar tags cannot match by tag prefix");i.push(l)}switch(l.nodeKind){case"scalar":l.matchByTagPrefix?o.scalar.push(l):r.scalar[l.tagName]=l;break;case"sequence":l.matchByTagPrefix?o.sequence.push(l):r.sequence[l.tagName]=l;break;case"mapping":l.matchByTagPrefix?o.mapping.push(l):r.mapping[l.tagName]=l}}let s=i.filter(l=>l.implicitFirstChars===null),f=new Set;for(let l of i)if(l.implicitFirstChars!==null)for(let c of l.implicitFirstChars)f.add(c);let a=new Map;for(let l of f)a.set(l,i.filter(c=>c.implicitFirstChars===null||c.implicitFirstChars.indexOf(l)!==-1));let u=r.scalar["tag:yaml.org,2002:str"];if(!u)throw new Error("schema does not define the default scalar tag (tag:yaml.org,2002:str)");this.tags=n,this.implicitScalarTags=i,this.implicitScalarByFirstChar=a,this.implicitScalarAnyFirstChar=s,this.defaultScalarTag=u,this.defaultSequenceTag=r.sequence["tag:yaml.org,2002:seq"],this.defaultMappingTag=r.mapping["tag:yaml.org,2002:map"],this.exact=r,this.prefix=o}lookupScalarTag(t){let n=this.exact.scalar[t];if(n)return n;for(let i of this.prefix.scalar)if(t.startsWith(i.tagName))return i}lookupSequenceTag(t){let n=this.exact.sequence[t];if(n)return n;for(let i of this.prefix.sequence)if(t.startsWith(i.tagName))return i}lookupMappingTag(t){let n=this.exact.mapping[t];if(n)return n;for(let i of this.prefix.mapping)if(t.startsWith(i.tagName))return i}resolveImplicitScalarTag(t){let n=this.implicitScalarByFirstChar.get(t.charAt(0))??this.implicitScalarAnyFirstChar;for(let r of n){let o=r.resolve(t,!1,r.tagName);if(o!==T)return{value:o,tag:r}}let i=this.defaultScalarTag;return{value:i.resolve(t,!1,i.tagName),tag:i}}withTags(...t){let n=[];for(let i of t)n=n.concat(i);return new Ti([...this.tags,...n])}},tn=new ct([ro,es,is]),Li=new ct([...tn.tags,fo,mo,xo,Uo]),as=new ct([...tn.tags,so,po,Ii,Si]),ls=new ct([...tn.tags,lo,Ao,Ht,zt,Jo,jo,zo,ts,ns,rs]),cs=ls.withTags({...Ht,resolve:(e,t,n)=>{let i=Ht.resolve(e,t,n);return i===T?Ii.resolve(e,t,n):i}},{...zt,resolve:(e,t,n)=>{let i=zt.resolve(e,t,n);return i===T?Si.resolve(e,t,n):i}}),Ja=at("tag:yaml.org,2002:map",{create:()=>new Map,addPair:(e,t,n)=>(e.set(t,n),""),has:(e,t)=>e.has(t),keys:e=>e.keys(),get:(e,t)=>e.get(t),identify:e=>e instanceof Map||lt(e),represent:e=>{if(e instanceof Map)return e;let t=new Map,n=e;for(let i of Object.keys(n))t.set(i,n[i]);return t}});function ci(e){if(Array.isArray(e)){let t=Array.prototype.slice.call(e);for(let n=0;n<t.length;n++){if(Array.isArray(t[n]))return null;typeof t[n]=="object"&&Object.prototype.toString.call(t[n])==="[object Object]"&&(t[n]="[object Object]")}return String(t)}return typeof e=="object"&&Object.prototype.toString.call(e)==="[object Object]"?"[object Object]":String(e)}var el=at("tag:yaml.org,2002:map",{create:()=>({}),identify:lt,represent:e=>{let t=new Map;for(let n of Object.keys(e))t.set(n,e[n]);return t},addPair:(e,t,n)=>{let i=ci(t);return i===null?"nested arrays are not supported inside keys":(i==="__proto__"?Object.defineProperty(e,i,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[i]=n,"")},has:(e,t)=>{let n=ci(t);return n!==null&&Object.prototype.hasOwnProperty.call(e,n)},keys:e=>Object.keys(e),get:(e,t)=>{let n=String(t);return Object.prototype.hasOwnProperty.call(e,n)?e[n]:null}}),us={maxLength:79,indent:1,linesBefore:3,linesAfter:2};function Yt(e,t,n,i,r){let o="",s="",f=Math.floor(r/2)-1;return i-t>f&&(o=" ... ",t=i-f+o.length),n-i>f&&(s=" ...",n=i+f-s.length),{str:o+e.slice(t,n).replace(/\t/g,"\u2192")+s,pos:i-t+o.length}}function Kt(e,t){return" ".repeat(Math.max(t-e.length,0))+e}function ds(e,t){if(!e.buffer)return null;let n={...us,...t},i=/\r?\n|\r|\0/g,r=[0],o=[],s,f=-1;for(;s=i.exec(e.buffer);)o.push(s.index),r.push(s.index+s[0].length),e.position<=s.index&&f<0&&(f=r.length-2);f<0&&(f=r.length-1);let a="",u=Math.min(e.line+n.linesAfter,o.length).toString().length,l=n.maxLength-(n.indent+u+3);for(let d=1;d<=n.linesBefore&&!(f-d<0);d++){let g=Yt(e.buffer,r[f-d],o[f-d],e.position-(r[f]-r[f-d]),l);a=`${" ".repeat(n.indent)}${Kt((e.line-d+1).toString(),u)} | ${g.str}
${a}`}let c=Yt(e.buffer,r[f],o[f],e.position,l);a+=`${" ".repeat(n.indent)}${Kt((e.line+1).toString(),u)} | ${c.str}
`,a+=`${"-".repeat(n.indent+u+3+c.pos)}^
`;for(let d=1;d<=n.linesAfter&&!(f+d>=o.length);d++){let g=Yt(e.buffer,r[f+d],o[f+d],e.position-(r[f]-r[f+d]),l);a+=`${" ".repeat(n.indent)}${Kt((e.line+d+1).toString(),u)} | ${g.str}
`}return a.replace(/\n$/,"")}function ui(e,t){let n="";return e.mark?(e.mark.name&&(n+=`in "${e.mark.name}" `),n+=`(${e.mark.line+1}:${e.mark.column+1})`,!t&&e.mark.snippet&&(n+=`

${e.mark.snippet}`),`${e.reason} ${n}`):e.reason}var fe=class vi extends Error{constructor(n,i){super();D(this,"reason");D(this,"mark");this.name="YAMLException",this.reason=n,this.mark=i,this.message=ui(this,!1),Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}toString(n){return`${this.name}: ${ui(this,n)}`}static throwAt(n,i,r,o=""){let s=0,f=0;for(let u=0;u<i;u++){let l=n.charCodeAt(u);l===10?(s++,f=u+1):l===13&&(s++,n.charCodeAt(u+1)===10&&u++,f=u+1)}let a={name:o,buffer:n,position:i,line:s,column:i-f};throw a.snippet=ds(a),new vi(r,a)}},x={DOCUMENT:1,SEQUENCE:2,MAPPING:3,SCALAR:4,ALIAS:5,POP:6},S={PLAIN:1,SINGLE_QUOTED:2,DOUBLE_QUOTED:3,LITERAL_BLOCK:4,FOLDED_BLOCK:5},ee={BLOCK:1,FLOW:2},M={CLIP:1,STRIP:2,KEEP:3},ps=-1;function di(e){switch(e){case 48:return"\0";case 97:return"\x07";case 98:return"\b";case 116:return"	";case 9:return"	";case 110:return`
`;case 118:return"\v";case 102:return"\f";case 114:return"\r";case 101:return"\x1B";case 32:return" ";case 34:return'"';case 47:return"/";case 92:return"\\";case 78:return"\x85";case 95:return"\xA0";case 76:return"\u2028";case 80:return"\u2029";default:return""}}var Ni=new Array(256),xi=new Array(256);for(let e=0;e<256;e++)Ni[e]=di(e)?1:0,xi[e]=di(e);function gs(e){return e<=65535?String.fromCharCode(e):String.fromCharCode((e-65536>>10)+55296,(e-65536&1023)+56320)}function hs(e){return e>=48&&e<=57?e-48:(e|32)-97+10}function ms(e){return e===120?2:e===117?4:8}function ot(e,t,n){let i=0;for(;t<n;){let r=e.charCodeAt(t);if(r===10)i++,t++;else if(r===13)i++,t++,e.charCodeAt(t)===10&&t++;else if(r===32||r===9)t++;else break}return{position:t,breaks:i}}function nn(e){return e===1?" ":`
`.repeat(e-1)}function _s(e,t,n){let i="",r=t,o=t,s=t;for(;r<n;){let f=e.charCodeAt(r);if(f===10||f===13){i+=e.slice(o,s);let a=ot(e,r,n);i+=nn(a.breaks),r=o=s=a.position}else r++,f!==32&&f!==9&&(s=r)}return i+e.slice(o,s)}function ys(e,t,n){let i="",r=t,o=t,s=t;for(;r<n;){let f=e.charCodeAt(r);if(f===39)i+=e.slice(o,r)+"'",r+=2,o=s=r;else if(f===10||f===13){i+=e.slice(o,s);let a=ot(e,r,n);i+=nn(a.breaks),r=o=s=a.position}else r++,f!==32&&f!==9&&(s=r)}return i+e.slice(o,n)}function As(e,t,n){let i="",r=t,o=t,s=t;for(;r<n;){let f=e.charCodeAt(r);if(f===92){i+=e.slice(o,r),r++;let a=e.charCodeAt(r);if(a===10||a===13)r=ot(e,r,n).position;else if(a<256&&Ni[a])i+=xi[a],r++;else{let u=ms(a),l=0;for(;u>0;u--){r++;let c=hs(e.charCodeAt(r));l=(l<<4)+c}i+=gs(l),r++}o=s=r}else if(f===10||f===13){i+=e.slice(o,s);let a=ot(e,r,n);i+=nn(a.breaks),r=o=s=a.position}else r++,f!==32&&f!==9&&(s=r)}return i+e.slice(o,n)}function pi(e,t,n,i,r,o){let s=i<0?0:i,f=e.slice(t,n).replace(/\r\n?/g,`
`),a=f===""?[]:(f.endsWith(`
`)?f.slice(0,-1):f).split(`
`),u="",l=!1,c=0,d=!1;for(let g of a){let p=0;for(;p<s&&g.charCodeAt(p)===32;)p++;if(i<0||p>=g.length){c++;continue}let h=g.slice(s),y=h.charCodeAt(0);o?y===32||y===9?(d=!0,u+=`
`.repeat(l?1+c:c)):d?(d=!1,u+=`
`.repeat(c+1)):c===0?l&&(u+=" "):u+=`
`.repeat(c):u+=`
`.repeat(l?1+c:c),u+=h,l=!0,c=0}return r===M.KEEP?u+=`
`.repeat(l?1+c:c):r!==M.STRIP&&l&&(u+=`
`),u}function Es(e,t){if(t.valueStart===ps)return"";let{valueStart:n,valueEnd:i}=t;if(t.fast)return e.slice(n,i);switch(t.style){case S.SINGLE_QUOTED:return ys(e,n,i);case S.DOUBLE_QUOTED:return As(e,n,i);case S.LITERAL_BLOCK:return pi(e,n,i,t.indent,t.chomping,!1);case S.FOLDED_BLOCK:return pi(e,n,i,t.indent,t.chomping,!0);default:return _s(e,n,i)}}var ws=Object.assign(Object.create(null),{"!":"!","!!":"tag:yaml.org,2002:"}),Is="-#;/?:@&=+$_.~*'()",tl=Is+"!,[]";function Gt(e){let t="",n=0;for(;n<e.length;){if(e.charCodeAt(n)!==37){t+=e[n++];continue}let i=parseInt(e.slice(n+1,n+3),16);if(n+=3,i>=192){let r=i<224?1:i<240?2:3;for(i&=(1<<6-r)-1;r-- >0;)i=i<<6|parseInt(e.slice(n+1,n+3),16)&63,n+=3}i<65536?t+=String.fromCharCode(i):(i-=65536,t+=String.fromCharCode(55296|i>>10,56320|i&1023))}return t}function bi(e,t){if(e.startsWith("!<")&&e.endsWith(">"))return Gt(e.slice(2,-1));let n=e.indexOf("!",1),i=n===-1?"!":e.slice(0,n+1);return Gt(t?.[i]??ws[i]??i)+Gt(e.slice(i.length))}var we=-1,Ss="tag:yaml.org,2002:merge",rn={filename:"",schema:as,json:!1,maxTotalMergeKeys:1e4,maxAliases:-1};function Ts(e){return"tagStart"in e&&e.tagStart!==we?e.tagStart:"anchorStart"in e&&e.anchorStart!==we?e.anchorStart:"valueStart"in e&&e.valueStart!==we?e.valueStart:"start"in e?e.start:0}function C(e,t){fe.throwAt(e.source,e.position,t,e.filename)}function Oi(e,t,n,i){try{return n.finalize(i)}catch(r){if(r instanceof fe)throw r;fe.throwAt(e.source,t,r instanceof Error?r.message:String(r),e.filename)}}function Ls(e,t){let n=Es(e.source,t),i=t.tagStart===we?"":e.source.slice(t.tagStart,t.tagEnd),r=e.schema.defaultScalarTag;if(i!==""){if(i==="!")return{value:n,tag:r};let o=bi(i,e.tagHandlers),s=e.schema.lookupScalarTag(o);if(s){let a=s.resolve(n,!0,o);return a===T&&C(e,`cannot resolve a node with !<${o}> explicit tag`),{value:a,tag:s}}let f=e.schema.lookupMappingTag(o)??e.schema.lookupSequenceTag(o);if(f){n!==""&&C(e,`cannot resolve a node with !<${o}> explicit tag`);let a=f.create(o);return{value:f.carrierIsResult?a:Oi(e,e.position,f,a),tag:f}}C(e,`unknown scalar tag !<${o}>`)}return t.style===S.PLAIN?e.schema.resolveImplicitScalarTag(n):{value:r.resolve(n,!1,r.tagName),tag:r}}function gi(e,t,n){let i=t.tagStart===we?"":e.source.slice(t.tagStart,t.tagEnd);return i===""||i==="!"?n:bi(i,e.tagHandlers)}function Ci(e){return e.nodeKind==="mapping"}function hi(e){e.totalMergeKeys++,e.maxTotalMergeKeys!==-1&&e.totalMergeKeys>e.maxTotalMergeKeys&&C(e,`merge keys exceeded maxTotalMergeKeys (${e.maxTotalMergeKeys})`)}function mi(e,t,n,i){hi(e);for(let r of i.keys(n)){if(hi(e),t.tag.has(t.value,r))continue;let o=t.tag.addPair(t.value,r,i.get(n,r));o&&C(e,o),t.overridable??=new Set,t.overridable.add(r)}}function vs(e,t,n,i){if(e.position=t.keyPosition,Ci(i))mi(e,t,n,i);else if(i.nodeKind==="sequence"&&Array.isArray(n)){n.length>100&&C(e,"abnormal merge sequence size");for(let r of n){let o=e.nodeTags.get(r);o||C(e,"cannot merge mappings; the provided source object is unacceptable"),mi(e,t,r,o)}}else C(e,"cannot merge mappings; the provided source object is unacceptable")}function Ns(e,t,n,i,r){if(e.position=t.keyPosition,t.keyIsMerge){vs(e,t,i,r);return}!e.json&&t.tag.has(t.value,n)&&!t.overridable?.has(n)&&C(e,"duplicated mapping key");let o=t.tag.addPair(t.value,n,i);o&&C(e,o),t.overridable?.delete(n)}function jt(e,t,n){let i=e.frames[e.frames.length-1];if(i.kind==="document")i.value=t,i.hasValue=!0;else if(i.kind==="sequence"){Ci(n)&&e.nodeTags.set(t,n);let r=i.tag.addItem(i.value,t,i.index++);r&&C(e,r)}else if(i.hasKey){let r=i.key;i.key=void 0,i.hasKey=!1,Ns(e,i,r,t,n)}else i.key=t,i.keyPosition=e.position,i.hasKey=!0,i.keyIsMerge=n.tagName===Ss}function Vt(e,t,n,i,r){if(t.anchorStart!==we){let o={value:n,tag:i,isValueFinal:r};return e.anchors.set(e.source.slice(t.anchorStart,t.anchorEnd),o),o}return null}function xs(e,t){let n={...rn,...t,events:e,documents:[],eventIndex:0,position:0,frames:[],anchors:new Map,nodeTags:new Map,tagHandlers:Object.create(null),totalMergeKeys:0,aliasCount:0};for(;n.eventIndex<n.events.length;){let i=n.events[n.eventIndex++];switch(n.position=Ts(i),i.type){case x.DOCUMENT:n.anchors=new Map,n.nodeTags=new Map,n.aliasCount=0,n.tagHandlers=Object.create(null);for(let r of i.directives)r.kind==="tag"&&(n.tagHandlers[r.handle]=r.prefix);n.frames.push({kind:"document",position:n.position,value:void 0,hasValue:!1});break;case x.SCALAR:{let{value:r,tag:o}=Ls(n,i);Vt(n,i,r,o,!0),jt(n,r,o);break}case x.SEQUENCE:{let r=gi(n,i,"tag:yaml.org,2002:seq"),o=n.schema.lookupSequenceTag(r);o||C(n,`unknown sequence tag !<${r}>`);let s=o.create(r),f=Vt(n,i,s,o,o.carrierIsResult);n.frames.push({kind:"sequence",position:n.position,value:s,tag:o,anchor:f,index:0});break}case x.MAPPING:{let r=gi(n,i,"tag:yaml.org,2002:map"),o=n.schema.lookupMappingTag(r);o||C(n,`unknown mapping tag !<${r}>`);let s=o.create(r),f=Vt(n,i,s,o,o.carrierIsResult);n.frames.push({kind:"mapping",position:n.position,value:s,tag:o,anchor:f,key:void 0,keyPosition:n.position,hasKey:!1,keyIsMerge:!1,overridable:null});break}case x.ALIAS:{n.maxAliases!==-1&&++n.aliasCount>n.maxAliases&&C(n,`aliases exceeded maxAliases (${n.maxAliases})`);let r=n.source.slice(i.anchorStart,i.anchorEnd),o=n.anchors.get(r);o||C(n,`unidentified alias "${r}"`),o.isValueFinal||C(n,`recursive alias "${r}" is not supported for tag ${o.tag.tagName} because it uses finalize()`),jt(n,o.value,o.tag);break}case x.POP:{let r=n.frames.pop();if(r.kind==="mapping"&&r.hasKey&&(n.position=r.keyPosition,C(n,"incomplete mapping pair in event stream")),r.kind==="document")n.documents.push(r.value);else{let o=r.tag.carrierIsResult?r.value:Oi(n,r.position,r.tag,r.value);r.anchor&&(r.anchor.value=o,r.anchor.isValueFinal=!0),jt(n,o,r.tag)}break}}}return n.documents}var v=-1,Pi=Object.prototype.hasOwnProperty,Le=1,Ri=2,Fi=3,st=4,bs=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,Os=/[,\[\]{}]/,Bi=/^(?:!|!!|![0-9A-Za-z-]+!)$/,Qt=String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$,_.!~*'()\[\]])`,ki=String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$.~*'()_])`,Cs=new RegExp(`^(?:${Qt})*$`),Ps=new RegExp(`^(?:${ki})+$`),Rs=new RegExp(`^(?:!(?:${Qt})*|${ki}(?:${Qt})*)$`),on={filename:"",maxDepth:100};function Fs(e,t,n){e.events.push({type:x.DOCUMENT,explicitStart:t,explicitEnd:n,directives:e.directives})}function $i(e,t,n,i,r,o,s){e.events.push({type:x.SEQUENCE,start:t,anchorStart:n,anchorEnd:i,tagStart:r,tagEnd:o,style:s})}function Mi(e,t,n,i,r,o,s){e.events.push({type:x.MAPPING,start:t,anchorStart:n,anchorEnd:i,tagStart:r,tagEnd:o,style:s})}function _i(e,t){e.events.splice(t.eventsLength,0,{type:x.MAPPING,start:t.position,anchorStart:v,anchorEnd:v,tagStart:v,tagEnd:v,style:ee.FLOW})}function xe(e,t,n,i,r,o,s,f,a=M.CLIP,u=-1,l=!1){e.events.push({type:x.SCALAR,valueStart:t,valueEnd:n,anchorStart:i,anchorEnd:r,tagStart:o,tagEnd:s,style:f,chomping:a,indent:u,fast:l})}function Bs(e,t,n){e.events.push({type:x.ALIAS,anchorStart:t,anchorEnd:n})}function Ie(e){e.events.push({type:x.POP})}function F(e){xe(e,v,v,v,v,v,v,S.PLAIN)}function yi(){return{anchorStart:v,anchorEnd:v,tagStart:v,tagEnd:v}}function Se(e){return{position:e.position,line:e.line,lineStart:e.lineStart,lineIndent:e.lineIndent,firstTabInLine:e.firstTabInLine,eventsLength:e.events.length}}function Te(e,t){e.position=t.position,e.line=t.line,e.lineStart=t.lineStart,e.lineIndent=t.lineIndent,e.firstTabInLine=t.firstTabInLine,e.events.length=t.eventsLength}function A(e,t){fe.throwAt(e.input.slice(0,e.length),e.position,t,e.filename)}function b(e){return e===10||e===13}function be(e){return e===9||e===32}function G(e){return be(e)||b(e)}function X(e){return e===0||G(e)}function ae(e){return e===44||e===91||e===93||e===123||e===125}function ks(e){return e>=48&&e<=57?e-48:-1}function $s(e){if(e>=48&&e<=57)return e-48;let t=e|32;return t>=97&&t<=102?t-97+10:-1}function Ms(e){return e===120?2:e===117?4:e===85?8:0}function Ds(e){return e===48||e===97||e===98||e===116||e===9||e===110||e===118||e===102||e===114||e===101||e===32||e===34||e===47||e===92||e===78||e===95||e===76||e===80}function ft(e){e.input.charCodeAt(e.position)===10?e.position++:(e.position++,e.input.charCodeAt(e.position)===10&&e.position++),e.line++,e.lineStart=e.position,e.lineIndent=0,e.firstTabInLine=-1}function P(e,t){let n=0,i=e.input.charCodeAt(e.position),r=e.position===e.lineStart||G(e.input.charCodeAt(e.position-1));for(;i!==0;){for(;be(i);)r=!0,i===9&&e.firstTabInLine===-1&&(e.firstTabInLine=e.position),i=e.input.charCodeAt(++e.position);if(t&&r&&i===35)do i=e.input.charCodeAt(++e.position);while(!b(i)&&i!==0);if(!b(i))break;for(ft(e),n++,r=!0,i=e.input.charCodeAt(e.position);i===32;)e.lineIndent++,i=e.input.charCodeAt(++e.position)}return n}function ve(e,t=e.position){let n=e.input.charCodeAt(t);if((n===45||n===46)&&n===e.input.charCodeAt(t+1)&&n===e.input.charCodeAt(t+2)){let i=e.input.charCodeAt(t+3);return i===0||G(i)}return!1}function Di(e){e.position===e.lineStart&&e.input.charCodeAt(e.position)===65279&&(e.position++,e.lineStart=e.position)}function sn(e){if(e.position!==e.lineStart)return!1;if(ve(e))return!0;if(e.input.charCodeAt(e.position)!==65279)return!1;let t=Se(e);Di(e),P(e,!0);let n=e.input.charCodeAt(e.position),i=e.position===e.lineStart&&(n===37||n===45&&ve(e));return Te(e,t),i}function Ai(e){let t=e.input.charCodeAt(e.position);for(;t!==0&&!b(t);)t=e.input.charCodeAt(++e.position)}function Ui(e,t,n){let i=bs.exec(e.input.slice(t,n));i!==null&&(e.position=t+i.index+i[0].length-1,A(e,"the stream contains non-printable characters"))}function Us(e,t,n){if(e.input.charCodeAt(e.position)!==33)return!1;t.tagStart!==v&&A(e,"duplication of a tag property");let i=e.position,r=!1,o=!1,s="!",f=e.input.charCodeAt(++e.position);f===60?(r=!0,f=e.input.charCodeAt(++e.position)):f===33&&(o=!0,s="!!",f=e.input.charCodeAt(++e.position));let a=e.position,u;if(r){for(;f!==0&&f!==62;)f=e.input.charCodeAt(++e.position);f!==62&&A(e,"unexpected end of the stream within a verbatim tag"),u=e.input.slice(a,e.position),e.position++}else{for(;f!==0&&!G(f)&&!(n&&ae(f));)f===33&&(o?A(e,"tag suffix cannot contain exclamation marks"):(s=e.input.slice(a-1,e.position+1),Bi.test(s)||A(e,"named tag handle cannot contain such characters"),o=!0,a=e.position+1)),f=e.input.charCodeAt(++e.position);u=e.input.slice(a,e.position),Os.test(u)&&A(e,"tag suffix cannot contain flow indicator characters")}return u&&!(r?Cs.test(u):Ps.test(u))&&A(e,`tag name cannot contain such characters: ${u}`),!r&&s!=="!"&&s!=="!!"&&!Pi.call(e.tagHandlers,s)&&A(e,`undeclared tag handle "${s}"`),t.tagStart=i,t.tagEnd=e.position,!0}function qs(e,t){if(e.input.charCodeAt(e.position)!==38)return!1;t.anchorStart!==v&&A(e,"duplication of an anchor property"),e.position++;let n=e.position;for(;e.input.charCodeAt(e.position)!==0&&!G(e.input.charCodeAt(e.position))&&!ae(e.input.charCodeAt(e.position));)e.position++;return e.position===n&&A(e,"name of an anchor node must contain at least one character"),t.anchorStart=n,t.anchorEnd=e.position,!0}function Ys(e,t){if(e.input.charCodeAt(e.position)!==42)return!1;(t.anchorStart!==v||t.tagStart!==v)&&A(e,"alias node should not have any properties"),e.position++;let n=e.position;for(;e.input.charCodeAt(e.position)!==0&&!G(e.input.charCodeAt(e.position))&&!ae(e.input.charCodeAt(e.position));)e.position++;return e.position===n&&A(e,"name of an alias node must contain at least one character"),Bs(e,n,e.position),!0}function Xt(e,t){P(e,!1),e.lineIndent<t&&A(e,"deficient indentation")}function Ks(e,t,n){if(e.input.charCodeAt(e.position)!==39)return!1;e.position++;let i=e.position,r=!0;for(;e.input.charCodeAt(e.position)!==0;){let o=e.input.charCodeAt(e.position);if(o===39){if(e.input.charCodeAt(e.position+1)===39){r=!1,e.position+=2;continue}let s=e.position;return e.position++,xe(e,i,s,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,S.SINGLE_QUOTED,M.CLIP,-1,r),!0}b(o)?(r=!1,Xt(e,t)):e.position===e.lineStart&&ve(e)?A(e,"unexpected end of the document within a single quoted scalar"):o!==9&&o<32?A(e,"expected valid JSON character"):e.position++}A(e,"unexpected end of the stream within a single quoted scalar")}function Gs(e,t,n){if(e.input.charCodeAt(e.position)!==34)return!1;e.position++;let i=e.position,r=!0;for(;e.input.charCodeAt(e.position)!==0;){let o=e.input.charCodeAt(e.position);if(o===34){let s=e.position;return e.position++,xe(e,i,s,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,S.DOUBLE_QUOTED,M.CLIP,-1,r),!0}if(o===92){r=!1;let s=e.input.charCodeAt(++e.position);if(b(s))Xt(e,t);else if(Ds(s))e.position++;else{let f=Ms(s);for(f===0&&A(e,"unknown escape sequence");f-- >0;)e.position++,$s(e.input.charCodeAt(e.position))<0&&A(e,"expected hexadecimal character");e.position++}}else b(o)?(r=!1,Xt(e,t)):e.position===e.lineStart&&ve(e)?A(e,"unexpected end of the document within a double quoted scalar"):o!==9&&o<32?A(e,"expected valid JSON character"):e.position++}A(e,"unexpected end of the stream within a double quoted scalar")}function js(e,t,n){let i=e.input.charCodeAt(e.position),r=M.CLIP,o=-1,s=!1;if(i!==124&&i!==62)return!1;let f=i===124?S.LITERAL_BLOCK:S.FOLDED_BLOCK;for(e.position++;e.input.charCodeAt(e.position)!==0;){let g=e.input.charCodeAt(e.position),p=ks(g);if(g===43||g===45)r!==M.CLIP&&A(e,"repeat of a chomping mode identifier"),r=g===43?M.KEEP:M.STRIP,e.position++;else if(p>=0)p===0&&A(e,"bad explicit indentation width of a block scalar; it cannot be less than one"),s&&A(e,"repeat of an indentation width identifier"),o=t+p-1,s=!0,e.position++;else break}let a=!1;for(;be(e.input.charCodeAt(e.position));)a=!0,e.position++;a&&e.input.charCodeAt(e.position)===35&&Ai(e),b(e.input.charCodeAt(e.position))?ft(e):e.input.charCodeAt(e.position)!==0&&A(e,"a line break is expected");let u=s?o:-1,l=0,c=e.position,d=e.position;for(;e.input.charCodeAt(e.position)!==0;){let g=e.position,p=0;for(;e.input.charCodeAt(g+p)===32;)p++;let h=e.input.charCodeAt(g+p);if(h===0){u>=0?p>u&&(d=g+p):p>0&&(d=g+p);break}if(sn(e))break;if(!s&&u===-1&&b(h)&&(l=Math.max(l,p)),!s&&u===-1&&!b(h)&&(h===9&&p<t&&(e.position=g+p,A(e,"tab characters must not be used in indentation")),p>=t&&p<l&&(e.position=g+p,A(e,"bad indentation of a mapping entry"))),u===-1&&h!==0&&!b(h)&&p<t){e.lineIndent=p,e.position=g+p;break}!s&&h!==0&&!b(h)&&u===-1&&(u=p);let y=u===-1?t+1:u;if(h!==0&&!b(h)&&p<y){e.lineIndent=p,e.position=g+p;break}Ai(e),d=e.position,b(e.input.charCodeAt(e.position))&&(ft(e),d=e.position)}return Ui(e,c,d),xe(e,c,d,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,f,r,u),!0}function Vs(e,t){let n=e.input.charCodeAt(e.position),i=t===Le;if(n===0||G(n)||n===35||n===38||n===42||n===33||n===124||n===62||n===39||n===34||n===37||n===64||n===96||ae(n))return!1;if(n===63||n===45){let r=e.input.charCodeAt(e.position+1);if(X(r)||i&&ae(r))return!1}return!0}function Ws(e,t,n,i){if(!Vs(e,n))return!1;let r=e.position,o=e.position,s=e.input.charCodeAt(e.position),f=n===Le,a=!1;for(;s!==0&&!sn(e);){if(s===58){let u=e.input.charCodeAt(e.position+1);if(X(u)||f&&ae(u))break}else if(s===35){if(G(e.input.charCodeAt(e.position-1)))break}else{if(f&&ae(s))break;if(b(s)){let u=e.position,l=e.line,c=e.lineStart,d=e.lineIndent;if(P(e,!1),e.lineIndent>=t){a=!0,s=e.input.charCodeAt(e.position);continue}e.position=u,e.line=l,e.lineStart=c,e.lineIndent=d;break}}be(s)||(o=e.position+1),s=e.input.charCodeAt(++e.position)}return o===r?!1:(Ui(e,r,o),xe(e,r,o,i.anchorStart,i.anchorEnd,i.tagStart,i.tagEnd,S.PLAIN,M.CLIP,-1,!a),!0)}function $e(e,t){let n=e.line;P(e,!0),(e.line>n&&e.lineIndent<t||e.firstTabInLine!==-1&&e.lineIndent<t)&&A(e,"deficient indentation")}function Hs(e,t,n){let i=e.input.charCodeAt(e.position),r=i===123,o=e.position,s=!0;if(i!==91&&i!==123)return!1;let f=r?125:93;for(r?Mi(e,o,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,ee.FLOW):$i(e,o,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,ee.FLOW),e.position++;e.input.charCodeAt(e.position)!==0;){$e(e,t);let a=e.input.charCodeAt(e.position);if(a===f)return e.position++,Ie(e),!0;s?a===44&&A(e,"expected the node content, but found ','"):A(e,"missed comma between flow collection entries");let u=!1,l=!1;a===63&&G(e.input.charCodeAt(e.position+1))&&(u=l=!0,e.position+=1,$e(e,t));let c=e.line,d=Se(e),g=Ne(e,t,Le,!1,!0);$e(e,t),a=e.input.charCodeAt(e.position),(r||l||e.line===c)&&a===58?(u=!0,e.position++,$e(e,t),r||_i(e,d),g||F(e),Ne(e,t,Le,!1,!0)||F(e),$e(e,t),r||Ie(e)):r&&u?(g||F(e),F(e)):r?F(e):u&&(_i(e,d),g||F(e),F(e),Ie(e)),a=e.input.charCodeAt(e.position),a===44?(s=!0,e.position++):s=!1}A(e,"unexpected end of the stream within a flow collection")}function Ei(e,t,n){if(e.firstTabInLine!==-1||e.input.charCodeAt(e.position)!==45||!X(e.input.charCodeAt(e.position+1)))return!1;for($i(e,e.position,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,ee.BLOCK);e.input.charCodeAt(e.position)===45&&X(e.input.charCodeAt(e.position+1));){e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,A(e,"tab characters must not be used in indentation"));let i=e.line;e.position++;let r=P(e,!0)>0;if(e.firstTabInLine!==-1&&e.input.charCodeAt(e.position)===45&&X(e.input.charCodeAt(e.position+1))&&A(e,"bad indentation of a sequence entry"),r&&e.lineIndent<=t?F(e):Ne(e,t,Fi,!1,!0),P(e,!0),e.lineIndent<t||e.position>=e.length)break;e.lineIndent>t&&A(e,"bad indentation of a sequence entry"),e.line===i&&e.input.charCodeAt(e.position)===45&&X(e.input.charCodeAt(e.position+1))&&A(e,"bad indentation of a sequence entry")}return Ie(e),!0}function Wt(e,t,n,i){let r=!1,o=!1,s=!1,f=!1;if(e.firstTabInLine!==-1)return!1;let a=e.input.charCodeAt(e.position);for(;a!==0;){!r&&e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,A(e,"tab characters must not be used in indentation"));let u=e.input.charCodeAt(e.position+1),l=e.line;if((a===63||a===58)&&X(u))s||(Mi(e,e.position,i.anchorStart,i.anchorEnd,i.tagStart,i.tagEnd,ee.BLOCK),s=!0),a===63?(r&&F(e),o=!0,r=!0):(r||(F(e),o=!0),r=!1),e.position+=1,f=!0;else{r&&(F(e),r=!1);let c=Se(e);if(!Ne(e,n,Ri,!1,!0))break;if(e.line===l){for(a=e.input.charCodeAt(e.position);be(a);)a=e.input.charCodeAt(++e.position);if(a===58)a=e.input.charCodeAt(++e.position),X(a)||A(e,"a whitespace character is expected after the key-value separator within a block mapping"),s||(e.events.splice(c.eventsLength,0,{type:x.MAPPING,start:c.position,anchorStart:i.anchorStart,anchorEnd:i.anchorEnd,tagStart:i.tagStart,tagEnd:i.tagEnd,style:ee.BLOCK}),s=!0),o=!0,r=!1,f=!1;else if(o)A(e,"expected ':' after a mapping key");else return i.anchorStart!==v||i.tagStart!==v?(Te(e,c),!1):!0}else if(o)A(e,"can not read a block mapping entry; a multiline key may not be an implicit key");else return i.anchorStart!==v||i.tagStart!==v?(Te(e,c),!1):!0}if(Ne(e,t,st,!0,f)&&(f=!1),r||f&&(F(e),f=!1),P(e,!0),a=e.input.charCodeAt(e.position),(e.line===l||e.lineIndent>t)&&a!==0)A(e,"bad indentation of a mapping entry");else if(e.lineIndent<t)break}return o?(r&&F(e),s&&Ie(e),!0):!1}function Ne(e,t,n,i,r,o=!0){e.depth>=e.maxDepth&&A(e,`nesting exceeded maxDepth (${e.maxDepth})`),e.depth++;let s=1,f=!1,a=!1,u=null,l=yi(),c=n===st||n===Fi,d=c,g=c;if(i&&P(e,!0)&&(f=!0,e.lineIndent>t?s=1:e.lineIndent===t?s=0:s=-1),s===1)for(;;){let p=e.input.charCodeAt(e.position),h=Se(e);if(f&&s!==1&&(p===33||p===38))break;if(f&&g&&(l.tagStart!==v||l.anchorStart!==v)&&(p===33||p===38)){let y=Se(e),m=t+1;if(Wt(e,e.position-e.lineStart,m,l)&&e.events[y.eventsLength]?.type===x.MAPPING)return e.depth--,!0;Te(e,y)}if(f&&(p===33&&l.tagStart!==v||p===38&&l.anchorStart!==v)||!Us(e,l,n===Le)&&!qs(e,l))break;u===null&&(u=h),P(e,!0)?(f=!0,d=g,e.lineIndent>t?s=1:e.lineIndent===t?s=0:s=-1):d=!1}if(d&&(d=f||r),s===1||n===st){let p=n===Le||n===Ri?t:t+1,h=e.position-e.lineStart;if(s===1)if(d&&(Ei(e,h,l)||Wt(e,h,p,l))||Hs(e,p,l))a=!0;else{let y=e.input.charCodeAt(e.position);if(u!==null&&o&&g&&!d&&y!==124&&y!==62){let m=Se(e),_=u.position-u.lineStart;Te(e,u),Wt(e,_,p,yi())&&e.events[m.eventsLength]?.type===x.MAPPING?a=!0:Te(e,m)}!a&&(c&&js(e,p,l)||Ks(e,p,l)||Gs(e,p,l)||Ys(e,l)||Ws(e,p,n,l))&&(a=!0)}else s===0&&(a=d&&Ei(e,h,l))}return c=c&&!a,!a&&(l.anchorStart!==v||l.tagStart!==v||c)&&(xe(e,v,v,l.anchorStart,l.anchorEnd,l.tagStart,l.tagEnd,S.PLAIN),a=!0),e.depth--,a||l.anchorStart!==v||l.tagStart!==v}function zs(e){if(e.lineIndent>0||e.input.charCodeAt(e.position)!==37)return!1;e.position++;let t=e.position;for(;e.input.charCodeAt(e.position)!==0&&!G(e.input.charCodeAt(e.position));)e.position++;let n=e.input.slice(t,e.position),i=[];for(n.length===0&&A(e,"directive name must not be less than one character in length");e.input.charCodeAt(e.position)!==0&&!b(e.input.charCodeAt(e.position));){for(;be(e.input.charCodeAt(e.position));)e.position++;if(e.input.charCodeAt(e.position)===35||b(e.input.charCodeAt(e.position))||e.input.charCodeAt(e.position)===0)break;let r=e.position;for(;e.input.charCodeAt(e.position)!==0&&!G(e.input.charCodeAt(e.position));)e.position++;i.push(e.input.slice(r,e.position))}if(b(e.input.charCodeAt(e.position))&&ft(e),n==="YAML"){e.directives.some(o=>o.kind==="yaml")&&A(e,"duplication of %YAML directive"),i.length!==1&&A(e,"YAML directive accepts exactly one argument");let r=/^([0-9]+)\.([0-9]+)$/.exec(i[0]);r===null&&A(e,"ill-formed argument of the YAML directive"),parseInt(r[1],10)!==1&&A(e,"unacceptable YAML version of the document"),e.directives.push({kind:"yaml",version:i[0]})}else if(n==="TAG"){i.length!==2&&A(e,"TAG directive accepts exactly two arguments");let[r,o]=i;Bi.test(r)||A(e,"ill-formed tag handle (first argument) of the TAG directive"),Pi.call(e.tagHandlers,r)&&A(e,`there is a previously declared suffix for "${r}" tag handle`),Rs.test(o)||A(e,"ill-formed tag prefix (second argument) of the TAG directive"),e.tagHandlers[r]=o,e.directives.push({kind:"tag",handle:r,prefix:o})}return!0}function Qs(e){e.directives=[],e.tagHandlers=Object.create(null);let t=!1;for(P(e,!0);zs(e);)t=!0,P(e,!0);let n=!1,i=!1,r=!0;if(e.lineIndent===0&&e.input.charCodeAt(e.position)===45&&e.input.charCodeAt(e.position+1)===45&&e.input.charCodeAt(e.position+2)===45&&X(e.input.charCodeAt(e.position+3))){n=!0;let f=e.line;e.position+=3,P(e,!0),r=e.line>f}else t&&A(e,"directives end mark is expected");let o=e.events.length;if(!n&&e.position===e.lineStart&&e.input.charCodeAt(e.position)===46&&ve(e)){e.position+=3,P(e,!0);return}if(Fs(e,n,!1),Ne(e,e.lineIndent-1,st,!1,r,r)||F(e),P(e,!0),e.position===e.lineStart&&ve(e)&&(i=e.input.charCodeAt(e.position)===46,i)){let f=e.line;e.position+=3,P(e,!0),e.line===f&&e.position<e.length&&A(e,"end of the stream or a document separator is expected")}let s=e.events[o];s?.type===x.DOCUMENT&&(s.explicitEnd=i),Ie(e),!i&&e.position<e.length&&!sn(e)&&A(e,"end of the stream or a document separator is expected")}function Xs(e,t){let n=e.length,i={...on,...t,input:`${e}\0`,length:n,position:0,line:0,lineStart:0,lineIndent:0,firstTabInLine:-1,depth:0,directives:[],tagHandlers:Object.create(null),events:[]},r=e.indexOf("\0");for(r!==-1&&fe.throwAt(e,r,"null byte is not allowed in input",i.filename);i.position<i.length&&(Di(i),P(i,!0),!(i.position>=i.length));){let o=i.position;Qs(i),i.position===o&&A(i,"can not read a document")}return i.events}var Zs={...on,...rn};function Js(e,t={}){let n={...Zs,...t},i=String(e),r=Object.keys(on),o=Object.keys(rn);return xs(Xs(i,li(n,r)),{...li(n,o),source:i})}function qi(e,t){let n=Js(e,t);if(n.length===0)throw new fe("expected a document, but the input is empty");if(n.length===1)return n[0];throw new fe("expected a single document in the stream, but found more")}function ut(e,t){return(e&1<<t)!==0}var wi={applyQuoteFlowKeysOption:ef,doubleQuoteForInvisibles:tf,doubleQuoteWhitespaceOnly:nf,applyForceQuotesOption:rf,tryLongOrMultilineAsBlock:of,quoteInvalidPlain:sf,fallbackToDoubleQuoted:ff};function Yi(e){return e.presenterOptions.quoteStyle==="single"&&ut(e.allowedStylesMask,S.SINGLE_QUOTED)?S.SINGLE_QUOTED:S.DOUBLE_QUOTED}function ef(e){e.presenterOptions.quoteFlowKeys&&(!e.isKey||!e.flowOnly||e.style!==S.PLAIN||(e.style=S.DOUBLE_QUOTED))}function tf(e){e.style===S.PLAIN&&/[\t\x7F-\xA0\u2028\u2029\uFEFF\uFFFE\uFFFF]/.test(e.node.value)&&(e.style=S.DOUBLE_QUOTED)}function nf(e){e.style===S.PLAIN&&/^\s+$/.test(e.node.value)&&(e.style=S.DOUBLE_QUOTED)}function rf(e){e.presenterOptions.forceQuotes&&(e.isKey||e.style!==S.PLAIN||e.node.tag===e.presenterOptions.schema.defaultScalarTag.tagName&&(e.style=e.node.value.includes(`
`)?S.DOUBLE_QUOTED:Yi(e)))}function of(e){if(e.style!==S.PLAIN||e.isKey)return;let t=e.node.value,n=t.indexOf(`
`)!==-1;if(!ut(e.allowedStylesMask,S.LITERAL_BLOCK)){n&&(e.style=S.DOUBLE_QUOTED);return}let i=e.presenterOptions.lineWidth;if(i===-1){n&&(e.style=S.LITERAL_BLOCK);return}let r=Math.max(Math.min(i,40),i-e.shiftOfContent),o=0,s=!1;for(;o<=t.length;){let f=t.length,a=t.indexOf(`
`,o);a!==-1&&(f=a);let u=t.slice(o,f);if(u.length>r&&u[0]!==" "&&/ [^ \t]/.test(u)&&(s=!0),a===-1)break;o=a+1}s?e.style=S.FOLDED_BLOCK:n&&(e.style=S.LITERAL_BLOCK)}function sf(e){e.style===S.PLAIN&&!ut(e.allowedStylesMask,S.PLAIN)&&(e.style=Yi(e))}function ff(e){ut(e.allowedStylesMask,e.style)||(e.style=S.DOUBLE_QUOTED)}var af="[\\x09\\x0A\\x0D\\x20-\\x7E\\x85\\xA0-\\uD7FF\\uE000-\\uFFFD\\u{10000}-\\u{10FFFF}]",lf="[\\n\\r]",cf="\\uFEFF",fn="[ \\t]",Ki=`(?:(?!(?:${lf}|${cf}))${af})`,dt=`(?:(?!${fn})${Ki})`,Gi="[\\x09\\x20-\\uD7FF\\uE000-\\uFFFF\\u{10000}-\\u{10FFFF}]",ji="[-?:,\\[\\]{}#&*!|>'\"%@`]",uf="[,\\[\\]{}]",Zt=dt,Jt=`(?:(?!${uf})${dt})`,df=`(?:(?:(?!${ji})${dt})|[?:-](?=${Zt}))`,pf=`(?:(?:(?!${ji})${dt})|[?:-](?=${Jt}))`,Vi=`(?:(?:(?![:#])${Zt})|:(?=${Zt}))#*`,Wi=`(?:(?:(?![:#])${Jt})|:(?=${Jt}))#*`,Hi=`(?:${fn}*${Vi})*`,zi=`(?:${fn}*${Wi})*`,Qi=`${df}#*${Hi}`,Xi=`${pf}#*${zi}`,gf=Qi,hf=Xi,mf=`\\n+${Vi}${Hi}`,_f=`\\n+${Wi}${zi}`,yf=`${Qi}(?:${mf})*`,Af=`${Xi}(?:${_f})*`,nl=new RegExp(`^(?:${yf})$`,"u"),il=new RegExp(`^(?:${Af})$`,"u"),rl=new RegExp(`^(?:${gf})$`,"u"),ol=new RegExp(`^(?:${hf})$`,"u"),sl=new RegExp(`^(?:${Gi})*$`,"u"),fl=new RegExp(`^(?:${Gi}|\\n)*$`,"u"),al=new RegExp(`^(?:${Ki}|\\n)*$`,"u");var Ef={indent:2,seqNoIndent:!1,seqInlineFirst:!0,lineWidth:80,flowBracketPadding:!1,flowSkipCommaSpace:!1,flowSkipColonSpace:!1,quoteFlowKeys:!1,quoteStyle:"single",forceQuotes:!1,scalarStyleRules:Object.keys(wi).map(e=>Reflect.get(wi,e)),tagBeforeAnchor:!1};var ll={...Ef,schema:cs,skipInvalid:!1,noRefs:!1,flowLevel:-1,sortKeys:!1,transform:()=>{}};var cl=x.DOCUMENT,ul=x.SEQUENCE,dl=x.MAPPING,pl=x.SCALAR,gl=x.ALIAS,hl=x.POP,ml=S.PLAIN,_l=S.SINGLE_QUOTED,yl=S.DOUBLE_QUOTED,Al=S.LITERAL_BLOCK,El=S.FOLDED_BLOCK,wl=ee.BLOCK,Il=ee.FLOW,Sl=M.CLIP,Tl=M.STRIP,Ll=M.KEEP;var Me=new Map;function Zi(e){try{let t=typeof e=="string"?qi(e,{schema:Li}):e;return Object.entries(t||{}).map(([n,i])=>[Number(n),i]).filter(([n,i])=>Number.isFinite(n)&&typeof i=="string"&&i.trim()).sort((n,i)=>n[0]-i[0])}catch{return[]}}function wf(e,t){return Zi(e).filter(([n])=>n>=t&&n<t+10)}async function If(e,t,n,i,r,o){let[,s,f]=e,a="https://huggingface.co/datasets/Antreas/TALI/resolve/"+t+"/"+s,u=0,l=0,c={byteLength:f,async slice(p,h=f){if(r?.throwIfAborted(),h-p>72*1024*1024)throw Error("Source range too large");l+=h-p;let y=await fetch(a+"?atlas_range="+p+"-"+h,{headers:{Range:"bytes="+p+"-"+(h-1)},credentials:"omit",signal:r});if(y.status!==206||!y.body)throw y.body?.cancel(),Error("Source range unavailable");let m=[],_=0,E=y.body.getReader();for(;;){let{done:w,value:I}=await E.read();if(w)break;m.push(I),_+=I.length,u+=I.length,o?.(u,l)}if(_!==h-p)throw Error("Source range size changed");return new Blob(m).arrayBuffer()}},d=Me.get(s);d||(d=await re(c),Me.size>50&&Me.delete(Me.keys().next().value),Me.set(s,d));let g=await qt({file:c,metadata:d,utf8:!1,columns:i,rowStart:n,rowEnd:n+1});if(g.length!==1)throw Error("Release coordinate changed");return g[0]}return ar(Sf);})();
/*! Bundled license information:

js-yaml/dist/js-yaml.mjs:
  (*! js-yaml 5.5.0 https://github.com/nodeca/js-yaml @license MIT *)
*/

;
/* Dataset search. The static index contains token postings and release coordinates. */
const vizFiles = new Map(),
  vizNames = new Map();
let vizManifestPromise,
  vizController,
  vizBlobURLs = [];
const fields = { all: 15, title: 1, wikipedia: 2, caption: 4, subtitles: 8 };
const fieldNames = {
  all: "All text",
  title: "Recording title",
  wikipedia: "Wikipedia title",
  caption: "Image caption",
  subtitles: "Timed subtitles",
};
const mediaNames = {
  av: "Audio + video (late fusion)",
  video: "Video only",
  image: "WIT image",
  audio: "Audio only",
  text: "WIT context",
  title: "Recording title",
};
const semanticViews = {
  av: "Joint audio + video",
  image: "Wikipedia images",
  audio: "Audio",
  video: "Video",
  text: "Text",
};
const semanticSourceNames = {
  text: "Text",
  image: "Image",
  audio: "Audio",
  video: "Video",
  av: "Audio + Video",
};
const semanticClipSourceNames = {
  av: "Joint audio + video",
  audio: "Audio",
  video: "Video",
  image: "Wikipedia image",
  text: "Text",
};
const semanticExamples = {
  av: "A dog barking in a garden",
  image: "A spiral staircase seen from above",
  audio: "A train horn in the distance",
  video: "Waves breaking against rocks",
  text: "How a bicycle gear works",
};
const semanticView = (view) => Object.hasOwn(semanticViews, view) ? view : "av";
const semanticSource = (source) => Object.hasOwn(semanticSourceNames, source) ? source : "text";
const semanticPublicOrigin = "https://tali.antreas.io";
const semanticLocalHost = () => ["localhost", "127.0.0.1", "[::1]"].includes(location.hostname);
function semanticURL(q = "", view = "av", source = "text") {
  const params = new URLSearchParams({ mode: "semantic" });
  if (q) params.set("q", q);
  if (source && source !== "text") params.set("source", semanticSource(source));
  params.set("view", semanticView(view));
  return (privateEdition && !semanticLocalHost() ? semanticPublicOrigin + "/" : "") +
    "#visualizer?" + params;
}
function semanticSimilarURL(doc, win = 0, source = "av", view = "av", segment) {
  const params = new URLSearchParams({
    mode: "semantic",
    doc: String(doc),
    window: String(win),
    source: semanticView(source),
    view: semanticView(view),
  });
  if (segment && Number.isFinite(segment.start_s) && Number.isFinite(segment.end_s)) {
    params.set("start", String(segment.start_s));
    params.set("end", String(segment.end_s));
  }
  return (privateEdition && !semanticLocalHost() ? semanticPublicOrigin + "/" : "") +
    "#visualizer?" + params;
}
function semanticTime(seconds) {
  return clock(seconds) + (seconds % 1 ? "." + String(seconds).split(".")[1] : "");
}
function semanticRange(start, end) {
  return semanticTime(start) + "–" + semanticTime(end);
}
function vizClean() {
  vizController?.abort();
  for (const uri of vizBlobURLs) URL.revokeObjectURL(uri);
  vizBlobURLs = [];
}
function vizSearchMode(params) {
  const mode = params.get("mode");
  if (mode === "semantic" || mode === "concept") return mode;
  // Older keyword bookmarks include a field or page without an explicit mode.
  if (mode || params.has("field") || params.has("page")) return "text";
  return "semantic";
}
function vizURL(
  q = "",
  field = "all",
  page = 0,
  mode = "text",
  view = "av",
  concept = "",
) {
  const p = new URLSearchParams();
  if (q) p.set("q", q);
  if (field !== "all") p.set("field", field);
  if (page) p.set("page", page);
  p.set("mode", mode);
  if (view !== "av") p.set("view", view);
  if (concept) p.set("concept", concept);
  return "#visualizer?" + p;
}
function vizItem(id, w = 0, segment) {
  return "#visualizer/item/" + id + "/" + w + (segment
    ? "?" + new URLSearchParams({ start: segment.start_s, end: segment.end_s })
    : "");
}
function vizRoot() {
  // GitHub Pages supplies the index on both public sites. The mini keeps its own copy.
  return new URL(
    atlas.search.directory + "/",
    location.hostname === "tali.antreas.io"
      ? "https://antreas.io/tali/"
      : document.baseURI,
  );
}
async function vizManifest() {
  if (!vizManifestPromise)
    vizManifestPromise = fetch(new URL("manifest.json", vizRoot()))
      .then(async (r) => {
        if (!r.ok) throw Error("Search catalogue unavailable");
        const raw = await r.arrayBuffer();
        if (sha256(raw) !== atlas.search.sha256)
          throw Error("Search catalogue changed");
        return JSON.parse(new TextDecoder().decode(raw));
      })
      .catch((e) => {
        vizManifestPromise = undefined;
        throw e;
      });
  return vizManifestPromise;
}
async function vizData(name, binary = false) {
  if (vizFiles.has(name)) return vizFiles.get(name);
  const req = (async () => {
    const m = await vizManifest();
    if (!Object.hasOwn(m.shas, name)) throw Error("Unknown search file");
    const r = await fetch(new URL(name, vizRoot()));
    if (!r.ok) throw Error("Search file unavailable");
    const bytes = await r.arrayBuffer();
    if (sha256(bytes) !== m.shas[name]) throw Error("Search file changed");
    const dec = new Blob([bytes])
      .stream()
      .pipeThrough(new DecompressionStream("gzip"));
    const body = await new Response(dec).arrayBuffer();
    return binary
      ? new Uint8Array(body)
      : JSON.parse(new TextDecoder().decode(body));
  })();
  if (vizFiles.size > 60) vizFiles.delete(vizFiles.keys().next().value);
  vizFiles.set(name, req);
  try {
    return await req;
  } catch (e) {
    vizFiles.delete(name);
    throw e;
  }
}
function vizTokens(value) {
  return [
    ...new Set(
      value
        .toLowerCase()
        .normalize("NFKD")
        .replace(/\p{M}/gu, "")
        .match(/[\p{L}\p{N}]+/gu) || [],
    ),
  ]
    .filter((t) => t.length <= 80)
    .slice(0, 12);
}
async function vizPosting(term) {
  const hash = sha256(term).slice(0, 20);
  const buf = await vizData("t-" + hash.slice(0, 2) + ".gz", true);
  const count = new DataView(
    buf.buffer,
    buf.byteOffset,
    buf.byteLength,
  ).getUint32(0, true);
  const key = Uint8Array.from(hash.match(/../g), (h) => parseInt(h, 16));
  let at = 4;
  function variable() {
    let n = 0,
      mul = 1;
    while (at < buf.length) {
      const b = buf[at++];
      n += (b & 127) * mul;
      if (b < 128) return n;
      mul *= 128;
    }
    throw Error("Incomplete postings");
  }
  for (let t = 0; t < count; t++) {
    let equal = true;
    for (let j = 0; j < 10; j++) if (buf[at + j] !== key[j]) equal = false;
    at += 10;
    const n = variable();
    const hits = equal ? new Map() : null;
    let id = 0;
    for (let j = 0; j < n; j++) {
      const v = variable();
      if (equal) {
        id += v >>> 4;
        hits.set(id, v & 15);
      }
    }
    if (equal) return hits;
  }
  return new Map();
}
async function vizFind(q, field) {
  const bits = fields[field] || 15,
    terms = vizTokens(q);
  if (!terms.length) return [];
  const lists = await Promise.all(terms.map(vizPosting));
  lists.sort((a, b) => a.size - b.size);
  const found = [];
  for (const [id] of lists[0]) {
    const masks = lists.map((l) => (l.get(id) || 0) & bits);
    if (masks.includes(0)) continue;
    const mask = masks.reduce((a, b) => a | b, 0),
      common = masks.reduce((a, b) => a & b, 15);
    const rank =
      masks.reduce(
        (a, b) =>
          a +
          (b & 1 ? 8 : 0) +
          (b & 2 ? 5 : 0) +
          (b & 4 ? 3 : 0) +
          (b & 8 ? 1 : 0),
        0,
      ) + (common ? 12 : 0);
    found.push({ id, mask, rank, window: 0 });
  }
  return found.sort((a, b) => b.rank - a.rank || a.id - b.id);
}
async function vizDoc(id) {
  const m = await vizManifest();
  if (!Number.isSafeInteger(id) || id < 0 || id >= m.recordings)
    throw Error("Unknown recording");
  const size = m.documentPageSize;
  return (
    await vizData("r-" + String(Math.floor(id / size)).padStart(3, "0") + ".gz")
  )[id % size];
}
function viewerURL(split, row) {
  return (
    "https://huggingface.co/datasets/Antreas/TALI/viewer/default/" +
    encodeURIComponent(split) +
    "?row=" +
    row
  );
}
async function vizCoordinates(split, offset) {
  const index = await vizData("sources.gz");
  let base = 0;
  for (const pin of index[split] || []) {
    if (offset < base + pin[0]) return [pin, offset - base];
    base += pin[0];
  }
  throw Error("Row is outside this split");
}
function vizForm(q = "", field = "all") {
  return (
    '<form class="viz-form" role="search"><label class="v-search-input"><span class="search-glass" aria-hidden="true"></span><input type="search" name="q" aria-label="Search TALI recordings" placeholder="Search recordings, captions, subtitles…" autocomplete="off" value="' +
    esc(q) +
    '" maxlength="110" required></label><button type="submit">Search <span aria-hidden="true">↗</span></button><select name="field" aria-label="Search field">' +
    Object.entries(fieldNames)
      .map(
        ([k, v]) =>
          '<option value="' +
          k +
          '"' +
          (k === field ? " selected" : "") +
          ">" +
          esc(v) +
          "</option>",
      )
      .join("") +
    "</select></form>"
  );
}
function vizExamples() {
  return (
    '<div class="viz-suggestions"><span>Try</span>' +
    ["Mass Effect", "Shiba Inu", "StarCraft", "Bananas"]
      .map((v) => link(vizURL(v), v))
      .join("") +
    "</div>"
  );
}
function semanticForm(q = "", view = "av") {
  return '<form class="viz-form semantic-form" role="search" aria-label="Live multimodal search" data-mode="semantic">' +
    '<label class="v-search-input"><span class="search-glass" aria-hidden="true"></span><input type="search" name="q" aria-label="Describe what you want to find" placeholder="Describe what you want to find…" autocomplete="off" maxlength="110" required value="' +
    esc(q) + '"></label><button type="submit">Search <span aria-hidden="true">↗</span></button>' +
    '<label class="semantic-view">Match against <select name="view">' +
    Object.entries(semanticViews).map(([key, label]) => '<option value="' + key + '"' +
      (key === view ? " selected" : "") + ">" + esc(label) + "</option>").join("") +
    "</select></label></form>";
}
function semanticSuggestions(views = Object.keys(semanticViews)) {
  return '<div class="viz-suggestions"><span>Try</span>' +
    views.map((view) => link(semanticURL(semanticExamples[view], view), semanticExamples[view])).join("") +
    "</div>";
}
function vizTimeline() {
  const row = atlas.rows["504001602"],
    rms = atlas.paper.coverRMS,
    peak = Math.max(...rms);
  const bars = rms
    .map(
      (v) =>
        '<i style="height:' +
        Math.max(2, Math.round((100 * v) / peak)) +
        '%"></i>',
    )
    .join("");
  const cues = row.cues
    .map((t) => '<i style="left:' + 10 * t + '%"></i>')
    .join("");
  return (
    '<div class="v-timeline" role="img" aria-label="Ten seconds of measured audio level with five subtitle starts"><div class="timeline-label"><span>6:30</span><span>Audio level &amp; subtitle starts</span><span>6:40</span></div><div class="v-wave">' +
    bars +
    '</div><div class="v-cues">' +
    cues +
    "</div></div>"
  );
}
const embeddingDatasetURL = "https://huggingface.co/datasets/Antreas/TALI-gemma-embedding-2-vectors";
function vizHero() {
  const playback = atlas.scale
    ? " Played end to end, the stored video would run for about " +
      link("#read/scale", Math.round(atlas.scale.duration.video.estimate_seconds / 604800) + " weeks") + "."
    : "";
  return (
    '<section class="hero visualizer-hero"><div class="v-hero-copy">' +
    tag("The TALI dataset") +
    '<h1 class="dataset-name">Temporal Audio <span>Language and Images</span></h1><p>TALI links Wikipedia photographs, captions and articles to clips from YouTube recordings. You can see how a subject looks in motion, hear its surroundings and follow the available timed subtitles.' + playback + '</p>' +
    '<h2 class="home-search-label">' + link(semanticURL(), "Live multimodal search") + '</h2>' +
    semanticForm() +
    semanticSuggestions(["av", "audio"]) +
    '<div class="v-hero-links">' +
    link("#datasets", "Datasets & Python examples →") +
    link(vizURL(), "Keyword search →") +
    link(vizURL("", "all", 0, "concept"), "Fixed concept gallery →") +
    link("#read/collection", "How TALI was built ↓") +
    '</div></div><div class="v-hero-plate">' +
    coverFrame() +
    '<div class="v-feature-caption"><div><span>FEATURED RECORDING</span><h2>' +
    link("#case/mass-effect", "TALI contains Tali.") +
    '</h2></div><a class="play-source" href="#case/mass-effect/clip" aria-label="Play Tali at 6:39">▶</a></div>' +
    vizTimeline() +
    "</div></section>"
  );
}
function bindVizForms() {
  main.querySelectorAll(".viz-form").forEach((f) => {
    f.onsubmit = (ev) => {
      ev.preventDefault();
      const d = new FormData(f);
      if (f.dataset.mode === "semantic") {
        const query = String(d.get("q") || "").trim();
        if (!query) return;
        const url = semanticURL(query, d.get("view"));
        if (!url.startsWith("#")) location.assign(url);
        else if (location.hash === url) render();
        else location.hash = url;
        return;
      }
      location.hash = vizURL(
        String(d.get("q")).trim(),
        String(d.get("field") || "all"),
      );
    };
  });
}
function vizSearchPage(params) {
  const q = params.get("q") || "",
    field = Object.hasOwn(fields, params.get("field"))
      ? params.get("field")
      : "all";
  const mode = vizSearchMode(params),
    concept = mode === "concept",
    semantic = mode === "semantic",
    view = Object.hasOwn(mediaNames, params.get("view"))
      ? params.get("view")
      : "av";
  const top =
    '<div class="v-head">' +
    tag("Dataset explorer") +
    '<h1>TALI Visualizer</h1><p class="visualizer-intro">Temporal Audio Language and Images (TALI) links Wikipedia photographs and text to YouTube clips, audio and timed subtitles. ' + link("#read/collection", "How the dataset was built") + '</p></div><nav class="viz-modes" aria-label="Search mode">' +
    "<a " + (semantic ? 'aria-current="page" ' : "") +
    'href="' + esc(semanticURL(q, params.get("view"))) + '">Semantic search</a><a ' +
    (!concept && !semantic ? 'aria-current="page" ' : "") +
    'href="' +
    esc(vizURL(q, field)) +
    '">Keyword search</a><a ' +
    (concept ? 'aria-current="page" ' : "") +
    'href="' +
    esc(vizURL(semantic ? "" : q, field, 0, "concept", view)) +
    '">Fixed concept gallery</a></nav>';
  if (semantic) {
    const searchHere = !privateEdition || semanticLocalHost();
    const qSource = semanticSource(params.get("source"));
    const targetView = semanticView(params.get("view"));
    const hasClipQuery = params.has("doc") && /^\d{1,9}$/.test(params.get("doc") || "");
    const clipDoc = hasClipQuery ? Number(params.get("doc")) : null;
    const clipWin = hasClipQuery && /^\d{1,6}$/.test(params.get("window") || "0") ? Number(params.get("window") || "0") : 0;
    const clipSource = semanticView(params.get("source") || "av");
    const description = searchHere
      ? 'Search all 1.17M indexed clips across any modality pair: query with text, an uploaded image, audio, video, or any TALI clip signal, and match against audio, video, joint audiovisual, Wikipedia images, or text. ' + external(embeddingDatasetURL, "Download the vectors") + ' or ' + link("#datasets/retrieval", "try a Python search example") + '.'
      : 'Results open on the public TALI Visualizer.';
    const sourceTabs = searchHere
      ? '<div class="semantic-source-tabs" role="group" aria-label="Query input modality"><span>Query with</span>' +
        Object.entries(semanticSourceNames).map(([key, label]) =>
          '<button type="button" data-qsource="' + key + '" aria-pressed="' + (!hasClipQuery && key === qSource ? "true" : "false") + '">' + esc(label) + '</button>'
        ).join("") + '</div>'
      : "";
    const clipBanner = hasClipQuery && searchHere
      ? '<div id="semantic-clip-query" class="semantic-clip-query"><div class="semantic-clip-query-meta"><small>All-to-all clip query</small><strong id="clip-query-title">Recording #' + clipDoc + '</strong></div>' +
        '<div class="semantic-clip-controls"><label>Query signal <select id="clip-query-source">' +
        Object.entries(semanticClipSourceNames).map(([k, lbl]) => '<option value="' + k + '"' + (k === clipSource ? " selected" : "") + '>' + esc(lbl) + '</option>').join("") +
        '</select></label><label>Match against <select id="clip-query-view">' +
        Object.entries(semanticViews).map(([k, lbl]) => '<option value="' + k + '"' + (k === targetView ? " selected" : "") + '>' + esc(lbl) + '</option>').join("") +
        '</select></label><a href="' + esc(semanticURL("", targetView)) + '">Text / upload</a></div></div>'
      : "";
    const mediaBox = searchHere && !hasClipQuery && qSource !== "text"
      ? '<div id="semantic-media-box" class="semantic-media-box" data-qsource="' + qSource + '"><div class="semantic-media-controls">' +
        '<input id="semantic-media-file" type="file" accept="' +
        (qSource === "image" ? "image/*" : qSource === "audio" ? "audio/*" : "video/*") +
        '" aria-label="Choose ' + esc(semanticSourceNames[qSource]) + ' file">' +
        (qSource === "audio" ? '<button id="semantic-mic-btn" type="button" class="semantic-media-btn secondary">Record mic (up to 10s)</button>' : "") +
        '<label class="semantic-view" style="grid-column:auto">Match against <select id="semantic-media-view">' +
        Object.entries(semanticViews).map(([key, label]) => '<option value="' + key + '"' + (key === targetView ? " selected" : "") + '>' + esc(label) + '</option>').join("") +
        '</select></label><button id="semantic-media-go" type="button" class="semantic-media-btn" disabled>Search <span aria-hidden="true">↗</span></button>' +
        '</div><div id="semantic-media-preview" class="semantic-media-preview">Choose ' +
        (qSource === "image" ? "a JPEG, PNG or WebP image" : qSource === "audio" ? "an audio clip (or record up to 10s from your microphone)" : "a short video clip (first 10 seconds sampled at 2 fps)") +
        ' to embed with EmbeddingGemma 2 and search the live index.</div></div>'
      : "";
    return top + '<section class="semantic-search" aria-labelledby="semantic-heading">' +
      '<h2 id="semantic-heading">Describe a scene, sound or subject</h2><p>' + description + '</p>' +
      sourceTabs +
      clipBanner +
      (!hasClipQuery && qSource === "text" ? semanticForm(q.trim().slice(0, 110), targetView) + semanticSuggestions() : mediaBox) +
      (searchHere ? '<div id="semantic-coverage" class="semantic-coverage" role="status">Checking index coverage…</div></section>' +
      '<p id="semantic-feedback" role="status">' + (hasClipQuery || q.trim() ? "Searching the live index…" : "") +
      '</p><section id="v-results" aria-label="Search results"></section>' : '</section>');
  }
  if (concept)
    return (
      top +
      '<section class="concept-search"><h2>Search by sound or image</h2><p>Choose a concept and compare the closest examples in one media view. Rankings use frozen EmbeddingGemma 2 embeddings.</p><label>Find an encoded concept<input id="concept-filter" type="search" value="' +
      esc(q) +
      '" placeholder="Try barking, violin, rain…" maxlength="90"></label><label>Match against<select id="concept-view">' +
      Object.entries(mediaNames)
        .map(
          ([k, v]) =>
            '<option value="' +
            k +
            '"' +
            (k === view ? " selected" : "") +
            ">" +
            v +
            "</option>",
        )
        .join("") +
      '</select></label><div id="concept-options"></div></section><section id="v-results" aria-live="polite"><p>Loading concepts…</p></section>'
    );
  return (
    top +
    vizForm(q, field) +
    vizExamples() +
    '<section id="v-results" aria-live="polite"><p>' +
    (q
      ? "Searching the release index…"
      : "Choose a term above to search the complete release.") +
    "</p></section>"
  );
}
const maskLabel = (m) =>
  [
    [1, "Title"],
    [2, "Wikipedia"],
    [4, "Caption"],
    [8, "Subtitle"],
  ]
    .filter(([bit]) => (m & bit) !== 0)
    .map((x) => x[1])
    .join(" · ");
function compactTitle(s) {
  return String(s || "")
    .replace(/https?:\/\/\S+|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/gi, "")
    .trim()
    .slice(0, 180);
}
let miniSourceOrder;
async function vizMiniRecord(doc, w, signal) {
  if (!privateEdition) return;
  try {
    if (!miniSourceOrder) {
      const sources = await vizData("sources.gz");
      const names = Object.values(sources)
        .flat()
        .map((s) => s[1])
        .sort();
      miniSourceOrder = new Map(names.map((name, i) => [name, i + 1]));
    }
    const [coord, idx] = await vizCoordinates(doc[2], doc[3][w][0]);
    const id = miniSourceOrder.get(coord[1]) * 1000000 + idx;
    const response = await fetch("/api/records/" + id, {
      signal: AbortSignal.any([signal, AbortSignal.timeout(3500)]),
      credentials: "omit",
    });
    if (!response.ok) return;
    const row = await response.json();
    if (
      String(row.id) === String(id) &&
      row.split === doc[2] &&
      row.metadata?.release_revision === atlas.revision &&
      Number(row.recording_start_seconds) === doc[3][w][1]
    )
      return row;
  } catch {
    signal.throwIfAborted();
  }
}
async function vizResolveTitle(doc, signal) {
  if (vizNames.has(doc[0])) return vizNames.get(doc[0]);
  if (privateEdition) {
    const local = await vizMiniRecord(doc, 0, signal);
    const name = compactTitle(local?.recording_title);
    if (name) {
      vizNames.set(doc[0], name);
      return name;
    }
  }
  const [pin, idx] = await vizCoordinates(doc[2], doc[3][0][0]);
  const row = await TaliReader.read(
    pin,
    atlas.revision,
    idx,
    ["youtube_title_text", "youtube_video_file_path", "wit_idx"],
    signal,
  );
  if (
    !String(row.youtube_video_file_path).includes(doc[0]) ||
    Number(row.wit_idx) !== doc[1]
  )
    throw Error("Source changed");
  const name = compactTitle(row.youtube_title_text);
  if (name) vizNames.set(doc[0], name);
  return name;
}
async function hydrateTitle(doc, h, signal) {
  try {
    const fallbackName = atlas.search.examples[doc[0]];
    if (fallbackName) h.textContent = fallbackName;
    const title = await vizResolveTitle(doc, signal);
    if (!signal.aborted && h.isConnected && title) h.textContent = title;
  } catch {
    /* The stable recording ID and source link remain usable. */
  }
}
async function vizResults(entries, config, signal) {
  const { q, field, mode, view, concept, heading } = config;
  const results = document.getElementById("v-results");
  if (!results || signal.aborted) return;
  const perPage = 8,
    page = Math.min(
      Math.max(0, config.page || 0),
      Math.max(0, Math.ceil(entries.length / perPage) - 1),
    );
  const slice = entries.slice(page * perPage, (page + 1) * perPage);
  const docs = await Promise.all(slice.map((i) => vizDoc(i.id)));
  if (signal.aborted || !results.isConnected) return;
  const items = slice.map((e, i) => {
    const d = docs[i],
      t = d[3][e.window || 0][1],
      img = atlas.images[d[1]],
      known = atlas.search.examples[d[0]];
    return (
      '<article class="v-result"><a class="v-result-hit" href="' +
      vizItem(e.id, e.window || 0) +
      '">' +
      (img
        ? '<img src="' + esc(img.asset) + '" loading="lazy" alt="">'
        : '<span class="result-time">' + clock(t) + "</span>") +
      "<div><small>" +
      esc(e.mask ? maskLabel(e.mask) : mediaNames[view]) +
      '</small><h3 data-title="' +
      i +
      '">' +
      esc(known || "Recording " + d[0]) +
      "</h3>" +
      "<p>WIT " +
      d[1] +
      " · " +
      d[3].length +
      " release window" +
      (d[3].length === 1 ? "" : "s") +
      " · " +
      esc(d[2]) +
      '</p></div><b aria-hidden="true">↗</b></a></article>'
    );
  });
  results.innerHTML =
    '<div class="results-head"><h2>' +
    esc(heading) +
    "</h2><span>" +
    (entries.length
      ? iso(page * perPage + 1) + "–" + iso(page * perPage + slice.length)
      : "0") +
    " of " +
    iso(entries.length) +
    "</span></div>" +
    (!entries.length
      ? "<p>Try a shorter term or choose another search field.</p>"
      : '<div class="v-result-grid">' + items.join("") + "</div>") +
    '<nav class="v-pages" aria-label="Results pages">' +
    (page
      ? link(vizURL(q, field, page - 1, mode, view, concept), "← Previous")
      : "") +
    ((page + 1) * perPage < entries.length
      ? link(vizURL(q, field, page + 1, mode, view, concept), "Next →")
      : "") +
    "</nav>";
  results
    .querySelectorAll("[data-title]")
    .forEach((h) => hydrateTitle(docs[Number(h.dataset.title)], h, signal));
}
const semanticScopes = {
  window: "Clip segment",
  "first-ten-second-search": "First ten seconds of the clip",
  "WIT-card": "Wikipedia reference",
  document: "Text match",
};
const semanticFields = {
  youtube_title_text: "Recording title",
  youtube_description_text: "Recording description",
  subtitle_window: "Timed subtitles",
  "wit_features.page_title": "Wikipedia title",
  "wit_features.caption_reference_description": "Reference caption",
  "wit_features.caption_alt_text_description": "Image alt text",
  "wit_features.caption_title_and_reference_description": "Image caption",
  "wit_features.context_page_description": "Wikipedia page context",
  "wit_features.context_section_description": "Wikipedia section context",
  "wit_features.hierarchical_section_title": "Wikipedia section headings",
  "wit_features.section_title": "Wikipedia section heading",
};
function semanticSegment(start, end) {
  if (Number.isFinite(start) && Number.isFinite(end) && start >= 0 && start < end && end <= 10)
    return { start_s: start, end_s: end };
}
function semanticAPI(endpoint, params) {
  const origin = location.origin === semanticPublicOrigin || semanticLocalHost()
    ? location.origin
    : semanticPublicOrigin;
  const url = new URL("/api/vector/" + endpoint, origin);
  if (params) url.search = new URLSearchParams(params);
  return url;
}
async function semanticFetch(endpoint, params, signal) {
  const response = await fetch(semanticAPI(endpoint, params), {
    credentials: "omit",
    signal: AbortSignal.any([signal, AbortSignal.timeout(40000)]),
  });
  if (!response.ok) throw Error("Live index unavailable");
  return response.json();
}
async function semanticPost(endpoint, payload, signal) {
  const response = await fetch(semanticAPI(endpoint, null), {
    method: "POST",
    credentials: "omit",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.any([signal, AbortSignal.timeout(45000)]),
  });
  if (!response.ok) {
    let msg = "Live multimodal search unavailable";
    try {
      const err = await response.json();
      if (err?.error) msg = err.error;
    } catch {}
    throw Error(msg);
  }
  return response.json();
}
function bytesToBase64(bytes) {
  let out = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    out += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(out);
}
async function canvasToJpegBase64(canvas, quality = 0.85) {
  const blob = await new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(Error("Could not encode frame"))), "image/jpeg", quality)
  );
  return bytesToBase64(new Uint8Array(await blob.arrayBuffer()));
}
async function encodeImageFileForSearch(file) {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(Error("Could not decode image"));
      el.src = url;
    });
    const maxSide = 512;
    const scale = Math.min(1, maxSide / Math.max(img.naturalWidth, img.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));
    canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
    const b64 = await canvasToJpegBase64(canvas, 0.88);
    return { image_b64: b64, thumb: canvas.toDataURL("image/jpeg", 0.7), summary: canvas.width + "×" + canvas.height + " JPEG" };
  } finally {
    URL.revokeObjectURL(url);
  }
}
async function audioBufferToWav16kBase64(audioBuffer) {
  const maxSec = Math.min(audioBuffer.duration, 10.0);
  if (maxSec < 0.2) throw Error("Audio clip must be at least 0.2 seconds long.");
  const targetRate = 16000;
  const targetLen = Math.max(1, Math.round(maxSec * targetRate));
  const offline = new OfflineAudioContext(1, targetLen, targetRate);
  const src = offline.createBufferSource();
  src.buffer = audioBuffer;
  src.connect(offline.destination);
  src.start(0, 0, maxSec);
  const rendered = await offline.startRendering();
  const samples = rendered.getChannelData(0);
  const wav = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(wav);
  const str = (off, s) => { for (let i = 0; i < s.length; i++) view.setUint8(off + i, s.charCodeAt(i)); };
  str(0, "RIFF");
  view.setUint32(4, 36 + samples.length * 2, true);
  str(8, "WAVE");
  str(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, targetRate, true);
  view.setUint32(28, targetRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  str(36, "data");
  view.setUint32(40, samples.length * 2, true);
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(44 + i * 2, s < 0 ? s * 32768 : s * 32767, true);
  }
  return {
    audio_wav_b64: bytesToBase64(new Uint8Array(wav)),
    duration_s: maxSec,
    summary: maxSec.toFixed(1) + "s · 16 kHz mono WAV (" + Math.round(wav.byteLength / 1024) + " KB)",
  };
}
async function encodeAudioBlobForSearch(blob) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  try {
    const decoded = await ctx.decodeAudioData(await blob.arrayBuffer());
    return await audioBufferToWav16kBase64(decoded);
  } finally {
    await ctx.close().catch(() => {});
  }
}
async function encodeVideoFileForSearch(file, includeAudio) {
  const url = URL.createObjectURL(file);
  try {
    const video = document.createElement("video");
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.src = url;
    await new Promise((resolve, reject) => {
      video.onloadedmetadata = resolve;
      video.onerror = () => reject(Error("Could not decode video file"));
    });
    const dur = Math.min(video.duration || 0, 10.0);
    if (!Number.isFinite(dur) || dur <= 0.1) throw Error("Video duration could not be read.");
    const nFrames = Math.max(2, Math.min(10, Math.round(dur * 2)));
    const canvas = document.createElement("canvas");
    canvas.width = 224;
    canvas.height = 224;
    const ctx = canvas.getContext("2d");
    const frames = [];
    let thumb = "";
    for (let i = 0; i < nFrames; i++) {
      const t = Math.min(dur - 0.05, ((i + 0.5) * dur) / nFrames);
      await new Promise((resolve) => {
        video.onseeked = resolve;
        video.currentTime = Math.max(0, t);
      });
      ctx.drawImage(video, 0, 0, 224, 224);
      frames.push(await canvasToJpegBase64(canvas, 0.8));
      if (!thumb) thumb = canvas.toDataURL("image/jpeg", 0.7);
    }
    const out = {
      frames_b64: frames,
      thumb,
      summary: frames.length + " frames (224×224) over " + dur.toFixed(1) + "s",
    };
    if (includeAudio) {
      const audio = await encodeAudioBlobForSearch(file);
      out.audio_wav_b64 = audio.audio_wav_b64;
      out.summary += " + " + audio.summary;
    }
    return out;
  } finally {
    URL.revokeObjectURL(url);
  }
}
function renderSemanticCoverage(node, coverage) {
  const keys = ["rows", "total_rows", "shards", "total_shards"];
  if (!coverage || !keys.every((key) => Number.isSafeInteger(coverage[key]) && coverage[key] >= 0) ||
    coverage.rows > coverage.total_rows || coverage.shards > coverage.total_shards ||
    !coverage.total_rows || !coverage.total_shards) throw Error("Invalid index coverage");
  if (!node.isConnected) return;
  node.innerHTML = '<span><strong>' + iso(coverage.rows) + '</strong> of ' + iso(coverage.total_rows) +
    ' release clips indexed</span><span><strong>' + iso(coverage.shards) + '</strong> of ' +
    iso(coverage.total_shards) + ' shards</span>';
}
function semanticRetry(label, action) {
  const retry = document.createElement("button");
  retry.type = "button";
  retry.className = "semantic-retry";
  retry.textContent = label;
  retry.onclick = action;
  return retry;
}
async function semanticResults(results, hits, q, view, signal) {
  if (!Array.isArray(hits)) throw Error("Malformed search results");
  const recordingCount = hits.length ? (await vizManifest()).recordings : 0;
  const matches = await Promise.all(hits.slice(0, 24).map(async (hit) => {
    if (!hit || !Number.isSafeInteger(hit.doc) || hit.doc < 0 || hit.doc >= recordingCount ||
      !Number.isSafeInteger(hit.window) || hit.window < 0) return;
    if (typeof hit.scope !== "string" || !Object.hasOwn(semanticScopes, hit.scope)) return;
    const isTimed = hit.scope === "window" || hit.scope === "first-ten-second-search";
    const segment = isTimed ? semanticSegment(hit.start_s, hit.end_s) : undefined;
    if (isTimed && !segment) return;
    // Resolve only against the checked release catalogue, which owns clip identity and source time.
    const doc = await vizDoc(hit.doc);
    const window = doc?.[3]?.[hit.window];
    if (!window || !Number.isFinite(window[1]) || window[1] < 0) return;
    return { hit, segment, doc, source: window[1] };
  }));
  signal.throwIfAborted();
  const found = matches.filter(Boolean);
  if (hits.length && !found.length) throw Error("No verified release windows");
  const items = found.map(({ hit, segment, doc, source }, i) => {
    const [id, wit, split] = doc;
    const img = atlas.images[wit];
    const known = vizNames.get(id) || atlas.search.examples[id];
    const scope = semanticScopes[hit.scope];
    const field = typeof hit.field === "string" && Object.hasOwn(semanticFields, hit.field) ? semanticFields[hit.field] : "";
    const language = typeof hit.language === "string" && /^[a-z]{2,3}(?:-[a-z0-9]{2,8})*$/i.test(hit.language) ? hit.language : "";
    const times = segment
      ? "Clip " + semanticRange(segment.start_s, segment.end_s) + " · source " +
        semanticRange(source + segment.start_s, source + segment.end_s)
      : "Linked clip · source " + semanticTime(source);
    const simLink = !privateEdition || semanticLocalHost()
      ? '<div class="v-result-actions"><span>' +
        (Number.isFinite(hit.score) ? "cos " + hit.score.toFixed(2) : "") +
        '</span><a href="' + esc(semanticSimilarURL(hit.doc, hit.window, view, view, segment)) +
        '">Search from this clip ⇄</a></div>'
      : "";
    return '<article class="v-result"><a class="v-result-hit" href="' +
      esc(vizItem(hit.doc, hit.window, segment)) + '">' +
      (img ? '<img src="' + esc(img.asset) + '" loading="lazy" alt="">'
        : '<span class="result-time" aria-hidden="true">▶</span>') +
      '<div><small>' + esc([scope, field, language].filter(Boolean).join(" · ")) +
      '</small><h3 data-title="' + i + '">' + esc(known || "Recording " + id) + '</h3><p>' +
      esc(times + " · " + split) + '</p></div><b aria-hidden="true">↗</b></a>' + simLink + '</article>';
  });
  const headingText = q.startsWith("clip:")
    ? "Matches for " + q.slice(5)
    : "Matches for “" + q + "”";
  results.innerHTML = '<div class="results-head"><h2>' + esc(headingText) + '</h2><span>' +
    esc(semanticViews[view]) + '</span></div>' + (found.length
      ? '<div class="v-result-grid">' + items.join("") + '</div>'
      : '<p>No matches in the indexed clips. Try another description or media view.</p>');
  results.querySelectorAll("[data-title]").forEach((h) =>
    hydrateTitle(found[Number(h.dataset.title)].doc, h, signal));
  return found.length;
}
let semanticPreparedMedia = null;
async function semanticStart(params, signal) {
  const q = (params.get("q") || "").trim().slice(0, 110);
  const view = semanticView(params.get("view"));
  const qSource = semanticSource(params.get("source"));
  const hasClipQuery = params.has("doc") && /^\d{1,9}$/.test(params.get("doc") || "");
  const clipDoc = hasClipQuery ? Number(params.get("doc")) : null;
  const clipWin = hasClipQuery && /^\d{1,6}$/.test(params.get("window") || "0") ? Number(params.get("window") || "0") : 0;
  const clipSource = semanticView(params.get("source") || "av");
  const clipSegment = hasClipQuery && params.has("start") && params.has("end")
    ? semanticSegment(Number(params.get("start")), Number(params.get("end")))
    : undefined;
  const feedback = document.querySelector("#semantic-feedback");
  const coverage = document.querySelector("#semantic-coverage");
  const results = document.querySelector("#v-results");
  let coverageFromResults = false;

  document.querySelectorAll(".semantic-source-tabs button[data-qsource]").forEach((btn) => {
    btn.onclick = () => {
      const next = btn.dataset.qsource;
      const curView = document.querySelector("#semantic-media-view, .semantic-form select[name='view'], #clip-query-view")?.value || view;
      semanticPreparedMedia = null;
      location.hash = semanticURL(next === "text" ? q : "", curView, next);
    };
  });

  const loadCoverage = async () => {
    coverage.textContent = "Checking index coverage…";
    try {
      const status = await semanticFetch("status", null, signal);
      if (!signal.aborted && !coverageFromResults) renderSemanticCoverage(coverage, status);
    } catch {
      if (signal.aborted || coverageFromResults) return;
      coverage.replaceChildren("Index coverage is unavailable. ", semanticRetry("Retry coverage", loadCoverage));
    }
  };
  const applyResponse = async (response, label, targetView) => {
    if (response.status) {
      try {
        renderSemanticCoverage(coverage, response.status);
        coverageFromResults = true;
      } catch {}
    }
    const count = await semanticResults(results, response.results, label, targetView, signal);
    if (!signal.aborted) feedback.textContent = iso(count) + (count === 1 ? " ranked match" : " ranked matches");
  };
  const searchText = async () => {
    feedback.textContent = "Searching the live index…";
    results.replaceChildren();
    results.setAttribute("aria-busy", "true");
    try {
      const response = await semanticFetch("search", { q, view, k: 12 }, signal);
      signal.throwIfAborted();
      await applyResponse(response, q, view);
    } catch {
      if (signal.aborted) return;
      feedback.replaceChildren("Live search could not load results. ", semanticRetry("Retry search", searchText));
    } finally {
      if (!signal.aborted) results.removeAttribute("aria-busy");
    }
  };
  const searchClip = async () => {
    feedback.textContent = "Searching " + semanticViews[view].toLowerCase() + " from clip " + semanticClipSourceNames[clipSource].toLowerCase() + "…";
    results.replaceChildren();
    results.setAttribute("aria-busy", "true");
    const srcSel = document.querySelector("#clip-query-source");
    const viewSel = document.querySelector("#clip-query-view");
    if (srcSel) srcSel.onchange = () => { location.hash = semanticSimilarURL(clipDoc, clipWin, srcSel.value, viewSel?.value || view, clipSegment); };
    if (viewSel) viewSel.onchange = () => { location.hash = semanticSimilarURL(clipDoc, clipWin, srcSel?.value || clipSource, viewSel.value, clipSegment); };
    const titleNode = document.querySelector("#clip-query-title");
    vizDoc(clipDoc).then((doc) => {
      if (!signal.aborted && titleNode?.isConnected) hydrateTitle(doc, titleNode, signal);
    }).catch(() => {});
    try {
      const qp = { doc: clipDoc, window: clipWin, source: clipSource, view, k: 12 };
      if (clipSegment && ["av", "audio", "video"].includes(clipSource)) {
        qp.start_s = clipSegment.start_s;
        qp.end_s = clipSegment.end_s;
      }
      const response = await semanticFetch("similar", qp, signal);
      signal.throwIfAborted();
      if (Array.isArray(response.available_sources) && srcSel) {
        const avail = new Set(response.available_sources);
        [...srcSel.options].forEach((opt) => { opt.disabled = !avail.has(opt.value); });
      }
      const label = "clip:" + semanticClipSourceNames[clipSource] + " of recording #" + clipDoc;
      await applyResponse(response, label, view);
    } catch {
      if (signal.aborted) return;
      feedback.replaceChildren("Live clip-to-modality search could not load results. ", semanticRetry("Retry search", searchClip));
    } finally {
      if (!signal.aborted) results.removeAttribute("aria-busy");
    }
  };

  if (!hasClipQuery && qSource !== "text") {
    const fileInput = document.querySelector("#semantic-media-file");
    const viewSelect = document.querySelector("#semantic-media-view");
    const goBtn = document.querySelector("#semantic-media-go");
    const preview = document.querySelector("#semantic-media-preview");
    const micBtn = document.querySelector("#semantic-mic-btn");
    const runMediaSearch = async () => {
      if (!semanticPreparedMedia || semanticPreparedMedia.source !== qSource) return;
      const tgt = semanticView(viewSelect?.value || view);
      feedback.textContent = "Encoding " + semanticSourceNames[qSource].toLowerCase() + " with EmbeddingGemma 2 & searching " + semanticViews[tgt].toLowerCase() + "…";
      results.replaceChildren();
      results.setAttribute("aria-busy", "true");
      if (goBtn) goBtn.disabled = true;
      try {
        const p = semanticPreparedMedia.payload;
        const payload = { source: qSource, view: tgt, k: 12 };
        if (p.image_b64) payload.image_b64 = p.image_b64;
        if (p.audio_wav_b64) payload.audio_wav_b64 = p.audio_wav_b64;
        if (p.frames_b64) payload.frames_b64 = p.frames_b64;
        const response = await semanticPost("search", payload, signal);
        signal.throwIfAborted();
        await applyResponse(response, "clip:uploaded " + semanticSourceNames[qSource].toLowerCase() + " (" + semanticPreparedMedia.name + ")", tgt);
      } catch (err) {
        if (signal.aborted) return;
        feedback.replaceChildren((err?.message || "Multimodal search failed") + ". ", semanticRetry("Retry search", runMediaSearch));
      } finally {
        if (!signal.aborted) {
          results.removeAttribute("aria-busy");
          if (goBtn) goBtn.disabled = false;
        }
      }
    };
    const showPreview = (name, prepared) => {
      semanticPreparedMedia = { source: qSource, name, payload: prepared };
      if (preview) {
        preview.innerHTML = (prepared.thumb ? '<img src="' + esc(prepared.thumb) + '" alt="Query preview">' : "") +
          '<span><strong>' + esc(name) + '</strong> · ' + esc(prepared.summary) + '</span>';
      }
      if (goBtn) goBtn.disabled = false;
    };
    if (fileInput) {
      fileInput.onchange = async () => {
        const file = fileInput.files?.[0];
        if (!file) return;
        if (preview) preview.textContent = "Preparing " + file.name + "…";
        if (goBtn) goBtn.disabled = true;
        try {
          let prepared;
          if (qSource === "image") prepared = await encodeImageFileForSearch(file);
          else if (qSource === "audio") prepared = await encodeAudioBlobForSearch(file);
          else prepared = await encodeVideoFileForSearch(file, qSource === "av");
          if (signal.aborted) return;
          showPreview(file.name, prepared);
          await runMediaSearch();
        } catch (err) {
          if (!signal.aborted && preview) preview.textContent = "Could not read file: " + (err?.message || "unsupported format");
        }
      };
    }
    if (viewSelect) {
      viewSelect.onchange = () => {
        if (semanticPreparedMedia?.source === qSource) runMediaSearch();
      };
    }
    if (goBtn) goBtn.onclick = runMediaSearch;
    if (micBtn) {
      let recorder = null;
      let stopTimer = null;
      micBtn.onclick = async () => {
        if (recorder && recorder.state === "recording") {
          recorder.stop();
          return;
        }
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const chunks = [];
          recorder = new MediaRecorder(stream);
          recorder.ondataavailable = (ev) => { if (ev.data.size) chunks.push(ev.data); };
          recorder.onstop = async () => {
            clearTimeout(stopTimer);
            stream.getTracks().forEach((t) => t.stop());
            micBtn.textContent = "Record mic (up to 10s)";
            if (preview) preview.textContent = "Resampling recording to 16 kHz WAV…";
            try {
              const prepared = await encodeAudioBlobForSearch(new Blob(chunks, { type: recorder.mimeType || "audio/webm" }));
              if (signal.aborted) return;
              showPreview("Microphone recording", prepared);
              await runMediaSearch();
            } catch (err) {
              if (!signal.aborted && preview) preview.textContent = "Recording failed: " + (err?.message || "decode error");
            }
          };
          recorder.start();
          micBtn.textContent = "Stop recording…";
          if (preview) preview.textContent = "Recording microphone audio (stops automatically at 10s)…";
          stopTimer = setTimeout(() => { if (recorder?.state === "recording") recorder.stop(); }, 10000);
        } catch {
          if (preview) preview.textContent = "Microphone access was unavailable or denied. You can still upload an audio file.";
        }
      };
    }
    await loadCoverage();
    return;
  }
  await Promise.all([loadCoverage(), hasClipQuery ? searchClip() : (q && searchText())]);
}
async function vizStart(params, signal) {
  const mode = vizSearchMode(params);
  if (mode === "semantic") {
    if (!privateEdition || semanticLocalHost()) return semanticStart(params, signal);
    return;
  }
  const q = params.get("q") || "",
    field = Object.hasOwn(fields, params.get("field"))
      ? params.get("field")
      : "all";
  const page = Math.max(0, parseInt(params.get("page") || "0", 10) || 0);
  if (mode !== "concept") {
    if (!q) return;
    const matches = await vizFind(q, field);
    return vizResults(
      matches,
      {
        q,
        field,
        page,
        mode: "text",
        heading: iso(matches.length) + " matching recordings",
      },
      signal,
    );
  }
  const bank = await vizData("concepts.gz");
  if (signal.aborted) return;
  const chosen = params.get("concept") || "",
    view = document.querySelector("#concept-view").value;
  const picker = document.querySelector("#concept-options"),
    input = document.querySelector("#concept-filter");
  const showChoices = () => {
    const terms = vizTokens(input.value);
    const curated = [
      "dog barking",
      "playing violin",
      "sea waves",
      "basketball bounce",
      "airplane flyby",
      "baby laughter",
      "train whistling",
      "fire crackling",
    ];
    const choices = terms.length
      ? bank.classes.filter((c) => terms.every((t) => c.includes(t)))
      : curated.filter((c) => bank.classes.includes(c));
    picker.innerHTML = choices.length
      ? choices
          .slice(0, 30)
          .map((c) =>
            link(vizURL(input.value, "all", 0, "concept", view, c), c),
          )
          .join("")
      : "<span>No encoded concept matches. " +
        link(vizURL(input.value), "Search the release text") +
        "</span>";
  };
  input.oninput = showChoices;
  showChoices();
  document.querySelector("#concept-view").onchange = (e) => {
    location.hash = vizURL(
      input.value,
      "all",
      0,
      "concept",
      e.target.value,
      chosen,
    );
  };
  const index = bank.classes.indexOf(chosen);
  if (index < 0) {
    document.querySelector("#v-results").innerHTML =
      '<p class="viz-note">309 fixed text concepts. The image, video, audiovisual and text views cover 6,744 examples. The audio-only view covers 170.</p>';
    return;
  }
  const panel = bank.panels[view],
    matches = panel.hits[index].map(([id, w]) => ({ id, window: w }));
  return vizResults(
    matches,
    {
      q,
      field,
      page,
      mode: "concept",
      view,
      concept: chosen,
      heading: chosen + " · top 12 of " + iso(panel.count),
    },
    signal,
  );
}
let lastVizSearch = "#visualizer";
function vizItemPage() {
  return (
    back(lastVizSearch, "Visualizer results") +
    tag("Release record") +
    '<h1 id="source-title">Recording</h1><div id="v-item" aria-live="polite"><p>Loading release coordinates…</p></div>'
  );
}
function vizAsBytes(value) {
  if (value instanceof Uint8Array) return value;
  if (value instanceof ArrayBuffer) return new Uint8Array(value);
  if (typeof value === "string")
    return Uint8Array.from(atob(value), (c) => c.charCodeAt(0));
  throw Error("Missing stored media");
}
async function vizProviderRow(doc, w, columns, signal, onProgress) {
  const [vid, wit, split, windows] = doc,
    [offset, start] = windows[w];
  const [pin, idx] = await vizCoordinates(split, offset);
  const wanted = [
    ...new Set([
      ...columns,
      "wit_idx",
      "youtube_video_file_path",
      "youtube_video_starting_time",
    ]),
  ];
  let row;
  try {
    row = await TaliReader.read(
      pin,
      atlas.revision,
      idx,
      wanted,
      signal,
      onProgress,
    );
  } catch (error) {
    signal.throwIfAborted();
    const args = new URLSearchParams({
      dataset: "Antreas/TALI",
      config: "default",
      split,
      offset,
      length: 1,
    });
    let r;
    for (let i = 0; i < 3; i++) {
      if (i) args.set("atlas_retry", String(i));
      try {
        r = await fetch("https://datasets-server.huggingface.co/rows?" + args, {
          credentials: "omit",
          signal,
        });
      } catch {
        signal.throwIfAborted();
      }
      if (r?.ok && r.body) break;
      if (r?.body) await r.body.cancel();
      if (i < 2)
        await new Promise((resolve) => setTimeout(resolve, 300 * (i + 1)));
    }
    if (!r?.ok || !r.body) throw error;
    const reader = r.body.getReader(),
      parts = [];
    let sum = 0;
    const expected = Number(r.headers.get("Content-Length")) || 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      parts.push(value);
      sum += value.length;
      onProgress?.(sum, expected);
    }
    const payload = JSON.parse(await new Blob(parts).text()).rows[0];
    if (payload?.row_idx !== offset) throw Error("Public row index changed");
    row = payload.row;
  }
  if (
    Number(row.wit_idx) !== wit ||
    Number(row.youtube_video_starting_time) !== start ||
    !String(row.youtube_video_file_path).includes(vid)
  )
    throw Error("Release window identity changed");
  return row;
}
function matchedWindows(track, doc, id) {
  const here = document.querySelector("#matched-windows");
  if (!here) return;
  const params = new URLSearchParams(lastVizSearch.split("?")[1] || "");
  if (vizSearchMode(params) !== "text") return;
  const terms = vizTokens(params.get("q") || "");
  if (!terms.length) return;
  const entries = TaliReader.trackEntries(track);
  const groups = doc[3]
    .map(([, start], win) => {
      const text = entries
        .filter(([t]) => start <= t && t < start + 10)
        .map(([, line]) => line)
        .join(" ");
      const tokens = new Set(
        text
          .toLowerCase()
          .normalize("NFKD")
          .replace(/\p{M}/gu, "")
          .match(/[\p{L}\p{N}]+/gu) || [],
      );
      return { start, win, matched: terms.every((t) => tokens.has(t)) };
    })
    .filter((x) => x.matched)
    .sort((a, b) => a.start - b.start);
  if (groups.length)
    here.innerHTML =
      "<b>Search terms occur in subtitles at</b> " +
      groups.map((x) => link(vizItem(id, x.win), clock(x.start))).join(" · ");
}
function showSourceCues(track, second) {
  const cues = TaliReader.cues(track, second);
  const node = document.querySelector("#native-cues");
  if (!node) return;
  node.innerHTML =
    "<h3>Subtitle starts · first ten seconds</h3>" +
    (cues.length
      ? cues
          .map(
            ([t, s]) =>
              '<button type="button" class="cue-line" data-at="' +
              (t - second) +
              '"><b>' +
              clock(t) +
              "</b> " +
              esc(s) +
              "</button>",
          )
          .join("")
      : "<p>No nonempty cue starts in this ten-second window.</p>");
  node.querySelectorAll(".cue-line").forEach(
    (btn) =>
      (btn.onclick = () => {
        const player = document.querySelector("#source-video");
        if (player) {
          player.currentTime = Number(btn.dataset.at);
          player.play().catch(() => {});
        }
      }),
  );
}
async function vizShowItem(id, w, signal, segment) {
  const doc = await vizDoc(id);
  if (!Number.isSafeInteger(w) || w < 0 || w >= doc[3].length)
    throw Error("Unknown release window");
  const [vid, wit, split, windows] = doc,
    [offset, start] = windows[w],
    target = document.querySelector("#v-item");
  if (signal.aborted || !target) return;
  const known = Object.values(atlas.rows).find(
    (row) => row.split === split && row.viewerRow === offset,
  );
  const qTitle = document.querySelector("#source-title");
  qTitle.textContent =
    vizNames.get(vid) || atlas.search.examples[vid] || "Recording " + vid;
  target.innerHTML =
    '<p class="v-record-meta">' +
    esc(split) +
    " · row " +
    iso(offset) +
    " · WIT " +
    wit +
    " · source " +
    clock(start) +
    "</p>" +
    (segment
      ? '<p class="v-record-meta semantic-item-time">Matched clip segment ' +
        semanticRange(segment.start_s, segment.end_s) + ' · source ' +
        semanticRange(start + segment.start_s, start + segment.end_s) + '</p>'
      : "") +
    '<div class="window-pick"><label for="v-window">Retained window</label><select id="v-window">' +
    windows
      .map(([, s], j) => [s, j])
      .sort((a, b) => a[0] - b[0])
      .map(
        ([s, j]) =>
          '<option value="' +
          j +
          '" ' +
          (j === w ? "selected" : "") +
          ">" +
          clock(s) +
          "</option>",
      )
      .join("") +
    "</select>" +
    external(viewerURL(split, offset), "Release row") +
    '</div>' +
    '<form id="item-similar-form" class="item-similar-bar"><strong>All-to-all search from this clip</strong>' +
    '<label>Signal <select id="item-sim-source">' +
    Object.entries(semanticClipSourceNames).map(([k, lbl]) => '<option value="' + k + '">' + esc(lbl) + '</option>').join("") +
    '</select></label><label>Match against <select id="item-sim-view">' +
    Object.entries(semanticViews).map(([k, lbl]) => '<option value="' + k + '">' + esc(lbl) + '</option>').join("") +
    '</select></label><button type="submit" class="semantic-media-btn">Search <span aria-hidden="true">↗</span></button></form>' +
    '<div class="source-layout"><div class="source-screen" id="source-screen">' +
    '<button id="v-download" type="button" class="v-download">▶ &nbsp; ' +
    (segment ? "Load matched segment" : "Load recording and sound") + '</button><div id="transfer" role="status"></div></div>' +
    '<aside class="source-context"><h2>Wikipedia reference</h2><div id="source-reference">' +
    (atlas.images[wit]
      ? photo(wit, "Linked WIT image")
      : "<p>Loading the WIT reference…</p>") +
    '</div></aside></div><div id="matched-windows"></div><section id="native-cues"></section>';
  document.querySelector("#v-window").onchange = (e) =>
    (location.hash = vizItem(id, Number(e.target.value)));
  const simForm = document.querySelector("#item-similar-form");
  if (simForm) {
    simForm.onsubmit = (ev) => {
      ev.preventDefault();
      const src = document.querySelector("#item-sim-source")?.value || "av";
      const tgt = document.querySelector("#item-sim-view")?.value || "av";
      const nextURL = semanticSimilarURL(id, w, src, tgt, segment);
      if (!nextURL.startsWith("#")) location.assign(nextURL);
      else location.hash = nextURL;
    };
  }
  if (privateEdition)
    vizMiniRecord(doc, w, signal)
      .then((local) => {
        if (!local || signal.aborted) return;
        const a = document.createElement("a");
        a.href = "/#record/" + encodeURIComponent(local.id);
        a.textContent = local.playable
          ? "Play local media"
          : "Open in the Mac mini player";
        document.querySelector(".window-pick")?.append(a);
        if (local.recording_title)
          qTitle.textContent =
            compactTitle(local.recording_title) || qTitle.textContent;
      })
      .catch(() => {});
  const button = document.querySelector("#v-download");
  button.onclick = async () => {
    const status = document.querySelector("#transfer");
    button.disabled = true;
    status.innerHTML =
      '<progress aria-label="Media download"></progress><span>Requesting the stored clip…</span>';
    try {
      const row = await vizProviderRow(
        doc,
        w,
        [
          "youtube_video_content",
          "youtube_title_text",
          "youtube_subtitle_text",
        ],
        signal,
        (received, total) => {
          if (signal.aborted) return;
          const bar = status.querySelector("progress"),
            label = status.querySelector("span");
          if (total > 0) {
            bar.max = Math.max(received, total);
            bar.value = received;
          }
          label.textContent =
            "Receiving source data · " +
            (received / 1e6).toFixed(1) +
            (total > 0 ? " / " + (total / 1e6).toFixed(1) : "") +
            " MB";
        },
      );
      const media = vizAsBytes(row.youtube_video_content),
        hash = sha256(media);
      if (known?.clipHash && known.clipHash !== hash)
        throw Error("Stored clip checksum changed");
      signal.throwIfAborted();
      const url = URL.createObjectURL(new Blob([media], { type: "video/mp4" }));
      vizBlobURLs.push(url);
      const screen = document.querySelector("#source-screen");
      screen.innerHTML =
        '<video id="source-video" playsinline controls preload="metadata"></video><details><summary>Audio-only player</summary><audio id="source-audio" controls preload="none"></audio></details>' +
        "<small>Release coordinates checked · " +
        (media.length / 1e6).toFixed(1) +
        " MB · SHA-256 " +
        hash.slice(0, 12) +
        "</small>";
      const v = document.querySelector("#source-video"),
        a = document.querySelector("#source-audio");
      const mediaURL = segment ? url + "#t=" + segment.start_s + "," + segment.end_s : url;
      v.src = mediaURL;
      a.src = mediaURL;
      v.onplay = () => a.pause();
      a.onplay = () => v.pause();
      if (segment) v.play().catch(() => {
        // The media controls remain available when autoplay is blocked.
      });
      qTitle.textContent =
        compactTitle(row.youtube_title_text) || qTitle.textContent;
      document.title = qTitle.textContent + " · TALI Visualizer";
      showSourceCues(row.youtube_subtitle_text, start);
      matchedWindows(row.youtube_subtitle_text, doc, id);
    } catch {
      if (signal.aborted) return;
      status.innerHTML =
        "The source could not be loaded. " +
        external(viewerURL(split, offset), "Open on Hugging Face");
      button.disabled = false;
    }
  };
  try {
    const row = await vizProviderRow(
      doc,
      w,
      [
        "youtube_title_text",
        "wit_features",
        "image_url",
        "youtube_subtitle_text",
      ],
      signal,
    );
    if (signal.aborted) return;
    const name = compactTitle(row.youtube_title_text);
    if (name) {
      qTitle.textContent = name;
      document.title = name + " · TALI Visualizer";
      vizNames.set(vid, name);
    }
    const f = row.wit_features || {},
      languages = f.language || [],
      native = Math.max(0, languages.indexOf("en"));
    const title = f.page_title?.[native],
      caption = f.caption_reference_description?.[native];
    const ref = document.querySelector("#source-reference");
    let photoSrc = "";
    if (row.image?.bytes) {
      const buf = vizAsBytes(row.image.bytes);
      photoSrc = URL.createObjectURL(new Blob([buf]));
      vizBlobURLs.push(photoSrc);
    } else if (
      typeof row.image?.src === "string" &&
      row.image.src.startsWith("https://")
    )
      photoSrc = row.image.src;
    else if (atlas.images[wit]) photoSrc = atlas.images[wit].asset;
    else if (
      String(row.image_url || "").startsWith("https://upload.wikimedia.org/")
    )
      photoSrc = row.image_url;
    ref.innerHTML =
      (photoSrc
        ? '<img class="wit-picture" src="' +
          esc(photoSrc) +
          '" alt="Linked WIT reference photograph">'
        : "") +
      (title ? "<h3>" + esc(title) + "</h3>" : "") +
      (caption ? "<p>" + esc(String(caption).slice(0, 550)) + "</p>" : "") +
      (String(row.image_url || "").startsWith("https://")
        ? external(row.image_url, "Image source")
        : "");
    const recoverPhoto = async () => {
      if (signal.aborted || !ref.isConnected) return;
      try {
        const original = await vizProviderRow(doc, w, ["image"], signal);
        signal.throwIfAborted();
        let url;
        if (original.image?.bytes) {
          url = URL.createObjectURL(
            new Blob([vizAsBytes(original.image.bytes)]),
          );
          vizBlobURLs.push(url);
        } else if (
          typeof original.image?.src === "string" &&
          original.image.src.startsWith("https://")
        )
          url = original.image.src;
        if (!url || !ref.isConnected) return;
        let image = ref.querySelector("img");
        if (!image) {
          image = document.createElement("img");
          image.className = "wit-picture";
          image.alt = "Linked WIT reference photograph";
          ref.prepend(image);
        }
        image.src = url;
      } catch {
        /* The source link and text remain available if a photograph cannot be read. */
      }
    };
    const picture = ref.querySelector("img");
    if (!picture || (picture.complete && !picture.naturalWidth)) recoverPhoto();
    else picture.addEventListener("error", recoverPhoto, { once: true });
    if (atlas.images[wit]) {
      const creditLink = document.createElement("a");
      creditLink.href = "#credits";
      creditLink.textContent = "Image credits";
      ref.append(document.createTextNode(" · "), creditLink);
    }
    showSourceCues(row.youtube_subtitle_text, start);
    matchedWindows(row.youtube_subtitle_text, doc, id);
  } catch {
    if (signal.aborted) return;
    const n = document.querySelector("#source-reference");
    n.insertAdjacentHTML(
      "beforeend",
      "<p>" +
        external(viewerURL(split, offset), "Inspect the original fields") +
        "</p>",
    );
  }
}
function activateVisualizer(section, key) {
  bindVizForms();
  bindScaleUnits();
  if (section !== "visualizer") return;
  vizController = new AbortController();
  const sig = vizController.signal;
  const params = new URLSearchParams(location.hash.split("?")[1] || "");
  const pieces = location.hash.split("?")[0].slice(1).split("/");
  let work;
  if (key === "item") {
    const segment = params.has("start") && params.has("end") && params.get("start") !== "" && params.get("end") !== ""
      ? semanticSegment(Number(params.get("start")), Number(params.get("end")))
      : undefined;
    work = vizShowItem(Number(pieces[2]), Number(pieces[3] || 0), sig, segment);
  }
  else {
    lastVizSearch = location.hash;
    work = vizStart(params, sig);
  }
  work.catch(() => {
    if (!sig.aborted) {
      const n = document.querySelector("#v-results,#v-item");
      if (n)
        n.innerHTML =
          "<p>The source could not be read. " +
          link("#visualizer", "Return to search") +
          "</p>";
    }
  });
}

;
"use strict";

// Both examples are retained release rows under WIT index 235882.
const openingRecords = [
  { id: "504001602", title: "Mass Effect retrospective", offset: 9 },
  { id: "504001609", title: "Minecraft meetup", offset: 1 },
];

const durationUnits = {
  weeks: { seconds: 604800, decimals: 1 },
  months: { seconds: 86400 * 365.2425 / 12, decimals: 1 },
  hours: { seconds: 3600, decimals: 0 },
};
function scaleNumber(value, digits = 0) {
  return value.toLocaleString("en-US", { maximumFractionDigits: digits, minimumFractionDigits: digits });
}
function playbackValues(unit) {
  const { seconds, decimals } = durationUnits[unit];
  return ["video", "audio"].map((kind) => {
    const value = atlas.scale.duration[kind].estimate_seconds / seconds;
    const rounded = unit === "hours" ? Math.round(value / 10) * 10 : value;
    return `<div><dt>${kind === "video" ? "Video" : "Audio"}</dt><dd>${scaleNumber(rounded, decimals)} <small>${unit}</small></dd></div>`;
  }).join("");
}
function bindScaleUnits() {
  const select = main.querySelector("#duration-unit");
  if (select) select.onchange = () => {
    main.querySelector("#duration-values").innerHTML = playbackValues(select.value);
  };
}
function datasetScale() {
  const { census: c, duration: d, sample } = atlas.scale;
  const span = c.median_span_between_first_and_last_start_s;
  const nominalExtraDays = Math.round((c.nominal_row_seconds - d.video.estimate_seconds) / 86400);
  const hourRange = (kind) => d[kind].interval_95_seconds.map((v) => scaleNumber(Math.round(v / 3600))).join("–");
  return `<section class="release-scale" id="story-scale" aria-labelledby="scale-heading">
    <div class="scale-top"><div><h2 id="scale-heading" tabindex="-1">How much is in TALI?</h2>
    <p>${scaleNumber(c.rows)} stored clips from ${scaleNumber(c.recordings)} recordings, linked to ${scaleNumber(c.entries)} Wikipedia image–text entries.</p></div>
    <label class="scale-unit">Playback unit <select id="duration-unit"><option value="weeks">Weeks</option><option value="months">Months</option><option value="hours">Hours</option></select></label></div>
    <dl class="scale-durations" id="duration-values" aria-live="polite">${playbackValues("weeks")}</dl>
    <p class="scale-basis">Estimated playback time if every clip is played once. Video and audio play together. The video adds up to about ${scaleNumber(d.video.estimate_seconds / durationUnits.months.seconds, 1)} months.</p>
    <div class="scale-facts">
      <article><h3>${scaleNumber(c.two_recording_entries)} paired references</h3><p>One Wikipedia reference leads to two recordings. In ${scaleNumber(c.sibling_titles_without_a_common_word)} pairs, the two titles share no words.</p>${link("#pairs","See paired recordings →")}</article>
      <article><h3>${Math.floor(span/60)} min ${span%60} s apart</h3><p>The median distance from a recording’s first selected clip start to its last. The original timestamps let you see what the collector skipped.</p>${link("#read/example","Follow two recording timelines →")}</article>
      <article><h3>${scaleNumber(c.wikipedia_editions)} Wikipedia editions</h3><p>The same reference image can appear in articles across editions. Browse real photographs by topic and edition.</p>${link("#editions","Explore the contact sheet →")}</article>
    </div>
    <details class="scale-details"><summary>Where do the numbers come from?</summary>
      <p>Counts cover all ${scaleNumber(c.shards)} release shards. The stored clip-file sizes sum to ${scaleNumber(c.media_file_bytes / 1e12,2)} TB. We measured the video and audio track lengths separately in ${scaleNumber(sample.clips)} clips from ${sample.blocks} randomly selected blocks spanning ${sample.record_shards} shards across train, validation and test. We weighted each split back to its size.</p>
      <p>In the sample, ${scaleNumber(d.video.sample_positive_tracks_under_ten_seconds)} clips contained less than ten seconds of video. Counting every row as exactly 30 seconds would overstate the estimated video total by about ${nominalExtraDays} days.</p>
      <p>Approximate 95% sampling intervals are ${hourRange("video")} hours of video and ${hourRange("audio")} hours of audio. The audio total includes silence. A month here averages 30.44 days.</p>
      <a href="measurements/000.json" download="tali-release-scale.json">Download the measurements and method (JSON) ↓</a>
    </details></section>`;
}

function datasetCollection() {
  return `<section class="story-section" id="story-collection" aria-labelledby="collection-heading">
    <h2 id="collection-heading" tabindex="-1">How TALI was built</h2>
    <ol class="collection-sequence">
      <li><h3>Start with a Wikipedia image</h3><p>A Wikipedia-based Image Text (WIT) entry supplies a photograph or illustration, its caption when present, and text from the page where it appeared.</p></li>
      <li><h3>Look for recordings</h3><p>The collector searched YouTube using Wikipedia titles or captions. It used CLIP text embeddings to rank candidate recording titles against the original query.</p></li>
      <li><h3>Keep moments in time</h3><p>The filtering code compared the first frame of each 30-second segment with the search text and kept up to ten segments per recording, together with their source offsets.</p></li>
    </ol>
    <details class="collector-note"><summary>How much did the search order matter?</summary>
      <p>A surviving notebook contains 62 queries run with both relevance and view-count ordering. Only 22 returned the same first-ranked recording. Eight shared no candidates at all. These counts describe the saved searches; the full release has 143,250 recordings.</p>
      <p>The 2023 presentation names the recording title as the text used to score frames. The surviving filtering code uses the source query. The release preserves the chosen clips; its complete run history is unavailable.</p>
    </details>
  </section>`;
}

function datasetExample() {
  const reference = atlas.rows[openingRecords[0].id].wit;
  const end = Math.max(...openingRecords.flatMap(({ id }) => atlas.rows[id].starts));
  const buttons = openingRecords.map(({ id, title }, i) =>
    `<button type="button" data-story-record="${id}" aria-pressed="${i === 0}" aria-controls="moment-${id}">${esc(title)}</button>`
  ).join("");
  const moments = openingRecords.map(({ id, title, offset }, i) => {
    const row = atlas.rows[id];
    return `<div id="moment-${id}" class="story-moment"${i ? " hidden" : ""}>
      ${recordBox(id, title, offset, end)}
      <p class="moment-caption">In the ten seconds beginning at ${clock(row.start)}, ${row.cues.length} subtitle cues start.
      ${i === 0 ? "The frame at 6:39 shows Tali’s visor. The linked photograph depicts a different Mass Effect character." : "Play the meetup at 2:01. PAX Prime connects this recording to the same photograph."}</p>
    </div>`;
  }).join("");
  return `<section class="story-section" id="story-example" aria-labelledby="example-heading">
    <h2 id="example-heading" tabindex="-1">One photograph, two recordings</h2>
    <p class="story-intro">A photograph of Legion cosplay at PAX Prime leads to two very different places. Switch the recording to see which moments TALI retained and play the same moment in the source.</p>
    <div class="story-example">
      <figure class="linked-inset story-reference"><div>${pic(reference, "Helmet detail from the linked photograph of Legion cosplay at PAX Prime 2013")}</div>
        <figcaption>Legion at PAX Prime, 2013 · detail of the linked WIT photograph</figcaption>${credit(reference)}
      </figure>
      <div class="story-player"><div class="story-switch" role="group" aria-label="Choose a linked recording">${buttons}</div>${moments}</div>
    </div>
    <p class="story-foot">The image and article belong to the reference entry. Audio and frames share the recording clock. A subtitle cue has its own start time. ${link("#pairs", "Explore 30 more two-recording references →")}</p>
  </section>`;
}

function datasetEditions() {
  const { topics, counts } = atlas.sheet;
  const options = (values, selected, label) => values.map((v) =>
    `<option value="${esc(v)}"${v === selected ? " selected" : ""}>${esc(label(v))}</option>`
  ).join("");
  const names = new Intl.DisplayNames("en", { type: "language" });
  const editionLabel = (code) => {
    if (code === "simple") return "Simple English (simple)";
    try { return (names.of(code) || code) + " (" + code + ")"; }
    catch { return code; }
  };
  return `<section class="story-section" id="story-editions" aria-labelledby="edition-heading">
    <h2 id="edition-heading" tabindex="-1">Which subjects appear across editions?</h2>
    <p class="story-intro">Choose a subject and a Wikipedia edition. The paper matched words in English page titles across all 105,544 WIT entries, then counted the distinct entries and recordings with a page in each edition.</p>
    <div class="edition-reader"><div class="edition-inputs">
      <label>Subject<select id="story-topic">${options(Object.keys(topics), "Land and water", v => v)}</select></label>
      <label>Wikipedia edition<select id="story-edition">${options(Object.keys(counts).sort(), "ja", editionLabel)}</select></label>
      ${link("#editions", "Compare the full contact sheet →")}</div>
      <div class="edition-result" id="story-cell" aria-live="polite"></div>
    </div>
    <p class="story-foot">Eleven word lists match ${iso(atlas.sheet.matched_entries)} entries linked to ${iso(atlas.sheet.matched_recordings)} recordings. An entry can appear under several subjects or editions. The edition identifies the Wikipedia source; the recording may be in a different language.</p>
  </section>`;
}

function drawDatasetCell() {
  const topic = document.querySelector("#story-topic").value;
  const code = document.querySelector("#story-edition").value;
  const [entries, recordings] = atlas.sheet.counts[code][topic];
  const sample = atlas.sheet.illustrated.find(item => item.topic === topic && item.edition === code);
  let example = "";
  if (entries > 0 && sample?.record && atlas.images[sample.wit]) {
    example = `<figure class="cell-example"><a href="#record/${esc(sample.record)}">${pic(sample.wit, sample.example_title)}</a>
      <figcaption>${link("#record/" + sample.record, sample.example_title)} · ${link("#credits", "Image credits")}</figcaption></figure>`;
  } else if (!entries) {
    example = '<p class="empty-cell">No title matched this word list in the selected edition.</p>';
  }
  document.querySelector("#story-cell").innerHTML = `<div class="edition-counts"><span><b>${iso(entries)}</b>distinct entries</span><span><b>${iso(recordings)}</b>distinct recordings</span></div>${example}`;
}

function bindDatasetStory() {
  const topic = document.querySelector("#story-topic");
  if (!topic) return;
  topic.addEventListener("change", drawDatasetCell);
  document.querySelector("#story-edition").addEventListener("change", drawDatasetCell);
  drawDatasetCell();
  const switches = [...document.querySelectorAll("[data-story-record]")];
  for (const toggle of switches) {
    toggle.addEventListener("click", () => {
      for (const b of switches) {
        const selected = b === toggle;
        const panel = document.getElementById(b.getAttribute("aria-controls"));
        if (!selected && !panel.hidden) {
          panel.querySelectorAll("video,audio").forEach(media => media.pause());
          const player = panel.querySelector("iframe");
          if (player) {
            player.remove();
            const play = panel.querySelector("button.play");
            play.disabled = false;
            play.textContent = "Play on YouTube";
          }
        }
        panel.hidden = !selected;
        b.setAttribute("aria-pressed", String(selected));
      }
    });
  }
}

;
"use strict";

const datasetGuide = document.getElementById("datasets");
const exampleTabs = Array.from(datasetGuide.querySelectorAll("[data-example]"));
const examplePanels = Array.from(datasetGuide.querySelectorAll("[data-example-panel]"));

function selectDatasetExample(name) {
  for (const tab of exampleTabs) {
    const selected = tab.dataset.example === name;
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
  }
  for (const panel of examplePanels) {
    panel.hidden = panel.dataset.examplePanel !== name;
  }
}

for (const [index, tab] of exampleTabs.entries()) {
  tab.addEventListener("click", () => selectDatasetExample(tab.dataset.example));
  tab.addEventListener("keydown", (event) => {
    const positions = {
      ArrowLeft: (index + exampleTabs.length - 1) % exampleTabs.length,
      ArrowRight: (index + 1) % exampleTabs.length,
      Home: 0,
      End: exampleTabs.length - 1,
    };
    if (!Object.hasOwn(positions, event.key)) return;
    event.preventDefault();
    const next = exampleTabs[positions[event.key]];
    selectDatasetExample(next.dataset.example);
    next.focus();
  });
}
for (const panel of examplePanels) {
  panel.setAttribute("role", "tabpanel");
  panel.setAttribute("aria-labelledby", "tab-" + panel.dataset.examplePanel);
  const button = panel.querySelector(".copy-example");
  button.hidden = false;
  button.addEventListener("click", async () => {
    const code = panel.querySelector("pre code");
    const status = datasetGuide.querySelector(".copy-status");
    try {
      await navigator.clipboard.writeText(code.textContent + "\n");
      button.textContent = "Copied";
      status.textContent = "Copied Python to clipboard.";
    } catch {
      const range = document.createRange();
      range.selectNodeContents(code);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = "Code selected. Use your system copy shortcut.";
    }
  });
  button.addEventListener("blur", () => { button.textContent = "Copy Python"; });
}
selectDatasetExample("clip");
datasetGuide.querySelector(".example-tabs").hidden = false;

;
"use strict";
let atlas;
const main = document.querySelector("main");
const privateEdition = document.documentElement.dataset.edition === "private";
const mediaLoads = new Set();
const mediaUrls = new Set();
const esc = (v) =>
  String(v ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const iso = (n) => n.toLocaleString("en-US");
const clock = (n) =>
  Math.floor(n / 60) + ":" + String(Math.floor(n % 60)).padStart(2, "0");
const tag = (text) => '<p class="eyebrow">' + esc(text) + "</p>";
const button = (url, label, light = false) =>
  '<a class="btn' +
  (light ? " light" : "") +
  '" href="' +
  esc(url) +
  '">' +
  esc(label) +
  "</a>";
const link = (url, label) =>
  '<a href="' + esc(url) + '">' + esc(label) + "</a>";
const external = (url, label) =>
  '<a rel="external noreferrer" href="' +
  esc(url) +
  '">' +
  esc(label) +
  " ↗</a>";
const watch = (r, offset = 0) =>
  "https://www.youtube.com/watch?v=" +
  r.video +
  "&t=" +
  Math.floor(r.start + offset) +
  "s";
const headings = (title, description) =>
  "<h1>" + esc(title) + '</h1><p class="lead">' + esc(description) + "</p>";
const back = (route, label) =>
  '<p class="crumb">' + link(route, "← " + label) + "</p>";
const section = (title, body, more = "") =>
  '<section class="section"><div class="section-head"><h2>' +
  esc(title) +
  "</h2>" +
  more +
  "</div>" +
  body +
  "</section>";
const pic = (wid, alt, cls = "photo", lazy = true) =>
  atlas.images[wid]
    ? '<img class="' +
      cls +
      '" src="' +
      esc(atlas.images[wid].asset) +
      '" alt="' +
      esc(alt) +
      '" ' +
      (lazy ? 'loading="lazy"' : 'fetchpriority="high"') +
      ' decoding="async">'
    : "";
function credit(wid) {
  const x = atlas.images[wid];
  if (!x) return "";
  return (
    '<figcaption class="credit">' +
    (x.cropped ? "Cropped detail · " : "") +
    external(x.file, "Original image and creator credit") +
    " · " +
    external(x.terms, x.license) +
    "</figcaption>"
  );
}
function photo(wid, label) {
  return (
    "<figure>" +
    pic(wid, label) +
    '<p class="credit">' +
    esc(label) +
    "</p>" +
    credit(wid) +
    "</figure>"
  );
}
function ticks(row, end) {
  const width = end || Math.max(...row.starts, 10);
  const marks = row.starts
    .map(
      (t) =>
        '<i aria-hidden="true" ' +
        (t === row.start ? 'class="selected" ' : "") +
        'style="left:' +
        (100 * t) / width +
        '%"></i>',
    )
    .join("");
  return (
    '<div class="sig" role="img" aria-label="' +
    row.starts.length +
    " retained starts; highlighted window at " +
    clock(row.start) +
    '">' +
    marks +
    '</div><div class="scale"><span>0:00</span><span>' +
    clock(width) +
    "</span></div>"
  );
}
function recordBox(
  id,
  title,
  frame = null,
  commonEnd = null,
  sourceView = false,
) {
  const r = atlas.rows[id];
  if (!r) return "";
  const excerpt = frame === null ? r.start : r.start + frame;
  const ref = sourceView ? "" : link("#record/" + id, "Record " + id);
  const start = r.cues
    .map((t) => "+" + Math.round(t * 100) / 100 + " s")
    .join(", ");
  return (
    '<article class="record-box"><h3>' +
    esc(title) +
    "</h3>" +
    ticks(r, commonEnd) +
    '<p class="measure">' +
    r.starts.length +
    " retained " +
    (r.starts.length === 1 ? "start" : "starts") +
    " · selected window " +
    clock(r.start) +
    "–" +
    clock(r.start + 10) +
    "</p>" +
    '<div class="links">' +
    (r.clipHash
      ? '<button class="btn load-clip" type="button" data-id="' +
        esc(id) +
        '" data-offset="' +
        (frame || 0) +
        '">Load TALI clip at ' +
        clock(excerpt) +
        "</button>"
      : "") +
    (id === "564000649"
      ? ""
      : '<button class="btn light play" type="button" data-video="' +
        esc(r.video) +
        '" data-time="' +
        Math.floor(excerpt) +
        '">Play on YouTube</button>') +
    (id === "564000649"
      ? '<span class="fine">The original YouTube upload is unavailable.</span>'
      : external(watch(r, frame || 0), "YouTube source")) +
    ref +
    (privateEdition ? link("/#record/" + id, "Load release media") : "") +
    "</div>" +
    (sourceView
      ? '<p class="sub">Stored subtitle cue starts in this window: ' +
        (start || "none") +
        ".</p>"
      : "") +
    "</article>"
  );
}
function tile(route, img, alt, over, title, desc = "", cls = "") {
  return (
    '<a class="tile ' +
    cls +
    '" href="' +
    esc(route) +
    '">' +
    (img
      ? '<img loading="lazy" decoding="async" src="' +
        esc(img) +
        '" alt="' +
        esc(alt) +
        '">'
      : "") +
    "<article>" +
    tag(over) +
    "<h3>" +
    esc(title) +
    "</h3>" +
    (desc ? "<p>" + esc(desc) + "</p>" : "") +
    "</article></a>"
  );
}
function featureTile(h) {
  const r = atlas.rows[h.rid];
  return tile(
    "#case/" + h.slug,
    atlas.images[r.wit]?.asset,
    h.reference,
    h.name,
    h.title,
    h.reference,
  );
}
function plateTile(p) {
  return tile(
    "#atlas/" + p.key,
    p.thumb,
    "",
    p.chapter + " · " + p.key,
    p.title,
    "",
    "plate",
  );
}
function pairTile(p) {
  return tile(
    "#pairs/" + p.wit,
    atlas.images[p.wit]?.asset,
    p.reference,
    "Two recordings",
    p.title,
    p.reference,
  );
}
function mini(route, title, desc) {
  return (
    '<a class="mini-link" href="' +
    esc(route) +
    '"><strong>' +
    esc(title) +
    "</strong><p>" +
    esc(desc) +
    "</p></a>"
  );
}
const grid = (list) => '<div class="grid">' + list.join("") + "</div>";
const minis = (list) => '<div class="mini-grid">' + list.join("") + "</div>";
function coverFrame() {
  const c = atlas.paper.companion;
  return (
    '<figure class="visor-cover"><div class="visor-stage" data-cover-frame>' +
    '<img class="standby-portrait" src="' +
    esc(c.asset) +
    '" alt="Detail of a masked Tali cosplay at San Diego Comic-Con in 2015">' +
    '</div><figcaption class="credit">Companion photograph from WIT · cropped · ' +
    external(c.file, c.creator) +
    " · " +
    external(c.terms, c.license) +
    "</figcaption></figure>"
  );
}

const stillCache = new Map();
async function showCoverFrame(stage) {
  const row = atlas.rows["504001602"];
  const alt = "Tali’s visor in the Mass Effect retrospective at 6:39";
  const present = (src) => {
    if (!stage.isConnected) return;
    const image = new Image();
    image.alt = alt;
    image.className = "cover-still";
    image.src = src;
    stage.replaceChildren(image);
    stage.parentElement.querySelector("figcaption").innerHTML = link(
      "#record/504001602",
      "Tali at 6:39 · verified release frame",
    );
    stage.dataset.verified = "true";
  };
  if (stillCache.has(row.clipHash)) {
    present(stillCache.get(row.clipHash));
    return;
  }
  if (navigator.connection?.saveData) return;
  const controller = new AbortController();
  mediaLoads.add(controller);
  let url, timer;
  try {
    timer = setTimeout(() => controller.abort(), 60000);
    url = await verifiedClipURL(row, controller);
    if (!stage.isConnected || controller.signal.aborted) return;
    const [frame] = await seekFrames(url, [9], controller.signal, 640);
    if (controller.signal.aborted || !stage.isConnected) return;
    stillCache.set(row.clipHash, frame);
    present(frame);
  } catch {
    // Keep the separately credited WIT portrait available on slow or offline connections.
  } finally {
    clearTimeout(timer);
    if (url) URL.revokeObjectURL(url);
    mediaLoads.delete(controller);
  }
}

function selectedItems() {
  return [
    ...atlas.paper.main.map((s, i) => ({ ...s, number: "Figure " + (i + 2) })),
    ...atlas.paper.appendix
      .flatMap((g) => g.items)
      .map((s, i) => ({ ...s, number: "Figure A" + (i + 1) })),
  ];
}
async function seekFrames(url, times, signal, maxWidth) {
  const video = document.createElement("video");
  video.muted = true;
  video.playsInline = true;
  video.preload = "auto";
  const next = (event, act) =>
    new Promise((resolve, reject) => {
      const clean = () => {
        video.removeEventListener(event, done);
        video.removeEventListener("error", failed);
        signal.removeEventListener("abort", failed);
      };
      const done = () => {
        clean();
        resolve();
      };
      const failed = () => {
        clean();
        reject(new Error("Frame could not be decoded"));
      };
      signal.throwIfAborted();
      signal.addEventListener("abort", failed, { once: true });
      video.addEventListener("error", failed, { once: true });
      video.addEventListener(event, done, { once: true });
      act();
    });
  try {
    await next("loadedmetadata", () => {
      video.src = url;
    });
    const frames = [];
    for (const t of times) {
      if (t < 0 || t >= video.duration)
        throw Error("Frame time outside release clip");
      await next("seeked", () => {
        video.currentTime = t;
      });
      if (!video.videoWidth || Math.abs(video.currentTime - t) > 0.1)
        throw Error("Frame time changed");
      const canvas = document.createElement("canvas");
      canvas.width = Math.min(video.videoWidth, maxWidth);
      canvas.height = Math.round(
        (canvas.width * video.videoHeight) / video.videoWidth,
      );
      canvas
        .getContext("2d")
        .drawImage(video, 0, 0, canvas.width, canvas.height);
      frames.push(canvas.toDataURL("image/webp", 0.91));
    }
    return frames;
  } finally {
    video.removeAttribute("src");
    video.load();
  }
}

async function loadPaperFrames(button) {
  const box = button.closest(".pair-sample"),
    row = atlas.rows[button.dataset.record];
  const status = box.querySelector(".frame-status"),
    container = box.querySelector(".frame-strip");
  const controller = new AbortController();
  mediaLoads.add(controller);
  button.disabled = true;
  let url;
  try {
    status.textContent = "Requesting the release clip…";
    url = await verifiedClipURL(row, controller, (n, total, checking) => {
      status.textContent = checking
        ? "Checking the source clip…"
        : "Receiving clip · " +
          Math.min(98, Math.round((100 * n) / total)) +
          "%";
    });
    const frames = await seekFrames(
      url,
      row.frameOffsets,
      controller.signal,
      520,
    );
    controller.signal.throwIfAborted();
    const cards = frames.map((frame, i) => {
      const img = new Image();
      img.src = frame;
      img.alt = "Recording frame at " + clock(row.start + row.frameOffsets[i]);
      const fig = document.createElement("figure"),
        cap = document.createElement("figcaption");
      cap.textContent = "+" + row.frameOffsets[i] + " s in the clip";
      fig.append(img, cap);
      return fig;
    });
    container.replaceChildren(...cards);
    button.hidden = true;
    status.textContent =
      "Verified release clip · original start " + clock(row.start);
  } catch {
    if (!controller.signal.aborted) {
      status.textContent =
        "The source clip is unavailable. The reference photograph and source link are available.";
      button.disabled = false;
      button.textContent = "Retry recording frames";
    }
  } finally {
    if (url) URL.revokeObjectURL(url);
    mediaLoads.delete(controller);
  }
}

function recordPhotos(p) {
  const single = p.records.length === 1;
  return (
    '<div class="photo-rail' +
    (single ? " single-source" : "") +
    '">' +
    p.records
      .map(({ id, label }) => {
        const row = atlas.rows[id],
          alt = single ? p.title : "Reference photograph linked to " + label;
        return (
          '<article class="pair-sample"><figure><a href="#record/' +
          esc(id) +
          '">' +
          pic(row.wit, alt) +
          "<span>" +
          esc(single ? "Linked WIT photograph" : label) +
          "</span></a>" +
          credit(row.wit) +
          "</figure>" +
          '<div class="sample-frames"><button type="button" class="btn light load-frames" data-record="' +
          esc(id) +
          '">' +
          (row.frameOffsets.length === 1
            ? "Show the recording frame"
            : "Show the three recording frames") +
          '</button><span class="frame-status" role="status"></span><div class="frame-strip"></div></div></article>'
        );
      })
      .join("") +
    "</div>"
  );
}

function guideTile(item) {
  const p = atlas.plates[item.key];
  const two = p.key === "original-02" || p.key === "original-03";
  const art = two
    ? '<div class="photo-strip">' +
      p.records
        .slice(0, 3)
        .map(({ id, label }) => pic(atlas.rows[id].wit, label))
        .join("") +
      "</div>"
    : '<img loading="lazy" decoding="async" src="' + esc(p.thumb) + '" alt="">';
  const sample =
    p.records.length === 1 && atlas.rows[p.records[0].id]?.paperPlate === p.key;
  const preview = sample
    ? pic(
        atlas.rows[p.records[0].id].wit,
        "Reference image for " + p.title,
        "case-preview",
      )
    : art;
  return (
    '<a class="guide-tile" href="#atlas/' +
    esc(p.key) +
    '">' +
    preview +
    "<article>" +
    tag(item.number) +
    "<h3>" +
    esc(item.title || p.title) +
    "</h3><p>" +
    esc(item.note) +
    "</p>" +
    (item.scope ? "<small>" + esc(item.scope) + "</small>" : "") +
    "</article></a>"
  );
}
function paperGuide() {
  const entries = selectedItems();
  let n = 4;
  const groups = atlas.paper.appendix
    .map((g) => {
      const cards = entries.slice(n, n + g.items.length);
      n += g.items.length;
      return section(
        g.title,
        '<div class="guide-grid appendix-grid">' +
          cards.map(guideTile).join("") +
          "</div>",
      );
    })
    .join("");
  return (
    back("#highlights", "Atlas highlights") +
    headings(
      "The illustrated paper",
      "Follow one reference photograph into two recordings, then explore the paper’s figures and the data behind them.",
    ) +
    '<section class="cover-intro">' +
    coverFrame() +
    "<div>" +
    tag("Figure 1") +
    "<h2>TALI contains Tali.</h2><p>A Mass Effect retrospective and a Minecraft meetup share the same WIT photograph of Legion at PAX Prime. The two recording timelines show how.</p>" +
    button("#case/mass-effect", "Open the recordings →") +
    "</div></section>" +
    section(
      "The main figures",
      '<div class="guide-grid">' +
        entries.slice(0, 4).map(guideTile).join("") +
        "</div>",
    ) +
    '<section class="edition-callout">' +
    tag("Figure 6") +
    "<h2>" +
    link("#editions", "Topics across Wikipedia editions") +
    "</h2>" +
    "<p>43 release photographs illustrate eleven topic lists across four editions. Each cell counts distinct entries and recordings. Explore all 108 editions in the atlas.</p>" +
    link("#editions", "Open the contact sheet →") +
    "</section>" +
    '<div class="appendix-intro"><h2>The visual appendix</h2><p>Sixteen plates, each with its own observations and population.</p></div>' +
    groups
  );
}

function home() {
  const hero = vizHero();
  const selected = ["002", "080", "077", "original-03"];
  const top = atlas.highlights.slice(1).map(featureTile);
  const rail = atlas.pairs.find((p) =>
    p.title.toLowerCase().includes("sentosa"),
  );
  if (rail)
    top.push(
      tile(
        "#pairs/" + rail.wit,
        atlas.images[rail.wit]?.asset,
        "Sentosa monorail",
        "Rail simulation",
        "The sim-to-rail gap",
        "A station photograph, a real ride and a simulated one.",
      ),
    );
  return (
    hero + '<div data-dataset-guide-slot></div>' +
    (atlas.scale ? datasetScale() : '<p class="scale-basis">1,172,262 stored clips · 143,250 recordings · 105,544 WIT entries</p>') +
    '<nav class="paper-chapters" aria-label="Interactive paper chapters"><strong>Read the interactive paper</strong>' +
    link("#read/collection", "Collection") +
    link("#read/example", "One image, two recordings") +
    link("#read/editions", "Topics by edition") +
    link("#paper", "Figures and appendix") + "</nav>" +
    datasetCollection() +
    datasetExample() +
    datasetEditions() +
    section(
      "Figures from the illustrated paper",
      '<p class="guide-intro">Across the release, 37,706 reference entries lead to two recordings. For 14,674 entries, both recordings contribute ten stored clips. Open a figure to see its population, examine examples and download the measurements.</p>' +
        '<div class="guide-grid compact">' +
        selectedItems().slice(0, 4).map(guideTile).join("") +
        "</div>",
      link("#paper", "All paper figures →"),
    ) +
    section("More unexpected pairs", grid(top)) +
    section(
      "Look inside the dataset",
      grid(selected.map((k) => plateTile(atlas.plates[k]))),
      link("#plates", "All 110 plates →"),
    ) +
    section(
      "Explore by question",
      minis([
        mini(
          "#pairs",
          "One photograph, two accounts",
          "30 reviewed WIT entries, each with two distinct source recordings.",
        ),
        mini(
          "#editions",
          "Topics across Wikipedia editions",
          "Compare counts of entries and recordings and open the examples behind the cells.",
        ),
        mini(
          "#tours",
          "Five reading paths",
          "Each path starts with four plates, followed by sixteen more.",
        ),
        mini(
          "#matches",
          "Which terms actually occur?",
          "Distinct recording counts across the full 1,172,262-row release.",
        ),
      ]),
    )
  );
}
function matches() {
  return (
    back("#highlights", "Highlights") +
    headings(
      "Which terms actually occur?",
      "A literal search across 143,250 unique recording IDs in the 1,172,262-row release. A recording can match through a Wikipedia field even when the term never appears in its own title.",
    ) +
    '<div class="table-wrap"><table><thead><tr><th>Topic</th><th>Recording title</th><th>Title, Wikipedia page title or reference caption</th></tr></thead><tbody>' +
    atlas.highlights
      .map(
        (h) =>
          "<tr><th>" +
          link("#case/" + h.slug, h.name) +
          "</th><td>" +
          h.counts[0] +
          "</td><td>" +
          h.counts[1] +
          "</td></tr>",
      )
      .join("") +
    "</tbody></table></div>"
  );
}
function feature(h) {
  const r = atlas.rows[h.rid];
  const companion = h.slug === "mass-effect";
  let related = atlas.related.filter((o) =>
    o[2].some((pair) => String(pair[0]) === h.rid),
  );
  return (
    back("#highlights", "Highlights") +
    tag(h.name) +
    headings(h.title, h.blurb) +
    '<div class="case-detail">' +
    (companion
      ? '<figure class="linked-inset"><div>' +
        pic(r.wit, "Detail of the linked Legion helmet at PAX Prime 2013") +
        "</div><figcaption>Linked WIT photograph · helmet detail.</figcaption>" +
        credit(r.wit) +
        "</figure>"
      : photo(r.wit, h.reference)) +
    "<div>" +
    recordBox(
      h.rid,
      companion ? "Mass Effect retrospective" : h.name,
      h.frame,
      companion ? 570 : null,
    ) +
    (companion
      ? recordBox("504001609", "Minecraft meetup at PAX Prime", 1, 570)
      : "") +
    "</div></div>" +
    (related.length && !companion
      ? section(
          "Follow the other links",
          minis(
            related.flatMap((a) =>
              a[2]
                .filter((x) => String(x[0]) !== h.rid)
                .map((x) =>
                  mini(
                    "#record/" + x[0],
                    x[1],
                    "Open the retained window and source recording.",
                  ),
                ),
            ),
          ),
        )
      : "") +
    section(
      "Find this term across TALI",
      "<p>" +
        h.counts[0] +
        " distinct recordings match in their title. The count is " +
        h.counts[1] +
        " when stored Wikipedia page titles and reference captions are included. " +
        link("#matches", "Compare all six searches") +
        "</p>",
    )
  );
}
function pair(p) {
  const end = Math.max(...p.rows.flatMap((id) => atlas.rows[id].starts));
  return (
    back("#pairs", "All two-recording pairs") +
    tag("WIT " + p.wit) +
    headings(p.title, p.reference + ".") +
    '<div class="case-detail">' +
    photo(p.wit, p.reference) +
    "<div>" +
    p.rows
      .map((id, i) => recordBox(id, p.labels[i], p.frames[i], end))
      .join("") +
    "</div></div>"
  );
}
function pairs() {
  return (
    back("#highlights", "Highlights") +
    headings(
      "One photograph, two accounts.",
      "Thirty examples selected from all 37,706 WIT entries linked to two distinct recordings. Each pair uses the same stored reference image and a verified ten-second window from each recording.",
    ) +
    section("The thirty pairs", grid(atlas.pairs.map(pairTile)))
  );
}
function plate(p) {
  const pick = selectedItems().find((item) => item.key === p.key);
  return (
    back("#plates", "All 110 plates") +
    tag(p.chapter + " · " + p.key) +
    headings(p.title, p.caption) +
    (pick
      ? '<p class="paper-back">' +
        link("#paper", pick.number + " · illustrated paper") +
        "</p>"
      : "") +
    (p.records.length &&
    p.records.every(({ id }) => atlas.rows[id]?.paperPlate === p.key)
      ? recordPhotos(p)
      : "") +
    '<figure><a href="' +
    esc(p.image) +
    '" aria-label="Open full-size figure"><img class="plate-large" src="' +
    esc(p.image) +
    '" alt="' +
    esc(p.title) +
    '"></a></figure>' +
    '<div class="meta">' +
    (p.scope ? "<div><b>Population</b><p>" + esc(p.scope) + "</p></div>" : "") +
    (p.method
      ? "<div><b>How to read it</b><p>" + esc(p.method) + "</p></div>"
      : "") +
    '</div><div class="links">' +
    (p.data ? link(p.data, "Plotted data (JSON)") : "") +
    link(p.image, "Full-size figure") +
    "</div>" +
    (p.records.length
      ? section(
          "Linked records",
          minis(
            p.records.map((r) =>
              mini(
                "#record/" + r.id,
                r.label === "Open record" ? "View the source window" : r.label,
                "WIT " +
                  atlas.rows[r.id].wit +
                  " · recording at " +
                  clock(atlas.rows[r.id].start),
              ),
            ),
          ),
        )
      : "")
  );
}
let filter = "",
  chapter = "",
  page = 0;
const PAGE_SIZE = 18;
function plates() {
  const chapters = [
    ...new Set(Object.values(atlas.plates).map((p) => p.chapter)),
  ].sort();
  return (
    back("#highlights", "Highlights") +
    headings(
      "The visual plates.",
      "100 numbered plates and ten original figures. Each plate identifies the data behind the picture.",
    ) +
    '<div class="toolbar"><label>Search plates<input id="filter" type="search" maxlength="150" value="' +
    esc(filter) +
    '" placeholder="Try subtitles, sound, colour…"></label>' +
    '<label>Chapter<select id="chapter"><option value="">All chapters</option>' +
    chapters
      .map(
        (c) =>
          "<option " +
          (c === chapter ? "selected" : "") +
          ">" +
          esc(c) +
          "</option>",
      )
      .join("") +
    '</select></label><output id="count" aria-live="polite"></output></div><div id="results"></div><div id="pager" class="gallery-nav"></div>'
  );
}
function drawResults() {
  const list = Object.values(atlas.plates)
    .sort((a, b) => a.key.localeCompare(b.key))
    .filter(
      (p) =>
        (!chapter || chapter === p.chapter) &&
        filter
          .toLowerCase()
          .trim()
          .split(/\s+/)
          .every((s) =>
            [p.key, p.title, p.chapter, p.caption, p.scope]
              .join(" ")
              .toLowerCase()
              .includes(s),
          ),
    );
  const pages = Math.ceil(list.length / PAGE_SIZE);
  page = Math.max(0, Math.min(page, pages - 1));
  const start = page * PAGE_SIZE;
  document.querySelector("#count").textContent = list.length
    ? "Showing " +
      (1 + start) +
      "–" +
      Math.min(start + PAGE_SIZE, list.length) +
      " of " +
      list.length +
      " plates"
    : "0 plates";
  document.querySelector("#results").innerHTML = list.length
    ? grid(list.slice(start, start + PAGE_SIZE).map(plateTile))
    : '<p class="empty">No plates match. <button type="button" id="clear">Clear filters</button></p>';
  const pager = document.querySelector("#pager");
  pager.innerHTML =
    pages > 1
      ? '<button class="btn light" id="prev" ' +
        (page === 0 ? "disabled" : "") +
        ">← Previous</button><span>Page " +
        (page + 1) +
        " of " +
        pages +
        '</span><button id="next" class="btn light" ' +
        (page === pages - 1 ? "disabled" : "") +
        ">Next →</button>"
      : "";
  for (const [sel, delta] of [
    ["#prev", -1],
    ["#next", 1],
  ]) {
    const b = document.querySelector(sel);
    if (b)
      b.onclick = () => {
        page += delta;
        drawResults();
        document.querySelector(".toolbar").scrollIntoView();
      };
  }
  const clear = document.querySelector("#clear");
  if (clear)
    clear.onclick = () => {
      filter = "";
      chapter = "";
      page = 0;
      render(false);
    };
}
function tours(t) {
  if (!t)
    return (
      back("#highlights", "Highlights") +
      headings(
        "Five reading paths.",
        "Four opening plates and sixteen more for each question. Follow a path in order or jump straight to the figure that catches your eye.",
      ) +
      section(
        "Choose a question",
        minis(
          atlas.tours.map((x) =>
            mini("#tours/" + x.key, x.title, x.description),
          ),
        ),
      )
    );
  return (
    back("#tours", "Five reading paths") +
    headings(t.title, t.description) +
    section(
      "Start with these four",
      grid(t.main.map((k) => plateTile(atlas.plates[k]))),
    ) +
    section(
      "Sixteen more",
      grid(t.appendix.map((k) => plateTile(atlas.plates[k]))),
    )
  );
}
function editions() {
  const s = atlas.sheet;
  const choices = Object.keys(s.counts).sort();
  return (
    back("#highlights", "Highlights") +
    headings(
      "Topics across Wikipedia editions.",
      "A fixed title-word search matches 13,171 WIT entries linked to 17,689 distinct recordings. A photograph illustrates one entry in its cell. A single entry can contribute to several cells.",
    ) +
    '<div class="toolbar"><label>Wikipedia edition<select id="edition"><option value="">English, Spanish, Japanese and Swahili</option>' +
    choices
      .map((x) => '<option value="' + esc(x) + '">' + esc(x) + "</option>")
      .join("") +
    "</select></label>" +
    link("topic-editions.csv", "All 1,188 cells (CSV)") +
    '</div><div class="table-wrap" id="matrix"></div><p class="fine">Counts use the Wikipedia edition of the stored article. A recording can contain a different spoken language.</p>'
  );
}
function matrix(code) {
  const s = atlas.sheet;
  const names = { en: "English", es: "Spanish", ja: "Japanese", sw: "Swahili" };
  const cols = code ? [code] : s.highlighted;
  const edits =
    "<thead><tr><th>Topic</th>" +
    cols
      .map((c) => '<th scope="col">' + esc(names[c] || c) + "</th>")
      .join("") +
    "</tr></thead>";
  const lines = Object.keys(s.topics)
    .map(
      (t) =>
        '<tr><th scope="row">' +
        esc(t) +
        "</th>" +
        cols
          .map((c) => {
            const [nw, nv] = s.counts[c][t];
            const ex = s.illustrated.find(
              (x) => x.topic === t && x.edition === c && x.record,
            );
            const ph = ex ? link("#record/" + ex.record, ex.example_title) : "";
            return (
              "<td>" +
              (ex && atlas.images[ex.wit]
                ? '<a href="#record/' +
                  ex.record +
                  '">' +
                  pic(ex.wit, ex.example_title, "cellpic") +
                  "</a>"
                : "") +
              '<span class="entrycounts">' +
              iso(nw) +
              " / " +
              iso(nv) +
              "</span><small>entries / recordings</small><small>" +
              ph +
              "</small></td>"
            );
          })
          .join("") +
        "</tr>",
    )
    .join("");
  document.querySelector("#matrix").innerHTML =
    "<table>" + edits + "<tbody>" + lines + "</tbody></table>";
}
function record(id) {
  const r = atlas.rows[id];
  const p = atlas.pairs.find((x) => x.rows.includes(id));
  const h = atlas.highlights.find((x) => x.rid === id);
  const c = atlas.sheet.illustrated.find((x) => String(x.record) === id);
  const rel = atlas.related
    .flatMap((x) => x[2])
    .find((x) => String(x[0]) === id);
  const pl = Object.values(atlas.plates).find((x) =>
    x.records.some((y) => String(y.id) === id),
  );
  const title =
    h?.name ||
    p?.title ||
    c?.example_title ||
    rel?.[1] ||
    pl?.title ||
    "Retained recording window";
  return (
    back("#highlights", "Atlas highlights") +
    tag("Release record " + id) +
    headings(
      title,
      "WIT " +
        r.wit +
        " · retained source window beginning at " +
        clock(r.start) +
        ".",
    ) +
    '<div class="case-detail">' +
    (atlas.images[r.wit]
      ? photo(
          r.wit,
          h?.reference || p?.reference || "Linked Wikipedia reference",
        )
      : "") +
    "<div>" +
    recordBox(id, "Listen and watch", null, null, true) +
    '<p class="fine top-space">' +
    external(
      "https://huggingface.co/datasets/Antreas/TALI/viewer/default/" +
        r.split +
        "?row=" +
        r.viewerRow,
      "Open the released row",
    ) +
    " · " +
    external(
      "https://huggingface.co/datasets/Antreas/TALI/blob/" +
        atlas.revision +
        "/" +
        r.shard,
      "Pinned source shard",
    ) +
    " · zero-based shard row " +
    r.row +
    ".</p></div></div>" +
    '<div class="links">' +
    (h ? link("#case/" + h.slug, "Read the featured example") : "") +
    (p ? link("#pairs/" + p.wit, "Compare both recordings") : "") +
    (pl ? link("#atlas/" + pl.key, "Open the linked plate") : "") +
    "</div>"
  );
}
function credits() {
  const list = Object.entries(atlas.images).sort(
    (a, b) => Number(a[0]) - Number(b[0]),
  );
  return (
    back("#highlights", "Highlights") +
    headings(
      "Image credits.",
      "The reference pictures are resized copies of the images stored in TALI. The original file page records the creator, attribution and licence for each image.",
    ) +
    '<div class="table-wrap"><table><thead><tr><th>WIT entry</th><th>Original file and attribution</th><th>Licence</th></tr></thead><tbody>' +
    list
      .map(
        ([wid, x]) =>
          "<tr><th>" +
          esc(wid) +
          "</th><td>" +
          external(
            x.file,
            decodeURIComponent(x.file.split("File:").at(-1)).replaceAll(
              "_",
              " ",
            ),
          ) +
          "</td><td>" +
          external(x.terms, x.license) +
          "</td></tr>",
      )
      .join("") +
    "</tbody></table></div>"
  );
}
async function verifiedClipURL(row, controller, onProgress = () => {}) {
  const doc = [row.video, row.wit, row.split, [[row.viewerRow, row.start]]];
  const data = await vizProviderRow(
    doc,
    0,
    ["youtube_video_content"],
    controller.signal,
    (received) => onProgress(received, Math.max(received, row.clipBytes)),
  );
  const media = vizAsBytes(data.youtube_video_content);
  onProgress(media.length, row.clipBytes, true);
  if (media.length !== row.clipBytes) throw Error("Clip length changed");
  if (crypto.subtle) {
    const digest = Array.from(
      new Uint8Array(await crypto.subtle.digest("SHA-256", media)),
      (b) => b.toString(16).padStart(2, "0"),
    ).join("");
    if (digest !== row.clipHash) throw Error("Clip checksum changed");
  } else {
    // The private mini serves plain HTTP. Fetch integrity still checks the pinned bytes.
    const pin = btoa(
      String.fromCharCode(
        ...row.clipHash.match(/../g).map((h) => parseInt(h, 16)),
      ),
    );
    const testURL = URL.createObjectURL(new Blob([media]));
    try {
      await (
        await fetch(testURL, {
          integrity: "sha256-" + pin,
          signal: controller.signal,
        })
      ).arrayBuffer();
    } finally {
      URL.revokeObjectURL(testURL);
    }
  }
  controller.signal.throwIfAborted();
  return URL.createObjectURL(new Blob([media], { type: "video/mp4" }));
}

async function loadClip(button) {
  const row = atlas.rows[button.dataset.id];
  const offset = Number(button.dataset.offset);
  const container = button.closest("article");
  container.querySelector(".clip-status")?.remove();
  const status = document.createElement("div");
  status.className = "clip-status";
  const progress = document.createElement("progress"),
    label = document.createElement("span");
  label.setAttribute("role", "status");
  label.textContent = "Waiting for the public dataset…";
  progress.setAttribute("aria-label", "Release clip download");
  status.append(progress, label);
  container.append(status);
  button.disabled = true;
  const controller = new AbortController();
  mediaLoads.add(controller);
  try {
    const url = await verifiedClipURL(
      row,
      controller,
      (bytes, expected, checking) => {
        progress.max = 1;
        progress.value = Math.min(0.98, bytes / expected);
        label.textContent = checking
          ? "Checking the source and clip checksum…"
          : "Receiving clip · " + (bytes / 1e6).toFixed(1) + " MB received";
      },
    );
    mediaUrls.add(url);
    const video = document.createElement("video");
    video.controls = true;
    video.playsInline = true;
    video.preload = "auto";
    video.className = "release-video";
    video.setAttribute(
      "aria-label",
      "Verified TALI recording at " + clock(row.start + offset),
    );
    video.addEventListener(
      "loadedmetadata",
      () => {
        video.currentTime = offset;
      },
      { once: true },
    );
    video.src = url;
    status.replaceChildren(video, label);
    label.textContent =
      "Release clip verified · source window begins at " +
      clock(row.start) +
      ".";
    button.textContent = "Release clip loaded";
  } catch (e) {
    if (controller.signal.aborted) return;
    progress.remove();
    label.replaceChildren("The release clip could not be verified here. ");
    const a = document.createElement("a");
    a.href =
      "https://huggingface.co/datasets/Antreas/TALI/viewer/default/" +
      row.split +
      "?row=" +
      row.viewerRow;
    a.textContent = "Open the source row";
    label.append(a);
    button.disabled = false;
    button.textContent = "Retry release clip";
  } finally {
    mediaLoads.delete(controller);
  }
}
function render(focus = false) {
  vizClean();
  for (const load of mediaLoads) load.abort();
  mediaLoads.clear();
  for (const url of mediaUrls) URL.revokeObjectURL(url);
  mediaUrls.clear();
  const [sectionName = "highlights", key = ""] = location.hash
    .slice(1)
    .split("?")[0]
    .split("/");
  let content,
    active = sectionName || "highlights";
  const storyRoute = sectionName === "read" && (["collection", "example", "editions"].includes(key) || (key === "scale" && atlas.scale));
  const guideRoute = sectionName === "datasets" && ["", "clip", "vectors", "retrieval"].includes(key);
  if (!sectionName || storyRoute || guideRoute || ["highlights", "main", "explore"].includes(sectionName)) {
    content = home();
    active = storyRoute ? "read/" + key : "";
  } else if (
    sectionName === "case" &&
    atlas.highlights.some((x) => x.slug === key)
  ) {
    content = feature(atlas.highlights.find((x) => x.slug === key));
    active = "highlights";
  } else if (sectionName === "visualizer") {
    const params = new URLSearchParams(location.hash.split("?")[1] || "");
    content = key === "item" ? vizItemPage() : vizSearchPage(params);
    active = "visualizer";
  } else if (sectionName === "paper" && !key) {
    content = paperGuide();
    active = "paper";
  } else if (sectionName === "matches") {
    content = matches();
    active = "highlights";
  } else if (sectionName === "credits") {
    content = credits();
    active = "";
  } else if (
    sectionName === "pairs" &&
    (!key || atlas.pairs.some((x) => String(x.wit) === key))
  )
    content = key
      ? pair(atlas.pairs.find((x) => String(x.wit) === key))
      : pairs();
  else if (
    (sectionName === "plates" || sectionName === "atlas") &&
    (!key || key === "contents")
  ) {
    content = plates();
    active = "plates";
  } else if (sectionName === "atlas" && Object.hasOwn(atlas.plates, key)) {
    content = plate(atlas.plates[key]);
    active = "plates";
  } else if (
    sectionName === "editions" ||
    (sectionName === "atlas" && key === "topic-editions")
  ) {
    content = editions();
    active = "editions";
  } else if (
    sectionName === "tours" &&
    (!key || atlas.tours.some((x) => x.key === key))
  )
    content = tours(atlas.tours.find((x) => x.key === key));
  else if (sectionName === "record" && Object.hasOwn(atlas.rows, key))
    content = record(key);
  else
    content =
      headings("Page not found.", "This item is outside the atlas catalogue.") +
      button("#highlights", "Atlas highlights");
  main.innerHTML = content;
  main.querySelector("[data-dataset-guide-slot]")?.replaceWith(datasetGuide);
  if (guideRoute) selectDatasetExample(key || "clip");
  bindDatasetStory();
  activateVisualizer(sectionName, key);
  const stage = main.querySelector("[data-cover-frame]");
  if (stage) showCoverFrame(stage);
  document.title =
    (guideRoute ? "Use TALI in Python" : main.querySelector("h1").textContent) + " · TALI visual atlas";
  document.querySelectorAll(".mast nav a").forEach((a) => {
    if (a.hash === "#" + active) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  if (document.querySelector("#filter")) {
    const f = document.querySelector("#filter"),
      c = document.querySelector("#chapter");
    f.oninput = () => {
      filter = f.value;
      page = 0;
      drawResults();
    };
    c.onchange = () => {
      chapter = c.value;
      page = 0;
      drawResults();
    };
    drawResults();
  }
  if (document.querySelector("#edition")) {
    const select = document.querySelector("#edition");
    select.onchange = () => matrix(select.value);
    matrix("");
  }
  main.querySelectorAll("button.load-frames").forEach((b) => {
    b.onclick = () => loadPaperFrames(b);
  });
  main.querySelectorAll("button.load-clip").forEach((b) => {
    b.onclick = () => loadClip(b);
  });
  if (location.hash === "#case/mass-effect/clip")
    main.querySelector("button.load-clip")?.click();
  main.querySelectorAll("button.play").forEach((b) => {
    b.onclick = () => {
      const player = document.createElement("iframe");
      player.className = "player";
      player.title = "Source recording at " + clock(Number(b.dataset.time));
      player.allow =
        "autoplay; encrypted-media; fullscreen; picture-in-picture";
      player.allowFullscreen = true;
      player.referrerPolicy = "strict-origin-when-cross-origin";
      player.src =
        "https://www.youtube-nocookie.com/embed/" +
        encodeURIComponent(b.dataset.video) +
        "?start=" +
        Number(b.dataset.time) +
        "&autoplay=1";
      b.closest("article").append(player);
      b.disabled = true;
      b.textContent = "Player opened";
    };
  });
  if (guideRoute) {
    const target = key ? document.getElementById("tab-" + key) : document.getElementById("datasets-title");
    target.focus({ preventScroll: true });
    (key ? target : datasetGuide).scrollIntoView({ block: "start", behavior: "instant" });
  } else if (storyRoute) {
    const chapter = document.getElementById("story-" + key);
    chapter.querySelector("h2").focus({ preventScroll: true });
    chapter.scrollIntoView({ block: "start", behavior: "instant" });
  } else if (focus) {
    main.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" });
  }
}
const catalogueVersion = document.documentElement.dataset.catalogue;
fetch(catalogueVersion ? "atlas.json?v=" + catalogueVersion : "atlas.json")
  .then((r) => {
    if (!r.ok) throw Error("Atlas unavailable");
    return r.json();
  })
  .then((data) => {
    atlas = data;
    render();
    window.addEventListener("hashchange", () => render(true));
  })
  .catch(() => {
    main.innerHTML =
      '<h1>The atlas could not load.</h1><p class="sub">Reload to request the catalogue again.</p><button class="btn top-space" id="retry">Reload atlas</button>';
    main.append(datasetGuide);
    document.querySelector("#retry").onclick = () => location.reload();
  });

/*! Third-party licenses
Copyright (c) 2014-2025 Chen, Yi-Cyuan

MIT License

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
(The MIT License)

Copyright (C) 2011-2015 by Vitaly Puzrin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
