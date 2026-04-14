// import {  Body,  Font,  Head,  Html,  pretty,  render,  Section,  Tailwind } from '@react-email/components' <<EMAIL_BRICKS>>
import { types } from 'react-bricks/rsc'

const pageTypes: types.IPageType[] = [
  {
    name: 'page',
    pluralName: 'pages',
    defaultLocked: false,
    defaultStatus: types.PageStatus.Published,
    getDefaultContent: () => [],
    excludedBlockTypes: [
      'blog-title',
      'blog-text',
      'blog-image',
      'header',
      'footer',
    ],
  },
  {
    name: 'blog',
    pluralName: 'Blog',
    defaultLocked: false,
    defaultStatus: types.PageStatus.Published,
    getDefaultContent: () => [],
    allowedBlockTypes: [
      'title',
      'paragraph',
      'big-image',
      'video',
      'code',
      'tweet',
      'tweet-light',
      'blog-title',
      'newsletter-subscribe',
    ],
    customFields: [
      {
        name: 'category',
        label: 'Category',
        type: types.SideEditPropType.Relationship,
        relationshipOptions: {
          label: 'category',
          multiple: true,
          references: 'category',
        },
      },
    ],
  },
  {
    name: 'category',
    pluralName: 'categories',
    defaultLocked: false,
    defaultStatus: types.PageStatus.Published,
    getDefaultContent: () => [],
    isEntity: true,
    headlessView: true,
  },
  {
    name: 'layout',
    pluralName: 'layout',
    defaultLocked: false,
    defaultStatus: types.PageStatus.Published,
    getDefaultContent: () => [],
    isEntity: true,
    allowedBlockTypes: ['header', 'footer'],
  },
]

export default pageTypes
