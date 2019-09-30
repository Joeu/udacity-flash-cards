import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import TabsContainer from './components/TabsContainer';
import Constants from 'expo-constants';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { logger } from './middlewares';
import thunkMiddleware from "redux-thunk";
import { setLocalNotification, clearLocalNotification } from './utils/notificationHandler';


function UdaciStatusBar({backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends Component {
  componentDidMount() {
    // clearLocalNotification()
    //   .then(setLocalNotification);
  }

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