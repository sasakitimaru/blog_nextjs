import { SearchParams } from 'notion-types'
import { NotionAPI } from 'notion-client'
import axios from 'axios'
import { SearchResults } from '../interfaces'

const notion = new NotionAPI({
  apiBaseUrl: process.env.NOTION_TOKEN,
})

export async function search(params: SearchParams): Promise<SearchResults> {
  // const result = await notion.search(params)
  // console.log('result', result)
  // return notion.search(params)
  const revised_params = {
    query: params.query,
    filter: {
      value: "database",
      property: "object"
    },
    sort: {
      direction: "descending",
      timestamp: "last_edited_time"
    }
  }
  const response = await axios.post('https://api.notion.com/v1/search', params, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
      'Notion-Version': '2022-06-28'
    }
  });
  return response.data
}
