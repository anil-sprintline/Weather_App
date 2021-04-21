import {combineReducers, applyMiddleware, createStore, compose} from 'redux';
import thunk from 'redux-thunk';

import homeReducer from './HomeReducer';
import detailsReducer from './DetailsReducer';

const AppReducers = combineReducers({
  homeReducer,
  detailsReducer,
});

const rootReducer = (state, action) => {
  return AppReducers(state, action);
};

let store = createStore(rootReducer, compose(applyMiddleware(thunk)));

export default store;
