import '../styles/globals.css'
import { useEffect, createContext, useState } from 'react'
import { initTheme } from '../helpers/theme'
import Head from 'next/head'

import Loading from '../components/Loading'
import { refreshToken } from '../helpers/refreshToken';

import { ApolloProvider } from '@apollo/client';
import { client } from '../graphql/configure'

export const StoreContext = createContext(null);
const { Provider } = StoreContext

function MyApp({ Component, pageProps }) {

  useEffect(initTheme, [])

  const [receiver, setReceiver] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    (async function () {
      const user = await refreshToken()
      if (!user) return setUser(undefined)
      setUser({ ...user, id: user._id })
    })();
  }, [])

  const store = {
    USER: { user, setUser },
    RECEIVER: { receiver, setReceiver },
  }

  if (user === null) return <Loading />

  return <ApolloProvider client={client}>
    <Provider value={store}>
      <>
        <Head>
          <meta name="robots" content="index, follow" />
          <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' />
        </Head>
        <Component {...pageProps} />
      </>
    </Provider>
  </ApolloProvider>
}

export default MyApp
