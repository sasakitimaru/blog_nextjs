import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '../../components/Global/Layout'
import { Post as _Post, getAllPosts, getSinglePost } from '../../lib/notionAPI'
import Article from './components/Article/Article';
import { MdStringObject } from 'notion-to-md/build/types';

export interface PostProps {
  post: _Post;
  mdString: MdStringObject;
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
  const post = response.metadata;
  const mdString = response.mdString;

  return {
    props: {
      post,
      mdString,
    },
    revalidate: 60 * 5, // SSGだけど60秒*60ごとに更新する。
  };
};

const Post = ({ post, mdString }: PostProps) => {
  return (
    <Layout title="Error | Next.js + TypeScript Example">
      <Article post={post} mdString={mdString}/>
    </Layout>
  )
}
export default Post


