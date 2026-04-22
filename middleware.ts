import { NextResponse } from 'next/server'
import {
  chain,
  createWithAbTestingMiddleware,
  createI18nMiddleware,
} from 'react-bricks/rsc'

import { i18n } from '@/i18n-config'
import rbConfig, { abTestingEnabled } from '@/react-bricks/config'

const withAbTestingMiddleware = createWithAbTestingMiddleware({
  i18n,
  config: rbConfig,
})
const withI18nMiddleware = createI18nMiddleware({ i18n, NextResponse })

const middleware = abTestingEnabled
  ? chain([withAbTestingMiddleware, withI18nMiddleware])
  : withI18nMiddleware

export default middleware

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|admin|logo.svg|bricks-preview-images|preview).*)',
  ],
}
