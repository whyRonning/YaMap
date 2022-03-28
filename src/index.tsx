import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from './store/store';
import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
  p {
    font-size: 2.6vmin;
  };
  label {
    font-size: 2.8vmin;
  };
  body {
    margin: 0;
  }

`
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <GlobalStyle/>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
reportWebVitals();
