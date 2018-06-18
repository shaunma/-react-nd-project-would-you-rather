import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import {composeWithDevTools} from 'redux-devtools-extension';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'

const store = createStore(reducer, composeWithDevTools(
  middleware,
));

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)
