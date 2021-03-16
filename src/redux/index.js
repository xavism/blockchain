import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import blockchain from './blockchain'
import wallets from './wallets'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
const reducers = combineReducers({
  blockchain,
  wallets
})
export default createStore(reducers, composeWithDevTools(applyMiddleware(logger, thunk)))