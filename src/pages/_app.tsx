import 'tailwindcss/tailwind.css';
import '../globalStyles.scss';

import type {AppProps} from 'next/app';
import {memo} from 'react';
import Follower from '../components/Follower';

const MyApp = memo(({Component, pageProps}: AppProps): JSX.Element => {
  return (
    <>
      <Follower />
      <Component {...pageProps} />
    </>
  );
});

export default MyApp;
