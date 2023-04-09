import App from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { createContext, useEffect } from 'react';
import { fetchAPI, getStrapiMedia } from '../utils/api-helpers';
import * as gtag from '../lib/gtag';
import './global.css';

// Store Strapi Global object in context
export const GlobalContext = createContext({});
function MyApp({ Component, pageProps }) {
  const { global } = pageProps;
  const { favicon } = global.attributes;
  const router = useRouter();

  /**
   * Google analytics things
   */
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Head>
        <link
          rel='shortcut icon'
          href={getStrapiMedia(favicon.data.attributes.url)}
        />
      </Head>
      <GlobalContext.Provider value={global.attributes}>
        <Component {...pageProps} />
      </GlobalContext.Provider>
    </>
  );
}

MyApp.getInitialProps = async (ctx) => {
  const appProps = await App.getInitialProps(ctx);
  const global = await fetchAPI(
    '/global',
    {},
    {
      populate: {
        favicon: { populate: '*' },
        metadata: { populate: '*' },
        navbar: { populate: '*' },
      },
    }
  );
  return { ...appProps, pageProps: { global: global.data } };
};

export default MyApp;
