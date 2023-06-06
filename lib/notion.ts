import { SearchParams, SearchResults } from 'notion-types'
import { NotionAPI } from 'notion-client'

const notion = new NotionAPI({
  apiBaseUrl: process.env.NOTION_API_BASE_URL
})

export async function search(params: SearchParams): Promise<SearchResults> {
  return notion.search(params)
}
