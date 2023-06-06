import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import styles from './Layout.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { Tag } from '../../lib/notionAPI';
import Tags from '../Post/components/Tags'
import { NotionPageHeader } from './components/NotionPageHeader'
import { NotionRenderer } from 'react-notion-x'
import { ExtendedRecordMap } from '../../lib/types'
import { isSearchEnabled } from '../../lib/config'
import { searchNotion } from '../../lib/search-notion'
import dynamic from 'next/dynamic'

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
const MyBody = () => null;
const Modal = dynamic(
  () =>
    import('react-notion-x/build/third-party/modal').then((m) => {
      m.Modal.setAppElement('.notion-viewport')
      return m.Modal
    }),
  {
    ssr: false
  }
)

const Layout = ({ children, title = 'sasakitiDev', allTags, recordMap }: Props) => {
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const block = recordMap.block['53abd034-4cd0-4120-9af4-8506f88b1764'].value;
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

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.clientHeight);
    }
  }, [headerRef]);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
        setHeaderVisible(currentScrollTop <= 0 || currentScrollTop < lastScrollTop);
        setLastScrollTop(currentScrollTop);
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [lastScrollTop]);
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header ref={headerRef} className={`${styles['layout-header']} ${headerVisible ? '' : styles['header-hidden']}`}>
        <div className={styles['layout-title']}>
          <nav className={styles['layout-nav']}>
            <Link href="/">Home</Link>
            <div className={styles['layout-iconContainer']}>
              <Link href="https://twitter.com/ado_fuku0312">
                <FontAwesomeIcon icon={faTwitter} size="1x" className={styles['layout-icon']} />
              </Link>
              <Link href="https://github.com/sasakitimaru">
                <FontAwesomeIcon icon={faGithub} size="1x" />
              </Link>
            </div>
          </nav>
        </div>
      </header>
      <div style={{ marginTop: headerHeight }}>
        <NotionRenderer
          recordMap={recordMap}
          fullPage={true}
          header={<NotionPageHeader block={block}/>}
          components={components}
          searchNotion={isSearchEnabled ? searchNotion : null}
          disableHeader={true}
          bodyClassName='notion-hidden'
        />
        <div className={styles['layout-children']}>
          {children}
        </div>
      </div>
      <footer>
        <hr />
        <div className={styles['layout-footer']}>
          <div className={styles['layout-container']}>
            <div className={styles['search-container']}>
              <h2 className={styles['search-title']}>記事の検索</h2>
            </div>
            <div className={styles['layout-inputcontainer']}>
              <input className={styles['layout-input']} type="text" placeholder="Serch for article" />
              <button className={styles['layout-button']}>検索</button>
            </div>
          </div>
          <div className={styles['layout-tags']}>
            <div className={styles['layout-container']}>
              <div className={styles['search-container']}>
                <h2 className={styles['search-title']}>タグの検索</h2>
              </div>
              {allTags && <Tags tags={allTags} />}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
