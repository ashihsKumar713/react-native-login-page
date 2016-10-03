import {
    View,
    StyleSheet,
  } from 'react-native';

import React, {PropTypes} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomePage from './../../component/homePage'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <HomePage {...this.props}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
