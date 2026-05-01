# Publicar nueva versión

## Pasos

1. **Actualizar versiones**
   Asegurarse de que la versión es correcta en los siguientes archivos:
   - `install.yaml` (campo `version`)
   - `README.md` (campos `[version]` y `[version-badge]` al final del archivo)
   - `CHANGELOG.md` (añadir nueva versión y fecha)

2. **Asegurarse de que main está actualizado y limpio**
   ```bash
   git checkout main
   git pull origin main
   ```

3. **Commit y Push de los cambios de versión**
   ```bash
   git add install.yaml README.md CHANGELOG.md
   git commit -m "chore: preparar release vX.Y.Z"
   git push origin main
   ```

4. **Crear y subir el tag**
   ```bash
   git tag vX.Y.Z
   git push origin vX.Y.Z
   ```
   Usar [Semantic Versioning](https://semver.org/): `MAJOR.MINOR.PATCH`
   - PATCH: correcciones de bugs
   - MINOR: nuevas funcionalidades compatibles
   - MAJOR: cambios que rompen compatibilidad

5. **Crear la release en GitHub**

   > Si la release ya está documentada en el CHANGELOG.md obtenemos de ahí la información para la release,
     si no lo está obtenemos las notas a partir de todos los commits desde el tag anterior.

   ```bash
   gh release create vX.Y.Z --title "vX.Y.Z" --notes "## Novedades

   - Descripción del cambio

   ## Correcciones

   - Descripción del fix"
   ```
   O desde la web: https://github.com/oscarnovasf/ddev-commands/releases/new

6. **Verificar** que los tests de CI pasan correctamente en la pestaña Actions.

---

**Formato del tag:** `v1.0.0`, `v1.1.0`, `v1.1.1`, etc.
