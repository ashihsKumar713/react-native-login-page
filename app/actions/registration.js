import { createAction } from 'redux-actions';
import * as _ from 'lodash';
import callAPI from './../service'

export const REGISTRATION_WITH_EMAIL  = 'REGISTRATION_WITH_EMAIL';

function registrationWithEmail( data ){
  return createAction(REGISTRATION_WITH_EMAIL)( data );
}


function loading( data ){
  return createAction("LOADING")(data);
}


export function onRegistrationWithEmail(data){
  return ( dispatch, getState ) => {
      dispatch(loading(true));
    return new Promise( (resolve, reject) => {
      callAPI('/customer/register/', data).then(
        ( _data ) => {
          if(_data){
            dispatch(registrationWithEmail(_data));
            dispatch(loading(false));
            resolve(_data);
          }else{
            dispatch(loading(false));
            reject({message: "unable to register"});
          }
        },
        ( error ) => {
          dispatch(loading(false));
          reject(error)
        }
      );
    });
  }
}
