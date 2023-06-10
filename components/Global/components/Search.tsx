import React, { useContext } from 'react'
import { FaSearch } from 'react-icons/fa'
import styles from './styles.module.scss'
import { ModalContext } from '../Layout';

interface SeachProps {
    block: any;
}

const Search = ({ block }: SeachProps) => {
    const { setModalVisible } = useContext(ModalContext)
    return (
        <div>
            <button
                onClick={() => setModalVisible(true)}
                className={`${styles['search-button']} ${styles['header-icon']}`}
            >
                <FaSearch size={20} />
            </button>
        </div>
    )
}

export default Search