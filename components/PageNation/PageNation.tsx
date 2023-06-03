import React, { useState } from 'react'
import styles from './PageNation.module.scss'
import Link from 'next/link';

interface PageNationProps {
    sumPageNum: number;
    currentPageNum: number;
    pagePath: string;
}
const PageNation = ({ sumPageNum, currentPageNum, pagePath }: PageNationProps) => {
    const pageArray = Array.from(Array(sumPageNum).keys());
    const pageNumToShow = 2; // 現在のページ番号の前後に表示するページ番号の数
    return (
        <div className={styles['pageNation-container']}>
            <div className={`${styles['pageNation-bottun']} ${currentPageNum === 1 && styles['pageNation-designetedButton']}`}>
                <Link href={`${pagePath}1`}>1</Link>
            </div>
            {currentPageNum - pageNumToShow - 1 > 0 && <div className={styles['pageNation-bottun']}>...</div>}
            {pageArray.slice(Math.max(1, currentPageNum - pageNumToShow - 1), Math.min(sumPageNum - 1, currentPageNum + pageNumToShow - 1)).map((pageNum) => (
                <div key={pageNum} className={`${styles['pageNation-bottun']} ${currentPageNum === (pageNum + 1) && styles['pageNation-designetedButton']}`}>
                    {currentPageNum === pageNum + 1 ? (
                        <div>{pageNum + 1}</div>
                    ) : (
                        <Link href={`${pagePath}${pageNum + 1}`}>{pageNum + 1}</Link>
                    )}
                </div>
            ))}
            {currentPageNum + pageNumToShow + 1 < sumPageNum && <div className={styles['pageNation-bottun']}>...</div>}
            {sumPageNum > 1 && <div className={`${styles['pageNation-bottun']} ${currentPageNum === sumPageNum && styles['pageNation-designetedButton']}`}>
                <Link href={`${pagePath}${sumPageNum}`}>{sumPageNum}</Link>
            </div>}
        </div>
    )
}

export default PageNation
