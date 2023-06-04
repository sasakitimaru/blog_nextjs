import React, { useEffect } from 'react'
import styles from './article.module.scss'
import Link from 'next/link';
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
import { NotionRenderer } from 'react-notion-x';
import { ExtendedRecordMap } from 'notion-types';
import dynamic from 'next/dynamic';
import TweetEmbed from 'react-tweet-embed'
import { formatDate } from 'notion-utils';
import { Code } from 'react-notion-x/build/third-party/code';
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-js-templates.js'
import 'prismjs/themes/prism-okaidia.css'

interface ArticleProps {
    post: Post;
    mdString: MdStringObject;
    recordMap: ExtendedRecordMap;
}

// const Code = dynamic(() =>
//     import('react-notion-x/build/third-party/code').then(async (m) => {
//         // add / remove any prism syntaxes here
//         await Promise.all([
//             import('prismjs/components/prism-javascript.js'),
//             import('prismjs/components/prism-markup-templating.js'),
//             import('prismjs/components/prism-markup.js'),
//             import('prismjs/components/prism-bash.js'),
//             import('prismjs/components/prism-c.js'),
//             import('prismjs/components/prism-cpp.js'),
//             import('prismjs/components/prism-csharp.js'),
//             import('prismjs/components/prism-docker.js'),
//             import('prismjs/components/prism-java.js'),
//             import('prismjs/components/prism-js-templates.js'),
//             import('prismjs/components/prism-coffeescript.js'),
//             import('prismjs/components/prism-diff.js'),
//             import('prismjs/components/prism-git.js'),
//             import('prismjs/components/prism-go.js'),
//             import('prismjs/components/prism-graphql.js'),
//             import('prismjs/components/prism-handlebars.js'),
//             import('prismjs/components/prism-less.js'),
//             import('prismjs/components/prism-makefile.js'),
//             import('prismjs/components/prism-markdown.js'),
//             import('prismjs/components/prism-objectivec.js'),
//             import('prismjs/components/prism-ocaml.js'),
//             import('prismjs/components/prism-python.js'),
//             import('prismjs/components/prism-reason.js'),
//             import('prismjs/components/prism-rust.js'),
//             import('prismjs/components/prism-sass.js'),
//             import('prismjs/components/prism-scss.js'),
//             import('prismjs/components/prism-solidity.js'),
//             import('prismjs/components/prism-sql.js'),
//             import('prismjs/components/prism-stylus.js'),
//             import('prismjs/components/prism-swift.js'),
//             import('prismjs/components/prism-wasm.js'),
//             import('prismjs/components/prism-yaml.js')
//         ])
//         return m.Code
//     })
// )

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
            propertyLastEditedTimeValue,
            propertyTextValue,
            propertyDateValue
        }),
        []
    )
    return (
        <article className={styles['article-container']}>
            <div className={styles['article-tag']}>
                <Tags tags={post.tags} />
            </div>
            {/* <div className={styles['article-notion-container']}> */}
                <NotionRenderer recordMap={recordMap} fullPage={true} darkMode={false} components={components} />
            {/* </div> */}
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