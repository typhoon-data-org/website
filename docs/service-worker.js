"use strict";var precacheConfig=[["/website/404.html","1b18f7dbd244d41b0c10d0fe022c3343"],["/website/Airflow.html","ee280e40acb062f4a142e28bf5280e4d"],["/website/Modern-stack.html","eb27e2de4aa931bec6f3308670490c1a"],["/website/_pages/home.html","d41d8cd98f00b204e9800998ecf8427e"],["/website/about/index.html","70af0b981e2a6f568c72c349d0a2b5ed"],["/website/apple-touch-icon.png","5d189b047161fee5f4c8c9f9cbf5b829"],["/website/assets/img/airflow_icon.png","1188779f7fbda3e6f8f92027ce6aed2b"],["/website/assets/img/component.jpg","f8ee65d6efd2d253edd496b515f07d2e"],["/website/assets/img/extend.jpg","d2446635bc6a5265bf8c6e3d21a34011"],["/website/assets/img/lambda_small.png","f061616a08e2979202d5874c67367eea"],["/website/assets/img/lego.png","7e6c0791c1441c9276ec9f90ca556d5c"],["/website/assets/img/logos/BigQuery.jpg","f549d8eefc7b2e0f2b2ee8978afaf51a"],["/website/assets/img/logos/DynamoDBicon-08.png","9588a2349bf82c108b75daf65b46a01c"],["/website/assets/img/logos/MySQL-Logo.png","754e01e49836a295574661a188161775"],["/website/assets/img/logos/Postgresql_elephant.svg.png","cb8612b24825ecab4dd04864a8b60baa"],["/website/assets/img/logos/aws_session.png","f631e2bfc80282bd084ffad88625ee19"],["/website/assets/img/logos/download.png","1c2d2cd93f7dd69284f188cac4e2e041"],["/website/assets/img/logos/duckdub.jpg","7717c55252dd8eee1ee65008ccb6d03d"],["/website/assets/img/logos/elastic.png","787b20bbb3def2ccf3e608695f5d96e3"],["/website/assets/img/logos/filestorage.png","0e33b0949730a9474f2b4fae6b9d3869"],["/website/assets/img/logos/ftp.jpg","b9ab515f4aab2f9bc6eed7d06d2c14a8"],["/website/assets/img/logos/gcs.jpg","cec2aad84df3958bafe8e7aa37a1d788"],["/website/assets/img/logos/https.png","45f18e24b2d6aee12c0a38e03316722d"],["/website/assets/img/logos/kafka.png","9c02aff45c0201a737f4feae8afbed78"],["/website/assets/img/logos/postgresql.png","cdb461c7c087c71b732a5f431d343203"],["/website/assets/img/logos/python_logo.jpg","f42ce88bf2feed6bf6dedc7e44d772c3"],["/website/assets/img/logos/qgbqYYuV_400x400.jpg","7717c55252dd8eee1ee65008ccb6d03d"],["/website/assets/img/logos/s3.png","ed538140714f2841883ba02814f1580e"],["/website/assets/img/logos/session-manager.jpg","aaf4ab12f8c45b3128515555fd236276"],["/website/assets/img/logos/singers.png","4132a298542d44c2780e87c489870ab3"],["/website/assets/img/logos/snowflake_logo.png","fb11e2b8a1910e3530d50c3fa211abc9"],["/website/assets/img/logos/sqlalchemy.jpg","48e5207d491766a516bbfe252668b962"],["/website/assets/img/logos/sqlite.png","77b7aa2c7da2062b12eb5c00ff58b659"],["/website/assets/img/team.png","0c41c555c37f90cef63227d9e8812bab"],["/website/assets/img/telegram_botfather.png","82a3184419afa062f061d14dd7eb860f"],["/website/assets/img/yml.png","af6bd9265e1449d439866cc4ddcb927f"],["/website/assets/svg/amsf.svg","f377674da2d68bfd2eca84c215a0cd6d"],["/website/assets/svg/heading-image-example.svg","97f9ed1a1221d5353362b35a991414f3"],["/website/assets/svg/typhoon_logo.svg","0b37b7d8458acc80a20fe9dbd14d6d84"],["/website/favicon.png","3d05f8132d73390b349cae0ce8c016d2"],["/website/favicon.svg","821d4c60e5ae39e9042c879d5980640f"],["/website/hello-world.html","037297c765958de47cac728865457fec"],["/website/installation.html","ef2c226ec370af077e82763be41d2c64"],["/website/logo.png","ecc1a06c8bb990573ad1d8d245bffe74"],["/website/mask-icon.svg","07b803e22eb033cb270633273e0bf528"],["/website/news/index.html","3ea79c97c86827fe299d1110548dea44"],["/website/serverless-telegram-bot-jokes.html","dfbda3ff4ab87a82971c72b4eafab27f"],["/website/typhoon-orchestrator-vision.html","baf7166d91000370eda5c71d3e5e21f5"]],cacheName="sw-precache-v3-almace-scaffolding-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,s){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=s),t.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then((function(s){return new Response(s,{headers:e.headers,status:e.status,statusText:e.statusText})})):Promise.resolve(e)},createCacheKey=function(e,s,t,a){var n=new URL(e);return a&&n.pathname.match(a)||(n.search+=(n.search?"&":"")+encodeURIComponent(s)+"="+encodeURIComponent(t)),n.toString()},isPathWhitelisted=function(e,s){if(0===e.length)return!0;var t=new URL(s).pathname;return e.some((function(e){return t.match(e)}))},stripIgnoredUrlParameters=function(e,s){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map((function(e){return e.split("=")})).filter((function(e){return s.every((function(s){return!s.test(e[0])}))})).map((function(e){return e.join("=")})).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map((function(e){var s=e[0],t=e[1],a=new URL(s,self.location),n=createCacheKey(a,hashParamName,t,!1);return[a.toString(),n]})));function setOfCachedUrls(e){return e.keys().then((function(e){return e.map((function(e){return e.url}))})).then((function(e){return new Set(e)}))}self.addEventListener("install",(function(e){e.waitUntil(caches.open(cacheName).then((function(e){return setOfCachedUrls(e).then((function(s){return Promise.all(Array.from(urlsToCacheKeys.values()).map((function(t){if(!s.has(t)){var a=new Request(t,{credentials:"same-origin"});return fetch(a).then((function(s){if(!s.ok)throw new Error("Request for "+t+" returned a response with status "+s.status);return cleanResponse(s).then((function(s){return e.put(t,s)}))}))}})))}))})).then((function(){return self.skipWaiting()})))})),self.addEventListener("activate",(function(e){var s=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then((function(e){return e.keys().then((function(t){return Promise.all(t.map((function(t){if(!s.has(t.url))return e.delete(t)})))}))})).then((function(){return self.clients.claim()})))})),self.addEventListener("fetch",(function(e){if("GET"===e.request.method){var s,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching),a="index.html";(s=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,a),s=urlsToCacheKeys.has(t));0,s&&e.respondWith(caches.open(cacheName).then((function(e){return e.match(urlsToCacheKeys.get(t)).then((function(e){if(e)return e;throw Error("The cached response that was expected is missing.")}))})).catch((function(s){return fetch(e.request)})))}}));