import React, { ReactNode, useEffect, useMemo, createContext, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import styles from './Layout.module.scss'
import { Tag } from '../../lib/notionAPI';
import Tags from '../Post/components/Tags'
import { NotionPageHeader } from './components/NotionPageHeader'
import { ExtendedRecordMap } from '../../lib/types'
import Profile from '../Profile.tsx/Profile'
import Modal from './components/Modal';

type Props = {
  children?: ReactNode
  title?: string
  allTags?: Tag[];
  recordMap?: ExtendedRecordMap;
}
const Collection = () => null;
// dynamic(() =>
// import('react-notion-x/build/third-party/collection').then(
//   (m) => m.Collection
// )
// )

const CollectionRow = () => null;

const Equation = () => null;
// dynamic(() =>
// import('react-notion-x/build/third-party/equation').then((m) => m.Equation)
// )

export const ModalContext = createContext({
  isModalVisible: false,
  setModalVisible: (prev: boolean) => { }
});

const Layout = ({ children, title = 'sasakitiDev', allTags, recordMap }: Props) => {
  const rootPageID = process.env.NOTION_ROOT_PAGE_ID;
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  console.log('rootPageID', rootPageID)
  console.log('rootpagetype', typeof rootPageID)
  useEffect(() => {
    let childElement = document.querySelector('.notion-hidden');
    let parentElement = null;
    if (childElement) {
      parentElement = childElement.parentElement;
      parentElement.style.display = 'none';
    }
  }, [])
  // const block = recordMap.block['53abd034-4cd0-4120-9af4-8506f88b1764'].value;
  const components = useMemo(
    () => ({
      nextLink: Link,
      Collection,
      Equation,
      CollectionRow,
      Modal,
      // pageHeader: NotionPageHeader,
    }),
    []
  );

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
          {isModalVisible && <Modal/>}
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
          <div className={styles['layout-container']}>
            <div className={styles['search-container']}>
              <h2 className={styles['search-title']}>関連記事</h2>
            </div>
            <div className={styles['layout-inputcontainer']}>
              <input className={styles['layout-input']} type="text" placeholder="Serch for article" />
              <button className={styles['layout-button']}>検索</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
