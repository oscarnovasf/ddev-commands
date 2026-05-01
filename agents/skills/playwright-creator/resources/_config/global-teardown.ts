// #ddev-generated
/**
 * @file
 * Configuración global para los tests de Playwright.
 *
 * Aquí se pueden realizar tareas de limpieza global, como eliminar usuarios de prueba, limpiar datos, etc.
 * El código aquí se ejecutará una vez después de que se hayan ejecutado todos los tests.
 *
 * Este ejemplo muestra cómo ejecutar un comando drush para limpiar el entorno de pruebas después de la ejecución.
 * Puedes reemplazar el comando drush con cualquier otro comando que necesites ejecutar después de los tests.
 */

import { type FullConfig } from '@playwright/test';
import { execSync } from "child_process";

async function globalTeardown(config: FullConfig) {
    const isDdev = process.env.IS_DDEV_PROJECT || false;

    if (process.env.CI) {
        console.log('Ejecución en entorno CI');
        try {
            execSync(`platform -edev drush cr`, { stdio: 'inherit' });
        }
        catch (error) {
            console.log('La CLI de la plataforma o drush no están disponibles en CI.');
        }
    }
    else {
        if (isDdev !== false) {
            console.log('Ejecutando en contenedor ddev');
            try {
                execSync('drush cr', { stdio: 'inherit' });
            }
            catch (error) {
                console.log('drush no disponible');
            }
        }
        else {
            console.log('Ejecutando desde el host, fuera del contenedor ddev.');
            try {
                execSync('ddev drush cr', { stdio: 'inherit' });
            }
            catch (error) {
                console.log('ddev drush no disponible');
            }
        }
    }
}

export default globalTeardown;
