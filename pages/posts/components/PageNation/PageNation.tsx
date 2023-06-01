import React, { useState } from 'react'
import styles from './PageNation.module.scss'

const PageNation = () => {
    const sumPageNum = 7;
    const currentPageNum = 2; // This should start from 1 as the page number is 1-indexed
    const pageArray = Array.from(Array(sumPageNum).keys());
    const pageNumToShow = 3; // Number of page number to show before and after current page number

    return (
        <div className={styles['pageNation-container']}>
            {currentPageNum > 1 && <div className={styles['pageNation-bottun']}><a href={`/posts/page/1`}>1</a></div>}
            {currentPageNum - pageNumToShow - 1 > 0 && <div className={styles['pageNation-bottun']}>...</div>}
            {pageArray.slice(Math.max(1, currentPageNum - pageNumToShow - 1), Math.min(sumPageNum - 1, currentPageNum + pageNumToShow - 1)).map((pageNum) => (
                <div key={pageNum} className={styles['pageNation-bottun']}>
                    {currentPageNum === pageNum + 1 ? (
                        <div>{pageNum + 1}</div>
                    ) : (
                        <a href={`/posts/page/${pageNum + 1}`}>{pageNum + 1}</a>
                    )}
                </div>
            ))}
            {currentPageNum + pageNumToShow + 1 < sumPageNum && <div className={styles['pageNation-bottun']}>...</div>}
            {currentPageNum < sumPageNum && <div className={styles['pageNation-bottun']}><a href={`/posts/page/${sumPageNum}`}>{sumPageNum}</a></div>}
        </div>
    )
}

export default PageNation
