import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import TabsContainer from './components/TabsContainer';
import { Constants } from 'expo';


function UdaciStatusBar({backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <UdaciStatusBar backgroundColor='white' barStyle='light-content' />
        <TabsContainer />
      </View>
    );
  }
}
