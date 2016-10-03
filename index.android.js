/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Navigator,
  BackAndroid,
} from 'react-native';

import WelcomePage from './app/container/welcome'
import Home from './app/container/home'
import TourContainer from './app/container/tour'
import LoginContainer from './app/container/login'
import SignupContainer from './app/container/signup'
import ProductContainer from './app/container/product'
import { Provider } from 'react-redux';

import createStore from './app/store'


let __route = false;

let store = createStore();

BackAndroid.addEventListener('hardwareBackPress', function() {
    if( __route && __route.getCurrentRoutes().length > 1){
      __route.pop();
      return true;
    }
    return false;
});



class TethrLogin extends Component {

  renderScene (route, navigator) {
    __route = navigator;
    if(route.title === 'welcome'){
      return (<WelcomePage route={route} navigator={navigator} />);
    }else if(route.title === 'home'){
      return (<Home route={route} navigator={navigator} />);
    }else if(route.title === 'tour'){
      return (<TourContainer route={route} navigator={navigator} />);
    }else if(route.title === 'login'){
      return (<LoginContainer route={route} navigator={navigator} />);
    }else if(route.title === 'signup'){
      return (<SignupContainer route={route} navigator={navigator} />);
    }else if(route.title === 'product'){
      return (<ProductContainer route={route} navigator={navigator} />);
    }
  }
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <StatusBar
            backgroundColor="transparent"
            barStyle="light-content"
            translucent={true}
            showHideTransition='slide'
            hidden={true}
          />
          <Navigator
            initialRoute={{ title: 'welcome', index: 0 }}
            renderScene={this.renderScene.bind(this)}
            configureScene={(route, routeStack) => Navigator.SceneConfigs.FadeAndroid}
          />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('TethrLogin', () => TethrLogin);
