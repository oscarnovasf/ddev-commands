#ddev-generated
# Structure:

Use the 'conventional commit' format for commit messages.

```
<type>: #<id> <description>

<body>
```

## Allowed types (<type>):

- feat: for new features.
- fix: for bug fixes.
- docs: for documentation changes.
- style: for formatting changes that don't affect logic.
- refactor: for code refactoring.
- test: for adding or fixing tests.
- chore: for maintenance tasks.

## IMPORTANT: ID extraction rule (highest priority)

- The commit `<id>` MUST be extracted ONLY from the current Git branch name.
- Never extract the ID from changed files, patch names, issue URLs, commit history or diff content.
- First read the branch name by executing: `git branch --show-current`
- Use this regex against ONLY that branch name string: `(?:^|/)(\d+)(?:-|$)`
- The ID is capture group 1.
- If regex does not match, set ID to `000`.
- If there are multiple numbers in other contexts (diffs, file names, patch names), ignore them.
- Never reuse numbers seen in patches (for example `3395375-6.patch`) unless they are also the branch ID.

## Rules:

- Identify the prefix (<type>) to use, picking the most appropriate one.
- Use imperative mode: 'Add feature' not 'Added feature'.
- The type must be in English.
- The rest of the message must be in Spanish.
- Use lowercase for the type and description.
- Don't use a period at the end of the description.
- Be clear and concise.
- The full header (type, id and description) MUST NOT exceed 50 characters.
- The `<body>` is OPTIONAL, but if included it must be separated from the header by a blank line.
- The `<body>` can span multiple lines, but each line MUST NOT exceed 80 characters.
- The `<body>` must explain the reason for the change or relevant details, in Spanish.
- In the `<body>` use asterisk lists (`*`) for clarity.
- Don't repeat the header information in the body; if the header is clear a body is not necessary.

## Validation:

- Make sure you are using the correct ID (obtained from the current branch name).
- Before returning the final message, verify that the extracted ID matches the numeric pattern of the current branch.

## Examples:

This message is invalid; it repeats concepts in the header and the body; 
the body adds no real value and does not use lists:

```
feat: #18823 añade soporte para múltiples idiomas

Se ha implementado la detección automática del idioma del usuario.
Esto permite personalizar la experiencia según la preferencia regional.
```

It would be more appropriate to say:

```
feat: #18823 añade soporte para múltiples idiomas
```

This message would be valid:

```
fix: #14724 corrige error en la validación del formulario

* El campo email ahora valida correctamente los dominios con tildes.
* El campo nombre ahora valida que empiece por mayúscula.
```

This message would also be valid:

```
docs: #15769 actualiza la documentación de instalación

* Añadidos pasos para la configuración en entornos Docker.
* Ajustes en README.md para documentar el proceso de instalación.
```
