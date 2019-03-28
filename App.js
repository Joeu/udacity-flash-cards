import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import TabsContainer from './components/TabsContainer';
import { Constants } from 'expo';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { logger } from './middlewares';
import thunkMiddleware from "redux-thunk";


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
      <Provider store={createStore(reducer, applyMiddleware(
        thunkMiddleware,
        logger
      ))}>
        <View style={{ flex: 1 }}>
          <UdaciStatusBar backgroundColor='#292477' barStyle='light-content' />
          <TabsContainer />
        </View>
      </Provider>
    );
  }
}