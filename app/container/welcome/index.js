import {
    View,
    StyleSheet,
  } from 'react-native';

import React, {PropTypes} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Start from './../../component/start'

export default class WelcomePage extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Start onSignin={() =>{}} onNext={() =>{}} {...this.props}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
  }
});
