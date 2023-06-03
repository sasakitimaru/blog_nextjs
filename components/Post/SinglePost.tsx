import React from 'react'
import styles from './SinglePost.module.scss'
import { Post } from '../../lib/notionAPI';
import Tags from './components/Tags';
import { useRouter } from 'next/router';

const SinglePost = ({ id, title, date, tags, description, slug }: Post) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/posts/${slug}`);
    };
    return (
        <div className={styles['post-a']} onClick={handleClick}>
            <section className={styles['single-post']}>
                <div className={styles['post-dateandtitle']}>
                    <div className={styles['post-date']}>{date}</div>
                    <span className={styles['post-title']}>{title}</span>
                </div>
                <div className={styles['post-description']}>{description}</div>
                <div className={styles['post-container']}>
                    <Tags tags={tags} />
                    <span className={styles['post-readmore']}>Read more</span>
                </div>
            </section>
        </div>
    )
}

export default SinglePost
