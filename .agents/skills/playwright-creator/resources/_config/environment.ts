/**
 * @file
 * Configuración de entorno para los tests de Playwright.
 *
 * Este archivo define la clase `Environment` que proporciona una forma centralizada
 * de gestionar las configuraciones de entorno para los tests.
 *
 * La clase `Environment` contiene un método estático `getConfig()` que devuelve
 * la configuración correspondiente al entorno especificado en la variable de
 * entorno `ENVIRONMENT`.
 *
 * Si no se especifica ningún entorno, se utiliza la configuración por defecto.
 */

interface EnvConfig {
    baseURL: string;
    users: {
        manager: { name: string; pass: string };
        user: { name: string; pass: string };
    };
}

// Valores comunes a todos los entornos: se definen una sola vez.
const SHARED = {
    paths: {
        login: '/user/login',
        logout: '/user/logout',
    },
};

export class Environment {
    private static configs: Record<string, EnvConfig> = {
        loc: {
            baseURL: "https://{{PROJECT_NAME}}.ddev.site",
            users: {
                manager: { name: 'manager', pass: '{{MANAGER_PASS}}' },
                user: { name: 'user', pass: '{{USER_PASS}}' },
            }
        },

        dev: {
            baseURL: "https://dev.{{DOMAIN}}",
            users: {
                manager: { name: 'manager', pass: '{{MANAGER_PASS}}' },
                user: { name: 'user', pass: '{{USER_PASS}}' },
            }
        },

        stg: {
            baseURL: "https://stg.{{DOMAIN}}",
            users: {
                manager: { name: 'manager', pass: '{{MANAGER_PASS}}' },
                user: { name: 'user', pass: '{{USER_PASS}}' },
            }
        },

        pro: {
            baseURL: "https://{{DOMAIN}}",
            users: {
                manager: { name: 'manager', pass: '{{MANAGER_PASS}}' },
                user: { name: 'user', pass: '{{USER_PASS}}' },
            }
        },
    };

    static getConfig(): EnvConfig & typeof SHARED {
        const env = process.env.DRUPAL_ENV || "loc";
        const specific = Environment.configs[env] || Environment.configs.loc;
        return { ...SHARED, ...specific };
    }
}
