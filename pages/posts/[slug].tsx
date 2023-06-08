import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '../../components/Global/Layout'
import { Tag, Post as _Post, getAllPosts, getAllTags, getPageDetails, getSinglePost } from '../../lib/notionAPI'
import Article from '../../components/Article/Article';
import { MdStringObject } from 'notion-to-md/build/types';
import styles from './slug.module.scss'
import Link from 'next/link';
import { ExtendedRecordMap } from 'notion-types';

interface PostProps {
  post: _Post;
  mdString: MdStringObject;
  allTags: Tag[];
  recordMap: ExtendedRecordMap;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await getAllPosts();
  const paths = response.map((post) => ({
    params: { slug: post.slug },
  }));
  return {
    paths,
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const response = await getSinglePost(params.slug);
  const allTags = await getAllTags();
  const post = response.metadata;
  const mdString = response.mdString;
  const recordMap = await getPageDetails(post.id);

  return {
    props: {
      post,
      mdString,
      allTags,
      recordMap,
    },
    revalidate: 60 * 5, // SSGだけど60秒*60ごとに更新する。
  };
};

const Post = ({ post, mdString, allTags, recordMap }: PostProps) => {
  console.log(mdString);
  return (
    <Layout title={post.title} allTags={allTags}>
      <Article post={post} mdString={mdString} recordMap={recordMap}/>
      <Link className={styles['slug-back']} href="/">
        <div >←記事一覧に戻る</div>
      </Link>
    </Layout>
  )
}
export default Post


