import React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { createHashHistory } from 'history';

import App from './containers/App';
import './App.global.css';

const history = createHashHistory();

render(
  <HashRouter history={history}>
    <App />
  </HashRouter>,
  document.getElementById('root')
);
