import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './components/App/app'
import reportWebVitals from './reportWebVitals'
import '@ya.praktikum/react-developer-burger-ui-components'
import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './services/slices'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ProvideAuth } from '../src/utils/auth'

const store = configureStore({
  reducer: rootReducer
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
    <React.StrictMode>
      <ProvideAuth>
        <BrowserRouter>
          <Provider store={store}>
            <App/>
          </Provider>
        </BrowserRouter>
      </ProvideAuth>
    </React.StrictMode>
)

// <App /> If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
