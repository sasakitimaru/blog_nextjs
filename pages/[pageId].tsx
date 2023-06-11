import * as React from 'react'
import { GetStaticProps } from 'next'

import { domain, isDev } from '../lib/config'
import { getSiteMap } from '../lib/get-site-map'
import { resolveNotionPage } from '../lib/resolve-notion-page'
import { PageProps, Params } from '../lib/types'
import Layout from '../components/Global/Layout'
import Article from '../components/Article/Article'
import Link from 'next/link'
import { getAllTags, getSearchedPosts } from '../lib/notionAPI'

export const getStaticProps: GetStaticProps<PageProps, Params> = async (
  context
) => {
  const rawPageId = context.params.pageId as string

  try {
    const response = await resolveNotionPage(domain, rawPageId)
    const post = await getSearchedPosts(rawPageId)
    const allTags = await getAllTags()
    return {
      props: {
        post: post.metadata,
        recordMap: ('recordMap' in response) ? response.recordMap : null,
        allTags,
      },
      revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE)
    }
  } catch (err) {
    console.error('page error', domain, rawPageId, err)

    // we don't want to publish the error version of this page, so
    // let next.js know explicitly that incremental SSG failed
    throw err
  }
}

export async function getStaticPaths() {
  if (isDev) {
    return {
      paths: [],
      fallback: true
    }
  }

  const siteMap = await getSiteMap()


  const staticPaths = {
    paths: Object.keys(siteMap.canonicalPageMap)
      .map(pageId => ({
        params: {
          pageId
        }
      })),
    // paths: [],
    fallback: "blocking"
  }

  return staticPaths
}

export default function NotionDomainDynamicPage(props) {
  return (
    <Layout title={`ささきちDev | ${props.post?.title}`} allTags={props.allTags}>
      <Article post={props.post} recordMap={props.recordMap} />
      {/* <Link className={styles['slug-back']} href="/">
        <div >←記事一覧に戻る</div>
      </Link> */}
    </Layout>
  )
}
