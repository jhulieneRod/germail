import React from 'react'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import { createRoot } from 'react-dom/client';
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import promise from 'redux-promise'
import multi from 'redux-multi'
import thunk from 'redux-thunk'

import AuthOrApp from './main/authOrApp'
import reducers from './main/reducers'
import HomePage from './main/homePage';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = applyMiddleware(multi, thunk, promise)(createStore)(reducers, false);

const container = document.getElementById('app');
const root = createRoot(container);
root.render(    
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    
                    <Route path="*" element={<AuthOrApp/>} />
                    <Route exact path="/" element={<HomePage/>} />
                </Routes>
            </BrowserRouter>
        </Provider>
             
);

serviceWorkerRegistration.unregister();
