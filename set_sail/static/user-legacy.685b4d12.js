System.register(["./_axios@0.21.4@axios-legacy.da0cd436.js","./index-legacy.b6813113.js","./_vue-router@4.1.3@vue-router-legacy.8b834dd7.js"],(function(e){"use strict";var t,r,o;return{setters:[function(e){t=e._},function(e){r=e.b},function(e){o=e.b}],execute:function(){o();var s=t.create({baseURL:r,timeout:1e5,headers:{"X-Custom-Header":"foobar"}});t.defaults.timeout=1e4,t.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded;charset=UTF-8",s.interceptors.request.use((function(e){return console.log(e,"config"),e})),s.interceptors.response.use((function(e){return 200===e.status&&200!==e.data.code&&function(e){var t=e.code,r=e.message,o=void 0===r?"请求错误，请联系管理员":r;if(t&&o)switch(t){case 401:console.log("没有登录");break;case 403:console.log(o)}}(e.data||{}),e.data}));var n=function(e){var t=e.data,r=e.methods||"post",o=e.url||"";return"post"===r?s[r](o,t):s[r](o,{params:t})},a="/user/getUserList",u="/user/login";e("g",(function(){return n({url:a})})),e("l",(function(e){return n({url:u,data:e})}))}}}));
