/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Carousel from 'react-native-carousel';

class TourCard extends Component {
  render() {
      var {height, width} = Dimensions.get('window');
    return (
      <View style={styles.container}>
        <View style={styles.close}>
          <TouchableOpacity>
            <View>
              <Icon name='close' size={30} style={{color: '#000', padding:5}} onPress={this.props.onPress}/>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.logo}>
          <Image source={require('./../../img/tour-tick.png')} style={{height: (height * 0.30), width: (width * 0.50)}} />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.textHeader}>
            <Text style={styles.header}>
              {this.props.header || "Header"}
            </Text>
          </View>
          <View style={styles.textContent}>
            <Text style={styles.text}>
              {this.props.text || "Sample text to be shown here Sample text to be shown here Sample text to be shown here"}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  close:{
    flex:1,
    alignItems: 'flex-end',
  },
  logo:{
    flex:5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer:{
    flex:7,
  },
  textHeader:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header:{
    fontSize:40,
    fontWeight: '300',
    textAlign: 'center',
    color: '#111',
  },
  textContent:{
    flex:4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft:30,
  },
  text:{
    fontSize:18,
    textAlign: 'justify',
    fontWeight: '300',
    paddingLeft:30,
    paddingRight:30,
  }
});


module.exports = TourCard;
