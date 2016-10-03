import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableNativeFeedback,
  } from 'react-native';

import React, {PropTypes} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Start extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.btn}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.SelectableBackground()}
            onPress={() => this.props.navigator.push({title: 'login', index: 3})}
            >
            <View>
              <Text style={styles.btnText}>LOG IN</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
        <View style={styles.icon}>
          <Image source={require('./../../img/ui8-logo.png')} />
        </View>
        <View style={styles.arrow}>
          <View>
            <Icon onPress={() => this.props.navigator.push({title: 'home', index: 1})} color={'#444'} backgroundColor={'#f3f3f3'} size={40} name="arrow-forward"></Icon>
          </View>
        </View>
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
  btn:{
    flex:1,
    alignSelf: 'flex-end',
    marginTop:10,
    paddingRight:10,
  },
  btnText:{
    fontSize:15,
    fontWeight: 'bold'
  },
  logo:{
    flex:1,
    alignSelf: 'center',
  },
  arrow:{
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'flex-start',
  }
});

Start.propTypes = {
  onNext: PropTypes.func.isRequired,
  onSignin: PropTypes.func.isRequired,
};

module.exports = Start;
