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
├── css/styles.css  ← Estilos compartidos (colores y tipografías arriba de todo, en :root)
├── js/main.js      ← Menú, animaciones, pestañas, carrusel de opiniones y WhatsApp
└── img/            ← Logo gris, logo blanco (footer) e isotipo
```

`index.html` tiene que quedar en la **raíz** del repositorio: es el archivo que GitHub Pages abre al entrar al sitio.
`index-es.html` y `home.html` conservan los nombres de la web anterior para que los links viejos sigan funcionando.

## Diseño

- Tipografías: **Fraunces** (títulos) y **Manrope** (texto), las mismas de Estudio POI. Detalles en **IBM Plex Mono**.
- Paleta en grises: fondo `#D8D8D5`, secciones alternadas `#CACAC6`, bloques oscuros `#3A3A3A`. Se cambian en `css/styles.css` → `:root`.
- Animaciones: sello giratorio con el isotipo en el hero, cinta de servicios en movimiento, aparición de secciones al bajar, línea de "Cómo trabajamos" que se completa paso a paso y carrusel de opiniones con avance automático. Si el visitante tiene activado "reducir movimiento" en su dispositivo, se desactivan.

## Publicar en GitHub Pages

1. Crear un repositorio nuevo (por ejemplo `fidiax-web`).
2. Subir **el contenido** de esta carpeta a la raíz del repo (no la carpeta en sí).
3. En el repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)` → Save**.
4. En uno o dos minutos el sitio queda en `https://USUARIO.github.io/fidiax-web/`.

## Conectar el dominio fidiax.com (cuando esté aprobado)

1. En **Settings → Pages → Custom domain** escribir `fidiax.com` y guardar (GitHub crea solo el archivo `CNAME`).
2. En el DNS del dominio (GoDaddy o Cloudflare):
   - 4 registros **A** para `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - 1 registro **CNAME** para `www` apuntando a `USUARIO.github.io`
   - En Cloudflare, dejar esos registros en "DNS only" (nube gris) hasta que GitHub emita el certificado.
3. Con el certificado listo, tildar **Enforce HTTPS**.

No agregar el dominio en GitHub antes de cambiar el DNS: la versión de prueba en github.io empezaría a redirigir a fidiax.com, que todavía muestra la web vieja.

## Datos que se editan seguido

| Qué | Dónde |
|---|---|
| WhatsApp España | `index-es.html` → atributo `data-wa` del `<body>` y la lista de contacto |
| WhatsApp Argentina | `home.html` → atributo `data-wa` del `<body>` y la lista de contacto |
| Precios de los kits | `home.html` → buscar `kit__precio` |
| Opiniones | buscar `class="opinion"`: copiar un bloque `<figure>` completo para sumar otra |
