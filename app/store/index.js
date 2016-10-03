
import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable'
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import Immutable from 'immutable';
import reducer from './../reducers'

let logger = createLogger({
  stateTransformer : (state) => {
    return state.toJS()
  }
});

const middleware = applyMiddleware(thunk, logger);

export default (data = Immutable.Map({})) => {

  const rootReducer = combineReducers(
    //every modules reducer should be define here
    reducer
  )

  return createStore(rootReducer , data, middleware);
}
