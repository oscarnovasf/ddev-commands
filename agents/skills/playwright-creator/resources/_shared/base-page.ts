// #ddev-generated
import { Page, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Clase base para todos los Page Objects.
 * Proporciona métodos comunes para interactuar con Drupal, accesibilidad y regresión visual.
 */
export class BasePage {
    constructor(protected readonly page: Page) {}

    /**
     * Navega a una ruta y espera a que la red esté inactiva (útil para AJAX/BigPipe).
     */
    async goto(path: string): Promise<void> {
        await this.page.goto(path);
        // Esperamos a que no haya peticiones de red pendientes por 500ms
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Espera a que aparezcan los mensajes de status/error de Drupal.
     */
    async waitForDrupalMessage(): Promise<void> {
        await this.page.waitForSelector('[role="status"], .messages, .messages--status, .messages--error');
    }

    /**
     * Obtiene el texto del primer mensaje de Drupal visible.
     */
    async getDrupalMessage(): Promise<string> {
        const msg = this.page.locator('[role="status"], .messages, .messages--status, .messages--error').first();
        return (await msg.textContent())?.trim() ?? '';
    }

    /**
     * Realiza un análisis de accesibilidad en la página actual.
     * Requiere @axe-core/playwright
     */
    async checkAccessibility(scenarioName: string): Promise<void> {
        const results = await new AxeBuilder({ page: this.page }).analyze();
        expect(results.violations, `Errores de accesibilidad detectados en: ${scenarioName}`).toEqual([]);
    }

    /**
     * Realiza una captura de pantalla para regresión visual.
     */
    async expectScreenshot(name: string): Promise<void> {
        await expect(this.page).toHaveScreenshot(`${name}.png`, {
            fullPage: true,
            mask: [this.page.locator('.region-breadcrumb')], // Ejemplo: enmascarar elementos dinámicos
        });
    }

    /**
     * Espera a que un elemento esté listo tras una carga AJAX (Drupal Throbber).
     */
    async waitForAjax(): Promise<void> {
        await this.page.waitForSelector('.ajax-progress-throbber', { state: 'detached' });
    }
}
