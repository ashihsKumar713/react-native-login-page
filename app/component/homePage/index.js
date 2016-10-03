import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableNativeFeedback,
    Dimensions,
  } from 'react-native';

import React, {PropTypes} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var {height, width} = Dimensions.get('window');
    return (
      <View style={styles.container}>
        <Image source={require('./../../img/bg.jpg')} style={{flex:1, height: height, width: width}}>
          <View style={[{flex:1,}]}>
          <View style={[styles.overlay, {height:height, width:width}]}>
          </View>
            <View style={styles.logo}>
              <Image source={require('./../../img/splash-logo.png')} style={{height:100, width:100}}/>
            </View>
            <View style={styles.btnContainer}>
              <View style={[styles.btn, {backgroundColor: '#00dd5d',borderWidth:StyleSheet.hairlineWidth, borderColor: '#00dd5d',}]}>
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.SelectableBackground(0)}
                  onPress={() => this.props.navigator.push({title:'signup', index: 4})}
                  >
                  <View style={styles.btnTextContainer}>
                    <Text style={styles.btnText}>
                      Sign up
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
              <View style={[styles.btn, {borderWidth:StyleSheet.hairlineWidth, borderColor: '#fff',}]}>
                <TouchableNativeFeedback
                background={TouchableNativeFeedback.SelectableBackground()}
                onPress={() => this.props.navigator.push({title:'tour', index: 2})}
                >
                  <View style={styles.btnTextContainer}>
                    <Text style={styles.btnText}>
                      TAKE THE TOUR
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>
          </View>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f3f3f3'
  },
  logo:{
    flex:1,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnContainer:{
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'flex-start',
  },
  btn:{
    marginTop:10,
    borderRadius:50,
  },
  btnTextContainer:{
    height:50,
    width:200,
    paddingTop:10,
  },
  btnText:{
    flex:1,
    fontSize:20,
    paddingTop:10,
    fontWeight: '300',
    alignSelf: 'center',
    color: '#fff'
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

HomePage.propTypes = {
};

module.exports = HomePage;
