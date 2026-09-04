import type { Schema, Struct } from '@strapi/strapi';

export interface SharedLinkRow extends Struct.ComponentSchema {
  collectionName: 'components_shared_link_rows';
  info: {
    displayName: 'Link Row';
    icon: 'link';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.link-row': SharedLinkRow;
    }
  }
}
