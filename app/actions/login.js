import { createAction } from 'redux-actions';
import * as _ from 'lodash';
import callAPI from './../service'

export const LOGIN_WITH_EMAIL  = 'LOGIN_WITH_EMAIL';
export const LOGIN_WITH_SOCIAL_ACCOUNT  = 'LOGIN_WITH_SOCIAL_ACCOUNT';

function loginWithEmail( data ){
  return createAction(LOGIN_WITH_EMAIL)( data );
}

function loginWithSocialAccount( data ){
  return createAction(LOGIN_WITH_SOCIAL_ACCOUNT)( data );
}


function loading( data ){
  return createAction("LOADING")(data);
}

export function onLoginWithEmail( email, password){
  return ( dispatch, getState ) => {
    dispatch(loading(true));
    if(_.isEmpty(email)){
      dispatch(loading(false));
      return Promiss.reject(' Enter an email');
    }
    if(_.isEmpty(password)){
      dispatch(loading(false));
      return Promiss.reject(' Enter a password');
    }
    return new Promise( (resolve, reject) => {
      callAPI('/customer/login/', {email:email, password: password, website_id: '1'}).then(
        ( _data ) => {
          if(_data){
            dispatch(loginWithEmail(_data));
            dispatch(loading(false));
            resolve(_data);
          }else{
            dispatch(loading(false));
            reject({message: "unable to login"});
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

export function onLoginWithSocialAccount( data ){
  return ( dispatch, getState ) => {
    return new Promise( (resolve, reject) => {
      callAPI('/customer/login/', data).then(
        ( _data ) => {
          if(_data){
            dispatch(loginWithSocialAccount(_data));
            dispatch(loginSuccess(_data));
          }else{
            dispatch(loginFail({message: "unable to login"}));
          }
        },
        ( error ) => {
           dispatch(loginFail({message: "unable to login"}));
         }
      );
    });
  }
}
