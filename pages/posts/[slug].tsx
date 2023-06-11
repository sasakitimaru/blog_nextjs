import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '../../components/Global/Layout'
import { Tag, Post as _Post, getAllPosts, getAllTags, getPageDetails, getSinglePost } from '../../lib/notionAPI'
import Article from '../../components/Article/Article';
import { MdStringObject } from 'notion-to-md/build/types';
import styles from './slug.module.scss'
import Link from 'next/link';
import { ExtendedRecordMap } from 'notion-types';
import { validateTime } from '..';

interface PostProps {
  post: _Post;
  mdString: MdStringObject;
  allTags: Tag[];
  recordMap: ExtendedRecordMap;
  pageId: string;
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
  const pageId = post.id;

  return {
    props: {
      post,
      mdString,
      allTags,
      recordMap,
      pageId,
    },
    revalidate: validateTime
  };
};

const Post = ({ post, mdString, allTags, recordMap, pageId }: PostProps) => {
  return (
    <Layout title={post.title} allTags={allTags} pageId={pageId}>
      <Article post={post} mdString={mdString} recordMap={recordMap} />
      <Link className={styles['slug-back']} href="/">
        <div >←記事一覧に戻る</div>
      </Link>
    </Layout>
  )
}
export default Post


