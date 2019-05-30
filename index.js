import React from 'react'
import { Provider as Paper } from 'react-native-paper';
import {AppRegistry} from 'react-native';
import App from './App/';
import {name as appName} from './app.json';

import {applyMiddleware,createStore} from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './App/reducers/rootReducer'
import thunk from 'redux-thunk'

const middleware = applyMiddleware(thunk)

const store = createStore(rootReducer,middleware)


export default function Main(){
    return (
        <Provider store={store}>
            <Paper>
                <App/>
            </Paper>  
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => Main);
