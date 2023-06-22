import * as React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '@/config/createEmoticonCache.jsx';
import theme from '@/config/theme';
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
// Client-side cache, shared for the whole session of the user in the browser.
// const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props: any) {
  const { Component, pageProps } = props;
  return (
    <div>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </div>
  );
}