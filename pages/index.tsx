import { useState } from 'react';
import Layout from '../components/Global/Layout'
import { Post, Tag, getAllPosts, getAllTags, getPageDetails } from '../lib/notionAPI'
import SinglePost from '../components/Post/SinglePost';
import styles from './Home.module.scss'
import { GetStaticProps } from 'next';
import PageNation from '../components/PageNation/PageNation';
import { ExtendedRecordMap } from '../lib/types';
import { MapDetail } from '../interfaces';

export const getStaticProps: GetStaticProps = async (pageNum) => {
  const allPosts = await getAllPosts();
  const allTags = await getAllTags();
  // const recordMap = await getPageDetails(process.env.NOTION_DATABASE_ID);
  const recordMap = await getPageDetails('53abd0344cd041209af48506f88b1764');
  return {
    props: {
      allPosts, // allPosts: allPostsと同じ
      allTags,
      recordMap,
    },
    revalidate: 60 * 5, // SSGだけど60秒*60ごとに更新する。
  };
};

const Home = ({ allPosts,allTags,recordMap }: MapDetail) => {
  const sumPageNum = Math.ceil(allPosts.length / 8);
  return (
    <Layout title="ささきちDev" allTags={allTags} recordMap={recordMap}>
      <main className={styles['home-container']}>
        <h1 className={styles['home-h1']}>Hello Developers 👋</h1>
        {allPosts.map((post) => (
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
      <PageNation sumPageNum={sumPageNum} currentPageNum={1} pagePath='/posts/page/' />
    </Layout>
  )
}

export default Home

