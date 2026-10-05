# Sitio web FIDIAX

Sitio estático (HTML + CSS + JS, sin dependencias) listo para GitHub Pages.

## Estructura

```
/
├── index.html      ← PÁGINA PRINCIPAL: selector de región (España / Argentina)
├── index-es.html   ← FIDIAX España
├── home.html       ← FIDIAX Argentina
├── 404.html        ← Error: redirige al inicio
├── .nojekyll       ← Le indica a GitHub Pages que publique los archivos tal cual
├── css/styles.css  ← Estilos compartidos por todas las páginas
├── js/main.js      ← Menú móvil + formulario que abre WhatsApp
└── img/            ← Logo gris, logo blanco (footer) e isotipo
```

`index.html` tiene que quedar en la **raíz** del repositorio: es el archivo que GitHub Pages abre al entrar al sitio.
`index-es.html` y `home.html` conservan los nombres de la web anterior para que los links viejos sigan funcionando.

## Publicar en GitHub Pages

1. Crear un repositorio nuevo (por ejemplo `fidiax-web`).
2. Subir **el contenido** de esta carpeta a la raíz del repo (no la carpeta en sí).
   Si se sube desde la web de GitHub, el archivo `.nojekyll` puede quedar oculto en tu explorador: no pasa nada si falta.
3. En el repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)` → Save**.
4. En uno o dos minutos el sitio queda en `https://USUARIO.github.io/fidiax-web/`.

## Conectar el dominio fidiax.com (cuando esté listo)

1. En **Settings → Pages → Custom domain** escribir `fidiax.com` y guardar (GitHub crea solo el archivo `CNAME`).
2. En el DNS del dominio (GoDaddy o Cloudflare):
   - 4 registros **A** para `@` apuntando a `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - 1 registro **CNAME** para `www` apuntando a `USUARIO.github.io`
   - Si se usa Cloudflare, dejar esos registros en "DNS only" (nube gris) hasta que GitHub emita el certificado.
3. Cuando el certificado esté listo, tildar **Enforce HTTPS**.

No conviene agregar el dominio en GitHub antes de cambiar el DNS: el sitio de prueba en github.io empezaría a redirigir a fidiax.com, que todavía apunta a la web vieja.

## Datos que se editan seguido

| Qué | Dónde |
|---|---|
| WhatsApp España | `index-es.html` → atributo `data-wa` del `<body>` y la lista de contacto |
| WhatsApp Argentina | `home.html` → atributo `data-wa` del `<body>` y la lista de contacto |
| Precios de los kits | `home.html` → buscar `kit__precio` |
| Reseñas | buscar `class="resena"` en cada página |
