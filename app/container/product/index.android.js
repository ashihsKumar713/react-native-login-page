/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Product from './../../component/product'

class ProductContainer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Product {...this.props}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});



module.exports = ProductContainer;
