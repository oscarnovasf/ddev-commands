# Publicar nueva versión

## Pasos

1. **Asegurarse de que main está actualizado y limpio**
   ```bash
   git checkout main
   git pull origin main
   git status
   ```

2. **Crear y subir el tag**
   ```bash
   git tag vX.Y.Z
   git push origin vX.Y.Z
   ```
   Usar [Semantic Versioning](https://semver.org/): `MAJOR.MINOR.PATCH`
   - PATCH: correcciones de bugs
   - MINOR: nuevas funcionalidades compatibles
   - MAJOR: cambios que rompen compatibilidad

3. **Crear la release en GitHub**

   > Obtenemos las notas a partir de todos los commits desde el tag anterior.
   
   ```bash
   gh release create vX.Y.Z --title "vX.Y.Z" --notes "## Novedades

   - Descripción del cambio

   ## Correcciones

   - Descripción del fix"
   ```
   O desde la web: https://github.com/oscarnovasf/ddev-commands/releases/new

4. **Verificar** que los tests de CI pasan correctamente en la pestaña Actions.

---

**Formato del tag:** `v1.0.0`, `v1.1.0`, `v1.1.1`, etc.
