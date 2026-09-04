import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Server => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  // Public origin the browser reaches Strapi at. Behind a reverse proxy this must be
  // set, or uploaded media come back with the internal container URL and the site's
  // mediaUrl() builds links that don't resolve.
  url: env('STRAPI_PUBLIC_URL', undefined),
  app: {
    keys: env.array('APP_KEYS'),
  },
});

export default config;
