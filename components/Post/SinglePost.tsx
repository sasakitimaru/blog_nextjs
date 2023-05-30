import React from 'react'
import styles from './SinglePost.module.scss'
import Link from 'next/link';

interface SinglePostProps {
    id: string;
    title: string;
    date: string;
    tags: string[];
    description: string;
    slug: string;
}

const SinglePost = ({ id, title, date, tags, description, slug }: SinglePostProps) => {
    return (
        <Link className={styles['post-a']} href={`/posts/${slug}`}>
            <section className={styles['single-post']}>
                <div className={styles['post-container']}>
                    <span className={styles['post-title']}>{title}</span>
                    <div className={styles['post-date']}>{date}</div>
                </div>
                <p className={styles['post-description']}>{description}</p>
                <div className={styles['post-container']}>
                    <div className={styles['post-tags']}>
                        {tags.map((tag, index) => (
                            <span key={index} className={styles['post-tag']}>{tag}</span>
                        ))}
                    </div>
                    <span className={styles['post-readmore']}>Read more</span>
                </div>
            </section>
        </Link>
    )
}

export default SinglePost
