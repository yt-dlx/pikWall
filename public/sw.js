if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,i)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const r=e=>a(e,t),o={module:{uri:t},exports:c,require:r};s[t]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(i(...e),c)))}}define(["./workbox-f1770938"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/Bqxk3kkgUf_QdEuAhO7BI/_buildManifest.js",revision:"57d82270819fcb94d110a9b20c9bf160"},{url:"/_next/static/Bqxk3kkgUf_QdEuAhO7BI/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/113-50bc689aa61f3c60.js",revision:"Bqxk3kkgUf_QdEuAhO7BI"},{url:"/_next/static/chunks/203.2b4c1ee4fbe3a7cf.js",revision:"2b4c1ee4fbe3a7cf"},{url:"/_next/static/chunks/218.57a830a2c55ba802.js",revision:"57a830a2c55ba802"},{url:"/_next/static/chunks/455-1b7a863d3ba5656a.js",revision:"Bqxk3kkgUf_QdEuAhO7BI"},{url:"/_next/static/chunks/4bd1b696-8e373aae75bf8c35.js",revision:"Bqxk3kkgUf_QdEuAhO7BI"},{url:"/_next/static/chunks/822-f543050921d41ccb.js",revision:"Bqxk3kkgUf_QdEuAhO7BI"},{url:"/_next/static/chunks/8e1d74a4-94835eec570da097.js",revision:"Bqxk3kkgUf_QdEuAhO7BI"},{url:"/_next/static/chunks/app/_not-found/page-ea0ad847430817c7.js",revision:"Bqxk3kkgUf_QdEuAhO7BI"},{url:"/_next/static/chunks/app/api/images/route-5a67c57ac54432ea.js",revision:"Bqxk3kkgUf_QdEuAhO7BI"},{url:"/_next/static/chunks/app/layout-a53581e159b4d041.js",revision:"Bqxk3kkgUf_QdEuAhO7BI"},{url:"/_next/static/chunks/app/page-a96c53bcfbd27500.js",revision:"Bqxk3kkgUf_QdEuAhO7BI"},{url:"/_next/static/chunks/b536a0f1-092d4caecb7c4273.js",revision:"Bqxk3kkgUf_QdEuAhO7BI"},{url:"/_next/static/chunks/bd904a5c-64f57a35efe49cc8.js",revision:"Bqxk3kkgUf_QdEuAhO7BI"},{url:"/_next/static/chunks/ee560e2c-5a8faba3f0267ac0.js",revision:"Bqxk3kkgUf_QdEuAhO7BI"},{url:"/_next/static/chunks/framework-6b27c2b7aa38af2d.js",revision:"Bqxk3kkgUf_QdEuAhO7BI"},{url:"/_next/static/chunks/main-app-e748695992a2f715.js",revision:"Bqxk3kkgUf_QdEuAhO7BI"},{url:"/_next/static/chunks/main-b189bccb833025d1.js",revision:"Bqxk3kkgUf_QdEuAhO7BI"},{url:"/_next/static/chunks/pages/_app-430fec730128923e.js",revision:"Bqxk3kkgUf_QdEuAhO7BI"},{url:"/_next/static/chunks/pages/_error-2d7241423c4a35ba.js",revision:"Bqxk3kkgUf_QdEuAhO7BI"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-f7d1652f3f3166d2.js",revision:"Bqxk3kkgUf_QdEuAhO7BI"},{url:"/_next/static/css/37df1fc82594a1e8.css",revision:"37df1fc82594a1e8"},{url:"/_next/static/css/5a56e3c1761e58ad.css",revision:"5a56e3c1761e58ad"},{url:"/_next/static/media/3012df4d6cbe8d83-s.p.ttf",revision:"4f23ac955b9253ae1566faecb3d9d99b"},{url:"/_next/static/media/87eb93ef18013225-s.p.otf",revision:"076fc7a6d731bd506f0b1e088bb6349b"},{url:"/file.svg",revision:"d09f95206c3fa0bb9bd9fefabfd0ea71"},{url:"/globe.svg",revision:"2aaafa6a49b6563925fe440891e32717"},{url:"/icon512_maskable.png",revision:"1cb38254f81f964fe4a918262b6dda44"},{url:"/icon512_rounded.png",revision:"05075611490799feb75a0089c9e22775"},{url:"/logo.png",revision:"de951ffeb119810630909a5f1fd8682d"},{url:"/manifest.json",revision:"932a24fd0a3e874f2bc7dcd48d00798a"},{url:"/models/license.txt",revision:"b3b1d5ab0a60bbd4d9682b4d2da03544"},{url:"/models/scene.bin",revision:"2f93bd19f18ab63b44cc2064616958a2"},{url:"/models/scene.gltf",revision:"cb61675c5f1de6b7b2ba385c33efaf26"},{url:"/models/textures/NAV_PANEL_baseColor.jpeg",revision:"04fd1b099aeec178f87c51767ad2066f"},{url:"/models/textures/VENT_baseColor.jpeg",revision:"1744913e9ea1d114bc9a43cac4fd7d70"},{url:"/models/textures/engine_baseColor.jpeg",revision:"f03576e311b0d3226fb4d8bfea10d4c8"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"c0af2f507b369b085b35ef4bbe3bcf1e"},{url:"/window.svg",revision:"a2760511c65806022ad20adf74370ff3"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:function(e){return _ref.apply(this,arguments)}}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){var s=e.sameOrigin,a=e.url.pathname;return!(!s||a.startsWith("/api/auth/callback")||!a.startsWith("/api/"))}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){var s=e.request,a=e.url.pathname,n=e.sameOrigin;return"1"===s.headers.get("RSC")&&"1"===s.headers.get("Next-Router-Prefetch")&&n&&!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){var s=e.request,a=e.url.pathname,n=e.sameOrigin;return"1"===s.headers.get("RSC")&&n&&!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){var s=e.url.pathname;return e.sameOrigin&&!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){return!e.sameOrigin}),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
