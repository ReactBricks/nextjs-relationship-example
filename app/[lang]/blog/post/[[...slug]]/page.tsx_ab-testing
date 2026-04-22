import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import {
  JsonLd,
  PageViewer,
  cleanPage,
  fetchPage,
  fetchPages,
  getAbTestingCookie,
  getBricks,
  getMetadata,
  types,
} from 'react-bricks/rsc'
import { ClickToEdit } from 'react-bricks/rsc/client'

import { BLOG_SLUG_PREFIX } from '@/react-bricks/pageTypes'
import ErrorNoKeys from '@/components/errorNoKeys'
import ErrorNoPage from '@/components/errorNoPage'
import config from '@/react-bricks/config'
import GAExperimentTracker from '@/components/GAExperimentTracker'

const getData = async (
  slug: any,
  locale: string
): Promise<{
  page: types.Page | null
  errorNoKeys: boolean
  errorPage: boolean
  variantName?: string
  testName?: string
}> => {
  let errorNoKeys: boolean = false
  let errorPage: boolean = false

  if (!config.apiKey) {
    errorNoKeys = true

    return {
      page: null,
      errorNoKeys,
      errorPage,
    }
  }

  let cleanSlug = ''

  if (!slug) {
    cleanSlug = '/'
  } else if (typeof slug === 'string') {
    cleanSlug = slug
  } else {
    cleanSlug = slug.join('/')
  }

  const cookieStore = await cookies()
  const variantNameFromCookie = getAbTestingCookie({
    slug: `${BLOG_SLUG_PREFIX}${cleanSlug}`,
    locale,
    cookieStore,
  })

  const page = await fetchPage({
    slug: `${BLOG_SLUG_PREFIX}${cleanSlug}`,
    language: locale,
    variantName: variantNameFromCookie,
    config,
    fetchOptions: { next: { revalidate: 3 } },
  }).catch(() => {
    errorPage = true
    return null
  })

  return {
    page,
    errorNoKeys,
    errorPage,
    variantName: variantNameFromCookie,
    testName: `${BLOG_SLUG_PREFIX}${cleanSlug}_${locale}`,
  }
}

export async function generateStaticParams({
  params,
}: {
  params: { lang: string }
}) {
  if (!config.apiKey) {
    return []
  }

  const allPages = await fetchPages({
    language: params.lang,
    type: 'blog',
    pageSize: 100,
    sort: '-publishedAt',
    config,
  })

  const pages = allPages
    .map((page) =>
      page.translations.map((translation) => ({
        slug: translation.slug.replace(BLOG_SLUG_PREFIX, '').split('/'),
      }))
    )
    .flat()

  return pages
}

export async function generateMetadata(props: {
  params: Promise<{ lang: string; slug?: string[] }>
}): Promise<Metadata> {
  const params = await props.params
  const { page } = await getData(params.slug?.join('/'), params.lang)
  if (!page?.meta) {
    return {}
  }

  return getMetadata(page)
}

export default async function Page(props: {
  params: Promise<{ lang: string; slug?: string[] }>
}) {
  const params = await props.params
  const { page, errorNoKeys, errorPage, variantName, testName } = await getData(
    params.slug?.join('/'),
    params.lang
  )

  // Clean the received content
  // Removes unknown or not allowed bricks
  const bricks = getBricks()
  const pageOk = page ? cleanPage(page, config.pageTypes || [], bricks) : null

  return (
    <>
      {page?.meta && <JsonLd page={page}></JsonLd>}
      {pageOk && !errorPage && !errorNoKeys && (
        <PageViewer page={pageOk} main />
      )}
      {testName && variantName && (
        <GAExperimentTracker testName={testName} variantName={variantName} />
      )}
      {errorNoKeys && <ErrorNoKeys />}
      {errorPage && <ErrorNoPage />}
      {pageOk && config && (
        <ClickToEdit
          pageId={pageOk?.id}
          language={params.lang}
          editorPath={config.editorPath || '/admin/editor'}
          clickToEditSide={config.clickToEditSide}
        />
      )}
    </>
  )
}
