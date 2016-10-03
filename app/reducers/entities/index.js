import { combineReducers } from 'redux-immutable';
import { login } from './login';

const ENTITIES = combineReducers({
  login,
});

module.exports = ENTITIES ;
