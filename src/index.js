import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import { amber, teal } from '@material-ui/core/colors'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './store/reducers/rootReducer'
import { reduxFirestore, getFirestore } from 'redux-firestore'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import fbConfig from './config/fbConfig'


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


const store = createStore(rootReducer, compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(fbConfig),
    reactReduxFirebase(fbConfig, { useFirestoreForProfile: true, userProfile: 'users', attachAuthIsReady: true }),
)
);

store.firebaseAuthIsReady.then(() => {
ReactDOM.render(<Provider store={store}><MuiThemeProvider theme={theme}><App /></MuiThemeProvider></Provider>, document.getElementById('root'));
})
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

