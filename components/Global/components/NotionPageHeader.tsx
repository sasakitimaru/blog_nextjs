import * as React from 'react'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import * as types from 'notion-types'
import Search from './Search'
import { isSearchEnabled } from '../../../lib/config'
import styles from './styles.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
export const NotionPageHeader: React.FC<{
  block: types.CollectionViewPageBlock | types.PageBlock | types.Block
  setHeaderHeight?: (height: number) => void
}> = ({ block, setHeaderHeight }) => {
  const headerRef = useRef(null);
  // if (navigationStyle === 'default') {
  // return <Header block={block} />
  // }
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
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
    <header ref={headerRef} className={`${styles['layout-header']} ${headerVisible ? '' : styles['header-hidden']} `}>
      <div className={styles['layout-nav-container']}>
        <div className={styles['layout-nav']}>
          <Link href="/" className={styles['layout-title']}>Home</Link>
          <div className={styles['layout-iconContainer']}>
            <Link href="https://twitter.com/ado_fuku0312">
              <FontAwesomeIcon icon={faTwitter} size="lg" className={styles['layout-icon']} />
            </Link>
            <Link href="https://github.com/sasakitimaru">
              <FontAwesomeIcon icon={faGithub} size="lg" />
            </Link>
            <div className={styles['layout-search']}>
              {isSearchEnabled && <Search block={block} />}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
