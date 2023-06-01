import React from 'react'
import styles from './SinglePost.module.scss'
import Link from 'next/link';
import { Post } from '../../lib/notionAPI';
import Tags from './components/Tags';

const SinglePost = ({ id, title, date, tags, description, slug }: Post) => {
    return (
        <Link className={styles['post-a']} href={`/posts/${slug}`}>
            <section className={styles['single-post']}>
                <div className={styles['post-container']}>
                    <span className={styles['post-title']}>{title}</span>
                    <div className={styles['post-date']}>{date}</div>
                </div>
                <p className={styles['post-description']}>{description}</p>
                <div className={styles['post-container']}>
                    <Tags tags={tags} />
                    <span className={styles['post-readmore']}>Read more</span>
                </div>
            </section>
        </Link>
    )
}

export default SinglePost
