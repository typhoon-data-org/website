"use strict";var precacheConfig=[["/website/404.html","1fb68e201f19547fe5096a85baa99d8b"],["/website/about/index.html","1b61f3d7f7f2e183825afbffd029e621"],["/website/apple-touch-icon.png","5d189b047161fee5f4c8c9f9cbf5b829"],["/website/assets/img/lambda_small.png","f061616a08e2979202d5874c67367eea"],["/website/assets/svg/amsf.svg","f377674da2d68bfd2eca84c215a0cd6d"],["/website/assets/svg/typhoon_logo.svg","0b37b7d8458acc80a20fe9dbd14d6d84"],["/website/configuration.html","0b5ad9fa31e7aead2ed63e0ff23953fd"],["/website/creating-themes.html","f95bfc9785c4c68cff99527474ab3b17"],["/website/custom-color-scheme.html","ee7d59bfc2c00e7d7df40ae4ed0ee5b1"],["/website/custom-css.html","043a16df77934cd2a5f041b13ca6b8a5"],["/website/custom-heading-background.html","78c6be22e4bd41045c21b5e52241c12f"],["/website/custom-heading-image.html","456cf16ac15da02ce1cffa47a3063158"],["/website/custom-html-markups.html","2fffd6ab9194a9c3b006809c6636f55e"],["/website/customizing-styles.html","0a3eb081669ab9fe78ea0f1b516e18fa"],["/website/deployment-methods.html","156cf313a04f31eb0b985a6b3247c92c"],["/website/external-link-post.html","3b28ad22fe5631cbc44ac6a86bd07156"],["/website/favicon.png","3d05f8132d73390b349cae0ce8c016d2"],["/website/favicon.svg","821d4c60e5ae39e9042c879d5980640f"],["/website/getting-started.html","b37dfd1039da1b156c15f921f22cbac4"],["/website/github-pages-setup.html","705967959f91520b63c1c24d484f264c"],["/website/index.html","ed50d38e68bc8c8169871fbdca866b37"],["/website/jekyll-theme-compatibility.html","882cf81761b87c122b38252a83d97522"],["/website/logo.png","ecc1a06c8bb990573ad1d8d245bffe74"],["/website/markdown-features-test.html","88ad405235eb11e6548ede284abedd6a"],["/website/markup-example.html","a4e847e02af7ed3430abd412413f9c63"],["/website/mask-icon.svg","07b803e22eb033cb270633273e0bf528"],["/website/multiple-themes-support.html","db99ee01bab917a7b13f1920e9e7a69f"],["/website/news/index.html","3c34afa178e674d6fd0c342657b940c6"],["/website/open-graph.html","801ab91ec88f4012330d305bac8fd769"],["/website/svg-post-title.html","a6cb99c020b26768fb363b17ad441d43"],["/website/syntax-highlighting.html","ed353910e462ab78f3a9ed6739c7b9da"],["/website/theme-curtana.html","a9757cbfddb8039967fa6f962f0509cc"],["/website/themes.html","3bb26b2dd8e445579f1a6e48b2fcec07"],["/website/upgrading-from-v1-to-v2.html","347fe5d2858ec3bbba6f8c32b6f9809f"],["/website/upgrading-guide-v1.1.0.html","0f56979f9af22b46c3707b1682619be1"],["/website/welcome.html","1441f5ea805dc603a7ac5c2ad4716a77"]],cacheName="sw-precache-v3-almace-scaffolding-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then((function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})})):Promise.resolve(e)},createCacheKey=function(e,t,a,n){var c=new URL(e);return n&&c.pathname.match(n)||(c.search+=(c.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),c.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some((function(e){return a.match(e)}))},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map((function(e){return e.split("=")})).filter((function(e){return t.every((function(t){return!t.test(e[0])}))})).map((function(e){return e.join("=")})).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map((function(e){var t=e[0],a=e[1],n=new URL(t,self.location),c=createCacheKey(n,hashParamName,a,!1);return[n.toString(),c]})));function setOfCachedUrls(e){return e.keys().then((function(e){return e.map((function(e){return e.url}))})).then((function(e){return new Set(e)}))}self.addEventListener("install",(function(e){e.waitUntil(caches.open(cacheName).then((function(e){return setOfCachedUrls(e).then((function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map((function(a){if(!t.has(a)){var n=new Request(a,{credentials:"same-origin"});return fetch(n).then((function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then((function(t){return e.put(a,t)}))}))}})))}))})).then((function(){return self.skipWaiting()})))})),self.addEventListener("activate",(function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then((function(e){return e.keys().then((function(a){return Promise.all(a.map((function(a){if(!t.has(a.url))return e.delete(a)})))}))})).then((function(){return self.clients.claim()})))})),self.addEventListener("fetch",(function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching),n="index.html";(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,n),t=urlsToCacheKeys.has(a));0,t&&e.respondWith(caches.open(cacheName).then((function(e){return e.match(urlsToCacheKeys.get(a)).then((function(e){if(e)return e;throw Error("The cached response that was expected is missing.")}))})).catch((function(t){return fetch(e.request)})))}}));