!function(){function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},n(t)}function t(n,t,r){return t in n?Object.defineProperty(n,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):n[t]=r,n}function r(n,t){return function(n){if(Array.isArray(n))return n}(n)||function(n,t){var r=null==n?null:"undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null==r)return;var e,o,u=[],i=!0,f=!1;try{for(r=r.call(n);!(i=(e=r.next()).done)&&(u.push(e.value),!t||u.length!==t);i=!0);}catch(c){f=!0,o=c}finally{try{i||null==r.return||r.return()}finally{if(f)throw o}}return u}(n,t)||o(n,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function e(n){return function(n){if(Array.isArray(n))return u(n)}(n)||function(n){if("undefined"!=typeof Symbol&&null!=n[Symbol.iterator]||null!=n["@@iterator"])return Array.from(n)}(n)||o(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(n,t){if(n){if("string"==typeof n)return u(n,t);var r=Object.prototype.toString.call(n).slice(8,-1);return"Object"===r&&n.constructor&&(r=n.constructor.name),"Map"===r||"Set"===r?Array.from(n):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?u(n,t):void 0}}function u(n,t){(null==t||t>n.length)&&(t=n.length);for(var r=0,e=new Array(t);r<t;r++)e[r]=n[r];return e}System.register([],(function(o){"use strict";return{execute:function(){function u(n,t){for(var r=Object.create(null),e=n.split(","),o=0;o<e.length;o++)r[e[o]]=!0;return t?function(n){return!!r[n.toLowerCase()]}:function(n){return!!r[n]}}o({H:function(n){return!!n||""===n},m:u,p:function n(t){var r="";if(v(t))r=t;else if(p(t))for(var e=0;e<t.length;e++){var o=n(t[e]);o&&(r+=o+" ")}else if(g(t))for(var u in t)t[u]&&(r+=u+" ");return r.trim()},q:function n(t){if(p(t)){for(var r={},e=0;e<t.length;e++){var o=t[e],u=v(o)?c(o):n(o);if(u)for(var i in u)r[i]=u[i]}return r}if(v(t))return t;if(g(t))return t}});o("G",u("itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly"));var i=/;(?![^(]*\))/g,f=/:(.+)/;function c(n){var t={};return n.split(i).forEach((function(n){if(n){var r=n.split(f);r.length>1&&(t[r[0].trim()]=r[1].trim())}})),t}o("I",(function(n){return v(n)?n:null==n?"":p(n)||g(n)&&(n.toString===h||!m(n.toString))?JSON.stringify(n,l,2):String(n)}));var a,l=function n(o,u){return u&&u.__v_isRef?n(o,u.value):b(u)?t({},"Map(".concat(u.size,")"),e(u.entries()).reduce((function(n,t){var e=r(t,2),o=e[0],u=e[1];return n["".concat(o," =>")]=u,n}),{})):d(u)?t({},"Set(".concat(u.size,")"),e(u.values())):!g(u)||p(u)||j(u)?u:String(u)},s=(o("E",{}),o("o",[]),o("N",(function(){})),o("D",(function(){return!1})),/^on[^a-z]/),y=(o("s",(function(n){return s.test(n)})),o("F",(function(n){return n.startsWith("onUpdate:")})),o("j",Object.assign),o("r",(function(n,t){var r=n.indexOf(t);r>-1&&n.splice(r,1)})),Object.prototype.hasOwnProperty),p=(o("c",(function(n,t){return y.call(n,t)})),o("a",Array.isArray)),b=o("g",(function(n){return"[object Map]"===S(n)})),d=o("l",(function(n){return"[object Set]"===S(n)})),m=o("b",(function(n){return"function"==typeof n})),v=o("k",(function(n){return"string"==typeof n})),g=(o("e",(function(t){return"symbol"===n(t)})),o("i",(function(t){return null!==t&&"object"===n(t)}))),h=(o("u",(function(n){return g(n)&&m(n.then)&&m(n.catch)})),Object.prototype.toString),S=function(n){return h.call(n)},j=(o("t",(function(n){return S(n).slice(8,-1)})),o("n",(function(n){return"[object Object]"===S(n)}))),w=(o("f",(function(n){return v(n)&&"NaN"!==n&&"-"!==n[0]&&""+parseInt(n,10)===n})),o("y",u(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted")),function(n){var t=Object.create(null);return function(r){return t[r]||(t[r]=n(r))}}),A=/-(\w)/g,O=(o("v",w((function(n){return n.replace(A,(function(n,t){return t?t.toUpperCase():""}))}))),/\B([A-Z])/g),U=(o("C",w((function(n){return n.replace(O,"-$1").toLowerCase()}))),o("w",w((function(n){return n.charAt(0).toUpperCase()+n.slice(1)}))));o("B",w((function(n){return n?"on".concat(U(n)):""}))),o("h",(function(n,t){return!Object.is(n,t)})),o("z",(function(n,t){for(var r=0;r<n.length;r++)n[r](t)})),o("d",(function(n,t,r){Object.defineProperty(n,t,{configurable:!0,enumerable:!1,value:r})})),o("A",(function(n){var t=parseFloat(n);return isNaN(t)?n:t})),o("x",(function(){return a||(a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{})}))}}}))}();
