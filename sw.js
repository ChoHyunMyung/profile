// 한 번 열면 인터넷 없이도 열리게 저장해 둔다. 인터넷이 되면 새 판을 먼저 받는다.
const C='pp-app-v14', SHELL=['./','index.html','manifest.webmanifest','icon-180.png','icon-512.png','i-D.png','i-DI.png','i-DA.png','i-A.png','i-AI.png','i-I.png','i-C.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp)).catch(()=>{});return r})
    .catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('index.html'))));
});
