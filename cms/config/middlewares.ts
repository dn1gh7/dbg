import type { Core } from '@strapi/strapi';

const config: Core.Config.Middlewares = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      // Comma-separated list of site origins allowed to read the API. The default
      // covers the Vite dev server; production origins come from the environment.
      origin: (process.env.STRAPI_CORS_ORIGINS ?? 'http://localhost:8080')
        .split(',')
        .map((o) => o.trim())
        .filter(Boolean),
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

export default config;
