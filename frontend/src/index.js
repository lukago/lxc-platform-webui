import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './config/reducers';

import axiosRequestsMiddleware from './config/axiosRequestsMiddleware';
import * as serviceWorker from './serviceWorker';

const store = createStore(
    reducers,
    {},
    compose(applyMiddleware(reduxThunk, axiosRequestsMiddleware)),
);

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
