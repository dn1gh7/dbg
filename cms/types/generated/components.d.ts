import type { Schema, Struct } from '@strapi/strapi';

export interface ContentButtonRow extends Struct.ComponentSchema {
  collectionName: 'components_content_button_rows';
  info: {
    description: 'Eine Reihe von Schaltfl\u00E4chen mit frei w\u00E4hlbarer Beschriftung.';
    displayName: 'Schaltfl\u00E4chen';
    icon: 'cursor';
  };
  attributes: {
    buttons: Schema.Attribute.Component<'shared.file-link', true>;
  };
}

export interface ContentGallery extends Struct.ComponentSchema {
  collectionName: 'components_content_galleries';
  info: {
    description: 'Mehrere Bilder als durchbl\u00E4tterbare Galerie.';
    displayName: 'Bildergalerie';
    icon: 'images';
  };
  attributes: {
    caption: Schema.Attribute.String;
    images: Schema.Attribute.Media<'images', true> & Schema.Attribute.Required;
  };
}

export interface ContentImage extends Struct.ComponentSchema {
  collectionName: 'components_content_images';
  info: {
    description: 'Ein einzelnes Bild mit optionaler Bildunterschrift.';
    displayName: 'Bild';
    icon: 'picture';
  };
  attributes: {
    alt: Schema.Attribute.String;
    caption: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface ContentRichText extends Struct.ComponentSchema {
  collectionName: 'components_content_rich_texts';
  info: {
    description: 'Ein Textabschnitt.';
    displayName: 'Text';
    icon: 'align-left';
  };
  attributes: {
    text: Schema.Attribute.Blocks;
  };
}

export interface SharedFileLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_file_links';
  info: {
    description: 'A download button with an editor-supplied label.';
    displayName: 'File Link';
    icon: 'file';
  };
  attributes: {
    file: Schema.Attribute.Media<'files' | 'images'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String;
  };
}

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
      'content.button-row': ContentButtonRow;
      'content.gallery': ContentGallery;
      'content.image': ContentImage;
      'content.rich-text': ContentRichText;
      'shared.file-link': SharedFileLink;
      'shared.link-row': SharedLinkRow;
    }
  }
}
