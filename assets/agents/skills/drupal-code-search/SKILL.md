---
#ddev-generated
name: drupal-code-search
description: >
  How to search the code of all Drupal contributed modules on drupal.org to find code examples.
metadata:
  status: stable
  last-reviewed: 2026-07
  reference: Balidea
---

To find "<MY_OBSCURE_TERM>" curl this url (requires the DRUPALORG_GITLAB_TOKEN environment variable to be set):
curl -sS --header "PRIVATE-TOKEN: $DRUPALORG_GITLAB_TOKEN"
https://git.drupalcode.org/api/v4/groups/2/search?scope=blobs&search=<MY_OBSCURE_TERM>%20-path:web/*%20-path:core/*%20-path:docroot%20-path:modules/contrib/*&per_page=100&page=1

By excluding those various paths we narrow the results down to a single result per contributed module, removing
duplicates where projects have been indexed with modules bundled inside them.

Additional syntax options:

| Syntax | Description | Example |
|--------|-------------|---------|
| `"` | Exact search | `"edit node"` |
| `~` | Fuzzy search | `J~ Doe` |
| `|` | Or | `display | banner` |
| `+` | And | `display +banner` |
| `-` | Exclude | `display -banner` |
| `*` | Partial | `bug error 50*` |
| `\` | Escape | `\*md` |

Code search:

| Syntax | Description | Example |
|--------|-------------|---------|
| `filename:` | Filename | `filename:*Manager.php` |
| `path:` | Repository location (full or partial matches) | `path:src/Plugin/` |
| `extension:` | File extension without . (exact matches only) | `extension:js` |

Examples:

| URL | Description |
|-----|-------------|
| `https://git.drupalcode.org/api/v4/groups/2/search?scope=blobs&search=symfony/http-foundation%20-filename:composer.lock%20-path:web/*%20-path:core/*%20-path:docroot%20-path:modules/contrib/*&per_page=100&page=1` | symfony/http-foundation in all files except composer.lock. |
| `https://git.drupalcode.org/api/v4/groups/2/search?scope=blobs&search=Form*State%20-FormStateInterface%20-path:web/*%20-path:core/*%20-path:docroot%20-path:modules/contrib/*&per_page=100&page=1` | Form*State but not FormStateInterface (demonstrates wildcard and exclusion). |
| `https://git.drupalcode.org/api/v4/groups/2/search?scope=blobs&search=alter%20%7C%20(form%20%2B%20validate)%20-path:web/*%20-path:core/*%20-path:docroot%20-path:modules/contrib/*&per_page=100&page=1` | alter or both form and validate. |
| `https://git.drupalcode.org/api/v4/groups/2/search?scope=blobs&search=region%20-extension:yml%20-extension:js%20-path:web/*%20-path:core/*%20-path:docroot%20-path:modules/contrib/*&per_page=100&page=1` | region in all files except .yml and .js. |
| `https://git.drupalcode.org/api/v4/groups/2/search?scope=blobs&search=Node%20path:src/Plugin/Block/%20-path:web/*%20-path:core/*%20-path:docroot%20-path:modules/contrib/*&per_page=100&page=1` | Node in files under src/Plugin/Block/ (e.g. node block plugins). |
