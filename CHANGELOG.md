# Histórico de cambios
---
Todos los cambios notables de este proyecto se documentarán en este archivo.

* ## [Sin versión]

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