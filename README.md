# Devimpulso Hub v3

Centro de Operaciones personal — gestión académica y de proyectos.

## Stack
- Vanilla JS + HTML/CSS (single-file app)
- Firebase Auth + Firestore (backend)
- PWA con Service Worker (offline + notificaciones)

## Deploy

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase deploy --only hosting
```

### GitHub Pages
1. Subir todos los archivos al repositorio
2. Settings → Pages → Source: `main / root`

## Estructura
```
index.html      # App completa
sw.js           # Service Worker (PWA + offline)
manifest.json   # Web App Manifest (instalar como app)
firebase.json   # Config Firebase Hosting
.firebaserc     # Proyecto Firebase
.nojekyll       # Evita que GitHub Pages use Jekyll
```
