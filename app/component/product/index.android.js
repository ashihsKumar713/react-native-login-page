/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ToolbarAndroid,
  Dimensions,
  Image,
  Picker,
  TouchableOpacity,
  ViewPagerAndroid,
  RefreshControl,
  DrawerLayoutAndroid,
  ToastAndroid,
} from 'react-native';
import Carousel from 'react-native-carousel';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as _ from 'lodash';
import Icons from 'react-native-vector-icons/Ionicons';

class Product extends Component {
  constructor(props){
    super(props);
    this.state = {
      color: '#999',
      picker: 'small',
      refresh: false,
      tab: 'Specification',
      page: 0,
    };
    this.colorArr= [ '#cad', '#999','red', 'lightgreen'];
    this._pickerColor = this._pickerColor.bind(this);
    this._tabHeader = this._tabHeader.bind(this);
    this.viewPager;
    this.user = this.props.route.payload;
    this._drawer = this._drawer.bind(this);
  }
  _pickerColor(color, key){
    return(
      <TouchableOpacity
        onPress={() => this.setState({color: color})}
        key={key || 0}
      >
      {this.state.color == color?
        <View style={[styles.colorItem, {backgroundColor: color, borderWidth:2, borderColor: '#888'}] }>
          <Icon name='done' color={'white'} size={40} style={{alignSelf:'center'}}/>
        </View>:
        <View style={[styles.colorItem, {backgroundColor: color, height:30,width:30}] }></View>}
      </TouchableOpacity>
    )
  }
  _tabHeader(title, key){
    return(
      this.state.tab == title?
        <View style={[styles.tabItem ,{borderBottomWidth:4, backgroundColor:'#eee'}]} key={key}>
          <TouchableOpacity
            onPress={() => this.setState({tab: title})}
            >
            <View>
              <Text style={styles.tabTitle}>{title}</Text>
            </View>
          </TouchableOpacity>
        </View>:
        <View style={styles.tabItem} key={key}>
          <TouchableOpacity
            onPress={() => {this.setState({tab: title}); this.viewPager.setPage(key);}}
            >
            <View>
              <Text style={styles.tabTitle}>{title}</Text>
            </View>
          </TouchableOpacity>
        </View>

    );
  }
  _drawer(){
    return(
      <View style={{flex:1,}}>
        <View style={{height:302, borderBottomWidth:.3}}>
          <Image source={{uri: this.props.route.f == 'fb'?this.user.picture.data.url:'cc'}} style={{height:300, borderBottomWidth:1}}>
            {this.props.route.f !== 'fb'?
            <View style={{flex:1,alignItems:'center', flexDirection:'row', alignSelf:'center'}}>
              <Text style={{fontSize:20, fontWeight:'500'}}>
                {'No Image Found'}
              </Text>
            </View>:<View></View>}
          </Image>
        </View>
        <View style={{flex:1}}>
          <View style={{flex:.15, flexDirection:'row', borderBottomWidth:.3}}>
            <View style={{alignItems:'center'}}>
              <Text style={{fontSize:20,fontWeight:'500'}}>
                {'Name: '}
              </Text>
            </View>
            <View style={{alignItems:'center',paddingTop:5}}>
              <Text>
                {this.user.name}
              </Text>
            </View>
          </View>
          <View style={{flex:.15, flexDirection:'row', borderBottomWidth:.3}}>
            <View style={{alignItems:'center'}}>
              <Text style={{fontSize:20,fontWeight:'500'}}>
                {'Gender: '}
              </Text>
            </View>
            <View style={{alignItems:'center',paddingTop:5}}>
              <Text>
                {this.user.gender}
              </Text>
            </View>
          </View>
          <View style={{flex:.15, flexDirection:'row', borderBottomWidth:.3}}>
            <View style={{alignItems:'center'}}>
              <Text style={{fontSize:20,fontWeight:'500'}}>
                {'Id: '}
              </Text>
            </View>
            <View style={{alignItems:'center',paddingTop:5}}>
              <Text>
                {this.user.id}
              </Text>
            </View>
          </View>
          <View style={{flex:1,}}></View>
          <View style={{flex:.4, alignItems:'center', backgroundColor:'#22c064'}}>
          <View style={{ paddingTop:20}}>
            <TouchableOpacity onPress={() => {this.props.route.signout(); this.props.navigator.push({title:'welcome', index:0})}}>
              <Text style={{fontSize:20, color:'#fff', fontWeight:'900'}}>
                  LOG OUT
              </Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
  render() {
    let tabTitle = [ 'Specification', 'Detail', 'About'];
    var {height, width} = Dimensions.get('window');
    return (
      <View style={styles.container}>
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={this._drawer}
      >
          <View style={styles.head}>
            <ToolbarAndroid
              title={''}
              titleColor={'#fff'}
              style={{flex:1, backgroundColor: '#22c064',}}
              navIcon={require('./../../img/navigate_white.png')}
              onIconClicked={() => this.props.navigator.pop()}
              >
                <View style={{backgroundColor:'transparent', marginRight: width/3, paddingTop:10}}>
                  <Text style={{textAlign: 'center', paddingTop:10, fontSize:22, fontWeight:'500',color: 'white'}}>
                    {'T-Shirt'}
                  </Text>
                </View>
              </ToolbarAndroid>
          </View>
          <View style={styles.body}>
            <ScrollView style={{flex:1,}}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refresh}
                  onRefresh={() => {
                      this.setState({refresh: true})
                      setTimeout(() =>{
                        this.viewPager.setPage(0);
                        this.setState({ color:'#999', picker:'small', tab:'Specification', refresh: false})
                      }, 3000)} }
                  />}
              >
              <View style={{flex:1}}>
                <View style={styles.slide}>
                  <Carousel width={width} delay={2000} indicatorAtBottom={true} inactiveIndicatorColor="#bbb" indicatorColor='#00dd5d' loop={false}>
                    <View style={styles.slideImg}>
                      <Image source={require('./../../img/product1.png')} />
                    </View>
                    <View style={styles.slideImg}>
                      <Image source={require('./../../img/product2.png')} />
                    </View>
                    <View style={styles.slideImg}>
                      <Image source={require('./../../img/product4.png')} />
                    </View>
                  </Carousel>
                </View>
                <View style={styles.picker_color}>
                  <View style={styles.picker}>
                    <Picker
                      mode={'dialog'}
                      selectedValue={this.state.picker}
                      onValueChange={(size) => this.setState({picker: size})}>
                      <Picker.Item label="Small" value="small" />
                      <Picker.Item label="Medium" value="medium" />
                      <Picker.Item label="Large" value="large" />
                      <Picker.Item label="Extre Large" value="ex-large" />
                    </Picker>
                  </View>
                  <View style={styles.color}>
                    {_.map(this.colorArr, (color, key) => this._pickerColor(color, key) )}
                  </View>
                </View>
                <View style={styles.detail}>
                  <View style={styles.tabs}>
                    {_.map(tabTitle, (title, key) => this._tabHeader(title, key))}
                  </View>
                  <ViewPagerAndroid style={{flex:1}} initialPage={this.state.page} pageMargin={10}
                    ref={viewPager => { this.viewPager = viewPager; }}
                    onPageSelected={(x) =>  this.setState({tab: tabTitle[x.nativeEvent.position]}) }
                    >
                    <View style={styles.pageStyle} key={0}>
                      <View style={{flex:.1, flexDirection:'row',}}>
                        <Text style={{fontSize:20, fontWeight:'500', textAlign:'center',alignSelf:'center' }}>
                          {'#Size:' }
                        </Text>
                        <Text style={{fontSize:16, textAlign:'center',alignSelf:'center'}}>
                          {' '+ this.state.picker }
                        </Text>
                      </View>
                      <View style={{flex:.1, flexDirection:'row',}}>
                        <Text style={{fontSize:20, fontWeight:'500', textAlign:'center' }}>
                          {'#Color: ' }
                        </Text>
                        <View style={{backgroundColor: this.state.color, height:20, width:20, borderRadius:50, alignSelf:'center'}}>
                        </View>
                      </View>
                      <View style={{flex:1, flexDirection:'row',}}>
                        <Text style={{fontSize:20, fontWeight:'500', textAlign:'center' }}>
                          {'#Price:' }
                        </Text>
                        <Text style={{fontSize:16, textAlign:'center',}}>
                          {'  2300/- (INR)'  }
                        </Text>
                      </View>
                    </View>
                    <View style={styles.pageStyle} key={1}>
                      <Text>Detail</Text>
                      <Text>Detail</Text>
                      <Text>Detail</Text>
                      <Text>Detail</Text>
                      <Text>Detail</Text>
                      <Text>Detail</Text>
                      <Text>Detail</Text>
                      <Text>Detail</Text>
                      <Text>Detail</Text>
                      <Text>Detail</Text>
                      <Text>Detail</Text>
                      <Text>Detail</Text>
                      <Text>Detail</Text>
                      <Text>Detail</Text>
                      <Text>Detail</Text>
                      <Text>Detail</Text>
                      <Text>Detail</Text>
                      <Text>Detail</Text>
                      <Text>Detail</Text>
                      <Text>Detail</Text>
                      <Text>Detail</Text>
                    </View>
                    <View style={styles.pageStyle} key={2}>
                      <Text>About</Text>
                      <Text>About</Text>
                      <Text>About</Text>
                      <Text>About</Text>
                      <Text>About</Text>
                      <Text>About</Text>
                      <Text>About</Text>
                      <Text>About</Text>
                      <Text>About</Text>
                      <Text>About</Text>
                      <Text>About</Text>
                      <Text>About</Text>
                      <Text>About</Text>
                      <Text>About</Text>
                      <Text>About</Text>
                      <Text>About</Text>
                      <Text>About</Text>
                    </View>
                  </ViewPagerAndroid>
                </View>
                <View style={styles.foot}>
                  <View style={{height:height * 0.1, width: width * 1, backgroundColor:'#22c064',  }}>
                    <TouchableOpacity onPress={()=>{
                      ToastAndroid.show(
                                  'Added to cart',
                                  ToastAndroid.SHORT);
                      }}>
                      <View style={{paddingTop:10}}>
                        <View style={styles.btnContect}>
                          <View style={{flex:1.5}}>
                            <Icons color="white" style={{alignSelf: 'flex-end'}} name="ios-cart" size={40}></Icons>
                          </View>
                          <View style={{flex:3}}>
                            <Text style={{paddingLeft:20,textAlign:'center',fontSize:18, color:'white',alignSelf: 'flex-start'}}>
                              {'  Add TO Cart'}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
          </DrawerLayoutAndroid>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  head: {
    flex: .4,
    height:15
  },
  body: {
    flex: 5,
  },
  slide: {
    paddingTop:20,
    flex: 1,
    height: 260,
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
  },
  slideImg:{
   height: 400,
   justifyContent: 'center',
   alignItems: 'center',
  },
  picker_color:{
    height:70,
    padding:10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  picker:{
    flex:1.5,
    paddingBottom:30,
    borderRadius:10,
    borderWidth:0.1,
    alignSelf: 'center',
    backgroundColor: '#f1f1f1',
  },
  color:{
    flex:2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  colorItem:{
    width:40,
    height:40,
    marginRight:5,
    borderRadius:100,
  },
  detail:{
    height:500,
  },
  pageStyle: {
    padding: 20,
    backgroundColor: '#eee',
  },
  tabs:{
    flex:.12,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tabItem:{
    flex:1,
    backgroundColor: '#ccc',
    alignItems:'center',
    borderRightWidth: 1,
    borderTopWidth: .5,
    borderColor: '#aaa',
  },
  tabTitle:{
    fontSize:16,
    marginTop:15,
  },
  foot: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContect:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

module.exports = Product;
