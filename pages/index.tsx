import Layout from '../components/Global/Layout'
import { getAllPosts } from '../lib/notionAPI'
import SinglePost from '../components/Post/SinglePost';
import styles from './Home.module.scss'

export const getStaticProps = async () => {
  const allPosts = await getAllPosts();
  return {
    props: {
      allPosts, // allPosts: allPostsと同じ
    },
    revalidate: 60 * 60, // SSGだけど60秒*60ごとに更新する。
  };
};

const Home = ({ allPosts }) => {
  // console.log(allPosts);
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <main className={styles['home-container']}>
        <h1 className={styles['home-h1']}>Hello Next.js 👋</h1>
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
    </Layout>
  )
}

export default Home

