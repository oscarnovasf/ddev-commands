# Histórico de cambios
---
Todos los cambios notables de este proyecto se documentarán en este archivo.

* ## [v1.3.5] - 2026-05-01
  > Mejora en las instrucciones de la skill playwright-creator.

  * #### Cambios:
    - Actualizada la documentación de la skill `playwright-creator` para indicar que el reemplazo de placeholders debe realizarse de forma global en todos los archivos de recursos.

---
* ## [v1.3.4] - 2026-05-01
  > Corrección de rutas en la instalación.

  * #### Correcciones:
    - Ajustadas las rutas en `post_install_actions` para detectar correctamente si el script se ejecuta desde la raíz del proyecto o desde la carpeta `.ddev`.
    - Mejora en la robustez de la sincronización de la carpeta `.agents/`.

---
* ## [v1.3.3] - 2026-05-01
  > Firma de archivos y compatibilidad con actualizaciones.

  * #### Correcciones:
    - Añadida la firma `#ddev-generated` a todos los archivos de los agentes para permitir que DDEV los sobrescriba y gestione correctamente durante las actualizaciones.
    - Mejora en la estabilidad del instalador al manejar archivos preexistentes.

---
* ## [v1.3.2] - 2026-05-01
  > Fix definitivo para la sincronización de agentes.

  * #### Correcciones:
    - Renombrada carpeta `.agents/` a `agents/` en el repositorio para evitar que sea ignorada por el instalador de DDEV.
    - Actualizados los scripts de post-instalación para manejar el nuevo nombre de la carpeta origen.

---
* ## [v1.3.1] - 2026-05-01
  > Corrección en el instalador y documentación.

  * #### Correcciones:
    - Corregido error de sintaxis en `install.yaml` que impedía la instalación del addon.
    - Corregidas las rutas de sincronización de la carpeta `.agents/`.

  * #### Añadido:
    - Documentación de la sección de "Skills para IAs" en el README.

---
* ## [v1.3.0] - 2026-05-01
  > Sistema de agentes/skills y mejoras en la instalación.

  * #### Añadido:
    - Sincronización automática de la carpeta `.agents/` durante la instalación.
    - Integración de `rsync` en `post_install_actions` para actualizar skills sin sobrescribir configuraciones locales del usuario.
    - Nueva skill de Playwright para automatización de tests E2E.

  * #### Cambios:
    - Limpieza de `.gitignore` (eliminada excepción de `.vscode/tasks.json`).

---
* ## [v1.2.0] - 2026-04-22
  > Nuevo comando backup de base de datos.

  * #### Añadido:
    - Comando `ddev backup`: crea un backup de la base de datos en la carpeta
      `_backups/` del proyecto, ejecutando previamente `drush cr` para volcar
      la caché.

  + ### Eliminado:
    - Carpeta `tests/testdata/` eliminada al no ser necesaria para los tests.

---
* ## [v1.1.2] - 2026-03-16
  > Soporte cloudflared y mejoras internas.

  * #### Añadido:
    - Soporte para compartir el sitio mediante `cloudflared` como proveedor
      por defecto (`share_default_provider: cloudflared`).
    - Hook `pre-share` que muestra la URL generada al ejecutar `ddev share`.
    - Comando de host `run` para abrir el proyecto en el explorador de archivos.

  * #### Cambios:
    - Limpieza interna: eliminada la variable `GREEN` no utilizada en varios
      scripts.

---
* ## [v1.1.1] - 2026-02-07
  > Corrección de ruta en el hook post-start.

  * #### Correcciones:
    - Corregida la ruta del comando `cowsay` en el hook post-start
      (`/usr/games/cowsay`).

---
* ## [v1.1.0] - 2026-02-07
  > Nuevo comando sass, mejoras en el Dockerfile y correcciones.

  * #### Añadido:
    - Comando `ddev sass`: compilación de SCSS a CSS comprimido con selector
      interactivo de theme y modo (compilar/watch) mediante gum.
    - Instalación de [gum](https://github.com/charmbracelet/gum) en el
      Dockerfile para menús interactivos en los comandos.
    - Documentación completa del proyecto en README.md.

  * #### Cambios:
    - Comando `ddev linkchecker`: el informe ahora se genera en la raíz del
      proyecto (`reporte-<sitio>.html`) en lugar de en la subcarpeta `html/`.

---
* ## [v1.0.0] - 2026-02-06
  > Primera versión del addon con comandos personalizados para Drupal en DDEV.

  * #### Añadido:
    - Comando `ddev cr`: limpieza de caché con `drush cr` y vaciado automático
      de Redis si está disponible.
    - Comando `ddev behat`: ejecución de pruebas funcionales con Behat.
    - Comando `ddev phpunit`: ejecución de tests unitarios con soporte Xdebug.
    - Comando `ddev phpstan`: análisis estático de código con PHPStan.
    - Comando `ddev rector`: refactorización automática con Drupal Rector.
    - Comando `ddev grumphp`: análisis de calidad de código con GrumPHP.
    - Comando `ddev linkchecker`: comprobación de enlaces rotos con generación
      de informe HTML.
    - Comando `ddev lineas`: métricas de código (líneas) de módulos y temas
      custom con cloc.
    - Dockerfile personalizado con las dependencias necesarias (cloc,
      linkchecker, cowsay, fortune, etc.).
    - Configuración de hooks post-start con mensaje de bienvenida.