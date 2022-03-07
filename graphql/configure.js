import { split, ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { SubscriptionClient, GRAPHQL_WS } from 'subscriptions-transport-ws'

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
            authorization: token ? token : "no token",
        }
    }
});

const wsClient = process.browser && new SubscriptionClient(process.env.API_URI_SUBSCRIPTION, {
    reconnect: true,
    timeout: 30000,
    credentials: "include",
    connectionParams: {
        authorization: localStorage.getItem('token'),
    },
}, GRAPHQL_WS)
const wsLink = process.browser && new WebSocketLink(wsClient)

const httpLink = createHttpLink({
    uri: process.env.API_URI_BASE,
    credentials: "include",
})

const splitLink = process.browser ? split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
) : httpLink;

const link = from([errorLink, splitLink]);

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(link)
})