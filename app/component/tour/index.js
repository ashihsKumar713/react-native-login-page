/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import TourCard from './tourCard';
import Carousel from 'react-native-carousel';
import _ from 'lodash'

class Tour extends Component {
  render() {
       var data = [
         {
           header: "Welcome",
           text: "Welcome to the world of Online shopping."
         },
         {
           header: "Nitification",
           text: "Welcome to the world of Online shopping."
         },
         {
           header: "Security",
           text: "Welcome to the world of Online shopping."
         },
         {
           header: "Cash On Delivery",
           text: "Welcome to the world of Online shopping."
         },
       ];
      var {height, width} = Dimensions.get('window');
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={require('./../../img/bg.jpg')} style={{flex:1, height: height, width: width}}>
            <View style={[styles.overlay, {height:height, width:width}]}></View>
            <View style={styles.cardContainer}>
              <Carousel width={330} delay={5000} hideIndicators={true} indicatorAtBottom={true} inactiveIndicatorColor="#bbb" indicatorColor='#00dd5d' loop={false}>
                {_.map(data,(d,i) => (<TourCard key={i} onPress={() => this.props.navigator.push({title:'home', index:1})} header={d.header} text={d.text}/>))}
              </Carousel>
            </View>
          </Image>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer:{
    flex:1,
  },
  cardContainer:{
    flex:1,
    backgroundColor: '#fff',
    margin:20,
  },
  overlay:{
    flex:1,
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: "black",
    opacity: 0.5,
  },
});


module.exports = Tour;
