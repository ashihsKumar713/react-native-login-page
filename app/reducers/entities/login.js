import Immutable from 'immutable';

let initialState =  Immutable.Map({user:''});
export function login( state = initialState, action){
  if(action.type === 'LOGIN_WITH_EMAIL'){
    return state.set('user', action.payload);
  }
  return state;
}
