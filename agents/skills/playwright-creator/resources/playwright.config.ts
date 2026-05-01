// #ddev-generated
import { defineConfig, devices } from '@playwright/test';
import { Environment } from './tests/playwright/_config/environment';
import dotenv from 'dotenv';

// Cargar variables de entorno desde .env
dotenv.config();

const envConfig = Environment.getConfig();

/**
 * See https://playwright.dev/docs/test-configuration.
 */

export default defineConfig({
    testDir: './tests/playwright',
    outputDir: './tests/playwright/_results',

    timeout: 30 * 1000,
    expect: {timeout: 10000},
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,

    reporter: [
        ['html', { outputFolder: './tests/playwright/_report' }],
    ],

    globalSetup: require.resolve('./tests/playwright/_config/global-setup'),
    globalTeardown: require.resolve('./tests/playwright/_config/global-teardown'),

    use: {
        baseURL: envConfig.baseURL,
        trace: 'on-first-retry',
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
        testIdAttribute: 'pw-id',

        // Usuario anónimo por defecto: sin cookies de sesión.
        // Los tests que requieren login deben sobrescribir esto con
        // test.use({ storageState: undefined }) en su describe.
        storageState: { cookies: [], origins: [] },
    },

    projects: [
        // Proyecto smoke: solo verifica que la web esté activa.
        // Si falla, todos los demás proyectos se saltan.
        {
            name: 'smoke',
            testMatch: /.*\.spec\.ts/,
            grep: /@smoke/,
            use: { ...devices['Desktop Chrome'] },
        },

        /* Test en navegadores de escritorio. */
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
            dependencies: ['smoke'],
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
            dependencies: ['smoke'],
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
            dependencies: ['smoke'],
        },

        /* Test en vista móvil. */
        // {
        //     name: 'Mobile Chrome',
        //     use: { ...devices['Pixel 5'] },
        //     dependencies: ['smoke'],
        // },
        // {
        //     name: 'Mobile Safari',
        //     use: { ...devices['iPhone 12'] },
        //     dependencies: ['smoke'],
        // },

        /* Test en navegadores con marca. */
        // {
        //     name: 'Microsoft Edge',
        //     use: { ...devices['Desktop Edge'], channel: 'msedge' },
        //     dependencies: ['smoke'],
        // },
        // {
        //     name: 'Google Chrome',
        //     use: { ...devices['Desktop Chrome'], channel: 'chrome' },
        //     dependencies: ['smoke'],
        // },
    ],
});
