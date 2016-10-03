/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Tour from './../../component/tour'

class TourContainer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Tour {...this.props}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

module.exports = TourContainer;
