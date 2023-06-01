import React from 'react'
import styles from './article.module.scss'
import { Post } from '../../../../lib/notionAPI';
import { PostProps } from '../../[slug]';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import Link from 'next/link';
import Tags from '../../../../components/Post/components/Tags';

const Article = ({ post, mdString }: PostProps) => {
    return (
        <article className={styles['article-container']}>
            <div className={styles['article-title']}>{post.title}</div>
            <div className={styles['article-date']}>{post.date}</div>
            <Tags tags={post.tags} />
            <ReactMarkdown
                className={styles['article-content']}
                components={{
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                            <SyntaxHighlighter
                                children={String(children).replace(/\n$/, '')}
                                language={match[1]}
                                style={vscDarkPlus}
                                PreTag="div"
                                {...props}
                            />
                        ) : (
                            <code className={styles['article-code']}>{children}</code>
                        )
                    }
                }}
            >
                {mdString.parent}
            </ReactMarkdown>
            <Link href="/">
                <span className={styles['article-back']}>←記事一覧に戻る</span>
            </Link>
        </article>
    )
}

export default Article