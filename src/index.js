import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import { amber, teal } from '@material-ui/core/colors';
import { createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './store/reducers/rootReducer';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Provider } from 'react-redux'
import { setContext } from 'apollo-link-context';
import { onError } from "apollo-link-error";
import history from "./history.js";



const authLink = setContext((_, {
  headers
}) => {
  const token = localStorage.getItem('token');
   return {
    headers: {
      ...headers,
     ["x-token"]: token ? token: undefined 
    }
  };
});
const httpLink = createHttpLink({
  uri: 'https://isas-gateway.herokuapp.com/graphql'
 //uri: 'http://localhost:8000/graphql'
});

const link = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map((err) => {
      console.log(err)
      console.log(err, (err.extensions.response.body.errors[0]).extensions.code);
      switch ((err.extensions.response.body.errors[0]).extensions.code){
        case 'UNAUTHENTICATED':
        //localStorage.removeItem('token');
        history.push('/signin')
        break;
        default:
        break
      }
      console.log(
        `[GraphQL error]: Message: ${err.message}, Location: ${err.locations}, Path: ${err.path}`
      )
    })
      
  if (networkError) console.log(`[Network error]: ${networkError}`);
});
/*
export const client = (async (authLink, httpLink)=>{
  return await new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  })
})(authLink, httpLink);
*/
const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
  mutate: {
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
  },
}

export const client= new ApolloClient({
  link: (authLink.concat(link)).concat(httpLink),
  cache: new InMemoryCache(),
  /*onError: ({ graphQLErrors, networkError, operation, forward }) => {
    console.log(graphQLErrors, networkError, operation, forward)
       if (graphQLErrors) {
      for (let err of graphQLErrors) {
        // handle errors differently based on its error code
        switch (err.extensions.code) {
          case 'UNAUTHENTICATED':
          console.log('unauthenticalted')
          break
            // old token has expired throwing AuthenticationError,
            // one way to handle is to obtain a new token and 
            // add it to the operation context
            //const headers = operation.getContext().headers
            //operation.setContext({
            //  headers: {
            //    ...headers,
            //    authorization: getNewToken(),
            //  },
            //});
            // Now, pass the modified operation to the next link
            // in the chain. This effectively intercepts the old
            // failed request, and retries it with a new token
            //return forward(operation);
          
          // handle other errors
          case 'ANOTHER_ERROR_CODE':
          break;            
         default:
         break
        }
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
    }
  }
  },*/

  defaultOptions: defaultOptions
});
console.log(client);






const store = createStore(
    combineReducers({
      rootReducer: rootReducer,
     
    }),
    {}, // initial state
    compose(
        applyMiddleware(thunk),
        // If you are using the devToolsExtension, you can add it here also
        (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    )
  );

const theme = createMuiTheme({
    palette: {
        primary: {
            light: amber[300],
            main: amber[500],
            dark: amber[700]
        },
        secondary: {
            main: "#2b679b"
        },
        Accent: {
            main: teal[400]
        },
        type: 'dark'
    }
});

ReactDOM.render(
<ApolloProvider  client={client}>
<Provider store = {store}>
<MuiThemeProvider theme={theme}>
      <App />
</MuiThemeProvider>
</Provider>
</ApolloProvider> , document.getElementById('root'));

