/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Signup from './../../component/signup'
import { connect } from 'react-redux';
import { onRegistrationWithEmail } from './../../actions/registration';

class SignupContainer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Signup {...this.props}/>
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
      ui: state.ui.UILoading
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
      onRegistrationWithEmail : (firstname,lastname,email,password) => {
        let userDetail = {
          "firstname": firstname,
          "lastname": lastname,
          "email": email,
          "password": password,
          "website_id":"1"
        };
        return dispatch(onRegistrationWithEmail(userDetail));
      }
    }
  }

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupContainer)

module.exports = Container;
