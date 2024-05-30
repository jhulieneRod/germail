import React from 'react'
import { createRoot } from 'react-dom/client';
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import promise from 'redux-promise'
import multi from 'redux-multi'
import thunk from 'redux-thunk'

import AuthOrApp from './main/authOrApp'
import reducers from './main/reducers'

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = applyMiddleware(multi, thunk, promise)(createStore)(reducers, false);

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <AuthOrApp />
    </Provider>
);

serviceWorkerRegistration.unregister();
