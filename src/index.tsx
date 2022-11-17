import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/app';
import reportWebVitals from './reportWebVitals';
import '@ya.praktikum/react-developer-burger-ui-components'
import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "./services/slices";
import {Provider} from "react-redux";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

const store = configureStore({
    reducer: rootReducer
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <Provider store={store}>
      <App/>
      </Provider>
  </React.StrictMode>
);

// <App /> If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
