import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './store/reducers/index'
import App from './App.js'
import 'antd-mobile/dist/antd-mobile.css'

let store = createStore(reducers)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)

