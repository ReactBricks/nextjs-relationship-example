import type { Metadata } from 'next'
import Link from 'next/link'
import { fetchPages, types } from 'react-bricks/rsc'

import PostListItem from '@/components/PostListItem'
import TagListItem from '@/components/TagListItem'
import ErrorNoKeys from '@/components/errorNoKeys'
import config from '@/react-bricks/config'

const getData = async (
  tag: string,
  locale: string
): Promise<{
  tagName: string | null
  pagesByTag: types.PageFromList[] | null
  categories: Array<{ name: string; slug: string }> | null
  errorNoKeys: boolean
  errorPage: boolean
}> => {
  let errorNoKeys: boolean = false
  let errorPage: boolean = false

  if (!config.apiKey) {
    errorNoKeys = true

    return {
      tagName: null,
      pagesByTag: null,
      categories: null,
      errorNoKeys,
      errorPage,
    }
  }

  const categoriesPages = await fetchPages({
    type: 'category',
    pageSize: 1000,
    config,
    fetchOptions: { next: { revalidate: 3 } },
  }).catch(() => {
    errorPage = true
    return null
  })

  const currentCategory = categoriesPages?.find(
    (category) => category.slug === tag
  )

  const pagesByTag =
    currentCategory &&
    (await fetchPages({
      filterBy: {
        category: `${currentCategory.id}_${currentCategory.language}`,
      },
      type: 'blog',
      pageSize: 1000,
      sort: '-publishedAt',
      config,
    }).catch(() => {
      errorPage = true
      return null
    }))

  const categories = categoriesPages
    ?.map((page) => ({ name: page.name, slug: page.slug }))
    .sort()

  return {
    tagName: currentCategory?.name || null,
    pagesByTag: pagesByTag || null,
    categories: categories || null,
    errorNoKeys,
    errorPage,
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

  const categoriesPages = await fetchPages({
    type: 'category',
    pageSize: 1000,
    config,
    fetchOptions: { next: { revalidate: 3 } },
  })

  return categoriesPages.map((category) => category.slug)
}

export async function generateMetadata(props: {
  params: Promise<{ lang: string; tag: string }>
}): Promise<Metadata> {
  const params = await props.params
  return {
    title: params.tag,
    description: params.tag,
  }
}

export default async function Page(props: {
  params: Promise<{ lang: string; tag: string }>
}) {
  const params = await props.params
  const { tagName, pagesByTag, categories, errorNoKeys } = await getData(
    params.tag,
    params.lang
  )

  const tag = decodeURIComponent(params.tag)

  return (
    <>
      {!errorNoKeys && (
        <>
          <div className="bg-white dark:bg-gray-900">
            <div className="max-w-6xl mx-auto px-8 py-16">
              <div className="flex items-center justify-between  text-gray-900 dark:text-white pb-4 mt-10 sm:mt-12 mb-4">
                <h1 className="max-w-2xl text-4xl sm:text-6xl lg:text-4xl font-bold tracking-tight">
                  {tagName} articles
                </h1>

                <Link
                  href="/blog"
                  className="hover:-translate-x-2 transition-transform duration-300"
                >
                  &laquo; Return to blog
                </Link>
              </div>

              <div className="flex flex-wrap items-center">
                {categories?.map((category) => (
                  <TagListItem
                    name={category.name}
                    slug={category.slug}
                    key={category.slug}
                  />
                ))}
              </div>

              <hr className="mt-6 mb-10 dark:border-gray-600" />

              <div className="grid lg:grid-cols-2 xl:grid-cols-3 sm:gap-12">
                {pagesByTag?.map((post) => (
                  <PostListItem
                    key={post.id}
                    title={post.meta.title || ''}
                    href={post.slug}
                    content={post.meta.description || ''}
                    author={post.author}
                    date={post.publishedAt || ''}
                    featuredImg={post.meta.image}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      {errorNoKeys && <ErrorNoKeys />}
    </>
  )
}
