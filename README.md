# 🚀 Devimpulso Hub — Centro de Operaciones

Sistema de gestión de proyectos, tareas, lecturas y materias para **Devimpulso**.  
Desarrollado con Firebase Auth + Firestore. Deployable en GitHub Pages o Firebase Hosting.

---

## 📋 Características

- **🔐 Autenticación** — Login con Email/Password y Google. Cada usuario tiene datos aislados.
- **✅ Tareas** — CRUD completo con Kanban (4 columnas), vista tabla, filtros por frente/prioridad.
- **📁 Proyectos** — Seguimiento con estado, cliente, monto, repo GitHub, stack técnico.
- **🧑 Clientes** — Base de datos de clientes con tipo, contacto, estado.
- **📚 Materias** — Seguimiento académico con notas parciales y promedio automático.
- **📝 Entregas** — TPs, parciales, finales con deadline, grupo y calificación.
- **📖 Lecturas** — Tracker con cálculo automático de páginas/día según deadline.
- **📊 Dashboard** — Vista general con regla 1-3-5, progreso diario, lecturas activas.
- **📋 Mi Día** — Vista enfocada en tareas del día actual.
- **🔄 Sync en tiempo real** — Los datos se sincronizan instantáneamente con Firestore.
- **📱 Responsive** — Funciona en desktop, tablet y celular.
- **💾 Offline** — Persistencia offline habilitada con Firestore.

---

## 🏗️ Arquitectura

```
Devimpulso Hub
├── index.html          ← App completa (HTML + CSS + JS)
├── 404.html            ← Redirect SPA para GitHub Pages
├── firebase.json       ← Config de Firebase Hosting
├── firestore.rules     ← Reglas de seguridad de Firestore
└── README.md           ← Este archivo
```

### Estructura de Firestore

```
users/
  {userId}/
    ├── name, email, createdAt     ← Perfil
    ├── tasks/{taskId}             ← Tareas
    ├── projects/{projectId}       ← Proyectos
    ├── clients/{clientId}         ← Clientes
    ├── subjects/{subjectId}       ← Materias
    ├── deliverables/{delId}       ← Entregas
    └── readings/{readingId}       ← Lecturas (con log[] embebido)
```

### Seguridad

- Cada usuario **solo puede leer/escribir sus propios datos** (`request.auth.uid == userId`).
- Validación de tipos y campos requeridos en las reglas.
- Los documentos de lectura validan que `currentPage <= totalPages`.
- Headers de seguridad configurados: `X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`.

---

## 🚀 Deploy en GitHub Pages

### Paso 1: Crear repo en GitHub

```bash
# Desde la carpeta del proyecto
git init
git add .
git commit -m "feat: Devimpulso Hub v2.0 con Firebase"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/devimpulso-hub.git
git push -u origin main
```

### Paso 2: Activar GitHub Pages

1. Ir a **Settings → Pages** en el repo
2. Source: **Deploy from a branch**
3. Branch: **main** / **/ (root)**
4. Guardar

### Paso 3: Configurar dominio autorizado en Firebase

1. Ir a [Firebase Console](https://console.firebase.google.com) → proyecto **sistema-1131**
2. **Authentication → Settings → Authorized domains**
3. Agregar: `TU_USUARIO.github.io`
4. (Si usás dominio custom, agregarlo también)

Tu app va a estar en: `https://TU_USUARIO.github.io/devimpulso-hub/`

---

## 🔥 Deploy en Firebase Hosting (alternativo)

```bash
# Instalar Firebase CLI (si no la tenés)
npm install -g firebase-tools

# Login
firebase login

# Inicializar (seleccionar proyecto sistema-1131)
firebase init hosting

# Deploy
firebase deploy --only hosting

# Deploy de reglas de Firestore
firebase deploy --only firestore:rules
```

---

## ⚙️ Configuración de Firebase Console

### 1. Habilitar Authentication

En Firebase Console → **Authentication → Sign-in method**:

- ✅ **Email/Password** → Habilitar
- ✅ **Google** → Habilitar (configurar email de soporte)

### 2. Crear base de datos Firestore

En Firebase Console → **Firestore Database**:

1. **Create database**
2. Ubicación: `southamerica-east1` (São Paulo, más cercano a Argentina)
3. Iniciar en **Production mode**
4. Ir a **Rules** y pegar el contenido de `firestore.rules`
5. Publicar

### 3. Dominios autorizados

En **Authentication → Settings → Authorized domains**, asegurarse de tener:

- `localhost` (para desarrollo)
- `sistema-1131.firebaseapp.com`
- `sistema-1131.web.app`
- `TU_USUARIO.github.io` (para GitHub Pages)

---

## 🧪 Testing Local

Simplemente abrí `index.html` en el navegador:

```bash
# Opción 1: Directo
open index.html

# Opción 2: Con servidor local (recomendado para evitar CORS)
npx serve .

# Opción 3: Con Python
python3 -m http.server 8080
```

Asegurate de tener `localhost` en los dominios autorizados de Firebase Auth.

---

## 📱 Funcionalidad de Lecturas

El tracker de lecturas incluye:

1. **Alta del libro**: Título, autor, total de páginas, página actual, fecha límite
2. **Cálculo automático**: `páginas restantes / días restantes = meta diaria`
3. **Registro de páginas**: Desde la tarjeta o el modal, ingresás cuántas leíste
4. **Recálculo en tiempo real**: Al registrar, se actualiza la meta diaria
5. **Indicadores de urgencia**: 🟢 en tiempo, 🟡 ajustado, 🔴 vencido
6. **Historial**: Log completo con fecha, páginas, rango (p.85 → p.120)
7. **Celebración**: Al terminar un libro aparece un toast de felicitación

---

## 🔒 Notas de Seguridad

- La **API Key de Firebase** es pública por diseño (Google lo documenta así).
  La seguridad real está en las **Firestore Rules** y la **autenticación**.
- Las reglas garantizan que **nadie puede leer datos de otro usuario**.
- Se validan los campos requeridos y tipos de datos en las reglas.
- Se recomienda habilitar **App Check** en producción para protección extra.

---

## 📦 Stack Técnico

| Componente | Tecnología |
|---|---|
| Frontend | HTML5 + CSS3 + JavaScript vanilla |
| Auth | Firebase Authentication (Email + Google) |
| Database | Cloud Firestore (real-time) |
| Hosting | GitHub Pages / Firebase Hosting |
| Fuentes | DM Sans + JetBrains Mono |
| Offline | Firestore Persistence |

---

## 🗺️ Roadmap

- [ ] Drag & drop en Kanban
- [ ] Notificaciones push para deadlines
- [ ] Export a PDF de reportes
- [ ] Integración con Claude API para análisis
- [ ] PWA con Service Worker
- [ ] Modo colaborativo (compartir proyectos)

---

**Desarrollado por Devimpulso** · 2026
