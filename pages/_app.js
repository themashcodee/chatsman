import '../styles/globals.css'
import { useEffect, createContext, useState } from 'react'
import { initTheme } from '../helpers/theme'
import { users } from "../DB/data";
const currentUserId = 1;

// APOLLO CLIENT
import { ApolloProvider } from '@apollo/client';
import { client } from '../graphql/configure'

// CONFIURING USECONTEXT
export const StoreContext = createContext(null);
const { Provider } = StoreContext

function MyApp({ Component, pageProps }) {

  // SETTNG STATES AND STORE
  const [receiver, setReceiver] = useState(null)
  const [isChatOpen, setIsChatOpen] = useState(false);

  const store = {
    CURRENT_USER: users.find(user => user.id === currentUserId),
    CURRENT_RECEIVER: { receiver, setReceiver },
    IS_CHAT_OPEN: { isChatOpen, setIsChatOpen },
  }

  // SETTING THEME
  useEffect(() => {
    initTheme()
  }, [])

  return <ApolloProvider client={client}>
    <Provider value={store}>
      <Component {...pageProps} />
    </Provider>
  </ApolloProvider>
}

export default MyApp
