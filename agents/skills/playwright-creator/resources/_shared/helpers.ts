/**
 * @file
 * Helpers compartidos para los tests de Playwright.
 */

import { Page } from '@playwright/test';
import { Environment } from '../_config/environment';

const envConfig = Environment.getConfig();

/**
 * Inicia sesión como el usuario indicado y espera la redirección post-login.
 */
export async function login(
    page: Page,
    user: { name: string; pass: string },
): Promise<void> {
    await page.goto(envConfig.paths.login);

    // Aceptar cookies si aparece el banner.
    const cookieBanner = page.getByRole('button', { name: 'Aceptar todas' });
    if (await cookieBanner.isVisible({ timeout: 3000 }).catch(() => false)) {
        await cookieBanner.click();
    }

    await page.getByRole('textbox', { name: 'Nombre de usuario/a' }).fill(user.name);
    await page.getByRole('textbox', { name: 'Contraseña' }).fill(user.pass);
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();

    // Esperar a que la URL cambie al perfil del usuario (redirección post-login).
    await page.waitForURL(/\/user\/\d+/, { timeout: 10000 });
}

/**
 * Cierra la sesión del usuario actual.
 */
export async function logout(page: Page): Promise<void> {
    await page.goto(envConfig.paths.logout);
}
