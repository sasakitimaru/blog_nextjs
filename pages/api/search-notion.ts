import { NextApiRequest, NextApiResponse } from 'next'

import * as types from '../../lib/types'
import { search } from '../../lib/notion'
import { getAllPosts, getPageDetails } from '../../lib/notionAPI'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).send({ error: 'method not allowed' })
  }

  const searchParams: types.SearchParams = req.body

  console.log('<<< lambda search-notion', searchParams)
  const response = await search(searchParams)
  // const results = await getPageDetails(response.results[0].id);
  const allPosts = await getAllPosts();
  console.log('>>> lambda search-notion', allPosts)
  const allPostIds = allPosts.map(post => post.id);
  response.results = response.results.filter(result => allPostIds.includes(result.id));
  
  console.log('>>> lambda search-notion', response.results)
  
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, max-age=60, stale-while-revalidate=60'
  )
  res.status(200).json(response)
}
