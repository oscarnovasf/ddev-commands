/**
 * @file
 * Configuración global para los tests de Playwright.
 *
 * Aquí se pueden realizar tareas de configuración global, como iniciar un servidor de pruebas,
 * configurar variables de entorno, etc.
 * El código aquí se ejecutará una vez antes de que se ejecuten los tests.
 *
 * Este ejemplo muestra cómo ejecutar un comando drush para verificar que el entorno de pruebas está listo.
 * Puedes reemplazar el comando drush con cualquier otro comando que necesites ejecutar antes de los tests.
 */

import { type FullConfig } from '@playwright/test';
import { execSync } from "child_process";

async function globalSetup(config: FullConfig) {
    const isDdev = process.env.IS_DDEV_PROJECT || false;

    if (process.env.CI) {
        console.log('Ejecución en entorno CI');
        try {
            execSync(`platform -edev drush status`, { stdio: 'inherit' });
        }
        catch (error) {
            console.log('La CLI de la plataforma o drush no están disponibles en CI.');
        }
    }
    else {
        if (isDdev !== false) {
            console.log('Ejecutando en contenedor ddev');
            try {
                execSync('drush status', { stdio: 'inherit' });
            }
            catch (error) {
                console.log('drush no disponible');
            }
        }
        else {
            console.log('Ejecutando desde el host, fuera del contenedor ddev.');
            try {
                execSync('ddev drush status', { stdio: 'inherit' });
            }
            catch (error) {
                console.log('ddev drush no disponible');
            }
        }
    }
}

export default globalSetup;
