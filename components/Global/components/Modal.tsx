import React, { useState, useContext, useEffect, useRef } from 'react'
import { FaSpinner, FaSearch, FaWindowClose } from 'react-icons/fa'
import styles from './styles.module.scss'
import { ModalContext } from '../Layout'
import { searchNotion } from '../../../lib/search-notion'
import { SearchResults } from '../../../interfaces'
import Link from 'next/link'

const Modal = () => {
    const [query, setQuery] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isWriting, setIsWriting] = useState(false)
    const [searchResults, setSearchResults] = useState<SearchResults>(null)
    const { setModalVisible } = useContext(ModalContext)

    const inputRef = useRef(null)
    const searchTimeout = useRef(null)

    useEffect(() => {
        //debounce search
        if (searchTimeout.current) clearTimeout(searchTimeout.current)

        if (query.length < 2) return

        searchTimeout.current = setTimeout(async () => {
            setIsLoading(true)
            const params = { query, ancestorId: null }
            const response = await searchNotion(params)
            console.log('query:', query, ' response:', response.results.length)
            setSearchResults(response)
            setIsLoading(false)
        }, 500)
    }, [query])

    useEffect(() => {
        return () => setModalVisible(false)
    }, [])

    return (
        <div onClick={() => setModalVisible(false)} className={styles['modal-container']}>
            <div className={styles['search-container']} onClick={(e) => e.stopPropagation()}>
                <div className={styles['search-container-header']}>
                    <div className={styles['search-container-input']}>
                        {isLoading ?
                            <FaSpinner className={styles['spinner-icon']} color='black' />
                            :
                            <FaSearch className={styles['search-icon']} color='black' />
                        }
                        <input
                            ref={inputRef}
                            className={styles['search-input']}
                            type="text"
                            placeholder="Search"
                            onChange={(e) => !isWriting && setQuery(e.target.value)}
                            onCompositionStart={() => setIsWriting(true)}
                            onCompositionEnd={(e: any) => {
                                setIsWriting(false)
                                setQuery(e.target.value)
                            }}
                        />
                    </div>
                    <button className={styles['search-button']} onClick={() => inputRef && (inputRef.current.value = '')}>
                        <FaWindowClose className={styles['close-icon']} />
                    </button>
                </div>
            </div>
            { searchResults && searchResults.results.length > 0 &&
                <div className={styles['result-container']} onClick={(e) => e.stopPropagation()}>
                    {
                        searchResults.results.map((result, index) => {
                            return (
                                <Link href={`/posts/${result.properties.Slug.rich_text[0].text.content}`} key={index} >
                                <div className={styles['result-item']} key={index}>
                                    <span key={index} className={styles['result-title']}>{result.properties.Name.title[0].text.content}</span>
                                    <span className={styles['result-tag-container']}>タグ：{result.properties.Tags.multi_select.map((tag, index) => {
                                        return (
                                            <span className={styles['result-tag']} key={index}>{tag.name}</span>
                                        )
                                    }
                                    )}</span>
                                </div>
                                </Link>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}

export default Modal
