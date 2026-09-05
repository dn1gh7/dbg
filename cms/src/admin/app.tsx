import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    // Adds German to the language picker in Profile → Interface language. English is
    // always available and is not listed here. Each editor chooses their own; the
    // choice is stored per admin user, not globally.
    locales: ['de'],
  },
  bootstrap(_app: StrapiApp) {},
};
