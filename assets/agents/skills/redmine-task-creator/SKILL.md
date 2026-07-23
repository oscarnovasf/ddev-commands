---
#ddev-generated
name: redmine-task-creator
description: >
  Generates complete, detailed Redmine task definitions in Textile format, saving them as .textile files in the project's
  `_docs/tasks` directory. Use this skill whenever the user wants to define, document, create, or plan a Redmine task
  — even if they use phrases like "write up this task", "log this in Redmine", "I need to create a ticket",
  "define this feature", or simply describe a development need that should be tracked. The skill reads actual project
  context to make definitions as precise and actionable as possible. Always invoke this skill proactively when the
  conversation involves Redmine, task planning, feature definition, or backlog grooming.
metadata:
  status: stable
  last-reviewed: 2026-07
  reference: Balidea
---

# Redmine Task Creator

Generates detailed, well-structured Redmine tasks in Textile format, adapted to the real context of the current project.

## Your goal

Turn a description of a need — however vague — into a complete, clear, and actionable Redmine task. A good Redmine task
lets any developer on the team start working without needing further clarifications.

Generate **one `.textile` file per task** in the `_docs/tasks/` directory at the project root
(create it if it doesn't exist).

## Exploring project context

Before writing the task, explore the project to make the technical definition precise:

1. Read `AGENTS.md` at the project root (if present) to understand the architecture, tech stack, and conventions.
2. If the task affects an existing module, inspect `web/modules/custom/` to understand the current code.
3. If the task affects the theme, inspect `web/themes/custom/`.
4. If it involves configuration, check `config/sync/` for existing config.
5. If there are dependency questions, consult `composer.custom.json` and/or `composer.json`.

This exploration lets you reference real module names, hooks, services, classes, and file paths instead of vague
placeholders.

## Proposing contrib modules and core updates

When a task could benefit from an existing Drupal contrib module or a recent Drupal core feature, proactively mention it
in the technical details section. For example:

- If a task involves importing data → suggest `migrate_plus` or `feeds`.
- If it involves geolocation → mention `geofield` + `leaflet`.
- If it involves a workflow → suggest `content_moderation` or `scheduler`.
- If a newer version of a contrib module adds the needed feature natively, note this and recommend evaluating an update.

Always check whether the module is already in `composer.custom.json` or `composer.json` before suggesting installation.

## Detecting layout/design needs

If the described task involves creating or modifying a visual interface (new page, new component, block, form with
specific design, etc.) and **is not itself a design/mockup task**, create **two files**:

1. The main implementation task.
2. A separate design/mockup task that should precede the implementation task.

The design task should specify which screens or components need to be designed and clarify that its output
(wireframes or mockups) is a prerequisite for the implementation task to begin.

## File naming

Use lowercase slugs with hyphens, no special characters:

```
_docs/tasks/create-featured-content-block.textile
_docs/tasks/design-featured-content-block.textile
_docs/tasks/external-reservations-api-integration.textile
```

## Task structure (Textile template)

```textile
h1. [TASK TITLE]

*Estimation:* Xh

---

h2. Description

[Detailed description of what needs to be done and why. Explain the context, the problem it solves, and the expected
result. Be specific: mention modules, content types, routes, services, SDC components, or any other project element that
is relevant.]

---

h2. Functional requirements

*(Omit this section if it doesn't apply — e.g. for purely technical or infrastructure tasks.)*

* [Functional requirement 1: what the user must be able to do / what must happen]
* [Functional requirement 2]
* ...

---

h2. Technical implementation details

*(Omit this section if it doesn't apply — e.g. for design or pure content tasks.)*

* [Technical step or decision 1: affected module, hook to implement, service to create, SDC component to build, etc.]
* [Technical step or decision 2]
* ...

Include references to files, classes, Drupal hooks, Drush commands, contrib modules, or any project-specific technical
element that is relevant.

---

h2. Compliance checklist

# [ ] Task description in Redmine is clear and complete
# [ ] Deployment steps are documented in the task (e.g. drush custom:deploy, cache clear, module enable)
# [ ] Testing instructions are included (URL to visit, required user role, cases to verify)
# [ ] Code passes all quality checks (linting, static analysis, coding standards)
# [ ] Configuration exported if applicable
# [ ] Commit messages follow the project format (conventional commits + issue number)
# [ ] [Any task-specific compliance requirement]
```

## Estimation guide

The estimate is indicative. Use these ranges and adjust based on perceived
complexity:

| Complexity | Examples | Estimate |
|---|---|---|
| Minimal | Config change, text edit, minor CSS tweak | 1–2h |
| Low | Simple new block, view adjustment, new field | 2–4h |
| Medium | New feature in existing module, simple integration | 4–8h |
| High | New custom module, external API integration, migration | 8–16h |
| Very high | Complex system, multiple integrations | >16h — consider splitting |

If the estimate exceeds 16h, recommend splitting the task into smaller subtasks.

## Drupal project context

This is a **Drupal 11** project. Reflect the following in your task definitions:

- **PHP 8.4**, Drupal 11.x, Drush 13.x
- **Custom modules** in `web/modules/custom/` with `custom_` prefix
- **Custom theme** in `web/themes/custom/` with SDC (Single Directory Components) for reusable UI components
- **Paragraphs** for reusable content structures (check if the project uses them)
- **Config split** per environment: dev, stg, pro, local
- **DDEV** for local development
- **Standard deploy command**: `drush custom:deploy`
- **QA**: GrumPHP with PHPCS (Drupal + DrupalPractice), PHPStan level 8, PHPMND
- **Commit format**: `type(scope): description #IssueNumber`

Always adapt these to what you actually find in `AGENTS.md` and the project files — that file is the source of truth.

## Workflow

1. **Understand the need**: if the description is ambiguous, ask the minimum necessary questions before proceeding.
2. **Explore project context** (see exploration section above).
3. **Detect if design/mockup is needed** and plan one or two files accordingly.
4. **Write the tasks** following the template. Omit sections that don't apply.
5. **Save files** to `_tasks/` (create the directory if it doesn't exist).
6. **Inform the user** of the generated files and a brief summary of their contents.

## Writing quality

- Write all task content in **Spanish (Castellano)**.
- Be concrete and specific: real module names, file paths, Drupal hooks, user roles, SDC component names.
- Avoid vagueness ("do something related to X") — if you lack information, ask.
- The description must be sufficient for a developer who wasn't part of the conversation to execute the task without
  clarifications.
