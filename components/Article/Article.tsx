import React, { useState } from 'react'
import styles from './article.module.scss'
import Link from 'next/link';
import { Post } from '../../lib/notionAPI';
import { FacebookShareButton, TwitterShareButton, InstapaperShareButton, LineShareButton } from 'react-share';
import Tags from '../Post/components/Tags';
import { MdStringObject } from 'notion-to-md/build/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLine, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useRouter } from 'next/router';
import { NotionRenderer } from 'react-notion-x';
import { ExtendedRecordMap } from 'notion-types';
import dynamic from 'next/dynamic';
import TweetEmbed from 'react-tweet-embed'
import { formatDate } from 'notion-utils';
import { Code } from 'react-notion-x/build/third-party/code';
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-js-templates.js'
import 'prismjs/themes/prism-okaidia.css'
import { NotionPageHeader } from '../Global/components/NotionPageHeader';
import { isSearchEnabled, navigationLinks } from '../../lib/config';
import { searchNotion } from '../../lib/search-notion';

interface ArticleProps {
    post: Post;
    mdString?: MdStringObject;
    recordMap: ExtendedRecordMap;
}

const Collection = dynamic(() =>
    import('react-notion-x/build/third-party/collection').then(
        (m) => m.Collection
    )
)
const Equation = dynamic(() =>
    import('react-notion-x/build/third-party/equation').then((m) => m.Equation)
)
const Pdf = dynamic(
    () => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf),
    {
        ssr: false
    }
)
const Modal = dynamic(
    () =>
        import('react-notion-x/build/third-party/modal').then((m) => {
            m.Modal.setAppElement('.notion-viewport')
            return m.Modal
        }),
    {
        ssr: false
    }
)

const Tweet = ({ id }: { id: string }) => {
    return <TweetEmbed tweetId={id} />
}

const propertyLastEditedTimeValue = (
    { block, pageHeader },
    defaultFn: () => React.ReactNode
) => {
    if (pageHeader && block?.last_edited_time) {
        return `Last updated ${formatDate(block?.last_edited_time, {
            month: 'long'
        })}`
    }

    return defaultFn()
}

const propertyDateValue = (
    { data, schema, pageHeader },
    defaultFn: () => React.ReactNode
) => {
    if (pageHeader && schema?.name?.toLowerCase() === 'published') {
        const publishDate = data?.[0]?.[1]?.[0]?.[1]?.start_date

        if (publishDate) {
            return `${formatDate(publishDate, {
                month: 'long'
            })}`
        }
    }

    return defaultFn()
}

const propertyTextValue = (
    { schema, pageHeader },
    defaultFn: () => React.ReactNode
) => {
    if (pageHeader && schema?.name?.toLowerCase() === 'author') {
        return <b>{defaultFn()}</b>
    }

    return defaultFn()
}
const Article = ({ post, mdString, recordMap }: ArticleProps) => {
    const router = useRouter();
    const [headerHeight, setHeaderHeight] = useState(0);
    const currentURL = 'https://www.kurimatsugpt.com' + router.asPath;
    const components = React.useMemo(
        () => ({
            nextLink: Link,
            Code,
            Collection,
            Equation,
            Pdf,
            Modal,
            Tweet,
            header: NotionPageHeader,
            propertyLastEditedTimeValue,
            propertyTextValue,
            propertyDateValue
        }),
        []
    )
    // const block = recordMap?.block?.[keys[0]]?.value
    return (
        <article className={styles['article-container']} style={{marginTop: headerHeight}}>
            <div className={styles['article-tag']}>
                {post && <Tags tags={post.tags} />}
            </div>
            {/* <div className={styles['article-notion-container']}> */}
            <NotionRenderer
                recordMap={recordMap}
                fullPage={true}
                darkMode={false}
                components={components}
                disableHeader={true}
            />
            {/* </div> */}
            <div className={styles['article-share-title']}>Share</div>
            <div className={styles['article-share-container']}>
                <TwitterShareButton url={currentURL} >
                    <div className={styles['article-share']}>
                        <FontAwesomeIcon icon={faTwitter} size='2x' color="#1DA1F2" />
                    </div>
                </TwitterShareButton>
                <LineShareButton url={currentURL} >
                    <div className={styles['article-share']}>
                        <FontAwesomeIcon icon={faLine} size='2x' color="#00c300" />
                    </div>
                </LineShareButton>
                <FacebookShareButton url={currentURL} quote={""}>
                    <div className={styles['article-share']}>
                        <FontAwesomeIcon icon={faFacebook} size='2x' color="#1877F2" />
                    </div>
                </FacebookShareButton>
                <InstapaperShareButton url={currentURL} >
                    <div className={styles['article-share']}>
                        <FontAwesomeIcon icon={faInstagram} size='2x' color="#C13584" />
                    </div>
                </InstapaperShareButton>
            </div>
        </article>
    )
}

export default Article