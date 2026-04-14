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
  // { <<EMAIL_BRICKS>>
  //   name: 'email', <<EMAIL_BRICKS>>
  //   pluralName: 'email', <<EMAIL_BRICKS>>
  //   isEmailMarketing: true, <<EMAIL_BRICKS>>
  //   defaultLocked: false, <<EMAIL_BRICKS>>
  //   defaultStatus: types.PageStatus.Published, <<EMAIL_BRICKS>>
  //   getDefaultContent: () => [], <<EMAIL_BRICKS>>
  //   allowedBlockTypes: [ <<EMAIL_BRICKS>>
  //     'email-article-authors', <<EMAIL_BRICKS>>
  //     'email-article-author', <<EMAIL_BRICKS>>
  //     'email-article-cards', <<EMAIL_BRICKS>>
  //     'email-article-cards-row', <<EMAIL_BRICKS>>
  //     'email-article-image', <<EMAIL_BRICKS>>
  //     'email-button', <<EMAIL_BRICKS>>
  //     'email-dividier', <<EMAIL_BRICKS>>
  //     'email-features', <<EMAIL_BRICKS>>
  //     'email-feature-item', <<EMAIL_BRICKS>>
  //     'email-feature-row', <<EMAIL_BRICKS>>
  //     'email-footer', <<EMAIL_BRICKS>>
  //     'email-footer-icon', <<EMAIL_BRICKS>>
  //     'email-gallery', <<EMAIL_BRICKS>>
  //     'email-gallery-row', <<EMAIL_BRICKS>>
  //     'email-header', <<EMAIL_BRICKS>>
  //     'email-header-menu-item', <<EMAIL_BRICKS>>
  //     'email-heading', <<EMAIL_BRICKS>>
  //     'email-image', <<EMAIL_BRICKS>>
  //     'email-list', <<EMAIL_BRICKS>>
  //     'email-list-item', <<EMAIL_BRICKS>>
  //     'email-markdown', <<EMAIL_BRICKS>>
  //     'email-text', <<EMAIL_BRICKS>>
  //     'email-text-container', <<EMAIL_BRICKS>>
  //   ], <<EMAIL_BRICKS>>
  //   renderWrapper: (args) => { <<EMAIL_BRICKS>>
  //     if (args.renderEnvironment === 'Admin') { <<EMAIL_BRICKS>>
  //       return <Section className="container mx-auto">{args.children}</Section> <<EMAIL_BRICKS>>
  //     } <<EMAIL_BRICKS>>
  //     if (args.renderEnvironment === 'Email') { <<EMAIL_BRICKS>>
  //       return ( <<EMAIL_BRICKS>>
  //         <Html> <<EMAIL_BRICKS>>
  //           <Tailwind> <<EMAIL_BRICKS>>
  //             <Head> <<EMAIL_BRICKS>>
  //               <Font <<EMAIL_BRICKS>>
  //                 fontFamily="Nunito Sans" <<EMAIL_BRICKS>>
  //                 fallbackFontFamily="sans-serif" <<EMAIL_BRICKS>>
  //                 webFont={{ <<EMAIL_BRICKS>>
  //                   url: 'https://fonts.gstatic.com/s/nunitosans/v19/pe0AMImSLYBIv1o4X1M8ce2xCx3yop4tQpF_MeTm0lfUVwoNnq4CLz0_kJ3xzHGGVFM.woff2', <<EMAIL_BRICKS>>
  //                   format: 'woff2', <<EMAIL_BRICKS>>
  //                 }} <<EMAIL_BRICKS>>
  //                 fontWeight={400} <<EMAIL_BRICKS>>
  //                 fontStyle="normal" <<EMAIL_BRICKS>>
  //               /> <<EMAIL_BRICKS>>
  //             </Head> <<EMAIL_BRICKS>>
  //             <Body>{args.children}</Body> <<EMAIL_BRICKS>>
  //           </Tailwind> <<EMAIL_BRICKS>>
  //         </Html> <<EMAIL_BRICKS>>
  //       ) <<EMAIL_BRICKS>>
  //     } <<EMAIL_BRICKS>>
  //     return args.children <<EMAIL_BRICKS>>
  //   }, <<EMAIL_BRICKS>>
  //   renderEmailHtml: async (args) => { <<EMAIL_BRICKS>>
  //     const str = await render(args.children) <<EMAIL_BRICKS>>
  //     // console.log(str) <<EMAIL_BRICKS>>
  //     const html = await pretty(str) <<EMAIL_BRICKS>>
  //     console.log(html) <<EMAIL_BRICKS>>
  //     return html <<EMAIL_BRICKS>>
  //   }, <<EMAIL_BRICKS>>
  // }, <<EMAIL_BRICKS>>
]

export default pageTypes
