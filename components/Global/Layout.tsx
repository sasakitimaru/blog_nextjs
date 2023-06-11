import React, { ReactNode, useEffect, useMemo, createContext, useState, useRef } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import styles from './Layout.module.scss'
import { Tag } from '../../lib/notionAPI';
import Tags from '../Post/components/Tags'
import { NotionPageHeader } from './components/NotionPageHeader'
import { ExtendedRecordMap } from '../../lib/types'
import Profile from '../Profile.tsx/Profile'
import Modal from './components/Modal';
import Comment from './components/Comment';

type Props = {
  children?: ReactNode
  title?: string
  allTags?: Tag[];
  pageId?: string;
}

export const ModalContext = createContext({
  isModalVisible: false,
  setModalVisible: (prev: boolean) => { }
});

const Layout = ({ children, title = 'sasakitiDev', allTags, pageId }: Props) => {
  // const rootPageID = process.env.NOTION_ROOT_PAGE_ID;
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    let childElement = document.querySelector('.notion-hidden');
    let parentElement = null;
    if (childElement) {
      parentElement = childElement.parentElement;
      parentElement.style.display = 'none';
    }
  }, [])

  return (
    <div style={{ marginTop: headerHeight }}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles['layout-container']}>
        <ModalContext.Provider value={{ isModalVisible, setModalVisible }}>
          <NotionPageHeader setHeaderHeight={setHeaderHeight} block={null} />
          {isModalVisible && <Modal />}
        </ModalContext.Provider>
        <main className={styles['layout-main']}>
          <div className={styles['layout-children']}>
            {children}
          </div>
          <Profile />
        </main>
      </div>
      <footer>
        <hr />
        <div className={styles['layout-footer']}>
          <div className={styles['layout-tags']}>
            <div className={styles['layout-container']}>
              <div className={styles['search-container']}>
                <h2 className={styles['search-title']}>タグの検索</h2>
              </div>
              {allTags && <Tags tags={allTags} />}
            </div>
          </div>
          {pageId && pageId.length > 0 && <Comment pageId={pageId}/>}
        </div>
      </footer>
    </div>
  )
}

export default Layout
