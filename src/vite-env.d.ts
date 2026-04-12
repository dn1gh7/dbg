/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Strapi origin without trailing slash. Dev example with Vite proxy: http://localhost:8080/strapi-api */
  readonly VITE_STRAPI_URL?: string;
  /** Optional read API token if Strapi permissions are not public */
  readonly VITE_STRAPI_API_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
