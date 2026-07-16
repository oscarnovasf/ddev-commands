# Drupal Code Search Skill

Busca en el código de todos los módulos contribuidos de Drupal en [drupal.org](https://www.drupal.org) para encontrar
ejemplos de código reales usando la API de GitLab.

## Prerrequisitos

- La variable de entorno **DRUPALORG_GITLAB_TOKEN** debe estar configurada con un
  [token de acceso personal de GitLab](https://git.drupalcode.org/-/user_settings/personal_access_tokens) válido.
- El token debe tener al menos el alcance (scope) **`read_api`** (acceso de solo lectura a la API).
  Como los repositorios de módulos contribuidos de Drupal son públicos, no se necesitan permisos adicionales.

## Configuración de la variable de entorno

### macOS / Linux / WSL (Windows Subsystem for Linux)

Añade al final de `~/.zshrc`, `~/.bashrc` o `~/.bash_profile`:

```bash
export DRUPALORG_GITLAB_TOKEN="tu_token_aqui"
```

Recarga la configuración:

```bash
source ~/.zshrc
```

### Windows (PowerShell)

```powershell
$env:DRUPALORG_GITLAB_TOKEN = "tu_token_aqui"
```

Para que persista entre sesiones, añádelo al perfil de PowerShell:

```powershell
Add-Content $PROFILE "`n`$env:DRUPALORG_GITLAB_TOKEN = 'tu_token_aqui'"
```

O a través de la interfaz gráfica: Configuración del sistema > Variables de entorno > Agregar nueva variable de usuario.

> También puedes crear un archivo `.env` en la raíz del proyecto con `DRUPALORG_GITLAB_TOKEN=tu_token_aqui` y usar
> herramientas como `direnv` o `dotenv` para cargarlo automáticamente.

## Uso

La skill proporciona una plantilla de comando `curl` que busca en todos los módulos contribuidos, excluyendo archivos de
core, web roots, docroots y rutas de contrib agrupadas, para devolver un solo resultado por módulo contribuido.

### Búsqueda básica

```bash
curl -sS \
  --header "PRIVATE-TOKEN: $DRUPALORG_GITLAB_TOKEN" \
  "https://git.drupalcode.org/api/v4/groups/2/search?scope=blobs&search=<TERMINO>&per_page=100&page=1"
```

El endpoint de la API utilizado es:

```
https://git.drupalcode.org/api/v4/groups/2/search?scope=blobs&search=<TERMINO>%20-path:web/*%20-path:core/*%20-path:docroot%20-path:modules/contrib/*&per_page=100&page=1
```

## Sintaxis de búsqueda

La búsqueda de blobs de GitLab soporta los siguientes operadores:

| Sintaxis | Descripción | Ejemplo |
|----------|-------------|---------|
| `"` | Búsqueda exacta | `"edit node"` |
| `~` | Búsqueda difusa | `J~ Doe` |
| `\|` | O | `display \| banner` |
| `+` | Y | `display +banner` |
| `-` | Excluir | `display -banner` |
| `*` | Parcial / comodín | `bug error 50*` |
| `\` | Escapar | `\*md` |

### Filtros de blob

| Sintaxis | Descripción | Ejemplo |
|----------|-------------|---------|
| `filename:` | Filtrar por nombre de archivo | `filename:*Manager.php` |
| `path:` | Filtrar por ruta en el repositorio | `path:src/Plugin/` |
| `extension:` | Filtrar por extensión de archivo | `extension:js` |

## Ejemplos

| Objetivo | URL |
|----------|-----|
| Buscar `symfony/http-foundation` excluyendo `composer.lock` | `?search=symfony/http-foundation%20-filename:composer.lock%20-path:web/*%20-path:core/*%20-path:docroot%20-path:modules/contrib/*` |
| Comodín `Form*State` excluyendo `FormStateInterface` | `?search=Form*State%20-FormStateInterface%20-path:web/*%20-path:core/*%20-path:docroot%20-path:modules/contrib/*` |
| `alter` O (`form` Y `validate`) | `?search=alter%20%7C%20(form%20%2B%20validate)%20-path:web/*%20-path:core/*%20-path:docroot%20-path:modules/contrib/*` |
| `region` excluyendo `.yml` y `.js` | `?search=region%20-extension:yml%20-extension:js%20-path:web/*%20-path:core/*%20-path:docroot%20-path:modules/contrib/*` |
| `Node` solo en `src/Plugin/Block/` | `?search=Node%20path:src/Plugin/Block/%20-path:web/*%20-path:core/*%20-path:docroot%20-path:modules/contrib/*` |
