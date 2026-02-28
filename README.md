# OKR Generator

Aplicación Next.js para crear y previsualizar OKRs: objetivo, resultados clave (hasta 3), KPIs y razonamiento. Soporta múltiples pivotes (1 a 6) con pestañas y persistencia en sesión.

## Setup

Desde la carpeta `okr-app`:

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Rutas del dashboard

| Ruta | Descripción |
|------|-------------|
| `/` | **Inicio**: vista previa del panel. Carga los datos guardados en `sessionStorage` (si existen) y muestra el dashboard con pestañas si hay más de un pivote. |
| `/generador` | **Generador de OKR**: formulario completo para editar todos los pivotes. Incluye selector de número de pivotes (1–6), pestañas por pivote, vista previa embebida y botón para abrir la vista previa en página aparte. |
| `/preview` | **Vista previa en página**: misma vista que el home pero en ruta dedicada, con enlace «Ir al generador». Se usa cuando desde el generador se pulsa «Abrir vista previa en nueva página» (los datos se pasan vía `sessionStorage`). |

## Funcionalidades

- **Formulario por pivote**: para cada pivote se edita título de vista previa, objetivo, período, 3 resultados clave (descripción + Actual / Meta / Inicio), 3 KPIs (título, valor, tendencia) y un área de **Razonamiento** para la decisión del OKR.
- **Múltiples pivotes (1–6)**: selector de cantidad de pivotes y pestañas para cambiar entre ellos en el generador y en la vista previa.
- **Vista previa en vivo**: en `/generador` la vista previa se actualiza debajo del formulario; en `/` y `/preview` se muestra solo el dashboard (cards de objetivo, KRs con barras de progreso, KPIs y tarjeta de razonamiento).
- **Persistencia en sesión**: los datos se guardan en `sessionStorage` al ir a `/preview` desde el generador y se rehidratan al cargar `/`, `/preview` o al volver al generador.
- **Navegación**: desde `/preview` el enlace «Ir al generador» lleva a `/generador`; desde `/generador` el botón «Abrir vista previa en nueva página» guarda y navega a `/preview`.

Sin dependencias extra más allá del stack por defecto de Next.js.
