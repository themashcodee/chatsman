import '../styles/globals.css'
import { useEffect, createContext, useState } from 'react'
import { initTheme } from '../helpers/theme'
import Head from 'next/head'

import Loading from '../components/Loading'

// TOKEN RELATED
import { refreshToken } from '../helpers/refreshToken';

// APOLLO CLIENT
import { ApolloProvider } from '@apollo/client';
import { client } from '../graphql/configure'

// CONFIURING USECONTEXT
export const StoreContext = createContext(null);
const { Provider } = StoreContext

function MyApp({ Component, pageProps }) {

  // SETTNG STATES AND STORE
  const [receiver, setReceiver] = useState(null)
  const [user, setUser] = useState(null)

  // SETTING TEMP ACCESS TOKEN AND USER
  useEffect(() => {
    async function getCurrentUser() {
      const user = await refreshToken()
      if (!user) return setUser(undefined)
      setUser(user)
    }
    getCurrentUser()
  }, [])

  // Storing values in STORE
  const store = {
    USER: { user, setUser },
    RECEIVER: { receiver, setReceiver },
  }

  // SETTING THEME
  useEffect(() => {
    initTheme()
  }, [])

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
