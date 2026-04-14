import { types } from 'react-bricks/rsc'

// import emailUITheme from '@reactbricks/email-ui-rsc' <<EMAIL_BRICKS>>
import reactBricksUITheme from '@reactbricks/reactbricks-ui-rsc'
import HeroUnit from './custom/MyHeroUnit'
import Pokemon from './custom/Pokemon'

const bricks: types.Theme[] = [
  reactBricksUITheme, // React Bricks UI
  // emailUITheme, // React Bricks Email UI <<EMAIL_BRICKS>>
  {
    themeName: 'Default',
    categories: [
      {
        categoryName: 'Custom bricks',
        bricks: [HeroUnit, Pokemon], // Custom Bricks
      },
    ],
  },
]

export default bricks
