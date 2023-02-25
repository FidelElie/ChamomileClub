import { useEffect, useRef } from 'react';
import type { AppProps } from 'next/app';

import './_app.css';

import { ApiProvider, QueryClient } from "@thechamomileclub/api";

function MyApp({ Component, pageProps }: AppProps) {
  const client = useRef(new QueryClient()).current;

  return (
    <ApiProvider client={client}>
      <div className='bg-gray-700 min-h-screen'>
        <Component {...pageProps} />
      </div>
    </ApiProvider>
  )
}

export default MyApp
