import React from 'react'
import styles from './article.module.scss'
import { Post } from '../../lib/notionAPI';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { FacebookShareButton, TwitterShareButton, InstapaperShareButton, LineShareButton } from 'react-share';
import Tags from '../Post/components/Tags';
import { MdStringObject } from 'notion-to-md/build/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLine, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useRouter } from 'next/router';

interface ArticleProps {
    post: Post;
    mdString: MdStringObject;
}

const Article = ({ post, mdString }: ArticleProps) => {
    const router = useRouter();
    const currentURL = 'https://www.kurimatsugpt.com' + router.asPath;
    return (
        <article className={styles['article-container']}>
            <div className={styles['article-title']}>{post.title}</div>
            <div className={styles['article-date']}>{post.date}</div>
            <div className={styles['article-postcontainer']}>
                <Tags tags={post.tags} />
            </div>
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
            <div className={styles['article-share-title']}>Share</div>
            <div className={styles['article-share-container']}>
                <TwitterShareButton url={currentURL} title={post.title}>
                    <div className={styles['article-share']}>
                        <FontAwesomeIcon icon={faTwitter} size='2x' color="#1DA1F2" />
                    </div>
                </TwitterShareButton>
                <LineShareButton url={currentURL} title={post.title}>
                    <div className={styles['article-share']}>
                        <FontAwesomeIcon icon={faLine} size='2x' color="#00c300" />
                    </div>
                </LineShareButton>
                <FacebookShareButton url={currentURL} quote={""}>
                    <div className={styles['article-share']}>
                        <FontAwesomeIcon icon={faFacebook} size='2x' color="#1877F2" />
                    </div>
                </FacebookShareButton>
                <InstapaperShareButton url={currentURL} title={post.title}>
                    <div className={styles['article-share']}>
                        <FontAwesomeIcon icon={faInstagram} size='2x' color="#C13584" />
                    </div>
                </InstapaperShareButton>
            </div>
        </article>
    )
}

export default Article