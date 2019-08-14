import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './app';
import * as serviceWorker from './serviceWorker';

import { createStore } from './store/create-store';
import Backendless from 'backendless';

Backendless.initApp('057B4BBA-41FE-52E2-FF04-2ACE042DC700', 'D008C0D7-9985-BB61-FFEA-E48502047900');

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Provider store={createStore()}>
    <App/>
  </Provider>,
  rootElement
);

serviceWorker.unregister();
