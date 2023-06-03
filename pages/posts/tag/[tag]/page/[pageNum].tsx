import { useState } from 'react';
import Layout from '../../../../../components/Global/Layout';
import { Post, Tag, getAllPosts, getAllTags } from '../../../../../lib/notionAPI';
import SinglePost from '../../../../../components/Post/SinglePost';
import styles from '../../../../Home.module.scss';
import { GetStaticProps, GetStaticPaths } from 'next';
import PageNation from '../../../../../components/PageNation/PageNation';
import Tags from '../../../../../components/Post/components/Tags';

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await getAllPosts();
    const allTags = await getAllTags();
    const paths = [];

    allTags.map((tag) => {
        const relatedPostsCount = response.filter((post) => post.tags.some((t) => t.name = tag )).length;

        for (let i = 0; i < relatedPostsCount; i++) {
            paths.push({
                params: { tag: String(tag), pageNum: String(i) },
            });
        }
    });
    return {
        paths,
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const allPosts = await getAllPosts();
    const allTags = await getAllTags();
    //   console.log(params)
    return {
        props: {
            allPosts, // allPosts: allPostsと同じ
            tag: params.tag,
            pageNum: params.pageNum,
            allTags,
        },
        revalidate: 60 * 5, // SSGだけど60秒*60ごとに更新する。
    };
};

interface ArticleListPerPageNumProps {
    allPosts: Post[];
    tag: string;
    pageNum: string;
    allTags: Tag[];
}

const ArticleListPerPageNum = ({ allPosts, tag, pageNum, allTags }: ArticleListPerPageNumProps) => {
    const pageNumToShow = 8;
    const filterPostByName = (tags: Tag[]) => {
        return tags.some((_tag) => _tag.name === tag)
    }
    const findDesignatedTag = () => {
        return allTags.filter((_tag) => _tag.name === tag)
    }
    const _pageNum = Number(pageNum);
    const fixedPageNum = (_pageNum - 1) * pageNumToShow; // スライスように使う、n記事ごとに表示するため
    const filterdPosts = allPosts.filter((post) => filterPostByName(post.tags))
    const slicedPosts = filterdPosts.slice(fixedPageNum, fixedPageNum + pageNumToShow);
    const sumPageNum = Math.ceil(filterdPosts.length / pageNumToShow);

    return (
        <Layout title={`ささきちDev | タグ:${tag}`} allTags={allTags}>
            <main className={styles['home-container']}>
                <div className={styles['home-filterdtagcontainer']}>
                    <p>{`検索タグ：`}</p>
                    <Tags tags={findDesignatedTag()} />
                </div>
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
            <PageNation sumPageNum={sumPageNum} currentPageNum={_pageNum} pagePath={`/posts/tag/${tag}/page/`}/>
        </Layout>
    )
}

export default ArticleListPerPageNum
