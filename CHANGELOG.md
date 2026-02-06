# Histórico de cambios
---
Todos los cambios notables de este proyecto se documentarán en este archivo.

* ## [Sin versión]

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