import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { reducer } from "./store/reducers/reducer";
import { createStore } from "redux";
import { Provider } from "react-redux";

import './semantic/dist/semantic.min.css';
import {BrowserRouter, Route} from "react-router-dom";

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter>
          <Route path="/" component={App} />
      </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
