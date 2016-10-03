/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Login from './../../component/login'
import { connect } from 'react-redux';
import { onLoginWithEmail, onLoginWithSocialAccount } from './../../actions/login';

class LoginContainer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Login {...this.props} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});



const mapStateToProps = (state,props) =>{
    state = state.toJS()
    return {
      login : state.entities.login,
      ui: state.ui.UILoading,
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
      onLoginWithEmail : (email,password) => {
        return dispatch(onLoginWithEmail(email,password));
      },
      onLoginWithSocialAccount : (data) => {
        return dispatch(onLoginWithSocialAccount(data))
      }
    }
  }

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer)

module.exports = Container;
