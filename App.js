import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import TabsContainer from './components/TabsContainer';
import { Constants } from 'expo';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';

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
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <UdaciStatusBar backgroundColor='#292477' barStyle='light-content' />
          <TabsContainer />
        </View>
      </Provider>
    );
  }
}