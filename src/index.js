import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import App from './pages/demo/Life'
// import App from './admin'
import IRouter from './router'
import { Provider } from 'react-redux'
import configStore from './redux/store'
import * as serviceWorker from './serviceWorker';

const store = configStore();
ReactDOM.render(
  <Provider store={store}>
    <IRouter />
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
