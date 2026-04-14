import type { Metadata } from 'next'
import { fetchPages, fetchTags, types } from 'react-bricks/rsc'

import PostListItem from '@/components/PostListItem'
import TagListItem from '@/components/TagListItem'
import ErrorNoKeys from '@/components/errorNoKeys'
import config from '@/react-bricks/config'

const getData = async (
  locale: string
): Promise<{
  posts: types.PageFromList[] | null
  categories: Array<{ name: string; slug: string }> | null
  errorNoKeys: boolean
  errorPage: boolean
}> => {
  let errorNoKeys: boolean = false
  let errorPage: boolean = false

  if (!config.apiKey) {
    errorNoKeys = true

    return {
      posts: null,
      categories: null,
      errorNoKeys,
      errorPage,
    }
  }

  const [categoriesPages, posts] = await Promise.all([
    fetchPages({
      type: 'category',
      pageSize: 1000,
      config,
      fetchOptions: { next: { revalidate: 3 } },
    }).catch(() => {
      errorPage = true
      return null
    }),
    fetchPages({
      type: 'blog',
      pageSize: 1000,
      sort: '-publishedAt',
      fetchExternalData: true,
      config,
      fetchOptions: { next: { revalidate: 3 } },
    }).catch(() => {
      errorPage = true
      return null
    }),
  ])

  const categories = categoriesPages
    ?.map((page) => ({ name: page.name, slug: page.slug }))
    .sort()

  return {
    posts,
    categories: categories || null,
    errorNoKeys,
    errorPage,
  }
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Post List',
    description: 'React Bricks blog starter',
  }
}

export default async function Page(props: {
  params: Promise<{ lang: string }>
}) {
  const params = await props.params
  const { categories, posts, errorNoKeys } = await getData(params.lang)

  return (
    <>
      {!errorNoKeys && (
        <>
          <div className="bg-white dark:bg-gray-900">
            <div className="max-w-6xl mx-auto px-8 py-16">
              <h1 className="max-w-2xl text-4xl sm:text-6xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-white pb-4 mt-10 sm:mt-12 mb-4">
                Our latest articles
              </h1>

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
                {posts?.map((post) => {
                  return (
                    <PostListItem
                      key={post.id}
                      title={post.meta.title || ''}
                      href={post.slug}
                      content={post.meta.description || ''}
                      author={post.author}
                      date={post.publishedAt || ''}
                      featuredImg={post.meta.image}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </>
      )}
      {errorNoKeys && <ErrorNoKeys />}
    </>
  )
}
