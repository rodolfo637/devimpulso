// Devimpulso Hub — Service Worker v3
const CACHE = 'hub-v3';
const OFFLINE_URL = './';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.add(OFFLINE_URL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Solo cachear GET del mismo origen
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  // No interceptar Firebase/Firestore (necesita red siempre)
  if (url.hostname.includes('googleapis.com') ||
      url.hostname.includes('gstatic.com') ||
      url.hostname.includes('firebaseapp.com') ||
      url.hostname.includes('firebase.google.com')) return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => caches.match(OFFLINE_URL));
    })
  );
});

self.addEventListener('push', e => {
  const data = e.data?.json() || {};
  e.waitUntil(
    self.registration.showNotification(data.title || 'Devimpulso Hub', {
      body: data.body || '',
      icon: data.icon || './favicon.ico',
      badge: './favicon.ico',
      data: data
    })
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow('./'));
});
