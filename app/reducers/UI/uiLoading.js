import Immutable from 'immutable';

let initialState =  Immutable.Map({loading: false});

export function UILoading( state = initialState, action){
  if(action.type === 'LOADING'){
    return state.set('loading', action.payload);
  }
  return state;
}
