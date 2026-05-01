# #ddev-generated
---
name: playwright-creator
description: >
  Playwright E2E testing patterns para Drupal.
  Trigger: Cuando se escriben o instalan tests E2E, se pide "instalar", "activar" o "configurar" Playwright, Page Objects, selectores o workflow playwright-cli.
user-invocable: false
---

## Requisitos

Antes de usar esta skill, el workspace debe estar inicializado para `playwright-cli`:
```bash
playwright-cli install
```
Esto asegura que el navegador y la configuración necesaria estén disponibles para la exploración.

## Instalación en el Proyecto

Si el proyecto no tiene la estructura de Playwright configurada, utiliza los archivos base en `./resources/` de esta skill como plantilla.

**Pasos de instalación:**

1. **Copiar archivos base (desde el directorio de la skill):**
   - `./resources/playwright.config.ts` → `[project-root]/playwright.config.ts`
   - `./resources/package.json` → `[project-root]/package.json`
   - `./resources/_config/` → `[project-root]/tests/playwright/_config/`
   - `./resources/_shared/` → `[project-root]/tests/playwright/_shared/`

2. **Configurar Entorno:** En el nuevo `tests/playwright/_config/environment.ts`, reemplazar los placeholders:
   - `{{PROJECT_NAME}}`: Nombre del proyecto para DDEV (ej: `onovas`).
   - `{{DOMAIN}}`: Dominio base para entornos (ej: `oscarnovas.com`).
   - `{{MANAGER_PASS}}` / `{{USER_PASS}}`: Contraseñas de test.

3. **Instalar dependencias:** Ejecutar `npm install` en la raíz del proyecto.

## Detección de Alcance (MANDATORIO)

| El usuario pide | Acción |
|-----------------|--------|
| "instala playwright", "activa playwright", "configura el entorno de tests" | Ejecutar **Instalación en el Proyecto** (copiar recursos y configurar). |
| "un test", "un caso", "agregar test", "haz un test de X" | Seguir el **Workflow** de creación de tests (usar playwright-cli). |
| "refactoriza la base", "mejora la estructura" | Actualizar `BasePage` o `environment.ts` según los patrones de la skill. |

## Workflow

**Antes de crear cualquier test, usa `playwright-cli` para explorar y verificar el flujo real en el navegador:**

1. **Abrir navegador:** `playwright-cli open [url]`
2. **Navegar:** `playwright-cli goto <url>`
3. **Explorar DOM:** `playwright-cli snapshot` (para obtener selectores reales y `pw-id`)
4. **Interactuar:** `playwright-cli click`, `playwright-cli fill`, etc., para validar el flujo exacto.
5. **Documentar:** `playwright-cli screenshot` para registrar estados esperados.
6. **Cerrar:** `playwright-cli close` al terminar la exploración.

**Si `playwright-cli` NO está disponible:** Procede con la creación del test basándote en la documentación y el análisis del código estático.

**Por qué es importante:**
- ✅ Tests precisos — pasos exactos, sin suposiciones
- ✅ Selectores exactos — estructura DOM real, no imaginada
- ✅ Validación del flujo real — verificar que el recorrido funciona
- ✅ Evitar sobre-ingeniería — tests mínimos para lo que existe
- ✅ Prevenir tests inestables — exploración real = tests estables
- ❌ Nunca asumir cómo "debería" funcionar la UI de Drupal

## Estructura de Archivos

```
tests/playwright/
├── _config/
│   ├── environment.ts          # Configuración de entornos (URLs, usuarios)
│   ├── global-setup.ts         # Tareas previas a la suite (ej: drush status)
│   └── global-teardown.ts      # Tareas posteriores a la suite (ej: drush cr)
├── _shared/
│   ├── base-page.ts            # Clase padre para todos los Page Objects
│   └── helpers.ts              # Utilidades compartidas (login, logout, etc.)
└── {nombre-pagina}/
    ├── {nombre-pagina}-page.ts # Page Object Model de la página
    ├── {nombre-pagina}.spec.ts # Tests de la página, TODOS los tests aquí (sin archivos separados)
    └── {nombre-pagina}.md      # Documentación de los tests
```

Cada página o sección de la aplicación tiene su propia carpeta con el Page Object,
los tests y su documentación. Los Page Objects extienden `base-page.ts` para
heredar comportamiento común.

**Nomenclatura:**
- ✅ `node-form.spec.ts` (todos los tests del formulario de nodo)
- ✅ `node-form-page.ts` (page object)
- ✅ `node-form.md` (documentación)
- ❌ `node-form-validation.spec.ts` (INCORRECTO — no archivos separados)

## Prioridad de Selectores (OBLIGATORIO)

```typescript
// 1. MEJOR — getByTestId cuando el elemento tiene atributo pw-id (configurado como testIdAttribute en playwright.config.ts)
this.widget = page.getByTestId("date-picker");   // <div pw-id="date-picker">

// 2. MEJOR — getByRole para elementos interactivos sin pw-id
this.saveButton = page.getByRole("button", { name: "Save" });
this.adminLink  = page.getByRole("link", { name: "Content" });

// 3. MEJOR — getByLabel para controles de formulario sin pw-id
this.titleInput = page.getByLabel("Title");
this.bodyField  = page.getByLabel("Body");

// 4. CON MODERACIÓN — getByText solo para contenido estático
this.errorMsg   = page.getByText("This field is required");

// ❌ EVITAR selectores frágiles
this.btn   = page.locator(".button--primary");        // NO
this.input = page.locator("#edit-title-0-value");     // NO (IDs de Drupal cambian)
```

> **Nota**: `pw-id` es el atributo más estable — fue añadido explícitamente para testing y
> no cambia con refactors de UI ni con actualizaciones de Drupal. Usarlo siempre que esté disponible.
>
> **Nota Drupal**: Los IDs generados por Drupal (ej. `#edit-field-x-0-value`) son
> inestables entre versiones. Nunca usarlos como selectores.

## Detección de Alcance (PREGUNTAR SI AMBIGUO)

| El usuario dice | Acción |
|-----------------|--------|
| "un test", "un caso", "agregar test" | Crear UN test() en spec existente |
| "tests completos", "suite", "generar tests" | Crear suite completa |

## Page Object Pattern

```typescript
import { Page, Locator, expect } from "@playwright/test";

// BasePage — TODAS las páginas extienden esto
export class BasePage {
  constructor(protected readonly page: Page) {}

  /**
   * Navega a una ruta y espera a que la red esté inactiva (AJAX/BigPipe).
   */
  async goto(path: string): Promise<void> {
    await this.page.goto(path);
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Análisis de accesibilidad (requiere @axe-core/playwright).
   */
  async checkAccessibility(scenario: string): Promise<void> {
    const results = await new AxeBuilder({ page: this.page }).analyze();
    expect(results.violations, `Error de accesibilidad en: ${scenario}`).toEqual([]);
  }

  /**
   * Captura para regresión visual.
   */
  async expectScreenshot(name: string): Promise<void> {
    await expect(this.page).toHaveScreenshot(`${name}.png`, { fullPage: true });
  }

  async waitForDrupalMessage(): Promise<void> {
    await this.page.waitForSelector('[role="status"], .messages');
  }

  async getDrupalMessage(): Promise<string> {
    const msg = this.page.locator('[role="status"], .messages').first();
    return (await msg.textContent())?.trim() ?? "";
  }
}

// Implementación específica de página
export class NodeFormPage extends BasePage {
  readonly titleInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    super(page);
    this.titleInput  = page.getByLabel("Title");
    this.saveButton  = page.getByRole("button", { name: "Save" });
  }

  async goto(nodeType = "article"): Promise<void> {
    await super.goto(`/node/add/${nodeType}`);
  }

  async fillTitle(title: string): Promise<void> {
    await this.titleInput.fill(title);
  }

  async save(): Promise<void> {
    await this.saveButton.click();
    await this.waitForDrupalMessage();
  }
}
```

## Reutilización de Page Objects (CRÍTICO)

Siempre verificar page objects existentes antes de crear nuevos:

```typescript
// ✅ BIEN: Reutilizar page objects existentes
import { test, expect } from "@playwright/test";
import { AdminLoginPage } from "../admin-login/admin-login-page";
import { NodeFormPage }   from "../node-form/node-form-page";

test.describe("Node Form", () => {
  test(
    "Como editor, quiero crear un artículo tras iniciar sesión",
    { tag: ["@critical", "@e2e", "@content", "@NODE-E2E-002"] },
    async ({ page }) => {
      const login    = new AdminLoginPage(page);
      const nodeForm = new NodeFormPage(page);

      await test.step("Iniciar sesión como editor", async () => {
        await login.loginAs("editor");            // REUTILIZAR
      });

      await test.step("Navegar al formulario y crear el artículo", async () => {
        await nodeForm.goto("article");
        await nodeForm.fillTitle("Test Article");
        await nodeForm.save();
        await expect(page, "Error: Tras guardar, la URL debe apuntar al nodo creado (/node/{id})")
          .toHaveURL(/\/node\/\d+/);
      });
    }
  );
});

// ❌ MAL: Recrear funcionalidad existente
export class ArticleFormPage extends BasePage {
  async login() { /* AdminLoginPage ya tiene esto */ }
}
```

## Estructura de Test — Historia de Usuario (OBLIGATORIO)

Cada test se estructura como una **historia de usuario** con tres niveles:

| Nivel | Qué representa |
|-------|----------------|
| `test.describe` | La feature o página bajo prueba |
| `test()` | Un escenario redactado como historia de usuario ("Como X, quiero Y para Z") |
| `test.step()` | Cada paso lógico del escenario |

```typescript
import { test, expect } from "@playwright/test";
import { NodeFormPage } from "./node-form-page";

test.describe("Node Form", () => {
  test(
    "Como editor, quiero crear un artículo para publicar contenido en el sitio",
    { tag: ["@critical", "@e2e", "@content", "@NODE-E2E-001"] },
    async ({ page }) => {
      const nodeForm = new NodeFormPage(page);

      await test.step("Navegar al formulario de creación de artículo", async () => {
        await nodeForm.goto("article");
      });

      await test.step("Rellenar el título del artículo", async () => {
        await nodeForm.fillTitle("Mi artículo de prueba");
      });

      await test.step("Guardar el artículo y verificar la redirección", async () => {
        await nodeForm.save();
        await expect(page, "Error: Tras guardar, la URL debe apuntar a la página del nodo creado (/node/{id})")
          .toHaveURL(/\/node\/\d+/);
      });
    }
  );
});
```

**Reglas:**
- ✅ Un `test.describe` por feature/página
- ✅ Un `test()` por escenario — redactado como historia de usuario
- ✅ Un `test.step()` por cada paso lógico del escenario
- ❌ No agrupar múltiples escenarios en un único `test()` sin `test.step()`

**Categorías de tags:**
- Prioridad: `@critical`, `@high`, `@medium`, `@low`
- Tipo: `@e2e`
- Feature: `@content`, `@admin`, `@forms`, `@taxonomy`
- Role: `@user`, `@editor`, `@admin`
- Test ID: `@NODE-E2E-001`, `@ADMIN-E2E-002`

## Mensajes en expect() (OBLIGATORIO)

Todo `expect()` debe incluir un mensaje que describa el error si la aserción falla.
Cuando el valor real es relevante, interpolarlo con template literal.

```typescript
// ✅ BIEN — mensaje descriptivo con valor real interpolado
const response = await page.goto('/');
expect(response?.status(), `Error: Se esperaba 200 pero la página respondió ${response?.status()}`)
  .toBe(200);

await expect(page, "Error: La URL no contiene /node/{id} tras guardar el artículo")
  .toHaveURL(/\/node\/\d+/);

await expect(titleInput, "Error: El campo título debe estar visible en el formulario")
  .toBeVisible();

// ❌ MAL — sin mensaje, el fallo no explica qué se esperaba
expect(response?.status()).toBe(200);
await expect(page).toHaveURL(/\/node\/\d+/);
```

**Formato:** `"Error: {qué se esperaba} [pero {valor real}]"`

## Accesibilidad y Regresión Visual (PREMIUM)

Todo test de una página completa o feature visual debe incluir validaciones de accesibilidad y visuales.

```typescript
test("Validar apariencia y accesibilidad de la landing", async ({ page }) => {
  const landing = new LandingPage(page);
  await landing.goto();

  // 1. Regresión visual (comparar con snapshot base)
  await landing.expectScreenshot("landing-page");

  // 2. Accesibilidad (normas WCAG)
  await landing.checkAccessibility("Landing Page");
});
```

## Manejo de AJAX y BigPipe en Drupal

Drupal utiliza AJAX intensivamente (formularios, vistas, BigPipe). Para evitar tests inestables (flaky tests):

1. **Wait for Network Idle:** `await page.waitForLoadState("networkidle")` tras navegaciones.
2. **Wait for Throbber:** Si hay un indicador de carga de Drupal:
   `await page.waitForSelector(".ajax-progress-throbber", { state: "detached" })`.
3. **Aserciones Robustas:** `await expect(locator).toBeVisible()` reintenta automáticamente, usarlo siempre en lugar de `isVisible()`.

## Refactoring: Cuándo Mover Código

### Mover a `BasePage` cuando:
- ✅ Helpers de navegación usados por múltiples páginas
- ✅ Interacciones comunes de Drupal (mensajes de estado, diálogos de confirmación)
- ✅ Patrones de verificación repetidos (`waitForDrupalMessage`, `getDrupalMessage`)
- ✅ Manejo de esperas AJAX genéricas y Throbbers

### Mover a `helpers.ts` cuando:
- ✅ Generación de datos de test (`generateUniqueTitle()`, `generateTestNode()`)
- ✅ Utilidades de setup/teardown (`createTestUser()`, `cleanupContent()`)
- ✅ Helpers de API Drupal para setup (`seedContent()`, `resetState()`)

## Documentación de Tests ({page-name}.md)

```markdown
### E2E Tests: {Nombre de Feature}

**Suite ID:** `{SUITE-ID}`
**Feature:** {Descripción}

---

## Test Case: `{TEST-ID}` - {Título}

**Prioridad:** `{critical|high|medium|low}`

**Tags:** @e2e, @{feature}

**Descripción:** {Breve descripción}

**Precondiciones:**
- {Requisito previo}

### Pasos:
1. {Paso 1}
2. {Paso 2}

### Resultado esperado:
- {Resultado 1}

### Puntos de verificación:
- {Aserción 1}
```

**Reglas de documentación:**
- ❌ NO instrucciones generales de ejecución
- ❌ NO explicaciones de estructura de archivos
- ✅ Enfocarse SOLO en el caso de test específico
- ✅ Máximo 60 líneas cuando sea posible

## Comandos

```bash
npx playwright test                               # Todos los tests
npx playwright test --grep "content"              # Filtrar por nombre
npx playwright test --ui                          # Modo interactivo
npx playwright test --debug tests/node-form/      # Debug de carpeta
npx playwright test --grep "@critical"            # Solo tests críticos
npx playwright test --grep "@admin"               # Solo tests de admin
```

## Keywords
playwright, e2e, testing, drupal, page object model, selectores, playwright-cli, instalación, configuración
