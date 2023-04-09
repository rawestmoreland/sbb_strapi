import Seo from '../components/Seo';
import Layout from '../components/Layout';
import PostList from '../components/PostList';
import client from '../lib/apollo-client';
import { GET_ALL_THINGS } from '../utils/graphql-queries';
import { fetchLastReading } from '../utils/api-helpers';

export default function Home({ posts, categories, homepage, batchData }) {
  return (
    <Layout batchData={batchData}>
      <Seo seo={homepage.data.attributes.seo} />
      <div className='flex flex-col'>
        <PostList posts={posts} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  // Run API calls in parallel
  const { data } = await client.query({
    query: GET_ALL_THINGS,
  });

  const batchData = await fetchLastReading();

  return {
    props: {
      posts: data.posts.data,
      categories: data.categories,
      homepage: data.homepage,
      batchData,
    },
  };
}
