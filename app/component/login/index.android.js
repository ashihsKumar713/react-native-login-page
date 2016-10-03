/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ToolbarAndroid,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';

import {GoogleSignin} from 'react-native-google-signin';

import config from './../../config';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      permissions:["email","user_friends"],
      user: '',
      email:'',
      password:'',
    }
    this._fbLoginBotton = this._fbLoginBotton.bind(this);
    this.__onFbLogin = this.__onFbLogin.bind(this);
    this.__onFbLogout = this.__onFbLogout.bind(this);
    this.__onFbLoginFound = this.__onFbLoginFound.bind(this);
    this.__onFbLoginNotFound = this.__onFbLoginNotFound.bind(this);
    this.__onFbError = this.__onFbError.bind(this);
    this.__onFbCancle = this.__onFbCancel.bind(this);
    this.__onFbPermissionsMissing = this.__onFbPermissionsMissing.bind(this);
    this.__googleSignIn = this.__googleSignIn.bind(this);
    this._setupGoogleSignin = this._setupGoogleSignin.bind(this);
    this.__googleSignIn = this.__googleSignIn.bind(this);
    this.__googleSignOut = this.__googleSignOut.bind(this);
  }

  componentDidMount() {
      this._setupGoogleSignin();
  //    this.fbLogin.logout()
    }

  _fbLoginBotton (height, width) {
    return (
      <FBLogin
        buttonView={
          <View style={{height: 60, width:220, borderColor:'#4b77da', borderWidth: 1, borderRadius:20}}>
            <TouchableOpacity onPress={()=>{
              if(!this.fbLogin.context.isLoggedIn){
                this.fbLogin.login()
              }else{
                this.fbLogin.logout()
              }
            }}>
              <View style={{paddingTop:20}}>
                <View style={styles.btnContect}>
                  <View style={{flex:1}}>
                    <Icons color="#4b77da" style={{alignSelf: 'center'}} name="logo-facebook" size={20}></Icons>
                  </View>
                  <View style={{flex:4}}>
                    <Text style={{textAlign:'center',fontSize:14, color:'#4b77da'}}>
                      {'Log in With Facebook'}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        }
        ref={(fbLogin) => { this.fbLogin = fbLogin }}
        permissions={this.state.permissions}
        loginBehavior={FBLoginManager.LoginBehaviors.Native}
        onLogin={this.__onFbLogin}
        onLogout={this.__onFbLogout}
        onLoginFound={this.__onFbLoginFound}
        onLoginNotFound={this.__onFbLoginNotFound}
        onError={this.__onFbError}
        onCancel={this.__onFbCancel}
        onPermissionsMissing= {this.__onFbPermissionsMissing}
      />
    );
  }

  __onFbLogin (data) {
    console.log("Logged in!");
    console.log(data);
    this.setState({ user : data });
    if(data){
      this.props.onLoginWithSocialAccount(
        {
          email: data.profile.email || '',
          social_id: data.profile.id,
          social_type: data.provider,
          firstname: data.profile.first_name,
          lastname: data.profile.last_name,
          picture: data.profile.picture
        }
      ).then(( data ) => {
        this.props.navigator.push({ title: 'product', index: 5 , payload:data,  signout:this.__onFbLogout, f:"fb"});
      })
      ToastAndroid.show(
                  'Log in with facebook is complete',
                  ToastAndroid.LONG);
      this.props.navigator.push({ title: 'product', index: 5 , payload:this.state.user.profile,  signout:this.__onFbLogout, f:"fb"});
    }
  }

  __onFbLogout (data) {
    console.log("Logged out.");
    ToastAndroid.show(
                'You are Logged out',
                ToastAndroid.LONG);
    this.setState({ user : null });
  }

  __onFbLoginFound(data){
    console.log("Existing login found.");
    console.log(data);
    this.setState({ user : data.credential });
  }

  __onFbLoginNotFound(){
    console.log("No user logged in.");
    this.setState({ user : null });
  }

  __onFbError(data){
    console.log("ERROR");
    console.log(data);
  }

  __onFbCancel(){
    console.log("User cancelled.");
    ToastAndroid.show(
                'Login process has been cancled',
                ToastAndroid.LONG);
  }

  __onFbPermissionsMissing(data){
    console.log("Check permissions!");
    console.log(data);
  }

  async _setupGoogleSignin() {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure(config.google);

      const user = await GoogleSignin.currentUserAsync();
      console.log(user);
      this.setState({user});
    }
    catch(err) {
      console.log("Play services error", err.code, err.message);
    }
  }

  __googleSignIn(){
    GoogleSignin.signIn()
      .then((data) => {
        console.log(data);
        this.setState({user: data});
        this.props.onLoginWithSocialAccount(
          {
            email: data.email,
            social_id: data.id,
            social_type: 'google',
            firstname: (data.name.split(' '))[0],
            lastname: (data.name.split(' '))[1],
            picture: data.photo
          }
        ).then(( data ) => {
          this.props.navigator.push({ title: 'product', index: 5 , payload:data,  signout:this.__onFbLogout, f:"fb"});
        })
        ToastAndroid.show(
                    'Log in with Google is complete',
                    ToastAndroid.LONG);
        this.props.navigator.push({ title: 'product', index: 5 , payload:this.state.user, signout:this.__googleSignOut, f:'go'});
      })
      .catch((err) => {
        console.log('WRONG SIGNIN', err);
      })
      .done();
    }

  __googleSignOut() {
      GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
        console.log('logout');
        ToastAndroid.show(
                    'You have been logged out',
                    ToastAndroid.LONG);
        this.setState({user: null});
      })
      .done();
  }

  render() {
    var {height, width} = Dimensions.get('window');
    return (
      <View style={styles.container}>
        {this.props.ui.loading?
          <View style={{position: 'absolute', height:height, width:width, backgroundColor:'#777', opacity:0.6, alignItems:'center'}}>
            <ActivityIndicator
              animating={true}
              style={{height:height*1.0}}
              color={'#111'}
              size={50}
              />
          </View>:<View></View>}
        <View style={styles.head}>
          <ToolbarAndroid
            titleColor={'#fff'}
            style={{flex:1}}
            navIcon={require('./../../img/navigate_white.png')}
            onIconClicked={() => this.props.navigator.pop()}
          >
            <View style={{backgroundColor:'transparent', alignItems:'center',paddingRight:width*.33, paddingTop:15}}>
              <Text style={{fontSize:18, color:'#444'}}>
                Log in
              </Text>
            </View>
          </ToolbarAndroid>
        </View>
        <View style={styles.body}>
          <View style={styles.logo}>
            <Image source={require('./../../img/logo.png')} style={{height:83, width:90}}/>
          </View>
          <View style={styles.input}>
            <View style={{padding:20}}>
              <TextInput
                placeholder={'Enter Email or User Name'}
                style={{height: 50, borderColor: '#22c064', borderWidth: 1}}
                returnKeyType={'next'}
                underlineColorAndroid={'#ddd'}
                onChange={( e )=>{ this.setState({email: e.nativeEvent.text})}}
                />
            </View>
            <View style={{padding:20}}>
              <TextInput
                placeholder={'Enter Password'}
                style={{height: 50, borderColor: '#22c064', borderWidth: 1}}
                returnKeyType={'done'}
                secureTextEntry={true}
                underlineColorAndroid={'#ddd'}
                onChange={( e )=>{ this.setState({password: e.nativeEvent.text})}}
                />
            </View>
          </View>
          <View style={styles.btn}>
            <View style={[styles.google]}>
              <View style={{height: 60, width:220, borderColor:'#c31', borderWidth: 1, borderRadius:20}}>
                <TouchableOpacity onPress={()=>{
                  console.log("google");
                  this.__googleSignIn();
                }}>
                  <View style={{paddingTop:20}}>
                    <View style={styles.btnContect}>
                      <View style={{flex:1}}>
                        <Icons color="#c31" style={{alignSelf: 'center'}} name="logo-google" size={20}></Icons>
                      </View>
                      <View style={{flex:4}}>
                        <Text style={{textAlign:'center',fontSize:14, color:'#c31'}}>
                          {'Log in With Google'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.fb}>
              {this._fbLoginBotton(height, width)}
            </View>
            <View style={{flex:.2,justifyContent:'center',alignItems:'center'}}>
              <TouchableOpacity onPress={() => this.props.navigator.push({title:'signup', index: 4})}>
                <Text style={{fontSize:15,textDecorationLine:'underline' }}>Dont have an Account?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.foot}>
        <TouchableOpacity onPress={()=>{
            this.props.onLoginWithEmail(this.state.email, this.state.password)
            .then( ( data ) => {
              this.props.navigator.push({title:'product', index:5, payload:data})
            })
          }}>
          <View >
              <Icon color="white" style={{alignSelf: 'center'}} name="arrow-forward" size={40}></Icon>
          </View>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  head:{
    flex:0.8,
  },
  body:{
    flex:5,
  },
  logo:{
    flex:2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input:{
    flex:3,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  btn:{
    flex:3,
  },
  btnContect:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  google:{
    flex:.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fb:{
    flex:.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  foot:{
    flex:0.8,
    backgroundColor:'#22c064',
    flexDirection: 'column',
    justifyContent: 'center',
  },

});

module.exports = Login;
