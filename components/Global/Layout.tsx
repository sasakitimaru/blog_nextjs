import React, { ReactNode, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import styles from './Layout.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => {
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.clientHeight);
    }
  }, [headerRef]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
      setHeaderVisible(currentScrollTop <= 0 || currentScrollTop < lastScrollTop);
      setLastScrollTop(currentScrollTop);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
              <Link href="https://twitter.com/yourusername">
                <FontAwesomeIcon icon={faTwitter} size="1x" className={styles['layout-icon']} />
              </Link>
              <Link href="https://github.com/yourusername">
                <FontAwesomeIcon icon={faGithub} size="1x" />
              </Link>
            </div>
          </nav>
        </div>
      </header>
      <div style={{ marginTop: headerHeight }}>
        <div className={styles['layout-children']}>
          {children}
        </div>
      </div>
      <footer>
        <hr />
        <span>I'm here to stay (Footer)</span>
      </footer>
    </div>
  )
}

export default Layout
