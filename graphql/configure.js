import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        console.log('graphQLErrors', graphQLErrors);
    }
    if (networkError) {
        console.log('networkError', networkError);
    }
});

const authLink = setContext((_, { headers }) => {
    const token = sessionStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token ? token : "no token here",
        }
    }
});


const httpLink = createHttpLink({
    uri: process.env.API_URI_BASE,
    credentials: "include",
})
const link = from([errorLink, httpLink]);

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(link)
})