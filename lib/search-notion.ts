// import ky from 'ky'
import ExpiryMap from 'expiry-map'
import fetch from 'isomorphic-unfetch'
import pMemoize from 'p-memoize'

import * as types from './types'
import { api } from './config'
import { SearchResults } from '../interfaces'

export const searchNotion = pMemoize(searchNotionImpl, {
  cacheKey: (args) => args[0]?.query,
  cache: new ExpiryMap(10000)
})

async function searchNotionImpl(
  params: types.SearchParams
): Promise<SearchResults> {
  params = { 
    query: params.query, 
    ancestorId: null,
  }
  return fetch(api.searchNotion, {
    method: 'POST',
    body: JSON.stringify({query: params.query}),
    headers: {
      'content-type': 'application/json',
      'Authorization':  process.env.NOTION_TOKEN 
    }
  })
    .then((res) => {
      if (res.ok) {
        return res
      }
      console.log('res',res)
      // convert non-2xx HTTP responses into errors
      const error: any = new Error(res.statusText)
      error.response = res
      return Promise.reject(error)
    })
    .then((res) => res.json())

  // return ky
  //   .post(api.searchNotion, {
  //     json: params
  //   })
  //   .json()
}
