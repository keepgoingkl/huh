import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// Remove this line:
// import ApolloClient from "apollo-client";
// Replace with:
import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
// Also don't need:
// import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
import { HashRouter } from 'react-router-dom';
import Mutations from "./graphql/mutations";
const { VERIFY_USER } = Mutations;
// Also don't need:
// import { ApolloLink } from "apollo-link";

// Don't need to do this anymore, include uri as param directly to client below
// const httpLink = createHttpLink({
//   uri: "http://localhost:5000/graphql",
//   headers: {
//     // pass our token into the header of each request
//     authorization: localStorage.getItem("auth-token")
//   }
// });

// Set below as onError directly
// const errorLink = onError(({ graphQLErrors }) => {
//     if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
// });

const cache = new InMemoryCache({
    dataIdFromObject: object => object._id || null
});

// Old version of client:
// const client = new ApolloClient({
//   link: ApolloLink.from([errorLink, httpLink]),
//   cache,
//   onError: ({ networkError, graphQLErrors }) => {
//     console.log("graphQLErrors", graphQLErrors);
//     console.log("networkError", networkError);
//   }
// });

// Do this:

// The 'request' param replaces the 'link' param in the above set up
// The function runs every time a request is made, reading from localStorage and setting the header:

const client = new ApolloClient({
    cache,
    uri: "http://localhost:5000/graphql",
    onError: ({ networkError, graphQLErrors }) => {
        console.log("graphQLErrors", graphQLErrors);
        console.log("networkError", networkError);
    },
    request: (operation) => {
        const token = localStorage.getItem('auth-token')
        operation.setContext({
            headers: {
                authorization: token
            }
        })
    }
})

// Everything else can be left the same
const token = localStorage.getItem("auth-token");

cache.writeData({
    data: {
        isLoggedIn: Boolean(localStorage.getItem("auth-token"))
    }
});

if (token) {
    client
        .mutate({ mutation: VERIFY_USER, variables: { token } })
        .then(({ data }) => {
            cache.writeData({
                data: {
                    isLoggedIn: data.verifyUser.loggedIn
                }
            });
        });
}

const Root = () => {
    return (
        <ApolloProvider client={client}>
            <HashRouter>
                <App />
            </HashRouter>
        </ApolloProvider>
    );
};

ReactDOM.render(<Root />, document.getElementById("root"));