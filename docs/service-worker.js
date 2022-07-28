"use strict";var precacheConfig=[["/404.html","04fadd1543fbe0f9207af4a1a0b53c51"],["/Airflow.html","0024a33589d905f0b99e84ce13686075"],["/Modern-stack.html","b395be45092c90cadb76895621936f77"],["/apple-touch-icon.png","5d189b047161fee5f4c8c9f9cbf5b829"],["/assets/img/airflow_icon.png","1188779f7fbda3e6f8f92027ce6aed2b"],["/assets/img/component.jpg","f8ee65d6efd2d253edd496b515f07d2e"],["/assets/img/extend.jpg","d2446635bc6a5265bf8c6e3d21a34011"],["/assets/img/lambda_small.png","f061616a08e2979202d5874c67367eea"],["/assets/img/lego.png","7e6c0791c1441c9276ec9f90ca556d5c"],["/assets/img/logos/BigQuery.jpg","f549d8eefc7b2e0f2b2ee8978afaf51a"],["/assets/img/logos/DynamoDBicon-08.png","9588a2349bf82c108b75daf65b46a01c"],["/assets/img/logos/MySQL-Logo.png","754e01e49836a295574661a188161775"],["/assets/img/logos/Postgresql_elephant.svg.png","cb8612b24825ecab4dd04864a8b60baa"],["/assets/img/logos/aws_session.png","f631e2bfc80282bd084ffad88625ee19"],["/assets/img/logos/download.png","1c2d2cd93f7dd69284f188cac4e2e041"],["/assets/img/logos/duckdub.jpg","7717c55252dd8eee1ee65008ccb6d03d"],["/assets/img/logos/elastic.png","787b20bbb3def2ccf3e608695f5d96e3"],["/assets/img/logos/filestorage.png","0e33b0949730a9474f2b4fae6b9d3869"],["/assets/img/logos/ftp.jpg","b9ab515f4aab2f9bc6eed7d06d2c14a8"],["/assets/img/logos/gcs.jpg","cec2aad84df3958bafe8e7aa37a1d788"],["/assets/img/logos/https.png","45f18e24b2d6aee12c0a38e03316722d"],["/assets/img/logos/kafka.png","9c02aff45c0201a737f4feae8afbed78"],["/assets/img/logos/postgresql.png","cdb461c7c087c71b732a5f431d343203"],["/assets/img/logos/python_logo.jpg","f42ce88bf2feed6bf6dedc7e44d772c3"],["/assets/img/logos/qgbqYYuV_400x400.jpg","7717c55252dd8eee1ee65008ccb6d03d"],["/assets/img/logos/s3.png","ed538140714f2841883ba02814f1580e"],["/assets/img/logos/session-manager.jpg","aaf4ab12f8c45b3128515555fd236276"],["/assets/img/logos/singers.png","4132a298542d44c2780e87c489870ab3"],["/assets/img/logos/snowflake_logo.png","fb11e2b8a1910e3530d50c3fa211abc9"],["/assets/img/logos/sqlalchemy.jpg","48e5207d491766a516bbfe252668b962"],["/assets/img/logos/sqlite.png","77b7aa2c7da2062b12eb5c00ff58b659"],["/assets/img/team.png","0c41c555c37f90cef63227d9e8812bab"],["/assets/img/telegram_botfather.png","82a3184419afa062f061d14dd7eb860f"],["/assets/img/yml.png","af6bd9265e1449d439866cc4ddcb927f"],["/assets/svg/amsf.svg","f377674da2d68bfd2eca84c215a0cd6d"],["/assets/svg/heading-image-example.svg","97f9ed1a1221d5353362b35a991414f3"],["/assets/svg/typhoon_logo.svg","0b37b7d8458acc80a20fe9dbd14d6d84"],["/favicon.png","3d05f8132d73390b349cae0ce8c016d2"],["/favicon.svg","821d4c60e5ae39e9042c879d5980640f"],["/hello-world.html","76be7542683d2dc1a70b3d7e614e241b"],["/installation.html","a055f6e95a2917879fb076bafead77fc"],["/logo.png","042602bd0602c49b95a30128d71b9255"],["/mask-icon.svg","07b803e22eb033cb270633273e0bf528"],["/news/index.html","a0b56e133207d9152b4d1f47e8002c40"],["/serverless-telegram-bot-jokes.html","f77b34d8843d3d556f572657ddbc70f6"],["/twittercard.png","93eae0382f7f090ed6a40f4ecf557f4f"],["/typhoon-beta-release.html","3d41e68fae87432dc1172c74bdeea8cc"],["/typhoon-orchestrator-vision.html","9dd322689c2cca98a0b2cae295774670"]],cacheName="sw-precache-v3-almace-scaffolding-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var s=new URL(e);return"/"===s.pathname.slice(-1)&&(s.pathname+=a),s.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then((function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})})):Promise.resolve(e)},createCacheKey=function(e,a,s,t){var n=new URL(e);return t&&n.pathname.match(t)||(n.search+=(n.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(s)),n.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var s=new URL(a).pathname;return e.some((function(e){return s.match(e)}))},stripIgnoredUrlParameters=function(e,a){var s=new URL(e);return s.hash="",s.search=s.search.slice(1).split("&").map((function(e){return e.split("=")})).filter((function(e){return a.every((function(a){return!a.test(e[0])}))})).map((function(e){return e.join("=")})).join("&"),s.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map((function(e){var a=e[0],s=e[1],t=new URL(a,self.location),n=createCacheKey(t,hashParamName,s,!1);return[t.toString(),n]})));function setOfCachedUrls(e){return e.keys().then((function(e){return e.map((function(e){return e.url}))})).then((function(e){return new Set(e)}))}self.addEventListener("install",(function(e){e.waitUntil(caches.open(cacheName).then((function(e){return setOfCachedUrls(e).then((function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map((function(s){if(!a.has(s)){var t=new Request(s,{credentials:"same-origin"});return fetch(t).then((function(a){if(!a.ok)throw new Error("Request for "+s+" returned a response with status "+a.status);return cleanResponse(a).then((function(a){return e.put(s,a)}))}))}})))}))})).then((function(){return self.skipWaiting()})))})),self.addEventListener("activate",(function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then((function(e){return e.keys().then((function(s){return Promise.all(s.map((function(s){if(!a.has(s.url))return e.delete(s)})))}))})).then((function(){return self.clients.claim()})))})),self.addEventListener("fetch",(function(e){if("GET"===e.request.method){var a,s=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching),t="index.html";(a=urlsToCacheKeys.has(s))||(s=addDirectoryIndex(s,t),a=urlsToCacheKeys.has(s));0,a&&e.respondWith(caches.open(cacheName).then((function(e){return e.match(urlsToCacheKeys.get(s)).then((function(e){if(e)return e;throw Error("The cached response that was expected is missing.")}))})).catch((function(a){return fetch(e.request)})))}}));