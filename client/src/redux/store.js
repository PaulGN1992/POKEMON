import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import rootReducer from './reducer'

// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer,
  applyMiddleware(thunk))