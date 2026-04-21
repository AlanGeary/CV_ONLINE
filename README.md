# CV Online

CV online construido con React + Vite, con una sección de chat preparada para responder sobre el perfil profesional usando Cloudflare Workers AI.

## Desarrollo local

Instala dependencias:

```powershell
npm.cmd install
```

Levanta el Worker del chat:

```powershell
npm.cmd run cf:dev
```

En otra terminal, levanta el frontend:

```powershell
npm.cmd run dev
```

## Build del frontend

```powershell
npm.cmd run build
```

## Worker de Cloudflare

Desplegar el Worker:

```powershell
npm.cmd run cf:deploy
```

Worker actual:

```txt
https://cv-online-chat.alan-geary.workers.dev
```

## Variable de entorno del frontend

El chat usa `VITE_CHAT_API_URL` para decidir a qué endpoint llamar en producción.

Ejemplo:

```txt
VITE_CHAT_API_URL=https://cv-online-chat.alan-geary.workers.dev
```

Puedes copiar `.env.example` a `.env.local` para pruebas locales de producción si lo necesitas.

## Deploy recomendado

La opción más simple para este proyecto es:

- Frontend en Cloudflare Pages
- Chat en Cloudflare Workers AI

En Cloudflare Pages configura:

- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `VITE_CHAT_API_URL=https://cv-online-chat.alan-geary.workers.dev`
