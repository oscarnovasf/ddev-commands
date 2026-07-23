---
#ddev-generated
name: git-mr-description
description: >
  Generates GitLab Merge Request descriptions by analyzing the branch diff against develop. Use this skill whenever the
  user asks to generate, write, or create an MR description, merge request description, or MR body — even if they just
  say "describe this MR", "write the MR", "MR description", "genera la descripción del MR", or similar phrases in
  English or Spanish. Also trigger when the user mentions preparing a branch for review and needs a summary of changes.
metadata:
  status: stable
  last-reviewed: 2026-07
  reference: Balidea
---

# MR Description Generator

Generate complete GitLab Merge Request descriptions for this Drupal project by analyzing the git diff of the current
branch against `develop`.

## Safety Rule

NEVER execute git commands that modify the repository state (commit, push, merge, rebase, checkout, stash, reset, etc.).
ONLY use read-only git commands:
`git diff`, `git log`, `git branch`, `git show`, `git status`, `git rev-parse`.

## Workflow

### 1. Gather context

Run these commands to understand the branch and its changes:

```bash
# Get current branch name (extract issue ID from it)
git rev-parse --abbrev-ref HEAD

# Get the diff against develop (stat overview first, then full diff)
git diff develop --stat
git diff develop

# Get commit messages for context
git log develop..HEAD --oneline
```

Also check if the user provided additional context about the feature in their message. Their description complements the
diff analysis — use both.

### 2. Extract the issue ID

The branch name follows the pattern `feature/XXXXXX-optional-description` or `bugfix/XXXXXX-description`.
Extract the numeric ID (the `XXXXXX` part) for the Redmine link.

If the branch name doesn't contain a numeric ID, ask the user for it.

### 3. Analyze changes and determine installation steps

Look at the diff to determine what "Local environment" steps are needed.
Common patterns:

| Change detected | Local step |
|----------------|------------|
| `composer.json` or `composer.lock` modified | `ddev composer install` |
| Files in `config/sync/` added or modified | `ddev drush custom:deploy` |
| New module enabled in config | `ddev drush custom:deploy` |
| Database schema changes (hook_update_N) | `ddev drush custom:deploy` |
| Only theme/template/CSS/JS changes | `ddev drush cr` |
| Translation files (.po) modified | `ddev drush custom:deploy` |
| Only PHP logic changes (no config/schema) | `ddev drush cr` |

`ddev drush custom:deploy` runs updb + cim + cr in sequence, so it covers config imports and cache rebuilds.
Use it whenever config or updates are involved; use `ddev drush cr` only when the changes are purely code/theme with
no config.

For **Live/staging server**: only include this section if the diff reveals steps that go beyond the standard deployment
pipeline — things like manual database queries, environment-specific config overrides, or one-time data migrations. If
nothing special is needed, write: *No additional steps required.*

### 4. Write the "How to test" section

This section targets QA testers who may not be developers. Write step-by-step instructions that:

- Start from a clear entry point (e.g., "Go to /admin/content" or "Visit the homepage")
- Describe exactly what to click, fill in, or look for
- Include expected results ("You should see...", "The page should display...")
- Cover the happy path and any relevant edge cases
- Use the site's content structure (content types, views, taxonomy) based on what the diff touches
- Write only drupal testing steps — do not include steps for testing external integrations, APIs, or other systems
  outside the Drupal site.

Use the diff and the user's description to infer what the feature does and how to verify it.

### 5. Change the description

Create a XXXXXX.md file in the `_docs/mr-descriptions` directory with the MR description.

```markdown

Backlog item: [#XXXXXX](https://redminebx.balidea.com/issues/XXXXXX)

## Instalación/Actualización

### Entorno local

1. ...

### Servidor live/staging

*(usar solo esta sección si se necesitan pasos manuales/adicionales)*

## Cómo probar

1. ...
```

Replace `XXXXXX` with the actual issue ID. The output should be ready to paste directly into GitLab.

## Language

Write the MR description in **Spanish** by default — unless the user explicitly asks for another language.
