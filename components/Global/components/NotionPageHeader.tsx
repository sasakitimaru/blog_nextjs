import * as React from 'react'

import * as types from 'notion-types'
import cs from 'classnames'
import { Breadcrumbs, Header, Search, useNotionContext } from 'react-notion-x'
import { isSearchEnabled, navigationLinks, navigationStyle } from '../../../lib/config'
import styles from './styles.module.css'
import { searchNotion } from '../../../lib/search-notion'

export const NotionPageHeader: React.FC<{
  block: types.CollectionViewPageBlock | types.PageBlock | types.Block
}> = ({ block }) => {
  const { components, mapPageUrl } = useNotionContext()
  // if (navigationStyle === 'default') {
    // return <Header block={block} />
  // }

  return (
    <header className='notion-header'>
      <div className='notion-nav-header'>
        <div className='notion-nav-header-rhs breadcrumbs'>
          {isSearchEnabled && <Search block={block} title={null} />}
        </div>
      </div>
    </header>
  )
}
