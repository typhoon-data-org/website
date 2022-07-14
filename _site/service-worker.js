"use strict";var precacheConfig=[["/website/404.html","5e5e9c7448cefcd217f082c4556453b9"],["/website/about/index.html","6146ce94e5a9bfe5e1efbceca7aa66db"],["/website/apple-touch-icon.png","5d189b047161fee5f4c8c9f9cbf5b829"],["/website/assets/svg/amsf.svg","f377674da2d68bfd2eca84c215a0cd6d"],["/website/assets/svg/typhoon_logo.svg","0b37b7d8458acc80a20fe9dbd14d6d84"],["/website/configuration.html","fd6ff83c17ed9050cee69d85d5cfb61e"],["/website/creating-themes.html","2d51257d11c94884ed19371c4e544656"],["/website/custom-color-scheme.html","fcd6716f0c92057345731b2e249b876b"],["/website/custom-css.html","99d39737d420432e145b2ae8445f1c8a"],["/website/custom-heading-background.html","d534f041016b7e3b511540c372979fff"],["/website/custom-heading-image.html","62de060d300227d2c40c9ca0ba3ad604"],["/website/custom-html-markups.html","2a295e2d3231e5e6e2e0fac4c02d313f"],["/website/customizing-styles.html","fbe6dce57c5dc0ae788b154cc28b3921"],["/website/deployment-methods.html","59ce2c319e7d2b6ce6b95a542193d6e5"],["/website/external-link-post.html","d0ee37ea0456b058d331d63288c14822"],["/website/favicon.png","3d05f8132d73390b349cae0ce8c016d2"],["/website/favicon.svg","821d4c60e5ae39e9042c879d5980640f"],["/website/getting-started.html","801ce96ba80743ca953cda9903138f1f"],["/website/github-pages-setup.html","0362bfc5c551b5a923ff6f8c0fb80536"],["/website/index.html","5107865b572ebbaaa534e24a3b1ce0e4"],["/website/jekyll-theme-compatibility.html","e4b0f3eb2b5d31acf593a370b5f0440f"],["/website/logo.png","ecc1a06c8bb990573ad1d8d245bffe74"],["/website/markdown-features-test.html","6fd6d20e12e15d50cb578a5dfb06e899"],["/website/markup-example.html","d0520fe8a2eb0d61736e0ac98b4d326f"],["/website/mask-icon.svg","07b803e22eb033cb270633273e0bf528"],["/website/multiple-themes-support.html","e080eb830e6cb9b42dfaae03a7049baa"],["/website/news/index.html","30a9360c22a418d8bd210999f06defed"],["/website/open-graph.html","8ba8d336c609ca57f01775e1481f0a78"],["/website/svg-post-title.html","a37cc2167abf1b17ad745728d0e2e5e3"],["/website/syntax-highlighting.html","98f07c7cfbd7886ea9278bae6b433a50"],["/website/theme-curtana.html","8800dfdd78963764dc435d9c7fc859ae"],["/website/themes.html","e366b4d9f1e5727acf88f6e111bd33e2"],["/website/upgrading-from-v1-to-v2.html","18c748ca5a5d266f507c3f070b66e24a"],["/website/upgrading-guide-v1.1.0.html","afb56cdd36bd1a4598a14b1467752630"],["/website/welcome.html","488e943b91f08ea1d2f9930af6bf68ba"]],cacheName="sw-precache-v3-almace-scaffolding-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then((function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})})):Promise.resolve(e)},createCacheKey=function(e,t,a,n){var c=new URL(e);return n&&c.pathname.match(n)||(c.search+=(c.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),c.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some((function(e){return a.match(e)}))},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map((function(e){return e.split("=")})).filter((function(e){return t.every((function(t){return!t.test(e[0])}))})).map((function(e){return e.join("=")})).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map((function(e){var t=e[0],a=e[1],n=new URL(t,self.location),c=createCacheKey(n,hashParamName,a,!1);return[n.toString(),c]})));function setOfCachedUrls(e){return e.keys().then((function(e){return e.map((function(e){return e.url}))})).then((function(e){return new Set(e)}))}self.addEventListener("install",(function(e){e.waitUntil(caches.open(cacheName).then((function(e){return setOfCachedUrls(e).then((function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map((function(a){if(!t.has(a)){var n=new Request(a,{credentials:"same-origin"});return fetch(n).then((function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then((function(t){return e.put(a,t)}))}))}})))}))})).then((function(){return self.skipWaiting()})))})),self.addEventListener("activate",(function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then((function(e){return e.keys().then((function(a){return Promise.all(a.map((function(a){if(!t.has(a.url))return e.delete(a)})))}))})).then((function(){return self.clients.claim()})))})),self.addEventListener("fetch",(function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching),n="index.html";(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,n),t=urlsToCacheKeys.has(a));0,t&&e.respondWith(caches.open(cacheName).then((function(e){return e.match(urlsToCacheKeys.get(a)).then((function(e){if(e)return e;throw Error("The cached response that was expected is missing.")}))})).catch((function(t){return fetch(e.request)})))}}));