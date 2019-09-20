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
    //errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
   // errorPolicy: 'all',
  },
}

export const client= new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});







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

