import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// layout reducers
import app from './reducers/app';
import user from './reducers/user';
import sections from './reducers/sections';

export const landingStore = (initialState) => {
  return createStore(
    combineReducers({
      app,
      user,
      sections
    }),
    initialState,
    process.env.NODE_ENV === 'production' ? applyMiddleware(thunk) : composeWithDevTools(applyMiddleware(thunk))
  );
};
