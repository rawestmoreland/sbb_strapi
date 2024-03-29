import Layout from '../../components/Layout';
import BatchTable from '../../components/BatchTable';
import Head from 'next/head';
import { useRouter } from 'next/router';

const BatchList = ({ batches, page, more }) => {
  const router = useRouter();
  const nextPage = (e) => {
    router.push({
      pathname: '/recipes',
      query: {
        page: parseInt(page) + 1,
      },
    });
  };
  const prevPage = (e) => {
    router.push({
      pathname: '/recipes',
      query: {
        page: parseInt(page) - 1,
      },
    });
  };
  return (
    <Layout>
      <Head>
        <link rel='canonical' href='https://www.smallbatchbru.com/recipes' />
      </Head>
      <BatchTable
        batches={batches}
        col_labels={['Batch Number', 'Recipe Name', 'Brew Date', 'Recipe Link']}
      />
      <div className='flex items-center justify-center w-full mt-4'>
        <button
          className={`${page == 1 ? 'hidden' : 'm-2'}`}
          onClick={() => prevPage()}
        >
          <span className='text-4xl'>⬅️</span>
        </button>
        <button
          className={`${!more ? 'hidden' : 'm-2'}`}
          onClick={() => nextPage()}
        >
          <span className='text-4xl'>➡️</span>
        </button>
      </div>
    </Layout>
  );
};

export const getServerSideProps = async ({ query }) => {
  const page = query.page || 1;
  const offset = page * 10 - 10;
  const limit = 10;

  const fetchUrl = process.env.NEXT_PUBLIC_SBB_URL || 'http://localhost:3000';

  const res = await fetch(`${fetchUrl}/api/batches`, {
    method: 'POST',
    body: JSON.stringify({
      page,
      offset,
      limit,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  const batches = await res.json();

  return {
    props: {
      batches: batches.data,
      more: batches.more,
      page,
    },
  };
};

export default BatchList;
