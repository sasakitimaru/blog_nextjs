import { useState } from 'react';
import Layout from '../../../components/Global/Layout';
import { Post, Tag, getAllPosts, getAllTags, getPageDetails } from '../../../lib/notionAPI';
import SinglePost from '../../../components/Post/SinglePost';
import styles from '../../Home.module.scss';
import { GetStaticProps, GetStaticPaths } from 'next';
import PageNation from '../../../components/PageNation/PageNation';
import { MapDetail } from '../../../interfaces';
import { validateTime } from '../..';

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await getAllPosts();
    const paths = response.map((post, index) => ({
        params: { pageNum: index.toString() },
    }));
    return {
        paths,
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const allPosts = await getAllPosts();
    const allTags = await getAllTags();
    const recordMap = await getPageDetails('53abd0344cd041209af48506f88b1764');
    //   console.log(params)
    return {
        props: {
            allPosts, // allPosts: allPostsと同じ
            allTags,
            pageNum: params.pageNum,
            recordMap,
        },
        revalidate:  validateTime
    };
};

interface ArticleListPerPageNumProps extends MapDetail {
    pageNum: string;
}

const ArticleListPerPageNum = ({ allPosts, pageNum, allTags, recordMap }: ArticleListPerPageNumProps) => {
    const pageNumToShow = 8;
    const _pageNum = Number(pageNum);
    const sumPageNum = Math.ceil(allPosts.length / pageNumToShow);
    const fixedPageNum = (_pageNum - 1) * pageNumToShow; // スライスように使う、n記事ごとに表示するため
    const slicedPosts = allPosts.slice(fixedPageNum, fixedPageNum + pageNumToShow);

    return (
        <Layout title="ささきちDev | 記事一覧" allTags={allTags}>
            <main className={styles['home-container']}>
                {slicedPosts.map((post) => (
                    <div
                        className={styles['home-post-container']}
                        key={post.id}
                    >
                        <SinglePost
                            id={post.id}
                            title={post.title}
                            date={post.date}
                            tags={post.tags}
                            description={post.description}
                            slug={post.slug}
                        />
                    </div>
                ))}
            </main>
            {/* <p>
        <Link href="/about">About</Link>
      </p> */}
            <PageNation sumPageNum={sumPageNum} currentPageNum={_pageNum} pagePath='/posts/page/' />
        </Layout>
    )
}

export default ArticleListPerPageNum
